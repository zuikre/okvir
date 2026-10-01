---
id: "kmeans-clustering"
version: "1.0.0"
title: "K-Means++ Clustering & Voronoi Tessellations"
track: "econometrics"
module: "mod-33"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric", "multiple-regression-matrix-calculus"]
i18n:
  ar: "تجميع K-Means++ وتفسيف فورونوي"
---

# K-Means++ Clustering & Voronoi Tessellations

Supervised learning requires ground truth labels curated by humans. In many real-world domains—customer market segmentation, genomic haplotype discovery, image color quantization—labels do not exist. We must discover natural groupings purely from the geometric topology of the data itself.

The classic **K-Means** algorithm approaches this like **deciding where to build $K$ fire stations across a sprawling metropolitan city**:
1. You place $K$ fire stations at preliminary locations across the map.
2. Every household is assigned to its nearest fire station (forming a **Voronoi tessellation** of municipal response zones).
3. Each fire station is then physically relocated to the exact geographic center (mean coordinates) of all the households it was assigned to serve.
4. You repeat this assignment-relocation cycle until no station moves.

However, naive uniform random initialization frequently causes catastrophic failure: two stations may be randomly dropped in the exact same suburban neighborhood while leaving huge industrial districts completely uncovered. 

David Arthur and Sergei Vassilvitskii (2007) introduced **K-Means++**, which solves this via probabilistic spacing: the first centroid is chosen randomly, but every subsequent centroid is sampled with probability proportional to its squared Euclidean distance from the nearest already-chosen centroid ($D(\mathbf{x})^2$). This guarantees that initial centroids are widely dispersed across the data manifold, delivering an $O(\log K)$ competitive bound against the globally optimal clustering!

:::simulation-widget{engine="canvas2d" component="KMeansVoronoi"}
---
interactive: true
highlighted_metric: "loss"
---
:::

يتطلب التعلم الموجه تصنيفات مسبقة ومؤكدة يديرها خبراء بشريون. لكن في تطبيقات عملية شاسعة—مثل تقسيم شرائح العملاء التسويقية، واكتشاف الأنماط الجينية، وضغط ألوان الصور الرقمية—تكون البيانات غير مصنفة مسبقاً. هنا يجب استكشاف المجموعات الطبيعية استناداً إلى البنية الهندسية البحتة للبيانات.

تتعامل خوارزمية **K-Means** الكلاسيكية مع المسألة كـ **تحديد مواقع بناء $K$ من مراكز الإطفاء في مدينة مترامية الأطراف**:
1. نحدد $K$ من المواقع المبدئية لمراكز الإطفاء على الخريطة.
2. يُسند كل منزل إلى المركز الأقرب إليه جغرافياً (مما يشكل **تفسيف فورونوي Voronoi Tessellation** لمناطق الخدمة).
3. يُعاد نقل كل مركز إطفاء إلى المركز الجغرافي الحسابي الدقيق (المتوسط) لجميع المنازل التي تولى خدمتها.
4. تتكرر هذه الدورة حتى تستقر المراكز تماماً وتتوقف عن الحركة.

لكن البدء بمواقع عشوائية بسيطة يؤدي غالباً إلى نتائج كارثية؛ كأن يسقط مركزان في نفس الحي بينما يُترك نصف المدينة دون تغطية. قدم ديفيد آرثر وسيرجي فاسيليفتسكي (2007) خوارزمية **K-Means++** الذكية: حيث يُختار المركز الأول عشوائياً، ثم يُختار كل مركز لاحق باحتمالية تتناسب طردياً مع مربع المسافة عن أقرب مركز قائم ($D(\mathbf{x})^2$). يضمن هذا التوزيع المتباعد استكشاف الفضاء بالكامل، ويحقق حداً تنافسياً رياضياً $O(\log K)$ مقارنة بالحل الأمثل العالمي!

### Mathematical Foundations

#### The Within-Cluster Sum of Squares (Inertia Objective)
Given a dataset $\{\mathbf{x}_1, \dots, \mathbf{x}_N\} \subset \mathbb{R}^D$ and a target number of clusters $K$, K-Means seeks a partition $C = \{C_1, \dots, C_K\}$ and centroid vectors $\{\boldsymbol{\mu}_1, \dots, \boldsymbol{\mu}_K\}$ that minimize the **Inertia** (Within-Cluster Sum of Squares - WCSS):

$$
J(C, \boldsymbol{\mu}) = \sum_{k=1}^K \sum_{\mathbf{x}_i \in C_k} \|\mathbf{x}_i - \boldsymbol{\mu}_k\|_2^2
$$

#### Lloyd's Alternating Minimization Algorithm
Because finding the global minimum of $J$ is NP-hard, Lloyd's algorithm executes block coordinate descent:

1. **Assignment Step (Minimizing $J$ with respect to $C$ while holding $\boldsymbol{\mu}$ fixed):**
   $$C_k^{(t)} = \left\{ \mathbf{x}_i : \|\mathbf{x}_i - \boldsymbol{\mu}_k^{(t)}\|_2 \le \|\mathbf{x}_i - \boldsymbol{\mu}_j^{(t)}\|_2 \quad \forall j \in \{1, \dots, K\} \right\}$$

2. **Centroid Update Step (Minimizing $J$ with respect to $\boldsymbol{\mu}$ while holding $C$ fixed):**
   $$\boldsymbol{\mu}_k^{(t+1)} = \arg\min_{\boldsymbol{\mu}} \sum_{\mathbf{x}_i \in C_k^{(t)}} \|\mathbf{x}_i - \boldsymbol{\mu}\|_2^2 = \frac{1}{|C_k^{(t)}|} \sum_{\mathbf{x}_i \in C_k^{(t)}} \mathbf{x}_i$$

Because both steps strictly decrease or maintain $J(C, \boldsymbol{\mu})$ and the number of partitions is finite, Lloyd's algorithm is guaranteed to converge to a local minimum in a finite number of steps.

#### K-Means++ Seeding Probability Distribution
Let $D(\mathbf{x}) = \min_{j} \|\mathbf{x} - \boldsymbol{\mu}_j\|_2$ denote the Euclidean distance from sample $\mathbf{x}$ to the closest already-selected centroid. The next centroid is sampled according to the discrete probability distribution:

$$
\mathbb{P}(\mathbf{x}_i \text{ is chosen}) = \frac{D(\mathbf{x}_i)^2}{\sum_{j=1}^N D(\mathbf{x}_j)^2}
$$

Arthur and Vassilvitskii (2007) proved that this randomized seeding guarantees:

$$
\mathbb{E}[J_{\text{K-Means++}}] \le 8(\ln K + 2) J_{\text{Optimal}}
$$

يضمن توزيع احتمالات K-Means++ الموزون بمربع المسافات تجنب الوقوع في القيعان المحلية الرديئة؛ حيث يعاقب النقاط القريبة من المراكز القائمة ويكافئ استكشاف المناطق النائية غير الممثلة في البيانات.

:::python-challenge{id="py-kmeans-clustering"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[0.0, 0.0], [0.0, 1.0], [10.0, 10.0], [10.0, 11.0]]); c = np.array([[0.0, 0.0], [10.0, 10.0]]); labels, new_c, inertia = kmeans_step(X, c); f\"{inertia:.2f}, {new_c[0, 1]:.2f}\""
    expected: "1.00, 0.50"
  - input: "X = np.array([[1.0, 2.0], [1.0, 4.0]]); c = np.array([[1.0, 0.0]]); labels, new_c, inertia = kmeans_step(X, c); f\"{new_c[0, 1]:.1f}\""
    expected: "3.0"
---
```python
import numpy as np

def kmeans_step(
    X: np.ndarray,
    centroids: np.ndarray
) -> tuple[np.ndarray, np.ndarray, float]:
    """
    Executes a single step of Lloyd's K-Means algorithm:
    1. Assign samples to nearest centroid via vectorized Euclidean distance.
    2. Recompute centroids as cluster sample means.
    3. Compute total inertia (WCSS).
    
    Parameters
    ----------
    X : np.ndarray of shape (N, D)
        Input data points.
    centroids : np.ndarray of shape (K, D)
        Current centroid positions.
        
    Returns
    -------
    tuple of (labels, updated_centroids, inertia):
        labels : np.ndarray of shape (N,) cluster indices in {0, ..., K-1}
        updated_centroids : np.ndarray of shape (K, D)
        inertia : float total within-cluster sum of squared distances
    """
    N, D = X.shape
    K = centroids.shape[0]
    
    # 1. Vectorized pairwise squared Euclidean distance: (N, K)
    # ||x - mu||^2 = ||x||^2 + ||mu||^2 - 2 * x^T mu
    x_sq = np.sum(X ** 2, axis=1, keepdims=True)            # (N, 1)
    c_sq = np.sum(centroids ** 2, axis=1, keepdims=True).T   # (1, K)
    cross = 2.0 * (X @ centroids.T)                          # (N, K)
    dists = x_sq + c_sq - cross
    dists = np.maximum(dists, 0.0)
    
    # 2. Assignment Step: argmin across centroids
    labels = np.argmin(dists, axis=1)
    
    # 3. Update Step: compute new means
    updated_centroids = np.zeros_like(centroids)
    total_inertia = 0.0
    
    for k in range(K):
        cluster_points = X[labels == k]
        if len(cluster_points) > 0:
            updated_centroids[k] = np.mean(cluster_points, axis=0)
            total_inertia += float(np.sum((cluster_points - updated_centroids[k]) ** 2))
        else:
            # Handle empty cluster: preserve previous position
            updated_centroids[k] = centroids[k]
            
    return labels, updated_centroids, float(total_inertia)
```
:::

### Practical ML Transfer Challenge

#### Scenario: The Unscaled Features Failure in Customer Segmentation
A marketing analytics department clusters customer accounts to create personalized marketing tiers. The input dataset contains two primary numerical features:
1. `Annual Income` (measured in dollars, spanning $\$25,000$ to $\$250,000$, with variance $\sigma^2 \approx 10^9$).
2. `Recency Score` (days since last purchase, spanning $1$ to $30$, with variance $\sigma^2 \approx 80$).

When fitting K-Means with $K=4$, the resulting clusters divide the customer base purely into horizontal salary bands: Low Income, Mid Income, Upper Mid, and High Income. The `Recency Score` has essentially zero influence on cluster boundaries.

**Diagnostic Question:** What fundamental modeling requirement was violated, and what is the remediation?

- **Option A (Correct):** K-Means relies on isotropic Euclidean distance. Because the numerical variance of raw dollar incomes is 8 orders of magnitude larger than recency days, distances along the income axis completely dominate the objective function, rendering recency geometrically invisible. The data must be standardized (e.g., via z-score normalization) before clustering so that all features exert equal geometric leverage.
- **Option B:** The team should increase $K$ to 100 to force smaller clusters to capture recency.
- **Option C:** K-Means requires features to be non-zero integers; dollar incomes should be converted to binary indicators.
- **Option D:** K-Means++ initialization mathematically fixes feature scaling issues automatically.
