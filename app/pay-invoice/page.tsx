export default function PayInvoicePage() {
  return (
    <section className="grid w-full gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
          Flow 03 · Pay Invoice
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Pay Your Invoice</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
          Enter invoice details below. In Phase B, this experience will connect to
          Stripe Checkout with saved customer and property context.
        </p>

        <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="field-label">
            Invoice Number
            <input className="field-input" placeholder="INV-2026-0148" />
          </label>
          <label className="field-label">
            Billing Email
            <input type="email" className="field-input" placeholder="billing@email.com" />
          </label>
          <label className="field-label">
            Amount Due
            <input className="field-input" placeholder="$245.00" />
          </label>
          <label className="field-label">
            Payment Method
            <select className="field-input">
              <option>Card</option>
              <option>Bank Transfer (ACH)</option>
            </select>
          </label>
          <label className="field-label md:col-span-2">
            Service Address (for verification)
            <input className="field-input" placeholder="123 Main St, City, ST" />
          </label>
          <div className="md:col-span-2 pt-2">
            <button type="button" className="btn-primary">
              Continue To Secure Payment
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold">Payment Confidence</h2>
          <p className="mt-3 text-sm leading-6 text-black/70">
            Receipt, payment status, and invoice history will be visible in the
            customer portal once Stripe integration is active.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Need Help?</h2>
          <p className="mt-3 text-sm leading-6 text-black/70">
            Contact the office if your invoice amount or service record looks off.
            We can validate and correct before checkout.
          </p>
        </div>
      </aside>
    </section>
  );
}
