const WORDPRESS_URL = process.env.WORDPRESS_URL?.replace(/\/$/, "");
const GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL ??
  (WORDPRESS_URL ? `${WORDPRESS_URL}/graphql` : undefined);

export const PAGE_SLUGS = {
  home: "der-kinderschutzbund-e-v",
  about: "wer-wir-sind",
  leitbild: "unser-leitbild",
  konzept: "unser-kinderschutzkonzept",
  kontakt: "kontakt",
  impressum: "impressum",
  datenschutz: "datenschutz",
  mitmachen: "mitmachen",
  spenden: "spenden",
  mitglied: "mitglied-werden",
  ehrenamt: "ehrenamtlich-engagieren",
  kooperation: "kooperationspartner-werden",
} as const;

type GraphqlResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export class WordpressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WordpressError";
  }
}

export async function wpGraphql<T>(
  query: string,
  tags: string[],
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!GRAPHQL_URL) {
    throw new WordpressError(
      "WORDPRESS_URL ist nicht gesetzt. Trage die Local-URL in frontend/.env.local ein.",
    );
  }

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "force-cache",
    next: {
      tags,
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new WordpressError(`WordPress-GraphQL ${response.status} für ${GRAPHQL_URL}`);
  }

  const json = (await response.json()) as GraphqlResponse<T>;
  if (json.errors?.length) {
    throw new WordpressError(json.errors.map((error) => error.message).join("; "));
  }
  if (!json.data) {
    throw new WordpressError("WordPress lieferte keine Daten.");
  }
  return json.data;
}

export function getWordpressUrl(): string | undefined {
  return WORDPRESS_URL;
}

export type WpImage = {
  sourceUrl: string;
  altText: string;
};

export type WpPage = {
  slug: string;
  title: string;
  content: string | null;
};

export type Vorstandsperson = {
  slug: string;
  title: string;
  vorstandspersonen: {
    rolle: string | null;
    vorname: string | null;
    nachname: string | null;
    mail: string | null;
    foto: { node: WpImage } | null;
  } | null;
};

export type AngebotKategorieNode = {
  slug: string;
  title: string;
  featuredImage: { node: WpImage } | null;
  angebotkategorien: {
    bild: { node: WpImage } | null;
  } | null;
};

export type Angebot = {
  slug: string;
  title: string;
  kategorieLabels: string[];
  angebote: {
    kurzbeschreibung: string | null;
    kontaktMail: string | null;
    foto: { node: WpImage } | null;
    kategorie: {
      nodes: { slug: string; title: string }[];
    } | null;
  } | null;
};

export type Termin = {
  slug: string;
  title: string;
  featuredImage: { node: WpImage } | null;
  termine: {
    datum: string | null;
    von: string | null;
    bisUhrzeit: string | null;
    ort: string | null;
    hinweis: string | null;
    kurzbeschreibung: string | null;
    foto: { node: WpImage } | null;
  } | null;
};

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const data = await wpGraphql<{ page: WpPage | null }>(
    `query PageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        slug
        title
        content
      }
    }`,
    ["wordpress", "page", `page:${slug}`],
    { slug },
  );
  return data.page;
}

export async function getVorstand(): Promise<Vorstandsperson[]> {
  const data = await wpGraphql<{ vorstandspersonen: { nodes: Vorstandsperson[] } }>(
    `query Vorstand {
      vorstandspersonen(first: 50) {
        nodes {
          slug
          title
          vorstandspersonen {
            rolle
            vorname
            nachname
            mail
            foto {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }`,
    ["wordpress", "vorstandsperson"],
  );
  return data.vorstandspersonen.nodes;
}

export async function getAngebotskategorien(): Promise<AngebotKategorieNode[]> {
  const data = await wpGraphql<{
    angebotskategorien: { nodes: AngebotKategorieNode[] };
  }>(
    `query Angebotskategorien {
      angebotskategorien(first: 50) {
        nodes {
          slug
          title
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          angebotkategorien {
            bild {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }`,
    ["wordpress", "angebotskategorie"],
  );
  return data.angebotskategorien.nodes;
}

export async function getAngebote(): Promise<Angebot[]> {
  const [data, labelsBySlug] = await Promise.all([
    wpGraphql<{ angebote: { nodes: Omit<Angebot, "kategorieLabels">[] } }>(
      `query Angebote {
        angebote(first: 50) {
          nodes {
            slug
            title
            angebote {
              kurzbeschreibung
              kontaktMail
              kategorie {
                nodes {
                  ... on Angebotskategorie {
                    slug
                    title
                  }
                }
              }
              foto {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }`,
      ["wordpress", "angebot"],
    ),
    getAngebotKategorieLabels(),
  ]);

  return data.angebote.nodes.map((item) => ({
    ...item,
    kategorieLabels: labelsBySlug[item.slug] ?? [],
  }));
}

function extractKategorieLabels(value: unknown): string[] {
  if (value == null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(extractKategorieLabels);
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

async function getAngebotKategorieLabels(): Promise<Record<string, string[]>> {
  if (!WORDPRESS_URL) {
    return {};
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/angebot?per_page=100`, {
      cache: "force-cache",
      next: {
        tags: ["wordpress", "angebot"],
        revalidate: 3600,
      },
    });
    if (!response.ok) {
      return {};
    }
    const items = (await response.json()) as Array<{
      slug: string;
      acf?: { kategorie?: unknown };
    }>;
    const map: Record<string, string[]> = {};
    for (const item of items) {
      map[item.slug] = extractKategorieLabels(item.acf?.kategorie);
    }
    return map;
  } catch {
    return {};
  }
}

export async function getAngebotBySlug(slug: string): Promise<Angebot | null> {
  const angebote = await getAngebote();
  return angebote.find((item) => item.slug === slug) ?? null;
}

export async function getTermine(): Promise<Termin[]> {
  const data = await wpGraphql<{ termine: { nodes: Termin[] } }>(
    `query Termine {
      termine(first: 50) {
        nodes {
          slug
          title
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          termine {
            datum
            von
            bisUhrzeit
            ort
            hinweis
            kurzbeschreibung
            foto {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }`,
    ["wordpress", "termin"],
  );
  return [...data.termine.nodes].sort((a, b) => {
    const left = a.termine?.datum ?? "";
    const right = b.termine?.datum ?? "";
    return left.localeCompare(right);
  });
}

export async function getTerminBySlug(slug: string): Promise<Termin | null> {
  const termine = await getTermine();
  return termine.find((item) => item.slug === slug) ?? null;
}

const ROLE_ORDER = [
  "1. Vorsitzende",
  "2. Vorsitzende",
  "Schriftführerin",
  "Schatzmeisterin",
];

export function sortVorstand(members: Vorstandsperson[]): Vorstandsperson[] {
  return [...members].sort((a, b) => {
    const roleA = a.vorstandspersonen?.rolle?.trim() ?? "";
    const roleB = b.vorstandspersonen?.rolle?.trim() ?? "";
    const indexA = ROLE_ORDER.indexOf(roleA);
    const indexB = ROLE_ORDER.indexOf(roleB);
    const orderA = indexA === -1 ? ROLE_ORDER.length : indexA;
    const orderB = indexB === -1 ? ROLE_ORDER.length : indexB;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return (a.title ?? "").localeCompare(b.title ?? "", "de");
  });
}

export function excerpt(text: string | null | undefined, max = 180): string {
  if (!text) {
    return "";
  }
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean;
  }
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function formatWpDate(iso: string | null): string | null {
  if (!iso) {
    return null;
  }
  const datePart = iso.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) {
    return iso;
  }
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatWpDateLong(iso: string | null): string | null {
  if (!iso) {
    return null;
  }
  const datePart = iso.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) {
    return iso;
  }
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function upcomingTermine(termine: Termin[], limit?: number): Termin[] {
  const todayIso = todayDateIso();
  const upcoming = termine.filter((item) => {
    const date = item.termine?.datum?.slice(0, 10);
    return !date || date >= todayIso;
  });
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function pastTermine(termine: Termin[]): Termin[] {
  const todayIso = todayDateIso();
  return termine
    .filter((item) => {
      const date = item.termine?.datum?.slice(0, 10);
      return Boolean(date && date < todayIso);
    })
    .sort((a, b) => (b.termine?.datum ?? "").localeCompare(a.termine?.datum ?? ""));
}

function todayDateIso(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export function formatWpDateParts(iso: string | null): {
  day: string;
  month: string;
  weekday: string;
  year: string;
} | null {
  if (!iso) {
    return null;
  }
  const datePart = iso.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  const date = new Date(Date.UTC(year, month - 1, day));
  return {
    day: String(day).padStart(2, "0"),
    month: date.toLocaleDateString("de-DE", { month: "short", timeZone: "UTC" }).replace(".", ""),
    weekday: date.toLocaleDateString("de-DE", { weekday: "short", timeZone: "UTC" }).replace(".", ""),
    year: String(year),
  };
}

function parseWpTime(value: string | null): { hours: number; minutes: number; meridiem: string | null } | null {
  if (!value) {
    return null;
  }
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
  if (!match) {
    return null;
  }
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toLowerCase() ?? null;
  if (meridiem === "pm" && hours < 12) {
    hours += 12;
  }
  if (meridiem === "am" && hours === 12) {
    hours = 0;
  }
  return { hours, minutes, meridiem };
}

function formatHoursMinutes(hours: number, minutes: number): string {
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}

export function formatWpTime(value: string | null): string | null {
  const parsed = parseWpTime(value);
  if (!parsed) {
    return value;
  }
  return `${formatHoursMinutes(parsed.hours, parsed.minutes)} Uhr`;
}

export function formatWpTimeRange(von: string | null, bis: string | null): string | null {
  let start = parseWpTime(von);
  const end = parseWpTime(bis);
  if (
    start &&
    end &&
    start.meridiem === "pm" &&
    start.hours * 60 + start.minutes > end.hours * 60 + end.minutes
  ) {
    start = { ...start, hours: start.hours - 12 };
  }
  if (start && end) {
    return `${formatHoursMinutes(start.hours, start.minutes)} – ${formatHoursMinutes(end.hours, end.minutes)} Uhr`;
  }
  if (start) {
    return `${formatHoursMinutes(start.hours, start.minutes)} Uhr`;
  }
  return von;
}

export function displayName(person: Vorstandsperson): string {
  const first = person.vorstandspersonen?.vorname?.trim();
  const last = person.vorstandspersonen?.nachname?.trim();
  const combined = `${first ?? ""} ${last ?? ""}`.trim();
  return combined || person.title;
}
