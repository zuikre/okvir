---
id: "hash-tables-dict-internals"
version: "1.0.0"
title: "Linear Sequences, Memory Layout & Dynamic Arrays"
track: "programming"
module: "mod-10"
estimated_minutes: 15
prerequisites: ["python-lists-memory-growth"]
i18n:
  ar: "المتتاليات الخطية، التخطيط الذاكري، والمصفوفات الديناميكية"
---

# Linear Sequences, Memory Layout & Dynamic Arrays

Physical computer memory (RAM) is not a chaotic cloud; it is a gargantuan, orderly street of numbered houses. Each house holds exactly one byte (8 bits), and each has a precise integer address ($0, 1, 2, 3, \dots$). 

If you want to store a list of ten numbers, how should the computer arrange them? The fastest way is to place them in ten houses sitting directly side-by-side: Contiguous Memory. 
Why? Because if you know the starting address of House 0, finding the address of House 7 requires zero searching! You simply calculate:

:::simulation-widget{engine="canvas2d" component="DynamicArrayGrowthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Target Address} = \text{Start Address} + (7 \times \text{Size of Item})
$$

ذاكرة الوصول العشوائي (RAM) ليست فضاءً عشوائياً، بل هي شارع طويل جداً ومنتظم من المنازل المرقمة. كل منزل يخزن بايتاً واحداً، وله عنوان رقمي فريد ($0, 1, 2, \dots$).
إذا أردت تخزين عشرة أرقام، فالطريقة الأسرع هي حجز عشرة منازل متلاصقة جنباً إلى جنب: الذاكرة المتصلة (Contiguous Memory).
لماذا؟ لأنك إذا عرفت عنوان المنزل الأول، فلن تحتاج للبحث عن المنزل السابع خطوة بخطوة؛ بل تحسب عنوانه بعملية رياضية واحدة فورية:

:::python-challenge{id="py-hash-tables-dict-internals"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import TypeVar, Sequence

T = TypeVar("T")

def rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]:
    """
    Generates all valid sliding windows of exact length window_size from a sequence.

    Args:
        seq: Sequence implementing __len__ and __getitem__ (list, tuple, str).
        window_size: Exact length of each sliding sub-window.
        step: Stride offset between consecutive window start positions.

    Returns:
        List of slice sub-sequences.
    """
    # TODO: Implement rolling window sequence slicer
    raise NotImplementedError("Implement rolling_window_slices")
```
:::
