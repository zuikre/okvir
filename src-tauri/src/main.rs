// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use std::path::{Path, PathBuf};
use std::process::{self, Command};

const HELP_TEXT: &str = "Usage:
  okvir [command] [options]

Commands:
  okvir [app]                  Launch native interactive desktop environment          [default]
  okvir dev                    Launch live-reload curriculum previewer
  okvir test [path]            Run AST validation and test cases on .okvir.md lessons
  okvir init <course-name>     Scaffold a new interactive curriculum repository
  okvir pack [dir] [out]       Compile lesson assets into seekable .okvir container
  okvir verify <file.okvir>    Cryptographically verify .okvir binary package signature
  okvir registry [query]       Explore decentralized community curriculum packs
  okvir version                Print Framework version information
  okvir help [command]         Show help for a specific command

Options:
  -h, --help                   Show help information                                  [boolean]
  -v, --version                Show version number                                    [boolean]
      --app, --gui             Explicitly launch the desktop GUI application          [boolean]
      --headless               Run computational kernel headlessly without GUI        [boolean]

Examples:
  okvir                        Launch desktop GUI application
  okvir --help                 Show help information
  okvir --version              Show version number
  okvir test ./curriculum      Verify all 125 curriculum lessons and AST test cases
  okvir init econometrics-101  Scaffold a new course repository
  okvir registry causal        Search community curriculum packages
";

/// Resolve version dynamically:
/// 1. ~/.okvir/version (set by install.sh / updater based on downloaded GitHub release)
/// 2. OKVIR_BUILD_VERSION (injected during GitHub Actions release workflow)
/// 3. Cargo package version
fn get_version() -> String {
    // 1. Check ~/.okvir/version (Linux / macOS)
    if let Ok(home) = env::var("HOME") {
        let version_path = PathBuf::from(home).join(".okvir").join("version");
        if let Ok(content) = std::fs::read_to_string(&version_path) {
            let trimmed = content.trim().trim_start_matches('v');
            if !trimmed.is_empty() {
                return trimmed.to_string();
            }
        }
    }

    // Check %USERPROFILE%\.okvir\version (Windows)
    if let Ok(userprofile) = env::var("USERPROFILE") {
        let version_path = PathBuf::from(userprofile).join(".okvir").join("version");
        if let Ok(content) = std::fs::read_to_string(&version_path) {
            let trimmed = content.trim().trim_start_matches('v');
            if !trimmed.is_empty() {
                return trimmed.to_string();
            }
        }
    }

    // 2. Check build-time environment variable injected during GitHub release build
    if let Some(build_ver) = option_env!("OKVIR_BUILD_VERSION") {
        let trimmed = build_ver.trim().trim_start_matches('v');
        if !trimmed.is_empty() {
            return trimmed.to_string();
        }
    }

    // 3. Fallback to Cargo package version
    env!("CARGO_PKG_VERSION").to_string()
}

fn print_banner(version: &str) {
    println!("\x1b[36m
 ▄████▄   ██   ██  ██      ██  ██████  ██████ 
██▀  ▀██  ██  ██   ██      ██    ██    ██   ██
██    ██  █████     ██    ██     ██    ██████ 
██▄  ▄██  ██  ██     ██  ██      ██    ██   ██
 ▀████▀   ██   ██     ▀██▀     ██████  ██    ██
 ─────────────────────────────────────────────\x1b[0m
  \x1b[1mOKVIR\x1b[0m \x1b[90mv{}\x1b[0m — Interactive AI & Econometrics Framework", version);
}

fn print_help(version: &str) {
    print_banner(version);
    println!("{}", HELP_TEXT);
}

fn print_version(version: &str) {
    println!("okvir {}", version);
}

fn find_okvir_js() -> Option<PathBuf> {
    // 1. Current working directory ./bin/okvir.js
    let cwd_path = Path::new("bin/okvir.js");
    if cwd_path.exists() {
        return Some(cwd_path.to_path_buf());
    }

    // 2. Relative to current exe
    if let Ok(exe_path) = env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            let candidate1 = exe_dir.join("okvir.js");
            if candidate1.exists() {
                return Some(candidate1);
            }
            let candidate2 = exe_dir.join("bin").join("okvir.js");
            if candidate2.exists() {
                return Some(candidate2);
            }
            let candidate3 = exe_dir.join("../share/okvir/bin/okvir.js");
            if candidate3.exists() {
                return Some(candidate3);
            }
        }
    }

    // 3. ~/.okvir/bin/okvir.js
    if let Ok(home) = env::var("HOME") {
        let home_path = PathBuf::from(home).join(".okvir").join("bin").join("okvir.js");
        if home_path.exists() {
            return Some(home_path);
        }
    }

    None
}

fn dispatch_cli(args: &[String]) {
    if let Some(script_path) = find_okvir_js() {
        let mut cmd = Command::new("node");
        cmd.arg(&script_path).args(args);
        match cmd.status() {
            Ok(status) => {
                process::exit(status.code().unwrap_or(0));
            }
            Err(err) => {
                eprintln!("\x1b[31mError launching Node.js runtime:\x1b[0m {}", err);
                eprintln!("Ensure Node.js (v18+) is installed on your PATH to run CLI commands.");
                process::exit(1);
            }
        }
    } else {
        eprintln!("\x1b[31mError:\x1b[0m Could not locate Framework CLI script 'bin/okvir.js'.");
        eprintln!("Ensure you run this command inside an Okvir project directory or have Okvir CLI installed.");
        process::exit(1);
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let version = get_version();

    if args.len() > 1 {
        let first_arg = args[1].as_str();

        match first_arg {
            "-h" | "--help" | "help" => {
                print_help(&version);
                process::exit(0);
            }
            "-v" | "--version" | "version" => {
                print_version(&version);
                process::exit(0);
            }
            "init" | "dev" | "test" | "pack" | "verify" | "registry" => {
                dispatch_cli(&args[1..]);
                return;
            }
            "app" | "--app" | "--gui" | "--desktop" => {
                // Explicit GUI launch
                okvir_desktop::run();
                return;
            }
            arg if arg.starts_with('-') => {
                eprintln!("\x1b[31mUnknown option:\x1b[0m {}\n", arg);
                print_help(&version);
                process::exit(1);
            }
            _ => {
                // Default: unrecognized non-flag arg falls back to desktop app
                okvir_desktop::run();
                return;
            }
        }
    }

    // Default: zero arguments launches desktop GUI
    okvir_desktop::run();
}
