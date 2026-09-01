export type MitmachenWeg = {
  id: string;
  title: string;
  description: string;
  accent: string;
  href: string;
};

export const MITMACHEN_WEGE: MitmachenWeg[] = [
  {
    id: "spenden",
    title: "Spenden",
    href: "/spenden",
    description:
      "Mit einer Spende helfen Sie direkt – zum Beispiel bei Hilfsprojekten, Kursen und konkreten Unterstützungen für Familien in Alpen.",
    accent: "#e67e22",
  },
  {
    id: "mitglied",
    title: "Mitglied werden",
    href: "/mitglied-werden",
    description:
      "Als Mitglied tragen Sie den Verein langfristig mit. Sie bleiben informiert und stärken unsere Arbeit vor Ort.",
    accent: "#00aeef",
  },
  {
    id: "ehrenamt",
    title: "Ehrenamtlich engagieren",
    href: "/ehrenamtlich-engagieren",
    description:
      "Bringen Sie Zeit, Ideen und Talente ein – in Projekten, bei Terminen oder im Hintergrund.",
    accent: "#2e7d32",
  },
  {
    id: "kooperation",
    title: "Kooperationspartner werden",
    href: "/kooperationspartner-werden",
    description:
      "Schulen, Vereine, Unternehmen und Einrichtungen können uns fachlich oder organisatorisch unterstützen.",
    accent: "#7e57c2",
  },
];
