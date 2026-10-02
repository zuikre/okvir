# Contributing to OKVIR

Thank you for your interest in contributing to **Okvir**! Okvir is an open-source, interactive desktop framework for learning Data Science, Econometrics, and AI from first principles.

We believe that mastering STEM concepts should be driven by **geometric intuition, interactive simulation, and immediate programming feedback**, free from DevOps setup friction and passive video lectures.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Our Architectural Philosophy](#our-architectural-philosophy)
3. [Ways to Contribute](#ways-to-contribute)
4. [Local Development Setup](#local-development-setup)
5. [Authoring Interactive Curriculum (.okvir.md)](#authoring-interactive-curriculum-okvirmd)
6. [Building 60 FPS Canvas Simulations](#building-60-fps-canvas-simulations)
7. [Bilingual Guidelines (English & Arabic)](#bilingual-guidelines-english--arabic)
8. [Testing & Quality Verification](#testing--quality-verification)
9. [Git Commit Conventions & Pull Requests](#git-commit-conventions--pull-requests)

---

## Code of Conduct

All contributors and community participants are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to **roubhizakarya@gmail.com**.

---

## Our Architectural Philosophy

When contributing to Okvir, keep our core principles in mind:

1. **Zero DevOps Tax:** The learner should never spend hours configuring toolchains. Everything runs out of the box via WebAssembly and Tauri.
2. **The 4-Beat Micro-Loop & Intuition-First Pedagogy:** Every lesson must follow:  
   `[1. Tactile Simulation & Jargon Decoder]` ➔ `[2. Reactive KaTeX Anchor & Derivation]` ➔ `[3. 2-Tier Code Lab (Skeleton & Autonomous)]` ➔ `[4. Authentic Reality Transfer Challenge]`.
3. **Instrument-Grade Neo-Minimalism (Anti-"AI Slop"):**
   * Dense, professional information hierarchy inspired by **Linear.app, Raycast, and Zed Editor**.
   * Zero glowing purple blobs, zero childish cartoon mascots, zero bubbly rounded buttons.
   * High-contrast mathematical semantic palette with $\ge 7:1$ WCAG AAA contrast.
   * All dynamic numerical counters use `tabular-nums` to eliminate layout jitter.
4. **Performance First:** 60 FPS simulations must use demand-driven render loops (0% idle CPU), single-path batching, and zero garbage collection in `requestAnimationFrame`.

---

## Ways to Contribute

* **Curriculum Authors:** Write new micro-lessons in `.okvir.md` covering linear algebra, causal inference, time series, or reinforcement learning.
* **Interactive Simulation Developers:** Create new tactile HTML5 Canvas or WebGL visualizers for complex algorithms.
* **Translators:** Help improve our Arabic (العربية) translations or add support for French (Français) and other languages.
* **Rust & Desktop Engineers:** Optimize the Tauri v2 desktop shell, SQLite WAL database, and `.okvir` chunk package manager.
* **Bug Hunters:** Identify edge cases in Python WASM execution, RTL layout mirroring, or window resizing.

---

## Local Development Setup

### Prerequisites
* **Node.js:** v20.x or higher
* **npm:** v10.x or higher
* **Rust:** 1.80+ (optional, only required if compiling the native Tauri desktop binary)

### 1. Clone & Install
```bash
git clone https://github.com/zuikre/okvir.git
cd okvir
npm install
```

### 2. Launch Development Server
```bash
# Starts Vite local preview server with Hot Module Replacement (HMR)
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build & Run Desktop App (Tauri v2)
```bash
npm run tauri dev
```

---

## Authoring Interactive Curriculum (.okvir.md)

All official lessons live in the `curriculum/` directory:
```
curriculum/
├── track-1-math/
├── track-2-programming/
├── track-3-econometrics/
└── track-4-deeplearning/
```

Lessons are written in an enhanced Markdown DSL with YAML frontmatter:

```markdown
---
id: "my-algorithm-concept"
version: "1.0.0"
title: "The Geometry of My Algorithm"
track: "econometrics"
module: "module-05"
estimated_minutes: 6
prerequisites: ["ols-residual-geometry"]
i18n:
  ar: "هندسة الخوارزمية التفاعلية"
---

# The Geometry of My Algorithm

Introductory pedagogical prose introducing the concept...

:::simulation-widget{engine="canvas2d" component="MyAlgorithmCanvas"}
---
param_alpha: 0.5
param_beta: 1.2
---
:::

The formal mathematical objective is given by:

$$
\min_{\theta} \sum_{i=1}^n (y_i - f(x_i; \theta))^2 + \lambda \|\theta\|_2^2
$$

:::python-challenge{id="py-my-algorithm"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[1, 2], [3, 4]])"
    expected: "0.45"
---
```python
import numpy as np

def compute_loss(X: np.ndarray, y: np.ndarray) -> float:
    # Vectorized calculation
    return float(np.mean((X @ w - y) ** 2))
```
:::
```

### CLI Scaffolding & Validation
You can use the built-in `okvir` CLI to scaffold and test lessons:
```bash
# Validate AST directives, frontmatter, and test cases across all lessons
npm test

# Scaffold a new course repository
node ./bin/okvir.js init my-new-course

# Compile lessons into a seekable .okvir archive
node ./bin/okvir.js pack ./curriculum ./dist/course.okvir
```

---

## Building 60 FPS Canvas Simulations

When creating a new simulation component in `src/components/simulation/`:

1. **Demand-Driven Render Loops:** Only trigger `requestAnimationFrame` when parameters change, during mouse drags, or when an active spring animation is playing.
2. **Batching:** Use single `ctx.beginPath()` / `ctx.stroke()` or `ctx.fill()` calls. For example, batch all residual squares into a single path call:
   ```typescript
   ctx.beginPath();
   points.forEach(({ x, y }) => {
     // compute box geometry...
     ctx.rect(cx, sqY, sidePx, sidePx);
   });
   ctx.fill(); // Single draw call for all N squares!
   ```
3. **Zero Garbage Collection:** Do not allocate objects or arrays inside the RAF loop. Reuse pre-allocated arrays (`Float32Array`).
4. **Theme Reactivity:** Observe `useOkvirStore().theme` and adjust canvas colors for both Dark Charcoal (`#09090b`) and Light Paper (`#fcfcfc`).
5. **High-DPI Support:** Always scale canvas dimensions by `window.devicePixelRatio`.

---

## Bilingual Guidelines (English & Arabic)

Okvir treats Arabic as a first-class citizen alongside English:
1. Provide bilingual translations in `src/lib/i18n.ts` for all new UI buttons, labels, and modals.
2. Provide Arabic translations in the `titleAr` and `narrative.ar` fields of `src/lib/curriculum.ts`.
3. **Strict Math & Code Isolation:**
   * General prose renders Right-to-Left (RTL) in Arabic mode.
   * **All mathematical formulas and Python code must remain strictly Left-to-Right (`<div dir="ltr" className="text-left font-mono">`)**. Never let mathematical operators ($+$, $-$, $\sum$) invert their visual positions.

---

## Testing & Quality Verification

Before submitting any Pull Request, ensure that all quality gates pass cleanly:

```bash
# 1. TypeScript Strict Typechecking
npm run typecheck

# 2. ESLint Static Analysis & React Hooks Rules
npm run lint

# 3. Curriculum DSL Schema & AST Verification
npm test

# 4. Production Asset Compilation
npm run build
```

---

## Git Commit Conventions & Pull Requests

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat: add 3D PCA covariance manifold simulation`
* `fix: prevent residual square clipping on high-DPI screens`
* `docs: enhance FSRS v5 forgetting curve explanation`
* `perf: eliminate GC allocation in Voronoi tessellation loop`
* `chore: upgrade Tauri dependencies to v2.0 stable`

### Pull Request Checklist
- [ ] Code compiles cleanly with `npm run typecheck`.
- [ ] Lint passes with zero errors: `npm run lint`.
- [ ] Curriculum tests pass: `npm test`.
- [ ] Build succeeds: `npm run build`.
- [ ] Tested in both **Dark Mode** and **Light Mode**.
- [ ] Tested in both **English** and **Arabic (العربية)**.
- [ ] All math formulas and code blocks are isolated in `<div dir="ltr">`.

Thank you for helping democratize machine learning education worldwide!
