---
id: "decision-trees"
version: "1.0.0"
title: "Decision Trees & Rectangular Laser Partitions"
track: "econometrics"
module: "module-04"
estimated_minutes: 7
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "أشجار القرار والتقسيمات المستطيلية المتعامدة"
---

# Decision Trees & Rectangular Laser Partitions

Decision trees partition the feature space using axis-aligned orthogonal cuts chosen via information-theoretic gain or Gini impurity reduction.

:::simulation-widget{engine="canvas2d" component="DecisionTreeLaser"}
---
max_depth: 3
show_laser_cuts: true
---
:::

The Gini impurity metric evaluates the probability of incorrect classification under random labeling:

$$
\text{Gini}(p) = 1 - \sum_{k=1}^K p_k^2
$$

:::python-challenge{id="gini-impurity"}
---
timeout_ms: 3000
test_cases:
  - input: "p = [0.5, 0.5]"
    expected: "0.5"
  - input: "p = [1.0, 0.0]"
    expected: "0.0"
---
```python
import numpy as np

def compute_gini(probabilities: np.ndarray) -> float:
    # Gini impurity: 1 - sum(p_k^2)
    return float(1.0 - np.sum(probabilities ** 2))
```
:::
