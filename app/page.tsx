import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trusted landscaping and property maintenance services. Request a quote online in minutes.",
};

export default function Home() {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="hero-grid rounded-3xl border border-black/10 p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/65">
          Local Landscaping Team
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Clean, reliable landscaping services for homes and properties.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-black/70 md:text-lg">
          Three Daughters Landscaping helps homeowners keep properties looking
          great with dependable scheduling, clear communication, and quality
          results across every visit.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link className="btn-primary" href="/quote-request">
            Request A Quote
          </Link>
          <Link className="btn-secondary" href="/services">
            View Services
          </Link>
          <Link className="btn-secondary" href="/hub">
            Open Business Hub
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/quote-request" className="card block transition-shadow hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            Fast Start
          </p>
          <h2 className="mt-2 text-xl font-semibold">Request Quote</h2>
          <p className="mt-3 text-black/70">
            Send your property details and service goals. We will respond with
            availability and next steps.
          </p>
        </Link>
        <Link href="/services" className="card block transition-shadow hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            Clear Scope
          </p>
          <h2 className="mt-2 text-xl font-semibold">Services</h2>
          <p className="mt-3 text-black/70">
            Explore routine lawn care, cleanup, trimming, and seasonal service
            options designed for consistent results.
          </p>
        </Link>
        <Link href="/contact" className="card block transition-shadow hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            Get In Touch
          </p>
          <h2 className="mt-2 text-xl font-semibold">Contact</h2>
          <p className="mt-3 text-black/70">
            Questions about services, timelines, or your property? Reach out and
            we will help you quickly.
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="card">
          <h2 className="text-xl font-semibold">Reliable Service</h2>
          <p className="mt-3 text-black/70">
            Consistent property care with straightforward updates and service you
            can trust.
          </p>
        </article>
        <article className="card">
          <h2 className="text-xl font-semibold">Simple Process</h2>
          <p className="mt-3 text-black/70">
            Quote request, service details, and communication are all handled in
            one place.
          </p>
        </article>
        <article className="card">
          <h2 className="text-xl font-semibold">Long-Term Care</h2>
          <p className="mt-3 text-black/70">
            Built for ongoing property maintenance, seasonal updates, and
            repeat-service relationships.
          </p>
        </article>
      </div>
    </section>
  );
}
