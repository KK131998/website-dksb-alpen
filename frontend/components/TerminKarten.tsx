import Link from "next/link";
import { terminImage, terminMetaLine } from "@/lib/termin-media";
import {
  formatWpDateLong,
  formatWpDateParts,
  formatWpTimeRange,
  type Termin,
} from "@/lib/wordpress";

export function TerminKarten({ termine }: { termine: Termin[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {termine.map((item, index) => (
        <TerminKarte key={item.slug} item={item} index={index} />
      ))}
    </div>
  );
}

export function TerminKarte({ item, index = 0 }: { item: Termin; index?: number }) {
  const parts = formatWpDateParts(item.termine?.datum);
  const dateLabel = formatWpDateLong(item.termine?.datum);
  const timeRange = formatWpTimeRange(item.termine?.von ?? null, item.termine?.bisUhrzeit ?? null);
  const when = [dateLabel, timeRange].filter(Boolean).join(" · ");
  const where = terminMetaLine(item);
  const image = terminImage(item, index);
  const month = (parts?.month ?? "").slice(0, 3).toUpperCase();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_rgba(30,58,95,0.08)]">
      <div className="relative h-48 overflow-hidden">
        <img src={image.src} alt="" className="h-full w-full object-cover" />
        {parts ? (
          <div className="absolute left-3 top-3 flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
            <span className="text-xl font-semibold leading-none text-[var(--accent)]">{parts.day}</span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
              {month}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug text-[var(--navy)]">{item.title}</h3>
        {when ? <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{when}</p> : null}
        {where ? <p className="text-sm leading-6 text-[var(--muted)]">{where}</p> : null}
        <Link href={`/termine/${item.slug}`} className="mt-auto pt-5 text-sm font-bold text-[var(--accent)]">
          Mehr erfahren →
        </Link>
      </div>
    </article>
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
