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

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Remember playing the classic game **"20 Questions"** as a child?

You don't guess your friend's secret animal by multiplying arbitrary numbers or fitting matrix calculus equations. Instead, you ask sharp, hierarchical yes/no questions designed to cut uncertainty in half:
*"Is it warm-blooded?"* $\to$ Yes $\to$ *"Does it live on land?"* $\to$ Yes $\to$ *"Does it have orange fur with black stripes?"* $\to$ Yes $\to$ *"It's a tiger!"*

With fewer than ten well-crafted binary questions, you can effortlessly identify one creature out of millions.

This intuitive flowchart logic is the essence of **Decision Trees (CART - Classification and Regression Trees)**, formulated by Leo Breiman and colleagues in 1984.

While linear regression forces the world into rigid additive equations—assuming every variable acts independently—reality is packed with conditional interactions. In emergency medicine, a heart rate of 140 bpm is perfectly normal for an athlete finishing a marathon, but terrifying in an elderly patient complaining of chest pressure! A decision tree captures these conditional branches naturally by slicing the feature space into a clean patchwork of rectangular boxes.

At every step, the tree acts as a greedy purity seeker:
Imagine having a bowl filled with **50 red marbles and 50 blue marbles**. The bowl is thoroughly mixed and **impure**: if you reach in blindfolded and draw two marbles, there is a 50% chance they won't match.
The tree tests every single feature and every numerical threshold (e.g., *"Is Blood Pressure $> 140$?"*) to find the split that separates the marbles into child bowls that are as pure and monochromatic as possible. Purity is measured using **Gini Impurity** or **Shannon Entropy**.

However, an unchecked decision tree behaves like a wild weed. If left unconstrained, it will keep branching until every single training sample lives in its own private leaf node. The tree boasts 100% training accuracy, but it has simply memorized accidental noise—the textbook definition of **overfitting**.
To build a resilient tree, **Cost-Complexity Pruning** uses mathematical pruning shears: it penalizes the tree for every extra leaf ($\alpha |\mathcal{T}|$), lopping off weak outer twigs that don't earn their keep.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **CART** | Classification and Regression Trees: binary tree algorithm that splits data into pure subsets. |
| **Gini Impurity** | Disorder score: probability that two randomly drawn samples from a leaf have different labels. |
| **Shannon Entropy** | Information deficit: measures bit-level chaos and uncertainty in a distribution. |
| **Greedy Split** | Myopic choice: picks the best immediate split right now, without looking steps ahead. |
| **Cost-Complexity Pruning** | Gardening shears: chops off brittle outer leaves that add complexity without real predictive value. |

```text
    THE CART BINARY DECISION TREE:

                    [Chest Pain > 0?]
                       /          \
                    No/            \Yes
                     v              v
               [Low Risk]    [Age > 60?]
                               /     \
                            No/       \Yes
                             v         v
                      [Moderate]   [High Risk: ECG]
```

### الحدس والقصة الواقعية

تذكر لعبة الطفولة الشهيرة **"20 سؤالاً"**:

عندما تحاول تخمين الحيوان السري الذي يفكر فيه صديقك، فإنك لا تلجأ لمعادلات جبرية معقدة، بل تطرح أسئلة ثنائية ذكية تقسم دائرة الشك إلى النصف في كل خطوة:
*"هل هو ذو دم حار؟"* $\to$ نعم $\to$ *"هل يعيش على اليابسة؟"* $\to$ نعم $\to$ *"هل يمتلك فراءً برتقالياً بخطوط سوداء؟"* $\to$ نعم $\to$ *"إنه النمر!"*

ومن خلال بضعة أسئلة محكمة، تستطيع تمييز كائن واحد من بين ملايين الكائنات الحية بسهولة مدهشة.

هذا المخطط الانسيابي الذكي هو جوهر **أشجار القرار (CART - أشجار التصنيف والانحدار)** التي ابتكرها ليو بريمان وزملاؤه عام 1984.

في حين تجبر النماذج الخطية البيانات على الخضوع لمعادلات جمعية صلبة تفترض استقلال المتغيرات، فإن الواقع حافل بالتفاعلات الشرطية المتشابكة؛ فارتفاع نبضات القلب إلى 140 نبضة أمر طبيعي لعداء أنهى سباقه، ولكنه مؤشر خطر داهم لمسن يعاني من آلام في الصدر! تلتقط أشجار القرار هذه الشروط المنطقية بصورة فطرية عبر تقسيم فضاء البيانات إلى مكعبات ومربعات متعامدة هندسياً.

عند كل خطوة، تبحث الشجرة بنهم عن النقاء التام:
تخيل وعاءً يحتوي على **50 كرة حمراء و 50 كرة زرقاء**. هذا الوعاء مفرط في الخلط واللايقين؛ فإذا سحبت كرتين عشوائياً، فهناك احتمال 50% ألا تتطابق ألوانهما.
تمسح الشجرة كافة المتغيرات وكل العتبات الرقمية الممكنة لاكتشاف السؤال القاطع الذي يقسم الكرات إلى مجموعتين بأعلى درجة ممكنة من النقاء والصفاء، ويتم قياس هذا النقاء رياضياً عبر **لايقين جيني (Gini Impurity)** أو **إنتروبيا شانون (Entropy)**.

لكن الشجرة التي تُترك تنمو بلا قيود تشبه نباتاً برياً طفيلياً؛ حيث ستواصل التفرع حتى تنعزل كل نقطة تدريب واحدة في ورقة مستقلة. ستحقق الشجرة دقة تدريب كاذبة 100%، لكنها حفظت الضجيج العشوائي فقط (Overfitting).
ولتهذيب هذا النمو، يطبق **تقليم التكلفة والتعقيد (Cost-Complexity Pruning)** مقصاً رياضياً حاسماً: يفرض عقوبة على كل ورقة إضافية ($\alpha |\mathcal{T}|$)، ليقص الفروع الهشة التي لا تقدم إضافة حقيقية تبرر تعقيد هيكل الشجرة.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **أشجار CART** | أشجار التصنيف والانحدار: خوارزمية هرمية ثنائية تقسم البيانات إلى مجموعات نقية. |
| **لايقين جيني (Gini)** | مقياس الفوضى: احتمال أن تسحب عينتين عشوائياً من نفس العقدة وتجدهما من فئتين مختلفتين. |
| **إنتروبيا شانون** | عجز المعلومات: يقيس مستوى الفوضى والغموض في التوزيع الاحتمالي. |
| **التقسيم الطماع** | الاختيار قصير النظر: يختار أفضل تقسيم متاح حالياً دون النظر للعواقب اللاحقة. |
| **تقليم التكلفة والتعقيد** | مقص البستاني: يقطع الفروع الرقيقة التي تضيف تعقيداً هيكلياً دون فائدة تنبؤية حقيقية. |

:::simulation-widget{engine="canvas2d" component="DecisionTreeLaser"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let node $m$ represent a regional subset of the training sample $\mathcal{S}_m \subset \mathcal{D}$ containing $N_m = |\mathcal{S}_m|$ observations. Let $y_i \in \{1, \dots, K\}$ denote the target class labels. The empirical class probability distribution within node $m$ is:

$$
p_{mk} = \frac{1}{N_m} \sum_{i \in \mathcal{S}_m} \mathbb{I}(y_i = k), \quad \text{for } k \in \{1, \dots, K\}
$$

### Node Impurity Measures
To evaluate the heterogeneity of node $m$, CART relies on concave uncertainty metrics:

1. **Gini Impurity (Expected Misclassification under Random Labeling):**
   $$
   I_G(m) = 1 - \sum_{k=1}^K p_{mk}^2 = \sum_{k=1}^K p_{mk}(1 - p_{mk})
   $$
   For binary classification where $p \equiv p_{m1}$, this simplifies to $I_G(m) = 2p(1 - p)$, with a maximum of $0.5$ at $p = 0.5$ and a minimum of $0.0$ at pure consensus ($p \in \{0, 1\}$).

2. **Cross-Entropy / Shannon Information Entropy:**
   $$
   H(m) = -\sum_{k=1}^K p_{mk} \log_2(p_{mk})
   $$

### The Greedy Best-Split Objective
A candidate split $\theta = (j, s)$ on feature $j$ at threshold $s$ partitions node $m$ into left and right children:

$$
\mathcal{S}_{m, L}(\theta) = \{i \in \mathcal{S}_m : x_{ij} \le s\}, \quad \mathcal{S}_{m, R}(\theta) = \{i \in \mathcal{S}_m : x_{ij} > s\}
$$

The impurity reduction (split gain) is:

$$
\Delta I(m, \theta) = I(m) - \left[ \frac{N_{m, L}}{N_m} I(m, L) + \frac{N_{m, R}}{N_m} I(m, R) \right]
$$

CART chooses the optimal split $\theta^*$ by maximizing impurity reduction:

$$
\theta^* = \arg\max_\theta \Delta I(m, \theta)
$$

### Cost-Complexity Pruning (Breiman et al., 1984)
Given a fully grown tree $\mathcal{T}_{\max}$, we minimize the penalized cost-complexity criterion:

$$
R_\alpha(\mathcal{T}) = R(\mathcal{T}) + \alpha |\tilde{\mathcal{T}}|
$$

where $R(\mathcal{T}) = \sum_{m \in \tilde{\mathcal{T}}} \frac{N_m}{N} I(m)$ is total misclassification loss, $|\tilde{\mathcal{T}}|$ is the number of terminal leaves, and $\alpha \ge 0$ is the complexity penalty parameter.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |
| :--- | :--- | :--- | :--- |
| $\mathcal{S}_m$ | Data subset at node $m$ | Training observations falling into region $m$ | عينات التدريب الواقعة ضمن نطاق العقدة $m$ |
| $p_{mk}$ | $\frac{1}{N_m}\sum \mathbb{I}(y_i=k)$ | Empirical class probability in node $m$ | الاحتمال التجريبي للفئة $k$ في العقدة $m$ |
| $I_G(m)$ | $1 - \sum p_{mk}^2$ | Gini impurity: variance of class assignments | لايقين جيني: مقياس التشتت وعدم التجانس |
| $H(m)$ | $-\sum p_{mk} \log_2(p_{mk})$ | Shannon entropy: information deficit | إنتروبيا شانون: مقياس الفوضى المعلوماتية |
| $\theta = (j, s)$ | Feature $j$, threshold $s$ | Decision rule splitting a node in two | قاعدة القرار الفاصلة للمتغير والعتبة |
| $\Delta I(m, \theta)$ | Impurity gain | Purity improvement achieved by split $\theta$ | التحسن في نقاء البيانات الناتج عن التقسيم |
| $|\tilde{\mathcal{T}}|$ | Terminal leaf count | Structural complexity of the tree | عدد الأوراق الطرفية ومقياس تعقيد الشجرة |
| $\alpha$ | Pruning penalty | Tuning parameter balancing accuracy vs tree size | معامل جزاء التقليم الموازن بين الدقة والحجم |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the core CART split evaluation engine using Gini impurity in NumPy. You will:
1. Define the Gini impurity function $I_G(\mathbf{y}) = 1 - \sum p_k^2$ for any array of discrete integer labels.
2. Evaluate the baseline parent node impurity.
3. Iterate over all feature dimensions $j$ and candidate thresholds (midpoints between adjacent sorted unique values).
4. Partition samples into left and right child subsets, compute the weighted child impurity, and record the split $(j^*, s^*)$ yielding maximum impurity reduction.

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
    
    # Step 1: Define Gini impurity calculation
    def gini(labels: np.ndarray) -> float:
        if len(labels) == 0:
            return 0.0
        _, counts = np.unique(labels, return_counts=True)
        probs = counts / len(labels)
        return float(1.0 - np.sum(probs ** 2))

    # Step 2: Calculate parent node impurity
    parent_gini = gini(y)
    best_gain = -1.0
    best_feature = -1
    best_threshold = 0.0
    
    # Step 3: Iterate through all feature columns
    for j in range(P):
        vals = np.unique(X[:, j])
        if len(vals) <= 1:
            continue
            
        # Candidate split thresholds are midpoints of adjacent sorted values
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
            
            # Step 4: Compute weighted child impurity and information gain
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

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A data science team at a SaaS company trains an unconstrained CART decision tree on 50,000 subscriber accounts to predict contract churn. The fitted tree achieves a flawless $100\%$ accuracy on the training data. However, when deployed onto the held-out test cohort, classification accuracy collapses to $61.2\%$.

Inspecting the tree architecture reveals that it has grown to an extreme depth of 31 levels, containing over 4,200 terminal leaf nodes that each house exactly 1 customer account!

**Diagnostic Question:** Which combination of algorithmic interventions will most effectively restrain this explosive variance and restore out-of-sample generalization?

* [x] Enforce structural pre-pruning constraints—such as capping `max_depth` (e.g., 5 to 7) and raising `min_samples_leaf` (e.g., $\ge 50$)—and apply post-pruning via minimal cost-complexity parameter `ccp_alpha` tuned via cross-validation to snip off fragile leaves that lack statistical support.
  *فرض قيود تقليم مسبقة على هيكل الشجرة—مثل تحديد أقصى عمق `max_depth` (بين 5 و 7) ورفع الحد الأدنى لعينات الورقة `min_samples_leaf` إلى 50 فأكثر—مع تطبيق التقليم البعدي عبر ضبط معامل التكلفة والتعقيد `ccp_alpha` بالتحقق المتقاطع لقص الأوراق الهشة التي تفتقر للموثوقية الإحصائية.*
  > **Why this is correct:** Unconstrained decision trees have immense capacity ($\text{df} \approx |\tilde{\mathcal{T}}|$), allowing them to memorize random noise in 1-sample leaves. Restricting depth, setting minimum leaf populations, and pruning via cost-complexity $\alpha |\tilde{\mathcal{T}}|$ directly curb model variance and enforce robust generalizability.
  > **لماذا هذا الخيار صحيح:** تتمتع أشجار القرار غير المقيدة بقدرة استيعابية هائلة تجعلها تحفظ الضجيج العشوائي في أوراق أحادية العينة. ويؤدي وضع حد أقصى للعمق واشتراط حد أدنى لعينات الأوراق وتقليم التكلفة والتعقيد إلى كبح التباين واستعادة قدرة النموذج على التعميم.
* [ ] Switch the splitting criterion from Gini Impurity to Shannon Cross-Entropy, because logarithmic functions mathematically eliminate model variance.
  *تغيير معيار التقسيم من لايقين جيني إلى إنتروبيا شانون لأن الدوال اللوغاريتمية تلغي تباين النموذج رياضياً.*
  > **Why this is incorrect:** Gini and Entropy are numerically near-identical across almost all real splits; changing the metric does not prevent an unconstrained tree from memorizing individual samples.
  > **لماذا هذا الخيار خاطئ:** مقياسا جيني والإنتروبيا متقاربان عددياً بنسبة تزيد عن 98% في كافة التفرعات الحقيقية؛ ولن يمنع تغيير المقياس الشجرة غير المقيدة من حفظ البيانات والتفرع المفرط.
* [ ] Expand the feature space by generating all pairwise polynomial interaction products $X_j \cdot X_k$.
  *مضاعفة فضاء المتغيرات عبر توليد حدود تفاعلية كثيرة الحدود بين كافة المتغيرات.*
  > **Why this is incorrect:** Decision trees natively capture interactions through nested hierarchical splitting; adding collinear polynomial features drastically worsens overfitting and bloats search time.
  > **لماذا هذا الخيار خاطئ:** تلتقط أشجار القرار التفاعلات المعقدة تلقائياً عبر التفرع الهرمي المتسلسل؛ وإضافة متغيرات تفاعلية يضاعف مشكلة فرط التخصيص ويزيد العبء الحسابي.
* [ ] Standardize all continuous features using z-score normalization ($\frac{x - \mu}{\sigma}$).
  *معايرة كافة المتغيرات المستمرة بتحويلها إلى قيم معيارية z-score.*
  > **Why this is incorrect:** CART splits depend strictly on the rank order of feature values. Any monotonic transformation (such as linear standardization) leaves the relative ordering and resulting split thresholds unchanged.
  > **لماذا هذا الخيار خاطئ:** تعتمد أشجار القرار على الترتيب الفئوي للقيم؛ وأي تحويل رتيب خطي كالمعايرة يحافظ على الترتيب النسبي ولا يغير قرارات التقسيم نهائياً.
