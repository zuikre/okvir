---
id: "fuzzy-rdd-mccrary-sorting"
version: "1.0.0"
title: "Fuzzy RDD & McCrary Density Sorting Diagnostic"
track: "econometrics"
module: "mod-27"
estimated_minutes: 15
prerequisites: ["regression-discontinuity-sharp", "instrumental-variables-2sls"]
i18n:
  ar: "تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة"
---

# Fuzzy RDD & McCrary Density Sorting Diagnostic

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose a municipal government offers a winter heating subsidy for low-income residents whose annual reported income falls below $30,000. 

Two messy real-world complications immediately arise:
1. **Fuzzy Compliance:** Just because you earn $29,500 doesn't mean you automatically receive the subsidy. You still have to apply, submit paperwork, and follow up. Some eligible people don't apply, and some ineligible people get special exemptions. The probability of receiving treatment jumps at $30,000, but not from 0% to 100%—perhaps it jumps from 15% to 75%. This is **Fuzzy RDD**.
2. **Cheating & Sorting:** What if people deliberately underreport cash income or ask their employer to delay a paycheck so their reported income lands at $29,950 instead of $30,100?

If people can manipulate their position around the cutoff, the 'random experiment' is destroyed! The people just below $30,000 are no longer identical twins to those just above—they are people who are clever, desperate, or dishonest enough to manipulate their paperwork!

How can an econometrician detect whether applicants manipulated their scores?
Through the **McCrary Density Sorting Test**!
If there is no cheating, people's exam scores or incomes should form a smooth, unbroken histogram. But if people are actively gaming the system, you will see an unnatural, massive spike in applicant density stacked just below $30,000, followed by a barren desert just above!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Fuzzy RDD** | The dimmer switch: treatment probability jumps sharply at the cutoff, but imperfectly (e.g., 20% to 80%). |
| **McCrary Density Test** | The fraud detector: checks whether people unnaturally clustered just on the winning side of the line. |
| **Running Variable Manipulation** | Self-sorting: applicants gaming or faking their scores to guarantee receiving benefits. |
| **Compliance Jump** | The change in treatment uptake rate observed right at the threshold. |
| **Local Wald Ratio** | Fuzzy RDD estimate: dividing the outcome jump by the treatment probability jump. |

```text
    McCRARY FRAUD DETECTOR (DENSITY SORTING):

    Number of Applicants (Density)
      ^
      |                               [SUSPICIOUS SPIKE!]
      |                                     |===|
      |                                     |===|
      |                         |===|       |===|
      |                   |===| |===|       |===|
      |             |===| |===| |===|       |===| :   |===|
      |       |===| |===| |===| |===|       |===| :   |===| |===|
      0-------+-----+-----+-----+-----+-----+-----+---+-----+-----+---------> Income
                                           $29.9k :  $30.1k
                                           (Cutoff)
```

### الحدس والقصة الواقعية

تخيل حكومة تقدم إعانة تدفئة شتوية للأسر محدودة الدخل التي يقل دخلها السنوي عن 30,000 دولار.

يواجه هذا التحليل تعقيدين واقعيين:
1. **الامتثال الضبابي (Fuzzy Compliance):** كون دخل الأسرة 29,500 دولار لا يعني تلقيها الإعانة تلقائيًا؛ إذ يجب تقديم أوراق ومتابعة الطلب. فبعض المؤهلين يتكاسلون، وبعض غير المؤهلين ينالون استثناءات. ترتفع نسبة تلقي الدعم عند عتبة 30,000 دولار، لكنها لا تقفز من 0% إلى 100%، بل تقفز مثلاً من 15% إلى 75%. هذا هو **انقطاع الانحدار الضبابي (Fuzzy RDD)**.
2. **التلاعب والتمركز (Cheating & Sorting):** ماذا لو تعمد بعض الأفراد إخفاء جزء من دخلهم النقدي لكي يظهر دخلهم عند 29,950 دولار بدلاً من 30,100 دولار للاستفادة من الإعانة؟

إذا كان الناس قادرين على التلاعب بمواقعهم، تنهار التجربة العشوائية! فالأشخاص أسفل الـ 30 ألف لن يعودوا توائم مطابقة لمن فوقها، بل سيصبحون فئة أكثر دهاءً وتلاعبًا بالأوراق!

كيف يكشف الاقتصادي هذا التلاعب؟
عبر **اختبار ماكراري لكثافة التوزيع (McCrary Density Test)**!
في غياب التلاعب، تتوزع أعداد الناس بسلاسة دون فجوات. أما إذا كان هناك تلاعب، فسترى قمة جبلية مفاجئة وغير طبيعية في أعداد الناس المحتشدين تحت خط الـ 30 ألف مباشرة، يقابلها فراغ فجائي فوقه!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **الانقطاع الضبابي (Fuzzy RDD)** | زر التعتيم: قفزة غير مكتملة في نسبة تلقي العلاج عند الحد الفاصل (مثل القفز من 20% إلى 80%). |
| **اختبار ماكراري للكثافة** | كاشف التزوير: يفحص ما إذا كان الناس قد احتشدوا بصورة مصطنعة على الجانب الرابح من الخط. |
| **التلاعب بالمتغير الفاصل** | التحايل والتمركز الذاتي: تزييف الدرجات أو الدخل لضمان السقوط في دائرة الاستحقاق. |
| **قفزة الامتثال** | مقدار الارتفاع في نسبة الخضوع للمعالجة عند ملامسة العتبة الفاصلة. |
| **نسبة فالد الموضعية** | حساب أثر Fuzzy RDD بقسمة قفزة النتيجة على قفزة الامتثال. |

:::simulation-widget{engine="canvas2d" component="FuzzyRDDBandwidthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In a Fuzzy RDD, the probability of treatment jumps discontinuously at cutoff $c$, but strictly between 0 and 1:

$$
\lim_{x \downarrow c} \mathbb{P}(D = 1 \mid X = x) \ne \lim_{x \uparrow c} \mathbb{P}(D = 1 \mid X = x)
$$

The Fuzzy RDD estimand is the local Wald ratio of the outcome discontinuity to the treatment probability discontinuity:

$$
\tau_{\text{FRDD}} = \frac{\lim_{x \downarrow c} \mathbb{E}[Y \mid X = x] - \lim_{x \uparrow c} \mathbb{E}[Y \mid X = x]}{\lim_{x \downarrow c} \mathbb{E}[D \mid X = x] - \lim_{x \uparrow c} \mathbb{E}[D \mid X = x]} = \frac{\Delta \mathbb{E}[Y \mid c]}{\Delta \mathbb{P}[D \mid c]}
$$

**The McCrary (2008) Density Test:**
Tests the continuity of the marginal density $f_X(x)$ of the running variable at cutoff $c$:

$$
H_0: \ln f_X(c^+) - \ln f_X(c^-) = 0 \quad \text{vs} \quad H_1: \ln f_X(c^+) - \ln f_X(c^-) \ne 0
$$

A rejection of $H_0$ ($p < 0.05$) indicates manipulation of the running variable, invalidating causal identification.

### Why the Math Works Step-by-Step

1. **Why is Fuzzy RDD an Instrumental Variable?**
   Cutoff crossing $\mathbf{1}(X_i \ge c)$ acts as the Instrument $Z$. The denominator is the First Stage (compliance jump). The numerator is the Reduced Form (outcome jump). The ratio is the Wald estimate of treatment on compliers right at the threshold!
2. **McCrary Test Log Difference:**
   Under true smoothness, the density ratio should equal 1 (log difference = 0). A discontinuity spike proves that units self-sorted across the boundary.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\Delta \mathbb{E}[Y \mid c]$: Discontinuity jump in outcome at cutoff.
* $\Delta \mathbb{P}[D \mid c]$: Compliance jump in treatment probability at cutoff.
* $\ln f_X(c^+) - \ln f_X(c^-)$: McCrary log-density difference across threshold.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\tau_{\text{FRDD}}$ | مقدر الانقطاع الضبابي | نسبة فالد الموضعية التي تقيس الأثر السببي على الممتثلين عند العتبة. |
| $\Delta \mathbb{P}[D \mid c]$ | قفزة احتمالية العلاج | مقام النسبة: التغير في نسبة المستفيدين الفعليين عند تجاوز الخط الفاصل. |
| اختبار ماكراري | لوغاريتم فارق الكثافة | يقيس الانقطاع المفاجئ في أعداد الناس للتأكد من خلو العينة من الغش والتلاعب. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the Fuzzy RDD Wald ratio estimation engine using local linear regression in NumPy. You will:
1. Filter the dataset to include observations within the bandwidth window $[c - h, c + h]$.
2. Compute triangular kernel weights $w_i = 1 - \frac{|X_i - c|}{h}$ and construct the diagonal weight matrix $\mathbf{W}$.
3. Construct the local design matrix $\mathbf{M} = [\mathbf{1}, \mathbf{Z}, \tilde{\mathbf{X}}, \mathbf{Z} \odot \tilde{\mathbf{X}}]$, where $Z_i = \mathbb{I}(X_i \ge c)$.
4. Estimate the reduced-form outcome jump: solve $(\mathbf{M}^T \mathbf{W} \mathbf{M}) \hat{\boldsymbol{\beta}}_y = \mathbf{M}^T \mathbf{W} \mathbf{y}$ and extract $\Delta Y = \hat{\beta}_{y, 1}$.
5. Estimate the first-stage treatment uptake jump: solve $(\mathbf{M}^T \mathbf{W} \mathbf{M}) \hat{\boldsymbol{\beta}}_d = \mathbf{M}^T \mathbf{W} \mathbf{d}$ and extract $\Delta D = \hat{\beta}_{d, 1}$.
6. Return the ratio $\tau_{\text{FRD}} = \frac{\Delta Y}{\Delta D}$.

:::python-challenge{id="py-fuzzy-rdd-mccrary-sorting"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([9.0, 9.5, 9.8, 10.2, 10.5, 11.0]); d = np.array([0.1, 0.1, 0.2, 0.7, 0.8, 0.8]); y = np.array([10.0, 11.0, 11.5, 16.0, 17.0, 17.5]); res = compute_fuzzy_rdd(y, d, x, cutoff=10.0, bandwidth=1.0); f\"{res['tau_frd']:.2f}\""
    expected: "8.33"
  - input: "x = np.array([4.0, 4.5, 4.8, 5.2, 5.5, 6.0]); d = np.array([0.0, 0.1, 0.1, 0.6, 0.6, 0.7]); y = np.array([5.0, 5.5, 5.8, 9.8, 10.5, 11.0]); res = compute_fuzzy_rdd(y, d, x, cutoff=5.0, bandwidth=1.0); f\"{res['tau_frd']:.2f}\""
    expected: "7.74"
---
```python
import numpy as np

def compute_fuzzy_rdd(
    y: np.ndarray,
    d: np.ndarray,
    x: np.ndarray,
    c: float,
    h: float
) -> dict[str, float]:
    """
    Computes Fuzzy RDD local Wald estimator within bandwidth [c - h, c + h].

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Outcome.
    d : np.ndarray of shape (N,)
        Treatment indicator (imperfect compliance).
    x : np.ndarray of shape (N,)
        Running variable.
    c : float
        Cutoff threshold.
    h : float
        Bandwidth.

    Returns
    -------
    dict with keys 'tau_fuzzy', 'first_stage_jump'
    """
    mask = (x >= c - h) & (x <= c + h)
    y_sub = y[mask]
    d_sub = d[mask]
    x_sub = x[mask]
    n_sub = len(y_sub)

    x_centered = x_sub - c
    z_instrument = (x_sub >= c).astype(float)

    # Numerator (Reduced Form): Regress y on [1, x_centered, z, z*x_centered]
    X_mat = np.column_stack([np.ones(n_sub), x_centered, z_instrument, z_instrument * x_centered])
    beta_y = np.linalg.solve(X_mat.T @ X_mat, X_mat.T @ y_sub)
    jump_y = float(beta_y[2])

    # Denominator (First Stage): Regress d on X_mat
    beta_d = np.linalg.solve(X_mat.T @ X_mat, X_mat.T @ d_sub)
    jump_d = float(beta_d[2])

    if abs(jump_d) < 1e-6:
        raise ValueError("First stage jump is zero: No discontinuity in treatment probability.")

    tau_fuzzy = jump_y / jump_d

    return {
        "tau_fuzzy": float(tau_fuzzy),
        "first_stage_jump": float(jump_d),
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

Under French labor regulations, enterprises with 50 or more employees are legally required to establish a formal worker council and provide mandatory supplemental benefits. A labor policy research institute seeks to measure the causal impact of worker councils on firm innovation using a Fuzzy RDD design around the 50-employee threshold ($c = 50$).

The research team plots the empirical density histogram of firm sizes across all registered businesses in France. The McCrary density diagnostic reveals an enormous, towering spike at exactly 49 employees, accompanied by a sudden, severe drop at 50, 51, and 52 employees.

How does this McCrary density histogram shape impact the causal validity of using RDD for this investigation?

* [ ] The spike at 49 employees provides extra sample size near the boundary, increasing the statistical power of the local linear estimator.
  *التكدس عند 49 عاملاً يزيد من حجم العينة قرب العتبة مما يرفع القوة الإحصائية للنموذج.*
  > **Why this is incorrect:** More observations do not help if those observations are systematically self-selected rather than quasi-randomly assigned.
  > **لماذا هذا الخيار خاطئ:** زيادة حجم العينة لا تنفع إذا كانت البيانات ناتجة عن اختيار ذاتي منحاز وليست تجربة شبه عشوائية.
* [x] The sharp bunching spike at 49 employees proves active manipulation and strategic sorting: business owners intentionally freeze hiring or employ contractors to evade the 50-employee mandate. Because firms at 49 are systematically and strategically different from firms that expand past 50, the continuity assumption fails, entirely invalidating the RDD design.
  *التكدس الحاد عند 49 عاملاً يثبت التلاعب الاستراتيجي الصريح؛ حيث يتعمد أصحاب العمل تجميد التوظيف للتهرب من اشتراطات القانون، مما يخرق فرضية الاستمرارية ويبطل صلاحية RDD بالكامل.*
  > **Why this is correct:** When economic agents have precise control over the running variable and strong incentives to stay below the threshold, units just below the cutoff possess unobserved traits (such as regulatory avoidance acumen) that destroy exchangeability with units above the cutoff.
  > **لماذا هذا الخيار صحيح:** عندما يتحكم الفاعلون الاقتصاديون في المتغير الجاري بدقة للتهرب من القانون، تصبح الشركات تحت العتبة مختلفة جوهرياً عن التي فوقها، مما يسقط فرضية الاستمرارية المحلية.
* [ ] Because firms at 49 exhibit stronger compliance, the first-stage denominator is strengthened, improving the Wald ratio.
  *بما أن شركات 49 تحقق امتثالاً أقوى، فإن قفزة المرحلة الأولى تزداد دقة.*
  > **Why this is incorrect:** The first stage measures compliance at the cutoff, but sorting invalidates the exclusion restriction and exogeneity of the cutoff itself.
  > **لماذا هذا الخيار خاطئ:** زيادة قفزة المرحلة الأولى لا تحمي النموذج إذا كانت العتبة نفسها ملوثة بتلاعب سلوكي مقصود.
* [ ] The bunching is standard firm growth noise and can be eliminated simply by expanding the bandwidth $h$ to 100 employees.
  *هذا التكدس مجرد ضجيج طبيعي ويمكن حله بتوسيع النطاق الترددي إلى 100.*
  > **Why this is incorrect:** Expanding the bandwidth includes completely non-comparable massive corporations and introduces severe functional form bias without resolving the sorting at the boundary.
  > **لماذا هذا الخيار خاطئ:** توسيع النطاق الترددي يدمج شركات عملاقة غير متطابقة ويزيد الانحياز دون معالجة التلاعب عند العتبة.
