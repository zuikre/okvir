---
id: "tuples-immutability-sets"
version: "1.0.0"
title: "Pointers, References, Aliasing & Mutation"
track: "programming"
module: "mod-10"
estimated_minutes: 15
prerequisites: ["hash-tables-dict-internals"]
i18n:
  ar: "المؤشرات، الدلالات المرجعية، والأسماء المستعارة (Aliasing)"
---

# Pointers, References, Aliasing & Mutation

In the digital world, there is a monumental difference between having two identical cars, and having two sets of keys to the same car. 

If you own a red sedan and your neighbor owns an identical red sedan, you have two distinct objects that happen to look equal. If you dent your fender, your neighbor's car remains pristine. 
However, if you and your spouse both have keys to the same red sedan, there is only one car. If your spouse takes the car and paints it bright yellow, the next time you walk into the garage, your car is yellow!

In Python:
 Two keys to the same object is called Ali

:::simulation-widget{engine="canvas2d" component="RecursionTreeExplorer"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\begin{aligned}
a == b &\iff \text{val}(a) \equiv \text{val}(b) \\
a \text{ is } b &\iff \text{addr}(a) = \text{addr}(b)
\end{aligned}
$$

في العالم الرقمي، هناك فارق جوهري هائل بين أن تمتلك سيارتين متطابقتين، وبين أن تمتلك نسختين من المفاتيح لـ نفس السيارة الوحيدة.
إذا اشتريت سيارة بيضاء واشترى جارك سيارة بيضاء مطابقة، فهما كائنان منفصلان. إذا صدمت سيارتك، فلن تتأثر سيارة جارك.
أما إذا كنت أنت وشريكك تمتلكان نسختين من المفاتيح لذات السيارة، فهناك سيارة واحدة فقط في الواقع. إذا استخدم شريكك نسخته وقام بطلاء السيارة باللون الأسود، فعندما تفتح أنت المرآب ستجد سيارتك سوداء!
في بايثون:
 وجود اسمين يشيران لذات الكائن في الذاكرة يسمى الاسم المستعار (Aliasing)، ونتحقق منه عبر is (فحص هوية العنوان الفيزيائي).
 وجود كائنين منفصل

:::python-challenge{id="py-tuples-immutability-sets"}
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

def safe_deep_clone_graph(obj: Any) -> Any:
    """
    Deeply clones a complex Python data structure, preserving DAG topology
    and circular references via object identity memoization.

    Args:
        obj: Arbitrary nested Python structure (dict, list, set, tuple, primitives).

    Returns:
        A completely isolated deep clone with preserved reference topologies.
    """
    # TODO: Implement memoized deep copy with cycle handling
    raise NotImplementedError("Implement safe_deep_clone_graph")
```
:::
