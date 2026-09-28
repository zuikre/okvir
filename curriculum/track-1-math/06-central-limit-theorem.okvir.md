---
id: "central-limit-theorem"
version: "1.0.0"
title: "The Central Limit Theorem & Galton Board"
track: "math"
module: "module-03"
estimated_minutes: 7
prerequisites: ["bayes-theorem"]
i18n:
  ar: "مبرهنة النهاية المركزية ومحاكي لوحة غالتون"
---

# The Central Limit Theorem & Galton Board

No matter what distribution individual random steps follow, their aggregated sum or average inevitably converges toward the universal Gaussian bell curve.

:::simulation-widget{engine="canvas2d" component="GaltonBoardCltLab"}
---
rows: 10
p: 0.5
batch_size: 25
---
:::

The standardized sum of independent and identically distributed random variables converges weakly to the standard normal distribution:

$$
Z_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sigma \sqrt{n}} \xrightarrow{d} \mathcal{N}(0, 1)
$$

:::python-challenge{id="py-clt-sample-mean"}
---
timeout_ms: 3000
test_cases:
  - input: "samples = np.array([2.0, 4.0, 6.0, 8.0])"
    expected: "5.0"
  - input: "samples = np.array([10.0, 20.0])"
    expected: "15.0"
---
```python
import numpy as np

def compute_clt_stats(samples: np.ndarray) -> float:
    # Compute the sample mean x_bar
    return float(np.mean(samples))
```
:::
