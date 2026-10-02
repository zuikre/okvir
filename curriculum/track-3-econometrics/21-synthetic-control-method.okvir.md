---
id: "synthetic-control-method"
version: "1.0.0"
title: "The Synthetic Control Method (Abadie et al.)"
track: "econometrics"
module: "mod-28"
estimated_minutes: 15
prerequisites: ["panel-data-fixed-effects", "least-squares-approximation"]
i18n:
  ar: "طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية"
---

# The Synthetic Control Method (Abadie et al.)

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

When transformative geopolitical events, historic economic reforms, or major regional policies occur, they almost always affect a single aggregate unit—a single nation, an entire state, or a metropolitan economy ($N=1$). In 1988, California passed Proposition 99, a groundbreaking tobacco control measure funded by an unprecedented 25-cent cigarette excise tax. In 1990, West Germany absorbed the former East Germany in a momentous reunification. In 1975, the Basque Country was plunged into decades of regional conflict. How can an empirical economist credibly evaluate the causal impact of such singular events?

Traditional micro-econometric tools immediately run aground. You cannot run a randomized trial on an entire state. You cannot compare California to Texas alone (their demographic compositions, cultural attitudes, and economic climates are worlds apart). Nor can you compare California to a simple, unweighted average of the other 49 US states (such a blunt national average dilutes California's distinct pre-existing trajectory and includes states completely dissimilar to California). 

The **Synthetic Control Method (SCM)**, pioneered by Alberto Abadie and co-authors (2003, 2010, 2015), solves this dilemma like a master perfumer blending an exact replica fragrance. Instead of searching for an elusive single "twin" state that does not exist in nature, SCM constructs an optimal **convex combination**—a bespoke, weighted cocktail—of unaffected "donor" states (for instance: $25\%$ Utah, $35\%$ Montana, and $40\%$ Colorado). The weights are chosen algorithmically so that the synthetic twin mirrors California's pre-1988 cigarette consumption trends and economic drivers (income per capita, age distribution, retail beer consumption) with uncanny precision.

Once the policy takes effect in 1988, the synthetic twin continues to simulate what would have happened to California had Proposition 99 never been passed. Any visible post-1988 divergence between the real California and its synthetic twin cleanly isolates the causal treatment effect. Crucially, SCM restricts donor weights to the **probability simplex**: weights must be strictly non-negative ($w_j \ge 0$) and sum to one ($\sum w_j = 1$). Unlike standard linear regression—which extrapolates wildly into impossible fictional combinations (such as predicting a counterfactual using $-3 \times \text{Texas} + 4 \times \text{New York}$)—the simplex constraints guarantee that the synthetic twin lies strictly inside the **convex hull** of real, observable donor units.

عندما تقع تحولات جيوسياسية كبرى أو تُقر إصلاحات اقتصادية جذرية، فإنها تؤثر في الغالب على وحدة كبرى واحدة—دولة بأكملها، أو ولاية منفردة، أو إقليم اقتصادي مستقل ($N=1$). في عام 1988، أقرت ولاية كاليفورنيا "المقترح 99"، وهو تشريع غير مسبوق لمكافحة التدخين موّلته ضريبة مبيعات بقيمة 25 سنتاً على علب السجائر. وفي عام 1990، اندمجت ألمانيا الغربية مع الشرقية في إعادة توحيد تاريخية. كيف يمكن لخبير القياس الاقتصادي تقييم الأثر السببي الصافي لمثل هذه السياسات التاريخية الاستثنائية؟

تعجز أدوات الاقتصاد القياسي الكلاسيكية عن الإجابة أمام هذه الحالات؛ فلا يمكن إجراء تجربة عشوائية على ولاية كاملة، ولا يمكن مقارنة كاليفورنيا بولاية تكساس وحدها لاختلاف العوامل الثقافية والديموغرافية والضريبية، كما لا يصح مقارنتها بمتوسط الولايات الـ 49 الأخرى؛ لأن ذلك المتوسط الساذج يطمس خصوصية كاليفورنيا ومسارها التاريخي الفريد.

تقدم **طريقة الشبيه الاصطناعي (Synthetic Control Method - SCM)** التي ابتكرها ألبيرتو أباديا وزملاؤه (Abadie et al.) حلاً عبقرياً يشبه عمل صانع عطور ماهر يركب عطراً مخصصاً مطابقاً للأصل. فبدلاً من البحث المستحيل عن ولاية "توأم" وحيدة في الطبيعة، تصنع الخوارزمية **تركيبة محدبة موزونة**—مزيجاً خاصاً—من مجموعة ولايات مانحة لم تتأثر بالسياسة (مثل: 25% يوتا، و35% مونتانا، و40% كولورادو). تُحدد هذه الأوزان حسابياً بحيث يتطابق هذا الشبيه الاصطناعي بدقة متناهية مع مسار كاليفورنيا التاريخي في استهلاك السجائر ومؤشراتها الاقتصادية والديموغرافية قبل عام 1988.

وعندما يبدأ تطبيق القانون في 1988، يستمر الشبيه الاصطناعي في تمثيل السيناريو المقابل للواقع (Counterfactual)—أي ما كان سيحدث لكاليفورنيا لولا القانون. ويمثل أي انفصال بين مسار كاليفورنيا الحقيقي وتوأمها الاصطناعي الأثر السببي الحقيقي للسياسة. والسر الجوهري لـ SCM هو تقييد الأوزان داخل **فضاء البساطة الاحتمالي (Simplex)**: فالأوزان موجبة دائماً ($w_j \ge 0$) ومجموعها يساوي واحداً تماماً ($\sum w_j = 1$). وهذا يمنع الانحدار الخطي العادي من السقوط في فخ الاستقراء الخيالي (كالاستقراء بأوزان سالبة وهمية مثل $-3 \times \text{تكساس}$)، مما يضمن بقاء التوأم الاصطناعي داخل الغلاف المحدب (Convex Hull) للبيانات الحقيقية.

:::simulation-widget{engine="canvas2d" component="SyntheticControlDonorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Consider a balanced panel of $J+1$ aggregate units observed across periods $t \in \{1, \dots, T\}$. Without loss of generality, let unit $j = 1$ denote the single treated unit, while units $j \in \{2, \dots, J+1\}$ constitute the untreated **donor pool**. The policy is introduced at time $T_0 + 1$, where $1 \le T_0 < T$.

Let $\mathbf{X}_1 \in \mathbb{R}^{K \times 1}$ denote a vector of $K$ pre-treatment characteristics and pre-intervention outcome values for the treated unit. Let $\mathbf{X}_0 \in \mathbb{R}^{K \times J}$ represent the corresponding matrix of the same $K$ predictors across all $J$ untreated donor units.

The Synthetic Control Method seeks an optimal donor weight vector $\mathbf{W}^* = [w_2^*, \dots, w_{J+1}^*]^T$ that minimizes the weighted distance between the treated unit and the synthetic twin:

$$
\min_{\mathbf{W}} \|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}\|_{\mathbf{V}}^2 = (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})^T \mathbf{V} (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})
$$

subject to the canonical **Simplex Constraints**:

$$
w_j \ge 0 \quad \forall j \in \{2, \dots, J+1\} \quad \text{and} \quad \sum_{j=2}^{J+1} w_j = 1
$$

where $\mathbf{V} \in \mathbb{R}^{K \times K}$ is a symmetric, positive semi-definite diagonal matrix reflecting the relative predictive importance assigned to each of the $K$ covariates.

The simplex constraints enforce two foundational econometric properties:
1. **Convex Hull Restriction ($w_j \ge 0$):** Precludes negative weights, preventing unconstrained OLS extrapolation outside the support of the donor data.
2. **Affine Invariance ($\sum w_j = 1$):** Ensures the synthetic unit is a genuine weighted average, safeguarding against scale distortions.

For each post-intervention period $t \in \{T_0 + 1, \dots, T\}$, the estimated causal treatment effect on the treated unit is:

$$
\hat{\tau}_{1t} = Y_{1t} - \hat{Y}_{1t}^{\text{synthetic}} = Y_{1t} - \sum_{j=2}^{J+1} w_j^* Y_{jt}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $j = 1$: The single aggregate unit receiving policy intervention (e.g., California, West Germany).
* $j \in \{2, \dots, J+1\}$: Untreated donor pool of comparable units unexposed to the intervention.
* $T_0$: Number of pre-intervention time periods observed prior to policy enactment.
* $\mathbf{X}_1 \in \mathbb{R}^{K \times 1}$: Vector of pre-treatment characteristics and lagged outcome variables for the treated unit.
* $\mathbf{X}_0 \in \mathbb{R}^{K \times J}$: Matrix assembling the same pre-treatment characteristics for all $J$ donor units.
* $\mathbf{W}^* \in \Delta^J$: Optimal weight vector restricted to the probability simplex ($\sum w_j = 1$, $w_j \ge 0$).
* $\mathbf{V}$: Positive semi-definite weighting matrix tuning the relative importance of predictor covariates.
* $\hat{Y}_{1t}^{\text{synthetic}} = \sum_{j=2}^{J+1} w_j^* Y_{jt}$: Synthetically constructed counterfactual outcome path.
* $\hat{\tau}_{1t}$: Time-varying causal treatment effect estimated for period $t > T_0$.

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
    X1: np.ndarray,
    X0: np.ndarray,
    lr: float = 0.05,
    max_iter: int = 500
) -> dict[str, object]:
    """
    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.
    
    Parameters
    ----------
    X1 : np.ndarray of shape (K,)
        Predictor characteristics of the treated unit.
    X0 : np.ndarray of shape (K, J)
        Predictor characteristics of the J donor units.
    lr : float
        Learning rate for gradient steps.
    max_iter : int
        Maximum iterations.
        
    Returns
    -------
    dict with keys:
        'w': Optimal non-negative weight vector summing to 1.
        'loss': Final squared Euclidean distance ||X1 - X0 w||^2.
    """
    K, J = X0.shape
    # Step 1: Initialize weights uniformly on the simplex
    w = np.full(J, 1.0 / J)
    
    def project_simplex(v: np.ndarray) -> np.ndarray:
        """Projects a vector v onto the probability simplex: sum(w) = 1, w >= 0."""
        u = np.sort(v)[::-1]
        cssv = np.cumsum(u)
        rho = np.nonzero(u * np.arange(1, J + 1) > (cssv - 1))[0][-1]
        theta = (cssv[rho] - 1.0) / (rho + 1.0)
        return np.maximum(v - theta, 0.0)

    # Step 2: Projected gradient descent loop
    for _ in range(max_iter):
        diff = X1 - X0 @ w
        grad = -X0.T @ diff
        # Gradient step followed by Euclidean projection onto simplex
        w = project_simplex(w - lr * grad)
        
    # Step 3: Compute final pre-treatment fit loss
    loss = float(np.sum((X1 - X0 @ w) ** 2))
    return {
        "w": w,
        "loss": loss
    }
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
