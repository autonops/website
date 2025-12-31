# SecureIQ

Secret discovery and management for migrations.

## Overview

SecureIQ helps you manage secrets during migrations:

- **Discovers** all secrets without reading values
- **Classifies** secrets by type and criticality
- **Maps** dependencies between secrets and services
- **Generates** migration checklists
- **Validates** compliance requirements

## Commands

### Scan

```bash
# Discover secrets from infrastructure scan
infraiq secureiq scan \
  --provider heroku \
  --input scan.json \
  --output secrets.yaml
```

### Audit

```bash
# Check compliance requirements
infraiq secureiq audit \
  --manifest secrets.yaml \
  --framework soc2
```

### Checklist

```bash
# Generate migration checklist
infraiq secureiq checklist \
  --manifest secrets.yaml \
  --target aws \
  --output checklist.md
```

### Validate

```bash
# Validate migration readiness
infraiq secureiq validate \
  --manifest secrets.yaml \
  --migration-plan plan.json
```

## Secret Types

| Type | Examples |
|------|----------|
| Database | `DATABASE_URL`, `POSTGRES_PASSWORD` |
| API Keys | `STRIPE_API_KEY`, `SENDGRID_KEY` |
| OAuth | `GITHUB_CLIENT_SECRET` |
| Encryption | `SECRET_KEY_BASE`, `JWT_SECRET` |
| Service | `AWS_SECRET_ACCESS_KEY` |

## Privacy

!!! note "Zero Data Access"
    SecureIQ never reads secret values. It only analyzes metadata, variable names, and patterns to classify secrets.

## Next Steps

- [MigrateIQ](migrateiq.md) — Use with migrations
- [ComplyIQ](complyiq.md) — Compliance validation
