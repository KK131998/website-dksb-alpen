import { redirect } from "next/navigation";

export const dynamic = "force-static";

export default function EhrenamtPage() {
  redirect("/mitmachen#ehrenamtlich-engagieren");
}
