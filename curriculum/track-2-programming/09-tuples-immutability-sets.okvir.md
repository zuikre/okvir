---
id: "tuples-immutability-sets"
version: "1.0.0"
title: "Tuples, Immutability & Set Theory Mechanics"
track: "programming"
module: "mod-10"
estimated_minutes: 15
prerequisites: ["cs-08"]
i18n:
  ar: "الصفوف (Tuples)، اللاقابلية للتغيير، وميكانيكا المجموعات (Sets)"
---

# Tuples, Immutability & Set Theory Mechanics

When novice developers encounter Python's `tuple` type, they almost invariably dismiss it as nothing more than a "read-only list." After all, both store ordered collections, both support indexing `seq[0]`, both allow slicing `seq[1:3]`, and both can be looped over. But in software architecture and memory design, lists and tuples serve two radically different purposes.

A list is a **dynamic shopping cart**. It is designed for homogeneous sequences of varying length that are meant to expand, shrink, and reorder as items are acquired. In contrast, a tuple is a **sealed, welded cargo crate**. It represents a fixed-dimension heterogeneous record—analogous to a single row in an SQL database or a `struct` in C (for example: `("Alice", 30, "Staff Engineer", True)`).

Because a tuple's length is permanently frozen upon creation, CPython optimizes it aggressively. Unlike a list, a tuple never over-allocates spare memory headroom. An empty tuple consumes just 40 bytes on 64-bit CPython, compared to 56 bytes for an empty list. Furthermore, CPython maintains internal **freelists** for small tuples: when a small tuple is destroyed, its memory is not returned to the operating system; it is recycled instantly for the next tuple allocation, dramatically cutting memory fragmentation.

However, programmers must beware of Python's most notorious trap: **immutability in Python is strictly shallow!** A tuple's immutability means only that the sequence of memory addresses (pointers) it holds is permanently locked. But if one of those pointers happens to point to a *mutable* object—such as a list—the contents of that list can still be modified in place! The crate itself cannot change which rooms it connects to, but someone inside one of those rooms can still rearrange the furniture! Consequently, a tuple is only hashable (and eligible as a dictionary key or set member) if *all* of its constituent elements are recursively immutable.

Meanwhile, a **set** is an ultra-fast collection modeled on mathematical set theory. Under the hood, a set is implemented as a modified hash table that stores only keys without values. This grants $O(1)$ constant-time membership testing (`item in my_set`) and empowers developers with instantaneous mathematical operations like unions (`|`), intersections (`&`), and symmetric differences (`^`).

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

```text
Memory Comparison: List vs Tuple vs Shallow Immutability:
PyTupleObject (Frozen 2-element record):
+------------------------------------+
| ob_refcnt: 1                       |
| ob_type: &PyTuple_Type             |
| ob_size: 2                         |
| ob_item[0]: ---------> Heap: 42    |  (Immutable Integer)
| ob_item[1]: ---------> Heap: [*]   |  (Mutable List!)
+-------------------------|----------+
                          v
               +----------------------+
               | PyListObject         |
               | contents: [1, 2]     |  <-- Can mutate via t[1].append(3)!
               +----------------------+
```

عندما يتعرف المبرمج المبتدئ على الصفوف في بايثون (`tuple`)، يتبادر إلى ذهنه فوراً أنها مجرد "قوائم للقراءة فقط". فكلاهما يخزن عناصر مرتبة، وكلاهما يدعم الفهرسة `seq[0]`، والتقطيع `seq[1:3]`، والتكرار الحلقي. لكن في المعمارية البرمجية وهندسة الذاكرة، يؤدي كل منهما غرضاً مختلفاً جذرياً.

القائمة هي **عربة تسوق ديناميكية ذات جوانب قابلة للتمدد**؛ صُممت للبيانات المتجانسة ذات الأطوال المتغيرة التي تحتاج للإضافة والحذف وإعادة الترتيب باستمرار. أما الصف (`tuple`) فهو **صندوق شحن خشبي مصفح ومختوم**؛ يمثل سجلاً بياناتياً بنيوياً ثابت الأبعاد غير متجانس الأنواع—تماماً مثل صف وحيد في جدول قاعدة بيانات SQL أو بنية `struct` في C (مثل: `("Alice", 30, "Engineer")`).

ولأن حجم الصف يتجمد نهائياً في لحظة ولادته، يستمثله CPython بقوة خارقة في الذاكرة. فعلى خلاف القائمة، لا يحجز الصف أي خانات ذاكرية فائضة للمستقبل. يستهلك الصف الفارغ 40 بايتاً فقط في معالجات 64 بت مقارنة بـ 56 بايتاً للقائمة الفارغة. والأهم من ذلك: يحتفظ بايثون داخلياً بـ **قوائم إعادة تدوير مجانية (Freelists)** للصفوف الصغيرة؛ فعند حذف صف صغير، لا تُعاد ذاكرته للنظام، بل يُعاد استخدامه فوراً للصف التالي لتسريع الحجز وتجنب تشتت الذاكرة.

ومع ذلك، يجب على كل مهندس الحذر من أشهر فخ معماري في بايثون: **اللاقابلية للتعديل في بايثون سطحية بحتة (Shallow Immutability)!** معنى ثبات الصف هو أن شريط عناوين الذاكرة (المؤشرات) التي يحملها بداخله مقفل لا يمكن استبداله. ولكن إذا كان أحد تلك المؤشرات يشير إلى كائن *قابل للتعديل*—مثل قائمة—فإن محتويات تلك القائمة الداخلية يمكن تعديلها في مكانها بحرية! الصندوق الخشبي لا يستطيع تبديل الغرف التي يشير إليها، لكن يمكن لأي شخص داخل الغرفة أن يغير أثاثها! ولهذا السبب، لا يكون الصف قابلاً للتجزئة (Hashable) وصالحاً كمفتاح قاموس إلا إذا كانت *كافة* عناصره الداخلية مجمدة وغير قابلة للتعديل بدورها.

أما **المجموعة (`set`)**، فهي بنية مستلهمة مباشرة من نظرية المجموعات الرياضية. تُبنى المجموعة كجدول تجزئة مخصص يخزن المفاتيح فقط دون أي قيم مرافقة. يمنح هذا الهيكل فحص انتماء لحظي بزمن ثابت $O(1)$ (`x in my_set`)، ويدعم العمليات الجبرية الفائقة كالتقاطع والاتحاد والفرق التناظري بسرعة استثنائية.

#### Architectural Breakdown & Freelist Recycling:
- **`PyTupleObject`**: Immutable variable-length object struct with no `allocated` field; `sizeof(tuple) = sizeof(PyVarObject) + sizeof(PyObject*) * ob_size`.
- **Tuple Freelists**: CPython maintains an array of single-linked freelists for tuples of size $1 \le n < 20$, avoiding system heap allocations during hot loops.
- **Set Invariants**: Sets maintain an 8-slot hash table initially, requiring items to be fully hashable. Set lookups bypass value fetching, matching keys directly via pointer identity followed by `__eq__`.

#### التحليل المعماري وإعادة تدوير الذاكرة:
- **هيكل `PyTupleObject`**: كائن متغير الطول ثابت الحجم، لا يحمل حقلاً للسعة المحجوزة `allocated`، مما يجعله أكثر رشاقة من القوائم في الذاكرة.
- **قوائم الصفوف المجانية (Tuple Freelists)**: يحتفظ CPython بقوائم خاصة للصفوف التي يقل حجمها عن 20 عنصراً لإعادة استخدامها فوراً دون المرور بمدير ذاكرة النظام.
- **ثوابت المجموعات**: تبدأ المجموعة بجدول تجزئة من 8 خانات، وتتطلب أن تكون جميع العناصر قابلة للتجزئة. وتعتمد على هوية المؤشرات أولاً ثم المقارنة `__eq__`.

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
    # Step 1: Recursively freeze list elements and convert to tuple
    if isinstance(obj, list):
        return tuple(deep_freeze(x) for x in obj)

    # Step 2: Recursively freeze dict values and convert to frozenset of items
    elif isinstance(obj, dict):
        return frozenset((k, deep_freeze(v)) for k, v in obj.items())

    # Step 3: Recursively freeze set items and convert to frozenset
    elif isinstance(obj, set):
        return frozenset(deep_freeze(x) for x in obj)

    # Step 4: Base case - primitive atomic values are returned unchanged
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
**Correct / الإجابة الصحيحة:** The augmented assignment statement `t[2] += [5]` performs two distinct bytecode steps:
1. In-place addition: It calls `t[2].__iadd__([5])`. Because lists are mutable, this succeeds in place, extending the list in heap memory to `[3, 4, 5]`.
2. Re-assignment: The `+=` operator then attempts to assign the returned list reference back to the container: `STORE_SUBSCR` on `t[2]`. Because `t` is a tuple, CPython's `tuple_setitem` raises `TypeError: 'tuple' object does not support item assignment`!
The mutation succeeded before the assignment failed, leaving the data mutated despite the crash!
*تنفذ العملية المركبة `t[2] += [5]` خطوتين منفصلتين في شفرة البايت:
1. التعديل في الموضع: تستدعي `__iadd__` على القائمة، فتنجح القائمة في إضافة الرقم 5 في الكومة لتصبح `[3, 4, 5]`.
2. محاولة الإسناد: يحاول المعامل `+=` إعادة تعيين المؤشر إلى `t[2]` عبر أمر `STORE_SUBSCR`؛ ولأن الحاوية صف (`tuple`)، يرفض بايثون تعديل عناصره ويطلق `TypeError`!
وبالتالي يقع التعديل أولاً ثم يفشل الإسناد، لتتغير البيانات رغم انهيار البرنامج!*

**Incorrect / مشتت غير صحيح:** The in-place mutation executes during the expression evaluation phase *before* the assignment step triggers the exception.
*التعديل في الموضع يحدث بالفعل أثناء تقييم التعبير وقبل أن يطلق أمر الإسناد الخطأ.*

**Incorrect / مشتت غير صحيح:** Direct assignment to an indexed position in a tuple is forbidden by the Python runtime and will always raise a `TypeError`.
*إسناد أي قيمة لفهرس محدد داخل الصف ممنوع تماماً في بايثون ويطلق `TypeError` حتماً.*
:::
