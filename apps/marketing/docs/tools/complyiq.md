# ComplyIQ

Continuous compliance automation.

## Overview

ComplyIQ automates compliance monitoring and evidence collection:

- **Monitors** infrastructure for SOC2, ISO27001, HIPAA compliance
- **Collects** evidence automatically for audits
- **Stores** in organized S3 structure with metadata
- **Exports** audit-ready evidence packages

## Commands

### Quick Scan

```bash
# Quick compliance check
infraiq complyiq quickscan

# Scan specific framework
infraiq complyiq quickscan --framework soc2
```

### Full Scan

```bash
# Full SOC2 evidence collection
infraiq complyiq scan \
  --provider aws \
  --framework soc2 \
  --bucket my-evidence-bucket

# HIPAA compliance
infraiq complyiq scan \
  --provider aws \
  --framework hipaa \
  --bucket my-evidence-bucket
```

### Export

```bash
# Export evidence package for auditors
infraiq complyiq export \
  --bucket my-evidence-bucket \
  --framework soc2 \
  --output evidence-package.zip
```

## Supported Frameworks

- **SOC2** — Type I and Type II
- **ISO27001** — Information security
- **HIPAA** — Healthcare data protection
- **PCI-DSS** — Payment card industry
- **GDPR** — Data privacy (EU)

## Evidence Categories

### SOC2

- Access control configurations
- Encryption settings
- Logging and monitoring
- Network security
- Change management

## Next Steps

- [VerifyIQ](verifyiq.md) — Security scanning
- [SOC2 Compliance Guide](../guides/soc2-compliance.md)
