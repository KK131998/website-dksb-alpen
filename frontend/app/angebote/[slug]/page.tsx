import Link from "next/link";
import { notFound } from "next/navigation";
import { AngebotKarte } from "@/components/AngebotKarte";
import { BlobShape, BrandLogo } from "@/components/Brand";
import { PageIntro } from "@/components/Content";
import {
  KATEGORIE_PRESETS,
  categoryOfOffer,
  getCategoryBySlug,
  loadKategorien,
  offersInCategory,
  type AngebotKategorie,
} from "@/lib/angebot-kategorien";
import { getAngebotBySlug, getAngebote } from "@/lib/wordpress";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const presetParams = KATEGORIE_PRESETS.map((preset) => ({ slug: preset.id }));
  try {
    const [kategorien, angebote] = await Promise.all([loadKategorien(), getAngebote()]);
    const slugs = new Set([
      ...presetParams.map((item) => item.slug),
      ...kategorien.map((category) => category.slug),
      ...angebote.map((item) => item.slug),
    ]);
    return [...slugs].map((slug) => ({ slug }));
  } catch {
    return presetParams;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kategorien = await loadKategorien();
  const category = getCategoryBySlug(slug, kategorien);
  if (category) {
    return { title: category.title };
  }
  const item = await getAngebotBySlug(slug);
  return { title: item?.title ?? "Angebot" };
}

export default async function AngebotSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [kategorien, angebote] = await Promise.all([loadKategorien(), getAngebote()]);
  const category = getCategoryBySlug(slug, kategorien);
  if (category) {
    return <KategoriePage category={category} angebote={angebote} />;
  }
  return <AngebotDetailPage slug={slug} kategorien={kategorien} />;
}

function KategoriePage({
  category,
  angebote,
}: {
  category: AngebotKategorie;
  angebote: Awaited<ReturnType<typeof getAngebote>>;
}) {
  const items = offersInCategory(angebote, category);

  return (
    <main className="overflow-hidden px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 text-sm font-semibold">
          <Link href="/angebote">← Unsere Angebote</Link>
        </p>
        <PageIntro title={category.title} kicker="Angebote">
          {category.description ? (
            <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">
              {category.description}
            </p>
          ) : null}
        </PageIntro>
        {items.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((item) => (
              <AngebotKarte key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">Für diese Kategorie gibt es gerade keine Einträge.</p>
        )}
      </div>
    </main>
  );
}

async function AngebotDetailPage({
  slug,
  kategorien,
}: {
  slug: string;
  kategorien: AngebotKategorie[];
}) {
  const item = await getAngebotBySlug(slug);

  if (!item) {
    notFound();
  }

  const photo = item.angebote?.foto?.node;
  const mail = item.angebote?.kontaktMail;
  const category = categoryOfOffer(item, kategorien);
  const paragraphs = (item.angebote?.kurzbeschreibung ?? "")
    .split(/\n{2,}|(?<=\.)\s{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <main className="relative overflow-hidden px-6 py-16">
      <BlobShape className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] text-[var(--sky)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-6 text-sm font-semibold">
            <Link href={category ? `/angebote/${category.slug}` : "/angebote"}>
              ← {category ? category.title : "Unsere Angebote"}
            </Link>
          </p>
          {category ? (
            <p className="mb-3 text-sm font-semibold" style={{ color: category.accent }}>
              {category.title}
            </p>
          ) : null}
          <PageIntro title={item.title} kicker="Angebot" />
          <div className="space-y-5 text-lg leading-8 text-[var(--muted)]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          {mail ? (
            <p className="mt-8 font-semibold">
              Kontakt: <a href={`mailto:${mail}`}>{mail}</a>
            </p>
          ) : null}
        </div>
        <div className="relative">
          {photo ? (
            <img
              src={photo.sourceUrl}
              alt={photo.altText || item.title}
              className="relative z-10 w-full rounded-full object-cover"
            />
          ) : (
            <div className="relative z-10 flex aspect-square items-center justify-center rounded-full bg-[var(--sky)] p-10 text-center">
              <BrandLogo className="h-16 w-auto max-w-[220px] object-contain" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
