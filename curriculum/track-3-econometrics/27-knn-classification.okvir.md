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

Parametric models like OLS and Logistic Regression begin by imposing a rigid functional form: they decree that the relationship between inputs and outputs must be a straight line or an S-curve. If the true data-generating boundary is a complex winding maze or concentric spirals, parametric models suffer from incurable specification bias.

The **K-Nearest Neighbors (KNN)** algorithm embodies pure non-parametric simplicity: it assumes nothing about functional forms, probability densities, or coefficients. It operates on the intuitive folk adage: *"Birds of a feather flock together."* To predict the class of an unknown query point, the algorithm measures distances across feature space, identifies the $k$ closest training points, and takes a democratic majority vote among those neighbors.

The hyperparameter $k$ acts as an exact physical dial controlling the **Bias-Variance tradeoff**:
- When $k=1$, the model has zero bias on the training data. It partitions space into a **Voronoi tessellation**, where each training point rules its own kingdom. However, variance is extreme: a single mislabeled outlier creates an isolated island of error that distorts nearby test queries.
- As $k \to N$, the neighborhood expands to include the entire dataset. Local nuances dissolve, variance drops to zero, and the model simply predicts the global majority class everywhere (extreme bias).

:::simulation-widget{engine="canvas2d" component="KNNRadar"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تبدأ النماذج المعلمية (Parametric Models) كالانحدار الخطي واللوجستي بفرض قيود وظيفية صارمة على طبيعة العلاقات: حيث تفترض أن العلاقة عبارة عن خط مستقيم أو منحنى لوجستي. وإذا كانت الحدود الحقيقية بين الفئات معقدة أو ملتفة أو ذات أشكال دائرية متداخلة، تفشل هذه النماذج بسبب انحياز التوصيف.

تجسد خوارزمية **الجيران الأقرب (K-Nearest Neighbors - KNN)** البساطة اللامعلمية المطلقة؛ فهي لا تفترض أي معادلة رياضية مسبقة ولا تحسب أي معاملات. بل تعتمد على الفطرة الإنسانية البديهية: "المرء على دين خليله". لتصنيف أي نقطة مجهولة، تقيس الخوارزمية المسافات في فضاء المتغيرات، وتبحث عن أقرب $k$ جيران لها في فضاء التدريب، ثم تجري تصويتاً ديمقراطياً بالأغلبية لتحديد الفئة الفائزة.

يعمل المعامل الفائق $k$ كـ **مفتاح تحكم مباشر في معضلة الانحياز والتباين (Bias-Variance Tradeoff)**:
- عندما يكون $k=1$، ينعدم الانحياز على بيانات التدريب تماماً، وينقسم الفضاء إلى خلايا فورونوي (Voronoi Cells) تحكم فيها كل نقطة نطاقها الجغرافي. لكن التباين ينفجر لأن نقطة واحدة شاذة تصنع جزيرة معزولة من الخطأ.
- ومع زيادة $k$ ليقترب من حجم العينة الإجمالي $N$، تتلاشى الحساسية المحلية تماماً، ويهبط التباين إلى الصفر، ويتنبأ النموذج بالأغلبية العامة للبيانات في كل مكان (انحياز هائل).

### Mathematical Foundations

#### Metric Foundations
Let $\mathbf{x}, \mathbf{z} \in \mathbb{R}^D$ be two points in feature space. The distance metric is typically the Minkowski $L_p$ norm:

$$
d_p(\mathbf{x}, \mathbf{z}) = \|\mathbf{x} - \mathbf{z}\|_p = \left( \sum_{j=1}^D |x_j - z_j|^p \right)^{1/p}
$$

Special cases include the Manhattan metric ($p=1$) and the Euclidean metric ($p=2$).

#### Decision Rule & Majority Voting
Let $\mathcal{N}_k(\mathbf{x}) \subset \{1, \dots, N\}$ denote the index set of the $k$ training points minimizing $d(\mathbf{x}, \mathbf{x}_i)$.

The posterior probability for class $c \in \{1, \dots, C\}$ is computed as the local sample proportion:

$$
\hat{\mathbb{P}}(Y = c \mid \mathbf{x}) = \frac{1}{k} \sum_{i \in \mathcal{N}_k(\mathbf{x})} \mathbb{I}(y_i = c)
$$

The query is assigned to the class maximizing this probability:

$$
\hat{y}(\mathbf{x}) = \arg\max_{c} \hat{\mathbb{P}}(Y = c \mid \mathbf{x})
$$

#### Complexity & Effective Degrees of Freedom
Unlike parametric models with $P$ fixed parameters, KNN has an effective number of parameters approximately equal to:

$$
\text{df} \approx \frac{N}{k}
$$

#### The Cover-Hart Theorem (1967)
As sample size $N \to \infty$, the asymptotic test error rate of the 1-Nearest Neighbor classifier $R_{1\text{-NN}}$ is bounded by at most twice the optimal Bayes error rate $R^*$:

$$
R^* \le R_{1\text{-NN}} \le 2 R^* (1 - R^*) \le 2 R^*
$$

This remarkable theoretical result guarantees that even without estimating parameters, an infinite-sample 1-NN classifier captures at least half of the total predictive information available in the universe!

يؤكد برهان كوفر وهارت (Cover-Hart 1967) أنه مع كبر حجم العينة إلى ما لا نهاية، فإن خطأ مصنف الجار الأقرب الفردي لا يتجاوز ضعف خطأ بايز النظري الأمثل. وبذلك يضمن النموذج قوة تمييزية هائلة دون الحاجة لأي افتراضات شكلية مسبقة.

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
    # 1. Vectorized pairwise squared Euclidean distances:
    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z
    test_sq = np.sum(X_test ** 2, axis=1, keepdims=True)     # (N_test, 1)
    train_sq = np.sum(X_train ** 2, axis=1, keepdims=True).T  # (1, N_train)
    cross_term = 2.0 * (X_test @ X_train.T)                   # (N_test, N_train)
    dist_matrix = test_sq + train_sq - cross_term
    
    # 2. Identify indices of k smallest distances per query row
    k_nearest_indices = np.argpartition(dist_matrix, kth=k - 1, axis=1)[:, :k]
    
    # 3. Retrieve labels of nearest neighbors and perform majority vote
    neighbor_labels = y_train[k_nearest_indices] # shape (N_test, k)
    
    predictions = []
    for row in neighbor_labels:
        # Compute mode (most frequent label)
        values, counts = np.unique(row, return_counts=True)
        majority_label = values[np.argmax(counts)]
        predictions.append(majority_label)
        
    return np.array(predictions, dtype=int)
```
:::

### Practical ML Transfer Challenge

#### Scenario: The Scale Sensitivity Trap in Real Estate Valuation
A prop-tech startup trains a KNN model ($k=5$) to classify residential listings into two investment tiers (High Yield vs. Standard Yield). The model utilizes two primary features:
1. `Square Footage` (ranging from 600 to 5,500 sq ft).
2. `Number of Bathrooms` (ranging from 1.0 to 4.5 bathrooms).

During model testing, the lead engineer discovers a glaring defect: altering a home from 1 bathroom to 4 bathrooms has literally zero effect on its nearest neighbors or predicted tier, whereas a tiny change of 25 square feet flips the classification completely.

**Diagnostic Question:** What fundamental geometric flaw explains this breakdown, and how should it be corrected?

- **Option A (Correct):** Distance metrics in KNN are scale-dependent. Because square footage numbers are in the thousands while bathroom counts are in single digits, distance differences along the square footage axis ($\Delta \approx 100^2 = 10,000$) completely dwarf bathroom differences ($\Delta \approx 3^2 = 9$), rendering the bathroom feature geometrically invisible. All features must be standardized (e.g., via z-score normalization or MinMax scaling) prior to computing neighbors.
- **Option B:** Increasing $k$ from 5 to 50 will naturally rescale the bathrooms to match square feet.
- **Option C:** Euclidean distance is only defined for integer variables; bathrooms should be rounded to the nearest integer.
- **Option D:** KNN cannot handle more than one feature without violating the Gauss-Markov theorem.
