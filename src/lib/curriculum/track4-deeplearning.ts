import type { CurriculumModule } from '../types';

export const deeplearningModules: CurriculumModule[] = [
  {
    "id": "autograd-computational-graph",
    "title": "Scalar Autograd Node & Computational Graph Topology",
    "titleAr": "عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a modern automated assembly line inside an advanced manufacturing plant. Raw materials enter from the left as raw numerical inputs.",
      "ar": "تخيّل خط تجميع ذكي داخل مصنع فائق التطور. تتدفق المواد الأولية من اليسار كمدخلات عددية: يقوم العامل الأول بدمج قطعتين بعملية جمع (c = a +..."
    },
    "prerequisites": [
      "t1-18",
      "cs-05"
    ],
    "x": 1095,
    "y": 80,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "Imagine a modern automated assembly line inside an advanced manufacturing plant. Raw materials enter from the left as raw numerical inputs. Worker A combines two metal rods using an addition weld ($c = a + b$), and Worker B machines the output by scaling it with a multiplier tool ($d = c \\times w$). In traditional procedural programming, when the CPU executes `c = a + b`, it writes the numeric sum into a memory register and immediately discards the past: it retains no memory of the fact that $c$ originated from the union of $a$ and $b$. The arithmetic result is preserved, but its historical lineage is lost forever.\n\nAutomatic differentiation (Autograd) transforms passive numerical values into active, self-aware graph nodes. On our computational assembly line, every worker keeps a permanent ledger. When Worker B finishes an operation, they log three vital facts:\n1. The exact inputs they received from upstream workers (`_prev` parent pointers).\n2. The exact mechanical tool they operated (`_op = '*'` or `'+'`).\n3. Their current output value (`data`).\n\nWhen a final defect or performance metric is measured at the end of the factory line—the scalar loss $L$—this historical lineage allows blame and credit (gradients) to be passed backwards step-by-step from worker to worker. It answers the foundational question of all machine learning: *\"If I nudge this worker's input knob by an infinitesimal amount $\\epsilon$, exactly how much does the final factory loss change?\"*\n\nWithout an explicit computational graph, a neural network is blind to its own internal machinery. By linking parent nodes to children through arithmetic operations, autograd weaves a Directed Acyclic Graph (DAG) during the normal forward execution. Every forward mathematical step lays down a breadcrumb trail that will serve as a backward highway during gradient backpropagation.",
          "ar": "تخيّل خط تجميع ذكي داخل مصنع فائق التطور. تتدفق المواد الأولية من اليسار كمدخلات عددية: يقوم العامل الأول بدمج قطعتين بعملية جمع (c = a + b)، بينما يقوم العامل الثاني بضرب الناتج في معامل ترجيحي (d = c * w). في البرمجة التقليدية، عندما يحسب المعالج ناتج عملية ما، فإنه يحفظ الرقم النهائي في الذاكرة وينسى نسبه التاريخي فوراً.\n\nيقوم محرك التفاضل التلقائي بتحويل القيم السلمية الساكنة إلى عقد حية داخل رسم بياني موجه غير دائري (DAG). يحتفظ كل عامل بسجل تاريخي دقيق يسجل المدخلات الأبوية ونوع العملية والقيمة اللحظية، مما يتيح تمرير إشارات اللوم والمحاسبة (التدرجات) بالعكس لتحديد مسؤولية كل متغير."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "v_i = f_i\\left(\\{v_j\\}_{j \\in \\text{Parents}(v_i)}\\right), \\quad \\mathcal{G} = (\\mathcal{V}, \\mathcal{E}), \\quad \\mathcal{E} = \\{(v_j, v_i) \\mid v_j \\in \\text{Parents}(v_i)\\}",
        "formulaNote": {
          "en": "Directed Acyclic Graph (DAG) topological invariant governing dynamic computational graph construction.",
          "ar": "الخاصية الطوبولوجية للرسم البياني الموجه غير الدائري الحاكمة لبناء الرسوم البيانية الحسابية الديناميكية."
        },
        "narrative": {
          "en": "During the forward pass, evaluation proceeds in topological order from inputs to the terminal scalar objective $L \\equiv v_N$. During the reverse-mode backward pass, the multivariate chain rule dictates the accumulation of sensitivities (adjoints) $\\bar{v}_i \\coloneqq \\frac{\\partial L}{\\partial v_i}$:\n\n$$\n\\bar{v}_i = \\sum_{j \\in \\text{Children}(v_i)} \\bar{v}_j \\cdot \\frac{\\partial f_j}{\\partial v_i}\n$$\n\n* $v_i \\in \\mathbb{R}$: The scalar value computed at vertex $i$ (`node.data`).\n* $f_i: \\mathbb{R}^k \\to \\mathbb{R}$: An elementary differentiable primitive operation ($+, -, \\times, \\div, (\\cdot)^k, \\exp, \\log$).\n* $\\text{Parents}(v_i) \\subset \\mathcal{V}$: The set of antecedent nodes whose values serve as direct arguments to $f_i$ (`node._prev`).\n* $\\text{Children}(v_i) \\subset \\mathcal{V}$: The set of downstream nodes that consume $v_i$ as an input.\n* $\\bar{v}_i \\coloneqq \\frac{\\partial L}{\\partial v_i}$: The adjoint variable or sensitivity gradient of the loss with respect to $v_i$ (`node.grad`).\n* $\\mathcal{V} = \\{v_1, v_2, \\dots, v_N\\}$: Topological ordering of all generated computational nodes.\n* $\\mathcal{E}$: Directed edges encoding data lineage, flowing forward during forward evaluation and backward during reverse-mode sensitivity accumulation.\n\n---\n\nBuild the foundational scalar `Value` node for our micrograd-style autograd engine. Implement `__add__`, `__mul__`, and `__pow__` such that operations accept both `Value` objects and raw Python numeric primitives (`int`, `float`), correctly recording children and operator tags.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nفي الصياغة الرياضية الدقيقة، يُعرَّف الرسم البياني الحسابي كفضاء طوبولوجي موجه غير دائري $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$. تمثل كل عقدة $v_i$ قيمة سلمية حقيقية ناتجة عن تطبيق دالة أولية قابلة للاشتقاق $f_i$ على مخرجات العقد الأبوية السابقة $\\text{Parents}(v_i)$. تشكل الحواف الموجهة $\\mathcal{E}$ مسارات تدفق البيانات للأمام، ومسارات رجوع تدرجات الحساسية الرياضية $\\bar{v}_i$ في الاتجاه المعاكس وفق قاعدة السلسلة متعددة المتغيرات.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-autograd-computational-graph",
          "starterCode": "class Value:\n    \"\"\"Scalar autograd node for dynamic computational graph tracking.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        # Step 1: Wrap primitive int or float into a Value node if necessary\n        other = other if isinstance(other, Value) else Value(other)\n        # Step 2: Return a new Value node with combined sum, children references, and '+' op\n        return Value(self.data + other.data, (self, other), '+')\n\n    def __mul__(self, other):\n        # Step 1: Wrap primitive int or float into a Value node if necessary\n        other = other if isinstance(other, Value) else Value(other)\n        # Step 2: Return a new Value node with multiplied data, children references, and '*' op\n        return Value(self.data * other.data, (self, other), '*')\n\n    def __pow__(self, other: float | int):\n        # Step 1: Validate exponent is an int or float\n        assert isinstance(other, (int, float)), \"Power only supports int and float scalars\"\n        # Step 2: Return a new Value node with exponentiated data, child reference, and pow op tag\n        return Value(self.data ** other, (self,), f'**{other}')\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "a = Value(2.0); b = Value(3.0); c = a * b + 4.0; print(c.data)",
              "expected": "10.0"
            },
            {
              "input": "x = Value(3.0); y = x ** 2; print(y.data)",
              "expected": "9.0"
            }
          ],
          "expectedOutput": "10.0",
          "variants": {
            "python": {
              "starterCode": "class Value:\n    \"\"\"Scalar autograd node for dynamic computational graph tracking.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        # Step 1: Wrap primitive int or float into a Value node if necessary\n        other = other if isinstance(other, Value) else Value(other)\n        # Step 2: Return a new Value node with combined sum, children references, and '+' op\n        return Value(self.data + other.data, (self, other), '+')\n\n    def __mul__(self, other):\n        # Step 1: Wrap primitive int or float into a Value node if necessary\n        other = other if isinstance(other, Value) else Value(other)\n        # Step 2: Return a new Value node with multiplied data, children references, and '*' op\n        return Value(self.data * other.data, (self, other), '*')\n\n    def __pow__(self, other: float | int):\n        # Step 1: Validate exponent is an int or float\n        assert isinstance(other, (int, float)), \"Power only supports int and float scalars\"\n        # Step 2: Return a new Value node with exponentiated data, child reference, and pow op tag\n        return Value(self.data ** other, (self,), f'**{other}')\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "10.0"
            }
          },
          "solution": "class Value:\n    \"\"\"Scalar autograd node for dynamic computational graph tracking.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        # Step 1: Wrap primitive int or float into a Value node if necessary\n        other = other if isinstance(other, Value) else Value(other)\n        # Step 2: Return a new Value node with combined sum, children references, and '+' op\n        return Value(self.data + other.data, (self, other), '+')\n\n    def __mul__(self, other):\n        # Step 1: Wrap primitive int or float into a Value node if necessary\n        other = other if isinstance(other, Value) else Value(other)\n        # Step 2: Return a new Value node with multiplied data, children references, and '*' op\n        return Value(self.data * other.data, (self, other), '*')\n\n    def __pow__(self, other: float | int):\n        # Step 1: Validate exponent is an int or float\n        assert isinstance(other, (int, float)), \"Power only supports int and float scalars\"\n        # Step 2: Return a new Value node with exponentiated data, child reference, and pow op tag\n        return Value(self.data ** other, (self,), f'**{other}')\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)"
        },
        "hints": {
          "tier1": {
            "en": "Check `isinstance(other, Value)` to handle numeric literals gracefully.",
            "ar": "تحقق من نوع المتغير باستخدام `isinstance` للتعامل مع الأرقام العادية بسلاسة."
          },
          "tier2": {
            "en": "Wrap non-Value operands using `other = other if isinstance(other, Value) else Value(other)`.",
            "ar": "قم بتغليف المعاملات الرقمية داخل كائن `Value` قبل إجراء الحساب."
          },
          "tier3": {
            "en": "Return a new Value node passing `(self, other)` as the children tuple and the operator string tag.",
            "ar": "أرجع كائن Value جديد يمرر الأبناء ونوع العملية الحسابية كمعاملات للمنشئ."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does reverse-mode automatic differentiation (backpropagation) require constructing an explicit graph of connected nodes in memory, rather than simply updating numerical derivatives eagerly during the forward pass?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In reverse-mode autograd, calculating the sensitivity of an intermediate input requires the upstream gradient from the final loss, which is not known until the forward pass completes. Intermediate activations and child-parent links must be retained in memory to evaluate local derivatives backwards.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Python floating-point numbers lose hardware precision unless wrapped inside a heap-allocated graph vertex.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Forward-mode differentiation is mathematically invalid for scalar addition and multiplication.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Dynamic computational graphs are only necessary to prevent memory leaks in GPU tensor cores.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "reverse-mode-derivative-closures",
    "title": "Elementary Backward Operations & Local Adjoints",
    "titleAr": "العمليات العكسية الأولية والمشتقات المرافقة المحلية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In traditional calculus courses, the multivariate chain rule is often presented as an intimidating cascade of nested partial derivative...",
      "ar": "في حساب التفاضل متعدد المتغيرات، تبدو قاعدة السلسلة كمعادلة متداخلة معقدة. لكن عند النظر إليها من منظور عقدة حسابية منفردة في خط التجميع،..."
    },
    "prerequisites": [
      "autograd-computational-graph"
    ],
    "x": 1075,
    "y": 175,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "In traditional calculus courses, the multivariate chain rule is often presented as an intimidating cascade of nested partial derivative expansions that sprawl across blackboards. But from the perspective of an individual worker on our computational assembly line, backpropagation is delightfully simple, elegant, and purely local.\n\nConsider Worker C performing a basic multiplication: $c = a \\times b$. Worker C does not need to know whether the neural network has two layers or two thousand layers. Worker C has no need to understand the complex loss function sitting at the far end of the factory. Worker C only needs to answer one immediate, local question:\n*\"When my output $c$ receives 1 unit of blame (gradient) from downstream, exactly how much blame should I pass back to input $a$, and how much to input $b$?\"*\n\nBy basic single-variable calculus, the local rules are strikingly intuitive:\n* **Addition ($c = a + b$):** Since $\\frac{\\partial c}{\\partial a} = 1$ and $\\frac{\\partial c}{\\partial b} = 1$, blame passes straight through to both inputs without modification. Upstream blame is mirrored equally to both branches.\n* **Multiplication ($c = a \\times b$):** Since $\\frac{\\partial c}{\\partial a} = b$ and $\\frac{\\partial c}{\\partial b} = a$, each input receives blame scaled by the *other* input's forward value! If $b = 100$, then a tiny nudge to $a$ causes a $100\\times$ surge in $c$, so $a$ absorbs $100\\times$ the upstream blame.\n* **Rectified Linear Unit ($\\text{ReLU}(a) = \\max(0, a)$):** Acts like an electrical one-way valve or gate. If the gate was open during the forward pass ($a > 0$), blame passes through at full strength ($\\times 1$). If the gate was closed ($a \\le 0$), the pathway is severed and blame is stopped dead at 0.\n\nHow does software implement this local responsibility? Each node stores its local recipe inside a Python closure function (`_backward`). A closure is a function that \"remembers\" its environment: it captures the local inputs at forward execution time, lies dormant while the rest of the network finishes, waits until the upstream gradient (`out.grad`) finally arrives from downstream, and then multiplies the upstream gradient by its local derivative, accumulating blame into its parents using `+=`.",
          "ar": "في حساب التفاضل متعدد المتغيرات، تبدو قاعدة السلسلة كمعادلة متداخلة معقدة. لكن عند النظر إليها من منظور عقدة حسابية منفردة في خط التجميع، فإن التفاضل العكسي عملية محلية بالغة الأناقة والبساطة.\n\nتأمل عقدة تنفذ عملية ضرب c = a * b. لا تحتاج هذه العقدة لمعرفة أي تفاصيل عن بقية الشبكة العصبية، بل تحتاج فقط لمعرفة قاعدتها المحلية: إذا تلقت العقدة c مقداراً معيناً من اللوم الرياضي، فكيف توزعه على مدخليها a و b؟\nفي الجمع، يمر اللوم بالتساوي. وفي الضرب، يتناسب لوم كل طرف مع قيمة الطرف المقابل. وفي ReLU، يمر اللوم فقط إذا كان المدخل موجباً. تختزل العقدة هذه القاعدة في دالة إغلاق عكسية (_backward) تراكم التدرج الوارد في العقد السابقة عبر عامل الجمع التراكمي +=."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{v}_1 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot \\frac{\\partial f(v_1, v_2)}{\\partial v_1}, \\quad \\bar{v}_2 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot \\frac{\\partial f(v_1, v_2)}{\\partial v_2}",
        "formulaNote": {
          "en": "Local adjoint propagation and multivariate accumulation rule.",
          "ar": "قاعدة انتشار المشتقات المرافقة المحلية وتراكم التدرجات متعددة المتغيرات."
        },
        "narrative": {
          "en": "Elementary forward primitives and their corresponding analytical backward adjoint updates:\n\n$$\n\\begin{aligned}\n\\text{Addition:} \\quad & v_{\\text{out}} = v_1 + v_2 & \\implies & \\quad \\bar{v}_1 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot 1, \\quad \\bar{v}_2 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot 1 \\\\\n\\text{Multiplication:} \\quad & v_{\\text{out}} = v_1 \\cdot v_2 & \\implies & \\quad \\bar{v}_1 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot v_2, \\quad \\bar{v}_2 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot v_1 \\\\\n\\text{Power:} \\quad & v_{\\text{out}} = v_1^k & \\implies & \\quad \\bar{v}_1 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot (k \\cdot v_1^{k-1}) \\\\\n\\text{ReLU:} \\quad & v_{\\text{out}} = \\max(0, v_1) & \\implies & \\quad \\bar{v}_1 \\mathrel{+}= \\bar{v}_{\\text{out}} \\cdot \\mathbb{I}(v_1 > 0)\n\\end{aligned}\n$$\n\n* $\\bar{v}_{\\text{out}} = \\frac{\\partial L}{\\partial v_{\\text{out}}}$: The upstream adjoint (incoming gradient from downstream consumers, represented as `out.grad`).\n* $\\frac{\\partial f}{\\partial v_j}$: The local Jacobian/partial derivative evaluated at the forward values of the inputs.\n* $\\mathrel{+}=$: The accumulation operator, strictly required by multivariable calculus whenever a node branches into multiple downstream paths.\n* $\\mathbb{I}(\\cdot)$: The indicator function, evaluating to $1$ when the inner condition is true and $0$ otherwise.\n* $\\bar{v}_1, \\bar{v}_2$: The accumulated gradients stored in `self.grad` and `other.grad`.\n\n---\n\nEquip the scalar `Value` node with local backward closures (`_backward`) for addition, multiplication, and ReLU activation. Ensure gradients accumulate into children using `+=`.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتمثل المتغيرات المرافقة $\\bar{v}_i = \\frac{\\partial L}{\\partial v_i}$ معدل الحساسية الكلي لدالة الهدف بالنسبة لكل عقدة. وفق قاعدة السلسلة الموضعية، يتضاعف التدرج العائد من الخلف بمقدار المشتقة الجزئية المباشرة للعملية. ويعد استخدام مؤثر الجمع التراكمي $\\mathrel{+}=$ إلزاماً رياضياً تفرضه قاعدة السلسلة متعددة المتغيرات عند تفرع مخرجات العقدة إلى أكثر من مسار استهلاك لاحق.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-reverse-mode-derivative-closures",
          "starterCode": "class Value:\n    \"\"\"Scalar autograd node with reverse-mode backward closures.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        \n        # Step 1: Define backward closure for addition (local derivative is 1.0 for both)\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n            \n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        \n        # Step 2: Define backward closure for multiplication using the product rule\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n            \n        out._backward = _backward\n        return out\n\n    def relu(self):\n        out = Value(max(0.0, self.data), (self,), 'relu')\n        \n        # Step 3: Define backward closure for ReLU (passes gradient only if forward data > 0)\n        def _backward():\n            self.grad += (1.0 if self.data > 0.0 else 0.0) * out.grad\n            \n        out._backward = _backward\n        return out",
          "testCases": [
            {
              "input": "a = Value(2.0); b = Value(3.0); c = a * b; c.grad = 1.0; c._backward(); print(f\"{a.grad},{b.grad}\")",
              "expected": "3.0,2.0"
            },
            {
              "input": "x = Value(-1.5); r = x.relu(); r.grad = 1.0; r._backward(); print(x.grad)",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0,2.0",
          "variants": {
            "python": {
              "starterCode": "class Value:\n    \"\"\"Scalar autograd node with reverse-mode backward closures.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        \n        # Step 1: Define backward closure for addition (local derivative is 1.0 for both)\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n            \n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        \n        # Step 2: Define backward closure for multiplication using the product rule\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n            \n        out._backward = _backward\n        return out\n\n    def relu(self):\n        out = Value(max(0.0, self.data), (self,), 'relu')\n        \n        # Step 3: Define backward closure for ReLU (passes gradient only if forward data > 0)\n        def _backward():\n            self.grad += (1.0 if self.data > 0.0 else 0.0) * out.grad\n            \n        out._backward = _backward\n        return out",
              "expectedOutput": "3.0,2.0"
            }
          },
          "solution": "class Value:\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += out.grad\n            other.grad += out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def relu(self):\n        out = Value(max(0.0, self.data), (self,), 'relu')\n        def _backward():\n            self.grad += (out.data > 0.0) * out.grad\n        out._backward = _backward\n        return out"
        },
        "hints": {
          "tier1": {
            "en": "Remember that gradients must accumulate using `+=` rather than direct assignment `=`.",
            "ar": "تذكر أن التدرجات يجب أن تتراكم باستخدام المؤثر `+=` بدلاً من الإسناد المباشر `=`."
          },
          "tier2": {
            "en": "For multiplication, `self.grad += other.data * out.grad` and `other.grad += self.data * out.grad`.",
            "ar": "في عملية الضرب، مشتقة كل طرف هي قيمة الطرف الآخر مضروبة في التدرج الخارجي."
          },
          "tier3": {
            "en": "For ReLU, pass gradient only when `out.data > 0.0` or `self.data > 0.0`.",
            "ar": "في دالة ReLU، مرر التدرج فقط عندما تكون قيمة المدخل موجبة قطيعاً."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why is it a catastrophic bug in automatic differentiation engines to write `self.grad = out.grad` instead of `self.grad += out.grad` inside the backward closure?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ العمليات العكسية الأولية والمشتقات المرافقة المحلية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "If a variable is used more than once in the forward computation (e.g., $y = x \\times x$ or branching residual skip paths), the multivariable chain rule requires summing the gradients across all downstream paths: $\\frac{\\partial L}{\\partial x} = \\sum_j \\frac{\\partial L}{\\partial y_j} \\frac{\\partial y_j}{\\partial x}$. Direct assignment overwrites and forgets gradients from earlier paths.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Direct assignment fails because Python garbage collects variables that are assigned multiple times.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Addition is necessary to prevent floating-point underflow when gradients are near zero.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The gradient of any addition operation in calculus is defined as zero.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "topological-sort-dag-backprop",
    "title": "Topological Sort DAG Execution & Full Backpropagation",
    "titleAr": "تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine our computational assembly line has grown into an intricate, branching network.",
      "ar": "في خط الإنتاج المتشعب، تخيل أن العامل X يوزع مخرجاته على عاملين لاحقين: Y و Z، وكلاهما يساهم في تشكيل المنتج النهائي."
    },
    "prerequisites": [
      "reverse-mode-derivative-closures",
      "cs-04"
    ],
    "x": 1055,
    "y": 270,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "Imagine our computational assembly line has grown into an intricate, branching network. Worker X machines a foundational component and supplies copies of it to both Worker Y and Worker Z. Both Y and Z incorporate this component into their own sub-assemblies, which eventually merge into the final finished product delivered at the end of the line. When a final defect is measured at the factory exit—the scalar loss $L$—in what order should we interrogate the workers to assign blame?\n\nSuppose we interrogate Worker X first. At this moment, Worker X has received partial feedback from Worker Y, but Worker Z has not yet completed their calculations. If Worker X calculates their blame right now and passes it back to their own suppliers, Worker X's assessment is fundamentally incomplete and corrupted.\n\nA worker cannot determine their total blame until **every single downstream customer** who consumed their output has completely finished calculating blame and pushed it back upstream!\n\nThis fundamental scheduling constraint is solved by **Topological Sorting**. A computational graph is a Directed Acyclic Graph (DAG). By performing a Depth-First Search (DFS) post-order traversal starting from the terminal loss node $L$, we build a linear ordering of nodes. When we reverse this ordering, we obtain the exact sequence required for full backpropagation:\n1. Seed the root loss node with its base sensitivity: $\\frac{\\partial L}{\\partial L} = 1.0$.\n2. Traverse the list in reverse topological order, calling each node's local `_backward()` closure.\n3. Every node is mathematically guaranteed to have accumulated 100% of its incoming gradients from all downstream consumers before it ever fires its own backward closure!",
          "ar": "في خط الإنتاج المتشعب، تخيل أن العامل X يوزع مخرجاته على عاملين لاحقين: Y و Z، وكلاهما يساهم في تشكيل المنتج النهائي. عند اكتشاف خلل في مخرج المصنع (قيمة الخسارة L)، بأي ترتيب يجب أن نحاسب العمال ونمرر التدرجات العكسية؟\n\nإذا قمنا بمحاسبة العامل X قبل أن ينتهي العاملان Y و Z من حساب نصيبهما من اللوم، فإن العامل X سيمرر تدرجاً جزئياً ناقصاً إلى العمال السابقين له. القاعدة الحتمية هي: لا يمكن لعقدة أن تمرر تدرجها للخلف حتى تجمع كل التدرجات القادمة من جميع العقد التي استهلكت مخرجاتها.\n\nيضمن الترتيب الطوبولوجي (Topological Sort) عبر البحث بالعمق أولاً (DFS) أن التدرجات العكسية تُنفذ بترتيب دقيق من دالة الخسارة رجوعاً إلى المدخلات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\frac{\\partial L}{\\partial v_i} = \\sum_{j \\in \\text{Children}(v_i)} \\frac{\\partial L}{\\partial v_j} \\cdot \\frac{\\partial v_j}{\\partial v_i}",
        "formulaNote": {
          "en": "Total derivative expansion and reverse topological traversal invariant.",
          "ar": "توسيع المشتقة الإجمالية وشرط المسار الطوبولوجي المعكوس."
        },
        "narrative": {
          "en": "A topological sort of a directed acyclic graph $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$ is a permutation $\\pi = (u_1, u_2, \\dots, u_N)$ of its vertices such that every directed dependency edge points forward:\n\n$$\n\\forall (u_j, u_k) \\in \\mathcal{E} \\implies j < k\n$$\n\nThe full backpropagation sweep executes along the reversed topological permutation $\\pi^{\\text{rev}} = (u_N, u_{N-1}, \\dots, u_1)$:\n\n1. **Seed Initialization:** Set the seed derivative at the terminal loss node:\n   $$\n   \\bar{u}_N \\leftarrow 1.0, \\quad \\text{and} \\quad \\bar{u}_i \\leftarrow 0.0 \\quad \\forall i \\in \\{1, 2, \\dots, N-1\\}\n   $$\n2. **Reverse Topological Sweep:** For index $i = N$ down to $1$:\n   $$\n   \\forall p \\in \\text{Parents}(u_i): \\quad \\bar{p} \\mathrel{+}= \\bar{u}_i \\cdot \\frac{\\partial u_i}{\\partial p}\n   $$\n\n* $\\text{Children}(v_i) \\subset \\mathcal{V}$: The set of downstream nodes that take $v_i$ as an input.\n* $\\text{Parents}(u_i) \\subset \\mathcal{V}$: The set of antecedent nodes that produced $u_i$.\n* $\\pi = (u_1, \\dots, u_N)$: The forward topological ordering ensuring no node appears before its prerequisites.\n* $\\pi^{\\text{rev}}$: The reverse topological ordering guaranteeing that all incoming gradients $\\bar{u}_j$ from children are fully accumulated before $u_i$ distributes blame to its parents.\n* $\\bar{u}_N \\leftarrow 1.0$: The identity seed $\\frac{\\partial L}{\\partial L} = 1.0$ that initiates the chain rule.\n* Complexity: Both the forward evaluation and reverse-mode traversal execute in linear time $O(|\\mathcal{V}| + |\\mathcal{E}|)$.\n\n---\n\nComplete the `backward()` method on the `Value` node. Construct the topological ordering using a recursive post-order DFS traversal, initialize the seed gradient `self.grad = 1.0`, and iterate through the reversed list calling each node's `_backward()` closure.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nيضمن الترتيب الطوبولوجي $\\pi$ ألا يتم تقييم المشتقة الجزئية لعقدة أبوية إلا بعد أن تستقر وتكتمل المشتقات الإجمالية لجميع العقد الأبناء. بفضل هذه الهندسة الرياضية المحكمة، يتم حساب تدرجات جميع أوزان وانحيازات النموذج العصبي بتعقيد زمني خطي $O(|\\mathcal{V}| + |\\mathcal{E}|)$ في مسار عكسي واحد متكامل.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-topological-sort-dag-backprop",
          "starterCode": "class Value:\n    \"\"\"Scalar autograd node with full topological DAG backpropagation.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        # Step 1: Build topological ordering using recursive DFS post-order traversal\n        topo = []\n        visited = set()\n        \n        def build_topo(v):\n            if v not in visited:\n                visited.add(v)\n                for child in v._prev:\n                    build_topo(child)\n                topo.append(v)\n                \n        build_topo(self)\n\n        # Step 2: Seed the root gradient (dL/dL = 1.0)\n        self.grad = 1.0\n\n        # Step 3: Iterate through reversed topological list and execute node._backward()\n        for node in reversed(topo):\n            node._backward()\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "x = Value(2.0); y = x * x + x; y.backward(); print(f\"{x.grad}\")",
              "expected": "5.0"
            },
            {
              "input": "a = Value(3.0); b = Value(4.0); c = a * b; c.backward(); print(f\"{a.grad},{b.grad}\")",
              "expected": "4.0,3.0"
            }
          ],
          "expectedOutput": "5.0",
          "variants": {
            "python": {
              "starterCode": "class Value:\n    \"\"\"Scalar autograd node with full topological DAG backpropagation.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        # Step 1: Build topological ordering using recursive DFS post-order traversal\n        topo = []\n        visited = set()\n        \n        def build_topo(v):\n            if v not in visited:\n                visited.add(v)\n                for child in v._prev:\n                    build_topo(child)\n                topo.append(v)\n                \n        build_topo(self)\n\n        # Step 2: Seed the root gradient (dL/dL = 1.0)\n        self.grad = 1.0\n\n        # Step 3: Iterate through reversed topological list and execute node._backward()\n        for node in reversed(topo):\n            node._backward()\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "class Value:\n    \"\"\"Scalar autograd node with full topological DAG backpropagation.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        # Step 1: Build topological ordering using recursive DFS post-order traversal\n        topo = []\n        visited = set()\n        \n        def build_topo(v):\n            if v not in visited:\n                visited.add(v)\n                for child in v._prev:\n                    build_topo(child)\n                topo.append(v)\n                \n        build_topo(self)\n\n        # Step 2: Seed the root gradient (dL/dL = 1.0)\n        self.grad = 1.0\n\n        # Step 3: Iterate through reversed topological list and execute node._backward()\n        for node in reversed(topo):\n            node._backward()"
        },
        "hints": {
          "tier1": {
            "en": "Use a set of visited nodes and a list to accumulate the post-order sequence.",
            "ar": "استخدم مجموعة لتتبع العقد المزارة وقائمة لتجميع التسلسل البعدي."
          },
          "tier2": {
            "en": "Recursively visit all `v._prev` children before appending `v` to the `topo` list.",
            "ar": "قم بزيارة أبناء العقدة `v._prev` بالعودية قبل إضافة `v` إلى قائمة الترتيب."
          },
          "tier3": {
            "en": "Set `self.grad = 1.0` and iterate `for node in reversed(topo): node._backward()`.",
            "ar": "اجعل تدرج دالة الخسارة 1.0 ثم طبق الدوال العكسية عبر `reversed(topo)`."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What fatal issue arises if a programmer introduces a cycle into a computational graph (e.g., $A \\to B \\to A$) and calls `.backward()`?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "A directed cycle violates the Directed Acyclic Graph (DAG) requirement, causing DFS topological sorting to enter an infinite recursion loop or fail to find a valid linear order; cyclic dependencies (such as in Recurrent Neural Networks) must first be unrolled across discrete time steps into an acyclic spatial graph.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The floating-point values in the forward pass immediately overflow to `+inf`.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Gradients in cyclic graphs automatically cancel each other out to exactly zero.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Python's garbage collector automatically deletes all cyclical nodes before `.backward()` can execute.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "perceptron-activation",
    "title": "Artificial Neuron & Non-Linear Activation Functions",
    "titleAr": "العصبون الاصطناعي ودوال التنشيط غير الخطية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "At the foundational core of every deep neural network sits the artificial neuron—the perceptron.",
      "ar": "في قلب كل شبكة عصبية عميقة يقبع العصبون الاصطناعي. يستقبل العصبون متجه المدخلات x، ويضرب كل إدخال في وزن مخصص wi، ويضيف حداً ثابتاً..."
    },
    "prerequisites": [
      "topological-sort-dag-backprop"
    ],
    "x": 1035,
    "y": 365,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "At the foundational core of every deep neural network sits the artificial neuron—the perceptron. Inspired by biological neurons in the human brain, an artificial neuron acts as an adaptive sensory integrator. It receives an array of incoming electrical signals represented as a feature vector $\\mathbf{x} = [x_1, x_2, \\dots, x_d]$. Each input channel passes through a physical sensitivity dial—the synaptic weight $w_i$—which either amplifies or dampens the signal. The neuron sums these scaled inputs and adds a baseline threshold dial—the bias $b$—producing an internal activation potential $z = \\mathbf{w}^T \\mathbf{x} + b$.\n\nHowever, if you take these linear units and stack them into a massive network—say, a 100-layer architecture $\\mathbf{y} = \\mathbf{W}_{100}(\\dots \\mathbf{W}_2(\\mathbf{W}_1 \\mathbf{x}))\\dots$—something mathematically tragic occurs: **the linear collapse**. In linear algebra, multiplying matrices together simply produces another single matrix ($\\mathbf{W}_{\\text{eff}} = \\mathbf{W}_{100} \\dots \\mathbf{W}_1$). No matter how many millions of parameters or layers you stack, a purely linear system can only draw rigid, flat hyperplanes across space. It can never curve around complex data, separate spirals, or solve non-linear patterns.\n\nNon-linear activation functions are the mechanical hinges of deep learning. By placing a non-linear function $\\phi(z)$ after each linear combination, we introduce flexible joints into the mathematical space. Layers can now bend, warp, slice, and fold high-dimensional geometric representations to fit intricate real-world phenomena.\n\nThe three historical milestones of activation design reflect this evolution:\n1. **Sigmoid ($\\sigma(z) = \\frac{1}{1 + e^{-z}}$):** Squeezes unbounded logits into the smooth probability range $(0, 1)$. While historically popular, its tails become completely flat for large positive or negative inputs. In these saturated zones, the derivative $\\sigma'(z) \\approx 0$, causing backpropagating gradients to vanish entirely across deep architectures.\n2. **Rectified Linear Unit ($\\text{ReLU}(z) = \\max(0, z)$):** The breakthrough of modern deep learning. For positive inputs, its derivative is a rock-solid constant $1.0$, allowing gradients to flow backwards through dozens of layers without vanishing. Its weakness is the \"dying ReLU\" failure mode: if weights update such that a neuron outputs negative values for all dataset samples, its derivative freezes at 0 forever.\n3. **Gaussian Error Linear Unit ($\\text{GELU}(z) = z \\Phi(z)$):** The gold standard across frontier generative models (LLaMA, GPT-4, Mistral). GELU weights inputs by their probability under a Gaussian distribution, creating a smooth, non-monotonic curve with slight negative leakage that eliminates dead neurons while providing superior optimization curvature.",
          "ar": "في قلب كل شبكة عصبية عميقة يقبع العصبون الاصطناعي. يستقبل العصبون متجه المدخلات x، ويضرب كل إدخال في وزن مخصص w_i، ويضيف حداً ثابتاً (الانحياز b)، منتجاً مجموعاً خطياً z = w^T x + b.\n\nغير أن رصف طبقات خطية متعاقبة دون دوال تنشيط غير خطية يؤدي حتماً إلى انهيار الشبكة رياضياً إلى تحويل خطي واحد متواضع؛ حيث أن ضرب مصفوفات في بعضها يظل تحويلاً خطياً مهما بلغت طبقات الشبكة.\n\nتمثل دوال التنشيط 'المفاصل' التي تكسر قيد الخطية، مانحةً الشبكة مرونة كافية لثني الفضاء ونمذجة حدود قرار بالغة التعقيد: من Sigmoid إلى ReLU إلى GELU السلسة المعتمدة في نماذج المحولات التوليدية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "z = \\sum_{j=1}^d w_j x_j + b = \\mathbf{w}^T \\mathbf{x} + b, \\quad a = \\phi(z)",
        "formulaNote": {
          "en": "Affine projection and non-linear activation formulations.",
          "ar": "صيغ الإسقاط التآلفي ودوال التنشيط غير الخطية."
        },
        "narrative": {
          "en": "The backward sensitivity propagation through the neuron to its inputs and weights:\n\n$$\n\\frac{\\partial L}{\\partial \\mathbf{w}} = \\frac{\\partial L}{\\partial a} \\cdot \\phi'(z) \\cdot \\mathbf{x}^T, \\quad \\frac{\\partial L}{\\partial b} = \\frac{\\partial L}{\\partial a} \\cdot \\phi'(z), \\quad \\frac{\\partial L}{\\partial \\mathbf{x}} = \\frac{\\partial L}{\\partial a} \\cdot \\phi'(z) \\cdot \\mathbf{w}^T\n$$\n\nCanonical activation functions and their analytical first derivatives:\n\n$$\n\\begin{aligned}\n\\text{ReLU:} \\quad & \\phi(z) = \\max(0, z) & \\implies & \\quad \\phi'(z) = \\mathbb{I}(z > 0) \\\\\n\\text{Sigmoid:} \\quad & \\sigma(z) = \\frac{1}{1 + e^{-z}} & \\implies & \\quad \\sigma'(z) = \\sigma(z)(1 - \\sigma(z)) \\\\\n\\text{GELU:} \\quad & \\text{GELU}(z) = z \\cdot \\Phi(z) = \\frac{z}{2} \\left[ 1 + \\text{erf}\\left( \\frac{z}{\\sqrt{2}} \\right) \\right] & \\implies & \\quad \\phi'(z) = \\Phi(z) + z \\cdot \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{z^2}{2}}\n\\end{aligned}\n$$\n\n* $\\mathbf{x} \\in \\mathbb{R}^d$: The input feature vector.\n* $\\mathbf{w} \\in \\mathbb{R}^d$: Learnable synaptic weight parameters controlling directional sensitivity.\n* $b \\in \\mathbb{R}$: Learnable scalar bias parameter controlling the threshold offset.\n* $z \\in \\mathbb{R}$: The pre-activation linear potential (logit).\n* $a = \\phi(z) \\in \\mathbb{R}$: The post-activation output scalar.\n* $\\phi'(z)$: The local derivative governing how freely backward gradients propagate through the neuron.\n* $\\Phi(z) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^z e^{-t^2/2} dt$: The standard normal cumulative distribution function (CDF).\n* $\\text{erf}(u) = \\frac{2}{\\sqrt{\\pi}} \\int_0^u e^{-t^2} dt$: The Gauss error function.\n\n---\n\nImplement the forward evaluation of a single neuron `neuron_forward(x, w, b, activation)` supporting `'linear'`, `'relu'`, and `'sigmoid'` activations using vectorized NumPy operations.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nيُظهر التحليل الرياضي أن تدرج دالة الخسارة بالنسبة للأوزان والمدخلات يخضع بصورة مباشرة لعامل الضرب $\\phi'(z)$. فإذا كانت المشتقة $\\phi'(z) \\approx 0$ (كما يحدث في دالة Sigmoid عند القيم الكبيرة أو في دالة ReLU عند القيم السالبة)، ينقطع تدفق التدرج وتتجمد الأوزان المشبكية، في حين تضمن الدوال المستمرة الحديثة بقاء نوافذ التدفق مفتوحة باستمرار.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-perceptron-activation",
          "starterCode": "import numpy as np\n\ndef neuron_forward(x: np.ndarray, w: np.ndarray, b: float, activation: str = 'relu') -> float:\n    \"\"\"\n    Computes forward pass of a single artificial neuron with activation.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (D,) - Input vector\n    w : np.ndarray of shape (D,) - Weight vector\n    b : float - Scalar bias\n    activation : str - One of 'linear', 'relu', 'sigmoid'\n    \n    Returns\n    -------\n    float - Post-activation neuron output\n    \"\"\"\n    # Step 1: Calculate affine linear pre-activation z = w^T x + b\n    z = float(np.dot(w, x) + b)\n    \n    # Step 2: Apply the requested non-linear activation operator\n    if activation == 'linear':\n        return z\n    elif activation == 'relu':\n        return max(0.0, z)\n    elif activation == 'sigmoid':\n        return 1.0 / (1.0 + np.exp(-z))\n    else:\n        raise ValueError(f\"Unsupported activation: {activation}\")",
          "testCases": [
            {
              "input": "x = np.array([2.0, -1.0]); w = np.array([1.5, 3.0]); b = 1.0; print(neuron_forward(x, w, b, 'relu'))",
              "expected": "1.0"
            },
            {
              "input": "x = np.array([1.0, 1.0]); w = np.array([-2.0, -1.0]); b = 0.0; print(neuron_forward(x, w, b, 'relu'))",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef neuron_forward(x: np.ndarray, w: np.ndarray, b: float, activation: str = 'relu') -> float:\n    \"\"\"\n    Computes forward pass of a single artificial neuron with activation.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (D,) - Input vector\n    w : np.ndarray of shape (D,) - Weight vector\n    b : float - Scalar bias\n    activation : str - One of 'linear', 'relu', 'sigmoid'\n    \n    Returns\n    -------\n    float - Post-activation neuron output\n    \"\"\"\n    # Step 1: Calculate affine linear pre-activation z = w^T x + b\n    z = float(np.dot(w, x) + b)\n    \n    # Step 2: Apply the requested non-linear activation operator\n    if activation == 'linear':\n        return z\n    elif activation == 'relu':\n        return max(0.0, z)\n    elif activation == 'sigmoid':\n        return 1.0 / (1.0 + np.exp(-z))\n    else:\n        raise ValueError(f\"Unsupported activation: {activation}\")",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef neuron_forward(x: np.ndarray, w: np.ndarray, b: float, activation: str = 'relu') -> float:\n    z = float(np.dot(w, x) + b)\n    if activation == 'relu':\n        return float(max(0.0, z))\n    elif activation == 'sigmoid':\n        return float(1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0))))\n    elif activation == 'linear':\n        return z\n    else:\n        raise ValueError(f'Unknown activation: {activation}')"
        },
        "hints": {
          "tier1": {
            "en": "Compute `z = np.dot(w, x) + b` first.",
            "ar": "احسب الإسقاط الخطي `z = np.dot(w, x) + b` أولاً."
          },
          "tier2": {
            "en": "Use `max(0.0, z)` for ReLU and `1.0 / (1.0 + np.exp(-z))` for Sigmoid.",
            "ar": "استخدم `max(0.0, z)` لـ ReLU و `1.0 / (1.0 + np.exp(-z))` لـ Sigmoid."
          },
          "tier3": {
            "en": "Return float value cast appropriately to match expected test outputs.",
            "ar": "أرجع القيمة كعدد عشري `float` لتطابق مخرجات الاختبار."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does the \"Dying ReLU\" phenomenon occur during the training of deep networks, and why do smooth activations like GELU eliminate it?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ العصبون الاصطناعي ودوال التنشيط غير الخطية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "If large gradient updates drive a neuron's weights such that $z = \\mathbf{w}^T \\mathbf{x} + b < 0$ for all training samples, the ReLU derivative is identically zero ($\\phi'(z) = 0$). No gradient can ever flow backward through the neuron, freezing its weights permanently. GELU avoids this by retaining a small, non-zero curvature in the negative regime.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Dying ReLU refers to hardware memory leaks caused by evaluating the maximum operator on GPUs.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "ReLU neurons die because floating-point numbers cannot represent negative zero in Python.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "GELU forces all gradients to be strictly positive numbers.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "numerically-stable-softmax-cross-entropy",
    "title": "Softmax & Cross-Entropy Loss with Log-Sum-Exp Stability",
    "titleAr": "دالة الاحتمالات Softmax ودالة الخسارة التقاطعية بالاستقرار العددي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In multi-class classification and next-token prediction in large language models, the final linear layer outputs an unconstrained vector of...",
      "ar": "في مهام التصنيف وتوليد النصوص، تخرج الشبكة العصبية متجهاً من الأرقام الحقيقية غير المقيدة يُعرف بـ القيم المنطقية (Logits)."
    },
    "prerequisites": [
      "perceptron-activation",
      "logistic-regression-sigmoid"
    ],
    "x": 1015,
    "y": 460,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "In multi-class classification and next-token prediction in large language models, the final linear layer outputs an unconstrained vector of real numbers called **logits** $\\mathbf{z} \\in (-\\infty, \\infty)^K$. A logit can be $-42.8$, $+0.1$, or $+950.4$. How do we transform these arbitrary unbounded numbers into a valid, coherent probability distribution where every outcome is non-negative and all outcomes sum to exactly $100\\%$ ($1.0$)?\n\nWhy can't we simply divide each logit by their sum? Because raw logits can be negative! Dividing by a sum could yield negative probabilities or cause division by zero if the numbers sum to zero. The **Softmax** operator solves this by exponentiating each logit ($e^{z_i}$). Exponentiation maps any real number—no matter how negative—into a strictly positive value ($e^z > 0$). Then, dividing each exponential by the sum of all exponentials normalizes the vector into a valid probability simplex.\n\nOnce we have predicted probabilities, **Cross-Entropy Loss** acts as an information-theoretic \"surprise meter\": $\\mathcal{L} = -\\log(p_{\\text{target}})$. If the model assigns $99\\%$ probability ($p = 0.99$) to the correct ground-truth token, $-\\log(0.99) \\approx 0.01$ (minimal surprise, negligible loss). But if the model assigns only $0.1\\%$ probability ($p = 0.001$), $-\\log(0.001) \\approx 6.9$ (severe surprise, massive loss penalty).\n\n**The Numerical Stability Trap & The Log-Sum-Exp Rescue:**\nComputers represent numbers using finite 32-bit floating-point registers (IEEE 754 float32). The largest number float32 can represent before overflowing is approximately $e^{88.7} \\approx 3.4 \\times 10^{38}$. If an untrained network outputs a logit of $+1000$, evaluating $e^{1000}$ triggers floating-point overflow to `+inf`. Dividing `inf / inf` produces `NaN` (Not a Number), instantly corrupting every gradient and parameter in the model!\n\nThe mathematical salvation is the **Log-Sum-Exp trick**: we subtract the maximum logit $c = \\max(\\mathbf{z})$ from every logit before exponentiating. Because multiplying the numerator and denominator by $e^{-c}$ cancels out exactly:\n$$\n\\frac{e^{z_i - c}}{\\sum_j e^{z_j - c}} = \\frac{e^{-c} e^{z_i}}{e^{-c} \\sum_j e^{z_j}} = \\frac{e^{z_i}}{\\sum_j e^{z_j}}\n$$\nThe probabilities are mathematically identical, but now the largest exponent is guaranteed to be $e^0 = 1.0$. Overflow is banished forever!",
          "ar": "في مهام التصنيف وتوليد النصوص، تخرج الشبكة العصبية متجهاً من الأرقام الحقيقية غير المقيدة يُعرف بـ القيم المنطقية (Logits). تقوم دالة Softmax برفعها أسياً لضمان إيجابيتها ثم قسمتها على مجموع الأسس لتتحول إلى توزيع احتمالي يتكامل إلى 1.0 تماماً.\n\nتقيس دالة الخسارة التقاطعية (Cross-Entropy) مدى دقة التنبؤ بحساب سالب لوغاريتم احتمال الفئة المستهدفة. غير أن الحساب المباشر لهذه الدالة على الحواسيب يسبب فيضاناً عددياً كارثياً عند رفع قيم كبرى مثل e^1000.\n\nتحل حيلة لوغاريتم مجموع الأسس (Log-Sum-Exp Trick) هذه المعضلة بطرح القيمة العظمى max(z) من جميع القيم قبل الرفع الأسي، مما يضمن ألا يتجاوز أي أس القيمة صفر ويحقق استقراراً عددياً مطلقاً."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "p_i = \\frac{\\exp(z_i - \\max_k z_k)}{\\sum_{j=1}^K \\exp(z_j - \\max_k z_k)}, \\quad \\mathcal{L}_{\\text{CE}} = -\\sum_{k=1}^K y_k \\log p_k = -\\log p_{y^*}",
        "formulaNote": {
          "en": "Numerically stabilized Softmax, Cross-Entropy loss, and simplified analytical residual gradient.",
          "ar": "صيغة Softmax المستقرة عددياً، دالة الخسارة التقاطعية، والتدرج المتبقي التحليلي البسيط."
        },
        "narrative": {
          "en": "The log-partition function (Log-Sum-Exp) identity demonstrating exact shift invariance:\n\n$$\n\\text{LSE}(\\mathbf{z} - c) + c = \\log\\left(\\sum_{j=1}^K e^{z_j - c}\\right) + c = \\log\\left(e^{-c} \\sum_{j=1}^K e^{z_j}\\right) + c = \\log\\left(\\sum_{j=1}^K e^{z_j}\\right) = \\text{LSE}(\\mathbf{z})\n$$\n\nThe combined analytical Jacobian-gradient with respect to raw input logits $z_i$ simplifies to the remarkably clean error residual:\n\n$$\n\\frac{\\partial \\mathcal{L}_{\\text{CE}}}{\\partial z_i} = p_i - y_i\n$$\n\n* $\\mathbf{z} \\in \\mathbb{R}^K$: Unnormalized model logits (`logits`).\n* $\\max_k z_k \\in \\mathbb{R}$: The maximum logit shift constant $c$ preventing exponential overflow.\n* $p_i \\in (0, 1)$: Predicted probability assigned to class $i$, satisfying $\\sum_{i=1}^K p_i = 1$.\n* $\\mathbf{y} \\in \\{0, 1\\}^K$: One-hot ground truth label vector with target index $y^*$ where $y_{y^*} = 1$ and $y_{k \\ne y^*} = 0$.\n* $\\mathcal{L}_{\\text{CE}} \\in [0, \\infty)$: The scalar cross-entropy objective.\n* $p_i - y_i$: The upstream gradient flowing backward into the output layer logits (`grad`).\n\n---\n\nImplement the numerically stable `softmax_cross_entropy(logits, target_idx)` function using the max-subtraction trick. Return the scalar loss, the probability distribution vector, and the analytical gradient vector $(p - y)$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتتميز تركيبة دالة الاحتمالات Softmax ودالة الخسارة التقاطعية بأن مشتقتها المشتركة بالنسبة للقيم المنطقية $z_i$ تختزل جبرياً إلى فارق مباشر وأنيق: $\\frac{\\partial \\mathcal{L}}{\\partial z_i} = p_i - y_i$. فإذا تنبأ النموذج باحتمال $0.85$ للفئة المستهدفة ($y = 1$)، فإن التدرج العكسي هو $-0.15$ دافعاً القيمة المنطقية إلى الصعود، وإذا تنبأ باحتمال $0.20$ لفئة خاطئة ($y = 0$)، فإن التدرج هو $+0.20$ دافعاً إياها إلى الهبوط.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-numerically-stable-softmax-cross-entropy",
          "starterCode": "def softmax_cross_entropy(logits: np.ndarray, target_idx: int) -> tuple[float, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes numerically stable softmax probabilities, cross-entropy loss, and gradients.\n    \n    Parameters\n    ----------\n    logits : np.ndarray of shape (K,) - Raw unnormalized scores\n    target_idx : int - Integer index of true ground-truth class\n    \n    Returns\n    -------\n    tuple of (loss: float, probs: np.ndarray, grad: np.ndarray)\n    \"\"\"\n    # Step 1: Subtract max(logits) across the vector to prevent exponential overflow\n    # Step 2: Compute exponentiated scores and normalize into probabilities summing to 1.0\n    # Step 3: Compute categorical cross-entropy loss: -log(probs[target_idx] + epsilon)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "logits = np.array([2.0, 1.0, 0.1]); loss, probs, grad = softmax_cross_entropy(logits, 0); print(f\"{probs.sum():.1f},{loss > 0}\")",
              "expected": "1.0,True"
            },
            {
              "input": "logits = np.array([1000.0, 1000.0]); loss, probs, grad = softmax_cross_entropy(logits, 0); print(f\"{probs[0]:.1f},{loss:.4f}\")",
              "expected": "0.5,0.6931"
            }
          ],
          "expectedOutput": "1.0,True",
          "variants": {
            "python": {
              "starterCode": "def softmax_cross_entropy(logits: np.ndarray, target_idx: int) -> tuple[float, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes numerically stable softmax probabilities, cross-entropy loss, and gradients.\n    \n    Parameters\n    ----------\n    logits : np.ndarray of shape (K,) - Raw unnormalized scores\n    target_idx : int - Integer index of true ground-truth class\n    \n    Returns\n    -------\n    tuple of (loss: float, probs: np.ndarray, grad: np.ndarray)\n    \"\"\"\n    # Step 1: Subtract max(logits) across the vector to prevent exponential overflow\n    # Step 2: Compute exponentiated scores and normalize into probabilities summing to 1.0\n    # Step 3: Compute categorical cross-entropy loss: -log(probs[target_idx] + epsilon)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0,True"
            }
          },
          "solution": "import numpy as np\n\ndef softmax_cross_entropy(logits: np.ndarray, target_idx: int) -> tuple[float, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes numerically stable softmax probabilities, cross-entropy loss, and gradients.\n    \n    Parameters\n    ----------\n    logits : np.ndarray of shape (K,) - Raw unnormalized scores\n    target_idx : int - Integer index of true ground-truth class\n    \n    Returns\n    -------\n    tuple of (loss: float, probs: np.ndarray, grad: np.ndarray)\n    \"\"\"\n    # Step 1: Subtract max(logits) across the vector to prevent exponential overflow\n    shifted_logits = logits - np.max(logits)\n    \n    # Step 2: Compute exponentiated scores and normalize into probabilities summing to 1.0\n    exp_scores = np.exp(shifted_logits)\n    probs = exp_scores / np.sum(exp_scores)\n    \n    # Step 3: Compute categorical cross-entropy loss: -log(probs[target_idx] + epsilon)\n    loss = float(-np.log(probs[target_idx] + 1e-15))\n    \n    # Step 4: Compute analytical gradient vector: grad = probs - one_hot\n    grad = probs.copy()\n    grad[target_idx] -= 1.0\n    \n    return loss, probs, grad"
        },
        "hints": {
          "tier1": {
            "en": "Subtract `np.max(logits)` before applying `np.exp`.",
            "ar": "اطرح `np.max(logits)` قبل تطبيق دالة الأسس `np.exp`."
          },
          "tier2": {
            "en": "Divide `exp_shifted` by `np.sum(exp_shifted)` to get normalized probabilities.",
            "ar": "اقسم `exp_shifted` على مجموعها للحصول على الاحتمالات المعايرة."
          },
          "tier3": {
            "en": "Gradient is simply `probs.copy()` with `grad[target_idx] -= 1.0`.",
            "ar": "التدرج التحليلي هو نسخة من متجه الاحتمالات مع طرح 1.0 من فئة الهدف."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does the analytical gradient of combined Softmax and Cross-Entropy simplify to $(p_i - y_i)$, and what training catastrophic failure occurs if Mean Squared Error (MSE) is used instead of Cross-Entropy for classification?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ دالة الاحتمالات Softmax ودالة الخسارة التقاطعية بالاستقرار العددي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The derivative of the logarithm in cross-entropy ($\\frac{d}{dp}(-\\log p) = -\\frac{1}{p}$) cancels the probability denominator in the softmax Jacobian, leaving a constant-scale error signal $(p_i - y_i)$. If MSE were used, the gradient would contain an extra factor of $p_i(1 - p_i)$; when the model makes a confident wrong prediction ($p_i \\approx 0$), $p_i(1 - p_i) \\approx 0$, causing gradients to vanish and permanently freezing learning.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The gradient simplifies because softmax and cross-entropy are linear functions of the parameters.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Mean Squared Error is mathematically undefined for vectors with more than two elements.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Cross-entropy guarantees that all eigenvalues of the parameter Hessian matrix are strictly negative.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "two-layer-mlp-xor-boundary",
    "title": "Two-Layer Multi-Layer Perceptron & The Non-Linear XOR Boundary",
    "titleAr": "الشبكة متعددة الطبقات وحدود القرار غير الخطية لمعضلة XOR",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In 1969, two of the founding fathers of artificial intelligence, Marvin Minsky and Seymour Papert, published a historic monograph titled...",
      "ar": "في عام 1969، برهن مينسكي وبابيرت على عجز العصبون المنفرد عن حل بوابة XOR لأن الخط المستقيم يعجز عن فصل النقاط المتقاطعة قطرياً: (0,0) و..."
    },
    "prerequisites": [
      "perceptron-activation",
      "numerically-stable-softmax-cross-entropy"
    ],
    "x": 995,
    "y": 555,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "In 1969, two of the founding fathers of artificial intelligence, Marvin Minsky and Seymour Papert, published a historic monograph titled *Perceptrons*. In it, they delivered a devastating mathematical proof: a single-layer perceptron could never learn the simple XOR (Exclusive OR) logical function. This revelation shattered funding for connectionist AI and plunged the field into the first \"AI Winter,\" convincing a generation of scientists that artificial neural networks were an evolutionary dead end.\n\nWhy did the humble XOR gate defeat the perceptron? Consider the four corners of a unit square in 2D space:\n* $(0, 0) \\to 0$ (Negative class)\n* $(0, 1) \\to 1$ (Positive class)\n* $(1, 0) \\to 1$ (Positive class)\n* $(1, 1) \\to 0$ (Negative class)\n\nPlace these four points on a sheet of paper. Now, try to lay down a single straight ruler to separate the two positive points from the two negative points. It is geometrically impossible! The positive points lie on one diagonal, while the negative points lie on the opposing diagonal. A single perceptron can only draw a straight linear boundary ($w_1 x_1 + w_2 x_2 + b = 0$). No straight line can slice space to isolate crisscrossing diagonals.\n\nThe conceptual breakthrough that resurrected neural networks is the **Multi-Layer Perceptron (MLP)**. By inserting just a single hidden layer of non-linear neurons between the inputs and the output, the network becomes an origami paper-folding machine! The hidden layer physically warps and bends the coordinate space:\n1. **Hidden Neuron 1** sets its threshold to fire whenever *either* input is active ($x_1 + x_2 \\ge 1$), acting like a logical OR gate.\n2. **Hidden Neuron 2** sets its threshold to fire only when *both* inputs are active ($x_1 + x_2 \\ge 2$), acting like a logical AND gate.\n3. **The Output Neuron** simply subtracts the two representations: $\\text{Output} = \\text{OR} - 2 \\times \\text{AND}$!\n\nBy mapping the 2D coordinate space through these non-linear ReLU hinges, the corner point $(1, 1)$ is folded over and repositioned. In this newly warped hidden representation space, the positive and negative points are no longer entangled diagonally: they sit cleanly on opposite sides of a single flat hyperplane! This is the profound essence of deep representation learning: stacking layers to fold complex data manifolds until entangled patterns become linearly separable.",
          "ar": "في عام 1969، برهن مينسكي وبابيرت على عجز العصبون المنفرد عن حل بوابة XOR لأن الخط المستقيم يعجز عن فصل النقاط المتقاطعة قطرياً: (0,0) و (1,1) مقابل (0,1) و (1,0).\n\nيكمن الحل في إضافة طبقة خفية واحدة من العصبونات غير الخطية لتكوين شبكة متعددة الطبقات (MLP). تعمل العصبونات الخفية كآلة طي هندسية: يتعرف العصبون الأول على وجود أي مدخل نشط (بوابة OR)، بينما يرصد العصبون الثاني تفعيل كلا المدخلين (بوابة AND)، ثم يطرح عصبون المخرج الأخير ناتج البوابتين!\n\nيؤدي المرور عبر الطبقة الخفية إلى طي الفضاء الإحداثي بحيث تصبح النقاط قابلة للفصل الخطي تماماً، مجسداً المبدأ الجوهري للتعلم العميق: رصف الطبقات غير الخطية لفك تشابك فضاءات البيانات المعقدة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{h} = \\text{ReLU}(\\mathbf{W}_1 \\mathbf{x} + \\mathbf{b}_1), \\quad \\hat{y} = \\mathbf{w}_2^T \\mathbf{h} + b_2",
        "formulaNote": {
          "en": "Two-layer MLP formulation and canonical analytical weights solving the XOR problem.",
          "ar": "صيغة شبكة MLP ذات الطبقتين والأوزان التحليلية القياسية لحل معضلة XOR."
        },
        "narrative": {
          "en": "The canonical hand-crafted weight configuration that analytically solves the XOR problem:\n\n$$\n\\mathbf{W}_1 = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}, \\quad \\mathbf{b}_1 = \\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix}, \\quad \\mathbf{w}_2 = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}, \\quad b_2 = 0\n$$\n\nVerification across all four vertices of the XOR truth table:\n\n$$\n\\begin{aligned}\n\\mathbf{x} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} & \\implies \\mathbf{z}_1 = \\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix} & \\implies \\mathbf{h} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} & \\implies \\hat{y} = 1(0) - 2(0) + 0 = 0 \\\\\n\\mathbf{x} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} & \\implies \\mathbf{z}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} & \\implies \\mathbf{h} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} & \\implies \\hat{y} = 1(1) - 2(0) + 0 = 1 \\\\\n\\mathbf{x} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} & \\implies \\mathbf{z}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} & \\implies \\mathbf{h} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} & \\implies \\hat{y} = 1(1) - 2(0) + 0 = 1 \\\\\n\\mathbf{x} = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} & \\implies \\mathbf{z}_1 = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} & \\implies \\mathbf{h} = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} & \\implies \\hat{y} = 1(2) - 2(1) + 0 = 0\n\\end{aligned}\n$$\n\nDuring reverse-mode backpropagation, given a scalar loss objective $L$ and prediction error sensitivity $\\bar{y} \\coloneqq \\frac{\\partial L}{\\partial \\hat{y}}$, the backward pass calculates parameter and input adjoints via the matrix chain rule:\n\n$$\n\\frac{\\partial L}{\\partial \\mathbf{w}_2} = \\bar{y} \\mathbf{h}, \\quad \\frac{\\partial L}{\\partial b_2} = \\bar{y}\n$$\n\n$$\n\\frac{\\partial L}{\\partial \\mathbf{h}} = \\bar{y} \\mathbf{w}_2, \\quad \\frac{\\partial L}{\\partial \\mathbf{z}_1} = \\frac{\\partial L}{\\partial \\mathbf{h}} \\odot \\mathbb{I}(\\mathbf{z}_1 > 0)\n$$\n\n$$\n\\frac{\\partial L}{\\partial \\mathbf{W}_1} = \\frac{\\partial L}{\\partial \\mathbf{z}_1} \\mathbf{x}^T, \\quad \\frac{\\partial L}{\\partial \\mathbf{b}_1} = \\frac{\\partial L}{\\partial \\mathbf{z}_1}, \\quad \\frac{\\partial L}{\\partial \\mathbf{x}} = \\mathbf{W}_1^T \\frac{\\partial L}{\\partial \\mathbf{z}_1}\n$$\n\n* $\\mathbf{x} \\in \\mathbb{R}^2$: The binary input vector $[x_1, x_2]^T$.\n* $\\mathbf{W}_1 \\in \\mathbb{R}^{2 \\times 2}$: Hidden layer projection weight matrix.\n* $\\mathbf{b}_1 \\in \\mathbb{R}^2$: Hidden layer bias vector shifting activation thresholds.\n* $\\mathbf{z}_1 = \\mathbf{W}_1 \\mathbf{x} + \\mathbf{b}_1 \\in \\mathbb{R}^2$: Pre-activation hidden linear potential.\n* $\\mathbf{h} \\in \\mathbb{R}^2$: The folded non-linear latent feature representation.\n* $\\mathbf{w}_2 \\in \\mathbb{R}^2$: Output layer linear weights combining the folded representations.\n* $b_2 \\in \\mathbb{R}$: Output layer bias scalar.\n* $\\hat{y} \\in \\mathbb{R}$: Continuous output logit, mapped to $\\{0, 1\\}$ by thresholding at $0.5$.\n* $\\bar{y} = \\frac{\\partial L}{\\partial \\hat{y}}$: Output prediction error gradient.\n* $\\frac{\\partial L}{\\partial \\mathbf{W}_1}, \\frac{\\partial L}{\\partial \\mathbf{w}_2}$: Weight gradients accumulating outer products of sensitivities and forward activations.\n* $\\odot$: Element-wise Hadamard product with the ReLU derivative indicator $\\mathbb{I}(\\mathbf{z}_1 > 0)$.\n\n---\n\nImplement the forward pass of a 2-layer MLP `mlp_xor_forward(x, W1, b1, w2, b2)`. Use the analytical XOR weights as defaults so that the network evaluates the complete XOR truth table with 100% accuracy.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nوفق مبرهنة التقريب الشامل (Universal Approximation Theorem)، تكفي طبقة خفية واحدة ذات سعة كافية ودوال تنشيط غير خطية لتقريب أي دالة رياضية مستمرة على مجالات مدمجة. تقوم مصفوفة الأوزان الأولى $\\mathbf{W}_1$ بتدوير وتمديد الفضاء، بينما تقوم دالة ReLU بقص المناطق السالبة وطي الفضاء، مما يسمح للعصبون الأخير برسم حد قرار قاطع ودقيق. وفي المسار العكسي، تنتقل التدرجات عبر الضرب المصفوفي وقاعدة السلسلة لتحديث كل وزن بما يتناسب مع مساهمته في تصحيح الخطأ.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-layer-mlp-xor-boundary",
          "starterCode": "import numpy as np\n\ndef mlp_xor_forward(x: np.ndarray, \n                     W1: np.ndarray | None = None, \n                     b1: np.ndarray | None = None, \n                     w2: np.ndarray | None = None, \n                     b2: float = 0.0) -> float:\n    \"\"\"\n    Computes the forward pass of a 2-layer MLP solving the XOR logic function.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (2,) - Binary input vector [x1, x2]\n    W1 : np.ndarray of shape (2, 2) - First layer weight matrix\n    b1 : np.ndarray of shape (2,) - First layer bias vector\n    w2 : np.ndarray of shape (2,) - Output layer weight vector\n    b2 : float - Output layer bias scalar\n    \n    Returns\n    -------\n    float - Scalar output prediction\n    \"\"\"\n    if W1 is None:\n        W1 = np.array([[1.0, 1.0], [1.0, 1.0]])\n        b1 = np.array([0.0, -1.0])\n        w2 = np.array([1.0, -2.0])\n        b2 = 0.0\n\n    # Step 1: Compute hidden linear pre-activations z1 = W1 @ x + b1\n    z1 = np.dot(W1, x) + b1\n    \n    # Step 2: Apply element-wise ReLU activation to obtain folded representations\n    h = np.maximum(0.0, z1)\n    \n    # Step 3: Compute final scalar output z2 = w2 @ h + b2\n    out = float(np.dot(w2, h) + b2)\n    return out",
          "testCases": [
            {
              "input": "X = np.array([[0,0],[0,1],[1,0],[1,1]]); preds = [mlp_xor_forward(x) for x in X]; print([int(round(p)) for p in preds])",
              "expected": "[0, 1, 1, 0]"
            },
            {
              "input": "print(mlp_xor_forward(np.array([1.0, 0.0])))",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "[0, 1, 1, 0]",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef mlp_xor_forward(x: np.ndarray, \n                     W1: np.ndarray | None = None, \n                     b1: np.ndarray | None = None, \n                     w2: np.ndarray | None = None, \n                     b2: float = 0.0) -> float:\n    \"\"\"\n    Computes the forward pass of a 2-layer MLP solving the XOR logic function.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (2,) - Binary input vector [x1, x2]\n    W1 : np.ndarray of shape (2, 2) - First layer weight matrix\n    b1 : np.ndarray of shape (2,) - First layer bias vector\n    w2 : np.ndarray of shape (2,) - Output layer weight vector\n    b2 : float - Output layer bias scalar\n    \n    Returns\n    -------\n    float - Scalar output prediction\n    \"\"\"\n    if W1 is None:\n        W1 = np.array([[1.0, 1.0], [1.0, 1.0]])\n        b1 = np.array([0.0, -1.0])\n        w2 = np.array([1.0, -2.0])\n        b2 = 0.0\n\n    # Step 1: Compute hidden linear pre-activations z1 = W1 @ x + b1\n    z1 = np.dot(W1, x) + b1\n    \n    # Step 2: Apply element-wise ReLU activation to obtain folded representations\n    h = np.maximum(0.0, z1)\n    \n    # Step 3: Compute final scalar output z2 = w2 @ h + b2\n    out = float(np.dot(w2, h) + b2)\n    return out",
              "expectedOutput": "[0, 1, 1, 0]"
            }
          },
          "solution": "import numpy as np\n\ndef mlp_xor_forward(x: np.ndarray, \n                     W1: np.ndarray | None = None, \n                     b1: np.ndarray | None = None, \n                     w2: np.ndarray | None = None, \n                     b2: float = 0.0) -> float:\n    if W1 is None:\n        W1 = np.array([[1.0, 1.0], [1.0, 1.0]])\n        b1 = np.array([0.0, -1.0])\n        w2 = np.array([1.0, -2.0])\n        b2 = 0.0\n    z1 = np.dot(W1, x) + b1\n    h = np.maximum(0.0, z1)\n    z2 = float(np.dot(w2, h) + b2)\n    return float(z2)"
        },
        "hints": {
          "tier1": {
            "en": "Compute `z1 = np.dot(W1, x) + b1` for the hidden layer.",
            "ar": "احسب الإسقاط الخفي عبر `z1 = np.dot(W1, x) + b1`."
          },
          "tier2": {
            "en": "Apply ReLU using `h = np.maximum(0.0, z1)`.",
            "ar": "طبق دالة التنشيط ReLU عبر `h = np.maximum(0.0, z1)`."
          },
          "tier3": {
            "en": "Return `float(np.dot(w2, h) + b2)` for the output prediction.",
            "ar": "احسب وأرجع ناتج المخرج عبر `float(np.dot(w2, h) + b2)`."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "If all activation functions across a 1,000-layer deep neural network are replaced with linear identity functions ($\\phi(z) = z$), can the network solve the non-linear XOR problem?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الشبكة متعددة الطبقات وحدود القرار غير الخطية لمعضلة XOR تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "No, because the composition of any sequence of linear transformations is strictly linear ($\\mathbf{W}_{1000} \\dots \\mathbf{W}_1 \\mathbf{x} = \\mathbf{W}_{\\text{eff}} \\mathbf{x}$); without non-linear activations, the network can only produce linear hyperplanes, possessing no more expressive power than a single perceptron.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Yes, provided the hidden layers have at least 1,000 neurons each.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Yes, because backpropagation will convert the linear weights into non-linear functions during training.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "No, because linear networks cannot be trained using gradient descent.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "gradient-descent",
    "title": "Gradient Descent Optimization: Batch, Stochastic & Mini-Batch",
    "titleAr": "خوارزمية الانحدار التدريجي: الدفعة الكاملة، العشوائي، والدفعات المصغرة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are a hiker stranded high on an unfamiliar, rugged mountain range completely enveloped in dense, blinding fog.",
      "ar": "تخيّل أنك متسلق جبال تائه وسط ضباب كثيف يحجب عنك رؤية الوادي المنشود (نقطة النهاية الصغرى لدالة الخسارة)."
    },
    "prerequisites": [
      "two-layer-mlp-xor-boundary",
      "t1-18"
    ],
    "x": 975,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GradientDescentCanvas",
        "narrative": {
          "en": "Imagine you are a hiker stranded high on an unfamiliar, rugged mountain range completely enveloped in dense, blinding fog. You cannot see two feet in front of your face, and you have no map showing where the lowest valley (the global minimum of the loss function $\\mathcal{L}$) lies. Yet, beneath your boots, you can feel the physical tilt of the rock: you can instantly tell which direction leads steepest uphill ($\\nabla \\mathcal{L}$), and which direction leads steepest downhill ($-\\nabla \\mathcal{L}$).\n\nIf you take a cautious step in the direction of steepest descent, scaled by your stride length $\\eta$ (the learning rate), you are mathematically guaranteed to reach lower ground locally: $\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta \\mathbf{g}_t$. Repeat this process thousands of times, and you will eventually descend into a deep basin.\n\nIn machine learning, how we measure this downhill slope defines the three classical optimization paradigms:\n1. **Full-Batch Gradient Descent ($B = N$):** You survey all 1,000,000 pebbles on the entire mountain before taking a single step. The slope measurement is completely exact and deterministic, but processing the entire dataset for every single parameter update is computationally crushing and memory-prohibitive for large-scale modern datasets.\n2. **Stochastic Gradient Descent (SGD, $B = 1$):** You inspect a single randomly selected pebble and immediately leap in its downhill direction. Each step is lightning fast, but the gradient estimate is noisy and erratic—the optimizer bounces wildly in jagged, random zigzags across the landscape.\n3. **Mini-Batch Gradient Descent ($1 < B < N$):** The gold standard of modern deep learning. You sample a squad of 32, 64, or 256 pebbles. This strikes the ideal sweet spot: it saturates GPU parallel tensor cores with efficient matrix multiplications, while preserving just enough stochastic gradient noise to physically shake the parameters out of narrow, sharp local crevices into broad, flat valleys that generalize robustly to unseen data.",
          "ar": "تخيّل أنك متسلق جبال تائه وسط ضباب كثيف يحجب عنك رؤية الوادي المنشود (نقطة النهاية الصغرى لدالة الخسارة). ورغم انعدام الرؤية، تستطيع قدماك استشعار ميل الأرض تحتهما مباشرة: الاتجاه المنحدر بشدة يمثل سالب التدرج. وبأخذ خطوة في اتجاه الانحدار بمقدار معدل التعلم lr، تقترب حتماً من قاع الوادي.\n\nتحدد طريقة جمع إشارات الميل الأنماط الثلاثة للانحدار التدريجي:\n1. الانحدار الإجمالي (Batch GD): فحص جميع العينات قبل كل خطوة. دقيق لكنه بطيء ومكلف حاسوبياً.\n2. الانحدار العشوائي الخالص (SGD): أخذ خطوة سريعة بناءً على عينة واحدة. سريع لكنه شديد التذبذب.\n3. انحدار الدفعات المصغرة (Mini-Batch GD): المعيار الذهبي المعتمد عالمياً؛ تجميع 32 إلى 256 عينة معاً لاستغلال المعالجات الرسومية وتوفير مسار هبوط متزن."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{L}(\\boldsymbol{\\theta}) = \\frac{1}{N} \\sum_{i=1}^N \\ell(f(\\mathbf{x}_i; \\boldsymbol{\\theta}), y_i)",
        "formulaNote": {
          "en": "Mini-batch empirical risk gradient estimator and parameter update step.",
          "ar": "مقدّر تدرج المخاطرة التجريبية للدفعة المصغرة وخطوة تحديث المعاملات."
        },
        "narrative": {
          "en": "The parameter update rule at iteration $t$ using a mini-batch $\\mathcal{B}_t \\subset \\{1, \\dots, N\\}$ of size $B = |\\mathcal{B}_t|$:\n\n$$\n\\mathbf{g}_t = \\frac{1}{B} \\sum_{i \\in \\mathcal{B}_t} \\nabla_{\\boldsymbol{\\theta}} \\ell(f(\\mathbf{x}_i; \\boldsymbol{\\theta}_t), y_i), \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta \\mathbf{g}_t\n$$\n\nThe stochastic mini-batch gradient $\\mathbf{g}_t$ is an unbiased estimator of the true population gradient, with variance inversely proportional to the mini-batch size $B$:\n\n$$\n\\mathbb{E}_{\\mathcal{B}_t}[\\mathbf{g}_t] = \\nabla \\mathcal{L}(\\boldsymbol{\\theta}_t), \\quad \\text{Var}(\\mathbf{g}_t) = \\frac{\\sigma^2}{B} \\left(\\frac{N - B}{N - 1}\\right) \\propto \\frac{1}{B}\n$$\n\n* $\\boldsymbol{\\theta}_t \\in \\mathbb{R}^P$: The parameter vector of all learnable weights and biases at optimization step $t$.\n* $\\eta > 0$: The learning rate hyperparameter governing update step magnitude.\n* $\\mathcal{B}_t$: Random mini-batch subset sampled uniformly without replacement from $\\{1, \\dots, N\\}$.\n* $B = |\\mathcal{B}_t|$: Mini-batch size (e.g., $32, 64, 128$).\n* $\\mathbf{g}_t \\in \\mathbb{R}^P$: The empirical mini-batch gradient vector.\n* $\\text{Var}(\\mathbf{g}_t)$: The variance of the gradient estimator, which vanishes as $B \\to N$ and peaks when $B = 1$.\n\n---\n\nImplement the single-step parameter update function `sgd_step(params, grads, lr)` that performs vectorized gradient descent updates across parameter tensors.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nيمثل متجه التدرج $\\mathbf{g}_t$ تقديراً إحصائياً غير متحيز للميل الحقيقي لدالة الخسارة. تتناسب ضوضاء التقدير (التباين $\\text{Var}$) عكسياً مع حجم الدفعة $B$. وتعمل هذه الضوضاء العشوائية كمنظم ضمني (Implicit Regularizer)، مما يمنع المعاملات من الوقوف في نهايات صغرى حادة وضعيفة التعميم، ويوجهها نحو أودية واسعة ومستقرة.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-descent",
          "starterCode": "def sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:\n    \"\"\"\n    Executes a single Gradient Descent parameter update step.\n    \n    Parameters\n    ----------\n    params : np.ndarray - Current parameter values\n    grads : np.ndarray - Evaluated gradient vector with respect to params\n    lr : float - Learning rate step size\n    \n    Returns\n    -------\n    np.ndarray - Updated parameter vector\n    \"\"\"\n    # Step 1: Scale the gradient direction vector by the learning rate stride\n    # Step 2: Update parameters by stepping in the direction of steepest descent\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "p = np.array([5.0, -3.0]); g = np.array([2.0, -1.0]); res = sgd_step(p, g, lr=0.1); print(f\"{res[0]:.1f},{res[1]:.1f}\")",
              "expected": "4.8,-2.9"
            },
            {
              "input": "p = np.array([1.0]); g = np.array([0.0]); res = sgd_step(p, g, lr=0.01); print(f\"{res[0]:.1f}\")",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "4.8,-2.9",
          "variants": {
            "python": {
              "starterCode": "def sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:\n    \"\"\"\n    Executes a single Gradient Descent parameter update step.\n    \n    Parameters\n    ----------\n    params : np.ndarray - Current parameter values\n    grads : np.ndarray - Evaluated gradient vector with respect to params\n    lr : float - Learning rate step size\n    \n    Returns\n    -------\n    np.ndarray - Updated parameter vector\n    \"\"\"\n    # Step 1: Scale the gradient direction vector by the learning rate stride\n    # Step 2: Update parameters by stepping in the direction of steepest descent\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "4.8,-2.9"
            }
          },
          "solution": "import numpy as np\n\ndef sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:\n    \"\"\"\n    Executes a single Gradient Descent parameter update step.\n    \n    Parameters\n    ----------\n    params : np.ndarray - Current parameter values\n    grads : np.ndarray - Evaluated gradient vector with respect to params\n    lr : float - Learning rate step size\n    \n    Returns\n    -------\n    np.ndarray - Updated parameter vector\n    \"\"\"\n    # Step 1: Scale the gradient direction vector by the learning rate stride\n    step = lr * grads\n    \n    # Step 2: Update parameters by stepping in the direction of steepest descent\n    updated_params = params - step\n    \n    return updated_params"
        },
        "hints": {
          "tier1": {
            "en": "Multiply the gradient vector by learning rate `lr`.",
            "ar": "اضرب متجه التدرجات في معدل التعلم `lr`."
          },
          "tier2": {
            "en": "Subtract the scaled gradient from the current parameters.",
            "ar": "اطرح متجه التدرج الموزون من مصفوفة المعاملات الحالية."
          },
          "tier3": {
            "en": "Return `params - lr * grads` directly.",
            "ar": "أرجع `params - lr * grads` مباشرة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does training deep neural networks with moderate mini-batch sizes (e.g., $B=32$ or $B=128$) consistently generalize better to unseen test data than training with full-batch gradient descent ($B=N$), even when both converge to zero training loss?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية الانحدار التدريجي: الدفعة الكاملة، العشوائي، والدفعات المصغرة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The stochastic gradient noise inherent in mini-batch sampling acts as an implicit regularizer, kicking the optimizer out of sharp, brittle local minima that overfit the training set, and biasing convergence toward wide, flat loss valleys that are robust to distributional shifts.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Full-batch gradient descent is mathematically unable to compute derivatives when datasets exceed 1,000 samples.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Mini-batch gradient descent computes second-order Hessian inverses automatically.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Larger batches cause floating-point registers to overflow during forward propagation.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "momentum-rmsprop-adaptive",
    "title": "Momentum & RMSprop: Ravine Traversal & Adaptive Learning Rates",
    "titleAr": "العزم والتكيف بمعدل RMSprop: اجتياز الوديان ومعدلات التعلم التكيفية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine standing at the bottom of a steep, narrow canyon in the loss landscape. Along the North-South axis, the canyon walls rise...",
      "ar": "تخيّل تضاريس دالة خسارة على شكل أخدود ضيق شديد الانحدار. على المحور العمودي، ترتفع جدران الوادي كمنحدرات شاهقة بتدرجات ضخمة، بينما ينحدر..."
    },
    "prerequisites": [
      "gradient-descent"
    ],
    "x": 955,
    "y": 745,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GradientDescentCanvas",
        "narrative": {
          "en": "Imagine standing at the bottom of a steep, narrow canyon in the loss landscape. Along the North-South axis, the canyon walls rise vertically like sheer rock faces with enormous curvature and steepness. Along the East-West axis, the canyon floor slopes downward very gently toward the distant ocean (the global minimum).\n\nIf you drop standard Gradient Descent into this ravine, an optimization nightmare unfolds! The massive gradients on the steep North-South walls kick the optimizer violently back and forth across the canyon. Meanwhile, the gentle gradient on the canyon floor makes almost zero forward progress East toward the ocean. If you increase the learning rate to speed up forward progress, the cross-canyon oscillations explode and the trajectory diverges into numerical chaos.\n\nTwo foundational innovations rescued optimization from these ill-conditioned ravines:\n\n1. **Polyak Momentum (The Heavy Bowling Ball):**\nInstead of treating each optimization step as an isolated, massless teleportation, we give the parameter point physical mass and inertia. Think of rolling a heavy bowling ball down the canyon. As the ball sloshes back and forth across the canyon walls, the opposing North and South forces cancel each other out over time. Meanwhile, the persistent, gentle downhill nudge along the East-West floor accumulates velocity step after step, hurtling the ball straight down the valley at terminal speed!\n\n2. **RMSprop (Adaptive Shock Absorbers):**\nConceived by Geoffrey Hinton, RMSprop introduces coordinate-wise adaptive learning rates. It acts like an intelligent shock absorber on each parameter axle. RMSprop maintains an exponential moving average of squared gradients ($s_t = \\rho s_{t-1} + (1-\\rho) g_t^2$). When updating parameters, it divides each coordinate's gradient by $\\sqrt{s_t + \\epsilon}$. For dimensions with violent, high-frequency oscillations, $s_t$ grows huge, aggressively shrinking their effective step size and calming the bounces. For dimensions with quiet, sluggish gradients, $s_t$ stays tiny, boosting their effective step size and accelerating progress along the canyon floor.",
          "ar": "تخيّل تضاريس دالة خسارة على شكل أخدود ضيق شديد الانحدار. على المحور العمودي، ترتفع جدران الوادي كمنحدرات شاهقة بتدرجات ضخمة، بينما ينحدر قاع الوادي أفقياً بميل طفيف جداً نحو القاع المنشود.\n\nيتذبذب الانحدار التقليدي بعنف بين جدران الأخدود دون إحراز تقدم نحو المصب. لحل هذه المعضلة الكلاسيكية، ظهر ابتكاران جوهريان:\n1. العزم (Momentum): إكساب نقطة التحسين عطالة فيزيائية ككرة بولينج ثقيلة؛ فتتلاشى الذبذبات المتعاكسة ذاتياً، بينما تتراكم السرعة في الاتجاه المستمر لقاع الوادي.\n2. خوارزمية RMSprop: تتبع متوسط مربعات التدرجات السابقة وقسمة الخطوة على جذرها التربيعي، مما يؤدي إلى تهدئة المحاور شديدة التذبذب وتسريع المحاور الهادئة ذات التدرجات البطيئة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{v}_t = \\beta \\mathbf{v}_{t-1} + \\mathbf{g}_t, \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta \\mathbf{v}_t",
        "formulaNote": {
          "en": "Polyak Momentum velocity accumulation and RMSprop adaptive variance scaling rules.",
          "ar": "قواعد تراكم السرعة في عزم بولياك وتدرج التباين التكيفي في خوارزمية RMSprop."
        },
        "narrative": {
          "en": "Under constant gradient $\\mathbf{g}$, velocity accumulates into a terminal steady-state acceleration factor:\n\n$$\n\\mathbf{v}_{\\infty} = \\sum_{k=0}^{\\infty} \\beta^k \\mathbf{g} = \\frac{1}{1 - \\beta} \\mathbf{g} \\implies \\boldsymbol{\\theta}_{t+1} - \\boldsymbol{\\theta}_t \\approx -\\frac{\\eta}{1 - \\beta} \\mathbf{g}\n$$\n\nThe RMSprop adaptive gradient algorithm tracks the second uncentered moment vector $\\mathbf{s}_t \\in \\mathbb{R}^P$:\n\n$$\n\\mathbf{s}_t = \\rho \\mathbf{s}_{t-1} + (1 - \\rho) \\mathbf{g}_t^2, \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\frac{\\eta}{\\sqrt{\\mathbf{s}_t} + \\epsilon} \\odot \\mathbf{g}_t\n$$\n\n* $\\mathbf{g}_t = \\nabla_{\\boldsymbol{\\theta}} \\mathcal{L}(\\boldsymbol{\\theta}_t)$: Instantaneous gradient vector at step $t$.\n* $\\mathbf{v}_t \\in \\mathbb{R}^P$: Parameter velocity vector tracking directional inertia.\n* $\\beta \\in [0.8, 0.99]$: Momentum decay factor (standard default is $\\beta = 0.9$, yielding a $10\\times$ terminal velocity boost along consistent directions).\n* $\\mathbf{s}_t \\in \\mathbb{R}^P$: Exponential moving average of squared gradients (second moment).\n* $\\rho \\in [0.9, 0.999]$: Memory discount factor for second moments (standard default $\\rho = 0.9$ or $0.99$).\n* $\\mathbf{g}_t^2 \\coloneqq \\mathbf{g}_t \\odot \\mathbf{g}_t$: Element-wise Hadamard squared gradient vector.\n* $\\epsilon \\approx 10^{-8}$: Numerical variance stabilizer preventing division by zero.\n* $\\odot$: Element-wise Hadamard vector multiplication.\n\n---\n\nImplement both the `momentum_step(param, grad, v, lr, beta)` and `rmsprop_step(param, grad, s, lr, rho, eps)` update algorithms for parameter arrays.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتمنح صيغة العزم سرعة نهائية قصوى تعادل $\\frac{\\eta}{1-\\beta}$ في الاتجاهات المستقرة، مما يسرع الهبوط بمقدار 10 أضعاف عندما تكون $\\beta = 0.9$. وفي المقابل، تحافظ RMSprop على توحيد سعة الخطوة الفعالة $\\frac{\\eta}{\\sqrt{s_t + \\epsilon}} g_t \\approx \\pm \\eta$ عبر كافة المحاور، متجاوزة تباين انحناء مصفوفة هيسيان (Hessian Conditioning).\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-momentum-rmsprop-adaptive",
          "starterCode": "def momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, \n                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of Polyak Momentum.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    v : np.ndarray - Current velocity vector\n    lr : float - Learning rate\n    beta : float - Momentum decay factor\n    \n    Returns\n    -------\n    tuple of (param_next, v_next)\n    \"\"\"\n    # Step 1: Update velocity tracking with momentum decay and incoming gradient\n    # Step 2: Update parameters by stepping in velocity direction\n    # Step 1: Update running average of squared gradients\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "p = np.array([1.0]); g = np.array([2.0]); v = np.array([0.0]); p_new, v_new = momentum_step(p, g, v, lr=0.1, beta=0.9); print(f\"{p_new[0]:.2f},{v_new[0]:.2f}\")",
              "expected": "0.80,2.00"
            },
            {
              "input": "p = np.array([1.0]); g = np.array([2.0]); s = np.array([0.0]); p_new, s_new = rmsprop_step(p, g, s, lr=0.1, rho=0.9); print(f\"{round(p_new[0], 2):.2f},{round(s_new[0], 2):.2f}\")",
              "expected": "0.68,0.40"
            }
          ],
          "expectedOutput": "0.80,2.00",
          "variants": {
            "python": {
              "starterCode": "def momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, \n                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of Polyak Momentum.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    v : np.ndarray - Current velocity vector\n    lr : float - Learning rate\n    beta : float - Momentum decay factor\n    \n    Returns\n    -------\n    tuple of (param_next, v_next)\n    \"\"\"\n    # Step 1: Update velocity tracking with momentum decay and incoming gradient\n    # Step 2: Update parameters by stepping in velocity direction\n    # Step 1: Update running average of squared gradients\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.80,2.00"
            }
          },
          "solution": "import numpy as np\n\ndef momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, \n                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of Polyak Momentum.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    v : np.ndarray - Current velocity vector\n    lr : float - Learning rate\n    beta : float - Momentum decay factor\n    \n    Returns\n    -------\n    tuple of (param_next, v_next)\n    \"\"\"\n    # Step 1: Update velocity tracking with momentum decay and incoming gradient\n    v_next = beta * v + grad\n    \n    # Step 2: Update parameters by stepping in velocity direction\n    param_next = param - lr * v_next\n    \n    return param_next, v_next\n\ndef rmsprop_step(param: np.ndarray, grad: np.ndarray, s: np.ndarray, \n                 lr: float = 0.01, rho: float = 0.9, eps: float = 1e-8) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of RMSprop.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    s : np.ndarray - Running squared gradient average\n    lr : float - Base learning rate\n    rho : float - Exponential decay factor\n    eps : float - Numerical stability epsilon\n    \n    Returns\n    -------\n    tuple of (param_next, s_next)\n    \"\"\"\n    # Step 1: Update running average of squared gradients\n    s_next = rho * s + (1.0 - rho) * (grad ** 2)\n    \n    # Step 2: Scale gradient by root-mean-square and update parameters\n    adaptive_step = (lr / (np.sqrt(s_next) + eps)) * grad\n    param_next = param - adaptive_step\n    \n    return param_next, s_next"
        },
        "hints": {
          "tier1": {
            "en": "For momentum, update `v_next = beta * v + grad` then subtract `lr * v_next`.",
            "ar": "في العزم، حدث السرعة أولاً `v_next = beta * v + grad` ثم اطرح `lr * v_next`."
          },
          "tier2": {
            "en": "For RMSprop, calculate `s_next = rho * s + (1 - rho) * (grad ** 2)`.",
            "ar": "في RMSprop، احسب متوسط المربعات عبر `s_next = rho * s + (1 - rho) * (grad ** 2)`."
          },
          "tier3": {
            "en": "Divide `lr * grad` by `np.sqrt(s_next) + eps` when updating parameters in RMSprop.",
            "ar": "اقسم `lr * grad` على `np.sqrt(s_next) + eps` عند تحديث المعاملات في RMSprop."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "In an ill-conditioned quadratic bowl where the maximum eigenvalue of the Hessian is 10,000 times larger than the minimum eigenvalue ($\\kappa = \\frac{\\lambda_{\\max}}{\\lambda_{\\min}} = 10^4$), why does RMSprop successfully reach the minimum while standard Gradient Descent either diverges or requires millions of iterations?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ العزم والتكيف بمعدل RMSprop: اجتياز الوديان ومعدلات التعلم التكيفية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Standard gradient descent's maximum stable step size is bounded by the steepest curvature ($\\eta < \\frac{2}{\\lambda_{\\max}}$), forcing it to crawl along the flat axis; RMSprop rescales the step size along each coordinate by $\\frac{1}{\\sqrt{s_i}}$, automatically dampening updates along high-curvature directions while boosting steps along low-curvature directions.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "RMSprop analytically calculates the inverse Hessian matrix $(H^{-1})$ at each step.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "RMSprop alters the loss function to eliminate all curvature.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "RMSprop rounds all parameters to the nearest integer to ensure stability.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "adamw-weight-decay-schedules",
    "title": "AdamW Optimization: Decoupled Weight Decay & Learning Rate Schedules",
    "titleAr": "خوارزمية التحسين AdamW: اضمحلال الوزن المفصول وجداول معدل التعلم",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In modern deep learning and frontier AI, AdamW is the undisputed master optimizer. From OpenAI's GPT-4 to Meta's LLaMA, Anthropic's Claude,...",
      "ar": "في عالم الذكاء الاصطناعي الحديث والنماذج اللغوية الضخمة، تُعد خوارزمية AdamW المحرك الأساسي المعتمد في تدريب كافة النماذج المتقدمة."
    },
    "prerequisites": [
      "momentum-rmsprop-adaptive"
    ],
    "x": 935,
    "y": 840,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GradientDescentCanvas",
        "narrative": {
          "en": "In modern deep learning and frontier AI, **AdamW** is the undisputed master optimizer. From OpenAI's GPT-4 to Meta's LLaMA, Anthropic's Claude, and DeepSeek, virtually every large foundation model is trained using AdamW.\n\nAdam (Adaptive Moment Estimation) unites our two physical principles into a single, cohesive engine:\n1. **First Moment ($m_t$, Momentum):** It tracks the exponentially smoothed running average of past gradients to maintain directional inertia through flat plateaus and narrow canyons.\n2. **Second Moment ($v_t$, RMSprop):** It tracks the exponentially smoothed running average of squared gradients to dynamically calibrate independent shock absorbers on every single parameter.\n3. **Analytical Bias Correction:** Because the moment accumulators $m_0$ and $v_0$ are initialized to zero, early estimates would be severely dragged toward zero. Dividing by $(1 - \\beta_1^t)$ and $(1 - \\beta_2^t)$ dynamically inflates the early estimates, ensuring the optimizer moves boldly from the very first step.\n\n**The Flaw in Classic Adam and the AdamW Rescue:**\nIn classical Stochastic Gradient Descent, adding an $L_2$ regularization penalty $\\frac{1}{2}\\lambda \\|\\boldsymbol{\\theta}\\|^2$ to the loss function is mathematically identical to weight decay ($\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta}(1 - \\eta \\lambda)$). But in original Adam (Kingma & Ba, 2014), researchers implemented weight decay by adding the $L_2$ gradient penalty $\\lambda \\boldsymbol{\\theta}$ directly into the gradient vector $g_t$!\n\nBecause Adam divides updates by $\\sqrt{v_t}$, parameters that experienced large, frequent historical gradients (such as common token embeddings in LLMs) had their weight decay penalty divided by a huge number—diluting their regularization away to almost nothing! Conversely, parameters with tiny historical gradients received excessive, destructive weight decay.\n\nLoshchilov & Hutter (2017) resolved this with **AdamW** by **decoupling weight decay**: the parameters are decayed directly ($\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta}(1 - \\eta \\lambda)$) before applying the adaptive momentum step. This simple, profound fix restores proportional regularization across all weights, vastly improving generalization across Transformer architectures.",
          "ar": "في عالم الذكاء الاصطناعي الحديث والنماذج اللغوية الضخمة، تُعد خوارزمية AdamW المحرك الأساسي المعتمد في تدريب كافة النماذج المتقدمة.\n\nتجمع الخوارزمية ببراعة بين: عزم الرتبة الأولى (m_t) لتوجيه الحركة، عزم الرتبة الثانية (v_t) لمعايرة الخطوة لكل وزن، وتصحيح الانحياز لإزالة أثر التهيئة الصفرية الأولية.\n\nغير أن خوارزمية Adam الكلاسيكية احتوت على خلل جوهري عند اقترانها بتنظيم L2؛ إذ خضعت عقوبة تقليص الأوزان للقسمة على sqrt(v_t)، مما عطل تنظيم الأوزان النشطة. حلت AdamW هذه المعضلة بفصل اضمحلال الوزن (Decoupled Weight Decay) وتطبيقه مباشرة على المعاملات، مما وفر تنظيماً مثالياً لنماذج المحولات (Transformers)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{m}_t = \\beta_1 \\mathbf{m}_{t-1} + (1 - \\beta_1) \\mathbf{g}_t, \\quad \\mathbf{v}_t = \\beta_2 \\mathbf{v}_{t-1} + (1 - \\beta_2) \\mathbf{g}_t^2",
        "formulaNote": {
          "en": "AdamW bias-corrected moments and decoupled weight decay update rule.",
          "ar": "العزوم المصححة الانحياز وقاعدة تحديث اضمحلال الوزن المفصول في AdamW."
        },
        "narrative": {
          "en": "$$\n\\hat{\\mathbf{m}}_t = \\frac{\\mathbf{m}_t}{1 - \\beta_1^t}, \\quad \\hat{\\mathbf{v}}_t = \\frac{\\mathbf{v}_t}{1 - \\beta_2^t}\n$$\n\n$$\n\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta_t \\lambda \\boldsymbol{\\theta}_t - \\frac{\\eta_t}{\\sqrt{\\hat{\\mathbf{v}}_t} + \\epsilon} \\odot \\hat{\\mathbf{m}}_t\n$$\n\nThe learning rate $\\eta_t$ is typically governed by a Linear Warmup followed by a Cosine Decay Schedule:\n\n$$\n\\eta_t = \\begin{cases}\n\\eta_{\\max} \\cdot \\frac{t}{T_{\\text{warm}}}, & t \\le T_{\\text{warm}} \\\\\n\\eta_{\\min} + \\frac{1}{2}(\\eta_{\\max} - \\eta_{\\min})\\left(1 + \\cos\\left(\\frac{t - T_{\\text{warm}}}{T_{\\max} - T_{\\text{warm}}} \\pi\\right)\\right), & t > T_{\\text{warm}}\n\\end{cases}\n$$\n\n* $\\mathbf{g}_t \\in \\mathbb{R}^P$: Current mini-batch stochastic gradient at step $t$.\n* $\\mathbf{m}_t \\in \\mathbb{R}^P$: Exponentially decaying average of past gradients (first moment vector).\n* $\\mathbf{v}_t \\in \\mathbb{R}^P$: Exponentially decaying average of past squared gradients (second uncentered moment vector).\n* $\\hat{\\mathbf{m}}_t, \\hat{\\mathbf{v}}_t$: Bias-corrected moment estimators satisfying $\\mathbb{E}[\\hat{\\mathbf{m}}_t] = \\mathbb{E}[\\mathbf{g}_t]$ and $\\mathbb{E}[\\hat{\\mathbf{v}}_t] = \\mathbb{E}[\\mathbf{g}_t^2]$.\n* $\\beta_1 = 0.9, \\beta_2 = 0.999$: Standard canonical decay hyper-parameters.\n* $\\lambda \\ge 0$: Decoupled weight decay regularization factor (typically $0.01$ to $0.1$).\n* $\\eta_t$: Scheduled learning rate at step $t$.\n* $-\\eta_t \\lambda \\boldsymbol{\\theta}_t$: The decoupled weight decay penalty, applied independently of gradient magnitude.\n\n---\n\nImplement the single-step update function `adamw_step(param, grad, m, v, t, lr, beta1, beta2, eps, weight_decay)` implementing decoupled weight decay, moment tracking, bias correction, and the final parameter update.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتضمن معاملات تصحيح الانحياز $(1-\\beta^t)$ أن يكون تقدير العزوم غير متحيز إحصائياً حتى عندما تكون $t = 1$. ويضمن الحد $-\\eta_t \\lambda \\boldsymbol{\\theta}_t$ انكماشاً مستمراً للأوزان يتناسب حصراً مع قيمتها الحالية ومع معدل التعلم المجدول، دون أي تشويه ينشأ عن تباين التدرجات التاريخية.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-adamw-weight-decay-schedules",
          "starterCode": "def adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,\n               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, \n               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the AdamW optimization algorithm.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    m : np.ndarray - First moment vector\n    v : np.ndarray - Second moment vector\n    t : int - Step index (1-based)\n    lr : float - Learning rate\n    beta1, beta2 : float - Moment decay factors\n    eps : float - Epsilon stabilizer\n    weight_decay : float - Decoupled weight decay coefficient\n    \n    Returns\n    -------\n    tuple of (param_next, m_next, v_next)\n    \"\"\"\n    # Step 1: Apply decoupled weight decay directly to the parameter\n    # Step 2: Update biased first and second moments\n    # Step 3: Compute bias-corrected first and second moments using step index t\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "p = np.array([1.0]); g = np.array([0.5]); m = np.array([0.0]); v = np.array([0.0]); p_next, m_next, v_next = adamw_step(p, g, m, v, t=1, lr=0.01, weight_decay=0.01); print(f\"{p_next[0]:.4f}\")",
              "expected": "0.9899"
            },
            {
              "input": "p = np.array([0.0]); g = np.array([0.0]); m = np.array([0.0]); v = np.array([0.0]); p_next, m_next, v_next = adamw_step(p, g, m, v, t=1); print(p_next[0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "0.9899",
          "variants": {
            "python": {
              "starterCode": "def adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,\n               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, \n               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the AdamW optimization algorithm.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    m : np.ndarray - First moment vector\n    v : np.ndarray - Second moment vector\n    t : int - Step index (1-based)\n    lr : float - Learning rate\n    beta1, beta2 : float - Moment decay factors\n    eps : float - Epsilon stabilizer\n    weight_decay : float - Decoupled weight decay coefficient\n    \n    Returns\n    -------\n    tuple of (param_next, m_next, v_next)\n    \"\"\"\n    # Step 1: Apply decoupled weight decay directly to the parameter\n    # Step 2: Update biased first and second moments\n    # Step 3: Compute bias-corrected first and second moments using step index t\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.9899"
            }
          },
          "solution": "import numpy as np\n\ndef adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,\n               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, \n               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the AdamW optimization algorithm.\n    \n    Parameters\n    ----------\n    param : np.ndarray - Current parameters\n    grad : np.ndarray - Current gradient\n    m : np.ndarray - First moment vector\n    v : np.ndarray - Second moment vector\n    t : int - Step index (1-based)\n    lr : float - Learning rate\n    beta1, beta2 : float - Moment decay factors\n    eps : float - Epsilon stabilizer\n    weight_decay : float - Decoupled weight decay coefficient\n    \n    Returns\n    -------\n    tuple of (param_next, m_next, v_next)\n    \"\"\"\n    # Step 1: Apply decoupled weight decay directly to the parameter\n    param_decayed = param * (1.0 - lr * weight_decay)\n    \n    # Step 2: Update biased first and second moments\n    m_next = beta1 * m + (1.0 - beta1) * grad\n    v_next = beta2 * v + (1.0 - beta2) * (grad ** 2)\n    \n    # Step 3: Compute bias-corrected first and second moments using step index t\n    m_hat = m_next / (1.0 - (beta1 ** t))\n    v_hat = v_next / (1.0 - (beta2 ** t))\n    \n    # Step 4: Compute adaptive step and update parameters\n    adaptive_step = (lr / (np.sqrt(v_hat) + eps)) * m_hat\n    param_next = param_decayed - adaptive_step\n    \n    return param_next, m_next, v_next"
        },
        "hints": {
          "tier1": {
            "en": "Apply decoupled decay `param * (1.0 - lr * weight_decay)` first.",
            "ar": "طبق اضمحلال الوزن المفصول أولاً عبر `param * (1.0 - lr * weight_decay)`."
          },
          "tier2": {
            "en": "Compute `m_hat = m_next / (1.0 - beta1**t)` and `v_hat = v_next / (1.0 - beta2**t)`.",
            "ar": "احسب العزوم المصححة بالقسمة على `(1.0 - beta**t)`."
          },
          "tier3": {
            "en": "Subtract `(lr / (np.sqrt(v_hat) + eps)) * m_hat` from decayed parameters.",
            "ar": "اطرح المقدار التكيفي الموزون من المعاملات بعد تقليصها."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does combining standard L2 regularization ($g_t \\leftarrow g_t + \\lambda \\theta_t$) with classic Adam cause weights with large, frequent historical gradients to experience less regularization decay than weights with small gradients?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية التحسين AdamW: اضمحلال الوزن المفصول وجداول معدل التعلم تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In classic Adam, the regularized gradient is divided by $\\sqrt{v_t}$; since parameters with large historical gradients have large values of $v_t$, their effective decay factor $\\frac{\\lambda \\theta_t}{\\sqrt{v_t}}$ is suppressed, whereas parameters with small historical gradients receive large decay penalties.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Classic Adam sets the weight decay coefficient $\\lambda$ to zero whenever gradients exceed 1.0.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "L2 regularization is only mathematically defined for convex linear regression.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because classic Adam does not update the first moment $m_t$ when weight decay is active.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "batch-normalization-internal-covariate",
    "title": "Batch Normalization: Internal Covariate Shift & Mini-Batch Statistics",
    "titleAr": "تطبيع الدفعات: استقرار التوزيع وإحصائيات الدفعة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine constructing a 50-story skyscraper where every floor is made of shifting quicksand.",
      "ar": "تخيّل أنك تبني ناطحة سحاب من خمسين طابقاً، وكل طابق مبني فوق رمال متحركة. كل تعديل يجريه العمال في الطابق الأول يؤدي إلى انزلاق الطابق..."
    },
    "prerequisites": [
      "two-layer-mlp-xor-boundary",
      "gradient-descent"
    ],
    "x": 915,
    "y": 935,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "Imagine constructing a 50-story skyscraper where every floor is made of shifting quicksand. When construction workers on the 1st floor make a minor realignment to their foundation pillars, the 2nd floor shifts and tilts. Because the 2nd floor tilted, the 3rd floor tilts even more violently. By the time this mechanical cascade propagates to the 50th floor, the ground is thrashing uncontrollably, threatening to tear the entire structure apart!\n\nThis architectural nightmare was the central bottleneck in training deep neural networks prior to 2015, historically termed **internal covariate shift**. When Layer 1 updates its weights during a gradient descent step, the statistical distribution (mean and variance) of the activations it outputs to Layer 2 shifts. Layer 2 must now constantly struggle to adapt to a moving target. In networks with dozens of layers, this compounding distribution drift causes activations to either explode toward infinity or collapse into saturated activation zones where gradients vanish entirely.\n\nIn 2015, Sergey Ioffe and Christian Szegedy introduced a transformative stabilizer: **Batch Normalization (BatchNorm)**. Instead of allowing layer outputs to drift unchecked, BatchNorm intercepts the intermediate activations between layers and anchors them firmly across the mini-batch:\n1. It computes the empirical mean $\\mu_{\\mathcal{B}}$ and variance $\\sigma_{\\mathcal{B}}^2$ vertically across all samples in the current mini-batch.\n2. It standardizes each feature coordinate to zero mean and unit variance: $\\hat{x} = \\frac{x - \\mu_{\\mathcal{B}}}{\\sqrt{\\sigma_{\\mathcal{B}}^2 + \\epsilon}}$.\n3. To prevent the network from losing representational capacity, it introduces two learnable parameters: a scale factor $\\gamma$ and a shift offset $\\beta$, producing $y = \\gamma \\hat{x} + \\beta$. If the network determines that a non-zero mean or scaled variance is optimal, it can simply learn to restore it!\n\n**The Dual-Mode Lifecycle (Training vs. Inference):**\n* **During Training:** BatchNorm calculates statistics dynamically from the active mini-batch. Simultaneously, it maintains non-differentiable running averages (`running_mean` and `running_var`) using exponential smoothing.\n* **During Evaluation / Inference:** Mini-batch calculation is completely frozen! The layer normalizes incoming samples using the stored population running statistics. This guarantees that when deploying a model to evaluate a single customer request ($B=1$), the prediction is completely deterministic and stable.",
          "ar": "تخيّل أنك تبني ناطحة سحاب من خمسين طابقاً، وكل طابق مبني فوق رمال متحركة. كل تعديل يجريه العمال في الطابق الأول يؤدي إلى انزلاق الطابق الثاني، مما يضاعف الانحراف في الطوابق العليا حتى تنهار القمة.\n\nهذا هو انحراف التوزيع الداخلي (Internal Covariate Shift). فمع كل تحديث للأوزان في الطبقات الدنيا، تتغير التوزيعات الداخلة إلى الطبقات العليا مجبرة إياها على ملاحقة أهداف متحركة باستمرار.\n\nتعترض تقنية تطبيع الدفعات (BatchNorm) التنشيطات: فتحسب المتوسط والتباين للدفعة المصغرة وتوحد التنشيطات لمتوسط صفري وتباين واحد، مع توفير وسيطين قابلين للتعلم (gamma و beta) لاستعادة سعة التمثيل.\n\nوأثناء التدريب تستخدم إحصائيات الدفعة مع تحديث متوسطات تراكمية؛ وعند الاستدلال تجمد هذه الإحصائيات لتوفير تنبؤات حتمية ومستقرة للعينة الواحدة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mu_{\\mathcal{B}} = \\frac{1}{B} \\sum_{i=1}^B x_i, \\quad \\sigma_{\\mathcal{B}}^2 = \\frac{1}{B} \\sum_{i=1}^B (x_i - \\mu_{\\mathcal{B}})^2",
        "formulaNote": {
          "en": "Batch normalization mini-batch standardization, affine scaling, and running buffer tracking.",
          "ar": "معايرة الدفعة المصغرة والتحويل التآلفي وتتبع المتوسطات التراكمية في BatchNorm."
        },
        "narrative": {
          "en": "$$\n\\hat{x}_i = \\frac{x_i - \\mu_{\\mathcal{B}}}{\\sqrt{\\sigma_{\\mathcal{B}}^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta \\equiv \\text{BN}_{\\gamma, \\beta}(x_i)\n$$\n\nDuring training, population running statistics are tracked using momentum factor $m \\in (0, 1)$:\n\n$$\n\\mu_{\\text{run}} \\leftarrow (1 - m) \\mu_{\\text{run}} + m \\mu_{\\mathcal{B}}, \\quad \\sigma_{\\text{run}}^2 \\leftarrow (1 - m) \\sigma_{\\text{run}}^2 + m \\sigma_{\\mathcal{B}}^2\n$$\n\nDuring inference (evaluation mode), frozen running statistics replace mini-batch estimates:\n\n$$\n\\hat{x}_{\\text{eval}} = \\frac{x - \\mu_{\\text{run}}}{\\sqrt{\\sigma_{\\text{run}}^2 + \\epsilon}}, \\quad y_{\\text{eval}} = \\gamma \\hat{x}_{\\text{eval}} + \\beta\n$$\n\nDuring reverse-mode backpropagation, given the upstream adjoint gradient $\\frac{\\partial L}{\\partial y_i}$, the analytical gradients with respect to the learnable scale and shift parameters, and input activations are:\n\n$$\n\\frac{\\partial L}{\\partial \\gamma} = \\sum_{j=1}^B \\frac{\\partial L}{\\partial y_j} \\hat{x}_j, \\quad \\frac{\\partial L}{\\partial \\beta} = \\sum_{j=1}^B \\frac{\\partial L}{\\partial y_j}\n$$\n\n$$\n\\frac{\\partial L}{\\partial x_i} = \\frac{\\gamma}{\\sqrt{\\sigma_{\\mathcal{B}}^2 + \\epsilon}} \\left[ \\frac{\\partial L}{\\partial y_i} - \\frac{1}{B} \\sum_{j=1}^B \\frac{\\partial L}{\\partial y_j} - \\frac{\\hat{x}_i}{B} \\sum_{j=1}^B \\frac{\\partial L}{\\partial y_j} \\hat{x}_j \\right]\n$$\n\n* $B$: Mini-batch size (dimension $0$ of the activation tensor).\n* $\\mu_{\\mathcal{B}}, \\sigma_{\\mathcal{B}}^2$: Mean and variance calculated across the mini-batch dimension.\n* $\\epsilon \\approx 10^{-5}$: Numerical variance stabilizer preventing division by zero.\n* $\\gamma, \\beta \\in \\mathbb{R}^D$: Learnable affine scale and shift parameters initialized to $\\gamma=1, \\beta=0$.\n* $\\frac{\\partial L}{\\partial \\gamma}, \\frac{\\partial L}{\\partial \\beta}$: Gradients with respect to affine scale and shift parameters.\n* $\\mu_{\\text{run}}, \\sigma_{\\text{run}}^2$: Non-differentiable historical tracking buffers used during deployment.\n* $m \\in [0.01, 0.1]$: Running average momentum coefficient (in PyTorch convention, $m=0.1$).\n\n---\n\nImplement the complete `batchnorm_forward` function supporting both training mode (computing batch statistics and updating running buffers) and inference mode (using frozen running buffers).",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتُظهر صيغة التدرج العكسي لـ BatchNorm كيف يقوم الحدان الثاني والثالث بطرح المتوسط والمكون المتعامد للتدرجات، مما يضمن ثبات مقياس التدرجات ومنعها من الانفجار، مما أتاح للباحثين استخدام معدلات تعلم أكبر بعشر مرات وتدريب شبكات بالغة العمق بسلاسة.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-batch-normalization-internal-covariate",
          "starterCode": "import numpy as np\n\ndef batchnorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray,\n                      running_mean: np.ndarray, running_var: np.ndarray,\n                      training: bool = True, momentum: float = 0.1,\n                      eps: float = 1e-5) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the forward pass of Batch Normalization.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, D) - Input activations\n    gamma : np.ndarray of shape (D,) - Learnable scale parameter\n    beta : np.ndarray of shape (D,) - Learnable shift parameter\n    running_mean : np.ndarray of shape (D,) - Running average mean buffer\n    running_var : np.ndarray of shape (D,) - Running average variance buffer\n    training : bool - Flag indicating training vs. inference mode\n    momentum : float - Running statistics update rate\n    eps : float - Variance epsilon stabilizer\n    \n    Returns\n    -------\n    tuple of (out: np.ndarray, running_mean: np.ndarray, running_var: np.ndarray)\n    \"\"\"\n    if training:\n        # Step 1: Compute empirical batch mean and variance across samples (axis=0)\n        mean = np.mean(x, axis=0)\n        var = np.var(x, axis=0)\n        \n        # Step 2: Standardize activations to zero mean and unit variance\n        x_norm = (x - mean) / np.sqrt(var + eps)\n        \n        # Step 3: Apply learnable affine transformation\n        out = gamma * x_norm + beta\n        \n        # Step 4: Update running statistics buffers using exponential moving average\n        running_mean = (1.0 - momentum) * running_mean + momentum * mean\n        running_var = (1.0 - momentum) * running_var + momentum * var\n    else:\n        # Step 1: Standardize using frozen historical running statistics\n        x_norm = (x - running_mean) / np.sqrt(running_var + eps)\n        \n        # Step 2: Apply learnable affine transformation\n        out = gamma * x_norm + beta\n        \n    return out, running_mean, running_var",
          "testCases": [
            {
              "input": "x = np.array([[1.0, 2.0], [3.0, 4.0]]); g = np.ones(2); b = np.zeros(2); rm = np.zeros(2); rv = np.ones(2); out, rm, rv = batchnorm_forward(x, g, b, rm, rv, training=True); print(f\"{out[:, 0].mean():.1f},{out[:, 0].std():.1f}\")",
              "expected": "0.0,1.0"
            },
            {
              "input": "x = np.array([[2.0, 2.0]]); g = np.ones(2); b = np.zeros(2); rm = np.array([2.0, 2.0]); rv = np.array([1.0, 1.0]); out, _, _ = batchnorm_forward(x, g, b, rm, rv, training=False); print(f\"{out[0, 0]:.1f},{out[0, 1]:.1f}\")",
              "expected": "0.0,0.0"
            }
          ],
          "expectedOutput": "0.0,1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef batchnorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray,\n                      running_mean: np.ndarray, running_var: np.ndarray,\n                      training: bool = True, momentum: float = 0.1,\n                      eps: float = 1e-5) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the forward pass of Batch Normalization.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, D) - Input activations\n    gamma : np.ndarray of shape (D,) - Learnable scale parameter\n    beta : np.ndarray of shape (D,) - Learnable shift parameter\n    running_mean : np.ndarray of shape (D,) - Running average mean buffer\n    running_var : np.ndarray of shape (D,) - Running average variance buffer\n    training : bool - Flag indicating training vs. inference mode\n    momentum : float - Running statistics update rate\n    eps : float - Variance epsilon stabilizer\n    \n    Returns\n    -------\n    tuple of (out: np.ndarray, running_mean: np.ndarray, running_var: np.ndarray)\n    \"\"\"\n    if training:\n        # Step 1: Compute empirical batch mean and variance across samples (axis=0)\n        mean = np.mean(x, axis=0)\n        var = np.var(x, axis=0)\n        \n        # Step 2: Standardize activations to zero mean and unit variance\n        x_norm = (x - mean) / np.sqrt(var + eps)\n        \n        # Step 3: Apply learnable affine transformation\n        out = gamma * x_norm + beta\n        \n        # Step 4: Update running statistics buffers using exponential moving average\n        running_mean = (1.0 - momentum) * running_mean + momentum * mean\n        running_var = (1.0 - momentum) * running_var + momentum * var\n    else:\n        # Step 1: Standardize using frozen historical running statistics\n        x_norm = (x - running_mean) / np.sqrt(running_var + eps)\n        \n        # Step 2: Apply learnable affine transformation\n        out = gamma * x_norm + beta\n        \n    return out, running_mean, running_var",
              "expectedOutput": "0.0,1.0"
            }
          },
          "solution": "import numpy as np\n\ndef batchnorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray,\n                      running_mean: np.ndarray, running_var: np.ndarray,\n                      training: bool = True, momentum: float = 0.1,\n                      eps: float = 1e-5) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    if training:\n        mean = np.mean(x, axis=0)\n        var = np.var(x, axis=0)\n        x_norm = (x - mean) / np.sqrt(var + eps)\n        out = gamma * x_norm + beta\n        running_mean = (1.0 - momentum) * running_mean + momentum * mean\n        running_var = (1.0 - momentum) * running_var + momentum * var\n    else:\n        x_norm = (x - running_mean) / np.sqrt(running_var + eps)\n        out = gamma * x_norm + beta\n    return out, running_mean, running_var"
        },
        "hints": {
          "tier1": {
            "en": "Compute mean and variance along `axis=0` during training.",
            "ar": "احسب المتوسط والتباين عبر المحور `axis=0` أثناء وضع التدريب."
          },
          "tier2": {
            "en": "Update running statistics: `(1 - momentum) * running + momentum * batch`.",
            "ar": "حدث المتوسطات التراكمية عبر: `(1 - momentum) * running + momentum * batch`."
          },
          "tier3": {
            "en": "During evaluation (`training=False`), use `running_mean` and `running_var`.",
            "ar": "أثناء وضع الاختبار (`training=False`)، استخدم المتوسطات التراكمية المحفوظة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does Batch Normalization struggle in autoregressive large language models (LLMs) and small-batch inference ($B=1$), directly motivating the universal transition to Layer Normalization?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تطبيع الدفعات: استقرار التوزيع وإحصائيات الدفعة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In autoregressive token generation, tokens are emitted sequentially with batch size $B=1$, where sample variance is zero or undefined; furthermore, variable sequence lengths in NLP make batch statistics unstable and artificially couple unrelated text documents together.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Batch Normalization requires more memory than the entire model's parameter footprint.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "GPUs cannot compute the mean of a tensor along dimension 0.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "BatchNorm cannot be differentiated using automatic differentiation.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "layer-normalization-invariance",
    "title": "Layer Normalization & Invariant Representations",
    "titleAr": "تطبيع الطبقات وثبات التمثيلات الخفية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are evaluating candidates for a decathlon competition. In Batch Normalization, an athlete's physical scores (sprint speed, high...",
      "ar": "في حين أحدثت تقنية تطبيع الدفعات ثورة في شبكات الرؤية الحاسوبية، إلا أنها حملت نقطة ضعف جوهرية: ارتباط مصير العينات."
    },
    "prerequisites": [
      "batch-normalization-internal-covariate"
    ],
    "x": 895,
    "y": 1030,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "Imagine you are evaluating candidates for a decathlon competition. In Batch Normalization, an athlete's physical scores (sprint speed, high jump, shot put) are evaluated relative to whoever else happens to walk into the testing stadium during that exact hour. If an Olympic champion happens to be in your batch, your performance is graded as failing; if everyone else in the room is injured, your mediocre performance is graded as legendary. This is **sample coupling**—a sample's internal representation is held hostage by the random assortment of peers in its mini-batch. In computer vision with fixed-size images, this coupling is manageable; in natural language processing and modern Transformer LLMs (such as GPT-4, LLaMA, and Claude), it is completely fatal. Sentences have radically different lengths, prompts arrive one at a time ($B=1$) during interactive chat generation, and caching key-values requires absolute, deterministic independence.\n\nIn 2016, Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey Hinton introduced the foundational solution: **Layer Normalization (LayerNorm)**. The central paradigm shift of LayerNorm is **standardizing each person against their own baseline**. Instead of judging an athlete against random competitors, you judge the athlete against themselves: evaluating whether their sprint speed is higher or lower than their *own personal average* across all their events, scaled by the variability of their own skills. For an individual token vector $\\mathbf{x} \\in \\mathbb{R}^d$ flowing through a Transformer, LayerNorm looks purely inward across its $d$ hidden channels. It measures the token's own mean activation $\\mu$ and standard deviation $\\sigma$, centering its features around zero and scaling its variance to exactly 1.0.\n\nThis inward normalization confers what can only be described as **architectural sovereignty**. A token vector processed with LayerNorm is completely independent of the mini-batch size. Whether the network processes a single token streamed to a user's smartphone ($B=1$) or a distributed supercomputer training batch of millions of tokens ($B=4096$), the mathematical output for that token is bit-for-bit identical! There is no need for historical running averages (`running_mean`, `running_var`), eliminating the notorious discrepancy between training mode and evaluation mode that plagued BatchNorm.\n\nBeyond sample independence, LayerNorm provides two critical mathematical invariants: **Scale Invariance** and **Shift Invariance**. If incoming embeddings are multiplied by $10\\times$ or shifted by an arbitrary constant offset, the normalization operation completely cancels out the distortion in the numerator and denominator ($\\frac{\\alpha(x_j - \\mu)}{\\alpha \\sigma} = \\frac{x_j - \\mu}{\\sigma}$). In deep Transformer networks with 80 to 120 stacked layers, residual skip connections continuously accumulate energy, causing activation magnitudes to swell dramatically. LayerNorm acts as a hydraulic pressure regulator at the entrance of every attention and feed-forward block, resetting activations back to zero mean and unit variance, and preventing numerical explosion across hundreds of layers.\n\nFinally, to preserve the network's expressive capacity, LayerNorm introduces channel-wise learnable affine parameters: gain $\\boldsymbol{\\gamma} \\in \\mathbb{R}^d$ and bias $\\boldsymbol{\\beta} \\in \\mathbb{R}^d$. While the standardization step pulls all hidden dimensions into a disciplined Gaussian-like bell, the learnable parameters allow the network to selectively amplify important semantic dimensions or shift thresholds. The forward pass normalizes across features, while the backward pass flows local adjoint sensitivities back through both the affine gates and the inward statistical moments.",
          "ar": "في حين أحدثت تقنية تطبيع الدفعات ثورة في شبكات الرؤية الحاسوبية، إلا أنها حملت نقطة ضعف جوهرية: ارتباط مصير العينات. ففي BatchNorm، تتأثر كيفية معالجة الجملة (أ) بخصائص الجمل الأخرى المتواجدة معها صدفة في نفس الدفعة.\n\nفي معالجة اللغات الطبيعية ونماذج المحولات (Transformers)، يُعد هذا الارتباط غير مقبول؛ حيث تتباين أطوال النصوص وتصل المدخلات بصورة فردية تتابعية (B=1).\n\nقدم جيمي با، جيمي كيروس، وجيفري هينتون الحل المعماري الأسمى: تطبيع الطبقات (Layer Normalization). عوضاً عن حساب الإحصائيات عبر عينات الدفعة المختلفة، تقوم LayerNorm بحساب المتوسط والتباين أفقياً عبر الأبعاد الخفية للرمز الواحد بمعزل تام عن بقية العينات.\n\nيتمتع كل رمز باستقلالية مطلقة سواء كانت الدفعة تحتوي على عينة واحدة أو مليون عينة، مع ثبات تام أمام التغيرات القياسية الخطية، مما جعلها حجر الزاوية لنماذج المحولات الحديثة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mu = \\frac{1}{d} \\sum_{j=1}^d x_j, \\quad \\sigma^2 = \\frac{1}{d} \\sum_{j=1}^d (x_j - \\mu)^2",
        "formulaNote": {
          "en": "Layer Normalization feature formulation and exact scale invariance property.",
          "ar": "صيغة تطبيع الطبقات عبر الميزات وخاصية الثبات القياسي التام."
        },
        "narrative": {
          "en": "$$\n\\hat{x}_j = \\frac{x_j - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}}, \\quad y_j = \\gamma_j \\hat{x}_j + \\beta_j \\equiv \\text{LN}_{\\boldsymbol{\\gamma}, \\boldsymbol{\\beta}}(\\mathbf{x})_j\n$$\n\nFundamental Mathematical Invariances:\n1. **Scale Invariance:** For any scalar $\\alpha > 0$:\n   $$\\text{LN}(\\alpha \\mathbf{x}) = \\text{LN}(\\mathbf{x})$$\n2. **Shift Invariance:** For any scalar constant $c \\in \\mathbb{R}$:\n   $$\\text{LN}(\\mathbf{x} + c \\mathbf{1}) = \\text{LN}(\\mathbf{x})$$\n\nDuring reverse-mode backpropagation, given the upstream adjoint gradient $\\bar{y}_j \\coloneqq \\frac{\\partial L}{\\partial y_j}$, the analytical gradients with respect to learnable parameters and input activations are:\n\n$$\n\\frac{\\partial L}{\\partial \\gamma_j} = \\bar{y}_j \\hat{x}_j, \\quad \\frac{\\partial L}{\\partial \\beta_j} = \\bar{y}_j\n$$\n\n$$\n\\frac{\\partial L}{\\partial \\hat{x}_j} = \\bar{y}_j \\cdot \\gamma_j\n$$\n\n$$\n\\frac{\\partial L}{\\partial x_j} = \\frac{1}{\\sqrt{\\sigma^2 + \\epsilon}} \\left[ \\frac{\\partial L}{\\partial \\hat{x}_j} - \\frac{1}{d} \\sum_{k=1}^d \\frac{\\partial L}{\\partial \\hat{x}_k} - \\frac{\\hat{x}_j}{d} \\sum_{k=1}^d \\frac{\\partial L}{\\partial \\hat{x}_k} \\hat{x}_k \\right]\n$$\n\n* $\\mathbf{x} \\in \\mathbb{R}^d$: Input activation vector of a single token or sample across $d$ feature dimensions (`x`).\n* $d$: Hidden feature dimension size (e.g., $4096$ in LLaMA-3-8B).\n* $\\mu \\in \\mathbb{R}$: Scalar sample mean evaluated horizontally along the feature axis ($\\text{axis}=-1$).\n* $\\sigma^2 \\in \\mathbb{R}$: Scalar sample variance evaluated along the feature axis.\n* $\\epsilon \\approx 10^{-5}$: Small numerical variance stabilizer preventing division by zero.\n* $\\hat{x}_j \\in \\mathbb{R}$: Standardized, scale-free activation with zero mean and unit variance.\n* $\\boldsymbol{\\gamma}, \\boldsymbol{\\beta} \\in \\mathbb{R}^d$: Learnable gain and bias vectors matching the feature dimension.\n* $\\bar{y}_j = \\frac{\\partial L}{\\partial y_j}$: Upstream gradient arriving from subsequent network layers.\n* $\\frac{\\partial L}{\\partial x_j}$: Analytical gradient with respect to raw input activations; the two negative subtraction terms ensure that the propagated gradient has zero mean and is orthogonal to the normalized input vector.\n\n---\n\nImplement the forward pass of Layer Normalization `layernorm_forward(x, gamma, beta, eps)` operating along the last feature dimension (`axis=-1`). Return the normalized output and a cache dictionary containing all intermediate quantities required for the backward pass.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتُظهر صياغة المسار العكسي لـ LayerNorm أن التدرجات المنقولة للخلف تخضع أيضاً لعملية تمركز وتعامد مستمرة؛ حيث يقوم الحدان الثاني والثالث بطرح متوسط التدرجات ومركبتها الموازية لـ $\\hat{\\mathbf{x}}$، مما يضمن استقرار حجم التدرجات ومنع ظاهرتي التلاشي والانفجار عبر مئات طبقات الانتباه متعدد الرؤوس.\n\n## Beat 3: Interactive Python Scratchpad | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-layer-normalization-invariance",
          "starterCode": "import numpy as np\n\ndef layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, \n                       eps: float = 1e-5) -> tuple[np.ndarray, dict]:\n    \"\"\"\n    Computes Layer Normalization across the last feature dimension.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (..., D)\n    gamma : np.ndarray of shape (D,)\n    beta : np.ndarray of shape (D,)\n    eps : float\n    \n    Returns\n    -------\n    tuple of (out, cache)\n    \"\"\"\n    # Step 1: Compute empirical mean and variance along the last feature dimension (axis=-1)\n    mean = np.mean(x, axis=-1, keepdims=True)\n    var = np.var(x, axis=-1, keepdims=True)\n    \n    # Step 2: Standardize activations to zero mean and unit variance\n    inv_std = 1.0 / np.sqrt(var + eps)\n    x_hat = (x - mean) * inv_std\n    \n    # Step 3: Apply learnable scale (gamma) and shift (beta) affine parameters\n    out = gamma * x_hat + beta\n    \n    # Step 4: Construct cache dictionary storing intermediate variables for backward pass\n    cache = {\n        'x': x,\n        'mean': mean,\n        'var': var,\n        'inv_std': inv_std,\n        'x_hat': x_hat,\n        'gamma': gamma,\n        'eps': eps\n    }\n    \n    return out, cache",
          "testCases": [
            {
              "input": "x = np.array([[1.0, 3.0, 5.0]]); g = np.ones(3); b = np.zeros(3); out, cache = layernorm_forward(x, g, b); print(f\"{out.mean():.1f},{out.std():.1f}\")",
              "expected": "0.0,1.0"
            },
            {
              "input": "x = np.array([[10.0, 20.0], [100.0, 200.0]]); g = np.ones(2); b = np.zeros(2); out, _ = layernorm_forward(x, g, b); print(np.allclose(out[0], out[1]))",
              "expected": "True"
            }
          ],
          "expectedOutput": "0.0,1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, \n                       eps: float = 1e-5) -> tuple[np.ndarray, dict]:\n    \"\"\"\n    Computes Layer Normalization across the last feature dimension.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (..., D)\n    gamma : np.ndarray of shape (D,)\n    beta : np.ndarray of shape (D,)\n    eps : float\n    \n    Returns\n    -------\n    tuple of (out, cache)\n    \"\"\"\n    # Step 1: Compute empirical mean and variance along the last feature dimension (axis=-1)\n    mean = np.mean(x, axis=-1, keepdims=True)\n    var = np.var(x, axis=-1, keepdims=True)\n    \n    # Step 2: Standardize activations to zero mean and unit variance\n    inv_std = 1.0 / np.sqrt(var + eps)\n    x_hat = (x - mean) * inv_std\n    \n    # Step 3: Apply learnable scale (gamma) and shift (beta) affine parameters\n    out = gamma * x_hat + beta\n    \n    # Step 4: Construct cache dictionary storing intermediate variables for backward pass\n    cache = {\n        'x': x,\n        'mean': mean,\n        'var': var,\n        'inv_std': inv_std,\n        'x_hat': x_hat,\n        'gamma': gamma,\n        'eps': eps\n    }\n    \n    return out, cache",
              "expectedOutput": "0.0,1.0"
            }
          },
          "solution": "import numpy as np\n\ndef layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, \n                       eps: float = 1e-5) -> tuple[np.ndarray, dict]:\n    mean = np.mean(x, axis=-1, keepdims=True)\n    var = np.var(x, axis=-1, keepdims=True)\n    x_norm = (x - mean) / np.sqrt(var + eps)\n    out = gamma * x_norm + beta\n    cache = {'x_norm': x_norm, 'mean': mean, 'var': var, 'gamma': gamma}\n    return out, cache"
        },
        "hints": {
          "tier1": {
            "en": "Compute mean and variance along `axis=-1` with `keepdims=True`.",
            "ar": "احسب المتوسط والتباين عبر المحور الأخير `axis=-1` مع الاحتفاظ بالأبعاد `keepdims=True`."
          },
          "tier2": {
            "en": "Normalize `x_norm = (x - mean) / np.sqrt(var + eps)`.",
            "ar": "عاير المدخلات عبر `x_norm = (x - mean) / np.sqrt(var + eps)`."
          },
          "tier3": {
            "en": "Apply affine transformation `out = gamma * x_norm + beta`.",
            "ar": "طبق التحويل التآلفي عبر `out = gamma * x_norm + beta`."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does Layer Normalization show exact invariance to scaling the input vector by any positive constant $\\alpha > 0$ ($\\text{LN}(\\alpha \\mathbf{x}) = \\text{LN}(\\mathbf{x})$), and how does this property critically stabilize the training dynamics of deep Transformer architectures?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تطبيع الطبقات وثبات التمثيلات الخفية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Multiplying $\\mathbf{x}$ by $\\alpha$ scales the centered difference $(\\alpha x_j - \\alpha \\mu)$ by $\\alpha$, while the standard deviation $\\sqrt{\\alpha^2 \\sigma^2}$ is also scaled by $\\alpha$; the two scalar factors cancel out exactly in $\\frac{\\alpha(x_j - \\mu)}{\\alpha \\sigma}$. In deep Transformers, where residual skip connections continuously add activations layer after layer causing representation norms to grow with depth, LayerNorm continuously resets the scale to unit variance, preventing activation explosion and numerical instability.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "LayerNorm subtracts $\\alpha$ inside the learnable bias parameter $\\boldsymbol{\\beta}$ during the forward pass.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Scaling by $\\alpha$ rotates the activation vector orthogonally in Hilbert space, keeping Euclidean length invariant.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "LayerNorm dynamically truncates all incoming activation numbers to unit floats before computing statistics.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "rmsnorm-residual-highways",
    "title": "Root Mean Square Normalization (RMSNorm) & Residual Highways",
    "titleAr": "تطبيع متوسط المربعات الجذري (RMSNorm) ومسارات التدفق المتبقية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine water flowing down a series of terraced waterfalls across a 100-layer mountain.",
      "ar": "تخيل تدفق إشارة عبر عشرات الطبقات العصبية العميقة. في تطبيع الطبقات الكلاسيكي (LayerNorm)، تضطر كل طبقة لحساب المتوسط الحسابي μ وطرحه ثم..."
    },
    "prerequisites": [
      "layer-normalization-invariance"
    ],
    "x": 1125,
    "y": 1125,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "Imagine water flowing down a series of terraced waterfalls across a 100-layer mountain. In classical Layer Normalization, every single terrace halts the rushing torrent to calculate two distinct metrics: the average water level (mean $\\mu$) and the wave turbulence height (variance $\\sigma^2$). It drains the water to subtract the mean, recenters the flow at zero, and then rescales it. For years, deep learning practitioners assumed that this recentering was indispensable for stable training in deep neural architectures.\n\nHowever, in 2019, Biao Zhang and Rico Sennrich made a profound empirical and theoretical discovery: **mean-centering is computationally redundant**. What truly protects deep networks from gradient explosion and numerical collapse is not shifting the mean of activations to zero, but scaling the activation vectors by their **root-mean-square (RMS) amplitude**. Keeping activation magnitudes pinned to a stable geometric hypersphere is all that is required for healthy, unimpeded gradient propagation.\n\nBy stripping away the mean-centering step, **RMSNorm** slashes GPU memory bandwidth consumption. In modern hardware accelerators (such as NVIDIA H100s or Google TPUs), the execution time of normalization layers is bounded not by raw floating-point operations (FLOPs), but by memory access latency—reading and writing massive activation tensors across High Bandwidth Memory (HBM). LayerNorm requires two sequential reduction passes over memory (one to calculate the mean, and another to calculate the variance around that mean). RMSNorm consolidates this into a single, high-speed fused memory pass, cutting kernel latency by up to 50%!\n\nWhen paired with a **Pre-Norm Residual Highway** ($\\mathbf{x}_{l+1} = \\mathbf{x}_l + \\text{Sublayer}(\\text{RMSNorm}(\\mathbf{x}_l))$), the architectural synergy is transformative. The core informational signal travels uninterrupted down an express lane through hundreds of transformer blocks, while RMSNorm acts as a lightweight, frictionless speed governor at the entrance of each attention and feedforward sublayer. This exact synergy is why virtually every state-of-the-art open foundation model—including LLaMA 3, Mistral, Gemma, and DeepSeek—has systematically replaced LayerNorm with RMSNorm.\n\n> **Frontier Analogy:** Imagine an express bullet train track (the residual highway) running from Tokyo to Osaka. In older architectures, the train was forced to stop at every single rural station, unload every passenger, and weigh them all together to calculate an average weight (LayerNorm). In modern Pre-RMSNorm architectures, the bullet train cruises non-stop at 300 km/h along the main steel rails, while passengers board and disembark via synchronized side ramps calibrated solely by an automatic weight limiter (RMSNorm).",
          "ar": "تخيل تدفق إشارة عبر عشرات الطبقات العصبية العميقة. في تطبيع الطبقات الكلاسيكي (LayerNorm)، تضطر كل طبقة لحساب المتوسط الحسابي μ وطرحه ثم حساب التباين، وهو ما يثقل ناقل الذاكرة بعمليات قراءة وكتابة مضاعفة. اكتشف الباحثون أن مركزة المتوسط ليست ضرورية لاستقرار التدريب؛ بل إن معايرة الشدة عبر جذر متوسط المربعات (RMS) وحدها كافية لإبقاء التنشيطات ضمن نطاق هندسي مستقر. وعند ربطها بمسار التدفق المتبقي المباشر (Residual Highway)، تعمل RMSNorm كصمام أمان يحافظ على ديناميكية التدرجات دون تعطيل الإشارة الأصلية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RMS}(\\mathbf{x}) = \\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\epsilon}",
        "formulaNote": {
          "en": "RMSNorm scales activations by their root-mean-square magnitude and applies learnable gain γ.",
          "ar": "تعاير RMSNorm التنشيطات بمقدار جذر متوسط المربعات وتطبق معامل التكبير القابل للتعلم γ."
        },
        "narrative": {
          "en": "The normalized output $\\bar{\\mathbf{x}} \\in \\mathbb{R}^d$ is obtained by scaling $\\mathbf{x}$ by the reciprocal of its RMS, modulated by a learnable gain vector $\\boldsymbol{\\gamma} \\in \\mathbb{R}^d$:\n\n$$\n\\bar{\\mathbf{x}} = \\frac{\\mathbf{x}}{\\text{RMS}(\\mathbf{x})} \\odot \\boldsymbol{\\gamma} = \\frac{\\mathbf{x}}{\\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\epsilon}} \\odot \\boldsymbol{\\gamma}\n$$\n\nIn a modern Pre-RMSNorm Transformer block with residual highway connections, the complete forward pass is formulated as:\n\n$$\n\\mathbf{x}_{\\text{norm}} = \\text{RMSNorm}(\\mathbf{x}_l), \\quad \\mathbf{x}_{l+1} = \\mathbf{x}_l + \\text{Sublayer}(\\mathbf{x}_{\\text{norm}})\n$$\n\nThe analytical backward gradient through the RMSNorm operator with respect to input $\\mathbf{x}$ evaluates to:\n\n$$\n\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}} = \\frac{1}{\\text{RMS}(\\mathbf{x})} \\left( \\frac{\\partial \\mathcal{L}}{\\partial \\bar{\\mathbf{x}}} \\odot \\boldsymbol{\\gamma} - \\frac{\\mathbf{x}}{d \\cdot \\text{RMS}(\\mathbf{x})^2} \\sum_{i=1}^d \\left( \\frac{\\partial \\mathcal{L}}{\\partial \\bar{x}_i} \\gamma_i x_i \\right) \\right)\n$$\n\n* $\\mathbf{x} \\in \\mathbb{R}^{B \\times T \\times d}$: Hidden state tensor across batch size $B$, sequence length $T$, and hidden dimension $d$ (e.g., $d = 4096$ in LLaMA-3-8B).\n* $\\text{RMS}(\\mathbf{x}) \\in \\mathbb{R}^{B \\times T \\times 1}$: Scalar norm calculated independently across the last feature dimension ($d$) for each token vector.\n* $\\boldsymbol{\\gamma} \\in \\mathbb{R}^d$: Learnable scaling vector initialized to ones ($\\boldsymbol{\\gamma} = \\mathbf{1}$), enabling the network to stretch or contract individual feature dimensions.\n* $\\epsilon \\approx 10^{-6}$: Small positive numerical stabilizer preventing division by zero when activations are near zero.\n* $\\odot$: Hadamard (element-wise) product.\n* **Scale Invariance:** For any positive scalar factor $\\alpha > 0$, $\\text{RMSNorm}(\\alpha \\mathbf{x}) = \\text{RMSNorm}(\\mathbf{x})$, guaranteeing that unconstrained growth in activation scales along the residual highway does not distort downstream layers.\n\n---\n\nImplement `rms_norm_forward(x, gamma, eps, residual)` to compute RMSNorm over the last dimension. If a `residual` tensor is provided, implement the Pre-Norm residual highway connection by first adding the residual to `x` before computing the root-mean-square norm.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتوضح هذه الصياغة الرياضية استغناء RMSNorm التام عن معامل الإزاحة $\\boldsymbol{\\beta}$ وعن طرح المتوسط $\\mu$. يُقاس كل متجه بمفرده على طول البعد الأخير $d$، وتضمن خاصية ثبات المقياس ($\\text{Scale Invariance}$) أنه حتى لو تضاعفت سعة الإشارة عبر المسار المتبقي بمقدار $\\alpha$، فإن الخرج المُعاير يظل ثابتاً ومحمياً من الانفجار العددي.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-rmsnorm-residual-highways",
          "starterCode": "import numpy as np\n\ndef rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, \n                     residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute RMSNorm across the last dimension with optional residual highway addition.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (..., D)\n        Input activation tensor.\n    gamma : np.ndarray of shape (D,)\n        Learnable gain parameter vector.\n    eps : float\n        Numerical stability epsilon.\n    residual : np.ndarray or None\n        Optional residual tensor of same shape as x.\n        \n    Returns\n    -------\n    tuple of (normed_output, active_input)\n        normed_output: (x_active / rms) * gamma\n        active_input: x + residual (if residual provided) else x\n    \"\"\"\n    # Step 1: Add residual tensor to x if provided (express highway addition)\n    if residual is not None:\n        x_active = x + residual\n    else:\n        x_active = x\n\n    # Step 2: Compute Root Mean Square (RMS) along the last dimension (keepdims=True)\n    # Mean of squared values: mean(x^2)\n    mean_sq = np.mean(x_active ** 2, axis=-1, keepdims=True)\n    rms = np.sqrt(mean_sq + eps)\n\n    # Step 3: Normalize activations and scale by learnable parameter gamma\n    out = (x_active / rms) * gamma\n\n    return out, x_active",
          "testCases": [
            {
              "input": "x = np.array([[2.0, 2.0, 2.0, 2.0]]); gamma = np.ones(4); out, _ = rms_norm_forward(x, gamma); str(round(float(out[0, 0]), 2))",
              "expected": "1.0"
            },
            {
              "input": "x = np.array([[1.0, 1.0]]); gamma = np.array([2.0, 3.0]); res = np.array([[1.0, 1.0]]); out, act = rms_norm_forward(x, gamma, residual=res); str(round(float(act[0, 0]), 2))",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, \n                     residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute RMSNorm across the last dimension with optional residual highway addition.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (..., D)\n        Input activation tensor.\n    gamma : np.ndarray of shape (D,)\n        Learnable gain parameter vector.\n    eps : float\n        Numerical stability epsilon.\n    residual : np.ndarray or None\n        Optional residual tensor of same shape as x.\n        \n    Returns\n    -------\n    tuple of (normed_output, active_input)\n        normed_output: (x_active / rms) * gamma\n        active_input: x + residual (if residual provided) else x\n    \"\"\"\n    # Step 1: Add residual tensor to x if provided (express highway addition)\n    if residual is not None:\n        x_active = x + residual\n    else:\n        x_active = x\n\n    # Step 2: Compute Root Mean Square (RMS) along the last dimension (keepdims=True)\n    # Mean of squared values: mean(x^2)\n    mean_sq = np.mean(x_active ** 2, axis=-1, keepdims=True)\n    rms = np.sqrt(mean_sq + eps)\n\n    # Step 3: Normalize activations and scale by learnable parameter gamma\n    out = (x_active / rms) * gamma\n\n    return out, x_active",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:\n    x_active = x + residual if residual is not None else x\n    rms = np.sqrt(np.mean(x_active ** 2, axis=-1, keepdims=True) + eps)\n    out = (x_active / rms) * gamma\n    return out, x_active"
        },
        "hints": {
          "tier1": {
            "en": "Remember to add the residual before computing the root mean square.",
            "ar": "تأكد من جمع المتجه المتبقي (residual) إلى المدخل قبل حساب جذر متوسط المربعات."
          },
          "tier2": {
            "en": "Compute mean of squares across the last dimension with keepdims=True.",
            "ar": "احسب متوسط المربعات عبر البعد الأخير باستخدام keepdims=True لضمان اتساق الأبعاد."
          },
          "tier3": {
            "en": "Use out = (x_active / rms) * gamma and return (out, x_active).",
            "ar": "استخدم المعادلة out = (x_active / rms) * gamma وأعد الزوج (out, x_active)."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why have virtually all frontier Large Language Model architectures (such as LLaMA 3, Mistral, and Gemma) systematically abandoned classical Layer Normalization in favor of RMSNorm?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تطبيع متوسط المربعات الجذري (RMSNorm) ومسارات التدفق المتبقية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "RMSNorm removes the mean-centering calculation, reducing GPU High Bandwidth Memory (HBM) read/write passes and kernel synchronization latency by roughly 10% to 50% while achieving empirically identical training stability and convergence.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "RMSNorm completely eliminates the need for non-linear activation functions (such as SwiGLU or GELU) in the MLP sub-blocks.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "LayerNorm cannot be computed on 16-bit floating-point tensors (FP16 or BF16) without causing immediate NaN hardware interrupts.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "RMSNorm compresses the hidden dimension $d$ by half, cutting the total parameter count of the Transformer model in two.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "cnn-convolution",
    "title": "2D Convolutions & Spatial Feature Extraction",
    "titleAr": "التلافيف المكانية ثنائية الأبعاد واستخراج الميزات البصرية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine standing in a vast, pitch-black gallery facing a massive $1000 \\times 1000$ pixel mosaic.",
      "ar": "التلافيف المكانية (Convolutions) تشبه مصباحاً كاشفاً منزلقاً يمسح أرجاء الصورة بحثاً عن أنماط محلية كالحواف والزوايا."
    },
    "prerequisites": [
      "cs-17",
      "adamw-weight-decay-schedules"
    ],
    "x": 1100,
    "y": 1220,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ConvolutionFilterCanvas",
        "narrative": {
          "en": "Imagine standing in a vast, pitch-black gallery facing a massive $1000 \\times 1000$ pixel mosaic. If you were a standard Multi-Layer Perceptron (MLP), you would try to run a separate copper wire from every single pixel to every single neuron in the next layer. For a modest hidden layer of 1,000 neurons on a high-definition RGB image, you would need over **three billion parameters**! Even worse, if you learned to recognize a cat in the top-left corner, your network would be completely blind to that exact same cat sitting in the bottom-right corner, because entirely different weights would be listening to those pixels.\n\nConvolutional Neural Networks (CNNs) solve this catastrophe through two revolutionary design principles: **local receptive fields** and **weight sharing**.\n\nInstead of viewing the entire image at once, imagine holding a **sliding flashlight** with a tiny, focused rectangular beam—a $3 \\times 3$ or $5 \\times 5$ filter kernel. You place the flashlight over a local patch of pixels, multiply the pixel intensities by the pattern etched onto the flashlight's lens, and record a single resonance score. If the patch contains a sharp diagonal edge that matches the filter, the score lights up brightly. If the patch is a flat, uniform background, the score stays dark.\n\nNow, you slide that identical flashlight across the entire canvas, step by step, from left to right and top to bottom. Because the **exact same flashlight lens is used everywhere**, the network gains **translation equivariance**: if a cat moves from the top-left to the bottom-right, the resulting feature map simply shifts the detected feature to the bottom-right without needing a single new weight!\n\n> **Frontier Analogy:** Think of a rubber ink stamp carved with the shape of an eye. Instead of hand-drawing a billion eyes from scratch across a city map, you stamp the identical eye template across every street corner. Wherever an eye truly exists, the ink stamp matches the underlying outline and rings an alarm bell.",
          "ar": "التلافيف المكانية (Convolutions) تشبه مصباحاً كاشفاً منزلقاً يمسح أرجاء الصورة بحثاً عن أنماط محلية كالحواف والزوايا. فبدلاً من ربط كل بكسل بمليارات الأوزان المنفصلة، نستخدم مرشحاً صغيراً (نواة ترشيح 3×3) ينزلق خطوة بخطوة فوق الصورة ليحسب حاصل الضرب النقطي المحلي. يمنح 'تشارك الأوزان' (Weight Sharing) الشبكة قدرة فائقة على التعرف على الميزات بغض النظر عن موقعها المكاني، مما يختزل عدد المعاملات الحسابية ويمنح النموذج مناعة ضد الإزاحة المكانية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(\\mathbf{I} * \\mathbf{K})(i, j) = \\sum_{m=0}^{k_H-1} \\sum_{n=0}^{k_W-1} \\mathbf{I}(i + m, j + n) \\mathbf{K}(m, n) + b",
        "formulaNote": {
          "en": "Discrete 2D cross-correlation sliding window formula with additive scalar bias.",
          "ar": "صيغة الارتباط المتبادل ثنائي الأبعاد للنافذة المنزلقة مع الانحياز القياسي."
        },
        "narrative": {
          "en": "For multi-channel feature maps where input tensor $\\mathbf{X} \\in \\mathbb{R}^{H \\times W \\times C_{\\text{in}}}$ and output has $C_{\\text{out}}$ channels, the tensor convolution with 4D weight tensor $\\mathbf{W} \\in \\mathbb{R}^{C_{\\text{out}} \\times k_H \\times k_W \\times C_{\\text{in}}}$ is formulated as:\n\n$$\n\\mathbf{Y}(i, j, c_{\\text{out}}) = \\sum_{c_{\\text{in}}=1}^{C_{\\text{in}}} \\sum_{m=0}^{k_H-1} \\sum_{n=0}^{k_W-1} \\mathbf{X}(i+m, j+n, c_{\\text{in}}) \\mathbf{W}(c_{\\text{out}}, m, n, c_{\\text{in}}) + b(c_{\\text{out}})\n$$\n\nThe spatial output dimensions for unit stride ($S=1$) and zero padding ($P=0$) are strictly governed by:\n\n$$\nH_{\\text{out}} = H - k_H + 1, \\quad W_{\\text{out}} = W - k_W + 1\n$$\n\n* $\\mathbf{X} \\in \\mathbb{R}^{H \\times W \\times C_{\\text{in}}}$: Input image or intermediate feature tensor of height $H$, width $W$, and $C_{\\text{in}}$ channels (e.g., RGB channels where $C_{\\text{in}} = 3$).\n* $\\mathbf{K} \\in \\mathbb{R}^{k_H \\times k_W}$: 2D spatial convolution kernel matrix with height $k_H$ and width $k_W$.\n* $\\mathbf{W} \\in \\mathbb{R}^{C_{\\text{out}} \\times k_H \\times k_W \\times C_{\\text{in}}}$: Full convolutional bank of $C_{\\text{out}}$ distinct 3D filter kernels.\n* $b \\in \\mathbb{R}^{C_{\\text{out}}}$: Learnable channel bias terms.\n* $\\mathbf{Y} \\in \\mathbb{R}^{H_{\\text{out}} \\times W_{\\text{out}} \\times C_{\\text{out}}}$: Output feature map tensor representing extracted spatial activations.\n* **Parameter Complexity:** A fully connected layer connecting an $H \\times W$ input to an $H \\times W$ output requires $\\mathcal{O}(H^2 W^2)$ weights. A convolutional layer requires only $k_H \\cdot k_W \\cdot C_{\\text{in}} \\cdot C_{\\text{out}}$ weights, completely decoupling model size from input resolution $(H, W)$!\n\n---\n\nImplement `conv2d_forward(image, kernel, bias)` to perform valid 2D discrete cross-correlation convolution with unit stride ($S=1$) and zero padding ($P=0$). For each spatial coordinate $(i, j)$, extract the local slice of `image`, compute the Frobenius sum of element-wise products with `kernel`, and add `bias`.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتوضح المعادلات الرياضية أن كل قيمة في مصفوفة المخرجات $\\mathbf{Y}$ تمثل حاصل الضرب الداخلي لفرو Frobenius بين رقعة البكسلات ونواة الترشيح. وبفضل تشارك الأوزان عبر كافة المواقع المكانية، يتقلص عدد المعاملات من تعقيد تربيعي مدمر $\\mathcal{O}(H^2 W^2)$ إلى حجم النواة المدمج $k_H \\cdot k_W$ فقط، مما يجعل تدريب شبكات الرؤية الحاسوبية على صور فائقة الدقة أمراً عملياً وقابلاً للتحقيق.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-cnn-convolution",
          "starterCode": "def conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:\n    \"\"\"\n    Perform 2D spatial convolution (valid padding, stride=1).\n    \n    Parameters\n    ----------\n    image : np.ndarray of shape (H, W)\n        2D input image matrix.\n    kernel : np.ndarray of shape (kH, kW)\n        2D filter kernel.\n    bias : float\n        Additive scalar bias term.\n        \n    Returns\n    -------\n    np.ndarray of shape (H - kH + 1, W - kW + 1)\n        Convolved feature map.\n    \"\"\"\n    # Step 1: Extract spatial dimensions and calculate output grid size\n    # Initialize output array\n    # Step 2: Slide the kernel window and compute local dot products\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "img = np.ones((4, 4)); k = np.ones((2, 2)); out = conv2d_forward(img, k); str(round(float(out[0, 0]), 2))",
              "expected": "4.0"
            },
            {
              "input": "img = np.array([[1.0, 2.0], [3.0, 4.0]]); k = np.array([[1.0, 0.0], [0.0, 1.0]]); out = conv2d_forward(img, k, bias=1.0); str(round(float(out[0, 0]), 2))",
              "expected": "6.0"
            }
          ],
          "expectedOutput": "4.0",
          "variants": {
            "python": {
              "starterCode": "def conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:\n    \"\"\"\n    Perform 2D spatial convolution (valid padding, stride=1).\n    \n    Parameters\n    ----------\n    image : np.ndarray of shape (H, W)\n        2D input image matrix.\n    kernel : np.ndarray of shape (kH, kW)\n        2D filter kernel.\n    bias : float\n        Additive scalar bias term.\n        \n    Returns\n    -------\n    np.ndarray of shape (H - kH + 1, W - kW + 1)\n        Convolved feature map.\n    \"\"\"\n    # Step 1: Extract spatial dimensions and calculate output grid size\n    # Initialize output array\n    # Step 2: Slide the kernel window and compute local dot products\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "4.0"
            }
          },
          "solution": "import numpy as np\n\ndef conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:\n    \"\"\"\n    Perform 2D spatial convolution (valid padding, stride=1).\n    \n    Parameters\n    ----------\n    image : np.ndarray of shape (H, W)\n        2D input image matrix.\n    kernel : np.ndarray of shape (kH, kW)\n        2D filter kernel.\n    bias : float\n        Additive scalar bias term.\n        \n    Returns\n    -------\n    np.ndarray of shape (H - kH + 1, W - kW + 1)\n        Convolved feature map.\n    \"\"\"\n    # Step 1: Extract spatial dimensions and calculate output grid size\n    H, W = image.shape\n    kH, kW = kernel.shape\n    out_h = H - kH + 1\n    out_w = W - kW + 1\n    \n    # Initialize output array\n    out = np.zeros((out_h, out_w), dtype=image.dtype)\n    \n    # Step 2: Slide the kernel window and compute local dot products\n    for i in range(out_h):\n        for j in range(out_w):\n            patch = image[i:i + kH, j:j + kW]\n            out[i, j] = np.sum(patch * kernel) + bias\n            \n    return out"
        },
        "hints": {
          "tier1": {
            "en": "Compute output dimensions as H - kH + 1 and W - kW + 1.",
            "ar": "احسب أبعاد المخرج بالصيغة H - kH + 1 و W - kW + 1."
          },
          "tier2": {
            "en": "Slice the local patch image[i:i+kH, j:j+kW] at each location.",
            "ar": "استخرج الرقعة المحلية عبر image[i:i+kH, j:j+kW] عند كل موضع."
          },
          "tier3": {
            "en": "Multiply the patch by the kernel element-wise, sum, and add bias.",
            "ar": "اضرب الرقعة في النواة عنصرياً ثم اجمع النواتج وأضف الانحياز bias."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the fundamental theoretical reason why Convolutional Neural Networks vastly outperform standard Fully",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التلافيف المكانية ثنائية الأبعاد واستخراج الميزات البصرية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "CNNs encode a strong spatial inductive bias through weight sharing and local receptive fields, enforcing translation equivariance and drastically reducing parameter counts so the model does not overfit to specific pixel positions.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Convolutions completely eliminate the need for automatic differentiation and backpropagation during model training.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Fully connected layers cannot represent non-linear decision boundaries regardless of activation functions.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Convolutions process images in the frequency Fourier domain where all image noise is mathematically zero.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "stride-padding-receptive-fields",
    "title": "Strides, Padding & Receptive Field Arithmetic",
    "titleAr": "خطوات الانزلاق والحشو وحساب المجال الإدراكي للشبكات العصبية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine looking at a breathtaking panoramic mountain landscape through a narrow cardboard straw.",
      "ar": "المجال الإدراكي (Receptive Field) هو رقعة البكسلات الأصلية التي يستطيع عصبون معين في طبقة عميقة 'رؤيتها' والتأثر بها."
    },
    "prerequisites": [
      "cnn-convolution"
    ],
    "x": 1125,
    "y": 1315,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ConvolutionFilterCanvas",
        "narrative": {
          "en": "Imagine looking at a breathtaking panoramic mountain landscape through a narrow cardboard straw. At first, you can only see a single patch of tree bark—your field of view is minuscule. But imagine a friend standing behind you looking at a grid of four straws, and a teacher behind them looking at sixteen straws. As you climb higher up this hierarchy of observers, each successive layer sees a broader perspective of the scene below, until a single observer at the summit can perceive the entire mountain range at once!\n\nThis span of the original raw input image that directly influences the activation of a single neuron in a deep layer is called its **Effective Receptive Field (RF)**. In early convolutional layers, neurons only detect microscopic, local textures like tiny edges and color gradients. By the time features reach deep layers, neurons possess a massive receptive field spanning hundreds of pixels, allowing them to comprehend whole semantic objects like eyes, car wheels, or human faces.\n\nTo control how spatial dimensions and receptive fields evolve through deep architectures, vision engineers rely on two essential control levers: **Padding** and **Stride**.\n\nWithout **Padding ($P$)**, every time a $3 \\times 3$ or $5 \\times 5$ kernel slides across an image, the outer border pixels are inspected fewer times than central pixels, causing the feature map to shrink layer by layer. Left unchecked, a 50-layer network would vanish into a single pixel before extracting meaningful depth! Padding wraps the perimeter of the image in a protective cushion of zeros (\"same padding\"), preserving the spatial dimensions and giving border pixels equal representational weight.\n\nMeanwhile, **Stride ($S$)** controls how many pixels the sliding filter leaps on each step. A stride of $S=1$ inspects every overlapping position, while a stride of $S=2$ skips every other pixel, downsampling both height and width by half. Stride acts as an aggressive spatial compressor, cutting computation by $4\\times$ while exponentially accelerating the rate at which downstream neurons expand their receptive fields across the visual scene.\n\n> **Frontier Analogy:** Think of padding as bubble-wrap around a delicate glass painting so the frame doesn't clip off its corners during shipping. Stride is walking across stepping stones: taking baby steps ($S=1$) records every pebble, while taking running leaps ($S=2$) covers twice the distance in half the time, doubling your field of view with each leap.",
          "ar": "المجال الإدراكي (Receptive Field) هو رقعة البكسلات الأصلية التي يستطيع عصبون معين في طبقة عميقة 'رؤيتها' والتأثر بها. عند بداية الشبكة، يرى العصبون بقعة صغيرة جداً (3×3). ولكن مع تعاقب الطبقات وتطبيق خطوات الانزلاق (Strides) التي تقفز عبر البكسلات لتقليص الأبعاد، يتسع الأفق تدريجياً ليرى ميزات بصرية شاملة. أما الحشو (Padding)، فيشبه إضافة إطار حماية فارغ حول حواف الصورة لمنع تآكل أبعادها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "H_{\\text{out}} = \\left\\lfloor \\frac{H - K + 2P}{S} \\right\\rfloor + 1, \\quad W_{\\text{out}} = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1",
        "formulaNote": {
          "en": "Recurrent receptive field expansion formula where J represents cumulative stride jump.",
          "ar": "صيغة اتساع المجال الإدراكي التراكمي حيث يمثل J حاصل ضرب خطوات القفز."
        },
        "narrative": {
          "en": "The expansion of the **Effective Receptive Field ($\\text{RF}$)** through a cascade of $L$ layers is computed via the recursive arithmetic formula:\n\n$$\n\\text{RF}_l = \\text{RF}_{l-1} + (k_l - 1) \\cdot J_{l-1}\n$$\n\nWhere the **cumulative jump** $J_l$ (the spatial stride of feature pixels in layer $l$ relative to the input) tracks stride multiplication:\n\n$$\nJ_l = J_{l-1} \\cdot s_l, \\quad \\text{with base conditions: } \\text{RF}_0 = 1, \\; J_0 = 1\n$$\n\n* $H, W$: Input feature map height and width.\n* $K \\in \\{1, 3, 5, 7\\}$: Spatial kernel size.\n* $P \\ge 0$: Number of zero-padding pixels appended symmetrically to both borders.\n* $S \\ge 1$: Spatial stride step size.\n* $\\text{RF}_l$: Total span of input pixels that can influence a single activation in layer $l$.\n* $J_l$: Cumulative feature stride (jump) between adjacent activations at layer $l$.\n* $\\lfloor \\cdot \\rfloor$: Floor integer division operator.\n\n### The Architectural Magic of Stacking Small Kernels:\nConsider two architectural designs for achieving a $5 \\times 5$ receptive field on an image with $C$ channels:\n1. **Single Large Filter:** A single $5 \\times 5$ convolution ($S=1, P=0$) yields:\n   $$\\text{RF}_1 = 1 + (5 - 1) \\cdot 1 = 5, \\quad \\text{Parameters} = 5 \\times 5 \\times C^2 = 25C^2$$\n2. **Stacked Small Filters:** Two consecutive $3 \\times 3$ convolutions ($S=1, P=0$) yield:\n   $$\\text{RF}_1 = 1 + (3 - 1) \\cdot 1 = 3, \\quad \\text{RF}_2 = 3 + (3 - 1) \\cdot 1 = 5$$\n   $$\\text{Parameters} = 2 \\times (3 \\times 3 \\times C^2) = 18C^2$$\n\nStacking two $3 \\times 3$ layers matches the exact $5 \\times 5$ receptive field while using **28% fewer parameters** ($18C^2$ vs $25C^2$) and inserting **two non-linear activation functions** (e.g. ReLUs) instead of one, exponentially boosting representation capacity!\n\n---\n\nImplement `compute_receptive_field(layers)` to calculate the total effective receptive field size and cumulative spatial jump across a sequential chain of convolutional layers. Each layer is represented as a dictionary with keys `'kernel'` and `'stride'`.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتوضح هذه القوانين الرياضية سبب تبني المعماريات الحديثة لمرشحات صغيرة الحجم 3×3 بدلاً من المرشحات الضخمة؛ فتتابع طبقتين من 3×3 يغطي تماماً نفس المجال الإدراكي لطبقة 5×5 ولكن مع توفير 28% من المعاملات وإتاحة محطتي تنشيط غير خطي، مما يضاعف قدرة الشبكة على تعلم الأنماط المعقدة.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-stride-padding-receptive-fields",
          "starterCode": "def compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:\n    \"\"\"\n    Compute total receptive field size and cumulative jump across layers.\n    \n    Parameters\n    ----------\n    layers : list of dict\n        Each dict contains 'kernel' (int) and 'stride' (int).\n        \n    Returns\n    -------\n    tuple of (rf, jump)\n        rf: total receptive field size on input image.\n        jump: cumulative stride relative to input.\n    \"\"\"\n    # Step 1: Initialize base receptive field RF_0 = 1 and cumulative jump J_0 = 1\n    # Step 2: Loop over layers and apply recurrence equations\n    # RF_l = RF_{l-1} + (k_l - 1) * J_{l-1}\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "layers = [{'kernel': 3, 'stride': 1}, {'kernel': 3, 'stride': 1}]; rf, j = compute_receptive_field(layers); str(rf)",
              "expected": "5"
            },
            {
              "input": "layers = [{'kernel': 3, 'stride': 2}, {'kernel': 3, 'stride': 2}]; rf, j = compute_receptive_field(layers); str((rf, j))",
              "expected": "(7, 4)"
            }
          ],
          "expectedOutput": "5",
          "variants": {
            "python": {
              "starterCode": "def compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:\n    \"\"\"\n    Compute total receptive field size and cumulative jump across layers.\n    \n    Parameters\n    ----------\n    layers : list of dict\n        Each dict contains 'kernel' (int) and 'stride' (int).\n        \n    Returns\n    -------\n    tuple of (rf, jump)\n        rf: total receptive field size on input image.\n        jump: cumulative stride relative to input.\n    \"\"\"\n    # Step 1: Initialize base receptive field RF_0 = 1 and cumulative jump J_0 = 1\n    # Step 2: Loop over layers and apply recurrence equations\n    # RF_l = RF_{l-1} + (k_l - 1) * J_{l-1}\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "5"
            }
          },
          "solution": "def compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:\n    \"\"\"\n    Compute total receptive field size and cumulative jump across layers.\n    \n    Parameters\n    ----------\n    layers : list of dict\n        Each dict contains 'kernel' (int) and 'stride' (int).\n        \n    Returns\n    -------\n    tuple of (rf, jump)\n        rf: total receptive field size on input image.\n        jump: cumulative stride relative to input.\n    \"\"\"\n    # Step 1: Initialize base receptive field RF_0 = 1 and cumulative jump J_0 = 1\n    rf = 1\n    jump = 1\n\n    # Step 2: Loop over layers and apply recurrence equations\n    for layer in layers:\n        k = layer['kernel']\n        s = layer['stride']\n        \n        # RF_l = RF_{l-1} + (k_l - 1) * J_{l-1}\n        rf = rf + (k - 1) * jump\n        \n        # J_l = J_{l-1} * s_l\n        jump = jump * s\n\n    return rf, jump"
        },
        "hints": {
          "tier1": {
            "en": "Start with rf = 1 and jump = 1 before iterating through the layers.",
            "ar": "ابدأ بـ rf = 1 و jump = 1 قبل الدخول في الحلقة التكرارية للطبقات."
          },
          "tier2": {
            "en": "At each layer, update rf += (kernel - 1) * jump before updating jump.",
            "ar": "في كل طبقة، حدث rf += (kernel - 1) * jump أولاً قبل تحديث jump."
          },
          "tier3": {
            "en": "After expanding rf, multiply jump by the layer's stride: jump *= stride.",
            "ar": "بعد توسيع rf، اضرب jump في خطوة الانزلاق: jump *= stride."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why did groundbreaking deep vision architectures (such as VGG-16 and ResNet) completely replace large $7 \\times 7$ and $11 \\times 11$ convolutional kernels with stacks of multiple small $3 \\times 3$ kernels?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خطوات الانزلاق والحشو وحساب المجال الإدراكي للشبكات العصبية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Stacking three $3 \\times 3$ convolutional layers achieves the exact same $7 \\times 7$ receptive field while reducing parameter count from $49C^2$ to $27C^2$ (a 45% reduction) and introducing three non-linear activation functions instead of one.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "$3 \\times 3$ kernels eliminate all GPU memory bandwidth consumption because they fit entirely inside CPU L1 cache.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Stacking $3 \\times 3$ kernels ensures that the network is mathematically equivalent to a linear regression model.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Larger kernels ($7 \\times 7$) cannot be trained using gradient descent because their analytical gradients are identically zero.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "resnet-residual-skip-connections",
    "title": "ResNet Skip Connections & Gradient Elevators",
    "titleAr": "الروابط المتبقية في ResNet ومصاعد التدرجات الخالية من العوائق",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine being forced to climb 150 flights of steep, crumbling concrete stairs inside a colossal skyscraper.",
      "ar": "تخيل أنك تحاول إرسال رسالة صوتية عبر ممر طويل يحتوي على 100 جدار عازل؛ ستتلاشى الإشارة حتى تنعدم تماماً، وهو تماماً ما كان يحصل للتدرجات..."
    },
    "prerequisites": [
      "stride-padding-receptive-fields",
      "rmsnorm-residual-highways"
    ],
    "x": 1100,
    "y": 1410,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ConvolutionFilterCanvas",
        "narrative": {
          "en": "Imagine being forced to climb 150 flights of steep, crumbling concrete stairs inside a colossal skyscraper. With every single flight of stairs you ascend, your leg muscles burn with greater exhaustion. By the 80th floor, you collapse completely, incapable of taking another step.\n\nBefore 2015, this was the exact existential crisis confronting deep learning researchers attempting to scale neural networks. When researchers stacked 56 plain convolutional layers on CIFAR-10, they witnessed a shocking failure known as the **degradation problem**: the 56-layer network suffered *higher training error* and *higher test error* than a simple 20-layer network! This was not overfitting (the training error itself was higher); rather, the optimization process had completely broken down. As backpropagating error signals multiplied through dozens of consecutive weight matrices and activation derivatives, the gradients exponentially vanished into numerical silence. The deeper the network, the less the earliest layers could learn.\n\nIn late 2015, Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun introduced one of the most influential architectural innovations in the history of artificial intelligence: **Deep Residual Learning (ResNet)**.\n\nTheir solution was conceptually breathtaking and disarmingly simple: install a high-speed express **elevator** next to the stairs! Instead of forcing the signal to struggle through every layer, they added a parallel shortcut wire that passes the input $\\mathbf{x}$ directly to the output: $\\mathbf{y} = \\mathcal{F}(\\mathbf{x}) + \\mathbf{x}$.\n\nWhy is this so profoundly effective? If a layer turns out to be unhelpful, it does not need to learn an intricate, difficult identity mapping through stacked non-linear weights. It can simply drive its internal weights $\\mathcal{F}(\\mathbf{x}) \\to \\mathbf{0}$, leaving $\\mathbf{y} = \\mathbf{x}$ intact. Even more importantly, during backpropagation, the identity connection acts as a pristine steel elevator cable: the gradient decomposes additively into $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\cdot \\mathbf{I} + \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}}$. The additive identity matrix $\\mathbf{I}$ lets error signals bypass the stairs entirely and travel down hundreds of layers with zero attenuation!\n\n> **Frontier Analogy:** Imagine an audio recording studio with a chain of 100 distortion effect pedals. If you route the guitar signal solely through the pedals in series, the sound dissolves into unrecognizable static. A residual connection is a \"dry/wet mix\" cable: you send the pristine, pure audio signal straight to the amplifier, and the pedals merely add a subtle, harmonic seasoning $\\mathcal{F}(\\mathbf{x})$ on top of the original sound.",
          "ar": "تخيل أنك تحاول إرسال رسالة صوتية عبر ممر طويل يحتوي على 100 جدار عازل؛ ستتلاشى الإشارة حتى تنعدم تماماً، وهو تماماً ما كان يحصل للتدرجات العكسية في الشبكات العصبية فائقة العمق. جاء ابتكار 'الروابط المتبقية' (ResNet Skip Connections) كـ 'مصعد كهربائي سريع' يتيح للإشارة والتدرجات تجاوز الجدران والسلالم بالكامل. فعبر إضافة المدخل الأصلي مباشرة إلى مخرج الطبقة y = F(x) + x، يتدفق التدرج عبر حد المطابقة I دون أي اضمحلال، مما مكّن من تدريب شبكات تتجاوز 1000 طبقة بنجاح واستقرار تام."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathcal{F}(\\mathbf{x}, \\{\\mathbf{W}_i\\}) + \\mathbf{x}",
        "formulaNote": {
          "en": "Residual block forward formulation and unattenuated gradient additive highway decomposition.",
          "ar": "صيغة الكتلة المتبقية وتفكيك تدرجات الانحدار العكسي عبر مسار المطابقة المباشر."
        },
        "narrative": {
          "en": "Where $\\mathbf{x}$ and $\\mathbf{y}$ are the input and output vectors of the block, and $\\mathcal{F}$ represents the residual mapping to be learned (typically two or three convolutional layers with ReLU activations).\n\nDuring backpropagation, let $\\mathcal{L}$ denote the scalar loss function. Applying the chain rule to the residual equation yields:\n\n$$\n\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\left( \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}} + \\mathbf{I} \\right) = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}} + \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}}\n$$\n\nNow, consider the unrolled recursion across any two arbitrary layers $l$ and $L$ (where $L > l$):\n\n$$\n\\mathbf{x}_L = \\mathbf{x}_l + \\sum_{i=l}^{L-1} \\mathcal{F}(\\mathbf{x}_i, \\{\\mathbf{W}_i\\})\n$$\n\nDifferentiating the loss with respect to earlier layer activation $\\mathbf{x}_l$:\n\n$$\n\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}_l} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}_L} \\frac{\\partial \\mathbf{x}_L}{\\partial \\mathbf{x}_l} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}_L} \\left( \\mathbf{I} + \\frac{\\partial}{\\partial \\mathbf{x}_l} \\sum_{i=l}^{L-1} \\mathcal{F}(\\mathbf{x}_i, \\{\\mathbf{W}_i\\}) \\right)\n$$\n\n* $\\mathbf{x} \\in \\mathbb{R}^{B \\times C_{\\text{in}} \\times H \\times W}$: Input feature activation tensor.\n* $\\mathcal{F}(\\mathbf{x}, \\{\\mathbf{W}_i\\})$: Learned residual mapping function.\n* $\\mathbf{I}$: Identity matrix representing the unattenuated gradient skip pathway.\n* $\\mathbf{W}_{\\text{proj}}$: Linear projection matrix used when spatial dimensions shrink or channel dimensions expand: $\\mathbf{y} = \\mathcal{F}(\\mathbf{x}) + \\mathbf{x}\\mathbf{W}_{\\text{proj}}$.\n* **The Additive Gradient Lifeline:** The term $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}_L} \\mathbf{I}$ travels from layer $L$ to layer $l$ without passing through any intermediate weight matrices $\\mathbf{W}_i$. Even if the Jacobian sum vanishes ($\\frac{\\partial}{\\partial \\mathbf{x}_l} \\sum \\mathcal{F} \\to \\mathbf{0}$), the gradient $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}_l}$ never vanishes because of the unit identity term $\\mathbf{I}$!\n\n---\n\nImplement `residual_block_forward(x, W1, b1, W2, b2, W_proj=None)` computing a 2-layer residual block:\n$$\\mathbf{h}_1 = \\text{ReLU}(\\mathbf{x} \\mathbf{W}_1 + \\mathbf{b}_1)$$\n$$\\mathcal{F}(\\mathbf{x}) = \\mathbf{h}_1 \\mathbf{W}_2 + \\mathbf{b}_2$$\n$$\\text{shortcut} = \\mathbf{x} \\mathbf{W}_{\\text{proj}} \\text{ (if provided, else } \\mathbf{x})$$\n$$\\mathbf{y} = \\text{ReLU}(\\mathcal{F}(\\mathbf{x}) + \\text{shortcut})$$",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتثبت هذه المعادلة الاستنتاجية سبب انتصار معماريات ResNet: حد التطابق $\\mathbf{I}$ يحمي التدرج من الاضمحلال حتى لو صغرت قيم معاملات الطبقات الالتفافية إلى الصفر، مما يجعل المسار المتبقي بمثابة طريق فائق السرعة ينقل المعلومات والتدرجات دون قيود.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-resnet-residual-skip-connections",
          "starterCode": "import numpy as np\n\ndef relu(x: np.ndarray) -> np.ndarray:\n    return np.maximum(0.0, x)\n\ndef residual_block_forward(x: np.ndarray, W1: np.ndarray, b1: np.ndarray, \n                           W2: np.ndarray, b2: np.ndarray, \n                           W_proj: np.ndarray | None = None) -> np.ndarray:\n    \"\"\"\n    Execute forward pass of a basic residual block with identity/projection shortcut.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, D_in)\n    W1, b1 : layer 1 weights and bias\n    W2, b2 : layer 2 weights and bias\n    W_proj : optional projection weights of shape (D_in, D_out)\n    \n    Returns\n    -------\n    np.ndarray of shape (B, D_out)\n    \"\"\"\n    # Step 1: Compute shortcut (identity elevator or linear projection)\n    if W_proj is not None:\n        shortcut = x @ W_proj\n    else:\n        shortcut = x\n\n    # Step 2: Compute residual path F(x) = (ReLU(x @ W1 + b1)) @ W2 + b2\n    h1 = relu(x @ W1 + b1)\n    fx = h1 @ W2 + b2\n\n    # Step 3: Combine residual with shortcut and apply final ReLU activation\n    out = relu(fx + shortcut)\n    return out",
          "testCases": [
            {
              "input": "x = np.ones((1, 2)); W1 = np.zeros((2, 2)); b1 = np.zeros(2); W2 = np.zeros((2, 2)); b2 = np.zeros(2); str(round(float(residual_block_forward(x, W1, b1, W2, b2)[0, 0]), 2))",
              "expected": "1.0"
            },
            {
              "input": "x = np.array([[2.0]]); W1 = np.array([[1.0]]); b1 = np.array([0.0]); W2 = np.array([[1.0]]); b2 = np.array([0.0]); str(round(float(residual_block_forward(x, W1, b1, W2, b2)[0, 0]), 2))",
              "expected": "4.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef relu(x: np.ndarray) -> np.ndarray:\n    return np.maximum(0.0, x)\n\ndef residual_block_forward(x: np.ndarray, W1: np.ndarray, b1: np.ndarray, \n                           W2: np.ndarray, b2: np.ndarray, \n                           W_proj: np.ndarray | None = None) -> np.ndarray:\n    \"\"\"\n    Execute forward pass of a basic residual block with identity/projection shortcut.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, D_in)\n    W1, b1 : layer 1 weights and bias\n    W2, b2 : layer 2 weights and bias\n    W_proj : optional projection weights of shape (D_in, D_out)\n    \n    Returns\n    -------\n    np.ndarray of shape (B, D_out)\n    \"\"\"\n    # Step 1: Compute shortcut (identity elevator or linear projection)\n    if W_proj is not None:\n        shortcut = x @ W_proj\n    else:\n        shortcut = x\n\n    # Step 2: Compute residual path F(x) = (ReLU(x @ W1 + b1)) @ W2 + b2\n    h1 = relu(x @ W1 + b1)\n    fx = h1 @ W2 + b2\n\n    # Step 3: Combine residual with shortcut and apply final ReLU activation\n    out = relu(fx + shortcut)\n    return out",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef relu(x: np.ndarray) -> np.ndarray:\n    return np.maximum(0.0, x)\n\ndef residual_block_forward(x: np.ndarray, W1: np.ndarray, b1: np.ndarray, W2: np.ndarray, b2: np.ndarray, W_proj: np.ndarray | None = None) -> np.ndarray:\n    shortcut = x @ W_proj if W_proj is not None else x\n    h1 = relu(x @ W1 + b1)\n    fx = h1 @ W2 + b2\n    return relu(fx + shortcut)"
        },
        "hints": {
          "tier1": {
            "en": "Compute the shortcut connection first, applying W_proj only if provided.",
            "ar": "احسب وصلة المسار المختصر أولاً، وطبق W_proj فقط إذا كانت ممررة."
          },
          "tier2": {
            "en": "Apply ReLU to the intermediate layer x @ W1 + b1 before multiplying by W2.",
            "ar": "طبق دالة التنشيط ReLU على ناتج الطبقة الأولى x @ W1 + b1 قبل الضرب في W2."
          },
          "tier3": {
            "en": "Add fx and shortcut, then wrap the sum in relu(fx + shortcut).",
            "ar": "اجمع fx مع shortcut، ثم طبق relu على المجموع الكلي."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why do residual skip connections fundamentally eliminate the vanishing gradient problem in deep networks exceeding 100 layers?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الروابط المتبقية في ResNet ومصاعد التدرجات الخالية من العوائق تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The analytical gradient decomposes additively into $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\left(\\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}} + \\mathbf{I}\\right)$, guaranteeing that the identity term $\\mathbf{I}$ propagates gradients directly to earlier layers without exponential product decay through intermediate weight matrices.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Skip connections double the floating-point calculation precision from 32-bit floats to 64-bit doubles at runtime.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The residual connection dynamically scales down the learning rate whenever gradients exceed 1.0.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "ResNet blocks replace stochastic gradient descent with an exact closed-form matrix inversion.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "recurrent-neural-networks-bptt",
    "title": "Recurrent Neural Networks (RNNs) & Backpropagation Through Time (BPTT)",
    "titleAr": "الشبكات العصبية التكرارية (RNNs) والانحدار العكسي عبر الزمن",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine reading a thrilling mystery novel. On page 200, you read the isolated sentence: \"He picked up the rusty dagger.",
      "ar": "لا يمكن فهم الجملة بالنظر إلى كلماتها بمعزل عن سياقها؛ فمعنى الكلمة الأخيرة يتوقف على ما سبقها."
    },
    "prerequisites": [
      "two-layer-mlp-xor-boundary"
    ],
    "x": 1130,
    "y": 1505,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "Imagine reading a thrilling mystery novel. On page 200, you read the isolated sentence: *\"He picked up the rusty dagger.\"* What does this sentence mean? If you had total amnesia and forgot everything you read on pages 1 through 199, you wouldn't know whether the character is an archaeologist excavating an ancient tomb or a murderer preparing to strike in the dark!\n\nStandard feedforward neural networks suffer from precisely this kind of amnesia. They treat every input vector as an isolated, independent snapshot with zero past memory. Yet human thought, speech, music, and time-series data are inherently sequential: meaning is forged in the temporal connections between events.\n\nA **Recurrent Neural Network (RNN)** solves this amnesia by maintaining an evolving internal memory: the **hidden state vector $\\mathbf{h}_t$**. Think of the hidden state as the network's personal **mental diary**. At every time step $t$:\n1. A new event or word $\\mathbf{x}_t$ enters the network.\n2. The network opens yesterday's diary entry $\\mathbf{h}_{t-1}$.\n3. It combines yesterday's memories with today's sensory input to synthesize a fresh diary entry: $\\mathbf{h}_t = \\tanh(\\mathbf{x}_t \\mathbf{W}_{xh} + \\mathbf{h}_{t-1} \\mathbf{W}_{hh} + \\mathbf{b}_h)$.\n\nTo train an RNN using calculus, we do something remarkable: we **unroll the network across time**. A recurrence that loops onto itself for $T$ seconds becomes an equivalent $T$-layer feedforward network, where the identical weight matrices ($\\mathbf{W}_{hh}, \\mathbf{W}_{xh}$) are shared at every tick of the clock. This algorithm is called **Backpropagation Through Time (BPTT)**.\n\nHowever, unrolling an RNN across 100 time steps reveals a fatal mathematical trap: backpropagating an error signal from step 100 back to step 1 requires multiplying by the recurrent matrix $\\mathbf{W}_{hh}$ over and over again—a staggering 100 consecutive times! Just like repeatedly multiplying numbers by $0.8$ rapidly shrinks them to zero ($0.8^{50} \\approx 10^{-5}$), the gradients of early words vanish into numerical silence, rendering vanilla RNNs incapable of remembering distant history.\n\n> **Frontier Analogy:** Imagine whispering a secret through a line of 100 people (a game of telephone). Each person adds a tiny bit of mumbling and attenuation ($\\mathbf{W}_{hh} \\cdot \\tanh'$). By person 20, the original message has dissolved into complete unintelligible silence; by person 50, it is gone forever.",
          "ar": "لا يمكن فهم الجملة بالنظر إلى كلماتها بمعزل عن سياقها؛ فمعنى الكلمة الأخيرة يتوقف على ما سبقها. تعمل الشبكات العصبية التكرارية (RNNs) عبر الاحتفاظ بـ 'دفتر مذكرات داخلي' متجدد يُعرف بالحالة الخفية h_t. مع قراءة كل رمز جديد x_t، تُدمج المعلومات الواردة مع خلاصة الماضي h_{t-1} لإنتاج الحالة الجديدة. ولتدريب هذه الشبكة، نقوم بـ 'بسط السلسلة عبر الزمن' (BPTT) لتحويل التكرار إلى رسم بياني متصل تُشتق عبره التدرجات العكسية عبر كافة اللحظات الزمنية السابقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{a}_t = \\mathbf{x}_t \\mathbf{W}_{xh} + \\mathbf{h}_{t-1} \\mathbf{W}_{hh} + \\mathbf{b}_h",
        "formulaNote": {
          "en": "Hidden state recurrence equation and product of Jacobians across T time steps.",
          "ar": "معادلة الحالة الخفية التكرارية وحاصل ضرب مصفوفات جاكوبي عبر T خطوة زمنية."
        },
        "narrative": {
          "en": "$$\n\\mathbf{h}_t = \\tanh(\\mathbf{a}_t)\n$$\n\n$$\n\\hat{\\mathbf{y}}_t = \\text{softmax}(\\mathbf{h}_t \\mathbf{W}_{hy} + \\mathbf{b}_y)\n$$\n\nLet the total loss across the sequence be $\\mathcal{L} = \\sum_{t=1}^T \\mathcal{L}_t$. To compute the gradient of loss at time step $T$ with respect to the initial hidden state $\\mathbf{h}_0$, we apply the chain rule backward through time:\n\n$$\n\\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_0} = \\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_T} \\frac{\\partial \\mathbf{h}_T}{\\partial \\mathbf{h}_0} = \\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_T} \\prod_{t=1}^T \\frac{\\partial \\mathbf{h}_t}{\\partial \\mathbf{h}_{t-1}}\n$$\n\nThe single-step temporal Jacobian matrix $\\frac{\\partial \\mathbf{h}_t}{\\partial \\mathbf{h}_{t-1}}$ evaluates to:\n\n$$\n\\frac{\\partial \\mathbf{h}_t}{\\partial \\mathbf{h}_{t-1}} = \\text{diag}\\left(1 - \\mathbf{h}_t^2\\right) \\mathbf{W}_{hh}^T\n$$\n\nSubstituting this yields the complete temporal gradient product:\n\n$$\n\\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_0} = \\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_T} \\prod_{t=1}^T \\left[ \\text{diag}\\left(1 - \\tanh^2(\\mathbf{a}_t)\\right) \\mathbf{W}_{hh}^T \\right]\n$$\n\n* $\\mathbf{x}_t \\in \\mathbb{R}^{B \\times d_{\\text{in}}}$: Input token embedding at step $t$.\n* $\\mathbf{h}_t \\in \\mathbb{R}^{B \\times d_h}$: Recurrent hidden state vector at step $t$.\n* $\\mathbf{W}_{xh} \\in \\mathbb{R}^{d_{\\text{in}} \\times d_h}$, $\\mathbf{W}_{hh} \\in \\mathbb{R}^{d_h \\times d_h}$: Input-to-hidden and hidden-to-hidden weight matrices.\n* $\\mathbf{b}_h \\in \\mathbb{R}^{d_h}$: Hidden bias vector.\n* $\\mathbf{W}_{hy} \\in \\mathbb{R}^{d_h \\times d_{\\text{out}}}$: Hidden-to-output classification projection matrix.\n* **The Vanishing Condition:** Note that the derivative of hyperbolic tangent satisfies $0 < 1 - \\tanh^2(z) \\le 1$. If the largest singular value (spectral radius) of $\\mathbf{W}_{hh}$ is $\\sigma_{\\max} < 1$, the norm of the gradient shrinks exponentially as $\\mathcal{O}(\\sigma_{\\max}^T) \\to 0$.\n* **The Exploding Condition:** Conversely, if $\\sigma_{\\max} > 1$, the gradient product explodes exponentially towards $\\pm \\infty$, triggering numerical overflow (`NaN` crashes) unless gradient clipping is enforced.\n\n---\n\nImplement `rnn_forward_sequence(X, h_0, W_xh, W_hh, b_h)` to sequentially unroll a vanilla RNN over sequence length $T$. At each step $t$, compute:\n$$\\mathbf{h}_t = \\tanh(\\mathbf{X}[t] \\mathbf{W}_{xh} + \\mathbf{h}_{t-1} \\mathbf{W}_{hh} + \\mathbf{b}_h)$$\nReturn the stacked history of all hidden states $\\mathbf{H} \\in \\mathbb{R}^{T \\times d_h}$ and the final state $\\mathbf{h}_T$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتكشف هذه المعادلة التحليلية سبب عجز شبكات RNN الكلاسيكية عن التعلم طويل المدى: تتابع ضرب مصفوفة الذاكرة التكرارية $\\mathbf{W}_{hh}$ بمشتقة دالة $\\tanh$ عبر عشرات الخطوات الزمنية يؤدي حتماً إلى اضمحلال التدرج نحو الصفر إذا كانت القيم الذاتية أقل من واحد، أو انفجاره نحو اللانهاية إذا تجاوزت الواحد.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-recurrent-neural-networks-bptt",
          "starterCode": "def rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, \n                         W_xh: np.ndarray, W_hh: np.ndarray, \n                         b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Unroll vanilla RNN across sequence length T: \n    h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (T, d_in)\n        Input sequence over T time steps.\n    h_0 : np.ndarray of shape (d_h,)\n        Initial hidden state vector.\n    W_xh : np.ndarray of shape (d_in, d_h)\n    W_hh : np.ndarray of shape (d_h, d_h)\n    b_h : np.ndarray of shape (d_h,)\n    \n    Returns\n    -------\n    tuple of (H, h_final)\n        H : np.ndarray of shape (T, d_h) containing all hidden states.\n        h_final : np.ndarray of shape (d_h,) the last hidden state h_T.\n    \"\"\"\n    # Step 1: Initialize dimensions and storage for hidden trajectory\n    # Step 2: Sequentially update hidden state across time steps\n    # Linear combination of current input and previous recurrent hidden state\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X = np.zeros((3, 2)); h0 = np.zeros(2); W_xh = np.zeros((2, 2)); W_hh = np.zeros((2, 2)); b_h = np.zeros(2); H, h_fin = rnn_forward_sequence(X, h0, W_xh, W_hh, b_h); str(round(float(np.sum(H)), 2))",
              "expected": "0.0"
            },
            {
              "input": "X = np.ones((1, 1)); h0 = np.zeros(1); W_xh = np.array([[0.0]]); W_hh = np.array([[0.0]]); b_h = np.array([0.0]); _, h_fin = rnn_forward_sequence(X, h0, W_xh, W_hh, b_h); str(round(float(h_fin[0]), 2))",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "def rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, \n                         W_xh: np.ndarray, W_hh: np.ndarray, \n                         b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Unroll vanilla RNN across sequence length T: \n    h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (T, d_in)\n        Input sequence over T time steps.\n    h_0 : np.ndarray of shape (d_h,)\n        Initial hidden state vector.\n    W_xh : np.ndarray of shape (d_in, d_h)\n    W_hh : np.ndarray of shape (d_h, d_h)\n    b_h : np.ndarray of shape (d_h,)\n    \n    Returns\n    -------\n    tuple of (H, h_final)\n        H : np.ndarray of shape (T, d_h) containing all hidden states.\n        h_final : np.ndarray of shape (d_h,) the last hidden state h_T.\n    \"\"\"\n    # Step 1: Initialize dimensions and storage for hidden trajectory\n    # Step 2: Sequentially update hidden state across time steps\n    # Linear combination of current input and previous recurrent hidden state\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, \n                         W_xh: np.ndarray, W_hh: np.ndarray, \n                         b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Unroll vanilla RNN across sequence length T: \n    h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (T, d_in)\n        Input sequence over T time steps.\n    h_0 : np.ndarray of shape (d_h,)\n        Initial hidden state vector.\n    W_xh : np.ndarray of shape (d_in, d_h)\n    W_hh : np.ndarray of shape (d_h, d_h)\n    b_h : np.ndarray of shape (d_h,)\n    \n    Returns\n    -------\n    tuple of (H, h_final)\n        H : np.ndarray of shape (T, d_h) containing all hidden states.\n        h_final : np.ndarray of shape (d_h,) the last hidden state h_T.\n    \"\"\"\n    # Step 1: Initialize dimensions and storage for hidden trajectory\n    T, d_in = X.shape\n    d_h = h_0.shape[0]\n    H = np.zeros((T, d_h), dtype=X.dtype)\n    \n    # Step 2: Sequentially update hidden state across time steps\n    h_current = h_0\n    for t in range(T):\n        # Linear combination of current input and previous recurrent hidden state\n        pre_act = X[t] @ W_xh + h_current @ W_hh + b_h\n        h_current = np.tanh(pre_act)\n        H[t] = h_current\n        \n    # Step 3: Return complete sequence of states and the final hidden state\n    return H, h_current"
        },
        "hints": {
          "tier1": {
            "en": "Initialize an array H of shape (T, hidden_dim) to store hidden states.",
            "ar": "أنشئ مصفوفة H بأبعاد (T, hidden_dim) لتخزين كافة الحالات الخفية."
          },
          "tier2": {
            "en": "At step t, compute linear terms x_t @ W_xh + h @ W_hh + b_h.",
            "ar": "عند اللحظة t، احسب الحدود الخطية x_t @ W_xh + h @ W_hh + b_h."
          },
          "tier3": {
            "en": "Apply np.tanh to the linear sum and store it in H[t], then return H, h.",
            "ar": "طبق دالة np.tanh على المجموع واحفظ الناتج في H[t] ثم أعد الزوج H, h."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why do vanilla Recurrent Neural Networks (RNNs) fundamentally struggle to model long-range dependencies in texts or time-series exceeding 50 time steps?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الشبكات العصبية التكرارية (RNNs) والانحدار العكسي عبر الزمن تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The temporal Jacobian $\\frac{\\partial \\mathbf{h}_t}{\\partial \\mathbf{h}_{t-1}}$ repeatedly multiplies the same recurrent weight matrix $\\mathbf{W}_{hh}^T$ and derivative term $(1 - \\mathbf{h}_t^2)$ over $T$ steps, causing backpropagated gradients to either vanish to absolute zero or explode exponentially.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "RNNs cannot process sequences longer than 4 tokens due to hardware memory register constraints on modern GPUs.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Vanilla RNNs can only process numerical audio waves and are mathematically incapable of representing discrete words.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Backpropagation through time violates the second law of thermodynamics by moving backwards in time.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "lstm-gru-gated-recurrent",
    "title": "Gated Recurrent Architectures (LSTM & GRU) & Long-Term Memory",
    "titleAr": "المعماريات التكرارية ذات البوابات (LSTM و GRU) والذاكرة طويلة المدى",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In a standard Recurrent Neural Network, every new incoming token violently overwrites the hidden state.",
      "ar": "تعاني شبكات RNN التقليدية من محو ذاكرتها السابقة عند كل خطوة جديدة. جاءت شبكات الذاكرة طويلة المدى قصيرة المدى (LSTM) لتبتكر 'حزام ناقل'..."
    },
    "prerequisites": [
      "recurrent-neural-networks-bptt"
    ],
    "x": 1115,
    "y": 1600,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "In a standard Recurrent Neural Network, every new incoming token violently overwrites the hidden state. Imagine trying to keep track of a complex story while a mischievous toddler continuously rubs an eraser over your notepad every single second! By the time you read paragraph ten, every detail from paragraph one has been smeared into illegible gray chalk.\n\nIn 1997, Sepp Hochreiter and Jürgen Schmidhuber devised an ingenious mechanical solution that dominated natural language processing for two decades: the **Long Short-Term Memory (LSTM)** network.\n\nThe central breakthrough of the LSTM is separating short-term operational chatter from persistent long-term storage. Instead of forcing a single vector to do everything, the LSTM installs an express **conveyor belt**: the **Cell State ($\\mathbf{C}_t$)**. This conveyor belt glides straight through time from left to right. Information placed onto the belt can ride along it for hundreds or thousands of steps completely undisturbed!\n\nStationed along this conveyor belt are three intelligent robotic valves—the **gates**—each controlled by a sigmoid function $\\sigma \\in [0, 1]$ that acts as an analog dial (where 0 means completely closed and 1 means wide open):\n1. **The Forget Gate ($\\mathbf{f}_t$):** Inspects the previous hidden state and new input to decide what stale information to discard from the conveyor belt (multiplying obsolete facts by 0).\n2. **The Input Gate ($\\mathbf{i}_t$):** Decides which new facts are important enough to be welded onto the conveyor belt (multiplying candidate memory $\\tilde{\\mathbf{C}}_t$ by $\\mathbf{i}_t$).\n3. **The Output Gate ($\\mathbf{o}_t$):** Filters the conveyor belt's contents, deciding which insights to reveal to the outside world as the current hidden state $\\mathbf{h}_t$.\n\nCrucially, because updates to the conveyor belt are **purely additive** ($\\mathbf{C}_t = \\mathbf{f}_t \\odot \\mathbf{C}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{C}}_t$), error gradients flowing backward along the belt encounter no continuous matrix multiplications. They travel back in time along an open superhighway!\n\n> **Frontier Analogy:** Imagine an archivist maintaining the constitutional archives of a nation. The archivist doesn't rewrite the entire constitution every morning (vanilla RNN). Instead, when a new law is passed, they consult the policy manual to repeal outdated clauses (forget gate), append the new amendment (input gate), and print a daily press summary for the citizens (output gate).",
          "ar": "تعاني شبكات RNN التقليدية من محو ذاكرتها السابقة عند كل خطوة جديدة. جاءت شبكات الذاكرة طويلة المدى قصيرة المدى (LSTM) لتبتكر 'حزام ناقل' مستمر يُدعى حالة الخلية C_t. يتدفق هذا الحزام عبر الزمن دون تعديل إلا عبر ثلاث بوابات ذكية:\n1. بوابة النسيان (f_t): تحدد ما يجب محوه وإسقاطه من الذاكرة القديمة.\n2. بوابة الإدخال (i_t): تقرر أي معلومات جديدة تستحق الإضافة للحزام.\n3. بوابة الإخراج (o_t): تحدد ما يجب إظهاره كحالة خفية لحظية.\nوبما أن التحديث على حالة الخلية هو تحديث جمعي خطي، فإن تدرجات التعلم تسافر إلى الوراء عبر الحزام دون أن تتلاشى."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{f}_t = \\sigma(\\mathbf{x}_t \\mathbf{W}_f + \\mathbf{h}_{t-1} \\mathbf{U}_f + \\mathbf{b}_f) \\quad \\text{[Forget Gate]}",
        "formulaNote": {
          "en": "Additive cell state conveyor belt update and gated hidden state emission.",
          "ar": "تحديث حالة الخلية الجمعي عبر الحزام الناقل وانبعاث الحالة الخفية المقيدة بالبوابات."
        },
        "narrative": {
          "en": "$$\n\\mathbf{i}_t = \\sigma(\\mathbf{x}_t \\mathbf{W}_i + \\mathbf{h}_{t-1} \\mathbf{U}_i + \\mathbf{b}_i) \\quad \\text{[Input Gate]}\n$$\n\n$$\n\\tilde{\\mathbf{C}}_t = \\tanh(\\mathbf{x}_t \\mathbf{W}_c + \\mathbf{h}_{t-1} \\mathbf{U}_c + \\mathbf{b}_c) \\quad \\text{[Candidate Cell State]}\n$$\n\n$$\n\\mathbf{C}_t = \\mathbf{f}_t \\odot \\mathbf{C}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{C}}_t \\quad \\text{[Cell State Update]}\n$$\n\n$$\n\\mathbf{o}_t = \\sigma(\\mathbf{x}_t \\mathbf{W}_o + \\mathbf{h}_{t-1} \\mathbf{U}_o + \\mathbf{b}_o) \\quad \\text{[Output Gate]}\n$$\n\n$$\n\\mathbf{h}_t = \\mathbf{o}_t \\odot \\tanh(\\mathbf{C}_t) \\quad \\text{[Hidden State Output]}\n$$\n\n### The Constant Error Carousel (CEC):\nThe mathematical foundation that immunizes LSTMs against vanishing gradients is the partial derivative of the current cell state with respect to the prior cell state:\n\n$$\n\\frac{\\partial \\mathbf{C}_t}{\\partial \\mathbf{C}_{t-1}} = \\mathbf{f}_t\n$$\n\nWhen backpropagating over a span of $k$ time steps, the chain rule along the cell state carousel evaluates to:\n\n$$\n\\frac{\\partial \\mathbf{C}_t}{\\partial \\mathbf{C}_{t-k}} = \\prod_{j=0}^{k-1} \\mathbf{f}_{t-j}\n$$\n\n* $\\mathbf{x}_t \\in \\mathbb{R}^{B \\times d}$: Input feature vector at time step $t$.\n* $\\mathbf{h}_t \\in \\mathbb{R}^{B \\times h}$: Emitted hidden state vector.\n* $\\mathbf{C}_t \\in \\mathbb{R}^{B \\times h}$: Internal persistent cell state vector.\n* $\\mathbf{W}_f, \\mathbf{W}_i, \\mathbf{W}_c, \\mathbf{W}_o \\in \\mathbb{R}^{d \\times h}$: Input projection weight matrices.\n* $\\mathbf{U}_f, \\mathbf{U}_i, \\mathbf{U}_c, \\mathbf{U}_o \\in \\mathbb{R}^{h \\times h}$: Recurrent state projection matrices.\n* $\\mathbf{b}_f, \\mathbf{b}_i, \\mathbf{b}_c, \\mathbf{b}_o \\in \\mathbb{R}^h$: Bias vectors.\n* $\\sigma(z) = \\frac{1}{1 + e^{-z}}$: Logistic sigmoid activation bounding gate values in $[0, 1]$.\n* $\\odot$: Element-wise Hadamard product.\n* **The Forget Gate Bias Trick:** By initializing the forget gate bias $\\mathbf{b}_f$ to large positive values (e.g. $+1.0$ or $+2.0$), $\\mathbf{f}_t \\approx 1$ at the start of training, ensuring the Constant Error Carousel keeps gradients flowing across hundreds of steps from step 1!\n\n---\n\nImplement `lstm_cell_forward(...)` computing a single time-step forward pass of an LSTM cell. The function receives the current input $\\mathbf{x}_t$, previous states $\\mathbf{h}_{\\text{prev}}$ and $\\mathbf{C}_{\\text{prev}}$, and weight matrices/biases for all four transformations ($f, i, c, o$).",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتوضح هذه الصياغة الرياضية سر مناعة شبكات LSTM ضد تلاشي التدرجات: فالمشتقة الجزئية لحالة الخلية $\\frac{\\partial \\mathbf{C}_t}{\\partial \\mathbf{C}_{t-1}}$ تساوي مباشرة متجه بوابة النسيان $\\mathbf{f}_t$. فعندما تفتح الشبكة هذه البوابة ($\\mathbf{f} \\approx 1$)، تسافر إشارة التدرج العكسي بقوة ثابتة عبر مئات الخطوات الزمنية، محققة ما يُعرف بـ **ممر الخطأ الثابت (Constant Error Carousel)**.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-lstm-gru-gated-recurrent",
          "starterCode": "import numpy as np\n\ndef sigmoid(z: np.ndarray) -> np.ndarray:\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n\ndef lstm_cell_forward(x_t: np.ndarray, h_prev: np.ndarray, c_prev: np.ndarray,\n                      W_f: np.ndarray, U_f: np.ndarray, b_f: np.ndarray,\n                      W_i: np.ndarray, U_i: np.ndarray, b_i: np.ndarray,\n                      W_c: np.ndarray, U_c: np.ndarray, b_c: np.ndarray,\n                      W_o: np.ndarray, U_o: np.ndarray, b_o: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single time step forward pass of an LSTM cell.\n    \n    Returns\n    -------\n    tuple of (h_next, c_next)\n    \"\"\"\n    # Step 1: Compute forget gate f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n    f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n\n    # Step 2: Compute input gate i_t and candidate cell state c_tilde\n    i_t = sigmoid(x_t @ W_i + h_prev @ U_i + b_i)\n    c_tilde = np.tanh(x_t @ W_c + h_prev @ U_c + b_c)\n\n    # Step 3: Update cell state: c_next = f_t * c_prev + i_t * c_tilde\n    c_next = f_t * c_prev + i_t * c_tilde\n\n    # Step 4: Compute output gate o_t and emitted hidden state h_next = o_t * tanh(c_next)\n    o_t = sigmoid(x_t @ W_o + h_prev @ U_o + b_o)\n    h_next = o_t * np.tanh(c_next)\n\n    return h_next, c_next",
          "testCases": [
            {
              "input": "x = np.zeros(2); h = np.zeros(2); c = np.zeros(2); W = np.zeros((2, 2)); U = np.zeros((2, 2)); b = np.zeros(2); h_n, c_n = lstm_cell_forward(x, h, c, W, U, b, W, U, b, W, U, b, W, U, b); str(round(float(np.sum(h_n)), 2))",
              "expected": "0.0"
            },
            {
              "input": "x = np.zeros(1); h = np.zeros(1); c = np.array([5.0]); W = np.zeros((1, 1)); U = np.zeros((1, 1)); b_f = np.array([30.0]); b_0 = np.array([-30.0]); h_n, c_n = lstm_cell_forward(x, h, c, W, U, b_f, W, U, b_0, W, U, b_0, W, U, b_0); str(round(float(c_n[0]), 1))",
              "expected": "5.0"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef sigmoid(z: np.ndarray) -> np.ndarray:\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n\ndef lstm_cell_forward(x_t: np.ndarray, h_prev: np.ndarray, c_prev: np.ndarray,\n                      W_f: np.ndarray, U_f: np.ndarray, b_f: np.ndarray,\n                      W_i: np.ndarray, U_i: np.ndarray, b_i: np.ndarray,\n                      W_c: np.ndarray, U_c: np.ndarray, b_c: np.ndarray,\n                      W_o: np.ndarray, U_o: np.ndarray, b_o: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single time step forward pass of an LSTM cell.\n    \n    Returns\n    -------\n    tuple of (h_next, c_next)\n    \"\"\"\n    # Step 1: Compute forget gate f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n    f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n\n    # Step 2: Compute input gate i_t and candidate cell state c_tilde\n    i_t = sigmoid(x_t @ W_i + h_prev @ U_i + b_i)\n    c_tilde = np.tanh(x_t @ W_c + h_prev @ U_c + b_c)\n\n    # Step 3: Update cell state: c_next = f_t * c_prev + i_t * c_tilde\n    c_next = f_t * c_prev + i_t * c_tilde\n\n    # Step 4: Compute output gate o_t and emitted hidden state h_next = o_t * tanh(c_next)\n    o_t = sigmoid(x_t @ W_o + h_prev @ U_o + b_o)\n    h_next = o_t * np.tanh(c_next)\n\n    return h_next, c_next",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef sigmoid(z: np.ndarray) -> np.ndarray:\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n\ndef lstm_cell_forward(x_t: np.ndarray, h_prev: np.ndarray, c_prev: np.ndarray,\n                      W_f: np.ndarray, U_f: np.ndarray, b_f: np.ndarray,\n                      W_i: np.ndarray, U_i: np.ndarray, b_i: np.ndarray,\n                      W_c: np.ndarray, U_c: np.ndarray, b_c: np.ndarray,\n                      W_o: np.ndarray, U_o: np.ndarray, b_o: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n    i_t = sigmoid(x_t @ W_i + h_prev @ U_i + b_i)\n    c_tilde = np.tanh(x_t @ W_c + h_prev @ U_c + b_c)\n    c_next = f_t * c_prev + i_t * c_tilde\n    o_t = sigmoid(x_t @ W_o + h_prev @ U_o + b_o)\n    h_next = o_t * np.tanh(c_next)\n    return h_next, c_next"
        },
        "hints": {
          "tier1": {
            "en": "Compute gates f_t, i_t, and o_t using the sigmoid function.",
            "ar": "احسب البوابات f_t و i_t و o_t باستخدام دالة السيجمويد."
          },
          "tier2": {
            "en": "The candidate cell state uses tanh: c_tilde = np.tanh(x_t @ W_c + h_prev @ U_c + b_c).",
            "ar": "تستخدم الحالة المرشحة دالة الظل الزائدي: c_tilde = np.tanh(x_t @ W_c + h_prev @ U_c + b_c)."
          },
          "tier3": {
            "en": "Update c_next = f_t * c_prev + i_t * c_tilde and return h_next, c_next.",
            "ar": "حدث c_next = f_t * c_prev + i_t * c_tilde وأعد الزوج h_next, c_next."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What specific mathematical property in the LSTM architecture prevents the exponential gradient decay that paralyzes vanilla RNNs?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المعماريات التكرارية ذات البوابات (LSTM و GRU) والذاكرة طويلة المدى تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The additive formulation of the cell state update $\\mathbf{C}_t = \\mathbf{f}_t \\odot \\mathbf{C}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{C}}_t$ yields a direct gradient pathway $\\frac{\\partial \\mathbf{C}_t}{\\partial \\mathbf{C}_{t-1}} = \\mathbf{f}_t$ that avoids repeated matrix multiplications by weights.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The use of the hyperbolic tangent function prevents gradients from exceeding positive one.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "LSTMs execute an internal Adam optimizer step during the forward pass to normalize hidden activations.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "LSTMs restrict the sequence length to powers of two to avoid remainder divisions in CUDA cores.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "bpe-tokenization",
    "title": "Byte Pair Encoding (BPE) Subword Tokenization",
    "titleAr": "ترميز أزواج البايت (BPE) وتقطيع الكلمات الفرعية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Before a modern neural network can process a single sentence, it faces a profound question: how should human text be broken down into...",
      "ar": "كيف يقرأ الذكاء الاصطناعي النصوص؟ إذا عامل كل كلمة كوحدة كاملة، سيتضخم القاموس لملايين الكلمات وسيعجز أمام الكلمات النادرة والاشتقاقات..."
    },
    "prerequisites": [
      "cs-08"
    ],
    "x": 1130,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "BpeTokenizerLab",
        "narrative": {
          "en": "Before a modern neural network can process a single sentence, it faces a profound question: **how should human text be broken down into discrete computational units?**\n\nIf you choose **word-level tokenization**, every unique word in human history needs its own assigned ID number. An English vocabulary quickly balloons past 500,000 words. Even worse, the moment a user types a minor typo (like \"applle\"), a rare medical term, or an invented slang word, the model is completely blind to it. It has to substitute the dreaded **`<UNK>` (Unknown Token)**, permanently destroying the sentence's meaning!\n\nConversely, if you choose **character-level tokenization**, your vocabulary shrinks to just ~100 characters. But now, a simple 1,000-word essay stretches across 6,000 individual character tokens. Because Transformer self-attention scales quadratically ($\\mathcal{O}(N^2)$) with sequence length, character-level modeling imposes a devastating computational and memory penalty that cripples long-context processing.\n\nIn 2016, Rico Sennrich, Barry Haddow, and Alexandra Birch adapted an old data compression algorithm from 1994 called **Byte Pair Encoding (BPE)** to create the gold standard of modern LLM tokenization: **subword modeling**.\n\nBPE is an elegant, frequency-driven compression algorithm:\n1. It begins with an atomic vocabulary containing only individual base characters (or raw bytes).\n2. It scans the entire training corpus and identifies the single most frequently adjacent pair of symbols (for example, the letter `'t'` followed by `'h'`).\n3. It merges that pair into a brand-new atomic token: `'th'`.\n4. It repeats this greedy merging process for thousands of iterations.\n\nFrequent words like `\"the\"`, `\"cat\"`, and `\"learning\"` merge all the way into single, efficient tokens. Meanwhile, rare or unseen words naturally decompose into clean, recognizable grammatical subwords—such as `\"un\"` + `\"friend\"` + `\"ly\"`—eliminating the `<UNK>` token forever!\n\n> **Frontier Analogy:** Think of building structures with LEGO blocks. Word-level tokenization is like demanding a custom-molded plastic piece for every imaginable spaceship and castle. Character-level tokenization is using microscopic dust particles. Subword BPE is the true LEGO system: a standard set of versatile bricks (subwords) that snap together to build anything, with pre-assembled components for things you build every day.",
          "ar": "كيف يقرأ الذكاء الاصطناعي النصوص؟ إذا عامل كل كلمة كوحدة كاملة، سيتضخم القاموس لملايين الكلمات وسيعجز أمام الكلمات النادرة والاشتقاقات الصرفية. وإذا قرأ بالحروف المنفردة، ستصبح السلسلة فائقة الطول وصعبة المعالجة. يمثل 'ترميز أزواج البايت' (BPE) التوازن العبقري: نبدأ بتقسيم النص إلى أحرف أولية، ثم نبحث بتكرار عن أكثر زوج من الرموز المتجاورة شيوعاً (مثل 'ت' و 'ع') وندمجهما في رمز واحد جديد 'تع'. بتكرار هذا الدمج آلاف المرات، تتحول الكلمات الشائعة لرموز فردية، بينما تُحلل الكلمات المعقدة إلى جذور ولواحق فرعية قابلة للفهم دون أي رمز مجهول <UNK>."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(u^*, v^*) = \\arg\\max_{(u, v)} \\sum_{(w, f) \\in \\mathcal{D}} f \\cdot \\text{count}\\big((u, v) \\in w\\big)",
        "formulaNote": {
          "en": "Greedy frequency-based pair extraction and vocabulary expansion in Byte Pair Encoding.",
          "ar": "استخراج أزواج الرموز الأكثر تكراراً وتوسيع المعجم في خوارزمية BPE."
        },
        "narrative": {
          "en": "The vocabulary is then augmented with the concatenated symbol:\n\n$$\n\\mathcal{V}_{k+1} = \\mathcal{V}_k \\cup \\{ u^* v^* \\}\n$$\n\nAll instances of the adjacent tuple elements $(u^*, v^*)$ in the corpus words are rewritten as the unified token $u^* v^*$.\n\n### Byte-Level BPE (BBPE) in Frontier LLMs:\nIn modern foundation models (GPT-4, LLaMA 3, Gemma), BPE is executed directly on **UTF-8 raw bytes** rather than Unicode characters:\n* The initial base vocabulary size is strictly fixed at $|\\mathcal{V}_0| = 256$ (the 256 possible values of an 8-bit byte $[0x00, 0xFF]$).\n* Because every string in every human language, programming language, emoji, and binary file is fundamentally a sequence of bytes, **a byte-level BPE vocabulary can represent literally any arbitrary input without ever emitting an out-of-vocabulary error!**\n\n* $\\mathcal{D}$: Frequency dictionary mapping word character tuples to their corpus occurrence counts.\n* $(u, v)$: Candidate adjacent symbol pair (bigram).\n* $\\mathcal{V}_k$: Active vocabulary set at merge step $k$.\n* $K_{\\text{merges}}$: Target number of merge operations (e.g. 32,000 for LLaMA 1, or 128,000 for LLaMA 3).\n* $|\\mathcal{V}_{\\text{final}}| = |\\mathcal{V}_0| + K_{\\text{merges}}$: Final vocabulary capacity.\n\n---\n\nImplement `get_pair_stats(vocab)` to count the total occurrences of all adjacent symbol pairs across a segmented vocabulary dictionary. In `vocab`, keys are tuples of symbols (e.g. `('l', 'o', 'w')`) and values are their integer frequency counts in the dataset.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتعتمد نماذج الذكاء الاصطناعي التوليدية الحديثة على ترميز BPE على مستوى البايت (Byte-Level BPE)، حيث يبدأ المعجم بـ 256 بايت أساسية فقط تمثل كافة قيم بايتات الترميز العالمي UTF-8. هذا يضمن أن النموذج قادر رياضياً على تمثيل وقراءة أي نص بأي لغة في العالم، أو أي كود برمجي أو رمز تعبيري دون مواجهة أي رمز مجهول إطلاقاً.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bpe-tokenization",
          "starterCode": "from collections import defaultdict\n\ndef get_pair_stats(vocab: dict[tuple[str, ...], int]) -> dict[tuple[str, str], int]:\n    \"\"\"\n    Count the frequency of all adjacent symbol pairs in the segmented vocabulary.\n    \n    Parameters\n    ----------\n    vocab : dict of {tuple of symbols: count}\n        e.g. {('l', 'o', 'w'): 5, ('l', 'o', 'w', 'e', 'r'): 2}\n        \n    Returns\n    -------\n    dict of {(symbol_1, symbol_2): total_frequency}\n    \"\"\"\n    # Step 1: Initialize pairs frequency dictionary\n    pairs = defaultdict(int)\n\n    # Step 2: Iterate over word tuples and accumulate adjacent pair frequencies\n    for word_tuple, freq in vocab.items():\n        for i in range(len(word_tuple) - 1):\n            pair = (word_tuple[i], word_tuple[i + 1])\n            pairs[pair] += freq\n\n    # Step 3: Return standard dictionary mapping pairs to frequencies\n    return dict(pairs)",
          "testCases": [
            {
              "input": "v = {('a', 'b', 'c'): 3, ('a', 'b'): 2}; stats = get_pair_stats(v); str(stats[('a', 'b')])",
              "expected": "5"
            },
            {
              "input": "v = {('k', 'a', 't'): 1}; stats = get_pair_stats(v); str(stats[('a', 't')])",
              "expected": "1"
            }
          ],
          "expectedOutput": "5",
          "variants": {
            "python": {
              "starterCode": "from collections import defaultdict\n\ndef get_pair_stats(vocab: dict[tuple[str, ...], int]) -> dict[tuple[str, str], int]:\n    \"\"\"\n    Count the frequency of all adjacent symbol pairs in the segmented vocabulary.\n    \n    Parameters\n    ----------\n    vocab : dict of {tuple of symbols: count}\n        e.g. {('l', 'o', 'w'): 5, ('l', 'o', 'w', 'e', 'r'): 2}\n        \n    Returns\n    -------\n    dict of {(symbol_1, symbol_2): total_frequency}\n    \"\"\"\n    # Step 1: Initialize pairs frequency dictionary\n    pairs = defaultdict(int)\n\n    # Step 2: Iterate over word tuples and accumulate adjacent pair frequencies\n    for word_tuple, freq in vocab.items():\n        for i in range(len(word_tuple) - 1):\n            pair = (word_tuple[i], word_tuple[i + 1])\n            pairs[pair] += freq\n\n    # Step 3: Return standard dictionary mapping pairs to frequencies\n    return dict(pairs)",
              "expectedOutput": "5"
            }
          },
          "solution": "from collections import defaultdict\n\ndef get_pair_stats(vocab: dict[tuple[str, ...], int]) -> dict[tuple[str, str], int]:\n    pairs = defaultdict(int)\n    for word, freq in vocab.items():\n        for i in range(len(word) - 1):\n            pair = (word[i], word[i + 1])\n            pairs[pair] += freq\n    return dict(pairs)"
        },
        "hints": {
          "tier1": {
            "en": "Iterate through each word tuple and inspect adjacent symbols (word[i], word[i+1]).",
            "ar": "مر عبر كل كلمة وتفحص الرموز المتجاورة (word[i], word[i+1])."
          },
          "tier2": {
            "en": "Accumulate pairs[pair] += freq where freq is the corpus frequency of that word.",
            "ar": "اجمع التكرار عبر pairs[pair] += freq حيث freq هو تكرار الكلمة في المعجم."
          },
          "tier3": {
            "en": "Convert defaultdict back to a standard dict before returning.",
            "ar": "حول قاموس defaultdict إلى قاموس عادي dict قبل إرجاعه."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why do virtually all modern frontier Large Language Models (such as GPT-4, LLaMA 3, and Claude) employ subword tokenization with Byte-Level BPE rather than word-level tokenization?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ ترميز أزواج البايت (BPE) وتقطيع الكلمات الفرعية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Byte-Level BPE completely eliminates Out-Of-Vocabulary (OOV) tokens by falling back to base UTF-8 bytes for rare words, while compressing frequent words and phrases into single tokens to minimize sequence length for quadratic attention.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "BPE forces all input vectors to be orthogonal in the latent embedding space.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Subword tokenization reduces the number of Transformer attention heads required by half.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Word-level tokenizers cannot be trained with stochastic gradient descent.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "vocabulary-engineering-special-tokens",
    "title": "Vocabulary Engineering, Special Tokens & Token Embeddings",
    "titleAr": "هندسة المعاجم والرموز الخاصة وتضمينات المتجهات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A Large Language Model does not understand human words, syllables, or characters. At its core, a Transformer is an ultra-high-dimensional...",
      "ar": "لا تعالج النماذج اللغوية الكلمات كنصوص حقيقية، بل تتعامل مع متجهات رقمية في فضاء متعدد الأبعاد."
    },
    "prerequisites": [
      "bpe-tokenization"
    ],
    "x": 1115,
    "y": 1790,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "BpeTokenizerLab",
        "narrative": {
          "en": "A Large Language Model does not understand human words, syllables, or characters. At its core, a Transformer is an ultra-high-dimensional geometric processor that performs linear algebra on continuous vectors in $\\mathbb{R}^{d_{\\text{model}}}$. Once a tokenizer chops text into discrete integer IDs—such as `[104, 3921, 88]`—how does the model translate those cold numbers into rich mathematical meaning?\n\nThe answer is the **Embedding Matrix ($\\mathbf{E}$)**: an enormous lookup catalog containing one row for every single token in the vocabulary. If your vocabulary size is $V = 128,000$ and your model dimension is $d = 4,096$, the embedding table contains 128,000 dense rows. When token ID `3921` arrives, the network simply extracts row `3921` from the table. Through months of pretraining, the model positions these vectors so that semantically similar concepts (like `\"king\"` and `\"queen\"`, or `\"Cairo\"` and `\"Egypt\"`) cluster tightly together in semantic space.\n\nBeyond regular language tokens, modern AI models require **Special Control Tokens**: invisible traffic directors embedded directly into the stream of thought:\n* **`[BOS]` / `<s>` (Beginning of Sequence):** Wakes up the model and resets attention state.\n* **`[EOS]` / `</s>` (End of Sequence):** The crucial stop signal; without this token, the model would hallucinate endless sentences until running out of context memory!\n* **Chat Delimiters (e.g. `<|im_start|>user`, `<|im_start|>assistant`):** Protect the model from prompt injections by establishing unbreakable structural boundaries between user queries and assistant responses.\n\nFinally, engineers face the strategic dilemma of **Vocabulary Engineering & Token Fertility**. A larger vocabulary (e.g. 128k or 256k tokens) compresses text into fewer total tokens, speeding up generation and fitting longer documents into context. However, a bloated vocabulary inflates the embedding and unembedding matrices by hundreds of millions of parameters. Even more critically, tokenizers trained mostly on English exhibit **high fertility rates** on non-Latin scripts: an English sentence might compress into 10 tokens, while the exact same Arabic or Hindi sentence fragments into 30 tokens! This forces Arabic users to pay $3\\times$ higher inference costs and grants them only one-third of the effective context window.\n\n> **Frontier Analogy:** Think of the embedding table as a universal currency exchange counter at an international airport. Travelers arrive holding discrete tickets from 128,000 different towns (token IDs). The teller immediately hands them a standardized gold currency pouch of 4,096 distinct gold coins (the continuous embedding vector) that can be spent anywhere in the city.",
          "ar": "لا تعالج النماذج اللغوية الكلمات كنصوص حقيقية، بل تتعامل مع متجهات رقمية في فضاء متعدد الأبعاد. بعد أن يقطع المحلل النص إلى أرقام معرفية (Token IDs)، تُستخدم 'مصفوفة التضمين' (Embedding Matrix) كقاموس فوري يستبدل كل رقم بمتجه مستمر. وإلى جانب الكلمات العادية، تُهندس المعاجم برموز تحكم خاصة مثل [BOS] للإعلان عن بداية السياق، و [EOS] لإيقاف التوليد التلقائي. وتعد هندسة حجم المعجم موازنة دقيقة بين ضغط السلاسل النصية وتقليص حجم المعاملات لضمان عدالة تمثيل اللغات المختلفة كالعربية والإنجليزية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{E} \\in \\mathbb{R}^{V \\times d_{\\text{model}}}",
        "formulaNote": {
          "en": "Token embedding matrix lookup and cross-lingual token fertility metric.",
          "ar": "مصفوفة تضمين الرموز ومقياس معدل خصوبة الرموز عبر اللغات المختلفة."
        },
        "narrative": {
          "en": "Given a discrete sequence of token IDs $\\mathbf{t} = (t_1, t_2, \\dots, t_T) \\in \\mathcal{V}^T$, the embedding operation retrieves the corresponding row via one-hot indexing or direct matrix slicing:\n\n$$\n\\mathbf{x}_i = \\mathbf{E}[t_i] \\in \\mathbb{R}^{d_{\\text{model}}}\n$$\n\n### Structural Framing with Special Tokens:\nA raw input token sequence $\\mathbf{t}_{\\text{raw}}$ is wrapped with control delimiters before entering the Transformer:\n\n$$\n\\mathbf{t}_{\\text{input}} = [t_{\\text{BOS}}] \\circ \\mathbf{t}_{\\text{raw}} \\circ [t_{\\text{EOS}}] \\in \\mathcal{V}^{T+2}\n$$\n\n### Token Fertility Metric:\nThe representational efficiency of a tokenizer on language $\\mathcal{L}$ across a corpus of $N$ words is quantified by its fertility rate:\n\n$$\n\\text{Fertility}(\\mathcal{L}) = \\frac{\\sum_{i=1}^N \\text{tokens}(w_i)}{N}\n$$\n\nA fertility near $1.0$ indicates that words are cleanly mapped to single tokens. A fertility of $3.0$ indicates heavy fragmentation into sub-character byte pieces.\n\n* $V$: Total vocabulary size (number of distinct token IDs in dictionary).\n* $d_{\\text{model}}$: Embedding vector dimension (e.g. 4,096 in LLaMA-3-8B).\n* $\\mathbf{E} \\in \\mathbb{R}^{V \\times d_{\\text{model}}}$: Token input embedding matrix.\n* $P_{\\text{vocab}} = 2 \\times V \\times d_{\\text{model}}$: Total parameter footprint allocated to embeddings and unembeddings (untied head).\n* For $V = 128,000$ and $d_{\\text{model}} = 4,096$:\n  $$P_{\\text{vocab}} = 2 \\times 128,000 \\times 4,096 = 1,048,576,000 \\approx 1.05 \\text{ Billion weights!}$$\n\n---\n\nImplement `embed_tokens_with_special(token_ids, embedding_matrix, bos_id, eos_id)` which prepends the `bos_id`, appends the `eos_id`, and performs vectorized row-lookup from `embedding_matrix` to return the complete sequence embeddings of shape $(T + 2, d_{\\text{model}})$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتوضح هذه الصياغة أن المعجم اللغوي ليس مجرد أداة مساعدة، بل يشكل بمفرده أكثر من مليار معامل في النماذج الحديثة. وتبرهن معادلة الخصوبة ($\\text{Fertility}$) الأثر الاقتصادي والتقني لانحياز المعاجم، مما حفز النماذج الرائدة مثل LLaMA 3 و Gemma على توسيع المعجم وتضمين ملايين النصوص العربية ومتعددة اللغات لخفض معدل الخصوبة وتحقيق الكفاءة المثلى.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-vocabulary-engineering-special-tokens",
          "starterCode": "def embed_tokens_with_special(token_ids: list[int], embedding_matrix: np.ndarray, \n                              bos_id: int, eos_id: int) -> np.ndarray:\n    \"\"\"\n    Prepend BOS, append EOS, and perform vectorized embedding table lookup.\n    \n    Parameters\n    ----------\n    token_ids : list of int\n        List of integer token identifiers.\n    embedding_matrix : np.ndarray of shape (V, d_model)\n        Continuous embedding table.\n    bos_id : int\n        Special token ID for Beginning-Of-Sequence.\n    eos_id : int\n        Special token ID for End-Of-Sequence.\n        \n    Returns\n    -------\n    np.ndarray of shape (len(token_ids) + 2, d_model)\n        Extracted token embedding vectors.\n    \"\"\"\n    # Step 1: Wrap sequence with special control tokens [BOS] + token_ids + [EOS]\n    # Step 2: Extract rows from embedding_matrix using vectorized numpy fancy indexing\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "E = np.eye(5); res = embed_tokens_with_special([2, 3], E, bos_id=0, eos_id=4); str(res.shape)",
              "expected": "(4, 5)"
            },
            {
              "input": "E = np.array([[10.0], [20.0], [30.0]]); res = embed_tokens_with_special([1], E, bos_id=0, eos_id=2); str(round(float(res[0, 0]), 2))",
              "expected": "10.0"
            }
          ],
          "expectedOutput": "(4, 5)",
          "variants": {
            "python": {
              "starterCode": "def embed_tokens_with_special(token_ids: list[int], embedding_matrix: np.ndarray, \n                              bos_id: int, eos_id: int) -> np.ndarray:\n    \"\"\"\n    Prepend BOS, append EOS, and perform vectorized embedding table lookup.\n    \n    Parameters\n    ----------\n    token_ids : list of int\n        List of integer token identifiers.\n    embedding_matrix : np.ndarray of shape (V, d_model)\n        Continuous embedding table.\n    bos_id : int\n        Special token ID for Beginning-Of-Sequence.\n    eos_id : int\n        Special token ID for End-Of-Sequence.\n        \n    Returns\n    -------\n    np.ndarray of shape (len(token_ids) + 2, d_model)\n        Extracted token embedding vectors.\n    \"\"\"\n    # Step 1: Wrap sequence with special control tokens [BOS] + token_ids + [EOS]\n    # Step 2: Extract rows from embedding_matrix using vectorized numpy fancy indexing\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "(4, 5)"
            }
          },
          "solution": "import numpy as np\n\ndef embed_tokens_with_special(token_ids: list[int], embedding_matrix: np.ndarray, \n                              bos_id: int, eos_id: int) -> np.ndarray:\n    \"\"\"\n    Prepend BOS, append EOS, and perform vectorized embedding table lookup.\n    \n    Parameters\n    ----------\n    token_ids : list of int\n        List of integer token identifiers.\n    embedding_matrix : np.ndarray of shape (V, d_model)\n        Continuous embedding table.\n    bos_id : int\n        Special token ID for Beginning-Of-Sequence.\n    eos_id : int\n        Special token ID for End-Of-Sequence.\n        \n    Returns\n    -------\n    np.ndarray of shape (len(token_ids) + 2, d_model)\n        Extracted token embedding vectors.\n    \"\"\"\n    # Step 1: Wrap sequence with special control tokens [BOS] + token_ids + [EOS]\n    full_sequence = [bos_id] + list(token_ids) + [eos_id]\n\n    # Step 2: Extract rows from embedding_matrix using vectorized numpy fancy indexing\n    embeddings = embedding_matrix[full_sequence]\n\n    return embeddings"
        },
        "hints": {
          "tier1": {
            "en": "Create a new list by concatenating [bos_id], token_ids, and [eos_id].",
            "ar": "أنشئ قائمة جديدة بدمج [bos_id] مع token_ids و [eos_id]."
          },
          "tier2": {
            "en": "Use NumPy fancy indexing: embedding_matrix[index_list] extracts corresponding rows.",
            "ar": "استخدم فهرسة نمباي المباشرة: embedding_matrix[index_list] لاستخراج الصفوف المقابلة."
          },
          "tier3": {
            "en": "Return embedding_matrix[full_sequence] directly.",
            "ar": "أعد embedding_matrix[full_sequence] مباشرة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does a high \"token fertility rate\" for non-Latin writing systems (such as Arabic or Japanese) create a severe economic and functional disadvantage when using foundation LLMs?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ هندسة المعاجم والرموز الخاصة وتضمينات المتجهات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Non-Latin sentences fragment into significantly more tokens per sentence, exhausting the model's finite context window three times faster and multiplying API inference latency and billing costs by $3\\times$.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "High token fertility causes the GPU to trigger floating-point underflow in the feedforward activation layers.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Models with high token fertility cannot output valid JSON or markdown syntax.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "High fertility forces the attention matrix to become strictly non-invertible.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "transformer-attention",
    "title": "Scaled Dot-Product Self-Attention & Query-Key Routing",
    "titleAr": "آلية الانتباه الذاتي بالضرب النقطي المقاس وتوجيه الاستعلام والمفاتيح",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are standing in the middle of a bustling banquet hall where fifty different conversations are happening at once.",
      "ar": "تخيل أنك في قاعة مزدحمة وتريد الاستماع لشخص معين؛ ستوجه تركيزك كـ 'مصباح تسليط ضوئي' (Spotlight) لوزن الكلمات ذات الصلة وتجاهل الضجيج."
    },
    "prerequisites": [
      "t1-05",
      "numerically-stable-softmax-cross-entropy"
    ],
    "x": 1130,
    "y": 1885,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "Imagine you are standing in the middle of a bustling banquet hall where fifty different conversations are happening at once. You don't try to listen to all fifty voices equally; if you did, your mind would drown in an incomprehensible cacophony. Instead, your brain casts a dynamic, focused **spotlight of attention**: you effortlessly dampen background chatter and amplify the single voice across the room that just mentioned your name!\n\nIn natural language processing, words face this exact same challenge. Consider the classic linguistic puzzle:\n> *\"The animal didn't cross the street because **it** was too tired.\"*\n\nWhat does the ambiguous pronoun **\"it\"** refer to? The animal, or the street? To understand this sentence, the word *\"it\"* must shine a spotlight across every other word in the sentence, calculate how strongly it relates to each one, and pull in the semantic meaning of *\"animal\"*. If the sentence instead said *\"because it was too wide\"*, the spotlight would immediately pivot to illuminate *\"street\"*.\n\nIn their seminal 2017 paper *\"Attention Is All You Need\"*, Ashish Vaswani and the Google Brain team discarded recurrence and convolutions entirely, replacing them with a purely linear-algebraic spotlight: **Scaled Dot-Product Self-Attention**.\n\nTo make this mathematically concrete, the Transformer borrows a metaphor from database retrieval and search engines, projecting every single token into three distinct functional roles:\n* **Query ($\\mathbf{Q}$):** *\"What am I looking for?\"* (The pronoun *\"it\"* broadcasts an inquiry: *\"Who here possesses physical properties like being tired or wide?\"*).\n* **Key ($\\mathbf{K}$):** *\"What is my identity and category?\"* (The word *\"animal\"* advertises: *\"I am a living biological creature capable of fatigue!\"*).\n* **Value ($\\mathbf{V}$):** *\"What content do I actually give you?\"* (The rich semantic payload that *\"animal\"* transfers to *\"it\"* once a match occurs).\n\nWhen the Query vector of *\"it\"* takes the dot product with the Key vector of *\"animal\"*, their geometric alignment creates a massive numerical resonance score. After passing through a softmax function, this score becomes an attention weight—a percentage of the spotlight. The model then computes a weighted linear combination of all **Value vectors**, seamlessly synthesizing the contextually clarified meaning of *\"animal\"* into *\"it\"*!\n\n> **Frontier Analogy:** Think of a YouTube search. You type a search phrase (Query $\\mathbf{Q}$). YouTube compares your text against the titles and tags of billions of uploaded videos (Keys $\\mathbf{K}$). The videos with the highest match scores rise to the top of your recommendations, and you stream the actual video content (Values $\\mathbf{V}$).",
          "ar": "تخيل أنك في قاعة مزدحمة وتريد الاستماع لشخص معين؛ ستوجه تركيزك كـ 'مصباح تسليط ضوئي' (Spotlight) لوزن الكلمات ذات الصلة وتجاهل الضجيج. في معالجة اللغات، تواجه الكلمات التحدي نفسه: في جملة 'ذهب خالد إلى بنك النهر'، كيف تدرك كلمة 'بنك' أنها تعني ضفة النهر وليس المؤسسة المالية؟ عبر آلية الانتباه الذاتي! ترسل كل كلمة استعلاماً (Query) يبحث عن سياقها، وتقارنه بمفاتيح (Keys) كافة الكلمات الأخرى عبر الضرب النقطي. وعندما يتطابق استعلام 'بنك' مع مفتاح 'النهر'، يقفز وزن الانتباه، فيتم سحب محتوى القيمة (Value) الخاصة بالنهر لإثراء معنى البنك."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}}\\right) \\mathbf{V}",
        "formulaNote": {
          "en": "Scaled dot-product attention equation with dimensional variance normalization factor.",
          "ar": "معادلة الانتباه بالضرب النقطي المقاس مع معامل معايرة التباين البعدي."
        },
        "narrative": {
          "en": "Let sequence length be $N$ and key projection dimension be $d_k$:\n* $\\mathbf{Q} \\in \\mathbb{R}^{N \\times d_k}$, $\\mathbf{K} \\in \\mathbb{R}^{N \\times d_k}$, $\\mathbf{V} \\in \\mathbb{R}^{N \\times d_v}$\n* The raw compatibility score matrix is $\\mathbf{S} = \\mathbf{Q}\\mathbf{K}^T \\in \\mathbb{R}^{N \\times N}$\n* The normalized attention weight matrix is $\\mathbf{A} = \\text{softmax}\\left(\\frac{\\mathbf{S}}{\\sqrt{d_k}}\\right) \\in \\mathbb{R}^{N \\times N}$\n* The contextualized output matrix is $\\mathbf{O} = \\mathbf{A}\\mathbf{V} \\in \\mathbb{R}^{N \\times d_v}$\n\n### The Deep Mathematical Necessity of $\\frac{1}{\\sqrt{d_k}}$:\nWhy must we divide the dot products by $\\sqrt{d_k}$?\n\nAssume that the components of Query vector $\\mathbf{q} = [q_1, \\dots, q_{d_k}]$ and Key vector $\\mathbf{k} = [k_1, \\dots, k_{d_k}]$ are independent and identically distributed random variables with zero mean $\\mathbb{E}[q_i] = \\mathbb{E}[k_i] = 0$ and unit variance $\\text{Var}(q_i) = \\text{Var}(k_i) = 1$.\n\nThe dot product is the sum of $d_k$ random variable products:\n$$z = \\mathbf{q} \\cdot \\mathbf{k} = \\sum_{i=1}^{d_k} q_i k_i$$\n\nIts expectation is:\n$$\\mathbb{E}[z] = \\sum_{i=1}^{d_k} \\mathbb{E}[q_i k_i] = \\sum_{i=1}^{d_k} \\mathbb{E}[q_i]\\mathbb{E}[k_i] = 0$$\n\nIts variance is:\n$$\\text{Var}(z) = \\sum_{i=1}^{d_k} \\text{Var}(q_i k_i) = \\sum_{i=1}^{d_k} \\Big(\\mathbb{E}[q_i^2]\\mathbb{E}[k_i^2] - (\\mathbb{E}[q_i]\\mathbb{E}[k_i])^2\\Big) = \\sum_{i=1}^{d_k} (1 \\cdot 1 - 0) = d_k$$\n\nTherefore, the **standard deviation of the raw dot product is $\\sqrt{d_k}$**!\n\nIn modern LLMs where $d_k = 128$, the unscaled dot product has a standard deviation of $\\sqrt{128} \\approx 11.3$. Raw dot products routinely reach extreme values of $\\pm 35$.\n\nWhen values of this magnitude enter the $\\text{softmax}(z_i) = \\frac{e^{z_i}}{\\sum e^{z_j}}$, the largest logit dominates completely, pushing the output distribution into an extreme one-hot spike ($[0, 0, 1.0, 0]$). In this saturation zone, **the derivative of softmax drops to near zero**:\n\n$$\n\\frac{\\partial \\text{softmax}(z)_i}{\\partial z_j} = \\text{softmax}_i (\\delta_{ij} - \\text{softmax}_j) \\to 0\n$$\n\nBackpropagating gradients vanish completely! Dividing by $\\sqrt{d_k}$ resets the variance strictly to $\\text{Var}\\left(\\frac{z}{\\sqrt{d_k}}\\right) = \\frac{d_k}{(\\sqrt{d_k})^2} = 1.0$, keeping softmax in its active, smooth, gradient-friendly regime.\n\n* $\\mathbf{Q} = \\mathbf{X} \\mathbf{W}_Q$: Query projection matrix capturing informational inquiries.\n* $\\mathbf{K} = \\mathbf{X} \\mathbf{W}_K$: Key projection matrix capturing thematic identity.\n* $\\mathbf{V} = \\mathbf{X} \\mathbf{W}_V$: Value projection matrix containing substantive semantic embeddings.\n* $d_k$: Dimensionality of Queries and Keys (determines dot product scaling factor).\n* $d_v$: Dimensionality of Values (determines output feature width).\n* $\\mathbf{A}_{ij} \\in [0, 1]$: Attention weight indicating the percentage of focus token $i$ places on token $j$, where $\\sum_{j=1}^N \\mathbf{A}_{ij} = 1$.\n\n---\n\nImplement `scaled_dot_product_attention(Q, K, V, scale=None)` computing:\n$$\\mathbf{S} = (\\mathbf{Q} \\mathbf{K}^T) \\cdot \\text{scale}, \\quad \\text{where } \\text{scale} = \\frac{1}{\\sqrt{d_k}} \\text{ if not provided}$$\n$$\\mathbf{A} = \\text{softmax}(\\mathbf{S}, \\text{axis}=-1)$$\n$$\\text{out} = \\mathbf{A} \\mathbf{V}$$\nEnsure your softmax is numerically stable by subtracting the row maximum before exponentiating.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتثبت هذه البرهنة الرياضية الدقيقة سبب حتمية التقسيم على $\\sqrt{d_k}$: فحاصل الضرب النقطي لمتجهين عشوائيين في فضاء $d_k$ يمتلك تبايناً يساوي $d_k$ وانحرافاً معيارياً يساوي $\\sqrt{d_k}$. وبدون هذا التقسيم المعياري، تتضخم القيم العددية لتدفع دالة Softmax إلى التشبع التام، مما يصيب التدرجات العكسية بالشلل التام؛ لذا يعيد عامل القياس التباين إلى 1.0 ليضمن تدفقاً سلساً للتعلم.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-transformer-attention",
          "starterCode": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, \n                                 scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (..., N, d_k)\n    K : np.ndarray of shape (..., M, d_k)\n    V : np.ndarray of shape (..., M, d_v)\n    scale : float or None\n    \n    Returns\n    -------\n    tuple of (output, attention_weights)\n        output: np.ndarray of shape (..., N, d_v)\n        attention_weights: np.ndarray of shape (..., N, M)\n    \"\"\"\n    # Step 1: Determine scale factor 1.0 / sqrt(d_k) if scale is None\n    d_k = Q.shape[-1]\n    if scale is None:\n        scale = 1.0 / np.sqrt(d_k)\n\n    # Step 2: Compute scaled scores S = Q @ K.T * scale across the last two axes\n    K_transposed = np.swapaxes(K, -1, -2)\n    scores = np.matmul(Q, K_transposed) * scale\n\n    # Step 3: Compute numerically stable softmax along the last dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n\n    # Step 4: Multiply attention weights by Values to synthesize output representations\n    output = np.matmul(attention_weights, V)\n\n    return output, attention_weights",
          "testCases": [
            {
              "input": "Q = np.array([[[1.0, 0.0]]]); K = np.array([[[1.0, 0.0]]]); V = np.array([[[5.0, 7.0]]]); out, A = scaled_dot_product_attention(Q, K, V); str(round(float(out[0, 0, 0]), 2))",
              "expected": "5.0"
            },
            {
              "input": "Q = np.zeros((1, 2, 4)); K = np.zeros((1, 2, 4)); V = np.ones((1, 2, 3)); out, A = scaled_dot_product_attention(Q, K, V); str(round(float(A[0, 0, 0]), 2))",
              "expected": "0.5"
            }
          ],
          "expectedOutput": "5.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, \n                                 scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (..., N, d_k)\n    K : np.ndarray of shape (..., M, d_k)\n    V : np.ndarray of shape (..., M, d_v)\n    scale : float or None\n    \n    Returns\n    -------\n    tuple of (output, attention_weights)\n        output: np.ndarray of shape (..., N, d_v)\n        attention_weights: np.ndarray of shape (..., N, M)\n    \"\"\"\n    # Step 1: Determine scale factor 1.0 / sqrt(d_k) if scale is None\n    d_k = Q.shape[-1]\n    if scale is None:\n        scale = 1.0 / np.sqrt(d_k)\n\n    # Step 2: Compute scaled scores S = Q @ K.T * scale across the last two axes\n    K_transposed = np.swapaxes(K, -1, -2)\n    scores = np.matmul(Q, K_transposed) * scale\n\n    # Step 3: Compute numerically stable softmax along the last dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n\n    # Step 4: Multiply attention weights by Values to synthesize output representations\n    output = np.matmul(attention_weights, V)\n\n    return output, attention_weights",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:\n    d_k = Q.shape[-1]\n    if scale is None:\n        scale = 1.0 / np.sqrt(d_k)\n    S = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale\n    S_max = np.max(S, axis=-1, keepdims=True)\n    exp_S = np.exp(S - S_max)\n    A = exp_S / np.sum(exp_S, axis=-1, keepdims=True)\n    out = np.matmul(A, V)\n    return out, A"
        },
        "hints": {
          "tier1": {
            "en": "Compute matrix product of Q and transposed K along their last two dimensions.",
            "ar": "احسب حاصل ضرب المصفوفات بين Q ومنقول K عبر آخر بعدين."
          },
          "tier2": {
            "en": "Subtract row-wise max before taking exp to ensure numerical stability.",
            "ar": "اطرح القيمة العظمى للصفوف قبل تطبيق دالة exp لضمان الاستقرار العددي."
          },
          "tier3": {
            "en": "Compute out = np.matmul(A, V) and return out, A.",
            "ar": "احسب out = np.matmul(A, V) وأعد الزوج out, A."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why is the scaling factor $\\frac{1}{\\sqrt{d_k}}$ mathematically indispensable in scaled dot-product attention as the key dimension $d_k$ grows large?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ آلية الانتباه الذاتي بالضرب النقطي المقاس وتوجيه الاستعلام والمفاتيح تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Because the variance of the dot product $\\mathbf{q} \\cdot \\mathbf{k}$ scales linearly with $d_k$; without dividing by $\\sqrt{d_k}$, large logits push the softmax function into extreme exponential saturation where its gradients vanish to near-zero.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The scaling factor inverts the attention matrix to compute its Moore-Penrose pseudo-inverse.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The factor $\\sqrt{d_k}$ represents the speed of light in silicon, calibrating GPU clock frequency.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Without $\\frac{1}{\\sqrt{d_k}}$, the Query and Key matrices cannot be multiplied due to dimensional shape mismatch.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "multi-head-attention-projection",
    "title": "Multi-Head Attention (MHA) & Subspace Projections",
    "titleAr": "الانتباه متعدد الرؤوس (MHA) وإسقاطات الفضاءات الجزئية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine inspecting a complex crime scene with a single flashlight. If you shine the flashlight on the floor to look for muddy footprints,...",
      "ar": "لا يستطيع مصباح ضوئي واحد التركيز على عدة زوايا في آن واحد. إذا ركز رأس انتباه وحيد على العلاقة النحوية بين المبتدأ والخبر، سيعجز عن تتبع..."
    },
    "prerequisites": [
      "transformer-attention",
      "t1-08"
    ],
    "x": 1115,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "Imagine inspecting a complex crime scene with a single flashlight. If you shine the flashlight on the floor to look for muddy footprints, you cannot simultaneously illuminate the ceiling to check for broken skylights or inspect the desk for forged documents. A single spotlight forces an agonizing trade-off: you can only focus on one line of inquiry at any given moment.\n\nIn single-head self-attention, the model faces this exact bottleneck. When processing the word *\"bank\"* in *\"The bank approved the mortgage loan yesterday\"*, that token needs to track multiple distinct linguistic relationships at once:\n1. **Syntactic role:** Who is the subject and verb? (*\"bank approved\"*).\n2. **Semantic category:** What kind of institution is it? (*\"mortgage loan\"*).\n3. **Temporal framing:** When did this happen? (*\"yesterday\"*).\n\nIf a single attention head is forced to average all these disparate concerns into one set of attention weights, the representations blur together into a muddled compromise.\n\nVaswani et al. solved this elegantly with **Multi-Head Attention (MHA)**: instead of relying on one giant spotlight, MHA splits the model's capacity into $h$ independent, specialized spotlights (for example, $h = 8$ or $h = 32$ heads)!\n\nRather than performing attention directly in the full model dimension $d_{\\text{model}}$, the input embeddings are linearly projected into $h$ distinct, lower-dimensional subspaces of size $d_k = d_{\\text{model}} / h$:\n* **Head 1** can dedicate its entire attention matrix to tracking syntax and grammatical agreement.\n* **Head 2** can specialize in resolving long-distance pronoun references.\n* **Head 3** can focus strictly on local bigram neighbors.\n\nOnce every head has gathered its unique perspective in parallel, their resulting Value matrices are concatenated together and blended through a final output projection matrix $\\mathbf{W}_O$. Because each head operates on a fraction of the dimension ($d_k = d_{\\text{model}} / h$), the total computational cost of running $h$ parallel heads is **identical to running a single giant head**—granting multi-faceted representational superpowers for zero additional FLOPs!\n\n> **Frontier Analogy:** Imagine an orchestra conductor who wants to hear every nuance of a symphony. Instead of listening with a single microphone that blends all instruments together into mono sound, the conductor sets up an 8-channel recording console: one mic on the violins, one on the cellos, one on the brass, and one on the percussion. The sound engineer mixes the distinct audio stems back into a rich, spatial master track ($\\mathbf{W}_O$).",
          "ar": "لا يستطيع مصباح ضوئي واحد التركيز على عدة زوايا في آن واحد. إذا ركز رأس انتباه وحيد على العلاقة النحوية بين المبتدأ والخبر، سيعجز عن تتبع الضمائر العائدة أو المعاني البلاغية. تحل آلية 'الانتباه متعدد الرؤوس' (Multi-Head Attention) هذه المعضلة بتقسيم شعاع الانتباه إلى عدة رؤوس متوازية ومستقلة (h رؤوس)، حيث يُسقط كل رأس المتجهات في فضاء تمثيلي جزئي منخفض الأبعاد (d_k = d_model / h). يتخصص كل رأس في التقاط نمط لغوي محدد، ثم تُدمج نتائج كافة الرؤوس وتُسقط عبر مصفوفة إخراج رئيسية W_O لصهر الرؤى دون زيادة التكلفة الحسابية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{MHA}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{Concat}(\\text{head}_1, \\text{head}_2, \\dots, \\text{head}_h) \\mathbf{W}_O",
        "formulaNote": {
          "en": "Multi-Head Attention linear projection, parallel subspace attention, and output synthesis.",
          "ar": "إسقاطات الانتباه متعدد الرؤوس وحساب الانتباه المتوازي في الفضاءات الجزئية والإسقاط النهائي."
        },
        "narrative": {
          "en": "Where each individual head $i \\in \\{1, \\dots, h\\}$ is computed as:\n\n$$\n\\text{head}_i = \\text{Attention}\\left(\\mathbf{Q}\\mathbf{W}_i^Q, \\; \\mathbf{K}\\mathbf{W}_i^K, \\; \\mathbf{V}\\mathbf{W}_i^V\\right) = \\text{softmax}\\left(\\frac{(\\mathbf{Q}\\mathbf{W}_i^Q)(\\mathbf{K}\\mathbf{W}_i^K)^T}{\\sqrt{d_k}}\\right) (\\mathbf{V}\\mathbf{W}_i^V)\n$$\n\n* $\\mathbf{X} \\in \\mathbb{R}^{B \\times N \\times d_{\\text{model}}}$: Input token representation tensor across batch size $B$, sequence length $N$, and hidden dimension $d_{\\text{model}}$.\n* $h$: Number of parallel attention heads (e.g., $h = 32$ in LLaMA-3-8B).\n* $d_k = d_v = \\frac{d_{\\text{model}}}{h}$: Dimension of each individual subspace per head (e.g., $4096 / 32 = 128$).\n* $\\mathbf{W}_i^Q, \\mathbf{W}_i^K, \\mathbf{W}_i^V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}$: Learned linear subspace projection matrices for head $i$.\n* $\\mathbf{W}_O \\in \\mathbb{R}^{(h \\cdot d_v) \\times d_{\\text{model}}} = \\mathbb{R}^{d_{\\text{model}} \\times d_{\\text{model}}}$: Final multi-head blending projection matrix.\n\n### Complexity & Computational Invariance Proof:\nFor a single giant head with dimension $d_{\\text{model}}$, the dot product $(\\mathbf{Q}\\mathbf{K}^T)$ requires $\\mathcal{O}(N^2 \\cdot d_{\\text{model}})$ operations.\nFor $h$ heads of dimension $d_k = d_{\\text{model}} / h$, each head requires $\\mathcal{O}(N^2 \\cdot d_k) = \\mathcal{O}(N^2 \\cdot \\frac{d_{\\text{model}}}{h})$ operations.\nSumming across all $h$ heads:\n\n$$\nh \\times \\mathcal{O}\\left(N^2 \\cdot \\frac{d_{\\text{model}}}{h}\\right) = \\mathcal{O}(N^2 \\cdot d_{\\text{model}})\n$$\n\nThe computational complexity and memory footprint remain **strictly invariant to the number of heads $h$**! Multi-Head Attention extracts rich multifaceted relational patterns for the exact same theoretical computational cost.\n\n---\n\nImplement `multi_head_attention_forward(X, W_q, W_k, W_v, W_o, num_heads)` executing the complete MHA forward pass:\n1. Linearly project inputs $\\mathbf{Q} = \\mathbf{X} \\mathbf{W}_q$, $\\mathbf{K} = \\mathbf{X} \\mathbf{W}_k$, $\\mathbf{V} = \\mathbf{X} \\mathbf{W}_v$.\n2. Reshape and transpose to isolate heads: `(B, num_heads, N, d_k)`.\n3. Compute scaled dot-product attention per head in parallel.\n4. Transpose and concatenate heads back to `(B, N, D)`.\n5. Project via output matrix $\\mathbf{W}_o$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتثبت هذه المقارنة الرياضية الكفاءة الاستثنائية لآلية الانتباه متعدد الرؤوس: فتجزئة الفضاء الأكبر إلى فضاءات فرعية $d_k = d_{\\text{model}} / h$ تحافظ على نفس التكلفة الحسابية $\\mathcal{O}(N^2 \\cdot d_{\\text{model}})$، بينما تمنح النموذج القدرة على تتبع أنماط سياقية شديدة التنوع في ذات اللحظة.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multi-head-attention-projection",
          "starterCode": "import numpy as np\n\ndef multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, \n                                W_v: np.ndarray, W_o: np.ndarray, \n                                num_heads: int) -> np.ndarray:\n    \"\"\"\n    Compute Multi-Head Attention forward pass: MultiHead(X) = Concat(head_1, ..., head_h) @ W_o.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (B, N, D)\n    W_q, W_k, W_v, W_o : weight matrices of shape (D, D)\n    num_heads : int\n        Number of attention heads (D must be divisible by num_heads).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, N, D)\n    \"\"\"\n    # Step 1: Project inputs to Query, Key, and Value spaces\n    B, N, D = X.shape\n    d_k = D // num_heads\n    \n    Q = X @ W_q  # (B, N, D)\n    K = X @ W_k  # (B, N, D)\n    V = X @ W_v  # (B, N, D)\n\n    # Step 2: Reshape and transpose to separate heads: (B, num_heads, N, d_k)\n    Q_heads = Q.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)\n    K_heads = K.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)\n    V_heads = V.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)\n\n    # Step 3: Compute scaled dot-product attention per head\n    scale = 1.0 / np.sqrt(d_k)\n    scores = np.matmul(Q_heads, K_heads.swapaxes(-1, -2)) * scale\n    \n    # Numerically stable softmax along last axis\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # Context representations per head: (B, num_heads, N, d_k)\n    head_outs = np.matmul(attn_weights, V_heads)\n\n    # Step 4: Concatenate heads back into unified dimension D\n    # Transpose to (B, N, num_heads, d_k) then flatten last two dims to D\n    concat = head_outs.transpose(0, 2, 1, 3).reshape(B, N, D)\n\n    # Step 5: Final linear projection through W_o\n    out = concat @ W_o\n    return out",
          "testCases": [
            {
              "input": "X = np.ones((1, 2, 4)); W = np.eye(4); out = multi_head_attention_forward(X, W, W, W, W, num_heads=2); str(out.shape)",
              "expected": "(1, 2, 4)"
            },
            {
              "input": "X = np.ones((1, 2, 4)); W = np.eye(4); out = multi_head_attention_forward(X, W, W, W, W, num_heads=2); str(round(float(out[0, 0, 0]), 2))",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "(1, 2, 4)",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, \n                                W_v: np.ndarray, W_o: np.ndarray, \n                                num_heads: int) -> np.ndarray:\n    \"\"\"\n    Compute Multi-Head Attention forward pass: MultiHead(X) = Concat(head_1, ..., head_h) @ W_o.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (B, N, D)\n    W_q, W_k, W_v, W_o : weight matrices of shape (D, D)\n    num_heads : int\n        Number of attention heads (D must be divisible by num_heads).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, N, D)\n    \"\"\"\n    # Step 1: Project inputs to Query, Key, and Value spaces\n    B, N, D = X.shape\n    d_k = D // num_heads\n    \n    Q = X @ W_q  # (B, N, D)\n    K = X @ W_k  # (B, N, D)\n    V = X @ W_v  # (B, N, D)\n\n    # Step 2: Reshape and transpose to separate heads: (B, num_heads, N, d_k)\n    Q_heads = Q.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)\n    K_heads = K.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)\n    V_heads = V.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)\n\n    # Step 3: Compute scaled dot-product attention per head\n    scale = 1.0 / np.sqrt(d_k)\n    scores = np.matmul(Q_heads, K_heads.swapaxes(-1, -2)) * scale\n    \n    # Numerically stable softmax along last axis\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # Context representations per head: (B, num_heads, N, d_k)\n    head_outs = np.matmul(attn_weights, V_heads)\n\n    # Step 4: Concatenate heads back into unified dimension D\n    # Transpose to (B, N, num_heads, d_k) then flatten last two dims to D\n    concat = head_outs.transpose(0, 2, 1, 3).reshape(B, N, D)\n\n    # Step 5: Final linear projection through W_o\n    out = concat @ W_o\n    return out",
              "expectedOutput": "(1, 2, 4)"
            }
          },
          "solution": "import numpy as np\n\ndef multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray, num_heads: int) -> np.ndarray:\n    B, S, D = X.shape\n    d_k = D // num_heads\n    Q = X @ W_q\n    K = X @ W_k\n    V = X @ W_v\n    Q_heads = Q.reshape(B, S, num_heads, d_k).transpose(0, 2, 1, 3)\n    K_heads = K.reshape(B, S, num_heads, d_k).transpose(0, 2, 1, 3)\n    V_heads = V.reshape(B, S, num_heads, d_k).transpose(0, 2, 1, 3)\n    scores = np.matmul(Q_heads, K_heads.swapaxes(-1, -2)) / np.sqrt(d_k)\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    attended = np.matmul(weights, V_heads)\n    concat = attended.transpose(0, 2, 1, 3).reshape(B, S, D)\n    return concat @ W_o"
        },
        "hints": {
          "tier1": {
            "en": "Reshape Q, K, V to (B, S, num_heads, d_k) and transpose to (B, num_heads, S, d_k).",
            "ar": "أعد تشكيل Q و K و V إلى (B, S, num_heads, d_k) وبدل المحاور إلى (B, num_heads, S, d_k)."
          },
          "tier2": {
            "en": "Compute scaled dot product scores across heads and apply row-wise stable softmax.",
            "ar": "احسب درجات الانتباه المقاسة عبر الرؤوس وطبق دالة Softmax المستقرة على الصفوف."
          },
          "tier3": {
            "en": "Transpose back to (B, S, num_heads, d_k), reshape to (B, S, D), and multiply by W_o.",
            "ar": "أعد تبديل المحاور إلى (B, S, num_heads, d_k) وشكلها كـ (B, S, D) ثم اضرب في W_o."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the primary architectural advantage of Multi-Head Attention over a single-head self-attention layer of the exact same total hidden dimension $d_{\\text{model}}$?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الانتباه متعدد الرؤوس (MHA) وإسقاطات الفضاءات الجزئية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "It enables the network to jointly attend to information from distinct representation subspaces at different positions simultaneously, preventing diverse semantic relationships (such as syntax, coreference, and sentiment) from averaging out into a single compromise.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Multi-Head Attention eliminates the requirement for Positional Encodings entirely.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Splitting into heads reduces the total FLOP count of the self-attention operation by a factor of $h^2$.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Multi-Head Attention converts quadratic self-attention into strictly linear $\\mathcal{O}(N)$ computation.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "causal-masking-scaled-dot-product",
    "title": "Causal Masking & Autoregressive Decoding",
    "titleAr": "الحجب السببي والتوليد التتابعي في نماذج المحولات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are preparing for a difficult medical licensing examination. If you practice using a workbook where the correct answer to every...",
      "ar": "تخيل أن طالباً يتدرب على امتحان وورقة الإجابات النموذجية مفتوحة أمامه؛ سينظر إلى الإجابات المستقبلية بسهولة ويحصل على علامة كاملة دون أن..."
    },
    "prerequisites": [
      "transformer-attention"
    ],
    "x": 1130,
    "y": 2075,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "Imagine you are preparing for a difficult medical licensing examination. If you practice using a workbook where the correct answer to every question is printed in bold right next to the question prompt, your eyes will naturally and effortlessly glance at the answers. During training, you achieve a flawless 100% score in record time. But on the day of the real exam, when you are handed a blank sheet of paper, you fail catastrophically—because you never actually learned how to deduce the answers yourself!\n\nThis is the exact disaster that threatens generative language models like GPT-4, Claude, and LLaMA.\n\nDuring the pretraining phase, foundation models are trained with massive computational parallelism. Instead of feeding in sentences one word at a time, we feed entire documents spanning 4,000, 8,000, or even 128,000 tokens into the Transformer all at once! The model's objective is **next-token prediction**: given the first five words, predict the sixth word.\n\nHowever, standard self-attention allows every word to attend to every other word in the sequence. If token 5 (*\"The cat sat on the\"*) is allowed to shine its attention spotlight forward into token 6 (*\"mat\"*), the network will simply memorize the trivial identity mapping: copy token 6 directly into the prediction slot! It cheats during training, learning zero reasoning.\n\nTo enforce the strict, irreversible **Arrow of Time**, generative Transformers install an unbreakable **one-way mirror**: the **Causal Attention Mask**.\n\nThe causal mask is an upper-triangular matrix that acts as an impenetrable temporal curtain. For any token at position $i$, any attempt to attend to a future token $j > i$ is penalized with a score of $-\\infty$ (negative infinity) before passing into the softmax function. Because the exponential of negative infinity is absolute zero ($e^{-\\infty} = 0$), the attention weight allocated to future tokens is crushed to **absolute mathematical zero**! The token can only draw context from itself and the past, preserving the integrity of autoregressive learning.\n\n> **Frontier Analogy:** Imagine reading a suspense murder mystery with a specialized pair of reading glasses. The lenses have an electronic polarizing shutter that instantly blacks out all lines of text below the line you are currently reading. You can reread every clue on previous pages as many times as you like, but the future remains in complete darkness.",
          "ar": "تخيل أن طالباً يتدرب على امتحان وورقة الإجابات النموذجية مفتوحة أمامه؛ سينظر إلى الإجابات المستقبلية بسهولة ويحصل على علامة كاملة دون أن يتعلم التفكير بمفرده! في نماذج المحولات التوليدية (GPT)، نقوم بتدريب النموذج على آلاف الرموز في خطوة متوازية واحدة فائقة السرعة. ولكن لكي يتعلم النموذج توليد الكلمة التالية بحق، يُمنع منعاً باتاً على أي رمز أن 'يسترق النظر' إلى المستقبل. يحقق 'الحجب السببي' (Causal Masking) هذا القيد الزمني الصارم عبر وضع مصفوفة مثلثة علوية مشحونة بقيم -∞ على خانات المستقبل قبل حساب Softmax؛ وبما أن e^{-∞} = 0، تصبح أوزان الانتباه للمستقبل أصفاراً رياضية مطلقة، مما يجبر النموذج على التنبؤ بناءً على الماضي والحاضر فقط."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{CausalAttention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}} + \\mathbf{M}\\right) \\mathbf{V}",
        "formulaNote": {
          "en": "Upper-triangular causal attention mask enforcing chronological autoregressive dependency.",
          "ar": "قناع الحجب السببي المثلثي العلوي لفرض التبعية الزمنية في التوليد التتابعي."
        },
        "narrative": {
          "en": "Where the causal mask tensor $\\mathbf{M}$ is defined as:\n\n$$\n\\mathbf{M}_{ij} = \\begin{cases} \n0 & \\text{if } j \\le i \\quad \\text{(past and present positions)} \\\\ \n-\\infty & \\text{if } j > i \\quad \\text{(forbidden future lookahead)} \n\\end{cases}\n$$\n\nIn 32-bit floating-point GPU execution, $-\\infty$ is represented as a large negative scalar, typically $-10^9$ or `-1e9` (or `-1e4` in FP16), to prevent hardware underflow exceptions.\n\n### Why $-\\infty$ Before Softmax instead of $0$ After Softmax?\nConsider what would happen if you computed standard unmasked attention and simply zeroed out future weights *after* the softmax step:\n\n$$\n\\mathbf{A}_{\\text{bad}} = \\text{tril}(\\text{softmax}(\\mathbf{S}))\n$$\n\nFor row $i=1$ in a 4-token sequence, each position originally receives $\\text{softmax}(S)_{1j} = 0.25$.\nZeroing out positions $j > 1$ yields:\n$$\\mathbf{A}_{\\text{bad}}[1, :] = [0.25, 0.0, 0.0, 0.0]$$\nThe sum of attention weights across the row is now $\\sum_j \\mathbf{A}_{ij} = 0.25 \\neq 1.0$!\nThis completely breaks the mathematical definition of a **convex combination**. The magnitude of the token vector shrinks by $75\\%$ after a single layer, and across an 80-layer Transformer, activations exponentially vanish to zero!\n\nBy contrast, adding $-\\infty$ **inside** the softmax function directly modifies the exponent:\n\n$$\n\\text{softmax}\\left(\\frac{S_{ij} + M_{ij}}{\\sqrt{d_k}}\\right) = \\frac{e^{\\frac{S_{ij} + M_{ij}}{\\sqrt{d_k}}}}{\\sum_{k=1}^N e^{\\frac{S_{ik} + M_{ik}}{\\sqrt{d_k}}}} = \\frac{e^{\\frac{S_{ij}}{\\sqrt{d_k}}}}{\\sum_{k \\le i} e^{\\frac{S_{ik}}{\\sqrt{d_k}}} + \\sum_{k > i} e^{-\\infty}} = \\frac{e^{\\frac{S_{ij}}{\\sqrt{d_k}}}}{\\sum_{k \\le i} e^{\\frac{S_{ik}}{\\sqrt{d_k}}}}\n$$\n\nThe denominator automatically normalizes **strictly across the valid past positions**, guaranteeing that the remaining attention weights sum to **exactly $1.0$**!\n\n* $\\mathbf{M} \\in \\mathbb{R}^{N \\times N}$: Causal mask matrix where strictly upper-triangular entries ($j > i$) are filled with $-\\infty$.\n* $\\mathbf{S} = \\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}}$: Scaled logit affinity matrix before masking.\n* $\\mathbf{A}_{ij}$: Causal attention probability matrix where $\\mathbf{A}_{ij} = 0$ for all $j > i$ and $\\sum_{j=1}^i \\mathbf{A}_{ij} = 1.0$ for every row $i$.\n* **Autoregressive Property:** Guarantees that prediction $\\hat{y}_t = P(x_{t+1} \\mid x_1, \\dots, x_t)$ depends strictly on historical prefix tokens without temporal contamination.\n\n---\n\nImplement `causal_attention(Q, K, V)` to compute scaled dot-product attention with an upper-triangular lookahead causal mask.\n1. Compute raw scores $\\mathbf{S} = (\\mathbf{Q} \\mathbf{K}^T) / \\sqrt{d_k}$.\n2. Construct an upper-triangular mask $\\mathbf{M}$ where elements above the main diagonal ($j > i$) are set to `-1e9` and all other elements are `0.0`.\n3. Add $\\mathbf{M}$ to $\\mathbf{S}$.\n4. Compute stable softmax along the last axis.\n5. Multiply attention weights by $\\mathbf{V}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\nتبرهن هذه الصياغة الرياضية الدقيقة سبب تطبيق القناع بإضافة $-\\infty$ قبل Softmax وليس بتصفير الأوزان بعدها: فتصفير الأوزان بعد Softmax يجعل مجموع الاحتمالات في الصف أقل من 1.0، مما يؤدي إلى اضمحلال الإشارات وتلاشيها عبر الطبقات. أما إضافة $-\\infty$ داخل الدالة الأسية، فيضمن اختفاء أثر المستقبل تماماً وإعادة توزيع كامل الكتلة الاحتمالية بنسبة 100% على الرموز السابقة حصراً.\n\n## Beat 3: Python Challenge | التحدي البرمجي التفاعلي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-masking-scaled-dot-product",
          "starterCode": "def causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Causal Autoregressive Attention with an upper-triangular lookahead mask.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (B, N, d_k)\n    K : np.ndarray of shape (B, N, d_k)\n    V : np.ndarray of shape (B, N, d_v)\n    \n    Returns\n    -------\n    tuple of (output, attention_weights)\n        output: shape (B, N, d_v)\n        attention_weights: shape (B, N, N) with strict zeros above main diagonal\n    \"\"\"\n    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)\n    # Step 2: Build upper-triangular mask M where j > i is filled with -1e9\n    # np.triu with k=1 sets strictly upper triangular elements to True\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "Q = np.ones((1, 3, 2)); K = np.ones((1, 3, 2)); V = np.ones((1, 3, 2)); out, A = causal_attention(Q, K, V); str(round(float(A[0, 0, 1]), 2))",
              "expected": "0.0"
            },
            {
              "input": "Q = np.ones((1, 3, 2)); K = np.ones((1, 3, 2)); V = np.ones((1, 3, 2)); out, A = causal_attention(Q, K, V); str(round(float(A[0, 0, 0]), 2))",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "def causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Causal Autoregressive Attention with an upper-triangular lookahead mask.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (B, N, d_k)\n    K : np.ndarray of shape (B, N, d_k)\n    V : np.ndarray of shape (B, N, d_v)\n    \n    Returns\n    -------\n    tuple of (output, attention_weights)\n        output: shape (B, N, d_v)\n        attention_weights: shape (B, N, N) with strict zeros above main diagonal\n    \"\"\"\n    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)\n    # Step 2: Build upper-triangular mask M where j > i is filled with -1e9\n    # np.triu with k=1 sets strictly upper triangular elements to True\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Causal Autoregressive Attention with an upper-triangular lookahead mask.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (B, N, d_k)\n    K : np.ndarray of shape (B, N, d_k)\n    V : np.ndarray of shape (B, N, d_v)\n    \n    Returns\n    -------\n    tuple of (output, attention_weights)\n        output: shape (B, N, d_v)\n        attention_weights: shape (B, N, N) with strict zeros above main diagonal\n    \"\"\"\n    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)\n    d_k = Q.shape[-1]\n    scale = 1.0 / np.sqrt(d_k)\n    scores = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale  # (B, N, N)\n\n    # Step 2: Build upper-triangular mask M where j > i is filled with -1e9\n    N = Q.shape[-2]\n    # np.triu with k=1 sets strictly upper triangular elements to True\n    mask = np.triu(np.full((N, N), -1e9), k=1)\n    \n    # Step 3: Add mask to scaled scores\n    masked_scores = scores + mask\n\n    # Step 4: Compute numerically stable softmax along the last axis\n    scores_max = np.max(masked_scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(masked_scores - scores_max)\n    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n\n    # Step 5: Multiply attention weights by Values\n    output = np.matmul(attention_weights, V)\n\n    return output, attention_weights"
        },
        "hints": {
          "tier1": {
            "en": "Generate an upper-triangular mask where row i cannot attend to column j > i.",
            "ar": "أنشئ قناعاً مثلثياً علوياً يمنع الصف i من الانتباه للعمود j > i."
          },
          "tier2": {
            "en": "Use np.triu(np.full((S_len, S_len), -1e9), k=1) to fill upper entries with -1e9.",
            "ar": "استخدم np.triu(np.full((S_len, S_len), -1e9), k=1) لملء المثلث العلوي بقيم -1e9."
          },
          "tier3": {
            "en": "Add the mask to scores before computing softmax, ensuring future weights evaluate to 0.",
            "ar": "أضف القناع لدرجات الانتباه قبل تطبيق Softmax لضمان أن تصبح أوزان المستقبل أصفاراً."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why must causal masking be implemented by adding $-\\infty$ (or $-10^9$) to the pre-softmax logits, rather than calculating unmasked softmax and simply multiplying future positions by zero afterwards?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الحجب السببي والتوليد التتابعي في نماذج المحولات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Setting future entries to zero after softmax breaks the probability distribution ($\\sum_j A_{ij} < 1$), causing activations to shrink across layers, whereas adding $-\\infty$ before softmax naturally redistributes 100% of the probability mass strictly across valid past tokens.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Softmax cannot be executed on GPU hardware unless an upper-triangular matrix is present in register memory.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Zeroing out entries after softmax causes the attention matrix to become singular and crash the operating system kernel.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Adding $-\\infty$ before softmax inverts the attention matrix into an identity operator.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "positional-encoding-sinusoidal-rope",
    "title": "Rotary Position Embedding (RoPE) & Sinusoidal Encodings",
    "titleAr": "تضمين المواضع الدوراني (RoPE) والترميزات الجيبية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "The standard self-attention mechanism in Transformers is fundamentally permutation-equivariant: without explicit position indicators, the...",
      "ar": "تتميز آلية الانتباه الذاتي في معمارية المحولات بأنها متماثلة طوبولوجياً تحت التباديل؛ ففي غياب مؤشرات صريحة للمواضع، تنتج جملة \"عض الكلب..."
    },
    "prerequisites": [
      "transformer-attention",
      "multi-head-attention-projection"
    ],
    "x": 1115,
    "y": 2170,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RotaryEmbeddingLab",
        "narrative": {
          "en": "The standard self-attention mechanism in Transformers is fundamentally permutation-equivariant: without explicit position indicators, the sentence *\"the dog bit the mailman\"* and *\"the mailman bit the dog\"* produce identical internal contextual representations. Because self-attention computes pairwise token interactions strictly through dot products of unordered sets, a raw Transformer possesses zero innate awareness of word order, syntax, or sequential temporal flow. To break this symmetry, early models had to inject explicit numerical clues indicating where each token sits in the sequence.\n\nIn the seminal 2017 Transformer architecture, Vaswani et al. introduced absolute sinusoidal positional encodings—adding fixed trigonometric wave coordinates directly to the initial token input embeddings ($\\mathbf{x}_m + \\mathbf{p}_m$). While this additive scheme was sufficient for short translation benchmarks, it suffers from two major theoretical flaws. First, adding position vectors directly into the semantic feature space inevitably distorts the word embeddings themselves, forcing the network to waste capacity disentangling syntax from semantics. Second, additive coordinates treat positions as absolute milestones ($1, 2, 3, \\dots$); they fail to generalize gracefully to unseen sequence lengths, and they struggle to express the invariant that the grammatical relationship between two words 3 positions apart should remain identical whether they appear at the start of a sentence or deep inside a 100,000-token document.\n\nRotary Position Embedding (RoPE), introduced by Jianlin Su et al. (2021), revolutionized modern frontier LLMs (powering LLaMA 2/3, Mistral, PaLM, and Gemma) by encoding position through **geometric rotation in the complex plane**. Instead of adding an external coordinate vector, RoPE splits the query and key embedding vectors into 2D orthogonal slices (coordinate pairs) and rotates each 2D slice by an angle proportional to the token's position index $m \\theta_i$. Crucially, RoPE is applied dynamically to the Query and Key projections at every attention layer, while leaving the Value vectors unrotated so that the raw retrieved content is never artificially warped.\n\n> **Frontier Analogy:** Think of clock hands on a dial. If two tokens are positioned at timestamps $m$ and $n$, their relative distance is simply the angular separation between their clock hands, regardless of what absolute hour is struck on the wall clock. If word A is at 2 o'clock and word B is at 5 o'clock, the angle between them is 3 hours—the exact same angular difference as between 7 o'clock and 10 o'clock!\n\nBecause the dot product between two vectors rotated by angles $m\\theta_i$ and $n\\theta_i$ depends strictly on the difference between their rotation angles $(m - n)\\theta_i$, the attention score $\\mathbf{q}_m^T \\mathbf{k}_n$ becomes an intrinsic function of relative token displacement. Furthermore, by pairing different feature dimensions with a spectrum of decaying geometric frequencies, RoPE naturally implements the Riemann-Lebesgue lemma: attention weights between tokens decay smoothly as their relative distance $|m - n|$ grows, providing an organic inductive bias toward local context while preserving the mathematical capacity for long-range associative recall.",
          "ar": "تتميز آلية الانتباه الذاتي في معمارية المحولات بأنها متماثلة طوبولوجياً تحت التباديل؛ ففي غياب مؤشرات صريحة للمواضع، تنتج جملة \"عض الكلب ساعي البريد\" نفس التمثيل الحسابي الداخلي تماماً لجملة \"عض ساعي البريد الكلب\". ولأن الانتباه يحسب العلاقات الثنائية عبر الجداء النقطي لمجموعات غير مرتبة، فإن المحول يفتقر بطبيعته إلى أي إدراك لترتيب الكلمات أو البنية النحوية المتسلسلة دون تزويده بإحداثيات رقمية تميز موضع كل رمز.\n\nفي النموذج الأصلي لعام 2017، اعتمد الباحثون على الترميز الجيبي المطلق عبر إضافة موجات جيبية ثابتة مباشرة إلى متجهات التضمين ($\\mathbf{x}_m + \\mathbf{p}_m$). ورغم نجاح هذا الأسلوب في المهام الأولية، إلا أنه يعاني من عيبين جوهريين: أولاً، تؤدي الإضافة الجبرية المباشرة في فضاء الميزات الدلالية إلى تشويه المعاني الأصلية للكلمات؛ وثانياً، يعامل هذا الأسلوب المواضع كإحداثيات مطلقة منفصلة، مما يجعل النموذج عاجزاً عن التعميم على نصوص أطول من سياق التدريب، ويفشل في التقاط المسافات النسبية الثابتة بين الكلمات عبر أرجاء المستند.\n\nيقدم \"تضمين المواضع الدوراني\" (RoPE) حلاً رياضياً وهندسياً عبقرياً تبنته أحدث النماذج اللغوية الرائدة (مثل LLaMA 3 وMistral وGemma)، حيث يُدمج الموضع عبر **التدوير الهندسي في المستوى المركب**. فبدلاً من إضافة متجهات خارجية، يقسم RoPE متجهات الاستعلام والمفاتيح إلى أزواج ثنائية الأبعاد، ويدير كل زوج بزاوية تتناسب طردياً مع الفهرس الزمني للرمز $m \\theta_i$. يُطبق هذا التدوير حصراً على متجهات الاستعلام والمفاتيح في كل طبقة، مع إبقاء متجهات القيم دون تدوير للحفاظ على سلامة المحتوى الدلالي المسترجع.\n\nيشبه هذا النظام حركة عقارب الساعة على مينائها الدائري: إذا كان الرمز الأول عند الموضع $m$ والرمز الثاني عند $n$، فإن المسافة النسبية بينهما تمثلها ببساطة الزاوية الفاصلة بين العقربين، بصرف النظر عن التوقيت المطلق المعلق على جدار الغرفة! فالزاوية بين الساعة 2 والساعة 5 هي تماماً نفس الزاوية بين الساعة 7 والساعة 10. وبفضل جبر الأعداد المركبة، يعتمد الجداء النقطي بين الاستعلام والمفتاح حصراً على فارق الزوايا $(m - n)\\theta_i$، وتتلاشى درجات الانتباه بسلاسة مع تباعد المسافات النسبية وفق مبرهنة ريمان-لوبيغ."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{q}_m^T \\mathbf{k}_n = \\left(\\mathbf{R}_{\\Theta, m}^d \\mathbf{q}_m\\right)^T \\left(\\mathbf{R}_{\\Theta, n}^d \\mathbf{k}_n\\right) = \\mathbf{q}_m^T \\left(\\mathbf{R}_{\\Theta, m}^d\\right)^T \\mathbf{R}_{\\Theta, n}^d \\mathbf{k}_n = \\mathbf{q}_m^T \\mathbf{R}_{\\Theta, n - m}^d \\mathbf{k}_n",
        "formulaNote": {
          "en": "RoPE orthogonal block-diagonal rotation preserving relative distance invariance.",
          "ar": "مصفوفة الدوران القطرية الكتلية المتعامدة لـ RoPE التي تحفظ ثبات المسافة النسبية."
        },
        "narrative": {
          "en": "The rotation operator $\\mathbf{R}_{\\Theta, m}^d$ is an orthogonal block-diagonal matrix constructed from $d/2$ planar rotation sub-matrices:\n\n$$\n\\mathbf{R}_{\\Theta, m}^d = \\text{diag}\\left(\\mathbf{R}_{\\theta_1, m}, \\mathbf{R}_{\\theta_2, m}, \\dots, \\mathbf{R}_{\\theta_{d/2}, m}\\right), \\quad \\mathbf{R}_{\\theta_i, m} = \\begin{pmatrix} \\cos(m\\theta_i) & -\\sin(m\\theta_i) \\\\ \\sin(m\\theta_i) & \\cos(m\\theta_i) \\end{pmatrix}\n$$\n\nWhere the angular frequencies $\\theta_i$ follow a geometrically decaying progression:\n\n$$\n\\theta_i = b^{-2(i-1)/d}, \\quad i \\in \\{1, 2, \\dots, d/2\\}, \\quad b = 10\\,000\n$$\n\nIn actual GPU execution, we avoid constructing the sparse $d \\times d$ matrix explicitly. Instead, we compute the rotation via an element-wise vector formula using the `rotate_half` helper function:\n\n$$\n\\mathbf{R}_{\\Theta, m}^d \\mathbf{x} = \\mathbf{x} \\odot \\cos(m \\boldsymbol{\\theta}) + \\text{rotate\\_half}(\\mathbf{x}) \\odot \\sin(m \\boldsymbol{\\theta})\n$$\n\nWhere $\\text{rotate\\_half}(\\mathbf{x}) = [-x_2, x_1, -x_4, x_3, \\dots, -x_d, x_{d-1}]$, implementing multiplication by the imaginary unit $i$ in 2D complex slices.\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{q}_m$ | $\\mathbb{R}^d$ | Query vector at sequence position $m$ | Represents the search criteria emitted by the token at step $m$. |\n| $\\mathbf{k}_n$ | $\\mathbb{R}^d$ | Key vector at sequence position $n$ | Represents the index catalog entry emitted by the token at step $n$. |\n| $\\mathbf{R}_{\\Theta, m}^d$ | $\\mathbb{R}^{d \\times d}$ | Orthogonal block-diagonal rotation matrix | Transforms vectors by rotating consecutive 2D sub-planes by angle $m\\theta_i$. |\n| $\\mathbf{R}_{\\theta_i, m}$ | $\\mathbb{R}^{2 \\times 2}$ | 2D planar rotation matrix for dimension pair $i$ | Rotates coordinate pair $(x_{2i-1}, x_{2i})$ by angle $m\\theta_i$. |\n| $\\theta_i$ | $\\mathbb{R}_{> 0}$ | Angular frequency for subspace $i$ | Geometric base progression decaying from 1 down to $b^{-1}$. |\n| $b$ | $\\mathbb{R}_{> 0}$ | Base frequency scaling constant | Set to 10,000 in original RoPE, and scaled up to 500,000 in LLaMA 3 for long context. |\n| $n - m$ | $\\mathbb{Z}$ | Relative displacement between tokens | Proves mathematically that $\\mathbf{R}_m^T \\mathbf{R}_n = \\mathbf{R}_{n - m}$, ensuring translation invariance. |\n| $\\text{rotate\\_half}(\\mathbf{x})$ | $\\mathbb{R}^d$ | Permuted vector $(-x_2, x_1, -x_4, x_3, \\dots)$ | Implements complex multiplication by $i$ without matrix materialization. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement the core components of Rotary Position Embedding: precomputing frequency tables, rotating coordinate pairs, and applying the rotation to an input tensor.",
          "ar": "تضمن هذه الصياغة الرياضية انخفاض درجات الانتباه تدريجياً مع تزايد المسافة النسبية $|m - n|$ بفضل تداخل الترددات الجيبية المتعددة عبر الأبعاد المختلفة (تطبيقاً لمبرهنة ريمان-لوبيغ التحليلية). يمنح هذا النموذج تحيزاً استقرائياً طبيعياً للتركيز على السياق المحلي القريب، مع الاحتفاظ بالقدرة الكاملة على الربط الدلالي بعيد المدى عند الحاجة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-positional-encoding-sinusoidal-rope",
          "starterCode": "import numpy as np\n\ndef precompute_rope_frequencies(dim: int, seq_len: int, base: float = 10000.0) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Precompute cosine and sine frequency matrices for Rotary Position Embedding (RoPE).\n    \n    Parameters\n    ----------\n    dim : int\n        Head dimension (must be an even integer).\n    seq_len : int\n        Maximum sequence length to precompute.\n    base : float\n        Base frequency scaling factor (default 10000.0).\n        \n    Returns\n    -------\n    cos, sin : tuple of np.ndarray of shape (seq_len, dim)\n    \"\"\"\n    # Step 1: Compute theta frequency scale for half dimensions: theta_i = 1 / base^(2i / dim)\n    theta = 1.0 / (base ** (np.arange(0, dim, 2, dtype=np.float32) / dim))\n    \n    # Step 2: Compute outer product of token position indices and theta frequencies: (seq_len, dim // 2)\n    positions = np.arange(seq_len, dtype=np.float32)\n    angles = np.outer(positions, theta)\n    \n    # Step 3: Duplicate angles along last axis to match head dimension: (seq_len, dim)\n    cos = np.repeat(np.cos(angles), 2, axis=-1)\n    sin = np.repeat(np.sin(angles), 2, axis=-1)\n    return cos, sin\n\ndef rotate_half(x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Rotates coordinate pairs: [-x1, x0, -x3, x2, ...].\n    Represents multiplication by imaginary unit i in 2D complex slices.\n    \"\"\"\n    # Step 1: Split even and odd dimension channels\n    x1 = x[..., 0::2]\n    x2 = x[..., 1::2]\n    # Step 2: Interleave negated odd components with original even components\n    rotated = np.stack([-x2, x1], axis=-1)\n    return rotated.reshape(x.shape)\n\ndef apply_rope(x: np.ndarray, pos: int, base: float = 10000.0) -> np.ndarray:\n    \"\"\"\n    Applies Rotary Position Embedding to a query or key tensor x at position index pos.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, H, D) or (B, 1, D)\n        Input query or key tensor.\n    pos : int\n        Current sequence position index.\n    base : float\n        Base frequency scaling constant.\n        \n    Returns\n    -------\n    np.ndarray of same shape as x with rotary position encoding applied.\n    \"\"\"\n    D = x.shape[-1]\n    # Step 1: Retrieve precomputed frequency tables up to current position\n    cos_table, sin_table = precompute_rope_frequencies(D, pos + 1, base=base)\n    cos_m = cos_table[pos]  # shape: (D,)\n    sin_m = sin_table[pos]  # shape: (D,)\n    \n    # Step 2: Apply closed-form 2D rotation formula: x * cos(m*theta) + rotate_half(x) * sin(m*theta)\n    return (x * cos_m) + (rotate_half(x) * sin_m)",
          "testCases": [
            {
              "input": "x = np.array([[[1.0, 0.0]]]); m = 0; apply_rope(x, m)",
              "expected": "1.0"
            },
            {
              "input": "x = np.array([[[0.0, 1.0]]]); m = 0; apply_rope(x, m)",
              "expected": "1.0"
            },
            {
              "input": "cos, sin = precompute_rope_frequencies(4, 2); float(cos.shape[1])",
              "expected": "4.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef precompute_rope_frequencies(dim: int, seq_len: int, base: float = 10000.0) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Precompute cosine and sine frequency matrices for Rotary Position Embedding (RoPE).\n    \n    Parameters\n    ----------\n    dim : int\n        Head dimension (must be an even integer).\n    seq_len : int\n        Maximum sequence length to precompute.\n    base : float\n        Base frequency scaling factor (default 10000.0).\n        \n    Returns\n    -------\n    cos, sin : tuple of np.ndarray of shape (seq_len, dim)\n    \"\"\"\n    # Step 1: Compute theta frequency scale for half dimensions: theta_i = 1 / base^(2i / dim)\n    theta = 1.0 / (base ** (np.arange(0, dim, 2, dtype=np.float32) / dim))\n    \n    # Step 2: Compute outer product of token position indices and theta frequencies: (seq_len, dim // 2)\n    positions = np.arange(seq_len, dtype=np.float32)\n    angles = np.outer(positions, theta)\n    \n    # Step 3: Duplicate angles along last axis to match head dimension: (seq_len, dim)\n    cos = np.repeat(np.cos(angles), 2, axis=-1)\n    sin = np.repeat(np.sin(angles), 2, axis=-1)\n    return cos, sin\n\ndef rotate_half(x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Rotates coordinate pairs: [-x1, x0, -x3, x2, ...].\n    Represents multiplication by imaginary unit i in 2D complex slices.\n    \"\"\"\n    # Step 1: Split even and odd dimension channels\n    x1 = x[..., 0::2]\n    x2 = x[..., 1::2]\n    # Step 2: Interleave negated odd components with original even components\n    rotated = np.stack([-x2, x1], axis=-1)\n    return rotated.reshape(x.shape)\n\ndef apply_rope(x: np.ndarray, pos: int, base: float = 10000.0) -> np.ndarray:\n    \"\"\"\n    Applies Rotary Position Embedding to a query or key tensor x at position index pos.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, H, D) or (B, 1, D)\n        Input query or key tensor.\n    pos : int\n        Current sequence position index.\n    base : float\n        Base frequency scaling constant.\n        \n    Returns\n    -------\n    np.ndarray of same shape as x with rotary position encoding applied.\n    \"\"\"\n    D = x.shape[-1]\n    # Step 1: Retrieve precomputed frequency tables up to current position\n    cos_table, sin_table = precompute_rope_frequencies(D, pos + 1, base=base)\n    cos_m = cos_table[pos]  # shape: (D,)\n    sin_m = sin_table[pos]  # shape: (D,)\n    \n    # Step 2: Apply closed-form 2D rotation formula: x * cos(m*theta) + rotate_half(x) * sin(m*theta)\n    return (x * cos_m) + (rotate_half(x) * sin_m)",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef rotate_half(x: np.ndarray) -> np.ndarray:\n    x1 = x[..., 0::2]\n    x2 = x[..., 1::2]\n    return np.stack([-x2, x1], axis=-1).reshape(x.shape)\n\ndef apply_rope(x: np.ndarray, pos: int, base: float = 10000.0) -> np.ndarray:\n    D = x.shape[-1]\n    theta = 1.0 / (base ** (np.arange(0, D, 2, dtype=np.float32) / D))\n    angles = pos * theta\n    cos_m = np.repeat(np.cos(angles), 2)\n    sin_m = np.repeat(np.sin(angles), 2)\n    return (x * cos_m) + (rotate_half(x) * sin_m)"
        },
        "hints": {
          "tier1": {
            "en": "Pair consecutive dimensions [x0, x1] and rotate by angle m * theta.",
            "ar": "اجمع الأبعاد المتتالية في أزواج ودورها بالزاوية m * theta."
          },
          "tier2": {
            "en": "Use rotate_half(x) to compute the perpendicular component.",
            "ar": "استخدم rotate_half لحساب المركبة المتعامدة."
          },
          "tier3": {
            "en": "Return (x * cos_m) + (rotate_half(x) * sin_m).",
            "ar": "أرجع (x * cos_m) + (rotate_half(x) * sin_m)."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You are deploying a 7B parameter foundation LLM pretrained with standard RoPE at a context window of 4,096 tokens ($b=10\\,000$). Your customer asks you to evaluate a 32,000-token legal brief. When passing prompt positions $m > 4096$ without any positional modifications, the model output degrades into incoherent repetition and gibberish. What is the fundamental mathematical reason for this breakdown, and what is the production-grade architectural remedy?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تضمين المواضع الدوراني (RoPE) والترميزات الجيبية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "RoPE rotation matrices $\\mathbf{R}_{\\Theta, m}$ become non-orthogonal for indices $m > 4096$, causing floating-point overflow during attention dot products.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The model encounters unseen rotation angles $(m\\theta_i)$ where high-frequency components oscillate at phase speeds never experienced during training, causing attention scores to blow up out-of-distribution; RoPE Interpolation (such as YaRN or NTK-aware scaling) downscales the rotation frequencies by a factor of $s = 32000 / 4096$ to map long contexts back into the familiar $[0, 4096]$ angular spectrum.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The causal attention mask cannot be indexed beyond dimension 4096 in GPU memory registers.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "RoPE only supports powers-of-two sequence lengths, so 32,000 fails arithmetic division by head dimension $d$.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "decoder-only-gpt-transformer",
    "title": "Autoregressive Decoder-Only GPT Transformer Architecture",
    "titleAr": "معمارية المحولات التوليدية المفككة فقط (GPT) ذاتية الانحدار",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While the original 2017 Transformer architecture featured an encoder-decoder topology engineered specifically for bidirectional translation...",
      "ar": "بينما صُممت محولات عام 2017 الأصلية بهيكل مزدوج (مشفّر ومفكّك) مخصص للترجمة الآلية بين لغتين، استقرت نماذج الذكاء الاصطناعي التوليدي..."
    },
    "prerequisites": [
      "positional-encoding-sinusoidal-rope",
      "causal-masking-scaled-dot-product"
    ],
    "x": 1130,
    "y": 2265,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "While the original 2017 Transformer architecture featured an encoder-decoder topology engineered specifically for bidirectional translation tasks, contemporary generative foundation models (GPT-4, Claude, LLaMA 2/3, Mistral, Gemma) converged completely on the **Decoder-Only** paradigm. This architectural unification is grounded in the foundational objective of causal language modeling: next-token prediction, where the joint probability distribution over any arbitrary sequence factorizes strictly autoregressively as $P(x_1, x_2, \\dots, x_T) = \\prod_{t=1}^T P(x_t \\mid x_1, \\dots, x_{t-1})$. By eliminating the cross-attention bridge between separate encoder and decoder stacks, the decoder-only model maximizes parameter utilization and GPU hardware compute density.\n\nIn a decoder-only architecture, every token at position $t$ is strictly prevented from attending to future tokens $j > t$ through an upper-triangular **causal attention mask** where illegal future attention logits are set to $-\\infty$. This causal constraint provides an extraordinary computational superpower during pretraining: although autoregressive text generation is inherently sequential token-by-token at inference time, training is completely parallel! The entire context of thousands of tokens is ingested in a single matrix forward pass, evaluating all $T$ next-token predictions simultaneously across the full sequence.\n\nCrucially, modern frontier LLMs universally adopt **Pre-LayerNorm (Pre-LN)** or **Pre-RMSNorm**: normalization is applied *prior* to self-attention and feedforward sub-layers rather than after them. In the original 2017 Post-LN design, the normalization layer was placed directly on the residual path ($\\mathbf{x} \\leftarrow \\text{LN}(\\mathbf{x} + \\text{Sublayer}(\\mathbf{x}))$). In Pre-LN, the residual stream remains an unnormalized, clean identity highway: $\\mathbf{x}^{(l)} = \\mathbf{x}^{(l-1)} + \\text{Sublayer}(\\text{Norm}(\\mathbf{x}^{(l-1)}))$.\n\n> **Frontier Analogy:** Envision a high-speed automotive assembly line conveyor belt. Each technician station inspects only the parts already assembled on the belt upstream (causal masking), crafts an upgrade, and gently fastens it onto the moving chassis without stopping or redirecting the main conveyor belt (the residual highway). The car chassis glides continuously down an express lane, accumulating upgrades from 100 consecutive stations without ever encountering a bottleneck or roadblock.\n\nMathematically, this Pre-LN identity formulation ensures that the final representation is a direct sum of initial token embeddings and sub-layer outputs: $\\mathbf{x}^{(L)} = \\mathbf{x}^{(0)} + \\sum_{l=1}^L \\Delta_l$. When backpropagating error gradients from the top loss layer down to the input embeddings, the gradient $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}^{(0)}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}^{(L)}} \\left(\\mathbf{I} + \\sum_{l=1}^L \\frac{\\partial \\Delta_l}{\\partial \\mathbf{x}^{(0)}}\\right)$ contains an unobstructed identity term $\\mathbf{I}$. This eliminates gradient vanishing or explosion, enabling the stable training of models with hundreds of layers without hyperparameter-sensitive learning rate warmup gymnastics.",
          "ar": "بينما صُممت محولات عام 2017 الأصلية بهيكل مزدوج (مشفّر ومفكّك) مخصص للترجمة الآلية بين لغتين، استقرت نماذج الذكاء الاصطناعي التوليدي الرائدة الحديثة بالكامل على معمارية \"المفكك فقط\" (Decoder-Only). يرتكز هذا التوحيد المعماري على الهدف الجوهري لنماذج اللغة الكبيرة: التنبؤ السببي بالرمز التالي عبر التحليل الذاتي الانحدار، حيث يتحلل التوزيع الاحتمالي المشترك للسلسلة النصية إلى جداء احتمالات شرطية صارمة تعتمد حصراً على الرموز السابقة.\n\nتفرض هذه المعمارية حجباً سببيّاً مثلثياً علوياً يمنع كلياً تسرب معلومات المستقبل أثناء التدريب المتوازي؛ حيث تُستبدل قيم درجات الانتباه للرموز المستقبلية بقيمة $-\\infty$ قبل حساب دالة Softmax. تمنح هذه الآلية ميزة هندسية فائقة أثناء التدريب: فرغم أن التوليد أثناء الاستدلال يتم بصورة متسلسلة رمزاً تلو الآخر، إلا أن التدريب يتم بتوازٍ كامل وفوري لكافة الرموز في خطوة واحدة، مما يتيح استغلال كامل القدرة الحاسوبية لبطاقات الرسوميات.\n\nعلاوة على ذلك، تعتمد كافة المحولات الحديثة نمط \"التطبيع المسبق\" (Pre-LN / Pre-RMSNorm)، حيث يُطبق التطبيع قبل دخول الإشارة إلى طبقات الانتباه والتغذية الأمامية، بدلاً من وضعه على المسار المتبقي كما كان في المعماريات القديمة (Post-LN). يضمن هذا التصميم بقاء مسار التدفق المتبقي نقياً ومباشراً دون عوائق حسابية، مشكلاً طريقاً سريعة حقيقية لنقل المعلومات.\n\nيشبه هذا النظام خط تجميع سيارات فائق السرعة يسير على حزام ناقل متصل: يقوم الفني في كل محطة بفحص القطع المركبة مسبقاً فقط (الحجب السببي)، وتصنيع ترقية محددة، ثم تثبيتها برفق على هيكل السيارة المار دون إيقاف الحزام الناقل الرئيسي إطلاقاً. تضمن هذه الصياغة الرياضية انسياب تدرجات التعلم العكسية من الطبقة المائة إلى الطبقة الأولى مباشرة ودون أي تلاشٍ أو انفجار رقمي، مما أتاح تدريب أضخم النماذج المعاصرة باستقرار تام."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{h}^{(l)\\prime} = \\mathbf{h}^{(l-1)} + \\text{CausalMHA}\\left(\\text{RMSNorm}(\\mathbf{h}^{(l-1)})\\right)",
        "formulaNote": {
          "en": "Pre-LayerNorm decoder block with causal multi-head self-attention.",
          "ar": "كتلة مفكك بالتطبيع المسبق مع انتباه ذاتي سببي متعدد الرؤوس."
        },
        "narrative": {
          "en": "$$\n\\mathbf{h}^{(l)} = \\mathbf{h}^{(l)\\prime} + \\text{FFN}\\left(\\text{RMSNorm}(\\mathbf{h}^{(l)\\prime})\\right)\n$$\n\nWhere the causal attention operation enforces temporal causality via mask $\\mathbf{M}$:\n\n$$\n\\mathbf{M}_{ij} = \\begin{cases} 0 & \\text{if } j \\le i \\\\ -\\infty & \\text{if } j > i \\end{cases}, \\quad \\text{Attn}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}} + \\mathbf{M}\\right)\\mathbf{V}\n$$\n\nAfter passing through $L$ stacked blocks, the contextual representation is normalized and projected to vocabulary logits via the unembedding matrix:\n\n$$\nP(x_{t+1} \\mid x_{\\le t}) = \\text{softmax}\\left(\\mathbf{W}_{\\text{unembed}} \\cdot \\text{RMSNorm}\\left(\\mathbf{h}_t^{(L)}\\right)\\right)\n$$\n\nAnd the backpropagation gradient directly exploits the uninterrupted identity highway:\n\n$$\n\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}^{(0)}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}^{(L)}} \\left( \\mathbf{I} + \\sum_{l=1}^L \\frac{\\partial \\Delta_l}{\\partial \\mathbf{h}^{(0)}} \\right)\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{h}^{(l-1)}$ | $\\mathbb{R}^{B \\times T \\times d}$ | Hidden state activations entering layer $l$ | The main conveyor belt carrying token representations through depth. |\n| $\\text{RMSNorm}(\\cdot)$ | $\\mathbb{R}^d \\to \\mathbb{R}^d$ | Root Mean Square feature normalization | Stabilizes variance along the channel dimension without costly mean-centering. |\n| $\\text{CausalMHA}(\\cdot)$ | $\\mathbb{R}^{B \\times T \\times d} \\to \\mathbb{R}^{B \\times T \\times d}$ | Multi-Head Attention with causal mask $\\mathbf{M}$ | Gathers contextual evidence strictly from current and past token positions. |\n| $\\mathbf{M} \\in \\mathbb{R}^{T \\times T}$ | Upper triangular matrix ($-\\infty$ above diagonal) | Causal autoregressive mask | Enforces the direction of time; zeroes out future token visibility in softmax. |\n| $\\mathbf{h}^{(l)\\prime}$ | $\\mathbb{R}^{B \\times T \\times d}$ | Intermediate hidden state after attention | First residual highway addition preserving identity gradient paths. |\n| $\\text{FFN}(\\cdot)$ | $\\mathbb{R}^d \\to \\mathbb{R}^d$ | Feedforward sub-layer (GELU or SwiGLU) | Performs non-linear factual memory retrieval and feature transformation. |\n| $\\mathbf{h}_t^{(L)}$ | $\\mathbb{R}^d$ | Final layer hidden state for token $t$ | Fully contextualized representation synthesized across all $L$ layers. |\n| $\\mathbf{W}_{\\text{unembed}}$ | $\\mathbb{R}^{V \\times d}$ | Language model unembedding projection | Maps deep continuous representations to raw logits across vocabulary size $V$. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement a complete, stable Pre-RMSNorm Transformer Decoder block with causal self-attention and residual highways.",
          "ar": "تسمح هذه البنية بتدريب مليارات المعاملات بتوازٍ هائل عبر استغلال كامل الذاكرة التخزينية أثناء مرحلة الملء الأولي (Prefill)، وتوليد الإجابات تدريجياً رمزاً تلو الآخر أثناء مرحلة الاستدلال (Generation)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-decoder-only-gpt-transformer",
          "starterCode": "def rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    \"\"\"RMSNorm across the last dimension without mean centering.\"\"\"\n    # Step 1: Compute scaled attention logits: (B, T, T)\n    # Step 2: Construct upper-triangular causal mask where col > row is -inf\n    # Step 3: Numerically stable softmax along the last dimension\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.ones((1, 4, 8)); forward_gpt_block(x)",
              "expected": "1.0"
            },
            {
              "input": "x = np.zeros((1, 4, 8)); forward_gpt_block(x)",
              "expected": "0.0"
            },
            {
              "input": "x = np.ones((2, 2, 4)); out = forward_gpt_block(x); float(out.shape[-1])",
              "expected": "4.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    \"\"\"RMSNorm across the last dimension without mean centering.\"\"\"\n    # Step 1: Compute scaled attention logits: (B, T, T)\n    # Step 2: Construct upper-triangular causal mask where col > row is -inf\n    # Step 3: Numerically stable softmax along the last dimension\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    \"\"\"RMSNorm across the last dimension without mean centering.\"\"\"\n    variance = np.mean(x ** 2, axis=-1, keepdims=True)\n    return x / np.sqrt(variance + eps)\n\ndef causal_attention(q: np.ndarray, k: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Scaled dot-product attention with strict lower-triangular causal masking.\n    Shapes: (B, T, D)\n    \"\"\"\n    B, T, D = q.shape\n    scale = 1.0 / np.sqrt(D)\n    # Step 1: Compute scaled attention logits: (B, T, T)\n    scores = np.matmul(q, k.swapaxes(-1, -2)) * scale\n    \n    # Step 2: Construct upper-triangular causal mask where col > row is -inf\n    mask = np.triu(np.full((T, T), -np.inf), k=1)\n    scores = scores + mask\n    \n    # Step 3: Numerically stable softmax along the last dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # Step 4: Multiply attention probabilities by Values: (B, T, D)\n    return np.matmul(attn_weights, v)\n\ndef forward_gpt_block(x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Executes a single Pre-LayerNorm / Pre-RMSNorm Transformer Decoder block.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, T, D)\n        Input token representations.\n        \n    Returns\n    -------\n    np.ndarray of shape (B, T, D)\n        Updated token representations after residual connections.\n    \"\"\"\n    B, T, D = x.shape\n    \n    # Step 1: Apply Pre-RMSNorm to input tensor x before attention\n    norm_x1 = rms_norm(x)\n    \n    # Step 2: Compute Causal Self-Attention (using identity projections for validation)\n    attn_out = causal_attention(norm_x1, norm_x1, norm_x1)\n    \n    # Step 3: Add to residual highway 1\n    h = x + attn_out\n    \n    # Step 4: Apply Pre-RMSNorm to intermediate state h before feedforward network\n    norm_h = rms_norm(h)\n    \n    # Step 5: Compute non-linear MLP transformation (ReLU activation) and add to residual highway 2\n    mlp_out = np.maximum(0, norm_h)\n    out = h + mlp_out\n    \n    return out"
        },
        "hints": {
          "tier1": {
            "en": "Normalize before passing into attention and MLP sub-layers.",
            "ar": "قم بالتطبيع قبل الدخول إلى طبقات الانتباه والتغذية الأمامية."
          },
          "tier2": {
            "en": "Add the unnormalized input x as a residual connection.",
            "ar": "أضف المدخل غير المعاير كوصلة متبقية."
          },
          "tier3": {
            "en": "Compute h = x + sublayer(norm(x)).",
            "ar": "احسب h = x + sublayer(norm(x))."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Autoregressive Decoder-Only GPT Transformer Architecture under practical constraints?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ معمارية المحولات التوليدية المفككة فقط (GPT) ذاتية الانحدار تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Post-LN requires doubling the hidden dimension $d$, causing tensor core memory alignment faults.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "In Post-LN, gradients passing through the residual connection are repeatedly scaled by the derivative of LayerNorm at every layer; across 100 layers, this compounds exponentially, leading to vanishing gradients in early layers and exploding gradients near the output. In Pre-LN, the residual connection is an unnormalized identity map $\\mathbf{x}^{(L)} = \\mathbf{x}^{(0)} + \\sum_{l=1}^L \\text{Sublayer}(\\text{LN}(\\mathbf{x}^{(l-1)}))$, ensuring gradient signals propagate directly from layer $L$ to layer $0$ without decay.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Post-LN cannot be executed on GPUs with tensor cores due to FP16 underflow in softmax denominators.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Post-LN introduces cyclical graph dependencies that violate reverse-mode automatic differentiation.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "kv-caching-autoregressive-generation",
    "title": "Key-Value (KV) Caching & Autoregressive Inference Generation",
    "titleAr": "التخزين المؤقت للمفاتيح والقيم (KV Caching) والتوليد ذاتي الانحدار",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "During LLM pretraining, computation is parallelized across all $T$ tokens simultaneously via the causal triangular mask.",
      "ar": "في مرحلة الاستدلال وتوليد النصوص الحية، تُنتج النماذج اللغوية الكلمات رمزاً تلو الآخر بصورة تتابعية ذاتية الانحدار؛ حيث يتطلب التنبؤ بالرمز..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer"
    ],
    "x": 1145,
    "y": 2360,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "During LLM pretraining, computation is parallelized across all $T$ tokens simultaneously via the causal triangular mask. However, during real-world inference generation, tokens are produced strictly one by one in an autoregressive feedback loop: to predict token $t+1$, the model requires the sampled output of token $t$. This fundamental duality separates transformer execution into two distinct regimes: the compute-bound **Prefill phase** (processing the user prompt in parallel) and the memory-bandwidth-bound **Decode phase** (generating tokens sequentially).\n\nIn a naive implementation without state caching, generating token $t+1$ requires feeding all preceding $t$ tokens back into the network as a sequence of length $t$. Across all transformer layers, the linear projections for Query ($\\mathbf{Q}$), Key ($\\mathbf{K}$), and Value ($\\mathbf{V}$) are recalculated from scratch for every past token—even though the contextual representations and past keys and values for tokens $1, \\dots, t-1$ never change! This naive recomputation forces the GPU to perform $\\mathcal{O}(T^2)$ total matrix operations over a sequence of length $T$, resulting in crippling latency that grows worse with every generated word.\n\n**Key-Value (KV) Caching** solves this computational bottleneck by persisting the computed $\\mathbf{K}$ and $\\mathbf{V}$ tensor activations across past decoding steps directly in GPU High-Bandwidth Memory (HBM). When the new token $x_t$ arrives at step $t$, the model projects only this single token into its current vectors $\\mathbf{q}_t, \\mathbf{k}_t, \\mathbf{v}_t$ ($\\text{Sequence Length } = 1$). It then appends $\\mathbf{k}_t$ and $\\mathbf{v}_t$ to the persistent cache and attends over the full accumulated history.\n\n> **Frontier Analogy:** KV caching is like keeping scratch notes on an index card so you don't re-read the entire book from scratch on every single word. When writing the next word in an essay, you only reference your scratchpad of past key ideas and summary points, appending a single bullet point for the latest sentence rather than re-reading all 500 preceding pages from word one.\n\nWhile KV caching dramatically cuts projection compute from $\\mathcal{O}(T^2)$ down to $\\mathcal{O}(T)$, it creates a formidable secondary engineering challenge: the **KV Cache Memory Wall**. Because the cached tensors must be retained in fast VRAM for every active user request across every attention layer and head, serving large batches of users with long context windows quickly consumes hundreds of gigabytes of GPU memory, turning modern LLM inference into a memory-capacity and memory-bandwidth bound workload.",
          "ar": "في مرحلة الاستدلال وتوليد النصوص الحية، تُنتج النماذج اللغوية الكلمات رمزاً تلو الآخر بصورة تتابعية ذاتية الانحدار؛ حيث يتطلب التنبؤ بالرمز $t+1$ الحصول أولاً على الرمز المولد في الخطوة السابقة $t$. يقسم هذا الواقع الحسابي تشغيل المحولات إلى مرحلتين متمايزتين: مرحلة \"الملء الأولي\" (Prefill) التي تعالج مدخلات المستخدم دفعة واحدة بتوازٍ كامل، ومرحلة \"فك التشفير\" (Decode) التكرارية المتسلسلة.\n\nفي التنفيذ الساذج غير المحسن، تضطر كل خطوة زمنية إلى إعادة حساب متجهات الاستعلام والمفاتيح والقيم لجميع الرموز السابقة من البداية، على الرغم من أن المتجهات المحسوبة للرموز السابقة $1, \\dots, t-1$ ثابتة ولا تتغير قيمتها الرياضية قط! يؤدي هذا التكرار العبثي إلى رفع التعقيد الحسابي الإجمالي إلى $\\mathcal{O}(T^2)$ ويهدر طاقة المعالجة في تكرار حسابات متطابقة، مما يجعل زمن الاستجابة يتفاقم مع كل كلمة جديدة.\n\nتقنية **التخزين المؤقت للمفاتيح والقيم (KV Caching)** تعالج هذا الخلل الجوهري عبر الاحتفاظ بحالات متجهات $\\mathbf{K}$ و$\\mathbf{V}$ المحسوبة في الخطوات السابقة مباشرة في الذاكرة السريعة للبطاقة الرسومية (HBM). وعند توليد الرمز الجديد في الخطوة $t$، نقوم بحساب الاستعلام والمفتاح والقيمة للرمز الحالي فقط بطول تسلسل يساوي 1، ثم نلحق المفتاح والقيمة الجدد بمصفوفات الذاكرة التراكمية، مما يختزل العمليات الحسابية إلى زمن خطي $\\mathcal{O}(T)$.\n\nيشبه التخزين المؤقت للمفاتيح والقيم تدوين ملاحظات موجزة في مسودتك الجانبية حتى لا تضطر إلى إعادة قراءة الكتاب بأكمله من الصفحة الأولى عند كتابة كل كلمة جديدة! فعند صياغة فكرة جديدة، ترجع إلى مسودة النقاط المحورية السابقة وتضيف سطراً واحداً فقط للمفاهيم المستجدة، بدلاً من قراءة 500 صفحة من جديد في كل مرة، مما يرفع كفاءة التوليد إلى مستويات قياسية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{K}_{\\text{cached}}^{(t)} = \\begin{bmatrix} \\mathbf{K}_{\\text{cached}}^{(t-1)} \\\\ \\mathbf{k}_t \\end{bmatrix} \\in \\mathbb{R}^{t \\times d_k}, \\quad \\mathbf{V}_{\\text{cached}}^{(t)} = \\begin{bmatrix} \\mathbf{V}_{\\text{cached}}^{(t-1)} \\\\ \\mathbf{v}_t \\end{bmatrix} \\in \\mathbb{R}^{t \\times d_v}",
        "formulaNote": {
          "en": "Autoregressive single-query attention over concatenated persistent KV cache.",
          "ar": "انتباه الاستعلام المنفرد ذاتي الانحدار على ذاكرة المفاتيح والقيم المتراكمة."
        },
        "narrative": {
          "en": "Where the current token projections are computed for a single position:\n\n$$\n\\mathbf{q}_t = \\mathbf{x}_t \\mathbf{W}_Q \\in \\mathbb{R}^{1 \\times d_k}, \\quad \\mathbf{k}_t = \\mathbf{x}_t \\mathbf{W}_K \\in \\mathbb{R}^{1 \\times d_k}, \\quad \\mathbf{v}_t = \\mathbf{x}_t \\mathbf{W}_V \\in \\mathbb{R}^{1 \\times d_v}\n$$\n\nThe single-token attention context vector is retrieved across the accumulated historical cache:\n\n$$\n\\mathbf{a}_t = \\text{softmax}\\left(\\frac{\\mathbf{q}_t \\left(\\mathbf{K}_{\\text{cached}}^{(t)}\\right)^T}{\\sqrt{d_k}}\\right) \\mathbf{V}_{\\text{cached}}^{(t)} \\in \\mathbb{R}^{1 \\times d_v}\n$$\n\nThe cumulative memory consumption in GPU High-Bandwidth Memory (HBM) scales linearly with sequence length and batch size:\n\n$$\n\\text{Memory}_{\\text{KV}} = 2 \\times 2 \\times n_{\\text{layers}} \\times n_{\\text{heads}} \\times d_{\\text{head}} \\times T \\times B \\quad \\text{(bytes in 16-bit precision)}\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_t$ | $\\mathbb{R}^{1 \\times d}$ | Embedding of newest single token at time $t$ | Input token entering decoder layer at current step. |\n| $\\mathbf{q}_t$ | $\\mathbb{R}^{1 \\times d_k}$ | Query vector for newest token | Searches against entire historical memory bank. |\n| $\\mathbf{k}_t, \\mathbf{v}_t$ | $\\mathbb{R}^{1 \\times d_k}, \\mathbb{R}^{1 \\times d_v}$ | Key and Value vectors for newest token | New state vectors appended to the persistent cache. |\n| $\\mathbf{K}_{\\text{cached}}^{(t)}$ | $\\mathbb{R}^{t \\times d_k}$ | Accumulated historical keys across positions $1 \\dots t$ | Serves as the addressable catalog for attention dot products. |\n| $\\mathbf{V}_{\\text{cached}}^{(t)}$ | $\\mathbb{R}^{t \\times d_v}$ | Accumulated historical values across positions $1 \\dots t$ | Contains content payload vectors retrieved by softmax weights. |\n| $\\mathbf{a}_t$ | $\\mathbb{R}^{1 \\times d_v}$ | Single-token context output vector | Context vector passed to output projection matrix $\\mathbf{W}_O$. |\n| $2 \\times 2$ | Constant | 2 matrices ($\\mathbf{K}$ and $\\mathbf{V}$) $\\times$ 2 bytes per element | Memory multiplier for FP16 / BF16 numerical precision. |\n| FLOPs per step | Complexity | Reduced from $\\mathcal{O}(t \\cdot d^2)$ down to $\\mathcal{O}(1 \\cdot d^2)$ | Projections are computed for 1 token instead of $t$ tokens. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `kv_cache_decoder_step` to perform a single autoregressive decoding step: projecting the incoming token, appending to historical KV caches, and computing single-query attention.",
          "ar": "توضح هذه المعادلات الرياضية كيف يتحول التوليد ذاتي الانحدار من مسألة مقيدة بالمعالجة الحسابية (Compute-Bound) إلى مسألة مقيدة بسعة ونطاق الذاكرة (Memory-Bandwidth Bound)؛ حيث يقرأ المعالج غيغابايت من مصفوفات الذاكرة في كل خطوة لإجراء عمليات ضرب مصفوفية بسيطة ذات كثافة حسابية منخفضة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-kv-caching-autoregressive-generation",
          "starterCode": "def kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray,\n    W_k: np.ndarray,\n    W_v: np.ndarray,\n    W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes an autoregressive step for a single token using KV Caching.\n    \n    Parameters\n    ----------\n    x_t : np.ndarray of shape (B, 1, D)\n        New input token embedding at time step t.\n    k_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached key states from previous generation steps.\n    v_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached value states from previous generation steps.\n    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)\n        Projection weight matrices.\n        \n    Returns\n    -------\n    out_t : np.ndarray of shape (B, 1, D)\n        Attention output for current token.\n    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)\n        Updated KV cache containing historical + new keys and values.\n    \"\"\"\n    # Step 1: Project single current token into Q, K, V representations: shape (B, 1, D)\n    # Step 2: Append new key and value vectors to historical cache along sequence dimension\n    # Step 3: Compute scaled dot-product attention logits: (B, 1, D) @ (B, D, t) -> (B, 1, t)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, None, None, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])",
              "expected": "1.0"
            },
            {
              "input": "x = np.ones((1, 1, 4)); k_prev = np.ones((1, 1, 4)); v_prev = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, k_prev, v_prev, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])",
              "expected": "2.0"
            },
            {
              "input": "x = np.ones((1, 1, 4)); k_prev = np.ones((1, 2, 4)); v_prev = np.ones((1, 2, 4)); out, k, v = kv_cache_decoder_step(x, k_prev, v_prev, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(out.shape[-1])",
              "expected": "4.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray,\n    W_k: np.ndarray,\n    W_v: np.ndarray,\n    W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes an autoregressive step for a single token using KV Caching.\n    \n    Parameters\n    ----------\n    x_t : np.ndarray of shape (B, 1, D)\n        New input token embedding at time step t.\n    k_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached key states from previous generation steps.\n    v_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached value states from previous generation steps.\n    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)\n        Projection weight matrices.\n        \n    Returns\n    -------\n    out_t : np.ndarray of shape (B, 1, D)\n        Attention output for current token.\n    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)\n        Updated KV cache containing historical + new keys and values.\n    \"\"\"\n    # Step 1: Project single current token into Q, K, V representations: shape (B, 1, D)\n    # Step 2: Append new key and value vectors to historical cache along sequence dimension\n    # Step 3: Compute scaled dot-product attention logits: (B, 1, D) @ (B, D, t) -> (B, 1, t)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray,\n    W_k: np.ndarray,\n    W_v: np.ndarray,\n    W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes an autoregressive step for a single token using KV Caching.\n    \n    Parameters\n    ----------\n    x_t : np.ndarray of shape (B, 1, D)\n        New input token embedding at time step t.\n    k_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached key states from previous generation steps.\n    v_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached value states from previous generation steps.\n    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)\n        Projection weight matrices.\n        \n    Returns\n    -------\n    out_t : np.ndarray of shape (B, 1, D)\n        Attention output for current token.\n    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)\n        Updated KV cache containing historical + new keys and values.\n    \"\"\"\n    B, _, D = x_t.shape\n    \n    # Step 1: Project single current token into Q, K, V representations: shape (B, 1, D)\n    q_t = np.dot(x_t, W_q)\n    k_t = np.dot(x_t, W_k)\n    v_t = np.dot(x_t, W_v)\n    \n    # Step 2: Append new key and value vectors to historical cache along sequence dimension\n    if k_cache is None or k_cache.size == 0:\n        k_updated = k_t\n        v_updated = v_t\n    else:\n        k_updated = np.concatenate([k_cache, k_t], axis=1)\n        v_updated = np.concatenate([v_cache, v_t], axis=1)\n        \n    # Step 3: Compute scaled dot-product attention logits: (B, 1, D) @ (B, D, t) -> (B, 1, t)\n    d_k = float(D)\n    scores = np.matmul(q_t, k_updated.swapaxes(-1, -2)) / np.sqrt(d_k)\n    \n    # Step 4: Numerically stable softmax across historical token dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # Step 5: Aggregate cached value representations and project to output: (B, 1, t) @ (B, t, D) -> (B, 1, D)\n    context = np.matmul(attn_weights, v_updated)\n    out_t = np.dot(context, W_o)\n    \n    return out_t, k_updated, v_updated"
        },
        "hints": {
          "tier1": {
            "en": "Project only the new token x_t (shape 1, 1, D).",
            "ar": "قم بإسقاط الرمز الجديد فقط x_t (بشكل 1, 1, D)."
          },
          "tier2": {
            "en": "Concatenate along axis 1: np.concatenate([k_cache, k_t], axis=1).",
            "ar": "اجمع المصفوفات على المحور 1 عبر np.concatenate."
          },
          "tier3": {
            "en": "Compute scaled dot product between q_t and updated k_cache.",
            "ar": "احسب الجداء النقطي المقاس بين q_t وذاكرة المفاتيح المحدثة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You are serving a 70B parameter model (80 layers, 64 attention heads, head dimension $d_k = 128$) to a batch of $B = 32$ concurrent users. Each user generates up to $T = 4\\,096$ tokens in FP16 precision. Your operations team reports that although GPU compute matrix utilization is under 25%, generation throughput drops precipitously and requests begin encountering Out-Of-Memory (OOM) errors. What is the root cause?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التخزين المؤقت للمفاتيح والقيم (KV Caching) والتوليد ذاتي الانحدار تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The GPU compute matrix cores suffer thermal throttling due to constant dense matrix multiplications.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The KV cache footprint scales linearly with context length and batch size: calculating $2 \\times 2 \\times 80 \\times 64 \\times 128 \\times 4096 \\times 32 \\approx 171.8 \\text{ GB}$ reveals that the KV cache alone exceeds the total VRAM of two 80GB A100 GPUs! Because token generation reads the entire KV cache on every single token step for a minimal arithmetic workload ($T=1$), decoding becomes heavily **memory-bandwidth bound**.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Softmax denominators underflow to zero when computing attention across 4,096 historical tokens.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Causal triangular masking requires quadratic cache storage in CPU host memory.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "grouped-query-attention-gqa",
    "title": "Grouped-Query Attention (GQA) & Multi-Query Attention (MQA)",
    "titleAr": "انتباه الاستعلامات المجمعة (GQA) وانتباه الاستعلام المتعدد (MQA)",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "As context windows expanded from 2,048 tokens in GPT-3 to 32,768, 128,000, and even 1,000,000 tokens in modern frontier foundation models,...",
      "ar": "مع اتساع نوافذ السياق إلى عشرات ومئات الآلاف من الرموز في النماذج اللغوية الحديثة، أصبح \"جدار ذاكرة التخزين المؤقت للمفاتيح والقيم\" العائق..."
    },
    "prerequisites": [
      "kv-caching-autoregressive-generation"
    ],
    "x": 1125,
    "y": 2455,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "As context windows expanded from 2,048 tokens in GPT-3 to 32,768, 128,000, and even 1,000,000 tokens in modern frontier foundation models, the **KV Cache Memory Wall** became the single greatest bottleneck in production LLM inference serving. In classical Multi-Head Attention (MHA), every single query head possesses its own dedicated key and value head ($H_Q = H_{KV}$). For a model with 64 attention heads, 64 distinct Key matrices and 64 distinct Value matrices must be allocated in GPU memory and read across the memory bus for every single generated token.\n\nIn 2019, Google researcher Noam Shazeer proposed **Multi-Query Attention (MQA)** to alleviate this bottleneck: all $H_Q$ query heads share a *single* Key-Value head pair ($H_{KV} = 1$). While MQA dramatically slashes KV cache memory consumption and memory bandwidth by a factor of $H_Q \\times$ (an astounding $64\\times$ reduction), this extreme compression often degrades model reasoning capacity, multi-entity tracking, and fine-grained attention expressivity on complex synthetic benchmarks.\n\n**Grouped-Query Attention (GQA)**, introduced by Joshua Ainslie et al. (2023), established the Pareto-optimal architectural sweet spot now universally adopted across frontier models such as LLaMA 2/3, Mistral, and Gemma. Instead of an all-or-nothing trade-off, GQA partitions the $H_Q$ query heads into $G = H_{KV}$ equal groups. Each group of query heads shares a single Key-Value head projection ($1 < H_{KV} < H_Q$). For instance, a model with 64 query heads grouped into 8 KV heads ($G=8$) achieves an $8\\times$ reduction in KV cache memory footprint with virtually indistinguishable perplexity compared to standard full MHA.\n\n> **Frontier Analogy:** Think of classroom tutoring. Standard MHA is like hiring a dedicated private tutor for every single student (high quality, but financially unsustainable). MQA is like assigning one overwhelmed tutor to teach 32 students at once (cheap, but quality drops). GQA organizes students into 8 study groups of 4 students, each guided by a specialized tutor—maintaining high-touch pedagogical quality while drastically reducing costs.\n\nDuring autoregressive inference decoding, GQA dramatically boosts hardware efficiency. Because memory bandwidth rather than arithmetic compute is the primary constraint, reducing the number of bytes that must be streamed from HBM into on-chip cache allows the GPU to decode tokens up to $4\\times$ to $6\\times$ faster while enabling significantly larger serving batch sizes on the same physical hardware cluster.",
          "ar": "مع اتساع نوافذ السياق إلى عشرات ومئات الآلاف من الرموز في النماذج اللغوية الحديثة، أصبح \"جدار ذاكرة التخزين المؤقت للمفاتيح والقيم\" العائق الأساسي الذي يقيد سعة الخوادم وسرعة الاستدلال في بيئات الإنتاج الحية. في انتباه الرؤوس المتعددة الكلاسيكي (MHA)، يمتلك كل رأس استعلام رأساً مخصصاً ومستقلاً للمفاتيح والقيم ($H_Q = H_{KV}$). هذا يعني أنه لنموذج يحتوي على 64 رأساً، يجب تخزين واسترجاع 64 مصفوفة مختلفة من الذاكرة في كل خطوة توليد لرمز واحد.\n\nقدمت أبحاث غوغل عام 2019 تقنية **انتباه الاستعلام المتعدد (MQA)** كحل جذري: حيث تشترك كافة رؤوس الاستعلام في رأس مفاتيح وقيم وحيد ($H_{KV} = 1$). ورغم أن هذا التصميم قلص حجم الذاكرة بمعامل مذهل يصل إلى $64\\times$، إلا أنه تسبب في تراجع ملحوظ في دقة النموذج وقدرته على الاستدلال المنطقي وتتبع الكيانات المتعددة في المهام المعقدة.\n\nابتكر الباحثون معمارية **انتباه الاستعلامات المجمعة (GQA)** في عام 2023 كحل هندسي متوازن تبنته كبرى النماذج العالمية مثل LLaMA 3 وMistral: حيث تُقسم رؤوس الاستعلام إلى مجموعات متساوية، تشترك كل مجموعة منها في زوج واحد من رؤوس المفاتيح والقيم ($1 < H_{KV} < H_Q$). فإذا كان لدينا 64 رأس استعلام مقسمة إلى 8 مجموعات تشترك في 8 رؤوس مفاتيح وقيم، ينخفض استهلاك الذاكرة وحركة البيانات بنسبة $8\\times$ مع الحفاظ على الأداء التوليدي المتميز ومطابقة دقة MHA الكلاسيكية بدقة متناهية.\n\nيشبه هذا النظام مجموعات الدراسة التفاعلية: ففي حين يتطلب النظام الكلاسيكي معلماً خاصاً لكل طالب على حدة (مكلف للغاية في الموارد)، ويفرض نظام MQA معلماً واحداً لثلاثين طالباً (مما يخفض جودة الاستيعاب)، ينظم نظام GQA الطلاب في 8 مجموعات تخصصية يشرف على كل منها معلم بارع؛ مما يوفر توازناً مثالياً بين الكفاءة العالية وجودة التعلم الفائقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "r = \\frac{H_Q}{H_{KV}}, \\quad \\text{head}_{g, i} = \\text{softmax}\\left(\\frac{\\mathbf{q}_{g, i} \\mathbf{k}_g^T}{\\sqrt{d_k}}\\right) \\mathbf{v}_g",
        "formulaNote": {
          "en": "Grouped-Query Attention head replication and KV cache memory reduction ratio.",
          "ar": "تكرار رؤوس انتباه الاستعلامات المجمعة ونسبة تخفيض ذاكرة المفاتيح والقيم."
        },
        "narrative": {
          "en": "All $H_Q$ contextualized heads are then concatenated and projected back to the hidden model dimension:\n\n$$\n\\text{Output} = \\left[ \\text{head}_{1, 1} \\mathbin{\\Vert} \\dots \\mathbin{\\Vert} \\text{head}_{1, r} \\mathbin{\\Vert} \\dots \\mathbin{\\Vert} \\text{head}_{H_{KV}, r} \\right] \\mathbf{W}_O\n$$\n\nThe memory footprint and HBM transfer bandwidth are scaled down by the compression ratio:\n\n$$\n\\text{Memory Compression Ratio} = \\frac{H_{KV}}{H_Q} = \\frac{1}{r}\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $H_Q$ | $\\mathbb{Z}^+$ | Total number of Query attention heads | Dictates the diversity and expressivity of questions the model can ask. |\n| $H_{KV}$ | $\\mathbb{Z}^+$ | Total number of Key and Value attention heads | Dictates the number of distinct memory streams stored in the KV cache. |\n| $r = H_Q / H_{KV}$ | $\\mathbb{Z}^+$ | Head repetition / expansion ratio | Number of query heads that share the same key-value projection pair. |\n| $\\mathbf{q}_{g, i}$ | $\\mathbb{R}^{T \\times d_k}$ | Query projection for head $i$ inside group $g$ | Emits distinct query representations for specialized contextual search. |\n| $\\mathbf{k}_g, \\mathbf{v}_g$ | $\\mathbb{R}^{S \\times d_k}$ | Shared Key and Value representations for group $g$ | Reused across all $r$ queries in group $g$, eliminating redundant memory allocations. |\n| $\\mathbin{\\Vert}$ | Operator | Tensor concatenation across head channel dimension | Combines all $H_Q$ contextualized heads prior to output projection $\\mathbf{W}_O$. |\n| $\\mathbf{W}_O$ | $\\mathbb{R}^{d \\times d}$ | Final multi-head linear projection | Merges all grouped attention head representations into the model dimension. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `repeat_kv` to expand the fewer Key and Value heads in GQA so that they match the number of Query heads for batched attention computation.",
          "ar": "يوضح هذا الجدول كيف يختزل GQA حجم الذاكرة المستهلكة بنسبة $1/r$؛ فعندما يكون $H_Q = 64$ و$H_{KV} = 8$، تصبح نسبة الضغط $1/8 = 12.5\\%$، مما يعني توفير $87.5\\%$ من ذاكرة البطاقة الرسومية المخصصة للتخزين المؤقت دون المساس بجودة التوليد."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-grouped-query-attention-gqa",
          "starterCode": "def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    \"\"\"\n    Expands Key or Value tensor heads to match the number of Query heads in GQA.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, n_kv_heads, S, D)\n        Input Key or Value tensor with fewer heads.\n    n_rep : int\n        Repetition factor (r = n_q_heads // n_kv_heads).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, n_kv_heads * n_rep, S, D)\n        Broadcasted tensor matching Query head dimensionality.\n    \"\"\"\n    # Step 1: If repetition factor is 1, return the tensor as-is\n    # Step 2: Insert new singleton dimension for repetition: (B, n_kv_heads, 1, S, D)\n    # Step 3: Broadcast repeat along the new singleton axis\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.ones((1, 2, 4, 8)); out = repeat_kv(x, 4); float(out.shape[1])",
              "expected": "8.0"
            },
            {
              "input": "x = np.ones((1, 4, 4, 8)); out = repeat_kv(x, 2); float(out.shape[1])",
              "expected": "8.0"
            },
            {
              "input": "x = np.ones((2, 1, 3, 4)); out = repeat_kv(x, 8); float(out.shape[1])",
              "expected": "8.0"
            }
          ],
          "expectedOutput": "8.0",
          "variants": {
            "python": {
              "starterCode": "def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    \"\"\"\n    Expands Key or Value tensor heads to match the number of Query heads in GQA.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, n_kv_heads, S, D)\n        Input Key or Value tensor with fewer heads.\n    n_rep : int\n        Repetition factor (r = n_q_heads // n_kv_heads).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, n_kv_heads * n_rep, S, D)\n        Broadcasted tensor matching Query head dimensionality.\n    \"\"\"\n    # Step 1: If repetition factor is 1, return the tensor as-is\n    # Step 2: Insert new singleton dimension for repetition: (B, n_kv_heads, 1, S, D)\n    # Step 3: Broadcast repeat along the new singleton axis\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "8.0"
            }
          },
          "solution": "import numpy as np\n\ndef repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    \"\"\"\n    Expands Key or Value tensor heads to match the number of Query heads in GQA.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, n_kv_heads, S, D)\n        Input Key or Value tensor with fewer heads.\n    n_rep : int\n        Repetition factor (r = n_q_heads // n_kv_heads).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, n_kv_heads * n_rep, S, D)\n        Broadcasted tensor matching Query head dimensionality.\n    \"\"\"\n    # Step 1: If repetition factor is 1, return the tensor as-is\n    if n_rep == 1:\n        return x\n        \n    B, n_kv_heads, S, D = x.shape\n    \n    # Step 2: Insert new singleton dimension for repetition: (B, n_kv_heads, 1, S, D)\n    x_expanded = np.expand_dims(x, axis=2)\n    \n    # Step 3: Broadcast repeat along the new singleton axis\n    x_repeated = np.repeat(x_expanded, n_rep, axis=2)\n    \n    # Step 4: Reshape by collapsing n_kv_heads and n_rep into the total heads dimension\n    return x_repeated.reshape(B, n_kv_heads * n_rep, S, D)"
        },
        "hints": {
          "tier1": {
            "en": "Insert a new axis at position 2 for head repetition.",
            "ar": "أدخل محوراً جديداً في الموضع 2 لتكرار الرؤوس."
          },
          "tier2": {
            "en": "Use np.repeat along axis 2 by n_rep times.",
            "ar": "استخدم np.repeat على المحور 2 بعدد n_rep من المرات."
          },
          "tier3": {
            "en": "Reshape to (B, H_kv * n_rep, S, D).",
            "ar": "أعد التشكيل إلى (B, H_kv * n_rep, S, D)."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You are leading an engineering team serving a 70B parameter model in production. The model currently uses standard Multi-Head Attention (MHA) with 64 heads ($H_Q = 64, H_{KV} = 64$) and head dimension $d = 128$. At peak traffic, the inference cluster saturates memory bandwidth, and users experience unacceptable generation latency. Your team decides to convert the model to Grouped-Query Attention (GQA) with 8 KV heads ($H_{KV} = 8$) via mean-pooling uptraining. What is the precise quantitative impact on KV cache throughput and capacity?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ انتباه الاستعلامات المجمعة (GQA) وانتباه الاستعلام المتعدد (MQA) تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Model parameter size increases by $8\\times$, requiring 8 additional GPUs.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The KV cache memory footprint is reduced by exactly $8\\times$ (from 64 heads down to 8 heads), allowing the same hardware to serve an $8\\times$ larger batch size while reducing memory bandwidth pressure by $87.5\\%$, drastically accelerating autoregressive token decode latency.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Attention compute complexity drops from $\\mathcal{O}(N^2)$ to $\\mathcal{O}(N)$ during the prefill phase.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "GQA eliminates the need for causal attention masking during autoregressive inference.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "flashattention-tiling-online-softmax",
    "title": "FlashAttention: IO-Aware Tiling & Online Softmax",
    "titleAr": "خوارزمية FlashAttention: التقطيع المتوافق مع الإدخال والإخراج وSoftmax اللحظية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Traditional self-attention on modern GPUs is severely bottlenecked by Memory Bandwidth and IO Operations, not raw arithmetic compute...",
      "ar": "تعاني خوارزمية الانتباه الكلاسيكية في بطاقات الرسوميات من عنق زجاجة خانق في سرعة نقل الذاكرة (Memory Bandwidth IO) وليس في سرعة المعالجات..."
    },
    "prerequisites": [
      "grouped-query-attention-gqa"
    ],
    "x": 1145,
    "y": 2550,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "FlashAttentionTilingLab",
        "narrative": {
          "en": "Traditional self-attention on modern GPUs is severely bottlenecked by **Memory Bandwidth and IO Operations**, not raw arithmetic compute capability. Modern accelerator architectures feature a strict physical hierarchy of memory: massive but relatively slow external High-Bandwidth Memory (HBM, such as 80 GB at ~3 TB/s on an NVIDIA H100) and tiny, blistering-fast on-chip Static RAM (SRAM, roughly 228 KB per streaming multiprocessor at over 30 TB/s). When algorithms force data to shuttle repeatedly between HBM and the compute cores, the ultra-fast Tensor Cores spend up to 80% of their operational time idling, waiting for numbers to arrive across the memory bus.\n\nWhen evaluating standard self-attention $\\mathbf{O} = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d}}\\right) \\mathbf{V}$, classical implementations materialize the full intermediate $N \\times N$ attention score matrix $\\mathbf{S} = \\mathbf{Q}\\mathbf{K}^T$ and probability matrix $\\mathbf{P}$ into external HBM. For a sequence length of $N = 16\\,384$ tokens in FP16 precision, this single intermediate matrix consumes over 500 megabytes per attention head! Across 64 heads and dozens of layers, intermediate attention matrices demand dozens of gigabytes of storage. The GPU is forced to write $\\mathbf{S}$ to HBM, read it back to compute row-wise maximums and normalizers, write $\\mathbf{P}$ back to HBM, and read it once more to perform the dot product with $\\mathbf{V}$.\n\n**FlashAttention**, conceived by Tri Dao et al. (2022, 2023), radically changes this paradigm by making self-attention *IO-aware*. FlashAttention splits the input query, key, and value matrices into small blocks (tiles) sized to fit entirely inside fast on-chip SRAM registers. Instead of computing attention across the entire sequence at once, it processes one block at a time, computing exact attention outputs incrementally in a single fused kernel pass.\n\n> **Frontier Analogy:** FlashAttention is like organizing your desk scratchpad (SRAM) instead of running back and forth to the basement filing cabinet (HBM) for every intermediate calculation. Instead of writing out a giant 10,000-page accounting ledger in a slow basement filing cabinet and constantly walking back and forth to look up numbers, you keep only a single index card on your desk scratchpad (SRAM) and update running totals on the fly as numbers arrive.\n\nThe mathematical engine that enables this single-pass tiling without ever storing the $N \\times N$ score matrix in HBM is **Online Softmax**. Historically, computing softmax required two sequential passes over data: the first pass to identify the row maximum $\\max(x)$ and sum $\\sum e^{x_i - \\max}$, and the second pass to divide each term by the sum. Online Softmax dynamically tracks running maximums $m_{\\text{new}}$ and sums of exponentials $l_{\\text{new}}$: whenever a new block reveals a higher maximum, past partial accumulators are dynamically downscaled by a correction factor $\\alpha = \\exp(m_{\\text{prev}} - m_{\\text{new}})$, preserving exact mathematical equivalence with standard attention while reducing memory access from $\\mathcal{O}(N^2)$ to $\\mathcal{O}(N \\cdot d)$!",
          "ar": "تعاني خوارزمية الانتباه الكلاسيكية في بطاقات الرسوميات من عنق زجاجة خانق في سرعة نقل الذاكرة (Memory Bandwidth IO) وليس في سرعة المعالجات الحسابية. فالنموذج يضطر إلى كتابة مصفوفة درجات الانتباه الضخمة $N \\times N$ في ذاكرة HBM البطيئة، ثم قراءتها لحساب دالة Softmax، ثم كتابتها وقراءتها مجدداً لضربها في مصفوفة القيم $\\mathbf{V}$. يقضي المعالج الرسومي معظم وقته في انتظار نقل البيانات عبر نواقل الذاكرة بدلاً من إجراء الحسابات الرياضية.\n\nفي المعماريات الحاسوبية الحديثة، توجد هرمية فيزيائية واضحة للذاكرة: ذاكرة خارجية ضخمة ولكنها بطيئة نسبياً (HBM بسعة 80 غيغابايت وسرعة نقل 3 تيرابايت/ثانية)، مقابل ذاكرة داخلية فائقة السرعة ملحقة بكل نواة معالجة (SRAM بحجم لا يتجاوز مئات الكيلوبايتات ولكن بسرعة تفوق 30 تيرابايت/ثانية). وتكمن المشكلة الكبرى في أن الانتباه التقليدي يستهلك ذاكرة HBM بشكل تربيعي $\\mathcal{O}(N^2)$ مع طول السياق.\n\nأحدثت خوارزمية **FlashAttention** نقلة نوعية عبر جعل الحسابات متوافقة مع هرمية الذاكرة الفيزيائية: حيث تُقسِّم مصفوفات المدخلات إلى كتل صغيرة تلائم تماماً ذاكرة SRAM الداخلية فائقة السرعة الملحقة بأنوية المعالجة. ومن خلال ابتكار **خوارزمية Softmax اللحظية (Online Softmax)**، تقوم الخوارزمية بحساب نواتج الانتباه بدقة رياضية مطلقة وتدريجية في مسار واحد ودون الحاجة إطلاقاً إلى حفظ مصفوفة الانتباه الكلية $N \\times N$ في ذاكرة البطاقة الرئيسية!\n\nيشبه هذا تنظيم مسودة عمل صغيرة على مكتبك بدلاً من الركض المتكرر إلى خزانة الأرشيف في القبو في كل مرة تحتاج فيها إلى رقم وسيط! فتحتفظ ببطاقة فهرسة واحدة تسجل فيها الإجماليات التراكمية وتعدلها لحظياً مع وصول الأرقام الجديدة، مما يلغي تماماً الحاجة إلى دفاتر ورقية عملاقة ويوفر أكثر من $80\\%$ من زمن الانتظار."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "m_{\\text{new}} = \\max\\left(m_{\\text{prev}}, \\max(S_{\\text{block}})\\right)",
        "formulaNote": {
          "en": "Online softmax dynamic rescaling preserving exact numerical equality across tiles.",
          "ar": "إعادة القياس الديناميكية لـ Softmax اللحظية التي تحفظ التطابق العددي الدقيق عبر الكتل."
        },
        "narrative": {
          "en": "$$\n\\alpha = \\exp\\left(m_{\\text{prev}} - m_{\\text{new}}\\right), \\quad P_{\\text{block}} = \\exp\\left(S_{\\text{block}} - m_{\\text{new}}\\right)\n$$\n\n$$\nl_{\\text{new}} = \\alpha \\cdot l_{\\text{prev}} + \\sum_{\\text{cols}} P_{\\text{block}}\n$$\n\n$$\nO_{\\text{new}} = \\alpha \\cdot O_{\\text{prev}} + P_{\\text{block}} V_{\\text{block}}, \\quad \\text{Final Output: } O = \\frac{O_{\\text{final}}}{l_{\\text{final}}}\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $S_{\\text{block}}$ | $\\mathbb{R}^{B_r \\times B_c}$ | Attention score tile computed in fast SRAM | Dot products between query block $Q_i$ and key block $K_j$. |\n| $m_{\\text{prev}}, m_{\\text{new}}$ | $\\mathbb{R}^{B_r \\times 1}$ | Row-wise running maximum values | Prevents exponential overflow in floating-point computations. |\n| $\\alpha = \\exp(m_{\\text{prev}} - m_{\\text{new}})$ | $\\mathbb{R}^{B_r \\times 1} \\in (0, 1]$ | Dynamic rescaling correction factor | Rescales previous unnormalized sums when a larger maximum is discovered. |\n| $P_{\\text{block}}$ | $\\mathbb{R}^{B_r \\times B_c}$ | Unnormalized exponential attention weights | Exponentials computed locally using the current global maximum $m_{\\text{new}}$. |\n| $l_{\\text{prev}}, l_{\\text{new}}$ | $\\mathbb{R}^{B_r \\times 1}$ | Running accumulated denominator | Sum of exponentials across all historical tiles processed so far. |\n| $O_{\\text{prev}}, O_{\\text{new}}$ | $\\mathbb{R}^{B_r \\times d}$ | Running accumulated attention output numerator | Unnormalized weighted sum of value vectors updated in fast SRAM. |\n| $O = O_{\\text{final}} / l_{\\text{final}}$ | $\\mathbb{R}^{B_r \\times d}$ | Final normalized attention context matrix | Mathematically identical to standard Softmax attention. |\n| Memory IO | Complexity | Reduced from $\\mathcal{O}(N^2)$ down to $\\mathcal{O}(N \\cdot d)$ | Completely eliminates intermediate attention matrix roundtrips to HBM. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `online_softmax_step` to compute the incremental block update for Online Softmax tiling: updating running maximums, rescaling previous accumulators, and accumulating value products.",
          "ar": "تضمن آلية التصحيح الديناميكية عبر المعامل $\\alpha$ تطابق الناتج الرياضي النهائي تماماً مع دالة Softmax الكلاسيكية، ولكن مع اختزال حركة البيانات بين الذاكرتين بنسبة تزيد عن $80\\%$، مما يتيح تسريع زمن التدريب والاستدلال بمقدار $3\\times$ إلى $5\\times$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-flashattention-tiling-online-softmax",
          "starterCode": "def online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the Online Softmax Tiling algorithm.\n    \n    Parameters\n    ----------\n    m_prev : np.ndarray of shape (Br, 1)\n        Previous row-wise running maximums.\n    l_prev : np.ndarray of shape (Br, 1)\n        Previous row-wise sum of exponentials.\n    O_prev : np.ndarray of shape (Br, d)\n        Previous running unnormalized attention output.\n    S_block : np.ndarray of shape (Br, Bc)\n        Current attention score tile between Q_block and K_block.\n    V_block : np.ndarray of shape (Bc, d)\n        Current value tile.\n        \n    Returns\n    -------\n    m_new, l_new, O_new : tuple of updated state arrays.\n    \"\"\"\n    # Step 1: Find row-wise maximum of current block and update running maximum\n    # Step 2: Compute exponential scaling factor alpha = exp(m_prev - m_new) for rescaling past sums\n    # Step 3: Compute unnormalized probabilities for current block: P_block = exp(S_block - m_new)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "m = np.array([[-np.inf]]); l = np.array([[0.0]]); O = np.array([[0.0, 0.0]]); S = np.array([[1.0, 2.0]]); V = np.array([[1.0, 0.0], [0.0, 1.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(m_n[0,0])",
              "expected": "2.0"
            },
            {
              "input": "m = np.array([[0.0]]); l = np.array([[1.0]]); O = np.array([[1.0, 1.0]]); S = np.array([[0.0]]); V = np.array([[2.0, 2.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(l_n[0,0])",
              "expected": "2.0"
            },
            {
              "input": "m = np.array([[-np.inf]]); l = np.array([[0.0]]); O = np.array([[0.0, 0.0]]); S = np.array([[0.0, 0.0]]); V = np.array([[1.0, 2.0], [3.0, 4.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(O_n[0,0])",
              "expected": "4.0"
            }
          ],
          "expectedOutput": "2.0",
          "variants": {
            "python": {
              "starterCode": "def online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the Online Softmax Tiling algorithm.\n    \n    Parameters\n    ----------\n    m_prev : np.ndarray of shape (Br, 1)\n        Previous row-wise running maximums.\n    l_prev : np.ndarray of shape (Br, 1)\n        Previous row-wise sum of exponentials.\n    O_prev : np.ndarray of shape (Br, d)\n        Previous running unnormalized attention output.\n    S_block : np.ndarray of shape (Br, Bc)\n        Current attention score tile between Q_block and K_block.\n    V_block : np.ndarray of shape (Bc, d)\n        Current value tile.\n        \n    Returns\n    -------\n    m_new, l_new, O_new : tuple of updated state arrays.\n    \"\"\"\n    # Step 1: Find row-wise maximum of current block and update running maximum\n    # Step 2: Compute exponential scaling factor alpha = exp(m_prev - m_new) for rescaling past sums\n    # Step 3: Compute unnormalized probabilities for current block: P_block = exp(S_block - m_new)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.0"
            }
          },
          "solution": "import numpy as np\n\ndef online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the Online Softmax Tiling algorithm.\n    \n    Parameters\n    ----------\n    m_prev : np.ndarray of shape (Br, 1)\n        Previous row-wise running maximums.\n    l_prev : np.ndarray of shape (Br, 1)\n        Previous row-wise sum of exponentials.\n    O_prev : np.ndarray of shape (Br, d)\n        Previous running unnormalized attention output.\n    S_block : np.ndarray of shape (Br, Bc)\n        Current attention score tile between Q_block and K_block.\n    V_block : np.ndarray of shape (Bc, d)\n        Current value tile.\n        \n    Returns\n    -------\n    m_new, l_new, O_new : tuple of updated state arrays.\n    \"\"\"\n    # Step 1: Find row-wise maximum of current block and update running maximum\n    m_block = np.max(S_block, axis=-1, keepdims=True)\n    m_new = np.maximum(m_prev, m_block)\n    \n    # Step 2: Compute exponential scaling factor alpha = exp(m_prev - m_new) for rescaling past sums\n    alpha = np.exp(m_prev - m_new)\n    \n    # Step 3: Compute unnormalized probabilities for current block: P_block = exp(S_block - m_new)\n    P_block = np.exp(S_block - m_new)\n    \n    # Step 4: Rescale previous denominator and accumulate current block sum\n    l_new = alpha * l_prev + np.sum(P_block, axis=-1, keepdims=True)\n    \n    # Step 5: Rescale previous output numerator and add P_block @ V_block\n    O_new = alpha * O_prev + np.matmul(P_block, V_block)\n    \n    return m_new, l_new, O_new"
        },
        "hints": {
          "tier1": {
            "en": "m_block is the row maximum of S_block.",
            "ar": "m_block هي القيمة العظمى لصفوف مصفوفة S_block."
          },
          "tier2": {
            "en": "Compute alpha = exp(m_prev - m_new).",
            "ar": "احسب معامل التصحيح alpha = exp(m_prev - m_new)."
          },
          "tier3": {
            "en": "Rescale previous accumulators: alpha * O_prev + P_block @ V_block.",
            "ar": "أعد قياس التراكمات السابقة: alpha * O_prev + P_block @ V_block."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You are benchmarking a 16,384-token document processing pipeline on an NVIDIA H100 GPU. Running standard PyTorch attention (`torch.matmul(F.softmax(Q @ K.T), V)`) results in 18 tokens/sec and triggers frequent CUDA Out-Of-Memory (OOM) errors during backward propagation. Switching to FlashAttention-2 increases throughput to 94 tokens/sec ($5.2\\times$ speedup) and eliminates OOM errors, despite performing more total arithmetic operations during the backward pass (recomputing attention on the fly rather than caching it). Why does doing extra arithmetic lead to massive wall-clock speedups?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية FlashAttention: التقطيع المتوافق مع الإدخال والإخراج وSoftmax اللحظية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "FlashAttention changes the mathematical formula of attention from softmax to a linear Taylor approximation.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Modern GPUs are memory-bandwidth bound: reading and writing the $N \\times N$ attention matrix to external HBM takes far more wall-clock time than computing floating-point operations. By recomputing attention tiles in fast SRAM during the backward pass instead of storing the $N \\times N$ matrix in HBM, FlashAttention slashes slow HBM memory traffic by over $80\\%$, turning memory-stalled idle time into active compute execution.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Standard attention requires double-precision FP64 registers which are missing on Tensor Cores.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "FlashAttention bypasses CUDA drivers and executes directly on the CPU host memory controller.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "swiglu-feedforward-activation",
    "title": "SwiGLU Gated Feedforward Networks (FFN)",
    "titleAr": "شبكات التغذية الأمامية ذات البوابات والتنشيط السلس SwiGLU",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In modern Transformer architectures, the Feedforward Network (FFN) constitutes the foundational engine of parametric memory and non-linear...",
      "ar": "في معمارية المحولات الحديثة، تمثل شبكة التغذية الأمامية (FFN) المحرك الأساسي للذاكرة المعاملاتية والتحويلات غير الخطية للميزات."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer"
    ],
    "x": 1125,
    "y": 2645,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "In modern Transformer architectures, the Feedforward Network (FFN) constitutes the foundational engine of parametric memory and non-linear feature transformation. While multi-head self-attention routes information horizontally across different token positions in a sequence, the FFN operates independently on each token vertically, expanding its dimensionality to retrieve stored factual associations and synthesize higher-order semantic abstractions. In fact, feedforward layers account for roughly two-thirds of the total parameter count in foundation models.\n\nIn the classic 2017 Transformer and early generative models like GPT-2 and GPT-3, the feedforward sub-layer comprised two simple affine transformations separated by a standard non-linear activation function (historically ReLU or GELU): $\\text{FFN}(\\mathbf{x}) = \\text{GELU}(\\mathbf{x} \\mathbf{W}_1 + \\mathbf{b}_1) \\mathbf{W}_2 + \\mathbf{b}_2$. While computationally straightforward, these static activations apply fixed thresholding: each hidden feature is scaled independently without dynamic cross-channel coordination or adaptive feature gating.\n\nIn 2020, Google Brain researcher Noam Shazeer published *\"GLU Variants Improve Transformer\"*, demonstrating that Gated Linear Units (GLUs) consistently outperform classical MLPs across language modeling benchmarks. Specifically, **SwiGLU (Swish Gated Linear Unit)** emerged as the undisputed golden standard, powering virtually all modern frontier backbones including LLaMA 2/3, Mistral, Gemma, PaLM, and DeepSeek.\n\n> **Frontier Analogy:** Think of a precision industrial mixer valve or a velvet-rope VIP bouncer. The Gate branch acts as an ultra-sensitive valve handle that smoothly regulates the volume and flow rate of water passing through the main pipe (the Up branch), allowing fine-grained control before the combined stream exits the faucet (the Down projection). Rather than slamming on/off like a binary switch, the gate smoothly attenuates irrelevant features and amplifies salient signals.\n\nThe mathematical power of SwiGLU stems from its bilinear multiplicative interaction: the input $\\mathbf{x}$ is projected into two parallel representations—a **Gate** projection $\\mathbf{x} \\mathbf{W}_{\\text{gate}}$ and an **Up** projection $\\mathbf{x} \\mathbf{W}_{\\text{up}}$. The Gate path passes through the smooth, non-monotonic Swish (SiLU) activation function and is element-wise multiplied by the Up path. Because SwiGLU uses three weight matrices instead of two, architects preserve parameter and FLOP parity by scaling the intermediate dimension to $d_{\\text{ffn}} \\approx \\left\\lfloor \\frac{8}{3} d_{\\text{model}} \\right\\rfloor$ rather than the classical $4 d_{\\text{model}}$, maintaining exact computational equivalence ($3 \\times \\frac{8}{3}d = 8d = 2 \\times 4d$) while unlocking vastly superior expressive capacity.",
          "ar": "في معمارية المحولات الحديثة، تمثل شبكة التغذية الأمامية (FFN) المحرك الأساسي للذاكرة المعاملاتية والتحويلات غير الخطية للميزات. فبينما تعمل آلية الانتباه على نقل وسياقة المعلومات أفقياً بين الرموز المختلفة في الجملة، تتولى شبكة التغذية الأمامية معالجة كل رمز رأسياً بشكل مستقل، حيث توسع فضاء الأبعاد لاسترجاع الحقائق الدلالية المخزنة؛ وهي تشكل ما يقارب ثلثي المعاملات الإجمالية في النماذج اللغوية الضخمة.\n\nفي النموذج الكلاسيكي لعام 2017 ونماذج GPT الأولى، كانت الشبكة تتكون من طبقتين خطيتين بسيطتين تتوسطهما دالة تنشيط تقليدية مثل ReLU أو GELU. ورغم بساطة هذا التركيب، إلا أنه يعتمد على عتبات تنشيط ثابتة ومستقلة لكل قناة، مما يحرم النموذج من القدرة على ضبط وتصفية تدفق الميزات ديناميكياً بناءً على السياق المتغير.\n\nأحدثت أبحاث نعوم شازير عام 2020 ثورة في هذا المجال بابتكار معمارية **SwiGLU**، والتي أصبحت المعيار العالمي المعتمد في كافة النماذج المتقدمة مثل LLaMA 3 وMistral وGemma. تستبدل SwiGLU التنشيط الخطي البسيط بآلية بوابات ثنائية الخطية: حيث يُسقط المدخل على مسارين متوازيين في وقت واحد — مسار **البوابة (Gate)** ومسار **الرفع (Up)**. يمر مسار البوابة عبر دالة Swish السلسة، ثم يُضرب عنصرياً في مسار الرفع قبل التمرير إلى طبقة الإسقاط السفلي.\n\nيشبه هذا التصميم صمام خلط هيدروليكي فائق الدقة: يعمل مسار البوابة كمقبض صمام حساس للغاية يتحكم بسلاسة في تدفق وحجم الإشارة المارة في الأنبوب الرئيسي (مسار الرفع)؛ مما يتيح تصفية التشويش وتضخيم الإشارات الدلالية الحرجة بمرونة فائقة تفوق بكثير أداء البوابات الثابتة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{SwiGLU}(\\mathbf{x}) = \\left( \\text{Swish}(\\mathbf{x} \\mathbf{W}_{\\text{gate}}) \\odot (\\mathbf{x} \\mathbf{W}_{\\text{up}}) \\right) \\mathbf{W}_{\\text{down}}",
        "formulaNote": {
          "en": "SwiGLU bilinear gating formulation with parameter parity scaling.",
          "ar": "صياغة البوابات ثنائية الخطية لـ SwiGLU مع تدريج تماثل المعاملات."
        },
        "narrative": {
          "en": "Where the Swish (SiLU) activation function is defined by smooth, non-monotonic multiplication with the logistic sigmoid:\n\n$$\n\\text{Swish}(\\mathbf{z}) = \\mathbf{z} \\cdot \\sigma(\\mathbf{z}) = \\frac{\\mathbf{z}}{1 + e^{-\\mathbf{z}}}\n$$\n\nTo maintain strict parameter and FLOP parity with a traditional 2-matrix FFN with hidden size $4d_{\\text{model}}$, the intermediate dimension is scaled:\n\n$$\nd_{\\text{ffn}} = \\left\\lfloor \\frac{8}{3} d_{\\text{model}} \\right\\rfloor \\implies 3 \\times \\frac{8}{3} d_{\\text{model}} \\cdot d_{\\text{model}} = 8 d_{\\text{model}}^2 = 2 \\times 4 d_{\\text{model}} \\cdot d_{\\text{model}}\n$$\n\nThe derivative of Swish demonstrates its non-monotonic self-gating behavior and non-zero gradient transmission for small negative inputs:\n\n$$\n\\frac{d}{dz}\\text{Swish}(z) = \\sigma(z) + z \\sigma(z)(1 - \\sigma(z)) = \\sigma(z) \\left(1 + z(1 - \\sigma(z))\\right)\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^{B \\times T \\times d_{\\text{model}}}$ | Input token representations entering the FFN | Normalized activations exiting the attention residual stream. |\n| $\\mathbf{W}_{\\text{gate}}$ | $\\mathbb{R}^{d_{\\text{model}} \\times d_{\\text{ffn}}}$ | Linear projection matrix for continuous gating | Generates unactivated logits that control feature throughput. |\n| $\\mathbf{W}_{\\text{up}}$ | $\\mathbb{R}^{d_{\\text{model}} \\times d_{\\text{ffn}}}$ | Linear projection matrix for feature candidate expansion | Projects token representations into expanded high-dimensional space. |\n| $\\text{Swish}(\\cdot)$ | $\\mathbb{R} \\to \\mathbb{R}$ | Smooth, non-monotonic activation function ($z \\sigma(z)$) | Possesses negative curvature near zero, preventing dead neuron collapse. |\n| $\\odot$ | Operator | Hadamard (element-wise) multiplication | Enables dynamic multiplicative modulation between gate and up pathways. |\n| $\\mathbf{W}_{\\text{down}}$ | $\\mathbb{R}^{d_{\\text{ffn}} \\times d_{\\text{model}}}$ | Final downward projection matrix | Compresses gated representations back to baseline model dimension. |\n| $d_{\\text{ffn}} \\approx \\frac{8}{3} d_{\\text{model}}$ | Integer | Scaled intermediate hidden dimension | Ensures total parameter count matches standard 2-matrix $4d$ FFNs. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `swish` and `swiglu_forward` to compute the forward pass of a SwiGLU layer: projecting into Gate and Up representations, applying Swish, performing Hadamard multiplication, and projecting down.",
          "ar": "تضمن هذه الصياغة الرياضية احتفاظ النموذج بنفس الميزانية الحسابية تماماً لشبكات 4d الكلاسيكية مع الاستفادة من التفاعل ثنائي الخطية ودالة Swish السلسة غير الرتيبة، مما يمنع تجمد الخلايا العصبية ويحسن دقة التعلم في الطبقات العميقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-swiglu-feedforward-activation",
          "starterCode": "import numpy as np\n\ndef swish(z: np.ndarray) -> np.ndarray:\n    \"\"\"Computes the Swish / SiLU activation function: z * sigmoid(z).\"\"\"\n    sig = 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n    return z * sig\n\ndef swiglu_forward(\n    x: np.ndarray,\n    W_gate: np.ndarray,\n    W_up: np.ndarray,\n    W_down: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Computes the forward pass of a SwiGLU Feedforward Layer.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, T, D)\n        Input token embeddings.\n    W_gate : np.ndarray of shape (D, D_ffn)\n        Linear gate projection weight matrix.\n    W_up : np.ndarray of shape (D, D_ffn)\n        Linear up projection weight matrix.\n    W_down : np.ndarray of shape (D_ffn, D)\n        Linear down projection weight matrix.\n        \n    Returns\n    -------\n    np.ndarray of shape (B, T, D)\n        Transformed hidden states after SwiGLU gating and down-projection.\n    \"\"\"\n    # Step 1: Project input into Gate representation: (B, T, D) @ (D, D_ffn) -> (B, T, D_ffn)\n    gate_proj = np.matmul(x, W_gate)\n    \n    # Step 2: Project input into Up representation: (B, T, D) @ (D, D_ffn) -> (B, T, D_ffn)\n    up_proj = np.matmul(x, W_up)\n    \n    # Step 3: Apply Swish (SiLU) activation function to the Gate projection\n    gate_activated = swish(gate_proj)\n    \n    # Step 4: Bilinear element-wise Hadamard multiplication between activated Gate and Up paths\n    gated_representation = gate_activated * up_proj\n    \n    # Step 5: Project back down to model dimension: (B, T, D_ffn) @ (D_ffn, D) -> (B, T, D)\n    out = np.matmul(gated_representation, W_down)\n    \n    return out",
          "testCases": [
            {
              "input": "x = np.ones((1, 2, 4)); Wg = np.zeros((4, 8)); Wu = np.ones((4, 8)); Wd = np.ones((8, 4)); out = swiglu_forward(x, Wg, Wu, Wd); float(np.sum(out))",
              "expected": "0.0"
            },
            {
              "input": "x = np.ones((1, 1, 2)); Wg = np.ones((2, 2)); Wu = np.ones((2, 2)); Wd = np.eye(2); out = swiglu_forward(x, Wg, Wu, Wd); float(out.shape[-1])",
              "expected": "2.0"
            },
            {
              "input": "x = np.array([[[-1.0, 1.0]]]); Wg = np.eye(2); Wu = np.eye(2); Wd = np.eye(2); out = swiglu_forward(x, Wg, Wu, Wd); float(round(float(out[0,0,1]), 2))",
              "expected": "0.73"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef swish(z: np.ndarray) -> np.ndarray:\n    \"\"\"Computes the Swish / SiLU activation function: z * sigmoid(z).\"\"\"\n    sig = 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n    return z * sig\n\ndef swiglu_forward(\n    x: np.ndarray,\n    W_gate: np.ndarray,\n    W_up: np.ndarray,\n    W_down: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Computes the forward pass of a SwiGLU Feedforward Layer.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, T, D)\n        Input token embeddings.\n    W_gate : np.ndarray of shape (D, D_ffn)\n        Linear gate projection weight matrix.\n    W_up : np.ndarray of shape (D, D_ffn)\n        Linear up projection weight matrix.\n    W_down : np.ndarray of shape (D_ffn, D)\n        Linear down projection weight matrix.\n        \n    Returns\n    -------\n    np.ndarray of shape (B, T, D)\n        Transformed hidden states after SwiGLU gating and down-projection.\n    \"\"\"\n    # Step 1: Project input into Gate representation: (B, T, D) @ (D, D_ffn) -> (B, T, D_ffn)\n    gate_proj = np.matmul(x, W_gate)\n    \n    # Step 2: Project input into Up representation: (B, T, D) @ (D, D_ffn) -> (B, T, D_ffn)\n    up_proj = np.matmul(x, W_up)\n    \n    # Step 3: Apply Swish (SiLU) activation function to the Gate projection\n    gate_activated = swish(gate_proj)\n    \n    # Step 4: Bilinear element-wise Hadamard multiplication between activated Gate and Up paths\n    gated_representation = gate_activated * up_proj\n    \n    # Step 5: Project back down to model dimension: (B, T, D_ffn) @ (D_ffn, D) -> (B, T, D)\n    out = np.matmul(gated_representation, W_down)\n    \n    return out",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef swiglu_forward(x, W_gate, W_up, W_down):\n    gate_proj = np.dot(x, W_gate)\n    swish = gate_proj / (1.0 + np.exp(-np.clip(gate_proj, -30.0, 30.0)))\n    up_proj = np.dot(x, W_up)\n    return np.dot(swish * up_proj, W_down)"
        },
        "hints": {
          "tier1": {
            "en": "Swish activation is z * sigmoid(z).",
            "ar": "دالة تنشيط Swish هي z * sigmoid(z)."
          },
          "tier2": {
            "en": "Multiply the activated gate by up_proj element-wise.",
            "ar": "اضرب ناتج البوابة المنشط في مسار الرفع عنصرياً."
          },
          "tier3": {
            "en": "Multiply the gated representation by W_down.",
            "ar": "اضرب التمثيل المعالج بالبوابة في W_down."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You are architecting a new 8B foundation model with hidden dimension $d_{\\text{model}} = 4\\,096$. An engineer proposes using SwiGLU with the traditional intermediate hidden dimension $d_{\\text{ffn}} = 4 d_{\\text{model}} = 16\\,384$. The lead hardware engineer objects, stating this violates the parameter parity invariant and increases memory traffic. Why is $d_{\\text{ffn}} = \\left\\lfloor \\frac{8}{3} d_{\\text{model}} \\right\\rfloor \\approx 11\\,008$ chosen in modern models like LLaMA instead of $16\\,384$?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ شبكات التغذية الأمامية ذات البوابات والتنشيط السلس SwiGLU تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Setting $d_{\\text{ffn}} = 16\\,384$ causes floating-point integer overflow in GPU matrix address calculators.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "A traditional standard FFN uses 2 weight matrices ($\\mathbf{W}_1, \\mathbf{W}_2$), each of size $d \\times 4d$, totaling $2 \\times 4d^2 = 8d^2$ parameters. SwiGLU introduces a third matrix ($\\mathbf{W}_{\\text{gate}}, \\mathbf{W}_{\\text{up}}, \\mathbf{W}_{\\text{down}}$); if each were sized with $d_{\\text{ffn}} = 4d$, the layer would consume $3 \\times 4d^2 = 12d^2$ parameters (a 50% parameter bloat!). Setting $d_{\\text{ffn}} = \\frac{8}{3}d$ keeps total parameters at $3 \\times \\frac{8}{3}d^2 = 8d^2$, preserving exact computational and parameter parity.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Swish activation function diverges mathematically when evaluated on vectors whose length exceeds 12,000 dimensions.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Tensor cores cannot tile matrices unless the intermediate dimension is an odd prime number.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "lora-low-rank-adaptation",
    "title": "Low-Rank Adaptation (LoRA) & Parameter-Efficient Fine-Tuning",
    "titleAr": "التكيف منخفض الرتبة (LoRA) والضبط الدقيق عالي الكفاءة في المعاملات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "As foundation language models scaled from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT)—the...",
      "ar": "مع تضخم النماذج اللغوية التأسيسية إلى مئات المليارات من المعاملات، أصبح \"الضبط الدقيق الكامل\" (Full Fine-Tuning) عبر تعديل كافة أوزان..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer"
    ],
    "x": 1145,
    "y": 2740,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LoRADecompositionLab",
        "narrative": {
          "en": "As foundation language models scaled from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT)—the traditional machine learning practice of updating every single weight tensor across the network—became computationally, financially, and logistically prohibitive. Fine-tuning a 70B parameter model in standard 16-bit precision requires:\n- **140 GB** of VRAM to store model weights\n- **140 GB** of VRAM for backward-pass activation gradients\n- **560 GB** of VRAM for AdamW first and second optimizer momentum states ($m_t, v_t$)\n\nThat adds up to nearly **1 Terabyte of GPU VRAM** just to fine-tune a single specialized model! Furthermore, in enterprise cloud architectures serving 1,000 distinct customized applications (e.g., medical diagnostics, legal contract analysis, financial forecasting), maintaining 1,000 independent full-model checkpoints demands over 140 Terabytes of cold storage and triggers massive memory transfer bottlenecks when swapping models dynamically on inference servers.\n\nIn 2021, Edward Hu et al. at Microsoft introduced **Low-Rank Adaptation (LoRA)** based on a profound theoretical and empirical insight: during domain-specific adaptation, the weight update delta matrix $\\Delta \\mathbf{W}$ possesses a remarkably low **intrinsic rank** ($r \\ll \\min(d, k)$). Although the pretrained weight matrix $\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k}$ is full-rank and dense, the manifold of task-specific behavioral adjustments resides in an ultra-low-dimensional subspace. Instead of directly updating the massive matrix $\\mathbf{W}_0$, LoRA freezes $\\mathbf{W}_0$ entirely and decomposes the delta update into the product of two compact low-rank matrices: $\\mathbf{B} \\in \\mathbb{R}^{d \\times r}$ and $\\mathbf{A} \\in \\mathbb{R}^{r \\times k}$.\n\n> **Frontier Analogy:** LoRA is like tweaking small dials rather than rebuilding the entire engine. Instead of casting a whole new engine block from molten steel every time you want to tune a car for a new race track, you simply leave the massive engine block intact and adjust a few specialized fine-tuning knobs on the dashboard.\n\nSetting the intrinsic rank to $r = 8$ or $r = 16$ slashes trainable parameters and optimizer memory by over **99.8%**, while matching or exceeding the downstream accuracy of full fine-tuning. By initializing down-projection matrix $\\mathbf{A}$ with random Gaussian noise and up-projection matrix $\\mathbf{B}$ strictly to zero, the training starts with $\\Delta \\mathbf{W} = \\mathbf{B}\\mathbf{A} = \\mathbf{0}$, ensuring the model begins exactly at the baseline pretrained performance without initial disruption. Once training completes, the adapter weights can be folded directly into the base weights ($\\mathbf{W}_{\\text{serving}} = \\mathbf{W}_0 + \\frac{\\alpha}{r} \\mathbf{B}\\mathbf{A}$) for zero-latency production inference!",
          "ar": "مع تضخم النماذج اللغوية التأسيسية إلى مئات المليارات من المعاملات، أصبح \"الضبط الدقيق الكامل\" (Full Fine-Tuning) عبر تعديل كافة أوزان النموذج مستحيلاً عملياً واقتصادياً. فضبط نموذج بحجم 70 مليار معامل يتطلب أكثر من 840 غيغابايت من ذاكرة البطاقات الرسومية لحفظ الأوزان والتدرجات وحالات المحسّن (AdamW)، فضلاً عن الصعوبة البالغة في استضافة مئات النماذج المخصصة للعملاء المختلفين وتخزينها.\n\nأثبت باحثو **التكيف منخفض الرتبة (LoRA)** أن التعديلات الرياضية التي تطرأ على أوزان النموذج أثناء التخصيص لمهام جديدة تمتلك \"رتبة جوهرية منخفضة للغاية\" ($r \\ll d$). فبدلاً من تعديل مصفوفة الأوزان الأصلية الضخمة $\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k}$، تقوم تقنية LoRA بتجميد أوزان النموذج الأساسي بالكامل، وتفكيك موتر التعديل إلى حاصل ضرب مصفوفتين صغيرتين منخفضتي الرتبة: $\\Delta \\mathbf{W} = \\frac{\\alpha}{r} \\mathbf{B}\\mathbf{A}$.\n\nتقنية LoRA تشبه تعديل مقابض ضبط دقيقة صغيرة في لوحة التحكم بدلاً من تفكيك وإعادة بناء محرك الطائرة بالكامل! فعندما تريد تكييف الطائرة مع مسار جوي محدد، تحتفظ بالمحرك الأصلي كما هو وتكتفي بضبط أجهزة التوجيه الإضافية، مما يوفر أكثر من 99% من تكاليف الذاكرة والمعالجة.\n\nوبفضل بدء تدريب مصفوفة الصعود $\\mathbf{B}$ بقيم صفرية ومصفوفة الهبوط $\\mathbf{A}$ بتوزيع غاوسي عشوائي، ينطلق التدريب بانحراف صفري تام عن أداء النموذج الأساسي. وعند انتهاء التدريب، يمكن دمج أوزان التكيف خطياً وبشكل دائم مع الأوزان الأصلية، مما يتيح تقديم الخدمات البرمجية في بيئات الإنتاج الحية دون أي تأخير زمني إضافي في سرعة الاستجابة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{h} = \\mathbf{W}_0 \\mathbf{x} + \\Delta \\mathbf{W} \\mathbf{x} = \\mathbf{W}_0 \\mathbf{x} + \\frac{\\alpha}{r} \\mathbf{B} \\mathbf{A} \\mathbf{x}",
        "formulaNote": {
          "en": "LoRA low-rank delta update with zero-initialization of matrix B.",
          "ar": "تحديث دلتا منخفض الرتبة لـ LoRA مع البدء الصفري للمصفوفة B."
        },
        "narrative": {
          "en": "Where parameter initialization prevents disruption at step zero:\n\n$$\n\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k} \\text{ (Frozen)}, \\quad \\mathbf{B} \\in \\mathbb{R}^{d \\times r} \\text{ (Init: 0)}, \\quad \\mathbf{A} \\in \\mathbb{R}^{r \\times k} \\text{ (Init: } \\mathcal{N}(0, \\sigma^2)\\text{)}\n$$\n\nFor production deployment, adapter matrices are folded directly into base weights with zero additional latency:\n\n$$\n\\mathbf{W}_{\\text{serving}} = \\mathbf{W}_0 + \\frac{\\alpha}{r} \\mathbf{B} \\mathbf{A}\n$$\n\nThe ratio of trainable parameters drops precipitously:\n\n$$\n\\frac{\\text{Trainable Parameters}}{\\text{Full Parameters}} = \\frac{r(d + k)}{d \\cdot k} \\approx \\frac{2r}{d} \\quad (\\text{for } d = k)\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{W}_0$ | $\\mathbb{R}^{d \\times k}$ | Frozen pretrained foundation model weight matrix | Preserves general linguistic knowledge; zero gradient allocation. |\n| $r$ | $\\mathbb{Z}^+$ | Intrinsic rank hyperparameter ($r \\ll \\min(d, k)$) | Bottleneck rank controlling adapter capacity (typically 8, 16, or 32). |\n| $\\mathbf{A}$ | $\\mathbb{R}^{r \\times k}$ | Down-projection adapter matrix | Compresses input representations into low-dimensional latent task space. |\n| $\\mathbf{B}$ | $\\mathbb{R}^{d \\times r}$ | Up-projection adapter matrix | Expands task-adapted representations back to output dimension. |\n| $\\alpha$ | $\\mathbb{R}_{> 0}$ | Constant scaling hyperparameter | Multiplier $\\frac{\\alpha}{r}$ stabilizes learning dynamics when rank $r$ is varied. |\n| $\\mathbf{W}_{\\text{serving}}$ | $\\mathbb{R}^{d \\times k}$ | Folded weight matrix for deployment | Combines base weights and adapter into a single tensor for zero latency. |\n| Memory Savings | Ratio | $> 99.8\\%$ reduction in optimizer states | Reduces 560 GB of AdamW optimizer VRAM down to a few hundred megabytes. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `LoRALinear`, including the forward pass supporting both unmerged and merged states, and methods to merge and unmerge weights for production deployment.",
          "ar": "تضمن هذه الصياغة الرياضية انطلاق التدريب باستقرار تام نظراً لأن حاصل ضرب المصفوفة الصفرية $\\mathbf{B}$ يلغي أي تشويش أولي، بينما يتيح معامل القياس $\\frac{\\alpha}{r}$ ثبات معدل التعلم وحجم التدرجات عند تجربة رتب مختلفة $r$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-lora-low-rank-adaptation",
          "starterCode": "import numpy as np\n\nclass LoRALinear:\n    \"\"\"\n    Low-Rank Adaptation (LoRA) Linear Layer with weight merge and unmerge capabilities.\n    \"\"\"\n    def __init__(self, in_features: int, out_features: int, rank: int = 8, alpha: float = 16.0):\n        self.in_features = in_features\n        self.out_features = out_features\n        self.rank = rank\n        self.alpha = alpha\n        self.scaling = alpha / rank\n        self.merged = False\n        \n        # Pretrained base weights (frozen during training)\n        self.W0 = np.random.randn(out_features, in_features).astype(np.float32) * 0.02\n        \n        # LoRA adapters: A initialized from Gaussian, B initialized strictly to zeros\n        self.A = np.random.randn(rank, in_features).astype(np.float32) * (1.0 / np.sqrt(in_features))\n        self.B = np.zeros((out_features, rank), dtype=np.float32)\n\n    def forward(self, x: np.ndarray) -> np.ndarray:\n        \"\"\"\n        Forward pass computing h = x @ W_eff^T.\n        \"\"\"\n        # Step 1: If weights are merged for deployment, use standard single matrix multiplication\n        if self.merged:\n            return np.dot(x, self.W0.T)\n            \n        # Step 2: Compute base path: x @ W0^T\n        base_out = np.dot(x, self.W0.T)\n        \n        # Step 3: Compute low-rank adapter path: (x @ A^T) @ B^T scaled by (alpha / rank)\n        lora_out = np.dot(np.dot(x, self.A.T), self.B.T) * self.scaling\n        \n        return base_out + lora_out\n\n    def merge_weights(self):\n        \"\"\"Folds adapter weights into base weights for zero-latency inference.\"\"\"\n        if not self.merged:\n            # Step 4: Fold delta W = (alpha / rank) * (B @ A) directly into W0\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W0 += delta_w\n            self.merged = True\n\n    def unmerge_weights(self):\n        \"\"\"Unfolds adapter weights to restore base weights for continued training.\"\"\"\n        if self.merged:\n            # Step 5: Subtract delta W to restore original frozen W0\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W0 -= delta_w\n            self.merged = False",
          "testCases": [
            {
              "input": "layer = LoRALinear(4, 4, rank=2, alpha=2.0); x = np.ones((1, 4)); out_unmerged = layer.forward(x); layer.merge_weights(); out_merged = layer.forward(x); float(np.allclose(out_unmerged, out_merged))",
              "expected": "1.0"
            },
            {
              "input": "layer = LoRALinear(4, 4, rank=2, alpha=2.0); float(layer.rank)",
              "expected": "2.0"
            },
            {
              "input": "layer = LoRALinear(8, 8, rank=4, alpha=4.0); x = np.ones((2, 8)); out = layer.forward(x); float(out.shape[-1])",
              "expected": "8.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\nclass LoRALinear:\n    \"\"\"\n    Low-Rank Adaptation (LoRA) Linear Layer with weight merge and unmerge capabilities.\n    \"\"\"\n    def __init__(self, in_features: int, out_features: int, rank: int = 8, alpha: float = 16.0):\n        self.in_features = in_features\n        self.out_features = out_features\n        self.rank = rank\n        self.alpha = alpha\n        self.scaling = alpha / rank\n        self.merged = False\n        \n        # Pretrained base weights (frozen during training)\n        self.W0 = np.random.randn(out_features, in_features).astype(np.float32) * 0.02\n        \n        # LoRA adapters: A initialized from Gaussian, B initialized strictly to zeros\n        self.A = np.random.randn(rank, in_features).astype(np.float32) * (1.0 / np.sqrt(in_features))\n        self.B = np.zeros((out_features, rank), dtype=np.float32)\n\n    def forward(self, x: np.ndarray) -> np.ndarray:\n        \"\"\"\n        Forward pass computing h = x @ W_eff^T.\n        \"\"\"\n        # Step 1: If weights are merged for deployment, use standard single matrix multiplication\n        if self.merged:\n            return np.dot(x, self.W0.T)\n            \n        # Step 2: Compute base path: x @ W0^T\n        base_out = np.dot(x, self.W0.T)\n        \n        # Step 3: Compute low-rank adapter path: (x @ A^T) @ B^T scaled by (alpha / rank)\n        lora_out = np.dot(np.dot(x, self.A.T), self.B.T) * self.scaling\n        \n        return base_out + lora_out\n\n    def merge_weights(self):\n        \"\"\"Folds adapter weights into base weights for zero-latency inference.\"\"\"\n        if not self.merged:\n            # Step 4: Fold delta W = (alpha / rank) * (B @ A) directly into W0\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W0 += delta_w\n            self.merged = True\n\n    def unmerge_weights(self):\n        \"\"\"Unfolds adapter weights to restore base weights for continued training.\"\"\"\n        if self.merged:\n            # Step 5: Subtract delta W to restore original frozen W0\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W0 -= delta_w\n            self.merged = False",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\nclass LoRALinear:\n    def __init__(self, in_features, out_features, rank=4, alpha=8.0):\n        self.in_features = in_features\n        self.out_features = out_features\n        self.rank = rank\n        self.alpha = alpha\n        self.scaling = alpha / rank\n        self.W_0 = np.random.randn(out_features, in_features) * 0.02\n        self.A = np.random.randn(rank, in_features) * 0.02\n        self.B = np.zeros((out_features, rank))\n        self.merged = False\n\n    def forward(self, x):\n        if self.merged:\n            return np.dot(x, self.W_0.T)\n        base_out = np.dot(x, self.W_0.T)\n        lora_out = np.dot(np.dot(x, self.A.T), self.B.T) * self.scaling\n        return base_out + lora_out\n\n    def merge_weights(self):\n        if not self.merged:\n            self.W_0 += np.dot(self.B, self.A) * self.scaling\n            self.merged = True\n\n    def unmerge_weights(self):\n        if self.merged:\n            self.W_0 -= np.dot(self.B, self.A) * self.scaling\n            self.merged = False"
        },
        "hints": {
          "tier1": {
            "en": "Compute base output as x @ W_0.T.",
            "ar": "احسب مخرج النموذج الأساسي عبر x @ W_0.T."
          },
          "tier2": {
            "en": "Compute adapter output as (x @ A.T) @ B.T * scaling.",
            "ar": "احسب مخرج المحول عبر (x @ A.T) @ B.T * scaling."
          },
          "tier3": {
            "en": "When merged, simply return x @ W_0.T.",
            "ar": "عند دمج الأوزان، أرجع ببساطة x @ W_0.T."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Low-Rank Adaptation (LoRA) & Parameter-Efficient Fine-Tuning under practical constraints?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التكيف منخفض الرتبة (LoRA) والضبط الدقيق عالي الكفاءة في المعاملات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Strategy 1 is faster because LoRA adapters require quadratic tensor convolutions during inference.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Strategy 1 requires storing $500 \\times 140\\text{ GB} = 70\\,000\\text{ GB}$ (70 Terabytes) of model weights and requires dedicated GPU memory for each model instance. Strategy 2 stores 1 base model (140 GB) and 500 compact adapters ($500 \\times 160\\text{ MB} \\approx 80\\text{ GB}$), slashing total storage from 70 TB down to 220 GB (a $99.7\\%$ storage reduction), while enabling dynamic, real-time adapter routing on a shared GPU pool with zero latency overhead.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Strategy 2 causes permanent catastrophic forgetting of general English grammar because LoRA zeros out base model weights.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "LoRA adapters cannot be served concurrently on the same GPU cluster due to CUDA kernel locking.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "qlora-quantized-fine-tuning",
    "title": "QLoRA: 4-Bit NormalFloat (NF4) & Double Quantization",
    "titleAr": "خوارزمية QLoRA: التكميم العائم الطبيعي 4-بت (NF4) والتكميم المزدوج",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Low-Rank Adaptation (LoRA) successfully eliminated optimizer memory by training low-rank adapter matrices, fine-tuning massive...",
      "ar": "بينما نجحت تقنية LoRA في خفض ذاكرة المحسّن عبر تدريب مصفوفات منخفضة الرتبة، إلا أن تحميل النموذج الأساسي (70 مليار معامل) بدقة 16-بت كان..."
    },
    "prerequisites": [
      "lora-low-rank-adaptation"
    ],
    "x": 1125,
    "y": 2835,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LoRADecompositionLab",
        "narrative": {
          "en": "While Low-Rank Adaptation (LoRA) successfully eliminated optimizer memory by training low-rank adapter matrices, fine-tuning massive foundation models still confronted a formidable hardware barrier: the frozen base model weights had to remain loaded in 16-bit precision. Storing a 70B parameter model in standard FP16 requires at least **140 Gigabytes of VRAM** solely for baseline model parameters, necessitating multiple high-end enterprise data-center GPUs ($2\\times \\text{A100 } 80\\text{GB}$) before a single token can be processed.\n\nIn 2023, Tim Dettmers et al. introduced **QLoRA (Quantized Low-Rank Adaptation)**, an algorithmic breakthrough that democratized frontier model fine-tuning. QLoRA made it possible to fine-tune a 70-billion-parameter model on a single 48 GB workstation GPU (or a 13B model on a consumer 24 GB GPU) with zero loss in downstream task performance compared to 16-bit full fine-tuning.\n\nAt the theoretical core of QLoRA is **NormalFloat4 (NF4)** quantization. Pretrained neural network weight tensors do not follow uniform distributions; they follow zero-mean Gaussian distributions $\\mathcal{N}(0, \\sigma^2)$. Standard uniform quantization (INT4) divides the dynamic range $[-1, 1]$ into evenly spaced grid steps. This wastes precious bit capacity on improbable extreme outlier tails while heavily rounding and corrupting the dense cluster of weights concentrated around zero. NF4 solves this by constructing an information-theoretically optimal quantile codebook where each of the 16 quantization bins holds an **exact equal probability mass** ($1/16 = 0.0625$) under a standard normal distribution!\n\n> **Frontier Analogy:** Think of freezing massive library books into high-density microfilm (4-bit NF4) with double quantization, and writing custom marginal notes (LoRA adapters) in full-precision gold ink. You compress dense coats into airtight 4-bit packages, unpacking them momentarily onto your workbench (SRAM registers) during matrix multiplication, while recording all your custom alterations in high-resolution gold leaf.\n\nTo maximize memory compression, QLoRA pairs NF4 with **Double Quantization (DQ)**: the 32-bit quantization scaling constants are themselves quantized down to 8-bit FP8 across blocks of 256 parameters. This saves an additional 0.37 bits per parameter (roughly 3 GB on a 65B model). Combined with Paged Optimizers to prevent CUDA OOM spikes during memory-intensive sequence lengths, the base model resides in compact 4-bit storage and is dequantized into 16-bit floating-point registers only on the fly during active matrix multiplication.",
          "ar": "بينما نجحت تقنية LoRA في خفض ذاكرة المحسّن عبر تدريب مصفوفات منخفضة الرتبة، إلا أن تحميل النموذج الأساسي (70 مليار معامل) بدقة 16-بت كان يستهلك وحده ما لا يقل عن 140 غيغابايت من ذاكرة البطاقات الرسومية، مما قصر تدريب وتخصيص النماذج الضخمة على مراكز البيانات فائقة التكلفة.\n\nحطمت خوارزمية **QLoRA** هذا الحاجز في عام 2023 عبر ابتكار تكميم **NormalFloat4 (NF4)** رباعي البتات. ونظراً لأن أوزان الشبكات العصبية المدربة تتبع توزيعاً غاوسياً طبيعياً حول الصفر $\\mathcal{N}(0, \\sigma^2)$، فإن التكميم الخطي المنتظم التقليدي (INT4) يهدر الدقة الرقمية بتقسيم المجال بالتساوي، مما يؤدي إلى تشويه كبير للميزات المتجمعة بكثافة قرب الصفر. تقوم شبكة NF4 ببناء فترات احتمالية متساوية الكثافة مطابقة بدقة رياضية للتوزيع الطبيعي!\n\nتعتمد تقنية QLoRA على تخزين النموذج التأسيسي ككتب مكتبية ضخمة مصغرة على شرائح ميكروفيلم فائقة الكثافة (4-بت)، مع تدوين كافة الملاحظات والتعديلات التخصصية (محولات LoRA) بحبر ذهبي عالي الدقة (16-بت). يُفك ضغط الشرائح لحظياً في سجلات المعالج فقط أثناء الضرب المصفوفي، ثم تُمسح فوراً من الذاكرة اللحظية دون أن تستهلك مساحة دائمة.\n\nومع إضافة تقنية **التكميم المزدوج (Double Quantization)** لمعاملات القياس واستخدام المحسّنات المقسمة لتجنب طفرات الذاكرة، انخفضت متطلبات VRAM لنماذج 70 مليار معامل من 140 غيغابايت إلى أقل من 45 غيغابايت، مما أتاح تدريب أعتى النماذج على بطاقة رسوميات مكتبية واحدة دون أي تراجع في دقة المخرجات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "q_i = \\arg\\min_{j \\in \\{0, \\dots, 15\\}} \\left| \\frac{w_i}{s} - c_j \\right|, \\quad c_j \\in \\mathcal{C}_{\\text{NF4}}",
        "formulaNote": {
          "en": "NormalFloat4 quantile quantization and on-the-fly dequantization mapping.",
          "ar": "تكميم فترات التوزيع الطبيعي NF4 وإلغاء التكميم اللحظي."
        },
        "narrative": {
          "en": "$$\n\\hat{w}_i = s \\cdot c_{q_i}, \\quad s = \\frac{\\max(|w|)}{c_{\\max}}\n$$\n\nDouble Quantization treats the primary 32-bit block scales $s_1$ as inputs to a second 8-bit FP8 quantizer:\n\n$$\ns_1 = s_2 \\cdot c_{q_{s_1}}^{\\text{FP8}} \\quad \\text{(Double Quantization: saves } 0.37 \\text{ bits/param)}\n$$\n\nDuring the forward pass, base weights are reconstructed on the fly into 16-bit precision in tensor core registers, where they are multiplied and summed with the high-precision LoRA pathway:\n\n$$\n\\mathbf{Y}^{\\text{BF16}} = \\mathbf{X}^{\\text{BF16}} \\cdot \\text{Dequantize}\\left(\\mathbf{W}^{\\text{NF4}}, s_1\\right) + \\frac{\\alpha}{r} \\mathbf{X}^{\\text{BF16}} \\mathbf{A}^T \\mathbf{B}^T\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $w_i$ | $\\mathbb{R}$ | Continuous high-precision base model weight | Weight element in a quantization block (block size $B = 64$). |\n| $s$ | $\\mathbb{R}_{> 0}$ | First-level block scaling factor | Maps raw block weights into normalized codebook range $[-1, 1]$. |\n| $\\mathcal{C}_{\\text{NF4}}$ | $\\mathbb{R}^{16}$ | The 16 NormalFloat4 quantile centroids | Information-theoretically optimal centroids for $\\mathcal{N}(0, 1)$. |\n| $q_i$ | $\\{0, \\dots, 15\\}$ | 4-bit integer index stored in GPU memory | Packed 2 weights per byte, cutting storage from 16 bits to 4 bits ($4\\times$). |\n| $s_1, s_2$ | Scales | Double quantization constants | Quantizes 32-bit scale $s_1$ into 8-bit FP8 using secondary scale $s_2$. |\n| $\\text{Dequantize}(\\cdot)$ | Operator | Dynamic on-the-fly reconstruction | Reconstructs BF16 weights in SRAM registers during matrix multiplication. |\n| $\\mathbf{A}, \\mathbf{B}$ | $\\mathbb{R}^{r \\times k}, \\mathbb{R}^{d \\times r}$ | High-precision 16-bit LoRA adapters | Receive full backpropagation gradients while base weights remain 4-bit frozen. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `get_nf4_codebook` and `nf4_quantize_block` to quantize a block of weights into 4-bit NF4 indices and scale factors.",
          "ar": "تضمن هذه الصياغة الرياضية استرجاع الأوزان بدقة غاوسية مثالية لحظة الحساب فقط، دون الحاجة لحجز الذاكرة الكاملة، مما يلغي المفاضلة التاريخية بين حجم النموذج ودقة التدريب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-qlora-quantized-fine-tuning",
          "starterCode": "def get_nf4_codebook() -> np.ndarray:\n    \"\"\"\n    Returns the exact 16 NormalFloat4 (NF4) codebook centroids \n    derived from quantiles of the standard normal distribution N(0, 1).\n    \"\"\"\n    # Step 1: Compute block absolute maximum scaling factor\n    # Step 2: Normalize block weights into codebook range [-1, 1]\n    # Step 3: Find nearest codebook centroid for each normalized weight: argmin |w_norm - c_j|\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "cb = get_nf4_codebook(); w = np.array([0.0, 1.0, -1.0]); q, s = nf4_quantize_block(w, cb); float(s)",
              "expected": "1.0"
            },
            {
              "input": "cb = get_nf4_codebook(); float(len(cb))",
              "expected": "16.0"
            },
            {
              "input": "cb = get_nf4_codebook(); w = np.array([0.5, -0.5]); q, s = nf4_quantize_block(w, cb); float(round(s, 1))",
              "expected": "0.5"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def get_nf4_codebook() -> np.ndarray:\n    \"\"\"\n    Returns the exact 16 NormalFloat4 (NF4) codebook centroids \n    derived from quantiles of the standard normal distribution N(0, 1).\n    \"\"\"\n    # Step 1: Compute block absolute maximum scaling factor\n    # Step 2: Normalize block weights into codebook range [-1, 1]\n    # Step 3: Find nearest codebook centroid for each normalized weight: argmin |w_norm - c_j|\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef get_nf4_codebook() -> np.ndarray:\n    \"\"\"\n    Returns the exact 16 NormalFloat4 (NF4) codebook centroids \n    derived from quantiles of the standard normal distribution N(0, 1).\n    \"\"\"\n    return np.array([\n        -1.0,\n        -0.6961928009986877,\n        -0.5250730514526367,\n        -0.39491748809814453,\n        -0.28444138169288635,\n        -0.18477343022823334,\n        -0.09105003625154495,\n        0.0,\n        0.07958029955625534,\n        0.16093020141124725,\n        0.24611230194568634,\n        0.33791524171829224,\n        0.44070982933044434,\n        0.5626170039176941,\n        0.7229568362236023,\n        1.0\n    ], dtype=np.float32)\n\ndef nf4_quantize_block(w: np.ndarray, codebook: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Quantizes a block of weights into 4-bit NF4 indices and scale factor.\n    \n    Parameters\n    ----------\n    w : np.ndarray of shape (B,)\n        Input continuous weights block (typically 64 elements).\n    codebook : np.ndarray of shape (16,)\n        NF4 quantile centroids.\n        \n    Returns\n    -------\n    indices : np.ndarray of shape (B,) with dtype int8\n        Quantized 4-bit indices in range [0, 15].\n    scale : float\n        First-level absolute maximum scale factor.\n    \"\"\"\n    # Step 1: Compute block absolute maximum scaling factor\n    abs_max = float(np.max(np.abs(w)))\n    scale = abs_max if abs_max > 0.0 else 1.0\n    \n    # Step 2: Normalize block weights into codebook range [-1, 1]\n    w_normalized = w / scale\n    \n    # Step 3: Find nearest codebook centroid for each normalized weight: argmin |w_norm - c_j|\n    diffs = np.abs(w_normalized[:, None] - codebook[None, :])\n    indices = np.argmin(diffs, axis=-1).astype(np.int8)\n    \n    return indices, scale"
        },
        "hints": {
          "tier1": {
            "en": "Compute scale as max(abs(w)).",
            "ar": "احسب معامل القياس كأقصى قيمة مطلقة للأوزان."
          },
          "tier2": {
            "en": "Normalize w by scale so values lie in [-1, 1].",
            "ar": "عاير الأوزان بقسمتها على المقياس لتصبح في المجال [-1, 1]."
          },
          "tier3": {
            "en": "Use argmin over distances to codebook centroids.",
            "ar": "استخدم argmin على المسافات لمراكز شبكة التكميم."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You need to fine-tune a 70B parameter open-weights model on an enterprise private cloud equipped with a single workstation running an NVIDIA RTX 6000 Ada GPU (48 GB VRAM). An engineer attempts to launch standard FP16 LoRA with batch size 1, but the job crashes immediately with a CUDA Out-of-Memory (OOM) error during model loading. Switching to QLoRA (NF4 base weights + FP16 LoRA adapters with $r=16$) allows the job to train successfully at 1,400 tokens/sec. What is the quantitative VRAM breakdown explaining this success?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية QLoRA: التكميم العائم الطبيعي 4-بت (NF4) والتكميم المزدوج تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "QLoRA reduces the sequence length by $4\\times$, which lowers attention FLOPs.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "In standard FP16 LoRA, base weights require $70\\text{B} \\times 2\\text{ bytes} \\approx 140\\text{ GB}$ of VRAM, which immediately exceeds the 48 GB physical capacity of the GPU. In QLoRA, 4-bit NF4 compresses base weights to $70\\text{B} \\times 0.5\\text{ bytes} \\approx 35\\text{ GB}$. Adding 8-bit Double Quantization scales and 16-bit LoRA adapter parameters ($r=16$) consumes less than 3 GB of VRAM, fitting the entire model and activation tensors comfortably within 42 GB of VRAM.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "QLoRA drops all attention layers and only fine-tunes the embedding matrix.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "NF4 converts matrix multiplications into CPU memory lookups to bypass the GPU.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "dpo-direct-preference-optimization",
    "title": "Direct Preference Optimization (DPO) & Implicit Reward Dynamics",
    "titleAr": "التحسين المباشر للتفضيلات (DPO) وديناميكيات المكافأة الضمنية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "After pretraining and Supervised Fine-Tuning (SFT), alignment with human values, safety guidelines, and user intent traditionally relied on...",
      "ar": "بعد مرحلتي التدريب المسبق والضبط التوجيهي (SFT)، كانت مواءمة النماذج اللغوية مع التفضيلات الإنسانية تتطلب تقليدياً استخدام التعلم التعزيزي..."
    },
    "prerequisites": [
      "causal-masking-scaled-dot-product"
    ],
    "x": 1145,
    "y": 2930,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "After pretraining and Supervised Fine-Tuning (SFT), alignment with human values, safety guidelines, and user intent traditionally relied on **Reinforcement Learning from Human Feedback (RLHF)** using Proximal Policy Optimization (PPO). Standard RLHF is a notoriously brittle, multi-stage engineering pipeline:\n1. Collect pairwise human preferences ($y_w \\succ y_l$, where $y_w$ is the preferred response and $y_l$ is the rejected response).\n2. Train a separate **Reward Model** $r_\\phi(x, y)$ under the Bradley-Terry preference model:\n   $$\n   P(y_w \\succ y_l \\mid x) = \\sigma\\left(r_\\phi(x, y_w) - r_\\phi(x, y_l)\\right)\n   $$\n3. Optimize the language model policy using PPO reinforcement learning against the learned reward model with a KL-divergence penalty against the reference model $\\pi_{\\text{ref}}$.\n\nThis standard RLHF setup is unstable, hypersensitive to hyperparameters, prone to reward hacking, and computationally grueling: it requires loading **four separate models** simultaneously into GPU VRAM (the Actor policy, the Critic value network, the frozen Reference model, and the Reward model).\n\nIn 2023, Rafael Rafailov et al. introduced **Direct Preference Optimization (DPO)**. By analytically solving the constrained RL optimization problem, DPO proves that the optimal policy $\\pi^*$ has an exact closed-form relationship with the ground-truth reward:\n\n$$\nr^*(x, y) = \\beta \\log \\frac{\\pi^*(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)} + \\beta \\log Z(x)\n$$\n\nSubstituting this analytical identity directly into the Bradley-Terry preference objective **completely eliminates the reward model and PPO loop**! DPO optimizes human preferences through a clean, numerically stable binary cross-entropy loss applied directly to the policy network.\n\n> **Frontier Analogy:** Instead of hiring an external referee to score points and forcing an athlete to guess how to move their muscles via trial-and-error reinforcement learning, you directly coach the athlete by comparing the probability of their winning moves against their losing moves relative to their natural baseline instincts.",
          "ar": "بعد مرحلتي التدريب المسبق والضبط التوجيهي (SFT)، كانت مواءمة النماذج اللغوية مع التفضيلات الإنسانية تتطلب تقليدياً استخدام التعلم التعزيزي من التغذية الراجعة البشرية (RLHF عبر خوارزمية PPO). اتسمت هذه العملية بصعوبة بالغة وعدم استقرار رياضي؛ حيث تطلبت تدريب نموذج مكافأة منفصل، ثم تشغيل حلقة تعلم تعزيزي معقدة تلزم حجز 4 نماذج ضخمة متزامنة في ذاكرة البطاقات الرسومية!\n\nأحدثت خوارزمية **التحسين المباشر للتفضيلات (DPO)** ثورة علمية عبر إثبات أن دالة المكافأة المثلى يمكن التعبير عنها بصيغة رياضية مغلقة تعتمد مباشرة على نسبة الاحتمالات اللوغاريتمية بين النموذج المتعلم والنموذج المرجعي: $r^*(x, y) = \\beta \\log \\frac{\\pi_\\theta(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)}$.\n\nعبر هذا التعويض الجبري المباشر، تلغي DPO الحاجة لنموذج المكافأة ولخوارزمية PPO بالكامل! وتتحول مواءمة النموذج إلى دالة خسارة انحدارية بسيطة وعالية الاستقرار تشبه دالة الإنتروبيا التقاطعية الثنائية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l) \\sim \\mathcal{D}} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w \\mid x)}{\\pi_{\\text{ref}}(y_w \\mid x)} - \\beta \\log \\frac{\\pi_\\theta(y_l \\mid x)}{\\pi_{\\text{ref}}(y_l \\mid x)} \\right) \\right]",
        "formulaNote": {
          "en": "DPO analytical policy objective directly optimizing human preference pairs.",
          "ar": "دالة هدف سياسة DPO التحليلية التي تستثمل مباشرة أزواج التفضيل البشري."
        },
        "narrative": {
          "en": "Where the implicit reward function $\\hat{r}_\\theta(x, y)$ evaluates the log-likelihood ratio against the frozen baseline:\n\n$$\n\\hat{r}_\\theta(x, y) = \\beta \\log \\frac{\\pi_\\theta(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)}\n$$\n\nDifferentiating with respect to the policy parameters $\\theta$ yields an intuitive self-weighting gradient:\n\n$$\n\\nabla_\\theta \\mathcal{L}_{\\text{DPO}} = -\\beta \\sigma\\left(\\hat{r}_\\theta(x, y_l) - \\hat{r}_\\theta(x, y_w)\\right) \\left[ \\nabla_\\theta \\log \\pi_\\theta(y_w \\mid x) - \\nabla_\\theta \\log \\pi_\\theta(y_l \\mid x) \\right]\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $x$ | Sequence | User input prompt | Conditioning context for completion candidates. |\n| $y_w$ | Sequence | Preferred (winning / chosen) response | Candidate whose log-likelihood is actively boosted. |\n| $y_l$ | Sequence | Dispreferred (losing / rejected) response | Candidate whose log-likelihood is actively penalized. |\n| $\\pi_\\theta(y \\mid x)$ | $\\mathbb{R}_{> 0}$ | Active parameterized policy probability | The LLM being trained to align with human preferences. |\n| $\\pi_{\\text{ref}}(y \\mid x)$ | $\\mathbb{R}_{> 0}$ | Frozen reference policy probability | The SFT baseline checkpoint anchoring linguistic grammar. |\n| $\\beta$ | $\\mathbb{R}_{> 0}$ | Regularization temperature parameter | Inverse KL divergence weight controlling anchor strength. |\n| $\\hat{r}_\\theta(x, y)$ | $\\mathbb{R}$ | Implicit reward metric | Analytical reward derived directly from log probability ratios. |\n| $\\sigma(\\hat{r}_l - \\hat{r}_w)$ | $[0, 1]$ | Dynamic gradient scaling coefficient | Applies maximum force when model errs, vanishing when margin is secure. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `dpo_loss` to compute the Direct Preference Optimization objective, implicit rewards, and margin metrics.",
          "ar": "تضمن هذه الصياغة الرياضية انسياب تدرجات التعلم لتفضيل الاستجابات الإيجابية وقمع السلبية، مع توفير حماية كاملة ضد انهيار الأنماط بفضل القيد المرجعي $\\pi_{\\text{ref}}$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-dpo-direct-preference-optimization",
          "starterCode": "def sigmoid(x: float | np.ndarray) -> float | np.ndarray:\n    \"\"\"Numerically stable logistic sigmoid.\"\"\"\n    # Step 1: Compute log ratios between policy and reference for chosen and rejected completions\n    # Step 2: Compute implicit rewards: beta * log(pi / pi_ref)\n    # Step 3: Compute logit margin for the Bradley-Terry preference model\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "pi_w = -1.0; pi_l = -3.0; ref_w = -1.0; ref_l = -3.0; loss, r_w, r_l = dpo_loss(pi_w, pi_l, ref_w, ref_l, beta=0.1); float(np.round(loss, 2))",
              "expected": "0.69"
            },
            {
              "input": "pi_w = 0.0; pi_l = -10.0; ref_w = -5.0; ref_l = -5.0; loss, r_w, r_l = dpo_loss(pi_w, pi_l, ref_w, ref_l, beta=0.1); float(r_w > r_l)",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "0.69",
          "variants": {
            "python": {
              "starterCode": "def sigmoid(x: float | np.ndarray) -> float | np.ndarray:\n    \"\"\"Numerically stable logistic sigmoid.\"\"\"\n    # Step 1: Compute log ratios between policy and reference for chosen and rejected completions\n    # Step 2: Compute implicit rewards: beta * log(pi / pi_ref)\n    # Step 3: Compute logit margin for the Bradley-Terry preference model\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.69"
            }
          },
          "solution": "import numpy as np\n\ndef sigmoid(x: float | np.ndarray) -> float | np.ndarray:\n    \"\"\"Numerically stable logistic sigmoid.\"\"\"\n    return np.where(x >= 0, 1.0 / (1.0 + np.exp(-x)), np.exp(x) / (1.0 + np.exp(x)))\n\ndef dpo_loss(\n    pi_logps_w: float | np.ndarray,\n    pi_logps_l: float | np.ndarray,\n    ref_logps_w: float | np.ndarray,\n    ref_logps_l: float | np.ndarray,\n    beta: float = 0.1\n) -> tuple[float, float, float]:\n    \"\"\"\n    Computes the Direct Preference Optimization (DPO) loss and implicit rewards.\n    \n    Parameters\n    ----------\n    pi_logps_w : float or array\n        Log-probabilities of chosen completion under current policy pi_theta.\n    pi_logps_l : float or array\n        Log-probabilities of rejected completion under current policy pi_theta.\n    ref_logps_w : float or array\n        Log-probabilities of chosen completion under reference policy pi_ref.\n    ref_logps_l : float or array\n        Log-probabilities of rejected completion under reference policy pi_ref.\n    beta : float\n        Temperature parameter scaling the implicit reward.\n        \n    Returns\n    -------\n    loss : float\n        Mean scalar DPO loss.\n    reward_w, reward_l : float\n        Mean implicit rewards for chosen and rejected completions.\n    \"\"\"\n    # Step 1: Compute log ratios between policy and reference for chosen and rejected completions\n    pi_logratios_w = pi_logps_w - ref_logps_w\n    pi_logratios_l = pi_logps_l - ref_logps_l\n    \n    # Step 2: Compute implicit rewards: beta * log(pi / pi_ref)\n    reward_w = beta * pi_logratios_w\n    reward_l = beta * pi_logratios_l\n    \n    # Step 3: Compute logit margin for the Bradley-Terry preference model\n    logits = reward_w - reward_l\n    \n    # Step 4: Binary cross-entropy: -log(sigmoid(logits)) = log(1 + exp(-logits))\n    loss = np.mean(np.log1p(np.exp(-np.clip(logits, -50.0, 50.0))))\n    \n    return float(loss), float(np.mean(reward_w)), float(np.mean(reward_l))"
        },
        "hints": {
          "tier1": {
            "en": "Implicit reward is beta * (pi_logps - ref_logps).",
            "ar": "المكافأة الضمنية هي beta * (pi_logps - ref_logps)."
          },
          "tier2": {
            "en": "Margin is reward_w - reward_l.",
            "ar": "فارق المكافأة هو reward_w - reward_l."
          },
          "tier3": {
            "en": "Use log1p(exp(-logits)) for stable negative log sigmoid.",
            "ar": "استخدم log1p(exp(-logits)) لحساب سالب لوغاريتم السجمويد بثبات."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Direct Preference Optimization (DPO) & Implicit Reward Dynamics under practical constraints?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التحسين المباشر للتفضيلات (DPO) وديناميكيات المكافأة الضمنية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The learning rate schedule caused the AdamW first momentum vector to underflow.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The temperature parameter $\\beta$ controls the strength of the KL divergence penalty $\\mathbb{D}_{\\text{KL}}(\\pi_\\theta \\mathbin{\\Vert} \\pi_{\\text{ref}})$ anchoring the model to the reference policy. When $\\beta \\to 0$, the implicit reward $r(x, y) = \\beta \\log \\frac{\\pi_\\theta}{\\pi_{\\text{ref}}}$ approaches zero, completely removing the regularizing pull of the foundation model. The policy is free to arbitrarily distort token probabilities to maximize the margin, drifting catastrophically away from natural language grammar.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "DPO requires $\\beta > 10.0$ to satisfy the Karush-Kuhn-Tucker (KKT) second-order optimality condition.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "A small $\\beta$ causes the Bradley-Terry preference probability to exceed 1.0.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "diffusion-models-score-sde",
    "title": "Denoising Diffusion Probabilistic Models (DDPM) & Score-Based Matching",
    "titleAr": "نماذج الانتشار الاحتمالية لإزالة التشويش (DDPM) ومطابقة درجات الاحتمال",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Generative modeling historically struggled with a fundamental architectural dilemma: Generative Adversarial Networks (GANs) generate crisp...",
      "ar": "عانت النماذج التوليدية لعقود من مفاضلة معقدة بين الاستقرار وجودة العينات: فشبكات GAN كانت تولد صوراً في خطوة واحدة لكنها عانت من انهيار..."
    },
    "prerequisites": [
      "autograd-computational-graph",
      "numerically-stable-softmax-cross-entropy"
    ],
    "x": 1125,
    "y": 3025,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "Generative modeling historically struggled with a fundamental architectural dilemma: Generative Adversarial Networks (GANs) generate crisp samples in a single step but suffer from notorious training instability and mode collapse, while Variational Autoencoders (VAEs) train stably with variational lower bounds but produce blurry images due to intractable likelihood approximations.\n\n**Diffusion Models** (Sohl-Dickstein et al. 2015, Ho et al. 2020) resolved this conflict by formulating generative modeling through non-equilibrium thermodynamics. Instead of synthesizing a high-dimensional image in a single risky leap, diffusion frames generation as a gradual iterative denoising process across $T = 1\\,000$ discrete timesteps.\n\n1. **The Forward Process (Diffusion):** We slowly destroy the structure of a clean data sample $\\mathbf{x}_0$ by injecting small increments of Gaussian noise at each step according to a variance schedule $\\beta_1, \\dots, \\beta_T$. By step $T$, the original data distribution is entirely annihilated into isotropic Gaussian noise $\\mathbf{x}_T \\sim \\mathcal{N}(0, \\mathbf{I})$. Crucially, because the sum of independent Gaussian random variables is itself Gaussian, we can sample the noisy state $\\mathbf{x}_t$ at any arbitrary timestep $t$ in a single **closed-form step** without simulating the intermediate steps!\n2. **The Reverse Process (Denoising):** We train a neural network (typically a U-Net or Diffusion Transformer) to estimate the exact noise vector $\\boldsymbol{\\epsilon}$ added at step $t$. Starting from pure static Gaussian noise, we iteratively subtract the network's predicted noise step by step, gradually refining chaotic randomness into crisp, photorealistic data.\n\n> **Frontier Analogy:** Diffusion is like carving a statue out of stone by removing noise. You begin with a formless, rough block of raw marble (pure random Gaussian noise). With each delicate tap of the chisel (reverse denoising step), the artist carefully chips away unwanted marble dust (predicted noise), progressively revealing the refined contours of the hidden sculpture until an exquisite statue emerges.",
          "ar": "عانت النماذج التوليدية لعقود من مفاضلة معقدة بين الاستقرار وجودة العينات: فشبكات GAN كانت تولد صوراً في خطوة واحدة لكنها عانت من انهيار الأنماط وعدم الاستقرار، بينما كانت مشفرات VAE تولد صوراً ضبابية.\n\nحلت **نماذج الانتشار الاحتمالية (Diffusion Models)** هذه المعضلة عبر استلهام قوانين الديناميكا الحرارية. فبدلاً من توليد الصورة في قفزة سحرية واحدة غير مستقرة، يُصاغ التوليد كعملية إزالة تشويش تدريجية عبر مئات الخطوات الزمنية.\n\n1. **المسار الأمامي (Forward Process):** نقوم بتدمير معالم الصورة الأصلية $\\mathbf{x}_0$ تدريجياً عبر إضافة تشويش غاوسي متتابع حتى تتحول عند الخطوة $T$ إلى ضوضاء بيضاء عشوائية بحتة $\\mathcal{N}(0, \\mathbf{I})$. وبفضل الخصائص الجبرية لتوزيع غاوس، يمكن الانتقال مباشرة إلى أي خطوة $t$ بصيغة رياضية مغلقة.\n2. **المسار العكسي (Reverse Process):** نُدرب شبكة عصبية على التنبؤ بمقدار التشويش الدقيق المضاف عند كل خطوة. يبدأ التوليد من ضوضاء عشوائية صرفة، ثم يطرح النموذج التشويش المتوقع خطوة بخطوة.\n\nنماذج الانتشار تشبه نحاتاً بارعاً ينحت تمثالاً مذهلاً من صخرة صماء عبر إزالة الشوائب طبقة تلو الأخرى! يبدأ النحات بكتلة حجرية خام غير متشكلة، ومع كل ضربة إزميل دقيقة، يُزيل غبار الحجر الفائض حتى تتجلى الملامح البديعة للتمثال المكتمل."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "q(\\mathbf{x}_t \\mid \\mathbf{x}_0) = \\mathcal{N}\\left(\\mathbf{x}_t; \\sqrt{\\bar{\\alpha}_t} \\mathbf{x}_0, (1 - \\bar{\\alpha}_t) \\mathbf{I}\\right) \\implies \\mathbf{x}_t = \\sqrt{\\bar{\\alpha}_t} \\mathbf{x}_0 + \\sqrt{1 - \\bar{\\alpha}_t} \\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})",
        "formulaNote": {
          "en": "Closed-form forward marginal diffusion and reverse denoising transition step.",
          "ar": "الصيغة المغلقة للانتشار الأمامي وخطوة إزالة التشويش في المسار العكسي."
        },
        "narrative": {
          "en": "The network parameters $\\theta$ are trained using the simplified Mean Squared Error (MSE) denoising score objective:\n\n$$\n\\mathcal{L}_{\\text{simple}}(\\theta) = \\mathbb{E}_{t, \\mathbf{x}_0, \\boldsymbol{\\epsilon}} \\left[ \\left\\| \\boldsymbol{\\epsilon} - \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t) \\right\\|^2 \\right]\n$$\n\nDuring inference, iterative reverse denoising steps reconstruct the trajectory backwards from $T$ down to $0$:\n\n$$\n\\mathbf{x}_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}} \\left( \\mathbf{x}_t - \\frac{\\beta_t}{\\sqrt{1 - \\bar{\\alpha}_t}} \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t) \\right) + \\sigma_t \\mathbf{z}, \\quad \\mathbf{z} \\sim \\mathcal{N}(0, \\mathbf{I})\n$$\n\nBy Tweedie's formula, the network's predicted noise is directly proportional to the Stein score of the data distribution:\n\n$$\n\\nabla_{\\mathbf{x}_t} \\log p(\\mathbf{x}_t) = -\\frac{\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)}{\\sqrt{1 - \\bar{\\alpha}_t}}\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_0$ | Tensor | Clean uncorrupted data sample (e.g. image) | Ground truth target anchoring the diffusion trajectory. |\n| $\\beta_t \\in (0, 1)$ | Scalar | Variance schedule coefficient at timestep $t$ | Controls the rate of Gaussian noise injection per step. |\n| $\\alpha_t = 1 - \\beta_t$ | Scalar | Proportion of signal preserved at timestep $t$ | Complementary signal retention multiplier. |\n| $\\bar{\\alpha}_t = \\prod_{s=1}^t \\alpha_s$ | Scalar | Cumulative signal retention product | Governs the relative ratio of signal to noise at arbitrary step $t$. |\n| $\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})$ | Tensor | Ground truth isotropic Gaussian noise | Standard normal perturbation sampled during training. |\n| $\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)$ | Tensor | Neural network noise predictor (U-Net or DiT) | Learns to estimate the precise perturbation corrupting $\\mathbf{x}_t$. |\n| $\\sigma_t = \\sqrt{\\beta_t}$ | Scalar | Reverse transition standard deviation | Re-injects controlled stochastic variance during reverse sampling. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `q_sample` to compute closed-form forward diffusion sampling, and `p_sample_step` to execute a single reverse denoising step.",
          "ar": "تضمن هذه الصياغة الرياضية استقرار عملية التدريب عبر مطابقة درجات الاحتمال (Score Matching)، حيث يتعلم النموذج اتجاهات التدفق نحو التوزيع الحقيقي للبيانات، مما يلغي تماماً مخاطر انهيار الأنماط الشائعة في شبكات GAN."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-diffusion-models-score-sde",
          "starterCode": "def q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Closed-form forward Markov diffusion sampling: q(x_t | x_0).\n    \n    Parameters\n    ----------\n    x_0 : np.ndarray\n        Clean initial data tensor.\n    t : int\n        Current timestep index.\n    noise : np.ndarray\n        Standard normal Gaussian noise epsilon ~ N(0, I).\n    alpha_bars : np.ndarray\n        Array of cumulative alpha_bar values for all timesteps.\n        \n    Returns\n    -------\n    x_t : np.ndarray\n        Noisy sample at timestep t.\n    \"\"\"\n    # Step 1: Retrieve cumulative signal retention coefficient alpha_bar_t\n    # Step 2: Combine clean data and noise using closed-form analytical formula\n    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x0 = np.array([1.0, 2.0]); noise = np.zeros(2); ab = np.array([1.0]); xt = q_sample(x0, 0, noise, ab); float(xt[0])",
              "expected": "1.0"
            },
            {
              "input": "x0 = np.zeros(2); noise = np.array([2.0, 2.0]); ab = np.array([0.0]); xt = q_sample(x0, 0, noise, ab); float(xt[0])",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Closed-form forward Markov diffusion sampling: q(x_t | x_0).\n    \n    Parameters\n    ----------\n    x_0 : np.ndarray\n        Clean initial data tensor.\n    t : int\n        Current timestep index.\n    noise : np.ndarray\n        Standard normal Gaussian noise epsilon ~ N(0, I).\n    alpha_bars : np.ndarray\n        Array of cumulative alpha_bar values for all timesteps.\n        \n    Returns\n    -------\n    x_t : np.ndarray\n        Noisy sample at timestep t.\n    \"\"\"\n    # Step 1: Retrieve cumulative signal retention coefficient alpha_bar_t\n    # Step 2: Combine clean data and noise using closed-form analytical formula\n    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Closed-form forward Markov diffusion sampling: q(x_t | x_0).\n    \n    Parameters\n    ----------\n    x_0 : np.ndarray\n        Clean initial data tensor.\n    t : int\n        Current timestep index.\n    noise : np.ndarray\n        Standard normal Gaussian noise epsilon ~ N(0, I).\n    alpha_bars : np.ndarray\n        Array of cumulative alpha_bar values for all timesteps.\n        \n    Returns\n    -------\n    x_t : np.ndarray\n        Noisy sample at timestep t.\n    \"\"\"\n    # Step 1: Retrieve cumulative signal retention coefficient alpha_bar_t\n    alpha_bar_t = alpha_bars[t]\n    \n    # Step 2: Combine clean data and noise using closed-form analytical formula\n    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise\n    return np.sqrt(alpha_bar_t) * x_0 + np.sqrt(1.0 - alpha_bar_t) * noise\n\ndef p_sample_step(\n    x_t: np.ndarray,\n    t: int,\n    pred_noise: np.ndarray,\n    alphas: np.ndarray,\n    alpha_bars: np.ndarray,\n    betas: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Single reverse denoising step: p_theta(x_{t-1} | x_t).\n    \"\"\"\n    beta_t = betas[t]\n    alpha_t = alphas[t]\n    alpha_bar_t = alpha_bars[t]\n    \n    # Step 1: Compute mean vector of reverse Gaussian distribution\n    coef = beta_t / np.sqrt(1.0 - alpha_bar_t)\n    mean = (1.0 / np.sqrt(alpha_t)) * (x_t - coef * pred_noise)\n    \n    # Step 2: If at the final step t=0, return deterministic mean\n    if t == 0:\n        return mean\n    \n    # Step 3: Add stochastic noise scaled by sigma_t = sqrt(beta_t)\n    sigma_t = np.sqrt(beta_t)\n    z = np.random.randn(*x_t.shape)\n    return mean + sigma_t * z"
        },
        "hints": {
          "tier1": {
            "en": "Extract alpha_bar_t = alpha_bars[t].",
            "ar": "استخرج alpha_bar_t = alpha_bars[t]."
          },
          "tier2": {
            "en": "Scale x_0 by sqrt(alpha_bar_t).",
            "ar": "اضرب x_0 في الجذر التربيعي لـ alpha_bar_t."
          },
          "tier3": {
            "en": "Scale noise by sqrt(1 - alpha_bar_t).",
            "ar": "اضرب التشويش في الجذر التربيعي لـ (1 - alpha_bar_t)."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: In modern text-to-image diffusion models (e.g. Stable Diffusion 3, Flux), generation utilizes",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ نماذج الانتشار الاحتمالية لإزالة التشويش (DDPM) ومطابقة درجات الاحتمال تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The image collapses to a completely black canvas because the learning rate during sampling diverges to infinity.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Extreme guidance over-amplifies the conditional score vector along the direction of prompt tokens, driving pixel activations outside the valid $[-1, 1]$ bounding box; this causes severe dynamic range saturation, unnatural contrast artifacts (\"burnt\" / over-saturated textures), and severe loss of sample diversity (mode collapse).",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The U-Net weights revert to random initialization due to numerical overflow in floating-point normalization.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The reverse SDE converts into an ordinary differential equation (ODE) that cannot be solved by Euler integrators.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "autonomous-react-agent-loop",
    "title": "Autonomous AI Agents: ReAct Reasoning & Action Execution Loop",
    "titleAr": "الوكلاء المستقلون بالذكاء الاصطناعي: حلقة ReAct للتفكير والتنفيذ",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Standard foundation models confined to passive, single-turn text generation are inherently brittle: they cannot inspect external databases,...",
      "ar": "النماذج اللغوية المحصورة في وضع التوليد النصي المنفرد لمرة واحدة تعاني من قصور جوهري: فهي عاجزة عن فحص قواعد البيانات الحية، أو التحقق من..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer",
      "dpo-direct-preference-optimization"
    ],
    "x": 1145,
    "y": 3120,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "Standard foundation models confined to passive, single-turn text generation are inherently brittle: they cannot inspect external databases, verify real-time facts, run code, or self-correct reasoning mistakes when assumptions fail. If you ask a raw language model to analyze a live database or compute complex numbers, it simply hallucinates plausible-sounding but completely fabricated results.\n\nThe **ReAct (Reasoning + Acting)** paradigm (Yao et al., 2022) elevates a frozen language model into an autonomous agent capable of solving multi-step tasks in dynamic software environments. ReAct tightly integrates two fundamental modes of cognition into an interleaved execution loop:\n1. **Thought (Reasoning Traces):** The agent verbalizes its internal cognitive state, decomposes ambiguous user goals into concrete sub-problems, tracks working hypotheses, and plans subsequent steps.\n2. **Action (Environmental Grounding):** The agent formats and dispatches structured tool calls targeting external software systems (e.g., executing SQL queries, querying vector search indices, invoking shell commands, or computing mathematical expressions).\n3. **Observation (Environmental Feedback):** The external sandbox or API executes the command and feeds the raw execution output back into the agent's context window.\n4. **Iterative Refinement:** The agent analyzes the new observation, updates its working memory, and repeats the cycle until synthesizing a verified **Final Answer**.\n\n> **Frontier Analogy:** Think of a master detective solving an intricate crime. A rookie immediately guesses a suspect off the top of their head and gets it wrong. A master detective writes analytical notes in their case notebook (Thought), visits the archive to check property deeds (Action: Tool Call), inspects the dusty signatures (Observation), adjusts their hypothesis, and repeats until the case is proved beyond all reasonable doubt.\n\nIn real-world production environments, deploying autonomous agents requires engineering robust **Agent Execution Governors**. Without strict circuit breakers—such as action hashing for cycle detection, exponential backoff for flaky external APIs, and hard maximum step budgets ($T_{\\max}$)—an agent encountering a transient error will fall into an infinite execution loop, burning thousands of dollars in LLM tokens while failing to complete the user's objective.",
          "ar": "النماذج اللغوية المحصورة في وضع التوليد النصي المنفرد لمرة واحدة تعاني من قصور جوهري: فهي عاجزة عن فحص قواعد البيانات الحية، أو التحقق من الحقائق الآنية، أو تشغيل الأكواد البرمجية، أو تصحيح مسار استدلالها عند مواجهة أخطاء غير متوقعة.\n\nيحول إطار عمل **ReAct (التفكير + الفعل)** النموذج اللغوي التأسيسي إلى \"وكيل ذكي مستقل\" قادر على تنفيذ أهداف معقدة متعددة المراحل عبر حلقة تفاعلية مستمرة:\n1. **التفكير (Thought):** يصيغ الوكيل أفكاره واستنتاجاته الداخلية، ويقسم الهدف الإجمالي إلى أهداف فرعية قابلة للتنفيذ.\n2. **الفعل (Action):** يُنشئ الوكيل استدعاءً برمجياً مهيكلاً لأداة خارجية (مثل استعلام قاعدة بيانات SQL، أو تشغيل كود بايثون، أو البحث في الويب).\n3. **الملاحظة (Observation):** تُنفذ البيئة البرمجية الخارجية الأداة وتعيد النتائج والبيانات الخام مباشرة إلى سياق الذاكرة العاملة للوكيل.\n4. **التكرار والإنهاء:** يحلل الوكيل الملاحظات الجديدة، ويعدل خطته، ويكرر الدورة حتى يصل إلى الإجابة النهائية المبرهنة.\n\nالوكيل المستقل يشبه محققاً بارعاً يحل لغزاً جنائياً غامضاً: فهو لا يلقي التخمينات عشوائياً، بل يكتب ملاحظاته الاستنتاجية في مفكرته (التفكير)، ثم يجمع الأدلة الجنائية ويفحص البصمات (الفعل والملاحظة)، ويعدل نظريته حتى يكتمل بناء الحقيقة دون أي ثغرة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\tau_t = \\left( c, a_1, o_1, a_2, o_2, \\dots, a_{t-1}, o_{t-1} \\right), \\quad a_t \\sim \\pi_\\theta(a_t \\mid \\tau_t)",
        "formulaNote": {
          "en": "Autonomous agent trajectory state-action-observation loop with cycle detection.",
          "ar": "حلقة التفاعل المستقلة لمسار الوكيل الذكي (حالة-فعل-ملاحظة) مع كاشف الحلقات التكرارية."
        },
        "narrative": {
          "en": "Where the action space $\\mathcal{A}$ encompasses both domain tool calls and task completion:\n\n$$\no_t = \\mathcal{E}(a_t, s_t), \\quad a_t \\in \\mathcal{A}_{\\text{tools}} \\cup \\{ \\text{Finish}(\\text{answer}) \\}\n$$\n\nThe execution runtime enforces deterministic termination conditions to guarantee safety:\n\n$$\n\\text{Stopping Invariant: } a_t = \\text{Finish} \\lor t \\ge T_{\\max} \\lor \\text{hash}(a_t) \\in \\mathcal{H}_{\\text{cycle}}\n$$\n\n### Comprehensive Symbol & Parameter Breakdown\n\n| Symbol | Dimensionality | Mathematical Interpretation | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $c$ | Text | High-level user goal / system instructions | The root task definition grounding the entire trajectory. |\n| $\\tau_t$ | Sequence | Accumulated interaction context history | The active working memory prompt fed into the LLM at step $t$. |\n| $\\pi_\\theta$ | Distribution | Autoregressive foundation language model | Evaluates context and samples the next cognitive thought or action. |\n| $a_t = (\\text{tool}, \\text{args})$ | Tuple | Structured action invocation | Dispatches parameter payload to external software runtime. |\n| $\\mathcal{E}$ | Environment | External software execution environment | Executes API calls, Python sandboxes, or database engines. |\n| $o_t$ | String | Raw execution observation | Feedback appended to trajectory $\\tau_{t+1} = (\\tau_t, a_t, o_t)$. |\n| $T_{\\max}$ | Integer | Maximum execution step budget | Hard computational circuit breaker preventing infinite loops. |\n| $\\mathcal{H}_{\\text{cycle}}$ | Set | Hash history of previous actions | Detects repetitive identical actions and triggers corrective replanning. |\n\n---\n\n## Beat 3: Python Challenge\n\nImplement `parse_react_output` to parse Thought, Action, and Action Input from model outputs, and `execute_agent_step` with deterministic cycle detection.",
          "ar": "تضمن هذه الصياغة الرياضية ضبط سلوك الوكيل الذكي عبر ربط تفكيره الداخلي بالأفعال الفيزيائية في بيئة التشغيل، مع توفير ضمانات أمان حتمية تمنع الوقوع في فخ الحلقات اللانهائية وهدر موارد السحابة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-autonomous-react-agent-loop",
          "starterCode": "def parse_react_output(model_output: str) -> dict:\n    \"\"\"\n    Parses an LLM generation string into ReAct Thought, Action, and Action Input.\n    \n    Parameters\n    ----------\n    model_output : str\n        Raw string containing Thought, Action, and Action Input,\n        or Thought and Final Answer.\n        \n    Returns\n    -------\n    dict with keys:\n        'thought': str,\n        'action': str | None,\n        'action_input': str | None,\n        'final_answer': str | None,\n        'is_final': bool\n    \"\"\"\n    # Step 1: Check for Final Answer termination pattern\n    # Step 2: Extract reasoning Thought string\n    # Step 3: Extract Action identifier\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "output = 'Thought: Need calc\\nAction: add\\nAction Input: 2, 3'; parsed = parse_react_output(output); parsed['action']",
              "expected": "add"
            },
            {
              "input": "output = 'Thought: Done\\nFinal Answer: 42'; parsed = parse_react_output(output); parsed['is_final']",
              "expected": "True"
            }
          ],
          "expectedOutput": "add",
          "variants": {
            "python": {
              "starterCode": "def parse_react_output(model_output: str) -> dict:\n    \"\"\"\n    Parses an LLM generation string into ReAct Thought, Action, and Action Input.\n    \n    Parameters\n    ----------\n    model_output : str\n        Raw string containing Thought, Action, and Action Input,\n        or Thought and Final Answer.\n        \n    Returns\n    -------\n    dict with keys:\n        'thought': str,\n        'action': str | None,\n        'action_input': str | None,\n        'final_answer': str | None,\n        'is_final': bool\n    \"\"\"\n    # Step 1: Check for Final Answer termination pattern\n    # Step 2: Extract reasoning Thought string\n    # Step 3: Extract Action identifier\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "add"
            }
          },
          "solution": "import re\n\ndef parse_react_output(model_output: str) -> dict:\n    \"\"\"\n    Parses an LLM generation string into ReAct Thought, Action, and Action Input.\n    \n    Parameters\n    ----------\n    model_output : str\n        Raw string containing Thought, Action, and Action Input,\n        or Thought and Final Answer.\n        \n    Returns\n    -------\n    dict with keys:\n        'thought': str,\n        'action': str | None,\n        'action_input': str | None,\n        'final_answer': str | None,\n        'is_final': bool\n    \"\"\"\n    # Step 1: Check for Final Answer termination pattern\n    final_match = re.search(r\"Final Answer:\\s*(.*)\", model_output, re.DOTALL)\n    if final_match:\n        thought_match = re.search(r\"Thought:\\s*(.*?)(?=Final Answer:|$)\", model_output, re.DOTALL)\n        thought = thought_match.group(1).strip() if thought_match else \"\"\n        return {\n            'thought': thought,\n            'action': None,\n            'action_input': None,\n            'final_answer': final_match.group(1).strip(),\n            'is_final': True\n        }\n        \n    # Step 2: Extract reasoning Thought string\n    thought_match = re.search(r\"Thought:\\s*(.*?)(?=Action:|$)\", model_output, re.DOTALL)\n    thought = thought_match.group(1).strip() if thought_match else \"\"\n    \n    # Step 3: Extract Action identifier\n    action_match = re.search(r\"Action:\\s*([a-zA-Z0-9_\\-]+)\", model_output)\n    action = action_match.group(1).strip() if action_match else None\n    \n    # Step 4: Extract Action Input argument string\n    input_match = re.search(r\"Action Input:\\s*(.*)\", model_output, re.DOTALL)\n    action_input = input_match.group(1).strip() if input_match else None\n    \n    return {\n        'thought': thought,\n        'action': action,\n        'action_input': action_input,\n        'final_answer': None,\n        'is_final': False\n    }\n\ndef execute_agent_step(\n    model_output: str,\n    tool_registry: dict,\n    seen_actions: set\n) -> tuple[str, bool]:\n    \"\"\"\n    Executes a single ReAct step with cycle detection.\n    \n    Returns\n    -------\n    observation_str : str\n    is_finished : bool\n    \"\"\"\n    parsed = parse_react_output(model_output)\n    # Step 1: Check if agent concluded with final answer\n    if parsed['is_final']:\n        return parsed['final_answer'], True\n        \n    act = parsed['action']\n    inp = parsed['action_input']\n    \n    # Step 2: Cycle detection safeguard against infinite loops\n    call_sig = (act, inp)\n    if call_sig in seen_actions:\n        return \"Error: Infinite loop cycle detected. Try an alternative strategy.\", False\n    seen_actions.add(call_sig)\n    \n    # Step 3: Dispatch tool from registered tool catalog\n    if act not in tool_registry:\n        return f\"Error: Tool '{act}' not recognized in tool registry.\", False\n        \n    try:\n        result = tool_registry[act](inp)\n        return str(result), False\n    except Exception as e:\n        return f\"Tool Execution Error: {str(e)}\", False"
        },
        "hints": {
          "tier1": {
            "en": "Check for 'Final Answer:' first to identify termination.",
            "ar": "ابحث عن 'Final Answer:' أولاً لتحديد شرط التوقف."
          },
          "tier2": {
            "en": "Extract Thought using regex lookahead (?=Action:|$).",
            "ar": "استخرج Thought باستخدام التعابير النمطية المنتهية بـ Action:."
          },
          "tier3": {
            "en": "Return a structured dictionary with action and action_input.",
            "ar": "أرجع قاموساً مهيكلاً يحتوي على action و action_input."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Scenario: You deploy an autonomous customer support agent equipped with API tools for checking orders, processing refunds, and querying internal knowledge bases. During a live test, an external database API experiences a transient 504 Gateway Timeout. The agent repeatedly re-executes the exact same query with identical parameters 45 times until exhausting its prompt context window and incurring massive cloud API costs. What architectural mechanism should be engineered into the agent runtime to permanently prevent this failure mode?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الوكلاء المستقلون بالذكاء الاصطناعي: حلقة ReAct للتفكير والتنفيذ تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Fine-tune the base LLM on an additional 100,000 conversational dialogues to eliminate errors.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Implement a deterministic **Agent Execution Governor** with three layers of defense: (1) **Action Cycle Detection** that hashes $(a_t, \\text{args})$ and halts repeated identical calls; (2) **Exponential Backoff and Retry Budgets** that limit any single tool to a maximum number of consecutive retries before injecting a fallback observation prompt; and (3) A strict **Global Step & Token Budget** ($T_{\\max} \\le 10$) that forces termination and human handoff whenever threshold limits are reached.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Replace the JSON tool call schema with unstructured plaintext strings.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Increase the GPU temperature parameter to 2.0 so the model explores random actions.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  }
];
