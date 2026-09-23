import type { Metadata } from "next";
import { Dosis, PT_Sans_Narrow } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

const sans = PT_Sans_Narrow({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const heading = Dosis({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kinderschutzbund Alpen e.V.",
    template: "%s | Kinderschutzbund Alpen",
  },
  description:
    "Der Kinderschutzbund Ortsverband Alpen setzt sich für Kinder und Familien ein: Hinsehen, zuhören, helfen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${sans.variable} ${heading.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-[var(--navy)]">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
