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

### Intuition & Real-World Story

Imagine moving to an unfamiliar neighborhood in a bustling new city where you don't know the local language. If you want to know whether a bakery down the street is excellent, what do you do?

You don't sit down at your kitchen table to solve systems of polynomial equations or compute matrix Hessians. Instead, you do something deeply human: you lean over your fence, ask your **3 or 5 nearest neighbors**, and follow the majority consensus of their advice!

This instinct is the beating heart of **K-Nearest Neighbors (KNN)**, the quintessential non-parametric classification algorithm.

Parametric models—such as Ordinary Least Squares or Logistic Regression—force data into rigid, pre-ordained mathematical molds. They insist that the boundary between categories must be a straight line or an S-curve. If the true boundary is an intricate winding labyrinth, a donut shape, or an interlocking spiral, parametric models fail completely due to specification bias.

KNN makes **zero assumptions** about functional forms or distributions. It is an **instance-based "lazy learner"**:
- **During training:** It does virtually zero math. It simply commits the entire map of training points to memory.
- **During prediction:** When an unlabelled newcomer arrives, the algorithm measures geometric distances to all stored points, picks the $k$ closest neighbors, and tallies their votes. Whichever class wins the democratic majority claims the newcomer!

The hyperparameter $k$ acts as a physical knob controlling the **Bias-Variance Tradeoff**:
- **When $k = 1$:** The model carves space into a **Voronoi tessellation**—a mosaic of sharp polygonal cells where each training sample is king of its tiny backyard. Bias is zero, but variance explodes: a single mislabeled recording creates an isolated island of error that traps nearby test queries.
- **As $k \to N$:** The voting district expands to include the entire city. The algorithm simply predicts the global majority everywhere: variance drops to zero, but bias suffocates all local patterns.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Non-Parametric** | Freeform modeling: makes no pre-conceived assumptions about straight lines or shapes. |
| **Lazy Learning** | Memorize now, compute later: zero work during training; all math happens at query time. |
| **Minkowski Distance** | The universal ruler: generalizes Manhattan (grid) and Euclidean (straight-line) distance. |
| **Voronoi Tessellation** | The geometric territory map: mosaic of polygons showing which training point is closest. |
| **Curse of k Choice** | Balancing the voting booth: $k=1$ overreacts to noise; huge $k$ drowns out local nuance. |

```text
    THE KNN DEMOCRATIC NEIGHBORHOOD (k = 3):

         Feature 2
             ^
             |       [Class A]
             |           *
             |               * [Class A]
             |          (   ?   )  <--- Query Point finds k=3 closest:
             |               *           2 Class A vs 1 Class B
             |            [Class B]      --> Predicts Class A!
             |
             |                         [Class B]
             |                             *
             +----------------------------------------> Feature 1
```

### الحدس والقصة الواقعية

تخيل أنك انتقلت حديثاً للعيش في حي جديد داخل مدينة لا تعرف لغتها ولا عاداتها. إذا أردت معرفة ما إذا كان المخبز القريب ممتازاً وموثوقاً، فماذا ستفعل؟

لن تجلس إلى طاولتك لحل معادلات جبرية معقدة أو حساب مصفوفات تفاضلية؛ بل ستفعل شيئاً فطرياً وبسيطاً للغاية: ستخرج لتسأل **أقرب 3 أو 5 جيران يقيمون بجوارك**، ثم تتبع رأي الأغلبية الديمقراطية بينهم!

هذا الحدس البشري الفطري هو جوهر خوارزمية **الجيران الأقرب (K-Nearest Neighbors - KNN)**، وهي النموذج اللامعلمي الأبرز في تعلم الآلة.

تفرض النماذج المعلمية—مثل الانحدار الخطي واللوجستي—قوالب شكلية صارمة على البيانات؛ فتصر على أن الحد الفاصل بين الفئات يجب أن يكون خطاً مستقيماً أو منحنى لوجستياً. وإذا كانت الحدود الحقيقية معقدة كالمتاهات أو الحلقات الدائرية المتداخلة، تعجز تلك النماذج تماماً بسبب خطأ التوصيف.

أما خوارزمية KNN، فلا تفترض أي شكل مسبق للبيانات؛ وتعمل كـ **"متعلم كسول" (Lazy Learner)**:
- **في مرحلة التدريب:** لا تبذل أي جهد حسابي، بل تحتفظ بكامل خريطة بيانات التدريب في الذاكرة.
- **في مرحلة التنبؤ:** عند ظهور عينة جديدة غير مصنفة، تقيس الخوارزمية المسافات الهندسية لجميع النقاط المخزنة، وتختار أقرب $k$ جيران، وتجري تصويتاً ديمقراطياً تفوز فيه فئة الأغلبية!

يعمل المعامل الفائق $k$ كمقبض للتحكم في **معضلة الانحياز والتباين (Bias-Variance Tradeoff)**:
- **عند $k = 1$:** ينقسم الفضاء إلى خلايا فورونوي (Voronoi Cells) هندسية تحكم فيها كل نقطة نطاقها الخاص. ينعدم الانحياز، لكن التباين ينفجر: فنقطة شاذة واحدة ملوثة بالضجيج ستصنع جيباً معزولاً من الخطأ يشوه أي عينة اختبار تمر بقربها.
- **وعندما يقترب $k$ من $N$:** تتسع دائرة التصويت لتشمل كامل سكان المدينة، فيتلاشى التباين لكن يسيطر انحياز أعمى يمحو كل الفروق المحلية الدقيقة.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **النماذج اللامعلمية** | النمذجة الحرة: لا تفرض افتراضات مسبقة حول الخطوط المستقيمة أو التوزيعات. |
| **التعلم الكسول** | احفظ الآن واحسب لاحقاً: لا تدريب مسبقاً، وتحدث كافة الحسابات عند طلب التنبؤ. |
| **مسافة مينكوفسكي** | المسطرة الشاملة: تعمم مسافة مانهاتن (شبكة الشوارع) والإقليدية (الخط المستقيم). |
| **تفسيف فورونوي** | خريطة النفوذ الجغرافي: فسيفساء من المضلعات تبين النطاق الأقرب لكل نقطة تدريب. |
| **مفاضلة اختيار k** | ضبط صندوق الاقتراع: $k=1$ يبالغ في رد الفعل للضجيج، بينما $k$ الضخم يمحو المعالم. |

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

The $k$-neighborhood set comprises the first $k$ elements:

$$
\mathcal{N}_k(\mathbf{x}_{\text{query}}) = \{\mathbf{x}_{\pi(1)}, \dots, \mathbf{x}_{\pi(k)}\}
$$

The modeled posterior class probability is the empirical frequency inside the neighborhood:

$$
\hat{p}_c(\mathbf{x}_{\text{query}}) \equiv \hat{\mathbb{P}}(Y = c \mid \mathbf{x}_{\text{query}}) = \frac{1}{k} \sum_{i \in \mathcal{N}_k(\mathbf{x}_{\text{query}})} \mathbb{I}(y_i = c)
$$

The discrete classification decision is evaluated via majority plurality voting:

$$
\hat{y}(\mathbf{x}_{\text{query}}) = \arg\max_{c \in \{1, \dots, C\}} \hat{p}_c(\mathbf{x}_{\text{query}})
$$

### Asymptotic Cover-Hart Bound (1967)
As the training sample size grows toward infinity ($N \to \infty$), the error rate of the 1-Nearest Neighbor classifier $R_{1\text{-NN}}$ is bounded relative to the theoretical Bayes optimal error rate $R^*$:

$$
R^* \le R_{1\text{-NN}} \le 2R^* (1 - R^*) \le 2R^*
$$

This celebrated theorem proves that even the simplest, parameter-free 1-NN algorithm guarantees an asymptotic error rate no worse than twice the optimal error achievable by an omniscient Bayesian oracle!

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |
| :--- | :--- | :--- | :--- |
| $\mathcal{D} = \{(\mathbf{x}_i, y_i)\}$ | Labeled training corpus | Stored spatial map of instances in memory | خريطة بيانات التدريب المحفوظة بالذاكرة |
| $d_p(\mathbf{x}, \mathbf{z})$ | Minkowski $L_p$ metric | Geometric distance ruler between feature vectors | مقياس المسافة الهندسية بين نقطتين |
| $\mathcal{N}_k(\mathbf{x})$ | Nearest neighbor indices | Set of $k$ closest historical training instances | مجموعة الجيران الـ $k$ الأقرب للنقطة |
| $k \in \mathbb{Z}^+$ | Neighborhood size | Hyperparameter tuning the Bias-Variance tradeoff | المعامل الفائق لعدد الجيران المصوتين |
| $\hat{p}_c(\mathbf{x})$ | Neighborhood vote share | Modeled class posterior probability | الحصة التصويتية للاحتمال البعدي للفئة |
| $\hat{y}(\mathbf{x})$ | Plurality vote winner | Discrete predicted class label | فئة الأغلبية الفائزة بالتصويت الديمقراطي |
| $R^*$ | Bayes error rate | Irreducible irreducible theoretical noise floor | الحد الأدنى النظري لخطأ بايز الأصيل |
| $R_{1\text{-NN}}$ | 1-NN asymptotic error | Error bounded by at most $2 R^*$ as $N \to \infty$ | خطأ الجار الأقرب المقيد بضعف خطأ بايز |

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
