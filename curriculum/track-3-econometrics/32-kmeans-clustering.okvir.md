---
id: "kmeans-clustering"
version: "1.0.0"
title: "K-Means++ Clustering & Principal Component Analysis (PCA)"
track: "econometrics"
module: "mod-34"
estimated_minutes: 15
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "تجميع K-Means++ وتحليل المكونات الرئيسية PCA"
---

# K-Means++ Clustering & Principal Component Analysis (PCA)

Unsupervised learning extracts latent geometric structures from unlabeled data $\mathbf{X} \in \mathbb{R}^{N \times P}$. The two cornerstones of classical unsupervised learning are partition-based clustering (K-Means) and linear dimensionality reduction (Principal Component Analysis - PCA).

Standard K-Means (Lloyd's algorithm) minimizes within-cluster sum of squares, but suffers from severe sensitivity to random initial centroid placement, frequently trapping the algorithm in catastrophic local minima. Arthur and Vassilvitskii (2007) solved this with K-Means++, introducing $D^2$-sampling

:::simulation-widget{engine="canvas2d" component="PCAEigenProjectionLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
D(\mathbf{x}_i) = \min_{j \in \{1, \dots, m\}} \|\mathbf{x}_i - \mathbf{c}_j\|_2
$$

يستخرج التعلم غير الخاضع للإشراف (Unsupervised Learning) الأنماط والهياكل الهندسية الكامنة في البيانات $\mathbf{X} \in \mathbb{R}^{N \times P}$. ويُعد التجميع العنقودي (K-Means) وتقليص الأبعاد الخطي (PCA) الركيزتين الكلاسيكيتين لهذا المجال.

تعمل خوارزمية K-Means (Lloyd) على تقليل مجموع المربعات داخل كل عنقود، لكنها شديدة الحساسية للمراكز الابتدائية العشوائية، مما يحبسها غالبًا في نهايات صغرى محلية كارثية. قدّم آرثر وفاسيلفيتسكي (2007) خوارزمية K-Means++ التي تختار المراكز الابتدائية عبر توزيع احتمالي يتناسب مع مربع المسافة $D^2$، مما يضمن نظريًا دقة تقريبية في حدود $O(\log k)$ للحل الأمثل

:::python-challenge{id="py-kmeans-clustering"}
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

def fit_pca_svd(X: np.ndarray, n_components: int) -> dict[str, np.ndarray]:
    """
    Fits PCA via SVD on centered data, computing projections and explained variance ratios.
    """
    # TODO: Mean-center X, compute SVD, project data, and calculate variance ratios
    pass
```
:::
