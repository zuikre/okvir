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

In standard cross-sectional data, we observe each person, firm, or country only once. If an unobserved, permanent characteristic—such as an individual's innate tenacity, a startup's founding culture, or a nation's geographical climate—correlates with our regressors, OLS is hopelessly poisoned by omitted variable bias. 

**Panel (longitudinal) datasets** track the exact same $N$ economic entities across multiple time periods ($t = 1, \dots, T$). This temporal repetition grants econometrics one of its most celebrated superpowers: the **Within Estimator (Fixed Effects)**.

How does this statistical magic work? Rather than comparing entity $A$ against entity $B$, Fixed Effects acts as a mirror that compares **each entity strictly against its own historical average**:
1. First, calculate each entity's personal time-mean for the outcome ($\bar{y}_i$) and for all regressors ($\bar{\mathbf{x}}_i$).
2. Second, subtract the entity's personal average from every single temporal observation:
   $$\ddot{y}_{it} = y_{it} - \bar{y}_i, \quad \ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$$

What happens to the unobserved permanent confounder $\alpha_i$ during this "within-transformation"? Because $\alpha_i$ is constant across time, its temporal average is simply $\alpha_i$. When you subtract the mean from the equation, the math performs a miracle:
$$\alpha_i - \bar{\alpha}_i = \alpha_i - \alpha_i = 0$$
**The unobserved confounder subtracts from itself and vanishes completely!** You have successfully controlled for every time-invariant unobserved confounder in the universe—intelligence, genetics, geography, culture, historical legacy—without ever measuring, naming, or finding data for it.

This illuminates the fundamental distinction between prediction and causation. A predictive machine learning model uses cross-sectional variation to forecast: comparing Apple with a struggling local electronics shop, it observes that firms with higher R&D spend make higher profits. But predicting based on between-firm differences confounds R&D spending with Apple's brand prestige, elite management, and patent hoard! Econometrics asks a causal question: *"If a firm increases its own R&D budget this year, will its own profits rise?"* Fixed effects sweeps away the cross-sectional comparisons, isolating strictly the *within-entity* changes over time. However, this superpower carries an inescapable price: **any observed variable that does not change over time (such as birthplace, race, or school location) is also subtracted from itself and wiped out!**

في البيانات المقطعية العادية، نرصد كل فرد أو شركة أو دولة مرة واحدة فقط. وإذا ارتبطت سمة دائمة غير مرصودة—كالذكاء الفطري للشخص، أو الثقافة التأسيسية للشركة، أو جغرافية الدولة—بالمتغيرات المستقلة، يسقط انحدار OLS حتمًا في فخ انحياز المتغير المغفَل.

تتتبع **بيانات السلاسل المقطعية (بيانات البانل Panel Data)** الوحدات الاقتصادية الـ $N$ ذاتها عبر فترات زمنية متتالية ($t = 1, \dots, T$). يمنح هذا التكرار الزمني القياس الاقتصادي إحدى أقوى أدواته ومنهجياته على الإطلاق: **مقدر التحويل الداخلي للآثار الثابتة (Fixed Effects Within-Estimator)**.

كيف تعمل هذه المعجزة الإحصائية؟ بدلاً من مقارنة الفرد $A$ بالفرد $B$، يعمل نموذج الآثار الثابتة كمرآة تقارن **كل وحدة اقتصادية بمتوسط تاريخها الشخصي حصريًا**:
1. أولاً، نحسب المتوسط الزمني الخاص بكل فرد للمتغير التابع ($\bar{y}_i$) ولجميع المتغيرات المستقلة ($\bar{\mathbf{x}}_i$).
2. ثانيًا، نطرح المتوسط الزمني للفرد من كل مشاهدة من مشاهداته الزمنية:
   $$\ddot{y}_{it} = y_{it} - \bar{y}_i, \quad \ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$$

ما الذي يحدث للمتغير الخفي الثابت $\alpha_i$ أثناء هذا التحويل الداخلي (Within-Transformation)؟ نظرًا لأن $\alpha_i$ يمثل سمة ثابتة لا تتغير مع مرور الزمن، فإن متوسطه الزمني هو $\alpha_i$ نفسه. وعند طرح المتوسط من المعادلة، تحدث المعجزة الرياضية:
$$\alpha_i - \bar{\alpha}_i = \alpha_i - \alpha_i = 0$$
**يُطرح المتغير المشوش من نفسه ليتلاشى تمامًا كأنه لم يكن!** أنت بذلك تتحكم في كل عامل خفي وثابت في الكون—كالذكاء الفطري، والجينات، والموقع الجغرافي، والثقافة التأسيسية—دون الحاجة إلى قياسه أو حتى معرفة اسمه.

وهنا يتجلى الفرق الحاسم بين التنبؤ والسببية: يستخدم نموذج تعلم الآلة التنبؤي الفروق المقطعية بين الشركات؛ فيقارن شركة Apple بشركة ناشئة متعثرة ليتنبأ بأن الإنفاق على البحث والتطوير يجلب أرباحًا طائلة. لكن هذا التنبؤ يخلط بين ميزانية البحث والتطوير وبين اسم Apple التجاري وبراءات اختراعها وكفاءة إدارتها! أما القياس الاقتصادي فيطرح سؤالاً سببيًا صارمًا: *"لو زادت الشركة نفسها إنفاقها على البحث والتطوير هذا العام، فهل سترتفع أرباحها هي؟"* يمحو نموذج الآثار الثابتة الفروق بين الكيانات ويعزل التغيرات الزمنية داخل الكيان نفسه. ومع ذلك، فإن لهذه القوة ثمنًا لا مفر منه: **أي متغير مرصود لا يتغير عبر الزمن (كمكان الميلاد أو الأصل العرقي) يُطرح هو الآخر من نفسه ويُمحى كليًا من المعادلة!**

:::simulation-widget{engine="canvas2d" component="PanelFixedEffectsWithinLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The canonical unobserved effects panel data generating process across entities $i = 1, \dots, N$ and time periods $t = 1, \dots, T$ is:

$$
y_{it} = \mathbf{x}_{it}^T \boldsymbol{\beta} + \alpha_i + \varepsilon_{it}
$$

Where $\alpha_i$ is an individual-specific fixed effect that may be arbitrarily correlated with the regressors ($\mathbb{E}[\alpha_i \mid \mathbf{x}_{it}] \ne 0$).

### Algebraic Derivation of the Within-Transformation

Averaging across all $T$ time periods for entity $i$:

$$
\frac{1}{T}\sum_{t=1}^T y_{it} = \left(\frac{1}{T}\sum_{t=1}^T \mathbf{x}_{it}^T\right) \boldsymbol{\beta} + \frac{1}{T}\sum_{t=1}^T \alpha_i + \frac{1}{T}\sum_{t=1}^T \varepsilon_{it}
$$

Defining temporal averages $\bar{y}_i \equiv \frac{1}{T}\sum_{t=1}^T y_{it}$, $\bar{\mathbf{x}}_i \equiv \frac{1}{T}\sum_{t=1}^T \mathbf{x}_{it}$, and $\bar{\varepsilon}_i \equiv \frac{1}{T}\sum_{t=1}^T \varepsilon_{it}$:

$$
\bar{y}_i = \bar{\mathbf{x}}_i^T \boldsymbol{\beta} + \alpha_i + \bar{\varepsilon}_i
$$

Subtracting the mean equation from the time-varying equation:

$$
(y_{it} - \bar{y}_i) = (\mathbf{x}_{it} - \bar{\mathbf{x}}_i)^T \boldsymbol{\beta} + (\alpha_i - \alpha_i) + (\varepsilon_{it} - \bar{\varepsilon}_i)
$$

$$
\ddot{y}_{it} = \ddot{\mathbf{x}}_{it}^T \boldsymbol{\beta} + \ddot{\varepsilon}_{it}
$$

The unobserved entity effect $\alpha_i$ is algebraically eliminated because $\alpha_i - \alpha_i \equiv 0$.

### Matrix Geometry & The Demeaning Projection Matrix $\mathbf{Q}$

Let $\mathbf{D} = \mathbf{I}_N \otimes \boldsymbol{\iota}_T$ be the $NT \times N$ matrix of entity dummy variables. The Least Squares Dummy Variable (LSDV) estimator is identical to running OLS with $\mathbf{D}$.

By the Frisch-Waugh-Lovell theorem, demeaning is equivalent to pre-multiplying the data by the orthogonal projection matrix:

$$
\mathbf{Q} \equiv \mathbf{I}_{NT} - \mathbf{D}(\mathbf{D}^T \mathbf{D})^{-1}\mathbf{D}^T = \mathbf{I}_N \otimes \left( \mathbf{I}_T - \frac{1}{T}\boldsymbol{\iota}_T \boldsymbol{\iota}_T^T \right)
$$

The matrix $\mathbf{Q}$ is symmetric and idempotent ($\mathbf{Q}^T \mathbf{Q} = \mathbf{Q}$) with rank:

$$
\text{rank}(\mathbf{Q}) = \text{tr}(\mathbf{Q}) = NT - N = N(T - 1)
$$

The closed-form **Within Fixed Effects Estimator** is:

$$
\hat{\boldsymbol{\beta}}_{\text{FE}} = (\mathbf{X}^T \mathbf{Q} \mathbf{X})^{-1} \mathbf{X}^T \mathbf{Q} \mathbf{y} = \left( \sum_{i=1}^N \sum_{t=1}^T \ddot{\mathbf{x}}_{it} \ddot{\mathbf{x}}_{it}^T \right)^{-1} \sum_{i=1}^N \sum_{t=1}^T \ddot{\mathbf{x}}_{it} \ddot{y}_{it}
$$

### Correct Degrees-of-Freedom & Variance Estimation

Because $N$ individual fixed effects were estimated (or demeaned out), the residual degrees of freedom are $NT - N - K$:

$$
s_{\text{FE}}^2 = \frac{\sum_{i=1}^N \sum_{t=1}^T ( \ddot{y}_{it} - \ddot{\mathbf{x}}_{it}^T \hat{\boldsymbol{\beta}}_{\text{FE}} )^2}{NT - N - K}
$$

$$
\widehat{\mathbb{V}}(\hat{\boldsymbol{\beta}}_{\text{FE}}) = s_{\text{FE}}^2 \left( \sum_{i=1}^N \sum_{t=1}^T \ddot{\mathbf{x}}_{it} \ddot{\mathbf{x}}_{it}^T \right)^{-1}
$$

Entity intercepts can be recovered as:

$$
\hat{\alpha}_i = \bar{y}_i - \bar{\mathbf{x}}_i^T \hat{\boldsymbol{\beta}}_{\text{FE}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $y_{it}$: Observed outcome of entity $i$ at time period $t$.
* $\mathbf{x}_{it} \in \mathbb{R}^{K}$: Vector of strictly time-varying explanatory variables.
* $\alpha_i$: Entity fixed effect capturing all time-invariant unobserved heterogeneity (allowed to correlate arbitrarily with $\mathbf{x}_{it}$).
* $\varepsilon_{it}$: Idiosyncratic time-varying shock satisfying strict exogeneity $\mathbb{E}[\varepsilon_{it} \mid \mathbf{X}_i, \alpha_i] = 0$.
* $\ddot{y}_{it} = y_{it} - \bar{y}_i$: Demeaned outcome variable purged of entity time-averages.
* $\ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$: Demeaned regressor vector; if regressor $k$ is time-invariant ($x_{it, k} = x_{i, k}$ for all $t$), then $\ddot{x}_{it, k} = 0$, rendering the matrix non-invertible.
* $\mathbf{Q}$: The block-diagonal annihilator projection matrix that demeans panel data across time.

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
    
    # Initialize arrays for demeaned variables
    y_ddot = np.zeros_like(y, dtype=float)
    X_ddot = np.zeros_like(X, dtype=float)
    entity_means_y = {}
    entity_means_X = {}
    
    # Step 1: Compute entity-specific temporal averages and demean (within-transformation)
    for eid in unique_entities:
        mask = (entity_ids == eid)
        y_bar = np.mean(y[mask])
        X_bar = np.mean(X[mask], axis=0)
        
        entity_means_y[eid] = y_bar
        entity_means_X[eid] = X_bar
        
        y_ddot[mask] = y[mask] - y_bar
        X_ddot[mask] = X[mask] - X_bar
        
    # Step 2: Fit OLS on demeaned data: beta_fe = (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot
    XtX = X_ddot.T @ X_ddot
    Xty = X_ddot.T @ y_ddot
    beta_fe = np.linalg.solve(XtX, Xty)
    
    # Step 3: Back out entity-specific intercepts: alpha_i = y_bar_i - X_bar_i @ beta_fe
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

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
The very algebraic property that makes Fixed Effects so miraculous—that $\alpha_i - \bar{\alpha}_i = 0$—is also its greatest limitation. Any regressor that does not change over time for an individual unit satisfies $x_{it} = \bar{x}_i$ for all $t$. When the within-transformation demeans the regressor, $\ddot{x}_{it} = x_{it} - \bar{x}_i = 0$ for every single row in the dataset! A column of exact zeros has zero variance and is perfectly collinear with any constant, causing the cross-product matrix $\mathbf{X}^T \mathbf{Q} \mathbf{X}$ to become singular. Fixed Effects cannot estimate the return to time-invariant variables like birthplace, race, or year of birth.

**Why the distractors are incorrect:**
1. *The statistical package had a memory leak...*: Memory leaks cause system crashes or out-of-memory errors, not `NaN` or `Dropped due to collinearity`. Modern econometric packages use sparse matrices or de-meaning algorithms that handle millions of observations effortlessly.
2. *Rural birthplace has no causal relationship with earnings...*: Birthplace may have massive real-world impacts on earnings through school quality, health, or network capital; the failure to estimate it is a mathematical property of the Within-Estimator, not an economic reality.
3. *The student should have used first differences...*: First differencing $\Delta x_{it} = x_{it} - x_{i,t-1}$ also produces exact zeros for time-invariant variables ($x_{it} - x_{it} = 0$) and drops the regressor identically.

*الشرح باللغة العربية:*
الخاصية الجبرية الساحرة التي تجعل نموذج الآثار الثابتة قويًا للغاية—وهي أن $\alpha_i - \bar{\alpha}_i = 0$—هي نفسها قيده الأكبر. أي متغير لا يتغير عبر الزمن للشخص الواحد (كمكان الميلاد أو تاريخ الميلاد) يكون متطابقًا مع متوسطه الزمني ($x_{it} = \bar{x}_i$). عند إجراء التحويل الداخلي وطرح المتوسط، يتحول عمود مكان الميلاد بالكامل إلى أصفار مطلقة ($\ddot{x}_{it} = 0$)! وعمود الأصفار يمتلك تباينًا يساوي صفرًا، مما يخلق ارتباطًا خطيًا تامًا ويفسد قابلية المصفوفة للعكس. لا يمكن للآثار الثابتة أبدًا تقدير أثر المتغيرات الثابتة زمنيًا؛ وإذا كان هدف الباحث دراسة أثر مكان الميلاد، فيجب عليه استخدام نماذج أخرى مثل التأثيرات العشوائية (إذا تحققت فروضها) أو الأدوات المساعدة.
