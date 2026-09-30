---
id: "bad-controls-mediators-overcontrolling"
version: "1.0.0"
title: "Bad Controls, Mediators, and Overcontrolling"
track: "econometrics"
module: "mod-21"
estimated_minutes: 15
prerequisites: ["omitted-variable-bias-formula"]
i18n:
  ar: "ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم"
---

# Bad Controls, Mediators, and Overcontrolling

In applied empirical work, researchers often fall into the trap of 'kitchen sink' regressions: controlling for every conceivable variable in the dataset under the false assumption that more controls always reduce bias. Angrist and Pischke famously coined the term Bad Controls to describe variables that should never be controlled for.

Bad controls typically fall into two categories: 1. Mediators: Variables on the causal pathway from treatment $D$ to outcome $Y$ ($D \to M \to Y$). Controlling for $M$ blocks the mechanism and eliminates the total causal effect. 2. Post-Treatment Outcom

:::simulation-widget{engine="canvas2d" component="SimpsonsParadoxLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
M_i = \gamma_0 + \gamma_1 D_i + u_i
$$

يقع العديد من الباحثين في فخ يُعرف بـ 'انحدار حوض المطبخ' (Kitchen Sink Regression)، حيث يقومون بإقحام كل متغير متاح في النموذج ظنًا منهم أن زيادة ضوابط التحكم تقلل التحيز دائمًا. صاغ أنغريست وبيشكي (Angrist & Pischke) مصطلح الضوابط السيئة (Bad Controls) لوصف المتغيرات التي يُحظر التحكم فيها.

تنقسم الضوابط السيئة في الغالب إلى فئتين رئيسيتين:
1. المتغيرات الوسيطة (Mediators): وهي المتغيرات الواقعة على المسار السببي بين المعالجة والنتيجة ($D \to M \to Y$)؛ إذ يؤدي التحكم فيها إلى خنق المسار وإلغاء الأثر السببي الإجمالي.
2. المتغيرات اللاحقة للمعالجة: وهي متغيرات تتأثر بالمعالجة نفس

:::python-challenge{id="py-bad-controls-mediators-overcontrolling"}
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

def compute_vif(X: np.ndarray) -> np.ndarray:
    """
    Computes the Variance Inflation Factor (VIF) for each column in X.
    """
    # TODO: Run auxiliary regressions and calculate 1 / (1 - R_j^2)
    pass
```
:::
