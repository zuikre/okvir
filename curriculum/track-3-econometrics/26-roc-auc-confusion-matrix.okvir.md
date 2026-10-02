---
id: "roc-auc-confusion-matrix"
version: "1.0.0"
title: "Classification Metrics, ROC Curves & The Mann-Whitney Equivalence"
track: "econometrics"
module: "mod-30"
estimated_minutes: 15
prerequisites: ["logistic-regression-sigmoid", "central-limit-theorem"]
i18n:
  ar: "مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني"
---

# Classification Metrics, ROC Curves & The Mann-Whitney Equivalence

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

In applied machine learning, celebrating high raw "accuracy" is one of the most perilous traps in data science.

Imagine an automated airport baggage scanner screening 100,000 pieces of luggage every day, where exactly 10 bags contain dangerous contraband. A broken scanner that is unplugged from the wall—mechanically stamping "CLEAN" on every single bag without scanning it—will achieve a jaw-dropping **99.99% accuracy!**
The airport board might celebrate this stellar metric, while every single weapon and bomb passes completely undetected into the aircraft.

When catastrophic events (credit card fraud, cancerous tumors, bridge collapses) are inherently rare, raw accuracy is thoroughly blinded by the overwhelming majority of ordinary events.

To cut through this illusion, we partition classification decisions into a **four-room grid known as the Confusion Matrix**:
- **True Positives ($TP$):** The alarm rings, and there is a real fire.
- **True Negatives ($TN$):** Quiet peace: no alarm, and no fire.
- **False Positives ($FP$):** False alarms that panic people and waste valuable time.
- **False Negatives ($FN$):** Silent disasters: the house is burning down, but the alarm never rings!

Two rival metrics battle for supremacy:
- **Precision:** *"When our alarm blares, what is the probability of an actual fire?"* ($TP / (TP + FP)$)
- **Recall (Sensitivity):** *"Out of all the actual fires that started, what fraction did we detect?"* ($TP / (TP + FN)$)

To turn a continuous risk score ($0.0$ to $1.0$) into an alarm, you must pick a decision threshold $\tau$. Think of $\tau$ as a sensitivity knob. Lowering $\tau$ catches every fire ($100\%$ Recall) but floods you with false alarms. Raising $\tau$ eliminates false alarms but lets buildings burn down. The **Receiver Operating Characteristic (ROC)** curve sweeps $\tau$ across all values, tracing the True Positive Rate against the False Positive Rate.

The **Area Under the ROC Curve (ROC-AUC)** has an astonishing, intuitive meaning via the **Mann-Whitney U Test**:
If you randomly pick one sick patient and one healthy person, ROC-AUC is the exact probability that your model will assign a higher risk score to the sick patient than to the healthy person! An AUC of $0.5$ is pure coin flipping; an AUC of $1.0$ is a flawless ranking engine.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Accuracy Trap** | The false cheerleader: achieves 99% accuracy on imbalanced data by guessing majority class. |
| **Precision** | Alarm reliability: out of all alarms raised, how many were genuine fires? |
| **Recall / Sensitivity** | Net coverage: out of all true fires in the city, how many did our alarm catch? |
| **ROC Curve** | The diagnostic frontier: plots True Positive Rate vs False Positive Rate across all thresholds. |
| **ROC-AUC** | The pairwise sorting tournament: probability that a positive case outscores a negative case. |

```text
    THE FOUR-ROOM CONFUSION MATRIX:

                        GROUND TRUTH REALITY
                        Actual Positive (1)    Actual Negative (0)
                     +----------------------+----------------------+
      Predicted      |    TRUE POSITIVE     |    FALSE POSITIVE    |
      Positive (1)   |        (TP)          |         (FP)         |
  M                  | Real Fire Caught!    | False Alarm Panic    |
  O                  +----------------------+----------------------+
  D   Predicted      |    FALSE NEGATIVE    |    TRUE NEGATIVE     |
  E   Negative (0)   |        (FN)          |         (TN)         |
  L                  | Silent Catastrophe!  | Peaceful Clearance   |
                     +----------------------+----------------------+
```

### الحدس والقصة الواقعية

في تعلم الآلة التطبيقي، يُعد الاحتفال بنسبة "الدقة البسيطة" (Accuracy) أحد أخطر الفخاخ الإحصائية التي قد يقع فيها مهندس البيانات.

تخيل جهاز فحص أمني في مطار دولي يفحص 100,000 حقيبة يومياً، من بينها 10 حقائب فقط تحتوي على مواد محظورة. لو كان هذا الجهاز عاطلاً ومفصولاً عن الكهرباء، ويطبع عبارة "سليمة" على كل الحقائب دون فحص، لحقق دقة مذهلة تبلغ **99.99%!**
قد تفرح إدارة المطار بهذه النسبة الخيالية، بينما تمر كافة الأسلحة والمواد الخطرة دون أدنى اعتراض إلى الطائرات!

عندما تكون الأحداث الكارثية نادرة بطبيعتها (كالاحتيال المالي، أو الأورام السرطانية، أو انهيار الجسور)، تصبح الدقة البسيطة مقياساً أعمى تشوهه الأغلبية الساحقة للحالات العادية.

لكشف هذا الخداع، نقسم قرارات التصنيف إلى **مصفوفة الارتباك (Confusion Matrix)** ذات الحجرات الأربع:
- **إيجابي حقيقي ($TP$):** انطلق الإنذار، وهناك حريق حقيقي بالفعل!
- **سلبي حقيقي ($TN$):** هدوء وسلام: لم ينطلق الإنذار، ولا يوجد أي حريق.
- **إيجابي زائف ($FP$):** إنذار كاذب يثير الهلع ويهدر الوقت والجهد.
- **سلبي زائف ($FN$):** كارثة صامتة: المبنى يحترق، لكن جهاز الإنذار لم يصدر صوتاً!

ويشتعل صراع دائم بين مقياسين متنافسين:
- **الدقة التنبؤية (Precision):** *"عندما يصرخ جهاز الإنذار، ما احتمال وجود حريق حقيقي؟"* ($TP / (TP + FP)$)
- **الاستدعاء أو الحساسية (Recall):** *"من بين جميع الحرائق التي اندلعت في المدينة، كم حريقاً نجحنا في رصده؟"* ($TP / (TP + FN)$)

ولتحويل درجة الخطورة المستمرة (من 0 إلى 1) إلى قرار، نختار عتبة تشغيلية $\tau$. خفض العتبة يضمن اكتشاف كل الحرائق لكنه يغرقك بالإنذارات الكاذبة؛ ورفعها يمحو الإنذارات الكاذبة لكنه يترك المباني تحترق. يرسم **منحنى ROC** هذه المقايضة الكاملة.

أما **المساحة تحت المنحنى (ROC-AUC)** فتحمل معنى حدسياً مبهراً عبر **اختبار مان-ويتني**:
لو اخترت عشوائياً مريضاً مصاباً وشخصاً سليماً، فإن ROC-AUC هو الاحتمال الدقيق لأن يمنح نموذجك المريض درجة خطورة أعلى من الشخص السليم!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **فخ الدقة البسيطة** | المشجع الكاذب: يحقق 99% دقة في البيانات غير المتوازنة بمجرد التنبؤ بالفئة الأكثر شيوعاً. |
| **الدقة التنبؤية (Precision)** | موثوقية الإنذار: من بين كل الإنذارات التي أطلقناها، كم منها كان حريقاً حقيقياً؟ |
| **الاستدعاء (Recall)** | التغطية الشاملة: من بين كل الحرائق الفعلية، كم حريقاً تمكنا من الإمساك به؟ |
| **منحنى ROC** | الأفق التشغيلي: يرسم نسبة الإيجابيات الحقيقية مقابل الزائفة عند شتى العتبات. |
| **المساحة تحت المنحنى (AUC)** | بطولة الترتيب الثنائي: احتمال أن يتفوق المريض الفعلي على السليم في درجة التقييم. |

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
  \text{TPR}(\tau) = \frac{TP(\tau)}{TP(\tau) + FN(\tau)} = \frac{TP(\tau)}{N_+}
  $$
- **False Positive Rate (Fall-out / $1 - \text{Specificity}$):**
  $$
  \text{FPR}(\tau) = \frac{FP(\tau)}{FP(\tau) + TN(\tau)} = \frac{FP(\tau)}{N_-}
  $$
- **Precision (Positive Predictive Value):**
  $$
  \text{PPV}(\tau) = \frac{TP(\tau)}{TP(\tau) + FP(\tau)}
  $$
- **$F_1$-Score (Harmonic Mean of Precision and Recall):**
  $$
  F_1(\tau) = 2 \cdot \frac{\text{PPV}(\tau) \cdot \text{TPR}(\tau)}{\text{PPV}(\tau) + \text{TPR}(\tau)} = \frac{2 TP(\tau)}{2 TP(\tau) + FP(\tau) + FN(\tau)}
  $$

### The Mann-Whitney U Equivalence of ROC-AUC
The ROC curve traces the parametric locus $(\text{FPR}(\tau), \text{TPR}(\tau))$ as threshold $\tau$ traverses $[1, 0]$. The Area Under the Curve (AUC) is formalized as:

$$
\text{AUC} = \int_0^1 \text{TPR}(\text{FPR}^{-1}(u)) \, du
$$

By the **Wilcoxon-Mann-Whitney theorem**, the geometric area under the ROC curve is mathematically identical to the normalized Mann-Whitney $U$ statistic:

$$
\text{AUC} = \mathbb{P}(\hat{s}_i > \hat{s}_j \mid y_i = 1, y_j = 0) = \frac{1}{N_+ N_-} \sum_{i: y_i=1} \sum_{j: y_j=0} \left[ \mathbb{I}(\hat{s}_i > \hat{s}_j) + \frac{1}{2}\mathbb{I}(\hat{s}_i = \hat{s}_j) \right]
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |
| :--- | :--- | :--- | :--- |
| $\hat{s}_i \in [0, 1]$ | $\hat{\mathbb{P}}(Y=1 \mid \mathbf{x}_i)$ | Continuous model risk score | درجة الخطورة الاحتمالية المستمرة |
| $\tau \in [0, 1]$ | Decision threshold | Operating knob cutting positive from negative | العتبة التشغيلية الفاصلة بين الفئات |
| $TP, TN$ | True Positives / Negatives | Correct alarms and peaceful correct clearances | الإنذارات الصادقة والتبرئة السليمة |
| $FP, FN$ | False Positives / Negatives | False alarms and silent unflagged catastrophes | الإنذارات الكاذبة والتفويت الكارثي |
| $\text{TPR}(\tau)$ | $TP / (TP + FN)$ | Recall / Sensitivity: caught positive fraction | نسبة الاستدعاء والحساسية الشاملة |
| $\text{FPR}(\tau)$ | $FP / (FP + TN)$ | Fall-out: fraction of healthy falsely flagged | نسبة الإنذارات الخاطئة للأصحاء |
| $\text{PPV}(\tau)$ | $TP / (TP + FP)$ | Precision: credibility when alarm triggers | الدقة التنبؤية وموثوقية الإنذار |
| $F_1(\tau)$ | Harmonic mean | Balance between Precision and Recall | المقياس التوافقي الموازن للدقة والاستدعاء |
| $\text{AUC}$ | Area under ROC curve | Pairwise sorting probability of sick over healthy | المساحة تحت منحنى الفرز التشغيلي |
| $N_+, N_-$ | $\sum y_i, \sum (1-y_i)$ | Total counts of positive and negative classes | إجمالي الحالات الإيجابية والسلبية |

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
