import { BlobShape } from "@/components/Brand";
import { PageIntro, WpContent } from "@/components/Content";
import { extractFirstImage, preferFullSizeImages, stripMedia } from "@/lib/html";
import {
  PAGE_SLUGS,
  getPageBySlug,
  WordpressError,
} from "@/lib/wordpress";

export default async function CmsPage({
  slug,
  kicker,
  fallbackTitle,
  keepMedia = false,
}: {
  slug: string;
  kicker?: string;
  fallbackTitle: string;
  keepMedia?: boolean;
}) {
  try {
    const page = await getPageBySlug(slug);
    if (!page) {
      return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16">
          <PageIntro title={fallbackTitle} kicker={kicker} />
          <p className="text-[var(--muted)]">Diese Seite ist in WordPress noch nicht veröffentlicht.</p>
        </main>
      );
    }

    const image = keepMedia ? null : extractFirstImage(page.content);
    const html = keepMedia ? preferFullSizeImages(page.content) : stripMedia(page.content);

    return (
      <main className={`relative px-6 py-16 ${keepMedia ? "" : "overflow-hidden"}`}>
        <BlobShape className="pointer-events-none absolute -left-24 top-0 h-80 w-80 text-[var(--sky)]" />
        <div
          className={`relative mx-auto w-full ${
            keepMedia
              ? "max-w-5xl"
              : image
                ? "max-w-6xl grid items-center gap-12 lg:grid-cols-2"
                : "max-w-3xl"
          }`}
        >
          <div>
            <PageIntro title={page.title} kicker={kicker} />
            <WpContent html={html} />
          </div>
          {image ? (
            <div className="relative mx-auto max-w-lg">
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
        <PageIntro title={fallbackTitle} />
        <p className="text-[var(--muted)]">WordPress ist gerade nicht erreichbar.</p>
        <pre className="mt-4 overflow-x-auto rounded-3xl bg-[var(--navy)] p-4 text-sm text-white">
          {message}
        </pre>
      </main>
    );
  }
}

export { PAGE_SLUGS };
