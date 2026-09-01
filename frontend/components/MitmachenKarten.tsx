import Link from "next/link";
import { MitmachenIcon } from "@/components/MitmachenIcons";
import { MITMACHEN_WEGE } from "@/lib/mitmachen";

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
        <article
          key={weg.id}
          className="flex h-full flex-col rounded-[1.6rem] bg-white p-6 shadow-[0_12px_32px_rgba(30,58,95,0.08)]"
        >
          <MitmachenIcon id={weg.id} color={weg.accent} />
          <h3 className="mt-5 text-[1.35rem] leading-snug" style={{ color: weg.accent }}>
            {weg.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{weg.description}</p>
          <Link href={weg.href} className="mt-auto pt-5 text-sm font-semibold text-[var(--accent)]">
            Mehr erfahren →
          </Link>
        </article>
      ))}
    </div>
  );
}

export function MitmachenBanner() {
  return (
    <section className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[1.6rem] bg-[var(--navy)] px-8 py-8 text-white sm:flex-row sm:items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl" style={{ color: "white" }}>
          Gemeinsam für Kinder in Alpen
        </h2>
        <p className="mt-2 text-white/90">Jede Unterstützung macht einen Unterschied!</p>
      </div>
      <Link
        href="/spenden"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[var(--navy)]"
      >
        Jetzt helfen
      </Link>
    </section>
  );
}
