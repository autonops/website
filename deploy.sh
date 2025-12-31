#!/bin/bash
set -e

# Deploy Autonops website to GCP Cloud Storage
# Usage: ./deploy.sh

BUCKET="gs://autonops-website"

echo "🚀 Deploying Autonops website..."

# Build MkDocs documentation
echo "📚 Building documentation..."
pip install -r requirements.txt -q
mkdocs build --clean

# Upload static files (landing page, install page, 404)
echo "📄 Uploading static pages..."
gsutil -m cp index.html $BUCKET/
gsutil -m cp install.html $BUCKET/
gsutil -m cp 404.html $BUCKET/

# Upload documentation
echo "📖 Uploading documentation..."
gsutil -m rsync -r -d site/ $BUCKET/docs/

# Set cache headers
echo "⚡ Setting cache headers..."
gsutil -m setmeta -h "Cache-Control:public, max-age=3600" $BUCKET/*.html
gsutil -m setmeta -r -h "Cache-Control:public, max-age=3600" $BUCKET/docs/

# Invalidate CDN cache (optional - for immediate updates)
echo "🔄 Invalidating CDN cache..."
gcloud compute url-maps invalidate-cdn-cache autonops-url-map \
    --path="/*" \
    --global \
    --quiet || true

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Website: https://autonops.io"
echo "📚 Documentation: https://autonops.io/docs/"
echo "📥 Install page: https://autonops.io/install.html"
