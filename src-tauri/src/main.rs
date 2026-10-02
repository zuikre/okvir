// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use std::path::{Path, PathBuf};
use std::process::{self, Command};

const HELP_TEXT: &str = "Usage:
  okvir <command> [options]

Core Authoring & Engine:
  okvir [app], open            Launch native interactive desktop environment          [default]
  okvir dev                    Launch live-reload curriculum previewer
  okvir test [path]            Run AST validation and test cases on .okvir.md lessons
  okvir lint [dir]             Deep curriculum linter for math, i18n & challenge schemas
  okvir init <course-name>     Scaffold a new interactive curriculum repository
  okvir pack [dir] [out]       Compile lesson assets into seekable .okvir container
  okvir verify <file.okvir>    Cryptographically verify .okvir binary package signature

Course & Package Ecosystem:
  okvir install <target>       Install curriculum pack (.okvir container, URL, or ID)
  okvir list, ls               List locally installed curriculum packs and courses
  okvir search <query>         Search decentralized registry for courses and packs
  okvir registry [query]       Explore decentralized community curriculum packs

Interoperability (Jupyter & Export):
  okvir export <lesson>        Convert .okvir.md to Jupyter (.ipynb), Markdown, or HTML
  okvir import <file.ipynb>    Convert Jupyter Notebook into interactive .okvir.md lesson

Student Learning & Performance:
  okvir run <lesson.okvir.md>  Run interactive code challenge in terminal
  okvir progress, stats        View learning statistics, streak, XP & track mastery
  okvir benchmark, bench       Run high-performance math & vector engine benchmarks

Maintenance & Configuration:
  okvir config [get|set|list]  Manage global user preferences (lang, theme, telemetry)
  okvir version, -v, --version Show version info, environment diagnostics & update status
  okvir doctor, info           Run comprehensive system diagnostic & environment audit
  okvir update, --update       Check for updates & upgrade Okvir desktop app and CLI
  okvir clean                  Clean local package caches and temporary build artifacts
  okvir uninstall              Completely remove Okvir desktop app, CLI tools & cache

Community & Links:
  okvir rate, star             Open GitHub repository to star and rate Okvir
  okvir docs                   Open official documentation and curriculum specifications
  okvir issue, bug             Report a bug or submit a feature request on GitHub
  okvir sponsor, donate        Support independent open-source development
  okvir help, -h, --help       Show this help message

Options:
  -h, --help                   Show help information                                  [boolean]
  -v, --version                Show version number                                    [boolean]
      --app, --gui             Explicitly launch the desktop GUI application          [boolean]
      --headless               Run computational kernel headlessly without GUI        [boolean]
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
    print_banner(version);
    println!("  \x1b[1mOKVIR CLI:\x1b[0m        v{}", version);
    println!("  \x1b[1mRepository:\x1b[0m       https://github.com/zuikre/okvir");
    println!("  \x1b[1mAuthor:\x1b[0m           Zakarya Roubhi <roubhizakarya@gmail.com>");
    println!("  \x1b[1mStatus:\x1b[0m           Installed & Ready (v{})\n", version);
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

    // 4. %USERPROFILE%\.okvir\bin\okvir.js (Windows)
    if let Ok(profile) = env::var("USERPROFILE") {
        let profile_path = PathBuf::from(profile).join(".okvir").join("bin").join("okvir.js");
        if profile_path.exists() {
            return Some(profile_path);
        }
    }

    None
}

fn dispatch_cli(args: &[String]) -> bool {
    if let Some(script_path) = find_okvir_js() {
        let mut cmd = Command::new("node");
        cmd.arg(&script_path).args(args);
        match cmd.status() {
            Ok(status) => {
                process::exit(status.code().unwrap_or(0));
            }
            Err(_) => false,
        }
    } else {
        false
    }
}

fn sanitize_environment() {
    #[cfg(target_os = "linux")]
    {
        env::remove_var("GTK_MODULES");
        env::remove_var("GST_PLUGIN_SYSTEM_PATH_1_0");
        env::remove_var("GST_PLUGIN_PATH_1_0");
        env::remove_var("GST_PLUGIN_PATH");
        if env::var("GST_DEBUG").is_err() {
            env::set_var("GST_DEBUG", "0");
        }
        if env::var("GST_DEBUG_NO_COLOR").is_err() {
            env::set_var("GST_DEBUG_NO_COLOR", "1");
        }
    }
}

fn main() {
    sanitize_environment();
    let args: Vec<String> = env::args().collect();
    let version = get_version();

    if args.len() > 1 {
        let first_arg = args[1].as_str();

        match first_arg {
            "app" | "--app" | "--gui" | "--desktop" | "open" | "launch" => {
                // Explicit GUI launch
                okvir_desktop::run();
                return;
            }
            "init" | "dev" | "test" | "lint" | "pack" | "verify" | "registry"
            | "install" | "add" | "list" | "ls" | "search"
            | "export" | "import" | "run" | "progress" | "stats"
            | "benchmark" | "bench" | "config"
            | "doctor" | "info" | "update" | "--update" | "rate" | "star"
            | "docs" | "issue" | "bug" | "sponsor" | "donate" | "clean"
            | "uninstall" | "--uninstall" | "remove"
            | "version" | "-v" | "--version" | "help" | "-h" | "--help" => {
                // Try forwarding to Framework CLI script first (for rich interactive checks & live updates)
                if dispatch_cli(&args[1..]) {
                    return;
                }

                // Graceful native Rust fallbacks if Node.js or okvir.js is unavailable
                match first_arg {
                    "-h" | "--help" | "help" => {
                        print_help(&version);
                        process::exit(0);
                    }
                    "-v" | "--version" | "version" => {
                        print_version(&version);
                        process::exit(0);
                    }
                    _ => {
                        eprintln!("\x1b[31mError:\x1b[0m Could not locate Framework CLI script or Node.js runtime.");
                        eprintln!("Install Node.js (v18+) to run advanced CLI authoring tools, or run 'okvir open' for desktop GUI.\n");
                        print_help(&version);
                        process::exit(1);
                    }
                }
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
