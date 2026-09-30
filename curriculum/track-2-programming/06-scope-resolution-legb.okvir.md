---
id: "scope-resolution-legb"
version: "1.0.0"
title: "Lexical Scope, Static Binding & Closures"
track: "programming"
module: "mod-09"
estimated_minutes: 15
prerequisites: ["first-class-closures"]
i18n:
  ar: "النطاق المعجمي (Lexical Scope) والأغلفة الوظيفية (Closures)"
---

# Lexical Scope, Static Binding & Closures

When a function runs, it looks for variables in its local environment frame. But what happens if a variable is not defined inside the function? 

Programming languages use Lexical Scope (also called Static Scope). The word "lexical" means "relating to text". Lexical scope means that where a function is physically written on your screen determines where it searches for missing variables—not where the function happens to be called later!

Now comes the magic: what happens if an outer function creates an inner function, and that inner function uses a variable from the outer function? 
When

:::simulation-widget{engine="canvas2d" component="ClosureScopeInspector"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{C} = \langle \lambda x. e, \; \mathcal{E}_{\text{def}} \rangle
$$

عندما تعمل دالة، تبحث عن المتغيرات في إطارها المحلي. ولكن ماذا لو استخدمت الدالة متغيراً لم يُعرّف في داخلها؟
تتبع اللغات الحديثة ما يسمى بـ النطاق المعجمي (Lexical Scope). كلمة "معجمي" تعني "متعلق بموقع النص المكتوب". أي أن المكان الذي كُتبت فيه الدالة فعلياً على شاشتك هو الذي يحدد أين تبحث عن المتغيرات المفقودة، وليس المكان الذي تم استدعاؤها منه لاحقاً!
وهنا تحدث المعجزة البرمجية المسماة الغلاف الوظيفي (Closure): ماذا لو قامت دالة خارجية بتوليد دالة داخلية، وكانت الدالة الداخلية تستخدم متغيراً من الدالة الخارجية؟
عندما تنتهي الدالة الخارجية، يُفترض أن تُمسح متغيراتها من الذاكرة. ولكن

:::python-challenge{id="py-scope-resolution-legb"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Callable
from collections import deque

def make_sliding_rate_limiter(
    max_calls: int, 
    window_seconds: float
) -> Callable[[float], tuple[bool, int, float]]:
    """
    Creates a sliding window rate limiter closure tracking request timestamps.

    Args:
        max_calls: Maximum requests permitted per window.
        window_seconds: Duration of the sliding window in seconds.

    Returns:
        A callable taking a timestamp and returning (allowed, remaining, reset_time).
    """
    # TODO: Implement sliding window rate limiter closure
    raise NotImplementedError("Implement make_sliding_rate_limiter")
```
:::
