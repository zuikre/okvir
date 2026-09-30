---
id: "collider-conditioning-berksons"
version: "1.0.0"
title: "Collider Conditioning & Berkson's Paradox"
track: "econometrics"
module: "mod-23"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding"]
i18n:
  ar: "تكييف المصادم ومفارقة بيركسون"
---

# Collider Conditioning & Berkson's Paradox

Joseph Berkson (1946) discovered a bizarre empirical anomaly in hospital statistics: two diseases that were completely unrelated in the general population showed a strong negative association among hospitalized patients. This phenomenon, generalized by Judea Pearl as Collider Stratification Bias, is one of the most counter-intuitive traps in data science.

A collider occurs when two independent causes $A$ and $B$ both influence a shared outcome $C$ ($A \to C \leftarrow B$). When a researcher conditions on $C$ (or filters data by $C$), knowing that $A$ is absent suddenly makes $B$ dramatica

:::simulation-widget{engine="canvas2d" component="ColliderStratificationLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
P(A = 1) = p_A, \quad P(B = 1) = p_B, \quad P(A=1, B=1) = p_A p_B
$$

اكتشف جوزيف بيركسون (Berkson, 1946) ظاهرة غريبة في إحصاءات المستشفيات: مرضان لا صلة بينهما إطلاقًا في المجتمع العام أظهرا ارتباطًا سالبًا قويًا بين المرضى المقيمين في المستشفى. هذه الظاهرة، التي عممها جوديا بيرل لاحقًا تحت مسمى انحياز تكييف المصادم (Collider Stratification Bias)، تعد واحدة من أكثر الفخاخ خداعًا للحدس في علم البيانات.

يحدث المصادم عندما يؤثر سببان مستقلان $A$ و $B$ في نتيجة مشتركة $C$ ($A \to C \leftarrow B$). عندما يقتصر الباحث على دراسة شريحة معينة محددة بـ $C$ (أي التكييف على $C$)، فإن معرفة غياب السبب $A$ تجعل وجود السبب $B$ أكثر ترجيحًا لتفسير حدوث $C$. يولّد هذا الإج

:::python-challenge{id="py-collider-conditioning-berksons"}
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

def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:
    """
    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.
    """
    # TODO: Generate independent X and Y, construct collider C, run unconditioned and conditioned OLS
    pass
```
:::
