---
id: "knn-classification"
version: "1.0.0"
title: "K-Nearest Neighbors (KNN), Metric Spaces & Non-Parametric Boundaries"
track: "econometrics"
module: "mod-31"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric", "multiple-regression-matrix-calculus"]
i18n:
  ar: "الجيران الأقرب (KNN) وفضاءات المسافة والحدود غير المعلمية"
---

# K-Nearest Neighbors (KNN), Metric Spaces & Non-Parametric Boundaries

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Imagine relocating to an unfamiliar neighborhood in a bustling international city. You do not speak the local dialect, and you have no handbook detailing the community's cultural norms. If you want to know whether a local bakery down the street is reputable, what do you do? You do not formulate an elaborate system of simultaneous polynomial equations or optimize matrix derivatives. Instead, you simply lean over your garden fence, consult your three or five nearest neighbors, and follow the democratic consensus of their recommendations.

This everyday human instinct is the beating heart of **K-Nearest Neighbors (KNN)**, the quintessential non-parametric classification algorithm. Parametric models—such as Ordinary Least Squares or Logistic Regression—force data into rigid, pre-ordained mathematical straightjackets by decreeing that features must combine linearly or through an S-curve. If the true underlying decision boundary is an intricate labyrinth, a concentric ring, or an interlocking spiral, parametric models will fail catastrophically due to irreversible specification bias. KNN, by contrast, makes zero assumptions about underlying probability distributions or functional equations.

KNN is famously described as a **"lazy learner" (instance-based learning)**. During the training phase, it performs virtually zero upfront computation: it does not distill data into weights, gradients, or concise formulas. Instead, it commits the entire training dataset to memory as a multi-dimensional spatial map. When an unlabelled query point arrives, the algorithm measures geometric distances across the metric space, identifies the $k$ closest historical neighbors, and conducts an impromptu democratic election: whichever class holds the majority among those $k$ neighbors claims the query point.

The hyperparameter $k$ serves as a physical tuning dial governing the fundamental **Bias-Variance tradeoff**:
- When $k = 1$, the model possesses zero bias on training samples. Space is carved into a **Voronoi tessellation**—a mosaic of sharp polygonal cells where each training observation reigns supreme over its immediate geometric territory. However, variance is sky-high: a single mislabeled recording or noisy outlier creates an isolated island of error that distorts any new test queries wandering nearby.
- As you dial $k$ upward toward the total sample size $N$, you dilute local geographic identity. At $k = N$, the voting district expands to encompass the entire population: the algorithm simply predicts the global majority class everywhere, driving variance to zero but incurring suffocating bias.

تخيل أنك انتقلت حديثاً للعيش في حي سكني جديد داخل مدينة عالمية لا تعرف لغتها ولا عاداتها. إذا أردت معرفة ما إذا كان المخبز القريب يقدم طعاماً صحياً وموثوقاً، فماذا ستفعل؟ لن تبدأ بكتابة معادلات جبرية معقدة ولا بحساب مشتقات تفاضلية؛ بل ستخرج إلى شرفة منزلك لتسأل أقرب ثلاثة أو خمسة جيران يقيمون بجوارك، ثم تتبع رأي الأغلبية الديمقراطية بينهم.

هذا الحدس البشري الفطري هو جوهر خوارزمية **الجيران الأقرب (K-Nearest Neighbors - KNN)**، وهي النموذج اللامعلمي الأبرز في تعلم الآلة الكلاسيكي. تفرض النماذج المعلمية—مثل الانحدار الخطي واللوجستي—قيوداً شكلية صارمة على البيانات؛ فتفترض مسبقاً أن العلاقات يجب أن تتخذ شكل خط مستقيم أو منحنى لوجستي. وإذا كانت الحدود الحقيقية الفاصلة بين الفئات معقدة أو متداخلة كالمتاهات والدوائر متحدة المركز، فإن تلك النماذج تعجز عن التقاطها. على النقيض من ذلك، لا تفترض خوارزمية KNN أي دالة مسبقة ولا تبني افتراضات مسبقة حول التوزيع الاحتمالي.

تُصنف خوارزمية KNN بأنها **"متعلم كسول" (Lazy Learner)**؛ حيث إنها لا تبذل أي جهد حسابي أثناء مرحلة التدريب، ولا تحسب أوزاناً أو معاملات إحصائية مسبقة، بل تحتفظ بكامل خريطة بيانات التدريب في الذاكرة كما هي. وعندما تظهر نقطة جديدة غير مصنفة، تقيس الخوارزمية المسافات الهندسية في فضاء المتغيرات، وتحدد أقرب $k$ جيران لها، وتجري تصويتاً ديمقراطياً سريعاً تمنح فيه النقطة الجديدة فئة الأغلبية الفائزة بين هؤلاء الجيران.

يعمل المعامل الفائق $k$ كـ **مفتاح ميكانيكي لضبط معضلة الانحياز والتباين (Bias-Variance Tradeoff)**:
- فعندما يكون $k = 1$، ينعدم الانحياز في عينة التدريب تماماً، وينقسم الفضاء إلى خلايا فورونوي (Voronoi Tessellation)—وهي فسيفساء من المضلعات الهندسية تحكم فيها كل نقطة نطاقها الجغرافي الخاص. غير أن التباين ينفجر إلى أقصاه؛ لأن نقطة شاذة واحدة ملوثة بالضجيج ستصنع جيباً معزولاً من التنبؤ الخاطئ يشوه أي عينة اختبار مارة بقربها.
- ومع زيادة قيمة $k$ مقتربة من إجمالي حجم العينة $N$، تتسع دائرة التصويت لتشمل كافة سكان المدينة، مما يمحو أي خصوصية محلية؛ لتتنبأ الخوارزمية عندئذ بالفئة العامة السائدة في كل مكان، فينخفض التباين إلى الصفر ويسيطر انحياز فادح يعمي النموذج عن الفروق الدقيقة.

:::simulation-widget{engine="canvas2d" component="KNNRadar"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\mathcal{D} = \{(\mathbf{x}_i, y_i)\}_{i=1}^N$ be a training dataset where $\mathbf{x}_i \in \mathbb{R}^D$ and $y_i \in \{1, \dots, C\}$. For any pair of points $\mathbf{x}, \mathbf{z} \in \mathbb{R}^D$, the distance metric is formalized by the Minkowski $L_p$ norm:

$$
d_p(\mathbf{x}, \mathbf{z}) = \|\mathbf{x} - \mathbf{z}\|_p = \left( \sum_{j=1}^D |x_j - z_j|^p \right)^{1/p}
$$

Prominent specializations include:
- **Manhattan Distance ($p=1$):** $d_1(\mathbf{x}, \mathbf{z}) = \sum_{j=1}^D |x_j - z_j|$ (grid-like city block motion).
- **Euclidean Distance ($p=2$):** $d_2(\mathbf{x}, \mathbf{z}) = \sqrt{\sum_{j=1}^D (x_j - z_j)^2}$ (straight-line isotropic ruler).

### The K-Nearest Neighbors Neighborhood
Given a query vector $\mathbf{x}_{\text{query}} \in \mathbb{R}^D$, let $\pi$ denote the permutation of indices $\{1, \dots, N\}$ sorting training instances in non-decreasing distance order:

$$
d(\mathbf{x}_{\text{query}}, \mathbf{x}_{\pi(1)}) \le d(\mathbf{x}_{\text{query}}, \mathbf{x}_{\pi(2)}) \le \dots \le d(\mathbf{x}_{\text{query}}, \mathbf{x}_{\pi(N)})
$$

The $k$-nearest neighborhood set is defined as:

$$
\mathcal{N}_k(\mathbf{x}_{\text{query}}) = \{\pi(1), \pi(2), \dots, \pi(k)\}
$$

### Posterior Probability & Decision Rule
The modeled posterior probability of belonging to class $c \in \{1, \dots, C\}$ is the empirical sample proportion within the neighborhood:

$$
\hat{\mathbb{P}}(Y = c \mid \mathbf{x}_{\text{query}}) = \frac{1}{k} \sum_{i \in \mathcal{N}_k(\mathbf{x}_{\text{query}})} \mathbb{I}(y_i = c)
$$

The deterministic Bayes plug-in classification rule selects the mode:

$$
\hat{y}(\mathbf{x}_{\text{query}}) = \arg\max_{c \in \{1, \dots, C\}} \hat{\mathbb{P}}(Y = c \mid \mathbf{x}_{\text{query}})
$$

### Effective Degrees of Freedom
Unlike parametric models whose capacity is fixed by parameter count $P$, a KNN classifier's capacity is governed inversely by neighborhood size:

$$
\text{df}_{\text{eff}} \approx \frac{N}{k}
$$

When $k=1$, the model possesses $N$ effective parameters (one per data point), maximizing model flexibility. When $k=N$, the model simplifies to a single global constant prediction ($\text{df} = 1$).

### The Cover-Hart Theorem (1967)
Let $R^*$ denote the optimal, irreducible Bayes error rate under the true data-generating distribution. Thomas Cover and Peter Hart proved that as sample size $N \to \infty$, the asymptotic error rate of the unweighted 1-Nearest Neighbor classifier $R_{1\text{-NN}}$ satisfies:

$$
R^* \le R_{1\text{-NN}} \le 2 R^* (1 - R^*) \le 2 R^*
$$

This milestone theorem guarantees that a purely local, memory-based classifier captures at least half of the total predictive information available in the universe without estimating a single regression parameter!

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{x}_i \in \mathbb{R}^D$: $D$-dimensional feature coordinates of training observation $i$.
* $y_i \in \{1, \dots, C\}$: Categorical ground-truth class label.
* $d_p(\mathbf{x}, \mathbf{z})$: Minkowski metric measuring geometric separation in $L_p$ space.
* $\mathcal{N}_k(\mathbf{x})$: Set of indices corresponding to the $k$ closest training points to query point $\mathbf{x}$.
* $k$: User-specified hyperparameter controlling neighborhood voting size.
* $\hat{\mathbb{P}}(Y = c \mid \mathbf{x})$: Local empirical probability of class $c$ within the query neighborhood.
* $\hat{y}(\mathbf{x})$: Final predicted class label assigned via majority mode consensus.
* $\text{df}_{\text{eff}} \approx N / k$: Effective degrees of freedom measuring model complexity.
* $R^*$: Theoretical Bayes error rate representing irreducible classification noise.
* $R_{1\text{-NN}}$: Asymptotic classification error rate of the 1-Nearest Neighbor algorithm.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a fully vectorized K-Nearest Neighbors classifier in NumPy. You will:
1. Compute the pairwise squared Euclidean distance matrix between query samples and training samples using the expanded quadratic formula: $\|\mathbf{x} - \mathbf{z}\|_2^2 = \|\mathbf{x}\|_2^2 + \|\mathbf{z}\|_2^2 - 2\mathbf{x}^T\mathbf{z}$.
2. Extract the indices of the $k$ smallest distances for each query point using `np.argpartition`.
3. Gather the ground-truth training labels corresponding to those nearest neighbors.
4. Compute the modal class label for each query point to output discrete predictions.

:::python-challenge{id="py-knn-classification"}
---
timeout_ms: 3000
test_cases:
  - input: "X_tr = np.array([[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]]); y_tr = np.array([0, 0, 1, 1]); X_te = np.array([[0.1, 0.2], [0.9, 0.8]]); preds = knn_predict(X_tr, y_tr, X_te, k=1); f\"{preds[0]}, {preds[1]}\""
    expected: "0, 1"
  - input: "X_tr = np.array([[1.0], [2.0], [3.0], [4.0], [5.0]]); y_tr = np.array([0, 0, 1, 1, 1]); X_te = np.array([[2.8]]); preds = knn_predict(X_tr, y_tr, X_te, k=3); f\"{preds[0]}\""
    expected: "1"
---
```python
import numpy as np

def knn_predict(
    X_train: np.ndarray,
    y_train: np.ndarray,
    X_test: np.ndarray,
    k: int = 3
) -> np.ndarray:
    """
    Predicts class labels for query points using vectorized K-Nearest Neighbors.
    
    Parameters
    ----------
    X_train : np.ndarray of shape (N_train, D)
        Training feature coordinates.
    y_train : np.ndarray of shape (N_train,)
        Integer class labels for training points.
    X_test : np.ndarray of shape (N_test, D)
        Query feature coordinates.
    k : int
        Number of nearest neighbors to query.
        
    Returns
    -------
    np.ndarray of shape (N_test,)
        Predicted discrete class labels.
    """
    # Step 1: Vectorized pairwise squared Euclidean distances:
    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z
    test_sq = np.sum(X_test ** 2, axis=1, keepdims=True)     # (N_test, 1)
    train_sq = np.sum(X_train ** 2, axis=1, keepdims=True).T  # (1, N_train)
    cross_term = 2.0 * (X_test @ X_train.T)                   # (N_test, N_train)
    dist_matrix = test_sq + train_sq - cross_term
    
    # Step 2: Identify indices of k smallest distances per query row
    k_nearest_indices = np.argpartition(dist_matrix, kth=k - 1, axis=1)[:, :k]
    
    # Step 3: Retrieve labels of nearest neighbors
    neighbor_labels = y_train[k_nearest_indices] # shape (N_test, k)
    
    # Step 4: Perform democratic majority vote (compute mode)
    predictions = []
    for row in neighbor_labels:
        values, counts = np.unique(row, return_counts=True)
        majority_label = values[np.argmax(counts)]
        predictions.append(majority_label)
        
    return np.array(predictions, dtype=int)
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A prop-tech startup trains a K-Nearest Neighbors classifier ($k=5$) to evaluate residential real estate listings, categorizing each home into two investment tiers (`High Yield` vs. `Standard Yield`). The model relies on two primary features:
1. `Square Footage` (ranging from 600 to 5,500 sq ft).
2. `Number of Bathrooms` (ranging from 1.0 to 4.5 bathrooms).

During internal beta testing, a real estate analyst flags a critical defect: adding 3 bathrooms to a property has literally zero impact on its nearest neighbors or predicted tier, whereas a trivial change of 25 square feet flips the classification completely!

**Diagnostic Question:** What fundamental geometric pathology explains why the bathroom feature is completely ignored by the model, and how must it be resolved?

* [x] Distance metrics in KNN are isotropic and scale-dependent. Because square footage numbers span thousands while bathroom counts are single digits, squared differences along the square footage axis ($\Delta^2 \approx 100^2 = 10,000$) completely dominate bathroom differences ($\Delta^2 \approx 3^2 = 9$), rendering bathrooms geometrically invisible. All features must be standardized (e.g., via z-score normalization or MinMax scaling) prior to neighbor computation.
  *تعتمد مقاييس المسافة في KNN على المقاييس العددية للمتغيرات. وحيث إن المساحة تقاس بآلاف الأقدام المربعة بينما عدد الحمامات أرقام مفردة، فإن الفروق التربيعية للمساحة ($\Delta^2 \approx 100^2 = 10,000$) تطغى كلياً على فروق الحمامات ($\Delta^2 \approx 3^2 = 9$)، مما يجعل متغير الحمامات غير مرئي هندسياً. يجب توحيد مقاييس كافة المتغيرات (عبر المعايرة المعيارية z-score أو MinMax) قبل حساب المسافات.*
  > **Why this is correct:** Euclidean distance treats a unit difference in any dimension identically. When one dimension has a variance 1,000 times larger than another, it effectively constitutes $99.9\%$ of the calculated distance, ignoring unscaled features.
  > **لماذا هذا الخيار صحيح:** تعامل المسافة الإقليدية وحدة التغير في أي محور بنفس المقدار؛ فعندما يكون تباين أحد المتغيرات أكبر بآلاف المرات من الآخر، فإنه يستحوذ على 99.9% من حساب المسافة ويهمش المتغيرات الصغيرة تماماً ما لم تتم معايرتها.
* [ ] Increasing the hyperparameter $k$ from $5$ to $50$ will automatically rescale bathroom counts to match square footage coordinates.
  *سيؤدي رفع المعامل الفائق $k$ من 5 إلى 50 إلى إعادة وزن متغير الحمامات تلقائياً ليتناسب مع المساحة.*
  > **Why this is incorrect:** Increasing $k$ expands the voting neighborhood size, but does not alter the geometric shape of distance spheres or feature scaling.
  > **لماذا هذا الخيار خاطئ:** توسع زيادة قيمة $k$ دائرة الجيران المصوتين فقط، ولكنها لا تغير مقاييس الفضاء الهندسي أو حساب المسافات.
* [ ] Euclidean distance is strictly invalid for continuous numbers; the bathroom feature must be converted into a one-hot encoded matrix.
  *تعد المسافة الإقليدية باطلة رياضياً للأعداد المستمرة، ويجب تحويل متغير الحمامات إلى ترميز أحادي.*
  > **Why this is incorrect:** Euclidean distance is natively defined on real-valued continuous Cartesian spaces; one-hot encoding is reserved for unordered nominal categories.
  > **لماذا هذا الخيار خاطئ:** المسافة الإقليدية مصممة خصيصاً للمتغيرات العددية المستمرة، والترميز الأحادي مخصص للفئات الاسمية غير الرقمية.
* [ ] KNN cannot accept more than one feature without violating the orthogonality assumption of the Gauss-Markov theorem.
  *تعجز خوارزمية KNN عن استقبال أكثر من متغير واحد لتجنب خرق فرضية التعامد في مبرهنة غاوس-ماركوف.*
  > **Why this is incorrect:** KNN is a non-parametric model that makes no Gauss-Markov assumptions and readily scales to multi-dimensional spaces.
  > **لماذا هذا الخيار خاطئ:** خوارزمية KNN نموذج لا معلمي لا يخضع لمبرهنة غاوس-ماركوف ويعمل في أي عدد من الأبعاد الهندسية.
