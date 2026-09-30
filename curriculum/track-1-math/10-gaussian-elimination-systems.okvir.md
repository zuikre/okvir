---
id: "gaussian-elimination-systems"
version: "1.0.0"
title: "Gaussian Elimination, Row Operations & Linear Systems"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["matrix-multiplication-composition"]
i18n:
  ar: "الحذف الغاوسي، العمليات الصفية، ومنظومات المعادلات الخطية"
---

# Gaussian Elimination, Row Operations & Linear Systems

Imagine a crime investigation with three suspects, where you are given three tangled clues relating their heights, weights, and shoe sizes. If every clue mixes all three variables together, your mind gets overwhelmed. 

Gaussian elimination is a systematic method of untangling the clues without altering the truth. You are allowed to:
1. Swap the order of clues.
2. Multiply a clue by a non-zero number.
3. Add or subtract one clue from another.
By systematically using the first clue to cancel out the first suspect from all subsequent clues, you transform a tangled web of equations into an organi

:::simulation-widget{engine="canvas2d" component="LinearSystemSolverCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
[\mathbf{A} \mid \mathbf{b}] = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} & \mid & b_1 \\ a_{21} & a_{22} & \cdots & a_{2n} & \mid & b_2 \\ \vdots & \vdots & \ddots & \vdots & \mid & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} & \mid & b_m \end{bmatrix} \xrightarrow{\text{Row Operations}} \begin{bmatrix} p_1 & * & \cdots & * & \mid & \tilde{b}_1 \\ 0 & p_2 & \cdots & * & \mid & \tilde{b}_2 \\ \vdots & \vdots & \ddots & \vdots & \mid & \vdots \\ 0 & 0 & \cdots & p_r & \mid & \tilde{b}_r \end{bmatrix}
$$

الحذف الغاوسي هو خوارزمية منهجية لتحويل منظومة معادلات خطية متداخلة $\mathbf{A}\mathbf{x} = \mathbf{b}$ إلى شكل درجِي بسيط يسهل حله بالتعويض الخلفي. هندسياً، تُمثل كل معادلة مستوياً فائقاً في الفضاء، وحل المنظومة هو نقطة تقاطع تلك المستويات جميعاً. العمليات الصفية الأولية (التبديل، الضرب بمقياس، والإضافة) لا تغير نقطة التقاطع الهندسية أبداً، بل تُبسط المحاور الحسابية كاشفة عن الحل الصريح.

:::python-challenge{id="py-gaussian-elimination-systems"}
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

def solve_linear_system(A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, float]:
    """
    Solve linear system A x = b and compute residual norm ||b - A x||_2.
    
    Parameters
    ----------
    A : np.ndarray
        Invertible square matrix of shape (N, N)
    b : np.ndarray
        Target vector of shape (N,)
        
    Returns
    -------
    tuple[np.ndarray, float]
        x: Solution vector of shape (N,)
        residual: L2 norm of residual ||b - A x||_2
    """
    # TODO: Implement solve using np.linalg.solve and compute residual
    pass
```
:::
