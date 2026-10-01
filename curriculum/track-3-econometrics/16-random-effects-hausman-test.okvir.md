---
id: "random-effects-hausman-test"
version: "1.0.0"
title: "Random Effects, First-Differencing, and the Hausman Test"
track: "econometrics"
module: "mod-25"
estimated_minutes: 15
prerequisites: ["panel-data-fixed-effects"]
i18n:
  ar: "الآثار العشوائية والفروق الأولى واختبار هاوسمان"
---

# Random Effects, First-Differencing, and the Hausman Test

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

In panel data econometrics, researchers face a high-stakes fork in the road: **Fixed Effects (FE) versus Random Effects (RE)**.

* **Fixed Effects is the ultra-cautious skeptic:** It allows unobserved individual personality, grit, or corporate culture ($\alpha_i$) to correlate arbitrarily with your explanatory variables. But to buy that safety, it throws away all between-entity differences and completely destroys any variable that does not change over time.
* **Random Effects is the optimistic pragmatist:** It asks: *"What if unobserved individuality $\alpha_i$ is completely uncorrelated with our regressors?"* If that assumption is true, throwing away between-person comparisons is wasteful! Instead of full de-meaning, RE applies **quasi-demeaning** via Generalized Least Squares (GLS): it subtracts only a fraction $\theta \in [0, 1]$ of the entity mean. This keeps time-invariant variables alive and yields much tighter, more efficient standard errors.

How do empirical scientists decide which road to take? **The Hausman Specification Test** stages a formal showdown between the two estimators:
* **Under the Null Hypothesis ($H_0$: Exogeneity):** Both FE and RE are consistent and converge to the true parameter, but RE is more efficient. Their estimates should be virtually identical, differing only by random sampling noise.
* **Under the Alternative Hypothesis ($H_1$: Endogeneity):** RE is biased, corrupted, and invalid because $\alpha_i$ confounds the regressors. FE remains completely consistent and immune to this bias!

If the difference between $\hat{\boldsymbol{\beta}}_{\text{FE}}$ and $\hat{\boldsymbol{\beta}}_{\text{RE}}$ is too large to be explained by chance, the Hausman test sounds the alarm: **reject Random Effects and trust Fixed Effects!**

في تحليل بيانات البانل، يقف الباحث أمام مفترق طرق حاسم: **مفاضلة الآثار الثابتة (FE) مقابل الآثار العشوائية (RE)**.

* **الآثار الثابتة (FE) هو المتشكك شديد الحذر:** يسمح للخصائص الفردية غير المرصودة ($\alpha_i$) بالارتباط كيفما تشاء بالمتغيرات المستقلة. ولكنه في سبيل هذا الأمان، يهدر كافة الفروق بين الأفراد ويمحو أي متغير لا يتغير مع الزمن.
* **الآثار العشوائية (RE) هو البراغماتي المتفائل:** يتساءل: *"ماذا لو كانت الخصائص الفردية $\alpha_i$ مستقلة تمامًا وغير مرتبطة بمتغيراتنا؟"* إذا صح هذا الفرض، فإن إهدار المقارنات بين الأفراد يعد خسارة فادحة في الدقة! بدلاً من طرح المتوسط كاملاً، يطبق RE **طرحًا جزئيًا (Quasi-Demeaning)** عبر المربعات الصغرى المعممة (GLS): فهو يطرح نسبة معينة $\theta \in [0, 1]$ فقط من المتوسط. يحافظ هذا على المتغيرات الثابتة ويحقق أخطاء معيارية أصغر بكثير وأكثر كفاءة.

كيف يحسم العلم هذا النزاع؟ يضع **اختبار هاوسمان (Hausman Test)** كلا المقدرين في مواجهة حاسمة:
* **في ظل فرضية العدم ($H_0$: الاستقلال الخارجي):** كلا المقدرين متسقان ويقتربان من الحقيقة، لكن RE أكثر كفاءة ودقة. ويجب أن تكون تقديراتهما متطابقة تقريبًا باستثناء فروق عشوائية طفيفة.
* **في ظل الفرضية البديلة ($H_1$: وجود ارتباط داخلي):** ينحاز مقدر RE ويسقط في الخطأ بسبب ارتباط $\alpha_i$ بالمتغيرات، بينما يظل مقدر FE صامدًا ومتسقًا لا يتأثر!

إذا كان التباعد بين تقدير FE وتقدير RE أكبر مما يمكن للصدفة تفسيره، يطلق اختبار هاوسمان صافرة الإنذار: **ارفض الآثار العشوائية واعتمد الآثار الثابتة!**

:::simulation-widget{engine="canvas2d" component="RandomEffectsHausmanLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The Random Effects model assumes that individual unobserved heterogeneity is orthogonal to the regressors:

$$
y_{it} = \mathbf{x}_{it}^T \boldsymbol{\beta} + v_{it}, \quad \text{where } v_{it} = \alpha_i + \varepsilon_{it}, \quad \text{with } \mathbb{E}[\alpha_i \mid \mathbf{X}_i] = 0
$$

The composite error covariance matrix for entity $i$ across $T$ periods is equicorrelated:

$$
\boldsymbol{\Sigma}_i \equiv \mathbb{E}[\mathbf{v}_i \mathbf{v}_i^T \mid \mathbf{X}_i] = \sigma_{\varepsilon}^2 \mathbf{I}_T + \sigma_{\alpha}^2 \boldsymbol{\iota}_T \boldsymbol{\iota}_T^T
$$

The Feasible Generalized Least Squares (FGLS) transformation subtracts a fraction $\theta$ of the individual temporal mean:

$$
(y_{it} - \theta \bar{y}_i) = (\mathbf{x}_{it} - \theta \bar{\mathbf{x}}_i)^T \boldsymbol{\beta} + (v_{it} - \theta \bar{v}_i)
$$

The quasi-demeaning weight parameter is governed by the variance ratio:

$$
\theta \equiv 1 - \sqrt{\frac{\sigma_{\varepsilon}^2}{\sigma_{\varepsilon}^2 + T \sigma_{\alpha}^2}} \in [0, 1]
$$
* If $\sigma_{\alpha}^2 \to 0$, then $\theta \to 0$ (yielding Pooled OLS).
* If $\sigma_{\alpha}^2 \to \infty$ or $T \to \infty$, then $\theta \to 1$ (yielding Fixed Effects).

The **Hausman Test Statistic** evaluates the quadratic distance between the two parameter estimates:

$$
H = (\hat{\boldsymbol{\beta}}_{\text{FE}} - \hat{\boldsymbol{\beta}}_{\text{RE}})^T \Big[ \widehat{\mathbb{V}}(\hat{\boldsymbol{\beta}}_{\text{FE}}) - \widehat{\mathbb{V}}(\hat{\boldsymbol{\beta}}_{\text{RE}}) \Big]^{-1} (\hat{\boldsymbol{\beta}}_{\text{FE}} - \hat{\boldsymbol{\beta}}_{\text{RE}}) \xrightarrow{d} \chi^2(K)
$$

Under $H_0: \text{Cov}(\alpha_i, \mathbf{x}_{it}) = \mathbf{0}$, the statistic follows an asymptotic chi-square distribution with $K$ degrees of freedom. A significant $p$-value ($p < 0.05$) indicates that RE is inconsistent, mandating the use of Fixed Effects.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $v_{it} = \alpha_i + \varepsilon_{it}$: Composite error composed of random entity effect $\alpha_i$ and idiosyncratic disturbance $\varepsilon_{it}$.
* $\sigma_{\alpha}^2$: Variance of the individual random effect across the population.
* $\sigma_{\varepsilon}^2$: Variance of the idiosyncratic time-varying disturbance.
* $\theta$: Quasi-demeaning shrinkage parameter determining the weight given to within-entity versus between-entity variation.
* $\hat{\boldsymbol{\beta}}_{\text{FE}}$: Consistent within-estimator under both $H_0$ and $H_1$.
* $\hat{\boldsymbol{\beta}}_{\text{RE}}$: Efficient GLS estimator under $H_0$, but biased and inconsistent under $H_1$.
* $H \sim \chi^2(K)$: Wald-type test statistic testing whether the difference $\hat{\boldsymbol{\beta}}_{\text{FE}} - \hat{\boldsymbol{\beta}}_{\text{RE}}$ is statistically distinguishable from zero.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the Hausman specification test statistic comparing parameter estimates and asymptotic covariance matrices from Fixed Effects and Random Effects models.

:::python-challenge{id="py-random-effects-hausman-test"}
---
timeout_ms: 3000
test_cases:
  - input: "b_fe = np.array([2.0]); v_fe = np.array([[0.04]]); b_re = np.array([2.0]); v_re = np.array([[0.01]]); round(compute_hausman_test(b_fe, v_fe, b_re, v_re)['stat'], 4)"
    expected: "0.0"
  - input: "b_fe = np.array([3.0]); v_fe = np.array([[0.05]]); b_re = np.array([1.0]); v_re = np.array([[0.01]]); round(compute_hausman_test(b_fe, v_fe, b_re, v_re)['stat'], 4)"
    expected: "100.0"
  - input: "b_fe = np.array([1.0, 2.0]); v_fe = np.eye(2)*0.1; b_re = np.array([1.0, 2.0]); v_re = np.eye(2)*0.05; compute_hausman_test(b_fe, v_fe, b_re, v_re)['df']"
    expected: "2"
---
```python
import numpy as np

def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:
    """
    Computes the Hausman quadratic test statistic comparing FE and RE estimates.
    
    Parameters
    ----------
    beta_fe : np.ndarray of shape (K,)
        Fixed Effects coefficient vector.
    vcov_fe : np.ndarray of shape (K, K)
        Fixed Effects covariance matrix.
    beta_re : np.ndarray of shape (K,)
        Random Effects coefficient vector.
    vcov_re : np.ndarray of shape (K, K)
        Random Effects covariance matrix.
        
    Returns
    -------
    dict with keys:
        'stat': float, Hausman chi-square test statistic
        'df': int, degrees of freedom (rank of variance difference)
    """
    # Step 1: Parameter difference vector
    diff = beta_fe - beta_re
    
    # Step 2: Variance difference matrix: V_diff = V_fe - V_re
    vcov_diff = vcov_fe - vcov_re
    
    # Step 3: Compute pseudo-inverse to handle potential singularity
    vcov_diff_inv = np.linalg.pinv(vcov_diff)
    
    # Step 4: Compute quadratic form H = diff^T (V_diff)^(-1) diff
    stat = float(diff.T @ vcov_diff_inv @ diff)
    
    # Ensure non-negative test statistic
    stat = max(0.0, stat)
    
    df = int(np.linalg.matrix_rank(vcov_diff))
    
    return {
        "stat": stat,
        "df": df,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

An empirical labor economist investigates the wage return to joining a trade union using a 20-year panel of manufacturing workers. She fits both models:
* Fixed Effects: $\hat{\beta}_{\text{union}} = 0.06$ ($\text{SE} = 0.02$, $p = 0.003$)
* Random Effects: $\hat{\beta}_{\text{union}} = 0.19$ ($\text{SE} = 0.01$, $p < 0.0001$)

The Hausman test statistic yields $H = 42.8$ ($p < 0.00001$), decisively rejecting the null hypothesis $H_0$.

What is the substantive economic conclusion, and which coefficient should the policymaker rely upon?

* [ ] Rely on Random Effects because its standard error is twice as small ($\text{SE}=0.01$), making it more efficient and reliable.
* [x] Rely on Fixed Effects ($\hat{\beta} = 0.06$); the statistical rejection proves that unobserved worker characteristics (such as baseline skill or motivation) correlate with union membership, causing Random Effects to suffer from severe upward omitted variable bias.
* [ ] The rejection means both models are mathematically invalid and union membership has no effect on wages.
* [ ] The researcher should take the arithmetic average of the two estimates $(0.06 + 0.19) / 2 = 0.125$.
