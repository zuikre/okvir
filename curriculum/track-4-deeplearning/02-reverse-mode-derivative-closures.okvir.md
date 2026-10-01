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

## Beat 1: Tactile Intuition

In multivariable calculus, the chain rule is often taught as an intimidating cascade of nested partial derivative expansions. But from the perspective of an individual worker on our computational assembly line, backpropagation is delightfully simple and purely local.

Consider Worker C performing a multiplication $c = a \times b$. Worker C does not need to know whether the neural network has two layers or two hundred layers, nor what loss function sits at the end of the factory. Worker C only needs to answer one local question:
*"If $c$ receives 1 unit of blame from downstream, how much blame should I pass back to $a$, and how much to $b$?"*

By basic calculus:
* For addition ($c = a + b$), $\frac{\partial c}{\partial a} = 1$ and $\frac{\partial c}{\partial b} = 1$. The upstream blame passes straight through to both inputs without modification.
* For multiplication ($c = a \times b$), $\frac{\partial c}{\partial a} = b$ and $\frac{\partial c}{\partial b} = a$. Each input receives blame scaled by the *other* input's value!
* For ReLU ($c = \max(0, a)$), if the gate was open ($a > 0$), blame passes through; if the gate was closed ($a \le 0$), blame is stopped dead at 0.

Each node stores this local recipe inside a Python closure function (`_backward`). The closure captures the local derivatives, waits until the upstream gradient (`out.grad`) arrives, and then distributes blame to its parent nodes using `+=`.

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في حساب التفاضل متعدد المتغيرات، تبدو قاعدة السلسلة كمعادلة متداخلة معقدة. لكن عند النظر إليها من منظور عقدة حسابية منفردة في خط التجميع، فإن التفاضل العكسي عملية محلية بالغة الأناقة والبساطة.

تأمل عقدة تنفذ عملية ضرب $c = a \times b$. لا تحتاج هذه العقدة لمعرفة أي تفاصيل عن بقية الشبكة العصبية الممتدة لآلاف الطبقات، بل تحتاج فقط لمعرفة قاعدتها المحلية: إذا تلقت العقدة $c$ مقداراً معيناً من اللوم الرياضي (التدرج $\bar{c}$)، فكيف توزعه على مدخليها $a$ و $b$؟
في الجمع، يمر اللوم بالتساوي لكلا الطرفين بمعدل 1. وفي الضرب، يتناسب لوم كل طرف طردياً مع قيمة الطرف المقابل ($\bar{a} = \bar{c} \cdot b$). وفي دالة التقويم ReLU، يمر اللوم كاملاً إذا كان المدخل موجباً، وينقطع تماماً إذا كان سالباً. تختزل العقدة هذه القاعدة في دالة إغلاق عكسية (`_backward`)، تتربص حتى وصول التدرج القادم من الخلف لتضربه في المشتقة المحلية وتراكمه في المدخلات الأبوية.

---

## Beat 2: Formal Mathematical Anchor

Under reverse-mode automatic differentiation, the adjoint variable $\bar{v}_i \coloneqq \frac{\partial L}{\partial v_i}$ represents the total derivative of the scalar objective $L$ with respect to node $v_i$. For an elementary operation $v_{\text{out}} = f(v_1, v_2)$, the chain rule dictates:

$$
\bar{v}_1 \mathrel{+}= \bar{v}_{\text{out}} \cdot \frac{\partial f(v_1, v_2)}{\partial v_1}, \quad \bar{v}_2 \mathrel{+}= \bar{v}_{\text{out}} \cdot \frac{\partial f(v_1, v_2)}{\partial v_2}
$$

Elementary local derivatives:
$$
\frac{\partial (v_1 + v_2)}{\partial v_1} = 1, \quad \frac{\partial (v_1 \cdot v_2)}{\partial v_1} = v_2, \quad \frac{\partial \text{ReLU}(v_1)}{\partial v_1} = \mathbb{I}(v_1 > 0)
$$

Where:
* $\bar{v}_{\text{out}} = \frac{\partial L}{\partial v_{\text{out}}}$: The upstream adjoint (incoming gradient from downstream consumers).
* $\frac{\partial f}{\partial v_j}$: The local Jacobian/derivative evaluated at the forward values of the inputs.
* $\mathrel{+}=$: The accumulation operator, strictly required by multivariable calculus whenever a node branches into multiple consumers.
* $\mathbb{I}(\cdot)$: The indicator function, evaluating to $1$ when true and $0$ otherwise.

تمثل المتغيرات المرافقة $\bar{v}_i = \frac{\partial L}{\partial v_i}$ معدل الحساسية الكلي لدالة الهدف بالنسبة لكل عقدة. وفق قاعدة السلسلة الموضعية، يتضاعف التدرج العائد من الخلف بمقدار المشتقة الجزئية المباشرة للعملية. ويعد استخدام مؤثر الجمع التراكمي $\mathrel{+}=$ إلزاماً رياضياً تفرضه قاعدة السلسلة متعددة المتغيرات عند تفرع مخرجات العقدة إلى أكثر من مسار استهلاك لاحق.

---

## Beat 3: Interactive Python Scratchpad

Equip the scalar `Value` node with local backward closures (`_backward`) for addition, multiplication, and ReLU activation. Ensure gradients accumulate into children using `+=`.

:::python-challenge{id="py-reverse-mode-derivative-closures"}
---
timeout_ms: 3000
test_cases:
  - input: "a = Value(2.0); b = Value(3.0); c = a * b; c.grad = 1.0; c._backward(); print(f\"{a.grad},{b.grad}\")"
    expected: "3.0,2.0"
  - input: "x = Value(-1.5); r = x.relu(); r.grad = 1.0; r._backward(); print(x.grad)"
    expected: "0.0"
---
```python
class Value:
    """Scalar autograd node with reverse-mode backward closures."""
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')
        # TODO: Define out._backward closure propagating out.grad to self.grad and other.grad using +=
        pass
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')
        # TODO: Define out._backward closure implementing the product rule with +=
        pass
        return out

    def relu(self):
        out = Value(max(0.0, self.data), (self,), 'relu')
        # TODO: Define out._backward closure passing out.grad only if self.data > 0
        pass
        return out
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

Why is it a catastrophic bug in automatic differentiation to write `self.grad = out.grad` instead of `self.grad += out.grad` inside the backward closure?

* [x] If a variable is used more than once in the forward computation (e.g., $y = x \times x$ or branching residual paths), the multivariable chain rule requires summing the gradients from all downstream paths: $\frac{\partial L}{\partial x} = \sum_j \frac{\partial L}{\partial y_j} \frac{\partial y_j}{\partial x}$. Direct assignment overwrites and forgets gradients from earlier paths.
* [ ] Direct assignment fails because Python garbage collects variables that are assigned multiple times.
* [ ] Addition is necessary to prevent floating-point underflow when gradients are near zero.
* [ ] The gradient of any addition operation in calculus is defined as zero.

> **Insight:** In computational graphs, variables frequently branch (e.g., in skip connections, multi-head projections, or polynomial powers). Whenever a node has an out-degree $> 1$, its total derivative is the sum of paths. Accumulating with `+=` is the software manifestation of the multivariable chain rule.
