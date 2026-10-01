---
id: "iteration-state-accumulation"
version: "1.0.0"
title: "Iteration Protocols, Loop Invariants & State Accumulators"
track: "programming"
module: "mod-08"
estimated_minutes: 15
prerequisites: ["control-flow-branching"]
i18n:
  ar: "بروتوكول التكرار الحلقي، اللامتغيرات، وتراكم الحالة"
---

# Iteration Protocols, Loop Invariants & State Accumulators

When you write `for item in collection:`, beginners assume Python is running a C-style counter loop (`i = 0; i < len; i++`). Under the hood, Python does something far more elegant: the **Iterator Protocol**.

Think of the iterable collection as a **vending machine warehouse**. Calling `iter(collection)` creates a **conveyor belt clerk** (an iterator object). Each turn of the loop presses the dispensing button `next(iterator)`. The clerk hands you the next item and steps forward. Crucially, the clerk possesses internal state and only moves in one direction. When the warehouse is depleted, the clerk raises a `StopIteration` exception. The `for` loop catches this exception behind the scenes and exits gracefully without crashing! Any object that implements `__iter__()` and `__next__()` can participate in this protocol.

:::simulation-widget{engine="canvas2d" component="ScopeChainInspector"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{Iterable} \xrightarrow{\text{iter()}} \text{Iterator} \xrightarrow{\text{next()}} (x_k, s_{k+1}) \quad \text{until } \text{StopIteration}, \quad \text{acc}_k = \bigoplus_{i=1}^k x_i
$$

عندما تكتب `for item in collection:`، يظن المبتدئ أن بايثون يعد المؤشرات مثل حلقة C التقليدية (`i = 0; i < len; i++`). لكن ما يحدث فعلياً أعمق وأجمل بكثير: **بروتوكول التكرار** (Iterator Protocol).

تخيل الكائن القابل للتكرار كـ **مستودع آلة بيع ذاتية**. استدعاء `iter(collection)` ينشئ **موظف شريط ناقل** (كائن مكرر Iterator). في كل دورة حلقة، نضغط زر الصرف `next(iterator)`، فيسلمنا الموظف العنصر التالي ويخطو خطوة للأمام. يحتفظ الموظف بحالته الداخلية ولا يتحرك إلا للأمام. وعند نفاد البضاعة، يرفع الموظف استثناء `StopIteration`. تلتقط حلقة `for` هذا الاستثناء تلقائياً وتنهي التكرار بسلاسة دون انهيار! أي كائن ينفذ `__iter__()` و `__next__()` ينضم تلقائياً لهذه المنظومة.

Mathematically, a state accumulator loop maintains a **loop invariant** $\mathcal{I}(k)$ across iterations. If the invariant holds before step $k$, and the transition $\text{acc}_{k} = \text{acc}_{k-1} \oplus x_k$ preserves it, then by mathematical induction $\mathcal{I}(N)$ holds upon termination. At the bytecode layer, CPython issues `GET_ITER` to push the iterator onto the stack, followed by `FOR_ITER <jump_target>`, which invokes the iterator's tp_iternext slot directly in C speed, jumping past the loop body upon `StopIteration`.

رياضياً، يحافظ تراكم الحالة الحلقي على **لا متغيرة حلقية** (Loop Invariant) $\mathcal{I}(k)$ عبر الدورات. إذا صحت اللامتغيرة قبل الخطوة $k$ وحافظ الانتقال $\text{acc}_{k} = \text{acc}_{k-1} \oplus x_k$ عليها، فإنها تصح بالاستقراء الرياضي عند انتهاء الحلقة. وعلى مستوى شفرة البايت، يصدر CPython الأمر `GET_ITER` لدفع المكرر إلى المكدس، يليه `FOR_ITER` الذي يستدعي فتحة tp_iternext بسرعة لغة C، ويقفز متجاوزاً جسم الحلقة فور إطلاق `StopIteration`.

:::python-challenge{id="py-iteration-state-accumulation"}
---
timeout_ms: 3000
test_cases:
  - input: "manual_reduce([1, 2, 3, 4], lambda a, b: a + b)"
    expected: "10"
  - input: "manual_reduce(['a', 'b', 'c'], lambda a, b: a + '-' + b)"
    expected: "a-b-c"
  - input: "manual_reduce([], lambda a, b: a + b, 100)"
    expected: "100"
---
```python
from typing import Any, Callable

def manual_reduce(
    iterable: Any,
    reducer_fn: Callable[[Any, Any], Any],
    initial: Any = None,
) -> Any:
    """
    Implements functools.reduce from scratch using the fundamental
    two-phase Iterator Protocol (iter() and next()) without for-loops.

    Args:
        iterable: Any Python iterable object.
        reducer_fn: Binary function taking (accumulator, current_item) -> new_accumulator.
        initial: Optional initial accumulator value.

    Returns:
        The final accumulated value.
    """
    # Step 1: Obtain the iterator object from the iterable
    it = iter(iterable)

    # Step 2: Determine initial accumulator value
    if initial is not None:
        accumulator = initial
    else:
        try:
            accumulator = next(it)
        except StopIteration:
            raise TypeError("manual_reduce() of empty iterable with no initial value")

    # Step 3: Consume the iterator element by element until StopIteration
    while True:
        try:
            item = next(it)
            accumulator = reducer_fn(accumulator, item)
        except StopIteration:
            break

    return accumulator
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
You have a generator expression `g = (x ** 2 for x in [1, 2, 3])`. You execute:
```python
first_sum = sum(g)
second_sum = sum(g)
```
What is `second_sum`, and why?
*لديك تعبير توليد `g = (x ** 2 for x in [1, 2, 3])`. قمت بتنفيذ:
```python
first_sum = sum(g)
second_sum = sum(g)
```
ما هي قيمة `second_sum` الناتجة، ولماذا؟*

- [x] 0 — The generator `g` is an iterator that was exhausted during `first_sum`; iterating it again immediately raises StopIteration.
  *0 — المولد `g` هو مكرر ذو مسار أحادي تم استنفاده بالكامل في `first_sum`، وإعادة تكراره تطلق `StopIteration` فوراً.*
- [ ] 14 — The generator re-evaluates its comprehension on every call to `sum()`.
  *14 — يعيد المولد تقييم عناصره من البداية عند كل استدعاء لدالة `sum()`.*
- [ ] A RuntimeError is raised because exhausted generators cannot be passed to built-in functions.
  *يحدث خطأ RuntimeError لأن المولد المستنفد لا يجوز تمريره للدوال المدمجة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Iterators and generators are disposable forward-only streams. Once consumed, their internal pointer sits at the end and they cannot be rewound or reset without re-creating the generator.
*المكررات والمولدات هي مجاري بيانات ذات اتجاه واحد للأمام فقط. بعد استهلاكها، يبقى المؤشر في النهاية ولا يمكن إعادة تدويرها إلا بإنشاء مولد جديد.*

**Incorrect / مشتت غير صحيح:** Iterables like `list` can be iterated multiple times because calling `iter(lst)` creates a new iterator each time; but a generator is already its own iterator.
*القوائم يمكن تكرارها عدة مرات لأن `iter(lst)` تصنع مكرراً جديداً في كل مرة، لكن المولد هو نفسه كائن مكرر وحيد.*

**Incorrect / مشتت غير صحيح:** Passing an exhausted iterator to `sum()` is completely legal; `sum()` simply sees an empty stream and returns its default start value 0.
*تمرير مكرر مستنفد لدالة `sum()` أمر نظامي تماماً، وتعتبره الدالة مجرى فارغاً فتعيد القيمة 0.*
:::
