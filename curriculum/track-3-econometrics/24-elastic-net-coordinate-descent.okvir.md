---
id: "elastic-net-coordinate-descent"
version: "1.0.0"
title: "Lasso Regression (L1), Polyhedral Geometry & Sparsity"
track: "econometrics"
module: "mod-29"
estimated_minutes: 15
prerequisites: ["ridge-lasso"]
i18n:
  ar: "انحدار لاسو وهندسة متعددات الوجوه وانعدام المعلمات"
---

# Lasso Regression (L1), Polyhedral Geometry & Sparsity

While Ridge regression shrinks coefficients continuously towards zero, it NEVER sets any coefficient to exactly zero. In high-dimensional settings where $P > N$ (genomics, text processing, macro forecasting), we require true feature selection. Robert Tibshirani (1996) introduced the Lasso (Least Absolute Shrinkage and Selection Operator), replacing the $L_2$ penalty with an $L_1$ norm $\lambda \sum |\beta_j|$.

The magic of Lasso lies in its polyhedral geometry: the $L_1$ ball is a cross-polytope with sharp vertices on the coordinate axes. When the elliptical OLS loss contours expand, they

:::simulation-widget{engine="canvas2d" component="RegularizationGeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\min_{\boldsymbol{\beta}} \mathcal{L}_{\text{Lasso}}(\boldsymbol{\beta}) = \frac{1}{2N}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda \|\boldsymbol{\beta}\|_1
$$

بينما يقوم انحدار ريدج بتقليص المعلمات باستمرار نحو الصفر، إلا أنه لا يجعل أي معلمة تساوي الصفر الحقيقي إطلاقًا. وفي البيانات عالية الأبعاد حيث $P > N$ (علم الجينوم، معالجة النصوص، التنبؤ الكلي)، نحتاج إلى اختيار حقيقي للمتغيرات. ابتكر روبرت تيبشيراني (Tibshirani, 1996) انحدار لاسو (Lasso)، مستبدلاً جزاء $L_2$ بمعيار القيمة المطلقة $L_1$: $\lambda \sum |\beta_j|$.

يكمن سحر لاسو في هندسة متعدد الوجوه (Polyhedral Geometry): كرة $L_1$ هي معين ماسي ذو زوايا حادة تقع على محاور الإحداثيات. وعندما تتمدد دوائر كفاف دالة الخسارة الإهليلجية، فإنها تلامس بطبيعتها الزوايا الحادة أولاً، مما يصفر مجموع

:::python-challenge{id="py-elastic-net-coordinate-descent"}
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

def fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:
    """
    Solves L1 Lasso regression via cyclic coordinate descent and soft-thresholding.
    """
    # TODO: Iteratively compute partial residuals and apply soft-thresholding operator
    pass
```
:::
