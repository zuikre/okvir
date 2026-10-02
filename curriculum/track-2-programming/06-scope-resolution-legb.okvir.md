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

When Python executes a statement like `print(total)`, how does the interpreter know which object `total` actually refers to? In a large application, there might be dozens of variables named `total` across different functions, modules, and imported packages. Python resolves this ambiguity by searching outward through concentric rings of visibility governed by the **LEGB Rule**.

Picture scope resolution as looking outward through an **apartment complex**:
1. **L — Local**: First, Python looks around the private room you are currently sitting in (the local execution frame of the active function).
2. **E — Enclosing**: If not found, it steps out into the private hallway of any parent function wrapped around you (from innermost nesting scope out to outermost enclosing function).
3. **G — Global**: If still not found, it steps down to the lobby of the entire building (the top-level namespace of the current `.py` module file).
4. **B — Built-in**: Finally, if nowhere in the building, it checks the city's municipal library across the street—Python's built-in namespace containing universal primitives like `len`, `range`, `dict`, and `print`. If the name tag is absent from all four scopes, Python raises a `NameError`.

However, beneath this intuitive hierarchy lurks the single most infamous trap in the Python language: **locality is determined statically at compile time, not dynamically at runtime!**

When Python compiles a function into bytecode before executing a single line, it inspects every statement. If an assignment operator (`x = ...`, `x += ...`, `for x in ...`, or `import x`) appears *anywhere* inside the function body, the compiler stamps `x` as **strictly Local** across the entire function! It does not matter if the assignment occurs on line 100 and you try to read `x` on line 2. The moment Python sees `x` on line 2, it looks exclusively in the local frame. Finding that local `x` has not yet received a value, it does **not** fall back to outer scopes; it throws `UnboundLocalError: local variable referenced before assignment`!

To override this compile-time behavior, Python provides two explicit keywords: `global` and `nonlocal`. Declaring `global x` instructs the compiler to bypass local creation and bind the tag directly to the module-level dictionary (`LOAD_GLOBAL`). Declaring `nonlocal x` tells the compiler to reach into the enclosing parent function's closure cell (`LOAD_DEREF`). Understanding these mechanics demystifies scope resolution and prevents subtle state corruption bugs.

:::simulation-widget{engine="canvas2d" component="ClosureScopeInspector"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{Lookup}(v) = \text{head}\left([ \mathcal{S}_L(v), \mathcal{S}_E(v), \mathcal{S}_G(v), \mathcal{S}_B(v) ] \setminus \{\bot\}\right)
$$

```text
The Concentric LEGB Search Hierarchy:
+-----------------------------------------------------------+
| [B] Built-in Scope (sys.modules['builtins'].__dict__)     |
|   +-----------------------------------------------------+ |
|   | [G] Global Module Scope (globals() dictionary)      | |
|   |   +-----------------------------------------------+ | |
|   |   | [E] Enclosing Closures (cell pointers)        | | |
|   |   |   +-----------------------------------------+ | | |
|   |   |   | [L] Local Frame (fastlocals C array)    | | | |
|   |   |   |     LOOKUP STARTS HERE ---> [x]         | | | |
|   |   |   +-----------------------------------------+ | | |
|   |   +-----------------------------------------------+ | |
|   +-----------------------------------------------------+ |
+-----------------------------------------------------------+
```

عندما ينفذ بايثون سطراً مثل `print(total)`، كيف يحدد المفسر أي كائن يشير إليه الاسم `total` على وجه التحديد؟ في الأنظمة البرمجية الضخمة، قد يوجد العشرات من المتغيرات التي تحمل اسم `total` موزعة بين دوال وملفات وحزم برمجية متعددة. يحل بايثون هذا اللبس عبر البحث من الداخل إلى الخارج عبر دوائر متحدة المركز تحكمها **قاعدة LEGB**.

تخيل استبانة النطاق كمن يبحث عن شيء وهو داخل **مجمع سكني**:
1. **L — Local (المحلي)**: يبحث بايثون أولاً داخل الغرفة الخاصة التي تجلس فيها حالياً (إطار التنفيذ المحلي للدالة الحالية).
2. **E — Enclosing (المحيط)**: فإن لم يجد الاسم، يخرج إلى ردهة الشقة التي تحتضن غرفتك (النطاقات الحاضنة من أقرب دالة محيطة حتى أبعدها).
3. **G — Global (العام)**: فإن لم يجده، نزل إلى بهو المبنى بأكمله (نطاق ملف الموديول `.py` الحالي كاملاً عبر قاموس `globals()`).
4. **B — Built-in (المدمج)**: وأخيراً، إن لم يجده في المبنى، خرج إلى المكتبة العامة للمدينة—وهي بيئة دوال بايثون المدمجة الجاهزة كـ `len` و `range` و `print`. فإن لم يجد الاسم في أي من هذه المستويات الأربعة، أطلق استثناء `NameError`.

لكن خلف هذا الترتيب البسيط والبديهي يكمن أشهر فخ برمجي في لغة بايثون: **صفة المحلية تتحدد أثناء الترجمة (Compile Time) وليس أثناء التشغيل!**

عندما يترجم بايثون الدالة إلى شفرة بايت قبل تشغيلها، يفحص نص الدالة بالكامل. فإذا وجد أي عملية إسناد (`x = ...` أو `x += ...` أو `for x in ...`) في *أي سطر* داخل الدالة، يصنف المترجم المتغير `x` كمتغير **محلي حصرياً** في كامل أرجاء الدالة! ولا يهم إن كان سطر الإسناد يقع في السطر رقم 100 بينما حاولت قراءة `x` في السطر رقم 2. فعندما يصل التنفيذ للسطر 2، ينظر بايثون في الإطار المحلي فقط؛ ولأنه لم يُسند بعد، فإنه **لا يبحث في النطاقات الخارجية إطلاقاً**، بل ينهار فوراً بالخطأ القاتل: `UnboundLocalError: local variable referenced before assignment`!

ولإعادة توجيه سلوك المترجم، توفر لغة بايثون كلمتين مفتاحيتين: الكلمة `global` التي تأمر المترجم بتجاوز النطاق المحلي والارتباط مباشرة بالقاموس العام للملف (`LOAD_GLOBAL`)، والكلمة `nonlocal` التي تأمره بالارتباط بخلية الدالة الحاضنة في الغلاف المعجمي (`LOAD_DEREF`). وفهم هذه الميكانيكا العميقة يجنبك الأخطاء الخفية ويمنحك تحكماً معمارياً تاماً في تدفق البيانات.

#### Architectural Breakdown & Opcode Speed:
- **`LOAD_FAST`**: When an identifier is local, CPython statically indexes the `fastlocals` array inside the C-level `PyFrameObject`. This avoids dictionary lookups entirely and executes in pure pointer arithmetic (~5-10 ns).
- **`LOAD_DEREF`**: Emitted for enclosing closure variables, following the `PyCellObject` pointer stored in `f_blockstack`.
- **`LOAD_GLOBAL`**: Emitted for module-level globals and built-ins. Performs a hash table lookup in `f->f_globals`, falling back to `f->f_builtins`.
- **Compilation Pass**: Python compilers scan for `STORE_*` instructions in the AST. Any symbol targeted by a store operation is marked local unless declared `global` or `nonlocal`.

#### التحليل المعماري وسرعة أوامر شفرة البايت:
- **أمر `LOAD_FAST`**: للمتغيرات المحلية، يصل CPython مباشرة إلى مصفوفة `fastlocals` داخل بنية إطار لغة C، متجاوزاً جداول التجزئة تماماً لينفذ في زمن نانوثوانٍ معدودة.
- **أمر `LOAD_DEREF`**: يصدر للمتغيرات المحيطة في الأغلفة، متتبعاً مؤشر الخلية `PyCellObject`.
- **أمر `LOAD_GLOBAL`**: يصدر للمتغيرات العامة والمدمجة، ويتطلب بحثاً في جدول تجزئة القاموس `f_globals` ثم `f_builtins`.
- **مرحلة الترجمة الساكنة**: يفحص مترجم بايثون شجرة الإعراب الساكنة (AST)؛ وأي رمز يتعرض لعملية تخزين أو تعيين يُوسم محلياً ما لم يُستثنَ صراحة بـ `global` أو `nonlocal`.

:::python-challenge{id="py-scope-resolution-legb"}
---
timeout_ms: 3000
test_cases:
  - input: "(lambda a: [a[0](5.0), a[1]()])(create_isolated_accumulator(10.0))"
    expected: "[15.0, 15.0]"
  - input: "create_isolated_accumulator(42.0)[1]()"
    expected: "42.0"
  - input: "create_isolated_accumulator(0.0)[0](100.0)"
    expected: "100.0"
---
```python
from typing import Any

def create_isolated_accumulator(initial_sum: float = 0.0) -> tuple[Any, Any]:
    """
    Creates an isolated accumulator that manages state across closures
    using the `nonlocal` keyword, preventing accidental global scope contamination.

    Returns:
        A tuple of two functions: (add_amount, get_current_total).
          - add_amount(amount: float) -> float (adds amount to total and returns new total)
          - get_current_total() -> float (returns current accumulated total)
    """
    # Step 1: Initialize current_total in the enclosing scope
    current_total = initial_sum

    # Step 2: Define mutator function with nonlocal binding
    def add_amount(amount: float) -> float:
        # Step 3: Inform the compiler not to mark current_total as local
        nonlocal current_total
        current_total += amount
        return current_total

    # Step 4: Define accessor function that reads current_total
    def get_current_total() -> float:
        return current_total

    # Step 5: Return pair of functions capturing the shared lexical cell
    return add_amount, get_current_total
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Consider this code:
```python
counter = 0
def increment():
    counter += 1
increment()
```
Why does this raise `UnboundLocalError: local variable 'counter' referenced before assignment`?
*تأمل الكود التالي:
```python
counter = 0
def increment():
    counter += 1
increment()
```
لماذا يطلق هذا الكود خطأ `UnboundLocalError: local variable 'counter' referenced before assignment`؟*

- [x] The assignment `counter += 1` causes Python to compile 'counter' as a Local variable for the entire function; attempting to read it before assignment fails.
  *عملية الإسناد `counter += 1` تجعل المترجم يصنف 'counter' كمتغير محلي للدالة بأكملها؛ فتفشل محاولة قراءته السابقة للإسناد.*
- [ ] Global variables are strictly read-only in Python and can never be modified by functions.
  *المتغيرات العامة في بايثون للقراءة فقط ولا يمكن لأي دالة تعديلها مطلقاً.*
- [ ] Because Python functions cannot access variables defined outside their body without passing them as arguments.
  *لأن دوال بايثون لا تستطيع قراءة أي متغير خارجي إلا بتمريره كوسيط.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Augmented assignment `counter += 1` translates under the hood to `counter = counter + 1`. The presence of the assignment target `counter =` causes Python's compiler to classify `counter` as Local to `increment()`. At runtime, the right-hand side `counter + 1` executes first, attempting to read the local variable before any local binding has occurred. To resolve this, declare `global counter` at the start of the function.
*العملية المركبة `counter += 1` تُترجم في شفرة البايت إلى `counter = counter + 1`. وجود عملية التعيين على اليسار يجعل مترجم بايثون يوسم `counter` محلياً في جدول الرموز. وعند التشغيل، يُقيَّم الطرف الأيمن `counter + 1` أولاً، فيحاول قراءة المتغير المحلي قبل أن يحصل على قيمة، فيحدث الخطأ. والحل هو كتابة `global counter` في أول سطر بالدالة.*

**Incorrect / مشتت غير صحيح:** Global variables can be mutated in place or rebound by functions if explicitly declared with `global`.
*المتغيرات العامة ليست للقراءة فقط، بل يمكن تعديلها وإعادة ربطها بحرية تامة عند التصريح عنها صراحة باستخدام `global`.*

**Incorrect / مشتت غير صحيح:** Python functions can freely read enclosing and global variables; the error occurs exclusively because the assignment statement turned it into an uninitialized local variable.
*تستطيع الدوال قراءة المتغيرات العامة بحرية تامة، والخطأ نتج حصرياً عن وجود سطر الإسناد الذي حوّله لمتغير محلي غير مهيأ.*
:::
