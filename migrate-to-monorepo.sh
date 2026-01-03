#!/bin/bash
# ==============================================================================
# Autonops Website Monorepo Migration Script
# ==============================================================================
# This script reorganizes the existing website repo into a monorepo structure.
# It preserves git history by using git mv.
#
# Usage:
#   cd ~/Documents/website-final   # or wherever your repo is
#   ./migrate-to-monorepo.sh
#
# What it does:
#   1. Creates new directory structure
#   2. Moves existing marketing files to apps/marketing/
#   3. Copies dashboard and API code (you provide these)
#   4. Creates shared design tokens
#   5. Sets up GitHub Actions workflows
#
# ==============================================================================

set -e  # Exit on error

echo "🚀 Starting monorepo migration..."
echo ""

# Check we're in a git repo
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run from the website repo root."
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📁 Creating directory structure..."

# Create new directories
mkdir -p apps/marketing
mkdir -p apps/dashboard
mkdir -p apps/api
mkdir -p packages/design-tokens
mkdir -p .github/workflows
mkdir -p scripts

echo "📦 Moving marketing files to apps/marketing/..."

# List of files/folders to move to apps/marketing/
# Using git mv to preserve history
MARKETING_FILES=(
    "index.html"
    "pricing.html"
    "security.html"
    "privacy.html"
    "install.html"
    "404.html"
    "favicon.ico"
    "favicon-16x16.png"
    "favicon-32x32.png"
    "apple-touch-icon.png"
    "robots.txt"
    "sitemap.xml"
    "mkdocs.yml"
    "requirements.txt"
    "docs"
    "site"
)

for file in "${MARKETING_FILES[@]}"; do
    if [ -e "$file" ]; then
        git mv "$file" "apps/marketing/" 2>/dev/null || mv "$file" "apps/marketing/"
        echo "  ✓ Moved $file"
    fi
done

echo ""
echo "📝 Creating package files..."

# Create design tokens package
cat > packages/design-tokens/tokens.css << 'EOF'
/* ==============================================================================
   Autonops Design Tokens
   ==============================================================================
   Single source of truth for design values.
   Import this file in both marketing and dashboard apps.
   ============================================================================== */

:root {
  /* Primary Colors */
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #3b82f6;
  --color-primary-foreground: #ffffff;
  
  /* Text Colors */
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  
  /* Background Colors */
  --color-bg: #ffffff;
  --color-bg-alt: #f9fafb;
  
  /* Border Colors */
  --color-border: #e5e7eb;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Card Colors */
  --color-card: #ffffff;
  
  /* Code Colors */
  --color-code-bg: #1f2937;
  --color-code-text: #e5e7eb;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-section: 80px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Font Family */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Courier New', monospace;
  
  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Dark Mode */
[data-theme="dark"] {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  
  --color-text: #f9fafb;
  --color-text-light: #9ca3af;
  
  --color-bg: #111827;
  --color-bg-alt: #1f2937;
  
  --color-border: #374151;
  
  --color-card: #1f2937;
  
  --color-code-bg: #0d1117;
}
EOF

cat > packages/design-tokens/tokens.json << 'EOF'
{
  "colors": {
    "primary": {
      "default": "#2563eb",
      "dark": "#1d4ed8",
      "light": "#3b82f6",
      "foreground": "#ffffff"
    },
    "text": {
      "default": "#1f2937",
      "light": "#6b7280"
    },
    "background": {
      "default": "#ffffff",
      "alt": "#f9fafb"
    },
    "border": {
      "default": "#e5e7eb"
    },
    "semantic": {
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444"
    },
    "dark": {
      "primary": "#3b82f6",
      "text": "#f9fafb",
      "textLight": "#9ca3af",
      "bg": "#111827",
      "bgAlt": "#1f2937",
      "border": "#374151"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "section": "80px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  },
  "fontFamily": {
    "sans": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
    "mono": "'SF Mono', Monaco, 'Courier New', monospace"
  },
  "fontSize": {
    "xs": "12px",
    "sm": "14px",
    "base": "16px",
    "lg": "18px",
    "xl": "24px",
    "2xl": "32px",
    "3xl": "48px"
  }
}
EOF

cat > packages/design-tokens/README.md << 'EOF'
# Autonops Design Tokens

Single source of truth for design values across all Autonops applications.

## Usage

### In HTML/CSS (Marketing Site)

```html
<link rel="stylesheet" href="/path/to/tokens.css">
```

Then use CSS variables:

```css
.button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
}
```

### In Tailwind (Dashboard)

Import the JSON tokens in `tailwind.config.ts`:

```typescript
import tokens from '../../packages/design-tokens/tokens.json'

export default {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary.default,
        // ...
      }
    }
  }
}
```

## Files

- `tokens.css` - CSS custom properties for direct use
- `tokens.json` - JSON format for programmatic use
EOF

echo "  ✓ Created design tokens package"

# Create root docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

# Autonops Development Environment
# Start everything: docker-compose up
# Start specific service: docker-compose up dashboard

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    container_name: autonops-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: infraiq
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # FastAPI Backend
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: autonops-api
    restart: unless-stopped
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/infraiq
      ENVIRONMENT: development
    ports:
      - "8000:8000"
    volumes:
      - ./apps/api:/app
    depends_on:
      db:
        condition: service_healthy
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  # Next.js Dashboard
  dashboard:
    build:
      context: ./apps/dashboard
      dockerfile: Dockerfile.dev
    container_name: autonops-dashboard
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    ports:
      - "3000:3000"
    volumes:
      - ./apps/dashboard:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      - api
    command: npm run dev

  # Marketing Site (optional, for preview)
  marketing:
    image: nginx:alpine
    container_name: autonops-marketing
    ports:
      - "8080:80"
    volumes:
      - ./apps/marketing:/usr/share/nginx/html:ro

volumes:
  postgres_data:

networks:
  default:
    name: autonops-network
EOF

echo "  ✓ Created docker-compose.yml"

# Create updated deploy.sh
cat > deploy.sh << 'EOF'
#!/bin/bash
# ==============================================================================
# Autonops Deployment Script
# ==============================================================================
# Deploy individual apps or everything at once.
#
# Usage:
#   ./deploy.sh marketing    # Deploy marketing site to GCP
#   ./deploy.sh dashboard    # Deploy dashboard to Vercel
#   ./deploy.sh api          # Deploy API to Cloud Run
#   ./deploy.sh docs         # Deploy documentation
#   ./deploy.sh all          # Deploy everything
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# GCP settings
GCP_PROJECT="intense-grove-451422-s6"
GCP_BUCKET="gs://autonops-website"
GCP_REGION="us-central1"

deploy_marketing() {
    echo -e "${YELLOW}📦 Deploying marketing site...${NC}"
    
    cd apps/marketing
    
    # Upload to GCP bucket
    gsutil -m cp -r \
        index.html \
        pricing.html \
        security.html \
        privacy.html \
        install.html \
        404.html \
        favicon.ico \
        favicon-16x16.png \
        favicon-32x32.png \
        apple-touch-icon.png \
        robots.txt \
        sitemap.xml \
        "$GCP_BUCKET/"
    
    # Clear CDN cache
    gcloud compute url-maps invalidate-cdn-cache autonops-url-map \
        --path="/*" \
        --global
    
    cd ../..
    
    echo -e "${GREEN}✓ Marketing site deployed to autonops.io${NC}"
}

deploy_docs() {
    echo -e "${YELLOW}📚 Deploying documentation...${NC}"
    
    cd apps/marketing
    
    # Build and deploy MkDocs
    mkdocs gh-deploy --force
    
    cd ../..
    
    echo -e "${GREEN}✓ Documentation deployed${NC}"
}

deploy_dashboard() {
    echo -e "${YELLOW}🖥️  Deploying dashboard...${NC}"
    
    cd apps/dashboard
    
    # Deploy to Vercel
    if command -v vercel &> /dev/null; then
        vercel --prod
    else
        echo -e "${RED}❌ Vercel CLI not installed. Run: npm i -g vercel${NC}"
        exit 1
    fi
    
    cd ../..
    
    echo -e "${GREEN}✓ Dashboard deployed to app.autonops.io${NC}"
}

deploy_api() {
    echo -e "${YELLOW}⚙️  Deploying API...${NC}"
    
    cd apps/api
    
    # Build and push Docker image
    docker build -t gcr.io/$GCP_PROJECT/infraiq-api .
    docker push gcr.io/$GCP_PROJECT/infraiq-api
    
    # Deploy to Cloud Run
    gcloud run deploy infraiq-api \
        --image gcr.io/$GCP_PROJECT/infraiq-api \
        --platform managed \
        --region $GCP_REGION \
        --allow-unauthenticated
    
    cd ../..
    
    echo -e "${GREEN}✓ API deployed to api.autonops.io${NC}"
}

deploy_all() {
    deploy_marketing
    deploy_docs
    deploy_api
    deploy_dashboard
}

# Main
case "${1:-}" in
    marketing)
        deploy_marketing
        ;;
    docs)
        deploy_docs
        ;;
    dashboard)
        deploy_dashboard
        ;;
    api)
        deploy_api
        ;;
    all)
        deploy_all
        ;;
    *)
        echo "Usage: $0 {marketing|docs|dashboard|api|all}"
        echo ""
        echo "  marketing  - Deploy marketing site to GCP bucket"
        echo "  docs       - Deploy documentation via MkDocs"
        echo "  dashboard  - Deploy Next.js dashboard to Vercel"
        echo "  api        - Deploy FastAPI to Cloud Run"
        echo "  all        - Deploy everything"
        exit 1
        ;;
esac
EOF

chmod +x deploy.sh
echo "  ✓ Created deploy.sh"

echo ""
echo "📋 Creating GitHub Actions workflows..."

# Marketing deploy workflow
cat > .github/workflows/deploy-marketing.yml << 'EOF'
name: Deploy Marketing Site

on:
  push:
    branches: [main]
    paths:
      - 'apps/marketing/**'
      - 'packages/design-tokens/**'
  workflow_dispatch:  # Allow manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2
        with:
          project_id: intense-grove-451422-s6

      - name: Deploy to GCP Bucket
        run: |
          cd apps/marketing
          gsutil -m cp -r \
            index.html \
            pricing.html \
            security.html \
            privacy.html \
            install.html \
            404.html \
            favicon.ico \
            favicon-16x16.png \
            favicon-32x32.png \
            apple-touch-icon.png \
            robots.txt \
            sitemap.xml \
            gs://autonops-website/

      - name: Invalidate CDN Cache
        run: |
          gcloud compute url-maps invalidate-cdn-cache autonops-url-map \
            --path="/*" \
            --global
EOF

# Dashboard deploy workflow
cat > .github/workflows/deploy-dashboard.yml << 'EOF'
name: Deploy Dashboard

on:
  push:
    branches: [main]
    paths:
      - 'apps/dashboard/**'
      - 'packages/design-tokens/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: apps/dashboard/package-lock.json

      - name: Install Dependencies
        working-directory: apps/dashboard
        run: npm ci

      - name: Build
        working-directory: apps/dashboard
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: https://api.autonops.io
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.CLERK_PUBLISHABLE_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/dashboard
          vercel-args: '--prod'
EOF

# API deploy workflow
cat > .github/workflows/deploy-api.yml << 'EOF'
name: Deploy API

on:
  push:
    branches: [main]
    paths:
      - 'apps/api/**'
  workflow_dispatch:

env:
  PROJECT_ID: intense-grove-451422-s6
  REGION: us-central1
  SERVICE: infraiq-api

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2
        with:
          project_id: ${{ env.PROJECT_ID }}

      - name: Configure Docker
        run: gcloud auth configure-docker

      - name: Build Docker Image
        working-directory: apps/api
        run: |
          docker build -t gcr.io/$PROJECT_ID/$SERVICE:${{ github.sha }} .
          docker tag gcr.io/$PROJECT_ID/$SERVICE:${{ github.sha }} gcr.io/$PROJECT_ID/$SERVICE:latest

      - name: Push Docker Image
        run: |
          docker push gcr.io/$PROJECT_ID/$SERVICE:${{ github.sha }}
          docker push gcr.io/$PROJECT_ID/$SERVICE:latest

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy $SERVICE \
            --image gcr.io/$PROJECT_ID/$SERVICE:${{ github.sha }} \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --set-env-vars="ENVIRONMENT=production"
EOF

# Docs deploy workflow
cat > .github/workflows/deploy-docs.yml << 'EOF'
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'apps/marketing/docs/**'
      - 'apps/marketing/mkdocs.yml'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Needed for gh-pages

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install Dependencies
        working-directory: apps/marketing
        run: pip install -r requirements.txt

      - name: Build and Deploy
        working-directory: apps/marketing
        run: mkdocs gh-deploy --force
EOF

echo "  ✓ Created GitHub Actions workflows"

echo ""
echo "📝 Creating root README..."

cat > README.md << 'EOF'
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
EOF

echo "  ✓ Created README.md"

# Create .gitignore additions
cat >> .gitignore << 'EOF'

# ==============================================================================
# Monorepo additions
# ==============================================================================

# Dependencies
node_modules/
.pnp/
.pnp.js

# Build outputs
.next/
out/
build/
dist/

# Environment files
.env
.env.local
.env.*.local
apps/api/.env
apps/dashboard/.env.local

# Python
__pycache__/
*.py[cod]
venv/
.venv/

# IDE
.idea/
.vscode/
*.swp
*.swo
.DS_Store

# Testing
coverage/
.coverage
.pytest_cache/

# Docker
docker-compose.override.yml

# Vercel
.vercel
EOF

echo "  ✓ Updated .gitignore"

echo ""
echo "=============================================="
echo -e "${GREEN}✅ Migration structure created!${NC}"
echo "=============================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Copy dashboard files:"
echo "   cp -r /path/to/infraiq-web/apps/web/* apps/dashboard/"
echo "   cp -r /path/to/infraiq-web/apps/api/* apps/api/"
echo ""
echo "2. Review changes:"
echo "   git status"
echo ""
echo "3. Commit the migration:"
echo "   git add ."
echo "   git commit -m 'refactor: migrate to monorepo structure'"
echo ""
echo "4. Set up GitHub secrets (see README.md)"
echo ""
echo "5. Push to trigger deployments:"
echo "   git push"
echo ""
EOF

chmod +x /home/claude/website-monorepo/scripts/migrate-to-monorepo.sh
