import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Three Daughters Landscaping for quotes, scheduling, and service questions.",
};

export default function ContactPage() {
  return (
    <section className="w-full rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
        Contact
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Let&apos;s Talk Property Care</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
        Reach out for quote requests, scheduling questions, or service details.
        We are happy to help you plan the right care for your property.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">Office</h2>
          <p className="mt-2 text-black/70">Mon - Fri, 8:00 AM - 5:00 PM</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="mt-2 text-black/70">hello@threedaughtersos.com</p>
        </div>
      </div>
    </section>
  );
}
