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

In the classic Transformer architecture (Vaswani et al., 2017) and early GPT models, the feedforward network (FFN) comprised two linear transformations separated by a standard non-linear activation (historically ReLU or GELU):

$$
\text{FFN}(x) = \text{GELU}(x \mathbf{W}_1 + \mathbf{b}_1) \mathbf{W}_2 + \mathbf{b}_2
$$

While computationally straightforward, standard activations treat every channel independently via static thresholding. In 2020, Noam Shazeer published *"GLU Variants Improve Transformer"*, introducing **SwiGLU (Swish Gated Linear Unit)**. Today, SwiGLU has become the universal standard across modern frontier backbones (LLaMA, PaLM, Mistral, Gemma, DeepSeek).

SwiGLU replaces the simple non-linear layer with a bilinear gating mechanism: the input representation is simultaneously projected into *two* separate linear pathways—a **Gate** projection and an **Up** projection. The Gate path is passed through the smooth, non-monotonic Swish (SiLU) activation function and element-wise multiplied by the Up path. This enables the network to dynamically modulate, scale, or suppress specific features based on contextual relevance before projecting back down.

> **Frontier Analogy:** Think of a precision industrial mixer valve. The Gate branch acts as an ultra-sensitive valve handle that smoothly regulates the volume and flow rate of water passing through the main pipe (the Up branch), allowing fine-grained control before the stream exits the faucet (the Down projection).

في معمارية المحولات الكلاسيكية ونماذج GPT المبكرة، كانت شبكة التغذية الأمامية (FFN) تتكون من طبقتين خطيتين بسيطتين تتوسطهما دالة تنشيط تقليدية مثل ReLU أو GELU. ورغم بساطة هذا التركيب، إلا أنه يفتقر إلى القدرة على التصفية الديناميكية للمعلومات.

أحدثت ورقة نعوم شازير (2020) ثورة بإدخال معمارية **SwiGLU**، والتي أصبحت المعيار القياسي المعتمد في جميع النماذج الرائدة مثل LLaMA وMistral وGemma. تستبدل SwiGLU التنشيط الأحادي بآلية بوابات ثنائية الخطية: حيث يُسقط المدخل على مسارين متوازيين في وقت واحد — مسار **البوابة (Gate)** ومسار **الرفع (Up)**. يمر مسار البوابة عبر دالة Swish/SiLU السلسة غير الرتيبة، ثم يُضرب عنصرياً في مسار الرفع. يمنح هذا الشبكة العصبية قدرة استثنائية على ترشيح الإشارات وحجب الضوضاء وتمرير الأنماط الدلالية الهامة فقط إلى طبقة الإسقاط السفلي.

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{SwiGLU}(\mathbf{x}) = \left( \text{Swish}(\mathbf{x} \mathbf{W}_{\text{gate}}) \odot (\mathbf{x} \mathbf{W}_{\text{up}}) \right) \mathbf{W}_{\text{down}}
$$

$$
\text{Swish}(\mathbf{z}) = \mathbf{z} \cdot \sigma(\mathbf{z}) = \frac{\mathbf{z}}{1 + e^{-\mathbf{z}}}
$$

$$
d_{\text{ffn}} \approx \left\lfloor \frac{8}{3} d_{\text{model}} \right\rfloor \quad \text{(Parameter Parity Invariant)}
$$

#### Step-by-Step Parameter Breakdown
- $\mathbf{x} \in \mathbb{R}^{B \times T \times d}$: Input hidden state tensor of batch size $B$, sequence length $T$, and model dimension $d$.
- $\mathbf{W}_{\text{gate}} \in \mathbb{R}^{d \times d_{\text{ffn}}}$: Weight matrix generating the continuous gating signal.
- $\mathbf{W}_{\text{up}} \in \mathbb{R}^{d \times d_{\text{ffn}}}$: Weight matrix projecting the feature representation into the expanded intermediate space.
- $\mathbf{W}_{\text{down}} \in \mathbb{R}^{d_{\text{ffn}} \times d}$: Weight matrix projecting the gated representation back to model dimension $d$.
- $\odot$: Hadamard (element-wise) product creating multiplicative bilinear interactions.
- Intermediate Dimension $d_{\text{ffn}} \approx \frac{8}{3} d$: Because SwiGLU employs three weight matrices instead of the two matrices in a standard $4d$ FFN, setting $d_{\text{ffn}} = \frac{8}{3} d$ preserves the exact same total parameter budget and FLOP count ($3 \times \frac{8}{3}d = 8d = 2 \times 4d$).

:::python-challenge{id="py-swiglu-feedforward-activation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.ones((1, 2, 4)); Wg = np.zeros((4, 8)); Wu = np.ones((4, 8)); Wd = np.ones((8, 4)); out = swiglu_forward(x, Wg, Wu, Wd); float(np.sum(out))"
    expected: "0.0"
  - input: "x = np.ones((1, 1, 2)); Wg = np.ones((2, 2)); Wu = np.ones((2, 2)); Wd = np.eye(2); out = swiglu_forward(x, Wg, Wu, Wd); float(out.shape[-1])"
    expected: "2.0"
---
```python
import numpy as np

def swish(z: np.ndarray) -> np.ndarray:
    """Computes the Swish / SiLU activation function: z * sigmoid(z)."""
    # Numerically clipped sigmoid to prevent overflow
    sig = 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))
    return z * sig

def swiglu_forward(
    x: np.ndarray,
    W_gate: np.ndarray,
    W_up: np.ndarray,
    W_down: np.ndarray
) -> np.ndarray:
    """
    Executes a SwiGLU Gated Feedforward Network forward pass.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, T, D)
        Input hidden states.
    W_gate : np.ndarray of shape (D, D_ffn)
        Gating projection matrix.
    W_up : np.ndarray of shape (D, D_ffn)
        Up-projection matrix.
    W_down : np.ndarray of shape (D_ffn, D)
        Down-projection matrix.
        
    Returns
    -------
    np.ndarray of shape (B, T, D)
        Output hidden states after gated feedforward transformation.
    """
    # 1. Project through the gate branch and apply Swish activation
    gate_proj = np.dot(x, W_gate)
    activated_gate = swish(gate_proj)
    
    # 2. Project through the up branch
    up_proj = np.dot(x, W_up)
    
    # 3. Bilinear element-wise multiplication
    gated_features = activated_gate * up_proj
    
    # 4. Project back down to model dimension
    output = np.dot(gated_features, W_down)
    return output
```
:::

### Transfer & Architectural Reasoning

**Scenario:** An architect designing a new 8B parameter foundation model chooses SwiGLU over GELU for the feedforward blocks. In their initial configuration file, they specify the intermediate dimension as $d_{\text{ffn}} = 4 \times d_{\text{model}}$ (the classic setting used in GPT-3). What is the computational consequence of this configuration, and what adjustment should be made?

* **A.** SwiGLU will fail to converge because odd matrix dimensions cause division-by-zero errors in the Swish activation function.
* **B.** (*Correct*) Because SwiGLU introduces three projection matrices ($\mathbf{W}_{\text{gate}}, \mathbf{W}_{\text{up}}, \mathbf{W}_{\text{down}}$) instead of two ($\mathbf{W}_1, \mathbf{W}_2$), setting $d_{\text{ffn}} = 4d$ increases total FFN parameters and compute by $50\%$ (from $8d^2$ to $12d^2$); to maintain parameter and FLOP parity with a classic $4d$ FFN, $d_{\text{ffn}}$ must be scaled to $\approx \frac{8}{3}d_{\text{model}}$ (often rounded to the nearest multiple of 256 for optimal GPU tensor core alignment).
* **C.** The Gate projection will completely cancel out the Up projection due to negative eigenvalues.
* **D.** SwiGLU requires doubling the batch size to stabilize gradients during backpropagation.

*Explanation:* A standard 2-matrix FFN with hidden dim $4d$ has $2 \times d \times 4d = 8d^2$ parameters per layer. A 3-matrix SwiGLU has $3 \times d \times d_{\text{ffn}}$ parameters. Setting $3 d \cdot d_{\text{ffn}} = 8d^2 \implies d_{\text{ffn}} = \frac{8}{3}d \approx 2.67d$. Modern LLMs round this to a multiple of 256 (e.g. 14,336 for Llama 3 8B) for peak GPU hardware throughput.
