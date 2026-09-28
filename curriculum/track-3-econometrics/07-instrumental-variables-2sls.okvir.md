---
id: "instrumental-variables-2sls"
version: "1.0.0"
title: "Instrumental Variables & 2-Stage Least Squares (2SLS)"
track: "econometrics"
module: "module-01"
estimated_minutes: 8
prerequisites: ["ols-residual-geometry", "causal-inference-confounding"]
i18n:
  ar: "المتغيرات الصورية وطريقة المربعات الصغرى ذات المرحلتين (2SLS)"
---

# Instrumental Variables & 2-Stage Least Squares (2SLS)

When treatment $D$ is contaminated by unobserved confounders $U$, standard OLS fails. An instrumental variable $Z$ provides exogenous variation to recover the true causal effect.

:::simulation-widget{engine="canvas2d" component="InstrumentalVariablesLab"}
---
relevance: 0.85
confounding: 0.75
violate_exogeneity: false
---
:::

The classical Wald estimator and 2SLS system purge endogeneity via two successive projections:

$$
\beta_{\text{IV}} = \frac{\text{Cov}(Y, Z)}{\text{Cov}(D, Z)} = (\hat{D}^T \hat{D})^{-1} \hat{D}^T Y
$$

:::python-challenge{id="py-wald-estimator"}
---
timeout_ms: 3000
test_cases:
  - input: "cov_yz = 3.0, cov_dz = 2.0"
    expected: "1.5"
  - input: "cov_yz = 4.0, cov_dz = 1.0"
    expected: "4.0"
---
```python
def compute_wald_iv(cov_yz: float, cov_dz: float) -> float:
    # Wald estimator: ratio of instrument covariances
    if abs(cov_dz) < 1e-9:
        return 0.0
    return float(cov_yz / cov_dz)
```
:::
