---
id: "numerically-stable-softmax-cross-entropy"
version: "1.0.0"
title: "Log-Sum-Exp Trick & Numerically Stable Cross-Entropy"
track: "deeplearning"
module: "mod-36"
estimated_minutes: 15
prerequisites: ["perceptron-activation", "logistic-regression-sigmoid"]
i18n:
  ar: "حيلة اللوغاريتم لمجموع الأسس والاستقرار العددي لدالة الخسارة التقاطعية"
---

# Log-Sum-Exp Trick & Numerically Stable Cross-Entropy

In multi-class classification and autoregressive language modeling, a neural network outputs unnormalized log-probabilities called logits $\mathbf{z} \in \mathbb{R}^V$ over a vocabulary of size $V$. To convert these logits into a valid probability distribution $\mathbf{p}$, we pass them through the softmax operator:

:::simulation-widget{engine="canvas2d" component="OptimizationDynamicsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
p_i = \frac{e^{z_i}}{\sum_{j=1}^V e^{z_j}}
$$

يؤدي الحساب المباشر لاحتمالات التوزيع الاحتمالي (Softmax) متبوعاً بحساب اللوغاريتم إلى عدم استقرار عددي كارثي عند استخدام أرقام الفاصلة العائمة محدودة الدقة. تحل "حيلة لوغاريتم مجموع الأسس" (Log-Sum-Exp Trick) هذه المعضلة بنقل متجهات القيم المنطقية (Logits) عبر طرح قيمتها العظمى قبل الرفع الأسي. يضمن هذا التحويل التحليلي حصر جميع الأسس داخل النطاق $(-\infty, 0]$، فتتحول القيمة العظمى حتماً إلى $e^0 = 1.0$، مما يمنع تجاوز سعة التخزين (Overflow) وتلاشي المقام إلى الصفر (Underflow).

:::python-challenge{id="py-numerically-stable-softmax-cross-entropy"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]: ...
# logits: (N, C) float array of unbounded logits
# targets: (N,) integer array of ground-truth class labels 0 <= targets[i] < C
# Returns: (loss: float, grad: np.ndarray of shape (N, C))
```
:::
