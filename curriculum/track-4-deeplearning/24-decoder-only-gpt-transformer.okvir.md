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

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

While the original 2017 Transformer architecture featured an encoder-decoder topology engineered specifically for bidirectional translation tasks, contemporary generative foundation models (GPT-4, Claude, LLaMA 2/3, Mistral, Gemma) converged completely on the **Decoder-Only** paradigm. This architectural unification is grounded in the foundational objective of causal language modeling: next-token prediction, where the joint probability distribution over any arbitrary sequence factorizes strictly autoregressively as $P(x_1, x_2, \dots, x_T) = \prod_{t=1}^T P(x_t \mid x_1, \dots, x_{t-1})$. By eliminating the cross-attention bridge between separate encoder and decoder stacks, the decoder-only model maximizes parameter utilization and GPU hardware compute density.

In a decoder-only architecture, every token at position $t$ is strictly prevented from attending to future tokens $j > t$ through an upper-triangular **causal attention mask** where illegal future attention logits are set to $-\infty$. This causal constraint provides an extraordinary computational superpower during pretraining: although autoregressive text generation is inherently sequential token-by-token at inference time, training is completely parallel! The entire context of thousands of tokens is ingested in a single matrix forward pass, evaluating all $T$ next-token predictions simultaneously across the full sequence.

Crucially, modern frontier LLMs universally adopt **Pre-LayerNorm (Pre-LN)** or **Pre-RMSNorm**: normalization is applied *prior* to self-attention and feedforward sub-layers rather than after them. In the original 2017 Post-LN design, the normalization layer was placed directly on the residual path ($\mathbf{x} \leftarrow \text{LN}(\mathbf{x} + \text{Sublayer}(\mathbf{x}))$). In Pre-LN, the residual stream remains an unnormalized, clean identity highway: $\mathbf{x}^{(l)} = \mathbf{x}^{(l-1)} + \text{Sublayer}(\text{Norm}(\mathbf{x}^{(l-1)}))$.

> **Frontier Analogy:** Envision a high-speed automotive assembly line conveyor belt. Each technician station inspects only the parts already assembled on the belt upstream (causal masking), crafts an upgrade, and gently fastens it onto the moving chassis without stopping or redirecting the main conveyor belt (the residual highway). The car chassis glides continuously down an express lane, accumulating upgrades from 100 consecutive stations without ever encountering a bottleneck or roadblock.

Mathematically, this Pre-LN identity formulation ensures that the final representation is a direct sum of initial token embeddings and sub-layer outputs: $\mathbf{x}^{(L)} = \mathbf{x}^{(0)} + \sum_{l=1}^L \Delta_l$. When backpropagating error gradients from the top loss layer down to the input embeddings, the gradient $\frac{\partial \mathcal{L}}{\partial \mathbf{x}^{(0)}} = \frac{\partial \mathcal{L}}{\partial \mathbf{x}^{(L)}} \left(\mathbf{I} + \sum_{l=1}^L \frac{\partial \Delta_l}{\partial \mathbf{x}^{(0)}}\right)$ contains an unobstructed identity term $\mathbf{I}$. This eliminates gradient vanishing or explosion, enabling the stable training of models with hundreds of layers without hyperparameter-sensitive learning rate warmup gymnastics.

بينما صُممت محولات عام 2017 الأصلية بهيكل مزدوج (مشفّر ومفكّك) مخصص للترجمة الآلية بين لغتين، استقرت نماذج الذكاء الاصطناعي التوليدي الرائدة الحديثة بالكامل على معمارية "المفكك فقط" (Decoder-Only). يرتكز هذا التوحيد المعماري على الهدف الجوهري لنماذج اللغة الكبيرة: التنبؤ السببي بالرمز التالي عبر التحليل الذاتي الانحدار، حيث يتحلل التوزيع الاحتمالي المشترك للسلسلة النصية إلى جداء احتمالات شرطية صارمة تعتمد حصراً على الرموز السابقة.

تفرض هذه المعمارية حجباً سببيّاً مثلثياً علوياً يمنع كلياً تسرب معلومات المستقبل أثناء التدريب المتوازي؛ حيث تُستبدل قيم درجات الانتباه للرموز المستقبلية بقيمة $-\infty$ قبل حساب دالة Softmax. تمنح هذه الآلية ميزة هندسية فائقة أثناء التدريب: فرغم أن التوليد أثناء الاستدلال يتم بصورة متسلسلة رمزاً تلو الآخر، إلا أن التدريب يتم بتوازٍ كامل وفوري لكافة الرموز في خطوة واحدة، مما يتيح استغلال كامل القدرة الحاسوبية لبطاقات الرسوميات.

علاوة على ذلك، تعتمد كافة المحولات الحديثة نمط "التطبيع المسبق" (Pre-LN / Pre-RMSNorm)، حيث يُطبق التطبيع قبل دخول الإشارة إلى طبقات الانتباه والتغذية الأمامية، بدلاً من وضعه على المسار المتبقي كما كان في المعماريات القديمة (Post-LN). يضمن هذا التصميم بقاء مسار التدفق المتبقي نقياً ومباشراً دون عوائق حسابية، مشكلاً طريقاً سريعة حقيقية لنقل المعلومات.

يشبه هذا النظام خط تجميع سيارات فائق السرعة يسير على حزام ناقل متصل: يقوم الفني في كل محطة بفحص القطع المركبة مسبقاً فقط (الحجب السببي)، وتصنيع ترقية محددة، ثم تثبيتها برفق على هيكل السيارة المار دون إيقاف الحزام الناقل الرئيسي إطلاقاً. تضمن هذه الصياغة الرياضية انسياب تدرجات التعلم العكسية من الطبقة المائة إلى الطبقة الأولى مباشرة ودون أي تلاشٍ أو انفجار رقمي، مما أتاح تدريب أضخم النماذج المعاصرة باستقرار تام.

### Jargon Decoder | قاموس تفكيك المصطلحات

| Term / المصطلح | Plain English Translation & Metaphor | الشرح المبسط بالعربية والتشبيه اليومي |
| :--- | :--- | :--- |
| **Decoder-Only Transformer** (المحول التوليدي للمفكك فقط) | The skyscraper of workshops: the universal blueprint of modern LLMs (GPT-4, LLaMA, Claude) where all tokens pass through identical causal layers. | ناطحة سحاب من ورش الصقل المتطابقة: المعمارية القياسية لكافة النماذج التوليدية الحديثة التي تتنبأ بالرمز التالي. |
| **Residual Stream** (مجرى البواقي الرئيسي) | The central elevator shaft: a high-dimensional vector highway carrying information straight up through all 32+ layers without degradation. | عمود المصعد المركزي: مسار بيانات عالي الأبعاد يمر عمودياً عبر كافة الطبقات دون أن تفقد الإشارات قوتها. |
| **Pre-Norm Formulation** (المعايرة القبلية) | Cleaning tools before each job: normalizing activations before each attention and MLP block keeps the central highway pure and training stable. | غسل الأدوات قبل بدء العمل: معايرة البيانات قبل دخول كتل الانتباه والتغذية لضمان استقرار التدريب في النماذج العميقة. |
| **Feedforward Network (FFN)** (شبكة التغذية الأمامية المعرفية) | The factual library: expansive linear layers expanding dimensions by $4\times$ to store factual knowledge and world concepts. | المكتبة المعرفية التخزينية: طبقات خطية موسعة تتسع لـ 4 أضعاف الحجم لتخزين الحقائق والروابط المعرفية للنموذج. |
| **Unembedding Head ($W_U$)** (رأس فك التضمين اللغوي) | The final projection booth: converts the top hidden vector back into a ranking over the 100,000 vocabulary words. | شاشة العرض الختامية: تحول المتجه الخفي الأخير إلى درجات ترجيحية على امتداد مفردات القاموس لاختيار الكلمة التالية. |

### Visual Architecture Flow | مخطط تدفق البيانات والمعمارية

```text
DECODER-ONLY GPT TRANSFORMER BLOCK (Pre-RMSNorm):
=============================================================================
Input Tokens ---> Token & Positional Embedding ---> Residual Stream State: h_0
                                                          |
  +-------------------------------------------------------+ <=== [Repeat for L Layers]
  |                                                       |
  |  Residual Stream Backbone: h_{l-1}                    |
  |      |                                                |
  |      +---> [ RMSNorm ] ---> [ Causal Multi-Head Attn ]+
  |      |                                                |
  |      v                                                |
  |    ( + ) <--- (Add Attention Output to Highway)       |
  |      |                                                |
  |    State h_l'                                         |
  |      |                                                |
  |      +---> [ RMSNorm ] ---> [ Gated MLP / SwiGLU ] ---+
  |      |                                                |
  |      v                                                |
  |    ( + ) <--- (Add FFN Output to Highway)             |
  |      |                                                |
  |    State h_l                                          |
  |                                                       |
  +-------------------------------------------------------+
                                                          |
Final Output Layer:                                       v
Residual State h_L ---> [ Final RMSNorm ] ---> [ Linear Head W_U ] ---> Vocab Logits
```

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

In a modern autoregressive Pre-RMSNorm decoder block, the hidden representations propagate through attention and feedforward sub-layers via two parallel residual updates:

$$
\mathbf{h}^{(l)\prime} = \mathbf{h}^{(l-1)} + \text{CausalMHA}\left(\text{RMSNorm}(\mathbf{h}^{(l-1)})\right)
$$

$$
\mathbf{h}^{(l)} = \mathbf{h}^{(l)\prime} + \text{FFN}\left(\text{RMSNorm}(\mathbf{h}^{(l)\prime})\right)
$$

Where the causal attention operation enforces temporal causality via mask $\mathbf{M}$:

$$
\mathbf{M}_{ij} = \begin{cases} 0 & \text{if } j \le i \\ -\infty & \text{if } j > i \end{cases}, \quad \text{Attn}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}} + \mathbf{M}\right)\mathbf{V}
$$

After passing through $L$ stacked blocks, the contextual representation is normalized and projected to vocabulary logits via the unembedding matrix:

$$
P(x_{t+1} \mid x_{\le t}) = \text{softmax}\left(\mathbf{W}_{\text{unembed}} \cdot \text{RMSNorm}\left(\mathbf{h}_t^{(L)}\right)\right)
$$

And the backpropagation gradient directly exploits the uninterrupted identity highway:

$$
\frac{\partial \mathcal{L}}{\partial \mathbf{h}^{(0)}} = \frac{\partial \mathcal{L}}{\partial \mathbf{h}^{(L)}} \left( \mathbf{I} + \sum_{l=1}^L \frac{\partial \Delta_l}{\partial \mathbf{h}^{(0)}} \right)
$$

### Demystifying the Equation | تفكيك الرموز والمعادلات

| Symbol / الرمز | Mathematical Term / المصطلح الرياضي | Plain English Meaning & Role / المعنى الفيزيائي والدور التطبيقي |
| :--- | :--- | :--- |
| $\mathbf{h}_0 = \mathbf{E}[t]$ | Initial Sequence Embedding / التضمين الأولي | Look-up vectors representing input tokens entering the first layer. |
| $\mathbf{h}_l' = \mathbf{h}_{l-1} + \text{MHA}(\text{Norm}(\mathbf{h}_{l-1}))$ | Post-Attention Residual State / حالة البواقي بعد الانتباه | Intermediate representation updated by communication between sequence tokens. |
| $\mathbf{h}_l = \mathbf{h}_l' + \text{FFN}(\text{Norm}(\mathbf{h}_l'))$ | Post-FFN Residual State / حالة البواقي بعد التغذية | Final representation at layer $l$ updated by per-token factual processing. |
| $\mathbf{W}_U \in \mathbb{R}^{d \times V}$ | Unembedding Matrix / مصفوفة فك التضمين | Linear weights projecting the top hidden state into vocabulary logit scores. |
| $\hat{\mathbf{y}} = \text{softmax}(\mathbf{W}_U \text{Norm}(\mathbf{h}_L))$ | Next-Token Distribution / توزيع احتمال الرمز التالي | Final categorical probability distribution over the complete vocabulary $V$. |

#### Why the Math Works Step-by-Step | لماذا تعمل هذه الصياغة رياضياً؟
1. **The Role Division**: Self-Attention allows tokens to communicate horizontally across the sequence ("Who is the subject of this sentence?"), while the FFN operates independently on each token vertically ("What factual associations does this subject have?").
2. **Pre-Norm Superiority**: In early Post-Norm Transformers, gradients degraded rapidly as depth increased, requiring careful warmup. Pre-Norm maintains an identity gradient highway from layer $L$ to layer $1$, allowing models to scale effortlessly to hundreds of layers.
3. **Causal Autoregressive Training**: Thanks to causal masking inside MHA, the entire sequence $t_1, \dots, t_T$ is trained simultaneously under cross-entropy loss $\mathcal{L} = -\sum \log P(t_{i+1} | t_{\le i})$, maximizing compute efficiency.


## Beat 3: Python Challenge

Implement a complete, stable Pre-RMSNorm Transformer Decoder block with causal self-attention and residual highways.

:::python-challenge{id="py-decoder-only-gpt-transformer"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 4, 8)); forward_gpt_block(x)"
    expected: "1.0"
  - input: "x = np.zeros((1, 4, 8)); forward_gpt_block(x)"
    expected: "0.0"
  - input: "x = np.ones((2, 2, 4)); out = forward_gpt_block(x); float(out.shape[-1])"
    expected: "4.0"
---
```python
import numpy as np

def rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:
    """RMSNorm across the last dimension without mean centering."""
    variance = np.mean(x ** 2, axis=-1, keepdims=True)
    return x / np.sqrt(variance + eps)

def causal_attention(q: np.ndarray, k: np.ndarray, v: np.ndarray) -> np.ndarray:
    """
    Scaled dot-product attention with strict lower-triangular causal masking.
    Shapes: (B, T, D)
    """
    B, T, D = q.shape
    scale = 1.0 / np.sqrt(D)
    # Step 1: Compute scaled attention logits: (B, T, T)
    scores = np.matmul(q, k.swapaxes(-1, -2)) * scale
    
    # Step 2: Construct upper-triangular causal mask where col > row is -inf
    mask = np.triu(np.full((T, T), -np.inf), k=1)
    scores = scores + mask
    
    # Step 3: Numerically stable softmax along the last dimension
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # Step 4: Multiply attention probabilities by Values: (B, T, D)
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
    
    # Step 1: Apply Pre-RMSNorm to input tensor x before attention
    norm_x1 = rms_norm(x)
    
    # Step 2: Compute Causal Self-Attention (using identity projections for validation)
    attn_out = causal_attention(norm_x1, norm_x1, norm_x1)
    
    # Step 3: Add to residual highway 1
    h = x + attn_out
    
    # Step 4: Apply Pre-RMSNorm to intermediate state h before feedforward network
    norm_h = rms_norm(h)
    
    # Step 5: Compute non-linear MLP transformation (ReLU activation) and add to residual highway 2
    mlp_out = np.maximum(0, norm_h)
    out = h + mlp_out
    
    return out
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

**Scenario:** During the pretraining of a 100-layer decoder-only foundation model, an engineer proposes reverting from Pre-LN ($\mathbf{x} + \text{Sublayer}(\text{LN}(\mathbf{x}))$) to the original 2017 Post-LN ($\text{LN}(\mathbf{x} + \text{Sublayer}(\mathbf{x}))$) design to match the original Vaswani paper. Within the first 50 iterations, training diverges catastrophically with NaN gradients. What mathematical property caused Post-LN to fail where Pre-LN succeeded?

* [ ] Post-LN requires doubling the hidden dimension $d$, causing tensor core memory alignment faults.
* [x] In Post-LN, gradients passing through the residual connection are repeatedly scaled by the derivative of LayerNorm at every layer; across 100 layers, this compounds exponentially, leading to vanishing gradients in early layers and exploding gradients near the output. In Pre-LN, the residual connection is an unnormalized identity map $\mathbf{x}^{(L)} = \mathbf{x}^{(0)} + \sum_{l=1}^L \text{Sublayer}(\text{LN}(\mathbf{x}^{(l-1)}))$, ensuring gradient signals propagate directly from layer $L$ to layer $0$ without decay.
* [ ] Post-LN cannot be executed on GPUs with tensor cores due to FP16 underflow in softmax denominators.
* [ ] Post-LN introduces cyclical graph dependencies that violate reverse-mode automatic differentiation.

> **Insight & Option Analysis:**
> - **Option A is incorrect:** Post-LN and Pre-LN utilize the exact same layer dimensions; no modification to hidden dimension $d$ is required.
> - **Option B is correct:** Xiong et al. (2020) rigorously proved that in Pre-LN, the gradient norm is invariant to depth ($O(1)$ with respect to layer depth $L$), allowing stable training without sensitive learning rate warmups. Conversely, Post-LN gradient norm decays exponentially as $O(1/\sqrt{L})$ through LayerNorm Jacobians, making deep 100-layer models un-trainable without extreme warmup schedules.
> - **Option C is incorrect:** Tensor cores execute matrix multiplications identically regardless of normalization order; Post-LN divergence is caused by gradient scaling dynamics, not FP16 tensor core instructions.
> - **Option D is incorrect:** Both Pre-LN and Post-LN form strictly feedforward directed acyclic graphs (DAGs); neither introduces cyclic dependencies.
