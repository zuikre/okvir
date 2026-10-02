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

## Beat 1: Intuition & Mental Model / الحدس والنموذج الذهني

How can Python retrieve a specific value among 10,000,000 keys in under a microsecond? If Python had to scan through pairs sequentially like a list, checking whether `key == target_key`, lookup time would grow linearly ($O(N)$), crawling to a complete standstill on modern big data workloads. Instead, Python's core data structure—the dictionary (`dict`)—achieves breathtaking **average-case $O(1)$ constant time lookup**.

The secret lies in the **post office mailbox analogy**. Imagine a post office with thousands of private mailboxes numbered from $0$ to $M-1$. When a letter arrives addressed to a person's name (the dictionary key), the postmaster does not search through every resident in the city. Instead, they drop the name into a deterministic mathematical blender: the **Hash Function** `hash(key)`. The blender scrambles the letters and instantly produces a single integer. The postmaster computes `hash(key) % M` to find the exact mailbox number and walks straight to that box in a single step!

What happens when two completely different keys produce the exact same mailbox number? This inevitable event is called a **Hash Collision**. Unlike other languages that chain colliding items into linked lists (separate chaining), CPython uses **open addressing with pseudo-random perturbation**. If mailbox $i$ is already occupied by a different key, Python does not check the neighbor $i+1$ (which causes catastrophic clustering). Instead, it applies a bitwise perturbation recurrence: $i_{t+1} = (5 \cdot i_t + \text{perturb} + 1) \pmod M$, scrambling the bits of the original hash to hop across the table until it lands on an empty slot or finds the matching key.

Before Python 3.6, dictionaries were notoriously memory-hungry: they stored large 24-byte structs `(hash, key_ptr, val_ptr)` directly inside a sparse table where up to two-thirds of the slots were empty `NULL` space. Starting in Python 3.6 (designed by Raymond Hettinger), CPython overhauled dictionaries into a **compact, insertion-ordered architecture**. The dictionary was split into two separate structures: a tiny sparse array of 1-byte indices, and a densely packed array of `entries` in the exact order they were inserted! This revolutionary redesign slashed dictionary memory consumption by 30% to 40% and guaranteed that dictionaries preserve insertion order by default.

To preserve $O(1)$ performance, the dictionary must never become overly crowded. CPython enforces a strict **Load Factor threshold**: $\alpha = N / M \le 2/3$. The instant the sparse table becomes more than two-thirds full, CPython allocates a table that is 2x or 4x larger, re-indexes the entries, and preserves the lightning-fast lookup speed that powers the entire Python runtime.

---

كيف يتمكن بايثون من استرجاع قيمة مفتاح محدد من بين 10 ملايين عنصر في أقل من ميكروثانية واحدة؟ لو كان بايثون يفحص أزواج المفاتيح تتابعياً كما تفعل القوائم العادية لمقارنة `key == target`، لتدهور زمن البحث خطياً ($O(N)$) ولتجمدت معالجة البيانات الضخمة تماماً. لكن الهيكل الأهم والأقوى في بايثون—القاموس (`dict`)—يحقق إنجازاً مذهلاً: **زمن استرجاع متوسط ثابت $O(1)$**!

يكمن السر في **تشبيه صناديق البريد في مكاتب البريد المركزية**. تخيل مكتب بريد يحتوي على آلاف الصناديق المرقمة من $0$ إلى $M-1$. عندما تصل رسالة تحمل اسماً نصياً معيناً (مفتاح القاموس)، لا يبحث موظف البريد في سجل سكان المدينة فرداً فرداً. بل يلقي الاسم في خلاط رياضي حتمي فائق السرعة يُدعى **دالة التجزئة** `hash(key)`. يمزج الخلاط حروف الاسم وينتج رقماً صحيحاً فريداً، ثم يحسب الموظف باقي القسمة `hash(key) % M` ليحدد رقم الصندوق المنشود مباشرة ويمشي إليه في خطوة واحدة ثابتة!

ماذا يحدث حين ينتج مفتاحان مختلفان تماماً نفس رقم الصندوق بالصدفة؟ يُسمى هذا الحدث الحتمي **تصادم التجزئة** (Hash Collision). وعلى خلاف بعض اللغات التي تبني سلاسل مرتبطة عند كل صندوق متصادم، يتبع CPython أسلوب **العنونة المفتوحة مع الاضطراب شبه العشوائي** (Open Addressing with Perturbation). فإذا وجد بايثون الصندوق $i$ مشغولاً، لا يفحص الصندوق المجاور $i+1$ (لأن ذلك يسبب تكتلاً خانقاً للبيانات)، بل يطبق معادلة رياضية ذكية: $i_{t+1} = (5 \cdot i_t + \text{perturb} + 1) \pmod M$، فيقفز برشاقة عبر أرجاء الجدول حتى يجد خانة شاغرة أو يعثر على المفتاح المطابق.

قبل إصدار بايثون 3.6، كانت القواميس تستهلك مساحات هائلة من الذاكرة؛ إذ كانت تخزن هياكل ضخمة من 24 بايت تحوي `(hash, key, value)` مباشرة داخل جدول متناثر ثلثاه فراغات فارغة (`NULL`). لكن ابتداءً من بايثون 3.6، أعاد المطور ريموند هيتنجر تصميم القواميس لتصبح **مضغوطة ومرتبة زمنياً** (Compact and Insertion-Ordered). فُصل القاموس إلى جدولين: مصفوفة فهارس صغيرة جداً تستهلك بايتاً واحداً لكل خانة، ومصفوفة مدخلات مرصوصة بكثافة تحوي البيانات بترتيب إدخالها الفعلي! هذا التحول العبقري وفر ما بين 30% إلى 40% من استهلاك الذاكرة وجعل القواميس تحافظ على ترتيب الإدخال افتراضياً.

وللحفاظ على كفاءة الـ $O(1)$ الخارقة، يمنع بايثون امتلاء الجدول إلى حدوده القصوى؛ حيث يفرض سقفاً صارماً يُدعى **معامل التحميل** (Load Factor): $\alpha = N / M \le 2/3$. فبمجرد أن يمتلئ ثلثا خانات الجدول المتناثر، يضاعف بايثون حجم الجدول فوراً بمقدار مرتين أو أربع مرات، ويعيد توزيع الفهارس ليضمن بقاء سرعة الاسترجاع ثابتة وفورية.

### Jargon Decoder / جدول فك شفرة المصطلحات

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Hash Function** (دالة التجزئة) | A mathematical blender turning any key into a deterministic integer box number. | خلاط رياضي حتمي يحول أي مفتاح نصي إلى رقم صندوق صحيح فريد بدقة. |
| **Hash Collision** (تصادم التجزئة) | When two different people accidentally get assigned the exact same mailbox number. | عندما ينتج مفتاحان مختلفان نفس رقم الصندوق بالصدفة الرياضية المحتومة. |
| **Open Addressing** (العنونة المفتوحة) | Hopping to another available mailbox in the building rather than chaining extra bags. | القفز إلى صندوق شاغر بديل في نفس المبنى بدلاً من تعليق أكياس إضافية ملحقة. |
| **Perturbation** (الاضطراب العشوائي) | Scrambling high-order hash bits to hop unpredictably across the table without clumping. | خلط بتات التجزئة العليا للقفز عبر أرجاء الجدول لتفادي التكتل الخانق. |
| **Compact Dict Layout** (القاموس المضغوط) | Splitting a tiny index directory from dense data rows to save 40% heap space. | فصل دليل فهارس صغير عن صفوف البيانات المرصوصة لتوفير 40% من حجم الذاكرة. |
| **Load Factor ($\alpha \le 2/3$)** (معامل التحميل) | The 66% occupancy limit that triggers building an expanded post office. | سقف الإشغال (امتلاء ثلثي الخانات) الذي يفرض مضاعفة حجم الجدول فوراً. |

### Visual Step-by-Step Data Transformation / التحول البصري للبيانات

```text
Inserting key="gamma" into Compact Dict (M=8):
  hash("gamma") = 0x9b42 (Ends in binary 010 -> index 2)

Step 1: Check Sparse Hash Indices Table at Slot 2
  Sparse Table (Size M=8):
  Slot:  [  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 ]
  Index: [ -1 |  0 |  1 | -1 | -1 | -1 | -1 | -1 ]
  Slot 2 contains '1' -> OCCUPIED by key "beta"! (COLLISION OCCURS!)

Step 2: Calculate Perturbation Hop
  Formula: i = (5 * 2 + perturb + 1) & 7
  Let perturb = 0x9b42: hop lands on Slot 5!

Step 3: Probe Sparse Table at Slot 5
  Slot 5 contains '-1' -> EMPTY SLOT FOUND!
  We assign Slot 5 to point to the next free row in the Dense Entries Array: Row 2!

Step 4: Update Both Tables
  Sparse Table:
  Slot:  [  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 ]
  Index: [ -1 |  0 |  1 | -1 | -1 |  2 | -1 | -1 ]
                                     |
                                     v
  Dense Entries Array:
  Row 0: hash=0x1100, key="alpha", value=100
  Row 1: hash=0x4202, key="beta",  value=200
  Row 2: hash=0x9b42, key="gamma", value=300  <-- Appended neatly in insertion order!
```

:::simulation-widget{engine="canvas2d" component="DynamicArrayGrowthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Invariants Demystified / الأسس الرياضية واللامتغيرات الصارمة

$$
i_0 = \text{hash}(\text{key}) \pmod M, \quad i_{t+1} = (5 \cdot i_t + \text{perturb} + 1) \pmod M, \quad \text{Load Factor } \alpha \le \frac{2}{3}
$$

### Mathematical Invariants & Structural Contract

| Property / الخاصية | Mathematical Formulation | Architectural Enforcement | Consequence if Violated |
| :--- | :--- | :--- | :--- |
| Equality-Hash Invariant | $a == b \implies \text{hash}(a) == \text{hash}(b)$ | Enforced by CPython type system | Inconsistent lookups; keys lost in wrong buckets |
| Immutability Requirement | $\Delta \text{payload}_{\text{key}} = \emptyset$ | Mutable types set `__hash__ = None` | `TypeError: unhashable type: 'list'` |
| Power-of-Two Modulo | $M = 2^k \implies \text{hash} \pmod M = \text{hash} \ \& \ (M - 1)$ | Single bitwise AND replaces costly division | Instantaneous index calculation in 1 CPU cycle |

### Step-by-Step Execution Cost & Complexity Breakdown / تفكيك التكلفة الحسابية خطوة بخطوة

#### 1. Dictionary Key Lookup: `d["gamma"]`
- **Step 1 (Hash Generation)**: Compute string hash `hash("gamma")`: **~5-10 CPU cycles** (cached in string header after first computation).
- **Step 2 (Mask Index)**: Calculate initial slot `i = hash & (M - 1)`: **1 bitwise AND** ($O(1)$).
- **Step 3 (Sparse Table Read)**: Fetch integer index from sparse array: **1 memory read** (1 byte).
- **Step 4 (Collision Probe / Identity Check)**:
  - If slot $=-1$: Key does not exist -> raise `KeyError` ($O(1)$).
  - If occupied: Compare hash and pointer identity: `entry->hash == hash && (entry->key == key || PyObject_RichCompareBool)`.
- **Total Arithmetic Cost**: Average $\mathcal{O}(1)$ time, ~15-25 CPU cycles.

#### 2. Re-sizing & Compaction Latency
- When active entries $N > \frac{2}{3} M$, table expands to $2M$ or $4M$.
- Rebuilding the sparse table takes $O(N)$ operations, but occurs only every $\mathcal{O}(N)$ insertions.
- **Amortized Cost per Insertion**: Strictly $\mathcal{O}(1)$ time.

---

## Beat 3: Guided Code Challenge / التحدي البرمجي الموجه

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
        hash_value: The precomputed integer hash code of the key.
        table_size: Size of the sparse indices array (must be power of two).
        max_steps: Maximum number of probe hops to record.

    Returns:
        List of integer bucket indices probed in sequence.
    """
    # Step 1: Compute initial bucket offset using bitwise mask
    mask = table_size - 1
    current_index = hash_value & mask
    perturb = hash_value

    probe_sequence = [current_index]

    # Step 2: Iterate through collision perturbation recurrence
    while len(probe_sequence) < max_steps:
        # CPython's perturbation recurrence formula
        current_index = (5 * current_index + perturb + 1) & mask
        probe_sequence.append(current_index)
        # Shift perturbation to incorporate high-order hash bits
        perturb >>= 5

    # Step 3: Return generated probe sequence
    return probe_sequence
```
:::

## Beat 4: Real-World Transfer Scenario / سيناريو التطبيق ونقل المعرفة

### Reality Check: The Mutable Object Key Trap

A backend developer builds a user permissions lookup table:
```python
user_roles = {}
admin_group = ["alice", "bob"]

user_roles[admin_group] = "Administrator"
```
When this code executes, Python immediately aborts with:
`TypeError: unhashable type: 'list'`.
Why does Python strictly forbid using lists as dictionary keys?

*حاول مطور برمجيات استخدام قائمة أسماء مستخدمين كمفتاح داخل قاموس للصلاحيات، ففشل الكود فوراً بخطأ `TypeError: unhashable type: 'list'`. ما هو السبب المعماري الفيزيائي الذي يجبر بايثون على حظر القوائم كمفاتيح للقواميس؟*

:::transfer-quiz
**Question / السؤال:**
Why are mutable objects unhashable in Python?
*لماذا تحظر لغة بايثون استخدام الكائنات القابلة للتعديل كمفاتيح تجزئة؟*

- [x] If a mutable list were mutated after insertion, its hash value would change, stranding the key in the wrong bucket and making retrieval permanently impossible.
  *لو سُمح باستخدام القائمة كمفتاح ثم عُدلت لاحقاً، لتغيرت شفرة تجزئتها بالكامل، مما يترك الكائن مهجوراً في الصندوق الخطأ ويجعل استرجاعه مستحيلاً للأبد.*
- [ ] Lists consume too many bytes of RAM to fit inside the 64-bit sparse index table.
  *تستهلك القوائم بايتات ذاكرة ضخمة لا تتسع داخل خانة الـ 64 بت في جدول الفهارس.*
- [ ] Python dictionaries only allow string and integer keys by language specification.
  *تقتصر قواميس بايثون على المفاتيح النصية والرقمية فقط وفق مواصفات اللغة القياسية.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** A hash table operates on a fundamental mathematical invariant: the key's hash value must remain perfectly constant over its entire lifetime. If a `list` were allowed as a key, calling `admin_group.append("charlie")` would alter its contents. When you later run `user_roles[admin_group]`, Python would recompute `hash(admin_group)`, calculate a completely different mailbox index, and fail to find the entry—even though it exists in memory! To prevent this phantom data loss bug, Python sets `__hash__ = None` on all mutable containers, requiring immutable containers like `tuple` instead.
*يقوم جدول التجزئة على ثابت رياضي جوهري: شفرة تجزئة المفتاح يجب أن تظل ثابتة تماماً طوال دورة حياته. فلو سُمح بالقائمة كمفتاح، فإن إضافة عنصر جديد `admin_group.append("charlie")` ستغير محتواها الداخلي. وعند محاولة استرجاع الصلاحية لاحقاً، سيحسب بايثون شفرة تجزئة جديدة كلياً وصندوقاً مختلفاً ولن يعثر على البيانات أبداً! لحماية المطورين، يلغي بايثون دالة التجزئة `__hash__ = None` عن كافة الكائنات القابلة للتعديل ويفرض استخدام كائنات مجمدة كالصفوف `tuple`.*

**Incorrect / مشتت غير صحيح:** Dictionary keys are pointers stored in the dense entries array; the size of the referenced heap object is irrelevant to table mechanics.
*مفاتيح القواميس هي مؤشرات عناوين تُخزن في مصفوفة المدخلات، وحجم الكائن في الكومة ليس عائقاً.*

**Incorrect / مشتت غير صحيح:** Python dictionaries accept any immutable, hashable object as keys, including tuples, frozensets, floats, and custom classes implementing `__hash__`.
*تقبل قواميس بايثون أي كائن مجمد يمتلك دالة تجزئة صالحة، بما في ذلك الصفوف والمجموعات المجمدة.*
:::
