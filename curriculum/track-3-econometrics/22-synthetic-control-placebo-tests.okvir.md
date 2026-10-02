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

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

You run the Synthetic Control Method on California's Proposition 99 and discover that cigarette sales plunged by 25 packs per capita. 

A skeptical critic raises their hand: *"How do you know that 25-pack drop isn't just random luck? In any group of 50 states, some state is always going to have the biggest drop by pure chance. You only have ONE treated state ($N = 1$), so you cannot run a standard t-test!"*

The critic has a brilliant point: traditional statistical hypothesis tests fail when you only have a single treated unit.

How do we prove the critic wrong? Through **In-Space Placebo Permutation Tests**.

We repeat the exact same synthetic control procedure on every single state in the donor pool, pretending that **they** passed the law in 1988:
* We construct a 'Synthetic Nevada' and calculate fake Nevada's gap.
* We construct a 'Synthetic Montana' and calculate fake Montana's gap.
* We construct a synthetic control for all 38 donor states!

When you plot all 38 fake placebo gaps on a single graph, they form a tight, buzzing tangle of lines centered right around zero (the **Spaghetti Plot**). Real California plunges dramatically below the entire bundle of placebo lines!

To formalize this, we calculate the **RMSPE Ratio** ($\text{Post-law gap} / \text{Pre-law fit}$). If California has a higher ratio than all 38 placebo states, the exact permutation $p$-value is $\frac{1}{39} = 0.025$—statistically significant at the 5% level!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **In-Space Placebo** | The fake experiment: pretending an untreated control unit was treated to measure baseline noise. |
| **In-Time Placebo** | The fake timeline: pretending the law was passed 5 years before it actually happened. |
| **RMSPE** | Root Mean Squared Prediction Error: the average distance between a unit and its synthetic twin. |
| **RMSPE Ratio** | The signal-to-noise ratio: (Post-intervention error) / (Pre-intervention fit error). |
| **Permutation P-value** | Exact rank probability: California's ranking among all placebo units divided by total units. |

```text
    THE SCM PLACEBO SPAGHETTI PLOT:

    Treatment Gap (Actual - Synthetic)
      ^
      |                Pre-1988 (Good Fit)     :    Post-1988 (Treatment Impact)
   20 |                 \     /     /          :      /     /   /
      |                  \   /     /           :     /     /   /  (Donor Placebo Gaps)
    0 |  - - - - - - - - - - - - - - - - - - - : - - - - - - - - - - - - - - - - - - - -
      |                  /   \     \           :     \     \   \  (Random Fluctuation Noise)
  -20 |                 /     \     \          :      \     \   \
      |                                        :       \
  -40 |                                        :        * REAL CALIFORNIA (Extreme Outlier!)
      0----------------------------------------+----------------------------------------> Year
                                             1988
```

### الحدس والقصة الواقعية

طبقت منهج الضابط الاصطناعي على قانون كاليفورنيا لمكافحة التبغ ووجدت أن مبيعات السجائر انخفضت بمقدار 25 علبة للفرد.

يقف ناقد متشكك ويسألك: *"كيف تثبت أن هذا الانخفاض ليس مجرد صدفة عشوائية؟ ففي أي عينة من 50 ولاية، لا بد وأن تكون إحدى الولايات هي الأكثر انخفاضًا بالصدفة المحضة! وأنت تملك ولاية معالجة واحدة فقط ($N=1$)، مما يعني استحالة إجراء اختبار $t$ التقليدي!"*

الناقد محق في تحديه؛ فالطرق الإحصائية التقليدية تفشل عند دراسة حالة فريدة واحدة.

كيف نجيب عن هذا التحدي علميًا؟ عبر **اختبارات الغُفْل المكانية (In-Space Placebo Tests)**.

نعيد تطبيق خوارزمية الضابط الاصطناعي ذاتها على كل ولاية في حوض المانحين، متظاهرين بأنها **هي** التي طبقت القانون في 1988:
* نبني توأمًا اصطناعيًا لنيفادا ونحسب فجوتها الوهمية.
* نبني توأمًا اصطناعيًا لمونتانا ونحسب فجوتها الوهمية.
* نكرر ذلك عبر جميع الـ 38 ولاية المتبقية!

عند رسم مسارات هذه التجارب الوهمية معًا، تتشابك خطوطها حول الصفر كخيوط السباغيتي. وتبرز كاليفورنيا الحقيقية كخط وحيد يغوص عميقًا في الأسفل بمفرده خارج سرب كل الولايات الوهمية!

ونحسب **نسبة خطأ RMSPE** (فجوة ما بعد القانون مقسومة على جودة تطابق ما قبل القانون). وإذا كانت نسبة كاليفورنيا أعلى من كافة الولايات الـ 38، فإن القيمة الاحتمالية الدقيقة هي $\frac{1}{39} = 0.025$، مما يثبت نجاح القانون بدلالة إحصائية قاطعة!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **الغُفْل المكاني (In-Space Placebo)** | التجربة الزائفة: التظاهر بمعالجة ولاية ضابطة لقياس حجم الصدفة الطبيعية. |
| **الغُفْل الزماني (In-Time Placebo)** | التوقيت المزيف: التظاهر بصدور القانون قبل موعده بـ 5 سنوات لاختبار متانة النموذج. |
| **جذر متوسط مربعات الخطأ (RMSPE)** | مقياس الفجوة: متوسط المسافة الفاصلة بين الولاية وتوأمها الاصطناعي. |
| **نسبة RMSPE** | نسبة الإشارة إلى التشويش: قسمة فجوة ما بعد القانون على دقة ما قبل القانون. |
| **القيمة الاحتمالية التباديلية** | الترتيب الدقيق: رتبة كاليفورنيا بين الولايات مقسومة على إجمالي عدد الحالات. |

:::simulation-widget{engine="canvas2d" component="SCMPlaceboPermutationLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

For any unit $j \in \{1, \dots, J+1\}$, define the Pre-Intervention and Post-Intervention Root Mean Squared Prediction Error:

$$
\text{RMSPE}_j^{\text{pre}} = \sqrt{\frac{1}{T_0} \sum_{t=1}^{T_0} \left( Y_{jt} - \hat{Y}_{jt}^{\text{synth}} \right)^2}
$$

$$
\text{RMSPE}_j^{\text{post}} = \sqrt{\frac{1}{T - T_0} \sum_{t=T_0+1}^T \left( Y_{jt} - \hat{Y}_{jt}^{\text{synth}} \right)^2}
$$

The ratio of post-to-pre RMSPE measures treatment signal relative to baseline noise:

$$
r_j = \frac{\text{RMSPE}_j^{\text{post}}}{\text{RMSPE}_j^{\text{pre}}}
$$

Under the sharp null hypothesis of no treatment effect for any unit ($H_0: \tau_{1t} = 0$), Abadie, Diamond, and Hainmueller (2010) formulate the exact permutation $p$-value:

$$
p = \frac{\sum_{j=1}^{J+1} \mathbf{1}(r_j \ge r_1)}{J + 1}
$$

### Why the Math Works Step-by-Step

1. **Why divide by $\text{RMSPE}^{\text{pre}}$?**
   Some donor states fit very poorly before treatment (large $\text{RMSPE}^{\text{pre}}$). A state with a terrible pre-treatment fit will naturally have a huge post-treatment gap purely due to bad modeling! Dividing by pre-treatment RMSPE penalizes poorly fitted placebos, ensuring a fair, normalized playing field.
2. **Exact Finite-Sample Permutation Test:**
   Unlike asymptotic t-tests requiring $N \to \infty$, Fisher's permutation test is exact in finite samples regardless of distribution assumptions.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $r_1$: Post/Pre RMSPE ratio for the truly treated unit.
* $r_j$: Post/Pre RMSPE ratio for placebo donor unit $j$.
* $p$: Exact permutation $p$-value evaluating the rarity of the treated unit's response.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\text{RMSPE}^{\text{pre}}$ | خطأ التطابق المسبق | دقة التوأم الاصطناعي في تمثيل الوحدة قبل صدور القرار. |
| $\text{RMSPE}^{\text{post}}$ | فجوة ما بعد التدخل | حجم الانحراف والانفصال بين الوحدة وتوأمها بعد صدور القرار. |
| $r_j$ | نسبة الإشارة إلى الضوضاء | النسبة المعيارية التي تمنع التوأم الضعيف من إعطاء انطباع مضلل. |
| القيمة الاحتمالية $p$ | إحصائية فيشر التباديلية | نسبة الحالات الوهمية التي حققت أثرًا يفوق أثر الوحدة المعالجة الحقيقية. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the Synthetic Control permutation inference engine in NumPy. You will:
1. Extract pre-treatment gaps ($t \in [0, T_0)$) and post-treatment gaps ($t \in [T_0, T)$) for all units.
2. Calculate $\text{RMSPE}_{\text{pre}}$ and $\text{RMSPE}_{\text{post}}$ for each column in the gaps matrix.
3. Compute the ratio $r_j = \frac{\text{RMSPE}_{\text{post}}(j)}{\text{RMSPE}_{\text{pre}}(j)}$ (adding $\epsilon = 10^{-8}$ to prevent zero-division).
4. Compute the exact empirical $p$-value and determine the 1-based rank of the treated unit (column 0).

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

def compute_rmspe_ratio_pvalue(rmspe_pre: np.ndarray, rmspe_post: np.ndarray) -> dict[str, float]:
    """
    Computes post/pre RMSPE ratios and the exact permutation p-value for SCM placebos.

    Parameters
    ----------
    rmspe_pre : np.ndarray of shape (J+1,)
        Index 0 is treated unit, indices 1..J are donor placebos.
    rmspe_post : np.ndarray of shape (J+1,)
        Index 0 is treated unit, indices 1..J are donor placebos.

    Returns
    -------
    dict with keys 'treated_ratio', 'p_value'
    """
    # Avoid zero division
    ratios = rmspe_post / np.maximum(rmspe_pre, 1e-8)
    treated_ratio = float(ratios[0])

    # Permutation p-value: proportion of units with ratio >= treated_ratio
    count_extreme = np.sum(ratios >= treated_ratio)
    p_value = float(count_extreme / len(ratios))

    return {
        "treated_ratio": treated_ratio,
        "p_value": p_value,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

In Alberto Abadie and Javier Gardeazabal's (2003) classic study on the economic costs of terrorism in the Basque Country, the authors evaluate whether the Basque per capita GDP gap after 1975 was statistically significant by running in-space placebos across 16 other Spanish regions.

Suppose region #12 (Extremadura) exhibits a raw post-1975 gap that is twice as large as the Basque Country's gap. However, Extremadura's pre-1975 RMSPE was 14 times larger than the Basque pre-1975 RMSPE because its agrarian economy could not be matched well by the donor pool.

How does the standardized RMSPE ratio ($r_j = \text{RMSPE}_{\text{post}} / \text{RMSPE}_{\text{pre}}$) correctly handle this case compared to evaluating raw post-treatment gaps?

* [ ] Raw post-treatment gaps are always preferred because pre-treatment errors are white noise that cancels out over time.
  *الفجوات المطلقة بعد المعالجة أفضل دائماً لأن أخطاء ما قبل المعالجة تلغي بعضها تلقائياً.*
  > **Why this is incorrect:** Pre-treatment errors reflect fundamental mismatch, not mean-zero independent noise; poor pre-treatment fit guarantees large, erratic post-treatment gaps.
  > **لماذا هذا الخيار خاطئ:** أخطاء ما قبل المعالجة تعكس فشل المطابقة الهيكلية وليست مجرد ضجيج عابر.
* [x] The RMSPE ratio penalizes regions with poor pre-treatment fit: although Extremadura has a large raw post-treatment gap, dividing by its massive pre-treatment error yields a small RMSPE ratio, preventing volatile, poorly-matched placebos from artificially destroying the statistical significance of the treated unit.
  *تعاقب نسبة RMSPE المناطق سيئة المطابقة المسبقة؛ فرغم كبر الفجوة المطلقة لإكستريمادورا بعد 1975، فإن قسمتها على خطأ المطابقة المسبق الضخم ينتج نسبة RMSPE ضئيلة، مما يمنع الوحدات الشاذة من إفساد الدلالة الإحصائية للوحدة المعالجة.*
  > **Why this is correct:** An untreated unit that was never well-matched prior to the policy cannot provide a credible falsification test; scaling by baseline error ensures that only units with genuine post-treatment divergence relative to baseline are ranked highly.
  > **لماذا هذا الخيار صحيح:** الوحدة التي فشلت الخوارزمية في تمثيلها قبل المعالجة لا تصلح كاختبار وهمي موثوق؛ وتوحيد المقياس بالنسبة يحمي مصداقية الاستدلال الإحصائي.
* [ ] The ratio forces Extremadura's donor weights to become negative, automatically dropping it from the permutation distribution.
  *تجبر النسبة أوزان إكستريمادورا على أن تصبح سالبة مما يستبعدها من التوزيع.*
  > **Why this is incorrect:** Permutation tests evaluate fitted gaps across all units; weights are fixed non-negative values within each unit's optimization.
  > **لماذا هذا الخيار خاطئ:** أوزان الشبيه الاصطناعي مقيدة بعدم السلبية دائماً داخل خوارزمية كل وحدة.
* [ ] The ratio mathematically transforms the non-parametric permutation distribution into an asymptotic Gaussian Student's t-distribution.
  *تحول النسبة التوزيع غير المعلمي إلى توزيع غاوسي طبيعي كلاسيكي.*
  > **Why this is incorrect:** The permutation test remains strictly non-parametric; it makes no distributional assumptions whatsoever.
  > **لماذا هذا الخيار خاطئ:** يظل اختبار التباديل لا معلمياً تماماً ولا يعتمد على افتراض التوزيع الطبيعي.
