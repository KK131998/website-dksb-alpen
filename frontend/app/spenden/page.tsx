import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function SpendenPage() {
  return <CmsPage slug={PAGE_SLUGS.spenden} kicker="Mitmachen & Unterstützen" fallbackTitle="Spenden" />;
}
