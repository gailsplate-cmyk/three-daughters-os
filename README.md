# Three Daughters Website + Business Hub (Phase 0)

Lean Phase 0 build focused on immediate business value: a professional website plus a lightweight operations hub.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- GitHub for source control
- Vercel for deployment

## What Is Implemented

Customer-facing pages:

- Home
- About
- Services
- Contact
- Request Quote

Business-facing hub:

- Lead tracking
- Property records
- Customer records
- Quote management
- Scheduling view
- Invoice tracking

## Quote Intake Flow

- Quote form is live and submits through a server action.
- Submissions appear in the Business Hub lead list.
- New customer/property records are auto-created from new leads.

Note: Current data storage is in-memory for low-cost Phase 0 speed. Data resets when the server restarts.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deployment (Vercel)

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Deploy from the default branch.

## Recommended Next Upgrade (When Budget Allows)

1. Swap in-memory store for Supabase tables.
2. Add authentication for Business Hub.
3. Add Stripe payment links for invoices.
