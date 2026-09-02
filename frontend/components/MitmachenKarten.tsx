import Link from "next/link";
import { MitmachenIcon } from "@/components/MitmachenIcons";
import { WpContent } from "@/components/Content";
import { MITMACHEN_WEGE, mitmachenHref } from "@/lib/mitmachen";
import type { MitmachenWeg } from "@/lib/mitmachen";
import type { ExtractedImage } from "@/lib/html";

export function MitmachenHeader({
  title = "Mitmachen & Unterstützen",
  showAllLink = true,
}: {
  title?: string;
  showAllLink?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-3xl tracking-tight text-[var(--navy)] sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-[var(--navy)]">
          Es gibt viele Möglichkeiten, den Kinderschutzbund Alpen zu unterstützen und gemeinsam
          Gutes zu bewirken.
        </p>
      </div>
      {showAllLink ? (
        <Link href="/mitmachen" className="shrink-0 font-bold text-[var(--accent)]">
          Alle Wege ansehen →
        </Link>
      ) : null}
    </div>
  );
}

export function MitmachenKarten() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {MITMACHEN_WEGE.map((weg) => (
        <Link
          key={weg.id}
          href={mitmachenHref(weg)}
          className="flex h-full flex-col rounded-[1.6rem] bg-white p-6 shadow-[0_12px_32px_rgba(30,58,95,0.08)]"
        >
          <MitmachenIcon id={weg.id} color={weg.accent} />
          <h3 className="mt-5 text-[1.35rem] leading-snug" style={{ color: weg.accent }}>
            {weg.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{weg.description}</p>
          <span className="mt-auto pt-5 text-sm font-semibold text-[var(--accent)]">Mehr erfahren →</span>
        </Link>
      ))}
    </div>
  );
}

export type MitmachenInhalt = {
  weg: MitmachenWeg;
  title: string;
  html: string;
  image: ExtractedImage | null;
};

export function MitmachenNachWegen({ inhalte }: { inhalte: MitmachenInhalt[] }) {
  return (
    <div className="space-y-16">
      {inhalte.map(({ weg, title, html, image }) => (
        <section key={weg.pageSlug} id={weg.pageSlug} className="scroll-mt-32">
          <div className="flex items-start gap-4">
            <MitmachenIcon id={weg.id} color={weg.accent} />
            <h2 className="text-3xl tracking-tight sm:text-4xl" style={{ color: weg.accent }}>
              {title}
            </h2>
          </div>
          <div className={`mt-8 ${image ? "grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
            <div className="max-w-3xl space-y-5 text-[var(--muted)]">
              {html ? (
                <WpContent html={html} />
              ) : (
                weg.body.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)
              )}
            </div>
            {image ? (
              <img
                src={image.src}
                alt={image.alt || title}
                className="w-full rounded-[2rem] object-cover"
              />
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}

