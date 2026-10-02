---
id: "bad-controls-mediators-overcontrolling"
version: "1.0.0"
title: "Bad Controls, Mediators, and Overcontrolling"
track: "econometrics"
module: "mod-21"
estimated_minutes: 15
prerequisites: ["omitted-variable-bias-formula"]
i18n:
  ar: "ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم"
---

# Bad Controls, Mediators, and Overcontrolling

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose an e-commerce website redesigns its product page to increase total purchases: *does the new, cleaner layout cause higher sales?*

The data science team launches an A/B test. The product manager decides to be 'extra careful' and tells the data scientist: *"Make sure you control for everything! Let's control for whether the customer clicked the 'Proceed to Checkout' button."*

What happens when you add 'Clicked Checkout' to the regression?
The estimated effect of the redesign **instantly drops to zero!** The team falsely concludes that the redesign failed.

Why did this disaster happen? Because clicking checkout is not an external confounder—it is the direct **mediator** through which the redesign works! The new layout increases sales *precisely by convincing people to click checkout*. When you hold 'Clicked Checkout' constant, you ask: *"Among people who either both clicked checkout or both didn't, did the redesign help?"* You have blocked the very pipe that carries the causal effect!

This fatal mistake is called **Overcontrolling** or adding a **Bad Control**. A good control is determined *before* treatment (like customer age or historical spend). A bad control is determined *after* treatment and sits directly on the causal transmission path.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Good Control** | Pre-treatment confounder: a background trait existing before the experiment started. |
| **Bad Control** | Post-treatment trap: a variable influenced by the treatment that distorts its effect. |
| **Mediator** | The transmission pipeline: a middle stepping stone through which treatment creates its impact. |
| **Overcontrolling** | Stifling the mechanism: holding the transmission pipe fixed, choking off the effect. |
| **Variance Inflation Factor (VIF)** | Multicollinearity alarm: measures how much coefficient variance is inflated by redundant controls. |

```text
    THE MEDIATOR PIPELINE:

      [ Redesign (Treatment) ] ======> [ Clicked Checkout (Mediator) ] ======> [ Purchase (Outcome) ]
                 |                                      ^
                 |                                      |
                 \====== (Controlling for this shuts off the pipeline!) =====/
```

### الحدس والقصة الواقعية

تخيل متجرًا إلكترونيًا أعاد تصميم صفحة المنتج لزيادة المبيعات: *هل يؤدي التصميم الجديد إلى زيادة المشتريات الفعلية؟*

أطلق فريق البيانات اختبار A/B. وأراد مدير المنتج أن يكون "شديد الدقة والحرص"، فقال للباحث: *"تأكد من ضبط كل المتغيرات الممكنة! دعنا نضبط النموذج بالتحكم في متغير: هل نقر العميل على زر الانتقال إلى الدفع؟"*

ما الذي حدث عند إدخال هذا المتغير في الانحدار؟
**انهار الأثر المقدر للتصميم الجديد إلى الصفر فورًا!** واستنتج الفريق خطأً أن التصميم الجديد فاشل ولا جدوى منه.

لماذا حدثت هذه الكارثة التحليلية؟ لأن النقر على زر الدفع ليس متغيرًا مربكًا خارجيًا، بل هو **الوسيط (Mediator)** والقناة التي يعمل من خلالها التصميم! فالتصميم الجديد ينجح تحديدًا عبر إقناع الزوار بالنقر على زر الدفع. فعندما تثبت هذا الزر، فأنت تسأل: *"بين الأشخاص الذين نقروا جميعًا أو لم ينقروا جميعًا، هل أحدث التصميم فرقًا؟"* لقد خنقت الأنبوب الذي ينقل الأثر السببي بالكامل!

هذا الخطأ الفادح يسمى **التحكم الخاطئ (Bad Controls)** أو **الإفراط في التحكم (Overcontrolling)**؛ فالمتغير الضابط الصالح يُقاس *قبل المعالجة*، أما المتغير الضابط السيئ فهو وليد المعالجة ويقع في مسارها.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **الضابط الصالح (Good Control)** | عامل سابق للمعالجة: صفة أساسية موجودة مسبقًا تفسر الفروق المربكة. |
| **الضابط السيئ (Bad Control)** | فخ ما بعد المعالجة: متغير ناتج عن المعالجة يؤدي ضبطه لتشويه أثرها الحقيقي. |
| **المتغير الوسيط (Mediator)** | أنبوب النقل: الخطوة الوسيطة التي تنتقل عبرها طاقة المعالجة نحو النتيجة. |
| **الإفراط في التحكم (Overcontrolling)** | خنق الآلية: تثبيت المتغير الوسيط مما يؤدي لمحو الأثر السببي الإجمالي. |
| **معامل تضخم التباين (VIF)** | جرس إنذار التعدد الخطي: يقيس مدى تضخم خطأ التقدير بسبب حشو المتغيرات. |

:::simulation-widget{engine="canvas2d" component="SimpsonsParadoxLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let treatment be $D$, outcome be $Y$, and mediator be $M$. The true causal DAG is $D \to M \to Y$.

The total causal effect of $D$ on $Y$ is obtained from the regression without $M$:

$$
Y_i = \alpha_0 + \tau_{\text{total}} D_i + \varepsilon_i
$$

When conditioning on mediator $M$, the regression decomposes into the direct effect:

$$
Y_i = \alpha_1 + \tau_{\text{direct}} D_i + \gamma M_i + u_i
$$

If there is no direct path other than through $M$, then $\tau_{\text{direct}} = 0$, completely erasing the evidence of treatment efficacy!

Furthermore, when redundant collinear controls are added, the Variance Inflation Factor for regressor $j$ inflates coefficient variance:

$$
\text{VIF}_j = \frac{1}{1 - R_j^2}
$$

where $R_j^2$ is the coefficient of determination from regressing regressor $X_j$ on all other regressors.

### Why the Math Works Step-by-Step

1. **Why does conditioning on a mediator destroy total causal inference?**
   By the chain rule of differentiation in structural models:
   $$\frac{dY}{dD} = \frac{\partial Y}{\partial D} + \frac{\partial Y}{\partial M} \frac{dM}{dD}$$
   The total effect includes the indirect channel $\frac{\partial Y}{\partial M} \frac{dM}{dD}$. Controlling for $M$ forces $dM = 0$, throwing away the indirect channel and measuring only the direct residual impact.
2. **The Hazard of Collider Stratification:**
   If there is an unobserved confounder $U$ affecting mediator $M$ and outcome $Y$ ($M \leftarrow U \to Y$), controlling for $M$ turns it into a collider along the path $D \to M \leftarrow U \to Y$, opening a spurious backdoor path between $D$ and $Y$!
3. **Variance Inflation Factor Thresholds:**
   When $R_j^2 \to 1$ (near-perfect collinearity), $\text{VIF}_j \to \infty$. A rule of thumb is that $\text{VIF} > 5$ or $10$ indicates severe multicollinearity that destroys statistical precision.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\tau_{\text{total}}$: Total causal effect capturing all direct and mediated mechanisms.
* $\tau_{\text{direct}}$: Direct effect holding the mediator artificially fixed.
* $\text{VIF}_j$: Factor by which $\mathbb{V}[\hat{\beta}_j]$ is inflated relative to orthogonal regressors.
* $R_j^2$: Proportion of variance in $X_j$ explained by all other regressors.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\tau_{\text{total}}$ | الأثر السببي الإجمالي | القوة الإجمالية للمعالجة متضمنة كافة القنوات والمسارات الوسيطة. |
| $\tau_{\text{direct}}$ | الأثر المباشر المنعزل | أثر المعالجة المتبقي بعد تثبيت الوسيط جبريًا وخنق قناته الطبيعية. |
| $\text{VIF}_j$ | معامل تضخم التباين | مضاعف يوضح كم تضاعف خطأ التقدير بسبب التكرار والتداخل بين الميزات. |
| $R_j^2$ | معامل تحديد الانحدار المساعد | نسبة تباين الميزة التي يمكن التنبؤ بها بواسطة بقية الميزات في النموذج. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the Variance Inflation Factor (VIF) diagnostic tool for each column in a design matrix using auxiliary regressions to diagnose severe overcontrolling and collinearity.

:::python-challenge{id="py-bad-controls-mediators-overcontrolling"}
---
timeout_ms: 3000
test_cases:
  - input: "vifs = compute_vif(np.array([[1.0, 2.0], [2.0, 4.01], [3.0, 5.99]])); vifs[0] > 10.0"
    expected: "True"
  - input: "vifs = compute_vif(np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]])); np.allclose(vifs, [1.0, 1.0], atol=1e-2)"
    expected: "True"
  - input: "len(compute_vif(np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 10.0]])))"
    expected: "3"
---
```python
import numpy as np

def compute_vif(X: np.ndarray) -> np.ndarray:
    """
    Computes the Variance Inflation Factor (VIF) for each column in design matrix X.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, K)
        Design matrix (without intercept, or where each column is checked).
        
    Returns
    -------
    np.ndarray of shape (K,) with VIF values.
    """
    n, k = X.shape
    vifs = np.zeros(k)

    for j in range(k):
        # Target column j
        y_j = X[:, j]
        # Regressors: all columns except j, plus an intercept
        X_other = np.delete(X, j, axis=1)
        X_design = np.column_stack([np.ones(n), X_other])

        # Fit OLS of feature j on all other features
        beta = np.linalg.solve(X_design.T @ X_design, X_design.T @ y_j)
        y_hat = X_design @ beta

        # Compute R^2 of this auxiliary regression
        tss = np.sum((y_j - np.mean(y_j)) ** 2)
        ssr = np.sum((y_j - y_hat) ** 2)
        r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0

        # VIF = 1 / (1 - R^2)
        vifs[j] = 1.0 / (1.0 - r2) if r2 < 0.999999 else 1e6

    return vifs
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A national government evaluates a multi-million-dollar agricultural grant program ($D = 1$ if farm received cash grant, $0$ otherwise) intended to boost crop harvest value ($Y$). A junior data analyst specifies the following regression:

$$
\text{Harvest}_i = \beta_0 + \beta_1 \text{Grant}_i + \beta_2 \text{FertilizerPurchased}_i + \varepsilon_i
$$

He finds $\hat{\beta}_1 \approx 0$ ($p = 0.85$) and announces to the cabinet that the cash grant had zero impact on farm output.

Why is this conclusion fundamentally flawed?

* [ ] The analyst should have used a log transform on harvest instead of linear values.
* [x] Fertilizer is a textbook mediator (bad control) purchased *using* the grant money; controlling for fertilizer absorbs the primary transmission mechanism through which the cash grant boosted yields, artificially shrinking $\hat{\beta}_1$ toward zero.
* [ ] Controlling for fertilizer creates heteroskedasticity in harvest values.
* [ ] The sample size must be infinite to evaluate agricultural grants.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
The entire purpose of giving agricultural cash grants is to provide liquidity so farmers can purchase high-yield fertilizer and modern seeds ($D \to \text{Fertilizer} \to \text{Harvest}$). Controlling for fertilizer answers the counterfactual: *"Did giving cash to farmers increase crop yield among farmers who purchased identical quantities of fertilizer?"* Of course not! Fertilizer is the primary transmission canal. By conditioning on fertilizer, the analyst effectively partials out the entire indirect causal effect ($\gamma_1 \theta$), leaving only the negligible direct effect ($\tau_{\text{direct}} \approx 0$). The analyst falsely advised canceling a successful development program.

**Why the distractors are incorrect:**
1. *The analyst should have used a log transform...*: Functional form (log vs linear) affects percentage interpretation, but does not fix the fundamental structural flaw of conditioning on a post-treatment mediator.
2. *Controlling for fertilizer creates heteroskedasticity...*: Heteroskedasticity affects standard errors, not the substantive wiping out of the causal effect due to mediation conditioning.
3. *The sample size must be infinite...*: Sample size is irrelevant; even with a billion farms, controlling for the mediator will continue to absorb the mediated causal channel.

*الشرح باللغة العربية:*
الغاية الأساسية من المنح النقدية الزراعية هي تمكين المزارعين من شراء الأسمدة والبذور المحسنة ($D \to \text{أسمدة} \to \text{محصول}$). التحكم في كمية الأسمدة يطرح السؤال المعكوس: *"هل تؤدي المنحة لزيادة المحصول بين المزارعين الذين اشتروا نفس كمية السماد تمامًا؟"* الإجابة الطبيعية هي لا، لأن الأسمدة هي قناة النقل السببي الرئيسية! لقد قام المحلل بإبادة الأثر غير المباشر للبرنامج عبر التجريد الخاطئ، وأوصى بإلغاء برنامج ناجح بسبب جهله بالضوابط السيئة وفخ المتغيرات الوسيطة.
