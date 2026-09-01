import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function KooperationPage() {
  return (
    <CmsPage
      slug={PAGE_SLUGS.kooperation}
      kicker="Mitmachen & Unterstützen"
      fallbackTitle="Kooperationspartner werden"
    />
  );
}
