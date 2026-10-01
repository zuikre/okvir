---
id: "momentum-rmsprop-adaptive"
version: "1.0.0"
title: "Momentum & RMSprop: Ravine Traversal & Adaptive Learning Rates"
track: "deeplearning"
module: "mod-37"
estimated_minutes: 15
prerequisites: ["gradient-descent"]
i18n:
  ar: "العزم والتكيف بمعدل RMSprop: اجتياز الوديان ومعدلات التعلم التكيفية"
---

# Momentum & RMSprop: Ravine Traversal & Adaptive Learning Rates

## Beat 1: Tactile Intuition

Imagine navigating a steep, narrow canyon in the loss landscape. Along the North-South axis, the canyon walls rise vertically like towering cliffs with enormous gradient steepness. Along the East-West axis, the canyon floor slopes downward very gently toward the true minimum.

If you drop standard Gradient Descent into this ravine, disaster strikes! The massive gradients on the steep North-South walls kick the optimizer violently back and forth across the canyon, while the tiny gradient on the floor makes almost zero progress forward. If you increase the learning rate to make faster forward progress, the side-to-side oscillations explode and diverge into numerical instability.

Two groundbreaking ideas tame this ill-conditioned terrain:

1. **Polyak Momentum (The Heavy Bowling Ball):**
Instead of treating each step as an isolated static leap, give the optimizer physical mass and momentum. Think of rolling a heavy bowling ball down the canyon. As the ball sloshes back and forth across the walls, the opposing North-South forces cancel each other out over time. Meanwhile, the persistent gentle nudge along the East-West canyon floor steadily accelerates the ball forward!

2. **RMSprop (Adaptive Friction):**
Created by Geoffrey Hinton, RMSprop introduces coordinate-wise adaptive learning rates. It keeps an exponential moving average of squared gradients ($s_t = \rho s_{t-1} + (1-\rho) g_t^2$). When updating each parameter, it divides the gradient by $\sqrt{s_t + \epsilon}$. For parameters with wild, massive oscillations, $s_t$ is huge, shrinking their effective step size and calming the bounces. For parameters with quiet, sluggish gradients, $s_t$ is tiny, boosting their effective step size and accelerating them down the valley!

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيّل تضاريس دالة خسارة على شكل أخدود ضيق شديد الانحدار. على المحور العمودي، ترتفع جدران الوادي كمنحدرات شاهقة بتدرجات هائلة، بينما ينحدر قاع الوادي أفقياً بميل طفيف جداً نحو القاع المنشود.

عند تطبيق الانحدار التقليدي في هذه البيئة، يتذبذب النموذج بعنف بين جدران الأخدود دون إحراز أي تقدم يذكر نحو المصب. لحل هذه المعضلة الكلاسيكية، ظهر ابتكاران جوهريان:

1. **العزم الفيزيائي (Momentum):** إكساب نقطة التحسين عطالة فيزيائية تشبه دحرجة كرة بولينج ثقيلة. ومع تذبذب الكرة بين الجدران، تتلاشى القوى المتعاكسة ذاتياً، بينما تتراكم السرعة في الاتجاه المستمر لقاع الوادي.
2. **خوارزمية RMSprop:** ضبط معدل تعلم مخصص لكل معلمة على حدة. تتابع الخوارزمية متوسط مربعات التدرجات السابقة وتقسم الخطوة على جذرها التربيعي. يؤدي هذا إلى كبح التذبذبات العنيفة في المحاور الحادة، وتسريع الحركة في المحاور الهادئة ذات التدرجات البطيئة.

---

## Beat 2: Formal Mathematical Anchor

The classical Polyak Momentum update introduces velocity $\mathbf{v}_t \in \mathbb{R}^P$:

$$
\mathbf{v}_t = \beta \mathbf{v}_{t-1} + \mathbf{g}_t, \quad \boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta \mathbf{v}_t
$$

The RMSprop adaptive gradient update tracks second uncentered moment $\mathbf{s}_t \in \mathbb{R}^P$:

$$
\mathbf{s}_t = \rho \mathbf{s}_{t-1} + (1 - \rho) \mathbf{g}_t^2, \quad \boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \frac{\eta}{\sqrt{\mathbf{s}_t} + \epsilon} \odot \mathbf{g}_t
$$

Where:
* $\mathbf{g}_t = \nabla_{\boldsymbol{\theta}} \mathcal{L}(\boldsymbol{\theta}_t)$: Instantaneous gradient vector at step $t$.
* $\beta \in [0.8, 0.99]$: Momentum decay factor (analogous to friction; $\frac{1}{1-\beta}$ effective accumulated steps).
* $\rho \in [0.9, 0.999]$: Exponential decay rate for moving average of squared gradients.
* $\mathbf{g}_t^2 \coloneqq \mathbf{g}_t \odot \mathbf{g}_t$: Element-wise Hadamard squared gradient.
* $\epsilon \approx 10^{-8}$: Small numerical stability constant preventing division by zero.
* $\odot$: Element-wise vector multiplication.

تمنح صيغة العزم سرعة نهائية قصوى تعادل $\frac{\eta}{1-\beta}$ في الاتجاهات المستقرة، مما يسرع الهبوط بمقدار 10 أضعاف عندما تكون $\beta = 0.9$. وفي المقابل، تحافظ RMSprop على توحيد سعة الخطوة الفعالة $\frac{\eta}{\sqrt{s_t + \epsilon}} g_t \approx \pm \eta$ عبر كافة المحاور، متجاوزة تباين انحناء مصفوفة هيسيان (Hessian Conditioning).

---

## Beat 3: Interactive Python Scratchpad

Implement both the `momentum_step(param, grad, v, lr, beta)` and `rmsprop_step(param, grad, s, lr, rho, eps)` update algorithms for parameter arrays.

:::python-challenge{id="py-momentum-rmsprop-adaptive"}
---
timeout_ms: 3000
test_cases:
  - input: "p = np.array([1.0]); g = np.array([2.0]); v = np.array([0.0]); p_new, v_new = momentum_step(p, g, v, lr=0.1, beta=0.9); print(f\"{p_new[0]:.2f},{v_new[0]:.2f}\")"
    expected: "0.80,2.00"
  - input: "p = np.array([1.0]); g = np.array([2.0]); s = np.array([0.0]); p_new, s_new = rmsprop_step(p, g, s, lr=0.1, rho=0.9); print(f\"{round(p_new[0], 2):.2f},{round(s_new[0], 2):.2f}\")"
    expected: "0.68,0.40"
---
```python
import numpy as np

def momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, 
                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:
    """
    Executes a single step of Polyak Momentum.
    Returns (param_next, v_next).
    """
    # TODO: 1. Update velocity: v_next = beta * v + grad
    # TODO: 2. Update parameter: param_next = param - lr * v_next
    pass

def rmsprop_step(param: np.ndarray, grad: np.ndarray, s: np.ndarray, 
                 lr: float = 0.01, rho: float = 0.9, eps: float = 1e-8) -> tuple[np.ndarray, np.ndarray]:
    """
    Executes a single step of RMSprop.
    Returns (param_next, s_next).
    """
    # TODO: 1. Update squared gradient average: s_next = rho * s + (1 - rho) * (grad ** 2)
    # TODO: 2. Update parameter: param_next = param - (lr / (sqrt(s_next) + eps)) * grad
    pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

In an ill-conditioned quadratic bowl where the maximum eigenvalue of the Hessian is 10,000 times larger than the minimum eigenvalue ($\kappa = 10^4$), why does RMSprop successfully reach the minimum while standard Gradient Descent either diverges or takes millions of steps?

* [x] Standard gradient descent's maximum stable step size is bounded by the steepest curvature ($\eta < \frac{2}{\lambda_{\max}}$), forcing it to crawl along the flat axis; RMSprop rescales the step size along each coordinate by $\frac{1}{\sqrt{s_i}}$, automatically dampening updates along high-curvature directions while boosting steps along low-curvature directions.
* [ ] RMSprop analytically calculates the inverse Hessian matrix $(H^{-1})$ at each step.
* [ ] RMSprop alters the loss function to eliminate all curvature.
* [ ] RMSprop rounds all parameters to the nearest integer to ensure stability.

> **Insight:** Curvature anisotropy (ravines) is the single biggest bottleneck in first-order optimization. By dividing by the root-mean-square of recent gradients, RMSprop acts as an empirical diagonal preconditioner for the Hessian matrix.
