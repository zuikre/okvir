#!/usr/bin/env bash
# ==============================================================================
# OKVIR (إطار) - Official Installer Script for Linux and macOS
# The Open-Source Desktop Framework for Learning Data Science, Econometrics & AI
# Repository: https://github.com/zuikre/okvir
# ==============================================================================

set -euo pipefail

OKVIR_REPO="zuikre/okvir"
OKVIR_VERSION="${OKVIR_VERSION:-latest}"
INSTALL_DIR="${HOME}/.local/bin"
APP_DIR="${HOME}/.okvir"

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

# 4. Resolve Target Binary
if [ "${PLATFORM}" = "linux" ]; then
  ASSET_NAME="okvir-linux-${TARGET_ARCH}.AppImage"
  TARGET_PATH="${INSTALL_DIR}/okvir"
  DESKTOP_ENTRY_DIR="${HOME}/.local/share/applications"
elif [ "${PLATFORM}" = "macos" ]; then
  ASSET_NAME="Okvir-macOS-${TARGET_ARCH}.dmg"
  TARGET_PATH="/Applications/Okvir.app"
fi

echo "${BOLD}==> Fetching Okvir ${OKVIR_VERSION} (${ASSET_NAME})...${RESET}"

RELEASE_URL="https://github.com/${OKVIR_REPO}/releases/latest/download/${ASSET_NAME}"

TMP_DEST="$(mktemp -d)/${ASSET_NAME}"

# Attempt download with graceful local fallback if offline or release not yet tagged
if download_file "${RELEASE_URL}" "${TMP_DEST}" 2>/dev/null; then
  if [ "${PLATFORM}" = "linux" ]; then
    chmod +x "${TMP_DEST}"
    mv "${TMP_DEST}" "${TARGET_PATH}"
    echo "${GREEN}✔ Installed Okvir AppImage to ${TARGET_PATH}${RESET}"
  elif [ "${PLATFORM}" = "macos" ]; then
    hdiutil attach -nobrowse "${TMP_DEST}" -mountpoint /Volumes/OkvirInstall >/dev/null 2>&1
    cp -R "/Volumes/OkvirInstall/Okvir.app" /Applications/
    hdiutil detach /Volumes/OkvirInstall >/dev/null 2>&1
    echo "${GREEN}✔ Installed Okvir.app to /Applications/Okvir.app${RESET}"
  fi
else
  echo "${YELLOW}! GitHub Release artifact not found or host offline.${RESET}"
  echo "${YELLOW}! Installing portable CLI launcher script to ${INSTALL_DIR}/okvir...${RESET}"

  cat << 'LAUNCHER' > "${INSTALL_DIR}/okvir"
#!/usr/bin/env bash
# Okvir launcher script
if command -v npm >/dev/null 2>&1; then
  exec npx --yes okvir-cli "$@"
else
  echo "Please install Node.js 18+ or download the native AppImage / DMG from https://github.com/zuikre/okvir/releases"
  exit 1
fi
LAUNCHER
  chmod +x "${INSTALL_DIR}/okvir"
  echo "${GREEN}✔ Created launcher stub at ${INSTALL_DIR}/okvir${RESET}"
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
