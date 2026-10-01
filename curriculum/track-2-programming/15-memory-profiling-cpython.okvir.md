---
id: "memory-profiling-cpython"
version: "1.0.0"
title: "CPython Memory Architecture & Cache Locality"
track: "programming"
module: "mod-12"
estimated_minutes: 15
prerequisites: ["sorting-divide-and-conquer"]
i18n:
  ar: "معمارية ذاكرة CPython، تجميع القمامة، وتمركز الذاكرة المخبأة (Cache Locality)"
---

# CPython Memory Architecture & Cache Locality

In high-level Python, memory feels transparent and boundless. But under the hood, every single integer is not a naked 8-byte CPU number: it is a full `PyLongObject` struct weighing **28 bytes**! Why? Because it requires an 8-byte reference count (`ob_refcnt`), an 8-byte type pointer (`ob_type`), an 8-byte size descriptor, and digit payloads.

CPython manages memory in three specialized tiers: the OS system allocator, the `pymalloc` small-object allocator (dividing memory into 256KB Arenas, 4KB Pools, and Size-Class Blocks up to 512 bytes), and cyclic Garbage Collection (Gen 0, 1, 2). Modern CPUs are 100x faster than DRAM. When your CPU accesses memory, it pulls an entire 64-byte **Cache Line** into ultra-fast L1 cache. Because Python lists are arrays of pointers scattered across the heap, following them requires 'pointer chasing'—causing CPU cache misses that stall execution!

:::simulation-widget{engine="canvas2d" component="GeneratorSuspensionLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{Latency}: \text{L1 } (1\text{ ns}) \ll \text{L2 } (4\text{ ns}) \ll \text{L3 } (10\text{ ns}) \ll \text{DRAM } (80\text{ ns}), \quad \text{Arena (256KB)} \to \text{Pool (4KB)} \to \text{Block}
$$

في بايثون، تبدو الذاكرة مجرد فضاء شفاف لا نهائي. لكن خلف الكواليس، الرقم الصحيح ليس مجرد 8 بايتات، بل هو كائن `PyLongObject` كامل يزن **28 بايتاً** على الأقل! لأنه يحمل عداد مراجع 8 بايت، ومؤشر نوع 8 بايت، وحجم خانات 8 بايت، ثم بيانات الرقم.

تدير بايثون الذاكرة عبر 3 طبقات متخصصة: مخصص نظام التشغيل، ومخصص الكائنات الصغيرة `pymalloc` (المقسم إلى حلبات Arenas بحجم 256KB، وأحواض Pools بحجم 4KB، وكتل Blocks حتى 512 بايتاً)، وجامع القمامة الدوري (الأجيال 0، 1، 2). المعالجات الحديثة أسرع بـ 100 ضعف من ذاكرة RAM العادية؛ وعندما يقرأ المعالج البيانات، يسحب **خط كاش (Cache Line)** كاملاً بحجم 64 بايتاً إلى ذاكرة L1 الخاطفة. ولأن قوائم بايثون مصفوفات من المؤشرات لكائنات مبعثرة في الكومة، فإن ملاحقة تلك المؤشرات ('Pointer Chasing') تسبب إخفاقات كاش وتوقف المعالج عن العمل في انتظار الذاكرة!

Cyclic reference garbage collection resolves circular topologies ($A \to B \to A$) that simple reference counting cannot free. CPython groups objects into three generations (Gen 0, Gen 1, Gen 2). Newly allocated objects enter Gen 0. If they survive a collection pass, they are promoted to older, less frequently collected generations. For data engineering and AI, understanding cache lines explains why contiguous C-buffers like NumPy arrays outperform standard Python lists by 50x to 100x: NumPy aligns data contiguously in memory, saturating 64-byte cache lines without pointer indirection.

يعالج جامع القمامة الدوري مشكلة المراجع الدائرية ($A \to B \to A$) التي يعجز عداد المراجع البسيط عن تحريرها. يقسم CPython الكائنات إلى 3 أجيال (Gen 0, 1, 2)؛ تدخل الكائنات الجديدة الجيل 0، وكلما صمدت أمام دورات الجمع رُقيت إلى أجيال أقدم تُفحص على فترات متباعدة. وفي هندسة البيانات والذكاء الاصطناعي، يفسر مبدأ خطوط الكاش سبب تفوق مصفوفات NumPy المتجاورة على قوائم بايثون بـ 50 إلى 100 ضعف: تُرص بيانات NumPy متجاورة في الذاكرة، فتملأ خطوط الكاش الـ 64-بت دون أي تشتيت للمؤشرات.

:::python-challenge{id="py-memory-profiling-cpython"}
---
timeout_ms: 3000
test_cases:
  - input: "detect_and_collect_cycles()['is_cycle_detected']"
    expected: "1"
  - input: "detect_and_collect_cycles()['collected_objects'] >= 2"
    expected: "True"
  - input: "isinstance(detect_and_collect_cycles(), dict)"
    expected: "True"
---
```python
import gc
from typing import Any

def detect_and_collect_cycles() -> dict[str, int]:
    """
    Demonstrates CPython's cyclic garbage collection mechanics by constructing
    an isolated reference cycle, unbinding local variables, and invoking gc.collect().

    Returns:
        dict containing:
          - 'collected_objects': Number of unreachable cyclic objects collected by GC.
          - 'unreachable_count': Confirms cyclic collection succeeded (> 0).
    """
    # Disable automatic GC temporarily to inspect deterministic collection
    gc.disable()

    # Step 1: Create a reference cycle
    node_a: list[Any] = []
    node_b: list[Any] = []
    node_a.append(node_b)
    node_b.append(node_a)

    # Step 2: Delete local references; reference count remains 1 due to the cycle
    del node_a
    del node_b

    # Step 3: Run full cyclic garbage collection
    collected = gc.collect()

    # Re-enable automatic garbage collection
    gc.enable()

    return {
        "collected_objects": collected,
        "is_cycle_detected": 1 if collected >= 2 else 0,
    }
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Why does summing 10,000,000 numbers in a contiguous NumPy array run 50x-100x faster than summing a Python list of the same numbers, even though both reside in RAM?
*لماذا يستغرق جمع 10 ملايين رقم في مصفوفة NumPy المتجاورة زمناً أسرع بـ 50 إلى 100 ضعف من جمع نفس الأرقام في قائمة بايثون، مع أن كليهما يقيم في ذاكرة RAM؟*

- [x] Cache Locality & SIMD: NumPy stores raw contiguous bytes, pulling 8 doubles per 64-byte CPU cache line without pointer chasing; Python lists are scattered pointer arrays causing frequent L1 cache misses and PyObject boxing overhead.
  *تمركز الذاكرة الكاش والعمليات المتجهة (SIMD): يخزن NumPy بايتات خاماً متجاورة فيسحب 8 أرقام لكل خط كاش (64 بايت) دون ملاحقة مؤشرات؛ بينما قوائم بايثون مصفوفات مؤشرات مبعثرة تسبب إخفاقات متكررة في ذاكرة L1 وتغليف PyObject ثقيل.*
- [ ] Because NumPy compiles mathematical formulas into quantum GPU kernels on every iteration.
  *لأن NumPy يترجم المعادلات الحسابية إلى أنوية رسومية خارقة في كل دورة.*
- [ ] Because Python lists compress integer numbers using gzip algorithms in memory.
  *لأن قوائم بايثون تضغط الأرقام باستخدام خوارزميات الضغط في الذاكرة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** CPython lists store pointers to individual 28-byte PyLongObject structs scattered arbitrarily across the heap. Each access requires dereferencing a pointer (pointer chasing) that misses L1/L2 caches, stalling the CPU. NumPy stores raw sequential 8-byte values, allowing hardware prefetchers and vector CPU instructions to run at peak memory bandwidth.
*تخزن قوائم بايثون مؤشرات لكائنات منفصلة مبعثرة في الكومة، مما يسبب إخفاقات مستمرة في الكاش وتعطل المعالج في انتظار الذاكرة. بينما يرص NumPy الأرقام بتتابع خام، فيستغل عتاد المعالج الحديث وأوامر المتجهات بأقصى سرعة ممكنة.*

**Incorrect / مشتت غير صحيح:** Standard NumPy operations execute on host CPU cores, not GPU kernels.
*عمليات NumPy القياسية تنفذ على أنوية المعالج المركزي CPU وليس على بطاقات الرسوميات.*

**Incorrect / مشتت غير صحيح:** Python lists do not compress numbers; they store raw pointer arrays.
*قوائم بايثون لا تضغط الأرقام بل تخزن مؤشرات مباشرة للكائنات.*
:::
