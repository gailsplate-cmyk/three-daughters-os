import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Three Daughters Landscaping and our philosophy on property care, consistency, and long-term relationships.",
};

export default function AboutPage() {
  return (
    <section className="flex w-full flex-col gap-8">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">About</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Three Daughters Landscaping</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
          Three Daughters started with a simple belief: that property care should be personal, 
          reliable, and transparent.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-black/70">
          We serve homeowners who believe their outdoor spaces are an extension of their home&apos;s 
          value and their lifestyle. Our clients aren&apos;t looking for the cheapest option\u2014they want 
          consistency, professionalism, and partners they can trust with their most valuable asset.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="card">
          <h2 className="text-xl font-semibold">Our Philosophy</h2>
          <p className="mt-4 leading-7 text-black/70">
            Property care isn&apos;t about one-off projects. It&apos;s about relationships built over time. 
            The same crew. Consistent standards. Knowledge that compounds. We want to understand your 
            property well enough to recommend what&apos;s actually best for it—not what generates the most 
            revenue this month.
          </p>
        </article>
        <article className="card">
          <h2 className="text-xl font-semibold">What Sets Us Apart</h2>
          <p className="mt-4 leading-7 text-black/70">
            We were early adopters of digital tools that make property care transparent and 
            organized. No surprise invoices. No confusion about what was done. Service history that 
            actually builds value over time. We think like operators, not just service providers.
          </p>
        </article>
      </div>

      <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-12">
        <h2 className="text-2xl font-semibold">Why Consistency Matters</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article>
            <h3 className="font-semibold text-[var(--accent)]">For Your Property</h3>
            <p className="mt-3 leading-7 text-black/70">
              Seasonal patterns matter. Soil composition matters. The subtle differences between 
              how your northeast corner drains versus your south-facing slope—these things become 
              obvious when the same team works a property over years. That knowledge gets baked 
              into better decisions.
            </p>
          </article>
          <article>
            <h3 className="font-semibold text-[var(--accent)]">For Your Peace of Mind</h3>
            <p className="mt-3 leading-7 text-black/70">
              You don&apos;t want to interview landscapers annually. You want one team that shows up, 
              knows what they&apos;re doing, and cares about doing it right. That&apos;s us. The same faces. 
              The same standards. Every visit.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
