---
id: "sorting-divide-and-conquer"
version: "1.0.0"
title: "Sorting Algorithms & Divide-and-Conquer Recurrences"
track: "programming"
module: "mod-12"
estimated_minutes: 15
prerequisites: ["algorithmic-complexity-big-o"]
i18n:
  ar: "خوارزميات الترتيب، فرّق تسُد (Divide and Conquer)، ومبرهنة التكرار"
---

# Sorting Algorithms & Divide-and-Conquer Recurrences

Sorting an unsorted deck of 1,000 cards by comparing each card to all others takes nearly a million comparisons ($O(n^2)$). **Divide and Conquer** is the ultimate problem-solving weapon: if a problem is too big to solve at once, chop it in half!

Sorting a deck of 1 card is trivially easy (it is already sorted!). So we keep splitting our list in half recursively until we have single-card piles, and then we **merge** them: comparing only the two visible cards on top of each pile and zipping them together like teeth on a jacket zipper in linear time $O(n)$! This cuts the total work down to $O(n \log n)$. Python's real sorting engine, **Timsort**, combines Merge Sort with Insertion Sort to exploit naturally occurring ordered runs in real-world data with unmatched speed.

:::simulation-widget{engine="canvas2d" component="IteratorStateMachineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
T(n) = 2 T(n/2) + \mathcal{O}(n) \implies T(n) = \Theta(n \log n), \quad \log_2(n!) = \Omega(n \log n)
$$

ترتيب كومة من 1000 ورقة بمقارنة كل ورقة بجميع الأوراق الأخرى يتطلب ما يقارب مليون مقارنة ($O(n^2)$)! مبدأ **فرّق تسُد (Divide and Conquer)** هو السلاح الأقوى في علوم الحاسوب: إن كانت المسألة شاقة وكبيرة، اقسمها إلى نصفين!

ترتيب كومة من ورقة واحدة أمر بديهي منجز تلقائياً! لذا نقسم القائمة إلى نصفين بالتكرار الذاتي حتى نصل لأكوام من ورقة واحدة، ثم ندمجها (Merge): نقارن فقط الورقتين الظاهرتين في قمة كل كومة، وندمجهما معاً كأسنَان سحاب السترة في زمن خطي $O(n)$! هذا يقلص التعقيد الإجمالي إلى $O(n \log n)$. محرك الترتيب الفعلي في بايثون، **Timsort**، يدمج خوارزمية الدمج مع الإدراج ليستغل المقاطع المرتبة مسبقاً في البيانات الحقيقية بسرعة خارقة.

By the Master Theorem, the recurrence $T(n) = 2T(n/2) + cn$ resolves to $\Theta(n \log_2 n)$. The information-theoretic lower bound for comparison sorting proves that any decision tree sorting $n$ elements requires height $h \ge \log_2(n!) = \Omega(n \log n)$. Merge Sort is a **stable sort**: it guarantees that two items with equal keys maintain their original relative order, a critical property when sorting records on multiple secondary fields.

وفق مبرهنة الأستاذ (Master Theorem)، تحل علاقة التكرار $T(n) = 2T(n/2) + cn$ إلى التعقيد المقارب $\Theta(n \log_2 n)$. ويثبت الحد الأدنى النظري للمعلومات أن أي شجرة قرارات لترتيب $n$ عنصراً تتطلب عمقاً $h \ge \log_2(n!) = \Omega(n \log n)$. خوارزمية دمج المجموعات هي **ترتيب مستقر (Stable Sort)**: تضمن بقاء الترتيب النسبي للعناصر ذات المفاتيح المتساوية كما كان في الأصل، وهي ميزة حاسمة عند فرز الجداول متعددة الأعمدة.

:::python-challenge{id="py-sorting-divide-and-conquer"}
---
timeout_ms: 3000
test_cases:
  - input: "merge_sort([38, 27, 43, 3, 9, 82, 10])"
    expected: "[3, 9, 10, 27, 38, 43, 82]"
  - input: "merge_sort([])"
    expected: "[]"
  - input: "merge_sort([5, 4, 3, 2, 1])"
    expected: "[1, 2, 3, 4, 5]"
---
```python
def merge(left: list[int], right: list[int]) -> list[int]:
    """Merges two sorted lists into a single sorted list in O(len(left) + len(right)) time."""
    merged: list[int] = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

def merge_sort(arr: list[int]) -> list[int]:
    """
    Pure divide-and-conquer Merge Sort algorithm.

    Args:
        arr: Unsorted list of integers.

    Returns:
        A brand new sorted list.
    """
    if len(arr) <= 1:
        return arr[:]

    mid = len(arr) // 2
    left_sorted = merge_sort(arr[:mid])
    right_sorted = merge_sort(arr[mid:])

    return merge(left_sorted, right_sorted)
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
What does 'stability' mean in sorting algorithms, and why is Timsort's stability essential in real-world data pipelines?
*ماذا يعني 'استقرار' خوارزمية الترتيب (Sorting Stability)، ولماذا يُعد استقرار Timsort حيوياً في معالجة البيانات الواقعية؟*

- [x] A stable sort preserves the original relative order of elements that have equal keys, allowing sequential multi-column sorting (e.g. sorting by name, then by department).
  *يحافظ الترتيب المستقر على الترتيب النسبي الأصلي للعناصر ذات المفاتيح المتساوية، مما يتيح الترتيب التتابعي متعدد الأعمدة (مثل الفرز بالاسم ثم بالقسم).*
- [ ] A stable sort guarantees that the algorithm will never raise memory allocation exceptions during execution.
  *يعني أن الخوارزمية تضمن عدم إطلاق أي استثناءات لنفاد الذاكرة أثناء التنفيذ.*
- [ ] A stable sort runs in identical execution time on all hardware architectures.
  *يعني أن زمن تنفيذ الخوارزمية متطابق عبر كافة المعالجات والأنظمة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** If you sort employees alphabetically by name, and then perform a stable sort by department, employees within each department remain alphabetically sorted. Unstable sorts like standard Quicksort shuffle them.
*لو رتبت الموظفين أبجدياً ثم رتبتهم ترتيباً مستقراً حسب القسم، سيظل الموظفون داخل كل قسم مرتبين أبجدياً. أما الخوارزميات غير المستقرة فتبعثر هذا الترتيب.*

**Incorrect / مشتت غير صحيح:** Stability refers to key order preservation, not runtime memory exception guarantees.
*الاستقرار مصطلح يصف الحفاظ على الترتيب النسبي للعناصر وليس استقرار الذاكرة.*

**Incorrect / مشتت غير صحيح:** Hardware execution time varies across clock frequencies; stability is purely an algorithmic ordering property.
*زمن التنفيذ يختلف بحسب العتاد، والاستقرار خاصية خوارزمية بحتة.*
:::
