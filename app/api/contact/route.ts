import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
      console.error("Missing SMTP env vars", { SMTP_HOST, SMTP_PORT, SMTP_USER, hasPass: !!SMTP_PASS });
      return NextResponse.json(
        { error: "Email is not configured yet (missing SMTP env vars)." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 587 => false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // Helpful for Google SMTP quirks:
      tls: { minVersion: "TLSv1.2" },
    });

    // This forces an auth/connection check so errors show clearly in logs
    await transporter.verify();

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
  } catch (err: any) {
    // THIS is what you need to see in Vercel logs
    console.error("Contact form send failed:", err?.message || err, err);

    // Return a useful hint (still not leaking secrets)
    const hint =
      typeof err?.message === "string" && err.message.toLowerCase().includes("auth")
        ? "SMTP auth failed (check app password / SMTP_USER)."
        : "Unable to send message.";

    return NextResponse.json({ error: hint }, { status: 500 });
  }
}
