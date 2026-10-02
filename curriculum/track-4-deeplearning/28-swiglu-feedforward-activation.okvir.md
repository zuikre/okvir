---
id: "swiglu-feedforward-activation"
version: "1.0.0"
title: "SwiGLU Gated Feedforward Networks (FFN)"
track: "deeplearning"
module: "mod-44"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer"]
i18n:
  ar: "شبكات التغذية الأمامية ذات البوابات والتنشيط السلس SwiGLU"
---

# SwiGLU Gated Feedforward Networks (FFN)

## Beat 1: Tactile Intuition

In modern Transformer architectures, the Feedforward Network (FFN) constitutes the foundational engine of parametric memory and non-linear feature transformation. While multi-head self-attention routes information horizontally across different token positions in a sequence, the FFN operates independently on each token vertically, expanding its dimensionality to retrieve stored factual associations and synthesize higher-order semantic abstractions. In fact, feedforward layers account for roughly two-thirds of the total parameter count in foundation models.

In the classic 2017 Transformer and early generative models like GPT-2 and GPT-3, the feedforward sub-layer comprised two simple affine transformations separated by a standard non-linear activation function (historically ReLU or GELU): $\text{FFN}(\mathbf{x}) = \text{GELU}(\mathbf{x} \mathbf{W}_1 + \mathbf{b}_1) \mathbf{W}_2 + \mathbf{b}_2$. While computationally straightforward, these static activations apply fixed thresholding: each hidden feature is scaled independently without dynamic cross-channel coordination or adaptive feature gating.

In 2020, Google Brain researcher Noam Shazeer published *"GLU Variants Improve Transformer"*, demonstrating that Gated Linear Units (GLUs) consistently outperform classical MLPs across language modeling benchmarks. Specifically, **SwiGLU (Swish Gated Linear Unit)** emerged as the undisputed golden standard, powering virtually all modern frontier backbones including LLaMA 2/3, Mistral, Gemma, PaLM, and DeepSeek.

> **Frontier Analogy:** Think of a precision industrial mixer valve or a velvet-rope VIP bouncer. The Gate branch acts as an ultra-sensitive valve handle that smoothly regulates the volume and flow rate of water passing through the main pipe (the Up branch), allowing fine-grained control before the combined stream exits the faucet (the Down projection). Rather than slamming on/off like a binary switch, the gate smoothly attenuates irrelevant features and amplifies salient signals.

The mathematical power of SwiGLU stems from its bilinear multiplicative interaction: the input $\mathbf{x}$ is projected into two parallel representations—a **Gate** projection $\mathbf{x} \mathbf{W}_{\text{gate}}$ and an **Up** projection $\mathbf{x} \mathbf{W}_{\text{up}}$. The Gate path passes through the smooth, non-monotonic Swish (SiLU) activation function and is element-wise multiplied by the Up path. Because SwiGLU uses three weight matrices instead of two, architects preserve parameter and FLOP parity by scaling the intermediate dimension to $d_{\text{ffn}} \approx \left\lfloor \frac{8}{3} d_{\text{model}} \right\rfloor$ rather than the classical $4 d_{\text{model}}$, maintaining exact computational equivalence ($3 \times \frac{8}{3}d = 8d = 2 \times 4d$) while unlocking vastly superior expressive capacity.

في معمارية المحولات الحديثة، تمثل شبكة التغذية الأمامية (FFN) المحرك الأساسي للذاكرة المعاملاتية والتحويلات غير الخطية للميزات. فبينما تعمل آلية الانتباه على نقل وسياقة المعلومات أفقياً بين الرموز المختلفة في الجملة، تتولى شبكة التغذية الأمامية معالجة كل رمز رأسياً بشكل مستقل، حيث توسع فضاء الأبعاد لاسترجاع الحقائق الدلالية المخزنة؛ وهي تشكل ما يقارب ثلثي المعاملات الإجمالية في النماذج اللغوية الضخمة.

في النموذج الكلاسيكي لعام 2017 ونماذج GPT الأولى، كانت الشبكة تتكون من طبقتين خطيتين بسيطتين تتوسطهما دالة تنشيط تقليدية مثل ReLU أو GELU. ورغم بساطة هذا التركيب، إلا أنه يعتمد على عتبات تنشيط ثابتة ومستقلة لكل قناة، مما يحرم النموذج من القدرة على ضبط وتصفية تدفق الميزات ديناميكياً بناءً على السياق المتغير.

أحدثت أبحاث نعوم شازير عام 2020 ثورة في هذا المجال بابتكار معمارية **SwiGLU**، والتي أصبحت المعيار العالمي المعتمد في كافة النماذج المتقدمة مثل LLaMA 3 وMistral وGemma. تستبدل SwiGLU التنشيط الخطي البسيط بآلية بوابات ثنائية الخطية: حيث يُسقط المدخل على مسارين متوازيين في وقت واحد — مسار **البوابة (Gate)** ومسار **الرفع (Up)**. يمر مسار البوابة عبر دالة Swish السلسة، ثم يُضرب عنصرياً في مسار الرفع قبل التمرير إلى طبقة الإسقاط السفلي.

يشبه هذا التصميم صمام خلط هيدروليكي فائق الدقة: يعمل مسار البوابة كمقبض صمام حساس للغاية يتحكم بسلاسة في تدفق وحجم الإشارة المارة في الأنبوب الرئيسي (مسار الرفع)؛ مما يتيح تصفية التشويش وتضخيم الإشارات الدلالية الحرجة بمرونة فائقة تفوق بكثير أداء البوابات الثابتة.

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

---

## Beat 2: Formal Mathematical Anchor

In a SwiGLU feedforward layer, the input tensor $\mathbf{x}$ is transformed via three projection weight matrices combined with element-wise bilinear gating:

$$
\text{SwiGLU}(\mathbf{x}) = \left( \text{Swish}(\mathbf{x} \mathbf{W}_{\text{gate}}) \odot (\mathbf{x} \mathbf{W}_{\text{up}}) \right) \mathbf{W}_{\text{down}}
$$

Where the Swish (SiLU) activation function is defined by smooth, non-monotonic multiplication with the logistic sigmoid:

$$
\text{Swish}(\mathbf{z}) = \mathbf{z} \cdot \sigma(\mathbf{z}) = \frac{\mathbf{z}}{1 + e^{-\mathbf{z}}}
$$

To maintain strict parameter and FLOP parity with a traditional 2-matrix FFN with hidden size $4d_{\text{model}}$, the intermediate dimension is scaled:

$$
d_{\text{ffn}} = \left\lfloor \frac{8}{3} d_{\text{model}} \right\rfloor \implies 3 \times \frac{8}{3} d_{\text{model}} \cdot d_{\text{model}} = 8 d_{\text{model}}^2 = 2 \times 4 d_{\text{model}} \cdot d_{\text{model}}
$$

The derivative of Swish demonstrates its non-monotonic self-gating behavior and non-zero gradient transmission for small negative inputs:

$$
\frac{d}{dz}\text{Swish}(z) = \sigma(z) + z \sigma(z)(1 - \sigma(z)) = \sigma(z) \left(1 + z(1 - \sigma(z))\right)
$$

### Comprehensive Symbol & Parameter Breakdown

| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^{B \times T \times d_{\text{model}}}$ | Input token representations entering the FFN | Normalized activations exiting the attention residual stream. |
| $\mathbf{W}_{\text{gate}}$ | $\mathbb{R}^{d_{\text{model}} \times d_{\text{ffn}}}$ | Linear projection matrix for continuous gating | Generates unactivated logits that control feature throughput. |
| $\mathbf{W}_{\text{up}}$ | $\mathbb{R}^{d_{\text{model}} \times d_{\text{ffn}}}$ | Linear projection matrix for feature candidate expansion | Projects token representations into expanded high-dimensional space. |
| $\text{Swish}(\cdot)$ | $\mathbb{R} \to \mathbb{R}$ | Smooth, non-monotonic activation function ($z \sigma(z)$) | Possesses negative curvature near zero, preventing dead neuron collapse. |
| $\odot$ | Operator | Hadamard (element-wise) multiplication | Enables dynamic multiplicative modulation between gate and up pathways. |
| $\mathbf{W}_{\text{down}}$ | $\mathbb{R}^{d_{\text{ffn}} \times d_{\text{model}}}$ | Final downward projection matrix | Compresses gated representations back to baseline model dimension. |
| $d_{\text{ffn}} \approx \frac{8}{3} d_{\text{model}}$ | Integer | Scaled intermediate hidden dimension | Ensures total parameter count matches standard 2-matrix $4d$ FFNs. |

تضمن هذه الصياغة الرياضية احتفاظ النموذج بنفس الميزانية الحسابية تماماً لشبكات 4d الكلاسيكية مع الاستفادة من التفاعل ثنائي الخطية ودالة Swish السلسة غير الرتيبة، مما يمنع تجمد الخلايا العصبية ويحسن دقة التعلم في الطبقات العميقة.

---

## Beat 3: Python Challenge

Implement `swish` and `swiglu_forward` to compute the forward pass of a SwiGLU layer: projecting into Gate and Up representations, applying Swish, performing Hadamard multiplication, and projecting down.

:::python-challenge{id="py-swiglu-feedforward-activation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 2, 4)); Wg = np.zeros((4, 8)); Wu = np.ones((4, 8)); Wd = np.ones((8, 4)); out = swiglu_forward(x, Wg, Wu, Wd); float(np.sum(out))"
    expected: "0.0"
  - input: "x = np.ones((1, 1, 2)); Wg = np.ones((2, 2)); Wu = np.ones((2, 2)); Wd = np.eye(2); out = swiglu_forward(x, Wg, Wu, Wd); float(out.shape[-1])"
    expected: "2.0"
  - input: "x = np.array([[[-1.0, 1.0]]]); Wg = np.eye(2); Wu = np.eye(2); Wd = np.eye(2); out = swiglu_forward(x, Wg, Wu, Wd); float(round(float(out[0,0,1]), 2))"
    expected: "0.73"
---
```python
import numpy as np

def swish(z: np.ndarray) -> np.ndarray:
    """Computes the Swish / SiLU activation function: z * sigmoid(z)."""
    sig = 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))
    return z * sig

def swiglu_forward(
    x: np.ndarray,
    W_gate: np.ndarray,
    W_up: np.ndarray,
    W_down: np.ndarray
) -> np.ndarray:
    """
    Computes the forward pass of a SwiGLU Feedforward Layer.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, T, D)
        Input token embeddings.
    W_gate : np.ndarray of shape (D, D_ffn)
        Linear gate projection weight matrix.
    W_up : np.ndarray of shape (D, D_ffn)
        Linear up projection weight matrix.
    W_down : np.ndarray of shape (D_ffn, D)
        Linear down projection weight matrix.
        
    Returns
    -------
    np.ndarray of shape (B, T, D)
        Transformed hidden states after SwiGLU gating and down-projection.
    """
    # Step 1: Project input into Gate representation: (B, T, D) @ (D, D_ffn) -> (B, T, D_ffn)
    gate_proj = np.matmul(x, W_gate)
    
    # Step 2: Project input into Up representation: (B, T, D) @ (D, D_ffn) -> (B, T, D_ffn)
    up_proj = np.matmul(x, W_up)
    
    # Step 3: Apply Swish (SiLU) activation function to the Gate projection
    gate_activated = swish(gate_proj)
    
    # Step 4: Bilinear element-wise Hadamard multiplication between activated Gate and Up paths
    gated_representation = gate_activated * up_proj
    
    # Step 5: Project back down to model dimension: (B, T, D_ffn) @ (D_ffn, D) -> (B, T, D)
    out = np.matmul(gated_representation, W_down)
    
    return out
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

**Scenario:** You are architecting a new 8B foundation model with hidden dimension $d_{\text{model}} = 4\,096$. An engineer proposes using SwiGLU with the traditional intermediate hidden dimension $d_{\text{ffn}} = 4 d_{\text{model}} = 16\,384$. The lead hardware engineer objects, stating this violates the parameter parity invariant and increases memory traffic. Why is $d_{\text{ffn}} = \left\lfloor \frac{8}{3} d_{\text{model}} \right\rfloor \approx 11\,008$ chosen in modern models like LLaMA instead of $16\,384$?

* [ ] Setting $d_{\text{ffn}} = 16\,384$ causes floating-point integer overflow in GPU matrix address calculators.
* [x] A traditional standard FFN uses 2 weight matrices ($\mathbf{W}_1, \mathbf{W}_2$), each of size $d \times 4d$, totaling $2 \times 4d^2 = 8d^2$ parameters. SwiGLU introduces a third matrix ($\mathbf{W}_{\text{gate}}, \mathbf{W}_{\text{up}}, \mathbf{W}_{\text{down}}$); if each were sized with $d_{\text{ffn}} = 4d$, the layer would consume $3 \times 4d^2 = 12d^2$ parameters (a 50% parameter bloat!). Setting $d_{\text{ffn}} = \frac{8}{3}d$ keeps total parameters at $3 \times \frac{8}{3}d^2 = 8d^2$, preserving exact computational and parameter parity.
* [ ] Swish activation function diverges mathematically when evaluated on vectors whose length exceeds 12,000 dimensions.
* [ ] Tensor cores cannot tile matrices unless the intermediate dimension is an odd prime number.

> **Insight & Option Analysis:**
> - **Option A is incorrect:** Modern 64-bit GPU registers easily index matrices with dimension 16,384 without address calculation overflow.
> - **Option B is correct:** SwiGLU replaces 2 weight matrices with 3 weight matrices. To maintain fair computational benchmarking against standard Transformer baselines without expanding parameter budgets or FLOP footprints, the intermediate dimension must satisfy $3 \times d_{\text{ffn}} \cdot d = 8 d^2 \implies d_{\text{ffn}} = \frac{8}{3} d$.
> - **Option C is incorrect:** Swish is an element-wise function evaluated independently along each coordinate; vector dimensionality has no bearing on mathematical convergence.
> - **Option D is incorrect:** Tensor cores prefer dimensions that are multiples of 64 or 128 (powers of two) for optimal systolic array tiling, not prime numbers.
