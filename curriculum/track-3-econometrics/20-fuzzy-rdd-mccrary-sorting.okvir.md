---
id: "fuzzy-rdd-mccrary-sorting"
version: "1.0.0"
title: "Fuzzy RDD & McCrary Density Sorting Diagnostic"
track: "econometrics"
module: "mod-27"
estimated_minutes: 15
prerequisites: ["regression-discontinuity-sharp"]
i18n:
  ar: "الانقطاع في الانحدار الضبابي وفحص ماكراري لتلاعب الكثافة"
---

# Fuzzy RDD & McCrary Density Sorting Diagnostic

In many real-world applications, crossing a threshold does not guarantee treatment; it merely changes the PROBABILITY of treatment (e.g. eligibility rules, financial aid offers). This is Fuzzy RDD. Remarkably, Fuzzy RDD is mathematically identical to a Local Instrumental Variable / Wald ratio, where crossing the threshold $T_i = \mathbf{1}(X_i \ge c)$ serves as an instrument for actual treatment receipt $D_i$.

However, the entire credibility of RDD collapses if individuals can self-select or manipulate their score to sneak past the cutoff. Justin McCrary (2008) developed the foundational

:::simulation-widget{engine="canvas2d" component="FuzzyRDDBandwidthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
P(D_i = 1 \mid X_i = x) = \begin{cases} g_1(x) & \text{if } x \ge c \\ g_0(x) & \text{if } x < c \end{cases} \quad \text{where } \lim_{x \downarrow c} g_1(x) \ne \lim_{x \uparrow c} g_0(x)
$$

في العديد من التطبيقات الواقعية، لا يضمن تجاوز العتبة تلقي المعالجة بشكل حتمي، بل يغير احتمالية تلقيها فقط (مثل شروط الأهلية أو عروض المنح الدراسية). يُعرف هذا بـ الانقطاع الضبابي (Fuzzy RDD). من الناحية الرياضية، يتطابق الانقطاع الضبابي تمامًا مع مقدر المتغيرات الاداتية الموضعي (Local IV / Wald Ratio)، حيث يعمل تجاوز العتبة $T_i = \mathbf{1}(X_i \ge c)$ كأداة للمتغير الفعلي $D_i$.

ومع ذلك، تنهار مصداقية RDD بالكامل إذا تمكن الأفراد من التلاعب بدرجاتهم للقفز فوق العتبة الفاصلة. ابتكر جاستن ماكراري (McCrary, 2008) الفحص التشخيصي الأشهر: اختبار وجود قفزة مفاجئة في دالة كثافة المتغير الف

:::python-challenge{id="py-fuzzy-rdd-mccrary-sorting"}
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

def compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict[str, float]:
    """
    Computes boundary bin densities and log density jump for the McCrary Sorting Test.
    """
    # TODO: Calculate normalized frequency in cutoff boundary bins and log-ratio theta
    pass
```
:::
