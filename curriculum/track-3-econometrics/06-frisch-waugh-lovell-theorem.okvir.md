---
id: "frisch-waugh-lovell-theorem"
version: "1.0.0"
title: "The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out"
track: "econometrics"
module: "mod-20"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus", "four-fundamental-subspaces"]
i18n:
  ar: "مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات"
---

# The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out

The Frisch-Waugh-Lovell (FWL) theorem is celebrated as one of the most elegant and practically useful theorems in econometrics. It answers a fundamental question: what does it truly mean to 'control for' a variable $X_2$ when estimating the effect of $X_1$ on $Y$?

FWL proves that the multivariate regression coefficient on $X_1$ can be obtained via a simple three-step procedure: 1. Regress $Y$ on $X_2$ and keep the residuals $\tilde{\mathbf{y}}$ (removing all variation in $Y$ explainable by $X_2$). 2. Regress $X_1$ on $X_2$ and keep the residuals $\tilde{\mathbf{x}}_1$ (purging $X_1$ of all co

:::simulation-widget{engine="canvas2d" component="FWLPartiallingOutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{y} = \mathbf{X}_1 \boldsymbol{\beta}_1 + \mathbf{X}_2 \boldsymbol{\beta}_2 + \boldsymbol{\varepsilon}
$$

تُعد مبرهنة فريش-وو-لوفيل (FWL) واحدة من أرقى وأهم النظريات في القياس الاقتصادي. فهي تجيب بدقة متناهية عن المعنى الرياضي لعبارة 'التحكم في المتغير $X_2$' عند دراسة أثر $X_1$ على $Y$.

تثبت النظرية أنه يمكن الحصول على معامل الانحدار المتعدد الخاص بـ $X_1$ عبر ثلاث خطوات بسيطة:
1. انحدار $Y$ على $X_2$ والاحتفاظ بالبواقي $\tilde{\mathbf{y}}$ (تجريد $Y$ من كل ما يفسره $X_2$).
2. انحدار $X_1$ على $X_2$ والاحتفاظ بالبواقي $\tilde{\mathbf{x}}_1$ (تجريد $X_1$ من أي تداخل مع $X_2$).
3. إجراء انحدار بسيط للباقي $\tilde{\mathbf{y}}$ على الباقي $\tilde{\mathbf{x}}_1$.
إن ميل هذا الانحدار البسيط يتطابق تما

:::python-challenge{id="py-frisch-waugh-lovell-theorem"}
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

def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.
    """
    # TODO: Partial out X2 from y and X1, then compare with full regression
    pass
```
:::
