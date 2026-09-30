---
id: "reverse-mode-derivative-closures"
version: "1.0.0"
title: "Elementary Backward Operations & Local Adjoints"
track: "deeplearning"
module: "mod-35"
estimated_minutes: 15
prerequisites: ["autograd-computational-graph"]
i18n:
  ar: "العمليات العكسية الأولية والمشتقات المرافقة المحلية"
---

# Elementary Backward Operations & Local Adjoints

In multivariable calculus, the chain rule is often perceived as a daunting global expansion of nested partial derivatives. However, viewed from the perspective of an isolated node in a computational graph, the chain rule is profoundly local. A node $v_i$ that combines two parent inputs $a$ and $b$ via an operator $f(a, b)$ needs to know only one thing: how does its own local output change when $a$ or $b$ changes by an infinitesimal amount?

The quantities $\frac{\partial v_i}{\partial a}$ and $\frac{\partial v_i}{\partial b}$ are the local gradients. They are completely oblivious to the rest

:::simulation-widget{engine="canvas2d" component="DynamicDagLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\bar{a} = \bar{v}_i \cdot \frac{\partial v_i}{\partial a}, \quad \bar{b} = \bar{v}_i \cdot \frac{\partial v_i}{\partial b}
$$

تمثل المشتقات المرافقة المحلية (Local Adjoints) معدل التغير اللحظي لعملية حسابية أولية بالنسبة لوسائطها المباشرة. تفكك خوارزمية التمايز العكسي المشتقة الكلية للدالة المعقدة إلى سلسلة متتابعة من الحسابات المحلية؛ حيث تنفذ كل عقدة دالة عكسية (Backward Closure) تضرب التدرج القادم إليها من العقد اللاحقة في المشتقة المحلية للعملية. هذا الفصل المحلي يعزل الحساب الرياضي لكل عملية عن عمق الشبكة العصيبة وتعقيدها الكلي.

:::python-challenge{id="py-reverse-mode-derivative-closures"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
class Value:
    data: float
    grad: float
    _backward: Callable[[], None]
    def __init__(self, data: float | int, _children: tuple = (), _op: str = '') -> None: ...
    def __add__(self, other: 'Value' | float | int) -> 'Value': ...
    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...
    def relu(self) -> 'Value': ...
```
:::
