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

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

Imagine you are a hiker stranded high on an unfamiliar, rugged mountain range completely enveloped in dense, blinding fog. You cannot see two feet in front of your face, and you have no map showing where the lowest valley (the global minimum of the loss function $\mathcal{L}$) lies. Yet, beneath your boots, you can feel the physical tilt of the rock: you can instantly tell which direction leads steepest uphill ($\nabla \mathcal{L}$), and which direction leads steepest downhill ($-\nabla \mathcal{L}$).

If you take a cautious step in the direction of steepest descent, scaled by your stride length $\eta$ (the learning rate), you are mathematically guaranteed to reach lower ground locally: $\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta \mathbf{g}_t$. Repeat this process thousands of times, and you will eventually descend into a deep basin.

In machine learning, how we measure this downhill slope defines the three classical optimization paradigms:
1. **Full-Batch Gradient Descent ($B = N$):** You survey all 1,000,000 pebbles on the entire mountain before taking a single step. The slope measurement is completely exact and deterministic, but processing the entire dataset for every single parameter update is computationally crushing and memory-prohibitive for large-scale modern datasets.
2. **Stochastic Gradient Descent (SGD, $B = 1$):** You inspect a single randomly selected pebble and immediately leap in its downhill direction. Each step is lightning fast, but the gradient estimate is noisy and erratic—the optimizer bounces wildly in jagged, random zigzags across the landscape.
3. **Mini-Batch Gradient Descent ($1 < B < N$):** The gold standard of modern deep learning. You sample a squad of 32, 64, or 256 pebbles. This strikes the ideal sweet spot: it saturates GPU parallel tensor cores with efficient matrix multiplications, while preserving just enough stochastic gradient noise to physically shake the parameters out of narrow, sharp local crevices into broad, flat valleys that generalize robustly to unseen data.

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيّل أنك متسلق جبال تائه على قمة سلسلة جبلية وعرة يغمرها ضباب كثيف يحجب الرؤية تماماً. لا يمكنك رؤية الوادي المنشود في الأسفل (نقطة النهاية الصغرى لدالة الخسارة $\mathcal{L}$). ورغم انعدام الرؤية الأفقية، تستشعر قدماك بدقة ميل الصخور تحتهما مباشرة: الاتجاه الصاعد بشدة يمثل متجه التدرج الرياضي ($\nabla \mathcal{L}$)، بينما الاتجاه المعاكس المنحدر بشدة يمثل سالب التدرج ($-\nabla \mathcal{L}$).

بأخذ خطوة حذرة في اتجاه الانحدار بمقدار محدد (معدل التعلم $\eta$)، تقترب حتماً وبثبات نحو أرض أكثر انخفاضاً: $\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta \mathbf{g}_t$. وبتكرار هذه العملية آلاف المرات، ينحدر النموذج تدريجياً نحو قاع حوض الخسارة.

تتفرع خوارزمية الانحدار التدريجي إلى ثلاثة أنماط رئيسية بحسب حجم البيانات المستخدمة لتقدير الميل:
1. **الانحدار التدريجي بالدفعة الكاملة (Full-Batch GD):** فحص كامل بيانات التدريب الـ $N$ قبل اتخاذ خطوة واحدة. يوفر تقديراً دقيقاً للاتجاه، لكنه بطيء ومكلف للغاية ولا يتسع في ذاكرة المعالجات الرسومية.
2. **الانحدار العشوائي الخالص (SGD):** اتخاذ خطوة سريعة بناءً على عينة عشوائية واحدة فقط ($B=1$). سريع الخطوات لكنه شديد التخبط والاضطراب بسبب التباين الإحصائي الهائل.
3. **انحدار الدفعات المصغرة (Mini-Batch GD):** المعيار الذهبي المعتمد عالمياً؛ حيث يتم تجميع 32 إلى 256 عينة معاً. يحقق هذا النمط أقصى استغلال للتوازي الحاسوبي في معالجات الرسوميات (GPUs)، مع الاحتفاظ بقدر مدروس من الضوضاء العشوائية المفيدة التي تهز النموذج وتخرجه من الفخاخ الضيقة لتستقر به في أودية منبسطة تتسم بقدرة تعميم فائقة.

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

The empirical risk minimization objective over a dataset of $N$ observed training samples is defined as:

$$
\mathcal{L}(\boldsymbol{\theta}) = \frac{1}{N} \sum_{i=1}^N \ell(f(\mathbf{x}_i; \boldsymbol{\theta}), y_i)
$$

The parameter update rule at iteration $t$ using a mini-batch $\mathcal{B}_t \subset \{1, \dots, N\}$ of size $B = |\mathcal{B}_t|$:

$$
\mathbf{g}_t = \frac{1}{B} \sum_{i \in \mathcal{B}_t} \nabla_{\boldsymbol{\theta}} \ell(f(\mathbf{x}_i; \boldsymbol{\theta}_t), y_i), \quad \boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \eta \mathbf{g}_t
$$

The stochastic mini-batch gradient $\mathbf{g}_t$ is an unbiased estimator of the true population gradient, with variance inversely proportional to the mini-batch size $B$:

$$
\mathbb{E}_{\mathcal{B}_t}[\mathbf{g}_t] = \nabla \mathcal{L}(\boldsymbol{\theta}_t), \quad \text{Var}(\mathbf{g}_t) = \frac{\sigma^2}{B} \left(\frac{N - B}{N - 1}\right) \propto \frac{1}{B}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\boldsymbol{\theta}_t \in \mathbb{R}^P$: The parameter vector of all learnable weights and biases at optimization step $t$.
* $\eta > 0$: The learning rate hyperparameter governing update step magnitude.
* $\mathcal{B}_t$: Random mini-batch subset sampled uniformly without replacement from $\{1, \dots, N\}$.
* $B = |\mathcal{B}_t|$: Mini-batch size (e.g., $32, 64, 128$).
* $\mathbf{g}_t \in \mathbb{R}^P$: The empirical mini-batch gradient vector.
* $\text{Var}(\mathbf{g}_t)$: The variance of the gradient estimator, which vanishes as $B \to N$ and peaks when $B = 1$.

يمثل متجه التدرج $\mathbf{g}_t$ تقديراً إحصائياً غير متحيز للميل الحقيقي لدالة الخسارة. تتناسب ضوضاء التقدير (التباين $\text{Var}$) عكسياً مع حجم الدفعة $B$. وتعمل هذه الضوضاء العشوائية كمنظم ضمني (Implicit Regularizer)، مما يمنع المعاملات من الوقوف في نهايات صغرى حادة وضعيفة التعميم، ويوجهها نحو أودية واسعة ومستقرة.

---

## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي

Implement the single-step parameter update function `sgd_step(params, grads, lr)` that performs vectorized gradient descent updates across parameter tensors.

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
    # Step 1: Scale the gradient direction vector by the learning rate stride
    step = lr * grads
    
    # Step 2: Update parameters by stepping in the direction of steepest descent
    updated_params = params - step
    
    return updated_params
```
:::

---

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

### Transfer Question / سؤال نقل الأثر المعرفي

Why does training deep neural networks with moderate mini-batch sizes (e.g., $B=32$ or $B=128$) consistently generalize better to unseen test data than training with full-batch gradient descent ($B=N$), even when both converge to zero training loss?

* [x] The stochastic gradient noise inherent in mini-batch sampling acts as an implicit regularizer, kicking the optimizer out of sharp, brittle local minima that overfit the training set, and biasing convergence toward wide, flat loss valleys that are robust to distributional shifts.
* [ ] Full-batch gradient descent is mathematically unable to compute derivatives when datasets exceed 1,000 samples.
* [ ] Mini-batch gradient descent computes second-order Hessian inverses automatically.
* [ ] Larger batches cause floating-point registers to overflow during forward propagation.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In non-convex loss landscapes, not all minima are created equal. A "sharp minimum" is a narrow crevice with high curvature: while training loss is zero at the bottom, a tiny shift in data distribution between training and testing causes the test loss to skyrocket up the steep walls. In contrast, a "flat minimum" has low curvature across a broad basin: test samples with slightly different feature values remain deep inside the low-loss basin. Full-batch gradient descent follows deterministic gradient trajectories directly into the nearest sharp crevices. In contrast, mini-batch gradient descent introduces stochastic noise ($\text{Cov}(\mathbf{g}_t) \propto \frac{1}{B}\boldsymbol{\Sigma}$) that continually perturbs the weights; this noise easily escapes sharp, fragile minima because the barriers are narrow, while remaining trapped in wide, flat minima where the basin is spacious and stable.

**Why the distractors are incorrect:**
1. *Full-batch gradient descent is mathematically unable...*: False. Full-batch gradient descent is mathematically well-defined for any finite dataset size $N$.
2. *Mini-batch gradient descent computes second-order Hessian inverses...*: False. Mini-batch gradient descent is strictly a first-order method; it never inverts the $P \times P$ Hessian matrix.
3. *Larger batches cause floating-point registers to overflow...*: False. Batch reductions use standard summations or averages that do not overflow registers under normal floating-point scaling.

*الشرح باللغة العربية:*
في تضاريس دوال الخسارة غير المحدبة، تفضل خوارزميات التعلم "النهايات الصغرى المنبسطة" (Flat Minima) على "النهايات الصغرى الحادة" (Sharp Minima). في النهايات الحادة، يؤدي أي انزياح طفيف في بيانات الاختبار إلى قفزة كارثية في الخسارة، بينما تضمن الأودية المنبسطة بقاء الخسارة منخفضة حتى مع تغير التوزيع. ينزلق الانحدار بالدفعة الكاملة إلى أقرب شق حاد، بينما توفر الضوضاء العشوائية في الدفعات المصغرة ($B=32$) اهتزازاً مستمراً يطرد المعاملات من الشقوق الضيقة ويدفعها للاستقرار في أودية عريضة تحقق أعلى درجات التعميم.
