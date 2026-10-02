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

What can an empirical economist do when a critical treatment $D$ is inextricably tangled with unobserved confounders—when endogeneity poisons OLS, and running an actual Randomized Controlled Trial is physically impossible or morally prohibited? 

Consider estimating the causal wage return to an extra year of university education. People who choose to complete university degrees often possess higher innate motivation, family financial safety nets, and social networks. Because an ethical government cannot randomly forbid thousands of bright young citizens from attending college, an observational OLS regression will hopelessly conflate the genuine causal boost of college lectures with unobserved innate ability. 

Econometricians solve this seemingly intractable puzzle using an **Instrumental Variable ($Z$)**. Think of an instrument as a **natural gust of wind** or an exogenous coin toss engineered by nature that nudges people into treatment from the outside. Imagine a fleet of sailboats on a lake: some captains have powerful inboard motors (unobserved ability), while others do not. If you want to measure the true hydrodynamic drag of the hull, watching who moves fastest is useless because motor power confounds the race. But if an sudden, random gust of offshore wind ($Z$) sweeps across only half the lake, tilting the sails of certain boats ($D$) without touching their hidden motors ($\varepsilon$), you can isolate the pure hydrodynamic speed response ($Y$) generated solely by the wind's nudge!

Crucially, this illuminates the fundamental difference between predictive machine learning and econometric causality. A predictive model observes a college graduate earning $\$100,000$ and accurately forecasts that they will repay their mortgage. The predictive model does not care whether the high wage came from coursework or from the graduate's wealthy uncle; it only cares about the statistical shadow. But a policymaker designing a $\$50\text{ billion}$ student tuition subsidy asks a causal question: *"If we intervene and induce students who would otherwise have stopped at high school to complete university, by how much will their future earnings rise?"* If earnings are driven primarily by uncle connections, the subsidy will fail. 

The **Wald Estimator** operationalizes this causal logic through the elegant ratio of two observable quantities:
$$\hat{\beta}_{\text{IV}} = \frac{\text{Effect of Instrument on Outcome (Reduced Form)}}{\text{Effect of Instrument on Treatment (First Stage Compliance)}}$$
By dividing the total nudge in wages by the percentage of people actually pushed into college by the instrument, IV inflates the signal to recover the pristine, unconfounded causal effect.

ماذا يفعل الباحث الاقتصادي عندما يكون متغير المعالجة الحاسم $D$ متشابكًا بصورة ميؤوس منها مع متغيرات خفية ومربكة—بحيث يصبح انحدار OLS ملوثًا بالانحياز، ويكون إجراء تجربة عشوائية منضبطة مستحيلاً عمليًا أو محظورًا أخلاقيًا؟

تأمل مثلاً محاولة قياس العائد السببي الحقيقي لسنوات التعليم الجامعي الإضافية على أجور العمال. في الواقع العملي، يمتلك الطلاب الذين يلتحقون بالجامعات ميزات فطرية؛ كالشغف الذاتي العالي، وشبكات الأمان المالي العائلية، والعلاقات الاجتماعية النافذة. ولأنه لا يمكن لأي حكومة رشيدة أن تحرم آلاف الشباب الموهوبين عشوائيًا من التعليم لدواعي البحث العلمي، فإن انحدار OLS الكلاسيكي سيخلط حتمًا بين العائد الحقيقي للمناهج الجامعية وبين الذكاء والفرص الفطرية غير المرصودة للمتعلمين.

يحل الاقتصاديون هذا اللغز المستعصي باستخدام **المتغير الآداتي (Instrumental Variable - $Z$)**. تخيل الأداة كـ **هبة ريح طبيعية خارجية** أو قرعة عشوائية تجريها الطبيعة تدفع الناس نحو المعالجة من الخارج دون استئذان. تخيل أسطولاً من المراكب الشراعية في بحيرة هادئة؛ بعض القادة يمتلكون محركات ديزل سرية قوية تحت الماء (القدرات الفطرية الخفية)، بينما يفتقر إليها آخرون. إذا أردت قياس كفاءة الشراع المجردة، فإن مراقبة سرعة المراكب لن تفيدك، لأن المحركات الخفية تشوه المقارنة تمامًا. لكن إذا هبت فجأة عاصفة ريح عشوائية ($Z$) على جزء من البحيرة دون غيره، فحركت أشرعة بعض المراكب ($D$) دون أن تؤثر على محركاتها الخفية ($\varepsilon$)، فإنك تستطيع عزل سرعة الحركة الإضافية ($Y$) الناتجة فقط عن قوة الرياح!

وهنا يتجلى الفرق الحاسم بين تعلم الآلة التنبؤي والسببية الاقتصادية: يرى النموذج التنبؤي خريجًا جامعيًا يجني $100,000$ دولار، فيتنبأ بنجاح بقدرته على سداد القروض؛ فالنموذج التنبؤي لا يعنيه هل مصدر الثروة هو المحاضرات الجامعية أم علاقات أسرته الثرية، بل يكتفي برصد الظل الإحصائي. أما صانع السياسات الذي يدرس تخصيص ميزانية ضخمة لدعم الرسوم الجامعية فيطرح سؤالاً سببيًا صارمًا: *"لو تدخلنا ودفعنا طلابًا كانوا سيتوقفون عند الثانوية لدخول الجامعة، فكم ستزيد أجورهم الحقيقية؟"* إذا كانت الأجور نابعة من علاقات العائلة، فستفشل السياسة بالكامل.

يقيس **مقدر فالد (Wald Estimator)** هذا التأثير السببي عبر حاصل قسمة غاية في البساطة والعبقرية الرياضية:
$$\hat{\beta}_{\text{IV}} = \frac{\text{أثر الأداة على النتيجة النهائية (النموذج المختزل)}}{\text{أثر الأداة على الامتثال للمعالجة (المرحلة الأولى)}}$$
بقسمة الأثر الإجمالي للدفعة الخارجية على نسبة الأشخاص الذين استجابوا لها ودخلوا الجامعة فعليًا، يعيد مقدر IV تضخيم النسبة وتطهيرها من شوائب القدرات الخفية لعزل الأثر السببي الصافي.

:::simulation-widget{engine="canvas2d" component="InstrumentalVariablesLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Consider the structural linear causal relationship with an endogenous regressor $D_i$:

$$
y_i = \beta_0 + \beta_1 D_i + \varepsilon_i, \quad \text{where } \text{Cov}(D_i, \varepsilon_i) \ne 0
$$

Because treatment correlates with the unobserved error term $\varepsilon_i$, OLS is asymptotically inconsistent:

$$
\text{plim} \, \hat{\beta}_{1, \text{OLS}} = \beta_1 + \frac{\text{Cov}(D_i, \varepsilon_i)}{\mathbb{V}(D_i)} \ne \beta_1
$$

### The Core IV Identification Assumptions

Let $Z_i$ be an instrumental variable. Identification of $\beta_1$ requires two foundational conditions:
1. **Instrument Relevance (First Stage):** The instrument must predict treatment uptake:
   $$
   \text{Cov}(Z_i, D_i) \ne 0 \iff \mathbb{E}[D_i \mid Z_i = 1] \ne \mathbb{E}[D_i \mid Z_i = 0]
   $$
2. **Exclusion Restriction & Exogeneity:** The instrument is as good as randomly assigned and has no direct causal link to $y_i$ other than through $D_i$:
   $$
   \text{Cov}(Z_i, \varepsilon_i) = 0 \iff \mathbb{E}[\varepsilon_i \mid Z_i = 1] = \mathbb{E}[\varepsilon_i \mid Z_i = 0] = 0
   $$

### Algebraic Derivation of the Wald Estimator

Taking the covariance of both sides of the structural equation with the instrument $Z_i$:

$$
\text{Cov}(Z_i, y_i) = \text{Cov}(Z_i, \beta_0 + \beta_1 D_i + \varepsilon_i) = \beta_1 \text{Cov}(Z_i, D_i) + \underbrace{\text{Cov}(Z_i, \varepsilon_i)}_{= 0}
$$

Under the exclusion restriction ($\text{Cov}(Z_i, \varepsilon_i) = 0$), the error covariance vanishes:

$$
\text{Cov}(Z_i, y_i) = \beta_1 \text{Cov}(Z_i, D_i) \implies \beta_1 = \frac{\text{Cov}(Z_i, y_i)}{\text{Cov}(Z_i, D_i)}
$$

For a binary instrument $Z_i \in \{0, 1\}$, recall that for any random variable $W_i$, $\text{Cov}(Z_i, W_i) = P(Z_i=1)P(Z_i=0) \big( \mathbb{E}[W_i \mid Z_i=1] - \mathbb{E}[W_i \mid Z_i=0] \big)$.

Substituting this property into the numerator and denominator:

$$
\beta_1 = \frac{P(Z_i=1)P(Z_i=0) \big( \mathbb{E}[y_i \mid Z_i = 1] - \mathbb{E}[y_i \mid Z_i = 0] \big)}{P(Z_i=1)P(Z_i=0) \big( \mathbb{E}[D_i \mid Z_i = 1] - \mathbb{E}[D_i \mid Z_i = 0] \big)}
$$

Canceling the common marginal probability terms yields the **Wald Estimator**:

$$
\hat{\beta}_{\text{Wald}} = \frac{\mathbb{E}[y_i \mid Z_i = 1] - \mathbb{E}[y_i \mid Z_i = 0]}{\mathbb{E}[D_i \mid Z_i = 1] - \mathbb{E}[D_i \mid Z_i = 0]} \equiv \frac{\text{Reduced Form Intent-to-Treat (ITT}_Y\text{)}}{\text{First Stage Compliance Rate (ITT}_D\text{)}}
$$

### Asymptotic Variance & The Weak Instrument Hazard

The asymptotic variance of the instrumental variables estimator reveals the statistical price paid for exogeneity:

$$
\text{AVar}(\hat{\beta}_{\text{IV}}) = \frac{\sigma_\varepsilon^2}{N \cdot \mathbb{V}(D_i) \cdot \rho_{ZD}^2} = \frac{\text{AVar}(\hat{\beta}_{\text{OLS}})}{\rho_{ZD}^2}
$$

Where $\rho_{ZD} = \text{Corr}(Z_i, D_i)$. If the instrument is "weak" ($\rho_{ZD} \to 0$), the first stage collapses, causing the sampling variance of $\hat{\beta}_{\text{IV}}$ to explode to infinity!

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $D_i$: Endogenous treatment variable correlated with unobserved disturbance term $\varepsilon_i$.
* $Z_i$: Instrumental variable acting as an exogenous lever on treatment selection.
* $\text{Cov}(Z_i, D_i) \ne 0$: Relevance condition ensuring the first stage has substantive explanatory power.
* $\text{Cov}(Z_i, \varepsilon_i) = 0$: Exclusion restriction stating that the instrument is uncorrelated with unobserved determinants of $y_i$.
* $\text{ITT}_Y = \mathbb{E}[y_i \mid Z_i = 1] - \mathbb{E}[y_i \mid Z_i = 0]$: Reduced form intent-to-treat effect on the primary outcome.
* $\text{ITT}_D = \mathbb{E}[D_i \mid Z_i = 1] - \mathbb{E}[D_i \mid Z_i = 0]$: First-stage compliance differential measuring the shift in treatment uptake.
* $\rho_{ZD}$: Correlation between instrument and treatment; small values signal weak instrument danger.

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

def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:
    """
    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Continuous outcome vector.
    d : np.ndarray of shape (N,)
        Binary endogenous treatment (0 or 1).
    z : np.ndarray of shape (N,)
        Binary instrument (0 or 1).
        
    Returns
    -------
    dict with keys:
        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]
        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]
        'wald_estimate': float, reduced_form / first_stage
    """
    # Step 1: Create boolean index masks for instrument assignment groups (z=1 and z=0)
    z1_mask = (z == 1)
    z0_mask = (z == 0)
    
    # Step 2: Compute first-stage compliance effect: E[D|Z=1] - E[D|Z=0]
    mean_d_z1 = float(np.mean(d[z1_mask]))
    mean_d_z0 = float(np.mean(d[z0_mask]))
    first_stage = mean_d_z1 - mean_d_z0
    
    # Step 3: Compute reduced-form intent-to-treat effect on outcome: E[Y|Z=1] - E[Y|Z=0]
    mean_y_z1 = float(np.mean(y[z1_mask]))
    mean_y_z0 = float(np.mean(y[z0_mask]))
    reduced_form = mean_y_z1 - mean_y_z0
    
    # Step 4: Compute the Wald Estimator ratio = Reduced Form / First Stage
    if abs(first_stage) > 1e-12:
        wald = float(reduced_form / first_stage)
    else:
        wald = 0.0
        
    return {
        "first_stage_compliance": first_stage,
        "reduced_form_intent": reduced_form,
        "wald_estimate": wald,
    }
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
