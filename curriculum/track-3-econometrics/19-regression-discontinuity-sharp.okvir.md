---
id: "regression-discontinuity-sharp"
version: "1.0.0"
title: "Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression"
track: "econometrics"
module: "mod-27"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding"]
i18n:
  ar: "تصميم الانقطاع في الانحدار الحاد والانحدار الخطي الموضعي"
---

# Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression

Regression Discontinuity Design (RDD), pioneered by Thistlethwaite and Campbell (1960), is widely regarded as having the highest internal validity among all quasi-experimental methods. In a Sharp RDD, treatment assignment is a deterministic step-function of a continuous 'running' variable $X$ crossing an arbitrary cutoff $c$ ($D_i = \mathbf{1}(X_i \ge c)$).

The identifying intuition is that agents just barely below the cutoff ($c - \epsilon$) and agents just barely above the cutoff ($c + \epsilon$) are virtually identical in all unobserved characteristics. Any discontinuous jump in the ou

:::simulation-widget{engine="canvas2d" component="SharpRDDCutoffLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
D_i = \begin{cases} 1 & \text{if } X_i \ge c \\ 0 & \text{if } X_i < c \end{cases}
$$

يُعتبر تصميم الانقطاع في الانحدار (Regression Discontinuity Design - RDD)، الذي ابتكره ثيسلثويت وكامبل (1960)، الأعلى موثوقية وصلاحية داخلية بين جميع أساليب التجارب شبه الطبيعية. في الانقطاع الحاد (Sharp RDD)، تكون المعالجة دالة محددة وحتمية لمتغير فرز مستمر $X$ يتجاوز حدًا فاصلًا $c$ ($D_i = \mathbf{1}(X_i \ge c)$).

تقوم الفكرة الجوهرية على أن الأفراد الواقعين مباشرة أسفل العتبة ($c - \epsilon$) وأولئك الواقعين مباشرة أعلاها ($c + \epsilon$) متشابهون تمامًا في كافة خصائصهم غير المرصودة. بالتالي، فإن أي قفزة غير متصلة (Discontinuous Jump) في النتيجة $Y$ عند العتبة تُعزى حصريًا إلى أثر الم

:::python-challenge{id="py-regression-discontinuity-sharp"}
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

def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict[str, float]:
    """
    Estimates Sharp RDD treatment effect using local linear triangular kernel regression.
    """
    # TODO: Center running variable, construct triangular weights, solve weighted least squares
    pass
```
:::
