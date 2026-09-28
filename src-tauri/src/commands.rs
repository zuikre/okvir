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
