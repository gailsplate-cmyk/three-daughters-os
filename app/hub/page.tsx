import type { Metadata } from "next";
import { getBusinessSnapshot } from "@/lib/business-data";

export const metadata: Metadata = {
  title: "Business Hub",
  description:
    "Simple internal dashboard for leads, properties, customers, quotes, schedule, and invoices.",
};

export const dynamic = "force-dynamic";

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-xs uppercase tracking-[0.12em] text-black/55">{subtitle}</p>
    </div>
  );
}

export default function BusinessHubPage() {
  const data = getBusinessSnapshot();

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">Business Hub</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Operations Overview</h1>
        <p className="mt-4 max-w-3xl text-black/70">
          Lightweight Phase 0 operations workspace for lead tracking, property records,
          customer records, quotes, scheduling, and invoices.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          <article className="card p-4 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-black/55">Leads</p>
            <p className="mt-2 text-2xl font-semibold">{data.leads.length}</p>
          </article>
          <article className="card p-4 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-black/55">Customers</p>
            <p className="mt-2 text-2xl font-semibold">{data.customers.length}</p>
          </article>
          <article className="card p-4 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-black/55">Properties</p>
            <p className="mt-2 text-2xl font-semibold">{data.properties.length}</p>
          </article>
          <article className="card p-4 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-black/55">Quotes</p>
            <p className="mt-2 text-2xl font-semibold">{data.quotes.length}</p>
          </article>
          <article className="card p-4 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-black/55">Schedule</p>
            <p className="mt-2 text-2xl font-semibold">{data.schedule.length}</p>
          </article>
          <article className="card p-4 text-center">
            <p className="text-xs uppercase tracking-[0.12em] text-black/55">Invoices</p>
            <p className="mt-2 text-2xl font-semibold">{data.invoices.length}</p>
          </article>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <SectionHeading title="Lead Tracking" subtitle="Newest first" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-black/55">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Service</th>
                  <th className="py-2 pr-3">Address</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.slice(0, 8).map((lead) => (
                  <tr key={lead.id} className="border-b border-black/5">
                    <td className="py-2 pr-3">{lead.fullName}</td>
                    <td className="py-2 pr-3">{lead.serviceType}</td>
                    <td className="py-2 pr-3">{lead.address}</td>
                    <td className="py-2">{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <SectionHeading title="Customer Records" subtitle="Primary contacts" />
          <div className="space-y-3 text-sm">
            {data.customers.map((customer) => (
              <article key={customer.id} className="rounded-xl border border-black/10 bg-white p-3">
                <p className="font-semibold">{customer.fullName}</p>
                <p className="text-black/70">{customer.email}</p>
                <p className="text-black/70">{customer.phone}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeading title="Property Records" subtitle="Property-centric" />
          <div className="space-y-3 text-sm">
            {data.properties.map((property) => (
              <article key={property.id} className="rounded-xl border border-black/10 bg-white p-3">
                <p className="font-semibold">{property.address}</p>
                <p className="text-black/70">Notes: {property.notes}</p>
                <p className="text-black/70">
                  Last Service: {property.lastServiceDate || "Not recorded yet"}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeading title="Quote Management" subtitle="Current pipeline" />
          <div className="space-y-3 text-sm">
            {data.quotes.map((quote) => (
              <article key={quote.id} className="rounded-xl border border-black/10 bg-white p-3">
                <p className="font-semibold">{quote.customerName}</p>
                <p className="text-black/70">{quote.propertyAddress}</p>
                <p className="text-black/70">${quote.amount.toFixed(2)} · {quote.status}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeading title="Scheduling" subtitle="Upcoming work" />
          <div className="space-y-3 text-sm">
            {data.schedule.map((item) => (
              <article key={item.id} className="rounded-xl border border-black/10 bg-white p-3">
                <p className="font-semibold">{item.customerName}</p>
                <p className="text-black/70">{item.serviceType}</p>
                <p className="text-black/70">{item.propertyAddress}</p>
                <p className="text-black/70">{item.scheduledDate} · {item.status}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeading title="Invoice Management" subtitle="Billing status" />
          <div className="space-y-3 text-sm">
            {data.invoices.map((invoice) => (
              <article key={invoice.id} className="rounded-xl border border-black/10 bg-white p-3">
                <p className="font-semibold">{invoice.customerName}</p>
                <p className="text-black/70">Due: {invoice.dueDate}</p>
                <p className="text-black/70">${invoice.amount.toFixed(2)} · {invoice.status}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
