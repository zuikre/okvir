---
id: "swiglu-feedforward-activation"
version: "1.0.0"
title: "Continuous State-Space Models (SSM) & Zero-Order Hold (ZOH) Discretization"
track: "deeplearning"
module: "mod-44"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer"]
i18n:
  ar: "نماذج فضاء الحالة المستمرة (SSM) والتقطيع بمسك المرتبة الصفرية (ZOH)"
---

# Continuous State-Space Models (SSM) & Zero-Order Hold (ZOH) Discretization

Classical Transformers suffer from a fundamental computational bottleneck: self-attention scales quadratically ($O(L^2)$) with sequence length $L$. Can we model long sequences with the parallel training throughput of a CNN and the constant-time $O(1)$ per-token inference of an RNN?

To answer this, modern deep learning turned to Continuous State-Space Models (SSMs), drawn from control theory and dynamical systems:

:::simulation-widget{engine="canvas2d" component="ContinuousSsmS4Lab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
h'(t) = \mathbf{A} h(t) + \mathbf{B} x(t)
$$

تحول "نماذج فضاء الحالة المستمرة" (SSMs) إشارات السلاسل أحادية البعد عبر نظام ديناميكي كامن تحكمه معادلات تفاضلية خطية عادية. ولمعالجة السلاسل الرقمية المنفصلة من الرموز، تخضع معاملات النظام المستمر $(\mathbf{A}, \mathbf{B})$ لعملية تقطيع رياضي باستخدام تقنية "مسك المرتبة الصفرية" (ZOH) بالاعتماد على خطوة زمنية متعلمة $\Delta$. ينتج هذا التحويل التحليلي مصفوفات انتقال منفصلة $(\bar{\mathbf{A}}, \bar{\mathbf{B}})$ تحافظ على التطابق الرياضي الدقيق مع المعادلة التفاضلية الأصلية، مما يمهد الطريق لنمذجة السلاسل بتعقيد حسابي دون تربيعي.

:::python-challenge{id="py-swiglu-feedforward-activation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def discretize_zoh(
    delta: np.ndarray,
    A: np.ndarray,
    B: np.ndarray
) -> tuple[np.ndarray, np.ndarray]: ...
```
:::
