---
id: "tuples-immutability-sets"
version: "1.0.0"
title: "Tuples, Immutability & Set Theory Mechanics"
track: "programming"
module: "mod-10"
estimated_minutes: 15
prerequisites: ["hash-tables-dict-internals"]
i18n:
  ar: "الصفوف (Tuples)، اللاقابلية للتغيير، وميكانيكا المجموعات (Sets)"
---

# Tuples, Immutability & Set Theory Mechanics

Beginners frequently assume a tuple is merely a 'read-only list', but their architectural roles are fundamentally different. A list is a dynamic array designed to grow and shrink. A **tuple** is a fixed-size structured record (like a database row: `('Alice', 30, 'Engineer')`).

Because a tuple's length is frozen upon creation, CPython optimizes it aggressively: zero over-allocation headroom, smaller memory overhead, and internal freelist recycling for small tuples. However, beware: **immutability in Python is shallow**! A tuple cannot change which memory addresses it holds. But if one of those addresses points to a mutable list, that list's internal contents can still be mutated! Meanwhile, a **set** is an ultra-fast hash table without values, granting $O(1)$ set membership testing and mathematical union/intersection operations.

:::simulation-widget{engine="canvas2d" component="RecursionTreeExplorer"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{sizeof}(\text{tuple}_n) = 40 + 8n \text{ bytes}, \quad \text{sizeof}(\text{list}_n) = 56 + 8 \cdot \text{allocated}, \quad \text{Shallow Immutability}
$$

يعتقد المبتدئون أن الصف (Tuple) مجرد 'قائمة للقراءة فقط'، لكن غرضهما المعماري مختلف جوهرياً. القائمة مصفوفة ديناميكية صُممت لتنمو وتنكمش. بينما **الصف** هو سجل بيانات بنيوي ثابت الحجم (مثل صف في قاعدة بيانات: `('Alice', 30, 'Engineer')`).

ولأن حجم الصف مجمد عند إنشائه، يستمثله CPython بكفاءة عالية: لا مساحات محجوزة فائضة، واستهلاك أقل للذاكرة، وإعادة تدوير الصفوف الصغيرة في الذاكرة. ولكن احذر: **اللاقابلية للتعديل في بايثون سطحية** (Shallow Immutability)! لا يمكن للصف أن يغير مؤشرات الذاكرة التي يحملها؛ لكن إذا كان أحد تلك المؤشرات يشير إلى قائمة قابلة للتعديل، فإن محتويات القائمة الداخلية يمكن أن تتغير! أما **المجموعة** (`set`) فهي جدول تجزئة فائق السرعة يحوي مفاتيح فقط دون قيم، مما يمنح فحص الانتماء الرياضي بزمن ثابت $O(1)$.

Memory footprint comparison reveals the architecture: on 64-bit CPython, an empty tuple consumes 40 bytes, while an empty list consumes 56 bytes. For $N$ items, a tuple allocates exactly $40 + 8N$ bytes, whereas a list allocates $56 + 8 \times \text{allocated}$ bytes where $\text{allocated} > N$. A set requires a minimum 224 bytes because it maintains an internal 8-slot hash table table from birth.

يكشف فحص الذاكرة عن الفارق المعماري: في أنظمة 64-بت، يستهلك الصف الفارغ 40 بايتاً فقط، بينما تستهلك القائمة الفارغة 56 بايتاً. ولعدد $N$ من العناصر، يخصص الصف $40 + 8N$ بايتاً بدقة، في حين تخصص القائمة $56 + 8 \times \text{allocated}$ بايت حيث السعة المحجوزة أكبر من $N$. أما المجموعة فتحجز 224 بايتاً كحد أدنى لأنها تبني جدول تجزئة من 8 خانات منذ لحظة ولادتها.

:::python-challenge{id="py-tuples-immutability-sets"}
---
timeout_ms: 3000
test_cases:
  - input: "deep_freeze([1, [2, 3]])"
    expected: "(1, (2, 3))"
  - input: "isinstance(deep_freeze({'a': [1, 2]}), frozenset)"
    expected: "True"
  - input: "hash(deep_freeze([1, 2, {'x': 10}])) != 0"
    expected: "True"
---
```python
from typing import Any

def deep_freeze(obj: Any) -> Any:
    """
    Recursively transforms arbitrary compound data structures into
    deeply immutable, hashable forms:
      - lists become tuples
      - dicts become frozensets of (key, deep_freeze(value)) pairs
      - sets become frozensets

    Args:
        obj: Arbitrary Python object.

    Returns:
        The recursively frozen, hashable equivalent.
    """
    if isinstance(obj, list):
        return tuple(deep_freeze(x) for x in obj)
    elif isinstance(obj, dict):
        return frozenset((k, deep_freeze(v)) for k, v in obj.items())
    elif isinstance(obj, set):
        return frozenset(deep_freeze(x) for x in obj)
    return obj
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Consider this famous Python puzzle:
```python
t = (1, 2, [3, 4])
t[2] += [5]
```
What happens when this executes?
*تأمل هذه الأحجية البرمجية الشهيرة في بايثون:
```python
t = (1, 2, [3, 4])
t[2] += [5]
```
ما الذي يحدث عند تنفيذ هذا السطر؟*

- [x] It BOTH raises a TypeError AND mutates the list, resulting in t being (1, 2, [3, 4, 5]).
  *يحدث الأمران معاً: يُطلق خطأ TypeError وتُعدل القائمة في مكانها لتصبح t مساوية لـ (1, 2, [3, 4, 5]).*
- [ ] It raises a TypeError immediately and the list remains [3, 4].
  *يُطلق خطأ TypeError فوراً وتبقى القائمة كما هي دون تغيير [3, 4].*
- [ ] It executes cleanly without error, appending 5 to the nested list.
  *ينفذ الكود بنجاح دون أي أخطاء ويضيف 5 للقائمة الفرعية.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** The `+=` operator executes `t[2].__iadd__([5])`, which successfully mutates the list in-place on the heap. Then, it attempts to assign the result back to `t[2]`, which raises `TypeError: 'tuple' object does not support item assignment` because the tuple container is immutable!
*تستدعي `+=` التابع `t[2].__iadd__([5])` الذي يعدل القائمة في الكومة بنجاح، ثم تحاول العملية إعادة إسناد النتيجة إلى `t[2]`، فيطلق الصف خطأ `TypeError` لأنه لا يدعم تعديل عناصره!*

**Incorrect / مشتت غير صحيح:** The in-place mutation occurs before the assignment step is evaluated.
*التعديل في الموضع يقع بالفعل قبل محاولة إعادة الإسناد الفاشلة.*

**Incorrect / مشتت غير صحيح:** Assignment to a tuple element always raises a TypeError.
*إسناد قيمة لأي عنصر في الصف يطلق خطأ نظامياً دائماً.*
:::
