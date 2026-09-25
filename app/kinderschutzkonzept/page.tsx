import { BlobShape } from "@/components/Brand";
import { PageIntro, WpContent } from "@/components/Content";
import { PdfVorschau } from "@/components/PdfVorschau";
import { preferFullSizeImages } from "@/lib/html";
import { extractKonzeptPdf, splitKonzeptFileBlock } from "@/lib/kinderschutzkonzept";
import { PAGE_SLUGS, WordpressError, getPageBySlug } from "@/lib/wordpress";

export const dynamic = "force-static";

export const metadata = {
  title: "Unser Kinderschutzkonzept",
};

export default async function KinderschutzkonzeptPage() {
  try {
    const page = await getPageBySlug(PAGE_SLUGS.konzept);
    if (!page) {
      return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16">
          <PageIntro title="Unser Kinderschutzkonzept" kicker="Verein" />
          <p className="text-[var(--muted)]">Diese Seite ist in WordPress noch nicht veröffentlicht.</p>
        </main>
      );
    }

    const prepared = preferFullSizeImages(page.content);
    const pdf = extractKonzeptPdf(prepared);
    const { before, after } = splitKonzeptFileBlock(prepared);

    return (
      <main className="relative px-6 py-16">
        <BlobShape className="pointer-events-none absolute -left-24 top-0 h-80 w-80 text-[var(--sky)]" />
        <div className="relative mx-auto w-full max-w-5xl">
          <PageIntro title={page.title} kicker="Verein" />
          <WpContent html={before} />
          {pdf ? <PdfVorschau path={pdf.path} title={pdf.title} /> : null}
          <WpContent html={after} />
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof WordpressError ? error.message : "Unbekannter Fehler";
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <PageIntro title="Unser Kinderschutzkonzept" />
        <p className="text-[var(--muted)]">WordPress ist gerade nicht erreichbar.</p>
        <pre className="mt-4 overflow-x-auto rounded-3xl bg-[var(--navy)] p-4 text-sm text-white">
          {message}
        </pre>
      </main>
    );
  }
}
