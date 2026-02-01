# DataIQ

Zero-downtime database migrations.

## Overview

DataIQ handles complex database migrations with enterprise-grade reliability:

- **Self-healing** migration engine with automatic retry
- **Automated cutover** with health checks and rollback
- **Multi-master replication** support
- **Zero-downtime** strategies (Blue-Green, Canary, Rolling)
- **Cross-engine** migrations (PostgreSQL, MySQL, Oracle, MongoDB)

## Commands

### Discover

```bash
# Analyze source database
infraiq dataiq discover \
  --source postgresql://user:pass@host:5432/db \
  --output discovery.json
```

### Plan

```bash
# Create migration plan
infraiq dataiq plan \
  --assessment discovery.json \
  --target aurora-postgresql \
  --output migration-plan.json
```

### Migrate

```bash
# Execute migration with self-healing
infraiq dataiq migrate \
  --plan migration-plan.json \
  --self-heal \
  --auto-cutover
```

### Validate

```bash
# Validate data integrity
infraiq dataiq validate \
  --source postgresql://source \
  --target postgresql://target
```

## Migration Strategies

### Blue-Green

Two identical environments with instant cutover:

```bash
infraiq dataiq migrate \
  --plan migration-plan.json \
  --strategy blue-green
```

### Canary

Gradual traffic shift with monitoring:

```bash
infraiq dataiq migrate \
  --plan migration-plan.json \
  --strategy canary \
  --canary-percent 10
```

## Supported Databases

| Source | Target |
|--------|--------|
| PostgreSQL | Aurora PostgreSQL, RDS, Cloud SQL |
| MySQL | Aurora MySQL, RDS, Cloud SQL |
| Oracle | PostgreSQL (with transformation) |
| MongoDB | DocumentDB, Atlas |

## Next Steps

- [MigrateIQ](migrateiq.md) — Application migration
- [Heroku to AWS Guide](../guides/heroku-to-aws.md)
