---
id: "synthetic-control-method"
version: "1.0.0"
title: "The Synthetic Control Method (Abadie et al.)"
track: "econometrics"
module: "mod-28"
estimated_minutes: 15
prerequisites: ["panel-data-fixed-effects", "orthogonal-projections"]
i18n:
  ar: "طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية"
---

# The Synthetic Control Method (Abadie et al.)

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

In November 1988, California voters passed **Proposition 99**, an aggressive anti-tobacco initiative that increased cigarette excise taxes by 25 cents per pack and funded statewide anti-smoking campaigns.

Public health researchers immediately wanted to know: *did Proposition 99 cause a drop in cigarette consumption, and by how much?*

Standard comparative methods failed:
* You cannot use a randomized trial because you cannot randomly assign statewide tax hikes to California.
* You cannot just compare California before and after 1988 because smoking was already trending downward nationwide.
* You cannot just pick a single control state like Texas or New York because California has a unique economy, climate, and demographic makeup. No other single state is California's twin!

In 2003, Alberto Abadie, Alexis Diamond, and Jens Hainmueller created an extraordinary solution: the **Synthetic Control Method (SCM)**.

They asked: *what if no single state is California's twin, but a carefully weighted RECIPE of states is?*
By finding optimal non-negative weights that sum to 100%, SCM cooks up a **Synthetic California**:
$$\text{Synthetic California} = 0.25(\text{Utah}) + 0.35(\text{Montana}) + 0.15(\text{Nevada}) + 0.25(\text{Connecticut})$$
Throughout the 1970s and 1980s, this synthetic recipe tracked actual California cigarette sales with uncanny, millimeter precision!

Then 1988 arrives. Real California passes Proposition 99, and its cigarette sales plunge downward. Synthetic California (which never had the tax) continues along the old trend. The growing gap between real California and synthetic California is the pure causal effect of the policy!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Synthetic Control (SCM)** | The digital twin: a weighted blend of untreated peers that mimics the treated unit. |
| **Donor Pool** | The pantry of ingredients: all candidate control states that never implemented the policy. |
| **Convex Combination** | Honest blending: weights are non-negative and sum to 1.0 (no crazy extrapolation). |
| **Pre-Treatment Fit** | The mirror test: how tightly the synthetic twin tracked the treated unit before the law passed. |
| **Treatment Trajectory** | The divergent path: the post-law gap between the real unit and its synthetic twin. |

```text
    THE SYNTHETIC CONTROL DIVERGENCE:

    Cigarette Sales (Packs per Capita)
      ^
      |    Actual California  :    Synthetic California (The Untreated Twin)
      |    - - - - - - - - -  :    =========================================
  120 |      *               :
      |       \  *           :       *
  100 |        \   \ *       :      / \  *               * (Synthetic California Trend)
      |         \     \      :     /   \   \  *        *
   80 |          *     *     :    *     *    *   *   *
      |                 \    :                      \
   60 |                  \   :                       * Actual California (Prop 99 Plunge!)
      |                   \  :                        \
   40 0--------------------+---------------------------*---------------------> Year
                         1988 (Prop 99 Passed)
```

### الحدس والقصة الواقعية

في نوفمبر 1988، أقر الناخبون في ولاية كاليفورنيا الأمريكية **المقترح 99 (Proposition 99)**؛ وهو قانون صارم لمكافحة التبغ فرض ضريبة باهظة على علب السجائر وموّل حملات توعية عامة واسعة النطاق.

أراد مسؤولو الصحة العامة معرفة النتيجة الحتمية: *هل نجح المقترح في خفض استهلاك السجائر فعليًا، وبأي مقدار؟*

فشلت كل المناهج الإحصائية المعتادة:
* لا يمكنك إجراء تجربة عشوائية على ولاية عملاقة ككاليفورنيا.
* لا يمكنك الاكتفاء بمقارنة كاليفورنيا قبل وبعد 1988 لأن التدخين كان ينخفض تدريجيًا على مستوى البلاد بأسرها.
* لا يمكنك اختيار ولاية واحدة كضابط (مثل تكساس أو نيويورك)؛ فلا توجد ولاية واحدة تشبه كاليفورنيا في اقتصادها ومناخها وسكانها.

في عام 2003، ابتكر ألبرتو أباديا وزملاؤه حلاً عبقريًا مذهلاً: **منهج الضابط الاصطناعي (Synthetic Control Method - SCM)**.

طرح أباديا تساؤلاً ذكيًا: *إذا كانت كاليفورنيا لا تملك توأمًا واحدًا، فماذا لو صنعنا لها توأمًا عبر وصفة موزونة من عدة ولايات؟*
قام الباحثون بحساب أوزان رياضية موجبة مجموعها 100% لبناء **كاليفورنيا اصطناعية**:
$$\text{كاليفورنيا الاصطناعية} = 25\%(\text{يوتا}) + 35\%(\text{مونتانا}) + 15\%(\text{نيفادا}) + 25\%(\text{كونيتيكت})$$
طوال عقدي السبعينيات والثمانينيات، تطابقت مبيعات السجائر في كاليفورنيا الاصطناعية مع كاليفورنيا الحقيقية بدقة مذهلة!

وعندما حل عام 1988 وطُبق القانون، انحدر استهلاك السجائر في كاليفورنيا الحقيقية انحدارًا حادًا، بينما واصلت كاليفورنيا الاصطناعية مسارها الطبيعي. والفجوة المتسعة بين الخطين بعد 1988 هي الأثر السببي الصافي للقانون!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **الضابط الاصطناعي (SCM)** | التوأم الرقمي: مزيج موزون من وحدات لم تخضع للمعالجة يحاكي سلوك الوحدة المعالجة. |
| **حوض المانحين (Donor Pool)** | سلة الخيارات: مجموعة الولايات التي لم تطبق القانون مطلقًا لتشكيل التوأم منها. |
| **التركيبة المحدبة (Convex)** | الخلط النزيه: أوزان موجبة مجموعها 1.0 لتفادي التخمين الخارجي غير الواقعي. |
| **التطابق المسبق** | اختبار المرآة: مدى دقة تطابق التوأم الاصطناعي مع الوحدة الحقيقية قبل صدور القانون. |
| **فجوة المسار السببي** | التباعد بعد القرار: المسافة الفاصلة بين الواقع الحقيقي وتوأمه الاصطناعي بعد التدخل. |

:::simulation-widget{engine="canvas2d" component="SyntheticControlDonorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let unit $1$ be the treated unit, and units $j = 2, \dots, J+1$ be the donor pool of unexposed control units.

Let pre-intervention period be $t = 1, \dots, T_0$, and post-intervention period be $t = T_0 + 1, \dots, T$.

The synthetic control is defined by a weight vector $\mathbf{W} = (w_2, \dots, w_{J+1})^T$ constrained to the unit simplex:

$$
\mathcal{W} = \left\{ \mathbf{W} \in \mathbb{R}^J \;\middle|\; w_j \ge 0, \quad \sum_{j=2}^{J+1} w_j = 1 \right\}
$$

The optimal weights minimize the pre-intervention predictor distance:

$$
\min_{\mathbf{W} \in \mathcal{W}} \|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}\|_V^2 = (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})^T \mathbf{V} (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})
$$

where $\mathbf{V}$ is a positive semi-definite predictor importance weighting matrix.

The treatment effect trajectory for any post-intervention period $t > T_0$ is:

$$
\hat{\tau}_{1t} = Y_{1t} - \sum_{j=2}^{J+1} w_j^* Y_{jt}
$$

### Why the Math Works Step-by-Step

1. **Why constrain weights to the unit simplex ($w_j \ge 0, \sum w_j = 1$)?**
   Non-negative weights prevent **extrapolation**. In standard linear regression, coefficients can be negative or giant numbers, predicting synthetic outcomes outside the realm of physical possibility. The simplex constraint guarantees pure interpolation within the support of the donor pool!
2. **Sparsity of the Solution:**
   Because the objective is optimized over a simplex polytope, the optimal weight vector $\mathbf{W}^*$ is naturally sparse: only a small handful of donor units receive positive weights, making the synthetic twin fully transparent and interpretable.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{X}_1 \in \mathbb{R}^{K \times 1}$: Pre-intervention characteristics vector of treated unit.
* $\mathbf{X}_0 \in \mathbb{R}^{K \times J}$: Pre-intervention characteristics matrix of donor pool.
* $\mathbf{W}^* \in \mathcal{W}$: Optimal simplex weight vector cooking up the synthetic twin.
* $\hat{\tau}_{1t}$: Estimated causal gap at post-intervention time $t$.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\mathcal{W}$ | فضاء البساطة المحدبة (Simplex) | قيد رياضي يفرض أوزانًا موجبة مجموعها 1 لضمان المزج المنطقي الواقعي. |
| $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}$ | فجوة التطابق المسبق | الفارق بين صفات الوحدة الحقيقية وتوأمها الاصطناعي خلال سنوات ما قبل القرار. |
| $\mathbf{V}$ | مصفوفة أهمية الميزات | مصفوفة ترجيحية تعطي وزنًا أكبر للخصائص الأكثر قدرة على التنبؤ بالمستقبل. |
| $\hat{\tau}_{1t}$ | الفجوة السببية التراكمية | الأثر السببي الصافي المقاس كفارق بين مسار الواقع ومسار التوأم الاصطناعي. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the Synthetic Control simplex-constrained optimization routine using Projected Gradient Descent in NumPy. You will:
1. Initialize a uniform weight vector $\mathbf{w}_0 = [\frac{1}{J}, \dots, \frac{1}{J}]^T$.
2. In each iteration, evaluate the objective function gradient: $\nabla_{\mathbf{w}} f(\mathbf{w}) = -\mathbf{X}_0^T (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{w})$.
3. Take a gradient descent step: $\mathbf{w}_{\text{next}} = \mathbf{w} - \eta \nabla f(\mathbf{w})$.
4. Project the updated vector back onto the probability simplex ($\sum w_j = 1, w_j \ge 0$) using an efficient sorting projection algorithm.
5. Return the optimal weights and the final squared Euclidean loss $\|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{w}^*\|_2^2$.

:::python-challenge{id="py-synthetic-control-method"}
---
timeout_ms: 3000
test_cases:
  - input: "X1 = np.array([10.0, 20.0]); X0 = np.array([[10.0, 0.0], [20.0, 0.0]]); res = fit_synthetic_control_simplex(X1, X0, max_iter=200); f\"{res['w'][0]:.1f}, {res['loss']:.2f}\""
    expected: "1.0, 0.00"
  - input: "X1 = np.array([15.0, 15.0]); X0 = np.array([[10.0, 20.0], [10.0, 20.0]]); res = fit_synthetic_control_simplex(X1, X0, max_iter=200); f\"{res['w'][0]:.2f}, {res['w'][1]:.2f}\""
    expected: "0.50, 0.50"
---
```python
import numpy as np

def fit_synthetic_control_simplex(
    y_treated_pre: np.ndarray,
    Y_donor_pre: np.ndarray,
    max_iter: int = 1000,
    lr: float = 0.01
) -> np.ndarray:
    """
    Solves for non-negative Synthetic Control weights summing to 1 (projected gradient descent).

    Parameters
    ----------
    y_treated_pre : np.ndarray of shape (T0,)
        Pre-treatment outcome trajectory of treated unit.
    Y_donor_pre : np.ndarray of shape (T0, J)
        Pre-treatment trajectories of J donor control units.

    Returns
    -------
    np.ndarray of shape (J,) : Simplex weights w.
    """
    t0, J = Y_donor_pre.shape
    # Initialize weights uniformly on the simplex
    w = np.full(J, 1.0 / J)

    # Projected gradient descent to minimize ||y - Y w||^2
    for _ in range(max_iter):
        error = y_treated_pre - Y_donor_pre @ w
        grad = -2.0 * Y_donor_pre.T @ error

        # Step
        w = w - lr * grad
        # Project onto non-negative orthant
        w = np.maximum(w, 0.0)
        # Normalize to sum to 1
        s = np.sum(w)
        w = w / s if s > 0 else np.full(J, 1.0 / J)

    return w
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

In their landmark 2015 study, Abadie, Diamond, and Hainmueller evaluated the economic consequence of the 1990 German Reunification on West Germany's per capita GDP using the Synthetic Control Method. 

A junior economic researcher proposes including East Germany, Austria, and Poland in the donor pool to match West Germany's industrial structure and regional proximity.

Why does including East Germany in the donor pool fatally violate the foundational causal assumptions of the Synthetic Control Method?

* [ ] East Germany's geographical surface area is smaller than West Germany's, violating dimensional proportionality axioms.
  *مساحة ألمانيا الشرقية أصغر من الغربية مما يخل بالتناسب البعدي.*
  > **Why this is incorrect:** Land area is irrelevant unless directly modeled; SCM matches economic predictor matrices.
  > **لماذا هذا الخيار خاطئ:** المساحة الجغرافية لا تشترط التطابق؛ فالمطابقة تتم على الخصائص الاقتصادية.
* [x] East Germany was directly, fundamentally transformed by the reunification treatment itself. Including units directly treated or heavily contaminated by policy spillovers in the donor pool violates the Stable Unit Treatment Value Assumption (SUTVA), severely contaminating the counterfactual trajectory.
  *ألمانيا الشرقية كانت طرفاً مباشراً وتأثرت كلياً بصدمة إعادة التوحيد نفسها؛ وإدراج وحدات خاضعة للمعالجة في حوض المانحين يخرق فرضية ثبات قيمة المعالجة (SUTVA) ويلوث المسار المقابل للواقع تماماً.*
  > **Why this is correct:** Donors must be strictly unexposed to the treatment and free from spillover contamination. If a donor is affected by the treatment, the synthetic counterfactual moves with the treatment, masking or distorting the true causal effect.
  > **لماذا هذا الخيار صحيح:** يشترط في الوحدات المانحة أن تكون محايدة وخالية تماماً من صدمة المعالجة أو آثارها غير المباشرة (Spillover). وإذا تأثر المانح بالسياسة، تشوه المسار المقابل للواقع وفقدت الدراسة مصداقيتها.
* [ ] SCM requires all donor units to possess strictly higher GDP per capita than the treated unit.
  *تشترط الخوارزمية أن تمتلك جميع الوحدات المانحة ناتجاً محلياً أعلى من الوحدة المعالجة.*
  > **Why this is incorrect:** To form a valid convex combination, the treated unit must lie inside the convex hull (some donors higher, some lower).
  > **لماذا هذا الخيار خاطئ:** لتكوين مزيج محدب، يجب أن يقع المستهدف داخل النطاق (بعض المانحين أعلى وبعضهم أدنى).
* [ ] Former Eastern Bloc nations cause the donor matrix $\mathbf{X}_0^T \mathbf{X}_0$ to become mathematically non-invertible.
  *دول الكتلة الشرقية تجعل مصفوفة المانحين غير قابلة للقَلْب الحسابي.*
  > **Why this is incorrect:** SCM solves a constrained convex optimization over weights, not an unconstrained OLS matrix inversion.
  > **لماذا هذا الخيار خاطئ:** لا تعتمد SCM على قلب المصفوفات المباشر، بل على الاستمثال المحدب المقيد.
