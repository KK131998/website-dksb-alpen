import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <h1 className="page-title text-5xl">Seite nicht gefunden</h1>
      <p className="mt-4 text-[var(--muted)]">Diese Adresse gibt es auf der Website nicht.</p>
      <Link href="/" className="mt-6 inline-block font-semibold">
        Zur Startseite
      </Link>
    </main>
  );
}
