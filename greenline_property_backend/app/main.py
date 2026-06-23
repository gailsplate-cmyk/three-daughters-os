from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "greenline.db"

app = FastAPI(
    title="Greenline Property Backend Prototype",
    description="A property-centered backend for quote intake, property records, jobs, crew feedback, and weekly planning.",
    version="0.1.0",
)


def now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


def new_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:12]}"


def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def parse_json(value: Any, fallback: Any = None) -> Any:
    if value is None:
        return fallback
    if isinstance(value, (dict, list)):
        return value
    try:
        return json.loads(value)
    except Exception:
        return fallback


def row_to_dict(row: sqlite3.Row | None, json_fields: list[str] | None = None) -> dict[str, Any] | None:
    if row is None:
        return None
    data = dict(row)
    for field in json_fields or []:
        data[field] = parse_json(data.get(field), [])
    return data


def init_db() -> None:
    with connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS customers (
                id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS properties (
                id TEXT PRIMARY KEY,
                customer_id TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                province TEXT NOT NULL,
                postal_code TEXT,
                property_type TEXT DEFAULT 'residential',
                notes TEXT,
                access_notes TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                FOREIGN KEY(customer_id) REFERENCES customers(id)
            );

            CREATE TABLE IF NOT EXISTS property_photos (
                id TEXT PRIMARY KEY,
                property_id TEXT NOT NULL,
                url TEXT NOT NULL,
                label TEXT,
                uploaded_at TEXT NOT NULL,
                FOREIGN KEY(property_id) REFERENCES properties(id)
            );

            CREATE TABLE IF NOT EXISTS service_requests (
                id TEXT PRIMARY KEY,
                property_id TEXT,
                customer_id TEXT NOT NULL,
                service_type TEXT NOT NULL,
                description TEXT NOT NULL,
                budget_min REAL,
                budget_max REAL,
                preferred_timing TEXT,
                status TEXT NOT NULL DEFAULT 'new',
                photo_urls TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                FOREIGN KEY(property_id) REFERENCES properties(id),
                FOREIGN KEY(customer_id) REFERENCES customers(id)
            );

            CREATE TABLE IF NOT EXISTS quotes (
                id TEXT PRIMARY KEY,
                request_id TEXT,
                property_id TEXT NOT NULL,
                title TEXT NOT NULL,
                scope_summary TEXT NOT NULL,
                estimate_low REAL NOT NULL,
                estimate_high REAL NOT NULL,
                status TEXT NOT NULL DEFAULT 'draft',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                FOREIGN KEY(request_id) REFERENCES service_requests(id),
                FOREIGN KEY(property_id) REFERENCES properties(id)
            );

            CREATE TABLE IF NOT EXISTS jobs (
                id TEXT PRIMARY KEY,
                property_id TEXT NOT NULL,
                quote_id TEXT,
                service_type TEXT NOT NULL,
                scheduled_date TEXT,
                scheduled_start TEXT,
                scheduled_end TEXT,
                crew_name TEXT,
                status TEXT NOT NULL DEFAULT 'unscheduled',
                estimated_minutes INTEGER,
                route_zone TEXT,
                notes TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                FOREIGN KEY(property_id) REFERENCES properties(id),
                FOREIGN KEY(quote_id) REFERENCES quotes(id)
            );

            CREATE TABLE IF NOT EXISTS crew_feedback (
                id TEXT PRIMARY KEY,
                job_id TEXT NOT NULL,
                property_id TEXT NOT NULL,
                crew_name TEXT NOT NULL,
                actual_minutes INTEGER,
                completion_status TEXT NOT NULL,
                notes TEXT,
                issues TEXT,
                opportunities TEXT,
                photo_urls TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL,
                FOREIGN KEY(job_id) REFERENCES jobs(id),
                FOREIGN KEY(property_id) REFERENCES properties(id)
            );

            CREATE TABLE IF NOT EXISTS recommendations (
                id TEXT PRIMARY KEY,
                property_id TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                priority TEXT NOT NULL DEFAULT 'medium',
                status TEXT NOT NULL DEFAULT 'open',
                source TEXT NOT NULL DEFAULT 'manual',
                created_at TEXT NOT NULL,
                FOREIGN KEY(property_id) REFERENCES properties(id)
            );
            """
        )
        conn.commit()


@app.on_event("startup")
def on_startup() -> None:
    init_db()


# ---------- Schemas ----------

class CustomerCreate(BaseModel):
    full_name: str
    email: str | None = None
    phone: str | None = None


class PropertyCreate(BaseModel):
    customer_id: str
    address: str
    city: str = "Calgary"
    province: str = "AB"
    postal_code: str | None = None
    property_type: str = "residential"
    notes: str | None = None
    access_notes: str | None = None


class PropertyPhotoCreate(BaseModel):
    url: str
    label: str | None = None


class ServiceRequestCreate(BaseModel):
    customer_id: str
    property_id: str | None = None
    service_type: str = Field(examples=["lawn_care", "mulch", "cleanup", "flower_bed_design"])
    description: str
    budget_min: float | None = None
    budget_max: float | None = None
    preferred_timing: str | None = None
    photo_urls: list[str] = []


class ServiceRequestStatusUpdate(BaseModel):
    status: Literal["new", "scoping", "quoted", "scheduled", "completed", "lost"]


class QuoteCreate(BaseModel):
    request_id: str | None = None
    property_id: str
    title: str
    scope_summary: str
    estimate_low: float
    estimate_high: float
    status: Literal["draft", "sent", "approved", "rejected"] = "draft"


class QuoteStatusUpdate(BaseModel):
    status: Literal["draft", "sent", "approved", "rejected"]


class JobCreate(BaseModel):
    property_id: str
    quote_id: str | None = None
    service_type: str
    scheduled_date: str | None = Field(default=None, description="YYYY-MM-DD")
    scheduled_start: str | None = Field(default=None, description="HH:MM")
    scheduled_end: str | None = Field(default=None, description="HH:MM")
    crew_name: str | None = None
    status: Literal["unscheduled", "scheduled", "in_progress", "completed", "cancelled"] = "unscheduled"
    estimated_minutes: int | None = None
    route_zone: str | None = None
    notes: str | None = None


class JobStatusUpdate(BaseModel):
    status: Literal["unscheduled", "scheduled", "in_progress", "completed", "cancelled"]


class CrewFeedbackCreate(BaseModel):
    job_id: str
    crew_name: str
    actual_minutes: int | None = None
    completion_status: Literal["complete", "partial", "blocked", "needs_follow_up"]
    notes: str | None = None
    issues: str | None = None
    opportunities: str | None = None
    photo_urls: list[str] = []


class RecommendationCreate(BaseModel):
    title: str
    description: str | None = None
    priority: Literal["low", "medium", "high"] = "medium"
    source: Literal["manual", "crew", "ai", "seasonal"] = "manual"


# ---------- Basic helpers ----------

def require_row(conn: sqlite3.Connection, table: str, row_id: str) -> sqlite3.Row:
    row = conn.execute(f"SELECT * FROM {table} WHERE id = ?", (row_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail=f"{table[:-1].title()} not found")
    return row


# ---------- Endpoints ----------

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "greenline-property-backend"}


@app.post("/customers", status_code=201)
def create_customer(payload: CustomerCreate) -> dict[str, Any]:
    customer_id = new_id("cus")
    created_at = now_iso()
    with connect() as conn:
        conn.execute(
            "INSERT INTO customers (id, full_name, email, phone, created_at) VALUES (?, ?, ?, ?, ?)",
            (customer_id, payload.full_name, payload.email, payload.phone, created_at),
        )
        conn.commit()
        return row_to_dict(require_row(conn, "customers", customer_id))


@app.get("/customers")
def list_customers() -> list[dict[str, Any]]:
    with connect() as conn:
        rows = conn.execute("SELECT * FROM customers ORDER BY created_at DESC").fetchall()
        return [row_to_dict(row) for row in rows]


@app.post("/properties", status_code=201)
def create_property(payload: PropertyCreate) -> dict[str, Any]:
    property_id = new_id("prop")
    timestamp = now_iso()
    with connect() as conn:
        require_row(conn, "customers", payload.customer_id)
        conn.execute(
            """
            INSERT INTO properties
            (id, customer_id, address, city, province, postal_code, property_type, notes, access_notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                property_id,
                payload.customer_id,
                payload.address,
                payload.city,
                payload.province,
                payload.postal_code,
                payload.property_type,
                payload.notes,
                payload.access_notes,
                timestamp,
                timestamp,
            ),
        )
        conn.commit()
        return get_property_record(property_id)


@app.get("/properties")
def list_properties() -> list[dict[str, Any]]:
    with connect() as conn:
        rows = conn.execute(
            """
            SELECT p.*, c.full_name AS customer_name, c.email AS customer_email, c.phone AS customer_phone
            FROM properties p
            JOIN customers c ON c.id = p.customer_id
            ORDER BY p.created_at DESC
            """
        ).fetchall()
        return [row_to_dict(row) for row in rows]


@app.get("/properties/{property_id}")
def get_property_record(property_id: str) -> dict[str, Any]:
    with connect() as conn:
        property_row = conn.execute(
            """
            SELECT p.*, c.full_name AS customer_name, c.email AS customer_email, c.phone AS customer_phone
            FROM properties p
            JOIN customers c ON c.id = p.customer_id
            WHERE p.id = ?
            """,
            (property_id,),
        ).fetchone()
        if not property_row:
            raise HTTPException(status_code=404, detail="Property not found")

        photos = conn.execute("SELECT * FROM property_photos WHERE property_id = ? ORDER BY uploaded_at DESC", (property_id,)).fetchall()
        requests = conn.execute("SELECT * FROM service_requests WHERE property_id = ? ORDER BY created_at DESC", (property_id,)).fetchall()
        quotes = conn.execute("SELECT * FROM quotes WHERE property_id = ? ORDER BY created_at DESC", (property_id,)).fetchall()
        jobs = conn.execute("SELECT * FROM jobs WHERE property_id = ? ORDER BY scheduled_date DESC, created_at DESC", (property_id,)).fetchall()
        feedback = conn.execute("SELECT * FROM crew_feedback WHERE property_id = ? ORDER BY created_at DESC", (property_id,)).fetchall()
        recommendations = conn.execute("SELECT * FROM recommendations WHERE property_id = ? ORDER BY created_at DESC", (property_id,)).fetchall()

        return {
            "property": row_to_dict(property_row),
            "photos": [row_to_dict(row) for row in photos],
            "service_requests": [row_to_dict(row, ["photo_urls"]) for row in requests],
            "quotes": [row_to_dict(row) for row in quotes],
            "jobs": [row_to_dict(row) for row in jobs],
            "crew_feedback": [row_to_dict(row, ["photo_urls"]) for row in feedback],
            "recommendations": [row_to_dict(row) for row in recommendations],
        }


@app.post("/properties/{property_id}/photos", status_code=201)
def add_property_photo(property_id: str, payload: PropertyPhotoCreate) -> dict[str, Any]:
    photo_id = new_id("photo")
    with connect() as conn:
        require_row(conn, "properties", property_id)
        conn.execute(
            "INSERT INTO property_photos (id, property_id, url, label, uploaded_at) VALUES (?, ?, ?, ?, ?)",
            (photo_id, property_id, payload.url, payload.label, now_iso()),
        )
        conn.commit()
        return row_to_dict(require_row(conn, "property_photos", photo_id))


@app.post("/service-requests", status_code=201)
def create_service_request(payload: ServiceRequestCreate) -> dict[str, Any]:
    request_id = new_id("req")
    timestamp = now_iso()
    with connect() as conn:
        require_row(conn, "customers", payload.customer_id)
        if payload.property_id:
            require_row(conn, "properties", payload.property_id)
        conn.execute(
            """
            INSERT INTO service_requests
            (id, property_id, customer_id, service_type, description, budget_min, budget_max, preferred_timing, status, photo_urls, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)
            """,
            (
                request_id,
                payload.property_id,
                payload.customer_id,
                payload.service_type,
                payload.description,
                payload.budget_min,
                payload.budget_max,
                payload.preferred_timing,
                json.dumps(payload.photo_urls),
                timestamp,
                timestamp,
            ),
        )
        conn.commit()
        return row_to_dict(require_row(conn, "service_requests", request_id), ["photo_urls"])


@app.get("/service-requests")
def list_service_requests(status: str | None = None) -> list[dict[str, Any]]:
    with connect() as conn:
        if status:
            rows = conn.execute("SELECT * FROM service_requests WHERE status = ? ORDER BY created_at DESC", (status,)).fetchall()
        else:
            rows = conn.execute("SELECT * FROM service_requests ORDER BY created_at DESC").fetchall()
        return [row_to_dict(row, ["photo_urls"]) for row in rows]


@app.patch("/service-requests/{request_id}/status")
def update_service_request_status(request_id: str, payload: ServiceRequestStatusUpdate) -> dict[str, Any]:
    with connect() as conn:
        require_row(conn, "service_requests", request_id)
        conn.execute("UPDATE service_requests SET status = ?, updated_at = ? WHERE id = ?", (payload.status, now_iso(), request_id))
        conn.commit()
        return row_to_dict(require_row(conn, "service_requests", request_id), ["photo_urls"])


@app.post("/quotes", status_code=201)
def create_quote(payload: QuoteCreate) -> dict[str, Any]:
    quote_id = new_id("quote")
    timestamp = now_iso()
    with connect() as conn:
        require_row(conn, "properties", payload.property_id)
        if payload.request_id:
            require_row(conn, "service_requests", payload.request_id)
            conn.execute("UPDATE service_requests SET status = 'quoted', updated_at = ? WHERE id = ?", (timestamp, payload.request_id))
        conn.execute(
            """
            INSERT INTO quotes
            (id, request_id, property_id, title, scope_summary, estimate_low, estimate_high, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                quote_id,
                payload.request_id,
                payload.property_id,
                payload.title,
                payload.scope_summary,
                payload.estimate_low,
                payload.estimate_high,
                payload.status,
                timestamp,
                timestamp,
            ),
        )
        conn.commit()
        return row_to_dict(require_row(conn, "quotes", quote_id))


@app.patch("/quotes/{quote_id}/status")
def update_quote_status(quote_id: str, payload: QuoteStatusUpdate) -> dict[str, Any]:
    with connect() as conn:
        require_row(conn, "quotes", quote_id)
        conn.execute("UPDATE quotes SET status = ?, updated_at = ? WHERE id = ?", (payload.status, now_iso(), quote_id))
        conn.commit()
        return row_to_dict(require_row(conn, "quotes", quote_id))


@app.post("/jobs", status_code=201)
def create_job(payload: JobCreate) -> dict[str, Any]:
    job_id = new_id("job")
    timestamp = now_iso()
    with connect() as conn:
        require_row(conn, "properties", payload.property_id)
        if payload.quote_id:
            quote = require_row(conn, "quotes", payload.quote_id)
            if quote["status"] == "approved":
                conn.execute("UPDATE quotes SET updated_at = ? WHERE id = ?", (timestamp, payload.quote_id))
        conn.execute(
            """
            INSERT INTO jobs
            (id, property_id, quote_id, service_type, scheduled_date, scheduled_start, scheduled_end, crew_name, status,
             estimated_minutes, route_zone, notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                job_id,
                payload.property_id,
                payload.quote_id,
                payload.service_type,
                payload.scheduled_date,
                payload.scheduled_start,
                payload.scheduled_end,
                payload.crew_name,
                payload.status,
                payload.estimated_minutes,
                payload.route_zone,
                payload.notes,
                timestamp,
                timestamp,
            ),
        )
        conn.commit()
        return row_to_dict(require_row(conn, "jobs", job_id))


@app.get("/jobs")
def list_jobs(
    date_from: str | None = Query(default=None, description="YYYY-MM-DD"),
    date_to: str | None = Query(default=None, description="YYYY-MM-DD"),
    status: str | None = None,
) -> list[dict[str, Any]]:
    query = "SELECT * FROM jobs WHERE 1=1"
    params: list[Any] = []
    if date_from:
        query += " AND scheduled_date >= ?"
        params.append(date_from)
    if date_to:
        query += " AND scheduled_date <= ?"
        params.append(date_to)
    if status:
        query += " AND status = ?"
        params.append(status)
    query += " ORDER BY scheduled_date ASC, scheduled_start ASC, created_at DESC"
    with connect() as conn:
        rows = conn.execute(query, params).fetchall()
        return [row_to_dict(row) for row in rows]


@app.patch("/jobs/{job_id}/status")
def update_job_status(job_id: str, payload: JobStatusUpdate) -> dict[str, Any]:
    with connect() as conn:
        require_row(conn, "jobs", job_id)
        conn.execute("UPDATE jobs SET status = ?, updated_at = ? WHERE id = ?", (payload.status, now_iso(), job_id))
        conn.commit()
        return row_to_dict(require_row(conn, "jobs", job_id))


@app.post("/crew-feedback", status_code=201)
def create_crew_feedback(payload: CrewFeedbackCreate) -> dict[str, Any]:
    feedback_id = new_id("fb")
    timestamp = now_iso()
    with connect() as conn:
        job = require_row(conn, "jobs", payload.job_id)
        property_id = job["property_id"]
        conn.execute(
            """
            INSERT INTO crew_feedback
            (id, job_id, property_id, crew_name, actual_minutes, completion_status, notes, issues, opportunities, photo_urls, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                feedback_id,
                payload.job_id,
                property_id,
                payload.crew_name,
                payload.actual_minutes,
                payload.completion_status,
                payload.notes,
                payload.issues,
                payload.opportunities,
                json.dumps(payload.photo_urls),
                timestamp,
            ),
        )

        if payload.completion_status == "complete":
            conn.execute("UPDATE jobs SET status = 'completed', updated_at = ? WHERE id = ?", (timestamp, payload.job_id))

        if payload.opportunities:
            conn.execute(
                """
                INSERT INTO recommendations
                (id, property_id, title, description, priority, status, source, created_at)
                VALUES (?, ?, ?, ?, 'medium', 'open', 'crew', ?)
                """,
                (new_id("rec"), property_id, "Crew identified opportunity", payload.opportunities, timestamp),
            )

        conn.commit()
        return row_to_dict(require_row(conn, "crew_feedback", feedback_id), ["photo_urls"])


@app.post("/properties/{property_id}/recommendations", status_code=201)
def create_recommendation(property_id: str, payload: RecommendationCreate) -> dict[str, Any]:
    recommendation_id = new_id("rec")
    with connect() as conn:
        require_row(conn, "properties", property_id)
        conn.execute(
            """
            INSERT INTO recommendations
            (id, property_id, title, description, priority, status, source, created_at)
            VALUES (?, ?, ?, ?, ?, 'open', ?, ?)
            """,
            (recommendation_id, property_id, payload.title, payload.description, payload.priority, payload.source, now_iso()),
        )
        conn.commit()
        return row_to_dict(require_row(conn, "recommendations", recommendation_id))


@app.get("/planning/monday")
def monday_planning(week_start: str | None = Query(default=None, description="Monday date as YYYY-MM-DD")) -> dict[str, Any]:
    if week_start:
        start = date.fromisoformat(week_start)
    else:
        today = date.today()
        start = today - timedelta(days=today.weekday())
    end = start + timedelta(days=6)

    with connect() as conn:
        jobs = conn.execute(
            """
            SELECT j.*, p.address, p.city, c.full_name AS customer_name
            FROM jobs j
            JOIN properties p ON p.id = j.property_id
            JOIN customers c ON c.id = p.customer_id
            WHERE j.scheduled_date BETWEEN ? AND ?
            ORDER BY j.scheduled_date ASC, j.scheduled_start ASC
            """,
            (start.isoformat(), end.isoformat()),
        ).fetchall()

        unscheduled_jobs = conn.execute(
            """
            SELECT j.*, p.address, c.full_name AS customer_name
            FROM jobs j
            JOIN properties p ON p.id = j.property_id
            JOIN customers c ON c.id = p.customer_id
            WHERE j.status = 'unscheduled'
            ORDER BY j.created_at DESC
            """
        ).fetchall()

        open_requests = conn.execute(
            """
            SELECT r.*, c.full_name AS customer_name
            FROM service_requests r
            JOIN customers c ON c.id = r.customer_id
            WHERE r.status IN ('new', 'scoping')
            ORDER BY r.created_at ASC
            """
        ).fetchall()

        approved_quotes_without_jobs = conn.execute(
            """
            SELECT q.*, p.address, c.full_name AS customer_name
            FROM quotes q
            JOIN properties p ON p.id = q.property_id
            JOIN customers c ON c.id = p.customer_id
            LEFT JOIN jobs j ON j.quote_id = q.id
            WHERE q.status = 'approved' AND j.id IS NULL
            ORDER BY q.updated_at ASC
            """
        ).fetchall()

        open_recommendations = conn.execute(
            """
            SELECT r.*, p.address, c.full_name AS customer_name
            FROM recommendations r
            JOIN properties p ON p.id = r.property_id
            JOIN customers c ON c.id = p.customer_id
            WHERE r.status = 'open'
            ORDER BY CASE r.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END, r.created_at DESC
            """
        ).fetchall()

        scheduled_jobs = [row_to_dict(row) for row in jobs]
        risks: list[dict[str, Any]] = []
        production_by_day: dict[str, dict[str, Any]] = {}
        for job in scheduled_jobs:
            day = job.get("scheduled_date") or "unscheduled"
            production_by_day.setdefault(day, {"estimated_minutes": 0, "jobs": 0})
            production_by_day[day]["estimated_minutes"] += job.get("estimated_minutes") or 0
            production_by_day[day]["jobs"] += 1
            if not job.get("estimated_minutes"):
                risks.append({"type": "missing_estimate", "job_id": job["id"], "message": f"{job['service_type']} at {job['address']} has no estimated duration."})
            if not job.get("crew_name"):
                risks.append({"type": "missing_crew", "job_id": job["id"], "message": f"{job['service_type']} at {job['address']} has no crew assigned."})

        return {
            "week_start": start.isoformat(),
            "week_end": end.isoformat(),
            "summary": {
                "scheduled_jobs": len(scheduled_jobs),
                "unscheduled_jobs": len(unscheduled_jobs),
                "open_requests": len(open_requests),
                "approved_quotes_without_jobs": len(approved_quotes_without_jobs),
                "open_property_recommendations": len(open_recommendations),
                "risk_count": len(risks),
            },
            "production_by_day": production_by_day,
            "scheduled_jobs": scheduled_jobs,
            "unscheduled_jobs": [row_to_dict(row) for row in unscheduled_jobs],
            "open_requests": [row_to_dict(row, ["photo_urls"]) for row in open_requests],
            "approved_quotes_without_jobs": [row_to_dict(row) for row in approved_quotes_without_jobs],
            "open_recommendations": [row_to_dict(row) for row in open_recommendations],
            "risks": risks,
            "next_actions": [
                "Confirm scope for open service requests.",
                "Schedule approved quotes that do not have jobs yet.",
                "Assign crews and estimated durations to incomplete jobs.",
                "Review open property recommendations for upsell/follow-up opportunities.",
            ],
        }
