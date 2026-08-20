import { Resend } from "resend";
import type { JobOpening } from "./types";
import type { JobApplicationFields } from "./schema";

const DEFAULT_RECIPIENT = "usama@jaguarpvt.com";

type ApplicationMeta = {
  submittedAt: string;
  source: string;
};

type CvAttachment = {
  filename: string;
  content: Buffer;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #e8e8e6;background:#fafaf9;width:180px;font-size:13px;color:#4a4b4e;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 12px;border:1px solid #e8e8e6;font-size:14px;color:#0b0b0c;vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function hrCopy(data: JobApplicationFields, opening: JobOpening, meta: ApplicationMeta) {
  return [
    `New career application — ${opening.title}`,
    "=================================",
    "",
    `Role: ${opening.title}`,
    `Slug: ${opening.slug}`,
    `Department: ${opening.department}`,
    `Last date: ${opening.applicationDeadline}`,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`,
    "",
    "Cover letter",
    "------------",
    data.coverLetter || "Not provided",
    "",
    `Submitted at: ${meta.submittedAt}`,
    `Source: ${meta.source}`,
  ].join("\n");
}

function hrHtml(data: JobApplicationFields, opening: JobOpening, meta: ApplicationMeta) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0;padding:24px;background:#fafaf9;font-family:Inter,Arial,sans-serif;color:#0b0b0c;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e6;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:24px;background:#0b0b0c;color:#ffffff;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#7ebb42;">Jaguar Careers</p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;">New application</h1>
              <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.78);">${escapeHtml(data.fullName)} applied for ${escapeHtml(opening.title)}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 12px;font-size:16px;color:#0b0b0c;">Role</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${row("Title", opening.title)}
                ${row("Last date", opening.applicationDeadline)}
                ${row("Location", opening.location)}
              </table>
              <h2 style="margin:24px 0 12px;font-size:16px;color:#0b0b0c;">Candidate</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${row("Name", data.fullName)}
                ${row("Email", data.email)}
                ${row("Phone", data.phone)}
                ${row("City", data.city)}
              </table>
              ${
                data.coverLetter
                  ? `<h2 style="margin:24px 0 12px;font-size:16px;color:#0b0b0c;">Cover letter</h2>
              <div style="padding:16px;border:1px solid #e8e8e6;border-radius:12px;background:#fafaf9;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.coverLetter)}</div>`
                  : ""
              }
              <h2 style="margin:24px 0 12px;font-size:16px;color:#0b0b0c;">Metadata</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${row("Submitted at", meta.submittedAt)}
                ${row("Source", meta.source)}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendCareerApplicationEmails(
  data: JobApplicationFields,
  opening: JobOpening,
  cv: CvAttachment,
  meta: ApplicationMeta,
) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  const to = process.env.CAREERS_APPLY_TO ?? process.env.CONTACT_FORM_TO ?? DEFAULT_RECIPIENT;
  const from =
    process.env.CONTACT_FORM_FROM ?? "Jaguar Website <notifications@jaguarpvt.com>";

  const hrResult = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[Career] ${opening.title} — ${data.fullName}`,
    text: hrCopy(data, opening, meta),
    html: hrHtml(data, opening, meta),
    attachments: [{ filename: cv.filename, content: cv.content }],
  });

  if (hrResult.error) {
    throw new Error(hrResult.error.message);
  }

  const applicantResult = await resend.emails.send({
    from,
    to: [data.email],
    subject: `We received your application for ${opening.title}`,
    text: [
      `Dear ${data.fullName},`,
      "",
      `We received your application for ${opening.title} at Jaguar (Pvt) Ltd.`,
      "Our team will review it and contact you if there is a next step.",
      "",
      "This is an automated confirmation — please do not reply with additional documents to this address unless we write to you first.",
    ].join("\n"),
  });

  if (applicantResult.error) {
    throw new Error(applicantResult.error.message);
  }
}
