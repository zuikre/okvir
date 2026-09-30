---
id: "roc-auc-confusion-matrix"
version: "1.0.0"
title: "Classification Metrics, ROC Curves & The Mann-Whitney Equivalence"
track: "econometrics"
module: "mod-30"
estimated_minutes: 15
prerequisites: ["logistic-regression-sigmoid"]
i18n:
  ar: "مقاييس التصنيف ومنحنيات ROC ومكافأة مان-ويتني الإحصائية"
---

# Classification Metrics, ROC Curves & The Mann-Whitney Equivalence

Accuracy is a dangerously misleading metric in imbalanced classification. If $99\%$ of credit card transactions are legitimate, a model predicting 'always legitimate' achieves $99\%$ accuracy while failing entirely at fraud detection. We must evaluate performance across all possible classification thresholds.

The Receiver Operating Characteristic (ROC) curve plots True Positive Rate against False Positive Rate. The Area Under the Curve (ROC-AUC) is one of the most celebrated summary statistics in machine learning. Yet few practitioners realize its profound mathematical connection: The ROC-A

:::simulation-widget{engine="canvas2d" component="LogisticIRLSCurvatureLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{TPR}(T) = \frac{TP(T)}{P} = \frac{\sum_{i: y_i=1} \mathbf{1}(\hat{p}_i \ge T)}{N_1}
$$

تُعد دقة التصنيف (Accuracy) مقياسًا خادعًا وخطيرًا عند التعامل مع فئات غير متوازنة. إذا كانت $99\%$ من المعاملات البنكية سليمة، فإن نموذجًا يتنبأ دائمًا بأن المعاملة 'سليمة' سيحقق دقة $99\%$ رغم فشله الذريع في اكتشاف أي احتيال. لذا يلزم تقييم الأداء عبر كافة عتبات القرار الممكنة.

يرسم منحنى خصائص التشغيل للمستقبِل (ROC Curve) معدل الإيجابيات الحقيقية مقابل معدل الإيجابيات الخاطئة. وتُعد المساحة تحت المنحنى (ROC-AUC) من أهم المقاييس المعتمدة. لكن قلة من الممارسين يدركون الرابط الرياضي العميق: المساحة ROC-AUC تتطابق رياضيًا تمامًا مع إحصاء مان-ويتني اللامعلمي (Wilcoxon-Mann-Whitney Test)! ف

:::python-challenge{id="py-roc-auc-confusion-matrix"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import numpy as np

def compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:
    """
    Computes numerically stable multiclass Softmax cross-entropy loss and gradient.
    """
    # TODO: Subtract row max for stability, compute probs, loss, and gradient
    pass
```
:::
