import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Three Daughters Landscaping and our commitment to reliable, high-quality property care.",
};

export default function AboutPage() {
  return (
    <section className="w-full rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
        About
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">About Three Daughters</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-black/70">
        Three Daughters Landscaping is focused on dependable property care,
        responsive communication, and quality work that lasts season after season.
      </p>
      <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
        We serve homeowners who want a team they can trust for routine maintenance,
        cleanup, and landscape improvements without the guesswork.
      </p>
    </section>
  );
}
