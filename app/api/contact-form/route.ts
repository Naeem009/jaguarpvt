import { contactFormSchema } from "@/lib/contact/schema";

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

    const webhookUrl = process.env.CRM_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        return Response.json({ error: "Unable to forward submission to CRM." }, { status: 502 });
      }
    } else {
      // TODO: Configure CRM_WEBHOOK_URL in the environment for production lead routing.
      console.log("[contact-form] CRM_WEBHOOK_URL not configured. Submission payload:", payload);
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unable to process contact form submission." }, { status: 500 });
  }
}
