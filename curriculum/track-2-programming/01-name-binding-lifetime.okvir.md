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

To master Python, you must dismantle the beginner myth that a variable is a 'labeled cardboard box' containing a value. In languages like C, a variable is indeed a fixed memory location where raw bytes are written. But in Python, **variables are sticky name tags**, and values are independent objects living in a vast memory neighborhood called the **Heap**.

When you execute `x = [1, 2, 3]`, Python allocates a new list object at a distinct memory address—think of it as a house number on a street (`id(x)`). It then attaches the name tag `x` to that house's door. If you subsequently run `y = x`, Python does **not** build a second house or copy its rooms; it simply pastes a second name tag `y` onto the exact same front door! If you remodel the house using `x.append(4)`, looking inside through tag `y` reflects the new furniture `[1, 2, 3, 4]` immediately. When every tag pointing to a house is deleted (`del x`, `del y`), CPython's reference counter (`ob_refcnt`) reaches zero, and the garbage collector automatically demolishes the house to free memory.

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

لإتقان بايثون حقاً، يجب التخلص تماماً من وهم المبتدئين الشائع بأن المتغير عبارة عن 'صندوق كرتوني' يحمل اسماً ونضع في داخله القيمة. في لغات مثل C، المتغير هو بالفعل مساحة ذاكرة محددة مسبقاً تُكتب فيها البايتات. لكن في بايثون، **المتغيرات هي بطاقات اسمية لاصقة** (Name Tags)، والقيم هي كائنات حية مستقلة تسكن في **ذاكرة الكومة** (Heap).

عندما تكتب `x = [1, 2, 3]`، ينشئ بايثون كائناً جديداً في عنوان ذاكرة فريد يشبه رقم المنزل في الشارع (`id(x)`). ثم يعلق البطاقة `x` على باب ذلك المنزل. فإذا كتبت بعد ذلك `y = x`، فإن بايثون **لا يبني منزلاً جديداً ولا ينسخ محتوياته**، بل يضع ببساطة بطاقة اسمية ثانية `y` على نفس الباب تماماً! وإذا عدّلت محتويات القائمة عبر `x.append(4)`، فإن النظر من خلال البطاقة `y` سيكشف التعديل `[1, 2, 3, 4]` فوراً لأن البطاقتين تشيران إلى ذات الكائن. وحين تُنزع كافة البطاقات، يهبط عداد المراجع (`ob_refcnt`) إلى الصفر ويتم تحرير الذاكرة.

Formally, an execution state consists of an environment mapping $\sigma: \text{Var} \to \text{Loc}$ (associating variable identifiers with memory addresses in the current frame) and a store $\mu: \text{Loc} \to \text{PyObject}$ (mapping addresses to heap structures). Every CPython object begins with a standard 16-byte header: an 8-byte reference count (`ob_refcnt`) and an 8-byte pointer to its type descriptor (`ob_type`). In-place mutation updates $\mu(\text{loc})$ without altering $\sigma$, whereas variable rebinding (`x = x + [4]`) instantiates a brand new location $\text{loc}'$ and updates $\sigma(x) = \text{loc}'$, decoupling it from any existing aliases.

رياضياً ومعمارياً، تتألف حالة التنفيذ من دالتي تعيين: البيئة $\sigma: \text{Var} \to \text{Loc}$ التي تربط أسماء المتغيرات بعناوين الذاكرة في الإطار الحالي، ومخزن الذاكرة $\mu: \text{Loc} \to \text{PyObject}$ الذي يربط العناوين بكائنات الكومة الفعلية. يبدأ كل كائن في CPython بترويسة قياسية بحجم 16 بايتاً: عداد مراجع بحجم 8 بايت ومؤشر لنوع الكائن بحجم 8 بايت. التعديل في الموضع (In-place Mutation) يغير بيانات الكائن $\mu(\text{loc})$ دون المساس بعنوانه، بينما إعادة الربط (Rebinding كـ `x = x + [4]`) تنشئ كائناً جديداً بالكامل بعنوان جديد $\text{loc}'$ وتعدل $\sigma(x) = \text{loc}'$، مما يفصل الرابط بينه وبين الأسماء المستعارة الأخرى.

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
    # 1. Capture original id
    orig_id = id(items)

    # 2. Create an alias pointing to the same object
    alias = items
    alias_id = id(alias)

    # 3. Mutate the object in place (append 99) and check if id is preserved
    items.append(99)
    mutated_in_place = (id(items) == orig_id)

    # 4. Rebind items using concatenation (+) with [100]
    items = items + [100]
    rebound_id = id(items)
    is_new_object = (rebound_id != orig_id)

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
**Correct / الإجابة الصحيحة:** In Python, default arguments are created at function definition time (compile/load time), not at runtime invocation. The parameter tag 'cache' points to the same list across every call.
*في بايثون، تُنشأ الكائنات الافتراضية عند ترجمة تعريف الدالة وليس عند استدعائها. بالتالي تشير البطاقة 'cache' إلى القائمة ذاتها في كل استدعاء.*

**Incorrect / مشتت غير صحيح:** This is the classic beginner misconception. Python does not re-evaluate default argument expressions on subsequent calls.
*هذا خطأ شائع؛ بايثون لا يعيد تقييم تعبير الوسيط الافتراضي عند كل استدعاء.*

**Incorrect / مشتت غير صحيح:** Python syntax allows mutable defaults, though it is considered an anti-pattern. Use `cache: list | None = None` instead.
*بايثون يسمح بهذا وإن كان يُعد ممارسة غير محبذة. البديل الصحيح هو استخدام `None` كقيمة افتراضية.*
:::
