import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function LeitbildPage() {
  return (
    <CmsPage
      slug={PAGE_SLUGS.leitbild}
      kicker="Verein"
      fallbackTitle="Unser Leitbild"
    />
  );
}
