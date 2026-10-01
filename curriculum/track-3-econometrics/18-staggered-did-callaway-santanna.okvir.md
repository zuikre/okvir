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

In real-world policy rollouts, reforms rarely happen in all jurisdictions at the same time. Different states or cities adopt policies in staggered waves (e.g., minimum wage laws, healthcare expansions, or paid sick leave across different years). For decades, applied researchers evaluated these rollouts using a Two-Way Fixed Effects (TWFE) regression with individual and time fixed effects.

Recent econometric breakthroughs (Goodman-Bacon 2021; Callaway & Sant'Anna 2021; Sun & Abraham 2021) revealed a fatal mathematical flaw: TWFE performs "forbidden comparisons." Naively running TWFE with staggered timing is like evaluating a patient who began chemotherapy today by comparing their blood counts not to untreated healthy patients, but to a patient who completed chemotherapy last year and whose counts have already stabilized. Because the early-treated patient's treatment effect has already plateaued, subtracting their trajectory from the newly treated patient subtracts the true treatment effect itself—acting like an inverted photographic negative that can make a genuinely beneficial policy appear harmful!

:::simulation-widget{engine="canvas2d" component="StaggeredDiDEventStudyLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في التطبيقات الواقعية، نادراً ما تُطبق السياسات الاقتصادية والاجتماعية في جميع المناطق في وقت واحد. بل تعتمد معظم الولايات والمدن الإصلاحات عبر موجات تدريجية متفرقة (Staggered Adoption) تمتد لسنوات مختلفة. ولعقود طويلة، اعتمد الباحثون على انحدار الآثار الثابتة ثنائي الاتجاه (TWFE) بمتغيرات وهمية للوحدات والزمن لتقدير الأثر الموحد.

كشفت الثورة القياسية الحديثة (Goodman-Bacon 2021؛ Callaway & Sant'Anna 2021) عن خلل رياضي جوهري أطلق عليه "المقارنات المحظورة". إن تشغيل TWFE في ظل تباين توقيت المعالجة يشبه تقييم مريض بدأ علاجه الكيميائي اليوم بمقارنة تحاليله ليس بأشخاص أصحاء، بل بمريض أنهى علاجه العام الماضي واستقرت حالته! وإذا كانت استجابة المريض القديم قد تباطأت أو استقرت، فإن طرح مساره من مسار المريض الجديد يطرح أثر المعالجة الفعلي، مما قد يقلب معامل الأثر الإيجابي الحقيقي إلى رقم سالب وهمي في الانحدار!

### Mathematical Foundations

The traditional Two-Way Fixed Effects (TWFE) specification estimates:

$$
Y_{it} = \alpha_i + \lambda_t + \beta_{\text{TWFE}} D_{it} + \varepsilon_{it}
$$

Goodman-Bacon (2021) showed that $\hat{\beta}_{\text{TWFE}}$ is a weighted average of all possible $2 \times 2$ DiD sub-comparisons:

$$
\hat{\beta}_{\text{TWFE}} = \sum_{k} w_k \hat{\beta}_{k}^{\text{Clean}} + \sum_{\ell} w_\ell \hat{\beta}_{\ell}^{\text{Forbidden}}
$$

Whenever treatment effects vary over time (dynamic treatment heterogeneity), the weights on earlier-treated units serving as controls for later-treated units can become strictly negative, inducing sign reversal.

Callaway and Sant'Anna (2021) resolve this by defining the clean **Group-Time Average Treatment Effect**, $ATT(g, t)$, for the cohort first treated in period $g$ observed at time $t$:

$$
ATT(g, t) \equiv \mathbb{E}\left[Y_{it}(g) - Y_{it}(0) \mid G_i = g\right]
$$

Using a clean control group $C$ (either units that are never treated, or units not yet treated by time $t$ such that $D_{is} = 0$ for all $s \le t$), the estimator computes:

$$
\widehat{ATT}(g, t) = \mathbb{E}\left[Y_{it} - Y_{i, g-1} \mid G_i = g\right] - \mathbb{E}\left[Y_{it} - Y_{i, g-1} \mid C_i = 1\right]
$$

Notice that the baseline is always anchored at the pre-treatment period $g - 1$ right before cohort $g$ received the policy. The event-study aggregation across event time $e = t - g$ is then given by:

$$
\widehat{ATT}(e) = \sum_{g} w(g, e) \widehat{ATT}(g, g + e), \quad \text{where } \sum_g w(g, e) = 1
$$

يعتمد مقدر كالاواي-سانت آنا (Callaway-Sant'Anna) على حظر المقارنات الملوثة؛ حيث يُقاس أثر كل فوج معالجة $g$ عند كل فترة زمنية $t$ بالرجوع دائماً إلى فترة الأساس السابقة للمعالجة $g - 1$، وبمقارنته حصراً بوحدات نظيفة (لم تُعالج قط، أو لم تكن قد عولجت بحلول الفترة $t$). ومن ثم تُجمع هذه الآثار في دراسة حدث (Event-Study) خالية تماماً من الانحياز الحسابي لـ TWFE.

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
    y : np.ndarray
        Outcome values.
    group : np.ndarray
        Treatment cohort adoption period (0 or never_treated_val indicates never treated).
    time : np.ndarray
        Calendar time period of observation.
    target_g : int
        The cohort adoption year to evaluate.
    target_t : int
        The calendar period of observation.
    never_treated_val : int
        Identifier for the never-treated comparison group.
        
    Returns
    -------
    float
        The estimated ATT(target_g, target_t).
    """
    base_period = target_g - 1
    
    # 1. Treated cohort outcomes at post time target_t and base_period g-1
    treated_post = y[(group == target_g) & (time == target_t)]
    treated_pre = y[(group == target_g) & (time == base_period)]
    delta_treated = float(np.mean(treated_post) - np.mean(treated_pre))
    
    # 2. Never-treated comparison group outcomes at target_t and base_period g-1
    control_post = y[(group == never_treated_val) & (time == target_t)]
    control_pre = y[(group == never_treated_val) & (time == base_period)]
    delta_control = float(np.mean(control_post) - np.mean(control_pre))
    
    # 3. Clean difference-in-differences
    return float(delta_treated - delta_control)
```
:::

### Practical ML Transfer Challenge

#### Scenario: Staggered State Paid Family Leave Evaluation
30 US states adopted paid family leave laws in staggered years between 2012 and 2022. Treatment effects on maternal employment grew over time: a modest +2% in year 1 post-adoption, expanding to +8% by year 4. 

An econometrician runs a standard Two-Way Fixed Effects regression $Y_{st} = \alpha_s + \lambda_t + \beta D_{st} + \varepsilon_{st}$ and is astonished to find $\hat{\beta} = -0.015$ (a negative, statistically significant effect).

**Diagnostic Question:** Why did the classical TWFE regression return a negative estimate despite the policy having strictly positive effects in every state?

- **Option A (Correct):** Due to Goodman-Bacon decomposition artifacts, states that adopted early (whose effects had grown to +8%) served as "controls" for later-adopting states (whose initial effect was only +2%). Subtracting an +8% trajectory from a +2% trajectory creates a negative implicit 2x2 comparison $(-6\%)$, contaminating the pooled TWFE estimate.
- **Option B:** Because maternal employment exhibits high seasonal variance, which strictly violates the Gauss-Markov exogeneity assumption.
- **Option C:** Because the standard errors were clustered at the state level rather than at the individual mother level.
- **Option D:** Because 30 states is fewer than the 40 required by asymptotic Central Limit Theorem convergence.
