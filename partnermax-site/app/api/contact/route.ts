import { Resend } from "resend";

/* Contact form backend. POSTs from ContactForm.tsx land here, are
   re-validated server-side (never trust the client), then emailed to
   the channel team via Resend.

   Configuration (see .env.example):
     RESEND_API_KEY     required to actually send
     CONTACT_TO_EMAIL   inbox the lead is delivered to
     CONTACT_FROM_EMAIL a verified-domain sender (Resend requires this)

   If RESEND_API_KEY is unset the route returns 503 with a clear
   message so the form surfaces "needs configuration" rather than
   silently dropping a lead. */

export const dynamic = "force-dynamic";

const ALLOWED_NEEDS = new Set([
  "Wireless · for my business",
  "Fibre · for my business",
  "Bundle · multi-service",
  "Reselling Rogers · as a partner",
  "Just exploring",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name: string;
  business: string;
  email: string;
  need: string;
  note?: string;
};

function validate(body: unknown): { data?: Payload; error?: string } {
  if (!body || typeof body !== "object")
    return { error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(b.name);
  const business = str(b.business);
  const email = str(b.email);
  const need = str(b.need);
  const note = str(b.note);

  if (!name || name.length > 100) return { error: "Enter your name." };
  if (!business || business.length > 100)
    return { error: "Enter your business name." };
  if (!email || email.length > 200 || !EMAIL_RE.test(email))
    return { error: "Enter a valid business email." };
  if (!need || !ALLOWED_NEEDS.has(need))
    return { error: "Choose what you’re interested in." };
  if (note.length > 2000)
    return { error: "That note is a little long — trim it under 2000 characters." };

  return { data: { name, business, email, need, note } };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { data, error } = validate(json);
  if (error || !data) {
    return Response.json({ error: error ?? "Invalid request." }, {
      status: 400,
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Surface a useful message; the lead is not lost silently.
    console.error(
      "[contact] RESEND_API_KEY is not set — cannot deliver lead:",
      { ...data, note: data.note ? "(provided)" : "(empty)" }
    );
    return Response.json(
      {
        error:
          "The contact form isn’t connected yet. Please email hello@partnermax.ca directly.",
      },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "hello@partnermax.ca";
  const from =
    process.env.CONTACT_FROM_EMAIL || "PartnerMax Site <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error: sendError } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New partner inquiry — ${data.business}`,
      text: [
        `Name: ${data.name}`,
        `Business: ${data.business}`,
        `Email: ${data.email}`,
        `Interested in: ${data.need}`,
        "",
        data.note ? `Notes:\n${data.note}` : "Notes: (none)",
      ].join("\n"),
      html: `
        <h2 style="font-family:sans-serif">New partner inquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#667684">Name</td><td>${escapeHtml(
            data.name
          )}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667684">Business</td><td>${escapeHtml(
            data.business
          )}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667684">Email</td><td>${escapeHtml(
            data.email
          )}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667684">Interested in</td><td>${escapeHtml(
            data.need
          )}</td></tr>
        </table>
        ${
          data.note
            ? `<p style="font-family:sans-serif;font-size:14px"><strong>Notes</strong><br/>${escapeHtml(
                data.note
              ).replace(/\n/g, "<br/>")}</p>`
            : ""
        }
      `,
    });

    if (sendError) {
      console.error("[contact] Resend error:", sendError);
      return Response.json(
        {
          error:
            "We couldn’t send that just now. Please email hello@partnermax.ca.",
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json(
      {
        error:
          "We couldn’t send that just now. Please email hello@partnermax.ca.",
      },
      { status: 502 }
    );
  }
}
