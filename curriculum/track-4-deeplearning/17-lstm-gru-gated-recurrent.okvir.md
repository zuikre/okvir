---
id: "lstm-gru-gated-recurrent"
version: "1.0.0"
title: "SwiGLU Gated Feed-Forward Networks & Bilinear Representations"
track: "deeplearning"
module: "mod-40"
estimated_minutes: 15
prerequisites: ["recurrent-neural-networks-bptt"]
i18n:
  ar: "شبكات التغذية الأمامية ذات البوابات SwiGLU والتمثيلات ثنائية الخطية"
---

# SwiGLU Gated Feed-Forward Networks & Bilinear Representations

In the original Transformer architecture, the Feed-Forward Network (FFN) following self-attention is a simple two-layer Multi-Layer Perceptron (MLP) with a ReLU activation:

:::simulation-widget{engine="canvas2d" component="PrePostLnHighwayLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{FFN}(x) = \max(0, x \mathbf{W}_1 + \mathbf{b}_1) \mathbf{W}_2 + \mathbf{b}_2
$$

تستبدل بنية SwiGLU شبكات التغذية الأمامية التقليدية بتحويل ثنائي الخطية مزود ببوابة تحكم ديناميكية. وعبر حساب حاصل الضرب النقطي العنصري (Hadamard Product) بين مسار بوابة مفعلة بدالة Swish ومسار محتوى خطي متوازٍ قبل الإسقاط النهائي، تتيح SwiGLU تعديلاً تكيفياً لقنوات الميزات بناءً على السياق اللحظي. يمنح هذا التفاعل التضاعفي الشبكة قدرة تعبيرية فائقة لنمذجة العلاقات الدلالية المعقدة بنسبة حيرة (Perplexity) أقل بكثير مقارنة بشبكات ReLU أو GELU الكلاسيكية.

:::python-challenge{id="py-lstm-gru-gated-recurrent"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def swiglu_forward(
    x: np.ndarray,
    W_gate: np.ndarray,
    W_up: np.ndarray,
    W_down: np.ndarray
) -> np.ndarray: ...
```
:::
