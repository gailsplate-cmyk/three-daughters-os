# Greenline Property Backend Prototype

This is a small FastAPI + SQLite backend for the first Greenline MVP.

It is centered on the **property record**:

- customer
- property
- photos
- service requests
- quotes
- scheduled jobs
- crew feedback
- recommendations
- Monday planning view

The goal is not to build the full Greenline platform yet. The goal is to create the first backend that turns scattered texts, calls, screenshots, and memory into one source of truth.

## What this prototype proves

Greenline can start as a website + private dashboard, not a native app.

Customer side:

- submit property/service requests
- upload photo URLs
- describe the job
- give budget and preferred timing

Admin side:

- see property records
- manage quote pipeline
- schedule jobs
- collect crew feedback
- see Monday planning view

## Run locally

```bash
cd greenline_property_backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python seed_db.py
uvicorn app.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

FastAPI will show an interactive API console.

## Core endpoints

### Health

```http
GET /health
```

### Customers

```http
POST /customers
GET /customers
```

Example:

```json
{
  "full_name": "Jane Homeowner",
  "email": "jane@example.com",
  "phone": "403-555-0101"
}
```

### Properties

```http
POST /properties
GET /properties
GET /properties/{property_id}
POST /properties/{property_id}/photos
POST /properties/{property_id}/recommendations
```

Example:

```json
{
  "customer_id": "cus_example",
  "address": "123 Greenline Way",
  "city": "Calgary",
  "province": "AB",
  "postal_code": "T2X 0A1",
  "property_type": "residential",
  "notes": "Front bed needs redesign. Backyard lawn service biweekly.",
  "access_notes": "Gate on left side. Text before arrival."
}
```

### Service requests

```http
POST /service-requests
GET /service-requests
PATCH /service-requests/{request_id}/status
```

Example:

```json
{
  "customer_id": "cus_example",
  "property_id": "prop_example",
  "service_type": "flower_bed_design",
  "description": "Client wants front bed redesigned with low-maintenance plants and mulch.",
  "budget_min": 1200,
  "budget_max": 2500,
  "preferred_timing": "within 2 weeks",
  "photo_urls": ["https://example.com/front-bed-before.jpg"]
}
```

### Quotes

```http
POST /quotes
PATCH /quotes/{quote_id}/status
```

Example:

```json
{
  "request_id": "req_example",
  "property_id": "prop_example",
  "title": "Front Bed Refresh",
  "scope_summary": "Remove weeds, reshape edge, install fabric, mulch, and low-maintenance perennials. Final scope confirmed onsite.",
  "estimate_low": 1800,
  "estimate_high": 3200,
  "status": "sent"
}
```

### Jobs

```http
POST /jobs
GET /jobs
PATCH /jobs/{job_id}/status
```

Example:

```json
{
  "property_id": "prop_example",
  "quote_id": "quote_example",
  "service_type": "flower_bed_design",
  "scheduled_date": "2026-06-22",
  "scheduled_start": "09:00",
  "scheduled_end": "13:00",
  "crew_name": "Crew A",
  "status": "scheduled",
  "estimated_minutes": 240,
  "route_zone": "NW",
  "notes": "Bring mulch, edging tools, fabric, and plant list."
}
```

### Crew feedback

```http
POST /crew-feedback
```

Example:

```json
{
  "job_id": "job_example",
  "crew_name": "Crew A",
  "actual_minutes": 255,
  "completion_status": "complete",
  "notes": "Job completed. Customer was happy with layout.",
  "issues": "Soil was harder than expected near walkway.",
  "opportunities": "Customer asked about hedge trimming next month.",
  "photo_urls": ["https://example.com/front-bed-after.jpg"]
}
```

When crew feedback includes an `opportunities` value, the backend automatically creates a property recommendation.

### Monday planning view

```http
GET /planning/monday?week_start=2026-06-22
```

Returns:

- scheduled jobs
- unscheduled jobs
- open service requests
- approved quotes without jobs
- open property recommendations
- risk flags
- production by day
- next actions

This is the first version of John's “7:00 AM Monday” operating view.

## Build path after this

1. Add authentication.
2. Add real file/photo upload storage.
3. Add a frontend dashboard.
4. Add quote templates.
5. Add crew mobile web forms.
6. Add route grouping and map display.
7. Add AI-assisted scoping and recommendations.
8. Add customer portal.

## Important prototype note

This is not production-ready. It intentionally avoids complex infrastructure so the Greenline concept can be tested quickly.

For production, replace local SQLite/photo URLs with:

- Postgres or Supabase
- real auth
- cloud image storage
- role-based permissions
- audit logs
- background jobs
- map/routing integration
