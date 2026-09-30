---
id: "iterators-generators-streams"
version: "1.0.0"
title: "Collision Resolution, Load Factors & Dynamic Resizing"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["object-oriented-dunder"]
i18n:
  ar: "معالجة تصادمات التجزئة، معامل التحميل ($\alpha$)، وإعادة التحجيم الديناميكي"
---

# Collision Resolution, Load Factors & Dynamic Resizing

What happens if two totally different book titles get fed into our hash function, and both produce the exact same bucket number?
By the Pigeonhole Principle, if you have 10 pigeons and only 9 holes, at least one hole must contain more than one pigeon. Because the universe of possible strings is infinite and our computer memory table is finite, collisions are mathematically impossible to prevent!

How does a Hash Table handle this collision without losing data?
Two primary strategies exist:
1. Chaining: Each bucket is not a single slot, but a hook holding a chain (linked list). If two i

:::simulation-widget{engine="canvas2d" component="CompactDictLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\alpha = \frac{N}{M}
$$

ماذا يحدث إذا أدخلنا كتابين مختلفين تماماً في دالة التجزئة، وأنتجت الدالة نفس رقم الرف بالضبط؟
وفق مبدأ برج الحمام (Pigeonhole Principle): إذا كان لديك 10 حمامات و 9 فتحات فقط، فلا بد حتماً أن تشترك حمامتان في فتحة واحدة على الأقل. ولأن النصوص المحتملة في العالم لا حصر لها، وحجم ذاكرة الحاسوب محدود، فإن التصادمات (Collisions) حتمية رياضياً!
كيف يتعامل جدول التجزئة (Hash Table) مع هذا التصادم دون ضياع البيانات؟
هناك طريقتان رئيستان:
1. السلاسل المترابطة (Chaining): كل فتحة لا تحتوي عنصراً واحداً، بل سلسلة يتدلى منها أي عدد من العناصر المتصادمة.
2. العنونة المفتوحة والاستكشاف (Open

:::python-challenge{id="py-iterators-generators-streams"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]:
    """
    Finds all index pairs (i, j) with i < j such that nums[i] + nums[j] == target
    using a single-pass hash map index.

    Args:
        nums: List of integers.
        target: Target sum.

    Returns:
        List of 0-based index tuples (i, j) sorted lexicographically.
    """
    # TODO: Implement O(N) hash map complementary pairing
    raise NotImplementedError("Implement find_all_target_pairs")
```
:::
