---
id: "elastic-net-coordinate-descent"
version: "1.0.0"
title: "Lasso Regression (L1), Polyhedral Geometry & Elastic Net"
track: "econometrics"
module: "mod-29"
estimated_minutes: 15
prerequisites: ["ridge-lasso", "multivariable-scalar-fields"]
i18n:
  ar: "انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة"
---

# Lasso Regression (L1), Polyhedral Geometry & Elastic Net

While Ridge regression ($L_2$) shrinks coefficients smoothly toward zero, it retains every single variable in the model—an undesirable trait when managing thousands of genomic markers, sensor streams, or text tokens where most features are pure noise. 

Robert Tibshirani (1996) introduced the **Lasso ($L_1$ regularization)** to achieve simultaneous regularization and feature selection. If Ridge is an elastic rubber cord that pulls coefficients toward zero without ever touching it, **Lasso is a guillotine that snaps unimportant features to exactly zero**.

The secret lies in polyhedral geometry: the $L_1$ constraint ball $\{\boldsymbol{\beta} : \sum |\beta_j| \le t\}$ is a diamond (cross-polytope) with sharp, pointed vertices positioned squarely on the coordinate axes. When the smooth elliptical loss contours of the least-squares error expand outward from the unconstrained OLS solution, they almost always make their first point of contact with one of these sharp diamond corners. At any corner on a coordinate axis, the orthogonal coefficients are mathematically pinned to exactly zero, yielding a sparse model.

Zou and Hastie (2005) introduced the **Elastic Net** to overcome Lasso's limitations on correlated features: combining the diamond corners of $L_1$ with the rounded quadratic shoulders of $L_2$.

:::simulation-widget{engine="canvas2d" component="RegularizationGeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

بينما يقلص انحدار ريدج ($L_2$) المعاملات بسلاسة نحو الصفر، فإنه يبقي على جميع المتغيرات داخل النموذج—وهو أمر غير عملي عند التعامل مع آلاف المتغيرات الجينية أو مؤشرات النصوص حيث تكون أغلب المتغيرات مجرد ضجيج لا قيمة له.

قدم روبرت تيبشيراني (1996) **انحدار لاسو (Lasso - تنظيم $L_1$)** لتحقيق الانتقاء التلقائي للمتغيرات (Feature Selection). إذا كان انحدار ريدج كحبل مطاطي يشد المعاملات نحو الصفر دون أن يلامسه أبداً، فإن **انحدار لاسو هو مقصلة حاسمة تصفر المعاملات غير المهمة لتصبح صفراً تماماً**.

يكمن السر في هندسة متعدد السطوح (Polyhedral Geometry): منطقة قيد $L_1$ هي معين ماسي ذو رؤوس وزوايا حادة مدببة تقع تماماً على محاور الإحداثيات. وعندما تتوسع قطوع خطأ المربعات الصغرى البيضاوية انطلاقاً من حل OLS الحر، فإنها تصطدم حتماً بإحدى هذه الزوايا الحادة أولاً. وعند أي رأس يقع على المحور، تصبح المعاملات المتعامدة صفراً جبرياً تاماً. وتجمع **شبكة المرونة (Elastic Net)** بين زوايا لاسو الحادة وانحناءات ريدج الملساء لمعالجة المتغيرات المترابطة كمجموعات متكاملة.

### Mathematical Foundations

The Elastic Net balances the $L_1$ and $L_2$ penalties via a convex mixing parameter $\alpha \in [0, 1]$:

$$
\min_{\boldsymbol{\beta}} \mathcal{L}_{\text{EN}}(\boldsymbol{\beta}) = \frac{1}{2n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda \left[ \alpha \|\boldsymbol{\beta}\|_1 + \frac{1 - \alpha}{2} \|\boldsymbol{\beta}\|_2^2 \right]
$$

#### Breakdown of Penalty Terms:
- $\lambda \ge 0$: Overall regularization intensity.
- $\alpha = 1$: Pure Lasso ($L_1$ norm $\|\boldsymbol{\beta}\|_1 = \sum_{j=1}^p |\beta_j|$, inducing exact sparsity).
- $\alpha = 0$: Pure Ridge ($L_2$ squared norm $\|\boldsymbol{\beta}\|_2^2 = \sum_{j=1}^p \beta_j^2$, stabilizing collinearity).
- $0 < \alpha < 1$: Elastic Net compromise providing both feature selection and grouped selection.

#### Coordinate Descent & Soft-Thresholding
Because the $L_1$ norm is non-differentiable at $\beta_j = 0$, we cannot compute a traditional gradient. Instead, we use subgradient calculus and **cyclical coordinate descent**.

Define the **Soft-Thresholding Operator**:

$$
\mathcal{S}(z, \gamma) \equiv \text{sign}(z) \max(|z| - \gamma, 0) = \begin{cases} z - \gamma & \text{if } z > \gamma \\ 0 & \text{if } |z| \le \gamma \\ z + \gamma & \text{if } z < -\gamma \end{cases}
$$

For standardized predictors ($\frac{1}{n}\mathbf{x}_j^T \mathbf{x}_j = 1$), isolate variable $j$ by computing the partial residual $\mathbf{r}^{(-j)} = \mathbf{y} - \sum_{k \ne j} \mathbf{x}_k \beta_k$ and the unconstrained projection $z_j = \frac{1}{n}\mathbf{x}_j^T \mathbf{r}^{(-j)}$. The coordinate-wise update is given by the exact scalar closed form:

$$
\beta_j \leftarrow \frac{\mathcal{S}\left(z_j, \lambda \alpha\right)}{1 + \lambda (1 - \alpha)}
$$

By cycling through features $j = 1, \dots, p$ until convergence, coordinate descent finds the global optimum with remarkable computational speed.

تعتمد خوارزمية الهبوط الإحداثي (Coordinate Descent) على مشغل العتبة المرنة (Soft-Thresholding)؛ حيث تفحص كل متغير بمعزل عن البقية، فإذا كان إسهامه التنبؤي أقل من قيمة العتبة $\lambda \alpha$، تُصفر معامل هذا المتغير فوراً دون أي استهلاك حسابي إضافي.

:::python-challenge{id="py-elastic-net-coordinate-descent"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]]); y = np.array([2.0, 0.05, -2.0, -0.05]); beta = fit_elastic_net(X, y, lmbda=0.2, alpha=1.0); f\"{beta[0]:.2f}, {beta[1]:.2f}\""
    expected: "0.80, 0.00"
  - input: "X = np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]]); y = np.array([1.0, 1.0, -1.0, -1.0]); beta = fit_elastic_net(X, y, lmbda=0.1, alpha=0.5); f\"{beta[0]:.2f}, {beta[1]:.2f}\""
    expected: "0.43, 0.43"
---
```python
import numpy as np

def fit_elastic_net(
    X: np.ndarray,
    y: np.ndarray,
    lmbda: float,
    alpha: float,
    max_iter: int = 100,
    tol: float = 1e-5
) -> np.ndarray:
    """
    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, P)
        Design matrix (assumed normalized/standardized).
    y : np.ndarray of shape (N,)
        Response vector.
    lmbda : float
        Regularization parameter lambda >= 0.
    alpha : float
        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).
    max_iter : int
        Maximum coordinate descent cycles.
    tol : float
        Convergence tolerance on coefficient changes.
        
    Returns
    -------
    np.ndarray of shape (P,)
        Sparse estimated coefficient vector.
    """
    N, P = X.shape
    beta = np.zeros(P)
    
    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)
    norm_sq = np.sum(X ** 2, axis=0) / N
    
    def soft_threshold(z: float, gamma: float) -> float:
        if z > gamma:
            return z - gamma
        elif z < -gamma:
            return z + gamma
        else:
            return 0.0

    for iteration in range(max_iter):
        beta_old = beta.copy()
        
        for j in range(P):
            # Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]
            y_pred = X @ beta
            residual = y - y_pred + X[:, j] * beta[j]
            z_j = float(X[:, j] @ residual) / N
            
            # Apply soft thresholding and Elastic Net denominator
            gamma = lmbda * alpha
            numerator = soft_threshold(z_j, gamma)
            denominator = norm_sq[j] + lmbda * (1.0 - alpha)
            
            beta[j] = numerator / denominator if denominator > 1e-8 else 0.0
            
        if np.max(np.abs(beta - beta_old)) < tol:
            break
            
    return beta
```
:::

### Practical ML Transfer Challenge

#### Scenario: High-Dimensional Microarray Cancer Genomics
A bioinformatics lab analyzes gene expression profiles for $n = 150$ lymphoma patients across $p = 25,000$ genetic markers to identify diagnostic biomarkers. A critical biological pathway contains a tightly regulated cluster of 15 genes that exhibit pairwise correlations $> 0.94$.

The lead researcher fits a pure Lasso model ($\alpha = 1$). The resulting model selects exactly one gene from the 15-gene cluster and drives the coefficients of the other 14 genes to absolute zero. When validating on an independent cohort, the selected gene's predictive power drops drastically.

**Diagnostic Question:** Why is Elastic Net ($\alpha = 0.5$) mathematically superior to pure Lasso for this genomic task?

- **Option A (Correct):** Pure Lasso exhibits extreme selection instability under high collinearity: it arbitrarily selects a single representative feature from a correlated cluster and discards the rest. Elastic Net's quadratic $L_2$ component provides the "grouping effect," shrinking the coefficients of correlated genes toward each other and retaining the entire functional biological pathway together.
- **Option B:** Elastic Net guarantees that the training loss equals zero on high-dimensional data.
- **Option C:** Lasso cannot handle cases where $p > n$, whereas Elastic Net mathematically transforms $p$ to be strictly less than $n$.
- **Option D:** Elastic Net removes the requirement for test set validation by proving Bayesian asymptotic convergence.
