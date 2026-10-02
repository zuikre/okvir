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

In high-level Python development, memory feels transparent, lightweight, and boundless. You write `x = 42`, and it feels like a weightless integer. But under the hood of CPython, that integer is not a naked 8-byte CPU number: it is a heavyweight, fully boxed `PyLongObject` struct weighing a whopping **28 bytes**! Every single integer in Python requires an 8-byte reference count (`ob_refcnt`), an 8-byte pointer to its type descriptor (`ob_type`), an 8-byte size descriptor (`ob_size`), and a 4-byte digit payload. A standard Python list containing 1,000,000 integers does not consume 8 megabytes—it devours over **36 megabytes of physical RAM**!

To keep this massive object overhead from grinding operating system allocators (`malloc`) to a halt, CPython implements a specialized 3-tier memory engine called **`pymalloc`**. When Python requests memory for objects smaller than or equal to 512 bytes, it completely bypasses the OS kernel allocator:
1. **Arenas (256 KB)**: Large contiguous memory chunks obtained directly from the operating system via `malloc` or `mmap`.
2. **Pools (4 KB)**: Each Arena is divided into 64 Pools matching standard OS virtual memory page sizes. Each pool is strictly dedicated to a single fixed size class (e.g. 16-byte blocks, 32-byte blocks, 48-byte blocks).
3. **Blocks**: The microscopic byte slots within a Pool where actual `PyObject` payloads are instantiated. When an object is freed, its block is returned to the pool's singly linked free-list in nanoseconds, eliminating heap fragmentation.

While reference counting reclaims memory the very microsecond an object's reference counter hits zero, it possesses a fatal architectural blind spot: **reference cycles**. If object $A$ holds a reference to object $B$, and object $B$ points back to object $A$, their reference counts remain stuck at 1 forever—even if both variables are deleted from local scope (`del a, b`)! To recover from these silent memory leaks, CPython runs a cyclic **Generational Garbage Collector** (Gen 0, Gen 1, Gen 2). Operating under the empirical heuristic that *"most objects die young"*, young objects start in Gen 0. If they survive a GC collection pass, they are promoted to Gen 1 and eventually Gen 2, which are inspected with exponentially decreasing frequency.

Finally, we arrive at the physical hardware boundary: **Cache Locality**. Modern CPU registers operate at gigahertz speeds, executing arithmetic in fractions of a nanosecond, whereas pulling data from main system DRAM takes an agonizing 80 to 100 nanoseconds—a staggering 100x speed penalty known as the Memory Wall! To mitigate this, CPUs pull contiguous 64-byte chunks called **Cache Lines** into ultra-fast L1, L2, and L3 on-die SRAM caches.

Because a Python `list` is merely a dynamic array of 64-bit pointers pointing to disjointed `PyObject` addresses scattered arbitrarily across the heap, looping through a Python list forces the CPU into **pointer chasing**. At every step, the CPU must dereference a new pointer, jumping across RAM and suffering catastrophic L1 cache misses that stall pipeline execution. In contrast, contiguous C-buffers like NumPy arrays pack raw 8-byte numbers sequentially into memory, allowing a single 64-byte cache line to load 8 numbers simultaneously, unleashing vectorized SIMD (Single Instruction, Multiple Data) processing speeds!

:::simulation-widget{engine="canvas2d" component="GeneratorSuspensionLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{Latency Hierarchy}: \quad \text{L1 Cache } (\approx 1\text{ ns}) \ll \text{L2 } (\approx 4\text{ ns}) \ll \text{L3 } (\approx 10\text{ ns}) \ll \text{Main DRAM } (\approx 80\text{ ns})
$$

$$
\text{Memory Architecture}: \quad \text{OS Heap} \xrightarrow{\text{malloc/mmap}} \text{Arena (256 KB)} \xrightarrow{\div 64} \text{Pool (4 KB)} \xrightarrow{\text{size class}} \text{Block } (\le 512\text{ B})
$$

```text
CPython Memory Architecture & CPU Cache Line Saturation:

CPython Pointer Array (Scattered Heap - Pointer Chasing):
List Array:      [ *ptr0 | *ptr1 | *ptr2 | *ptr3 ] (Contiguous pointers)
                     |       |       |       |
Heap Objects:        v       |       v       |
               [PyLong: 28B] |  [PyLong: 28B]|
                (Loc: 0x1A0) v   (Loc: 0x8F0)v
                        [PyLong: 28B]   [PyLong: 28B]
                         (Loc: 0x4B0)    (Loc: 0x920)
===> Result: CPU Cache Line (64B) pulls useless surrounding bytes; 
            dereferencing pointers causes repeated L1 Cache Misses!

NumPy Contiguous Buffer (Direct Cache Line Saturation):
Memory:        | 8-byte int0 | 8-byte int1 | 8-byte int2 | ... | 8-byte int7 |
               +-------------------------------------------------------------+
               <----------------- 64-Byte CPU Cache Line -------------------->
===> Result: Zero pointer chasing! 8 full 64-bit numbers loaded per clock cycle.
```

في عالم بايثون عالي المستوى، يعتاد المطور على تخيل الذاكرة كفضاء أثيري شفاف لا نهائي؛ فتكتب متغيراً بسيطاً مثل `x = 42` وتظن أنه عديم الوزن تقريباً. لكن خلف الكواليس، هذا الرقم الصحيح ليس مجرد قيمة عددية بحجم 8 بايت في مسجل المعالج، بل هو كائن برمجي مكتمل ومغلف (`PyLongObject`) يزن **28 بايتاً كاملاً** على الأقل! فهو يحمل عداد مراجع 8 بايت (`ob_refcnt`)، ومؤشر نوع 8 بايت (`ob_type`)، وواصف حجم 8 بايت، وبيانات الرقم. لذا فقائمة تحوي مليون رقم صحيح لا تستهلك 8 ميغابايت، بل تبتلع أكثر من **36 ميغابايت من الذاكرة العشوائية**!

ولحماية نظام التشغيل من الانهيار تحت وطأة ملايين الكائنات المجهرية المبعثرة عبر دوال `malloc`، بنى مهندسو CPython محرك تخصيص متخصصاً للكائنات الصغيرة (أقل من أو يساوي 512 بايت) يُدعى **`pymalloc`**، مقسماً إلى ثلاث طبقات دقيقة تتجاوز نواة النظام تماماً:
1. **الحلبات (Arenas)**: كتل ضخمة بحجم 256 كيلوبايت تُحجز مباشرة من الذاكرة الافتراضية للنظام عبر `malloc` أو `mmap`.
2. **الأحواض (Pools)**: تقسيمات فرعية داخل كل حلبة بحجم 4 كيلوبايت (تطابق صفحات الذاكرة الافتراضية للنظام)، يختص كل حوض بفئة حجم محددة وثابتة (كأحواض كتل الـ 16 بايت أو 32 بايت).
3. **الكتل (Blocks)**: المقاطع الصغيرة المخصصة للكائنات الفعلية داخل كل حوض. وعند تحرير كائن، يعود مقطعه لقائمة الحوض الحرة في نانوثوانٍ معدودة دون أي تفتيت للذاكرة.

ومع أن عداد المراجع يحرر الكائنات فوراً بمجرد وصول عدادها للصفر، إلا أنه يصاب بالعمى التام أمام **المراجع الدائرية (Reference Cycles)**. فلو أشار الكائن $A$ إلى الكائن $B$، وأشار $B$ بدوره إلى $A$، فسيظل عداد مراجع كل منهما عالقاً عند 1 للأبد—حتى لو حذفت المتغيرات الأصلية تماماً من الكود (`del a, b`)! لحل هذا التسريب الصامت، يشغل CPython **جامع قمامة دوري متعدد الأجيال** (Gen 0, Gen 1, Gen 2). وتطبيقاً للقاعدة التجريبية الشهيرة *"أغلب الكائنات تموت صغيرة"*، تولد الكائنات في الجيل 0؛ فإن صمدت أمام دورة التنظيف رُقيت إلى الجيل 1 ثم الجيل 2، والتي تُفحص على فترات متباعدة لتوفير موارد المعالج.

وأخيراً نصل إلى الحقيقة العتادية الحاسمة: **تمركز الذاكرة المخبأة (Cache Locality)**. تنفذ مسجلات المعالج المركزي الحسابات في جزء من النانوثانية، بينما يستغرق جلب بايت واحد من ذاكرة RAM العادية 80 إلى 100 نانوثانية—وهو فارق زمني شاسع يُعرف في هندسة الحاسوب بجدار الذاكرة (Memory Wall)! ولتجاوز هذا العائق، يسحب المعالج مقاطع متجاورة بحجم 64 بايتاً تُدعى **خط كاش (Cache Line)** إلى ذاكرة L1 الخاطفة في قلب شريحة المعالج.

ولأن قوائم بايثون مجرد مصفوفات من المؤشرات التي تشير لعناوين كائنات مبعثرة عشوائياً في الكومة، فإن قراءة عناصر القائمة تجبر المعالج على **ملاحقة المؤشرات (Pointer Chasing)**؛ وفي كل خطوة يقفز المعالج إلى عنوان جديد في الذاكرة مسبباً إخفاقات كاش متتالية تعطل أنوية المعالج مئات الدورات! على النقيض من ذلك، ترص مصفوفات NumPy المتجاورة الأرقام الخام بتتابع فيزيائي مباشر، مما يتيح تحميل 8 أرقام كاملة لكل خط كاش دفعة واحدة، وإطلاق العنان للمعالجة المتجهة فائقة السرعة عبر تعليمات SIMD العتادية!

#### Architectural Breakdown & Mathematical Mapping:
- **PyObject Header Layout**: Every allocated object begins with a mandatory 16-byte prefix: 8 bytes for `ob_refcnt` (reference tracking) and 8 bytes for `ob_type` (pointer to type descriptor). Variable-length objects (`PyVarObject`, e.g. `list`, `str`, `int`) append an 8-byte `ob_size` descriptor.
- **Pymalloc Fast Allocation**: Objects $\le 512$ bytes are routed to `pymalloc`. Size classes increment by 8 bytes (16, 24, 32, ..., 512 bytes). Requests are fulfilled from pool free-lists with $\mathcal{O}(1)$ pointer swaps.
- **Generational GC Thresholds**: CPython tracks allocation versus deallocation counts. When allocations exceed deallocations by `threshold0` (default 700), a Gen 0 collection pass is triggered. Gen 1 and Gen 2 trigger after 10 collections of the preceding generation.
- **Cache Line Utilization Efficiency**:
  $$\text{Cache Efficiency} = \frac{\text{Useful Payload Bytes}}{\text{Loaded Cache Line (64 Bytes)}} \times 100\%$$
  - NumPy `float64`: $\frac{8 \times 8}{64} = 100\%$ payload saturation.
  - Python `list[float]`: 8 bytes pointer + pointer chase to 24-byte float object $\implies < 25\%$ cache efficiency with multiple DRAM roundtrips.

#### التحليل المعماري وتفصيل الرموز:
- **تخطيط ترويسة الكائن (`PyObject`)**: يبدأ كل كائن في بايثون بـ 16 بايتاً إلزامية: 8 بايتات لعداد المراجع `ob_refcnt` و 8 بايتات لمؤشر النوع `ob_type`. وتضيف الكائنات متغيرة الطول 8 بايتات إضافية لحجم العناصر `ob_size`.
- **مخصص الكائنات السريع `pymalloc`**: تُوجه الكائنات الأصغر من 512 بايت إلى `pymalloc`؛ وتتدرج فئات الأحجام بزيادة 8 بايتات، وتُحجز الكتل عبر تبديل المؤشرات في زمن ثابت $\mathcal{O}(1)$.
- **عتبات الأجيال في جامع القمامة**: يسجل CPython الفارق بين الكائنات المحجوزة والمحررة. عندما يتجاوز الفارق 700 كائن، تنطلق دورة فحص الجيل 0. وكل 10 دورات للجيل السابق تطلق فحصاً للجيل التالي.
- **كفاءة استغلال خط الكاش (Cache Line Efficiency)**:
  - في NumPy: تُشحن 8 أرقام حقيقية بالكامل في خط الكاش الـ 64-بايت، محققة كفاءة عتادية بنسبة $100\%$.
  - في قوائم بايثون: يُشحن مؤشر 8 بايت ثم يلاحق المعالج العنوان في الكومة ليجد كائناً يزن 24 بايتاً، محققاً كفاءة تقل عن $25\%$ مع تعطيل المعالج في انتظار الذاكرة.

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
          - 'is_cycle_detected': Binary flag indicating cycle collection succeeded.
    """
    # Step 1: Temporarily disable automatic garbage collection to inspect deterministic manual collection
    gc.disable()

    # Step 2: Construct an isolated reference cycle between two container lists
    node_a: list[Any] = []
    node_b: list[Any] = []
    node_a.append(node_b)
    node_b.append(node_a)

    # Step 3: Delete local stack references; refcount remains 1 for each due to the mutual cycle
    del node_a
    del node_b

    # Step 4: Run full generational cyclic garbage collection pass to isolate and break the cycle
    collected = gc.collect()

    # Step 5: Re-enable automatic garbage collection and return diagnostic mapping
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
Why does summing 10,000,000 floating-point numbers in a contiguous NumPy array run 50x-100x faster than summing a Python list of the same numbers, even though both reside in the computer's physical RAM?
*لماذا يستغرق جمع 10 ملايين رقم حقيقي في مصفوفة NumPy المتجاورة زمناً أسرع بـ 50 إلى 100 ضعف من جمع نفس الأرقام في قائمة بايثون، مع أن كليهما يقيم في ذاكرة RAM الفيزيائية؟*

- [x] Cache Locality & SIMD: NumPy stores raw contiguous bytes, pulling 8 doubles per 64-byte CPU cache line without pointer chasing; Python lists are scattered pointer arrays causing frequent L1 cache misses and PyObject boxing overhead.
  *تمركز الذاكرة الكاش والعمليات المتجهة (SIMD): يخزن NumPy بايتات خاماً متجاورة فيسحب 8 أرقام لكل خط كاش (64 بايت) دون ملاحقة مؤشرات؛ بينما قوائم بايثون مصفوفات مؤشرات مبعثرة تسبب إخفاقات متكررة في ذاكرة L1 وتغليف PyObject ثقيل.*
- [ ] Because NumPy compiles mathematical formulas into quantum GPU kernels on every iteration.
  *لأن NumPy يترجم المعادلات الحسابية إلى أنوية رسومية خارقة في كل دورة.*
- [ ] Because Python lists compress integer numbers using gzip algorithms in memory.
  *لأن قوائم بايثون تضغط الأرقام باستخدام خوارزميات الضغط في الذاكرة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** In CPython, a list of floats does not store float values directly; it stores an array of 64-bit pointers pointing to individual 24-byte `PyFloatObject` structs allocated at arbitrary memory locations across the heap. Iterating through the list requires following each pointer (pointer chasing). Each dereference likely misses the CPU's on-chip L1 and L2 caches, forcing the CPU pipeline to idle for ~80 nanoseconds while fetching data from system DRAM. NumPy arrays, by contrast, allocate a single contiguous C-buffer of unboxed 64-bit IEEE-754 floats. The CPU's hardware prefetcher streams these contiguous bytes into 64-byte L1 cache lines (8 floats per line), allowing vector SIMD instructions (AVX-512) to compute multiple additions in a single clock cycle with zero pointer indirection.
*في CPython، لا تخزن قائمة الأرقام الحقيقية القيم مباشرة، بل تخزن مصفوفة مؤشرات تشير لكائنات `PyFloatObject` يزن كل منها 24 بايتاً ومبعثرة في الكومة. تتطلب قراءة القائمة ملاحقة كل مؤشر على حدة (Pointer Chasing)، مما يؤدي لإخفاق كاش المعالج واضطراره للانتظار 80 نانوثانية لجلب البيانات من ذاكرة RAM البطيئة. أما في NumPy، فتُحجز كتلة ذاكرة متجاورة تضم أرقاماً خاماً بدون تغليف. يقوم المعالج بسحب 8 أرقام كاملة في كل خط كاش (64 بايت)، مما يتيح لمعالجات SIMD الحديثة إجراء جمع متوازٍ لعدة أرقام في نبضة ساعة واحدة دون أي تشتيت للمؤشرات.*

**Incorrect / مشتت غير صحيح:** Standard NumPy operations execute synchronously on the host CPU using vectorized C/Fortran routines, not on GPU accelerator kernels.
*تنفذ عمليات NumPy القياسية تزامناً على أنوية المعالج المركزي CPU باستخدام خوارزميات C و Fortran، وليس على معالجات الرسوميات GPU.*

**Incorrect / مشتت غير صحيح:** Python lists do not perform compression on numbers; they store pointers to fully allocated heap structs.
*قوائم بايثون لا تضغط الأرقام في الذاكرة، بل تخزن مؤشرات مباشرة لكائنات الكومة.*
:::
