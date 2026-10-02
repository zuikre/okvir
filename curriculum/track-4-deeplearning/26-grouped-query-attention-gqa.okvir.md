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

## Beat 1: Tactile Intuition

As context windows expanded from 2,048 tokens in GPT-3 to 32,768, 128,000, and even 1,000,000 tokens in modern frontier foundation models, the **KV Cache Memory Wall** became the single greatest bottleneck in production LLM inference serving. In classical Multi-Head Attention (MHA), every single query head possesses its own dedicated key and value head ($H_Q = H_{KV}$). For a model with 64 attention heads, 64 distinct Key matrices and 64 distinct Value matrices must be allocated in GPU memory and read across the memory bus for every single generated token.

In 2019, Google researcher Noam Shazeer proposed **Multi-Query Attention (MQA)** to alleviate this bottleneck: all $H_Q$ query heads share a *single* Key-Value head pair ($H_{KV} = 1$). While MQA dramatically slashes KV cache memory consumption and memory bandwidth by a factor of $H_Q \times$ (an astounding $64\times$ reduction), this extreme compression often degrades model reasoning capacity, multi-entity tracking, and fine-grained attention expressivity on complex synthetic benchmarks.

**Grouped-Query Attention (GQA)**, introduced by Joshua Ainslie et al. (2023), established the Pareto-optimal architectural sweet spot now universally adopted across frontier models such as LLaMA 2/3, Mistral, and Gemma. Instead of an all-or-nothing trade-off, GQA partitions the $H_Q$ query heads into $G = H_{KV}$ equal groups. Each group of query heads shares a single Key-Value head projection ($1 < H_{KV} < H_Q$). For instance, a model with 64 query heads grouped into 8 KV heads ($G=8$) achieves an $8\times$ reduction in KV cache memory footprint with virtually indistinguishable perplexity compared to standard full MHA.

> **Frontier Analogy:** Think of classroom tutoring. Standard MHA is like hiring a dedicated private tutor for every single student (high quality, but financially unsustainable). MQA is like assigning one overwhelmed tutor to teach 32 students at once (cheap, but quality drops). GQA organizes students into 8 study groups of 4 students, each guided by a specialized tutor—maintaining high-touch pedagogical quality while drastically reducing costs.

During autoregressive inference decoding, GQA dramatically boosts hardware efficiency. Because memory bandwidth rather than arithmetic compute is the primary constraint, reducing the number of bytes that must be streamed from HBM into on-chip cache allows the GPU to decode tokens up to $4\times$ to $6\times$ faster while enabling significantly larger serving batch sizes on the same physical hardware cluster.

مع اتساع نوافذ السياق إلى عشرات ومئات الآلاف من الرموز في النماذج اللغوية الحديثة، أصبح "جدار ذاكرة التخزين المؤقت للمفاتيح والقيم" العائق الأساسي الذي يقيد سعة الخوادم وسرعة الاستدلال في بيئات الإنتاج الحية. في انتباه الرؤوس المتعددة الكلاسيكي (MHA)، يمتلك كل رأس استعلام رأساً مخصصاً ومستقلاً للمفاتيح والقيم ($H_Q = H_{KV}$). هذا يعني أنه لنموذج يحتوي على 64 رأساً، يجب تخزين واسترجاع 64 مصفوفة مختلفة من الذاكرة في كل خطوة توليد لرمز واحد.

قدمت أبحاث غوغل عام 2019 تقنية **انتباه الاستعلام المتعدد (MQA)** كحل جذري: حيث تشترك كافة رؤوس الاستعلام في رأس مفاتيح وقيم وحيد ($H_{KV} = 1$). ورغم أن هذا التصميم قلص حجم الذاكرة بمعامل مذهل يصل إلى $64\times$، إلا أنه تسبب في تراجع ملحوظ في دقة النموذج وقدرته على الاستدلال المنطقي وتتبع الكيانات المتعددة في المهام المعقدة.

ابتكر الباحثون معمارية **انتباه الاستعلامات المجمعة (GQA)** في عام 2023 كحل هندسي متوازن تبنته كبرى النماذج العالمية مثل LLaMA 3 وMistral: حيث تُقسم رؤوس الاستعلام إلى مجموعات متساوية، تشترك كل مجموعة منها في زوج واحد من رؤوس المفاتيح والقيم ($1 < H_{KV} < H_Q$). فإذا كان لدينا 64 رأس استعلام مقسمة إلى 8 مجموعات تشترك في 8 رؤوس مفاتيح وقيم، ينخفض استهلاك الذاكرة وحركة البيانات بنسبة $8\times$ مع الحفاظ على الأداء التوليدي المتميز ومطابقة دقة MHA الكلاسيكية بدقة متناهية.

يشبه هذا النظام مجموعات الدراسة التفاعلية: ففي حين يتطلب النظام الكلاسيكي معلماً خاصاً لكل طالب على حدة (مكلف للغاية في الموارد)، ويفرض نظام MQA معلماً واحداً لثلاثين طالباً (مما يخفض جودة الاستيعاب)، ينظم نظام GQA الطلاب في 8 مجموعات تخصصية يشرف على كل منها معلم بارع؛ مما يوفر توازناً مثالياً بين الكفاءة العالية وجودة التعلم الفائقة.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

---

## Beat 2: Formal Mathematical Anchor

In Grouped-Query Attention, the $H_Q$ query heads are organized into $H_{KV}$ groups, each containing $r = H_Q / H_{KV}$ query heads. For each group $g \in \{1, \dots, H_{KV}\}$ and head index $i \in \{1, \dots, r\}$, the attention head is computed against the shared Key and Value projections:

$$
r = \frac{H_Q}{H_{KV}}, \quad \text{head}_{g, i} = \text{softmax}\left(\frac{\mathbf{q}_{g, i} \mathbf{k}_g^T}{\sqrt{d_k}}\right) \mathbf{v}_g
$$

All $H_Q$ contextualized heads are then concatenated and projected back to the hidden model dimension:

$$
\text{Output} = \left[ \text{head}_{1, 1} \mathbin{\Vert} \dots \mathbin{\Vert} \text{head}_{1, r} \mathbin{\Vert} \dots \mathbin{\Vert} \text{head}_{H_{KV}, r} \right] \mathbf{W}_O
$$

The memory footprint and HBM transfer bandwidth are scaled down by the compression ratio:

$$
\text{Memory Compression Ratio} = \frac{H_{KV}}{H_Q} = \frac{1}{r}
$$

### Comprehensive Symbol & Parameter Breakdown

| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |
| :--- | :--- | :--- | :--- |
| $H_Q$ | $\mathbb{Z}^+$ | Total number of Query attention heads | Dictates the diversity and expressivity of questions the model can ask. |
| $H_{KV}$ | $\mathbb{Z}^+$ | Total number of Key and Value attention heads | Dictates the number of distinct memory streams stored in the KV cache. |
| $r = H_Q / H_{KV}$ | $\mathbb{Z}^+$ | Head repetition / expansion ratio | Number of query heads that share the same key-value projection pair. |
| $\mathbf{q}_{g, i}$ | $\mathbb{R}^{T \times d_k}$ | Query projection for head $i$ inside group $g$ | Emits distinct query representations for specialized contextual search. |
| $\mathbf{k}_g, \mathbf{v}_g$ | $\mathbb{R}^{S \times d_k}$ | Shared Key and Value representations for group $g$ | Reused across all $r$ queries in group $g$, eliminating redundant memory allocations. |
| $\mathbin{\Vert}$ | Operator | Tensor concatenation across head channel dimension | Combines all $H_Q$ contextualized heads prior to output projection $\mathbf{W}_O$. |
| $\mathbf{W}_O$ | $\mathbb{R}^{d \times d}$ | Final multi-head linear projection | Merges all grouped attention head representations into the model dimension. |

يوضح هذا الجدول كيف يختزل GQA حجم الذاكرة المستهلكة بنسبة $1/r$؛ فعندما يكون $H_Q = 64$ و$H_{KV} = 8$، تصبح نسبة الضغط $1/8 = 12.5\%$، مما يعني توفير $87.5\%$ من ذاكرة البطاقة الرسومية المخصصة للتخزين المؤقت دون المساس بجودة التوليد.

---

## Beat 3: Python Challenge

Implement `repeat_kv` to expand the fewer Key and Value heads in GQA so that they match the number of Query heads for batched attention computation.

:::python-challenge{id="py-grouped-query-attention-gqa"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 2, 4, 8)); out = repeat_kv(x, 4); float(out.shape[1])"
    expected: "8.0"
  - input: "x = np.ones((1, 4, 4, 8)); out = repeat_kv(x, 2); float(out.shape[1])"
    expected: "8.0"
  - input: "x = np.ones((2, 1, 3, 4)); out = repeat_kv(x, 8); float(out.shape[1])"
    expected: "8.0"
---
```python
import numpy as np

def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:
    """
    Expands Key or Value tensor heads to match the number of Query heads in GQA.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, n_kv_heads, S, D)
        Input Key or Value tensor with fewer heads.
    n_rep : int
        Repetition factor (r = n_q_heads // n_kv_heads).
        
    Returns
    -------
    np.ndarray of shape (B, n_kv_heads * n_rep, S, D)
        Broadcasted tensor matching Query head dimensionality.
    """
    # Step 1: If repetition factor is 1, return the tensor as-is
    if n_rep == 1:
        return x
        
    B, n_kv_heads, S, D = x.shape
    
    # Step 2: Insert new singleton dimension for repetition: (B, n_kv_heads, 1, S, D)
    x_expanded = np.expand_dims(x, axis=2)
    
    # Step 3: Broadcast repeat along the new singleton axis
    x_repeated = np.repeat(x_expanded, n_rep, axis=2)
    
    # Step 4: Reshape by collapsing n_kv_heads and n_rep into the total heads dimension
    return x_repeated.reshape(B, n_kv_heads * n_rep, S, D)
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

**Scenario:** You are leading an engineering team serving a 70B parameter model in production. The model currently uses standard Multi-Head Attention (MHA) with 64 heads ($H_Q = 64, H_{KV} = 64$) and head dimension $d = 128$. At peak traffic, the inference cluster saturates memory bandwidth, and users experience unacceptable generation latency. Your team decides to convert the model to Grouped-Query Attention (GQA) with 8 KV heads ($H_{KV} = 8$) via mean-pooling uptraining. What is the precise quantitative impact on KV cache throughput and capacity?

* [ ] Model parameter size increases by $8\times$, requiring 8 additional GPUs.
* [x] The KV cache memory footprint is reduced by exactly $8\times$ (from 64 heads down to 8 heads), allowing the same hardware to serve an $8\times$ larger batch size while reducing memory bandwidth pressure by $87.5\%$, drastically accelerating autoregressive token decode latency.
* [ ] Attention compute complexity drops from $\mathcal{O}(N^2)$ to $\mathcal{O}(N)$ during the prefill phase.
* [ ] GQA eliminates the need for causal attention masking during autoregressive inference.

> **Insight & Option Analysis:**
> - **Option A is incorrect:** GQA actually reduces the number of parameters in the Key and Value projection matrices ($\mathbf{W}_K, \mathbf{W}_V$ shrink by $8\times$); it never increases parameter count.
> - **Option B is correct:** Because the cache size per token is directly proportional to $H_{KV}$, reducing $H_{KV}$ from 64 to 8 yields $\frac{8}{64} = \frac{1}{8}$ of the original memory consumption. This 87.5% memory reduction allows serving 8 times as many concurrent users in the same VRAM footprint while reducing HBM read traffic proportionally.
> - **Option C is incorrect:** During prefill, all queries still attend to all keys; the algorithmic time complexity of attention remains $\mathcal{O}(N^2)$ unless paired with linear or tiled attention kernels.
> - **Option D is incorrect:** Autoregressive generation still requires preserving the arrow of time; causal masking remains essential to prevent future token information leakage.
