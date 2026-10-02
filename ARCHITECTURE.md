# OKVIR: System Architecture & Technical Specifications

> **System Topology:** Embedded SQLite (WAL Mode) ➔ Tauri v2 (Rust 1.80+) ➔ Pyodide WASM Worker ➔ React 18/19 + Tailwind CSS  
> **Author & Architect:** [**Zakarya Roubhi (روبحي زكرياء)**](https://www.linkedin.com/in/zakaryaroubhi/?locale=ar) — Data Scientist, MSc Data Science (ESE Oran), Co-Founder & CTO of Podacium  
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
│  LAYER 3: COMPUTATIONAL SANDBOX (Dual WebAssembly Workers & AST Evaluator)  │
│  • CPython 3.12 compiled to WebAssembly (Pyodide v0.26+)                    │
│  • DuckDB WebAssembly (v1.28.0) zero-latency in-memory SQL analytics engine │
│  • Dedicated Web Worker threads: 0.0% main UI thread blocking               │
│  • 5-Second Infinite Loop Hard Watchdog & Linear Memory Recycling           │
│  • Non-destructive execution interruption via SharedArrayBuffer & SIGINT    │
│  • Origin Private File System (OPFS) persistent mount at /workspace         │
│  • Headless Matplotlib AGG capture intercepting plt.show() as Base64 PNGs   │
│  • Offline AST Micro-Evaluator for zero-dependency test assertion grading    │
├─────────────────────────────────────────────────────────────────────────────┤
│  LAYER 4: PRESENTATION & INTERACTION (React / Tailwind CSS / Web Audio)     │
│  • Central State Store: Zustand with self-healing persistence & DAG solvers │
│  • The 4-Beat Micro-Loop: Slider ➔ KaTeX Anchor ➔ Vectorized Code ➔ Quiz   │
│  • 24 Tactile 60 FPS Canvases & Labs: Demand-driven rendering, prealloc arrays│
│  • Organic Serpentine Roadmap: 3-tier harmonic terrain & inward signposts   │
│  • Hardware Power Governor: Battery API telemetry frame throttling (30 FPS) │
│  • Complete Vector Iconography: Authentic SVG logos & Lucide icons (0 emojis)│
│  • Procedural Web Audio API Synthesizer: 100% offline mathematical waveforms│
│  • Tier-1 Bilingual Engine (EN / AR) with strict LTR math and code isolation │
│  • Raycast-Style Pinned Action Bar & Cmd+K Universal Command Palette        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layer 1: Embedded SQLite Storage (WAL Mode)

Okvir stores all user state locally on the user's disk (`~/.okvir/okvir.db`) without telemetry or third-party tracking.

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
* **macOS:** WKWebView with NSVisualEffectView vibrancy and native traffic-light window controls.
* **Linux:** WebKitGTK 4.1 with Wayland fractional scaling and custom client-side decorations (CSD).

### 3.1 True Frameless Window Architecture
* **Zero OS Window Frame:** Native window decorations are disabled (`"decorations": false`), eliminating browser/PWA window artifacts.
* **Adaptive Titlebar Controls (`DesktopTitlebar.tsx`):**
  * macOS: Left-aligned native traffic-light action buttons (close, minimize, zoom).
  * Windows / Linux: Right-aligned caption control cluster (minimize, maximize/restore, close).
  * Draggable window region governed by `data-tauri-drag-region` with double-click maximize/restore toggle.
  * Centered launch positioning (`"center": true` in `tauri.conf.json`).

### 3.2 Cognitive Habit Notification Engine (`OkvirNotifier`)
* **Dual Dispatch Model:** Native OS notification dispatch via Tauri v2 Notification plugin IPC (`plugin:notification|notify`), with seamless fallback to Desktop Web Notification API and foreground in-app toasts (`<InAppNotificationToast />`).
* **Cognitive Habit Loops:**
  * *Duolingo-style Streak Defense:* Automated scheduled evaluation at 19:30 local time if the user has an active streak and has not yet studied today.
  * *Brilliant-style FSRS Calibration:* Alerts when spaced review queue reaches threshold ($\ge 3$ due cards).
* **Notification Center Popover:** Integrated titlebar action popover displaying persistent notification history, unread badge counter, category filters, and 1-click deep links.

### 3.3 GitHub Releases Auto-Updater & Community Telemetry
* **Semantic Versioning Checker:** Asynchronously queries GitHub Releases API (`zuikre/okvir/releases/latest`) on startup.
* **100% Zero-Telemetry Community Metrics:** Aggregates public release asset download counts directly from GitHub's unauthenticated API without any local telemetry transmission or tracking servers.
* **In-App Update Modal (`UpdateModal.tsx`):** Rich Markdown changelog viewer, 1-click platform installer download, copy-link button, and terminal install commands (`sudo dpkg -i`, `chmod +x`, PowerShell `Start-Process`, `open .dmg`).

### 3.4 Typed IPC Commands (`src-tauri/src/commands.rs` & `src/lib/tauri-bridge.ts`)
* `get_user_profile()`: Queries embedded SQLite in WAL mode (`~/.okvir/okvir.db`) returning user profile, XP, and streak.
* `complete_lesson(lesson_id, time_spent)`: Atomically updates `lesson_progress` state, awards XP, and records completion timestamp.
* `get_due_fsrs_cards()`: Fetches cards due for daily spaced review according to FSRS v5 schedules.
* `record_submission(payload)`: Saves code verification attempts and runtime metrics to `code_submissions`.
* `verify_chunk_signature(chunk_id, archive_bytes)`: Cryptographically checks Ed25519 Minisign signatures over seekable `.okvir` frames.
* `plugin:window|*`: Frameless window minimize, maximize, and close commands.

---

## 4. Layer 3: Dual Computational Sandbox (Pyodide & DuckDB Workers)

Okvir executes code client-side via dedicated Web Worker threads with zero network dependency:

```
┌─────────────────┐       postMessage({ type: 'EXECUTE', code })       ┌────────────────────────┐
│                 │ ─────────────────────────────────────────────────> │  Pyodide Worker Thread │
│ React UI Thread │                                                    │  (CPython 3.12 WASM)   │
│ (60 FPS Canvas) │ <───────────────────────────────────────────────── ├────────────────────────┤
│                 │       postMessage({ type: 'RESULT', stdout })      │  DuckDB Worker Thread  │
└─────────────────┘                                                    │  (v1.28.0 In-Memory SQL│
         │                                                             └────────────────────────┘
         │  SharedArrayBuffer interruptBuffer[0] = 2 (SIGINT)                       │
         └──────────────────────────────────────────────────────────────────────────┘
```

### Key Capabilities
1. **Zero UI Thread Blocking:** Intensive NumPy matrix multiplications, Scikit-learn fits, or DuckDB relational queries run off-thread with 0.0% main UI frame drops.
2. **5-Second Infinite Loop Hard Watchdog (PRD Section 3.1 & 16.2):** Automatic watchdog timer terminates trapped kernels (e.g. `while True:` or cubic loops) after 5000ms, respawns a clean worker instance, and restores linear memory without corrupting user state.
3. **Non-Destructive Interrupt Protocol:** A 4-byte `SharedArrayBuffer` interrupt signal raises `KeyboardInterrupt` / SIGINT in Python's evaluation loop without killing the worker.
4. **Persistent OPFS Mount:** Origin Private File System mounted at `/workspace` permits persistent CSV reads and model artifact writes.
5. **Headless Matplotlib AGG Interceptor:** Headless AGG canvas captures calls to `plt.show()` and transmits them to the UI as Base64-encoded PNGs.
6. **DuckDB WebAssembly Engine (v1.28.0):** Seeded with enterprise relational tables (`employees`, `orders`, `departments`) for full SQL:2016 analytical queries, Window Functions (`OVER (PARTITION BY ...)`), Recursive CTEs, and aggregation challenges.
7. **Offline AST Micro-Evaluator:** Zero-dependency AST assertion evaluator parsing user code structure and test cases, eliminating auto-pass loopholes when CDN is disconnected.

---

## 5. Layer 4: Tactical Canvas, Roadmap, Audio & Telemetry Engines

### 5.1 24 Tactile 60 FPS Algorithmic Simulation Engines
Okvir integrates **24 dedicated simulation lab engines** mapping 97 unique simulation environments across the curriculum with zero unhandled fallbacks:

| # | Engine Component | Mathematical / Algorithmic Core | Tactile Mechanics |
| - | :--- | :--- | :--- |
| **1** | `LinearRegressionResiduals` | Ordinary Least Squares (OLS), FWL, Robust SE | Rotating regression line & shrinking $(y_i - \hat{y}_i)^2$ squares |
| **2** | `KNNRadar` | K-Nearest Neighbors, Metric Trees & ROC/AUC | Concentric radar scan wave, elastic neighbor tethers & voting donut |
| **3** | `GradientDescentCanvas` | Loss Manifolds, Contours, Chains & Curvature | 3D quadratic bowl, particle trajectory ribbons, $\eta$ & $\beta$ sliders |
| **4** | `KMeansVoronoi` | K-Means Clustering, PCA & Manifolds | Gliding centroids over 400ms & dynamic Voronoi cell boundary morphing |
| **5** | `DecisionTreeLaser` | Binary Axis-Aligned Recursive Partitions & GBDT | Orthogonal laser knife-cuts with spark particles minimizing Gini impurity |
| **6** | `VectorGeometryCanvas` | Euclidean Vector Spaces, Subspaces & Determinants | Interactive vector dragging, angle arcs & orthogonal projections |
| **7** | `BayesFrequencyTree` | Prior Odds, Likelihood & Posterior Updates | 10,000-person flow diagram with interactive disease prevalence sliders |
| **8** | `NeuralActivationCanvas` | Non-Linear Activation Functions & Sigmoids | Weight & bias knobs, dead-ReLU detector, Sigmoid, Tanh, LeakyReLU |
| **9** | `AttentionHeatmapCanvas` | Scaled Dot-Product Self-Attention & Transformers | Query, Key, Value matrix heatmaps with live pronoun coreference |
| **10** | `ConvolutionFilterCanvas` | 2D Spatial Convolutions, Kernels & Pooling | Sliding 3×3 kernel filter (Sobel, Blur, Edge) over 6×6 pixel grids |
| **11** | `RegularizationGeometryCanvas`| Ridge ($L_2$) vs Lasso ($L_1$) Sparsity | Expanding OLS loss contours striking the sharp corners of the $L_1$ diamond |
| **12** | `SimpsonsParadoxLab` | Causal Confounding, DAGs, DiD & RDD | Stratified cohort toggles, subgroup OLS lines, and cluster drag physics |
| **13** | `AnscombesQuartetLab` | Exploratory Data Analysis & Outliers | Real-time interactive point drag updating OLS line & HUD stats across 4 sets |
| **14** | `EigenHunterCanvas` | Eigenvalues, Spectral Theorem & SVD | Rotary probe vector dial hunting for non-rotating axes $Av = \lambda v$ |
| **15** | `GaltonBoardCltLab` | Central Limit Theorem (CLT) & Binomials | Triangular peg quincunx physics drops assembling empirical Gaussian bell curve |
| **16** | `InstrumentalVariablesLab` | Causal DAG, 2SLS, LATE & Synthetic Controls | Interactive causal DAG, relevance/exogeneity sliders & 2-stage regression |
| **17** | `AutogradGraphLab` | OkvirGrad Reverse-Mode Autograd DAG | Interactive computational DAG tracking forward values and reverse chain rule |
| **18** | `BpeTokenizerLab` | Byte-Pair Encoding (BPE) Subword Tokenizer | Character-level split, bigram frequency ranking, and greedy token merges |
| **19** | `FlashAttentionTilingLab` | FlashAttention-2 SRAM Memory Tiling | High-bandwidth HBM to low-latency SRAM block tiling & online softmax accumulator |
| **20** | `RotaryEmbeddingLab` | Rotary Position Embeddings (RoPE) | Multi-frequency 2D orthogonal Givens rotation planes preserving relative distance |
| **21** | `LoRADecompositionLab` | Low-Rank Adaptation (LoRA / QLoRA) | Weight freezing $W_0 \in \mathbb{R}^{d \times k}$ and rank-$r$ intrinsic adapter factorization $BA$ |
| **22** | `EnvironmentFrameCanvas` | CPython Memory, References, Scopes & Protocols | Dynamic stack frames, heap allocations, pointer aliasing, closures & refcounts |
| **23** | `DynamicArrayGrowthLab` | Geometric Vector Allocation, SIMD & Relational | Geometric buffer doubling ($0 \to 4 \to 8$), stride alignments & relational transforms |
| **24** | `HashTableInternalsCanvas` | Hash Table Buckets, Probing & Collision Entropy | Compact table array indexing, collision resolution & perturbation probing |

* **Render-on-Change:** Animations only run during user interaction or active physics snapping (`requestAnimationFrame`). Idle CPU sits strictly at `0.0%`.
* **Path Batching & Zero GC:** Dynamic elements compile into batch paths before dispatching strokes; pre-allocated buffers avoid GC latency spikes.
* **Beat 2 Interactive Formula Scrubbers:** Mathematical parameters in KaTeX formulas render as live Bret Victor interactive scrubbers updating simulations and derivations in real-time.

### 5.2 Organic Multi-Harmonic Serpentine Roadmap & Inward Signposts
The primary roadmap navigation (`SkillTree.tsx` & `SkillNodeComponent.tsx`) renders an organic, non-linear terrain path:
* **Multi-Harmonic Terrain Curve:** Node $X$-positions follow an organic multi-wave terrain equation:
  $$
  X(i) = 50\% + A_1 \sin(\omega_1 i) + A_2 \sin(\omega_2 i + \phi_2) + A_3 \sin(\omega_3 i + \phi_3)
  $$
  with natural amplitude clamping to ensure waystations remain centered within comfortable viewport bounds.
* **Inward-Facing Lateral Signpost Cards:** Waystation titles, time estimates, and track badges are rendered as dedicated signpost cards (`w-36 sm:w-48`) positioned strictly laterally (`labelPosition='left' | 'right'`) based on the road's lateral coordinate:
  - If node $x > 50\%$, the card renders to the **left** (pointing inward).
  - If node $x \le 50\%$, the card renders to the **right** (pointing inward).
  - Directional connector notches point directly at the milestone node, with zero text-over-node collisions.
* **Vertical Spatial Budgeting:** Calibrated pacing (`ROW_HEIGHT = 150px`) provides generous breathing room, preventing overlap between adjacent road bends.

### 5.3 Responsive Action & Prerequisite Cards
Prerequisite badges, lesson summary dialogs, and sandbox action buttons implement fluid responsive design:
* **Responsive Flex Direction:** Cards utilize `flex-col sm:flex-row` with `max-w-xl` to prevent narrow button squeezes.
* **Overflow Protection:** Lesson titles and metadata employ `min-w-0 flex-1 break-words`, ensuring zero text truncation or clipping.
* **Mobile-Optimized Touch Targets:** Action buttons stretch to full width on compact viewports (`w-full sm:w-auto`) for thumb-friendly ergonomics.

### 5.4 Hardware Power Governor & Dynamic Frame Rate Throttling
The desktop presentation layer incorporates an active hardware energy monitor (`src/lib/powerGovernor.ts`):
* **Battery Telemetry Integration:** Listens to the Battery Status API (`navigator.getBattery()`) for charging status and discharge levels.
* **Dynamic Frame Rate Throttling:** Under low battery conditions (<25% without AC connection), the engine drops simulation render loops from 60 FPS to 30 FPS (`TARGET_FPS = 30`), cutting GPU draw calls by 50% to preserve battery life and suppress thermal throttling.
* **Direct Canvas Loop Integration:**
  * *`GaltonBoardCltLab.tsx`:* Plinko rigid 2D physics loop queries `powerGovernor.getTargetFrameInterval()` on each `requestAnimationFrame` tick, dynamically throttling animation and physics steps from 16.67ms to 33.3ms when on battery saver.
  * *`LinearRegressionResiduals.tsx`:* Spring-based OLS optimization snap animation checks the target frame interval before advancing cubic easing steps.
* **Titlebar Telemetry HUD:** Displays live battery percentage, AC power status, target frame interval (16.67ms vs 33.3ms), and governor status. Accessible via `Ctrl+Shift+H` / `Cmd+Shift+H`.

### 5.5 Complete Vector Iconography & Zero-Emoji Rigor
Okvir adheres to strict instrument-grade aesthetics:
* **Zero Emojis:** Elimination of cartoonish emoji symbols across all UI views, status indicators, and Web Worker execution logs.
* **Authentic SVG Logos:** Language toolchains and kernels display authentic vector SVG marks (Python, JavaScript, C, Rust, Java, R).
* **Semantic Vector Icons:** All UI status states, navigation controls, and actions leverage crisp Lucide React vector icons.

### 5.6 Procedural Web Audio API Synthesizer
Okvir contains zero recorded audio MP3/WAV assets. Every sound is synthesized on-the-fly using the Web Audio API (`src/lib/audio.ts`):
* **Mechanical Click:** 10ms damped triangle wave (1200Hz ➔ 300Hz) with 8ms subtle haptic pulse.
* **Success Chord:** Pentatonic overtone triad: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz) decaying over 350ms.
* **Milestone Fanfare:** Ascending harmonic arpeggio (440Hz, 554Hz, 659Hz, 880Hz).
* **Error Tick:** 50ms downward sawtooth ramp (180Hz ➔ 60Hz).

### 5.7 Real-Time Hardware Telemetry HUD (<350MB RAM Budget)
Pinned directly in the title bar is an instrument-grade Hardware Telemetry monitor (PRD Section 2.2 & 16):
* **Live Framerate & Budget Monitor:** Measures actual `requestAnimationFrame` deltas against the 16.67ms 60 FPS budget (averaging 0.28ms per frame).
* **RAM Allocation Breakdown:** Tracks estimated resident memory against the 350MB ceiling (Rust backend ~18MB, WebView ~85MB, JS DOM ~28MB, Pyodide WASM ~100MB, Canvas ~22MB).
* **Linear Memory Recycling:** Provides one-click worker termination and reinstatement to return WASM linear memory to the operating system.

### 5.8 2-Tier Adaptive Faded Scaffolding & Code Challenge Engine
Beat 3 integrates an adaptive, distraction-free code editor (`FadedScaffoldCodeEditor.tsx`):
* **Tier 1: Guided Skeleton (`Guided Skeleton / القالب التوجيهي`):** Fill-in-the-blank critical algorithmic expressions and parameters with structural guardrails, per-blank validation (emerald/rose visual cues), and toggleable blank-level hints. Includes an instant *"Skip to full editor ➔"* bypass. Once verified, the completed code automatically pre-populates Tier 2.
* **Tier 2: Autonomous Lab (`Autonomous Lab / المختبر المستقل`):** Full Monaco/CodeMirror editor running user code directly against automated unit test assertions in client-side Pyodide or DuckDB WASM.
* **Streamlined Focus:** Parsons reordering has been deliberately eliminated to minimize syntactic manipulation friction and guide learners directly into writing and executing vectorized code.

### 5.9 Bret Victor Live Reactive Math & Universal Invariant Goal Engine
* **Bidirectional `<KaTeXMath />` & `<ReactiveFormulaAnnotator />` (Beat 2):** Mathematical equations feature live reactive symbol pills and automatic DOM token tagging. Hovering or clicking decomposes symbols into functional classes (`parameter`, `observation`, `loss`, `hyperparameter`), linked to the reactive store (`useFormulaAnchorStore`), which simultaneously triggers glowing blooming halos on matching 2D/3D simulation canvas entities. Conversely, hovering over simulation model tokens highlights the corresponding equation symbol.
* **Universal 125-Lesson `<TargetedGoalManipulator />` (Beat 1 / Section 3):** Real-time goal-directed invariant challenges across all 125 lessons (e.g. Gauss-Markov BLUE error orthogonality, KNN bias-variance tradeoff calibration, Lipschitz step-size bounds, Pythagorean norms, unit determinants, and attention temperature) featuring an interactive tactile slider scrubber, real-time proximity gauge ($\Delta$ error delta), and celebratory procedural audio harmonics.

### 5.10 100% Acyclic Prerequisite DAG Topology
* **166 Validated Acyclic Directed Edges:** The 125-node global dependency graph is strictly acyclic with 0 cycles.
* **Semantic Slugs:** All legacy shorthand identifiers have been canonicalized into semantic slugs (`dot-product-geometry`, `numpy-strides-zero-copy`), ensuring clean constellation graph rendering and reliable unlock progression.

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

### 7.1 Modular On-Demand Curriculum Distribution Architecture
* **Pre-bundled Core (Track 1):** Track 1 (*Mathematical Foundations*, 29 lessons) is pre-bundled in the primary application bundle so first launch requires 0MB download and zero network latency.
* **On-Demand Secondary Tracks (Tracks 2–4):** Tracks 2 (*Programming*), 3 (*Econometrics*), and 4 (*Deep Learning*) are packaged as modular `.okvir` containers that can be streamed, re-synced, or verified on demand.
* **Settings Module Manager (`SettingsView.tsx`):**
  * Live storage footprint inspection per track.
  * *Integrity Verification:* Computes SHA-256 TOC hash and Ed25519 signature checks in real-time.
  * *Export Track Container:* 1-click generation and browser download of signed `.okvir` binaries for offline air-gapped distribution.
  * *Import Offline Container:* Local file picker for importing and unpacking `.okvir` packages with full cryptographic trailer validation.

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

## 9. Framework CLI & Decentralized Community Registry

Per PRD Section 15, Okvir features a decentralized registry and authoring CLI (`bin/okvir.js`):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COMMUNITY ECOSYSTEM ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. FRAMEWORK CLI (okvir-cli):                                              │
│     • `okvir init my-course`      Scaffold curriculum repository            │
│     • `okvir dev`                 Live-reload interactive lesson previewer  │
│     • `okvir test [dir]`          Execute unit tests & Zod lint checks      │
│     • `okvir pack [dir] [out]`    Compile seekable .okvir archive & minisig │
│     • `okvir verify <file.okvir>` Cryptographic integrity & trailer check   │
│     • `okvir registry [query]`    Decentralized community pack explorer     │
├─────────────────────────────────────────────────────────────────────────────┤
│  2. DECENTRALIZED GITHUB SPARSE REGISTRY (okvir-registry):                  │
│     • Community packs are submitted via Pull Request to `okvir/registry`.   │
│     • Zero database backend: Registry is a flat git repository of JSONs.    │
│     • Assets are hosted directly on the author's personal GitHub Releases.  │
├─────────────────────────────────────────────────────────────────────────────┤
│  3. SECURITY & SANDBOXING GUARANTEES:                                       │
│     • Interactive widgets execute in an isolated Web Worker / opaque sandbox│
│     • Zero access to host Node.js / Rust filesystem APIs.                   │
│     • Python code executes strictly inside the Pyodide WebAssembly sandbox. │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*Okvir is designed from first principles to provide lifelong, zero-friction, sovereign machine learning mastery.*
