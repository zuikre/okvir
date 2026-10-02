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

Remember playing the classic parlor game **"20 Questions"** as a child? You do not attempt to guess an opponent's secret animal by multiplying arbitrary numbers or solving a system of simultaneous equations. Instead, you pose sharp, hierarchical, binary questions designed to cut ambiguity in half: *"Is it warm-blooded?"* If yes: *"Does it live on land?"* If yes: *"Does it have orange fur with black stripes?"* With fewer than ten well-crafted yes-or-no questions, you can effortlessly isolate a Bengal tiger out of millions of candidate organisms on Earth.

This hierarchical process mirrors the architecture of **Decision Trees (CART - Classification and Regression Trees)**, pioneered by Leo Breiman, Jerome Friedman, Richard Olshen, and Charles Stone (1984). While linear models force the world into rigid additive formulas—assuming every feature acts independently—real-world phenomena are intensely conditional and interaction-heavy. In emergency medicine, elevated heart rate is benign in a marathon runner, but life-threatening in an elderly patient experiencing chest trauma. A decision tree naturally captures these non-linear logical interactions by partitioning feature space into a patchwork of orthogonal, axis-aligned rectangular boxes.

At every internal node of the tree, the algorithm acts as an impatient, greedy optimizer. Imagine having a bucket filled with 50 red marbles and 50 blue marbles. The bucket is thoroughly mixed, disordered, and **impure**: if you reach in blindfolded and draw two marbles, there is a $50\%$ chance they will have different colors. The tree's mission is to search across every available feature $j$ and every possible numerical threshold $s$ (e.g., *"Is Systolic BP $> 140$?"*) to find the single dividing cut that splits the bucket into two child groups that are as pure and homogeneous as possible. This degree of purity is quantified mathematically using **Gini Impurity** or **Shannon Entropy**.

However, an unconstrained decision tree is like an overgrown, invasive weed. If left to grow unchecked, the tree will continue sprouting bifurcating branches until every single historical training sample rests in its own isolated leaf node. The resulting tree will boast a flawless $100\%$ training accuracy, but it has simply memorized idiosyncratic noise and measurement artifacts—the textbook definition of **overfitting**. To cultivate an interpretable, generalizable tree, **Cost-Complexity Pruning** introduces mathematical gardening shears: it penalizes the tree by a complexity factor $\alpha |\tilde{\mathcal{T}}|$ for every additional leaf, pruning away brittle outer twigs whose marginal gain in purity fails to justify their structural complexity.

تذكر لعبة الطفولة الشهيرة **"20 سؤالاً"**: عندما تحاول تخمين حيوان سري يفكر فيه صديقك، فإنك لا تلجأ لمعادلات جبرية معقدة، بل تطرح أسئلة ثنائية هرمية ذكية تقسم دائرة الاحتمالات إلى النصف في كل خطوة: *"هل هو ذو دم حار؟"* فإذا كانت الإجابة نعم: *"هل يعيش على اليابسة؟"* فإذا كانت نعم: *"هل يمتلك فراءً مخططاً؟"*. ومن خلال بضعة أسئلة محكمة، تستطيع تمييز النمر البنغالي من بين ملايين الكائنات الحية على وجه الأرض بسهولة مدهشة.

هذه البنية الهرمية الذكية هي جوهر **أشجار القرار (Classification and Regression Trees - CART)** التي ابتكرها ليو بريمان وزملاؤه (1984). في حين تجبر النماذج الخطية العالم الحقيقي على الخضوع لعلاقات جمعية صلبة تفترض استقلال المتغيرات، فإن الواقع الإنساني والبيولوجي حافل بالتفاعلات الشرطية المتشابكة؛ فارتفاع نبضات القلب أمر طبيعي تماماً لدى رياضي يمارس الجري، ولكنه مؤشر خطر داهم لدى مريض مسن يعاني من آلام في الصدر. تلتقط أشجار القرار هذه الشروط المنطقية المعقدة بصورة فطرية عبر تقسيم فضاء المتغيرات إلى مربعات ومكعبات متعامدة هندسياً.

عند كل عقدة داخلية، تعمل الشجرة كمحسن طماع يبحث عن النقاء المطلق. تخيل وعاءً يحتوي على 50 كرة حمراء و 50 كرة زرقاء؛ هذا الوعاء مفرط في الفوضى والخلط واللايقين؛ فإذا سحبت كرتين عشوائياً وأنت معصوب العينين، فهناك احتمال $50\%$ ألا تتطابق ألوانهما. هدف الشجرة عند كل تفرع هو مسح جميع المتغيرات وكافة العتبات الرقمية الممكنة لاكتشاف السؤال القاطع الذي يقسم الوعاء إلى مجموعتين فرعيتين بأعلى درجة ممكنة من النقاء والصفاء (Impurity Reduction)، ويتم قياس هذا النقاء رياضياً عبر **لايقين جيني (Gini Impurity)** أو **إنتروبيا شانون (Shannon Entropy)**.

لكن الشجرة التي تُترك تنمو بلا قيود تشبه نباتاً برياً طفيلياً؛ حيث ستواصل التفرع بلا نهاية حتى تنعزل كل نقطة تدريب واحدة في ورقة مستقلة خاصة بها. ستحقق الشجرة دقة تدريب كاذبة بنسبة $100\%$، لكنها لم تتعلم شيئاً سوى حفظ الضجيج العشوائي للعينة (Overfitting). ولتهذيب هذا النمو الجامح، يطبق **تقليم التكلفة والتعقيد (Cost-Complexity Pruning)** مقصاً رياضياً حاسماً: يفرض جزاءً عقابياً $\alpha |\tilde{\mathcal{T}}|$ على كل ورقة شجرية إضافية، ليقص الفروع الهشة والزوائد الهامشية التي لا يقدم نقاؤها إضافة حقيقية تبرر تعقيد هيكل الشجرة.

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
   Measured in bits of uncertainty, reaching a maximum of $\log_2(K)$ under uniform class dispersion.

### Greedy Bipartition Splitting Criterion
At node $m$, CART performs an exhaustive search across every feature $j \in \{1, \dots, P\}$ and every candidate split threshold $s \in \mathbb{R}$. A candidate split divides $\mathcal{S}_m$ into left and right children:

$$
\mathcal{S}_L(j, s) = \{i \in \mathcal{S}_m : X_{ij} \le s\}, \quad \mathcal{S}_R(j, s) = \{i \in \mathcal{S}_m : X_{ij} > s\}
$$

The optimal split $(j^*, s^*)$ maximizes the **Impurity Reduction (Information Gain)**:

$$
\Delta I(m, j, s) = I(m) - \left[ \frac{N_L}{N_m} I\left(\mathcal{S}_L(j, s)\right) + \frac{N_R}{N_m} I\left(\mathcal{S}_R(j, s)\right) \right]
$$

### Minimal Cost-Complexity Pruning
Let $\mathcal{T}_{\max}$ denote the fully expanded, unconstrained tree. For any sub-tree $\mathcal{T} \subseteq \mathcal{T}_{\max}$, let $\tilde{\mathcal{T}}$ denote its set of terminal leaf nodes. The cost-complexity criterion defines an objective that penalizes tree size:

$$
\mathcal{R}_\alpha(\mathcal{T}) = \sum_{m \in \tilde{\mathcal{T}}} N_m I(m) + \alpha |\tilde{\mathcal{T}}|
$$

where:
- $\sum_{m \in \tilde{\mathcal{T}}} N_m I(m)$: Total empirical misclassification or impurity across all terminal leaves.
- $|\tilde{\mathcal{T}}|$: Total leaf count parameterizing tree structural complexity.
- $\alpha \ge 0$: Regularization hyperparameter governing the penalty per additional leaf node.

Breiman proved that as $\alpha$ increases from $0$ to $\infty$, there exists a unique, nested sequence of subtrees $\mathcal{T}_{\max} = \mathcal{T}_0 \supset \mathcal{T}_1 \supset \mathcal{T}_2 \supset \dots \supset \text{root}$. For each internal branch node $t$, the weakest-link collapsing threshold is:

$$
\alpha_{\text{eff}}(t) = \frac{R(t) - R(\mathcal{T}_t)}{|\tilde{\mathcal{T}}_t| - 1}
$$

The branch with the smallest $\alpha_{\text{eff}}$ is pruned first, providing a principled path to tune tree size via held-out cross-validation.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $m$: Current tree node indexing regional feature subset $\mathcal{S}_m$.
* $N_m = |\mathcal{S}_m|$: Number of training samples residing inside node $m$.
* $p_{mk}$: Proportion of samples in node $m$ that belong to class $k$.
* $I_G(m)$: Gini impurity quantifying the variance of class indicators.
* $H(m)$: Shannon entropy quantifying average information content in bits.
* $j, s$: Candidate feature dimension and numerical threshold defining a coordinate cutting hyperplane.
* $\Delta I(m, j, s)$: Impurity reduction (information gain) achieved by splitting node $m$ on $(j, s)$.
* $\mathcal{T}$: Any candidate subtree obtained by collapsing internal branches.
* $\tilde{\mathcal{T}}$: Set of terminal leaf nodes representing final prediction partitions.
* $|\tilde{\mathcal{T}}|$: Integer leaf count quantifying structural tree complexity.
* $\alpha \ge 0$: Cost-complexity regularization penalty per terminal leaf.
* $\alpha_{\text{eff}}(t)$: Effective threshold value at which collapsing internal branch $t$ minimizes cost-complexity.

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
