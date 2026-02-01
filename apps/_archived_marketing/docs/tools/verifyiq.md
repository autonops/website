# VerifyIQ

Infrastructure verification and security scanning.

## Overview

VerifyIQ validates your infrastructure for:

- **Security** — Vulnerabilities and misconfigurations
- **Cost** — Optimization opportunities
- **Drift** — Differences between code and reality
- **Compliance** — Best practice adherence

## Commands

### Scan

```bash
# Scan AWS infrastructure
infraiq verify scan --provider aws --output report.json

# Scan specific regions
infraiq verify scan --provider aws --region us-east-1,us-west-2

# Scan Heroku
infraiq verify scan --provider heroku --output report.json
```

### Analyze

```bash
# View scan results
infraiq verify analyze report.json

# Filter by severity
infraiq verify analyze report.json --severity high,critical

# Filter by category
infraiq verify analyze report.json --category security
```

### Validate

```bash
# Validate Terraform configurations
infraiq verify validate ./terraform

# Validate with custom rules
infraiq verify validate ./terraform --rules ./custom-rules.yaml
```

## Scan Categories

### Security

- Public S3 buckets
- Open security groups
- Unencrypted databases
- Missing MFA
- Overly permissive IAM roles

### Cost

- Unused resources
- Oversized instances
- Missing reserved instances
- Unattached volumes

### Reliability

- Single AZ deployments
- Missing backups
- No auto-scaling
- Missing health checks

### Compliance

- SOC2 requirements
- HIPAA requirements
- PCI-DSS requirements

## Example Output

```json
{
  "summary": {
    "critical": 2,
    "high": 5,
    "medium": 12,
    "low": 8
  },
  "findings": [
    {
      "severity": "critical",
      "category": "security",
      "resource": "arn:aws:s3:::my-bucket",
      "title": "S3 bucket is publicly accessible",
      "description": "The bucket allows public read access",
      "remediation": "Remove public access in bucket policy"
    }
  ]
}
```

## Next Steps

- [ComplyIQ](complyiq.md) — Compliance automation
- [CodifyIQ](codifyiq.md) — Convert to IaC
