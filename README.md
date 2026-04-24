# DEV INTELLIGENCE SYSTEM

Production-ready internal platform to capture the invisible layer of software development: sessions, decisions, friction, confidence, and time distribution.

## Architecture

- **Frontend:** Next.js App Router + React + TailwindCSS + Recharts
- **Backend:** NestJS (REST API) + TypeORM (Vercel-compatible handler included)
- **Database:** PostgreSQL / Supabase Postgres
- **Auth:** JWT-ready module scaffolding
- **Export:** Server-side PDF generation via PDFKit

## Folder Structure

```
backend/            # NestJS API and domain logic
frontend/           # Next.js manager and developer UI
database/           # SQL schema + seed/sample data
docs/               # API and deployment docs
```

## Key Features Implemented

- Work Session System with structured reality, decisions, friction, confidence, energy, and proof attachments
- Decision Log for engineering reasoning and risk trail
- Friction Tracker for blocker classification and lost-time insights
- Dashboard with total focus/debug/blocked time, distribution, heatmap, and activity feed
- Team Analytics with per-developer confidence and blocked-time signals
- Report Export endpoint for PDF summaries (daily/weekly/custom)
- Smart rules:
  - Auto blocked flag when `blocked_time >= 60` minutes
  - Time distribution auto-aggregation
  - Confidence and blocker signals in dashboard analytics

## API Endpoints

All backend routes are served under `/api`.

- `POST /api/sessions`
- `GET /api/sessions`
- `POST /api/decisions`
- `GET /api/decisions`
- `POST /api/frictions`
- `GET /api/frictions`
- `GET /api/dashboard`
- `GET /api/reports/export?from=YYYY-MM-DD&to=YYYY-MM-DD`

## Local Run Instructions

### 0) Install PostgreSQL on macOS

```bash
brew update
brew install postgresql@16
brew services start postgresql@16
```

Verify installation:

```bash
psql --version
brew services list | rg postgresql
```

Create a default local superuser/database (if needed):

```bash
createuser -s postgres
createdb postgres
```

### 1) Database

```bash
createdb dev_intelligence
psql dev_intelligence -f database/schema.sql
psql dev_intelligence -f database/sample_data.sql
```

### 2) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### 3) Frontend

```bash
cd frontend
npm install
NEXT_PUBLIC_API_BASE=http://localhost:4000/api npm run dev
```

Open http://localhost:3000/dashboard.

## Deploy on Vercel + Supabase

### A) Create Supabase Postgres

1. Create a Supabase project.
2. Copy the **Transaction pooler** or direct Postgres connection string.
3. Set `DATABASE_URL` in backend environment variables.
4. Set `DB_SSL=true`.
5. Run SQL from `database/schema.sql` and optional `database/sample_data.sql` in Supabase SQL editor.

### B) Deploy Backend

You can deploy `backend/` as a Vercel project.

Required env vars for backend project:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DB_SSL=true
CORS_ORIGIN=https://your-frontend.vercel.app
JWT_SECRET=replace_me
```

### C) Deploy Frontend

Deploy `frontend/` as a separate Vercel project.

Set frontend env var:

```env
NEXT_PUBLIC_API_BASE=https://your-backend.vercel.app/api
```

## Sample Reporting URLs

- Weekly report:
  - `/api/reports/export?from=2026-04-17&to=2026-04-24`
- Daily report:
  - `/api/reports/export?from=2026-04-24&to=2026-04-24`
