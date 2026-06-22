import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { addLead } from "@/lib/business-data";

export const metadata: Metadata = {
  title: "Request Quote",
  description:
    "Request a landscaping quote with your property address, service needs, and project notes.",
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
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Request a Quote</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
          Give us your property and scope details. This structured request helps us
          return faster, cleaner quote options.
        </p>

        <form action={submitQuoteRequest} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="field-label">
            Full Name
            <input name="fullName" className="field-input" placeholder="Taylor Johnson" required />
          </label>
          <label className="field-label">
            Email
            <input
              name="email"
              type="email"
              className="field-input"
              placeholder="taylor@email.com"
              required
            />
          </label>
          <label className="field-label">
            Phone
            <input name="phone" className="field-input" placeholder="(555) 123-4567" required />
          </label>
          <label className="field-label">
            Service Type
            <select name="serviceType" className="field-input" required>
              <option>Lawn Care</option>
              <option>Landscape Cleanup</option>
              <option>Mulching</option>
              <option>Shrub Trimming</option>
              <option>Other</option>
            </select>
          </label>
          <label className="field-label md:col-span-2">
            Property Address
            <input
              name="address"
              className="field-input"
              placeholder="123 Main St, City, ST"
              required
            />
          </label>
          <label className="field-label md:col-span-2">
            Project Notes
            <textarea
              name="notes"
              rows={5}
              className="field-input"
              placeholder="Describe your goals, timeline, and any specific issues to address."
            />
          </label>
          <div className="md:col-span-2 pt-2">
            <button type="submit" className="btn-primary">
              Submit Quote Request
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold">What Happens Next</h2>
          <ol className="mt-3 space-y-2 text-sm text-black/70">
            <li>1. Request reviewed by office team.</li>
            <li>2. Scope assumptions confirmed.</li>
            <li>3. Quote delivered with schedule windows.</li>
          </ol>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Best Results Tip</h2>
          <p className="mt-3 text-sm leading-6 text-black/70">
            Mention gate codes, parking limits, pet considerations, and priority
            areas so your first quote is as accurate as possible.
          </p>
        </div>
      </aside>
    </section>
  );
}
