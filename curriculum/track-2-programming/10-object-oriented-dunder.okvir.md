---
id: "object-oriented-dunder"
version: "1.0.0"
title: "Object-Oriented Protocols & Dunder Methods"
track: "programming"
module: "mod-11"
estimated_minutes: 15
prerequisites: ["cs-09"]
i18n:
  ar: "البروتوكولات كائنية التوجه ودوال بايثون السحرية (Dunder Methods)"
---

# Object-Oriented Protocols & Dunder Methods

In many object-oriented languages like Java or C++, polymorphism is enforced through rigid, bureaucratic class hierarchies and formal interface contracts (`implements Comparable<T>`, `implements Serializable`). If a class fails to formally declare that it implements an interface, the compiler rejects it—even if the class contains the exact methods needed. Python approaches object-orientation with a radically different philosophy: **Duck Typing and Protocol Orientation**.

The core premise of duck typing is simple and pragmatic: *"If it walks like a duck and quacks like a duck, it is a duck."* Python's runtime rarely asks for an object's pedigree (`isinstance(x, SomeInterface)`). Instead, it asks whether the object knows how to respond to specific, standardized **secret handshakes**. In Python, these secret handshakes are known as **dunder methods** (double-underscore methods like `__len__`, `__getitem__`, and `__add__`).

Consider what happens when you write `len(my_object)`. Python does not look for a hardcoded property on a base class. Instead, the built-in function translates directly to `type(my_object).__len__(my_object)`. When you write `a + b`, Python translates it to `type(a).__add__(a, b)`. When you access an element with square brackets `obj[3]`, Python calls `type(obj).__getitem__(obj, 3)`. When you iterate over an object in a `for` loop, Python calls `__iter__()`. The entire Python syntax is, in essence, an expressive layer of syntactic sugar draped over dunder protocols!

By implementing standard dunder protocols on your custom classes, you make them feel like native Python primitives. Your geometric `Vector` objects can be added with `+`, multiplied with `*`, formatted with f-strings via `__repr__`, compared for value equality with `==` via `__eq__`, and stored as keys in dictionaries via `__hash__`. They blend seamlessly into the language ecosystem without requiring the caller to learn bespoke method names like `.plus()` or `.getLength()`.

Finally, when building complex object hierarchies with multiple inheritance, Python prevents ambiguity using the **C3 Linearization Algorithm** to construct the **Method Resolution Order (MRO)**. The MRO deterministically flattens a complex directed acyclic graph (DAG) of base classes into a clean linear chain, guaranteeing that a parent class is never checked before any of its children, and that `super()` calls traverse cooperative inheritance without infinite recursion.

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

```text
CPython Protocol Slot Dispatch Architecture:
Python Syntax: len(v)                     Python Syntax: a + b
       |                                         |
       v                                         v
PyObject_Size(v)                         PyNumber_Add(a, b)
       |                                         |
       v                                         v
v->ob_type->tp_as_sequence->sq_length    a->ob_type->tp_as_number->nb_add
       |                                         |
       v                                         v
Direct C Function Pointer Call           Direct C Function Pointer Call
(Zero Python dictionary lookup!)         (Zero Python dictionary lookup!)
```

في العديد من لغات البرمجة كائنية التوجه مثل Java و C++، تُفرض التعددية الشكلية (Polymorphism) عبر هياكل وراثية صارمة وبيروقراطية تعتمد على الواجهات الشكلية الصريحة (`implements Comparable`). فإن نسي المطور التصريح عن الواجهة، رفض المترجم التعامل مع الكائن حتى وإن كان يمتلك الدوال المطلوبة تماماً. أما في بايثون، فالرؤية الهندسية قائمة على فلسفة مغايرة جذرياً: **النمط البطّي (Duck Typing) والتوجه بالبروتوكولات**.

المبدأ الجوهري للنمط البطي بسيط وعملي للغاية: *"إذا كان الطائر يمشي كالبطة، ويسبح كالبطة، ويصدر صوت البطة، فهو بطة!"*. نادراً ما يفحص مفسر بايثون شجرة النسب للكائن عبر `isinstance`. بل يكتفي بالتأكد من قدرة الكائن على الاستجابة لـ **مصافحات برمجية سرية موحدة**. وفي بايثون، تُعرف هذه المصافحات السرية بـ **الدوال السحرية ذات الشرطتين السفليتين (Dunder Methods)** كـ `__len__` و `__getitem__` و `__add__`.

تأمل ما يحدث فعلياً حين تكتب `len(my_object)`. لا يبحث بايثون عن خاصية مخزنة مسبقاً، بل يترجم الاستدعاء مباشرة إلى دالة النوع الخاصة: `type(my_object).__len__(my_object)`. وحين تكتب `a + b`، يترجمها إلى `type(a).__add__(a, b)`. وحين تستخدم الأقواس المربعة `obj[3]`، يستدعي `__getitem__(obj, 3)`. وحين تمر على الكائن في حلقة `for`، يستدعي `__iter__()`. إن تركيب لغة بايثون بالكامل ليس سوى غطاء نحوي أنيق وناعم فوق هذه الدوال والبروتوكولات التحتية!

وعندما تطبق هذه البروتوكولات على أصنافك المخصصة، تتحول كائناتك إلى مواطنين من الدرجة الأولى في لغة بايثون. فيمكن جمع متجهاتك الهندسية باستخدام علامة الجمع العادية `+`، وطباعتها بأناقة عبر `__repr__`، ومقارنتها عبر `__eq__`، واستخدامها كمفاتيح للقواميس عبر `__hash__`. تندمج كائناتك بسلاسة مع كافة مكتبات بايثون دون أن تجبر زملاءك على حفظ أسماء دوال غريبة مثل `.add_vector()` أو `.calculateLength()`.

وأخيراً، عند تصميم هياكل أصناف معقدة تعتمد على الوراثة المتعددة، يقضي بايثون على أي غموض هيكلي باستخدام **خوارزمية C3 Linearization** لتحديد **ترتيب استبانة التوابع (Method Resolution Order - MRO)**. تفرد هذه الخوارزمية شجرة الوراثة المعقدة في خط مستقيم متسلسل وحتمي، وتضمن ألا يُفحص الصنف الأب قبل أبنائه، وأن تعمل نداءات `super()` التعاونية بسلاسة دون الوقوع في حلقات مفرغة.

#### Architectural Breakdown & C-Level Slots:
- **Type Slots (`tp_as_number`, `tp_as_sequence`, `tp_as_mapping`)**: In CPython's C source code, dunder methods are mirrored by fast C function pointer slots on the `PyTypeObject`. Built-in operations like `len()` execute at raw C speed without dictionary lookups.
- **`__repr__` vs `__str__`**: `__repr__` should be unambiguous, aiming for `eval(repr(x)) == x` (primarily for developers and debugging); `__str__` should be human-readable and user-friendly.
- **The Hash Contract Invariant**: If two objects compare equal via `__eq__`, their `__hash__` values must match. If you override `__eq__` without defining `__hash__`, CPython automatically sets `__hash__ = None` to prevent corrupting hash tables.

#### التحليل المعماري وفتحات مفسر C:
- **فتحات النوع في لغة C**: في شفرة بايثون المصدرية، ترتبط الدوال السحرية بفتحات مؤشرات دوال C سريعة (Slots) داخل بنية `PyTypeObject`، مما يجعل استدعاء `len()` ينفذ بسرعة لغة C الخام دون تفتيش قواميس الخصائص.
- **الفرق بين `__repr__` و `__str__`**: الدالة `__repr__` صُممت للمطورين ويجب أن تعيد تمثيلاً دقيقاً غير غامض يمكن تمريره لـ `eval()`، بينما صُممت `__str__` للمستخدم النهائي لتكون مقروءة وواضحة.
- **عقد التجزئة الحتمي**: إن تساوى كائنان عبر `__eq__`، وجب تطابق شفرة تجزئتهما. وإن عرفت `__eq__` دون `__hash__`، يعطل بايثون التجزئة تلقائياً بجعل `__hash__ = None`.

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
    # Step 1: Initialize coordinates converting values to float
    def __init__(self, x: float, y: float):
        self.x = float(x)
        self.y = float(y)

    # Step 2: Implement unambiguous string representation for debugging
    def __repr__(self) -> str:
        return f"Vector2D({self.x}, {self.y})"

    # Step 3: Implement value equality comparing floating coordinates
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector2D):
            return False
        return self.x == other.x and self.y == other.y

    # Step 4: Implement vector addition returning a new Vector2D instance
    def __add__(self, other: "Vector2D") -> "Vector2D":
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

    # Step 5: Implement hash protocol based on immutable coordinate tuple
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
**Correct / الإجابة الصحيحة:** In Python, the default `object.__hash__` is derived from the instance's unique heap memory address (`id(self)`). However, once you implement a custom `__eq__`, two separate instances at different memory addresses can be deemed equal in value (`Vector2D(1, 2) == Vector2D(1, 2)`). If they kept the default identity hash, they would produce different hash codes and land in different hash table buckets—violating the fundamental Hash Contract ($a == b \implies \text{hash}(a) == \text{hash}(b)$). Setting `__hash__ = None` intentionally prevents this corruption by raising a clear `TypeError` until you define a matching hash function.
*في بايثون، تُشتق التجزئة الافتراضية للكائنات من عنوانها في الكومة (`id(self)`). لكن بمجرد تعريف `__eq__`، يصبح بإمكان نسختين مختلفتين في العنوان أن تتطابقا في القيمة (`Vector2D(1, 2) == Vector2D(1, 2)`). فلو احتفظتا بالتجزئة المعتمدة على العنوان لاختلفت شفرتاهما وسكنتا في صناديق مختلفة بالقاموس، مما يقوض عقد التجزئة الحتمي. لذا يعطل بايثون التجزئة تلقائياً بجعل `__hash__ = None` لحماية سلامة البيانات وإلزام المطور بتعريف دالة تجزئة متوافقة.*

**Incorrect / مشتت غير صحيح:** Python's compiler never deletes methods during class compilation; this is an explicit, safety-critical language rule.
*لا يحذف مفسر بايثون الدوال أثناء الترجمة، بل هذه قاعدة أمان معمارية صريحة في لغة بايثون.*

**Incorrect / مشتت غير صحيح:** Custom classes remain mutable or immutable depending on whether their instance attributes can be rebound or modified, regardless of `__eq__`.
*تحديد قابلية الصنف للتعديل يرتبط بإمكانية تعديل خصائصه الداخلية ولا علاقة له بتعريف دالة المقارنة.*
:::
