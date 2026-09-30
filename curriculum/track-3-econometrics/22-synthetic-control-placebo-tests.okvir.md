---
id: "synthetic-control-placebo-tests"
version: "1.0.0"
title: "Synthetic Controls Inference & In-Space / In-Time Permutation Tests"
track: "econometrics"
module: "mod-28"
estimated_minutes: 15
prerequisites: ["synthetic-control-method"]
i18n:
  ar: "الاستدلال الإحصائي للتحكم الاصطناعي واختبارات التباديل المكانية والزمنية"
---

# Synthetic Controls Inference & In-Space / In-Time Permutation Tests

Because the Synthetic Control Method is applied to aggregate macro data with only ONE treated unit ($N=1$), classical large-sample asymptotic $t$-tests and standard errors are mathematically inapplicable. How can a researcher determine if California's tobacco reduction is statistically significant, or just random noise?

Abadie, Diamond, and Hainmueller (2010) introduced Permutation Inference (Placebo Tests): 1. In-Space Placebos: Sequentially apply SCM to every single donor state in the control pool as if it had passed the policy. If California's gap is vastly larger than all the plac

:::simulation-widget{engine="canvas2d" component="SCMPlaceboPermutationLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{RMSPE}_{\text{pre}} = \sqrt{\frac{1}{T_0} \sum_{t=1}^{T_0} \left( Y_{1t} - \sum_{j=2}^{J+1} w_j^* Y_{jt} \right)^2}
$$

نظرًا لأن طريقة التحكم الاصطناعي تُطبق على بيانات كلية بوحدة معالجة واحدة فقط ($N=1$)، فإن نظريات العينات الكبيرة واختبارات $t$ الكلاسيكية تصبح غير قابلة للتطبيق رياضيًا. فكيف يمكن للباحث الجزم بأن انخفاض استهلاك السجائر في كاليفورنيا ذو دلالة إحصائية وليس مجرد صدفة؟

ابتكر أباديه وزملاؤه اختبارات التباديل الوهمية (Placebo Permutation Tests):
1. الوهم المكاني (In-Space Placebo): تطبيق خوارزمية SCM بالتتابع على كل ولاية مانحة كأنها تلقت السياسة فعلاً. إذا كان الانحراف في كاليفورنيا أكبر بكثير من كل الولايات الوهمية، فإن الأثر حقيقي.
2. نسبة RMSPE: مقارنة نسبة خطأ ما بعد التدخل إلى خ

:::python-challenge{id="py-synthetic-control-placebo-tests"}
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

def compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict[str, object]:
    """
    Computes RMSPE ratios and exact permutation p-value across treated and placebo donors.
    """
    # TODO: Compute RMSPE post/pre ratios and empirical rank p-value
    pass
```
:::
