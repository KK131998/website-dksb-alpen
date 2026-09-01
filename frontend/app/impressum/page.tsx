import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function ImpressumPage() {
  return (
    <CmsPage slug={PAGE_SLUGS.impressum} kicker="Rechtliches" fallbackTitle="Impressum" />
  );
}
