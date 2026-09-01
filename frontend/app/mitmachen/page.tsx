import Link from "next/link";
import { MitmachenBanner, MitmachenKarten } from "@/components/MitmachenKarten";

export const dynamic = "force-static";

export const metadata = {
  title: "Mitmachen & Unterstützen",
};

export default function MitmachenPage() {
  return (
    <main className="overflow-hidden px-6 py-16">
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

        <div className="mt-10">
          <MitmachenKarten />
        </div>
        <MitmachenBanner />
      </div>
    </main>
  );
}
