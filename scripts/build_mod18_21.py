# scripts/build_mod18_21.py
"""
Builds Markdown specifications for Modules 18 through 21 (Lessons T3-01 to T3-08).
"""

def get_mod18_21():
    return """
---

## 2. Module 18: Ordinary Least Squares & Residual Geometry

### LESSON-T3-01: Bivariate & Multivariate OLS via Normal Equations
- **Challenge ID:** `py-ols-normal`
- **Pedagogical Objective:** Formulate the Ordinary Least Squares estimator as an orthogonal projection onto the column space of $\\mathbf{X}$, proving numerically that the residual vector $\\mathbf{e} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$ is orthogonal to every regressor.
- **Mathematical Anchor:**
  $$\\mathbf{X}^T \\mathbf{e} = \\mathbf{0} \\implies \\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}, \\quad \\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, K)` where $N > K$ (design matrix containing a column of ones if intercept is included).
  - `y`: `np.ndarray` of shape `(N,)` (continuous target vector).
- **Output:**
  - `dict[str, np.ndarray]` with keys:
    - `"beta"`: `(K,)` estimated coefficient vector.
    - `"y_hat"`: `(N,)` fitted values vector.
    - `"residuals"`: `(N,)` error residuals vector $\\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}}$.

#### Clean Starter Code
```python
import numpy as np

def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:
    \"\"\"
    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, K)
        Design matrix of regressors (must have full column rank).
    y : np.ndarray of shape (N,)
        Response vector.
        
    Returns
    -------
    dict with keys 'beta', 'y_hat', 'residuals'
    \"\"\"
    # TODO: Solve (X^T X) beta = X^T y without explicit matrix inversion
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:
    XtX = X.T @ X
    Xty = X.T @ y
    beta = np.linalg.solve(XtX, Xty)
    y_hat = X @ beta
    residuals = y - y_hat
    return {
        "beta": beta,
        "y_hat": y_hat,
        "residuals": residuals,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Perfect collinear bivariate line
X_pub = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
y_pub = np.array([3.0, 5.0, 7.0, 9.0])
out_pub = fit_ols(X_pub, y_pub)
np.testing.assert_allclose(out_pub["beta"], np.array([1.0, 2.0]), rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(out_pub["y_hat"], y_pub, rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(out_pub["residuals"], np.zeros(4), atol=1e-7)

# Hidden Test Case: Orthogonality check on high-dimensional noisy data
rng = np.random.default_rng(1801)
N, K = 100, 5
X_hid = np.column_stack([np.ones(N), rng.standard_normal((N, K - 1))])
y_hid = X_hid @ np.array([2.5, -1.2, 0.8, 3.4, -0.5]) + rng.standard_normal(N) * 0.5
out_hid = fit_ols(X_hid, y_hid)
# Residual orthogonality assertion: X^T e == 0
np.testing.assert_allclose(X_hid.T @ out_hid["residuals"], np.zeros(K), atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.2ms (well under <800ms budget).
- **Memory Footprint:** 100 observations $\\times 5$ floats = < 10KB heap (well under <350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Residuals are not orthogonal to regressor columns (`X.T @ residuals != 0`).
- **Where:** Line calculating `residuals` or solving for `beta`.
- **Why:** Using an unstable manual matrix inverse `np.linalg.inv(X.T @ X)` on ill-conditioned data or transposing vectors incorrectly.
- **How:** Use `np.linalg.solve(X.T @ X, X.T @ y)` to obtain numerically stable coefficients, then compute `residuals = y - X @ beta`.

---

### LESSON-T3-02: Goodness of Fit, $R^2$, and ANOVA Decomposition
- **Challenge ID:** `py-ols-r2-anova`
- **Pedagogical Objective:** Implement the ANOVA decomposition of variance $TSS = ESS + SSR$, compute the coefficient of determination $R^2$, and penalize parameter bloat via adjusted $\\bar{R}^2$.
- **Mathematical Anchor:**
  $$\\text{TSS} = \\sum_{i=1}^N (y_i - \\bar{y})^2, \\quad \\text{SSR} = \\sum_{i=1}^N (y_i - \\hat{y}_i)^2, \\quad R^2 = 1 - \\frac{\\text{SSR}}{\\text{TSS}}, \\quad \\bar{R}^2 = 1 - \\frac{\\text{SSR}/(N - p - 1)}{\\text{TSS}/(N - 1)}$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (observed response vector).
  - `y_hat`: `np.ndarray` of shape `(N,)` (model predicted response vector).
  - `p`: `int` (number of explanatory variables excluding intercept).
- **Output:**
  - `dict[str, float]` with keys:
    - `"tss"`: Total Sum of Squares.
    - `"ess"`: Explained Sum of Squares.
    - `"ssr"`: Sum of Squared Residuals.
    - `"r2"`: Coefficient of determination.
    - `"adj_r2"`: Adjusted $R^2$.

#### Clean Starter Code
```python
import numpy as np

def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:
    \"\"\"
    Computes ANOVA variance components, R^2, and adjusted R^2.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        True target values.
    y_hat : np.ndarray of shape (N,)
        Model predictions.
    p : int
        Number of slopes (regressors excluding intercept).
    \"\"\"
    # TODO: Compute TSS, ESS, SSR, R^2, and adjusted R^2
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:
    n = len(y)
    y_bar = np.mean(y)
    tss = float(np.sum((y - y_bar) ** 2))
    ess = float(np.sum((y_hat - y_bar) ** 2))
    ssr = float(np.sum((y - y_hat) ** 2))
    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0
    df_res = n - p - 1
    df_tot = n - 1
    adj_r2 = 1.0 - ((ssr / df_res) / (tss / df_tot)) if (df_res > 0 and tss > 0) else 0.0
    return {
        "tss": tss,
        "ess": ess,
        "ssr": ssr,
        "r2": r2,
        "adj_r2": adj_r2,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Perfect predictions
y_p = np.array([2.0, 4.0, 6.0, 8.0])
y_hat_p = np.array([2.0, 4.0, 6.0, 8.0])
out_p = compute_r2_anova(y_p, y_hat_p, p=1)
np.testing.assert_allclose(out_p["r2"], 1.0, atol=1e-7)
np.testing.assert_allclose(out_p["adj_r2"], 1.0, atol=1e-7)
np.testing.assert_allclose(out_p["ssr"], 0.0, atol=1e-7)

# Hidden Test Case: Pythagorean sum verification
rng = np.random.default_rng(1802)
y_h = rng.normal(10.0, 2.0, size=50)
noise = rng.normal(0.0, 0.5, size=50)
y_hat_h = y_h + noise
out_h = compute_r2_anova(y_h, y_hat_h, p=3)
np.testing.assert_allclose(out_h["r2"], 1.0 - out_h["ssr"] / out_h["tss"], rtol=1e-5, atol=1e-7)
assert out_h["adj_r2"] < out_h["r2"], "Adjusted R^2 must strictly penalize degree-of-freedom loss"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.6ms (<800ms budget).
- **Memory Footprint:** <5KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Adjusted $R^2$ exceeds unadjusted $R^2$, or returns a value greater than 1.0.
- **Where:** Calculation of degrees of freedom `df_res = n - p - 1`.
- **Why:** Confusing the total number of columns $K$ (which includes intercept) with the count of explanatory variables $p$.
- **How:** Set residual degrees of freedom strictly to $N - p - 1$, where $p$ is the number of regressors beyond the constant.

---

## 3. Module 19: Gauss-Markov & Robust Heteroskedasticity

### LESSON-T3-03: Homoskedastic OLS Variance-Covariance Matrix & T-Stats
- **Challenge ID:** `py-ols-vcov`
- **Pedagogical Objective:** Implement the classical OLS parameter dispersion estimator under Gauss-Markov assumptions, verifying the unbiased variance $\\hat{\\sigma}^2 = \\frac{\\mathbf{e}^T \\mathbf{e}}{N - K}$, standard errors, and two-sided t-statistics.
- **Mathematical Anchor:**
  $$\\widehat{\\text{Var}}(\\hat{\\boldsymbol{\\beta}}) = s^2 (\\mathbf{X}^T \\mathbf{X})^{-1}, \\quad s^2 = \\frac{\\mathbf{e}^T \\mathbf{e}}{N - K}, \\quad \\text{SE}(\\hat{\\beta}_j) = \\sqrt{\\widehat{\\text{Var}}(\\hat{\\boldsymbol{\\beta}})_{jj}}, \\quad t_j = \\frac{\\hat{\\beta}_j}{\\text{SE}(\\hat{\\beta}_j)}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, K)`.
  - `y`: `np.ndarray` of shape `(N,)`.
- **Output:**
  - `dict[str, np.ndarray | float]` with keys:
    - `"beta"`: `(K,)` parameter vector.
    - `"s2"`: Unbiased residual variance scalar $s^2$.
    - `"vcov"`: `(K, K)` variance-covariance matrix.
    - `"se"`: `(K,)` parameter standard errors.
    - `"t_stats"`: `(K,)` empirical t-ratios.

#### Clean Starter Code
```python
import numpy as np

def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:
    \"\"\"
    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.
    \"\"\"
    # TODO: Calculate beta, residuals, s^2, vcov, SEs, and t_stats
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:
    n, k = X.shape
    beta = np.linalg.solve(X.T @ X, X.T @ y)
    e = y - X @ beta
    s2 = float(np.sum(e ** 2) / (n - k))
    vcov = s2 * np.linalg.inv(X.T @ X)
    se = np.sqrt(np.diag(vcov))
    t_stats = beta / se
    return {
        "beta": beta,
        "s2": s2,
        "vcov": vcov,
        "se": se,
        "t_stats": t_stats,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: 5 observations, 2 features
X_pub = np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
y_pub = np.array([1.1, 2.9, 5.2, 6.8, 9.1])
out_pub = compute_ols_vcov(X_pub, y_pub)
np.testing.assert_allclose(out_pub["vcov"], out_pub["vcov"].T, atol=1e-7)
assert np.all(out_pub["se"] > 0)
np.testing.assert_allclose(out_pub["t_stats"], out_pub["beta"] / out_pub["se"], atol=1e-7)

# Hidden Test Case: Precision check against orthogonal regressors
X_orth = np.array([[1.0, 1.0], [1.0, -1.0], [1.0, 1.0], [1.0, -1.0]])
y_orth = np.array([2.0, 0.0, 2.0, 0.0]) # Perfect fit: beta = [1.0, 1.0], residuals = 0
out_orth = compute_ols_vcov(X_orth, y_orth)
np.testing.assert_allclose(out_orth["s2"], 0.0, atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.8ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Standard errors are negative or `NaN`.
- **Where:** `se = np.sqrt(np.diag(vcov))`.
- **Why:** Dividing by $N$ instead of degree-of-freedom corrected $N - K$, or non-positive-definite $(X^T X)^{-1}$.
- **How:** Ensure residual sum of squares is divided by `(n - k)` where `k = X.shape[1]`, then take the square root of `np.diag(vcov)`.

---

### LESSON-T3-04: White / Huber-White Heteroskedasticity-Consistent (HC0, HC1) Robust SE
- **Challenge ID:** `py-robust-se`
- **Pedagogical Objective:** Construct the Huber-White "sandwich" covariance estimator $\\mathbf{V} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\hat{\\boldsymbol{\\Omega}} \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}$, protecting inference against unknown heteroskedasticity.
- **Mathematical Anchor:**
  $$\\mathbf{V}_{\\text{HC0}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\left( \\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T \\right) (\\mathbf{X}^T \\mathbf{X})^{-1} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\text{diag}(\\mathbf{e}^2) \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}, \\quad \\mathbf{V}_{\\text{HC1}} = \\frac{N}{N - K} \\mathbf{V}_{\\text{HC0}}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, K)`.
  - `y`: `np.ndarray` of shape `(N,)`.
  - `hc_type`: `str` (either `"HC0"` or `"HC1"`, default `"HC1"`).
- **Output:**
  - `dict[str, np.ndarray]` with keys:
    - `"beta"`: `(K,)` OLS point estimates.
    - `"vcov"`: `(K, K)` robust variance-covariance matrix.
    - `"se"`: `(K,)` heteroskedasticity-robust standard errors.

#### Clean Starter Code
```python
import numpy as np

def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = "HC1") -> dict[str, np.ndarray]:
    \"\"\"
    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.
    \"\"\"
    # TODO: Implement the sandwich estimator
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = "HC1") -> dict[str, np.ndarray]:
    n, k = X.shape
    beta = np.linalg.solve(X.T @ X, X.T @ y)
    e = y - X @ beta
    XX_inv = np.linalg.inv(X.T @ X)
    # Vectorized bread and meat: X^T @ diag(e^2) @ X == (X * e[:, None]).T @ (X * e[:, None])
    meat = (X * e[:, None]).T @ (X * e[:, None])
    vcov_hc0 = XX_inv @ meat @ XX_inv
    if hc_type == "HC0":
        vcov = vcov_hc0
    elif hc_type == "HC1":
        vcov = (n / (n - k)) * vcov_hc0
    else:
        raise ValueError(f"Unsupported hc_type: {hc_type}")
    se = np.sqrt(np.diag(vcov))
    return {"beta": beta, "vcov": vcov, "se": se}
```

#### Public & Hidden Assertions
```python
# Public Test Case: Heteroskedastic variance inflation
X_pub = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0], [1.0, 5.0]])
y_pub = np.array([2.0, 3.8, 6.5, 9.1, 15.0])
out_hc0 = compute_robust_se(X_pub, y_pub, "HC0")
out_hc1 = compute_robust_se(X_pub, y_pub, "HC1")
np.testing.assert_allclose(out_hc1["vcov"], (5.0 / (5.0 - 2.0)) * out_hc0["vcov"], atol=1e-7)

# Hidden Test Case: Symmetry and positive definiteness
np.testing.assert_allclose(out_hc1["vcov"], out_hc1["vcov"].T, atol=1e-7)
eigenvalues = np.linalg.eigvalsh(out_hc1["vcov"])
assert np.all(eigenvalues > 0), "Robust covariance matrix must be strictly positive definite"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.1ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Memory allocation error or slow loop when building the meat matrix.
- **Where:** `meat = X.T @ np.diag(e ** 2) @ X`.
- **Why:** Creating an explicit $N \\times N$ diagonal matrix via `np.diag(e**2)` consumes $O(N^2)$ memory and scales quadratically.
- **How:** Use memory-efficient vector broadcasting: `X_scaled = X * e[:, None]; meat = X_scaled.T @ X_scaled`.

---

## 4. Module 20: Multiple Regression & FWL Partialling Out

### LESSON-T3-05: Annihilator / Residual-Maker Matrix ($M_X$) & Orthogonal Projection
- **Challenge ID:** `py-annihilator-matrix`
- **Pedagogical Objective:** Implement the orthogonal projection operator $\\mathbf{P}_X$ and the residual-maker matrix $\\mathbf{M}_X = \\mathbf{I} - \\mathbf{P}_X$, proving algebraic idempotence, symmetry, and kernel annihilation.
- **Mathematical Anchor:**
  $$\\mathbf{P}_X = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T, \\quad \\mathbf{M}_X = \\mathbf{I}_N - \\mathbf{P}_X, \\quad \\mathbf{P}_X^2 = \\mathbf{P}_X, \\quad \\mathbf{M}_X^2 = \\mathbf{M}_X, \\quad \\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, K)`.
- **Output:**
  - `tuple[np.ndarray, np.ndarray]`: `(P, M)` where both are `(N, N)` matrices.

#### Clean Starter Code
```python
import numpy as np

def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    \"\"\"
    Computes the hat matrix P_X and residual annihilator matrix M_X.
    \"\"\"
    # TODO: Calculate P and M
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    n = X.shape[0]
    P = X @ np.linalg.inv(X.T @ X) @ X.T
    M = np.eye(n) - P
    return P, M
```

#### Public & Hidden Assertions
```python
# Public Test Case: 4x2 matrix
X_p = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
P_p, M_p = compute_projection_and_annihilator(X_p)
np.testing.assert_allclose(P_p @ P_p, P_p, atol=1e-7) # P is idempotent
np.testing.assert_allclose(M_p @ M_p, M_p, atol=1e-7) # M is idempotent

# Hidden Test Case: Annihilation of column space
np.testing.assert_allclose(M_p @ X_p, np.zeros_like(X_p), atol=1e-7)
np.testing.assert_allclose(P_p + M_p, np.eye(4), atol=1e-7)
np.testing.assert_allclose(P_p @ M_p, np.zeros((4, 4)), atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.4ms (<800ms budget).
- **Memory Footprint:** <25KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Matrix multiplication `M @ X` does not evaluate to zero.
- **Where:** Computation of `P = X @ np.linalg.inv(X.T @ X) @ X.T`.
- **Why:** Inverting before multiplying by $X$ or transposing $X$ incorrectly in the outer product.
- **How:** Follow the exact hat matrix formulation: `X @ np.linalg.inv(X.T @ X) @ X.T`.

---

### LESSON-T3-06: Frisch-Waugh-Lovell (FWL) Theorem & Partial Regression
- **Challenge ID:** `py-fwl-partial`
- **Pedagogical Objective:** Numerically demonstrate the Frisch-Waugh-Lovell theorem by isolating the partial effect of regressor block $\\mathbf{X}_1$ through two-step residual projection against covariate block $\\mathbf{X}_2$.
- **Mathematical Anchor:**
  $$\\tilde{\\mathbf{y}} = \\mathbf{M}_{X_2} \\mathbf{y}, \\quad \\tilde{\\mathbf{X}}_1 = \\mathbf{M}_{X_2} \\mathbf{X}_1, \\quad \\hat{\\boldsymbol{\\beta}}_1^{\\text{FWL}} = (\\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{X}}_1)^{-1} \\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{y}} \\equiv \\hat{\\boldsymbol{\\beta}}_1^{\\text{Full}}$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)`.
  - `X1`: `np.ndarray` of shape `(N, K1)`.
  - `X2`: `np.ndarray` of shape `(N, K2)`.
- **Output:**
  - `tuple[np.ndarray, np.ndarray]`: `(beta_1_fwl, beta_1_full)` both of shape `(K1,)`.

#### Clean Starter Code
```python
import numpy as np

def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    \"\"\"
    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.
    \"\"\"
    # TODO: Partial out X2 from y and X1, then compare with full regression
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    # Annihilator for X2
    P2 = X2 @ np.linalg.inv(X2.T @ X2) @ X2.T
    M2 = np.eye(len(y)) - P2
    y_tilde = M2 @ y
    X1_tilde = M2 @ X1
    beta_1_fwl = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)
    
    # Full regression of y on [X1, X2]
    X_full = np.column_stack([X1, X2])
    beta_full = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)
    beta_1_full = beta_full[:X1.shape[1]]
    return beta_1_fwl, beta_1_full
```

#### Public & Hidden Assertions
```python
# Public Test Case: Synthetic confounding covariates
rng = np.random.default_rng(2001)
N = 60
X1_p = rng.standard_normal((N, 2))
X2_p = rng.standard_normal((N, 3))
y_p = X1_p @ np.array([1.5, -2.0]) + X2_p @ np.array([0.5, -1.0, 3.0]) + rng.standard_normal(N) * 0.1
b_fwl, b_full = fwl_partial_regression(y_p, X1_p, X2_p)
np.testing.assert_allclose(b_fwl, b_full, rtol=1e-5, atol=1e-7)

# Hidden Test Case: Collinear partialling out
np.testing.assert_allclose(b_fwl, np.array([1.5, -2.0]), atol=0.25)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.3ms (<800ms budget).
- **Memory Footprint:** <20KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Partial slope `beta_1_fwl` does not match the full regression coefficient `beta_1_full`.
- **Where:** `y_tilde = M2 @ y` or `X1_tilde = M2 @ X1`.
- **Why:** Failing to project BOTH the dependent variable $y$ and the primary regressor $X_1$ onto the orthogonal complement of $X_2$.
- **How:** Apply the annihilator matrix $M_{X_2}$ to both $y$ and $X_1$ before running the second-stage regression.

---

## 5. Module 21: Omitted Variable Bias (OVB) Geometry

### LESSON-T3-07: Analytical Omitted Variable Bias (OVB) Formula
- **Challenge ID:** `py-ovb-calc`
- **Pedagogical Objective:** Calculate and prove the algebraic identity of omitted variable bias: the short regression coefficient equals the long regression coefficient plus the product of the omitted variable's structural impact and auxiliary regression projection.
- **Mathematical Anchor:**
  $$\\hat{\\boldsymbol{\\beta}}_1^{\\text{short}} = \\hat{\\boldsymbol{\\beta}}_1^{\\text{long}} + \\hat{\\boldsymbol{\\Pi}} \\hat{\\boldsymbol{\\beta}}_2^{\\text{long}} \\quad \\text{where } \\hat{\\boldsymbol{\\Pi}} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)`.
  - `X1`: `np.ndarray` of shape `(N, K1)` (included regressors).
  - `X2`: `np.ndarray` of shape `(N, K2)` (omitted confounders).
- **Output:**
  - `dict[str, np.ndarray]` with keys:
    - `"beta1_long"`: True multi-variable coefficients.
    - `"beta1_short"`: Biased short regression coefficients.
    - `"bias"`: Analytical bias vector $\\hat{\\boldsymbol{\\Pi}} \\hat{\\boldsymbol{\\beta}}_2$.
    - `"Pi"`: Auxiliary regression slope matrix.

#### Clean Starter Code
```python
import numpy as np

def compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:
    \"\"\"
    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.
    \"\"\"
    # TODO: Implement OVB decomposition
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:
    X_full = np.column_stack([X1, X2])
    b_long = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)
    k1 = X1.shape[1]
    b1_long = b_long[:k1]
    b2_long = b_long[k1:]
    
    b1_short = np.linalg.solve(X1.T @ X1, X1.T @ y)
    Pi = np.linalg.solve(X1.T @ X1, X1.T @ X2)
    bias = Pi @ b2_long
    return {
        "beta1_long": b1_long,
        "beta1_short": b1_short,
        "bias": bias,
        "Pi": Pi,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Synthetic confounder causing positive bias
rng = np.random.default_rng(2101)
N = 80
X1_d = rng.standard_normal((N, 2))
X2_d = 0.8 * X1_d[:, :1] + rng.standard_normal((N, 1)) * 0.2
y_d = X1_d @ np.array([2.0, -1.0]) + X2_d @ np.array([3.0]) + rng.standard_normal(N) * 0.1
res = compute_ovb(y_d, X1_d, X2_d)
np.testing.assert_allclose(res["beta1_short"], res["beta1_long"] + res["bias"], atol=1e-7)

# Hidden Test Case: Orthogonal omitted variable (bias = 0)
X1_orth = np.array([[1.0], [-1.0], [1.0], [-1.0]])
X2_orth = np.array([[1.0], [1.0], [-1.0], [-1.0]]) # X1' X2 == 0
y_orth = 2.0 * X1_orth[:, 0] + 5.0 * X2_orth[:, 0]
res_orth = compute_ovb(y_orth, X1_orth, X2_orth)
np.testing.assert_allclose(res_orth["bias"], np.zeros(1), atol=1e-7)
np.testing.assert_allclose(res_orth["beta1_short"], res_orth["beta1_long"], atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.9ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Short regression does not equal long regression plus bias.
- **Where:** `Pi = np.linalg.solve(X1.T @ X1, X1.T @ X2)`.
- **Why:** Reversing the auxiliary regression (e.g. regressing $X_1$ on $X_2$ instead of $X_2$ on $X_1$).
- **How:** The auxiliary regression must project the *omitted* variables $X_2$ onto the *included* variables $X_1$: `np.linalg.solve(X1.T @ X1, X1.T @ X2)`.

---

### LESSON-T3-08: Multicollinearity & Variance Inflation Factor (VIF)
- **Challenge ID:** `py-vif-calc`
- **Pedagogical Objective:** Detect destructive variance inflation in near-collinear feature spaces by computing the auxiliary $R_j^2$ and Variance Inflation Factor $\\text{VIF}_j = \\frac{1}{1 - R_j^2}$ for all regressor columns.
- **Mathematical Anchor:**
  $$\\mathbf{x}_j = \\gamma_0 + \\mathbf{X}_{-j} \\boldsymbol{\\gamma} + \\mathbf{v}_j \\implies R_j^2 = 1 - \\frac{\\text{SSR}_j}{\\text{TSS}_j}, \\quad \\text{VIF}_j = \\frac{1}{1 - R_j^2}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, K)` (regressor matrix without intercept).
- **Output:**
  - `np.ndarray` of shape `(K,)` containing VIF score for each feature.

#### Clean Starter Code
```python
import numpy as np

def compute_vif(X: np.ndarray) -> np.ndarray:
    \"\"\"
    Computes the Variance Inflation Factor (VIF) for each column in X.
    \"\"\"
    # TODO: Run auxiliary regressions and calculate 1 / (1 - R_j^2)
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_vif(X: np.ndarray) -> np.ndarray:
    n, k = X.shape
    vifs = np.zeros(k)
    ones = np.ones((n, 1))
    for j in range(k):
        y_j = X[:, j]
        X_other = np.delete(X, j, axis=1)
        X_reg = np.column_stack([ones, X_other])
        beta_j = np.linalg.lstsq(X_reg, y_j, rcond=None)[0]
        y_pred = X_reg @ beta_j
        tss = np.sum((y_j - np.mean(y_j)) ** 2)
        ssr = np.sum((y_j - y_pred) ** 2)
        r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0
        vifs[j] = 1.0 / (1.0 - r2) if (1.0 - r2) > 1e-12 else 1e12
    return vifs
```

#### Public & Hidden Assertions
```python
# Public Test Case: Strong collinearity (feature 1 is ~2x feature 0)
X_test = np.array([[1.0, 2.001], [2.0, 4.002], [3.0, 5.998], [4.0, 8.001]])
vifs = compute_vif(X_test)
assert vifs[0] > 10.0 and vifs[1] > 10.0, "VIF must exceed rule-of-thumb threshold 10 under near-collinearity"

# Hidden Test Case: Completely orthogonal design (VIF == 1.0)
X_orth = np.array([[1.0, 0.0], [-1.0, 0.0], [0.0, 1.0], [0.0, -1.0]])
vifs_orth = compute_vif(X_orth)
np.testing.assert_allclose(vifs_orth, np.array([1.0, 1.0]), atol=1e-5)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.8ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Division by zero warning or infinite VIF on non-singular matrices.
- **Where:** `vifs[j] = 1.0 / (1.0 - r2)`.
- **Why:** Omitting the constant intercept in the auxiliary regression, causing uncentered $R^2$ to exceed 1.0.
- **How:** Always append an intercept column `np.ones((n, 1))` to the auxiliary design matrix `X_other`.
"""
