---
id: "linear-combinations-span"
version: "1.0.0"
title: "Linear Combinations, Span & Linear Independence"
track: "math"
module: "mod-02"
estimated_minutes: 15
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "التراكيب الخطية، فضاء التوليد، والاستقلال الخطي"
---

# Linear Combinations, Span & Linear Independence

Imagine you have two motorized joysticks on a flat table: Joystick 1 moves your robotic rover 1 meter forward and 1 meter right. Joystick 2 moves your rover 1 meter forward and 1 meter left. By pushing Joystick 1 by some amount $c_1$ and Joystick 2 by some amount $c_2$, can you steer the rover to any point on the entire table? 

Yes, because the two directions are not redundant. The set of all locations you can reach is the "span" of the two motions. But if Joystick 2 had instead moved 2 meters forward and 2 meters right, it would merely duplicate Joystick 1's trajectory—you would be trapped

:::simulation-widget{engine="canvas2d" component="VectorSpanBasisCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{w} = \sum_{j=1}^k c_j \mathbf{v}_j = \mathbf{V} \mathbf{c}, \quad \text{Span}(\{\mathbf{v}_1, \dots, \mathbf{v}_k\}) \coloneqq \left\{ \sum_{j=1}^k c_j \mathbf{v}_j \;\middle|\; c_j \in \mathbb{R} \right\}
$$

التركيب الخطي هو عملية وزن المتجهات بمقاييس عددية ثم جمعها معاً. فضاء التوليد (Span) هو كامل الفضاء الجزئي المتشكل من كل النقاط الممكن الوصول إليها عبر تلك التراكيب. تكون المتجهات "مستقلة خطياً" إذا لم يكن أحدها مكرراً أو ناتجاً عن دمج الآخرين؛ أي أن الوصول إلى نقطة الصفر لا يتحقق إلا بتصفير جميع المعاملات العددية.

:::python-challenge{id="py-linear-combinations-span"}
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

def batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:
    """
    Compute batch linear combinations of basis vectors.
    
    Parameters
    ----------
    basis_vectors : np.ndarray
        Array of shape (K, D) where row k is vector v_k
    coefficients : np.ndarray
        Array of shape (B, K) where row b has weights [c_1, ..., c_K]
        
    Returns
    -------
    np.ndarray
        Combined vectors of shape (B, D)
    """
    # TODO: Implement vectorized batch combination without Python loops
    pass
```
:::
