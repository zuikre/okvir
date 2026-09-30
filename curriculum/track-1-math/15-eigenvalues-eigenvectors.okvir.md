---
id: "eigenvalues-eigenvectors"
version: "1.0.0"
title: "Singular Value Decomposition (SVD) & Spectral Geometry"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["least-squares-approximation", "determinant-scaling-factor"]
i18n:
  ar: "تفكيك القيم المفردة (SVD) والهندسة الطيفية"
---

# Singular Value Decomposition (SVD) & Spectral Geometry

The Spectral Theorem is wonderful, but it has a massive limitation: it only works on square, symmetric matrices. What if you have a rectangular matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$ representing a data table with 1,000 users and 50 movies? 

The Singular Value Decomposition (SVD) is the absolute superpower of linear algebra because it works on every single matrix that can ever exist, square or rectangular, full-rank or singular! 
Geometrically, imagine taking a unit sphere in your input space. When any linear transformation acts on it, it deforms that sphere into a hyper-elli

:::simulation-widget{engine="canvas2d" component="SVDImageCompressorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A} \in \mathbb{R}^{m \times n}, \quad \mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T
$$

تفكيك القيم المفردة (SVD) هو قمة الجبر الخطي وأقوى أداة في علم البيانات؛ إذ يفكك أي مصفوفة مستطيلة أو مربعة دون استثناء إلى ثلاثة أطوار هندسية متتالية: دوران في فضاء المدخلات ($\mathbf{V}^T$)، يليه شد وتمديد إحداثي بقيم موجبة مرتبة تنازلياً تُدعى "القيم المفردة" ($\mathbf{\Sigma}$)، يليه دوران في فضاء المخرجات ($\mathbf{U}$). تُثبت مبرهنة إيكارت-يونغ أن أخذ أول $k$ حداً من هذا التفكيك يمنحنا أفضل تمثيل مضغوط للمصفوفة بأقل قدر ممكن من فقدان البيانات.

:::python-challenge{id="py-eigenvalues-eigenvectors"}
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

def svd_low_rank_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:
    """
    Compute Eckart-Young optimal rank-k approximation and retained energy.
    
    Parameters
    ----------
    A : np.ndarray
        Matrix of shape (M, N)
    k : int
        Truncation rank
        
    Returns
    -------
    tuple[np.ndarray, float]
        A_k: Rank-k approximation of shape (M, N)
        energy: Sum of top k singular values squared / Total sum squared
    """
    # TODO: Implement SVD rank-k reconstruction and variance fraction
    pass
```
:::
