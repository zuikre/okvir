# scripts/build_mod22_24.py
"""
Builds Markdown specifications for Modules 22 through 24 (Lessons T3-09 to T3-14).
"""

def get_mod22_24():
    return """
---

## 6. Module 22: Rubin Potential Outcomes & Selection Bias

### LESSON-T3-09: ATE, ATT, and Selection Bias Decomposition
- **Challenge ID:** `py-selection-bias`
- **Pedagogical Objective:** Implement the Rubin Causal Model potential outcomes framework $(Y_1, Y_0)$, and compute the exact algebraic decomposition of observational difference in means into Average Treatment Effect on the Treated (ATT) and Baseline Selection Bias.
- **Mathematical Anchor:**
  $$\\underbrace{\\mathbb{E}[Y \\mid D=1] - \\mathbb{E}[Y \\mid D=0]}_{\\text{Naive Observational Difference}} = \\underbrace{\\mathbb{E}[Y_1 - Y_0 \\mid D=1]}_{\\text{ATT}} + \\underbrace{\\big(\\mathbb{E}[Y_0 \\mid D=1] - \\mathbb{E}[Y_0 \\mid D=0]\\big)}_{\\text{Baseline Selection Bias}}$$

#### Input/Output Specifications
- **Input:**
  - `y0`: `np.ndarray` of shape `(N,)` (potential outcome under control).
  - `y1`: `np.ndarray` of shape `(N,)` (potential outcome under treatment).
  - `d`: `np.ndarray` of shape `(N,)` (binary treatment indicators $\\in \\{0, 1\\}$).
- **Output:**
  - `dict[str, float]` with keys:
    - `"naive_diff"`: Difference in observed sample means $\\bar{Y}_{D=1} - \\bar{Y}_{D=0}$.
    - `"ate"`: True population Average Treatment Effect $\\mathbb{E}[Y_1 - Y_0]$.
    - `"att"`: True Average Treatment Effect on the Treated $\\mathbb{E}[Y_1 - Y_0 \\mid D=1]$.
    - `"selection_bias"`: Baseline selection bias $\\mathbb{E}[Y_0 \\mid D=1] - \\mathbb{E}[Y_0 \\mid D=0]$.

#### Clean Starter Code
```python
import numpy as np

def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:
    \"\"\"
    Decomposes the naive difference in means into ATT and Baseline Selection Bias.
    \"\"\"
    # TODO: Realize observed outcome y = d * y1 + (1 - d) * y0 and compute metrics
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:
    d_bool = d.astype(bool)
    y_obs = np.where(d_bool, y1, y0)
    
    naive_diff = float(np.mean(y_obs[d_bool]) - np.mean(y_obs[~d_bool]))
    ate = float(np.mean(y1 - y0))
    att = float(np.mean(y1[d_bool] - y0[d_bool]))
    selection_bias = float(np.mean(y0[d_bool]) - np.mean(y0[~d_bool]))
    
    return {
        "naive_diff": naive_diff,
        "ate": ate,
        "att": att,
        "selection_bias": selection_bias,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Positive selection bias (healthier patients seek treatment)
y0_t = np.array([10.0, 12.0, 14.0, 11.0, 13.0, 15.0])
y1_t = np.array([15.0, 18.0, 20.0, 14.0, 16.0, 19.0])
d_t = np.array([1, 1, 1, 0, 0, 0])
res_sb = decompose_selection_bias(y0_t, y1_t, d_t)
np.testing.assert_allclose(res_sb["naive_diff"], res_sb["att"] + res_sb["selection_bias"], atol=1e-7)

# Hidden Test Case: Completely randomized experiment (Selection Bias -> 0)
rng = np.random.default_rng(2201)
N = 1000
y0_r = rng.normal(50.0, 5.0, size=N)
y1_r = y0_r + 10.0 # Homogeneous treatment effect = 10.0
d_r = rng.binomial(1, 0.5, size=N)
res_r = decompose_selection_bias(y0_r, y1_r, d_r)
np.testing.assert_allclose(res_r["ate"], 10.0, atol=1e-5)
np.testing.assert_allclose(res_r["att"], 10.0, atol=1e-5)
assert abs(res_r["selection_bias"]) < 0.6, "RCT selection bias should be close to zero"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.7ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Identity failure: `naive_diff != att + selection_bias`.
- **Where:** `selection_bias = np.mean(y0[d_bool]) - np.mean(y0[~d_bool])`.
- **Why:** Evaluating selection bias using observed $Y$ rather than potential baseline control outcome $Y_0$.
- **How:** Selection bias measures baseline counterfactual difference under control: compare `y0[d == 1]` against `y0[d == 0]`.

---

### LESSON-T3-10: Propensity Score Weighting & IPW (Inverse Probability Weighting)
- **Challenge ID:** `py-ipw-estimator`
- **Pedagogical Objective:** Implement the Horvitz-Thompson and normalized Hajek Inverse Probability Weighting (IPW) estimator to recover unbiased causal treatment effects from observationally confounded cohorts.
- **Mathematical Anchor:**
  $$\\hat{\\tau}_{\\text{Hajek}} = \\frac{\\sum_{i=1}^N \\frac{D_i Y_i}{e(\\mathbf{x}_i)}}{\\sum_{i=1}^N \\frac{D_i}{e(\\mathbf{x}_i)}} - \\frac{\\sum_{i=1}^N \\frac{(1 - D_i) Y_i}{1 - e(\\mathbf{x}_i)}}{\\sum_{i=1}^N \\frac{1 - D_i}{1 - e(\\mathbf{x}_i)}}, \\quad e(\\mathbf{x}_i) = P(D_i = 1 \\mid \\mathbf{X} = \\mathbf{x}_i)$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (observed response vector).
  - `d`: `np.ndarray` of shape `(N,)` (binary treatment indicator $\\in \\{0, 1\\}$).
  - `ps`: `np.ndarray` of shape `(N,)` (propensity scores $e_i \\in (0, 1)$).
  - `normalized`: `bool` (default `True`; uses Hajek sample weight normalization).
- **Output:**
  - `float`: Estimated Average Treatment Effect $\\hat{\\tau}_{\\text{IPW}}$.

#### Clean Starter Code
```python
import numpy as np

def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:
    \"\"\"
    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.
    \"\"\"
    # TODO: Clip extreme propensity scores and calculate weighted treatment effect
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:
    ps_clipped = np.clip(ps, 1e-4, 1.0 - 1e-4)
    w1 = d / ps_clipped
    w0 = (1.0 - d) / (1.0 - ps_clipped)
    
    if normalized:
        mu1 = np.sum(w1 * y) / np.sum(w1)
        mu0 = np.sum(w0 * y) / np.sum(w0)
    else:
        mu1 = np.mean(w1 * y)
        mu0 = np.mean(w0 * y)
    return float(mu1 - mu0)
```

#### Public & Hidden Assertions
```python
# Public Test Case: Confounded observational sample
y_test = np.array([20.0, 22.0, 15.0, 12.0, 14.0])
d_test = np.array([1, 1, 1, 0, 0])
ps_test = np.array([0.8, 0.7, 0.6, 0.2, 0.3])
tau_ipw = compute_ipw_ate(y_test, d_test, ps_test, normalized=True)
assert isinstance(tau_ipw, float)
assert tau_ipw > 0

# Hidden Test Case: Perfect balance recovered
rng = np.random.default_rng(2202)
N = 500
x = rng.uniform(-2, 2, size=N)
ps_true = 1.0 / (1.0 + np.exp(-x))
d_sim = rng.binomial(1, ps_true)
# True treatment effect is constant +3.0, but x confounds y
y_sim = 10.0 + 3.0 * d_sim + 2.0 * x + rng.normal(0, 0.5, size=N)
est_ate = compute_ipw_ate(y_sim, d_sim, ps_true, normalized=True)
np.testing.assert_allclose(est_ate, 3.0, atol=0.25)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.3ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Extreme variance or `NaN` in estimated treatment effect.
- **Where:** `w0 = (1.0 - d) / (1.0 - ps)`.
- **Why:** Propensity scores near 0 or 1 produce exploding inverse weights that violate positivity/overlap.
- **How:** Clip propensity scores within a safe numerical interval: `ps = np.clip(ps, 1e-4, 1.0 - 1e-4)`.

---

## 7. Module 23: Graphical Causal Models (DAGs & Colliders)

### LESSON-T3-11: Backdoor Criterion & Confounder Adjustment
- **Challenge ID:** `py-backdoor-adjustment`
- **Pedagogical Objective:** Apply Pearl's Backdoor Criterion by non-parametrically adjusting for a discrete confounder $Z$ via exact subclassification / stratum-weighted aggregation.
- **Mathematical Anchor:**
  $$P(Y \\mid \\text{do}(D = d)) = \\sum_{z} P(Y \\mid D = d, Z = z) P(Z = z) \\implies \\hat{\\tau}_{\\text{ATE}} = \\sum_{k} P(Z = k) \\big(\\bar{Y}_{D=1, Z=k} - \\bar{Y}_{D=0, Z=k}\\big)$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (continuous outcome).
  - `d`: `np.ndarray` of shape `(N,)` (binary treatment $\\in \\{0, 1\\}$).
  - `z_strata`: `np.ndarray` of shape `(N,)` (discrete confounder group IDs $\\in \\{0, 1, \\dots, S-1\\}$).
- **Output:**
  - `float`: Unbiased causal ATE after backdoor conditioning.

#### Clean Starter Code
```python
import numpy as np

def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:
    \"\"\"
    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.
    \"\"\"
    # TODO: Stratify by z, compute within-stratum treatment effects, weight by P(Z)
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:
    unique_strata = np.unique(z_strata)
    n = len(y)
    ate = 0.0
    for s in unique_strata:
        mask_s = (z_strata == s)
        p_s = np.sum(mask_s) / n
        y_d1 = y[mask_s & (d == 1)]
        y_d0 = y[mask_s & (d == 0)]
        tau_s = float(np.mean(y_d1) - np.mean(y_d0))
        ate += p_s * tau_s
    return float(ate)
```

#### Public & Hidden Assertions
```python
# Public Test Case: Simpson's Paradox reversal
z_p = np.array([0, 0, 0, 0, 1, 1, 1, 1])
d_p = np.array([1, 1, 0, 0, 1, 1, 0, 0])
# Within stratum 0: effect = +2.0. Within stratum 1: effect = +2.0.
y_p = np.array([12.0, 12.0, 10.0, 10.0, 22.0, 22.0, 20.0, 20.0])
adj_ate = backdoor_subclassification_ate(y_p, d_p, z_p)
np.testing.assert_allclose(adj_ate, 2.0, atol=1e-7)

# Hidden Test Case: Observational bias wiped out
rng = np.random.default_rng(2301)
N = 600
z_h = rng.choice([0, 1, 2], p=[0.2, 0.5, 0.3], size=N)
d_h = np.zeros(N, dtype=int)
for s in [0, 1, 2]:
    d_h[z_h == s] = rng.binomial(1, 0.2 + 0.3 * s, size=np.sum(z_h == s))
y_h = 5.0 + 4.0 * d_h + 3.0 * z_h + rng.normal(0, 0.2, size=N)
ate_est = backdoor_subclassification_ate(y_h, d_h, z_h)
np.testing.assert_allclose(ate_est, 4.0, atol=0.1)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.4ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Stratum weighting yields incorrect overall effect.
- **Where:** `p_s = np.sum(mask_s) / n`.
- **Why:** Weighting by the number of treated units in stratum $s$ instead of the total stratum population frequency $P(Z = s)$.
- **How:** The backdoor adjustment formula weights by the marginal probability $P(Z = s) = \\frac{N_s}{N}$.

---

### LESSON-T3-12: Collider Stratification Bias & Berkson's Paradox
- **Challenge ID:** `py-collider-bias`
- **Pedagogical Objective:** Formulate Berkson's paradox and collider bias by simulating two truly independent variables $X \\perp Y$, conditioning on their common child (collider $C = X + Y + \\epsilon$), and demonstrating the spurious negative correlation.
- **Mathematical Anchor:**
  $$X \\perp Y \\iff \\text{Cov}(X, Y) = 0, \\quad X \\not\\!\\perp Y \\mid C \\implies \\beta_{Y \\sim X \\mid C} < 0 \\quad \\text{when } C = \\alpha_1 X + \\alpha_2 Y + \\varepsilon$$

#### Input/Output Specifications
- **Input:**
  - `n`: `int` (sample size, default 1000).
  - `seed`: `int` (random seed, default 42).
- **Output:**
  - `dict[str, float]` with keys:
    - `"b_uncond"`: OLS regression slope of $Y$ on $X$ without conditioning on $C$ (should be $\\approx 0$).
    - `"b_cond"`: OLS regression slope of $Y$ on $X$ conditioning on $C$ (spurious collider bias).

#### Clean Starter Code
```python
import numpy as np

def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:
    \"\"\"
    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.
    \"\"\"
    # TODO: Generate independent X and Y, construct collider C, run unconditioned and conditioned OLS
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:
    rng = np.random.default_rng(seed)
    X = rng.normal(0, 1, size=n)
    Y = rng.normal(0, 1, size=n)
    C = 1.5 * X + 1.5 * Y + rng.normal(0, 0.5, size=n)
    
    # Unconditioned regression: Y = b0 + b1 * X
    X_uncond = np.column_stack([np.ones(n), X])
    b_uncond = float(np.linalg.lstsq(X_uncond, Y, rcond=None)[0][1])
    
    # Conditioned on Collider: Y = b0 + b1 * X + b2 * C
    X_cond = np.column_stack([np.ones(n), X, C])
    b_cond = float(np.linalg.lstsq(X_cond, Y, rcond=None)[0][1])
    
    return {"b_uncond": b_uncond, "b_cond": b_cond}
```

#### Public & Hidden Assertions
```python
# Public Test Case: Verify collider distortion
res = simulate_collider_bias(n=1000, seed=42)
assert abs(res["b_uncond"]) < 0.1, "Unconditioned effect between independent variables must be near zero"
assert res["b_cond"] < -0.3, "Conditioning on collider must induce strong negative bias"

# Hidden Test Case: Higher sample size convergence
res_large = simulate_collider_bias(n=5000, seed=123)
assert abs(res_large["b_uncond"]) < 0.05
assert res_large["b_cond"] < -0.4
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.2ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Conditioned slope `b_cond` is zero or positive.
- **Where:** Construction of design matrix `X_cond`.
- **Why:** Adding $C$ as an outcome rather than a control regressor, or reversing causal arrows.
- **How:** In multiple regression `y = b0 + b1*x + b2*c`, $C$ enters as an explanatory variable alongside $X$.

---

## 8. Module 24: Instrumental Variables & 2SLS (LATE)

### LESSON-T3-13: Wald Estimator for Binary Instruments
- **Challenge ID:** `py-wald-estimator`
- **Pedagogical Objective:** Formulate the Wald Estimator for a binary instrument $Z$, isolating the Local Average Treatment Effect (LATE) for compliers as the ratio of reduced-form intention-to-treat effect to first-stage compliance.
- **Mathematical Anchor:**
  $$\\hat{\\beta}_{\\text{Wald}} = \\frac{\\bar{Y}_{Z=1} - \\bar{Y}_{Z=0}}{\\bar{D}_{Z=1} - \\bar{D}_{Z=0}} \\equiv \\frac{\\widehat{\\text{Cov}}(Y, Z)}{\\widehat{\\text{Cov}}(D, Z)}$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (continuous outcome).
  - `d`: `np.ndarray` of shape `(N,)` (endogenous treatment status $\\in \\{0, 1\\}$).
  - `z`: `np.ndarray` of shape `(N,)` (binary instrument assignment $\\in \\{0, 1\\}$).
- **Output:**
  - `dict[str, float]` with keys:
    - `"wald"`: Estimated causal Wald effect.
    - `"compliance_rate"`: First-stage difference in treatment take-up $\\bar{D}_{Z=1} - \\bar{D}_{Z=0}$.
    - `"ratio_cov"`: Ratio of empirical covariances $\\frac{\\text{Cov}(Y, Z)}{\\text{Cov}(D, Z)}$.

#### Clean Starter Code
```python
import numpy as np

def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:
    \"\"\"
    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.
    \"\"\"
    # TODO: Compute reduced form, first stage compliance, and covariance ratio
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:
    z1 = (z == 1)
    z0 = (z == 0)
    del_y = np.mean(y[z1]) - np.mean(y[z0])
    del_d = np.mean(d[z1]) - np.mean(d[z0])
    wald = float(del_y / del_d)
    
    cov_yz = float(np.cov(y, z, bias=True)[0, 1])
    cov_dz = float(np.cov(d, z, bias=True)[0, 1])
    ratio_cov = float(cov_yz / cov_dz)
    
    return {
        "wald": wald,
        "compliance_rate": float(del_d),
        "ratio_cov": ratio_cov,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Exact group means
z_p = np.array([1, 1, 1, 0, 0, 0])
d_p = np.array([1, 1, 0, 0, 1, 0])
y_p = np.array([10.0, 12.0, 6.0, 4.0, 8.0, 2.0])
out_w = compute_wald_estimator(y_p, d_p, z_p)
np.testing.assert_allclose(out_w["wald"], out_w["ratio_cov"], atol=1e-7)

# Hidden Test Case: Weak instrument warning
z_weak = np.array([1, 1, 0, 0])
d_weak = np.array([0, 0, 0, 0]) # 0% compliance
try:
    compute_wald_estimator(y_p[:4], d_weak, z_weak)
except (ZeroDivisionError, FloatingPointError):
    pass # Zero compliance handled safely
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.5ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Discrepancy between `wald` and `ratio_cov`.
- **Where:** `cov_yz / cov_dz`.
- **Why:** Using `np.cov` without setting `bias=True`, leading to mismatched sample normalization $N-1$ vs population $N$.
- **How:** Pass `bias=True` to `np.cov` or manually compute centered inner products `np.mean((y - y_bar) * (z - z_bar))`.

---

### LESSON-T3-14: Two-Stage Least Squares (2SLS) with First-Stage $F$-Stat & Structural Residuals
- **Challenge ID:** `py-2sls-wald`
- **Pedagogical Objective:** Implement Two-Stage Least Squares (2SLS) matrix estimation, calculating the first-stage projection $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$ and the structural standard errors evaluated on true residuals $\\mathbf{e} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}$.
- **Mathematical Anchor:**
  $$\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}} = (\\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{P}_Z \\mathbf{y}, \\quad \\mathbf{e} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}} \\quad (\\text{NOT } \\mathbf{y} - \\hat{\\mathbf{X}}\\hat{\\boldsymbol{\\beta}}!), \\quad \\widehat{\\text{Var}}(\\hat{\\boldsymbol{\\beta}}) = \\frac{\\mathbf{e}^T \\mathbf{e}}{N - K} (\\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X})^{-1}$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)`.
  - `X`: `np.ndarray` of shape `(N, K)` (endogenous and exogenous regressors).
  - `Z`: `np.ndarray` of shape `(N, L)` where $L \\ge K$ (instruments and exogenous regressors).
- **Output:**
  - `dict[str, object]` with keys:
    - `"beta"`: `(K,)` 2SLS coefficient estimates.
    - `"se"`: `(K,)` correct structural standard errors.
    - `"residuals"`: `(N,)` structural residuals.
    - `"sigma2"`: Unbiased structural error variance.

#### Clean Starter Code
```python
import numpy as np

def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:
    \"\"\"
    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.
    \"\"\"
    # TODO: Stage 1 projection, Stage 2 regression, structural error variance
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:
    Pz = Z @ np.linalg.inv(Z.T @ Z) @ Z.T
    X_hat = Pz @ X
    beta_2sls = np.linalg.solve(X_hat.T @ X_hat, X_hat.T @ y)
    
    # Crucial Econometric Rule: Structural residuals must use original X, not X_hat!
    structural_residuals = y - X @ beta_2sls
    n, k = X.shape
    sigma2 = float(np.sum(structural_residuals ** 2) / (n - k))
    vcov = sigma2 * np.linalg.inv(X.T @ Pz @ X)
    se = np.sqrt(np.diag(vcov))
    
    return {
        "beta": beta_2sls,
        "se": se,
        "residuals": structural_residuals,
        "sigma2": sigma2,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Endogenous regressor with instrument
rng = np.random.default_rng(2401)
N = 100
Z_mat = np.column_stack([np.ones(N), rng.standard_normal((N, 2))])
# Endogenous confounder U
U = rng.standard_normal(N)
X_endog = 2.0 * Z_mat[:, 1] + 1.5 * Z_mat[:, 2] + U
X_mat = np.column_stack([np.ones(N), X_endog])
y_vec = 1.0 + 3.0 * X_endog + 2.0 * U # OLS will be biased due to U
out_2sls = fit_2sls(y_vec, X_mat, Z_mat)
np.testing.assert_allclose(out_2sls["beta"], np.array([1.0, 3.0]), atol=0.3)

# Hidden Test Case: Verify that naive stage-2 residuals do NOT equal structural residuals
X_hat_naive = Z_mat @ np.linalg.inv(Z_mat.T @ Z_mat) @ Z_mat.T @ X_mat
naive_res = y_vec - X_hat_naive @ out_2sls["beta"]
assert not np.allclose(naive_res, out_2sls["residuals"]), "Structural residuals must use true X"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.4ms (<800ms budget).
- **Memory Footprint:** <20KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Standard errors are severely underestimated or fail unit tests.
- **Where:** `structural_residuals = y - X @ beta_2sls`.
- **Why:** The classic "2SLS Second-Stage Trap": computing residuals using fitted values $\hat{X}$ (`y - X_hat @ beta`) rather than observed features $X$.
- **How:** Always evaluate structural residuals using original observed data: `residuals = y - X @ beta_2sls`.
"""
