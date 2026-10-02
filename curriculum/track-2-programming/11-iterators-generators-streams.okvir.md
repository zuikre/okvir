---
id: "iterators-generators-streams"
version: "1.0.0"
title: "Iterators, Generators & Lazy Streams"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["object-oriented-dunder"]
i18n:
  ar: "المكررات، المولدات الكسولة، وتدفق البيانات غير المحدود"
---

# Iterators, Generators & Lazy Streams

## Beat 1: Intuition & Mental Model / الحدس والنموذج الذهني

Imagine you are tasked with processing a 100-gigabyte web server log file on a workstation that has only 8 gigabytes of physical RAM. If your instinct is to write a standard list comprehension or call `file.readlines()`, your computer will abruptly freeze and crash with an unceremonious `MemoryError`! Why does this happen? A Python `list` is inherently **eager**: it demands that all 100 gigabytes of data be allocated, constructed as individual Python objects, and held in memory simultaneously before you can inspect even the very first line.

A **Generator** completely overturns this paradigm through **lazy evaluation**. Instead of a giant warehouse filled with thousands of pre-manufactured crates, imagine a **conveyor belt that pauses and freezes in time**. A generator does not compute its values upfront; it produces each item on-demand, strictly one by one, at the exact millisecond the caller asks for it. At any given moment, only a single element resides in memory, reducing space consumption from gigabytes down to a tiny, constant handful of bytes ($O(1)$ auxiliary space).

To appreciate how revolutionary this is, think about ordinary functions. An ordinary function is like a vending machine drop: you invoke it with arguments, it runs to completion, hits a `return` statement, drops its result, and its entire stack frame—all its local variables, memory allocations, and execution state—is instantly obliterated (popped off the call stack). If you call that function again, it must start from total scratch with zero memory of its previous execution.

The `yield` keyword rewires this contract completely. When a Python function contains the `yield` statement, calling it does not execute the function body; instead, it returns a special **generator object** (`PyGenObject`). When you call `next()` on this generator, the function executes normally until it hits `yield`. At that exact microsecond, Python **freezes the function's stack frame in place on the heap**. Its local variables, execution position, and temporary values are preserved in suspended animation, and the yielded value is handed to the caller.

When the caller subsequently asks for the next item, Python does not restart the function; it simply **thaws out** the frozen frame on the heap! Execution resumes at the exact instruction immediately following the `yield`, advances until the next `yield` or until the function returns (which raises `StopIteration`), and freezes again. This enables you to construct infinite data streams—such as live sensor telemetry, Fibonacci sequences, or streaming real-time event logs—flowing through modular, memory-efficient pipeline stages without ever running out of RAM.

---

تخيل أنك مكلف بتحليل ملف سجلات خادم عملاق بحجم 100 غيغابايت على حاسوب شخصي يمتلك 8 غيغابايت فقط من الذاكرة العشوائية (RAM). إن كان تفكيرك الأول هو قراءة الملف دفعة واحدة عبر `file.readlines()` أو بناء قائمة عبر List Comprehension، فإن نظام التشغيل سينهار فوراً ويطلق بايثون خطأ نفاد الذاكرة القاتل (`MemoryError`)! والسبب وراء ذلك أن قوائم بايثون تعتمد على مبدأ **التقييم الشره** (Eager Evaluation)؛ فهي تشترط حجز الذاكرة وبناء كافة الكائنات والبيانات دفعة واحدة في الذاكرة قبل أن تسمح لك بفحص السطر الأول.

يأتي **المولد (Generator)** ليقلب هذه المعادلة رأساً على عقب عبر ما يُعرف بـ **التقييم الكسول** (Lazy Evaluation). فبدلاً من مستودع ضخم متخم بملايين الصناديق الجاهزة مسبقاً، تخيل **شريطاً ناقلاً ذكياً يتجمد في الزمن**. لا يقوم المولد بحساب أو تخزين البيانات مقدماً؛ بل ينتج عنصراً واحداً فقط في اللحظة الدقيقة التي يطلب فيها البرنامج ذلك العنصر. وفي أي لحظة زمنية، لا يشغل البرنامج في الذاكرة سوى عنصر وحيد فقط، مما يقلص استهلاك الذاكرة من غيغابايتات ضخمة إلى بضعة بايتات ثابتة تماماً باستهلاك ذاكري مقداره $O(1)$.

ولفهم هذا الإعجاز الهندسي، تأمل كيف تعمل الدوال التقليدية: الدالة العادية تشبه آلة البيع الذاتي، تستدعيها بالمعاملات، فتبني إطار مكدس (Stack Frame) خاصاً بها، وتنفذ كافة أسطرها حتى تصل لأمر الإرجاع `return`، فتسلم النتيجة، وفوراً **يُهدم إطار المكدس وتُمحى كافة متغيراتها المحلية من الذاكرة**. وإذا استدعيتها ثانية، تبدأ من الصفر تماماً دون أي ذكرى لما حدث سابقاً.

أما الكلمة المفتاحية `yield`، فإنها تعيد صياغة هذا الميثاق كلياً. فعندما تحتوي أي دالة على `yield`، لا يؤدي استدعاؤها إلى تنفيذ شفرتها فوراً، بل تعيد كائناً خاصاً يُدعى كائن المولد (`PyGenObject`). وحين تطلب منه العنصر التالي عبر `next()`، يبدأ التنفيذ حتى يرتطم بأمر `yield`. وفي تلك الميكروثانية تحديداً، يقوم بايثون بـ **تجميد إطار تنفيذ الدالة في مكانه ونقله إلى ذاكرة الكومة (Heap)**؛ فيحفظ كافة متغيراته المحلية وموضع سطر التنفيذ بدقة، ويسلم القيمة الناتجة للمستدعي.

وحين يطلب المستدعي العنصر اللاحق، لا يبدأ بايثون من البداية، بل **يُذيب الجليد عن الإطار المجمد** في الكومة! فيستأنف التنفيذ من السطر التالي لـ `yield` مباشرة، ويخطو خطوة جديدة حتى يجد `yield` التالية أو تنتهي الدالة بإطلاق استثناء `StopIteration`. هذا النمط المعماري يتيح لك بناء سلاسل معالجة كاملة لتدفقات بيانات لا نهائية—مثل قراءات الحساسات المباشرة، أو متتالية فيبوناتشي، أو سجلات البيانات اللحظية—دون أن تنفد ذاكرة جهازك أبداً.

### Jargon Decoder / جدول فك شفرة المصطلحات

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Lazy Evaluation** (التقييم الكسول) | Cooking a burger only when the customer orders it, rather than piling 1,000 cold burgers on the counter. | طهي الوجبة عند وصول طلب الزبون فقط، بدلاً من تكديس ألف وجبة باردة في المستودع مقدماً. |
| **Generator** (المولد) | A conveyor belt that pauses and freezes in time until you press the dispense button. | شريط ناقل ذكي يتجمد في مكانه ويتوقف عن الحركة حتى تضغط زر طلب العنصر التالي. |
| **Frame Suspension** (تجميد إطار التنفيذ) | Pausing a video game mid-jump, preserving all player coordinates, and resuming smoothly later. | إيقاف لعبة فيديو مؤقتاً في منتصف القفزة مع حفظ كافة الإحداثيات لاستئنافها لاحقاً. |
| **Pull-Based Stream** (التدفق القائم على السحب) | A water tap that flows strictly when you turn the knob, dispensing one drop at a time. | صنبور مياه لا يسيل إلا عند فتح الصمام، ليسكب قطرة واحدة عند كل تدويرة بمقدار الحاجة. |
| **Yield Keyword** (الكلمة المفتاحية yield) | A pause-and-hand-over lever that delivers a parcel without destroying the chef's kitchen. | رافعة تسليم مؤقتة تناول الصندوق للمستدعي وتجمد المطبخ دون هدمه أو إغلاقه نهائياً. |

### Visual Step-by-Step Data Transformation / التحول البصري للبيانات

```text
Lifecycle of a Streaming Generator: gen = chunked_stream(stream, size=2)

Step 1: Instantiation (Calling generator function)
  gen = chunked_stream(...)
  State: GEN_CREATED (Zero lines executed! Frame allocated on heap at 0x7000)

Step 2: First next(gen) Invocation
  State: GEN_RUNNING
  Execution advances through loop: pulls 1, pulls 2 -> chunk = [1, 2]
  Hits: yield chunk
  Action: Yields [1, 2] to caller!
  State: GEN_SUSPENDED (Frame freezes on heap at 0x7000; f_lasti saved!)

Step 3: Second next(gen) Invocation
  State: Thaws frame at 0x7000! Resumes at f_lasti + 1
  Execution clears chunk -> pulls 3 -> end of input stream reached!
  Hits: yield [3]
  Action: Yields [3] to caller!
  State: GEN_SUSPENDED

Step 4: Third next(gen) Invocation
  State: Thaws frame -> function exits -> raises StopIteration!
  State: GEN_CLOSED (Frame finally deallocated; loop exits cleanly!)
```

:::simulation-widget{engine="canvas2d" component="CompactDictLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Invariants Demystified / الأسس الرياضية واللامتغيرات الصارمة

$$
\text{GeneratorState} \in \{\text{GEN\_CREATED}, \text{GEN\_SUSPENDED}, \text{GEN\_RUNNING}, \text{GEN\_CLOSED}\}
$$

$$
\text{Stream Processing}: \mathcal{S}_0 \xrightarrow{\text{next()}} (x_0, \mathcal{S}_1) \xrightarrow{\text{next()}} (x_1, \mathcal{S}_2) \dots \implies \text{Space: } \mathcal{O}(1) \ll \mathcal{O}(N)
$$

### Opcode Mechanics & Architectural Mapping

| Opcode / أمر شفرة البايت | Action on Heap & Stack | Lifecycle Transition | Performance Guarantee |
| :--- | :--- | :--- | :--- |
| `YIELD_VALUE` | Freezes current `PyFrameObject` on heap; pushes top-of-stack to caller | `GEN_RUNNING -> GEN_SUSPENDED` | Frame context switch takes **~15-25 CPU cycles** |
| `RESUME` | Restores virtual stack and resumes execution at `f_lasti + 1` | `GEN_SUSPENDED -> GEN_RUNNING` | Instantaneous zero-copy frame thaw |
| `RETURN_VALUE` | Destroys heap frame and raises `StopIteration` exception | `GEN_RUNNING -> GEN_CLOSED` | Clean deterministic pipeline termination |

### Step-by-Step Execution Cost & Complexity Breakdown / تفكيك التكلفة الحسابية خطوة بخطوة

#### 1. Processing 10,000,000 Numbers: Eager List vs Lazy Generator
- **Eager List (`[x * 2 for x in range(10_000_000)]`)**:
  - Allocates pointer buffer for 10M pointers: $10,000,000 \times 8 \text{ bytes} = 80 \text{ MB}$.
  - Allocates 10M `PyLongObject` instances: $10,000,000 \times 28 \text{ bytes} = 280 \text{ MB}$.
  - **Total Memory Footprint**: **~360 Megabytes** RAM.
- **Lazy Generator (`(x * 2 for x in range(10_000_000))`)**:
  - Allocates 1 `PyGenObject` struct: **~168 bytes**.
  - Local variables in suspended frame: **~80 bytes**.
  - **Total Memory Footprint**: **~248 Bytes** total ($O(1)$ constant memory!).
- **Memory Reduction**: **~1,450,000x less RAM consumed!**

---

## Beat 3: Guided Code Challenge / التحدي البرمجي الموجه

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
from typing import Any, Iterator

def chunked_stream(stream: Iterator[Any], chunk_size: int) -> Iterator[list[Any]]:
    """
    Consumes an arbitrary (potentially infinite) lazy iterator and yields
    fixed-size chunks as lists, without loading the full stream into memory.

    Args:
        stream: An input iterator yielding sequential items.
        chunk_size: Positive integer specifying the batch size for each chunk.

    Yields:
        Lists of length chunk_size (or smaller for the final partial chunk).
    """
    # Step 1: Initialize an isolated accumulator for the current batch
    current_chunk: list[Any] = []

    # Step 2: Iterate over the lazy stream item by item
    for item in stream:
        current_chunk.append(item)

        # Step 3: When the batch reaches the target capacity, yield and suspend
        if len(current_chunk) == chunk_size:
            yield current_chunk
            # Reset accumulator for the next incoming chunk
            current_chunk = []

    # Step 4: After stream exhaustion, yield any remaining partial chunk
    if current_chunk:
        yield current_chunk
```
:::

## Beat 4: Real-World Transfer Scenario / سيناريو التطبيق ونقل المعرفة

### Reality Check: The Memory OOM Crash on ETL Pipelines

A data engineer is tasked with reading a 50 GB CSV file containing financial transactions, calculating fraud scores, and writing results to a database:
```python
def process_transactions(filepath):
    with open(filepath, "r") as f:
        transactions = f.readlines()  # Reads entire file into list
    for record in transactions:
        score = compute_fraud(record)
        db_insert(record, score)
```
On a cloud worker container configured with 4 GB of RAM, the job fails after 30 seconds with exit code 137 (`OOMKilled - Out of Memory`). What single change converts this pipeline into an $O(1)$ memory streaming process?

*كُلف مهندس بيانات بمعالجة ملف معاملات مالية ضخم بحجم 50 غيغابايت، فاستخدم `f.readlines()` لتحميل السجلات. وفي حاوية سحابية تمتلك 4 غيغابايت من الذاكرة، انهارت المعالجة فوراً بنفاد الذاكرة (`OOMKilled`). ما هو التعديل الهندسي الوحيد الذي يحول هذا البرنامج إلى تدفق ثابت يستهلك ذاكرة $O(1)$؟*

:::transfer-quiz
**Question / السؤال:**
How should the file be processed to eliminate the memory explosion?
*كيف يجب تعديل معالجة الملف للقضاء على انفجار الذاكرة نهائياً؟*

- [x] Iterate directly over the file handle (`for record in f:`); in Python, open files are lazy line iterators that stream one line at a time into memory in O(1) space.
  *التكرار مباشرة فوق مقبض الملف (`for record in f:`)؛ ففي بايثون، الملفات المفتوحة هي مكررات أسطر كسولة تبث سطراً واحداً في كل دورة باستهلاك ذاكرة ثابت O(1).*
- [ ] Increase the cloud worker container's RAM from 4 GB to 64 GB to allow the full list to fit in memory.
  *زيادة ذاكرة الحاوية السحابية من 4 غيغابايت إلى 64 غيغابايت لتتسع القائمة الكاملة في الذاكرة.*
- [ ] Wrap the `readlines()` call inside a `try...except MemoryError` block to catch the crash.
  *تغليف استدعاء `readlines()` داخل كتلة `try...except` لاصطياد خطأ نفاد الذاكرة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Calling `f.readlines()` is an eager operation: it reads the entire 50 GB file into memory, constructs 50 GB worth of `PyUnicode` string objects, and builds a massive list of pointers, instantly overwhelming the 4 GB RAM container. However, in Python, an open file object (`f`) implements the Iterator Protocol (`__iter__` and `__next__`) natively! When you write `for line in f:`, Python uses an internal buffered C reader to stream lines one-by-one, keeping only the current line in memory. This reduces memory usage from 50 GB to less than 4 Kilobytes, allowing the job to succeed on even a 128 MB micro-container.
*استدعاء `f.readlines()` هو عملية شرهة تقرأ ملف الـ 50 غيغابايت كاملاً وتبني كائنات نصية وقائمة عملاقة تبتلع الذاكرة، مما يسحق حاوية الـ 4 غيغابايت. بالمقابل، يطبق كائن الملف المفتوح (`f`) بروتوكول التكرار بشكل أصيل! فعند كتابة `for line in f:`، يستخدم بايثون قارئ مخزن مؤقت بلغة C يقرأ سطراً واحداً فقط في كل لحظة، مما يقلص استهلاك الذاكرة من 50 غيغابايت إلى أقل من 4 كيلوبايت، ويسمح للبرنامج بالعمل بنجاح باهر حتى على أصغر الحاويات.*

**Incorrect / مشتت غير صحيح:** Upgrading cloud RAM wastes cloud infrastructure budget and fails to fix the architectural anti-pattern (a 200 GB file would crash again).
*رفع الذاكرة يضاعف التكلفة المالية السحابية ولا يحل العيب المعماري، فالملفات الأكبر ستكرر نفس الانهيار.*

**Incorrect / مشتت غير صحيح:** Catching `MemoryError` does not allow the pipeline to proceed; it simply prevents a traceback while leaving the data unparsed.
*اصطياد الخطأ لا يحل المشكلة بل يبتلع الاستثناء فقط دون استكمال معالجة المعاملات.*
:::
