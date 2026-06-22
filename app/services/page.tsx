import type { Metadata } from "next";

const services = [
  "Routine Lawn Care",
  "Landscape Cleanup",
  "Seasonal Mulching",
  "Shrub Trimming",
  "Property Health Recommendations",
  "Additional On-Demand Services",
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore lawn care, cleanup, mulching, trimming, and ongoing landscaping services.",
};

export default function ServicesPage() {
  return (
    <section className="w-full">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
          Services
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">What We Offer</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
          Professional landscaping and property maintenance services designed to
          keep your outdoor spaces clean, healthy, and consistently cared for.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service} className="card">
            <h2 className="text-lg font-semibold">{service}</h2>
            <p className="mt-2 text-sm leading-6 text-black/70">
              Structured service details, timestamps, and notes designed for
              repeatable quality and better customer updates.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
