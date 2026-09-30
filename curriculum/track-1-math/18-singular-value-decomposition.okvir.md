---
id: "singular-value-decomposition"
version: "1.0.0"
title: "The Chain Rule as Compositional Scaling & Flow of Sensitivities"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["symmetric-matrices-spectral", "gram-schmidt-orthogonalization"]
i18n:
  ar: "قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية"
---

# The Chain Rule as Compositional Scaling & Flow of Sensitivities

Imagine three interconnected gears in a clockwork mechanism: Gear $A$ turns Gear $B$, which in turn drives Gear $C$. 
- When you turn Gear $A$ by 1 revolution, Gear $B$ turns by 3 revolutions. (Sensitivity of $B$ to $A$ is $3$).
- When Gear $B$ turns by 1 revolution, Gear $C$ turns by 5 revolutions. (Sensitivity of $C$ to $B$ is $5$).

Now, if you turn Gear $A$ by 1 revolution, how many revolutions does Gear $C$ complete? Obviously: $3 \times 5 = 15$ revolutions! You simply multiply the gear ratios. 

The Chain Rule is nothing more than this gear-ratio multiplication applied to mathema

:::simulation-widget{engine="canvas2d" component="CurvatureOsculatingCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
(f \circ g)'(x) = f'(g(x)) \cdot g'(x) \iff \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}
$$

قاعدة السلسلة هي قانون التروس الرياضي الحاكم لدوال التركيب المتسلسلة $f(g(x))$. تنص القاعدة على أن الحساسية الكلية للمخرج بالنسبة للمدخل هي حاصل ضرب الحساسيات الوسيطة عبر المسار. إذا كانت الدالة الداخلية تتغير بمعدل معين، والدالة الخارجية تتأثر بمخرجاتها بمعدل آخر، فإن الأثر الإجمالي ينتقل بضرب المعدلات معاً. هذه العملية هي الأساس الحسابي الدقيق لخوارزمية "الانتشار الخلفي للخطأ" (Backpropagation) في الشبكات العصبية العميقة.

:::python-challenge{id="py-singular-value-decomposition"}
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

def composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute forward activation and exact backward chain rule derivative.
    
    Parameters
    ----------
    x : np.ndarray
        Input batch of shape (N,)
    w, u, b1, b2 : float
        Scalar weight and bias parameters
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        y: Sigmoid output activation of shape (N,)
        dy_dx: Exact analytical derivative dy/dx of shape (N,)
    """
    # TODO: Implement forward pass and chain rule backprop
    pass
```
:::
