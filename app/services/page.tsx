import type { Metadata } from "next";

const services = [
  {
    name: "Lawn Maintenance",
    description:
      "Regular mowing, edging, and lawn care tailored to your property's needs. We keep your lawn healthy and looking sharp year-round.",
  },
  {
    name: "Property Cleanups",
    description:
      "Comprehensive property cleanups for spring, fall, and seasonal transitions. We handle debris removal and general property tidiness.",
  },
  {
    name: "Mulching & Bed Maintenance",
    description:
      "Professional mulching that protects your landscape beds while enhancing curb appeal. Includes bed maintenance and soil health management.",
  },
  {
    name: "Hedge & Shrub Pruning",
    description:
      "Precision trimming and shaping of hedges and shrubs. We maintain plant health while enhancing your property's aesthetic appeal.",
  },
  {
    name: "Leaf Removal",
    description:
      "Efficient leaf removal services to keep your property clean and maintained throughout fall and winter seasons.",
  },
  {
    name: "Aeration & Overseeding",
    description:
      "Lawn aeration and overseeding services to promote healthy grass growth, improve soil quality, and fill in thin or bare spots.",
  },
  {
    name: "Gutter Cleaning",
    description:
      "Professional gutter cleaning and maintenance to protect your property from water damage and maintain proper drainage.",
  },
  {
    name: "Commercial Property Maintenance",
    description:
      "Full-service landscaping and maintenance solutions for commercial properties. Tailored to meet business aesthetic and operational needs.",
  },
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional landscaping services including lawn care, seasonal cleanup, mulching, and strategic property improvements.",
};

export default function ServicesPage() {
  return (
    <section className="flex w-full flex-col gap-8">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">Services</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">What We Offer</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
          Every property is different. Every season is different. Our services are designed 
          to be flexible, consistent, and focused on long-term value.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.name} className="card">
            <h2 className="text-lg font-semibold">{service.name}</h2>
            <p className="mt-3 leading-7 text-black/70">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-black/10 bg-[var(--accent-soft)] p-8 md:p-12">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">How We Work</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article>
            <p className="font-semibold text-sm uppercase tracking-[0.12em] text-[var(--accent)]">Step 1</p>
            <h3 className="mt-2 font-semibold">Consultation</h3>
            <p className="mt-2 text-sm leading-6 text-black/70">
              We visit your property, understand your goals, and develop a plan that makes sense 
              for your home and your lifestyle.
            </p>
          </article>
          <article>
            <p className="font-semibold text-sm uppercase tracking-[0.12em] text-[var(--accent)]">Step 2</p>
            <h3 className="mt-2 font-semibold">Consistent Service</h3>
            <p className="mt-2 text-sm leading-6 text-black/70">
              The same crew, on schedule, with documented work. Each visit builds knowledge and 
              improves future recommendations.
            </p>
          </article>
          <article>
            <p className="font-semibold text-sm uppercase tracking-[0.12em] text-[var(--accent)]">Step 3</p>
            <h3 className="mt-2 font-semibold">Strategic Growth</h3>
            <p className="mt-2 text-sm leading-6 text-black/70">
              Over time, we recommend improvements that add real value. Updates feel intentional, 
              not reactive.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
