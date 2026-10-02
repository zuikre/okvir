---
id: "selection-bias-randomized-trials"
version: "1.0.0"
title: "Selection Bias Decomposition & Randomized Controlled Trials"
track: "econometrics"
module: "mod-22"
estimated_minutes: 15
prerequisites: ["rubin-causal-model-potential-outcomes"]
i18n:
  ar: "تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة"
---

# Selection Bias Decomposition & Randomized Controlled Trials

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Imagine an insurance company conducts a simple study: they compare the annual health scores of people who went to the hospital last year against people who did not. 

The raw data shows an alarming result: people who went to the hospital had significantly worse health outcomes and a higher mortality rate than people who stayed home! A naive analyst exclaims: *"Hospitals are making people sick! We should ban hospital visits to improve public health!"*

What went wrong? **Selection Bias**.
People who go to the hospital were already sick *before* they ever set foot through the hospital doors. You are not comparing apples to apples; you are comparing people with pneumonia to healthy joggers in the park. The baseline difference between the two groups overwhelms the true curative effect of the hospital.

How does modern science defeat selection bias? Through a **Randomized Controlled Trial (RCT)**.
In an RCT, treatment is decided strictly by a coin flip. Because the coin flip does not care whether a patient is rich or poor, young or old, sick or healthy, both the treatment group and the control group end up with the exact same average characteristics before the experiment begins.

When baseline differences are completely neutralized, selection bias vanishes, and the raw difference in group averages becomes the unvarnished causal truth!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Selection Bias** | The baseline gap: differences in starting conditions between who chooses treatment and who doesn't. |
| **RCT (Randomized Trial)** | The coin-flip shield: assigning treatment randomly so both groups start out as identical twins. |
| **Propensity Score ($e(X)$)** | The probability of receiving treatment based on observable background traits. |
| **Inverse Probability Weighting (IPW)** | Reweighting observational data to create a synthetic pseudo-population where treatment is balanced. |
| **Internal Validity** | The guarantee that the measured effect is truly caused by the treatment, not by confounding. |

```text
    OBSERVATIONAL VS RANDOMIZED TRIAL:

    Observational (Biased):
      Treated (Sick at baseline)    ---- Hospital ----> Fair Health
      Control (Healthy at baseline) ---- Stay Home ---> Great Health   => False Conclusion: Hospital hurts!

    Randomized Trial (RCT):
      Treated (50% Sick, 50% Healthy) ---- Treatment ---> Better Health
      Control (50% Sick, 50% Healthy) ---- Placebo   ---> Normal Baseline => Clean Causal Truth!
```

### الحدس والقصة الواقعية

تخيل شركة تأمين تجري دراسة صحية: تقارن الحالة الصحية للأشخاص الذين زاروا المستشفيات العام الماضي بالذين لم يزوروها.

تظهر البيانات نتيجة صادمة: الأشخاص الذين دخلوا المستشفيات لديهم معدلات وفاة وأمراض أعلى بكثير ممن بقوا في منازلهم! يتسرع محلل ساذج قائلاً: *"المستشفيات تنشر الأمراض وتقتل الناس! يجب إغلاقها فورًا لتعزيز الصحة العامة!"*

ما الخطأ القاتل في هذا التفكير؟ **انحياز الاختيار (Selection Bias)**.
المرضى الذين ذهبوا للمستشفى كانوا يعانون من أمراض خطيرة *قبل* أن تطأ أقدامهم عتبة المستشفى. أنت لا تقارن فئتين متماثلتين، بل تقارن مصابين بالالتهاب الرئوي برياضيين يركضون في الحديقة. هذا الفارق الهائل في نقطة البداية يطغى تمامًا على الأثر العلاجي الحقيقي للمستشفى.

كيف يقضي العلم الحديث على انحياز الاختيار؟ عبر **التجارب العشوائية المنضبطة (RCT)**.
في التجربة العشوائية، يتم توزيع العلاج عبر رمية عملة نقدية عشوائية. ولأن رمية العملة لا تبالي بكون المريض غنيًا أو فقيرًا، شابًا أو مسنًا، فإن المجموعتين تتطابقان تمامًا في المتوسط قبل بدء العلاج، فيتلاشى انحياز الاختيار ويظهر الأثر السببي الصافي.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **انحياز الاختيار** | فجوة نقطة البداية: الفروق الجوهرية المسبقة بين من اختاروا المعالجة ومن تركوها. |
| **التجربة العشوائية (RCT)** | درع القرعة: توزيع المعالجة عشوائيًا لضمان تماثل المجموعتين كتوأم حقيقي. |
| **درجة الميل (Propensity Score)** | احتمالية تلقي الفرد للمعالجة بالنظر إلى صفاته وخصائصه الخلفية. |
| **الوزن باحتمال الميل العكسي (IPW)** | إعادة وزن البيانات لإنشاء مجتمع افتراضي متوازن يخلو من انحياز الاختيار. |
| **الصلاحية الداخلية** | الثقة المطلقة بأن النتيجة ناتجة حقًا عن المعالجة وليست تشويشًا خارجيًا. |

:::simulation-widget{engine="canvas2d" component="SelectionBiasPropensityLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In observational studies where treatment assignment is confounded by observable covariates $\mathbf{X}$, the **Conditional Independence Assumption (CIA)** states:

$$
(Y(1), Y(0)) \perp\!\!\perp D \mid \mathbf{X}
$$

Define the propensity score as the conditional probability of treatment:

$$
e(\mathbf{X}) \equiv \mathbb{P}(D = 1 \mid \mathbf{X})
$$

Rosenbaum and Rubin (1983) proved that if CIA holds, then $(Y(1), Y(0)) \perp\!\!\perp D \mid e(\mathbf{X})$.

The **Inverse Probability Weighting (IPW)** estimator recovers the population ATE by weighting each observation by the inverse of its probability of receiving its observed treatment:

$$
\tau_{\text{IPW}} = \mathbb{E}\left[ \frac{D Y}{e(\mathbf{X})} - \frac{(1 - D) Y}{1 - e(\mathbf{X})} \right]
$$

### Why the Math Works Step-by-Step

1. **Why does dividing by $e(\mathbf{X})$ eliminate selection bias?**
   Taking expectations of the treated term:
   $$\mathbb{E}\left[ \frac{D Y}{e(\mathbf{X})} \right] = \mathbb{E}\left[ \mathbb{E}\left[ \frac{D Y(1)}{e(\mathbf{X})} \;\middle|\; \mathbf{X} \right] \right] = \mathbb{E}\left[ \frac{\mathbb{E}[D \mid \mathbf{X}] Y(1)}{e(\mathbf{X})} \right] = \mathbb{E}\left[ \frac{e(\mathbf{X}) Y(1)}{e(\mathbf{X})} \right] = \mathbb{E}[Y(1)]$$
   Dividing by the propensity score creates a pseudo-population where treatment is completely decoupled from baseline traits!
2. **The Positivity / Overlap Assumption:**
   IPW requires that for all $\mathbf{X}$, $0 < e(\mathbf{X}) < 1$. If some individuals have $e(\mathbf{X}) = 0$ (no chance of treatment) or $e(\mathbf{X}) = 1$, the weights blow up to infinity, breaking the estimator.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $e(\mathbf{X})$: Propensity score (probability of treatment given covariates).
* $w_i = \frac{D_i}{e(\mathbf{X}_i)} + \frac{1 - D_i}{1 - e(\mathbf{X}_i)}$: IPW balancing weight for observation $i$.
* $\tau_{\text{IPW}}$: Horvitz-Thompson / Inverse Probability Weighted Average Treatment Effect.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $e(\mathbf{X})$ | درجة الميل الاحتمالية | احتمال خضوع الشخص للمعالجة بناءً على سماته الديموغرافية والبيولوجية. |
| $1/e(\mathbf{X})$ | وزن المعالجة العكسي | إعطاء وزن أكبر للحالات النادرة التي تلقت العلاج رغم تدني احتماليته. |
| $\tau_{\text{IPW}}$ | مقدر IPW الموزون | المقدر الذي يعيد التوازن الإحصائي ليحاكي نتائج التجربة العشوائية. |
| شرط التداخل (Overlap) | حتمية التكافؤ الاحتمالي | اشتراط وجود فرصة حقيقية (أكبر من 0 وأقل من 1) لكل فرد لتلقي العلاج. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the normalized Inverse Probability Weighting (IPW) estimator for the Average Treatment Effect (ATE). Ensure numerical stability by clipping extreme propensity scores away from $0$ and $1$.

:::python-challenge{id="py-selection-bias-randomized-trials"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([10.0, 15.0, 6.0, 8.0]); d = np.array([1, 1, 0, 0]); ps = np.array([0.5, 0.5, 0.5, 0.5]); round(compute_ipw_ate(y, d, ps), 4)"
    expected: "5.5"
  - input: "y = np.array([12.0, 4.0]); d = np.array([1, 0]); ps = np.array([0.8, 0.2]); round(compute_ipw_ate(y, d, ps), 4)"
    expected: "8.0"
  - input: "y = np.array([20.0, 10.0]); d = np.array([1, 0]); ps = np.array([0.5, 0.5]); compute_ipw_ate(y, d, ps)"
    expected: "10.0"
---
```python
import numpy as np

def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray) -> float:
    """
    Computes the Average Treatment Effect using Inverse Probability Weighting (IPW).

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed outcomes.
    d : np.ndarray of shape (N,)
        Binary treatment indicator (0 or 1).
    ps : np.ndarray of shape (N,)
        Propensity scores (strictly bounded between 0 and 1).

    Returns
    -------
    float : Estimated ATE.
    """
    # Clip propensity scores defensively to prevent zero division
    ps_clipped = np.clip(ps, 1e-4, 1.0 - 1e-4)

    # Step 1: Compute weighted treated term: (D * Y) / ps
    treated_term = (d * y) / ps_clipped

    # Step 2: Compute weighted control term: ((1 - D) * Y) / (1 - ps)
    control_term = ((1 - d) * y) / (1.0 - ps_clipped)

    # Step 3: ATE is the difference in empirical means
    ate = float(np.mean(treated_term) - np.mean(control_term))

    return ate
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A mobile fitness app company notes that users who voluntarily complete $30$ workouts a month ($D=1$) have resting heart rates $15$ beats per minute lower than users who do zero workouts ($D=0$). The marketing department drafts an ad claiming: *"Our app lowers your resting heart rate by 15 bpm!"*

If the company subsequently conducts a strict Randomized Controlled Trial (forcing random cohorts to follow the regimen), why will the estimated causal effect likely be substantially smaller than $15$ bpm?

* [ ] Because random assignment introduces measurement error into physiological heart rate monitors.
* [x] Because the observational comparison suffered from massive selection bias: users who voluntarily work out 30 times a month are already younger, more health-conscious, and more biologically fit at baseline ($\mathbb{E}[Y_i(0) \mid D_i=1] < \mathbb{E}[Y_i(0) \mid D_i=0]$).
* [ ] Because RCTs are only capable of identifying Local Average Treatment Effects (LATE), not ATE.
* [ ] Because the app's code runs faster on treated users' phones.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In the observational data, users freely self-select into exercising. Those who complete 30 workouts a month possess unobserved healthy habits, better cardiovascular genetics, and disciplined diets. Even if they had never touched the app ($D=0$), their counterfactual resting heart rate $\mathbb{E}[Y(0) \mid D=1]$ would be substantially lower than that of sedentary individuals $\mathbb{E}[Y(0) \mid D=0]$. Under the Rubin decomposition, this baseline health difference forms a huge selection bias. When the company runs an RCT, randomization balances baseline health across groups, stripping away this selection bias and revealing the true biological impact of the workouts alone, which is typically much smaller than 15 bpm.

**Why the distractors are incorrect:**
1. *Random assignment introduces measurement error...*: Randomization changes the assignment mechanism, not the precision of sensor hardware.
2. *RCTs are only capable of identifying LATE, not ATE...*: Perfect compliance in an RCT identifies the full population ATE. LATE arises only in quasi-experiments with non-compliance (Instrumental Variables).
3. *The app's code runs faster on treated phones...*: Irrelevant humorous distraction with zero econometric basis.

*الشرح باللغة العربية:*
في البيانات الرصدية، يختار المستخدمون سلوكهم بحرية؛ فالذين يمارسون الرياضة يوميًا يتمتعون بنمط حياة صحي وجينات قلبية أفضل وغذاء متوازن. وحتى لو لم يستخدموا التطبيق أبدًا ($D=0$)، فإن معدل نبضهم الأساسي سيكون أقل بكثير من غيرهم. هذا الفارق المسبق يمثل انحياز اختيار هائل يلوث المقارنة. عند إجراء تجربة عشوائية منضبطة (RCT)، يضمن التوزيع بالقرعة تماثل المجموعتين تمامًا قبل بدء التمرين، فيختفي انحياز الاختيار كليًا، وتظهر الفائدة البيولوجية الحقيقية للتمرين وحده، والتي تكون عادة أقل بكثير من 15 نبضة في الدقيقة.
