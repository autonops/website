#!/bin/bash
# InfraIQ Installer
# Usage: curl -sSL https://install.autonops.io | bash

set -e

VERSION="${INFRAIQ_VERSION:-latest}"
BASE_URL="https://install.autonops.io/releases"
INSTALL_DIR="${INFRAIQ_INSTALL_DIR:-/usr/local/bin}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() { echo -e "${GREEN}▸${NC} $1"; }
warn() { echo -e "${YELLOW}▸${NC} $1"; }
error() { echo -e "${RED}✗${NC} $1"; exit 1; }

# Detect OS and architecture
detect_platform() {
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)

    case "$OS" in
        darwin) OS="macos" ;;
        linux) OS="linux" ;;
        *) error "Unsupported OS: $OS" ;;
    esac

    case "$ARCH" in
        x86_64|amd64)
            if [ "$OS" = "macos" ]; then
                echo ""
                echo -e "${YELLOW}════════════════════════════════════════════════════════════${NC}"
                echo -e "${YELLOW}  Intel Mac Detected${NC}"
                echo -e "${YELLOW}════════════════════════════════════════════════════════════${NC}"
                echo ""
                echo "  Native binaries for Intel Macs are available on request."
                echo "  Please contact: jason@autonops.io"
                echo ""
                echo "  Alternatively, use Docker:"
                echo "    docker pull autonops/infraiq:latest"
                echo ""
                exit 0
            fi
            ARCH="x64"
            ;;
        arm64|aarch64) ARCH="arm64" ;;
        *) error "Unsupported architecture: $ARCH" ;;
    esac

    PLATFORM="${OS}-${ARCH}"
}

# Download and install
install_infraiq() {
    TARBALL="infraiq-${PLATFORM}.tar.gz"
    DOWNLOAD_URL="${BASE_URL}/${VERSION}/${TARBALL}"
    TMP_DIR=$(mktemp -d)

    info "Detected platform: ${PLATFORM}"
    info "Downloading InfraIQ ${VERSION}..."

    if ! curl -fsSL "$DOWNLOAD_URL" -o "${TMP_DIR}/${TARBALL}"; then
        error "Download failed. Check https://install.autonops.io for available versions."
    fi

    info "Extracting..."
    tar -xzf "${TMP_DIR}/${TARBALL}" -C "${TMP_DIR}"

    info "Installing to ${INSTALL_DIR}..."
    if [ -w "$INSTALL_DIR" ]; then
        mv "${TMP_DIR}/infraiq" "${INSTALL_DIR}/infraiq"
    else
        sudo mv "${TMP_DIR}/infraiq" "${INSTALL_DIR}/infraiq"
    fi

    chmod +x "${INSTALL_DIR}/infraiq"

    # Cleanup
    rm -rf "$TMP_DIR"

    info "Creating command aliases..."
    # Create symlinks for convenience commands
    for cmd in verify codify migrate complyiq dataiq secureiq tessera; do
        if [ -w "$INSTALL_DIR" ]; then
            ln -sf "${INSTALL_DIR}/infraiq" "${INSTALL_DIR}/${cmd}" 2>/dev/null || true
        else
            sudo ln -sf "${INSTALL_DIR}/infraiq" "${INSTALL_DIR}/${cmd}" 2>/dev/null || true
        fi
    done
}

# Verify installation
verify_install() {
    if command -v infraiq &> /dev/null; then
        echo ""
        echo -e "${GREEN}✓ InfraIQ installed successfully!${NC}"
        echo ""
        infraiq --version
        echo ""
        echo "Get started:"
        echo "  infraiq doctor        # Check system requirements"
        echo "  infraiq --help        # See all commands"
        echo ""
    else
        error "Installation failed. infraiq not found in PATH."
    fi
}

main() {
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║       InfraIQ Installer               ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""

    detect_platform
    install_infraiq
    verify_install
}

main
