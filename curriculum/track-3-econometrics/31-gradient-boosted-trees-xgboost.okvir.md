---
id: "gradient-boosted-trees-xgboost"
version: "1.0.0"
title: "LightGBM Architecture: Histogram Bins, GOSS & EFB"
track: "econometrics"
module: "mod-33"
estimated_minutes: 15
prerequisites: ["random-forests-bagging", "taylor-series-polynomial"]
i18n:
  ar: "معمارية LightGBM والمدرجات التكرارية وعينات GOSS وحزم EFB"
---

# LightGBM Architecture: Histogram Bins, GOSS & EFB

As datasets scaled to tens of millions of rows and thousands of sparse features, standard XGBoost encountered severe computational bottlenecks: sorting continuous feature values at every node required $O(N \times P \times \log N)$ operations and consumed massive memory bandwidth. Ke et al. (Microsoft Research, 2017) created LightGBM to solve large-scale efficiency through three algorithmic innovations.

1. Histogram-Based Binning: Continuous features are bucketed into discrete integer bins (typically 256 bins), cutting split search complexity to $O(K \times P)$ and enabling subtraction

:::simulation-widget{engine="canvas2d" component="XGBoostHessianGainLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\tilde{V}_j(d) = \frac{1}{N} \left[ \frac{\left( \sum_{x_i \in A_L} g_i + \frac{1-a}{b}\sum_{x_i \in B_L} g_i \right)^2}{N_L^j(d)} + \frac{\left( \sum_{x_i \in A_R} g_i + \frac{1-a}{b}\sum_{x_i \in B_R} g_i \right)^2}{N_R^j(d)} \right]
$$

مع تضخم البيانات لتصل إلى عشرات الملايين من الصفوف وآلاف المتغيرات المتفرقة، واجه XGBoost اختناقات حسابية؛ إذ تتطلب فرز القيم المستمرة في كل عقدة تعقيدًا مقداره $O(N \times P \times \log N)$ واستهلاكًا هائلاً للذاكرة. ابتكر باحثو مايكروسوفت (Ke et al., 2017) خوارزمية LightGBM متجاوزين تلك العقبات عبر ثلاث ثورات خوارزمية:

1. المدرجات التكرارية (Histogram Binning): تجميع القيم المستمرة في 256 سلة منفصلة، مما يقلص تعقيد البحث إلى $O(K \times P)$ ويتيح خدعة الطرح الفوري لمدرج العقدة اليمنى من الأب واليسرى.
2. عينات التدرج أحادية الجانب (GOSS): الاحتفاظ بكافة المشاهدات ذات التدرج الكبي

:::python-challenge{id="py-gradient-boosted-trees-xgboost"}
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

def compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:
    """
    Computes XGBoost second-order optimal leaf weights and split gain.
    """
    # TODO: Aggregate G and H for left and right nodes, compute weights and split gain
    pass
```
:::
