#!/usr/bin/env bash
# ==============================================================================
# OKVIR - Official Installer Script for Linux and macOS
# The Open-Source Desktop Framework for Learning Data Science, Econometrics & AI
# Repository: https://github.com/zuikre/okvir
# ==============================================================================

set -euo pipefail

OKVIR_REPO="zuikre/okvir"
OKVIR_VERSION="${OKVIR_VERSION:-latest}"
INSTALL_DIR="${INSTALL_DIR:-${HOME}/.local/bin}"
APP_DIR="${APP_DIR:-${HOME}/.okvir}"

show_help() {
  cat << EOF
OKVIR Official Installer (Linux & macOS)
The Framework for AI Education: Zero Setup • Pure Intuition • 100% Local

USAGE:
  curl -fsSL https://raw.githubusercontent.com/zuikre/okvir/main/install.sh | bash [options]
  ./install.sh [options]

OPTIONS:
  -v, --version <version>   Install a specific release version (e.g. 1.0.2, default: latest)
  -d, --dir <directory>     Custom binary install directory (default: ~/.local/bin)
  -h, --help                Show this installer help guide and exit

ENVIRONMENT VARIABLES:
  OKVIR_VERSION             Target version (default: latest)
  INSTALL_DIR               Target binary installation directory (default: ~/.local/bin)
  APP_DIR                   Application data directory (default: ~/.okvir)

AFTER INSTALLATION:
  Run 'okvir --help' in your terminal for full CLI commands, authoring tools, and diagnostics.

Repository: https://github.com/zuikre/okvir
Author:     Zakarya Roubhi <roubhizakarya@gmail.com>
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      show_help
      exit 0
      ;;
    -v|--version)
      OKVIR_VERSION="$2"
      shift 2
      ;;
    -d|--dir)
      INSTALL_DIR="$2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

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
  ║        OKVIR - The Framework for AI Education        ║
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
    if curl -fsIL "${url}" >/dev/null 2>&1; then
      if [ -t 2 ] || [ -t 1 ]; then
        curl -fL --progress-bar "${url}" -o "${dest}"
      else
        curl -fsSL "${url}" -o "${dest}"
      fi
      return 0
    fi
    return 1
  else
    if wget --spider -q "${url}" 2>/dev/null; then
      if [ -t 2 ] || [ -t 1 ]; then
        wget --show-progress -qO "${dest}" "${url}"
      else
        wget -qO "${dest}" "${url}"
      fi
      return 0
    fi
    return 1
  fi
}

echo "${CYAN}${BOLD}==> [1/5] Verifying System Architecture & Downloader...${RESET}"
echo "    • Operating System: ${PLATFORM}"
echo "    • Architecture:     ${TARGET_ARCH}"
echo "    • Downloader:       ${DOWNLOADER}"

# 3. Create Installation Directories
echo ""
echo "${CYAN}${BOLD}==> [2/5] Preparing Target Directories...${RESET}"
echo "    • Binary Directory: ${INSTALL_DIR}"
echo "    • Cache Directory:  ${APP_DIR}/cache"
mkdir -p "${INSTALL_DIR}"
mkdir -p "${APP_DIR}/cache"

# 4. Resolve GitHub Release Version
echo ""
echo "${CYAN}${BOLD}==> [3/5] Resolving Latest Release Version from GitHub (${OKVIR_REPO})...${RESET}"
RESOLVED_VERSION=""
if [ "${OKVIR_VERSION}" = "latest" ]; then
  LATEST_API_JSON="$(curl -fsSL -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/${OKVIR_REPO}/releases/latest" 2>/dev/null || true)"
  if [ -n "${LATEST_API_JSON}" ]; then
    RESOLVED_TAG="$(echo "${LATEST_API_JSON}" | grep '"tag_name":' | head -n1 | sed -E 's/.*"tag_name": *"([^"]+)".*/\1/')"
    RESOLVED_VERSION="${RESOLVED_TAG#v}"
  fi
  # Fallback to current repository package version if rate-limited or offline
  if [ -z "${RESOLVED_VERSION}" ]; then
    RESOLVED_VERSION="1.0.4"
  fi
else
  RESOLVED_VERSION="${OKVIR_VERSION#v}"
fi
echo "    • Resolved Target Version: v${RESOLVED_VERSION}"

echo ""
echo "${CYAN}${BOLD}==> [4/5] Downloading Native Okvir Desktop Engine (v${RESOLVED_VERSION})...${RESET}"

INSTALLED=false

if [ "${PLATFORM}" = "linux" ]; then
  ARCH_SUFFIX="amd64"
  [ "${TARGET_ARCH}" = "aarch64" ] && ARCH_SUFFIX="arm64"

  TMP_DIR="$(mktemp -d)"

  echo "    • Fetching Linux bundle for ${ARCH_SUFFIX} (~85 MB desktop binary, please wait)..."
  DESKTOP_TARGET="${APP_DIR}/okvir.AppImage"
  mkdir -p "${APP_DIR}/bin"

  if download_file "https://github.com/${OKVIR_REPO}/releases/download/v${RESOLVED_VERSION}/OKVIR_${RESOLVED_VERSION}_${ARCH_SUFFIX}.AppImage" "${DESKTOP_TARGET}" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/OKVIR_${RESOLVED_VERSION}_${ARCH_SUFFIX}.AppImage" "${DESKTOP_TARGET}" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/download/v${RESOLVED_VERSION}/okvir-linux-${TARGET_ARCH}.tar.gz" "${TMP_DIR}/okvir.tar.gz" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/okvir-linux-${TARGET_ARCH}.tar.gz" "${TMP_DIR}/okvir.tar.gz" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/okvir" "${DESKTOP_TARGET}"; then

    if [ -f "${TMP_DIR}/okvir.tar.gz" ]; then
      tar -xzf "${TMP_DIR}/okvir.tar.gz" -C "${TMP_DIR}"
      chmod +x "${TMP_DIR}/okvir"
      mv "${TMP_DIR}/okvir" "${DESKTOP_TARGET}"
    fi
    chmod +x "${DESKTOP_TARGET}"
    ln -sf "${DESKTOP_TARGET}" "${INSTALL_DIR}/okvir-desktop"

    # Install Framework CLI script and Node module descriptor to ~/.okvir
    if [ -f "${TMP_DIR}/okvir.js" ]; then
      cp -f "${TMP_DIR}/okvir.js" "${APP_DIR}/bin/okvir.js"
    else
      download_file "https://raw.githubusercontent.com/${OKVIR_REPO}/main/bin/okvir.js" "${APP_DIR}/bin/okvir.js" 2>/dev/null || true
    fi
    chmod +x "${APP_DIR}/bin/okvir.js" 2>/dev/null || true
    echo '{"type": "module"}' > "${APP_DIR}/package.json" 2>/dev/null || true

    # Create the unified CLI & desktop launcher at ${INSTALL_DIR}/okvir
    cat << 'LAUNCHER_EOF' > "${INSTALL_DIR}/okvir"
#!/usr/bin/env bash
# ==============================================================================
# OKVIR Unified CLI & Desktop Launcher
# Author: Zakarya Roubhi <roubhizakarya@gmail.com>
# ==============================================================================

APP_DIR="${OKVIR_APP_DIR:-${HOME}/.okvir}"
DESKTOP_APP="${APP_DIR}/okvir.AppImage"
[ ! -f "${DESKTOP_APP}" ] && DESKTOP_APP="${HOME}/.local/bin/okvir-desktop"
CLI_SCRIPT="${APP_DIR}/bin/okvir.js"
[ -f "bin/okvir.js" ] && CLI_SCRIPT="bin/okvir.js"

# 1. Desktop GUI Launch (default when no arguments, or explicit 'open' / 'app')
if [ $# -eq 0 ] || [ "$1" = "open" ] || [ "$1" = "app" ] || [ "$1" = "--app" ] || [ "$1" = "--gui" ] || [ "$1" = "--desktop" ]; then
  if [ -x "${DESKTOP_APP}" ]; then
    if [ "$1" = "open" ]; then
      nohup "${DESKTOP_APP}" >/dev/null 2>&1 &
      echo "✔ Launched Okvir Desktop Application in background."
      exit 0
    else
      exec "${DESKTOP_APP}" "$@"
    fi
  fi
fi

# 2. CLI Dispatch (version, update, doctor, rate, test, dev, init, etc.)
if command -v node >/dev/null 2>&1 && [ -f "${CLI_SCRIPT}" ]; then
  exec node "${CLI_SCRIPT}" "$@"
fi

# 3. Fallback to desktop binary
if [ -x "${DESKTOP_APP}" ]; then
  exec "${DESKTOP_APP}" "$@"
fi

echo "Error: Could not find Okvir desktop application or CLI runtime."
exit 1
LAUNCHER_EOF
    chmod +x "${INSTALL_DIR}/okvir"

    echo ""
    echo "${CYAN}${BOLD}==> [5/5] Integrating System Launcher & Application Shortcuts...${RESET}"
    echo "    • Installing FreeDesktop desktop entry (.desktop)"
    echo "    • Installing high-resolution SVG and PNG icons"
    echo "    • Configuring unified CLI & desktop launcher at ${INSTALL_DIR}/okvir"

    # Install FreeDesktop Application Shortcut & Icons
    mkdir -p "${HOME}/.local/share/applications"
    mkdir -p "${HOME}/.local/share/icons/hicolor/scalable/apps"
    mkdir -p "${HOME}/.local/share/pixmaps"

    [ -f "${TMP_DIR}/okvir.svg" ] && cp -f "${TMP_DIR}/okvir.svg" "${HOME}/.local/share/icons/hicolor/scalable/apps/okvir.svg"
    [ -f "${TMP_DIR}/okvir.png" ] && cp -f "${TMP_DIR}/okvir.png" "${HOME}/.local/share/pixmaps/okvir.png"
    if [ -f "${TMP_DIR}/okvir.desktop" ]; then
      cp -f "${TMP_DIR}/okvir.desktop" "${HOME}/.local/share/applications/okvir.desktop"
    else
      cat << DESKTOP_ENTRY_EOF > "${HOME}/.local/share/applications/okvir.desktop"
[Desktop Entry]
Name=OKVIR
Comment=The Open-Source Desktop Framework for Learning Data Science, Econometrics & AI
Exec=${INSTALL_DIR}/okvir open %U
Icon=okvir
Terminal=false
Type=Application
Categories=Education;Science;Math;Development;
Keywords=data-science;econometrics;ai;machine-learning;statistics;interactive;
StartupWMClass=okvir-desktop
MimeType=application/x-okvir;
DESKTOP_ENTRY_EOF
    fi

    # Record installed release version
    mkdir -p "${APP_DIR}"
    echo "${RESOLVED_VERSION}" > "${APP_DIR}/version"

    update-desktop-database "${HOME}/.local/share/applications" >/dev/null 2>&1 || true
    echo "    • Refreshing system application database (Super key search ready)"
    rm -rf "${TMP_DIR}"
    INSTALLED=true
    echo "${GREEN}✔ Installed Native Desktop Engine (v${RESOLVED_VERSION}) to ${DESKTOP_TARGET}${RESET}"
    echo "${GREEN}✔ Configured Unified Terminal CLI Launcher at ${INSTALL_DIR}/okvir${RESET}"
  fi

elif [ "${PLATFORM}" = "macos" ]; then
  DMG_TMP="$(mktemp -d)/okvir.dmg"

  echo "    • Fetching macOS desktop disk image (~14 MB dmg, please wait)..."
  if download_file "https://github.com/${OKVIR_REPO}/releases/download/v${RESOLVED_VERSION}/OKVIR_${RESOLVED_VERSION}_universal.dmg" "${DMG_TMP}" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/OKVIR_${RESOLVED_VERSION}_universal.dmg" "${DMG_TMP}" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/download/v${RESOLVED_VERSION}/Okvir-macOS-${TARGET_ARCH}.dmg" "${DMG_TMP}" || \
     download_file "https://github.com/${OKVIR_REPO}/releases/latest/download/Okvir-macOS-${TARGET_ARCH}.dmg" "${DMG_TMP}"; then
    hdiutil attach -nobrowse "${DMG_TMP}" -mountpoint /Volumes/OkvirInstall >/dev/null 2>&1
    cp -R "/Volumes/OkvirInstall/Okvir.app" /Applications/
    hdiutil detach /Volumes/OkvirInstall >/dev/null 2>&1
    ln -sf "/Applications/Okvir.app/Contents/MacOS/okvir" "${INSTALL_DIR}/okvir"
    mkdir -p "${APP_DIR}"
    echo "${RESOLVED_VERSION}" > "${APP_DIR}/version"
    rm -rf "$(dirname "${DMG_TMP}")"
    INSTALLED=true
    echo "${GREEN}✔ Installed Okvir.app (v${RESOLVED_VERSION}) to /Applications/Okvir.app${RESET}"
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
echo "${GREEN}${BOLD}  ╔══════════════════════════════════════════════════════╗${RESET}"
echo "${GREEN}${BOLD}  ║       ✔ Okvir Desktop Installed Successfully!        ║${RESET}"
echo "${GREEN}${BOLD}  ╚══════════════════════════════════════════════════════╝${RESET}"
echo ""
echo "${BOLD}  🚀 How to Launch Okvir:${RESET}"
echo ""
if [ "${PLATFORM}" = "macos" ]; then
  echo "  ${CYAN}${BOLD}1. Spotlight & Applications (GUI):${RESET}"
  echo "     • Press ${BOLD}⌘ Space${RESET} and type ${BOLD}\"Okvir\"${RESET}"
  echo "     • Or open ${BOLD}/Applications/Okvir.app${RESET} directly from Finder or Launchpad"
  echo ""
  echo "  ${CYAN}${BOLD}2. Terminal / Command Line:${RESET}"
  echo "     • Run: ${BOLD}okvir${RESET}"
else
  echo "  ${CYAN}${BOLD}1. Application Launcher (Super Key / Desktop):${RESET}"
  echo "     • Press the ${BOLD}Super${RESET} (Windows) key and search for ${BOLD}\"Okvir\"${RESET}"
  echo "     • Or open Okvir from your Applications menu under ${BOLD}Education${RESET} / ${BOLD}Science${RESET}"
  echo ""
  echo "  ${CYAN}${BOLD}2. Terminal / Command Line:${RESET}"
  echo "     • Run: ${BOLD}okvir${RESET}"
fi
echo ""
echo "  ${CYAN}${BOLD}3. Explore Commands, CLI & Authoring Tools:${RESET}"
echo "     • Run ${BOLD}okvir --help${RESET} for the complete command palette and usage guide"
echo "     • Run ${BOLD}okvir doctor${RESET} to verify system and curriculum health"
echo "     • Run ${BOLD}okvir version${RESET} to inspect version and check for updates"
echo ""
echo "  ────────────────────────────────────────────────────────"
echo "  ⭐ ${BOLD}Star the repository:${RESET}    https://github.com/${OKVIR_REPO}"
echo "  🐛 ${BOLD}Report issues / bugs:${RESET}   https://github.com/${OKVIR_REPO}/issues"
echo "  ✉  ${BOLD}Author / Inquiries:${RESET}     Zakarya Roubhi <roubhizakarya@gmail.com>"
echo "  ────────────────────────────────────────────────────────"
echo ""
