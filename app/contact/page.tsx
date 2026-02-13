import Image from "next/image";

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

      {/* Form */}
      <form
        action="/api/contact"
        method="POST"
        className="mt-10 space-y-5"
        onSubmit={(e) => {
          // Simple client-side protection:
          // 1) Lock the button to prevent repeat rapid submits
          const form = e.currentTarget;
          const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
          if (btn) {
            btn.disabled = true;
            btn.textContent = "Sending...";
          }

          // 2) Honeypot: if a bot filled the hidden field, block submit silently
          const website = (form.querySelector<HTMLInputElement>('input[name="website"]')?.value || "").trim();
          if (website.length > 0) {
            e.preventDefault();
            if (btn) {
              btn.disabled = false;
              btn.textContent = "Send message";
            }
            return;
          }

          // 3) Basic message length check (client side)
          const message = (form.querySelector<HTMLTextAreaElement>('textarea[name="message"]')?.value || "").trim();
          if (message.length < 10) {
            e.preventDefault();
            alert("Please add a bit more detail (at least 10 characters).");
            if (btn) {
              btn.disabled = false;
              btn.textContent = "Send message";
            }
          }
        }}
      >
        {/* Honeypot field (hidden). Humans never see it; bots often fill it. */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

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
            minLength={10}
            rows={5}
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ember/30"
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
        >
          Send message
        </button>
      </form>

      {/* Logo block */}
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
