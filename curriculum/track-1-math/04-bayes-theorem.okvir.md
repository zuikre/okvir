---
id: "bayes-theorem"
version: "1.0.0"
title: "Bayes' Theorem & Evidence Updating"
track: "math"
module: "module-03"
estimated_minutes: 7
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "مبرهنة بايز وتحديث الأدلة الاحتمالية"
---

# Bayes' Theorem & Evidence Updating

Bayesian reasoning models how prior probabilities are calibrated upon encountering real-world observations and diagnostic evidence.

:::simulation-widget{engine="canvas2d" component="BayesFrequencyTree"}
---
base_rate: 0.01
test_sensitivity: 0.95
false_positive_rate: 0.05
---
:::

Bayes' rule balances prior beliefs with observational likelihood divided by total marginal evidence:

$$
P(A | B) = \frac{P(B | A) \cdot P(A)}{P(B)}
$$

:::python-challenge{id="bayes-calc"}
---
timeout_ms: 3000
test_cases:
  - input: "prior=0.01, likelihood=0.95, evidence=0.05"
    expected: "0.19"
  - input: "prior=0.5, likelihood=1.0, evidence=0.5"
    expected: "1.0"
---
```python
def compute_posterior(prior: float, likelihood: float, evidence: float) -> float:
    # Bayes formula: posterior = (likelihood * prior) / evidence
    if evidence == 0:
        return 0.0
    return float((likelihood * prior) / evidence)
```
:::
