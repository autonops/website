#!/bin/bash
# =============================================================================
# InfraIQ API Deploy Script
# Deploys to GCP Cloud Run via Artifact Registry
# =============================================================================

set -e  # Exit on any error

# Configuration
PROJECT_ID="intense-grove-451422-s6"
REGION="us-central1"
SERVICE_NAME="infraiq-api"
REGISTRY="us-central1-docker.pkg.dev"
REPOSITORY="infraiq-api"
IMAGE_NAME="api"

# Full image path
IMAGE_PATH="${REGISTRY}/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  InfraIQ API Deployment${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Step 1: Verify gcloud is configured
echo -e "${YELLOW}[1/5] Checking gcloud configuration...${NC}"
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null)
if [ "$CURRENT_PROJECT" != "$PROJECT_ID" ]; then
    echo "Setting project to $PROJECT_ID"
    gcloud config set project $PROJECT_ID
fi
echo -e "${GREEN}✓ Project: $PROJECT_ID${NC}"

# Step 2: Configure Docker for Artifact Registry
echo -e "${YELLOW}[2/5] Configuring Docker authentication...${NC}"
gcloud auth configure-docker $REGISTRY --quiet
echo -e "${GREEN}✓ Docker configured for Artifact Registry${NC}"

# Step 3: Build the image
echo -e "${YELLOW}[3/5] Building Docker image...${NC}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker build -t ${IMAGE_PATH}:${TIMESTAMP} -t ${IMAGE_PATH}:latest .
echo -e "${GREEN}✓ Image built: ${IMAGE_PATH}:${TIMESTAMP}${NC}"

# Step 4: Push to Artifact Registry
echo -e "${YELLOW}[4/5] Pushing image to Artifact Registry...${NC}"
docker push ${IMAGE_PATH}:${TIMESTAMP}
docker push ${IMAGE_PATH}:latest
echo -e "${GREEN}✓ Image pushed${NC}"

# Step 5: Update Cloud Run service
# Using 'update' instead of 'deploy' to preserve environment variables
echo -e "${YELLOW}[5/5] Updating Cloud Run service...${NC}"
gcloud run services update $SERVICE_NAME \
    --region $REGION \
    --image ${IMAGE_PATH}:${TIMESTAMP}
echo -e "${GREEN}✓ Cloud Run service updated${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Service URL: https://api.autonops.io"
echo "Health check: https://api.autonops.io/health"
echo "Image tag: ${TIMESTAMP}"
echo ""

# Optional: Show recent logs
read -p "View recent logs? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gcloud run services logs read $SERVICE_NAME --region $REGION --limit 20
fi
