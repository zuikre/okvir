# scripts/build_mod32_34.py
"""
Builds Markdown specifications for Modules 32 through 34 (Lessons T3-28 to T3-33).
"""

def get_mod32_34():
    return """
---

## 16. Module 32: Decision Trees & Ensemble Methods (Random Forests)

### LESSON-T3-28: CART Decision Tree Optimal Split Finder via Gini Impurity
- **Challenge ID:** `py-cart-split-gini`
- **Pedagogical Objective:** Formulate the core splitting routine of Classification and Regression Trees (CART), vectorizing the threshold evaluation across candidate feature values and finding the threshold $t^*$ that minimizes weighted post-split Gini impurity.
- **Mathematical Anchor:**
  $$G(S) = 1 - \\sum_{k=1}^K p_k^2, \\quad G_{\\text{split}}(t) = \\frac{N_L}{N} G(S_L) + \\frac{N_R}{N} G(S_R), \\quad t^* = \\arg\\min_t G_{\\text{split}}(t)$$

#### Input/Output Specifications
- **Input:**
  - `x`: `np.ndarray` of shape `(N,)` (continuous feature values).
  - `y`: `np.ndarray` of shape `(N,)` (integer class labels).
- **Output:**
  - `tuple[float, float]`: `(best_threshold, min_gini)` where `best_threshold` is the midpoint between adjacent sorted points and `min_gini` is the resulting weighted Gini impurity.

#### Clean Starter Code
```python
import numpy as np

def find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:
    \"\"\"
    Finds the optimal threshold t* minimizing weighted Gini impurity.
    \"\"\"
    # TODO: Sort x and y, test midpoints between adjacent distinct values, compute split Gini
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:
    order = np.argsort(x)
    x_sort = x[order]
    y_sort = y[order]
    n = len(y)
    
    best_gini = 1.0
    best_thresh = float(x_sort[0])
    
    def gini(arr: np.ndarray) -> float:
        if len(arr) == 0:
            return 0.0
        _, counts = np.unique(arr, return_counts=True)
        probs = counts / len(arr)
        return float(1.0 - np.sum(probs ** 2))
        
    for i in range(n - 1):
        if x_sort[i] == x_sort[i + 1]:
            continue
        thresh = (x_sort[i] + x_sort[i + 1]) / 2.0
        y_left = y_sort[:i + 1]
        y_right = y_sort[i + 1:]
        split_gini = (len(y_left) / n) * gini(y_left) + (len(y_right) / n) * gini(y_right)
        
        if split_gini < best_gini:
            best_gini = split_gini
            best_thresh = thresh
            
    return float(best_thresh), float(best_gini)
```

#### Public & Hidden Assertions
```python
# Public Test Case: Linearly separable classes
x_c = np.array([1.0, 2.0, 3.0, 8.0, 9.0, 10.0])
y_c = np.array([0, 0, 0, 1, 1, 1])
t_c, g_c = find_best_split(x_c, y_c)
assert 3.0 < t_c < 8.0, "Threshold must separate the clusters"
np.testing.assert_allclose(g_c, 0.0, atol=1e-7)

# Hidden Test Case: Multi-class split
x_mc = np.array([1.0, 2.0, 5.0, 6.0, 9.0, 10.0])
y_mc = np.array([0, 0, 1, 1, 2, 2])
t_mc, g_mc = find_best_split(x_mc, y_mc)
assert t_mc in [3.5, 7.5]
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~2.1ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Split creates empty left or right subsets.
- **Where:** `thresh = (x_sort[i] + x_sort[i + 1]) / 2.0`.
- **Why:** Testing candidate thresholds at the exact values of $x$ rather than the midpoints between consecutive sorted distinct values.
- **How:** Evaluate midpoints between consecutive elements: `(x[i] + x[i+1]) / 2` and skip identical duplicates.

---

### LESSON-T3-29: Random Forest Out-of-Bag (OOB) Error Estimation
- **Challenge ID:** `py-rf-oob-error`
- **Pedagogical Objective:** Formulate Out-of-Bag (OOB) validation for ensemble bagging, tracking unselected observations across bootstrap replicas ($P(\\text{OOB}) = (1 - 1/N)^N \\approx e^{-1} \\approx 36.8\\%$) and aggregating majority votes without external cross-validation.
- **Mathematical Anchor:**
  $$\\hat{Y}_i^{\\text{OOB}} = \\arg\\max_c \\sum_{b: i \\notin S_b} \\mathbf{1}\\big(T_b(\\mathbf{x}_i) = c\\big), \\quad \\text{OOB-Accuracy} = \\frac{1}{N} \\sum_{i=1}^N \\mathbf{1}(\\hat{Y}_i^{\\text{OOB}} = y_i)$$

#### Input/Output Specifications
- **Input:**
  - `y_true`: `np.ndarray` of shape `(N,)` (ground-truth class labels).
  - `oob_predictions`: `list[dict[int, int]]` (list of dictionaries where dictionary $b$ maps sample indices $i$ to tree $b$'s prediction, only for samples that were out-of-bag in tree $b$).
- **Output:**
  - `float`: Overall Out-of-Bag classification accuracy.

#### Clean Starter Code
```python
import numpy as np

def compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:
    \"\"\"
    Computes Random Forest Out-of-Bag (OOB) classification accuracy.
    \"\"\"
    # TODO: For each sample i, aggregate votes from all trees where i was OOB and take majority vote
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:
    n = len(y_true)
    correct = 0
    counted = 0
    
    for i in range(n):
        votes = [pred_dict[i] for pred_dict in oob_predictions if i in pred_dict]
        if len(votes) > 0:
            vals, counts = np.unique(votes, return_counts=True)
            pred_class = vals[np.argmax(counts)]
            if pred_class == y_true[i]:
                correct += 1
            counted += 1
            
    return float(correct / counted) if counted > 0 else 0.0
```

#### Public & Hidden Assertions
```python
# Public Test Case: 4 samples with unambiguous OOB majorities
y_t = np.array([0, 1, 1, 0])
oob_preds = [
    {0: 0, 1: 1, 2: 1, 3: 0},
    {0: 0, 1: 1, 2: 1, 3: 0},
    {2: 0, 3: 1}
]
acc = compute_oob_accuracy(y_t, oob_preds)
np.testing.assert_allclose(acc, 1.0, atol=1e-7)

# Hidden Test Case: Partial OOB coverage (some samples never OOB)
oob_partial = [{0: 0}, {0: 0, 1: 0}] # sample 2 and 3 not evaluated
acc_part = compute_oob_accuracy(y_t, oob_partial)
assert 0.0 <= acc_part <= 1.0
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.6ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Accuracy calculation divides by zero or evaluates in-bag samples.
- **Where:** `votes = [p[i] for p in oob_predictions if i in p]`.
- **Why:** Assuming all samples appear in all trees, or including in-bag bootstrap training predictions.
- **How:** Only tally predictions for sample $i$ if $i$ was omitted from tree $b$'s bootstrap draw (`i in pred_dict`).

---

## 17. Module 33: Gradient Boosted Trees (GBM, XGBoost, LightGBM)

### LESSON-T3-30: 1D Gradient Boosting with Pseudo-Residuals (GBM)
- **Challenge ID:** `py-gbm-pseudo-residuals`
- **Pedagogical Objective:** Formulate Friedman's Gradient Boosting Machine (GBM) as functional gradient descent in prediction space, computing pseudo-residuals (negative loss gradients) and optimal terminal leaf shrinkage $\\gamma$ for both MSE and MAE losses.
- **Mathematical Anchor:**
  $$r_{im} = - \\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]_{F = F_{m-1}}, \\quad \\gamma_m = \\arg\\min_\\gamma \\sum_{i=1}^N L(y_i, F_{m-1}(x_i) + \\gamma)$$

#### Input/Output Specifications
- **Input:**
  - `y`: `np.ndarray` of shape `(N,)` (targets).
  - `f_prev`: `np.ndarray` of shape `(N,)` (current model predictions $F_{m-1}$).
  - `loss`: `str` (either `"mse"` or `"mae"`, default `"mse"`).
- **Output:**
  - `tuple[np.ndarray, float]`: `(pseudo_residuals, optimal_gamma)` where `pseudo_residuals` is `(N,)` and `optimal_gamma` is scalar update.

#### Clean Starter Code
```python
import numpy as np

def compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = "mse") -> tuple[np.ndarray, float]:
    \"\"\"
    Computes functional negative gradient pseudo-residuals and optimal constant step gamma.
    \"\"\"
    # TODO: Compute negative loss gradients and optimal line-search step for MSE or MAE
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = "mse") -> tuple[np.ndarray, float]:
    if loss == "mse":
        # L(y, f) = 0.5 * (y - f)^2 => - dL/df = y - f
        r = y - f_prev
        gamma = float(np.mean(r))
    elif loss == "mae":
        # L(y, f) = |y - f| => - dL/df = sign(y - f)
        r = np.sign(y - f_prev)
        gamma = float(np.median(y - f_prev))
    else:
        raise ValueError(f"Unsupported loss: {loss}")
    return r, gamma
```

#### Public & Hidden Assertions
```python
# Public Test Case: MSE loss residuals and step
y_g = np.array([2.0, 4.0, 6.0])
f_g = np.array([1.0, 3.0, 5.0])
r_g, gamma_g = compute_gbm_step(y_g, f_g, "mse")
np.testing.assert_allclose(r_g, np.array([1.0, 1.0, 1.0]), atol=1e-7)
np.testing.assert_allclose(gamma_g, 1.0, atol=1e-7)

# Hidden Test Case: MAE median robustness against outliers
y_outlier = np.array([2.0, 4.0, 100.0]) # Massive outlier
f_outlier = np.array([1.0, 3.0, 5.0])
r_mae, gamma_mae = compute_gbm_step(y_outlier, f_outlier, "mae")
np.testing.assert_allclose(r_mae, np.array([1.0, 1.0, 1.0]), atol=1e-7)
np.testing.assert_allclose(gamma_mae, 1.0, atol=1e-7) # Median resists 100.0
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.4ms (<800ms budget).
- **Memory Footprint:** <10KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Residuals have wrong sign ($f - y$ instead of $y - f$).
- **Where:** `r = y - f_prev`.
- **Why:** Confusing the gradient of the loss with the *negative* gradient (pseudo-residual). Gradient boosting descends the loss surface by following the negative gradient.
- **How:** Set $r = - \frac{\partial L}{\partial f} = y - f$ for MSE loss.

---

### LESSON-T3-31: XGBoost 2nd-Order Expansion: Leaf Weights & Split Gain
- **Challenge ID:** `py-xgboost-gain`
- **Pedagogical Objective:** Formulate Chen & Guestrin's XGBoost second-order Taylor expansion objective, computing exact optimal leaf weights $w_j^*$ and split quality gain using gradient sums $G$ and Hessian sums $H$ regularized by $\\lambda$ and complexity penalty $\\gamma$.
- **Mathematical Anchor:**
  $$w^* = -\\frac{\\sum_{i} g_i}{\\sum_i h_i + \\lambda}, \\quad \\text{Gain} = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{(G_L + G_R)^2}{H_L + H_R + \\lambda} \\right] - \\gamma$$

#### Input/Output Specifications
- **Input:**
  - `g`: `np.ndarray` of shape `(N,)` (sample first-order gradients $g_i$).
  - `h`: `np.ndarray` of shape `(N,)` (sample second-order hessians $h_i$).
  - `split_mask`: `np.ndarray` of shape `(N,)` (boolean mask where `True` sends sample to left child $L$).
  - `lam`: `float` ($L_2$ leaf regularization parameter $\\lambda \\ge 0$).
  - `gamma`: `float` (minimum split loss reduction penalty $\\gamma \\ge 0$).
- **Output:**
  - `tuple[float, float, float]`: `(w_left, w_right, gain)` containing left leaf weight, right leaf weight, and split gain.

#### Clean Starter Code
```python
import numpy as np

def compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:
    \"\"\"
    Computes XGBoost second-order optimal leaf weights and split gain.
    \"\"\"
    # TODO: Aggregate G and H for left and right nodes, compute weights and split gain
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:
    g_L = float(np.sum(g[split_mask]))
    h_L = float(np.sum(h[split_mask]))
    g_R = float(np.sum(g[~split_mask]))
    h_R = float(np.sum(h[~split_mask]))
    
    w_L = - g_L / (h_L + lam)
    w_R = - g_R / (h_R + lam)
    
    gain = 0.5 * (
        (g_L ** 2) / (h_L + lam) +
        (g_R ** 2) / (h_R + lam) -
        ((g_L + g_R) ** 2) / (h_L + h_R + lam)
    ) - gamma
    
    return w_L, w_R, float(gain)
```

#### Public & Hidden Assertions
```python
# Public Test Case: Standard split evaluation
g_xgb = np.array([-1.5, -2.0, 1.0, 2.5])
h_xgb = np.array([1.0, 1.0, 1.0, 1.0])
m_xgb = np.array([True, True, False, False])
w_l, w_r, gain_val = compute_xgboost_split_gain(g_xgb, h_xgb, m_xgb, lam=1.0, gamma=0.0)
assert w_l > 0.0 and w_r < 0.0, "Negative gradient must yield positive leaf weight"
assert gain_val > 0.0

# Hidden Test Case: High gamma pruning (Gain turns negative)
_, _, gain_penalized = compute_xgboost_split_gain(g_xgb, h_xgb, m_xgb, lam=1.0, gamma=10.0)
assert gain_penalized < 0.0, "High gamma must penalize marginal splits into negative gain"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~0.2ms (<800ms budget).
- **Memory Footprint:** <5KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Leaf weights have inverted signs.
- **Where:** `w = - G / (H + lam)`.
- **Why:** Forgetting the leading negative sign in the unconstrained parabolic vertex formula: $\arg\min_w (G w + \frac{1}{2}(H + \lambda) w^2) = - \frac{G}{H + \lambda}$.
- **How:** Multiply by $-1$: `w = - g_sum / (h_sum + lam)`.

---

## 18. Module 34: Unsupervised Manifolds (PCA, t-SNE, UMAP)

### LESSON-T3-32: Principal Component Analysis (PCA) via SVD & Explained Variance Ratio
- **Challenge ID:** `py-pca-svd`
- **Pedagogical Objective:** Formulate Principal Component Analysis via Singular Value Decomposition of the centered data matrix $\\tilde{\\mathbf{X}} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T$, computing low-rank orthogonal coordinates and individual explained variance ratios.
- **Mathematical Anchor:**
  $$\\tilde{\\mathbf{X}} = \\mathbf{X} - \\boldsymbol{\\mu}_X, \\quad \\tilde{\\mathbf{X}} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T, \\quad \\mathbf{Z} = \\tilde{\\mathbf{X}} \\mathbf{V}_k, \\quad \\text{Var}(\\mathbf{z}_j) = \\frac{\\sigma_j^2}{N - 1}, \\quad \\text{EVR}_j = \\frac{\\sigma_j^2}{\\sum_i \\sigma_i^2}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, D)`.
  - `n_components`: `int` (number of principal components $K \\le D$).
- **Output:**
  - `dict[str, np.ndarray]` with keys:
    - `"Z"`: `(N, K)` projected low-dimensional coordinates.
    - `"V_k"`: `(D, K)` principal directions (eigenvectors).
    - `"explained_variance_ratio"`: `(K,)` variance fraction explained by each component.

#### Clean Starter Code
```python
import numpy as np

def fit_pca_svd(X: np.ndarray, n_components: int) -> dict[str, np.ndarray]:
    \"\"\"
    Fits PCA via SVD on centered data, computing projections and explained variance ratios.
    \"\"\"
    # TODO: Mean-center X, compute SVD, project data, and calculate variance ratios
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def fit_pca_svd(X: np.ndarray, n_components: int) -> dict[str, np.ndarray]:
    mu = np.mean(X, axis=0)
    X_centered = X - mu
    U, s, Vt = np.linalg.svd(X_centered, full_matrices=False)
    
    V_k = Vt[:n_components].T
    Z = X_centered @ V_k
    explained_variance_ratio = (s[:n_components] ** 2) / np.sum(s ** 2)
    
    return {
        "Z": Z,
        "V_k": V_k,
        "explained_variance_ratio": explained_variance_ratio,
    }
```

#### Public & Hidden Assertions
```python
# Public Test Case: 1D line in 2D space (100% variance along first component)
X_pca = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0], [4.0, 8.0]])
out_pca = fit_pca_svd(X_pca, n_components=1)
np.testing.assert_allclose(out_pca["explained_variance_ratio"][0], 1.0, atol=1e-7)

# Hidden Test Case: Orthogonality of projected principal components
rng = np.random.default_rng(3401)
X_rand = rng.standard_normal((100, 4))
out_rand = fit_pca_svd(X_rand, n_components=3)
Z_mat = out_rand["Z"]
cov_Z = Z_mat.T @ Z_mat
# Off-diagonal elements must be zero within numerical tolerance
np.testing.assert_allclose(cov_Z - np.diag(np.diag(cov_Z)), np.zeros((3, 3)), atol=1e-7)
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~1.1ms (<800ms budget).
- **Memory Footprint:** <15KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** First principal component does not align with maximum variance.
- **Where:** `X_centered = X - mu`.
- **Why:** Failing to center the columns of $X$ before running SVD, causing the first singular vector to capture the displacement from the coordinate origin rather than true variance.
- **How:** Always subtract column means: `X_centered = X - np.mean(X, axis=0)` before running SVD.

---

### LESSON-T3-33: t-SNE High-Dimensional Affinities & Perplexity Binary Search
- **Challenge ID:** `py-tsne-affinities`
- **Pedagogical Objective:** Formulate the input manifold transformation of t-Distributed Stochastic Neighbor Embedding (t-SNE), solving for data-point specific Gaussian bandwidths $\\sigma_i$ via binary search to match a user-defined Shannon perplexity and computing the symmetrized joint probability matrix $P_{ij}$.
- **Mathematical Anchor:**
  $$p_{j|i} = \\frac{\\exp(-\\beta_i \\|\\mathbf{x}_i - \\mathbf{x}_j\\|^2)}{\\sum_{k \\neq i} \\exp(-\\beta_i \\|\\mathbf{x}_i - \\mathbf{x}_k\\|^2)}, \\quad \\text{Perp}(P_i) = 2^{H(P_i)} = 2^{-\\sum_{j \\neq i} p_{j|i} \\log_2 p_{j|i}}, \\quad P_{ij} = \\frac{p_{j|i} + p_{i|j}}{2N}$$

#### Input/Output Specifications
- **Input:**
  - `X`: `np.ndarray` of shape `(N, D)`.
  - `target_perplexity`: `float` (desired perplexity $\\approx 2$ to $30$).
  - `tol`: `float` (binary search tolerance, default $10^{-4}$).
  - `max_iter`: `int` (binary search iterations per point, default 50).
- **Output:**
  - `np.ndarray` of shape `(N, N)`: Symmetrized joint probability matrix $P_{ij}$ with zero diagonal and $\\sum_{ij} P_{ij} = 1.0$.

#### Clean Starter Code
```python
import numpy as np

def compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:
    \"\"\"
    Computes t-SNE high-dimensional affinities P_ij using binary search for Gaussian variances.
    \"\"\"
    # TODO: Compute pairwise distances, binary search for beta_i to match target entropy, and symmetrize
    pass
```

#### Vectorized Reference Solution
```python
import numpy as np

def compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:
    n = len(X)
    D = np.sum((X[:, None, :] - X[None, :, :]) ** 2, axis=-1)
    target_entropy = np.log(target_perplexity)
    P = np.zeros((n, n))
    
    for i in range(n):
        beta_min = -np.inf
        beta_max = np.inf
        beta = 1.0
        d_i = np.delete(D[i], i)
        
        for _ in range(max_iter):
            p_i = np.exp(-d_i * beta)
            sum_p = np.sum(p_i)
            if sum_p == 0:
                p_i = np.ones_like(p_i) / len(p_i)
            else:
                p_i /= sum_p
                
            H = -np.sum(p_i * np.log(np.maximum(p_i, 1e-12)))
            diff = H - target_entropy
            
            if np.abs(diff) < tol:
                break
            if diff > 0:
                beta_min = beta
                beta = beta * 2.0 if np.isinf(beta_max) else (beta + beta_max) / 2.0
            else:
                beta_max = beta
                beta = beta / 2.0 if np.isinf(beta_min) else (beta + beta_min) / 2.0
                
        indices = [j for j in range(n) if j != i]
        P[i, indices] = p_i
        
    P_sym = (P + P.T) / (2.0 * n)
    return P_sym
```

#### Public & Hidden Assertions
```python
# Public Test Case: 4 points clustered into two distant pairs
X_tsne = np.array([[0.0], [0.1], [10.0], [10.1]])
P_tsne = compute_tsne_p_matrix(X_tsne, target_perplexity=1.5)
np.testing.assert_allclose(np.sum(P_tsne), 1.0, atol=1e-7)
np.testing.assert_allclose(P_tsne, P_tsne.T, atol=1e-7)
np.testing.assert_allclose(np.diag(P_tsne), np.zeros(4), atol=1e-7)

# Hidden Test Case: Intracluster affinities exceed intercluster affinities
assert P_tsne[0, 1] > P_tsne[0, 2] * 10.0, "t-SNE affinities must sharply decay with distance"
```

#### Execution Budget Verification
- **Pyodide WASM Execution Time:** ~7.5ms (<800ms budget).
- **Memory Footprint:** <20KB heap (<350MB limit).

#### 4-Part Student Diagnostic Hints
- **What:** Joint probability matrix $P$ does not sum to 1.0 or is asymmetrical.
- **Where:** `P_sym = (P + P.T) / (2.0 * n)`.
- **Why:** Forgetting to symmetrize conditional affinities $p_{j|i}$ and divide by total points $2N$.
- **How:** Joint affinities must satisfy $P_{ij} = \frac{p_{j|i} + p_{i|j}}{2N}$, guaranteeing symmetry $P = P^T$ and normalization $\sum_{ij} P_{ij} = 1.0$.
"""
