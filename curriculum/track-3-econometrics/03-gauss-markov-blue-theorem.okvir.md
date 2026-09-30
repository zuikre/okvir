---
id: "gauss-markov-blue-theorem"
version: "1.0.0"
title: "The Gauss-Markov Theorem & BLUE Estimator"
track: "econometrics"
module: "mod-19"
estimated_minutes: 15
prerequisites: ["ols-residual-geometry", "central-limit-theorem"]
i18n:
  ar: "مبرهنة غاوس-ماركوف وأفضل مقدر خطي غير متحيّز"
---

# The Gauss-Markov Theorem & BLUE Estimator

Why do econometricians almost universally start with OLS rather than another linear estimator? The Gauss-Markov Theorem provides the foundational justification: under five core conditions (linearity, full rank, strict exogeneity, homoskedasticity, and no serial correlation), the OLS estimator is BLUE (Best Linear Unbiased Estimator). That is, among ALL conceivable estimators that are linear in $\mathbf{y}$ and unbiased, OLS achieves the minimum sampling variance for every linear combination of the parameters.

This theorem is remarkably powerful because it requires no distributional assumption

:::simulation-widget{engine="canvas2d" component="GaussMarkovEfficiencyLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbb{E}[\boldsymbol{\varepsilon}\boldsymbol{\varepsilon}^T \mid \mathbf{X}] = \sigma^2 \mathbf{I}_N
$$

لماذا يبدأ علماء القياس الاقتصادي دومًا بمقدر المربعات الصغرى OLS بدلاً من أي مقدر خطي آخر؟ تقدم مبرهنة غاوس-ماركوف (Gauss-Markov Theorem) الإجابة التأسيسية: في ظل خمس فرضيات جوهرية (الخطية، الرتبة الكاملة، الاستقلال الخارجي التام، تجانس التباين، وغياب الارتباط الذاتي)، فإن مقدر OLS هو الأفضل خطيًا وغير متحيّز (BLUE: Best Linear Unbiased Estimator). أي أنه من بين جميع المقدرات الخطية غير المتحيزة الممكنة، يمتلك OLS أصغر تباين للمعاينة.

تكمن قوة هذه المبرهنة في أنها لا تفترض أي توزيع احتمالي محدد (كالفرضي الطبيعي للخطأ). ومع ذلك، في التطبيقات الاقتصادية الحقيقية، تندر مصادفة فرضية تجانس التباي

:::python-challenge{id="py-gauss-markov-blue-theorem"}
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

def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:
    """
    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.
    """
    # TODO: Calculate beta, residuals, s^2, vcov, SEs, and t_stats
    pass
```
:::
