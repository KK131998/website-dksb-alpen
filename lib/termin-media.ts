import type { Termin } from "@/lib/wordpress";

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
