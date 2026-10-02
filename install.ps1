# ==============================================================================
# OKVIR - Official PowerShell Installer for Windows 10/11
# Current-User mode: Zero Administrator / UAC Prompts required
# Repository: https://github.com/zuikre/okvir
# ==============================================================================

[CmdletBinding()]
param (
    [string]$Version = "latest",
    [switch]$Help,
    [switch]$h
)

if ($Help -or $h) {
    Write-Host "
OKVIR Official PowerShell Installer (Windows 10/11)
The Framework for AI Education: Zero Setup • Pure Intuition • 100% Local

USAGE:
  irm https://raw.githubusercontent.com/zuikre/okvir/main/install.ps1 | iex
  .\install.ps1 [-Version <version>] [-Help]

PARAMETERS:
  -Version <string>   Install a specific release version (default: 'latest')
  -Help, -h           Show this installer help guide and exit

AFTER INSTALLATION:
  Run 'okvir --help' in your terminal for full CLI commands, authoring tools, and diagnostics.

Repository: https://github.com/zuikre/okvir
Author:     Zakarya Roubhi <roubhizakarya@gmail.com>
" -ForegroundColor Cyan
    exit 0
}

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
Write-Host "==> [1/5] Verifying Windows Architecture & Environment..." -ForegroundColor Cyan
Write-Host "    • Architecture: Windows $Arch (64-bit)" -ForegroundColor Gray
Write-Host "    • Install Mode: Current-User (Zero UAC/Admin Privileges Required)" -ForegroundColor Gray

# 2. Prepare Installation Directory
Write-Host ""
Write-Host "==> [2/5] Preparing Target Directories..." -ForegroundColor Cyan
Write-Host "    • Application:  $InstallDir" -ForegroundColor Gray
Write-Host "    • Binaries:     $BinDir" -ForegroundColor Gray
Write-Host "    • Cache:        $env:USERPROFILE\.okvir\cache" -ForegroundColor Gray
New-Item -ItemType Directory -Path $BinDir -Force | Out-Null
New-Item -ItemType Directory -Path "$env:USERPROFILE\.okvir\cache" -Force | Out-Null

# 3. Resolve GitHub Release Version
Write-Host ""
Write-Host "==> [3/5] Resolving Latest Release Version from GitHub ($Repo)..." -ForegroundColor Cyan
$ResolvedVersion = $Version.TrimStart("v")
if ($Version -eq "latest") {
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $LatestRelease = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest" -UseBasicParsing -TimeoutSec 10
        if ($LatestRelease.tag_name) {
            $ResolvedVersion = $LatestRelease.tag_name.TrimStart("v")
        } else {
            $ResolvedVersion = "1.0.3"
        }
    } catch {
        $ResolvedVersion = "1.0.3"
    }
}
Write-Host "    • Resolved Target Version: v$ResolvedVersion" -ForegroundColor Gray

Write-Host ""
Write-Host "==> [4/5] Downloading Native Okvir Desktop Engine (v$ResolvedVersion)..." -ForegroundColor Cyan

# 4. Resolve Download URL
$PossibleAssets = @(
    "OKVIR_${ResolvedVersion}_x64-setup.exe",
    "OKVIR_${ResolvedVersion}_x64_en-US.msi",
    "okvir-windows-x64-setup.exe",
    "OKVIR_1.0.1_x64-setup.exe"
)

$DownloadSuccess = $false
foreach ($AssetName in $PossibleAssets) {
    $ReleaseUrl = "https://github.com/$Repo/releases/download/v$ResolvedVersion/$AssetName"
    $LatestUrl = "https://github.com/$Repo/releases/latest/download/$AssetName"
    $InstallerTmp = "$env:TEMP\$AssetName"
    Write-Host "==> Trying Okvir installer ($AssetName)..." -ForegroundColor Gray

    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        try {
            Invoke-WebRequest -Uri $ReleaseUrl -OutFile $InstallerTmp -UseBasicParsing -TimeoutSec 30
        } catch {
            Invoke-WebRequest -Uri $LatestUrl -OutFile $InstallerTmp -UseBasicParsing -TimeoutSec 30
        }
        Write-Host "==> Running silent currentUser installation..." -ForegroundColor Gray
        if ($AssetName.EndsWith(".msi")) {
            Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$InstallerTmp`" /qn ALLUSERS=2" -Wait
        } else {
            Start-Process -FilePath $InstallerTmp -ArgumentList "/S", "/currentuser" -Wait
        }
        # Record installed release version
        Set-Content -Path "$env:USERPROFILE\.okvir\version" -Value $ResolvedVersion -Encoding UTF8 -Force
        $DownloadSuccess = $true
        Write-Host "✔ Installed Okvir Desktop (v$ResolvedVersion) successfully!" -ForegroundColor Green
        break
    } catch {
        # Try next asset
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

# 5. Locate Installed Desktop Executable & Create Terminal Launchers
Write-Host ""
Write-Host "==> [5/5] Integrating Start Menu Shortcuts & Terminal Command..." -ForegroundColor Cyan

$PotentialExes = @(
    "$env:LOCALAPPDATA\Programs\OKVIR\OKVIR.exe",
    "$env:LOCALAPPDATA\Programs\okvir\OKVIR.exe",
    "$env:LOCALAPPDATA\Programs\OKVIR\okvir.exe",
    "$env:LOCALAPPDATA\Programs\okvir\okvir.exe",
    "$InstallDir\OKVIR.exe",
    "$InstallDir\okvir.exe",
    "$env:ProgramFiles\OKVIR\OKVIR.exe",
    "$env:ProgramFiles\okvir\okvir.exe",
    "${env:ProgramFiles(x86)}\OKVIR\OKVIR.exe",
    "${env:ProgramFiles(x86)}\okvir\okvir.exe"
)

$InstalledExe = $null
foreach ($p in $PotentialExes) {
    if (Test-Path $p) {
        $InstalledExe = $p
        break
    }
}

if ($InstalledExe) {
    $OkvirDir = "$env:USERPROFILE\.okvir"
    $OkvirBin = "$OkvirDir\bin"
    if (!(Test-Path $OkvirBin)) { New-Item -ItemType Directory -Path $OkvirBin -Force | Out-Null }

    # Download Framework CLI script & configure ES module package descriptor
    $CliScript = "$OkvirBin\okvir.js"
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/$Repo/main/bin/okvir.js" -OutFile $CliScript -UseBasicParsing -TimeoutSec 15
        Set-Content -Path "$OkvirDir\package.json" -Value '{"type": "module"}' -Encoding UTF8 -Force
    } catch {}

    # Generate batch wrapper so 'okvir' works in CMD, PowerShell, and Run dialog without admin rights
    $CmdWrapper = @"
@echo off
set "CLI_SCRIPT=%USERPROFILE%\.okvir\bin\okvir.js"
if "%~1"=="" goto launch_gui
if "%~1"=="open" goto launch_gui
if "%~1"=="app" goto launch_gui
if "%~1"=="--app" goto launch_gui
if "%~1"=="--gui" goto launch_gui

where node >nul 2>nul
if %errorlevel% equ 0 (
    if exist "%CLI_SCRIPT%" (
        node "%CLI_SCRIPT%" %*
        exit /b %errorlevel%
    )
)

:launch_gui
start "" "$InstalledExe" %*
exit /b 0
"@
    [System.IO.File]::WriteAllText("$BinDir\okvir.cmd", $CmdWrapper, [System.Text.Encoding]::ASCII)

    # Generate PowerShell wrapper
    $Ps1Wrapper = @"
`$CliScript = "`$env:USERPROFILE\.okvir\bin\okvir.js"
if (`$args.Count -eq 0 -or `$args[0] -in @("open", "app", "--app", "--gui", "--desktop")) {
    Start-Process -FilePath "$InstalledExe" -ArgumentList `$args
    exit 0
}

if ((Get-Command node -ErrorAction SilentlyContinue) -and (Test-Path `$CliScript)) {
    & node `$CliScript `$args
    exit `$LASTEXITCODE
}

& "$InstalledExe" `$args
"@
    [System.IO.File]::WriteAllText("$BinDir\okvir.ps1", $Ps1Wrapper, [System.Text.Encoding]::UTF8)

    Write-Host "    • Desktop Executable: $InstalledExe" -ForegroundColor Gray
    Write-Host "    • Terminal Launcher:  $BinDir\okvir.cmd" -ForegroundColor Gray
}

# 6. Ensure BinDir is in User PATH
$UserPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
if ($UserPath -notlike "*$BinDir*") {
    Write-Host "    • Registering User PATH environment variable..." -ForegroundColor Gray
    [System.Environment]::SetEnvironmentVariable("PATH", "$UserPath;$BinDir", "User")
}
$env:PATH = "$env:PATH;$BinDir"
Write-Host "    • Terminal command 'okvir' successfully registered" -ForegroundColor Gray

Write-Host "
  ╔══════════════════════════════════════════════════════╗
  ║       ✔ Okvir Desktop Installed Successfully!        ║
  ╚══════════════════════════════════════════════════════╝

  🚀 How to Launch Okvir:

  1. Start Menu & Search (Super / Windows Key):
     • Press the ⊞ Windows key and search for `"Okvir`"
     • Or click the Okvir shortcut on your Desktop or Start Menu

  2. Fast Run Dialog (Win + R):
     • Press Win + R, type `"okvir`", and press Enter to launch anytime from anywhere!

  3. Terminal / Command Line (PowerShell, CMD, Windows Terminal):
     • Run: okvir

     * Note for currently open terminal windows:
       Restart your terminal window to reload PATH, or run:
       `$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','User') + ';' + `$env:PATH

  4. Explore Commands, CLI & Authoring Tools:
     • Run: okvir --help (view complete command palette and usage guide)
     • Run: okvir doctor (system & environment health check)
     • Run: okvir version (inspect version and check for updates)

  ────────────────────────────────────────────────────────
  ⭐ Star the repository:    https://github.com/$Repo
  🐛 Report issues / bugs:   https://github.com/$Repo/issues
  ✉  Author / Inquiries:     Zakarya Roubhi <roubhizakarya@gmail.com>
  ────────────────────────────────────────────────────────
" -ForegroundColor Green
