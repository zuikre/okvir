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

When Python encounters a variable name like `total`, how does it determine which object it points to? It searches outward through concentric circles of vision governed by the **LEGB Rule**:

1. **L**ocal: Inside the currently executing function's room.
2. **E**nclosing: In any nesting function's apartment (from innermost to outermost).
3. **G**lobal: In the current module file's whole building.
4. **B**uilt-in: In the city library of standard Python functions (`len`, `range`, `print`).

The most infamous pitfall in Python is that **locality is determined at compile time**! If a function contains an assignment (`x = ...`) anywhere inside its body, Python marks `x` as Local across the *entire* function. If you try to read `x` before that assignment, Python does not fall back to outer scopes—it raises `UnboundLocalError`!

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

عندما يصادف بايثون اسماً برمجياً مثل `total`، كيف يحدد الكائن المعني؟ يبحث المعالج عبر دوائر متحدة المركز تحكمها **قاعدة LEGB**:

1. **L**ocal (المحلي): داخل غرفة الدالة الحالية التي يجري تنفيذها.
2. **E**nclosing (المحيط): داخل شقة الدوال الحاضنة (من الأقرب للأبعد).
3. **G**lobal (العام): في كامل مبنى الملف الحالي (الموديول).
4. **B**uilt-in (المدمج): في مكتبة المدينة العامة لبايثون (`len`, `range`, `print`).

الفخ الأكثر شهرة وصدمة للمبتدئين هو أن **صفة المحلية تُحدد أثناء الترجمة** (Compile Time)! إن كان هناك سطر تعيين (`x = ...`) في أي مكان داخل الدالة، يُصنف `x` محلياً في كافة أرجائها؛ فإذا حاولت قراءته قبل سطر التعيين، لن يبحث بايثون في النطاقات الخارجية بل يفاجئك بخطأ `UnboundLocalError`!

CPython optimizes local variable lookup into array indexing. Because local variable names are statically known at compile time, reading a local variable emits the lightning-fast `LOAD_FAST` opcode, which directly indexes the frame's `fastlocals` C array in nanoseconds. Enclosing variables emit `LOAD_DEREF` to traverse cell pointers, while Global and Built-in variables require dynamic dictionary hash lookups via `LOAD_GLOBAL`. Declaring `global x` or `nonlocal x` changes compiler opcode emission, directing bindings to module dictionaries or closure cells.

يستبدل مفسر CPython البحث عن المتغيرات المحلية بفهرسة مصفوفات مباشرة فائقة السرعة. ولأن أسماء المتغيرات المحلية معروفة مسبقاً أثناء الترجمة، فإن قراءتها تصدر أمر `LOAD_FAST` الذي يصل إلى مصفوفة `fastlocals` في نانوثوانٍ. في حين تصدر المتغيرات المحيطة أمر `LOAD_DEREF`، وتتطلب المتغيرات العامة والمدمجة بحثاً في جداول التجزئة عبر `LOAD_GLOBAL`. استخدام `global` أو `nonlocal` يوجه المترجم لتعديل مسار توليد هذه الأوامر.

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
    current_total = initial_sum

    def add_amount(amount: float) -> float:
        nonlocal current_total
        current_total += amount
        return current_total

    def get_current_total() -> float:
        return current_total

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
**Correct / الإجابة الصحيحة:** Augmented assignment `counter += 1` is syntactic sugar for `counter = counter + 1`. Because 'counter' appears on the left of an assignment, Python tags it local at compile time. During execution, it tries to read the local variable before it has been bound.
*العملية `counter += 1` تكافئ `counter = counter + 1`. وجود المتغير على يسار المساواة يجعله محلياً أثناء الترجمة، وتفشل محاولة قراءته في الطرف الأيمن قبل تعيينه.*

**Incorrect / مشتت غير صحيح:** Global variables can be modified if explicitly declared with the `global counter` statement.
*يمكن تعديل المتغيرات العامة بشرط التصريح عنها صراحة باستخدام `global counter`.*

**Incorrect / مشتت غير صحيح:** Functions can freely read global variables; the error occurs specifically because the assignment marks it local.
*الدوال تقرأ المتغيرات العامة بحرية، والخطأ حدث تحديداً بسبب محاولة إعادة الإسناد التي جعلته محلياً.*
:::
