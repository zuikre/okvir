---
id: "cartesian-coordinate-metric"
version: "1.0.0"
title: "Cartesian Coordinate Systems & The Euclidean Metric"
track: "math"
module: "mod-01"
estimated_minutes: 15
prerequisites: []
i18n:
  ar: "نظام الإحداثيات الديكارتية والمقياس الإقليدي"
---

# Cartesian Coordinate Systems & The Euclidean Metric

Imagine an infinite, featureless desert. To communicate where an oasis lies, you must fix an arbitrary reference stone (the origin $\mathbf{0}$) and establish two perpendicular walking trails (the orthogonal axes $X$ and $Y$). Any location in the desert is now uniquely indexed by two signed numbers: how far east/west, and how far north/south. 

Once coordinates exist, distance between any two locations is not arbitrary; it is the straight-line physical path between them. When walking diagonally from point $\mathbf{p}$ to point $\mathbf{q}$, you trace the hypotenuse of a right-angled triangle w

:::simulation-widget{engine="canvas2d" component="CartesianMetricCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
d_2(\mathbf{p}, \mathbf{q}) \coloneqq \|\mathbf{p} - \mathbf{q}\|_2 = \sqrt{\sum_{i=1}^n (p_i - q_i)^2} = \sqrt{(\mathbf{p} - \mathbf{q})^T (\mathbf{p} - \mathbf{q})}
$$

يُنشئ نظام الإحداثيات الديكارتية جسراً بين الأرقام والهندسة، حيث يربط كل نقطة في الفضاء التآلفي المستوي $\mathbb{E}^n$ بمركبات رقمية في $\mathbb{R}^n$. المسافة الإقليدية هي المقياس الطبيعي الذي يقيس "طول الوتر" المستقيم الفاصل بين نقطتين عبر تعميم مبرهنة فيثاغورس على أي عدد من الأبعاد. تحقق هذه المسافة بديهيات المقياس الأساسية: اللامعقولية السالبة، التناظر، ومتباينة المثلث الحاكمة لأقصر مسار بين نقطتين.

:::python-challenge{id="py-cartesian-coordinate-metric"}
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

def euclidean_distance(p: np.ndarray, q: np.ndarray) -> np.ndarray:
    """
    Compute the Euclidean distance between points p and q along the last axis.
    
    Parameters
    ----------
    p : np.ndarray
        Coordinates of shape (..., D)
    q : np.ndarray
        Coordinates of shape (..., D), broadcastable with p
        
    Returns
    -------
    np.ndarray
        Euclidean distance array reduced along axis -1.
    """
    # TODO: Implement vectorized computation without loops
    pass
```
:::
