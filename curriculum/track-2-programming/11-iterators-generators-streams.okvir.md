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

Imagine you must process a 100-gigabyte log file on a computer with only 8 gigabytes of RAM. If you use a list comprehension, your computer runs out of memory and crashes instantly (Out-Of-Memory Crash)! Why? Because a list is eager: it insists that all 100 gigabytes exist in memory simultaneously.

A **Generator** is lazy: it is a **conveyor belt frozen in time**. The `yield` keyword pauses function execution, freezes its stack frame in place on the heap, and yields a single element to the caller. The program holds only ONE item in memory at any given instant. When the caller asks for the next item (`next(gen)`), the function thaws out right where it left off, advances one step, and freezes again!

:::simulation-widget{engine="canvas2d" component="CompactDictLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{GeneratorState} \in \{\text{GEN\_CREATED}, \text{GEN\_SUSPENDED}, \text{GEN\_RUNNING}, \text{GEN\_CLOSED}\}, \quad \text{Space: } \mathcal{O}(1) \ll \mathcal{O}(N)
$$

تخيل أنك بحاجة لمعالجة ملف سجلات ضخم بحجم 100 غيغابايت على جهاز يمتلك 8 غيغابايت فقط من الذاكرة العشوائية. إن استخدمت قائمة عادية، سينهار نظامك فوراً بنفاد الذاكرة! والسبب أن القوائم 'شرهة' (Eager) تتطلب بناء كافة العناصر في الذاكرة دفعة واحدة.

أما **المولد (Generator)** فهو كسول وذكي: إنه **شريط ناقل يتجمد في الزمن**. الكلمة المفتاحية `yield` توقف تنفيذ الدالة مؤقتاً، وتجمد إطارها الذاكري في الكومة وتسلم عنصراً واحداً فقط للمستدعي. لا يشغل البرنامج في أي لحظة سوى ذاكرة عنصر وحيد؛ وحين يطلب المستدعي العنصر التالي (`next(gen)`)، تستيقظ الدالة من مكان توقفها تماماً، وتخطو خطوة واحدة، ثم تعود للتجمد!

Under the hood, CPython preserves the generator's state in a `PyGenObject` structure holding a pointer to the frame `PyFrameObject`. The frame's instruction pointer `f_lasti` records the exact bytecode offset of the `YIELD_VALUE` instruction. When execution resumes via `next()`, the evaluation loop picks up at `f_lasti + 1`. This allows chaining infinite stream transformers without intermediate buffer allocations.

خلف الكواليس، يحفظ CPython حالة المولد في هيكل `PyGenObject` يحمل مؤشراً لإطار التنفيذ `PyFrameObject`. يسجل مؤشر التعليمات `f_lasti` موقع أمر البايت `YIELD_VALUE` بدقة. وعند استئناف التنفيذ، ينطلق المعالج من `f_lasti + 1`. هذا يتيح بناء سلاسل معالجة كاملة لتدفقات بيانات لا نهائية دون استهلاك أي ذاكرة وسيطة.

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
    chunk: list[T] = []

    for item in stream:
        chunk.append(item)
        if len(chunk) == chunk_size:
            yield chunk
            chunk = []

    # Yield remaining partial chunk if any exists
    if chunk:
        yield chunk
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Why can you NOT index or slice a generator expression directly (e.g. `(x*2 for x in range(10))[3:5]`)?
*لماذا لا يمكنك الوصول للعناصر بالأقواس المربعة أو تقطيع المولد مباشرة (مثل `(x*2 for x in range(10))[3:5]`)؟*

- [x] Generators do not store elements in memory; values are computed lazily on demand, so accessing index 4 requires computing elements 0, 1, 2, and 3 first.
  *لا تخزن المولدات العناصر في الذاكرة، بل تُحسب بالطلب، لذا يتطلب الوصول للعنصر الرابع حساب العناصر السابقة أولاً.*
- [ ] Because Python generators are executed on a separate background thread.
  *لأن مولدات بايثون تُنفذ على خيط معالجة منفصل في الخلفية.*
- [ ] Because square bracket syntax is reserved exclusively for built-in lists and dicts.
  *لأن الأقواس المربعة محجوزة حصرياً للقوائم والقواميس المدمجة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Generators implement the Iterator protocol (`__next__`), not the Sequence protocol (`__getitem__`). To slice a generator lazily without loading everything into memory, use `itertools.islice()`.
*المولدات تنفذ بروتوكول التكرار (`__next__`) وليس بروتوكول المتتاليات (`__getitem__`). لتقطيع المولد بكسل دون تحميله في الذاكرة نستخدم `itertools.islice()`.*

**Incorrect / مشتت غير صحيح:** Generators execute synchronously on the same thread as the caller.
*المولدات تنفذ تزامناً على نفس خيط المعالجة الأساسي.*

**Incorrect / مشتت غير صحيح:** Any custom class can support square brackets by implementing `__getitem__`.
*أي كائن مخصص يستطيع دعم الأقواس المربعة بمجرد تعريف دالة `__getitem__`.*
:::
