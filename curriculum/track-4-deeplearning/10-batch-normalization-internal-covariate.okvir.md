---
id: "batch-normalization-internal-covariate"
version: "1.0.0"
title: "Batch Normalization: Internal Covariate Shift & Mini-Batch Statistics"
track: "deeplearning"
module: "mod-38"
estimated_minutes: 15
prerequisites: ["two-layer-mlp-xor-boundary", "gradient-descent"]
i18n:
  ar: "تطبيع الدفعات: استقرار التوزيع وإحصائيات الدفعة"
---

# Batch Normalization: Internal Covariate Shift & Mini-Batch Statistics

## Beat 1: Tactile Intuition

Imagine building a skyscraper where every floor is made of shifting quicksand. As workers on the 1st floor make minor adjustments to their support pillars, the 2nd floor shifts and tilts. Because the 2nd floor tilted, the 3rd floor tilts even more violently. By the time you reach the 50th floor, the ground is thrashing unpredictably!

This is the nightmare of training deep neural networks without normalization, historically termed **internal covariate shift**. When Layer 1 updates its weights during a gradient step, the distribution of outputs it hands to Layer 2 shifts. Layer 2 must now constantly struggle to adapt to a moving target, causing gradients in deep layers to explode, vanish, or saturate.

In 2015, Sergey Ioffe and Christian Szegedy introduced a breakthrough remedy: **Batch Normalization (BatchNorm)**.
Instead of letting activations drift wildly, BatchNorm intercepts the activations between layers and tames them across the mini-batch:
1. It calculates the mini-batch mean $\mu_B$ and variance $\sigma_B^2$ across all samples in the batch.
2. It standardizes each feature coordinate to zero mean and unit variance: $\hat{x} = \frac{x - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$.
3. To ensure the network doesn't lose expressive power, it introduces two learnable parameters: scale $\gamma$ and shift $\beta$, producing $y = \gamma \hat{x} + \beta$. If the network decides that a non-zero mean is actually optimal, it can learn to restore it!

**The Dual-Mode Lifecycle:**
* **During Training:** BatchNorm calculates statistics dynamically from the current mini-batch and maintains an exponential moving average (running mean and running variance).
* **During Evaluation / Inference:** The mini-batch statistics are frozen! The layer normalizes using the stored running averages, ensuring that predicting a single sample produces deterministic, stable results.

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيّل أنك تبني ناطحة سحاب من خمسين طابقاً، وكل طابق مبني فوق رمال متحركة غير مستقرة. كل تعديل طفيف يجريه العمال في الطابق الأول يؤدي إلى انزلاق أرضية الطابق الثاني، مما يضاعف الانحراف في الطوابق العليا حتى تنهار القمة.

هذه هي المعضلة الكبرى في تدريب الشبكات العصبية العميقة، والتي تُعرف بـ **انحراف التوزيع الداخلي (Internal Covariate Shift)**. مع كل خطوة تحديث للأوزان في الطبقات الدنيا، تتغير التوزيعات الإحصائية للتنشيطات الداخلة إلى الطبقات اللاحقة، مما يضطر الطبقات العميقة لإعادة تكييف نفسها باستمرار من الصفر، مسبباً تلاشي التدرجات أو انفجارها.

ابتكرت تقنية **تطبيع الدفعات (Batch Normalization)** حلاً جذرياً: اعتراض التنشيطات بين الطبقات وإخضاعها لعملية معايرة إحصائية فورية:
1. حساب المتوسط والتباين عبر كافة عينات الدفعة المصغرة الحالية.
2. توحيد التنشيطات لتصبح ذات متوسط صفري وتباين يساوي 1.0.
3. إضافة معاملين قابلين للتعلم: المقياس $\gamma$ والإزاحة $\beta$، مما يسمح للشبكة باستعادة أي توزيع غير خطي تراه مفيداً للتمثيل.

**وضع التدريب مقابل وضع الاستدلال:**
أثناء التدريب، يتم استخدام إحصائيات الدفعة الحالية مع تحديث متوسط متحرك تراكمي. وعند الاختبار والإنتاج (Inference)، يتم تجميد هذه الإحصائيات واستخدام المتوسطات التراكمية المحفوظة، لضمان استقرار التنبؤ لعينة واحدة منفردة.

---

## Beat 2: Formal Mathematical Anchor

For a mini-batch $\mathcal{B} = \{x_1, \dots, x_B\}$ of activations for a given dimension, the Batch Normalization transform is defined as:

$$
\mu_{\mathcal{B}} = \frac{1}{B} \sum_{i=1}^B x_i, \quad \sigma_{\mathcal{B}}^2 = \frac{1}{B} \sum_{i=1}^B (x_i - \mu_{\mathcal{B}})^2
$$

$$
\hat{x}_i = \frac{x_i - \mu_{\mathcal{B}}}{\sqrt{\sigma_{\mathcal{B}}^2 + \epsilon}}, \quad y_i = \gamma \hat{x}_i + \beta \equiv \text{BN}_{\gamma, \beta}(x_i)
$$

During training, population running statistics are tracked with momentum $m \in (0, 1)$:
$$
\mu_{\text{run}} \leftarrow (1 - m) \mu_{\text{run}} + m \mu_{\mathcal{B}}, \quad \sigma_{\text{run}}^2 \leftarrow (1 - m) \sigma_{\text{run}}^2 + m \sigma_{\mathcal{B}}^2
$$

During inference (evaluation mode), the fixed running estimates replace mini-batch statistics:
$$
\hat{x}_{\text{eval}} = \frac{x - \mu_{\text{run}}}{\sqrt{\sigma_{\text{run}}^2 + \epsilon}}, \quad y_{\text{eval}} = \gamma \hat{x}_{\text{eval}} + \beta
$$

Where:
* $B$: Mini-batch size.
* $\epsilon \approx 10^{-5}$: Numerical variance stabilizer.
* $\gamma, \beta \in \mathbb{R}$: Learnable affine scale and shift parameters initialized to $\gamma=1, \beta=0$.
* $\mu_{\text{run}}, \sigma_{\text{run}}^2$: Non-differentiable tracking buffers used strictly during deployment.

تضمن عملية التطبيع بقاء تدرجات دالة الخسارة مستقرة ومحصورة داخل نطاق عددي آمن، مما يسمح باستخدام معدلات تعلم أكبر بعشر مرات وتدريب شبكات ذات مئات الطبقات بنجاح وسرعة فائقة.

---

## Beat 3: Interactive Python Scratchpad

Implement the complete `batchnorm_forward` function supporting both training mode (computing batch statistics and updating running buffers) and inference mode (using frozen running buffers).

:::python-challenge{id="py-batch-normalization-internal-covariate"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([[1.0, 2.0], [3.0, 4.0]]); g = np.ones(2); b = np.zeros(2); rm = np.zeros(2); rv = np.ones(2); out, rm, rv = batchnorm_forward(x, g, b, rm, rv, training=True); print(f\"{out[:, 0].mean():.1f},{out[:, 0].std():.1f}\")"
    expected: "0.0,1.0"
  - input: "x = np.array([[2.0, 2.0]]); g = np.ones(2); b = np.zeros(2); rm = np.array([2.0, 2.0]); rv = np.array([1.0, 1.0]); out, _, _ = batchnorm_forward(x, g, b, rm, rv, training=False); print(f\"{out[0, 0]:.1f},{out[0, 1]:.1f}\")"
    expected: "0.0,0.0"
---
```python
import numpy as np

def batchnorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray,
                      running_mean: np.ndarray, running_var: np.ndarray,
                      training: bool = True, momentum: float = 0.1,
                      eps: float = 1e-5) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Computes forward pass of Batch Normalization.
    
    Parameters
    ----------
    x : np.ndarray of shape (B, D)
    gamma, beta : np.ndarray of shape (D,)
    running_mean, running_var : np.ndarray of shape (D,)
    training : bool
    
    Returns
    -------
    tuple of (out, running_mean, running_var)
    """
    # TODO: If training:
    #       1. Compute batch mean and variance across axis=0
    #       2. Standardize x: x_norm = (x - mean) / sqrt(var + eps)
    #       3. Apply affine transform: out = gamma * x_norm + beta
    #       4. Update running_mean and running_var using momentum
    # TODO: If not training:
    #       1. Standardize using running_mean and running_var
    #       2. Apply affine transform: out = gamma * x_norm + beta
    pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

Why does Batch Normalization struggle in autoregressive language models (LLMs) and small batch training ($B=1$), motivating the switch to Layer Normalization?

* [x] In autoregressive generation (e.g. streaming tokens), the inference batch size for an active prompt is often $B=1$, making mini-batch variance zero or undefined; furthermore, sequence lengths vary dynamically, and batch statistics artificially couple unrelated sentences together during training.
* [ ] Batch Normalization requires more memory than the entire model's parameter footprint.
* [ ] GPUs cannot compute the mean of a vector along axis 0.
* [ ] BatchNorm cannot be differentiated using automatic differentiation.

> **Insight:** In CNNs, images have fixed dimensions and large batches, making BatchNorm very effective. But in modern NLP and Transformers, inputs are variable-length sequences where coupling different sequences in a batch creates destructive dependencies. This led directly to the adoption of Layer Normalization.
