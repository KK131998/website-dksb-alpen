import Link from "next/link";
import { BlobShape } from "@/components/Brand";
import { angebotImageSrc } from "@/lib/angebot-kategorien";
import { excerpt } from "@/lib/wordpress";
import type { Angebot } from "@/lib/wordpress";

export function AngebotKarte({ item }: { item: Angebot }) {
  const photo = item.angebote?.foto?.node;
  const src = angebotImageSrc(item);
  return (
    <Link
      href={`/angebote/${item.slug}`}
      className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-white shadow-[0_10px_40px_rgba(30,58,95,0.06)]"
    >
      <BlobShape className="absolute -right-20 -top-16 h-64 w-64 text-[var(--sky)]" />
      <img
        src={src}
        alt=""
        className={`relative z-10 h-64 w-full sm:h-72 ${
          photo ? "object-cover" : "object-contain bg-[var(--sky)]"
        }`}
      />
      <div className="relative z-10 flex flex-1 flex-col p-8">
        <h3 className="text-2xl leading-snug">{item.title}</h3>
        <p className="mt-4 text-[var(--muted)]">
          {excerpt(item.angebote?.kurzbeschreibung, 180)}
        </p>
      </div>
    </Link>
  );
}
