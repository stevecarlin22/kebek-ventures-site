import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * SIMPLE SPAM PROTECTION (server-side, low risk)
 * 1) Basic rate limit per IP (in-memory, best-effort on serverless)
 * 2) Honeypot field (if bots fill it, we drop it)
 * 3) Minimum time-to-submit (bots often submit instantly)
 */

// Best-effort in-memory rate limit store
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max 5 submissions per IP per window
const ipHits = new Map<string, { count: number; windowStart: number }>();

function getClientIp(req: Request): string {
  // Vercel usually provides x-forwarded-for
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
}

function isRateLimited(ip: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const record = ipHits.get(ip);

  if (!record) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }

  // Reset window if expired
  if (now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }

  // Increment count
  record.count += 1;
  ipHits.set(ip, record);

  if (record.count > RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0 };
  }

  return { limited: false, remaining: RATE_LIMIT_MAX - record.count };
}

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2, 10);

  try {
    const ip = getClientIp(req);
    const { limited, remaining } = isRateLimited(ip);

    if (limited) {
      console.log(`[contact ${requestId}] rate limited`, { ip });
      return Response.json(
        { ok: false, requestId, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let name = "";
    let email = "";
    let message = "";

    // Optional spam fields (safe even if your form doesn't send them)
    let website = ""; // honeypot: bots often fill this
    let startedAt = 0; // client can send this; if not, we skip time check

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body?.name ?? "";
      email = body?.email ?? "";
      message = body?.message ?? "";

      website = body?.website ?? "";
      startedAt = Number(body?.startedAt ?? 0);

      console.log(`[contact ${requestId}] parsed JSON body`, { ip, remaining });
    } else {
      const form = await req.formData();
      name = String(form.get("name") ?? "");
      email = String(form.get("email") ?? "");
      message = String(form.get("message") ?? "");

      website = String(form.get("website") ?? "");
      startedAt = Number(form.get("startedAt") ?? 0);

      console.log(`[contact ${requestId}] parsed FORM body`, { ip, remaining });
    }

    // Honeypot check: if "website" is filled, treat as bot and pretend success
    if (website && website.trim().length > 0) {
      console.log(`[contact ${requestId}] honeypot triggered`, { ip });
      // Return ok:true to avoid teaching bots what got blocked
      return Response.json({ ok: true, requestId }, { status: 200 });
    }

    // Minimum time-to-submit check (optional)
    // If your frontend sends startedAt = Date.now() when form loads,
    // this blocks instant-submit bots. If startedAt is missing, we skip.
    if (startedAt > 0) {
      const elapsedMs = Date.now() - startedAt;
      if (elapsedMs < 1500) {
        console.log(`[contact ${requestId}] too fast submission`, { ip, elapsedMs });
        return Response.json({ ok: true, requestId }, { status: 200 });
      }
    }

    // Validation
    if (!email || !message) {
      console.log(`[contact ${requestId}] missing fields`, { ip });
      return Response.json(
        { ok: false, requestId, error: "Missing fields" },
        { status: 400 }
      );
    }

    console.log(`[contact ${requestId}] starting send`, { ip });

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

    await transporter.verify();
    console.log(`[contact ${requestId}] SMTP verify OK`);

    const info = await transporter.sendMail({
      from: process.env.SMTP
