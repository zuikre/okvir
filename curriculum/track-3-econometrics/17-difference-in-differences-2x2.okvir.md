---
id: "difference-in-differences-2x2"
version: "1.0.0"
title: "Canonical 2x2 Difference-in-Differences & Parallel Trends"
track: "econometrics"
module: "mod-26"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding", "panel-data-fixed-effects"]
i18n:
  ar: "الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي"
---

# Canonical 2x2 Difference-in-Differences & Parallel Trends

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

In April 1992, the state of New Jersey raised its minimum wage from $4.25 to $5.05 per hour. Neighboring Pennsylvania kept its minimum wage frozen at $4.25.

Standard economic theory predicted that raising the minimum wage would force fast-food restaurants to lay off workers. To find out, economists David Card and Alan Krueger surveyed 410 fast-food restaurants across New Jersey and eastern Pennsylvania before and after the wage increase.

Why couldn't they simply look at New Jersey restaurants before and after?
Because if employment changed in New Jersey between April and December, that change could be driven by the nationwide economic recovery, changing consumer tastes, or holiday shopping! A simple before-after comparison mixes the policy impact with background economic trends.

This is the brilliance of **Difference-in-Differences (DiD)**:
1. **First Difference:** Measure the employment change in New Jersey (Treated Group).
2. **Second Difference:** Measure the employment change in Pennsylvania (Control Group).
3. **Difference-in-Differences:** Subtract Pennsylvania's background trend from New Jersey's change!

By using Pennsylvania to measure what *would have happened* in the region anyway, DiD isolates the pure causal effect of the policy! 

The entire validity of DiD hinges on the **Parallel Trends Assumption**: that in the absence of the law, New Jersey and Pennsylvania would have moved along parallel paths.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Difference-in-Differences (DiD)** | The double subtraction: policy group change minus control group background trend. |
| **Parallel Trends Assumption** | The bedrock premise: treatment and control groups would have moved in parallel without the policy. |
| **Counterfactual Trend** | The alternate world: what the treated group would have experienced if policy never happened. |
| **Interaction Term ($D \times Post$)** | The regression knob: the single coefficient that measures the DiD treatment effect. |
| **Macro Shock** | A widespread economic wave (like a recession) that affects both groups simultaneously. |

```text
    THE CLASSIC 2x2 DiD TRAJECTORY:

    Outcome (Employment)
      ^
      |                                * New Jersey (Actual Post-Treatment)
      |                               / |
      |                              /  | DiD Treatment Effect (tau)
      |                             /   v
      |  NJ Pre * - - - - - - - - - - - * Counterfactual NJ (Follows PA's Trend!)
      |          \                     /
      |           \                   /
      |            \                 /
      |  PA Pre * - \ - - - - - - - * PA Post (Measures Background Trend)
      0-------------+---------------+-------------------------------------> Time
                  Pre-Policy      Post-Policy
```

### الحدس والقصة الواقعية

في أبريل 1992، رفعت ولاية نيوجيرسي الأمريكية الحد الأدنى للأجور من 4.25 إلى 5.05 دولار في الساعة، بينما أبقت ولاية بنسلفانيا المجاورة حدها الأدنى ثابتًا عند 4.25 دولار.

توقعت النظريات الاقتصادية الكلاسيكية أن رفع الأجور سيجبر مطاعم الوجبات السريعة على تسريح العمال. ولاختبار ذلك، أجرى الاقتصاديان ديفيد كارد وآلان كروجر مسحًا لـ 410 مطاعم في نيوجيرسي وبنسلفانيا قبل تطبيق القانون وبعده.

لماذا لم يكتفِ الباحثان بمقارنة نيوجيرسي قبل القرار وبعده فحسب؟
لأنه لو تغير التوظيف في نيوجيرسي، فقد يكون التغير ناتجًا عن تعافي الاقتصاد العام أو مواسم التسوق! فالمقارنة الزمنية البسيطة تخلط أثر السياسة بالتقلبات الاقتصادية العامة.

هنا تتجلى عبقرية **منهج الفروق في الفروق (Difference-in-Differences - DiD)**:
1. **الفرق الأول:** قياس التغير الزمني في نيوجيرسي (مجموعة المعالجة).
2. **الفرق الثاني:** قياس التغير الزمني في بنسلفانيا (المجموعة الضابطة).
3. **فارق الفارقين:** طرح المسار الاقتصادي العام لبنسلفانيا من التغير الحاصل في نيوجيرسي!

تعتمد مصداقية هذا المنهج بالكامل على **فرضية المسارات المتوازية (Parallel Trends)**: أي افتراض أنه لولا صدور القانون، لكانت الولايتان قد تحركتا في مسارين متوازيين تمامًا.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **الفروق في الفروق (DiD)** | الطرح المزدوج: خصم التغير الطبيعي للمجموعة الضابطة من تغير مجموعة المعالجة. |
| **فرضية المسارات المتوازية** | الركيزة الأساسية: افتراض سير المجموعتين في خطين متوازيين لولا تطبيق السياسة. |
| **المسار الافتراضي البديل** | خط الواقع المضاد: مسار مجموعة المعالجة المتوقع لو لم يصدر القرار قط. |
| **حد التفاعل ($D \times Post$)** | المعامل المرجو: المتغير التفاعلي في الانحدار الذي يلتقط الأثر السببي الصافي. |
| **الصدمات الاقتصادية الكلية** | موجات عامة (كالركود الاقتصادي أو المواسم) تؤثر على المجموعتين معًا في آن واحد. |

:::simulation-widget{engine="canvas2d" component="DiDParallelTrendsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In the canonical $2 \times 2$ design with treatment group $T \in \{0, 1\}$ and post-treatment period $P \in \{0, 1\}$:

$$
\tau_{\text{DiD}} = \left( \mathbb{E}[Y \mid T=1, P=1] - \mathbb{E}[Y \mid T=1, P=0] \right) - \left( \mathbb{E}[Y \mid T=0, P=1] - \mathbb{E}[Y \mid T=0, P=0] \right)
$$

This estimator is estimated via OLS using the interaction regression:

$$
y_{it} = \beta_0 + \beta_1 T_i + \beta_2 P_t + \tau (T_i \times P_t) + \varepsilon_{it}
$$

where:
* $\beta_1$: Baseline difference between treated and control groups before policy.
* $\beta_2$: Common macroeconomic time trend shared by both groups.
* $\tau$: The causal treatment effect of interest.

### Why the Math Works Step-by-Step

1. **Algebraic Proof of Equivalence:**
   * $\mathbb{E}[Y \mid T=0, P=0] = \beta_0$
   * $\mathbb{E}[Y \mid T=0, P=1] = \beta_0 + \beta_2$ (Control change $= \beta_2$)
   * $\mathbb{E}[Y \mid T=1, P=0] = \beta_0 + \beta_1$
   * $\mathbb{E}[Y \mid T=1, P=1] = \beta_0 + \beta_1 + \beta_2 + \tau$ (Treated change $= \beta_2 + \tau$)
   Subtracting control change from treated change: $(\beta_2 + \tau) - \beta_2 = \tau$!
2. **Testing Parallel Trends via Pre-Treatment Event Studies:**
   If multiple pre-policy periods exist, researchers estimate coefficients on leads: $\sum_{k < 0} \tau_k (T_i \times \text{Year}_k)$. If pre-treatment coefficients are statistically indistinguishable from zero, the parallel trends assumption is validated.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $T_i \in \{0, 1\}$: Group indicator (1 for treated units, 0 for control units).
* $P_t \in \{0, 1\}$: Time indicator (1 for post-intervention periods, 0 for pre-intervention).
* $T_i \times P_t$: Policy interaction dummy switching to 1 only for treated units after launch.
* $\tau$: True Difference-in-Differences treatment effect.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\beta_1$ | الفارق الأساسي المسبق | الفجوة الدائمة الأصلية في المستوى بين المجموعتين قبل تطبيق أي قرار. |
| $\beta_2$ | المسار الزمني المشترك | مقدار التغير الطبيعي الذي طرأ عبر الزمن على الجميع بسبب الظروف العامة. |
| $\tau$ | أثر المعالجة السببي الصافي | معامل التفاعل الذي يقيس بدقة القفزة الإضافية الخاصة بمجموعة القرار وحدها. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the canonical $2 \times 2$ Difference-in-Differences estimation engine in NumPy. You will:
1. Compute the four group-by-period cell means ($\bar{Y}_{1,1}, \bar{Y}_{1,0}, \bar{Y}_{0,1}, \bar{Y}_{0,0}$).
2. Calculate the sample double difference $\hat{\delta}_{\text{DiD}}$ and the imputed counterfactual level.
3. Construct the design matrix $\mathbf{X} = [\mathbf{1}, \mathbf{G}, \mathbf{T}, \mathbf{G} \odot \mathbf{T}]$ and fit the OLS regression to confirm algebraic equivalence.

:::python-challenge{id="py-difference-in-differences-2x2"}
---
timeout_ms: 3000
test_cases:
  - input: "res = compute_did_2x2(np.array([10.0, 12.0, 10.0, 16.0]), np.array([0, 0, 1, 1]), np.array([0, 1, 0, 1])); f\"{res['delta_did']:.1f}, {res['counterfactual']:.1f}\""
    expected: "4.0, 12.0"
  - input: "res = compute_did_2x2(np.array([5.0, 5.0, 8.0, 15.0]), np.array([0, 0, 1, 1]), np.array([0, 1, 0, 1])); f\"{res['delta_did']:.1f}, {res['beta_interaction']:.1f}\""
    expected: "7.0, 7.0"
---
```python
import numpy as np

def compute_did_2x2(y: np.ndarray, treated: np.ndarray, post: np.ndarray) -> dict[str, float]:
    """
    Computes canonical 2x2 Difference-in-Differences using OLS interaction regression.

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Outcome observations.
    treated : np.ndarray of shape (N,)
        Binary indicator: 1 if unit is in treated group, 0 if control.
    post : np.ndarray of shape (N,)
        Binary indicator: 1 if observation is post-treatment, 0 if pre.

    Returns
    -------
    dict with keys 'did_tau', 'pre_diff', 'post_diff'
    """
    n = len(y)
    interaction = treated * post

    # Construct design matrix: [1, treated, post, treated*post]
    X = np.column_stack([np.ones(n), treated, post, interaction])

    # Fit OLS
    beta = np.linalg.solve(X.T @ X, X.T @ y)

    did_tau = float(beta[3])
    pre_diff = float(np.mean(y[(treated == 1) & (post == 0)]) - np.mean(y[(treated == 0) & (post == 0)]))
    post_diff = float(np.mean(y[(treated == 1) & (post == 1)]) - np.mean(y[(treated == 0) & (post == 1)]))

    return {
        "did_tau": did_tau,
        "pre_diff": pre_diff,
        "post_diff": post_diff,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

An international e-commerce platform rolls out an AI-driven one-click checkout system in Germany in Q2, while retaining the legacy multi-step checkout in France.
- In Q1 (pre-treatment), conversion rates were $4.0\%$ in France and $6.0\%$ in Germany.
- In Q2 (post-treatment), conversion rates rose to $5.5\%$ in France and $9.5\%$ in Germany.

The growth VP claims: *"The new AI checkout produced a $3.5$ percentage point lift in Germany because conversion jumped from $6.0\%$ to $9.5\%$!"*

What is the true causal Difference-in-Differences estimate, and what critical empirical threat must the analytics team investigate?

* [ ] The DiD estimate is $+3.5\%$ because baseline differences reflect static user preferences that do not bias rate-of-change metrics.
  *تقدير DiD هو 3.5% لأن الفروق الأولية ثابتة ولا تؤثر على معدل التغير.*
  > **Why this is incorrect:** A simple before-and-after change of $+3.5\%$ ignores secular growth; France grew by $+1.5\%$ concurrently without the new checkout feature.
  > **لماذا هذا الخيار خاطئ:** المقارنة البسيطة قبل وبعد تتجاهل النمو الطبيعي العام؛ فقد ارتفعت فرنسا بنسبة 1.5% دون تطبيق النظام الجديد.
* [x] The DiD estimate is $+2.0\%$ ($(9.5\% - 6.0\%) - (5.5\% - 4.0\%) = 3.5\% - 1.5\% = 2.0\%$); the primary validity threat is a violation of parallel trends, such as an unannounced holiday marketing campaign run exclusively in Germany during Q2.
  *تقدير DiD هو +2.0%؛ وأكبر تهديد لصحة التقدير هو خرق مسار التوازي عبر حملات تسويقية خاصة بألمانيا وحدها في الربع الثاني.*
  > **Why this is correct:** Subtracting the control secular trend ($+1.5\%$) isolates the net $+2.0\%$ lift. The validity hinges entirely on the assumption that absent the AI feature, Germany would have also grown by $1.5\%$.
  > **لماذا هذا الخيار صحيح:** طرح المسار الطبيعي لفرنسا (+1.5%) يعزل الأثر الصافي (+2.0%). وتعتمد صحة النموذج كلياً على أن ألمانيا كانت ستنمو بنفس معدل 1.5% لولا الميزة الجديدة.
* [ ] The DiD estimate is $-0.5\%$ because France had a lower initial baseline, inducing regression to the mean.
  *تقدير DiD هو -0.5% بسبب ارتداد فرنسا نحو المتوسط.*
  > **Why this is incorrect:** Different baseline levels do not invalidate DiD; the method explicitly differences out time-invariant baseline level gaps $\beta_1$.
  > **لماذا هذا الخيار خاطئ:** اختلاف المستويات الأولية لا يبطل DiD، فالنموذج يطرح الفروق الثابتة في المستويات $\beta_1$ تلقائياً.
* [ ] The DiD estimate cannot be computed with aggregate country averages because least squares requires individual session clickstreams to satisfy the Gauss-Markov theorem.
  *لا يمكن حساب DiD باستخدام المتوسطات الكلية لتعارضها مع مبرهنة غاوس-ماركوف.*
  > **Why this is incorrect:** By the Frisch-Waugh-Lovell theorem and cell expectation algebra, group-mean double differencing is mathematically identical to micro-level OLS with clustered standard errors.
  > **لماذا هذا الخيار خاطئ:** حسب مبرهنة فريش-وو-لوفيل، فإن الفروق المزدوجة للمتوسطات تتطابق رياضياً تماماً مع انحدار البيانات الفردية.
