---
id: "sorting-divide-and-conquer"
version: "1.0.0"
title: "The Iteration Protocol & Iterator Objects"
track: "programming"
module: "mod-12"
estimated_minutes: 15
prerequisites: ["algorithmic-complexity-big-o", "pure-functions-recursion"]
i18n:
  ar: "بروتوكول التكرار الحلقي (Iteration Protocol) وكائنات المكررات"
---

# The Iteration Protocol & Iterator Objects

When you tell Python:
python
for item in shopping_cart:
    print(item)

What is Python actually doing behind your back? Beginners imagine a secret index variable $i = 0, 1, 2$ ticking up. But what if shopping_cart is a database stream, an infinite math series, or a set that has no concept of order or numbers?

To make iteration work universally across any data structure, Python invented the Iteration Protocol. It decouples the collection (the Iterable) from the process of walking through it (the Iterator).

The protocol works like this:
1. Python asks the collection: "Give

:::simulation-widget{engine="canvas2d" component="IteratorStateMachineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{I} = \langle \mathcal{S}, s_0, \mathcal{S}_{\text{term}}, \delta \rangle
$$

عندما تكتب في بايثون:
python
for item in shopping_cart:
    print(item)

ما الذي تفعله بايثون خلف الكواليس؟ يتخيل البعض وجود عداد رقمي خفي يتصاعد $0, 1, 2$. ولكن ماذا لو كانت البيانات تأتي عبر شبكة الإنترنت كبث مستمر، أو كانت مجموعة عشوائية (Set) ليس لها ترتيب رقمي للأدوار؟
لحل هذا الإشكال، ابتكرت بايثون بروتوكول التكرار (Iteration Protocol)، والذي يفصل بذكاء بين وعاء البيانات (Iterable) وبين آلية السير عبر البيانات (Iterator).
تعمل الآلية عبر الخطوات التالية:
1. تطلب بايثون من الوعاء: "أعطني دليلك السياحي!" (استدعاء iter() الذي يُشغّل __iter__).
2. يعيد الوعاء كائناً يسمى

:::python-challenge{id="py-sorting-divide-and-conquer"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import TypeVar, Generic, Iterable, Iterator

T = TypeVar("T")

class ChunkedIterator(Generic[T], Iterator[list[T]]):
    """
    Consumes any iterable stream into discrete fixed-size chunk lists
    adhering strictly to the Python Iterator protocol.
    """
    def __init__(self, iterable: Iterable[T], chunk_size: int) -> None:
        # TODO: Initialize iterator and validate chunk_size
        raise NotImplementedError("Implement ChunkedIterator.__init__")

    def __iter__(self) -> "ChunkedIterator[T]":
        raise NotImplementedError("Implement ChunkedIterator.__iter__")

    def __next__(self) -> list[T]:
        raise NotImplementedError("Implement ChunkedIterator.__next__")
```
:::
