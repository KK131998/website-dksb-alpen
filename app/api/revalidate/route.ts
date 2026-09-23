import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

type RevalidateBody = {
  tags?: unknown;
  tag?: unknown;
  paths?: unknown;
  path?: unknown;
};

function asStringArray(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "");
  }
  return [];
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;
  const providedSecret = request.headers.get("x-revalidate-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const tags = [...asStringArray(body.tags), ...asStringArray(body.tag)];
  const paths = [...asStringArray(body.paths), ...asStringArray(body.path)];

  if (tags.length === 0 && paths.length === 0) {
    tags.push("wordpress");
  }

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  revalidatePath("/");

  return Response.json({
    revalidated: true,
    tags,
    paths,
    now: Date.now(),
  });
}
