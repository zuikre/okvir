---
id: "random-effects-hausman-test"
version: "1.0.0"
title: "Random Effects, First-Differencing, and the Hausman Test"
track: "econometrics"
module: "mod-25"
estimated_minutes: 15
prerequisites: ["panel-data-fixed-effects"]
i18n:
  ar: "الآثار العشوائية والفروق الأولى واختبار هاوسمان"
---

# Random Effects, First-Differencing, and the Hausman Test

While Fixed Effects treats $\alpha_i$ as an arbitrary nuisance parameter allowed to correlate with $\mathbf{X}$, the Random Effects (RE) model assumes that $\alpha_i$ is completely uncorrelated with the regressors. If this exogeneity assumption holds, RE is vastly more efficient than FE because it exploits both between-entity and within-entity variation via Generalized Least Squares (GLS) partial de-meaning.

How do empirical researchers choose between FE and RE? The Hausman Specification Test compares the two estimators. Under the null hypothesis of exogeneity, both FE and RE are cons

:::simulation-widget{engine="canvas2d" component="RandomEffectsHausmanLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\boldsymbol{\Sigma}_i = \mathbb{E}[\mathbf{v}_i \mathbf{v}_i^T] = \sigma_{\varepsilon}^2 \mathbf{I}_T + \sigma_{\alpha}^2 \boldsymbol{\iota}_T \boldsymbol{\iota}_T^T
$$

بينما يتعامل نموذج الآثار الثابتة مع $\alpha_i$ كمعلمة عشوائية يُسمح بارتباطها بالمتغيرات المفسرة $\mathbf{X}$، يفترض نموذج الآثار العشوائية (Random Effects - RE) أن $\alpha_i$ مستقل تمامًا عن المتغيرات المستقلة. وفي حال تحقق هذا الفرض، يكون مقدر RE أكثر كفاءة إحصائية بكثير من FE لأنه يستغل التباين بين الوحدات وداخلها معًا عبر المربعات الصغرى المعممة (GLS) مع تحويل جزئي للمتوسطات.

كيف يحسم الباحث المفاضلة بين FE و RE؟ يقدم اختبار هاوسمان (Hausman Test) الفيصل الرياضي: في ظل فرضية العدم (الاستقلال التام)، كلا المقدرين متسقان ولكن RE هو الأكثر كفاءة. وفي ظل الفرضية البديلة، يظل FE متسقً

:::python-challenge{id="py-random-effects-hausman-test"}
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

def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:
    """
    Computes the Hausman quadratic test statistic comparing FE and RE estimates.
    """
    # TODO: Calculate parameter difference and inverted variance difference
    pass
```
:::
