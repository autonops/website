# Autonops Website & Dashboard

Monorepo containing all Autonops web properties:

- **Marketing Site** (autonops.io) — Landing page, pricing, docs
- **Dashboard** (app.autonops.io) — Web UI for InfraIQ
- **API** (api.autonops.io) — Backend services for dashboard and CLI sync

## Quick Start

```bash
# Clone
git clone https://github.com/autonops/website.git
cd website

# Start everything locally
docker-compose up

# Or start individual services
docker-compose up marketing    # http://localhost:8080
docker-compose up api          # http://localhost:8000
docker-compose up dashboard    # http://localhost:3000
```

## Structure

```
website/
├── apps/
│   ├── marketing/        # Static HTML + MkDocs (→ autonops.io)
│   ├── dashboard/        # Next.js app (→ app.autonops.io)
│   └── api/              # FastAPI backend (→ api.autonops.io)
│
├── packages/
│   └── design-tokens/    # Shared colors, spacing, fonts
│
├── .github/workflows/    # CI/CD pipelines
├── docker-compose.yml    # Local development
└── deploy.sh             # Manual deployment script
```

## Deployments

All deployments are automated via GitHub Actions on push to `main`.

| App | URL | Hosting | Trigger |
|-----|-----|---------|---------|
| Marketing | autonops.io | GCP Cloud Storage + LB | Push to `apps/marketing/**` |
| Docs | autonops.io/docs | GitHub Pages | Push to `apps/marketing/docs/**` |
| Dashboard | app.autonops.io | Vercel | Push to `apps/dashboard/**` |
| API | api.autonops.io | Cloud Run + Cloud SQL | Push to `apps/api/**` |

### CI/CD Workflows

- `.github/workflows/deploy-marketing.yml` — Marketing site to GCP
- `.github/workflows/deploy-dashboard.yml` — Dashboard to Vercel
- `.github/workflows/deploy-api.yml` — API to Cloud Run (preserves env vars)
- `.github/workflows/deploy-docs.yml` — Docs to GitHub Pages

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   autonops.io   │     │ app.autonops.io │     │ api.autonops.io │
│   (Marketing)   │     │   (Dashboard)   │     │     (API)       │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
    GCP Bucket              Vercel                 Cloud Run
    + CDN + LB                 │                       │
                               │                       │
                               └───────────┬───────────┘
                                           │
                                      Cloud SQL
                                     (PostgreSQL)
```

## API Authentication

The API uses API key authentication via the `X-API-Key` header.

```bash
# Health check (no auth required)
curl https://api.autonops.io/health

# Authenticated request
curl -H "X-API-Key: $INFRAIQ_API_KEY" https://api.autonops.io/api/scans
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (public) |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/dashboard/recommendations` | Recommended actions |
| GET | `/api/scans` | List scans |
| POST | `/api/scans` | Create scan (CLI sync) |
| GET | `/api/scans/{id}` | Get scan details |
| DELETE | `/api/scans/{id}` | Delete scan |

### Syncing from CLI

```bash
# Sync scan results to dashboard
curl -X POST https://api.autonops.io/api/scans \
  -H "X-API-Key: $INFRAIQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "verify",
    "provider": "aws",
    "status": "completed",
    "summary": {
      "resources_scanned": 100,
      "issues_found": 5,
      "critical": 1,
      "high": 2,
      "medium": 1,
      "low": 1
    },
    "findings": []
  }'
```

## Development

### Marketing Site

```bash
cd apps/marketing
python3 -m http.server 8000
# Open http://localhost:8000
```

### Documentation

```bash
cd apps/marketing
pip install -r requirements.txt
mkdocs serve
# Open http://localhost:8000/docs/
```

### Dashboard

```bash
cd apps/dashboard
npm install
cp .env.example .env.local  # Configure env vars
npm run dev
# Open http://localhost:3000
```

### API

```bash
cd apps/api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql://user:pass@localhost/infraiq"
export ENVIRONMENT="development"
export INTERNAL_API_KEY="dev-key"

uvicorn main:app --reload
# Open http://localhost:8000/docs
```

## Environment Variables

### Dashboard (Vercel)

| Variable | Description |
|----------|-------------|
| `INFRAIQ_BACKEND_API_KEY` | API key for backend requests |
| `NEXT_PUBLIC_API_URL` | API base URL (https://api.autonops.io) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key (auth disabled) |
| `CLERK_SECRET_KEY` | Clerk secret key (auth disabled) |

### API (Cloud Run)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `ENVIRONMENT` | `production` or `development` |
| `INTERNAL_API_KEY` | API key for authentication |

## GCP Resources

| Resource | Name | Details |
|----------|------|---------|
| Project | intense-grove-451422-s6 | autonops-prod |
| Cloud Run | infraiq-api | us-central1 |
| Cloud SQL | infraiq-db | PostgreSQL 15, db-f1-micro |
| VPC Connector | infraiq-connector | 10.9.0.0/28 |
| Load Balancer | autonops-website-ip | 34.149.4.16 |
| Storage | autonops-website | Marketing site |

## Useful Commands

### API Deployment (Manual)

```bash
# Safe update (preserves env vars)
gcloud run services update infraiq-api \
  --region=us-central1 \
  --project=intense-grove-451422-s6 \
  --image=gcr.io/intense-grove-451422-s6/infraiq-api:latest

# Check env vars
gcloud run services describe infraiq-api \
  --region=us-central1 \
  --project=intense-grove-451422-s6 \
  --format="yaml(spec.template.spec.containers[0].env)"
```

### Database

```bash
# Connect to Cloud SQL (via proxy)
gcloud sql connect infraiq-db --user=infraiq --database=infraiq

# Check connection from API
curl https://api.autonops.io/health
```

### CDN Cache

```bash
# Purge marketing site cache
gcloud compute url-maps invalidate-cdn-cache autonops-url-map \
  --path="/*" --global
```

## Contact

**Jason Boykin**  
📧 jason@autonops.io  
🔗 [LinkedIn](https://linkedin.com/in/JasonBoykin2018)

---

© 2025 Autonops. All rights reserved.
