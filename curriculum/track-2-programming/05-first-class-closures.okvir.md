---
id: "first-class-closures"
version: "1.0.0"
title: "First-Class Functions & Lexical Closures"
track: "programming"
module: "mod-09"
estimated_minutes: 15
prerequisites: ["cs-04"]
i18n:
  ar: "دوال الرتبة الأولى والأغلفة المعجمية (Closures)"
---

# First-Class Functions & Lexical Closures

In many legacy programming languages, functions are treated as rigid, second-class subroutines—code carved into read-only program memory that can only be invoked by name. In Python, functions are elevated to **first-class citizens**. This means a function is an ordinary object on the heap, possessing the exact same privileges as an integer, string, or dictionary: you can assign it to a variable, pass it as an argument into another function, store it inside a list, or return it as the result of a function call.

This capability unlocks one of the most powerful programming paradigms in modern computing: the **Lexical Closure**. But to truly grasp closures, you must confront a startling architectural mystery.

Normally, when an outer function executes and finishes, its local stack frame is destroyed (`popped`) from memory, and all its local variables vanish. If that outer function defined an *inner function* that referenced those outer local variables and returned it, what happens when you invoke that inner function seconds, minutes, or hours later? How can the inner function read variables whose stack frame no longer exists?

The answer is the **traveling backpack analogy**. When Python compiles an inner function that references variables from its enclosing outer scope (known as *free variables*), it does not store those variables on the transient call stack! Instead, CPython allocates a special heap object called a `cell` (`PyCellObject`). It equips the inner function with a permanent traveling backpack: the `__closure__` attribute.

Even after the outer function's execution terminates and its stack frame is completely dismantled, the inner function carries its backpack wherever it journeys across your program. Whenever the inner function needs to read or update the captured variable, it reaches into its backpack and accesses the cell directly. Closures thus enable lightweight state encapsulation, function factories, and elegant decorators without requiring full-blown class definitions.

:::simulation-widget{engine="canvas2d" component="HigherOrderPipelineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{Closure} = \langle \text{CodeObject}, (\text{cell}_1, \dots, \text{cell}_k) \rangle, \quad \text{cell.cell\_contents} = v \in \mathcal{E}_{\text{outer}}
$$

```text
Heap Layout of a Lexical Closure:
Function Object (rate_limiter)
+------------------------------------+
| __name__: "rate_limiter"           |
| __code__: <code object>            |
| __closure__: ( <cell_0>, )         |
+-------------------|----------------+
                    | (Pointer to captured cell)
                    v
            +---------------------------------+
            | PyCellObject (Heap)             |
            | ob_refcnt: 2                    |
            | cell_contents: ---------> [ 0 ] | (Integer payload)
            +---------------------------------+
```

في العديد من لغات البرمجة التقليدية، تُعامل الدوال كإجراءات فرعية جامدة من الدرجة الثانية—مجرد شفرات مخزنة في ذاكرة التعليمات لا يمكن سوى استدعائها بالاسم. أما في بايثون، فقد رُقيت الدوال لتصبح **كائنات من الرتبة الأولى** (First-Class Citizens). وهذا يعني أن الدالة هي كائن حي مقيم في الكومة (Heap)، يتمتع بكافة حقوق الأرقام والنصوص: يمكنك تخزين الدالة في متغير، وتمريرها كوسيط لدوال أخرى، وحفظها داخل قوائم، بل وإعادتها كنتيجة من دالة أخرى.

هذه المرونة تفتح الباب لأحد أقوى المفاهيم وأكثرها سحراً في هندسة البرمجيات: **الغلاف المعجمي** (Lexical Closure). ولكن لفهم الغلاف المعجمي فهماً حقيقياً، يجب أن نواجه لغزاً معمارياً محيراً.

في المعتاد، عندما تنتهي دالة خارجية من التنفيذ، يتحلل إطار مكدسها (Stack Frame) ويُمحى من الذاكرة وتتلاشى كافة متغيراتها المحلية. فإذا كانت تلك الدالة قد عرّفت في داخلها *دالة فرعية* تقرأ تلك المتغيرات المحلية ثم أعادتها للمستدعي، فما الذي يحدث حين نستدعي تلك الدالة الفرعية بعد ثوانٍ أو دقائق من موت الدالة الأصلية؟ كيف تقرأ الدالة الداخلية متغيرات قد مات إطارها وتلاشى من الوجود؟

يكمن الجواب في **تشبيه حقيبة الظهر السحرية**. عندما يترجم بايثون دالة داخلية تشير إلى متغيرات في النطاق الخارجي الحاضن لها (المتغيرات الحرة Free Variables)، فإنه لا يخزن تلك المتغيرات في مكدس الاستدعاء العابر! بل يخصص لها كائناً مستقلاً في الكومة يُدعى "الخلية" (`PyCellObject`). ويزود الدالة الداخلية بحقيبة ظهر دائمة ملحقة بالخاصية `__closure__`.

وحتى بعد أن تموت الدالة الخارجية تماماً ويتحلل إطارها من الذاكرة، تظل الدالة الداخلية تحمل حقيبة ظهرها معها أينما ذهبت في أرجاء البرنامج. وكلما احتاجت قراءة أو تعديل المتغير، تمد يدها في الحقيبة لتصل إلى محتوى الخلية مباشرة. يمنحنا هذا المفهوم قدرة مذهلة على تغليف البيانات وبناء مصانع الدوال والمزخرفات (Decorators) بخفة متناهية ودون الحاجة لإنشاء أصناف وكائنات معقدة.

#### Architectural Breakdown & Cell Mechanics:
- **Free Variables ($\text{FreeVars}(\text{code})$)**: Identifiers referenced in a function body that are neither local parameters nor assigned locally, resolved from enclosing lexical environments.
- **`PyCellObject`**: A 24-byte CPython container with a single pointer `ob_ref` pointing to the shared object in the heap.
- **`LOAD_DEREF` / `STORE_DEREF`**: Specialized CPython opcodes used inside closures. Instead of indexing local variables with `LOAD_FAST`, the VM dereferences the cell pointer directly.
- **The `nonlocal` Keyword**: Informs the compiler that an assignment should update the captured cell in the outer scope rather than creating a new shadowing local variable.

#### التحليل المعماري وميكانيكا الخلايا:
- **المتغيرات الحرة ($\text{FreeVars}$)**: المتغيرات المستخدمة داخل الدالة دون أن تكون وسائط محلية أو معينة محلياً، وتُستبان من النطاقات الحاضنة.
- **كائن الخلية (`PyCellObject`)**: وعاء مخصص في الكومة بحجم 24 بايت، يحمل مؤشراً يشير إلى القيمة المشتركة في الذاكرة.
- **أوامر شفرة البايت `LOAD_DEREF` و `STORE_DEREF`**: أوامر مخصصة للتعامل مع الأغلفة المعجمية لقراءة وتعديل محتوى الخلايا بسرعة.
- **الكلمة المفتاحية `nonlocal`**: تخبر المترجم بأن سطر التعيين يستهدف تعديل محتوى الخلية الخارجية المشتركة، بدلاً من إنشاء متغير محلي جديد يحجبها.

:::python-challenge{id="py-first-class-closures"}
---
timeout_ms: 3000
test_cases:
  - input: "(lambda l: [l(), l(), l()])(make_rate_limiter(2))"
    expected: "[True, True, False]"
  - input: "(lambda l: [l(), l(), l()])(make_rate_limiter(1))"
    expected: "[True, False, False]"
  - input: "make_rate_limiter(0)()"
    expected: "False"
---
```python
from typing import Callable

def make_rate_limiter(max_calls: int) -> Callable[[], bool]:
    """
    Constructs a closure-based stateful rate limiter that allows up to
    `max_calls` invocations, returning True while allowed and False thereafter.

    Args:
        max_calls: Maximum allowable invocations.

    Returns:
        A parameterless function returning True if within rate limit, False otherwise.
    """
    # Step 1: Initialize the state variable in the enclosing outer scope
    calls_made = 0

    # Step 2: Define the inner closure function that captures calls_made
    def rate_limiter() -> bool:
        # Step 3: Declare calls_made as nonlocal to rebind the outer cell
        nonlocal calls_made

        # Step 4: Check limit, increment state if permitted, and return status
        if calls_made < max_calls:
            calls_made += 1
            return True
        return False

    # Step 5: Return the closure function equipped with its captured cell backpack
    return rate_limiter
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Consider this classic closure loop snippet:
```python
multipliers = [lambda x: x * i for i in range(3)]
results = [m(10) for m in multipliers]
```
What is `results`, and what is the underlying mechanic?
*تأمل الكود الكلاسيكي التالي للأغلفة داخل الحلقات:
```python
multipliers = [lambda x: x * i for i in range(3)]
results = [m(10) for m in multipliers]
```
ما هي قيمة `results` الناتجة، وما التفسير المعماري لذلك؟*

- [x] [20, 20, 20] — Python closures bind variables by reference (late-binding); all lambdas share the same variable 'i', which equals 2 when the loop terminates.
  *[20, 20, 20] — ترتبط المتغيرات في أغلفة بايثون بالمرجع (Late-Binding)؛ تشترك كافة الدوال في نفس الخلية 'i' التي استقرت عند القيمة 2.*
- [ ] [0, 10, 20] — Each lambda captures an immutable snapshot of 'i' at its respective loop iteration.
  *[0, 10, 20] — تلتقط كل دالة لقطة مجمدة غير قابلة للتغيير للمتغير 'i' أثناء دورتها الخاصة.*
- [ ] [0, 0, 0] — The variable 'i' goes out of scope after the list comprehension and resets to 0.
  *[0, 0, 0] — يخرج المتغير 'i' من النطاق بعد اكتمال القائمة ويعود للصفر.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** In Python, closures capture **variables**, not static value snapshots. All three lambda functions capture the exact same cell object containing the identifier `i`. When the loop finishes, the value inside that cell is `2`. When `m(10)` is invoked later, every lambda dereferences that identical cell, evaluating `10 * 2 = 20`. To capture the current value at loop iteration time, use default argument binding: `lambda x, i=i: x * i`.
*في بايثون، تلتقط الأغلفة المعجمية **المتغيرات بالمرجع** وليس لقطات ثابتة من القيم. تشترك الدوال الثلاث في الإشارة إلى نفس كائن الخلية للمتغير `i`. وعندما تنتهي الحلقة، تستقر القيمة داخل الخلية عند `2`. وحين تُستدعى الدوال لاحقاً، تقرأ جميعها القيمة 2 لتعطي `20`. والحل لتجميد القيمة هو ربطها كوسيط افتراضي: `lambda x, i=i: x * i`.*

**Incorrect / مشتت غير صحيح:** Python does not perform lexical value copying (early binding snapshotting) unless explicitly instructed via default parameters.
*بايثون لا ينسخ القيم لحظياً عند تعريف الدالة، بل يربطها بالخلية المشتركة.*

**Incorrect / مشتت غير صحيح:** The variable `i` remains in its cell and does not reset to zero after the loop concludes.
*المتغير لا يعود للصفر، بل يحتفظ بآخر قيمة استقر عندها في دورة التكرار.*
:::
