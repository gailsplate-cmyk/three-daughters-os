import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { addLead } from "@/lib/business-data";

export const metadata: Metadata = {
  title: "Request Quote",
  description:
    "Get a free, detailed quote for your landscaping project. Share your property and goals.",
};

async function submitQuoteRequest(formData: FormData) {
  "use server";

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const serviceType = String(formData.get("serviceType") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!fullName || !email || !phone || !serviceType || !address) {
    redirect("/quote-request");
  }

  addLead({
    fullName,
    email,
    phone,
    address,
    serviceType,
    notes,
  });

  redirect("/quote-request/thank-you");
}

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

        <form action={submitQuoteRequest} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="field-label">
            Full Name
            <input name="fullName" className="field-input" placeholder="Your Name" required />
          </label>
          <label className="field-label">
            Email
            <input
              name="email"
              type="email"
              className="field-input"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="field-label">
            Phone
            <input name="phone" className="field-input" placeholder="(555) 123-4567" required />
          </label>
          <label className="field-label">
            Primary Interest
            <select name="serviceType" className="field-input" required>
              <option value="">Select a service</option>
              <option>Routine Lawn Care</option>
              <option>Seasonal Cleanup</option>
              <option>Mulching & Bed Work</option>
              <option>Shrub & Tree Trimming</option>
              <option>Custom Project</option>
              <option>Multiple Services</option>
            </select>
          </label>
          <label className="field-label md:col-span-2">
            Property Address
            <input
              name="address"
              className="field-input"
              placeholder="123 Main Street, City, ST 12345"
              required
            />
          </label>
          <label className="field-label md:col-span-2">
            Tell Us More (Optional)
            <textarea
              name="notes"
              rows={4}
              className="field-input"
              placeholder="Describe your property, any challenges, timeline preferences, or specific goals."
            />
          </label>
          <div className="md:col-span-2 pt-2">
            <button type="submit" className="btn-primary">
              Request Quote
            </button>
            <p className="mt-3 text-xs text-black/60">
              ✓ Free quote · ✓ No obligation · ✓ Response within 24 hours
            </p>
          </div>
        </form>
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
