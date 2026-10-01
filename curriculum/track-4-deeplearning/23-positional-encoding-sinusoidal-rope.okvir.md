---
id: "positional-encoding-sinusoidal-rope"
version: "1.0.0"
title: "Rotary Position Embedding (RoPE) & Sinusoidal Encodings"
track: "deeplearning"
module: "mod-43"
estimated_minutes: 15
prerequisites: ["transformer-attention", "multi-head-attention-projection"]
i18n:
  ar: "تضمين المواضع الدوراني (RoPE) والترميزات الجيبية"
---

# Rotary Position Embedding (RoPE) & Sinusoidal Encodings

The standard self-attention mechanism is mathematically permutation-equivariant: without explicit position indicators, the sentence *"the dog bit the mailman"* and *"the mailman bit the dog"* produce identical contextual representations. In the seminal 2017 Transformer architecture, Vaswani et al. introduced absolute sinusoidal positional encodings—adding fixed sinusoidal waves directly to token input embeddings ($\mathbf{x}_m + \mathbf{p}_m$). While effective for basic translation, additive absolute embeddings struggle to generalize to unseen sequence lengths and fail to naturally encode *relative* token distances: whether two words appear 3 tokens apart at the beginning or the end of a novel, their grammatical relationship remains identical.

Rotary Position Embedding (RoPE - Su et al., 2021) revolutionized position representation in modern frontier LLMs (LLaMA, Mistral, PaLM) by implementing position through **rotation in the complex plane**. Instead of adding an external coordinate vector to embeddings, RoPE pairs adjacent dimensions of query and key vectors into 2D orthogonal subspaces and rotates each 2D slice by an angle proportional to the token's position index $m \theta_i$. 

Because the inner product between two vectors rotated by angles $m\theta_i$ and $n\theta_i$ depends strictly on the difference between their angles $(m - n)\theta_i$, the self-attention dot product $\mathbf{q}_m^T \mathbf{k}_n$ becomes an intrinsic function of relative token displacement!

> **Frontier Analogy:** Think of clock hands on a dial. If two tokens are positioned at timestamps $m$ and $n$, their relative distance is simply the angular separation between the clock hands, regardless of what hour is struck on the wall clock.

تتميز آلية الانتباه الذاتي في المحولات بأنها متماثلة تحت التباديل، مما يعني أن جملة "عض الكلب ساعي البريد" و"عض ساعي البريد الكلب" تنتج نفس التضمينات الحسابية تماماً في غياب مؤشرات المواضع. استخدمت المحولات الكلاسيكية ترميزات جيبية مطلقة أضيفت مباشرة إلى متجهات المدخلات، لكنها واجهت صعوبات بالغة في التعميم على أطوال سياق غير مرئية وفي التقاط المسافات النسبية.

يقدم "تضمين المواضع الدوراني" (RoPE) حلاً رياضياً ثورياً عبر تضمين الموضع من خلال **التدوير في المستوى المركب**. فبدلاً من إضافة متجهات خارجية، يقسم RoPE متجهات الاستعلام والمفاتيح إلى شرائح ثنائية الأبعاد، ويدير كل شريحة بزاوية تتناسب طردياً مع موقع الرمز $m \theta_i$. وبفضل الخصائص الجبرية للدوران، يعتمد الجداء النقطي بين الاستعلام والمفتاح حصراً على فارق الزوايا $(m - n)\theta_i$، مما يضمن أن تتلاشى درجات الانتباه بسلاسة مع تباعد المسافات النسبية بين الكلمات كما تدور عقارب الساعة بدقة متناهية.

:::simulation-widget{engine="canvas2d" component="RotaryEmbeddingLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{q}_m^T \mathbf{k}_n = \left(\mathbf{R}_{\Theta, m}^d \mathbf{q}_m\right)^T \left(\mathbf{R}_{\Theta, n}^d \mathbf{k}_n\right) = \mathbf{q}_m^T \mathbf{R}_{\Theta, n - m}^d \mathbf{k}_n
$$

$$
\mathbf{R}_{\Theta, m}^d = \text{diag}\left(\mathbf{R}_{\theta_1, m}, \mathbf{R}_{\theta_2, m}, \dots, \mathbf{R}_{\theta_{d/2}, m}\right), \quad \mathbf{R}_{\theta_i, m} = \begin{pmatrix} \cos(m\theta_i) & -\sin(m\theta_i) \\ \sin(m\theta_i) & \cos(m\theta_i) \end{pmatrix}
$$

$$
\theta_i = b^{-2(i-1)/d}, \quad i \in \{1, 2, \dots, d/2\}, \quad b = 10\,000
$$

#### Step-by-Step Parameter Breakdown
- $\mathbf{q}_m, \mathbf{k}_n \in \mathbb{R}^d$: The query vector at sequence position $m$ and the key vector at sequence position $n$, where $d$ is the attention head dimension.
- $\mathbf{R}_{\Theta, m}^d \in \mathbb{R}^{d \times d}$: The orthogonal block-diagonal rotation matrix encoding position $m$.
- $\mathbf{R}_{\theta_i, m} \in \mathbb{R}^{2 \times 2}$: The 2D rotation operator acting on the $i$-th coordinate pair $(x_{2i-1}, x_{2i})$.
- $\theta_i = b^{-2(i-1)/d}$: The geometric frequency progression across channels, where $b$ is the base frequency (10,000 in original RoPE, up to 500,000 in Llama 3 for ultra-long context).
- $n - m$: The relative token offset; the identity $\mathbf{R}_m^T \mathbf{R}_n = \mathbf{R}_{n - m}$ proves that self-attention dot products depend purely on relative distance.

تضمن هذه الصياغة الرياضية انخفاض درجات الانتباه تدريجياً مع تزايد المسافة النسبية $|m - n|$ بفضل تداخل الترددات الجيبية المتعددة (وفق مبرهنة ريمان-لوبيغ)، مما يمنح النموذج تحيزاً استقرائياً طبيعياً للتركيز على السياق المحلي مع الحفاظ على القدرة على الانتباه للروابط البعيدة.

:::python-challenge{id="py-positional-encoding-sinusoidal-rope"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([[[1.0, 0.0]]]); m = 0; apply_rope(x, m)"
    expected: "1.0"
  - input: "x = np.array([[[0.0, 1.0]]]); m = 0; apply_rope(x, m)"
    expected: "1.0"
---
```python
import numpy as np

def precompute_rope_frequencies(dim: int, seq_len: int, base: float = 10000.0) -> tuple[np.ndarray, np.ndarray]:
    """
    Precompute cosine and sine frequency matrices for RoPE.
    
    Parameters
    ----------
    dim : int
        Head dimension (must be even).
    seq_len : int
        Maximum sequence length.
    base : float
        Frequency base scaling factor.
        
    Returns
    -------
    cos, sin : tuple of np.ndarray of shape (seq_len, dim)
    """
    # Half dimension for 2D coordinate pairs
    theta = 1.0 / (base ** (np.arange(0, dim, 2, dtype=np.float32) / dim))
    positions = np.arange(seq_len, dtype=np.float32)
    # Outer product: (seq_len, dim // 2)
    angles = np.outer(positions, theta)
    # Repeat along the last axis to match head dimension (seq_len, dim)
    cos = np.repeat(np.cos(angles), 2, axis=-1)
    sin = np.repeat(np.sin(angles), 2, axis=-1)
    return cos, sin

def rotate_half(x: np.ndarray) -> np.ndarray:
    """Rotate 2D coordinate pairs: [-x1, x0, -x3, x2, ...]."""
    x1 = x[..., 0::2]
    x2 = x[..., 1::2]
    rotated = np.stack([-x2, x1], axis=-1)
    return rotated.reshape(x.shape)

def apply_rope(x: np.ndarray, pos: int, base: float = 10000.0) -> np.ndarray:
    """
    Applies Rotary Position Embedding to a tensor x at position pos.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, H, D) or (B, 1, D)
        Input query or key tensor.
    pos : int
        Current sequence index.
        
    Returns
    -------
    np.ndarray of same shape as x with rotary embedding applied.
    """
    D = x.shape[-1]
    cos_table, sin_table = precompute_rope_frequencies(D, pos + 1, base=base)
    cos_m = cos_table[pos]  # shape (D,)
    sin_m = sin_table[pos]  # shape (D,)
    
    # RoPE formula: x * cos(m*theta) + rotate_half(x) * sin(m*theta)
    return (x * cos_m) + (rotate_half(x) * sin_m)
```
:::

### Transfer & Architectural Reasoning

**Scenario:** You are deploying a 7B parameter LLM trained with standard RoPE at a maximum context window of 4,096 tokens ($b=10\,000$). Your application requires evaluating a 32,000-token legal brief. When passing positions $m > 4096$ without any positional modification, generation quality degrades into gibberish. Why does this failure occur, and what is the principled architectural solution?

* **A.** RoPE rotation matrices become non-orthogonal for indices $m > 4096$, causing floating-point overflow in the dot product.
* **B.** (*Correct*) The model encounters unseen rotation angles $(m\theta_i)$ where high-frequency components oscillate at wavelengths never experienced during training, causing attention scores to blow up out-of-distribution; RoPE Interpolation (such as YaRN or NTK-aware scaling) downscales the rotation frequencies by a factor of $s = 32000 / 4096$ to map long contexts into the familiar $[0, 4096]$ angular spectrum.
* **C.** The causal attention mask cannot be indexed beyond dimension 4096 in GPU memory registers.
* **D.** RoPE only supports powers-of-two sequence lengths, so 32,000 fails arithmetic division by head dimension $d$.

*Explanation:* Standard RoPE suffers from out-of-distribution phase shift when evaluating positions $m > L_{\text{train}}$. By applying Position Interpolation (Chen et al., 2023) or NTK-aware scaling (Peng et al., 2023), the base frequency or coordinates are scaled so that the maximum angle at 32k matches the maximum angle at 4k, preserving attention score distribution stability.
