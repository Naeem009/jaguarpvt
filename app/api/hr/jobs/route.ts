import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { jobOpeningSchema } from "@/lib/careers/schema";
import { slugifyJobTitle, uniqueSlug } from "@/lib/careers/slug";
import { loadCmsJobOpenings, saveJobOpenings } from "@/lib/careers/store";
import { requireHrSession } from "@/lib/hr/require-session";
import type { JobOpening } from "@/lib/careers/types";

function linesToList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toOpeningInput(body: Record<string, unknown>, slug: string): JobOpening {
  return jobOpeningSchema.parse({
    slug,
    title: body.title,
    department: body.department,
    location: body.location,
    employmentType: body.employmentType,
    experience: String(body.experience ?? "").trim() || undefined,
    vacancies: body.vacancies,
    pinned: Boolean(body.pinned),
    published: Boolean(body.published),
    applicationDeadline: body.applicationDeadline,
    overview: linesToList(body.overview),
    requirements: linesToList(body.requirements),
  });
}

export async function GET() {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  const openings = await loadCmsJobOpenings();
  return NextResponse.json({ openings });
}

export async function POST(request: Request) {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const openings = await loadCmsJobOpenings();
    const requestedSlug = String(body.slug ?? "").trim();
    const base = requestedSlug || slugifyJobTitle(String(body.title ?? ""));
    const slug = uniqueSlug(
      base,
      openings.map((item) => item.slug),
    );
    const opening = toOpeningInput(body, slug);
    const next = [...openings, opening];
    const saved = await saveJobOpenings(next, `Add career opening: ${opening.title}`);
    revalidatePath("/careers");
    revalidatePath(`/careers/${opening.slug}`);
    return NextResponse.json({ opening, persistedVia: saved.persistedVia }, { status: 201 });
  } catch (error) {
    console.error("[hr-jobs] create failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create this opening." },
      { status: 400 },
    );
  }
}
