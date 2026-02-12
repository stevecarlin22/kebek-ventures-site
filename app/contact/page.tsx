"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    const form = new FormData(e.currentTarget);

    // Honeypot spam trap (should stay empty)
    const company = String(form.get("company") || "");
    if (company.trim().length > 0) {
      // pretend success to bots
      setStatus("sent");
      (e.currentTarget as HTMLFormElement).reset();
      return;
    }

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("sent");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Could not send message.");
    }
  }

  return (
    <main className="container-pad mx-auto max-w-4xl py-14 sm:py-20">
      <p className="kicker">Contact</p>
      <h1 className="h1 mt-4">Start a conversation.</h1>
      <p className="p mt-5">
        If you are at an inflection point and want operating and commercial clarity,
        send a note with a bit of context. Kebek Ventures responds quickly.
      </p>

      <div className="mt-10 card p-7 sm:p-10">
        <form onSubmit={onSubmit} className="grid gap-5">
          {/* Honeypot (hidden field for bots) */}
          <input
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-black/80" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                placeholder="Your name"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-black/80" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-black/80" htmlFor="message">
              What do you need help with?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={7}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
              placeholder={`A few helpful bullets:\n- Company + stage\n- What’s happening now (the inflection point)\n- What you want to achieve\n- Timeline`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>

            {status === "sent" ? (
              <span className="text-sm font-semibold text-cedar">
                Message sent. Thank you.
              </span>
            ) : null}

            {status === "error" ? (
              <span className="text-sm font-semibold text-ember">
                {error || "Could not send message."}
              </span>
            ) : null}
          </div>

          <p className="p-sm text-black/55">
            Your contact information is used only to respond to this inquiry.
          </p>
        </form>
      </div>
    </main>
  );
}
