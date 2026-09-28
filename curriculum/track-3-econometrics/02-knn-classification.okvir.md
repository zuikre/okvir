---
id: "knn-classification"
version: "1.0.0"
title: "K-Nearest Neighbors & Non-Parametric Geometry"
track: "econometrics"
module: "module-02"
estimated_minutes: 6
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "أقرب الجيران K والهندسة اللامعلمية"
---

# K-Nearest Neighbors & Non-Parametric Geometry

K-Nearest Neighbors (KNN) does not learn explicit parameters; instead, it memorizes the geometric metric space and votes based on localized proximity.

:::simulation-widget{engine="canvas2d" component="KNNRadar"}
---
k: 3
metric: "euclidean"
show_radar_rings: true
---
:::

The conditional class probability is estimated as the empirical majority vote within the sphere of radius \\( d_k \\):

$$
P(Y = c | X = x) = \frac{1}{k} \sum_{i \in N_k(x)} I(y_i = c)
$$

:::python-challenge{id="knn-impl"}
---
timeout_ms: 3000
test_cases:
  - input: "votes = [1, 1, 0]"
    expected: "1"
  - input: "votes = [0, 0, 1]"
    expected: "0"
---
```python
import numpy as np

def majority_vote(votes: np.ndarray) -> int:
    # Compute majority class from k neighbor labels
    counts = np.bincount(votes)
    return int(np.argmax(counts))
```
:::
