---
id: "topological-sort-dag-backprop"
version: "1.0.0"
title: "Topological Sort DAG Execution & Full Backpropagation"
track: "deeplearning"
module: "mod-35"
estimated_minutes: 15
prerequisites: ["reverse-mode-derivative-closures", "pure-functions-recursion"]
i18n:
  ar: "تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات"
---

# Topological Sort DAG Execution & Full Backpropagation

## Beat 1: Tactile Intuition

In our factory assembly line, imagine Worker X supplies sub-assemblies to both Worker Y and Worker Z, who both contribute to the final product delivered to the customer. When a defect is discovered at the factory exit (the scalar loss $L$), in what order should we interrogate the workers?

If we interrogate Worker X first, Worker X has only received partial feedback—perhaps from Worker Y, but not yet from Worker Z! If Worker X calculates their blame prematurely, their backward contribution will be incomplete and corrupt.

You cannot determine a worker's total blame until **every single downstream customer** who used that worker's output has finished calculating their blame and pushed it back upstream!

This ordering principle is called **Topological Sort**. By performing a Depth-First Search (DFS) post-order traversal starting from the final loss node $L$, we build a linear ordering of nodes such that every edge points in the same direction. When we reverse this list, we get the exact sequence needed for backpropagation:
1. Start at the root loss node $L$ and set its gradient to the base seed $\frac{\partial L}{\partial L} = 1.0$.
2. Step through each node in reverse topological order, calling its local `_backward()` closure.
3. Every node is guaranteed to have accumulated 100% of its incoming gradients from all downstream consumers before it ever fires its own backward closure!

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في خط الإنتاج المتشعب، تخيل أن العامل $X$ يوزع مخرجاته على عاملين لاحقين: $Y$ و $Z$، وكلاهما يساهم في تشكيل المنتج النهائي. عند اكتشاف خلل في مخرج المصنع (قيمة الخسارة $L$)، بأي ترتيب يجب أن نحاسب العمال ونمرر التدرجات العكسية؟

إذا قمنا بمحاسبة العامل $X$ قبل أن ينتهي العاملان $Y$ و $Z$ من حساب نصيبهما من اللوم، فإن العامل $X$ سيمرر تدرجاً جزئياً ناقصاً إلى العمال السابقين له، مما يفسد حسابات الشبكة برمتها. القاعدة الحتمية هي: لا يمكن لعقدة أن تمرر تدرجها للخلف حتى تجمع كل التدرجات القادمة من جميع العقد التي استهلكت مخرجاتها.

يُعرف هذا الترتيب المحكم بـ **الترتيب الطوبولوجي (Topological Sort)**. عبر خوارزمية البحث بالعمق أولاً (DFS)، نرتب عقد الرسم البياني بحيث تأتي العقد اللاحقة دائماً قبل العقد السابقة في المسار العكسي. نبدأ بوضع بذرة التدرج لدالة الخسارة $\frac{\partial L}{\partial L} = 1.0$، ثم نستدعي الدوال العكسية بالتتابع العكسي، مما يضمن كمال ودقة التدرجات الرياضية المتراكمة.

---

## Beat 2: Formal Mathematical Anchor

The total derivative of the scalar loss $L$ with respect to an intermediate vertex $v_i$ is given by the multivariate chain rule across all its direct consumers (children):

$$
\frac{\partial L}{\partial v_i} = \sum_{j \in \text{Children}(v_i)} \frac{\partial L}{\partial v_j} \frac{\partial v_j}{\partial v_i}
$$

A topological sort of a directed acyclic graph $\mathcal{G} = (\mathcal{V}, \mathcal{E})$ is a linear ordering $\pi = (u_1, u_2, \dots, u_N)$ of its vertices such that:

$$
\forall (u_j, u_k) \in \mathcal{E} \implies j < k
$$

The full backpropagation algorithm executes the reverse permutation $\pi^{\text{rev}} = (u_N, u_{N-1}, \dots, u_1)$:
1. **Initialize Seed:** $\bar{u}_N \leftarrow 1.0$, and $\bar{u}_i \leftarrow 0.0$ for all $i < N$.
2. **Reverse Sweep:** For $i = N$ down to $1$:
   $$\forall p \in \text{Parents}(u_i): \quad \bar{p} \mathrel{+}= \bar{u}_i \cdot \frac{\partial u_i}{\partial p}$$

حيث يمثل $\text{Children}(v_i)$ مجموعة العقد التي تعتمد مباشرة على $v_i$. يضمن الترتيب الطوبولوجي $\pi$ ألا يتم تقييم المشتقة الجزئية لعقدة أبوية إلا بعد أن تستقر المشتقات الإجمالية لجميع أبنائها. بفضل هذه الخاصية الطوبولوجية، يتم حساب تدرجات جميع معاملات النموذج بتعقيد زمني خطي $O(|\mathcal{V}| + |\mathcal{E}|)$ في مسار عكسي واحد.

---

## Beat 3: Interactive Python Scratchpad

Complete the `backward()` method on the `Value` node. Construct the topological order using a post-order DFS traversal, initialize `self.grad = 1.0`, and iterate through the reversed list calling each node's `_backward()`.

:::python-challenge{id="py-topological-sort-dag-backprop"}
---
timeout_ms: 3000
test_cases:
  - input: "x = Value(2.0); y = x * x + x; y.backward(); print(f\"{x.grad}\")"
    expected: "5.0"
  - input: "a = Value(3.0); b = Value(4.0); c = a * b; c.backward(); print(f\"{a.grad},{b.grad}\")"
    expected: "4.0,3.0"
---
```python
class Value:
    """Scalar autograd node with full topological DAG backpropagation."""
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')
        def _backward():
            self.grad += out.grad
            other.grad += out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

    def backward(self):
        # TODO: 1. Build topological order list using recursive DFS post-order traversal
        # TODO: 2. Initialize self.grad = 1.0
        # TODO: 3. Iterate through reversed topological list and execute node._backward()
        pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

What fatal issue arises if a programmer introduces a cycle into a computational graph (e.g. $A \to B \to A$) and calls `.backward()`?

* [x] A directed cycle violates the Directed Acyclic Graph (DAG) requirement, causing DFS topological sorting to enter an infinite recursion loop or fail to find a valid linear order; cyclic dependencies (such as in RNNs) must first be unrolled across discrete time steps.
* [ ] The floating-point values in the forward pass immediately overflow to `+inf`.
* [ ] Gradients in cyclic graphs automatically cancel each other out to exactly zero.
* [ ] Python's garbage collector automatically deletes all cyclical nodes before `.backward()` can execute.

> **Insight:** Neural networks with internal recurrence (like RNNs or LSTMs) circumvent this by "unrolling through time" (Backpropagation Through Time, BPTT). Each time step creates a new copy of the hidden state vertex, transforming a cyclic temporal system into an acyclic spatial DAG.
