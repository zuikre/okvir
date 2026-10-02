---
id: "first-class-closures"
version: "1.0.0"
title: "First-Class Functions & Lexical Closures"
track: "programming"
module: "mod-09"
estimated_minutes: 15
prerequisites: ["pure-functions-recursion"]
i18n:
  ar: "دوال الرتبة الأولى والأغلفة المعجمية (Closures)"
---

# First-Class Functions & Lexical Closures

## Beat 1: Intuition & Mental Model / الحدس والنموذج الذهني

In many legacy programming languages, functions are treated as rigid, second-class subroutines—code carved into read-only program memory that can only be invoked by name. In Python, functions are elevated to **first-class citizens**. This means a function is an ordinary object on the heap, possessing the exact same privileges as an integer, string, or dictionary: you can assign it to a variable, pass it as an argument into another function, store it inside a list, or return it as the result of a function call.

This capability unlocks one of the most powerful programming paradigms in modern computing: the **Lexical Closure**. But to truly grasp closures, you must confront a startling architectural mystery.

Normally, when an outer function executes and finishes, its local stack frame is destroyed (`popped`) from memory, and all its local variables vanish. If that outer function defined an *inner function* that referenced those outer local variables and returned it, what happens when you invoke that inner function seconds, minutes, or hours later? How can the inner function read variables whose stack frame no longer exists?

The answer is the **traveling backpack analogy**. When Python compiles an inner function that references variables from its enclosing outer scope (known as *free variables*), it does not store those variables on the transient call stack! Instead, CPython allocates a special heap object called a `cell` (`PyCellObject`). It equips the inner function with a permanent traveling backpack: the `__closure__` attribute.

Even after the outer function's execution terminates and its stack frame is completely dismantled, the inner function carries its backpack wherever it journeys across your program. Whenever the inner function needs to read or update the captured variable, it reaches into its backpack and accesses the cell directly. Closures thus enable lightweight state encapsulation, function factories, and elegant decorators without requiring full-blown class definitions.

---

في العديد من لغات البرمجة القديمة، تُعامل الدوال كإجراءات فرعية جامدة من الدرجة الثانية—شفرات برمجية محفورة في ذاكرة القراءة فقط ولا يمكن استخدامها إلا بالنداء المباشر باسمها. أما في بايثون، فالدوال **مواطنون من الرتبة الأولى** (First-Class Citizens). وهذا يعني أن الدالة كائن عادي يعيش على الكومة ويتمتع بنفس حقوق الأرقام والنصوص والقواميس: يمكنك إسنادها لمتغير، أو تمريرها كوسيط لدالة أخرى، أو حفظها داخل مصفوفة، أو إرجاعها كقيمة ناتجة من استدعاء دالة.

تفتح هذه الميزة الباب أمام أحد أقوى الأنماط البرمجية الحديثة: **الغلاف المعجمي** (Lexical Closure). ولكن لفهم الغلاف المعجمي حقاً، يجب أن تواجه هذا اللغز المعماري المثير:

في الحالة الطبيعية، عندما تنتهي الدالة الخارجية من عملها، يُهدم إطار المكدس الخاص بها وتتلاشى جميع متغيراتها المحلية من الذاكرة. فإذا كانت تلك الدالة قد عرّفت *دالة داخلية* تستخدم متغيرات الدالة الخارجية ثم أعادتها للمستدعي، فماذا يحدث حين تستدعي تلك الدالة الداخلية بعد دقائق أو ساعات؟ كيف تستطيع قراءة متغيرات لم يعد إطار مكدسها موجوداً في الوجود؟

الإجابة تكمن في **تشبيه حقيبة السفر الدائمة**. عندما يترجم مفسر بايثون دالة داخلية تشير إلى متغيرات من النطاق الخارجي الحاضن لها (وتُعرف بالمتغيرات الحرة Free Variables)، فإنه لا يضع تلك المتغيرات على مكدس الاستدعاء المؤقت الزائل! بل ينشئ كائناً خاصاً على الكومة يُدعى `cell` (`PyCellObject`)، ويزود الدالة الداخلية بحقيبة سفر أبدية هي السمة `__closure__`.

وحتى بعد انتهاء الدالة الخارجية وتفكيك إطار مكدسها بالكامل، تحمل الدالة الداخلية حقيبتها أينما ارتحلت في أرجاء البرنامج. وحين تحتاج لقراءة المتغير أو تحديثه، تمد يدها داخل الحقيبة لتصل إلى الخلية المشتركة على الكومة مباشرة. وبذلك تمكننا الأغلفة المعجمية من تغليف الحالة، وصناعة مصانع الدوال، وبناء المزينات الأنيقة (Decorators) بخفة فائقة ودون الحاجة لإنشاء أصناف معقدة.

### Jargon Decoder / جدول فك شفرة المصطلحات

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **First-Class Citizen** (كائن من الرتبة الأولى) | A VIP object with full rights: assignable, passable, and returnable anywhere. | كائن ذو حقوق كاملة: يمكن إسناده، وتمريره، وإعادته من الدوال كأي متغير عادي. |
| **Lexical Closure** (الغلاف المعجمي) | A function traveling with a permanent backpack that stores birth-scope variables. | دالة تحمل حقيبة سفر أبدية تحوي المتغيرات التي ولدت معها أينما ارتحلت في الكود. |
| **Free Variable** (المتغير الحر) | A variable used inside a room that was originally defined in the hallway outside. | متغير مستخدم داخل الدالة لكنه عُرّف خارج نطاقها المحلي في الدالة الحاضنة. |
| **Cell Object** (كائن الخلية) | A shared lockbox on the heap connecting the outer and inner scopes permanently. | صندوق أمانات مشترك على الكومة يربط النطاقين ويبقى حياً بعد زوال إطار المكدس. |
| **Function Factory** (مصنع الدوال) | A custom stamping machine that stamps out specialized functions configured on demand. | آلة تصنيع ذكية تُنتج دوالاً متخصصة بناءً على معايير وضوابط محددة مسبقاً. |

### Visual Step-by-Step Data Transformation / التحول البصري للبيانات

```text
Execution Flow: limiter = make_rate_limiter(max_calls=2)

Step 1: Outer Function Execution (make_rate_limiter)
Stack (Temporary Frame)                 Heap Memory (Persistent Cell)
+---------------------------+           +-------------------------------------+
| max_calls: 2              |           | PyCellObject (Loc: 0x500)           |
| calls: 0                  | --------> | ob_ref: 0                           |
+---------------------------+           +-------------------------------------+

Step 2: Inner Function Compilation & Binding
Inner Function Object (rate_limiter_guard):
  __name__: "rate_limiter_guard"
  __closure__: (<cell at 0x500: int 0>,)  <-- Backpack strapped on!

Step 3: Outer Frame Termination (Stack Frame Destroyed!)
Stack Frame [make_rate_limiter] -> POPPED & DESTROYED!
Heap Cell at 0x500 SURVIVES because inner function's backpack holds a reference!

Step 4: Invoking limiter() (First Call)
  Reads Cell at 0x500: calls = 0 < 2 -> Allowed!
  Updates Cell at 0x500: calls = 1
  Returns True

Step 5: Invoking limiter() (Second Call)
  Reads Cell at 0x500: calls = 1 < 2 -> Allowed!
  Updates Cell at 0x500: calls = 2
  Returns True

Step 6: Invoking limiter() (Third Call)
  Reads Cell at 0x500: calls = 2 >= 2 -> Denied!
  Returns False (Limit successfully enforced in private state!)
```

:::simulation-widget{engine="canvas2d" component="HigherOrderPipelineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Invariants Demystified / الأسس الرياضية واللامتغيرات الصارمة

$$
\text{Closure} = \langle f_{\text{code}}, \mathcal{E}_{\text{lexical}} \rangle, \quad \mathcal{E}_{\text{lexical}} = \{ v \mapsto \text{Cell}(\text{loc}_v) \mid v \in \text{FreeVars}(f) \}
$$

### Opcode Mechanics & Architectural Mapping

| Opcode / أمر شفرة البايت | Action on Stack & Heap | Architectural Role / الدور المعماري |
| :--- | :--- | :--- |
| `LOAD_CLOSURE <idx>` | Pushes a reference to the `cell` object onto evaluation stack | Prepares free variable cell pointers before creating inner function |
| `MAKE_FUNCTION <flags>` | Pops code object and tuple of cells, packaging into `PyFunctionObject` | Binds the lexical backpack into `func.__closure__` |
| `LOAD_DEREF <idx>` | Fetches pointer value directly out of `cell->ob_ref` | Ultra-fast single-pointer dereference reading free variable |
| `STORE_DEREF <idx>` | Updates pointer inside `cell->ob_ref` in place | Mutates captured cell state across calls without outer stack frame |

### Step-by-Step Execution Cost & Complexity Breakdown / تفكيك التكلفة الحسابية خطوة بخطوة

#### 1. Function Factory Closure Instantiation
- **Step 1 (Cell Creation)**: Allocate `PyCellObject` header on heap: **~48 bytes** memory ($O(1)$).
- **Step 2 (Function Packaging)**: Construct `PyFunctionObject` and link tuple of cells: **~144 bytes** memory ($O(1)$).
- **Step 3 (Return Function Reference)**: Push function pointer to calling frame: **1 CPU cycle** ($O(1)$).
- **Memory Footprint**: Total allocated state is under **200 bytes** (far lighter than a full class instance with `__dict__` overhead).

#### 2. Calling the Inner Closure Function
- **Step 1 (Opcode `LOAD_DEREF`)**: Follow cell pointer in `__closure__` directly to heap payload: **~5-10 CPU cycles** (cache-friendly dereference).
- **Step 2 (State Mutation `STORE_DEREF`)**: Write updated integer pointer into `cell->ob_ref`: **1 memory write**.
- **Time Complexity**: Identical to a standard function call ($O(1)$ overhead).

---

## Beat 3: Guided Code Challenge / التحدي البرمجي الموجه

:::python-challenge{id="py-first-class-closures"}
---
timeout_ms: 3000
test_cases:
  - input: "limiter = make_rate_limiter(2); [limiter(), limiter(), limiter()]"
    expected: "[True, True, False]"
  - input: "l1 = make_rate_limiter(1); l2 = make_rate_limiter(1); [l1(), l2(), l1()]"
    expected: "[True, True, False]"
  - input: "make_rate_limiter(0)()"
    expected: "False"
---
```python
from typing import Callable

def make_rate_limiter(max_calls: int) -> Callable[[], bool]:
    """
    Creates and returns a stateful rate-limiter function encapsulating private
    call counters within its lexical closure without using global state or classes.

    Args:
        max_calls: The maximum number of allowed calls before rejecting requests.

    Returns:
        A callable that returns True if the call is permitted, or False if exhausted.
    """
    # Step 1: Initialize local state variable to be captured in closure cell
    call_count = 0

    # Step 2: Define the nested inner guard function
    def rate_limiter_guard() -> bool:
        # Declare nonlocal to rebind the outer closure cell variable
        nonlocal call_count

        # Step 3: Check quota boundary condition
        if call_count < max_calls:
            call_count += 1
            return True
        else:
            return False

    # Step 4: Return the inner function carrying its lexical closure backpack
    return rate_limiter_guard
```
:::

## Beat 4: Real-World Transfer Scenario / سيناريو التطبيق ونقل المعرفة

### Reality Check: The Late-Binding Loop Closure Bug

A front-end API gateway developer attempts to build a list of callback validators:
```python
validators = []
for i in range(3):
    validators.append(lambda x: x + i)

results = [v(10) for v in validators]
```
What is `results`, and what underlying closure mechanism causes this notorious result?

*حاول مهندس بناء قائمة من الدوال التحققية داخل حلقة تكرار عبر شفرة لامبدا أعلاه. ما هي القيم الناتجة في مصفوفة `results` وما هو السلوك المعماري الكامن خلف هذه النتيجة الشهيرة؟*

:::transfer-quiz
**Question / السؤال:**
What is contained in `results`, and why?
*ما هي محتويات مصفوفة `results` ولماذا؟*

- [x] [12, 12, 12] — Closures capture variables by reference (binding to the shared cell), not by value; when called, all lambdas read the final value of i (2).
  *[12, 12, 12] — الأغلفة المعجمية تلتقط المتغيرات بالمرجع (ترتبط بنفس الخلية المشتركة) وليس بالنسخ؛ وعند الاستدعاء تقرأ جميع الدوال القيمة النهائية للمتغير i وهي 2.*
- [ ] [10, 11, 12] — Each lambda freezes a snapshot copy of i at the exact instant the iteration step executed.
  *[10, 11, 12] — كل دالة تلتقط نسخة مجمدة من قيمة i في لحظة إنشاء الحلقة بالتحديد.*
- [ ] [0, 1, 2] — The parameter x is ignored and replaced by the captured closure index.
  *[0, 1, 2] — يُتجاهل المعامل x ويُستبدل بفهرس الغلاف المعجمي الملتقط.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** In Python, closures capture **name cells**, not immediate point-in-time value snapshots. All three lambdas point to the exact same cell object created for the loop variable `i`. When the loop finishes, `i` has reached its terminal value `2`. When the lambdas are later called via `v(10)`, every lambda dereferences that same cell and adds `10 + 2 = 12`. To achieve early binding, bind `i` as a default parameter: `lambda x, i=i: x + i` (which captures the value into the function's default arguments tuple at definition time).
*في بايثون، تلتقط الأغلفة المعجمية **خلايا الرموز** وليس لقطات ثابتة للقيم. تشير الدوال الثلاث جميعاً إلى نفس كائن الخلية على الكومة للمتغير `i`. وحين تنتهي الحلقة تكون قيمة `i` قد استقرت عند `2`. وعند استدعاء الدوال لاحقاً تقرأ كلها القيمة 2 وتجمعها مع 10 لتنتج [12, 12, 12]. والحل لتجميد القيمة مبكراً هو تمريرها كوسيط افتراضي: `lambda x, i=i: x + i`.*

**Incorrect / مشتت غير صحيح:** Python does not perform implicit snapshot copies of loop variables when constructing closures.
*بايثون لا ينسخ قيم متغيرات الحلقات تلقائياً عند إنشاء الأغلفة المعجمية.*

**Incorrect / مشتت غير صحيح:** The argument `x = 10` is properly passed to the parameter; the issue stems solely from late resolution of `i`.
*المعامل x يُمرر بشكل صحيح تماماً وتُجمع عليه القيمة 2.*
:::
