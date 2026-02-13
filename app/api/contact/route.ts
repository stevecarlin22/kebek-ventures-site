import nodemailer from "nodemailer";

// IMPORTANT: Nodemailer requires Node.js runtime (not Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2, 10);

  try {
    // We will accept EITHER JSON (fetch with JSON.stringify)
    // OR a normal form submit (multipart/form-data or application/x-www-form-urlencoded)
    let name = "";
    let email = "";
    let message = "";

    // Try JSON first
    try {
      const body = await req.json();
      name = body?.name ?? "";
      email = body?.email ?? "";
      message = body?.message ?? "";
      console.log(`[contact ${requestId}] parsed JSON body`);
    } catch (jsonErr) {
      // If JSON parsing fails, fall back to form data
      const form = await req.formData();
      name = String(form.get("name") ?? "");
      email = String(form.get("email") ?? "");
      message = String(form.get("message") ?? "");
      console.log(`[contact ${requestId}] parsed FORM body`);
    }

    // Basic validation
    if (!email || !message) {
      console.log(`[contact ${requestId}] missing fields`, {
        namePresent: !!name,
        emailPresent: !!email,
        messagePresent: !!message,
      });

      return Response.json(
        { ok: false, requestId, error: "Missing fields" },
        { status: 400 }
      );
    }

    console.log(`[contact ${requestId}] starting send`);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // STARTTLS on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Prevent serverless functions from hanging forever
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // This forces a clear error if Google rejects auth/login
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
      { ok: true, requestId },
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

    return Response.json(
      { ok: false, requestId, error: "Unable to send message" },
      { status: 500 }
    );
  }
}
