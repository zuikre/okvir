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

### Intuition & Real-World Story

Suppose a policy researcher wants to answer a critical urban question: *does hiring more police officers reduce city crime rates?*

You collect data across 500 cities in a single year. You run a cross-sectional regression of crime on police officers per capita. To your horror, the regression produces a large, positive coefficient: cities with more police have *higher* crime rates! Does hiring police cause crime?

Of course not. Tourist capitals and bustling port cities (like New York or Miami) naturally have higher baseline crime due to high density, bustling nightlife, and transient tourist crowds. Because these cities have high baseline crime, their mayors hire more police officers. This unobserved, permanent city personality is an omitted confounder.

Now imagine you collect **Panel Data**: you follow the **same 500 cities over 10 consecutive years**.

Instead of comparing Miami to a quiet rural town, you compare **Miami in 2024 to Miami in 2020**! Miami's ocean geography, sunny climate, and cultural identity are permanent—they stay identical year after year. 

By subtracting each city's own 10-year average from its yearly data (the **Within Transformation**), every city acts as its own twin control! All permanent, unmeasured city traits ($\alpha_i$) vanish completely into thin air, leaving only the clean, year-over-year causal impact of police changes on crime changes.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Panel Data** | Longitudinal tracking: following the same subjects (people, firms, cities) repeatedly over time. |
| **Entity Fixed Effects ($\alpha_i$)** | Individual personality: unmeasured traits of an entity that never change over time. |
| **Within Transformation** | Demeaning: subtracting each entity's personal average over time to erase permanent traits. |
| **Between Variation** | Differences between different entities (comparing Miami to Des Moines). |
| **Within Variation** | Fluctuations inside the same entity over time (comparing Miami in 2024 to Miami in 2020). |

```text
    PANEL DATA WITHIN TRANSFORMATION:

    City Crime
      ^
      |      * Miami 2024 (Police hired, crime dropped relative to Miami mean!)
      |     /
      |    * Miami 2020 (Baseline Miami average: high crime, high police)
      |
      |          * Des Moines 2024
      |         /
      |        * Des Moines 2020 (Baseline Des Moines: low crime, low police)
      0------------------------------------------------------------------> Police Officers
       (Comparing across cities is confounded; comparing within cities is clean!)
```

### الحدس والقصة الواقعية

تخيل باحثًا في السياسات العامة يريد الإجابة عن سؤال أمني حاسم: *هل يؤدي توظيف مزيد من أفراد الشرطة إلى خفض معدلات الجريمة في المدن؟*

جمعت بيانات 500 مدينة في عام واحد، وأجريت انحدارًا لمعدل الجريمة على عدد أفراد الشرطة. وصدمتك النتيجة: المعامل موجب وقوي! أي أن المدن التي تضم عددًا أكبر من الشرطة تشهد جرائم أكثر! فهل زيادة الشرطة تسبب الجريمة؟!

بالتأكيد لا! فالمدن السياحية الكبرى والموانئ المكتظة (مثل نيويورك وميامي) لديها طبيعة جغرافية وسياحية واقتصادية تجعل معدل الجريمة فيها مرتفعًا بطبيعته، ولهذا السبب تحديدًا يعين عمدتها أعدادًا غفيرة من الشرطة. هذه السمات الثابتة الخاصة بكل مدينة تمثل متغيرًا مربكًا خفيًا.

الآن تخيل أنك جمعت **بيانات طولية (Panel Data)**: قمت بتتبع **نفس الـ 500 مدينة سنويًا لمدة 10 سنوات متتالية**.

بدلاً من مقارنة ميامي بقرية ريفية هادئة، ستقارن **ميامي في 2024 بميامي نفسها في 2020**! فجغرافية ميامي ومناخها وطبيعتها السكانية ثابتة لم تتغير.

وعندما تطرح متوسط كل مدينة الخاص عبر السنوات العشر من بياناتها السنوية (**تحويل الخصم الداخلي - Within Transformation**)، تتبخر كل هذه العوامل الدائمة ($\alpha_i$) في الهواء! وتصبح كل مدينة بمثابة شاهد وضابط لنفسها، مما يكشف الأثر الحقيقي لزيادة الشرطة.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **البيانات الطولية (Panel Data)** | تتبع السجلات لنفس الأفراد أو الشركات أو المدن عبر نقاط زمنية متعددة. |
| **الآثار الثابتة ($\alpha_i$)** | البصمة الدائمة: الخصائص الفردية غير المقاسة للكيان التي لا تتغير مع مرور الزمن. |
| **التحويل الداخلي (Within)** | تصفير المتوسط: طرح متوسط الكيان الشخصي لإبادة ومحو كافة سماته الدائمة. |
| **التباين بين الكيانات (Between)** | الفروق بين الكيانات المختلفة (مثل مقارنة مدينة ساحلية بمدينة زراعية). |
| **التباين داخل الكيان (Within)** | التغيرات التي تطرأ على الكيان ذاته من سنة لأخرى عبر الزمن. |

:::simulation-widget{engine="canvas2d" component="PanelFixedEffectsWithinLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The linear panel model with unobserved individual heterogeneity across entities $i = 1, \dots, N$ and time periods $t = 1, \dots, T$:

$$
y_{it} = \mathbf{x}_{it}^T \boldsymbol{\beta} + \alpha_i + \varepsilon_{it}
$$

where $\alpha_i$ is an unobserved time-invariant individual effect that may be arbitrarily correlated with regressors $\mathbf{x}_{it}$ ($\mathbb{E}[\alpha_i \mid \mathbf{x}_{it}] \ne 0$).

Compute the entity-specific time average:

$$
\bar{y}_i = \frac{1}{T} \sum_{t=1}^T y_{it} = \bar{\mathbf{x}}_i^T \boldsymbol{\beta} + \alpha_i + \bar{\varepsilon}_i
$$

Subtracting the entity mean from the original equation yields the **Within Transformation**:

$$
(y_{it} - \bar{y}_i) = (\mathbf{x}_{it} - \bar{\mathbf{x}}_i)^T \boldsymbol{\beta} + (\alpha_i - \alpha_i) + (\varepsilon_{it} - \bar{\varepsilon}_i)
$$

$$
\ddot{y}_{it} = \ddot{\mathbf{x}}_{it}^T \boldsymbol{\beta} + \ddot{\varepsilon}_{it}
$$

Because $\alpha_i - \alpha_i = 0$, the individual heterogeneity is completely wiped out!

### Why the Math Works Step-by-Step

1. **Why does Fixed Effects solve time-invariant confounding?**
   Any variable that does not change over time for entity $i$ (such as geography, DNA, or founding charter) has $x_{it} = \bar{x}_i \implies \ddot{x}_{it} = 0$. Because its demeaned value is zero, its confounding effect on $\boldsymbol{\beta}$ is destroyed.
2. **The Trade-Off: Time-Invariant Features Cannot Be Estimated:**
   Because any strictly time-invariant feature (like biological sex or birth state) becomes identical to zero after demeaning, Fixed Effects cannot estimate their coefficients.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\alpha_i$: Entity fixed effect (unobserved time-invariant heterogeneity).
* $\ddot{y}_{it} = y_{it} - \bar{y}_i$: Demeaned within-transformed outcome.
* $\ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$: Demeaned within-transformed regressors.
* $\hat{\boldsymbol{\beta}}_{\text{FE}} = (\ddot{\mathbf{X}}^T \ddot{\mathbf{X}})^{-1} \ddot{\mathbf{X}}^T \ddot{\mathbf{y}}$: Within Fixed Effects OLS estimator.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\alpha_i$ | الأثر الثابت للكيان | العوامل الفردية الدائمة التي قد ترتبط بالميزات وتسبب انحيازًا مربكًا. |
| $\ddot{y}_{it}$ | النتيجة الممركزة داخليًا | انحراف نتيجة الكيان في سنة معينة عن متوسطه التاريخي عبر السنوات. |
| $\ddot{\mathbf{x}}_{it}$ | الميزات الممركزة داخليًا | تذبذب الميزات من سنة لأخرى بعد إسقاط وحذف متوسطها التاريخي. |
| $\hat{\boldsymbol{\beta}}_{\text{FE}}$ | مقدر الآثار الثابتة | المقدر السببي النقي الذي يعتمد حصريًا على التغيرات الزمنية داخل الكيان. |

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

def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> np.ndarray:
    """
    Fits Panel Fixed Effects model using the Within (Demeaning) Transformation.

    Parameters
    ----------
    y : np.ndarray of shape (N*T,)
        Observed panel outcome.
    X : np.ndarray of shape (N*T, K)
        Panel regressors.
    entity_ids : np.ndarray of shape (N*T,)
        Integer or category identifiers for entities.

    Returns
    -------
    np.ndarray of shape (K,) : Estimated beta vector.
    """
    unique_entities = np.unique(entity_ids)
    y_demeaned = np.zeros_like(y, dtype=float)
    X_demeaned = np.zeros_like(X, dtype=float)

    # Step 1: Demean within each entity group
    for ent in unique_entities:
        mask = (entity_ids == ent)
        y_demeaned[mask] = y[mask] - np.mean(y[mask])
        X_demeaned[mask] = X[mask] - np.mean(X[mask], axis=0)

    # Step 2: Fit OLS on demeaned variables: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot
    beta = np.linalg.solve(X_demeaned.T @ X_demeaned, X_demeaned.T @ y_demeaned)

    return beta
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
