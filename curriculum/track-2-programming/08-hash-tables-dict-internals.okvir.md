---
id: "hash-tables-dict-internals"
version: "1.0.0"
title: "Hash Tables & CPython Dictionary Internals"
track: "programming"
module: "mod-10"
estimated_minutes: 15
prerequisites: ["python-lists-memory-growth"]
i18n:
  ar: "جداول التجزئة والمعمارية الداخلية لقواميس CPython"
---

# Hash Tables & CPython Dictionary Internals

How can Python find a single key among 1,000,000 entries in under a microsecond? Imagine a massive library where, instead of scanning shelves sequentially, you pass the book title through a mathematical blender: the **Hash Function** `hash(key)`. The blender outputs a deterministic integer that points directly to the exact shelf row!

Since Python 3.6, dictionaries are **compact and insertion-ordered**. Earlier versions used a sparse table where each slot held hash, key, and value pointers, wasting massive amounts of memory. Today, CPython separates dictionaries into two tables: a small, sparse byte-array of `indices`, and a dense, packed `entries` array `[hash, key, value]`. When hash collisions occur (two keys mapping to the same index), Python resolves them via an open-addressing perturbation formula: $i = (5i + \text{perturb} + 1) \pmod M$.

:::simulation-widget{engine="canvas2d" component="DynamicArrayGrowthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
i_0 = \text{hash}(\text{key}) \pmod M, \quad i_{t+1} = (5 \cdot i_t + \text{perturb} + 1) \pmod M, \quad \text{Load Factor } \alpha \le \frac{2}{3}
$$

كيف يعثر بايثون على مفتاح ضمن مليون عنصر في أقل من ميكروثانية؟ تخيل مكتبة عملاقة، بدلاً من فحص الرفوف سطراً بعد سطر، تُدخل عنوان الكتاب في خلاط رياضي عجيب: **دالة التجزئة** `hash(key)`. يُنتج الخلاط رقماً حتمياً يوجهك مباشرة إلى الرف المنشود!

منذ إصدار بايثون 3.6، أصبحت القواميس **مضغوطة وتحافظ على ترتيب الإدخال**. كانت الإصدارات القديمة تهدر مساحات شاسعة من الذاكرة بجدول متناثر ضخم. أما اليوم، فيفصل بايثون القاموس إلى جدولين: مصفوفة فهارس صغيرة متناثرة (`indices`) تشير إلى مصفوفة مدخلات مرصوصة بإحكام (`entries`) تحوي `[hash, key, value]`. وعند حدوث تصادم (تطابق الفهرس لمفتاحين مختلفين)، يحل بايثون النزاع عبر خوارزمية العنونة المفتوحة والاضطراب التكراري: $i = (5i + \text{perturb} + 1) \pmod M$.

The load factor $\alpha = N / M$ is strictly capped at $2/3$. When two-thirds of the sparse table is populated, CPython quadruples (or doubles for large tables) the table size to preserve $O(1)$ average-case lookup. To qualify as a dictionary key, an object must be **hashable**: it must implement `__hash__()` and `__eq__()`, and satisfy the invariant: $a == b \implies \text{hash}(a) == \text{hash}(b)$.

يُقيد معامل التحميل $\alpha = N / M$ بحد أقصى $2/3$. وعند بلوغ هذا الحد، يضاعف CPython حجم الجدول فوراً للحفاظ على كفاءة البحث في زمن ثابت $O(1)$. ولكي يكون أي كائن صالحاً كمفتاح، يجب أن يكون **قابلاً للتجزئة** (Hashable): أي ينفذ `__hash__()` و `__eq__()` ويحقق الشرط الحتمي: $a == b \implies \text{hash}(a) == \text{hash}(b)$.

:::python-challenge{id="py-hash-tables-dict-internals"}
---
timeout_ms: 3000
test_cases:
  - input: "simulate_cpython_probe_sequence(10, 8, 3)[0]"
    expected: "2"
  - input: "len(simulate_cpython_probe_sequence(10, 8, 4))"
    expected: "4"
  - input: "simulate_cpython_probe_sequence(0, 8, 2)"
    expected: "[0, 1]"
---
```python
def simulate_cpython_probe_sequence(
    hash_value: int,
    table_size: int,
    max_steps: int = 5,
) -> list[int]:
    """
    Simulates CPython's exact open-addressing probe sequence for collision resolution:
      i = (5 * i + perturb + 1) % table_size
      perturb >>= 5

    Args:
        hash_value: The precomputed integer hash of the key.
        table_size: Capacity of the sparse index table (power of 2, e.g. 8).
        max_steps: Number of probe sequence steps to generate.

    Returns:
        A list of probed slot indices in traversal order.
    """
    probes: list[int] = []
    perturb = hash_value
    idx = hash_value % table_size
    probes.append(idx)

    for _ in range(max_steps - 1):
        idx = (5 * idx + perturb + 1) % table_size
        probes.append(idx)
        # Shift perturbation bits right by 5
        perturb >>= 5

    return probes
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Why does attempting to use a Python list as a dictionary key raise `TypeError: unhashable type: 'list'`?
*لماذا تطلق محاولة استخدام قائمة بايثون كمفتاح في القاموس خطأ `TypeError: unhashable type: 'list'`؟*

- [x] Lists are mutable; if a list mutated while serving as a key, its hash code would change, making its entry permanently unlocatable in the hash table.
  *القوائم قابلة للتعديل؛ فلو عُدلت القائمة أثناء وجودها كمفتاح لتغيرت شفرة تجزئتها، مما يجعل العثور عليها في الجدول مستحيلاً.*
- [ ] Because lists contain pointers and CPython hash functions can only process primitive integers.
  *لأن القوائم تحوي مؤشرات ودوال التجزئة تقبل الأرقام البسيطة فقط.*
- [ ] Because lists do not implement the `__eq__` equality method.
  *لأن القوائم لا تنفذ دالة المقارنة `__eq__`.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Hash tables require keys to be immutable. If an object mutated, its new hash would point to a completely different bucket, violating the dictionary invariant.
*تتطلب جداول التجزئة ثبات المفاتيح. فلو تغير الكائن لتغير مكانه الحسابي، مما يقوض ضمانات استرجاع البيانات.*

**Incorrect / مشتت غير صحيح:** Tuples also contain pointers, yet tuples are fully hashable as long as all their contents are hashable.
*الصفوف (Tuples) تحوي مؤشرات أيضاً ومع ذلك فهي قابلة للتجزئة ما دامت عناصرها ثابتة.*

**Incorrect / مشتت غير صحيح:** Lists do implement `__eq__`; they specifically set `__hash__ = None` to forbid hashing.
*القوائم تنفذ `__eq__` بالطبع، لكنها تعطل التجزئة عمداً بتعيين `__hash__ = None`.*
:::
