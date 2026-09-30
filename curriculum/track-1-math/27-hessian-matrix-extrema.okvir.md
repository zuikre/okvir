---
id: "hessian-matrix-extrema"
version: "1.0.0"
title: "Gradient Descent, Learning Rates & Landscape Navigation"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["gradient-vector", "higher-order-derivatives-concavity"]
i18n:
  ar: "الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس"
---

# Gradient Descent, Learning Rates & Landscape Navigation

Imagine you are blindfolded on a foggy mountain slope in a thick mist. You cannot see the valley at the bottom. How can you navigate to the safety of the valley? 

You can feel the slant of the ground with your boots. If your boots tell you that the ground slopes steeply upward toward the north and east, you simply take a step in the exact opposite direction: toward the south and west! 
This is Gradient Descent. 
You take a step downhill, feel the new slope, take another step downhill, and repeat. But be careful about your step size (the learning rate $\eta$):
- If your steps are tiny

:::simulation-widget{engine="canvas2d" component="GradientDescentDynamicsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \eta_t \nabla f(\mathbf{x}_t), \quad t = 0, 1, 2, \dots
$$

خوارزمية الانحدار التدريجي هي العمود الفقري لتدريب كافة نماذج الذكاء الاصطناعي؛ إذ تُحاكي متسلقاً أعمى يهبط جبلاً غارقاً في الضباب عبر التحسس المستمر لدرجة ميل الأرض تحت قدميه والمشي في عكس اتجاه الصعود ($-\nabla f$). يُحدد "معدل التعلم" $\eta$ حجم الخطوة: فالخطوات المتناهية الصغر تؤدي لبطء شديد وتجمد، بينما الخطوات المفرطة تؤدي للقفز العنيف فوق الوادي وتشتت النموذج. وفي الأودية الضيقة ذات الانحناء غير المتناسق، تعاني الخوارزمية من تذبذبات متعرجة حادة.

:::python-challenge{id="py-hessian-matrix-extrema"}
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

def momentum_gradient_descent_step(x: np.ndarray, grad: np.ndarray, v: np.ndarray, lr: float, beta: float) -> tuple[np.ndarray, np.ndarray]:
    """
    Execute a single update step of classical Polyak momentum gradient descent.
    
    Parameters
    ----------
    x : np.ndarray
        Current parameters, shape (D,)
    grad : np.ndarray
        Gradient vector, shape (D,)
    v : np.ndarray
        Velocity vector, shape (D,)
    lr : float
        Learning rate
    beta : float
        Momentum factor
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        x_next: Updated parameters of shape (D,)
        v_next: Updated velocity buffer of shape (D,)
    """
    # TODO: Implement momentum velocity and coordinate update
    pass
```
:::
