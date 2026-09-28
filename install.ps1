# ==============================================================================
# OKVIR - Official PowerShell Installer for Windows 10/11
# Current-User mode: Zero Administrator / UAC Prompts required
# Repository: https://github.com/zuikre/okvir
# ==============================================================================

[CmdletBinding()]
param (
    [string]$Version = "latest"
)

$ErrorActionPreference = "Stop"

Write-Host "
  ╔══════════════════════════════════════════════════════╗
  ║        OKVIR - The Framework for AI Education        ║
  ║       Zero Setup • Pure Intuition • 100% Local       ║
  ╚══════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

$Repo = "zuikre/okvir"
$InstallDir = "$env:LOCALAPPDATA\Programs\Okvir"
$BinDir = "$InstallDir\bin"
$ExePath = "$BinDir\okvir.exe"

# 1. Detect Architecture
$Arch = if ([System.Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
Write-Host "==> Detected Architecture: Windows $Arch" -ForegroundColor Gray

# 2. Prepare Installation Directory
New-Item -ItemType Directory -Path $BinDir -Force | Out-Null
New-Item -ItemType Directory -Path "$env:USERPROFILE\.okvir\cache" -Force | Out-Null

Write-Host "==> Installation Target: $InstallDir" -ForegroundColor Gray

# 3. Resolve Download URL
$AssetName = "okvir-windows-x64-setup.exe"
$ReleaseUrl = "https://github.com/$Repo/releases/latest/download/$AssetName"
$InstallerTmp = "$env:TEMP\$AssetName"

Write-Host "==> Downloading Okvir ($AssetName)..." -ForegroundColor Gray

$DownloadSuccess = $false
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $ReleaseUrl -OutFile $InstallerTmp -UseBasicParsing -TimeoutSec 30
    $DownloadSuccess = $true
} catch {
    Write-Host "! Desktop installer exe packaging in progress on GitHub CI." -ForegroundColor Yellow
}

}

if (-not $DownloadSuccess) {
    # Check for standalone native zip package
    $ZipAssetName = "okvir-windows-x64.zip"
    $ZipReleaseUrl = "https://github.com/$Repo/releases/latest/download/$ZipAssetName"
    $ZipTmp = "$env:TEMP\$ZipAssetName"

    try {
        Write-Host "==> Trying standalone desktop package ($ZipAssetName)..." -ForegroundColor Gray
        Invoke-WebRequest -Uri $ZipReleaseUrl -OutFile $ZipTmp -UseBasicParsing -TimeoutSec 30
        Expand-Archive -Path $ZipTmp -DestinationPath $InstallDir -Force
        $DownloadSuccess = $true
        Write-Host "✔ Okvir native desktop package installed to $InstallDir!" -ForegroundColor Green
    } catch {
        Write-Host "! Standalone desktop package not found." -ForegroundColor Gray
    }
}

if (-not $DownloadSuccess) {
    Write-Host "`nError: Native desktop package could not be downloaded for Windows ($Arch)." -ForegroundColor Red
    Write-Host "Please download the Windows desktop installer manually from:"
    Write-Host "  https://github.com/$Repo/releases`n"
    exit 1
}

# 4. Ensure BinDir is in User PATH
$UserPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
if ($UserPath -notlike "*$BinDir*") {
    Write-Host "==> Appending $BinDir to User PATH environment variable..." -ForegroundColor Gray
    [System.Environment]::SetEnvironmentVariable("PATH", "$UserPath;$BinDir", "User")
    $env:PATH = "$env:PATH;$BinDir"
}

Write-Host "
✔ Okvir installation complete!
Launch Okvir by opening a new terminal and running:
  okvir
" -ForegroundColor Green
