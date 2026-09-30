---
id: "omitted-variable-bias-formula"
version: "1.0.0"
title: "The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix"
track: "econometrics"
module: "mod-21"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus"]
i18n:
  ar: "صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز"
---

# The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix

Omitted Variable Bias (OVB) is the central villain in applied econometrics. When an empirical researcher estimates a 'short' regression of outcome $Y$ on treatment $X_1$, omitting a relevant confounding variable $X_2$ that correlates with both $X_1$ and $Y$ contaminates the estimated coefficient, causing it to conflate the true causal effect with the omitted confounder's influence.

The OVB formula is remarkable because it decomposes the bias into an exact product:

:::simulation-widget{engine="canvas2d" component="OmittedVariableBiasCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Bias} = (\text{Impact of omitted variable on } Y) \times (\text{Relationship between omitted variable and } X_1)
$$

يُعد انحياز المتغير المغفَل (Omitted Variable Bias - OVB) العدو الأول في أبحاث الاقتصاد القياسي التطبيقي. عندما يقوم الباحث بتقدير نموذج انحدار 'قصير' لمتغير النتيجة $Y$ على المعالجة $X_1$ مهملاً متغيرًا مفسِّرًا أصيلاً $X_2$ يرتبط بكل من $X_1$ و $Y$، فإن مقدر OLS يمتص أثر المتغير الغائب، مما يخلط الأثر السببي الحقيقي بأثر المتغير المربك.

تكتسب صيغة OVB أهمية بالغة لأنها تفكك الانحياز بدقة رياضية مذهلة إلى حاصل ضرب أمرين: (أثر المتغير المغفل على النتيجة) $\times$ (علاقة المتغير المغفل بالمعالجة). يمكّن هذا التفكيك الباحثين من تحديد اتجاه الانحياز (موجب أم سالب) بالاستناد إلى النظرية الاقتصادي

:::python-challenge{id="py-omitted-variable-bias-formula"}
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

def compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:
    """
    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.
    """
    # TODO: Implement OVB decomposition
    pass
```
:::
