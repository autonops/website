# Heroku to AWS Migration Guide

A complete walkthrough for migrating from Heroku to AWS.

## Overview

This guide covers migrating a typical Heroku application to AWS, including:

- Web dynos → ECS Fargate
- Postgres → Aurora
- Redis → ElastiCache
- Environment variables → Secrets Manager

**Estimated time:** 2-4 hours (vs. 2-3 months manually)

## Prerequisites

- [ ] AWS CLI configured
- [ ] Heroku CLI logged in
- [ ] Terraform installed
- [ ] InfraIQ installed

## Step 1: Scan Heroku

```bash
infraiq migrate scan heroku --app-name my-production-app --output scan.json
```

Review the scan results:

```bash
cat scan.json | jq '.services'
```

## Step 2: Map to AWS

```bash
infraiq migrate map scan.json aws --output migration-plan.json
```

Review service mappings:

```bash
cat migration-plan.json | jq '.mappings'
```

## Step 3: Generate Terraform

```bash
infraiq migrate generate migration-plan.json --output ./terraform
```

## Step 4: Configure Variables

Edit `terraform/terraform.tfvars`:

```hcl
# Database
db_password = "your-secure-password"

# Application secrets
environment_variables = {
  SECRET_KEY_BASE = "your-secret-key"
  # Copy from Heroku config vars
}
```

## Step 5: Deploy Infrastructure

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Step 6: Migrate Database

Use DataIQ for zero-downtime migration:

```bash
infraiq dataiq migrate \
  --source $HEROKU_DATABASE_URL \
  --target $AWS_DATABASE_URL \
  --strategy blue-green
```

## Step 7: Deploy Application

```bash
# Build and push Docker image
docker build -t my-app .
docker tag my-app:latest $ECR_REPO:latest
docker push $ECR_REPO:latest

# Update ECS service
aws ecs update-service --cluster my-cluster --service my-service --force-new-deployment
```

## Step 8: DNS Cutover

1. Update DNS to point to AWS load balancer
2. Monitor for errors
3. Scale down Heroku after validation

## Step 9: Validate

```bash
infraiq verify scan --provider aws --output post-migration.json
infraiq verify analyze post-migration.json
```

## Rollback Plan

If issues occur:

1. Switch DNS back to Heroku
2. Heroku app should still be running
3. Investigate and fix AWS issues
4. Retry cutover

## Cost Comparison

| Component | Heroku | AWS |
|-----------|--------|-----|
| 2x Standard-2X | $100/mo | ~$50/mo (Fargate) |
| Postgres Standard | $50/mo | ~$30/mo (RDS) |
| Redis Premium | $30/mo | ~$15/mo (ElastiCache) |
| **Total** | **$180/mo** | **~$95/mo** |

## Next Steps

- [VerifyIQ](../tools/verifyiq.md) — Ongoing security monitoring
- [ComplyIQ](../tools/complyiq.md) — SOC2 compliance
