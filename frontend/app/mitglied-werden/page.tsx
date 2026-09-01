import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function MitgliedWerdenPage() {
  return (
    <CmsPage
      slug={PAGE_SLUGS.mitglied}
      kicker="Mitmachen & Unterstützen"
      fallbackTitle="Mitglied werden"
    />
  );
}
