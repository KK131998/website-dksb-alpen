import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function EhrenamtPage() {
  return (
    <CmsPage
      slug={PAGE_SLUGS.ehrenamt}
      kicker="Mitmachen & Unterstützen"
      fallbackTitle="Ehrenamtlich engagieren"
    />
  );
}
