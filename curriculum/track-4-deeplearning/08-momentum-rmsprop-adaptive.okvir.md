---
id: "momentum-rmsprop-adaptive"
version: "1.0.0"
title: "Layer Normalization & Invariant Internal Covariate Shift"
track: "deeplearning"
module: "mod-37"
estimated_minutes: 15
prerequisites: ["gradient-descent"]
i18n:
  ar: "تطبيع الطبقات وثبات التحول الداخلي للمتغيرات"
---

# Layer Normalization & Invariant Internal Covariate Shift

As signals propagate forward through dozens of stacked neural network layers, the distribution of activations at each layer shifts continuously with every parameter update—a phenomenon historically termed internal covariate shift. If activations at layer 50 drift towards huge values, the subsequent layers will saturate and gradients will vanish or explode, causing deep architectures to fail to train entirely.

While Batch Normalization (BatchNorm) solved this for CNNs by computing statistics across the mini-batch dimension, it completely collapses in sequence models and Transformers:
1

:::simulation-widget{engine="canvas2d" component="NormalizationGeometryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mu = \frac{1}{d} \sum_{i=1}^d x_i, \quad \sigma^2 = \frac{1}{d} \sum_{i=1}^d (x_i - \mu)^2
$$

تعمل تقنية "تطبيع الطبقات" (Layer Normalization) على تثبيت التمثيلات العميقة في الشبكات العصبية عبر معايرة تنشيطات كل عينة بشكل مستقل تماماً عبر أبعاد ميزاتها الخفية. وخلافاً لتقنية تطبيع الدفعات (Batch Normalization) التي تعتمد على إحصائيات الدفعة وتنهار عند التعامل مع السلاسل متغيرة الطول أو عند التوليد التتابعي بعينة واحدة، تعزل LayerNorm عملية التطبيع داخل متجه كل رمز على حدة. يمنح هذا الإجراء ثباتاً عددياً أمام التحولات والتوسعات الخطية، مما يوفر مساراً آمناً لتدريب محولات الانتباه فائقة العمق.

:::python-challenge{id="py-momentum-rmsprop-adaptive"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def layernorm_forward(
    x: np.ndarray,
    gamma: np.ndarray,
    beta: np.ndarray,
    eps: float = 1e-5
) -> tuple[np.ndarray, dict]: ...
# x: shape (..., D)
# gamma, beta: shape (D,)
# Returns: (normalized_output: np.ndarray, cache: dict)
```
:::
