import Link from "next/link";
import { notFound } from "next/navigation";
import { BlobShape, BrandLogo } from "@/components/Brand";
import { TerminKalenderblatt } from "@/components/TerminKarten";
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
  const parts = formatWpDateParts(item.termine?.datum);
  const photo = item.termine?.foto?.node;
  const paragraphs = (item.termine?.kurzbeschreibung ?? "")
    .split(/\n{2,}|(?<=\.)\s{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <main className="relative overflow-hidden px-6 py-16">
      <BlobShape className="pointer-events-none absolute right-0 top-10 h-80 w-80 text-[var(--sky)]" />
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_10px_40px_rgba(30,58,95,0.06)]">
        <div className="flex flex-col items-start gap-6 bg-[var(--sky)] px-8 py-8 sm:flex-row sm:items-center sm:px-12">
          {parts ? <TerminKalenderblatt parts={parts} size="detail" /> : null}
          <div>
            <p className="text-sm font-semibold text-[var(--navy)]">
              <Link href="/termine">← Alle Termine</Link>
            </p>
            <p className="mt-3 font-subhead text-[var(--navy)]">Termin</p>
            <h1 className="page-title mt-1 text-4xl sm:text-5xl">{item.title}</h1>
          </div>
        </div>
        {photo ? (
          <div className="bg-[var(--sky)] px-6 py-6 sm:px-10">
            <img
              src={photo.sourceUrl}
              alt={photo.altText || item.title}
              className="mx-auto max-h-[32rem] w-full object-contain"
            />
          </div>
        ) : null}
        <div className="p-8 sm:p-12">
          {paragraphs.length > 0 ? (
            <div className="mb-10 space-y-5 text-lg leading-8 text-[var(--muted)]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
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
