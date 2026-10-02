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

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

In supervised learning, our algorithms are guided by an all-knowing teacher who supplies pristine target labels $y_i$ for every training instance. But across massive frontiers of real-world industry—discovering customer purchasing personas, identifying novel biological cell types from single-cell RNA sequencing, compressing image palettes into compact color palettes, or detecting zero-day cybersecurity intrusions—labels simply do not exist. There is no teacher. The algorithm must explore an unmapped geometric landscape and discover organic, natural groupings purely from the spatial topology of the data itself.

The classic **K-Means algorithm** (formalized by Stuart Lloyd in 1957) approaches this challenge like **a municipal urban planner deciding where to construct $K$ emergency fire stations across a sprawling metropolis**:
1. **Initial Placement:** You drop $K$ tentative pins across the city map as temporary fire station locations.
2. **Voronoi Assignment:** Every household in the city is assigned to the nearest fire station, carving the urban landscape into a mosaic of geometric service districts known as a **Voronoi tessellation**.
3. **Centroid Relocation:** Each fire station is dismantled and physically rebuilt at the exact geographic center of gravity (the mathematical mean coordinate) of all the households assigned to its district.
4. **Iterative Equilibrium:** Because the stations have moved, the jurisdictional boundaries shift: some families are now closer to a different station. You repeat this assignment-and-relocation cycle until the system settles into a stable equilibrium and no station moves an inch.

However, Lloyd's original algorithm is crippled by a fatal vulnerability: **initialization luck**. The mathematical objective landscape (Within-Cluster Sum of Squares) is riddled with thousands of deceptive local valleys. If you drop the initial $K$ pins uniformly at random, pure bad luck might plant three fire stations in the exact same quiet residential suburb while leaving a vast, high-density industrial corridor completely uncovered. The algorithm will quickly freeze in a catastrophic local minimum, forever blinding the model to the true underlying structure.

David Arthur and Sergei Vassilvitskii (2007) resolved this pathology with the celebrated **K-Means++ algorithm**. Instead of naive uniform guessing, K-Means++ enforces **probabilistic spatial repulsion**. The first centroid is chosen at random. But every subsequent centroid is sampled with a probability strictly proportional to the square of its Euclidean distance from the nearest already-chosen centroid: $\mathbb{P}(\mathbf{x}) \propto D(\mathbf{x})^2$. Points huddled close to existing stations have virtually zero chance of selection, while remote, neglected frontiers are given overwhelming priority. This ingenious probabilistic spacing guarantees that initial centroids span the entire data manifold, providing a provable $O(\log K)$ mathematical competitive bound against the globally optimal clustering!

في التعلم الخاضع للإشراف (Supervised Learning)، تسير النماذج تحت إرشاد معلم يقدم تصنيفات مؤكدة $y_i$ لكل عينة. لكن في قطاعات صناعية وعلمية شاسعة—مثل اكتشاف الشرائح التسويقية للعملاء، أو تصنيف الخلايا الجينومية في أبحاث السرطان، أو ضغط ألوان الصور الرقمية، أو رصد الهجمات السيبرانية غير المسبوقة—تكون البيانات غير مصنفة إطلاقاً. لا يوجد معلم يرشد النموذج؛ بل يجب على الخوارزمية استكشاف الفضاء الهندسي بمفردها واكتشاف التجمعات الطبيعية المترابطة استناداً إلى تضاريس البيانات ذاتها.

تتعامل خوارزمية **K-Means الكلاسيكية** (التي صاغها ستيوارت لويد عام 1957) مع هذه المسألة كـ **مخطط مدن يسعى لبناء $K$ من مراكز الإطفاء في مدينة مترامية الأطراف لتقليل زمن الاستجابة للحالات الطارئة**:
1. **المواقع الأولية:** تضع الخوارزمية $K$ من الدبابيس المؤقتة على خريطة المدينة كمواقع مبدئية للمراكز.
2. **تفسيف فورونوي (Voronoi Assignment):** يُسند كل منزل في المدينة إلى مركز الإطفاء الأقرب إليه جغرافياً، مما يقسم المدينة إلى فسيفساء من المناطق الخدمية المتعامدة المعروفة بـ **خلايا فورونوي**.
3. **تحديث المركز (Centroid Relocation):** يُعاد نقل كل مركز إطفاء مادياً إلى مركز الثقل الجغرافي الدقيق (المتوسط الحسابي للإحداثيات) لجميع المنازل التي تولى خدمتها.
4. **الاتزان الحركي المستقر:** نظراً لتحرك المراكز، تتغير الحدود الخدمية تلقائياً؛ فتعيد المنازل الارتباط بالمراكز الأقرب إليها مجدداً. وتتكرر هذه الدورة المتناوبة حتى تستقر المراكز تماماً وتتوقف عن الحركة.

غير أن خوارزمية لويد التقليدية تعاني من نقطة ضعف قاتلة: **عشوائية البداية**. فدالة الهدف (مجموع مربعات المسافات داخل التجمعات) غير محدبة ومعقدة جداً. فإذا اخترت المواقع الأولية عشوائياً، فقد تسقط ثلاثة مراكز إطفاء في نفس الحي السكني الهادئ بالصدفة، بينما يُترك قطاع صناعي كامل دون أي تغطية! تقع الخوارزمية عندئذ في فخ قاع محلي رديء، لتخرج بمجموعات مشوهة لا تعكس الواقع.

عالج ديفيد آرثر وسيرجي فاسيليفتسكي (2007) هذه المعضلة بابتكار **K-Means++**. بدلاً من التخمين العشوائي الأعمى، تطبق K-Means++ **تباعداً احتمإلياً ذكياً**: يُختار المركز الأول عشوائياً، ثم يُختار كل مركز لاحق باحتمالية تتناسب طردياً مع مربع المسافة عن أقرب مركز قائم بالفعل: $\mathbb{P}(\mathbf{x}) \propto D(\mathbf{x})^2$. تصبح فرصة اختيار النقاط القريبة من المراكز القائمة شبه معدومة، بينما تحظى المناطق النائية غير الممثلة بأعلى احتمالية للاختيار. يضمن هذا التوزيع المتباعد استكشاف أرجاء فضاء البيانات بالكامل، ويحقق ضماناً رياضياً بحد تنافسي $O(\log K)$ مقارنة بالحل الأمثل العالمي!

:::simulation-widget{engine="canvas2d" component="KMeansVoronoi"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\mathcal{D} = \{\mathbf{x}_1, \dots, \mathbf{x}_N\} \subset \mathbb{R}^D$ be a collection of unlabelled feature vectors. Given an integer cluster count $K \ll N$, K-Means seeks a disjoint partition of sample indices $\mathcal{C} = \{C_1, \dots, C_K\}$ (with $\bigcup_{k=1}^K C_k = \{1, \dots, N\}$) and centroid vectors $\{\boldsymbol{\mu}_1, \dots, \boldsymbol{\mu}_K\} \subset \mathbb{R}^D$ that minimize the **Inertia** (Within-Cluster Sum of Squares - WCSS):

$$
J(\mathcal{C}, \boldsymbol{\mu}) = \sum_{k=1}^K \sum_{i \in C_k} \|\mathbf{x}_i - \boldsymbol{\mu}_k\|_2^2
$$

Because finding the global minimizer of $J$ over all possible partitions is NP-hard, Lloyd's algorithm executes alternating block coordinate descent across two steps:

### 1. The Voronoi Assignment Step
Holding centroids $\boldsymbol{\mu}_k$ fixed, minimize $J$ with respect to the cluster assignment set $\mathcal{C}$. Because individual point contributions are additive and decoupled, the optimal assignment rule assigns each point $\mathbf{x}_i$ to its nearest Euclidean centroid:

$$
C_k^{(t)} = \left\{ i : \|\mathbf{x}_i - \boldsymbol{\mu}_k^{(t)}\|_2 \le \|\mathbf{x}_i - \boldsymbol{\mu}_j^{(t)}\|_2 \quad \forall j \in \{1, \dots, K\} \right\}
$$

Ties are broken arbitrarily. This partitions $\mathbb{R}^D$ into convex Voronoi polyhedra.

### 2. The Centroid Update Step
Holding the cluster assignments $\mathcal{C}$ fixed, minimize $J$ with respect to centroid positions $\boldsymbol{\mu}_k$:

$$
\boldsymbol{\mu}_k^{(t+1)} = \arg\min_{\boldsymbol{\mu} \in \mathbb{R}^D} \sum_{i \in C_k^{(t)}} \|\mathbf{x}_i - \boldsymbol{\mu}\|_2^2
$$

Setting the vector gradient with respect to $\boldsymbol{\mu}$ to zero:

$$
\nabla_{\boldsymbol{\mu}} \sum_{i \in C_k^{(t)}} \|\mathbf{x}_i - \boldsymbol{\mu}\|_2^2 = -2 \sum_{i \in C_k^{(t)}} (\mathbf{x}_i - \boldsymbol{\mu}) = \mathbf{0} \implies \boldsymbol{\mu}_k^{(t+1)} = \frac{1}{|C_k^{(t)}|} \sum_{i \in C_k^{(t)}} \mathbf{x}_i
$$

The optimal centroid is precisely the empirical center of mass (sample arithmetic mean) of points inside that cluster.

### Convergence Guarantee
At each iteration $t$:
$$
J(\mathcal{C}^{(t+1)}, \boldsymbol{\mu}^{(t+1)}) \le J(\mathcal{C}^{(t+1)}, \boldsymbol{\mu}^{(t)}) \le J(\mathcal{C}^{(t)}, \boldsymbol{\mu}^{(t)})
$$
Because the objective $J$ decreases monotonically and the number of possible partitions is strictly finite ($K^N$), Lloyd's algorithm is mathematically guaranteed to terminate at a local minimum in a finite number of iterations.

### The K-Means++ Seeding Distribution
Let $\mathcal{M} = \{\boldsymbol{\mu}_1, \dots, \boldsymbol{\mu}_m\}$ denote the current set of already-chosen centroids ($1 \le m < K$). Define the shortest distance from sample $\mathbf{x}_i$ to any existing centroid:

$$
D(\mathbf{x}_i) \equiv \min_{\boldsymbol{\mu} \in \mathcal{M}} \|\mathbf{x}_i - \boldsymbol{\mu}\|_2
$$

The next centroid $\boldsymbol{\mu}_{m+1}$ is sampled from $\mathcal{D}$ according to the probability distribution:

$$
\mathbb{P}(\mathbf{x}_i \text{ is selected}) = \frac{D(\mathbf{x}_i)^2}{\sum_{j=1}^N D(\mathbf{x}_j)^2}
$$

Arthur and Vassilvitskii proved that this $D^2$-weighting guarantees an expected approximation ratio:

$$
\mathbb{E}[J_{\text{K-Means++}}] \le 8(\ln K + 2) J_{\text{Optimal}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $N$: Total number of unlabelled observations in the dataset.
* $D$: Dimensionality of the Cartesian feature space.
* $K$: User-specified number of distinct geometric clusters to discover.
* $\mathbf{x}_i \in \mathbb{R}^D$: Feature vector of observation $i$.
* $C_k \subset \{1, \dots, N\}$: Set of observation indices assigned to cluster $k$.
* $\boldsymbol{\mu}_k \in \mathbb{R}^D$: Geometric centroid vector (mean coordinates) of cluster $k$.
* $J(\mathcal{C}, \boldsymbol{\mu})$: Inertia (Within-Cluster Sum of Squares) objective function.
* $D(\mathbf{x}_i)$: Euclidean distance from sample $\mathbf{x}_i$ to the nearest already-selected centroid.
* $\mathbb{P}(\mathbf{x}_i)$: Probability distribution governing K-Means++ centroid initialization.
* $J_{\text{Optimal}}$: Theoretical minimum inertia achieved by the NP-hard global optimum.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a single iterative update step of Lloyd's K-Means clustering in NumPy. You will:
1. Compute the pairwise squared Euclidean distance matrix between all $N$ data points and all $K$ centroids using vectorized expansion: $\|\mathbf{x} - \boldsymbol{\mu}\|_2^2 = \|\mathbf{x}\|_2^2 + \|\boldsymbol{\mu}\|_2^2 - 2\mathbf{x}^T\boldsymbol{\mu}$.
2. Assign each data point to its nearest centroid index using `np.argmin`.
3. Recompute each centroid as the arithmetic mean of its assigned cluster points, with fallback handling for empty clusters.
4. Calculate the total within-cluster sum of squared errors (Inertia).

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
    
    # Step 1: Vectorized pairwise squared Euclidean distance matrix (N, K)
    # ||x - mu||^2 = ||x||^2 + ||mu||^2 - 2 * x^T mu
    x_sq = np.sum(X ** 2, axis=1, keepdims=True)            # (N, 1)
    c_sq = np.sum(centroids ** 2, axis=1, keepdims=True).T   # (1, K)
    cross = 2.0 * (X @ centroids.T)                          # (N, K)
    dists = x_sq + c_sq - cross
    dists = np.maximum(dists, 0.0)
    
    # Step 2: Voronoi assignment step
    labels = np.argmin(dists, axis=1)
    
    # Step 3: Centroid relocation step (center of mass)
    updated_centroids = np.zeros_like(centroids)
    total_inertia = 0.0
    
    for k in range(K):
        cluster_points = X[labels == k]
        if len(cluster_points) > 0:
            updated_centroids[k] = np.mean(cluster_points, axis=0)
            total_inertia += float(np.sum((cluster_points - updated_centroids[k]) ** 2))
        else:
            # Handle empty cluster: preserve existing location
            updated_centroids[k] = centroids[k]
            
    return labels, updated_centroids, float(total_inertia)
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A marketing analytics team at a financial institution runs K-Means clustering ($K=4$) to segment customers for a targeted credit card campaign. The dataset contains two numerical features:
1. `Annual Income` (measured in dollars, spanning $\$25,000$ to $\$250,000$, with variance $\sigma^2 \approx 10^9$).
2. `Recency Score` (days elapsed since last transaction, spanning $1$ to $30$ days, with variance $\sigma^2 \approx 80$).

When reviewing the resulting clusters, the lead strategist notices that the 4 clusters partition customers exclusively into horizontal income bands: Low Income, Lower-Middle, Upper-Middle, and Wealthy. The `Recency Score` has virtually zero influence on cluster boundaries.

**Diagnostic Question:** What fundamental geometric principle of K-Means clustering was violated, and how must the analytics pipeline be corrected?

* [x] K-Means relies on isotropic Euclidean distance, which treats a numerical unit change identically across all dimensions. Because the variance of income in dollars is over 7 orders of magnitude larger than recency in days, squared distance differences along the income axis ($\Delta^2 \approx 10,000^2 = 10^8$) completely overwhelm recency differences ($\Delta^2 \approx 15^2 = 225$), rendering recency geometrically invisible. The data must be standardized (e.g., via z-score normalization) prior to clustering so that all features share equal geometric scale.
  *تعتمد خوارزمية K-Means على المسافة الإقليدية التي تعامل وحدة التغير بالتساوي عبر كافة الأبعاد. وحيث إن تباين الدخل السنوي بالدولار أكبر بـ 7 مراتب أسية من تباين أيام الشراء، فإن الفروق التربيعية على محور الدخل ($\Delta^2 \approx 10,000^2 = 10^8$) تطغى كلياً على فروق حداثة الشراء ($\Delta^2 \approx 15^2 = 225$)، مما يلغي أثر متغير الحداثة تماماً. يجب معايرة البيانات (عبر تحويل z-score) قبل التجميع لتتشارك كافة المتغيرات في التأثير الهندسي بالتساوي.*
  > **Why this is correct:** Euclidean distance is scale-dependent. Without feature standardization, the feature with the largest numerical variance dictates the centroid locations and Voronoi partitioning, effectively turning a multivariate problem into a single-variable clustering task.
  > **لماذا هذا الخيار صحيح:** ترتبط المسافة الإقليدية بمقاييس الأرقام؛ وبدون توحيد المقاييس، يستحوذ المتغير ذو القيم العددية الضخمة على حساب المسافة ومواقع المراكز بالكامل، محولاً التحليل متعدد الأبعاد إلى تقسيم للمتغير الأكبر فقط.
* [ ] The team should increase $K$ from $4$ to $100$ clusters to force the algorithm to capture the recency score in smaller sub-clusters.
  *يجب على الفريق زيادة عدد المجموعات $K$ من 4 إلى 100 لإجبار الخوارزمية على التقاط حداثة الشراء في مجموعات فرعية أصغر.*
  > **Why this is incorrect:** Increasing $K$ would simply create 100 narrower income slices; it does not resolve the massive dimensional scale distortion.
  > **لماذا هذا الخيار خاطئ:** ستؤدي زيادة عدد المجموعات إلى تقطيع فئات الدخل لشرائح أدق فقط دون أن تحل معضلة التفاوت الهائل في المقاييس.
* [ ] K-Means requires features to be non-zero integers; dollar incomes should be converted into binary indicator variables.
  *تشترط خوارزمية K-Means أن تكون المتغيرات أعداداً صحيحة غير صفرية؛ ويجب تحويل الدخل إلى متغيرات ثنائية.*
  > **Why this is incorrect:** K-Means is natively defined on real-valued continuous Cartesian spaces; binarizing continuous variables destroys geometric distance continuity.
  > **لماذا هذا الخيار خاطئ:** صُممت K-Means خصيصاً للفضاءات الديكارتية المستمرة، وتحويل المتغيرات إلى قيم ثنائية يفقد المسافات معناها الهندسي.
* [ ] K-Means++ probabilistic initialization automatically adjusts feature scale imbalances during centroid seeding.
  *تقوم خوارزمية K-Means++ الذكية بضبط تفاوت المقاييس تلقائياً أثناء تهيئة مواقع المراكز.*
  > **Why this is incorrect:** K-Means++ uses the exact same unscaled Euclidean distance metric $D(\mathbf{x})^2$ during seeding; it does not normalize features.
  > **لماذا هذا الخيار خاطئ:** تعتمد K-Means++ على نفس مقياس المسافة الإقليدية غير المعاير في حساب احتمالات التباعد، ولا تعدل مقاييس المتغيرات تلقائياً.
