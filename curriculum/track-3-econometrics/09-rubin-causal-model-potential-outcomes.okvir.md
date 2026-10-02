---
id: "rubin-causal-model-potential-outcomes"
version: "1.0.0"
title: "The Rubin Causal Model & The Fundamental Problem of Causal Inference"
track: "econometrics"
module: "mod-22"
estimated_minutes: 15
prerequisites: ["constrained-optimization-lagrange"]
i18n:
  ar: "نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي"
---

# The Rubin Causal Model & The Fundamental Problem of Causal Inference

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

You wake up on a Tuesday morning with a pounding migraine. You open your medicine cabinet, take a newly developed painkiller, and go back to bed. Two hours later, your headache is completely gone.

Did the painkiller cure your headache?

It seems obvious to say 'yes'. But consider what would have happened if you had just drunk a glass of water and taken a nap without the pill: *would your headache have cleared up on its own anyway?*

To know the **true causal effect** of the pill on you, we need to compare two parallel realities for the exact same person at the exact same moment:
1. Reality 1: Your health outcome having taken the pill, written as $Y_i(1)$.
2. Reality 2: Your health outcome without the pill, written as $Y_i(0)$.

The causal effect is the difference between these two parallel universes: $\tau_i = Y_i(1) - Y_i(0)$. 

Here is the tragedy of science, known as the **Fundamental Problem of Causal Inference**: we can only ever observe one reality for any individual! Once you swallow the pill, the universe where you didn't swallow it becomes a ghost—a **counterfactual** forever hidden from observation.

The **Rubin Causal Model** formalizes this intuition. Because individual causal effects cannot be seen directly, econometrics shifts its focus to estimating the **Average Treatment Effect (ATE)** across a population: $\mathbb{E}[Y(1) - Y(0)]$.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Potential Outcomes ($Y(1), Y(0)$)** | The two parallel futures: outcome with treatment vs outcome without treatment. |
| **Counterfactual** | The unobserved path not taken: what would have happened in the alternate universe. |
| **Fundamental Problem of Causal Inference** | You can only live one reality; the counterfactual is always missing data. |
| **Average Treatment Effect (ATE)** | The average payoff across the entire population: $\mathbb{E}[Y(1) - Y(0)]$. |
| **SUTVA** | No interference: one person's treatment doesn't spill over to change someone else's outcome. |

```text
    THE SPLIT PARALLEL UNIVERSES:

                     +---> [ Universe 1: Took Pill ] ---> Y_i(1) = Headache Gone (Observed!)
                     |
    [ Patient Alice ]
                     |
                     +---> [ Universe 0: No Pill ]   ---> Y_i(0) = ??? (Counterfactual Ghost!)
```

### الحدس والقصة الواقعية

تستيقظ صباح يوم الثلاثاء بصداع نصفي حاد. تفتح خزانة الأدوية وتتناول مسكنًا جديدًا وتعود للنوم. بعد ساعتين، يختفي الصداع تمامًا.

هل كان الدواء هو السبب الحقيقي لشفائك؟

يبدو الجواب البديهي "نعم". ولكن فكر فيما كان سيحدث لو شربت كوب ماء وأخذت قسطًا من الراحة دون تناول الحبة: *ألم يكن الصداع ليزول تلقائيًا بمفرده؟*

لمعرفة **الأثر السببي الحقيقي** للدواء عليك، نحتاج إلى مقارنة عالمين متوازيين للشخص نفسه في اللحظة الزمنية ذاتها:
1. الواقع الأول: حالتك الصحية بعد تناول الدواء، ونرمز لها بـ $Y_i(1)$.
2. الواقع الثاني: حالتك الصحية دون تناول الدواء، ونرمز لها بـ $Y_i(0)$.

الأثر السببي الفعلي هو الفارق بين هذين العالمين: $\tau_i = Y_i(1) - Y_i(0)$.

وهنا تصطدم البشرية بـ **المعضلة الأساسية للاستدلال السببي**: لا يمكننا أبدًا مشاهدة سوى واقع واحد فقط لأي إنسان! فبمجرد ابتلاعك للدواء، يتحول المسار الآخر إلى شبح غائب—**واقع مضاد (Counterfactual)** يستحيل رصده.

يضع **نموذج روبين السببي (Rubin Causal Model)** هذا الحدس في إطار رياضي دقيق؛ ولأننا نعجز عن حساب الأثر الفردي لكل شخص، فإننا نوجه بوصلة العلم نحو تقدير **متوسط أثر المعالجة (ATE)** عبر عموم المجتمع.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **النتائج المحتملة ($Y(1), Y(0)$)** | المساران المتوازيان: النتيجة في حال تلقي المعالجة مقابل النتيجة دونها. |
| **الواقع المضاد (Counterfactual)** | الطريق الذي لم نسلكه: ما كان سيحدث في العالم البديل المفقود. |
| **المعضلة الأساسية للسببية** | عجزنا الطبيعي عن عيش واقعين معًا؛ فأحد المسارين دائمًا معلومة مفقودة. |
| **متوسط أثر المعالجة (ATE)** | العائد السببي الإجمالي المتوسط عبر جميع أفراد المجتمع الإحصائي. |
| **فرضية SUTVA** | استقلالية الوحدات: معالجة شخص لا تؤثر على نتائج شخص آخر ولا تغيرها. |

:::simulation-widget{engine="canvas2d" component="PotentialOutcomesSplitLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

For each unit $i$, define two potential outcomes: $Y_i(1)$ under treatment ($D_i = 1$) and $Y_i(0)$ under control ($D_i = 0$).

The observed outcome realized in the real world is linked via the switching equation:

$$
Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0) = Y_i(0) + D_i [Y_i(1) - Y_i(0)]
$$

The individual treatment effect is $\tau_i = Y_i(1) - Y_i(0)$.

A naive observational comparison between treated and untreated groups decomposes into:

$$
\mathbb{E}[Y \mid D = 1] - \mathbb{E}[Y \mid D = 0] = \underbrace{\mathbb{E}[Y(1) - Y(0) \mid D = 1]}_{\text{ATT (Average Effect on Treated)}} + \underbrace{\{\mathbb{E}[Y(0) \mid D = 1] - \mathbb{E}[Y(0) \mid D = 0]\}}_{\text{Selection Bias}}
$$

### Why the Math Works Step-by-Step

1. **Why does observational comparison mislead us?**
   Notice that the raw difference $\mathbb{E}[Y \mid D=1] - \mathbb{E}[Y \mid D=0]$ contains two distinct terms:
   * **ATT**: The true causal effect on those who took the treatment.
   * **Selection Bias**: The baseline difference between the groups even if neither received treatment!
2. **The Role of Selection Bias:**
   If people who take the treatment were already healthier (or wealthier) at baseline, $\mathbb{E}[Y(0) \mid D=1] > \mathbb{E}[Y(0) \mid D=0]$, creating a positive selection bias that makes the treatment look falsely magical!
3. **How Randomization Solves the Puzzle:**
   Under random assignment ($D \perp\!\!\perp (Y(1), Y(0))$), baseline outcomes are identical on average: $\mathbb{E}[Y(0) \mid D=1] = \mathbb{E}[Y(0) \mid D=0]$. Selection bias vanishes to zero, equating the naive difference directly to ATE!

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $Y_i(1)$: Potential outcome if treated.
* $Y_i(0)$: Potential outcome if untreated.
* $D_i \in \{0, 1\}$: Binary treatment indicator.
* $\text{ATE} = \mathbb{E}[Y(1) - Y(0)]$: Average Treatment Effect across whole population.
* $\text{ATT} = \mathbb{E}[Y(1) - Y(0) \mid D = 1]$: Average Treatment Effect on the Treated.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $Y_i(1)$ | النتيجة المحتملة بالمعالجة | ما سيحدث للمريض إذا أخذ الدواء في واقعه الافتراضي الأول. |
| $Y_i(0)$ | النتيجة المحتملة دون معالجة | ما سيحدث للمريض إذا لم يأخذ الدواء في واقعه الافتراضي المقابل. |
| $\text{ATT}$ | أثر المعالجة على المعالجين | العائد السببي الحقيقي المحقق خصيصًا للفئة التي خضعت للتجربة. |
| انحياز الاختيار | الفارق الأساسي المسبق | التفاوت الأصلي في نقطة البداية بين المجموعتين قبل تطبيق أي علاج. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the potential outcomes decomposition. Given known potential outcome vectors $Y(0)$, $Y(1)$, and treatment assignments $D$, synthesize the realized outcome $Y$ and calculate ATE, ATT, naive difference in means, and exact selection bias.

:::python-challenge{id="py-rubin-causal-model-potential-outcomes"}
---
timeout_ms: 3000
test_cases:
  - input: "y0 = np.array([10.0, 12.0, 8.0, 10.0]); y1 = np.array([15.0, 17.0, 13.0, 15.0]); d = np.array([1, 1, 0, 0]); res = decompose_selection_bias(y0, y1, d); round(res['ate'], 4)"
    expected: "5.0"
  - input: "y0 = np.array([10.0, 12.0, 8.0, 10.0]); y1 = np.array([15.0, 17.0, 13.0, 15.0]); d = np.array([1, 1, 0, 0]); res = decompose_selection_bias(y0, y1, d); round(res['selection_bias'], 4)"
    expected: "2.0"
  - input: "y0 = np.array([5.0, 5.0]); y1 = np.array([10.0, 10.0]); d = np.array([1, 0]); res = decompose_selection_bias(y0, y1, d); round(res['naive_diff'], 4)"
    expected: "5.0"
---
```python
import numpy as np

def decompose_selection_bias(y: np.ndarray, d: np.ndarray) -> dict[str, float]:
    """
    Decomposes an observational difference in group means.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed outcomes.
    d : np.ndarray of shape (N,)
        Binary treatment indicator (0 or 1).
        
    Returns
    -------
    dict with keys 'mean_treated', 'mean_control', 'raw_diff'
    """
    treated_mask = (d == 1)
    control_mask = (d == 0)

    mean_treated = float(np.mean(y[treated_mask]))
    mean_control = float(np.mean(y[control_mask]))
    raw_diff = mean_treated - mean_control

    return {
        "mean_treated": mean_treated,
        "mean_control": mean_control,
        "raw_diff": raw_diff,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A public health dataset shows that patients admitted to hospital Intensive Care Units (ICUs) have a $25\%$ higher 30-day mortality rate than individuals who rest at home. A sensationalist news anchor proclaims: *"New study proves hospitals are killing people; going to the ICU increases your risk of death by 25%!"*

How does the Rubin Causal Model selection bias decomposition explain why this claim is completely wrong?

* [ ] The claim is wrong because mortality is a binary outcome and OLS requires continuous Gaussian metrics.
* [x] The naive comparison is heavily contaminated by negative selection bias: patients who enter the ICU were already critically ill at baseline ($\mathbb{E}[Y_i(0) \mid D_i=1] \gg \mathbb{E}[Y_i(0) \mid D_i=0]$); the hospital actually saves lives, but severe baseline sickness masks this causal benefit.
* [ ] The claim is true because ICUs expose patients to hospital-acquired bacterial infections.
* [ ] The anchor is correct because potential outcomes cannot be defined for medical treatments.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
Under the Rubin decomposition, $\Delta_{\text{naive}} = \text{ATT} + [\mathbb{E}[Y(0) \mid D=1] - \mathbb{E}[Y(0) \mid D=0]]$. Here, the outcome $Y$ is mortality. The baseline health of patients sent to the ICU without treatment ($Y(0)$) is catastrophic compared to people resting at home with a mild cold: $\mathbb{E}[Y(0) \mid D=1] \approx 0.60$ while $\mathbb{E}[Y(0) \mid D=0] \approx 0.01$. This yields a massive positive baseline selection bias of $+0.59$. Even if ICU treatment saves dozens of lives ($\text{ATT} = -0.34$, reducing mortality by 34 percentage points), the naive observed difference is $\Delta_{\text{naive}} = -0.34 + 0.59 = +0.25$ (+25%). The hospital is life-saving, but severe baseline selection bias completely swamps the true causal effect.

**Why the distractors are incorrect:**
1. *Mortality is a binary outcome and OLS requires Gaussian metrics...*: Potential outcomes apply to any variable type (binary, count, continuous). Linear probability models or non-linear odds models all face identical selection bias.
2. *The claim is true because of bacterial infections...*: While nosocomial infections exist, attributing the entire 25% gap to hospital malice ignores the overwhelming baseline difference in organ failure and trauma.
3. *Potential outcomes cannot be defined for medical treatments...*: Clinical medicine is the foundational birthplace of the potential outcomes framework (dating back to Neyman's 1923 agricultural and medical trials).

*الشرح باللغة العربية:*
وفق تفكيك روبين للانحياز، فإن الفارق الظاهري المرصود يساوي: $\Delta_{\text{naive}} = \text{ATT} + \text{Selection Bias}$. بما أن النتيجة هي احتمالية الوفاة، فإن المرضى الذين يدخلون العناية المركزة هم في الأصل مصابون بجلطات وفشل في الأعضاء الحيوية، فاحتمالية وفاتهم دون أي علاج $\mathbb{E}[Y(0) \mid D=1]$ قد تتجاوز 60%، بينما احتمالية وفاة شخص في منزله دون علاج $\mathbb{E}[Y(0) \mid D=0]$ لا تتعدى 1%. هذا يولد انحياز اختيار إيجابي هائل (+59%). حتى لو كانت أجهزة العناية المركزة تنقذ حياة ثلث هؤلاء المرضى فعليًا ($\text{ATT} = -34\%$)، فإن النتيجة المرصودة تظل موجبة: $-34\% + 59\% = +25\%$. إغفال المسار المقابل للواقع جعل المذيع يتهم المنقذ بالقتل!
