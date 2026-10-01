---
id: "kv-caching-autoregressive-generation"
version: "1.0.0"
title: "Key-Value (KV) Caching & Autoregressive Inference Generation"
track: "deeplearning"
module: "mod-43"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer"]
i18n:
  ar: "التخزين المؤقت للمفاتيح والقيم (KV Caching) والتوليد ذاتي الانحدار"
---

# Key-Value (KV) Caching & Autoregressive Inference Generation

During LLM pretraining, computation is parallelized across all $T$ tokens simultaneously via the causal triangular mask. However, during real-world inference generation, tokens are produced strictly one by one in an autoregressive loop: to predict token $t+1$, the model requires the output of token $t$.

In a naive implementation without caching, generating token $t+1$ requires feeding all preceding $t$ tokens back into the model. Across all transformer layers, the linear projections for Query ($\mathbf{Q}$), Key ($\mathbf{K}$), and Value ($\mathbf{V}$) are recalculated from scratch for every past token—even though their contextual representations for tokens $1, \dots, t-1$ never change! This naive recomputation scales quadratically as $\mathcal{O}(T^2)$ total operations over a sequence of length $T$.

**Key-Value (KV) Caching** solves this computational bottleneck by persisting the computed $\mathbf{K}$ and $\mathbf{V}$ tensor states across past decoding steps in GPU High-Bandwidth Memory (HBM).

> **Frontier Analogy:** KV caching is like keeping scratch notes so you don't reread the entire book from scratch on every word. When writing the next word in an essay, you only check your margin notes for key ideas and references, appending a single bullet point for the latest sentence rather than re-reading all 500 preceding pages from word one.

في مرحلة الاستدلال وتوليد النصوص الحية، تُنتج النماذج اللغوية الكلمات رمزاً تلو الآخر بصورة تتابعية ذاتية الانحدار. في التنفيذ الساذج غير المحسن، تضطر كل خطوة زمنية إلى إعادة حساب متجهات الاستعلام والمفاتيح والقيم لجميع الرموز السابقة من البداية، مما يرفع التعقيد الحسابي الإجمالي إلى $\mathcal{O}(T^2)$ ويهدر طاقة المعالجة في تكرار حسابات متطابقة لا تتغير قيمتها الرياضية مطلقاً.

تقنية **التخزين المؤقت للمفاتيح والقيم (KV Caching)** تشبه تدوين ملاحظات موجزة في مسودتك الجانبية حتى لا تضطر إلى إعادة قراءة الكتاب بأكمله من الصفحة الأولى عند كتابة كل كلمة جديدة! عند وصول الرمز الجديد في الخطوة $t$، نقوم بحساب الاستعلام والمفتاح والقيمة للرمز الحالي فقط ($T=1$)، ثم نلحق المفتاح والقيمة الجدد بمسودة الذاكرة المحفوظة مسبقاً في بطاقة الرسوميات، مما يختزل الحسابات إلى زمن خطي $\mathcal{O}(T)$ لكل رمز مولد.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{K}_{\text{cached}}^{(t)} = \begin{bmatrix} \mathbf{K}_{\text{cached}}^{(t-1)} \\ \mathbf{k}_t \end{bmatrix} \in \mathbb{R}^{t \times d_k}, \quad \mathbf{V}_{\text{cached}}^{(t)} = \begin{bmatrix} \mathbf{V}_{\text{cached}}^{(t-1)} \\ \mathbf{v}_t \end{bmatrix} \in \mathbb{R}^{t \times d_v}
$$

$$
\mathbf{q}_t = \mathbf{x}_t \mathbf{W}_Q, \quad \mathbf{k}_t = \mathbf{x}_t \mathbf{W}_K, \quad \mathbf{v}_t = \mathbf{x}_t \mathbf{W}_V
$$

$$
\mathbf{a}_t = \text{softmax}\left(\frac{\mathbf{q}_t \left(\mathbf{K}_{\text{cached}}^{(t)}\right)^T}{\sqrt{d_k}}\right) \mathbf{V}_{\text{cached}}^{(t)} \in \mathbb{R}^{1 \times d_v}
$$

$$
\text{Memory}_{\text{KV}} = 2 \times 2 \times n_{\text{layers}} \times n_{\text{heads}} \times d_{\text{head}} \times T \times B \quad \text{(bytes in FP16)}
$$

#### Step-by-Step Parameter Breakdown
- $\mathbf{x}_t \in \mathbb{R}^{1 \times d}$: Current single-token embedding at generation step $t$.
- $\mathbf{q}_t \in \mathbb{R}^{1 \times d_k}$: Single-row Query vector for the newest token.
- $\mathbf{k}_t \in \mathbb{R}^{1 \times d_k}, \mathbf{v}_t \in \mathbb{R}^{1 \times d_v}$: Key and Value vectors for the current token appended along the sequence length dimension.
- $\mathbf{K}_{\text{cached}}^{(t)}, \mathbf{V}_{\text{cached}}^{(t)}$: Persistent tensors storing historical keys and values across the context window $1 \dots t$.
- $\mathbf{a}_t \in \mathbb{R}^{1 \times d_v}$: The single-token contextual attention output vector.
- FLOPs per step: Reduced from $\mathcal{O}(t \cdot d^2)$ down to $\mathcal{O}(1 \cdot d^2)$ for projections, and $\mathcal{O}(t \cdot d)$ for attention scoring.

:::python-challenge{id="py-kv-caching-autoregressive-generation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, None, None, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])"
    expected: "1.0"
  - input: "x = np.ones((1, 1, 4)); k_prev = np.ones((1, 1, 4)); v_prev = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, k_prev, v_prev, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])"
    expected: "2.0"
---
```python
import numpy as np

def kv_cache_decoder_step(
    x_t: np.ndarray,
    k_cache: np.ndarray | None,
    v_cache: np.ndarray | None,
    W_q: np.ndarray,
    W_k: np.ndarray,
    W_v: np.ndarray,
    W_o: np.ndarray
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Executes an autoregressive step for a single token using KV Caching.
    
    Parameters
    ----------
    x_t : np.ndarray of shape (B, 1, D)
        New input token embedding at time step t.
    k_cache : np.ndarray or None of shape (B, t-1, D)
        Cached key states from previous generation steps.
    v_cache : np.ndarray or None of shape (B, t-1, D)
        Cached value states from previous generation steps.
    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)
        Projection weight matrices.
        
    Returns
    -------
    out_t : np.ndarray of shape (B, 1, D)
        Attention output for current token.
    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)
        Updated KV cache containing historical + new keys and values.
    """
    B, _, D = x_t.shape
    
    # 1. Project single new token to Q, K, V
    q_t = np.dot(x_t, W_q)  # (B, 1, D)
    k_t = np.dot(x_t, W_k)  # (B, 1, D)
    v_t = np.dot(x_t, W_v)  # (B, 1, D)
    
    # 2. Append new key and value to persistent cache
    if k_cache is None or k_cache.size == 0:
        k_updated = k_t
        v_updated = v_t
    else:
        k_updated = np.concatenate([k_cache, k_t], axis=1)  # (B, t, D)
        v_updated = np.concatenate([v_cache, v_t], axis=1)  # (B, t, D)
        
    # 3. Compute scaled attention: (B, 1, D) @ (B, D, t) -> (B, 1, t)
    d_k = float(D)
    scores = np.matmul(q_t, k_updated.swapaxes(-1, -2)) / np.sqrt(d_k)
    
    # Numerically stable softmax across historical dimension
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # 4. Context aggregation: (B, 1, t) @ (B, t, D) -> (B, 1, D)
    context = np.matmul(attn_weights, v_updated)
    out_t = np.dot(context, W_o)
    
    return out_t, k_updated, v_updated
```
:::

### Transfer & Architectural Reasoning

**Scenario:** You are serving a 70B parameter model (80 layers, 64 attention heads, head dimension $d_k = 128$) to a batch of $B = 32$ concurrent users. Each user generates up to $T = 4\,096$ tokens in FP16 precision. Your operations team reports that although GPU compute utilization is under 25%, generation throughput drops precipitously and requests begin encountering Out-Of-Memory (OOM) errors. What is the root cause?

* **A.** The GPU compute matrix cores suffer thermal throttling due to constant dense matrix multiplications.
* **B.** (*Correct*) The KV cache footprint scales linearly with context length and batch size: calculating $2 \times 2 \times 80 \times 64 \times 128 \times 4096 \times 32 \approx 171.8 \text{ GB}$ reveals that the KV cache alone exceeds the total VRAM of two 80GB A100 GPUs! Because token generation reads the entire KV cache on every single token step for a minimal arithmetic workload ($T=1$), decoding becomes heavily **memory-bandwidth bound**.
* **C.** Softmax denominators underflow to zero when computing attention across 4,096 historical tokens.
* **D.** Causal triangular masking requires quadratic cache storage in CPU host memory.

*Explanation:* During autoregressive generation, reading hundreds of gigabytes of cached keys and values from HBM to register memory for every single token yields an arithmetic intensity of $\approx 1$ FLOP per byte, completely saturating memory bandwidth while leaving GPU compute cores largely idle.
