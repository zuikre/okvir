---
id: "regression-discontinuity-sharp"
version: "1.0.0"
title: "Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression"
track: "econometrics"
module: "mod-27"
estimated_minutes: 15
prerequisites: ["frisch-waugh-lovell-theorem", "selection-bias-randomized-trials"]
i18n:
  ar: "تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي"
---

# Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose a prestigious university offers full-tuition merit scholarships to all applicants who score 80.0% or higher on an entrance examination. You want to measure: *does winning this scholarship cause higher lifetime career earnings?*

If you simply compare all scholarship winners (who scored 80% to 100%) against non-winners (who scored 0% to 79%), your study is heavily confounded. Students who score 95% possess extraordinary natural talent, better prior schooling, and wealthier family backgrounds.

Now zoom in on the razor's edge of the cutoff:
* **Student Alice** scored **80.1%** and won the full scholarship.
* **Student Bob** scored **79.9%** and received nothing.

Is Alice a genius and Bob unmotivated? Of course not! That tiny 0.2% gap was pure luck—a broken pencil lead, a distracting sneeze in the exam hall, or one lucky guess on a multiple-choice question.

Alice and Bob are virtually identical twins in every conceivable dimension: ability, family background, and work ethic. Yet Alice gets free tuition while Bob pays full price!

This is the beauty of **Sharp Regression Discontinuity Design (RDD)**. Right at the threshold, nature runs an almost perfect randomized trial. Any sudden vertical jump in future career earnings at the 80.0% mark can be attributed squarely to the causal impact of the scholarship!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Running / Forcing Variable ($X$)** | The continuous score or rating used to assign treatment (e.g., exam score). |
| **Cutoff / Threshold ($c$)** | The strict boundary line where treatment turns on (e.g., 80.0%). |
| **Sharp RDD** | The light switch: treatment probability jumps cleanly from 0% to 100% at the cutoff. |
| **Bandwidth ($h$)** | The zoom lens: the narrow window $[c - h, c + h]$ of data points analyzed around the cutoff. |
| **Local Average Treatment Effect** | The causal jump isolated specifically for students near the threshold boundary. |

```text
    THE SHARP RDD DISCONTINUITY JUMP:

    Future Earnings ($)
      ^
      |                                              *   *
      |                                            *   *
      |                                 *  *  * (Treated Curve)
      |                                * |
      |                       Discontinuity Jump (tau)
      |                                * |
      |                    *  *  * (Control Curve)
      |                  *   *
      0-----------------+--------------+-----------------------------> Exam Score (X)
                        c - h          c (Cutoff: 80%)    c + h
```

### الحدس والقصة الواقعية

تخيل جامعة مرموقة تمنح منحًا دراسية كاملة لجميع المتقدمين الذين يحصلون على 80.0% أو أكثر في اختبار القبول. وتريد الإجابة عن سؤال مهم: *هل تسبب هذه المنحة زيادة الدخل المهني للطلاب مستقبلاً؟*

إذا قارنت جميع الحاصلين على المنحة (أصحاب الدرجات من 80% إلى 100%) بغير الحاصلين عليها (من 0% إلى 79%)، ستكون دراستك ملوثة بانحياز شديد؛ فالطلاب أصحاب درجات 95% يملكون مهارات استثنائية وخلفيات أسرية وتعليمية متميزة بطبيعتهم.

ولكن قرّب العدسة وركز على حافة الحد الفاصل تمامًا:
* **الطالبة مريم** حصلت على **80.1%** وفازت بالمنحة الكاملة.
* **الطالب عمر** حصل على **79.9%** وحُرم من المنحة.

هل مريم عبقرية وعمر متكاسل؟ بالتأكيد لا! فهذا الفارق الضئيل (0.2%) كان مجرد صدفة عشوائية بحتة: ارتباك لحظي أو عطسة في قاعة الاختبار.

مريم وعمر متطابقان تمامًا في الذكاء والاجتهاد والظروف الاجتماعية؛ ومع ذلك نالت مريم التعليم المجاني بينما اضطر عمر لدفع الرسوم كاملة!

هذه هي روعة **تصميم انقطاع الانحدار الحاد (Sharp RDD)**؛ فعند نقطة الحد الفاصل تمامًا، تقدم الطبيعة تجربة عشوائية مثالية. وأي قفزة رأسية مفاجئة في رواتب الطلاب عند عتبة 80.0% هي أثر سببي خالص للمنحة!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **المتغير الفاصل (Running Variable)** | المقياس المستمر الذي يحدد استحقاق المعالجة (مثل درجة اختبار القبول). |
| **العتبة / الحد الفاصل ($c$)** | الخط الحاسم الذي ينقلب عنده القرار وتُمنح عنده المعالجة (مثل 80%). |
| **الانقطاع الحاد (Sharp RDD)** | مفتاح الكهرباء: احتمالية تلقي العلاج تقفز فجأة من 0% إلى 100% عند العتبة. |
| **عرض النطاق (Bandwidth - $h$)** | عدسة التقريب: النافذة الضيقة حول العتبة لمقارنة الحالات المتشابهة بدقة. |
| **الأثر السببي الموضعي** | القفزة الرأسية في النتيجة عند حافة العتبة الفاصلة تحديدًا. |

:::simulation-widget{engine="canvas2d" component="SharpRDDCutoffLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In a Sharp RDD, deterministic treatment assignment is governed by forcing variable $X_i$ relative to cutoff $c$:

$$
D_i = \mathbf{1}(X_i \ge c)
$$

The Sharp RDD treatment effect is the jump in expected outcome at cutoff $c$:

$$
\tau_{\text{SRDD}} = \lim_{x \downarrow c} \mathbb{E}[Y \mid X = x] - \lim_{x \uparrow c} \mathbb{E}[Y \mid X = x]
$$

Hahn, Todd, and Van der Klaauw (2001) proved that under the continuity assumption ($\mathbb{E}[Y(0) \mid X=x]$ and $\mathbb{E}[Y(1) \mid X=x]$ are continuous at $c$), $\tau_{\text{SRDD}}$ identifies the causal effect at the cutoff:

$$
\tau_{\text{SRDD}} = \mathbb{E}[Y(1) - Y(0) \mid X = c]
$$

In practice, this is estimated via local linear regression inside bandwidth $h$:

$$
\min_{\alpha, \beta, \tau, \gamma} \sum_{i: |X_i - c| \le h} \left( Y_i - \alpha - \beta(X_i - c) - \tau D_i - \gamma D_i(X_i - c) \right)^2
$$

### Why the Math Works Step-by-Step

1. **Why subtract $c$ from $X_i$ in $(X_i - c)$?**
   Centering the running variable at cutoff $c$ ensures that the intercept $\alpha$ represents the expected control outcome right at the threshold, and $\tau$ represents the exact vertical discontinuity jump at $X = c$!
2. **The Role of Bandwidth $h$:**
   Bandwidth balances a fundamental trade-off:
   * Tiny $h$: Lower bias (comparing very close twins), but higher variance (fewer data points).
   * Wide $h$: Lower variance (more data points), but higher bias (curvature errors from points far from cutoff).

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $X_i$: Running variable continuously measured around cutoff $c$.
* $c$: Policy cutoff threshold.
* $h$: Selected bandwidth determining the estimation neighborhood $[c - h, c + h]$.
* $\tau$: Discontinuity jump parameter measuring treatment effect at cutoff.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\mathbf{1}(X_i \ge c)$ | دالة التفعيل الثنائية | تحول مؤشر المعالجة إلى 1 بمجرد ملامسة أو تجاوز العتبة $c$. |
| $\lim_{x \downarrow c} - \lim_{x \uparrow c}$ | الفارق بين النهايتين | قياس الفجوة الرأسية بين نهاية المنحنى من اليمين ونهايته من اليسار. |
| $(X_i - c)$ | تمركز المتغير الفاصل | طرح العتبة لجعل المعامل $\tau$ يمثل القفزة الصافية عند النقطة $c$ مباشرة. |
| النطاق $h$ | نافذة التوازن البيزية | الموازنة بين دقة التماثل (نطاق ضيق) وحجم العينة الكافي (نطاق واسع). |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a local linear regression estimator for Sharp RDD with a triangular weighting kernel in NumPy. You will:
1. Filter the sample to include only observations falling within the local bandwidth window $[c - h, c + h]$.
2. Compute the centered running variable $\tilde{X}_i = X_i - c$ and the treatment indicator $D_i = \mathbb{I}(X_i \ge c)$.
3. Construct the triangular kernel weight vector $w_i = 1 - \frac{|X_i - c|}{h}$ and assemble the diagonal weight matrix $\mathbf{W}$.
4. Construct the local design matrix $\mathbf{M} = [\mathbf{1}, \mathbf{D}, \tilde{\mathbf{X}}, \mathbf{D} \odot \tilde{\mathbf{X}}]$.
5. Solve the weighted least squares normal equations $(\mathbf{M}^T \mathbf{W} \mathbf{M}) \hat{\boldsymbol{\theta}} = \mathbf{M}^T \mathbf{W} \mathbf{y}$ to isolate the treatment discontinuity $\tau = \hat{\theta}_1$.

:::python-challenge{id="py-regression-discontinuity-sharp"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([9.0, 9.5, 9.8, 10.2, 10.5, 11.0]); y = np.array([20.0, 21.0, 21.5, 32.0, 32.5, 33.0]); res = fit_sharp_rdd_local_linear(x, y, cutoff=10.0, bandwidth=1.0); f\"{res['tau']:.1f}\""
    expected: "10.0"
  - input: "x = np.array([4.0, 4.5, 4.9, 5.1, 5.5, 6.0]); y = np.array([10.0, 11.0, 11.8, 17.2, 18.0, 19.0]); res = fit_sharp_rdd_local_linear(x, y, cutoff=5.0, bandwidth=1.0); f\"{res['tau']:.1f}\""
    expected: "5.0"
---
```python
import numpy as np

def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, c: float, h: float) -> dict[str, float]:
    """
    Fits a local linear regression for Sharp RDD within bandwidth [c - h, c + h].

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed outcomes.
    x : np.ndarray of shape (N,)
        Running variable.
    c : float
        Cutoff threshold.
    h : float
        Bandwidth window.

    Returns
    -------
    dict with keys 'tau_rdd', 'se_rdd'
    """
    # Step 1: Filter observations within bandwidth window [c - h, c + h]
    mask = (x >= c - h) & (x <= c + h)
    y_sub = y[mask]
    x_sub = x[mask]
    n_sub = len(y_sub)

    # Step 2: Construct centered regressors and treatment dummy
    x_centered = x_sub - c
    d_sub = (x_sub >= c).astype(float)
    interaction = d_sub * x_centered

    # Step 3: Design matrix: [1, x_centered, D, interaction]
    X_mat = np.column_stack([np.ones(n_sub), x_centered, d_sub, interaction])

    # Step 4: Fit OLS
    beta = np.linalg.solve(X_mat.T @ X_mat, X_mat.T @ y_sub)
    residuals = y_sub - X_mat @ beta

    tau_rdd = float(beta[2])
    s2 = np.sum(residuals ** 2) / (n_sub - 4)
    vcov = s2 * np.linalg.inv(X_mat.T @ X_mat)
    se_rdd = float(np.sqrt(vcov[2, 2]))

    return {
        "tau_rdd": tau_rdd,
        "se_rdd": se_rdd,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A public development bank grants low-interest capital loans to small businesses with credit risk scores below an administrative cutoff of $c = 600$. 

An analyst attempts to estimate the causal impact of the loan on firm revenues by fitting a global 6th-order polynomial regression across all firms nationwide (credit scores ranging from 300 to 850). The global polynomial reports a massive positive discontinuity jump of $+\$48,000$ at score 600 ($p < 0.001$). 

However, when plotting raw binned scatter plots within 10 points of the cutoff, observations at score 599 and score 601 appear nearly identical, displaying no visible gap.

What critical econometric flaw explains this discrepancy (Gelman & Imbens 2019)?

* [ ] Small business credit scores are discrete integers, which strictly invalidates the rank condition of least squares.
  *درجات الائتمان أرقام صحيحة منفصلة مما يبطل شرط الرتبة للانحدار الخطي.*
  > **Why this is incorrect:** Discrete running variables require clustered standard errors or local randomization inference, but do not produce artificial 50k jumps by themselves.
  > **لماذا هذا الخيار خاطئ:** المتغيرات المنفصلة تتطلب تعديل الأخطاء المعيارية، لكنها لا تخلق قفزات ضخمة زائفة بمفردها.
* [x] High-order global polynomials suffer from boundary instability and Runge's oscillation: distant observations (e.g. at scores 350 and 800) exert excessive leverage on the curve, artificially contorting the polynomial near the boundary and manufacturing a spurious discontinuity.
  *الحدوديات العامة ذات الرتب العالية تعاني من ظاهرة رونغ وعدم استقرار الحواف؛ فالنقاط البعيدة تفرض عزماً شديداً يشوه المنحنى قرب العتبة ويصنع قفزة وهمية.*
  > **Why this is correct:** Gelman and Imbens (2019) demonstrated that high-order global polynomials yield noisy, misleading point estimates because polynomial weights place bizarre, large negative and positive weights on boundary points. Researchers should always prioritize local linear regression.
  > **لماذا هذا الخيار صحيح:** أثبت جيلمان وإمبنز (2019) أن الحدوديات العامة تفرز أوزاناً شاذة على الحدود وتشوه المنحنى؛ والحل القياسي المعتمد هو الانحدار الخطي الموضعي بنطاق ترددي ضيق.
* [ ] The analyst forgot to log-transform credit scores before fitting the polynomial terms.
  *نسي المحلل تحويل درجات الائتمان إلى المقياس اللوغاريثمي قبل الانحدار.*
  > **Why this is incorrect:** Non-linear monotonic transformations do not cure the underlying boundary leverage and oscillation problems of global polynomials.
  > **لماذا هذا الخيار خاطئ:** التحويل اللوغاريثمي لا يعالج التذبذب الحاد للحدوديات العامة عند الحواف.
* [ ] The model had too few observations on the left of the cutoff relative to the right side.
  *احتوى النموذج على عينات قليلة جداً على يسار العتبة مقارنة باليمين.*
  > **Why this is incorrect:** Sample imbalance between left and right changes standard errors, but does not mechanically manufacture fake $48,000 discontinuities.
  > **لماذا هذا الخيار خاطئ:** عدم توازن حجم العينة يؤثر على تباين التقدير، ولكنه ليس السبب في اختلاق قفزة كاذبة.
