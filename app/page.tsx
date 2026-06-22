import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Professional landscaping services for discerning homeowners. Consistent quality, transparent communication, reliable results.",
};

export default function Home() {
  return (
    <section className="flex w-full flex-col gap-12">
      {/* Hero Section */}
      <div className="hero-grid rounded-3xl border border-black/10 p-8 md:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/65">
          Three Daughters Landscaping
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Property care that <span className="text-[var(--accent)]">compounds</span> over time.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
          Most landscaping feels transactional. We treat every property as a long-term relationship. 
          Consistent service. Transparent communication. Results that build equity in your home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn-primary" href="/quote-request">
            Request a Quote
          </Link>
          <Link className="btn-secondary" href="/services">
            Explore Services
          </Link>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="card">
          <p className="text-3xl font-semibold text-[var(--accent)]">10+</p>
          <p className="mt-2 text-sm font-medium text-black/70">Years of Professional Service</p>
        </article>
        <article className="card">
          <p className="text-3xl font-semibold text-[var(--accent)]">200+</p>
          <p className="mt-2 text-sm font-medium text-black/70">Properties Under Active Care</p>
        </article>
        <article className="card">
          <p className="text-3xl font-semibold text-[var(--accent)]">Fully Insured</p>
          <p className="mt-2 text-sm font-medium text-black/70">Licensed & Bonded</p>
        </article>
      </div>

      {/* Why We're Different */}
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-12">
        <h2 className="text-3xl font-semibold tracking-tight">Why Property Owners Choose Us</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article>
            <h3 className="font-semibold">Consistency</h3>
            <p className="mt-2 text-black/70">
              Same crew, same schedule, same standards. Property care that improves with familiarity, 
              not changes with turnover.
            </p>
          </article>
          <article>
            <h3 className="font-semibold">Transparency</h3>
            <p className="mt-2 text-black/70">
              Clear quotes. No surprise charges. Simple communication about what was done, what&apos;s next, 
              and why it matters.
            </p>
          </article>
          <article>
            <h3 className="font-semibold">Long-Term Thinking</h3>
            <p className="mt-2 text-black/70">
              We recommend work that makes sense for your property&apos;s future, not just this season. 
              Your landscape&apos;s health is our reputation.
            </p>
          </article>
          <article>
            <h3 className="font-semibold">Operational Excellence</h3>
            <p className="mt-2 text-black/70">
              Digital-first scheduling, documented service history, and straightforward billing 
              so you never wonder what you&apos;re paying for.
            </p>
          </article>
        </div>
      </div>

      {/* Primary CTAs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/quote-request" className="card block transition-all hover:shadow-md hover:border-[var(--accent)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Start Here
          </p>
          <h3 className="mt-3 text-xl font-semibold">Get a Quote</h3>
          <p className="mt-3 text-black/70">
            Share your property details and goals. Receive a clear, competitive quote within 24 hours.
          </p>
        </Link>
        <Link href="/services" className="card block transition-all hover:shadow-md hover:border-[var(--accent)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Our Work
          </p>
          <h3 className="mt-3 text-xl font-semibold">Services</h3>
          <p className="mt-3 text-black/70">
            Routine maintenance. Seasonal cleanup. Strategic improvements. Everything designed around your property&apos;s needs.
          </p>
        </Link>
        <Link href="/about" className="card block transition-all hover:shadow-md hover:border-[var(--accent)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Who We Are
          </p>
          <h3 className="mt-3 text-xl font-semibold">About</h3>
          <p className="mt-3 text-black/70">
            The story behind Three Daughters. Why we do this work. What we believe about property care.
          </p>
        </Link>
      </div>

      {/* Testimonial Section */}
      <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">What Our Clients Say</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="border-l-4 border-[var(--accent)] pl-4">
            <p className="text-black/80">
              &quot;Three Daughters turned lawn care from a headache into something I don&apos;t think about. 
              The same crew every time, and they actually care about getting it right.&quot;
            </p>
            <p className="mt-3 font-semibold text-sm">— Margaret, Homeowner</p>
          </article>
          <article className="border-l-4 border-[var(--accent)] pl-4">
            <p className="text-black/80">
              &quot;I tried three different companies before finding them. The difference is professionalism 
              and consistency. They show up on time, every time, and the work is impeccable.&quot;
            </p>
            <p className="mt-3 font-semibold text-sm">— David, Property Owner</p>
          </article>
        </div>
      </div>

      {/* Simple CTA Footer Section */}
      <div className="rounded-3xl border border-black/10 bg-[var(--accent-soft)] p-8 md:p-12 text-center">
        <h2 className="text-3xl font-semibold text-[var(--foreground)]">Ready to see the difference?</h2>
        <p className="mt-4 text-black/70">
          Get a free, no-obligation quote for your property in 24 hours.
        </p>
        <Link className="btn-primary mt-6 inline-block" href="/quote-request">
          Request Your Quote
        </Link>
      </div>
    </section>
  );
}
