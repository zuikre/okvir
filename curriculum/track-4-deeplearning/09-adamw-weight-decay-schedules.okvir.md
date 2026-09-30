---
id: "adamw-weight-decay-schedules"
version: "1.0.0"
title: "Root Mean Square Normalization (RMSNorm) & Scale Highway"
track: "deeplearning"
module: "mod-37"
estimated_minutes: 15
prerequisites: ["momentum-rmsprop-adaptive"]
i18n:
  ar: "تطبيع متوسط المربعات الجذري وطريق التدفق القياسي"
---

# Root Mean Square Normalization (RMSNorm) & Scale Highway

While Layer Normalization achieved monumental success in early Transformer architectures (original Transformer, BERT, GPT-2), researchers noticed a curious empirical property: the computational overhead of computing the mean $\mu$, subtracting it from every feature coordinate, and tracking the backward gradients through the mean subtraction was consuming significant GPU memory bandwidth without offering substantial regularization benefits.

In 2019, Biao Zhang and Rico Sennrich conducted an in-depth empirical investigation: does the mean-centering property ($\mathbf{x} - \mu$) actually matte

:::simulation-widget{engine="canvas2d" component="ResidualHighwayLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{RMS}(\mathbf{x}) = \sqrt{\frac{1}{d} \sum_{i=1}^d x_i^2 + \epsilon}, \quad \bar{x}_i = \frac{x_i}{\text{RMS}(\mathbf{x})} \gamma_i
$$

تعمل تقنية "تطبيع متوسط المربعات الجذري" (RMSNorm) على تبسيط تطبيع الطبقات التقليدي عبر إقصاء خطوة حساب المتوسط وطرحه، وإلغاء متجهات الانحياز الإضافية. ومن خلال معايرة التمثيلات الخفية حصراً بناءً على جذر متوسط مربعاتها، تحافظ RMSNorm على خاصية ثبات المقياس الرياضي مع تقليل عمليات قراءة وكتابة الذاكرة. يثمر هذا التبسيط سرعة تنفيذ أعلى لكيرنل المعالجة وتقليلاً للضغط على ناقل الذاكرة دون أي مساومة على جودة النموذج أو استقرار تدريبه.

:::python-challenge{id="py-adamw-weight-decay-schedules"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def rms_norm_forward(
    x: np.ndarray,
    gamma: np.ndarray,
    eps: float = 1e-6,
    residual: np.ndarray | None = None
) -> tuple[np.ndarray, np.ndarray]: ...
```
:::
