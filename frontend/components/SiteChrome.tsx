import Link from "next/link";
import { BrandLogo, BundesverbandLogo } from "@/components/Brand";
import { MITMACHEN_SPENDEN_HREF } from "@/lib/mitmachen";

const NAV = [
  { href: "/wer-wir-sind", label: "Über Uns" },
  { href: "/leitbild", label: "Leitbild" },
  { href: "/kinderschutzkonzept", label: "Kinderschutz" },
  { href: "/angebote", label: "Unsere Angebote" },
  { href: "/mitmachen", label: "Mitmachen & Spenden" },
  { href: "/termine", label: "Termine" },
  { href: "/kontakt", label: "Kontakt" },
];

function SpendenButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href={MITMACHEN_SPENDEN_HREF}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent)] ${className}`}
    >
      Spenden
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 13.5S3.5 10.4 3.5 6.9A2.7 2.7 0 0 1 8 5.2 2.7 2.7 0 0 1 12.5 6.9C12.5 10.4 8 13.5 8 13.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <BrandLogo className="h-11 w-auto max-w-[200px] object-contain sm:h-12 sm:max-w-[240px]" />
        </Link>
        <div className="hidden items-center gap-x-6 gap-y-2 md:flex">
          <nav
            aria-label="Hauptnavigation"
            className="flex flex-wrap justify-end gap-x-6 gap-y-1 text-[15px] font-semibold text-[var(--navy)]"
          >
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--accent)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <SpendenButton />
        </div>
      </div>
      <nav
        aria-label="Mobilnavigation"
        className="flex items-center gap-4 overflow-x-auto px-6 pb-3 text-[13px] font-semibold text-[var(--navy)] md:hidden"
      >
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
        <SpendenButton className="text-[13px]" />
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--sky)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <BrandLogo className="h-16 w-auto max-w-[280px] object-contain" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">
            Hinsehen, zuhören, helfen – ehrenamtlich für Kinder, Jugendliche und
            Familien in der Gemeinde Alpen.
          </p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p className="font-subhead text-2xl text-[var(--navy)]">Kontakt</p>
          <p className="mt-2">Weststraße 10, 46519 Alpen</p>
          <p>02802 6783</p>
          <a className="font-semibold text-[var(--navy)]" href="mailto:info@dksb-alpen.de">
            info@dksb-alpen.de
          </a>
          <p className="mt-3">
            <Link href="/mitmachen" className="font-semibold text-[var(--navy)]">
              Mitmachen & Unterstützen
            </Link>
          </p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p className="font-subhead text-2xl text-[var(--navy)]">Rechtliches</p>
          <p className="mt-2 flex flex-col gap-1 font-semibold text-[var(--navy)]">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </p>
        </div>
      </div>
      <div className="border-t border-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--muted)]">Mitglied im Kinderschutzbund Bundesverband</p>
          <a
            href="https://www.dksb.de"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-[var(--navy)] px-3 py-2"
          >
            <BundesverbandLogo className="h-10 w-auto object-contain mix-blend-screen sm:h-12" />
          </a>
        </div>
      </div>
    </footer>
  );
}
