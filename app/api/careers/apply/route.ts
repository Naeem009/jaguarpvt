import { NextRequest } from "next/server";
import {
  hasAllowedCvType,
  jobApplicationFieldsSchema,
  MAX_CV_BYTES,
} from "@/lib/careers/schema";
import { getOpeningBySlug, isOpeningActive } from "@/lib/careers/query";
import { sendCareerApplicationEmails } from "@/lib/careers/send-application-email";

const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter((stamp) => now - stamp < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    submissionsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return Response.json({ error: "Please wait before submitting another application." }, { status: 429 });
    }

    const formData = await request.formData();
    const parsed = jobApplicationFieldsSchema.safeParse({
      jobSlug: formData.get("jobSlug"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      coverLetter: formData.get("coverLetter") || undefined,
      companyWebsite: formData.get("companyWebsite") || undefined,
    });

    if (!parsed.success) {
      return Response.json({ error: "Invalid application." }, { status: 400 });
    }

    if (parsed.data.companyWebsite) {
      return Response.json({ success: true });
    }

    const opening = await getOpeningBySlug(parsed.data.jobSlug);
    if (!opening || !isOpeningActive(opening)) {
      return Response.json({ error: "This opening is closed." }, { status: 410 });
    }

    const cv = formData.get("cv");
    if (!(cv instanceof File) || cv.size === 0) {
      return Response.json({ error: "Please attach your CV." }, { status: 400 });
    }

    if (cv.size > MAX_CV_BYTES) {
      return Response.json({ error: "CV must be 5 MB or smaller." }, { status: 400 });
    }

    if (!hasAllowedCvType(cv)) {
      return Response.json({ error: "Upload a PDF, DOC, or DOCX file." }, { status: 400 });
    }

    const buffer = Buffer.from(await cv.arrayBuffer());

    try {
      await sendCareerApplicationEmails(parsed.data, opening, {
        filename: cv.name,
        content: buffer,
      }, {
        submittedAt: new Date().toISOString(),
        source: "website-careers-apply",
      });
    } catch (error) {
      console.error("[careers-apply] Failed to send email:", error);
      return Response.json(
        { error: "Unable to deliver your application by email. Please try again shortly." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unable to process this application." }, { status: 500 });
  }
}
