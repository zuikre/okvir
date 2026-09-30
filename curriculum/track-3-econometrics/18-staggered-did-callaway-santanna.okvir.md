---
id: "staggered-did-callaway-santanna"
version: "1.0.0"
title: "Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna"
track: "econometrics"
module: "mod-26"
estimated_minutes: 15
prerequisites: ["difference-in-differences-2x2"]
i18n:
  ar: "الفرق في الفروق المتدرج وانهيار نموذج الآثار الثابتة الثنائي"
---

# Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna

Between 2018 and 2021, an econometric revolution swept empirical economics. For three decades, researchers analyzed policies adopted across different states at different times (staggered rollout) using standard Two-Way Fixed Effects (TWFE) regressions: $y_{it} = \alpha_i + \lambda_t + \beta^{\text{TWFE}} D_{it} + \varepsilon_{it}$.

Goodman-Bacon (2021) and Sun & Abraham (2021) proved that $\hat{\beta}^{\text{TWFE}}$ is a weighted average of all possible $2 \times 2$ DiD comparisons. Crucially, under staggered adoption and dynamic treatment effects (effects growing over time), already-treated

:::simulation-widget{engine="canvas2d" component="StaggeredDiDEventStudyLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\hat{\beta}^{\text{TWFE}} = \sum_{k \ne U} s_{kU} \hat{\beta}_{kU}^{\text{DiD}} + \sum_{k < l} \left[ s_{kl}^k \hat{\beta}_{kl}^{k, \text{DiD}} + s_{kl}^l \hat{\beta}_{kl}^{l, \text{DiD}} \right]
$$

بين عامي 2018 و 2021، اجتاحت الاقتصاد القياسي ثورة منهجية كبرى. لعقود طويلة، قام الباحثون بتحليل السياسات المطبقة في أوقات متفرقة عبر ولايات مختلفة (Staggered Adoption) باستخدام نموذج الآثار الثابتة ثنائي الاتجاه (TWFE): $y_{it} = \alpha_i + \lambda_t + \beta^{\text{TWFE}} D_{it} + \varepsilon_{it}$.

أثبت غودمان-بيكون (Goodman-Bacon, 2021) أن مقدر TWFE هو متوسط مرجح لجميع مقارنات DiD الممكنة. وعندما تتفاوت تواريخ التطبيق وتتغير آثار السياسة بمرور الوقت، تُستخدم الوحدات المعالجة مبكرًا كمجموعات ضابطة للوحدات المعالجة لاحقًا، مما يولد أوزانًا سالبة (Negative Weights)! قد يؤدي ذلك إلى ظه

:::python-challenge{id="py-staggered-did-callaway-santanna"}
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

def fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict[int, float]:
    """
    Estimates dynamic DiD leads and lags, omitting ref_period to test parallel trends.
    """
    # TODO: Build relative time dummies, omit ref_period, fit OLS
    pass
```
:::
