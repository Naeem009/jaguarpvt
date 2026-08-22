import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { jobOpeningSchema } from "@/lib/careers/schema";
import { slugifyJobTitle, uniqueSlug } from "@/lib/careers/slug";
import { loadCmsJobOpenings, saveJobOpenings } from "@/lib/careers/store";
import { requireHrSession } from "@/lib/hr/require-session";
import type { JobOpening } from "@/lib/careers/types";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

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

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  const { slug } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const openings = await loadCmsJobOpenings();
    const currentIndex = openings.findIndex((item) => item.slug === slug);
    if (currentIndex === -1) {
      return NextResponse.json({ error: "Opening not found." }, { status: 404 });
    }

    const requestedSlug = String(body.slug ?? slug).trim() || slugifyJobTitle(String(body.title ?? slug));
    const nextSlug = uniqueSlug(
      requestedSlug,
      openings.map((item) => item.slug),
      slug,
    );
    const opening = toOpeningInput(body, nextSlug);
    const next = [...openings];
    next[currentIndex] = opening;
    const saved = await saveJobOpenings(next, `Update career opening: ${opening.title}`);
    revalidatePath("/careers");
    revalidatePath(`/careers/${slug}`);
    revalidatePath(`/careers/${opening.slug}`);
    return NextResponse.json({ opening, persistedVia: saved.persistedVia });
  } catch (error) {
    console.error("[hr-jobs] update failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update this opening." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  const { slug } = await context.params;

  try {
    const openings = await loadCmsJobOpenings();
    const current = openings.find((item) => item.slug === slug);
    if (!current) {
      return NextResponse.json({ error: "Opening not found." }, { status: 404 });
    }

    const next = openings.filter((item) => item.slug !== slug);
    const saved = await saveJobOpenings(next, `Remove career opening: ${current.title}`);
    revalidatePath("/careers");
    revalidatePath(`/careers/${slug}`);
    return NextResponse.json({ success: true, persistedVia: saved.persistedVia });
  } catch (error) {
    console.error("[hr-jobs] delete failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to remove this opening." },
      { status: 400 },
    );
  }
}
