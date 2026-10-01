---
id: "object-oriented-dunder"
version: "1.0.0"
title: "Object-Oriented Protocols & Dunder Methods"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["tuples-immutability-sets"]
i18n:
  ar: "البروتوكولات كائنية التوجه ودوال بايثون السحرية (Dunder Methods)"
---

# Object-Oriented Protocols & Dunder Methods

Python is not merely object-oriented; it is **protocol-oriented**. In Python, syntax is syntactic sugar for double-underscore ('dunder') methods. When you write `len(x)`, Python does not check a hardcoded property; it invokes `type(x).__len__(x)`. When you write `a + b`, it calls `type(a).__add__(a, b)`. When you write `x in container`, it calls `__contains__`.

By implementing standard dunder protocols on your custom classes, they become first-class citizens in Python: they can be sliced with brackets `obj[1:3]`, printed nicely with f-strings `__repr__`, sorted in algorithms, and used as dictionary keys with `__hash__` and `__eq__`.

:::simulation-widget{engine="canvas2d" component="HashTableBucketLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical & Architectural Foundations / الأسس الرياضية والمعمارية

$$
x[k] \iff \text{type}(x).\_\_\text{getitem}\_\_(x, k), \quad a + b \iff \text{type}(a).\_\_\text{add}\_\_(a, b), \quad a == b \implies \text{hash}(a) == \text{hash}(b)
$$

باثيون لغة تعتمد على **البروتوكولات** (Protocols) أكثر من اعتمادها على الوراثة الجامدة. فكل بناء لغوي في بايثون هو قناع ناعم لدالة خاصة محاطة بشرطتين سفليتين (Dunder Method). عندما تكتب `len(x)`، يستدعي بايثون `type(x).__len__(x)`. وعندما تكتب `a + b`، يُترجم إلى `type(a).__add__(a, b)`. وعندما تكتب `x in c`، يُستدعى `__contains__`.

وعندما تطبق هذه البروتوكولات على أصنافك المخصصة، تصبح كائناتك مدمجة بسلاسة في لغة بايثون: يمكن تقطيعها بالأقواس `obj[1:3]`، وطباعتها بأناقة عبر `__repr__`، ومقارنتها وترتيبها في الخوارزميات، واستخدامها كمفاتيح في القواميس عبر `__hash__` و `__eq__`.

Protocol dispatch in CPython is handled through fast C struct function pointers (slots) on the type object `PyTypeObject` (e.g. `tp_as_number`, `tp_as_sequence`, `tp_as_mapping`). When you implement `__eq__` on a class without explicitly implementing `__hash__`, Python automatically sets `__hash__ = None` to enforce the fundamental hash contract: objects that compare equal must produce identical hashes.

تتم إدارة توجيه البروتوكولات في CPython عبر مؤشرات دوال سريعة (Slots) داخل هيكل النوع في لغة C (مثل `tp_as_number` و `tp_as_mapping`). وحين تعرّف دالة المقارنة `__eq__` في صنف دون تعريف `__hash__`، يعطل بايثون التجزئة تلقائياً بجعل `__hash__ = None` لفرض العقد الرياضي: الكائنات المتطابقة في القيمة يجب أن تنتج شفرات تجزئة متطابقة.

:::python-challenge{id="py-object-oriented-dunder"}
---
timeout_ms: 3000
test_cases:
  - input: "repr(Vector2D(1, 2) + Vector2D(3, 4))"
    expected: "Vector2D(4.0, 6.0)"
  - input: "Vector2D(1, 2) == Vector2D(1.0, 2.0)"
    expected: "True"
  - input: "len({Vector2D(1, 2), Vector2D(1, 2), Vector2D(3, 4)})"
    expected: "2"
---
```python
class Vector2D:
    """
    A 2D geometric vector implementing Python's arithmetic, equality,
    representation, and hashing dunder protocols.
    """
    def __init__(self, x: float, y: float):
        self.x = float(x)
        self.y = float(y)

    def __repr__(self) -> str:
        return f"Vector2D({self.x}, {self.y})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector2D):
            return False
        return self.x == other.x and self.y == other.y

    def __add__(self, other: "Vector2D") -> "Vector2D":
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

    def __hash__(self) -> int:
        return hash((self.x, self.y))
```
:::

### Transfer Quiz & Practical Debugging / أسئلة الفهم ونقل المعرفة

:::transfer-quiz
**Question / السؤال:**
Why does defining `__eq__` on a custom Python class automatically set its `__hash__ = None` unless explicitly overridden?
*لماذا يؤدي تعريف الدالة `__eq__` في أي صنف مخصص إلى تعيين `__hash__ = None` تلقائياً ما لم يتم التصريح عنها صراحة؟*

- [x] To uphold the Hash Contract: if two objects compare equal, their hash codes must be identical; default identity-based hashing would break this contract.
  *للحفاظ على العقد الرياضي للتجزئة: إذا تساوى كائنان فيجب تطابق شفرتيهما، والتجزئة الافتراضية القائمة على عنوان الذاكرة تخرق هذا العقد.*
- [ ] Because Python's virtual machine deletes methods when new ones are compiled.
  *لأن مفسر بايثون يحذف الدوال القديمة عند ترجمة دوال جديدة.*
- [ ] Because classes with `__eq__` are automatically converted to mutable types.
  *لأن الأصناف التي تحوي `__eq__` تتحول تلقائياً إلى أنواع قابلة للتعديل.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** By default, objects inherit identity-based hashing (`id(self)`). Once value equality is customized via `__eq__`, two distinct instances might be equal in value but have different memory IDs. Setting `__hash__ = None` forces developers to explicitly implement a compatible `__hash__`.
*ترث الكائنات افتراضياً تجزئة تعتمد على عنوان الذاكرة `id(self)`. وحين نخصص المقارنة، قد يتساوى كائنان في القيمة بينما يختلف عنواناهما في الذاكرة. تعطيل التجزئة يحمي القواميس من السلوك العشوائي.*

**Incorrect / مشتت غير صحيح:** Method compilation does not delete existing methods; this is an explicit language specification rule.
*هذا غير صحيح؛ إنها قاعدة مقصودة في مواصفات لغة بايثون لحماية البيانات.*

**Incorrect / مشتت غير صحيح:** Custom classes remain immutable or mutable based on whether their attributes are modified.
*تحديد القابلية للتعديل يعتمد على منطق تعديل الخصائص وليس على تعريف المقارنة.*
:::
