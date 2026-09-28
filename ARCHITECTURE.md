# OKVIR (إطار): System Architecture & Technical Specifications

> **System Topology:** Embedded SQLite (WAL Mode) ➔ Tauri v2 (Rust 1.80+) ➔ Pyodide WASM Worker ➔ React 18/19 + Tailwind CSS  
> **Author & Architect:** **Zakarya Roubhi (روبحي زكرياء)** — Data Scientist, MSc Data Science (ESE Oran), Co-Founder & CTO of Podacium  
> **Repository:** [https://github.com/zuikre/okvir](https://github.com/zuikre/okvir)  

---

## 1. High-Level Architecture Overview

Okvir is architected as an **instrument-grade, local-first interactive computational engine**. It merges four decoupled system layers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            OKVIR APPLICATION STACK                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 1: EMBEDDED DATABASE (Local-First SQLite Engine)                     │
│  • SQLite 3 in WAL Mode (Write-Ahead Logging) via Rust rusqlite / WASM      │
│  • Normalized Relational DDL: Profiles, Lesson Progress, FSRS, Submissions  │
│  • Sub-2ms query execution; 100% offline persistence; zero cloud reliance   │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 2: NATIVE DESKTOP SHELL (Tauri v2 / Rust 1.80+)                      │
│  • Multi-Platform Windowing: Mica (Win 11), Vibrancy (macOS), Wayland (Linux)│
│  • Typed IPC Bridge: DB access, OS power governor, filesystem permissions   │
│  • Modular Package Manager: HTTP Range streaming of seekable .okvir bundles │
│  • Cryptographic Verifier: Ed25519 Minisign & SHA-256 block hash engine     │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 3: COMPUTATIONAL SANDBOX (WebAssembly Pyodide Worker)               │
│  • CPython 3.12 compiled to WebAssembly (Pyodide v0.26+)                    │
│  • Dedicated Web Worker thread: 0.0% main UI thread blocking                │
│  • Non-destructive execution interruption via SharedArrayBuffer & SIGINT    │
│  • Origin Private File System (OPFS) persistent mount at /workspace         │
│  • Headless Matplotlib AGG capture intercepting plt.show() as Base64 PNGs   │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 4: PRESENTATION & INTERACTION (React / Tailwind CSS / Web Audio)     │
│  • Central State Store: Zustand with self-healing persistence & DAG solvers │
│  • The 4-Beat Micro-Loop: Slider ➔ KaTeX Anchor ➔ Vectorized Code ➔ Quiz   │
│  • 18 Tactile 60 FPS Canvases & Labs: Demand-driven rendering, prealloc arrays│
│  • Procedural Web Audio API Synthesizer: 100% offline mathematical waveforms│
│  • Tier-1 Bilingual Engine (EN / AR) with strict LTR math and code isolation │
│  • Raycast-Style Pinned Action Bar & Cmd+K Universal Command Palette        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layer 1: Embedded SQLite Storage (WAL Mode)

Okvir stores all user state locally on the user's disk (`~/.okvir/storage.db`) without telemetry or third-party tracking.

### 2.1 Pragmas & Performance Tuning
```sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA temp_store = MEMORY;
PRAGMA mmap_size = 268435456; -- 256MB memory-mapped I/O
```

### 2.2 Relational DDL Schema
```sql
-- 1. User Profile & Streak Counters
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

-- 2. Curriculum Progress State Machine
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

-- 3. FSRS v5 Spaced Repetition Schedule
CREATE TABLE IF NOT EXISTS fsrs_cards (
    card_id TEXT PRIMARY KEY,
    concept_id TEXT NOT NULL,
    stability REAL NOT NULL DEFAULT 1.0,
    difficulty REAL NOT NULL DEFAULT 5.0,
    reps INTEGER NOT NULL DEFAULT 0,
    lapses INTEGER NOT NULL DEFAULT 0,
    state INTEGER NOT NULL DEFAULT 0,
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

CREATE INDEX IF NOT EXISTS idx_fsrs_due_date ON fsrs_cards(due_date);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_status ON lesson_progress(status);
```

---

## 3. Layer 2: Native Desktop Shell (Tauri v2)

Tauri v2 provides a secure, minimal Rust wrapper around the system's native Webview:
* **Windows:** WebView2 with Mica window material (`DwmSetWindowAttribute`).
* **macOS:** WKWebView with NSVisualEffectView vibrancy.
* **Linux:** WebKitGTK 4.1 with Wayland fractional scaling.

### Typed IPC Commands (`src-tauri/src/commands.rs` & `src/lib/tauri-bridge.ts`)
* `get_user_profile()`: Queries embedded SQLite in WAL mode (`~/.okvir/okvir.db`) returning user profile, XP, and streak.
* `complete_lesson(lesson_id, time_spent)`: Atomically updates `lesson_progress` state, awards XP, and records completion timestamp.
* `get_due_fsrs_cards()`: Fetches cards due for daily spaced review according to FSRS v5 schedules.
* `record_submission(payload)`: Saves code verification attempts and runtime metrics to `code_submissions`.
* `verify_chunk_signature(chunk_id, archive_bytes)`: Cryptographically checks Ed25519 Minisign signatures over seekable `.okvir` frames.

---

## 4. Layer 3: Python WebAssembly Sandbox (Pyodide Worker)

All Python code runs client-side in a dedicated Web Worker (`src/workers/PyodideKernelWorker.ts`):

```
┌─────────────────┐       postMessage({ type: 'EXECUTE', code })       ┌────────────────────────┐
│                 │ ─────────────────────────────────────────────────> │                        │
│ React UI Thread │                                                    │  Pyodide Worker Thread │
│ (60 FPS Canvas) │ <───────────────────────────────────────────────── │  (CPython 3.12 WASM)   │
│                 │       postMessage({ type: 'RESULT', stdout })      │                        │
└─────────────────┘                                                    └────────────────────────┘
         │                                                                          │
         │  SharedArrayBuffer interruptBuffer[0] = 2 (SIGINT)                       │
         └──────────────────────────────────────────────────────────────────────────┘
```

### Key Capabilities
1. **Zero UI Thread Blocking:** Intensive NumPy matrix multiplications or Scikit-learn fits will never drop UI frames.
2. **Non-Destructive Interrupt:** If user code enters an infinite loop (`while True:`), a `SharedArrayBuffer` interrupt signal cancels execution without terminating the worker.
3. **Persistent OPFS Mount:** Origin Private File System mounted at `/workspace` permits persistent CSV reads and model artifact writes.
4. **Matplotlib Interceptor:** Headless AGG canvas captures calls to `plt.show()` and transmits them to the UI as Base64-encoded PNGs.

---

## 5. Layer 4: Tactical Canvas & Audio Engines

### 5.1 60 FPS Tactical Canvas Architecture
All 18 interactive visualizations and simulation engines implement demand-driven rendering:
* **Render-on-Change:** Animations only run during user interaction or active physics snapping (`requestAnimationFrame`). Idle CPU sits at `0.0%`.
* **Path Batching:** All dynamic elements (such as 25 OLS residual squares, 40 KNN points, or Galton Board bin histograms) are compiled into a single path before dispatching `ctx.stroke()` or `ctx.fill()`.
* **No GC Allocation:** Coordinate conversions and vectors use pre-allocated buffers.

### 5.2 Procedural Web Audio API Synthesizer
Okvir contains zero recorded audio MP3/WAV assets. Every sound is synthesized on-the-fly using the Web Audio API (`src/lib/audio.ts`):
* **Mechanical Click:** 10ms damped triangle wave (1200Hz ➔ 300Hz) with 8ms subtle haptic pulse.
* **Success Chord:** Pentatonic overtone triad: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz) decaying over 350ms.
* **Milestone Fanfare:** Ascending harmonic arpeggio (440Hz, 554Hz, 659Hz, 880Hz).
* **Error Tick:** 50ms downward sawtooth ramp (180Hz ➔ 60Hz).

---

## 6. Spaced Repetition: FSRS v5 Mathematics

Okvir implements the **Free Spaced Repetition Scheduler (FSRS v5)** continuous forgetting curve:

$$
R(t, S) = \left( 1 + \frac{19}{81} \cdot \frac{t}{S} \right)^{-0.5}
$$

Where:
* $R$: Retrievability probability ($0.0 \le R \le 1.0$)
* $t$: Days elapsed since previous recall drill
* $S$: Memory stability (days until retrievability drops to 90%)
* $D$: Concept difficulty ($1.0 \le D \le 10.0$)

When a card is reviewed with rating $G \in \{1: \text{Again}, 2: \text{Hard}, 3: \text{Good}, 4: \text{Easy}\}$, Stability and Difficulty update with mean reversion:

$$
D' = D - w_6 \cdot (G - 3)
$$
$$
D_{\text{reverted}} = w_7 \cdot D_0 + (1 - w_7) \cdot D'
$$

---

## 7. Seekable .okvir Binary Container Specification

For modular curriculum distribution, Okvir compiles courses into binary archives (`.okvir`):

```
+-------------------------------------------------------------------------+
|                           .OKVIR BINARY LAYOUT                          |
+--------------------+----------------------------------------------------+
| Offset             | Description                                        |
+--------------------+----------------------------------------------------+
| 0x00 - 0x03        | Magic Bytes: 'OKVR' (0x4F, 0x4B, 0x56, 0x52)       |
| 0x04 - 0x05        | Format Version (uint16_le: 0x0001)                 |
| 0x06 - 0x07        | Flags (bit 0: Zstandard compressed frames)         |
| 0x08 - 0x0F        | Table of Contents (TOC) Byte Offset (uint64_le)    |
| 0x10 - 0x17        | Table of Contents (TOC) Byte Length (uint64_le)    |
| 0x18 - 0x1F        | Minisign Public Key ID (uint64_le)                 |
| 0x20 - [TOC Offset]| Seekable Payload Frames (256KB compressed blocks)  |
| [TOC Offset]       | JSON Table of Contents (virtual paths & offsets)   |
| EOF - 74 bytes     | Signature Trailer: 'OKSIG' + 64-byte Ed25519 Sig   |
+--------------------+----------------------------------------------------+
```

---

## 8. Internationalization & Bidirectional Layout Isolation

* **Narrative Text:** Driven by CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`). Setting `dir="rtl"` dynamically mirrors the entire shell.
* **Mathematical & Code Isolation:**
  To guarantee that equations and Python blocks are not corrupted by bidirectional Unicode algorithms, all formulas and editors are wrapped in:
  ```html
  <div dir="ltr" class="text-left font-mono">
    <!-- Mathematical symbols and code remain strictly Left-to-Right -->
  </div>
  ```

---

*Okvir is designed from first principles to provide lifelong, zero-friction, sovereign machine learning mastery.*
