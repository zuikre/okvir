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

In real-world policy rollouts, major reforms virtually never hit all jurisdictions simultaneously. California passes a paid family leave law in 2004; New Jersey follows in 2009; New York enacts it in 2018. This staggered, multi-cohort rollout has long been the hallmark of applied policy evaluation. For over thirty years, thousands of published papers evaluated such policies by estimating a **Two-Way Fixed Effects (TWFE)** regression with unit fixed effects ($\alpha_i$) and calendar time fixed effects ($\lambda_t$). Econometricians believed this was simply generalizing the $2 \times 2$ DiD estimator to multiple periods.

Between 2018 and 2021, an econometric earthquake shattered this belief. Groundbreaking work by Goodman-Bacon (2021), Callaway & Sant'Anna (2021), and Sun & Abraham (2021) demonstrated that classical TWFE is fundamentally broken in the presence of dynamic, heterogeneous treatment effects. The regression does not just compare treated units to untreated units—it actively performs **"forbidden comparisons"** by using units that were treated *earlier* as the control group for units treated *later*.

Consider a clinical trial analogy: imagine testing an anti-inflammatory drug whose healing benefits grow steadily over time. Patient A began the therapy two years ago; their inflammation has dropped dramatically and is now stabilized at a healthy low level. Patient B begins the therapy today. If you evaluate Patient B's progress by subtracting Patient A's trajectory from Patient B's trajectory, what happens? Because Patient A's inflammation is no longer dropping (their treatment effect has already matured and plateaued), Patient A's flat trajectory acts like a zero baseline. Worse yet, if Patient A experiences any slight regression to the mean, subtracting Patient A's trajectory from Patient B's can flip the mathematical sign of the estimate completely! The math functions like an **inverted photographic negative**: a life-saving drug that helps every single patient can produce a strictly negative regression coefficient in TWFE.

The modern solution, spearheaded by Brantly Callaway and Pedro Sant'Anna (2021), resolves this catastrophe by decomposing the problem into clean, unpolluted building blocks: **Group-Time Average Treatment Effects ($ATT(g, t)$)**. Instead of pooling everyone into a single contaminated regression, we analyze each treatment cohort $g$ (units first treated in year $g$) separately at calendar time $t$. We strictly forbid using already-treated units as controls, comparing cohort $g$ only against units that are **never treated** or **not-yet-treated**. Furthermore, the baseline is always cleanly anchored at period $g - 1$ (the exact year before that cohort received treatment). Only after computing these clean pairwise comparisons do we aggregate them into an interpretable event-study plot.

في التطبيقات الواقعية للسياسات الاقتصادية والاجتماعية، تكاد تنعدم الإصلاحات التي تُطبق في جميع المناطق في وقت واحد. فالسياسات الكبرى—كتشريعات إجازات الأمومة مدفوعة الأجر أو برامج التأمين الصحي أو تعديل الحد الأدنى للأجور—تُعتمد عادةً عبر موجات متتابعة زمنياً: ولاية تتبناها في عام 2010، وأخرى في 2014، وثالثة في 2018. ولأكثر من ثلاثة عقود، دأب الباحثون على استخدام انحدار الآثار الثابتة ثنائي الاتجاه (TWFE) لتقدير الأثر الإجمالي للسياسة، ظناً منهم أن هذا النموذج يعمم أسلوب DiD الكلاسيكي بسلاسة وبلا أدنى مشكلة.

بين عامي 2018 و2021، عصفت بعلم القياس الاقتصادي ثورة منهجية كبرى قلبت موازين البحث التجريبي. أثبتت أبحاث غودمان-بيكون (2021) وكالاواي وسانت آنا (2021) وسان وأبراهام (2021) أن نموذج TWFE الكلاسيكي يعاني من خلل حسابي مدمر عند تباين آثار المعالجة عبر الزمن؛ إذ لا يكتفي النموذج بمقارنة المعالجين بغير المعالجين، بل يجري **"مقارنات محظورة" (Forbidden Comparisons)** يستخدم فيها الأفواج التي عولجت *مبكراً* كمجموعات ضابطة للأفواج التي عولجت *لاحقاً*!

لتوضيح هذا الخطر، تخيل تجربة طبية لدواء ينمو أثره العلاجي مع الوقت. المريض (أ) تلقى العلاج منذ سنتين؛ وقد تعافى بالفعل واستقرت حالته الصحية عند مستوى ممتاز. والمريض (ب) يبدأ العلاج اليوم. فإذا أردت تقييم تحسن المريض (ب) بمقارنته بمسار المريض (أ)، فإنك تستخدم مريضاً عولج بالفعل كمجموعة ضابطة! وبما أن الأثر العلاجي للمريض (أ) قد تشبع ولم يعد يطرأ عليه تحسن إضافي، فإن طرح مساره قد يلغي أثر المريض (ب)، بل قد يؤدي إلى ظهور أثر سالب وهمي تماماً كـ **نيجاتيف الصورة المقلوبة**. قد يكون الدواء مفيداً لكل المرضى دون استثناء، ومع ذلك يُخرج انحدار TWFE معامل أثر سالب وذي دلالة إحصائية!

يقدم الحل الحديث لكالاواي وسانت آنا (2021) حلاً جذرياً يفكك المسألة إلى لبنات بناء نقية تُعرف باسم **متوسط أثر المعالجة للمجموعة والزمن ($ATT(g, t)$)**. فبدلاً من دمج جميع السنوات والأفواج في انحدار واحد مشوه، نحسب أثر كل فوج معالجة $g$ عند كل لحظة زمنية $t$ بمفرده. ونحظر تماماً استخدام أي فوج خضع للمعالجة مسبقاً كمجموعة ضابطة، حيث نقارن الفوج $g$ حصراً بالوحدات التي **لم تُعالج قط (Never-Treated)** أو التي **لم تُعالج بعد (Not-Yet-Treated)**. وعلاوة على ذلك، يتم تثبيت خط الأساس دائماً عند الفترة $g - 1$ السابقة للمعالجة مباشرة، ثم تُجمع هذه التقديرات النقية في دراسة حدث (Event-Study) دقيقة وموثوقة.

:::simulation-widget{engine="canvas2d" component="StaggeredDiDEventStudyLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The conventional Two-Way Fixed Effects (TWFE) regression specification for staggered adoption across units $i \in \{1, \dots, N\}$ and calendar periods $t \in \{1, \dots, T\}$ is given by:

$$
Y_{it} = \alpha_i + \lambda_t + \beta_{\text{TWFE}} D_{it} + \varepsilon_{it}
$$

where $\alpha_i$ is an entity fixed effect, $\lambda_t$ is a calendar period fixed effect, and $D_{it} \in \{0, 1\}$ indicates active treatment status.

The celebrated **Goodman-Bacon (2021) Decomposition Theorem** proved that the OLS estimate $\hat{\beta}_{\text{TWFE}}$ is an explicit weighted average of all possible $2 \times 2$ sub-comparisons in the panel:

$$
\hat{\beta}_{\text{TWFE}} = \sum_{k \in \mathcal{K}_{\text{clean}}} w_k \hat{\beta}_k^{\text{clean}} + \sum_{\ell \in \mathcal{L}_{\text{forbidden}}} w_\ell \hat{\beta}_\ell^{\text{forbidden}}
$$

where clean comparisons match newly treated cohorts to never-treated or not-yet-treated units, but forbidden comparisons match newly treated cohorts against earlier-treated cohorts. In the presence of treatment effect dynamics (where the causal effect $\tau_{it}$ grows or decays over time), the implicit weights $w_\ell$ can become negative:

$$
w_\ell < 0 \implies \hat{\beta}_{\text{TWFE}} < 0 \quad \text{even when } \tau_{it} > 0 \quad \forall i, t
$$

To eliminate this contamination, **Callaway and Sant'Anna (2021)** define the **Group-Time Average Treatment Effect**, $ATT(g, t)$, for units first treated in cohort $g$ observed at calendar time $t$:

$$
ATT(g, t) \equiv \mathbb{E}\left[Y_{it}(g) - Y_{it}(0) \mid G_i = g\right]
$$

Let $C_i \in \{0, 1\}$ denote a clean comparison group (either units that never adopt treatment during the sample window, or units not yet treated by time $t$ such that $D_{is} = 0$ for all $s \le t$). Anchoring the baseline strictly at the pre-treatment period $g - 1$:

$$
\widehat{ATT}(g, t) = \mathbb{E}\left[Y_{it} - Y_{i, g-1} \mid G_i = g\right] - \mathbb{E}\left[Y_{it} - Y_{i, g-1} \mid C_i = 1\right]
$$

To evaluate dynamic treatment paths across relative event time $e = t - g$ (where $e = 0$ is the implementation period, $e > 0$ represents post-treatment exposure, and $e < 0$ tests for pre-trends), the group-time parameters are aggregated:

$$
\widehat{ATT}(e) = \sum_{g} w(g, e) \widehat{ATT}(g, g + e), \quad \text{subject to } \sum_{g} w(g, e) = 1
$$

where the weights $w(g, e)$ are proportional to the cohort sample size $N_g$ among cohorts observable at event time $e$.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $Y_{it}$: Observed outcome of entity $i$ at calendar period $t$.
* $\alpha_i, \lambda_t$: Entity and calendar-time fixed effects controlling for permanent unobserved heterogeneity and universal secular shocks.
* $D_{it} \in \{0, 1\}$: Binary treatment indicator ($D_{it} = 1$ if unit $i$ is actively treated at time $t$, $0$ otherwise).
* $G_i \in \{1, \dots, T\} \cup \{\infty\}$: Cohort identifier indicating the exact adoption period when unit $i$ first received treatment ($G_i = \infty$ denotes never-treated units).
* $\beta_{\text{TWFE}}$: The single scalar pooled coefficient estimated by traditional two-way fixed effects regression.
* $ATT(g, t)$: The causal average treatment effect on the cohort first treated at time $g$, evaluated at calendar time $t$.
* $g - 1$: The critical pre-treatment reference period immediately preceding treatment adoption, used to anchor all baseline changes.
* $C_i$: Clean comparison indicator selecting strictly never-treated or not-yet-treated observations.
* $e = t - g$: Relative event time (lead or lag), measuring elapsed time relative to initial policy implementation.

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
    group: np.ndarray,
    time: np.ndarray,
    target_g: int,
    target_t: int,
    never_treated_val: int = 0
) -> float:
    """
    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)
    using the never-treated comparison group and pre-treatment base period g - 1.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed outcome values.
    group : np.ndarray of shape (N,)
        Treatment cohort adoption period (never_treated_val indicates never treated).
    time : np.ndarray of shape (N,)
        Calendar time period of observation.
    target_g : int
        The cohort adoption period to evaluate.
    target_t : int
        The calendar period of observation.
    never_treated_val : int
        Identifier for the never-treated comparison group.
        
    Returns
    -------
    float
        The estimated ATT(target_g, target_t).
    """
    # Step 1: Establish clean baseline period immediately prior to cohort adoption
    base_period = target_g - 1
    
    # Step 2: Compute change for target treated cohort between base_period and target_t
    treated_post = y[(group == target_g) & (time == target_t)]
    treated_pre = y[(group == target_g) & (time == base_period)]
    delta_treated = float(np.mean(treated_post) - np.mean(treated_pre))
    
    # Step 3: Compute change for never-treated control units across identical period
    control_post = y[(group == never_treated_val) & (time == target_t)]
    control_pre = y[(group == never_treated_val) & (time == base_period)]
    delta_control = float(np.mean(control_post) - np.mean(control_pre))
    
    # Step 4: Clean difference-in-differences isolating ATT(g, t)
    return float(delta_treated - delta_control)
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
