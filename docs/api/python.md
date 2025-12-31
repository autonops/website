# Python API

Use InfraIQ programmatically in your Python applications.

## Installation

```bash
pip install infraiq
```

## Quick Start

```python
from infraiq import MigrateIQ, VerifyIQ

# Scan Heroku app
migrate = MigrateIQ()
scan_result = migrate.scan_heroku("my-app")

# Map to AWS
plan = migrate.map_to_aws(scan_result)

# Generate Terraform
migrate.generate_terraform(plan, output_dir="./terraform")
```

## MigrateIQ

```python
from infraiq import MigrateIQ

migrate = MigrateIQ()

# Scan
result = migrate.scan_heroku(app_name="my-app")
result = migrate.scan_aws(region="us-east-1")

# Map
plan = migrate.map_to_aws(result, preferences={})
plan = migrate.map_to_gcp(result)

# Generate
migrate.generate_terraform(plan, output_dir="./terraform")
```

## VerifyIQ

```python
from infraiq import VerifyIQ

verify = VerifyIQ()

# Scan
report = verify.scan_aws(region="us-east-1")

# Filter findings
critical = report.filter(severity="critical")
security = report.filter(category="security")

# Export
report.to_json("report.json")
```

## CodifyIQ

```python
from infraiq import CodifyIQ

codify = CodifyIQ()

# Discover resources
resources = codify.scan_aws(region="us-east-1")

# Generate Terraform
codify.generate_terraform(resources, output_dir="./terraform")
```

## Tessera

```python
from infraiq import Tessera

tessera = Tessera()

# Analyze
analysis = tessera.analyze(
    source_dir="./myapp",
    use_ai=True
)

# Design
mosaic = tessera.design(
    analysis,
    pattern="hybrid",
    target_services=5
)

# Generate
tessera.craft(
    mosaic,
    framework="fastapi",
    output_dir="./services"
)
```

## Error Handling

```python
from infraiq import MigrateIQ
from infraiq.exceptions import (
    ScanError,
    ValidationError,
    ProviderError
)

migrate = MigrateIQ()

try:
    result = migrate.scan_heroku("my-app")
except ProviderError as e:
    print(f"Provider error: {e}")
except ScanError as e:
    print(f"Scan failed: {e}")
```

## Configuration

```python
from infraiq import Config

# Load from file
config = Config.from_file("~/.infraiq/config.yaml")

# Or configure programmatically
config = Config(
    aws_region="us-east-1",
    output_format="json",
    telemetry=False
)
```

## Next Steps

- [CLI Reference](cli.md) — Command-line usage
- [Configuration](../getting-started/configuration.md) — Configuration options
