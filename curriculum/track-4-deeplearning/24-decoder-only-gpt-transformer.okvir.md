---
id: "decoder-only-gpt-transformer"
version: "1.0.0"
title: "Autoregressive Decoder-Only GPT Transformer Architecture"
track: "deeplearning"
module: "mod-43"
estimated_minutes: 15
prerequisites: ["positional-encoding-sinusoidal-rope", "causal-masking-scaled-dot-product"]
i18n:
  ar: "معمارية المحولات التوليدية المفككة فقط (GPT) ذاتية الانحدار"
---

# Autoregressive Decoder-Only GPT Transformer Architecture

While the original 2017 Transformer architecture featured an encoder-decoder topology engineered for bidirectional machine translation, modern generative foundation models (GPT-4, Claude, LLaMA, Mistral) converged completely on the **Decoder-Only** paradigm. This architectural consolidation is grounded in the foundational objective of language modeling: causal next-token prediction, where the joint probability of an arbitrary sequence factorizes autoregressively as:

$$
P(x_1, x_2, \dots, x_T) = \prod_{t=1}^T P(x_t \mid x_1, \dots, x_{t-1})
$$

In a decoder-only architecture, every token at position $t$ is strictly prevented from attending to future tokens $j > t$ via an upper-triangular causal attention mask. Furthermore, contemporary LLMs universally adopt **Pre-LayerNorm (Pre-LN)** or **Pre-RMSNorm**: normalization is applied *prior* to self-attention and feedforward sub-layers rather than after them. This architectural design creates an unimpeded identity shortcut—a clean residual highway—allowing gradients to backpropagate directly from the top loss layer down to the initial token embedding matrix without undergoing exponential dampening or exploding variances.

> **Frontier Analogy:** Envision a high-speed automotive assembly line conveyor belt. Each technician station inspects only the parts already assembled on the belt upstream (causal masking), crafts an upgrade, and gently fastens it onto the moving chassis without stopping or redirecting the main conveyor belt (the residual highway).

بينما صُممت محولات عام 2017 الأصلية بهيكل مزدوج (مشفّر ومفكّك) للترجمة الآلية، استقرت نماذج الذكاء الاصطناعي التوليدي الرائدة الحديثة بالكامل على معمارية "المفكك فقط" (Decoder-Only). يرتكز هذا التوحيد المعماري على الهدف الجوهري لنماذج اللغة الكبيرة: التنبؤ السببي بالرمز التالي عبر التحليل الذاتي الانحدار.

تفرض هذه المعمارية حجبياً سببيّاً مثلثياً علوياً يمنع كلياً تسرب معلومات المستقبل أثناء التدريب المتوازي. بالإضافة إلى ذلك، تستخدم المعماريات الحديثة تقنية "التطبيع المسبق" (Pre-LN / Pre-RMSNorm)؛ حيث تُعايَر التنشيطات قبل دخول طبقات الانتباه والتغذية الأمامية، مما يحافظ على "طريق سريعة للاتصالات المتبقية" (Residual Highway) تتدفق عبرها التدرجات بسلاسة ودون تلاشٍ عبر مئات الطبقات العميقة.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{h}^{(l)\prime} = \mathbf{h}^{(l-1)} + \text{CausalMHA}\left(\text{RMSNorm}(\mathbf{h}^{(l-1)})\right)
$$

$$
\mathbf{h}^{(l)} = \mathbf{h}^{(l)\prime} + \text{MLP}\left(\text{RMSNorm}(\mathbf{h}^{(l)\prime})\right)
$$

$$
P(x_{t+1} \mid x_{\le t}) = \text{softmax}\left(\mathbf{W}_{\text{unembed}} \cdot \text{RMSNorm}\left(\mathbf{h}_t^{(L)}\right)\right)
$$

#### Step-by-Step Parameter Breakdown
- $\mathbf{h}^{(l-1)} \in \mathbb{R}^{B \times T \times d}$: Hidden state activations entering transformer layer $l$, across batch size $B$, sequence length $T$, and model dimension $d$.
- $\text{RMSNorm}(\mathbf{x}) = \frac{\mathbf{x}}{\sqrt{\frac{1}{d} \sum_{i=1}^d x_i^2 + \epsilon}} \odot \boldsymbol{\gamma}$: Root Mean Square normalization that stabilizes variance without the computational overhead of mean-centering.
- $\text{CausalMHA}(\cdot)$: Multi-Head Attention enforcing causal mask $\mathbf{M}_{ij} = -\infty$ for all $j > i$.
- $\mathbf{h}^{(l)\prime}$: Intermediate representations after attention and the first residual highway addition.
- $\text{MLP}(\cdot)$: Feedforward sub-layer (historically GELU MLP, or modern SwiGLU).
- $\mathbf{W}_{\text{unembed}} \in \mathbb{R}^{V \times d}$: Language model unembedding head projecting the final layer hidden state to vocabulary logits across vocabulary size $V$.

تسمح هذه البنية بتدريب مليارات المعاملات بتوازي هائل عبر استغلال كامل الذاكرة التخزينية أثناء مرحلة الملء الأولي (Prefill)، وتوليد الإجابات تدريجياً رمزاً تلو الآخر أثناء مرحلة الاستدلال (Generation).

:::python-challenge{id="py-decoder-only-gpt-transformer"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 4, 8)); forward_gpt_block(x)"
    expected: "1.0"
  - input: "x = np.zeros((1, 4, 8)); forward_gpt_block(x)"
    expected: "0.0"
---
```python
import numpy as np

def rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:
    """RMSNorm across the last dimension."""
    variance = np.mean(x ** 2, axis=-1, keepdims=True)
    return x / np.sqrt(variance + eps)

def causal_attention(q: np.ndarray, k: np.ndarray, v: np.ndarray) -> np.ndarray:
    """
    Scaled dot-product attention with strict lower-triangular causal masking.
    Shapes: (B, T, D)
    """
    B, T, D = q.shape
    scale = 1.0 / np.sqrt(D)
    scores = np.matmul(q, k.swapaxes(-1, -2)) * scale  # (B, T, T)
    
    # Causal mask: mask out upper triangle where col > row
    mask = np.triu(np.full((T, T), -np.inf), k=1)
    scores = scores + mask
    
    # Numerically stable softmax
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    return np.matmul(attn_weights, v)

def forward_gpt_block(x: np.ndarray) -> np.ndarray:
    """
    Executes a single Pre-LayerNorm / Pre-RMSNorm Transformer Decoder block.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, T, D)
        Input token representations.
        
    Returns
    -------
    np.ndarray of shape (B, T, D)
        Updated token representations after residual connections.
    """
    B, T, D = x.shape
    
    # 1. Attention sub-layer with Pre-RMSNorm
    norm_x1 = rms_norm(x)
    # Using identity projections for clean test verification
    attn_out = causal_attention(norm_x1, norm_x1, norm_x1)
    # Residual Highway 1
    h = x + attn_out
    
    # 2. MLP sub-layer with Pre-RMSNorm
    norm_h = rms_norm(h)
    # ReLU MLP projection
    mlp_out = np.maximum(0, norm_h)
    # Residual Highway 2
    out = h + mlp_out
    return out
```
:::

### Transfer & Architectural Reasoning

**Scenario:** During the pre-training of a 100-layer decoder-only foundation model, an engineer proposes reverting from Pre-LN ($\mathbf{x} + \text{Sublayer}(\text{LN}(\mathbf{x}))$) to the original 2017 Post-LN ($\text{LN}(\mathbf{x} + \text{Sublayer}(\mathbf{x}))$) design. Within the first 50 iterations, training diverges catastrophically with NaN gradients. What mathematical property caused Post-LN to fail where Pre-LN succeeded?

* **A.** Post-LN requires doubling the hidden dimension $d$, causing tensor core memory alignment faults.
* **B.** (*Correct*) In Post-LN, gradients passing through the residual connection are repeatedly scaled by the derivative of LayerNorm at every layer; across 100 layers, this compounds exponentially, leading to vanishing gradients in early layers and exploding gradients near the output. In Pre-LN, the residual connection is an unnormalized identity map $\mathbf{x}^{(L)} = \mathbf{x}^{(0)} + \sum_{l=1}^L \text{Sublayer}(\text{LN}(\mathbf{x}^{(l-1)}))$, ensuring gradient signals propagate directly from layer $L$ to layer $0$ without decay.
* **C.** Post-LN cannot be executed on GPUs with tensor cores due to FP16 underflow in softmax denominators.
* **D.** Post-LN introduces cyclical graph dependencies that violate reverse-mode automatic differentiation.

*Explanation:* Xiong et al. (2020) rigorously proved that in Pre-LN, the gradient norm is invariant to depth ($O(1)$ with respect to layer depth $L$), allowing stable training without hyperparameter-sensitive learning rate warmups. Conversely, Post-LN gradient norm decays exponentially as $O(1/\sqrt{L})$, making deep models un-trainable without extreme warmup schedules.
