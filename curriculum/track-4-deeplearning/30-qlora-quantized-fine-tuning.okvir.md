---
id: "qlora-quantized-fine-tuning"
version: "1.0.0"
title: "DDPM Forward Markov Noising & Closed-Form Marginal Sampling"
track: "deeplearning"
module: "mod-45"
estimated_minutes: 15
prerequisites: ["lora-low-rank-adaptation"]
i18n:
  ar: "التشويش الماركوفي الأمامي في نماذج DDPM وأخذ العينات الهامشية بالصيغة المغلقة"
---

# DDPM Forward Markov Noising & Closed-Form Marginal Sampling

Generative modeling seeks to sample complex data distributions (such as natural images or molecular conformations) from a neural network. Generative Adversarial Networks (GANs) struggled with mode collapse and training instability; Variational Autoencoders (VAEs) produced blurry samples due to loose evidence lower bounds.

In 2015, Jascha Sohl-Dickstein et al. drew inspiration from non-equilibrium thermodynamics to introduce Diffusion Models, later formalized as Denoising Diffusion Probabilistic Models (DDPM) by Jonathan Ho, Ajay Jain, and Pieter Abbeel (2020).

The core philosophy is

:::simulation-widget{engine="canvas2d" component="DdpmForwardNoisingLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
q(\mathbf{x}_t \mid \mathbf{x}_{t-1}) = \mathcal{N}\left(\mathbf{x}_t; \; \sqrt{1 - \beta_t} \mathbf{x}_{t-1}, \; \beta_t \mathbf{I}\right)
$$

تبني "نماذج الانتشار الاحتمالية لإزالة التشويش" (DDPM) سلسلة ماركوفية أمامية تعمد إلى تدمير البنية الهندسية للبيانات تدريجياً وتحويلها إلى ضجيج غاوسي متجانس عبر جدول تباين زمني $\beta_t$. ومن خلال الاستبدال التكراري التحليلي، تختزل هذه الانتقالات الماركوفية في توزيع هامشي ذي صيغة مغلقة $q(\mathbf{x}_t \mid \mathbf{x}_0) = \mathcal{N}(\mathbf{x}_t; \sqrt{\bar{\alpha}_t} \mathbf{x}_0, (1 - \bar{\alpha}_t)\mathbf{I})$. يتيح هذا الحل الجبري حقن الضجيج مباشرة في خطوة واحدة عند أي لحظة زمنية عشوائية أثناء التدريب المتوازي للنموذج.

:::python-challenge{id="py-qlora-quantized-fine-tuning"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def ddpm_q_sample(
    x_0: np.ndarray,
    t: int,
    noise: np.ndarray,
    alpha_bars: np.ndarray
) -> np.ndarray: ...
```
:::
