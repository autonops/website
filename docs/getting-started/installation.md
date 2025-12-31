# Installation

## Quick Install

The fastest way to install InfraIQ:

```bash
curl -sSL https://install.autonops.io | bash
```

This script will:

1. Check for Python 3.9+ 
2. Install InfraIQ via pip
3. Download the wraith-daemon for telemetry
4. Configure your PATH

## Manual Installation

### Prerequisites

- **Python 3.9+** — Check with `python3 --version`
- **pip** — Usually included with Python
- **Git** — For cloning the repository

### Using pip

```bash
pip install infraiq
```

### From Source

```bash
# Clone the repository
git clone https://github.com/autonops/infraIQ.git
cd infraIQ

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install in editable mode
pip install -e .
```

## Verify Installation

After installation, verify everything is working:

```bash
# Check version
infraiq --version

# Run diagnostics
infraiq doctor

# See all available tools
infraiq info
```

Expected output from `infraiq info`:

```
🚀 InfraIQ Suite - Complete Infrastructure Management Platform
============================================================

📦 Available Tools:

  VerifyIQ        ✅ Installed     - Infrastructure verification
  CodifyIQ        ✅ Installed     - Infrastructure as Code
  MigrateIQ       ✅ Installed     - Cloud migration
  ComplyIQ        ✅ Installed     - Compliance automation
  DataIQ          ✅ Installed     - Database migration
  SecureIQ        ✅ Installed     - Secret management
  Tessera         ✅ Installed     - Microservices transformation
```

## Cloud Provider Setup

InfraIQ works with multiple cloud providers. Configure the ones you need:

### AWS

```bash
# Install AWS CLI
brew install awscli  # macOS
# or
pip install awscli

# Configure credentials
aws configure
```

### Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku  # macOS

# Login
heroku login
```

### Google Cloud

```bash
# Install gcloud CLI
brew install google-cloud-sdk  # macOS

# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Azure

```bash
# Install Azure CLI
brew install azure-cli  # macOS

# Login
az login
```

## Terraform Setup

InfraIQ generates Terraform configurations. Install Terraform to apply them:

```bash
# macOS
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Verify
terraform --version
```

## Telemetry

InfraIQ collects anonymous usage data to improve the product. No credentials, personal information, or infrastructure details are collected.

To opt out:

```bash
export INFRAIQ_TELEMETRY=false
```

Or add to your shell profile (`~/.bashrc`, `~/.zshrc`):

```bash
echo 'export INFRAIQ_TELEMETRY=false' >> ~/.zshrc
```

## Troubleshooting

### Python Version Issues

If you see errors about Python version:

```bash
# Check your Python version
python3 --version

# If < 3.9, install a newer version
brew install python@3.11  # macOS
```

### Permission Errors

If you get permission errors during installation:

```bash
# Use --user flag
pip install --user infraiq

# Or use a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
pip install infraiq
```

### Command Not Found

If `infraiq` command is not found after installation:

```bash
# Check if installed
pip show infraiq

# Add to PATH (if using --user install)
export PATH="$HOME/.local/bin:$PATH"
```

## Next Steps

- [Quick Start Guide](quickstart.md) — Your first migration in 5 minutes
- [Configuration](configuration.md) — Customize InfraIQ settings
- [Tools Overview](../tools/overview.md) — Learn about all 7 tools
