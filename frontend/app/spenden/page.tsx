import { redirect } from "next/navigation";
import { MITMACHEN_SPENDEN_HREF } from "@/lib/mitmachen";

export const dynamic = "force-static";

export default function SpendenPage() {
  redirect(MITMACHEN_SPENDEN_HREF);
}
