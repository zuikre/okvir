---
id: "cnn-convolution"
version: "1.0.0"
title: "Convolutional Filters & Spatial Invariance"
track: "deeplearning"
module: "module-03"
estimated_minutes: 8
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "مرشحات الالتفاف واللاتباين المكاني"
---

# Convolutional Filters & Spatial Invariance

2D spatial convolutions slide a small parameter kernel across the image plane, enforcing translation equivariance and drastically reducing parameter counts compared to dense layers.

:::simulation-widget{engine="canvas2d" component="ConvolutionFilterCanvas"}
---
filter_type: "sobel"
show_receptive_field: true
---
:::

The discrete spatial cross-correlation sums element-wise products across the receptive window:

$$
S(i, j) = (I * K)(i, j) = \sum_{m} \sum_{n} I(i + m, j + n) K(m, n)
$$

:::python-challenge{id="conv2d"}
---
timeout_ms: 3000
test_cases:
  - input: "patch = [[1, 2], [3, 4]], kernel = [[1, 0], [0, 1]]"
    expected: "5.0"
---
```python
import numpy as np

def apply_kernel_patch(patch: np.ndarray, kernel: np.ndarray) -> float:
    # 2D discrete convolution Frobenius inner product
    return float(np.sum(patch * kernel))
```
:::
