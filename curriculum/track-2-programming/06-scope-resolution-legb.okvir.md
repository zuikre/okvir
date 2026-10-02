---
id: "scope-resolution-legb"
version: "1.0.0"
title: "Scope Resolution & The LEGB Rule"
track: "programming"
module: "mod-09"
estimated_minutes: 15
prerequisites: ["first-class-closures"]
i18n:
  ar: "استبانة النطاق وقاعدة LEGB (Local, Enclosing, Global, Built-in)"
---

# Scope Resolution & The LEGB Rule

## Beat 1: Intuition & Mental Model / الحدس والنموذج الذهني

When Python executes a statement like `print(total)`, how does the interpreter know which object `total` actually refers to? In a large application, there might be dozens of variables named `total` across different functions, modules, and imported packages. Python resolves this ambiguity by searching outward through concentric rings of visibility governed by the **LEGB Rule**.

Picture scope resolution as looking outward through an **apartment complex**:
1. **L — Local**: First, Python looks around the private room you are currently sitting in (the local execution frame of the active function).
2. **E — Enclosing**: If not found, it steps out into the private hallway of any parent function wrapped around you (from innermost nesting scope out to outermost enclosing function).
3. **G — Global**: If still not found, it steps down to the lobby of the entire building (the top-level namespace of the current `.py` module file).
4. **B — Built-in**: Finally, if nowhere in the building, it checks the city's municipal library across the street—Python's built-in namespace containing universal primitives like `len`, `range`, `dict`, and `print`. If the name tag is absent from all four scopes, Python raises a `NameError`.

However, beneath this intuitive hierarchy lurks the single most infamous trap in the Python language: **locality is determined statically at compile time, not dynamically at runtime!**

When Python compiles a function into bytecode before executing a single line, it inspects every statement. If an assignment operator (`x = ...`, `x += ...`, `for x in ...`, or `import x`) appears *anywhere* inside the function body, the compiler stamps `x` as **strictly Local** across the entire function! It does not matter if the assignment occurs on line 100 and you try to read `x` on line 2. The moment Python sees `x` on line 2, it looks exclusively in the local frame. Finding that local `x` has not yet received a value, it does **not** fall back to outer scopes; it throws `UnboundLocalError: local variable referenced before assignment`!

---

عندما ينفذ بايثون سطراً برمجياً مثل `print(total)`، كيف يعرف المفسر بدقة إلى أي كائن في الذاكرة يشير الاسم `total`؟ في التطبيقات الكبيرة، قد يوجد العشرات من المتغيرات التي تحمل اسم `total` في دوال مختلفة وملفات متعددة ومكتبات مستوردة. يحسم بايثون هذا الالتباس عبر البحث من الداخل نحو الخارج في دوائر رؤية متحدة المركز تحكمها **قاعدة LEGB**.

تخيل استبانة النطاق كمن يبحث عن غرض مفقود داخل **مبنى سكني ضخم**:
1. **L — النطاق المحلي (Local)**: يبحث بايثون أولاً داخل الغرفة الخاصة المغلقة التي تجلس فيها حالياً (إطار التنفيذ المحلي للدالة الحالية).
2. **E — النطاق المحيط (Enclosing)**: إن لم يجده، يخرج إلى الممر الخاص بالدوال الحاضنة التي تغلف غرفتك (من أقرب دالة محيطة حتى أبعدها).
3. **G — النطاق العام (Global)**: إن لم يجده، ينزل إلى بهو الاستقبال الرئيسي للمبنى بأكمله (فضاء الأسماء العام للملف الحالي `.py`).
4. **B — النطاق المضمن (Built-in)**: أخيراً، إن لم يجد له أثراً في المبنى كاملاً، يتوجه إلى المكتبة العامة للمدينة المقابلة للمبنى—وهو فضاء أسماء بايثون المضمن الذي يحوي دوالاً قياسية مثل `len` و `range` و `print`. وإن لم يجده هناك أيضاً، يرفع خطأ الفقدان: `NameError`.

ولكن تحت هذا الترتيب البسيط، يكمن أشهر فخ برمجي في لغة بايثون على الإطلاق: **تحديد النطاق يتم بشكل ساكن وثابت وقت الترجمة، وليس ديناميكياً أثناء التشغيل!**

عندما يترجم بايثون كود الدالة إلى شفرة بايت قبل تشغيلها، يفحص جميع أسطرها؛ فإذا وجد أي عملية إسناد (`x = ...` أو `x += ...`) في أي سطر داخل الدالة، فإنه يختم على المتغير `x` بختم **محلي حصرياً** على مستوى الدالة بأكملها! ولا يهم إن كانت عملية الإسناد في السطر 100 وكنت تحاول قراءة `x` في السطر الأول. فبمجرد محاولة قراءته سيبحث فقط في الإطار المحلي، وحين يجده فارغاً لن يقفز للنطاقات الخارجية، بل سيرمي خطأ الانهيار الشهير: `UnboundLocalError: local variable referenced before assignment`!

### Jargon Decoder / جدول فك شفرة المصطلحات

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Scope** (النطاق) | A set of nested rooms with one-way glass: you can look outside, but outsiders cannot peek in. | غرف متداخلة بزجاج عاكس: يمكنك النظر للخارج، لكن من بالخارج لا يرى ما بداخلك. |
| **LEGB Rule** (قاعدة LEGB) | The search sequence: Local room, Enclosing hallway, Global lobby, Built-in municipal library. | تسلسل دوائر البحث: الغرفة المحلية، الممر المحيط، بهو المبنى، والمكتبة العامة. |
| **Compile-Time Locality** (المحلية عند الترجمة) | Stamping a name as private to a room before any code actually executes. | ختم الاسم كمتغير محلي خاص بالغرفة أثناء المعاينة وقبل بدء تشغيل الكود فعلياً. |
| **UnboundLocalError** (خطأ متغير محلي غير مربوط) | Trying to use an item in your room before unpacking it, assuming you could borrow it from outside. | محاولة استخدام غرض في غرفتك قبل تفريغه، معتقداً خطأً أنك تستعيره من الخارج. |
| **Nonlocal Keyword** (الكلمة المفتاحية nonlocal) | Opening a door between your room and the immediate enclosing hallway to share a private box. | فتح باب بين غرفتك والممر المحيط بها مباشرة لمشاركة صندوق خاص دون الذهاب للبهو العام. |

### Visual Step-by-Step Data Transformation / التحول البصري للبيانات

```text
The LEGB Resolution Sequence:

  [ B: Built-in Scope ] -> len, range, print, sum, dict (Interpreter Global)
          ^
  [ G: Global Scope ]   -> Top-level module variables, imported modules
          ^
  [ E: Enclosing Scope] -> Parent function local scopes (Closure Cells)
          ^
  [ L: Local Scope ]    -> Current active stack frame (co_varnames)

Example: Resolving name 'counter' inside nested helper:
Step 1: Check Local Scope (L)
        Is 'counter' in local frame co_varnames?
        -> If YES and assigned: return local value! (Opcode: LOAD_FAST)
        -> If YES but unassigned: raise UnboundLocalError!
        -> If NO: Proceed outward to E.

Step 2: Check Enclosing Scope (E)
        Is 'counter' in enclosing function cells?
        -> If YES: return cell value! (Opcode: LOAD_DEREF)
        -> If NO: Proceed outward to G.

Step 3: Check Global Scope (G)
        Is 'counter' in current module's globals() dict?
        -> If YES: return global value! (Opcode: LOAD_GLOBAL)
        -> If NO: Proceed outward to B.

Step 4: Check Built-in Scope (B)
        Is 'counter' in __builtins__.__dict__?
        -> If YES: return builtin value!
        -> If NO: Raise NameError("name 'counter' is not defined")!
```

:::simulation-widget{engine="canvas2d" component="ClosureScopeInspector"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Invariants Demystified / الأسس الرياضية واللامتغيرات الصارمة

$$
\text{Lookup}(v, \sigma) = \text{head}\left( [ \rho(v) \mid \rho \in [ \sigma_L, \sigma_{E_1}, \dots, \sigma_{E_k}, \sigma_G, \sigma_B ], v \in \text{dom}(\rho) ] \right)
$$

### Opcode Mechanics & Architectural Mapping

| Opcode / أمر شفرة البايت | Scope Queried / النطاق المستهدف | Latency / زمن التنفيذ | Mechanism / الآلية |
| :--- | :--- | :--- | :--- |
| `LOAD_FAST` | Local Scope ($L$) | **~0.5 - 1 CPU cycle** | Direct array index lookup in C `fastlocals` array |
| `LOAD_DEREF` | Enclosing Scope ($E$) | **~5 - 10 CPU cycles** | Single-hop pointer dereference via closure cell |
| `LOAD_GLOBAL` | Global ($G$) & Built-in ($B$) | **~15 - 30 CPU cycles** | Two-tier hash table probe with inline opcode caching |

### Step-by-Step Execution Cost & Complexity Breakdown / تفكيك التكلفة الحسابية خطوة بخطوة

#### 1. Why `LOAD_FAST` Outperforms `LOAD_GLOBAL` by 30x
- **Step 1 (`LOAD_FAST` Indexing)**: At compile time, Python maps local names to fixed integer slots `0, 1, 2...`. At runtime, `LOAD_FAST 0` accesses the C struct array at offset `frame->f_localsplus[0]`: **1 indexed CPU memory instruction** ($O(1)$).
- **Step 2 (`LOAD_GLOBAL` Hash Probe)**: `LOAD_GLOBAL` must calculate the string hash `hash("counter")`, probe the module's hash table, and fall back to `__builtins__` if absent: **~15-30 cycles**.
- **Practical Takeaway**: Caching global functions into local aliases (`local_len = len`) inside hot loops provides a measurable speedup in compute-bound Python routines.

#### 2. The Arithmetic of `nonlocal` State Mutation
- Reading nonlocal cell: `LOAD_DEREF` follows pointer to `PyCellObject`: **1 memory read**.
- Rebinding nonlocal variable (`counter += delta`):
  - Fetches existing int from cell.
  - Adds delta: allocates new int object.
  - `STORE_DEREF`: writes updated address to `cell->ob_ref`.
- **Total Arithmetic Cost**: Amortized $O(1)$ time, zero global table locks.

---

## Beat 3: Guided Code Challenge / التحدي البرمجي الموجه

:::python-challenge{id="py-scope-resolution-legb"}
---
timeout_ms: 3000
test_cases:
  - input: "add, get = create_isolated_accumulator(10); add(5); get()"
    expected: "15"
  - input: "add1, get1 = create_isolated_accumulator(0); add2, get2 = create_isolated_accumulator(100); add1(20); get2()"
    expected: "100"
  - input: "add, get = create_isolated_accumulator(5); add(-5); get()"
    expected: "0"
---
```python
from typing import Callable, Tuple

def create_isolated_accumulator(initial_value: int) -> Tuple[Callable[[int], int], Callable[[], int]]:
    """
    Creates an isolated state accumulator returning a pair of closures:
      (add_fn, get_fn).
    The internal state must be encapsulated strictly within the enclosing scope,
    mutated safely via the nonlocal keyword, with zero leakage into the global scope.

    Args:
        initial_value: Starting integer balance for the accumulator.

    Returns:
        A tuple of two functions: (add(delta), get()).
    """
    # Step 1: Initialize the private balance inside the enclosing scope
    balance = initial_value

    # Step 2: Implement the modifier closure
    def add(delta: int) -> int:
        # Declare nonlocal to bind assignment to the enclosing balance cell
        nonlocal balance
        balance += delta
        return balance

    # Step 3: Implement the reader closure
    def get() -> int:
        # Reads the balance from the enclosing scope without rebinding
        return balance

    # Step 4: Return both closures sharing the identical underlying cell
    return add, get
```
:::

## Beat 4: Real-World Transfer Scenario / سيناريو التطبيق ونقل المعرفة

### Reality Check: The Counter Increment Trap

A software developer writes a tracking middleware in a Django API:
```python
total_requests = 0

def handle_request():
    total_requests += 1
    return f"Request #{total_requests} handled"
```
When `handle_request()` is executed, what error occurs, and why?

*كتب مطور برمجيات دالة وسيطة لتسجيل الطلبات البرمجية كما هو موضح أعلاه. عند استدعاء الدالة، ما هو الخطأ الناتج وما تفسيره المعماري الدقيق؟*

:::transfer-quiz
**Question / السؤال:**
What happens when `handle_request()` is called, and why?
*ماذا يحدث عند تنفيذ الدالة ولماذا؟*

- [x] UnboundLocalError — The assignment `total_requests += 1` causes Python to classify total_requests as local at compile time; reading it before the assignment fails.
  *خطأ UnboundLocalError — لأن عملية الإسناد تجعل بايثون يصنف المتغير كمحلي عند الترجمة؛ ومحاولة قراءته لحساب الجمع قبل اكتمال الإسناد تفشل.*
- [ ] NameError — The global variable total_requests is invisible to all functions unless explicitly passed as an argument.
  *خطأ NameError — المتغير العام غير مرئي للدوال إلا إذا تم تمريره صراحة كوسيط.*
- [ ] It executes successfully and prints "Request #1 handled".
  *تعمل الدالة بنجاح وتطبع رسالة المعالجة برقم 1.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Python determines variable scope **statically at compile time**, not at runtime. When compiling `handle_request`, the compiler sees `total_requests += 1`, which expands to `total_requests = total_requests + 1`. Because an assignment appears in the function body, `total_requests` is registered as a purely local variable. At runtime, evaluating the right-hand side (`total_requests + 1`) tries to read the local variable before it has been assigned a value, raising `UnboundLocalError`. To modify the global variable, declare `global total_requests` at the top of the function.
*يحدد بايثون نطاق المتغيرات **بشكل ساكن وقت الترجمة**؛ فعند رؤية جملة الإسناد `total_requests += 1` يدرج المفسر المتغير في جدول المتغيرات المحلية حصرياً. وعند التشغيل، تحاول الدالة قراءة المتغير المحلي أولاً لجمعه مع 1 قبل أن تُسند إليه أي قيمة، فينهار الكود بخطأ `UnboundLocalError`. والحل هو التصريح عنه عبر `global total_requests`.*

**Incorrect / مشتت غير صحيح:** Python functions can freely read global variables; it is the *assignment* that triggers local classification.
*تستطيع الدوال قراءة المتغيرات العامة بحرية تامة؛ ولكن محاولة التعديل والإسناد هي ما يحول المتغير إلى محلي.*

**Incorrect / مشتت غير صحيح:** The function will crash on the very first execution; it never reaches the return statement.
*ستنهار الدالة فوراً عند أول تشغيل ولن تصل مطلقاً لسطر الإرجاع.*
:::
