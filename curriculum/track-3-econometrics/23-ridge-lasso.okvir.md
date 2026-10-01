---
id: "ridge-lasso"
version: "1.0.0"
title: "Ridge Regression (L2) & SVD Spectral Shrinkage"
track: "econometrics"
module: "mod-29"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus", "singular-value-decomposition"]
i18n:
  ar: "انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة"
---

# Ridge Regression (L2) & SVD Spectral Shrinkage

When explanatory features are highly collinear or when the number of features $p$ approaches or exceeds sample size $n$, Ordinary Least Squares (OLS) breaks down. In matrix algebra terms, $\mathbf{X}^T \mathbf{X}$ becomes near-singular (ill-conditioned), and its inverse $(\mathbf{X}^T \mathbf{X})^{-1}$ explodes. The OLS estimator becomes like a loose, vibrating lever arm: the slightest whisper of noise in the training set causes estimated coefficients to swing wildly into enormous opposing positive and negative magnitudes ($+1,500$ and $-1,498$).

Hoerl and Kennard (1970) introduced **Ridge Regression ($L_2$ regularization)** to stabilize the system. Think of Ridge regression as attaching **an elastic rubber cord between each coefficient and the zero origin**. When OLS tries to sling coefficients to massive values to overfit collinear noise, the elastic cord stretches and exerts a restorative pull, yanking all coefficients back toward zero. 

Because the $L_2$ penalty is quadratic ($\lambda \|\boldsymbol{\beta}\|_2^2$), the cord pulls hardest on massive coefficients and eases its tension as coefficients approach zero. Consequently, Ridge smoothly shrinks all coefficients together, conditioning the singular values of the data matrix without ever snapping any coefficient to exactly zero.

:::simulation-widget{engine="canvas2d" component="RegularizationGeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

عندما تتداخل المتغيرات التفسيرية بشدة (Multicollinearity) أو عندما يقترب عدد المتغيرات $p$ من حجم العينة $n$، ينهار انحدار المربعات الصغرى العادي (OLS). جبرياً، تصبح المصفوفة $\mathbf{X}^T \mathbf{X}$ شبه شاذة (Ill-conditioned)، وتنفجر قيم مقلوبها نحو اللانهاية. يعمل مقدر OLS كذراع رافعة رخوة تتأرجح بجنون؛ فأي اهتزاز طفيف في البيانات يدفع المعاملات إلى قيم موجبة وسالبة فلكية متعارضة ($+1,500$ و $-1,498$).

قدم هورل وكينارد (1970) **انحدار ريدج (Ridge Regression - تنظيم $L_2$)** لإعادة الاستقرار للنظام. تخيل انحدار ريدج كـ **حبل مطاطي مرن يربط كل معامل بنقطة الصفر**. كلما حاول المعامل التضخم لفرط تخصيص الضجيج، تمدد الحبل المطاطي ومارس قوة جذب مرنة تشد المعامل بقوة نحو الصفر.

ونظراً لأن جزاء $L_2$ تربيعي ($\lambda \|\boldsymbol{\beta}\|_2^2$)، فإن الحبل يمارس أقصى قوة شد على المعاملات الضخمة، بينما تتلاشى قوة جذبه مع اقتراب المعامل من الصفر. والنتيجة هي انكماش ناعم وسلس لجميع المعاملات بالتوازي، مما يضبط القيم المنفردة للمصفوفة دون أن يصفر أي معامل تماماً.

### Mathematical Foundations

Ridge regression augments the residual sum of squares with a quadratic $L_2$ penalty on the coefficient vector:

$$
\min_{\boldsymbol{\beta}} \mathcal{L}_{\text{Ridge}}(\boldsymbol{\beta}) = \frac{1}{2n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda \|\boldsymbol{\beta}\|_2^2
$$

#### Breakdown of Objective Terms:
- $\frac{1}{2n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2$: Empirical Mean Squared Error (loss measuring fidelity to the training data).
- $\lambda \ge 0$: Regularization hyperparameter governing the bias-variance tradeoff (as $\lambda \to 0$, Ridge recovers OLS; as $\lambda \to \infty$, all $\boldsymbol{\beta} \to \mathbf{0}$).
- $\|\boldsymbol{\beta}\|_2^2 = \sum_{j=1}^p \beta_j^2$: Squared Euclidean $L_2$ norm penalty penalizing coefficient magnitudes.

Setting the gradient to zero yields the unique, closed-form analytical solution:

$$
\nabla_{\boldsymbol{\beta}} \mathcal{L} = -\frac{1}{n}\mathbf{X}^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta}) + 2\lambda \boldsymbol{\beta} = \mathbf{0} \implies \hat{\boldsymbol{\beta}}_{\text{Ridge}} = \left(\mathbf{X}^T \mathbf{X} + 2n\lambda \mathbf{I}_p\right)^{-1} \mathbf{X}^T \mathbf{y}
$$

Because $2n\lambda \mathbf{I}_p$ adds a strictly positive constant along the diagonal, the matrix $(\mathbf{X}^T \mathbf{X} + 2n\lambda \mathbf{I})$ is guaranteed to be strictly positive-definite and invertible, even if $\mathbf{X}^T \mathbf{X}$ is rank-deficient ($p > n$).

#### SVD Spectral Shrinkage
Let $\mathbf{X} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$ be the Singular Value Decomposition (SVD) of the centered design matrix, with singular values $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_p > 0$. The Ridge predictions satisfy:

$$
\hat{\mathbf{y}}_{\text{Ridge}} = \mathbf{X}\hat{\boldsymbol{\beta}}_{\text{Ridge}} = \sum_{j=1}^p \mathbf{u}_j \left( \frac{\sigma_j^2}{\sigma_j^2 + 2n\lambda} \right) \mathbf{u}_j^T \mathbf{y}
$$

The factor $f_j = \frac{\sigma_j^2}{\sigma_j^2 + 2n\lambda} \in (0, 1]$ represents the **spectral shrinkage factor**. Directions with large singular values (principal components with vast variance) suffer minimal shrinkage, whereas collinear directions with tiny singular values ($\sigma_j \approx 0$) are squashed toward zero.

The **effective degrees of freedom** of the model is:

$$
\text{df}(\lambda) = \text{tr}\left( \mathbf{X}(\mathbf{X}^T \mathbf{X} + 2n\lambda \mathbf{I})^{-1}\mathbf{X}^T \right) = \sum_{j=1}^p \frac{\sigma_j^2}{\sigma_j^2 + 2n\lambda}
$$

يُضيف تنظيم ريدج حداً موجباً قطعياً إلى قطر مصفوفة التغاير، مما يضمن قابليتها للعكس دائماً. ومن خلال تفكيك القيم المنفردة (SVD)، يكبح النموذج الاتجاهات الخطية الضعيفة التي تسبب تضخم التباين، ويمنحنا درجة حرية فعالة $\text{df}(\lambda)$ تعكس التعقيد الحقيقي للنموذج بدقة.

:::python-challenge{id="py-ridge-lasso"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[1.0, 1.0], [1.0, 2.0], [2.0, 2.0], [2.0, 3.0]]); y = np.array([2.0, 3.0, 4.0, 5.0]); res = fit_ridge_svd(X, y, lmbda=0.1); f\"{res['beta'][0]:.2f}, {res['df_effective']:.2f}\""
    expected: "0.96, 1.94"
  - input: "X = np.array([[1.0, 0.0], [0.0, 1.0]]); y = np.array([3.0, 4.0]); res = fit_ridge_svd(X, y, lmbda=0.5); f\"{res['beta'][0]:.2f}, {res['beta'][1]:.2f}\""
    expected: "1.00, 1.33"
---
```python
import numpy as np

def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:
    """
    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, P)
        Design matrix.
    y : np.ndarray of shape (N,)
        Target response vector.
    lmbda : float
        Regularization strength lambda >= 0.
        
    Returns
    -------
    dict with keys:
        'beta': Estimated Ridge coefficient vector.
        'singular_values': Singular values of X.
        'shrinkage_factors': SVD spectral shrinkage factors per component.
        'df_effective': Effective degrees of freedom df(lambda).
    """
    N, P = X.shape
    
    # 1. Closed-form Ridge: (X^T X + 2*N*lambda * I)^(-1) X^T y
    XtX = X.T @ X
    penalty_diag = 2.0 * N * lmbda * np.eye(P)
    beta = np.linalg.solve(XtX + penalty_diag, X.T @ y)
    
    # 2. SVD of X to obtain singular values
    U, s, Vt = np.linalg.svd(X, full_matrices=False)
    
    # 3. Spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)
    s_squared = s ** 2
    shrinkage = s_squared / (s_squared + 2.0 * N * lmbda)
    df_effective = float(np.sum(shrinkage))
    
    return {
        "beta": beta,
        "singular_values": s,
        "shrinkage_factors": shrinkage,
        "df_effective": df_effective
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: Collinear Clinical Biomarkers in Intensive Care
A medical AI team builds a risk model to predict acute kidney injury using 40 patient vitals. Among the features are four hemodynamic metrics: Systolic Blood Pressure, Diastolic Blood Pressure, Mean Arterial Pressure, and Pulse Pressure. Because these four variables are algebraically interdependent ($MAP \approx DBP + \frac{1}{3}(SBP - DBP)$), their pairwise correlations exceed $0.96$.

When fitting standard unregularized OLS, the model produces erratic coefficients: $+78.4$ on Systolic BP and $-76.9$ on Mean Arterial Pressure, both with giant standard errors ($SE \approx 45.0$). On an unseen test cohort, the model's Mean Squared Error explodes.

**Diagnostic Question:** How does fitting Ridge regression resolve this modeling pathology?

- **Option A (Correct):** Ridge regression conditions the near-singular covariance matrix by adding a positive constant to the eigenvalues. The $L_2$ penalty pulls the opposing collinear coefficients toward stable, moderate values, drastically slashing the variance of the predictions and improving generalization on unseen test patients.
- **Option B:** Ridge regression sets two of the four collinear blood pressure features to exactly zero.
- **Option C:** Ridge transforms the linear model into an ensemble of orthogonal decision trees.
- **Option D:** Ridge eliminates the need for test sets by proving zero generalization error via the Gauss-Markov theorem.
