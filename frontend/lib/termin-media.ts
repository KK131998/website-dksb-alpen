import { getWordpressUrl, type Termin } from "@/lib/wordpress";

const MEDIA = "/wp-content/uploads/2026/08";

const KEYWORD_IMAGES: { match: RegExp; file: string }[] = [
  { match: /digital|vortrag|kinderschutz/i, file: "kinderschutzkonzept.jpg" },
  { match: /selbstbehaupt|m[aä]dchen|kurs|kinder|jugend/i, file: "leitbild.jpg" },
  { match: /lesung|krim|vorles/i, file: "wer_wir_sind_gruppe.jpg" },
  { match: /baby|buch|neugebor|familie/i, file: "Neugeborenbegrusung.jpg" },
];

const CYCLE = [
  "hero.jpg",
  "leitbild.jpg",
  "kinderschutzkonzept.jpg",
  "wer_wir_sind_gruppe.jpg",
  "Neugeborenbegrusung.jpg",
];

function wpMedia(file: string): string {
  const base = getWordpressUrl() ?? "";
  return `${base}${MEDIA}/${file}`;
}

export function terminImage(item: Termin, index = 0): { src: string; alt: string } {
  const featured = item.featuredImage?.node;
  if (featured?.sourceUrl) {
    return { src: featured.sourceUrl, alt: featured.altText || item.title };
  }

  const haystack = `${item.slug} ${item.title}`;
  const matched = KEYWORD_IMAGES.find((entry) => entry.match.test(haystack));
  if (matched) {
    return { src: wpMedia(matched.file), alt: item.title };
  }

  return { src: wpMedia(CYCLE[index % CYCLE.length]), alt: item.title };
}

export function shortLocation(ort: string | null | undefined): string | null {
  if (!ort) {
    return null;
  }
  return ort.split(",")[0]?.trim() || ort.trim();
}

export function terminMetaLine(item: Termin): string | null {
  const place = shortLocation(item.termine?.ort);
  const note = item.termine?.hinweis?.trim() || null;
  return [place, note].filter(Boolean).join(" · ") || null;
}
