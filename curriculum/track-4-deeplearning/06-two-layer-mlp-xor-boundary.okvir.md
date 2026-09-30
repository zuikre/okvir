---
id: "two-layer-mlp-xor-boundary"
version: "1.0.0"
title: "AdamW Optimization: Adaptive Moments & Decoupled Weight Decay"
track: "deeplearning"
module: "mod-36"
estimated_minutes: 15
prerequisites: ["numerically-stable-softmax-cross-entropy"]
i18n:
  ar: "خوارزمية التحسين AdamW: العزوم التكيفية واضمحلال الوزن المفصول"
---

# AdamW Optimization: Adaptive Moments & Decoupled Weight Decay

Standard Stochastic Gradient Descent (SGD) updates parameters along the negative gradient: $\theta_{t+1} = \theta_t - \eta g_t$. In complex loss landscapes characterized by steep ravines and ill-conditioned curvature (where gradients oscillate violently along steep walls while crawling sluggishly along the gentle ravine floor), SGD struggles severely.

To overcome this, Adam (Adaptive Moment Estimation) combines two profound principles:
1. First Moment (Momentum): Computes an exponentially decaying average of past gradients ($m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$), acting like physi

:::simulation-widget{engine="canvas2d" component="AdamWOptimizerLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
g_t = \nabla_\theta \mathcal{L}(\theta_t)
$$

تعمل خوارزمية AdamW على تثبيت وتحسين كفاءة تدريب الشبكات العميقة عبر دمج العزوم التكيفية للرتبتين الأولى والثانية مع آلية "اضمحلال الوزن المفصول" (Decoupled Weight Decay). على عكس خوارزمية Adam الأصلية المقترنة بتنظيم $L_2$ التقليدي — والتي تقلص عقوبة التنظيم عن غير قصد للأوزان ذات التباين التاريخي العالي — تطبق AdamW انكماش الوزن الحقيقي مباشرة على مصفوفات المعاملات، مما يحفظ تنظيماً هندسياً متوازناً عبر كافة أبعاد النموذج.

:::python-challenge{id="py-two-layer-mlp-xor-boundary"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def adamw_step(
    param: np.ndarray,
    grad: np.ndarray,
    m: np.ndarray,
    v: np.ndarray,
    t: int,
    lr: float = 1e-3,
    beta1: float = 0.9,
    beta2: float = 0.999,
    eps: float = 1e-8,
    weight_decay: float = 1e-2
) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...
```
:::
