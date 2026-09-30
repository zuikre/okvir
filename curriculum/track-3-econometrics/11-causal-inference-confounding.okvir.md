---
id: "causal-inference-confounding"
version: "1.0.0"
title: "Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation"
track: "econometrics"
module: "mod-23"
estimated_minutes: 15
prerequisites: ["selection-bias-randomized-trials", "bad-controls-mediators-overcontrolling"]
i18n:
  ar: "المخططات السببية الموجهة غير الدائرية ومسارات الفصل d"
---

# Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation

Judea Pearl modernized causal inference by translating counterfactual calculus into non-parametric Directed Acyclic Graphs (DAGs). A DAG encodes our causal assumptions about the universe: nodes represent random variables, and directed arrows represent direct causal mechanisms.

Information flows along paths in a graph like electric current. To establish causal identification, we must allow the true causal signal from treatment $X$ to outcome $Y$ to pass, while systematically blocking all non-causal 'back-door' paths. The concept of d-separation provides the definitive mathematical rulebook

:::simulation-widget{engine="canvas2d" component="CausalDagBackdoorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
X \longrightarrow M \longrightarrow Y
$$

أحدث جوديا بيرل (Judea Pearl) ثورة في الاستدلال السببي بترجمة حسابات الفروض المقابلة للواقع إلى مخططات بيانية موجهة غير دائرية (DAGs). يجسد مخطط DAG فرضياتنا السببية حول العالم: تمثل العقد متغيرات عشوائية، بينما تمثل الأسهم الموجهة آليات سببية مباشرة.

تتدفق المعلومات عبر مسارات الرسم البياني كما يتدفق التيار الكهربائي. ولتحقيق التعريف السببي (Causal Identification)، يجب ضمان وصول الإشارة السببية الصريحة من $X$ إلى $Y$، مع قطع وحظر كافة المسارات الخلفية غير السببية (Back-Door Paths). تضع قواعد الفصل الاتجاهي (d-separation) الشروط الرياضية الدقيقة لذلك:
1. السلسلة ($X \to Z \to Y$): تنقل ال

:::python-challenge{id="py-causal-inference-confounding"}
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

def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:
    """
    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.
    """
    # TODO: Stratify by z, compute within-stratum treatment effects, weight by P(Z)
    pass
```
:::
