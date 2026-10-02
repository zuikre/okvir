---
id: "two-stage-least-squares-late"
version: "1.0.0"
title: "Two-Stage Least Squares (2SLS), Weak Instruments & LATE"
track: "econometrics"
module: "mod-24"
estimated_minutes: 15
prerequisites: ["instrumental-variables-2sls"]
i18n:
  ar: "المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي"
---

# Two-Stage Least Squares (2SLS), Weak Instruments & LATE

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

What happens when an econometric model contains multiple instruments, multiple endogenous regressors, and exogenous control covariates? The simple univariate Wald ratio is no longer sufficient. We need a general multidimensional engine: **Two-Stage Least Squares (2SLS)**.

Think of 2SLS as an industrial water purification system designed to remove chemical toxins:
1. **Stage 1 (Purification):** Your raw treatment variable $\mathbf{X}$ is contaminated with toxic unobserved confounders (innate ability, motivation, background). In the first stage, you pass $\mathbf{X}$ through the filtration chamber of your instruments $\mathbf{Z}$. Because the instruments are strictly exogenous, the fitted values $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$ represent exclusively the purified, exogenous variation in treatment driven by the external shocks.
2. **Stage 2 (Estimation):** You pump the purified liquid $\hat{\mathbf{X}}$ into the regression of outcome $\mathbf{y}$, estimating the structural causal parameter free from omitted variable poisoning.

Crucially, 2SLS starkly highlights the difference between prediction and causation. A predictive machine learning algorithm wants all of $\mathbf{X}$, including the toxic contaminants, because contaminants correlate with the outcome and improve out-of-sample forecast accuracy ($R^2$). Econometrics deliberately throws away most of the variation in $\mathbf{X}$, retaining only the narrow sliver explained by $\mathbf{Z}$. We gladly accept higher variance and wider confidence intervals in exchange for the holy grail of causal consistency!

> **CRITICAL SOFTWARE PITFALL:** You must **NEVER** run two separate manual OLS regressions in Python or R and report the second-stage software standard errors! In the second stage, the computer naively calculates residuals as $\mathbf{y} - \hat{\mathbf{X}}\hat{\boldsymbol{\beta}}$. But the true human beings in the real world experienced the actual treatment $\mathbf{X}$, not the mathematical phantom $\hat{\mathbf{X}}$! The true structural residuals are $\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$. Trusting manual second-stage standard errors severely underestimates variance, leading to artificially deflated $p$-values and false scientific discoveries.

Finally, what happens when treatment effects are heterogeneous—when a job training program helps high-school dropouts tremendously but does nothing for college graduates? In their Nobel-prize-winning breakthrough, Joshua Angrist and Guido Imbens proved the **LATE Theorem (Local Average Treatment Effect)**. When responses vary, IV does not estimate the Average Treatment Effect across the entire population (ATE). Instead, it identifies the causal effect **exclusively for the Compliers**: the specific subpopulation whose treatment uptake was actively nudged by the instrument! It tells us nothing about *Always-Takers* (who get treated no matter what) or *Never-Takers* (who refuse treatment under all conditions), and assumes that perverse *Defiers* (who spitefully do the exact opposite of the instrument) do not exist (the Monotonicity Assumption).

ماذا يحدث عندما يحتوي النموذج القياسي على أدوات متعددة، ومتغيرات داخلية متعددة، ومجموعة من ضوابط التحكم الخارجية؟ في هذه الحالة، تعجز نسبة فالد البسيطة عن حل المسألة بمفردها، ونحتاج إلى آلة مصفوفية شاملة متعددة الأبعاد: **المربعات الصغرى ذات المرحلتين (Two-Stage Least Squares - 2SLS)**.

تخيل 2SLS كمحطة تنقية صناعية متطورة للمياه الملوثة بالسموم الكيميائية:
1. **المرحلة الأولى (التطهير والفلترة):** المتغير الخام للمعالجة $\mathbf{X}$ ملوث بشوائب ومتغيرات خفية ومربكة (كالقدرات الفطرية، والدافع الذاتي، والوسط العائلي). في المرحلة الأولى، نمرر هذا المتغير عبر مرشحات الأدوات الخارجية $\mathbf{Z}$. ولأن الأدوات نقية وخارجية تمامًا، فإن القيم المقدرة المتوقعة $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$ تمثل حصرًا الجزء النقي والمطهر من المعالجة الذي حركته الصدمات الخارجية دون غيرها.
2. **المرحلة الثانية (التقدير الهيكلي):** نضخ السائل المطهر $\hat{\mathbf{X}}$ في معادلة انحدار النتيجة $\mathbf{y}$، لتقدير المعلمة السببية الهيكلية بعد عزلها تمامًا عن سموم التحيز.

وهنا يتجلى التناقض الصريح بين التنبؤ والسببية: يرغب نموذج تعلم الآلة التنبؤي في الاحتفاظ بكل تباين $\mathbf{X}$ بما فيه من شوائب وسموم، لأن تلك الشوائب تزيد من دقة التنبؤ بـ $\mathbf{y}$ وتضخم معامل التحديد $R^2$. أما القياس الاقتصادي فيضحي عن عمد بمعظم تباين $\mathbf{X}$، ولا يحتفظ إلا بالشريحة الضيقة التي فسرتها الأدوات $\mathbf{Z}$؛ فنحن نقبل طواعية بزيادة التباين واتساع فترات الثقة في سبيل الفوز بالاتساق السببي الخالص!

> **فخ برمجي وبرمجة إحصائية خطير:** إياك أن تجري انحدارين منفصلين يدويًا وتعتمد الأخطاء المعيارية الافتراضية للمرحلة الثانية! فالانحدار اليدوي يحسب البواقي استنادًا إلى الفروق الافتراضية $\mathbf{y} - \hat{\mathbf{X}}\hat{\boldsymbol{\beta}}$. لكن البشر الحقيقيين في العالم الواقعي خضعوا للمعالجة الفعلية $\mathbf{X}$، وليس للنسخة الافتراضية $\hat{\mathbf{X}}$! إن البواقي الهيكلية الحقيقية هي $\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$. يؤدي الاعتماد على الأخطاء المعيارية للمرحلة الثانية إلى تقليص الأخطاء المعيارية زائفًا وتضخيم الدلالة الإحصائية بشكل مضلل.

وأخيرًا، ماذا يحدث لو كانت استجابة البشر للمعالجة متفاوتة وغير متجانسة؟ في دراستهما التاريخية الحائزة على جائزة نوبل 2021، أثبت جوشوا أنغريست وغيدو إمبنز **مبرهنة LATE (متوسط الأثر الموضعي للمعالجة)**. فعندما تتباين استجابة الناس، لا يقيس IV متوسط الأثر الإجمالي للمجتمع بأسره (ATE)، بل يقيس الأثر السببي **حصرًا لشريحة "الممتثلين" (Compliers)**: وهم الأفراد الذين غيّروا سلوكهم وامتثلوا تحديدًا لدفعة الأداة! ولا يخبرنا النموذج بشيء عن "المتلقين دائمًا" أو "الرافضين دائمًا"، ويشترط انعدام "المتحدين" الذين يتصرفون بعناد عكس توجيه الأداة (فرضية الرتابة Monotonicity).

:::simulation-widget{engine="canvas2d" component="TwoStageLeastSquaresLateLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\mathbf{y} \in \mathbb{R}^{N \times 1}$ be the outcome vector, $\mathbf{X} \in \mathbb{R}^{N \times K}$ be the design matrix containing endogenous and exogenous regressors, and $\mathbf{Z} \in \mathbb{R}^{N \times L}$ be the matrix of valid instruments and exogenous controls, with the order condition $L \ge K$.

### Matrix Derivation of the 2SLS Estimator

The projection matrix onto the column space of instruments $\mathbf{Z}$ is symmetric and idempotent:

$$
\mathbf{P}_Z = \mathbf{Z}(\mathbf{Z}^T \mathbf{Z})^{-1} \mathbf{Z}^T, \quad \mathbf{P}_Z^T = \mathbf{P}_Z, \quad \mathbf{P}_Z \mathbf{P}_Z = \mathbf{P}_Z
$$

**Stage 1:** Project each column of $\mathbf{X}$ onto $\text{col}(\mathbf{Z})$ to construct the purified regressors:

$$
\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}
$$

**Stage 2:** Run OLS of $\mathbf{y}$ on the purified design matrix $\hat{\mathbf{X}}$:

$$
\hat{\boldsymbol{\beta}}_{\text{2SLS}} = (\hat{\mathbf{X}}^T \hat{\mathbf{X}})^{-1} \hat{\mathbf{X}}^T \mathbf{y}
$$

Substituting $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$ and using idempotency ($\mathbf{P}_Z^T \mathbf{P}_Z = \mathbf{P}_Z$):

$$
\hat{\mathbf{X}}^T \hat{\mathbf{X}} = (\mathbf{P}_Z \mathbf{X})^T (\mathbf{P}_Z \mathbf{X}) = \mathbf{X}^T \mathbf{P}_Z \mathbf{P}_Z \mathbf{X} = \mathbf{X}^T \mathbf{P}_Z \mathbf{X}
$$

$$
\hat{\mathbf{X}}^T \mathbf{y} = (\mathbf{P}_Z \mathbf{X})^T \mathbf{y} = \mathbf{X}^T \mathbf{P}_Z \mathbf{y}
$$

Thus, the closed-form **Two-Stage Least Squares Estimator** is:

$$
\hat{\boldsymbol{\beta}}_{\text{2SLS}} = (\mathbf{X}^T \mathbf{P}_Z \mathbf{X})^{-1} \mathbf{X}^T \mathbf{P}_Z \mathbf{y}
$$

### Correct Variance Estimation vs The Manual Pitfall

If an analyst runs OLS of $\mathbf{y}$ on $\hat{\mathbf{X}}$, the software computes the residual vector:

$$
\hat{\mathbf{e}}_{\text{manual}} = \mathbf{y} - \hat{\mathbf{X}}\hat{\boldsymbol{\beta}}_{\text{2SLS}} \ne \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}_{\text{2SLS}}
$$

The true structural data generating process is $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}$. Therefore, the consistent estimator of the structural error variance $s^2$ must evaluate errors using the actual matrix $\mathbf{X}$:

$$
\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}_{\text{2SLS}}
$$

$$
s_{\text{2SLS}}^2 = \frac{\mathbf{e}_{\text{structural}}^T \mathbf{e}_{\text{structural}}}{N - K}
$$

The consistent asymptotic variance-covariance matrix is:

$$
\widehat{\mathbb{V}}(\hat{\boldsymbol{\beta}}_{\text{2SLS}}) = s_{\text{2SLS}}^2 (\mathbf{X}^T \mathbf{P}_Z \mathbf{X})^{-1}
$$

### The LATE Theorem (Local Average Treatment Effect)

Under binary treatment $D_i \in \{0, 1\}$ and binary instrument $Z_i \in \{0, 1\}$, every individual belongs to one of four latent compliance strata defined by their potential treatment states $(D_i(1), D_i(0))$:
1. **Compliers:** $D_i(1) = 1, D_i(0) = 0$ (take treatment if encouraged, avoid if not).
2. **Always-Takers:** $D_i(1) = 1, D_i(0) = 1$ (take treatment regardless of instrument).
3. **Never-Takers:** $D_i(1) = 0, D_i(0) = 0$ (refuse treatment regardless of instrument).
4. **Defiers:** $D_i(1) = 0, D_i(0) = 1$ (do the exact opposite of encouragement).

**Theorem (Imbens & Angrist, 1994):** If the instrument satisfies:
1. *Independence:* $(Y_i(1), Y_i(0), D_i(1), D_i(0)) \perp\!\!\perp Z_i$
2. *Exclusion Restriction:* $Y_i(d, z) = Y_i(d)$
3. *First Stage Relevance:* $\mathbb{E}[D_i(1) - D_i(0)] \ne 0$
4. *Monotonicity (No Defiers):* $D_i(1) \ge D_i(0)$ for all $i$

Then the Wald / 2SLS estimator identifies the **Local Average Treatment Effect (LATE)**:

$$
\hat{\beta}_{\text{IV}} \xrightarrow{p} \text{LATE} \equiv \mathbb{E}\big[Y_i(1) - Y_i(0) \mid D_i(1) - D_i(0) = 1\big]
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{Z} \in \mathbb{R}^{N \times L}$: Matrix of instruments and exogenous covariates ($L \ge K$).
* $\mathbf{P}_Z$: Symmetric idempotent hat matrix projecting vectors into the column space of $\mathbf{Z}$.
* $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$: Orthogonal projection of regressors containing only exogenous instrumental variation.
* $\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$: True structural residuals used to compute standard errors.
* $\text{LATE}$: The average causal effect evaluated strictly over the subgroup of compliers.
* Monotonicity: The behavioral assumption ruling out defiers ($D_i(1) \ge D_i(0)$).

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a Two-Stage Least Squares (2SLS) estimation engine from first principles in NumPy. Verify that standard errors are constructed using the correct structural residuals rather than the second-stage fitted residuals.

:::python-challenge{id="py-two-stage-least-squares-late"}
---
timeout_ms: 3000
test_cases:
  - input: "Z = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]); X = Z[:, 1:2] * 2.0; y = X[:, 0] * 3.0; res = fit_2sls(y, X, Z); round(float(res['beta_2sls'][0]), 4)"
    expected: "3.0"
  - input: "Z = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]); X = Z[:, 1:2] * 2.0; y = X[:, 0] * 3.0; res = fit_2sls(y, X, Z); round(float(np.sum(res['structural_residuals']**2)), 4)"
    expected: "0.0"
  - input: "Z = np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0]]); X = np.array([[1.0], [2.0], [3.0]]); y = np.array([2.0, 4.0, 6.0]); res = fit_2sls(y, X, Z); 'se' in res"
    expected: "True"
---
```python
import numpy as np

def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:
    """
    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Outcome vector.
    X : np.ndarray of shape (N, K)
        Matrix of endogenous/exogenous regressors.
    Z : np.ndarray of shape (N, L)
        Matrix of instrumental variables (L >= K).
        
    Returns
    -------
    dict with keys:
        'beta_2sls': np.ndarray of shape (K,)
        'structural_residuals': np.ndarray of shape (N,)
        's2': float, unbiased structural error variance
        'se': np.ndarray of shape (K,), standard errors
    """
    N, K = X.shape
    
    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T
    ZtZ = Z.T @ Z
    ZtZ_inv = np.linalg.inv(ZtZ)
    P_Z = Z @ ZtZ_inv @ Z.T
    
    # Step 2: Generate first-stage purified predictions X_hat = P_Z X
    X_hat = P_Z @ X
    
    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y stably
    XtPZ_X = X.T @ P_Z @ X
    XtPZ_y = X.T @ P_Z @ y
    beta_2sls = np.linalg.solve(XtPZ_X, XtPZ_y)
    
    # Step 4: CRITICAL - Compute true structural residuals using original X, NOT X_hat
    structural_residuals = y - X @ beta_2sls
    
    # Step 5: Compute degrees-of-freedom corrected structural residual variance s^2
    df = N - K
    s2 = float(np.sum(structural_residuals ** 2)) / df if df > 0 else 0.0
    
    # Step 6: Parameter covariance matrix and standard errors
    vcov = s2 * np.linalg.inv(XtPZ_X)
    se = np.sqrt(np.maximum(np.diag(vcov), 0.0))
    
    return {
        "beta_2sls": beta_2sls,
        "structural_residuals": structural_residuals,
        "s2": s2,
        "se": se,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A municipal workforce development board evaluates an intensive job retraining program by randomly mailing training vouchers ($Z = 1$) to $5,000$ unemployed workers. Some workers who receive vouchers do not attend ($Z=1, D=0$), while some highly motivated control workers find free alternative training ($Z=0, D=1$).

Under the Angrist-Imbens LATE framework, who does the resulting 2SLS estimate represent, and what does the **Monotonicity Assumption** guarantee?

* [ ] The estimate represents the average impact across every unemployed person in the city; monotonicity guarantees zero variance.
* [x] The estimate identifies the causal return exclusively for **Compliers** (workers who attend training *if and only if* they receive the voucher); Monotonicity rules out "Defiers" (individuals who would attend training if denied a voucher, but refuse to attend if given one).
* [ ] The estimate represents the Always-Takers because their high motivation makes them most productive.
* [ ] 2SLS is invalid whenever compliance is less than $100\%$.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In real-world policy evaluations, compliance is rarely universal. The Angrist-Imbens Local Average Treatment Effect (LATE) theorem proves that when treatment effects are heterogeneous, 2SLS does not estimate the effect for Always-Takers (who would get training regardless of the voucher) or Never-Takers (who ignore the voucher). The instrument exerts leverage *only* on the Compliers—those unemployed workers whose training decision is actively flipped from 0 to 1 by the arrival of the voucher. The Monotonicity assumption states that the instrument pushes people in one direction only ($D_i(1) \ge D_i(0)$); it rules out contrarian "Defiers" who would attend training only when denied a voucher out of pure defiance.

**Why the distractors are incorrect:**
1. *The estimate represents the average impact across every unemployed person...*: That would be the Average Treatment Effect (ATE). 2SLS cannot identify ATE without assuming constant treatment effects across all latent compliance groups.
2. *The estimate represents the Always-Takers...*: Always-Takers experience no change in their treatment status ($D_i(1) = D_i(0) = 1$); the instrument has zero variance among them, so their causal effect cannot be identified.
3. *2SLS is invalid whenever compliance is less than 100%...*: 2SLS was invented precisely to solve imperfect compliance! If compliance were 100%, simple difference-in-means would suffice.

*الشرح باللغة العربية:*
في تقييم السياسات العامة الواقعية، نادرًا ما يكون الامتثال كاملاً. تثبت مبرهنة الأثر الموضعي (LATE) أن مقدر 2SLS لا يقيس أثر التدريب لجميع العاطلين (ATE)، بل يقيسه *حصرًا* لفئة **الممتثلين (Compliers)**: وهم العمال الذين لم يكونوا ليتدربوا لولا استلامهم للقسيمة، والذين حفزتهم القسيمة فعليًا على الالتحاق. أما فئتا "المتلقين دائمًا" و"الرافضين دائمًا" فلا تتغير حالتهم بفعل القسيمة، وبالتالي تعجز الأداة عن رصد أثر التدريب لديهم. وتضمن فرضية الرتابة (Monotonicity) عدم وجود فئة "المتحدين" الذين يتصرفون بعناد عكسي فيتدربون إذا حُرموا من القسيمة ويرفضون التدريب إذا مُنحوها!
