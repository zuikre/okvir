---
id: "heteroskedasticity-white-robust"
version: "1.0.0"
title: "Heteroskedasticity & The White HC0-HC3 Sandwich Estimator"
track: "econometrics"
module: "mod-19"
estimated_minutes: 15
prerequisites: ["gauss-markov-blue-theorem"]
i18n:
  ar: "عدم تجانس التباين ومقدر الساندويتش المتين لهوايت"
---

# Heteroskedasticity & The White HC0-HC3 Sandwich Estimator

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

In textbook econometrics, every observation's error term is assumed to share the exact same variance $\sigma^2$ (homoskedasticity). But in the living, breathing economy, **dispersion is almost never uniform**.

Consider household spending on restaurant dining across income levels. Low-income households spend between $\$10$ and $\$50$ a week; their behavior is tightly constrained by a tight budget, producing small error variance. But billionaire households spend anywhere from $\$50$ to $\$50,000$ a week—some eat at local diners, while others order vintage champagne every night. As income increases, the dispersion of the error term fans out like an open trumpet. This unequal variance is **Heteroskedasticity**.

When heteroskedasticity is present, what breaks down?
* The good news: OLS point estimates $\hat{\boldsymbol{\beta}}$ remain **unbiased and consistent**. The line still passes through the center of gravity of the data.
* The catastrophic news: The textbook standard errors $\sigma^2 (\mathbf{X}^T \mathbf{X})^{-1}$ are **completely invalid**. They typically underestimate sampling variance, leading to artificially narrow confidence intervals, inflated $t$-statistics, and false discoveries.

In 1980, Halbert White revolutionized empirical economics with the **Sandwich Estimator**. Think of a culinary sandwich:
* The **Outer Bread**: The classical projection matrix $(\mathbf{X}^T \mathbf{X})^{-1}$.
* The **Inner Meat**: An empirical core filled with each observation's squared residual $e_i^2$.
By wrapping the outer bread around the empirical meat, White's estimator provides standard errors that remain asymptotically valid *without requiring you to know or model the true underlying variance structure*.

في كتب الاقتصاد القياسي المدرسية، يُفترض أن لجميع أخطاء المشاهدات التباين نفسه $\sigma^2$ (تجانس التباين). لكن في الواقع الاقتصادي الحي، **لا يكون التشتت متساويًا على الإطلاق**.

تأمل مثلاً إنفاق الأسر على ارتياد المطاعم بحسب مستوى الدخل. الأسر محدودة الدخل تنفق بين 10 و 50 دولارًا أسبوعيًا؛ ميزانيتها المقيدة تجعل تباين أخطائها ضئيلاً ومحكومًا. أما الأسر فاحشة الثراء فيتراوح إنفاقها بين 50 و 50,000 دولار أسبوعيًا؛ فبعضهم يفضل وجبات متواضعة وبعضهم ينفق ببذخ يومي. مع زيادة الدخل، يتسع انتشار الأخطاء وتشتتها كالمروحة المفتوحة. هذا التشتت غير المتساوي هو **عدم تجانس التباين (Heteroskedasticity)**.

عند وجود عدم تجانس التباين، ما الذي يتأثر وما الذي ينجو؟
* النبأ السار: تظل معاملات الانحدار $\hat{\boldsymbol{\beta}}$ **غير متحيّزة ومتسقة**. فالخط ما زال يمر عبر مركز الثقل الحقيقي للبيانات.
* النبأ الكارثي: تنهار الأخطاء المعيارية التقليدية $\sigma^2 (\mathbf{X}^T \mathbf{X})^{-1}$ **وتفقد مصداقيتها تمامًا**. فهي تقلل التباين الحقيقي بصورة مضللة، مما ينتج فترات ثقة ضيقة وقيم $t$ متضخمة تمنح دلالة إحصائية زائفة لمتغيرات لا أثر لها.

في عام 1980، أحدث هالبرت هوايت ثورة بابتكار **مقدر الساندويتش المتين (Sandwich Estimator)**:
* **شريحتا الخبز الخارجيتان**: مصفوفة الإسقاط الكلاسيكية $(\mathbf{X}^T \mathbf{X})^{-1}$.
* **حشوة اللحم الداخلية**: قلب تجريبي مبني من مربعات البواقي الفعلية لكل مشاهدة $e_i^2$.
بإحاطة الحشوة الداخلية بشريحتي الخبز، يوفر مقدر هوايت أخطاء معيارية متسقة وموثوقة تقارب الحقيقة، *دون الحاجة إلى معرفة الصيغة الرياضية الحقيقية لتباين الأخطاء*.

:::simulation-widget{engine="canvas2d" component="HeteroskedasticityRobustLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Under general heteroskedasticity with uncorrelated errors, the error covariance matrix becomes a non-scalar diagonal matrix:

$$
\boldsymbol{\Omega} \equiv \mathbb{V}[\boldsymbol{\varepsilon} \mid \mathbf{X}] = \begin{bmatrix} \sigma_1^2 & 0 & \dots & 0 \\ 0 & \sigma_2^2 & \dots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & \sigma_N^2 \end{bmatrix}
$$

Propagating this variance into the OLS sampling expression yields the true covariance structure:

$$
\mathbb{V}[\hat{\boldsymbol{\beta}} \mid \mathbf{X}] = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \boldsymbol{\Omega} \mathbf{X} (\mathbf{X}^T \mathbf{X})^{-1}
$$

White (1980) proved that we do not need to estimate all $N$ distinct $\sigma_i^2$ values individually. Instead, replacing $\boldsymbol{\Omega}$ with the diagonal matrix of squared OLS residuals $\text{diag}(e_1^2, \dots, e_N^2)$ yields the consistent **HC0 Sandwich Estimator**:

$$
\mathbf{V}_{\text{HC0}} = (\mathbf{X}^T \mathbf{X})^{-1} \left( \sum_{i=1}^N e_i^2 \mathbf{x}_i \mathbf{x}_i^T \right) (\mathbf{X}^T \mathbf{X})^{-1}
$$

In finite samples, HC0 is downward-biased. MacKinnon & White (1985) introduced **HC1**, which applies a degrees-of-freedom correction factor:

$$
\mathbf{V}_{\text{HC1}} = \frac{N}{N - K} \mathbf{V}_{\text{HC0}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\boldsymbol{\Omega} \in \mathbb{R}^{N \times N}$: True diagonal population error variance matrix with diagonal entries $\sigma_i^2 = \mathbb{E}[\varepsilon_i^2 \mid \mathbf{x}_i]$.
* $\mathbf{x}_i \in \mathbb{R}^{K \times 1}$: Column vector of regressors for observation $i$ (transposed row from $\mathbf{X}$).
* $e_i = y_i - \mathbf{x}_i^T \hat{\boldsymbol{\beta}}$: Sample OLS residual for unit $i$.
* $\sum_{i=1}^N e_i^2 \mathbf{x}_i \mathbf{x}_i^T$: The empirical middle "meat" matrix of the sandwich.
* $(\mathbf{X}^T \mathbf{X})^{-1}$: The outer "bread" matrices that project the variance into parameter space.
* $\text{HC0}$: Halbert White's asymptotic heteroskedasticity-consistent variance estimator.
* $\text{HC1}$: Degrees-of-freedom adjusted robust covariance matrix ($N / (N - K)$), widely adopted as the default robust estimator in modern statistical packages.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent robust covariance matrix estimator using vectorized matrix products in NumPy.

:::python-challenge{id="py-heteroskedasticity-white-robust"}
---
timeout_ms: 3000
test_cases:
  - input: "len(compute_robust_se(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([1.0, 3.0, 2.0, 8.0]), 'HC1')['se_robust'])"
    expected: "2"
  - input: "round(float(compute_robust_se(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([2.0, 4.0, 6.0, 8.0]), 'HC0')['se_robust'][1]), 4)"
    expected: "0.0"
  - input: "compute_robust_se(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([1.0, 3.0, 2.0, 8.0]), 'HC1')['se_robust'][0] > 0"
    expected: "True"
---
```python
import numpy as np

def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = "HC1") -> dict[str, np.ndarray]:
    """
    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, K)
        Design matrix of regressors.
    y : np.ndarray of shape (N,)
        Observed target vector.
    hc_type : str, default 'HC1'
        Type of robust standard errors ('HC0' or 'HC1').
        
    Returns
    -------
    dict with keys:
        'beta': estimated parameters (K,)
        'se_default': classical homoskedastic standard errors (K,)
        'se_robust': heteroskedasticity-robust standard errors (K,)
    """
    N, K = X.shape
    
    # Step 1: Solve for OLS parameters
    XtX = X.T @ X
    Xty = X.T @ y
    beta = np.linalg.solve(XtX, Xty)
    
    # Step 2: Calculate residuals
    residuals = y - X @ beta
    
    # Step 3: Classical homoskedastic standard errors for comparison
    df = N - K
    s2 = float(np.sum(residuals ** 2)) / df if df > 0 else 0.0
    XtX_inv = np.linalg.inv(XtX)
    se_default = np.sqrt(np.maximum(np.diag(s2 * XtX_inv), 0.0))
    
    # Step 4: Construct the empirical meat matrix: X^T * diag(e^2) * X
    # Vectorized computation: multiply each row of X by residual e_i
    X_scaled = X * residuals[:, np.newaxis]
    meat = X_scaled.T @ X_scaled  # Equivalent to sum_i e_i^2 x_i x_i^T
    
    # Step 5: Assemble the sandwich: (X^T X)^(-1) * meat * (X^T X)^(-1)
    vcov_hc0 = XtX_inv @ meat @ XtX_inv
    
    if hc_type.upper() == "HC1" and df > 0:
        vcov_robust = (N / df) * vcov_hc0
    else:
        vcov_robust = vcov_hc0
        
    se_robust = np.sqrt(np.maximum(np.diag(vcov_robust), 0.0))
    
    return {
        "beta": beta,
        "se_default": se_default,
        "se_robust": se_robust,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

An empirical researcher estimates the impact of CEO compensation on firm innovation using a cross-section of Fortune 500 corporations. The default textbook OLS standard error yields $t = 3.42$ ($p = 0.0006$, labeled as highly significant with three stars). However, when recalculating with White HC1 robust standard errors, the standard error triples, yielding $t = 1.14$ ($p = 0.254$).

What empirical phenomenon explains this collapse in significance, and which result should be published?

* [ ] The default standard errors should be kept because they yield a statistically significant discovery.
* [x] The regression suffers from severe heteroskedasticity (likely driven by huge variation among mega-cap firms); the default errors were artificially deflated, and the researcher must publish the HC1 robust standard error showing no statistically significant effect.
* [ ] The discrepancy proves that the OLS coefficients $\hat{\boldsymbol{\beta}}$ are biased and invalid.
* [ ] Heteroskedasticity only affects time series models, so this finding is a coding bug.
