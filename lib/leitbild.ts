export const LEITBILD_ZIELE = [
  "durch individuelle Hilfe das Wohl von Kindern und Jugendlichen zu schützen",
  "durch präventive und unterstützenden Maßnahmen ein gesundes Aufwachsen von Kindern und Jugendlichen zu ermöglichen",
  "durch politisches Engagement Kinder und Jugendliche vor Gewalt und Chancenungleichheit zu schützen",
  "durch Entlastung, Unterstützung und Beratung Eltern in ihrer Erziehungskompetenz zu stärken",
  "durch konkrete Hilfe Kindern und Jugendlichen in Armut zu unterstützen",
];

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&sect;/gi, "§")
    .replace(/&#167;/g, "§")
    .replace(/\s+/g, " ")
    .trim();
}

function extractListItems(html: string): string[] {
  return [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) => decodeHtml(match[1]))
    .filter(Boolean);
}

export function splitLeitbildContent(html: string): {
  introHtml: string;
  ziele: string[];
} {
  const ziele = extractListItems(html).filter((item) => /^durch\s/i.test(item));
  const introHtml = html
    .replace(/<ul\b[^>]*>[\s\S]*?<\/ul>/gi, "")
    .replace(/(<p[^>]*>\s*<\/p>)/gi, "")
    .trim();

  return {
    introHtml,
    ziele: ziele.length > 0 ? ziele : LEITBILD_ZIELE,
  };
}
