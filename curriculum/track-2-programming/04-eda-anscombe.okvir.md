---
id: "eda-anscombe"
version: "1.0.0"
title: "Exploratory Data Analysis & Anscombe's Quartet"
track: "programming"
module: "module-04"
estimated_minutes: 6
prerequisites: ["pandas-dataframe"]
i18n:
  ar: "استكشاف البيانات ورباعية أنسكوم"
---

# Exploratory Data Analysis & Anscombe's Quartet

Why summary statistics lie: In 1973, statistician Francis Anscombe constructed four datasets having identical mean, variance, correlation, and regression lines, yet dramatically different underlying structures.

:::simulation-widget{engine="canvas2d" component="AnscombesQuartetLab"}
---
datasets_count: 4
target_mean_x: 9.0
target_mean_y: 7.5
target_slope: 0.5
target_intercept: 3.0
target_r2: 0.67
---
:::

Summary metrics compress high-dimensional geometry into scalar projections, discarding topological topology and outlier leverage:

$$
\bar{x} = 9.0 \quad \bar{y} = 7.5 \quad \hat{y} = 3.0 + 0.5 x \quad R^2 = 0.67
$$

:::python-challenge{id="py-anscombe-summary"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5]); y = np.array([8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])"
    expected: "mean_x=9.0, mean_y=7.5"
---
```python
import numpy as np

def verify_anscombe_invariants(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:
    # Compute sample means of X and Y
    mx = float(np.mean(x))
    my = float(np.round(np.mean(y), 2))
    return (mx, my)
```
:::
