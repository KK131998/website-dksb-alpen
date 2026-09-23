export type ExtractedImage = {
  src: string;
  alt: string;
};

export function extractFirstImage(html: string | null | undefined): ExtractedImage | null {
  if (!html) {
    return null;
  }
  const match = html.match(/<img[^>]+>/i);
  if (!match) {
    return null;
  }
  const tag = match[0];
  const src = tag.match(/src="([^"]+)"/i)?.[1];
  if (!src) {
    return null;
  }
  const alt = tag.match(/alt="([^"]*)"/i)?.[1] ?? "";
  return { src, alt };
}

export function stripMedia(html: string | null | undefined): string {
  if (!html) {
    return "";
  }
  return html
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/(<p[^>]*>\s*<\/p>)/gi, "")
    .trim();
}

export type ContentSection = {
  heading: string;
  html: string;
};

export function extractH3Sections(html: string | null | undefined): ContentSection[] {
  if (!html) {
    return [];
  }
  const parts = html.split(/<h3\b[^>]*>/i).slice(1);
  return parts.map((part) => {
    const [headingRaw, ...rest] = part.split(/<\/h3>/i);
    return {
      heading: headingRaw.replace(/<[^>]+>/g, "").trim(),
      html: rest.join("</h3>").trim(),
    };
  }).filter((section) => section.heading);
}

export function leadParagraph(html: string | null | undefined): string {
  if (!html) {
    return "";
  }
  const withoutMedia = stripMedia(html);
  const match = withoutMedia.match(/<p\b[^>]*>[\s\S]*?<\/p>/i);
  return match?.[0] ?? withoutMedia;
}
