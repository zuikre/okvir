---
id: "diffusion-models-score-sde"
version: "1.0.0"
title: "Denoising Diffusion Probabilistic Models (DDPM) & Score-Based Matching"
track: "deeplearning"
module: "mod-46"
estimated_minutes: 15
prerequisites: ["autograd-computational-graph", "numerically-stable-softmax-cross-entropy"]
i18n:
  ar: "نماذج الانتشار الاحتمالية لإزالة التشويش (DDPM) ومطابقة درجات الاحتمال"
---

# Denoising Diffusion Probabilistic Models (DDPM) & Score-Based Matching

Generative modeling historically struggled with a fundamental architectural dilemma: Generative Adversarial Networks (GANs) generate crisp samples in a single step but suffer from notorious training instability and mode collapse, while Variational Autoencoders (VAEs) train stably with variational lower bounds but produce blurry images due to intractable likelihood approximations.

**Diffusion Models** (Sohl-Dickstein et al. 2015, Ho et al. 2020) resolved this conflict by formulating generative modeling through non-equilibrium thermodynamics. Instead of synthesizing a high-dimensional image in a single risky leap, diffusion frames generation as a gradual iterative denoising process across $T = 1\,000$ discrete timesteps.

1. **The Forward Process (Diffusion):** We slowly destroy the structure of a clean data sample $\mathbf{x}_0$ by injecting small increments of Gaussian noise at each step according to a variance schedule $\beta_1, \dots, \beta_T$. By step $T$, the original data distribution is entirely annihilated into isotropic Gaussian noise $\mathbf{x}_T \sim \mathcal{N}(0, \mathbf{I})$. Crucially, because the sum of independent Gaussian random variables is itself Gaussian, we can sample the noisy state $\mathbf{x}_t$ at any arbitrary timestep $t$ in a single **closed-form step** without simulating the intermediate steps!
2. **The Reverse Process (Denoising):** We train a neural network (typically a U-Net or Diffusion Transformer) to estimate the exact noise vector $\boldsymbol{\epsilon}$ added at step $t$. Starting from pure static Gaussian noise, we iteratively subtract the network's predicted noise step by step, gradually refining chaotic randomness into crisp, photorealistic data.

> **Frontier Analogy:** Diffusion is like carving a statue out of stone by removing noise. You begin with a formless, rough block of raw marble (pure random Gaussian noise). With each delicate tap of the chisel (reverse denoising step), the artist carefully chips away unwanted marble dust (predicted noise), progressively revealing the refined contours of the hidden sculpture until an exquisite statue emerges.

عانت النماذج التوليدية لعقود من مفاضلة معقدة بين الاستقرار وجودة العينات: فشبكات GAN كانت تولد صوراً في خطوة واحدة لكنها عانت من انهيار الأنماط وعدم الاستقرار، بينما كانت مشفرات VAE تولد صوراً ضبابية.

حلت **نماذج الانتشار الاحتمالية (Diffusion Models)** هذه المعضلة عبر استلهام قوانين الديناميكا الحرارية. فبدلاً من توليد الصورة في قفزة سحرية واحدة غير مستقرة، يُصاغ التوليد كعملية إزالة تشويش تدريجية عبر مئات الخطوات الزمنية.

1. **المسار الأمامي (Forward Process):** نقوم بتدمير معالم الصورة الأصلية $\mathbf{x}_0$ تدريجياً عبر إضافة تشويش غاوسي متتابع حتى تتحول عند الخطوة $T$ إلى ضوضاء بيضاء عشوائية بحتة $\mathcal{N}(0, \mathbf{I})$. وبفضل الخصائص الجبرية لتوزيع غاوس، يمكن الانتقال مباشرة إلى أي خطوة $t$ بصيغة رياضية مغلقة.
2. **المسار العكسي (Reverse Process):** نُدرب شبكة عصبية على التنبؤ بمقدار التشويش الدقيق المضاف عند كل خطوة. يبدأ التوليد من ضوضاء عشوائية صرفة، ثم يطرح النموذج التشويش المتوقع خطوة بخطوة.

نماذج الانتشار تشبه نحاتاً بارعاً ينحت تمثالاً مذهلاً من صخرة صماء عبر إزالة الشوائب طبقة تلو الأخرى! يبدأ النحات بكتلة حجرية خام غير متشكلة، ومع كل ضربة إزميل دقيقة، يُزيل غبار الحجر الفائض حتى تتجلى الملامح البديعة للتمثال المكتمل.

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
q(\mathbf{x}_t \mid \mathbf{x}_0) = \mathcal{N}\left(\mathbf{x}_t; \sqrt{\bar{\alpha}_t} \mathbf{x}_0, (1 - \bar{\alpha}_t) \mathbf{I}\right) \implies \mathbf{x}_t = \sqrt{\bar{\alpha}_t} \mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})
$$

$$
\mathcal{L}_{\text{simple}}(\theta) = \mathbb{E}_{t, \mathbf{x}_0, \boldsymbol{\epsilon}} \left[ \left\| \boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \right\|^2 \right]
$$

$$
\mathbf{x}_{t-1} = \frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \right) + \sigma_t \mathbf{z}, \quad \mathbf{z} \sim \mathcal{N}(0, \mathbf{I})
$$

#### Step-by-Step Parameter Breakdown
- $\mathbf{x}_0$: Clean, uncorrupted input data sample (e.g. image).
- $\beta_t \in (0, 1)$: Variance schedule hyperparameter at timestep $t$ (e.g., linear schedule from $10^{-4}$ to $0.02$).
- $\alpha_t = 1 - \beta_t$: Fraction of underlying signal retained at timestep $t$.
- $\bar{\alpha}_t = \prod_{s=1}^t \alpha_s$: Cumulative signal retention product. As $t \to T$, $\bar{\alpha}_t \to 0$, meaning the original signal $\mathbf{x}_0$ completely vanishes.
- $\boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$: Ground-truth Gaussian noise added during training.
- $\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)$: Neural network conditioned on noisy state $\mathbf{x}_t$ and timestep embedding $t$, trained via simple Mean Squared Error (MSE).
- Score matching equivalence: By Tweedie's Formula, the predicted noise is directly proportional to the Stein score of the data distribution: $\nabla_{\mathbf{x}_t} \log p(\mathbf{x}_t) = -\frac{\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)}{\sqrt{1 - \bar{\alpha}_t}}$.

:::python-challenge{id="py-diffusion-models-score-sde"}
---
timeout_ms: 3000
test_cases:
  - input: "x0 = np.array([1.0, 2.0]); noise = np.zeros(2); ab = np.array([1.0]); xt = q_sample(x0, 0, noise, ab); float(xt[0])"
    expected: "1.0"
  - input: "x0 = np.zeros(2); noise = np.array([2.0, 2.0]); ab = np.array([0.0]); xt = q_sample(x0, 0, noise, ab); float(xt[0])"
    expected: "2.0"
---
```python
import numpy as np

def q_sample(
    x_0: np.ndarray,
    t: int,
    noise: np.ndarray,
    alpha_bars: np.ndarray
) -> np.ndarray:
    """
    Closed-form forward Markov diffusion sampling: q(x_t | x_0).
    
    Parameters
    ----------
    x_0 : np.ndarray
        Clean initial data tensor.
    t : int
        Current timestep index.
    noise : np.ndarray
        Standard normal Gaussian noise epsilon ~ N(0, I).
    alpha_bars : np.ndarray
        Array of cumulative alpha_bar values for all timesteps.
        
    Returns
    -------
    x_t : np.ndarray
        Noisy sample at timestep t.
    """
    alpha_bar_t = alpha_bars[t]
    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise
    return np.sqrt(alpha_bar_t) * x_0 + np.sqrt(1.0 - alpha_bar_t) * noise

def p_sample_step(
    x_t: np.ndarray,
    t: int,
    pred_noise: np.ndarray,
    alphas: np.ndarray,
    alpha_bars: np.ndarray,
    betas: np.ndarray
) -> np.ndarray:
    """
    Single reverse denoising step: p_theta(x_{t-1} | x_t).
    """
    beta_t = betas[t]
    alpha_t = alphas[t]
    alpha_bar_t = alpha_bars[t]
    
    # Mean of the reverse distribution
    coef = beta_t / np.sqrt(1.0 - alpha_bar_t)
    mean = (1.0 / np.sqrt(alpha_t)) * (x_t - coef * pred_noise)
    
    if t == 0:
        return mean
    
    # Variance: sigma_t^2 = beta_t
    sigma_t = np.sqrt(beta_t)
    z = np.random.randn(*x_t.shape)
    return mean + sigma_t * z
```
:::

### Transfer & Architectural Reasoning

**Scenario:** In modern text-to-image diffusion models (e.g. Stable Diffusion 3, Flux), generation utilizes **Classifier-Free Guidance (CFG)** during inference with an extrapolation factor $w > 1$:

$$
\tilde{\boldsymbol{\epsilon}}_\theta(\mathbf{x}_t, c) = \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, \emptyset) + w \left( \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, c) - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, \emptyset) \right)
$$

If an operator sets the guidance scale excessively high (e.g., $w = 25.0$), what visual artifact appears in the synthesized images, and what mathematical dynamic causes it?

* **A.** The image collapses to a completely black canvas because the learning rate during sampling diverges to infinity.
* **B.** (*Correct*) Extreme guidance over-amplifies the conditional score vector along the direction of prompt tokens, driving pixel activations outside the valid $[-1, 1]$ bounding box; this causes severe dynamic range saturation, unnatural contrast artifacts ("burnt" / over-saturated textures), and severe loss of sample diversity (mode collapse).
* **C.** The U-Net weights revert to random initialization due to numerical overflow in floating-point normalization.
* **D.** The reverse SDE converts into an ordinary differential equation (ODE) that cannot be solved by Euler integrators.

*Explanation:* CFG shifts probability mass towards regions with high conditional density $p(c \mid x) \propto (p(x \mid c) / p(x))^w$. Setting $w$ moderately ($5.0 \le w \le 7.5$) balances sharp text prompt alignment with natural photorealism. Excessive $w$ drives gradients out-of-bounds, requiring specialized dynamic thresholding algorithms to clamp saturated latents.
