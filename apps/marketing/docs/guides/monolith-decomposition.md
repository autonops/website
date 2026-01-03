# Monolith Decomposition Guide

Transform your monolith into microservices with Tessera.

## When to Decompose

Consider decomposition when:

- Team is growing and stepping on each other
- Deployments are slow and risky
- Scaling is difficult (all or nothing)
- Technology choices are locked in
- Testing takes too long

## The Process

### 1. Analyze

```bash
infraiq tessera analyze \
  --source . \
  --database-url $DATABASE_URL \
  --use-ai \
  --output analysis.json
```

### 2. Design

```bash
infraiq tessera design \
  --analysis analysis.json \
  --pattern hybrid \
  --target-services 5-7 \
  --output mosaic.yaml
```

### 3. Review

```bash
# Interactive review
infraiq tessera design \
  --analysis analysis.json \
  --interactive \
  --output mosaic-final.yaml
```

### 4. Generate

```bash
infraiq tessera craft \
  --mosaic mosaic-final.yaml \
  --framework fastapi \
  --include-docker \
  --include-ci \
  --output ./services
```

### 5. Validate

```bash
infraiq tessera validate \
  --mosaic mosaic-final.yaml \
  --check dependencies,data,performance
```

## Best Practices

1. **Start with domain analysis** — Understand your business domains
2. **Identify seams** — Look for natural boundaries
3. **Data first** — Plan data ownership before splitting
4. **Incremental** — Extract one service at a time
5. **Keep the monolith running** — Strangler fig pattern

## Next Steps

- [Tessera](../tools/tessera.md) — Full documentation
- [Heroku to AWS Guide](heroku-to-aws.md) — Combine with migration
