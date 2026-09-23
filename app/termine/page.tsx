import { BlobShape } from "@/components/Brand";
import { PageIntro } from "@/components/Content";
import { TerminKarten } from "@/components/TerminKarten";
import { getTermine, pastTermine, upcomingTermine } from "@/lib/wordpress";

export const dynamic = "force-static";

export default async function TerminePage() {
  const termine = await getTermine();
  const aktuell = upcomingTermine(termine);
  const vergangen = pastTermine(termine);

  return (
    <main className="relative overflow-hidden px-6 py-16">
      <BlobShape className="pointer-events-none absolute -left-20 top-0 h-80 w-80 text-[var(--sky)]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <PageIntro title="Termine" kicker="Kalender">
          <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Vorträge, Kurse und Begegnungen – öffentlich und vor Ort.
          </p>
        </PageIntro>

        {termine.length === 0 ? (
          <p className="text-[var(--muted)]">Aktuell sind keine Termine veröffentlicht.</p>
        ) : (
          <>
            <section>
              <h2 className="mb-6 text-2xl text-[var(--navy)]">Aktuelle Termine</h2>
              {aktuell.length > 0 ? (
                <TerminKarten termine={aktuell} />
              ) : (
                <p className="text-[var(--muted)]">Gerade stehen keine kommenden Termine an.</p>
              )}
            </section>

            {vergangen.length > 0 ? (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl text-[var(--navy)]">Vergangene Termine</h2>
                <TerminKarten termine={vergangen} />
              </section>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
