# Deploy Guide: Vercel + Supabase

## 1) Supabase setup

1. Create Supabase project.
2. Open **SQL Editor** and run:
   - `database/schema.sql`
   - `database/sample_data.sql` (optional)
3. Copy Postgres connection string from project settings.

## 2) Backend on Vercel

- Root directory: `backend`
- The backend includes `vercel.json` and serverless entrypoint at `api/index.ts`.

Set env vars:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DB_SSL=true
CORS_ORIGIN=https://your-frontend.vercel.app
JWT_SECRET=replace_me
```

## 3) Frontend on Vercel

- Root directory: `frontend`

Set env vars:

```env
NEXT_PUBLIC_API_BASE=https://your-backend.vercel.app/api
```

## 4) Smoke checks

- `GET https://your-backend.vercel.app/api/dashboard`
- `GET https://your-backend.vercel.app/api/frictions`
- `GET https://your-backend.vercel.app/api/reports/export?from=2026-04-24&to=2026-04-24`
