---
id: "first-class-closures"
version: "1.0.0"
title: "First-Class Functions & Higher-Order Combinators"
track: "programming"
module: "mod-09"
estimated_minutes: 15
prerequisites: ["pure-functions-recursion"]
i18n:
  ar: "دوال الرتبة الأولى والمجمعات الوظيفية العليا (Map, Filter, Fold)"
---

# First-Class Functions & Higher-Order Combinators

In rigid legacy programming languages, functions were treated like rigid factory machines bolted to the floor: you could feed data into them, but you could never move the machine itself. 

In modern languages, functions are First-Class Citizens. This means a function is treated exactly like any ordinary value—like an integer, a string, or a decimal. You can assign a function to a variable, store functions inside a list, pass a function as an argument into another function, or even write a function whose entire job is to manufacture and return brand-new functions!

A function that accepts a

:::simulation-widget{engine="canvas2d" component="HigherOrderPipelineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{map}: (\mathcal{A} \to \mathcal{B}) \times \mathcal{L}(\mathcal{A}) \to \mathcal{L}(\mathcal{B})
$$

في اللغات البرمجية القديمة والجامدة، كانت الدوال تُعامل كآلات ثقيلة مثبتة في أرضية المصنع: يمكنك تلقيمها بالبيانات، لكن لا يمكنك تحريك الآلة نفسها.
في اللغات الحديثة، تُعتبر الدوال كائنات من الرتبة الأولى (First-Class Citizens). هذا يعني أن الدالة تعامل تماماً كأي رقم أو نص عادي: يمكنك تخزينها في متغير، ووضعها داخل قائمة، وتمريرها كوسيط (Argument) إلى دالة أخرى، أو حتى جعل دالة تنشئ دالة جديدة وتعيدها كناتج!
الدالة التي تقبل دالة أخرى أو تعيدها تسمى دالة من الرتبة العليا (Higher-Order Function). ومن هنا ينبثق الثالوث المقدس لمعالجة البيانات:
 التحويل (Map): يمر على كل عنصر في

:::python-challenge{id="py-first-class-closures"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Callable, Any

class PipelineExecutionError(Exception):
    """Raised when an intermediate stage of a pipeline fails."""
    pass

def compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]:
    """
    Composes arbitrary unary functions into a left-to-right execution pipeline.
    
    Returns a callable with a .steps attribute and error wrapping.
    """
    # TODO: Implement left-to-right function pipeline
    raise NotImplementedError("Implement compose_pipeline")
```
:::
