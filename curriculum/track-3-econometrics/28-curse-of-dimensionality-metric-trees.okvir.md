---
id: "curse-of-dimensionality-metric-trees"
version: "1.0.0"
title: "CART Algorithm, Impurity Measures & Cost-Complexity Pruning"
track: "econometrics"
module: "mod-31"
estimated_minutes: 15
prerequisites: ["knn-classification"]
i18n:
  ar: "خوارزمية CART ومقاييس الشوائب والتشذيب بتكلفة التعقيد"
---

# CART Algorithm, Impurity Measures & Cost-Complexity Pruning

Classification and Regression Trees (CART), developed by Breiman, Friedman, Olshen, and Stone (1984), break away from linear hyperplanes by partitioning feature space into recursive, axis-aligned rectangular boxes. At each internal node, the algorithm greedily searches across all features and all possible split thresholds to maximize the reduction in node impurity (Gini impurity or Shannon entropy for classification; variance for regression).

An unconstrained tree grows until every single training point is isolated in its own leaf, achieving zero training error while suffering catastrophic ov

:::simulation-widget{engine="canvas2d" component="DecisionTreeLaser"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
H(R_m) = \sum_{k=1}^K p_{mk} (1 - p_{mk}) = 1 - \sum_{k=1}^K p_{mk}^2
$$

تمثل أشجار التصنيف والانحدار (CART)، التي طورها برايمن وزملاؤه (1984)، قطيعة مع المستويات الفائقة الخطية من خلال تقسيم فضاء المتغيرات إلى مستطيلات متداخلة موازية للمحاور. وفي كل عقدة داخلية، تبحث الخوارزمية بنهم (Greedy Search) عبر كافة المتغيرات والعتبات الممكنة لتعظيم انخفاض شوائب العقدة (شوائب جيني Gini Impurity أو إنتروبيا شانون في التصنيف؛ وتخفيض التباين في الانحدار).

تستمر الشجرة غير المقيدة في النمو حتى تنعزل كل نقطة بيانات بمفردها في ورقة، محققة خطأ تدريب صفريًا لكن مع إفراط كارثي في التوفيق (تذبذب وتباين عالي). يعالج التشذيب بتكلفة التعقيد الأدنى ($R_\alpha(T) = R(T) + \alpha |T|$) ذ

:::python-challenge{id="py-curse-of-dimensionality-metric-trees"}
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

def find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:
    """
    Finds the optimal threshold t* minimizing weighted Gini impurity.
    """
    # TODO: Sort x and y, test midpoints between adjacent distinct values, compute split Gini
    pass
```
:::
