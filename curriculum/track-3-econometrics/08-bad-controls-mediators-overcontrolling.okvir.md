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

In introductory statistics courses, students often acquire the dangerous dogma of the **"Kitchen Sink Regression"**: pack every available covariate in your spreadsheet into the regression model, operating under the naive illusion that adding more control variables can never hurt and always reduces bias.

In causal econometrics, this instinct is disastrous. Joshua Angrist and Jörn-Steffen Pischke famously coined the term **Bad Controls** to identify variables that should never be included in a regression.

Bad controls primarily come in two destructive varieties:
1. **The Mediator Trap ($D \to M \to Y$):** Suppose you want to measure the total causal return of a college degree ($D$) on earnings ($Y$). Should you control for whether the individual holds a managerial role ($M$)? **Absolutely not!** Getting hired into managerial roles is one of the primary pathways through which college education boosts earnings. If you control for management status, you block the transmission pipe. You are now comparing a college graduate manager to a non-college manager, asking: *"Does college help you earn more if it didn't help you get a better job?"* You have engineered away the very effect you set out to measure!
2. **The Collider Trap ($D \to C \leftarrow U$):** Controlling for variables determined *after* treatment can inadvertently condition on a collider, creating phantom correlations between treatment and unobserved errors that were previously independent.

Crucially, this is where predictive machine learning and causal econometrics violently part ways. In predictive modeling, more features almost always reduce test error. If an algorithm wants to predict tomorrow's wage, knowing the applicant's current job title ($M$) is immensely informative, and any model will eagerly incorporate it. But if a policymaker asks: *"Should we subsidize college tuition to increase national income?"*, controlling for occupation answers the wrong question. A policy intervention acts at the start of the causal domino chain; blocking intermediate falling dominoes blinds you to the full power of the intervention. **Good controls are predetermined variables established before treatment occurs** (such as birth year or parental education). Bad controls are variables that treatment itself influences.

في دروس الإحصاء الأولية، يتشرب الطلاب غالبًا عادة شائعة وخطيرة تُعرف بـ **"انحدار حوض المطبخ" (Kitchen Sink Regression)**: حشر كل متغير متاح في قاعدة البيانات داخل النموذج، تحت الوهم الساذج بأن إضافة ضوابط إضافية لا تضر أبدًا وتقلل التحيز حتمًا.

في الاقتصاد القياسي السببي، يعد هذا التفكير كارثيًا. صاغ الباحثان جوشوا أنغريست ويورن-ستيفن بيشكي مصطلح **ضوابط التحكم السيئة (Bad Controls)** للإشارة إلى المتغيرات التي يدمر إدراجها التعريف السببي.

تأتي الضوابط السيئة في صورتين رئيسيتين:
1. **فخ المتغير الوسيط ($D \to M \to Y$):** لنفترض أنك تريد قياس الأثر السببي الإجمالي للشهادة الجامعية ($D$) على الدخل ($Y$). هل يجوز أن تتحكم في متغير "شغل منصب إداري" ($M$)؟ **كلا على الإطلاق!** فالوصول إلى المناصب الإدارية هو إحدى القنوات الأساسية التي ترفع الشهادة الجامعية الدخل من خلالها. إذا تحكمت في المنصب الإداري، فإنك تسد أنبوب التدفق السببي؛ وتصبح مقارنتك بين مدير جامعي ومدير غير جامعي متسائلاً: *"هل تفيد الشهادة إذا لم تساعدك في الحصول على وظيفة أفضل؟"* لقد قتلت بيدك الأثر ذاته الذي تبحث عنه!
2. **فخ المصادم (Collider Trap):** التحكم في متغيرات تتحدد *بعد* حدوث المعالجة قد يحولها إلى مصادمات تربط المعالجة بعوامل تشويش خفية كانت مستقلة عنها تمامًا في الأصل.

وهنا يفترق تعلم الآلة التنبؤي عن الاقتصاد القياسي السببي بأوضح صورة: في التنبؤ البحت، كل متغير إضافي يقلل خطأ التنبؤ مرحب به، ومعرفة نوع وظيفة المتقدم الحالية يساعد الخوارزمية في تخمين راتبه بدقة هائلة. أما إذا سأل صانع القرار: *"هل نزيد المنح الدراسية لرفع الدخل القومي؟"*، فإن التحكم في نوع الوظيفة يحجب الأثر الكلي للسياسة، لأن جوهر جدوى التعليم يكمن تحديدًا في تمكين الطلاب من الوصول لتلك الوظائف الرفيعة! حجب أحجار الدومينو الوسيطة يعميك عن قوة الدفعة الأولى. **الضوابط الصالحة هي متغيرات سابقة على المعالجة زمنيًا وهيكليًا** (كسنة الميلاد أو تعليم الوالدين)، بينما الضوابط السيئة هي متغيرات تتأثر بالمعالجة ذاتها.

:::simulation-widget{engine="canvas2d" component="SimpsonsParadoxLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let the total causal effect of treatment $D_i$ on outcome $Y_i$ be represented by the structural equation:

$$
Y_i = \alpha + \tau D_i + \varepsilon_i
$$

Suppose treatment directly influences an intermediate mediator $M_i$:

$$
M_i = \gamma_0 + \gamma_1 D_i + u_i
$$

When a researcher includes the mediator $M_i$ in the regression:

$$
Y_i = \pi_0 + \tau_{\text{direct}} D_i + \theta M_i + \nu_i
$$

Substituting the mediator equation into the mediated outcome equation reveals the **Mediation Decomposition**:

$$
Y_i = (\pi_0 + \theta \gamma_0) + (\tau_{\text{direct}} + \gamma_1 \theta) D_i + (\theta u_i + \nu_i)
$$

The total causal effect decomposes into direct and indirect channels:

$$
\tau = \underbrace{\tau_{\text{direct}}}_{\text{Direct Effect}} + \underbrace{\gamma_1 \cdot \theta}_{\text{Indirect (Mediated) Effect}}
$$

Controlling for $M_i$ strictly isolates $\tau_{\text{direct}}$, completely erasing the indirect transmission channel $\gamma_1 \theta$.

### The Collider Danger of Post-Treatment Controls

Even worse, if an unobserved factor $U_i$ (e.g. ambition) affects both the mediator $M_i$ and the outcome $Y_i$, conditioning on $M_i$ induces a negative correlation between treatment $D_i$ and $U_i$:

$$
\text{Cov}(D_i, U_i \mid M_i) \neq 0
$$

This turns a clean randomized trial where $D_i \perp\!\!\!\perp U_i$ into an endogenously confounded regression!

To detect numerical overcontrolling and multicollinearity across regressor columns, the **Variance Inflation Factor (VIF)** of column $j$ is calculated via auxiliary regressions:

$$
\text{VIF}_j = \frac{1}{1 - R_j^2}
$$

where $R_j^2$ is the coefficient of determination from regressing regressor $\mathbf{x}_j$ onto all remaining $K-1$ regressors.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\tau$: Total causal effect of policy treatment $D_i$ on final outcome $Y_i$.
* $M_i$: Post-treatment mediator situated on the causal pathway from treatment to outcome.
* $\gamma_1$: First-stage effect of treatment on the mediator ($D \to M$).
* $\theta$: Partial effect of the mediator on the outcome holding treatment constant ($M \to Y$).
* $\tau_{\text{direct}}$: Direct effect of treatment bypassing the mediator.
* $\text{VIF}_j$: Variance Inflation Factor; $\text{VIF}_j > 10$ indicates severe multicollinearity where regressor $j$ is largely redundant.

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
    Computes the Variance Inflation Factor (VIF) for each column in X.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, K)
        Matrix of explanatory covariates (K >= 2).
        
    Returns
    -------
    np.ndarray of shape (K,)
        VIF values for each column.
    """
    N, K = X.shape
    vifs = np.zeros(K)
    
    for j in range(K):
        # Step 1: Extract target column j to predict
        y_j = X[:, j]
        
        # Step 2: Form matrix of all other K - 1 regressors with an intercept
        other_indices = [idx for idx in range(K) if idx != j]
        X_others = X[:, other_indices]
        X_aux = np.column_stack([np.ones(N), X_others])
        
        # Step 3: Fit auxiliary regression y_j on X_aux and predict fitted values
        XtX = X_aux.T @ X_aux
        Xty = X_aux.T @ y_j
        beta_aux = np.linalg.solve(XtX, Xty)
        y_hat_j = X_aux @ beta_aux
        
        # Step 4: Compute auxiliary R_j^2 and calculate VIF_j = 1 / (1 - R_j^2)
        y_bar = np.mean(y_j)
        tss = np.sum((y_j - y_bar) ** 2)
        ssr = np.sum((y_j - y_hat_j) ** 2)
        
        r2_j = 1.0 - (ssr / tss) if tss > 1e-12 else 0.0
        
        if r2_j >= 0.999999:
            vifs[j] = 1e6
        else:
            vifs[j] = 1.0 / (1.0 - r2_j)
            
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
