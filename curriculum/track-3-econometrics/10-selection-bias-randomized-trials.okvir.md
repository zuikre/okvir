---
id: "selection-bias-randomized-trials"
version: "1.0.0"
title: "Selection Bias Decomposition & Randomized Controlled Trials"
track: "econometrics"
module: "mod-22"
estimated_minutes: 15
prerequisites: ["rubin-causal-model-potential-outcomes"]
i18n:
  ar: "تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة"
---

# Selection Bias Decomposition & Randomized Controlled Trials

When journalists or naive analysts compare the average outcomes of treated versus untreated groups, they commit the classic fallacy of conflating correlation with causation. People who go to the hospital are on average sicker than people who stay home; does this mean hospitals cause sickness?

By mathematically decomposing the naive difference in sample means, we discover that it equals the true Average Treatment Effect on the Treated (ATT) PLUS Selection Bias. Randomized Controlled Trials (RCTs) are considered the gold standard of causal inference precisely because random lottery assignme

:::simulation-widget{engine="canvas2d" component="SelectionBiasPropensityLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\Delta_{\text{naive}} \equiv \mathbb{E}[Y_i \mid D_i = 1] - \mathbb{E}[Y_i \mid D_i = 0]
$$

عندما يقارن الصحفيون أو المحللون السطحيون متوسط نتائج المجموعات المعالجة بمتوسط المجموعات غير المعالجة، فإنهم يقعون في الفخ الكلاسيكي لخلط الارتباط بالسببية. فالأشخاص الذين يرتادون المستشفيات هم في المتوسط أكثر مرضًا من الذين يبقون في منازلهم؛ فهل يعني ذلك أن المستشفيات تسبب المرض؟

عند تفكيك الفرق البسيط بين المتوسطين رياضيًا، نكتشف أنه يساوي الأثر السببي الحقيقي (ATT) مضافًا إليه انحياز الاختيار (Selection Bias). تُعد التجارب العشوائية المضبوطة (RCTs) المعيار الذهبي في الاستدلال السببي لأن التخصيص العشوائي بالقرعة يقطع أي صلة بين النتائج المحتملة وقرار تلقي المعالجة، مما يجعل انحياز الاخ

:::python-challenge{id="py-selection-bias-randomized-trials"}
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

def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:
    """
    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.
    """
    # TODO: Clip extreme propensity scores and calculate weighted treatment effect
    pass
```
:::
