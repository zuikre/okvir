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
2. **The Collider Trap:** Controlling for variables determined *after* treatment can inadvertently condition on a collider, creating phantom correlations between treatment and unobserved errors that were previously independent.

**Good controls are predetermined variables established before treatment occurs** (such as birth year or parental education). Bad controls are variables that treatment itself influences.

في دروس الإحصاء الأولية، يتشرب الطلاب غالبًا عادة شائعة وخطيرة تُعرف بـ **"انحدار حوض المطبخ" (Kitchen Sink Regression)**: حشر كل متغير متاح في قاعدة البيانات داخل النموذج، تحت الوهم الساذج بأن إضافة ضوابط إضافية لا تضر أبدًا وتقلل التحيز حتمًا.

في الاقتصاد القياسي السببي، يعد هذا التفكير كارثيًا. صاغ الباحثان جوشوا أنغريست ويورن-ستيفن بيشكي مصطلح **ضوابط التحكم السيئة (Bad Controls)** للإشارة إلى المتغيرات التي يدمر إدراجها التعريف السببي.

تأتي الضوابط السيئة في صورتين رئيسيتين:
1. **فخ المتغير الوسيط ($D \to M \to Y$):** لنفترض أنك تريد قياس الأثر السببي الإجمالي للشهادة الجامعية ($D$) على الدخل ($Y$). هل يجوز أن تتحكم في متغير "شغل منصب إداري" ($M$)؟ **كلا على الإطلاق!** فالوصول إلى المناصب الإدارية هو إحدى القنوات الأساسية التي ترفع الشهادة الجامعية الدخل من خلالها. إذا تحكمت في المنصب الإداري، فإنك تسد أنبوب التدفق السببي؛ وتصبح مقارنتك بين مدير جامعي ومدير غير جامعي متسائلاً: *"هل تفيد الشهادة إذا لم تساعدك في الحصول على وظيفة أفضل؟"* لقد قتلت بيدك الأثر ذاته الذي تبحث عنه!
2. **فخ المصادم (Collider):** التحكم في متغيرات تتحدد *بعد* حدوث المعالجة قد يحولها إلى مصادمات تربط المعالجة بعوامل تشويش خفية كانت مستقلة عنها تمامًا في الأصل.

**الضوابط الصالحة هي متغيرات سابقة على المعالجة زمنيًا وهيكليًا** (كسنة الميلاد أو تعليم الوالدين)، بينما الضوابط السيئة هي متغيرات تتأثر بالمعالجة ذاتها.

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
        # Target column to predict
        y_j = X[:, j]
        
        # All remaining columns as regressors
        other_indices = [idx for idx in range(K) if idx != j]
        X_others = X[:, other_indices]
        
        # Add intercept to the auxiliary regression
        X_aux = np.column_stack([np.ones(N), X_others])
        
        # Fit auxiliary regression y_j on X_aux
        XtX = X_aux.T @ X_aux
        Xty = X_aux.T @ y_j
        beta_aux = np.linalg.solve(XtX, Xty)
        
        y_hat_j = X_aux @ beta_aux
        
        # Compute R_j^2
        y_bar = np.mean(y_j)
        tss = np.sum((y_j - y_bar) ** 2)
        ssr = np.sum((y_j - y_hat_j) ** 2)
        
        r2_j = 1.0 - (ssr / tss) if tss > 1e-12 else 0.0
        
        # VIF_j = 1 / (1 - R_j^2)
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
