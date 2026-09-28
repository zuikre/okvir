#!/usr/bin/env bash
# ==============================================================================
# OKVIR (إطار) - Official Installer Script for Linux and macOS
# The Open-Source Desktop Framework for Learning Data Science, Econometrics & AI
# Repository: https://github.com/zuikre/okvir
# ==============================================================================

set -euo pipefail

OKVIR_REPO="zuikre/okvir"
OKVIR_VERSION="${OKVIR_VERSION:-latest}"
INSTALL_DIR="${INSTALL_DIR:-${HOME}/.local/bin}"
APP_DIR="${APP_DIR:-${HOME}/.okvir}"

# Text Styling
BOLD="$(tput bold 2>/dev/null || echo '')"
RESET="$(tput sgr0 2>/dev/null || echo '')"
CYAN="$(tput setaf 6 2>/dev/null || echo '')"
GREEN="$(tput setaf 2 2>/dev/null || echo '')"
YELLOW="$(tput setaf 3 2>/dev/null || echo '')"
RED="$(tput setaf 1 2>/dev/null || echo '')"

echo "${CYAN}"
cat << 'EOF'
  ╔══════════════════════════════════════════════════════╗
  ║    OKVIR (إطار) - The Framework for AI Education     ║
  ║       Zero Setup • Pure Intuition • 100% Local       ║
  ╚══════════════════════════════════════════════════════╝
EOF
echo "${RESET}"

# 1. Detect Operating System and CPU Architecture
OS="$(uname -s)"
ARCH="$(uname -m)"

case "${OS}" in
  Linux*)
    PLATFORM="linux"
    ;;
  Darwin*)
    PLATFORM="macos"
    ;;
  *)
    echo "${RED}Error: Unsupported operating system: ${OS}.${RESET}"
    echo "Okvir supports Linux (x86_64, aarch64) and macOS 12+ (Apple Silicon, Intel)."
    exit 1
    ;;
esac

case "${ARCH}" in
  x86_64|amd64)
    TARGET_ARCH="x86_64"
    ;;
  arm64|aarch64)
    TARGET_ARCH="aarch64"
    ;;
  *)
    echo "${RED}Error: Unsupported architecture: ${ARCH}.${RESET}"
    exit 1
    ;;
esac

echo "${BOLD}==> Detected Environment:${RESET} ${PLATFORM} (${TARGET_ARCH})"

# 2. Check for required downloader
if command -v curl >/dev/null 2>&1; then
  DOWNLOADER="curl"
elif command -v wget >/dev/null 2>&1; then
  DOWNLOADER="wget"
else
  echo "${RED}Error: Neither 'curl' nor 'wget' was found in your PATH.${RESET}"
  exit 1
fi

download_file() {
  local url="$1"
  local dest="$2"
  if [ "${DOWNLOADER}" = "curl" ]; then
    curl -fsSL "${url}" -o "${dest}"
  else
    wget -qO "${dest}" "${url}"
  fi
}

# 3. Create Installation Directories
mkdir -p "${INSTALL_DIR}"
mkdir -p "${APP_DIR}/cache"

echo "${BOLD}==> Preparing Target Directory:${RESET} ${INSTALL_DIR}"

# 4. Download and Install Native Desktop Application
echo "${BOLD}==> Fetching Okvir Native Desktop Application (${OKVIR_VERSION})...${RESET}"

INSTALLED=false

if [ "${PLATFORM}" = "linux" ]; then
  ARCH_SUFFIX="amd64"
  [ "${TARGET_ARCH}" = "aarch64" ] && ARCH_SUFFIX="arm64"

  TMP_DIR="$(mktemp -d)"

  echo "Downloading Linux desktop application..."
  if download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/OKVIR_1.0.1_${ARCH_SUFFIX}.AppImage" "${INSTALL_DIR}/okvir" 2>/dev/null || \
     download_file "https://github.com/${OKVIR_REPO}/releases/download/v1.0.1/OKVIR_1.0.1_${ARCH_SUFFIX}.AppImage" "${INSTALL_DIR}/okvir" 2>/dev/null || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/okvir-linux-${TARGET_ARCH}.tar.gz" "${TMP_DIR}/okvir.tar.gz" 2>/dev/null || \
     download_file "https://github.com/${OKVIR_REPO}/releases/download/v1.0.0/okvir-linux-${TARGET_ARCH}.tar.gz" "${TMP_DIR}/okvir.tar.gz" 2>/dev/null; then

    if [ -f "${TMP_DIR}/okvir.tar.gz" ]; then
      tar -xzf "${TMP_DIR}/okvir.tar.gz" -C "${TMP_DIR}"
      chmod +x "${TMP_DIR}/okvir"
      mv "${TMP_DIR}/okvir" "${INSTALL_DIR}/okvir"
    fi
    chmod +x "${INSTALL_DIR}/okvir"

    # Install FreeDesktop Application Shortcut & Icons
    mkdir -p "${HOME}/.local/share/applications"
    mkdir -p "${HOME}/.local/share/icons/hicolor/scalable/apps"
    mkdir -p "${HOME}/.local/share/pixmaps"

    [ -f "${TMP_DIR}/okvir.svg" ] && cp -f "${TMP_DIR}/okvir.svg" "${HOME}/.local/share/icons/hicolor/scalable/apps/okvir.svg"
    [ -f "${TMP_DIR}/okvir.png" ] && cp -f "${TMP_DIR}/okvir.png" "${HOME}/.local/share/pixmaps/okvir.png"
    [ -f "${TMP_DIR}/okvir.desktop" ] && cp -f "${TMP_DIR}/okvir.desktop" "${HOME}/.local/share/applications/okvir.desktop"

    update-desktop-database "${HOME}/.local/share/applications" >/dev/null 2>&1 || true
    rm -rf "${TMP_DIR}"
    INSTALLED=true
    echo "${GREEN}✔ Installed Native Desktop Executable to ${INSTALL_DIR}/okvir${RESET}"
  fi

elif [ "${PLATFORM}" = "macos" ]; then
  DMG_TMP="$(mktemp -d)/okvir.dmg"

  echo "Downloading macOS desktop disk image..."
  if download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/OKVIR_1.0.1_universal.dmg" "${DMG_TMP}" 2>/dev/null || \
     download_file "https://github.com/${OKVIR_REPO}/releases/download/v1.0.1/OKVIR_1.0.1_universal.dmg" "${DMG_TMP}" 2>/dev/null || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/Okvir-macOS-${TARGET_ARCH}.dmg" "${DMG_TMP}" 2>/dev/null || \
     download_file "https://github.com/${OKVIR_REPO}/releases/download/v1.0.0/Okvir-macOS-${TARGET_ARCH}.dmg" "${DMG_TMP}" 2>/dev/null; then
    hdiutil attach -nobrowse "${DMG_TMP}" -mountpoint /Volumes/OkvirInstall >/dev/null 2>&1
    cp -R "/Volumes/OkvirInstall/Okvir.app" /Applications/
    hdiutil detach /Volumes/OkvirInstall >/dev/null 2>&1
    ln -sf "/Applications/Okvir.app/Contents/MacOS/okvir" "${INSTALL_DIR}/okvir"
    rm -rf "$(dirname "${DMG_TMP}")"
    INSTALLED=true
    echo "${GREEN}✔ Installed Okvir.app to /Applications/Okvir.app${RESET}"
    echo "${GREEN}✔ Created symlink at ${INSTALL_DIR}/okvir${RESET}"
  fi
fi

if [ "${INSTALLED}" != "true" ]; then
  echo "${RED}Error: Could not download native desktop release for ${PLATFORM} (${TARGET_ARCH}).${RESET}"
  echo "Please download the desktop installer manually from:"
  echo "  https://github.com/${OKVIR_REPO}/releases"
  exit 1
fi

# 5. Verify PATH Configuration
if [[ ":${PATH}:" != *":${INSTALL_DIR}:"* ]]; then
  echo ""
  echo "${YELLOW}Notice: ${INSTALL_DIR} is not in your current PATH.${RESET}"
  echo "Add the following line to your ~/.bashrc or ~/.zshrc:"
  echo "  ${BOLD}export PATH=\"\$HOME/.local/bin:\$PATH\"${RESET}"
fi

echo ""
echo "${GREEN}${BOLD}✔ Okvir installation complete!${RESET}"
echo "Launch Okvir by running:"
echo "  ${CYAN}${BOLD}okvir${RESET}"
echo ""
echo "Star the project on GitHub: https://github.com/${OKVIR_REPO}"
