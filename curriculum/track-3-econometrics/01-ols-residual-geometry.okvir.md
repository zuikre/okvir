---
id: "ols-residual-geometry"
version: "1.0.0"
title: "Bivariate OLS & The Geometry of Orthogonal Residuals"
track: "econometrics"
module: "mod-18"
estimated_minutes: 15
prerequisites: ["least-squares-approximation", "numpy-vectorization"]
i18n:
  ar: "الانحدار الخطي البسيط وهندسة البواقي المتعامدة"
---

# Bivariate OLS & The Geometry of Orthogonal Residuals

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Ordinary Least Squares (OLS) is almost universally introduced as a curve-fitting optimization: drawing a line across a 2D scatterplot to minimize the sum of squared vertical gaps. But this two-dimensional view obscures the deepest, most foundational insight of modern econometrics: **OLS is an orthogonal projection in sample space $\mathbb{R}^N$**.

Imagine collecting data on $N$ people. The observed outcome $\mathbf{y}$ is not a cloud of points—it is a single high-dimensional vector in an $N$-dimensional universe. Your regressors (like education, experience, and the constant intercept) span a much smaller $K$-dimensional flat subspace $\text{col}(\mathbf{X})$. Because $N \gg K$, the outcome vector $\mathbf{y}$ almost never lies inside this subspace. 

Think of a flagpole standing at an angle on a flat lawn. If the midday sun shines directly from straight above, the shadow cast upon the grass is the fitted value $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol{\beta}}$. The plumb line dropping straight down from the flagpole's tip to its shadow is the residual vector $\mathbf{e}$. Just as that vertical plumb line is strictly perpendicular ($90^\circ$) to every blade of grass on the lawn, the OLS residual vector $\mathbf{e}$ is mathematically perpendicular to every single regressor in $\mathbf{X}$. Least squares is simply finding the best "line of sight" to project high-dimensional reality onto the subspace we can observe.

Crucially, we must demystify what this projection actually accomplishes. Machine learning and statistical curve-fitting ask a purely predictive question: *"Given a person with 16 years of education, what is our best mathematical guess of their wage?"* This is passive observation—spotting where the shadow falls on the lawn. Econometrics, by contrast, asks a fundamentally causal question: *"If we intervened and forced a student to stay in school for another year, how much would their future wage change?"* Orthogonal projection guarantees optimal linear prediction within your dataset, but it cannot turn correlation into causation. If unobserved factors (like family wealth or innate drive) lurk behind both education and earnings, OLS faithfully projects their combined shadow onto the grass, mistaking correlation for policy impact.

يُقدَّم الانحدار الخطي العادي (OLS) في الغالب كمسألة حسابية لرسم خط يقلل المسافات الرأسية في رسم بياني ثنائي الأبعاد. لكن هذا التبسيط يحجب الرؤية الهندسية الأكثر عمقًا وأصالة في القياس الاقتصادي: **OLS هو إسقاط متعامد في فضاء العينة ذي الأبعاد الـ $N$**.

عندما نجمع بيانات عن $N$ شخص، فإن المتغير التابع $\mathbf{y}$ ليس سحابة نقاط، بل هو متجه واحد في فضاء هائل ذي $N$ بعدًا. وتشكل المتغيرات المستقلة (كالتعليم والخبرة والثابت) فضاءً فرعيًا مسطحًا ذا بعد $K$ (حيث $N \gg K$). ولأن $\mathbf{y}$ لا يقع عمومًا داخل هذا الفضاء، فإن أفضل تقدير له هو إسقاط ظله العمودي تمامًا.

تخيل سارية علم تميل بزاوية فوق أرضية عشبية مسطحة. عندما تسطع شمس الظهيرة عموديًا من كبد السماء، يكون الظل المنعكس على العشب هو القيم المقدرة $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol{\beta}}$. أما خيط الشاقول المتدلي من قمة السارية إلى قمة الظل فهو متجه البواقي $\mathbf{e}$. تمامًا كما يشكل خيط الشاقول زاوية قائمة ($90^\circ$) مع كل عشبة على الأرضية، يتعامد متجه البواقي $\mathbf{e}$ رياضيًا مع كل متغير مفسر في المصفوفة $\mathbf{X}$. إن الانحدار الخطي في جوهره هو البحث عن أفضل زاوية رؤية لإسقاط الواقع على الفضاء الذي نستطيع قياسه.

والأهم من ذلك هو إزالة الغموض الذي يحيط بما يحققه هذا الإسقاط فعليًا. إن تعلم الآلة والإحصاء التقليدي يجيبان عن سؤال تنبؤي بحت: *"إذا رأينا شخصًا أتم 16 عامًا من التعليم، فما هو أفضل تخمين رياضي لأجره؟"* هذا مجرد رصد سلبي لموضع سقوط الظل. أما القياس الاقتصادي فيطرح سؤالاً سببيًا جوهريًا: *"ماذا لو تدخلنا وغيرنا الواقع ومنحنا هذا الشخص عامًا إضافيًا من التعليم، كم سيزداد أجره الحقيقي؟"* يضمن الإسقاط المتعامد أفضل تنبؤ خطي ممكن داخل العينة، لكنه عاجز بمفرده عن تحويل الترابط إلى سببية. إذا كانت هناك عوامل خفية غير مقاسة (كالخلفية الأسرية أو القدرات الفطرية) تؤثر على التعليم والأجر معًا، فإن OLS سيسقط ظلها المشترك بلا تمييز، مغالطًا بين مجرد الاقتران والتأثير السببي الحقيقي للسياسات.

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

### Mathematical Derivation of the Normal Equations

To find the minimizer $\hat{\boldsymbol{\beta}}$, we compute the matrix derivative of $S(\boldsymbol{\beta})$ with respect to $\boldsymbol{\beta}$ using standard vector calculus rules:
1. $\frac{\partial (\boldsymbol{\beta}^T \mathbf{a})}{\partial \boldsymbol{\beta}} = \mathbf{a}$
2. $\frac{\partial (\boldsymbol{\beta}^T \mathbf{A} \boldsymbol{\beta})}{\partial \boldsymbol{\beta}} = 2\mathbf{A}\boldsymbol{\beta}$ for any symmetric matrix $\mathbf{A} = \mathbf{X}^T \mathbf{X}$.

Taking the gradient:

$$
\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta}) = -2\mathbf{X}^T \mathbf{y} + 2\mathbf{X}^T \mathbf{X}\boldsymbol{\beta}
$$

Setting the gradient to zero yields the celebrated **Normal Equations**:

$$
\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta}) = \mathbf{0} \implies -2\mathbf{X}^T(\mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}) = \mathbf{0} \implies \mathbf{X}^T \mathbf{e} = \mathbf{0}
$$

This equation states the core geometric truth: the sample residual vector $\mathbf{e} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$ is strictly orthogonal to every column vector in $\mathbf{X}$.

Under the assumption of full column rank ($\text{rank}(\mathbf{X}) = K < N$), the Gram matrix $\mathbf{X}^T \mathbf{X}$ is symmetric positive definite and invertible:

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

The fitted values and residuals are generated via the symmetric, idempotent **Hat Matrix** ($\mathbf{P}_X$) and **Annihilator Matrix** ($\mathbf{M}_X$):

$$
\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y} \equiv \mathbf{P}_X \mathbf{y}, \quad \mathbf{e} = \mathbf{y} - \hat{\mathbf{y}} = (\mathbf{I}_N - \mathbf{P}_X)\mathbf{y} \equiv \mathbf{M}_X \mathbf{y}
$$

Because $\mathbf{P}_X \mathbf{P}_X = \mathbf{P}_X$ and $\mathbf{M}_X \mathbf{X} = (\mathbf{I}_N - \mathbf{P}_X)\mathbf{X} = \mathbf{X} - \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1}\mathbf{X}^T \mathbf{X} = \mathbf{0}$, the annihilator matrix literally annihilates any vector lying in the column space of $\mathbf{X}$.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{y} \in \mathbb{R}^{N \times 1}$: Observed response vector containing the outcome variable for all $N$ economic agents.
* $\mathbf{X} \in \mathbb{R}^{N \times K}$: Design matrix containing $K$ regressor columns (including an intercept vector of ones $\boldsymbol{\iota}_N$).
* $\boldsymbol{\beta} \in \mathbb{R}^{K \times 1}$: True, unobservable population parameter vector.
* $\hat{\boldsymbol{\beta}} \in \mathbb{R}^{K \times 1}$: OLS coefficient vector that minimizes the sum of squared residuals.
* $\hat{\mathbf{y}} \in \text{col}(\mathbf{X})$: Orthogonal projection of $\mathbf{y}$ onto the subspace spanned by the columns of $\mathbf{X}$.
* $\mathbf{e} \in \mathbb{R}^{N \times 1}$: Sample residual vector satisfying $\mathbf{X}^T \mathbf{e} = \mathbf{0}$ by first-order construction.
* $\mathbf{P}_X \in \mathbb{R}^{N \times N}$: The projection (hat) matrix with $\text{rank}(\mathbf{P}_X) = \text{tr}(\mathbf{P}_X) = K$.
* $\mathbf{M}_X \in \mathbb{R}^{N \times N}$: The residual maker (annihilator) matrix with $\text{rank}(\mathbf{M}_X) = \text{tr}(\mathbf{M}_X) = N - K$, satisfying $\mathbf{M}_X \mathbf{X} = \mathbf{0}$.

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
    # Step 1: Form the cross-product matrix X^T X
    XtX = X.T @ X
    
    # Step 2: Form the regressor-outcome vector X^T y
    Xty = X.T @ y
    
    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably
    beta = np.linalg.solve(XtX, Xty)
    
    # Step 4: Compute the orthogonal projection (fitted values) y_hat = X beta
    y_hat = X @ beta
    
    # Step 5: Compute the residual vector e = y - y_hat
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
