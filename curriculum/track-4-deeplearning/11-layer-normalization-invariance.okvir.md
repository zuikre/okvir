---
id: "layer-normalization-invariance"
version: "1.0.0"
title: "Layer Normalization & Invariant Representations"
track: "deeplearning"
module: "mod-38"
estimated_minutes: 15
prerequisites: ["batch-normalization-internal-covariate"]
i18n:
  ar: "تطبيع الطبقات وثبات التمثيلات الخفية"
---

# Layer Normalization & Invariant Representations

## Beat 1: Tactile Intuition

While Batch Normalization revolutionized convolutional vision networks, it created a severe conceptual vulnerability: **sample coupling**. Under BatchNorm, the way Sample A is processed depends entirely on the other samples that happen to be in the same batch with it. If Sample B is an extreme outlier, it drags down the batch mean and corrupts the representation of Sample A!

In sequence models and Transformer LLMs (such as GPT-4, LLaMA, and Claude), this coupling is intolerable. Sentences have different lengths, prompts arrive one at a time ($B=1$) during real-time streaming, and caching key-values requires absolute deterministic independence.

In 2016, Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey Hinton introduced the solution: **Layer Normalization (LayerNorm)**.
Instead of computing statistics *vertically across different samples* in a mini-batch, LayerNorm computes statistics *horizontally across all feature channels within a single sample/token*:
1. For an individual token vector $\mathbf{x} \in \mathbb{R}^d$, it computes the mean $\mu$ and variance $\sigma^2$ across its $d$ hidden dimensions.
2. It normalizes that vector to zero mean and unit variance.
3. It scales and shifts using learnable vectors $\boldsymbol{\gamma}$ and $\boldsymbol{\beta}$.

**The Superpower of LayerNorm: Perfect Independence & Invariance:**
Every token normalizes itself completely in isolation. It does not know or care whether the batch size is 1 or 1,000,000. It behaves identically during training and inference—eliminating running averages entirely!
Furthermore, LayerNorm grants mathematical **scale and shift invariance**: if you multiply an incoming embedding by $10\times$ or add a constant offset, LayerNorm cancels it out completely, keeping hidden activations in the stable zone throughout hundreds of transformer layers.

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في حين أحدثت تقنية تطبيع الدفعات ثورة في شبكات الرؤية الحاسوبية، إلا أنها حملت نقطة ضعف جوهرية: **ارتباط مصير العينات**. ففي BatchNorm، تتأثر كيفية معالجة الجملة (أ) بخصائص الجمل الأخرى المتواجدة معها صدفة في نفس الدفعة، مما يشكل عائقاً جسيماً في معالجة اللغات الطبيعية حيث تتباين أطوال النصوص وتصل المدخلات بصورة فردية تتابعية ($B=1$).

قدم جيمي با، جيمي كيروس، وجيفري هينتون الحل المعماري الأسمى: **تطبيع الطبقات (Layer Normalization)**.
عوضاً عن حساب الإحصائيات رأسياً عبر عينات الدفعة المختلفة، تقوم LayerNorm بحساب المتوسط والتباين أفقياً عبر الأبعاد الخفية للرمز الواحد:
1. قياس المتوسط والتباين لمتجه الرمز $\mathbf{x} \in \mathbb{R}^d$ عبر أبعاده الخفية $d$.
2. تطبيع المتجه ليمتلك متوسطاً صفرياً وتبايناً يساوي 1.0.
3. تطبيق معاملي التحويل التآلفي القابلين للتعلم $\boldsymbol{\gamma}$ و $\boldsymbol{\beta}$.

**قوة الاستقلالية والثبات الرياضي:**
يتمتع كل رمز في LayerNorm باستقلالية مطلقة؛ فالناتج متطابق تماماً سواء كانت الدفعة تحتوي على عينة واحدة أو مليون عينة، ولا حاجة لأي متوسطات تراكمية بين التدريب والاستدلال. كما تمنح LayerNorm ثباتاً تاماً أمام التغيرات القياسية الخطية؛ فإذا تضاعفت قيم المدخل بعشرة أضعاف، تقوم الدالة بإلغاء هذا التضخم ذاتياً، حافظةً توازن الإشارات العصبية عبر مئات طبقات المحولات التوليدية.

---

## Beat 2: Formal Mathematical Anchor

For an individual activation vector $\mathbf{x} = [x_1, x_2, \dots, x_d]^T \in \mathbb{R}^d$, Layer Normalization is defined as:

$$
\mu = \frac{1}{d} \sum_{j=1}^d x_j, \quad \sigma^2 = \frac{1}{d} \sum_{j=1}^d (x_j - \mu)^2
$$

$$
\hat{x}_j = \frac{x_j - \mu}{\sqrt{\sigma^2 + \epsilon}}, \quad y_j = \gamma_j \hat{x}_j + \beta_j \equiv \text{LN}_{\boldsymbol{\gamma}, \boldsymbol{\beta}}(\mathbf{x})_j
$$

Fundamental Mathematical Invariances:
1. **Scale Invariance:** For any scalar $\alpha > 0$:
   $$\text{LN}(\alpha \mathbf{x}) = \text{LN}(\mathbf{x})$$
2. **Shift Invariance:** For any scalar constant $c \in \mathbb{R}$:
   $$\text{LN}(\mathbf{x} + c \mathbf{1}) = \text{LN}(\mathbf{x})$$

Where:
* $d$: Hidden feature dimension (e.g., $4096$ in LLaMA-7B).
* $\mu \in \mathbb{R}, \sigma^2 \in \mathbb{R}$: Scalar sample mean and variance evaluated along the last axis ($\text{axis}=-1$).
* $\boldsymbol{\gamma}, \boldsymbol{\beta} \in \mathbb{R}^d$: Learnable gain and bias vectors matching the feature dimension.
* $\epsilon \approx 10^{-5}$: Numerical variance stabilizer.

بفضل خاصيتي الثبات أمام المقياس والإزاحة ($\text{Scale/Shift Invariance}$)، تضمن LayerNorm أن إعادة قياس مصفوفات الأوزان أو تراكم الانحيازات عبر الطبقات لا يؤدي إلى تشويه تمثيل الرموز في الفضاء الدلالي، مما يجعلها البنية التحتية القياسية لجميع نماذج الانتباه المتعدد الرؤوس (MHA).

---

## Beat 3: Interactive Python Scratchpad

Implement the forward pass of Layer Normalization `layernorm_forward(x, gamma, beta, eps)` operating along the last feature dimension (`axis=-1`). Return the normalized output and a cache dictionary for backward passes.

:::python-challenge{id="py-layer-normalization-invariance"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([[1.0, 3.0, 5.0]]); g = np.ones(3); b = np.zeros(3); out, cache = layernorm_forward(x, g, b); print(f\"{out.mean():.1f},{out.std():.1f}\")"
    expected: "0.0,1.0"
  - input: "x = np.array([[10.0, 20.0], [100.0, 200.0]]); g = np.ones(2); b = np.zeros(2); out, _ = layernorm_forward(x, g, b); print(np.allclose(out[0], out[1]))"
    expected: "True"
---
```python
import numpy as np

def layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, 
                       eps: float = 1e-5) -> tuple[np.ndarray, dict]:
    """
    Computes Layer Normalization across the last feature dimension.
    
    Parameters
    ----------
    x : np.ndarray of shape (..., D)
    gamma : np.ndarray of shape (D,)
    beta : np.ndarray of shape (D,)
    eps : float
    
    Returns
    -------
    tuple of (out, cache)
    """
    # TODO: 1. Compute mean and variance along axis=-1 with keepdims=True
    # TODO: 2. Standardize x: x_norm = (x - mean) / sqrt(var + eps)
    # TODO: 3. Scale by gamma and shift by beta: out = gamma * x_norm + beta
    # TODO: 4. Return out and cache dict
    pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

Why does Layer Normalization show exact invariance to scaling the input vector by any positive constant $\alpha > 0$ ($\text{LN}(\alpha \mathbf{x}) = \text{LN}(\mathbf{x})$)?

* [x] Multiplying the input vector by $\alpha$ scales the centered difference $(\alpha x_j - \alpha \mu)$ by $\alpha$, while the standard deviation $\sqrt{\alpha^2 \sigma^2}$ is also scaled by $\alpha$; the two scalar factors cancel out exactly in the numerator and denominator $\frac{\alpha(x_j - \mu)}{\alpha \sigma}$.
* [ ] LayerNorm subtracts $\alpha$ in the bias parameter $\beta$.
* [ ] Scaling by $\alpha$ rotates the vector orthogonally, keeping length constant.
* [ ] LayerNorm truncates all input numbers to unit floats before computing statistics.

> **Insight:** Scale invariance is why Transformers can handle exploding residual activations without numerical collapse: even if a residual stream grows larger and larger through 80 layers, LayerNorm always resets the variance to 1.0 before feeding the activations into the next attention block.
