import Link from "next/link";
import { AngebotKarte } from "@/components/AngebotKarte";
import {
  categoryHref,
  categoryImage,
  offersInCategory,
  type AngebotKategorie,
} from "@/lib/angebot-kategorien";
import type { Angebot } from "@/lib/wordpress";

function CategoryIcon({ id, color }: { id: string; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id === "familien") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="9" r="4.5" {...common} />
        <path d="M16 16.5c.8-2.6 2.2-3.8 4-3.8s3.2 1.2 4 3.8" {...common} />
        <path d="M12.5 19.5h15v3.5h-15z" {...common} />
        <path d="M15 23v10M25 23v10M13 33h14" {...common} />
        <path d="M14.5 19.5V17M25.5 19.5V17" {...common} />
      </svg>
    );
  }

  if (id === "kinder") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M13 14a7 7 0 0 1 14 0" {...common} />
        <circle cx="20" cy="15" r="5" {...common} />
        <path d="M12 34c1.2-9 3.8-13 8-13s6.8 4 8 13" {...common} />
        <path d="M14.5 23h11" {...common} />
      </svg>
    );
  }

  if (id === "eltern") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="12" cy="11" r="4" {...common} />
        <circle cx="28" cy="11" r="4" {...common} />
        <circle cx="20" cy="18" r="3.2" {...common} />
        <path d="M5.5 32c1-7.5 3.4-11 6.5-11M34.5 32c-1-7.5-3.4-11-6.5-11M14 32c1.1-5.5 2.8-7.5 6-7.5s4.9 2 6 7.5" {...common} />
      </svg>
    );
  }

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 33s-11-7.2-11-15.2A6.4 6.4 0 0 1 20 13.5 6.4 6.4 0 0 1 31 17.8C31 25.8 20 33 20 33Z"
        {...common}
      />
    </svg>
  );
}

export function AngebotKategorieCards({
  angebote,
  kategorien,
}: {
  angebote: Angebot[];
  kategorien: AngebotKategorie[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {kategorien.map((category) => (
        <KategorieCard
          key={category.slug}
          category={category}
          image={categoryImage(angebote, category)}
          href={categoryHref(category)}
        />
      ))}
    </div>
  );
}

export function AngebotNachKategorien({
  angebote,
  kategorien,
}: {
  angebote: Angebot[];
  kategorien: AngebotKategorie[];
}) {
  return (
    <div className="space-y-16">
      {kategorien.map((category) => {
        const items = offersInCategory(angebote, category);
        return (
          <section key={category.slug} id={category.slug} className="scroll-mt-32">
            <h2 className="text-3xl tracking-tight sm:text-4xl" style={{ color: category.accent }}>
              {category.title}
            </h2>
            {category.description ? (
              <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)]">
                {category.description}
              </p>
            ) : null}
            {items.length > 0 ? (
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {items.map((item) => (
                  <AngebotKarte key={item.slug} item={item} />
                ))}
              </div>
            ) : (
              <p className="mt-6 text-[var(--muted)]">
                Für diese Kategorie gibt es gerade keine Einträge.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

function KategorieCard({
  category,
  image,
  href,
}: {
  category: AngebotKategorie;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_12px_32px_rgba(30,58,95,0.08)]"
    >
      <div className="flex flex-1 flex-col p-6 pt-7" style={{ backgroundColor: category.background }}>
        <CategoryIcon id={category.id} color={category.accent} />
        <h3 className="mt-5 text-[1.35rem] leading-snug" style={{ color: category.accent }}>
          {category.title}
        </h3>
        <span className="mt-auto pt-5 text-sm font-bold" style={{ color: category.accent }}>
          Mehr erfahren →
        </span>
      </div>
      <div className="h-44 overflow-hidden bg-[var(--sky)]">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    </Link>
  );
}

export function AngebotKategorieHeader({
  title = "Unsere Angebote",
  showAllLink = true,
}: {
  title?: string;
  showAllLink?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-3xl tracking-tight text-[var(--navy)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 max-w-xl text-[0.98rem] leading-7 text-[var(--navy)]">
          Wir sind für Kinder, Jugendliche und Eltern da – mit Herz, Erfahrung und vielen Angeboten.
        </p>
      </div>
      {showAllLink ? (
        <Link href="/angebote" className="shrink-0 font-bold text-[var(--accent)]">
          Alle Angebote ansehen →
        </Link>
      ) : null}
    </div>
  );
}
