---
id: "numpy-strides-indexing"
version: "1.0.0"
title: "Multi-Dimensional Array Broadcasting Rules"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["numpy-vectorization"]
i18n:
  ar: "قواعد البث متعدد الأبعاد (Broadcasting Rules) في NumPy"
---

# Multi-Dimensional Array Broadcasting Rules

What happens if you want to add the number 5 to a matrix containing 1,000,000 numbers?
In linear algebra, matrix addition is only defined when two matrices have the exact same shape. Adding a single scalar number to a matrix is strictly undefined.

NumPy solves this practical problem through Broadcasting. Broadcasting is a set of elegant mathematical rules that allows arrays of different shapes to participate in arithmetic operations together without duplicating memory.

How does it work?
NumPy stretches the smaller array across the larger array. But here is the critical data engineering

:::simulation-widget{engine="canvas2d" component="BroadcastingAlignmentGrid"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
a_k = b_k \quad \lor \quad a_k = 1 \quad \lor \quad b_k = 1
$$

ماذا تفعل إذا أردت إضافة الرقم 5 إلى مصفوفة تحوي مليون رقم؟
في الجبر الخطي الصارم، لا يمكن جمع مصفوفة إلا مع مصفوفة أخرى تطابقها تماماً في الأبعاد. جمع قيمة فردية مع مصفوفة هو أمر غير معرّف رياضياً.
تحل NumPy هذه المعضلة الحقيقية عبر تقنية البث (Broadcasting). البث هو مجموعة من القواعد الرياضية الذكية التي تتيح إجراء العمليات الحسابية بين مصفوفات ذات أبعاد مختلفة دون أي نسخ أو تكرار للبيانات في الذاكرة.
كيف يتم ذلك سحرياً؟
تقوم NumPy بتمديد المصفوفة الأصغر لتطابق أبعاد المصفوفة الأكبر. ولكن إليك السر الهندسي المذهل: NumPy لا تنسخ الأرقام في الذاكرة إطلاقاً!
تذكر مفهوم "الخطوات الذاكر

:::python-challenge{id="py-numpy-strides-indexing"}
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

def pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:
    """
    Computes the (N x M) pairwise squared Euclidean distance matrix between
    two sets of feature vectors using NumPy broadcasting.

    Args:
        X: (N, D) array of vectors.
        Y: (M, D) array of vectors.

    Returns:
        (N, M) matrix where element (i, j) is ||X[i] - Y[j]||^2.
    """
    # TODO: Implement zero-loop broadcasting pairwise distance
    raise NotImplementedError("Implement pairwise_squared_distance")
```
:::
