use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use tauri::State;
use crate::AppState;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UserProfileDTO {
    pub id: String,
    pub username: String,
    pub preferred_language: String,
    pub preferred_theme: String,
    pub xp: i64,
    pub streak_days: i64,
    pub longest_streak: i64,
    pub streak_freezes_remaining: i64,
    pub last_active_date: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FsrsCardDTO {
    pub card_id: String,
    pub concept_id: String,
    pub stability: f64,
    pub difficulty: f64,
    pub reps: i64,
    pub lapses: i64,
    pub state: i64,
    pub last_review: Option<String>,
    pub due_date: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SubmissionPayload {
    pub challenge_id: String,
    pub lesson_id: String,
    pub submitted_code: String,
    pub passed_tests: bool,
    pub execution_time_ms: f64,
    pub memory_used_bytes: i64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChunkVerificationResult {
    pub valid: bool,
    pub chunk_id: String,
    pub sha256: String,
}

fn get_connection() -> Result<rusqlite::Connection, String> {
    let home_dir = std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .unwrap_or_else(|_| ".".to_string());
    let okvir_dir = std::path::Path::new(&home_dir).join(".okvir");
    let _ = std::fs::create_dir_all(&okvir_dir);
    let db_path = okvir_dir.join("okvir.db");

    let conn = rusqlite::Connection::open(&db_path)
        .or_else(|_| rusqlite::Connection::open_in_memory())
        .map_err(|e| e.to_string())?;

    conn.execute_batch(
        "PRAGMA journal_mode = WAL;
         PRAGMA synchronous = NORMAL;
         PRAGMA foreign_keys = ON;
         CREATE TABLE IF NOT EXISTS user_profile (
             id TEXT PRIMARY KEY,
             username TEXT NOT NULL DEFAULT 'Explorer',
             preferred_language TEXT NOT NULL DEFAULT 'en',
             preferred_theme TEXT NOT NULL DEFAULT 'dark',
             xp INTEGER NOT NULL DEFAULT 0,
             streak_days INTEGER NOT NULL DEFAULT 0,
             longest_streak INTEGER NOT NULL DEFAULT 0,
             streak_freezes_remaining INTEGER NOT NULL DEFAULT 2,
             last_active_date TEXT
         );
         CREATE TABLE IF NOT EXISTS lesson_progress (
             lesson_id TEXT PRIMARY KEY,
             module_id TEXT NOT NULL,
             status TEXT NOT NULL,
             current_beat INTEGER NOT NULL DEFAULT 1,
             attempts_count INTEGER NOT NULL DEFAULT 0,
             time_spent_seconds INTEGER NOT NULL DEFAULT 0,
             completed_at TEXT
         );
         CREATE TABLE IF NOT EXISTS fsrs_cards (
             card_id TEXT PRIMARY KEY,
             concept_id TEXT NOT NULL,
             stability REAL NOT NULL DEFAULT 1.0,
             difficulty REAL NOT NULL DEFAULT 5.0,
             reps INTEGER NOT NULL DEFAULT 0,
             lapses INTEGER NOT NULL DEFAULT 0,
             state INTEGER NOT NULL DEFAULT 0,
             last_review TEXT,
             due_date TEXT NOT NULL
         );
         CREATE TABLE IF NOT EXISTS code_submissions (
             id TEXT PRIMARY KEY,
             challenge_id TEXT NOT NULL,
             lesson_id TEXT NOT NULL,
             submitted_code TEXT NOT NULL,
             passed_tests INTEGER NOT NULL,
             execution_time_ms REAL NOT NULL,
             memory_used_bytes INTEGER NOT NULL,
             submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
         );
         INSERT OR IGNORE INTO user_profile (id, username, preferred_language, preferred_theme, xp, streak_days, longest_streak, streak_freezes_remaining, last_active_date)
         VALUES ('local-explorer', 'Explorer', 'en', 'dark', 0, 0, 0, 2, NULL);"
    ).map_err(|e| e.to_string())?;

    Ok(conn)
}

#[tauri::command]
pub fn get_user_profile(_state: State<'_, AppState>) -> Result<UserProfileDTO, String> {
    let conn = get_connection()?;
    let mut stmt = conn.prepare("SELECT id, username, preferred_language, preferred_theme, xp, streak_days, longest_streak, streak_freezes_remaining, last_active_date FROM user_profile LIMIT 1")
        .map_err(|e| e.to_string())?;
    let mut rows = stmt.query([]).map_err(|e| e.to_string())?;

    if let Some(row) = rows.next().map_err(|e| e.to_string())? {
        Ok(UserProfileDTO {
            id: row.get(0).unwrap_or_else(|_| "local-explorer".to_string()),
            username: row.get(1).unwrap_or_else(|_| "Explorer".to_string()),
            preferred_language: row.get(2).unwrap_or_else(|_| "en".to_string()),
            preferred_theme: row.get(3).unwrap_or_else(|_| "dark".to_string()),
            xp: row.get(4).unwrap_or(0),
            streak_days: row.get(5).unwrap_or(0),
            longest_streak: row.get(6).unwrap_or(0),
            streak_freezes_remaining: row.get(7).unwrap_or(2),
            last_active_date: row.get(8).ok(),
        })
    } else {
        Ok(UserProfileDTO {
            id: "local-explorer".to_string(),
            username: "Explorer".to_string(),
            preferred_language: "en".to_string(),
            preferred_theme: "dark".to_string(),
            xp: 0,
            streak_days: 0,
            longest_streak: 0,
            streak_freezes_remaining: 2,
            last_active_date: None,
        })
    }
}

#[tauri::command]
pub fn complete_lesson(
    lesson_id: String,
    time_spent_seconds: i64,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    let conn = get_connection()?;
    conn.execute(
        "INSERT INTO lesson_progress (lesson_id, module_id, status, current_beat, attempts_count, time_spent_seconds, completed_at)
         VALUES (?1, ?1, 'mastered', 4, 1, ?2, datetime('now'))
         ON CONFLICT(lesson_id) DO UPDATE SET
            status = 'mastered',
            current_beat = 4,
            attempts_count = attempts_count + 1,
            time_spent_seconds = time_spent_seconds + ?2,
            completed_at = datetime('now')",
        rusqlite::params![lesson_id, time_spent_seconds],
    ).map_err(|e| e.to_string())?;

    let _ = conn.execute(
        "UPDATE user_profile SET xp = xp + 50, last_active_date = datetime('now') WHERE id = 'local-explorer'",
        [],
    );

    Ok(true)
}

#[tauri::command]
pub fn get_due_fsrs_cards(_state: State<'_, AppState>) -> Result<Vec<FsrsCardDTO>, String> {
    let conn = get_connection()?;
    let mut stmt = conn.prepare("SELECT card_id, concept_id, stability, difficulty, reps, lapses, state, last_review, due_date FROM fsrs_cards WHERE datetime(due_date) <= datetime('now')")
        .map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| {
        Ok(FsrsCardDTO {
            card_id: row.get(0)?,
            concept_id: row.get(1)?,
            stability: row.get(2)?,
            difficulty: row.get(3)?,
            reps: row.get(4)?,
            lapses: row.get(5)?,
            state: row.get(6)?,
            last_review: row.get(7).ok(),
            due_date: row.get(8)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut cards = Vec::new();
    for card_res in rows {
        if let Ok(card) = card_res {
            cards.push(card);
        }
    }

    if cards.is_empty() {
        cards = vec![
            FsrsCardDTO {
                card_id: "fsrs-ols-blue".to_string(),
                concept_id: "gauss-markov-blue".to_string(),
                stability: 4.2,
                difficulty: 3.1,
                reps: 3,
                lapses: 0,
                state: 2,
                last_review: Some("2026-09-25T10:00:00Z".to_string()),
                due_date: "2026-09-29T10:00:00Z".to_string(),
            },
            FsrsCardDTO {
                card_id: "fsrs-l1-sparsity".to_string(),
                concept_id: "lasso-diamond-geometry".to_string(),
                stability: 2.8,
                difficulty: 4.0,
                reps: 2,
                lapses: 0,
                state: 2,
                last_review: Some("2026-09-26T12:00:00Z".to_string()),
                due_date: "2026-09-28T12:00:00Z".to_string(),
            },
        ];
    }

    Ok(cards)
}

#[tauri::command]
pub fn save_fsrs_card(
    card: FsrsCardDTO,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    let conn = get_connection()?;
    conn.execute(
        "INSERT INTO fsrs_cards (card_id, concept_id, stability, difficulty, reps, lapses, state, last_review, due_date)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
         ON CONFLICT(card_id) DO UPDATE SET
            stability = ?3,
            difficulty = ?4,
            reps = ?5,
            lapses = ?6,
            state = ?7,
            last_review = ?8,
            due_date = ?9",
        rusqlite::params![
            card.card_id,
            card.concept_id,
            card.stability,
            card.difficulty,
            card.reps,
            card.lapses,
            card.state,
            card.last_review,
            card.due_date,
        ],
    ).map_err(|e| e.to_string())?;

    Ok(true)
}

#[tauri::command]
pub fn record_submission(
    payload: SubmissionPayload,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    let conn = get_connection()?;
    let submission_id = format!("sub-{}", std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap_or_default().as_millis());
    conn.execute(
        "INSERT INTO code_submissions (id, challenge_id, lesson_id, submitted_code, passed_tests, execution_time_ms, memory_used_bytes)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        rusqlite::params![
            submission_id,
            payload.challenge_id,
            payload.lesson_id,
            payload.submitted_code,
            if payload.passed_tests { 1 } else { 0 },
            payload.execution_time_ms,
            payload.memory_used_bytes,
        ],
    ).map_err(|e| e.to_string())?;

    Ok(true)
}

#[tauri::command]
pub fn verify_chunk_signature(
    chunk_id: String,
    archive_bytes: Vec<u8>,
) -> Result<ChunkVerificationResult, String> {
    if archive_bytes.len() < 32 {
        return Ok(ChunkVerificationResult {
            valid: false,
            chunk_id,
            sha256: "".to_string(),
        });
    }

    let is_valid_magic = &archive_bytes[0..4] == b"OKVR";
    let has_valid_trailer = archive_bytes.len() >= 74
        && &archive_bytes[archive_bytes.len() - 74..archive_bytes.len() - 69] == b"OKSIG";

    let mut hasher = Sha256::new();
    hasher.update(&archive_bytes);
    let hash_hex = format!("{:x}", hasher.finalize());

    Ok(ChunkVerificationResult {
        valid: is_valid_magic && has_valid_trailer,
        chunk_id,
        sha256: hash_hex,
    })
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ToolchainInfoDTO {
    pub id: String,
    pub name: String,
    pub binary: String,
    pub path: Option<String>,
    pub version: Option<String>,
    pub is_available: bool,
    pub tier: String,
    pub status: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NativeExecutionResultDTO {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
    pub execution_time_ms: f64,
    pub exit_code: i32,
}

fn check_binary(bin: &str, ver_flag: &str) -> (bool, Option<String>, Option<String>) {
    // Check which / where
    let which_cmd = if cfg!(target_os = "windows") { "where" } else { "which" };
    let path_output = std::process::Command::new(which_cmd)
        .arg(bin)
        .output();

    if let Ok(out) = path_output {
        if out.status.success() {
            let path_str = String::from_utf8_lossy(&out.stdout).trim().lines().next().unwrap_or("").to_string();
            // Try running version
            let ver_output = std::process::Command::new(bin)
                .arg(ver_flag)
                .output();
            let ver_str = ver_output.ok().and_then(|v| {
                let s = String::from_utf8_lossy(if !v.stdout.is_empty() { &v.stdout } else { &v.stderr }).trim().lines().next().unwrap_or("").to_string();
                if s.is_empty() { None } else { Some(s) }
            });
            return (true, Some(path_str), ver_str);
        }
    }
    (false, None, None)
}

#[tauri::command]
pub fn detect_toolchains(_state: State<'_, AppState>) -> Result<Vec<ToolchainInfoDTO>, String> {
    let mut toolchains = Vec::new();

    // 1. Python (Native)
    let (py_ok, py_path, py_ver) = check_binary("python3", "--version");
    let (py_final_ok, py_final_path, py_final_ver) = if py_ok {
        (py_ok, py_path, py_ver)
    } else {
        check_binary("python", "--version")
    };
    toolchains.push(ToolchainInfoDTO {
        id: "python".to_string(),
        name: if py_final_ok { format!("Python (Native: {})", py_final_ver.clone().unwrap_or_default()) } else { "Python 3".to_string() },
        binary: "python3".to_string(),
        path: py_final_path,
        version: py_final_ver,
        is_available: py_final_ok,
        tier: "native".to_string(),
        status: if py_final_ok { "ready".to_string() } else { "missing".to_string() },
    });

    // 2. Pyodide / WebAssembly Python (Always embedded in Okvir)
    toolchains.push(ToolchainInfoDTO {
        id: "python-wasm".to_string(),
        name: "Python 3.12 (Pyodide WASM Worker)".to_string(),
        binary: "pyodide.worker".to_string(),
        path: Some("virtual://okvir/pyodide-v0.26".to_string()),
        version: Some("3.12.2 WASM".to_string()),
        is_available: true,
        tier: "embedded".to_string(),
        status: "ready".to_string(),
    });

    // 3. Node.js / JavaScript
    let (node_ok, node_path, node_ver) = check_binary("node", "--version");
    toolchains.push(ToolchainInfoDTO {
        id: "javascript".to_string(),
        name: if node_ok { format!("Node.js ({})", node_ver.clone().unwrap_or_default()) } else { "Node.js".to_string() },
        binary: "node".to_string(),
        path: node_path,
        version: node_ver,
        is_available: node_ok,
        tier: "native".to_string(),
        status: if node_ok { "ready".to_string() } else { "missing".to_string() },
    });

    // 4. GCC / C/C++
    let (gcc_ok, gcc_path, gcc_ver) = check_binary("gcc", "--version");
    toolchains.push(ToolchainInfoDTO {
        id: "c".to_string(),
        name: if gcc_ok { "GCC Compiler (C17/C23)".to_string() } else { "GCC / Clang".to_string() },
        binary: "gcc".to_string(),
        path: gcc_path,
        version: gcc_ver,
        is_available: gcc_ok,
        tier: "native".to_string(),
        status: if gcc_ok { "ready".to_string() } else { "missing".to_string() },
    });

    // 5. Rust
    let (rust_ok, rust_path, rust_ver) = check_binary("rustc", "--version");
    toolchains.push(ToolchainInfoDTO {
        id: "rust".to_string(),
        name: if rust_ok { format!("Rust ({})", rust_ver.clone().unwrap_or_default()) } else { "Rust (rustc)".to_string() },
        binary: "rustc".to_string(),
        path: rust_path,
        version: rust_ver,
        is_available: rust_ok,
        tier: "native".to_string(),
        status: if rust_ok { "ready".to_string() } else { "missing".to_string() },
    });

    // 6. Java
    let (java_ok, java_path, java_ver) = check_binary("javac", "--version");
    toolchains.push(ToolchainInfoDTO {
        id: "java".to_string(),
        name: if java_ok { format!("Java JDK ({})", java_ver.clone().unwrap_or_default()) } else { "Java JDK (javac)".to_string() },
        binary: "javac".to_string(),
        path: java_path,
        version: java_ver,
        is_available: java_ok,
        tier: "native".to_string(),
        status: if java_ok { "ready".to_string() } else { "missing".to_string() },
    });

    // 7. R
    let (r_ok, r_path, r_ver) = check_binary("Rscript", "--version");
    toolchains.push(ToolchainInfoDTO {
        id: "r".to_string(),
        name: if r_ok { "R Analytical Engine".to_string() } else { "R (Rscript)".to_string() },
        binary: "Rscript".to_string(),
        path: r_path,
        version: r_ver,
        is_available: r_ok,
        tier: "native".to_string(),
        status: if r_ok { "ready".to_string() } else { "missing".to_string() },
    });

    Ok(toolchains)
}

#[tauri::command]
pub fn execute_native_code(
    language: String,
    code: String,
    _timeout_ms: Option<u64>,
    _state: State<'_, AppState>,
) -> Result<NativeExecutionResultDTO, String> {
    let start_time = std::time::Instant::now();
    let home_dir = std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .unwrap_or_else(|_| ".".to_string());
    let scratch_dir = std::path::Path::new(&home_dir).join(".okvir").join("scratch");
    std::fs::create_dir_all(&scratch_dir).map_err(|e| e.to_string())?;

    let timestamp = std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap_or_default().as_millis();

    match language.to_lowercase().as_str() {
        "python" => {
            let file_path = scratch_dir.join(format!("run_{}.py", timestamp));
            std::fs::write(&file_path, &code).map_err(|e| e.to_string())?;

            let py_bin = if check_binary("python3", "--version").0 { "python3" } else { "python" };
            let output = std::process::Command::new(py_bin)
                .arg(&file_path)
                .output()
                .map_err(|e| format!("Failed to invoke {}: {}", py_bin, e))?;

            let _ = std::fs::remove_file(&file_path);
            let elapsed = start_time.elapsed().as_secs_f64() * 1000.0;

            Ok(NativeExecutionResultDTO {
                success: output.status.success(),
                stdout: String::from_utf8_lossy(&output.stdout).to_string(),
                stderr: String::from_utf8_lossy(&output.stderr).to_string(),
                execution_time_ms: elapsed,
                exit_code: output.status.code().unwrap_or(-1),
            })
        }
        "javascript" | "js" | "node" => {
            let file_path = scratch_dir.join(format!("run_{}.js", timestamp));
            std::fs::write(&file_path, &code).map_err(|e| e.to_string())?;

            let output = std::process::Command::new("node")
                .arg(&file_path)
                .output()
                .map_err(|e| format!("Failed to invoke node: {}", e))?;

            let _ = std::fs::remove_file(&file_path);
            let elapsed = start_time.elapsed().as_secs_f64() * 1000.0;

            Ok(NativeExecutionResultDTO {
                success: output.status.success(),
                stdout: String::from_utf8_lossy(&output.stdout).to_string(),
                stderr: String::from_utf8_lossy(&output.stderr).to_string(),
                execution_time_ms: elapsed,
                exit_code: output.status.code().unwrap_or(-1),
            })
        }
        "c" => {
            let src_path = scratch_dir.join(format!("run_{}.c", timestamp));
            let bin_path = scratch_dir.join(format!("bin_{}", timestamp));
            std::fs::write(&src_path, &code).map_err(|e| e.to_string())?;

            // Compile with gcc
            let compile_output = std::process::Command::new("gcc")
                .arg("-O2")
                .arg(&src_path)
                .arg("-o")
                .arg(&bin_path)
                .arg("-lm")
                .output()
                .map_err(|e| format!("Failed to invoke gcc: {}", e))?;

            if !compile_output.status.success() {
                let _ = std::fs::remove_file(&src_path);
                let elapsed = start_time.elapsed().as_secs_f64() * 1000.0;
                return Ok(NativeExecutionResultDTO {
                    success: false,
                    stdout: "".to_string(),
                    stderr: format!("Compilation Error:\n{}", String::from_utf8_lossy(&compile_output.stderr)),
                    execution_time_ms: elapsed,
                    exit_code: compile_output.status.code().unwrap_or(1),
                });
            }

            // Run binary
            let run_output = std::process::Command::new(&bin_path)
                .output()
                .map_err(|e| format!("Failed to run compiled binary: {}", e))?;

            let _ = std::fs::remove_file(&src_path);
            let _ = std::fs::remove_file(&bin_path);
            let elapsed = start_time.elapsed().as_secs_f64() * 1000.0;

            Ok(NativeExecutionResultDTO {
                success: run_output.status.success(),
                stdout: String::from_utf8_lossy(&run_output.stdout).to_string(),
                stderr: String::from_utf8_lossy(&run_output.stderr).to_string(),
                execution_time_ms: elapsed,
                exit_code: run_output.status.code().unwrap_or(0),
            })
        }
        "rust" => {
            let src_path = scratch_dir.join(format!("run_{}.rs", timestamp));
            let bin_path = scratch_dir.join(format!("bin_rs_{}", timestamp));
            std::fs::write(&src_path, &code).map_err(|e| e.to_string())?;

            let compile_output = std::process::Command::new("rustc")
                .arg("-O")
                .arg(&src_path)
                .arg("-o")
                .arg(&bin_path)
                .output()
                .map_err(|e| format!("Failed to invoke rustc: {}", e))?;

            if !compile_output.status.success() {
                let _ = std::fs::remove_file(&src_path);
                let elapsed = start_time.elapsed().as_secs_f64() * 1000.0;
                return Ok(NativeExecutionResultDTO {
                    success: false,
                    stdout: "".to_string(),
                    stderr: format!("Rustc Compilation Error:\n{}", String::from_utf8_lossy(&compile_output.stderr)),
                    execution_time_ms: elapsed,
                    exit_code: compile_output.status.code().unwrap_or(1),
                });
            }

            let run_output = std::process::Command::new(&bin_path)
                .output()
                .map_err(|e| format!("Failed to run Rust binary: {}", e))?;

            let _ = std::fs::remove_file(&src_path);
            let _ = std::fs::remove_file(&bin_path);
            let elapsed = start_time.elapsed().as_secs_f64() * 1000.0;

            Ok(NativeExecutionResultDTO {
                success: run_output.status.success(),
                stdout: String::from_utf8_lossy(&run_output.stdout).to_string(),
                stderr: String::from_utf8_lossy(&run_output.stderr).to_string(),
                execution_time_ms: elapsed,
                exit_code: run_output.status.code().unwrap_or(0),
            })
        }
        lang => Err(format!("Unsupported native execution language: {}", lang)),
    }
}

#[tauri::command]
pub fn check_notification_permission() -> bool {
    true
}

#[tauri::command]
pub fn request_notification_permission() -> bool {
    true
}

#[tauri::command]
pub fn dispatch_native_notification(
    title: String,
    body: String,
    icon: Option<String>,
) -> Result<bool, String> {
    #[cfg(target_os = "linux")]
    {
        let mut cmd = std::process::Command::new("notify-send");
        cmd.arg("-a").arg("OKVIR");
        if let Some(ref i) = icon {
            if !i.is_empty() {
                cmd.arg("-i").arg(i);
            }
        }
        cmd.arg(&title);
        cmd.arg(&body);
        if let Ok(mut child) = cmd.spawn() {
            let _ = child.wait();
            return Ok(true);
        }
        Ok(false)
    }

    #[cfg(target_os = "windows")]
    {
        Ok(true)
    }

    #[cfg(target_os = "macos")]
    {
        let script = format!(
            "display notification \"{}\" with title \"{}\"",
            body.replace("\"", "\\\""),
            title.replace("\"", "\\\"")
        );
        let _ = std::process::Command::new("osascript")
            .args(["-e", &script])
            .spawn();
        Ok(true)
    }

    #[cfg(not(any(target_os = "linux", target_os = "windows", target_os = "macos")))]
    {
        Ok(true)
    }
}

#[tauri::command]
pub fn get_app_version() -> String {
    // 1. Check ~/.okvir/version (written by install.sh / updater from GitHub releases)
    if let Ok(home) = std::env::var("HOME") {
        let version_path = std::path::PathBuf::from(home).join(".okvir").join("version");
        if let Ok(content) = std::fs::read_to_string(&version_path) {
            let trimmed = content.trim().trim_start_matches('v');
            if !trimmed.is_empty() {
                return trimmed.to_string();
            }
        }
    }

    if let Ok(userprofile) = std::env::var("USERPROFILE") {
        let version_path = std::path::PathBuf::from(userprofile).join(".okvir").join("version");
        if let Ok(content) = std::fs::read_to_string(&version_path) {
            let trimmed = content.trim().trim_start_matches('v');
            if !trimmed.is_empty() {
                return trimmed.to_string();
            }
        }
    }

    // 2. Fallback to Cargo package version
    env!("CARGO_PKG_VERSION").to_string()
}

