---
id: "gradient-descent"
version: "1.0.0"
title: "Gradient Descent Optimization: Batch, Stochastic & Mini-Batch"
track: "deeplearning"
module: "mod-37"
estimated_minutes: 15
prerequisites: ["two-layer-mlp-xor-boundary", "differentiation-rules-chain"]
i18n:
  ar: "خوارزمية الانحدار التدريجي: الدفعة الكاملة، العشوائي، والدفعات المصغرة"
---

# Gradient Descent Optimization: Batch, Stochastic & Mini-Batch

## Beat 1: Tactile Intuition

Imagine you are hiking on a sprawling, rugged mountain wrapped in dense, impenetrable fog. You cannot see the lowest valley where base camp lies (the minimum of our loss function $\mathcal{L}$). However, beneath your boots, you can feel the physical slope of the terrain: which direction tilts steepest upward ($\nabla \mathcal{L}$), and which direction leads steepest downward ($-\nabla \mathcal{L}$).

If you take a step in the direction of steepest descent, scaled by a cautious step size $\eta$ (the learning rate), you are guaranteed locally to descend toward lower ground: $\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta \mathbf{g}_t$.

In deep learning, how we measure this slope defines the three classical paradigms of Gradient Descent:
1. **Full-Batch Gradient Descent ($B = N$):** You survey all 1,000,000 pebbles on the entire mountain before taking a single step. The slope estimate is exact and deterministic, but evaluating every data sample per step is excruciatingly slow and computationally prohibitive for massive datasets.
2. **Stochastic Gradient Descent (SGD, $B = 1$):** You inspect a single randomly chosen pebble and leap in its downhill direction. It is lightning fast, but the gradient estimate is noisy and chaotic—bouncing erratically in random directions.
3. **Mini-Batch Gradient Descent ($1 < B < N$):** The gold standard! You sample a small squad of 32, 64, or 256 pebbles. This strikes the perfect balance: it saturates GPU parallel tensor cores with efficient matrix multiplications while retaining beneficial stochastic jitter that helps escape shallow saddle points and sharp, sub-optimal local minima.

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيّل أنك متسلق جبال تائه وسط ضباب كثيف يحجب عنك رؤية الوادي المنشود (نقطة النهاية الصغرى لدالة الخسارة $\mathcal{L}$). ورغم انعدام الرؤية الأفقية، تستطيع قدماك استشعار ميل الأرض تحتهما مباشرة: الاتجاه الصاعد بشدة يمثل متجه التدرج ($\nabla \mathcal{L}$)، بينما الاتجاه المنحدر بشدة يمثل سالب التدرج ($-\nabla \mathcal{L}$). وبأخذ خطوة في اتجاه الانحدار بمقدار معدل التعلم $\eta$، تقترب حتماً من قاع الوادي.

تحدد طريقة جمع إشارات الميل الأنماط الثلاثة للانحدار التدريجي:
1. **الانحدار التدريجي الإجمالي (Batch GD):** فحص جميع عينات البيانات في كامل المجموعة التدريبية قبل كل خطوة. يعطي اتجاهاً دقيقاً لكنه بطيء ومكلف حاسوبياً.
2. **الانحدار العشوائي الخالص (SGD):** أخذ خطوة سريعة بناءً على عينة واحدة عشوائية. سريع للغاية لكنه شديد التذبذب والضوضاء.
3. **انحدار الدفعات المصغرة (Mini-Batch GD):** المعيار الذهبي المعتمد عالمياً؛ حيث يتم تجميع 32 إلى 256 عينة معاً. يحقق هذا النمط أقصى استغلال للمعالجات الرسومية عبر العمليات المصفوفية الموجهة، مع الاحتفاظ بقدر مفيد من التذبذب العشوائي الذي يساعد النموذج على الهروب من الفخاخ الرياضية والحدود الحدباء السطحية.

---

## Beat 2: Formal Mathematical Anchor

The empirical risk minimization objective over a dataset of $N$ samples is defined as:

$$
\mathcal{L}(\boldsymbol{\theta}) = \frac{1}{N} \sum_{i=1}^N \ell(f(\mathbf{x}_i; \boldsymbol{\theta}), y_i)
$$

The parameter update rule at iteration $t$ using a mini-batch $\mathcal{B}_t \subset \{1, \dots, N\}$ of size $B = |\mathcal{B}_t|$:

$$
\mathbf{g}_t = \frac{1}{B} \sum_{i \in \mathcal{B}_t} \nabla_{\boldsymbol{\theta}} \ell(f(\mathbf{x}_i; \boldsymbol{\theta}_t), y_i), \quad \boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta \mathbf{g}_t
$$

Where:
* $\boldsymbol{\theta}_t \in \mathbb{R}^P$: The parameter vector containing all weights and biases at step $t$.
* $\eta > 0$: The learning rate hyperparameter governing step magnitude.
* $\mathcal{B}_t$: Uniform random mini-batch of indices sampled without replacement from the dataset.
* $\mathbf{g}_t$: Unbiased estimator of the true population gradient: $\mathbb{E}[\mathbf{g}_t] = \nabla \mathcal{L}(\boldsymbol{\theta}_t)$.
* $\text{Var}(\mathbf{g}_t) \propto \frac{\sigma^2}{B}$: Gradient variance, inversely proportional to mini-batch size $B$.

يمثل متجه $\mathbf{g}_t$ تقديراً غير متحيز لتدرج دالة الخسارة الحقيقية. وتتناسب ضوضاء التقدير (التباين $\text{Var}$) عكسياً مع حجم الدفعة المصغرة $B$. وتضمن هذه الضوضاء العشوائية عدم استقرار النموذج في نهايات صغرى حادة وضعيفة التعميم، دافعةً المعاملات نحو أودية منبسطة تتسم بمتانة عالية وقدرة فائقة على التعميم على بيانات الاختبار.

---

## Beat 3: Interactive Python Scratchpad

Implement the single-step parameter update function `sgd_step(params, grads, lr)` that performs in-place or vectorized gradient descent updates across parameter tensors.

:::python-challenge{id="py-gradient-descent"}
---
timeout_ms: 3000
test_cases:
  - input: "p = np.array([5.0, -3.0]); g = np.array([2.0, -1.0]); res = sgd_step(p, g, lr=0.1); print(f\"{res[0]:.1f},{res[1]:.1f}\")"
    expected: "4.8,-2.9"
  - input: "p = np.array([1.0]); g = np.array([0.0]); res = sgd_step(p, g, lr=0.01); print(f\"{res[0]:.1f}\")"
    expected: "1.0"
---
```python
import numpy as np

def sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:
    """
    Executes a single Gradient Descent parameter update step.
    
    Parameters
    ----------
    params : np.ndarray - Current parameter values
    grads : np.ndarray - Evaluated gradient vector with respect to params
    lr : float - Learning rate step size
    
    Returns
    -------
    np.ndarray - Updated parameter vector
    """
    # TODO: Implement parameter update theta_{t+1} = theta_t - lr * g_t
    pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

Why does training deep networks with mini-batch sizes like 32 or 128 often generalize better to unseen test data than training with full-batch gradient descent ($B=N$), even when both reach low training loss?

* [x] The stochastic gradient noise inherent in mini-batches acts as an implicit regularizer, preventing weights from settling into sharp, brittle local minima that overfit training data, and instead steering optimization into wide, flat valleys that generalize robustly.
* [ ] Full-batch gradient descent is mathematically unable to compute derivatives when datasets exceed 1,000 samples.
* [ ] Mini-batch gradient descent computes second-order Hessian inverses automatically.
* [ ] Larger batches cause floating-point registers to overflow during forward propagation.

> **Insight:** In high-dimensional non-convex optimization, "flat minima" are vastly preferable to "sharp minima" because slight shifts between training and test distributions do not cause catastrophic spikes in loss. Stochastic mini-batch noise naturally escapes sharp crevices.
