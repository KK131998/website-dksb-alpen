import { BlobShape } from "@/components/Brand";
import { PageIntro, WpContent } from "@/components/Content";
import { LeitbildListe } from "@/components/LeitbildListe";
import { extractFirstImage, stripMedia } from "@/lib/html";
import { splitLeitbildContent } from "@/lib/leitbild";
import { PAGE_SLUGS, WordpressError, getPageBySlug } from "@/lib/wordpress";

export const dynamic = "force-static";

export const metadata = {
  title: "Unser Leitbild",
};

export default async function LeitbildPage() {
  try {
    const page = await getPageBySlug(PAGE_SLUGS.leitbild);
    if (!page) {
      return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16">
          <PageIntro title="Unser Leitbild" kicker="Verein" />
          <p className="text-[var(--muted)]">Diese Seite ist in WordPress noch nicht veröffentlicht.</p>
        </main>
      );
    }

    const image = extractFirstImage(page.content);
    const { introHtml, ziele } = splitLeitbildContent(stripMedia(page.content));

    return (
      <main className="relative overflow-hidden px-6 py-16">
        <BlobShape className="pointer-events-none absolute -left-24 top-0 h-80 w-80 text-[var(--sky)]" />
        <div
          className={`relative mx-auto w-full max-w-6xl ${
            image ? "grid items-start gap-12 lg:grid-cols-2" : "max-w-3xl"
          }`}
        >
          <div>
            <PageIntro title={page.title} kicker="Verein" />
            <WpContent html={introHtml} />
            <p className="mt-8 font-heading text-xl font-medium" style={{ color: "#c2187a" }}>
              Daher verstehen wir unter Kinderschutz:
            </p>
            <div className="mt-5">
              <LeitbildListe items={ziele} />
            </div>
          </div>
          {image ? (
            <div className="relative mx-auto max-w-lg lg:sticky lg:top-28">
              <BlobShape className="absolute -inset-8 text-[var(--sky)]" />
              <img
                src={image.src}
                alt={image.alt || page.title}
                className="relative z-10 w-full rounded-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </main>
    );
  } catch (error) {
    const message = error instanceof WordpressError ? error.message : "Unbekannter Fehler";
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <PageIntro title="Unser Leitbild" />
        <p className="text-[var(--muted)]">WordPress ist gerade nicht erreichbar.</p>
        <pre className="mt-4 overflow-x-auto rounded-3xl bg-[var(--navy)] p-4 text-sm text-white">
          {message}
        </pre>
      </main>
    );
  }
}
