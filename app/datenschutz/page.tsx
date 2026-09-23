import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function DatenschutzPage() {
  return (
    <CmsPage
      slug={PAGE_SLUGS.datenschutz}
      kicker="Rechtliches"
      fallbackTitle="Datenschutz"
    />
  );
}
