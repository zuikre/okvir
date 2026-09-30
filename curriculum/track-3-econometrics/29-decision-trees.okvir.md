---
id: "decision-trees"
version: "1.0.0"
title: "Bagging & Random Forests (Feature Subspace Sampling & OOB Error)"
track: "econometrics"
module: "mod-32"
estimated_minutes: 15
prerequisites: ["curse-of-dimensionality-metric-trees", "sorting-divide-and-conquer"]
i18n:
  ar: "التجميع المتزامن والغابات العشوائية وعينات الفضاء الجزئي وخطأ OOB"
---

# Bagging & Random Forests (Feature Subspace Sampling & OOB Error)

Single decision trees are notoriously high-variance estimators: a tiny perturbation in the training sample can trigger a completely different root split, altering the entire downstream tree architecture. Leo Breiman (2001) solved this by creating Random Forests, combining Bootstrap Aggregating (Bagging) with Random Feature Subspace Sampling.

The mathematical core of Random Forests is variance reduction through de-correlation. Averaging $B$ identically distributed trees with individual variance $\sigma^2$ and pairwise correlation $\rho$ yields ensemble variance: $\rho \sigma^2 + \frac{1 -

:::simulation-widget{engine="canvas2d" component="RandomForestEnsembleLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbb{V}(\bar{T}) = \frac{1}{B^2} \sum_{b=1}^B \mathbb{V}(T_b) + \frac{1}{B^2} \sum_{b \ne b'} \text{Cov}(T_b, T_{b'})
$$

تعاني شجرة القرار المنفردة من تباين عالٍ جدًا: فتغير طفيف في عينة التدريب كفيل بتغيير جذر الشجرة بالكامل مما يقلب هيكل القرارات رأسًا على عقب. قدّم ليو برايمن (Breiman, 2001) الحل العبقري عبر الغابات العشوائية (Random Forests)، دامِجًا بين التجميع بالتمهيد (Bagging) وعينات الفضاء الجزئي للمتغيرات.

يرتكز جوهر الغابات العشوائية رياضيًا على تخفيض التباين عبر فك الارتباط بين الأشجار. إن تجميع $B$ من الأشجار المتطابقة توزيعيًا بتباين $\sigma^2$ وارتباط ثنائي $\rho$ ينتج عنه تباين إجمالي للمنظومة: $\rho \sigma^2 + \frac{1 - \rho}{B} \sigma^2$. وفي حين يخفض التجميع المعتاد الحد $\frac{1}{B}$، فإ

:::python-challenge{id="py-decision-trees"}
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

def compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:
    """
    Computes Random Forest Out-of-Bag (OOB) classification accuracy.
    """
    # TODO: For each sample i, aggregate votes from all trees where i was OOB and take majority vote
    pass
```
:::
