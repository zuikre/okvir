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

### Intuition & Real-World Story

In supervised learning, an all-knowing teacher provides clean ground-truth labels $y_i$ for every training instance.
But across huge frontiers of real-world business and science—discovering customer purchasing personas, identifying novel cell types in single-cell cancer genomics, compressing digital color palettes, or catching zero-day cyberattacks—**labels do not exist**.
There is no teacher. The algorithm must explore an uncharted geometric space and discover organic clusters entirely on its own.

The classic **K-Means algorithm** (Stuart Lloyd, 1957) solves this challenge like **a city planner deciding where to build $K$ emergency fire stations across a sprawling metropolis**:
1. **Initial Guess:** You drop $K$ tentative pins across the city map as temporary fire station locations.
2. **Jurisdiction (Voronoi) Assignment:** Every household in the city is assigned to the nearest fire station, carving the map into geometric service zones known as a **Voronoi tessellation**.
3. **Centroid Relocation:** Each fire station is dismantled and physically rebuilt at the exact geographic center of gravity (the average coordinates) of all the homes it serves.
4. **Iterative Equilibrium:** Because the stations moved, some families are now closer to a different station! You repeat the assignment and relocation steps until nobody changes stations and the system freezes into a stable equilibrium.

However, Lloyd's original algorithm had an Achilles' heel: **bad initialization luck**.
The error surface (Within-Cluster Sum of Squares) is covered in deceptive local valleys. If you drop the initial $K$ pins uniformly at random, pure bad luck might place three fire stations in the exact same quiet suburb while leaving an entire industrial district uncovered! The algorithm freezes in a terrible local trap.

David Arthur and Sergei Vassilvitskii (2007) fixed this flaw with the famous **K-Means++ algorithm**.
Instead of blind uniform guessing, K-Means++ uses **probabilistic spatial repulsion**:
- The first centroid is picked uniformly at random.
- Every subsequent centroid is chosen with probability proportional to the **square of its distance to the nearest existing centroid**: $\mathbb{P}(\mathbf{x}) \propto D(\mathbf{x})^2$.

Points crowded around existing fire stations have virtually zero chance of being picked. Remote, neglected areas get top priority! This smart spacing ensures the initial centroids span the entire dataset, giving a proven $O(\log K)$ mathematical guarantee against the global optimum.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Unsupervised Learning** | Flying without a map: discovering patterns when no correct labels or answers are provided. |
| **Centroid** | Center of gravity: the average $(x, y)$ coordinate of all points belonging to a cluster. |
| **Voronoi Cell** | Service territory: the geometric polygon of space closest to a specific centroid. |
| **Inertia (WCSS)** | Tightness score: sum of squared distances from every point to its assigned centroid. |
| **K-Means++** | Smart seeding: spaces out initial centroids by favoring points far from existing ones. |

```text
    THE VORONOI PARTITIONING METAPHOR:

           Household           Household
               *                   *
                  \             /
                   \           /
               .----[ CENTROID 1 ]----.  <--- Fire Station 1
              |                        |      (Mean of assigned homes)
        ------+--- VORONOI BOUNDARY ---+------
              |                        |
               .----[ CENTROID 2 ]----.  <--- Fire Station 2
                   /           \
                  /             \
               *                   *
           Household           Household
```

### الحدس والقصة الواقعية

في التعلم الخاضع للإشراف، يقدم معلم خبير تصنيفات مؤكدة $y_i$ لكل عينة.
لكن في قطاعات صناعية وعلمية شاسعة—كاستكشاف الشرائح التسويقية للعملاء، أو تصنيف الخلايا في أبحاث السرطان، أو ضغط ألوان الصور، أو كشف الهجمات السيبرانية غير المسبوقة—**تكون البيانات غير مصنفة إطلاقاً**.
لا يوجد معلم يرشدك؛ بل يجب على الخوارزمية استكشاف الفضاء الهندسي بمفردها واكتشاف التجمعات الطبيعية المترابطة استناداً إلى تضاريس البيانات ذاتها.

تتعامل خوارزمية **K-Means الكلاسيكية** (ستيوارت لويد، 1957) مع هذه المسألة كـ **مخطط مدن يسعى لبناء $K$ من مراكز الإطفاء في مدينة مترامية الأطراف**:
1. **المواقع المبدئية:** تضع الخوارزمية $K$ من الدبابيس المؤقتة على خريطة المدينة كمواقع أولية للمراكز.
2. **تفسيف فورونوي (Voronoi Assignment):** يُسند كل منزل في المدينة إلى مركز الإطفاء الأقرب إليه جغرافياً، مما يقسم المدينة إلى فسيفساء من المناطق الخدمية المعروفة بـ **خلايا فورونوي**.
3. **تحديث المركز (Centroid Relocation):** يُعاد نقل كل مركز إطفاء مادياً إلى مركز الثقل الجغرافي الدقيق (المتوسط الحسابي للإحداثيات) لجميع المنازل التي تولى خدمتها.
4. **الاتزان الحركي المستقر:** نظراً لتحرك المراكز، تتغير الحدود الخدمية تلقائياً؛ فتعيد المنازل الارتباط بالمراكز الأقرب إليها مجدداً. وتتكرر هذه الدورة المتناوبة حتى تستقر المراكز تماماً وتتوقف عن الحركة.

غير أن خوارزمية لويد التقليدية تعاني من نقطة ضعف قاتلة: **عشوائية البداية**.
فدالة الهدف غير محدبة ومليئة بالقيعان المحلية المضللة. فإذا اخترت المواقع عشوائياً، فقد تسقط ثلاثة مراكز إطفاء في نفس الحي السكني بالصدفة، بينما يُترك قطاع صناعي كامل دون تغطية! فتقع الخوارزمية في فخ قاع محلي رديء.

عالج ديفيد آرثر وسيرجي فاسيليفتسكي (2007) هذه المعضلة بابتكار **K-Means++**.
بدلاً من التخمين العشوائي الأعمى، تطبق K-Means++ **تباعداً احتمإلياً ذكياً**:
- يُختار المركز الأول عشوائياً.
- يُختار كل مركز لاحق باحتمالية تتناسب طردياً مع **مربع المسافة عن أقرب مركز قائم بالفعل**: $\mathbb{P}(\mathbf{x}) \propto D(\mathbf{x})^2$.

تصبح فرصة اختيار النقاط القريبة من المراكز القائمة شبه معدومة، بينما تحظى المناطق النائية غير الممثلة بأعلى احتمالية للاختيار، مما يضمن استكشاف كافة أرجاء فضاء البيانات بضمان رياضي $O(\log K)$ مقارنة بالحل الأمثل العالمي!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **التعلم غير الخاضع للإشراف** | الطيران دون خريطة: اكتشاف الأنماط دون وجود تصنيفات أو إجابات صحيحة مسبقة. |
| **المركز (Centroid)** | مركز الثقل الهندسي: متوسط إحداثيات كافة النقاط التابعة للمجموعة. |
| **خلية فورونوي** | النطاق الخدمي: المضلع الهندسي للفضاء الأقرب لمركز تجمع معين. |
| **القصور الذاتي (WCSS)** | مقياس التماسك: مجموع مربعات مسافات النقاط عن مراكزها المخصصة. |
| **تهيئة K-Means++** | البذر الذكي: مباعدة المراكز الأولية عبر ترجيح النقاط البعيدة عن المراكز القائمة. |

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
C_k^{(t)} = \left\{ i : k = \arg\min_{j \in \{1, \dots, K\}} \|\mathbf{x}_i - \boldsymbol{\mu}_j^{(t-1)}\|_2^2 \right\}
$$

### 2. The Centroid Relocation Step
Holding the partition $\mathcal{C}$ fixed, minimize $J$ with respect to centroids $\boldsymbol{\mu}_k$. Setting the gradient with respect to $\boldsymbol{\mu}_k$ to zero:

$$
\nabla_{\boldsymbol{\mu}_k} J = -2 \sum_{i \in C_k} (\mathbf{x}_i - \boldsymbol{\mu}_k) = \mathbf{0} \implies \boldsymbol{\mu}_k^{(t)} = \frac{1}{|C_k^{(t)}|} \sum_{i \in C_k^{(t)}} \mathbf{x}_i
$$

### K-Means++ Seeding Algorithm (Arthur & Vassilvitskii, 2007)
1. Choose the first center $\boldsymbol{\mu}_1$ uniformly at random from $\mathcal{D}$.
2. For each point $\mathbf{x} \in \mathcal{D}$, compute the shortest squared distance to any already-chosen centroid:
   $$
   D(\mathbf{x})^2 = \min_{j \in \{1, \dots, k-1\}} \|\mathbf{x} - \boldsymbol{\mu}_j\|_2^2
   $$
3. Sample the next center $\boldsymbol{\mu}_k$ from $\mathcal{D}$ using the probability distribution:
   $$
   \mathbb{P}(\mathbf{x}) = \frac{D(\mathbf{x})^2}{\sum_{\mathbf{z} \in \mathcal{D}} D(\mathbf{z})^2}
   $$
4. Repeat Steps 2 and 3 until $K$ centroids have been selected.

This seeding guarantees:
$$
\mathbb{E}[J_{\text{K-Means++}}] \le 8(\ln K + 2) J_{\text{Optimal}}
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |
| :--- | :--- | :--- | :--- |
| $\mathcal{D}$ | $\{\mathbf{x}_1, \dots, \mathbf{x}_N\}$ | Unlabelled dataset of observations | مجموعة البيانات غير المصنفة في الفضاء |
| $K$ | Cluster count | Number of geometric clusters to discover | عدد المجموعات والتجمعات المطلوب استكشافها |
| $C_k$ | Point cluster set | Subset of sample indices assigned to cluster $k$ | مجموعة مؤشرات العينات المسندة للمجموعة $k$ |
| $\boldsymbol{\mu}_k \in \mathbb{R}^D$ | Cluster centroid | Arithmetic mean coordinate vector of cluster $k$ | متجه إحداثيات مركز الثقل للمجموعة $k$ |
| $J(\mathcal{C}, \boldsymbol{\mu})$ | Inertia / WCSS | Total within-cluster squared error to minimize | دالة القصور الذاتي ومجموع مربعات الأخطاء |
| $D(\mathbf{x})^2$ | Squared min distance | Squared Euclidean distance to nearest chosen center | مربع المسافة الإقليدية إلى أقرب مركز قائم |
| $\mathbb{P}(\mathbf{x})$ | $D(\mathbf{x})^2 / \sum D^2$ | K-Means++ seeding probability distribution | التوزيع الاحتمالي لانتقاء المراكز في K-Means++ |
| $J_{\text{Optimal}}$ | Global minimum | Theoretical minimum inertia across all partitions | الحد الأدنى النظري للقصور الذاتي للحل الأمثل |

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
