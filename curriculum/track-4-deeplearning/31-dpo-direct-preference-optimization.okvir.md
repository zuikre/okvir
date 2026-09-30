---
id: "dpo-direct-preference-optimization"
version: "1.0.0"
title: "Reverse Diffusion Denoising Step, Score Matching & Langevin Dynamics"
track: "deeplearning"
module: "mod-45"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer", "rubin-causal-model-potential-outcomes"]
i18n:
  ar: "خطوة إزالة التشويش في الانتشار العكسي ومطابقة درجات الاحتمال وديناميكيات لانجفان"
---

# Reverse Diffusion Denoising Step, Score Matching & Langevin Dynamics

Having established the forward degradation chain in Lesson T4-30, how do we generate brand-new samples from scratch?
We must run the clock backwards: start from pure Gaussian noise $\mathbf{x}_T \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$ and compute the reverse transition distribution $p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t)$.

By Bayes' rule, conditioned on the original clean image $\mathbf{x}_0$, the true posterior $q(\mathbf{x}_{t-1} \mid \mathbf{x}_t, \mathbf{x}_0)$ is also a Gaussian distribution:

:::simulation-widget{engine="canvas2d" component="DiffusionTrajectoryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
q(\mathbf{x}_{t-1} \mid \mathbf{x}_t, \mathbf{x}_0) = \mathcal{N}\left(\mathbf{x}_{t-1}; \; \tilde{\boldsymbol{\mu}}_t(\mathbf{x}_t, \mathbf{x}_0), \; \tilde{\beta}_t \mathbf{I}\right)
$$

تولد عملية الانتشار العكسي بيانات جديدة كلياً عبر أخذ عينات من انتقالات غاوسية وسيطية $p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t)$. ومن خلال إعادة صياغة المتوسط اللاحق بدلالة مركبة الضجيج، يختزل التدريب في حساب الخطأ التربيعي المتوسط بين الضجيج المحقون وتنبؤ الشبكة العصبية $\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)$. يتطابق هذا الهدف الرياضي تماماً مع "مطابقة درجات الاحتمال لإزالة التشويش" (Denoising Score Matching)، حيث يمثل متجه الضجيج المتنبأ به تدرج دالة الكثافة الاحتمالية (Stein Score)، موجهاً ديناميكيات لانجفان الحركية نحو فضاءات البيانات الأصلية عالية الاحتمال.

:::python-challenge{id="py-dpo-direct-preference-optimization"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def ddpm_p_sample_step(
    x_t: np.ndarray,
    t: int,
    eps_cond: np.ndarray,
    eps_uncond: np.ndarray,
    cfg_scale: float,
    betas: np.ndarray,
    alpha_bars: np.ndarray,
    z: np.ndarray | None = None
) -> np.ndarray: ...
```
:::
