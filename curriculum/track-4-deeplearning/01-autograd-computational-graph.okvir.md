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

Every mathematical expression evaluated on a computer—from a single polynomial to a multi-billion parameter transformer—can be broken down into an acyclic network of elementary binary and unary mathematical operations ($+, -, \times, \div, \text{exp}, \text{log}$). In traditional computer programming, when you compute c = a  b, the CPU calculates the product, stores the scalar in a memory register, and immediately discards the lineage: it forgets that c was born from the pairing of a and b.

Automatic differentiation (Autograd) transforms passive numerical values into active graph ver

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
v_i = f_i(\{v_j\}_{j \in \text{Parents}(v_i)}), \quad \mathcal{G} = (\mathcal{V}, \mathcal{E}), \quad \mathcal{V} = \{v_1, v_2, \dots, v_N\}, \quad \mathcal{E} = \{(v_j, v_i) \mid v_j \in \text{Parents}(v_i)\}
$$

تُعد عقدة التفاضل التلقائي السلمية الحجر الأساس والخلية الذرية لمحركات التمايز التلقائي في وضع الانحدار العكسي. عند استدعاء عملية حسابية مثل الجمع أو الضرب، لا تكتفي العقدة بحساب النتيجة الرقمية العابرة، بل تقوم ديناميكياً بإنشاء رأس (Vertex) جديد ضمن رسم بياني موجه غير دائري (DAG)، مع الاحتفاظ بمؤشرات مرجعية للعقد الأبوية التي تولدت منها. يشكل هذا سجلاً تاريخياً دقيقاً لمسار التنفيذ الحسابي، مما يتيح لاحقاً تحليل الحساسية وحساب التدرجات في زمن خطي يتناسب طردياً مع عدد العمليات وبمعزل عن حجم مدخلات النموذج.

:::python-challenge{id="py-autograd-computational-graph"}
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
    _prev: set['Value']
    _op: str
    def __init__(self, data: float | int, _children: tuple['Value', ...] = (), _op: str = '') -> None: ...
    def __add__(self, other: 'Value' | float | int) -> 'Value': ...
    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...
    def __pow__(self, other: float | int) -> 'Value': ...
    def __neg__(self) -> 'Value': ...
    def __sub__(self, other: 'Value' | float | int) -> 'Value': ...
    def __radd__(self, other: float | int) -> 'Value': ...
    def __rmul__(self, other: float | int) -> 'Value': ...
    def __rsub__(self, other: float | int) -> 'Value': ...
```
:::
