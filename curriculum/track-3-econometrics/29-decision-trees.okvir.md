---
id: "decision-trees"
version: "1.0.0"
title: "Decision Trees (CART), Impurity Measures & Cost-Complexity Pruning"
track: "econometrics"
module: "mod-32"
estimated_minutes: 15
prerequisites: ["knn-classification", "logistic-regression-sigmoid"]
i18n:
  ar: "أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد"
---

# Decision Trees (CART), Impurity Measures & Cost-Complexity Pruning

Linear models force the real world into an artificial straightjacket of additive relationships: they assume each feature adds or subtracts independently from the target. In reality, human decisions, biological pathways, and economic markets are profoundly non-linear and interaction-driven: a symptom might be dangerous *only if* the patient is elderly *and* diabetic.

A **Decision Tree** (Classification and Regression Tree - CART) approaches the problem like an expert player of **"20 Questions"**. At each stage, the algorithm scans across every available feature and every candidate numerical threshold, searching for the single binary question (e.g., *"Is systolic blood pressure > 140?"*) that partitions the mixed pool of data into two child groups that are as pure and unmixed as possible.

Left unrestrained, a decision tree will continue splitting until every single training sample occupies its own private leaf node—achieving $100\%$ training accuracy by memorizing sample noise. To prevent catastrophic overfitting, **Cost-Complexity Pruning** introduces an $L_1$-style complexity penalty $\alpha |\tilde{\mathcal{T}}|$ on the number of leaves, mathematically snipping away weak branches whose impurity reduction fails to justify their structural complexity.

:::simulation-widget{engine="canvas2d" component="DecisionTreeLaser"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تفرض النماذج الخطية قيوداً قسرية على العالم الحقيقي؛ بافتراضها أن كل متغير يسهم بشكل منفصل ومستقل في النتيجة. لكن في الواقع الملموس، تتسم الأنظمة البيولوجية والاقتصادية بالتفاعلات الشرطية المعقدة: فقد يكون العَرَض المرضي خطيراً *فقط إذا* كان المريض متقدماً في السن *و* مصاباً بالسكري معاً.

تتعامل **شجرة القرار (CART)** مع البيانات كلعبة **"20 سؤالاً"** ذكية. في كل مرحلة، تفحص الخوارزمية جميع المتغيرات وكل العتبات الرقمية الممكنة، باحثة عن السؤال الثنائي الحاسم (مثل: *"هل ضغط الدم > 140؟"*) الذي يقسم العينة المختلطة إلى مجموعتين فرعيتين بأعلى درجة ممكنة من الصفاء والنقاء (Impurity Reduction).

وإذا تُركت الشجرة تنمو دون قيود، ستستمر في التفرع حتى تصبح كل نقطة تدريب معزولة في ورقة نهائية خاصة بها—لتحقق دقة تدريب $100\%$ عبر حفظ الضجيج العشوائي. ولمنع فرط التخصيص (Overfitting)، يطبق **تقليم التكلفة والتعقيد (Cost-Complexity Pruning)** جزاءً تنظيمياً $\alpha |\tilde{\mathcal{T}}|$ على عدد الأوراق، ليقص الفروع الهشة التي لا يقدم نقاؤها إضافة حقيقية تبرر تعقيدها.

### Mathematical Foundations

#### Node Impurity Functions
Let node $m$ contain subset $S_m$ with $N_m = |S_m|$ samples across $K$ discrete classes. The class proportions are $p_{mk} = \frac{1}{N_m}\sum_{i \in S_m} \mathbb{I}(y_i = k)$.

1. **Gini Impurity (Probability of Misclassifying a Random Guess):**
   $$I_G(m) = 1 - \sum_{k=1}^K p_{mk}^2 = \sum_{k=1}^K p_{mk}(1 - p_{mk})$$

2. **Cross-Entropy (Information Entropy in Bits):**
   $$H(m) = -\sum_{k=1}^K p_{mk} \log_2 p_{mk}$$

For binary classification ($p, 1-p$), both functions peak at maximum uncertainty ($p = 0.5$) and reach zero at pure consensus ($p \in \{0, 1\}$).

#### Best Split Criterion
CART searches greedily over feature index $j$ and split threshold $s$ to maximize the **Impurity Reduction (Information Gain)**:

$$
\Delta I(m, j, s) = I(m) - \left( \frac{N_L}{N_m} I(L) + \frac{N_R}{N_m} I(R) \right)
$$

where $S_L = \{i \in S_m : x_{ij} \le s\}$ and $S_R = \{i \in S_m : x_{ij} > s\}$.

#### Cost-Complexity Pruning (Breiman et al. 1984)
Let $\mathcal{T} \subset \mathcal{T}_{\max}$ denote a pruned sub-tree with terminal leaf set $\tilde{\mathcal{T}}$. The cost-complexity criterion balances total training impurity against tree size:

$$
\mathcal{R}_\alpha(\mathcal{T}) = \sum_{m \in \tilde{\mathcal{T}}} N_m I(m) + \alpha |\tilde{\mathcal{T}}|
$$

where $\alpha \ge 0$ is the regularization parameter governing the penalty per additional leaf. For each internal node, the effective threshold $\alpha_{\text{eff}} = \frac{R(t) - R(\mathcal{T}_t)}{|\tilde{\mathcal{T}}_t| - 1}$ dictates the exact order in which weak subtrees are pruned.

يُعد معيار تقليم التكلفة والتعقيد $\mathcal{R}_\alpha(\mathcal{T})$ المعادل الشجري لتنظيم لاسو؛ حيث يفرض تكلفة عددية $\alpha$ على كل ورقة إضافية، مما يجبر الشجرة على التخلص من التفرعات الهامشية التي تحفظ ضجيج العينة.

:::python-challenge{id="py-decision-trees"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[1.0], [2.0], [5.0], [6.0]]); y = np.array([0, 0, 1, 1]); res = find_best_split_gini(X, y); f\"{res['best_feature']}, {res['best_threshold']:.1f}, {res['best_gain']:.2f}\""
    expected: "0, 3.5, 0.50"
  - input: "X = np.array([[10.0], [20.0], [30.0]]); y = np.array([0, 1, 0]); res = find_best_split_gini(X, y); f\"{res['best_gain'] > 0.0}\""
    expected: "True"
---
```python
import numpy as np

def find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:
    """
    Finds the optimal feature and threshold maximizing Gini impurity reduction.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, P)
        Feature matrix.
    y : np.ndarray of shape (N,)
        Discrete integer class labels.
        
    Returns
    -------
    dict with keys:
        'best_feature': Index of feature giving best split.
        'best_threshold': Numerical threshold giving best split.
        'best_gain': Maximum Gini impurity reduction achieved.
    """
    N, P = X.shape
    
    def gini(labels: np.ndarray) -> float:
        if len(labels) == 0:
            return 0.0
        _, counts = np.unique(labels, return_counts=True)
        probs = counts / len(labels)
        return float(1.0 - np.sum(probs ** 2))

    parent_gini = gini(y)
    best_gain = -1.0
    best_feature = -1
    best_threshold = 0.0
    
    for j in range(P):
        # Unique sorted values as potential split points
        vals = np.unique(X[:, j])
        if len(vals) <= 1:
            continue
        # Candidate thresholds are midpoints between adjacent sorted values
        thresholds = (vals[:-1] + vals[1:]) / 2.0
        
        for thresh in thresholds:
            left_mask = X[:, j] <= thresh
            right_mask = ~left_mask
            
            y_left = y[left_mask]
            y_right = y[right_mask]
            
            if len(y_left) == 0 or len(y_right) == 0:
                continue
                
            left_gini = gini(y_left)
            right_gini = gini(y_right)
            
            # Weighted child impurity
            weighted_impurity = (len(y_left) / N) * left_gini + (len(y_right) / N) * right_gini
            gain = parent_gini - weighted_impurity
            
            if gain > best_gain:
                best_gain = gain
                best_feature = j
                best_threshold = float(thresh)
                
    return {
        "best_feature": best_feature,
        "best_threshold": best_threshold,
        "best_gain": float(best_gain)
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: Churn Prediction Overfitting Diagnosis
A fintech engineering team trains a single CART decision tree on 50,000 customer records to predict subscription cancellation. The unconstrained tree achieves a stellar $100\%$ accuracy on the training set. However, on the held-out validation set, the accuracy plummets to $61.2\%$.

Inspecting the tree reveals that it has expanded to a maximum depth of 31, with 4,200 leaves containing exactly 1 customer.

**Diagnostic Question:** Which combination of hyperparameter adjustments will most directly impose mathematical regularization to curb this variance explosion?

- **Option A (Correct):** Enforcing a strict `max_depth` (e.g., 5–8), increasing `min_samples_leaf` (e.g., to $\ge 50$), and tuning cost-complexity pruning `ccp_alpha` via cross-validation to snip off leaves that do not provide statistically significant impurity reduction.
- **Option B:** Switching from the Gini impurity metric to Cross-Entropy, because logarithms automatically eliminate variance.
- **Option C:** Increasing the number of features by generating all pairwise polynomial interactions.
- **Option D:** Standardizing all categorical variables with standard z-score normalization.
