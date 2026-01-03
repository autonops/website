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
