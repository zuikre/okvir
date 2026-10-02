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

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

During LLM pretraining, computation is parallelized across all $T$ tokens simultaneously via the causal triangular mask. However, during real-world inference generation, tokens are produced strictly one by one in an autoregressive feedback loop: to predict token $t+1$, the model requires the sampled output of token $t$. This fundamental duality separates transformer execution into two distinct regimes: the compute-bound **Prefill phase** (processing the user prompt in parallel) and the memory-bandwidth-bound **Decode phase** (generating tokens sequentially).

In a naive implementation without state caching, generating token $t+1$ requires feeding all preceding $t$ tokens back into the network as a sequence of length $t$. Across all transformer layers, the linear projections for Query ($\mathbf{Q}$), Key ($\mathbf{K}$), and Value ($\mathbf{V}$) are recalculated from scratch for every past token—even though the contextual representations and past keys and values for tokens $1, \dots, t-1$ never change! This naive recomputation forces the GPU to perform $\mathcal{O}(T^2)$ total matrix operations over a sequence of length $T$, resulting in crippling latency that grows worse with every generated word.

**Key-Value (KV) Caching** solves this computational bottleneck by persisting the computed $\mathbf{K}$ and $\mathbf{V}$ tensor activations across past decoding steps directly in GPU High-Bandwidth Memory (HBM). When the new token $x_t$ arrives at step $t$, the model projects only this single token into its current vectors $\mathbf{q}_t, \mathbf{k}_t, \mathbf{v}_t$ ($\text{Sequence Length } = 1$). It then appends $\mathbf{k}_t$ and $\mathbf{v}_t$ to the persistent cache and attends over the full accumulated history.

> **Frontier Analogy:** KV caching is like keeping scratch notes on an index card so you don't re-read the entire book from scratch on every single word. When writing the next word in an essay, you only reference your scratchpad of past key ideas and summary points, appending a single bullet point for the latest sentence rather than re-reading all 500 preceding pages from word one.

While KV caching dramatically cuts projection compute from $\mathcal{O}(T^2)$ down to $\mathcal{O}(T)$, it creates a formidable secondary engineering challenge: the **KV Cache Memory Wall**. Because the cached tensors must be retained in fast VRAM for every active user request across every attention layer and head, serving large batches of users with long context windows quickly consumes hundreds of gigabytes of GPU memory, turning modern LLM inference into a memory-capacity and memory-bandwidth bound workload.

في مرحلة الاستدلال وتوليد النصوص الحية، تُنتج النماذج اللغوية الكلمات رمزاً تلو الآخر بصورة تتابعية ذاتية الانحدار؛ حيث يتطلب التنبؤ بالرمز $t+1$ الحصول أولاً على الرمز المولد في الخطوة السابقة $t$. يقسم هذا الواقع الحسابي تشغيل المحولات إلى مرحلتين متمايزتين: مرحلة "الملء الأولي" (Prefill) التي تعالج مدخلات المستخدم دفعة واحدة بتوازٍ كامل، ومرحلة "فك التشفير" (Decode) التكرارية المتسلسلة.

في التنفيذ الساذج غير المحسن، تضطر كل خطوة زمنية إلى إعادة حساب متجهات الاستعلام والمفاتيح والقيم لجميع الرموز السابقة من البداية، على الرغم من أن المتجهات المحسوبة للرموز السابقة $1, \dots, t-1$ ثابتة ولا تتغير قيمتها الرياضية قط! يؤدي هذا التكرار العبثي إلى رفع التعقيد الحسابي الإجمالي إلى $\mathcal{O}(T^2)$ ويهدر طاقة المعالجة في تكرار حسابات متطابقة، مما يجعل زمن الاستجابة يتفاقم مع كل كلمة جديدة.

تقنية **التخزين المؤقت للمفاتيح والقيم (KV Caching)** تعالج هذا الخلل الجوهري عبر الاحتفاظ بحالات متجهات $\mathbf{K}$ و$\mathbf{V}$ المحسوبة في الخطوات السابقة مباشرة في الذاكرة السريعة للبطاقة الرسومية (HBM). وعند توليد الرمز الجديد في الخطوة $t$، نقوم بحساب الاستعلام والمفتاح والقيمة للرمز الحالي فقط بطول تسلسل يساوي 1، ثم نلحق المفتاح والقيمة الجدد بمصفوفات الذاكرة التراكمية، مما يختزل العمليات الحسابية إلى زمن خطي $\mathcal{O}(T)$.

يشبه التخزين المؤقت للمفاتيح والقيم تدوين ملاحظات موجزة في مسودتك الجانبية حتى لا تضطر إلى إعادة قراءة الكتاب بأكمله من الصفحة الأولى عند كتابة كل كلمة جديدة! فعند صياغة فكرة جديدة، ترجع إلى مسودة النقاط المحورية السابقة وتضيف سطراً واحداً فقط للمفاهيم المستجدة، بدلاً من قراءة 500 صفحة من جديد في كل مرة، مما يرفع كفاءة التوليد إلى مستويات قياسية.

### Jargon Decoder | قاموس تفكيك المصطلحات

| Term / المصطلح | Plain English Translation & Metaphor | الشرح المبسط بالعربية والتشبيه اليومي |
| :--- | :--- | :--- |
| **KV Cache** (مخزن المفاتيح والقيم المؤقت) | The author's Rolodex: stores computed Keys and Values of all past words in GPU VRAM so you never have to re-read them when generating the next word. | حافظة بطاقات المفاتيح والقيم: تخزن مخرجات الكلمات السابقة في ذاكرة الرسوميات لتجنب إعادة حسابها عند توليد كل كلمة جديدة. |
| **Prefill Phase** (مرحلة الاستيعاب الأولي للطلب) | Reading the prompt: processing the initial 1000 user tokens in parallel in a single GPU pass to fill up the initial KV cache. | قراءة نص السؤال دفعة واحدة: معالجة كافة مدخلات المستخدم بالتوازي لملء الذاكرة المؤقتة الأولية للنموذج. |
| **Decode Phase** (مرحلة التوليد التسلسلي اللاحق) | The steady typewriter: generating one new token at a time autoregressively ($S=1$) by querying the accumulated KV cache. | الكتابة المتسلسلة على الآلة الكاتبة: توليد رمز واحد في كل خطوة بالاعتماد على مخزون الذاكرة التراكمي. |
| **Quadratic Waste Elimination** (إلغاء الهدر التربيعي) | Going from $O(N^2)$ to $O(N)$ operations: without KV caching, generating token 1000 requires recomputing all 999 previous tokens from scratch! | الانتقال من التعقيد التربيعي إلى الخطي: بدون الكاش، يتطلب توليد الكلمة رقم 1000 إعادة حساب كافة الكلمات الـ 999 السابقة! |
| **Memory Bandwidth Bottleneck** (عنق زجاجة نقل البيانات في الذاكرة) | The delivery truck limit: during generation, modern GPUs spend 95% of their time waiting to fetch giant KV caches from VRAM, not doing math. | قيود سعة نقل الذاكرة: تقضي بطاقة الرسوميات 95% من وقتها في انتظار جلب بيانات الكاش من الذاكرة بدلاً من تنفيذ العمليات الحسابية. |

### Visual Architecture Flow | مخطط تدفق البيانات والمعمارية

```text
AUTOREGRESSIVE GENERATION: NAIVE VS. KV-CACHED
=============================================================================
NAIVE GENERATION (Without KV Cache):
Step 1: Feed [ "The" ]                        ---> Compute Q, K, V for 1 token
Step 2: Feed [ "The", "cat" ]                 ---> Recompute Q, K, V for "The" AND "cat"!
Step 3: Feed [ "The", "cat", "sat" ]          ---> Recompute ALL 3 tokens from scratch!
...
Step N: Feed [ token_1, ..., token_N ]        ---> Quadratic Compute Blowup: O(N^2) FLOPs!
=============================================================================
KV-CACHED GENERATION:
Prefill: Input [ "The", "cat", "sat" ]        ---> Compute & Store Keys & Values in VRAM
Decode Step t: (Generating Next Word)
               New Token Input: "on"          ---> Only compute q_t, k_t, v_t for "on"!
                     |
                     +---> Append k_t to K_cache, Append v_t to V_cache
                     |
               Query q_t attends against [ K_cache ] ---> Retrieve [ V_cache ]
               Output Next Token: "the"       ---> Pure Linear Compute: O(N) FLOPs!
```

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

In an autoregressive decoding step at timestep $t$, key and value tensors are updated by concatenating the newest token representations:

$$
\mathbf{K}_{\text{cached}}^{(t)} = \begin{bmatrix} \mathbf{K}_{\text{cached}}^{(t-1)} \\ \mathbf{k}_t \end{bmatrix} \in \mathbb{R}^{t \times d_k}, \quad \mathbf{V}_{\text{cached}}^{(t)} = \begin{bmatrix} \mathbf{V}_{\text{cached}}^{(t-1)} \\ \mathbf{v}_t \end{bmatrix} \in \mathbb{R}^{t \times d_v}
$$

Where the current token projections are computed for a single position:

$$
\mathbf{q}_t = \mathbf{x}_t \mathbf{W}_Q \in \mathbb{R}^{1 \times d_k}, \quad \mathbf{k}_t = \mathbf{x}_t \mathbf{W}_K \in \mathbb{R}^{1 \times d_k}, \quad \mathbf{v}_t = \mathbf{x}_t \mathbf{W}_V \in \mathbb{R}^{1 \times d_v}
$$

The single-token attention context vector is retrieved across the accumulated historical cache:

$$
\mathbf{a}_t = \text{softmax}\left(\frac{\mathbf{q}_t \left(\mathbf{K}_{\text{cached}}^{(t)}\right)^T}{\sqrt{d_k}}\right) \mathbf{V}_{\text{cached}}^{(t)} \in \mathbb{R}^{1 \times d_v}
$$

The cumulative memory consumption in GPU High-Bandwidth Memory (HBM) scales linearly with sequence length and batch size:

$$
\text{Memory}_{\text{KV}} = 2 \times 2 \times n_{\text{layers}} \times n_{\text{heads}} \times d_{\text{head}} \times T \times B \quad \text{(bytes in 16-bit precision)}
$$

### Demystifying the Equation | تفكيك الرموز والمعادلات

| Symbol / الرمز | Mathematical Term / المصطلح الرياضي | Plain English Meaning & Role / المعنى الفيزيائي والدور التطبيقي |
| :--- | :--- | :--- |
| $\mathbf{q}_t \in \mathbb{R}^{1 \times d_k}$ | Current Step Query / استعلام اللحظة الحالية | Single row query vector generated exclusively for the newly arrived token $t$. |
| $\mathbf{K}_{\text{past}}^{(t-1)} \in \mathbb{R}^{(t-1) \times d_k}$ | Historical Key Cache / مخزن المفاتيح التاريخي | Cached matrix holding key representations of all preceding sequence tokens. |
| $\mathbf{V}_{\text{past}}^{(t-1)} \in \mathbb{R}^{(t-1) \times d_v}$ | Historical Value Cache / مخزن القيم التاريخي | Cached matrix holding value representations of all preceding sequence tokens. |
| $[\mathbf{K}_{\text{past}}; \mathbf{k}_t]$ | In-Place Concatenation / التحديث الإلحاقي للكاش | Fast append operation inserting current key vector into GPU cache memory. |
| $\mathbf{z}_t \in \mathbb{R}^{1 \times d_v}$ | Output Context Vector / المتجه السياقي المولد | The synthesized context vector driving the prediction of token $t+1$. |

#### Why the Math Works Step-by-Step | لماذا تعمل هذه الصياغة رياضياً؟
1. **Mathematical Equivalence**: Because causal masking prevents past tokens from looking at future tokens, the Key and Value representations of word 5 do *not* change when word 10 is appended. They are mathematically frozen, making recomputation 100% redundant.
2. **Computational Savings**: Without caching, generating $T$ tokens costs $\sum_{t=1}^T O(t \cdot d) = O(T^2 d)$ operations. With KV caching, each step costs only $O(t \cdot d)$ for attention against cached memory, slashing redundant projection work completely.
3. **The VRAM Footprint Cost**: For an 8B model with 32 layers and sequence length 8192, the KV cache consumes $\approx 2 \times 32 \times 8192 \times 4096 \times 2 \text{ bytes} \approx 4.3 \text{ GB}$ of VRAM per single user request, making KV compression techniques like GQA essential.


## Beat 3: Python Challenge

Implement `kv_cache_decoder_step` to perform a single autoregressive decoding step: projecting the incoming token, appending to historical KV caches, and computing single-query attention.

:::python-challenge{id="py-kv-caching-autoregressive-generation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, None, None, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])"
    expected: "1.0"
  - input: "x = np.ones((1, 1, 4)); k_prev = np.ones((1, 1, 4)); v_prev = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, k_prev, v_prev, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])"
    expected: "2.0"
  - input: "x = np.ones((1, 1, 4)); k_prev = np.ones((1, 2, 4)); v_prev = np.ones((1, 2, 4)); out, k, v = kv_cache_decoder_step(x, k_prev, v_prev, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(out.shape[-1])"
    expected: "4.0"
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
    
    # Step 1: Project single current token into Q, K, V representations: shape (B, 1, D)
    q_t = np.dot(x_t, W_q)
    k_t = np.dot(x_t, W_k)
    v_t = np.dot(x_t, W_v)
    
    # Step 2: Append new key and value vectors to historical cache along sequence dimension
    if k_cache is None or k_cache.size == 0:
        k_updated = k_t
        v_updated = v_t
    else:
        k_updated = np.concatenate([k_cache, k_t], axis=1)
        v_updated = np.concatenate([v_cache, v_t], axis=1)
        
    # Step 3: Compute scaled dot-product attention logits: (B, 1, D) @ (B, D, t) -> (B, 1, t)
    d_k = float(D)
    scores = np.matmul(q_t, k_updated.swapaxes(-1, -2)) / np.sqrt(d_k)
    
    # Step 4: Numerically stable softmax across historical token dimension
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # Step 5: Aggregate cached value representations and project to output: (B, 1, t) @ (B, t, D) -> (B, 1, D)
    context = np.matmul(attn_weights, v_updated)
    out_t = np.dot(context, W_o)
    
    return out_t, k_updated, v_updated
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

**Scenario:** You are serving a 70B parameter model (80 layers, 64 attention heads, head dimension $d_k = 128$) to a batch of $B = 32$ concurrent users. Each user generates up to $T = 4\,096$ tokens in FP16 precision. Your operations team reports that although GPU compute matrix utilization is under 25%, generation throughput drops precipitously and requests begin encountering Out-Of-Memory (OOM) errors. What is the root cause?

* [ ] The GPU compute matrix cores suffer thermal throttling due to constant dense matrix multiplications.
* [x] The KV cache footprint scales linearly with context length and batch size: calculating $2 \times 2 \times 80 \times 64 \times 128 \times 4096 \times 32 \approx 171.8 \text{ GB}$ reveals that the KV cache alone exceeds the total VRAM of two 80GB A100 GPUs! Because token generation reads the entire KV cache on every single token step for a minimal arithmetic workload ($T=1$), decoding becomes heavily **memory-bandwidth bound**.
* [ ] Softmax denominators underflow to zero when computing attention across 4,096 historical tokens.
* [ ] Causal triangular masking requires quadratic cache storage in CPU host memory.

> **Insight & Option Analysis:**
> - **Option A is incorrect:** Low compute utilization (25%) indicates that tensor cores are starving for data rather than overheating from heavy dense matrix multiplication.
> - **Option B is correct:** Evaluating the formula $\text{Memory} = 4 \times n_{\text{layers}} \times n_{\text{heads}} \times d \times T \times B$ yields $4 \times 80 \times 64 \times 128 \times 4096 \times 32 \text{ bytes} \approx 171.798 \text{ GB}$. This cache footprint alone requires more memory than two 80GB GPUs combined, completely crowding out model weights and activations. Because arithmetic intensity is roughly 1 FLOP per byte loaded from HBM, memory bus bandwidth is 100% saturated.
> - **Option C is incorrect:** Numerical stability techniques (subtracting the row maximum) prevent softmax underflow or overflow across thousands of tokens.
> - **Option D is incorrect:** The causal mask is not stored in the KV cache; only key and value activations are persisted.
