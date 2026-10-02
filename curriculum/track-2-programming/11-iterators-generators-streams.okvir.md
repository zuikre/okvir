---
id: "iterators-generators-streams"
version: "1.0.0"
title: "Iterators, Generators & Lazy Streams"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["cs-10"]
i18n:
  ar: "المكررات، المولدات الكسولة، وتدفق البيانات غير المحدود"
---

# Iterators, Generators & Lazy Streams

Imagine you are tasked with processing a 100-gigabyte web server log file on a workstation that has only 8 gigabytes of physical RAM. If your instinct is to write a standard list comprehension or call `file.readlines()`, your computer will abruptly freeze and crash with an unceremonious `MemoryError`! Why does this happen? A Python `list` is inherently **eager**: it demands that all 100 gigabytes of data be allocated, constructed as individual Python objects, and held in memory simultaneously before you can inspect even the very first line.

A **Generator** completely overturns this paradigm through **lazy evaluation**. Instead of a giant warehouse filled with thousands of pre-manufactured crates, imagine a **conveyor belt that pauses and freezes in time**. A generator does not compute its values upfront; it produces each item on-demand, strictly one by one, at the exact millisecond the caller asks for it. At any given moment, only a single element resides in memory, reducing space consumption from gigabytes down to a tiny, constant handful of bytes ($O(1)$ auxiliary space).

To appreciate how revolutionary this is, think about ordinary functions. An ordinary function is like a vending machine drop: you invoke it with arguments, it runs to completion, hits a `return` statement, drops its result, and its entire stack frame—all its local variables, memory allocations, and execution state—is instantly obliterated (popped off the call stack). If you call that function again, it must start from total scratch with zero memory of its previous execution.

The `yield` keyword rewires this contract completely. When a Python function contains the `yield` statement, calling it does not execute the function body; instead, it returns a special **generator object** (`PyGenObject`). When you call `next()` on this generator, the function executes normally until it hits `yield`. At that exact microsecond, Python **freezes the function's stack frame in place on the heap**. Its local variables, execution position, and temporary values are preserved in suspended animation, and the yielded value is handed to the caller.

When the caller subsequently asks for the next item, Python does not restart the function; it simply **thaws out** the frozen frame on the heap! Execution resumes at the exact instruction immediately following the `yield`, advances until the next `yield` or until the function returns (which raises `StopIteration`), and freezes again. This enables you to construct infinite data streams—such as live sensor telemetry, Fibonacci sequences, or streaming real-time event logs—flowing through modular, memory-efficient pipeline stages without ever running out of RAM.

:::simulation-widget{engine="canvas2d" component="CompactDictLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{GeneratorState} \in \{\text{GEN\_CREATED}, \text{GEN\_SUSPENDED}, \text{GEN\_RUNNING}, \text{GEN\_CLOSED}\}
$$

$$
\text{Stream Processing}: \mathcal{S}_0 \xrightarrow{\text{next()}} (x_0, \mathcal{S}_1) \xrightarrow{\text{next()}} (x_1, \mathcal{S}_2) \dots \implies \text{Space: } \mathcal{O}(1) \ll \mathcal{O}(N)
$$

```text
CPython Generator Frame Suspension Architecture:

Ordinary Function (Stack Unwinding):
[ Caller Frame ] ---> [ Callee Frame ] (Hits return) ---> [ Callee Frame Destroyed ]

Generator Function (Heap-Allocated Frame Suspension):
Call Stack (Evaluator)                   Heap Memory (Persistent State)
+-----------------------+                +---------------------------------------+
| Active Loop / Caller  |                | PyGenObject (0x7f8a3c00)              |
| next(gen)             | -------------> |   gi_frame -> PyFrameObject           |
+-----------------------+                |     f_lasti: 42 (Offset of YIELD_VAL) |
      ^                                  |     f_localsplus: [x=10, chunk=[...]] |
      | yields value x_k                 |     f_valuestack: [...]               |
      +--------------------------------- |   gi_running: 0 (Suspended)           |
                                         +---------------------------------------+
```

تخيل أنك مكلف بتحليل ملف سجلات خادم عملاق بحجم 100 غيغابايت على حاسوب شخصي يمتلك 8 غيغابايت فقط من الذاكرة العشوائية (RAM). إن كان تفكيرك الأول هو قراءة الملف دفعة واحدة عبر `file.readlines()` أو بناء قائمة عبر List Comprehension، فإن نظام التشغيل سينهار فوراً ويطلق بايثون خطأ نفاد الذاكرة القاتل (`MemoryError`)! والسبب وراء ذلك أن قوائم بايثون تعتمد على مبدأ **التقييم الشره** (Eager Evaluation)؛ فهي تشترط حجز الذاكرة وبناء كافة الكائنات والبيانات دفعة واحدة في الذاكرة قبل أن تسمح لك بفحص السطر الأول.

يأتي **المولد (Generator)** ليقلب هذه المعادلة رأساً على عقب عبر ما يُعرف بـ **التقييم الكسول** (Lazy Evaluation). فبدلاً من مستودع ضخم متخم بملايين الصناديق الجاهزة مسبقاً، تخيل **شريطاً ناقلاً ذكياً يتجمد في الزمن**. لا يقوم المولد بحساب أو تخزين البيانات مقدماً؛ بل ينتج عنصراً واحداً فقط في اللحظة الدقيقة التي يطلب فيها البرنامج ذلك العنصر. وفي أي لحظة زمنية، لا يشغل البرنامج في الذاكرة سوى عنصر وحيد فقط، مما يقلص استهلاك الذاكرة من غيغابايتات ضخمة إلى بضعة بايتات ثابتة تماماً باستهلاك ذاكري مقداره $O(1)$.

ولفهم هذا الإعجاز الهندسي، تأمل كيف تعمل الدوال التقليدية: الدالة العادية تشبه آلة البيع الذاتي، تستدعيها بالمعاملات، فتبني إطار مكدس (Stack Frame) خاصاً بها، وتنفذ كافة أسطرها حتى تصل لأمر الإرجاع `return`، فتسلم النتيجة، وفوراً **يُهدم إطار المكدس وتُمحى كافة متغيراتها المحلية من الذاكرة**. وإذا استدعيتها ثانية، تبدأ من الصفر تماماً دون أي ذكرى لما حدث سابقاً.

أما الكلمة المفتاحية `yield`، فإنها تعيد صياغة هذا الميثاق كلياً. فعندما تحتوي أي دالة على `yield`، لا يؤدي استدعاؤها إلى تنفيذ شفرتها فوراً، بل تعيد كائناً خاصاً يُدعى كائن المولد (`PyGenObject`). وحين تطلب منه العنصر التالي عبر `next()`، يبدأ التنفيذ حتى يرتطم بأمر `yield`. وفي تلك الميكروثانية تحديداً، يقوم بايثون بـ **تجميد إطار تنفيذ الدالة في مكانه ونقله إلى ذاكرة الكومة (Heap)**؛ فيحفظ كافة متغيراته المحلية وموضع سطر التنفيذ بدقة، ويسلم القيمة الناتجة للمستدعي.

وحين يطلب المستدعي العنصر اللاحق، لا يبدأ بايثون من البداية، بل **يُذيب الجليد عن الإطار المجمد** في الكومة! فيستأنف التنفيذ من السطر التالي لـ `yield` مباشرة، ويخطو خطوة جديدة حتى يجد `yield` التالية أو تنتهي الدالة بإطلاق استثناء `StopIteration`. هذا النمط المعماري يتيح لك بناء سلاسل معالجة كاملة لتدفقات بيانات لا نهائية—مثل قراءات الحساسات المباشرة، أو متتالية فيبوناتشي، أو سجلات البيانات اللحظية—دون أن تنفد ذاكرة جهازك أبداً.

#### Architectural Breakdown & Mathematical Mapping:
- **Generator States ($\text{GeneratorState}$)**: A generator progresses through four explicit lifecycle states: `GEN_CREATED` (instantiated but not yet started), `GEN_RUNNING` (currently executing on the CPU), `GEN_SUSPENDED` (paused at a `yield` statement with its frame frozen on the heap), and `GEN_CLOSED` (execution finished or aborted).
- **CPython Frame Suspension (`PyGenObject` -> `PyFrameObject`)**: Unlike standard C functions whose stack frames are popped from the OS thread stack upon returning, a Python generator's frame lives on the heap.
- **Instruction Pointer Preservation (`f_lasti`)**: CPython bytecode stores the index of the last executed instruction. When pausing on `YIELD_VALUE`, `f_lasti` records the offset, allowing the Virtual Machine loop to resume execution seamlessly at `f_lasti + 1`.
- **Constant Space Guarantee ($\mathcal{O}(1)$ Memory)**: Pipeline chaining of generators (`f(g(h(stream)))`) composes operations into pull-based streams where values flow one-by-one without intermediate list allocations.

#### التحليل المعماري وتفصيل الرموز:
- **حالات دورة حياة المولد ($\text{GeneratorState}$)**: يمر المولد بأربع حالات معمارية: `GEN_CREATED` (أُنشئ ولم يبدأ بعد)، `GEN_RUNNING` (ينفذ حالياً على المعالج)، `GEN_SUSPENDED` (معلق ومجمد عند أمر `yield`)، و `GEN_CLOSED` (انتهى تماماً أو أُغلق).
- **تجميد الإطار في الكومة (`PyGenObject` -> `PyFrameObject`)**: على خلاف دوال C التي يُهدم إطارها من مكدس النظام فور انتهائها، يُحفظ إطار المولد على الكومة محتفظاً بقيم كافة المتغيرات المحلية.
- **حفظ مؤشر التعليمات (`f_lasti`)**: يسجل المفسر موقع بايت-كود أمر `YIELD_VALUE` الأخير بدقة، ليعود المعالج عند طلب `next()` للاستئناف من التعليمة التالية فوراً (`f_lasti + 1`).
- **ضمان الذاكرة الثابتة ($\mathcal{O}(1)$)**: ربط المولدات في سلاسل معالجة تتابعية يتيح تدفق العناصر فرادى بالسحب (Pull-based)، مما يمنع إنشاء مصفوفات وسيطة في الذاكرة نهائياً.

:::python-challenge{id="py-iterators-generators-streams"}
---
timeout_ms: 3000
test_cases:
  - input: "list(chunked_stream(iter([1, 2, 3, 4, 5]), 2))"
    expected: "[[1, 2], [3, 4], [5]]"
  - input: "list(chunked_stream(iter([]), 3))"
    expected: "[]"
  - input: "next(chunked_stream(iter(range(100)), 5))"
    expected: "[0, 1, 2, 3, 4]"
---
```python
from typing import Iterator, TypeVar

T = TypeVar("T")

def chunked_stream(stream: Iterator[T], chunk_size: int) -> Iterator[list[T]]:
    """
    Consumes an arbitrary (potentially infinite) iterator stream and yields
    fixed-size chunks as lists, consuming only O(chunk_size) memory.

    Args:
        stream: An input iterator stream.
        chunk_size: Maximum number of items per chunk.

    Yields:
        Lists containing at most chunk_size items.
    """
    # Step 1: Initialize an empty list buffer to accumulate elements for the current batch
    chunk: list[T] = []

    # Step 2: Iterate through the incoming lazy stream one element at a time
    for item in stream:
        chunk.append(item)
        # Step 3: When the buffer reaches chunk_size, yield it and reset the buffer
        if len(chunk) == chunk_size:
            yield chunk
            chunk = []

    # Step 4: After exhausting the stream, yield any remaining partial chunk
    if chunk:
        yield chunk
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Consider the following generator pipeline code written by a developer to compute statistics over a stream:
```python
gen = (x * 2 for x in [1, 2, 3])
total = sum(gen)
count = sum(1 for _ in gen)
```
What is the resulting value of `count`, and what underlying architectural mechanism causes it?
*تأمل الكود التالي الذي كتبه مطور لحساب إحصاءات على تدفق بيانات:
```python
gen = (x * 2 for x in [1, 2, 3])
total = sum(gen)
count = sum(1 for _ in gen)
```
ما هي القيمة الناتجة للمتغير `count`، وما هي الآلية المعمارية الداخلية المسببة لذلك؟*

- [x] count = 0 — Generators are single-pass, consumable iterators; after `sum(gen)` exhausts the stream, the generator enters `GEN_CLOSED` and raises `StopIteration` immediately on all subsequent calls.
  *count = 0 — المولدات كائنات استهلاكية تُقرأ لمرة واحدة فقط؛ بعد أن استهلكت `sum(gen)` عناصر التدفق بالكامل، دخل المولد حالة الإغلاق `GEN_CLOSED` وسيطلق `StopIteration` فوراً عند أي محاولة لاحقة.*
- [ ] count = 3 — Generators are reusable iterable views over data and automatically rewind to the beginning on new loops.
  *count = 3 — المولدات واجهات قابلة لإعادة التكرار فوق البيانات وتعيد تصفير موقعها تلقائياً عند بدء حلقة جديدة.*
- [ ] A RuntimeError is raised because Python forbids passing the same generator object to multiple built-in functions.
  *يحدث استثناء RuntimeError لأن بايثون يمنع تمرير نفس كائن المولد لأكثر من دالة مدمجة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Generators are strictly one-way forward iterators with no rewind mechanism. When `sum(gen)` executes, it repeatedly invokes `next(gen)` until the generator's underlying code terminates, changing its internal status to `GEN_CLOSED`. When the second line `sum(1 for _ in gen)` runs, it immediately encounters `StopIteration` on its first `next()` call, resulting in an empty iteration that sums to `0`. If you need multiple passes over data, either re-instantiate the generator or materialize it into a collection using `list(gen)`.
*المولدات مكررات أحادية الاتجاه لا تملك آلية للرجوع إلى الوراء. عندما نُفِّذت `sum(gen)`، استدعت `next()` مراراً وتكراراً حتى استُنفدت جميع عناصر المولد وتحولت حالته إلى `GEN_CLOSED`. وعندما جاء السطر التالي لمحاولة التكرار عليه، تلقى فوراً استثناء `StopIteration` في أول نداء، فأعادت الدالة 0. إن احتجت لقراءة البيانات عدة مرات، يجب عليك إعادة إنشاء المولد أو حفظه في قائمة `list(gen)`.*

**Incorrect / مشتت غير صحيح:** Unlike sequence containers (lists, tuples), generators do not store historical elements and cannot automatically rewind.
*على خلاف المتتاليات مثل القوائم والصفوف، لا تخزن المولدات عناصرها في الذاكرة ولا يمكنها العودة للوراء تلقائياً.*

**Incorrect / مشتت غير صحيح:** Python permits passing a generator to multiple functions; it does not raise a runtime error, but rather yields no elements once exhausted.
*بايثون يسمح بتمرير المولد لدوال متعددة دون خطأ في وقت التشغيل، ولكنه سيعمل كتدفق فارغ فور استنفاده.*
:::
