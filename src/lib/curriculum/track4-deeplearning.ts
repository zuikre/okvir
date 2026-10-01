import type { CurriculumModule } from '../types';

export const deeplearningModules: CurriculumModule[] = [
  {
    "id": "autograd-computational-graph",
    "title": "Scalar Autograd Node & Computational Graph Topology",
    "titleAr": "عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a modern automated assembly line in a high-tech factory. Raw materials enter from the left: Worker A combines two metal rods with...",
      "ar": "تخيّل خط تجميع ذكي داخل مصنع فائق التطور. تتدفق المواد الأولية من اليسار كمدخلات عددية: يقوم العامل الأول بدمج قطعتين بعملية جمع (c = a +..."
    },
    "prerequisites": [
      "differentiation-rules-chain",
      "first-class-closures"
    ],
    "x": 1095,
    "y": 80,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "Imagine a modern automated assembly line in a high-tech factory. Raw materials enter from the left: Worker A combines two metal rods with an addition weld ($c = a + b$), and Worker B machines the output by scaling it ($d = c \\times w$). In traditional software, when the CPU executes `c = a + b`, it writes the sum into a register and immediately forgets the past: it completely discards the lineage that $c$ was born from $a$ and $b$.\n\nAutomatic differentiation (Autograd) transforms passive numerical values into active, conscious graph nodes. Every worker on our assembly line keeps a permanent work log. When Worker B finishes an operation, they remember:\n1. The exact inputs they received from upstream workers (`_prev` dependencies).\n2. The exact mechanical tool they used (`_op = '*'` or `'+'`).\n3. Their current output value (`data`).\n\nWhen a final defect or discrepancy is measured at the end of the factory line—the scalar loss $L$—this historical lineage allows blame (gradients) to be passed backwards step-by-step from worker to worker, answering the foundational question of machine learning: *\"If I nudge this worker's input knob by an infinitesimal amount $\\epsilon$, exactly how much does the final factory output change?\"*",
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
          "en": "Where:\n* $v_i \\in \\mathbb{R}$: The scalar value computed at vertex $i$.\n* $f_i: \\mathbb{R}^k \\to \\mathbb{R}$: An elementary differentiable primitive operation ($+, -, \\times, \\div, (\\cdot)^k, \\exp, \\log$).\n* $\\text{Parents}(v_i) \\subset \\mathcal{V}$: The set of antecedent nodes whose values serve as direct arguments to $f_i$.\n* $\\mathcal{V} = \\{v_1, v_2, \\dots, v_N\\}$: Topological ordering of all generated computational nodes.\n* $\\mathcal{E}$: Directed edges encoding data lineage, flowing forward during forward evaluation and backward during reverse-mode sensitivity accumulation.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nBuild the foundational scalar `Value` node for our micrograd-style autograd engine. Implement `__add__`, `__mul__`, and `__pow__` such that operations accept both `Value` objects and raw Python numeric primitives (`int`, `float`), correctly recording children and operator tags.",
          "ar": "في الصياغة الرياضية الدقيقة، يُعرَّف الرسم البياني الحسابي كفضاء طوبولوجي موجه غير دائري $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$. تمثل كل عقدة $v_i$ قيمة سلمية حقيقية ناتجة عن تطبيق دالة أولية قابلة للاشتقاق $f_i$ على مخرجات العقد الأبوية السابقة $\\text{Parents}(v_i)$. تشكل الحواف الموجهة $\\mathcal{E}$ مسارات تدفق البيانات للأمام ومسارات رجوع تدرجات الحساسية الرياضية في الاتجاه العكسي."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-autograd-computational-graph",
          "starterCode": "class Value:\n    \"\"\"Scalar autograd node for dynamic computational graph tracking.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        # TODO: Convert other to Value if necessary, return new Value with (self, other) children and '+' op\n        pass\n\n    def __mul__(self, other):\n        # TODO: Convert other to Value if necessary, return new Value with (self, other) children and '*' op\n        pass\n\n    def __pow__(self, other: float | int):\n        # TODO: Assert exponent is int or float, return new Value with (self,) child and f'**{other}' op\n        pass\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)",
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
              "starterCode": "class Value:\n    \"\"\"Scalar autograd node for dynamic computational graph tracking.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        # TODO: Convert other to Value if necessary, return new Value with (self, other) children and '+' op\n        pass\n\n    def __mul__(self, other):\n        # TODO: Convert other to Value if necessary, return new Value with (self, other) children and '*' op\n        pass\n\n    def __pow__(self, other: float | int):\n        # TODO: Assert exponent is int or float, return new Value with (self,) child and f'**{other}' op\n        pass\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)",
              "expectedOutput": "10.0"
            }
          },
          "solution": "class Value:\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        return Value(self.data + other.data, (self, other), '+')\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        return Value(self.data * other.data, (self, other), '*')\n\n    def __pow__(self, other: float | int):\n        assert isinstance(other, (int, float)), \"Power exponent must be int or float\"\n        return Value(self.data ** other, (self,), f'**{other}')\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)"
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
            "en": "Why does reverse-mode automatic differentiation require constructing an explicit graph of connected nodes in memory, rather than simply updating numerical derivatives eagerly during the forward pass?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In reverse-mode autograd, calculating the sensitivity of an input requires the upstream gradient from the final loss, which is not known until the forward pass completes. Intermediate activations and child-parent links must be retained in memory to evaluate local derivatives backwards.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "In forward mode, computing the gradient of $N$ inputs with respect to 1 output requires $N$ separate forward passes. In reverse-mode (backpropagation), a single backward traversal yields gradients for all $N$ parameters simultaneously, but demands saving the execution lineage and forward activations in memory.",
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
    "id": "reverse-mode-derivative-closures",
    "title": "Elementary Backward Operations & Local Adjoints",
    "titleAr": "العمليات العكسية الأولية والمشتقات المرافقة المحلية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In multivariable calculus, the chain rule is often taught as an intimidating cascade of nested partial derivative expansions.",
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
          "en": "In multivariable calculus, the chain rule is often taught as an intimidating cascade of nested partial derivative expansions. But from the perspective of an individual worker on our computational assembly line, backpropagation is delightfully simple and purely local.\n\nConsider Worker C performing a multiplication $c = a \\times b$. Worker C does not need to know whether the neural network has two layers or two hundred layers, nor what loss function sits at the end of the factory. Worker C only needs to answer one local question:\n*\"If $c$ receives 1 unit of blame from downstream, how much blame should I pass back to $a$, and how much to $b$?\"*\n\nBy basic calculus:\n* For addition ($c = a + b$), $\\frac{\\partial c}{\\partial a} = 1$ and $\\frac{\\partial c}{\\partial b} = 1$. The upstream blame passes straight through to both inputs without modification.\n* For multiplication ($c = a \\times b$), $\\frac{\\partial c}{\\partial a} = b$ and $\\frac{\\partial c}{\\partial b} = a$. Each input receives blame scaled by the *other* input's value!\n* For ReLU ($c = \\max(0, a)$), if the gate was open ($a > 0$), blame passes through; if the gate was closed ($a \\le 0$), blame is stopped dead at 0.\n\nEach node stores this local recipe inside a Python closure function (`_backward`). The closure captures the local derivatives, waits until the upstream gradient (`out.grad`) arrives, and then distributes blame to its parent nodes using `+=`.",
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
          "en": "Elementary local derivatives:\n$$\n\\frac{\\partial (v_1 + v_2)}{\\partial v_1} = 1, \\quad \\frac{\\partial (v_1 \\cdot v_2)}{\\partial v_1} = v_2, \\quad \\frac{\\partial \\text{ReLU}(v_1)}{\\partial v_1} = \\mathbb{I}(v_1 > 0)\n$$\n\nWhere:\n* $\\bar{v}_{\\text{out}} = \\frac{\\partial L}{\\partial v_{\\text{out}}}$: The upstream adjoint (incoming gradient from downstream consumers).\n* $\\frac{\\partial f}{\\partial v_j}$: The local Jacobian/derivative evaluated at the forward values of the inputs.\n* $\\mathrel{+}=$: The accumulation operator, strictly required by multivariable calculus whenever a node branches into multiple consumers.\n* $\\mathbb{I}(\\cdot)$: The indicator function, evaluating to $1$ when true and $0$ otherwise.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nEquip the scalar `Value` node with local backward closures (`_backward`) for addition, multiplication, and ReLU activation. Ensure gradients accumulate into children using `+=`.",
          "ar": "تمثل المتغيرات المرافقة $\\bar{v}_i = \\frac{\\partial L}{\\partial v_i}$ معدل الحساسية الكلي لدالة الهدف بالنسبة لكل عقدة. وفق قاعدة السلسلة الموضعية، يتضاعف التدرج العائد من الخلف بمقدار المشتقة الجزئية المباشرة للعملية. ويعد استخدام مؤثر الجمع التراكمي $\\mathrel{+}=$ إلزاماً رياضياً تفرضه قاعدة السلسلة متعددة المتغيرات عند تفرع مخرجات العقدة إلى أكثر من مسار استهلاك لاحق."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-reverse-mode-derivative-closures",
          "starterCode": "class Value:\n    \"\"\"Scalar autograd node with reverse-mode backward closures.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        # TODO: Define out._backward closure propagating out.grad to self.grad and other.grad using +=\n        pass\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        # TODO: Define out._backward closure implementing the product rule with +=\n        pass\n        return out\n\n    def relu(self):\n        out = Value(max(0.0, self.data), (self,), 'relu')\n        # TODO: Define out._backward closure passing out.grad only if self.data > 0\n        pass\n        return out",
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
              "starterCode": "class Value:\n    \"\"\"Scalar autograd node with reverse-mode backward closures.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        # TODO: Define out._backward closure propagating out.grad to self.grad and other.grad using +=\n        pass\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        # TODO: Define out._backward closure implementing the product rule with +=\n        pass\n        return out\n\n    def relu(self):\n        out = Value(max(0.0, self.data), (self,), 'relu')\n        # TODO: Define out._backward closure passing out.grad only if self.data > 0\n        pass\n        return out",
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
            "en": "Why is it a catastrophic bug in automatic differentiation to write `self.grad = out.grad` instead of `self.grad += out.grad` inside the backward closure?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ العمليات العكسية الأولية والمشتقات المرافقة المحلية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "If a variable is used more than once in the forward computation (e.g., $y = x \\times x$ or branching residual paths), the multivariable chain rule requires summing the gradients from all downstream paths: $\\frac{\\partial L}{\\partial x} = \\sum_j \\frac{\\partial L}{\\partial y_j} \\frac{\\partial y_j}{\\partial x}$. Direct assignment overwrites and forgets gradients from earlier paths.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "In computational graphs, variables frequently branch (e.g., in skip connections, multi-head projections, or polynomial powers). Whenever a node has an out-degree $> 1$, its total derivative is the sum of paths. Accumulating with `+=` is the software manifestation of the multivariable chain rule.",
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
    "id": "topological-sort-dag-backprop",
    "title": "Topological Sort DAG Execution & Full Backpropagation",
    "titleAr": "تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In our factory assembly line, imagine Worker X supplies sub-assemblies to both Worker Y and Worker Z, who both contribute to the final...",
      "ar": "في خط الإنتاج المتشعب، تخيل أن العامل X يوزع مخرجاته على عاملين لاحقين: Y و Z، وكلاهما يساهم في تشكيل المنتج النهائي."
    },
    "prerequisites": [
      "reverse-mode-derivative-closures",
      "pure-functions-recursion"
    ],
    "x": 1055,
    "y": 270,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AutogradGraphLab",
        "narrative": {
          "en": "In our factory assembly line, imagine Worker X supplies sub-assemblies to both Worker Y and Worker Z, who both contribute to the final product delivered to the customer. When a defect is discovered at the factory exit (the scalar loss $L$), in what order should we interrogate the workers?\n\nIf we interrogate Worker X first, Worker X has only received partial feedback—perhaps from Worker Y, but not yet from Worker Z! If Worker X calculates their blame prematurely, their backward contribution will be incomplete and corrupt.\n\nYou cannot determine a worker's total blame until **every single downstream customer** who used that worker's output has finished calculating their blame and pushed it back upstream!\n\nThis ordering principle is called **Topological Sort**. By performing a Depth-First Search (DFS) post-order traversal starting from the final loss node $L$, we build a linear ordering of nodes such that every edge points in the same direction. When we reverse this list, we get the exact sequence needed for backpropagation:\n1. Start at the root loss node $L$ and set its gradient to the base seed $\\frac{\\partial L}{\\partial L} = 1.0$.\n2. Step through each node in reverse topological order, calling its local `_backward()` closure.\n3. Every node is guaranteed to have accumulated 100% of its incoming gradients from all downstream consumers before it ever fires its own backward closure!",
          "ar": "في خط الإنتاج المتشعب، تخيل أن العامل X يوزع مخرجاته على عاملين لاحقين: Y و Z، وكلاهما يساهم في تشكيل المنتج النهائي. عند اكتشاف خلل في مخرج المصنع (قيمة الخسارة L)، بأي ترتيب يجب أن نحاسب العمال ونمرر التدرجات العكسية؟\n\nإذا قمنا بمحاسبة العامل X قبل أن ينتهي العاملان Y و Z من حساب نصيبهما من اللوم، فإن العامل X سيمرر تدرجاً جزئياً ناقصاً إلى العمال السابقين له. القاعدة الحتمية هي: لا يمكن لعقدة أن تمرر تدرجها للخلف حتى تجمع كل التدرجات القادمة من جميع العقد التي استهلكت مخرجاتها.\n\nيضمن الترتيب الطوبولوجي (Topological Sort) عبر البحث بالعمق أولاً (DFS) أن التدرجات العكسية تُنفذ بترتيب دقيق من دالة الخسارة رجوعاً إلى المدخلات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\frac{\\partial L}{\\partial v_i} = \\sum_{j \\in \\text{Children}(v_i)} \\frac{\\partial L}{\\partial v_j} \\frac{\\partial v_j}{\\partial v_i}",
        "formulaNote": {
          "en": "Total derivative expansion and reverse topological traversal invariant.",
          "ar": "توسيع المشتقة الإجمالية وشرط المسار الطوبولوجي المعكوس."
        },
        "narrative": {
          "en": "A topological sort of a directed acyclic graph $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$ is a linear ordering $\\pi = (u_1, u_2, \\dots, u_N)$ of its vertices such that:\n\n$$\n\\forall (u_j, u_k) \\in \\mathcal{E} \\implies j < k\n$$\n\nThe full backpropagation algorithm executes the reverse permutation $\\pi^{\\text{rev}} = (u_N, u_{N-1}, \\dots, u_1)$:\n1. **Initialize Seed:** $\\bar{u}_N \\leftarrow 1.0$, and $\\bar{u}_i \\leftarrow 0.0$ for all $i < N$.\n2. **Reverse Sweep:** For $i = N$ down to $1$:\n   $$\\forall p \\in \\text{Parents}(u_i): \\quad \\bar{p} \\mathrel{+}= \\bar{u}_i \\cdot \\frac{\\partial u_i}{\\partial p}$$\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nComplete the `backward()` method on the `Value` node. Construct the topological order using a post-order DFS traversal, initialize `self.grad = 1.0`, and iterate through the reversed list calling each node's `_backward()`.",
          "ar": "حيث يمثل $\\text{Children}(v_i)$ مجموعة العقد التي تعتمد مباشرة على $v_i$. يضمن الترتيب الطوبولوجي $\\pi$ ألا يتم تقييم المشتقة الجزئية لعقدة أبوية إلا بعد أن تستقر المشتقات الإجمالية لجميع أبنائها. بفضل هذه الخاصية الطوبولوجية، يتم حساب تدرجات جميع معاملات النموذج بتعقيد زمني خطي $O(|\\mathcal{V}| + |\\mathcal{E}|)$ في مسار عكسي واحد."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-topological-sort-dag-backprop",
          "starterCode": "class Value:\n    \"\"\"Scalar autograd node with full topological DAG backpropagation.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += out.grad\n            other.grad += out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        # TODO: 1. Build topological order list using recursive DFS post-order traversal\n        # TODO: 2. Initialize self.grad = 1.0\n        # TODO: 3. Iterate through reversed topological list and execute node._backward()\n        pass",
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
              "starterCode": "class Value:\n    \"\"\"Scalar autograd node with full topological DAG backpropagation.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += out.grad\n            other.grad += out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        # TODO: 1. Build topological order list using recursive DFS post-order traversal\n        # TODO: 2. Initialize self.grad = 1.0\n        # TODO: 3. Iterate through reversed topological list and execute node._backward()\n        pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "class Value:\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += out.grad\n            other.grad += out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        topo = []\n        visited = set()\n        def build_topo(v):\n            if v not in visited:\n                visited.add(v)\n                for child in v._prev:\n                    build_topo(child)\n                topo.append(v)\n        build_topo(self)\n        self.grad = 1.0\n        for node in reversed(topo):\n            node._backward()"
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
            "en": "What fatal issue arises if a programmer introduces a cycle into a computational graph (e.g. $A \\to B \\to A$) and calls `.backward()`?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "A directed cycle violates the Directed Acyclic Graph (DAG) requirement, causing DFS topological sorting to enter an infinite recursion loop or fail to find a valid linear order; cyclic dependencies (such as in RNNs) must first be unrolled across discrete time steps.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Neural networks with internal recurrence (like RNNs or LSTMs) circumvent this by \"unrolling through time\" (Backpropagation Through Time, BPTT). Each time step creates a new copy of the hidden state vertex, transforming a cyclic temporal system into an acyclic spatial DAG.",
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
    "id": "perceptron-activation",
    "title": "Artificial Neuron & Non-Linear Activation Functions",
    "titleAr": "العصبون الاصطناعي ودوال التنشيط غير الخطية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "At the core of all deep neural architectures lies a simple building block: the artificial neuron (perceptron).",
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
          "en": "At the core of all deep neural architectures lies a simple building block: the artificial neuron (perceptron). A single neuron takes an incoming feature vector $\\mathbf{x} = [x_1, x_2, \\dots, x_d]$, scales each feature by an adjustable synaptic weight $w_i$, adds a scalar bias $b$ to set the firing threshold, and computes a linear combination $z = \\mathbf{w}^T \\mathbf{x} + b$.\n\nHowever, if you connect multiple layers of purely linear neurons—say, a 100-layer network $\\mathbf{y} = \\mathbf{W}_{100}(\\dots \\mathbf{W}_2(\\mathbf{W}_1 \\mathbf{x}))\\dots$—the entire network collapses mathematically into a single flat matrix multiplication $\\mathbf{y} = \\mathbf{W}_{\\text{eff}} \\mathbf{x}$. No matter how many layers or parameters you add, a purely linear network can only draw flat, rigid hyperplanes. It cannot bend space to separate intertwined data.\n\nNon-linear activation functions are the mathematical hinges of deep learning. They break linearity, allowing neural networks to bend, fold, and twist high-dimensional feature spaces:\n* **Sigmoid ($\\sigma$):** Squeezes numbers into the smooth probability range $(0, 1)$, but saturates for large inputs, causing gradients to vanish.\n* **ReLU ($\\max(0, x)$):** Computationally cheap and non-saturating for positive values, enabling deep architectures to train efficiently, but suffers from the \"dying ReLU\" problem when neurons become permanently deactivated.\n* **GELU ($x \\Phi(x)$):** Smooth, probabilistic non-linearity used across modern Transformer architectures (GPT-4, Claude, LLaMA), weighting inputs by how likely they are to exceed a Gaussian threshold.",
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
          "en": "Canonical activation functions and their derivatives:\n$$\n\\text{ReLU}(z) = \\max(0, z), \\quad \\frac{d\\text{ReLU}}{dz} = \\mathbb{I}(z > 0)\n$$\n$$\n\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\frac{d\\sigma}{dz} = \\sigma(z)(1 - \\sigma(z))\n$$\n$$\n\\text{GELU}(z) = z \\cdot \\Phi(z) = z \\cdot \\frac{1}{2} \\left[ 1 + \\text{erf}\\left( \\frac{z}{\\sqrt{2}} \\right) \\right]\n$$\n\nWhere:\n* $\\mathbf{x} \\in \\mathbb{R}^d$: The input feature vector.\n* $\\mathbf{w} \\in \\mathbb{R}^d$: Learnable synaptic weight parameters.\n* $b \\in \\mathbb{R}$: Learnable scalar bias term controlling threshold sensitivity.\n* $z \\in \\mathbb{R}$: The pre-activation linear logit.\n* $\\Phi(z) = P(X \\le z)$ for $X \\sim \\mathcal{N}(0, 1)$: Standard Gaussian cumulative distribution function.\n* $\\text{erf}$: The Gauss error function.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the forward evaluation of a single neuron `neuron_forward(x, w, b, activation)` supporting `'linear'`, `'relu'`, and `'sigmoid'` activations using vectorized NumPy operations.",
          "ar": "تُعرّف استجابة العصبون الاصطناعي كتحويل تآلفي (Affine) يتبعه تطبيق دالة تنشيط غير خطية $\\phi$. توفر دالة Sigmoid اشتقاقاً ذاتي المرجعية $\\sigma(1-\\sigma)$ ينعدم عند الأطراف، في حين تحافظ دالة ReLU على تدرج ثابت قدره 1 للمدخلات الموجبة، بينما تضفي GELU استمرارية تفاضلية ناعمة تمتد عبر تضاريس الخسارة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-perceptron-activation",
          "starterCode": "import numpy as np\n\ndef neuron_forward(x: np.ndarray, w: np.ndarray, b: float, activation: str = 'relu') -> float:\n    \"\"\"\n    Computes forward pass of a single artificial neuron with activation.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (D,) - Input vector\n    w : np.ndarray of shape (D,) - Weight vector\n    b : float - Scalar bias\n    activation : str - One of 'linear', 'relu', 'sigmoid'\n    \"\"\"\n    # TODO: 1. Calculate linear projection z = dot(w, x) + b\n    # TODO: 2. Apply requested activation ('relu': max(0, z), 'sigmoid': 1/(1+exp(-z)), 'linear': z)\n    pass",
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
              "starterCode": "import numpy as np\n\ndef neuron_forward(x: np.ndarray, w: np.ndarray, b: float, activation: str = 'relu') -> float:\n    \"\"\"\n    Computes forward pass of a single artificial neuron with activation.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (D,) - Input vector\n    w : np.ndarray of shape (D,) - Weight vector\n    b : float - Scalar bias\n    activation : str - One of 'linear', 'relu', 'sigmoid'\n    \"\"\"\n    # TODO: 1. Calculate linear projection z = dot(w, x) + b\n    # TODO: 2. Apply requested activation ('relu': max(0, z), 'sigmoid': 1/(1+exp(-z)), 'linear': z)\n    pass",
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
            "en": "Why does the \"Dying ReLU\" phenomenon occur in deep networks, and why do smooth activations like GELU eliminate it?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ العصبون الاصطناعي ودوال التنشيط غير الخطية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "If large gradient updates drive a neuron's weights such that $z = \\mathbf{w}^T \\mathbf{x} + b < 0$ for all training samples, the ReLU derivative is identically zero ($\\frac{da}{dz} = 0$). No gradient can ever flow backward through the neuron, freezing its weights permanently. GELU avoids this by retaining a small, non-zero curvature in the negative regime.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "In high-dimensional deep networks, an aggressive learning rate can shift a substantial fraction (up to 30%) of ReLU units into the inactive zone ($z < 0$), rendering those parameters dead capacity. Smooth non-monotonic functions like GELU and SwiGLU allow slight negative leakage, keeping gradient pathways open.",
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
    "id": "numerically-stable-softmax-cross-entropy",
    "title": "Softmax & Cross-Entropy Loss with Log-Sum-Exp Stability",
    "titleAr": "دالة الاحتمالات Softmax ودالة الخسارة التقاطعية بالاستقرار العددي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In multi-class classification and autoregressive language modeling, a neural network produces a raw vector of unconstrained real numbers...",
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
          "en": "In multi-class classification and autoregressive language modeling, a neural network produces a raw vector of unconstrained real numbers called **logits** $\\mathbf{z} \\in (-\\infty, \\infty)^K$. A logit could be $-15.4$, $+0.2$, or $+104.8$. How do we transform these unbounded scores into a meaningful, coherent probability distribution where every outcome is positive and all outcomes sum to exactly $1.0$?\n\nEnter the **Softmax** operator:\n1. It exponentiates every logit ($e^{z_i}$), ensuring all values become strictly positive.\n2. It divides each exponential by the sum of all exponentials ($\\sum_j e^{z_j}$), normalizing the vector into a valid probability simplex.\n\nOnce we have probabilities, **Cross-Entropy Loss** measures how surprised the model is when told the true class $y^*$: $\\mathcal{L} = -\\log(p_{y^*})$. If the model assigned a probability of $0.99$ to the correct class, $-\\log(0.99) \\approx 0.01$ (minimal penalty). If it assigned a probability of $0.001$, $-\\log(0.001) \\approx 6.9$ (severe penalty).\n\n**The Numerical Stability Trap:**\nComputers represent numbers using finite 32-bit floating-point registers. If a logit reaches $+1000$, evaluating $e^{1000}$ triggers floating-point overflow (`inf`). Dividing `inf / inf` yields `NaN`, instantly corrupting all model weights.\nThe solution is the elegant **Log-Sum-Exp trick**: we subtract the maximum logit $c = \\max(\\mathbf{z})$ from every logit before exponentiating. Because $\\frac{e^{z_i - c}}{\\sum_j e^{z_j - c}} = \\frac{e^{-c} e^{z_i}}{e^{-c} \\sum_j e^{z_j}} = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$, the resulting probabilities are mathematically identical, but the highest exponent is now guaranteed to be $e^0 = 1.0$, completely banishing overflow!",
          "ar": "في مهام التصنيف وتوليد النصوص، تخرج الشبكة العصبية متجهاً من الأرقام الحقيقية غير المقيدة يُعرف بـ القيم المنطقية (Logits). تقوم دالة Softmax برفعها أسياً لضمان إيجابيتها ثم قسمتها على مجموع الأسس لتتحول إلى توزيع احتمالي يتكامل إلى 1.0 تماماً.\n\nتقيس دالة الخسارة التقاطعية (Cross-Entropy) مدى دقة التنبؤ بحساب سالب لوغاريتم احتمال الفئة المستهدفة. غير أن الحساب المباشر لهذه الدالة على الحواسيب يسبب فيضاناً عددياً كارثياً عند رفع قيم كبرى مثل e^1000.\n\nتحل حيلة لوغاريتم مجموع الأسس (Log-Sum-Exp Trick) هذه المعضلة بطرح القيمة العظمى max(z) من جميع القيم قبل الرفع الأسي، مما يضمن ألا يتجاوز أي أس القيمة صفر ويحقق استقراراً عددياً مطلقاً."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "p_i = \\frac{e^{z_i - \\max(\\mathbf{z})}}{\\sum_{j=1}^K e^{z_j - \\max(\\mathbf{z})}}, \\quad \\mathcal{L}_{\\text{CE}} = -\\sum_{k=1}^K y_k \\log p_k = -\\log p_{y^*}",
        "formulaNote": {
          "en": "Numerically stabilized Softmax, Cross-Entropy loss, and simplified analytical residual gradient.",
          "ar": "صيغة Softmax المستقرة عددياً، دالة الخسارة التقاطعية، والتدرج المتبقي التحليلي البسيط."
        },
        "narrative": {
          "en": "The combined analytical gradient with respect to input logits $z_i$ simplifies to the elegant error residual:\n\n$$\n\\frac{\\partial \\mathcal{L}_{\\text{CE}}}{\\partial z_i} = p_i - y_i\n$$\n\nWhere:\n* $\\mathbf{z} \\in \\mathbb{R}^K$: Unnormalized model logits.\n* $\\max(\\mathbf{z}) \\coloneqq \\max_{j} z_j$: Normalization shift factor preventing exponential overflow.\n* $p_i \\in (0, 1)$: Predicted probability assigned to class $i$ ($\\sum_{i=1}^K p_i = 1$).\n* $\\mathbf{y} \\in \\{0, 1\\}^K$: One-hot ground truth label vector with target index $y^*$.\n* $p_i - y_i$: The upstream gradient flowing backward into the final network layer.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the numerically stable `softmax_cross_entropy(logits, target_idx)` function using the max-subtraction trick. Return the scalar loss, probability distribution vector, and the analytical gradient vector $(p - y)$.",
          "ar": "تتميز تركيبة دالة الاحتمالات Softmax ودالة الخسارة التقاطعية بأن مشتقتها المشتركة بالنسبة للقيم المنطقية $z_i$ تختزل رياضياً إلى فارق بسيط ومباشر: $\\frac{\\partial \\mathcal{L}}{\\partial z_i} = p_i - y_i$. فإذا تنبأ النموذج باحتمال $0.8$ لفئة ما بينما القيمة الحقيقية هي $1.0$، فإن التدرج العكسي يساوي $-0.2$ دافعاً القيمة المنطقية إلى الارتفاع بدقة وتناسب تام."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-numerically-stable-softmax-cross-entropy",
          "starterCode": "import numpy as np\n\ndef softmax_cross_entropy(logits: np.ndarray, target_idx: int) -> tuple[float, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes numerically stable softmax probabilities, cross-entropy loss, and gradients.\n    \n    Parameters\n    ----------\n    logits : np.ndarray of shape (K,) - Raw unnormalized scores\n    target_idx : int - Integer index of true ground-truth class\n    \n    Returns\n    -------\n    tuple of (loss: float, probs: np.ndarray, grad: np.ndarray)\n    \"\"\"\n    # TODO: 1. Subtract np.max(logits) for numerical stability\n    # TODO: 2. Compute exponentiated scores and normalize to sum to 1.0\n    # TODO: 3. Compute cross-entropy loss: -log(probs[target_idx] + 1e-15)\n    # TODO: 4. Compute analytical gradient: grad = probs - one_hot\n    pass",
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
              "starterCode": "import numpy as np\n\ndef softmax_cross_entropy(logits: np.ndarray, target_idx: int) -> tuple[float, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes numerically stable softmax probabilities, cross-entropy loss, and gradients.\n    \n    Parameters\n    ----------\n    logits : np.ndarray of shape (K,) - Raw unnormalized scores\n    target_idx : int - Integer index of true ground-truth class\n    \n    Returns\n    -------\n    tuple of (loss: float, probs: np.ndarray, grad: np.ndarray)\n    \"\"\"\n    # TODO: 1. Subtract np.max(logits) for numerical stability\n    # TODO: 2. Compute exponentiated scores and normalize to sum to 1.0\n    # TODO: 3. Compute cross-entropy loss: -log(probs[target_idx] + 1e-15)\n    # TODO: 4. Compute analytical gradient: grad = probs - one_hot\n    pass",
              "expectedOutput": "1.0,True"
            }
          },
          "solution": "import numpy as np\n\ndef softmax_cross_entropy(logits: np.ndarray, target_idx: int) -> tuple[float, np.ndarray, np.ndarray]:\n    shifted = logits - np.max(logits)\n    exp_shifted = np.exp(shifted)\n    probs = exp_shifted / np.sum(exp_shifted)\n    loss = float(-np.log(probs[target_idx] + 1e-15))\n    grad = probs.copy()\n    grad[target_idx] -= 1.0\n    return loss, probs, grad"
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
            "en": "Why does the analytical gradient of combined Softmax and Cross-Entropy simplify to $(p_i - y_i)$, and what happens to the training dynamics when the model assigns $p_k \\approx 0.0001$ to the true class ($y_k = 1$)?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ دالة الاحتمالات Softmax ودالة الخسارة التقاطعية بالاستقرار العددي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The derivative of the logarithm in cross-entropy ($\\frac{d}{dp}(-\\log p) = -\\frac{1}{p}$) cancels the probability denominator in the softmax Jacobian; when the model assigns $p_k \\approx 0$ to the true target, the gradient is $p_k - 1 \\approx -1.0$, exerting the maximum possible linear restoring force without vanishing or saturating.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "If you paired Mean Squared Error (MSE) with Softmax instead of Cross-Entropy, the gradient would contain an additional factor of $p(1-p)$. When the model was confidently wrong ($p \\approx 0$), $p(1-p) \\approx 0$, causing gradients to vanish! Cross-Entropy guarantees a linear error signal $(p - y)$ that drives learning aggressively when the model makes severe errors.",
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
                "en": "When $p_k \\approx 0$, the gradient vanishes to zero, permanently stalling learning.",
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
                "en": "The simplification only holds if the logits are strictly normalized between 0 and 1 before entering the function.",
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
    "id": "two-layer-mlp-xor-boundary",
    "title": "Two-Layer Multi-Layer Perceptron & The Non-Linear XOR Boundary",
    "titleAr": "الشبكة متعددة الطبقات وحدود القرار غير الخطية لمعضلة XOR",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In 1969, AI pioneers Marvin Minsky and Seymour Papert published a landmark book titled Perceptrons, proving that a single linear neuron...",
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
          "en": "In 1969, AI pioneers Marvin Minsky and Seymour Papert published a landmark book titled *Perceptrons*, proving that a single linear neuron could never learn the simple XOR (Exclusive OR) logic function. This revelation triggered the first \"AI Winter,\" convincing the scientific community that neural networks were an evolutionary dead end.\n\nWhy does XOR defeat a single neuron?\nConsider the four corners of a 2D square:\n* $(0, 0) \\to 0$ (Class A)\n* $(0, 1) \\to 1$ (Class B)\n* $(1, 0) \\to 1$ (Class B)\n* $(1, 1) \\to 0$ (Class A)\n\nPlot these points on a sheet of paper. Try to draw a single straight ruler line that separates the two Class B points from the two Class A points. It is geometrically impossible! The classes cross diagonally. A single perceptron can only draw flat linear cuts.\n\nThe breakthrough comes when we add **a single hidden layer** of non-linear neurons, creating a Multi-Layer Perceptron (MLP). The hidden neurons act as a geometric folding machine:\n1. Hidden Neuron 1 fires when at least one input is active ($x_1 + x_2 \\ge 1$, acting like an OR gate).\n2. Hidden Neuron 2 fires only when *both* inputs are active ($x_1 + x_2 \\ge 2$, acting like an AND gate).\n3. The output neuron computes the difference: $\\text{OR} - 2 \\times \\text{AND}$!\n\nBy passing through the non-linear hidden layer, the 2D coordinate space is physically warped and folded. The previously tangled diagonal points land in a transformed space where a single straight linear cut easily separates them. This is the essence of deep learning: stacking layers to fold complex data manifolds until they become simple and linearly separable.",
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
          "en": "The canonical hand-crafted weight configuration that analytically solves XOR:\n$$\n\\mathbf{W}_1 = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}, \\quad \\mathbf{b}_1 = \\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix}, \\quad \\mathbf{w}_2 = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}, \\quad b_2 = 0\n$$\n\nVerification across the XOR truth table:\n* Input $(0, 0)$: $\\mathbf{h} = \\text{ReLU}([0, -1]^T) = [0, 0]^T \\implies \\hat{y} = 1(0) - 2(0) = 0$\n* Input $(0, 1)$: $\\mathbf{h} = \\text{ReLU}([1, 0]^T) = [1, 0]^T \\implies \\hat{y} = 1(1) - 2(0) = 1$\n* Input $(1, 0)$: $\\mathbf{h} = \\text{ReLU}([1, 0]^T) = [1, 0]^T \\implies \\hat{y} = 1(1) - 2(0) = 1$\n* Input $(1, 1)$: $\\mathbf{h} = \\text{ReLU}([2, 1]^T) = [2, 1]^T \\implies \\hat{y} = 1(2) - 2(1) = 0$\n\nWhere:\n* $\\mathbf{W}_1 \\in \\mathbb{R}^{d_h \\times d_{\\text{in}}}$: First layer weight matrix projecting into the hidden representation space.\n* $\\mathbf{b}_1 \\in \\mathbb{R}^{d_h}$: Hidden layer bias vector shifting the activation thresholds.\n* $\\mathbf{h} \\in \\mathbb{R}^{d_h}$: Non-linear hidden representation vector.\n* $\\mathbf{w}_2 \\in \\mathbb{R}^{d_h}, b_2 \\in \\mathbb{R}$: Output layer linear weights and bias.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the forward pass of a 2-layer MLP `mlp_xor_forward(x, W1, b1, w2, b2)`. Use the analytical XOR weights as defaults so that the network evaluates the complete XOR truth table with 100% accuracy.",
          "ar": "وفق مبرهنة التقريب الشامل (Universal Approximation Theorem)، تكفي طبقة خفية واحدة ذات سعة كافية ودوال تنشيط غير خطية لتقريب أي دالة رياضية مستمرة على مجالات مدمجة. تقوم مصفوفة الأوزان الأولى $\\mathbf{W}_1$ بتدوير وتمديد الفضاء، بينما تقوم دالة ReLU بقص المناطق السالبة وطي الفضاء، مما يسمح للعصبون الأخير برسم حد قرار قاطع ودقيق."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-layer-mlp-xor-boundary",
          "starterCode": "import numpy as np\n\ndef mlp_xor_forward(x: np.ndarray, \n                     W1: np.ndarray | None = None, \n                     b1: np.ndarray | None = None, \n                     w2: np.ndarray | None = None, \n                     b2: float = 0.0) -> float:\n    \"\"\"\n    Computes forward pass of a 2-layer MLP solving the XOR logic function.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (2,)\n    \"\"\"\n    if W1 is None:\n        W1 = np.array([[1.0, 1.0], [1.0, 1.0]])\n        b1 = np.array([0.0, -1.0])\n        w2 = np.array([1.0, -2.0])\n        b2 = 0.0\n\n    # TODO: 1. Compute hidden pre-activations z1 = dot(W1, x) + b1\n    # TODO: 2. Apply ReLU non-linearity: h = maximum(0.0, z1)\n    # TODO: 3. Compute output z2 = dot(w2, h) + b2 and return float\n    pass",
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
              "starterCode": "import numpy as np\n\ndef mlp_xor_forward(x: np.ndarray, \n                     W1: np.ndarray | None = None, \n                     b1: np.ndarray | None = None, \n                     w2: np.ndarray | None = None, \n                     b2: float = 0.0) -> float:\n    \"\"\"\n    Computes forward pass of a 2-layer MLP solving the XOR logic function.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (2,)\n    \"\"\"\n    if W1 is None:\n        W1 = np.array([[1.0, 1.0], [1.0, 1.0]])\n        b1 = np.array([0.0, -1.0])\n        w2 = np.array([1.0, -2.0])\n        b2 = 0.0\n\n    # TODO: 1. Compute hidden pre-activations z1 = dot(W1, x) + b1\n    # TODO: 2. Apply ReLU non-linearity: h = maximum(0.0, z1)\n    # TODO: 3. Compute output z2 = dot(w2, h) + b2 and return float\n    pass",
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
            "en": "If all activation functions in a 1,000-layer MLP are replaced with purely linear identity functions ($\\phi(z) = z$), can the network solve the XOR problem?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الشبكة متعددة الطبقات وحدود القرار غير الخطية لمعضلة XOR تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "No, because the composition of any finite number of linear transformations is strictly linear ($\\mathbf{W}_{1000} \\dots \\mathbf{W}_1 \\mathbf{x} = \\mathbf{W}_{\\text{eff}} \\mathbf{x}$); without non-linear activations, the network can only produce linear decision boundaries regardless of depth or width.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Depth without non-linearity is an illusion: a deep linear network possesses no more expressive power than a single-layer perceptron. Non-linear activations are what grant deep networks their universal approximation capability.",
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
    "id": "gradient-descent",
    "title": "Gradient Descent Optimization: Batch, Stochastic & Mini-Batch",
    "titleAr": "خوارزمية الانحدار التدريجي: الدفعة الكاملة، العشوائي، والدفعات المصغرة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are hiking on a sprawling, rugged mountain wrapped in dense, impenetrable fog.",
      "ar": "تخيّل أنك متسلق جبال تائه وسط ضباب كثيف يحجب عنك رؤية الوادي المنشود (نقطة النهاية الصغرى لدالة الخسارة)."
    },
    "prerequisites": [
      "two-layer-mlp-xor-boundary",
      "differentiation-rules-chain"
    ],
    "x": 975,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GradientDescentCanvas",
        "narrative": {
          "en": "Imagine you are hiking on a sprawling, rugged mountain wrapped in dense, impenetrable fog. You cannot see the lowest valley where base camp lies (the minimum of our loss function $\\mathcal{L}$). However, beneath your boots, you can feel the physical slope of the terrain: which direction tilts steepest upward ($\\nabla \\mathcal{L}$), and which direction leads steepest downward ($-\\nabla \\mathcal{L}$).\n\nIf you take a step in the direction of steepest descent, scaled by a cautious step size $\\eta$ (the learning rate), you are guaranteed locally to descend toward lower ground: $\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta \\mathbf{g}_t$.\n\nIn deep learning, how we measure this slope defines the three classical paradigms of Gradient Descent:\n1. **Full-Batch Gradient Descent ($B = N$):** You survey all 1,000,000 pebbles on the entire mountain before taking a single step. The slope estimate is exact and deterministic, but evaluating every data sample per step is excruciatingly slow and computationally prohibitive for massive datasets.\n2. **Stochastic Gradient Descent (SGD, $B = 1$):** You inspect a single randomly chosen pebble and leap in its downhill direction. It is lightning fast, but the gradient estimate is noisy and chaotic—bouncing erratically in random directions.\n3. **Mini-Batch Gradient Descent ($1 < B < N$):** The gold standard! You sample a small squad of 32, 64, or 256 pebbles. This strikes the perfect balance: it saturates GPU parallel tensor cores with efficient matrix multiplications while retaining beneficial stochastic jitter that helps escape shallow saddle points and sharp, sub-optimal local minima.",
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
          "en": "The parameter update rule at iteration $t$ using a mini-batch $\\mathcal{B}_t \\subset \\{1, \\dots, N\\}$ of size $B = |\\mathcal{B}_t|$:\n\n$$\n\\mathbf{g}_t = \\frac{1}{B} \\sum_{i \\in \\mathcal{B}_t} \\nabla_{\\boldsymbol{\\theta}} \\ell(f(\\mathbf{x}_i; \\boldsymbol{\\theta}_t), y_i), \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta \\mathbf{g}_t\n$$\n\nWhere:\n* $\\boldsymbol{\\theta}_t \\in \\mathbb{R}^P$: The parameter vector containing all weights and biases at step $t$.\n* $\\eta > 0$: The learning rate hyperparameter governing step magnitude.\n* $\\mathcal{B}_t$: Uniform random mini-batch of indices sampled without replacement from the dataset.\n* $\\mathbf{g}_t$: Unbiased estimator of the true population gradient: $\\mathbb{E}[\\mathbf{g}_t] = \\nabla \\mathcal{L}(\\boldsymbol{\\theta}_t)$.\n* $\\text{Var}(\\mathbf{g}_t) \\propto \\frac{\\sigma^2}{B}$: Gradient variance, inversely proportional to mini-batch size $B$.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the single-step parameter update function `sgd_step(params, grads, lr)` that performs in-place or vectorized gradient descent updates across parameter tensors.",
          "ar": "يمثل متجه $\\mathbf{g}_t$ تقديراً غير متحيز لتدرج دالة الخسارة الحقيقية. وتتناسب ضوضاء التقدير (التباين $\\text{Var}$) عكسياً مع حجم الدفعة المصغرة $B$. وتضمن هذه الضوضاء العشوائية عدم استقرار النموذج في نهايات صغرى حادة وضعيفة التعميم، دافعةً المعاملات نحو أودية منبسطة تتسم بمتانة عالية وقدرة فائقة على التعميم على بيانات الاختبار."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-descent",
          "starterCode": "import numpy as np\n\ndef sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:\n    \"\"\"\n    Executes a single Gradient Descent parameter update step.\n    \n    Parameters\n    ----------\n    params : np.ndarray - Current parameter values\n    grads : np.ndarray - Evaluated gradient vector with respect to params\n    lr : float - Learning rate step size\n    \n    Returns\n    -------\n    np.ndarray - Updated parameter vector\n    \"\"\"\n    # TODO: Implement parameter update theta_{t+1} = theta_t - lr * g_t\n    pass",
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
              "starterCode": "import numpy as np\n\ndef sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:\n    \"\"\"\n    Executes a single Gradient Descent parameter update step.\n    \n    Parameters\n    ----------\n    params : np.ndarray - Current parameter values\n    grads : np.ndarray - Evaluated gradient vector with respect to params\n    lr : float - Learning rate step size\n    \n    Returns\n    -------\n    np.ndarray - Updated parameter vector\n    \"\"\"\n    # TODO: Implement parameter update theta_{t+1} = theta_t - lr * g_t\n    pass",
              "expectedOutput": "4.8,-2.9"
            }
          },
          "solution": "import numpy as np\n\ndef sgd_step(params: np.ndarray, grads: np.ndarray, lr: float = 0.01) -> np.ndarray:\n    return params - lr * grads"
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
            "en": "Why does training deep networks with mini-batch sizes like 32 or 128 often generalize better to unseen test data than training with full-batch gradient descent ($B=N$), even when both reach low training loss?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية الانحدار التدريجي: الدفعة الكاملة، العشوائي، والدفعات المصغرة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The stochastic gradient noise inherent in mini-batches acts as an implicit regularizer, preventing weights from settling into sharp, brittle local minima that overfit training data, and instead steering optimization into wide, flat valleys that generalize robustly.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "In high-dimensional non-convex optimization, \"flat minima\" are vastly preferable to \"sharp minima\" because slight shifts between training and test distributions do not cause catastrophic spikes in loss. Stochastic mini-batch noise naturally escapes sharp crevices.",
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
    "id": "momentum-rmsprop-adaptive",
    "title": "Momentum & RMSprop: Ravine Traversal & Adaptive Learning Rates",
    "titleAr": "العزم والتكيف بمعدل RMSprop: اجتياز الوديان ومعدلات التعلم التكيفية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine navigating a steep, narrow canyon in the loss landscape. Along the North-South axis, the canyon walls rise vertically like towering...",
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
          "en": "Imagine navigating a steep, narrow canyon in the loss landscape. Along the North-South axis, the canyon walls rise vertically like towering cliffs with enormous gradient steepness. Along the East-West axis, the canyon floor slopes downward very gently toward the true minimum.\n\nIf you drop standard Gradient Descent into this ravine, disaster strikes! The massive gradients on the steep North-South walls kick the optimizer violently back and forth across the canyon, while the tiny gradient on the floor makes almost zero progress forward. If you increase the learning rate to make faster forward progress, the side-to-side oscillations explode and diverge into numerical instability.\n\nTwo groundbreaking ideas tame this ill-conditioned terrain:\n\n1. **Polyak Momentum (The Heavy Bowling Ball):**\nInstead of treating each step as an isolated static leap, give the optimizer physical mass and momentum. Think of rolling a heavy bowling ball down the canyon. As the ball sloshes back and forth across the walls, the opposing North-South forces cancel each other out over time. Meanwhile, the persistent gentle nudge along the East-West canyon floor steadily accelerates the ball forward!\n\n2. **RMSprop (Adaptive Friction):**\nCreated by Geoffrey Hinton, RMSprop introduces coordinate-wise adaptive learning rates. It keeps an exponential moving average of squared gradients ($s_t = \\rho s_{t-1} + (1-\\rho) g_t^2$). When updating each parameter, it divides the gradient by $\\sqrt{s_t + \\epsilon}$. For parameters with wild, massive oscillations, $s_t$ is huge, shrinking their effective step size and calming the bounces. For parameters with quiet, sluggish gradients, $s_t$ is tiny, boosting their effective step size and accelerating them down the valley!",
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
          "en": "The RMSprop adaptive gradient update tracks second uncentered moment $\\mathbf{s}_t \\in \\mathbb{R}^P$:\n\n$$\n\\mathbf{s}_t = \\rho \\mathbf{s}_{t-1} + (1 - \\rho) \\mathbf{g}_t^2, \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\frac{\\eta}{\\sqrt{\\mathbf{s}_t} + \\epsilon} \\odot \\mathbf{g}_t\n$$\n\nWhere:\n* $\\mathbf{g}_t = \\nabla_{\\boldsymbol{\\theta}} \\mathcal{L}(\\boldsymbol{\\theta}_t)$: Instantaneous gradient vector at step $t$.\n* $\\beta \\in [0.8, 0.99]$: Momentum decay factor (analogous to friction; $\\frac{1}{1-\\beta}$ effective accumulated steps).\n* $\\rho \\in [0.9, 0.999]$: Exponential decay rate for moving average of squared gradients.\n* $\\mathbf{g}_t^2 \\coloneqq \\mathbf{g}_t \\odot \\mathbf{g}_t$: Element-wise Hadamard squared gradient.\n* $\\epsilon \\approx 10^{-8}$: Small numerical stability constant preventing division by zero.\n* $\\odot$: Element-wise vector multiplication.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement both the `momentum_step(param, grad, v, lr, beta)` and `rmsprop_step(param, grad, s, lr, rho, eps)` update algorithms for parameter arrays.",
          "ar": "تمنح صيغة العزم سرعة نهائية قصوى تعادل $\\frac{\\eta}{1-\\beta}$ في الاتجاهات المستقرة، مما يسرع الهبوط بمقدار 10 أضعاف عندما تكون $\\beta = 0.9$. وفي المقابل، تحافظ RMSprop على توحيد سعة الخطوة الفعالة $\\frac{\\eta}{\\sqrt{s_t + \\epsilon}} g_t \\approx \\pm \\eta$ عبر كافة المحاور، متجاوزة تباين انحناء مصفوفة هيسيان (Hessian Conditioning)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-momentum-rmsprop-adaptive",
          "starterCode": "import numpy as np\n\ndef momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, \n                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of Polyak Momentum.\n    Returns (param_next, v_next).\n    \"\"\"\n    # TODO: 1. Update velocity: v_next = beta * v + grad\n    # TODO: 2. Update parameter: param_next = param - lr * v_next\n    pass\n\ndef rmsprop_step(param: np.ndarray, grad: np.ndarray, s: np.ndarray, \n                 lr: float = 0.01, rho: float = 0.9, eps: float = 1e-8) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of RMSprop.\n    Returns (param_next, s_next).\n    \"\"\"\n    # TODO: 1. Update squared gradient average: s_next = rho * s + (1 - rho) * (grad ** 2)\n    # TODO: 2. Update parameter: param_next = param - (lr / (sqrt(s_next) + eps)) * grad\n    pass",
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
              "starterCode": "import numpy as np\n\ndef momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, \n                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of Polyak Momentum.\n    Returns (param_next, v_next).\n    \"\"\"\n    # TODO: 1. Update velocity: v_next = beta * v + grad\n    # TODO: 2. Update parameter: param_next = param - lr * v_next\n    pass\n\ndef rmsprop_step(param: np.ndarray, grad: np.ndarray, s: np.ndarray, \n                 lr: float = 0.01, rho: float = 0.9, eps: float = 1e-8) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of RMSprop.\n    Returns (param_next, s_next).\n    \"\"\"\n    # TODO: 1. Update squared gradient average: s_next = rho * s + (1 - rho) * (grad ** 2)\n    # TODO: 2. Update parameter: param_next = param - (lr / (sqrt(s_next) + eps)) * grad\n    pass",
              "expectedOutput": "0.80,2.00"
            }
          },
          "solution": "import numpy as np\n\ndef momentum_step(param: np.ndarray, grad: np.ndarray, v: np.ndarray, \n                  lr: float = 0.01, beta: float = 0.9) -> tuple[np.ndarray, np.ndarray]:\n    v_next = beta * v + grad\n    param_next = param - lr * v_next\n    return param_next, v_next\n\ndef rmsprop_step(param: np.ndarray, grad: np.ndarray, s: np.ndarray, \n                 lr: float = 0.01, rho: float = 0.9, eps: float = 1e-8) -> tuple[np.ndarray, np.ndarray]:\n    s_next = rho * s + (1.0 - rho) * (grad ** 2)\n    param_next = param - (lr / (np.sqrt(s_next) + eps)) * grad\n    return param_next, s_next"
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
            "en": "In an ill-conditioned quadratic bowl where the maximum eigenvalue of the Hessian is 10,000 times larger than the minimum eigenvalue ($\\kappa = 10^4$), why does RMSprop successfully reach the minimum while standard Gradient Descent either diverges or takes millions of steps?",
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
                "en": "Curvature anisotropy (ravines) is the single biggest bottleneck in first-order optimization. By dividing by the root-mean-square of recent gradients, RMSprop acts as an empirical diagonal preconditioner for the Hessian matrix.",
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
    "id": "adamw-weight-decay-schedules",
    "title": "AdamW Optimization: Decoupled Weight Decay & Learning Rate Schedules",
    "titleAr": "خوارزمية التحسين AdamW: اضمحلال الوزن المفصول وجداول معدل التعلم",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In modern deep learning and frontier AI, AdamW is the undisputed workhorse optimizer. Almost every large language model (GPT-4, LLaMA,...",
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
          "en": "In modern deep learning and frontier AI, **AdamW** is the undisputed workhorse optimizer. Almost every large language model (GPT-4, LLaMA, Claude, DeepSeek) is trained using AdamW.\n\nWhy is AdamW so powerful?\nAdam (Adaptive Moment Estimation) combines the best of both worlds:\n1. **First Moment ($m_t$, Momentum):** Tracks the smoothed running average of past gradients to maintain directional momentum through ravines and flat saddles.\n2. **Second Moment ($v_t$, RMSprop):** Tracks the smoothed running average of squared gradients to adaptively scale step size for every single parameter.\n3. **Bias Correction:** Because $m_0$ and $v_0$ are initialized to zero, early steps would be severely biased toward zero. Dividing by $(1 - \\beta_1^t)$ and $(1 - \\beta_2^t)$ corrects for this initialization bias during early iterations.\n\n**The Flaw in Classic Adam and the AdamW Fix:**\nIn standard SGD, adding an $L_2$ penalty $\\frac{1}{2}\\lambda \\|\\boldsymbol{\\theta}\\|^2$ to the loss is mathematically identical to weight decay ($\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta}(1 - \\eta \\lambda)$). But in classic Adam, researchers added the $L_2$ gradient penalty $\\lambda \\boldsymbol{\\theta}$ directly into the gradient $g_t$!\nBecause Adam divides updates by $\\sqrt{v_t}$, parameters that had huge, frequent historical gradients ended up having their weight decay penalty divided by a huge number—shrinking their regularization away to almost nothing! Conversely, parameters with tiny historical gradients received excessive weight decay.\n\nLoshchilov & Hutter (2017) resolved this with **AdamW** by **decoupling weight decay**: the parameters are decayed directly ($\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta}(1 - \\eta \\lambda)$) before applying the adaptive momentum step. This simple, profound fix dramatically improves generalization across Transformer architectures.",
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
          "en": "$$\n\\hat{\\mathbf{m}}_t = \\frac{\\mathbf{m}_t}{1 - \\beta_1^t}, \\quad \\hat{\\mathbf{v}}_t = \\frac{\\mathbf{v}_t}{1 - \\beta_2^t}\n$$\n\n$$\n\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta_t \\lambda \\boldsymbol{\\theta}_t - \\frac{\\eta_t}{\\sqrt{\\hat{\\mathbf{v}}_t} + \\epsilon} \\odot \\hat{\\mathbf{m}}_t\n$$\n\nWhere:\n* $\\mathbf{g}_t \\in \\mathbb{R}^P$: Current stochastic gradient estimate at step $t$.\n* $\\mathbf{m}_t, \\mathbf{v}_t$: Biased first and second moment estimators.\n* $\\hat{\\mathbf{m}}_t, \\hat{\\mathbf{v}}_t$: Bias-corrected moment vectors, correcting for zero-initialization at early time steps $t \\in \\{1, 2, \\dots\\}$.\n* $\\beta_1 = 0.9, \\beta_2 = 0.999$: Standard default decay hyper-parameters.\n* $\\lambda \\ge 0$: Decoupled weight decay regularization factor (typically $0.01$ to $0.1$).\n* $\\eta_t$: Learning rate at step $t$, typically governed by a Cosine Decay Schedule with linear warmup.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the single-step update function `adamw_step(param, grad, m, v, t, lr, beta1, beta2, eps, weight_decay)` implementing decoupled weight decay, moment tracking, bias correction, and the final parameter update.",
          "ar": "تضمن معاملات تصحيح الانحياز $(1-\\beta^t)$ أن يكون تقدير العزوم غير متحيز إحصائياً $\\mathbb{E}[\\hat{\\mathbf{m}}_t] = \\mathbb{E}[\\mathbf{g}_t]$ و $\\mathbb{E}[\\hat{\\mathbf{v}}_t] = \\mathbb{E}[\\mathbf{g}_t^2]$ حتى عندما تكون $t = 1$. ويضمن الحد $-\\eta_t \\lambda \\boldsymbol{\\theta}_t$ انكماشاً مستمراً للأوزان يتناسب حصراً مع قيمتها الحالية ومع معدل التعلم المجدول، دون أي تشويه ينشأ عن تباين التدرجات التاريخية."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-adamw-weight-decay-schedules",
          "starterCode": "import numpy as np\n\ndef adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,\n               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, \n               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the AdamW optimization algorithm.\n    \n    Returns\n    -------\n    tuple of (param_next, m_next, v_next)\n    \"\"\"\n    # TODO: 1. Apply decoupled weight decay: param_decayed = param * (1 - lr * weight_decay)\n    # TODO: 2. Update biased first (m) and second (v) moments\n    # TODO: 3. Compute bias-corrected moments m_hat and v_hat using step index t\n    # TODO: 4. Compute updated parameter: param_next = param_decayed - (lr / (sqrt(v_hat) + eps)) * m_hat\n    pass",
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
              "starterCode": "import numpy as np\n\ndef adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,\n               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, \n               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single step of the AdamW optimization algorithm.\n    \n    Returns\n    -------\n    tuple of (param_next, m_next, v_next)\n    \"\"\"\n    # TODO: 1. Apply decoupled weight decay: param_decayed = param * (1 - lr * weight_decay)\n    # TODO: 2. Update biased first (m) and second (v) moments\n    # TODO: 3. Compute bias-corrected moments m_hat and v_hat using step index t\n    # TODO: 4. Compute updated parameter: param_next = param_decayed - (lr / (sqrt(v_hat) + eps)) * m_hat\n    pass",
              "expectedOutput": "0.9899"
            }
          },
          "solution": "import numpy as np\n\ndef adamw_step(param: np.ndarray, grad: np.ndarray, m: np.ndarray, v: np.ndarray, t: int,\n               lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, \n               eps: float = 1e-8, weight_decay: float = 1e-2) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    param_decayed = param * (1.0 - lr * weight_decay)\n    m_next = beta1 * m + (1.0 - beta1) * grad\n    v_next = beta2 * v + (1.0 - beta2) * (grad ** 2)\n    m_hat = m_next / (1.0 - (beta1 ** t))\n    v_hat = v_next / (1.0 - (beta2 ** t))\n    param_next = param_decayed - (lr / (np.sqrt(v_hat) + eps)) * m_hat\n    return param_next, m_next, v_next"
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
            "en": "Why does combining standard L2 regularization ($g \\leftarrow g + \\lambda \\theta$) with classic Adam cause weights with large, frequent historical gradients to experience less regularization decay than weights with small gradients?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية التحسين AdamW: اضمحلال الوزن المفصول وجداول معدل التعلم تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In classic Adam, the regularized gradient is divided by $\\sqrt{v_t}$; since parameters with large historical gradients have large values of $v_t$, their effective decay factor $\\frac{\\lambda \\theta}{\\sqrt{v_t}}$ is suppressed, whereas parameters with small historical gradients receive large decay penalties.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "In attention heads, frequent tokens produce large gradients, inflating $v_t$. Under classic Adam with L2 regularization, the weights for these frequent tokens received almost no regularization! AdamW decouples weight decay from gradient history, regularizing all parameters proportionally.",
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
    "id": "batch-normalization-internal-covariate",
    "title": "Batch Normalization: Internal Covariate Shift & Mini-Batch Statistics",
    "titleAr": "تطبيع الدفعات: استقرار التوزيع وإحصائيات الدفعة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine building a skyscraper where every floor is made of shifting quicksand. As workers on the 1st floor make minor adjustments to their...",
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
          "en": "Imagine building a skyscraper where every floor is made of shifting quicksand. As workers on the 1st floor make minor adjustments to their support pillars, the 2nd floor shifts and tilts. Because the 2nd floor tilted, the 3rd floor tilts even more violently. By the time you reach the 50th floor, the ground is thrashing unpredictably!\n\nThis is the nightmare of training deep neural networks without normalization, historically termed **internal covariate shift**. When Layer 1 updates its weights during a gradient step, the distribution of outputs it hands to Layer 2 shifts. Layer 2 must now constantly struggle to adapt to a moving target, causing gradients in deep layers to explode, vanish, or saturate.\n\nIn 2015, Sergey Ioffe and Christian Szegedy introduced a breakthrough remedy: **Batch Normalization (BatchNorm)**.\nInstead of letting activations drift wildly, BatchNorm intercepts the activations between layers and tames them across the mini-batch:\n1. It calculates the mini-batch mean $\\mu_B$ and variance $\\sigma_B^2$ across all samples in the batch.\n2. It standardizes each feature coordinate to zero mean and unit variance: $\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$.\n3. To ensure the network doesn't lose expressive power, it introduces two learnable parameters: scale $\\gamma$ and shift $\\beta$, producing $y = \\gamma \\hat{x} + \\beta$. If the network decides that a non-zero mean is actually optimal, it can learn to restore it!\n\n**The Dual-Mode Lifecycle:**\n* **During Training:** BatchNorm calculates statistics dynamically from the current mini-batch and maintains an exponential moving average (running mean and running variance).\n* **During Evaluation / Inference:** The mini-batch statistics are frozen! The layer normalizes using the stored running averages, ensuring that predicting a single sample produces deterministic, stable results.",
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
          "en": "$$\n\\hat{x}_i = \\frac{x_i - \\mu_{\\mathcal{B}}}{\\sqrt{\\sigma_{\\mathcal{B}}^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta \\equiv \\text{BN}_{\\gamma, \\beta}(x_i)\n$$\n\nDuring training, population running statistics are tracked with momentum $m \\in (0, 1)$:\n$$\n\\mu_{\\text{run}} \\leftarrow (1 - m) \\mu_{\\text{run}} + m \\mu_{\\mathcal{B}}, \\quad \\sigma_{\\text{run}}^2 \\leftarrow (1 - m) \\sigma_{\\text{run}}^2 + m \\sigma_{\\mathcal{B}}^2\n$$\n\nDuring inference (evaluation mode), the fixed running estimates replace mini-batch statistics:\n$$\n\\hat{x}_{\\text{eval}} = \\frac{x - \\mu_{\\text{run}}}{\\sqrt{\\sigma_{\\text{run}}^2 + \\epsilon}}, \\quad y_{\\text{eval}} = \\gamma \\hat{x}_{\\text{eval}} + \\beta\n$$\n\nWhere:\n* $B$: Mini-batch size.\n* $\\epsilon \\approx 10^{-5}$: Numerical variance stabilizer.\n* $\\gamma, \\beta \\in \\mathbb{R}$: Learnable affine scale and shift parameters initialized to $\\gamma=1, \\beta=0$.\n* $\\mu_{\\text{run}}, \\sigma_{\\text{run}}^2$: Non-differentiable tracking buffers used strictly during deployment.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the complete `batchnorm_forward` function supporting both training mode (computing batch statistics and updating running buffers) and inference mode (using frozen running buffers).",
          "ar": "تضمن عملية التطبيع بقاء تدرجات دالة الخسارة مستقرة ومحصورة داخل نطاق عددي آمن، مما يسمح باستخدام معدلات تعلم أكبر بعشر مرات وتدريب شبكات ذات مئات الطبقات بنجاح وسرعة فائقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-batch-normalization-internal-covariate",
          "starterCode": "import numpy as np\n\ndef batchnorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray,\n                      running_mean: np.ndarray, running_var: np.ndarray,\n                      training: bool = True, momentum: float = 0.1,\n                      eps: float = 1e-5) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes forward pass of Batch Normalization.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, D)\n    gamma, beta : np.ndarray of shape (D,)\n    running_mean, running_var : np.ndarray of shape (D,)\n    training : bool\n    \n    Returns\n    -------\n    tuple of (out, running_mean, running_var)\n    \"\"\"\n    # TODO: If training:\n    #       1. Compute batch mean and variance across axis=0\n    #       2. Standardize x: x_norm = (x - mean) / sqrt(var + eps)\n    #       3. Apply affine transform: out = gamma * x_norm + beta\n    #       4. Update running_mean and running_var using momentum\n    # TODO: If not training:\n    #       1. Standardize using running_mean and running_var\n    #       2. Apply affine transform: out = gamma * x_norm + beta\n    pass",
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
              "starterCode": "import numpy as np\n\ndef batchnorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray,\n                      running_mean: np.ndarray, running_var: np.ndarray,\n                      training: bool = True, momentum: float = 0.1,\n                      eps: float = 1e-5) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes forward pass of Batch Normalization.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, D)\n    gamma, beta : np.ndarray of shape (D,)\n    running_mean, running_var : np.ndarray of shape (D,)\n    training : bool\n    \n    Returns\n    -------\n    tuple of (out, running_mean, running_var)\n    \"\"\"\n    # TODO: If training:\n    #       1. Compute batch mean and variance across axis=0\n    #       2. Standardize x: x_norm = (x - mean) / sqrt(var + eps)\n    #       3. Apply affine transform: out = gamma * x_norm + beta\n    #       4. Update running_mean and running_var using momentum\n    # TODO: If not training:\n    #       1. Standardize using running_mean and running_var\n    #       2. Apply affine transform: out = gamma * x_norm + beta\n    pass",
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
            "en": "Why does Batch Normalization struggle in autoregressive language models (LLMs) and small batch training ($B=1$), motivating the switch to Layer Normalization?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تطبيع الدفعات: استقرار التوزيع وإحصائيات الدفعة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In autoregressive generation (e.g. streaming tokens), the inference batch size for an active prompt is often $B=1$, making mini-batch variance zero or undefined; furthermore, sequence lengths vary dynamically, and batch statistics artificially couple unrelated sentences together during training.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "In CNNs, images have fixed dimensions and large batches, making BatchNorm very effective. But in modern NLP and Transformers, inputs are variable-length sequences where coupling different sequences in a batch creates destructive dependencies. This led directly to the adoption of Layer Normalization.",
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
                "en": "GPUs cannot compute the mean of a vector along axis 0.",
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
    "id": "layer-normalization-invariance",
    "title": "Layer Normalization & Invariant Representations",
    "titleAr": "تطبيع الطبقات وثبات التمثيلات الخفية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Batch Normalization revolutionized convolutional vision networks, it created a severe conceptual vulnerability: sample coupling.",
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
          "en": "While Batch Normalization revolutionized convolutional vision networks, it created a severe conceptual vulnerability: **sample coupling**. Under BatchNorm, the way Sample A is processed depends entirely on the other samples that happen to be in the same batch with it. If Sample B is an extreme outlier, it drags down the batch mean and corrupts the representation of Sample A!\n\nIn sequence models and Transformer LLMs (such as GPT-4, LLaMA, and Claude), this coupling is intolerable. Sentences have different lengths, prompts arrive one at a time ($B=1$) during real-time streaming, and caching key-values requires absolute deterministic independence.\n\nIn 2016, Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey Hinton introduced the solution: **Layer Normalization (LayerNorm)**.\nInstead of computing statistics *vertically across different samples* in a mini-batch, LayerNorm computes statistics *horizontally across all feature channels within a single sample/token*:\n1. For an individual token vector $\\mathbf{x} \\in \\mathbb{R}^d$, it computes the mean $\\mu$ and variance $\\sigma^2$ across its $d$ hidden dimensions.\n2. It normalizes that vector to zero mean and unit variance.\n3. It scales and shifts using learnable vectors $\\boldsymbol{\\gamma}$ and $\\boldsymbol{\\beta}$.\n\n**The Superpower of LayerNorm: Perfect Independence & Invariance:**\nEvery token normalizes itself completely in isolation. It does not know or care whether the batch size is 1 or 1,000,000. It behaves identically during training and inference—eliminating running averages entirely!\nFurthermore, LayerNorm grants mathematical **scale and shift invariance**: if you multiply an incoming embedding by $10\\times$ or add a constant offset, LayerNorm cancels it out completely, keeping hidden activations in the stable zone throughout hundreds of transformer layers.",
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
          "en": "$$\n\\hat{x}_j = \\frac{x_j - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}}, \\quad y_j = \\gamma_j \\hat{x}_j + \\beta_j \\equiv \\text{LN}_{\\boldsymbol{\\gamma}, \\boldsymbol{\\beta}}(\\mathbf{x})_j\n$$\n\nFundamental Mathematical Invariances:\n1. **Scale Invariance:** For any scalar $\\alpha > 0$:\n   $$\\text{LN}(\\alpha \\mathbf{x}) = \\text{LN}(\\mathbf{x})$$\n2. **Shift Invariance:** For any scalar constant $c \\in \\mathbb{R}$:\n   $$\\text{LN}(\\mathbf{x} + c \\mathbf{1}) = \\text{LN}(\\mathbf{x})$$\n\nWhere:\n* $d$: Hidden feature dimension (e.g., $4096$ in LLaMA-7B).\n* $\\mu \\in \\mathbb{R}, \\sigma^2 \\in \\mathbb{R}$: Scalar sample mean and variance evaluated along the last axis ($\\text{axis}=-1$).\n* $\\boldsymbol{\\gamma}, \\boldsymbol{\\beta} \\in \\mathbb{R}^d$: Learnable gain and bias vectors matching the feature dimension.\n* $\\epsilon \\approx 10^{-5}$: Numerical variance stabilizer.\n\n---\n\n## Beat 3: Interactive Python Scratchpad\n\nImplement the forward pass of Layer Normalization `layernorm_forward(x, gamma, beta, eps)` operating along the last feature dimension (`axis=-1`). Return the normalized output and a cache dictionary for backward passes.",
          "ar": "بفضل خاصيتي الثبات أمام المقياس والإزاحة ($\\text{Scale/Shift Invariance}$)، تضمن LayerNorm أن إعادة قياس مصفوفات الأوزان أو تراكم الانحيازات عبر الطبقات لا يؤدي إلى تشويه تمثيل الرموز في الفضاء الدلالي، مما يجعلها البنية التحتية القياسية لجميع نماذج الانتباه المتعدد الرؤوس (MHA)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-layer-normalization-invariance",
          "starterCode": "import numpy as np\n\ndef layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, \n                       eps: float = 1e-5) -> tuple[np.ndarray, dict]:\n    \"\"\"\n    Computes Layer Normalization across the last feature dimension.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (..., D)\n    gamma : np.ndarray of shape (D,)\n    beta : np.ndarray of shape (D,)\n    eps : float\n    \n    Returns\n    -------\n    tuple of (out, cache)\n    \"\"\"\n    # TODO: 1. Compute mean and variance along axis=-1 with keepdims=True\n    # TODO: 2. Standardize x: x_norm = (x - mean) / sqrt(var + eps)\n    # TODO: 3. Scale by gamma and shift by beta: out = gamma * x_norm + beta\n    # TODO: 4. Return out and cache dict\n    pass",
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
              "starterCode": "import numpy as np\n\ndef layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, \n                       eps: float = 1e-5) -> tuple[np.ndarray, dict]:\n    \"\"\"\n    Computes Layer Normalization across the last feature dimension.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (..., D)\n    gamma : np.ndarray of shape (D,)\n    beta : np.ndarray of shape (D,)\n    eps : float\n    \n    Returns\n    -------\n    tuple of (out, cache)\n    \"\"\"\n    # TODO: 1. Compute mean and variance along axis=-1 with keepdims=True\n    # TODO: 2. Standardize x: x_norm = (x - mean) / sqrt(var + eps)\n    # TODO: 3. Scale by gamma and shift by beta: out = gamma * x_norm + beta\n    # TODO: 4. Return out and cache dict\n    pass",
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
            "en": "Why does Layer Normalization show exact invariance to scaling the input vector by any positive constant $\\alpha > 0$ ($\\text{LN}(\\alpha \\mathbf{x}) = \\text{LN}(\\mathbf{x})$)?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تطبيع الطبقات وثبات التمثيلات الخفية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Multiplying the input vector by $\\alpha$ scales the centered difference $(\\alpha x_j - \\alpha \\mu)$ by $\\alpha$, while the standard deviation $\\sqrt{\\alpha^2 \\sigma^2}$ is also scaled by $\\alpha$; the two scalar factors cancel out exactly in the numerator and denominator $\\frac{\\alpha(x_j - \\mu)}{\\alpha \\sigma}$.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Scale invariance is why Transformers can handle exploding residual activations without numerical collapse: even if a residual stream grows larger and larger through 80 layers, LayerNorm always resets the variance to 1.0 before feeding the activations into the next attention block.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "LayerNorm subtracts $\\alpha$ in the bias parameter $\\beta$.",
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
                "en": "Scaling by $\\alpha$ rotates the vector orthogonally, keeping length constant.",
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
                "en": "LayerNorm truncates all input numbers to unit floats before computing statistics.",
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
          "en": "Imagine water flowing down a series of terraced waterfalls across a 100-layer mountain. In classical Layer Normalization, every terrace halts the flow to calculate both the average sea level (mean μ) and wave height (variance σ²), subtracting and re-centering the signal. Zhang & Sennrich (2019) discovered that this mean-centering is computationally redundant: what truly prevents signals from exploding or vanishing is scaling by the root-mean-square amplitude (RMS), keeping activation vectors on a stable sphere. Paired with a residual highway (Pre-LN architecture), the signal travels uninterrupted down an express lane, with RMSNorm acting as a lightweight speed governor at each junction without memory read/write bottlenecks.",
          "ar": "تخيل تدفق إشارة عبر عشرات الطبقات العصبية العميقة. في تطبيع الطبقات الكلاسيكي (LayerNorm)، تضطر كل طبقة لحساب المتوسط الحسابي μ وطرحه ثم حساب التباين، وهو ما يثقل ناقل الذاكرة بعمليات قراءة وكتابة مضاعفة. اكتشف الباحثون أن مركزة المتوسط ليست ضرورية لاستقرار التدريب؛ بل إن معايرة الشدة عبر جذر متوسط المربعات (RMS) وحدها كافية لإبقاء التنشيطات ضمن نطاق هندسي مستقر. وعند ربطها بمسار التدفق المتبقي المباشر (Residual Highway)، تعمل RMSNorm كصمام أمان يحافظ على ديناميكية التدرجات دون تعطيل الإشارة الأصلية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RMS}(\\mathbf{x}) = \\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\epsilon}, \\quad \\bar{\\mathbf{x}} = \\frac{\\mathbf{x}}{\\text{RMS}(\\mathbf{x})} \\odot \\boldsymbol{\\gamma}",
        "formulaNote": {
          "en": "RMSNorm scales activations by their root-mean-square magnitude and applies learnable gain γ.",
          "ar": "تعاير RMSNorm التنشيطات بمقدار جذر متوسط المربعات وتطبق معامل التكبير القابل للتعلم γ."
        },
        "narrative": {
          "en": "RMSNorm replaces full LayerNorm by eliminating the mean-centering step (x - μ). By dividing each feature vector by its root-mean-square norm, it enforces scale invariance: scaling the input vector x by any positive constant α leaves the normalized vector unchanged. The learnable parameter γ then adaptively scales each feature dimension. Because it avoids computing and subtracting the mean, RMSNorm saves memory bandwidth and fuses cleanly into modern GPU kernel execution.\n\n## Beat 3: Python Challenge",
          "ar": "تستبدل RMSNorm تطبيع الطبقات التقليدي بإلغاء خطوة طرح المتوسط الحسابي تماماً. وعبر قسمة متجه الميزات على معياره التربيعي، تضمن ثبات المقياس الهندسي: مضاعفة المدخلات بعامل قياسي لا يغير المتجه المُعاير. تتيح المعاملات القابلة للتعلم γ للشبكة تكبير الميزات الضرورية، مما يختزل عمليات الوصول لذاكرة GPU بنسبة ملحوظة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-rmsnorm-residual-highways",
          "starterCode": "import numpy as np\n\ndef rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute RMSNorm with optional residual addition.\n    \"\"\"\n    # Step 1: Add residual tensor to x if provided (express highway)\n    # TODO: x_active = x + residual if residual is not None else x\n    # Step 2: Compute Root Mean Square (RMS) along the last dimension (keepdims=True)\n    # TODO: rms = np.sqrt(np.mean(x_active ** 2, axis=-1, keepdims=True) + eps)\n    # Step 3: Normalize and scale by gamma\n    # TODO: out = (x_active / rms) * gamma\n    pass",
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
              "starterCode": "import numpy as np\n\ndef rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute RMSNorm with optional residual addition.\n    \"\"\"\n    # Step 1: Add residual tensor to x if provided (express highway)\n    # TODO: x_active = x + residual if residual is not None else x\n    # Step 2: Compute Root Mean Square (RMS) along the last dimension (keepdims=True)\n    # TODO: rms = np.sqrt(np.mean(x_active ** 2, axis=-1, keepdims=True) + eps)\n    # Step 3: Normalize and scale by gamma\n    # TODO: out = (x_active / rms) * gamma\n    pass",
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
            "en": "Why do modern foundation models (LLaMA, Mistral, Gemma) prefer RMSNorm over LayerNorm?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تطبيع متوسط المربعات الجذري (RMSNorm) ومسارات التدفق المتبقية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "RMSNorm removes the mean-centering step, reducing GPU memory traffic and synchronization while maintaining identical training stability.",
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
                "en": "RMSNorm completely eliminates the need for non-linear activations in transformers.",
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
    "id": "cnn-convolution",
    "title": "2D Convolutions & Spatial Feature Extraction",
    "titleAr": "التلافيف المكانية ثنائية الأبعاد واستخراج الميزات البصرية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A convolution is a sliding flashlight scanning across a dark landscape looking for local patterns! Instead of connecting every pixel to...",
      "ar": "التلافيف المكانية (Convolutions) تشبه مصباحاً كاشفاً منزلقاً يمسح أرجاء الصورة بحثاً عن أنماط محلية كالحواف والزوايا."
    },
    "prerequisites": [
      "numpy-strides-indexing",
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
          "en": "A convolution is a sliding flashlight scanning across a dark landscape looking for local patterns! Instead of connecting every pixel to every neuron with millions of brittle wires, a small magnifying lens (a filter kernel like 3x3) slides step-by-step across the image. Everywhere it shines, it multiplies the local patch of pixels by its pattern stamp (e.g., vertical edge detector) and computes a resonance score. Because the exact same flashlight is used everywhere (weight sharing), an edge detected in the top-left corner is recognized using the exact same weights in the bottom-right corner (translation equivariance).",
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
          "en": "In 2D discrete convolution, the kernel K of size (k_H, k_W) slides across an input matrix I of size (H, W). At each valid coordinate (i, j), it computes the Frobenius inner product between the receptive patch and the kernel matrix. The output feature map dimensions for stride S=1 and zero padding P=0 are given by H_out = H - k_H + 1 and W_out = W - k_W + 1. Weight sharing reduces parameter complexity from O(H²W²) to O(k_H · k_W).\n\n## Beat 3: Python Challenge",
          "ar": "في التلافيف ثنائية الأبعاد، تنزلق نواة الترشيح K ذات الأبعاد (k_H, k_W) فوق مصفوفة المدخلات I. عند كل إحداثي (i, j)، تُحسب قيمة المخرج كحاصل ضرب داخلي بين النواة ورقعة البكسلات المقابلة لها. يؤدي تشارك الأوزان إلى تقليص عدد المعاملات من تعقيد تربيعي مفرط إلى حجم النواة المدمج فقط."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-cnn-convolution",
          "starterCode": "import numpy as np\n\ndef conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:\n    \"\"\"\n    Perform 2D spatial convolution (valid padding, stride=1).\n    \"\"\"\n    # Step 1: Extract spatial dimensions\n    # H, W = image.shape\n    # kH, kW = kernel.shape\n    # out_h, out_w = H - kH + 1, W - kW + 1\n    # Step 2: Slide the kernel window and compute local dot products\n    # TODO: For each i in out_h and j in out_w, compute sum(patch * kernel) + bias\n    pass",
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
              "starterCode": "import numpy as np\n\ndef conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:\n    \"\"\"\n    Perform 2D spatial convolution (valid padding, stride=1).\n    \"\"\"\n    # Step 1: Extract spatial dimensions\n    # H, W = image.shape\n    # kH, kW = kernel.shape\n    # out_h, out_w = H - kH + 1, W - kW + 1\n    # Step 2: Slide the kernel window and compute local dot products\n    # TODO: For each i in out_h and j in out_w, compute sum(patch * kernel) + bias\n    pass",
              "expectedOutput": "4.0"
            }
          },
          "solution": "import numpy as np\n\ndef conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:\n    H, W = image.shape\n    kH, kW = kernel.shape\n    out_h, out_w = H - kH + 1, W - kW + 1\n    out = np.zeros((out_h, out_w), dtype=float)\n    for i in range(out_h):\n        for j in range(out_w):\n            patch = image[i:i+kH, j:j+kW]\n            out[i, j] = np.sum(patch * kernel) + bias\n    return out"
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
            "en": "What fundamental property distinguishes convolutional layers from fully-connected layers in image processing?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التلافيف المكانية ثنائية الأبعاد واستخراج الميزات البصرية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Weight sharing and local receptive fields enforce translation equivariance and drastically reduce parameter count.",
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
                "en": "Convolutions completely eliminate the need for backpropagation and gradient descent.",
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
    "id": "stride-padding-receptive-fields",
    "title": "Strides, Padding & Receptive Field Arithmetic",
    "titleAr": "خطوات الانزلاق والحشو وحساب المجال الإدراكي للشبكات العصبية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine looking at a magnificent landscape painting through a narrow cardboard straw. At layer 1, you can only see a single brushstroke (a...",
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
          "en": "Imagine looking at a magnificent landscape painting through a narrow cardboard straw. At layer 1, you can only see a single brushstroke (a tiny local receptive field). But as deep layers stack, each higher neuron looks at a cluster of neurons below it, expanding its field of view until a single neuron at the top can 'see' the entire mountain range! Stride is how many steps your flashlight jumps per slide (downsampling resolution), while Padding wraps the image border in a cushion of zeros so edge pixels aren't discarded prematurely.",
          "ar": "المجال الإدراكي (Receptive Field) هو رقعة البكسلات الأصلية التي يستطيع عصبون معين في طبقة عميقة 'رؤيتها' والتأثر بها. عند بداية الشبكة، يرى العصبون بقعة صغيرة جداً (3×3). ولكن مع تعاقب الطبقات وتطبيق خطوات الانزلاق (Strides) التي تقفز عبر البكسلات لتقليص الأبعاد، يتسع الأفق تدريجياً ليرى ميزات بصرية شاملة. أما الحشو (Padding)، فيشبه إضافة إطار حماية فارغ حول حواف الصورة لمنع تآكل أبعادها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RF}_l = \\text{RF}_{l-1} + (k_l - 1) \\cdot J_{l-1}, \\quad J_l = J_{l-1} \\cdot s_l, \\quad \\text{with } \\text{RF}_0 = 1, \\; J_0 = 1",
        "formulaNote": {
          "en": "Recurrent receptive field expansion formula where J represents cumulative stride jump.",
          "ar": "صيغة اتساع المجال الإدراكي التراكمي حيث يمثل J حاصل ضرب خطوات القفز."
        },
        "narrative": {
          "en": "The effective receptive field (RF) measures the span of input pixels that can influence a specific neuron in layer l. The cumulative jump J tracks the spatial stride between adjacent feature representations: J_l = J_{l-1} · s_l. Each kernel of size k_l widens the receptive field by (k_l - 1) · J_{l-1}. Consequently, stacking two 3x3 convolutions with stride 1 yields an RF of 1 + 2 + 2 = 5, matching a 5x5 filter with 28% fewer parameters.\n\n## Beat 3: Python Challenge",
          "ar": "يقيس المجال الإدراكي الفعال رقعة المدخلات التي تؤثر في تنشيط عصبون محدد في الطبقة l. يتضاعف حاصل القفز التراكمي J بضرب خطوات الانزلاق: J_l = J_{l-1} · s_l. توسع كل نواة حجمها k_l المجال الإدراكي بمقدار (k_l - 1) · J_{l-1}، مما يعني أن دمج طبقتين 3×3 يحقق مجالاً إدراكياً مكافئاً لطبقة 5×5 ولكن بمعاملات أقل بكثير."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-stride-padding-receptive-fields",
          "starterCode": "import numpy as np\n\ndef compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:\n    \"\"\"\n    Compute total receptive field size and cumulative jump across layers.\n    \"\"\"\n    # Step 1: Initialize base receptive field RF_0 = 1 and jump J_0 = 1\n    # rf = 1\n    # jump = 1\n    # Step 2: Loop over layers and apply recurrence\n    # TODO: rf = rf + (k - 1) * jump; jump = jump * stride\n    pass",
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
              "starterCode": "import numpy as np\n\ndef compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:\n    \"\"\"\n    Compute total receptive field size and cumulative jump across layers.\n    \"\"\"\n    # Step 1: Initialize base receptive field RF_0 = 1 and jump J_0 = 1\n    # rf = 1\n    # jump = 1\n    # Step 2: Loop over layers and apply recurrence\n    # TODO: rf = rf + (k - 1) * jump; jump = jump * stride\n    pass",
              "expectedOutput": "5"
            }
          },
          "solution": "import numpy as np\n\ndef compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:\n    rf = 1\n    jump = 1\n    for layer in layers:\n        k = layer['kernel']\n        s = layer['stride']\n        rf = rf + (k - 1) * jump\n        jump = jump * s\n    return rf, jump"
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
            "en": "Why do deep CNN architectures (like VGG and ResNet) stack multiple small 3x3 kernels instead of a single 7x7 kernel?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خطوات الانزلاق والحشو وحساب المجال الإدراكي للشبكات العصبية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Stacking three 3x3 layers achieves the same 7x7 receptive field while using 27 parameters instead of 49 and adding three non-linear activation functions.",
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
                "en": "3x3 kernels completely eliminate memory allocations during training.",
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
    "id": "resnet-residual-skip-connections",
    "title": "ResNet Skip Connections & Gradient Elevators",
    "titleAr": "الروابط المتبقية في ResNet ومصاعد التدرجات الخالية من العوائق",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "If you are forced to climb 150 flights of stairs in a skyscraper, by the 100th floor you collapse from exhaustion—just like backpropagation...",
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
          "en": "If you are forced to climb 150 flights of stairs in a skyscraper, by the 100th floor you collapse from exhaustion—just like backpropagation gradients that vanish into exponential silence as they multiply through dozens of weight matrices. Kaiming He et al. (2015) installed an express elevator: the Residual Skip Connection! By adding the input directly to the block's output (y = F(x) + x), the gradient flows backward along a pristine steel cable: ∂y/∂x = ∂F/∂x + I. Even if the convolutional block learns nothing, the identity shortcut lets information and gradients bypass the stairs entirely, enabling networks of 1,000+ layers to train reliably.",
          "ar": "تخيل أنك تحاول إرسال رسالة صوتية عبر ممر طويل يحتوي على 100 جدار عازل؛ ستتلاشى الإشارة حتى تنعدم تماماً، وهو تماماً ما كان يحصل للتدرجات العكسية في الشبكات العصبية فائقة العمق. جاء ابتكار 'الروابط المتبقية' (ResNet Skip Connections) كـ 'مصعد كهربائي سريع' يتيح للإشارة والتدرجات تجاوز الجدران والسلالم بالكامل. فعبر إضافة المدخل الأصلي مباشرة إلى مخرج الطبقة y = F(x) + x، يتدفق التدرج عبر حد المطابقة I دون أي اضمحلال، مما مكّن من تدريب شبكات تتجاوز 1000 طبقة بنجاح واستقرار تام."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathcal{F}(\\mathbf{x}, \\{\\mathbf{W}_i\\}) + \\mathbf{x}, \\quad \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}} \\left( \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}} + \\mathbf{I} \\right)",
        "formulaNote": {
          "en": "Residual block forward formulation and unattenuated gradient additive highway decomposition.",
          "ar": "صيغة الكتلة المتبقية وتفكيك تدرجات الانحدار العكسي عبر مسار المطابقة المباشر."
        },
        "narrative": {
          "en": "The core insight of Deep Residual Learning is reframing the objective: instead of fitting an underlying mapping H(x), we let stacked layers fit a residual perturbation F(x) := H(x) - x, so that H(x) = F(x) + x. During backpropagation, the chain rule yields an additive identity term ∂L/∂y · I. Even if the learned Jacobian ∂F/∂x approaches zero, the gradient still flows directly to earlier layers with unit scale.\n\n## Beat 3: Python Challenge",
          "ar": "يكمن جوهر التعلم المتبقي في إعادة صياغة التحويل الرياضي: بدلاً من محاولة تقريب الدالة الكاملة H(x)، تتعلم الطبقات المتبقية الفارق النسبي F(x) = H(x) - x. وأثناء الانحدار العكسي، تنتج قاعدة السلسلة حداً جمعياً إضافياً ∂L/∂y · I يضمن تدفق التدرج دون عوائق حتى لو تلاشت معاملات المصفوفة الالتفافية F(x)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-resnet-residual-skip-connections",
          "starterCode": "import numpy as np\n\ndef relu(x: np.ndarray) -> np.ndarray:\n    return np.maximum(0.0, x)\n\ndef residual_block_forward(x: np.ndarray, W1: np.ndarray, b1: np.ndarray, W2: np.ndarray, b2: np.ndarray, W_proj: np.ndarray | None = None) -> np.ndarray:\n    \"\"\"\n    Execute forward pass of residual block: y = ReLU(F(x) + shortcut(x)).\n    \"\"\"\n    # Step 1: Compute shortcut (identity elevator or projected)\n    # shortcut = x @ W_proj if W_proj is not None else x\n    # Step 2: Compute residual path F(x) = (ReLU(x @ W1 + b1)) @ W2 + b2\n    # TODO: Compute h1 = relu(x @ W1 + b1), then fx = h1 @ W2 + b2\n    # Step 3: Combine and activate: return relu(fx + shortcut)\n    pass",
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
              "starterCode": "import numpy as np\n\ndef relu(x: np.ndarray) -> np.ndarray:\n    return np.maximum(0.0, x)\n\ndef residual_block_forward(x: np.ndarray, W1: np.ndarray, b1: np.ndarray, W2: np.ndarray, b2: np.ndarray, W_proj: np.ndarray | None = None) -> np.ndarray:\n    \"\"\"\n    Execute forward pass of residual block: y = ReLU(F(x) + shortcut(x)).\n    \"\"\"\n    # Step 1: Compute shortcut (identity elevator or projected)\n    # shortcut = x @ W_proj if W_proj is not None else x\n    # Step 2: Compute residual path F(x) = (ReLU(x @ W1 + b1)) @ W2 + b2\n    # TODO: Compute h1 = relu(x @ W1 + b1), then fx = h1 @ W2 + b2\n    # Step 3: Combine and activate: return relu(fx + shortcut)\n    pass",
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
            "en": "Why do residual skip connections prevent the vanishing gradient problem in networks with hundreds of layers?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الروابط المتبقية في ResNet ومصاعد التدرجات الخالية من العوائق تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The gradient decomposes additively into ∂F/∂x + I, ensuring the identity term I passes gradients directly backward without multiplying through all intermediate weight matrices.",
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
                "en": "Skip connections double the numerical precision from float32 to float64.",
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
    "id": "recurrent-neural-networks-bptt",
    "title": "Recurrent Neural Networks (RNNs) & Backpropagation Through Time (BPTT)",
    "titleAr": "الشبكات العصبية التكرارية (RNNs) والانحدار العكسي عبر الزمن",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine reading a suspense novel. When you read the word 'dagger', its meaning depends completely on the last 50 pages: is it an ancient...",
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
          "en": "Imagine reading a suspense novel. When you read the word 'dagger', its meaning depends completely on the last 50 pages: is it an ancient museum exhibit, or a murder weapon in the dark? Feedforward networks have complete amnesia; they process every token in total isolation. An RNN maintains a continuous mental diary: the hidden state h_t. As each word x_t enters, the model reads yesterday's diary entry h_{t-1}, combines it with the new word, and writes an updated entry h_t. To train it, we 'unroll' this diary across time, turning recurrence into a long feedforward chain where the exact same diary rules (weights W_hh, W_xh) are shared across every second.",
          "ar": "لا يمكن فهم الجملة بالنظر إلى كلماتها بمعزل عن سياقها؛ فمعنى الكلمة الأخيرة يتوقف على ما سبقها. تعمل الشبكات العصبية التكرارية (RNNs) عبر الاحتفاظ بـ 'دفتر مذكرات داخلي' متجدد يُعرف بالحالة الخفية h_t. مع قراءة كل رمز جديد x_t، تُدمج المعلومات الواردة مع خلاصة الماضي h_{t-1} لإنتاج الحالة الجديدة. ولتدريب هذه الشبكة، نقوم بـ 'بسط السلسلة عبر الزمن' (BPTT) لتحويل التكرار إلى رسم بياني متصل تُشتق عبره التدرجات العكسية عبر كافة اللحظات الزمنية السابقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{h}_t = \\tanh(\\mathbf{x}_t \\mathbf{W}_{xh} + \\mathbf{h}_{t-1} \\mathbf{W}_{hh} + \\mathbf{b}_h), \\quad \\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_0} = \\frac{\\partial \\mathcal{L}_T}{\\partial \\mathbf{h}_T} \\prod_{t=1}^T \\text{diag}(1 - \\mathbf{h}_t^2) \\mathbf{W}_{hh}^T",
        "formulaNote": {
          "en": "Hidden state recurrence equation and product of Jacobians across T time steps.",
          "ar": "معادلة الحالة الخفية التكرارية وحاصل ضرب مصفوفات جاكوبي عبر T خطوة زمنية."
        },
        "narrative": {
          "en": "In a vanilla RNN, the hidden state h_t serves as lossy memory. Backpropagation Through Time (BPTT) applies the chain rule backward from step T to step 1. Because this requires multiplying by the recurrent weight matrix W_hh at every single time step, the gradient scales as (W_hh)^T. If the largest eigenvalue of W_hh is less than 1, gradients decay exponentially to zero (vanishing); if greater than 1, gradients explode to infinity, preventing vanilla RNNs from learning long-term dependencies.\n\n## Beat 3: Python Challenge",
          "ar": "تعمل الحالة الخفية h_t في شبكات RNN التقليدية كذاكرة متجددة ملخصة للسلسلة. يطبق الانحدار العكسي عبر الزمن (BPTT) قاعدة السلسلة تراجعياً من اللحظة T إلى البداية. وبما أن حساب التدرج يتطلب ضرب مصفوفة الأوزان W_hh تكرارياً عند كل لحظة، فإن التدرج يتناسب أسياً مع (W_hh)^T، مما يؤدي إما إلى تلاشي التدرجات نحو الصفر أو انفجارها نحو اللانهاية، مما يجعلها عاجزة عن حفظ السياقات الطويلة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-recurrent-neural-networks-bptt",
          "starterCode": "import numpy as np\n\ndef rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, W_xh: np.ndarray, W_hh: np.ndarray, b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Unroll vanilla RNN across sequence length T: h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).\n    \"\"\"\n    # Step 1: Initialize states\n    # T, hidden_dim = X.shape[0], h_0.shape[0]\n    # Step 2: Sequentially update hidden states\n    # TODO: Loop through t in range(T), update h = tanh(X[t] @ W_xh + h @ W_hh + b_h)\n    # Step 3: Return (all_hidden_states, final_hidden_state)\n    pass",
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
              "starterCode": "import numpy as np\n\ndef rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, W_xh: np.ndarray, W_hh: np.ndarray, b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Unroll vanilla RNN across sequence length T: h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).\n    \"\"\"\n    # Step 1: Initialize states\n    # T, hidden_dim = X.shape[0], h_0.shape[0]\n    # Step 2: Sequentially update hidden states\n    # TODO: Loop through t in range(T), update h = tanh(X[t] @ W_xh + h @ W_hh + b_h)\n    # Step 3: Return (all_hidden_states, final_hidden_state)\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, W_xh: np.ndarray, W_hh: np.ndarray, b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    T = X.shape[0]\n    hidden_dim = h_0.shape[0]\n    H = np.zeros((T, hidden_dim), dtype=float)\n    h = h_0\n    for t in range(T):\n        x_t = X[t]\n        h = np.tanh(x_t @ W_xh + h @ W_hh + b_h)\n        H[t] = h\n    return H, h"
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
            "en": "Why do vanilla Recurrent Neural Networks struggle to learn long-range temporal dependencies?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الشبكات العصبية التكرارية (RNNs) والانحدار العكسي عبر الزمن تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Repeated matrix multiplications by W_hh and tanh' across many time steps cause the gradient to either vanish to zero or explode exponentially.",
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
                "en": "RNNs cannot process sequences longer than 4 tokens due to Python memory limits.",
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
    "id": "lstm-gru-gated-recurrent",
    "title": "Gated Recurrent Architectures (LSTM & GRU) & Long-Term Memory",
    "titleAr": "المعماريات التكرارية ذات البوابات (LSTM و GRU) والذاكرة طويلة المدى",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Vanilla RNNs erase their entire diary at every new word. Hochreiter & Schmidhuber (1997) solved this with the LSTM Conveyor Belt: the Cell...",
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
          "en": "Vanilla RNNs erase their entire diary at every new word. Hochreiter & Schmidhuber (1997) solved this with the LSTM Conveyor Belt: the Cell State C_t. Think of the cell state as a continuous conveyor belt running straight through time. Information can travel along this belt for thousands of steps untouched! Along the belt sit three intelligent robotic valves:\n1. Forget Gate (f_t): Decides what stale trash to drop from the belt (× 0).\n2. Input Gate (i_t): Decides what exciting new facts to weld onto the belt (+ C_tilde).\n3. Output Gate (o_t): Decides what parts of the belt to reveal as the hidden state h_t.\nBecause changes to the conveyor belt are purely additive (C_t = f_t ⊙ C_{t-1} + i_t ⊙ C_tilde), gradients flow backward along the belt like an open highway without exponential decay!",
          "ar": "تعاني شبكات RNN التقليدية من محو ذاكرتها السابقة عند كل خطوة جديدة. جاءت شبكات الذاكرة طويلة المدى قصيرة المدى (LSTM) لتبتكر 'حزام ناقل' مستمر يُدعى حالة الخلية C_t. يتدفق هذا الحزام عبر الزمن دون تعديل إلا عبر ثلاث بوابات ذكية:\n1. بوابة النسيان (f_t): تحدد ما يجب محوه وإسقاطه من الذاكرة القديمة.\n2. بوابة الإدخال (i_t): تقرر أي معلومات جديدة تستحق الإضافة للحزام.\n3. بوابة الإخراج (o_t): تحدد ما يجب إظهاره كحالة خفية لحظية.\nوبما أن التحديث على حالة الخلية هو تحديث جمعي خطي، فإن تدرجات التعلم تسافر إلى الوراء عبر الحزام دون أن تتلاشى."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{C}_t = \\mathbf{f}_t \\odot \\mathbf{C}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{C}}_t, \\quad \\mathbf{h}_t = \\mathbf{o}_t \\odot \\tanh(\\mathbf{C}_t)",
        "formulaNote": {
          "en": "Additive cell state conveyor belt update and gated hidden state emission.",
          "ar": "تحديث حالة الخلية الجمعي عبر الحزام الناقل وانبعاث الحالة الخفية المقيدة بالبوابات."
        },
        "narrative": {
          "en": "The mathematical breakthrough of LSTM is the constant error carousel (CEC). The forget gate f_t = σ(x W_f + h U_f + b_f) and input gate i_t = σ(x W_i + h U_i + b_i) regulate information flow via element-wise multiplication. Crucially, the derivative ∂C_t / ∂C_{t-1} = f_t. When the forget gate is saturated at 1, the gradient flows backwards through time with constant magnitude, completely bypassing the vanishing gradient trap of vanilla RNNs.\n\n## Beat 3: Python Challenge",
          "ar": "يكمن الإنجاز الرياضي لشبكات LSTM في ممر الخطأ الثابت (CEC). تتحكم بوابة النسيان f_t وبوابة الإدخال i_t في تدفق المعلومات عبر الضرب العنصري بدوال السيجمويد. الأهم من ذلك أن المشتقة الجزئية ∂C_t / ∂C_{t-1} تساوي ببساطة f_t، فعندما تقترب البوابة من 1، يتدفق التدرج تراجعياً عبر الزمن بقيمة ثابتة دون أن يتعرض للاضمحلال التكراري."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-lstm-gru-gated-recurrent",
          "starterCode": "import numpy as np\n\ndef sigmoid(z: np.ndarray) -> np.ndarray:\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n\ndef lstm_cell_forward(x_t: np.ndarray, h_prev: np.ndarray, c_prev: np.ndarray,\n                      W_f: np.ndarray, U_f: np.ndarray, b_f: np.ndarray,\n                      W_i: np.ndarray, U_i: np.ndarray, b_i: np.ndarray,\n                      W_c: np.ndarray, U_c: np.ndarray, b_c: np.ndarray,\n                      W_o: np.ndarray, U_o: np.ndarray, b_o: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single time step forward pass of an LSTM cell.\n    \"\"\"\n    # Step 1: Compute forget gate f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n    # TODO: Compute f_t\n    # Step 2: Compute input gate i_t and candidate c_tilde = tanh(x_t @ W_c + h_prev @ U_c + b_c)\n    # TODO: Compute i_t and c_tilde\n    # Step 3: Update cell state: c_next = f_t * c_prev + i_t * c_tilde\n    # TODO: Compute c_next\n    # Step 4: Compute output gate o_t and h_next = o_t * tanh(c_next)\n    pass",
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
              "starterCode": "import numpy as np\n\ndef sigmoid(z: np.ndarray) -> np.ndarray:\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n\ndef lstm_cell_forward(x_t: np.ndarray, h_prev: np.ndarray, c_prev: np.ndarray,\n                      W_f: np.ndarray, U_f: np.ndarray, b_f: np.ndarray,\n                      W_i: np.ndarray, U_i: np.ndarray, b_i: np.ndarray,\n                      W_c: np.ndarray, U_c: np.ndarray, b_c: np.ndarray,\n                      W_o: np.ndarray, U_o: np.ndarray, b_o: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single time step forward pass of an LSTM cell.\n    \"\"\"\n    # Step 1: Compute forget gate f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)\n    # TODO: Compute f_t\n    # Step 2: Compute input gate i_t and candidate c_tilde = tanh(x_t @ W_c + h_prev @ U_c + b_c)\n    # TODO: Compute i_t and c_tilde\n    # Step 3: Update cell state: c_next = f_t * c_prev + i_t * c_tilde\n    # TODO: Compute c_next\n    # Step 4: Compute output gate o_t and h_next = o_t * tanh(c_next)\n    pass",
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
            "en": "What specific mathematical mechanism in LSTMs solves the vanishing gradient problem present in vanilla RNNs?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المعماريات التكرارية ذات البوابات (LSTM و GRU) والذاكرة طويلة المدى تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The linear additive update of the cell state C_t = f_t ⊙ C_{t-1} + i_t ⊙ C_tilde creates an unattenuated gradient highway where ∂C_t / ∂C_{t-1} = f_t.",
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
                "en": "LSTMs use the Adam optimizer inside the forward pass to normalize hidden states.",
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
    "id": "bpe-tokenization",
    "title": "Byte Pair Encoding (BPE) Subword Tokenization",
    "titleAr": "ترميز أزواج البايت (BPE) وتقطيع الكلمات الفرعية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "How should a language model read text? If it reads word-by-word, its dictionary explodes to millions of words, and it completely chokes on...",
      "ar": "كيف يقرأ الذكاء الاصطناعي النصوص؟ إذا عامل كل كلمة كوحدة كاملة، سيتضخم القاموس لملايين الكلمات وسيعجز أمام الكلمات النادرة والاشتقاقات..."
    },
    "prerequisites": [
      "hash-tables-dict-internals"
    ],
    "x": 1130,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "BpeTokenizerLab",
        "narrative": {
          "en": "How should a language model read text? If it reads word-by-word, its dictionary explodes to millions of words, and it completely chokes on rare words or typos (the dreaded <UNK> token). If it reads character-by-character, the sequence becomes painfully long and computationally intractable. Byte Pair Encoding (BPE) is the golden bridge: compression through greedy frequency merging! It starts with base characters. Then it scans the entire training corpus, finds the single most frequently adjacent pair of symbols (e.g. 't' and 'h'), and fuses them into a new atomic token 'th'. By repeating this process thousands of times, common words become single tokens, while rare words are split into clean subwords like 'un' + 'friend' + 'ed'.",
          "ar": "كيف يقرأ الذكاء الاصطناعي النصوص؟ إذا عامل كل كلمة كوحدة كاملة، سيتضخم القاموس لملايين الكلمات وسيعجز أمام الكلمات النادرة والاشتقاقات الصرفية. وإذا قرأ بالحروف المنفردة، ستصبح السلسلة فائقة الطول وصعبة المعالجة. يمثل 'ترميز أزواج البايت' (BPE) التوازن العبقري: نبدأ بتقسيم النص إلى أحرف أولية، ثم نبحث بتكرار عن أكثر زوج من الرموز المتجاورة شيوعاً (مثل 'ت' و 'ع') وندمجهما في رمز واحد جديد 'تع'. بتكرار هذا الدمج آلاف المرات، تتحول الكلمات الشائعة لرموز فردية، بينما تُحلل الكلمات المعقدة إلى جذور ولواحق فرعية قابلة للفهم دون أي رمز مجهول <UNK>."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(u^*, v^*) = \\arg\\max_{(u, v)} \\sum_{w \\in \\mathcal{D}} f(w) \\cdot \\text{count}\\big((u, v) \\in w\\big), \\quad \\mathcal{V}_{k+1} = \\mathcal{V}_k \\cup \\{ u^* v^* \\}",
        "formulaNote": {
          "en": "Greedy frequency-based pair extraction and vocabulary expansion in Byte Pair Encoding.",
          "ar": "استخراج أزواج الرموز الأكثر تكراراً وتوسيع المعجم في خوارزمية BPE."
        },
        "narrative": {
          "en": "BPE constructs a fixed vocabulary size V by greedily merging the most frequent symbol bigrams. Starting from an initial alphabet of characters plus an end-of-word delimiter, each iteration identifies the bigram (u, v) with maximum co-occurrence frequency across the training corpus dictionary. Replacing all occurrences of (u, v) with the concatenated token uv compresses text representation while ensuring zero out-of-vocabulary (OOV) tokens at inference.\n\n## Beat 3: Python Challenge",
          "ar": "تبني BPE معجماً بحجم محدد V عبر دمج أزواج الرموز الأكثر تكراراً بطريقة طماعة. انطلاقاً من الحروف الأساسية مع علامة نهاية الكلمة، تبحث كل دورة عن الزوج (u, v) صاحب التردد الأقصى في النصوص التدريبية. باستبدال هذا الزوج برمز مدمج uv، يتم ضغط السلسلة النصية مع ضمان عدم مواجهة أي كلمة مجهولة عند الاستدلال."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bpe-tokenization",
          "starterCode": "from collections import defaultdict\n\ndef get_pair_stats(vocab: dict[tuple[str, ...], int]) -> dict[tuple[str, str], int]:\n    \"\"\"\n    Count the frequency of all adjacent symbol pairs in the segmented vocabulary.\n    \"\"\"\n    # Step 1: Initialize pairs frequency dictionary\n    # pairs = defaultdict(int)\n    # Step 2: Iterate over word tuples and their frequencies\n    # TODO: For each word, count occurrences of adjacent (word[i], word[i+1]) scaled by freq\n    # Step 3: Return dict(pairs)\n    pass",
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
              "starterCode": "from collections import defaultdict\n\ndef get_pair_stats(vocab: dict[tuple[str, ...], int]) -> dict[tuple[str, str], int]:\n    \"\"\"\n    Count the frequency of all adjacent symbol pairs in the segmented vocabulary.\n    \"\"\"\n    # Step 1: Initialize pairs frequency dictionary\n    # pairs = defaultdict(int)\n    # Step 2: Iterate over word tuples and their frequencies\n    # TODO: For each word, count occurrences of adjacent (word[i], word[i+1]) scaled by freq\n    # Step 3: Return dict(pairs)\n    pass",
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
            "en": "Why is subword tokenization with Byte Pair Encoding (BPE) preferred over word-level tokenization in Large Language Models?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ ترميز أزواج البايت (BPE) وتقطيع الكلمات الفرعية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "BPE eliminates Out-Of-Vocabulary (OOV) tokens by decomposing unknown words into known subwords or bytes while compressing common words into single tokens.",
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
                "en": "BPE doubles the hidden dimension size of the transformer model.",
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
    "id": "vocabulary-engineering-special-tokens",
    "title": "Vocabulary Engineering, Special Tokens & Token Embeddings",
    "titleAr": "هندسة المعاجم والرموز الخاصة وتضمينات المتجهات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "An LLM does not understand text or characters—it is purely a high-dimensional vector processor.",
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
          "en": "An LLM does not understand text or characters—it is purely a high-dimensional vector processor. Once BPE slices text into token IDs like [104, 3921, 88], the model converts these numbers into continuous geometry using an Embedding Matrix: an enormous lookup catalog where each row is a dense vector in R^{d_model}. Beyond words, modern architectures require Special Tokens: control operators like [BOS] (begin sequence), [EOS] (stop generating), and conversation turn tags like <|im_start|>user. Vocabulary size is a delicate balance: larger vocabularies compress text into fewer tokens (faster generation), but inflate parameter size and can create severe 'fertility rate' inequalities across languages.",
          "ar": "لا تعالج النماذج اللغوية الكلمات كنصوص حقيقية، بل تتعامل مع متجهات رقمية في فضاء متعدد الأبعاد. بعد أن يقطع المحلل النص إلى أرقام معرفية (Token IDs)، تُستخدم 'مصفوفة التضمين' (Embedding Matrix) كقاموس فوري يستبدل كل رقم بمتجه مستمر. وإلى جانب الكلمات العادية، تُهندس المعاجم برموز تحكم خاصة مثل [BOS] للإعلان عن بداية السياق، و [EOS] لإيقاف التوليد التلقائي. وتعد هندسة حجم المعجم موازنة دقيقة بين ضغط السلاسل النصية وتقليص حجم المعاملات لضمان عدالة تمثيل اللغات المختلفة كالعربية والإنجليزية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{E} \\in \\mathbb{R}^{V \\times d_{\\text{model}}}, \\quad \\mathbf{x}_t = \\mathbf{E}[\\text{token\\_id}_t], \\quad \\text{Fertility} = \\frac{\\text{Tokens}}{\\text{Words}}",
        "formulaNote": {
          "en": "Token embedding matrix lookup and cross-lingual token fertility metric.",
          "ar": "مصفوفة تضمين الرموز ومقياس معدل خصوبة الرموز عبر اللغات المختلفة."
        },
        "narrative": {
          "en": "The embedding table E maps discrete token indices {0, ..., V - 1} into continuous semantic vectors of dimension d_model. Special tokens serve as structural delimiters for multi-turn dialogues and system instructions. Token fertility measures how many subwords a language requires per word: if an English sentence takes 10 tokens while its Arabic translation takes 30 tokens due to vocabulary bias, the Arabic user pays 3x higher inference cost and gets 3x shorter effective context memory.\n\n## Beat 3: Python Challenge",
          "ar": "تحول مصفوفة التضمين E المؤشرات الرقمية للرموز إلى متجهات دلالية مستمرة ببعد d_model. تعمل الرموز الخاصة كفواصل هيكلية للمحادثات وتعليمات النظام. يقيس 'معدل الخصوبة' عدد الرموز الفرعية التي تتطلبها الكلمة الواحدة في لغة ما: إذا تطلبت الجملة العربية أضعاف ما تتطلبه الإنجليزية بسبب انحياز المعجم، فإن المستخدم يدفع تكلفة أعلى بثلاثة أضعاف ويعاني من نافذة سياق أضيق بكثير."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-vocabulary-engineering-special-tokens",
          "starterCode": "import numpy as np\n\ndef embed_tokens_with_special(token_ids: list[int], embedding_matrix: np.ndarray, bos_id: int, eos_id: int) -> np.ndarray:\n    \"\"\"\n    Prepend BOS, append EOS, and perform embedding table lookup.\n    \"\"\"\n    # Step 1: Wrap sequence with special control tokens [BOS] + token_ids + [EOS]\n    # TODO: full_sequence = [bos_id] + list(token_ids) + [eos_id]\n    # Step 2: Extract rows from embedding_matrix using vectorized indexing\n    # TODO: return embedding_matrix[full_sequence]\n    pass",
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
              "starterCode": "import numpy as np\n\ndef embed_tokens_with_special(token_ids: list[int], embedding_matrix: np.ndarray, bos_id: int, eos_id: int) -> np.ndarray:\n    \"\"\"\n    Prepend BOS, append EOS, and perform embedding table lookup.\n    \"\"\"\n    # Step 1: Wrap sequence with special control tokens [BOS] + token_ids + [EOS]\n    # TODO: full_sequence = [bos_id] + list(token_ids) + [eos_id]\n    # Step 2: Extract rows from embedding_matrix using vectorized indexing\n    # TODO: return embedding_matrix[full_sequence]\n    pass",
              "expectedOutput": "(4, 5)"
            }
          },
          "solution": "import numpy as np\n\ndef embed_tokens_with_special(token_ids: list[int], embedding_matrix: np.ndarray, bos_id: int, eos_id: int) -> np.ndarray:\n    full_sequence = [bos_id] + list(token_ids) + [eos_id]\n    return embedding_matrix[full_sequence]"
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
            "en": "Why does a high 'token fertility rate' for non-Latin scripts (such as Arabic) create an unfair handicap in LLMs?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ هندسة المعاجم والرموز الخاصة وتضمينات المتجهات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Sentences fragment into significantly more tokens, exhausting the model's context window faster and multiplying inference costs.",
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
                "en": "High fertility causes the model to output syntax errors in Python code.",
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
    "id": "transformer-attention",
    "title": "Scaled Dot-Product Self-Attention & Query-Key Routing",
    "titleAr": "آلية الانتباه الذاتي بالضرب النقطي المقاس وتوجيه الاستعلام والمفاتيح",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In a noisy hall where fifty people are talking simultaneously, how do you pay attention to the one person who matters? Your brain shines a...",
      "ar": "تخيل أنك في قاعة مزدحمة وتريد الاستماع لشخص معين؛ ستوجه تركيزك كـ 'مصباح تسليط ضوئي' (Spotlight) لوزن الكلمات ذات الصلة وتجاهل الضجيج."
    },
    "prerequisites": [
      "dot-product-geometry",
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
          "en": "In a noisy hall where fifty people are talking simultaneously, how do you pay attention to the one person who matters? Your brain shines a dynamic spotlight: ignoring irrelevant noise and amplifying the voice matching what you care about. In sequence modeling, words need this exact same spotlight! Consider the sentence: 'The bank of the river was muddy.' How does the word 'bank' know it refers to soil rather than money? Through self-attention! The word 'bank' shines a spotlight across every other word. When it strikes 'river', energetic resonance spikes! Vaswani et al. (2017) formalized this with Queries (Q), Keys (K), and Values (V):\n- Query (Q): What I am looking for ('bank' asks: 'Who describes my physical environment?').\n- Key (K): The label on the book ('river' says: 'I describe water and nature!').\n- Value (V): The actual knowledge pulled into the representation of 'bank'.",
          "ar": "تخيل أنك في قاعة مزدحمة وتريد الاستماع لشخص معين؛ ستوجه تركيزك كـ 'مصباح تسليط ضوئي' (Spotlight) لوزن الكلمات ذات الصلة وتجاهل الضجيج. في معالجة اللغات، تواجه الكلمات التحدي نفسه: في جملة 'ذهب خالد إلى بنك النهر'، كيف تدرك كلمة 'بنك' أنها تعني ضفة النهر وليس المؤسسة المالية؟ عبر آلية الانتباه الذاتي! ترسل كل كلمة استعلاماً (Query) يبحث عن سياقها، وتقارنه بمفاتيح (Keys) كافة الكلمات الأخرى عبر الضرب النقطي. وعندما يتطابق استعلام 'بنك' مع مفتاح 'النهر'، يقفز وزن الانتباه، فيتم سحب محتوى القيمة (Value) الخاصة بالنهر لإثراء معنى البنك."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}}\\right) \\mathbf{V}, \\quad \\text{Var}(\\mathbf{q} \\cdot \\mathbf{k}) = d_k",
        "formulaNote": {
          "en": "Scaled dot-product attention equation with dimensional variance normalization factor.",
          "ar": "معادلة الانتباه بالضرب النقطي المقاس مع معامل معايرة التباين البعدي."
        },
        "narrative": {
          "en": "The dot product QK^T computes pairwise cosine-like similarity between every Query and Key vector. Why divide by sqrt(d_k)? If elements of q and k are independent random variables with zero mean and variance 1, their dot product has variance d_k and standard deviation sqrt(d_k). In high dimensions (e.g. d_k = 128), dot products grow massive (> 30). Large logits push softmax exponentials into saturation regions where gradients vanish to zero (derivative ≈ 0). Dividing by sqrt(d_k) restores unit variance, keeping softmax responsive and gradients healthy.\n\n## Beat 3: Python Challenge",
          "ar": "يقيس الضرب النقطي QK^T درجة التشابه الهندسي بين كل استعلام ومفتاح. لماذا نقسم على جذر البعد sqrt(d_k)؟ إذا كانت عناصر المتجهات متغيرات عشوائية بتباين 1، فإن حاصل ضربهما النقطي يمتلك تبايناً يساوي d_k. في الأبعاد العالية (مثل d_k = 128)، تتضخم القيم الناتجة (> 30)، مما يدفع دالة Softmax إلى التشبع التام فتتلاشى تدرجاتها العكسية تماماً. يعيد التقسيم على sqrt(d_k) التباين إلى 1، مما يحافظ على استقرار التدرجات ومرونة التعلم."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-transformer-attention",
          "starterCode": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V.\n    \"\"\"\n    # Step 1: Determine scale factor 1.0 / sqrt(d_k) if scale is None\n    # d_k = Q.shape[-1]\n    # if scale is None: scale = 1.0 / np.sqrt(d_k)\n    # Step 2: Compute scaled scores S = Q @ K.T * scale\n    # TODO: Compute S = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale\n    # Step 3: Compute stable softmax: exp(S - max(S)) / sum(exp(S - max(S)))\n    # TODO: Compute attention weights A\n    # Step 4: Multiply by V: out = A @ V\n    pass",
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
              "starterCode": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V.\n    \"\"\"\n    # Step 1: Determine scale factor 1.0 / sqrt(d_k) if scale is None\n    # d_k = Q.shape[-1]\n    # if scale is None: scale = 1.0 / np.sqrt(d_k)\n    # Step 2: Compute scaled scores S = Q @ K.T * scale\n    # TODO: Compute S = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale\n    # Step 3: Compute stable softmax: exp(S - max(S)) / sum(exp(S - max(S)))\n    # TODO: Compute attention weights A\n    # Step 4: Multiply by V: out = A @ V\n    pass",
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
            "en": "Why is the scaling factor 1 / sqrt(d_k) mathematically necessary in dot-product attention?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ آلية الانتباه الذاتي بالضرب النقطي المقاس وتوجيه الاستعلام والمفاتيح تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "For large d_k, the variance of the dot product grows to d_k, pushing softmax into extreme saturation regions with near-zero gradients.",
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
                "en": "The scaling factor inverts the attention matrix to compute its mathematical pseudo-inverse.",
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
    "id": "multi-head-attention-projection",
    "title": "Multi-Head Attention (MHA) & Subspace Projections",
    "titleAr": "الانتباه متعدد الرؤوس (MHA) وإسقاطات الفضاءات الجزئية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A single spotlight can only illuminate one spot at a time. If a word's attention is busy tracking grammar (e.g.",
      "ar": "لا يستطيع مصباح ضوئي واحد التركيز على عدة زوايا في آن واحد. إذا ركز رأس انتباه وحيد على العلاقة النحوية بين المبتدأ والخبر، سيعجز عن تتبع..."
    },
    "prerequisites": [
      "transformer-attention",
      "matrix-multiplication-composition"
    ],
    "x": 1115,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "A single spotlight can only illuminate one spot at a time. If a word's attention is busy tracking grammar (e.g., subject-verb agreement), it cannot simultaneously track distant pronoun references or semantic sentiment using a single set of attention weights. Multi-Head Attention (MHA) splits the spotlight into multiple specialized lenses (e.g. h = 8 heads)! Instead of computing one giant attention map in full dimension d_model, the representations are linearly projected into h distinct subspaces of size d_k = d_model / h. Head 1 tracks syntax, Head 2 tracks pronoun coreference, and Head 3 tracks local neighbors. Finally, all heads concatenate their perspectives and pass through an integration projection W_O, merging multiple views with zero added FLOPs.",
          "ar": "لا يستطيع مصباح ضوئي واحد التركيز على عدة زوايا في آن واحد. إذا ركز رأس انتباه وحيد على العلاقة النحوية بين المبتدأ والخبر، سيعجز عن تتبع الضمائر العائدة أو المعاني البلاغية. تحل آلية 'الانتباه متعدد الرؤوس' (Multi-Head Attention) هذه المعضلة بتقسيم شعاع الانتباه إلى عدة رؤوس متوازية ومستقلة (h رؤوس)، حيث يُسقط كل رأس المتجهات في فضاء تمثيلي جزئي منخفض الأبعاد (d_k = d_model / h). يتخصص كل رأس في التقاط نمط لغوي محدد، ثم تُدمج نتائج كافة الرؤوس وتُسقط عبر مصفوفة إخراج رئيسية W_O لصهر الرؤى دون زيادة التكلفة الحسابية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{MHA}(\\mathbf{X}) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)\\mathbf{W}_O, \\quad \\text{head}_i = \\text{Attention}(\\mathbf{X}\\mathbf{W}_i^Q, \\mathbf{X}\\mathbf{W}_i^K, \\mathbf{X}\\mathbf{W}_i^V)",
        "formulaNote": {
          "en": "Multi-Head Attention linear projection, parallel subspace attention, and output synthesis.",
          "ar": "إسقاطات الانتباه متعدد الرؤوس وحساب الانتباه المتوازي في الفضاءات الجزئية والإسقاط النهائي."
        },
        "narrative": {
          "en": "Multi-Head Attention linearly projects Queries, Keys, and Values h times with independent learned weight matrices W_i^Q, W_i^K in R^{d_model x d_k} and W_i^V in R^{d_model x d_v}. On each of these projected versions, attention is performed in parallel. By setting d_k = d_v = d_model / h, the total computational complexity remains O(N² · d_model), exactly matching single-head attention, while dramatically enhancing the model's capacity to represent multi-faceted relational structures.\n\n## Beat 3: Python Challenge",
          "ar": "تسقط آلية الانتباه متعدد الرؤوس الاستعلامات والمفاتيح والقيم h مرات عبر مصفوفات أوزان مستقلة W_i^Q و W_i^K في فضاء جزئي d_k = d_model / h. يُحسب الانتباه بالتوازي عبر كافة الفضاءات الفرعية، وتُدمج المخرجات لتُضرب في مصفوفة الإسقاط W_O. وبفضل اختيار d_k = d_model / h، تظل التكلفة الحسابية الكلية متطابقة تماماً مع رأس انتباه منفرد O(N² · d_model)، مع مضاعفة القدرة التعبيرية."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multi-head-attention-projection",
          "starterCode": "import numpy as np\n\ndef multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray, num_heads: int) -> np.ndarray:\n    \"\"\"\n    Compute Multi-Head Attention forward pass: MultiHead(X) = Concat(head_1, ..., head_h) @ W_o.\n    \"\"\"\n    # Step 1: Project Q, K, V via linear weight matrices\n    # B, S, D = X.shape\n    # d_k = D // num_heads\n    # Step 2: Reshape and transpose to separate heads: (B, num_heads, S, d_k)\n    # TODO: Q_heads = (X @ W_q).reshape(B, S, num_heads, d_k).transpose(0, 2, 1, 3)\n    # TODO: K_heads and V_heads similarly\n    # Step 3: Compute attention per head, concatenate, and project via W_o\n    pass",
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
              "starterCode": "import numpy as np\n\ndef multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray, num_heads: int) -> np.ndarray:\n    \"\"\"\n    Compute Multi-Head Attention forward pass: MultiHead(X) = Concat(head_1, ..., head_h) @ W_o.\n    \"\"\"\n    # Step 1: Project Q, K, V via linear weight matrices\n    # B, S, D = X.shape\n    # d_k = D // num_heads\n    # Step 2: Reshape and transpose to separate heads: (B, num_heads, S, d_k)\n    # TODO: Q_heads = (X @ W_q).reshape(B, S, num_heads, d_k).transpose(0, 2, 1, 3)\n    # TODO: K_heads and V_heads similarly\n    # Step 3: Compute attention per head, concatenate, and project via W_o\n    pass",
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
            "en": "What is the primary advantage of Multi-Head Attention over single-head self-attention of the same total hidden dimension?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الانتباه متعدد الرؤوس (MHA) وإسقاطات الفضاءات الجزئية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "It allows the model to jointly attend to information from different representation subspaces at different positions simultaneously without increasing total FLOPs.",
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
                "en": "Multi-Head Attention eliminates the need for Positional Encodings.",
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
    "id": "causal-masking-scaled-dot-product",
    "title": "Causal Masking & Autoregressive Decoding",
    "titleAr": "الحجب السببي والتوليد التتابعي في نماذج المحولات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine taking a final exam where the answer key is printed right at the bottom of the page.",
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
          "en": "Imagine taking a final exam where the answer key is printed right at the bottom of the page. If you can look ahead into the future, you get an effortless 100% score during practice—but you learn nothing! When you sit for the real test without an answer key, you fail completely. In autoregressive language models (like GPT-4, Claude, and LLaMA), training is fully parallelized: we feed an entire 4,000-word text into the transformer all at once. But to learn how to predict the NEXT word, token 5 must NEVER peek at tokens 6, 7, or 8! Causal Masking enforces a strict one-way mirror (the Arrow of Time). Any attempt to look forward into future tokens is struck with -∞ before softmax. Because e^{-∞} = 0, attention weights to future tokens collapse to absolute mathematical zero.",
          "ar": "تخيل أن طالباً يتدرب على امتحان وورقة الإجابات النموذجية مفتوحة أمامه؛ سينظر إلى الإجابات المستقبلية بسهولة ويحصل على علامة كاملة دون أن يتعلم التفكير بمفرده! في نماذج المحولات التوليدية (GPT)، نقوم بتدريب النموذج على آلاف الرموز في خطوة متوازية واحدة فائقة السرعة. ولكن لكي يتعلم النموذج توليد الكلمة التالية بحق، يُمنع منعاً باتاً على أي رمز أن 'يسترق النظر' إلى المستقبل. يحقق 'الحجب السببي' (Causal Masking) هذا القيد الزمني الصارم عبر وضع مصفوفة مثلثة علوية مشحونة بقيم -∞ على خانات المستقبل قبل حساب Softmax؛ وبما أن e^{-∞} = 0، تصبح أوزان الانتباه للمستقبل أصفاراً رياضية مطلقة، مما يجبر النموذج على التنبؤ بناءً على الماضي والحاضر فقط."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{M}_{ij} = \\begin{cases} 0 & j \\le i \\\\ -\\infty & j > i \\end{cases}, \\quad \\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}} + \\mathbf{M}\\right) \\mathbf{V}",
        "formulaNote": {
          "en": "Upper-triangular causal attention mask enforcing chronological autoregressive dependency.",
          "ar": "قناع الحجب السببي المثلثي العلوي لفرض التبعية الزمنية في التوليد التتابعي."
        },
        "narrative": {
          "en": "In decoder-only autoregressive Transformers, causal masking guarantees that the prediction for token t+1 depends strictly on tokens 1 through t. An additive mask matrix M is constructed where M_{ij} = 0 for j <= i and M_{ij} = -inf (typically -1e9 in 32-bit floats) for j > i. Adding M to the pre-softmax logits ensures that the softmax denominator redistributes all probability mass strictly across past and current tokens, maintaining mathematical equivalence between parallel training and step-by-step inference.\n\n## Beat 3: Python Challenge",
          "ar": "في نماذج المحولات التوليدية المقتصرة على فك التشفير، يضمن الحجب السببي أن التنبؤ بالرمز t+1 يعتمد حصراً على الرموز السابقة والمعاصرة 1 إلى t. تُبنى مصفوفة القناع الجمعي M بقيم 0 للمواقع j <= i وقيم -∞ للمواقع المستقبلية j > i. عند جمع هذا القناع مع مصفوفة الألفة قبل Softmax، يعيد مقام التوزيع الاحتمالي توزيع كامل الكتلة الاحتمالية على الرموز السابقة فقط، مما يحقق تطابقاً رياضياً تاماً بين التدريب المتوازي فائق السرعة والاستدلال التتابعي خطوة بخطوة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-masking-scaled-dot-product",
          "starterCode": "import numpy as np\n\ndef causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Causal Autoregressive Attention with an upper-triangular lookahead mask.\n    \"\"\"\n    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)\n    # d_k = Q.shape[-1]\n    # S = np.matmul(Q, np.swapaxes(K, -1, -2)) / np.sqrt(d_k)\n    # Step 2: Build upper-triangular mask M (j > i) with -1e9\n    # TODO: mask = np.triu(np.full((S_len, S_len), -1e9), k=1)\n    # TODO: Add mask to S\n    # Step 3: Compute stable softmax and multiply by V\n    pass",
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
              "starterCode": "import numpy as np\n\ndef causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute Causal Autoregressive Attention with an upper-triangular lookahead mask.\n    \"\"\"\n    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)\n    # d_k = Q.shape[-1]\n    # S = np.matmul(Q, np.swapaxes(K, -1, -2)) / np.sqrt(d_k)\n    # Step 2: Build upper-triangular mask M (j > i) with -1e9\n    # TODO: mask = np.triu(np.full((S_len, S_len), -1e9), k=1)\n    # TODO: Add mask to S\n    # Step 3: Compute stable softmax and multiply by V\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    d_k = Q.shape[-1]\n    S = np.matmul(Q, np.swapaxes(K, -1, -2)) / np.sqrt(d_k)\n    S_len = Q.shape[-2]\n    mask = np.triu(np.full((S_len, S_len), -1e9), k=1)\n    S_masked = S + mask\n    S_max = np.max(S_masked, axis=-1, keepdims=True)\n    exp_S = np.exp(S_masked - S_max)\n    weights = exp_S / np.sum(exp_S, axis=-1, keepdims=True)\n    out = np.matmul(weights, V)\n    return out, weights"
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
            "en": "Why is causal masking implemented by adding -∞ to scores BEFORE softmax rather than zeroing out weights AFTER softmax?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الحجب السببي والتوليد التتابعي في نماذج المحولات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Zeroing weights after softmax breaks probability normalization (sum != 1), whereas adding -∞ before softmax naturally normalizes the remaining past positions.",
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
                "en": "Softmax cannot be computed on GPUs unless an upper-triangular mask is present.",
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
    "id": "positional-encoding-sinusoidal-rope",
    "title": "Rotary Position Embedding (RoPE) & Sinusoidal Encodings",
    "titleAr": "تضمين المواضع الدوراني (RoPE) والترميزات الجيبية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "The standard self-attention mechanism is mathematically permutation-equivariant: without explicit position indicators, the sentence \"the...",
      "ar": "تتميز آلية الانتباه الذاتي في المحولات بأنها متماثلة تحت التباديل، مما يعني أن جملة \"عض الكلب ساعي البريد\" و\"عض ساعي البريد الكلب\" تنتج نفس..."
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
          "en": "The standard self-attention mechanism is mathematically permutation-equivariant: without explicit position indicators, the sentence *\"the dog bit the mailman\"* and *\"the mailman bit the dog\"* produce identical contextual representations. In the seminal 2017 Transformer architecture, Vaswani et al. introduced absolute sinusoidal positional encodings—adding fixed sinusoidal waves directly to token input embeddings ($\\mathbf{x}_m + \\mathbf{p}_m$). While effective for basic translation, additive absolute embeddings struggle to generalize to unseen sequence lengths and fail to naturally encode *relative* token distances: whether two words appear 3 tokens apart at the beginning or the end of a novel, their grammatical relationship remains identical.\n\nRotary Position Embedding (RoPE - Su et al., 2021) revolutionized position representation in modern frontier LLMs (LLaMA, Mistral, PaLM) by implementing position through **rotation in the complex plane**. Instead of adding an external coordinate vector to embeddings, RoPE pairs adjacent dimensions of query and key vectors into 2D orthogonal subspaces and rotates each 2D slice by an angle proportional to the token's position index $m \\theta_i$.\n\nBecause the inner product between two vectors rotated by angles $m\\theta_i$ and $n\\theta_i$ depends strictly on the difference between their angles $(m - n)\\theta_i$, the self-attention dot product $\\mathbf{q}_m^T \\mathbf{k}_n$ becomes an intrinsic function of relative token displacement!\n\n> **Frontier Analogy:** Think of clock hands on a dial. If two tokens are positioned at timestamps $m$ and $n$, their relative distance is simply the angular separation between the clock hands, regardless of what hour is struck on the wall clock.",
          "ar": "تتميز آلية الانتباه الذاتي في المحولات بأنها متماثلة تحت التباديل، مما يعني أن جملة \"عض الكلب ساعي البريد\" و\"عض ساعي البريد الكلب\" تنتج نفس التضمينات الحسابية تماماً في غياب مؤشرات المواضع. استخدمت المحولات الكلاسيكية ترميزات جيبية مطلقة أضيفت مباشرة إلى متجهات المدخلات، لكنها واجهت صعوبات بالغة في التعميم على أطوال سياق غير مرئية وفي التقاط المسافات النسبية.\n\nيقدم \"تضمين المواضع الدوراني\" (RoPE) حلاً رياضياً ثورياً عبر تضمين الموضع من خلال **التدوير في المستوى المركب**. فبدلاً من إضافة متجهات خارجية، يقسم RoPE متجهات الاستعلام والمفاتيح إلى شرائح ثنائية الأبعاد، ويدير كل شريحة بزاوية تتناسب طردياً مع موقع الرمز $m \\theta_i$. وبفضل الخصائص الجبرية للدوران، يعتمد الجداء النقطي بين الاستعلام والمفتاح حصراً على فارق الزوايا $(m - n)\\theta_i$، مما يضمن أن تتلاشى درجات الانتباه بسلاسة مع تباعد المسافات النسبية بين الكلمات كما تدور عقارب الساعة بدقة متناهية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{q}_m^T \\mathbf{k}_n = \\left(\\mathbf{R}_{\\Theta, m}^d \\mathbf{q}_m\\right)^T \\left(\\mathbf{R}_{\\Theta, n}^d \\mathbf{k}_n\\right) = \\mathbf{q}_m^T \\mathbf{R}_{\\Theta, n - m}^d \\mathbf{k}_n",
        "formulaNote": {
          "en": "RoPE orthogonal block-diagonal rotation preserving relative distance invariance.",
          "ar": "مصفوفة الدوران القطرية الكتلية المتعامدة لـ RoPE التي تحفظ ثبات المسافة النسبية."
        },
        "narrative": {
          "en": "$$\n\\mathbf{R}_{\\Theta, m}^d = \\text{diag}\\left(\\mathbf{R}_{\\theta_1, m}, \\mathbf{R}_{\\theta_2, m}, \\dots, \\mathbf{R}_{\\theta_{d/2}, m}\\right), \\quad \\mathbf{R}_{\\theta_i, m} = \\begin{pmatrix} \\cos(m\\theta_i) & -\\sin(m\\theta_i) \\\\ \\sin(m\\theta_i) & \\cos(m\\theta_i) \\end{pmatrix}\n$$\n\n$$\n\\theta_i = b^{-2(i-1)/d}, \\quad i \\in \\{1, 2, \\dots, d/2\\}, \\quad b = 10\\,000\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $\\mathbf{q}_m, \\mathbf{k}_n \\in \\mathbb{R}^d$: The query vector at sequence position $m$ and the key vector at sequence position $n$, where $d$ is the attention head dimension.\n- $\\mathbf{R}_{\\Theta, m}^d \\in \\mathbb{R}^{d \\times d}$: The orthogonal block-diagonal rotation matrix encoding position $m$.\n- $\\mathbf{R}_{\\theta_i, m} \\in \\mathbb{R}^{2 \\times 2}$: The 2D rotation operator acting on the $i$-th coordinate pair $(x_{2i-1}, x_{2i})$.\n- $\\theta_i = b^{-2(i-1)/d}$: The geometric frequency progression across channels, where $b$ is the base frequency (10,000 in original RoPE, up to 500,000 in Llama 3 for ultra-long context).\n- $n - m$: The relative token offset; the identity $\\mathbf{R}_m^T \\mathbf{R}_n = \\mathbf{R}_{n - m}$ proves that self-attention dot products depend purely on relative distance.",
          "ar": "تضمن هذه الصياغة الرياضية انخفاض درجات الانتباه تدريجياً مع تزايد المسافة النسبية $|m - n|$ بفضل تداخل الترددات الجيبية المتعددة (وفق مبرهنة ريمان-لوبيغ)، مما يمنح النموذج تحيزاً استقرائياً طبيعياً للتركيز على السياق المحلي مع الحفاظ على القدرة على الانتباه للروابط البعيدة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-positional-encoding-sinusoidal-rope",
          "starterCode": "import numpy as np\n\ndef precompute_rope_frequencies(dim: int, seq_len: int, base: float = 10000.0) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Precompute cosine and sine frequency matrices for RoPE.\n    \n    Parameters\n    ----------\n    dim : int\n        Head dimension (must be even).\n    seq_len : int\n        Maximum sequence length.\n    base : float\n        Frequency base scaling factor.\n        \n    Returns\n    -------\n    cos, sin : tuple of np.ndarray of shape (seq_len, dim)\n    \"\"\"\n    # Half dimension for 2D coordinate pairs\n    theta = 1.0 / (base ** (np.arange(0, dim, 2, dtype=np.float32) / dim))\n    positions = np.arange(seq_len, dtype=np.float32)\n    # Outer product: (seq_len, dim // 2)\n    angles = np.outer(positions, theta)\n    # Repeat along the last axis to match head dimension (seq_len, dim)\n    cos = np.repeat(np.cos(angles), 2, axis=-1)\n    sin = np.repeat(np.sin(angles), 2, axis=-1)\n    return cos, sin\n\ndef rotate_half(x: np.ndarray) -> np.ndarray:\n    \"\"\"Rotate 2D coordinate pairs: [-x1, x0, -x3, x2, ...].\"\"\"\n    x1 = x[..., 0::2]\n    x2 = x[..., 1::2]\n    rotated = np.stack([-x2, x1], axis=-1)\n    return rotated.reshape(x.shape)\n\ndef apply_rope(x: np.ndarray, pos: int, base: float = 10000.0) -> np.ndarray:\n    \"\"\"\n    Applies Rotary Position Embedding to a tensor x at position pos.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, H, D) or (B, 1, D)\n        Input query or key tensor.\n    pos : int\n        Current sequence index.\n        \n    Returns\n    -------\n    np.ndarray of same shape as x with rotary embedding applied.\n    \"\"\"\n    D = x.shape[-1]\n    cos_table, sin_table = precompute_rope_frequencies(D, pos + 1, base=base)\n    cos_m = cos_table[pos]  # shape (D,)\n    sin_m = sin_table[pos]  # shape (D,)\n    \n    # RoPE formula: x * cos(m*theta) + rotate_half(x) * sin(m*theta)\n    return (x * cos_m) + (rotate_half(x) * sin_m)",
          "testCases": [
            {
              "input": "x = np.array([[[1.0, 0.0]]]); m = 0; apply_rope(x, m)",
              "expected": "1.0"
            },
            {
              "input": "x = np.array([[[0.0, 1.0]]]); m = 0; apply_rope(x, m)",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef precompute_rope_frequencies(dim: int, seq_len: int, base: float = 10000.0) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Precompute cosine and sine frequency matrices for RoPE.\n    \n    Parameters\n    ----------\n    dim : int\n        Head dimension (must be even).\n    seq_len : int\n        Maximum sequence length.\n    base : float\n        Frequency base scaling factor.\n        \n    Returns\n    -------\n    cos, sin : tuple of np.ndarray of shape (seq_len, dim)\n    \"\"\"\n    # Half dimension for 2D coordinate pairs\n    theta = 1.0 / (base ** (np.arange(0, dim, 2, dtype=np.float32) / dim))\n    positions = np.arange(seq_len, dtype=np.float32)\n    # Outer product: (seq_len, dim // 2)\n    angles = np.outer(positions, theta)\n    # Repeat along the last axis to match head dimension (seq_len, dim)\n    cos = np.repeat(np.cos(angles), 2, axis=-1)\n    sin = np.repeat(np.sin(angles), 2, axis=-1)\n    return cos, sin\n\ndef rotate_half(x: np.ndarray) -> np.ndarray:\n    \"\"\"Rotate 2D coordinate pairs: [-x1, x0, -x3, x2, ...].\"\"\"\n    x1 = x[..., 0::2]\n    x2 = x[..., 1::2]\n    rotated = np.stack([-x2, x1], axis=-1)\n    return rotated.reshape(x.shape)\n\ndef apply_rope(x: np.ndarray, pos: int, base: float = 10000.0) -> np.ndarray:\n    \"\"\"\n    Applies Rotary Position Embedding to a tensor x at position pos.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, H, D) or (B, 1, D)\n        Input query or key tensor.\n    pos : int\n        Current sequence index.\n        \n    Returns\n    -------\n    np.ndarray of same shape as x with rotary embedding applied.\n    \"\"\"\n    D = x.shape[-1]\n    cos_table, sin_table = precompute_rope_frequencies(D, pos + 1, base=base)\n    cos_m = cos_table[pos]  # shape (D,)\n    sin_m = sin_table[pos]  # shape (D,)\n    \n    # RoPE formula: x * cos(m*theta) + rotate_half(x) * sin(m*theta)\n    return (x * cos_m) + (rotate_half(x) * sin_m)",
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
            "en": "**Scenario:** You are deploying a 7B parameter LLM trained with standard RoPE at a maximum context window of 4,096 tokens ($b=10\\,000$). Your application requires evaluating a 32,000-token legal brief. When passing positions $m > 4096$ without any positional modification, generation quality degrades into gibberish. Why does this failure occur, and what is the principled architectural solution?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تضمين المواضع الدوراني (RoPE) والترميزات الجيبية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "RoPE rotation matrices become non-orthogonal for indices $m > 4096$, causing floating-point overflow in the dot product.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The model encounters unseen rotation angles $(m\\theta_i)$ where high-frequency components oscillate at wavelengths never experienced during training, causing attention scores to blow up out-of-distribution; RoPE Interpolation (such as YaRN or NTK-aware scaling) downscales the rotation frequencies by a factor of $s = 32000 / 4096$ to map long contexts into the familiar $[0, 4096]$ angular spectrum.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "en": "While the original 2017 Transformer architecture featured an encoder-decoder topology engineered for bidirectional machine translation,...",
      "ar": "بينما صُممت محولات عام 2017 الأصلية بهيكل مزدوج (مشفّر ومفكّك) للترجمة الآلية، استقرت نماذج الذكاء الاصطناعي التوليدي الرائدة الحديثة..."
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
          "en": "While the original 2017 Transformer architecture featured an encoder-decoder topology engineered for bidirectional machine translation, modern generative foundation models (GPT-4, Claude, LLaMA, Mistral) converged completely on the **Decoder-Only** paradigm. This architectural consolidation is grounded in the foundational objective of language modeling: causal next-token prediction, where the joint probability of an arbitrary sequence factorizes autoregressively as:\n\n$$\nP(x_1, x_2, \\dots, x_T) = \\prod_{t=1}^T P(x_t \\mid x_1, \\dots, x_{t-1})\n$$\n\nIn a decoder-only architecture, every token at position $t$ is strictly prevented from attending to future tokens $j > t$ via an upper-triangular causal attention mask. Furthermore, contemporary LLMs universally adopt **Pre-LayerNorm (Pre-LN)** or **Pre-RMSNorm**: normalization is applied *prior* to self-attention and feedforward sub-layers rather than after them. This architectural design creates an unimpeded identity shortcut—a clean residual highway—allowing gradients to backpropagate directly from the top loss layer down to the initial token embedding matrix without undergoing exponential dampening or exploding variances.\n\n> **Frontier Analogy:** Envision a high-speed automotive assembly line conveyor belt. Each technician station inspects only the parts already assembled on the belt upstream (causal masking), crafts an upgrade, and gently fastens it onto the moving chassis without stopping or redirecting the main conveyor belt (the residual highway).",
          "ar": "بينما صُممت محولات عام 2017 الأصلية بهيكل مزدوج (مشفّر ومفكّك) للترجمة الآلية، استقرت نماذج الذكاء الاصطناعي التوليدي الرائدة الحديثة بالكامل على معمارية \"المفكك فقط\" (Decoder-Only). يرتكز هذا التوحيد المعماري على الهدف الجوهري لنماذج اللغة الكبيرة: التنبؤ السببي بالرمز التالي عبر التحليل الذاتي الانحدار.\n\nتفرض هذه المعمارية حجبياً سببيّاً مثلثياً علوياً يمنع كلياً تسرب معلومات المستقبل أثناء التدريب المتوازي. بالإضافة إلى ذلك، تستخدم المعماريات الحديثة تقنية \"التطبيع المسبق\" (Pre-LN / Pre-RMSNorm)؛ حيث تُعايَر التنشيطات قبل دخول طبقات الانتباه والتغذية الأمامية، مما يحافظ على \"طريق سريعة للاتصالات المتبقية\" (Residual Highway) تتدفق عبرها التدرجات بسلاسة ودون تلاشٍ عبر مئات الطبقات العميقة."
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
          "en": "$$\n\\mathbf{h}^{(l)} = \\mathbf{h}^{(l)\\prime} + \\text{MLP}\\left(\\text{RMSNorm}(\\mathbf{h}^{(l)\\prime})\\right)\n$$\n\n$$\nP(x_{t+1} \\mid x_{\\le t}) = \\text{softmax}\\left(\\mathbf{W}_{\\text{unembed}} \\cdot \\text{RMSNorm}\\left(\\mathbf{h}_t^{(L)}\\right)\\right)\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $\\mathbf{h}^{(l-1)} \\in \\mathbb{R}^{B \\times T \\times d}$: Hidden state activations entering transformer layer $l$, across batch size $B$, sequence length $T$, and model dimension $d$.\n- $\\text{RMSNorm}(\\mathbf{x}) = \\frac{\\mathbf{x}}{\\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\epsilon}} \\odot \\boldsymbol{\\gamma}$: Root Mean Square normalization that stabilizes variance without the computational overhead of mean-centering.\n- $\\text{CausalMHA}(\\cdot)$: Multi-Head Attention enforcing causal mask $\\mathbf{M}_{ij} = -\\infty$ for all $j > i$.\n- $\\mathbf{h}^{(l)\\prime}$: Intermediate representations after attention and the first residual highway addition.\n- $\\text{MLP}(\\cdot)$: Feedforward sub-layer (historically GELU MLP, or modern SwiGLU).\n- $\\mathbf{W}_{\\text{unembed}} \\in \\mathbb{R}^{V \\times d}$: Language model unembedding head projecting the final layer hidden state to vocabulary logits across vocabulary size $V$.",
          "ar": "تسمح هذه البنية بتدريب مليارات المعاملات بتوازي هائل عبر استغلال كامل الذاكرة التخزينية أثناء مرحلة الملء الأولي (Prefill)، وتوليد الإجابات تدريجياً رمزاً تلو الآخر أثناء مرحلة الاستدلال (Generation)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-decoder-only-gpt-transformer",
          "starterCode": "def rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    \"\"\"RMSNorm across the last dimension.\"\"\"\n    # Causal mask: mask out upper triangle where col > row\n    # Numerically stable softmax\n    # 1. Attention sub-layer with Pre-RMSNorm\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.ones((1, 4, 8)); forward_gpt_block(x)",
              "expected": "1.0"
            },
            {
              "input": "x = np.zeros((1, 4, 8)); forward_gpt_block(x)",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    \"\"\"RMSNorm across the last dimension.\"\"\"\n    # Causal mask: mask out upper triangle where col > row\n    # Numerically stable softmax\n    # 1. Attention sub-layer with Pre-RMSNorm\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    \"\"\"RMSNorm across the last dimension.\"\"\"\n    variance = np.mean(x ** 2, axis=-1, keepdims=True)\n    return x / np.sqrt(variance + eps)\n\ndef causal_attention(q: np.ndarray, k: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Scaled dot-product attention with strict lower-triangular causal masking.\n    Shapes: (B, T, D)\n    \"\"\"\n    B, T, D = q.shape\n    scale = 1.0 / np.sqrt(D)\n    scores = np.matmul(q, k.swapaxes(-1, -2)) * scale  # (B, T, T)\n    \n    # Causal mask: mask out upper triangle where col > row\n    mask = np.triu(np.full((T, T), -np.inf), k=1)\n    scores = scores + mask\n    \n    # Numerically stable softmax\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    return np.matmul(attn_weights, v)\n\ndef forward_gpt_block(x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Executes a single Pre-LayerNorm / Pre-RMSNorm Transformer Decoder block.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, T, D)\n        Input token representations.\n        \n    Returns\n    -------\n    np.ndarray of shape (B, T, D)\n        Updated token representations after residual connections.\n    \"\"\"\n    B, T, D = x.shape\n    \n    # 1. Attention sub-layer with Pre-RMSNorm\n    norm_x1 = rms_norm(x)\n    # Using identity projections for clean test verification\n    attn_out = causal_attention(norm_x1, norm_x1, norm_x1)\n    # Residual Highway 1\n    h = x + attn_out\n    \n    # 2. MLP sub-layer with Pre-RMSNorm\n    norm_h = rms_norm(h)\n    # ReLU MLP projection\n    mlp_out = np.maximum(0, norm_h)\n    # Residual Highway 2\n    out = h + mlp_out\n    return out"
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
            "en": "**Scenario:** During the pre-training of a 100-layer decoder-only foundation model, an engineer proposes reverting from Pre-LN ($\\mathbf{x} + \\text{Sublayer}(\\text{LN}(\\mathbf{x}))$) to the original 2017 Post-LN ($\\text{LN}(\\mathbf{x} + \\text{Sublayer}(\\mathbf{x}))$) design. Within the first 50 iterations, training diverges catastrophically with NaN gradients. What mathematical property caused Post-LN to fail where Pre-LN succeeded?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ معمارية المحولات التوليدية المفككة فقط (GPT) ذاتية الانحدار تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Post-LN requires doubling the hidden dimension $d$, causing tensor core memory alignment faults.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "ar": "في مرحلة الاستدلال وتوليد النصوص الحية، تُنتج النماذج اللغوية الكلمات رمزاً تلو الآخر بصورة تتابعية ذاتية الانحدار."
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
          "en": "During LLM pretraining, computation is parallelized across all $T$ tokens simultaneously via the causal triangular mask. However, during real-world inference generation, tokens are produced strictly one by one in an autoregressive loop: to predict token $t+1$, the model requires the output of token $t$.\n\nIn a naive implementation without caching, generating token $t+1$ requires feeding all preceding $t$ tokens back into the model. Across all transformer layers, the linear projections for Query ($\\mathbf{Q}$), Key ($\\mathbf{K}$), and Value ($\\mathbf{V}$) are recalculated from scratch for every past token—even though their contextual representations for tokens $1, \\dots, t-1$ never change! This naive recomputation scales quadratically as $\\mathcal{O}(T^2)$ total operations over a sequence of length $T$.\n\n**Key-Value (KV) Caching** solves this computational bottleneck by persisting the computed $\\mathbf{K}$ and $\\mathbf{V}$ tensor states across past decoding steps in GPU High-Bandwidth Memory (HBM).\n\n> **Frontier Analogy:** KV caching is like keeping scratch notes so you don't reread the entire book from scratch on every word. When writing the next word in an essay, you only check your margin notes for key ideas and references, appending a single bullet point for the latest sentence rather than re-reading all 500 preceding pages from word one.",
          "ar": "في مرحلة الاستدلال وتوليد النصوص الحية، تُنتج النماذج اللغوية الكلمات رمزاً تلو الآخر بصورة تتابعية ذاتية الانحدار. في التنفيذ الساذج غير المحسن، تضطر كل خطوة زمنية إلى إعادة حساب متجهات الاستعلام والمفاتيح والقيم لجميع الرموز السابقة من البداية، مما يرفع التعقيد الحسابي الإجمالي إلى $\\mathcal{O}(T^2)$ ويهدر طاقة المعالجة في تكرار حسابات متطابقة لا تتغير قيمتها الرياضية مطلقاً.\n\nتقنية **التخزين المؤقت للمفاتيح والقيم (KV Caching)** تشبه تدوين ملاحظات موجزة في مسودتك الجانبية حتى لا تضطر إلى إعادة قراءة الكتاب بأكمله من الصفحة الأولى عند كتابة كل كلمة جديدة! عند وصول الرمز الجديد في الخطوة $t$، نقوم بحساب الاستعلام والمفتاح والقيمة للرمز الحالي فقط ($T=1$)، ثم نلحق المفتاح والقيمة الجدد بمسودة الذاكرة المحفوظة مسبقاً في بطاقة الرسوميات، مما يختزل الحسابات إلى زمن خطي $\\mathcal{O}(T)$ لكل رمز مولد."
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
          "en": "$$\n\\mathbf{q}_t = \\mathbf{x}_t \\mathbf{W}_Q, \\quad \\mathbf{k}_t = \\mathbf{x}_t \\mathbf{W}_K, \\quad \\mathbf{v}_t = \\mathbf{x}_t \\mathbf{W}_V\n$$\n\n$$\n\\mathbf{a}_t = \\text{softmax}\\left(\\frac{\\mathbf{q}_t \\left(\\mathbf{K}_{\\text{cached}}^{(t)}\\right)^T}{\\sqrt{d_k}}\\right) \\mathbf{V}_{\\text{cached}}^{(t)} \\in \\mathbb{R}^{1 \\times d_v}\n$$\n\n$$\n\\text{Memory}_{\\text{KV}} = 2 \\times 2 \\times n_{\\text{layers}} \\times n_{\\text{heads}} \\times d_{\\text{head}} \\times T \\times B \\quad \\text{(bytes in FP16)}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $\\mathbf{x}_t \\in \\mathbb{R}^{1 \\times d}$: Current single-token embedding at generation step $t$.\n- $\\mathbf{q}_t \\in \\mathbb{R}^{1 \\times d_k}$: Single-row Query vector for the newest token.\n- $\\mathbf{k}_t \\in \\mathbb{R}^{1 \\times d_k}, \\mathbf{v}_t \\in \\mathbb{R}^{1 \\times d_v}$: Key and Value vectors for the current token appended along the sequence length dimension.\n- $\\mathbf{K}_{\\text{cached}}^{(t)}, \\mathbf{V}_{\\text{cached}}^{(t)}$: Persistent tensors storing historical keys and values across the context window $1 \\dots t$.\n- $\\mathbf{a}_t \\in \\mathbb{R}^{1 \\times d_v}$: The single-token contextual attention output vector.\n- FLOPs per step: Reduced from $\\mathcal{O}(t \\cdot d^2)$ down to $\\mathcal{O}(1 \\cdot d^2)$ for projections, and $\\mathcal{O}(t \\cdot d)$ for attention scoring.",
          "ar": "تبلغ مساحة ذاكرة KV عبر الطبقات 2 * 2 * n_layers * n_heads * d_head * T * B بايت بدقة FP16."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-kv-caching-autoregressive-generation",
          "starterCode": "def kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray,\n    W_k: np.ndarray,\n    W_v: np.ndarray,\n    W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes an autoregressive step for a single token using KV Caching.\n    \n    Parameters\n    ----------\n    x_t : np.ndarray of shape (B, 1, D)\n        New input token embedding at time step t.\n    k_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached key states from previous generation steps.\n    v_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached value states from previous generation steps.\n    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)\n        Projection weight matrices.\n        \n    Returns\n    -------\n    out_t : np.ndarray of shape (B, 1, D)\n        Attention output for current token.\n    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)\n        Updated KV cache containing historical + new keys and values.\n    \"\"\"\n    # 1. Project single new token to Q, K, V\n    # 2. Append new key and value to persistent cache\n    # 3. Compute scaled attention: (B, 1, D) @ (B, D, t) -> (B, 1, t)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, None, None, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])",
              "expected": "1.0"
            },
            {
              "input": "x = np.ones((1, 1, 4)); k_prev = np.ones((1, 1, 4)); v_prev = np.ones((1, 1, 4)); out, k, v = kv_cache_decoder_step(x, k_prev, v_prev, np.eye(4), np.eye(4), np.eye(4), np.eye(4)); float(k.shape[1])",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray,\n    W_k: np.ndarray,\n    W_v: np.ndarray,\n    W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes an autoregressive step for a single token using KV Caching.\n    \n    Parameters\n    ----------\n    x_t : np.ndarray of shape (B, 1, D)\n        New input token embedding at time step t.\n    k_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached key states from previous generation steps.\n    v_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached value states from previous generation steps.\n    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)\n        Projection weight matrices.\n        \n    Returns\n    -------\n    out_t : np.ndarray of shape (B, 1, D)\n        Attention output for current token.\n    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)\n        Updated KV cache containing historical + new keys and values.\n    \"\"\"\n    # 1. Project single new token to Q, K, V\n    # 2. Append new key and value to persistent cache\n    # 3. Compute scaled attention: (B, 1, D) @ (B, D, t) -> (B, 1, t)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray,\n    W_k: np.ndarray,\n    W_v: np.ndarray,\n    W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes an autoregressive step for a single token using KV Caching.\n    \n    Parameters\n    ----------\n    x_t : np.ndarray of shape (B, 1, D)\n        New input token embedding at time step t.\n    k_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached key states from previous generation steps.\n    v_cache : np.ndarray or None of shape (B, t-1, D)\n        Cached value states from previous generation steps.\n    W_q, W_k, W_v, W_o : np.ndarray of shape (D, D)\n        Projection weight matrices.\n        \n    Returns\n    -------\n    out_t : np.ndarray of shape (B, 1, D)\n        Attention output for current token.\n    k_updated, v_updated : tuple of np.ndarray of shape (B, t, D)\n        Updated KV cache containing historical + new keys and values.\n    \"\"\"\n    B, _, D = x_t.shape\n    \n    # 1. Project single new token to Q, K, V\n    q_t = np.dot(x_t, W_q)  # (B, 1, D)\n    k_t = np.dot(x_t, W_k)  # (B, 1, D)\n    v_t = np.dot(x_t, W_v)  # (B, 1, D)\n    \n    # 2. Append new key and value to persistent cache\n    if k_cache is None or k_cache.size == 0:\n        k_updated = k_t\n        v_updated = v_t\n    else:\n        k_updated = np.concatenate([k_cache, k_t], axis=1)  # (B, t, D)\n        v_updated = np.concatenate([v_cache, v_t], axis=1)  # (B, t, D)\n        \n    # 3. Compute scaled attention: (B, 1, D) @ (B, D, t) -> (B, 1, t)\n    d_k = float(D)\n    scores = np.matmul(q_t, k_updated.swapaxes(-1, -2)) / np.sqrt(d_k)\n    \n    # Numerically stable softmax across historical dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # 4. Context aggregation: (B, 1, t) @ (B, t, D) -> (B, 1, D)\n    context = np.matmul(attn_weights, v_updated)\n    out_t = np.dot(context, W_o)\n    \n    return out_t, k_updated, v_updated"
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
            "en": "**Scenario:** You are serving a 70B parameter model (80 layers, 64 attention heads, head dimension $d_k = 128$) to a batch of $B = 32$ concurrent users. Each user generates up to $T = 4\\,096$ tokens in FP16 precision. Your operations team reports that although GPU compute utilization is under 25%, generation throughput drops precipitously and requests begin encountering Out-Of-Memory (OOM) errors. What is the root cause?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التخزين المؤقت للمفاتيح والقيم (KV Caching) والتوليد ذاتي الانحدار تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The GPU compute matrix cores suffer thermal throttling due to constant dense matrix multiplications.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "en": "As context windows expanded from 2,048 tokens in GPT-3 to 32,768 and 128,000 tokens in modern LLMs, the KV Cache Memory Wall became the...",
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
          "en": "As context windows expanded from 2,048 tokens in GPT-3 to 32,768 and 128,000 tokens in modern LLMs, the **KV Cache Memory Wall** became the primary bottleneck in production serving. In classic Multi-Head Attention (MHA), every query head has its own corresponding key and value head ($H_Q = H_{KV}$). For a model with 64 heads, 64 distinct Key and Value matrices must be saved in GPU memory and retrieved across the memory bus on every single decoding step.\n\nIn 2019, Noam Shazeer proposed **Multi-Query Attention (MQA)**: all $H_Q$ query heads share a *single* key-value head pair ($H_{KV} = 1$). While MQA slashes KV cache memory consumption and memory bandwidth by $H_Q \\times$, this extreme compression often degrades model reasoning capacity and fine-grained attention expressivity.\n\n**Grouped-Query Attention (GQA)** (Ainslie et al., 2023) is the Pareto-optimal architectural sweet spot adopted by LLaMA 2/3, Mistral, and Gemma. Instead of an all-or-nothing trade-off, GQA divides $H_Q$ query heads into $G$ groups, where each group of queries shares a single Key-Value head pair ($1 < H_{KV} < H_Q$). For instance, a model with 64 query heads and 8 KV heads ($G=8$) achieves an $8\\times$ reduction in KV cache size with virtually indistinguishable perplexity compared to standard MHA!\n\n> **Frontier Analogy:** Think of classroom tutoring. Standard MHA is like hiring a dedicated private tutor for every single student (high quality, but financially unsustainable). MQA is like assigning one overwhelmed tutor to teach 32 students at once (cheap, but quality drops). GQA organizes students into 8 study groups of 4 students, each guided by a specialized tutor—maintaining high-touch pedagogical quality while drastically reducing costs.",
          "ar": "مع اتساع نوافذ السياق إلى عشرات ومئات الآلاف من الرموز في النماذج اللغوية الحديثة، أصبح \"جدار ذاكرة التخزين المؤقت للمفاتيح والقيم\" العائق الأساسي الذي يقيد سعة الخوادم وسرعة الاستدلال. في انتباه الرؤوس المتعددة الكلاسيكي (MHA)، يمتلك كل رأس استعلام رأساً مخصصاً للمفاتيح والقيم ($H_Q = H_{KV}$). هذا يعني أنه لنموذج يحتوي على 64 رأساً، يجب تخزين واسترجاع 64 مصفوفة مختلفة من الذاكرة في كل خطوة توليد.\n\nقدمت تقنية MQA حلاً متطرفاً بجعل كافة رؤوس الاستعلام تشترك في رأس مفاتيح وقيم وحيد ($H_{KV} = 1$). ورغم أن هذا يقلص حجم الذاكرة بمعامل $64\\times$، إلا أنه يتسبب في تراجع ملحوظ في دقة النموذج وقدرته الاستدلالية.\n\nتُعد تقنية **انتباه الاستعلامات المجمعة (GQA)** الحل الهندسي الأمثل المعتمد في LLaMA 3 وMistral: حيث تُقسم رؤوس الاستعلام إلى مجموعات، تشترك كل مجموعة منها في زوج واحد من رؤوس المفاتيح والقيم ($1 < H_{KV} < H_Q$). فإذا كان لدينا 64 رأس استعلام مقسمة إلى 8 مجموعات تشترك في 8 رؤوس مفاتيح وقيم، ينخفض استهلاك الذاكرة وحركة البيانات بنسبة $8\\times$ مع الحفاظ على الأداء التوليدي المتميز!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "r = \\frac{H_Q}{H_{KV}}, \\quad \\text{for group } g \\in \\{1, \\dots, H_{KV}\\} \\text{ and head } i \\in \\{1, \\dots, r\\}:",
        "formulaNote": {
          "en": "Grouped-Query Attention head replication and KV cache memory reduction ratio.",
          "ar": "تكرار رؤوس انتباه الاستعلامات المجمعة ونسبة تخفيض ذاكرة المفاتيح والقيم."
        },
        "narrative": {
          "en": "$$\n\\text{head}_{g, i} = \\text{softmax}\\left(\\frac{\\mathbf{q}_{g, i} \\mathbf{k}_g^T}{\\sqrt{d_k}}\\right) \\mathbf{v}_g\n$$\n\n$$\n\\text{Output} = \\left[ \\text{head}_{1, 1} \\mathbin{\\Vert} \\dots \\mathbin{\\Vert} \\text{head}_{1, r} \\mathbin{\\Vert} \\dots \\mathbin{\\Vert} \\text{head}_{H_{KV}, r} \\right] \\mathbf{W}_O\n$$\n\n$$\n\\text{Memory Ratio} = \\frac{H_{KV}}{H_Q} = \\frac{1}{r}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $H_Q$: Total number of Query attention heads (e.g., 64 in Llama 3 70B).\n- $H_{KV}$: Total number of Key and Value attention heads (e.g., 8 in Llama 3 70B).\n- $r = H_Q / H_{KV}$: The head repetition ratio ($64 / 8 = 8$), meaning 8 query heads attend to the same key-value projection.\n- $\\mathbf{q}_{g, i} \\in \\mathbb{R}^{T \\times d_k}$: The $i$-th query head belonging to the $g$-th group.\n- $\\mathbf{k}_g, \\mathbf{v}_g \\in \\mathbb{R}^{S \\times d_k}$: The single key and value projection shared across all $r$ queries within group $g$.\n- $\\mathbin{\\Vert}$: Tensor concatenation along the head channel dimension.\n- KV Cache Memory Reduction: Exactly $\\frac{H_{KV}}{H_Q} = \\frac{8}{64} = 12.5\\%$ of the original MHA memory footprint.",
          "ar": "تلتفت رؤوس الاستعلام في المجموعة g إلى مساقط المفاتيح والقيم المشتركة k_g و v_g."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-grouped-query-attention-gqa",
          "starterCode": "import numpy as np\n\ndef repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    \"\"\"\n    Expands Key or Value tensor heads to match the number of Query heads in GQA.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, H_kv, S, D)\n        Key or Value tensor with reduced head count.\n    n_rep : int\n        Repetition factor (H_q // H_kv).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, H_kv * n_rep, S, D)\n        Expanded tensor broadcasted across query head groups.\n    \"\"\"\n    if n_rep == 1:\n        return x\n    \n    B, H_kv, S, D = x.shape\n    # 1. Insert a new axis for repetition: (B, H_kv, 1, S, D)\n    x_expanded = x[:, :, np.newaxis, :, :]\n    \n    # 2. Repeat along the new axis: (B, H_kv, n_rep, S, D)\n    x_repeated = np.repeat(x_expanded, n_rep, axis=2)\n    \n    # 3. Reshape back into unified head dimension: (B, H_kv * n_rep, S, D)\n    return x_repeated.reshape(B, H_kv * n_rep, S, D)\n\ndef grouped_query_attention(\n    q: np.ndarray,\n    k: np.ndarray,\n    v: np.ndarray,\n    w_o: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Computes Grouped-Query Attention forward pass.\n    q shape: (B, H_q, T, D)\n    k, v shape: (B, H_kv, S, D)\n    \"\"\"\n    B, H_q, T, D = q.shape\n    _, H_kv, S, _ = k.shape\n    assert H_q % H_kv == 0, \"Query heads must be an integer multiple of KV heads\"\n    \n    n_rep = H_q // H_kv\n    k_expanded = repeat_kv(k, n_rep)  # (B, H_q, S, D)\n    v_expanded = repeat_kv(v, n_rep)  # (B, H_q, S, D)\n    \n    scale = 1.0 / np.sqrt(D)\n    scores = np.matmul(q, k_expanded.swapaxes(-1, -2)) * scale\n    \n    # Softmax across key sequence dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # Context aggregation: (B, H_q, T, D)\n    context = np.matmul(weights, v_expanded)\n    \n    # Reshape and project to model dimension\n    context_merged = context.transpose(0, 2, 1, 3).reshape(B, T, H_q * D)\n    return np.dot(context_merged, w_o)",
          "testCases": [
            {
              "input": "x = np.ones((1, 2, 4, 8)); out = repeat_kv(x, 4); float(out.shape[1])",
              "expected": "8.0"
            },
            {
              "input": "x = np.ones((1, 4, 4, 8)); out = repeat_kv(x, 2); float(out.shape[1])",
              "expected": "8.0"
            }
          ],
          "expectedOutput": "8.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    \"\"\"\n    Expands Key or Value tensor heads to match the number of Query heads in GQA.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, H_kv, S, D)\n        Key or Value tensor with reduced head count.\n    n_rep : int\n        Repetition factor (H_q // H_kv).\n        \n    Returns\n    -------\n    np.ndarray of shape (B, H_kv * n_rep, S, D)\n        Expanded tensor broadcasted across query head groups.\n    \"\"\"\n    if n_rep == 1:\n        return x\n    \n    B, H_kv, S, D = x.shape\n    # 1. Insert a new axis for repetition: (B, H_kv, 1, S, D)\n    x_expanded = x[:, :, np.newaxis, :, :]\n    \n    # 2. Repeat along the new axis: (B, H_kv, n_rep, S, D)\n    x_repeated = np.repeat(x_expanded, n_rep, axis=2)\n    \n    # 3. Reshape back into unified head dimension: (B, H_kv * n_rep, S, D)\n    return x_repeated.reshape(B, H_kv * n_rep, S, D)\n\ndef grouped_query_attention(\n    q: np.ndarray,\n    k: np.ndarray,\n    v: np.ndarray,\n    w_o: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Computes Grouped-Query Attention forward pass.\n    q shape: (B, H_q, T, D)\n    k, v shape: (B, H_kv, S, D)\n    \"\"\"\n    B, H_q, T, D = q.shape\n    _, H_kv, S, _ = k.shape\n    assert H_q % H_kv == 0, \"Query heads must be an integer multiple of KV heads\"\n    \n    n_rep = H_q // H_kv\n    k_expanded = repeat_kv(k, n_rep)  # (B, H_q, S, D)\n    v_expanded = repeat_kv(v, n_rep)  # (B, H_q, S, D)\n    \n    scale = 1.0 / np.sqrt(D)\n    scores = np.matmul(q, k_expanded.swapaxes(-1, -2)) * scale\n    \n    # Softmax across key sequence dimension\n    scores_max = np.max(scores, axis=-1, keepdims=True)\n    exp_scores = np.exp(scores - scores_max)\n    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    \n    # Context aggregation: (B, H_q, T, D)\n    context = np.matmul(weights, v_expanded)\n    \n    # Reshape and project to model dimension\n    context_merged = context.transpose(0, 2, 1, 3).reshape(B, T, H_q * D)\n    return np.dot(context_merged, w_o)",
              "expectedOutput": "8.0"
            }
          },
          "solution": "import numpy as np\n\ndef repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    if n_rep == 1:\n        return x\n    B, H_kv, S, D = x.shape\n    x_exp = x[:, :, np.newaxis, :, :]\n    x_rep = np.repeat(x_exp, n_rep, axis=2)\n    return x_rep.reshape(B, H_kv * n_rep, S, D)"
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
            "en": "**Scenario:** In production benchmarking, LLaMA 3 70B (which utilizes GQA with 8 KV heads and 64 Query heads) achieves over $3.5\\times$ higher inference serving token throughput compared to an older architecture of identical parameter count using standard MHA (64 KV heads and 64 Query heads). Why does GQA produce such a dramatic throughput gain during token generation even though both models require approximately the same arithmetic FLOPs?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ انتباه الاستعلامات المجمعة (GQA) وانتباه الاستعلام المتعدد (MQA) تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "GQA compresses model weights on disk from FP16 to INT8 during cold startup.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The token generation phase of LLMs is heavily memory-bandwidth bound rather than compute bound; each step transfers model weights and the entire KV cache across GPU memory buses. By reducing the KV cache footprint by an $8\\times$ factor, GQA drastically diminishes high-bandwidth memory (HBM) data transfers per token, allowing the server to batch significantly more concurrent requests without memory bus saturation.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "GQA eliminates the need to compute positional encodings (RoPE) for key vectors.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "GQA uses integer matrix multiplications instead of floating-point arithmetic.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "en": "Traditional self-attention on modern GPUs is severely bottlenecked by Memory Bandwidth (IO), not arithmetic compute capability.",
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
          "en": "Traditional self-attention on modern GPUs is severely bottlenecked by **Memory Bandwidth (IO)**, not arithmetic compute capability. When computing standard attention:\n\n$$\n\\mathbf{O} = \\text{softmax}\\left(\\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d}}\\right) \\mathbf{V}\n$$\n\na standard implementation materializes the entire intermediate $N \\times N$ attention score matrix $\\mathbf{S} = \\mathbf{Q}\\mathbf{K}^T$ into slow High-Bandwidth Memory (HBM). For a long sequence of $N = 16\\,384$ tokens in FP16, this single matrix occupies over 500 megabytes per head! The GPU must repeatedly write $\\mathbf{S}$ to HBM, read it back to compute row-wise softmax normalizers, write the probabilities $\\mathbf{P}$ back to HBM, and read them again to multiply by $\\mathbf{V}$. The ultra-fast tensor compute cores spend the vast majority of their time idling, waiting for data to travel across the memory bus.\n\n**FlashAttention** (Dao et al., 2022, 2023) eliminates this bottleneck by making self-attention *IO-aware*. Modern GPUs possess a hierarchy of memory: massive but slow external HBM (80 GB at ~3 TB/s on H100) and tiny, blistering-fast on-chip Static RAM (SRAM, ~228 KB per streaming multiprocessor at ~33 TB/s). FlashAttention tiles $\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}$ into small blocks that fit entirely inside on-chip SRAM. Using **Online Softmax**, it computes exact attention incrementally in a single pass without ever materializing the $N \\times N$ matrix in HBM!\n\n> **Frontier Analogy:** Instead of writing out a giant 10,000-page accounting ledger in a slow basement filing cabinet and constantly walking back and forth to look up numbers, you keep only a single index card on your desk scratchpad (SRAM) and update running totals on the fly as numbers arrive.",
          "ar": "تعاني خوارزمية الانتباه الكلاسيكية في بطاقات الرسوميات من عنق زجاجة خانق في سرعة نقل الذاكرة (Memory Bandwidth IO) وليس في سرعة المعالجات الحسابية. فالنموذج يضطر إلى كتابة مصفوفة درجات الانتباه الضخمة $N \\times N$ في ذاكرة HBM البطيئة، ثم قراءتها لحساب دالة Softmax، ثم كتابتها وقراءتها مجدداً لضربها في مصفوفة القيم $\\mathbf{V}$. يقضي المعالج الرسومي معظم وقته في انتظار نقل البيانات عبر نواقل الذاكرة بدلاً من إجراء الحسابات الرياضية.\n\nأحدثت خوارزمية **FlashAttention** نقلة نوعية عبر جعل الحسابات متوافقة مع هرمية الذاكرة الفيزيائية: حيث تُقسِّم مصفوفات المدخلات إلى كتل صغيرة تلائم تماماً ذاكرة SRAM الداخلية فائقة السرعة الملحقة بأنوية المعالجة. ومن خلال ابتكار **خوارزمية Softmax اللحظية (Online Softmax)**، تقوم الخوارزمية بحساب نواتج الانتباه بدقة رياضية مطلقة وتدريجية في مسار واحد ودون الحاجة إطلاقاً إلى حفظ مصفوفة الانتباه الكلية $N \\times N$ في ذاكرة البطاقة الرئيسية!"
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
          "en": "$$\n\\alpha = \\exp\\left(m_{\\text{prev}} - m_{\\text{new}}\\right), \\quad P_{\\text{block}} = \\exp\\left(S_{\\text{block}} - m_{\\text{new}}\\right)\n$$\n\n$$\nl_{\\text{new}} = \\alpha \\cdot l_{\\text{prev}} + \\sum_{\\text{cols}} P_{\\text{block}}\n$$\n\n$$\nO_{\\text{new}} = \\alpha \\cdot O_{\\text{prev}} + P_{\\text{block}} V_{\\text{block}}, \\quad \\text{Final Output: } O = \\frac{O_{\\text{final}}}{l_{\\text{final}}}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $S_{\\text{block}} \\in \\mathbb{R}^{B_r \\times B_c}$: Attention score tile computed in fast SRAM between query block $Q_i$ and key block $K_j$.\n- $m_{\\text{prev}}, m_{\\text{new}} \\in \\mathbb{R}^{B_r \\times 1}$: Row-wise running maximum values across past blocks and the new block.\n- $\\alpha = \\exp(m_{\\text{prev}} - m_{\\text{new}}) \\in (0, 1]$: Dynamic correction scaling factor. When a higher maximum is discovered, past unnormalized sums are scaled down by $\\alpha$ to preserve exact mathematical equality!\n- $l_{\\text{prev}}, l_{\\text{new}} \\in \\mathbb{R}^{B_r \\times 1}$: Running accumulated denominator (sum of exponentials).\n- $O_{\\text{prev}}, O_{\\text{new}} \\in \\mathbb{R}^{B_r \\times d}$: Running accumulated numerator of the attention output.\n- Memory IO Complexity: Reduced from $\\mathcal{O}(N^2)$ HBM memory accesses down to $\\mathcal{O}(N \\cdot d)$, unlocking $3\\times$ to $5\\times$ wall-clock speedups.",
          "ar": "عند اكتشاف قيمة عظمى أكبر للكتلة، يُعاد قياس التراكمات السابقة بضربها في alpha = exp(m_prev - m_new)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-flashattention-tiling-online-softmax",
          "starterCode": "def online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single FlashAttention online softmax update step for a block.\n    \n    Parameters\n    ----------\n    m_prev : np.ndarray of shape (B_r, 1)\n        Previous running row maximums.\n    l_prev : np.ndarray of shape (B_r, 1)\n        Previous running row normalizers (sum of exp).\n    O_prev : np.ndarray of shape (B_r, d)\n        Previous unnormalized output accumulator.\n    S_block : np.ndarray of shape (B_r, B_c)\n        Current score block Q_i @ K_j^T / sqrt(d).\n    V_block : np.ndarray of shape (B_c, d)\n        Current value block.\n        \n    Returns\n    -------\n    m_new, l_new, O_new : tuple of np.ndarray\n        Updated running maximums, normalizers, and accumulators.\n    \"\"\"\n    # 1. Compute maximum of current score block\n    # 2. Compute dynamic rescale factor alpha\n    # 3. Exponentiate scores with new maximum subtracted\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "m = np.array([[-np.inf]]); l = np.array([[0.0]]); O = np.array([[0.0, 0.0]]); S = np.array([[1.0, 2.0]]); V = np.array([[1.0, 0.0], [0.0, 1.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(m_n[0,0])",
              "expected": "2.0"
            },
            {
              "input": "m = np.array([[0.0]]); l = np.array([[1.0]]); O = np.array([[1.0, 1.0]]); S = np.array([[0.0]]); V = np.array([[2.0, 2.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(l_n[0,0])",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "2.0",
          "variants": {
            "python": {
              "starterCode": "def online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single FlashAttention online softmax update step for a block.\n    \n    Parameters\n    ----------\n    m_prev : np.ndarray of shape (B_r, 1)\n        Previous running row maximums.\n    l_prev : np.ndarray of shape (B_r, 1)\n        Previous running row normalizers (sum of exp).\n    O_prev : np.ndarray of shape (B_r, d)\n        Previous unnormalized output accumulator.\n    S_block : np.ndarray of shape (B_r, B_c)\n        Current score block Q_i @ K_j^T / sqrt(d).\n    V_block : np.ndarray of shape (B_c, d)\n        Current value block.\n        \n    Returns\n    -------\n    m_new, l_new, O_new : tuple of np.ndarray\n        Updated running maximums, normalizers, and accumulators.\n    \"\"\"\n    # 1. Compute maximum of current score block\n    # 2. Compute dynamic rescale factor alpha\n    # 3. Exponentiate scores with new maximum subtracted\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.0"
            }
          },
          "solution": "import numpy as np\n\ndef online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Executes a single FlashAttention online softmax update step for a block.\n    \n    Parameters\n    ----------\n    m_prev : np.ndarray of shape (B_r, 1)\n        Previous running row maximums.\n    l_prev : np.ndarray of shape (B_r, 1)\n        Previous running row normalizers (sum of exp).\n    O_prev : np.ndarray of shape (B_r, d)\n        Previous unnormalized output accumulator.\n    S_block : np.ndarray of shape (B_r, B_c)\n        Current score block Q_i @ K_j^T / sqrt(d).\n    V_block : np.ndarray of shape (B_c, d)\n        Current value block.\n        \n    Returns\n    -------\n    m_new, l_new, O_new : tuple of np.ndarray\n        Updated running maximums, normalizers, and accumulators.\n    \"\"\"\n    # 1. Compute maximum of current score block\n    m_block = np.max(S_block, axis=-1, keepdims=True)\n    m_new = np.maximum(m_prev, m_block)\n    \n    # 2. Compute dynamic rescale factor alpha\n    alpha = np.exp(m_prev - m_new)\n    \n    # 3. Exponentiate scores with new maximum subtracted\n    P_block = np.exp(S_block - m_new)\n    \n    # 4. Rescale and accumulate denominator l\n    l_new = alpha * l_prev + np.sum(P_block, axis=-1, keepdims=True)\n    \n    # 5. Rescale and accumulate unnormalized output O\n    O_new = alpha * O_prev + np.matmul(P_block, V_block)\n    \n    return m_new, l_new, O_new"
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
            "en": "**Scenario:** In training modern frontier models, the backward pass of FlashAttention-2 achieves superior speed compared to standard attention by purposefully **recomputing** the attention scores $\\mathbf{S} = \\mathbf{Q}\\mathbf{K}^T$ from saved blocks of $\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}$ during backpropagation, rather than caching the $N \\times N$ forward attention matrix in GPU memory. Why is intentional recomputation faster on modern accelerators?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية FlashAttention: التقطيع المتوافق مع الإدخال والإخراج وSoftmax اللحظية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Forward attention matrices contain negative eigenvalues that cannot be preserved in IEEE floating point format.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "On modern GPUs (like NVIDIA H100), compute throughput (FLOPs) is extraordinarily cheap and fast, while memory bandwidth (reading/writing to HBM) is scarce and slow. Storing and reading the $\\mathcal{O}(N^2)$ attention matrix from HBM in the backward pass chokes the memory bus. Recomputing the attention scores on the fly directly inside SRAM requires zero HBM writes, replacing slow memory stalls with high-speed tensor core math.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Recomputation enables skipping backpropagation through feedforward layers.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Gradient descent requires resetting all attention weights to zero after every forward pass.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "en": "In the classic Transformer architecture (Vaswani et al., 2017) and early GPT models, the feedforward network (FFN) comprised two linear...",
      "ar": "في معمارية المحولات الكلاسيكية ونماذج GPT المبكرة، كانت شبكة التغذية الأمامية (FFN) تتكون من طبقتين خطيتين بسيطتين تتوسطهما دالة تنشيط..."
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
          "en": "In the classic Transformer architecture (Vaswani et al., 2017) and early GPT models, the feedforward network (FFN) comprised two linear transformations separated by a standard non-linear activation (historically ReLU or GELU):\n\n$$\n\\text{FFN}(x) = \\text{GELU}(x \\mathbf{W}_1 + \\mathbf{b}_1) \\mathbf{W}_2 + \\mathbf{b}_2\n$$\n\nWhile computationally straightforward, standard activations treat every channel independently via static thresholding. In 2020, Noam Shazeer published *\"GLU Variants Improve Transformer\"*, introducing **SwiGLU (Swish Gated Linear Unit)**. Today, SwiGLU has become the universal standard across modern frontier backbones (LLaMA, PaLM, Mistral, Gemma, DeepSeek).\n\nSwiGLU replaces the simple non-linear layer with a bilinear gating mechanism: the input representation is simultaneously projected into *two* separate linear pathways—a **Gate** projection and an **Up** projection. The Gate path is passed through the smooth, non-monotonic Swish (SiLU) activation function and element-wise multiplied by the Up path. This enables the network to dynamically modulate, scale, or suppress specific features based on contextual relevance before projecting back down.\n\n> **Frontier Analogy:** Think of a precision industrial mixer valve. The Gate branch acts as an ultra-sensitive valve handle that smoothly regulates the volume and flow rate of water passing through the main pipe (the Up branch), allowing fine-grained control before the stream exits the faucet (the Down projection).",
          "ar": "في معمارية المحولات الكلاسيكية ونماذج GPT المبكرة، كانت شبكة التغذية الأمامية (FFN) تتكون من طبقتين خطيتين بسيطتين تتوسطهما دالة تنشيط تقليدية مثل ReLU أو GELU. ورغم بساطة هذا التركيب، إلا أنه يفتقر إلى القدرة على التصفية الديناميكية للمعلومات.\n\nأحدثت ورقة نعوم شازير (2020) ثورة بإدخال معمارية **SwiGLU**، والتي أصبحت المعيار القياسي المعتمد في جميع النماذج الرائدة مثل LLaMA وMistral وGemma. تستبدل SwiGLU التنشيط الأحادي بآلية بوابات ثنائية الخطية: حيث يُسقط المدخل على مسارين متوازيين في وقت واحد — مسار **البوابة (Gate)** ومسار **الرفع (Up)**. يمر مسار البوابة عبر دالة Swish/SiLU السلسة غير الرتيبة، ثم يُضرب عنصرياً في مسار الرفع. يمنح هذا الشبكة العصبية قدرة استثنائية على ترشيح الإشارات وحجب الضوضاء وتمرير الأنماط الدلالية الهامة فقط إلى طبقة الإسقاط السفلي."
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
          "en": "$$\n\\text{Swish}(\\mathbf{z}) = \\mathbf{z} \\cdot \\sigma(\\mathbf{z}) = \\frac{\\mathbf{z}}{1 + e^{-\\mathbf{z}}}\n$$\n\n$$\nd_{\\text{ffn}} \\approx \\left\\lfloor \\frac{8}{3} d_{\\text{model}} \\right\\rfloor \\quad \\text{(Parameter Parity Invariant)}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $\\mathbf{x} \\in \\mathbb{R}^{B \\times T \\times d}$: Input hidden state tensor of batch size $B$, sequence length $T$, and model dimension $d$.\n- $\\mathbf{W}_{\\text{gate}} \\in \\mathbb{R}^{d \\times d_{\\text{ffn}}}$: Weight matrix generating the continuous gating signal.\n- $\\mathbf{W}_{\\text{up}} \\in \\mathbb{R}^{d \\times d_{\\text{ffn}}}$: Weight matrix projecting the feature representation into the expanded intermediate space.\n- $\\mathbf{W}_{\\text{down}} \\in \\mathbb{R}^{d_{\\text{ffn}} \\times d}$: Weight matrix projecting the gated representation back to model dimension $d$.\n- $\\odot$: Hadamard (element-wise) product creating multiplicative bilinear interactions.\n- Intermediate Dimension $d_{\\text{ffn}} \\approx \\frac{8}{3} d$: Because SwiGLU employs three weight matrices instead of the two matrices in a standard $4d$ FFN, setting $d_{\\text{ffn}} = \\frac{8}{3} d$ preserves the exact same total parameter budget and FLOP count ($3 \\times \\frac{8}{3}d = 8d = 2 \\times 4d$).",
          "ar": "نظراً لأن SwiGLU تستخدم 3 مصفوفات أوزان بدلاً من اثنتين، فإن ضبط d_ffn = 8/3 * d يحفظ تماثل المعاملات مع FFN القياسي ذي البعد 4d."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-swiglu-feedforward-activation",
          "starterCode": "import numpy as np\n\ndef swish(z: np.ndarray) -> np.ndarray:\n    \"\"\"Computes the Swish / SiLU activation function: z * sigmoid(z).\"\"\"\n    # Numerically clipped sigmoid to prevent overflow\n    sig = 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n    return z * sig\n\ndef swiglu_forward(\n    x: np.ndarray,\n    W_gate: np.ndarray,\n    W_up: np.ndarray,\n    W_down: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Executes a SwiGLU Gated Feedforward Network forward pass.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, T, D)\n        Input hidden states.\n    W_gate : np.ndarray of shape (D, D_ffn)\n        Gating projection matrix.\n    W_up : np.ndarray of shape (D, D_ffn)\n        Up-projection matrix.\n    W_down : np.ndarray of shape (D_ffn, D)\n        Down-projection matrix.\n        \n    Returns\n    -------\n    np.ndarray of shape (B, T, D)\n        Output hidden states after gated feedforward transformation.\n    \"\"\"\n    # 1. Project through the gate branch and apply Swish activation\n    gate_proj = np.dot(x, W_gate)\n    activated_gate = swish(gate_proj)\n    \n    # 2. Project through the up branch\n    up_proj = np.dot(x, W_up)\n    \n    # 3. Bilinear element-wise multiplication\n    gated_features = activated_gate * up_proj\n    \n    # 4. Project back down to model dimension\n    output = np.dot(gated_features, W_down)\n    return output",
          "testCases": [
            {
              "input": "x = np.ones((1, 2, 4)); Wg = np.zeros((4, 8)); Wu = np.ones((4, 8)); Wd = np.ones((8, 4)); out = swiglu_forward(x, Wg, Wu, Wd); float(np.sum(out))",
              "expected": "0.0"
            },
            {
              "input": "x = np.ones((1, 1, 2)); Wg = np.ones((2, 2)); Wu = np.ones((2, 2)); Wd = np.eye(2); out = swiglu_forward(x, Wg, Wu, Wd); float(out.shape[-1])",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef swish(z: np.ndarray) -> np.ndarray:\n    \"\"\"Computes the Swish / SiLU activation function: z * sigmoid(z).\"\"\"\n    # Numerically clipped sigmoid to prevent overflow\n    sig = 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n    return z * sig\n\ndef swiglu_forward(\n    x: np.ndarray,\n    W_gate: np.ndarray,\n    W_up: np.ndarray,\n    W_down: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Executes a SwiGLU Gated Feedforward Network forward pass.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (B, T, D)\n        Input hidden states.\n    W_gate : np.ndarray of shape (D, D_ffn)\n        Gating projection matrix.\n    W_up : np.ndarray of shape (D, D_ffn)\n        Up-projection matrix.\n    W_down : np.ndarray of shape (D_ffn, D)\n        Down-projection matrix.\n        \n    Returns\n    -------\n    np.ndarray of shape (B, T, D)\n        Output hidden states after gated feedforward transformation.\n    \"\"\"\n    # 1. Project through the gate branch and apply Swish activation\n    gate_proj = np.dot(x, W_gate)\n    activated_gate = swish(gate_proj)\n    \n    # 2. Project through the up branch\n    up_proj = np.dot(x, W_up)\n    \n    # 3. Bilinear element-wise multiplication\n    gated_features = activated_gate * up_proj\n    \n    # 4. Project back down to model dimension\n    output = np.dot(gated_features, W_down)\n    return output",
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
            "en": "**Scenario:** An architect designing a new 8B parameter foundation model chooses SwiGLU over GELU for the feedforward blocks. In their initial configuration file, they specify the intermediate dimension as $d_{\\text{ffn}} = 4 \\times d_{\\text{model}}$ (the classic setting used in GPT-3). What is the computational consequence of this configuration, and what adjustment should be made?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ شبكات التغذية الأمامية ذات البوابات والتنشيط السلس SwiGLU تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "SwiGLU will fail to converge because odd matrix dimensions cause division-by-zero errors in the Swish activation function.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because SwiGLU introduces three projection matrices ($\\mathbf{W}_{\\text{gate}}, \\mathbf{W}_{\\text{up}}, \\mathbf{W}_{\\text{down}}$) instead of two ($\\mathbf{W}_1, \\mathbf{W}_2$), setting $d_{\\text{ffn}} = 4d$ increases total FFN parameters and compute by $50\\%$ (from $8d^2$ to $12d^2$); to maintain parameter and FLOP parity with a classic $4d$ FFN, $d_{\\text{ffn}}$ must be scaled to $\\approx \\frac{8}{3}d_{\\text{model}}$ (often rounded to the nearest multiple of 256 for optimal GPU tensor core alignment).",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The Gate projection will completely cancel out the Up projection due to negative eigenvalues.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "SwiGLU requires doubling the batch size to stabilize gradients during backpropagation.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "en": "As foundation models expanded from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT)—updating every single...",
      "ar": "مع تضخم النماذج اللغوية التأسيسية إلى مئات المليارات من المعاملات، أصبح \"الضبط الدقيق الكامل\" (Full Fine-Tuning) مستحيلاً اقتصادياً..."
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
          "en": "As foundation models expanded from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT)—updating every single weight matrix across the network—became computationally and logistically prohibitive. Fine-tuning a 70B parameter model in FP16 precision requires:\n- **140 GB** to store model weights\n- **140 GB** for backward-pass activation gradients\n- **560 GB** for AdamW first and second optimizer momentum states ($m_t, v_t$)\n\nThat amounts to nearly **1 Terabyte of GPU VRAM** just to train a single specialized model! Furthermore, serving distinct fine-tuned checkpoints for 1,000 enterprise customers would require storing 1,000 independent 140 GB weights files (140 Terabytes of cold storage).\n\nIn 2021, Edward Hu et al. introduced **Low-Rank Adaptation (LoRA)** based on a profound empirical insight: during domain-specific adaptation, the weight update delta matrix $\\Delta \\mathbf{W}$ possesses a remarkably low **intrinsic rank** ($r \\ll \\min(d, k)$). Instead of updating the massive original weight matrix $\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k}$, LoRA freezes $\\mathbf{W}_0$ entirely and decomposes the delta update into the product of two compact low-rank matrices: $\\mathbf{B} \\in \\mathbb{R}^{d \\times r}$ and $\\mathbf{A} \\in \\mathbb{R}^{r \\times k}$. Setting $r = 8$ or $16$ slashes trainable parameters and optimizer memory by over **99.8%**, while matching or exceeding full fine-tuning performance.\n\n> **Frontier Analogy:** LoRA is like tweaking small dials rather than rebuilding the entire engine. Instead of casting a whole new engine block from molten steel every time you want to tune a car for a new race track, you simply leave the massive engine block intact and adjust a few specialized fine-tuning knobs on the dashboard.",
          "ar": "مع تضخم النماذج اللغوية التأسيسية إلى مئات المليارات من المعاملات، أصبح \"الضبط الدقيق الكامل\" (Full Fine-Tuning) مستحيلاً اقتصادياً ولوجستياً. فضبط نموذج بحجم 70 مليار معامل يتطلب أكثر من 840 غيغابايت من ذاكرة البطاقات الرسومية لتخزين التدرجات وحالات المحسّن (AdamW)، فضلاً عن صعوبة استضافة نسخ مخصصة لآلاف المستخدمين.\n\nأثبت باحثو **التكيف منخفض الرتبة (LoRA)** أن التعديلات الرياضية التي تطرأ على أوزان النموذج أثناء التخصيص تمتلك \"رتبة جوهرية منخفضة للغاية\" ($r \\ll d$). تقوم تقنية LoRA بتجميد أوزان النموذج التأسيسي $\\mathbf{W}_0$ بالكامل، وتفكيك موتر التعديل إلى حاصل ضرب مصفوفتين صغيرتين: $\\Delta \\mathbf{W} = \\frac{\\alpha}{r} \\mathbf{B}\\mathbf{A}$.\n\nتقنية LoRA تشبه تعديل مقابض ضبط دقيقة صغيرة في لوحة التحكم بدلاً من تفكيك وإعادة بناء محرك الطائرة بالكامل! وبفضل بدء تدريب المصفوفة $\\mathbf{B}$ بقيم صفرية، ينطلق التدريب بدقة تامة من أداء النموذج الأساسي، بينما يتيح دمج الأوزان خطياً أثناء الاستدلال التخلص التام من أي تأخير زمني في بيئات الإنتاج."
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
          "en": "$$\n\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k} \\text{ (Frozen)}, \\quad \\mathbf{B} \\in \\mathbb{R}^{d \\times r} \\text{ (Init: 0)}, \\quad \\mathbf{A} \\in \\mathbb{R}^{r \\times k} \\text{ (Init: } \\mathcal{N}(0, \\sigma^2)\\text{)}\n$$\n\n$$\n\\mathbf{W}_{\\text{serving}} = \\mathbf{W}_0 + \\frac{\\alpha}{r} \\mathbf{B} \\mathbf{A} \\quad \\text{(Zero Latency Weight Folding)}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k}$: Pretrained frozen foundation model weight matrix. Gradients $\\nabla_{\\mathbf{W}_0} \\mathcal{L}$ are never computed or allocated in VRAM.\n- $r$: Intrinsic rank hyperparameter, where $r \\ll \\min(d, k)$ (typically $r \\in \\{4, 8, 16, 64\\}$).\n- $\\mathbf{A} \\in \\mathbb{R}^{r \\times k}$: Down-projection adapter initialized randomly with zero-mean Gaussian distribution $\\mathcal{N}(0, \\sigma^2)$.\n- $\\mathbf{B} \\in \\mathbb{R}^{d \\times r}$: Up-projection adapter initialized strictly to zero, ensuring $\\Delta \\mathbf{W} = \\mathbf{B}\\mathbf{A} = \\mathbf{0}$ at step zero.\n- $\\alpha$: LoRA scaling constant; the multiplier $\\frac{\\alpha}{r}$ keeps learning dynamics and gradient norms invariant when experimenting across different rank values $r$.\n- Parameter count: Dropped from $d \\cdot k$ down to $r(d + k)$. For $d=k=4096$ and $r=8$, parameters shrink from 16,777,216 to 65,536 (a **99.6%** reduction).",
          "ar": "يضمن بدء المصفوفة B بقيم صفرية انطلاق التدريب بدقة تامة من أداء النموذج الأساسي."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-lora-low-rank-adaptation",
          "starterCode": "import numpy as np\n\nclass LoRALinear:\n    \"\"\"\n    Low-Rank Adaptation (LoRA) Linear Layer with weight merge and unmerge capabilities.\n    \"\"\"\n    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0):\n        self.in_features = in_features\n        self.out_features = out_features\n        self.rank = rank\n        self.alpha = alpha\n        self.scaling = alpha / rank\n        \n        # Frozen base weights (simulated)\n        self.W_0 = np.random.randn(out_features, in_features) * 0.02\n        \n        # Trainable low-rank adapter matrices\n        # Matrix A initialized randomly from Gaussian\n        self.A = np.random.randn(rank, in_features) * 0.02\n        # Matrix B initialized to zero\n        self.B = np.zeros((out_features, rank))\n        \n        self.merged = False\n\n    def forward(self, x: np.ndarray) -> np.ndarray:\n        \"\"\"\n        Forward pass computing base projection + scaled LoRA adapter delta.\n        x shape: (..., in_features)\n        \"\"\"\n        if self.merged:\n            return np.dot(x, self.W_0.T)\n        \n        # Base forward pass\n        base_out = np.dot(x, self.W_0.T)\n        \n        # LoRA adapter forward pass: x @ A^T @ B^T * scaling\n        # (x @ A.T) has shape (..., rank)\n        lora_intermediate = np.dot(x, self.A.T)\n        lora_out = np.dot(lora_intermediate, self.B.T) * self.scaling\n        \n        return base_out + lora_out\n\n    def merge_weights(self):\n        \"\"\"Folds (B @ A) * scaling directly into W_0 for zero-latency inference.\"\"\"\n        if not self.merged:\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W_0 += delta_w\n            self.merged = True\n\n    def unmerge_weights(self):\n        \"\"\"Subtracts adapter weights from W_0 to allow resumed training.\"\"\"\n        if self.merged:\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W_0 -= delta_w\n            self.merged = False",
          "testCases": [
            {
              "input": "layer = LoRALinear(4, 4, rank=2, alpha=2.0); x = np.ones((1, 4)); out_unmerged = layer.forward(x); layer.merge_weights(); out_merged = layer.forward(x); float(np.allclose(out_unmerged, out_merged))",
              "expected": "1.0"
            },
            {
              "input": "layer = LoRALinear(4, 4, rank=2, alpha=2.0); float(layer.rank)",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\nclass LoRALinear:\n    \"\"\"\n    Low-Rank Adaptation (LoRA) Linear Layer with weight merge and unmerge capabilities.\n    \"\"\"\n    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0):\n        self.in_features = in_features\n        self.out_features = out_features\n        self.rank = rank\n        self.alpha = alpha\n        self.scaling = alpha / rank\n        \n        # Frozen base weights (simulated)\n        self.W_0 = np.random.randn(out_features, in_features) * 0.02\n        \n        # Trainable low-rank adapter matrices\n        # Matrix A initialized randomly from Gaussian\n        self.A = np.random.randn(rank, in_features) * 0.02\n        # Matrix B initialized to zero\n        self.B = np.zeros((out_features, rank))\n        \n        self.merged = False\n\n    def forward(self, x: np.ndarray) -> np.ndarray:\n        \"\"\"\n        Forward pass computing base projection + scaled LoRA adapter delta.\n        x shape: (..., in_features)\n        \"\"\"\n        if self.merged:\n            return np.dot(x, self.W_0.T)\n        \n        # Base forward pass\n        base_out = np.dot(x, self.W_0.T)\n        \n        # LoRA adapter forward pass: x @ A^T @ B^T * scaling\n        # (x @ A.T) has shape (..., rank)\n        lora_intermediate = np.dot(x, self.A.T)\n        lora_out = np.dot(lora_intermediate, self.B.T) * self.scaling\n        \n        return base_out + lora_out\n\n    def merge_weights(self):\n        \"\"\"Folds (B @ A) * scaling directly into W_0 for zero-latency inference.\"\"\"\n        if not self.merged:\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W_0 += delta_w\n            self.merged = True\n\n    def unmerge_weights(self):\n        \"\"\"Subtracts adapter weights from W_0 to allow resumed training.\"\"\"\n        if self.merged:\n            delta_w = np.dot(self.B, self.A) * self.scaling\n            self.W_0 -= delta_w\n            self.merged = False",
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
            "en": "**Scenario:** An enterprise AI platform hosts 200 custom tenant fine-tuned models derived from LLaMA 3 70B. To minimize deployment costs, the team wants to serve all 200 tenants concurrently from an 8x H100 GPU cluster. What is the optimal architecture to achieve high throughput and minimal latency?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التكيف منخفض الرتبة (LoRA) والضبط الدقيق عالي الكفاءة في المعاملات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Pre-merge all 200 LoRA weights into 200 full 70B model replicas and allocate one GPU per replica using round-robin scheduling.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Load a single shared copy of the frozen 70B foundation model in GPU memory; store the 200 lightweight LoRA adapters in CPU RAM or NVMe (at only ~50 MB per adapter). During batched inference, use dynamic multi-LoRA kernels (such as S-LoRA or Punica) that gather tenant-specific $\\mathbf{B}_k \\mathbf{A}_k$ adapter passes on the fly for active tokens in the batch, eliminating 140 Terabytes of redundant base weight duplication.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Train a distillation network to collapse all 200 adapters into a single 1-billion parameter model.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Quantize the base model to 1-bit and merge all 200 adapters simultaneously into the same floating-point weight matrix.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
      "en": "While LoRA eliminated optimizer memory by training low-rank adapter matrices, fine-tuning massive models still required holding the frozen...",
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
          "en": "While LoRA eliminated optimizer memory by training low-rank adapter matrices, fine-tuning massive models still required holding the frozen foundation model in 16-bit precision: hosting a 70B parameter model in FP16 demands at least **140 Gigabytes of VRAM** just for base weights, requiring multiple high-end enterprise GPUs ($2\\times \\text{A100 } 80\\text{GB}$).\n\nIn 2023, Tim Dettmers et al. introduced **QLoRA (Quantized Low-Rank Adaptation)**, an algorithmic breakthrough that democratized frontier model fine-tuning. QLoRA enables fine-tuning a 70B model on a single 48 GB GPU, or a 13B model on a consumer 24 GB GPU, with zero loss in fine-tuning accuracy.\n\nThe mathematical core of QLoRA is **NormalFloat4 (NF4)** quantization. Pretrained neural network weights follow a bell-shaped Gaussian distribution $\\mathcal{N}(0, \\sigma^2)$. Standard uniform quantization (INT4) divides the dynamic range into evenly spaced intervals, which wastes precious bit representation on improbable extreme outliers while heavily rounding values clustered densely near zero. NF4 constructs an information-theoretically optimal quantile codebook where each of the 16 quantization bins holds an **exact equal probability mass** under a standard normal distribution!\n\nCoupled with **Double Quantization** (quantizing the 32-bit quantization constants down to 8-bit FP8, saving 0.37 bits per parameter) and Paged Optimizers, the base model resides in 4-bit storage and is dequantized on the fly into 16-bit registers only during active matrix multiplication.\n\n> **Frontier Analogy:** Think of vacuum-compression packing bags for winter coats. Instead of buying a massive storage warehouse (16-bit VRAM), you compress dense coats into airtight 4-bit packages. You only unpack them momentarily onto your workbench (SRAM registers) during use, while recording all your custom alterations (LoRA adapters) in high-resolution gold leaf.",
          "ar": "بينما نجحت تقنية LoRA في خفض ذاكرة المحسّن عبر تدريب مصفوفات منخفضة الرتبة، إلا أن تحميل النموذج الأساسي (70 مليار معامل) بدقة 16-بت كان يستهلك وحده ما لا يقل عن 140 غيغابايت من ذاكرة البطاقات الرسومية، مما قصر تدريب النماذج على مراكز البيانات الفائقة.\n\nحطمت خوارزمية **QLoRA** (2023) هذا الحاجز عبر ابتكار تكميم **NormalFloat4 (NF4)** رباعي البتات. ونظراً لأن أوزان الشبكات العصبية المدربة تتبع توزيعاً غاوسياً طبيعياً، فإن التكميم الخطي المنتظم التقليدي (INT4) يهدر الدقة الرقمية على القيم المتطرفة النادرة. تقوم شبكة NF4 ببناء فترات احتمالية متساوية الكثافة مطابقة بدقة رياضية للتوزيع الطبيعي!\n\nومع تقنية **التكميم المزدوج (Double Quantization)** لمعاملات القياس واستخدام المحسّنات المقسمة، يُحفظ النموذج الأساسي في ذاكرة 4-بت متناهية الصغر، ويُعاد فك تكميمه لحظياً في سجلات المعالج أثناء الضرب المصفوفي، بينما تتدفق تدرجات التدريب بالكامل عبر مصفوفات LoRA عالية الدقة (16-بت)."
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
          "en": "$$\n\\hat{w}_i = s \\cdot c_{q_i}, \\quad s = \\frac{\\max(|w|)}{c_{\\max}}\n$$\n\n$$\ns_1 = s_2 \\cdot c_{q_{s_1}}^{\\text{FP8}} \\quad \\text{(Double Quantization: saves } 0.37 \\text{ bits/param)}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $w_i$: Continuous high-precision weight in a block of size $B$ (typically $B=64$).\n- $s$: First-level block scaling factor mapping block weights into the codebook range $[-1, 1]$.\n- $\\mathcal{C}_{\\text{NF4}} = \\{c_0, c_1, \\dots, c_{15}\\}$: The 16 optimal NF4 centroids derived by evaluating the inverse cumulative distribution function $q_i = \\frac{1}{2}\\left(Q_X\\left(\\frac{i}{2^k}\\right) + Q_X\\left(\\frac{i+1}{2^k}\\right)\\right)$ for $2^k=16$ intervals.\n- $q_i \\in \\{0, \\dots, 15\\}$: 4-bit integer index stored in GPU memory (two weights packed per byte).\n- $\\hat{w}_i$: Dequantized weight reconstructed in register memory during forward and backward passes: $\\mathbf{Y} = \\mathbf{X} \\cdot \\text{Dequantize}(\\mathbf{W}^{\\text{NF4}}) + \\frac{\\alpha}{r} \\mathbf{X} \\mathbf{A}^T \\mathbf{B}^T$.",
          "ar": "تمثل مراكز NF4 الستة عشر فترات احتمالية متساوية الكثافة تحت التوزيع الطبيعي القياسي N(0, 1)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-qlora-quantized-fine-tuning",
          "starterCode": "def get_nf4_codebook() -> np.ndarray:\n    \"\"\"\n    Returns the exact 16 NormalFloat4 (NF4) codebook centroids \n    derived from quantiles of the standard normal distribution N(0, 1).\n    \"\"\"\n    # Normalize weights into [-1, 1]\n    # Vectorized nearest-neighbor search across 16 codebook values\n    # w_norm[:, None] has shape (B, 1), codebook[None, :] has shape (1, 16)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "cb = get_nf4_codebook(); w = np.array([0.0, 1.0, -1.0]); q, s = nf4_quantize_block(w, cb); float(s)",
              "expected": "1.0"
            },
            {
              "input": "cb = get_nf4_codebook(); float(len(cb))",
              "expected": "16.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def get_nf4_codebook() -> np.ndarray:\n    \"\"\"\n    Returns the exact 16 NormalFloat4 (NF4) codebook centroids \n    derived from quantiles of the standard normal distribution N(0, 1).\n    \"\"\"\n    # Normalize weights into [-1, 1]\n    # Vectorized nearest-neighbor search across 16 codebook values\n    # w_norm[:, None] has shape (B, 1), codebook[None, :] has shape (1, 16)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef get_nf4_codebook() -> np.ndarray:\n    \"\"\"\n    Returns the exact 16 NormalFloat4 (NF4) codebook centroids \n    derived from quantiles of the standard normal distribution N(0, 1).\n    \"\"\"\n    return np.array([\n        -1.0, -0.6961928009986877, -0.5250730514526367, -0.39491748809814453,\n        -0.28444138169288635, -0.18477343022823334, -0.09105003625154495, 0.0,\n        0.07958029955625534, 0.16093020141124725, 0.24611230194568634, 0.33791524171829224,\n        0.44070982933044434, 0.5626170039176941, 0.7229568362236023, 1.0\n    ], dtype=np.float32)\n\ndef nf4_quantize_block(w: np.ndarray, codebook: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Quantizes a 1D block of weights into 4-bit NF4 indices.\n    \n    Parameters\n    ----------\n    w : np.ndarray of shape (B,)\n        Original floating point weights (typically block size 64).\n    codebook : np.ndarray of shape (16,)\n        NF4 quantiles.\n        \n    Returns\n    -------\n    quantized_indices : np.ndarray of shape (B,)\n        4-bit integer indices into the codebook.\n    scale : float\n        Normalization scale factor.\n    \"\"\"\n    abs_max = float(np.max(np.abs(w)))\n    scale = abs_max if abs_max > 1e-8 else 1.0\n    \n    # Normalize weights into [-1, 1]\n    w_norm = w / scale\n    \n    # Vectorized nearest-neighbor search across 16 codebook values\n    # w_norm[:, None] has shape (B, 1), codebook[None, :] has shape (1, 16)\n    distances = np.abs(w_norm[:, np.newaxis] - codebook[np.newaxis, :])\n    quantized_indices = np.argmin(distances, axis=-1)\n    \n    return quantized_indices, scale\n\ndef nf4_dequantize_block(indices: np.ndarray, scale: float, codebook: np.ndarray) -> np.ndarray:\n    \"\"\"Dequantizes 4-bit indices back to floating point values.\"\"\"\n    return codebook[indices] * scale"
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
            "en": "**Scenario:** During a fine-tuning run using QLoRA on a 70B parameter model, a junior researcher asks: *\"Since the base model weights are quantized into 4-bit integers, why don't we calculate gradients with respect to the 4-bit weights and update the base model directly?\"* What is the fundamental theoretical and mathematical barrier that prevents this?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ خوارزمية QLoRA: التكميم العائم الطبيعي 4-بت (NF4) والتكميم المزدوج تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Integer values cannot be divided by the learning rate during SGD updates.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The quantization mapping $q(w) = \\text{argmin}_c |w - c|$ is a piecewise step function whose mathematical derivative is zero almost everywhere and undefined at step boundaries; backpropagating through discrete 4-bit steps yields zero gradients ($\\nabla_w q(w) = 0$). QLoRA solves this by keeping base weights completely frozen and letting continuous 16-bit gradients flow through the smooth linear transformations of the unquantized LoRA adapters $\\mathbf{B}$ and $\\mathbf{A}$.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Quantized weights produce negative probabilities that cause the cross-entropy loss to evaluate to imaginary numbers.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "PyTorch autograd is unable to allocate tensors on GPUs with less than 80 GB of memory.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
          "en": "$$\n\\hat{r}_\\theta(x, y) = \\beta \\log \\frac{\\pi_\\theta(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)} \\quad \\text{(Implicit Reward)}\n$$\n\n$$\n\\nabla_\\theta \\mathcal{L}_{\\text{DPO}} = -\\beta \\sigma\\left(\\hat{r}_\\theta(x, y_l) - \\hat{r}_\\theta(x, y_w)\\right) \\left[ \\nabla_\\theta \\log \\pi_\\theta(y_w \\mid x) - \\nabla_\\theta \\log \\pi_\\theta(y_l \\mid x) \\right]\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $x$: The user prompt input.\n- $y_w$: The preferred (winning / chosen) model completion.\n- $y_l$: The dispreferred (losing / rejected) model completion.\n- $\\pi_\\theta(y \\mid x)$: The active policy model being aligned, parameterized by weights $\\theta$.\n- $\\pi_{\\text{ref}}(y \\mid x)$: The frozen reference model (the SFT baseline checkpoint) that anchors the policy and prevents language degradation.\n- $\\beta$: Regularization temperature parameter (typically $\\beta \\in [0.05, 0.5]$); controls the strength of the KL divergence penalty against $\\pi_{\\text{ref}}$.\n- Dynamic gradient weighting: Notice the term $\\sigma(\\hat{r}_\\theta(x, y_l) - \\hat{r}_\\theta(x, y_w))$. When the policy incorrectly rates the rejected response higher than the chosen response, this weight approaches $1.0$, applying maximum gradient force. Once the model assigns much higher probability to $y_w$, the weight decays to zero, preventing over-optimization!",
          "ar": "يتدرج التحديث ديناميكياً بضرب التدرج في sigma(r_rejected - r_chosen) مركزاً القوة عند تفضيل النموذج للرد الخاسر."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-dpo-direct-preference-optimization",
          "starterCode": "def sigmoid(x: float | np.ndarray) -> float | np.ndarray:\n    \"\"\"Numerically stable logistic sigmoid.\"\"\"\n    # 1. Compute log ratios for chosen and rejected completions\n    # 2. Compute implicit rewards\n    # 3. Logit margin for the Bradley-Terry sigmoid\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def sigmoid(x: float | np.ndarray) -> float | np.ndarray:\n    \"\"\"Numerically stable logistic sigmoid.\"\"\"\n    # 1. Compute log ratios for chosen and rejected completions\n    # 2. Compute implicit rewards\n    # 3. Logit margin for the Bradley-Terry sigmoid\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.69"
            }
          },
          "solution": "import numpy as np\n\ndef sigmoid(x: float | np.ndarray) -> float | np.ndarray:\n    \"\"\"Numerically stable logistic sigmoid.\"\"\"\n    return np.where(x >= 0, 1.0 / (1.0 + np.exp(-x)), np.exp(x) / (1.0 + np.exp(x)))\n\ndef dpo_loss(\n    pi_logps_w: float | np.ndarray,\n    pi_logps_l: float | np.ndarray,\n    ref_logps_w: float | np.ndarray,\n    ref_logps_l: float | np.ndarray,\n    beta: float = 0.1\n) -> tuple[float, float, float]:\n    \"\"\"\n    Computes the Direct Preference Optimization (DPO) loss and implicit rewards.\n    \n    Parameters\n    ----------\n    pi_logps_w : float or array\n        Log-probabilities of chosen completion under current policy pi_theta.\n    pi_logps_l : float or array\n        Log-probabilities of rejected completion under current policy pi_theta.\n    ref_logps_w : float or array\n        Log-probabilities of chosen completion under reference policy pi_ref.\n    ref_logps_l : float or array\n        Log-probabilities of rejected completion under reference policy pi_ref.\n    beta : float\n        Temperature parameter scaling the implicit reward.\n        \n    Returns\n    -------\n    loss : float\n        Mean scalar DPO loss.\n    reward_w, reward_l : float\n        Mean implicit rewards for chosen and rejected completions.\n    \"\"\"\n    # 1. Compute log ratios for chosen and rejected completions\n    pi_logratios_w = pi_logps_w - ref_logps_w\n    pi_logratios_l = pi_logps_l - ref_logps_l\n    \n    # 2. Compute implicit rewards\n    reward_w = beta * pi_logratios_w\n    reward_l = beta * pi_logratios_l\n    \n    # 3. Logit margin for the Bradley-Terry sigmoid\n    logits = reward_w - reward_l\n    \n    # 4. Binary cross-entropy: -log(sigmoid(logits))\n    # Stable calculation: -log(sigmoid(x)) = log(1 + exp(-x)) = softplus(-x)\n    loss = np.mean(np.log1p(np.exp(-np.clip(logits, -50.0, 50.0))))\n    \n    return float(loss), float(np.mean(reward_w)), float(np.mean(reward_l))"
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
            "en": "**Scenario:** During post-training alignment of a conversational assistant using DPO, the engineering team sets the temperature parameter to an extremely small value ($\\beta = 0.001$). After 2 epochs, the model achieves a near-zero DPO loss, but user evaluation reveals that the model has suffered catastrophic mode collapse: it generates repetitive, ungrammatical text and hallucinates constantly. What caused this failure?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التحسين المباشر للتفضيلات (DPO) وديناميكيات المكافأة الضمنية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The learning rate schedule caused the AdamW first momentum vector to underflow.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
          "en": "$$\n\\mathcal{L}_{\\text{simple}}(\\theta) = \\mathbb{E}_{t, \\mathbf{x}_0, \\boldsymbol{\\epsilon}} \\left[ \\left\\| \\boldsymbol{\\epsilon} - \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t) \\right\\|^2 \\right]\n$$\n\n$$\n\\mathbf{x}_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}} \\left( \\mathbf{x}_t - \\frac{\\beta_t}{\\sqrt{1 - \\bar{\\alpha}_t}} \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t) \\right) + \\sigma_t \\mathbf{z}, \\quad \\mathbf{z} \\sim \\mathcal{N}(0, \\mathbf{I})\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $\\mathbf{x}_0$: Clean, uncorrupted input data sample (e.g. image).\n- $\\beta_t \\in (0, 1)$: Variance schedule hyperparameter at timestep $t$ (e.g., linear schedule from $10^{-4}$ to $0.02$).\n- $\\alpha_t = 1 - \\beta_t$: Fraction of underlying signal retained at timestep $t$.\n- $\\bar{\\alpha}_t = \\prod_{s=1}^t \\alpha_s$: Cumulative signal retention product. As $t \\to T$, $\\bar{\\alpha}_t \\to 0$, meaning the original signal $\\mathbf{x}_0$ completely vanishes.\n- $\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})$: Ground-truth Gaussian noise added during training.\n- $\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)$: Neural network conditioned on noisy state $\\mathbf{x}_t$ and timestep embedding $t$, trained via simple Mean Squared Error (MSE).\n- Score matching equivalence: By Tweedie's Formula, the predicted noise is directly proportional to the Stein score of the data distribution: $\\nabla_{\\mathbf{x}_t} \\log p(\\mathbf{x}_t) = -\\frac{\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)}{\\sqrt{1 - \\bar{\\alpha}_t}}$.",
          "ar": "يتناقص معامل الاحتفاظ بالإشارة alpha_bar_t تدريجياً من 1 عند t=0 إلى 0 عند t=T."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-diffusion-models-score-sde",
          "starterCode": "def q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Closed-form forward Markov diffusion sampling: q(x_t | x_0).\n    \n    Parameters\n    ----------\n    x_0 : np.ndarray\n        Clean initial data tensor.\n    t : int\n        Current timestep index.\n    noise : np.ndarray\n        Standard normal Gaussian noise epsilon ~ N(0, I).\n    alpha_bars : np.ndarray\n        Array of cumulative alpha_bar values for all timesteps.\n        \n    Returns\n    -------\n    x_t : np.ndarray\n        Noisy sample at timestep t.\n    \"\"\"\n    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise\n    # Mean of the reverse distribution\n    # Variance: sigma_t^2 = beta_t\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Closed-form forward Markov diffusion sampling: q(x_t | x_0).\n    \n    Parameters\n    ----------\n    x_0 : np.ndarray\n        Clean initial data tensor.\n    t : int\n        Current timestep index.\n    noise : np.ndarray\n        Standard normal Gaussian noise epsilon ~ N(0, I).\n    alpha_bars : np.ndarray\n        Array of cumulative alpha_bar values for all timesteps.\n        \n    Returns\n    -------\n    x_t : np.ndarray\n        Noisy sample at timestep t.\n    \"\"\"\n    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise\n    # Mean of the reverse distribution\n    # Variance: sigma_t^2 = beta_t\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Closed-form forward Markov diffusion sampling: q(x_t | x_0).\n    \n    Parameters\n    ----------\n    x_0 : np.ndarray\n        Clean initial data tensor.\n    t : int\n        Current timestep index.\n    noise : np.ndarray\n        Standard normal Gaussian noise epsilon ~ N(0, I).\n    alpha_bars : np.ndarray\n        Array of cumulative alpha_bar values for all timesteps.\n        \n    Returns\n    -------\n    x_t : np.ndarray\n        Noisy sample at timestep t.\n    \"\"\"\n    alpha_bar_t = alpha_bars[t]\n    # x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * noise\n    return np.sqrt(alpha_bar_t) * x_0 + np.sqrt(1.0 - alpha_bar_t) * noise\n\ndef p_sample_step(\n    x_t: np.ndarray,\n    t: int,\n    pred_noise: np.ndarray,\n    alphas: np.ndarray,\n    alpha_bars: np.ndarray,\n    betas: np.ndarray\n) -> np.ndarray:\n    \"\"\"\n    Single reverse denoising step: p_theta(x_{t-1} | x_t).\n    \"\"\"\n    beta_t = betas[t]\n    alpha_t = alphas[t]\n    alpha_bar_t = alpha_bars[t]\n    \n    # Mean of the reverse distribution\n    coef = beta_t / np.sqrt(1.0 - alpha_bar_t)\n    mean = (1.0 / np.sqrt(alpha_t)) * (x_t - coef * pred_noise)\n    \n    if t == 0:\n        return mean\n    \n    # Variance: sigma_t^2 = beta_t\n    sigma_t = np.sqrt(beta_t)\n    z = np.random.randn(*x_t.shape)\n    return mean + sigma_t * z"
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
            "en": "**Scenario:** In modern text-to-image diffusion models (e.g. Stable Diffusion 3, Flux), generation utilizes **Classifier-Free Guidance (CFG)** during inference with an extrapolation factor $w > 1$: $$ \\tilde{\\boldsymbol{\\epsilon}}_\\theta(\\mathbf{x}_t, c) = \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, \\emptyset) + w \\left( \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, c) - \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, \\emptyset) \\right) $$ If an operator sets the guidance scale excessively high (e.g., $w = 25.0$), what visual artifact appears in the synthesized images, and what mathematical dynamic causes it?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ نماذج الانتشار الاحتمالية لإزالة التشويش (DDPM) ومطابقة درجات الاحتمال تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The image collapses to a completely black canvas because the learning rate during sampling diverges to infinity.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
          "en": "Standard foundation models confined to passive, single-turn text generation are inherently brittle: they cannot inspect external databases, verify real-time facts, run code, or self-correct reasoning mistakes when assumptions fail.\n\nThe **ReAct (Reasoning + Acting)** paradigm (Yao et al., 2022) elevates a frozen language model into an autonomous agent capable of solving multi-step tasks in dynamic software environments. ReAct tightly integrates two fundamental modes of cognition into an interleaved execution loop:\n1. **Thought (Reasoning Traces):** The agent verbalizes its internal cognitive state, decomposes ambiguous user goals into concrete sub-problems, tracks working hypotheses, and plans subsequent steps.\n2. **Action (Environmental Grounding):** The agent formats and dispatches structured tool calls targeting external software systems (e.g., executing SQL queries, querying vector search indices, invoking shell commands, or computing mathematical expressions).\n3. **Observation (Environmental Feedback):** The external sandbox or API executes the command and feeds the raw execution output back into the agent's context window.\n4. **Iterative Refinement:** The agent analyzes the new observation, updates its working memory, and repeats the cycle until synthesizing a verified **Final Answer**.\n\n> **Frontier Analogy:** Think of a master detective solving an intricate crime. A rookie immediately guesses a suspect off the top of their head and gets it wrong. A master detective writes analytical notes in their case notebook (Thought), visits the archive to check property deeds (Action: Tool Call), inspects the dusty signatures (Observation), adjusts their hypothesis, and repeats until the case is proved beyond all reasonable doubt.",
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
          "en": "$$\no_t = \\mathcal{E}(a_t, s_t), \\quad a_t \\in \\mathcal{A}_{\\text{tools}} \\cup \\{ \\text{Finish}(\\text{answer}) \\}\n$$\n\n$$\n\\text{Stopping Invariant: } a_t = \\text{Finish} \\lor t \\ge T_{\\max} \\lor \\text{hash}(a_t) \\in \\mathcal{H}_{\\text{cycle}}\n$$\n\n#### Step-by-Step Parameter Breakdown\n- $c$: Initial natural language user prompt or high-level task goal.\n- $\\tau_t$: The complete interaction trajectory (the active working memory context window) at step $t$.\n- $\\pi_\\theta$: The frozen foundation LLM acting as the reasoning planner and tool dispatcher.\n- $a_t = (\\text{tool\\_name}, \\text{arguments})$: Structured action emitted by the model's tool-call parser.\n- $\\mathcal{E}$: External execution runtime (sandbox, operating system CLI, API gateway) that consumes action $a_t$ in current state $s_t$ and produces observation $o_t$.\n- $o_t$: Raw environmental feedback string appended to the trajectory $\\tau_{t+1} = (\\tau_t, a_t, o_t)$.\n- $T_{\\max}$: Maximum step budget preventing unbounded token consumption.\n- $\\mathcal{H}_{\\text{cycle}}$: Cycle detection hash set; if the agent issues identical actions with identical arguments that yield identical failures, the system intervenes to prevent infinite loops.",
          "ar": "تختار السياسة الأفعال مشروطة بالمسار التراكمي tau_t حتى إصدار أمر الإنهاء أو بلوغ قيود الأمان."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-autonomous-react-agent-loop",
          "starterCode": "def parse_react_output(model_output: str) -> dict:\n    \"\"\"\n    Parses an LLM generation string into ReAct Thought, Action, and Action Input.\n    \n    Parameters\n    ----------\n    model_output : str\n        Raw string containing Thought, Action, and Action Input,\n        or Thought and Final Answer.\n        \n    Returns\n    -------\n    dict with keys:\n        'thought': str,\n        'action': str | None,\n        'action_input': str | None,\n        'final_answer': str | None,\n        'is_final': bool\n    \"\"\"\n    # 1. Check for Final Answer termination\n    # 2. Extract Thought\n    # 3. Extract Action\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def parse_react_output(model_output: str) -> dict:\n    \"\"\"\n    Parses an LLM generation string into ReAct Thought, Action, and Action Input.\n    \n    Parameters\n    ----------\n    model_output : str\n        Raw string containing Thought, Action, and Action Input,\n        or Thought and Final Answer.\n        \n    Returns\n    -------\n    dict with keys:\n        'thought': str,\n        'action': str | None,\n        'action_input': str | None,\n        'final_answer': str | None,\n        'is_final': bool\n    \"\"\"\n    # 1. Check for Final Answer termination\n    # 2. Extract Thought\n    # 3. Extract Action\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "add"
            }
          },
          "solution": "import re\n\ndef parse_react_output(model_output: str) -> dict:\n    \"\"\"\n    Parses an LLM generation string into ReAct Thought, Action, and Action Input.\n    \n    Parameters\n    ----------\n    model_output : str\n        Raw string containing Thought, Action, and Action Input,\n        or Thought and Final Answer.\n        \n    Returns\n    -------\n    dict with keys:\n        'thought': str,\n        'action': str | None,\n        'action_input': str | None,\n        'final_answer': str | None,\n        'is_final': bool\n    \"\"\"\n    # 1. Check for Final Answer termination\n    final_match = re.search(r\"Final Answer:\\s*(.*)\", model_output, re.DOTALL)\n    if final_match:\n        thought_match = re.search(r\"Thought:\\s*(.*?)(?=Final Answer:|$)\", model_output, re.DOTALL)\n        thought = thought_match.group(1).strip() if thought_match else \"\"\n        return {\n            'thought': thought,\n            'action': None,\n            'action_input': None,\n            'final_answer': final_match.group(1).strip(),\n            'is_final': True\n        }\n        \n    # 2. Extract Thought\n    thought_match = re.search(r\"Thought:\\s*(.*?)(?=Action:|$)\", model_output, re.DOTALL)\n    thought = thought_match.group(1).strip() if thought_match else \"\"\n    \n    # 3. Extract Action\n    action_match = re.search(r\"Action:\\s*([a-zA-Z0-9_\\-]+)\", model_output)\n    action = action_match.group(1).strip() if action_match else None\n    \n    # 4. Extract Action Input\n    input_match = re.search(r\"Action Input:\\s*(.*)\", model_output, re.DOTALL)\n    action_input = input_match.group(1).strip() if input_match else None\n    \n    return {\n        'thought': thought,\n        'action': action,\n        'action_input': action_input,\n        'final_answer': None,\n        'is_final': False\n    }\n\ndef execute_agent_step(\n    model_output: str,\n    tool_registry: dict,\n    seen_actions: set\n) -> tuple[str, bool]:\n    \"\"\"\n    Executes a single ReAct step with cycle detection.\n    \n    Returns\n    -------\n    observation_str : str\n    is_finished : bool\n    \"\"\"\n    parsed = parse_react_output(model_output)\n    if parsed['is_final']:\n        return parsed['final_answer'], True\n        \n    act = parsed['action']\n    inp = parsed['action_input']\n    \n    # Cycle detection safeguard\n    call_sig = (act, inp)\n    if call_sig in seen_actions:\n        return \"Error: Infinite loop cycle detected. Try an alternative strategy.\", False\n    seen_actions.add(call_sig)\n    \n    # Dispatch tool\n    if act not in tool_registry:\n        return f\"Error: Tool '{act}' not recognized in tool registry.\", False\n        \n    try:\n        result = tool_registry[act](inp)\n        return str(result), False\n    except Exception as e:\n        return f\"Tool Execution Error: {str(e)}\", False"
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
            "en": "**Scenario:** You deploy an autonomous customer support agent equipped with API tools for checking orders, processing refunds, and querying internal knowledge bases. During a live test, an external database API experiences a transient 504 Gateway Timeout. The agent repeatedly re-executes the exact same query with identical parameters 45 times until exhausting its prompt context window and incurring massive cloud API costs. What architectural mechanism should be engineered into the agent runtime to permanently prevent this failure mode?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الوكلاء المستقلون بالذكاء الاصطناعي: حلقة ReAct للتفكير والتنفيذ تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Fine-tune the base LLM on an additional 100,000 conversational dialogues to eliminate errors.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
