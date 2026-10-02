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

## Beat 1: Intuition & Mental Model / الحدس والنموذج الذهني

In many object-oriented languages like Java or C++, polymorphism is enforced through rigid, bureaucratic class hierarchies and formal interface contracts (`implements Comparable<T>`, `implements Serializable`). If a class fails to formally declare that it implements an interface, the compiler rejects it—even if the class contains the exact methods needed. Python approaches object-orientation with a radically different philosophy: **Duck Typing and Protocol Orientation**.

The core premise of duck typing is simple and pragmatic: *"If it walks like a duck and quacks like a duck, it is a duck."* Python's runtime rarely asks for an object's pedigree (`isinstance(x, SomeInterface)`). Instead, it asks whether the object knows how to respond to specific, standardized **secret handshakes**. In Python, these secret handshakes are known as **dunder methods** (double-underscore methods like `__len__`, `__getitem__`, and `__add__`).

Consider what happens when you write `len(my_object)`. Python does not look for a hardcoded property on a base class. Instead, the built-in function translates directly to `type(my_object).__len__(my_object)`. When you write `a + b`, Python translates it to `type(a).__add__(a, b)`. When you access an element with square brackets `obj[3]`, Python calls `type(obj).__getitem__(obj, 3)`. When you iterate over an object in a `for` loop, Python calls `__iter__()`. The entire Python syntax is, in essence, an expressive layer of syntactic sugar draped over dunder protocols!

By implementing standard dunder protocols on your custom classes, you make them feel like native Python primitives. Your geometric `Vector` objects can be added with `+`, multiplied with `*`, formatted with f-strings via `__repr__`, compared for value equality with `==` via `__eq__`, and stored as keys in dictionaries via `__hash__`. They blend seamlessly into the language ecosystem without requiring the caller to learn bespoke method names like `.plus()` or `.getLength()`.

Finally, when building complex object hierarchies with multiple inheritance, Python prevents ambiguity using the **C3 Linearization Algorithm** to construct the **Method Resolution Order (MRO)**. The MRO deterministically flattens a complex directed acyclic graph (DAG) of base classes into a clean linear chain, guaranteeing that a parent class is never checked before any of its children, and that `super()` calls traverse cooperative inheritance without infinite recursion.

---

في العديد من لغات البرمجة كائنية التوجه مثل Java و C++، تُفرض التعددية الشكلية (Polymorphism) عبر هياكل وراثية صارمة وبيروقراطية تعتمد على الواجهات الشكلية الصريحة (`implements Comparable`). فإن نسي المطور التصريح عن الواجهة، رفض المترجم التعامل مع الكائن حتى وإن كان يمتلك الدوال المطلوبة تماماً. أما في بايثون، فالرؤية الهندسية قائمة على فلسفة مغايرة جذرياً: **النمط البطّي (Duck Typing) والتوجه بالبروتوكولات**.

المبدأ الجوهري للنمط البطي بسيط وعملي للغاية: *"إذا كان الطائر يمشي كالبطة، ويسبح كالبطة، ويصدر صوت البطة، فهو بطة!"*. نادراً ما يفحص مفسر بايثون شجرة النسب للكائن عبر `isinstance`. بل يكتفي بالتأكد من قدرة الكائن على الاستجابة لـ **مصافحات برمجية سرية موحدة**. وفي بايثون، تُعرف هذه المصافحات السرية بـ **الدوال السحرية ذات الشرطتين السفليتين (Dunder Methods)** كـ `__len__` و `__getitem__` و `__add__`.

تأمل ما يحدث فعلياً حين تكتب `len(my_object)`. لا يبحث بايثون عن خاصية مخزنة مسبقاً، بل يترجم الاستدعاء مباشرة إلى دالة النوع الخاصة: `type(my_object).__len__(my_object)`. وحين تكتب `a + b`, يترجمها إلى `type(a).__add__(a, b)`. وحين تستخدم الأقواس المربعة `obj[3]`, يستدعي `__getitem__(obj, 3)`. وحين تمر على الكائن في حلقة `for`, يستدعي `__iter__()`. إن تركيب لغة بايثون بالكامل ليس سوى غطاء نحوي أنيق وناعم فوق هذه الدوال والبروتوكولات التحتية!

وعندما تطبق هذه البروتوكولات على أصنافك المخصصة، تتحول كائناتك إلى مواطنين من الدرجة الأولى في لغة بايثون. فيمكن جمع متجهاتك الهندسية باستخدام علامة الجمع العادية `+`، وطباعتها بأناقة عبر `__repr__`، ومقارنتها عبر `__eq__`، واستخدامها كمفاتيح للقواميس عبر `__hash__`. تندمج كائناتك بسلاسة مع كافة مكتبات بايثون دون أن تجبر زملاءك على حفظ أسماء دوال غريبة مثل `.add_vector()` أو `.calculateLength()`.

وأخيراً، عند تصميم هياكل أصناف معقدة تعتمد على الوراثة المتعددة، يقضي بايثون على أي غموض هيكلي باستخدام **خوارزمية C3 Linearization** لتحديد **ترتيب استبانة التوابع (Method Resolution Order - MRO)**. تفرد هذه الخوارزمية شجرة الوراثة المعقدة في خط مستقيم متسلسل وحتمي، وتضمن ألا يُفحص الصنف الأب قبل أبنائه، وأن تعمل نداءات `super()` التعاونية بسلاسة دون الوقوع في حلقات مفرغة.

### Jargon Decoder / جدول فك شفرة المصطلحات

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Dunder Method** (الدوال ذات الشرطتين) | A standardized secret handshake letting objects respond to native operators (`+`, `==`, `len()`). | مصافحة سرية قياسية تمكن الكائن من التفاعل مع معاملات بايثون الأصلية بسلاسة. |
| **Duck Typing** (النمط البطّي) | Caring only about what an object can do, rather than what pedigree it inherits from. | الاهتمام بما يستطيع الكائن فعله ومصافحاته، بدلاً من شجرة نسبه وسلالته الوراثية. |
| **Protocol Contract** (عقد البروتوكول) | An informal agreement: implement `__iter__` and you become a fully qualified stream. | اتفاق سلوكي: إن نفذت دالة `__iter__` فأنت معتمد كتدفق قابل للتكرار في كل مكان. |
| **Method Resolution Order (MRO)** (ترتيب استبانة التوابع) | A deterministic roadmap that flattens a family tree to decide which ancestor method runs. | خريطة طريق حتمية تفرد شجرة العائلة في خط مستقيم لتحديد أي دالة سلف تُستدعى أولاً. |
| **Syntactic Sugar** (الحلاوة النحوية) | Writing clean expressions like `a + b` that the compiler expands into lower-level method calls. | شفرة نحوية أنيقة ومريحة مثل `a + b` يترجمها المفسر داخلياً إلى استدعاءات دقيقة. |

### Visual Step-by-Step Data Transformation / التحول البصري للبيانات

```text
Executing Operator Overloading: v3 = v1 + v2
Where v1 = Vector2D(1.0, 2.0) and v2 = Vector2D(3.0, 4.0)

Step 1: Python Evaluates Binary Expression (v1 + v2)
  Operator '+' dispatches to: type(v1).__add__(v1, v2)
  CPython inspects slot: v1->ob_type->tp_as_number->nb_add

Step 2: In-Method Execution (__add__)
  Checks operand types: isinstance(v2, Vector2D) is True!
  Computes coordinate sums:
    new_x = v1.x + v2.x = 1.0 + 3.0 = 4.0
    new_y = v1.y + v2.y = 2.0 + 4.0 = 6.0

Step 3: New Instance Construction
  Allocates new Vector2D object on heap: Vector2D(4.0, 6.0)
  Binds reference tag: v3 -> Heap: Vector2D(4.0, 6.0)

Step 4: Representation Inspection: repr(v3)
  Calls: type(v3).__repr__(v3)
  Returns developer string: "Vector2D(4.0, 6.0)"
  Contract holds: eval(repr(v3)) == v3!
```

:::simulation-widget{engine="canvas2d" component="HashTableBucketLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Invariants Demystified / الأسس الرياضية واللامتغيرات الصارمة

$$
x[k] \iff \text{type}(x).\_\_\text{getitem}\_\_(x, k), \quad a + b \iff \text{type}(a).\_\_\text{add}\_\_(a, b), \quad a == b \implies \text{hash}(a) == \text{hash}(b)
$$

### Opcode Mechanics & Protocol Slot Dispatch

| Python Expression | CPython Virtual Opcode | C Slot Invocation | Dispatch Cost |
| :--- | :--- | :--- | :--- |
| `len(x)` | `UNARY_POSITIVE / CALL` | `x->ob_type->tp_as_sequence->sq_length(x)` | **~2-5 CPU cycles** (direct C pointer) |
| `a + b` | `BINARY_OP (NB_ADD)` | `a->ob_type->tp_as_number->nb_add(a, b)` | **~2-5 CPU cycles** (direct C pointer) |
| `a == b` | `COMPARE_OP (==)` | `a->ob_type->tp_richcompare(a, b, Py_EQ)` | **~5-10 CPU cycles** |
| `hash(a)` | `BUILTIN_HASH` | `a->ob_type->tp_hash(a)` | **~2-5 CPU cycles** |

### Step-by-Step Execution Cost & Complexity Breakdown / تفكيك التكلفة الحسابية خطوة بخطوة

#### 1. Arithmetic Vector Addition: `v1 + v2`
- **Step 1 (Binary Operator Dispatch)**: Virtual opcode `BINARY_OP` invokes C slot `nb_add`: **~3 CPU cycles**.
- **Step 2 (Type Guard & Attribute Reads)**: Check `isinstance(other, Vector2D)` and read `other.x`, `other.y`: **~10 CPU cycles**.
- **Step 3 (Floating Point Addition)**: 2 scalar float additions (`1.0 + 3.0` and `2.0 + 4.0`): **2 CPU cycles** ($O(1)$).
- **Step 4 (Object Instantiation)**: Allocate new `Vector2D` instance on heap: **~56 bytes** memory, **~40 CPU cycles**.
- **Total Arithmetic Cost**: Amortized $\mathcal{O}(1)$ time, $1$ new heap allocation.

#### 2. Equality & Hash Contract Enforcement
- When storing `Vector2D` in a set or dictionary:
  - Step 1: `hash(v)` computes `hash((v.x, v.y))` in $O(1)$ time (~10 ns).
  - Step 2: On bucket match, `v1 == v2` checks coordinate float equality in $O(1)$ time.
  - Set deduplication guarantees $\mathcal{O}(1)$ average lookup with zero hash corruption.

---

## Beat 3: Guided Code Challenge / التحدي البرمجي الموجه

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
    def __init__(self, x: float, y: float) -> None:
        # Step 1: Initialize coordinates converting values to float
        self.x = float(x)
        self.y = float(y)

    def __add__(self, other: "Vector2D") -> "Vector2D":
        # Step 2: Implement vector addition protocol
        if isinstance(other, Vector2D):
            return Vector2D(self.x + other.x, self.y + other.y)
        return NotImplemented

    def __eq__(self, other: object) -> bool:
        # Step 3: Implement value equality protocol
        if isinstance(other, Vector2D):
            return self.x == other.x and self.y == other.y
        return False

    def __hash__(self) -> int:
        # Step 4: Implement hash protocol consistent with equality
        return hash((self.x, self.y))

    def __repr__(self) -> str:
        # Step 5: Implement developer representation protocol
        return f"Vector2D({self.x}, {self.y})"
```
:::

## Beat 4: Real-World Transfer Scenario / سيناريو التطبيق ونقل المعرفة

### Reality Check: The Broken Hash Table Invariant

A game developer defines an entity coordinate class:
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return isinstance(other, Point) and self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
points_set = {p1, p2}
```
When the developer runs `points_set = {p1, p2}`, Python crashes with:
`TypeError: unhashable type: 'Point'`.
Why does defining `__eq__` suddenly make an object unhashable in Python?

*عرف مطور ألعاب صنفاً لإحداثيات النقاط وعرف فيه دالة التساوي `__eq__` دون دالة التجزئة `__hash__`. عند محاولة إدخال النقطتين في مجموعة، انهار الكود بخطأ `TypeError: unhashable type: 'Point'`. لماذا يؤدي تعريف دالة التساوي بمفردها إلى تعطيل التجزئة تلقائياً في بايثون؟*

:::transfer-quiz
**Question / السؤال:**
Why does overriding `__eq__` automatically disable `__hash__` in Python classes?
*لماذا يؤدي تجاوز دالة `__eq__` إلى إلغاء دالة `__hash__` تلقائياً في بايثون؟*

- [x] In Python, defining __eq__ automatically sets __hash__ = None to enforce the fundamental hash contract (a == b implies hash(a) == hash(b)) and prevent hash table corruption.
  *في بايثون، يؤدي تعريف __eq__ إلى ضبط __hash__ = None تلقائياً لفرض عقد التجزئة الجوهري (تساوي الكائنين يفرض تساوي شفرة تجزئتهما) وحماية جداول التجزئة من التلف.*
- [ ] User-defined classes can never be stored in sets or dictionaries in Python.
  *لا يمكن تخزين الأصناف المعرفة من قبل المستخدم في المجموعات أو القواميس في بايثون.*
- [ ] Sets require class inheritance from collections.Hashable before accepting custom objects.
  *تتطلب المجموعات أن يرث الصنف صراحة من collections.Hashable لقبول الكائنات المخصصة.*

**Analysis & Architectural Explanation / التحليل والشرح المعماري:**
**Correct / الإجابة الصحيحة:** By default, custom Python classes inherit an identity-based `__hash__` (derived from their memory address `id(self)`). However, if you override `__eq__` to compare values (`self.x == other.x`), two distinct instances `p1` and `p2` would compare as equal ($p_1 == p_2$) while possessing completely different memory-address hashes ($\text{hash}(p_1) \ne \text{hash}(p_2)$). This violates the core mathematical hash contract and causes hash tables to store duplicate "equal" items. To prevent this, CPython explicitly sets `__hash__ = None` whenever `__eq__` is defined without an accompanying `__hash__`.
*افتراضياً، ترث الأصناف دالة تجزئة مبنية على هوية عنوان الذاكرة `id(self)`. فإذا عدلت دالة `__eq__` لتقارن القيم، فسيتساوى الكائنان في القيمة بينما تختلف شفرة تجزئتهما المبنية على العناوين. وهذا يكسر العقد الرياضي الأساسي لجداول التجزئة ويؤدي لتكرار العناصر المتساوية. ولمنع هذا التلف، يعطل بايثون دالة التجزئة `__hash__ = None` فوراً ما لم يعرف المطور دالة `__hash__` متوافقة صراحة.*

**Incorrect / مشتت غير صحيح:** Custom classes can freely participate in sets and dictionaries once they define both `__eq__` and `__hash__`.
*تستطيع الأصناف المخصصة الانضمام للمجموعات والقواميس بمجرد تعريف الدالتين معاً.*

**Incorrect / مشتت غير صحيح:** Python relies on duck typing protocols, not rigid class inheritance from abstract base classes.
*يعتمد بايثون على بروتوكولات النمط البطّي الحرة دون فرض الوراثة الإجبارية من الأصناف التجريدية.*
:::
