# CLI Reference

Complete command-line reference for InfraIQ.

## Global Options

```bash
infraiq [OPTIONS] COMMAND [ARGS]
```

| Option | Description |
|--------|-------------|
| `--version` | Show version |
| `--help` | Show help |
| `--verbose` | Enable verbose output |
| `--format` | Output format (json, yaml, table) |

## Commands

### infraiq

```bash
# Show suite info
infraiq info

# Run diagnostics
infraiq doctor

# Combined migration + transformation
infraiq migrate-and-transform --heroku-app NAME --target aws
```

### migrate

```bash
# Scan source infrastructure
infraiq migrate scan PROVIDER [OPTIONS]
  --app-name NAME      Heroku app name
  --team NAME          Heroku team
  --region REGION      AWS/GCP region
  --output FILE        Output file

# Map to target provider
infraiq migrate map INPUT TARGET [OPTIONS]
  --preferences FILE   Custom mapping preferences
  --output FILE        Output file

# Generate Terraform
infraiq migrate generate INPUT [OPTIONS]
  --output DIR         Output directory
```

### verify

```bash
# Scan infrastructure
infraiq verify scan [OPTIONS]
  --provider NAME      Cloud provider
  --region REGION      Region(s) to scan
  --output FILE        Output file

# Analyze results
infraiq verify analyze INPUT [OPTIONS]
  --severity LEVELS    Filter by severity
  --category CATS      Filter by category

# Validate Terraform
infraiq verify validate DIR [OPTIONS]
  --rules FILE         Custom rules
```

### codify

```bash
# Scan existing resources
infraiq codify scan PROVIDER [OPTIONS]
  --region REGION      Region to scan
  --types TYPES        Resource types
  --output FILE        Output file

# Generate Terraform
infraiq codify generate INPUT [OPTIONS]
  --output DIR         Output directory
  --include-import     Generate import script
```

### complyiq

```bash
# Quick compliance check
infraiq complyiq quickscan [OPTIONS]
  --framework NAME     Compliance framework

# Full evidence collection
infraiq complyiq scan [OPTIONS]
  --provider NAME      Cloud provider
  --framework NAME     Compliance framework
  --bucket NAME        S3 bucket for evidence

# Export evidence package
infraiq complyiq export [OPTIONS]
  --bucket NAME        Source bucket
  --framework NAME     Framework
  --output FILE        Output zip file
```

### dataiq

```bash
# Discover database
infraiq dataiq discover [OPTIONS]
  --source URL         Source database URL
  --output FILE        Output file

# Plan migration
infraiq dataiq plan [OPTIONS]
  --assessment FILE    Discovery output
  --target TYPE        Target database type
  --output FILE        Output file

# Execute migration
infraiq dataiq migrate [OPTIONS]
  --plan FILE          Migration plan
  --strategy NAME      Migration strategy
  --self-heal          Enable self-healing
  --auto-cutover       Automatic cutover

# Validate migration
infraiq dataiq validate [OPTIONS]
  --source URL         Source database
  --target URL         Target database
```

### secureiq

```bash
# Scan for secrets
infraiq secureiq scan [OPTIONS]
  --provider NAME      Cloud provider
  --input FILE         Infrastructure scan
  --output FILE        Output file

# Audit compliance
infraiq secureiq audit [OPTIONS]
  --manifest FILE      Secrets manifest
  --framework NAME     Compliance framework

# Generate checklist
infraiq secureiq checklist [OPTIONS]
  --manifest FILE      Secrets manifest
  --target PROVIDER    Target provider
  --output FILE        Output file
```

### tessera

```bash
# Analyze monolith
infraiq tessera analyze [OPTIONS]
  --source DIR         Source directory
  --heroku-app NAME    Heroku app name
  --database-url URL   Database URL
  --use-ai             Enable AI analysis
  --output FILE        Output file

# Design microservices
infraiq tessera design [OPTIONS]
  --analysis FILE      Analysis output
  --pattern NAME       Decomposition pattern
  --target-services N  Target number of services
  --interactive        Interactive mode
  --output FILE        Output file

# Generate scaffolds
infraiq tessera craft [OPTIONS]
  --mosaic FILE        Design output
  --framework NAME     Web framework
  --include-docker     Include Dockerfiles
  --include-ci         Include CI configs
  --output DIR         Output directory

# Validate architecture
infraiq tessera validate [OPTIONS]
  --mosaic FILE        Design output
  --check CHECKS       Validation checks
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `INFRAIQ_TELEMETRY` | Enable/disable telemetry |
| `INFRAIQ_CONFIG` | Config file path |
| `AWS_REGION` | Default AWS region |
| `AWS_PROFILE` | AWS credentials profile |
| `HEROKU_API_KEY` | Heroku API key |
