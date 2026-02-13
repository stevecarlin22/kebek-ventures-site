import nodemailer from "nodemailer";

export const runtime = "nodejs"; // IMPORTANT for nodemailer

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2, 10);

  try {
    const body = await req.json();
    const { name = "", email = "", message = "" } = body ?? {};

    if (!email || !message) {
      console.log(`[contact ${requestId}] missing fields`);
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    console.log(`[contact ${requestId}] starting send`);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // Forces a clear error if Google rejects login
    await transporter.verify();
    console.log(`[contact ${requestId}] SMTP verify OK`);

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "scarlin@kebekventures.com",
      replyTo: email,
      subject: `Kebek Ventures contact form: ${name || "New message"}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    console.log(`[contact ${requestId}] sendMail result`, {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return Response.json(
      {
        ok: true,
        requestId,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(`[contact ${requestId}] ERROR`, {
      message: err?.message,
      code: err?.code,
      responseCode: err?.responseCode,
      command: err?.command,
      response: err?.response,
    });

    return Response.json({ ok: false, requestId, error: "Unable to send message" }, { status: 500 });
  }
}
