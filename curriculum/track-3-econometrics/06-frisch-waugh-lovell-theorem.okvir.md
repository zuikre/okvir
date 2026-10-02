---
id: "frisch-waugh-lovell-theorem"
version: "1.0.0"
title: "The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out"
track: "econometrics"
module: "mod-20"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus", "four-fundamental-subspaces"]
i18n:
  ar: "مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات"
---

# The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose an economist is studying the gender wage gap at a technology firm. The raw data shows male engineers earn $15,000 more on average than female engineers. But critics immediately object: *"Wait! Men in this dataset have an average of 8 years of tenure, while women have an average of 4 years because the company only recently expanded hiring. Is the gap driven by discrimination, or simply by tenure?"*

To isolate the pure effect of gender holding tenure constant, you could run a multiple regression with both variables. But the celebrated **Frisch-Waugh-Lovell (FWL) Theorem** reveals an astonishing 3-step 'cleansing' procedure that achieves the exact same answer:

1. **Clean Salary:** Regress salary on tenure alone and take the residuals. This gives the *cleansed salary*—the variation in pay that has nothing to do with tenure.
2. **Clean Gender:** Regress gender on tenure and take the residuals. This gives *cleansed gender*—the variation in gender that is completely unrelated to tenure.
3. **The Payoff:** Run a simple bivariate regression of cleansed salary on cleansed gender!

The slope of this bivariate regression is **mathematically identical to the multiple regression coefficient**! 

FWL proves that multiple regression is not a black box: every coefficient in a multiple regression is simply a simple bivariate regression after all other variables have been purged ('partialled out') from both the feature and the outcome!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Partialling Out** | Scrubbing away the influence of confounding variables to isolate clean residual variance. |
| **FWL Theorem** | The proof that multiple regression coefficients equal bivariate slopes on purged residuals. |
| **Auxiliary Regression** | A behind-the-scenes regression of one feature on all other features. |
| **Residualized Feature** | The pure, unique part of a feature that cannot be predicted by other features. |
| **Net Effect** | The isolated causal or predictive impact after stripping all competing explanations. |

```text
    THE 3-STEP FWL CLEANSING PIPELINE:

    [ Raw Salary (y) ] -------- Regress on Tenure (X2) -------> [ Clean Salary (e_y) ]
                                                                       |
                                                               (Simple Bivariate
                                                                  Regression)
                                                                       v
    [ Raw Gender (X1) ] ------- Regress on Tenure (X2) -------> [ Clean Gender (e_X1) ]
                                                                       |
                                                             Slope = beta_1 (Exact!)
```

### الحدس والقصة الواقعية

تخيل باحثًا اقتصاديًا يدرس فجوة الرواتب بين الجنسين في شركة تكنولوجيا. تظهر البيانات الأولية أن المهندسين الذكور يتقاضون في المتوسط 15,000 دولار سنويًا أكثر من الإناث. ولكن يعترض البعض فورًا: *"مهلاً! متوسط سنوات أقدمية الذكور في الشركة 8 سنوات، بينما متوسط أقدمية الإناث 4 سنوات بسبب توسع التوظيف حديثًا. فهل الفجوة ناتجة عن التمييز أم عن سنوات الخبرة والأقدمية؟"*

لعزل الأثر الصافي للجنس مع تثبيت الأقدمية، يمكن تشغيل انحدار متعدد. لكن **مبرهنة فريش-وو-لوفيل (FWL Theorem)** الشهيرة تكشف عن آلية عبقرية من 3 خطوات تنقية تعطي النتيجة ذاتها بالضبط:

1. **تنقية الراتب:** نقوم بانحدار الراتب على سنوات الأقدمية ونستخرج البواقي. هذا هو *الراتب المنقى* من أي أثر للأقدمية.
2. **تنقية متغير الجنس:** نقوم بانحدار متغير الجنس على سنوات الأقدمية ونستخرج البواقي. هذا هو *الجنس المنقى* الخالي من أي ارتباط بالأقدمية.
3. **حساب الأثر الصافي:** نجري انحدارًا بسيطًا بين الراتب المنقى والجنس المنقى!

ميل هذا الخط البسيط **يتطابق رياضيًا بنسبة 100% مع معامل الانحدار المتعدد المعقد**!

تثبت مبرهنة FWL أن الانحدار المتعدد ليس صندوقًا أسود غامضًا، بل هو في جوهره انحدار بسيط بين متغيرات تم تطهيرها وتنقية شوائبها من أثر بقية المتغيرات المشتركة.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **التنقية والعزل (Partialling Out)** | غسل المتغير وتطهيره من تأثيرات المتغيرات المربكة الأخرى لاستخراج تباينه النقي. |
| **مبرهنة FWL** | برهان رياضي يثبت أن معاملات الانحدار المتعدد تكافئ ميل انحدار بسيط للبواقي المنقاة. |
| **الانحدار المساعد (Auxiliary Regression)** | انحدار تحضيري داخلي لمتغير مستقل على بقية المتغيرات المستقلة الأخرى. |
| **المتغير المتبقي المنقى** | الجزء الصافي الفريد من المتغير الذي لا تستطيع المتغيرات الأخرى التنبؤ به. |
| **الأثر الصافي (Net Effect)** | القوة التفسيرية الحقيقية للمتغير بعد استبعاد وتجريد كل التفسيرات البديلة. |

:::simulation-widget{engine="canvas2d" component="FWLPartiallingOutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Partition the design matrix $\mathbf{X} = [\mathbf{X}_1 \quad \mathbf{X}_2]$ where $\mathbf{X}_1$ contains the regressors of primary interest and $\mathbf{X}_2$ contains the control covariates:

$$
\mathbf{y} = \mathbf{X}_1 \boldsymbol{\beta}_1 + \mathbf{X}_2 \boldsymbol{\beta}_2 + \boldsymbol{\varepsilon}
$$

Let $\mathbf{M}_2 = \mathbf{I}_N - \mathbf{X}_2(\mathbf{X}_2^T \mathbf{X}_2)^{-1}\mathbf{X}_2^T$ be the annihilator matrix for $\mathbf{X}_2$. Pre-multiplying the entire equation by $\mathbf{M}_2$:

$$
\mathbf{M}_2 \mathbf{y} = \mathbf{M}_2 \mathbf{X}_1 \boldsymbol{\beta}_1 + \mathbf{M}_2 \mathbf{X}_2 \boldsymbol{\beta}_2 + \mathbf{M}_2 \boldsymbol{\varepsilon}
$$

Because $\mathbf{M}_2 \mathbf{X}_2 = \mathbf{0}$, the second term vanishes completely:

$$
\tilde{\mathbf{y}} = \tilde{\mathbf{X}}_1 \boldsymbol{\beta}_1 + \tilde{\boldsymbol{\varepsilon}} \implies \hat{\boldsymbol{\beta}}_1 = (\tilde{\mathbf{X}}_1^T \tilde{\mathbf{X}}_1)^{-1} \tilde{\mathbf{X}}_1^T \tilde{\mathbf{y}}
$$

where $\tilde{\mathbf{y}} = \mathbf{M}_2 \mathbf{y}$ and $\tilde{\mathbf{X}}_1 = \mathbf{M}_2 \mathbf{X}_1$ are the residual vectors obtained by regressing $\mathbf{y}$ and $\mathbf{X}_1$ on $\mathbf{X}_2$.

### Why the Math Works Step-by-Step

1. **Why does the Annihilator isolate $\boldsymbol{\beta}_1$?**
   Because $\mathbf{M}_2$ projects every column of $\mathbf{X}_2$ onto zero, it strips away any variation in $\mathbf{y}$ and $\mathbf{X}_1$ that can be linearly predicted by $\mathbf{X}_2$. What remains in $\tilde{\mathbf{X}}_1$ is the unique, orthogonal variation of $\mathbf{X}_1$ independent of $\mathbf{X}_2$.
2. **Equivalence of residuals:**
   The residuals from the bivariate regression of $\tilde{\mathbf{y}}$ on $\tilde{\mathbf{X}}_1$ are mathematically identical to the full multiple regression residuals $\mathbf{e} = \mathbf{y} - \mathbf{X}_1\hat{\boldsymbol{\beta}}_1 - \mathbf{X}_2\hat{\boldsymbol{\beta}}_2$.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{X}_1$: Regressors of interest (e.g., policy treatment or gender).
* $\mathbf{X}_2$: Matrix of control covariates (e.g., tenure, age, education).
* $\mathbf{M}_2$: Annihilator matrix projecting onto the orthogonal complement of $\text{col}(\mathbf{X}_2)$.
* $\tilde{\mathbf{X}}_1 = \mathbf{M}_2 \mathbf{X}_1$: Residualized regressors purged of all collinearity with $\mathbf{X}_2$.
* $\tilde{\mathbf{y}} = \mathbf{M}_2 \mathbf{y}$: Residualized outcome purged of all variation explained by $\mathbf{X}_2$.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\mathbf{X}_1$ | المتغير محل الاهتمام | المتغير الذي نريد دراسة أثره الصافي المعزول (مثل برنامج التدريب أو الجنس). |
| $\mathbf{X}_2$ | مصفوفة المتغيرات الضابطة | العوامل المربكة التي نريد تحييدها وتثبيتها (مثل العمر وسنوات الأقدمية). |
| $\mathbf{M}_2$ | مصفوفة عزل المتغيرات الضابطة | المشغل الرياضي الذي يبيد تمامًا أثر المتغيرات $\mathbf{X}_2$ من أي متجه يضربه. |
| $\tilde{\mathbf{X}}_1$ | المتغير المنقى | التباين الفريد النقي لـ $\mathbf{X}_1$ الذي لا تشترك فيه إطلاقًا مع $\mathbf{X}_2$. |
| $\tilde{\mathbf{y}}$ | النتيجة المنقاة | تباين الهدف الصافي بعد تجريده من أثر المتغيرات الضابطة $\mathbf{X}_2$. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the three-step Frisch-Waugh-Lovell partialling out algorithm and verify that it produces coefficients identical to the full multiple regression.

:::python-challenge{id="py-frisch-waugh-lovell-theorem"}
---
timeout_ms: 3000
test_cases:
  - input: "b_partial, b_full = fwl_partial_regression(np.array([2.0, 3.0, 5.0, 7.0]), np.array([[1.0], [2.0], [3.0], [4.0]]), np.ones((4, 1))); round(float(b_partial[0]), 4) == round(float(b_full[0]), 4)"
    expected: "True"
  - input: "b_partial, b_full = fwl_partial_regression(np.array([4.0, 6.0, 9.0]), np.array([[1.0], [3.0], [5.0]]), np.array([[2.0], [1.0], [4.0]])); round(float(b_partial[0] - b_full[0]), 6)"
    expected: "0.0"
  - input: "b_p, b_f = fwl_partial_regression(np.array([10.0, 20.0, 30.0]), np.array([[1.0], [2.0], [3.0]]), np.array([[5.0], [5.0], [5.0]])); round(float(b_p[0]), 4)"
    expected: "10.0"
---
```python
import numpy as np

def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray | float]:
    """
    Implements the Frisch-Waugh-Lovell (FWL) partialling-out theorem.

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Target outcome vector.
    X1 : np.ndarray of shape (N, K1)
        Regressors of primary interest.
    X2 : np.ndarray of shape (N, K2)
        Control covariates to partial out.

    Returns
    -------
    dict with keys 'beta_1', 'residuals_1', 'y_tilde', 'X1_tilde'
    """
    # Step 1: Form the Annihilator matrix M2 = I - X2 (X2^T X2)^(-1) X2^T
    n = len(y)
    M2 = np.eye(n) - X2 @ np.linalg.inv(X2.T @ X2) @ X2.T

    # Step 2: Purge the control covariates from target y: y_tilde = M2 y
    y_tilde = M2 @ y

    # Step 3: Purge the control covariates from regressors X1: X1_tilde = M2 X1
    X1_tilde = M2 @ X1

    # Step 4: Run simple regression of y_tilde on X1_tilde to get beta_1
    beta_1 = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)

    # Step 5: Compute clean residuals
    residuals_1 = y_tilde - X1_tilde @ beta_1

    return {
        "beta_1": beta_1 if beta_1.ndim > 0 and len(beta_1) > 1 else float(beta_1.squeeze()),
        "residuals_1": residuals_1,
        "y_tilde": y_tilde,
        "X1_tilde": X1_tilde,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A labor economist estimates the gender wage gap by regressing log wages on a female indicator while controlling for detailed occupation fixed effects and cumulative job experience. A critic argues: *"Your regression is completely meaningless because women and men do not work in the same occupations, so you cannot compare them."*

How does the FWL theorem refute or clarify this critique?

* [ ] The critic is correct because OLS cannot handle discrete categorical controls.
* [x] The FWL theorem proves that the coefficient on the female indicator is estimated strictly using the within-occupation variation that remains after purging occupation and experience differences ($\tilde{\mathbf{X}}_1$); it compares men and women who share the same occupation and experience.
* [ ] FWL proves that controlling for occupation automatically eliminates all omitted variable bias across the economy.
* [ ] The critic is correct because partialling out changes the sign of the true causal effect.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
The FWL theorem provides exact geometric transparency into the mechanics of multiple regression: by partialling out occupation indicators ($\mathbf{X}_2$), any cross-occupation wage differences are completely absorbed by $\mathbf{M}_2 \mathbf{y}$ and $\mathbf{M}_2 \mathbf{X}_1$. What remains in the regressor $\tilde{\mathbf{X}}_1$ is only the variation in gender *within* each occupation. Thus, the slope $\hat{\boldsymbol{\beta}}_1$ compares the wages of men and women working in identical occupational classifications with identical observed experience.

**Why the distractors are incorrect:**
1. *The critic is correct because OLS cannot handle discrete controls...*: OLS handles categorical variables with complete mathematical rigor via indicator matrices and dummy projections.
2. *FWL proves that controlling for occupation eliminates all omitted variable bias...*: FWL is an algebraic identity, not an exogeneity guarantee. If unobserved productivity or caregiving responsibilities remain in the error term, the estimate is still confounded. Furthermore, occupation itself is partly a choice influenced by labor market discrimination (a mediator / bad control).
3. *Partialling out changes the sign of the true causal effect...*: While Simpson's paradox can cause signs to flip when confounding is resolved, FWL does not distort true effects; it isolates the exact conditional linear relationship.

*الشرح باللغة العربية:*
تبرهن مبرهنة FWL أن التحكم في المهنة يمحو الفروق بين المهن تمامًا عبر مصفوفة الإبادة $\mathbf{M}_2$. وما يتبقى في متغير النوع الاجتماعي $\tilde{\mathbf{X}}_1$ هو التباين *داخل المهنة الواحدة فقط*. وبالتالي، فإن المعامل يقارن بدقة بين أجور الرجال والنساء الذين يشتركون في نفس المهنة وسنوات الخبرة. ومع ذلك، ينبهنا التحليل السببي إلى أن المهنة قد تكون "أداة تحكم سيئة" (Bad Control) لأن التفرقة في التوظيف قد تؤثر على اختيار المهنة نفسه! مبرهنة FWL تصف ميكانيكا الحساب، بينما التفكير السببي يحدد مشروعية النموذج.
