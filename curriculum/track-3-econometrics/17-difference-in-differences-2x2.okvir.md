---
id: "difference-in-differences-2x2"
version: "1.0.0"
title: "Canonical 2x2 Difference-in-Differences & Parallel Trends"
track: "econometrics"
module: "mod-26"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding", "panel-data-fixed-effects"]
i18n:
  ar: "الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي"
---

# Canonical 2x2 Difference-in-Differences & Parallel Trends

Difference-in-Differences (DiD) is the workhorse quasi-experimental design of modern empirical economics. Card and Krueger (1994) popularized the method by analyzing New Jersey's minimum wage increase compared to neighboring Pennsylvania fast-food restaurants. DiD overcomes the flaws of simple before-and-after studies and simple cross-sectional comparisons by subtracting the pre-existing baseline trend of a control group from the post-treatment change of the treated group.

The entire identification rests upon the unobservable Parallel Trends Assumption: in the absence of treatment, the av

:::simulation-widget{engine="canvas2d" component="DiDParallelTrendsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\bar{Y}_{g, t} \equiv \mathbb{E}[Y_{it} \mid G_i = g, T_t = t]
$$

يُعد أسلوب 'الفرق في الفروق' (Difference-in-Differences - DiD) العمود الفقري للتجارب شبه الطبيعية في الاقتصاد التطبيقي. اشتهرت الطريقة في دراسة كارد وكروغر (Card & Krueger, 1994) للأثر التوظيفي لرفع الحد الأدنى للأجور في نيوجيرسي مقارنة بولاية بنسلفانيا المجاورة. يتجاوز DiD عيوب المقارنات الزمنية البسيطة والمقارنات المقطعية من خلال طرح المسار الزمني للمجموعة الضابطة من التغير الحادث في المجموعة المعالجة.

يرتكز التعريف السببي بالكامل على فرضية مسار التوازي (Parallel Trends Assumption) غير القابلة للاختبار المباشر: وهي أنه لولا المعالجة، لكان مسار تطور المجموعة المعالجة قد تطابق تمامًا وبشك

:::python-challenge{id="py-difference-in-differences-2x2"}
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

def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:
    """
    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.
    """
    # TODO: Compute 4 cell means, DiD, interaction regression, and counterfactual
    pass
```
:::
