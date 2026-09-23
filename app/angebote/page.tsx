import { AngebotNachKategorien } from "@/components/AngebotKategorien";
import { PageIntro } from "@/components/Content";
import { ScrollToHash } from "@/components/ScrollToHash";
import { resolveKategorien } from "@/lib/angebot-kategorien";
import { getAngebote, getAngebotskategorien } from "@/lib/wordpress";

export const dynamic = "force-static";

export const metadata = {
  title: "Unsere Angebote",
};

export default async function AngebotePage() {
  const [angebote, wpKategorien] = await Promise.all([getAngebote(), getAngebotskategorien()]);
  const kategorien = resolveKategorien(wpKategorien, angebote);

  return (
    <main className="overflow-hidden px-6 py-16">
      <ScrollToHash />
      <div className="mx-auto w-full max-w-6xl">
        <PageIntro title="Unsere Angebote" kicker="Für Familien in Alpen">
          <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Wir sind für Kinder, Jugendliche und Eltern da – mit Herz, Erfahrung und vielen Angeboten.
          </p>
        </PageIntro>
        <AngebotNachKategorien angebote={angebote} kategorien={kategorien} />
      </div>
    </main>
  );
}
