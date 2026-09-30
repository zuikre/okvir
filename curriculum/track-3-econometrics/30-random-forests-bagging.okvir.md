---
id: "random-forests-bagging"
version: "1.0.0"
title: "Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion"
track: "econometrics"
module: "mod-32"
estimated_minutes: 15
prerequisites: ["decision-trees"]
i18n:
  ar: "أشجار التدرج المعزز والتوسيع الرياضي من الرتبة الثانية في XGBoost"
---

# Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion

While Random Forests build deep trees in parallel to reduce variance, Gradient Boosting (Friedman, 2001) builds shallow trees sequentially to reduce bias. Gradient Boosting performs gradient descent in function space: each new tree fits the negative gradient (pseudo-residuals) of the loss function with respect to current predictions.

Tianqi Chen (2016) revolutionized this paradigm with XGBoost (Extreme Gradient Boosting). Instead of relying solely on first-order gradients, XGBoost takes an exact second-order Taylor expansion of any arbitrary, custom loss function. This yields exact closed

:::simulation-widget{engine="canvas2d" component="GBMPseudoResidualWaterfallLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{L}^{(t)} = \sum_{i=1}^N L(y_i, \hat{y}_i^{(t-1)} + f_t(\mathbf{x}_i)) + \Omega(f_t)
$$

بينما تبني الغابات العشوائية أشجارًا عميقة على التوازي لتخفيض التباين، يقوم التعزيز المتدرج (Gradient Boosting - Friedman) ببناء أشجار ضحلة بشكل تتابعي لتخفيض التحيز. يطبق التعزيز المتدرج خوارزمية الانحدار المتدرج في فضاء الدوال: حيث تتدرب كل شجرة جديدة على التدرج السالب (البواقي الزائفة Pseudo-Residuals) لدالة الخسارة.

أحدث تيانكي تشن (Tianqi Chen, 2016) نقلة نوعية عبر XGBoost. فبدلاً من الاكتفاء بتدرجات الرتبة الأولى، يطبق XGBoost توسيع تايلور الدقيق من الرتبة الثانية على أي دالة خسارة عامة. يفرز هذا التوسيع صيغًا رياضية تحليلية مغلقة لحساب أوزان الأوراق المثلى ومكاسب التفرع (Split Gain

:::python-challenge{id="py-random-forests-bagging"}
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

def compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = "mse") -> tuple[np.ndarray, float]:
    """
    Computes functional negative gradient pseudo-residuals and optimal constant step gamma.
    """
    # TODO: Compute negative loss gradients and optimal line-search step for MSE or MAE
    pass
```
:::
