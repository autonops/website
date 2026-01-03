# Contributing

Thank you for your interest in contributing to InfraIQ!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/autonops/infraIQ.git
cd infraIQ

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install in development mode
pip install -e ".[dev]"

# Run tests
pytest

# Run linting
black .
flake8 .
mypy .
```

## Code Style

- We use [Black](https://black.readthedocs.io/) for formatting
- We use [flake8](https://flake8.pycqa.org/) for linting
- We use [mypy](https://mypy.readthedocs.io/) for type checking
- All public functions should have docstrings

## Pull Request Process

1. Update documentation for any new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the CHANGELOG
5. Request review from maintainers

## Reporting Issues

Please use [GitHub Issues](https://github.com/autonops/infraIQ/issues) to report:

- Bugs
- Feature requests
- Documentation improvements

## Questions?

- Email: [jason@autonops.io](mailto:jason@autonops.io)
- GitHub: [@autonops](https://github.com/autonops)
