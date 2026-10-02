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

How can Python retrieve a specific value among 10,000,000 keys in under a microsecond? If Python had to scan through pairs sequentially like a list, checking whether `key == target_key`, lookup time would grow linearly ($O(N)$), crawling to a complete standstill on modern big data workloads. Instead, Python's core data structure—the dictionary (`dict`)—achieves breathtaking **average-case $O(1)$ constant time lookup**.

The secret lies in the **post office mailbox analogy**. Imagine a post office with thousands of private mailboxes numbered from $0$ to $M-1$. When a letter arrives addressed to a person's name (the dictionary key), the postmaster does not search through every resident in the city. Instead, they drop the name into a deterministic mathematical blender: the **Hash Function** `hash(key)`. The blender scrambles the letters and instantly produces a single integer. The postmaster computes `hash(key) % M` to find the exact mailbox number and walks straight to that box in a single step!

What happens when two completely different keys produce the exact same mailbox number? This inevitable event is called a **Hash Collision**. Unlike other languages that chain colliding items into linked lists (separate chaining), CPython uses **open addressing with pseudo-random perturbation**. If mailbox $i$ is already occupied by a different key, Python does not check the neighbor $i+1$ (which causes catastrophic clustering). Instead, it applies a bitwise perturbation recurrence: $i_{t+1} = (5 \cdot i_t + \text{perturb} + 1) \pmod M$, scrambling the bits of the original hash to hop across the table until it lands on an empty slot or finds the matching key.

Before Python 3.6, dictionaries were notoriously memory-hungry: they stored large 24-byte structs `(hash, key_ptr, val_ptr)` directly inside a sparse table where up to two-thirds of the slots were empty `NULL` space. Starting in Python 3.6 (designed by Raymond Hettinger), CPython overhauled dictionaries into a **compact, insertion-ordered architecture**. The dictionary was split into two separate structures: a tiny sparse array of 1-byte indices, and a densely packed array of `entries` in the exact order they were inserted! This revolutionary redesign slashed dictionary memory consumption by 30% to 40% and guaranteed that dictionaries preserve insertion order by default.

To preserve $O(1)$ performance, the dictionary must never become overly crowded. CPython enforces a strict **Load Factor threshold**: $\alpha = N / M \le 2/3$. The instant the sparse table becomes more than two-thirds full, CPython allocates a table that is 2x or 4x larger, re-indexes the entries, and preserves the lightning-fast lookup speed that powers the entire Python runtime.

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

```text
Compact Dict Architecture (Python 3.6+):
Sparse Hash Indices Table (Size M = 8):
  [ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 ]
  [-1 | 0 |-1 | 1 |-1 |-1 | 2 |-1 ]  <-- Only 1 byte per slot (int8)
        |       |           |
        v       v           v
Dense Entries Array (Insertion Ordered):
  Row 0: hash=0x3a1f, key="alpha", val=100
  Row 1: hash=0x9b4c, key="beta",  val=200
  Row 2: hash=0x110e, key="gamma", val=300
```

كيف يتمكن بايثون من استرجاع قيمة مفتاح محدد من بين 10 ملايين عنصر في أقل من ميكروثانية واحدة؟ لو كان بايثون يفحص أزواج المفاتيح تتابعياً كما تفعل القوائم العادية لمقارنة `key == target`، لتدهور زمن البحث خطياً ($O(N)$) ولتجمدت معالجة البيانات الضخمة تماماً. لكن الهيكل الأهم والأقوى في بايثون—القاموس (`dict`)—يحقق إنجازاً مذهلاً: **زمن استرجاع متوسط ثابت $O(1)$**!

يكمن السر في **تشبيه صناديق البريد في مكاتب البريد المركزية**. تخيل مكتب بريد يحتوي على آلاف الصناديق المرقمة من $0$ إلى $M-1$. عندما تصل رسالة تحمل اسماً نصياً معيناً (مفتاح القاموس)، لا يبحث موظف البريد في سجل سكان المدينة فرداً فرداً. بل يلقي الاسم في خلاط رياضي حتمي فائق السرعة يُدعى **دالة التجزئة** `hash(key)`. يمزج الخلاط حروف الاسم وينتج رقماً صحيحاً فريداً، ثم يحسب الموظف باقي القسمة `hash(key) % M` ليحدد رقم الصندوق المنشود مباشرة ويمشي إليه في خطوة واحدة ثابتة!

ماذا يحدث حين ينتج مفتاحان مختلفان تماماً نفس رقم الصندوق بالصدفة؟ يُسمى هذا الحدث الحتمي **تصادم التجزئة** (Hash Collision). وعلى خلاف بعض اللغات التي تبني سلاسل مرتبطة عند كل صندوق متصادم، يتبع CPython أسلوب **العنونة المفتوحة مع الاضطراب شبه العشوائي** (Open Addressing with Perturbation). فإذا وجد بايثون الصندوق $i$ مشغولاً، لا يفحص الصندوق المجاور $i+1$ (لأن ذلك يسبب تكتلاً خانقاً للبيانات)، بل يطبق معادلة رياضية ذكية: $i_{t+1} = (5 \cdot i_t + \text{perturb} + 1) \pmod M$، فيقفز برشاقة عبر أرجاء الجدول حتى يجد خانة شاغرة أو يعثر على المفتاح المطابق.

قبل إصدار بايثون 3.6، كانت القواميس تستهلك مساحات هائلة من الذاكرة؛ إذ كانت تخزن هياكل ضخمة من 24 بايت تحوي `(hash, key, value)` مباشرة داخل جدول متناثر ثلثاه فراغات فارغة (`NULL`). لكن ابتداءً من بايثون 3.6، أعاد المطور ريموند هيتنجر تصميم القواميس لتصبح **مضغوطة ومرتبة زمنياً** (Compact and Insertion-Ordered). فُصل القاموس إلى جدولين: مصفوفة فهارس صغيرة جداً تستهلك بايتاً واحداً لكل خانة، ومصفوفة مدخلات مرصوصة بكثافة تحوي البيانات بترتيب إدخالها الفعلي! هذا التحول العبقري وفر ما بين 30% إلى 40% من استهلاك الذاكرة وجعل القواميس تحافظ على ترتيب الإدخال افتراضياً.

وللحفاظ على كفاءة الـ $O(1)$ الخارقة، يمنع بايثون امتلاء الجدول إلى حدوده القصوى؛ حيث يفرض سقفاً صارماً يُدعى **معامل التحميل** (Load Factor): $\alpha = N / M \le 2/3$. فبمجرد أن يمتلئ ثلثا خانات الجدول المتناثر، يضاعف بايثون حجم الجدول فوراً بمقدار مرتين أو أربع مرات، ويعيد توزيع الفهارس ليضمن بقاء سرعة الاسترجاع ثابتة وفورية.

#### Architectural Breakdown & Hash Invariants:
- **Hash Table Invariant**: If $a == b$, then $\text{hash}(a)$ MUST equal $\text{hash}(b)$. Any custom class defining `__eq__` must implement `__hash__` to satisfy this contract.
- **Why Mutable Objects are Unhashable**: A list's contents can change over time. If a list were permitted as a key, mutating it would alter its hash code, leaving the entry permanently lost in the wrong hash bucket! Python prevents this by setting `__hash__ = None` on mutable types.
- **Perturbation Formula Dynamics**: Shifting `perturb >>= 5` on every probe step incorporates the high-order bits of the 64-bit hash into the probe sequence, guaranteeing that all slots in the power-of-two table will eventually be visited without infinite loops.

#### التحليل المعماري وثوابت التجزئة:
- **ثابت عقد التجزئة**: إذا تساوى كائنان في القيمة $a == b$، فيجب حتماً أن تتطابق شفرة تجزئتهما $\text{hash}(a) == \text{hash}(b)$. وأي صنف يعرف `__eq__` يجب أن يلتزم بتعريف `__hash__`.
- **لماذا تُمنع الكائنات القابلة للتعديل من التجزئة**: محتوى القائمة يتغير باستمرار. فلو استُخدمت كمفتاح وعُدلت لاحقاً، لتغيرت شفرة تجزئتها، ولأصبح العثور عليها في صندوقها القديم مستحيلاً! لذلك يعطل بايثون تجزئة القوائم بجعل `__hash__ = None`.
- **ديناميكية صيغة الاضطراب**: تعمل إزاحة بتات الاضطراب `perturb >>= 5` عند كل خطوة على دمج البتات العليا للمفتاح، مما يضمن زيارة خانات الجدول دون الوقوع في حلقات مفرغة.

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
    # Step 1: Initialize the probe path log and set perturbation register
    probes: list[int] = []
    perturb = hash_value

    # Step 2: Compute initial index using modulo table size
    idx = hash_value % table_size
    probes.append(idx)

    # Step 3: Iterate through collision perturbation formula
    for _ in range(max_steps - 1):
        idx = (5 * idx + perturb + 1) % table_size
        probes.append(idx)
        # Step 4: Shift perturbation register right by 5 bits to expose upper entropy
        perturb >>= 5

    # Step 5: Return full sequence of probed mailbox indices
    return probes
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Why does attempting to use a Python list as a dictionary key raise `TypeError: unhashable type: 'list'`?
*لماذا تطلق محاولة استخدام قائمة بايثون كمفتاح في القاموس خطأ `TypeError: unhashable type: 'list'`؟*

- [x] Lists are mutable; if a list mutated while serving as a key, its hash code would change, making its entry permanently unlocatable in the hash table.
  *القوائم قابلة للتعديل؛ فلو عُدلت القائمة أثناء وجودها كمفتاح لتغيرت شفرة تجزئتها، مما يجعل العثور عليها في جدول التجزئة مستحيلاً.*
- [ ] Because lists contain pointers and CPython hash functions can only process primitive integers.
  *لأن القوائم تحوي مؤشرات ودوال التجزئة تقبل الأرقام البسيطة فقط.*
- [ ] Because lists do not implement the `__eq__` equality method.
  *لأن القوائم لا تنفذ دالة المقارنة `__eq__`.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Hash tables rely on an immutable key invariant: the hash of a key must never change during its lifetime in the dictionary. If Python allowed lists as keys, running `my_list.append(99)` would alter the list's logical value. When you subsequently attempted `dict[my_list]`, Python would compute the new hash, search a completely different mailbox slot, and fail to find the entry—corrupting the data structure. If you need a sequence as a key, convert it to an immutable `tuple`.
*تعتمد جداول التجزئة على مبدأ ثبات المفتاح: يجب ألا تتغير شفرة تجزئة المفتاح طوال فترة بقائه في القاموس. فلو سُمح للقائمة بأن تكون مفتاحاً، فإن إضافة عنصر إليها `append(99)` سيغير قيمتها الحسابية، وعند البحث عنها لاحقاً سيتوجه بايثون إلى صندوق مختلف تماماً ولن يعثر على البيانات أبداً! وإن كنت بحاجة لتسلسل كمفتاح، فاستخدم الصفوف الثابتة `tuple`.*

**Incorrect / مشتت غير صحيح:** Tuples are also collections of pointers to heap objects, yet tuples are fully hashable as long as all their contained elements are immutable.
*الصفوف تحوي مؤشرات لكائنات أيضاً، ومع ذلك فهي قابلة للتجزئة ما دامت جميع عناصرها الداخلية غير قابلة للتعديل.*

**Incorrect / مشتت غير صحيح:** Lists implement `__eq__` perfectly for element-wise comparison; CPython explicitly sets their `__hash__ = None` slot to intentionally disable hashing.
*القوائم تنفذ دالة `__eq__` لمقارنة العناصر، لكن بايثون يعطل التجزئة فيها صراحة بتعيين `__hash__ = None` لحماية سلامة النظام.*
:::
