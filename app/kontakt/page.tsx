import CmsPage, { PAGE_SLUGS } from "@/components/CmsPage";

export const dynamic = "force-static";

export default function KontaktPage() {
  return <CmsPage slug={PAGE_SLUGS.kontakt} fallbackTitle="Kontakt" />;
}
