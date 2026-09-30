---
id: "context-managers-resources"
version: "1.0.0"
title: "Asymptotic Analysis & Big-O Rigor"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["iterators-generators-streams"]
i18n:
  ar: "التحليل المقارب (Asymptotic Analysis) وتدقيق Big-O الصارم"
---

# Asymptotic Analysis & Big-O Rigor

When you evaluate how fast a software algorithm runs, you cannot use a stopwatch. Why? Because a stopwatch measures your specific laptop's hardware, whether your battery is dying, what music is playing in the background, and what programming compiler you used. A stopwatch tells you about a machine, not about the algorithm.

Computer scientists use Asymptotic Analysis (Big-O Notation) to measure the intrinsic mathematical efficiency of an idea, completely divorced from hardware.

Big-O asks one fundamental question:
"As the size of the data input ($N$) explodes toward infinity, how doe

:::simulation-widget{engine="canvas2d" component="BigOComplexityRacer"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
f(n) \in \mathcal{O}(g(n)) \iff \exists c > 0, \; n_0 \in \mathbb{N} \quad \text{such that} \quad \forall n \ge n_0, \; 0 \le f(n) \le c \cdot g(n)
$$

عندما نريد قياس سرعة خوارزمية برمجية، لا يمكننا استخدام ساعة توقيت (Stopwatch). لماذا؟ لأن ساعة التوقيت تقيس سرعة جهازك الشخصي، وحرارة معالجه، وتأثير البرامج الأخرى التي تعمل في الخلفية. ساعة التوقيت تقيس كفاءة الجهاز، لا كفاءة الفكرة الخوارزمية.
لذلك، يستخدم علماء الحاسوب التحليل المقارب (Asymptotic Analysis) المعروف بترميز Big-O.
يطرح ترميز Big-O سؤالاً جوهرياً واحداً:
"عندما ينمو حجم البيانات ($N$) ويتضخم باتجاه اللانهاية، كيف يتصاعد المجهود الحسابي المطلوب؟"
 إذا كان فحص 10 عناصر يتطلب 10 خطوات، وفحص مليون عنصر يتطلب مليون خطوة، فالنمو خطي: $O(N)$.
 إذا كان فحص 10 عناصر يتط

:::python-challenge{id="py-context-managers-resources"}
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

def deduplicate_preserve_order(items: list[Any]) -> list[Any]:
    """
    Deduplicates a list while preserving first-occurrence order in O(N) time,
    with graceful handling of unhashable elements.

    Args:
        items: List of elements (hashable or unhashable).

    Returns:
        List containing unique elements in original encounter order.
    """
    # TODO: Implement O(N) set-backed deduplication with unhashable fallback
    raise NotImplementedError("Implement deduplicate_preserve_order")
```
:::
