---
id: "pandas-dataframe"
version: "1.0.0"
title: "Tidy Data Principles & DataFrame Anatomy"
track: "programming"
module: "module-02"
estimated_minutes: 8
prerequisites: ["numpy-vectorization"]
i18n:
  ar: "مبادئ البيانات المنظمة وتشريح إطارات البيانات"
---

# Tidy Data Principles & DataFrame Anatomy

In tidy data, each variable forms a column, each observation forms a row, and each type of observational unit forms an isolated table.

:::simulation-widget{engine="canvas2d" component="SimpsonsParadoxLab"}
---
mode: "data_wrangling"
---
:::

The relationship between unaggregated groups and composite partitions is governed by relational split-apply-combine:

$$
\text{Split}(D) \to \text{Apply}(f) \to \text{Combine}(\{f(D_g)\})
$$

:::python-challenge{id="df-create"}
---
timeout_ms: 3000
test_cases:
  - input: "tidy_df(records)"
    expected: "shape (4, 3)"
---
```python
import pandas as pd

def build_tidy_frame(data: dict) -> pd.DataFrame:
    # Construct a clean columnar DataFrame
    df = pd.DataFrame(data)
    return df.dropna().reset_index(drop=True)
```
:::
