---
id: "reverse-mode-derivative-closures"
version: "1.0.0"
title: "Elementary Backward Operations & Local Adjoints"
track: "deeplearning"
module: "mod-35"
estimated_minutes: 15
prerequisites: ["autograd-computational-graph"]
i18n:
  ar: "العمليات العكسية الأولية والمشتقات المرافقة المحلية"
---

# Elementary Backward Operations & Local Adjoints

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

In traditional calculus courses, the multivariate chain rule is often presented as an intimidating cascade of nested partial derivative expansions that sprawl across blackboards. But from the perspective of an individual worker on our computational assembly line, backpropagation is delightfully simple, elegant, and purely local.

Consider Worker C performing a basic multiplication: $c = a \times b$. Worker C does not need to know whether the neural network has two layers or two thousand layers. Worker C has no need to understand the complex loss function sitting at the far end of the factory. Worker C only needs to answer one immediate, local question:
*"When my output $c$ receives 1 unit of blame (gradient) from downstream, exactly how much blame should I pass back to input $a$, and how much to input $b$?"*

By basic single-variable calculus, the local rules are strikingly intuitive:
* **Addition ($c = a + b$):** Since $\frac{\partial c}{\partial a} = 1$ and $\frac{\partial c}{\partial b} = 1$, blame passes straight through to both inputs without modification. Upstream blame is mirrored equally to both branches.
* **Multiplication ($c = a \times b$):** Since $\frac{\partial c}{\partial a} = b$ and $\frac{\partial c}{\partial b} = a$, each input receives blame scaled by the *other* input's forward value! If $b = 100$, then a tiny nudge to $a$ causes a $100\times$ surge in $c$, so $a$ absorbs $100\times$ the upstream blame.
* **Rectified Linear Unit ($\text{ReLU}(a) = \max(0, a)$):** Acts like an electrical one-way valve or gate. If the gate was open during the forward pass ($a > 0$), blame passes through at full strength ($\times 1$). If the gate was closed ($a \le 0$), the pathway is severed and blame is stopped dead at 0.

How does software implement this local responsibility? Each node stores its local recipe inside a Python closure function (`_backward`). A closure is a function that "remembers" its environment: it captures the local inputs at forward execution time, lies dormant while the rest of the network finishes, waits until the upstream gradient (`out.grad`) finally arrives from downstream, and then multiplies the upstream gradient by its local derivative, accumulating blame into its parents using `+=`.

### Jargon Decoder | قاموس تفكيك المصطلحات

| Term / المصطلح | Plain English Translation & Metaphor | الشرح المبسط بالعربية والتشبيه اليومي |
| :--- | :--- | :--- |
| **Backward Closure (`_backward`)** (دالة الإغلاق العكسية) | A dormant pager: it sleeps during the forward pass, remembering its inputs, and wakes up when blame arrives from downstream. | نداء مؤجل نائم: يخزن مدخلاته في المسار الأمامي، ولا يستيقظ إلا عندما تصله إشارة اللوم من المصب. |
| **Local Derivative** (المشتقة الموضعية) | The immediate sensitivity between a single worker's direct output and its input knobs, ignoring the rest of the factory. | الحساسية المباشرة بين مخرج العملية ومدخلاتها المباشرة فقط، بمعزل عن بقية أجزاء الشبكة. |
| **Upstream Gradient (`out.grad`)** (التدرج القادم من الخلف) | The cumulative blame flowing backward from the final loss node to this operation's output. | إجمالي اللوم الرياضي المتدفق من دالة الخسارة النهائية حتى مخرج هذه العملية الحسابية. |
| **Gradient Accumulation (`+=`)** (التراكم الجمعي للتدرجات) | Adding up blame rather than overwriting (`=`), mandatory whenever a single wire branches out to multiple destinations. | جمع إشارات التدرج بدلاً من الكتابة فوقها، وهو أمر حتمي كلما تفرع مخرج عقدة إلى عدة مسارات. |
| **Indicator Function ($\mathbb{I}$)** (دالة المؤشر الشرطية) | A binary valve switch that evaluates to $1$ when a condition is met (e.g., $x > 0$) and $0$ otherwise. | مفتاح صمام ثنائي: يعطي 1 إذا تحقق الشرط (مثل $x > 0$) ويقطع الإشارة تماماً إلى 0 في غير ذلك. |

### Visual Architecture Flow | مخطط تدفق البيانات والمعمارية

```text
FORWARD MULTIPLICATION: (c = a * b)
---------------------------------------------------------------------------------
[Input a = 2.0] ---\
                    (*) ---> [Output c = 6.0] ---> (Stores closure: _backward)
[Input b = 3.0] ---/
---------------------------------------------------------------------------------
REVERSE ADJOINT DISPATCH: (_backward unpacks and reflects inputs)
[a.grad += b * c.grad] <--- (c.grad = 1.0) ---> [b.grad += a * c.grad]
     (+3.0)                                          (+2.0)
---------------------------------------------------------------------------------
BRANCHING REUSE ACCUMULATION: (Variable used twice: z = x * x)
                        [x] ---\
                                (*) ---> [z] ---> (During backward: x.grad accumulates
                        [x] ---/                   both branches: x.grad += x + x)
```

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في حساب التفاضل متعدد المتغيرات، تبدو قاعدة السلسلة كمعادلة متداخلة شديدة التعقيد. لكن عند تأملها من منظور عامل منفرد في خط التجميع الحسابي، فإن التفاضل العكسي عملية محلية بالغة الأناقة والبساطة.

تأمل عقدة تنفذ عملية ضرب اعتيادية: $c = a \times b$. لا تحتاج هذه العقدة لمعرفة أي تفاصيل عن بنية الشبكة العصبية الممتدة لآلاف الطبقات، ولا نوع دالة الخسارة في نهاية الخط. كل ما تحتاجه هو الإجابة عن سؤال محلي واحد: *"إذا تلقت العقدة $c$ مقداراً معيناً من اللوم الرياضي (التدرج القادم من الخلف)، فكيف توزعه بعدالة على المدخلين $a$ و $b$؟"*

تُترجم قواعد التفاضل البسيطة إلى سلوكيات فيزيائية واضحة:
* **في الجمع ($c = a + b$):** يمر اللوم بالتساوي لكلا الطرفين دون أي تغيير؛ لأن مشتقة الجمع تساوي 1 دائماً.
* **في الضرب ($c = a \times b$):** يتناسب لوم كل طرف طردياً مع قيمة الطرف المقابل؛ فكلما كانت قيمة $b$ ضخمة في المسار الأمامي، كلما تضاعف اللوم الموجه إلى $a$.
* **في دالة التقويم ($\text{ReLU}$):** تعمل العقدة كصمام كهربائي؛ إذا كان المدخل موجباً في المسار الأمامي، يمر تدرج اللوم كاملاً. أما إذا كان المدخل سالباً أو صفراً، فينقطع المسار تماماً ويتوقف التدرج عند الصفر.

برمجياً، تحتفظ كل عقدة بهذه القاعدة المحلية داخل دالة إغلاق بايثون (`_backward`). تتربص هذه الدالة في الذاكرة محتفظة بالقيم الأبوية اللحظية، وتنتظر وصول تدرج المشتقة القادم من المصب لتضربه في مشتقتها الموضعية وتراكمه بدقة داخل المعاملات الأبوية عبر مؤثر الجمع التراكمي `+=`.

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

Under reverse-mode automatic differentiation, the adjoint variable $\bar{v}_i \coloneqq \frac{\partial L}{\partial v_i}$ represents the total sensitivity of the scalar objective $L$ with respect to node $v_i$. For an elementary two-argument primitive operation $v_{\text{out}} = f(v_1, v_2)$, the chain rule specifies the adjoint updates:

$$
\bar{v}_1 \mathrel{+}= \bar{v}_{\text{out}} \cdot \frac{\partial f(v_1, v_2)}{\partial v_1}, \quad \bar{v}_2 \mathrel{+}= \bar{v}_{\text{out}} \cdot \frac{\partial f(v_1, v_2)}{\partial v_2}
$$

Elementary forward primitives and their corresponding analytical backward adjoint updates:

$$
\begin{aligned}
\text{Addition:} \quad & v_{\text{out}} = v_1 + v_2 & \implies & \quad \bar{v}_1 \mathrel{+}= \bar{v}_{\text{out}} \cdot 1, \quad \bar{v}_2 \mathrel{+}= \bar{v}_{\text{out}} \cdot 1 \\
\text{Multiplication:} \quad & v_{\text{out}} = v_1 \cdot v_2 & \implies & \quad \bar{v}_1 \mathrel{+}= \bar{v}_{\text{out}} \cdot v_2, \quad \bar{v}_2 \mathrel{+}= \bar{v}_{\text{out}} \cdot v_1 \\
\text{Power:} \quad & v_{\text{out}} = v_1^k & \implies & \quad \bar{v}_1 \mathrel{+}= \bar{v}_{\text{out}} \cdot (k \cdot v_1^{k-1}) \\
\text{ReLU:} \quad & v_{\text{out}} = \max(0, v_1) & \implies & \quad \bar{v}_1 \mathrel{+}= \bar{v}_{\text{out}} \cdot \mathbb{I}(v_1 > 0)
\end{aligned}
$$

### Demystifying the Equation | تفكيك الرموز والمعادلات

| Symbol / الرمز | Mathematical Term / المصطلح الرياضي | Plain English Meaning & Role / المعنى الفيزيائي والدور التطبيقي |
| :--- | :--- | :--- |
| $\bar{v}_{\text{out}} \coloneqq \frac{\partial L}{\partial v_{\text{out}}}$ | Upstream Adjoint / التدرج الوافد | The incoming sensitivity signal received from downstream children (`out.grad`). |
| $\frac{\partial f}{\partial v_1}$ | Local Partial Derivative / المشتقة المحلية | How fast operator $f$ moves with respect to first input $v_1$, evaluated at forward values. |
| $\mathrel{+}=$ | Accumulation Operator / مؤثر الجمع التراكمي | Required by multivariable chain rule to sum sensitivities whenever an input feeds multiple consumers. |
| $\mathbb{I}(v_1 > 0)$ | Heaviside Step / دالة المؤشر العتبية | Binary gate for ReLU: acts as an open circuit ($1$) for positive values and closed circuit ($0$) otherwise. |
| $\bar{v}_1, \bar{v}_2$ | Propagated Adjoints / التدرجات المنقولة | The updated sensitivity values pushed back into parent operands (`self.grad`, `other.grad`). |

#### Why the Math Works Step-by-Step | لماذا تعمل هذه الصياغة رياضياً؟
1. **Isolation of Local Responsibility**: Each mathematical operator only needs to know its own local Jacobian. It scales the incoming scalar gradient $\bar{v}_{\text{out}}$ by its local derivative without needing any global knowledge of network depth.
2. **Multiplication Swapping**: For $c = a \times b$, single-variable calculus gives $\frac{\partial c}{\partial a} = b$ and $\frac{\partial c}{\partial b} = a$. Thus, each input's gradient is directly scaled by the *other* input's forward magnitude.
3. **Branching Additivity**: If a single tensor $x$ is used across $K$ different operations, the multivariable chain rule states $\frac{\partial L}{\partial x} = \sum_{k=1}^K \frac{\partial L}{\partial y_k} \frac{\partial y_k}{\partial x}$. The `+=` accumulation operator implements this exact summation.


تمثل المتغيرات المرافقة $\bar{v}_i = \frac{\partial L}{\partial v_i}$ معدل الحساسية الكلي لدالة الهدف بالنسبة لكل عقدة. وفق قاعدة السلسلة الموضعية، يتضاعف التدرج العائد من الخلف بمقدار المشتقة الجزئية المباشرة للعملية. ويعد استخدام مؤثر الجمع التراكمي $\mathrel{+}=$ إلزاماً رياضياً تفرضه قاعدة السلسلة متعددة المتغيرات عند تفرع مخرجات العقدة إلى أكثر من مسار استهلاك لاحق.

---

## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي

Equip the scalar `Value` node with local backward closures (`_backward`) for addition, multiplication, and ReLU activation. Ensure gradients accumulate into children using `+=`.

:::python-challenge{id="py-reverse-mode-derivative-closures"}
---
timeout_ms: 3000
test_cases:
  - input: "a = Value(2.0); b = Value(3.0); c = a * b; c.grad = 1.0; c._backward(); print(f\"{a.grad},{b.grad}\")"
    expected: "3.0,2.0"
  - input: "x = Value(-1.5); r = x.relu(); r.grad = 1.0; r._backward(); print(x.grad)"
    expected: "0.0"
---
```python
class Value:
    """Scalar autograd node with reverse-mode backward closures."""
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')
        
        # Step 1: Define backward closure for addition (local derivative is 1.0 for both)
        def _backward():
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
            
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')
        
        # Step 2: Define backward closure for multiplication using the product rule
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
            
        out._backward = _backward
        return out

    def relu(self):
        out = Value(max(0.0, self.data), (self,), 'relu')
        
        # Step 3: Define backward closure for ReLU (passes gradient only if forward data > 0)
        def _backward():
            self.grad += (1.0 if self.data > 0.0 else 0.0) * out.grad
            
        out._backward = _backward
        return out
```
:::

---

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

### Transfer Question / سؤال نقل الأثر المعرفي

Why is it a catastrophic bug in automatic differentiation engines to write `self.grad = out.grad` instead of `self.grad += out.grad` inside the backward closure?

* [x] If a variable is used more than once in the forward computation (e.g., $y = x \times x$ or branching residual skip paths), the multivariable chain rule requires summing the gradients across all downstream paths: $\frac{\partial L}{\partial x} = \sum_j \frac{\partial L}{\partial y_j} \frac{\partial y_j}{\partial x}$. Direct assignment overwrites and forgets gradients from earlier paths.
* [ ] Direct assignment fails because Python garbage collects variables that are assigned multiple times.
* [ ] Addition is necessary to prevent floating-point underflow when gradients are near zero.
* [ ] The gradient of any addition operation in calculus is defined as zero.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In real neural architectures, parameters and activations branch continually. For instance, in ResNet architectures, an activation branches into a residual skip connection and a convolutional block. In mathematical expressions like $f(x) = x^2 = x \times x$, the variable $x$ serves as both the left and right arguments of the multiplication. The multivariate chain rule states that if $x$ influences $L$ through multiple intermediate pathways $y_1, y_2, \dots, y_k$, the total derivative is the sum of contributions: $\frac{\partial L}{\partial x} = \sum_{j} \frac{\partial L}{\partial y_j}\frac{\partial y_j}{\partial x}$. If our closure used direct assignment (`=`), the second path would overwrite the gradient accumulated from the first path, producing fatally incorrect gradient calculations and destroying optimization stability.

**Why the distractors are incorrect:**
1. *Python garbage collects variables...*: False. Rebinding a numerical attribute on an existing object in heap memory has no effect on Python's reference-counting garbage collector.
2. *Addition is necessary to prevent floating-point underflow...*: False. Accumulating numbers can actually produce overflow or underflow just as easily; accumulation is strictly a multivariable calculus requirement.
3. *The gradient of any addition operation in calculus is defined as zero...*: False. The partial derivative of $a + b$ with respect to $a$ is $1.0$, not $0$.

*الشرح باللغة العربية:*
في الشبكات العصبية، تتفرع المتغيرات باستمرار (كما في الوصلات المتبقية Residual Connections أو عند تربيع متغير $x \times x$). تنص قاعدة السلسلة متعددة المتغيرات على أن التأثير الكلي لمتغير يتفرع إلى عدة مسارات هو **مجموع** تأثيرات كل تلك المسارات معاً. إذا استُخدم التعيين المباشر (`=`) بدلاً من الجمع التراكمي (`+=`)، فإن المسار الأخير سيمحو تدرجات المسارات السابقة تماماً، مما يؤدي إلى حساب تدرجات خاطئة وانهيار تدريب النموذج بالكامل.
