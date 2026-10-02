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

## Beat 1: Intuition & Mental Model / الحدس والنموذج الذهني

When novice developers encounter Python's `tuple` type, they almost invariably dismiss it as nothing more than a "read-only list." After all, both store ordered collections, both support indexing `seq[0]`, both allow slicing `seq[1:3]`, and both can be looped over. But in software architecture and memory design, lists and tuples serve two radically different purposes.

A list is a **dynamic shopping cart**. It is designed for homogeneous sequences of varying length that are meant to expand, shrink, and reorder as items are acquired. In contrast, a tuple is a **sealed, welded cargo crate**. It represents a fixed-dimension heterogeneous record—analogous to a single row in an SQL database or a `struct` in C (for example: `("Alice", 30, "Staff Engineer", True)`).

Because a tuple's length is permanently frozen upon creation, CPython optimizes it aggressively. Unlike a list, a tuple never over-allocates spare memory headroom. An empty tuple consumes just 40 bytes on 64-bit CPython, compared to 56 bytes for an empty list. Furthermore, CPython maintains internal **freelists** for small tuples: when a small tuple is destroyed, its memory is not returned to the operating system; it is recycled instantly for the next tuple allocation, dramatically cutting memory fragmentation.

However, programmers must beware of Python's most notorious trap: **immutability in Python is strictly shallow!** A tuple's immutability means only that the sequence of memory addresses (pointers) it holds is permanently locked. But if one of those pointers happens to point to a *mutable* object—such as a list—the contents of that list can still be modified in place! The crate itself cannot change which rooms it connects to, but someone inside one of those rooms can still rearrange the furniture! Consequently, a tuple is only hashable (and eligible as a dictionary key or set member) if *all* of its constituent elements are recursively immutable.

Meanwhile, a **set** is an ultra-fast collection modeled on mathematical set theory. Under the hood, a set is implemented as a modified hash table that stores only keys without values. This grants $O(1)$ constant-time membership testing (`item in my_set`) and empowers developers with instantaneous mathematical operations like unions (`|`), intersections (`&`), and symmetric differences (`^`).

---

عندما يتعرف المبرمج المبتدئ على الصفوف في بايثون (`tuple`)، يتبادر إلى ذهنه فوراً أنها مجرد "قوائم للقراءة فقط". فكلاهما يخزن عناصر مرتبة، وكلاهما يدعم الفهرسة `seq[0]`، والتقطيع `seq[1:3]`، والتكرار الحلقي. لكن في المعمارية البرمجية وهندسة الذاكرة، يؤدي كل منهما غرضاً مختلفاً جذرياً.

القائمة هي **عربة تسوق ديناميكية ذات جوانب قابلة للتمدد**؛ صُممت للبيانات المتجانسة ذات الأطوال المتغيرة التي تحتاج للإضافة والحذف وإعادة الترتيب باستمرار. أما الصف (`tuple`) فهو **صندوق شحن خشبي مصفح ومختوم**؛ يمثل سجلاً بياناتياً بنيوياً ثابت الأبعاد غير متجانس الأنواع—تماماً مثل صف وحيد في جدول قاعدة بيانات SQL أو بنية `struct` في C (مثل: `("Alice", 30, "Engineer")`).

ولأن حجم الصف يتجمد نهائياً في لحظة ولادته، يستمثله CPython بقوة خارقة في الذاكرة. فعلى خلاف القائمة، لا يحجز الصف أي خانات ذاكرية فائضة للمستقبل. يستهلك الصف الفارغ 40 بايتاً فقط في معالجات 64 بت مقارنة بـ 56 بايتاً للقائمة الفارغة. والأهم من ذلك: يحتفظ بايثون داخلياً بـ **قوائم إعادة تدوير مجانية (Freelists)** للصفوف الصغيرة؛ فعند حذف صف صغير، لا تُعاد ذاكرته للنظام، بل يُعاد استخدامه فوراً للصف التالي لتسريع الحجز وتجنب تشتت الذاكرة.

ومع ذلك، يجب على كل مهندس الحذر من أشهر فخ معماري في بايثون: **اللاقابلية للتعديل في بايثون سطحية بحتة (Shallow Immutability)!** معنى ثبات الصف هو أن شريط عناوين الذاكرة (المؤشرات) التي يحملها بداخله مقفل لا يمكن استبداله. ولكن إذا كان أحد تلك المؤشرات يشير إلى كائن *قابل للتعديل*—مثل قائمة—فإن محتويات تلك القائمة الداخلية يمكن تعديلها في مكانها بحرية! الصندوق الخشبي لا يستطيع تبديل الغرف التي يشير إليها، لكن يمكن لأي شخص داخل الغرفة أن يغير أثاثها! ولهذا السبب، لا يكون الصف قابلاً للتجزئة (Hashable) وصالحاً كمفتاح قاموس إلا إذا كانت *كافة* عناصره الداخلية مجمدة وغير قابلة للتعديل بدورها.

أما **المجموعة (`set`)**، فهي بنية مستلهمة مباشرة من نظرية المجموعات الرياضية. تُبنى المجموعة كجدول تجزئة مخصص يخزن المفاتيح فقط دون أي قيم مرافقة. يمنح هذا الهيكل فحص انتماء لحظي بزمن ثابت $O(1)$ (`x in my_set`)، ويدعم العمليات الجبرية الفائقة كالتقاطع والاتحاد والفرق التناظري بسرعة استثنائية.

### Jargon Decoder / جدول فك شفرة المصطلحات

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Tuple** (الصف) | A sealed cargo crate holding fixed, heterogeneous data fields that cannot be rearranged. | صندوق شحن مصفح ومختوم يحمل حقول بيانات ثابتة ومتباينة لا يمكن تبديلها. |
| **Shallow Immutability** (الثبات السطحي) | Locking the crate's address list without locking the furniture inside the referenced houses. | قفل قائمة العناوين داخل الصندوق دون قفل الأثاث الموجود داخل المنازل المشار إليها. |
| **Freelist Recycling** (إعادة تدوير القوائم المجانية) | Keeping empty boxes stacked on a shelf instead of manufacturing new ones from raw lumber. | الاحتفاظ بالصناديق الفارغة على رف قريب لإعادة استخدامها فوراً بدلاً من تصنيع جديدة. |
| **Hashable Contract** (عقد القابلية للتجزئة) | A lifetime promise that an object's contents will never change, keeping its mailbox ID permanent. | وعد قاطع بأن محتويات الكائن لن تتغير أبداً، مما يبقي رقم صندوق بريده ثابتاً دائماً. |
| **Set** (المجموعة) | A unique keychain where duplicate keys are rejected and any key is found in 1 step. | حلقة مفاتيح فريدة ترفض التكرار وتتيح العثور على أي مفتاح في خطوة واحدة فورية. |

### Visual Step-by-Step Data Transformation / التحول البصري للبيانات

```text
Demonstrating Shallow Immutability vs Deep Freezing:

Case 1: Shallow Immutability Trap
  t = (1, [2, 3])
  +-------------------------------------+
  | PyTupleObject                       |
  |   slot 0: 1 (int - immutable)       |
  |   slot 1: --------------------+     |
  +-------------------------------|-----+
                                  v
                       +----------------------+
                       | PyListObject [2, 3]  |  <-- Can mutate via t[1].append(4)!
                       +----------------------+
  t[1].append(4) mutates the list to [2, 3, 4]!
  hash(t) -> FAILS with TypeError: unhashable type: 'list'!

Case 2: Recursive Deep-Freezing to Hashable Structure
  Input: obj = [1, [2, 3], {"role": "admin"}]

  Step 1: Inspect leaf 1 -> int -> keep 1
  Step 2: Inspect [2, 3] -> list -> recursively freeze to tuple: (2, 3)
  Step 3: Inspect {"role": "admin"} -> dict -> freeze items to frozenset({("role", "admin")})
  Step 4: Package outer list into tuple:
          Result = (1, (2, 3), frozenset({("role", "admin")}))

  Output: 100% recursively immutable and hashable! hash(Result) succeeds!
```

:::simulation-widget{engine="canvas2d" component="RecursionTreeExplorer"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Invariants Demystified / الأسس الرياضية واللامتغيرات الصارمة

$$
\text{sizeof}(\text{tuple}_n) = 40 + 8n \text{ bytes}, \quad \text{sizeof}(\text{list}_n) = 56 + 8 \cdot \text{allocated}, \quad \text{Shallow Immutability}
$$

### Architectural Breakdown: Tuple vs List vs Set

| Data Structure / بنية البيانات | Header Size / حجم الترويسة | Headroom Slots | Memory for $N=10$ Elements | Membership Lookup |
| :--- | :--- | :--- | :--- | :--- |
| `tuple` | **40 bytes** | **0 slots** (exact fit) | $40 + 8(10) = \mathbf{120 \text{ bytes}}$ | $\mathcal{O}(N)$ linear scan |
| `list` | **56 bytes** | **6 spare slots** (allocated=16) | $56 + 8(16) = \mathbf{184 \text{ bytes}}$ | $\mathcal{O}(N)$ linear scan |
| `set` | **224 bytes** (8-slot table) | Power-of-two table | $224 + 8(16) = \mathbf{352 \text{ bytes}}$ | $\mathcal{O}(1)$ instant hash lookup |

### Step-by-Step Execution Cost & Complexity Breakdown / تفكيك التكلفة الحسابية خطوة بخطوة

#### 1. Why Tuples Save 35% to 50% Memory in Large Data Pipelines
- Constructing a tuple with $N=100$ records:
  - Memory: $40 + 8(100) = 840$ bytes.
- Constructing a list with $N=100$ records:
  - List over-allocates capacity: allocated $= 100 + (100 \gg 3) + 6 = 118$ slots.
  - Memory: $56 + 8(118) = 1,000$ bytes.
- For 10,000,000 rows in memory, using tuples over lists saves **over 1.6 Gigabytes** of heap memory!

#### 2. The Arithmetic of Set Membership: `x in s` vs `x in lst`
- In `lst`: must scan up to $N$ elements and compare each: Cost $= N \times (\text{pointer fetch} + \text{equality test}) = \mathcal{O}(N)$.
- In `set`: compute `hash(x)`, mask index, probe 1 slot: Cost $= 1 \times (\text{hash} + \text{slot check}) = \mathcal{O}(1)$ (~20 ns).
- For $N = 1,000,000$, checking `x in s` is **50,000 times faster** than checking `x in lst`.

---

## Beat 3: Guided Code Challenge / التحدي البرمجي الموجه

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
    Recursively transforms mutable Python data structures (lists, dicts, sets)
    into fully immutable, hashable equivalents:
      - list -> tuple
      - dict -> frozenset of (key, frozen_val) pairs
      - set  -> frozenset of frozen items
      - primitives (int, str, float, etc.) -> preserved as-is

    Args:
        obj: An arbitrary nested Python data structure.

    Returns:
        The recursively immutable and hashable version of the object.
    """
    # Step 1: Base case for list sequences -> recursively freeze into tuple
    if isinstance(obj, list):
        return tuple(deep_freeze(item) for item in obj)

    # Step 2: Base case for dictionaries -> freeze into frozenset of (key, frozen_val) pairs
    if isinstance(obj, dict):
        return frozenset((key, deep_freeze(val)) for key, val in obj.items())

    # Step 3: Base case for sets -> freeze into frozenset
    if isinstance(obj, set):
        return frozenset(deep_freeze(item) for item in obj)

    # Step 4: Primitives and already-immutable objects (str, int, float, bool, None)
    return obj
```
:::

## Beat 4: Real-World Transfer Scenario / سيناريو التطبيق ونقل المعرفة

### Reality Check: The Mutated Tuple Dictionary Key Crash

A financial pricing engine attempts to use a transaction identifier as a dictionary key:
```python
transaction_key = ("TX_1001", [100.0, "USD"])
cache = {}
cache[transaction_key] = "Approved"
```
When this line executes, Python immediately aborts with:
`TypeError: unhashable type: 'list'`.
The developer complains: "I used a tuple! Why is Python complaining about a list?"

*حاول محرك تسعير مالي استخدام معرف معاملة مركب كمفتاح في قاموس الذاكرة المؤقتة. انهار الكود فوراً بخطأ `TypeError: unhashable type: 'list'`. احتار المطور متسائلاً: لقد استخدمت صفاً (tuple)! فلماذا يشتكي بايثون من القائمة؟*

:::transfer-quiz
**Question / السؤال:**
Why does Python reject `transaction_key` even though the top-level container is a tuple?
*لماذا يرفض بايثون المفتاح على الرغم من أن الحاوية الخارجية هي صف (tuple)؟*

- [x] Immutability is shallow: computing the tuple's hash requires recursively hashing all constituent elements; encountering the mutable list inside triggers a TypeError.
  *اللاقابلية للتعديل سطحية: يتطلب حساب شفرة تجزئة الصف تجزئة كافة عناصره الداخلية تكرارياً؛ وعند الوصول للقائمة القابلة للتعديل بداخلها ينهار الحساب بخطأ TypeError.*
- [ ] Tuples can never be used as dictionary keys in Python under any circumstances.
  *لا يمكن استخدام الصفوف كمفاتيح للقواميس في بايثون تحت أي ظرف.*
- [ ] Floating-point numbers like 100.0 are inherently unhashable in Python.
  *الأرقام العشرية مثل 100.0 غير قابلة للتجزئة بطبيعتها في بايثون.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** A tuple's immutability is strictly shallow. To insert a tuple into a hash table or dictionary, Python must execute `hash(t)`. The C implementation iterates through each element pointer and combines their hash codes using the recurrence `acc = (acc ^ hash(item)) * 1000003`. When Python calls `hash()` on the second element (`[100.0, "USD"]`), CPython discovers that `list` has `__hash__ = None` and raises a `TypeError`. To fix this, freeze the inner list into a tuple as well: `transaction_key = ("TX_1001", (100.0, "USD"))`.
*اللاقابلية للتعديل في الصفوف سطحية بحتة. لإدراج الصف في جدول التجزئة، يجب على بايثون حساب `hash(t)`، مما يدفعه لحساب شفرة تجزئة كل عنصر بداخله ودمجها حسابياً. وعند الوصول للعنصر الثاني يكتشف بايثون أنه قائمة قابلة للتعديل ذات شفرة ملغاة (`__hash__ = None`) فينهار فوراً. والحل هو تجميد القائمة الداخلية لتصبح صفاً بدورها: `("TX_1001", (100.0, "USD"))`.*

**Incorrect / مشتت غير صحيح:** Tuples containing solely immutable elements (e.g., strings, ints, floats) are fully hashable and frequently used as compound dictionary keys.
*الصفوف التي تحوي عناصر مجمدة حصراً هي كائنات مجمدة صالحة تماماً كمفاتيح مركبة للقواميس.*

**Incorrect / مشتت غير صحيح:** Floats in Python are completely immutable and fully hashable (`hash(100.0)` produces a valid integer).
*الأرقام العشرية كائنات مجمدة وقابلة للتجزئة بشكل سليم تماماً.*
:::
