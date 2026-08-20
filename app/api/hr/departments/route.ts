import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { loadCmsJobDepartments, loadCmsJobOpenings, saveJobDepartments } from "@/lib/careers/store";
import { displayDepartment } from "@/lib/hr/labels";
import { requireHrSession } from "@/lib/hr/require-session";

export async function GET() {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  const departments = await loadCmsJobDepartments();
  return NextResponse.json({ departments });
}

export async function POST(request: Request) {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  try {
    const body = (await request.json()) as { name?: string };
    const name = String(body.name ?? "").trim();
    if (!name) {
      return NextResponse.json({ error: "Enter a department name." }, { status: 400 });
    }
    if (name.length > 80) {
      return NextResponse.json({ error: "Department name is too long." }, { status: 400 });
    }

    const departments = await loadCmsJobDepartments();
    if (departments.some((item) => item.toLocaleLowerCase() === name.toLocaleLowerCase())) {
      return NextResponse.json({ departments, name }, { status: 200 });
    }

    const saved = await saveJobDepartments([...departments, name], `Add career department: ${name}`);
    revalidatePath("/careers");
    revalidatePath("/hr");
    return NextResponse.json({ departments: saved.departments, name, persistedVia: saved.persistedVia }, { status: 201 });
  } catch (error) {
    console.error("[hr-departments] create failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to add this department." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const denied = await requireHrSession();
  if (denied) {
    return denied;
  }

  try {
    const { searchParams } = new URL(request.url);
    const name = String(searchParams.get("name") ?? "").trim();
    if (!name) {
      return NextResponse.json({ error: "Department name is required." }, { status: 400 });
    }

    const [departments, openings] = await Promise.all([loadCmsJobDepartments(), loadCmsJobOpenings()]);
    const inUse = openings.filter((opening) => {
      const stored = opening.department.toLocaleLowerCase();
      const wanted = name.toLocaleLowerCase();
      return stored === wanted || displayDepartment(opening.department).toLocaleLowerCase() === wanted;
    });
    if (inUse.length > 0) {
      return NextResponse.json(
        {
          error: `Cannot remove “${name}” while ${inUse.length} job${inUse.length === 1 ? "" : "s"} still use it. Delete or reassign those jobs first.`,
        },
        { status: 409 },
      );
    }

    const next = departments.filter((item) => item.toLocaleLowerCase() !== name.toLocaleLowerCase());
    const saved = await saveJobDepartments(next, `Remove career department: ${name}`);
    revalidatePath("/careers");
    revalidatePath("/hr");
    return NextResponse.json({ departments: saved.departments, persistedVia: saved.persistedVia });
  } catch (error) {
    console.error("[hr-departments] delete failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to remove this department." },
      { status: 400 },
    );
  }
}
