---
id: "ols-residual-geometry"
version: "1.0.0"
title: "Bivariate OLS & The Geometry of Orthogonal Residuals"
track: "econometrics"
module: "mod-18"
estimated_minutes: 15
prerequisites: ["least-squares-approximation", "numpy-vectorization"]
i18n:
  ar: "الانحدار الخطي البسيط وهندسة البواقي المتعامدة"
---

# Bivariate OLS & The Geometry of Orthogonal Residuals

Ordinary Least Squares (OLS) is frequently introduced as an optimization problem where one calculates the line that minimizes vertical squared distances. However, the deepest, most foundational insight of econometrics is geometric: OLS is an orthogonal projection of the observed outcome vector $\mathbf{y} \in \mathbb{R}^N$ onto the linear subspace spanned by the regressors, $\text{col}(\mathbf{X})$.

When we collect data on $N$ economic agents, the outcome $\mathbf{y}$ is a single point in an $N$-dimensional sample space. The regressor matrix $\mathbf{X} \in \mathbb{R}^{N \times K}$ defines a

:::simulation-widget{engine="canvas2d" component="LinearRegressionResiduals"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}
$$

يُقدَّم الانحدار الخطي العادي (OLS) غالبًا كمسألة استمثال حسابية لحساب خط يقلل مجموع مربعات المسافات الرأسية. لكن الرؤية الأكثر عمقًا وأصالة في القياس الاقتصادي هي الرؤية الهندسية: OLS هو في حقيقته إسقاط متعامد (Orthogonal Projection) لمتجه المشاهدات $\mathbf{y} \in \mathbb{R}^N$ على الفضاء الفرعي الخطي الذي تولده المتغيرات المستقلة $\text{col}(\mathbf{X})$.

في فضاء العينة ذي الأبعاد الـ $N$، يمثل المتجه $\mathbf{y}$ نقطة في $\mathbb{R}^N$، بينما تشكل مصفوفة البيانات $\mathbf{X}$ فضاءً فرعيًا ذا بعد $K$ (حيث $N \gg K$). ونظرًا لأن $\mathbf{y}$ لا يقع عمومًا داخل هذا الفضاء، فإن أفضل تقريب خطي

:::python-challenge{id="py-ols-residual-geometry"}
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

def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:
    """
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
    """
    # TODO: Solve (X^T X) beta = X^T y without explicit matrix inversion
    pass
```
:::
