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

When newcomers write a loop like `for item in collection:`, they usually picture Python quietly maintaining a C-style integer index behind the curtain—something like `i = 0; while i < len(collection): item = collection[i]; i += 1`. While this mental model works passably well for indexed arrays, it fails to explain how Python can effortlessly loop over dictionaries, database streams, generator expressions, open files, or infinite mathematical series that have no indices or measurable length whatsoever!

Under the hood, Python achieves this through a universal contract known as the **Iterator Protocol**. Instead of relying on numeric indices, Python cleanly decouples the collection holding the data from the process of walking through that data.

Think of an iterable collection as a **vending machine warehouse**. The warehouse holds the physical merchandise, but it cannot dispense items itself. When you pass the collection to `iter(collection)`, Python hires a specialized **conveyor belt clerk**—an *iterator object*. This clerk is stationed at the warehouse entrance, armed with an internal bookmark pointing to the very beginning.

Each time the loop body demands the next piece of data, it presses the dispensing lever: `next(iterator)`. The clerk reaches into the warehouse, hands you the next item in sequence, and advances its internal bookmark exactly one step forward. The clerk is strictly a one-way, disposable traveler: it has no memory of what came before, and it cannot rewind.

What happens when the warehouse shelves are completely empty? Instead of returning a sentinel value like `None` or `-1` (which might be legitimate data items!), the clerk raises a `StopIteration` exception. The `for` loop catches this signal behind the scenes and terminates cleanly. The caller never sees the exception; the loop simply finishes and control flows onward. Any custom Python object that implements `__iter__()` and `__next__()` can participate in this protocol!

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

```text
The Two-Phase Iterator Protocol:
+------------------------+
|  Iterable Collection   |  (Implements __iter__() -> returns Iterator)
+------------------------+
            | iter(collection)
            v
+------------------------+
|    Iterator Object     |  (Maintains internal cursor state s_k)
+------------------------+
      |            ^
next()|            | advances cursor
      v            |
  [ Yield x_k ] ---+    --->  When depleted: raises StopIteration (caught by loop)
```

عندما يكتب المبتدئ حلقة تكرار بسيطة مثل `for item in collection:`، يتبادر إلى ذهنه فوراً أن بايثون يعد المؤشرات خلف الكواليس كما تفعل لغة C عبر عداد تزايدي (`i = 0; i < len; i++`). ومع أن هذا التصور يبدو منطقياً في القوائم المرقمة، إلا أنه يعجز تماماً عن تفسير قدرة بايثون الساحرة على التكرار فوق القواميس، أو تدفقات قواعد البيانات، أو أسطر الملفات الضخمة، أو المتتاليات الرياضية اللانهائية التي لا تمتلك فهارس ولا أطوالاً معروفة مسبقاً!

خلف الكواليس، يرتكز بايثون على عقد هندسي موحد فائق الأناقة يُدعى **بروتوكول التكرار** (Iterator Protocol). فبدلاً من الاعتماد على الفهارس الرقمية، يفصل بايثون بذكاء بين الحاوية التي تخزن البيانات وبين عملية المرور على تلك البيانات خطوة بخطوة.

تخيل أي كائن قابل للتكرار (Iterable) كـ **مستودع آلة بيع ذاتية**. المستودع يحوي البضائع، لكنه لا يستطيع تسليمها بنفسه. عندما تستدعي الدالة `iter(collection)`، يعين بايثون **موظف شريط ناقل متفرغ**—وهو *كائن المكرر (Iterator)*. يقف الموظف عند باب المستودع ومعه علامة مرجعية داخلية تشير إلى أول عنصر.

في كل دورة من دورات الحلقة، تضغط حلقة التكرار زر الصرف: `next(iterator)`. فيلتقط الموظف العنصر التالي من المستودع، ويسلمه لك باليد، ثم يخطو علامته المرجعية خطوة واحدة للأمام. هذا الموظف يسير في اتجاه واحد فقط: لا يمكنه الرجوع للوراء، ولا يحتفظ بسجل لما تم صرفه سابقاً.

ماذا يحدث حين تنفد بضائع المستودع بالكامل؟ بدلاً من إعادة قيمة وهمية مثل `None` أو `-1` (والتي قد تكون بيانات حقيقية صالحة!)، يطلق الموظف صرخة استثناء منظمة: `StopIteration`. تلتقط حلقة `for` هذا الاستثناء تلقائياً وتغلق الحلقة بسلاسة دون أن ينهار البرنامج أو يظهر أي خطأ للمستخدم. وأي صنف في بايثون ينفذ الدالتين `__iter__()` و `__next__()` ينضم تلقائياً لهذه المنظومة.

#### Architectural Breakdown & State Accumulation:
- **Loop Invariant ($\mathcal{I}(k)$)**: A formal mathematical property that is true before loop entry, preserved across every transition step $\text{acc}_k = \text{acc}_{k-1} \oplus x_k$, and guaranteed to hold true upon termination.
- **`GET_ITER` Bytecode**: Pushes a new iterator onto the virtual evaluation stack by calling the object's `tp_iter` slot in C.
- **`FOR_ITER <target>`**: Calls the C-level `tp_iternext` function pointer. If an item is produced, it is pushed onto the stack. If `StopIteration` is raised, it clears the exception and jumps directly to `target`, exiting the loop in zero Python overhead.

#### التحليل المعماري وتراكم الحالة:
- **اللامتغيرة الحلقية ($\mathcal{I}(k)$)**: خاصية رياضية تصدق قبل دخول الحلقة، وتظل صالحة عند كل انتقال لتراكم الحالة $\text{acc}_k = \text{acc}_{k-1} \oplus x_k$، وتضمن برهان صحة النتيجة عند النهاية.
- **أمر البايت كود `GET_ITER`**: يستدعي فتحة `tp_iter` في بنية C للكائن لدفع المكرر إلى قمة مكدس التقييم.
- **أمر البايت كود `FOR_ITER`**: يستدعي مؤشر الدالة `tp_iternext` بسرعة C الفائقة، ويجلب العنصر التالي؛ وحين يُرفع `StopIteration` يقفز فوراً إلى نهاية الحلقة.

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
    # Step 1: Obtain the iterator object from the iterable collection
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

    # Step 4: Return the accumulated result
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
**Correct / الإجابة الصحيحة:** Iterators and generators maintain forward-only cursor state. When `sum(g)` runs the first time, it pulls elements until `next(g)` raises `StopIteration`. The generator is now officially exhausted. Calling `sum(g)` a second time asks the depleted iterator for its next element, which immediately raises `StopIteration`. The `sum()` built-in catches this immediately and returns its initial identity accumulator (which defaults to `0`).
*المكررات والمولدات هي مجاري بيانات ذات اتجاه واحد للأمام فقط. بعد استهلاكها في `first_sum`، يبقى المؤشر في النهاية. عند استدعاء `sum(g)` مرة ثانية، يطلب العنصر الأول فيطلق المولد `StopIteration` فوراً. تلتقط الدالة الاستثناء وتعيد القيمة الابتدائية للمحايد الجمعي وهي 0.*

**Incorrect / مشتت غير صحيح:** Unlike container iterables (like lists or sets) which instantiate a brand-new iterator each time `iter()` is called, a generator *is its own iterator* (`iter(g) is g`). It cannot rewind or reset.
*على خلاف الحاويات كالقوائم التي تنشئ مكرراً جديداً عند كل دورة، فإن المولد هو نفسه كائن مكرر وحيد لا يمكن إرجاع عقاربه إلى الوراء.*

**Incorrect / مشتت غير صحيح:** Passing an exhausted iterator to built-in functions like `sum()`, `list()`, or `for` loops is valid syntax and common practice; it simply behaves as an empty sequence.
*تمرير مكرر مستنفد للدوال المدمجة ممارسة قياسية مسموحة تماماً، ويتعامل معها بايثون كتسلسل فارغ دون أي أخطاء.*
:::
