-- ============================================================================
-- OKVIR: Embedded SQLite Schema (WAL Mode)
-- High-Performance Local-First Persistence for Technical Education
-- ============================================================================

PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA temp_store = MEMORY;
PRAGMA mmap_size = 268435456; -- 256MB memory-mapped I/O

-- 1. User Profile & Global Gamification State
CREATE TABLE IF NOT EXISTS user_profile (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL DEFAULT 'Explorer',
    preferred_language TEXT NOT NULL DEFAULT 'en',
    preferred_theme TEXT NOT NULL DEFAULT 'dark',
    xp INTEGER NOT NULL DEFAULT 0,
    streak_days INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    streak_freezes_remaining INTEGER NOT NULL DEFAULT 2,
    last_active_date TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Module & Lesson Curriculum Progress
CREATE TABLE IF NOT EXISTS lesson_progress (
    lesson_id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('locked', 'available', 'in_progress', 'mastered', 'decaying')),
    current_beat INTEGER NOT NULL DEFAULT 1 CHECK(current_beat BETWEEN 1 AND 4),
    attempts_count INTEGER NOT NULL DEFAULT 0,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. FSRS v5 Spaced Repetition Scheduling Engine
CREATE TABLE IF NOT EXISTS fsrs_cards (
    card_id TEXT PRIMARY KEY,
    concept_id TEXT NOT NULL,
    stability REAL NOT NULL DEFAULT 1.0,
    difficulty REAL NOT NULL DEFAULT 5.0,
    reps INTEGER NOT NULL DEFAULT 0,
    lapses INTEGER NOT NULL DEFAULT 0,
    state INTEGER NOT NULL DEFAULT 0, -- 0=New, 1=Learning, 2=Review, 3=Relearning
    last_review TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Code Challenge Submissions Log
CREATE TABLE IF NOT EXISTS code_submissions (
    id TEXT PRIMARY KEY,
    challenge_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    submitted_code TEXT NOT NULL,
    passed_tests BOOLEAN NOT NULL,
    execution_time_ms REAL NOT NULL,
    memory_used_bytes INTEGER NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(lesson_id) REFERENCES lesson_progress(lesson_id) ON DELETE CASCADE
);

-- 5. Installed Curriculum Chunks Metadata
CREATE TABLE IF NOT EXISTS chunk_metadata (
    chunk_id TEXT PRIMARY KEY,
    version TEXT NOT NULL,
    installed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    archive_sha256 TEXT NOT NULL,
    disk_footprint_bytes INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_fsrs_due_date ON fsrs_cards(due_date);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_status ON lesson_progress(status);
