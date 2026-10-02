---
id: "roc-auc-confusion-matrix"
version: "1.0.0"
title: "Classification Metrics, ROC Curves & The Mann-Whitney Equivalence"
track: "econometrics"
module: "mod-30"
estimated_minutes: 15
prerequisites: ["logistic-regression-sigmoid", "t1-29"]
i18n:
  ar: "مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني"
---

# Classification Metrics, ROC Curves & The Mann-Whitney Equivalence

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

In applied machine learning, celebrating raw classification "accuracy" is one of the most dangerous analytical traps in data science. Imagine an automated airport security scanner inspecting 100,000 pieces of luggage each day, where exactly 10 bags contain dangerous contraband. A defective scanner that is completely disconnected from power—and mechanically stamps "CLEAN" on every single piece of luggage without examining it—will achieve an astonishing $99.99\%$ accuracy! It will receive glowing performance reports while letting every single threat pass undetected through the terminal. In the real world, where catastrophic events (credit card fraud, metastatic tumors, structural dam failures) are inherently rare, raw accuracy is thoroughly blinded by the overwhelming majority class.

To see through this illusion, we partition classification outcomes into a **four-room grid known as the Confusion Matrix**. True Positives ($TP$) are genuine alarms that catch real threats; True Negatives ($TN$) are peaceful, correct clearances. The friction occurs in the error rooms: False Positives ($FP$) are nuisance false alarms that trigger needless panic and wasted labor, while False Negatives ($FN$) are silent, deadly misses. Two rival metrics govern this tension. **Precision** asks: *"When the alarm blares, what is the probability there is an actual fire?"* **Recall (Sensitivity)** asks: *"Out of all the actual fires that broke out in the building, what fraction did our alarm detect?"* Improving one almost inevitably degrades the other.

A probabilistic classifier does not output rigid binary decisions; it emits continuous risk scores $\hat{s}_i \in [0, 1]$. Transforming these continuous scores into hard decisions requires choosing an operational threshold $\tau$. Think of $\tau$ as an adjustable volume knob on an alarm system. If you dial $\tau$ all the way down to $0.0$, the alarm sounds continuously: you achieve $100\%$ Recall (no danger is missed), but your Precision collapses as False Positives flood the operations center. If you crank $\tau$ up to $1.0$, the alarm remains dead silent: zero false alarms, but complete blindness to reality. The **Receiver Operating Characteristic (ROC)** curve sweeps this threshold across its full continuum from $1.0$ down to $0.0$, plotting the True Positive Rate against the False Positive Rate to map the model's fundamental diagnostic frontier.

This brings us to the profound mathematical beauty of the **Area Under the ROC Curve (ROC-AUC)**. The AUC is not merely an abstract geometric area under a graph; it possesses an exact, non-parametric probabilistic meaning known as the **Wilcoxon-Mann-Whitney U equivalence**. Imagine staging a pairwise tournament: you randomly draw one positive observation (a patient confirmed to have the disease) and one negative observation (a healthy individual). The ROC-AUC is the exact mathematical probability that your model will assign a higher risk score to the sick patient than to the healthy individual! An AUC of $0.5$ represents pure coin-flipping randomness, while an AUC of $1.0$ represents a flawless sorting engine that never ranks a healthy instance above an afflicted one.

في تعلم الآلة التطبيقي، يُعد الاحتفال بنسبة "الدقة البسيطة" (Accuracy) أحد أخطر الفخاخ الإحصائية التي قد يقع فيها مهندس البيانات. تخيل جهاز فحص أمني آلي في مطار دولي يفحص 100,000 حقيبة يومياً، من بينها 10 حقائب فقط تحتوي على مواد محظورة. لو أن هذا الجهاز كان عاطلاً ومفصولاً تماماً عن الكهرباء، ويقوم بطباعة عبارة "سليمة" على كل الحقائب دون أي فحص، لحقق دقة مذهلة تبلغ $99.99\%$! سيحصل هذا الجهاز على إشادة شكلية كاذبة بينما تمر كافة الأخطار الحقيقية دون رصد. في الواقع العملي، وحيث تكون الأحداث الحرجة نادرة للغاية (مثل الاحتيال المالي، أو تشخيص الأورام السرطانية، أو انهيار السدود)، تصبح الدقة البسيطة مقياساً أعمى تشوهه الأغلبية الساحقة للحالات العادية.

لكشف هذا التضليل، نقسم نتائج التصنيف إلى **مصفوفة الارتباك (Confusion Matrix)** المكونة من أربع حجرات. الحالات الإيجابية الحقيقية ($TP$) هي إنذارات صادقة رصدت الخطر الفعلي؛ والحالات السلبية الحقيقية ($TN$) هي عمليات فحص صحيحة مرت بسلام. أما الفجوة فتكمن في حجرتي الخطأ: الحالات الإيجابية الزائفة ($FP$) هي إنذارات كاذبة تسبب الذعر وتستنزف الجهد، بينما الحالات السلبية الزائفة ($FN$) هي إخفاق صامت وخطير في رصد الكارثة. وهنا يبرز صراع بين مقياسين: **الدقة التنبؤية (Precision)** التي تسأل: *"عندما يطلق جهاز الإنذار صوته، ما احتمال وجود حريق حقيقي؟"*، ومقياس **الاستدعاء أو الحساسية (Recall)** الذي يسأل: *"من بين جميع الحرائق التي اندلعت بالفعل، كم حريقاً نجح النظام في اكتشافه؟"*.

لا ينتج النموذج الاحتمالي قرارات قاطعة، بل يولد درجات خطورة مستمرة $\hat{s}_i \in [0, 1]$. وتحويل هذه الدرجات إلى قرارات يتطلب اختيار عتبة تشغيلية $\tau$. تخيل العتبة $\tau$ كمقبض لضبط حساسية جهاز الإنذار: لو خفضت العتبة إلى $0.0$، فسيطلق الجهاز صفارته باستمرار، وبذلك تضمن استدعاءً بنسبة $100\%$ دون إفلات أي خطر، ولكنك ستغرق في آلاف الإنذارات الكاذبة وتنهار الدقة التنبؤية. ولو رفعت العتبة إلى $1.0$، فسيصمت الجهاز تماماً ولن تصدر أي إنذارات كاذبة، لكنك ستفوت كل الكوارث الفعلية. يقوم **منحنى خصائص تشغيل المستقبل (ROC Curve)** بمسح هذه العتبة عبر جميع قيمها الممكنة من $1.0$ إلى $0.0$، راسماً الحساسية مقابل معدل الإنذارات الكاذبة ليحدد الأفق التشغيلي الكامل للنموذج.

وهنا يكمن الجمال الرياضي لـ **المساحة تحت منحنى ROC (المعروفة بـ ROC-AUC)**. إن الـ AUC ليس مجرد مساحة هندسية صامتة تحت منحنى بياني، بل يحمل تفسيراً احتمالياً مطابقاً لـ **إحصاء مان-ويتني اللامعلمي (Wilcoxon-Mann-Whitney U)**: تخيل مواجهة فردية؛ حيث تسحب عشوائياً مريضاً مصاباً وشخصاً سليماً تماماً. يمثل ROC-AUC الاحتمال الرياضي الدقيق لأن يمنح نموذجك درجة خطورة للمريض المصاب أعلى من درجة الشخص السليم! تمثل قيمة $0.5$ نموذجاً عشوائياً يعادل رمي قطعة نقدية، بينما تمثل $1.0$ قدرة فرز خارقة لا تخطئ في ترتيب الأولويات أبداً.

:::simulation-widget{engine="canvas2d" component="ROCAUCCurveLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\{(\mathbf{x}_i, y_i)\}_{i=1}^N$ be a dataset with binary labels $y_i \in \{0, 1\}$. Let $\hat{s}_i \equiv \hat{\mathbb{P}}(Y = 1 \mid \mathbf{x}_i) \in [0, 1]$ denote the model's continuous predicted probability. For any fixed decision threshold $\tau \in [0, 1]$, the binary prediction rule is:

$$
\hat{y}_i(\tau) = \mathbb{I}(\hat{s}_i \ge \tau)
$$

### The Formal Confusion Metrics Suite
Partitioning the $N$ observations against ground truth labels yields:

$$
\begin{aligned}
TP(\tau) &= \sum_{i=1}^N \mathbb{I}(\hat{y}_i(\tau) = 1 \land y_i = 1), \quad &FP(\tau) &= \sum_{i=1}^N \mathbb{I}(\hat{y}_i(\tau) = 1 \land y_i = 0) \\
TN(\tau) &= \sum_{i=1}^N \mathbb{I}(\hat{y}_i(\tau) = 0 \land y_i = 0), \quad &FN(\tau) &= \sum_{i=1}^N \mathbb{I}(\hat{y}_i(\tau) = 0 \land y_i = 1)
\end{aligned}
$$

From these cardinalities, we evaluate:
- **True Positive Rate (Sensitivity / Recall):**
  $$
  \text{TPR}(\tau) = \frac{TP(\tau)}{TP(\tau) + FN(\tau)} = \frac{TP(\tau)}{n_+} = \mathbb{P}(\hat{s}_i \ge \tau \mid Y_i = 1)
  $$
- **False Positive Rate ($1 - \text{Specificity}$):**
  $$
  \text{FPR}(\tau) = \frac{FP(\tau)}{FP(\tau) + TN(\tau)} = \frac{FP(\tau)}{n_-} = \mathbb{P}(\hat{s}_i \ge \tau \mid Y_i = 0)
  $$
- **Precision (Positive Predictive Value):**
  $$
  \text{Precision}(\tau) = \frac{TP(\tau)}{TP(\tau) + FP(\tau)} = \mathbb{P}(Y_i = 1 \mid \hat{s}_i \ge \tau)
  $$
- **$F_\beta$-Score (Harmonic Mean):**
  $$
  F_\beta = (1 + \beta^2) \frac{\text{Precision} \cdot \text{Recall}}{\beta^2 \text{Precision} + \text{Recall}} \implies F_1 = \frac{2 \cdot TP}{2 \cdot TP + FP + FN}
  $$

### The Wilcoxon-Mann-Whitney ROC-AUC Equivalence
The parametric ROC curve is defined by the set of coordinates $\{(\text{FPR}(\tau), \text{TPR}(\tau)) : \tau \in [0, 1]\}$. The Area Under the Curve is formally defined as:

$$
\text{AUC} = \int_0^1 \text{TPR}(\tau) \, d\text{FPR}(\tau)
$$

By integration by parts and Fubini's theorem, this geometric integral is mathematically identical to the normalized Wilcoxon-Mann-Whitney rank-sum test statistic:

$$
\text{AUC} = \mathbb{P}\left(\hat{s}_i > \hat{s}_j \mid y_i = 1, y_j = 0\right) = \frac{1}{n_+ n_-} \sum_{i: y_i = 1} \sum_{j: y_j = 0} \left[ \mathbb{I}(\hat{s}_i > \hat{s}_j) + \frac{1}{2} \mathbb{I}(\hat{s}_i = \hat{s}_j) \right]
$$

### Fundamental Invariance Properties:
1. **Threshold Independence:** ROC-AUC evaluates the classifier across all possible operating thresholds simultaneously, making it an intrinsic measure of score calibration and separability.
2. **Monotonic Transformation Invariance:** Any strictly monotonic transformation $g(\hat{s})$ (such as taking logarithms or scaling by positive constants) preserves the pairwise ordering $\hat{s}_i > \hat{s}_j$, leaving the ROC curve and the AUC value strictly unchanged.
3. **Class Prevalence Invariance:** Because $\text{TPR}$ is normalized strictly by $n_+$ and $\text{FPR}$ is normalized strictly by $n_-$, changing the proportion of positive to negative samples in the testing cohort leaves the theoretical ROC curve invariant.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $y_i \in \{0, 1\}$: Ground truth binary state ($1$ for target condition/positive, $0$ for baseline/negative).
* $\hat{s}_i \in [0, 1]$: Continuous predicted risk score or probability assigned to observation $i$.
* $\tau \in [0, 1]$: Decision threshold separating positive classifications from negative classifications.
* $n_+, n_-$: Total count of actual positive ($n_+ = \sum y_i$) and negative ($n_- = N - n_+$) instances.
* $TP, FP, TN, FN$: Cardinalities of the four confusion matrix quadrants.
* $\text{TPR}(\tau)$: True Positive Rate measuring sensitivity to detecting genuine positive cases.
* $\text{FPR}(\tau)$: False Positive Rate measuring the frequency of erroneous false alarms among healthy cases.
* $\text{Precision}(\tau)$: Probability that a flagged instance is genuinely afflicted.
* $F_1$: Harmonic mean reconciling the inherent trade-off between Precision and Recall.
* $\text{AUC}$: Area Under the Receiver Operating Characteristic curve, measuring pairwise ranking accuracy.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the non-parametric Wilcoxon-Mann-Whitney ROC-AUC calculation and confusion matrix evaluation in NumPy. You will:
1. Split predicted scores into positive $\mathbf{s}_+$ and negative $\mathbf{s}_-$ cohorts based on ground truth labels $y_i$.
2. Compute pairwise concordant pairs ($\hat{s}_i > \hat{s}_j$) and tied pairs ($\hat{s}_i = \hat{s}_j$) via array broadcasting to evaluate exact ROC-AUC.
3. Discretize continuous scores at default threshold $\tau = 0.5$ to compute $TP$, $FP$, and $FN$.
4. Calculate Precision, Recall, and $F_1$-score with proper division-by-zero safeguards.

:::python-challenge{id="py-roc-auc-confusion-matrix"}
---
timeout_ms: 3000
test_cases:
  - input: "y_true = np.array([1, 1, 0, 0]); y_score = np.array([0.9, 0.8, 0.3, 0.2]); res = compute_roc_auc_score(y_true, y_score); f\"{res['auc']:.2f}, {res['precision']:.2f}\""
    expected: "1.00, 1.00"
  - input: "y_true = np.array([1, 0, 1, 0]); y_score = np.array([0.8, 0.7, 0.6, 0.9]); res = compute_roc_auc_score(y_true, y_score); f\"{res['auc']:.2f}\""
    expected: "0.50"
---
```python
import numpy as np

def compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:
    """
    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.
    
    Parameters
    ----------
    y_true : np.ndarray of shape (N,)
        Binary ground truth labels in {0, 1}.
    y_score : np.ndarray of shape (N,)
        Continuous predicted probability/risk scores in [0, 1].
        
    Returns
    -------
    dict with keys:
        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.
        'precision': Precision at threshold 0.5.
        'recall': Recall at threshold 0.5.
        'f1': F1-score at threshold 0.5.
    """
    # Step 1: Separate continuous scores by true class
    pos_scores = y_score[y_true == 1]
    neg_scores = y_score[y_true == 0]
    n_pos = len(pos_scores)
    n_neg = len(neg_scores)
    
    # Step 2: Wilcoxon-Mann-Whitney pairwise comparisons via broadcasting
    # Compare every positive instance against every negative instance
    concordant = np.sum(pos_scores[:, None] > neg_scores[None, :])
    ties = np.sum(pos_scores[:, None] == neg_scores[None, :])
    auc = float((concordant + 0.5 * ties) / (n_pos * n_neg))
    
    # Step 3: Compute confusion matrix at operational threshold tau = 0.5
    y_pred = (y_score >= 0.5).astype(int)
    tp = float(np.sum((y_true == 1) & (y_pred == 1)))
    fp = float(np.sum((y_true == 0) & (y_pred == 1)))
    fn = float(np.sum((y_true == 1) & (y_pred == 0)))
    
    # Step 4: Calculate derived rate metrics with safe zero handling
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    f1 = (2.0 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0
    
    return {
        "auc": auc,
        "precision": precision,
        "recall": recall,
        "f1": f1
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A major financial institution deploys an AI system to detect unauthorized, fraudulent login attempts. Out of 10,000,000 daily logins, exactly 1,000 are malicious ($0.01\%$ positive prevalence). The engineering team releases an offline evaluation report highlighting an extraordinary $\text{ROC-AUC} = 0.985$.

However, in the Security Operations Center (SOC), the deployment is a disaster: the model generates 50,000 security alerts per day, of which 49,100 are false alarms. Security analysts are suffering from acute alert fatigue and are on the verge of turning off the system entirely.

**Diagnostic Question:** Why does an exceptional ROC-AUC of 0.985 disguise such abysmal precision ($1.8\%$) on highly imbalanced data, and what metric should the team adopt?

* [x] The ROC curve plots False Positive Rate ($\text{FPR} = \frac{FP}{TN + FP}$) on the x-axis, whose denominator contains the massive reservoir of $9,999,000$ True Negatives. Even an exceptionally low FPR of $0.5\%$ generates nearly $50,000$ False Positives. Because Precision evaluates False Positives against the tiny pool of True Positives ($\frac{TP}{TP + FP}$), Precision collapses. The team must optimize the Precision-Recall curve (PR-AUC) rather than ROC-AUC.
  *يرسم منحنى ROC المعدل الإيجابي الزائف ($\text{FPR} = \frac{FP}{TN + FP}$) على المحور الأفقي، ومقامه يحتوي على الأغلبية الساحقة البالغة $9,999,000$ حالة سلبية حقيقية. وبالتالي، فإن نسبة خطأ ضئيلة تبلغ 0.5% تولد ما يقارب 50,000 إنذار كاذب. وحيث إن الدقة التنبؤية تقارن الإنذارات الكاذبة بالحالات الإيجابية النادرة، تنهار الدقة إلى أقل من 2%. يجب على الفريق اعتماد منحنى الدقة والاستدعاء (PR-AUC).*
  > **Why this is correct:** ROC-AUC is prevalence-invariant: a gigantic negative class shrinks FPR to near zero even with tens of thousands of false alarms. In contrast, Precision explicitly evaluates the operational purity of alerts, making the Precision-Recall AUC (PR-AUC) the gold standard for severe class imbalance.
  > **لماذا هذا الخيار صحيح:** لا يتأثر ROC-AUC بنسبة انتشار الفئات؛ فالعدد الهائل للحالات السلبية يجعل FPR ضئيلاً جداً حتى مع وجود عشرات الآلاف من الإنذارات الكاذبة. بينما يقيس مقياس الدقة نقاء الإنذارات الفعلي، مما يجعل منحنى الدقة والاستدعاء (PR-AUC) هو المعيار الأساسي للبيانات غير المتوازنة.
* [ ] The Wilcoxon-Mann-Whitney U theorem is mathematically invalid when total sample sizes exceed $N = 10,000$, causing numerical overflow in the rank sums.
  *تعد مبرهنة مان-ويتني باطلة رياضياً عندما يتجاوز حجم العينة $N = 10,000$ حالة، مما يسبب خطأ تجاوز رقمي في حساب الرتب.*
  > **Why this is incorrect:** The Mann-Whitney rank sum theorem is an exact non-parametric identity that holds for any sample size $N \in [2, \infty)$.
  > **لماذا هذا الخيار خاطئ:** مبرهنة مان-ويتني مطابقة رياضية قطعية وصحيحة لأي حجم عينة من حالتين إلى المليارات دون أي قيود حسابية.
* [ ] The offline ROC-AUC was mistakenly calculated using natural logarithms rather than base-2 information-theoretic logarithms.
  *تم حساب ROC-AUC في مرحلة الاختبار باللوغاريتم الطبيعي بدلاً من اللوغاريتم الثنائي لنظرية المعلومات.*
  > **Why this is incorrect:** ROC-AUC relies purely on ordering and ranking; it does not involve any logarithmic transformation.
  > **لماذا هذا الخيار خاطئ:** يعتمد ROC-AUC كلياً على ترتيب المقارنات الزوجية ولا يتضمن أي دوال لوغاريتمية.
* [ ] The model's True Positives and False Positives mathematically canceled each other out during gradient descent backpropagation.
  *ألغت الحالات الإيجابية الحقيقية والإنذارات الكاذبة بعضها البعض رياضياً أثناء التدرج العكسي.*
  > **Why this is incorrect:** Confusion matrix quadrants are non-negative counting sets that evaluate predictions post-hoc; they do not cancel out algebraically.
  > **لماذا هذا الخيار خاطئ:** فئات مصفوفة الارتباك هي أعداد صحيحة موجبة تحسب النتائج بعد التنبؤ، ولا تلغي بعضها جبرياً.
