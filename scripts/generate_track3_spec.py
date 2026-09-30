# scripts/generate_track3_spec.py
"""
Generates the comprehensive Track 3 (Econometrics & Classical ML)
Code Challenge & Assertion Architecture Specification for OKVIR.
"""
import os
import sys

def build_spec():
    doc = []
    
    doc.append("""# OKVIR Track 3: Econometrics & Classical ML
## Comprehensive In-Browser Sandboxed Python Code Challenge & Assertion Specification

> **Specification Version:** `1.0.0-PROD`  
> **Target Environment:** Pyodide 0.26+ (WebAssembly / Web Worker)  
> **Execution Budget:** < 800ms CPU execution time, < 350MB heap allocation  
> **Assertion Engine:** Strict numerical tolerance via `np.testing.assert_allclose(actual, expected, rtol=1e-5, atol=1e-7)`  
> **Diagnostic Standard:** 4-Part Rust/Elm-grade actionable feedback (`What`, `Where`, `Why`, `How`)  
> **Curriculum Scope:** Track 3 (17 Modules: MOD-18 to MOD-34, 33 Lessons: LESSON-T3-01 to LESSON-T3-33)

---

## Table of Contents
1. [Architectural Overview & Pyodide Sandboxing Guidelines](#1-architectural-overview--pyodide-sandboxing-guidelines)
2. [Module 18: Ordinary Least Squares & Residual Geometry (LESSON-T3-01 & T3-02)](#2-module-18-ordinary-least-squares--residual-geometry)
3. [Module 19: Gauss-Markov & Robust Heteroskedasticity (LESSON-T3-03 & T3-04)](#3-module-19-gauss-markov--robust-heteroskedasticity)
4. [Module 20: Multiple Regression & FWL Partialling Out (LESSON-T3-05 & T3-06)](#4-module-20-multiple-regression--fwl-partialling-out)
5. [Module 21: Omitted Variable Bias (OVB) Geometry (LESSON-T3-07 & T3-08)](#5-module-21-omitted-variable-bias-ovb-geometry)
6. [Module 22: Rubin Potential Outcomes & Selection Bias (LESSON-T3-09 & T3-10)](#6-module-22-rubin-potential-outcomes--selection-bias)
7. [Module 23: Graphical Causal Models (DAGs & Colliders) (LESSON-T3-11 & T3-12)](#7-module-23-graphical-causal-models-dags--colliders)
8. [Module 24: Instrumental Variables & 2SLS (LATE) (LESSON-T3-13 & T3-14)](#8-module-24-instrumental-variables--2sls-late)
9. [Module 25: Panel Data Methods: Fixed vs Random Effects (LESSON-T3-15 & T3-16)](#9-module-25-panel-data-methods-fixed-vs-random-effects)
10. [Module 26: Difference-in-Differences: DiD & Staggered (LESSON-T3-17 & T3-18)](#10-module-26-difference-in-differences-did--staggered)
11. [Module 27: Regression Discontinuity Design: Sharp & Fuzzy (LESSON-T3-19 & T3-20)](#11-module-27-regression-discontinuity-design-sharp--fuzzy)
12. [Module 28: Synthetic Control Methods & Permutation Tests (LESSON-T3-21 & T3-22)](#12-module-28-synthetic-control-methods--permutation-tests)
13. [Module 29: Regularization Geometry: Ridge vs Lasso (LESSON-T3-23 & T3-24)](#13-module-29-regularization-geometry-ridge-vs-lasso)
14. [Module 30: Discriminative Classification & IRLS (LESSON-T3-25 & T3-26)](#14-module-30-discriminative-classification--irls)
15. [Module 31: Support Vector Machines & Kernel Hilbert Spaces (LESSON-T3-27)](#15-module-31-support-vector-machines--kernel-hilbert-spaces)
16. [Module 32: Decision Trees & Ensemble Methods: Random Forests (LESSON-T3-28 & T3-29)](#16-module-32-decision-trees--ensemble-methods-random-forests)
17. [Module 33: Gradient Boosted Trees: GBM & XGBoost (LESSON-T3-30 & T3-31)](#17-module-33-gradient-boosted-trees-gbm--xgboost)
18. [Module 34: Unsupervised Manifolds: PCA & t-SNE (LESSON-T3-32 & T3-33)](#18-module-34-unsupervised-manifolds-pca--t-sne)
19. [Verification Matrix & Benchmarks](#19-verification-matrix--benchmarks)

---

## 1. Architectural Overview & Pyodide Sandboxing Guidelines

### 1.1 The In-Browser WASM Execution Environment
Okvir executes user Python code inside a dedicated Web Worker via **Pyodide** (`src/workers/PyodideKernelWorker.ts`). This guarantees:
- **Zero Cloud Latency:** All matrix operations and regressions execute locally at bare-metal speed using WebAssembly-compiled BLAS/LAPACK.
- **Process Isolation:** Broken loops or segmentation faults in C-extensions terminate within the Web Worker without hanging the main 60 FPS UI thread.
- **Resource Clamping:** Web Worker memory is constrained to 350MB heap. Tasks exceeding 3000ms total wall time or 800ms active CPU compute time receive a soft `SIGINT` interruption.

### 1.2 Numerical Assertion Protocol
All challenges enforce strict double-precision validation:
```python
np.testing.assert_allclose(actual, expected, rtol=1e-5, atol=1e-7)
```
- Floating-point discrepancies caused by algebraic rearrangement (e.g. $(X^T X)^{-1} X^T y$ vs `np.linalg.solve`) are accommodated within $10^{-7}$ absolute tolerance.
- Structural properties (idempotence, orthogonality, symmetry, and rank) are directly verified on residual and projection matrices.

### 1.3 Pedagogical 4-Part Diagnostic Model
When an assertion or runtime exception occurs, the AST parser and diagnostic engine map errors into four actionable fields:
1. **WHAT:** Plain-English explanation of the failure symptom without confusing compiler jargon.
2. **WHERE:** Exact line number, code snippet, and variable identifier.
3. **WHY:** Conceptual breakdown of the underlying statistical or algebraic misconception.
4. **HOW:** Immediate, concrete algorithmic remedy with code scaffolding.

---
""")
    return doc

if __name__ == "__main__":
    print("Base header ready")
