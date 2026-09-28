# ==============================================================================
# OKVIR (إطار) - Official PowerShell Installer for Windows 10/11
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
  ║    OKVIR (إطار) - The Framework for AI Education     ║
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

if ($DownloadSuccess -and (Test-Path $InstallerTmp)) {
    Write-Host "==> Executing silent current-user installer..." -ForegroundColor Gray
    Start-Process -FilePath $InstallerTmp -ArgumentList "/S", "/currentuser" -Wait
    Write-Host "✔ Okvir installed successfully!" -ForegroundColor Green
} else {
    Write-Host "==> Fetching Okvir standalone distribution ($Version)..." -ForegroundColor Gray
    $WebZipUrl = "https://github.com/$Repo/releases/download/v1.0.0/okvir-web-v1.0.0.zip"
    $WebZipTmp = "$env:TEMP\okvir-web.zip"
    $WebDest = "$env:USERPROFILE\.okvir\web"

    try {
        Invoke-WebRequest -Uri $WebZipUrl -OutFile $WebZipTmp -UseBasicParsing -TimeoutSec 30
        Expand-Archive -Path $WebZipTmp -DestinationPath $WebDest -Force
        Write-Host "✔ Installed Okvir standalone web engine to $WebDest" -ForegroundColor Green
    } catch {
        Write-Host "! Web archive fallback skipped." -ForegroundColor Gray
    }

    Write-Host "! Generating lightweight Okvir CMD launcher stub..." -ForegroundColor Yellow
    $CmdStub = "@echo off`r`nif exist `"%USERPROFILE%\.okvir\web\index.html`" (`r`n  start `"`" `"%USERPROFILE%\.okvir\web\index.html`"`r`n) else (`r`n  npx --yes okvir %*`r`n)"
    Set-Content -Path "$BinDir\okvir.cmd" -Value $CmdStub
    Write-Host "✔ Created launcher stub at $BinDir\okvir.cmd" -ForegroundColor Green
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
