import type { Metadata } from "next";
import { QuoteRequestForm } from "./quote-form";

export const metadata: Metadata = {
  title: "Request Quote",
  description:
    "Get a free, detailed quote for your landscaping project. Share your property and goals.",
};

export default function QuoteRequestPage() {
  return (
    <section className="grid w-full gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
          Quote Request
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Get a Free Quote</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
          Share your property address and what you&apos;re looking for. We&apos;ll follow up within 
          24 hours with a clear, competitive quote—no hidden charges.
        </p>

        <QuoteRequestForm />
      </div>

      <aside className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold">What Happens Next</h2>
          <ol className="mt-3 space-y-3 text-sm text-black/70">
            <li>
              <span className="font-semibold text-black">1. We review</span> your request and 
              confirm service area.
            </li>
            <li>
              <span className="font-semibold text-black">2. We follow up</span> to schedule a 
              property walk-through.
            </li>
            <li>
              <span className="font-semibold text-black">3. We deliver</span> a detailed, 
              transparent quote.
            </li>
          </ol>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Pro Tip</h2>
          <p className="mt-3 text-sm leading-6 text-black/70">
            Include as much detail as possible: gate codes, lot size, existing landscaping 
            challenges, and your goals. Better information = more accurate quote.
          </p>
        </div>
        <div className="card bg-[var(--accent-soft)]">
          <p className="text-sm font-semibold text-[var(--accent)]">Questions?</p>
          <p className="mt-2 text-sm text-black/70">
            Call us at <span className="font-semibold">(555) 123-4567</span> for immediate answers.
          </p>
        </div>
      </aside>
    </section>
  );
}
