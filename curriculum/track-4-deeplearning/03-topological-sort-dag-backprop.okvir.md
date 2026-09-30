---
id: "topological-sort-dag-backprop"
version: "1.0.0"
title: "Topological Sort DAG Execution & Gradient Accumulation"
track: "deeplearning"
module: "mod-35"
estimated_minutes: 15
prerequisites: ["reverse-mode-derivative-closures", "pure-functions-recursion"]
i18n:
  ar: "تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات"
---

# Topological Sort DAG Execution & Gradient Accumulation

Imagine a complex manufacturing supply chain where sub-assemblies flow downstream into larger modules, culminating in a single finished product: the scalar loss $L$. If you want to determine how a defect in the final product traces back to raw material suppliers, you cannot inspect components in random order. If component $C$ feeds into both component $D$ and component $E$, you cannot calculate the total sensitivity of $C$ until both $D$ and $E$ have finished calculating their sensitivities and pushed their feedback back into $C$.

This ordering requirement is formalised by the Topological

:::simulation-widget{engine="canvas2d" component="AdjointBackpropCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\frac{\partial L}{\partial v_i} = \sum_{j \in \text{Children}(v_i)} \frac{\partial L}{\partial v_j} \frac{\partial v_j}{\partial v_i}
$$

يستلزم التمايز التلقائي العكسي اجتياز الرسم البياني الحسابي وفق ترتيب طوبولوجي معكوس. يضمن هذا الترتيب أنه عند تنفيذ خطوة التفاضل العكسي لأي عقدة، تكون جميع العقد المستهلكة لمخرجاتها (الأبناء) قد أنهت حساباتها بالفعل، مما يكفل أن التدرج التراكمي المحسوب للعقدة $\bar{v}_i = \sum_{j} \bar{v}_j \frac{\partial v_j}{\partial v_i}$ يعبر عن المشتقة الكلية الشاملة قبل أن ينتقل التأثير العكسي إلى العقد السابقة.

:::python-challenge{id="py-topological-sort-dag-backprop"}
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
    # Full autograd Value node with backward()
    def backward(self) -> None: ...
    # Builds topological order, sets seed grad to 1.0, calls _backward() in reverse
```
:::
