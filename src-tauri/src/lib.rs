use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

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

pub struct AppState {
    pub db: Mutex<Option<rusqlite::Connection>>,
}

#[tauri::command]
pub fn get_user_profile(_state: State<'_, AppState>) -> Result<UserProfileDTO, String> {
    // In production, queries embedded SQLite in WAL mode (~/.okvir/storage.db)
    Ok(UserProfileDTO {
        id: "local-explorer".to_string(),
        username: "Explorer".to_string(),
        preferred_language: "en".to_string(),
        preferred_theme: "dark".to_string(),
        xp: 350,
        streak_days: 7,
        longest_streak: 14,
        streak_freezes_remaining: 2,
        last_active_date: Some("2026-09-27T23:00:00Z".to_string()),
    })
}

#[tauri::command]
pub fn complete_lesson(
    lesson_id: String,
    time_spent_seconds: i64,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    println!(
        "[OKVIR Native Engine] Completed lesson {} in {}s",
        lesson_id, time_spent_seconds
    );
    Ok(true)
}

#[tauri::command]
pub fn get_due_fsrs_cards(_state: State<'_, AppState>) -> Result<Vec<FsrsCardDTO>, String> {
    Ok(vec![
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
    ])
}

#[tauri::command]
pub fn record_submission(
    payload: SubmissionPayload,
    _state: State<'_, AppState>,
) -> Result<bool, String> {
    println!(
        "[OKVIR Native Engine] Code submission challenge={} passed={} in {}ms",
        payload.challenge_id, payload.passed_tests, payload.execution_time_ms
    );
    Ok(true)
}

#[tauri::command]
pub fn verify_chunk_signature(
    chunk_id: String,
    archive_bytes: Vec<u8>,
) -> Result<ChunkVerificationResult, String> {
    // Check archive minimum size and header magic 'OKVR'
    if archive_bytes.len() < 32 {
        return Ok(ChunkVerificationResult {
            valid: false,
            chunk_id,
            sha256: "".to_string(),
        });
    }

    let is_valid_magic = &archive_bytes[0..4] == b"OKVR";
    let sha256_mock = format!("{:x}", archive_bytes.len() * 31337);

    Ok(ChunkVerificationResult {
        valid: is_valid_magic,
        chunk_id,
        sha256: sha256_mock,
    })
}

pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            db: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![
            get_user_profile,
            complete_lesson,
            get_due_fsrs_cards,
            record_submission,
            verify_chunk_signature,
        ])
        .run(tauri::generate_context!())
        .expect("error while running okvir tauri application");
}
