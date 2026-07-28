import { sendContactSubmissionEmail } from "@/lib/contact/send-submission-email";
import { contactFormSchema } from "@/lib/contact/schema";

async function forwardToCrm(payload: Record<string, unknown>) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!webhookResponse.ok) {
    throw new Error("Unable to forward submission to CRM.");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid form submission.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const payload = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
      source: "website-contact-form",
    };

    try {
      await sendContactSubmissionEmail(parsed.data, {
        submittedAt: payload.submittedAt,
        source: payload.source,
      });
    } catch (error) {
      console.error("[contact-form] Failed to send email:", error);
      return Response.json(
        { error: "Unable to deliver your inquiry by email. Please try again shortly." },
        { status: 502 },
      );
    }

    try {
      await forwardToCrm(payload);
    } catch (error) {
      console.error("[contact-form] CRM forwarding failed:", error);
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unable to process contact form submission." }, { status: 500 });
  }
}
