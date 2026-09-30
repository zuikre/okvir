---
id: "pure-functions-recursion"
version: "1.0.0"
title: "Pure Functions, Referential Transparency & Stack Frames"
track: "programming"
module: "mod-09"
estimated_minutes: 15
prerequisites: ["iteration-state-accumulation"]
i18n:
  ar: "الدوال النقية، الشفافية الإسنادية، وأطر مكدس الاستدعاء"
---

# Pure Functions, Referential Transparency & Stack Frames

When you learned mathematics in school, a function like $f(x) = x^2$ had a sacred property: if you plugged in $3$, you got $9$. It did not matter whether you asked on a Tuesday, in the rain, or on the moon—$f(3)$ was always $9$. Furthermore, computing $f(3)$ did not cause your house lights to flicker or your bank balance to change.

In computer programming, this is called a Pure Function. A pure function has two golden rules:
1. It yields the exact same return value whenever given the exact same arguments.
2. It causes zero Side Effects—it does not alter any global variables, write t

:::simulation-widget{engine="canvas2d" component="ReferentialTransparencyLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\forall x \in \mathcal{A}, \quad \mu_{\text{pre}} \xrightarrow{f(x)} \langle y, \mu_{\text{post}} \rangle \implies \mu_{\text{pre}} \equiv \mu_{\text{post}} \quad \land \quad y = f(x)
$$

في الرياضيات المدرسية، عندما نقول $f(x) = x^2$، فإن هذا الاقتران يمتلك قدسية خاصة: إذا عوضت بالرقم $3$، ستحصل حتماً على $9$. لن يتغير الناتج إن حسبته يوم الجمعة أو تحت المطر. والأهم من ذلك: حساب $f(3)$ لن يتسبب في تشغيل مكنسة كهربائية في غرفتك!
في هندسة البرمجيات، يُطلق على هذا الدالة النقية (Pure Function). تمتلك الدالة النقية ركيزتين:
1. تعطي نفس القيمة دائماً عند تمرير نفس المدخلات.
2. لا تسبب أي آثار جانبية (Side Effects)، فلا تغير متغيراً عاماً خارجها، ولا تكتب على القرص الصلب، ولا تطبع نصوصاً خفية.
هذا يمنحها خاصية الشفافية الإسنادية (Referential Transparency): يمكنك استبدال

:::python-challenge{id="py-pure-functions-recursion"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Any

def pure_min_max_scale(
    records: list[dict[str, Any]], 
    target_key: str, 
    feature_range: tuple[float, float] = (0.0, 1.0)
) -> list[dict[str, Any]]:
    """
    Purely transforms a list of record dicts by scaling target_key into feature_range,
    guaranteeing zero mutation to input dictionaries.

    Args:
        records: List of dictionaries representing tabular records.
        target_key: The numeric field to scale.
        feature_range: Target interval (a, b).

    Returns:
        A new list of freshly allocated dictionaries with scaled target_key.
    """
    # TODO: Implement pure scaling without in-place mutation
    raise NotImplementedError("Implement pure_min_max_scale")
```
:::
