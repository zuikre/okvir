---
id: "synthetic-control-method"
version: "1.0.0"
title: "The Synthetic Control Method (Abadie et al.)"
track: "econometrics"
module: "mod-28"
estimated_minutes: 15
prerequisites: ["difference-in-differences-2x2", "multiple-regression-matrix-calculus"]
i18n:
  ar: "طريقة التحكم الاصطناعي لأباديه وزملائه"
---

# The Synthetic Control Method (Abadie et al.)

In comparative case studies, researchers frequently evaluate policies implemented in a SINGLE aggregate unit (e.g. California's Proposition 99 tobacco tax, German reunification in 1990, or the Basque country terrorism). Finding a single unaffected region that mirrors the treated unit's exact trajectory is practically impossible.

Alberto Abadie and coauthors introduced the Synthetic Control Method (SCM), hailed by Susan Athey as 'the most important innovation in policy evaluation literature in the last 15 years.' SCM constructs a data-driven convex combination of unaffected 'donor' units.

:::simulation-widget{engine="canvas2d" component="SyntheticControlDonorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\min_{\mathbf{W}} \|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}\|_{\mathbf{V}} = \sqrt{(\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})^T \mathbf{V} (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})}
$$

في دراسات الحالات المقارنة، غالبًا ما يواجه الباحثون سياسات طُبقت في وحدة جغرافية كلية واحدة (مثل ضريبة التبغ في كاليفورنيا عام 1988، أو إعادة توحيد ألمانيا عام 1990، أو إقليم الباسك). ومن المستحيل عمليًا العثور على ولاية أو دولة منفردة تشبه مسار الوحدة المعالجة تمامًا.

ابتكر ألبرتو أباديه (Abadie et al.) طريقة التحكم الاصطناعي (Synthetic Control Method - SCM)، والتي وصفتها سوزان أثي بأنها 'أهم ابتكار منهجي في تقييم السياسات خلال الـ 15 عامًا الماضية'. تقوم الطريقة على بناء تركيبة خطية محدبة (Convex Combination) من وحدات مانحة غير متأثرة بالسياسة. عبر حل مسألة استمثال مقيدة، تحسب الطريقة

:::python-challenge{id="py-synthetic-control-method"}
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

def fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:
    """
    Computes optimal donor weights for Synthetic Control via simplex projection.
    """
    # TODO: Optimize w over the unit simplex to minimize pre-treatment L2 error
    pass
```
:::
