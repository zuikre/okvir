---
id: "instrumental-variables-2sls"
version: "1.0.0"
title: "Instrumental Variables (IV) Identification & The Wald Estimator"
track: "econometrics"
module: "mod-24"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding", "frisch-waugh-lovell-theorem"]
i18n:
  ar: "التعريف بالمتغيرات الاداتية ومقدر فالد"
---

# Instrumental Variables (IV) Identification & The Wald Estimator

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose an economist wants to measure the financial impact of military service: *does serving in the army increase or decrease a veteran's lifetime civilian earnings?*

If you simply compare veterans to non-veterans in survey data, your estimate is severely contaminated. Enlisting is voluntary. People who volunteer for military service often come from lower-income rural towns, have fewer civilian job opportunities, or possess unique patriotic motivations. These unobserved background differences create severe confounding.

In the 1970s during the Vietnam War, the US government held the famous **Vietnam Draft Lottery**. Balls with every day of the year (January 1 through December 31) were placed in a glass drum and drawn on national television. Young men with lottery numbers drawn first were called up for mandatory military service; men with high numbers were spared.

Notice what this draft lottery did:
* Your birthday lottery number ($Z$) was decided by pure random chance.
* Having a low lottery number dramatically increased your probability of serving in the military ($D$).
* But your birthday has zero direct effect on your earnings 20 years later ($Y$), except through whether it pushed you into the military!

This lottery is the quintessential **Instrumental Variable (IV)**. An instrument acts like an 'exogenous nudge' from the heavens: it moves the treatment without having any direct relationship with the outcome or unobserved confounders!

The **Wald Estimator** calculates the causal effect with breathtaking simplicity: it takes the lottery's effect on earnings and divides it by the lottery's effect on military enlistment:
$$\text{Causal Effect} = \frac{\text{Impact of Lottery on Earnings}}{\text{Impact of Lottery on Military Service}} = \frac{\text{Reduced Form}}{\text{First Stage}}$$

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Instrumental Variable ($Z$)** | The exogenous nudge: a random lever that pushes treatment without affecting the outcome directly. |
| **First Stage (Relevance)** | The lever works: the instrument actually moves the treatment variable ($Z \to D$). |
| **Exclusion Restriction** | The sole channel: the instrument affects the outcome ONLY through the treatment ($Z \to D \to Y$). |
| **Reduced Form** | The raw intention: the direct relationship between the instrument and the outcome ($Z \to Y$). |
| **Wald Estimator** | The scaling ratio: dividing the reduced form by the first stage to recover the causal payoff. |

```text
    THE INSTRUMENTAL VARIABLE PIPELINE:

               Unobserved Background Confounders (U)
                       /                  \
                      /                    \
                     v                      v
    Instrument (Z) ====> Treatment (D) ======> Outcome (Y)
    (Random Lottery)     (Military Service)     (Lifetime Earnings)
         |                                           ^
         \========= No Direct Arrow Allowed! ========/
```

### الحدس والقصة الواقعية

تخيل باحثًا يقيس الأثر المالي للخدمة العسكرية: *هل تؤدي الخدمة في الجيش إلى زيادة أم خفض الدخل المدني للمحاربين القدامى طوال حياتهم؟*

إذا قارنت رواتب من خدموا في الجيش بمن لم يخدموا، ستكون النتيجة مشوهة تمامًا؛ فالالتحاق بالجيش قرار طوعي يتأثر بالخلفية الاقتصادية والفرص الوظيفية البديلة ومستوى التعليم. هذه الفروق الخفية تمثل انحيازًا مربكًا شديدًا.

في سبعينيات القرن الماضي خلال حرب فيتنام، أجرت الحكومة الأمريكية **قرعة التجنيد الشهيرة (Draft Lottery)**؛ حيث وُضعت تواريخ أيام السنة (من 1 يناير إلى 31 ديسمبر) في كرات زجاجية وسُحبت عشوائيًا على الهواء مباشرة. وكان الشباب أصحاب الأرقام الأولى يُستدعون إجباريًا للخدمة، بينما عُفي أصحاب الأرقام المتأخرة.

تأمل ما حققته هذه القرعة العشوائية:
* تاريخ ميلادك وسحب رقمك ($Z$) كان محض صدفة عشوائية مطلقة.
* سحب رقم مبكر زاد بشكل كبير من احتمالية التحاق الشاب بالجيش ($D$).
* لكن تاريخ ميلادك ليس له أي أثر مباشر على راتبك بعد 20 عامًا ($Y$) إلا من خلال كونه السبب في تجنيدك!

هذه القرعة هي المثال الأبرز لـ **المتغير الأداتي (Instrumental Variable - IV)**؛ فهو بمثابة "دفعة عشوائية خارجية" تحرك المعالجة دون أن ترتبط بالمتغيرات المربكة.

ويحسب **مقدر فالد (Wald Estimator)** الأثر السببي ببساطة عبقرية: يقسم أثر القرعة على الراتب على أثر القرعة على التجنيد!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **المتغير الأداتي ($Z$)** | الرافعة العشوائية: عامل خارجي يحرك المعالجة دون أن يملك مسارًا مباشرًا نحو النتيجة. |
| **المرحلة الأولى (الملاءمة)** | قوة الرافعة: قدرة المتغير الأداتي على تحريك وتغيير متغير المعالجة فعليًا ($Z \to D$). |
| **شرط الاستبعاد (Exclusion)** | المسار الوحيد: حظر وجود أي أثر للمتغير الأداتي على النتيجة إلا عبر المعالجة ($Z \to D \to Y$). |
| **الصيغة المختزلة (Reduced Form)** | الأثر الإجمالي المباشر بين المتغير الأداتي والنتيجة النهائية ($Z \to Y$). |
| **مقدر فالد (Wald Estimator)** | نسبة التكبير: قسمة الصيغة المختزلة على المرحلة الأولى لاستخراج الأثر السببي الصافي. |

:::simulation-widget{engine="canvas2d" component="InstrumentalVariablesLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Consider the structural linear equation where regressor $D$ is endogenous ($\text{Cov}(D, \varepsilon) \ne 0$):

$$
Y = \beta_0 + \beta_1 D + \varepsilon
$$

A valid instrumental variable $Z$ must satisfy two fundamental identifying conditions:
1. **Instrument Relevance:** $\text{Cov}(Z, D) \ne 0$ (the instrument predicts treatment).
2. **Instrument Exogeneity (Exclusion Restriction):** $\text{Cov}(Z, \varepsilon) = 0$ (the instrument is uncorrelated with the error).

Taking the covariance of both sides with $Z$:

$$
\text{Cov}(Z, Y) = \beta_1 \text{Cov}(Z, D) + \text{Cov}(Z, \varepsilon) = \beta_1 \text{Cov}(Z, D) + 0
$$

Solving for $\beta_1$ yields the population **Wald Estimator**:

$$
\beta_1 = \frac{\text{Cov}(Z, Y)}{\text{Cov}(Z, D)} = \frac{\mathbb{E}[Y \mid Z = 1] - \mathbb{E}[Y \mid Z = 0]}{\mathbb{E}[D \mid Z = 1] - \mathbb{E}[D \mid Z = 0]}
$$

### Why the Math Works Step-by-Step

1. **Why does dividing by $\text{Cov}(Z, D)$ scale up the effect?**
   The instrument $Z$ is often an intention or a nudge (e.g., winning a lottery ticket), not the treatment itself. The numerator measures the 'Intention-to-Treat' (ITT) effect on outcome $Y$. Because only a fraction of people comply with the nudge, the denominator measures the compliance rate. Dividing by compliance inflates the ITT back up to measure the full effect on those who were actually moved!
2. **What happens if the instrument is weak ($\text{Cov}(Z, D) \approx 0$)?**
   If the denominator is close to zero, the estimator divides by a tiny noisy number. The standard errors explode, and even the tiniest violation of exogeneity ($\text{Cov}(Z, \varepsilon) \ne 0$) gets magnified into massive, catastrophic bias! This is the notorious **Weak Instrument Problem** (checked via First-Stage $F > 10$).

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $Z$: Instrumental variable satisfying relevance and exclusion restriction.
* $D$: Endogenous treatment variable confounded by unobserved disturbance $\varepsilon$.
* $\beta_1$: Structural causal effect identified by the instrument.
* $\hat{\beta}_{\text{Wald}}$: Sample Wald ratio of sample differences in means.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\text{Cov}(Z, Y)$ | التباين المشترك بين الأداة والنتيجة | الصيغة المختزلة: كم تحركت النتيجة استجابةً للرافعة الخارجية العشوائية. |
| $\text{Cov}(Z, D)$ | التباين المشترك بين الأداة والمعالجة | المرحلة الأولى: مدى استجابة الأفراد للرافعة والتحاقهم بالمعالجة فعليًا. |
| $\beta_{\text{Wald}}$ | مقدر فالد السببي | ناتج قسمة الصيغة المختزلة على المرحلة الأولى لمعرفة الأثر الصافي لكل معالج. |
| مشكلة الأداة الضعيفة | انهيار دقة الأداة | عندما يكون المقام قريبًا من الصفر فتتضخم الأخطاء المعيارية وتنعدم الثقة بالنتائج. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the empirical Wald estimator for a binary instrumental variable setting. Calculate the first-stage compliance rate, the reduced-form effect, and the resulting causal Wald estimate.

:::python-challenge{id="py-instrumental-variables-2sls"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([4.0, 6.0, 1.0, 3.0]); d = np.array([1, 1, 0, 0]); z = np.array([1, 1, 0, 0]); res = compute_wald_estimator(y, d, z); round(res['wald_estimate'], 4)"
    expected: "3.0"
  - input: "y = np.array([10.0, 6.0, 4.0, 2.0]); d = np.array([1, 0, 1, 0]); z = np.array([1, 1, 0, 0]); res = compute_wald_estimator(y, d, z); round(res['first_stage_compliance'], 4)"
    expected: "0.0"
  - input: "y = np.array([8.0, 4.0]); d = np.array([1, 0]); z = np.array([1, 0]); res = compute_wald_estimator(y, d, z); 'reduced_form_intent' in res"
    expected: "True"
---
```python
import numpy as np

def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:
    """
    Computes the Wald IV estimator: [E[Y|Z=1] - E[Y|Z=0]] / [E[D|Z=1] - E[D|Z=0]].

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed continuous outcome.
    d : np.ndarray of shape (N,)
        Endogenous treatment indicator.
    z : np.ndarray of shape (N,)
        Binary instrumental variable (0 or 1).

    Returns
    -------
    float : Wald causal estimate.
    """
    z1_mask = (z == 1)
    z0_mask = (z == 0)

    # Step 1: Compute reduced form difference in outcome Y
    mean_y_z1 = np.mean(y[z1_mask])
    mean_y_z0 = np.mean(y[z0_mask])
    reduced_form = mean_y_z1 - mean_y_z0

    # Step 2: Compute first stage difference in treatment D
    mean_d_z1 = np.mean(d[z1_mask])
    mean_d_z0 = np.mean(d[z0_mask])
    first_stage = mean_d_z1 - mean_d_z0

    if abs(first_stage) < 1e-8:
        raise ValueError("First stage is zero: Instrument has no relevance.")

    # Step 3: Wald ratio
    wald_estimate = float(reduced_form / first_stage)

    return wald_estimate
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

In his landmark study, Nobel laureate Joshua Angrist (1990) utilized the **Vietnam Draft Lottery** ($Z = 1$ if low lottery number assigned draft eligibility, $0$ otherwise) to estimate the causal effect of military service ($D$) on civilian earnings ($Y$).

Why was the draft lottery number an exceptionally credible instrument satisfying both relevance and the exclusion restriction?

* [ ] Because having a low draft number directly boosted job skills and high-tech civilian wages.
* [x] Draft lottery numbers were assigned via a televised random ball draw (guaranteeing $\text{Cov}(Z, \varepsilon) = 0$), strongly influenced veteran status ($\text{Cov}(Z, D) \ne 0$), and had no biological or economic mechanism to affect civilian wages twenty years later other than through inducing military service.
* [ ] Because everyone drafted complied with military service ($100\%$ compliance rate).
* [ ] Because OLS was already unbiased, so the IV served only to confirm the textbook standard error.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
Joshua Angrist's Vietnam Draft Lottery is one of the most celebrated natural experiments in the history of economics. Because draft lottery numbers were drawn based on birthdays using physical ping-pong balls in a nationally televised broadcast, eligibility $Z$ was strictly randomized by nature, ensuring that draft-eligible men were statistically identical to non-eligible men in family wealth, intelligence, and earnings potential ($\text{Cov}(Z, \varepsilon) = 0$). Furthermore, being draft-eligible dramatically increased the probability of serving in the military ($\text{Cov}(Z, D) \ne 0$, satisfying relevance). Finally, employers twenty years later did not set salaries based on whether a job applicant had a random ping-pong ball number drawn in 1970; the lottery number affected civilian earnings *only* because it induced military service, satisfying the exclusion restriction.

**Why the distractors are incorrect:**
1. *Because having a low draft number directly boosted job skills...*: If the lottery number directly affected civilian wages through skills, it would violate the exclusion restriction ($\text{Cov}(Z, \varepsilon) \ne 0$) by creating a direct arrow $Z \to Y$ bypassing military service.
2. *Because everyone drafted complied with military service ($100\%$ compliance)...*: In reality, compliance was imperfect: many drafted men failed physical exams or obtained college deferments, and many non-drafted men volunteered. The beauty of the Wald estimator is that it explicitly accounts for imperfect compliance by dividing by $\Delta D$.
3. *Because OLS was already unbiased...*: OLS was severely confounded because men who volunteered for the military differed systematically in civilian career alternatives and health compared to those who avoided service.

*الشرح باللغة العربية:*
تُعد دراسة جوشوا أنجريست لقرعة التجنيد في حرب فيتنام إحدى أعظم التجارب الطبيعية في تاريخ القياس الاقتصادي. ونظرًا لأن أرقام القرعة سُحبت عشوائيًا عبر كرات مرقمة على شاشات التلفاز وفق تواريخ الميلاد، فإن أهلية التجنيد $Z$ كانت عشوائية تمامًا ومستقلة عن ذكاء الفرد أو خلفيته الأسرية أو قدراته الإنتاجية ($\text{Cov}(Z, \varepsilon) = 0$). وعلاوة على ذلك، رفعت الأهلية احتمالية الالتحاق بالجيش بشكل حاد ($\text{Cov}(Z, D) \ne 0$). وأخيرًا، لا تكترث الشركات وسوق العمل برقم كرة التجنيد القديم للشخص، وبالتالي لا يوجد أي مسار يؤثر به رقم القرعة على أجور الفرد بعد عشرين عامًا إلا عبر قناة خدمته العسكرية الفعلية، مما يحقق قيد الاستبعاد الصارم.
