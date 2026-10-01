---
id: "synthetic-control-placebo-tests"
version: "1.0.0"
title: "Synthetic Controls Inference & In-Space / In-Time Permutation Tests"
track: "econometrics"
module: "mod-28"
estimated_minutes: 15
prerequisites: ["synthetic-control-method", "central-limit-theorem"]
i18n:
  ar: "الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية"
---

# Synthetic Controls Inference & In-Space / In-Time Permutation Tests

Because the Synthetic Control Method is designed for case studies with a single treated unit ($N=1$, such as California, Germany, or the Basque Country), traditional large-sample inferential statistics (t-statistics, standard errors, and asymptotic $p$-values) cannot be computed. How can an econometrician prove that California's post-1988 decline in cigarette consumption was a genuine causal effect rather than random economic noise?

The answer lies in **exact permutation and placebo (falsification) tests**. Imagine a magician who claims to possess telekinetic powers that make a coin land on heads. To test their claim, you ask everyone in an audience of 50 people to flip the same coin under identical rules. In an **in-space placebo test**, the researcher applies the exact same synthetic control algorithm to every single untreated donor state as if it had passed Proposition 99 in 1988. If the post-treatment gap for California dwarfs the placebo gaps of all 38 control states, the probability of observing this effect by pure chance is at most $1/39 \approx 0.025$. 

By computing the ratio of post-treatment to pre-treatment Root Mean Squared Prediction Error (RMSPE), we standardize each unit's divergence and obtain an exact, non-parametric permutation $p$-value.

:::simulation-widget{engine="canvas2d" component="SCMPlaceboPermutationLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

نظراً لأن طريقة الشبيه الاصطناعي موجهة لدراسات الحالة التي تشمل وحدة معالجة واحدة فقط ($N=1$، مثل ولاية كاليفورنيا أو إقليم الباسك أو دولة بأكملها)، فإن مقاييس الاستدلال الكلاسيكية المعتمدة على العينات اللانهائية (إحصاءات $t$، الخطأ المعياري، والقيم الاحتمالية التقاربية) لا يمكن حسابها. كيف يمكن للباحث إثبات أن انخفاض استهلاك السجائر في كاليفورنيا أثر سببي حقيقي وليس مجرد تقلبات عشوائية؟

يكمن الحل في **اختبارات التباديل والمهدئ الوهمي (Placebo Tests)**. تخيل ساحراً يدعي أنه يستطيع تحريك قطعة نقود بقوة ذهنية لتسقط على الوجه دائماً؛ للتحقق من ادعائه، تطلب من جميع الحاضرين في القاعة (50 شخصاً) رمي القطعة بنفس الطريقة. في **اختبار المهدئ الوهمي المكاني (In-Space Placebo)**، يطبق الباحث خوارزمية الشبيه الاصطناعي على كل ولاية مانحة غير معالجة كما لو أنها طبقت القانون في نفس العام. وإذا كان الفارق المسجل في كاليفورنيا يتفوق على فجوات جميع الولايات الـ 38 الأخرى، فإن احتمال حدوث ذلك بالصدفة البحتة هو $1/39 \approx 0.025$.

ومن خلال قسمة خطأ التنبؤ بعد المعالجة على خطأ التنبؤ قبلها (RMSPE Ratio)، نحصل على معيار موحد ومحايد يمنحنا قيمة احتمالية دقيقة وغير معلمية (Non-parametric Permutation p-value).

### Mathematical Foundations

Let $T_0$ denote the pre-treatment period, and $T$ the total number of periods. For each unit $j \in \{1, \dots, J+1\}$ (where $j=1$ is treated and $j \ge 2$ are placebos), define the gap at time $t$ as $\hat{\tau}_{jt} = Y_{jt} - \hat{Y}_{jt}^{\text{syn}}$.

The Root Mean Squared Prediction Error (RMSPE) is computed for the pre- and post-intervention periods:

$$
\text{RMSPE}_{\text{pre}}(j) = \sqrt{\frac{1}{T_0} \sum_{t=1}^{T_0} (Y_{jt} - \hat{Y}_{jt}^{\text{syn}})^2}
$$

$$
\text{RMSPE}_{\text{post}}(j) = \sqrt{\frac{1}{T - T_0} \sum_{t=T_0 + 1}^{T} (Y_{jt} - \hat{Y}_{jt}^{\text{syn}})^2}
$$

To prevent units with poor pre-treatment fit from artificially dominating the placebo distribution, Abadie et al. (2010) introduced the **RMSPE Ratio**:

$$
r_j \equiv \frac{\text{RMSPE}_{\text{post}}(j)}{\text{RMSPE}_{\text{pre}}(j)}
$$

The exact permutation $p$-value for the treated unit ($j=1$) is the proportion of units with an RMSPE ratio greater than or equal to $r_1$:

$$
p = \frac{1}{J + 1} \sum_{j=1}^{J+1} \mathbb{I}(r_j \ge r_1)
$$

If $r_1$ is strictly the largest among all $J+1$ units, the empirical $p$-value achieves the minimum possible value $p = \frac{1}{J+1}$.

#### In-Time Falsification (Placebo in Time)
A complementary diagnostic reassings the intervention date to a fictional year $T_0^{\text{fake}} < T_0$ strictly before the true policy occurred. If the synthetic control diverges significantly prior to the true policy date, the pre-treatment identification is deemed spurious.

تضمن نسبة RMSPE معاقبة وموازنة الوحدات التي كان تمثيلها الاصطناعي ضعيفاً قبل المعالجة، مما يضمن أن القيمة الاحتمالية $p$ تعكس تفوقاً حقيقياً لظهور الأثر السببي بعد المعالجة دون تضخيم من رداءة التطابق المسبق.

:::python-challenge{id="py-synthetic-control-placebo-tests"}
---
timeout_ms: 3000
test_cases:
  - input: "gaps = np.array([[0.1, 0.1, 5.0, 5.0], [0.5, 0.5, 0.5, 0.5], [1.0, 1.0, 1.0, 1.0]]).T; res = compute_rmspe_ratio_pvalue(gaps, t0_idx=2); f\"{res['p_value']:.4f}, {res['rank']}\""
    expected: "0.3333, 1"
  - input: "gaps = np.array([[0.2, 0.2, 0.2, 0.2], [0.1, 0.1, 4.0, 4.0], [0.5, 0.5, 0.5, 0.5]]).T; res = compute_rmspe_ratio_pvalue(gaps, t0_idx=2); f\"{res['rank']}\""
    expected: "3"
---
```python
import numpy as np

def compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:
    """
    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.
    
    Parameters
    ----------
    gaps_matrix : np.ndarray of shape (T, J + 1)
        Matrix of estimated gap series (actual - synthetic) across T periods.
        Column 0 corresponds to the treated unit; columns 1..J are placebos.
    t0_idx : int
        Number of pre-treatment periods (index where treatment starts).
        
    Returns
    -------
    dict with keys:
        'ratios': Array of RMSPE ratios for all units.
        'treated_ratio': Ratio for treated unit (column 0).
        'p_value': Exact empirical permutation p-value.
        'rank': 1-based rank of the treated unit (1 = largest ratio).
    """
    T, num_units = gaps_matrix.shape
    
    # 1. Pre-treatment RMSPE: periods 0 to t0_idx
    pre_gaps = gaps_matrix[:t0_idx, :]
    rmspe_pre = np.sqrt(np.mean(pre_gaps ** 2, axis=0))
    # Avoid zero division with small epsilon
    rmspe_pre = np.maximum(rmspe_pre, 1e-8)
    
    # 2. Post-treatment RMSPE: periods t0_idx to T
    post_gaps = gaps_matrix[t0_idx:, :]
    rmspe_post = np.sqrt(np.mean(post_gaps ** 2, axis=0))
    
    # 3. RMSPE Ratios
    ratios = rmspe_post / rmspe_pre
    treated_ratio = float(ratios[0])
    
    # 4. Exact Permutation p-value and Rank
    p_value = float(np.mean(ratios >= treated_ratio))
    rank = int(np.sum(ratios > treated_ratio) + 1)
    
    return {
        "ratios": ratios,
        "treated_ratio": treated_ratio,
        "p_value": p_value,
        "rank": rank
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: Placebo Disparity in Basque Terrorism Study
In Abadie and Gardeazabal's (2003) landmark study on the economic costs of conflict in the Basque Country, the authors evaluate whether the Basque per capita GDP gap after 1975 was significant by running in-space placebos across 16 other Spanish regions.

Suppose region #12 (Extremadura) exhibits a post-1975 gap that is twice as large as the Basque Country's gap. However, Extremadura's pre-1975 RMSPE was 12 times larger than the Basque pre-1975 RMSPE because its agrarian economy could not be matched by any combination of donor regions.

**Diagnostic Question:** How does the RMSPE ratio ($r_j = \text{RMSPE}_{\text{post}} / \text{RMSPE}_{\text{pre}}$) correctly evaluate this phenomenon compared to looking only at raw post-treatment gaps?

- **Option A (Correct):** The ratio penalizes regions with poor pre-treatment fit: although Extremadura has a large raw post-treatment gap, dividing by its massive pre-treatment error yields a modest RMSPE ratio, correctly preventing volatile, poorly-matched placebos from artificially distorting the statistical significance of the treated unit.
- **Option B:** The ratio forces Extremadura's weights to become negative, automatically removing it from the donor pool.
- **Option C:** The ratio transforms the non-parametric permutation distribution into an asymptotic Gaussian Student's t-distribution.
- **Option D:** Raw gaps are always superior to ratios because pre-treatment errors represent structural fixed effects that cancel out over time.
