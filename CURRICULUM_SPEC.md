# OKVIR (إطار): Curriculum DSL & Authoring Specification

> **Specification Version:** `1.0.0-DSL`  
> **Format Extension:** `.okvir.md`  
> **Parser Implementation:** `src/lib/dsl.ts` & `bin/okvir.js`  

---

## 1. Overview

Okvir courses are defined using **Curriculum Markdown (`.okvir.md`)**. This human-readable DSL combines standard GitHub-flavored Markdown with:
1. **YAML Frontmatter:** Module metadata, dependencies, time estimates, and Arabic metadata.
2. **Interactive Simulation Directives (`:::simulation-widget`):** Live 2D/3D physics widgets.
3. **Formal KaTeX Math Anchors (`$$ ... $$`):** Reactive LaTeX equations isolated in LTR.
4. **Python Challenge Containers (`:::python-challenge`):** Self-grading in-browser coding exercises.

---

## 2. File Organization

Courses are organized hierarchically:

```
my-course/
├── course.json                 # Course-level manifest
└── lessons/
    ├── 01-intro-geometry.okvir.md
    ├── 02-projections.okvir.md
    └── 03-gradient-descent.okvir.md
```

### `course.json` Manifest
```json
{
  "name": "econometrics-masterclass",
  "version": "1.0.0",
  "title": "Econometrics & Causal Inference",
  "titleAr": "الاقتصاد القياسي والاستدلال السببي",
  "author": "Zakarya Roubhi",
  "license": "CC-BY-SA 4.0",
  "modules": [
    "01-intro-geometry.okvir.md",
    "02-projections.okvir.md"
  ]
}
```

---

## 3. Lesson File Anatomy (`.okvir.md`)

Each `.okvir.md` file corresponds to a single 5-to-8 minute micro-lesson and implements the **4-Beat Micro-Loop**:

```markdown
---
id: "ols-residual-geometry"
version: "1.0.0"
title: "The Geometry of Squared Residuals"
track: "econometrics"
module: "module-03"
estimated_minutes: 6
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "هندسة البواقي المربعة"
---

# The Geometry of Squared Residuals

## Beat 1: Tactile Intuition
Drag the slope and intercept handles to observe how each individual residual square physically contracts:

:::simulation-widget{engine="canvas2d" component="LinearRegressionResiduals"}
---
initial_slope: 0.25
initial_intercept: 4.0
points_count: 25
show_squares: true
---
:::

## Beat 2: Formal Mathematical Anchor
The sum of squared residuals objective function is defined as:

$$
\text{SSR}(m, b) = \sum_{i=1}^N \big(y_i - (m x_i + b)\big)^2
$$

We square each error term to quadratically penalize massive outliers while guaranteeing a convex, differentiable loss surface.

## Beat 3: Interactive Python Scratchpad
Implement the vectorized sum-of-squares calculation in NumPy:

:::python-challenge{id="py-ssr-vectorized"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([2.0, 4.0]); y_hat = np.array([1.0, 3.0])"
    expected: "2.0"
  - input: "y = np.zeros(5); y_hat = np.zeros(5)"
    expected: "0.0"
---
```python
import numpy as np

def compute_squared_loss(y: np.ndarray, y_hat: np.ndarray) -> float:
    # Single vectorized line without slow for-loops
    residuals = y - y_hat
    return float(np.sum(residuals ** 2))
```
:::

## Beat 4: Reality Transfer Challenge
Why do we minimize squared residuals ($L_2$) instead of absolute deviations ($L_1$)?

* [ ] $L_1$ loss completely ignores outliers.
* [x] $L_2$ loss provides an analytical closed-form solution (Normal Equations) and smooth gradients everywhere.
* [ ] $L_1$ loss is computationally impossible to compute on modern GPUs.
```

---

## 4. AST Directives Reference

### 4.1 Simulation Widget (`:::simulation-widget`)
Binds an interactive 60 FPS HTML5 Canvas or WebGL engine into the lesson:

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `engine` | string | Rendering engine: `"canvas2d"` or `"webgl"` |
| `component` | string | Component identifier from `src/components/simulation/` |

**Supported Core Components:**
* `LinearRegressionResiduals`: Rotating regression line & shrinking error squares
* `KNNRadar`: Pulsing radar scanner with elastic neighbor tethers
* `GradientDescentCanvas`: 3D/contour surface with heavy-ball momentum
* `KMeansVoronoi`: Real-time Voronoi polygon cell morphing
* `DecisionTreeLaser`: Orthogonal feature plane laser knife-cuts
* `VectorGeometryCanvas`: Interactive vector dragging and projection
* `BayesFrequencyTree`: Natural frequency icon array flow chart
* `NeuralActivationCanvas`: Interactive weights, bias, and dead-neuron detector
* `AttentionHeatmapCanvas`: Query-Key-Value matrix attention map
* `ConvolutionFilterCanvas`: 3×3 spatial convolution sliding window
* `RegularizationGeometryCanvas`: OLS loss contours striking L1 diamond / L2 circle
* `SimpsonsParadoxLab`: Cohort stratification vs pooled regression and omitted variable bias
* `AnscombesQuartetLab`: Francis Anscombe's 4 identical summary statistics datasets with real-time point dragging
* `EigenHunterCanvas`: Rotary dial hunting for invariant directions $Av = \lambda v$ and characteristic roots
* `GaltonBoardCltLab`: Triangular peg quincunx physics drops demonstrating the Central Limit Theorem
* `InstrumentalVariablesLab`: Causal DAG with endogeneity, 2-Stage Least Squares (2SLS), and Wald estimator
* `AutogradGraphLab`: OkvirGrad computational graph DAG with forward pass and reverse-mode backpropagation
* `BpeTokenizerLab`: Byte-Pair Encoding subword tokenizer visualizer with greedy merge rule extraction

### 4.2 Python Challenge (`:::python-challenge`)
Executes self-grading unit tests in the Pyodide WebAssembly worker:

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique challenge identifier |
| `timeout_ms` | number | Execution timeout before SIGINT cancellation (default: 3000ms) |
| `test_cases` | array | List of input expressions and expected stringified outputs |

---

## 5. Linting & Validation

The Okvir CLI validates all curriculum files against this specification:

```bash
# Run validation across all curriculum directories
npm test
```

### Validation Rules Enforced:
1. `id` and `title` must be non-empty strings.
2. YAML frontmatter must be enclosed in valid `---` boundaries.
3. Every lesson must contain at least one KaTeX math block (`$$ ... $$`).
4. Every `:::python-challenge` directive must include a `test_cases:` array.
5. All Python starter code blocks must be syntactically valid CPython 3.12.
