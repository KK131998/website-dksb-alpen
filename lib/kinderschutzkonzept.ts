export type KonzeptPdf = {
  href: string;
  path: string;
  title: string;
};

export function extractKonzeptPdf(html: string): KonzeptPdf | null {
  const href = html.match(/href="([^"]+\.pdf)"/i)?.[1];
  if (!href) {
    return null;
  }
  try {
    const url = new URL(href, "http://localhost");
    if (!url.pathname.startsWith("/wp-content/uploads/") || url.pathname.includes("..")) {
      return null;
    }
    const title =
      html.match(/wp-block-file[\s\S]*?<a[^>]*>([^<]+)<\/a>/i)?.[1]?.trim() ??
      decodeURIComponent(url.pathname.split("/").pop() ?? "Handbuch");
    return { href, path: url.pathname, title };
  } catch {
    return null;
  }
}

export function splitKonzeptFileBlock(html: string): { before: string; after: string } {
  const match = html.match(/<div\b[^>]*wp-block-file[\s\S]*?<\/div>/i);
  if (!match || match.index === undefined) {
    return { before: html, after: "" };
  }
  return {
    before: html.slice(0, match.index).trim(),
    after: html.slice(match.index + match[0].length).trim(),
  };
}
