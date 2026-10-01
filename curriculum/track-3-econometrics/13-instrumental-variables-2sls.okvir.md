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

What can an empirical economist do when a treatment $D$ is inextricably tangled with unobserved confounders (endogeneity), such that OLS is hopelessly biased, and running an actual Randomized Controlled Trial is physically impossible or strictly unethical?

For example, consider estimating the economic return to schooling on lifetime earnings. People who complete more years of schooling often possess higher innate drive, family connections, and cognitive ability. Because we cannot randomly force children to drop out of school, OLS will always confuse schooling with unobserved innate talent.

Econometricians solve this puzzle using an **Instrumental Variable ($Z$)**. Think of an instrument as a **natural gust of wind** or a coin toss engineered by nature that nudges people into treatment from the outside:
* It pushes some people into taking treatment $D$.
* It has no connection whatsoever to the unobserved confounders ($\varepsilon$).
* It has **no direct path to the outcome $Y$** except through its effect on treatment!

For an instrument $Z$ to be valid, it must strictly satisfy two golden commandments:
1. **Instrument Relevance:** The instrument must actually shift treatment ($\text{Cov}(Z, D) \ne 0$). If the wind doesn't blow, the sailboat doesn't move!
2. **The Exclusion Restriction:** The instrument must affect the outcome $Y$ *exclusively* through the treatment channel $D$ ($\text{Cov}(Z, \varepsilon) = 0$).

The **Wald Estimator** is the elegant ratio of two simple numbers:
$$\hat{\beta}_{\text{IV}} = \frac{\text{Effect of Instrument on Outcome (Reduced Form)}}{\text{Effect of Instrument on Treatment (First Stage Compliance)}}$$
By dividing the total nudge on outcome by the take-up rate, IV scales up the variation to recover the untainted causal effect!

ماذا يفعل الباحث الاقتصادي عندما يكون متغير المعالجة $D$ متشابكًا بصورة ميؤوس منها مع متغيرات خفية ومربكة (Endogeneity)، بحيث يصبح انحدار OLS متحيزًا حتمًا، ويكون إجراء تجربة عشوائية منضبطة مستحيلاً عمليًا أو محظورًا أخلاقيًا؟

تأمل مثلاً قياس العائد المالي للتعليم على الأجور طوال العمر. الأفراد الذين يكملون سنوات دراسية أطول يمتلكون في الغالب ذكاءً فطريًا أعلى، وعلاقات أسرية أوسع، وإصرارًا ذاتيًا أقوى. ونظرًا لأنه لا يمكننا إجبار عينة عشوائية من الأطفال على ترك التعليم المدرسي قسرًا، سيظل OLS يخلط أثر التعليم بذكاء الفرد الفطري غير المرصود.

يحل الاقتصاديون هذا اللغز باستخدام **المتغير الآداتي (Instrumental Variable - $Z$)**. تخيل الأداة كـ **هبة ريح طبيعية خارجية** أو قرعة عشوائية تجريها الطبيعة تدفع الناس نحو المعالجة من الخارج:
* تحفز بعض الناس على تلقي المعالجة $D$.
* لا ترتبط إطلاقًا بالعوامل الخفية والمربكة ($\varepsilon$).
* **لا تؤثر على النتيجة $Y$ بأي طريق مباشر** إلا من خلال قناة المعالجة $D$ فقط!

لتكون الأداة صالحة قانونيًا ورياضيًا، يجب أن تستوفي شرطين مقدسين:
1. **ملاءمة الأداة (Relevance):** أن تحرك الأداة متغير المعالجة فعليًا ($\text{Cov}(Z, D) \ne 0$). فإذا لم تهب الرياح، فلن يتحرك الشراع!
2. **قيد الاستبعاد (Exclusion Restriction):** ألا تؤثر الأداة على النتيجة $Y$ إلا *حصرًا* عبر المعالجة $D$ دون أي قناة خلفية ($\text{Cov}(Z, \varepsilon) = 0$).

**مقدر فالد (Wald Estimator)** هو حاصل قسمة رقمين بسيطين:
$$\hat{\beta}_{\text{IV}} = \frac{\text{أثر الأداة على النتيجة (النموذج المختزل)}}{\text{أثر الأداة على المعالجة (امتثال المرحلة الأولى)}}$$
بقسمة الأثر الإجمالي على نسبة الامتثال، يعيد مقدر IV تضخيم النسبة لعزل الأثر السببي الصافي وتطهيره من أي شوائب خفية!

:::simulation-widget{engine="canvas2d" component="InstrumentalVariablesLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Consider the structural linear model with an endogenous treatment $D_i$:

$$
y_i = \beta_0 + \beta_1 D_i + \varepsilon_i, \quad \text{where } \text{Cov}(D_i, \varepsilon_i) \ne 0
$$

Because of endogeneity, $\text{plim} \, \hat{\beta}_{1, \text{OLS}} = \beta_1 + \frac{\text{Cov}(D_i, \varepsilon_i)}{\mathbb{V}(D_i)} \ne \beta_1$.

Let $Z_i$ be a binary instrumental variable satisfying the two identification conditions:
1. **First-Stage Relevance:** $\text{Cov}(Z_i, D_i) \ne 0 \iff \mathbb{E}[D_i \mid Z_i = 1] \ne \mathbb{E}[D_i \mid Z_i = 0]$
2. **Exclusion Restriction:** $\text{Cov}(Z_i, \varepsilon_i) = 0 \iff \mathbb{E}[\varepsilon_i \mid Z_i = 1] = \mathbb{E}[\varepsilon_i \mid Z_i = 0] = 0$

Taking the covariance of both sides of the structural equation with $Z_i$:

$$
\text{Cov}(Z_i, y_i) = \beta_1 \text{Cov}(Z_i, D_i) + \underbrace{\text{Cov}(Z_i, \varepsilon_i)}_{= 0}
$$

Solving for $\beta_1$ yields the population **Instrumental Variables Estimator**:

$$
\beta_1 = \frac{\text{Cov}(Z_i, y_i)}{\text{Cov}(Z_i, D_i)}
$$

For a binary instrument $Z_i \in \{0, 1\}$, substituting sample differences in expectations yields the **Wald Estimator**:

$$
\hat{\beta}_{\text{Wald}} = \frac{\mathbb{E}[y_i \mid Z_i = 1] - \mathbb{E}[y_i \mid Z_i = 0]}{\mathbb{E}[D_i \mid Z_i = 1] - \mathbb{E}[D_i \mid Z_i = 0]} \equiv \frac{\text{Reduced Form Intent-to-Treat}}{\text{First Stage Compliance Rate}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $D_i$: Endogenous treatment variable correlated with unobserved disturbance term $\varepsilon_i$.
* $Z_i$: Instrumental variable serving as an exogenous shock to treatment probability.
* $\text{Cov}(Z_i, D_i) \ne 0$: Relevance condition ensuring the first stage has explanatory power.
* $\text{Cov}(Z_i, \varepsilon_i) = 0$: Exclusion restriction stating that the instrument is uncorrelated with unobserved determinants of $y_i$.
* $\mathbb{E}[y_i \mid Z_i = 1] - \mathbb{E}[y_i \mid Z_i = 0]$: Reduced form estimate measuring the total effect of the instrument assignment on the final outcome.
* $\mathbb{E}[D_i \mid Z_i = 1] - \mathbb{E}[D_i \mid Z_i = 0]$: First-stage compliance differential measuring the change in treatment uptake induced by the instrument.

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
    z1_mask = (z == 1)
    z0_mask = (z == 0)
    
    # Step 1: First-stage compliance effect: E[D|Z=1] - E[D|Z=0]
    mean_d_z1 = float(np.mean(d[z1_mask]))
    mean_d_z0 = float(np.mean(d[z0_mask]))
    first_stage = mean_d_z1 - mean_d_z0
    
    # Step 2: Reduced-form intent-to-treat effect: E[Y|Z=1] - E[Y|Z=0]
    mean_y_z1 = float(np.mean(y[z1_mask]))
    mean_y_z0 = float(np.mean(y[z0_mask]))
    reduced_form = mean_y_z1 - mean_y_z0
    
    # Step 3: Wald Estimator = Reduced Form / First Stage
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

In his landmark study, Joshua Angrist (1990) utilized the **Vietnam Draft Lottery** ($Z = 1$ if low lottery number assigned draft eligibility, $0$ otherwise) to estimate the causal effect of military service ($D$) on civilian earnings ($Y$).

Why was the draft lottery number an exceptionally credible instrument satisfying both relevance and the exclusion restriction?

* [ ] Because having a low draft number directly boosted job skills and high-tech civilian wages.
* [x] Draft lottery numbers were assigned via a televised random ball draw (guaranteeing $\text{Cov}(Z, \varepsilon) = 0$), strongly influenced veteran status ($\text{Cov}(Z, D) \ne 0$), and had no biological or economic mechanism to affect civilian wages twenty years later other than through inducing military service.
* [ ] Because everyone drafted complied with military service ($100\%$ compliance rate).
* [ ] Because OLS was already unbiased, so the IV served only to confirm the textbook standard error.
