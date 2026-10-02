---
id: "goodness-of-fit-r-squared"
version: "1.0.0"
title: "Goodness-of-Fit, R-squared, and the ANOVA Decomposition"
track: "econometrics"
module: "mod-18"
estimated_minutes: 15
prerequisites: ["ols-residual-geometry"]
i18n:
  ar: "جودة التوفيق ومعامل التحديد والتفكيك التبايني"
---

# Goodness-of-Fit, R-squared, and the ANOVA Decomposition

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Imagine you manage a real estate agency. You notice that house prices swing wildly: some sell for $200,000, others for $800,000. If you have no information about a newly listed home, your best blind guess is simply the average price of all houses in the city (say, $450,000). The total spread of actual house prices around this baseline average is the **Total Variation** in your market.

Now, you build a simple regression model using floor area (square footage). Your model predicts that a 3,000 sq ft home should sell for $720,000. When that home actually sells for $750,000, two things happened:
1. Floor area explained a massive leap: jumping from the baseline $450,000 up to $720,000. This is the **Explained Variation**.
2. But your model still missed the final sale price by $30,000. That leftover gap is the **Unexplained Residual Noise**.

The Analysis of Variance (ANOVA) decomposition proves that because your prediction line balances errors perfectly at right angles ($90^\circ$), total market spread splits cleanly into two parts: $\text{Total Spread} = \text{Explained Signal} + \text{Residual Noise}$. The coefficient of determination, $R^2$, is simply the percentage of total price variance captured by your features (e.g., $R^2 = 0.80$ means 80% explained, 20% noise).

Crucially, we must untangle predictive accuracy from causal truth. A high $R^2$ does not mean you found the cause! For example, regressing children's reading level on shoe size yields a sky-high $R^2 = 0.85$ purely because older children have larger feet and read better. Buying bigger shoes will not teach a toddler to read. Conversely, an effective medical treatment might explain only 3% of recovery variance ($R^2 = 0.03$) because human genetics vary wildly, yet that 3% represents a life-saving causal impact.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Total Sum of Squares (TSS)** | Total market variation: how wildly actual outcomes spread around the sample average. |
| **Explained Sum of Squares (ESS)** | Explained signal: how much variance the regression model successfully accounts for. |
| **Residual Sum of Squares (SSR)** | Leftover noise: the squared errors where the model's predictions missed reality. |
| **R-squared ($R^2$)** | The scoreboard: the percentage of total variation explained by the model ($0.0$ to $1.0$). |
| **Adjusted R-squared ($\bar{R}^2$)** | The honest referee: penalizes adding useless features that only memorize random noise. |

```text
  House Price ($)
    ^
    |                                   * Actual Price ($750k)
    |                                 / |
    |                                /  | Residual Noise (SSR): $30k gap
    |                Fitted Value ->/---+ ($720k)
    |                             /     |
    |                           /       | Explained Signal (ESS): $270k gain
    |                         /         |
    |  - - - - - - - - - - - / - - - - -+ - - Baseline Average (y_bar = $450k)
    |                      /
    |                    /
    0-------------------+-------------------------> Square Footage
```

### الحدس والقصة الواقعية

تخيل أنك تدير شركة عقارية. تلاحظ أن أسعار المنازل تتفاوت بشدة: بعضها يباع بـ 200,000 دولار وبعضها بـ 800,000 دولار. إذا لم تكن تملك أي معلومة عن منزل معروض للبيع، فإن تخمينك الأولي الوحيد هو متوسط سعر السوق (وليكن 450,000 دولار). هذا التشتت الكلي لأسعار المنازل حول المتوسط يسمى **التباين الإجمالي**.

الآن، قمت بإنشاء نموذج انحدار يعتمد على مساحة المنزل بالقدم المربع. توقع نموذجك أن منزلاً مساحته 3000 قدم مربع سيباع بـ 720,000 دولار. وعندما بيع المنزل فعليًا بـ 750,000 دولار، انقسم الفارق إلى جزأين:
1. قفزة فسرها النموذج: الانتقال من المتوسط العام (450 ألف) إلى توقع النموذج (720 ألف). هذا هو **التباين المفسَّر**.
2. فجوة متبقية أخطأ فيها النموذج: الفارق البالغ 30,000 دولار بين الواقع والتوقع. هذا هو **باقي الخطأ العشوائي**.

تثبت مبرهنة تفكيك التباين (ANOVA) أن التباين الكلي ينقسم تمامًا إلى: $\text{التباين الكلي} = \text{الإشارة المفسرة} + \text{التشويش العشوائي}$. ويمثل معامل التحديد $R^2$ النسبة المئوية من تباين السوق التي فسرها النموذج.

والأهم هو إدراك الفرق بين التنبؤ والسببية: ارتفاع $R^2$ لا يعني أبدًا أنك اكتشفت السبب الحقيقي! فانحدار مهارة القراءة عند الأطفال على مقاس أحذيتهم يعطي $R^2 = 0.85$ بسبب عامل العمر المشترك، ولكن شراء أحذية كبيرة لن يعلم الطفل القراءة. وعلى النقيض، قد يعطي دواء منقذ للحياة $R^2 = 0.03$ فقط لتفاوت جينات البشر، ومع ذلك فهو أثر سببي حقيقي ينقذ الأرواح.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **مجموع المربعات الكلي (TSS)** | إجمالي تشتت الظاهرة: مدى ابتعاد القيم الحقيقية عن المتوسط العام للعينة. |
| **مجموع المربعات المفسر (ESS)** | إشارة النموذج: مقدار التباين الذي نجحت المتغيرات المستقلة في تفسيره. |
| **مجموع مربعات البواقي (SSR)** | التشويش المتبقي: مجموع أخطاء التنبؤ التي عجز النموذج عن تفسيرها. |
| **معامل التحديد ($R^2$)** | لوحة النتائج: النسبة المئوية للتباين المفسر بالنموذج (بين 0 و 1). |
| **معامل التحديد المعدل ($\bar{R}^2$)** | الحكم النزيه: يفرض غرامة على إضافة متغيرات تافهة تعتمد على الصدفة. |

:::simulation-widget{engine="canvas2d" component="ColumnSpaceProjection3D"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

When a regression includes an intercept term $\boldsymbol{\iota}_N$, the residuals sum to zero ($\sum_{i=1}^N e_i = 0$), guaranteeing that the sample mean of fitted values equals the sample mean of outcomes: $\bar{y} = \bar{\hat{y}}$.

### Why the Math Works Step-by-Step

1. **Why does the cross-product vanish?**
   When squaring $((\hat{y}_i - \bar{y}) + e_i)$, the cross-product term is $2 \sum (\hat{y}_i - \bar{y})e_i = 2 (\hat{\mathbf{y}} - \bar{y}\boldsymbol{\iota})^T \mathbf{e}$. Because OLS residuals are strictly orthogonal to the fitted values ($\hat{\mathbf{y}}^T \mathbf{e} = 0$) and sum to zero ($\boldsymbol{\iota}^T \mathbf{e} = 0$), this cross-product is identically zero! Pythagoras in $N$ dimensions guarantees:
   $$
   \text{TSS} = \text{ESS} + \text{SSR}
   $$
2. **Why does adding random noise always increase unadjusted $R^2$?**
   Every added variable expands the column space of $\mathbf{X}$. Even if a variable is pure random noise (like coin flips), it has a tiny accidental alignment with $\mathbf{y}$, which decreases SSR and mechanically drives $R^2 = 1 - \frac{\text{SSR}}{\text{TSS}}$ upward.
3. **How does Adjusted $R^2$ solve this?**
   Adjusted $R^2$ divides SSR and TSS by their respective degrees of freedom:
   $$
   \bar{R}^2 = 1 - \frac{\text{SSR} / (N - p - 1)}{\text{TSS} / (N - 1)}
   $$
   Adding a useless variable costs 1 degree of freedom ($N - p - 1$ shrinks), which increases the penalty unless the new variable reduces SSR by more than random chance!

### Algebraic Derivation of the ANOVA Identity

Express each centered observation $y_i - \bar{y}$ by adding and subtracting fitted $\hat{y}_i$:

$$
y_i - \bar{y} = (\hat{y}_i - \bar{y}) + (y_i - \hat{y}_i) = (\hat{y}_i - \bar{y}) + e_i
$$

Squaring both sides and summing across all observations $i = 1, \dots, N$:

$$
\sum_{i=1}^N (y_i - \bar{y})^2 = \sum_{i=1}^N (\hat{y}_i - \bar{y})^2 + \sum_{i=1}^N e_i^2 + 2 \sum_{i=1}^N (\hat{y}_i - \bar{y})e_i
$$

Because $\sum_{i=1}^N (\hat{y}_i - \bar{y})e_i = \hat{\boldsymbol{\beta}}^T \mathbf{X}^T \mathbf{e} - \bar{y} \sum e_i = 0 - 0 = 0$:

$$
\text{TSS} = \text{ESS} + \text{SSR} \implies R^2 = \frac{\text{ESS}}{\text{TSS}} = 1 - \frac{\text{SSR}}{\text{TSS}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\text{TSS} = \sum_{i=1}^N (y_i - \bar{y})^2$: Total Sum of Squares with $N - 1$ degrees of freedom.
* $\text{ESS} = \sum_{i=1}^N (\hat{y}_i - \bar{y})^2$: Explained Sum of Squares with $p$ degrees of freedom.
* $\text{SSR} = \sum_{i=1}^N e_i^2$: Residual Sum of Squares with $N - p - 1$ degrees of freedom.
* $R^2 = 1 - \frac{\text{SSR}}{\text{TSS}}$: Unadjusted sample coefficient of determination.
* $\bar{R}^2 = 1 - \frac{\text{SSR}/(N - p - 1)}{\text{TSS}/(N - 1)}$: Degrees-of-freedom adjusted $R^2$.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\text{TSS}$ | مجموع المربعات الكلي | قياس تشتت البيانات الأصلية حول متوسطها الحسابي بدرجات حرية $N-1$. |
| $\text{ESS}$ | مجموع المربعات المفسر | التباين الإيجابي الذي فسره خط الانحدار بدرجات حرية $p$. |
| $\text{SSR}$ | مجموع مربعات الأخطاء | تباين الفروق العشوائية غير المفسرة بدرجات حرية $N-p-1$. |
| $R^2$ | معامل التحديد | نسبة التباين المفسر الأصلية غير المعاقبة على كثرة المتغيرات. |
| $\bar{R}^2$ | معامل التحديد المعدل | المقياس النزيه الذي يعاقب النموذج عند إضافة متغيرات عديمة الفائدة. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the full ANOVA variance decomposition and compute both $R^2$ and Adjusted $R^2$ in NumPy. Ensure your degrees of freedom correctly separate the total sample size $N$ from the slope count $p$.

:::python-challenge{id="py-goodness-of-fit-r-squared"}
---
timeout_ms: 3000
test_cases:
  - input: "compute_r2_anova(np.array([2.0, 4.0, 6.0]), np.array([2.0, 4.0, 6.0]), 1)['r2']"
    expected: "1.0"
  - input: "round(compute_r2_anova(np.array([1.0, 2.0, 3.0, 4.0, 5.0]), np.array([1.2, 1.8, 3.1, 3.9, 5.0]), 1)['r2'], 4)"
    expected: "0.993"
  - input: "compute_r2_anova(np.array([10.0, 20.0, 30.0]), np.array([10.0, 20.0, 30.0]), 1)['ssr']"
    expected: "0.0"
---
```python
import numpy as np

def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:
    """
    Computes the ANOVA variance decomposition, unadjusted R^2, and adjusted R^2.

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed target values.
    y_hat : np.ndarray of shape (N,)
        Model fitted predictions.
    p : int
        Number of explanatory slope features (excluding intercept).

    Returns
    -------
    dict with keys 'tss', 'ess', 'ssr', 'r2', 'adj_r2'
    """
    n = len(y)
    y_mean = float(np.mean(y))

    # Step 1: Calculate Total Sum of Squares (spread around average baseline)
    tss = float(np.sum((y - y_mean) ** 2))

    # Step 2: Calculate Explained Sum of Squares (signal captured by predictions)
    ess = float(np.sum((y_hat - y_mean) ** 2))

    # Step 3: Calculate Residual Sum of Squares (unexplained error noise)
    ssr = float(np.sum((y - y_hat) ** 2))

    # Step 4: Compute unadjusted R^2
    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0

    # Step 5: Compute degrees-of-freedom adjusted R^2
    df_total = n - 1
    df_resid = n - p - 1
    if df_resid > 0 and tss > 0:
        adj_r2 = 1.0 - ((ssr / df_resid) / (tss / df_total))
    else:
        adj_r2 = 0.0

    return {
        "tss": tss,
        "ess": ess,
        "ssr": ssr,
        "r2": float(r2),
        "adj_r2": float(adj_r2),
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A macroeconomist attempts to forecast national GDP growth using a dataset of $N = 50$ quarters. She includes $p = 48$ random stock tickers in her regression and observes an astounding $R^2 = 0.985$. A colleague running a simple two-variable monetary model ($p = 2$) gets $R^2 = 0.320$.

Which model is more credible for policy analysis, and what does this illustrate about $R^2$?

* [ ] The 48-ticker model is superior because $R^2 = 0.985$ proves it captures $98.5\%$ of true macroeconomic reality.
* [x] The two-variable model is far more credible; with $N=50$ and $p=48$, the high $R^2$ is an algebraic illusion of overfitting (since $K \approx N$ forces the hyperplane through nearly every data point regardless of causal reality).
* [ ] Both models are equally valid because OLS is always the Best Linear Unbiased Estimator (BLUE).
* [ ] The 48-ticker model proves that stock prices cause macroeconomic GDP growth.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
When the number of parameters $K = p + 1$ approaches sample size $N$ (here $49 \approx 50$), the subspace $\text{col}(\mathbf{X})$ has dimension 49 in a 50-dimensional universe $\mathbb{R}^{50}$. The residual vector $\mathbf{e}$ is confined to a tiny 1-dimensional subspace ($N - K = 1$), forcing SSR close to 0 and $R^2$ toward 1 purely by linear algebra geometry! This is total overfitting: the model memorizes in-sample random fluctuations and produces disastrously inaccurate out-of-sample counterfactual policy forecasts. The parsimonious two-variable model with $R^2 = 0.32$ leaves 47 degrees of freedom ($N - K = 47$) and captures structural macroeconomic relationships.

**Why the distractors are incorrect:**
1. *The 48-ticker model is superior...*: Confuses in-sample curve fitting with macroeconomic truth. An $R^2 = 1.0$ can be achieved trivially on any $N$ data points with $N - 1$ random variables.
2. *Both models are equally valid because OLS is always BLUE...*: The Gauss-Markov theorem requires spherical errors and strict exogeneity $\mathbb{E}[\boldsymbol{\varepsilon} \mid \mathbf{X}] = \mathbf{0}$. Regressing macro variables on 48 arbitrary stock tickers violates exogeneity and creates catastrophic variance inflation.
3. *The 48-ticker model proves stock prices cause GDP growth...*: Classic conflation of correlation with causation. Stock prices may reflect anticipated future growth (reverse causality) or general liquidity without driving physical economic production.

*الشرح باللغة العربية:*
عندما يقترب عدد المتغيرات $K = 49$ من حجم العينة $N = 50$، فإن فضاء الانحدار يشغل 49 بعدًا من أصل 50 بعدًا في فضاء العينة. يتبقى للبواقي بعد واحد فقط ($N - K = 1$)، مما يجبر المسافة العمودية على الاقتراب من الصفر ويرفع $R^2$ تلقائيًا إلى ما يقارب 1 بفعل الجبر الخطي وليس بسبب أي حقيقة اقتصادية! هذا النموذج يعاني من فرط تخصيص كارثي (Overfitting)؛ فهو يحفظ عشوائية الماضي ويفشل حتمًا في التنبؤ بسياسات المستقبل. أما نموذج المتغيرين مع $R^2 = 0.32$ فهو الأوثق علميًا وسياساتيًا.
