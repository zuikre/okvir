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

Panel (longitudinal) datasets track the same $N$ economic entities (individuals, firms, countries) over $T$ time periods. The fundamental econometric virtue of panel data is its ability to control for unobserved, time-invariant heterogeneity (e.g. innate ability, corporate culture, geographic destiny) that would otherwise cause severe omitted variable bias.

The Fixed Effects (FE) within-estimator achieves this without ever measuring the unobserved confounder $\alpha_i$. By subtracting the entity-specific time mean from each variable (the 'within-transformation'), the time-invariant $\alph

:::simulation-widget{engine="canvas2d" component="PanelFixedEffectsWithinLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
y_{it} = \mathbf{x}_{it}^T \boldsymbol{\beta} + \alpha_i + \varepsilon_{it}
$$

تتتبع بيانات البانل (Panel Data) الوحدات الاقتصادية ذاتها (أفراد، شركات، دول) عبر $T$ من الفترات الزمنية. وتكمن الميزة القياسية الجوهرية لبيانات البانل في قدرتها على التخلص التام من عدم التجانس الفردي الثابت مع الزمن (مثل الذكاء الفطري، ثقافة الشركة، الموقع الجغرافي) الذي يسبب انحياز المتغير المغفَل في البيانات المقطعية.

يحقق مقدر الآثار الثابتة (Fixed Effects) ذلك بعبقرية دون الحاجة لقياس المتغير الغائب $\alpha_i$. من خلال طرح المتوسط الزمني الخاص بكل فرد من متغيراته (التحويل الداخلي Within-Transformation)، يُطرح الثابت $\alpha_i$ من نفسه ليتلاشى تمامًا من المعادلة! رياضيًا، هذا يكافئ إض

:::python-challenge{id="py-panel-data-fixed-effects"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import numpy as np

def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:
    """
    Fits a panel fixed-effects regression via the Within-Transformation.
    """
    # TODO: Demean y and X by entity, solve for beta_fe, and back out entity alphas
    pass
```
:::
