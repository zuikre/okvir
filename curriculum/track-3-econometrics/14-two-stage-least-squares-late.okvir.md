---
id: "two-stage-least-squares-late"
version: "1.0.0"
title: "Two-Stage Least Squares (2SLS), Weak Instruments & LATE"
track: "econometrics"
module: "mod-24"
estimated_minutes: 15
prerequisites: ["instrumental-variables-2sls"]
i18n:
  ar: "المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي"
---

# Two-Stage Least Squares (2SLS), Weak Instruments & LATE

When we have multiple instruments or multiple endogenous regressors alongside exogenous covariates, Two-Stage Least Squares (2SLS) generalises the Wald estimator into an optimal projection matrix framework. In stage one, we project endogenous $X$ onto all instruments $Z$ to isolate the exogenous variation $\hat{X}$. In stage two, we regress $Y$ on $\hat{X}$.

Two critical breakthroughs define modern IV practice: 1. Weak Instruments: If the first-stage correlation is low, 2SLS is severely biased towards OLS and standard Wald tests fail. The modern benchmark requires a first-stage $F$-statis

:::simulation-widget{engine="canvas2d" component="TwoStageLeastSquaresLateLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X} = \mathbf{Z}(\mathbf{Z}^T \mathbf{Z})^{-1} \mathbf{Z}^T \mathbf{X}
$$

عندما يتوفر لدينا أدوات متعددة أو متغيرات داخلية متعددة إلى جانب ضوابط تحكم خارجية، يعمم مقدر المربعات الصغرى ذات المرحلتين (2SLS) صيغة فالد في إطار مصفوفات الإسقاط الأمثل. في المرحلة الأولى، نسقط المتغير الداخلي $X$ على الأدوات $Z$ لعزل الجزء الخارجي $\hat{X}$. وفي المرحلة الثانية، نجري انحدار $Y$ على القيمة المتوقعة $\hat{X}$.

يحدد ممارسات IV الحديثة ركيزتان أساسيتان:
1. الأدوات الضعيفة (Weak Instruments): إذا كان ارتباط المرحلة الأولى ضعيفًا، ينحاز 2SLS بقوة نحو OLS وتفقد اختبارات الدلالة صلاحيتها؛ لذا يُشترط إحصاء $F$ للمرحلة الأولى يتجاوز 10 (قاعدة Staiger & Stock) أو يتجاوز 100 وفق

:::python-challenge{id="py-two-stage-least-squares-late"}
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

def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:
    """
    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.
    """
    # TODO: Stage 1 projection, Stage 2 regression, structural error variance
    pass
```
:::
