import Link from "next/link";
import { terminMetaLine } from "@/lib/termin-media";
import {
  formatWpDateParts,
  formatWpTimeRange,
  type Termin,
} from "@/lib/wordpress";

export function TerminKarten({ termine }: { termine: Termin[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {termine.map((item) => (
        <TerminKarte key={item.slug} item={item} />
      ))}
    </div>
  );
}

export function TerminKalenderblatt({
  parts,
  size = "card",
}: {
  parts: NonNullable<ReturnType<typeof formatWpDateParts>>;
  size?: "card" | "detail";
}) {
  const wide = size === "detail";
  return (
    <div
      className={`flex shrink-0 self-start flex-col overflow-hidden rounded-2xl bg-[var(--sky)] text-center shadow-[0_8px_20px_rgba(25,78,158,0.12)] ${
        wide ? "w-[6.75rem]" : "w-[5.5rem]"
      }`}
    >
      <div
        className={`bg-[var(--navy)] font-bold uppercase tracking-wider text-white ${
          wide ? "px-2 py-2 text-xs" : "px-2 py-1.5 text-[11px]"
        }`}
      >
        {parts.weekday}
      </div>
      <div className={`px-2 ${wide ? "py-4" : "py-3"}`}>
        <div
          className={`leading-none text-[var(--navy)] ${
            wide ? "text-5xl" : "text-4xl"
          }`}
        >
          {parts.day}
        </div>
        <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[var(--accent)]">
          {parts.month}
        </div>
      </div>
      <div
        className={`bg-[var(--navy)] font-semibold tracking-wide text-white ${
          wide ? "px-2 py-1.5 text-[11px]" : "px-2 py-1 text-[10px]"
        }`}
      >
        {parts.year}
      </div>
    </div>
  );
}

export function TerminKarte({ item }: { item: Termin }) {
  const parts = formatWpDateParts(item.termine?.datum);
  const timeRange = formatWpTimeRange(item.termine?.von ?? null, item.termine?.bisUhrzeit ?? null);
  const where = terminMetaLine(item);

  return (
    <Link
      href={`/termine/${item.slug}`}
      className="flex h-full gap-4 rounded-2xl bg-white p-4 shadow-[0_12px_32px_rgba(30,58,95,0.08)] sm:p-5"
    >
      {parts ? <TerminKalenderblatt parts={parts} /> : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg leading-snug text-[var(--navy)]">{item.title}</h3>
        {timeRange ? (
          <p className="mt-3 text-sm font-semibold text-[var(--navy)]">{timeRange}</p>
        ) : null}
        {where ? <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{where}</p> : null}
        <span className="mt-auto pt-4 text-sm font-bold text-[var(--accent)]">Mehr erfahren →</span>
      </div>
    </Link>
  );
}

export function TerminHeader({
  title = "Was ist gerade los?",
  showAllLink = true,
}: {
  title?: string;
  showAllLink?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="text-3xl tracking-tight text-[var(--navy)] sm:text-4xl">{title}</h2>
      {showAllLink ? (
        <Link href="/termine" className="shrink-0 font-bold text-[var(--accent)]">
          Alle Termine ansehen →
        </Link>
      ) : null}
    </div>
  );
}
