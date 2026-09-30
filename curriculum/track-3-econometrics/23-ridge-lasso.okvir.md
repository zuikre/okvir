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

When features are highly collinear or when the number of features $P$ approaches the sample size $N$, the design matrix $\mathbf{X}^T \mathbf{X}$ becomes ill-conditioned, causing the OLS variance $(\mathbf{X}^T \mathbf{X})^{-1} \sigma^2$ to explode to infinity. Small perturbations in the data result in wild swings in estimated coefficients.

Hoerl and Kennard (1970) introduced Ridge Regression ($L_2$ regularization) to solve this instability. By adding a spherical quadratic penalty $\lambda \|\boldsymbol{\beta}\|_2^2$ to the SSR loss, Ridge conditions the singular values of the system. Thr

:::simulation-widget{engine="canvas2d" component="RidgeL2GeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\min_{\boldsymbol{\beta}} \mathcal{L}_{\text{Ridge}}(\boldsymbol{\beta}) = \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda \|\boldsymbol{\beta}\|_2^2
$$

عندما تتداخل المتغيرات التفسيرية بشدة (التعدد الخطي) أو يقترب عدد المتغيرات $P$ من حجم العينة $N$، تصبح المصفوفة $\mathbf{X}^T \mathbf{X}$ شبه شاذة (Ill-conditioned)، مما يؤدي إلى تضخم تباين OLS نحو اللانهاية. ينتج عن ذلك تذبذب هائل في المعلمات التقديرية عند أي تغير طفيف في البيانات.

ابتكر هورل وكينارد (1970) انحدار ريدج (Ridge Regression) لعلاج عدم الاستقرار هذا. بإضافة جزاء تربيعي دائري $\lambda \|\boldsymbol{\beta}\|_2^2$ إلى دالة المربعات الصغرى، يضبط ريدج القيم المنفردة للمصفوفة. ومن خلال تفكيك القيم المنفردة (SVD)، يقوم ريدج بتقليص المعلمات على طول اتجاهات المكونات الرئيسية عكسيًا م

:::python-challenge{id="py-ridge-lasso"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import numpy as np

def fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict[str, object]:
    """
    Fits Ridge regression using closed-form Normal Equations and computes SVD shrinkage.
    """
    # TODO: Solve (X^T X + alpha * I) beta = X^T y, compute SVD shrinkage and df_effective
    pass
```
:::
