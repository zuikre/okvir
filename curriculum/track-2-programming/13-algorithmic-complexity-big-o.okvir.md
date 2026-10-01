---
id: "algorithmic-complexity-big-o"
version: "1.0.0"
title: "Algorithmic Complexity, Big-O Notation & Asymptotics"
track: "programming"
module: "mod-12"
estimated_minutes: 15
prerequisites: ["context-managers-resources"]
i18n:
  ar: "التعقيد الخوارزمي، ترميز Big-O والتحليل المقارب"
---

# Algorithmic Complexity, Big-O Notation & Asymptotics

Benchmarking code using a wall-clock stopwatch is deceptive: a supercomputer will execute poorly written code quickly on 100 rows, but that same algorithm will freeze when fed 10,000,000 rows. **Big-O notation** does not measure seconds; it measures **how the operation count scales as the input size $n$ explodes toward infinity**.

$O(1)$ is turning on a light switch: takes the exact same split-second whether your apartment is a tiny studio or a massive football stadium. $O(n)$ is reading every book on a library shelf one by one. $O(n^2)$ is every guest at a wedding shaking hands with every other guest. When $n = 1,000,000$, an $O(n)$ algorithm takes a fraction of a second, while an $O(n^2)$ algorithm requires 31.7 years of continuous computation!

:::simulation-widget{engine="canvas2d" component="DunderProtocolDispatchLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
f(n) \in \mathcal{O}(g(n)) \iff \exists c > 0, n_0 \in \mathbb{N} : \forall n \ge n_0, \; 0 \le f(n) \le c \cdot g(n)
$$

قياس كفاءة الكود بساعة إيقاف الجدار أمر مضلل: فحاسوب خارق سينفذ كوداً رديئاً بسرعة على 100 سطر، لكن نفس الخوارزمية ستتجمد حين تُغذى بـ 10 ملايين سطر. **ترميز Big-O** لا يقيس الثواني، بل يقيس **معدل تضاعف عدد العمليات الحسابية مع انفجار حجم المدخلات $n$ نحو اللانهاية**.

$O(1)$ كضغط مفتاح المصباح: يستغرق نفس اللحظة سواء كانت الغرفة استوديو صغيراً أو ملعباً ضخماً. $O(n)$ هو قراءة كل كتاب في الرف كتاباً بعد كتاب. $O(n^2)$ هو مصافحة كل ضيف في حفل لجميع الضيوف الآخرين واحداً تلو الآخر. عندما يكون $n = 1,000,000$، تنهي خوارزمية $O(n)$ عملها في رمشة عين، بينما تحتاج خوارزمية $O(n^2)$ إلى 31.7 سنة من الحوسبة المتواصلة!

Formally, $f(n) = O(g(n))$ states that beyond a threshold $n_0$, $f(n)$ is bounded above by $c \cdot g(n)$. Asymptotic hierarchy orders complexities: $\mathcal{O}(1) \subset \mathcal{O}(\log n) \subset \mathcal{O}(n) \subset \mathcal{O}(n \log n) \subset \mathcal{O}(n^2) \subset \mathcal{O}(2^n)$. In Python, checking `item in my_list` takes $O(n)$ time (linear scan), while `item in my_set` takes $O(1)$ time (hash lookup). Choosing the right data structure changes the asymptotic complexity class.

رياضياً، يعني $f(n) = O(g(n))$ أنه بعد عتبة معينة $n_0$، تكون الدالة $f(n)$ مقيدة من الأعلى بثابت $c \cdot g(n)$. تتدرج التعقيدات في تسلسل هرمي: $\mathcal{O}(1) \subset \mathcal{O}(\log n) \subset \mathcal{O}(n) \subset \mathcal{O}(n \log n) \subset \mathcal{O}(n^2) \subset \mathcal{O}(2^n)$. في بايثون، فحص `item in my_list` يستغرق زمناً خطياً $O(n)$، بينما فحص `item in my_set` يستغرق زمناً ثابتاً $O(1)$ عبر التجزئة. اختيار هيكل البيانات المناسب ينقل البرنامج بالكامل إلى فئة تعقيد متفوقة.

:::python-challenge{id="py-algorithmic-complexity-big-o"}
---
timeout_ms: 3000
test_cases:
  - input: "find_two_sum_hash([2, 7, 11, 15], 9)"
    expected: "(0, 1)"
  - input: "find_two_sum_hash([3, 2, 4], 6)"
    expected: "(1, 2)"
  - input: "find_two_sum_hash([1, 2, 3], 100)"
    expected: "None"
---
```python
def find_two_sum_hash(nums: list[int], target: int) -> tuple[int, int] | None:
    """
    Finds the two indices of numbers in `nums` that add up to `target`,
    optimizing from naive O(n^2) double-loop search down to optimal O(n) time
    using a hash map (dictionary) complement lookup.

    Args:
        nums: List of integers.
        target: Target sum.

    Returns:
        Tuple of (index1, index2) or None if no such pair exists.
    """
    seen: dict[int, int] = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i

    return None
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Algorithm A runs in $T_A(n) = 1{,}000{,}000 \cdot n$ operations, while Algorithm B runs in $T_B(n) = 2 \cdot n^2$ operations. For which range of input size $n$ is Algorithm B actually FASTER than Algorithm A?
*تستغرق الخوارزمية A زمناً قدره $T_A(n) = 1{,}000{,}000 \cdot n$ عملية، بينما تستغرق الخوارزمية B زمناً قدره $T_B(n) = 2 \cdot n^2$ عملية. في أي نطاق لحجم المدخلات $n$ تكون الخوارزمية B أسرع فعلياً من الخوارزمية A؟*

- [x] For all n < 500,000 — Constant factors dominate for small inputs; asymptotic O(n) superiority only manifests once n exceeds 500,000.
  *لكافة قيم n < 500,000 — فالعوامل الثابتة تحكم الأداء في المدخلات الصغيرة، ولا تظهر أفضلية O(n) إلا عندما يتجاوز n حاجز 500,000.*
- [ ] Algorithm A is always faster for all n because O(n) is mathematically smaller than O(n^2).
  *الخوارزمية A أسرع دائماً لكافة قيم n لأن O(n) أصغر رياضياً من O(n^2).*
- [ ] Algorithm B is faster only when n exceeds 1,000,000.
  *الخوارزمية B أسرع فقط عندما يتجاوز n المليون.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Solving $2n^2 < 1{,}000{,}000n \implies n < 500{,}000$. This proves that Big-O asymptotic analysis describes behavior as $n \to \infty$; for small datasets, low constant overheads often outperform asymptotically superior algorithms.
*بحل المتباينة $2n^2 < 1{,}000{,}000n$ نجد أن $n < 500{,}000$. يثبت هذا أن تحليل Big-O يصف السلوك المقارب عندما تقترب $n$ من اللانهاية؛ أما في البيانات الصغيرة فقد تتفوق الخوارزميات ذات الثوابت المنخفضة.*

**Incorrect / مشتت غير صحيح:** Big-O drops constant factors; for n=10, Algorithm B does 200 operations while Algorithm A does 10,000,000 operations.
*يتجاهل Big-O الثوابت العددية؛ فعند n=10 تنفذ B مئتي عملية فقط بينما تنفذ A عشرة ملايين عملية.*

**Incorrect / مشتت غير صحيح:** For n > 500,000, $2n^2$ strictly exceeds $1,000,000n$, making Algorithm B slower.
*عند تجاوز 500,000، تتفوق تكلفة $2n^2$ وتصبح الخوارزمية B أبطأ بكثير.*
:::
