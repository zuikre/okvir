---
id: "ols-residual-geometry"
version: "1.0.0"
title: "Bivariate OLS & The Geometry of Orthogonal Residuals"
track: "econometrics"
module: "mod-18"
estimated_minutes: 15
prerequisites: ["orthogonal-projections", "numpy-vectorization"]
i18n:
  ar: "الانحدار الخطي البسيط وهندسة البواقي المتعامدة"
---

# Bivariate OLS & The Geometry of Orthogonal Residuals

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose you are looking for an apartment in a bustling city. You browse listings and quickly notice a clear pattern: larger apartments tend to rent for more money. A 400 sq ft studio rents for $1,400, an 800 sq ft one-bedroom rents for $2,200, and a 1,200 sq ft two-bedroom rents for $3,100. You want a fair rule of thumb to estimate what any apartment should cost based on its square footage. So, you plot the apartments on a grid and draw a straight line through the cloud of points.

Almost no apartment lands perfectly on your line. An 800 sq ft apartment might actually rent for $2,100, while your straight line predicts $2,200. That vertical gap—how much your model missed by (-$100)—is the **residual**.

How do we pick the 'best' possible line out of infinite options? Ordinary Least Squares (OLS) squares every vertical gap and finds the line that makes their total sum as small as possible. But why does this simple balancing act work so magically? Because OLS forces the leftovers (the residuals) to be strictly independent of apartment size—they share zero linear pattern. Geometrically, your prediction line acts like a shadow cast on the floor, and the residual errors stand straight up at a 90-degree angle, completely perpendicular to the features you observed.

Crucially, we must untangle what this line actually tells us. A predictive machine learning model asks: *'If an apartment has 1,000 sq ft, what is our best forecast of its rent?'* That is passive observation—spotting where the shadow falls on the lawn. Econometrics asks a fundamentally causal question: *'If a landlord knocks down a wall and expands an apartment by 200 sq ft, how much will its rent actually increase?'* While OLS finds the optimal linear forecast inside your sample, it cannot turn correlation into causation if unobserved factors (like proximity to subway stations or luxury finishes) drive both size and price.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Dependent Variable ($y$)** | The outcome you want to explain or predict (e.g., monthly apartment rent). |
| **Independent Regressor ($X$)** | The input feature used to make the prediction (e.g., square footage). |
| **Fitted Value ($\hat{y}$)** | The model's best guess along the regression line (e.g., predicted rent of $2,200). |
| **Residual ($e = y - \hat{y}$)** | How much our prediction missed by (the vertical gap between reality and the line). |
| **Sum of Squared Errors (SSE)** | Total penalty: squaring each gap so positive and negative errors do not cancel out. |
| **Orthogonality ($90^\circ$)** | Pure independence: the residual errors have zero linear correlation with the regressors. |

```text
  Rent ($)
    ^
    |                                   * Actual ($3,100)
    |                                 / |
    |                     * ($2,100) /  |  Residual e3 (+100)
    |                     |         /   |
3000|                     | e2     /----+--- Fitted y_hat
    |                     v (-100)/
    |                 *---------/
2000|               / |
    |      * ($1,500)/| e1 (+100)
    |      |        / |
1000|      +-------/  +------------------------------>
    |             /                             Square Footage (sq ft)
    0-----+------+------+------+------+------+
          400   600    800    1000   1200
```

### الحدس والقصة الواقعية

تخيل أنك تبحث عن شقة للإيجار في مدينة حيوية. تتصفح الإعلانات وتلاحظ نمطًا بديهيًا: الشقق الأكبر مساحة تكون أغلى إيجارًا. شقة استوديو بمساحة 400 قدم مربع تؤجر بـ 1,400 دولار، وشقة بمساحة 800 قدم مربع تؤجر بـ 2,200 دولار، وشقة بمساحة 1,200 قدم مربع تؤجر بـ 3,100 دولار. ترغب في قاعدة إرشادية عادلة لتقدير الإيجار المتوقع لأي مساحة، فتضع الشقق على رسم بياني وترسم خطًا مستقيمًا يمر عبر سحابة النقاط.

في الواقع، قلما تقع شقة على الخط تمامًا. فشقة مساحتها 800 قدم مربع قد تؤجر فعليًا بـ 2,100 دولار بينما يتوقع خطك 2,200 دولار. هذه الفجوة الرأسية—مقدار خطأ التنبؤ (-100 دولار)—تسمى **الباقي (Residual)**.

كيف نختار "أفضل" خط ممكن من بين عدد لا نهائي من الخطوط؟ تقوم طريقة المربعات الصغرى العادية (OLS) بتربيع كل خطأ رأسي والبحث عن الخط الذي يجعل مجموع هذه المربعات أصغر ما يمكن. والسر الهندسي البديع هو أن OLS تجبر بواقي الأخطاء على أن تكون متعامدة تمامًا ($90^\circ$) مع مساحة الشقة، أي خالية من أي ترابط خطي معها.

والأهم هو التمييز الحاسم بين التنبؤ والسببية: يسأل علم البيانات التنبؤي: *"إذا كانت مساحة الشقة 1000 قدم مربع، فما هو أفضل تخمين لإيجارها؟"* هذا مجرد رصد سلبي لموضع الظل. أما القياس الاقتصادي فيسأل سؤالاً سببيًا: *"لو قام المالك بتوسيع الشقة بمقدار 200 قدم مربع، فكم سيزداد الإيجار فعليًا؟"* يضمن OLS أدق تنبؤ داخل العينة، لكنه يعجز عن إثبات السببية إذا كانت هناك عوامل خفية غير مقاسة (كموقع الشقة وقربها من المترو) تؤثر على المساحة والسعر معًا.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **المتغير التابع ($y$)** | النتيجة التي نريد تفسيرها أو توقعها (مثل إيجار الشقة الشهري). |
| **المتغير المستقل ($X$)** | الميزة أو المعلومة المستخدمة للتخمين (مثل المساحة بالقدم المربع). |
| **القيمة المقدرة ($\hat{y}$)** | التخمين الأفضل للنموذج الواقع على خط الانحدار مباشرة. |
| **الباقي / الخطأ ($e = y - \hat{y}$)** | مقدار خطأ التنبؤ (المسافة الرأسية بين الواقع وخط النموذج). |
| **مجموع مربعات الأخطاء (SSE)** | إجمالي العقوبة: تربيع الفروق حتى لا تلغي الأخطاء السالبة نظيرتها الموجبة. |
| **التعامد الهندسـي ($90^\circ$)** | الاستقلالية التامة: بواقي الأخطاء لا ترتبط خطيًا بأي شكل مع المتغير المستقل. |

:::simulation-widget{engine="canvas2d" component="LinearRegressionResiduals"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The population data generating process across $N$ observations is represented in matrix notation as:

$$
\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}
$$

The empirical sum of squared residuals objective function minimizes the squared Euclidean length of the error vector:

$$
S(\boldsymbol{\beta}) = \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T (\mathbf{y} - \mathbf{X}\boldsymbol{\beta}) = \mathbf{y}^T\mathbf{y} - 2\boldsymbol{\beta}^T \mathbf{X}^T \mathbf{y} + \boldsymbol{\beta}^T \mathbf{X}^T \mathbf{X} \boldsymbol{\beta}
$$

### Why the Math Works Step-by-Step

1. **Why do we square the errors instead of adding raw errors?**
   If our line overshoots one apartment by +$100 and undershoots another by -$100, simply adding them yields $(+100) + (-100) = 0$. The raw sum would declare a terrible line to be 'perfect'! Squaring eliminates negative signs so every mistake counts positively.
2. **Why square instead of using absolute values $|e_i|$?**
   Absolute value graphs have a sharp, non-differentiable 'V' point at zero, making closed-form algebra difficult. Squaring produces a smooth, parabolic bowl with a single global minimum that can be solved directly with simple derivatives (setting the gradient to zero). Furthermore, squaring penalizes massive blunders quadratically (missing by 10 costs 100; missing by 50 costs 2,500).
3. **Why do the Normal Equations enforce $\mathbf{X}^T \mathbf{e} = \mathbf{0}$?**
   At the lowest point of the bowl, the slope (derivative) is zero. Differentiating the squared error with respect to $\boldsymbol{\beta}$ yields $-2\mathbf{X}^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta}) = \mathbf{0}$, which simplifies directly to $\mathbf{X}^T \mathbf{e} = \mathbf{0}$. This proves that the sample residuals are mathematically orthogonal ($90^\circ$) to every regressor.

### Mathematical Derivation of the Normal Equations

To find the minimizer $\hat{\boldsymbol{\beta}}$, we compute the matrix derivative of $S(\boldsymbol{\beta})$ with respect to $\boldsymbol{\beta}$:

$$
\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta}) = -2\mathbf{X}^T \mathbf{y} + 2\mathbf{X}^T \mathbf{X}\boldsymbol{\beta}
$$

Setting the gradient to zero yields the celebrated **Normal Equations**:

$$
\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta}) = \mathbf{0} \implies -2\mathbf{X}^T(\mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}) = \mathbf{0} \implies \mathbf{X}^T \mathbf{e} = \mathbf{0}
$$

Under the assumption of full column rank ($\text{rank}(\mathbf{X}) = K < N$), the Gram matrix $\mathbf{X}^T \mathbf{X}$ is invertible:

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

The fitted values and residuals are generated via the symmetric, idempotent **Hat Matrix** ($\mathbf{P}_X$) and **Annihilator Matrix** ($\mathbf{M}_X$):

$$
\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y} \equiv \mathbf{P}_X \mathbf{y}, \quad \mathbf{e} = \mathbf{y} - \hat{\mathbf{y}} = (\mathbf{I}_N - \mathbf{P}_X)\mathbf{y} \equiv \mathbf{M}_X \mathbf{y}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{y} \in \mathbb{R}^{N \times 1}$: Observed response vector containing the outcome variable for all $N$ economic agents.
* $\mathbf{X} \in \mathbb{R}^{N \times K}$: Design matrix containing $K$ regressor columns (including an intercept vector of ones $\boldsymbol{\iota}_N$).
* $\boldsymbol{\beta} \in \mathbb{R}^{K \times 1}$: True, unobservable population parameter vector.
* $\hat{\boldsymbol{\beta}} \in \mathbb{R}^{K \times 1}$: OLS coefficient vector that minimizes the sum of squared residuals.
* $\hat{\mathbf{y}} \in \text{col}(\mathbf{X})$: Orthogonal projection of $\mathbf{y}$ onto the subspace spanned by the columns of $\mathbf{X}$.
* $\mathbf{e} \in \mathbb{R}^{N \times 1}$: Sample residual vector satisfying $\mathbf{X}^T \mathbf{e} = \mathbf{0}$ by first-order construction.
* $\mathbf{P}_X \in \mathbb{R}^{N \times N}$: The projection (hat) matrix with $\text{rank}(\mathbf{P}_X) = \text{tr}(\mathbf{P}_X) = K$.
* $\mathbf{M}_X \in \mathbb{R}^{N \times N}$: The residual maker (annihilator) matrix with $\text{rank}(\mathbf{M}_X) = \text{tr}(\mathbf{M}_X) = N - K$, satisfying $\mathbf{M}_X \mathbf{X} = \mathbf{0}$.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\mathbf{y}$ | متجه الاستجابة المشاهد | المتغير التابع الفعلي لجميع وحدات العينة $N$ (مثل الإيجار الحقيقي). |
| $\mathbf{X}$ | مصفوفة التصميم | المتغيرات المستقلة المفسرة متضمنة عمود الآحاد للحد الثابت. |
| $\boldsymbol{\beta}$ | معالم المجتمع الحقيقية | الأثر السببي الحقيقي غير المشاهد في المجتمع الإحصائي الكلي. |
| $\hat{\boldsymbol{\beta}}$ | مقدر المربعات الصغرى | معاملات الانحدار المحسوبة من العينة لتقليل مربع المسافات الرأسية. |
| $\hat{\mathbf{y}}$ | القيم المقدرة | الإسقاط الهندسي المتعامد للمتجه $\mathbf{y}$ داخل فضاء أعمدة $\mathbf{X}$. |
| $\mathbf{e}$ | متجه البواقي | فروق التنبؤ الفعلية التي تتعامد جبريًا بالضرورة مع كل عمود في $\mathbf{X}$. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the closed-form Ordinary Least Squares estimator using NumPy. Rather than directly computing `np.linalg.inv`, solve the linear system $(\mathbf{X}^T \mathbf{X})\boldsymbol{\beta} = \mathbf{X}^T \mathbf{y}$ using `np.linalg.solve` to preserve numerical stability and avoid condition-number blowups.

:::python-challenge{id="py-ols-residual-geometry"}
---
timeout_ms: 3000
test_cases:
  - input: "fit_ols(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]]), np.array([3.0, 5.0, 7.0]))['beta'].round(4).tolist()"
    expected: "[1.0, 2.0]"
  - input: "fit_ols(np.array([[1.0, 0.0], [1.0, 4.0]]), np.array([2.0, 10.0]))['beta'].round(4).tolist()"
    expected: "[2.0, 2.0]"
  - input: "fit_ols(np.array([[1.0, 2.0], [1.0, 4.0], [1.0, 6.0]]), np.array([4.0, 8.0, 12.0]))['residuals'].round(4).tolist()"
    expected: "[0.0, 0.0, 0.0]"
---
```python
import numpy as np

def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:
    """
    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, K)
        Design matrix of regressors (must have full column rank).
    y : np.ndarray of shape (N,)
        Observed response vector.
        
    Returns
    -------
    dict with keys:
        'beta': estimated parameter vector of shape (K,)
        'y_hat': fitted values vector of shape (N,)
        'residuals': residual errors vector of shape (N,)
    """
    # Step 1: Form the Gram matrix X^T X (features interacting with features)
    gram_matrix = X.T @ X
    
    # Step 2: Form the feature-target projection vector X^T y
    feature_target_proj = X.T @ y
    
    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably
    beta = np.linalg.solve(gram_matrix, feature_target_proj)
    
    # Step 4: Compute the fitted values y_hat = X beta (the shadow on the floor)
    y_hat = X @ beta
    
    # Step 5: Compute the residual vector e = y - y_hat (the vertical error)
    residuals = y - y_hat
    
    return {
        "beta": beta,
        "y_hat": y_hat,
        "residuals": residuals,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A data scientist at an economic consulting firm runs an OLS regression of worker wages on years of education and notes with excitement: *"My computer output shows that the sum of the residuals is $0.00000000$ and the correlation between education and the residuals is exactly $0.00000000$. This proves that education is completely exogenous and my estimate is free from unobserved ability bias!"*

How should a trained econometrician evaluate this statement?

* [ ] The scientist is correct: if residuals are orthogonal to education, there cannot be omitted variable bias.
* [x] The scientist is mistaken: residual orthogonality ($\mathbf{X}^T \mathbf{e} = \mathbf{0}$) is an algebraic identity forced by the first-order conditions of least squares; it holds identically even if omitted ability severely confounds the regression.
* [ ] The scientist is mistaken only because the sample size might be too small for the central limit theorem to apply.
* [ ] The scientist is correct only if the true error term is normally distributed.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
Residual orthogonality $\mathbf{X}^T \mathbf{e} = \mathbf{0}$ is not an empirical finding or a test of exogeneity; it is a mechanical mathematical consequence of the normal equations $\frac{\partial S}{\partial \boldsymbol{\beta}} = \mathbf{0}$. No matter how corrupted the data generating process is by omitted variables, reverse causality, or measurement error, OLS will *always* construct the sample residuals $\mathbf{e}$ such that they are strictly uncorrelated with $\mathbf{X}$ in the sample. The economic assumption of exogeneity requires that the unobservable population error $\boldsymbol{\varepsilon}$ satisfies $\mathbb{E}[\boldsymbol{\varepsilon} \mid \mathbf{X}] = \mathbf{0}$, which can never be verified by inspecting sample residuals $\mathbf{e}$.

**Why the distractors are incorrect:**
1. *The scientist is correct...*: Confuses the empirical residual vector $\mathbf{e}$ with the structural disturbance $\boldsymbol{\varepsilon}$. OVB contaminates the coefficient estimates $\hat{\boldsymbol{\beta}}$, which shifts $\mathbf{e}$ to maintain mechanical sample orthogonality.
2. *The scientist is mistaken only because the sample size might be too small...*: Sample size and the CLT are irrelevant here. Even with $N = 10,000,000$, $\mathbf{X}^T \mathbf{e} = \mathbf{0}$ holds to machine precision by definition.
3. *The scientist is correct only if the true error term is normally distributed...*: Normality affects finite-sample hypothesis testing ($t$- and $F$-tests), not the algebraic fact that OLS enforces $\mathbf{X}^T \mathbf{e} = \mathbf{0}$.

*الشرح باللغة العربية:*
تعامد البواقي مع المتغيرات المستقلة ($\mathbf{X}^T \mathbf{e} = \mathbf{0}$) ليس نتيجة تجريبية تثبت صحة النموذج، بل هو نتيجة جبرية حتمية لطريقة المربعات الصغرى التي تفرض رياضيًا تصفير المشتقات الأولى. حتى لو كان المتغير ملوثًا بانحياز شديد ناتج عن متغيرات محذوفة، فإن حاسوبك سيخرج دائمًا ارتباطًا قدره $0.0000$ بين البواقي والتعليم! لا يمكن أبدًا التحقق من فرضية الخارجية السببية $\mathbb{E}[\boldsymbol{\varepsilon} \mid \mathbf{X}] = 0$ عبر فحص البواقي العينية $\mathbf{e}$.
