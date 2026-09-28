---
id: "kmeans-clustering"
version: "1.0.0"
title: "K-Means: Lloyd's Algorithm & Voronoi Partitions"
track: "econometrics"
module: "module-03"
estimated_minutes: 7
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "K-Means: خوارزمية لويد وتجزيء فورونوي"
---

# K-Means: Lloyd's Algorithm & Voronoi Partitions

K-Means alternates between assigning observations to their nearest centroid and re-centering each centroid to the center-of-mass of its assigned Voronoi cell.

:::simulation-widget{engine="canvas2d" component="KMeansVoronoi"}
---
k: 3
show_voronoi_cells: true
---
:::

The objective minimizes total within-cluster inertia \\( J \\):

$$
J = \sum_{k=1}^K \sum_{x_i \in C_k} \|x_i - \mu_k\|^2
$$

:::python-challenge{id="kmeans-step"}
---
timeout_ms: 3000
test_cases:
  - input: "points = [[1, 2], [3, 4]]"
    expected: "centroid = [2.0, 3.0]"
---
```python
import numpy as np

def compute_centroid(points: np.ndarray) -> np.ndarray:
    # Compute center of mass for assigned points
    return np.mean(points, axis=0)
```
:::
