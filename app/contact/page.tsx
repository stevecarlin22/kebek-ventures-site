"use client";

import Image from "next/image";
import React from "react";

export default function ContactPage() {
  return (
    <main className="container-pad mx-auto max-w-3xl py-24">
      <div>
        <p className="kicker">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Start a conversation
        </h1>
        <p className="mt-4 text-black/70 leading-relaxed">
          If you are navigating growth, complexity, or operating challenges,
          Kebek Ventures can help. Share a bit of context and we will respond
          directly.
        </p>
      </div>

      <form
        className="mt-10 space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.currentTarget;
          const formData = new FormData(form);

          const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
          if (btn) {
            btn.disabled = true;
            btn.textContent = "Sending...";
          }

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              alert("Message sent. Thank you.");
              form.reset();
            } else {
              alert("Unable to send message. Please try again.");
            }
          } catch (err) {
            alert("Network error. Please try again.");
          }

          if (btn) {
            btn.disabled = false;
            btn.textContent = "Send message";
          }
        }}
      >
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ember/30"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ember/30"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">How can we help?</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ember/30"
          />
        </div>

        <button type="submit" className="btn-primary">
          Send message
        </button>
      </form>

      <div className="mt-20 flex justify-center">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 opacity-95">
          <Image
            src="/images/logo.jpg"
            alt="Kebek Ventures"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
