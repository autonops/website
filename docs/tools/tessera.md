# Tessera

AI-powered monolith to microservices transformation.

## Overview

Tessera intelligently decomposes monoliths into microservices:

- **AI-powered** service boundary detection using LLMs
- **Zero-data access** database analysis (metadata only)
- **Multi-language** support (Python, JavaScript, Ruby, Go, Java)
- **Domain-driven** decomposition using DDD principles
- **Confidence scoring** on all recommendations

## Commands

### Analyze

```bash
# Analyze monolith structure
infraiq tessera analyze \
  --source ./myapp \
  --heroku-app production \
  --output analysis.json

# With AI analysis
infraiq tessera analyze \
  --source . \
  --use-ai \
  --output analysis.json
```

### Design

```bash
# Design microservices architecture
infraiq tessera design \
  --analysis analysis.json \
  --pattern hybrid \
  --output mosaic.yaml

# Interactive mode
infraiq tessera design \
  --analysis analysis.json \
  --interactive \
  --output mosaic.yaml
```

### Craft

```bash
# Generate service scaffolds
infraiq tessera craft \
  --mosaic mosaic.yaml \
  --framework fastapi \
  --include-docker \
  --include-ci \
  --output ./services
```

### Validate

```bash
# Validate the architecture
infraiq tessera validate \
  --mosaic mosaic.yaml \
  --check dependencies,data,performance
```

## Decomposition Patterns

### Domain-Driven (DDD)

Identifies bounded contexts and aggregates:

```bash
infraiq tessera design --pattern domain
```

### Data-Driven

Based on database relationships and access patterns:

```bash
infraiq tessera design --pattern data
```

### Team-Oriented

Conway's Law alignment with team structure:

```bash
infraiq tessera design --pattern team
```

### Hybrid (Recommended)

Combines multiple strategies:

```bash
infraiq tessera design --pattern hybrid
```

## One-Command Migration + Transformation

```bash
infraiq migrate-and-transform \
  --heroku-app production \
  --target aws \
  --transform \
  --output ./migration
```

This single command:

1. Scans your Heroku app
2. Analyzes for microservices boundaries
3. Designs the service architecture
4. Generates migration plan
5. Creates service scaffolds
6. Produces Terraform/Kubernetes configs

## Generated Output

```
./services/
├── user-service/
│   ├── src/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── order-service/
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── k8s/
│   ├── user-service.yaml
│   └── order-service.yaml
└── docker-compose.yaml
```

## Next Steps

- [Monolith Decomposition Guide](../guides/monolith-decomposition.md)
- [MigrateIQ](migrateiq.md) — Combine with migration
