---
id: "staggered-did-callaway-santanna"
version: "1.0.0"
title: "Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna"
track: "econometrics"
module: "mod-26"
estimated_minutes: 15
prerequisites: ["difference-in-differences-2x2", "panel-data-fixed-effects"]
i18n:
  ar: "الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه"
---

# Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

In the real world, major laws and corporate initiatives are rarely adopted by everyone on the exact same Monday morning. 

Consider the legalization of ride-sharing platforms (like Uber and Lyft) across the United States:
* California legalized ride-sharing in 2013.
* Texas legalized it in 2015.
* New York legalized it in 2017.
* Some states never legalized it at all.

For decades, econometricians analyzed this kind of rollout using traditional **Two-Way Fixed Effects (TWFE)** regressions. But between 2018 and 2021, an econometric revolution proved that traditional TWFE has a fatal flaw: **The Negative Weighting Problem**.

Why does traditional regression fail with staggered rollouts?
Because when evaluating Texas in 2016, TWFE doesn't just compare Texas to never-treated states. It accidentally uses **California (which was treated in 2013) as a control group for Texas!**

If ride-sharing's effect in California grows dynamically over time (as more drivers buy cars and riders build habits), California is on an upward trajectory. Using an already-treated unit on an upward trend as a control group can cause a genuinely positive policy to show up with a **negative, upside-down coefficient** in your regression!

Modern staggered estimators (like Callaway & Sant'Anna) fix this by comparing each adoption cohort strictly against clean, never-yet-treated units.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Staggered Adoption** | Stepped rollout: different entities adopting policy in different calendar years. |
| **Two-Way Fixed Effects (TWFE)** | Traditional panel regression with entity and time dummies that suffers from bad controls. |
| **Negative Weighting Problem** | The mathematical glitch where positive treatment effects can turn into negative estimates. |
| **Dynamic Treatment Effect** | An effect that changes, grows, or fades over time as people adapt to the policy. |
| **Callaway & Sant'Anna Estimator** | Clean cohort DiD: strictly comparing newly treated cohorts against not-yet-treated peers. |

```text
    STAGGERED ROLLOUT TIMELINE:

    Cohort 2013 (CA): [ Treated ===========================================> ]
    Cohort 2015 (TX): [ Pre-period ------> ] [ Treated ====================> ]
    Never-Treated:    [ Clean Pre-period ---------------------------------> ]
                           ^
                           | (TWFE mistakenly used CA as a control for TX!)
```

### الحدس والقصة الواقعية

في عالم السياسات والاقتصاد، نادرًا ما تُطبق القوانين الجديدة في كافة الولايات في التوقيت ذاته.

تأمل مثلاً تقنين خدمات النقل التشاركي (مثل أوبر وليفت) عبر الولايات الأمريكية:
* قننت كاليفورنيا الخدمة في عام 2013.
* قننتها تكساس في عام 2015.
* قننتها نيويورك في عام 2017.
* بينما امتنعت ولايات أخرى عن التقنين تمامًا.

لعقود طويلة، حلل الباحثون هذا التدرج باستخدام نماذج الانحدار التقليدية ذات الآثار الثابتة ثنائية الاتجاه (TWFE). ولكن بين عامي 2018 و 2021، أثبتت ثورة بحثية أن هذه الطريقة الكلاسيكية تعاني من عيب قاتل: **مشكلة الأوزان السالبة (Negative Weighting)**.

لماذا تفشل النماذج التقليدية في التبني المتدرج؟
لأنه عند تقييم ولاية تكساس في 2016، لا تكتفي النماذج بمقارنتها بالولايات التي لم تطبق القانون، بل تستخدم خطأً **كاليفورنيا (التي طبقت القانون في 2013) كمجموعة ضابطة لتكساس!**

ولو كان أثر القانون في كاليفورنيا يتنامى ويتصاعد سنويًا مع اعتياد الركاب، فإن استخدامها كمجموعة ضابطة يؤدي إلى قلب النتائج رأسًا على عقب، لتظهر سياسة إيجابية ناجحة في صورة معامل **سالب وهمي**!

وتعالج مقدرات التبني المتدرج الحديثة (مثل مقدر كالواي وسانتانا) هذه المعضلة عبر مقارنة كل دفعة زمنية بالولايات غير المعالجة حصرًا.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **التبني المتدرج (Staggered)** | التطبيق المتعاقب: خضوع كيانات مختلفة للمعالجة في سنوات تقويمية متفاوتة. |
| **الآثار ثنائية الاتجاه (TWFE)** | نموذج الانحدار اللوحي التقليدي الذي يقع في فخ المقارنات الملوثة. |
| **معضلة الأوزان السالبة** | خلل جبري يؤدي لظهور آثار السياسات الناجحة بمعاملات سالبة مقلوبة. |
| **الأثر الديناميكي المتغير** | أثر يتغير ويتراكم أو يتلاشى بمرور السنوات مع تكيف الناس مع الواقع الجديد. |
| **مقدر كالواي وسانتانا** | المقدر النقي: يقارن كل دفعة جديدة بالكيانات التي لم تخضع للمعالجة بعد فقط. |

:::simulation-widget{engine="canvas2d" component="StaggeredDiDEventStudyLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $G_i$ be the timing of adoption cohort (the first period entity $i$ receives treatment). 

The group-time Average Treatment Effect $ATT(g, t)$ for cohort $g$ at calendar time $t$ is defined as:

$$
ATT(g, t) = \mathbb{E}[Y_t(g) - Y_t(\infty) \mid G = g]
$$

Callaway and Sant'Anna (2021) showed that $ATT(g, t)$ is identified using clean comparison groups (either never-treated $C = \infty$ or not-yet-treated $D_s = 0$ for $s \le t$):

$$
\tau_{g,t} = \left( \mathbb{E}[Y_t \mid G = g] - \mathbb{E}[Y_{g-1} \mid G = g] \right) - \left( \mathbb{E}[Y_t \mid C] - \mathbb{E}[Y_{g-1} \mid C] \right)
$$

The Goodman-Bacon (2021) decomposition revealed that the traditional TWFE coefficient $\beta_{\text{TWFE}}$ is a weighted sum:

$$
\beta_{\text{TWFE}} = \sum_{k} w_k \hat{\tau}_k^{\text{clean}} + \sum_{j} w_j \hat{\tau}_j^{\text{already-treated as control}}
$$

where some weights $w_j$ can be strictly negative!

### Why the Math Works Step-by-Step

1. **Why do already-treated units create negative weights?**
   If an early cohort's treatment effect grows by $\Delta$ between periods 1 and 2, its trend slope is $(\text{Trend} + \Delta)$. Subtracting this slope from a newly treated unit subtracts $\Delta$, artificially depressing the estimated treatment effect!
2. **Aggregation by Event Time:**
   After estimating individual $ATT(g, t)$, researchers aggregate them into dynamic event-study coefficients $ATT(e) = \sum_g w_g ATT(g, g + e)$ where $e = t - g$ is elapsed time since treatment.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $G \in \{g_1, \dots, g_K, \infty\}$: Cohort of initial treatment adoption ($\infty$ = never treated).
* $ATT(g, t)$: Causal treatment effect for cohort $g$ evaluated at calendar time $t$.
* $e = t - g$: Event time (relative time elapsed since initial policy adoption).

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $G=g$ | دفعة التبني الزمنية | المجموعة التي خضعت للقرار لأول مرة في العام $g$. |
| $ATT(g, t)$ | أثر الدفعة في الزمن $t$ | العائد السببي الخاص بالدفعة $g$ عند قياسه في السنة $t$. |
| تفكيك بيكون | برهان تفكيك بيكون | برهان رياضي يكشف أن الانحدار التقليدي يمزج مقارنات ملوثة ذات أوزان سالبة. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the core Callaway-Sant'Anna cohort-time average treatment effect estimator $\widehat{ATT}(g, t)$ in NumPy. You will:
1. Identify the reference baseline period $g - 1$ for the target adoption cohort.
2. Compute the pre-to-post change in average outcomes for the target treated cohort: $\Delta \bar{Y}_{\text{treated}} = \bar{Y}_{g, t} - \bar{Y}_{g, g-1}$.
3. Compute the corresponding change over the exact same time window for the clean never-treated comparison group: $\Delta \bar{Y}_{\text{control}} = \bar{Y}_{C, t} - \bar{Y}_{C, g-1}$.
4. Subtract the control change from the treated change to return the clean, unpolluted $\widehat{ATT}(g, t)$.

:::python-challenge{id="py-staggered-did-callaway-santanna"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([10.0, 15.0, 10.0, 12.0]); g = np.array([2, 2, 0, 0]); t = np.array([1, 2, 1, 2]); f\"{compute_group_time_att(y, g, t, target_g=2, target_t=2, never_treated_val=0):.1f}\""
    expected: "3.0"
  - input: "y = np.array([20.0, 28.0, 20.0, 22.0]); g = np.array([2, 2, 0, 0]); t = np.array([1, 2, 1, 2]); f\"{compute_group_time_att(y, g, t, target_g=2, target_t=2, never_treated_val=0):.1f}\""
    expected: "6.0"
---
```python
import numpy as np

def compute_group_time_att(
    y: np.ndarray,
    g: np.ndarray,
    t: np.ndarray,
    target_g: int,
    target_t: int
) -> float:
    """
    Computes a clean cohort-specific group-time ATT(g, t) against never-treated units.

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Outcome values.
    g : np.ndarray of shape (N,)
        Cohort treatment timing (use 9999 or 0 for never-treated).
    t : np.ndarray of shape (N,)
        Calendar time of observation.
    target_g : int
        Treated cohort of interest.
    target_t : int
        Evaluation calendar period (target_t >= target_g).

    Returns
    -------
    float : Estimated ATT(g, t).
    """
    base_t = target_g - 1  # Pre-treatment baseline period for cohort g

    # Cohort g units
    treated_post = y[(g == target_g) & (t == target_t)]
    treated_pre = y[(g == target_g) & (t == base_t)]
    delta_treated = np.mean(treated_post) - np.mean(treated_pre)

    # Clean never-treated control units (g == 0 or g >= 9000)
    control_mask = (g == 0) | (g >= 9000)
    control_post = y[control_mask & (t == target_t)]
    control_pre = y[control_mask & (t == base_t)]
    delta_control = np.mean(control_post) - np.mean(control_pre)

    att = float(delta_treated - delta_control)

    return att
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

Thirty US states enacted paid parental leave policies in staggered waves between 2012 and 2022. Longitudinal health data demonstrates that parental leave yields compounding, positive benefits on infant wellness that expand over time: a modest $+2\%$ gain in year 1 after adoption, rising to $+5\%$ in year 2, and reaching $+9\%$ by year 4.

An empirical researcher fits a textbook Two-Way Fixed Effects regression $Y_{st} = \alpha_s + \lambda_t + \beta D_{st} + \varepsilon_{st}$ and is stunned to find $\hat{\beta} = -0.024$ ($p < 0.01$)—a statistically significant, negative estimated effect!

Why did the classical TWFE regression estimate a negative treatment effect when the policy produced strictly positive benefits in every single state?

* [ ] The sample of 30 states violates the asymptotic central limit theorem threshold of 50 clusters.
  *العينة المكونة من 30 ولاية لا تكفي لتحقيق مبرهنة النهاية المركزية.*
  > **Why this is incorrect:** Small cluster counts affect standard error calibration, not structural point estimate sign reversals.
  > **لماذا هذا الخيار خاطئ:** قلة عدد المجموعات تؤثر على دقة الأخطاء المعيارية وليس على انقلاب إشارة معامل الانحدار الإجمالي.
* [x] Under the Goodman-Bacon decomposition, early-adopting states (whose health gains had matured to $+9\%$) acted as control groups for later-adopting states (whose gains were only $+2\%$). Subtracting an earlier $+9\%$ trajectory from a new $+2\%$ trajectory generates a $-7\%$ negative implicit comparison that contaminates the pooled estimate.
  *وفق تفكيك غودمان-بيكون، استُخدمت الولايات المبكرة (التي نضج أثرها إلى +9%) كمجموعة ضابطة للولايات اللاحقة (التي كان أثرها +2%)، وطرح 9% من 2% يفرز مقارنة سالبة بنسبة -7% تلوث المعامل الإجمالي.*
  > **Why this is correct:** When treatment effects are dynamic, earlier-treated units cannot serve as valid counterfactual controls because their post-treatment trajectory embodies treatment effect dynamics, violating parallel trends and assigning negative weights.
  > **لماذا هذا الخيار صحيح:** عند تغير أثر المعالجة ديناميكياً مع الوقت، تعجز الوحدات المعالجة سابقاً عن تمثيل الواقع المقابل، لأن مسارها يحتوي على استجابة تراكمية تفرز أوزاناً سالبة تقلب إشارة TWFE.
* [ ] Infant wellness is a bounded non-linear index that invalidates OLS orthogonal projection geometry.
  *مؤشر صحة الرضع متغير محدود غير خطي يبطل هندسة إسقاط OLS.*
  > **Why this is incorrect:** OLS provides the best linear approximation regardless of the underlying index scale; the issue is forbidden comparisons, not bounded outcome metrics.
  > **لماذا هذا الخيار خاطئ:** يقدم OLS أفضل تقريب خطي بغض النظر عن طبيعة المتغير؛ فالمشكلة تكمن في المقارنات المحظورة.
* [ ] The regression suffered from omitted variable bias caused by omitting individual family income.
  *يعاني الانحدار من انحياز المتغير المغفَل بسبب عدم تضمين دخل الأسرة الفردي.*
  > **Why this is incorrect:** State fixed effects $\alpha_s$ control for all time-invariant differences across states, but cannot fix the mathematical sign reversal caused by dynamic treatment heterogeneity.
  > **لماذا هذا الخيار خاطئ:** الآثار الثابتة للولايات تضبط الفروق الهيكلية الثابتة، لكنها تعجز عن منع الانقلاب الرياضي للإشارة الناجم عن ديناميكية الأثر.
