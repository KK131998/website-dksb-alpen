import type { Angebot, AngebotKategorieNode, WpImage } from "@/lib/wordpress";
import { getAngebote, getAngebotskategorien } from "@/lib/wordpress";

export type AngebotKategorie = {
  id: string;
  slug: string;
  title: string;
  description: string;
  accent: string;
  background: string;
  image: WpImage | null;
};

type KategoriePreset = {
  id: string;
  title: string;
  description: string;
  accent: string;
  background: string;
  match: string[];
};

export const KATEGORIE_PRESETS: KategoriePreset[] = [
  {
    id: "familien",
    title: "Für Familien",
    description: "Frühe Hilfen, Beratung und Unterstützung von Anfang an.",
    accent: "#e67e22",
    background: "#fdebd0",
    match: ["für familien", "fuer familien", "familien"],
  },
  {
    id: "kinder",
    title: "Für Kinder & Jugendliche",
    description: "Kurse, Projekte und Aktionen für mehr Selbstbewusstsein und Spaß.",
    accent: "#2e7d32",
    background: "#e8f5e9",
    match: ["für kinder", "fuer kinder", "jugendliche"],
  },
  {
    id: "eltern",
    title: "Für Eltern",
    description: "Starke Eltern, Fachvorträge und Austausch für den Familienalltag.",
    accent: "#194e9e",
    background: "#e3f2fd",
    match: ["für eltern", "fuer eltern", "eltern"],
  },
  {
    id: "hilfe",
    title: "Hilfe & Unterstützung",
    description: "Unsere Hilfsprojekte für Kinder und Familien in herausfordernden Zeiten.",
    accent: "#c0392b",
    background: "#fdecea",
    match: ["hilfe", "unterstützung", "unterstuetzung"],
  },
];

function labelFromAcfValue(value: unknown): string[] {
  if (value == null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(labelFromAcfValue);
  }
  if (typeof value === "string" || typeof value === "number") {
    const text = String(value).trim();
    return text ? [text] : [];
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const text =
      record.post_title ??
      record.title ??
      record.post_name ??
      record.slug ??
      record.name;
    return typeof text === "string" && text.trim() ? [text.trim()] : [];
  }
  return [];
}

function normalize(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }
  return value
    .toLowerCase()
    .replace(/&/g, "und")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function presetForTitle(title: unknown): KategoriePreset | undefined {
  const haystack = normalize(title);
  if (!haystack) {
    return undefined;
  }
  return KATEGORIE_PRESETS.find((preset) => {
    if (haystack === normalize(preset.title)) {
      return true;
    }
    return preset.match.some((token) => haystack.includes(normalize(token)));
  });
}

function toKategorie(
  slug: string,
  title: string,
  image: WpImage | null,
  preset?: KategoriePreset,
): AngebotKategorie {
  const style = preset ?? presetForTitle(title);
  return {
    id: style?.id ?? slug,
    slug,
    title,
    description: style?.description ?? "",
    accent: style?.accent ?? "#194e9e",
    background: style?.background ?? "#e3f2fd",
    image,
  };
}

function categoryImageFromWp(node: AngebotKategorieNode): WpImage | null {
  return node.angebotkategorien?.bild?.node ?? node.featuredImage?.node ?? null;
}

export async function loadKategorien(): Promise<AngebotKategorie[]> {
  const [wpCats, angebote] = await Promise.all([getAngebotskategorien(), getAngebote()]);
  return resolveKategorien(wpCats, angebote);
}

export function resolveKategorien(
  wpCats: AngebotKategorieNode[],
  angebote: Angebot[],
): AngebotKategorie[] {
  if (wpCats.length > 0) {
    return wpCats.map((node) =>
      toKategorie(node.slug, node.title, categoryImageFromWp(node), presetForTitle(node.title)),
    );
  }

  return KATEGORIE_PRESETS.map((preset) => {
    const photo = angebote.find((item) =>
      labelsOf(item).some((label) => presetForTitle(label)?.id === preset.id),
    )?.angebote?.foto?.node;
    return toKategorie(preset.id, preset.title, photo ?? null, preset);
  });
}

function labelsOf(item: Angebot): string[] {
  const fromRelation = (item.angebote?.kategorie?.nodes ?? []).flatMap((node) =>
    labelFromAcfValue(node.title || node.slug),
  );
  const fromAcf = (item.kategorieLabels ?? []).flatMap(labelFromAcfValue);
  return [...fromRelation, ...fromAcf].filter((label) => typeof label === "string" && label.length > 0);
}

function slugsOf(item: Angebot): string[] {
  return (item.angebote?.kategorie?.nodes ?? []).map((node) => node.slug).filter(Boolean);
}

export function categoryOfOffer(
  item: Angebot,
  categories: AngebotKategorie[],
): AngebotKategorie | undefined {
  const slugs = slugsOf(item);
  const bySlug = categories.find((category) => slugs.includes(category.slug) || slugs.includes(category.id));
  if (bySlug) {
    return bySlug;
  }

  for (const label of labelsOf(item)) {
    const preset = presetForTitle(label);
    const match = categories.find(
      (category) =>
        category.id === preset?.id ||
        normalize(category.title) === normalize(label) ||
        (preset && normalize(category.title) === normalize(preset.title)),
    );
    if (match) {
      return match;
    }
  }
  return undefined;
}

export function offersInCategory(angebote: Angebot[], category: AngebotKategorie): Angebot[] {
  return angebote.filter((item) => {
    const match = categoryOfOffer(item, [category]);
    return Boolean(match);
  });
}

export function getCategoryBySlug(
  slug: string,
  categories: AngebotKategorie[],
): AngebotKategorie | undefined {
  return categories.find((category) => category.slug === slug || category.id === slug);
}

export function categoryHref(category: AngebotKategorie): string {
  return `/angebote/${category.slug}`;
}

export function categoryImage(angebote: Angebot[], category: AngebotKategorie): string | null {
  if (category.image?.sourceUrl) {
    return category.image.sourceUrl;
  }
  const withPhoto = offersInCategory(angebote, category).find(
    (item) => item.angebote?.foto?.node?.sourceUrl,
  );
  return withPhoto?.angebote?.foto?.node?.sourceUrl ?? null;
}
