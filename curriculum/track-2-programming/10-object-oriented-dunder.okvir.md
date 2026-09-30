---
id: "object-oriented-dunder"
version: "1.0.0"
title: "Hash Functions, Direct Addressing & Determinism"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["tuples-immutability-sets"]
i18n:
  ar: "دوال التجزئة (Hash Functions)، العنونة المباشرة، والتوزيع المنتظم"
---

# Hash Functions, Direct Addressing & Determinism

Imagine you manage a physical library containing 10,000,000 books. A patron walks in and asks: "Do you have 'The Great Gatsby'?"
If the books are tossed randomly on shelves, how do you find it? You have to inspect every single book one by one. In the worst case, you examine all 10,000,000 books ($O(N)$ linear time). Even with alphabetical sorting and binary search, you must perform ~24 comparisons ($O(\log N)$).

Can we find it in exactly one step ($O(1)$)?
Yes! What if we invent a mathematical meat grinder: you feed in the title "The Great Gatsby", and the grinder crunches the character

:::simulation-widget{engine="canvas2d" component="HashTableBucketLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
h: \mathcal{K} \to \{0, 1, \dots, M - 1\}
$$

تخيل أنك تدير مكتبة تحتوي على 10 ملايين كتاب. جاءك زائر وسألك: "هل يتوفر لديكم كتاب 'الأيام لطه حسين'؟"
إذا كانت الكتب مبعثرة عشوائياً، فستضطر لفحصها كتاباً تلو الآخر، وهو أمر قد يستغرق شهوراً ($O(N)$). وحتى لو كانت مرتبة هجائياً، فستحتاج لتقسيم الرفوف والبحث في 24 محطة ($O(\log N)$).
هل يمكن إيجاد الكتاب في خطوة واحدة فقط ($O(1)$)؟
نعم! تخيل أن لدينا "مطحنة رياضية": تلقمها بعنوان الكتاب، فتطحن حروفه وتخرج لك فوراً رقماً محدداً: 4819. تتجه مباشرة إلى الرف رقم 4819 فتجد الكتاب بانتظارك!
هذه الآلة الرياضية هي دالة التجزئة (Hash Function). إنها تحول أي بيانات ذات حجم عشوائي (نصوص، ص

:::python-challenge{id="py-object-oriented-dunder"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import TypeVar, Generic

K = TypeVar("K")
V = TypeVar("V")

class LinearProbeHashTable(Generic[K, V]):
    """
    Fixed-capacity open-addressing hash table resolving collisions with linear probing
    and preserving search probe continuity using deletion tombstones.
    """
    def __init__(self, capacity: int = 16) -> None:
        # TODO: Initialize bucket array with tombstones
        raise NotImplementedError("Implement LinearProbeHashTable.__init__")

    def put(self, key: K, value: V) -> bool:
        # TODO: Implement put with collision resolution
        raise NotImplementedError("Implement LinearProbeHashTable.put")

    def get(self, key: K) -> V | None:
        # TODO: Implement get probing through tombstones
        raise NotImplementedError("Implement LinearProbeHashTable.get")

    def delete(self, key: K) -> bool:
        # TODO: Implement delete leaving tombstone
        raise NotImplementedError("Implement LinearProbeHashTable.delete")

    def load_factor(self) -> float:
        # TODO: Return occupied_count / capacity
        raise NotImplementedError("Implement LinearProbeHashTable.load_factor")
```
:::
