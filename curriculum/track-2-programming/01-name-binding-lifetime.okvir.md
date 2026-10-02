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

To truly master Python, you must first dismantle a pervasive beginner myth: that a variable is a "labeled cardboard box" holding a value inside it. In low-level languages like C, a variable declaration like `int x = 5;` sets aside 4 physical bytes of stack memory at a fixed address and writes the bit pattern directly into that slot. But Python does not work this way. In Python, **variables are sticky name tags**, and values are independent living entities residing in a vast memory landscape called the **Heap**.

When you write `x = [1, 2, 3]`, Python's runtime takes two distinct actions. First, it constructs a new list object on the heap at a specific physical address—think of it as building a house with a unique street number, which you can inspect using `id(x)`. Second, it attaches the name tag `x` to that house's front door. The variable does not "contain" the list; it merely *points* to it.

The real magic—and the source of frequent bugs—emerges when you introduce an alias: `y = x`. A beginner expects Python to duplicate the list, creating a second independent house. Instead, Python does nothing of the sort: it simply pastes a second sticky name tag `y` onto the *exact same front door*. Both `x` and `y` now point to the identical address (`id(x) == id(y)`). If someone walks into the house through tag `x` and changes the furniture (`x.append(4)`), anyone looking through the door marked `y` immediately sees `[1, 2, 3, 4]`. This is called **pointer aliasing** and **in-place mutation**.

This brings us to the critical distinction between **mutable** and **immutable** objects. In Python, objects like integers, floats, strings, and tuples are completely immutable—their internal values are carved in stone. When you write `count = 5` followed by `count = count + 1`, Python does not alter the number 5; it constructs a brand-new integer object 6 elsewhere in memory, peels the name tag `count` off the number 5, and sticks it onto 6. In contrast, mutable containers like lists, dictionaries, and sets allow their internal contents to be modified in place without changing their memory address.

Finally, what governs the lifespan of these objects? Every Python object carries a built-in reference counter (`ob_refcnt`). Each time a new name tag or data structure references the object, its counter increments; whenever a tag falls out of scope or is explicitly removed with `del`, the counter decrements. The statement `del x` does **not** delete the underlying object—it merely peels off the tag `x`. The moment an object's reference counter hits absolute zero, it becomes orphaned. CPython's memory manager immediately reclaims its memory through automatic garbage collection.

:::simulation-widget{engine="canvas2d" component="EnvironmentFrameCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\sigma: \text{Var} \to \text{Loc}, \quad \mu: \text{Loc} \to \text{PyObject}, \quad \text{PyObject} = \langle \text{ob\_refcnt}, \text{ob\_type}, \text{payload} \rangle
$$

```text
Stack Frame (Local Scope)                 Heap Memory (CPython Objects)
+-----------------------+                 +--------------------------------------+
| Name Tag: x           | ------------->  | Loc: 0x7f9a12c8                      |
+-----------------------+          /      | ob_refcnt: 2                         |
| Name Tag: y           | --------+       | ob_type: <class 'list'>              |
+-----------------------+                 | payload: [*ptr0, *ptr1, *ptr2]       |
                                          +--------------------------------------+
```

لإتقان بايثون حقاً، يجب أولاً التخلص تماماً من وهم المبتدئين الشائع بأن المتغير عبارة عن "صندوق كرتوني يحمل اسماً ونضع في داخله القيمة". في اللغات منخفضة المستوى مثل C، يعني التصريح `int x = 5;` حجز 4 بايتات فيزيائية محددة في مكدس الذاكرة تُكتب فيها البتات مباشرة. أما في بايثون، فالأمر مختلف جذرياً: **المتغيرات هي بطاقات اسمية لاصقة** (Sticky Name Tags)، بينما القيم هي كائنات حية مستقلة تسكن في فضاء شاسع يُدعى **ذاكرة الكومة** (Heap).

عندما تكتب السطر `x = [1, 2, 3]`، يقوم مفسر بايثون بخطوتين منفصلتين: أولاً، يبني كائناً جديداً للقائمة في ذاكرة الكومة بعنوان فيزيائي فريد—تماماً كبناء منزل جديد له رقم شارع مميز يمكنك معرفته عبر الدالة `id(x)`. ثانياً، يعلق البطاقة الاسمية `x` على باب ذلك المنزل. فالمتغير لا يحتوي القائمة، بل يشير إلى موقعها فقط.

تتجلى الحقيقة المعمارية وتبرز الأخطاء البرمجية الخفية عند إسناد متغير لآخر: `y = x`. يظن المبتدئ أن بايثون ينسخ القائمة ليبني منزلاً ثانياً؛ لكن ما يحدث في الواقع هو مجرد وضع بطاقة اسمية ثانية `y` على نفس باب المنزل الأصلي! أصبح للمنزل الواحد اسمان مستعاران (`id(x) == id(y)`). فإذا دخلت من الباب `x` وغيرت أثاث المنزل عبر `x.append(4)`، فإن أي شخص ينظر من الباب `y` سيرى الأثاث الجديد `[1, 2, 3, 4]` فوراً. هذا ما نسميه **تتبع المؤشرات** و**التعديل في الموضع** (In-place Mutation).

وهنا يبرز الفارق الجوهري بين **الكائنات القابلة للتعديل (Mutable)** و**الكائنات غير القابلة للتعديل (Immutable)**. في بايثون، الأرقام والنصوص والصفوف (Tuples) كائنات مجمدة محفورة في الصخر؛ فعندما تكتب `count = 5` ثم `count = count + 1`، لا يقوم بايثون بتعديل الرقم 5، بل يبني كائناً جديداً للرقم 6 في مكان آخر بالذاكرة، وينزع الملصق `count` من على الـ 5 ليعلقه على الـ 6. على النقيض من ذلك، فإن القوائم والقواميس والمجموعات كائنات قابلة للتعديل: يمكنك تبديل محتوياتها الداخلية بحرية تامة دون أن يتغير عنوان المنزل في الذاكرة.

أخيراً، كيف تنتهي حياة هذه الكائنات؟ يحمل كل كائن في بايثون عداد مراجع داخلي (`ob_refcnt`). كلما وُضعت بطاقة اسم جديدة تشير إليه، يزداد العداد بمقدار 1؛ وكلما انتهى نطاق دالة أو استُخدم الأمر `del`، ينقص العداد. لاحظ أن الأمر `del x` لا يحذف الكائن إطلاقاً، بل ينزع البطاقة الاسمية `x` فقط. وحين يصل العداد إلى الصفر تماماً، يدرك مفسر CPython أن الكائن أصبح مهجوراً ولا يمكن لأحد الوصول إليه، فيتدخل جامع القمامة (Garbage Collector) تلقائياً لهدم المنزل وتحرير الذاكرة للنظام.

#### Architectural Breakdown & Mathematical Mapping:
- **Environment Mapping ($\sigma: \text{Var} \to \text{Loc}$)**: The symbol table mapping string variable names in the active stack frame to raw memory locations.
- **Store Mapping ($\mu: \text{Loc} \to \text{PyObject}$)**: The physical heap mapping memory addresses to actual CPython object structures.
- **Standard Object Header (`PyObject`)**: Every CPython object starts with a 16-byte header:
  - `ob_refcnt` (8 bytes): 64-bit integer tracking active references.
  - `ob_type` (8 bytes): Pointer to the type descriptor struct (`PyTypeObject*`).
- **In-place Mutation vs Rebinding**: In-place mutation updates the memory payload $\mu(\text{loc})$ while preserving $\text{loc}$. Rebinding creates a new location $\text{loc}'$ and redirects $\sigma(x) = \text{loc}'$.

#### التحليل المعماري وتفصيل الرموز:
- **دالة تعيين البيئة ($\sigma: \text{Var} \to \text{Loc}$)**: جدول الرموز الذي يربط الأسماء النصية في إطار المكدس بعناوين الذاكرة الحرة.
- **دالة مخزن الذاكرة ($\mu: \text{Loc} \to \text{PyObject}$)**: تخطيط الذاكرة الفيزيائي الذي يربط العناوين بكائنات CPython الفعلية.
- **ترويسة الكائن القياسية (`PyObject`)**: تتكون من 16 بايت في كل كائن: عداد المراجع `ob_refcnt` (8 بايت) ومؤشر النوع `ob_type` (8 بايت).
- **التعديل في الموضع مقابل إعادة الربط**: التعديل يغير المحتوى الداخلي للعنوان الأصلي دون تغيير العنوان، بينما إعادة الربط تنشئ عنواناً جديداً وتربط الاسم به.

:::python-challenge{id="py-name-binding-lifetime"}
---
timeout_ms: 3000
test_cases:
  - input: "track_rebinding_vs_mutation([1, 2])['mutated_in_place']"
    expected: "True"
  - input: "track_rebinding_vs_mutation([1, 2])['is_new_object']"
    expected: "True"
  - input: "track_rebinding_vs_mutation([10])['original_id'] == track_rebinding_vs_mutation([10])['alias_id']"
    expected: "True"
---
```python
from typing import Any

def track_rebinding_vs_mutation(items: list[int]) -> dict[str, Any]:
    """
    Demonstrates the difference between in-place mutation of a shared heap object
    and rebinding a variable name tag to a newly allocated object.

    Args:
        items: An initial list of integers.

    Returns:
        A dictionary containing:
          - 'original_id': int memory address of the input list.
          - 'alias_id': int memory address of a second tag bound to items.
          - 'mutated_in_place': bool indicating whether items.append(99) preserved id.
          - 'rebound_id': int memory address after rebinding with concatenation (+).
          - 'is_new_object': bool indicating whether rebinding produced a new id.
    """
    # Step 1: Capture the original memory address (house number) of items
    orig_id = id(items)

    # Step 2: Create an alias tag pointing to the exact same heap object
    alias = items
    alias_id = id(alias)

    # Step 3: Mutate the object in place and verify the address is unchanged
    items.append(99)
    mutated_in_place = (id(items) == orig_id)

    # Step 4: Rebind items by concatenating (+) with a new list [100]
    items = items + [100]
    rebound_id = id(items)
    is_new_object = (rebound_id != orig_id)

    # Step 5: Return diagnostic summary mapping
    return {
        "original_id": orig_id,
        "alias_id": alias_id,
        "mutated_in_place": mutated_in_place,
        "rebound_id": rebound_id,
        "is_new_object": is_new_object,
    }
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Consider the following function with a default parameter:
```python
def append_to_cache(item: int, cache: list = []) -> list:
    cache.append(item)
    return cache
```
What is returned when `append_to_cache(1)` is executed, followed immediately by `append_to_cache(2)`?
*تأمل الدالة التالية التي تستخدم وسيطاً افتراضياً:
```python
def append_to_cache(item: int, cache: list = []) -> list:
    cache.append(item)
    return cache
```
ما هي النتيجة المعادة عند تنفيذ `append_to_cache(1)` متبوعة مباشرة بـ `append_to_cache(2)`؟*

- [x] [1, 2] — Default arguments are evaluated once when the function is defined, binding 'cache' to a single persistent heap object.
  *[1, 2] — يتم تقييم الوسائط الافتراضية مرة واحدة فقط عند تعريف الدالة، مما يربط 'cache' بكائن دائم في الكومة عبر الاستدعاءات.*
- [ ] [2] — A new empty list is instantiated on the heap each time the function is called without a second argument.
  *[2] — يتم إنشاء قائمة فارغة جديدة في الكومة في كل مرة تُستدعى فيها الدالة دون تمرير وسيط ثانٍ.*
- [ ] A TypeError is raised because mutable objects cannot be passed as default parameters in Python.
  *يحدث خطأ TypeError لأن الكائنات القابلة للتعديل لا يمكن تمريرها كمعاملات افتراضية في بايثون.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** In Python, `def` statements are executable code. Python evaluates default arguments once at function definition time (compile/load time), not at runtime invocation. The parameter name tag 'cache' is bound to a single list object in heap memory. Calling `append_to_cache(1)` mutates that shared list in place to `[1]`. The second call reuses that exact same object, resulting in `[1, 2]`. To avoid this, always use `cache: list | None = None` and initialize inside the function.
*في بايثون، تُعد جملة `def` أمراً تنفيذياً يُنشئ الدالة لمرة واحدة. تُقيَّم المعاملات الافتراضية عند تعريف الدالة وتُحفظ في الكومة. يشير الاسم 'cache' إلى نفس القائمة المشتركة في كل استدعاء، لذا تُضاف العناصر إليها تراكمياً. النمط الصحيح هو استخدام `None` كقيمة افتراضية والتهيئة داخل الدالة.*

**Incorrect / مشتت غير صحيح:** This is the most common beginner misconception. Python does not re-evaluate default expressions on successive calls; it reuses the pre-allocated object.
*هذا الخطأ الشائع يفترض أن بايثون يعيد إنشاء القائمة عند كل استدعاء، وهو ما لا يحدث لأن المعامل الافتراضي يُنشأ مرة واحدة فقط.*

**Incorrect / مشتت غير صحيح:** Python syntax explicitly allows mutable defaults, though it is universally considered a dangerous anti-pattern.
*بايثون يسمح بقوائم افتراضية من الناحية التركيبية، ولكنه يعتبر فخاً برمجياً خطيراً يُنصح بتجنبه دائماً.*
:::
