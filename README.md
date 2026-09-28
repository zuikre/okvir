<div align="center">

# OKVIR (إطار)
### The Open-Source, Interactive Desktop Framework for Learning Data Science, Econometrics & AI from the Ground Up

[![CI / CD Status](https://img.shields.io/badge/CI%2FCD-Passing-10b981.svg?style=flat-square&logo=githubactions&logoColor=white)](.github/workflows/ci.yml)
[![Release](https://img.shields.io/badge/release-v1.0.0-emerald.svg?style=flat-square)](https://github.com/zuikre/okvir/releases)
[![License: MIT or Apache-2.0](https://img.shields.io/badge/Engine-MIT%20%7C%20Apache--2.0-3b82f6.svg?style=flat-square)](LICENSE-MIT)
[![Curriculum: CC-BY-SA 4.0](https://img.shields.io/badge/Curriculum-CC--BY--SA%204.0-f59e0b.svg?style=flat-square)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Platforms](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-8b5cf6.svg?style=flat-square)](#-download--installation)
[![Language](https://img.shields.io/badge/Language-English%20%7C%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-ec4899.svg?style=flat-square)](#-bilingual-experience-english--العربية)
[![Tauri v2](https://img.shields.io/badge/Built%20With-Tauri%20v2%20%2B%20Rust%201.80-ef4444.svg?style=flat-square&logo=tauri&logoColor=white)](https://tauri.app/)
[![Python WASM](https://img.shields.io/badge/Python-CPython%203.12%20(Pyodide%20WASM)-eab308.svg?style=flat-square&logo=python&logoColor=white)](https://pyodide.org/)
[![Contrast](https://img.shields.io/badge/Accessibility-WCAG%20AAA%20(≥7:1)-14b8a6.svg?style=flat-square)](#-instrument-grade-design-system)

<p align="center">
  <strong>Zero DevOps Setup. 100% Local-First. 60 FPS Visual Physics. Procedural Web Audio. Bilingual EN/AR. Under 28MB.</strong>
</p>

[**Download Desktop App**](https://github.com/zuikre/okvir/releases) • [**Architecture Specs**](ARCHITECTURE.md) • [**Curriculum Guide**](CURRICULUM_SPEC.md) • [**Contributing**](CONTRIBUTING.md)

</div>

---

## ⚡ The Zero DevOps Manifesto

Most people don’t quit Machine Learning because the mathematics is too difficult.

They quit because on **Day 1**, they spend 4 hours wrestling with Anaconda environment conflicts, broken `$PATH` configurations, incompatible GCC toolchains, and corrupt CUDA drivers before writing a single line of working code.

And when they finally get Python running? They are met with passive 45-minute video lectures and blackboard proofs that treat linear algebra like an abstract memorization drill instead of geometric intuition.

**Okvir (إطار)** eliminates the DevOps tax on learning forever.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             THE OKVIR SYNTHESIS                             │
├──────────────────────────────┬──────────────────────────────┬───────────────┤
│    BRILLIANT PEDAGOGY        │      DUOLINGO RETENTION      │  TAURI + WASM │
│ • Geometric intuition first  │ • 5-to-8 min micro-lessons   │ • <28MB base  │
│ • Reactive parameter sliders │ • Non-linear DAG tech tree   │ • 0s dev setup│
│ • 60fps algorithm animations │ • FSRS v5 spaced repetition  │ • 100% local  │
│ • "Touch the math" physics   │ • Non-childish streaks & XP  │ • 0-telemetry │
└──────────────────────────────┴──────────────────────────────┴───────────────┘
```

When you learn Linear Regression in Okvir, you don't memorize the OLS equation. You **drag the slope handle**, watch the residual error squares physically shrink at 60 frames per second, and write the 3-line NumPy vectorization that proves it.

---

## 🚀 Download & Installation

### One-Liner Quick Install

#### Linux & macOS
```bash
curl -fsSL https://raw.githubusercontent.com/zuikre/okvir/main/install.sh | bash
```

#### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/zuikre/okvir/main/install.ps1 | iex
```

### Local Development from Source
```bash
# 1. Clone the repository
git clone https://github.com/zuikre/okvir.git
cd okvir

# 2. Install dependencies
npm install

# 3. Start local development server (Vite + Web Worker WASM)
npm run dev

# 4. Or launch the native desktop shell (requires Rust 1.80+)
npm run tauri dev
```

---

## 🔬 Comparison Matrix: Why Okvir Wins

| Feature / Dimension | Brilliant.org | Duolingo | Jupyter / Colab | Coursera / Udemy | **OKVIR (إطار)** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pricing** | $150+/year paywall | Freemium (Ads) | Free | $49–$79/month | **100% Free & Open-Source** |
| **Setup Friction** | Zero (Web) | Zero (Mobile) | Severe (Local envs) | Moderate | **Zero (One-click desktop)** |
| **Python Execution** | None (Abstract) | None | Full (Raw notebook) | Browser sandbox | **Full Local WASM (Pyodide)** |
| **Pedagogical Loop** | Visual Sliders | Gamified Drilling | None (Passive doc) | Video lectures | **4-Beat Tactile Micro-Loop** |
| **Deep AI Math** | Light / Broad | None | Code-only | Dense equations | **Geometric + Industrial Rigor** |
| **Audio & Haptics** | None | Recorded SFX | None | None | **Procedural Web Audio API** |
| **Privacy / Offline** | Cloud-only | Cloud-only | Cloud-reliant | Cloud-only | **100% Local-First & Offline** |
| **Community Extensibility**| Closed | Closed | Open (Files only) | Closed | **Open Git-Based Registry** |

---

## 🎯 The 4-Beat Cognitive Learning Loop

Every lesson in Okvir strictly adheres to Cognitive Load Theory ($4 \pm 1$ working memory limit) and executes the **4-Beat Micro-Loop**:

```
[Beat 1: Tactile Slider] ──> [Beat 2: Formal Math] ──> [Beat 3: Vectorized Code] ──> [Beat 4: Transfer Quiz]
  "Touch the physics"           "KaTeX Strict LTR"         "NumPy in Pyodide WASM"     "Socratic Hint Ladder"
```

1. **Beat 1: Tactile Intuition Slider:** Explore geometry, distributions, and dynamics *before* seeing any formal notation.
2. **Beat 2: Formal Mathematical Anchor:** The KaTeX equation appears; terms dynamically highlight when hovering over slider parameters.
3. **Beat 3: Interactive Code Scratchpad:** Implement the 2-to-3 line computational kernel in Python (Pyodide WASM) or DuckDB SQL.
4. **Beat 4: Reality Transfer Challenge:** Solve an adversarial edge case or inverted scenario to solidify cognitive schema formation.

### 3-Tier Socratic Hint Ladder `[H]`
Never get stuck. Press `H` at any time to reveal a 3-tier scaffolding ladder:
* **Tier 1 (Metacognitive Nudge):** Prompts you to think about edge behaviors and mathematical relationships.
* **Tier 2 (Structural Scaffolding):** Deconstructs the problem into intermediate mathematical sub-goals.
* **Tier 3 (Bottom-Out Solution):** Complete solution with deep conceptual explanation.

---

## 🌌 The 4 Foundational Curriculum Tracks

Okvir features **23 core modules** across 4 interconnected tracks:

```
                  ┌───────────────────────────────┐
                  │ 📐 MATHEMATICAL FOUNDATIONS   │
                  │ • Vectors as Geometry         │
                  │ • Dot Product & Projections   │
                  │ • The Gradient Vector         │
                  │ • Bayes' Theorem & Priors     │
                  │ • Eigenvalues & Eigenvectors  │
                  │ • Central Limit Theorem (CLT) │
                  └──────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌──────────────────────────────┐┌──────────────────────────────┐
  │ 💻 PROGRAMMING & DATA        ││ 📈 ECONOMETRICS & ML         │
  │ • SIMD NumPy Vectorization   ││ • OLS Residual Geometry      │
  │ • Columnar DataFrame Anatomy ││ • KNN Search Radar           │
  │ • SQL Window Functions       ││ • K-Means Voronoi Tessellation│
  │ • EDA & Anscombe's Quartet   ││ • Decision Tree Laser Cuts   │
  └──────────────┬───────────────┘│ • L1 vs L2 Regularization    │
                 │                │ • Causal Confounding (Simpson)│
                 │                │ • Instrumental Variables 2SLS │
                 │                └──────────────┬───────────────┘
                 │                               │
                 └───────────────┬───────────────┘
                                 ▼
                  ┌───────────────────────────────┐
                  │ 🧠 DEEP LEARNING & MODERN AI  │
                  │ • Perceptrons & Activations   │
                  │ • 3D Loss Manifolds & Momentum│
                  │ • Spatial 2D Convolutions     │
                  │ • Transformer Self-Attention  │
                  │ • OkvirGrad Reverse Autograd  │
                  │ • Byte-Pair Encoding (BPE)    │
                  └───────────────────────────────┘
```

---

## 🎨 Tactile 60 FPS Algorithmic Visualizations

Okvir includes **18 dedicated, zero-garbage-collection interactive simulation engines**:

| # | Simulation Engine | Algorithm / Mathematical Principle | Interactive Mechanics |
| - | :--- | :--- | :--- |
| **1** | `LinearRegressionResiduals` | Ordinary Least Squares (OLS) | Rotating regression line & shrinking $(y_i - \hat{y}_i)^2$ squares |
| **2** | `KNNRadar` | K-Nearest Neighbors & Metric Spaces | Concentric radar scan wave, elastic neighbor tethers & voting donut |
| **3** | `GradientDescentCanvas` | Loss Manifolds & Heavy-Ball Momentum | 3D quadratic bowl, particle trajectory ribbons, $\eta$ & $\beta$ sliders |
| **4** | `KMeansVoronoi` | K-Means Clustering & Lloyd's Algorithm | Gliding centroids over 400ms & dynamic Voronoi cell boundary morphing |
| **5** | `DecisionTreeLaser` | Binary Axis-Aligned Recursive Partitions | Orthogonal laser knife-cuts with spark particles minimizing Gini impurity |
| **6** | `VectorGeometryCanvas` | Euclidean Vector Spaces & Span | Interactive vector dragging, angle arcs & orthogonal projections |
| **7** | `BayesFrequencyTree` | Prior Odds, Likelihood & Posterior Updates | 10,000-person flow diagram with interactive disease prevalence sliders |
| **8** | `NeuralActivationCanvas` | Non-Linear Activation Functions | Weight & bias knobs, dead-ReLU detector, Sigmoid, Tanh, LeakyReLU |
| **9** | `AttentionHeatmapCanvas` | Scaled Dot-Product Self-Attention | Query, Key, Value matrix heatmaps with live pronoun coreference |
| **10** | `ConvolutionFilterCanvas` | 2D Spatial Convolutions & Feature Maps | Sliding 3×3 kernel filter (Sobel, Blur, Edge) over 6×6 pixel grids |
| **11** | `RegularizationGeometryCanvas`| Ridge ($L_2$) vs Lasso ($L_1$) Sparsity | Expanding OLS loss contours striking the sharp corners of the $L_1$ diamond |
| **12** | `SimpsonsParadoxLab` | Causal Confounding & Stratification | Stratified cohort toggles, subgroup OLS lines, and cluster drag physics |
| **13** | `AnscombesQuartetLab` | Exploratory Data Analysis & Outliers | Real-time interactive point drag updating OLS line & HUD stats across 4 sets |
| **14** | `EigenHunterCanvas` | Eigenvalues & Invariant Directions | Rotary probe vector dial hunting for non-rotating axes $Av = \lambda v$ |
| **15** | `GaltonBoardCltLab` | Central Limit Theorem (CLT) & Binomials | Triangular peg quincunx physics drops assembling empirical Gaussian bell curve |
| **16** | `InstrumentalVariablesLab` | Causal DAG, Endogeneity & 2SLS | Interactive causal DAG, relevance/exogeneity sliders & 2-stage regression |
| **17** | `AutogradGraphLab` | OkvirGrad Reverse-Mode Autograd | Interactive computational DAG tracking forward values and reverse chain rule |
| **18** | `BpeTokenizerLab` | Byte-Pair Encoding (BPE) Subword Tokenizer | Character-level split, bigram frequency ranking, and greedy token merges |

---

## 🎹 Procedural Web Audio API Synthesizer

Okvir contains **zero recorded audio files (0 MP3/WAV assets)**. All auditory feedback is synthesized mathematically in real time via the browser Web Audio API:
* **Mechanical Click:** 10ms damped triangle wave (1200Hz ➔ 300Hz) with 8ms subtle haptic pulse.
* **Success Chime:** Pentatonic overtone triad: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz) decaying smoothly.
* **Milestone Fanfare:** Ascending harmonic arpeggio (440Hz, 554Hz, 659Hz, 880Hz).
* **Boundary Error Tick:** 50ms downward sawtooth ramp (180Hz ➔ 60Hz).

---

## 🌐 Bilingual Experience: English & العربية

Okvir treats **Arabic (العربية)** alongside English as a first-class language:
* **Bidirectional Layout via CSS Logical Properties:** Sidebars, progress trees, and drawers mirror seamlessly when switching languages.
* **Strict LTR Isolation for Math & Code:** Formulas ($\text{SSR} = \sum e_i^2$) and Python blocks remain strictly Left-to-Right within Arabic narrative flow to prevent inverted operators or transposed parentheses.
* **Typographic Hierarchy:** `Inter Display` for English, `IBM Plex Sans Arabic` for Arabic narrative, and `JetBrains Mono` for code variables.

---

## ⌨️ Keyboard-First Ergonomics

Inspired by **Raycast and Linear.app**, every core action in Okvir is accessible via keyboard shortcuts:

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| `⌘K` / `Ctrl+K` | **Universal Command Palette** | Fuzzy search across all 23 modules, settings, and simulations |
| `⌘↵` / `Ctrl+Enter` | **Run Code** | Execute Python challenge in Pyodide WASM worker |
| `H` | **Socratic Hint** | Cycle through Tier 1 ➔ Tier 2 ➔ Tier 3 hints |
| `Space` | **Next Beat** | Advance to next beat in the 4-Beat Micro-Loop |
| `Escape` | **Close Modal** | Dismiss command palette, drawers, or dialogs |

---

## ⚙️ Architecture & Technical Specifications

```
OKVIR DESKTOP CLIENT
├── Native Desktop Shell (Tauri v2 / Rust 1.80+)
│   ├── Window management (Windows Mica / macOS Vibrancy / Linux Wayland)
│   ├── Package Manager (.okvir seekable Zstandard archives)
│   ├── Cryptography: Ed25519 Minisign verification
│   └── Storage: Embedded SQLite engine (WAL mode)
├── Presentation Layer (React 18/19 / Vite / Tailwind CSS)
│   ├── Command Center: Raycast action bar & Cmd+K palette
│   ├── Typographic Math: KaTeX with strict LTR isolation
│   ├── Procedural Audio: Web Audio API mathematical synthesizer
│   └── 60 FPS Visual Canvas: HTML5 2D Canvas + WebGL
└── In-App Execution Sandbox (Dedicated Web Worker)
    ├── WebAssembly CPython 3.12 (Pyodide v0.26+)
    ├── Non-destructive interrupt buffer (SharedArrayBuffer)
    ├── Offline wheels: NumPy, Pandas, Scikit-learn, SciPy
    └── Origin Private File System (OPFS) / MEMFS mounts
```

### Concrete Benchmarks (Intel Core i3, 4GB RAM)
* **Base Installer Size:** `< 28 MB` (vs. 160MB+ for Electron apps)
* **Cold Startup Time:** `< 480 ms`
* **Idle RAM Footprint:** `< 50 MB`
* **Active Simulation RAM:** `< 250 MB` (with Pyodide + NumPy loaded)
* **Idle CPU Utilization:** `0.0%` (demand-driven animation loops)

For exhaustive technical blueprints, read our [System Architecture Guide](ARCHITECTURE.md).

---

## 🛠️ Framework CLI (`okvir-cli`)

Okvir ships with a dedicated developer CLI for authoring, linting, and compiling community curriculum modules:

```bash
# Scaffold a new interactive course repository
node ./bin/okvir.js init my-course

# Validate all .okvir.md lesson schemas and AST directives
npm test

# Compile lessons into a seekable .okvir archive with Ed25519 signature
node ./bin/okvir.js pack ./curriculum ./dist/course.okvir
```

For authoring guidelines, see our [Curriculum Authoring Specification](CURRICULUM_SPEC.md).

---

## 🛡️ Security & Privacy

* **100% Offline & Local-First:** All progress, code submissions, and spaced repetition intervals are stored in local SQLite. Zero tracking, zero telemetry.
* **WASM Sandboxing:** Python executes strictly inside a sandboxed Web Worker without host filesystem access.
* **Cryptographic Signing:** Curriculum packs are signed with Ed25519 `minisign` keys.

For vulnerability reporting, see [SECURITY.md](SECURITY.md).

---

## 📜 Licensing

* **Application Engine (Rust, Tauri, React, Simulators):** Dual-licensed under [MIT](LICENSE-MIT) OR [Apache-2.0](LICENSE-APACHE).
* **Pedagogical Curriculum & Educational Assets:** Licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

---

## 👨‍💻 Founder & Architectural Vision

**Zakarya Roubhi (روبحي زكرياء)**  
*Data Scientist • Valedictorian MSc Data Science (ESE Oran) • Co-Founder & CTO of Podacium*  
*Founder & Benevolent Dictator for Life (BDFL) of Okvir*

> *"Let’s build the next generation of data scientists on intuition, not memorization."*

---

<div align="center">
  <sub>Built with precision for students, researchers, and engineers worldwide.</sub><br>
  <sub>⭐ Star us on GitHub to support free, open-source AI education!</sub>
</div>
