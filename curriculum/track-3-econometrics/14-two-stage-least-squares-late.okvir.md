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

What happens when an econometric model contains multiple instruments, multiple endogenous regressors, and exogenous control covariates? The simple Wald ratio can no longer be computed directly.

**Two-Stage Least Squares (2SLS)** is the general matrix machine that extends instrumental variables to any number of dimensions:
1. **Stage 1 (Purification):** Regress the endogenous variable $\mathbf{X}$ onto all instruments and controls $\mathbf{Z}$. The fitted values $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$ represent the *exogenous variation* in treatment driven strictly by the instruments.
2. **Stage 2 (Estimation):** Regress the outcome $\mathbf{y}$ on the purified predictions $\hat{\mathbf{X}}$.

> **CRITICAL SOFTWARE PITFALL:** You must **NEVER** run two separate manual OLS regressions and trust the second-stage software standard errors! The manual second stage calculates residuals as $\mathbf{y} - \hat{\mathbf{X}}\hat{\boldsymbol{\beta}}$, which artificially shrinks standard errors and inflates $t$-statistics. Proper 2SLS must evaluate variance using the **true structural residuals** $\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$.

Furthermore, what if people respond differently to treatment? In their 2021 Nobel-prize-winning breakthrough, Joshua Angrist and Guido Imbens proved the **LATE Theorem (Local Average Treatment Effect)**:
When treatment effects vary across individuals, IV does not measure the average effect across everyone (ATE). Instead, it identifies the causal effect **exclusively for the Compliers**: individuals who comply with the nudge of the instrument (taking treatment if assigned $Z=1$, but refusing if $Z=0$). It tells us nothing about *Always-Takers* or *Never-Takers*, and assumes that *Defiers* (contrarians who do the exact opposite of the instrument) do not exist (the Monotonicity Assumption).

ماذا يحدث عندما يحتوي النموذج القياسي على أدوات متعددة، ومتغيرات داخلية متعددة، وضوابط تحكم خارجية؟ في هذه الحالة، تعجز نسبة فالد البسيطة عن حل المسألة بمفردها.

تُعد **المربعات الصغرى ذات المرحلتين (2SLS)** هي الآلة المصفوفية الشاملة التي تعمم المتغيرات الآداتية عبر أبعاد متعددة:
1. **المرحلة الأولى (التطهير والفلترة):** نجري انحدارًا للمتغير الداخلي $\mathbf{X}$ على كافة الأدوات والضوابط $\mathbf{Z}$. تمثل القيم المقدرة $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$ *التباين الخارجي النقي* الذي تحركه الأدوات دون سواها.
2. **المرحلة الثانية (التقدير الهيكلي):** نجري انحدارًا لمتغير النتيجة $\mathbf{y}$ على القيم المطهرة المقدرة $\hat{\mathbf{X}}$.

> **فخ برمجي خطير:** إياك أن تجري انحدارين منفصلين يدويًا وتعتمد الأخطاء المعيارية للمرحلة الثانية! فالانحدار اليدوي يحسب البواقي استنادًا إلى $\mathbf{y} - \hat{\mathbf{X}}\hat{\boldsymbol{\beta}}$، مما يقلص التباين زائفًا ويضخم الدلالة الإحصائية. يجب على برنامج 2SLS السليم حساب التباين دائمًا باستخدام **البواقي الهيكلية الحقيقية** $\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$.

والأهم من ذلك: ماذا لو كان أثر المعالجة متفاوتًا بين الأفراد؟ في دراستهما التاريخية الحائزة على جائزة نوبل 2021، أثبت جوشوا أنغريست وغيدو إمبنز **مبرهنة LATE (متوسط الأثر الموضعي للمعالجة)**:
عندما تكون الآثار غير متجانسة، لا يقيس IV متوسط الأثر للمجتمع بأسره (ATE)، بل يقيس الأثر السببي **حصرًا لفئة "الممتثلين" (Compliers)**: وهم أولئك الذين يستجيبون لدفعة الأداة (يتلقون العلاج إذا شجعتهم الأداة بـ $Z=1$، ويتركونه إذا كانت $Z=0$). ولا يخبرنا بشيء عن "المتلقين دائمًا" أو "الرافضين دائمًا"، ويشترط غياب "المتحدين" المعاكسين للأداة (فرضية الرتابة Monotonicity).

:::simulation-widget{engine="canvas2d" component="TwoStageLeastSquaresLateLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\mathbf{Z} \in \mathbb{R}^{N \times L}$ be the matrix of instruments and exogenous covariates, where $L \ge K$ (order condition for identification).

The first-stage projection onto the instrument subspace is:

$$
\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X} = \mathbf{Z}(\mathbf{Z}^T \mathbf{Z})^{-1} \mathbf{Z}^T \mathbf{X}
$$

The second-stage regression of $\mathbf{y}$ on $\hat{\mathbf{X}}$ yields the **2SLS Estimator**:

$$
\hat{\boldsymbol{\beta}}_{\text{2SLS}} = (\hat{\mathbf{X}}^T \hat{\mathbf{X}})^{-1} \hat{\mathbf{X}}^T \mathbf{y} = (\mathbf{X}^T \mathbf{P}_Z \mathbf{X})^{-1} \mathbf{X}^T \mathbf{P}_Z \mathbf{y}
$$

The correct structural error variance and asymptotic covariance matrix are:

$$
\mathbf{e}_{\text{structural}} = \mathbf{y} - \mathbf{X} \hat{\boldsymbol{\beta}}_{\text{2SLS}}, \quad s_{\text{2SLS}}^2 = \frac{\mathbf{e}_{\text{structural}}^T \mathbf{e}_{\text{structural}}}{N - K}
$$

$$
\widehat{\mathbb{V}}(\hat{\boldsymbol{\beta}}_{\text{2SLS}}) = s_{\text{2SLS}}^2 (\mathbf{X}^T \mathbf{P}_Z \mathbf{X})^{-1}
$$

Under instrument monotonicity ($D_i(1) \ge D_i(0)$ for all $i$), the 2SLS estimate identifies the **Local Average Treatment Effect (LATE)**:

$$
\text{LATE} = \mathbb{E}\big[Y_i(1) - Y_i(0) \mid D_i(1) - D_i(0) = 1\big]
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{Z} \in \mathbb{R}^{N \times L}$: Full instrumental design matrix with $L \ge K$.
* $\mathbf{P}_Z = \mathbf{Z}(\mathbf{Z}^T \mathbf{Z})^{-1} \mathbf{Z}^T$: Symmetric idempotent projection matrix spanned by instruments.
* $\hat{\mathbf{X}} = \mathbf{P}_Z \mathbf{X}$: First-stage fitted values representing exogenous variation.
* $\hat{\boldsymbol{\beta}}_{\text{2SLS}}$: Closed-form Two-Stage Least Squares structural parameter estimate.
* $\mathbf{e}_{\text{structural}}$: True structural residuals evaluated using actual $\mathbf{X}$ rather than fitted $\hat{\mathbf{X}}$.
* $\text{LATE}$: Causal effect identified exclusively for the subgroup of compliers who change their treatment status in response to the instrument.

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
    
    # Step 2: Generate first-stage predictions X_hat = P_Z X
    X_hat = P_Z @ X
    
    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y
    XtPZ_X = X.T @ P_Z @ X
    XtPZ_y = X.T @ P_Z @ y
    beta_2sls = np.linalg.solve(XtPZ_X, XtPZ_y)
    
    # Step 4: CRITICAL - Compute true structural residuals using original X, NOT X_hat
    structural_residuals = y - X @ beta_2sls
    
    # Step 5: Compute degrees-of-freedom corrected residual variance
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

A municipal workforce development board evaluates an intensive job retraining program by randomly mailing training vouchers ($Z = 1$) to $5,000$ unemployed workers. Some workers who receive vouchers do not attend ($Z=1, D=0$), while some motivated control workers find free alternative training ($Z=0, D=1$).

Under the Angrist-Imbens LATE framework, who does the resulting 2SLS estimate represent, and what does the **Monotonicity Assumption** guarantee?

* [ ] The estimate represents the average impact across every unemployed person in the city; monotonicity guarantees zero variance.
* [x] The estimate identifies the causal return exclusively for **Compliers** (workers who attend training *if and only if* they receive the voucher); Monotonicity rules out "Defiers" (individuals who would attend training if denied a voucher, but refuse to attend if given one).
* [ ] The estimate represents the Always-Takers because their high motivation makes them most productive.
* [ ] 2SLS is invalid whenever compliance is less than $100\%$.
