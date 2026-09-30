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

Moving from simple bivariate regression to multiple regression transforms econometrics from basic curve fitting into a multidimensional ceteris paribus machine. In real socioeconomic systems, isolated variables never move in a vacuum; education is correlated with ability, experience, geography, and family background.

Matrix calculus allows us to elegantly optimize across $K$ dimensions simultaneously. By expressing regressors in a design matrix $\mathbf{X}$, multiple regression isolates the marginal effect of one variable while holding all other included covariates constant. However, this alg

:::simulation-widget{engine="canvas2d" component="MultivariatePlaneVifLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
S(\boldsymbol{\beta}) = \mathbf{y}^T\mathbf{y} - 2\mathbf{y}^T \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\beta}^T (\mathbf{X}^T \mathbf{X}) \boldsymbol{\beta}
$$

إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد توفيق منحنيات إلى آلة جبارة لتطبيق مبدأ 'مع بقاء العوامل الأخرى على حالها' (Ceteris Paribus). في الظواهر الاقتصادية الواقعية، لا تتحرك المتغيرات بمعزل عن بعضها؛ فالتعليم يرتبط بالقدرة الفطرية والخبرة والموقع الجغرافي والبيئة الأسرية.

يتيح حسبان المصفوفات (Matrix Calculus) صياغة الاستمثال عبر أبعاد متعددة بسهولة تامة. من خلال مصفوفة التصميم $\mathbf{X}$، يقوم الانحدار المتعدد بعزل التأثير الحدي لمتغير معين مع تثبيت المتغيرات الأخرى، مشترطًا عدم وجود علاقة خطية تامة (Perfect Multicollinearity) بين الأعمدة.

:::python-challenge{id="py-multiple-regression-matrix-calculus"}
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

def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Computes the hat matrix P_X and residual annihilator matrix M_X.
    """
    # TODO: Calculate P and M
    pass
```
:::
