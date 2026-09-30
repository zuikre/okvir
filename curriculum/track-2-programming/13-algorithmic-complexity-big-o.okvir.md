---
id: "algorithmic-complexity-big-o"
version: "1.0.0"
title: "Python Data Model & Dunder Protocols"
track: "programming"
module: "mod-12"
estimated_minutes: 15
prerequisites: ["python-lists-memory-growth"]
i18n:
  ar: "نموذج بيانات بايثون وبروتوكولات الدوال المزدوجة (Dunder Protocols)"
---

# Python Data Model & Dunder Protocols

In many classical object-oriented languages (like Java), if you want your custom object to be sortable, printable, or countable, you must formally declare that your class inherits from a rigid corporate hierarchy of interfaces (implements Comparable, Serializable, List).

Python does not care who your class's parents are. Python embraces Duck Typing:
"If it walks like a duck and quacks like a duck, it is a duck."

How does Python implement this duck typing under the hood? Through Dunder Protocols (short for "Double Underscore", like __len__ or __getitem__). 
When you type len(

:::simulation-widget{engine="canvas2d" component="DunderProtocolDispatchLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
o \models \mathcal{S} \iff \Big( \texttt{\_\_len\_\_} \in \mathcal{M}(o) \;\land\; \texttt{\_\_getitem\_\_} \in \mathcal{M}(o) \Big)
$$

في لغات البرمجة الكلاسيكية الصارمة، إذا أردت لكائنك البرمجي أن يكون قابلاً للعد أو الترتيب أو الطباعة، يتوجب عليك التصريح رسمياً بوراثة عقود وواجهات برمجية معقدة.
أما في بايثون، فالأمر يعتمد على مبدأ التصنيف بالبط (Duck Typing):
"إذا كان يمشي مثل البطة، ويصدر صوتاً مثل البطة، فهو بطة!"
كيف تُترجم بايثون هذا المبدأ على أرض الواقع؟ عبر ما يُعرف بـ بروتوكولات الدوال المزدوجة (Dunder Methods)، وهي دوال تبدأ وتنتهي بشرطتين سفليتين مثل __len__ و __getitem__.
عندما تكتب len(my_object)، لا تفحص بايثون شجرة العائلة لكائنك، بل تتساءل فقط: "هل يمتلك هذا الكائن دالة اسمها __len__()؟" إن

:::python-challenge{id="py-algorithmic-complexity-big-o"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Any
import math

class Vector2D:
    """
    Immutable 2D Euclidean vector implementing Python data model dunder protocols
    and memory-compact __slots__.
    """
    __slots__ = ("_x", "_y")

    def __init__(self, x: float, y: float) -> None:
        # TODO: Store coordinates as floats
        raise NotImplementedError("Implement Vector2D.__init__")

    @property
    def x(self) -> float:
        raise NotImplementedError("Implement Vector2D.x")

    @property
    def y(self) -> float:
        raise NotImplementedError("Implement Vector2D.y")

    # TODO: Implement __repr__, __eq__, __abs__, __add__, __sub__, __mul__, __rmul__, __matmul__
```
:::
