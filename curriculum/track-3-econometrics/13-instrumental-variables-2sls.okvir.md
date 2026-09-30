---
id: "instrumental-variables-2sls"
version: "1.0.0"
title: "Instrumental Variables (IV) Identification & The Wald Estimator"
track: "econometrics"
module: "mod-24"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding", "frisch-waugh-lovell-theorem"]
i18n:
  ar: "التعريف بالمتغيرات الاداتية ومقدر فالد"
---

# Instrumental Variables (IV) Identification & The Wald Estimator

When an endogenous treatment $D$ is correlated with the error term $\varepsilon$ due to unobserved confounding, simultaneity, or measurement error, OLS fails. The method of Instrumental Variables (IV) provides an ingenious solution: find an external variable $Z$ (the instrument) that acts as an exogenous shock to $D$.

For an instrument to identify the causal effect, it must satisfy two core conditions: 1. Relevance: $Z$ must have a strong statistical association with the treatment $D$ ($\text{Cov}(Z, D) \ne 0$). 2. Exclusion Restriction: $Z$ must affect the outcome $Y$ ONLY through it

:::simulation-widget{engine="canvas2d" component="InstrumentalVariablesLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
y_i = \beta_0 + \beta_1 D_i + \varepsilon_i, \quad \text{Cov}(D_i, \varepsilon_i) \ne 0
$$

عندما يكون متغير المعالجة $D$ داخليًا (Endogenous) ومرتبطًا بحد الخطأ $\varepsilon$ بسبب متغيرات مربكة غير مرصودة، أو تبادل التأثير، أو أخطاء القياس، يسقط OLS في التحيز. تقدم طريقة المتغيرات الاداتية (Instrumental Variables - IV) حلاً عبقريًا: البحث عن متغير خارجي $Z$ (الأداة) يعمل كصدمة عشوائية خارجية تحرك $D$.

لكي تنجح الأداة في التعريف السببي، يجب أن تستوفي شرطين جوهريين:
1. الملاءمة (Relevance): أن ترتبط الأداة $Z$ بقوة مع المعالجة $D$ (أي $\text{Cov}(Z, D) \ne 0$).
2. قيد الاستبعاد (Exclusion Restriction): ألا تؤثر الأداة $Z$ على النتيجة $Y$ إلا من خلال قناة المعالجة $D$ فقط، دون

:::python-challenge{id="py-instrumental-variables-2sls"}
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

def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:
    """
    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.
    """
    # TODO: Compute reduced form, first stage compliance, and covariance ratio
    pass
```
:::
