---
id: "autograd-computational-graph"
version: "1.0.0"
title: "Scalar Autograd Node & Computational Graph Topology"
track: "deeplearning"
module: "mod-35"
estimated_minutes: 15
prerequisites: ["differentiation-rules-chain", "first-class-closures"]
i18n:
  ar: "عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي"
---

# Scalar Autograd Node & Computational Graph Topology

## Beat 1: Tactile Intuition

Imagine a modern automated assembly line in a high-tech factory. Raw materials enter from the left: Worker A combines two metal rods with an addition weld ($c = a + b$), and Worker B machines the output by scaling it ($d = c \times w$). In traditional software, when the CPU executes `c = a + b`, it writes the sum into a register and immediately forgets the past: it completely discards the lineage that $c$ was born from $a$ and $b$.

Automatic differentiation (Autograd) transforms passive numerical values into active, conscious graph nodes. Every worker on our assembly line keeps a permanent work log. When Worker B finishes an operation, they remember:
1. The exact inputs they received from upstream workers (`_prev` dependencies).
2. The exact mechanical tool they used (`_op = '*'` or `'+'`).
3. Their current output value (`data`).

When a final defect or discrepancy is measured at the end of the factory line—the scalar loss $L$—this historical lineage allows blame (gradients) to be passed backwards step-by-step from worker to worker, answering the foundational question of machine learning: *"If I nudge this worker's input knob by an infinitesimal amount $\epsilon$, exactly how much does the final factory output change?"*

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيّل خط تجميع ذكي داخل مصنع فائق التطور. تتدفق المواد الأولية من اليسار كمدخلات عددية: يقوم العامل الأول بدمج قطعتين بعملية جمع ($c = a + b$)، بينما يقوم العامل الثاني بضرب الناتج في معامل ترجيحي ($d = c \times w$). في البرمجة التقليدية، عندما يحسب المعالج ناتج عملية ما، فإنه يحفظ الرقم النهائي في الذاكرة وينسى نسبه وسلالته التاريخية فوراً؛ أي أنه يجهل تماماً أن $c$ قد تولد من اقتران $a$ مع $b$.

يقوم محرك التفاضل التلقائي (Autograd) بتحويل القيم السلمية الساكنة إلى عقد حية داخل رسم بياني موجه غير دائري (DAG). يحتفظ كل عامل في خط التجميع بسجل تاريخي دقيق يسجل: المدخلات الأبوية التي تلقاها، نوع العملية الحسابية التي نفذها، والقيمة العددية اللحظية. وعند قياس مقدار الخطأ النهائي (دالة الخسارة $L$) عند نهاية الخط، يسمح هذا السجل الطوبولوجي بتمرير إشارات المحاسبة واللوم (التدرجات الرياضية) في الاتجاه العكسي، ليحدد بدقة متناهية نصيب كل متغير في توجيه النتيجة النهائية.

---

## Beat 2: Formal Mathematical Anchor

Mathematically, a dynamic computational graph is a directed acyclic graph $\mathcal{G} = (\mathcal{V}, \mathcal{E})$ where vertices $\mathcal{V}$ represent intermediate scalar quantities and directed edges $\mathcal{E}$ represent functional dependencies:

$$
v_i = f_i\left(\{v_j\}_{j \in \text{Parents}(v_i)}\right), \quad \mathcal{G} = (\mathcal{V}, \mathcal{E}), \quad \mathcal{E} = \{(v_j, v_i) \mid v_j \in \text{Parents}(v_i)\}
$$

Where:
* $v_i \in \mathbb{R}$: The scalar value computed at vertex $i$.
* $f_i: \mathbb{R}^k \to \mathbb{R}$: An elementary differentiable primitive operation ($+, -, \times, \div, (\cdot)^k, \exp, \log$).
* $\text{Parents}(v_i) \subset \mathcal{V}$: The set of antecedent nodes whose values serve as direct arguments to $f_i$.
* $\mathcal{V} = \{v_1, v_2, \dots, v_N\}$: Topological ordering of all generated computational nodes.
* $\mathcal{E}$: Directed edges encoding data lineage, flowing forward during forward evaluation and backward during reverse-mode sensitivity accumulation.

في الصياغة الرياضية الدقيقة، يُعرَّف الرسم البياني الحسابي كفضاء طوبولوجي موجه غير دائري $\mathcal{G} = (\mathcal{V}, \mathcal{E})$. تمثل كل عقدة $v_i$ قيمة سلمية حقيقية ناتجة عن تطبيق دالة أولية قابلة للاشتقاق $f_i$ على مخرجات العقد الأبوية السابقة $\text{Parents}(v_i)$. تشكل الحواف الموجهة $\mathcal{E}$ مسارات تدفق البيانات للأمام ومسارات رجوع تدرجات الحساسية الرياضية في الاتجاه العكسي.

---

## Beat 3: Interactive Python Scratchpad

Build the foundational scalar `Value` node for our micrograd-style autograd engine. Implement `__add__`, `__mul__`, and `__pow__` such that operations accept both `Value` objects and raw Python numeric primitives (`int`, `float`), correctly recording children and operator tags.

:::python-challenge{id="py-autograd-computational-graph"}
---
timeout_ms: 3000
test_cases:
  - input: "a = Value(2.0); b = Value(3.0); c = a * b + 4.0; print(c.data)"
    expected: "10.0"
  - input: "x = Value(3.0); y = x ** 2; print(y.data)"
    expected: "9.0"
---
```python
class Value:
    """Scalar autograd node for dynamic computational graph tracking."""
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        # TODO: Convert other to Value if necessary, return new Value with (self, other) children and '+' op
        pass

    def __mul__(self, other):
        # TODO: Convert other to Value if necessary, return new Value with (self, other) children and '*' op
        pass

    def __pow__(self, other: float | int):
        # TODO: Assert exponent is int or float, return new Value with (self,) child and f'**{other}' op
        pass

    def __neg__(self):
        return self * -1.0

    def __sub__(self, other):
        return self + (-other)

    def __radd__(self, other):
        return self + other

    def __rmul__(self, other):
        return self * other

    def __rsub__(self, other):
        return Value(other) + (-self)
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

Why does reverse-mode automatic differentiation require constructing an explicit graph of connected nodes in memory, rather than simply updating numerical derivatives eagerly during the forward pass?

* [x] In reverse-mode autograd, calculating the sensitivity of an input requires the upstream gradient from the final loss, which is not known until the forward pass completes. Intermediate activations and child-parent links must be retained in memory to evaluate local derivatives backwards.
* [ ] Python floating-point numbers lose hardware precision unless wrapped inside a heap-allocated graph vertex.
* [ ] Forward-mode differentiation is mathematically invalid for scalar addition and multiplication.
* [ ] Dynamic computational graphs are only necessary to prevent memory leaks in GPU tensor cores.

> **Insight:** In forward mode, computing the gradient of $N$ inputs with respect to 1 output requires $N$ separate forward passes. In reverse-mode (backpropagation), a single backward traversal yields gradients for all $N$ parameters simultaneously, but demands saving the execution lineage and forward activations in memory.
