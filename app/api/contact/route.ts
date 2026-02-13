import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function readBody(req: Request): Promise<{ name: string; email: string; message: string }> {
  const contentType = req.headers.get("content-type") || "";
  const raw = await req.text();

  // 1) JSON
  if (contentType.includes("application/json")) {
    const parsed = JSON.parse(raw || "{}");
    return {
      name: String(parsed?.name || "").trim(),
      email: String(parsed?.email || "").trim(),
      message: String(parsed?.message || "").trim(),
    };
  }

  // 2) URL-encoded form (name=...&email=...&message=...)
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(raw);
    return {
      name: String(params.get("name") || "").trim(),
      email: String(params.get("email") || "").trim(),
      message: String(params.get("message") || "").trim(),
    };
  }

  // 3) Multipart form-data (common if you used FormData() in fetch)
  // NOTE: If content-type is multipart, req.text() isn't useful. In that case, re-read as formData.
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData();
    return {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
  }

  // Default: try JSON as a last resort
  const parsed = JSON.parse(raw || "{}");
  return {
    name: String(parsed?.name || "").trim(),
    email: String(parsed?.email || "").trim(),
    message: String(parsed?.message || "").trim(),
  };
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await readBody(req);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    const TO_EMAIL = "scarlin@kebekventures.com";

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "Email is not configured yet (missing SMTP env vars)." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `Kebek Ventures inquiry — ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "— Sent from kebekventures.com contact form",
    ].join("\n");

    const info = await transporter.sendMail({
      from: `"Kebek Ventures Website" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err: any) {
    // This is critical for debugging in Vercel logs:
    console.error("CONTACT_SEND_FAILED", err?.message || err, err);

    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 }
    );
  }
}
