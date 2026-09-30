---
id: "pca-dimensionality-reduction"
version: "1.0.0"
title: "Non-Linear Manifold Learning: t-SNE & UMAP"
track: "econometrics"
module: "mod-34"
estimated_minutes: 15
prerequisites: ["kmeans-clustering", "symmetric-matrices-spectral"]
i18n:
  ar: "تعلم المتشعبات غير الخطية وخوارزميات t-SNE و UMAP"
---

# Non-Linear Manifold Learning: t-SNE & UMAP

While PCA is limited to linear orthogonal projections, real-world high-dimensional data (single-cell RNA sequencing, deep neural network embeddings, image pixel manifolds) resides on curved, non-linear sub-manifolds. Linear projections inevitably collapse distant parts of the manifold on top of each other.

Laurens van der Maaten and Geoffrey Hinton (2008) introduced t-SNE (t-Distributed Stochastic Neighbor Embedding). t-SNE converts high-dimensional Euclidean distances into conditional Gaussian probabilities, and models low-dimensional distances using a heavy-tailed Student-t distribution

:::simulation-widget{engine="canvas2d" component="ManifoldUMAPtSNELab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
p_{j \mid i} = \frac{\exp(-\|\mathbf{x}_i - \mathbf{x}_j\|_2^2 / 2\sigma_i^2)}{\sum_{k \ne i}\exp(-\|\mathbf{x}_i - \mathbf{x}_k\|_2^2 / 2\sigma_i^2)}, \quad p_{ij} = \frac{p_{j \mid i} + p_{i \mid j}}{2N}
$$

بينما يقتصر PCA على الإسقاطات الخطية المتعامدة، فإن البيانات الواقعية عالية الأبعاد (تسلسل الحمض النووي للخلايا الفردية، تضمينات الشبكات العصبية العميقة، بكسلات الصور) تقع على متشعبات غير خطية منحنية. تؤدي الإسقاطات الخطية حتمًا إلى طي وسحق أجزاء متباعدة من المتشعب فوق بعضها البعض.

ابتكر لورنز فان در ماتن وجيفري هينتون (2008) خوارزمية t-SNE. تحول t-SNE المسافات الإقليدية عالية الأبعاد إلى احتمالات غاوسية شرطية، وتمثل المسافات منخفضة الأبعاد بتوزيع ستيودنت ذي الذيول الثقيلة بدرجة حرية واحدة (توزيع كوشي). تحل هذه الذيول الثقيلة معضلة التكدس (Crowding Problem) جذريًا، مفسحة المجال للعناق

:::python-challenge{id="py-pca-dimensionality-reduction"}
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

def compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:
    """
    Computes t-SNE high-dimensional affinities P_ij using binary search for Gaussian variances.
    """
    # TODO: Compute pairwise distances, binary search for beta_i to match target entropy, and symmetrize
    pass
```
:::
