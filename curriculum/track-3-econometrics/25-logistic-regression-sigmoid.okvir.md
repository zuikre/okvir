---
id: "logistic-regression-sigmoid"
version: "1.0.0"
title: "Logistic Regression, Maximum Likelihood & IRLS"
track: "econometrics"
module: "mod-30"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus", "gradient-vector"]
i18n:
  ar: "الانحدار اللوجستي ودالة الإمكان الأقصى وخوارزمية IRLS"
---

# Logistic Regression, Maximum Likelihood & IRLS

When the outcome variable is binary ($Y_i \in \{0, 1\}$), the Linear Probability Model (OLS on $Y$) fails: it predicts nonsensical probabilities outside $[0, 1]$ and exhibits inherent heteroskedasticity. Logistic regression solves this by modeling the log-odds (logit link function) of the positive class as a linear combination of features, squashing output through the standard sigmoid function $\sigma(z) = \frac{1}{1 + e^{-z}}$.

Because there is no closed-form analytical solution, parameters are estimated via Maximum Likelihood Estimation (MLE). The log-likelihood is strictly concave. Applyin

:::simulation-widget{engine="canvas2d" component="LogisticSigmoidSurface"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
p_i \equiv P(Y_i = 1 \mid \mathbf{x}_i) = \sigma(\mathbf{x}_i^T \boldsymbol{\beta}) = \frac{1}{1 + e^{-\mathbf{x}_i^T \boldsymbol{\beta}}}
$$

عندما يكون المتغير التابع ثنائيًا ($Y_i \in \{0, 1\}$)، يفشل نموذج الاحتمال الخطي التقليدي (OLS): فهو يولد احتمالات غير منطقية تتجاوز النطاق $[0, 1]$، ويعاني بطبيعته من عدم تجانس التباين. يعالج الانحدار اللوجستي ذلك بنمذجة لوغاريتم الأرجحية (Log-Odds) كتركيبة خطية، ضاغطًا النتيجة عبر الدالة السينية $\sigma(z) = \frac{1}{1 + e^{-z}}$.

ونظرًا لعدم وجود حل تحليلي مباشر، تُقدَّر المعلمات عبر دالة الإمكان الأقصى (MLE). دالة لوغاريتم الإمكان مقعرة تمامًا، وتكشف خوارزمية نيوتن-رافسون عن هيكل جبري بديع يُعرف بـ المربعات الصغرى المرجحة تكراريًا (IRLS): فكل خطوة تحديث هي في جوهرها انحدار مربعات صغر

:::python-challenge{id="py-logistic-regression-sigmoid"}
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

def irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:
    """
    Executes a single Newton-Raphson IRLS update step for binary logistic regression.
    """
    # TODO: Compute probabilities, diagonal weights W, working response z, and updated beta
    pass
```
:::
