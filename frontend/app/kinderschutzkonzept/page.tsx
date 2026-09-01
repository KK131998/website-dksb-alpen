import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function KinderschutzkonzeptPage() {
  return (
    <CmsPage
      slug={PAGE_SLUGS.konzept}
      kicker="Verein"
      fallbackTitle="Unser Kinderschutzkonzept"
    />
  );
}
