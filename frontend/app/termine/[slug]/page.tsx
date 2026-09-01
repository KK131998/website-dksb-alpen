import Link from "next/link";
import { notFound } from "next/navigation";
import { BlobShape, BrandLogo } from "@/components/Brand";
import { PageIntro } from "@/components/Content";
import { terminImage } from "@/lib/termin-media";
import {
  formatWpDate,
  formatWpDateParts,
  formatWpTimeRange,
  getTerminBySlug,
  getTermine,
} from "@/lib/wordpress";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const termine = await getTermine();
    return termine.map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getTerminBySlug(slug);
  return { title: item?.title ?? "Termin" };
}

export default async function TerminDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getTerminBySlug(slug);

  if (!item) {
    notFound();
  }

  const timeRange = formatWpTimeRange(item.termine?.von ?? null, item.termine?.bisUhrzeit ?? null);
  const image = terminImage(item);
  const parts = formatWpDateParts(item.termine?.datum);
  const month = (parts?.month ?? "").slice(0, 3).toUpperCase();

  return (
    <main className="relative overflow-hidden px-6 py-16">
      <BlobShape className="pointer-events-none absolute right-0 top-10 h-80 w-80 text-[var(--sky)]" />
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_10px_40px_rgba(30,58,95,0.06)]">
        <div className="relative h-64">
          <img src={image.src} alt="" className="h-full w-full object-cover" />
          {parts ? (
            <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
              <span className="text-2xl font-semibold leading-none text-[var(--accent)]">{parts.day}</span>
              <span className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--accent)]">
                {month}
              </span>
            </div>
          ) : null}
        </div>
        <div className="p-8 sm:p-12">
        <p className="mb-6 text-sm font-semibold">
          <Link href="/termine">← Alle Termine</Link>
        </p>
        <PageIntro title={item.title} kicker="Termin" />
        <dl className="space-y-5 text-[var(--muted)]">
          <div>
            <dt className="font-subhead text-lg text-[var(--navy)]">Datum</dt>
            <dd>{formatWpDate(item.termine?.datum) ?? "wird noch bekannt gegeben"}</dd>
          </div>
          {timeRange ? (
            <div>
              <dt className="font-subhead text-lg text-[var(--navy)]">Uhrzeit</dt>
              <dd>{timeRange}</dd>
            </div>
          ) : null}
          {item.termine?.ort ? (
            <div>
              <dt className="font-subhead text-lg text-[var(--navy)]">Ort</dt>
              <dd>{item.termine.ort}</dd>
            </div>
          ) : null}
          {item.termine?.hinweis ? (
            <div>
              <dt className="font-subhead text-lg text-[var(--navy)]">Hinweis</dt>
              <dd>{item.termine.hinweis}</dd>
            </div>
          ) : null}
        </dl>
        <BrandLogo className="mt-10 ml-auto h-12 w-auto max-w-[220px] object-contain" />
        </div>
      </div>
    </main>
  );
}
