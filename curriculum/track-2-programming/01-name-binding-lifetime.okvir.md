---
id: "name-binding-lifetime"
version: "1.0.0"
title: "Name-Binding, Environment Frames & Variable Lifetime"
track: "programming"
module: "mod-08"
estimated_minutes: 15
prerequisites: []
i18n:
  ar: "ربط الأسماء، أطر البيئة، ودورة حياة المتغيرات"
---

# Name-Binding, Environment Frames & Variable Lifetime

To write a computer program, we must store information. Beginners almost universally picture a variable as a labeled cardboard box: they imagine writing the number 42 on a slip of paper and dropping it inside a box marked x. In many languages (like C), this box metaphor is partially true because a variable is a fixed block of memory bytes. But in high-level languages like Python, this metaphor leads to catastrophic confusion.

In Python, a variable is not a box. A variable is a sticky name-tag. 
When you execute x = 42, the computer first allocates an object representing 42 somewhe

:::simulation-widget{engine="canvas2d" component="EnvironmentFrameCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\sigma: \mathcal{X} \to \mathcal{L}
$$

عندما يبدأ المبتدئ في تعلم البرمجة، يتخيل المتغير كأنه "صندوق كرتوني" يحمل اسماً معيناً، ونضع في داخله القيمة. هذا التصور ينهار تماماً عند التعامل مع لغات كبايثون ويقود إلى أخطاء برمجية خفية.
في بايثون، المتغير ليس صندوقاً، بل هو "بطاقة اسمية لاصقة" (Name Tag) مربوطة بخيط يلتف حول كائن موجود في الذاكرة. عندما نكتب x = 42، يقوم الحاسوب بإنشاء كائن الرقم 42 في فضاء الذاكرة العام (Heap)، ثم يصنع بطاقة مكتوب عليها x ويوجهها نحو ذلك الكائن. وإذا كتبنا y = x، فإن الحاسوب لا ينسخ الرقم 42، بل يضيف بطاقة ثانية باسم y ترتبط بذات الكائن الأصلي.
أما إطار البيئة (Environment Frame) فهو

:::python-challenge{id="py-name-binding-lifetime"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Any

def swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]:
    """
    Performs an in-place reference swap of two bindings using tuple packing/unpacking
    and returns the swapped values alongside pre- and post-swap memory address identities.

    Args:
        a: First object reference.
        b: Second object reference.

    Returns:
        A tuple ((swapped_a, swapped_b), (pre_id_a, pre_id_b), (post_id_a, post_id_b)).
    """
    # TODO: Record initial IDs, swap bindings using tuple unpacking, record post IDs
    raise NotImplementedError("Implement swap_and_track_identity")
```
:::
