from app.main import init_db, connect, now_iso, new_id
import json

init_db()

timestamp = now_iso()
customer_id = new_id("cus")
property_id = new_id("prop")
request_id = new_id("req")
quote_id = new_id("quote")
job_id = new_id("job")

with connect() as conn:
    conn.execute(
        "INSERT INTO customers (id, full_name, email, phone, created_at) VALUES (?, ?, ?, ?, ?)",
        (customer_id, "Sample Homeowner", "sample@example.com", "403-555-0188", timestamp),
    )
    conn.execute(
        """
        INSERT INTO properties
        (id, customer_id, address, city, province, postal_code, property_type, notes, access_notes, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            property_id,
            customer_id,
            "123 Greenline Way",
            "Calgary",
            "AB",
            "T2X 0A1",
            "residential",
            "Front bed needs redesign. Backyard lawn service biweekly.",
            "Gate on left side. Dog may be in yard; text before arrival.",
            timestamp,
            timestamp,
        ),
    )
    conn.execute(
        """
        INSERT INTO service_requests
        (id, property_id, customer_id, service_type, description, budget_min, budget_max, preferred_timing, status, photo_urls, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            request_id,
            property_id,
            customer_id,
            "flower_bed_design",
            "Client wants front flower bed redesigned with low-maintenance plants and mulch.",
            1200,
            2500,
            "within 2 weeks",
            "quoted",
            json.dumps(["https://example.com/front-bed-before.jpg"]),
            timestamp,
            timestamp,
        ),
    )
    conn.execute(
        """
        INSERT INTO quotes
        (id, request_id, property_id, title, scope_summary, estimate_low, estimate_high, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            quote_id,
            request_id,
            property_id,
            "Front Bed Refresh",
            "Remove weeds, reshape bed edge, install fabric, mulch, and low-maintenance perennials. Final scope to be confirmed onsite.",
            1800,
            3200,
            "approved",
            timestamp,
            timestamp,
        ),
    )
    conn.execute(
        """
        INSERT INTO jobs
        (id, property_id, quote_id, service_type, scheduled_date, scheduled_start, scheduled_end, crew_name, status, estimated_minutes, route_zone, notes, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            job_id,
            property_id,
            quote_id,
            "flower_bed_design",
            "2026-06-22",
            "09:00",
            "13:00",
            "Crew A",
            "scheduled",
            240,
            "NW",
            "Bring mulch, edging tools, fabric, and plant list.",
            timestamp,
            timestamp,
        ),
    )
    conn.execute(
        """
        INSERT INTO recommendations
        (id, property_id, title, description, priority, status, source, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            new_id("rec"),
            property_id,
            "Recommend hedge trim",
            "Crew noticed hedge encroaching on walkway. Good follow-up opportunity after front bed work.",
            "medium",
            "open",
            "crew",
            timestamp,
        ),
    )
    conn.commit()

print("Seeded Greenline prototype database")
print(f"Customer: {customer_id}")
print(f"Property: {property_id}")
print(f"Request:  {request_id}")
print(f"Quote:    {quote_id}")
print(f"Job:      {job_id}")
