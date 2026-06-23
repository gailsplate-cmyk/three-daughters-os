"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";

export function QuoteRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const fullName = String(formData.get("fullName") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();
      const serviceType = String(formData.get("serviceType") ?? "").trim();
      const address = String(formData.get("address") ?? "").trim();
      const notes = String(formData.get("notes") ?? "").trim();

      if (!fullName || !email || !phone || !serviceType || !address) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Create customer
      const customer = await api.createCustomer({
        full_name: fullName,
        email,
        phone,
      });

      // Create property
      const property = await api.createProperty({
        customer_id: customer.id,
        address,
      });

      // Create service request
      await api.createServiceRequest({
        customer_id: customer.id,
        property_id: property.id,
        service_type: serviceType,
        description: notes || "Quote request from website",
      });

      // Redirect to thank you
      router.push("/quote-request/thank-you");
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      {error && (
        <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <label className="field-label">
        Full Name
        <input
          name="fullName"
          className="field-input"
          placeholder="Your Name"
          required
          disabled={loading}
        />
      </label>
      <label className="field-label">
        Email
        <input
          name="email"
          type="email"
          className="field-input"
          placeholder="you@example.com"
          required
          disabled={loading}
        />
      </label>
      <label className="field-label">
        Phone
        <input
          name="phone"
          className="field-input"
          placeholder="(555) 123-4567"
          required
          disabled={loading}
        />
      </label>
      <label className="field-label">
        Primary Interest
        <select name="serviceType" className="field-input" required disabled={loading}>
          <option value="">Select a service</option>
          <option>Lawn Maintenance</option>
          <option>Property Cleanups</option>
          <option>Mulching & Bed Maintenance</option>
          <option>Hedge & Shrub Pruning</option>
          <option>Leaf Removal</option>
          <option>Aeration & Overseeding</option>
          <option>Gutter Cleaning</option>
          <option>Commercial Property Maintenance</option>
          <option>Multiple Services</option>
        </select>
      </label>
      <label className="field-label md:col-span-2">
        Property Address
        <input
          name="address"
          className="field-input"
          placeholder="123 Main Street, City, ST 12345"
          required
          disabled={loading}
        />
      </label>
      <label className="field-label md:col-span-2">
        Tell Us More (Optional)
        <textarea
          name="notes"
          rows={4}
          className="field-input"
          placeholder="Describe your property, any challenges, timeline preferences, or specific goals."
          disabled={loading}
        />
      </label>
      <div className="md:col-span-2 pt-2">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Request Quote"}
        </button>
        <p className="mt-3 text-xs text-black/60">
          ✓ Free quote · ✓ No obligation · ✓ Response within 24 hours
        </p>
      </div>
    </form>
  );
}
