import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Three Daughters Landscaping for questions, quotes, or service details.",
};

export default function ContactPage() {
  return (
    <section className="flex w-full flex-col gap-8">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Get in Touch</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
          Questions about services, your property, or scheduling? We&apos;re here to help and will 
          typically respond within one business day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="card">
          <h2 className="text-lg font-semibold">Quick Quote</h2>
          <p className="mt-4 text-black/70">
            The fastest way to get a quote is through our online form. Share your property details 
            and we&apos;ll follow up with availability and next steps.
          </p>
          <a href="/quote-request" className="btn-primary mt-4 inline-block">
            Start Quote Request
          </a>
        </article>

        <article className="card">
          <h2 className="text-lg font-semibold">Direct Contact</h2>
          <p className="mt-4 font-semibold text-black">Phone</p>
          <p className="text-black/70">(555) 123-4567</p>
          <p className="mt-4 font-semibold text-black">Email</p>
          <p className="text-black/70">hello@threedaughters.com</p>
          <p className="mt-4 font-semibold text-black">Hours</p>
          <p className="text-black/70">Mon - Fri, 8:00 AM - 5:00 PM</p>
        </article>
      </div>

      <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-12">
        <h2 className="text-2xl font-semibold">What to Expect</h2>
        <div className="mt-8 space-y-4">
          <article className="flex gap-4">
            <div className="w-8 flex-shrink-0 rounded-full bg-[var(--accent-soft)] p-2 text-center text-sm font-semibold text-[var(--accent)]">
              1
            </div>
            <div>
              <h3 className="font-semibold">We&apos;ll Review Your Request</h3>
              <p className="mt-2 text-black/70">
                Within 24 hours, our team reviews your quote request and confirms we can serve 
                your property.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <div className="w-8 flex-shrink-0 rounded-full bg-[var(--accent-soft)] p-2 text-center text-sm font-semibold text-[var(--accent)]">
              2
            </div>
            <div>
              <h3 className="font-semibold">Schedule a Walk-Through</h3>
              <p className="mt-2 text-black/70">
                For most projects, we visit your property to provide an accurate quote and 
                discuss your vision in detail.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <div className="w-8 flex-shrink-0 rounded-full bg-[var(--accent-soft)] p-2 text-center text-sm font-semibold text-[var(--accent)]">
              3
            </div>
            <div>
              <h3 className="font-semibold">Get Your Quote</h3>
              <p className="mt-2 text-black/70">
                Clear, itemized quote with no hidden charges. We outline what we&apos;ll do and why.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
