import Link from "next/link";
import { AngebotKategorieCards, AngebotKategorieHeader } from "@/components/AngebotKategorien";
import { BlobShape } from "@/components/Brand";
import { WpContent } from "@/components/Content";
import { MitmachenHeader, MitmachenKarten } from "@/components/MitmachenKarten";
import { TerminHeader, TerminKarten } from "@/components/TerminKarten";
import { extractFirstImage, extractH3Sections, stripMedia } from "@/lib/html";
import {
  PAGE_SLUGS,
  getAngebote,
  getAngebotskategorien,
  getPageBySlug,
  getTermine,
  upcomingTermine,
} from "@/lib/wordpress";
import { resolveKategorien } from "@/lib/angebot-kategorien";

export const dynamic = "force-static";

export default async function Home() {
  const [page, angebote, wpKategorien, termine] = await Promise.all([
    getPageBySlug(PAGE_SLUGS.home),
    getAngebote(),
    getAngebotskategorien(),
    getTermine(),
  ]);
  const kategorien = resolveKategorien(wpKategorien, angebote);

  const heroImage = extractFirstImage(page?.content);
  const introHtml = stripMedia(page?.content ?? "").split(/<h3\b/i)[0];
  const themes = extractH3Sections(page?.content);
  const upcoming = upcomingTermine(termine, 3);

  return (
    <main className="overflow-hidden">
      <section className="bg-[var(--sky)]">
        <div className="mx-auto w-full max-w-[74.5rem] px-6 py-12 lg:py-16">
          {heroImage ? (
            <div className="relative mx-auto w-full">
              <img
                src={heroImage.src}
                alt={heroImage.alt || ""}
                className="h-auto w-full rounded-3xl object-contain shadow-[0_18px_40px_rgba(25,78,158,0.18)]"
              />
              <p
                className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-3xl leading-tight sm:text-5xl lg:text-6xl"
                style={{
                  color: "white",
                  fontFamily: '"Blogger Sans", var(--font-heading), Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  textShadow: "0 2px 18px rgba(25, 78, 158, 0.55)",
                }}
              >
                Der Kinderschutzbund e.V.
              </p>
            </div>
          ) : null}
          <div className={`text-center ${heroImage ? "mt-10" : ""}`}>
            <p className="font-subhead text-[var(--navy)]">Kinderschutzbund Alpen</p>
            <h1 className="page-title mt-2 text-5xl sm:text-6xl">Hinsehen, zuhören, helfen.</h1>
            <p className="mx-auto mt-5 max-w-xl text-[var(--muted)]">
              Für Kinder, Jugendliche und Familien in der Gemeinde Alpen – ehrenamtlich,
              nah und unbürokratisch.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/angebote"
                className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white"
              >
                Unser Angebot
              </Link>
              <Link
                href="/termine"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--navy)] ring-1 ring-[var(--navy)]/15"
              >
                Termine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {upcoming.length > 0 ? (
        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-6xl">
            <TerminHeader />
            <TerminKarten termine={upcoming} />
          </div>
        </section>
      ) : null}

      <section className="relative mx-auto w-full max-w-3xl px-6 py-10 text-center">
        <WpContent html={introHtml} />
      </section>

      {themes.length > 0 ? (
        <section className="px-6 py-8">
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
            {themes.map((theme) => (
              <article
                key={theme.heading}
                className="relative overflow-hidden rounded-[2.5rem] bg-white px-8 py-12 text-center"
              >
                <BlobShape className="absolute inset-x-0 top-4 mx-auto h-56 w-56 text-[var(--sky)]" />
                <div className="relative">
                  <h2 className="text-3xl leading-tight">{theme.heading}</h2>
                  <div className="wp-content mt-4 text-left text-base">
                    <WpContent html={theme.html.replace(/<figure[\s\S]*?<\/figure>/gi, "")} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <AngebotKategorieHeader />
          <AngebotKategorieCards angebote={angebote} kategorien={kategorien} />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <MitmachenHeader />
          <MitmachenKarten />
        </div>
      </section>
    </main>
  );
}
