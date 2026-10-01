---
id: "frisch-waugh-lovell-theorem"
version: "1.0.0"
title: "The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out"
track: "econometrics"
module: "mod-20"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus", "four-fundamental-subspaces"]
i18n:
  ar: "مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات"
---

# The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

In empirical research, you will constantly hear researchers state: *"We estimate the causal effect of schooling on wages, controlling for experience, industry, and location."* But what does "controlling for" actually mean under the hood? Does the statistical software magically pause time or create cloned human beings with identical industries?

The **Frisch-Waugh-Lovell (FWL) Theorem** reveals the elegant algebraic mechanics of "partialling out":
1. **Purge the Outcome:** Regress the outcome $Y$ on the control variables $X_2$, and save the residuals $\tilde{\mathbf{y}}$. This strips away every shred of variation in $Y$ that can be predicted by $X_2$.
2. **Purge the Regressor:** Regress the key variable of interest $X_1$ on the controls $X_2$, and save the residuals $\tilde{\mathbf{X}}_1$. This wipes out any correlation or overlap between $X_1$ and $X_2$.
3. **Run a Simple Bivariate Regression:** Regress the purified outcome residuals $\tilde{\mathbf{y}}$ on the purified regressor residuals $\tilde{\mathbf{X}}_1$.

The slope of this simple bivariate regression is **mathematically identical down to the last decimal place** to the coefficient $\hat{\boldsymbol{\beta}}_1$ from the giant multiple regression! 

Think of active noise-cancelling headphones: to hear a subtle violin solo ($X_1$) inside a noisy airplane cabin ($X_2$), the headphones generate an inverse acoustic wave to cancel the engine drone from the microphone ($Y$) and from the audio stream ($X_1$). Controlling for variables simply means washing the fingerprints of the controls off both the treatment and the outcome before comparing what remains.

في أبحاث الاقتصاد القياسي، ستسمع الباحثين يكررون دائمًا: *"نقيس الأثر السببي للتعليم على الأجور، مع التحكم في سنوات الخبرة والقطاع الاقتصادي والمنطقة الجغرافية."* ولكن ما الذي يعنيه "التحكم في المتغيرات" بدقة رياضية؟ هل يمتلك الحاسوب آلة زمنية تجمد الواقع أو تصنع نسخًا بشرية متطابقة في كافة الظروف؟

تكشف **مبرهنة فريش-وو-لوفيل (FWL Theorem)** عن الآلية الحسابية المذهلة لمفهوم "التجريد الجزئي" (Partialling Out):
1. **تطهير المتغير التابع:** أجرِ انحدارًا لـ $Y$ على متغيرات التحكم $X_2$، واحتفظ بالبواقي $\tilde{\mathbf{y}}$. هذا الإجراء يمسح من $Y$ كل أثر يمكن تفسيره بواسطة $X_2$.
2. **تطهير المتغير المستقل:** أجرِ انحدارًا لمتغير المعالجة $X_1$ على متغيرات التحكم $X_2$، واحتفظ بالبواقي $\tilde{\mathbf{X}}_1$. هذا الإجراء يزيل أي تداخل أو تشابك بين $X_1$ و $X_2$.
3. **إجراء انحدار خطي بسيط:** قم بانحدار بواقي النتيجة المطهرة $\tilde{\mathbf{y}}$ على بواقي المعالجة المطهرة $\tilde{\mathbf{X}}_1$.

إن ميل هذا الانحدار البسيط **يتطابق رياضيًا وبالفاصلة العشرية** مع معامل الانحدار المتعدد الضخم $\hat{\boldsymbol{\beta}}_1$!

تخيل سماعات إلغاء الضجيج الذكية: لسماع عزف كمان رقيق ($X_1$) داخل مقصورة طائرة صاخبة ($X_2$)، تولد السماعات موجة صوتية معاكسة تلغي هدير المحرك تمامًا من أذنيك ($Y$) ومن جهاز التسجيل ($X_1$). التحكم في المتغيرات يعني ببساطة مسح بصمات عوامل التشويش من كل من المعالجة والنتيجة قبل فحص الرابط السببي المتبقي بينهما.

:::simulation-widget{engine="canvas2d" component="FWLPartiallingOutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Consider partitioning the design matrix into the regressor of interest $\mathbf{X}_1$ and control covariates $\mathbf{X}_2$:

$$
\mathbf{y} = \mathbf{X}_1 \boldsymbol{\beta}_1 + \mathbf{X}_2 \boldsymbol{\beta}_2 + \boldsymbol{\varepsilon}
$$

Define the orthogonal annihilator matrix for the control subspace:

$$
\mathbf{M}_2 \equiv \mathbf{I}_N - \mathbf{X}_2 (\mathbf{X}_2^T \mathbf{X}_2)^{-1} \mathbf{X}_2^T
$$

Premultiplying the entire structural equation by $\mathbf{M}_2$:

$$
\mathbf{M}_2 \mathbf{y} = \mathbf{M}_2 \mathbf{X}_1 \boldsymbol{\beta}_1 + \mathbf{M}_2 \mathbf{X}_2 \boldsymbol{\beta}_2 + \mathbf{M}_2 \boldsymbol{\varepsilon}
$$

Because $\mathbf{M}_2 \mathbf{X}_2 = \mathbf{0}$, the control block vanishes entirely:

$$
\tilde{\mathbf{y}} = \tilde{\mathbf{X}}_1 \boldsymbol{\beta}_1 + \tilde{\boldsymbol{\varepsilon}}
$$

Applying Ordinary Least Squares to this transformed single-variable equation yields:

$$
\hat{\boldsymbol{\beta}}_1 = (\tilde{\mathbf{X}}_1^T \tilde{\mathbf{X}}_1)^{-1} \tilde{\mathbf{X}}_1^T \tilde{\mathbf{y}} = (\mathbf{X}_1^T \mathbf{M}_2 \mathbf{X}_1)^{-1} \mathbf{X}_1^T \mathbf{M}_2 \mathbf{y}
$$

Furthermore, the residuals from this partial regression are identical to the multiple regression residuals:

$$
\mathbf{e} = \tilde{\mathbf{y}} - \tilde{\mathbf{X}}_1 \hat{\boldsymbol{\beta}}_1 = \mathbf{y} - \mathbf{X}_1 \hat{\boldsymbol{\beta}}_1 - \mathbf{X}_2 \hat{\boldsymbol{\beta}}_2
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{X}_1 \in \mathbb{R}^{N \times K_1}$: Submatrix containing the regressor(s) whose causal impact is of primary interest.
* $\mathbf{X}_2 \in \mathbb{R}^{N \times K_2}$: Submatrix of control covariates (e.g., demographic indicators, fixed effects, trends).
* $\mathbf{M}_2 \in \mathbb{R}^{N \times N}$: Annihilator matrix for $\mathbf{X}_2$ with $\text{rank}(\mathbf{M}_2) = N - K_2$.
* $\tilde{\mathbf{X}}_1 = \mathbf{M}_2 \mathbf{X}_1$: Regressor residuals purged of all linear associations with $\mathbf{X}_2$.
* $\tilde{\mathbf{y}} = \mathbf{M}_2 \mathbf{y}$: Outcome residuals purged of all linear associations with $\mathbf{X}_2$.
* $\hat{\boldsymbol{\beta}}_1$: The exact partial regression coefficient on $\mathbf{X}_1$ in the full joint model.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the three-step Frisch-Waugh-Lovell partialling out algorithm and verify that it produces coefficients identical to the full multiple regression.

:::python-challenge{id="py-frisch-waugh-lovell-theorem"}
---
timeout_ms: 3000
test_cases:
  - input: "b_partial, b_full = fwl_partial_regression(np.array([2.0, 3.0, 5.0, 7.0]), np.array([[1.0], [2.0], [3.0], [4.0]]), np.ones((4, 1))); round(float(b_partial[0]), 4) == round(float(b_full[0]), 4)"
    expected: "True"
  - input: "b_partial, b_full = fwl_partial_regression(np.array([4.0, 6.0, 9.0]), np.array([[1.0], [3.0], [5.0]]), np.array([[2.0], [1.0], [4.0]])); round(float(b_partial[0] - b_full[0]), 6)"
    expected: "0.0"
  - input: "b_p, b_f = fwl_partial_regression(np.array([10.0, 20.0, 30.0]), np.array([[1.0], [2.0], [3.0]]), np.array([[5.0], [5.0], [5.0]])); round(float(b_p[0]), 4)"
    expected: "10.0"
---
```python
import numpy as np

def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed target vector.
    X1 : np.ndarray of shape (N, K1)
        Target regressor block.
    X2 : np.ndarray of shape (N, K2)
        Control covariates block to partial out.
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        beta_partial: Coefficients from bivariate residual regression (K1,)
        beta_full_X1: Corresponding coefficients from joint multiple regression (K1,)
    """
    N = len(y)
    
    # Step 1: Compute annihilator matrix for X2: M2 = I - X2 (X2^T X2)^(-1) X2^T
    XtX2 = X2.T @ X2
    M2 = np.eye(N) - X2 @ np.linalg.inv(XtX2) @ X2.T
    
    # Step 2: Purge X2 out of y and X1
    y_tilde = M2 @ y
    X1_tilde = M2 @ X1
    
    # Step 3: Run partial regression of y_tilde on X1_tilde
    beta_partial = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)
    
    # Step 4: Run full joint regression of y on [X1, X2] for verification
    X_full = np.hstack([X1, X2])
    beta_full = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)
    beta_full_X1 = beta_full[:X1.shape[1]]
    
    return beta_partial, beta_full_X1
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A labor economist estimates the gender wage gap by regressing log wages on a female indicator while controlling for detailed occupation fixed effects and cumulative job experience. A critic argues: *"Your regression is completely meaningless because women and men do not work in the same occupations, so you cannot compare them."*

How does the FWL theorem refute or clarify this critique?

* [ ] The critic is correct because OLS cannot handle discrete categorical controls.
* [x] The FWL theorem proves that the coefficient on the female indicator is estimated strictly using the within-occupation variation that remains after purging occupation and experience differences ($\tilde{\mathbf{X}}_1$); it compares men and women who share the same occupation and experience.
* [ ] FWL proves that controlling for occupation automatically eliminates all omitted variable bias across the economy.
* [ ] The critic is correct because partialling out changes the sign of the true causal effect.
