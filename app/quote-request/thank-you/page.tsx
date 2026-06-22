import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Request Received",
  description: "Thank you page after a quote request submission.",
};

export default function QuoteThankYouPage() {
  return (
    <section className="w-full rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">Thank You</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Request Received</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
        We got your quote request and will follow up soon. If your project is urgent,
        use the contact page and include your best callback number.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/services">
          View Services
        </Link>
        <Link className="btn-secondary" href="/contact">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
