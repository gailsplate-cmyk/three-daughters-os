export default function ScheduleServicePage() {
  return (
    <section className="grid w-full gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
          Flow 02 · Schedule Service
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Schedule Service</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
          Pick your preferred timing and service details. This will become a live
          scheduler tied to crew routing and job availability in later phases.
        </p>

        <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="field-label">
            Customer Name
            <input className="field-input" placeholder="Morgan Smith" />
          </label>
          <label className="field-label">
            Service Category
            <select className="field-input">
              <option>Recurring Lawn Care</option>
              <option>One-Time Cleanup</option>
              <option>Trim & Detail</option>
              <option>Seasonal Service</option>
            </select>
          </label>
          <label className="field-label md:col-span-2">
            Property Address
            <input className="field-input" placeholder="456 Pine Rd, City, ST" />
          </label>
          <label className="field-label">
            Preferred Date
            <input type="date" className="field-input" />
          </label>
          <label className="field-label">
            Preferred Window
            <select className="field-input">
              <option>Morning (8am - 11am)</option>
              <option>Midday (11am - 2pm)</option>
              <option>Afternoon (2pm - 5pm)</option>
              <option>Flexible</option>
            </select>
          </label>
          <label className="field-label md:col-span-2">
            Access Instructions
            <textarea
              rows={4}
              className="field-input"
              placeholder="Gate code, parking notes, pet instructions, or constraints."
            />
          </label>
          <div className="md:col-span-2 pt-2">
            <button type="button" className="btn-primary">
              Submit Scheduling Request
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold">Scheduling SLA</h2>
          <p className="mt-3 text-sm leading-6 text-black/70">
            Most requests are confirmed within one business day with either an
            exact slot or two validated alternatives.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Preparation Checklist</h2>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>Include preferred access path.</li>
            <li>Call out irrigation or utility lines.</li>
            <li>Share any neighbor or HOA timing limits.</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
