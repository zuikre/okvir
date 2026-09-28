---
id: "gradient-descent"
version: "1.0.0"
title: "Gradient Descent: Momentum Dynamics"
track: "deeplearning"
module: "module-02"
estimated_minutes: 8
prerequisites: ["gradient-vector"]
i18n:
  ar: "الانحدار التدرجي: ديناميكيات كمية الحركة"
---

# Gradient Descent: Momentum Dynamics

Vanilla gradient descent oscillates violently in narrow ravines. Heavy-ball momentum physics accumulates velocity along consistent directions, dampening orthogonal oscillations.

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
optimizer: "momentum"
learning_rate: 0.05
beta: 0.9
surface: "rosenbrock"
---
:::

The velocity update dampens oscillations while accelerating through flat ravines:

$$
v_{t+1} = \beta v_t - \eta \nabla \mathcal{L}(w_t) \quad w_{t+1} = w_t + v_{t+1}
$$

:::python-challenge{id="sgd-step"}
---
timeout_ms: 3000
test_cases:
  - input: "w = 1.0, lr = 0.01, grad = 2.0"
    expected: "w_new = 0.98"
---
```python
def sgd_update(w: float, lr: float, grad: float) -> float:
    # Parameter update in direction of negative gradient
    return float(w - lr * grad)
```
:::
