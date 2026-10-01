---
id: "multiple-regression-matrix-calculus"
version: "1.0.0"
title: "Multiple Regression Algebra & Matrix Calculus"
track: "econometrics"
module: "mod-20"
estimated_minutes: 15
prerequisites: ["ols-residual-geometry", "matrix-multiplication-composition"]
i18n:
  ar: "جبر الانحدار المتعدد وحسبان المصفوفات"
---

# Multiple Regression Algebra & Matrix Calculus

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Moving from simple bivariate regression to multiple regression transforms econometrics from basic line-drawing into a multidimensional **ceteris paribus machine** (evaluating the effect of one factor while holding everything else constant). In real economies, variables never change in a vacuum: schooling is deeply intertwined with natural talent, family wealth, geographical location, and work history.

Matrix calculus allows us to optimize across all $K$ dimensions simultaneously in a single stroke. Instead of writing out pages of tedious summations and $K$ separate partial derivatives, matrix algebra collapses the problem into an elegant quadratic loss surface:

$$
S(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})
$$

Two geometric operators govern the entire algebraic structure:
1. **The Hat / Projection Matrix ($\mathbf{P}_X$):** The "synthesizer" that takes any vector in the universe and snaps it onto the closest point within the regressor hyperplane: $\hat{\mathbf{y}} = \mathbf{P}_X \mathbf{y}$.
2. **The Annihilator Matrix ($\mathbf{M}_X = \mathbf{I}_N - \mathbf{P}_X$):** The "residual maker" that completely wipes out and obliterates any vector lying in the subspace of $\mathbf{X}$ ($\mathbf{M}_X \mathbf{X} = \mathbf{0}$). When applied to the outcome, it purges every trace of the regressors to isolate the pure residual vector: $\mathbf{e} = \mathbf{M}_X \mathbf{y}$.

إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد مطابقة منحنيات إلى **آلة جبارة لتطبيق مبدأ ثبات العوامل الأخرى (Ceteris Paribus)**. في الواقع الاقتصادي الحي، لا تتحرك المتغيرات بمعزل عن بعضها: فالتعليم مرتبط ارتباطًا وثيقًا بالذكاء الفطري، وثروة الوالدين، والبيئة الجغرافية، والخبرة العملية.

يتيح حسبان المصفوفات صياغة الاستمثال عبر جميع الأبعاد الـ $K$ بضربة واحدة أنيقة. فبدلاً من كتابة صفحات لا تنتهي من علامات الجمع والاشتقاقات الجزئية المنفصلة، يختزل جبر المصفوفات المسألة في سطح خسارة تربيعي متناسق:

$$
S(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})
$$

ويحكم هذا البناء الرياضي عاملان هندسيان جوهريان:
1. **مصفوفة الإسقاط ($\mathbf{P}_X$):** "المُجمِّع" الذي يلتقط أي متجه في الفضاء ويُسقطه عموديًا على أقرب نقطة داخل المستوي الفائق للمتغيرات: $\hat{\mathbf{y}} = \mathbf{P}_X \mathbf{y}$.
2. **مصفوفة الإبادة والتلاشي ($\mathbf{M}_X = \mathbf{I}_N - \mathbf{P}_X$):** "صانع البواقي" الذي يمحو ويسحق تمامًا أي متجه يقع ضمن الفضاء الفرعي لـ $\mathbf{X}$ ($\mathbf{M}_X \mathbf{X} = \mathbf{0}$). وعند تطبيقها على متجه النتائج، فإنها تطهره من كل أثر للمتغيرات المستقلة لتعزل البواقي النقية: $\mathbf{e} = \mathbf{M}_X \mathbf{y}$.

:::simulation-widget{engine="canvas2d" component="MultivariatePlaneVifLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Expanding the sum of squared residuals scalar objective:

$$
S(\boldsymbol{\beta}) = \mathbf{y}^T\mathbf{y} - 2\boldsymbol{\beta}^T \mathbf{X}^T \mathbf{y} + \boldsymbol{\beta}^T (\mathbf{X}^T \mathbf{X}) \boldsymbol{\beta}
$$

Using matrix calculus derivative rules ($\nabla_{\mathbf{b}} (\mathbf{a}^T \mathbf{b}) = \mathbf{a}$ and $\nabla_{\mathbf{b}} (\mathbf{b}^T \mathbf{A} \mathbf{b}) = 2\mathbf{A}\mathbf{b}$ for symmetric $\mathbf{A}$):

$$
\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta}) = -2\mathbf{X}^T \mathbf{y} + 2(\mathbf{X}^T \mathbf{X})\boldsymbol{\beta} = \mathbf{0}
$$

When $\text{rank}(\mathbf{X}) = K < N$, $\mathbf{X}^T \mathbf{X}$ is strictly invertible:

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

The Hessian matrix verifies global convexity:

$$
\nabla_{\boldsymbol{\beta}}^2 S(\boldsymbol{\beta}) = 2\mathbf{X}^T \mathbf{X} \succ \mathbf{0} \quad (\text{strictly positive definite})
$$

The fundamental projection properties of $\mathbf{P}_X$ and $\mathbf{M}_X$:

$$
\mathbf{P}_X \equiv \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1}\mathbf{X}^T, \quad \mathbf{M}_X \equiv \mathbf{I}_N - \mathbf{P}_X
$$

$$
\mathbf{P}_X = \mathbf{P}_X^T = \mathbf{P}_X^2, \quad \mathbf{M}_X = \mathbf{M}_X^T = \mathbf{M}_X^2, \quad \mathbf{P}_X \mathbf{M}_X = \mathbf{0}
$$

$$
\text{tr}(\mathbf{P}_X) = \text{rank}(\mathbf{X}) = K, \quad \text{tr}(\mathbf{M}_X) = N - K
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $S(\boldsymbol{\beta})$: Scalar sum of squared residuals quadratic loss function.
* $\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta}) \in \mathbb{R}^{K \times 1}$: Gradient vector of partial derivatives with respect to each $\beta_j$.
* $\nabla_{\boldsymbol{\beta}}^2 S(\boldsymbol{\beta}) \in \mathbb{R}^{K \times K}$: Hessian matrix of second-order partial derivatives.
* $\mathbf{P}_X \in \mathbb{R}^{N \times N}$: Symmetric idempotent projection matrix with trace equal to column dimension $K$.
* $\mathbf{M}_X \in \mathbb{R}^{N \times N}$: Symmetric idempotent annihilator matrix satisfying $\mathbf{M}_X \mathbf{X} = \mathbf{0}$ with trace equal to degrees of freedom $N - K$.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a function that computes the hat matrix $\mathbf{P}_X$ and the residual annihilator matrix $\mathbf{M}_X$, and numerically confirms their idempotent and orthogonality properties.

:::python-challenge{id="py-multiple-regression-matrix-calculus"}
---
timeout_ms: 3000
test_cases:
  - input: "P, M = compute_projection_and_annihilator(np.array([[1.0], [1.0]])); round(float(np.trace(P)), 4)"
    expected: "1.0"
  - input: "P, M = compute_projection_and_annihilator(np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0]])); round(float(np.trace(M)), 4)"
    expected: "1.0"
  - input: "P, M = compute_projection_and_annihilator(np.array([[1.0], [2.0], [3.0]])); np.allclose(P @ M, np.zeros((3, 3)), atol=1e-7)"
    expected: "True"
---
```python
import numpy as np

def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Computes the hat matrix P_X and residual annihilator matrix M_X.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, K)
        Design matrix (must have full column rank).
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        P: Projection matrix (N, N)
        M: Annihilator matrix (N, N)
    """
    N, K = X.shape
    
    # Step 1: Compute (X^T X)^(-1)
    XtX = X.T @ X
    XtX_inv = np.linalg.inv(XtX)
    
    # Step 2: Form projection matrix P = X (X^T X)^(-1) X^T
    P = X @ XtX_inv @ X.T
    
    # Step 3: Form annihilator matrix M = I - P
    I_N = np.eye(N)
    M = I_N - P
    
    return P, M
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

An empirical economist specifies a wage equation with four mutually exclusive education categories: `No_HighSchool`, `HighSchool`, `College`, `GraduateDegree`. In addition to all four indicators, she includes a constant intercept column of ones ($\boldsymbol{\iota}_N$). When running the regression, her Python script crashes with `numpy.linalg.LinAlgError: Singular matrix`.

What structural error occurred, and how does matrix calculus resolve it?

* [ ] The sample size was too small, causing the Hessian matrix to become negative definite.
* [x] The columns suffer from the "Dummy Variable Trap" (perfect multicollinearity): the four indicator columns sum exactly to the intercept ($\sum_{j=1}^4 \mathbf{d}_j = \boldsymbol{\iota}_N$), violating the full rank assumption and making $\mathbf{X}^T \mathbf{X}$ non-invertible. The fix is to omit one baseline category or drop the constant.
* [ ] The error means education has no causal effect on wages.
* [ ] The regression must be converted to non-linear neural networks to invert singular matrices.
