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

In applied machine learning, relying on raw classification accuracy is often catastrophic. Consider detecting fraudulent credit card transactions, rare metastatic tumors, or system failures where the positive class comprises only $0.1\%$ of the dataset. A trivial, useless model that predicts "Not Fraud" for every single transaction achieves $99.9\%$ accuracy while failing to detect a single criminal!

To truly evaluate a probabilistic classifier, we must uncouple the model's ranking ability from any arbitrary decision threshold $\tau \in [0, 1]$. The **Receiver Operating Characteristic (ROC)** curve sweeps the decision threshold across its entire continuum from $1.0$ down to $0.0$, plotting the True Positive Rate (Sensitivity / Recall) on the y-axis against the False Positive Rate ($1 - \text{Specificity}$) on the x-axis.

The **Area Under the ROC Curve (ROC-AUC)** possesses a profound, beautiful probabilistic identity: it is mathematically identical to the non-parametric **Wilcoxon-Mann-Whitney U statistic**. The AUC represents the exact probability that if you randomly draw one positive observation and one negative observation, your model assigns a strictly higher risk score to the positive instance!

:::simulation-widget{engine="canvas2d" component="ROCAUCCurveLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في تعلم الآلة التطبيقي، يُعد الاعتماد على مقياس الدقة البسيطة (Accuracy) فخاً خطيراً. تخيل نظاماً لرصد الاحتيال المالي أو تشخيص الأورام الخبيثة النادرة حيث لا تتجاوز الحالات الإيجابية $0.1\%$ من إجمالي العينة. يستطيع نموذج غبي تماماً أن يتنبأ بـ "عدم وجود احتيال" لجميع العمليات ليحقق دقة زائفة تبلغ $99.9\%$، رغم أنه فشل في رصد محتال واحد!

لتقييم النموذج تقييماً حقيقياً، يجب فصل قدرته التمييزية عن أي عتبة تصنيف ثابتة $\tau \in [0, 1]$. يقوم **منحنى خصائص تشغيل المستقبل (ROC Curve)** بفحص جميع العتبات الممكنة من $1.0$ إلى $0.0$، راسماً المعدل الإيجابي الحقيقي (الحساسية / الاستدعاء) مقابل المعدل الإيجابي الزائف.

وتتميز **المساحة تحت منحنى ROC (المعروفة بـ ROC-AUC)** بمدلول احتمالي عميق: فهي تتطابق رياضياً مع **إحصاء مان-ويتني اللامعلمي (Wilcoxon-Mann-Whitney U)**. إن الـ AUC يمثل بالضبط احتمال أن يعطي النموذج درجة تقييم للحالة الإيجابية العشوائية أعلى من الحالة السلبية العشوائية!

### Mathematical Foundations

#### The Confusion Matrix Metric Suite
For a chosen decision threshold $\tau$, predictions are partitioned into True Positives ($TP$), False Positives ($FP$), True Negatives ($TN$), and False Negatives ($FN$):

- **True Positive Rate (Recall / Sensitivity):** Fraction of actual positives correctly identified:
  $$\text{TPR} = \frac{TP}{TP + FN}$$

- **False Positive Rate ($1 - \text{Specificity}$):** Fraction of actual negatives falsely flagged:
  $$\text{FPR} = \frac{FP}{FP + TN}$$

- **Precision (Positive Predictive Value):** Fraction of flagged instances that are truly positive:
  $$\text{Precision} = \frac{TP}{TP + FP}$$

- **$F_1$-Score:** Harmonic mean balancing Precision and Recall:
  $$F_1 = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2TP}{2TP + FP + FN}$$

#### The Wilcoxon-Mann-Whitney Theorem for ROC-AUC
Let $n_+$ be the number of positive instances ($y_i = 1$) and $n_-$ be the number of negative instances ($y_j = 0$). Let $\hat{s}_i \in [0, 1]$ denote the model's predicted risk score for instance $i$.

The area under the parametric curve $\text{AUC} = \int_0^1 \text{TPR}(\text{FPR}) d\text{FPR}$ is mathematically equivalent to the normalized Mann-Whitney rank sum:

$$
\text{AUC} = \mathbb{P}\left(\hat{s}_i > \hat{s}_j \mid y_i = 1, y_j = 0\right) = \frac{1}{n_+ n_-} \sum_{i: y_i = 1} \sum_{j: y_j = 0} \left[ \mathbb{I}(\hat{s}_i > \hat{s}_j) + \frac{1}{2} \mathbb{I}(\hat{s}_i = \hat{s}_j) \right]
$$

#### Key Invariants:
- $\text{AUC} = 0.5$: Baseline performance of pure random guessing (the diagonal line).
- $\text{AUC} = 1.0$: Perfect discrimination; the minimum positive score strictly exceeds the maximum negative score.
- $\text{AUC} < 0.5$: Systematic inversion; flipping the predicted labels yields an AUC of $1 - \text{AUC}$.

يمنحنا هذا التطابق الرياضي القدرة على حساب AUC عبر مقارنة أزواج العينات ورتبها الترتيبية (Rank-Sum) دون الحاجة إلى تكاملات عددية معقدة. فإذا اختير مريض ومريض سليم عشوائياً، يعبر AUC عن فرصة تفوق درجة خطورة المريض الحقيقي على السليم.

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
    pos_scores = y_score[y_true == 1]
    neg_scores = y_score[y_true == 0]
    n_pos = len(pos_scores)
    n_neg = len(neg_scores)
    
    # 1. Wilcoxon-Mann-Whitney AUC via pairwise comparisons
    # Broadcasting: compare each positive score against each negative score
    concordant = np.sum(pos_scores[:, None] > neg_scores[None, :])
    ties = np.sum(pos_scores[:, None] == neg_scores[None, :])
    auc = float((concordant + 0.5 * ties) / (n_pos * n_neg))
    
    # 2. Confusion matrix at tau = 0.5
    y_pred = (y_score >= 0.5).astype(int)
    tp = float(np.sum((y_true == 1) & (y_pred == 1)))
    fp = float(np.sum((y_true == 0) & (y_pred == 1)))
    fn = float(np.sum((y_true == 1) & (y_pred == 0)))
    
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

### Practical ML Transfer Challenge

#### Scenario: Production Alert Fatigue in Cybersecurity
A bank deploys a real-time deep learning model to flag malicious login attempts. Out of 10,000,000 daily logins, only 1,000 are malicious ($0.01\%$ positive rate). The offline validation report proudly highlights an extraordinary $\text{ROC-AUC} = 0.985$.

However, in production, the cybersecurity operations center is overwhelmed: out of 50,000 login alerts triggered every day, 49,100 are false alarms. Security analysts are suffering from severe alert fatigue and threatening to ignore the tool entirely.

**Diagnostic Question:** Why does an exceptional ROC-AUC of 0.985 disguise such terrible precision on imbalanced data?

- **Option A (Correct):** The ROC curve plots FPR on the x-axis, whose denominator is the massive pool of True Negatives ($9,999,000$). Even a tiny FPR of $0.5\%$ generates $\approx 50,000$ False Positives. Because Precision evaluates False Positives against the tiny pool of True Positives, the Precision drops below $2\%$. The engineering team should evaluate the model using the Precision-Recall Curve (PR-AUC) rather than ROC-AUC.
- **Option B:** Because the Wilcoxon-Mann-Whitney test is only mathematically valid when sample sizes are smaller than 100.
- **Option C:** The ROC-AUC was computed using natural logarithms rather than base-2 binary logarithms.
- **Option D:** Because True Positives and False Positives cancel each other out in the Sigmoid derivative.
