import Link from "next/link";
import { MitmachenNachWegen, type MitmachenInhalt } from "@/components/MitmachenKarten";
import { ScrollToHash } from "@/components/ScrollToHash";
import { extractFirstImage, stripMedia } from "@/lib/html";
import { MITMACHEN_WEGE } from "@/lib/mitmachen";
import { getPageBySlug } from "@/lib/wordpress";

export const dynamic = "force-static";

export const metadata = {
  title: "Mitmachen & Unterstützen",
};

async function loadMitmachenInhalte(): Promise<MitmachenInhalt[]> {
  return Promise.all(
    MITMACHEN_WEGE.map(async (weg) => {
      try {
        const page = await getPageBySlug(weg.pageSlug);
        return {
          weg,
          title: page?.title || weg.title,
          html: stripMedia(page?.content ?? ""),
          image: extractFirstImage(page?.content),
        };
      } catch {
        return {
          weg,
          title: weg.title,
          html: "",
          image: null,
        };
      }
    }),
  );
}

export default async function MitmachenPage() {
  const inhalte = await loadMitmachenInhalte();

  return (
    <main className="overflow-hidden px-6 py-16">
      <ScrollToHash />
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm text-[var(--accent)]">
          <Link href="/">Startseite</Link>
          <span className="px-2 text-[var(--muted)]">›</span>
          <span>Mitmachen & Unterstützen</span>
        </p>
        <h1 className="page-title mt-4 text-5xl sm:text-6xl">Mitmachen & Unterstützen</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Es gibt viele Möglichkeiten, den Kinderschutzbund Alpen zu unterstützen und gemeinsam
          Gutes zu bewirken.
        </p>

        <div className="mt-12">
          <MitmachenNachWegen inhalte={inhalte} />
        </div>
      </div>
    </main>
  );
}
