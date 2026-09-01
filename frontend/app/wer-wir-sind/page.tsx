import { BlobShape } from "@/components/Brand";
import { PageIntro, WpContent } from "@/components/Content";
import { extractFirstImage, stripMedia } from "@/lib/html";
import {
  PAGE_SLUGS,
  displayName,
  getPageBySlug,
  getVorstand,
  sortVorstand,
} from "@/lib/wordpress";

export const dynamic = "force-static";

export default async function WerWirSindPage() {
  const [page, members] = await Promise.all([
    getPageBySlug(PAGE_SLUGS.about),
    getVorstand(),
  ]);
  const vorstand = sortVorstand(members);
  const image = extractFirstImage(page?.content);
  const text = stripMedia(page?.content ?? "");

  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <BlobShape className="pointer-events-none absolute -left-24 top-0 h-80 w-80 text-[var(--sky)]" />
        <div className="relative">
          <PageIntro title={page?.title ?? "Wer wir sind"} kicker="Ortsverband Alpen" />
          <WpContent html={text} />
        </div>
        {image ? (
          <div className="relative mx-auto max-w-lg">
            <BlobShape className="absolute -inset-10 text-[var(--sky)]" />
            <img
              src={image.src}
              alt={image.alt || "Vorstand des Kinderschutzbundes Alpen"}
              className="relative z-10 w-full rounded-[3rem] object-cover"
            />
          </div>
        ) : null}
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-4xl sm:text-5xl">Vorstand</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {vorstand.map((person) => {
              const photo = person.vorstandspersonen?.foto?.node;
              const mail = person.vorstandspersonen?.mail;
              return (
                <article
                  key={person.slug}
                  className="relative overflow-hidden rounded-[2.2rem] bg-white px-6 pb-8 pt-8 text-center shadow-[0_10px_40px_rgba(30,58,95,0.06)]"
                >
                  <BlobShape className="absolute -right-16 -top-16 h-56 w-56 text-[var(--sky)]" />
                  <BlobShape className="absolute -bottom-20 -left-16 h-48 w-48 text-[var(--sky)]" />
                  <p className="relative font-subhead text-lg">Vorstandsmitglied</p>
                  {photo ? (
                    <img
                      src={photo.sourceUrl}
                      alt={photo.altText || displayName(person)}
                      className="relative z-10 mx-auto mt-4 h-56 w-56 rounded-full object-cover object-top"
                    />
                  ) : (
                    <div className="relative z-10 mx-auto mt-4 flex h-56 w-56 items-center justify-center rounded-full bg-[var(--sky)] font-heading text-4xl">
                      {displayName(person)}
                    </div>
                  )}
                  <h3 className="relative z-10 mt-5 text-xl">{displayName(person)}</h3>
                  <p className="relative z-10 mt-1 text-sm text-[var(--muted)]">
                    {person.vorstandspersonen?.rolle}
                  </p>
                  {mail ? (
                    <a
                      href={`mailto:${mail}`}
                      className="relative z-10 mt-2 inline-block text-sm font-semibold"
                    >
                      {mail}
                    </a>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
