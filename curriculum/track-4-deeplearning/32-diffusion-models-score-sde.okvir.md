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

## Beat 1: Tactile Intuition

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

---

## Beat 2: Formal Mathematical Anchor

The forward Markov diffusion transition allows closed-form sampling of any latent state $\mathbf{x}_t$ directly from original data $\mathbf{x}_0$:

$$
q(\mathbf{x}_t \mid \mathbf{x}_0) = \mathcal{N}\left(\mathbf{x}_t; \sqrt{\bar{\alpha}_t} \mathbf{x}_0, (1 - \bar{\alpha}_t) \mathbf{I}\right) \implies \mathbf{x}_t = \sqrt{\bar{\alpha}_t} \mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})
$$

The network parameters $\theta$ are trained using the simplified Mean Squared Error (MSE) denoising score objective:

$$
\mathcal{L}_{\text{simple}}(\theta) = \mathbb{E}_{t, \mathbf{x}_0, \boldsymbol{\epsilon}} \left[ \left\| \boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \right\|^2 \right]
$$

During inference, iterative reverse denoising steps reconstruct the trajectory backwards from $T$ down to $0$:

$$
\mathbf{x}_{t-1} = \frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \right) + \sigma_t \mathbf{z}, \quad \mathbf{z} \sim \mathcal{N}(0, \mathbf{I})
$$

By Tweedie's formula, the network's predicted noise is directly proportional to the Stein score of the data distribution:

$$
\nabla_{\mathbf{x}_t} \log p(\mathbf{x}_t) = -\frac{\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)}{\sqrt{1 - \bar{\alpha}_t}}
$$

### Comprehensive Symbol & Parameter Breakdown

| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}_0$ | Tensor | Clean uncorrupted data sample (e.g. image) | Ground truth target anchoring the diffusion trajectory. |
| $\beta_t \in (0, 1)$ | Scalar | Variance schedule coefficient at timestep $t$ | Controls the rate of Gaussian noise injection per step. |
| $\alpha_t = 1 - \beta_t$ | Scalar | Proportion of signal preserved at timestep $t$ | Complementary signal retention multiplier. |
| $\bar{\alpha}_t = \prod_{s=1}^t \alpha_s$ | Scalar | Cumulative signal retention product | Governs the relative ratio of signal to noise at arbitrary step $t$. |
| $\boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$ | Tensor | Ground truth isotropic Gaussian noise | Standard normal perturbation sampled during training. |
| $\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)$ | Tensor | Neural network noise predictor (U-Net or DiT) | Learns to estimate the precise perturbation corrupting $\mathbf{x}_t$. |
| $\sigma_t = \sqrt{\beta_t}$ | Scalar | Reverse transition standard deviation | Re-injects controlled stochastic variance during reverse sampling. |

تضمن هذه الصياغة الرياضية استقرار عملية التدريب عبر مطابقة درجات الاحتمال (Score Matching)، حيث يتعلم النموذج اتجاهات التدفق نحو التوزيع الحقيقي للبيانات، مما يلغي تماماً مخاطر انهيار الأنماط الشائعة في شبكات GAN.

---

## Beat 3: Python Challenge

Implement `q_sample` to compute closed-form forward diffusion sampling, and `p_sample_step` to execute a single reverse denoising step.

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
    # Step 1: Retrieve cumulative signal retention coefficient alpha_bar_t
    alpha_bar_t = alpha_bars[t]
    
    # Step 2: Combine clean data and noise using closed-form analytical formula
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
    
    # Step 1: Compute mean vector of reverse Gaussian distribution
    coef = beta_t / np.sqrt(1.0 - alpha_bar_t)
    mean = (1.0 / np.sqrt(alpha_t)) * (x_t - coef * pred_noise)
    
    # Step 2: If at the final step t=0, return deterministic mean
    if t == 0:
        return mean
    
    # Step 3: Add stochastic noise scaled by sigma_t = sqrt(beta_t)
    sigma_t = np.sqrt(beta_t)
    z = np.random.randn(*x_t.shape)
    return mean + sigma_t * z
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

**Scenario:** In modern text-to-image diffusion models (e.g. Stable Diffusion 3, Flux), generation utilizes **Classifier-Free Guidance (CFG)** during inference with an extrapolation factor $w > 1$:

$$
\tilde{\boldsymbol{\epsilon}}_\theta(\mathbf{x}_t, c) = \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, \emptyset) + w \left( \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, c) - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, \emptyset) \right)
$$

If an operator sets the guidance scale excessively high (e.g., $w = 25.0$), what visual artifact appears in the synthesized images, and what mathematical dynamic causes it?

* [ ] The image collapses to a completely black canvas because the learning rate during sampling diverges to infinity.
* [x] Extreme guidance over-amplifies the conditional score vector along the direction of prompt tokens, driving pixel activations outside the valid $[-1, 1]$ bounding box; this causes severe dynamic range saturation, unnatural contrast artifacts ("burnt" / over-saturated textures), and severe loss of sample diversity (mode collapse).
* [ ] The U-Net weights revert to random initialization due to numerical overflow in floating-point normalization.
* [ ] The reverse SDE converts into an ordinary differential equation (ODE) that cannot be solved by Euler integrators.

> **Insight & Option Analysis:**
> - **Option A is incorrect:** Inference sampling does not update model weights; there is no learning rate during generation.
> - **Option B is correct:** CFG shifts probability mass towards regions with high conditional density $p(c \mid x) \propto (p(x \mid c) / p(x))^w$. Setting $w$ moderately ($5.0 \le w \le 7.5$) balances sharp text prompt alignment with natural photorealism. Excessive $w$ drives gradients out-of-bounds, requiring specialized dynamic thresholding algorithms to clamp saturated latents.
> - **Option C is incorrect:** Model parameters are frozen during inference; weights do not re-initialize.
> - **Option D is incorrect:** Continuous-time score diffusion can be sampled using both stochastic differential equations (SDEs) and deterministic probability-flow ODEs (e.g. DDIM or DPMSolver) regardless of guidance scale.
