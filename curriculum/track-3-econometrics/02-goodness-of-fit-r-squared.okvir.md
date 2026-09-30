---
id: "goodness-of-fit-r-squared"
version: "1.0.0"
title: "Goodness-of-Fit, R-squared, and the ANOVA Decomposition"
track: "econometrics"
module: "mod-18"
estimated_minutes: 15
prerequisites: ["ols-residual-geometry"]
i18n:
  ar: "جودة التوفيق ومعامل التحديد والتفكيك التبايني"
---

# Goodness-of-Fit, R-squared, and the ANOVA Decomposition

Once the regression hyperplane is determined, researchers need to quantify how much of the outcome's variation has been explained by the model. The Analysis of Variance (ANOVA) decomposition splits the total sample variance into explained variation and unexplained noise.

Because $\hat{\mathbf{y}}$ and $\mathbf{e}$ are mutually orthogonal vectors in $\mathbb{R}^N$, the Pythagorean theorem applies directly to their squared lengths. The coefficient of determination, $R^2$, measures the cosine squared of the angle between the centered outcome vector and its projection. In empirical research, howe

:::simulation-widget{engine="canvas2d" component="ColumnSpaceProjection3D"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\boldsymbol{\iota}^T \mathbf{e} = \sum_{i=1}^N e_i = 0 \implies \bar{y} = \bar{\hat{y}}
$$

بعد تحديد المستوى الفائق للانحدار، يحتاج الباحث إلى قياس النسبة التي استطاع النموذج تفسيرها من تباين المتغير التابع. يقوم تفكيك تحليل التباين (ANOVA) بتقسيم التباين الإجمالي إلى تباين مفسَّر بواسطة النموذج وضجيج غير مفسَّر.

ونظرًا لتعامد المتجه التقديري $\hat{\mathbf{y}}$ ومتجه البواقي $\mathbf{e}$ في الفضاء الإقليدي $\mathbb{R}^N$، تنطبق مبرهنة فيثاغورس مباشرة على أطوالهما المربعة. يمثل معامل التحديد $R^2$ مربع جيب تمام الزاوية بين المتغير التابع الممركز ومسقطه. ولكن في الاقتصاد القياسي التجريبي، يُعد $R^2$ من أكثر المقاييس إساءةً للفهم؛ فالقيمة المرتفعة له لا تعني إطلاقًا صلاحية سببية، وإضا

:::python-challenge{id="py-goodness-of-fit-r-squared"}
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

def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:
    """
    Computes ANOVA variance components, R^2, and adjusted R^2.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        True target values.
    y_hat : np.ndarray of shape (N,)
        Model predictions.
    p : int
        Number of slopes (regressors excluding intercept).
    """
    # TODO: Compute TSS, ESS, SSR, R^2, and adjusted R^2
    pass
```
:::
