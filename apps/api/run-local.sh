#!/bin/bash
# =============================================================================
# InfraIQ API Local Test Script
# Runs the API locally for testing before deployment
# =============================================================================

set -e

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting InfraIQ API locally...${NC}"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
pip install -q -r requirements.txt

# Set development environment
export ENVIRONMENT=development
export PORT=8000

echo ""
echo -e "${GREEN}API running at: http://localhost:8000${NC}"
echo -e "${GREEN}Docs at: http://localhost:8000/docs${NC}"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Run the API
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
