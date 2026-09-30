---
id: "memory-profiling-cpython"
version: "1.0.0"
title: "Lazy Stream Generators & Coroutine Pipelines"
track: "programming"
module: "mod-12"
estimated_minutes: 15
prerequisites: ["python-lists-memory-growth"]
i18n:
  ar: "المولدات الكسولة وتدفق البيانات غير المحدود (Lazy Stream Generators)"
---

# Lazy Stream Generators & Coroutine Pipelines

Imagine you are given a 50-Gigabyte log file containing 500,000,000 credit card transactions, and your manager asks you to find the total sum of all fraudulent charges. 
If your laptop only has 16 Gigabytes of RAM, what happens if you write:
python
transactions = load_all_transactions("huge_file.csv")   CRASH! Out of Memory!

Your laptop freezes and crashes because you tried to load all 50 Gigabytes into memory at the exact same instant (called Eager Materialization).

How do data engineers solve this? Through Lazy Evaluation using Python Generators.
A generator looks like a

:::simulation-widget{engine="canvas2d" component="GeneratorSuspensionLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\begin{aligned}
\text{Space}_{\text{eager}}(\mathcal{D}) &= N \cdot b = \Theta(N) \\
\text{Space}_{\text{lazy}}(\mathcal{D}) &= \text{sizeof}(\text{GeneratorFrame}) + b = \Theta(1)
\end{aligned}
$$

تخيل أنك استلمت ملفاً ضخماً بحجم 50 غيغابايت يحتوي على 500 مليون معاملة مالية، وطُلب منك حساب إجمالي المعاملات المشبوهة.
إذا كان حاسوبك يمتلك 16 غيغابايت فقط من الذاكرة العشوائية (RAM)، فماذا سيحدث لو حاولت تحميل الملف كاملاً دفعة واحدة؟ سينهار البرنامج فوراً بسبب نفاد الذاكرة (التحميل الشره / Eager Materialization).
كيف يحل مهندسو البيانات هذه المعضلة؟ عبر التقييم الكسول (Lazy Evaluation) باستخدام المولدات (Generators).
المولد هو دالة بايثون خاصة تستخدم الكلمة المفتاحية yield بدلاً من return.
عندما تصل الدالة إلى yield، فإنها لا تموت ولا تنتهي! بل تتجمد مؤقتاً في مكانها كأنك

:::python-challenge{id="py-memory-profiling-cpython"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Iterable, Generator

def streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]:
    """
    Streams running count, mean, and sample variance using Welford's algorithm
    in strict O(1) memory space.

    Args:
        stream: Iterable yielding float values.

    Yields:
        Tuples of (count, mean, sample_variance).
    """
    # TODO: Implement online Welford generator
    raise NotImplementedError("Implement streaming_welford_stats")
```
:::
