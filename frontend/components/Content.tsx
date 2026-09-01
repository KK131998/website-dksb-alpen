import type { ReactNode } from "react";

export function WpContent({ html }: { html: string | null | undefined }) {
  if (!html) {
    return null;
  }

  return <div className="wp-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 max-w-3xl text-center sm:text-left">
      {kicker ? <p className="font-subhead text-2xl text-[var(--navy)]">{kicker}</p> : null}
      <h1 className="page-title mt-1 text-5xl sm:text-6xl">{title}</h1>
      {children}
    </header>
  );
}
