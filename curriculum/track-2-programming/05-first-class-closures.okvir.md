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

In Python, functions are not rigid second-class subroutines; they are **first-class objects** just like integers, strings, or lists. You can store a function in a variable, pass it as an argument, return it from another function, or store it inside a dictionary.

A **Closure** is a first-class function equipped with a **traveling backpack**: when an inner function references a variable defined in its enclosing outer function and is returned, it packs that variable into special `cell` objects attached to `__closure__`. Even after the outer function finishes executing and its stack frame is destroyed and cleaned from memory, the inner function carries its backpack wherever it travels, remembering its birthplace!

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

في بايثون، الدوال ليست مجرد إجراءات ثانوية جامدة، بل هي **كائنات من الرتبة الأولى** (First-Class Objects) شأنها شأن الأرقام والنصوص. يمكنك تخزين الدالة في متغير، أو تمريرها كوسيط، أو إعادتها كقيمة من دالة أخرى، أو حفظها في قاموس.

أما **الغلاف المعجمي (Closure)** فهو دالة ترتدي **حقيبة ظهر سحرية**: عندما تشير دالة داخلية إلى متغير معرّف في نطاق خارجي وتُعاد كقيمة، فإنها تحزم ذلك المتغير في خلايا خاصة ملحقة بالخاصية `__closure__`. وحتى بعد أن تنتهي الدالة الخارجية تماماً ويتحلل إطارها من مكدس الذاكرة، تظل الدالة الداخلية تحمل حقيبة ظهرها معها أينما ذهبت متذكرةً القيم التي نشأت في كنفها!

Formally, a closure is a pair consisting of a compiled code object and an environment mapping free variables: $\text{FreeVars}(\text{code}) = \text{Names}(\text{code}) \setminus \text{Locals}(\text{code})$. CPython implements this by allocating a `PyCellObject` in the heap. Both the enclosing scope and the inner function hold pointers to this cell. If the inner function mutates the value, the cell's `cell_contents` pointer is updated. This enables stateful factories, memoization decorators, and encapsulation without classes.

معمارياً، الغلاف المعجمي هو زوج يتكون من كائن كود مترجم وتخطيط بيئة للمتغيرات الحرة: $\text{FreeVars}(\text{code}) = \text{Names}(\text{code}) \setminus \text{Locals}(\text{code})$. ينفذ CPython ذلك عبر حجز كائن خلية `PyCellObject` في الكومة. يحتفظ النطاق الخارجي والدالة الداخلية بمؤشرات تشير لذات الخلية. وإذا عُدلت القيمة، يُحدث المؤشر `cell_contents`. هذا المفهوم هو الأساس لمصانع الدوال، والمزخرفات (Decorators)، وتغليف البيانات دون فئات.

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
    calls_made = 0

    def rate_limiter() -> bool:
        nonlocal calls_made
        if calls_made < max_calls:
            calls_made += 1
            return True
        return False

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
  *[20, 20, 20] — ترتبط المتغيرات في أغلفة بايثون بالمرجع (Late-Binding)؛ تشترك كافة الدوال في نفس المتغير 'i' الذي استقر عند القيمة 2.*
- [ ] [0, 10, 20] — Each lambda captures an immutable snapshot of 'i' at its respective loop iteration.
  *[0, 10, 20] — تلتقط كل دالة لقطة مجمدة غير قابلة للتغيير للمتغير 'i' أثناء دورتها الخاصة.*
- [ ] [0, 0, 0] — The variable 'i' goes out of scope after the list comprehension and resets to 0.
  *[0, 0, 0] — يخرج المتغير 'i' من النطاق بعد اكتمال القائمة ويعود للصفر.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** The closures look up the value of 'i' when the functions are called, not when they are created. By that time, the loop has finished and 'i' is 2. The fix is default binding: `lambda x, i=i: x * i`.
*تبحث الدوال عن قيمة 'i' لحظة استدعائها وليس لحظة تعريفها. وعند الاستدعاء تكون الحلقة قد انتهت وأصبحت قيمة 'i' تساوي 2. الحل هو الربط بالوسيط الافتراضي `lambda x, i=i: x * i`.*

**Incorrect / مشتت غير صحيح:** Python does not capture lexical variables by value; it captures references to cells.
*بايثون لا يلتقط القيم بالقيمة Snapshot بل يلتقط المرجع للخلية.*

**Incorrect / مشتت غير صحيح:** In Python 3, list comprehension iteration variables do not reset to 0; they are scoped to the comprehension.
*المتغير لا يعود للصفر بل يحتفظ بآخر قيمة وصل إليها داخل النطاق.*
:::
