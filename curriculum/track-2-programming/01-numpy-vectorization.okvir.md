---
id: "numpy-vectorization"
version: "1.0.0"
title: "The Vectorization Mindset: SIMD Acceleration"
track: "programming"
module: "module-01"
estimated_minutes: 6
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "عقلية التوجيه الحاسوبي: تسريع SIMD"
---

# The Vectorization Mindset: SIMD Acceleration

Python interpreter loops incur dynamic type dispatch overhead on every single iteration. NumPy executes SIMD vector instructions across contiguous blocks of C memory.

:::simulation-widget{engine="canvas2d" component="VectorGeometryCanvas"}
---
mode: "vectorized_benchmark"
---
:::

The contiguous array layout guarantees cache line hits and enables SIMD parallel registers:

$$
\text{Speedup} = \frac{T_{\text{loop}}}{T_{\text{SIMD}}} \approx 50\times - 100\times
$$

:::python-challenge{id="numpy-vec"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.arange(1000)"
    expected: "vectorized sum = 499500"
---
```python
import numpy as np

def vectorized_accumulate(arr: np.ndarray) -> float:
    # Avoid slow Python for-loops; use SIMD compiled reduction
    return float(np.sum(arr))
```
:::
