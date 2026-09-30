---
id: "heteroskedasticity-white-robust"
version: "1.0.0"
title: "Heteroskedasticity & The White HC0-HC3 Sandwich Estimator"
track: "econometrics"
module: "mod-19"
estimated_minutes: 15
prerequisites: ["gauss-markov-blue-theorem"]
i18n:
  ar: "عدم تجانس التباين ومقدر الساندويتش المتين لهوايت"
---

# Heteroskedasticity & The White HC0-HC3 Sandwich Estimator

In real-world data, the dispersion of the error term is rarely constant. Rich households have vastly greater variance in expenditure than poor households; large firms exhibit much higher profit variance than small startups. When heteroskedasticity $\mathbb{E}[\varepsilon_i^2 | X_i] = \sigma_i^2$ is present, the OLS point estimates $\hat{\boldsymbol{eta}}$ remain unbiased and consistent, but the textbook standard errors $\sigma^2 (\mathbf{X}^T \mathbf{X})^{-1}$ are completely invalid, typically leading to severely deflated confidence intervals and spuriously high $t$-statistics.

Halbert White

:::simulation-widget{engine="canvas2d" component="HeteroskedasticityRobustLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\boldsymbol{\Omega} \equiv \mathbb{E}[\boldsymbol{\varepsilon}\boldsymbol{\varepsilon}^T \mid \mathbf{X}] = \text{diag}(\sigma_1^2, \sigma_2^2, \dots, \sigma_N^2)
$$

في البيانات الواقعية، نادرًا ما يكون تشتت الأخطاء ثابتًا؛ فالأسر الثرية تظهر تباينًا واسعًا جدًا في الإنفاق مقارنة بالأسر الفقيرة، والشركات العملاقة يتباين دخلها بشكل أكبر بكثير من الشركات الناشئة. وعند وجود عدم تجانس التباين (Heteroskedasticity) $\mathbb{E}[\varepsilon_i^2 | X_i] = \sigma_i^2$، تظل تقديرات المعلمات $\hat{\boldsymbol{eta}}$ غير متحيّزة ومتسقة، لكن الأخطاء المعيارية التقليدية تفقد صلاحيتها، مما يؤدي إلى فترات ثقة ضيقة وقيم $t$ وهمية تضخم دلالة النتائج.

أحدث هالبرت هوايت (White, 1980) ثورة في الاقتصاد القياسي التجريبي بابتكار مقدر الساندويتش المتين (Robust Sandwich Estimator)

:::python-challenge{id="py-heteroskedasticity-white-robust"}
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

def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = "HC1") -> dict[str, np.ndarray]:
    """
    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.
    """
    # TODO: Implement the sandwich estimator
    pass
```
:::
