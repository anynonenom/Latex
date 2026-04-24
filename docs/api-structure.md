# API Structure

Base URL prefix: `/api`

## Sessions
- `POST /api/sessions`
- `GET /api/sessions`

## Decisions
- `POST /api/decisions`
- `GET /api/decisions`

## Frictions
- `POST /api/frictions`
- `GET /api/frictions`

## Dashboard
- `GET /api/dashboard`

Returns:
- totals
- workDistribution
- activityFeed
- heatmap
- teamAnalytics
- topFrictions

## Reports
- `GET /api/reports/export?from=YYYY-MM-DD&to=YYYY-MM-DD`

Returns downloadable PDF.
