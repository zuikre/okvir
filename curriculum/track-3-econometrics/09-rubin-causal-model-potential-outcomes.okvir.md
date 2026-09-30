---
id: "rubin-causal-model-potential-outcomes"
version: "1.0.0"
title: "The Rubin Causal Model & The Fundamental Problem of Causal Inference"
track: "econometrics"
module: "mod-22"
estimated_minutes: 15
prerequisites: ["bayes-theorem"]
i18n:
  ar: "نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي"
---

# The Rubin Causal Model & The Fundamental Problem of Causal Inference

Before Donald Rubin formalized the Potential Outcomes framework (Neyman-Rubin Causal Model), causality in statistics was shrouded in ambiguous verbal arguments. Rubin defined causality at the individual level: for every economic unit $i$, there exist two potential states of the world: $Y_i(1)$, the outcome if treated, and $Y_i(0)$, the outcome if untreated.

The causal effect for individual $i$ is defined as $\tau_i = Y_i(1) - Y_i(0)$. Here lies The Fundamental Problem of Causal Inference: in any real-world dataset, we can observe at most ONE of these two potential outcomes for any given i

:::simulation-widget{engine="canvas2d" component="PotentialOutcomesSplitLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0) = Y_i(0) + D_i [Y_i(1) - Y_i(0)]
$$

قبل صياغة دونالد روبين لإطار النتائج المحتملة (Neyman-Rubin Causal Model)، كانت مفاهيم السببية في الإحصاء غامضة وتقتصر على نقاشات لغوية غير منضبطة. عرّف روبين السببية على مستوى الوحدة الفردية: لكل وحدة اقتصادية $i$، توجد حالتان محتملتان في هذا العالم: $Y_i(1)$ وهي النتيجة في حال تلقي المعالجة، و $Y_i(0)$ وهي النتيجة في حال عدم تلقيها.

يُعرَّف الأثر السببي للفرد $i$ بأنه: $\tau_i = Y_i(1) - Y_i(0)$. وهنا تبرز المشكلة الجوهرية للاستدلال السببي (The Fundamental Problem of Causal Inference): في أي بيانات واقعية، يستحيل رصد كلتا النتيجتين للشخص ذاته في نفس اللحظة؛ فالمسار البديل المقابل للواقع

:::python-challenge{id="py-rubin-causal-model-potential-outcomes"}
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

def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:
    """
    Decomposes the naive difference in means into ATT and Baseline Selection Bias.
    """
    # TODO: Realize observed outcome y = d * y1 + (1 - d) * y0 and compute metrics
    pass
```
:::
