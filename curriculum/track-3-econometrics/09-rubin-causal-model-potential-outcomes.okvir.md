---
id: "rubin-causal-model-potential-outcomes"
version: "1.0.0"
title: "The Rubin Causal Model & The Fundamental Problem of Causal Inference"
track: "econometrics"
module: "mod-22"
estimated_minutes: 15
prerequisites: ["bayes-theorem"]
i18n:
  ar: "نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي"
---

# The Rubin Causal Model & The Fundamental Problem of Causal Inference

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Before Jerzy Neyman and Donald Rubin formalized the **Potential Outcomes Framework**, causal claims in science were trapped in vague philosophical debates. Rubin demystified causality by anchoring it to a single, concrete question: **"What if?"**

For every individual person $i$, imagine two parallel universes:
* Universe 1: You take an experimental headache pill ($D_i = 1$). Your headache severity is $Y_i(1)$.
* Universe 0: You do not take the pill ($D_i = 0$). Your headache severity is $Y_i(0)$.

The true causal effect of the pill for *you specifically* is the difference between these two parallel realities:

$$
\tau_i = Y_i(1) - Y_i(0)
$$

Here lies **The Fundamental Problem of Causal Inference**: in the real physical universe, time moves in only one direction! You either swallow the pill or you don't. You can never observe both potential outcomes for the same person at the same moment. One outcome is factual (realized and recorded); the other is a **missing counterfactual**.

Therefore, causal inference is fundamentally a **missing data problem**. We can never know an individual's personal causal effect $\tau_i$ with certainty. The entire enterprise of empirical science is designing clever ways to replace the missing counterfactual with a credible group-level substitute.

This framework exposes the sharp division between machine learning prediction and causal decision-making. Predictive algorithms predict conditional expectations in the observed world: $\mathbb{E}[Y \mid D = 1]$. For an emergency room triage model, predicting that ICU patients have a high mortality rate is mathematically accurate and clinically useful for allocating palliative resources. But mistaking this predictive risk score for a causal effect leads to the horrifying conclusion that ICUs kill patients! Machine learning asks: *"What is the expected outcome of people who choose treatment?"* Causal inference asks: *"What would be the outcome if we actively assigned treatment to someone who otherwise would not have received it?"* Prediction looks at passive realization; causality evaluates counterfactual intervention.

قبل أن يصوغ جيرزي نيمان ودونالد روبين **إطار النتائج المحتملة (Potential Outcomes Framework)**، كانت مناقشات السببية حبيسة جدالات فلسفية ولغوية غامضة. أزال روبين الغموض عن السببية بربطها بسؤال واحد دقيق ومحدد: **"ماذا لو حدث العكس؟"**

لكل شخص $i$ في المجتمع، تخيل وجود عالمين متوازيين:
* العالم 1: تتناول قرص دواء تجريبي للصداع ($D_i = 1$). وتكون شدة الصداع الناتجة $Y_i(1)$.
* العالم 0: لا تتناول الدواء إطلاقًا ($D_i = 0$). وتكون شدة الصداع $Y_i(0)$.

الأثر السببي الحقيقي للدواء *بالنسبة لك أنت تحديدًا* هو الفارق بين هذين المسارين المتوازيين:

$$
\tau_i = Y_i(1) - Y_i(0)
$$

وهنا تصطدم بالحقيقة التي لا مفر منها: **المشكلة الجوهرية للاستدلال السببي (The Fundamental Problem of Causal Inference)**: في الكون الفيزيائي الواقعي، يسير الوقت في اتجاه واحد! إما أن تبتلع القرص أو تتركه. يستحيل رصد كلتا النتيجتين المحتملتين للشخص نفسه في اللحظة الزمنية ذاتها. إحدى النتيجتين تتحقق وتصبح واقعًا مرصودًا، بينما تظل النتيجة الأخرى **بديلاً مقابلاً للواقع مفقودًا إلى الأبد (Missing Counterfactual)**.

لهذا السبب، فإن الاستدلال السببي هو في جوهره **مسألة بيانات مفقودة**. لا يمكننا أبدًا معرفة الأثر الفردي $\tau_i$ بدقة مطلقة لأي شخص بمفرده. وغاية العلم التجريبي برمته هي ابتكار طرق منهجية ذكية لاستبدال المسار المفقود ببديل جماعي موثوق ومكافئ للواقع.

يوضح هذا الإطار بدقة بالغة الحد الفاصل بين التنبؤ والقرار السببي: نماذج تعلم الآلة التنبؤية تحسب التوقع الشرطي في الواقع المرصود $\mathbb{E}[Y \mid D = 1]$. فلو تنبأ نموذج في قسم الطوارئ بأن المرضى الذين يدخلون العناية المركزة ترتفع احتمالية وفاتهم، فهذا تنبؤ إحصائي دقيق ومفيد لفرز الحالات الحرجة. لكن الخلط بين هذا التنبؤ والسببية يقود إلى نتيجة كارثية تدعي أن العناية المركزة تقتل المرضى! تعلم الآلة يسأل: *"ما هي النتيجة المتوقعة لمن اختاروا العلاج في الواقع؟"* بينما الاستدلال السببي يسأل: *"ماذا كان سيحدث لهذا المريض تحديدًا لو تدخلنا ومنحناه العلاج بدلاً من تركه دون علاج؟"* التنبؤ يرصد الواقع القائم، بينما السببية تفحص التدخل المقابل للواقع.

:::simulation-widget{engine="canvas2d" component="PotentialOutcomesSplitLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

For any observational unit $i$, the realized observable outcome $Y_i$ is connected to the potential outcomes via the treatment indicator $D_i \in \{0, 1\}$:

$$
Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0) = Y_i(0) + D_i \big[Y_i(1) - Y_i(0)\big]
$$

### SUTVA (Stable Unit Treatment Value Assumption)

The potential outcomes representation implicitly requires two structural pillars known as **SUTVA**:
1. **No Interference:** The potential outcome of unit $i$ does not depend on the treatment assignment of unit $j$ ($Y_i(d_1, \dots, d_N) = Y_i(d_i)$).
2. **No Hidden Variations:** There is only one version of treatment $D_i = 1$ (e.g. all treated patients receive the identical dosage and drug potency).

### Foundational Population Causal Benchmarks

1. **Average Treatment Effect (ATE):**
   $$\text{ATE} \equiv \mathbb{E}\big[Y_i(1) - Y_i(0)\big]$$
2. **Average Treatment Effect on the Treated (ATT):**
   $$\text{ATT} \equiv \mathbb{E}\big[Y_i(1) - Y_i(0) \mid D_i = 1\big]$$
3. **Average Treatment Effect on the Untreated (ATUT):**
   $$\text{ATUT} \equiv \mathbb{E}\big[Y_i(1) - Y_i(0) \mid D_i = 0\big]$$

### Mathematical Derivation of the Selection Bias Decomposition

When an analyst naively compares observed group means:

$$
\Delta_{\text{naive}} \equiv \mathbb{E}[Y_i \mid D_i = 1] - \mathbb{E}[Y_i \mid D_i = 0]
$$

Substituting the realized outcome equation:

$$
\Delta_{\text{naive}} = \mathbb{E}[Y_i(1) \mid D_i = 1] - \mathbb{E}[Y_i(0) \mid D_i = 0]
$$

Add and subtract $\mathbb{E}[Y_i(0) \mid D_i = 1]$:

$$
\Delta_{\text{naive}} = \Big(\mathbb{E}[Y_i(1) \mid D_i = 1] - \mathbb{E}[Y_i(0) \mid D_i = 1]\Big) + \Big(\mathbb{E}[Y_i(0) \mid D_i = 1] - \mathbb{E}[Y_i(0) \mid D_i = 0]\Big)
$$

$$
\Delta_{\text{naive}} = \underbrace{\mathbb{E}[Y_i(1) - Y_i(0) \mid D_i = 1]}_{\text{ATT}} + \underbrace{\Big\{ \mathbb{E}[Y_i(0) \mid D_i = 1] - \mathbb{E}[Y_i(0) \mid D_i = 0] \Big\}}_{\text{Baseline Selection Bias}}
$$

If treatment effects are heterogeneous across groups, the decomposition relative to population ATE becomes:

$$
\Delta_{\text{naive}} = \text{ATE} + \underbrace{\Big( \mathbb{E}[Y(0) \mid D=1] - \mathbb{E}[Y(0) \mid D=0] \Big)}_{\text{Baseline Selection Bias}} + \underbrace{(1 - \pi)\Big( \text{ATT} - \text{ATUT} \Big)}_{\text{Heterogeneous Effect Bias}}
$$

where $\pi = \mathbb{P}(D_i = 1)$ is the proportion of treated units.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $D_i \in \{0, 1\}$: Binary treatment assignment indicator ($1$ for treated group, $0$ for control).
* $Y_i(1)$: Potential outcome of unit $i$ if assigned to treatment.
* $Y_i(0)$: Potential outcome of unit $i$ if assigned to control (counterfactual state).
* $Y_i$: Observed scalar outcome actually realized in the dataset.
* $\text{ATE}$: The expected average causal impact across the entire population.
* $\text{ATT}$: The expected average causal impact on individuals who actively received treatment.
* $\text{Selection Bias}$: Difference in baseline potential outcomes in the absence of treatment between those who received treatment and those who did not.

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

def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:
    """
    Decomposes the naive difference in means into ATT and Baseline Selection Bias.
    
    Parameters
    ----------
    y0 : np.ndarray of shape (N,)
        Potential untreated outcomes Y(0).
    y1 : np.ndarray of shape (N,)
        Potential treated outcomes Y(1).
    d : np.ndarray of shape (N,)
        Binary treatment indicator (1 = treated, 0 = control).
        
    Returns
    -------
    dict with keys:
        'ate': float, Average Treatment Effect E[Y(1) - Y(0)]
        'att': float, Treatment effect on the treated E[Y(1) - Y(0) | D=1]
        'naive_diff': float, Difference in realized sample means
        'selection_bias': float, E[Y(0) | D=1] - E[Y(0) | D=0]
    """
    # Step 1: Synthesize observable realized outcome Y = D * Y(1) + (1 - D) * Y(0)
    y_obs = d * y1 + (1 - d) * y0
    
    # Step 2: Calculate true population ATE
    ate = float(np.mean(y1 - y0))
    
    # Masks for treated and control groups
    treated_mask = (d == 1)
    control_mask = (d == 0)
    
    # Step 3: Calculate ATT = E[Y(1) - Y(0) | D=1]
    att = float(np.mean(y1[treated_mask] - y0[treated_mask]))
    
    # Step 4: Calculate naive difference in observed group means
    mean_y_treated = float(np.mean(y_obs[treated_mask]))
    mean_y_control = float(np.mean(y_obs[control_mask]))
    naive_diff = mean_y_treated - mean_y_control
    
    # Step 5: Calculate baseline selection bias = E[Y(0) | D=1] - E[Y(0) | D=0]
    selection_bias = float(np.mean(y0[treated_mask]) - np.mean(y0[control_mask]))
    
    return {
        "ate": ate,
        "att": att,
        "naive_diff": naive_diff,
        "selection_bias": selection_bias,
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
