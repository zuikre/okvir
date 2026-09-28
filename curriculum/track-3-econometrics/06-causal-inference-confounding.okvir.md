---
id: "causal-inference-confounding"
version: "1.0.0"
title: "Causal Inference & Confounding (Simpson's Paradox)"
track: "econometrics"
module: "module-06"
estimated_minutes: 8
prerequisites: ["ols-residual-geometry"]
i18n:
  ar: "الاستدلال السببي والخلط (مفارقة سيمبسون)"
---

# Causal Inference & Confounding (Simpson's Paradox)

In observational data, failing to control for a confounding variable can completely invert the sign of a regression coefficient. Watch what happens when you toggle between pooled regression and stratified subgroup regression:

:::simulation-widget{engine="canvas2d" component="SimpsonsParadoxLab"}
---
cohorts: 3
independent_var: "exercise_hours"
dependent_var: "cardiovascular_risk"
confounder: "age_group"
show_stratified: false
---
:::

The Omitted Variable Bias (OVB) theorem proves that when regressor $X$ correlates with omitted confounder $Z$, the naive estimator is systematically biased:

$$
\hat{\beta}_{\text{naive}} = \beta_{\text{true}} + \gamma \cdot \frac{\text{Cov}(X, Z)}{\text{Var}(X)}
$$

:::python-challenge{id="py-omitted-variable-bias"}
---
timeout_ms: 3000
test_cases:
  - input: "beta_true = 2.0, gamma = -3.0, cov_xz = 2.0, var_x = 4.0"
    expected: "0.5"
  - input: "beta_true = 1.0, gamma = 0.0, cov_xz = 5.0, var_x = 2.0"
    expected: "1.0"
---
```python
import numpy as np

def compute_naive_beta(beta_true: float, gamma: float, cov_xz: float, var_x: float) -> float:
    # Omitted Variable Bias: beta_true + gamma * (cov(x, z) / var(x))
    bias = gamma * (cov_xz / var_x)
    return float(beta_true + bias)
```
:::
