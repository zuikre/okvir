---
id: "grouped-query-attention-gqa"
version: "1.0.0"
title: "Grouped-Query Attention (GQA) & Multi-Query Attention (MQA)"
track: "deeplearning"
module: "mod-44"
estimated_minutes: 15
prerequisites: ["kv-caching-autoregressive-generation"]
i18n:
  ar: "انتباه الاستعلامات المجمعة (GQA) وانتباه الاستعلام المتعدد (MQA)"
---

# Grouped-Query Attention (GQA) & Multi-Query Attention (MQA)

As context windows expanded from 2,048 tokens in GPT-3 to 32,768 and 128,000 tokens in modern LLMs, the **KV Cache Memory Wall** became the primary bottleneck in production serving. In classic Multi-Head Attention (MHA), every query head has its own corresponding key and value head ($H_Q = H_{KV}$). For a model with 64 heads, 64 distinct Key and Value matrices must be saved in GPU memory and retrieved across the memory bus on every single decoding step.

In 2019, Noam Shazeer proposed **Multi-Query Attention (MQA)**: all $H_Q$ query heads share a *single* key-value head pair ($H_{KV} = 1$). While MQA slashes KV cache memory consumption and memory bandwidth by $H_Q \times$, this extreme compression often degrades model reasoning capacity and fine-grained attention expressivity.

**Grouped-Query Attention (GQA)** (Ainslie et al., 2023) is the Pareto-optimal architectural sweet spot adopted by LLaMA 2/3, Mistral, and Gemma. Instead of an all-or-nothing trade-off, GQA divides $H_Q$ query heads into $G$ groups, where each group of queries shares a single Key-Value head pair ($1 < H_{KV} < H_Q$). For instance, a model with 64 query heads and 8 KV heads ($G=8$) achieves an $8\times$ reduction in KV cache size with virtually indistinguishable perplexity compared to standard MHA!

> **Frontier Analogy:** Think of classroom tutoring. Standard MHA is like hiring a dedicated private tutor for every single student (high quality, but financially unsustainable). MQA is like assigning one overwhelmed tutor to teach 32 students at once (cheap, but quality drops). GQA organizes students into 8 study groups of 4 students, each guided by a specialized tutor—maintaining high-touch pedagogical quality while drastically reducing costs.

مع اتساع نوافذ السياق إلى عشرات ومئات الآلاف من الرموز في النماذج اللغوية الحديثة، أصبح "جدار ذاكرة التخزين المؤقت للمفاتيح والقيم" العائق الأساسي الذي يقيد سعة الخوادم وسرعة الاستدلال. في انتباه الرؤوس المتعددة الكلاسيكي (MHA)، يمتلك كل رأس استعلام رأساً مخصصاً للمفاتيح والقيم ($H_Q = H_{KV}$). هذا يعني أنه لنموذج يحتوي على 64 رأساً، يجب تخزين واسترجاع 64 مصفوفة مختلفة من الذاكرة في كل خطوة توليد.

قدمت تقنية MQA حلاً متطرفاً بجعل كافة رؤوس الاستعلام تشترك في رأس مفاتيح وقيم وحيد ($H_{KV} = 1$). ورغم أن هذا يقلص حجم الذاكرة بمعامل $64\times$، إلا أنه يتسبب في تراجع ملحوظ في دقة النموذج وقدرته الاستدلالية.

تُعد تقنية **انتباه الاستعلامات المجمعة (GQA)** الحل الهندسي الأمثل المعتمد في LLaMA 3 وMistral: حيث تُقسم رؤوس الاستعلام إلى مجموعات، تشترك كل مجموعة منها في زوج واحد من رؤوس المفاتيح والقيم ($1 < H_{KV} < H_Q$). فإذا كان لدينا 64 رأس استعلام مقسمة إلى 8 مجموعات تشترك في 8 رؤوس مفاتيح وقيم، ينخفض استهلاك الذاكرة وحركة البيانات بنسبة $8\times$ مع الحفاظ على الأداء التوليدي المتميز!

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
r = \frac{H_Q}{H_{KV}}, \quad \text{for group } g \in \{1, \dots, H_{KV}\} \text{ and head } i \in \{1, \dots, r\}:
$$

$$
\text{head}_{g, i} = \text{softmax}\left(\frac{\mathbf{q}_{g, i} \mathbf{k}_g^T}{\sqrt{d_k}}\right) \mathbf{v}_g
$$

$$
\text{Output} = \left[ \text{head}_{1, 1} \mathbin{\Vert} \dots \mathbin{\Vert} \text{head}_{1, r} \mathbin{\Vert} \dots \mathbin{\Vert} \text{head}_{H_{KV}, r} \right] \mathbf{W}_O
$$

$$
\text{Memory Ratio} = \frac{H_{KV}}{H_Q} = \frac{1}{r}
$$

#### Step-by-Step Parameter Breakdown
- $H_Q$: Total number of Query attention heads (e.g., 64 in Llama 3 70B).
- $H_{KV}$: Total number of Key and Value attention heads (e.g., 8 in Llama 3 70B).
- $r = H_Q / H_{KV}$: The head repetition ratio ($64 / 8 = 8$), meaning 8 query heads attend to the same key-value projection.
- $\mathbf{q}_{g, i} \in \mathbb{R}^{T \times d_k}$: The $i$-th query head belonging to the $g$-th group.
- $\mathbf{k}_g, \mathbf{v}_g \in \mathbb{R}^{S \times d_k}$: The single key and value projection shared across all $r$ queries within group $g$.
- $\mathbin{\Vert}$: Tensor concatenation along the head channel dimension.
- KV Cache Memory Reduction: Exactly $\frac{H_{KV}}{H_Q} = \frac{8}{64} = 12.5\%$ of the original MHA memory footprint.

:::python-challenge{id="py-grouped-query-attention-gqa"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 2, 4, 8)); out = repeat_kv(x, 4); float(out.shape[1])"
    expected: "8.0"
  - input: "x = np.ones((1, 4, 4, 8)); out = repeat_kv(x, 2); float(out.shape[1])"
    expected: "8.0"
---
```python
import numpy as np

def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:
    """
    Expands Key or Value tensor heads to match the number of Query heads in GQA.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, H_kv, S, D)
        Key or Value tensor with reduced head count.
    n_rep : int
        Repetition factor (H_q // H_kv).
        
    Returns
    -------
    np.ndarray of shape (B, H_kv * n_rep, S, D)
        Expanded tensor broadcasted across query head groups.
    """
    if n_rep == 1:
        return x
    
    B, H_kv, S, D = x.shape
    # 1. Insert a new axis for repetition: (B, H_kv, 1, S, D)
    x_expanded = x[:, :, np.newaxis, :, :]
    
    # 2. Repeat along the new axis: (B, H_kv, n_rep, S, D)
    x_repeated = np.repeat(x_expanded, n_rep, axis=2)
    
    # 3. Reshape back into unified head dimension: (B, H_kv * n_rep, S, D)
    return x_repeated.reshape(B, H_kv * n_rep, S, D)

def grouped_query_attention(
    q: np.ndarray,
    k: np.ndarray,
    v: np.ndarray,
    w_o: np.ndarray
) -> np.ndarray:
    """
    Computes Grouped-Query Attention forward pass.
    q shape: (B, H_q, T, D)
    k, v shape: (B, H_kv, S, D)
    """
    B, H_q, T, D = q.shape
    _, H_kv, S, _ = k.shape
    assert H_q % H_kv == 0, "Query heads must be an integer multiple of KV heads"
    
    n_rep = H_q // H_kv
    k_expanded = repeat_kv(k, n_rep)  # (B, H_q, S, D)
    v_expanded = repeat_kv(v, n_rep)  # (B, H_q, S, D)
    
    scale = 1.0 / np.sqrt(D)
    scores = np.matmul(q, k_expanded.swapaxes(-1, -2)) * scale
    
    # Softmax across key sequence dimension
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # Context aggregation: (B, H_q, T, D)
    context = np.matmul(weights, v_expanded)
    
    # Reshape and project to model dimension
    context_merged = context.transpose(0, 2, 1, 3).reshape(B, T, H_q * D)
    return np.dot(context_merged, w_o)
```
:::

### Transfer & Architectural Reasoning

**Scenario:** In production benchmarking, LLaMA 3 70B (which utilizes GQA with 8 KV heads and 64 Query heads) achieves over $3.5\times$ higher inference serving token throughput compared to an older architecture of identical parameter count using standard MHA (64 KV heads and 64 Query heads). Why does GQA produce such a dramatic throughput gain during token generation even though both models require approximately the same arithmetic FLOPs?

* **A.** GQA compresses model weights on disk from FP16 to INT8 during cold startup.
* **B.** (*Correct*) The token generation phase of LLMs is heavily memory-bandwidth bound rather than compute bound; each step transfers model weights and the entire KV cache across GPU memory buses. By reducing the KV cache footprint by an $8\times$ factor, GQA drastically diminishes high-bandwidth memory (HBM) data transfers per token, allowing the server to batch significantly more concurrent requests without memory bus saturation.
* **C.** GQA eliminates the need to compute positional encodings (RoPE) for key vectors.
* **D.** GQA uses integer matrix multiplications instead of floating-point arithmetic.

*Explanation:* During autoregressive generation, arithmetic intensity is low ($\approx 1$ FLOP/byte). The throughput bottleneck is how fast the GPU can stream the KV cache from HBM into SRAM. Reducing KV cache size by $8\times$ directly relieves HBM bus congestion.
