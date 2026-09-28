<div align="center">

# OKVIR (إطار)
### The Open-Source, Interactive Desktop Framework for Learning Data Science, Econometrics & AI from the Ground Up

[![Release](https://img.shields.io/badge/release-v1.0.0-emerald.svg?style=flat-square)](https://github.com/okvir-org/okvir/releases)
[![License: MIT or Apache-2.0](https://img.shields.io/badge/Engine-MIT%20%7C%20Apache--2.0-blue.svg?style=flat-square)](LICENSE-MIT)
[![Curriculum: CC-BY-SA 4.0](https://img.shields.io/badge/Curriculum-CC--BY--SA%204.0-orange.svg?style=flat-square)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Platforms](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-purple.svg?style=flat-square)](#download--installation)
[![Language](https://img.shields.io/badge/Language-English%20%7C%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-amber.svg?style=flat-square)](#bilingual-experience-en--ar)
[![Tauri v2](https://img.shields.io/badge/Built%20With-Tauri%20v2%20%2B%20Rust-red.svg?style=flat-square)](https://tauri.app/)
[![Python WASM](https://img.shields.io/badge/Python-CPython%203.12%20(Pyodide%20WASM)-yellow.svg?style=flat-square)](https://pyodide.org/)

<p align="center">
  <strong>Zero DevOps Setup. 100% Local-First. 60 FPS Visual Physics. Bilingual EN/AR. Under 28MB.</strong>
</p>

</div>

---

## ⚡ The Zero DevOps Manifesto

Most people don’t quit Machine Learning because the math is too hard.

They quit because on **Day 1**, they spend 4 hours wrestling with Anaconda environments, broken PATH configurations, incompatible GCC toolchains, and conflicting CUDA drivers before writing a single line of working code.

And when they finally get Python running? They are met with passive 45-minute video lectures and blackboard proofs that treat linear algebra like a memorization drill instead of geometric intuition.

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

When you learn Linear Regression in Okvir, you don't memorize OLS formulas. You **drag the slope handle**, watch the residual error squares physically shrink at 60 frames per second, and write the 3-line NumPy vectorization that proves it.

---

## 🚀 Quickstart & One-Liner Install

### Linux & macOS
```bash
curl -fsSL https://okvir.dev/install.sh | bash
```

### Windows (PowerShell)
```powershell
irm https://okvir.dev/install.ps1 | iex
```

### Local Development from Source
```bash
# Clone the repository
git clone https://github.com/okvir-org/okvir.git
cd okvir

# Install frontend dependencies
npm install

# Start development server
npm run dev

# Or run desktop app via Tauri v2 (Rust 1.80+)
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
| **Privacy / Offline** | Cloud-only | Cloud-only | Cloud-reliant | Cloud-only | **100% Local-First & Offline** |
| **Community Extensibility**| Closed | Closed | Open (Files only) | Closed | **Open Git-Based Registry** |

---

## 🎯 The 4-Beat Cognitive Learning Loop

Every lesson in Okvir strictly adheres to Cognitive Load Theory ($4 \pm 1$ working memory limit) and executes the **4-Beat Micro-Loop**:

```
[Beat 1: Tactile Slider] ──> [Beat 2: Formal Math] ──> [Beat 3: Vectorized Code] ──> [Beat 4: Transfer Quiz]
  "Touch the physics"           "KaTeX Strict LTR"         "NumPy in Pyodide WASM"     "Socratic Hint Ladder"
```

1. **Beat 1: Tactile Intuition Slider:** Explore geometry and dynamics *before* seeing formulas.
2. **Beat 2: Formal Mathematical Anchor:** KaTeX formula appears; variables dynamically link to slider values.
3. **Beat 3: Interactive Code Scratchpad:** Implement the 2-to-3 line computational kernel in Python / DuckDB.
4. **Beat 4: Transfer Challenge:** Solve an adversarial edge case or inverted scenario to solidify schema formation.

### 3-Tier Socratic Hint Ladder `[H]`
Never get stuck. Press `H` at any time to reveal a 3-tier scaffolding ladder:
* **Tier 1 (Metacognitive Nudge):** Prompts you to think about edge behaviors and relationships.
* **Tier 2 (Structural Scaffolding):** Deconstructs the problem into intermediate mathematical sub-goals.
* **Tier 3 (Bottom-Out Solution):** Complete solution with deep conceptual explanation.

---

## 🌌 The 4 Foundational Curriculum Tracks

Okvir features 16 meticulously engineered modules across 4 interconnected tracks:

### 📐 Track 1: Mathematical Foundations
* **1.1 Vectors as Geometry:** Directional displacements, span, and Euclidean magnitude.
* **1.2 Dot Product & Projection:** Geometric shadow projection ($u \cdot v = \|u\| \|v\| \cos\theta$) and orthogonality.
* **1.3 The Gradient Vector:** Contour maps, steepest ascent vectors, and multivariate surfaces.
* **1.4 Bayes' Theorem:** Base rate fallacy, disease testing frequency tree, and prior-to-posterior update.

### 💻 Track 2: Programming & Data Foundations
* **2.1 High-Performance NumPy Vectorization:** SIMD contiguous memory striding vs Python for-loops.
* **2.2 The DataFrame Anatomy:** Columnar block memory layout, tidy data, and relational algebra.
* **2.3 Analytical SQL Window Functions:** `ROW_NUMBER()`, `RANK()`, `LAG()`, and rolling partitions in DuckDB-WASM.

### 📈 Track 3: Econometrics & Classical Machine Learning
* **3.1 OLS Residual Geometry:** Rotating regression line with shrinking geometric residual squares $(y_i - \hat{y}_i)^2$.
* **3.2 K-Nearest Neighbors (KNN):** Pulsing search radar, elastic neighbor tethers, and voting donut.
* **3.3 K-Means Clustering:** Real-time morphing Voronoi polygon cell boundaries.
* **3.4 Decision Trees & Impurity:** Glowing laser knife-cuts slicing feature space by Gini impurity.
* **3.5 Ridge & Lasso Regularization:** Elliptical OLS loss contours striking the sharp corners of the L1 diamond (sparsity).

### 🧠 Track 4: Deep Learning & Modern AI Foundations
* **4.1 Perceptron & Activation Functions:** Interactive response curves, dead-ReLU visualizer, and non-linear boundaries.
* **4.2 Gradient Descent Dynamics:** Particle rolling down 3D loss surface with heavy-ball momentum ribbons.
* **4.3 CNN & Spatial 2D Convolutions:** Sliding kernel filters (Sobel, Edge Detect, Blur) producing feature maps.
* **4.4 Transformer Multi-Head Self-Attention:** Query, Key, Value matrix heatmaps and coreference resolution.

---

## 🎨 Tactile 60 FPS Algorithmic Visualizations

Okvir includes 11 dedicated, zero-garbage-collection interactive simulation engines:

1. **Linear Regression:** Rotating OLS line & shrinking residual error squares
2. **K-Nearest Neighbors (KNN):** Pulsing search radar & voting donut
3. **3D Gradient Descent:** Heavy-ball particle rolling down non-convex loss manifolds
4. **K-Means Clustering:** Real-time Voronoi tessellation and cell morphing
5. **Decision Trees:** Rectangular laser knife-cuts across feature space
6. **Vector Geometry:** Interactive vector dragging, angle measurement, and orthogonal projections
7. **Bayes Frequency Tree:** 10,000-population flow diagram with interactive prevalence sliders
8. **Neural Activation:** Interactive weights, bias, and dead-neuron detector across 5 activation functions
9. **Self-Attention Heatmap:** Interactive multi-head attention matrix resolving pronouns
10. **2D Spatial Convolution:** Sliding 3×3 kernel over 6×6 pixel grids showing inner-product arithmetic
11. **L1 vs L2 Regularization Geometry:** Tangency between loss contours and L1 diamond / L2 circle

---

## 🌐 Bilingual Experience: English & العربية

Okvir treats **Arabic (العربية)** alongside English as a first-class citizen:
* **Bidirectional Layout via CSS Logical Properties:** Sidebars, progress trees, and drawers mirror seamlessly.
* **Strict LTR Isolation for Math & Code:** Formulas ($\text{Loss} = \sum e_i^2$) and Python blocks remain strictly Left-to-Right within Arabic narrative flow to prevent inverted operators or transposed parentheses.
* **Typographic Harmony:** `Inter Display` for English, `IBM Plex Sans Arabic` for Arabic narrative, and `JetBrains Mono` for code variables.

---

## ⚙️ Architecture & Technical Specifications

```
OKVIR DESKTOP CLIENT
├── Native Desktop Shell (Tauri v2 / Rust 1.80+)
│   ├── Window management (Windows Mica / macOS Vibrancy / Linux Wayland)
│   ├── Package Manager (.okvir seekable Zstandard archives)
│   ├── Cryptography: Ed25519 Minisign verification
│   └── Storage: Embedded SQLite engine (WAL mode)
├── Presentation Layer (React 19 / Vite / Tailwind CSS v4)
│   ├── Command Center: Raycast action bar & Cmd+K palette
│   ├── Typographic Math: KaTeX with strict LTR isolation
│   └── 60 FPS Visual Canvas: HTML5 2D Canvas + WebGL
└── In-App Execution Sandbox (Dedicated Web Worker)
    ├── WebAssembly CPython 3.12 (Pyodide v0.26+)
    ├── Offline wheels: NumPy, Pandas, Scikit-learn, SciPy
    └── Origin Private File System (OPFS) / MEMFS mounts
```

### Concrete Benchmarks (Intel Core i3, 4GB RAM)
* **Base Installer Size:** `< 28 MB` (vs. 160MB+ for Electron apps)
* **Cold Startup Time:** `< 480 ms`
* **Idle RAM Footprint:** `< 50 MB`
* **Active Simulation RAM:** `< 250 MB` (with Pyodide + NumPy loaded)
* **Idle CPU Utilization:** `0.0%` (demand-driven animation loops)

---

## 🛠️ Framework CLI (`okvir-cli`)

Okvir ships with a dedicated developer CLI for authoring, linting, and compiling community curriculum modules:

```bash
# Scaffold a new interactive course repository
npm run cli -- init my-course

# Validate all .okvir.md lesson schemas and AST directives
npm run cli -- test curriculum

# Compile lessons into seekable .okvir archive with Ed25519 signature
npm run cli -- pack curriculum dist/course.okvir
```

---

## 📜 Licensing Strategy

* **Application Engine (Rust, Tauri, React, Simulators):** Dual-licensed under [MIT](LICENSE-MIT) OR [Apache-2.0](LICENSE-APACHE).
* **Pedagogical Curriculum & Educational Assets:** Licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

---

## 👨‍💻 Founder & Architectural Vision

**Zakarya Roubhi (روبحي زكرياء)**  
*Data Scientist • Valedictorian MSc Data Science (ESE Oran) • Co-Founder & CTO of Podacium*  
*Founder & Benevolent Dictator for Life (BDFL) of Okvir*

> *"Let’s build the next generation of data scientists on intuition, not memorization."*
