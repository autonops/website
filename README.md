# Autonops Website & Dashboard

Monorepo containing all Autonops web properties:

- **Marketing Site** (autonops.io) — Landing page, pricing, docs
- **Dashboard** (app.autonops.io) — Web UI for InfraIQ
- **API** (api.autonops.io) — Backend services

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

| App | URL | Hosting | Trigger |
|-----|-----|---------|---------|
| Marketing | autonops.io | GCP Cloud Storage | Push to `apps/marketing/` |
| Docs | autonops.io/docs | GitHub Pages | Push to `apps/marketing/docs/` |
| Dashboard | app.autonops.io | Vercel | Push to `apps/dashboard/` |
| API | api.autonops.io | Cloud Run | Push to `apps/api/` |

### Manual Deploy

```bash
./deploy.sh marketing    # Deploy marketing site
./deploy.sh docs         # Deploy documentation
./deploy.sh dashboard    # Deploy dashboard
./deploy.sh api          # Deploy API
./deploy.sh all          # Deploy everything
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
npm run dev
# Open http://localhost:3000
```

### API

```bash
cd apps/api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# Open http://localhost:8000/docs
```

## Design Tokens

Shared design values live in `packages/design-tokens/`:

- `tokens.css` — CSS variables for HTML pages
- `tokens.json` — JSON for Tailwind/programmatic use

When you update tokens, both marketing and dashboard apps will use them.

## GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `GCP_SA_KEY` | Service account JSON for GCP deployments |
| `VERCEL_TOKEN` | Vercel deployment token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `CLERK_PUBLISHABLE_KEY` | Clerk public key for dashboard |

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   autonops.io   │     │ app.autonops.io │     │ api.autonops.io │
│   (Marketing)   │     │   (Dashboard)   │     │     (API)       │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │                       │                       │
    GCP Bucket              Vercel                 Cloud Run
    + CDN + LB                                    + Cloud SQL
```

## Contact

**Jason Boykin**  
📧 jason@autonops.io  
🔗 [LinkedIn](https://linkedin.com/in/JasonBoykin2018)

---

© 2025 Autonops. All rights reserved.
