# Quick Start

Get up and running with InfraIQ in 5 minutes.

## Your First Migration

Let's migrate a Heroku app to AWS. This example walks through the complete workflow.

### Step 1: Scan Your Heroku App

```bash
infraiq migrate scan heroku --app-name my-production-app --output scan.json
```

This discovers:

- Web dynos and workers
- Add-ons (Postgres, Redis, etc.)
- Environment variables
- Connected services

### Step 2: Map to AWS Services

```bash
infraiq migrate map scan.json aws --output migration-plan.json
```

InfraIQ intelligently maps Heroku services to AWS equivalents:

| Heroku | AWS |
|--------|-----|
| Web Dyno | ECS Fargate / App Runner |
| Postgres | RDS Aurora |
| Redis | ElastiCache |
| Worker | ECS Task |
| Scheduler | EventBridge + Lambda |

### Step 3: Generate Terraform

```bash
infraiq migrate generate migration-plan.json --output ./terraform
```

This creates production-ready Terraform including:

- VPC with public/private subnets
- ECS cluster and services
- RDS database
- Security groups
- IAM roles
- Load balancer

### Step 4: Review and Apply

```bash
cd terraform

# Review the plan
terraform init
terraform plan

# Apply when ready
terraform apply
```

## Other Quick Examples

### Verify Infrastructure Security

```bash
# Scan AWS for security issues
infraiq verify scan --provider aws --output report.json

# View the report
infraiq verify analyze report.json
```

### Codify Existing Infrastructure

```bash
# Discover manually-created resources
infraiq codify scan aws --region us-east-1 --output scan.json

# Generate Terraform for them
infraiq codify generate scan.json --output ./terraform

# Import into Terraform state
cd terraform && ./import.sh
```

### SOC2 Evidence Collection

```bash
# Quick compliance scan
infraiq complyiq quickscan

# Full SOC2 evidence collection
infraiq complyiq scan --provider aws --framework soc2 --bucket my-evidence-bucket
```

### Analyze a Monolith

```bash
# Analyze codebase for service boundaries
infraiq tessera analyze --source . --output analysis.json

# Design microservices architecture
infraiq tessera design --analysis analysis.json --pattern hybrid --output mosaic.yaml

# Generate service scaffolds
infraiq tessera craft --mosaic mosaic.yaml --framework fastapi --output ./services
```

## Unified Workflow

The real power comes from combining tools. Here's a complete modernization workflow:

```bash
# 1. Verify current state
infraiq verify scan --provider heroku --output current-state.json

# 2. Analyze monolith structure  
infraiq tessera analyze --source . --output tessera-analysis.json

# 3. Design microservices
infraiq tessera design --analysis tessera-analysis.json --output mosaic.yaml

# 4. Discover secrets
infraiq secureiq scan --provider heroku --input current-state.json --output secrets.yaml

# 5. Plan migration with transformation
infraiq migrate map current-state.json aws \
  --tessera-mosaic mosaic.yaml \
  --secrets-manifest secrets.yaml \
  --output migration-plan.json

# 6. Generate everything
infraiq tessera craft --mosaic mosaic.yaml --output ./services
infraiq migrate generate migration-plan.json --output ./infrastructure

# 7. Deploy
cd infrastructure && terraform apply
```

## Next Steps

- [MigrateIQ](../tools/migrateiq.md) — Deep dive into migration capabilities
- [VerifyIQ](../tools/verifyiq.md) — Security and compliance scanning
- [Tessera](../tools/tessera.md) — Monolith decomposition guide
- [Heroku to AWS Guide](../guides/heroku-to-aws.md) — Complete migration walkthrough
