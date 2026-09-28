---
id: "transformer-attention"
version: "1.0.0"
title: "Scaled Dot-Product Self-Attention"
track: "deeplearning"
module: "module-04"
estimated_minutes: 8
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "الانتباه الذاتي الموزون بالجداء النقطي"
---

# Scaled Dot-Product Self-Attention

Self-attention allows every token in a sequence to dynamically attend to every other token, computing content-based pairwise affinity weights.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
num_tokens: 5
scale_factor: "sqrt_dk"
show_softmax_distribution: true
---
:::

The Query-Key-Value formulation scales dot products by \\( \sqrt{d_k} \\) to prevent vanishing softmax gradients in high dimensions:

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V
$$

:::python-challenge{id="attention"}
---
timeout_ms: 3000
test_cases:
  - input: "Q, K, V with d_k = 64"
    expected: "Scaled attention matrix"
---
```python
import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> np.ndarray:
    # Compute attention scores scaled by sqrt(d_k)
    d_k = Q.shape[-1]
    scores = np.matmul(Q, K.T) / np.sqrt(d_k)
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    return np.matmul(weights, V)
```
:::
