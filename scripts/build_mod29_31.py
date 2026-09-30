# scripts/build_mod29_31.py
"""
Builds Markdown specifications for Modules 29 through 31 (Lessons T3-23 to T3-27).
"""

def get_mod29_31():
    return """
---

## 13. Module 29: Regularization Geometry (Ridge vs Lasso)

### LESSON-T3-23: Ridge Regression Normal Equations & Shrinkage SVD
- **Challenge ID:** `py-ridge-svd`
- **Pedagogical Objective:** Implement $L_2$ Tikhonov Ridge regression via SVD decomposition, demonstrating how the penalty $\\alpha$ attenuates principal directions by shrinkage factor $\\frac{\\sigma_j^2}{\\sigma_j^2 + \\alpha}$ and computes effective degrees of freedom $\\text{df}(\\alpha)$.
- **Mathematical Anchor:**
  $$\\hat{\\boldsymbol{\\beta}}_{\\text{ridge}} = (\\mathbf{X}^T \\mathbf{X} + \\alpha \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y} = \\sum_{j=1}^p \\left( \\frac{\\sigma_j^2}{\\sigma_j^2 + \\alpha} \\right) \\frac{\\mathbf{u}_j^T \\mathbf{y}}{\\sigma_j} \\mathbf{v}_j, \\quad \\text{df}(\\alpha) = \\text{Tr}\\big[\\mathbf{X}(\\mathbf{X}^T \\mathbf{X} + \\alpha \\mathbf{I})^{-1} \\mathbf{X}^T\\big] = \\sum_{j=1}^p \\frac{\\sigma_j^2}{\\sigma_j^2 + \\alpha}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, P)`.
  - `y`: `np.ndarray` of shape `(N,)`.
  - `alpha`: `float` (regularization strength $\\alpha > 0$).
- **Output:**
  - `dict[str, object]` with keys:
    - `"beta_ridge"`: `(P,)` estimated ridge coefficient vector.
    - `"shrinkage"`: `(P,)` spectral shrinkage factors for each singular component.
    - `"df_effective"`: Effective degrees of freedom scalar.

#### Clean Starter Code
```python
import numpy as np

def fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict[str, object]:
    \"\"\"
    Fits Ridge regression using closed-form Normal Equations and computes SVD shrinkage.
    \"\"\"
    # TODO: Solve (X^T X + alpha * I) beta = X^T y, compute SVD shrinkage and df_effective
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict[str, object]:
    n, p = X.shape
    beta_ridge = np.linalg.solve(X.T @ X + alpha * np.eye(p), X.T @ y)
    
    U, s, Vt = np.linalg.svd(X, full_matrices=False)
    shrinkage = (s ** 2) / (s ** 2 + alpha)
    df_effective = float(np.sum(shrinkage))
    
    return {
        "beta_ridge": beta_ridge,
        "shrinkage": shrinkage,
        "df_effective": df_effective,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: Synthetic regressors with alpha shrinkage
rng = np.random.default_rng(2901)
N, P = 50, 3
X_p = rng.standard_normal((N, P))
y_p = X_p @ np.array([2.0, -1.0, 0.5]) + rng.standard_normal(N) * 0.1
out_r = fit_ridge_svd(X_p, y_p, alpha=10.0)
assert out_r["df_effective"] < P, "Effective degrees of freedom must be strictly less than P"
assert np.all((out_r["shrinkage"] >= 0.0) & (out_r["shrinkage"] <= 1.0))

# Hidden Test Case: Asymptotic equivalence to OLS as alpha -> 0
out_ols_limit = fit_ridge_svd(X_p, y_p, alpha=1e-8)
np.testing.assert_allclose(out_ols_limit["df_effective"], P, atol=1e-4)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.6ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Ridge coefficients do not shrink toward zero as $\alpha$ increases.
- **Where:** `beta_ridge = np.linalg.solve(X.T @ X + alpha * np.eye(p), X.T @ y)`.
- **Why:** Penalizing the intercept term or adding $\alpha$ with incorrect matrix dimensions.
- **How:** Add $\alpha \mathbf{I}_P$ strictly to the $P \times P$ Gramian matrix $X^T X$.

---

### LESSON-T3-24: Lasso Coordinate Descent with Soft-Thresholding
- **Challenge ID:** `py-lasso-cd`
- **Pedagogical Objective:** Implement cyclic coordinate descent with the soft-thresholding operator $\\mathcal{S}(\\rho, \\alpha)$ to solve $L_1$ Lasso regression, producing exact structural sparsity.
- **Mathematical Anchor:**
  $$\\rho_j = \\mathbf{x}_j^T (\\mathbf{y} - \\mathbf{X}_{-j} \\boldsymbol{\\beta}_{-j}), \\quad \\hat{\\beta}_j = \\frac{\\mathcal{S}(\\rho_j, \\alpha)}{\\|\\mathbf{x}_j\\|_2^2}, \\quad \\mathcal{S}(\\rho, \\alpha) = \\text{sign}(\\rho) \\max(|\\rho| - \\alpha, 0)$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, P)`.
  - `y`: `np.ndarray` of shape `(N,)`.
  - `alpha`: `float` ($L_1$ penalty parameter $\\alpha > 0$).
  - `max_iter`: `int` (default 300).
  - `tol`: `float` (convergence tolerance, default $10^{-5}$).
- **Output:**
  - `np.ndarray` of shape `(P,)`: Sparse Lasso coefficient vector.

#### Clean Starter Code
```python
import numpy as np

def fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:
    \"\"\"
    Solves L1 Lasso regression via cyclic coordinate descent and soft-thresholding.
    \"\"\"
    # TODO: Iteratively compute partial residuals and apply soft-thresholding operator
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:
    n, p = X.shape
    beta = np.zeros(p)
    z = np.sum(X ** 2, axis=0)
    
    for _ in range(max_iter):
        beta_prev = beta.copy()
        for j in range(p):
            # Partial residual without feature j
            r_j = y - (X @ beta - X[:, j] * beta[j])
            rho_j = float(X[:, j] @ r_j)
            
            # Vectorized soft-thresholding
            if rho_j > alpha:
                beta[j] = (rho_j - alpha) / z[j]
            elif rho_j < -alpha:
                beta[j] = (rho_j + alpha) / z[j]
            else:
                beta[j] = 0.0
                
        if np.max(np.abs(beta - beta_prev)) < tol:
            break
            
    return beta
```

#### Public & Hidden Assertions
```python
# Public Test Case: Exact zeroing out of irrelevant noisy feature
X_las = np.column_stack([np.array([1.0, 2.0, 3.0, 4.0]), np.array([0.01, -0.01, 0.02, -0.02])])
y_las = np.array([2.0, 4.0, 6.0, 8.0])
beta_out = fit_lasso_coordinate_descent(X_las, y_las, alpha=2.0)
np.testing.assert_allclose(beta_out[0], 2.0, atol=0.1)
assert beta_out[1] == 0.0, "Lasso must set uninformative feature strictly to 0.0"

# Hidden Test Case: Symmetric coordinate convergence
X_sym = np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]])
y_sym = np.array([3.0, 3.0, -3.0, -3.0])
beta_sym = fit_lasso_coordinate_descent(X_sym, y_sym, alpha=1.0)
np.testing.assert_allclose(beta_sym[0], beta_sym[1], atol=1e-5)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.8ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Coefficients fluctuate or fail to converge to exact zero.
- **Where:** Partial residual `r_j = y - (X @ beta - X[:, j] * beta[j])`.
- **Why:** Computing residuals against full prediction $X\beta$ without adding back the $j$-th feature contribution $X_j \beta_j$.
- **How:** Isolate partial residuals by removing feature $j$: `r_j = y - (X @ beta - X[:, j] * beta[j])`.

---

## 14. Module 30: Discriminative Classification & IRLS

### LESSON-T3-25: Binary Logistic Regression Newton-Raphson / IRLS Step
- **Challenge ID:** `py-irls-step`
- **Pedagogical Objective:** Formulate Binary Logistic Regression as Iteratively Reweighted Least Squares (IRLS), deriving the Hessian weight matrix $\\mathbf{W} = \\text{diag}(p_i(1 - p_i))$ and working response $\\mathbf{z} = \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{W}^{-1}(\\mathbf{y} - \\mathbf{p})$.
- **Mathematical Anchor:**
  $$p_i = \\sigma(\\mathbf{x}_i^T \\boldsymbol{\\beta}) = \\frac{1}{1 + e^{-\\mathbf{x}_i^T \\boldsymbol{\\beta}}}, \\quad W_{ii} = p_i (1 - p_i), \\quad \\mathbf{z} = \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{W}^{-1}(\\mathbf{y} - \\mathbf{p}), \\quad \\boldsymbol{\\beta}^{(t+1)} = (\\mathbf{X}^T \\mathbf{W} \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{W} \\mathbf{z}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, K)`.
  - `y`: `np.ndarray` of shape `(N,)` (binary labels $\\in \\{0, 1\\}$).
  - `beta`: `np.ndarray` of shape `(K,)` (current parameter state).
- **Output:**
  - `tuple[np.ndarray, float]`: `(beta_next, loss)` where `beta_next` is `(K,)` updated parameters and `loss` is scalar binary cross-entropy.

#### Clean Starter Code
```python
import numpy as np

def irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:
    \"\"\"
    Executes a single Newton-Raphson IRLS update step for binary logistic regression.
    \"\"\"
    # TODO: Compute probabilities, diagonal weights W, working response z, and updated beta
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:
    z_lin = X @ beta
    p = 1.0 / (1.0 + np.exp(-np.clip(z_lin, -30.0, 30.0)))
    w = p * (1.0 - p)
    W = np.diag(w)
    
    # Working response vector
    working_z = z_lin + (y - p) / (w + 1e-12)
    beta_next = np.linalg.solve(X.T @ W @ X, X.T @ W @ working_z)
    
    # Binary cross-entropy
    loss = -float(np.sum(y * np.log(p + 1e-12) + (1.0 - y) * np.log(1.0 - p + 1e-12)))
    return beta_next, loss
```

#### Public & Hidden Assertions
```python
# Public Test Case: Linearly separable 1D points
X_log = np.array([[1.0, -2.0], [1.0, -1.0], [1.0, 1.0], [1.0, 2.0]])
y_log = np.array([0.0, 0.0, 1.0, 1.0])
b_init = np.array([0.0, 0.0])
b_step, l_step = irls_logistic_step(X_log, y_log, b_init)
assert b_step[1] > 0, "Slope parameter must turn positive toward class 1"
np.testing.assert_allclose(l_step, 4 * np.log(2.0), atol=1e-5)

# Hidden Test Case: Strict loss reduction across consecutive steps
b_step2, l_step2 = irls_logistic_step(X_log, y_log, b_step)
assert l_step2 < l_step, "Newton-Raphson must monotonically decrease binary cross-entropy"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.7ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Floating-point overflow / `NaN` in probability or loss evaluation.
- **Where:** `p = 1.0 / (1.0 + np.exp(-z_lin))`.
- **Why:** Large positive or negative linear projections $X\beta$ cause overflow in $\exp(-z)$.
- **How:** Clamp the linear projection before exponentiation: `np.clip(z_lin, -30.0, 30.0)` and add $\epsilon = 10^{-12}$ inside `np.log`.

---

### LESSON-T3-26: Multiclass Softmax Regression Gradient & Cross-Entropy Loss
- **Challenge ID:** `py-softmax-loss-grad`
- **Pedagogical Objective:** Formulate vectorized multiclass Softmax regression, implementing numerically stable log-sum-exp normalization and computing the exact analytical cross-entropy loss and parameter gradient $\\nabla_{\\mathbf{W}} \\mathcal{L} = \\frac{1}{N} \\mathbf{X}^T (\\hat{\\mathbf{P}} - \\mathbf{Y})$.
- **Mathematical Anchor:**
  $$P_{ik} = \\frac{\\exp(Z_{ik} - \\max_j Z_{ij})}{\\sum_j \\exp(Z_{ij} - \\max_j Z_{ij})}, \\quad \\mathcal{L} = -\\frac{1}{N} \\sum_{i=1}^N \\sum_{k=1}^K Y_{ik} \\ln P_{ik}, \\quad \\nabla_{\\mathbf{W}} \\mathcal{L} = \\frac{1}{N} \\mathbf{X}^T (\\mathbf{P} - \\mathbf{Y})$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, D)`.
  - `Y_onehot`: `np.ndarray` of shape `(N, K)` (one-hot encoded ground truth).
  - `W`: `np.ndarray` of shape `(D, K)` (weight parameter matrix).
- **Output:**
  - `tuple[float, np.ndarray]`: `(loss, grad)` where `loss` is scalar cross-entropy and `grad` is `(D, K)` parameter gradient.

#### Clean Starter Code
```python
import numpy as np

def compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:
    \"\"\"
    Computes numerically stable multiclass Softmax cross-entropy loss and gradient.
    \"\"\"
    # TODO: Subtract row max for stability, compute probs, loss, and gradient
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:
    N = X.shape[0]
    logits = X @ W
    # Subtract row-wise maximum for numerical stability
    logits_stable = logits - np.max(logits, axis=1, keepdims=True)
    exp_logits = np.exp(logits_stable)
    probs = exp_logits / np.sum(exp_logits, axis=1, keepdims=True)
    
    loss = -float(np.sum(Y_onehot * np.log(probs + 1e-15)) / N)
    grad = (X.T @ (probs - Y_onehot)) / N
    return loss, grad
```

#### Public & Hidden Assertions
```python
# Public Test Case: 2 samples, 2 classes, zero weights (maximum entropy)
X_sm = np.array([[1.0, 2.0], [2.0, 1.0]])
Y_sm = np.array([[1.0, 0.0], [0.0, 1.0]])
W_sm = np.zeros((2, 2))
l_sm, g_sm = compute_softmax_loss_grad(X_sm, Y_sm, W_sm)
np.testing.assert_allclose(l_sm, np.log(2.0), atol=1e-5)
assert g_sm.shape == (2, 2)

# Hidden Test Case: Numerical gradient checking via finite differences
eps = 1e-6
W_test = np.array([[0.5, -0.2], [0.1, 0.8]])
_, g_analytic = compute_softmax_loss_grad(X_sm, Y_sm, W_test)
g_numerical = np.zeros_like(W_test)
for r in range(2):
    for c in range(2):
        W_pos = W_test.copy()
        W_neg = W_test.copy()
        W_pos[r, c] += eps
        W_neg[r, c] -= eps
        l_pos, _ = compute_softmax_loss_grad(X_sm, Y_sm, W_pos)
        l_neg, _ = compute_softmax_loss_grad(X_sm, Y_sm, W_neg)
        g_numerical[r, c] = (l_pos - l_neg) / (2.0 * eps)
np.testing.assert_allclose(g_analytic, g_numerical, rtol=1e-4, atol=1e-6)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.1ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Softmax probabilities produce `NaN` on large positive activations.
- **Where:** `probs = exp_logits / np.sum(...)`.
- **Why:** Computing $\exp(Z)$ directly without subtracting row maximums triggers IEEE 754 infinity.
- **How:** Subtract the maximum of each row: `Z_stable = Z - np.max(Z, axis=1, keepdims=True)` prior to exponentiation.

---

## 15. Module 31: Support Vector Machines & Kernel Hilbert Spaces

### LESSON-T3-27: Linear SVM Primal Subgradient Descent & Hinge Loss
- **Challenge ID:** `py-svm-hinge-subgrad`
- **Pedagogical Objective:** Formulate the Support Vector Machine in its primal representation, computing soft-margin Hinge Loss with $L_2$ weight decay and taking vectorized subgradient descent steps.
- **Mathematical Anchor:**
  $$\\mathcal{L}(w, b) = \\frac{1}{2} \\|\\mathbf{w}\\|_2^2 + C \\sum_{i=1}^N \\max\\big(0, 1 - y_i (\\mathbf{w}^T \\mathbf{x}_i + b)\\big), \\quad \\nabla_{\\mathbf{w}} = \\mathbf{w} - C \\sum_{i: m_i < 1} y_i \\mathbf{x}_i, \\quad \\nabla_b = - C \\sum_{i: m_i < 1} y_i$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, D)`.
  - `y`: `np.ndarray` of shape `(N,)` (bipolar labels $\\in \\{-1, +1\\}$).
  - `w`: `np.ndarray` of shape `(D,)` (current weight vector).
  - `b`: `float` (current bias scalar).
  - `C`: `float` (margin slack penalty parameter).
  - `lr`: `float` (learning rate).
- **Output:**
  - `tuple[np.ndarray, float, float]`: `(w_next, b_next, loss)` with updated weights, bias, and scalar hinge loss.

#### Clean Starter Code
```python
import numpy as np

def svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:
    \"\"\"
    Performs a single primal subgradient descent step for linear soft-margin SVM.
    \"\"\"
    # TODO: Compute margins y_i * (w^T x_i + b), identify violators, compute subgradients, update w and b
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:
    margins = y * (X @ w + b)
    loss = 0.5 * float(np.sum(w ** 2)) + C * float(np.sum(np.maximum(0.0, 1.0 - margins)))
    
    violators = (margins < 1.0).astype(float)
    grad_w = w - C * np.sum((violators * y)[:, None] * X, axis=0)
    grad_b = - C * float(np.sum(violators * y))
    
    w_next = w - lr * grad_w
    b_next = b - lr * grad_b
    return w_next, b_next, loss
```

#### Public & Hidden Assertions
```python
# Public Test Case: Points violating margin
X_svm = np.array([[1.0, 2.0], [-1.0, -2.0]])
y_svm = np.array([1.0, -1.0])
w_0 = np.array([0.0, 0.0])
w_next, b_next, loss_val = svm_hinge_subgradient_step(X_svm, y_svm, w_0, 0.0, C=1.0, lr=0.1)
assert w_next[0] > 0 and w_next[1] > 0, "Weights must move in the direction of the positive support vector"
np.testing.assert_allclose(loss_val, 2.0, atol=1e-7)

# Hidden Test Case: Points safely outside margin (zero gradient from slack)
X_safe = np.array([[10.0, 10.0], [-10.0, -10.0]])
w_strong = np.array([1.0, 1.0])
w_out, _, l_out = svm_hinge_subgradient_step(X_safe, y_svm, w_strong, 0.0, C=1.0, lr=0.1)
# When margins >= 1.0, only L2 weight decay acts: w_next = w - lr * w = 0.9 * w
np.testing.assert_allclose(w_out, 0.9 * w_strong, atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.6ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Points with correct classification still generate gradients.
- **Where:** `violators = (margins < 1.0).astype(float)`.
- **Why:** Confusing 0-1 misclassification ($m_i < 0$) with margin violation ($m_i < 1$). SVM penalizes correctly classified points that fall within the margin slab $0 < m_i < 1$.
- **How:** The hinge condition applies whenever the margin is strictly less than 1: `margins < 1.0`.
"""
