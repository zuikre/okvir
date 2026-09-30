---
id: "orthogonal-projections"
version: "1.0.0"
title: "Orthogonal Projections & Least Squares Approximation"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "الإسقاطات المتعامدة وتقريب المربعات الصغرى"
---

# Orthogonal Projections & Least Squares Approximation

You are trying to solve $\mathbf{A}\mathbf{x} = \mathbf{b}$, but you have more equations than unknowns (e.g., 1,000 data points collected from a lab experiment, but only a 2-parameter straight line $y = mx + c$ to fit them). Your target vector $\mathbf{b}$ does not live inside the reachable column space $\mathcal{C}(\mathbf{A})$. There is NO exact solution. 

What is the most honest, optimal compromise? Drop an orthogonal perpendicular plumb-line from $\mathbf{b}$ straight down onto the plane $\mathcal{C}(\mathbf{A})$. The point on the plane where the plumb-line lands is $\mathbf{p} = \mathbf{

:::simulation-widget{engine="canvas2d" component="GramSchmidtOrthogonalCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\hat{\mathbf{x}} = \arg\min_{\mathbf{x} \in \mathbb{R}^n} \|\mathbf{b} - \mathbf{A}\mathbf{x}\|_2^2 \implies \mathbf{A}^T (\mathbf{b} - \mathbf{A}\hat{\mathbf{x}}) = \mathbf{0}
$$

عندما تكون منظومة المعادلات الخطية فوق المُحددة مستحيلة الحل بسبب وجود ضوضاء تجريبية تجعل الهدف $\mathbf{b}$ خارج فضاء الأعمدة، فإننا نلجأ إلى حل المربعات الصغرى. هندسياً، نسقط المتجه $\mathbf{b}$ عمودياً على فضاء الأعمدة للحصول على أفضل تقريب ممكن $\mathbf{p}$. يكون متجه الخطأ $\mathbf{e} = \mathbf{b} - \mathbf{p}$ متعامداً بالكامل مع فضاء الأعمدة، مما يولد المعادلات الطبيعية الشهيرة $\mathbf{A}^T \mathbf{A} \hat{\mathbf{x}} = \mathbf{A}^T \mathbf{b}$.

:::python-challenge{id="py-orthogonal-projections"}
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

def subspace_projection_matrix(A: np.ndarray) -> np.ndarray:
    """
    Construct the orthogonal projection matrix onto col(A).
    
    Parameters
    ----------
    A : np.ndarray
        Matrix of shape (M, K) with linearly independent columns
        
    Returns
    -------
    np.ndarray
        Orthogonal projection matrix P of shape (M, M)
    """
    # TODO: Implement orthogonal projector via QR or Normal Equations
    pass
```
:::
