---
id: "panel-data-fixed-effects"
version: "1.0.0"
title: "Panel Fixed Effects (Within Estimator) & De-meaning Geometry"
track: "econometrics"
module: "mod-25"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus"]
i18n:
  ar: "الآثار الثابتة لبيانات البانل ومقدر التحويل الداخلي"
---

# Panel Fixed Effects (Within Estimator) & De-meaning Geometry

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

In pure cross-sectional data, we observe each person, firm, or country only once. If an unobserved permanent trait—such as an individual's innate tenacity, a startup's founding culture, or a nation's geographical climate—correlates with our regressors, OLS is hopelessly confounded by omitted variable bias.

**Panel (longitudinal) datasets** track the exact same $N$ economic entities across multiple time periods ($t = 1, \dots, T$). This temporal repetition grants econometrics one of its most potent superpowers: the **Within Estimator (Fixed Effects)**.

How does it work? Rather than comparing person $A$ with person $B$, Fixed Effects compares **person $A$ at time $t$ against person $A$'s own historical average**:
1. Calculate each entity's personal time-mean for the outcome ($\bar{y}_i$) and for all regressors ($\bar{\mathbf{x}}_i$).
2. Subtract the entity's personal average from every single observation:
   $$\ddot{y}_{it} = y_{it} - \bar{y}_i, \quad \ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$$

What happens to the unobserved permanent confounder $\alpha_i$ during this "within-transformation"?
Because $\alpha_i$ is constant over time, its personal average is simply $\alpha_i$. Therefore:
$$\alpha_i - \bar{\alpha}_i = \alpha_i - \alpha_i = 0$$
**The unobserved confounder subtracts from itself and completely vanishes into thin air!**
You successfully control for every time-invariant unobserved factor in the universe without ever measuring, naming, or modeling it.

However, this superpower carries an inescapable cost: **any observed variable that does not change over time (such as birthplace or race) is also subtracted from itself and wiped out!**

في البيانات المقطعية العادية، نرصد كل فرد أو شركة أو دولة مرة واحدة فقط. وإذا ارتبطت سمة دائمة غير مرصودة—كالذكاء الفطري للشخص، أو الثقافة التأسيسية للشركة، أو جغرافية الدولة—بالمتغيرات المستقلة، يسقط OLS حتمًا في فخ انحياز المتغير المغفَل.

تتتبع **بيانات السلاسل المقطعية (بيانات البانل Panel Data)** الوحدات الاقتصادية الـ $N$ ذاتها عبر فترات زمنية متتالية ($t = 1, \dots, T$). يمنح هذا التكرار الزمني القياس الاقتصادي إحدى أقوى أدواته على الإطلاق: **مقدر التحويل الداخلي (Fixed Effects)**.

كيف تعمل هذه المعجزة؟ بدلاً من مقارنة الشخص $A$ بالشخص $B$، يقارن نموذج الآثار الثابتة **الشخص $A$ في اللحظة $t$ بمتوسط تاريخ الشخص $A$ نفسه**:
1. نحسب المتوسط الزمني الخاص بكل فرد للمتغير التابع ($\bar{y}_i$) ولجميع المتغيرات المستقلة ($\bar{\mathbf{x}}_i$).
2. نطرح المتوسط الزمني للفرد من كل مشاهدة من مشاهداته:
   $$\ddot{y}_{it} = y_{it} - \bar{y}_i, \quad \ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$$

ما الذي يحدث للمتغير الخفي الثابت $\alpha_i$ أثناء هذا التحويل الداخلي (Within-Transformation)؟
نظرًا لأن $\alpha_i$ ثابت لا يتغير مع مرور الزمن، فإن متوسطه الزمني هو $\alpha_i$ نفسه. وبناءً عليه:
$$\alpha_i - \bar{\alpha}_i = \alpha_i - \alpha_i = 0$$
**يُطرح المتغير المشوش من نفسه ليتلاشى تمامًا كأنه لم يكن!**
أنت بذلك تتحكم في كل عامل خفي وثابت في الكون دون الحاجة إلى قياسه أو حتى معرفة اسمه.

ولكن لهذه القوة ثمن لا مفر منه: **أي متغير مرصود لا يتغير عبر الزمن (كمكان الميلاد أو الأصل العرقي) يُطرح هو الآخر من نفسه ويُمحى تمامًا من المعادلة!**

:::simulation-widget{engine="canvas2d" component="PanelFixedEffectsWithinLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The canonical two-way unobserved effects panel model across $i = 1, \dots, N$ and $t = 1, \dots, T$:

$$
y_{it} = \mathbf{x}_{it}^T \boldsymbol{\beta} + \alpha_i + \varepsilon_{it}
$$

Averaging across all $T$ time periods for entity $i$:

$$
\bar{y}_i = \bar{\mathbf{x}}_i^T \boldsymbol{\beta} + \alpha_i + \bar{\varepsilon}_i, \quad \text{where } \bar{y}_i \equiv \frac{1}{T}\sum_{t=1}^T y_{it}
$$

Subtracting the entity mean from the original equation yields the **Within-Transformation**:

$$
(y_{it} - \bar{y}_i) = (\mathbf{x}_{it} - \bar{\mathbf{x}}_i)^T \boldsymbol{\beta} + (\alpha_i - \alpha_i) + (\varepsilon_{it} - \bar{\varepsilon}_i)
$$

$$
\ddot{y}_{it} = \ddot{\mathbf{x}}_{it}^T \boldsymbol{\beta} + \ddot{\varepsilon}_{it}
$$

The pooled OLS estimator on these demeaned variables is the **Within Fixed Effects Estimator**:

$$
\hat{\boldsymbol{\beta}}_{\text{FE}} = \left( \sum_{i=1}^N \sum_{t=1}^T \ddot{\mathbf{x}}_{it} \ddot{\mathbf{x}}_{it}^T \right)^{-1} \sum_{i=1}^N \sum_{t=1}^T \ddot{\mathbf{x}}_{it} \ddot{y}_{it}
$$

After obtaining $\hat{\boldsymbol{\beta}}_{\text{FE}}$, the individual entity intercepts can be recovered as:

$$
\hat{\alpha}_i = \bar{y}_i - \bar{\mathbf{x}}_i^T \hat{\boldsymbol{\beta}}_{\text{FE}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $y_{it}$: Observed outcome of entity $i$ at time period $t$.
* $\mathbf{x}_{it} \in \mathbb{R}^{K \times 1}$: Vector of strictly time-varying explanatory variables.
* $\alpha_i$: Entity fixed effect capturing all time-invariant unobserved heterogeneity (allowed to correlate arbitrarily with $\mathbf{x}_{it}$).
* $\varepsilon_{it}$: Idiosyncratic time-varying shock satisfying strict exogeneity $\mathbb{E}[\varepsilon_{it} \mid \mathbf{x}_{i1}, \dots, \mathbf{x}_{iT}, \alpha_i] = 0$.
* $\ddot{y}_{it} = y_{it} - \bar{y}_i$: Demeaned outcome variable purged of entity time-averages.
* $\ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$: Demeaned regressor vector; if regressor $k$ is time-invariant ($x_{it, k} = x_{i, k}$ for all $t$), then $\ddot{x}_{it, k} = 0$, rendering the matrix non-invertible.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the panel fixed effects within-estimator in NumPy. Demean both $y$ and $X$ by entity group, solve for $\hat{\boldsymbol{\beta}}_{\text{FE}}$, and back out the estimated entity intercepts $\hat{\alpha}_i$.

:::python-challenge{id="py-panel-data-fixed-effects"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([10.0, 12.0, 20.0, 22.0]); X = np.array([[1.0], [2.0], [1.0], [2.0]]); ids = np.array([0, 0, 1, 1]); res = fit_panel_fe(y, X, ids); round(float(res['beta_fe'][0]), 4)"
    expected: "2.0"
  - input: "y = np.array([5.0, 7.0, 15.0, 17.0]); X = np.array([[2.0], [4.0], [2.0], [4.0]]); ids = np.array([0, 0, 1, 1]); res = fit_panel_fe(y, X, ids); round(float(res['beta_fe'][0]), 4)"
    expected: "1.0"
  - input: "y = np.array([3.0, 5.0, 7.0, 9.0]); X = np.array([[1.0], [2.0], [1.0], [2.0]]); ids = np.array([0, 0, 1, 1]); res = fit_panel_fe(y, X, ids); len(res['entity_alphas'])"
    expected: "2"
---
```python
import numpy as np

def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:
    """
    Fits a panel fixed-effects regression via the Within-Transformation.
    
    Parameters
    ----------
    y : np.ndarray of shape (N_total,)
        Stacked outcome vector.
    X : np.ndarray of shape (N_total, K)
        Stacked time-varying regressor matrix.
    entity_ids : np.ndarray of shape (N_total,)
        Integer identifiers for each entity.
        
    Returns
    -------
    dict with keys:
        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients
        'entity_alphas': dict mapping entity_id to float estimated alpha_i
    """
    unique_entities = np.unique(entity_ids)
    
    y_ddot = np.zeros_like(y, dtype=float)
    X_ddot = np.zeros_like(X, dtype=float)
    entity_means_y = {}
    entity_means_X = {}
    
    # Step 1: Compute entity-specific temporal averages and demean
    for eid in unique_entities:
        mask = (entity_ids == eid)
        y_bar = np.mean(y[mask])
        X_bar = np.mean(X[mask], axis=0)
        
        entity_means_y[eid] = y_bar
        entity_means_X[eid] = X_bar
        
        y_ddot[mask] = y[mask] - y_bar
        X_ddot[mask] = X[mask] - X_bar
        
    # Step 2: Fit OLS on demeaned data: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot
    XtX = X_ddot.T @ X_ddot
    Xty = X_ddot.T @ y_ddot
    beta_fe = np.linalg.solve(XtX, Xty)
    
    # Step 3: Back out entity-specific alphas: alpha_i = y_bar_i - X_bar_i @ beta_fe
    entity_alphas = {}
    for eid in unique_entities:
        entity_alphas[eid] = float(entity_means_y[eid] - entity_means_X[eid] @ beta_fe)
        
    return {
        "beta_fe": beta_fe,
        "entity_alphas": entity_alphas,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A graduate student sets out to estimate the labor market wage penalty of birthplace (being born in a rural county vs a metropolitan city) using a 15-year panel tracking $10,000$ workers. She specifies an individual Fixed Effects (within) model. When she inspects her regression output, the `rural_birthplace` coefficient is missing, displaying `NaN` or `Dropped due to collinearity`.

Why did this occur, and what trade-off does Fixed Effects enforce?

* [ ] The statistical package had a memory leak due to the large panel dimension.
* [x] Birthplace is strictly time-invariant for each person ($x_{it} = \bar{x}_i$ for all $t$); the within-transformation demeans it to exact zero ($\ddot{x}_{it} = 0$), causing perfect multicollinearity. Fixed Effects permanently eliminates all time-invariant variables alongside the unobserved fixed effects.
* [ ] Rural birthplace has no causal relationship with earnings in any econometric model.
* [ ] The student should have used first differences to retain the birthplace coefficient.
