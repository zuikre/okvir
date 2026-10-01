---
id: "python-lists-memory-growth"
version: "1.0.0"
title: "Python Lists & Dynamic Array Memory Growth"
track: "programming"
module: "mod-10"
estimated_minutes: 15
prerequisites: ["scope-resolution-legb"]
i18n:
  ar: "قوائم بايثون والنمو الذاكري للمصفوفات الديناميكية"
---

# Python Lists & Dynamic Array Memory Growth

A Python list is NOT a linked list of chains; it is a **dynamic array of pointers**. Picture a row of parking spaces. Each spot in the list holds a memory address card (a 64-bit pointer) leading to an object elsewhere on the heap.

When you call `lst.append()`, what happens if the parking lot is completely full? CPython does **not** allocate just one single extra parking space (that would be disastrous, requiring copying all elements on every single append, turning $N$ appends into $O(N^2)$ work). Instead, CPython allocates a significantly larger new parking lot with extra empty slots according to a geometric formula (`newsize + (newsize >> 3) + ...`), moves the existing pointers over, and leaves ample headroom. That is why `append` runs in **amortized $O(1)$ time**!

:::simulation-widget{engine="canvas2d" component="PointerAliasingLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
\text{new\_allocated} = \text{newsize} + (\text{newsize} \gg 3) + (\text{newsize} < 9 \mathrel{?} 3 : 6), \quad T_{\text{amortized}}(\text{append}) = \mathcal{O}(1)
$$

قائمة بايثون (`list`) ليست سلسلة مرتبطة، بل هي **مصفوفة ديناميكية من المؤشرات** (Pointers). تخيل صفاً من مواقف السيارات المرقمة؛ كل موقف يحمل بطاقة برقم عنوان (مؤشر 64 بت) لكائن يقيم في الذاكرة الحرة.

عندما تستدعي `lst.append()` وتمتلئ المواقف، لا يضيف بايثون موقفاً واحداً إضافياً فقط (لأن ذلك سيتطلب نسخ كل شيء في كل عملية إضافة، مما يجعل إضافة $N$ عنصراً تستغرق زمناً كارثياً $O(N^2)$). بل يحجز بايثون موقفاً جديداً أكبر بنسبة هندسية محددة وفق صيغة نمو مسبقة، وينقل المؤشرات ويترك مساحات شاغرة للمستقبل. ولهذا السبب تتميز عملية الإضافة بتكلفة زمنية مجمعة (Amortized Time) ثابتة **$O(1)$**!

In CPython's C source code (`listobject.c`), a list is defined as `struct { PyObject_VAR_HEAD; PyObject **ob_item; Py_ssize_t allocated; }`. The `ob_item` field points to a contiguous array of pointers to `PyObject*`. When `size == allocated`, `list_resize()` triggers. For a 64-bit architecture, the allocated capacity progression starting from empty is: 0 -> 4 -> 8 -> 16 -> 24 -> 32 -> 40 -> 52 -> 64 -> 76... This guarantees that expensive $O(N)$ reallocations happen exponentially less often.

في شفرة CPython المصدرية بلغة C، تُعرّف القائمة كـ `PyListObject` يحتوي على مصفوفة متجاورة من المؤشرات `ob_item` وحجم السعة المحجوزة `allocated`. عندما يتساوى عدد العناصر الفعلي مع السعة المحجوزة، يُستدعى التابع `list_resize()`. في المعالجات 64-بت، تتدرج السعة المحجوزة بدءاً من الصفر كالتالي: 0 -> 4 -> 8 -> 16 -> 24 -> 32 -> 40 -> 52... هذا يضمن أن عمليات إعادة الحجز المكلفة $O(N)$ تحدث على فترات متباعدة أسياً.

:::python-challenge{id="py-python-lists-memory-growth"}
---
timeout_ms: 3000
test_cases:
  - input: "calculate_cpython_list_capacity(1)"
    expected: "4"
  - input: "calculate_cpython_list_capacity(5)"
    expected: "8"
  - input: "simulate_growth_sequence(10)[0]"
    expected: "(1, 4)"
---
```python
def calculate_cpython_list_capacity(target_size: int) -> int:
    """
    Simulates CPython's exact list overallocation formula:
    new_allocated = newsize + (newsize >> 3) + (3 if newsize < 9 else 6)

    Args:
        target_size: Number of elements we wish to accommodate.

    Returns:
        The total capacity allocated by CPython for target_size elements.
    """
    if target_size <= 0:
        return 0

    # Bit-shift right by 3 is equivalent to integer division by 8
    growth = target_size >> 3
    bias = 3 if target_size < 9 else 6
    new_allocated = target_size + growth + bias

    return new_allocated

def simulate_growth_sequence(max_elements: int) -> list[tuple[int, int]]:
    """
    Simulates list resizing events from 0 up to max_elements,
    recording (element_count, allocated_capacity) on each reallocation.
    """
    reallocations: list[tuple[int, int]] = []
    current_capacity = 0

    for size in range(1, max_elements + 1):
        if size > current_capacity:
            current_capacity = calculate_cpython_list_capacity(size)
            reallocations.append((size, current_capacity))

    return reallocations
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Why is `list.append(x)` amortized O(1), but `list.insert(0, x)` or `list.pop(0)` is strictly O(N)?
*لماذا تستغرق `list.append(x)` زمناً مجمعاً O(1)، بينما تستغرق `list.insert(0, x)` أو `list.pop(0)` زمناً خطياً O(N) دائماً؟*

- [x] Inserting or removing at index 0 requires shifting all N existing 64-bit pointers in contiguous memory by one position.
  *تتطلب الإضافة أو الحذف في الموضع 0 إزاحة كافة المؤشرات البالغ عددها N في الذاكرة المتجاورة بمقدار خانة واحدة.*
- [ ] Because CPython stores lists as singly-linked lists where finding the head takes linear time.
  *لأن بايثون يخزن القوائم كسلاسل أحادية الترابط يتطلب الوصول لرأسها زمناً خطياً.*
- [ ] Because insert(0) allocates a new copy of every object in the list on the heap.
  *لأن insert(0) تنشئ نسخة جديدة لكل كائن داخل القائمة في الذاكرة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** Because a list is a contiguous pointer buffer, adding at the beginning forces CPython to move all subsequent pointers using memmove(), which takes O(N) time. Append only places the pointer at the next free slot.
*لأن القائمة مصفوفة مؤشرات متجاورة، فإن إدراج عنصر في المقدمة يجبر المعالج على إزاحة كل المؤشرات اللاحقة عبر memmove()، وهو عمل خطي O(N). بينما تضيف append المؤشر في الخانة الشاغرة التالية مباشرة.*

**Incorrect / مشتت غير صحيح:** CPython lists are dynamic pointer arrays, not linked lists.
*قوائم بايثون هي مصفوفات مؤشرات متجاورة وليست سلاسل مرتبطة.*

**Incorrect / مشتت غير صحيح:** The objects themselves are never cloned; only their 8-byte pointer references in the list buffer are moved.
*لا يتم نسخ الكائنات إطلاقاً، بل تُزاح مؤشراتها البالغة 8 بايت فقط داخل مصفوفة القائمة.*
:::
