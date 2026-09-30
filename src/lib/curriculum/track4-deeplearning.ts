import type { CurriculumModule } from '../types';

export const deeplearningModules: CurriculumModule[] = [
  {
    "id": "autograd-computational-graph",
    "title": "Scalar Autograd Node & Computational Graph Topology",
    "titleAr": "عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Every mathematical expression evaluated on a computer—from a single polynomial to a multi-billion parameter transformer—can be broken down i...",
      "ar": "تُعد عقدة التفاضل التلقائي السلمية الحجر الأساس والخلية الذرية لمحركات التمايز التلقائي في وضع الانحدار العكسي. عند استدعاء عملية حسابية مثل..."
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
          "en": "Every mathematical expression evaluated on a computer—from a single polynomial to a multi-billion parameter transformer—can be broken down into an acyclic network of elementary binary and unary mathematical operations ($+, -, \\times, \\div, \\text{exp}, \\text{log}$). In traditional computer programming, when you compute c = a  b, the CPU calculates the product, stores the scalar in a memory register, and immediately discards the lineage: it forgets that c was born from the pairing of a and b.\n\nAutomatic differentiation (Autograd) transforms passive numerical values into active graph ver",
          "ar": "تُعد عقدة التفاضل التلقائي السلمية الحجر الأساس والخلية الذرية لمحركات التمايز التلقائي في وضع الانحدار العكسي. عند استدعاء عملية حسابية مثل الجمع أو الضرب، لا تكتفي العقدة بحساب النتيجة الرقمية العابرة، بل تقوم ديناميكياً بإنشاء رأس (Vertex) جديد ضمن رسم بياني موجه غير دائري (DAG)، مع الاحتفاظ بمؤشرات مرجعية للعقد الأبوية التي تولدت منها. يشكل هذا سجلاً تاريخياً دقيقاً لمسار التنفيذ الحسابي، مما يتيح لاحقاً تحليل الحساسية وحساب التدرجات في زمن خطي يتناسب طردياً مع عدد العمليات وبمعزل عن حجم مدخلات النموذج."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "v_i = f_i(\\{v_j\\}_{j \\in \\text{Parents}(v_i)}), \\quad \\mathcal{G} = (\\mathcal{V}, \\mathcal{E}), \\quad \\mathcal{V} = \\{v_1, v_2, \\dots, v_N\\}, \\quad \\mathcal{E} = \\{(v_j, v_i) \\mid v_j \\in \\text{Parents}(v_i)\\}",
        "formulaNote": {
          "en": "Core invariant for Scalar Autograd Node & Computational Graph Topology.",
          "ar": "الخاصية الرياضية الجوهرية لـ عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-autograd-computational-graph",
          "starterCode": "class Value:\n    data: float\n    grad: float\n    _prev: set['Value']\n    _op: str\n    def __init__(self, data: float | int, _children: tuple['Value', ...] = (), _op: str = '') -> None: ...\n    def __add__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __pow__(self, other: float | int) -> 'Value': ...\n    def __neg__(self) -> 'Value': ...\n    def __sub__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __radd__(self, other: float | int) -> 'Value': ...\n    def __rmul__(self, other: float | int) -> 'Value': ...\n    def __rsub__(self, other: float | int) -> 'Value': ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "class Value:\n    data: float\n    grad: float\n    _prev: set['Value']\n    _op: str\n    def __init__(self, data: float | int, _children: tuple['Value', ...] = (), _op: str = '') -> None: ...\n    def __add__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __pow__(self, other: float | int) -> 'Value': ...\n    def __neg__(self) -> 'Value': ...\n    def __sub__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __radd__(self, other: float | int) -> 'Value': ...\n    def __rmul__(self, other: float | int) -> 'Value': ...\n    def __rsub__(self, other: float | int) -> 'Value': ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "class Value:\n    \"\"\"Scalar node for dynamic computational graph.\"\"\"\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        # TODO: Wrap scalar in Value if necessary; return new Value with (self, other) children and '+' op\n        pass\n\n    def __mul__(self, other):\n        # TODO: Implement scalar/Value multiplication\n        pass\n\n    def __pow__(self, other: float | int):\n        # TODO: Implement power operation where exponent is int or float\n        pass\n\n    def __neg__(self):\n        return self * -1.0\n\n    def __sub__(self, other):\n        return self + (-other)\n\n    def __radd__(self, other):\n        return self + other\n\n    def __rmul__(self, other):\n        return self * other\n\n    def __rsub__(self, other):\n        return Value(other) + (-self)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Scalar Autograd Node & Computational Graph Topology?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم عقدة التفاضل التلقائي السلمية وطوبولوجيا الرسم البياني الحسابي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "In multivariable calculus, the chain rule is often perceived as a daunting global expansion of nested partial derivatives. However, viewed f...",
      "ar": "تمثل المشتقات المرافقة المحلية (Local Adjoints) معدل التغير اللحظي لعملية حسابية أولية بالنسبة لوسائطها المباشرة. تفكك خوارزمية التمايز العك..."
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
        "simulation": "DynamicDagLab",
        "narrative": {
          "en": "In multivariable calculus, the chain rule is often perceived as a daunting global expansion of nested partial derivatives. However, viewed from the perspective of an isolated node in a computational graph, the chain rule is profoundly local. A node $v_i$ that combines two parent inputs $a$ and $b$ via an operator $f(a, b)$ needs to know only one thing: how does its own local output change when $a$ or $b$ changes by an infinitesimal amount?\n\nThe quantities $\\frac{\\partial v_i}{\\partial a}$ and $\\frac{\\partial v_i}{\\partial b}$ are the local gradients. They are completely oblivious to the rest",
          "ar": "تمثل المشتقات المرافقة المحلية (Local Adjoints) معدل التغير اللحظي لعملية حسابية أولية بالنسبة لوسائطها المباشرة. تفكك خوارزمية التمايز العكسي المشتقة الكلية للدالة المعقدة إلى سلسلة متتابعة من الحسابات المحلية؛ حيث تنفذ كل عقدة دالة عكسية (Backward Closure) تضرب التدرج القادم إليها من العقد اللاحقة في المشتقة المحلية للعملية. هذا الفصل المحلي يعزل الحساب الرياضي لكل عملية عن عمق الشبكة العصيبة وتعقيدها الكلي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{a} = \\bar{v}_i \\cdot \\frac{\\partial v_i}{\\partial a}, \\quad \\bar{b} = \\bar{v}_i \\cdot \\frac{\\partial v_i}{\\partial b}",
        "formulaNote": {
          "en": "Core invariant for Elementary Backward Operations & Local Adjoints.",
          "ar": "الخاصية الرياضية الجوهرية لـ العمليات العكسية الأولية والمشتقات المرافقة المحلية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-reverse-mode-derivative-closures",
          "starterCode": "class Value:\n    data: float\n    grad: float\n    _backward: Callable[[], None]\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = '') -> None: ...\n    def __add__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...\n    def relu(self) -> 'Value': ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "class Value:\n    data: float\n    grad: float\n    _backward: Callable[[], None]\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = '') -> None: ...\n    def __add__(self, other: 'Value' | float | int) -> 'Value': ...\n    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...\n    def relu(self) -> 'Value': ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "class Value:\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        # TODO: Define out._backward closure using +=\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        # TODO: Define out._backward closure using product rule\n        return out\n\n    def relu(self):\n        # TODO: Implement out = Value(max(0, self.data)) and out._backward closure\n        pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Elementary Backward Operations & Local Adjoints?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم العمليات العكسية الأولية والمشتقات المرافقة المحلية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Topological Sort DAG Execution & Gradient Accumulation",
    "titleAr": "تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a complex manufacturing supply chain where sub-assemblies flow downstream into larger modules, culminating in a single finished prod...",
      "ar": "يستلزم التمايز التلقائي العكسي اجتياز الرسم البياني الحسابي وفق ترتيب طوبولوجي معكوس. يضمن هذا الترتيب أنه عند تنفيذ خطوة التفاضل العكسي لأي..."
    },
    "prerequisites": [
      "reverse-mode-derivative-closures",
      "pure-functions-recursion"
    ],
    "x": 1095,
    "y": 270,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AdjointBackpropCanvas",
        "narrative": {
          "en": "Imagine a complex manufacturing supply chain where sub-assemblies flow downstream into larger modules, culminating in a single finished product: the scalar loss $L$. If you want to determine how a defect in the final product traces back to raw material suppliers, you cannot inspect components in random order. If component $C$ feeds into both component $D$ and component $E$, you cannot calculate the total sensitivity of $C$ until both $D$ and $E$ have finished calculating their sensitivities and pushed their feedback back into $C$.\n\nThis ordering requirement is formalised by the Topological",
          "ar": "يستلزم التمايز التلقائي العكسي اجتياز الرسم البياني الحسابي وفق ترتيب طوبولوجي معكوس. يضمن هذا الترتيب أنه عند تنفيذ خطوة التفاضل العكسي لأي عقدة، تكون جميع العقد المستهلكة لمخرجاتها (الأبناء) قد أنهت حساباتها بالفعل، مما يكفل أن التدرج التراكمي المحسوب للعقدة $\\bar{v}_i = \\sum_{j} \\bar{v}_j \\frac{\\partial v_j}{\\partial v_i}$ يعبر عن المشتقة الكلية الشاملة قبل أن ينتقل التأثير العكسي إلى العقد السابقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\frac{\\partial L}{\\partial v_i} = \\sum_{j \\in \\text{Children}(v_i)} \\frac{\\partial L}{\\partial v_j} \\frac{\\partial v_j}{\\partial v_i}",
        "formulaNote": {
          "en": "Core invariant for Topological Sort DAG Execution & Gradient Accumulation.",
          "ar": "الخاصية الرياضية الجوهرية لـ تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-topological-sort-dag-backprop",
          "starterCode": "class Value:\n    # Full autograd Value node with backward()\n    def backward(self) -> None: ...\n    # Builds topological order, sets seed grad to 1.0, calls _backward() in reverse",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "class Value:\n    # Full autograd Value node with backward()\n    def backward(self) -> None: ...\n    # Builds topological order, sets seed grad to 1.0, calls _backward() in reverse",
              "expectedOutput": "3.0"
            }
          },
          "solution": "class Value:\n    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += out.grad\n            other.grad += out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other), '*')\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\n    def relu(self):\n        out = Value(max(0.0, self.data), (self,), 'relu')\n        def _backward():\n            self.grad += (out.data > 0.0) * out.grad\n        out._backward = _backward\n        return out\n\n    def backward(self):\n        # TODO: 1. Build topological order via DFS post-order traversal\n        # TODO: 2. Set self.grad = 1.0\n        # TODO: 3. Call _backward() on all nodes in reverse topological order\n        pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Topological Sort DAG Execution & Gradient Accumulation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تنفيذ الرسم البياني الموجه غير الدائري بالترتيب الطوبولوجي وتراكم التدرجات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Non-Linear Activations: GELU, SiLU/Swish & Smooth Rectification",
    "titleAr": "دوال التنشيط غير الخطية: GELU و SiLU/Swish والتقويم السلس",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A deep neural network constructed purely from stacked linear transformations $\\mathbf{y} = \\mathbf{W}_2(\\mathbf{W}_1 \\mathbf{x} + \\mathbf{b}...",
      "ar": "تعتمد نماذج المحولات الحديثة على دوال تنشيط سلسة وغير رتيبة مثل GELU و SiLU (Swish) كبديل متفوق لدوال التقويم الخطي المتقطعة مثل ReLU. تزن د..."
    },
    "prerequisites": [
      "topological-sort-dag-backprop"
    ],
    "x": 1075,
    "y": 365,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NeuralActivationCanvas",
        "narrative": {
          "en": "A deep neural network constructed purely from stacked linear transformations $\\mathbf{y} = \\mathbf{W}_2(\\mathbf{W}_1 \\mathbf{x} + \\mathbf{b}_1) + \\mathbf{b}_2$ collapses into a single trivial linear transformation $\\mathbf{y} = \\mathbf{W}_{\\text{eff}} \\mathbf{x} + \\mathbf{b}_{\\text{eff}}$, rendering network depth completely pointless. Non-linear activation functions are the mathematical hinges that break linearity, allowing neural networks to act as universal function approximators capable of carving complex decision boundaries in high-dimensional manifolds.\n\nWhile the Rectified Linear Unit ($",
          "ar": "تعتمد نماذج المحولات الحديثة على دوال تنشيط سلسة وغير رتيبة مثل GELU و SiLU (Swish) كبديل متفوق لدوال التقويم الخطي المتقطعة مثل ReLU. تزن دالة GELU المدخلات عبر دالة التوزيع التراكمي للتوزيع الطبيعي، مما يضفي انحناءً رياضياً مرناً ويحافظ على تدفق تدرج غير صفري في النطاق السالب القريب من الصفر. يمنح هذا التقويم الاحتمالي استمرارية تفاضلية ناعمة تمتد عبر تضاريس دالة الخسارة وتضمن استقرار تدريب النماذج العميقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{GELU}(x) \\coloneqq x \\cdot \\Phi(x) = x \\cdot \\frac{1}{2} \\left[ 1 + \\text{erf}\\left( \\frac{x}{\\sqrt{2}} \\right) \\right]",
        "formulaNote": {
          "en": "Core invariant for Non-Linear Activations: GELU, SiLU/Swish & Smooth Rectification.",
          "ar": "الخاصية الرياضية الجوهرية لـ دوال التنشيط غير الخطية: GELU و SiLU/Swish والتقويم السلس."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-perceptron-activation",
          "starterCode": "def gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray: ...\n# Input: x: Arbitrary shape NumPy array of float32/float64\n# Output: ndarray of identical shape with element-wise GELU activations",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray: ...\n# Input: x: Arbitrary shape NumPy array of float32/float64\n# Output: ndarray of identical shape with element-wise GELU activations",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\nimport math\n\ndef gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray:\n    \"\"\"Compute element-wise GELU activation.\"\"\"\n    # TODO: Implement approximate tanh formulation if approximate=True\n    # TODO: Implement exact erf formulation if approximate=False\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Non-Linear Activations: GELU, SiLU/Swish & Smooth Rectification?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم دوال التنشيط غير الخطية: GELU و SiLU/Swish والتقويم السلس؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Log-Sum-Exp Trick & Numerically Stable Cross-Entropy",
    "titleAr": "حيلة اللوغاريتم لمجموع الأسس والاستقرار العددي لدالة الخسارة التقاطعية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In multi-class classification and autoregressive language modeling, a neural network outputs unnormalized log-probabilities called logits $\\...",
      "ar": "يؤدي الحساب المباشر لاحتمالات التوزيع الاحتمالي (Softmax) متبوعاً بحساب اللوغاريتم إلى عدم استقرار عددي كارثي عند استخدام أرقام الفاصلة العا..."
    },
    "prerequisites": [
      "perceptron-activation",
      "logistic-regression-sigmoid"
    ],
    "x": 1095,
    "y": 460,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "OptimizationDynamicsLab",
        "narrative": {
          "en": "In multi-class classification and autoregressive language modeling, a neural network outputs unnormalized log-probabilities called logits $\\mathbf{z} \\in \\mathbb{R}^V$ over a vocabulary of size $V$. To convert these logits into a valid probability distribution $\\mathbf{p}$, we pass them through the softmax operator:",
          "ar": "يؤدي الحساب المباشر لاحتمالات التوزيع الاحتمالي (Softmax) متبوعاً بحساب اللوغاريتم إلى عدم استقرار عددي كارثي عند استخدام أرقام الفاصلة العائمة محدودة الدقة. تحل \"حيلة لوغاريتم مجموع الأسس\" (Log-Sum-Exp Trick) هذه المعضلة بنقل متجهات القيم المنطقية (Logits) عبر طرح قيمتها العظمى قبل الرفع الأسي. يضمن هذا التحويل التحليلي حصر جميع الأسس داخل النطاق $(-\\infty, 0]$، فتتحول القيمة العظمى حتماً إلى $e^0 = 1.0$، مما يمنع تجاوز سعة التخزين (Overflow) وتلاشي المقام إلى الصفر (Underflow)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "p_i = \\frac{e^{z_i}}{\\sum_{j=1}^V e^{z_j}}",
        "formulaNote": {
          "en": "Core invariant for Log-Sum-Exp Trick & Numerically Stable Cross-Entropy.",
          "ar": "الخاصية الرياضية الجوهرية لـ حيلة اللوغاريتم لمجموع الأسس والاستقرار العددي لدالة الخسارة التقاطعية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-numerically-stable-softmax-cross-entropy",
          "starterCode": "def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]: ...\n# logits: (N, C) float array of unbounded logits\n# targets: (N,) integer array of ground-truth class labels 0 <= targets[i] < C\n# Returns: (loss: float, grad: np.ndarray of shape (N, C))",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]: ...\n# logits: (N, C) float array of unbounded logits\n# targets: (N,) integer array of ground-truth class labels 0 <= targets[i] < C\n# Returns: (loss: float, grad: np.ndarray of shape (N, C))",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]:\n    \"\"\"Numerically stable cross-entropy with log-sum-exp trick.\"\"\"\n    # TODO: Subtract row-wise max for numerical stability\n    # TODO: Compute log_sum_exp and log-probabilities\n    # TODO: Calculate mean cross-entropy loss and analytical gradient\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Log-Sum-Exp Trick & Numerically Stable Cross-Entropy?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم حيلة اللوغاريتم لمجموع الأسس والاستقرار العددي لدالة الخسارة التقاطعية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "AdamW Optimization: Adaptive Moments & Decoupled Weight Decay",
    "titleAr": "خوارزمية التحسين AdamW: العزوم التكيفية واضمحلال الوزن المفصول",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Standard Stochastic Gradient Descent (SGD) updates parameters along the negative gradient: $\\theta_{t+1} = \\theta_t - \\eta g_t$. In complex ...",
      "ar": "تعمل خوارزمية AdamW على تثبيت وتحسين كفاءة تدريب الشبكات العميقة عبر دمج العزوم التكيفية للرتبتين الأولى والثانية مع آلية \"اضمحلال الوزن الم..."
    },
    "prerequisites": [
      "numerically-stable-softmax-cross-entropy"
    ],
    "x": 1075,
    "y": 555,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AdamWOptimizerLab",
        "narrative": {
          "en": "Standard Stochastic Gradient Descent (SGD) updates parameters along the negative gradient: $\\theta_{t+1} = \\theta_t - \\eta g_t$. In complex loss landscapes characterized by steep ravines and ill-conditioned curvature (where gradients oscillate violently along steep walls while crawling sluggishly along the gentle ravine floor), SGD struggles severely.\n\nTo overcome this, Adam (Adaptive Moment Estimation) combines two profound principles:\n1. First Moment (Momentum): Computes an exponentially decaying average of past gradients ($m_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t$), acting like physi",
          "ar": "تعمل خوارزمية AdamW على تثبيت وتحسين كفاءة تدريب الشبكات العميقة عبر دمج العزوم التكيفية للرتبتين الأولى والثانية مع آلية \"اضمحلال الوزن المفصول\" (Decoupled Weight Decay). على عكس خوارزمية Adam الأصلية المقترنة بتنظيم $L_2$ التقليدي — والتي تقلص عقوبة التنظيم عن غير قصد للأوزان ذات التباين التاريخي العالي — تطبق AdamW انكماش الوزن الحقيقي مباشرة على مصفوفات المعاملات، مما يحفظ تنظيماً هندسياً متوازناً عبر كافة أبعاد النموذج."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "g_t = \\nabla_\\theta \\mathcal{L}(\\theta_t)",
        "formulaNote": {
          "en": "Core invariant for AdamW Optimization: Adaptive Moments & Decoupled Weight Decay.",
          "ar": "الخاصية الرياضية الجوهرية لـ خوارزمية التحسين AdamW: العزوم التكيفية واضمحلال الوزن المفصول."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-layer-mlp-xor-boundary",
          "starterCode": "def adamw_step(\n    param: np.ndarray,\n    grad: np.ndarray,\n    m: np.ndarray,\n    v: np.ndarray,\n    t: int,\n    lr: float = 1e-3,\n    beta1: float = 0.9,\n    beta2: float = 0.999,\n    eps: float = 1e-8,\n    weight_decay: float = 1e-2\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def adamw_step(\n    param: np.ndarray,\n    grad: np.ndarray,\n    m: np.ndarray,\n    v: np.ndarray,\n    t: int,\n    lr: float = 1e-3,\n    beta1: float = 0.9,\n    beta2: float = 0.999,\n    eps: float = 1e-8,\n    weight_decay: float = 1e-2\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef adamw_step(param, grad, m, v, t, lr=1e-3, beta1=0.9, beta2=0.999, eps=1e-8, weight_decay=1e-2):\n    \"\"\"Perform one AdamW optimization update step.\"\"\"\n    # TODO: 1. Apply decoupled weight decay to param\n    # TODO: 2. Update biased first (m) and second (v) moment estimates\n    # TODO: 3. Compute bias-corrected moments m_hat and v_hat using step t\n    # TODO: 4. Apply adaptive update step and return (param_next, m_next, v_next)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing AdamW Optimization: Adaptive Moments & Decoupled Weight Decay?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم خوارزمية التحسين AdamW: العزوم التكيفية واضمحلال الوزن المفصول؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "2D Spatial Convolution via im2col & GEMM Matrix Multiplication",
    "titleAr": "الالتفاف المكاني ثنائي الأبعاد عبر تحويل im2col ومصفوفة GEMM العامة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A 2D convolutional layer is the bedrock of spatial deep learning. Unlike a fully connected layer where every input pixel connects to every o...",
      "ar": "تطبق عملية الالتفاف المكاني ثنائي الأبعاد مرشحات محلية مشتركة عبر حقل استقبالي لاستخراج ميزات متكافئة مكانياً تحت الإزاحة. ولتنفيذ هذه العمل..."
    },
    "prerequisites": [
      "two-layer-mlp-xor-boundary",
      "gradient-vector"
    ],
    "x": 1100,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ConvolutionFilterCanvas",
        "narrative": {
          "en": "A 2D convolutional layer is the bedrock of spatial deep learning. Unlike a fully connected layer where every input pixel connects to every output feature, convolution enforces two powerful inductive biases:\n1. Spatial Locality: Pixels that are close together are far more correlated than pixels on opposite sides of the image. Convolution restricts computation to tiny local patches (receptive fields) of size $K_h \\times K_w$ (e.g. $3 \\times 3$).\n2. Translation Equivariance: A cat's whisker or a sharp edge retains the exact same visual identity whether it appears in the top-left or bottom",
          "ar": "تطبق عملية الالتفاف المكاني ثنائي الأبعاد مرشحات محلية مشتركة عبر حقل استقبالي لاستخراج ميزات متكافئة مكانياً تحت الإزاحة. ولتنفيذ هذه العملية الحسابية المعقدة بأقصى سرعة عتادية، يتم تحويل موتر المدخلات عبر تقنية im2col التي تفرد كل رقعة مكانية متداخلة في صف مستقل ضمن مصفوفة ثنائية الأبعاد ضخمة. يحول هذا الإجراء حلقات الالتفاف السبع المتداخلة إلى عملية ضرب مصفوفات عامة وموحدة (GEMM)، مما يتيح للمعالجات الرسومية استغلال وحدات المصفوفات الانقباضية بأعلى كفاءة حسابية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{Y}_{\\text{gemm}} = \\mathbf{X}_{\\text{col}} \\mathbf{W}_{\\text{row}}^T",
        "formulaNote": {
          "en": "Core invariant for 2D Spatial Convolution via im2col & GEMM Matrix Multiplication.",
          "ar": "الخاصية الرياضية الجوهرية لـ الالتفاف المكاني ثنائي الأبعاد عبر تحويل im2col ومصفوفة GEMM العامة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-descent",
          "starterCode": "def conv2d_im2col(\n    x: np.ndarray,\n    w: np.ndarray,\n    b: np.ndarray | None = None,\n    stride: int = 1,\n    padding: int = 0\n) -> np.ndarray: ...\n# x: (B, C_in, H, W)\n# w: (C_out, C_in, K_h, K_w)\n# b: (C_out,) or None\n# Returns: (B, C_out, out_h, out_w)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def conv2d_im2col(\n    x: np.ndarray,\n    w: np.ndarray,\n    b: np.ndarray | None = None,\n    stride: int = 1,\n    padding: int = 0\n) -> np.ndarray: ...\n# x: (B, C_in, H, W)\n# w: (C_out, C_in, K_h, K_w)\n# b: (C_out,) or None\n# Returns: (B, C_out, out_h, out_w)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef conv2d_im2col(x: np.ndarray, w: np.ndarray, b: np.ndarray | None = None, stride: int = 1, padding: int = 0) -> np.ndarray:\n    \"\"\"Vectorized 2D convolution using im2col and matrix multiplication.\"\"\"\n    # TODO: 1. Apply zero padding to spatial dimensions (H, W) if padding > 0\n    # TODO: 2. Compute output spatial dimensions out_h and out_w\n    # TODO: 3. Unfold image patches into columns (im2col)\n    # TODO: 4. Perform matrix multiplication with flattened filter weights and reshape\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing 2D Spatial Convolution via im2col & GEMM Matrix Multiplication?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الالتفاف المكاني ثنائي الأبعاد عبر تحويل im2col ومصفوفة GEMM العامة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Layer Normalization & Invariant Internal Covariate Shift",
    "titleAr": "تطبيع الطبقات وثبات التحول الداخلي للمتغيرات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "As signals propagate forward through dozens of stacked neural network layers, the distribution of activations at each layer shifts continuou...",
      "ar": "تعمل تقنية \"تطبيع الطبقات\" (Layer Normalization) على تثبيت التمثيلات العميقة في الشبكات العصبية عبر معايرة تنشيطات كل عينة بشكل مستقل تماماً..."
    },
    "prerequisites": [
      "gradient-descent"
    ],
    "x": 1125,
    "y": 745,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "NormalizationGeometryLab",
        "narrative": {
          "en": "As signals propagate forward through dozens of stacked neural network layers, the distribution of activations at each layer shifts continuously with every parameter update—a phenomenon historically termed internal covariate shift. If activations at layer 50 drift towards huge values, the subsequent layers will saturate and gradients will vanish or explode, causing deep architectures to fail to train entirely.\n\nWhile Batch Normalization (BatchNorm) solved this for CNNs by computing statistics across the mini-batch dimension, it completely collapses in sequence models and Transformers:\n1",
          "ar": "تعمل تقنية \"تطبيع الطبقات\" (Layer Normalization) على تثبيت التمثيلات العميقة في الشبكات العصبية عبر معايرة تنشيطات كل عينة بشكل مستقل تماماً عبر أبعاد ميزاتها الخفية. وخلافاً لتقنية تطبيع الدفعات (Batch Normalization) التي تعتمد على إحصائيات الدفعة وتنهار عند التعامل مع السلاسل متغيرة الطول أو عند التوليد التتابعي بعينة واحدة، تعزل LayerNorm عملية التطبيع داخل متجه كل رمز على حدة. يمنح هذا الإجراء ثباتاً عددياً أمام التحولات والتوسعات الخطية، مما يوفر مساراً آمناً لتدريب محولات الانتباه فائقة العمق."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mu = \\frac{1}{d} \\sum_{i=1}^d x_i, \\quad \\sigma^2 = \\frac{1}{d} \\sum_{i=1}^d (x_i - \\mu)^2",
        "formulaNote": {
          "en": "Core invariant for Layer Normalization & Invariant Internal Covariate Shift.",
          "ar": "الخاصية الرياضية الجوهرية لـ تطبيع الطبقات وثبات التحول الداخلي للمتغيرات."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-momentum-rmsprop-adaptive",
          "starterCode": "def layernorm_forward(\n    x: np.ndarray,\n    gamma: np.ndarray,\n    beta: np.ndarray,\n    eps: float = 1e-5\n) -> tuple[np.ndarray, dict]: ...\n# x: shape (..., D)\n# gamma, beta: shape (D,)\n# Returns: (normalized_output: np.ndarray, cache: dict)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def layernorm_forward(\n    x: np.ndarray,\n    gamma: np.ndarray,\n    beta: np.ndarray,\n    eps: float = 1e-5\n) -> tuple[np.ndarray, dict]: ...\n# x: shape (..., D)\n# gamma, beta: shape (D,)\n# Returns: (normalized_output: np.ndarray, cache: dict)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, eps: float = 1e-5) -> tuple[np.ndarray, dict]:\n    \"\"\"Compute Layer Normalization over the last dimension.\"\"\"\n    # TODO: Compute mean and variance along axis=-1 with keepdims=True\n    # TODO: Normalize x to zero-mean and unit-variance\n    # TODO: Scale by gamma and shift by beta\n    # TODO: Return normalized array and cache dict\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Layer Normalization & Invariant Internal Covariate Shift?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تطبيع الطبقات وثبات التحول الداخلي للمتغيرات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Root Mean Square Normalization (RMSNorm) & Scale Highway",
    "titleAr": "تطبيع متوسط المربعات الجذري وطريق التدفق القياسي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Layer Normalization achieved monumental success in early Transformer architectures (original Transformer, BERT, GPT-2), researchers no...",
      "ar": "تعمل تقنية \"تطبيع متوسط المربعات الجذري\" (RMSNorm) على تبسيط تطبيع الطبقات التقليدي عبر إقصاء خطوة حساب المتوسط وطرحه، وإلغاء متجهات الانحيا..."
    },
    "prerequisites": [
      "momentum-rmsprop-adaptive"
    ],
    "x": 1100,
    "y": 840,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ResidualHighwayLab",
        "narrative": {
          "en": "While Layer Normalization achieved monumental success in early Transformer architectures (original Transformer, BERT, GPT-2), researchers noticed a curious empirical property: the computational overhead of computing the mean $\\mu$, subtracting it from every feature coordinate, and tracking the backward gradients through the mean subtraction was consuming significant GPU memory bandwidth without offering substantial regularization benefits.\n\nIn 2019, Biao Zhang and Rico Sennrich conducted an in-depth empirical investigation: does the mean-centering property ($\\mathbf{x} - \\mu$) actually matte",
          "ar": "تعمل تقنية \"تطبيع متوسط المربعات الجذري\" (RMSNorm) على تبسيط تطبيع الطبقات التقليدي عبر إقصاء خطوة حساب المتوسط وطرحه، وإلغاء متجهات الانحياز الإضافية. ومن خلال معايرة التمثيلات الخفية حصراً بناءً على جذر متوسط مربعاتها، تحافظ RMSNorm على خاصية ثبات المقياس الرياضي مع تقليل عمليات قراءة وكتابة الذاكرة. يثمر هذا التبسيط سرعة تنفيذ أعلى لكيرنل المعالجة وتقليلاً للضغط على ناقل الذاكرة دون أي مساومة على جودة النموذج أو استقرار تدريبه."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RMS}(\\mathbf{x}) = \\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\epsilon}, \\quad \\bar{x}_i = \\frac{x_i}{\\text{RMS}(\\mathbf{x})} \\gamma_i",
        "formulaNote": {
          "en": "Core invariant for Root Mean Square Normalization (RMSNorm) & Scale Highway.",
          "ar": "الخاصية الرياضية الجوهرية لـ تطبيع متوسط المربعات الجذري وطريق التدفق القياسي."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-adamw-weight-decay-schedules",
          "starterCode": "def rms_norm_forward(\n    x: np.ndarray,\n    gamma: np.ndarray,\n    eps: float = 1e-6,\n    residual: np.ndarray | None = None\n) -> tuple[np.ndarray, np.ndarray]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def rms_norm_forward(\n    x: np.ndarray,\n    gamma: np.ndarray,\n    eps: float = 1e-6,\n    residual: np.ndarray | None = None\n) -> tuple[np.ndarray, np.ndarray]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"Compute RMSNorm with optional residual addition.\"\"\"\n    # TODO: Add residual if provided\n    # TODO: Compute root mean square over last dimension\n    # TODO: Scale by gamma and return (output, active_residual_state)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Root Mean Square Normalization (RMSNorm) & Scale Highway?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تطبيع متوسط المربعات الجذري وطريق التدفق القياسي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Gated Recurrent Architectures (GRU/LSTM) & Linear State Pass-Through",
    "titleAr": "الهياكل التكرارية ذات البوابات (GRU/LSTM) وممر الحالة الخطي",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Standard Recurrent Neural Networks (vanilla RNNs) process sequences sequentially: $\\mathbf{h}_t = \\tanh(\\mathbf{W}_{hh} \\mathbf{h}_{t-1} + \\...",
      "ar": "تحل الهياكل التكرارية ذات البوابات معضلة تلاشي التدرجات في الشبكات التكرارية التقليدية عبر إنشاء ممر خطي تراكمي لنقل حالة الخلية عبر الزمن. ..."
    },
    "prerequisites": [
      "two-layer-mlp-xor-boundary"
    ],
    "x": 1125,
    "y": 935,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RnnUnrollCanvas",
        "narrative": {
          "en": "Standard Recurrent Neural Networks (vanilla RNNs) process sequences sequentially: $\\mathbf{h}_t = \\tanh(\\mathbf{W}_{hh} \\mathbf{h}_{t-1} + \\mathbf{W}_{xh} \\mathbf{x}_t)$. When calculating the gradient with respect to early hidden states $\\mathbf{h}_0$ across $T$ timesteps, the chain rule requires multiplying $T$ Jacobian matrices:",
          "ar": "تحل الهياكل التكرارية ذات البوابات معضلة تلاشي التدرجات في الشبكات التكرارية التقليدية عبر إنشاء ممر خطي تراكمي لنقل حالة الخلية عبر الزمن. تختزل \"الوحدة التكرارية ذات البوابات\" (GRU) تعقيدات بوابات LSTM المتعددة في بوابتين متناسقتين: بوابة إعادة الضبط $\\mathbf{r}_t$ التي تمحو السياق التاريخي غير الضروري، وبوابة التحديث $\\mathbf{z}_t$ التي تفصل بين الاحتفاظ بالحالة السابقة $\\mathbf{h}_{t-1}$ وكتابة ميزات مرشحة جديدة $\\tilde{\\mathbf{h}}_t$. يحفظ هذا الاستيفاء الخطي تدفق التدرج دون اضمحلال عبر آلاف الخطوات الزمنية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}_0} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}_T} \\prod_{t=1}^T \\frac{\\partial \\mathbf{h}_t}{\\partial \\mathbf{h}_{t-1}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}_T} \\prod_{t=1}^T \\text{diag}(1 - \\mathbf{h}_t^2) \\mathbf{W}_{hh}^T",
        "formulaNote": {
          "en": "Core invariant for Gated Recurrent Architectures (GRU/LSTM) & Linear State Pass-Through.",
          "ar": "الخاصية الرياضية الجوهرية لـ الهياكل التكرارية ذات البوابات (GRU/LSTM) وممر الحالة الخطي."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-batch-normalization-internal-covariate",
          "starterCode": "def gru_cell_forward(\n    x_t: np.ndarray, h_prev: np.ndarray,\n    W_z: np.ndarray, U_z: np.ndarray, b_z: np.ndarray,\n    W_r: np.ndarray, U_r: np.ndarray, b_r: np.ndarray,\n    W_h: np.ndarray, U_h: np.ndarray, b_h: np.ndarray\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def gru_cell_forward(\n    x_t: np.ndarray, h_prev: np.ndarray,\n    W_z: np.ndarray, U_z: np.ndarray, b_z: np.ndarray,\n    W_r: np.ndarray, U_r: np.ndarray, b_r: np.ndarray,\n    W_h: np.ndarray, U_h: np.ndarray, b_h: np.ndarray\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef sigmoid(z):\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))\n\ndef gru_cell_forward(x_t, h_prev, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h):\n    \"\"\"Execute a single GRU step.\"\"\"\n    # TODO: Compute reset gate r_t\n    # TODO: Compute update gate z_t\n    # TODO: Compute candidate hidden state h_tilde using r_t * h_prev\n    # TODO: Blend previous state and candidate state\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Gated Recurrent Architectures (GRU/LSTM) & Linear State Pass-Through?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الهياكل التكرارية ذات البوابات (GRU/LSTM) وممر الحالة الخطي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Byte-Pair Encoding (BPE) Vocabulary Training from Scratch",
    "titleAr": "تدريب قاموس الترميز بزوج البايتات (BPE) من الصفر",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A neural network cannot directly ingest raw ASCII or Unicode text strings like \"The cat sat on the mat\"; it can only multiply tensors of rea...",
      "ar": "تبني خوارزمية \"الترميز بزوج البايتات\" (BPE) قاموساً فرعياً مثالياً للكلمات عبر دمج تكراري لأزواج الرموز الأكثر تواتراً. فمن خلال البدء من ال..."
    },
    "prerequisites": [
      "batch-normalization-internal-covariate"
    ],
    "x": 1100,
    "y": 1030,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LstmCellHighwayLab",
        "narrative": {
          "en": "A neural network cannot directly ingest raw ASCII or Unicode text strings like \"The cat sat on the mat\"; it can only multiply tensors of real numbers. How do we map discrete language into numerical indices?\n1. Character-level Tokenization: Treats each character as a token. Vocabulary is tiny (~256 bytes), eliminating out-of-vocabulary (OOV) errors, but sequence length explodes (a 500-word paragraph becomes 3,000 tokens), making self-attention prohibitively expensive ($O(N^2)$).\n2. Word-level Tokenization: Splits by whitespace. Sequences are short, but the vocabulary explodes into mil",
          "ar": "تبني خوارزمية \"الترميز بزوج البايتات\" (BPE) قاموساً فرعياً مثالياً للكلمات عبر دمج تكراري لأزواج الرموز الأكثر تواتراً. فمن خلال البدء من المستوى الذري للبايتات الخام ودمج الأزواج المتجاورة الأكثر شيوعاً في كل دورة، تختزل BPE السلاسل الحرفية المكررة في رموز فرعية موجزة، مع الاحتفاظ التام بالقدرة على تفكيك أي كلمة نادرة إلى بايتاتها الأصلية. يمحو هذا الإجراء مشكلة الكلمات المجهولة (OOV) ويحافظ على الروابط الصرفية والدلالية لجذور الكلمات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{V}_0 = \\{0, 1, 2, \\dots, 255\\} \\quad \\text{(Initial Byte Alphabet, } |\\mathcal{V}_0| = 256\\text{)}",
        "formulaNote": {
          "en": "Core invariant for Byte-Pair Encoding (BPE) Vocabulary Training from Scratch.",
          "ar": "الخاصية الرياضية الجوهرية لـ تدريب قاموس الترميز بزوج البايتات (BPE) من الصفر."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-layer-normalization-invariance",
          "starterCode": "def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]: ...\n# corpus: list of string sentences/documents\n# num_merges: number of merge rules to learn\n# Returns: ordered list of learned merge tuples (token_A, token_B)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]: ...\n# corpus: list of string sentences/documents\n# num_merges: number of merge rules to learn\n# Returns: ordered list of learned merge tuples (token_A, token_B)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]:\n    \"\"\"Extract BPE merge rules from corpus.\"\"\"\n    # TODO: 1. Tokenize corpus words into tuples of characters with '</w>'\n    # TODO: 2. Iteratively count adjacent pair frequencies across all words\n    # TODO: 3. Select most frequent pair, append to merges list, and update word tuples\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Byte-Pair Encoding (BPE) Vocabulary Training from Scratch?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تدريب قاموس الترميز بزوج البايتات (BPE) من الصفر؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Byte-Level Subword Segmentation & Merging Pipeline",
    "titleAr": "تجزئة الكلمات الفرعية على مستوى البايت وخط معالجة الدمج",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Once a BPE tokenizer has been trained, it possesses an ordered dictionary of merge rules:...",
      "ar": "تطبق عملية التجزئة أثناء الاستدلال (BPE Segmentation) قواعد الدمج المتعلمة حتمياً على أي نص وارد بناءً على أولوية الرتبة (Rank Priority). فم..."
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
        "simulation": "BpeTokenizerLab",
        "narrative": {
          "en": "Once a BPE tokenizer has been trained, it possesses an ordered dictionary of merge rules:",
          "ar": "تطبق عملية التجزئة أثناء الاستدلال (BPE Segmentation) قواعد الدمج المتعلمة حتمياً على أي نص وارد بناءً على أولوية الرتبة (Rank Priority). فمن خلال فحص أزواج الرموز المتجاورة وتنفيذ الدمج الصالح صاحب الرتبة الأدنى (الأعلى أولوية تاريخياً)، يجمع المحلل الرموز الذرية تدريجياً وبطريقة طماعة لتشكيل أكبر وحدات فرعية ممكنة مسجلة في القاموس. يثمر هذا التجميع الهرمي تمثيلاً موجزاً للنصوص مع ضمان إعادة بنائها دون أدنى فقدان للمعلومات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{M} = \\left[ (u_1, v_1) \\to r_1, \\; (u_2, v_2) \\to r_2, \\; \\dots, \\; (u_K, v_K) \\to r_K \\right]",
        "formulaNote": {
          "en": "Core invariant for Byte-Level Subword Segmentation & Merging Pipeline.",
          "ar": "الخاصية الرياضية الجوهرية لـ تجزئة الكلمات الفرعية على مستوى البايت وخط معالجة الدمج."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-rmsnorm-residual-highways",
          "starterCode": "def bpe_encode(\n    text: str,\n    merges: list[tuple[str, str]],\n    vocab: dict[str, int]\n) -> list[int]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def bpe_encode(\n    text: str,\n    merges: list[tuple[str, str]],\n    vocab: dict[str, int]\n) -> list[int]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "def bpe_encode(text: str, merges: list[tuple[str, str]], vocab: dict[str, int]) -> list[int]:\n    \"\"\"Encode raw text into token IDs using learned BPE merges.\"\"\"\n    # TODO: 1. Split text into words and decompose into characters + '</w>'\n    # TODO: 2. Sequentially apply merge rules in priority order\n    # TODO: 3. Map resulting tokens to IDs in vocab (fallback to <unk> if missing)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Byte-Level Subword Segmentation & Merging Pipeline?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تجزئة الكلمات الفرعية على مستوى البايت وخط معالجة الدمج؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Scaled Dot-Product Attention & Temperature Entropy Dynamics",
    "titleAr": "آلية الانتباه بالضرب النقطي المقاس وديناميكيات إنتروبيا درجة الحرارة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In sequence processing, the fundamental challenge is contextual routing: how should a word like \"bank\" determine whether it refers to a rive...",
      "ar": "توجه آلية \"الانتباه بالضرب النقطي المقاس\" تدفق المعلومات بين عناصر السلسلة عبر قياس التشابه المستمر. تستجوب متجهات الاستعلام (Queries) متجها..."
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
        "simulation": "AttentionHeatmapCanvas",
        "narrative": {
          "en": "In sequence processing, the fundamental challenge is contextual routing: how should a word like \"bank\" determine whether it refers to a river edge or a financial institution? It must query the other words in the sentence (e.g. \"water\" vs \"money\"), measure their relevance, and pull relevant information into its own representation.\n\nVaswani et al. (2017) formalized this as Scaled Dot-Product Attention using the classic information retrieval metaphor of Queries ($\\mathbf{Q}$), Keys ($\\mathbf{K}$), and Values ($\\mathbf{V}$):\n1. Query ($\\mathbf{Q}$): What the current token is looking",
          "ar": "توجه آلية \"الانتباه بالضرب النقطي المقاس\" تدفق المعلومات بين عناصر السلسلة عبر قياس التشابه المستمر. تستجوب متجهات الاستعلام (Queries) متجهات المفاتيح (Keys) عبر الضرب الداخلي لبناء مصفوفة ألفة، ثم تُعاير هذه المصفوفة عبر دالة التوزيع الاحتمالي (Softmax) لتشكيل أوزان ترجيحية تُسقط على متجهات القيم (Values). يعاكس معامل التقسيم $\\frac{1}{\\sqrt{d_k}}$ التضخم البعدي لتباين الضرب النقطي في الفضاءات عالية الأبعاد، مانعاً تشبع دالة Softmax وتلاشي تدرجاتها العكسية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "S_{ij} = \\sum_{k=1}^{d_k} q_k k_k",
        "formulaNote": {
          "en": "Core invariant for Scaled Dot-Product Attention & Temperature Entropy Dynamics.",
          "ar": "الخاصية الرياضية الجوهرية لـ آلية الانتباه بالضرب النقطي المقاس وديناميكيات إنتروبيا درجة الحرارة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-cnn-convolution",
          "starterCode": "def scaled_dot_product_attention(\n    Q: np.ndarray,\n    K: np.ndarray,\n    V: np.ndarray,\n    scale: float | None = None\n) -> tuple[np.ndarray, np.ndarray]: ...\n# Q: (..., S_q, d_k), K: (..., S_k, d_k), V: (..., S_k, d_v)\n# Returns: (output: (..., S_q, d_v), weights: (..., S_q, S_k))",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def scaled_dot_product_attention(\n    Q: np.ndarray,\n    K: np.ndarray,\n    V: np.ndarray,\n    scale: float | None = None\n) -> tuple[np.ndarray, np.ndarray]: ...\n# Q: (..., S_q, d_k), K: (..., S_k, d_k), V: (..., S_k, d_v)\n# Returns: (output: (..., S_q, d_v), weights: (..., S_q, S_k))",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"Compute scaled dot-product attention with stable softmax.\"\"\"\n    # TODO: 1. Set scale = 1.0 / sqrt(d_k) if scale is None\n    # TODO: 2. Compute Q @ K^T * scale\n    # TODO: 3. Compute row-wise stable softmax\n    # TODO: 4. Compute attention_weights @ V\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Scaled Dot-Product Attention & Temperature Entropy Dynamics?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم آلية الانتباه بالضرب النقطي المقاس وديناميكيات إنتروبيا درجة الحرارة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Causal Autoregressive Masking & Directed Information Flow",
    "titleAr": "الحجب السببي التوليدي وتوجيه تدفق المعلومات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In bidirectional language models like BERT, every token can attend to every other token, both in the past and in the future. For example, wh...",
      "ar": "يفرض \"الحجب السببي التوليدي\" (Causal Masking) سهم الزمن الصارم في نماذج المحولات التوليدية المقتصرة على فك التشفير (Decoder-only). وعبر دمج ..."
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
        "simulation": "CausalMaskLab",
        "narrative": {
          "en": "In bidirectional language models like BERT, every token can attend to every other token, both in the past and in the future. For example, when reading \"The [MASK] sat on the mat\", attending to \"mat\" provides strong evidence that the masked word is \"cat\".\n\nHowever, in generative autoregressive language modeling (GPT-4, Claude, LLaMA), the task is fundamentally chronological: the model must predict token $t+1$ given only tokens $1, \\dots, t$. If token $i$ is permitted to attend to token $j$ where $j > i$, the model can simply look ahead into the future, trivially \"cheating\" during traini",
          "ar": "يفرض \"الحجب السببي التوليدي\" (Causal Masking) سهم الزمن الصارم في نماذج المحولات التوليدية المقتصرة على فك التشفير (Decoder-only). وعبر دمج قناع مصفوفي مثلثي علوي محشو بقيم سالب المالانهاية ($-\\infty$) ضمن مصفوفة الألفة قبل دالة Softmax، تؤول أوزان الانتباه لكافة المواقع المستقبلية $j > i$ إلى الصفر الرياضي المطلق ($e^{-\\infty} = 0$). يضمن هذا القيد السببي تدريباً متوازياً فائق السرعة عبر كامل السلسلة مع التأكيد الرياضي على أن التنبؤ عند اللحظة $t$ يعتمد حصراً على سياق اللحظات السابقة والمعاصرة $\\le t$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "M_{ij} = \\begin{cases} 0 & \\text{if } j \\le i \\\\ -\\infty & \\text{if } j > i \\end{cases}",
        "formulaNote": {
          "en": "Core invariant for Causal Autoregressive Masking & Directed Information Flow.",
          "ar": "الخاصية الرياضية الجوهرية لـ الحجب السببي التوليدي وتوجيه تدفق المعلومات."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-stride-padding-receptive-fields",
          "starterCode": "def causal_attention(\n    Q: np.ndarray,\n    K: np.ndarray,\n    V: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def causal_attention(\n    Q: np.ndarray,\n    K: np.ndarray,\n    V: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"Compute causal autoregressive attention.\"\"\"\n    # TODO: Compute scaled dot-product scores\n    # TODO: Create upper-triangular boolean mask (j > i) and fill with -1e9\n    # TODO: Softmax and project with V\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Causal Autoregressive Masking & Directed Information Flow?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الحجب السببي التوليدي وتوجيه تدفق المعلومات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Multi-Head Attention (MHA) & Subspace Projection Routing",
    "titleAr": "الانتباه متعدد الرؤوس وتوجيه الإسقاط في الفضاءات الجزئية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A single self-attention head computes a single convex combination of value vectors:...",
      "ar": "تُمكّن آلية \"الانتباه متعدد الرؤوس\" (Multi-Head Attention) نماذج المحولات من استيعاب المعلومات والتركيز المشترك على فضاءات تمثيلية جزئية متع..."
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
        "simulation": "MultiHeadAttentionLab",
        "narrative": {
          "en": "A single self-attention head computes a single convex combination of value vectors:",
          "ar": "تُمكّن آلية \"الانتباه متعدد الرؤوس\" (Multi-Head Attention) نماذج المحولات من استيعاب المعلومات والتركيز المشترك على فضاءات تمثيلية جزئية متعددة في مواضع مختلفة من السلسلة. فعبر إسقاط الاستعلامات والمفاتيح والقيم في $H$ فضاءات فرعية منخفضة الأبعاد ($d_k = d_{\\text{model}} / H$)، يتخصص كل رأس انتباه في التقاط ميزات لغوية أو تركيبية أو دلالية متباينة. يتم بعد ذلك دمج المخرجات المتوازية وإسقاطها خطياً عبر المصفوفة $\\mathbf{W}_O$ لصهر السياقات المتعددة دون زيادة التكلفة الحسابية الإجمالية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y}_i = \\sum_{j} A_{ij} \\mathbf{v}_j",
        "formulaNote": {
          "en": "Core invariant for Multi-Head Attention (MHA) & Subspace Projection Routing.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانتباه متعدد الرؤوس وتوجيه الإسقاط في الفضاءات الجزئية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-resnet-residual-skip-connections",
          "starterCode": "def multi_head_attention_forward(\n    X: np.ndarray,\n    W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray,\n    num_heads: int,\n    is_causal: bool = False\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def multi_head_attention_forward(\n    X: np.ndarray,\n    W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray,\n    num_heads: int,\n    is_causal: bool = False\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef multi_head_attention_forward(X, W_q, W_k, W_v, W_o, num_heads, is_causal=False):\n    \"\"\"Execute full Multi-Head Attention forward pass.\"\"\"\n    # TODO: 1. Project Q, K, V\n    # TODO: 2. Reshape and transpose to (B, num_heads, S, d_k)\n    # TODO: 3. Compute batched scaled dot-product attention with optional causal mask\n    # TODO: 4. Concatenate heads back to (B, S, D) and project via W_o\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Multi-Head Attention (MHA) & Subspace Projection Routing?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الانتباه متعدد الرؤوس وتوجيه الإسقاط في الفضاءات الجزئية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Rotary Position Embeddings (RoPE) & Complex Phasors",
    "titleAr": "التضمينات الموضعية الدورانية (RoPE) وأطوار الأعداد المركبة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Self-attention is fundamentally permutation-equivariant: if you scramble the words in a sentence into random order, the attention mechanism ...",
      "ar": "تدمج \"التضمينات الموضعية الدورانية\" (RoPE) الموضع النسبي داخل آلية الانتباه عبر مؤثرات تدوير متعامدة ثنائية الأبعاد. ومن خلال تجميع إحداثيات..."
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
        "simulation": "RoPEPhasorCanvas",
        "narrative": {
          "en": "Self-attention is fundamentally permutation-equivariant: if you scramble the words in a sentence into random order, the attention mechanism computes the exact same set of representations, merely permuted in position. To understand grammar, word order, and context, the Transformer must be explicitly injected with positional information.\n\nEarly models used Absolute Positional Embeddings (APE):\n1. Sinusoidal encodings (Vaswani et al. 2017): $\\mathbf{x}_m = \\mathbf{e}_m + \\mathbf{p}_m$.\n2. Learned position tables (GPT-2, BERT): A learned lookup table $\\mathbf{P} \\in \\mathbb{R}^{L_{\\max} \\t",
          "ar": "تدمج \"التضمينات الموضعية الدورانية\" (RoPE) الموضع النسبي داخل آلية الانتباه عبر مؤثرات تدوير متعامدة ثنائية الأبعاد. ومن خلال تجميع إحداثيات الميزات في أزواج ثنائية وتدويرها في المستوى المركب بزاوية تتناسب طردياً مع موضع الرمز $m$ وتردده الهندسي $\\theta_i$، تضمن RoPE أن حاصل الضرب الداخلي بين الاستعلامات والمفاتيح يعتمد حصراً على المسافة النسبية $(m - n)$. يحفظ هذا التأصيل الهندسي أطوال المتجهات ويمكن النماذج من استيعاب سياقات نصية فائقة الطول."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\langle \\mathbf{R}_m \\mathbf{q}, \\mathbf{R}_n \\mathbf{k} \\rangle = g(\\mathbf{q}, \\mathbf{k}, m - n)",
        "formulaNote": {
          "en": "Core invariant for Rotary Position Embeddings (RoPE) & Complex Phasors.",
          "ar": "الخاصية الرياضية الجوهرية لـ التضمينات الموضعية الدورانية (RoPE) وأطوار الأعداد المركبة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-recurrent-neural-networks-bptt",
          "starterCode": "def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray: ...\n# x: shape (B, S, D) where D is even\n# Returns: rotated tensor of shape (B, S, D)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray: ...\n# x: shape (B, S, D) where D is even\n# Returns: rotated tensor of shape (B, S, D)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray:\n    \"\"\"Apply 2D Rotary Position Embeddings (RoPE).\"\"\"\n    # TODO: 1. Calculate inverse frequency theta for i in [0, D/2 - 1]\n    # TODO: 2. Compute phase angles m * theta for sequence positions m in [0, S - 1]\n    # TODO: 3. Perform 2D rotation on adjacent (even, odd) features\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Rotary Position Embeddings (RoPE) & Complex Phasors?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التضمينات الموضعية الدورانية (RoPE) وأطوار الأعداد المركبة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "SwiGLU Gated Feed-Forward Networks & Bilinear Representations",
    "titleAr": "شبكات التغذية الأمامية ذات البوابات SwiGLU والتمثيلات ثنائية الخطية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the original Transformer architecture, the Feed-Forward Network (FFN) following self-attention is a simple two-layer Multi-Layer Perceptr...",
      "ar": "تستبدل بنية SwiGLU شبكات التغذية الأمامية التقليدية بتحويل ثنائي الخطية مزود ببوابة تحكم ديناميكية. وعبر حساب حاصل الضرب النقطي العنصري (Had..."
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
        "simulation": "PrePostLnHighwayLab",
        "narrative": {
          "en": "In the original Transformer architecture, the Feed-Forward Network (FFN) following self-attention is a simple two-layer Multi-Layer Perceptron (MLP) with a ReLU activation:",
          "ar": "تستبدل بنية SwiGLU شبكات التغذية الأمامية التقليدية بتحويل ثنائي الخطية مزود ببوابة تحكم ديناميكية. وعبر حساب حاصل الضرب النقطي العنصري (Hadamard Product) بين مسار بوابة مفعلة بدالة Swish ومسار محتوى خطي متوازٍ قبل الإسقاط النهائي، تتيح SwiGLU تعديلاً تكيفياً لقنوات الميزات بناءً على السياق اللحظي. يمنح هذا التفاعل التضاعفي الشبكة قدرة تعبيرية فائقة لنمذجة العلاقات الدلالية المعقدة بنسبة حيرة (Perplexity) أقل بكثير مقارنة بشبكات ReLU أو GELU الكلاسيكية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{FFN}(x) = \\max(0, x \\mathbf{W}_1 + \\mathbf{b}_1) \\mathbf{W}_2 + \\mathbf{b}_2",
        "formulaNote": {
          "en": "Core invariant for SwiGLU Gated Feed-Forward Networks & Bilinear Representations.",
          "ar": "الخاصية الرياضية الجوهرية لـ شبكات التغذية الأمامية ذات البوابات SwiGLU والتمثيلات ثنائية الخطية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-lstm-gru-gated-recurrent",
          "starterCode": "def swiglu_forward(\n    x: np.ndarray,\n    W_gate: np.ndarray,\n    W_up: np.ndarray,\n    W_down: np.ndarray\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def swiglu_forward(\n    x: np.ndarray,\n    W_gate: np.ndarray,\n    W_up: np.ndarray,\n    W_down: np.ndarray\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef swiglu_forward(x: np.ndarray, W_gate: np.ndarray, W_up: np.ndarray, W_down: np.ndarray) -> np.ndarray:\n    \"\"\"Compute SwiGLU gated feed-forward layer.\"\"\"\n    # TODO: 1. Project gate = x @ W_gate and compute Swish(gate)\n    # TODO: 2. Project up = x @ W_up\n    # TODO: 3. Bilinear element-wise multiply Swish(gate) * up\n    # TODO: 4. Project through W_down\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing SwiGLU Gated Feed-Forward Networks & Bilinear Representations?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم شبكات التغذية الأمامية ذات البوابات SwiGLU والتمثيلات ثنائية الخطية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Key-Value Caching (KV Cache) for O(1) Token Generation",
    "titleAr": "التخزين المؤقت للمفاتيح والقيم (KV Cache) لتوليد الرموز بتكلفة زمنية ثابتة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "During autoregressive text generation, a language model generates text token by token:...",
      "ar": "تلغي تقنية \"التخزين المؤقت للمفاتيح والقيم\" (KV Cache) التكرار الحسابي الهائل أثناء التوليد التتابعي للنصوص عبر حفظ موترات المفاتيح والقيم ا..."
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
        "simulation": "SwiGluKVCacheLab",
        "narrative": {
          "en": "During autoregressive text generation, a language model generates text token by token:",
          "ar": "تلغي تقنية \"التخزين المؤقت للمفاتيح والقيم\" (KV Cache) التكرار الحسابي الهائل أثناء التوليد التتابعي للنصوص عبر حفظ موترات المفاتيح والقيم السابقة في ذاكرة المعالج الرسومي (GPU VRAM). وبفضل خاصية الحجب السببي التي تمنع الرموز المستقبلية من تعديل التمثيلات التاريخية السابقة، تظل المفاتيح والقيم المحسوبة سالفاً ثابتة تماماً. يتيح تخزينها للنموذج تمرير الرمز الجديد المنفرد فقط عند كل خطوة توليد، مما يحول التعقيد الحسابي لكل رمز من تعقيد تربيعي مفرط إلى بحث خطي مباشر وفائق السرعة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Step 1: } x_1 \\to x_2, \\quad \\text{Step 2: } [x_1, x_2] \\to x_3, \\quad \\text{Step 3: } [x_1, x_2, x_3] \\to x_4",
        "formulaNote": {
          "en": "Core invariant for Key-Value Caching (KV Cache) for O(1) Token Generation.",
          "ar": "الخاصية الرياضية الجوهرية لـ التخزين المؤقت للمفاتيح والقيم (KV Cache) لتوليد الرموز بتكلفة زمنية ثابتة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bpe-tokenization",
          "starterCode": "def kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def kv_cache_decoder_step(\n    x_t: np.ndarray,\n    k_cache: np.ndarray | None,\n    v_cache: np.ndarray | None,\n    W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef kv_cache_decoder_step(x_t, k_cache, v_cache, W_q, W_k, W_v, W_o):\n    \"\"\"Execute single-step token inference with KV caching.\"\"\"\n    # TODO: 1. Project q_t, k_t, v_t for single token x_t\n    # TODO: 2. Concatenate k_t and v_t with k_cache and v_cache along axis=1\n    # TODO: 3. Compute attention between single query q_t and full key cache\n    # TODO: 4. Project attended context through W_o and return updated state\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Key-Value Caching (KV Cache) for O(1) Token Generation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التخزين المؤقت للمفاتيح والقيم (KV Cache) لتوليد الرموز بتكلفة زمنية ثابتة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Grouped-Query Attention (GQA) & Multi-Query Memory Footprint",
    "titleAr": "الانتباه باستعلامات مجمعة (GQA) وبصمة ذاكرة الاستعلامات المتعددة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "In modern Large Language Models, the primary bottleneck during autoregressive decoding is not raw arithmetic compute (FLOPs)—it is memory ba...",
      "ar": "تمثل آلية \"الانتباه باستعلامات مجمعة\" (GQA) حلاً وسطاً مثالياً بين الانتباه متعدد الرؤوس (MHA) والانتباه متعدد الاستعلامات (MQA) لكسر عنق زج..."
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
        "simulation": "GqaMemoryBandwidthLab",
        "narrative": {
          "en": "In modern Large Language Models, the primary bottleneck during autoregressive decoding is not raw arithmetic compute (FLOPs)—it is memory bandwidth. During inference, at each token step, the GPU must stream gigabytes of historical KV cache tensors from High Bandwidth Memory (HBM) into on-chip registers just to multiply them by a tiny single-token query vector. The GPU's compute cores spend over 80% of their clock cycles idle, stalled waiting for memory transfers.\n\nConsider the spectrum of attention head topologies:\n1. Multi-Head Attention (MHA): Has $H$ query heads, $H$ key heads, and",
          "ar": "تمثل آلية \"الانتباه باستعلامات مجمعة\" (GQA) حلاً وسطاً مثالياً بين الانتباه متعدد الرؤوس (MHA) والانتباه متعدد الاستعلامات (MQA) لكسر عنق زجاجة نطاق الذاكرة أثناء التوليد التتابعي. فعبر تقسيم رؤوس الاستعلام $H_q$ إلى $G$ مجموعات تشترك كل منها في زوج واحد من رؤوس المفاتيح والقيم ($H_{kv} = G$)، تقلص GQA الحجم الفعلي لمخزن KV المؤقت بمعامل مقداره $H_q / G$. وأثناء الحساب، يتم توسيع موترات المفاتيح والقيم المشتركة عبر البث المتكرر عبر مجموعات الاستعلام، مما يحفظ جودة التمثيل اللغوي مع خفض استهلاك نطاق الذاكرة بشكل جذري."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Query Heads: } H_q, \\quad \\text{KV Heads: } H_{kv} = G, \\quad \\text{Group Ratio: } R = \\frac{H_q}{H_{kv}} = \\frac{H_q}{G} \\in \\mathbb{Z}^+",
        "formulaNote": {
          "en": "Core invariant for Grouped-Query Attention (GQA) & Multi-Query Memory Footprint.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانتباه باستعلامات مجمعة (GQA) وبصمة ذاكرة الاستعلامات المتعددة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-vocabulary-engineering-special-tokens",
          "starterCode": "def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray: ...\n# x: (B, n_kv, S, d_k)\n# n_rep: number of times each head is repeated (G = n_q / n_kv)\n# Returns: (B, n_kv * n_rep, S, d_k)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray: ...\n# x: (B, n_kv, S, d_k)\n# n_rep: number of times each head is repeated (G = n_q / n_kv)\n# Returns: (B, n_kv * n_rep, S, d_k)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:\n    \"\"\"Broadcast KV heads across query head groups.\"\"\"\n    # TODO: If n_rep == 1, return x directly\n    # TODO: Expand dimension and repeat along head axis\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Grouped-Query Attention (GQA) & Multi-Query Memory Footprint?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الانتباه باستعلامات مجمعة (GQA) وبصمة ذاكرة الاستعلامات المتعددة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Online Softmax Normalization & Dynamic Scale Invariance",
    "titleAr": "معايرة التوزيع الاحتمالي اللحظية (Online Softmax) والثبات الديناميكي للمقياس",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Standard softmax applied to a row vector $\\mathbf{x} = [x_1, \\dots, x_N] \\in \\mathbb{R}^N$ is historically computed in three distinct sequen...",
      "ar": "تتيح خوارزمية \"معايرة التوزيع الاحتمالي اللحظية\" (Online Softmax) معايرة متجهات القيم المتدفقة في مسار حسابي واحد ودون الحاجة لمعرفة القيمة ..."
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
        "simulation": "FlashAttentionMemoryLab",
        "narrative": {
          "en": "Standard softmax applied to a row vector $\\mathbf{x} = [x_1, \\dots, x_N] \\in \\mathbb{R}^N$ is historically computed in three distinct sequential passes:\n1. Pass 1 (Max Finding): $m = \\max_{i=1}^N x_i$ (for numerical stability).\n2. Pass 2 (Summing Exponentials): $l = \\sum_{i=1}^N e^{x_i - m}$.\n3. Pass 3 (Normalization & Output): $p_i = \\frac{e^{x_i - m}}{l}$ and $y = \\sum_{i=1}^N p_i v_i$.\n\nIn deep learning hardware, this three-pass loop is disastrous when sequence length $N$ is large (e.g. $N = 4096$ or $128,000$). The intermediate scores $\\mathbf{S} = \\mathbf{Q}\\mathbf{K}^T$ f",
          "ar": "تتيح خوارزمية \"معايرة التوزيع الاحتمالي اللحظية\" (Online Softmax) معايرة متجهات القيم المتدفقة في مسار حسابي واحد ودون الحاجة لمعرفة القيمة العظمى الإجمالية مسبقاً. فمن خلال الاحتفاظ بإحصائيات تتبع ديناميكية — تشمل القيمة العظمى اللحظية $m$ ومجموع المعايرة اللحظي $l$ — وإعادة قياس التراكمات الجزئية السابقة بضربها في الفارق الأسي $e^{m_{\\text{old}} - m_{\\text{new}}}$، تحسب الخوارزمية نواتج Softmax الرياضية بدقة مطلقة وتدريجية. يلغي هذا التطابق الجبري الحاجة إلى مزامنة الذاكرة متعددة المراحل، مما يشكل النواة الحسابية الثورية لخوارزمية FlashAttention."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "m_{\\text{new}} = \\max(m_A, m_B)",
        "formulaNote": {
          "en": "Core invariant for Online Softmax Normalization & Dynamic Scale Invariance.",
          "ar": "الخاصية الرياضية الجوهرية لـ معايرة التوزيع الاحتمالي اللحظية (Online Softmax) والثبات الديناميكي للمقياس."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-transformer-attention",
          "starterCode": "def online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def online_softmax_step(\n    m_prev: np.ndarray,\n    l_prev: np.ndarray,\n    O_prev: np.ndarray,\n    S_block: np.ndarray,\n    V_block: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef online_softmax_step(m_prev, l_prev, O_prev, S_block, V_block):\n    \"\"\"Execute a single FlashAttention online softmax update step.\"\"\"\n    # TODO: 1. Compute m_new = max(m_prev, max(S_block))\n    # TODO: 2. Compute rescale factor alpha = exp(m_prev - m_new)\n    # TODO: 3. Compute P_block = exp(S_block - m_new)\n    # TODO: 4. Rescale and accumulate l_new and O_new\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Online Softmax Normalization & Dynamic Scale Invariance?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم معايرة التوزيع الاحتمالي اللحظية (Online Softmax) والثبات الديناميكي للمقياس؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "FlashAttention: SRAM Tiling & IO-Aware Kernel Execution",
    "titleAr": "خوارزمية FlashAttention: التبليط في ذاكرة SRAM والتنفيذ الواعي بحركة البيانات",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "To understand why Tri Dao et al. (2022, 2023) revolutionized AI hardware execution with FlashAttention, one must look at the physical archit...",
      "ar": "تُعد FlashAttention خوارزمية انتباه دقيقة واعية بمسارات الإدخال والإخراج (IO-aware)، صُممت لتسريع تدريب واستدلال نماذج المحولات عبر استغلال ..."
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
        "simulation": "FlashAttention2KernelLab",
        "narrative": {
          "en": "To understand why Tri Dao et al. (2022, 2023) revolutionized AI hardware execution with FlashAttention, one must look at the physical architecture of a modern GPU (such as an NVIDIA A100 or H100):\n1. High Bandwidth Memory (HBM / VRAM): Massive capacity (80 GB), but relatively slow bandwidth (~2.0 TB/s).\n2. Static Random-Access Memory (SRAM / Shared Memory): Located directly inside the streaming multiprocessors. Blazing fast (~19 TB/s, nearly $10\\times$ faster than HBM), but microscopic capacity (~192 KB per SM).\n\nIn standard PyTorch self-attention:",
          "ar": "تُعد FlashAttention خوارزمية انتباه دقيقة واعية بمسارات الإدخال والإخراج (IO-aware)، صُممت لتسريع تدريب واستدلال نماذج المحولات عبر استغلال التدرج الهرمي لذاكرة المعالجات الرسومية. فمن خلال تجزئة مصفوفات الاستعلامات والمفاتيح والقيم إلى كتل صغيرة تتسع داخل ذاكرة SRAM السريعة المدمجة بالمعالج، تحسب FlashAttention الانتباه باستخدام دالة Softmax اللحظية المدمجة دون كتابة مصفوفة الانتباه التربيعية $N \\times N$ إطلاقاً في ذاكرة HBM البطيئة. يقلص هذا الابتكار عمليات قراءة وكتابة الذاكرة من التعقيد التربيعي $O(N^2)$ إلى التعقيد الخطي $O(N)$، محققاً قفزات سرعة هائلة وتوفيراً جذرياً في الذاكرة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{S} = \\frac{\\mathbf{Q}\\mathbf{K}^T}{\\sqrt{d_k}} \\quad (\\text{writes } N \\times N \\text{ matrix to HBM})",
        "formulaNote": {
          "en": "Core invariant for FlashAttention: SRAM Tiling & IO-Aware Kernel Execution.",
          "ar": "الخاصية الرياضية الجوهرية لـ خوارزمية FlashAttention: التبليط في ذاكرة SRAM والتنفيذ الواعي بحركة البيانات."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multi-head-attention-projection",
          "starterCode": "def flash_attention_forward(\n    Q: np.ndarray,\n    K: np.ndarray,\n    V: np.ndarray,\n    block_r: int = 4,\n    block_c: int = 4\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def flash_attention_forward(\n    Q: np.ndarray,\n    K: np.ndarray,\n    V: np.ndarray,\n    block_r: int = 4,\n    block_c: int = 4\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef flash_attention_forward(Q, K, V, block_r=4, block_c=4):\n    \"\"\"Tiled FlashAttention forward algorithm.\"\"\"\n    # TODO: Initialize O, l, m arrays\n    # TODO: Outer loop over K, V blocks (columns)\n    # TODO: Inner loop over Q blocks (rows)\n    # TODO: Update running stats and normalize O by l at completion\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing FlashAttention: SRAM Tiling & IO-Aware Kernel Execution?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم خوارزمية FlashAttention: التبليط في ذاكرة SRAM والتنفيذ الواعي بحركة البيانات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Supervised Fine-Tuning (SFT) & Causal Loss Masking",
    "titleAr": "الضبط الدقيق الخاضع للإشراف (SFT) والحجب السببي لدالة الخسارة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "A base foundation model pretrained on trillions of tokens is a chaotic completion engine: if you prompt it with \"What is the capital of Fran...",
      "ar": "تعمل مرحلة \"الضبط الدقيق الخاضع للإشراف\" (SFT) على مواءمة النماذج اللغوية التأسيسية لتحويلها إلى مساعدات ذكية تتبع التعليمات عبر أزواج من ال..."
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
        "simulation": "PeftParameterLandscapeLab",
        "narrative": {
          "en": "A base foundation model pretrained on trillions of tokens is a chaotic completion engine: if you prompt it with \"What is the capital of France?\", it might complete the text with \"What is the capital of Germany? What is the capital of Italy?\" because it was trained on raw internet lists of geography quizzes. To transform this raw text predictor into an obedient, conversational AI assistant, we conduct Supervised Fine-Tuning (SFT) on curated instruction-response pairs:",
          "ar": "تعمل مرحلة \"الضبط الدقيق الخاضع للإشراف\" (SFT) على مواءمة النماذج اللغوية التأسيسية لتحويلها إلى مساعدات ذكية تتبع التعليمات عبر أزواج من الأسئلة والأجوبة النموذجية. ولمنع تشوه التدرجات أثناء التدريب، يطبق \"الحجب السببي لدالة الخسارة\" عبر استبدال مسميات الأهداف لكافة رموز السؤال برمز التجاهل ($-100$). تُحسب دالة الخسارة التقاطعية حصراً على رموز الإجابة، مما يضمن توجيه تحديثات المعاملات لتحسين جودة التوليد المشروط دون معاقبة النموذج على طبيعة مدخلات المستخدم."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{D}_{\\text{SFT}} = \\left\\{ (x_{\\text{prompt}}^{(i)}, y_{\\text{response}}^{(i)}) \\right\\}_{i=1}^M",
        "formulaNote": {
          "en": "Core invariant for Supervised Fine-Tuning (SFT) & Causal Loss Masking.",
          "ar": "الخاصية الرياضية الجوهرية لـ الضبط الدقيق الخاضع للإشراف (SFT) والحجب السببي لدالة الخسارة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-masking-scaled-dot-product",
          "starterCode": "def sft_masked_loss(\n    logits: np.ndarray,\n    labels: np.ndarray,\n    ignore_index: int = -100\n) -> tuple[float, int]: ...\n# logits: (B, S, V), labels: (B, S)\n# Returns: (mean_loss: float, active_token_count: int)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def sft_masked_loss(\n    logits: np.ndarray,\n    labels: np.ndarray,\n    ignore_index: int = -100\n) -> tuple[float, int]: ...\n# logits: (B, S, V), labels: (B, S)\n# Returns: (mean_loss: float, active_token_count: int)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef sft_masked_loss(logits: np.ndarray, labels: np.ndarray, ignore_index: int = -100) -> tuple[float, int]:\n    \"\"\"Compute masked SFT cross-entropy loss.\"\"\"\n    # TODO: 1. Filter out tokens where labels == ignore_index\n    # TODO: 2. Compute log-sum-exp over active vocabulary logits\n    # TODO: 3. Return mean loss over active tokens and active token count\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Supervised Fine-Tuning (SFT) & Causal Loss Masking?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الضبط الدقيق الخاضع للإشراف (SFT) والحجب السببي لدالة الخسارة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Low-Rank Adaptation (LoRA) & Intrinsic Rank Decompositions",
    "titleAr": "التكيف منخفض الرتبة (LoRA) وتفكيك الرتبة الجوهرية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "As frontier foundation models grew from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT) became computatio...",
      "ar": "تعمل تقنية \"التكيف منخفض الرتبة\" (LoRA) على نمذجة تحديثات الأوزان الخاصة بالمهام عبر تفكيك موتر التعديل إلى حاصل ضرب مصفوفات منخفضة الرتبة: ..."
    },
    "prerequisites": [
      "causal-masking-scaled-dot-product"
    ],
    "x": 1115,
    "y": 2170,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LoRASVDGeometryLab",
        "narrative": {
          "en": "As frontier foundation models grew from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT) became computationally intractable. Fine-tuning a 70B parameter model in FP16 requires storing:\n 140 GB of model weights.\n 140 GB of gradient tensors.\n 560 GB of AdamW optimizer states ($m_t, v_t$).\nTotal: nearly 1 Terabyte of GPU VRAM just to fine-tune a model! Furthermore, serving 1,000 different fine-tuned models for 1,000 enterprise customers would require storing 1,000 independent 140 GB checkpoints (140 Terabytes of storage).\n\nIn 2021, Edward Hu et al. int",
          "ar": "تعمل تقنية \"التكيف منخفض الرتبة\" (LoRA) على نمذجة تحديثات الأوزان الخاصة بالمهام عبر تفكيك موتر التعديل إلى حاصل ضرب مصفوفات منخفضة الرتبة: $\\Delta \\mathbf{W} = \\frac{\\alpha}{r} \\mathbf{B}\\mathbf{A}$ حيث $r \\ll \\min(d, k)$. ومن خلال تجميد أوزان النموذج التأسيسي $\\mathbf{W}_0$ بالكامل وتدريب مصفوفات المحول المضغوطة فقط، تختزل LoRA المعاملات القابلة للتدريب وذاكرة المحسّن بنسبة تتجاوز 99%. يضمن بدء المصفوفة $\\mathbf{B}$ بقيم صفرية انطلاق التدريب بدقة من نقطة الأصل للنموذج الأساسي، بينما يتيح دمج الأوزان خطياً انعدام أي تأخير زمني أثناء الاستدلال."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\Delta \\mathbf{W} = \\frac{\\alpha}{r} \\mathbf{B} \\mathbf{A}, \\quad \\mathbf{B} \\in \\mathbb{R}^{d \\times r}, \\quad \\mathbf{A} \\in \\mathbb{R}^{r \\times k}, \\quad \\text{with } r \\ll \\min(d, k)",
        "formulaNote": {
          "en": "Core invariant for Low-Rank Adaptation (LoRA) & Intrinsic Rank Decompositions.",
          "ar": "الخاصية الرياضية الجوهرية لـ التكيف منخفض الرتبة (LoRA) وتفكيك الرتبة الجوهرية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-positional-encoding-sinusoidal-rope",
          "starterCode": "class LoRALinear:\n    W_0: np.ndarray\n    A: np.ndarray\n    B: np.ndarray\n    merged: bool\n    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0) -> None: ...\n    def forward(self, x: np.ndarray) -> np.ndarray: ...\n    def merge_weights(self) -> None: ...\n    def unmerge_weights(self) -> None: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "class LoRALinear:\n    W_0: np.ndarray\n    A: np.ndarray\n    B: np.ndarray\n    merged: bool\n    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0) -> None: ...\n    def forward(self, x: np.ndarray) -> np.ndarray: ...\n    def merge_weights(self) -> None: ...\n    def unmerge_weights(self) -> None: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\nclass LoRALinear:\n    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0):\n        self.in_features = in_features\n        self.out_features = out_features\n        self.rank = rank\n        self.alpha = alpha\n        self.scaling = alpha / rank\n        self.W_0 = np.random.randn(out_features, in_features) * 0.02\n        self.A = np.random.randn(rank, in_features) * 0.02\n        self.B = np.zeros((out_features, rank))\n        self.merged = False\n\n    def forward(self, x: np.ndarray) -> np.ndarray:\n        # TODO: Compute base output + scaled LoRA adapter output\n        pass\n\n    def merge_weights(self):\n        # TODO: Fold (B @ A) * scaling into W_0\n        pass\n\n    def unmerge_weights(self):\n        # TODO: Subtract (B @ A) * scaling from W_0\n        pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Low-Rank Adaptation (LoRA) & Intrinsic Rank Decompositions?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التكيف منخفض الرتبة (LoRA) وتفكيك الرتبة الجوهرية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "QLoRA & NormalFloat4 (NF4) Quantization Grids",
    "titleAr": "خوارزمية QLoRA وشبكات التكميم العائم الطبيعي رباعي البتات (NF4)",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While LoRA reduces trainable parameter memory to a fraction of a percent, the frozen base model weights $\\mathbf{W}_0$ still consume massive...",
      "ar": "تحقق خوارزمية QLoRA ضغطاً فائقاً للذاكرة عبر تكميم أوزان النموذج التأسيسي المجمدة في تمثيل رقمي رباعي البتات مثالي من منظور نظرية المعلومات ..."
    },
    "prerequisites": [
      "multi-head-attention-projection",
      "positional-encoding-sinusoidal-rope",
      "rmsnorm-residual-highways"
    ],
    "x": 1130,
    "y": 2265,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "QLoRAQuantizationLab",
        "narrative": {
          "en": "While LoRA reduces trainable parameter memory to a fraction of a percent, the frozen base model weights $\\mathbf{W}_0$ still consume massive VRAM (e.g. 130 GB in 16-bit precision for a 65B model). This meant that fine-tuning a 65B/70B model still required a cluster of multiple expensive 80 GB enterprise GPUs.\n\nIn 2023, Tim Dettmers et al. introduced QLoRA (Quantized Low-Rank Adaptation), demonstrating that a 65B parameter model could be fine-tuned on a single consumer 48 GB GPU with zero degradation in performance.\n\nQLoRA achieves this through three core technical innovations:\n1. T",
          "ar": "تحقق خوارزمية QLoRA ضغطاً فائقاً للذاكرة عبر تكميم أوزان النموذج التأسيسي المجمدة في تمثيل رقمي رباعي البتات مثالي من منظور نظرية المعلومات يُعرف باسم \"الفاصلة العائمة الطبيعية\" (NF4). ومن خلال توزيع مستويات التكميم الستة عشر وفقاً لشرائح احتمالية متساوية (Quantiles) للتوزيع الطبيعي المعياري، تقلص NF4 فقدان المعلومات للأوزان الموزعة غاوسياً إلى حده الأدنى. وتُضاف محولات LoRA عالية الدقة (BF16) فوق الأوزان المكممة، مما يتيح تدريباً كاملاً للنماذج اللغوية العملاقة على معالجات استهلاكية دون أي تراجع في الأداء."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "q_i = \\frac{1}{2} \\left( Q_X\\left(\\frac{i}{2^k}\\right) + Q_X\\left(\\frac{i+1}{2^k}\\right) \\right)",
        "formulaNote": {
          "en": "Core invariant for QLoRA & NormalFloat4 (NF4) Quantization Grids.",
          "ar": "الخاصية الرياضية الجوهرية لـ خوارزمية QLoRA وشبكات التكميم العائم الطبيعي رباعي البتات (NF4)."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-decoder-only-gpt-transformer",
          "starterCode": "def nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]: ...\ndef nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]: ...\ndef nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\nNF4_CODEBOOK = np.array([\n    -1.0, -0.6961928009986877, -0.5250730514526367, -0.39491748809814453,\n    -0.28444138169288635, -0.18477343022823334, -0.09105003625154495, 0.0,\n    0.07958029955625534, 0.16093020141124725, 0.24611230194568634, 0.33791524171829224,\n    0.44070982933044434, 0.5626170039176941, 0.7229568362236023, 1.0\n])\n\ndef nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"Quantize FP32 array into 4-bit indices and per-block scales.\"\"\"\n    # TODO: Reshape into blocks, find max absolute scales, find closest codebook index\n    pass\n\ndef nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray:\n    \"\"\"Dequantize 4-bit indices back to FP32.\"\"\"\n    # TODO: Lookup codebook values and multiply by scales\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing QLoRA & NormalFloat4 (NF4) Quantization Grids?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم خوارزمية QLoRA وشبكات التكميم العائم الطبيعي رباعي البتات (NF4)؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Bradley-Terry Preference Modeling & Implicit Reward Dynamics",
    "titleAr": "نمذجة التفضيل بأسلوب برادلي-تيري وديناميكيات المكافأة الضمنية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Supervised Fine-Tuning (SFT) teaches a language model how to speak like an assistant, but it cannot resolve subtle qualitative trade-offs. F...",
      "ar": "يحول نموذج تفضيل \"برادلي-تيري\" (Bradley-Terry) الأحكام المقارنة الثنائية إلى فضاء مكافآت كامن مستمر يعبر عنه بقيم سلمية. ومن خلال صياغة احتم..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer",
      "arrow-ipc-zero-copy"
    ],
    "x": 1145,
    "y": 2360,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RlhfPpoDynamicsLab",
        "narrative": {
          "en": "Supervised Fine-Tuning (SFT) teaches a language model how to speak like an assistant, but it cannot resolve subtle qualitative trade-offs. For example, if you ask: \"Write a polite rejection email\", there are thousands of valid responses. Some are overly blunt; others are obsequiously apologetic; some strike the perfect professional balance. Human annotators find it extremely difficult to assign absolute numerical scores (e.g. \"This email is a 7.42 out of 10\"), but they find it trivial to compare two completions side by side and state: \"Completion $y_w$ is better than completion $y_l$.\"",
          "ar": "يحول نموذج تفضيل \"برادلي-تيري\" (Bradley-Terry) الأحكام المقارنة الثنائية إلى فضاء مكافآت كامن مستمر يعبر عنه بقيم سلمية. ومن خلال صياغة احتمالية فوز الإجابة كدالة سيجمويد لوجستية لفارق المكافأة بين الإجابة الفائزة $y_w$ والإجابة الخاسرة $y_l$، يؤطر النموذج مسألة تحسين التفضيلات كدالة خسارة تقاطعية ثنائية على فوارق المكافآت. تؤسس هذه الصياغة هدفاً رياضياً مستقراً لتدريب نماذج المكافأة العصبية التي توجه عمليات المحاذاة اللاحقة بالتعلم المعزز."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "P(y_w \\succ y_l \\mid x) = \\sigma(r(x, y_w) - r(x, y_l)) = \\frac{1}{1 + e^{-(r(x, y_w) - r(x, y_l))}} = \\frac{e^{r(x, y_w)}}{e^{r(x, y_w)} + e^{r(x, y_l)}}",
        "formulaNote": {
          "en": "Core invariant for Bradley-Terry Preference Modeling & Implicit Reward Dynamics.",
          "ar": "الخاصية الرياضية الجوهرية لـ نمذجة التفضيل بأسلوب برادلي-تيري وديناميكيات المكافأة الضمنية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-kv-caching-autoregressive-generation",
          "starterCode": "def bradley_terry_loss(\n    r_win: np.ndarray,\n    r_loss: np.ndarray\n) -> tuple[float, np.ndarray, np.ndarray]: ...\n# r_win: (N,) scalar rewards for winning responses\n# r_loss: (N,) scalar rewards for losing responses\n# Returns: (loss: float, grad_w: np.ndarray, grad_l: np.ndarray)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def bradley_terry_loss(\n    r_win: np.ndarray,\n    r_loss: np.ndarray\n) -> tuple[float, np.ndarray, np.ndarray]: ...\n# r_win: (N,) scalar rewards for winning responses\n# r_loss: (N,) scalar rewards for losing responses\n# Returns: (loss: float, grad_w: np.ndarray, grad_l: np.ndarray)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef bradley_terry_loss(r_win: np.ndarray, r_loss: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:\n    \"\"\"Compute Bradley-Terry preference loss and gradients.\"\"\"\n    # TODO: Compute stable loss using np.logaddexp(0, -(r_win - r_loss))\n    # TODO: Compute analytical gradients w.r.t r_win and r_loss\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Bradley-Terry Preference Modeling & Implicit Reward Dynamics?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم نمذجة التفضيل بأسلوب برادلي-تيري وديناميكيات المكافأة الضمنية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Direct Preference Optimization (DPO) & Analytical Policy Substitution",
    "titleAr": "التحسين المباشر للتفضيلات (DPO) والتعويض التحليلي للسياسة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Classical RLHF using Proximal Policy Optimization (PPO, Christiano et al. 2017, Ouyang et al. 2022) is notoriously unstable, complex, and co...",
      "ar": "تشتق خوارزمية \"التحسين المباشر للتفضيلات\" (DPO) إعادة صياغة تحليلية دقيقة لنموذج مكافأة برادلي-تيري في ظل قيود تباعد كولباك-ليبلر (KL). فمن ..."
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
        "simulation": "AlignmentTrajectoryLab",
        "narrative": {
          "en": "Classical RLHF using Proximal Policy Optimization (PPO, Christiano et al. 2017, Ouyang et al. 2022) is notoriously unstable, complex, and computationally wasteful. Running PPO requires holding four separate massive language models in GPU memory simultaneously:\n1. The active policy model $\\pi_\\theta$ (generating text and receiving updates).\n2. The frozen reference model $\\pi_{\\text{ref}}$ (preventing policy drift via KL divergence).\n3. The reward model $r_\\psi$ (scoring completions).\n4. The critic/value model $V_\\phi$ (estimating baseline returns for generalized advantage estimation).\nTrain",
          "ar": "تشتق خوارزمية \"التحسين المباشر للتفضيلات\" (DPO) إعادة صياغة تحليلية دقيقة لنموذج مكافأة برادلي-تيري في ظل قيود تباعد كولباك-ليبلر (KL). فمن خلال التعبير الرياضي عن السياسة المثلى بدلالة دالة المكافأة الكامنة، تعوض DPO السياسة مباشرة داخل دالة هدف التفضيل، ملغيةً بالكامل الحاجة لتدريب نموذج مكافأة منفصل أو الانخراط في تعقيدات خوارزميات PPO غير المستقرة. يحسن هذا الهدف الرياضي سياسة النموذج اللغوي مباشرة عبر دالة خسارة تقاطعية ثنائية تقيس فوارق نسب الاحتمالات اللوغاريتمية مقارنة بنموذج مرجعي مجمد."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\max_{\\pi_\\theta} \\mathbb{E}_{x \\sim \\mathcal{D}, y \\sim \\pi_\\theta} \\left[ r(x, y) \\right] - \\beta \\, \\mathbb{D}_{\\text{KL}}\\left( \\pi_\\theta(y \\mid x) \\;\\|\\; \\pi_{\\text{ref}}(y \\mid x) \\right)",
        "formulaNote": {
          "en": "Core invariant for Direct Preference Optimization (DPO) & Analytical Policy Substitution.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحسين المباشر للتفضيلات (DPO) والتعويض التحليلي للسياسة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-grouped-query-attention-gqa",
          "starterCode": "def dpo_loss(\n    policy_win_logps: np.ndarray,\n    policy_loss_logps: np.ndarray,\n    ref_win_logps: np.ndarray,\n    ref_loss_logps: np.ndarray,\n    beta: float = 0.1\n) -> tuple[float, float, float]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def dpo_loss(\n    policy_win_logps: np.ndarray,\n    policy_loss_logps: np.ndarray,\n    ref_win_logps: np.ndarray,\n    ref_loss_logps: np.ndarray,\n    beta: float = 0.1\n) -> tuple[float, float, float]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef dpo_loss(policy_win_logps, policy_loss_logps, ref_win_logps, ref_loss_logps, beta=0.1):\n    \"\"\"Compute DPO loss, reward margin, and preference accuracy.\"\"\"\n    # TODO: 1. Calculate log ratios for winning and losing completions\n    # TODO: 2. Calculate beta-scaled margin logits\n    # TODO: 3. Compute loss, reward margin, and accuracy\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Direct Preference Optimization (DPO) & Analytical Policy Substitution?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التحسين المباشر للتفضيلات (DPO) والتعويض التحليلي للسياسة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Group Relative Policy Optimization (GRPO) & Reasoning Verifiers",
    "titleAr": "تحسين السياسة النسبي الجماعي (GRPO) ونظم التحقق البرمجي للاستدلال",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "With the advent of frontier reasoning models (such as DeepSeek-R1 and OpenAI o1), the AI alignment frontier shifted from fuzzy human stylist...",
      "ar": "تتجاوز خوارزمية \"تحسين السياسة النسبي الجماعي\" (GRPO) الحاجة لتدريب شبكة تقييم (Critic/Value Network) منفصلة أثناء محاذاة نماذج الاستدلال ال..."
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
        "simulation": "GrpoReasoningLab",
        "narrative": {
          "en": "With the advent of frontier reasoning models (such as DeepSeek-R1 and OpenAI o1), the AI alignment frontier shifted from fuzzy human stylistic preferences to rigorous verifiable reasoning (mathematics, competitive programming, formal logic). In mathematical problem-solving, a completion is not \"preferred\" because it sounds polite; it is either objectively correct (the answer is $42$) or objectively wrong.\n\nWhen applying standard actor-critic algorithms like PPO to reasoning tasks:\n1. PPO requires training a separate Critic (Value) model $V_\\phi$ to estimate state baselines $V(s_t)$.\n2.",
          "ar": "تتجاوز خوارزمية \"تحسين السياسة النسبي الجماعي\" (GRPO) الحاجة لتدريب شبكة تقييم (Critic/Value Network) منفصلة أثناء محاذاة نماذج الاستدلال الرياضي والبرمجي. فلكل مسألة مطروحة، تولد GRPO مجموعة من $G$ إجابات متنوعة من السياسة الحالية وتقيمها عبر نظم تحقق برمجية حتمية وقاطعة. ومن خلال معايرة المكافآت إحصائياً عبر المجموعة لاستخراج درجات الأفضلية النسبية $A_i = \\frac{r_i - \\mu}{\\sigma}$، تحقق GRPO خفضاً هائلاً لتباين التدرجات وتحديثاً مستقراً للسياسة مع توفير نصف الذاكرة الرسومية المطلوبة لخوارزميات PPO التقليدية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\{y_1, y_2, \\dots, y_G\\} \\sim \\pi_{\\theta_{\\text{old}}}(\\cdot \\mid x)",
        "formulaNote": {
          "en": "Core invariant for Group Relative Policy Optimization (GRPO) & Reasoning Verifiers.",
          "ar": "الخاصية الرياضية الجوهرية لـ تحسين السياسة النسبي الجماعي (GRPO) ونظم التحقق البرمجي للاستدلال."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-flashattention-tiling-online-softmax",
          "starterCode": "def grpo_compute_advantages_and_loss(\n    rewards: np.ndarray,\n    logp: np.ndarray,\n    old_logp: np.ndarray,\n    ref_logp: np.ndarray,\n    beta_kl: float = 0.04,\n    clip_eps: float = 0.2\n) -> tuple[np.ndarray, float]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def grpo_compute_advantages_and_loss(\n    rewards: np.ndarray,\n    logp: np.ndarray,\n    old_logp: np.ndarray,\n    ref_logp: np.ndarray,\n    beta_kl: float = 0.04,\n    clip_eps: float = 0.2\n) -> tuple[np.ndarray, float]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef grpo_compute_advantages_and_loss(rewards, logp, old_logp, ref_logp, beta_kl=0.04, clip_eps=0.2):\n    \"\"\"Compute group-relative normalized advantages and GRPO loss.\"\"\"\n    # TODO: 1. Group-normalize rewards: (r - mean) / (std + eps)\n    # TODO: 2. Compute importance ratio r_i = exp(logp - old_logp)\n    # TODO: 3. Compute clipped surrogate loss\n    # TODO: 4. Add KL penalty and return (advantages, total_loss)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Group Relative Policy Optimization (GRPO) & Reasoning Verifiers?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تحسين السياسة النسبي الجماعي (GRPO) ونظم التحقق البرمجي للاستدلال؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Continuous State-Space Models (SSM) & Zero-Order Hold (ZOH) Discretization",
    "titleAr": "نماذج فضاء الحالة المستمرة (SSM) والتقطيع بمسك المرتبة الصفرية (ZOH)",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Classical Transformers suffer from a fundamental computational bottleneck: self-attention scales quadratically ($O(L^2)$) with sequence leng...",
      "ar": "تحول \"نماذج فضاء الحالة المستمرة\" (SSMs) إشارات السلاسل أحادية البعد عبر نظام ديناميكي كامن تحكمه معادلات تفاضلية خطية عادية. ولمعالجة السلا..."
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
        "simulation": "ContinuousSsmS4Lab",
        "narrative": {
          "en": "Classical Transformers suffer from a fundamental computational bottleneck: self-attention scales quadratically ($O(L^2)$) with sequence length $L$. Can we model long sequences with the parallel training throughput of a CNN and the constant-time $O(1)$ per-token inference of an RNN?\n\nTo answer this, modern deep learning turned to Continuous State-Space Models (SSMs), drawn from control theory and dynamical systems:",
          "ar": "تحول \"نماذج فضاء الحالة المستمرة\" (SSMs) إشارات السلاسل أحادية البعد عبر نظام ديناميكي كامن تحكمه معادلات تفاضلية خطية عادية. ولمعالجة السلاسل الرقمية المنفصلة من الرموز، تخضع معاملات النظام المستمر $(\\mathbf{A}, \\mathbf{B})$ لعملية تقطيع رياضي باستخدام تقنية \"مسك المرتبة الصفرية\" (ZOH) بالاعتماد على خطوة زمنية متعلمة $\\Delta$. ينتج هذا التحويل التحليلي مصفوفات انتقال منفصلة $(\\bar{\\mathbf{A}}, \\bar{\\mathbf{B}})$ تحافظ على التطابق الرياضي الدقيق مع المعادلة التفاضلية الأصلية، مما يمهد الطريق لنمذجة السلاسل بتعقيد حسابي دون تربيعي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "h'(t) = \\mathbf{A} h(t) + \\mathbf{B} x(t)",
        "formulaNote": {
          "en": "Core invariant for Continuous State-Space Models (SSM) & Zero-Order Hold (ZOH) Discretization.",
          "ar": "الخاصية الرياضية الجوهرية لـ نماذج فضاء الحالة المستمرة (SSM) والتقطيع بمسك المرتبة الصفرية (ZOH)."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-swiglu-feedforward-activation",
          "starterCode": "def discretize_zoh(\n    delta: np.ndarray,\n    A: np.ndarray,\n    B: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def discretize_zoh(\n    delta: np.ndarray,\n    A: np.ndarray,\n    B: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef discretize_zoh(delta: np.ndarray, A: np.ndarray, B: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"Discretize continuous SSM parameters via Zero-Order Hold.\"\"\"\n    # TODO: Broadcast delta (B, L, D) and A (D, N) to compute A_bar = exp(delta * A)\n    # TODO: Compute B_bar = delta * B\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Continuous State-Space Models (SSM) & Zero-Order Hold (ZOH) Discretization?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم نماذج فضاء الحالة المستمرة (SSM) والتقطيع بمسك المرتبة الصفرية (ZOH)؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Mamba Selective Scan Architecture & Associative Prefix Operators",
    "titleAr": "بنية مامبا للمسح الانتقائي (Mamba) وعوامل البادئة التجميعية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Linear Time-Invariant (LTI) State Space Models (like S4) achieved sub-quadratic sequence modeling, they suffered from a fatal weakness...",
      "ar": "ترتقي بنية \"مامبا للمسح الانتقائي\" (Mamba) بنماذج فضاء الحالة عبر إدخال معاملات انتقاء تعتمد ديناميكياً على المدخلات اللحظية $(\\mathbf{B}_t,..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer",
      "singular-value-decomposition"
    ],
    "x": 1145,
    "y": 2740,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "MambaScanVisualizer",
        "narrative": {
          "en": "While Linear Time-Invariant (LTI) State Space Models (like S4) achieved sub-quadratic sequence modeling, they suffered from a fatal weakness compared to Transformers: they could not perform content-based reasoning.\nBecause their transition matrices $\\mathbf{A}, \\mathbf{B}, \\mathbf{C}$ were static constants independent of input tokens, an LTI model processed irrelevant filler words with the exact same weight as critical keywords. Transformers outperformed them because self-attention dynamically decides which tokens to focus on based on the incoming query.\n\nIn 2023, Albert Gu and Tri Dao int",
          "ar": "ترتقي بنية \"مامبا للمسح الانتقائي\" (Mamba) بنماذج فضاء الحالة عبر إدخال معاملات انتقاء تعتمد ديناميكياً على المدخلات اللحظية $(\\mathbf{B}_t, \\mathbf{C}_t, \\Delta_t)$. تُمكّن هذه البوابات المعتمدة على البيانات النموذج من ترشيح المعلومات الهامشية وضغط السياقات الجوهرية داخل حالة كامنة محدودة الحجم. ورغم أن خاصية الانتقاء المدفوعة بالبيانات تعطل التكافؤ الالتفافي الكلاسيكي، فإن مامبا تنفذ التدريب المتوازي في زمن لوغاريتمي $O(\\log L)$ عبر صياغة معادلات التكرار كمؤثر بادئة تجميعي (Associative Prefix Operator) يُنفذ عبر كيرنل مسح متوازٍ مدمج داخل ذاكرة SRAM للمعالج الرسومي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{B}_t = \\text{Linear}_B(x_t), \\quad \\mathbf{C}_t = \\text{Linear}_C(x_t), \\quad \\Delta_t = \\text{softplus}(\\text{Linear}_\\Delta(x_t))",
        "formulaNote": {
          "en": "Core invariant for Mamba Selective Scan Architecture & Associative Prefix Operators.",
          "ar": "الخاصية الرياضية الجوهرية لـ بنية مامبا للمسح الانتقائي (Mamba) وعوامل البادئة التجميعية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-lora-low-rank-adaptation",
          "starterCode": "def selective_scan(\n    A_bar: np.ndarray,\n    B_bar_x: np.ndarray,\n    C: np.ndarray\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def selective_scan(\n    A_bar: np.ndarray,\n    B_bar_x: np.ndarray,\n    C: np.ndarray\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef selective_scan(A_bar: np.ndarray, B_bar_x: np.ndarray, C: np.ndarray) -> np.ndarray:\n    \"\"\"Execute selective scan recurrence over sequence length L.\"\"\"\n    # TODO: Initialize hidden state h = zeros((D, N))\n    # TODO: Iterate t in 0..L-1: h = A_bar[t] * h + B_bar_x[t]\n    # TODO: Compute y_t = sum(h * C[t], axis=-1)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Mamba Selective Scan Architecture & Associative Prefix Operators?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم بنية مامبا للمسح الانتقائي (Mamba) وعوامل البادئة التجميعية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "DDPM Forward Markov Noising & Closed-Form Marginal Sampling",
    "titleAr": "التشويش الماركوفي الأمامي في نماذج DDPM وأخذ العينات الهامشية بالصيغة المغلقة",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Generative modeling seeks to sample complex data distributions (such as natural images or molecular conformations) from a neural network. Ge...",
      "ar": "تبني \"نماذج الانتشار الاحتمالية لإزالة التشويش\" (DDPM) سلسلة ماركوفية أمامية تعمد إلى تدمير البنية الهندسية للبيانات تدريجياً وتحويلها إلى ض..."
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
        "simulation": "DdpmForwardNoisingLab",
        "narrative": {
          "en": "Generative modeling seeks to sample complex data distributions (such as natural images or molecular conformations) from a neural network. Generative Adversarial Networks (GANs) struggled with mode collapse and training instability; Variational Autoencoders (VAEs) produced blurry samples due to loose evidence lower bounds.\n\nIn 2015, Jascha Sohl-Dickstein et al. drew inspiration from non-equilibrium thermodynamics to introduce Diffusion Models, later formalized as Denoising Diffusion Probabilistic Models (DDPM) by Jonathan Ho, Ajay Jain, and Pieter Abbeel (2020).\n\nThe core philosophy is",
          "ar": "تبني \"نماذج الانتشار الاحتمالية لإزالة التشويش\" (DDPM) سلسلة ماركوفية أمامية تعمد إلى تدمير البنية الهندسية للبيانات تدريجياً وتحويلها إلى ضجيج غاوسي متجانس عبر جدول تباين زمني $\\beta_t$. ومن خلال الاستبدال التكراري التحليلي، تختزل هذه الانتقالات الماركوفية في توزيع هامشي ذي صيغة مغلقة $q(\\mathbf{x}_t \\mid \\mathbf{x}_0) = \\mathcal{N}(\\mathbf{x}_t; \\sqrt{\\bar{\\alpha}_t} \\mathbf{x}_0, (1 - \\bar{\\alpha}_t)\\mathbf{I})$. يتيح هذا الحل الجبري حقن الضجيج مباشرة في خطوة واحدة عند أي لحظة زمنية عشوائية أثناء التدريب المتوازي للنموذج."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "q(\\mathbf{x}_t \\mid \\mathbf{x}_{t-1}) = \\mathcal{N}\\left(\\mathbf{x}_t; \\; \\sqrt{1 - \\beta_t} \\mathbf{x}_{t-1}, \\; \\beta_t \\mathbf{I}\\right)",
        "formulaNote": {
          "en": "Core invariant for DDPM Forward Markov Noising & Closed-Form Marginal Sampling.",
          "ar": "الخاصية الرياضية الجوهرية لـ التشويش الماركوفي الأمامي في نماذج DDPM وأخذ العينات الهامشية بالصيغة المغلقة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-qlora-quantized-fine-tuning",
          "starterCode": "def ddpm_q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def ddpm_q_sample(\n    x_0: np.ndarray,\n    t: int,\n    noise: np.ndarray,\n    alpha_bars: np.ndarray\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef ddpm_q_sample(x_0: np.ndarray, t: int, noise: np.ndarray, alpha_bars: np.ndarray) -> np.ndarray:\n    \"\"\"Sample noisy latent x_t in closed form.\"\"\"\n    # TODO: Retrieve alpha_bar at timestep t\n    # TODO: Blend x_0 and noise using sqrt(alpha_bar) and sqrt(1 - alpha_bar)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing DDPM Forward Markov Noising & Closed-Form Marginal Sampling?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التشويش الماركوفي الأمامي في نماذج DDPM وأخذ العينات الهامشية بالصيغة المغلقة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Reverse Diffusion Denoising Step, Score Matching & Langevin Dynamics",
    "titleAr": "خطوة إزالة التشويش في الانتشار العكسي ومطابقة درجات الاحتمال وديناميكيات لانجفان",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Having established the forward degradation chain in Lesson T4-30, how do we generate brand-new samples from scratch?\nWe must run the clock b...",
      "ar": "تولد عملية الانتشار العكسي بيانات جديدة كلياً عبر أخذ عينات من انتقالات غاوسية وسيطية $p_\\theta(\\mathbf{x}_{t-1} \\mid \\mathbf{x}_t)$. ومن خل..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer",
      "rubin-causal-model-potential-outcomes"
    ],
    "x": 1145,
    "y": 2930,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DiffusionTrajectoryLab",
        "narrative": {
          "en": "Having established the forward degradation chain in Lesson T4-30, how do we generate brand-new samples from scratch?\nWe must run the clock backwards: start from pure Gaussian noise $\\mathbf{x}_T \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ and compute the reverse transition distribution $p_\\theta(\\mathbf{x}_{t-1} \\mid \\mathbf{x}_t)$.\n\nBy Bayes' rule, conditioned on the original clean image $\\mathbf{x}_0$, the true posterior $q(\\mathbf{x}_{t-1} \\mid \\mathbf{x}_t, \\mathbf{x}_0)$ is also a Gaussian distribution:",
          "ar": "تولد عملية الانتشار العكسي بيانات جديدة كلياً عبر أخذ عينات من انتقالات غاوسية وسيطية $p_\\theta(\\mathbf{x}_{t-1} \\mid \\mathbf{x}_t)$. ومن خلال إعادة صياغة المتوسط اللاحق بدلالة مركبة الضجيج، يختزل التدريب في حساب الخطأ التربيعي المتوسط بين الضجيج المحقون وتنبؤ الشبكة العصبية $\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)$. يتطابق هذا الهدف الرياضي تماماً مع \"مطابقة درجات الاحتمال لإزالة التشويش\" (Denoising Score Matching)، حيث يمثل متجه الضجيج المتنبأ به تدرج دالة الكثافة الاحتمالية (Stein Score)، موجهاً ديناميكيات لانجفان الحركية نحو فضاءات البيانات الأصلية عالية الاحتمال."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "q(\\mathbf{x}_{t-1} \\mid \\mathbf{x}_t, \\mathbf{x}_0) = \\mathcal{N}\\left(\\mathbf{x}_{t-1}; \\; \\tilde{\\boldsymbol{\\mu}}_t(\\mathbf{x}_t, \\mathbf{x}_0), \\; \\tilde{\\beta}_t \\mathbf{I}\\right)",
        "formulaNote": {
          "en": "Core invariant for Reverse Diffusion Denoising Step, Score Matching & Langevin Dynamics.",
          "ar": "الخاصية الرياضية الجوهرية لـ خطوة إزالة التشويش في الانتشار العكسي ومطابقة درجات الاحتمال وديناميكيات لانجفان."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-dpo-direct-preference-optimization",
          "starterCode": "def ddpm_p_sample_step(\n    x_t: np.ndarray,\n    t: int,\n    eps_cond: np.ndarray,\n    eps_uncond: np.ndarray,\n    cfg_scale: float,\n    betas: np.ndarray,\n    alpha_bars: np.ndarray,\n    z: np.ndarray | None = None\n) -> np.ndarray: ...",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def ddpm_p_sample_step(\n    x_t: np.ndarray,\n    t: int,\n    eps_cond: np.ndarray,\n    eps_uncond: np.ndarray,\n    cfg_scale: float,\n    betas: np.ndarray,\n    alpha_bars: np.ndarray,\n    z: np.ndarray | None = None\n) -> np.ndarray: ...",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef ddpm_p_sample_step(x_t, t, eps_cond, eps_uncond, cfg_scale, betas, alpha_bars, z=None):\n    \"\"\"Execute single reverse DDPM step with CFG.\"\"\"\n    # TODO: 1. Combine eps using CFG formula\n    # TODO: 2. Compute posterior mean mu_theta\n    # TODO: 3. If t == 0 return mu_theta, else add sigma_t * z\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Reverse Diffusion Denoising Step, Score Matching & Langevin Dynamics?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم خطوة إزالة التشويش في الانتشار العكسي ومطابقة درجات الاحتمال وديناميكيات لانجفان؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "ReAct Agent Single Step: Thought-Action Parsing & Execution Dispatch",
    "titleAr": "خطوة وكيل ReAct الفردية: تحليل التفكير والفعل وتوزيع التنفيذ",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "Standard Large Language Models generate text as a passive sequence of token completions. If you ask an LLM: \"What is the current stock price...",
      "ar": "يدمج إطار عمل ReAct (التفكير والفعل) بين مسارات الاستدلال الذهني والأفعال التنفيذية لربط مخرجات النماذج اللغوية بالواقع الخارجي والأدوات الر..."
    },
    "prerequisites": [
      "dpo-direct-preference-optimization",
      "central-limit-theorem"
    ],
    "x": 1125,
    "y": 3025,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "AgentExecutionGraphLab",
        "narrative": {
          "en": "Standard Large Language Models generate text as a passive sequence of token completions. If you ask an LLM: \"What is the current stock price of Apple multiplied by the temperature in Tokyo?\", a raw model will hallucinate numbers because:\n1. It has no access to live real-time internet information.\n2. It struggles with precise multi-digit floating-point arithmetic.\n\nTo break out of the digital isolation box, language models must become Autonomous Agents capable of interacting with the physical world, query APIs, running Python interpreters, and reading external databases.\n\nIn 2022, Shunyu",
          "ar": "يدمج إطار عمل ReAct (التفكير والفعل) بين مسارات الاستدلال الذهني والأفعال التنفيذية لربط مخرجات النماذج اللغوية بالواقع الخارجي والأدوات الرقمية. وفي خطوة ReAct المنفردة، يولد النموذج خاطرة فكرية صريحة (Thought) متبوعة بأمر فعلي منظم (Action). يلتقط محرك التشغيل مخرجات التوليد، ويحلل اسم الأداة المستهدفة والوسائط المصاحبة لها، ثم يرسلها للتنفيذ داخل بيئة برمجية معزولة (Sandbox)، ويعيد حقن النتيجة كـ \"ملاحظة\" (Observation) داخل سياق المحادثة تمهيداً للخطوة التالية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Context at step } k: \\quad \\mathcal{H}_k = \\left( q, \\; c_1, a_1, o_1, \\; \\dots, \\; c_{k-1}, a_{k-1}, o_{k-1} \\right)",
        "formulaNote": {
          "en": "Core invariant for ReAct Agent Single Step: Thought-Action Parsing & Execution Dispatch.",
          "ar": "الخاصية الرياضية الجوهرية لـ خطوة وكيل ReAct الفردية: تحليل التفكير والفعل وتوزيع التنفيذ."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-diffusion-models-score-sde",
          "starterCode": "def react_step_parse_and_execute(\n    response_text: str,\n    tools: dict[str, callable]\n) -> tuple[str, str, str, str]: ...\n# Returns: (thought: str, action: str, action_input: str, observation: str)",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def react_step_parse_and_execute(\n    response_text: str,\n    tools: dict[str, callable]\n) -> tuple[str, str, str, str]: ...\n# Returns: (thought: str, action: str, action_input: str, observation: str)",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import re\n\ndef react_step_parse_and_execute(response_text: str, tools: dict[str, callable]) -> tuple[str, str, str, str]:\n    \"\"\"Parse LLM text and execute tool if action is requested.\"\"\"\n    # TODO: 1. Extract Thought, Action, Action Input, or Final Answer\n    # TODO: 2. If Final Answer present, return (thought, 'FINISH', '', final_answer)\n    # TODO: 3. Dispatch action to tools dictionary and capture output as observation\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing ReAct Agent Single Step: Thought-Action Parsing & Execution Dispatch?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم خطوة وكيل ReAct الفردية: تحليل التفكير والفعل وتوزيع التنفيذ؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Multi-Turn Autonomous ReAct Loop & Dynamic Working Memory",
    "titleAr": "حلقة ReAct التوليدية متعددة الجولات وإدارة الذاكرة العاملة الديناميكية",
    "trackId": "deeplearning",
    "estimatedMinutes": 15,
    "description": {
      "en": "While a single ReAct step (Lesson T4-32) performs one query, solving complex real-world tasks—such as debugging a software repository, synth...",
      "ar": "تدير \"حلقة ReAct التوليدية متعددة الجولات\" عمليات حل المسائل المعقدة ذاتياً عبر تكرار دورة (التفكير - الفعل - الملاحظة) حتى استيفاء شرط الإن..."
    },
    "prerequisites": [
      "decoder-only-gpt-transformer",
      "causal-inference-confounding",
      "context-managers-resources"
    ],
    "x": 1145,
    "y": 3120,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "TreeOfThoughtSearchLab",
        "narrative": {
          "en": "While a single ReAct step (Lesson T4-32) performs one query, solving complex real-world tasks—such as debugging a software repository, synthesizing literature across multiple web pages, or proving a theorem—requires an autonomous multi-turn loop.\n\nAn autonomous agent must possess the cognitive capability to:\n1. Iterate autonomously: Continue calling tools until sufficient evidence is gathered.\n2. Recover from errors: If a tool returns a 404 Not Found or a Python IndexError, the agent must read the error traceback in the observation, analyze what went wrong, and formulate an alt",
          "ar": "تدير \"حلقة ReAct التوليدية متعددة الجولات\" عمليات حل المسائل المعقدة ذاتياً عبر تكرار دورة (التفكير - الفعل - الملاحظة) حتى استيفاء شرط الإنهاء النهائي. ومن خلال إدارة ديناميكية للذاكرة العاملة، يحلل الوكيل التغذية الراجعة من البيئة الخارجية، ويتعافى ذاتياً من أخطاء تنفيذ الأدوات البرمجية، ويدمج الأدلة متعددة المراحل عبر خطوات متتابعة. تنتهي الحلقة فور رصد وسام Final Answer النهائي أو استنفاد الحد الأقصى المسموح به من التكرارات، مما يضمن أمان وكفاءة التشغيل."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Algorithm: Autonomous ReAct Controller}",
        "formulaNote": {
          "en": "Core invariant for Multi-Turn Autonomous ReAct Loop & Dynamic Working Memory.",
          "ar": "الخاصية الرياضية الجوهرية لـ حلقة ReAct التوليدية متعددة الجولات وإدارة الذاكرة العاملة الديناميكية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-autonomous-react-agent-loop",
          "starterCode": "class ReActAgent:\n    tools: dict[str, callable]\n    max_turns: int\n    def __init__(self, tools: dict[str, callable], max_turns: int = 5) -> None: ...\n    def run(self, query: str, mock_llm: callable) -> dict: ...\n# Returns: {\"status\": \"success\" | \"cycle_detected\" | \"max_turns_exceeded\", \"final_answer\": str | None, \"turns\": int, \"history\": list[str]}",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "class ReActAgent:\n    tools: dict[str, callable]\n    max_turns: int\n    def __init__(self, tools: dict[str, callable], max_turns: int = 5) -> None: ...\n    def run(self, query: str, mock_llm: callable) -> dict: ...\n# Returns: {\"status\": \"success\" | \"cycle_detected\" | \"max_turns_exceeded\", \"final_answer\": str | None, \"turns\": int, \"history\": list[str]}",
              "expectedOutput": "3.0"
            }
          },
          "solution": "class ReActAgent:\n    def __init__(self, tools: dict[str, callable], max_turns: int = 5):\n        self.tools = tools\n        self.max_turns = max_turns\n\n    def run(self, query: str, mock_llm: callable) -> dict:\n        \"\"\"Execute autonomous multi-turn ReAct loop.\"\"\"\n        # TODO: 1. Maintain history list starting with Question: query\n        # TODO: 2. Loop up to max_turns\n        # TODO: 3. Parse LLM response, detect cycles, and terminate on FINISH\n        pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Multi-Turn Autonomous ReAct Loop & Dynamic Working Memory?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم حلقة ReAct التوليدية متعددة الجولات وإدارة الذاكرة العاملة الديناميكية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
