import { AngebotKategorieCards } from "@/components/AngebotKategorien";
import { PageIntro } from "@/components/Content";
import { resolveKategorien } from "@/lib/angebot-kategorien";
import { getAngebote, getAngebotskategorien } from "@/lib/wordpress";

export const dynamic = "force-static";

export default async function AngebotePage() {
  const [angebote, wpKategorien] = await Promise.all([getAngebote(), getAngebotskategorien()]);
  const kategorien = resolveKategorien(wpKategorien, angebote);

  return (
    <main className="overflow-hidden px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <PageIntro title="Unsere Angebote" kicker="Für Familien in Alpen">
          <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Wir sind für Kinder, Jugendliche und Eltern da – mit Herz, Erfahrung und vielen Angeboten.
          </p>
        </PageIntro>
        <AngebotKategorieCards angebote={angebote} kategorien={kategorien} />
      </div>
    </main>
  );
}
