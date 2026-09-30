---
id: "recurrent-neural-networks-bptt"
version: "1.0.0"
title: "Rotary Position Embeddings (RoPE) & Complex Phasors"
track: "deeplearning"
module: "mod-40"
estimated_minutes: 15
prerequisites: ["two-layer-mlp-xor-boundary"]
i18n:
  ar: "التضمينات الموضعية الدورانية (RoPE) وأطوار الأعداد المركبة"
---

# Rotary Position Embeddings (RoPE) & Complex Phasors

Self-attention is fundamentally permutation-equivariant: if you scramble the words in a sentence into random order, the attention mechanism computes the exact same set of representations, merely permuted in position. To understand grammar, word order, and context, the Transformer must be explicitly injected with positional information.

Early models used Absolute Positional Embeddings (APE):
1. Sinusoidal encodings (Vaswani et al. 2017): $\mathbf{x}_m = \mathbf{e}_m + \mathbf{p}_m$.
2. Learned position tables (GPT-2, BERT): A learned lookup table $\mathbf{P} \in \mathbb{R}^{L_{\max} \t

:::simulation-widget{engine="canvas2d" component="RoPEPhasorCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\langle \mathbf{R}_m \mathbf{q}, \mathbf{R}_n \mathbf{k} \rangle = g(\mathbf{q}, \mathbf{k}, m - n)
$$

تدمج "التضمينات الموضعية الدورانية" (RoPE) الموضع النسبي داخل آلية الانتباه عبر مؤثرات تدوير متعامدة ثنائية الأبعاد. ومن خلال تجميع إحداثيات الميزات في أزواج ثنائية وتدويرها في المستوى المركب بزاوية تتناسب طردياً مع موضع الرمز $m$ وتردده الهندسي $\theta_i$، تضمن RoPE أن حاصل الضرب الداخلي بين الاستعلامات والمفاتيح يعتمد حصراً على المسافة النسبية $(m - n)$. يحفظ هذا التأصيل الهندسي أطوال المتجهات ويمكن النماذج من استيعاب سياقات نصية فائقة الطول.

:::python-challenge{id="py-recurrent-neural-networks-bptt"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import numpy as np

def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray:
    """Apply 2D Rotary Position Embeddings (RoPE)."""
    # TODO: 1. Calculate inverse frequency theta for i in [0, D/2 - 1]
    # TODO: 2. Compute phase angles m * theta for sequence positions m in [0, S - 1]
    # TODO: 3. Perform 2D rotation on adjacent (even, odd) features
    pass
```
:::
