use std::sync::Mutex;

pub mod commands;

pub struct AppState {
    pub db: Mutex<Option<rusqlite::Connection>>,
}

pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            db: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_user_profile,
            commands::complete_lesson,
            commands::get_due_fsrs_cards,
            commands::record_submission,
            commands::verify_chunk_signature,
            commands::detect_toolchains,
            commands::execute_native_code,
        ])
        .run(tauri::generate_context!())
        .expect("error while running okvir tauri application");
}
