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

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

Imagine our computational assembly line has grown into an intricate, branching network. Worker X machines a foundational component and supplies copies of it to both Worker Y and Worker Z. Both Y and Z incorporate this component into their own sub-assemblies, which eventually merge into the final finished product delivered at the end of the line. When a final defect is measured at the factory exit—the scalar loss $L$—in what order should we interrogate the workers to assign blame?

Suppose we interrogate Worker X first. At this moment, Worker X has received partial feedback from Worker Y, but Worker Z has not yet completed their calculations. If Worker X calculates their blame right now and passes it back to their own suppliers, Worker X's assessment is fundamentally incomplete and corrupted.

A worker cannot determine their total blame until **every single downstream customer** who consumed their output has completely finished calculating blame and pushed it back upstream!

This fundamental scheduling constraint is solved by **Topological Sorting**. A computational graph is a Directed Acyclic Graph (DAG). By performing a Depth-First Search (DFS) post-order traversal starting from the terminal loss node $L$, we build a linear ordering of nodes. When we reverse this ordering, we obtain the exact sequence required for full backpropagation:
1. Seed the root loss node with its base sensitivity: $\frac{\partial L}{\partial L} = 1.0$.
2. Traverse the list in reverse topological order, calling each node's local `_backward()` closure.
3. Every node is mathematically guaranteed to have accumulated 100% of its incoming gradients from all downstream consumers before it ever fires its own backward closure!

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في خط الإنتاج المتشعب، تخيل أن العامل $X$ يصنع قطعة أساسية ويوزع نسخاً منها على عاملين لاحقين: $Y$ و $Z$. يقوم كل منهما بدمج هذه القطعة في أجزاء فرعية تساهم في تكوين المنتج النهائي. عند رصد خطأ في نهاية الخط (قيمة دالة الخسارة $L$)، بأي ترتيب دقيق يجب أن نحاسب العمال ونمرر التدرجات العكسية؟

إذا تعجلنا وحاسبنا العامل $X$ أولاً، فإن العامل $X$ يكون قد تلقى تدرجاً جزئياً فقط من العامل $Y$، بينما لم ينته العامل $Z$ من حساب نصيبه بعد. وإذا قام العامل $X$ بتمرير مسؤوليته إلى العمال السابقين له في هذه اللحظة، فإنه سيمرر أرقاماً مشوهة وناقصة تفسد مسار التحسين بالكامل.

القاعدة الحتمية التي لا تقبل الاستثناء هي: **لا يجوز لأي عقدة أن تفعل دالتها العكسية وتمرر تدرجها للخلف حتى تجمع كافة التدرجات القادمة من جميع العقد اللاحقة التي استهلكت مخرجاتها**.

يتحقق هذا الترتيب المحكم عبر خوارزمية **الترتيب الطوبولوجي (Topological Sort)**. فبما أن الرسم البياني الحسابي هو رسم موجه غير دائري (DAG)، فإن تنفيذ مسح متعمق (DFS) انطلاقاً من عقدة الخسارة $L$ وبناء ترتيب ما بعدي (Post-Order) ثم عكس هذا الترتيب، يفرز العقد في خط مستقيم نضمن فيه وصول جميع إشارات اللوم إلى العقدة قبل معالجتها. نبدأ بوضع بذرة التدرج $\frac{\partial L}{\partial L} = 1.0$، ثم نستدعي الدوال العكسية بالتتابع لنحصل على تدرجات دقيقة لكافة معاملات الشبكة في مسار زمني خطي فائق الكفاءة.

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

The total derivative of the scalar loss $L$ with respect to an intermediate vertex $v_i$ is given by the multivariate chain rule across the complete set of its direct downstream consumers:

$$
\frac{\partial L}{\partial v_i} = \sum_{j \in \text{Children}(v_i)} \frac{\partial L}{\partial v_j} \cdot \frac{\partial v_j}{\partial v_i}
$$

A topological sort of a directed acyclic graph $\mathcal{G} = (\mathcal{V}, \mathcal{E})$ is a permutation $\pi = (u_1, u_2, \dots, u_N)$ of its vertices such that every directed dependency edge points forward:

$$
\forall (u_j, u_k) \in \mathcal{E} \implies j < k
$$

The full backpropagation sweep executes along the reversed topological permutation $\pi^{\text{rev}} = (u_N, u_{N-1}, \dots, u_1)$:

1. **Seed Initialization:** Set the seed derivative at the terminal loss node:
   $$
   \bar{u}_N \leftarrow 1.0, \quad \text{and} \quad \bar{u}_i \leftarrow 0.0 \quad \forall i \in \{1, 2, \dots, N-1\}
   $$
2. **Reverse Topological Sweep:** For index $i = N$ down to $1$:
   $$
   \forall p \in \text{Parents}(u_i): \quad \bar{p} \mathrel{+}= \bar{u}_i \cdot \frac{\partial u_i}{\partial p}
   $$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\text{Children}(v_i) \subset \mathcal{V}$: The set of downstream nodes that take $v_i$ as an input.
* $\text{Parents}(u_i) \subset \mathcal{V}$: The set of antecedent nodes that produced $u_i$.
* $\pi = (u_1, \dots, u_N)$: The forward topological ordering ensuring no node appears before its prerequisites.
* $\pi^{\text{rev}}$: The reverse topological ordering guaranteeing that all incoming gradients $\bar{u}_j$ from children are fully accumulated before $u_i$ distributes blame to its parents.
* $\bar{u}_N \leftarrow 1.0$: The identity seed $\frac{\partial L}{\partial L} = 1.0$ that initiates the chain rule.
* Complexity: Both the forward evaluation and reverse-mode traversal execute in linear time $O(|\mathcal{V}| + |\mathcal{E}|)$.

يضمن الترتيب الطوبولوجي $\pi$ ألا يتم تقييم المشتقة الجزئية لعقدة أبوية إلا بعد أن تستقر وتكتمل المشتقات الإجمالية لجميع العقد الأبناء. بفضل هذه الهندسة الرياضية المحكمة، يتم حساب تدرجات جميع أوزان وانحيازات النموذج العصبي بتعقيد زمني خطي $O(|\mathcal{V}| + |\mathcal{E}|)$ في مسار عكسي واحد متكامل.

---

## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي

Complete the `backward()` method on the `Value` node. Construct the topological ordering using a recursive post-order DFS traversal, initialize the seed gradient `self.grad = 1.0`, and iterate through the reversed list calling each node's `_backward()` closure.

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
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
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
        # Step 1: Build topological ordering using recursive DFS post-order traversal
        topo = []
        visited = set()
        
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
                
        build_topo(self)

        # Step 2: Seed the root gradient (dL/dL = 1.0)
        self.grad = 1.0

        # Step 3: Iterate through reversed topological list and execute node._backward()
        for node in reversed(topo):
            node._backward()
```
:::

---

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

### Transfer Question / سؤال نقل الأثر المعرفي

What fatal issue arises if a programmer introduces a cycle into a computational graph (e.g., $A \to B \to A$) and calls `.backward()`?

* [x] A directed cycle violates the Directed Acyclic Graph (DAG) requirement, causing DFS topological sorting to enter an infinite recursion loop or fail to find a valid linear order; cyclic dependencies (such as in Recurrent Neural Networks) must first be unrolled across discrete time steps into an acyclic spatial graph.
* [ ] The floating-point values in the forward pass immediately overflow to `+inf`.
* [ ] Gradients in cyclic graphs automatically cancel each other out to exactly zero.
* [ ] Python's garbage collector automatically deletes all cyclical nodes before `.backward()` can execute.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
Topological sorting is mathematically defined *only* on Directed Acyclic Graphs (DAGs). If a directed cycle exists ($A \to B \to A$), there is no well-defined starting point or valid permutation where every dependency precedes its consumer: $A$ depends on $B$, which depends on $A$. In software, a recursive DFS traversal will either recurse infinitely until triggering a Python `RecursionError` or fail to produce an order where all gradient contributions are finalized before passing. In recurrent neural architectures (RNNs, LSTMs), recurrence across time is handled by **Backpropagation Through Time (BPTT)**: the network is explicitly unrolled across discrete time steps $t = 1, \dots, T$, transforming temporal cycles into a strictly acyclic feedforward DAG.

**Why the distractors are incorrect:**
1. *The floating-point values in the forward pass immediately overflow...*: False. Cycles cause infinite graph recursion in the topological sorter, not an immediate numeric overflow during forward floating-point multiplication.
2. *Gradients in cyclic graphs automatically cancel each other out...*: False. Gradients do not magically sum to zero; the algorithm cannot even establish an order to accumulate them.
3. *Python's garbage collector automatically deletes all cyclical nodes...*: False. Modern Python uses a cyclic garbage collector that specifically handles reference cycles; it does not delete live objects in active use.

*الشرح باللغة العربية:*
يشترط الترتيب الطوبولوجي انعدام الحلقات الدائرية في الرسم البياني (DAG). فإذا وُجدت حلقة دائرية مثل $A \to B \to A$، يستحيل تحديد أي العقدتين يجب تقييمها أولاً، وستدخل خوارزمية البحث بالعمق في حلقة تكرار لا نهائية تفيض بسعة مكدس الاستدعاءات (`RecursionError`). لحل هذه المعضلة في الشبكات العصبية العودية (RNNs)، نقوم بفرد الشبكة عبر الزمن (Unrolling through time)، محولين التكرار الزمني إلى شبكة مكانية غير دائرية ومستقيمة تماماً.
