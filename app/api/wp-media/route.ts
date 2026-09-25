import { NextRequest } from "next/server";
import { getWordpressUrl } from "@/lib/wordpress";

function isSafeUploadPath(path: string): boolean {
  return (
    path.startsWith("/wp-content/uploads/") &&
    !path.includes("..") &&
    !path.includes("\\") &&
    /\.pdf$/i.test(path)
  );
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "";
  const wordpressUrl = getWordpressUrl();

  if (!wordpressUrl || !isSafeUploadPath(path)) {
    return new Response("Ungültige Datei", { status: 400 });
  }

  const response = await fetch(`${wordpressUrl}${path}`);
  if (!response.ok || !response.body) {
    return new Response("Datei nicht gefunden", { status: 404 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${path.split("/").pop() ?? "dokument.pdf"}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
