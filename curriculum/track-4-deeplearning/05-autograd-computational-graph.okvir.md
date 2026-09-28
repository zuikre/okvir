---
id: "autograd-computational-graph"
version: "1.0.0"
title: "OkvirGrad: Reverse-Mode Autograd & Computational Graphs"
track: "deeplearning"
module: "module-01"
estimated_minutes: 8
prerequisites: ["perceptron-activation", "gradient-descent"]
i18n:
  ar: "أوكفير-غراد: التفاضل التلقائي في النمط العكسي ومخططات الحساب"
---

# OkvirGrad: Reverse-Mode Autograd & Computational Graphs

Modern deep learning engines (PyTorch, JAX) build a directed acyclic computational graph during the forward pass and distribute adjoints backwards using the chain rule.

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
expression: "L = 0.5 * (relu(w1*x1 + w2*x2 + b) - y)^2"
learning_rate: 0.1
---
:::

The multivariate chain rule traverses the topological sort in reverse, computing exact partial derivatives:

$$
\frac{\partial L}{\partial w_i} = \sum_{v \in \text{Children}(w_i)} \frac{\partial L}{\partial v} \cdot \frac{\partial v}{\partial w_i}
$$

:::python-challenge{id="py-scalar-backward"}
---
timeout_ms: 3000
test_cases:
  - input: "x = 2.0, w = 3.0, dL_dp = 4.0"
    expected: "8.0"
  - input: "x = 0.5, w = 4.0, dL_dp = 2.0"
    expected: "1.0"
---
```python
def compute_weight_grad(x: float, w: float, dL_dp: float) -> float:
    # Product rule backward: p = w * x => dp/dw = x => dL/dw = dL/dp * x
    return float(dL_dp * x)
```
:::
