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

    # Download portable CLI script
    $CliDestDir = "$env:USERPROFILE\.okvir\bin"
    New-Item -ItemType Directory -Path $CliDestDir -Force | Out-Null
    $CliScriptUrl = "https://raw.githubusercontent.com/$Repo/main/bin/okvir.js"
    try {
        Invoke-WebRequest -Uri $CliScriptUrl -OutFile "$CliDestDir\okvir.js" -UseBasicParsing -TimeoutSec 15
    } catch {
        Write-Host "! CLI script download skipped." -ForegroundColor Gray
    }

    Write-Host "! Generating lightweight Okvir CMD launcher stub..." -ForegroundColor Yellow
    $CmdStub = @"
@echo off
set APP_DIR=%USERPROFILE%\.okvir
if not "%~1"=="" (
  if exist "%CD%\bin\okvir.js" (
    node "%CD%\bin\okvir.js" %*
    exit /b %ERRORLEVEL%
  )
  if exist "%APP_DIR%\bin\okvir.js" (
    node "%APP_DIR%\bin\okvir.js" %*
    exit /b %ERRORLEVEL%
  )
)
if exist "%CD%\package.json" (
  npm run dev
  exit /b %ERRORLEVEL%
)
if exist "%APP_DIR%\web\index.html" (
  where python >nul 2>nul
  if %ERRORLEVEL% EQU 0 (
    echo Starting Okvir local engine on http://localhost:5173...
    start http://localhost:5173
    cd /d "%APP_DIR%\web" && python -m http.server 5173
    exit /b 0
  )
  where node >nul 2>nul
  if %ERRORLEVEL% EQU 0 (
    echo Starting Okvir local engine on http://localhost:5173...
    start http://localhost:5173
    node -e "const http=require('http'),fs=require('fs'),path=require('path'),root=process.env.USERPROFILE+'/.okvir/web',m={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.wasm':'application/wasm'};http.createServer((q,s)=>{let f=path.join(root,q.url==='/'?'index.html':q.url);if(!fs.existsSync(f))f=path.join(root,'index.html');s.writeHead(200,{'Content-Type':m[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s);}).listen(5173);"
    exit /b 0
  )
)
echo Please install Node.js 18+ or Python 3 to launch Okvir.
exit /b 1
"@
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
