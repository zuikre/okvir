---
id: "knn-classification"
version: "1.0.0"
title: "Support Vector Machines (SVM), Dual Formulation & Mercer Kernels"
track: "econometrics"
module: "mod-31"
estimated_minutes: 15
prerequisites: ["roc-auc-confusion-matrix", "dot-product-geometry"]
i18n:
  ar: "آلات المتجهات الداعمة والصياغة المزدوجة ونوى ميرسر"
---

# Support Vector Machines (SVM), Dual Formulation & Mercer Kernels

Vladimir Vapnik developed Support Vector Machines (SVM) based on Structural Risk Minimization. Unlike logistic regression, which adjusts weights based on all data points, SVM seeks the unique hyperplane that maximizes the geometric margin to the closest training points on either side.

Through Lagrangian duality, the primal constrained optimization problem transforms into a dual quadratic program that depends ONLY on inner products between pairs of sample points $\langle \mathbf{x}_i, \mathbf{x}_j \rangle$. This unlocks the celebrated Kernel Trick: by replacing the inner product with a Mer

:::simulation-widget{engine="canvas2d" component="SupportVectorMachineKernelLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\max_{\mathbf{w}, b} \frac{2}{\|\mathbf{w}\|_2} \iff \min_{\mathbf{w}, b} \frac{1}{2}\|\mathbf{w}\|_2^2 \quad \text{s.t. } y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1 \; \forall i
$$

طوّر فلاديمير فابنيك (Vapnik) آلات المتجهات الداعمة (SVM) بالاستناد إلى مبدأ تقليل المخاطر الهيكلية. وعلى عكس الانحدار اللوجستي الذي تتأثر معلماته بكافة نقاط البيانات، تبحث SVM عن المستوى الفائق الفريد الذي يعظم الهامش الهندسي الفاصل (Maximum Margin) عن أقرب نقاط التدريب من كلا الجانبين.

وعبر ازدواجية لاغرانج (Lagrangian Duality)، تتحول المسألة الأولية إلى مسألة ازدواجية تعتمد حصريًا على الجداء الداخلي بين أزواج النقاط $\langle \mathbf{x}_i, \mathbf{x}_j \rangle$. وهنا تبرز خدعة النواة (Kernel Trick) الأسطورية: باستبدال الجداء الداخلي بدالة نواة ميرسر $K(\mathbf{x}_i, \mathbf{x}_j)$،

:::python-challenge{id="py-knn-classification"}
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

def svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:
    """
    Performs a single primal subgradient descent step for linear soft-margin SVM.
    """
    # TODO: Compute margins y_i * (w^T x_i + b), identify violators, compute subgradients, update w and b
    pass
```
:::
