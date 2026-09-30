---
id: "bayes-theorem"
version: "1.0.0"
title: "Constrained Optimization & Lagrange Multipliers"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric"]
i18n:
  ar: "التحسين المقيد ومضروبات لاغرانج"
---

# Constrained Optimization & Lagrange Multipliers

Suppose you want to hike to the highest possible elevation on a mountain ($f(x, y)$), but you are forbidden from wandering off a paved hiking trail ($g(x, y) = c$). You cannot simply walk to the mountain summit because the trail does not pass through the summit. Where along the trail will your elevation be highest? 

Think about walking along the trail: as long as the trail crosses contour lines at an angle, you are actively gaining or losing height. The only point where your elevation stops changing along the trail is when the trail runs perfectly parallel to a contour line! 
At that ex

:::simulation-widget{engine="canvas2d" component="LagrangeMultiplierCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\min_{\mathbf{x} \in \mathbb{R}^n} f(\mathbf{x}) \quad \text{subject to} \quad g_i(\mathbf{x}) = 0, \quad i = 1, \dots, m \quad (m < n)
$$

تحل طريقة مضروبات لاغرانج معضلة تحسين الدوال الخاضعة لقيود إجبارية؛ كأن تبحث عن أعلى نقطة في جبل مع الالتزام الصارم بالسير على مسار سياحي محدد $g(x,y)=0$. هندسياً، لا يمكن بلوغ القمة المقيدة إلا عند النقطة التي يمس فيها مسار القيد خطوط كنتور الدالة المستهدفة؛ إذ يعني عدم التماس استمرار إمكانية الصعود على المسار. هذا التماس الهندسي يتكافأ مع توازي متجهات التدرج: $\nabla f = \lambda \nabla g$. ويُعبر المضروب $\lambda$ عن الحساسية الهامشية أو "السعر الخفي" لتعديل القيد.

:::python-challenge{id="py-bayes-theorem"}
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

def solve_constrained_quadratic_kkt(Q: np.ndarray, c: np.ndarray, A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Solve equality-constrained quadratic program via the block KKT matrix system.
    
    Parameters
    ----------
    Q : np.ndarray
        Hessian matrix of shape (N, N)
    c : np.ndarray
        Linear cost vector of shape (N,)
    A : np.ndarray
        Constraint matrix of shape (M, N)
    b : np.ndarray
        Constraint bounds of shape (M,)
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        x_star: Optimal primal solution of shape (N,)
        lambda_star: Optimal dual multipliers of shape (M,)
    """
    # TODO: Construct block KKT matrix and solve linear system
    pass
```
:::
