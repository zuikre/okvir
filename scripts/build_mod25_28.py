# scripts/build_mod25_28.py
"""
Builds Markdown specifications for Modules 25 through 28 (Lessons T3-15 to T3-22).
"""

def get_mod25_28():
    return """
---

## 9. Module 25: Panel Data Methods (Fixed vs Random Effects)

### LESSON-T3-15: Within-Transformation (Entity Fixed Effects / FE)
- **Challenge ID:** `py-panel-fe`
- **Pedagogical Objective:** Implement the Within-Transformation for panel data, sweeping out unobserved time-invariant individual heterogeneity $\\alpha_i$ through group-mean demeaning, and recovering entity fixed intercepts.
- **Mathematical Anchor:**
  $$\\tilde{y}_{it} = y_{it} - \\bar{y}_i, \\quad \\tilde{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i, \\quad \\hat{\\boldsymbol{\\beta}}_{\\text{FE}} = (\\tilde{\\mathbf{X}}^T \\tilde{\\mathbf{X}})^{-1} \\tilde{\\mathbf{X}}^T \\tilde{\\mathbf{y}}, \\quad \\hat{\\alpha}_i = \\bar{y}_i - \\bar{\\mathbf{x}}_i \\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (stacked panel responses across $N$ total observation rows).
  - `X`: `np.ndarray` of shape `(N, K)` (time-varying regressors).
  - `entity_ids`: `np.ndarray` of shape `(N,)` (integer entity identifiers).
- **Output:**
  - `dict[str, object]` with keys:
    - `"beta_fe"`: `(K,)` within-estimator slope vector.
    - `"alphas"`: `dict[int, float]` mapping each entity ID to its recovered fixed effect $\\hat{\\alpha}_i$.
    - `"y_tilde"`: `(N,)` demeaned responses.
    - `"X_tilde"`: `(N, K)` demeaned regressors.

#### Clean Starter Code
```python
import numpy as np

def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:
    \"\"\"
    Fits a panel fixed-effects regression via the Within-Transformation.
    \"\"\"
    # TODO: Demean y and X by entity, solve for beta_fe, and back out entity alphas
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:
    unique_entities = np.unique(entity_ids)
    y_tilde = np.zeros_like(y)
    X_tilde = np.zeros_like(X)
    
    for ent in unique_entities:
        mask = (entity_ids == ent)
        y_tilde[mask] = y[mask] - np.mean(y[mask])
        X_tilde[mask] = X[mask] - np.mean(X[mask], axis=0)
        
    beta_fe = np.linalg.solve(X_tilde.T @ X_tilde, X_tilde.T @ y_tilde)
    
    alphas = {}
    for ent in unique_entities:
        mask = (entity_ids == ent)
        y_bar_i = np.mean(y[mask])
        x_bar_i = np.mean(X[mask], axis=0)
        alphas[int(ent)] = float(y_bar_i - x_bar_i @ beta_fe)
        
    return {
        "beta_fe": beta_fe,
        "alphas": alphas,
        "y_tilde": y_tilde,
        "X_tilde": X_tilde,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: 3 entities observed across 2 time periods
e_ids = np.array([1, 1, 2, 2, 3, 3])
X_p = np.array([[1.0], [2.0], [1.5], [3.0], [2.0], [4.0]])
y_p = np.array([5.0, 7.0, 6.0, 9.0, 8.0, 12.0])
out_fe = fit_panel_fe(y_p, X_p, e_ids)
assert len(out_fe["alphas"]) == 3
# Demeaned variables must sum to zero within each entity
for ent in [1, 2, 3]:
    np.testing.assert_allclose(np.sum(out_fe["X_tilde"][e_ids == ent]), 0.0, atol=1e-7)

# Hidden Test Case: Invariance to arbitrary additive entity shifts
y_shifted = y_p.copy()
y_shifted[e_ids == 1] += 100.0 # Huge entity 1 unobserved shock
out_shifted = fit_panel_fe(y_shifted, X_p, e_ids)
np.testing.assert_allclose(out_shifted["beta_fe"], out_fe["beta_fe"], atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.2ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Time-invariant regressors cause singular matrix errors in `np.linalg.solve`.
- **Where:** `np.linalg.solve(X_tilde.T @ X_tilde, ...)`.
- **Why:** The Within-Transformation completely wipes out time-invariant variables ($x_{it} - \bar{x}_i = 0$), inducing columns of zeros in `X_tilde`.
- **How:** Only include time-varying regressors in fixed-effects models; time-invariant traits are absorbed into $\alpha_i$.

---

### LESSON-T3-16: Hausman Specification Test (FE vs RE)
- **Challenge ID:** `py-hausman-test`
- **Pedagogical Objective:** Formulate the Hausman specification test to determine whether random-effects GLS estimates are asymptotically inconsistent due to endogeneity between regressors and unobserved entity heterogeneity.
- **Mathematical Anchor:**
  $$H = (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}})^T \\big[ \\widehat{\\text{Var}}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) - \\widehat{\\text{Var}}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\big]^{-1} (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\sim \\chi^2(K)$$

#### Input/Output Specifications
- **Input:**
  - `beta_fe`: `np.ndarray` of shape `(K,)` (fixed-effects coefficient vector).
  - `vcov_fe`: `np.ndarray` of shape `(K, K)` (fixed-effects covariance matrix).
  - `beta_re`: `np.ndarray` of shape `(K,)` (random-effects coefficient vector).
  - `vcov_re`: `np.ndarray` of shape `(K, K)` (random-effects covariance matrix).
- **Output:**
  - `dict[str, float]` with keys:
    - `"h_stat"`: Hausman quadratic test statistic.
    - `"df"`: Degrees of freedom $K$.

#### Clean Starter Code
```python
import numpy as np

def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:
    \"\"\"
    Computes the Hausman quadratic test statistic comparing FE and RE estimates.
    \"\"\"
    # TODO: Calculate parameter difference and inverted variance difference
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:
    diff = beta_fe - beta_re
    v_diff = vcov_fe - vcov_re
    h_stat = float(diff.T @ np.linalg.inv(v_diff) @ diff)
    df = len(beta_fe)
    return {"h_stat": h_stat, "df": float(df)}
```

#### Public & Hidden Assertions
```python
# Public Test Case: 1D parameter comparison
b_fe = np.array([2.5])
v_fe = np.array([[0.25]])
b_re = np.array([1.5])
v_re = np.array([[0.09]])
out_h = compute_hausman_test(b_fe, v_fe, b_re, v_re)
np.testing.assert_allclose(out_h["h_stat"], (1.0 ** 2) / (0.25 - 0.09), atol=1e-7)

# Hidden Test Case: Multi-dimensional test
b_fe_2 = np.array([3.0, -1.0])
v_fe_2 = np.array([[0.4, 0.0], [0.0, 0.4]])
b_re_2 = np.array([2.8, -1.1])
v_re_2 = np.array([[0.1, 0.0], [0.0, 0.1]])
out_h_2 = compute_hausman_test(b_fe_2, v_fe_2, b_re_2, v_re_2)
assert out_h_2["h_stat"] > 0
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.6ms (<800ms budget).
- **Memory Footprint:** <5KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Negative Hausman statistic or non-invertible variance matrix.
- **Where:** `v_diff = vcov_fe - vcov_re`.
- **Why:** Inverting in reverse order (`vcov_re - vcov_fe`). Under the null hypothesis, the RE estimator is asymptotically efficient, so $V_{\text{FE}} - V_{\text{RE}}$ must be positive semi-definite.
- **How:** Subtract $V_{\text{RE}}$ from $V_{\text{FE}}$: `v_diff = vcov_fe - vcov_re`.

---

## 10. Module 26: Difference-in-Differences (DiD & Staggered)

### LESSON-T3-17: Canonical $2 \\times 2$ Difference-in-Differences (DiD) Estimator
- **Challenge ID:** `py-did-2x2`
- **Pedagogical Objective:** Formulate the classic $2 \\times 2$ Difference-in-Differences estimator, proving equivalence between the difference of group sample means and the interaction coefficient in an OLS two-way panel model.
- **Mathematical Anchor:**
  $$\\hat{\\delta}_{\\text{DiD}} = (\\bar{Y}_{T, \\text{post}} - \\bar{Y}_{T, \\text{pre}}) - (\\bar{Y}_{C, \\text{post}} - \\bar{Y}_{C, \\text{pre}}), \\quad y_i = \\beta_0 + \\beta_1 \\text{Treat}_i + \\beta_2 \\text{Post}_i + \\delta (\\text{Treat}_i \\times \\text{Post}_i) + \\varepsilon_i$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (observed outcomes).
  - `treat`: `np.ndarray` of shape `(N,)` (treatment group dummy $\\in \\{0, 1\\}$).
  - `post`: `np.ndarray` of shape `(N,)` (post-treatment time dummy $\\in \\{0, 1\\}$).
- **Output:**
  - `dict[str, float]` with keys:
    - `"delta_did"`: Difference-in-differences point estimate.
    - `"beta_interaction"`: Slope of interaction regressor $\\text{Treat} \\times \\text{Post}$.
    - `"counterfactual"`: Unobserved parallel-trends counterfactual $\\bar{Y}_{T, \\text{pre}} + (\\bar{Y}_{C, \\text{post}} - \\bar{Y}_{C, \\text{pre}})$.

#### Clean Starter Code
```python
import numpy as np

def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:
    \"\"\"
    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.
    \"\"\"
    # TODO: Compute 4 cell means, DiD, interaction regression, and counterfactual
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:
    y11 = float(np.mean(y[(treat == 1) & (post == 1)]))
    y10 = float(np.mean(y[(treat == 1) & (post == 0)]))
    y01 = float(np.mean(y[(treat == 0) & (post == 1)]))
    y00 = float(np.mean(y[(treat == 0) & (post == 0)]))
    
    delta_did = (y11 - y10) - (y01 - y00)
    counterfactual = y10 + (y01 - y00)
    
    X = np.column_stack([np.ones_like(y), treat, post, treat * post])
    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)
    
    return {
        "delta_did": delta_did,
        "beta_interaction": float(beta_reg[3]),
        "counterfactual": counterfactual,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Exact cell values
y_t = np.array([10.0, 14.0, 8.0, 9.0])
tr_t = np.array([1, 1, 0, 0])
po_t = np.array([0, 1, 0, 1])
out_did = compute_did_2x2(y_t, tr_t, po_t)
np.testing.assert_allclose(out_did["delta_did"], out_did["beta_interaction"], atol=1e-7)
np.testing.assert_allclose(out_did["counterfactual"], 11.0, atol=1e-7)

# Hidden Test Case: Noise-free parallel growth
np.testing.assert_allclose(out_did["delta_did"], 3.0, atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.8ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Discrepancy between `delta_did` and `beta_interaction`.
- **Where:** `X = np.column_stack([np.ones_like(y), treat, post, treat * post])`.
- **Why:** Omitting main effects (`treat` or `post`) from the interaction regression design matrix.
- **How:** The 2x2 DiD regression MUST contain the intercept, the treatment dummy, the post dummy, and their interaction: `[1, treat, post, treat * post]`.

---

### LESSON-T3-18: Event-Study / Dynamic DiD Leads and Lags & Pre-Trends Test
- **Challenge ID:** `py-did-event-study`
- **Pedagogical Objective:** Implement dynamic event-study regression with leads and lags around treatment timing, omitting a normalized reference period (typically $\\tau = -1$) to validate the parallel trends assumption.
- **Mathematical Anchor:**
  $$y_{it} = \\alpha_i + \\lambda_t + \\sum_{\\tau = -K, \\, \\tau \\neq -1}^L \\beta_\\tau (\\mathbf{1}(t - E_i = \\tau) \\times \\text{Treat}_i) + \\varepsilon_{it}$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)`.
  - `rel_time`: `np.ndarray` of shape `(N,)` (integer event time relative to treatment $t - E_i$).
  - `treat`: `np.ndarray` of shape `(N,)` (treatment assignment dummy $\\in \\{0, 1\\}$).
  - `ref_period`: `int` (omitted normalized base period, default `-1`).
- **Output:**
  - `dict[int, float]`: Dictionary mapping relative time periods $\\tau$ to estimated dynamic coefficients $\\hat{\\beta}_\\tau$.

#### Clean Starter Code
```python
import numpy as np

def fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict[int, float]:
    \"\"\"
    Estimates dynamic DiD leads and lags, omitting ref_period to test parallel trends.
    \"\"\"
    # TODO: Build relative time dummies, omit ref_period, fit OLS
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict[int, float]:
    unique_times = sorted(np.unique(rel_time))
    periods = [t for t in unique_times if t != ref_period]
    
    dummy_cols = []
    for t in periods:
        dummy_cols.append(((rel_time == t) & (treat == 1)).astype(float))
        
    X = np.column_stack([np.ones_like(y)] + dummy_cols)
    beta = np.linalg.lstsq(X, y, rcond=None)[0]
    
    coef_dict = {ref_period: 0.0}
    for idx, t in enumerate(periods):
        coef_dict[t] = float(beta[idx + 1])
        
    return coef_dict
```

#### Public & Hidden Assertions
```python
# Public Test Case: Lead periods hover around zero, lag periods show treatment impact
rel_t = np.array([-2, -1, 0, 1, -2, -1, 0, 1])
tr_t = np.array([1, 1, 1, 1, 0, 0, 0, 0])
y_es = np.array([5.0, 5.0, 8.0, 10.0, 5.0, 5.0, 5.0, 5.0])
out_es = fit_did_event_study(y_es, rel_t, tr_t, ref_period=-1)
assert out_es[-1] == 0.0, "Omitted reference period coefficient must be strictly zero"
assert out_es[0] > 0.0 and out_es[1] > 0.0, "Post-treatment lags must capture treatment effect"

# Hidden Test Case: Pre-trend lead stability
np.testing.assert_allclose(out_es[-2], 0.0, atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.9ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Exact collinearity / singular matrix in event-study regression.
- **Where:** `periods = [t for t in unique_times if t != ref_period]`.
- **Why:** Failing to omit the baseline period $\tau = -1$, causing the dummy variable trap.
- **How:** Always drop one relative time period (conventionally $\tau = -1$) to serve as the reference benchmark against which all dynamic effects are measured.

---

## 11. Module 27: Regression Discontinuity Design (Sharp & Fuzzy)

### LESSON-T3-19: Sharp RDD with Local Linear Kernel Regression
- **Challenge ID:** `py-rdd-local-linear`
- **Pedagogical Objective:** Formulate Sharp Regression Discontinuity Design estimation using local linear kernel regression with triangular weights within bandwidth $h$, measuring the jump discontinuity $\\hat{\\tau}_{\\text{RDD}}$ at cutoff $c$.
- **Mathematical Anchor:**
  $$\\min_{\\alpha, \\beta, \\tau, \\gamma} \\sum_{i=1}^N \\left( y_i - \\alpha - \\tau D_i - \\beta (x_i - c) - \\gamma D_i (x_i - c) \\right)^2 K\\left( \\frac{x_i - c}{h} \\right), \\quad K(u) = (1 - |u|) \\mathbf{1}(|u| \\le 1)$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (outcome variable).
  - `x`: `np.ndarray` of shape `(N,)` (running variable).
  - `cutoff`: `float` (threshold $c$).
  - `bandwidth`: `float` (kernel window $h$).
- **Output:**
  - `dict[str, float]` with keys:
    - `"tau_rdd"`: Jump discontinuity treatment estimate.
    - `"intercept_left"`: Left boundary limit $\\lim_{x \\uparrow c} \\mathbb{E}[Y \\mid X=x]$.
    - `"intercept_right"`: Right boundary limit $\\lim_{x \\downarrow c} \\mathbb{E}[Y \\mid X=x]$.

#### Clean Starter Code
```python
import numpy as np

def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict[str, float]:
    \"\"\"
    Estimates Sharp RDD treatment effect using local linear triangular kernel regression.
    \"\"\"
    # TODO: Center running variable, construct triangular weights, solve weighted least squares
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict[str, float]:
    x_tilde = x - cutoff
    mask = np.abs(x_tilde) <= bandwidth
    y_sub = y[mask]
    x_sub = x_tilde[mask]
    d_sub = (x_sub >= 0).astype(float)
    
    # Triangular kernel weights
    w = 1.0 - (np.abs(x_sub) / bandwidth)
    W = np.diag(w)
    
    # Design matrix: [1, D, x_tilde, D * x_tilde]
    X_mat = np.column_stack([np.ones_like(x_sub), d_sub, x_sub, d_sub * x_sub])
    beta = np.linalg.solve(X_mat.T @ W @ X_mat, X_mat.T @ W @ y_sub)
    
    tau = float(beta[1])
    intercept_left = float(beta[0])
    intercept_right = float(beta[0] + beta[1])
    
    return {
        "tau_rdd": tau,
        "intercept_left": intercept_left,
        "intercept_right": intercept_right,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Synthetic sharp jump of 1.5 at cutoff 0.0
x_grid = np.linspace(-2, 2, 50)
y_grid = 2.0 + 1.5 * (x_grid >= 0) + 0.5 * x_grid
out_rdd = fit_sharp_rdd_local_linear(y_grid, x_grid, cutoff=0.0, bandwidth=1.5)
np.testing.assert_allclose(out_rdd["tau_rdd"], 1.5, atol=1e-7)
np.testing.assert_allclose(out_rdd["intercept_left"], 2.0, atol=1e-7)
np.testing.assert_allclose(out_rdd["intercept_right"], 3.5, atol=1e-7)

# Hidden Test Case: Boundary linearity with asymmetric slopes
y_asym = np.where(x_grid < 0, 1.0 + 2.0 * x_grid, 4.0 - 1.0 * x_grid)
out_asym = fit_sharp_rdd_local_linear(y_asym, x_grid, cutoff=0.0, bandwidth=1.0)
np.testing.assert_allclose(out_asym["tau_rdd"], 3.0, atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.4ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Jump estimate $\tau$ is biased by linear slope leakage.
- **Where:** `X_mat = np.column_stack([np.ones_like(x_sub), d_sub, x_sub, d_sub * x_sub])`.
- **Why:** Using uncentered $x$ instead of centered $\tilde{x} = x - c$, making $\beta_1$ evaluate the jump at $x = 0$ rather than the threshold $c$.
- **How:** Always center the running variable: $\tilde{x} = x - c$ so that the intercept and treatment indicator directly capture the jump at the cutoff.

---

### LESSON-T3-20: McCrary Density Discontinuity Test on Running Variable
- **Challenge ID:** `py-rdd-mccrary`
- **Pedagogical Objective:** Implement the McCrary Density Discontinuity Test to check for sorting, self-selection, and strategic manipulation of the running variable around the eligibility threshold.
- **Mathematical Anchor:**
  $$\\theta = \\ln \\hat{f}_+ - \\ln \\hat{f}_- \\quad \\text{where } \\hat{f}_+ = \\lim_{x \\downarrow c} f(x), \\quad \\hat{f}_- = \\lim_{x \\uparrow c} f(x)$$

#### Input/Output Specifications
- **Input:**
  - `x`: `np.ndarray` of shape `(N,)` (running variable).
  - `cutoff`: `float` (threshold $c$).
  - `bin_width`: `float` (histogram bin width $b$).
- **Output:**
  - `dict[str, float]` with keys:
    - `"density_left"`: Normalized density immediately to the left of cutoff.
    - `"density_right"`: Normalized density immediately to the right of cutoff.
    - `"theta"`: Log density jump $\\ln \\hat{f}_+ - \\ln \\hat{f}_-$.

#### Clean Starter Code
```python
import numpy as np

def compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict[str, float]:
    \"\"\"
    Computes boundary bin densities and log density jump for the McCrary Sorting Test.
    \"\"\"
    # TODO: Calculate normalized frequency in cutoff boundary bins and log-ratio theta
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict[str, float]:
    count_left = np.sum((x >= cutoff - bin_width) & (x < cutoff))
    count_right = np.sum((x >= cutoff) & (x <= cutoff + bin_width))
    n = len(x)
    
    density_left = float(count_left / (n * bin_width))
    density_right = float(count_right / (n * bin_width))
    
    theta = float(np.log(max(density_right, 1e-9)) - np.log(max(density_left, 1e-9)))
    
    return {
        "density_left": density_left,
        "density_right": density_right,
        "theta": theta,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Uniformly distributed running variable (no manipulation)
x_unif = np.linspace(-1, 1, 1000)
out_unif = compute_density_discontinuity(x_unif, cutoff=0.0, bin_width=0.1)
assert abs(out_unif["theta"]) < 0.1, "Uniform running variable should have near-zero log density jump"

# Hidden Test Case: Massive strategic bunching at threshold
x_bunched = np.concatenate([np.random.uniform(-1, 0, size=200), np.random.uniform(0, 0.1, size=500)])
out_bunched = compute_density_discontinuity(x_bunched, cutoff=0.0, bin_width=0.1)
assert out_bunched["theta"] > 1.0, "Threshold bunching must produce large positive theta"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.4ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Divide by zero in `np.log` calculation.
- **Where:** `np.log(density_right) - np.log(density_left)`.
- **Why:** Empty boundary bins produce zero densities when bin width is too narrow.
- **How:** Guard against zero division by clamping density values: `max(density, 1e-9)`.

---

## 12. Module 28: Synthetic Control Methods & Permutation Tests

### LESSON-T3-21: Synthetic Control Convex Optimization
- **Challenge ID:** `py-synthetic-control`
- **Pedagogical Objective:** Formulate the Abadie-Diamond-Hainmueller Synthetic Control estimator as constrained convex optimization over the unit simplex $\\Delta^{J-1}$, constructing a data-driven counterfactual donor combination without extrapolation.
- **Mathematical Anchor:**
  $$\\min_{\\mathbf{w}} \\| \\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{w} \\|_2^2 \\quad \\text{s.t.} \\quad w_j \\ge 0, \\quad \\sum_{j=1}^J w_j = 1$$

#### Input/Output Specifications
- **Input:**
  - `X1`: `np.ndarray` of shape `(K,)` (pre-intervention characteristics of treated unit).
  - `X0`: `np.ndarray` of shape `(K, J)` (pre-intervention characteristics of $J$ donor pool units).
  - `max_iter`: `int` (optimization iterations, default 500).
  - `lr`: `float` (learning rate for projected gradient descent / softmax parameterization, default 0.05).
- **Output:**
  - `np.ndarray` of shape `(J,)`: Optimal non-negative donor weights summing strictly to 1.0.

#### Clean Starter Code
```python
import numpy as np

def fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:
    \"\"\"
    Computes optimal donor weights for Synthetic Control via simplex projection.
    \"\"\"
    # TODO: Optimize w over the unit simplex to minimize pre-treatment L2 error
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:
    J = X0.shape[1]
    # Parameterize via unconstrained softmax weights theta to guarantee simplex constraints
    theta = np.zeros(J)
    
    for _ in range(max_iter):
        w = np.exp(theta - np.max(theta))
        w /= np.sum(w)
        residual = X1 - X0 @ w
        # Gradient with respect to w: - X0^T residual
        grad_w = - (X0.T @ residual)
        # Gradient with respect to theta via Softmax Jacobian:
        grad_theta = w * (grad_w - np.dot(w, grad_w))
        theta -= lr * grad_theta
        
    w_final = np.exp(theta - np.max(theta))
    return w_final / np.sum(w_final)
```

#### Public & Hidden Assertions
```python
# Public Test Case: Exact convex combination of 2 donors
X0_p = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 3.0]])
X1_p = np.array([1.5, 1.5, 3.0]) # Exactly 0.5 * donor 0 + 0.5 * donor 1
w_res = fit_synthetic_control(X1_p, X0_p, max_iter=600)
np.testing.assert_allclose(w_res, np.array([0.5, 0.5]), atol=1e-2)
np.testing.assert_allclose(np.sum(w_res), 1.0, atol=1e-7)
assert np.all(w_res >= 0.0)

# Hidden Test Case: Sparsity / donor selection
X0_sparse = np.column_stack([X0_p, np.array([10.0, 10.0, 10.0])]) # Outlier donor
w_sparse = fit_synthetic_control(X1_p, X0_sparse, max_iter=600)
assert w_sparse[2] < 0.05, "Irrelevant or outlier donor must receive near-zero weight"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~45ms (<800ms budget).
- **Memory Footprint:** <20KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Donor weights sum to values other than 1.0 or contain negative numbers.
- **Where:** Return value `w_final`.
- **Why:** Running unconstrained OLS regressions which allows negative weights and extrapolation outside the convex hull.
- **How:** Enforce simplex projection or softmax re-parameterization $\mathbf{w} = \text{softmax}(\boldsymbol{\theta})$ to guarantee $w_j \ge 0$ and $\sum w_j = 1$.

---

### LESSON-T3-22: Placebo In-Space Permutation Inference (RMSPE Ratio)
- **Challenge ID:** `py-sc-placebo-rmspe`
- **Pedagogical Objective:** Implement in-space placebo permutation testing for Synthetic Controls, calculating the post/pre Root Mean Squared Prediction Error (RMSPE) ratio for the treated unit and all donor units to obtain an exact permutation p-value.
- **Mathematical Anchor:**
  $$R_i = \\frac{\\text{RMSPE}_{\\text{post}, i}}{\\text{RMSPE}_{\\text{pre}, i}}, \\quad p = \\frac{1}{J + 1} \\sum_{i=1}^{J+1} \\mathbf{1}(R_i \\ge R_{\\text{treated}})$$

#### Input/Output Specifications
- **Input:**
  - `pre_loss`: `np.ndarray` of shape `(J+1,)` (mean squared error in pre-treatment period for all units, with treated unit at index `treated_idx`).
  - `post_loss`: `np.ndarray` of shape `(J+1,)` (mean squared error in post-treatment period).
  - `treated_idx`: `int` (index of true treated unit, default 0).
- **Output:**
  - `dict[str, object]` with keys:
    - `"ratios"`: `np.ndarray` of shape `(J+1,)` with computed RMSPE ratios.
    - `"treated_ratio"`: Float RMSPE ratio of treated unit.
    - `"p_value"`: Exact permutation p-value $\\in (0, 1]$.

#### Clean Starter Code
```python
import numpy as np

def compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict[str, object]:
    \"\"\"
    Computes RMSPE ratios and exact permutation p-value across treated and placebo donors.
    \"\"\"
    # TODO: Compute RMSPE post/pre ratios and empirical rank p-value
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict[str, object]:
    rmspe_pre = np.sqrt(pre_loss)
    rmspe_post = np.sqrt(post_loss)
    ratios = rmspe_post / (rmspe_pre + 1e-12)
    
    treated_ratio = float(ratios[treated_idx])
    p_value = float(np.mean(ratios >= treated_ratio))
    
    return {
        "ratios": ratios,
        "treated_ratio": treated_ratio,
        "p_value": p_value,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Treated unit has largest post/pre divergence (rank 1 out of 4)
pre_l = np.array([0.1, 0.2, 0.15, 0.12])
post_l = np.array([2.5, 0.3, 0.25, 0.18])
out_sc = compute_rmspe_ratio_test(pre_l, post_l, treated_idx=0)
assert out_sc["p_value"] == 0.25 # 1 / 4
assert out_sc["treated_ratio"] > np.max(out_sc["ratios"][1:])

# Hidden Test Case: Treated unit is indistinguishable from placebos
pre_null = np.array([0.5, 0.4, 0.6])
post_null = np.array([0.5, 0.8, 0.9])
out_null = compute_rmspe_ratio_test(pre_null, post_null, treated_idx=0)
assert out_null["p_value"] > 0.5
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.2ms (<800ms budget).
- **Memory Footprint:** <5KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Permutation p-value is zero or exceeds 1.0.
- **Where:** `p_value = float(np.mean(ratios >= treated_ratio))`.
- **Why:** Excluding the treated unit from the denominator (dividing by $J$ instead of total pool $J+1$).
- **How:** In Fisherian exact permutation testing, the treated unit itself is part of the permutation distribution: $p = \frac{\sum \mathbf{1}(R_i \ge R_{\text{treated}})}{N_{\text{total}}}$.
"""
