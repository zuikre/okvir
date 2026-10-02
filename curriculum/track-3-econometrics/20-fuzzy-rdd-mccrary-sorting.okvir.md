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

In an ideal institutional laboratory, rules are executed with robotic perfection: cross the cutoff, and you receive treatment with $100\%$ certainty; miss it by a fraction of a millimeter, and you receive $0\%$. In real human institutions, however, compliance is rarely deterministic. Administrative thresholds frequently generate an **entitlement, voucher, or strong nudge**, but human beings retain free will. Some qualified individuals decline the benefit, while some who fell short successfully lobby administrators for a discretionary exception.

Consider an elite STEM summer fellowship. High school students scoring $90$ or above on a standardized math assessment are mailed an official invitation ($Z_i = 1$). However, several invited students decline because of conflicting family summer travel plans. Meanwhile, a handful of students scoring $88$ or $89$ file hardship appeals through their guidance counselors and secure discretionary admittance ($D_i = 1$). When you plot treatment uptake against the test score, there is no longer a crisp jump from $0$ to $1$. Instead, the probability of attending jumps abruptly from $15\%$ immediately to the left of 90 up to $75\%$ immediately to the right.

This is the domain of the **Fuzzy Regression Discontinuity Design (FRDD)**. Econometrically, crossing the cutoff is no longer treatment itself; rather, crossing the cutoff acts as an **Instrumental Variable (IV)** that exogenous nudges compliance upward! To calculate the true causal effect among students whose attendance was swayed by the cutoff (the **Local Average Treatment Effect, or LATE**), we take the observed vertical jump in downstream outcomes (e.g., college graduation) and divide it by the vertical jump in treatment uptake (the first-stage compliance jump). If college completion jumps by $6$ percentage points at the cutoff, but compliance only jumped by $60$ percentage points ($0.60$), the true causal impact on compliers is $6\% / 0.60 = +10\%$.

However, this elegant identification rests on a razor's edge: **agents must not possess the ability to manipulate their score around the cutoff**. If math teachers know that 90 is the scholarship cutoff and generously bump students with an 89 up to 90, the students right above the threshold are no longer comparable to those below—they are students with more aggressive parents or sympathetic teachers! The **McCrary Density Test** serves as an indispensable forensic audit: it inspects the histogram density of the running variable. If the distribution displays a smooth, continuous curve, the quasi-experiment is clean. But if a towering spike of bunching appears at 90 followed by a vacant crater at 89, it exposes foul play, completely demolishing causal credibility.

في الأنظمة الإدارية المثالية، تُطبق اللوائح بصرامة تامة: من يتجاوز العتبة يحصل على المعالجة حتماً بنسبة 100%، ومن يقل عنها يُحرم منها بنسبة 0%. لكن في العالم الحقيقي المعقد، نادراً ما يكون الامتثال حتمياً ومطلقاً؛ فالقواعد الإدارية غالباً ما تمنح **أهلية قانونية أو دعوة رسمية أو حافزاً مشجعاً**، مع بقاء حرية الاختيار للأفراد. يرفض بعض المؤهلين تلقي البرنامج لارتباطات أخرى، بينما ينجح بعض الراسبين في الحصول على استثناءات عبر التظلم والواسطة.

تخيل منحة دراسية في معسكر صيفي للموهوبين: يحصل الطلاب الذين نالوا 90 درجة فما فوق في اختبار الرياضيات على بطاقة دعوة ($Z_i = 1$). لكن بعض هؤلاء يعتذرون عن الحضور بسبب السفر العائلي. وفي المقابل، يتقدم بعض الطلاب الحاصلين على 88 أو 89 بالتماسات خاصة لإدارات مدارسهم ويتم قبولهم استثنائياً ($D_i = 1$). إذا رسمنا نسبة الحضور الفعلي مقابل درجات الاختبار، فلن نرى قفزة حادة من 0 إلى 1، بل سنشهد قفزة مفاجئة في "احتمالية" الحضور: حيث ترتفع من 15% مباشرة قبل 90 إلى 75% مباشرة بعدها.

هذا هو جوهر **تصميم انقطاع الانحدار الضبابي (Fuzzy RDD)**. من الناحية القياسية، لم يعد تجاوز العتبة هو المعالجة نفسها، بل أصبح تجاوز العتبة بمثابة **متغير أداة خارجي (Instrumental Variable)** يدفع احتمالية الامتثال للأعلى! ولاستعادة الأثر السببي الصافي للممتثلين (LATE)، نقسم القفزة الملاحظة في النتائج (المرحلة المختزلة) على القفزة الملاحظة في نسبة الامتثال (المرحلة الأولى). فإذا ارتفعت معدلات التخرج الجامعي بمقدار 6% عند العتبة، بينما ارتفعت نسبة الحضور الفعلي بمقدار 60% فقط، فإن الأثر الحقيقي للمعسكر على الممتثلين هو $6\% / 0.60 = +10\%$.

غير أن هذا البناء الرياضي ينهار تماماً إذا كان بإمكان الأفراد **التلاعب بدرجاتهم والتسلل فوق العتبة (Strategic Sorting)**. فلو علم المعلمون أن 90 هي عتبة المنحة، وقاموا بتعديل درجات 89 إلى 90 بدافع الشفقة، لم يعد الطلاب فوق العتبة متطابقين مع زملائهم تحتها! هنا يأتي **اختبار مككراري للكثافة (McCrary Density Test)** كمدقق جنائي صارم: يفحص منحنى الكثافة الاحتمالية للمتغير؛ فإن كان المنحنى أملساً ومستمراً ثبتت سلامة التجربة، وإن ظهر تكدس فجائي غير طبيعي عند 90 مع فجوة فارغة عند 89، دل ذلك على تلاعب فاضح يبطل الاستدلال السببي بالكامل.

:::simulation-widget{engine="canvas2d" component="FuzzyRDDBandwidthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In a Fuzzy Regression Discontinuity Design, treatment take-up $D_i \in \{0, 1\}$ is not deterministic, but its conditional probability jumps discontinuously at the institutional cutoff $c$:

$$
\lim_{x \downarrow c} \mathbb{P}(D_i = 1 \mid X_i = x) \ne \lim_{x \uparrow c} \mathbb{P}(D_i = 1 \mid X_i = x)
$$

Define the threshold crossing eligibility indicator as the instrument: $Z_i = \mathbb{I}(X_i \ge c)$.

The Fuzzy RDD estimand is the ratio of two local boundary discontinuities, equivalent to the **Local Wald Instrumental Variables Estimator** at the boundary:

$$
\tau_{\text{FRD}} = \frac{\lim_{x \downarrow c} \mathbb{E}[Y_i \mid X_i = x] - \lim_{x \uparrow c} \mathbb{E}[Y_i \mid X_i = x]}{\lim_{x \downarrow c} \mathbb{E}[D_i \mid X_i = x] - \lim_{x \uparrow c} \mathbb{E}[D_i \mid X_i = x]} = \frac{\Delta \mathbb{E}[Y \mid X = c]}{\Delta \mathbb{E}[D \mid X = c]}
$$

Under the monotonicity assumption (the cutoff encourages but never discourages treatment take-up, ruling out Defiers), $\tau_{\text{FRD}}$ identifies the **Local Average Treatment Effect (LATE)** for Compliers at the cutoff:

$$
\tau_{\text{FRD}} = \mathbb{E}\left[Y_i(1) - Y_i(0) \mid \text{Unit } i \text{ is a Complier at } X_i = c\right]
$$

### The McCrary (2008) Density Diagnostic
To test the core identifying assumption of local random assignment (absence of precise sorting around the threshold), Justin McCrary (2008) introduced an estimator for the log-difference in the marginal probability density function $f(x)$ of the running variable $X$ at cutoff $c$:

$$
\theta \equiv \ln \left( \lim_{x \downarrow c} f(x) \right) - \ln \left( \lim_{x \uparrow c} f(x) \right)
$$

We test the null hypothesis of continuity against the alternative of sorting/manipulation:

$$
H_0: \theta = 0 \quad \text{vs} \quad H_1: \theta \ne 0
$$

A statistically significant log-density gap ($\hat{\theta} \ne 0$) rejects $H_0$ and indicates that agents strategically clustered or manipulated their score to land immediately on the desired side of the threshold, violating exchangeability.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $X_i$: Continuous running variable determining eligibility.
* $c$: Administrative threshold or eligibility cutoff.
* $Z_i = \mathbb{I}(X_i \ge c)$: Binary eligibility instrument indicating threshold passage.
* $D_i \in \{0, 1\}$: Actual endogenous treatment uptake or program participation.
* $Y_i$: Observed outcome variable.
* $\Delta \mathbb{E}[Y \mid X = c]$: Reduced-form outcome discontinuity at the cutoff (numerator).
* $\Delta \mathbb{E}[D \mid X = c]$: First-stage compliance discontinuity in treatment uptake at the cutoff (denominator).
* $\tau_{\text{FRD}}$: Fuzzy RDD causal estimand identifying LATE for compliers located at $X = c$.
* $f(x)$: Marginal probability density function of the running variable.
* $\theta$: McCrary log-density discontinuity parameter testing for strategic manipulation or bunching.

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
    cutoff: float,
    bandwidth: float
) -> dict[str, float]:
    """
    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed outcome values.
    d : np.ndarray of shape (N,)
        Observed treatment indicator or uptake fraction.
    x : np.ndarray of shape (N,)
        Running variable.
    cutoff : float
        Discontinuity cutoff c.
    bandwidth : float
        Local estimation window half-width h.
        
    Returns
    -------
    dict with keys:
        'jump_y': Numerator discontinuity in outcome.
        'jump_d': Denominator discontinuity in treatment uptake (first-stage).
        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).
    """
    # Step 1: Select observations falling within local bandwidth window
    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)
    x_sub = x[mask]
    y_sub = y[mask]
    d_sub = d[mask]
    
    # Step 2: Center running variable and compute triangular kernel weights
    x_c = x_sub - cutoff
    z = (x_sub >= cutoff).astype(float)
    u = np.abs(x_c) / bandwidth
    w = 1.0 - u
    W = np.diag(w)
    
    # Step 3: Construct local linear design matrix: [1, Z, (X-c), Z*(X-c)]
    X_mat = np.column_stack([np.ones_like(x_c), z, x_c, z * x_c])
    XtWX = X_mat.T @ W @ X_mat
    
    # Step 4: Estimate reduced-form outcome jump at cutoff
    beta_y = np.linalg.solve(XtWX, X_mat.T @ W @ y_sub)
    jump_y = float(beta_y[1])
    
    # Step 5: Estimate first-stage treatment take-up jump at cutoff
    beta_d = np.linalg.solve(XtWX, X_mat.T @ W @ d_sub)
    jump_d = float(beta_d[1])
    
    # Step 6: Compute Fuzzy RDD Wald ratio
    tau_frd = jump_y / jump_d if abs(jump_d) > 1e-8 else float('nan')
    
    return {
        "jump_y": jump_y,
        "jump_d": jump_d,
        "tau_frd": tau_frd,
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
