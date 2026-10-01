---
id: "adamw-weight-decay-schedules"
version: "1.0.0"
title: "AdamW Optimization: Decoupled Weight Decay & Learning Rate Schedules"
track: "deeplearning"
module: "mod-37"
estimated_minutes: 15
prerequisites: ["momentum-rmsprop-adaptive"]
i18n:
  ar: "خوارزمية التحسين AdamW: اضمحلال الوزن المفصول وجداول معدل التعلم"
---

# AdamW Optimization: Decoupled Weight Decay & Learning Rate Schedules

## Beat 1: Tactile Intuition

In modern deep learning and frontier AI, **AdamW** is the undisputed workhorse optimizer. Almost every large language model (GPT-4, LLaMA, Claude, DeepSeek) is trained using AdamW.

Why is AdamW so powerful?
Adam (Adaptive Moment Estimation) combines the best of both worlds:
1. **First Moment ($m_t$, Momentum):** Tracks the smoothed running average of past gradients to maintain directional momentum through ravines and flat saddles.
2. **Second Moment ($v_t$, RMSprop):** Tracks the smoothed running average of squared gradients to adaptively scale step size for every single parameter.
3. **Bias Correction:** Because $m_0$ and $v_0$ are initialized to zero, early steps would be severely biased toward zero. Dividing by $(1 - \beta_1^t)$ and $(1 - \beta_2^t)$ corrects for this initialization bias during early iterations.

**The Flaw in Classic Adam and the AdamW Fix:**
In standard SGD, adding an $L_2$ penalty $\frac{1}{2}\lambda \|\boldsymbol{\theta}\|^2$ to the loss is mathematically identical to weight decay ($\boldsymbol{\theta} \leftarrow \boldsymbol{\theta}(1 - \eta \lambda)$). But in classic Adam, researchers added the $L_2$ gradient penalty $\lambda \boldsymbol{\theta}$ directly into the gradient $g_t$!
Because Adam divides updates by $\sqrt{v_t}$, parameters that had huge, frequent historical gradients ended up having their weight decay penalty divided by a huge number—shrinking their regularization away to almost nothing! Conversely, parameters with tiny historical gradients received excessive weight decay.

Loshchilov & Hutter (2017) resolved this with **AdamW** by **decoupling weight decay**: the parameters are decayed directly ($\boldsymbol{\theta} \leftarrow \boldsymbol{\theta}(1 - \eta \lambda)$) before applying the adaptive momentum step. This simple, profound fix dramatically improves generalization across Transformer architectures.

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في عالم الذكاء الاصطناعي الحديث والنماذج اللغوية الضخمة، تُعد خوارزمية **AdamW** المحرك الأساسي الذي لا غنى عنه في تدريب البنى المعمارية المتقدمة.

تستمد الخوارزمية قوتها من الجمع الذكي بين أفضل آليات التحسين:
1. **العزم من الرتبة الأولى ($m_t$):** تتبع المتوسط المتحرك للتدرجات لتسريع الحركة في الاتجاهات المستقرة.
2. **العزم من الرتبة الثانية ($v_t$):** تتبع متوسط مربعات التدرجات لتخصيص خطوة هبوط مستقلة لكل وزن.
3. **تصحيح الانحياز:** إزالة أثر التهيئة الصفرية الأولية في الخطوات التدريبية الأولى.

**الخلل في Adam الكلاسيكية وعلاج AdamW:**
في خوارزمية Adam الأصلية، تمت إضافة عقوبة تنظيم $L_2$ إلى متجه التدرجات $g_t$ مباشرة، مما جعل عقوبة تقليص الأوزان تخضع للقسمة على $\sqrt{v_t}$. أدى ذلك إلى إضعاف تنظيم الأوزان النشطة ذات التدرجات الكبيرة، وزيادة تقليص الأوزان الهادئة.
قامت خوارزمية **AdamW** بفصل اضمحلال الوزن (Decoupled Weight Decay)؛ حيث يتم تقليص الأوزان مباشرة عبر ضربها في $(1 - \eta \lambda)$ بمعزل عن حسابات العزوم التكيفية. وفر هذا التعديل البسيط حماية هندسية فائقة لتنظيم معاملات نماذج المحولات (Transformers) وحقق قفزة نوعية في دقة النماذج وتعميمها.

---

## Beat 2: Formal Mathematical Anchor

The complete AdamW optimization step with learning rate $\eta_t$, weight decay $\lambda$, and moment coefficients $\beta_1, \beta_2$:

$$
\mathbf{m}_t = \beta_1 \mathbf{m}_{t-1} + (1 - \beta_1) \mathbf{g}_t, \quad \mathbf{v}_t = \beta_2 \mathbf{v}_{t-1} + (1 - \beta_2) \mathbf{g}_t^2
$$

$$
\hat{\mathbf{m}}_t = \frac{\mathbf{m}_t}{1 - \beta_1^t}, \quad \hat{\mathbf{v}}_t = \frac{\mathbf{v}_t}{1 - \beta_2^t}
$$

$$
\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta_t \lambda \boldsymbol{\theta}_t - \frac{\eta_t}{\sqrt{\hat{\mathbf{v}}_t} + \epsilon} \odot \hat{\mathbf{m}}_t
$$

Where:
* $\mathbf{g}_t \in \mathbb{R}^P$: Current stochastic gradient estimate at step $t$.
* $\mathbf{m}_t, \mathbf{v}_t$: Biased first and second moment estimators.
* $\hat{\mathbf{m}}_t, \hat{\mathbf{v}}_t$: Bias-corrected moment vectors, correcting for zero-initialization at early time steps $t \in \{1, 2, \dots\}$.
* $\beta_1 = 0.9, \beta_2 = 0.999$: Standard default decay hyper-parameters.
* $\lambda \ge 0$: Decoupled weight decay regularization factor (typically $0.01$ to $0.1$).
* $\eta_t$: Learning rate at step $t$, typically governed by a Cosine Decay Schedule with linear warmup.

تضمن معاملات تصحيح الانحياز $(1-\beta^t)$ أن يكون تقدير العزوم غير متحيز إحصائياً $\mathbb{E}[\hat{\mathbf{m}}_t] = \mathbb{E}[\mathbf{g}_t]$ و $\mathbb{E}[\hat{\mathbf{v}}_t] = \mathbb{E}[\mathbf{g}_t^2]$ حتى عندما تكون $t = 1$. ويضمن الحد $-\eta_t \lambda \boldsymbol{\theta}_t$ انكماشاً مستمراً للأوزان يتناسب حصراً مع قيمتها الحالية ومع معدل التعلم المجدول، دون أي تشويه ينشأ عن تباين التدرجات التاريخية.

---

## Beat 3: Interactive Python Scratchpad

Implement the single-step update function `adamw_step(param, grad, m, v, t, lr, beta1, beta2, eps, weight_decay)` implementing decoupled weight decay, moment tracking, bias correction, and the final parameter update.

:::python-challenge{id="py-adamw-weight-decay-schedules"}
---
timeout_ms: 3000
test_cases:
  - input: "p = np.array([1.0]); g = np.array([0.5]); m = np.array([0.0]); v = np.array([0.0]); p_next, m_next, v_next = adamw_step(p, g, m, v, t=1, lr=0.01, weight_decay=0.01); print(f\"{p_next[0]:.4f}\")"
    expected: "0.9899"
  - input: "p = np.array([0.0]); g = np.array([0.0]); m = np.array([0.0]); v = np.array([0.0]); p_next, m_next, v_next = adamw_step(p, g, m, v, t=1); print(p_next[0])"
    expected: "0.0"
---
```python
import numpy as np

def adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,
               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, 
               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Executes a single step of the AdamW optimization algorithm.
    
    Returns
    -------
    tuple of (param_next, m_next, v_next)
    """
    # TODO: 1. Apply decoupled weight decay: param_decayed = param * (1 - lr * weight_decay)
    # TODO: 2. Update biased first (m) and second (v) moments
    # TODO: 3. Compute bias-corrected moments m_hat and v_hat using step index t
    # TODO: 4. Compute updated parameter: param_next = param_decayed - (lr / (sqrt(v_hat) + eps)) * m_hat
    pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

Why does combining standard L2 regularization ($g \leftarrow g + \lambda \theta$) with classic Adam cause weights with large, frequent historical gradients to experience less regularization decay than weights with small gradients?

* [x] In classic Adam, the regularized gradient is divided by $\sqrt{v_t}$; since parameters with large historical gradients have large values of $v_t$, their effective decay factor $\frac{\lambda \theta}{\sqrt{v_t}}$ is suppressed, whereas parameters with small historical gradients receive large decay penalties.
* [ ] Classic Adam sets the weight decay coefficient $\lambda$ to zero whenever gradients exceed 1.0.
* [ ] L2 regularization is only mathematically defined for convex linear regression.
* [ ] Because classic Adam does not update the first moment $m_t$ when weight decay is active.

> **Insight:** In attention heads, frequent tokens produce large gradients, inflating $v_t$. Under classic Adam with L2 regularization, the weights for these frequent tokens received almost no regularization! AdamW decouples weight decay from gradient history, regularizing all parameters proportionally.
