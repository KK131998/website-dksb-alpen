export type MitmachenWeg = {
  id: string;
  pageSlug: string;
  title: string;
  description: string;
  body: string[];
  accent: string;
};

export const MITMACHEN_WEGE: MitmachenWeg[] = [
  {
    id: "mitglied",
    pageSlug: "mitglied-werden",
    title: "Mitglied werden",
    description:
      "Als Mitglied tragen Sie den Verein langfristig mit. Sie bleiben informiert und stärken unsere Arbeit vor Ort.",
    body: [
      "Wir Vorstandsmitglieder und alle weiteren Helfer haben Spaß und Freude an der ehrenamtlichen Tätigkeit beim Kinderschutzbund und machen dies aus voller Überzeugung. Dieser Einsatz für die Kinder und Jugendlichen in Alpen ist jedoch nur möglich, wenn uns eine starke Gemeinschaft trägt. Jede Mitgliedschaft kommt direkt bei den Kindern und Jugendlichen und ihren Familien an.",
      "Als Mitglied unterstützen Sie unsere Arbeit langfristig, bleiben über Angebote und Aktionen informiert und geben dem Ortsverband Gewicht in der Gemeinde. Wir freuen uns über jedes weitere Mitglied, das den Kinderschutzbund Alpen stärken möchte.",
    ],
    accent: "#00aeef",
  },
  {
    id: "spenden",
    pageSlug: "spenden",
    title: "Spenden",
    description:
      "Mit einer Spende helfen Sie direkt – zum Beispiel bei Hilfsprojekten, Kursen und konkreten Unterstützungen für Familien in Alpen.",
    body: [
      "Wir Vorstandsmitglieder und alle weiteren Helfer haben Spaß und Freude an der ehrenamtlichen Tätigkeit beim Kinderschutzbund und machen dies aus voller Überzeugung. Dieser Einsatz für die Kinder und Jugendlichen in Alpen ist jedoch nur möglich, wenn wir finanziell und materiell unterstützt werden. Jede Spende kommt direkt bei den Kindern und Jugendlichen und ihren Familien an.",
      "Ob einmalig oder regelmäßig, ob groß oder klein: Mit Ihrer Spende helfen Sie bei Hilfsprojekten, Kursen und konkreten Unterstützungen vor Ort. Wir freuen uns über jede Spende, die den Kinderschutz in Alpen stärkt.",
    ],
    accent: "#e67e22",
  },
  {
    id: "ehrenamt",
    pageSlug: "ehrenamtlich-engagieren",
    title: "Ehrenamtlich engagieren",
    description:
      "Bringen Sie Zeit, Ideen und Talente ein – in Projekten, bei Terminen oder im Hintergrund.",
    body: [
      "Bringen Sie Zeit, Ideen und Talente ein – in Projekten, bei Terminen oder im Hintergrund.",
    ],
    accent: "#2e7d32",
  },
  {
    id: "kooperation",
    pageSlug: "kooperationspartner-werden",
    title: "Kooperationspartner werden",
    description:
      "Schulen, Vereine, Unternehmen und Einrichtungen können uns fachlich oder organisatorisch unterstützen.",
    body: [
      "Der Kinderschutzbund Alpen wirkt dort, wo Kinder, Jugendliche und Familien leben: in der Kita, in der Schule, im Verein und in der Gemeinde. Damit unsere Angebote wirken, brauchen wir verlässliche Partner an unserer Seite.",
      "Schulen, Kindertageseinrichtungen, Vereine, Unternehmen und soziale Einrichtungen können uns fachlich, organisatorisch oder materiell unterstützen. Gemeinsam lassen sich Kurse, Aktionen und Hilfen so gestalten, dass sie wirklich bei den Familien ankommen.",
      "Ob Räume für Veranstaltungen, Mitwirkung bei Festen, Sachspenden oder Fachwissen: Jede Kooperation zählt. Auch ein gemeinsames Projekt oder eine langfristige Zusammenarbeit stärkt den Kinderschutz vor Ort.",
      "Jede Form der Hilfe kommt direkt bei den Kindern, Jugendlichen und ihren Familien an. Wir suchen Partnerinnen und Partner, die unsere Werte teilen und Verantwortung in Alpen übernehmen wollen.",
      "Ihre Ideen sind willkommen – auch ein kleines Engagement kann viel bewegen. Wir freuen uns über ein unverbindliches Gespräch. Sprechen Sie uns an, wenn Sie Kooperationspartner werden möchten.",
    ],
    accent: "#7e57c2",
  },
];

export function mitmachenHref(weg: MitmachenWeg): string {
  return `/mitmachen#${weg.pageSlug}`;
}

export const MITMACHEN_SPENDEN_HREF = "/mitmachen#spenden";
