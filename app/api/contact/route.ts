import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

type ContactPayload = { name?: string; email?: string; message?: string };

async function readBody(req: Request): Promise<ContactPayload> {
  const contentType = req.headers.get("content-type") || "";

  // JSON (what we originally expected)
  if (contentType.includes("application/json")) {
    return (await req.json()) as ContactPayload;
  }

  // Form submit (multipart/form-data)
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData();
    return {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };
  }

  // URL-encoded (application/x-www-form-urlencoded) OR unknown
  // Read as text and try to parse as querystring
  const raw = await req.text();
  const params = new URLSearchParams(raw);
  return {
    name: String(params.get("name") || ""),
    email: String(params.get("email") || ""),
    message: String(params.get("message") || ""),
  };
}

export async function POST(req: Request) {
  try {
    const body = await readBody(req);

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();

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

    await transporter.sendMail({
      from: `"Kebek Ventures Website" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // If you want extra visibility without exposing secrets to users:
    console.error("CONTACT_SEND_ERROR", err);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
