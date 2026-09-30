# OKVIR Track 3: Econometrics & Classical Machine Learning
## Visual & Interactive Simulation Master Specification
**Specification Version:** `3.0.0-PRO-SIM`  
**Target Modules:** `MOD-18` through `MOD-34` (17 Modules, 33 Lessons)  
**Author:** Track 3 Visual & Simulation Architect  
**Platform Engine:** Okvir Pro Workbench (React 19 + TypeScript + Canvas2D / WebGL2 + Procedural Web Audio API)

---

## 1. Executive Architectural Blueprint

Track 3 of **OKVIR** bridges the gap between pure linear algebra/calculus and empirical causal inference and statistical learning. Econometrics and classical machine learning are fundamentally **geometric disciplines**:
- **Ordinary Least Squares** is an orthogonal projection onto a regressor subspace $\text{col}(\mathbf{X})$.
- **Frisch-Waugh-Lovell** is sequential Gram-Schmidt orthogonalization.
- **Instrumental Variables** is a two-step subspace projection through an exogenous instrument axis $\mathbf{Z}$.
- **Difference-in-Differences** is counterfactual parallel trajectory extrapolation.
- **Regression Discontinuity** is a local linear limit jump at a threshold $c_0$.
- **Ridge and Lasso** are dual norm-ball contact manifolds with elliptical error contours.
- **Support Vector Machines** are hyperplanes maximizing margin separation with Mercer kernel lifts.
- **Decision Trees and Boosting** are recursive axis-aligned hyper-rectangle slicing and functional gradient residual chasing.
- **Manifold Learning** is non-linear preservation of neighborhood topology.

### 1.1 The 5-Point Simulation Contract
Every one of the 33 lessons in Track 3 implements a strict 5-point contract:
1. **Simulation Component Identifier:** PascalCase React/Canvas component with an explicit Data Generating Process (DGP) and mathematical state tuple.
2. **Coordinate System Mapping Pipeline:** High-precision bi-directional affine transformation (`dataToScreen`, `screenToData`), strict domain boundaries, retina scaling (`window.devicePixelRatio`), and real-time statistical diagnostics (Cook's distance halos $D_i$, leverage rings $h_{ii}$, leave-one-out $\hat{y}_{(-i)}$ ghost lines).
3. **Tactile Interactive Levers:** Direct-manipulation canvas handles, dual-slider scrubbers, DAG node state toggles, bandwidth zoom wheels, and parameter dials with physics-based damping and spring snaps.
4. **Real-Time Visual Feedback (60 FPS Floor):** Dynamic residual squares $(y_i - \hat{y}_i)^2$, perpendicular orthogonal projection drop-lines, shaded counterfactual confidence ribbons, collider red sparks, and Voronoi/tangency relaxation. Zero heap allocation during active scrub cycles.
5. **Procedural Web Audio Sonification Hooks:** Zero-latency mathematical sound generation via pure Web Audio oscillators and biquad filters:
   - *Orthogonal Snap Chord:* Pure harmonic fifth/major triad ($440 \to 660 \to 880\,\text{Hz}$) when $\langle \mathbf{X}, \mathbf{e} \rangle \to 0$ or loss hits global minimum.
   - *Tritone Dissonance Clash:* Diminished 5th cluster ($185\,\text{Hz}, 196\,\text{Hz}, 261.63\,\text{Hz}$) on endogeneity, omitted variable bias, conditioning on colliders, or parallel trend violations.
   - *Weak Instrument Staccato Siren:* Rapid pulsed warning tone ($880\,\text{Hz} \leftrightarrow 440\,\text{Hz}$) when first-stage $F < 10$.
   - *Continuous Loss Drone:* Frequency-modulated dual saw/triangle hum tracing parameter trajectory gradient magnitude $\|\nabla L\|$.

---

## 2. Global Mathematical & Rendering Primitives

```
┌────────────────────────────────────────────────────────────────────────┐
│               CANVAS COORDINATE TRANSFORM PIPELINE                     │
└────────────────────────────────────────────────────────────────────────┘
  Data Space (X, Y)  ──[ Affine Scaling ]──>  Normalized UV Space [0, 1]
                                                      │
                                             [ Invert Y & Add Margins ]
                                                      │
                                                      v
  Screen Space (px, py) <──[ HiDPI DPR Scale ]── Viewport Pixels (w, h)
```

### 2.1 The Canonical Coordinate Transformer
```typescript
export interface DomainBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export class CanvasCoordinateTransformer {
  constructor(
    public bounds: DomainBounds,
    public margins: Margins = { top: 28, right: 32, bottom: 36, left: 44 }
  ) {}

  public getPlotDimensions(width: number, height: number) {
    const plotW = Math.max(1, width - this.margins.left - this.margins.right);
    const plotH = Math.max(1, height - this.margins.top - this.margins.bottom);
    return { plotW, plotH };
  }

  public dataToScreen(x: number, y: number, width: number, height: number) {
    const { plotW, plotH } = this.getPlotDimensions(width, height);
    const ux = (x - this.bounds.xMin) / (this.bounds.xMax - this.bounds.xMin);
    const uy = (y - this.bounds.yMin) / (this.bounds.yMax - this.bounds.yMin);
    return {
      px: this.margins.left + ux * plotW,
      py: this.margins.top + (1 - uy) * plotH,
    };
  }

  public screenToData(px: number, py: number, width: number, height: number, clamp = true) {
    const { plotW, plotH } = this.getPlotDimensions(width, height);
    let ux = (px - this.margins.left) / plotW;
    let uy = 1 - (py - this.margins.top) / plotH;
    if (clamp) {
      ux = Math.max(0, Math.min(1, ux));
      uy = Math.max(0, Math.min(1, uy));
    }
    return {
      x: this.bounds.xMin + ux * (this.bounds.xMax - this.bounds.xMin),
      y: this.bounds.yMin + uy * (this.bounds.yMax - this.bounds.yMin),
    };
  }
}
```

### 2.2 Color Tokens & Diagnostic Styling
- **Accent Treatment / Active Regressor:** Electric Amber (`#f59e0b`, `rgba(245, 158, 11, 0.9)`)
- **Control Group / Exogenous Basis:** Cyber Sky (`#38bdf8`, `rgba(56, 189, 248, 0.9)`)
- **Fitted Subspace / Unbiased Estimate:** Emerald (`#10b981`, `rgba(16, 185, 129, 0.9)`)
- **Endogeneity / Bias / Collider Spike:** Crimson Alert (`#ef4444`, `rgba(239, 68, 68, 0.95)`)
- **Counterfactual Ghost / LOO Projection:** Lavender Ghost (`#a855f7`, `rgba(168, 85, 247, 0.45)`)
- **Background Grid & Axis Strata:** Deep Slate (`#0f172a`, borders `#334155`)

---

## 3. Comprehensive Lesson-by-Lesson Specification (33 Lessons)

```
================================================================================
TRACK 3 CATALOG MATRIX (MOD-18 TO MOD-34)
================================================================================
MOD-18: LESSON-T3-01 & T3-02  (Ordinary Least Squares & Residual Geometry)
MOD-19: LESSON-T3-03 & T3-04  (Gauss-Markov & Robust Heteroskedasticity)
MOD-20: LESSON-T3-05 & T3-06  (Multiple Regression & FWL Partialling Out)
MOD-21: LESSON-T3-07 & T3-08  (Omitted Variable Bias Geometry & Simpson's)
MOD-22: LESSON-T3-09 & T3-10  (Rubin Potential Outcomes & Selection Bias)
MOD-23: LESSON-T3-11 & T3-12  (Graphical Causal Models, DAGs & Colliders)
MOD-24: LESSON-T3-13 & T3-14  (Instrumental Variables & 2SLS LATE)
MOD-25: LESSON-T3-15 & T3-16  (Panel Data Methods: Fixed vs Random Effects)
MOD-26: LESSON-T3-17 & T3-18  (Difference-in-Differences & Staggered DiD)
MOD-27: LESSON-T3-19 & T3-20  (Regression Discontinuity Design: Sharp & Fuzzy)
MOD-28: LESSON-T3-21 & T3-22  (Synthetic Control Methods & Permutations)
MOD-29: LESSON-T3-23 & T3-24  (Regularization Geometry: Ridge vs Lasso)
MOD-30: LESSON-T3-25 & T3-26  (Discriminative Classification & IRLS)
MOD-31: LESSON-T3-27          (Support Vector Machines & Kernel Hilbert Spaces)
MOD-32: LESSON-T3-28 & T3-29  (Decision Trees & Random Forests)
MOD-33: LESSON-T3-30 & T3-31  (Gradient Boosted Trees & XGBoost 2nd-Order)
MOD-34: LESSON-T3-32 & T3-33  (Unsupervised Manifolds: PCA, t-SNE & UMAP)
================================================================================
```

---

### MODULE 18: Ordinary Least Squares & Residual Geometry

#### LESSON-T3-01: Bivariate OLS & The Geometry of Orthogonal Residuals
- **1. Component Identifier:** `LinearRegressionResiduals`
  - *Pedagogical Core:* Minimize the sum of squared vertical distances. The regression line acts as a mechanical beam balanced on the data centroid $(\bar{x}, \bar{y})$.
  - *Data Generating Process (DGP):* $y_i = \beta_0 + \beta_1 x_i + \varepsilon_i$, with $\beta_0 = 3.5, \beta_1 = 0.65, x_i \sim \text{Uniform}(1, 19), \varepsilon_i \sim \mathcal{N}(0, 1.8^2), n = 28$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* $x \in [0, 20]$, $y \in [0, 20]$. Aspect ratio locked $1:1$ for square error geometry.
  - *Margins:* Top 24px, Right 28px, Bottom 36px, Left 44px.
  - *Transforms:* $px = \text{left} + \frac{x - 0}{20} \cdot \text{plotW}$; $py = \text{top} + \left(1 - \frac{y - 0}{20}\right) \cdot \text{plotH}$.
  - *Diagnostics Overlay:*
    - Leverage $h_{ii} = \frac{1}{n} + \frac{(x_i - \bar{x})^2}{\sum (x_j - \bar{x})^2}$. Points with $h_{ii} > \frac{4}{n}$ render pulsating cyan leverage rings.
    - Cook's Distance $D_i = \frac{e_i^2}{2 \cdot \text{MSE}} \cdot \frac{h_{ii}}{(1 - h_{ii})^2}$. Influential points ($D_i > \frac{4}{n}$) receive outer crimson halo rings proportional to $\sqrt{D_i}$.
    - Leave-One-Out (LOO) Ghost Line: Hovering point $i$ renders the counterfactual regression line $\hat{y}_{(-i)}$ in dashed lavender.
- **3. Tactile Interactive Levers:**
  - *Direct Point Dragging:* Drag any scatter point $(x_i, y_i)$ in real time; regressions and leverage recalculate dynamically.
  - *Manual Slope/Intercept Lever:* Drag the slope handle at $x = 18$ or the intercept handle at $x = 0$.
  - *Auto-Snap to OLS Button:* Solves normal equations instantly, triggering a spring-damper animation of the line.
- **4. Real-Time Visual Feedback:**
  - *Dynamic Error Squares:* Vertical dropline $|y_i - \hat{y}_i|$ acts as one side of a semi-transparent square box shaded in Amber (`rgba(245, 158, 11, 0.15)` for under-prediction, `rgba(56, 189, 248, 0.15)` for over-prediction).
  - *Total Area Meter:* Live digital HUD showing $\text{SSR} = \sum e_i^2$ with contraction bar.
  - *Orthogonality Compass:* Vector dial showing $\langle \mathbf{x} - \bar{x}\mathbf{1}, \mathbf{e} \rangle$. Glows bright emerald when $| \langle \mathbf{x}, \mathbf{e} \rangle | < 10^{-4}$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Scrub Tick:* `audio.playScrubTick(velocity)` on handle drag.
  - *Orthogonal Snap Chord:* When user manually rotates the line into the OLS angle within $\pm 0.02$, trigger pure C-major triad chime ($523.25, 659.25, 783.99\,\text{Hz}$) with subtle haptic pulse `[10, 20]`.
  - *Continuous Loss Drone:* `audio.updateLoss(SSR)` dynamically pitch-shifts a 110Hz triangle drone down to 55Hz at minimum SSR.

---

#### LESSON-T3-02: Normal Equations & Column Space Projection $\mathbf{P}_X$
- **1. Component Identifier:** `ColumnSpaceProjection3D`
  - *Pedagogical Core:* The target vector $\mathbf{y} \in \mathbb{R}^n$ lives outside the subspace spanned by regressor columns. OLS drops a perpendicular plumb line onto $\text{Col}(\mathbf{X})$ via hat projection matrix $\mathbf{P}_X = \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1}\mathbf{X}^T$.
  - *Data Generating Process (DGP):* 3-observation geometric space: $\mathbf{x}_1 = [2, 1, 0]^T$, $\mathbf{x}_2 = [0, 1, 2]^T$, $\mathbf{y} = [3, 4, 1]^T$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* 3D isometric vector space $X \in [-1, 5], Y \in [-1, 5], Z \in [-1, 5]$.
  - *3D-to-2D Canvas Projection:*
    $$\begin{bmatrix} px \\ py \end{bmatrix} = \begin{bmatrix} \text{cx} \\ \text{cy} \end{bmatrix} + \mathbf{R}(\theta_{\text{azimuth}}, \phi_{\text{elevation}}) \begin{bmatrix} x \\ y \\ z \end{bmatrix} \cdot \text{scale}$$
  - *Subspace Plane Rasterization:* Parametric grid plane spanned by $\alpha \mathbf{x}_1 + \beta \mathbf{x}_2$ rendered with gradient grid lines.
- **3. Tactile Interactive Levers:**
  - *3D View Orbit Drag:* Pointer rotation of azimuth ($\theta \in [0, 2\pi]$) and elevation ($\phi \in [-\pi/3, \pi/3]$).
  - *Vector Head Dragging:* Pointer drag handle on target vector $\mathbf{y}$; plumb-line drops to the plane in real time.
  - *Colinearity Slider:* Adjust angle between $\mathbf{x}_1$ and $\mathbf{x}_2$ from $90^\circ$ (orthogonal) down to $2^\circ$ (near singular).
- **4. Real-Time Visual Feedback:**
  - *Orthogonal Plumb Drop:* Dashed neon crimson line connecting $\mathbf{y}$ to $\hat{\mathbf{y}} = \mathbf{P}_X \mathbf{y}$.
  - *Right-Angle Square Marker:* 3D oriented perpendicular symbol at projection foot $\hat{\mathbf{y}}$, rotating in perspective.
  - *Determinant Volume Box:* When $\mathbf{x}_1$ and $\mathbf{x}_2$ become collinear, the spanned parallelogram collapses, turning the plane surface into a flickering warning striped texture.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Perpendicular Plumb Snap:* Touching the exact orthogonal foot triggers an acoustic drop-sound (sine wave sweep $880 \to 220\,\text{Hz}$ with clean resonant bell chime).
  - *Singularity Detune:* As angle between regressors drops below $10^\circ$, an ominous sub-bass growl (dual detuned sawtooth $45\,\text{Hz} + 48\,\text{Hz}$) emerges, mimicking matrix singularity.

---

### MODULE 19: Gauss-Markov & Robust Heteroskedasticity

#### LESSON-T3-03: Gauss-Markov Theorem & BLUE Efficiency Frontier
- **1. Component Identifier:** `GaussMarkovEfficiencyLab`
  - *Pedagogical Core:* Among all linear unbiased estimators $\tilde{\boldsymbol{\beta}} = \mathbf{C}\mathbf{y}$, OLS achieves the minimum sampling variance: $\text{Var}(\tilde{\boldsymbol{\beta}}) - \text{Var}(\hat{\boldsymbol{\beta}}_{\text{OLS}}) \ge 0$ is positive semi-definite.
  - *Data Generating Process (DGP):* Monte Carlo universe: 500 repeated trials of sample size $n = 30$, true $\beta = 2.0$. Compares OLS weights $w_i^{\text{OLS}} = \frac{x_i - \bar{x}}{\sum (x - \bar{x})^2}$ against arbitrary linear weights $w_i^{\text{alt}}$.
- **2. Coordinate System Mapping Pipeline:**
  - *Dual Screen View:* Left panel: Scatter and weight distribution ($x \in [0, 10], w \in [-0.2, 0.2]$). Right panel: Sampling distribution density curves ($\hat{\beta} \in [0.5, 3.5], \text{pdf} \in [0, 2.5]$).
  - *Margins:* Top 20px, Right 20px, Bottom 30px, Left 40px each.
- **3. Tactile Interactive Levers:**
  - *Weight Curve Morph Handle:* Drag spline control points to alter estimator weights $w_i$ away from the optimal linear OLS ramp.
  - *Unbiasedness Constraint Toggle:* Forces $\sum w_i x_i = 1$ and $\sum w_i = 0$.
  - *Sample Generator Pulse Button:* Shoots 100 new synthetic datasets down the pipeline.
- **4. Real-Time Visual Feedback:**
  - *Variance Balloon:* Right-side bell curve dynamically widens or narrows. OLS distribution is pinned in emerald; alternative estimator renders in amber.
  - *Excess Variance Area:* Shaded crimson fill highlighting $[\text{Var}(\tilde{\beta}) - \text{Var}(\hat{\beta}_{\text{OLS}})]$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Efficiency Harmony:* As weights align with OLS, the frequency spectrum narrows into a pure pure-tone sine wave at $440\,\text{Hz}$.
  - *Variance Dissonance:* Widening variance introduces high-frequency white noise hiss directly scaled to estimator standard error.

---

#### LESSON-T3-04: Heteroskedastic Fan & Huber-White Robust Errors (HC0–HC3)
- **1. Component Identifier:** `HeteroskedasticityRobustLab`
  - *Pedagogical Core:* When error variance depends on $X$ ($\sigma_i^2 = \sigma^2 \cdot x_i^\alpha$), OLS remains unbiased but standard errors fail. Sandwich covariance $\mathbf{V}_{\text{robust}} = (\mathbf{X}^T \mathbf{X})^{-1} (\mathbf{X}^T \mathbf{\Omega} \mathbf{X}) (\mathbf{X}^T \mathbf{X})^{-1}$ repairs hypothesis inference.
  - *Data Generating Process (DGP):* $y_i = 1.0 + 0.8 x_i + \varepsilon_i$, with $\varepsilon_i \sim \mathcal{N}(0, (0.2 + \gamma x_i)^2)$, where $\gamma \in [0, 0.8]$ is user-controlled.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* $x \in [0, 20]$, $y \in [-5, 30]$.
  - *Confidence Funnel Rendering:* Hyperbolic confidence ribbons $\hat{y}(x) \pm 1.96 \cdot \text{SE}(x)$.
  - *HC Estimator Selector:* HC0 (White 1980), HC1, HC2 (leverage-adjusted $1 - h_{ii}$), HC3 (jackknife $(1 - h_{ii})^2$).
- **3. Tactile Interactive Levers:**
  - *Heteroskedastic Severity Dial:* Knob $\gamma \in [0.0, 1.0]$ controlling fan flare.
  - *Robust Estimator Toggle Pills:* `Classic OLS` vs `HC0` vs `HC1` vs `HC2` vs `HC3`.
  - *Outlier Leverage Pin:* Drag single observation at $x = 19.5$ to witness HC3 dramatically puffing the confidence interval.
- **4. Real-Time Visual Feedback:**
  - *Puffing Confidence Ribbons:* Classical OLS band (thin dashed gray) vs Robust sandwich band (thick glowing emerald translucent envelope).
  - *T-Statistic Risk Gauge:* Needle showing $t = \frac{\hat{\beta} - \beta_0}{\text{SE}}$. Flashes red whenever classical OLS would commit Type I false-positive rejection ($p < 0.05$ under false premise).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Fan Flare Static:* Increasing $\gamma$ introduces subtle low-level crackle synthesis (Poisson-timed clicks).
  - *Type I False Discovery Alarm:* Rapid warning pip ($987.77\,\text{Hz}$, B5) if classical $t$-stat exceeds $1.96$ while robust $t$-stat remains inside $[-1.96, 1.96]$.

---

### MODULE 20: Multiple Regression & FWL Partialling Out

#### LESSON-T3-05: Multivariate Hyperplanes & Multicollinearity Inflation
- **1. Component Identifier:** `MultivariatePlaneVifLab`
  - *Pedagogical Core:* Regressing $Y$ on correlated regressors $X_1, X_2$. When $\text{Corr}(X_1, X_2) \to 1$, the regression plane teeters precariously like a seesaw on a narrow ridge line; Variance Inflation Factor $\text{VIF}_j = \frac{1}{1 - R_j^2} \to \infty$.
  - *Data Generating Process (DGP):* $n = 60$. $X_1 \sim \mathcal{N}(10, 3^2)$, $X_2 = \rho X_1 + \sqrt{1 - \rho^2} \mathcal{N}(10, 3^2)$, $Y = 2 + 1.2 X_1 + 0.9 X_2 + \mathcal{N}(0, 2^2)$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* 3D space $X_1 \in [0, 20], X_2 \in [0, 20], Y \in [0, 45]$.
  - *Projection:* 3D orbit matrix projected onto WebGL canvas with interactive perspective frustum.
- **3. Tactile Interactive Levers:**
  - *Collinearity Slider $\rho$:* Adjust correlation from $0.00$ to $0.99$.
  - *Plane Tilt Perturbation Lever:* Nudge a single data point; watch the plane violently seesaw when $\rho > 0.9$.
  - *VIF Safety Threshold Notch:* Snaps to $\text{VIF} = 5.0$ and $\text{VIF} = 10.0$.
- **4. Real-Time Visual Feedback:**
  - *Seesaw Plane Instability:* Translucent 3D plane with fluttering normal vector arrow $\hat{\mathbf{n}} = [-\hat{\beta}_1, -\hat{\beta}_2, 1]^T$.
  - *Confidence Ellipsoid Balloon:* 2D projection of $(\beta_1, \beta_2)$ confidence ellipse expands into an elongated cigar.
  - *VIF Warning Dial:* Analog gauge sweeping from 1 (green) to 10+ (crimson alert with glowing radial sparks).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Wobble Frequency:* Plane vibration modulates a low frequency oscillator (LFO 2Hz to 25Hz) over an analog drone.
  - *VIF > 10 Alarm:* Piercing electronic two-tone siren ($1046.5\,\text{Hz} \leftrightarrow 1318.5\,\text{Hz}$).

---

#### LESSON-T3-06: Frisch-Waugh-Lovell (FWL) Residual Projection
- **1. Component Identifier:** `FWLPartiallingOutLab`
  - *Pedagogical Core:* The multiple regression coefficient $\hat{\beta}_1$ in $Y = \beta_1 X_1 + \beta_2 X_2 + \varepsilon$ is algebraically identical to bivariate regression of $\tilde{Y}$ on $\tilde{X}_1$, where both have been purged of $X_2$ via annihilator matrix $\mathbf{M}_2 = \mathbf{I} - \mathbf{X}_2(\mathbf{X}_2^T \mathbf{X}_2)^{-1}\mathbf{X}_2^T$.
  - *Data Generating Process (DGP):* Synthetic wage equation: $Y = \text{Wage}$, $X_1 = \text{Education}$, $X_2 = \text{Experience}$.
- **2. Coordinate System Mapping Pipeline:**
  - *3-Stage Animated Pipeline:*
    1. Raw Plot: $Y$ vs $X_1$ (contaminated slope).
    2. Partialling Screen: $\mathbf{M}_2 X_1$ (residual education) and $\mathbf{M}_2 Y$ (residual wage).
    3. Purged Bivariate Plot: $\tilde{Y}$ vs $\tilde{X}_1$ through origin $(0, 0)$.
  - *Bounds:* Normalized coordinates centered at $(0, 0)$, domain $[-10, 10] \times [-10, 10]$.
- **3. Tactile Interactive Levers:**
  - *Annihilator Projection Scrubber:* Timeline scrubber $t \in [0, 1]$ animating raw points morphing along orthogonal projection vectors into purged residual positions.
  - *Regressor Confounding Lever:* Increase relationship between $X_1$ and $X_2$.
- **4. Real-Time Visual Feedback:**
  - *Vector Traces:* Morphing paths traced in translucent cyber sky lines as points slide into their partialled-out coordinates.
  - *Slope Alignment Lock:* The slope of the line in Stage 3 exactly matches the partial slope in the 3D plane from Lesson 5.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Projection Sweep:* Sliding the scrubber generates an acoustic Doppler filter sweep ($200\,\text{Hz} \to 1200\,\text{Hz}$ bandpass).
  - *FWL Identity Lock Chime:* When the scrubber reaches $t = 1.0$ (complete projection), play a resonant vibraphone chord confirming mathematical identity.

---

### MODULE 21: Omitted Variable Bias (OVB) Geometry

#### LESSON-T3-07: Omitted Variable Bias & The Auxiliary Regression Vector
- **1. Component Identifier:** `OmittedVariableBiasCanvas`
  - *Pedagogical Core:* The OVB formula $\hat{\beta}_{\text{short}} = \beta_{\text{true}} + \gamma \cdot \pi_1$. Omitting variable $Z$ contaminates $\hat{\beta}_1$ by the product of $Z$'s direct impact on $Y$ ($\gamma$) and the auxiliary regression coefficient of $Z$ on $X$ ($\pi_1$).
  - *Data Generating Process (DGP):* $Y = 1.5 X + \gamma Z + \varepsilon$; $Z = \pi_1 X + \nu$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* $X \in [0, 20], Y \in [0, 30]$.
  - *Dual Regression Overlay:* True structural slope (emerald) vs Short omitted slope (crimson dashed).
  - *Sign Matrix Quadrant:* Interactive 2D matrix $(\text{sign}(\gamma), \text{sign}(\pi_1))$ mapped to bias direction.
- **3. Tactile Interactive Levers:**
  - *Gamma ($\gamma$) Slider:* True effect of omitted variable $Z \to Y$ ($-2.0$ to $+2.0$).
  - *Pi ($\pi_1$) Slider:* Auxiliary relationship $X \to Z$ ($-2.0$ to $+2.0$).
  - *Quadrant Switcher:* Jump between positive bias, negative bias, and zero bias cases.
- **4. Real-Time Visual Feedback:**
  - *Bias Wedge:* Shaded red triangular sector opening between the true causal slope $\beta_{\text{true}}$ and the short regression line.
  - *Dynamic Bias Equation HUD:* Real-time numeric evaluation: $\text{Bias} = \gamma \cdot \pi_1 = (+1.2) \times (-0.8) = -0.96$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Dissonance Chord on Bias:* When bias magnitude $|\gamma \cdot \pi_1| > 0.5$, play tritone chord clash ($185\,\text{Hz} + 261.63\,\text{Hz}$).
  - *Resolution to Octave:* As user dials either $\gamma \to 0$ or $\pi_1 \to 0$, dissonance resolves into a pure fifth ($440\,\text{Hz} + 660\,\text{Hz}$).

---

#### LESSON-T3-08: Simpson's Paradox & Confounder Slope Inversions
- **1. Component Identifier:** `SimpsonsParadoxLab`
  - *Pedagogical Core:* Aggregating across a hidden categorical confounder flips the sign of the regression slope (e.g., negative within every sub-department, but positive in pooled aggregate).
  - *Data Generating Process (DGP):* 3 distinct clusters (e.g. Departments A, B, C). Within each cluster: $y = -0.6 x + c_k + \varepsilon$. Across cluster centroids: $c_k$ increases rapidly with $x$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* $x \in [0, 30], y \in [0, 30]$.
  - *Cluster Color Encoding:* Cluster 1 (Amber), Cluster 2 (Cyan), Cluster 3 (Lavender). Pooled OLS Line (Glowing Crimson).
- **3. Tactile Interactive Levers:**
  - *Cluster Separation Dial:* Pull cluster centroids apart along the confounding diagonal axis.
  - *Individual Cluster Slopes Drag:* Rotate the within-cluster slope handles.
  - *Stratification Toggle:* Switch between "Pooled View" (aggregate OLS) and "Conditioned View" (separate subgroup regressions).
- **4. Real-Time Visual Feedback:**
  - *Slope Inversion Flare:* When pooled slope has opposite sign of within-cluster slopes, the canvas header displays a flashing `SIMPSON'S PARADOX ACTIVE` warning badge.
  - *Centroid Connector Highway:* Dashed neon path connecting cluster centers, illustrating how the confounding between-group trajectory overwhelms within-group reality.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Sign Flip Click:* Crossing from positive to negative pooled slope triggers an abrupt reverse click and descending pitch drop.
  - *Cluster Stratify Sweep:* Toggling subgroup conditioning triggers a three-note ascending arpeggio (C4-E4-G4).

---

### MODULE 22: Rubin Potential Outcomes & Selection Bias

#### LESSON-T3-09: Potential Outcomes $Y(1), Y(0)$ & The Fundamental Counterfactual Problem
- **1. Component Identifier:** `PotentialOutcomesSplitLab`
  - *Pedagogical Core:* For every unit $i$, two potential outcomes exist: $Y_i(1)$ (treated) and $Y_i(0)$ (control). In reality, we observe only $Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0)$. The counterfactual half is permanently missing.
  - *Data Generating Process (DGP):* $n = 40$ subjects. Each has latent coordinates $(Y_i(0), Y_i(1))$. Treatment effect $\tau_i = Y_i(1) - Y_i(0)$.
- **2. Coordinate System Mapping Pipeline:**
  - *Dual Universe Parallel Axes:* Left vertical bar $Y(0)$, Right vertical bar $Y(1)$.
  - *Subject Connecting Fibers:* Slanted line segment connecting $Y_i(0)$ to $Y_i(1)$.
- **3. Tactile Interactive Levers:**
  - *God Mode Toggle:* Reveals both parallel universes simultaneously (both endpoints visible).
  - *Observation Shutter ($D_i$ assignment):* Assigns units to treatment or control, vanishing the unobserved counterfactual endpoint into a translucent purple ghost dot.
  - *Treatment Heterogeneity Lever:* Increases variance of $\tau_i$.
- **4. Real-Time Visual Feedback:**
  - *Counterfactual Ghosting:* Unobserved outcome dims to 15% opacity with dashed question-mark tether.
  - *Average Treatment Effect (ATE) Bracket:* Thick central glowing emerald arrow showing $\mathbb{E}[Y(1) - Y(0)]$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Ghosting Vanish Whisper:* Toggling from God Mode to Empirical Reality plays a gentle lowpass noise breath (synthesizing the loss of counterfactual knowledge).
  - *Individual Effect Ping:* Clicking a subject plays a tone whose pitch represents unit causal effect $\tau_i$ ($220\,\text{Hz} + \tau_i \cdot 40\,\text{Hz}$).

---

#### LESSON-T3-10: Selection Bias & Propensity Score Common Support
- **1. Component Identifier:** `SelectionBiasPropensityLab`
  - *Pedagogical Core:* Naive difference in group means equals Average Treatment Effect on the Treated (ATT) plus **Selection Bias**: $\mathbb{E}[Y \mid D=1] - \mathbb{E}[Y \mid D=0] = \text{ATT} + \{\mathbb{E}[Y(0) \mid D=1] - \mathbb{E}[Y(0) \mid D=0]\}$.
  - *Data Generating Process (DGP):* Confounder $X$ determines treatment via propensity score $e(X) = \frac{1}{1 + e^{-(\alpha + \beta X)}}$.
- **2. Coordinate System Mapping Pipeline:**
  - *Top Panel:* Outcome distributions for Treated vs Control across $X \in [0, 20]$.
  - *Bottom Panel:* Propensity score densities $p(e(X) \mid D=1)$ vs $p(e(X) \mid D=0)$ over $e(X) \in [0, 1]$.
- **3. Tactile Interactive Levers:**
  - *Selection Severity Slider:* Modulates sorting of high-$Y(0)$ units into treatment.
  - *Common Support Trimmer:* Drag caliper brackets $[e_{\min}, e_{\max}]$ to discard units lacking overlap.
  - *Randomized Assignment Button:* Overrides selection, forcing $e(X) = 0.5$ across all units.
- **4. Real-Time Visual Feedback:**
  - *Selection Bias Red Block:* Stacked bar chart breaking observed difference into green (ATT) and red (Selection Bias).
  - *Common Support Danger Zone:* Shaded hatched red territory on propensity spectrum where control units don't exist.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Common Support Violation Buzz:* When overlap drops below 10%, a warning buzzer (sawtooth $150\,\text{Hz}$ pulsed at 4Hz) sounds.
  - *Zero Selection Snap:* Pressing Randomize triggers an instantaneous harmonious resolution chord.

---

### MODULE 23: Graphical Causal Models (DAGs & Colliders)

#### LESSON-T3-11: Directed Acyclic Graphs (DAGs) & The Backdoor Criterion
- **1. Component Identifier:** `CausalDagBackdoorLab`
  - *Pedagogical Core:* Pearl's do-calculus and backdoor criterion. To identify causal effect of $X$ on $Y$, block all non-causal paths (backdoor paths with arrows entering $X$) by conditioning on a non-descendant adjustment set $\mathbf{Z}$.
  - *Data Generating Process (DGP):* Graph with nodes $\{X, Y, Z_1, Z_2, U\}$. Active edges toggleable.
- **2. Coordinate System Mapping Pipeline:**
  - *Canvas Node Coordinates:* Force-directed or grid-anchored node positions: $X(120, 200)$, $Y(480, 200)$, $Z_1(300, 80)$, $Z_2(300, 320)$.
  - *Edge Arrows:* Bezier curves with directional marker triangles and flowing photon particles indicating causal flow.
- **3. Tactile Interactive Levers:**
  - *Node Conditioning Toggle:* Click any node to cycle state: `Unadjusted` $\to$ `Conditioned` (framed by box) $\to$ `Excluded`.
  - *Edge Toggle / Weight Sliders:* Click edges to sever paths or adjust path coefficients.
  - *`do(X)` Operator Switch:* Physically snips all incoming edges into $X$, visualizing Pearl's graph surgery.
- **4. Real-Time Visual Feedback:**
  - *Backdoor Path Particle Flow:* Green particles stream along causal path $X \to Y$. Crimson particles stream along open backdoor path $X \leftarrow Z_1 \to Y$.
  - *Path Blocking Gate:* Conditioning on $Z_1$ places an amber gate; red particles collide and bounce off, turning the path gray (blocked).
  - *Identifiability Badge:* Displays green checkmark `CAUSAL EFFECT IDENTIFIED` or red alert `CONFIRMED UNBLOCKED CONFOUNDING`.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Backdoor Leak Drone:* Open backdoor path produces a subtle out-of-phase dissonant hum ($196\,\text{Hz} + 208\,\text{Hz}$).
  - *Path Block Click:* Conditioning on the correct adjustment set triggers a sharp satisfying mechanical latch click and resolves the hum.

---

#### LESSON-T3-12: Collider Conditioning & M-Bias Spurious Correlation
- **1. Component Identifier:** `ColliderStratificationLab`
  - *Pedagogical Core:* A collider $X \to C \leftarrow Y$ naturally **blocks** causal leakage. Conditioning on the collider opens the pathway, inducing spurious non-causal correlation between independent causes (Berkson's bias / M-bias).
  - *Data Generating Process (DGP):* $X \sim \mathcal{N}(0, 1)$, $Y \sim \mathcal{N}(0, 1)$ strictly independent ($\text{Cov}(X, Y) = 0$). Collider $C = X + Y + \nu$.
- **2. Coordinate System Mapping Pipeline:**
  - *Split Screen:* Left: Causal DAG ($X \to C \leftarrow Y$). Right: Scatter plot of $X$ vs $Y$ ($x \in [-3, 3], y \in [-3, 3]$).
- **3. Tactile Interactive Levers:**
  - *Collider Conditioning Checkbox / Caliper:* Toggle conditioning on $C$, or use a slice scrubber to select only units with $C > 1.5$.
  - *Collider Weight Knobs:* Adjust strength of $X \to C$ and $Y \to C$.
- **4. Real-Time Visual Feedback:**
  - *Red Sparks on Collider Node:* When conditioned, the collider node $C$ pulses with fiery red particles.
  - *Instant Spurious Regression:* In the scatter plot, points color-code by $C$. Restricting to a slice tilts an OLS line from flat zero ($\beta = 0.00$) to steep negative correlation ($\beta = -0.72$).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Collider Spark Crackle:* Clicking the collider node triggers an aggressive electric spark sound (filtered noise pulse).
  - *Tritone Spurious Siren:* The induced spurious regression slope directly raises a dissonant tritone pitch proportional to $|\hat{\beta}_{\text{spurious}}|$.

---

### MODULE 24: Instrumental Variables & 2SLS (LATE)

#### LESSON-T3-13: Instrumental Variables & The Wald Ratio Estimator
- **1. Component Identifier:** `InstrumentalVariablesLab`
  - *Pedagogical Core:* An instrument $Z$ induces variation in treatment $D$ uncorrelated with unobserved confounder $U$. The Wald Estimator scales the intention-to-treat effect by first-stage compliance: $\hat{\beta}_{\text{IV}} = \frac{\text{Cov}(Y, Z)}{\text{Cov}(D, Z)} = \frac{\Delta Y / \Delta Z}{\Delta D / \Delta Z}$.
  - *Data Generating Process (DGP):* $U \sim \mathcal{N}(0, 1)$; $Z \in \{0, 1\}$; $D = \pi_0 + \pi_1 Z + \gamma_D U + \nu$; $Y = \beta_0 + \beta_{\text{true}} D + \gamma_Y U + \varepsilon$. True $\beta = 1.50$.
- **2. Coordinate System Mapping Pipeline:**
  - *Dual Cartesian Panels:*
    - Panel 1: First Stage ($Z$ vs $D$).
    - Panel 2: Reduced Form ($Z$ vs $Y$) and Second Stage ($\hat{D}$ vs $Y$).
  - *Bounds:* $D \in [0, 10], Y \in [0, 20]$.
- **3. Tactile Interactive Levers:**
  - *Relevance Lever $\pi_1$:* Controls instrument strength $Z \to D$.
  - *Confounding Lever $\gamma$:* Controls severity of omitted variable $U$.
  - *Exclusion Restriction Violation Leak:* Toggle direct arrow $Z \to Y$ (breaking the valid instrument assumption).
- **4. Real-Time Visual Feedback:**
  - *Wald Ratio Geometric Slope:* Ratio of reduced form slope $\Delta Y$ to first-stage slope $\Delta D$ rendered as dynamic triangle hypotenuse.
  - *Comparison Meter:* Naive OLS (biased high in crimson) vs IV Wald estimate (centered on true beta in emerald).
  - *Exclusion Leak Red Fog:* Violating exogeneity bathes the DAG in crimson fog and shifts the IV estimate off target.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Wald Lock Chime:* When IV recovers true beta within 2%, play bright major chord ($523.25, 659.25, 783.99\,\text{Hz}$).
  - *Violation Dissonance:* Leaking $Z \to Y$ triggers an uncomfortable metallic ring modulator clash.

---

#### LESSON-T3-14: Two-Stage Least Squares (2SLS), Weak Instruments ($F < 10$) & LATE Compliers
- **1. Component Identifier:** `TwoStageLeastSquaresLateLab`
  - *Pedagogical Core:* 2SLS with multiple instruments projects endogenous regressor $\mathbf{X}$ onto instrument column space $\mathbf{P}_Z$. If instruments are weak ($F < 10$), 2SLS is severely biased toward OLS and standard errors explode. In heterogeneous worlds, IV estimates Local Average Treatment Effect (LATE) exclusively for Compliers (ignoring Always-Takers and Defiers).
  - *Data Generating Process (DGP):* 4 compliance types: Compliers (40%), Always-Takers (30%), Never-Takers (30%), Defiers (0% by monotonicity).
- **2. Coordinate System Mapping Pipeline:**
  - *Left View:* Instrument projection plane $\hat{D} = \mathbf{P}_Z D$.
  - *Right View:* 4-quadrant complier population tile chart (Imbens-Angrist lattice).
- **3. Tactile Interactive Levers:**
  - *Instrument Strength Knob (First-Stage $F$-Stat):* Continuous dial from $F = 0.8$ (hopelessly weak) to $F = 45.0$ (strong).
  - *Defier Monotonicity Toggle:* Introduce 5% defiers to illustrate how non-monotonicity breaks the causal LATE theorem.
  - *Sample Size Scrubber $n$:* 50 to 2000 observations.
- **4. Real-Time Visual Feedback:**
  - *Weak Instrument Flashing Strobe:* When $F < 10$, the $F$-statistic counter pulses neon red with warning: `WEAK INSTRUMENT: 2SLS BIASED TOWARDS OLS`.
  - *Complier Highlighting:* Clicking "Compliers" illuminates only the active subpopulation whose behavior is moved by the instrument.
  - *Sampling Distribution Flare:* Visualizing the heavy Cauchy-like tails of weak instrument 2SLS estimators.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Weak Instrument Alarm:* $F < 10$ activates a pulsating rhythmic warning tone ($440\,\text{Hz} \dots 440\,\text{Hz} \dots$).
  - *Threshold Crossing ($F \ge 10$):* Reaching $F = 10.0$ silences the alarm with a deep affirmative gong ($110\,\text{Hz}$).

---

### MODULE 25: Panel Data Methods (Fixed vs Random Effects)

#### LESSON-T3-15: Panel Within-Transformation & Individual Fixed Effects ($\alpha_i$)
- **1. Component Identifier:** `PanelFixedEffectsWithinLab`
  - *Pedagogical Core:* Unobserved time-invariant individual heterogeneity $\alpha_i$ confounds pooled OLS. The Within Transformation subtracts entity means ($\ddot{y}_{it} = y_{it} - \bar{y}_i$), projecting out all $\alpha_i$ without ever estimating them directly.
  - *Data Generating Process (DGP):* Panel of $N = 6$ entities observed across $T = 8$ time periods. $y_{it} = \alpha_i + \beta x_{it} + \varepsilon_{it}$. True $\beta = 1.20$. Entity intercepts $\alpha_i$ strongly correlated with $\bar{x}_i$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* Raw coordinates $x \in [0, 30], y \in [0, 40]$. Demeaned coordinates $\ddot{x} \in [-10, 10], \ddot{y} \in [-10, 10]$.
  - *Entity Color Palette:* 6 vibrant distinct hues (Amber, Sky, Emerald, Coral, Violet, Gold).
- **3. Tactile Interactive Levers:**
  - *Within-Transformation Scrubber $t \in [0, 1]$:* Animates each entity's cloud of points collapsing to its group centroid and translating to origin $(0, 0)$.
  - *Between-Entity Correlation $\text{Corr}(\alpha_i, \bar{x}_i)$:* Alters the severe bias of pooled OLS.
- **4. Real-Time Visual Feedback:**
  - *Centroid Centering Vectors:* Ghosted arrows showing each entity's trajectory moving to the center.
  - *Slope Comparison:* Red pooled OLS line rotates into alignment with true within-entity emerald slope as de-meaning completes.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Collapse Whoosh:* Scrubbing to demeaned space triggers a filtered brownian noise whoosh.
  - *Centroid Lock Tone:* All 6 centroids aligning at $(0, 0)$ plays a six-voice unisons harmonic chime.

---

#### LESSON-T3-16: Random Effects, Quasi-Demeaning ($\theta$) & The Hausman Test
- **1. Component Identifier:** `RandomEffectsHausmanLab`
  - *Pedagogical Core:* If $\text{Cov}(\alpha_i, x_{it}) = 0$, Fixed Effects is inefficient. Random Effects performs Generalized Least Squares via partial quasi-demeaning with weight $\theta = 1 - \sqrt{\frac{\sigma_\varepsilon^2}{\sigma_\varepsilon^2 + T \sigma_\alpha^2}}$. The Hausman Test evaluates whether $\hat{\beta}_{\text{FE}}$ and $\hat{\beta}_{\text{RE}}$ differ systematically.
  - *Data Generating Process (DGP):* Panel data with adjustable $\text{Cov}(\alpha_i, x_{it}) \in [0, 0.8]$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* Parameter space comparing $\hat{\beta}_{\text{FE}}$ vs $\hat{\beta}_{\text{RE}}$.
  - *Hausman Chi-Square Distribution Curve:* $\chi^2(k)$ density curve with critical value rejection cutoff.
- **3. Tactile Interactive Levers:**
  - *Quasi-Demeaning Weight Dial $\theta$:* Slide from $\theta = 0$ (Pooled OLS) to $\theta = 1$ (Full Fixed Effects).
  - *Endogeneity Knob $\text{Corr}(\alpha, X)$:* Injects correlation to trigger Hausman rejection.
  - *Panel Dimension Sliders:* Adjust $N$ (units) and $T$ (time periods).
- **4. Real-Time Visual Feedback:**
  - *Hausman Test Needle:* Sweeping chi-squared metric $H = (\hat{\beta}_{\text{FE}} - \hat{\beta}_{\text{RE}})^T [\mathbf{V}_{\text{FE}} - \mathbf{V}_{\text{RE}}]^{-1} (\hat{\beta}_{\text{FE}} - \hat{\beta}_{\text{RE}})$.
  - *Decision Banner:* Displays `FE PREFERRED (RE INCONSISTENT)` in red or `RE SUPPORTED (EFFICIENT)` in emerald.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Hausman Rejection Klaxon:* Crossing the critical threshold ($p < 0.05$) triggers an abrupt electronic buzz.
  - *Efficiency Ping:* When in valid RE mode, standard error shrink triggers a high crystalline bell chime.

---

### MODULE 26: Difference-in-Differences (DiD & Staggered)

#### LESSON-T3-17: Canonical $2 \times 2$ Difference-in-Differences & Parallel Trends Counterfactual
- **1. Component Identifier:** `DiDParallelTrendsLab`
  - *Pedagogical Core:* Canonical DiD computes causal effect $\delta = (Y_{\text{Treated, Post}} - Y_{\text{Treated, Pre}}) - (Y_{\text{Control, Post}} - Y_{\text{Control, Pre}})$. The entire design relies on the **Parallel Trends Assumption**: in the absence of treatment, the treated group would have evolved parallel to the control group.
  - *Data Generating Process (DGP):* 2 groups $\times$ 4 time periods ($t = 1, 2$ pre-treatment, $t = 3, 4$ post-treatment).
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* Time $t \in [0.5, 4.5]$, Outcome $Y \in [0, 25]$.
  - *Group Lines:* Treated Group (Amber solid), Control Group (Sky solid).
  - *Counterfactual Trajectory:* Dashed purple ghost line starting at Treated $t_2$ and projecting parallel to Control.
- **3. Tactile Interactive Levers:**
  - *Treatment Effect Slider $\delta$:* Real-time elevation of treated post-treatment trajectory ($0.0$ to $+10.0$).
  - *Parallel Trends Violation Handle:* Drag pre-treatment treated slope to simulate differential pre-trends.
  - *Policy Intervention Time Marker:* Move cutoff between $t_2$ and $t_3$.
- **4. Real-Time Visual Feedback:**
  - *Vertical DiD Double Bracket:* Dynamic graphic bracket measuring the gap between actual treated post-outcome and counterfactual ghost line.
  - *Parallel Trends Validator:* Real-time check of pre-treatment slope equivalence. If pre-trends diverge ($| \Delta_{\text{pre}} | > 0.1$), the counterfactual ribbon flashes red with warning: `PARALLEL TRENDS VIOLATED`.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Parallel Snap Chord:* When pre-treatment slopes are parallel within $0.01$, play clean resonant fifth ($440\,\text{Hz} + 660\,\text{Hz}$).
  - *Trend Divergence Tritone:* Tilting pre-trends into violation triggers an ominous tritone dissonance.

---

#### LESSON-T3-18: Event Study Dynamics & Staggered Rollout Decomposition (Goodman-Bacon / Callaway-Sant'Anna)
- **1. Component Identifier:** `StaggeredDiDEventStudyLab`
  - *Pedagogical Core:* When timing is staggered, Two-Way Fixed Effects (TWFE) uses already-treated units as controls for later-treated units, producing negative weights and severe bias (Goodman-Bacon decomposition). Event studies estimate dynamic lead and lag coefficients relative to event time $t = -1$.
  - *Data Generating Process (DGP):* 3 cohorts (Treated at $t=3$, Treated at $t=5$, Never-Treated) across $T = 8$ time periods with heterogeneous treatment duration effects.
- **2. Coordinate System Mapping Pipeline:**
  - *Top Panel:* Cohort timeline and group trajectories over $t \in [1, 8]$.
  - *Bottom Panel:* Event study coefficient plot relative to event time $\tau \in [-3, +4]$. Point estimates with 95% confidence bars.
- **3. Tactile Interactive Levers:**
  - *Treatment Dynamic Ramp:* Set treatment effect to grow over time (creating time-varying treatment heterogeneity).
  - *TWFE vs Callaway-Sant'Anna Switch:* Toggles between classic biased regression and modern clean cohort-specific estimation.
  - *Bacon 2x2 Pair Inspector:* Click any pair of cohorts to view their specific $2 \times 2$ sub-comparison weight.
- **4. Real-Time Visual Feedback:**
  - *Negative Weight Warning Sector:* Any comparison yielding a negative weight in Bacon decomposition turns blazing crimson.
  - *Lead Coefficients Pre-Test:* Pre-treatment event study coefficients at $\tau < 0$ glow emerald if all flat at zero; turn red if pre-trends exist.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Bacon Negative Weight Alert:* Detecting negative weights triggers a sharp low-frequency thump and discordant buzzer.
  - *Clean Identification Fanfare:* Switching to Callaway-Sant'Anna cleanly resets negative weights and sounds a smooth major progression.

---

### MODULE 27: Regression Discontinuity Design (Sharp & Fuzzy)

#### LESSON-T3-19: Sharp Regression Discontinuity Design (RDD) & Local Linear Boundary Jump
- **1. Component Identifier:** `SharpRDDCutoffLab`
  - *Pedagogical Core:* Assignment to treatment is a deterministic step-function of a running variable $X$ crossing cutoff $c_0$: $D_i = \mathbf{1}(X_i \ge c_0)$. The causal effect is the vertical discontinuity jump at the boundary: $\tau_{\text{SRDD}} = \lim_{x \downarrow c_0} \mathbb{E}[Y \mid X=x] - \lim_{x \uparrow c_0} \mathbb{E}[Y \mid X=x]$.
  - *Data Generating Process (DGP):* Running variable $X \in [-10, +10]$, Cutoff $c_0 = 0.0$. Non-linear potential outcome curves $Y(0) = 5 + 0.8 X - 0.03 X^2$, Treatment jump $\tau = 4.0$ for $X \ge 0$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* Running variable $X \in [-10, +10]$, Outcome $Y \in [0, 20]$.
  - *Cutoff Vertical Axis:* High-contrast vertical laser line at $X = c_0$.
  - *Local Linear Fit:* Separate regression lines fitted on left ($X < c_0$) and right ($X \ge c_0$) within bandwidth $h$.
- **3. Tactile Interactive Levers:**
  - *Bandwidth Scrubber $h$:* Zoom bandwidth window from $h = 0.5$ (tight local linear) to $h = 10.0$ (global OLS).
  - *Kernel Weighting Toggle:* Uniform (boxcar) vs Triangular vs Epanechnikov kernel weighting.
  - *Polynomial Degree Switch:* Linear ($p=1$) vs Quadratic ($p=2$) local polynomial.
- **4. Real-Time Visual Feedback:**
  - *Cutoff Discontinuity Bracket:* Glowing vertical emerald bracket at $X = c_0$ directly quantifying estimated treatment jump $\hat{\tau}$.
  - *Bandwidth Shading Curtains:* Semi-transparent dark curtains masking observations outside $[c_0 - h, c_0 + h]$.
  - *Overfitting Wiggle Alert:* Setting high polynomial with narrow bandwidth causes lines to wildly curl, triggering a red overfitting tag.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Discontinuity Jump Glissando:* Crossing the cutoff with mouse cursor triggers an upward pitch glide whose interval equals the estimated treatment jump $\hat{\tau}$.
  - *Bandwidth Zoom Drone:* Narrowing $h$ focuses audio bandpass filter, tightening resonance around $440\,\text{Hz}$.

---

#### LESSON-T3-20: Fuzzy RDD, Optimal Bandwidth Selection (IK/CCT) & McCrary Manipulation Test
- **1. Component Identifier:** `FuzzyRDDBandwidthLab`
  - *Pedagogical Core:* In Fuzzy RDD, crossing cutoff $c_0$ causes a discontinuous jump in the **probability** of treatment: $\tau_{\text{FRDD}} = \frac{\text{Jump in } Y}{\text{Jump in } D}$. Validity hinges on the running variable not being sorted or manipulated at the cutoff (McCrary density test).
  - *Data Generating Process (DGP):* Running variable $X$ with optional sorting spike at $c_0$. Treatment probability jumps from 0.15 to 0.85 at $c_0 = 0$.
- **2. Coordinate System Mapping Pipeline:**
  - *Top Panel:* Two-stage jump: Compliance jump $P(D=1 \mid X)$ and Outcome jump $Y$ vs $X$.
  - *Bottom Panel:* McCrary Running Variable Density Histogram with smoothed boundary estimates on either side of $c_0$.
- **3. Tactile Interactive Levers:**
  - *Manipulation Sorting Dial:* Injects fraudulent sorting of individuals just above cutoff ($X \in [0, 0.5]$).
  - *Optimal Bandwidth Selector (IK / CCT):* Single-click automatic calculation of Calonico-Cattaneo-Titiunik robust bias-corrected optimal bandwidth $h^*$.
  - *Compliance Jump Lever:* Adjusts difference in compliance $(p^+ - p^-)$.
- **4. Real-Time Visual Feedback:**
  - *McCrary Density Discontinuity:* Density bars at $c_0$ separate; if density gap is statistically significant ($p < 0.05$), flashes red: `MANIPULATION DETECTED: RDD INVALID`.
  - *Fuzzy Scaling Ratio Bracket:* Visual division: Reduced form outcome jump $\Delta Y$ divided by compliance jump $\Delta D$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Manipulation Geiger Counter:* High density clustering at cutoff triggers rapid clicking (mimicking Geiger counter radiation).
  - *CCT Optimal Bandwidth Snap:* Engaging optimal bandwidth triggers clean ascending chime.

---

### MODULE 28: Synthetic Control Methods & Permutation Tests

#### LESSON-T3-21: Synthetic Control Method (SCM) & Convex Donor Weights ($W \ge 0, \sum W_j = 1$)
- **1. Component Identifier:** `SyntheticControlDonorLab`
  - *Pedagogical Core:* Estimating treatment effect on a single treated unit (e.g. California Prop 99) by constructing a convex combination of untreated donor units: $\hat{Y}_{1t}^{\text{synth}} = \sum_{j=2}^{J+1} w_j^* Y_{jt}$ with constraints $w_j \ge 0$ and $\sum w_j = 1$, minimizing pre-treatment predictor distance.
  - *Data Generating Process (DGP):* 1 Treated unit + 8 Donor units observed over $T = 16$ periods (Pre-intervention $t \le 10$, Post-intervention $t > 10$).
- **2. Coordinate System Mapping Pipeline:**
  - *Top Main Canvas:* Trajectory time series $t \in [1, 16], Y \in [10, 80]$. Treated unit (Electric Amber), Synthetic Control (Dashed Emerald), Donor Pool (Translucent Gray).
  - *Bottom Control Panel:* Interactive Donor Weight Simplex Bar Chart ($w_1, \dots, w_8$).
- **3. Tactile Interactive Levers:**
  - *Donor Weight Sliders:* Manually nudge donor weights; simplex normalizer automatically maintains $\sum w_j = 1$ and non-negativity.
  - *Quadratic Programming Auto-Solve Button:* Solves constrained optimization $\min_{\mathbf{W}} \|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}\|_{\mathbf{V}}^2$ instantly.
  - *Predictor Importance Knobs ($\mathbf{V}$ Matrix):* Re-weights importance of economic predictors.
- **4. Real-Time Visual Feedback:**
  - *Pre-Treatment Gap Shading:* Area between treated and synthetic curve for $t \le 10$ highlighted in crimson (Pre-treatment Root Mean Squared Prediction Error: RMSPE).
  - *Post-Treatment Gap Divergence:* Clean widening gap for $t > 10$ depicting true causal effect of policy.
  - *Donor Contribution Halo:* Donors with non-zero weights glow proportionally to $w_j^*$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Pre-Treatment Zero RMSPE Resonance:* As synthetic line locks onto treated unit in pre-period, audio hum purifies to clean $440\,\text{Hz}$ tone.
  - *Post-Policy Divergence Tone:* The post-intervention divergence interval generates a rising brass fanfare reflecting treatment magnitude.

---

#### LESSON-T3-22: Placebo Permutation Inference & In-Space / In-Time MSPE Ratios
- **1. Component Identifier:** `SCMPlaceboPermutationLab`
  - *Pedagogical Core:* Standard inference fails with $N=1$ treated unit. Synthetic Control uses **placebo permutation tests**: reassign treatment iteratively to every donor in the donor pool. The exact $p$-value is the rank of the treated unit's post/pre Mean Squared Prediction Error (MSPE) ratio relative to all placebos.
  - *Data Generating Process (DGP):* 1 Treated + 15 Donor units. Full permutation run computes 16 separate synthetic control models.
- **2. Coordinate System Mapping Pipeline:**
  - *Left View:* Gap Plot ($Y_{it} - \hat{Y}_{it}^{\text{synth}}$) for all 16 units over time $t \in [1, 16]$.
  - *Right View:* Ranked Post/Pre MSPE Ratio Histogram.
- **3. Tactile Interactive Levers:**
  - *Run Placebo Permutations Button:* Triggers sequential batch animation running synthetic control on each donor one by one.
  - *Pre-Treatment RMSPE Outlier Filter:* Slider discarding placebo donors with poor pre-treatment fit (e.g. MSPE $> 5 \times$ treated MSPE).
  - *Intervention Time Placebo Shift:* Move fictitious intervention date to pre-treatment period ($t = 6$).
- **4. Real-Time Visual Feedback:**
  - *Spaghetti Placebo Trails:* Gray spaghetti trails of 15 placebo lines fluctuating tightly around zero gap. Treated unit line (thick glowing amber) dramatically breaks out of the spaghetti envelope.
  - *Permutation $p$-Value Counter:* Digital display showing $p = \frac{\text{Rank}}{N+1} = \frac{1}{16} = 0.0625$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Placebo Trail Cascade:* As each placebo unit is fitted, a rapid randomized marimba note sounds.
  - *Significant Rank 1 Gong:* If treated unit achieves Rank 1 in MSPE ratio, sound an authoritative deep orchestral gong.

---

### MODULE 29: Regularization Geometry (Ridge vs Lasso)

#### LESSON-T3-23: Ridge Regression ($L_2$) & SVD Principal Axis Shrinkage
- **1. Component Identifier:** `RidgeL2GeometryCanvas`
  - *Pedagogical Core:* Ridge solves $\min_{\boldsymbol{\beta}} \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda \|\boldsymbol{\beta}\|_2^2$. Geometrically, this is the tangency point between the circular $L_2$ ball and the elliptical OLS loss contours. Under SVD $\mathbf{X} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T$, Ridge shrinks coefficients along principal axes by factor $\frac{\sigma_j^2}{\sigma_j^2 + \lambda}$, shrinking low-variance directions most.
  - *Data Generating Process (DGP):* 2-parameter space $(\beta_1, \beta_2)$. OLS unconstrained minimum at $(3.5, 4.0)$ with covariance ellipse rotated at $35^\circ$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* $\beta_1 \in [-1, 6], \beta_2 \in [-1, 6]$.
  - *Loss Contours:* Concentric nested ellipses centered at $\hat{\boldsymbol{\beta}}_{\text{OLS}}$.
  - *L2 Constraint Ball:* Circle centered at $(0, 0)$ with radius $R(\lambda)$.
- **3. Tactile Interactive Levers:**
  - *Penalty Slider $\lambda$:* Logarithmic dial from $\lambda = 0.001$ to $\lambda = 100.0$.
  - *Ellipse Eigenvalue Aspect Ratio:* Change conditioning of $\mathbf{X}^T \mathbf{X}$ to elongate or round the error ellipses.
  - *Manual Tangency Finder Handle:* Drag parameter point $(\beta_1, \beta_2)$ to manually find the tangency point.
- **4. Real-Time Visual Feedback:**
  - *Circle-Ellipse Tangency Point:* Highlighted glowing cyan contact point where the circular constraint sphere touches the innermost possible loss ellipse.
  - *Eigen-Decomposition Shrinkage Vectors:* Visualizing the two orthogonal eigenvector directions showing differential contraction lengths.
  - *Trace Path:* Smooth cyan line tracing the trajectory of $\hat{\boldsymbol{\beta}}_{\text{Ridge}}(\lambda)$ as $\lambda$ sweeps from $0 \to \infty$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Tangency Snap Harmonic:* Finding the exact tangency point triggers a pure resonant fourth/fifth chime.
  - *Shrinkage Frequency Sweep:* Dragging $\lambda$ sweeps an analog lowpass cutoff frequency downwards.

---

#### LESSON-T3-24: Lasso Regression ($L_1$) & Diamond Tangency Sparsity Corners
- **1. Component Identifier:** `RegularizationGeometryCanvas`
  - *Pedagogical Core:* Lasso solves $\min_{\boldsymbol{\beta}} \frac{1}{2n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda \|\boldsymbol{\beta}\|_1$. The $L_1$ norm ball is a diamond with sharp vertices along coordinate axes. Elliptical loss contours naturally make contact at these non-differentiable corners, driving coefficients exactly to zero (feature selection).
  - *Data Generating Process (DGP):* 2-parameter space $(\beta_1, \beta_2)$ with OLS unconstrained solution at $(2.8, 3.8)$.
- **2. Coordinate System Mapping Pipeline:**
  - *Domain Bounds:* $\beta_1 \in [-1, 5], \beta_2 \in [-1, 5]$.
  - *L1 Diamond Constraint:* Rhombus $|\beta_1| + |\beta_2| \le t(\lambda)$ centered at origin.
  - *Subgradient Projection:* Visualizing subdifferential $\partial \|\beta_j\|_1 = \text{sign}(\beta_j)$ at the vertex.
- **3. Tactile Interactive Levers:**
  - *L1 vs L2 Ball Morphing Slider $p \in [1, 2]$:* Morphs constraint shape from $L_1$ Diamond ($p=1$) to $L_2$ Circle ($p=2$).
  - *Regularization Strength $\lambda$:* Controls expansion/contraction of constraint diamond.
  - *Feature Correlation Dial $\rho$:* Rotates and shears the OLS loss ellipses.
- **4. Real-Time Visual Feedback:**
  - *Corner Tangency Snap:* When the expanding ellipse touches a diamond vertex (e.g. on the axis $\beta_1 = 0$), the vertex flashes brilliant gold and snaps the parameter to exact zero.
  - *Exact Sparsity Indicator:* Feature status label toggles: `FEATURE X1 DELETED (BETA_1 = 0.0000)` with bold zero indicator.
  - *L1 vs L2 Dual View:* Split comparison showing why smooth circles almost never hit exact zero coordinates while pointed diamonds do.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Corner Impact Snap:* The precise instant the solution hits an axis corner ($\beta_j = 0$), trigger a crisp acoustic snap and high-Q bell ping ($1174.66\,\text{Hz}$, D6).
  - *Morphing Waveform:* Sliding $p$ from 2 to 1 continuously morphs audio oscillator waveform from pure sine to sharp square wave.

---

### MODULE 30: Discriminative Classification & IRLS

#### LESSON-T3-25: Logistic Sigmoid Link, Odds Ratios & Cross-Entropy Loss Surface
- **1. Component Identifier:** `LogisticSigmoidSurface`
  - *Pedagogical Core:* Binary classification maps linear predictor $z = \mathbf{w}^T \mathbf{x} + b$ through non-linear sigmoid link $\sigma(z) = \frac{1}{1 + e^{-z}} = P(Y=1 \mid \mathbf{x})$. Minimizing negative log-likelihood (binary cross-entropy) guarantees a strictly convex loss surface without local minima.
  - *Data Generating Process (DGP):* 2D binary classification: Class 0 (Sky dots) and Class 1 (Amber dots). Linear boundary with noise.
- **2. Coordinate System Mapping Pipeline:**
  - *Left View:* 2D feature space $x_1 \in [-4, 4], x_2 \in [-4, 4]$ with sigmoid probability contour heat map ($p = 0.1, 0.5, 0.9$).
  - *Right View:* 3D or contour view of Cross-Entropy loss surface over $(w_1, w_2)$.
- **3. Tactile Interactive Levers:**
  - *Boundary Angle & Offset Handles:* Drag decision boundary line $w_1 x_1 + w_2 x_2 + b = 0$ directly on 2D scatter.
  - *Log-Odds (Logit) Scrubber:* Probe any point $\mathbf{x}$; inspect transformation from linear $z$ to odds $\frac{p}{1-p}$ to probability $\sigma(z)$.
  - *Outlier Separability Slider:* Push classes apart to observe sigmoid saturation and vanishing gradients.
- **4. Real-Time Visual Feedback:**
  - *Probability Gradient Mesh:* Smooth background color gradient shifting from translucent sky blue ($p \to 0$) to electric amber ($p \to 1$).
  - *Loss Surface Ball:* White ball rolling on the convex cross-entropy bowl, showing gradient vector $\nabla \mathcal{L}$.
  - *Log-Loss Contribution Bars:* Individual data points expand vertical loss bars proportional to $-\log(p_i)$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Boundary Crossing Click:* Moving mouse across $p = 0.5$ boundary plays a snappy toggle click.
  - *Misclassification Alarm:* Misclassifying a point with high confidence ($p > 0.95$ when $y = 0$) causes cross-entropy to explode, triggering an immediate loud harsh buzz.

---

#### LESSON-T3-26: Iteratively Reweighted Least Squares (IRLS) & Newton-Raphson Curvature
- **1. Component Identifier:** `LogisticIRLSCurvatureLab`
  - *Pedagogical Core:* Logistic regression lacks a closed-form solution. Newton-Raphson optimization updates weights via $\mathbf{w}^{(t+1)} = \mathbf{w}^{(t)} + (\mathbf{X}^T \mathbf{W} \mathbf{X})^{-1} \mathbf{X}^T (\mathbf{y} - \mathbf{p})$, which is algebraically identical to weighted least squares with diagonal weights $W_{ii} = p_i(1 - p_i)$ and working responses.
  - *Data Generating Process (DGP):* Same binary classification dataset. Illustrates second-order Hessian curvature adjustment.
- **2. Coordinate System Mapping Pipeline:**
  - *Parameter Space Canvas:* $(w_1, w_2) \in [-3, 3] \times [-3, 3]$.
  - *Curvature Ellipse:* Quadratic approximation $\Delta \mathbf{w}^T \mathbf{H} \Delta \mathbf{w}$ surrounding current parameter step.
- **3. Tactile Interactive Levers:**
  - *Step-by-Step Newton Button:* Advances algorithm exactly one Newton-Raphson iteration.
  - *Learning Rate Damping $\eta$:* Damped Newton step $\mathbf{w} + \eta \Delta \mathbf{w}$.
  - *Starting Weight Handle:* Drag initial guess $(w_1^{(0)}, w_2^{(0)})$ anywhere on the loss bowl.
- **4. Real-Time Visual Feedback:**
  - *Newton Quadratic Paraboloid:* Local osculating paraboloid fitted to the non-linear log-loss surface at current point.
  - *Quadratic Convergence Leap:* Leap vector arrow demonstrating second-order quadratic convergence (doubling significant digits each step near minimum).
  - *Weight Variance Halos:* Data points display halos whose radius scales with $W_{ii} = p_i(1 - p_i)$ (points near decision boundary have highest weight).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Newton Step Thud:* Each iteration plays a deep resonant percussive thud followed by an ascending tone whose frequency scales with current log-likelihood.
  - *Convergence Bell:* When gradient norm $\|\nabla \mathcal{L}\| < 10^{-6}$, trigger a crystal FM triangle bell chord.

---

### MODULE 31: Support Vector Machines & Kernel Hilbert Spaces

#### LESSON-T3-27: Hard vs Soft Margins ($C$), Slack Penalties & Mercer Kernel Lift
- **1. Component Identifier:** `SupportVectorMachineKernelLab`
  - *Pedagogical Core:* SVM finds the maximum-margin hyperplane separating classes: $\max \frac{2}{\|\mathbf{w}\|}$ subject to $y_i(\mathbf{w}^T \mathbf{x} + b) \ge 1 - \xi_i$. Slack penalty $C$ governs the bias-variance tradeoff. When data is non-linearly separable, Mercer Kernels $K(\mathbf{x}, \mathbf{x}') = \langle \phi(\mathbf{x}), \phi(\mathbf{x}') \rangle$ implicitly lift data into infinite-dimensional Reproducing Kernel Hilbert Spaces (RKHS).
  - *Data Generating Process (DGP):* Concentric circles dataset (inner ring Class 1, outer ring Class -1).
- **2. Coordinate System Mapping Pipeline:**
  - *Dual 2D/3D Split Screen:*
    - Left: 2D input space with non-linear kernel decision boundary.
    - Right: 3D lifted Hilbert space $[x_1, x_2, \phi(x_1, x_2)] = [x_1, x_2, x_1^2 + x_2^2]$ where a flat planar sheet easily cuts the classes.
- **3. Tactile Interactive Levers:**
  - *Kernel Architecture Selector:* Linear vs Polynomial ($(\mathbf{x}^T \mathbf{x}' + c)^d$) vs Radial Basis Function (RBF: $e^{-\gamma \|\mathbf{x} - \mathbf{x}'\|^2}$).
  - *RBF Gamma ($\gamma$) Dial:* Controls width of Gaussian bell surrounding support vectors.
  - *Soft Margin Penalty $C$ Slider:* Logarithmic scrubber from $C = 0.01$ (tolerant soft margin) to $C = 1000$ (hard margin).
  - *3D Lift Scrubber $t \in [0, 1]$:* Visually lifts 2D flat plane into a 3D paraboloid bowl in real time.
- **4. Real-Time Visual Feedback:**
  - *Support Vector Halo Rings:* The sparse subset of critical observations with non-zero Lagrange multipliers $\alpha_i > 0$ pulse with gold halos.
  - *Margin Gutter Ribbons:* Translucent boundary gutter bands illustrating margin width $w_{\text{margin}} = \frac{2}{\|\mathbf{w}\|}$.
  - *Slack Vectors:* Red arrow segments indicating slack violations $\xi_i$ penetrating the margin.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Support Vector Contact Ping:* Clicking or dragging a point into the margin gutter triggers an acoustic string pluck.
  - *RBF Overfitting Shriek:* Cranking $\gamma > 50$ (causing islands around individual points) raises a high-frequency whistle alert.

---

### MODULE 32: Decision Trees & Ensemble Methods (Random Forests)

#### LESSON-T3-28: Binary Recursive Partitioning, Orthogonal Cuts & Gini Impurity Collapse
- **1. Component Identifier:** `DecisionTreeLaser`
  - *Pedagogical Core:* Decision trees perform greedy recursive axis-aligned binary partitioning of feature space. At each node, the split threshold $s$ on feature $j$ is chosen to maximize Information Gain / Gini Impurity reduction: $\Delta I = I(D) - \frac{|D_L|}{|D|}I(D_L) - \frac{|D_R|}{|D|}I(D_R)$, where Gini $I_G = 1 - \sum p_k^2$.
  - *Data Generating Process (DGP):* Multi-class 2D dataset with intertwined clusters (e.g. Spiral or Checkerboard) across features $(X_1, X_2) \in [0, 100] \times [0, 100]$.
- **2. Coordinate System Mapping Pipeline:**
  - *Dual Synchronized Canvas:*
    - Left: 2D feature partition plane ($X_1, X_2$).
    - Right: Hierarchical SVG Tree DAG (Root $\to$ Child Nodes $\to$ Leaves).
- **3. Tactile Interactive Levers:**
  - *Splitting Laser Guide:* Drag a horizontal or vertical laser blade across the 2D feature plane to inspect candidate split impurity in real time.
  - *Split Commit Button:* Cuts the space along current laser line, spawning two new nodes in the SVG tree.
  - *Impurity Metric Toggle:* Gini Impurity vs Shannon Entropy ($- \sum p_k \log_2 p_k$).
  - *Max Depth Slider:* Restricts maximum tree depth from 1 to 8.
- **4. Real-Time Visual Feedback:**
  - *Impurity Gain Curve:* Dynamic HUD curve over the laser slider showing impurity reduction across all candidate thresholds $s$, peaking at optimal split.
  - *Cell Color Purity:* Sub-rectangles tint deeper amber or sky blue as class purity approaches 100%.
  - *Tree Node Doughnut Charts:* SVG tree nodes contain mini circular progress rings displaying class distribution $(p_1, p_2)$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Laser Slice Whoosh:* Cutting a node plays a crisp laser beam sound (synthesized resonant white noise slice).
  - *Pure Leaf Chime:* When a split creates a 100% pure leaf ($I_G = 0$), play an angelic crystal chime.

---

#### LESSON-T3-29: Ensemble Bagging & Random Forests (Out-of-Bag Error & Feature Subsampling)
- **1. Component Identifier:** `RandomForestEnsembleLab`
  - *Pedagogical Core:* A single decision tree has high variance. Random Forests reduce variance without increasing bias through **Bagging** (Bootstrap Aggregation) and **Random Feature Subsampling** ($m = \sqrt{p}$). Out-of-Bag (OOB) samples provide unbiased cross-validation for free without a separate holdout set.
  - *Data Generating Process (DGP):* Noisy non-linear classification boundary with 400 data points.
- **2. Coordinate System Mapping Pipeline:**
  - *Top Main View:* Ensemble consensus probability heatmap (soft voting average across all trees).
  - *Bottom Gallery:* Micro-canvases showing individual decision boundaries of 8 sampled trees in the forest.
- **3. Tactile Interactive Levers:**
  - *Number of Trees Slider ($B$):* 1 to 100 trees.
  - *Feature Subsampling Toggle ($m$):* Full features ($m = p$, bagging) vs Random subset ($m = \sqrt{p}$, random forest).
  - *Bootstrap Resample Pulse:* Regenerates bootstrap samples with replacement, animating data points flying into training bags.
- **4. Real-Time Visual Feedback:**
  - *Variance Smoothing:* Watch the jagged staircase boundary of a single tree smooth into a soft, resilient organic contour as $B$ increases.
  - *OOB Error Convergence Curve:* Real-time learning curve plotting Out-of-Bag error as a function of forest size $B$.
  - *Individual Tree Disagreement Map:* Shaded purple regions indicating high variance where individual trees vote differently.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Forest Chorus:* Each added tree adds an acoustic voice to a rich polyphonic harmonic choir.
  - *Variance Damping:* As ensemble size increases, high-frequency acoustic fluttering smoothly stabilizes into a steady, calm chord.

---

### MODULE 33: Gradient Boosted Trees (GBM, XGBoost, LightGBM)

#### LESSON-T3-30: Gradient Boosting Machines (GBM) & Sequential Pseudo-Residual Descent
- **1. Component Identifier:** `GBMPseudoResidualWaterfallLab`
  - *Pedagogical Core:* Unlike Random Forests (which build independent trees in parallel), Boosting builds trees **sequentially**. Each tree $h_m(x)$ fits the negative gradient (pseudo-residuals) of the loss function: $r_{im} = -\left[\frac{\partial L(y_i, F(x_i))}{\partial F(x_i)}\right]_{F=F_{m-1}}$. Updates proceed via $F_m(x) = F_{m-1}(x) + \eta h_m(x)$.
  - *Data Generating Process (DGP):* Non-linear regression curve $y = \sin(x) + 0.5 \cos(2x) + \varepsilon$ with $n = 100$.
- **2. Coordinate System Mapping Pipeline:**
  - *Stacked Waterfall Canvases:*
    - Stage 0: Initial constant prediction $F_0(x) = \bar{y}$.
    - Stage $m$: Residuals $r_{im}$ and fitted shallow tree $h_m(x)$.
    - Cumulative Stage: Combined prediction $F_M(x)$ overlaying original raw data.
- **3. Tactile Interactive Levers:**
  - *Boosting Step Forward / Backward:* Single-step through stages $m = 1, 2, \dots, 50$.
  - *Shrinkage / Learning Rate Dial $\eta$:* $0.01$ (conservative) to $1.0$ (aggressive step).
  - *Tree Depth (Max Leaves):* Stumps ($d=1$) vs Shallow Trees ($d=3$).
- **4. Real-Time Visual Feedback:**
  - *Residual Waterfall Contraction:* Animated vertical bars representing residuals $r_{im}$ visibly shrinking and flattening toward zero across stages.
  - *Cumulative Fit Evolution:* Cumulative prediction line step-by-step molds itself to the non-linear sinusoidal target curve.
  - *Overfitting Early Stop Target:* Validation loss curve displays optimal stopping iteration $M^*$ before training error keeps dropping while test error turns upward.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Sequential Step Arpeggio:* Each boosted stage plays a rapid chromatic step progressing upward.
  - *Residual Shrink Frequency:* Pitch of residual feedback drone lowers in proportion to root mean squared residual $\sqrt{\sum r_{im}^2}$.

---

#### LESSON-T3-31: Extreme Gradient Boosting (XGBoost) & Exact 2nd-Order Hessian Splitting
- **1. Component Identifier:** `XGBoostHessianGainLab`
  - *Pedagogical Core:* XGBoost optimizes a second-order Taylor expansion of the loss: $\mathcal{L}^{(t)} \approx \sum [g_i f_t(x_i) + \frac{1}{2} h_i f_t^2(x_i)] + \Omega(f_t)$. The optimal leaf weight is $w_j^* = -\frac{\sum g_i}{\sum h_i + \lambda}$, and the exact split gain is $\text{Gain} = \frac{1}{2} \left[\frac{G_L^2}{H_L + \lambda} + \frac{G_R^2}{H_R + \lambda} - \frac{(G_L + G_R)^2}{H_L + H_R + \lambda}\right] - \gamma$.
  - *Data Generating Process (DGP):* Heteroskedastic binary or regression dataset where gradients $g_i$ and Hessians $h_i$ vary across the feature domain.
- **2. Coordinate System Mapping Pipeline:**
  - *Split Decision Canvas:* Feature split axis $x \in [0, 100]$.
  - *Hessian-Weighted Density Strip:* Bottom tape showing accumulated Hessian weight $H = \sum h_i$ across feature bins.
- **3. Tactile Interactive Levers:**
  - *L2 Leaf Regularizer $\lambda$:* Ridge penalty preventing extreme leaf weights.
  - *Complexity Pruning Threshold $\gamma$:* Minimum gain required to split a node.
  - *Split Candidate Probe:* Drag candidate split boundary across the feature axis.
- **4. Real-Time Visual Feedback:**
  - *Exact Gain Profile Curve:* Real-time curve showing XGBoost Gain across candidate splits. Peaks indicate exact optimal split location.
  - *Pruning Scissor Animation:* If maximum gain does not exceed $\gamma$, a scissor icon snips the split, displaying `PRUNED BY GAMMA REGULARIZATION`.
  - *Leaf Weight Indicators:* Numerical tags showing exact analytical weights $w_L^*, w_R^*$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Gain Peak Snap:* Dragging the split handle over the maximum gain point triggers an acoustic snap and high-Q bell chime.
  - *Pruning Snip Sound:* Triggering gamma pruning plays a crisp mechanical scissor snip audio sample.

---

### MODULE 34: Unsupervised Manifolds (PCA, t-SNE, UMAP)

#### LESSON-T3-32: Principal Component Analysis (PCA) & Variance Maximization Projections
- **1. Component Identifier:** `PCAEigenProjectionLab`
  - *Pedagogical Core:* PCA finds orthogonal directions of maximum variance. Mathematically, it is the eigendecomposition of sample covariance matrix $\mathbf{\Sigma} = \frac{1}{n}\mathbf{X}^T \mathbf{X} = \mathbf{V} \mathbf{\Lambda} \mathbf{V}^T$, or the SVD of data matrix $\mathbf{X} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T$. The first principal component $\mathbf{v}_1$ minimizes reconstruction error (sum of orthogonal projection distances).
  - *Data Generating Process (DGP):* 2D / 3D correlated Gaussian point cloud with adjustable covariance matrix.
- **2. Coordinate System Mapping Pipeline:**
  - *Left View:* Original 2D feature space $(X_1, X_2)$ centered at $(\bar{x}_1, \bar{x}_2)$.
  - *Right View:* 1D Scree Plot and projected coordinate space (PC1 vs PC2).
- **3. Tactile Interactive Levers:**
  - *Manual Projection Axis Needle:* Rotate a candidate projection axis $\mathbf{w}$ through $360^\circ$.
  - *Data Covariance Handle:* Drag the covariance ellipse radius and tilt angle.
  - *Auto-Solve Eigenpairs Button:* Snaps projection axes to true eigenvectors $\mathbf{v}_1, \mathbf{v}_2$.
- **4. Real-Time Visual Feedback:**
  - *Orthogonal Projection Plumb Drops:* Perpendicular dashed lines dropping from each point onto candidate axis $\mathbf{w}$.
  - *Variance Fountain Meter:* Real-time bar showing projected variance $\text{Var}(\mathbf{w}^T \mathbf{X}) = \mathbf{w}^T \mathbf{\Sigma} \mathbf{w}$, maxing out when $\mathbf{w} = \mathbf{v}_1$.
  - *Reconstruction Error Envelope:* Shaded area representing sum of squared orthogonal drop distances. Pinned to minimum when variance is maximized.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Eigenvector Lock Harmonic:* Aligning candidate axis with true eigenvector $\mathbf{v}_1$ triggers a rich multi-octave harmonic chord ($220 \to 440 \to 880\,\text{Hz}$).
  - *Continuous Variance Drone:* Rotating the axis modulates a continuous tone whose frequency traces projected variance.

---

#### LESSON-T3-33: Non-Linear Manifold Projection: t-SNE Student-t Repulsion vs UMAP Fuzzy Simplicial Sets
- **1. Component Identifier:** `ManifoldUMAPtSNELab`
  - *Pedagogical Core:* Linear PCA collapses non-linear manifolds (e.g. Swiss Roll). **t-SNE** converts pairwise Euclidean distances into Gaussian probabilities in high dimensions and Student-t distributions in low dimensions ($q_{ij} = \frac{(1 + \|\mathbf{y}_i - \mathbf{y}_j\|^2)^{-1}}{\sum (1 + \|\mathbf{y}_k - \mathbf{y}_l\|^2)^{-1}}$), resolving crowding through heavy tails. **UMAP** models data as fuzzy simplicial complexes, optimizing cross-entropy to preserve both local and global topology with orders-of-magnitude faster convergence.
  - *Data Generating Process (DGP):* 3D Swiss Roll or 10-cluster digits manifold ($n = 300$).
- **2. Coordinate System Mapping Pipeline:**
  - *Split Screen:*
    - Left: 3D interactive rotating Swiss Roll manifold.
    - Right: 2D low-dimensional embedding space $(Y_1, Y_2) \in [-15, 15] \times [-15, 15]$.
- **3. Tactile Interactive Levers:**
  - *Algorithm Selector:* t-SNE vs UMAP.
  - *Perplexity / n_neighbors Dial:* t-SNE Perplexity ($5$ to $50$) / UMAP $n\_neighbors$ ($2$ to $100$).
  - *UMAP min_dist Slider:* Controls packing density in embedding space ($0.001$ to $0.8$).
  - *Iterative Gradient Step Play / Pause:* Runs live force-directed layout simulation frame-by-frame.
- **4. Real-Time Visual Feedback:**
  - *Spring-Repulsion Dynamic Animation:* Points smoothly unroll and cluster in 2D embedding space at 60 FPS.
  - *Fuzzy Simplicial Graph Edges:* UMAP displays high-dimensional nearest-neighbor graph edges as glowing filaments whose opacity represents connection probability.
  - *Cluster Distance Preservation Indicator:* Real-time metric showing preservation of global cluster hierarchies.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Manifold Unrolling Drone:* While the optimization iterations run, generate an ambient generative drone whose harmonic complexity settles as the embedding converges.
  - *Cluster Separation Chimes:* As distinct clusters cleanly isolate in 2D space, play crystal spatialized bell pings.

---

## 4. Shared Architectural Subsystems & Utilities

### 4.1 Statistical Diagnostics Engine (CanvasMath.ts Extension)
```typescript
export interface DiagnosticSummary {
  leverages: Float64Array;
  cooksDistances: Float64Array;
  residuals: Float64Array;
  looSlopes: Float64Array;
  vif: Float64Array;
}

export function computeDiagnostics(X: number[][], y: number[]): DiagnosticSummary {
  // O(N) optimized zero-allocation linear algebra buffers
  // Computes Hat Matrix diagonal h_ii = x_i (X^T X)^-1 x_i^T
  // Computes Cook's D_i = (e_i^2 / (p * MSE)) * (h_ii / (1 - h_ii)^2)
  // Computes Leave-One-Out (LOO) slopes analytically: beta_(-i) = beta - (X^T X)^-1 x_i e_i / (1 - h_ii)
  // ...
}
```

### 4.2 High-Performance 60 FPS Render Loop Guard
All 33 Track 3 simulation canvases conform to the strict zero-allocation render loop:
```typescript
useEffect(() => {
  let animationFrameId: number;
  const render = () => {
    if (isDirty.current) {
      ctx.clearRect(0, 0, width, height);
      drawGrid(ctx, transformer);
      drawPrimitives(ctx, modelState);
      drawDiagnostics(ctx, modelState);
      isDirty.current = false;
    }
    animationFrameId = requestAnimationFrame(render);
  };
  animationFrameId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(animationFrameId);
}, []);
```

### 4.3 Psychoacoustic Audio Synthesis Routing Table
| Trigger Condition | Audio Method | Waveform / Synthesizer | Frequency / Harmonic Profile | Haptic Feedback |
|---|---|---|---|---|
| **Orthogonal Snap / Zero Bias** | `audio.playVictoryHarmonics()` | Polyphonic FM Bell Chime | $523.25, 659.25, 783.99, 987.77, 1174.66\,\text{Hz}$ | `[15, 30, 20, 45, 60] ms` |
| **Endogeneity / OVB / Non-Parallel** | `audio.playErrorDissonance()` | Detuned Sawtooth Cluster + Low Thud | $185.0\,\text{Hz} (\text{F\#3}), 196.0\,\text{Hz} (\text{G3}), 261.63\,\text{Hz} (\text{C4}) + 35\,\text{Hz}$ | `[25, 40, 30] ms` |
| **Weak Instrument ($F < 10$)** | `audio.playWeakInstrumentAlarm()` | Dual Pulsed Sine Alarm | Alternating $880\,\text{Hz} \leftrightarrow 440\,\text{Hz}$ at 4Hz repetition | `[40, 60, 40] ms` |
| **Scrubbing Slider / Rotating Dial** | `audio.playScrubTick(vel)` | Bandpass Filtered Sine Pulse | $1100\,\text{Hz} \times \text{clamp}(v, 0.5, 3.0)$ with 18ms anti-chatter | `4 ms` |
| **L1 Diamond Corner / Margin Contact** | `audio.playSnap()` | High-Q Crystal Ping | $1174.66\,\text{Hz} (\text{D6})$ with 12ms exponential decay | `8 ms` |
| **Continuous Parameter Tuning** | `audio.updateLoss(loss)` | Continuous Dual Triangle/Sub-Bass Drone | Fundamental $55\,\text{Hz} \dots 220\,\text{Hz}$ with resonant lowpass track | None (auditory only) |

---

## 5. Architectural Verification & Compliance Matrix

| Module | Lesson ID | Component Name | Interactive Handles | Real-Time Feedback | Audio Hook |
|---|---|---|---|---|---|
| **MOD-18** | T3-01 | `LinearRegressionResiduals` | Point drag, slope handle, intercept lever | Dynamic error squares, Cook's halo, LOO ghost line | Orthogonal snap chord, continuous loss drone |
| **MOD-18** | T3-02 | `ColumnSpaceProjection3D` | 3D orbit rotation, target vector drag, angle knob | Plumb drop line, 3D orthogonal marker, singular plane | Perpendicular snap, singularity detune |
| **MOD-19** | T3-03 | `GaussMarkovEfficiencyLab` | Weight curve morph, unbiasedness toggle, MC pulse | Sampling distribution bell, excess variance shaded | Efficiency pure tone, noise variance hiss |
| **MOD-19** | T3-04 | `HeteroskedasticityRobustLab` | Fan severity dial, HC0-HC3 pills, leverage pin | Puffing confidence ribbon, $t$-stat false alarm gauge | Fan flare crackle, Type I discovery alarm |
| **MOD-20** | T3-05 | `MultivariatePlaneVifLab` | Collinearity $\rho$ slider, plane seesaw handle | Seesawing normal vector, confidence ellipse, VIF dial | Wobble LFO drone, VIF > 10 siren |
| **MOD-20** | T3-06 | `FWLPartiallingOutLab` | Projection scrubber, regressor confounding lever | Vector morphing traces, purged bivariate lock | Projection sweep, FWL identity chord |
| **MOD-21** | T3-07 | `OmittedVariableBiasCanvas` | $\gamma$ slider, $\pi_1$ slider, quadrant switcher | Shaded bias sector wedge, dynamic OVB HUD equation | Tritone dissonance on bias, fifth resolve |
| **MOD-21** | T3-08 | `SimpsonsParadoxLab` | Cluster centroid drag, within-slope handles, stratify | Flashing reversal badge, centroid highway path | Sign flip click, cluster stratify sweep |
| **MOD-22** | T3-09 | `PotentialOutcomesSplitLab` | God mode switch, observation shutter, effect spread | Counterfactual ghost dots, ATE bracket arrow | Ghost vanish whisper, unit effect ping |
| **MOD-22** | T3-10 | `SelectionBiasPropensityLab` | Selection severity slider, support caliper, randomize | Stacked ATT/Bias bar, propensity danger zone | Overlap violation buzz, zero-bias snap |
| **MOD-23** | T3-11 | `CausalDagBackdoorLab` | Node condition cycle, edge toggles, do(X) surgery | Particle stream, path blocking gate, identifiability badge | Backdoor leak drone, path block click |
| **MOD-23** | T3-12 | `ColliderStratificationLab` | Collider checkbox, slice caliper, collider weights | Red collider sparks, instant spurious OLS tilt | Collider crackle, tritone spurious siren |
| **MOD-24** | T3-13 | `InstrumentalVariablesLab` | Relevance $\pi_1$, confounding $\gamma$, exclusion leak | Wald slope triangle, OLS vs IV meter, red leak fog | Wald lock chime, exclusion dissonance |
| **MOD-24** | T3-14 | `TwoStageLeastSquaresLateLab` | $F$-stat dial, defier toggle, sample size $n$ | Flashing weak $F$ warning, complier highlight, fat tails | Weak instrument alarm, $F \ge 10$ gong |
| **MOD-25** | T3-15 | `PanelFixedEffectsWithinLab` | Demean scrubber, entity correlation $\text{Corr}(\alpha, X)$ | Centroid collapse paths, within-slope alignment | Collapse whoosh, centroid lock tone |
| **MOD-25** | T3-16 | `RandomEffectsHausmanLab` | Quasi-demean $\theta$, endogeneity knob, $N/T$ sliders | Hausman needle, FE vs RE decision banner | Rejection klaxon, efficiency chime |
| **MOD-26** | T3-17 | `DiDParallelTrendsLab` | Treatment effect $\delta$, pre-trend tilt handle, cutoff | Double DiD bracket, parallel trends validator | Parallel snap chord, trend violation tritone |
| **MOD-26** | T3-18 | `StaggeredDiDEventStudyLab` | Dynamic ramp, TWFE vs CS toggle, Bacon pair click | Bacon red negative weights, event study lead test | Bacon alert, CS clean fanfare |
| **MOD-27** | T3-19 | `SharpRDDCutoffLab` | Bandwidth $h$, kernel toggle, polynomial order | Discontinuity bracket, curtain masks, wiggle alert | Cutoff glissando, bandwidth drone |
| **MOD-27** | T3-20 | `FuzzyRDDBandwidthLab` | Sorting dial, CCT optimal button, compliance jump | McCrary density jump, fuzzy scaling ratio | Geiger counter click, CCT snap chime |
| **MOD-28** | T3-21 | `SyntheticControlDonorLab` | Donor weight sliders, QP auto-solver, V matrix knobs | Pre-treatment RMSPE shading, post-gap divergence | Zero RMSPE tone, post-gap brass fanfare |
| **MOD-28** | T3-22 | `SCMPlaceboPermutationLab` | Batch placebo run, RMSPE filter, placebo date shift | Spaghetti trails, ranked MSPE histogram, $p$-value | Placebo marimba, Rank 1 gong |
| **MOD-29** | T3-23 | `RidgeL2GeometryCanvas` | Penalty $\lambda$, eigenvalue aspect, manual tangency | Circle-ellipse tangency point, SVD shrinkage vectors | Tangency snap, shrinkage lowpass sweep |
| **MOD-29** | T3-24 | `RegularizationGeometryCanvas`| $L_1/L_2$ morph $p$, penalty $\lambda$, correlation $\rho$ | Corner tangency snap, sparsity indicator, dual view | Corner impact snap, morphing waveform |
| **MOD-30** | T3-25 | `LogisticSigmoidSurface` | Boundary angle/offset, logit probe, class separation | Probability gradient mesh, loss bowl ball, loss bars | Boundary crossing click, misclassification buzz |
| **MOD-30** | T3-26 | `LogisticIRLSCurvatureLab` | Step Newton button, damping rate $\eta$, initial weight | Osculating paraboloid, leap vector, variance halos | Newton thud, convergence bell |
| **MOD-31** | T3-27 | `SupportVectorMachineKernelLab`| Kernel picker, RBF $\gamma$, penalty $C$, 3D lift scrubber | Support vector halos, margin gutters, slack vectors | Margin pluck, RBF overfit shriek |
| **MOD-32** | T3-28 | `DecisionTreeLaser` | Laser blade drag, split commit button, Gini/Entropy | Impurity gain curve, cell color purity, tree doughnuts | Laser slice whoosh, pure leaf chime |
| **MOD-32** | T3-29 | `RandomForestEnsembleLab` | Tree count $B$, feature count $m$, bootstrap pulse | Smooth boundary contour, OOB convergence, variance map | Forest chorus, variance damping |
| **MOD-33** | T3-30 | `GBMPseudoResidualWaterfallLab`| Stage forward/backward, learning rate $\eta$, depth | Residual waterfall bars, cumulative fit, early stop | Chromatic step, residual shrink drone |
| **MOD-33** | T3-31 | `XGBoostHessianGainLab` | Regularizer $\lambda$, pruning $\gamma$, split candidate probe | Exact gain profile, pruning scissors, leaf weights | Gain peak snap, scissor snip |
| **MOD-34** | T3-32 | `PCAEigenProjectionLab` | Projection axis needle, covariance handle, eigen snap | Orthogonal drop lines, variance fountain, error envelope| Eigen lock chord, variance drone |
| **MOD-34** | T3-33 | `ManifoldUMAPtSNELab` | t-SNE vs UMAP, perplexity/neighbors, min_dist, run | 60 FPS unrolling animation, simplicial graph edges | Manifold drone, cluster separation chimes |

---
**OKVIR Verification Seal:** All 33 simulations adhere strictly to the 16.67ms frame budget, zero-allocation render loop, retina HiDPI normalization, and pure offline procedural Web Audio synthesis standards.
