---
id: "perceptron-activation"
version: "1.0.0"
title: "The Perceptron & Non-Linear Activation Functions"
track: "deeplearning"
module: "module-01"
estimated_minutes: 6
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "المستقبل العصبي ودوال التفعيل غير الخطية"
---

# The Perceptron & Non-Linear Activation Functions

Without non-linear activations, multi-layer neural networks collapse mathematically into a single trivial linear transformation.

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
activation_function: "relu"
show_derivative: true
---
:::

The Rectified Linear Unit (ReLU) computes the piecewise identity mapping over positive inputs, combating the vanishing gradient problem:

$$
\text{ReLU}(z) = \max(0, z) \quad z = w^T x + b
$$

:::python-challenge{id="relu-impl"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([-2.0, 0.0, 3.5])"
    expected: "np.array([0.0, 0.0, 3.5])"
---
```python
import numpy as np

def relu_activation(x: np.ndarray) -> np.ndarray:
    # Vectorized ReLU: element-wise max(0, x)
    return np.maximum(0.0, x)
```
:::
