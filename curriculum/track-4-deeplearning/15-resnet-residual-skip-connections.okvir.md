---
id: "resnet-residual-skip-connections"
version: "1.0.0"
title: "Multi-Head Attention (MHA) & Subspace Projection Routing"
track: "deeplearning"
module: "mod-39"
estimated_minutes: 15
prerequisites: ["stride-padding-receptive-fields", "rmsnorm-residual-highways"]
i18n:
  ar: "الانتباه متعدد الرؤوس وتوجيه الإسقاط في الفضاءات الجزئية"
---

# Multi-Head Attention (MHA) & Subspace Projection Routing

A single self-attention head computes a single convex combination of value vectors:

:::simulation-widget{engine="canvas2d" component="MultiHeadAttentionLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{y}_i = \sum_{j} A_{ij} \mathbf{v}_j
$$

تُمكّن آلية "الانتباه متعدد الرؤوس" (Multi-Head Attention) نماذج المحولات من استيعاب المعلومات والتركيز المشترك على فضاءات تمثيلية جزئية متعددة في مواضع مختلفة من السلسلة. فعبر إسقاط الاستعلامات والمفاتيح والقيم في $H$ فضاءات فرعية منخفضة الأبعاد ($d_k = d_{\text{model}} / H$)، يتخصص كل رأس انتباه في التقاط ميزات لغوية أو تركيبية أو دلالية متباينة. يتم بعد ذلك دمج المخرجات المتوازية وإسقاطها خطياً عبر المصفوفة $\mathbf{W}_O$ لصهر السياقات المتعددة دون زيادة التكلفة الحسابية الإجمالية.

:::python-challenge{id="py-resnet-residual-skip-connections"}
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

def multi_head_attention_forward(X, W_q, W_k, W_v, W_o, num_heads, is_causal=False):
    """Execute full Multi-Head Attention forward pass."""
    # TODO: 1. Project Q, K, V
    # TODO: 2. Reshape and transpose to (B, num_heads, S, d_k)
    # TODO: 3. Compute batched scaled dot-product attention with optional causal mask
    # TODO: 4. Concatenate heads back to (B, S, D) and project via W_o
    pass
```
:::
