import type { CurriculumModule } from '../types';

export const programmingModules: CurriculumModule[] = [
  {
    "id": "name-binding-lifetime",
    "title": "Name-Binding, Environment Frames & Variable Lifetime",
    "titleAr": "ربط الأسماء، أطر البيئة، ودورة حياة المتغيرات",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "To write a computer program, we must store information. Beginners almost universally picture a variable as a labeled cardboard box: they ima...",
      "ar": "عندما يبدأ المبتدئ في تعلم البرمجة، يتخيل المتغير كأنه \"صندوق كرتوني\" يحمل اسماً معيناً، ونضع في داخله القيمة. هذا التصور ينهار تماماً عند ا..."
    },
    "prerequisites": [],
    "x": 460,
    "y": 80,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "EnvironmentFrameCanvas",
        "narrative": {
          "en": "To write a computer program, we must store information. Beginners almost universally picture a variable as a labeled cardboard box: they imagine writing the number 42 on a slip of paper and dropping it inside a box marked x. In many languages (like C), this box metaphor is partially true because a variable is a fixed block of memory bytes. But in high-level languages like Python, this metaphor leads to catastrophic confusion.\n\nIn Python, a variable is not a box. A variable is a sticky name-tag. \nWhen you execute x = 42, the computer first allocates an object representing 42 somewhe",
          "ar": "عندما يبدأ المبتدئ في تعلم البرمجة، يتخيل المتغير كأنه \"صندوق كرتوني\" يحمل اسماً معيناً، ونضع في داخله القيمة. هذا التصور ينهار تماماً عند التعامل مع لغات كبايثون ويقود إلى أخطاء برمجية خفية.\nفي بايثون، المتغير ليس صندوقاً، بل هو \"بطاقة اسمية لاصقة\" (Name Tag) مربوطة بخيط يلتف حول كائن موجود في الذاكرة. عندما نكتب x = 42، يقوم الحاسوب بإنشاء كائن الرقم 42 في فضاء الذاكرة العام (Heap)، ثم يصنع بطاقة مكتوب عليها x ويوجهها نحو ذلك الكائن. وإذا كتبنا y = x، فإن الحاسوب لا ينسخ الرقم 42، بل يضيف بطاقة ثانية باسم y ترتبط بذات الكائن الأصلي.\nأما إطار البيئة (Environment Frame) فهو"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\sigma: \\mathcal{X} \\to \\mathcal{L}",
        "formulaNote": {
          "en": "Core invariant for Name-Binding, Environment Frames & Variable Lifetime.",
          "ar": "الخاصية الرياضية الجوهرية لـ ربط الأسماء، أطر البيئة، ودورة حياة المتغيرات."
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
          "id": "py-name-binding-lifetime",
          "starterCode": "from typing import Any\n\ndef swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]:\n    \"\"\"\n    Performs an in-place reference swap of two bindings using tuple packing/unpacking\n    and returns the swapped values alongside pre- and post-swap memory address identities.\n\n    Args:\n        a: First object reference.\n        b: Second object reference.\n\n    Returns:\n        A tuple ((swapped_a, swapped_b), (pre_id_a, pre_id_b), (post_id_a, post_id_b)).\n    \"\"\"\n    # TODO: Record initial IDs, swap bindings using tuple unpacking, record post IDs\n    raise NotImplementedError(\"Implement swap_and_track_identity\")",
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
              "starterCode": "from typing import Any\n\ndef swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]:\n    \"\"\"\n    Performs an in-place reference swap of two bindings using tuple packing/unpacking\n    and returns the swapped values alongside pre- and post-swap memory address identities.\n\n    Args:\n        a: First object reference.\n        b: Second object reference.\n\n    Returns:\n        A tuple ((swapped_a, swapped_b), (pre_id_a, pre_id_b), (post_id_a, post_id_b)).\n    \"\"\"\n    # TODO: Record initial IDs, swap bindings using tuple unpacking, record post IDs\n    raise NotImplementedError(\"Implement swap_and_track_identity\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\n\ndef swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]:\n    # Capture initial memory addresses of heap objects\n    initial_id_a: int = id(a)\n    initial_id_b: int = id(b)\n    \n    # Modern Python tuple packing/unpacking performs atomic reference swap\n    # Bytecode: ROT_TWO (or BUILD_TUPLE 2 + UNPACK_SEQUENCE 2)\n    a, b = b, a\n    \n    # Capture post-swap addresses\n    post_id_a: int = id(a)\n    post_id_b: int = id(b)\n    \n    return ((a, b), (initial_id_a, initial_id_b), (post_id_a, post_id_b))"
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
            "en": "What is the foundational invariant governing Name-Binding, Environment Frames & Variable Lifetime?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم ربط الأسماء، أطر البيئة، ودورة حياة المتغيرات؟"
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
    "id": "control-flow-branching",
    "title": "Control Flow, Short-Circuit Boolean Logic & Branching Trees",
    "titleAr": "تدفق التحكم، المنطق البولياني ذو الدارة القصيرة، وشجيرات التفريع",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "By default, a computer CPU executes instructions like a musical score: top to bottom, one note after another. However, software becomes inte...",
      "ar": "ينفذ المعالج (CPU) الأوامر بالتسلسل سطراً بعد سطر مثل قراءة صفحات كتاب. لكن البرمجيات تكتسب الذكاء فقط عندما تصبح قادرة على اتخاذ القرارات و..."
    },
    "prerequisites": [
      "name-binding-lifetime"
    ],
    "x": 445,
    "y": 175,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ControlFlowGraphLab",
        "narrative": {
          "en": "By default, a computer CPU executes instructions like a musical score: top to bottom, one note after another. However, software becomes intelligent only when it can make choices based on data. If it is raining, take an umbrella; otherwise, do not.\n\nThis choice is implemented as conditional branching. The CPU evaluates a question whose answer is either True or False (a boolean proposition). Based on the answer, the instruction pointer either continues straight ahead or jumps to a different line of code in memory.\n\nCrucially, modern programming languages evaluate compound conditions usin",
          "ar": "ينفذ المعالج (CPU) الأوامر بالتسلسل سطراً بعد سطر مثل قراءة صفحات كتاب. لكن البرمجيات تكتسب الذكاء فقط عندما تصبح قادرة على اتخاذ القرارات والتفريع.\nهذا الانتقاء يُبنى عبر التفريع الشرطي (Conditional Branching). يقوم الحاسوب بحساب قيمة عبارة منطقية نتيجتها إما صواب (True) أو خطأ (False). وبناءً على النتيجة، يقفز مؤشر التعليمات إلى مقطع مختلف في الذاكرة.\nالمفهوم الأهم هنا هو المنطق ذو الدارة القصيرة (Short-Circuit Evaluation). تخيل شرطاً يقول: \"للدخول إلى المنشأة، يجب أن تحمل تصريحاً أمنياً AND ألا يكون سجلك محظوراً\". إذا تقدم شخص لا يحمل التصريح أصلاً، فهل هناك داعٍ لفحص سجله؟ بالط"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{E}\\llbracket e_1 \\land e_2 \\rrbracket = \\begin{cases} \n\\mathbf{F} & \\text{if } \\mathcal{E}\\llbracket e_1 \\rrbracket = \\mathbf{F} \\\\ \n\\mathcal{E}\\llbracket e_2 \\rrbracket & \\text{if } \\mathcal{E}\\llbracket e_1 \\rrbracket = \\mathbf{T} \\\\ \n\\bot & \\text{if } \\mathcal{E}\\llbracket e_1 \\rrbracket = \\bot \n\\end{cases}",
        "formulaNote": {
          "en": "Core invariant for Control Flow, Short-Circuit Boolean Logic & Branching Trees.",
          "ar": "الخاصية الرياضية الجوهرية لـ تدفق التحكم، المنطق البولياني ذو الدارة القصيرة، وشجيرات التفريع."
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
          "id": "py-control-flow-branching",
          "starterCode": "from typing import Any\n\ndef safe_config_lookup(\n    layers: list[dict[str, Any] | None], \n    key_path: list[str], \n    fallback: Any = None\n) -> Any:\n    \"\"\"\n    Traverses hierarchically ordered configuration layers to resolve a nested key path,\n    respecting falsy values (0, False, \"\") and short-circuiting on non-dict nodes.\n\n    Args:\n        layers: List of config dicts or None, ordered by decreasing priority.\n        key_path: List of hierarchical string keys.\n        fallback: Value to return if key path is absent in all layers.\n\n    Returns:\n        The resolved value or fallback.\n    \"\"\"\n    # TODO: Implement hierarchical key resolution respecting falsy values\n    raise NotImplementedError(\"Implement safe_config_lookup\")",
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
              "starterCode": "from typing import Any\n\ndef safe_config_lookup(\n    layers: list[dict[str, Any] | None], \n    key_path: list[str], \n    fallback: Any = None\n) -> Any:\n    \"\"\"\n    Traverses hierarchically ordered configuration layers to resolve a nested key path,\n    respecting falsy values (0, False, \"\") and short-circuiting on non-dict nodes.\n\n    Args:\n        layers: List of config dicts or None, ordered by decreasing priority.\n        key_path: List of hierarchical string keys.\n        fallback: Value to return if key path is absent in all layers.\n\n    Returns:\n        The resolved value or fallback.\n    \"\"\"\n    # TODO: Implement hierarchical key resolution respecting falsy values\n    raise NotImplementedError(\"Implement safe_config_lookup\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\n\ndef safe_config_lookup(\n    layers: list[dict[str, Any] | None], \n    key_path: list[str], \n    fallback: Any = None\n) -> Any:\n    if not key_path:\n        return fallback\n\n    for layer in layers:\n        # Short-circuit if layer is not a dictionary\n        if not isinstance(layer, dict):\n            continue\n            \n        current: Any = layer\n        found: bool = True\n        \n        for key in key_path:\n            # Check dictionary type and key containment without triggering __getitem__ on non-dict\n            if isinstance(current, dict) and key in current:\n                current = current[key]\n            else:\n                found = False\n                break\n                \n        if found:\n            # Return value directly; do not use `current or fallback` which corrupts 0/False/\"\"\n            return current\n\n    return fallback"
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
            "en": "What is the foundational invariant governing Control Flow, Short-Circuit Boolean Logic & Branching Trees?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تدفق التحكم، المنطق البولياني ذو الدارة القصيرة، وشجيرات التفريع؟"
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
    "id": "iteration-state-accumulation",
    "title": "Iteration, Invariants & State Accumulation",
    "titleAr": "التكرار الحلقي، اللامتغيرات (Invariants)، وتراكم الحالة",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Computers are remarkable not because they do complex tasks in a single miraculous stroke, but because they can execute simple operations mil...",
      "ar": "لا تكمن القوة العظمى للحواسيب في قيامها بعمليات سحرية معقدة، بل في قدرتها الفائقة على تكرار خطوات حسابية بسيطة مليارات المرات في الثانية دون..."
    },
    "prerequisites": [
      "control-flow-branching"
    ],
    "x": 460,
    "y": 270,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ScopeChainInspector",
        "narrative": {
          "en": "Computers are remarkable not because they do complex tasks in a single miraculous stroke, but because they can execute simple operations millions of times per second without getting fatigued. Doing something repeatedly is called iteration (or looping).\n\nTo understand a loop, we must understand State Accumulation. Imagine you are tasked with counting the total weight of a bag of coins. You start with an empty balance sheet displaying 0. You pick up one coin, add its weight to your running total, and discard the coin. You repeat this exact same motion until no coins remain.\n\nEvery corr",
          "ar": "لا تكمن القوة العظمى للحواسيب في قيامها بعمليات سحرية معقدة، بل في قدرتها الفائقة على تكرار خطوات حسابية بسيطة مليارات المرات في الثانية دون تعب أو ملل. هذا التكرار يُعرف برمجياً بـ التكرار الحلقي (Iteration / Loops).\nلفهم الحلقة التكرارية، يجب إدراك مفهوم تراكم الحالة (State Accumulation). تخيل أنك تقوم بحساب الوزن الإجمالي لكومة من العملات المعدنية. تبدأ بدفتر فارغ يسجل الرقم 0. تلتقط عملة واحدة، وتضيف وزنها إلى المجموع التراكمي، ثم تنحيها جانباً. وتكرر ذات الحركة الرتيبة تماماً.\nتعتمد أي حلقة برمجية سليمة على ركيزتين:\n1. اللامتغير الحلقي (Loop Invariant): حقيقة منطقية ثابتة تظ"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\begin{aligned}\n\\text{Initialization (Base):} \\quad & \\mathcal{P} \\implies \\mathcal{I} \\\\\n\\text{Maintenance (Inductive Step):} \\quad & \\{\\mathcal{I} \\land B\\} \\; S \\; \\{\\mathcal{I}\\} \\\\\n\\text{Termination (Strict Decrease):} \\quad & \\{\\mathcal{I} \\land B \\land V = v_0\\} \\; S \\; \\{V < v_0 \\land V \\ge 0\\} \\\\\n\\text{Conclusion:} \\quad & (\\mathcal{I} \\land \\neg B) \\implies \\mathcal{Q}\n\\end{aligned}",
        "formulaNote": {
          "en": "Core invariant for Iteration, Invariants & State Accumulation.",
          "ar": "الخاصية الرياضية الجوهرية لـ التكرار الحلقي، اللامتغيرات (Invariants)، وتراكم الحالة."
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
          "id": "py-iteration-state-accumulation",
          "starterCode": "from typing import Callable\n\ndef make_stateful_accumulator(\n    initial_val: int = 0, \n    step_multiplier: int = 1\n) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]:\n    \"\"\"\n    Creates an encapsulated stateful accumulator using lexical closures and nonlocal bindings.\n\n    Returns:\n        A tuple of (add_func, get_func, reset_func).\n    \"\"\"\n    # TODO: Implement closures with nonlocal variable binding\n    raise NotImplementedError(\"Implement make_stateful_accumulator\")",
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
              "starterCode": "from typing import Callable\n\ndef make_stateful_accumulator(\n    initial_val: int = 0, \n    step_multiplier: int = 1\n) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]:\n    \"\"\"\n    Creates an encapsulated stateful accumulator using lexical closures and nonlocal bindings.\n\n    Returns:\n        A tuple of (add_func, get_func, reset_func).\n    \"\"\"\n    # TODO: Implement closures with nonlocal variable binding\n    raise NotImplementedError(\"Implement make_stateful_accumulator\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\n\ndef make_stateful_accumulator(\n    initial_val: int = 0, \n    step_multiplier: int = 1\n) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]:\n    # Enclosed state variable in the enclosing frame\n    current_val: int = initial_val\n\n    def add(delta: int) -> int:\n        nonlocal current_val\n        current_val += delta * step_multiplier\n        return current_val\n\n    def get() -> int:\n        # Read-only access does not require nonlocal\n        return current_val\n\n    def reset() -> None:\n        nonlocal current_val\n        current_val = initial_val\n\n    return (add, get, reset)"
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
            "en": "What is the foundational invariant governing Iteration, Invariants & State Accumulation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التكرار الحلقي، اللامتغيرات (Invariants)، وتراكم الحالة؟"
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
    "id": "pure-functions-recursion",
    "title": "Pure Functions, Referential Transparency & Stack Frames",
    "titleAr": "الدوال النقية، الشفافية الإسنادية، وأطر مكدس الاستدعاء",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When you learned mathematics in school, a function like $f(x) = x^2$ had a sacred property: if you plugged in $3$, you got $9$. It did not m...",
      "ar": "في الرياضيات المدرسية، عندما نقول $f(x) = x^2$، فإن هذا الاقتران يمتلك قدسية خاصة: إذا عوضت بالرقم $3$، ستحصل حتماً على $9$. لن يتغير الناتج..."
    },
    "prerequisites": [
      "iteration-state-accumulation"
    ],
    "x": 445,
    "y": 365,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ReferentialTransparencyLab",
        "narrative": {
          "en": "When you learned mathematics in school, a function like $f(x) = x^2$ had a sacred property: if you plugged in $3$, you got $9$. It did not matter whether you asked on a Tuesday, in the rain, or on the moon—$f(3)$ was always $9$. Furthermore, computing $f(3)$ did not cause your house lights to flicker or your bank balance to change.\n\nIn computer programming, this is called a Pure Function. A pure function has two golden rules:\n1. It yields the exact same return value whenever given the exact same arguments.\n2. It causes zero Side Effects—it does not alter any global variables, write t",
          "ar": "في الرياضيات المدرسية، عندما نقول $f(x) = x^2$، فإن هذا الاقتران يمتلك قدسية خاصة: إذا عوضت بالرقم $3$، ستحصل حتماً على $9$. لن يتغير الناتج إن حسبته يوم الجمعة أو تحت المطر. والأهم من ذلك: حساب $f(3)$ لن يتسبب في تشغيل مكنسة كهربائية في غرفتك!\nفي هندسة البرمجيات، يُطلق على هذا الدالة النقية (Pure Function). تمتلك الدالة النقية ركيزتين:\n1. تعطي نفس القيمة دائماً عند تمرير نفس المدخلات.\n2. لا تسبب أي آثار جانبية (Side Effects)، فلا تغير متغيراً عاماً خارجها، ولا تكتب على القرص الصلب، ولا تطبع نصوصاً خفية.\nهذا يمنحها خاصية الشفافية الإسنادية (Referential Transparency): يمكنك استبدال"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\forall x \\in \\mathcal{A}, \\quad \\mu_{\\text{pre}} \\xrightarrow{f(x)} \\langle y, \\mu_{\\text{post}} \\rangle \\implies \\mu_{\\text{pre}} \\equiv \\mu_{\\text{post}} \\quad \\land \\quad y = f(x)",
        "formulaNote": {
          "en": "Core invariant for Pure Functions, Referential Transparency & Stack Frames.",
          "ar": "الخاصية الرياضية الجوهرية لـ الدوال النقية، الشفافية الإسنادية، وأطر مكدس الاستدعاء."
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
          "id": "py-pure-functions-recursion",
          "starterCode": "from typing import Any\n\ndef pure_min_max_scale(\n    records: list[dict[str, Any]], \n    target_key: str, \n    feature_range: tuple[float, float] = (0.0, 1.0)\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Purely transforms a list of record dicts by scaling target_key into feature_range,\n    guaranteeing zero mutation to input dictionaries.\n\n    Args:\n        records: List of dictionaries representing tabular records.\n        target_key: The numeric field to scale.\n        feature_range: Target interval (a, b).\n\n    Returns:\n        A new list of freshly allocated dictionaries with scaled target_key.\n    \"\"\"\n    # TODO: Implement pure scaling without in-place mutation\n    raise NotImplementedError(\"Implement pure_min_max_scale\")",
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
              "starterCode": "from typing import Any\n\ndef pure_min_max_scale(\n    records: list[dict[str, Any]], \n    target_key: str, \n    feature_range: tuple[float, float] = (0.0, 1.0)\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Purely transforms a list of record dicts by scaling target_key into feature_range,\n    guaranteeing zero mutation to input dictionaries.\n\n    Args:\n        records: List of dictionaries representing tabular records.\n        target_key: The numeric field to scale.\n        feature_range: Target interval (a, b).\n\n    Returns:\n        A new list of freshly allocated dictionaries with scaled target_key.\n    \"\"\"\n    # TODO: Implement pure scaling without in-place mutation\n    raise NotImplementedError(\"Implement pure_min_max_scale\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\n\ndef pure_min_max_scale(\n    records: list[dict[str, Any]], \n    target_key: str, \n    feature_range: tuple[float, float] = (0.0, 1.0)\n) -> list[dict[str, Any]]:\n    a, b = feature_range\n    \n    # Filter valid numeric entries without mutating inputs\n    valid_values: list[float] = [\n        float(r[target_key]) \n        for r in records \n        if target_key in r and r[target_key] is not None and isinstance(r[target_key], (int, float))\n    ]\n    \n    if not valid_values:\n        return []\n        \n    x_min = min(valid_values)\n    x_max = max(valid_values)\n    spread = x_max - x_min\n    \n    output: list[dict[str, Any]] = []\n    for r in records:\n        if target_key not in r or r[target_key] is None or not isinstance(r[target_key], (int, float)):\n            continue\n            \n        val = float(r[target_key])\n        scaled_val = a if spread == 0.0 else a + ((val - x_min) / spread) * (b - a)\n        \n        # Allocate a fresh dictionary using modern dictionary unpacking\n        new_record = {**r, target_key: round(scaled_val, 6)}\n        output.append(new_record)\n        \n    return output"
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
            "en": "What is the foundational invariant governing Pure Functions, Referential Transparency & Stack Frames?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الدوال النقية، الشفافية الإسنادية، وأطر مكدس الاستدعاء؟"
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
    "id": "first-class-closures",
    "title": "First-Class Functions & Higher-Order Combinators",
    "titleAr": "دوال الرتبة الأولى والمجمعات الوظيفية العليا (Map, Filter, Fold)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In rigid legacy programming languages, functions were treated like rigid factory machines bolted to the floor: you could feed data into them...",
      "ar": "في اللغات البرمجية القديمة والجامدة، كانت الدوال تُعامل كآلات ثقيلة مثبتة في أرضية المصنع: يمكنك تلقيمها بالبيانات، لكن لا يمكنك تحريك الآلة..."
    },
    "prerequisites": [
      "pure-functions-recursion"
    ],
    "x": 460,
    "y": 460,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "HigherOrderPipelineCanvas",
        "narrative": {
          "en": "In rigid legacy programming languages, functions were treated like rigid factory machines bolted to the floor: you could feed data into them, but you could never move the machine itself. \n\nIn modern languages, functions are First-Class Citizens. This means a function is treated exactly like any ordinary value—like an integer, a string, or a decimal. You can assign a function to a variable, store functions inside a list, pass a function as an argument into another function, or even write a function whose entire job is to manufacture and return brand-new functions!\n\nA function that accepts a",
          "ar": "في اللغات البرمجية القديمة والجامدة، كانت الدوال تُعامل كآلات ثقيلة مثبتة في أرضية المصنع: يمكنك تلقيمها بالبيانات، لكن لا يمكنك تحريك الآلة نفسها.\nفي اللغات الحديثة، تُعتبر الدوال كائنات من الرتبة الأولى (First-Class Citizens). هذا يعني أن الدالة تعامل تماماً كأي رقم أو نص عادي: يمكنك تخزينها في متغير، ووضعها داخل قائمة، وتمريرها كوسيط (Argument) إلى دالة أخرى، أو حتى جعل دالة تنشئ دالة جديدة وتعيدها كناتج!\nالدالة التي تقبل دالة أخرى أو تعيدها تسمى دالة من الرتبة العليا (Higher-Order Function). ومن هنا ينبثق الثالوث المقدس لمعالجة البيانات:\n التحويل (Map): يمر على كل عنصر في"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{map}: (\\mathcal{A} \\to \\mathcal{B}) \\times \\mathcal{L}(\\mathcal{A}) \\to \\mathcal{L}(\\mathcal{B})",
        "formulaNote": {
          "en": "Core invariant for First-Class Functions & Higher-Order Combinators.",
          "ar": "الخاصية الرياضية الجوهرية لـ دوال الرتبة الأولى والمجمعات الوظيفية العليا (Map, Filter, Fold)."
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
          "id": "py-first-class-closures",
          "starterCode": "from typing import Callable, Any\n\nclass PipelineExecutionError(Exception):\n    \"\"\"Raised when an intermediate stage of a pipeline fails.\"\"\"\n    pass\n\ndef compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]:\n    \"\"\"\n    Composes arbitrary unary functions into a left-to-right execution pipeline.\n    \n    Returns a callable with a .steps attribute and error wrapping.\n    \"\"\"\n    # TODO: Implement left-to-right function pipeline\n    raise NotImplementedError(\"Implement compose_pipeline\")",
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
              "starterCode": "from typing import Callable, Any\n\nclass PipelineExecutionError(Exception):\n    \"\"\"Raised when an intermediate stage of a pipeline fails.\"\"\"\n    pass\n\ndef compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]:\n    \"\"\"\n    Composes arbitrary unary functions into a left-to-right execution pipeline.\n    \n    Returns a callable with a .steps attribute and error wrapping.\n    \"\"\"\n    # TODO: Implement left-to-right function pipeline\n    raise NotImplementedError(\"Implement compose_pipeline\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable, Any\nfrom functools import reduce\n\nclass PipelineExecutionError(Exception):\n    pass\n\ndef compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]:\n    steps_tuple: tuple[Callable[[Any], Any], ...] = tuple(funcs)\n\n    def pipeline(initial_val: Any) -> Any:\n        current = initial_val\n        for idx, fn in enumerate(steps_tuple):\n            try:\n                current = fn(current)\n            except Exception as e:\n                fn_name = getattr(fn, \"__name__\", repr(fn))\n                raise PipelineExecutionError(\n                    f\"Pipeline failed at stage {idx} ({fn_name}): {str(e)}\"\n                ) from e\n        return current\n\n    # Expose immutable metadata attribute\n    pipeline.steps = steps_tuple  # type: ignore[attr-defined]\n    return pipeline"
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
            "en": "What is the foundational invariant governing First-Class Functions & Higher-Order Combinators?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم دوال الرتبة الأولى والمجمعات الوظيفية العليا (Map, Filter, Fold)؟"
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
    "id": "scope-resolution-legb",
    "title": "Lexical Scope, Static Binding & Closures",
    "titleAr": "النطاق المعجمي (Lexical Scope) والأغلفة الوظيفية (Closures)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When a function runs, it looks for variables in its local environment frame. But what happens if a variable is not defined inside the functi...",
      "ar": "عندما تعمل دالة، تبحث عن المتغيرات في إطارها المحلي. ولكن ماذا لو استخدمت الدالة متغيراً لم يُعرّف في داخلها؟\nتتبع اللغات الحديثة ما يسمى بـ..."
    },
    "prerequisites": [
      "first-class-closures"
    ],
    "x": 445,
    "y": 555,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ClosureScopeInspector",
        "narrative": {
          "en": "When a function runs, it looks for variables in its local environment frame. But what happens if a variable is not defined inside the function? \n\nProgramming languages use Lexical Scope (also called Static Scope). The word \"lexical\" means \"relating to text\". Lexical scope means that where a function is physically written on your screen determines where it searches for missing variables—not where the function happens to be called later!\n\nNow comes the magic: what happens if an outer function creates an inner function, and that inner function uses a variable from the outer function? \nWhen",
          "ar": "عندما تعمل دالة، تبحث عن المتغيرات في إطارها المحلي. ولكن ماذا لو استخدمت الدالة متغيراً لم يُعرّف في داخلها؟\nتتبع اللغات الحديثة ما يسمى بـ النطاق المعجمي (Lexical Scope). كلمة \"معجمي\" تعني \"متعلق بموقع النص المكتوب\". أي أن المكان الذي كُتبت فيه الدالة فعلياً على شاشتك هو الذي يحدد أين تبحث عن المتغيرات المفقودة، وليس المكان الذي تم استدعاؤها منه لاحقاً!\nوهنا تحدث المعجزة البرمجية المسماة الغلاف الوظيفي (Closure): ماذا لو قامت دالة خارجية بتوليد دالة داخلية، وكانت الدالة الداخلية تستخدم متغيراً من الدالة الخارجية؟\nعندما تنتهي الدالة الخارجية، يُفترض أن تُمسح متغيراتها من الذاكرة. ولكن"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{C} = \\langle \\lambda x. e, \\; \\mathcal{E}_{\\text{def}} \\rangle",
        "formulaNote": {
          "en": "Core invariant for Lexical Scope, Static Binding & Closures.",
          "ar": "الخاصية الرياضية الجوهرية لـ النطاق المعجمي (Lexical Scope) والأغلفة الوظيفية (Closures)."
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
          "id": "py-scope-resolution-legb",
          "starterCode": "from typing import Callable\nfrom collections import deque\n\ndef make_sliding_rate_limiter(\n    max_calls: int, \n    window_seconds: float\n) -> Callable[[float], tuple[bool, int, float]]:\n    \"\"\"\n    Creates a sliding window rate limiter closure tracking request timestamps.\n\n    Args:\n        max_calls: Maximum requests permitted per window.\n        window_seconds: Duration of the sliding window in seconds.\n\n    Returns:\n        A callable taking a timestamp and returning (allowed, remaining, reset_time).\n    \"\"\"\n    # TODO: Implement sliding window rate limiter closure\n    raise NotImplementedError(\"Implement make_sliding_rate_limiter\")",
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
              "starterCode": "from typing import Callable\nfrom collections import deque\n\ndef make_sliding_rate_limiter(\n    max_calls: int, \n    window_seconds: float\n) -> Callable[[float], tuple[bool, int, float]]:\n    \"\"\"\n    Creates a sliding window rate limiter closure tracking request timestamps.\n\n    Args:\n        max_calls: Maximum requests permitted per window.\n        window_seconds: Duration of the sliding window in seconds.\n\n    Returns:\n        A callable taking a timestamp and returning (allowed, remaining, reset_time).\n    \"\"\"\n    # TODO: Implement sliding window rate limiter closure\n    raise NotImplementedError(\"Implement make_sliding_rate_limiter\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\nfrom collections import deque\n\ndef make_sliding_rate_limiter(\n    max_calls: int, \n    window_seconds: float\n) -> Callable[[float], tuple[bool, int, float]]:\n    # Double-ended queue storing active timestamps in enclosed scope\n    timestamps: deque[float] = deque()\n    last_timestamp: float = -1.0\n\n    def rate_limiter(current_time: float) -> tuple[bool, int, float]:\n        nonlocal last_timestamp\n        \n        if current_time < last_timestamp:\n            raise ValueError(\"Timestamps must be monotonically non-decreasing\")\n        last_timestamp = current_time\n\n        # Evict timestamps outside the sliding window (current_time - window_seconds)\n        cutoff: float = current_time - window_seconds\n        while timestamps and timestamps[0] <= cutoff:\n            timestamps.popleft()\n\n        # Check quota\n        if len(timestamps) < max_calls:\n            timestamps.append(current_time)\n            remaining = max_calls - len(timestamps)\n            reset_time = timestamps[0] + window_seconds\n            return (True, remaining, reset_time)\n        else:\n            remaining = 0\n            reset_time = timestamps[0] + window_seconds\n            return (False, remaining, reset_time)\n\n    return rate_limiter"
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
            "en": "What is the foundational invariant governing Lexical Scope, Static Binding & Closures?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم النطاق المعجمي (Lexical Scope) والأغلفة الوظيفية (Closures)؟"
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
    "id": "python-lists-memory-growth",
    "title": "Recursion Trees & Structural Induction",
    "titleAr": "أشجار الاستدعاء الذاتي (Recursion Trees) والاستقراء البنيوي",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "How do you solve a problem that feels overwhelmingly large? You don't try to solve the whole thing at once. You solve a tiny piece of it, an...",
      "ar": "كيف تحل معضلة تبدو شاقة وضخمة؟ لا تحاول حلها دفعة واحدة، بل حل جزءاً يسيراً منها، وستلاحظ أن ما تبقى ليس سوى نسخة طبق الأصل ولكن بحجم أصغر!\n..."
    },
    "prerequisites": [
      "name-binding-lifetime"
    ],
    "x": 460,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PointerAliasingLab",
        "narrative": {
          "en": "How do you solve a problem that feels overwhelmingly large? You don't try to solve the whole thing at once. You solve a tiny piece of it, and then realize the remaining task is simply a smaller version of the exact same problem!\n\nThis mental breakthrough is called Recursion. In programming, a recursive function is simply a function that calls itself. \nEvery valid recursive function must possess two non-negotiable halves:\n1. The Base Case (The Anchor): The simplest possible version of the problem that can be answered immediately without calling anyone. For example: \"If $n = 0$, the answ",
          "ar": "كيف تحل معضلة تبدو شاقة وضخمة؟ لا تحاول حلها دفعة واحدة، بل حل جزءاً يسيراً منها، وستلاحظ أن ما تبقى ليس سوى نسخة طبق الأصل ولكن بحجم أصغر!\nهذا الإدراك هو جوهر الاستدعاء الذاتي (Recursion). برمجياً، الدالة العودية هي دالة تستدعي نفسها في متنها.\nيجب أن تحتوي أي دالة عودية سليمة على ركنين أساسيين:\n1. حالة القاعدة (Base Case / المرساة): أبسط صورة ممكنة للمشكلة، والتي نعرف إجابتها الفورية دون الحاجة لأي استدعاءات إضافية (مثلاً: \"إذا كان $n = 0$ فالناتج $1$\").\n2. الخطوة العودية (Recursive Step): تقليص حجم المشكلة واستدعاء الدالة لنفسها بالمدخل المصغر (مثلاً: حساب مضروب $n$ يتطلب ضرب $n$"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T(n) = a T\\left(\\frac{n}{b}\\right) + f(n)",
        "formulaNote": {
          "en": "Core invariant for Recursion Trees & Structural Induction.",
          "ar": "الخاصية الرياضية الجوهرية لـ أشجار الاستدعاء الذاتي (Recursion Trees) والاستقراء البنيوي."
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
          "id": "py-python-lists-memory-growth",
          "starterCode": "from typing import Any\n\ndef deep_flatten_nested(nested_structure: Any, max_depth: int = 500) -> list[Any]:\n    \"\"\"\n    Flattens arbitrarily nested collections into a 1D list of scalar values,\n    treating strings/bytes as atomic and strictly guarding recursion depth.\n\n    Args:\n        nested_structure: Nested list, tuple, set, or scalar leaf.\n        max_depth: Maximum permissible tree depth.\n\n    Returns:\n        1D list of flattened leaf elements.\n        \n    Raises:\n        RecursionError: If tree depth strictly exceeds max_depth.\n    \"\"\"\n    # TODO: Implement stack-safe tree flattening\n    raise NotImplementedError(\"Implement deep_flatten_nested\")",
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
              "starterCode": "from typing import Any\n\ndef deep_flatten_nested(nested_structure: Any, max_depth: int = 500) -> list[Any]:\n    \"\"\"\n    Flattens arbitrarily nested collections into a 1D list of scalar values,\n    treating strings/bytes as atomic and strictly guarding recursion depth.\n\n    Args:\n        nested_structure: Nested list, tuple, set, or scalar leaf.\n        max_depth: Maximum permissible tree depth.\n\n    Returns:\n        1D list of flattened leaf elements.\n        \n    Raises:\n        RecursionError: If tree depth strictly exceeds max_depth.\n    \"\"\"\n    # TODO: Implement stack-safe tree flattening\n    raise NotImplementedError(\"Implement deep_flatten_nested\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\nfrom collections.abc import Iterable\n\ndef deep_flatten_nested(nested_structure: Any, max_depth: int = 500) -> list[Any]:\n    flattened: list[Any] = []\n    # Explicit traversal stack storing: (current_item, depth)\n    # Using LIFO stack to maintain depth-first left-to-right order\n    stack: list[tuple[Any, int]] = [(nested_structure, 0)]\n\n    while stack:\n        item, depth = stack.pop()\n\n        if depth > max_depth:\n            raise RecursionError(f\"Maximum recursion depth {max_depth} exceeded\")\n\n        # Atomic leaf detection: strings, bytes, and non-iterables\n        if isinstance(item, (str, bytes)) or not isinstance(item, Iterable):\n            flattened.append(item)\n        else:\n            # Convert iterable to list and push in reverse to maintain left-to-right order\n            children = list(item)\n            for child in reversed(children):\n                stack.append((child, depth + 1))\n\n    return flattened"
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
            "en": "What is the foundational invariant governing Recursion Trees & Structural Induction?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم أشجار الاستدعاء الذاتي (Recursion Trees) والاستقراء البنيوي؟"
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
    "id": "hash-tables-dict-internals",
    "title": "Linear Sequences, Memory Layout & Dynamic Arrays",
    "titleAr": "المتتاليات الخطية، التخطيط الذاكري، والمصفوفات الديناميكية",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Physical computer memory (RAM) is not a chaotic cloud; it is a gargantuan, orderly street of numbered houses. Each house holds exactly one b...",
      "ar": "ذاكرة الوصول العشوائي (RAM) ليست فضاءً عشوائياً، بل هي شارع طويل جداً ومنتظم من المنازل المرقمة. كل منزل يخزن بايتاً واحداً، وله عنوان رقمي ..."
    },
    "prerequisites": [
      "python-lists-memory-growth"
    ],
    "x": 445,
    "y": 745,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DynamicArrayGrowthLab",
        "narrative": {
          "en": "Physical computer memory (RAM) is not a chaotic cloud; it is a gargantuan, orderly street of numbered houses. Each house holds exactly one byte (8 bits), and each has a precise integer address ($0, 1, 2, 3, \\dots$). \n\nIf you want to store a list of ten numbers, how should the computer arrange them? The fastest way is to place them in ten houses sitting directly side-by-side: Contiguous Memory. \nWhy? Because if you know the starting address of House 0, finding the address of House 7 requires zero searching! You simply calculate:",
          "ar": "ذاكرة الوصول العشوائي (RAM) ليست فضاءً عشوائياً، بل هي شارع طويل جداً ومنتظم من المنازل المرقمة. كل منزل يخزن بايتاً واحداً، وله عنوان رقمي فريد ($0, 1, 2, \\dots$).\nإذا أردت تخزين عشرة أرقام، فالطريقة الأسرع هي حجز عشرة منازل متلاصقة جنباً إلى جنب: الذاكرة المتصلة (Contiguous Memory).\nلماذا؟ لأنك إذا عرفت عنوان المنزل الأول، فلن تحتاج للبحث عن المنزل السابع خطوة بخطوة؛ بل تحسب عنوانه بعملية رياضية واحدة فورية:"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Target Address} = \\text{Start Address} + (7 \\times \\text{Size of Item})",
        "formulaNote": {
          "en": "Core invariant for Linear Sequences, Memory Layout & Dynamic Arrays.",
          "ar": "الخاصية الرياضية الجوهرية لـ المتتاليات الخطية، التخطيط الذاكري، والمصفوفات الديناميكية."
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
          "id": "py-hash-tables-dict-internals",
          "starterCode": "from typing import TypeVar, Sequence\n\nT = TypeVar(\"T\")\n\ndef rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]:\n    \"\"\"\n    Generates all valid sliding windows of exact length window_size from a sequence.\n\n    Args:\n        seq: Sequence implementing __len__ and __getitem__ (list, tuple, str).\n        window_size: Exact length of each sliding sub-window.\n        step: Stride offset between consecutive window start positions.\n\n    Returns:\n        List of slice sub-sequences.\n    \"\"\"\n    # TODO: Implement rolling window sequence slicer\n    raise NotImplementedError(\"Implement rolling_window_slices\")",
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
              "starterCode": "from typing import TypeVar, Sequence\n\nT = TypeVar(\"T\")\n\ndef rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]:\n    \"\"\"\n    Generates all valid sliding windows of exact length window_size from a sequence.\n\n    Args:\n        seq: Sequence implementing __len__ and __getitem__ (list, tuple, str).\n        window_size: Exact length of each sliding sub-window.\n        step: Stride offset between consecutive window start positions.\n\n    Returns:\n        List of slice sub-sequences.\n    \"\"\"\n    # TODO: Implement rolling window sequence slicer\n    raise NotImplementedError(\"Implement rolling_window_slices\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import TypeVar, Sequence\n\nT = TypeVar(\"T\")\n\ndef rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]:\n    n = len(seq)\n    if window_size <= 0 or step <= 0 or window_size > n:\n        return []\n\n    windows: list[Sequence[T]] = []\n    # Calculate upper bound for start index such that start + window_size <= n\n    max_start = n - window_size\n    \n    for start_idx in range(0, max_start + 1, step):\n        # Native slice preserves the underlying sequence type (e.g. str -> str, tuple -> tuple)\n        windows.append(seq[start_idx : start_idx + window_size])\n\n    return windows"
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
            "en": "What is the foundational invariant governing Linear Sequences, Memory Layout & Dynamic Arrays?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المتتاليات الخطية، التخطيط الذاكري، والمصفوفات الديناميكية؟"
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
    "id": "tuples-immutability-sets",
    "title": "Pointers, References, Aliasing & Mutation",
    "titleAr": "المؤشرات، الدلالات المرجعية، والأسماء المستعارة (Aliasing)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the digital world, there is a monumental difference between having two identical cars, and having two sets of keys to the same car. \n\nIf ...",
      "ar": "في العالم الرقمي، هناك فارق جوهري هائل بين أن تمتلك سيارتين متطابقتين، وبين أن تمتلك نسختين من المفاتيح لـ نفس السيارة الوحيدة.\nإذا اشتريت س..."
    },
    "prerequisites": [
      "hash-tables-dict-internals"
    ],
    "x": 460,
    "y": 840,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RecursionTreeExplorer",
        "narrative": {
          "en": "In the digital world, there is a monumental difference between having two identical cars, and having two sets of keys to the same car. \n\nIf you own a red sedan and your neighbor owns an identical red sedan, you have two distinct objects that happen to look equal. If you dent your fender, your neighbor's car remains pristine. \nHowever, if you and your spouse both have keys to the same red sedan, there is only one car. If your spouse takes the car and paints it bright yellow, the next time you walk into the garage, your car is yellow!\n\nIn Python:\n Two keys to the same object is called Ali",
          "ar": "في العالم الرقمي، هناك فارق جوهري هائل بين أن تمتلك سيارتين متطابقتين، وبين أن تمتلك نسختين من المفاتيح لـ نفس السيارة الوحيدة.\nإذا اشتريت سيارة بيضاء واشترى جارك سيارة بيضاء مطابقة، فهما كائنان منفصلان. إذا صدمت سيارتك، فلن تتأثر سيارة جارك.\nأما إذا كنت أنت وشريكك تمتلكان نسختين من المفاتيح لذات السيارة، فهناك سيارة واحدة فقط في الواقع. إذا استخدم شريكك نسخته وقام بطلاء السيارة باللون الأسود، فعندما تفتح أنت المرآب ستجد سيارتك سوداء!\nفي بايثون:\n وجود اسمين يشيران لذات الكائن في الذاكرة يسمى الاسم المستعار (Aliasing)، ونتحقق منه عبر is (فحص هوية العنوان الفيزيائي).\n وجود كائنين منفصل"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\begin{aligned}\na == b &\\iff \\text{val}(a) \\equiv \\text{val}(b) \\\\\na \\text{ is } b &\\iff \\text{addr}(a) = \\text{addr}(b)\n\\end{aligned}",
        "formulaNote": {
          "en": "Core invariant for Pointers, References, Aliasing & Mutation.",
          "ar": "الخاصية الرياضية الجوهرية لـ المؤشرات، الدلالات المرجعية، والأسماء المستعارة (Aliasing)."
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
          "id": "py-tuples-immutability-sets",
          "starterCode": "from typing import Any\n\ndef safe_deep_clone_graph(obj: Any) -> Any:\n    \"\"\"\n    Deeply clones a complex Python data structure, preserving DAG topology\n    and circular references via object identity memoization.\n\n    Args:\n        obj: Arbitrary nested Python structure (dict, list, set, tuple, primitives).\n\n    Returns:\n        A completely isolated deep clone with preserved reference topologies.\n    \"\"\"\n    # TODO: Implement memoized deep copy with cycle handling\n    raise NotImplementedError(\"Implement safe_deep_clone_graph\")",
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
              "starterCode": "from typing import Any\n\ndef safe_deep_clone_graph(obj: Any) -> Any:\n    \"\"\"\n    Deeply clones a complex Python data structure, preserving DAG topology\n    and circular references via object identity memoization.\n\n    Args:\n        obj: Arbitrary nested Python structure (dict, list, set, tuple, primitives).\n\n    Returns:\n        A completely isolated deep clone with preserved reference topologies.\n    \"\"\"\n    # TODO: Implement memoized deep copy with cycle handling\n    raise NotImplementedError(\"Implement safe_deep_clone_graph\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\n\ndef safe_deep_clone_graph(obj: Any) -> Any:\n    memo: dict[int, Any] = {}\n\n    def _clone(node: Any) -> Any:\n        node_id = id(node)\n        if node_id in memo:\n            return memo[node_id]\n\n        # Handle Primitives & Immutables\n        if isinstance(node, (int, float, str, bool, type(None), bytes)):\n            return node\n\n        # Handle List\n        if isinstance(node, list):\n            cloned_list: list[Any] = []\n            memo[node_id] = cloned_list  # Register before recursive calls to break cycles\n            for item in node:\n                cloned_list.append(_clone(item))\n            return cloned_list\n\n        # Handle Dictionary\n        if isinstance(node, dict):\n            cloned_dict: dict[Any, Any] = {}\n            memo[node_id] = cloned_dict  # Register early\n            for k, v in node.items():\n                cloned_dict[_clone(k)] = _clone(v)\n            return cloned_dict\n\n        # Handle Set\n        if isinstance(node, set):\n            cloned_set: set[Any] = set()\n            memo[node_id] = cloned_set\n            for item in node:\n                cloned_set.add(_clone(item))\n            return cloned_set\n\n        # Handle Tuple (recursively clone elements; if tuple contains mutables, must rebuild)\n        if isinstance(node, tuple):\n            cloned_tuple_items = [_clone(item) for item in node]\n            cloned_tuple = tuple(cloned_tuple_items)\n            memo[node_id] = cloned_tuple\n            return cloned_tuple\n\n        return node\n\n    return _clone(obj)"
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
            "en": "What is the foundational invariant governing Pointers, References, Aliasing & Mutation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المؤشرات، الدلالات المرجعية، والأسماء المستعارة (Aliasing)؟"
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
    "id": "object-oriented-dunder",
    "title": "Hash Functions, Direct Addressing & Determinism",
    "titleAr": "دوال التجزئة (Hash Functions)، العنونة المباشرة، والتوزيع المنتظم",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you manage a physical library containing 10,000,000 books. A patron walks in and asks: \"Do you have 'The Great Gatsby'?\"\nIf the book...",
      "ar": "تخيل أنك تدير مكتبة تحتوي على 10 ملايين كتاب. جاءك زائر وسألك: \"هل يتوفر لديكم كتاب 'الأيام لطه حسين'؟\"\nإذا كانت الكتب مبعثرة عشوائياً، فستض..."
    },
    "prerequisites": [
      "tuples-immutability-sets"
    ],
    "x": 445,
    "y": 935,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "HashTableBucketLab",
        "narrative": {
          "en": "Imagine you manage a physical library containing 10,000,000 books. A patron walks in and asks: \"Do you have 'The Great Gatsby'?\"\nIf the books are tossed randomly on shelves, how do you find it? You have to inspect every single book one by one. In the worst case, you examine all 10,000,000 books ($O(N)$ linear time). Even with alphabetical sorting and binary search, you must perform ~24 comparisons ($O(\\log N)$).\n\nCan we find it in exactly one step ($O(1)$)?\nYes! What if we invent a mathematical meat grinder: you feed in the title \"The Great Gatsby\", and the grinder crunches the character",
          "ar": "تخيل أنك تدير مكتبة تحتوي على 10 ملايين كتاب. جاءك زائر وسألك: \"هل يتوفر لديكم كتاب 'الأيام لطه حسين'؟\"\nإذا كانت الكتب مبعثرة عشوائياً، فستضطر لفحصها كتاباً تلو الآخر، وهو أمر قد يستغرق شهوراً ($O(N)$). وحتى لو كانت مرتبة هجائياً، فستحتاج لتقسيم الرفوف والبحث في 24 محطة ($O(\\log N)$).\nهل يمكن إيجاد الكتاب في خطوة واحدة فقط ($O(1)$)؟\nنعم! تخيل أن لدينا \"مطحنة رياضية\": تلقمها بعنوان الكتاب، فتطحن حروفه وتخرج لك فوراً رقماً محدداً: 4819. تتجه مباشرة إلى الرف رقم 4819 فتجد الكتاب بانتظارك!\nهذه الآلة الرياضية هي دالة التجزئة (Hash Function). إنها تحول أي بيانات ذات حجم عشوائي (نصوص، ص"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "h: \\mathcal{K} \\to \\{0, 1, \\dots, M - 1\\}",
        "formulaNote": {
          "en": "Core invariant for Hash Functions, Direct Addressing & Determinism.",
          "ar": "الخاصية الرياضية الجوهرية لـ دوال التجزئة (Hash Functions)، العنونة المباشرة، والتوزيع المنتظم."
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
          "id": "py-object-oriented-dunder",
          "starterCode": "from typing import TypeVar, Generic\n\nK = TypeVar(\"K\")\nV = TypeVar(\"V\")\n\nclass LinearProbeHashTable(Generic[K, V]):\n    \"\"\"\n    Fixed-capacity open-addressing hash table resolving collisions with linear probing\n    and preserving search probe continuity using deletion tombstones.\n    \"\"\"\n    def __init__(self, capacity: int = 16) -> None:\n        # TODO: Initialize bucket array with tombstones\n        raise NotImplementedError(\"Implement LinearProbeHashTable.__init__\")\n\n    def put(self, key: K, value: V) -> bool:\n        # TODO: Implement put with collision resolution\n        raise NotImplementedError(\"Implement LinearProbeHashTable.put\")\n\n    def get(self, key: K) -> V | None:\n        # TODO: Implement get probing through tombstones\n        raise NotImplementedError(\"Implement LinearProbeHashTable.get\")\n\n    def delete(self, key: K) -> bool:\n        # TODO: Implement delete leaving tombstone\n        raise NotImplementedError(\"Implement LinearProbeHashTable.delete\")\n\n    def load_factor(self) -> float:\n        # TODO: Return occupied_count / capacity\n        raise NotImplementedError(\"Implement LinearProbeHashTable.load_factor\")",
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
              "starterCode": "from typing import TypeVar, Generic\n\nK = TypeVar(\"K\")\nV = TypeVar(\"V\")\n\nclass LinearProbeHashTable(Generic[K, V]):\n    \"\"\"\n    Fixed-capacity open-addressing hash table resolving collisions with linear probing\n    and preserving search probe continuity using deletion tombstones.\n    \"\"\"\n    def __init__(self, capacity: int = 16) -> None:\n        # TODO: Initialize bucket array with tombstones\n        raise NotImplementedError(\"Implement LinearProbeHashTable.__init__\")\n\n    def put(self, key: K, value: V) -> bool:\n        # TODO: Implement put with collision resolution\n        raise NotImplementedError(\"Implement LinearProbeHashTable.put\")\n\n    def get(self, key: K) -> V | None:\n        # TODO: Implement get probing through tombstones\n        raise NotImplementedError(\"Implement LinearProbeHashTable.get\")\n\n    def delete(self, key: K) -> bool:\n        # TODO: Implement delete leaving tombstone\n        raise NotImplementedError(\"Implement LinearProbeHashTable.delete\")\n\n    def load_factor(self) -> float:\n        # TODO: Return occupied_count / capacity\n        raise NotImplementedError(\"Implement LinearProbeHashTable.load_factor\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import TypeVar, Generic\n\nK = TypeVar(\"K\")\nV = TypeVar(\"V\")\n\n# Sentinel token for deleted slots\n_TOMBSTONE = object()\n\nclass LinearProbeHashTable(Generic[K, V]):\n    def __init__(self, capacity: int = 16) -> None:\n        self.capacity: int = capacity\n        self.keys: list[Any] = [None] * capacity\n        self.values: list[Any] = [None] * capacity\n        self._count: int = 0\n\n    def _hash(self, key: K) -> int:\n        return hash(key) % self.capacity\n\n    def put(self, key: K, value: V) -> bool:\n        start_idx = self._hash(key)\n        first_tombstone: int | None = None\n\n        for step in range(self.capacity):\n            idx = (start_idx + step) % self.capacity\n            slot_key = self.keys[idx]\n\n            if slot_key is None:\n                # Empty slot: insert here or at first seen tombstone\n                target_idx = first_tombstone if first_tombstone is not None else idx\n                self.keys[target_idx] = key\n                self.values[target_idx] = value\n                self._count += 1\n                return True\n\n            if slot_key is _TOMBSTONE:\n                if first_tombstone is None:\n                    first_tombstone = idx\n                continue\n\n            if slot_key == key:\n                # Key already exists: update in place\n                self.values[idx] = value\n                return True\n\n        if first_tombstone is not None:\n            self.keys[first_tombstone] = key\n            self.values[first_tombstone] = value\n            self._count += 1\n            return True\n\n        raise OverflowError(\"Hash table is full\")\n\n    def get(self, key: K) -> V | None:\n        start_idx = self._hash(key)\n        for step in range(self.capacity):\n            idx = (start_idx + step) % self.capacity\n            slot_key = self.keys[idx]\n\n            if slot_key is None:\n                # Unbroken chain ended without finding key\n                return None\n            if slot_key is not _TOMBSTONE and slot_key == key:\n                return self.values[idx]\n\n        return None\n\n    def delete(self, key: K) -> bool:\n        start_idx = self._hash(key)\n        for step in range(self.capacity):\n            idx = (start_idx + step) % self.capacity\n            slot_key = self.keys[idx]\n\n            if slot_key is None:\n                return False\n            if slot_key is not _TOMBSTONE and slot_key == key:\n                self.keys[idx] = _TOMBSTONE\n                self.values[idx] = None\n                self._count -= 1\n                return True\n\n        return False\n\n    def load_factor(self) -> float:\n        return self._count / self.capacity"
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
            "en": "What is the foundational invariant governing Hash Functions, Direct Addressing & Determinism?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم دوال التجزئة (Hash Functions)، العنونة المباشرة، والتوزيع المنتظم؟"
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
    "id": "iterators-generators-streams",
    "title": "Collision Resolution, Load Factors & Dynamic Resizing",
    "titleAr": "معالجة تصادمات التجزئة، معامل التحميل ($\\alpha$)، وإعادة التحجيم الديناميكي",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "What happens if two totally different book titles get fed into our hash function, and both produce the exact same bucket number?\nBy the Pige...",
      "ar": "ماذا يحدث إذا أدخلنا كتابين مختلفين تماماً في دالة التجزئة، وأنتجت الدالة نفس رقم الرف بالضبط؟\nوفق مبدأ برج الحمام (Pigeonhole Principle): إ..."
    },
    "prerequisites": [
      "object-oriented-dunder"
    ],
    "x": 460,
    "y": 1030,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CompactDictLayoutLab",
        "narrative": {
          "en": "What happens if two totally different book titles get fed into our hash function, and both produce the exact same bucket number?\nBy the Pigeonhole Principle, if you have 10 pigeons and only 9 holes, at least one hole must contain more than one pigeon. Because the universe of possible strings is infinite and our computer memory table is finite, collisions are mathematically impossible to prevent!\n\nHow does a Hash Table handle this collision without losing data?\nTwo primary strategies exist:\n1. Chaining: Each bucket is not a single slot, but a hook holding a chain (linked list). If two i",
          "ar": "ماذا يحدث إذا أدخلنا كتابين مختلفين تماماً في دالة التجزئة، وأنتجت الدالة نفس رقم الرف بالضبط؟\nوفق مبدأ برج الحمام (Pigeonhole Principle): إذا كان لديك 10 حمامات و 9 فتحات فقط، فلا بد حتماً أن تشترك حمامتان في فتحة واحدة على الأقل. ولأن النصوص المحتملة في العالم لا حصر لها، وحجم ذاكرة الحاسوب محدود، فإن التصادمات (Collisions) حتمية رياضياً!\nكيف يتعامل جدول التجزئة (Hash Table) مع هذا التصادم دون ضياع البيانات؟\nهناك طريقتان رئيستان:\n1. السلاسل المترابطة (Chaining): كل فتحة لا تحتوي عنصراً واحداً، بل سلسلة يتدلى منها أي عدد من العناصر المتصادمة.\n2. العنونة المفتوحة والاستكشاف (Open"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\alpha = \\frac{N}{M}",
        "formulaNote": {
          "en": "Core invariant for Collision Resolution, Load Factors & Dynamic Resizing.",
          "ar": "الخاصية الرياضية الجوهرية لـ معالجة تصادمات التجزئة، معامل التحميل ($\\alpha$)، وإعادة التحجيم الديناميكي."
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
          "id": "py-iterators-generators-streams",
          "starterCode": "def find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]:\n    \"\"\"\n    Finds all index pairs (i, j) with i < j such that nums[i] + nums[j] == target\n    using a single-pass hash map index.\n\n    Args:\n        nums: List of integers.\n        target: Target sum.\n\n    Returns:\n        List of 0-based index tuples (i, j) sorted lexicographically.\n    \"\"\"\n    # TODO: Implement O(N) hash map complementary pairing\n    raise NotImplementedError(\"Implement find_all_target_pairs\")",
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
              "starterCode": "def find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]:\n    \"\"\"\n    Finds all index pairs (i, j) with i < j such that nums[i] + nums[j] == target\n    using a single-pass hash map index.\n\n    Args:\n        nums: List of integers.\n        target: Target sum.\n\n    Returns:\n        List of 0-based index tuples (i, j) sorted lexicographically.\n    \"\"\"\n    # TODO: Implement O(N) hash map complementary pairing\n    raise NotImplementedError(\"Implement find_all_target_pairs\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from collections import defaultdict\n\ndef find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]:\n    # Map each value to a list of its seen 0-based indices\n    seen_indices: dict[int, list[int]] = defaultdict(list)\n    pairs: list[tuple[int, int]] = []\n\n    for current_idx, val in enumerate(nums):\n        complement = target - val\n        if complement in seen_indices:\n            # All previously seen indices of complement form valid pairs (prev_idx, current_idx)\n            for prev_idx in seen_indices[complement]:\n                pairs.append((prev_idx, current_idx))\n\n        seen_indices[val].append(current_idx)\n\n    # Sort lexicographically for deterministic verification\n    pairs.sort()\n    return pairs"
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
            "en": "What is the foundational invariant governing Collision Resolution, Load Factors & Dynamic Resizing?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم معالجة تصادمات التجزئة، معامل التحميل ($\\alpha$)، وإعادة التحجيم الديناميكي؟"
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
    "id": "context-managers-resources",
    "title": "Asymptotic Analysis & Big-O Rigor",
    "titleAr": "التحليل المقارب (Asymptotic Analysis) وتدقيق Big-O الصارم",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When you evaluate how fast a software algorithm runs, you cannot use a stopwatch. Why? Because a stopwatch measures your specific laptop's h...",
      "ar": "عندما نريد قياس سرعة خوارزمية برمجية، لا يمكننا استخدام ساعة توقيت (Stopwatch). لماذا؟ لأن ساعة التوقيت تقيس سرعة جهازك الشخصي، وحرارة معالج..."
    },
    "prerequisites": [
      "iterators-generators-streams"
    ],
    "x": 445,
    "y": 1125,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "BigOComplexityRacer",
        "narrative": {
          "en": "When you evaluate how fast a software algorithm runs, you cannot use a stopwatch. Why? Because a stopwatch measures your specific laptop's hardware, whether your battery is dying, what music is playing in the background, and what programming compiler you used. A stopwatch tells you about a machine, not about the algorithm.\n\nComputer scientists use Asymptotic Analysis (Big-O Notation) to measure the intrinsic mathematical efficiency of an idea, completely divorced from hardware.\n\nBig-O asks one fundamental question:\n\"As the size of the data input ($N$) explodes toward infinity, how doe",
          "ar": "عندما نريد قياس سرعة خوارزمية برمجية، لا يمكننا استخدام ساعة توقيت (Stopwatch). لماذا؟ لأن ساعة التوقيت تقيس سرعة جهازك الشخصي، وحرارة معالجه، وتأثير البرامج الأخرى التي تعمل في الخلفية. ساعة التوقيت تقيس كفاءة الجهاز، لا كفاءة الفكرة الخوارزمية.\nلذلك، يستخدم علماء الحاسوب التحليل المقارب (Asymptotic Analysis) المعروف بترميز Big-O.\nيطرح ترميز Big-O سؤالاً جوهرياً واحداً:\n\"عندما ينمو حجم البيانات ($N$) ويتضخم باتجاه اللانهاية، كيف يتصاعد المجهود الحسابي المطلوب؟\"\n إذا كان فحص 10 عناصر يتطلب 10 خطوات، وفحص مليون عنصر يتطلب مليون خطوة، فالنمو خطي: $O(N)$.\n إذا كان فحص 10 عناصر يتط"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(n) \\in \\mathcal{O}(g(n)) \\iff \\exists c > 0, \\; n_0 \\in \\mathbb{N} \\quad \\text{such that} \\quad \\forall n \\ge n_0, \\; 0 \\le f(n) \\le c \\cdot g(n)",
        "formulaNote": {
          "en": "Core invariant for Asymptotic Analysis & Big-O Rigor.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحليل المقارب (Asymptotic Analysis) وتدقيق Big-O الصارم."
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
          "id": "py-context-managers-resources",
          "starterCode": "from typing import Any\n\ndef deduplicate_preserve_order(items: list[Any]) -> list[Any]:\n    \"\"\"\n    Deduplicates a list while preserving first-occurrence order in O(N) time,\n    with graceful handling of unhashable elements.\n\n    Args:\n        items: List of elements (hashable or unhashable).\n\n    Returns:\n        List containing unique elements in original encounter order.\n    \"\"\"\n    # TODO: Implement O(N) set-backed deduplication with unhashable fallback\n    raise NotImplementedError(\"Implement deduplicate_preserve_order\")",
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
              "starterCode": "from typing import Any\n\ndef deduplicate_preserve_order(items: list[Any]) -> list[Any]:\n    \"\"\"\n    Deduplicates a list while preserving first-occurrence order in O(N) time,\n    with graceful handling of unhashable elements.\n\n    Args:\n        items: List of elements (hashable or unhashable).\n\n    Returns:\n        List containing unique elements in original encounter order.\n    \"\"\"\n    # TODO: Implement O(N) set-backed deduplication with unhashable fallback\n    raise NotImplementedError(\"Implement deduplicate_preserve_order\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\nfrom collections.abc import Hashable\n\ndef deduplicate_preserve_order(items: list[Any]) -> list[Any]:\n    seen_hashable: set[Any] = set()\n    unhashable_items: list[Any] = []\n    output: list[Any] = []\n\n    for item in items:\n        if isinstance(item, Hashable):\n            # Fast path: O(1) amortized hash table lookup\n            try:\n                if item not in seen_hashable:\n                    seen_hashable.add(item)\n                    output.append(item)\n            except TypeError:\n                # Handle cases where __hash__ is defined but raises TypeError\n                if item not in unhashable_items:\n                    unhashable_items.append(item)\n                    output.append(item)\n        else:\n            # Slow fallback for unhashable containers (dicts, lists)\n            if item not in unhashable_items:\n                unhashable_items.append(item)\n                output.append(item)\n\n    return output"
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
            "en": "What is the foundational invariant governing Asymptotic Analysis & Big-O Rigor?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التحليل المقارب (Asymptotic Analysis) وتدقيق Big-O الصارم؟"
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
    "id": "algorithmic-complexity-big-o",
    "title": "Python Data Model & Dunder Protocols",
    "titleAr": "نموذج بيانات بايثون وبروتوكولات الدوال المزدوجة (Dunder Protocols)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In many classical object-oriented languages (like Java), if you want your custom object to be sortable, printable, or countable, you must fo...",
      "ar": "في لغات البرمجة الكلاسيكية الصارمة، إذا أردت لكائنك البرمجي أن يكون قابلاً للعد أو الترتيب أو الطباعة، يتوجب عليك التصريح رسمياً بوراثة عقود..."
    },
    "prerequisites": [
      "python-lists-memory-growth"
    ],
    "x": 460,
    "y": 1220,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DunderProtocolDispatchLab",
        "narrative": {
          "en": "In many classical object-oriented languages (like Java), if you want your custom object to be sortable, printable, or countable, you must formally declare that your class inherits from a rigid corporate hierarchy of interfaces (implements Comparable, Serializable, List).\n\nPython does not care who your class's parents are. Python embraces Duck Typing:\n\"If it walks like a duck and quacks like a duck, it is a duck.\"\n\nHow does Python implement this duck typing under the hood? Through Dunder Protocols (short for \"Double Underscore\", like __len__ or __getitem__). \nWhen you type len(",
          "ar": "في لغات البرمجة الكلاسيكية الصارمة، إذا أردت لكائنك البرمجي أن يكون قابلاً للعد أو الترتيب أو الطباعة، يتوجب عليك التصريح رسمياً بوراثة عقود وواجهات برمجية معقدة.\nأما في بايثون، فالأمر يعتمد على مبدأ التصنيف بالبط (Duck Typing):\n\"إذا كان يمشي مثل البطة، ويصدر صوتاً مثل البطة، فهو بطة!\"\nكيف تُترجم بايثون هذا المبدأ على أرض الواقع؟ عبر ما يُعرف بـ بروتوكولات الدوال المزدوجة (Dunder Methods)، وهي دوال تبدأ وتنتهي بشرطتين سفليتين مثل __len__ و __getitem__.\nعندما تكتب len(my_object)، لا تفحص بايثون شجرة العائلة لكائنك، بل تتساءل فقط: \"هل يمتلك هذا الكائن دالة اسمها __len__()؟\" إن"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "o \\models \\mathcal{S} \\iff \\Big( \\texttt{\\_\\_len\\_\\_} \\in \\mathcal{M}(o) \\;\\land\\; \\texttt{\\_\\_getitem\\_\\_} \\in \\mathcal{M}(o) \\Big)",
        "formulaNote": {
          "en": "Core invariant for Python Data Model & Dunder Protocols.",
          "ar": "الخاصية الرياضية الجوهرية لـ نموذج بيانات بايثون وبروتوكولات الدوال المزدوجة (Dunder Protocols)."
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
          "id": "py-algorithmic-complexity-big-o",
          "starterCode": "from typing import Any\nimport math\n\nclass Vector2D:\n    \"\"\"\n    Immutable 2D Euclidean vector implementing Python data model dunder protocols\n    and memory-compact __slots__.\n    \"\"\"\n    __slots__ = (\"_x\", \"_y\")\n\n    def __init__(self, x: float, y: float) -> None:\n        # TODO: Store coordinates as floats\n        raise NotImplementedError(\"Implement Vector2D.__init__\")\n\n    @property\n    def x(self) -> float:\n        raise NotImplementedError(\"Implement Vector2D.x\")\n\n    @property\n    def y(self) -> float:\n        raise NotImplementedError(\"Implement Vector2D.y\")\n\n    # TODO: Implement __repr__, __eq__, __abs__, __add__, __sub__, __mul__, __rmul__, __matmul__",
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
              "starterCode": "from typing import Any\nimport math\n\nclass Vector2D:\n    \"\"\"\n    Immutable 2D Euclidean vector implementing Python data model dunder protocols\n    and memory-compact __slots__.\n    \"\"\"\n    __slots__ = (\"_x\", \"_y\")\n\n    def __init__(self, x: float, y: float) -> None:\n        # TODO: Store coordinates as floats\n        raise NotImplementedError(\"Implement Vector2D.__init__\")\n\n    @property\n    def x(self) -> float:\n        raise NotImplementedError(\"Implement Vector2D.x\")\n\n    @property\n    def y(self) -> float:\n        raise NotImplementedError(\"Implement Vector2D.y\")\n\n    # TODO: Implement __repr__, __eq__, __abs__, __add__, __sub__, __mul__, __rmul__, __matmul__",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\nimport math\n\nclass Vector2D:\n    __slots__ = (\"_x\", \"_y\")\n\n    def __init__(self, x: float, y: float) -> None:\n        object.__setattr__(self, \"_x\", float(x))\n        object.__setattr__(self, \"_y\", float(y))\n\n    @property\n    def x(self) -> float:\n        return self._x\n\n    @property\n    def y(self) -> float:\n        return self._y\n\n    def __repr__(self) -> str:\n        return f\"Vector2D({self._x!r}, {self._y!r})\"\n\n    def __eq__(self, other: Any) -> bool:\n        if isinstance(other, Vector2D):\n            return math.isclose(self._x, other._x) and math.isclose(self._y, other._y)\n        return False\n\n    def __abs__(self) -> float:\n        return math.hypot(self._x, self._y)\n\n    def __add__(self, other: Any) -> \"Vector2D\":\n        if isinstance(other, Vector2D):\n            return Vector2D(self._x + other._x, self._y + other._y)\n        return NotImplemented\n\n    def __sub__(self, other: Any) -> \"Vector2D\":\n        if isinstance(other, Vector2D):\n            return Vector2D(self._x - other._x, self._y - other._y)\n        return NotImplemented\n\n    def __mul__(self, scalar: Any) -> \"Vector2D\":\n        if isinstance(scalar, (int, float)):\n            return Vector2D(self._x * scalar, self._y * scalar)\n        return NotImplemented\n\n    def __rmul__(self, scalar: Any) -> \"Vector2D\":\n        return self.__mul__(scalar)\n\n    def __matmul__(self, other: Any) -> float:\n        if isinstance(other, Vector2D):\n            return (self._x * other._x) + (self._y * other._y)\n        return NotImplemented"
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
            "en": "What is the foundational invariant governing Python Data Model & Dunder Protocols?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم نموذج بيانات بايثون وبروتوكولات الدوال المزدوجة (Dunder Protocols)؟"
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
    "id": "sorting-divide-and-conquer",
    "title": "The Iteration Protocol & Iterator Objects",
    "titleAr": "بروتوكول التكرار الحلقي (Iteration Protocol) وكائنات المكررات",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When you tell Python:\npython\nfor item in shopping_cart:\n    print(item)\n\nWhat is Python actually doing behind your back? Beginners imagine a...",
      "ar": "عندما تكتب في بايثون:\npython\nfor item in shopping_cart:\n    print(item)\n\nما الذي تفعله بايثون خلف الكواليس؟ يتخيل البعض وجود عداد رقمي خفي ي..."
    },
    "prerequisites": [
      "algorithmic-complexity-big-o",
      "pure-functions-recursion"
    ],
    "x": 445,
    "y": 1315,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "IteratorStateMachineCanvas",
        "narrative": {
          "en": "When you tell Python:\npython\nfor item in shopping_cart:\n    print(item)\n\nWhat is Python actually doing behind your back? Beginners imagine a secret index variable $i = 0, 1, 2$ ticking up. But what if shopping_cart is a database stream, an infinite math series, or a set that has no concept of order or numbers?\n\nTo make iteration work universally across any data structure, Python invented the Iteration Protocol. It decouples the collection (the Iterable) from the process of walking through it (the Iterator).\n\nThe protocol works like this:\n1. Python asks the collection: \"Give",
          "ar": "عندما تكتب في بايثون:\npython\nfor item in shopping_cart:\n    print(item)\n\nما الذي تفعله بايثون خلف الكواليس؟ يتخيل البعض وجود عداد رقمي خفي يتصاعد $0, 1, 2$. ولكن ماذا لو كانت البيانات تأتي عبر شبكة الإنترنت كبث مستمر، أو كانت مجموعة عشوائية (Set) ليس لها ترتيب رقمي للأدوار؟\nلحل هذا الإشكال، ابتكرت بايثون بروتوكول التكرار (Iteration Protocol)، والذي يفصل بذكاء بين وعاء البيانات (Iterable) وبين آلية السير عبر البيانات (Iterator).\nتعمل الآلية عبر الخطوات التالية:\n1. تطلب بايثون من الوعاء: \"أعطني دليلك السياحي!\" (استدعاء iter() الذي يُشغّل __iter__).\n2. يعيد الوعاء كائناً يسمى"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{I} = \\langle \\mathcal{S}, s_0, \\mathcal{S}_{\\text{term}}, \\delta \\rangle",
        "formulaNote": {
          "en": "Core invariant for The Iteration Protocol & Iterator Objects.",
          "ar": "الخاصية الرياضية الجوهرية لـ بروتوكول التكرار الحلقي (Iteration Protocol) وكائنات المكررات."
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
          "id": "py-sorting-divide-and-conquer",
          "starterCode": "from typing import TypeVar, Generic, Iterable, Iterator\n\nT = TypeVar(\"T\")\n\nclass ChunkedIterator(Generic[T], Iterator[list[T]]):\n    \"\"\"\n    Consumes any iterable stream into discrete fixed-size chunk lists\n    adhering strictly to the Python Iterator protocol.\n    \"\"\"\n    def __init__(self, iterable: Iterable[T], chunk_size: int) -> None:\n        # TODO: Initialize iterator and validate chunk_size\n        raise NotImplementedError(\"Implement ChunkedIterator.__init__\")\n\n    def __iter__(self) -> \"ChunkedIterator[T]\":\n        raise NotImplementedError(\"Implement ChunkedIterator.__iter__\")\n\n    def __next__(self) -> list[T]:\n        raise NotImplementedError(\"Implement ChunkedIterator.__next__\")",
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
              "starterCode": "from typing import TypeVar, Generic, Iterable, Iterator\n\nT = TypeVar(\"T\")\n\nclass ChunkedIterator(Generic[T], Iterator[list[T]]):\n    \"\"\"\n    Consumes any iterable stream into discrete fixed-size chunk lists\n    adhering strictly to the Python Iterator protocol.\n    \"\"\"\n    def __init__(self, iterable: Iterable[T], chunk_size: int) -> None:\n        # TODO: Initialize iterator and validate chunk_size\n        raise NotImplementedError(\"Implement ChunkedIterator.__init__\")\n\n    def __iter__(self) -> \"ChunkedIterator[T]\":\n        raise NotImplementedError(\"Implement ChunkedIterator.__iter__\")\n\n    def __next__(self) -> list[T]:\n        raise NotImplementedError(\"Implement ChunkedIterator.__next__\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import TypeVar, Generic, Iterable, Iterator\n\nT = TypeVar(\"T\")\n\nclass ChunkedIterator(Generic[T], Iterator[list[T]]):\n    def __init__(self, iterable: Iterable[T], chunk_size: int) -> None:\n        if chunk_size <= 0:\n            raise ValueError(\"chunk_size must be a positive integer\")\n        self._source_iter: Iterator[T] = iter(iterable)\n        self._chunk_size: int = chunk_size\n        self._exhausted: bool = False\n\n    def __iter__(self) -> \"ChunkedIterator[T]\":\n        return self\n\n    def __next__(self) -> list[T]:\n        if self._exhausted:\n            raise StopIteration\n\n        batch: list[T] = []\n        for _ in range(self._chunk_size):\n            try:\n                item = next(self._source_iter)\n                batch.append(item)\n            except StopIteration:\n                self._exhausted = True\n                break\n\n        if not batch:\n            raise StopIteration\n\n        return batch"
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
            "en": "What is the foundational invariant governing The Iteration Protocol & Iterator Objects?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم بروتوكول التكرار الحلقي (Iteration Protocol) وكائنات المكررات؟"
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
    "id": "memory-profiling-cpython",
    "title": "Lazy Stream Generators & Coroutine Pipelines",
    "titleAr": "المولدات الكسولة وتدفق البيانات غير المحدود (Lazy Stream Generators)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are given a 50-Gigabyte log file containing 500,000,000 credit card transactions, and your manager asks you to find the total su...",
      "ar": "تخيل أنك استلمت ملفاً ضخماً بحجم 50 غيغابايت يحتوي على 500 مليون معاملة مالية، وطُلب منك حساب إجمالي المعاملات المشبوهة.\nإذا كان حاسوبك يمتل..."
    },
    "prerequisites": [
      "python-lists-memory-growth"
    ],
    "x": 460,
    "y": 1410,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GeneratorSuspensionLab",
        "narrative": {
          "en": "Imagine you are given a 50-Gigabyte log file containing 500,000,000 credit card transactions, and your manager asks you to find the total sum of all fraudulent charges. \nIf your laptop only has 16 Gigabytes of RAM, what happens if you write:\npython\ntransactions = load_all_transactions(\"huge_file.csv\")   CRASH! Out of Memory!\n\nYour laptop freezes and crashes because you tried to load all 50 Gigabytes into memory at the exact same instant (called Eager Materialization).\n\nHow do data engineers solve this? Through Lazy Evaluation using Python Generators.\nA generator looks like a",
          "ar": "تخيل أنك استلمت ملفاً ضخماً بحجم 50 غيغابايت يحتوي على 500 مليون معاملة مالية، وطُلب منك حساب إجمالي المعاملات المشبوهة.\nإذا كان حاسوبك يمتلك 16 غيغابايت فقط من الذاكرة العشوائية (RAM)، فماذا سيحدث لو حاولت تحميل الملف كاملاً دفعة واحدة؟ سينهار البرنامج فوراً بسبب نفاد الذاكرة (التحميل الشره / Eager Materialization).\nكيف يحل مهندسو البيانات هذه المعضلة؟ عبر التقييم الكسول (Lazy Evaluation) باستخدام المولدات (Generators).\nالمولد هو دالة بايثون خاصة تستخدم الكلمة المفتاحية yield بدلاً من return.\nعندما تصل الدالة إلى yield، فإنها لا تموت ولا تنتهي! بل تتجمد مؤقتاً في مكانها كأنك"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\begin{aligned}\n\\text{Space}_{\\text{eager}}(\\mathcal{D}) &= N \\cdot b = \\Theta(N) \\\\\n\\text{Space}_{\\text{lazy}}(\\mathcal{D}) &= \\text{sizeof}(\\text{GeneratorFrame}) + b = \\Theta(1)\n\\end{aligned}",
        "formulaNote": {
          "en": "Core invariant for Lazy Stream Generators & Coroutine Pipelines.",
          "ar": "الخاصية الرياضية الجوهرية لـ المولدات الكسولة وتدفق البيانات غير المحدود (Lazy Stream Generators)."
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
          "id": "py-memory-profiling-cpython",
          "starterCode": "from typing import Iterable, Generator\n\ndef streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]:\n    \"\"\"\n    Streams running count, mean, and sample variance using Welford's algorithm\n    in strict O(1) memory space.\n\n    Args:\n        stream: Iterable yielding float values.\n\n    Yields:\n        Tuples of (count, mean, sample_variance).\n    \"\"\"\n    # TODO: Implement online Welford generator\n    raise NotImplementedError(\"Implement streaming_welford_stats\")",
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
              "starterCode": "from typing import Iterable, Generator\n\ndef streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]:\n    \"\"\"\n    Streams running count, mean, and sample variance using Welford's algorithm\n    in strict O(1) memory space.\n\n    Args:\n        stream: Iterable yielding float values.\n\n    Yields:\n        Tuples of (count, mean, sample_variance).\n    \"\"\"\n    # TODO: Implement online Welford generator\n    raise NotImplementedError(\"Implement streaming_welford_stats\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Iterable, Generator\n\ndef streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]:\n    count: int = 0\n    mean: float = 0.0\n    M2: float = 0.0\n\n    for x in stream:\n        count += 1\n        delta = x - mean\n        mean += delta / count\n        delta2 = x - mean\n        M2 += delta * delta2\n\n        sample_variance = 0.0 if count < 2 else M2 / (count - 1)\n        yield (count, mean, sample_variance)"
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
            "en": "What is the foundational invariant governing Lazy Stream Generators & Coroutine Pipelines?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المولدات الكسولة وتدفق البيانات غير المحدود (Lazy Stream Generators)؟"
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
    "id": "numpy-vectorization",
    "title": "SIMD Architecture & Contiguous Buffer Vectorization",
    "titleAr": "معمارية SIMD وتوجيه المخازن الذاكرية المتصلة في NumPy",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why is pure Python code slow for data science? If you write a simple for loop in pure Python to add two lists of 1,000,000 numbers together,...",
      "ar": "لماذا تُعتبر بايثون النقية بطيئة في الحسابات العلمية؟ إذا كتبت حلقة for بسيطة في بايثون لجمع قائمتين تحتوي كل منهما على مليون رقم، فستستغرق ..."
    },
    "prerequisites": [
      "memory-profiling-cpython",
      "linear-algebra-vectors"
    ],
    "x": 455,
    "y": 1505,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SimdVsLoopBenchmarkLab",
        "narrative": {
          "en": "Why is pure Python code slow for data science? If you write a simple for loop in pure Python to add two lists of 1,000,000 numbers together, it takes about 100 milliseconds. If you do the exact same addition in NumPy or C, it takes less than 1 millisecond—over 100 times faster!\n\nWhy? Is CPython lazy? No. It is because of the way Python stores numbers in memory. \nIn pure Python, every single integer is a heavy, bloated C-structure called a PyObject (consuming 28 bytes for a single number!). A Python list is just a scattered array of pointers pointing to these bloated objects scattered r",
          "ar": "لماذا تُعتبر بايثون النقية بطيئة في الحسابات العلمية؟ إذا كتبت حلقة for بسيطة في بايثون لجمع قائمتين تحتوي كل منهما على مليون رقم، فستستغرق العملية قرابة 100 مللي ثانية. أما إذا قمت بنفس العملية عبر مكتبة NumPy، فستستغرق أقل من مللي ثانية واحدة—أي أسرع بأكثر من 100 ضعف!\nلماذا هذا الفارق الهائل؟\nفي بايثون النقية، كل رقم ليس مجرد قيمة خام، بل هو كائن برمجي ضخم ومعقد يسمى PyObject (يستهلك 28 بايت لتخزين رقم واحد فقط!). وقائمة بايثون هي مجرد مصفوفة مؤشرات تشير إلى هذه الكائنات المبعثرة عشوائياً في الذاكرة.\nفي كل خطوة تكرارية، يضطر مفسر بايثون إلى:\n1. قراءة عنوان المؤشر.\n2. القفز إلى موقع ا"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T_{\\text{CPython}} = N \\cdot \\left( \\tau_{\\text{dispatch}} + \\tau_{\\text{deref}} + \\tau_{\\text{typecheck}} + \\tau_{\\text{unbox}} + \\tau_{\\text{alu}} + \\tau_{\\text{box}} \\right)",
        "formulaNote": {
          "en": "Core invariant for SIMD Architecture & Contiguous Buffer Vectorization.",
          "ar": "الخاصية الرياضية الجوهرية لـ معمارية SIMD وتوجيه المخازن الذاكرية المتصلة في NumPy."
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
          "id": "py-numpy-vectorization",
          "starterCode": "import numpy as np\n\ndef vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:\n    \"\"\"\n    Computes the mean Huber loss between true and predicted targets using\n    SIMD-vectorized NumPy operations without Python loops.\n\n    Args:\n        y_true: 1D NumPy array of ground truth targets.\n        y_pred: 1D NumPy array of model predictions.\n        delta: Threshold separating quadratic and linear penalty regimes.\n\n    Returns:\n        Scalar float representing mean Huber loss.\n    \"\"\"\n    # TODO: Implement vectorized Huber loss without loops\n    raise NotImplementedError(\"Implement vectorized_huber_loss\")",
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
              "starterCode": "import numpy as np\n\ndef vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:\n    \"\"\"\n    Computes the mean Huber loss between true and predicted targets using\n    SIMD-vectorized NumPy operations without Python loops.\n\n    Args:\n        y_true: 1D NumPy array of ground truth targets.\n        y_pred: 1D NumPy array of model predictions.\n        delta: Threshold separating quadratic and linear penalty regimes.\n\n    Returns:\n        Scalar float representing mean Huber loss.\n    \"\"\"\n    # TODO: Implement vectorized Huber loss without loops\n    raise NotImplementedError(\"Implement vectorized_huber_loss\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:\n    # Ensure float64 C-contiguous memory layout\n    y_t = np.asarray(y_true, dtype=np.float64)\n    y_p = np.asarray(y_pred, dtype=np.float64)\n    \n    # Vectorized element-wise residual calculation\n    errors = np.abs(y_t - y_p)\n    \n    # Vectorized branchless condition mapping via SIMD instructions\n    quadratic = 0.5 * (errors ** 2)\n    linear = delta * (errors - 0.5 * delta)\n    losses = np.where(errors <= delta, quadratic, linear)\n    \n    return float(np.mean(losses))"
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
            "en": "What is the foundational invariant governing SIMD Architecture & Contiguous Buffer Vectorization?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم معمارية SIMD وتوجيه المخازن الذاكرية المتصلة في NumPy؟"
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
    "id": "numpy-broadcasting-rules",
    "title": "Strided Memory Layout & Zero-Copy Slicing",
    "titleAr": "تخطيط الذاكرة ذو الخطوات (Strides) وتجزيء المصفوفات دون نسخ",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Physical computer memory is strictly one-dimensional: it is a single straight line of numbered addresses. There is no such thing as a physic...",
      "ar": "ذاكرة الحاسوب الفيزيائية أحادية البعد تماماً؛ إنها شريط مستقيم طويل من العناوين المرقمة. لا يوجد في شرائح السيليكون شيء اسمه \"مصفوفة ثنائية ..."
    },
    "prerequisites": [
      "numpy-vectorization"
    ],
    "x": 485,
    "y": 1600,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "StrideMemoryGridLab",
        "narrative": {
          "en": "Physical computer memory is strictly one-dimensional: it is a single straight line of numbered addresses. There is no such thing as a physical 2D matrix or a 3D cube in silicon chips!\n\nSo, how does NumPy create a 2D matrix of shape $(3 \\times 4)$ (3 rows and 4 columns)?\nIt flattens the numbers into a single 1D flat line of 12 numbers. But to make it feel like a 2D grid, NumPy attaches an Array Metadata Header containing three numbers:\n1. Base Pointer: The starting memory address in RAM.\n2. Shape: The logical dimensions, e.g., (3, 4).\n3. Strides: The exact number of bytes you",
          "ar": "ذاكرة الحاسوب الفيزيائية أحادية البعد تماماً؛ إنها شريط مستقيم طويل من العناوين المرقمة. لا يوجد في شرائح السيليكون شيء اسمه \"مصفوفة ثنائية الأبعاد\" أو \"مكعب ثلاثي الأبعاد\"!\nفكيف تبني NumPy مصفوفة ثنائية الأبعاد بأبعاد $(3 \\times 4)$ (3 صفوف و 4 أعمدة)؟\nتقوم بفرد الأرقام الـ 12 في خط مستقيم واحد في الذاكرة. ولكن لجعلها تتصرف كشبكة ثنائية، ترفق معها ترويسة بيانات وصفية تحتوي على ثلاثة مفاهيم:\n1. مؤشر البداية (Base Pointer): عنوان أول بايت في الذاكرة.\n2. الشكل (Shape): الأبعاد المنطقية، مثلاً (3, 4).\n3. الخطوات (Strides): عدد البايتات التي يجب أن تقفزها في الذاكرة للتقدم خطوة واحدة"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "s_{n-1} = w, \\quad s_k = s_{k+1} \\cdot d_{k+1} = w \\cdot \\prod_{j=k+1}^{n-1} d_j",
        "formulaNote": {
          "en": "Core invariant for Strided Memory Layout & Zero-Copy Slicing.",
          "ar": "الخاصية الرياضية الجوهرية لـ تخطيط الذاكرة ذو الخطوات (Strides) وتجزيء المصفوفات دون نسخ."
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
          "id": "py-numpy-broadcasting-rules",
          "starterCode": "import numpy as np\nfrom numpy.lib.stride_tricks import as_strided\n\ndef strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:\n    \"\"\"\n    Creates a 2D rolling window view of a 1D array with zero memory copies\n    using NumPy memory stride manipulation.\n\n    Args:\n        arr: 1D NumPy array.\n        window_size: Window length W.\n\n    Returns:\n        2D NumPy array of shape (N - W + 1, W) sharing underlying buffer.\n    \"\"\"\n    # TODO: Calculate strides and construct zero-copy view via as_strided\n    raise NotImplementedError(\"Implement strided_rolling_window\")",
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
              "starterCode": "import numpy as np\nfrom numpy.lib.stride_tricks import as_strided\n\ndef strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:\n    \"\"\"\n    Creates a 2D rolling window view of a 1D array with zero memory copies\n    using NumPy memory stride manipulation.\n\n    Args:\n        arr: 1D NumPy array.\n        window_size: Window length W.\n\n    Returns:\n        2D NumPy array of shape (N - W + 1, W) sharing underlying buffer.\n    \"\"\"\n    # TODO: Calculate strides and construct zero-copy view via as_strided\n    raise NotImplementedError(\"Implement strided_rolling_window\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\nfrom numpy.lib.stride_tricks import as_strided\n\ndef strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:\n    if arr.ndim != 1:\n        raise ValueError(\"Input array must be 1-dimensional\")\n    n = arr.shape[0]\n    if window_size < 1 or window_size > n:\n        raise ValueError(\"window_size must satisfy 1 <= window_size <= len(arr)\")\n\n    # Ensure contiguous memory layout before inspecting byte strides\n    c_arr = np.ascontiguousarray(arr)\n    elem_stride = c_arr.strides[0]\n\n    num_windows = n - window_size + 1\n    new_shape = (num_windows, window_size)\n    new_strides = (elem_stride, elem_stride)\n\n    # Construct zero-copy strided view\n    return as_strided(c_arr, shape=new_shape, strides=new_strides, writeable=False)"
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
            "en": "What is the foundational invariant governing Strided Memory Layout & Zero-Copy Slicing?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تخطيط الذاكرة ذو الخطوات (Strides) وتجزيء المصفوفات دون نسخ؟"
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
    "id": "numpy-strides-indexing",
    "title": "Multi-Dimensional Array Broadcasting Rules",
    "titleAr": "قواعد البث متعدد الأبعاد (Broadcasting Rules) في NumPy",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "What happens if you want to add the number 5 to a matrix containing 1,000,000 numbers?\nIn linear algebra, matrix addition is only defined wh...",
      "ar": "ماذا تفعل إذا أردت إضافة الرقم 5 إلى مصفوفة تحوي مليون رقم؟\nفي الجبر الخطي الصارم، لا يمكن جمع مصفوفة إلا مع مصفوفة أخرى تطابقها تماماً في ا..."
    },
    "prerequisites": [
      "numpy-vectorization"
    ],
    "x": 455,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "BroadcastingAlignmentGrid",
        "narrative": {
          "en": "What happens if you want to add the number 5 to a matrix containing 1,000,000 numbers?\nIn linear algebra, matrix addition is only defined when two matrices have the exact same shape. Adding a single scalar number to a matrix is strictly undefined.\n\nNumPy solves this practical problem through Broadcasting. Broadcasting is a set of elegant mathematical rules that allows arrays of different shapes to participate in arithmetic operations together without duplicating memory.\n\nHow does it work?\nNumPy stretches the smaller array across the larger array. But here is the critical data engineering",
          "ar": "ماذا تفعل إذا أردت إضافة الرقم 5 إلى مصفوفة تحوي مليون رقم؟\nفي الجبر الخطي الصارم، لا يمكن جمع مصفوفة إلا مع مصفوفة أخرى تطابقها تماماً في الأبعاد. جمع قيمة فردية مع مصفوفة هو أمر غير معرّف رياضياً.\nتحل NumPy هذه المعضلة الحقيقية عبر تقنية البث (Broadcasting). البث هو مجموعة من القواعد الرياضية الذكية التي تتيح إجراء العمليات الحسابية بين مصفوفات ذات أبعاد مختلفة دون أي نسخ أو تكرار للبيانات في الذاكرة.\nكيف يتم ذلك سحرياً؟\nتقوم NumPy بتمديد المصفوفة الأصغر لتطابق أبعاد المصفوفة الأكبر. ولكن إليك السر الهندسي المذهل: NumPy لا تنسخ الأرقام في الذاكرة إطلاقاً!\nتذكر مفهوم \"الخطوات الذاكر"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "a_k = b_k \\quad \\lor \\quad a_k = 1 \\quad \\lor \\quad b_k = 1",
        "formulaNote": {
          "en": "Core invariant for Multi-Dimensional Array Broadcasting Rules.",
          "ar": "الخاصية الرياضية الجوهرية لـ قواعد البث متعدد الأبعاد (Broadcasting Rules) في NumPy."
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
          "id": "py-numpy-strides-indexing",
          "starterCode": "import numpy as np\n\ndef pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the (N x M) pairwise squared Euclidean distance matrix between\n    two sets of feature vectors using NumPy broadcasting.\n\n    Args:\n        X: (N, D) array of vectors.\n        Y: (M, D) array of vectors.\n\n    Returns:\n        (N, M) matrix where element (i, j) is ||X[i] - Y[j]||^2.\n    \"\"\"\n    # TODO: Implement zero-loop broadcasting pairwise distance\n    raise NotImplementedError(\"Implement pairwise_squared_distance\")",
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
              "starterCode": "import numpy as np\n\ndef pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the (N x M) pairwise squared Euclidean distance matrix between\n    two sets of feature vectors using NumPy broadcasting.\n\n    Args:\n        X: (N, D) array of vectors.\n        Y: (M, D) array of vectors.\n\n    Returns:\n        (N, M) matrix where element (i, j) is ||X[i] - Y[j]||^2.\n    \"\"\"\n    # TODO: Implement zero-loop broadcasting pairwise distance\n    raise NotImplementedError(\"Implement pairwise_squared_distance\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:\n    X_arr = np.asarray(X, dtype=np.float64)\n    Y_arr = np.asarray(Y, dtype=np.float64)\n\n    if X_arr.ndim != 2 or Y_arr.ndim != 2:\n        raise ValueError(\"Inputs must be 2D matrices\")\n    if X_arr.shape[1] != Y_arr.shape[1]:\n        raise ValueError(f\"Feature dimension mismatch: {X_arr.shape[1]} vs {Y_arr.shape[1]}\")\n\n    # Broadcast X of shape (N, 1, D) against Y of shape (1, M, D)\n    # Difference has shape (N, M, D)\n    diff = X_arr[:, np.newaxis, :] - Y_arr[np.newaxis, :, :]\n    \n    # Square differences and sum along the feature dimension D\n    return np.sum(diff ** 2, axis=2)"
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
            "en": "What is the foundational invariant governing Multi-Dimensional Array Broadcasting Rules?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم قواعد البث متعدد الأبعاد (Broadcasting Rules) في NumPy؟"
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
    "id": "pandas-dataframe",
    "title": "DataFrame Mental Model: Indexing via `loc` vs `iloc`",
    "titleAr": "النموذج الذهني لإطارات البيانات: الفهرسة عبر loc مقابل iloc",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "A spreadsheet or database table looks simple: it has rows and columns. But in software engineering, how do you point to a specific number in...",
      "ar": "يبدو جدول البيانات بسيطاً للوهلة الأولى: صفوف وأعمدة. ولكن برمجياً، كيف تشير إلى خلية رقمية محددة داخل هذا الجدول؟\nهناك طريقتان مختلفتان تما..."
    },
    "prerequisites": [
      "numpy-strides-indexing"
    ],
    "x": 485,
    "y": 1790,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DataFrameBlockManagerLab",
        "narrative": {
          "en": "A spreadsheet or database table looks simple: it has rows and columns. But in software engineering, how do you point to a specific number inside that table?\n\nThere are two completely different ways to address something in the real world:\n1. By Label (Name): You can identify an apartment resident by looking at the family surname printed on their mailbox: \"Deliver this letter to the Roubhi residence.\"\n2. By Physical Position (Integer Offset): You can identify an apartment by counting doors from the hallway elevator: \"Deliver this letter to the 3rd door on the left.\"\n\nIn Pandas DataFr",
          "ar": "يبدو جدول البيانات بسيطاً للوهلة الأولى: صفوف وأعمدة. ولكن برمجياً، كيف تشير إلى خلية رقمية محددة داخل هذا الجدول؟\nهناك طريقتان مختلفتان تماماً للإشارة إلى الأشياء في العالم الحقيقي:\n1. بالاسم والتسمية (Label): يمكنك التعرف على شقة سكنية عبر اسم العائلة المكتوب على صندوق البريد: \"سلّم هذه الرسالة لعائلة روبحي\".\n2. بالموقع الفيزيائي والإزاحة (Integer Position): يمكنك التعرف على الشقة عبر عد الأبواب انطلاقاً من المصعد: \"سلّم الرسالة للباب الثالث على اليسار\".\nفي إطارات بيانات Pandas، تتجسد هذه الثنائية عبر وسيلتين أساسيتين:\n loc (فهرسة بالأسماء): تبحث عن البيانات باستخدام الأسم"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{D} = \\langle \\mathcal{I}_{\\text{row}}, \\mathcal{I}_{\\text{col}}, \\mathbf{T}, \\mathbf{M} \\rangle",
        "formulaNote": {
          "en": "Core invariant for DataFrame Mental Model: Indexing via `loc` vs `iloc`.",
          "ar": "الخاصية الرياضية الجوهرية لـ النموذج الذهني لإطارات البيانات: الفهرسة عبر loc مقابل iloc."
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
          "id": "py-pandas-dataframe",
          "starterCode": "def align_and_compute_spread(\n    series_a: dict[str, float], \n    series_b: dict[str, float], \n    fill_value: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Aligns two series by label index and computes their difference with fill imputation.\n\n    Args:\n        series_a: Mapping of index label to float value.\n        series_b: Mapping of index label to float value.\n        fill_value: Imputation value for missing keys.\n\n    Returns:\n        Dictionary of label -> (a - b) sorted alphabetically by key.\n    \"\"\"\n    # TODO: Implement index alignment and spread computation\n    raise NotImplementedError(\"Implement align_and_compute_spread\")",
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
              "starterCode": "def align_and_compute_spread(\n    series_a: dict[str, float], \n    series_b: dict[str, float], \n    fill_value: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Aligns two series by label index and computes their difference with fill imputation.\n\n    Args:\n        series_a: Mapping of index label to float value.\n        series_b: Mapping of index label to float value.\n        fill_value: Imputation value for missing keys.\n\n    Returns:\n        Dictionary of label -> (a - b) sorted alphabetically by key.\n    \"\"\"\n    # TODO: Implement index alignment and spread computation\n    raise NotImplementedError(\"Implement align_and_compute_spread\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "def align_and_compute_spread(\n    series_a: dict[str, float], \n    series_b: dict[str, float], \n    fill_value: float = 0.0\n) -> dict[str, float]:\n    # Union of all label indices\n    all_keys = sorted(set(series_a.keys()) | set(series_b.keys()))\n    \n    result: dict[str, float] = {}\n    for key in all_keys:\n        val_a = series_a.get(key, fill_value)\n        val_b = series_b.get(key, fill_value)\n        result[key] = round(val_a - val_b, 6)\n        \n    return result"
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
            "en": "What is the foundational invariant governing DataFrame Mental Model: Indexing via `loc` vs `iloc`?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم النموذج الذهني لإطارات البيانات: الفهرسة عبر loc مقابل iloc؟"
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
    "id": "pandas-split-apply-combine",
    "title": "Tidy Data Architecture & Normalization Geometry",
    "titleAr": "معمارية البيانات المرتبة (Tidy Data) وهندسة تسوية الجداول",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why do data scientists spend 80% of their time \"cleaning\" data? Because humans and computers like looking at tables in completely opposite w...",
      "ar": "لماذا يقضي علماء البيانات 80% من وقتهم في \"تنظيف\" البيانات وتجهيزها؟ لأن البشر والحواسيب يفضلون قراءة الجداول بطريقتين متناقضتين تماماً!\nيعش..."
    },
    "prerequisites": [
      "pandas-dataframe"
    ],
    "x": 455,
    "y": 1885,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LocIlocCaliperLab",
        "narrative": {
          "en": "Why do data scientists spend 80% of their time \"cleaning\" data? Because humans and computers like looking at tables in completely opposite ways.\n\nHumans love Wide Tables. A human likes seeing a medical spreadsheet where the columns are: [PatientName, Monday_BP, Tuesday_BP, Wednesday_BP]. It is easy for a human eye to scan across days.\nComputers and machine learning algorithms despise wide tables. Why? Because Monday_BP and Tuesday_BP are not two different variables; they are two different values of the exact same variable: Day of Week!\n\nTo solve this chaos, statistician Hadley",
          "ar": "لماذا يقضي علماء البيانات 80% من وقتهم في \"تنظيف\" البيانات وتجهيزها؟ لأن البشر والحواسيب يفضلون قراءة الجداول بطريقتين متناقضتين تماماً!\nيعشق البشر الجداول العريضة (Wide Tables). يفضل الطبيب مثلاً قراءة جدول أعمدته: [اسم_المريض، ضغط_الإثنين، ضغط_الثلاثاء، ضغط_الأربعاء]. فهذا يسهل على العين البشرية تتبع التغيرات أفقياً.\nأما الخوارزميات ونماذج تعلم الآلة فتكره الجداول العريضة! لماذا؟ لأن ضغط_الإثنين و ضغط_الثلاثاء ليسا متغيرين مستقلين؛ بل هما قيمتان مختلفتان لمتغير واحد هو: يوم الفحص!\nلإنهاء هذه الفوضى، وضع عالم الإحصاء هادلي ويكهام القواعد الثلاث لـ البيانات المرتبة (Tidy Data"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{R}_{\\text{wide}} \\subseteq \\mathcal{I}_1 \\times \\dots \\times \\mathcal{I}_K \\times \\mathcal{Y}_1 \\times \\dots \\times \\mathcal{Y}_T",
        "formulaNote": {
          "en": "Core invariant for Tidy Data Architecture & Normalization Geometry.",
          "ar": "الخاصية الرياضية الجوهرية لـ معمارية البيانات المرتبة (Tidy Data) وهندسة تسوية الجداول."
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
          "id": "py-pandas-split-apply-combine",
          "starterCode": "def slice_tabular_index(\n    index: list[str], \n    start_token: str | int, \n    stop_token: str | int, \n    mode: str\n) -> list[str]:\n    \"\"\"\n    Implements loc (closed label-based) vs iloc (half-open integer-based) slicing.\n\n    Args:\n        index: List of unique string row labels.\n        start_token: Label string for loc, integer index for iloc.\n        stop_token: Label string for loc, integer index for iloc.\n        mode: \"loc\" or \"iloc\".\n\n    Returns:\n        Sub-list of labels matching the indexing semantics.\n    \"\"\"\n    # TODO: Implement dual-mode indexing semantics\n    raise NotImplementedError(\"Implement slice_tabular_index\")",
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
              "starterCode": "def slice_tabular_index(\n    index: list[str], \n    start_token: str | int, \n    stop_token: str | int, \n    mode: str\n) -> list[str]:\n    \"\"\"\n    Implements loc (closed label-based) vs iloc (half-open integer-based) slicing.\n\n    Args:\n        index: List of unique string row labels.\n        start_token: Label string for loc, integer index for iloc.\n        stop_token: Label string for loc, integer index for iloc.\n        mode: \"loc\" or \"iloc\".\n\n    Returns:\n        Sub-list of labels matching the indexing semantics.\n    \"\"\"\n    # TODO: Implement dual-mode indexing semantics\n    raise NotImplementedError(\"Implement slice_tabular_index\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "def slice_tabular_index(\n    index: list[str], \n    start_token: str | int, \n    stop_token: str | int, \n    mode: str\n) -> list[str]:\n    if mode == \"iloc\":\n        if not isinstance(start_token, int) or not isinstance(stop_token, int):\n            raise TypeError(\"iloc requires integer start and stop tokens\")\n        # Python list slice implements half-open [start:stop)\n        return index[start_token:stop_token]\n\n    elif mode == \"loc\":\n        if not isinstance(start_token, str) or not isinstance(stop_token, str):\n            raise TypeError(\"loc requires string label start and stop tokens\")\n        if start_token not in index:\n            raise KeyError(f\"Label not found in index: {start_token}\")\n        if stop_token not in index:\n            raise KeyError(f\"Label not found in index: {stop_token}\")\n\n        start_idx = index.index(start_token)\n        stop_idx = index.index(stop_token)\n\n        if stop_idx < start_idx:\n            return []\n\n        # loc is CLOSED: slice must include stop_idx (+ 1)\n        return index[start_idx : stop_idx + 1]\n\n    else:\n        raise ValueError(\"Mode must be 'loc' or 'iloc'\")"
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
            "en": "What is the foundational invariant governing Tidy Data Architecture & Normalization Geometry?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم معمارية البيانات المرتبة (Tidy Data) وهندسة تسوية الجداول؟"
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
    "id": "eda-anscombe",
    "title": "The GroupBy Split-Apply-Combine Engine",
    "titleAr": "محرك التجميع والتقسيم (Split-Apply-Combine)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you have a spreadsheet of 100,000 employees and you need to compute the average salary for every department. \nHow would an untrained...",
      "ar": "تخيل أن لديك جدولاً يحتوي على 100,000 موظف، وطُلب منك حساب متوسط الرواتب لكل قسم على حدة.\nكيف يفعل ذلك المبتدئ؟ يكتب حلقة تكرارية، ويقوم بتص..."
    },
    "prerequisites": [
      "pandas-split-apply-combine"
    ],
    "x": 485,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "TidyDataMorphLab",
        "narrative": {
          "en": "Imagine you have a spreadsheet of 100,000 employees and you need to compute the average salary for every department. \nHow would an untrained novice do this? They write a for loop, filter the table 50 times for 50 departments, and calculate each average. This is agonizingly slow.\n\nIn data engineering, this operation is performed by the Split-Apply-Combine engine:\n1. Split: The master dataset is partitioned into disjoint piles (sub-tables) based on a grouping key (e.g., Department).\n2. Apply: A function is executed independently across each separate pile (e.g., calculating mean(",
          "ar": "تخيل أن لديك جدولاً يحتوي على 100,000 موظف، وطُلب منك حساب متوسط الرواتب لكل قسم على حدة.\nكيف يفعل ذلك المبتدئ؟ يكتب حلقة تكرارية، ويقوم بتصفية الجدول 50 مرة لـ 50 قسماً، ويحسب المتوسط في كل مرة. هذا بطيء جداً وغير عملي.\nفي هندسة البيانات، تُنجز هذه المهمة عبر محرك التقسيم والتشغيل والدمج (Split-Apply-Combine):\n1. التقسيم (Split): تفكيك الجدول الشامل إلى حزم مستقلة بناءً على مفتاح تجميع (مثلاً القسم).\n2. التشغيل (Apply): تطبيق دالة رياضية بشكل مستقل عبر كل حزمة (مثلاً حساب متوسط(الراتب)). هذه الخطوة قابلة للتوازي التام عبر عدة أنوية معالج.\n3. الدمج (Combine): إعادة تجميع وت"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{D} = \\bigsqcup_{k \\in \\mathcal{K}} \\mathcal{D}_k \\quad \\text{where} \\quad \\mathcal{D}_k = \\{ r \\in \\mathcal{D} \\mid g(r) = k \\}",
        "formulaNote": {
          "en": "Core invariant for The GroupBy Split-Apply-Combine Engine.",
          "ar": "الخاصية الرياضية الجوهرية لـ محرك التجميع والتقسيم (Split-Apply-Combine)."
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
          "id": "py-eda-anscombe",
          "starterCode": "from typing import Any\n\ndef melt_wide_to_tidy(\n    records: list[dict[str, Any]], \n    id_vars: list[str], \n    value_vars: list[str], \n    var_name: str = \"variable\", \n    value_name: str = \"value\"\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Unpivots a wide table into tidy format where columns become rows.\n\n    Args:\n        records: List of dictionaries representing wide rows.\n        id_vars: Column names to retain as identifier variables.\n        value_vars: Column names to unpivot into variable/value pairs.\n        var_name: Name of the target variable column.\n        value_name: Name of the target value column.\n\n    Returns:\n        List of tidy records.\n    \"\"\"\n    # TODO: Implement wide-to-tidy unpivoting\n    raise NotImplementedError(\"Implement melt_wide_to_tidy\")",
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
              "starterCode": "from typing import Any\n\ndef melt_wide_to_tidy(\n    records: list[dict[str, Any]], \n    id_vars: list[str], \n    value_vars: list[str], \n    var_name: str = \"variable\", \n    value_name: str = \"value\"\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Unpivots a wide table into tidy format where columns become rows.\n\n    Args:\n        records: List of dictionaries representing wide rows.\n        id_vars: Column names to retain as identifier variables.\n        value_vars: Column names to unpivot into variable/value pairs.\n        var_name: Name of the target variable column.\n        value_name: Name of the target value column.\n\n    Returns:\n        List of tidy records.\n    \"\"\"\n    # TODO: Implement wide-to-tidy unpivoting\n    raise NotImplementedError(\"Implement melt_wide_to_tidy\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\n\ndef melt_wide_to_tidy(\n    records: list[dict[str, Any]], \n    id_vars: list[str], \n    value_vars: list[str], \n    var_name: str = \"variable\", \n    value_name: str = \"value\"\n) -> list[dict[str, Any]]:\n    tidy_output: list[dict[str, Any]] = []\n\n    for row in records:\n        # Extract identifier variables once per row\n        base_id_record = {k: row[k] for k in id_vars if k in row}\n\n        for v_col in value_vars:\n            if v_col in row:\n                new_row = {\n                    **base_id_record,\n                    var_name: v_col,\n                    value_name: row[v_col]\n                }\n                tidy_output.append(new_row)\n\n    return tidy_output"
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
            "en": "What is the foundational invariant governing The GroupBy Split-Apply-Combine Engine?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم محرك التجميع والتقسيم (Split-Apply-Combine)؟"
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
    "id": "relational-algebra-select-filter",
    "title": "Data Contracts & Runtime Validation with Pydantic",
    "titleAr": "عقود البيانات (Data Contracts) والتحقق أثناء التشغيل باستخدام Pydantic",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When you build a bridge out of steel, you don't just guess that the steel is strong. The steel mill signs an engineering contract certifying...",
      "ar": "عندما تبني جسراً من الفولاذ، لا تخمن قوة المعدن تخميناً؛ بل يوقع المصنع عقداً هندسياً معتمداً يضمن أن كل عمود يتحمل 50,000 رطل من الضغط.\nفي ..."
    },
    "prerequisites": [
      "pandas-dataframe"
    ],
    "x": 480,
    "y": 2075,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GroupBySplitApplyCombineLab",
        "narrative": {
          "en": "When you build a bridge out of steel, you don't just guess that the steel is strong. The steel mill signs an engineering contract certifying that the beam can support 50,000 pounds of pressure.\n\nIn data engineering, dirty data is toxic waste. If an external API sends you a price of \"-450\" (a negative string) instead of a positive decimal number, and your database blindly saves it, your downstream machine learning models will produce catastrophic garbage.\n\nPython includes type annotations (like age: int), but Python's type hints are purely cosmetic decorative comments during execution!",
          "ar": "عندما تبني جسراً من الفولاذ، لا تخمن قوة المعدن تخميناً؛ بل يوقع المصنع عقداً هندسياً معتمداً يضمن أن كل عمود يتحمل 50,000 رطل من الضغط.\nفي هندسة البيانات، البيانات الفاسدة هي بمثابة نفايات كيميائية خطيرة. إذا أرسلت لك خدمة خارجية سعراً بقيمة \"-450\" (نص سالب) بدلاً من رقم موجب، وحفظته قاعدة بياناتك بصمت، فإن جميع نماذج الذكاء الاصطناعي اللاحقة ستعطي قرارات كارثية خاطئة.\nتمتلك بايثون تلميحات للأنواع (مثل age: int)، ولكن تلميحات بايثون هي مجرد تعليقات جمالية يتجاهلها المعالج تماماً أثناء التشغيل الفعلي! يمكن لبايثون بكل بساطة تخزين نص فاسد داخل متغير مخصص للأرقام دون أي اعتراض.\nلفرض حدود"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{C}: \\mathcal{X}_{\\text{raw}} \\to \\mathcal{T}_{\\text{valid}} \\cup \\{\\bot_{\\text{ValidationError}}\\}",
        "formulaNote": {
          "en": "Core invariant for Data Contracts & Runtime Validation with Pydantic.",
          "ar": "الخاصية الرياضية الجوهرية لـ عقود البيانات (Data Contracts) والتحقق أثناء التشغيل باستخدام Pydantic."
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
          "id": "py-relational-algebra-select-filter",
          "starterCode": "from typing import Any\n\ndef groupby_zscore_normalize(\n    records: list[dict[str, Any]], \n    group_key: str, \n    target_key: str\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Computes group-wise Z-score normalization using Split-Apply-Combine.\n\n    Args:\n        records: List of record dictionaries.\n        group_key: Column name used to split data into cohorts.\n        target_key: Numeric column to standardize.\n\n    Returns:\n        List of new dictionaries with f\"{target_key}_zscore\" attached.\n    \"\"\"\n    # TODO: Implement Split-Apply-Combine Z-score normalization\n    raise NotImplementedError(\"Implement groupby_zscore_normalize\")",
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
              "starterCode": "from typing import Any\n\ndef groupby_zscore_normalize(\n    records: list[dict[str, Any]], \n    group_key: str, \n    target_key: str\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Computes group-wise Z-score normalization using Split-Apply-Combine.\n\n    Args:\n        records: List of record dictionaries.\n        group_key: Column name used to split data into cohorts.\n        target_key: Numeric column to standardize.\n\n    Returns:\n        List of new dictionaries with f\"{target_key}_zscore\" attached.\n    \"\"\"\n    # TODO: Implement Split-Apply-Combine Z-score normalization\n    raise NotImplementedError(\"Implement groupby_zscore_normalize\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\nfrom collections import defaultdict\nimport math\n\ndef groupby_zscore_normalize(\n    records: list[dict[str, Any]], \n    group_key: str, \n    target_key: str\n) -> list[dict[str, Any]]:\n    # Stage 1: Split\n    groups: dict[Any, list[float]] = defaultdict(list)\n    for r in records:\n        groups[r[group_key]].append(float(r[target_key]))\n\n    # Stage 2: Apply (Compute group statistics)\n    stats: dict[Any, tuple[float, float]] = {}\n    for g, vals in groups.items():\n        n = len(vals)\n        mean = sum(vals) / n\n        if n < 2:\n            std = 0.0\n        else:\n            variance = sum((x - mean) ** 2 for x in vals) / (n - 1)\n            std = math.sqrt(variance)\n        stats[g] = (mean, std)\n\n    # Stage 3: Combine (Project back to records)\n    out_col = f\"{target_key}_zscore\"\n    normalized_records: list[dict[str, Any]] = []\n    \n    for r in records:\n        mean, std = stats[r[group_key]]\n        val = float(r[target_key])\n        z = 0.0 if std == 0.0 else (val - mean) / std\n        normalized_records.append({**r, out_col: round(z, 4)})\n\n    return normalized_records"
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
            "en": "What is the foundational invariant governing Data Contracts & Runtime Validation with Pydantic?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم عقود البيانات (Data Contracts) والتحقق أثناء التشغيل باستخدام Pydantic؟"
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
    "id": "sql-joins-relational-merges",
    "title": "Formal Relational Algebra Foundations",
    "titleAr": "أسس الجبر العلائقي (Relational Algebra) ونظرية كود",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the 1960s, database systems were a nightmare: if you wanted to find a customer's address, you had to write custom procedural code telling...",
      "ar": "في ستينيات القرن الماضي، كانت قواعد البيانات كابوساً معقداً: إذا أردت استرجاع عنوان عميل، كان عليك كتابة كود تفصيلي يوجه بكرات الأشرطة المغن..."
    },
    "prerequisites": [
      "relational-algebra-select-filter"
    ],
    "x": 500,
    "y": 2170,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RelationalAlgebraGridLab",
        "narrative": {
          "en": "In the 1960s, database systems were a nightmare: if you wanted to find a customer's address, you had to write custom procedural code telling the magnetic tape drive physically which tracks to spin and which memory pointers to follow. If the hard drive changed, all your programs broke!\n\nIn 1970, an Oxford-trained mathematician at IBM named Edgar F. Codd published a historic paper that revolutionized the world. Codd said:\n\"Stop telling the computer HOW to find data. Instead, define data using mathematical set theory, and tell the computer WHAT you want!\"\n\nThis mathematical language is Re",
          "ar": "في ستينيات القرن الماضي، كانت قواعد البيانات كابوساً معقداً: إذا أردت استرجاع عنوان عميل، كان عليك كتابة كود تفصيلي يوجه بكرات الأشرطة المغناطيسية أين تدور وأي مسار فيزياوي تسلك. وإذا تم تغيير نوع القرص الصلب، تنهار جميع البرامج!\nفي عام 1970، نشر عالم الرياضيات البريطاني إدغار كود (E. F. Codd) في شركة IBM ورقة بحثية قلبت موازين العالم التقني. قال كود:\n\"كفوا عن إخبار الحاسوب بكيفية البحث عن البيانات خطوة بخطوة. بدلاً من ذلك، عرّفوا البيانات باستخدام نظرية المجموعات الرياضية، وأخبروا الحاسوب بما تريدونه فقط!\"\nهذه اللغة الرياضية هي الجبر العلائقي (Relational Algebra).\nفي هذا الجبر:\n ال"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "R \\subseteq \\text{dom}(A_1) \\times \\text{dom}(A_2) \\times \\dots \\times \\text{dom}(A_n)",
        "formulaNote": {
          "en": "Core invariant for Formal Relational Algebra Foundations.",
          "ar": "الخاصية الرياضية الجوهرية لـ أسس الجبر العلائقي (Relational Algebra) ونظرية كود."
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
          "id": "py-sql-joins-relational-merges",
          "starterCode": "import duckdb\n\ndef test_sql_logical_exec():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE orders (\n            order_id INT,\n            region VARCHAR,\n            product_category VARCHAR,\n            status VARCHAR,\n            revenue DOUBLE\n        );\n        INSERT INTO orders VALUES\n            (1, 'North', 'Tech', 'COMPLETED', 300.0),\n            (2, 'North', 'Tech', 'COMPLETED', 250.0), -- Tech North: sum=550, count=2 (PASS)\n            (3, 'North', 'Tech', 'CANCELLED', 1000.0),-- Cancelled: excluded\n            (4, 'South', 'Tech', 'COMPLETED', 600.0), -- Tech South: sum=600, count=1 (FAIL count)\n            (5, 'North', 'Home', 'COMPLETED', 100.0),\n            (6, 'North', 'Home', 'COMPLETED', 200.0); -- Home North: sum=300, count=2 (FAIL sum)\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            region,\n            product_category,\n            ROUND(SUM(revenue), 2) AS total_revenue,\n            COUNT(*) AS order_count\n        FROM orders\n        WHERE status = 'COMPLETED'\n        GROUP BY region, product_category\n        HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0\n        ORDER BY total_revenue DESC, region ASC;\n    \"\"\"\n    \n    res = con.execute(query).fetchall()\n    assert len(res) == 1\n    assert res[0] == ('North', 'Tech', 550.0, 2)\n    \n    print(\"ALL TESTS PASSED for sql-logical-exec-order\")\n\nif __name__ == \"__main__\":\n    test_sql_logical_exec()",
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
              "starterCode": "import duckdb\n\ndef test_sql_logical_exec():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE orders (\n            order_id INT,\n            region VARCHAR,\n            product_category VARCHAR,\n            status VARCHAR,\n            revenue DOUBLE\n        );\n        INSERT INTO orders VALUES\n            (1, 'North', 'Tech', 'COMPLETED', 300.0),\n            (2, 'North', 'Tech', 'COMPLETED', 250.0), -- Tech North: sum=550, count=2 (PASS)\n            (3, 'North', 'Tech', 'CANCELLED', 1000.0),-- Cancelled: excluded\n            (4, 'South', 'Tech', 'COMPLETED', 600.0), -- Tech South: sum=600, count=1 (FAIL count)\n            (5, 'North', 'Home', 'COMPLETED', 100.0),\n            (6, 'North', 'Home', 'COMPLETED', 200.0); -- Home North: sum=300, count=2 (FAIL sum)\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            region,\n            product_category,\n            ROUND(SUM(revenue), 2) AS total_revenue,\n            COUNT(*) AS order_count\n        FROM orders\n        WHERE status = 'COMPLETED'\n        GROUP BY region, product_category\n        HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0\n        ORDER BY total_revenue DESC, region ASC;\n    \"\"\"\n    \n    res = con.execute(query).fetchall()\n    assert len(res) == 1\n    assert res[0] == ('North', 'Tech', 550.0, 2)\n    \n    print(\"ALL TESTS PASSED for sql-logical-exec-order\")\n\nif __name__ == \"__main__\":\n    test_sql_logical_exec()",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import duckdb\n\ndef test_sql_logical_exec():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE orders (\n            order_id INT,\n            region VARCHAR,\n            product_category VARCHAR,\n            status VARCHAR,\n            revenue DOUBLE\n        );\n        INSERT INTO orders VALUES\n            (1, 'North', 'Tech', 'COMPLETED', 300.0),\n            (2, 'North', 'Tech', 'COMPLETED', 250.0), -- Tech North: sum=550, count=2 (PASS)\n            (3, 'North', 'Tech', 'CANCELLED', 1000.0),-- Cancelled: excluded\n            (4, 'South', 'Tech', 'COMPLETED', 600.0), -- Tech South: sum=600, count=1 (FAIL count)\n            (5, 'North', 'Home', 'COMPLETED', 100.0),\n            (6, 'North', 'Home', 'COMPLETED', 200.0); -- Home North: sum=300, count=2 (FAIL sum)\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            region,\n            product_category,\n            ROUND(SUM(revenue), 2) AS total_revenue,\n            COUNT(*) AS order_count\n        FROM orders\n        WHERE status = 'COMPLETED'\n        GROUP BY region, product_category\n        HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0\n        ORDER BY total_revenue DESC, region ASC;\n    \"\"\"\n    \n    res = con.execute(query).fetchall()\n    assert len(res) == 1\n    assert res[0] == ('North', 'Tech', 550.0, 2)\n    \n    print(\"ALL TESTS PASSED for sql-logical-exec-order\")\n\nif __name__ == \"__main__\":\n    test_sql_logical_exec()"
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
            "en": "What is the foundational invariant governing Formal Relational Algebra Foundations?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم أسس الجبر العلائقي (Relational Algebra) ونظرية كود؟"
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
    "id": "sql-aggregations-group-by",
    "title": "Relational Joins & Set Semantics",
    "titleAr": "الربط العلائقي (Joins) ودلالات المجموعات وقيم NULL",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why do we split database tables up instead of putting everything into one massive spreadsheet?\nIf you store customer addresses in the orders...",
      "ar": "لماذا نقسم قواعد البيانات إلى عدة جداول بدلاً من وضع كل شيء في جدول ضخم واحد؟\nإذا خزنّا عنوان العميل في جدول الطلبات، ففي كل مرة يشتري فيها ..."
    },
    "prerequisites": [
      "sql-joins-relational-merges"
    ],
    "x": 480,
    "y": 2265,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SqlExecutionPipelineCanvas",
        "narrative": {
          "en": "Why do we split database tables up instead of putting everything into one massive spreadsheet?\nIf you store customer addresses in the orders table, every time customer Alice buys a \\$2 coffee, you duplicate her entire street address, city, and zip code. If she moves, you have to update 1,000 rows. This is called redundancy.\n\nSo we normalize: we keep a Customers table and an Orders table.\nTo answer business questions, we must reconnect them: this reconnection is called a Join.\n\nA Join is simply a Cartesian Product combined with a Filter:\n1. Imagine matching every order with every single",
          "ar": "لماذا نقسم قواعد البيانات إلى عدة جداول بدلاً من وضع كل شيء في جدول ضخم واحد؟\nإذا خزنّا عنوان العميل في جدول الطلبات، ففي كل مرة يشتري فيها العميل قهوة بدولارين، سنكرر اسمه وعنوانه ورمزه البريدي. وإذا انتقل لشارع آخر، سنضطر لتعديل آلاف السجلات!\nلذلك نفصل البيانات إلى: جدول العملاء وجدول الطلبات.\nولكن للإجابة عن أسئلة الأعمال، نحتاج لإعادة ربط هذه البيانات: وهذا هو الربط (Join).\nالربط العلائقي هو ببساطة جداء ديكارتي متبوع بفلترة:\n1. تخيل مطابقة كل طلب مع كل عميل مسجل في النظام.\n2. استبعاد كل الأزواج التي لا يتطابق فيها معرف العميل.\nالناتج هو الربط الداخلي (Inner Join).\nماذا لو كان ل"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S)",
        "formulaNote": {
          "en": "Core invariant for Relational Joins & Set Semantics.",
          "ar": "الخاصية الرياضية الجوهرية لـ الربط العلائقي (Joins) ودلالات المجموعات وقيم NULL."
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
          "id": "py-sql-aggregations-group-by",
          "starterCode": "import duckdb\n\ndef test_sql_join_coalesce():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE customers (customer_id INT, customer_name VARCHAR);\n        CREATE TABLE transactions (txn_id INT, customer_id INT, amount DOUBLE);\n        \n        INSERT INTO customers VALUES\n            (101, 'Alice'),\n            (102, 'Bob'),\n            (103, 'Charlie');\n            \n        INSERT INTO transactions VALUES\n            (1, 101, 50.0),\n            (2, 101, 75.5),\n            (3, 102, 20.0);\n            -- Charlie has 0 transactions\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            c.customer_id,\n            c.customer_name,\n            COALESCE(ROUND(SUM(t.amount), 2), 0.0) AS total_spent,\n            COUNT(t.txn_id) AS transaction_count\n        FROM customers c\n        LEFT JOIN transactions t ON c.customer_id = t.customer_id\n        GROUP BY c.customer_id, c.customer_name\n        ORDER BY total_spent DESC, c.customer_id ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert rows[0] == (101, 'Alice', 125.5, 2)\n    assert rows[1] == (102, 'Bob', 20.0, 1)\n    assert rows[2] == (103, 'Charlie', 0.0, 0), \"Customer with 0 transactions must have count 0, not 1!\"\n    \n    print(\"ALL TESTS PASSED for sql-join-coalesce-null\")\n\nif __name__ == \"__main__\":\n    test_sql_join_coalesce()",
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
              "starterCode": "import duckdb\n\ndef test_sql_join_coalesce():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE customers (customer_id INT, customer_name VARCHAR);\n        CREATE TABLE transactions (txn_id INT, customer_id INT, amount DOUBLE);\n        \n        INSERT INTO customers VALUES\n            (101, 'Alice'),\n            (102, 'Bob'),\n            (103, 'Charlie');\n            \n        INSERT INTO transactions VALUES\n            (1, 101, 50.0),\n            (2, 101, 75.5),\n            (3, 102, 20.0);\n            -- Charlie has 0 transactions\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            c.customer_id,\n            c.customer_name,\n            COALESCE(ROUND(SUM(t.amount), 2), 0.0) AS total_spent,\n            COUNT(t.txn_id) AS transaction_count\n        FROM customers c\n        LEFT JOIN transactions t ON c.customer_id = t.customer_id\n        GROUP BY c.customer_id, c.customer_name\n        ORDER BY total_spent DESC, c.customer_id ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert rows[0] == (101, 'Alice', 125.5, 2)\n    assert rows[1] == (102, 'Bob', 20.0, 1)\n    assert rows[2] == (103, 'Charlie', 0.0, 0), \"Customer with 0 transactions must have count 0, not 1!\"\n    \n    print(\"ALL TESTS PASSED for sql-join-coalesce-null\")\n\nif __name__ == \"__main__\":\n    test_sql_join_coalesce()",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import duckdb\n\ndef test_sql_join_coalesce():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE customers (customer_id INT, customer_name VARCHAR);\n        CREATE TABLE transactions (txn_id INT, customer_id INT, amount DOUBLE);\n        \n        INSERT INTO customers VALUES\n            (101, 'Alice'),\n            (102, 'Bob'),\n            (103, 'Charlie');\n            \n        INSERT INTO transactions VALUES\n            (1, 101, 50.0),\n            (2, 101, 75.5),\n            (3, 102, 20.0);\n            -- Charlie has 0 transactions\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            c.customer_id,\n            c.customer_name,\n            COALESCE(ROUND(SUM(t.amount), 2), 0.0) AS total_spent,\n            COUNT(t.txn_id) AS transaction_count\n        FROM customers c\n        LEFT JOIN transactions t ON c.customer_id = t.customer_id\n        GROUP BY c.customer_id, c.customer_name\n        ORDER BY total_spent DESC, c.customer_id ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert rows[0] == (101, 'Alice', 125.5, 2)\n    assert rows[1] == (102, 'Bob', 20.0, 1)\n    assert rows[2] == (103, 'Charlie', 0.0, 0), \"Customer with 0 transactions must have count 0, not 1!\"\n    \n    print(\"ALL TESTS PASSED for sql-join-coalesce-null\")\n\nif __name__ == \"__main__\":\n    test_sql_join_coalesce()"
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
            "en": "What is the foundational invariant governing Relational Joins & Set Semantics?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الربط العلائقي (Joins) ودلالات المجموعات وقيم NULL؟"
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
    "id": "sql-window-functions",
    "title": "SQL Declarative Execution Lifecycle",
    "titleAr": "دورة حياة التنفيذ التقريري في SQL (من المخطط المنطقي إلى التنفيذ الفعلي)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When you write a SQL query, what is the very first word you write? \nAlmost always, the word is: SELECT.\n\nNow here is the shocking truth that...",
      "ar": "عندما تكتب استعلام SQL، ما هي أول كلمة تكتبها عادة؟\nدائماً تقريباً هي كلمة: SELECT.\nوالآن إليك الحقيقة الصادمة التي يجهلها معظم المبتدئين: ع..."
    },
    "prerequisites": [
      "sql-aggregations-group-by"
    ],
    "x": 500,
    "y": 2360,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RelationalJoinGeometryLab",
        "narrative": {
          "en": "When you write a SQL query, what is the very first word you write? \nAlmost always, the word is: SELECT.\n\nNow here is the shocking truth that trips up every beginner: When the database actually runs your query, SELECT is almost the LAST thing it executes!\n\nSQL is a Declarative Language. You describe the destination, not the highway. \nBecause of this, the order in which you write SQL (its Lexical Order) is totally backwards from the order in which the database engine executes it (its Physical Execution Lifecycle).\n\nThe real execution lifecycle flows through these exact stages:\n1.",
          "ar": "عندما تكتب استعلام SQL، ما هي أول كلمة تكتبها عادة؟\nدائماً تقريباً هي كلمة: SELECT.\nوالآن إليك الحقيقة الصادمة التي يجهلها معظم المبتدئين: عندما يبدأ محرك قاعدة البيانات في تنفيذ استعلامك، فإن مرحلة SELECT هي آخر ما ينفذه تقريباً!\nلغة SQL هي لغة تقريرية (Declarative Language)؛ أنت تخبر النظام بوجهتك النهائية، ولا تخبره بالطريق الفيزيائي الذي سيسلكه.\nلذلك، فإن الترتيب الذي تكتب به الاستعلام يختلف تماماً عن دورة حياة التنفيذ الفعلية لمحرك الاستعلامات:\n1. FROM و JOIN: أولاً، تحديد الجداول المستهدفة وربطها معاً.\n2. WHERE: تصفية واستبعاد الصفوف غير المطابقة فوراً قبل أ"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Result} = \\left( \\lambda_{\\text{LIMIT}} \\circ \\omega_{\\text{ORDER}} \\circ \\delta_{\\text{DISTINCT}} \\circ \\pi_{\\text{SELECT}} \\circ \\sigma_{\\text{HAVING}} \\circ \\gamma_{\\text{GROUP}} \\circ \\sigma_{\\text{WHERE}} \\circ \\bowtie_{\\text{FROM}} \\right) (\\mathcal{D})",
        "formulaNote": {
          "en": "Core invariant for SQL Declarative Execution Lifecycle.",
          "ar": "الخاصية الرياضية الجوهرية لـ دورة حياة التنفيذ التقريري في SQL (من المخطط المنطقي إلى التنفيذ الفعلي)."
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
          "id": "py-sql-window-functions",
          "starterCode": "import duckdb\n\ndef test_sql_case_pivot():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE sales (dept_name VARCHAR, sale_date DATE, revenue DOUBLE);\n        INSERT INTO sales VALUES\n            ('Electronics', '2024-01-15', 100.0), -- Q1\n            ('Electronics', '2024-05-10', 200.0), -- Q2\n            ('Electronics', '2024-11-20', 300.0), -- Q4\n            ('Electronics', '2023-11-20', 999.0), -- 2023 (Excluded)\n            ('Furniture',   '2024-02-10', 150.0); -- Q1\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            dept_name,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 2 THEN revenue ELSE 0 END), 2) AS q2_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 3 THEN revenue ELSE 0 END), 2) AS q3_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 4 THEN revenue ELSE 0 END), 2) AS q4_revenue,\n            ROUND(SUM(revenue), 2) AS annual_total\n        FROM sales\n        WHERE EXTRACT(YEAR FROM sale_date) = 2024\n        GROUP BY dept_name\n        ORDER BY annual_total DESC, dept_name ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 2\n    assert rows[0] == ('Electronics', 100.0, 200.0, 0.0, 300.0, 600.0)\n    assert rows[1] == ('Furniture', 150.0, 0.0, 0.0, 0.0, 150.0)\n    \n    print(\"ALL TESTS PASSED for sql-case-pivot-agg\")\n\nif __name__ == \"__main__\":\n    test_sql_case_pivot()",
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
              "starterCode": "import duckdb\n\ndef test_sql_case_pivot():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE sales (dept_name VARCHAR, sale_date DATE, revenue DOUBLE);\n        INSERT INTO sales VALUES\n            ('Electronics', '2024-01-15', 100.0), -- Q1\n            ('Electronics', '2024-05-10', 200.0), -- Q2\n            ('Electronics', '2024-11-20', 300.0), -- Q4\n            ('Electronics', '2023-11-20', 999.0), -- 2023 (Excluded)\n            ('Furniture',   '2024-02-10', 150.0); -- Q1\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            dept_name,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 2 THEN revenue ELSE 0 END), 2) AS q2_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 3 THEN revenue ELSE 0 END), 2) AS q3_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 4 THEN revenue ELSE 0 END), 2) AS q4_revenue,\n            ROUND(SUM(revenue), 2) AS annual_total\n        FROM sales\n        WHERE EXTRACT(YEAR FROM sale_date) = 2024\n        GROUP BY dept_name\n        ORDER BY annual_total DESC, dept_name ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 2\n    assert rows[0] == ('Electronics', 100.0, 200.0, 0.0, 300.0, 600.0)\n    assert rows[1] == ('Furniture', 150.0, 0.0, 0.0, 0.0, 150.0)\n    \n    print(\"ALL TESTS PASSED for sql-case-pivot-agg\")\n\nif __name__ == \"__main__\":\n    test_sql_case_pivot()",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import duckdb\n\ndef test_sql_case_pivot():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE sales (dept_name VARCHAR, sale_date DATE, revenue DOUBLE);\n        INSERT INTO sales VALUES\n            ('Electronics', '2024-01-15', 100.0), -- Q1\n            ('Electronics', '2024-05-10', 200.0), -- Q2\n            ('Electronics', '2024-11-20', 300.0), -- Q4\n            ('Electronics', '2023-11-20', 999.0), -- 2023 (Excluded)\n            ('Furniture',   '2024-02-10', 150.0); -- Q1\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            dept_name,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 2 THEN revenue ELSE 0 END), 2) AS q2_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 3 THEN revenue ELSE 0 END), 2) AS q3_revenue,\n            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 4 THEN revenue ELSE 0 END), 2) AS q4_revenue,\n            ROUND(SUM(revenue), 2) AS annual_total\n        FROM sales\n        WHERE EXTRACT(YEAR FROM sale_date) = 2024\n        GROUP BY dept_name\n        ORDER BY annual_total DESC, dept_name ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 2\n    assert rows[0] == ('Electronics', 100.0, 200.0, 0.0, 300.0, 600.0)\n    assert rows[1] == ('Furniture', 150.0, 0.0, 0.0, 0.0, 150.0)\n    \n    print(\"ALL TESTS PASSED for sql-case-pivot-agg\")\n\nif __name__ == \"__main__\":\n    test_sql_case_pivot()"
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
            "en": "What is the foundational invariant governing SQL Declarative Execution Lifecycle?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم دورة حياة التنفيذ التقريري في SQL (من المخطط المنطقي إلى التنفيذ الفعلي)؟"
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
    "id": "sql-ctes-recursive-queries",
    "title": "Window Functions & Analytic Partitioning",
    "titleAr": "دوال النوافذ (Window Functions) والتقسيم التحليلي",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In standard SQL, if you want to compute an aggregate—like the average company salary—using GROUP BY, something destructive happens: all indi...",
      "ar": "في استعلامات SQL التقليدية، عندما نستخدم GROUP BY لحساب متوسط رواتب الشركة، يحدث أمر مدمر لبياناتك: تنهار جميع أسطر الموظفين الفردية وتتلاشى..."
    },
    "prerequisites": [
      "sql-window-functions"
    ],
    "x": 480,
    "y": 2455,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "WindowFunctionFrameLab",
        "narrative": {
          "en": "In standard SQL, if you want to compute an aggregate—like the average company salary—using GROUP BY, something destructive happens: all individual employee rows collapse into a single summary row! You lose the ability to see who individual employees are.\n\nWhat if you want to answer a question like:\n\"Show me every employee's name, their salary, AND alongside each person, display the average salary of their specific department so they can compare?\"\n\nStandard GROUP BY cannot do this without clumsy, slow self-joins.\nTo solve this, SQL introduced Window Functions.\nA window function pe",
          "ar": "في استعلامات SQL التقليدية، عندما نستخدم GROUP BY لحساب متوسط رواتب الشركة، يحدث أمر مدمر لبياناتك: تنهار جميع أسطر الموظفين الفردية وتتلاشى لتنكمش في سطر تلخيصي واحد فقط! تفقد القدرة على رؤية أسماء الموظفين وبياناتهم الفردية.\nولكن ماذا لو أردت الإجابة عن سؤال مثل:\n\"اعرض لي اسم كل موظف، وراتبه الفعلي، وإلى جانب كل شخص ضع متوسط رواتب قسمه للمقارنة؟\"\nيعجز GROUP BY التقليدي عن فعل ذلك دون استعلامات فرعية مكررة وبطيئة.\nهنا يكمن سحر دوال النوافذ (Window Functions).\nتقوم دالة النافذة بإجراء حسابات إحصائية عبر مجموعة من الصفوف المرتبطة، ولكنها تحافظ تماماً على هوية كل صف بمفرده دون أن"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "R = \\bigsqcup_{k \\in \\mathcal{K}} \\mathcal{P}_k \\quad \\text{where} \\quad \\mathcal{P}_k = \\{ t \\in R \\mid p(t) = k \\}",
        "formulaNote": {
          "en": "Core invariant for Window Functions & Analytic Partitioning.",
          "ar": "الخاصية الرياضية الجوهرية لـ دوال النوافذ (Window Functions) والتقسيم التحليلي."
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
          "id": "py-sql-ctes-recursive-queries",
          "starterCode": "import duckdb\n\ndef test_sql_window_rank():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE employees (emp_id INT, dept_name VARCHAR, emp_name VARCHAR, salary DOUBLE);\n        INSERT INTO employees VALUES\n            (1, 'Eng', 'Alice', 100000.0),\n            (2, 'Eng', 'Bob',   100000.0), -- Tie for 1st\n            (3, 'Eng', 'Carol',  80000.0), -- 2nd in DENSE_RANK\n            (4, 'Mkt', 'Dave',   90000.0);\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            emp_id,\n            dept_name,\n            emp_name,\n            salary,\n            DENSE_RANK() OVER (\n                PARTITION BY dept_name \n                ORDER BY salary DESC\n            ) AS dept_salary_rank,\n            ROUND(\n                MAX(salary) OVER (PARTITION BY dept_name) - salary, \n                2\n            ) AS salary_gap_to_max\n        FROM employees\n        ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    # Check Eng partition\n    assert rows[0][:5] == (1, 'Eng', 'Alice', 100000.0, 1)\n    assert rows[0][5] == 0.0\n    assert rows[1][:5] == (2, 'Eng', 'Bob', 100000.0, 1)\n    assert rows[1][5] == 0.0\n    assert rows[2][:5] == (3, 'Eng', 'Carol', 80000.0, 2), \"DENSE_RANK must assign 2 to Carol, not 3!\"\n    assert rows[2][5] == 20000.0\n    \n    print(\"ALL TESTS PASSED for sql-window-dense-rank\")\n\nif __name__ == \"__main__\":\n    test_sql_window_rank()",
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
              "starterCode": "import duckdb\n\ndef test_sql_window_rank():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE employees (emp_id INT, dept_name VARCHAR, emp_name VARCHAR, salary DOUBLE);\n        INSERT INTO employees VALUES\n            (1, 'Eng', 'Alice', 100000.0),\n            (2, 'Eng', 'Bob',   100000.0), -- Tie for 1st\n            (3, 'Eng', 'Carol',  80000.0), -- 2nd in DENSE_RANK\n            (4, 'Mkt', 'Dave',   90000.0);\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            emp_id,\n            dept_name,\n            emp_name,\n            salary,\n            DENSE_RANK() OVER (\n                PARTITION BY dept_name \n                ORDER BY salary DESC\n            ) AS dept_salary_rank,\n            ROUND(\n                MAX(salary) OVER (PARTITION BY dept_name) - salary, \n                2\n            ) AS salary_gap_to_max\n        FROM employees\n        ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    # Check Eng partition\n    assert rows[0][:5] == (1, 'Eng', 'Alice', 100000.0, 1)\n    assert rows[0][5] == 0.0\n    assert rows[1][:5] == (2, 'Eng', 'Bob', 100000.0, 1)\n    assert rows[1][5] == 0.0\n    assert rows[2][:5] == (3, 'Eng', 'Carol', 80000.0, 2), \"DENSE_RANK must assign 2 to Carol, not 3!\"\n    assert rows[2][5] == 20000.0\n    \n    print(\"ALL TESTS PASSED for sql-window-dense-rank\")\n\nif __name__ == \"__main__\":\n    test_sql_window_rank()",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import duckdb\n\ndef test_sql_window_rank():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE employees (emp_id INT, dept_name VARCHAR, emp_name VARCHAR, salary DOUBLE);\n        INSERT INTO employees VALUES\n            (1, 'Eng', 'Alice', 100000.0),\n            (2, 'Eng', 'Bob',   100000.0), -- Tie for 1st\n            (3, 'Eng', 'Carol',  80000.0), -- 2nd in DENSE_RANK\n            (4, 'Mkt', 'Dave',   90000.0);\n    \"\"\")\n    \n    query = \"\"\"\n        SELECT\n            emp_id,\n            dept_name,\n            emp_name,\n            salary,\n            DENSE_RANK() OVER (\n                PARTITION BY dept_name \n                ORDER BY salary DESC\n            ) AS dept_salary_rank,\n            ROUND(\n                MAX(salary) OVER (PARTITION BY dept_name) - salary, \n                2\n            ) AS salary_gap_to_max\n        FROM employees\n        ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    # Check Eng partition\n    assert rows[0][:5] == (1, 'Eng', 'Alice', 100000.0, 1)\n    assert rows[0][5] == 0.0\n    assert rows[1][:5] == (2, 'Eng', 'Bob', 100000.0, 1)\n    assert rows[1][5] == 0.0\n    assert rows[2][:5] == (3, 'Eng', 'Carol', 80000.0, 2), \"DENSE_RANK must assign 2 to Carol, not 3!\"\n    assert rows[2][5] == 20000.0\n    \n    print(\"ALL TESTS PASSED for sql-window-dense-rank\")\n\nif __name__ == \"__main__\":\n    test_sql_window_rank()"
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
            "en": "What is the foundational invariant governing Window Functions & Analytic Partitioning?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم دوال النوافذ (Window Functions) والتقسيم التحليلي؟"
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
    "id": "sql-indexing-query-plans",
    "title": "Positional Window Offsets, Ranking & Frame Bounds",
    "titleAr": "الإزاحات الموضعية، الترتيب، وحدود أطر النوافذ (ROWS vs RANGE)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In financial analysis and time series, you almost never care about a number in total isolation. You care about change:\n\"How much did revenue...",
      "ar": "في التحليل المالي وسلاسل الزمن، لا يهمك الرقم منفرداً في فراغ، بل يهمك معدل التغير:\n\"كم نمت الأرباح اليوم مقارنة بيوم أمس؟\"\n\"هل مبيعات هذا ا..."
    },
    "prerequisites": [
      "sql-ctes-recursive-queries"
    ],
    "x": 500,
    "y": 2550,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PositionalWindowOffsetLab",
        "narrative": {
          "en": "In financial analysis and time series, you almost never care about a number in total isolation. You care about change:\n\"How much did revenue grow compared to yesterday?\"\n\"Is this month's profit higher than the previous month?\"\n\nWithout window functions, calculating yesterday's revenue requires taking the table and joining it back onto itself with a complex date = date - 1 condition.\nSQL solves this effortlessly with positional offset functions:\n LAG(column, 1): Peeks backward through the window curtain to grab the value from $1$ row before the current row.\n LEAD(column, 1)",
          "ar": "في التحليل المالي وسلاسل الزمن، لا يهمك الرقم منفرداً في فراغ، بل يهمك معدل التغير:\n\"كم نمت الأرباح اليوم مقارنة بيوم أمس؟\"\n\"هل مبيعات هذا الشهر أعلى من الشهر السابق؟\"\nقديماً، كان حساب قيمة الأمس يتطلب ربط الجدول بنفسه عبر حيل برمجية شاقة وبطيئة.\nتحل SQL هذه المعضلة عبر دوال الإزاحة الموضعية:\n LAG(column, 1): تلتفت إلى الخلف عبر النافذة لتجلب قيمة الصف السابق بمقدار خطوة واحدة.\n LEAD(column, 1): تلتفت إلى الأمام لتجلب قيمة الصف اللاحق.\nثم تأتي دوال الترتيب (Ranking):\n ROW_NUMBER(): ترقيم تسلسلي صلب ($1, 2, 3, 4$) دون أي تعادل.\n RANK(): الترتيب الأولمبي ($1, 2, 2"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{LAG}(v, k)_i = \\begin{cases} \nv(r_{i-k}) & \\text{if } i - k \\ge 1 \\\\ \n\\bot_{\\text{NULL}} & \\text{if } i - k < 1 \n\\end{cases}",
        "formulaNote": {
          "en": "Core invariant for Positional Window Offsets, Ranking & Frame Bounds.",
          "ar": "الخاصية الرياضية الجوهرية لـ الإزاحات الموضعية، الترتيب، وحدود أطر النوافذ (ROWS vs RANGE)."
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
          "id": "py-sql-indexing-query-plans",
          "starterCode": "import duckdb\n\ndef test_sql_window_frame():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE daily_metrics (metric_date DATE, revenue DOUBLE);\n        INSERT INTO daily_metrics VALUES\n            ('2024-01-01', 100.0),\n            ('2024-01-02', 150.0),\n            ('2024-01-03', 200.0),\n            ('2024-01-04', 100.0);\n    \"\"\")\n    \n    query = \"\"\"\n        WITH metrics_lagged AS (\n            SELECT\n                metric_date,\n                revenue,\n                ROUND(\n                    SUM(revenue) OVER (\n                        ORDER BY metric_date \n                        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n                    ), \n                    2\n                ) AS rolling_3day_revenue,\n                LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue\n            FROM daily_metrics\n        )\n        SELECT\n            metric_date,\n            revenue,\n            rolling_3day_revenue,\n            prev_day_revenue,\n            CASE\n                WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL\n                ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2)\n            END AS dod_growth_pct\n        FROM metrics_lagged\n        ORDER BY metric_date ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    assert rows[0][2] == 100.0 and rows[0][4] is None\n    assert rows[1][2] == 250.0 and rows[1][4] == 50.0\n    assert rows[2][2] == 450.0 and rows[2][4] == 33.33\n    assert rows[3][2] == 450.0 and rows[3][4] == -50.0\n    \n    print(\"ALL TESTS PASSED for sql-window-frame-delta\")\n\nif __name__ == \"__main__\":\n    test_sql_window_frame()",
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
              "starterCode": "import duckdb\n\ndef test_sql_window_frame():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE daily_metrics (metric_date DATE, revenue DOUBLE);\n        INSERT INTO daily_metrics VALUES\n            ('2024-01-01', 100.0),\n            ('2024-01-02', 150.0),\n            ('2024-01-03', 200.0),\n            ('2024-01-04', 100.0);\n    \"\"\")\n    \n    query = \"\"\"\n        WITH metrics_lagged AS (\n            SELECT\n                metric_date,\n                revenue,\n                ROUND(\n                    SUM(revenue) OVER (\n                        ORDER BY metric_date \n                        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n                    ), \n                    2\n                ) AS rolling_3day_revenue,\n                LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue\n            FROM daily_metrics\n        )\n        SELECT\n            metric_date,\n            revenue,\n            rolling_3day_revenue,\n            prev_day_revenue,\n            CASE\n                WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL\n                ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2)\n            END AS dod_growth_pct\n        FROM metrics_lagged\n        ORDER BY metric_date ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    assert rows[0][2] == 100.0 and rows[0][4] is None\n    assert rows[1][2] == 250.0 and rows[1][4] == 50.0\n    assert rows[2][2] == 450.0 and rows[2][4] == 33.33\n    assert rows[3][2] == 450.0 and rows[3][4] == -50.0\n    \n    print(\"ALL TESTS PASSED for sql-window-frame-delta\")\n\nif __name__ == \"__main__\":\n    test_sql_window_frame()",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import duckdb\n\ndef test_sql_window_frame():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE daily_metrics (metric_date DATE, revenue DOUBLE);\n        INSERT INTO daily_metrics VALUES\n            ('2024-01-01', 100.0),\n            ('2024-01-02', 150.0),\n            ('2024-01-03', 200.0),\n            ('2024-01-04', 100.0);\n    \"\"\")\n    \n    query = \"\"\"\n        WITH metrics_lagged AS (\n            SELECT\n                metric_date,\n                revenue,\n                ROUND(\n                    SUM(revenue) OVER (\n                        ORDER BY metric_date \n                        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n                    ), \n                    2\n                ) AS rolling_3day_revenue,\n                LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue\n            FROM daily_metrics\n        )\n        SELECT\n            metric_date,\n            revenue,\n            rolling_3day_revenue,\n            prev_day_revenue,\n            CASE\n                WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL\n                ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2)\n            END AS dod_growth_pct\n        FROM metrics_lagged\n        ORDER BY metric_date ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    assert rows[0][2] == 100.0 and rows[0][4] is None\n    assert rows[1][2] == 250.0 and rows[1][4] == 50.0\n    assert rows[2][2] == 450.0 and rows[2][4] == 33.33\n    assert rows[3][2] == 450.0 and rows[3][4] == -50.0\n    \n    print(\"ALL TESTS PASSED for sql-window-frame-delta\")\n\nif __name__ == \"__main__\":\n    test_sql_window_frame()"
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
            "en": "What is the foundational invariant governing Positional Window Offsets, Ranking & Frame Bounds?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الإزاحات الموضعية، الترتيب، وحدود أطر النوافذ (ROWS vs RANGE)؟"
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
    "id": "columnar-storage-parquet",
    "title": "Common Table Expressions & Recursive CTEs",
    "titleAr": "التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Have you ever tried to read a 200-line SQL query written by someone else, where subqueries are nested inside subqueries inside subqueries 7 ...",
      "ar": "هل حاولت يوماً قراءة استعلام SQL يمتد لمئات الأسطر وفيه استعلامات فرعية متداخلة داخل بعضها سبع مرات؟ إنه كابوس حقيقي يعمي الأبصار.\nالتعبير ا..."
    },
    "prerequisites": [
      "numpy-strides-indexing",
      "sql-indexing-query-plans"
    ],
    "x": 480,
    "y": 2645,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RecursiveCteGraphLab",
        "narrative": {
          "en": "Have you ever tried to read a 200-line SQL query written by someone else, where subqueries are nested inside subqueries inside subqueries 7 levels deep? It looks like an incomprehensible nightmare of parentheses.\n\nA Common Table Expression (CTE)—defined using the simple keyword WITH—allows you to name temporary intermediate result tables and read your query cleanly from top to bottom, like chapters in a novel:\nsql\nWITH RawSales AS (...),\nCleanSales AS (SELECT  FROM RawSales WHERE ...),\nDepartmentTotals AS (SELECT ... FROM CleanSales GROUP BY ...)\nSELECT  FROM DepartmentTotals;",
          "ar": "هل حاولت يوماً قراءة استعلام SQL يمتد لمئات الأسطر وفيه استعلامات فرعية متداخلة داخل بعضها سبع مرات؟ إنه كابوس حقيقي يعمي الأبصار.\nالتعبير الجدولي العام (CTE)—الذي يبدأ بالكلمة البسيطة WITH—يتيح لك تسمية الجداول المؤقتة الوسيطة وقراءة استعلامك بسلاسة وترتيب من الأعلى للأسفل كفصول كتاب منظم.\nوماذا عن الاستعلام العودي (Recursive CTE)؟\nإن لغة SQL العادية لغة مسطحة تعجز عن تتبع الهياكل الشجرية المعقدة (مثل: إيجاد الموظف، ومديره، ومدير مديره، وصولاً للمدير التنفيذي).\nيحقق الاستعلام العودي هذا الإنجاز عبر ركائز الاستدعاء الذاتي:\n1. عضو المرساة (Anchor Member): الاستعلام التأسيسي الذي ي"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "R_0 = \\text{AnchorQuery}(\\mathcal{D})",
        "formulaNote": {
          "en": "Core invariant for Common Table Expressions & Recursive CTEs.",
          "ar": "الخاصية الرياضية الجوهرية لـ التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)."
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
          "id": "py-columnar-storage-parquet",
          "starterCode": "import duckdb\n\ndef test_sql_recursive_tree():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE org_chart (emp_id INT, emp_name VARCHAR, manager_id INT);\n        INSERT INTO org_chart VALUES\n            (1, 'Alice', NULL),\n            (2, 'Bob', 1),\n            (3, 'Charlie', 2),\n            (4, 'Diana', 1);\n    \"\"\")\n    \n    query = \"\"\"\n        WITH RECURSIVE hierarchy AS (\n            SELECT\n                emp_id,\n                emp_name,\n                0 AS depth,\n                CAST(emp_name AS VARCHAR) AS path\n            FROM org_chart\n            WHERE manager_id IS NULL\n\n            UNION ALL\n\n            SELECT\n                child.emp_id,\n                child.emp_name,\n                parent.depth + 1 AS depth,\n                parent.path || ' -> ' || child.emp_name AS path\n            FROM org_chart child\n            JOIN hierarchy parent ON child.manager_id = parent.emp_id\n        )\n        SELECT emp_id, emp_name, depth, path\n        FROM hierarchy\n        ORDER BY depth ASC, path ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    assert rows[0] == (1, 'Alice', 0, 'Alice')\n    assert rows[1] == (2, 'Bob', 1, 'Alice -> Bob')\n    assert rows[2] == (4, 'Diana', 1, 'Alice -> Diana')\n    assert rows[3] == (3, 'Charlie', 2, 'Alice -> Bob -> Charlie')\n    \n    print(\"ALL TESTS PASSED for sql-recursive-org-tree\")\n\nif __name__ == \"__main__\":\n    test_sql_recursive_tree()",
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
              "starterCode": "import duckdb\n\ndef test_sql_recursive_tree():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE org_chart (emp_id INT, emp_name VARCHAR, manager_id INT);\n        INSERT INTO org_chart VALUES\n            (1, 'Alice', NULL),\n            (2, 'Bob', 1),\n            (3, 'Charlie', 2),\n            (4, 'Diana', 1);\n    \"\"\")\n    \n    query = \"\"\"\n        WITH RECURSIVE hierarchy AS (\n            SELECT\n                emp_id,\n                emp_name,\n                0 AS depth,\n                CAST(emp_name AS VARCHAR) AS path\n            FROM org_chart\n            WHERE manager_id IS NULL\n\n            UNION ALL\n\n            SELECT\n                child.emp_id,\n                child.emp_name,\n                parent.depth + 1 AS depth,\n                parent.path || ' -> ' || child.emp_name AS path\n            FROM org_chart child\n            JOIN hierarchy parent ON child.manager_id = parent.emp_id\n        )\n        SELECT emp_id, emp_name, depth, path\n        FROM hierarchy\n        ORDER BY depth ASC, path ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    assert rows[0] == (1, 'Alice', 0, 'Alice')\n    assert rows[1] == (2, 'Bob', 1, 'Alice -> Bob')\n    assert rows[2] == (4, 'Diana', 1, 'Alice -> Diana')\n    assert rows[3] == (3, 'Charlie', 2, 'Alice -> Bob -> Charlie')\n    \n    print(\"ALL TESTS PASSED for sql-recursive-org-tree\")\n\nif __name__ == \"__main__\":\n    test_sql_recursive_tree()",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import duckdb\n\ndef test_sql_recursive_tree():\n    con = duckdb.connect(\":memory:\")\n    con.execute(\"\"\"\n        CREATE TABLE org_chart (emp_id INT, emp_name VARCHAR, manager_id INT);\n        INSERT INTO org_chart VALUES\n            (1, 'Alice', NULL),\n            (2, 'Bob', 1),\n            (3, 'Charlie', 2),\n            (4, 'Diana', 1);\n    \"\"\")\n    \n    query = \"\"\"\n        WITH RECURSIVE hierarchy AS (\n            SELECT\n                emp_id,\n                emp_name,\n                0 AS depth,\n                CAST(emp_name AS VARCHAR) AS path\n            FROM org_chart\n            WHERE manager_id IS NULL\n\n            UNION ALL\n\n            SELECT\n                child.emp_id,\n                child.emp_name,\n                parent.depth + 1 AS depth,\n                parent.path || ' -> ' || child.emp_name AS path\n            FROM org_chart child\n            JOIN hierarchy parent ON child.manager_id = parent.emp_id\n        )\n        SELECT emp_id, emp_name, depth, path\n        FROM hierarchy\n        ORDER BY depth ASC, path ASC;\n    \"\"\"\n    \n    rows = con.execute(query).fetchall()\n    assert len(rows) == 4\n    assert rows[0] == (1, 'Alice', 0, 'Alice')\n    assert rows[1] == (2, 'Bob', 1, 'Alice -> Bob')\n    assert rows[2] == (4, 'Diana', 1, 'Alice -> Diana')\n    assert rows[3] == (3, 'Charlie', 2, 'Alice -> Bob -> Charlie')\n    \n    print(\"ALL TESTS PASSED for sql-recursive-org-tree\")\n\nif __name__ == \"__main__\":\n    test_sql_recursive_tree()"
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
            "en": "What is the foundational invariant governing Common Table Expressions & Recursive CTEs?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)؟"
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
    "id": "arrow-ipc-zero-copy",
    "title": "Parquet Columnar Storage, Strided Encodings & Pushdown",
    "titleAr": "تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "For 40 years, relational databases stored data in Row-Oriented fashion (CSV, PostgreSQL, MySQL). \nIn a row-oriented file, Row 1 is written t...",
      "ar": "على مدى 40 عاماً، خُزنت قواعد البيانات وفق نمط التخزين الموجّه بالصفوف (Row-Oriented) كما في ملفات CSV وقواعد PostgreSQL.\nفي هذا النمط، يُكت..."
    },
    "prerequisites": [
      "columnar-storage-parquet"
    ],
    "x": 500,
    "y": 2740,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ArrowBufferMemoryLayoutLab",
        "narrative": {
          "en": "For 40 years, relational databases stored data in Row-Oriented fashion (CSV, PostgreSQL, MySQL). \nIn a row-oriented file, Row 1 is written to disk: [Alice, 29, Engineer, $120000], followed immediately by Row 2: [Bob, 34, Designer, $95000].\nThis is fantastic for transactional apps (OLTP) like an ATM where you want to fetch Alice's whole profile.\n\nNow imagine you are a data analyst running a query:\n\"What is the average salary across all 50,000,000 employees?\"\nIn a row-oriented CSV or table, the computer's hard drive must physically read every employee's name, age, job title, and notes",
          "ar": "على مدى 40 عاماً، خُزنت قواعد البيانات وفق نمط التخزين الموجّه بالصفوف (Row-Oriented) كما في ملفات CSV وقواعد PostgreSQL.\nفي هذا النمط، يُكتب السطر الأول كاملاً على القرص: [سارة، 29 سنة، مهندسة، 120,000$]، يليه مباشرة السطر الثاني. هذا رائع للتطبيقات البنكية السريعة (OLTP) لاسترجاع ملف عميل واحد.\nولكن تخيل أنك محلل بيانات تطرح السؤال التالي:\n\"ما هو متوسط رواتب جميع موظفي الشركة البالغ عددهم 50 مليون شخص؟\"\nفي التخزين الصفي، يضطر القرص الصلب لقراءة الأسماء، والأعمار، والمسميات الوظيفية، والملاحظات، فقط ليصل لرقم الراتب! 95% مما يقرؤه القرص هو هدر كامل للطاقة والوقت.\nتستخدم محركات البيانا"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Size}_{\\text{total}} = N \\sum_{c=1}^C w_c",
        "formulaNote": {
          "en": "Core invariant for Parquet Columnar Storage, Strided Encodings & Pushdown.",
          "ar": "الخاصية الرياضية الجوهرية لـ تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)."
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
          "id": "py-arrow-ipc-zero-copy",
          "starterCode": "def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:\n    \"\"\"\n    Emulates Apache Arrow dictionary encoding of categorical string columns\n    and calculates memory compression ratio.\n\n    Args:\n        column_data: List of strings.\n\n    Returns:\n        A tuple of (vocabulary_list, indices_list, compression_ratio).\n    \"\"\"\n    # TODO: Implement Arrow dictionary encoding and byte calculation\n    raise NotImplementedError(\"Implement compress_column_dictionary\")",
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
              "starterCode": "def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:\n    \"\"\"\n    Emulates Apache Arrow dictionary encoding of categorical string columns\n    and calculates memory compression ratio.\n\n    Args:\n        column_data: List of strings.\n\n    Returns:\n        A tuple of (vocabulary_list, indices_list, compression_ratio).\n    \"\"\"\n    # TODO: Implement Arrow dictionary encoding and byte calculation\n    raise NotImplementedError(\"Implement compress_column_dictionary\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:\n    if not column_data:\n        return ([], [], 1.0)\n\n    vocab_map: dict[str, int] = {}\n    vocabulary: list[str] = []\n    indices: list[int] = []\n\n    for s in column_data:\n        if s not in vocab_map:\n            idx = len(vocabulary)\n            vocab_map[s] = idx\n            vocabulary.append(s)\n        indices.append(vocab_map[s])\n\n    # Calculate raw uncompressed bytes (string length + 8 bytes pointer)\n    b_raw = sum(len(s.encode(\"utf-8\")) + 8 for s in column_data)\n\n    # Determine optimal integer index byte width based on unique count U\n    u = len(vocabulary)\n    if u <= 256:\n        index_width = 1  # uint8\n    elif u <= 65536:\n        index_width = 2  # uint16\n    else:\n        index_width = 4  # uint32\n\n    # Calculate dictionary encoded bytes (vocab bytes + index array bytes)\n    vocab_bytes = sum(len(v.encode(\"utf-8\")) for v in vocabulary)\n    index_bytes = len(column_data) * index_width\n    b_dict = vocab_bytes + index_bytes\n\n    compression_ratio = round(b_raw / b_dict, 2) if b_dict > 0 else 1.0\n\n    return (vocabulary, indices, compression_ratio)"
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
            "en": "What is the foundational invariant governing Parquet Columnar Storage, Strided Encodings & Pushdown?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)؟"
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
    "id": "polars-lazy-dataframe-dag",
    "title": "Apache Arrow Zero-Copy & Polars Lazy DAG Optimization",
    "titleAr": "ذاكرة Apache Arrow دون نسخ، وتحسين مخططات Polars الكسولة (Lazy DAGs)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "For decades, data engineering was crippled by a hidden tax: Serialization & Deserialization.\nIf you loaded data into Python, converted it to...",
      "ar": "لعقود طويلة، عانت هندسة البيانات من ضريبة خفية أحرقت مليارات الدولارات: التسلسل والتحويل الذاكري (Serialization Overhead).\nإذا قرأت بيانات ف..."
    },
    "prerequisites": [
      "arrow-ipc-zero-copy",
      "sql-ctes-recursive-queries"
    ],
    "x": 480,
    "y": 2835,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PolarsLazyExecutionGraphLab",
        "narrative": {
          "en": "For decades, data engineering was crippled by a hidden tax: Serialization & Deserialization.\nIf you loaded data into Python, converted it to Spark, sent it to C++, and visualized it in R, every single tool had its own private in-memory representation. At every boundary, the data had to be copied, serialized into bytes, piped over a network, and parsed back into memory. Over 70% of pipeline CPU cycles were wasted simply translating data formats!\n\nIn 2016, the data industry united to create Apache Arrow.\nArrow defines a single, universal, standardized In-Memory Columnar RAM Format.",
          "ar": "لعقود طويلة، عانت هندسة البيانات من ضريبة خفية أحرقت مليارات الدولارات: التسلسل والتحويل الذاكري (Serialization Overhead).\nإذا قرأت بيانات في بايثون، ثم أردت تمريرها إلى Spark أو C++ أو R، كان لكل لغة شكل ذاكري خاص بها. عند كل محطة، يضطر الحاسوب لنسخ البيانات، وتحويلها إلى بايتات خام، وإعادة تفكيكها في الذاكرة الجديدة. كان أكثر من 70% من وقت المعالج يضيع في ترجمة التنسيقات!\nفي عام 2016، توحد مجتمع البيانات العالمي لابتكار Apache Arrow.\nيمثل Arrow معياراً عالمياً موحداً لـ تنسيق الذاكرة العشوائية العمودي (In-Memory Columnar).\nولأن بايثون ورست (Rust) و C++ و DuckDB و Polars تتفق جميع"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{Q}_{\\text{eager}} = \\pi_{\\alpha} \\left( \\sigma_{\\varphi} \\big( \\text{Scan}(\\mathcal{P}) \\big) \\right)",
        "formulaNote": {
          "en": "Core invariant for Apache Arrow Zero-Copy & Polars Lazy DAG Optimization.",
          "ar": "الخاصية الرياضية الجوهرية لـ ذاكرة Apache Arrow دون نسخ، وتحسين مخططات Polars الكسولة (Lazy DAGs)."
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
          "id": "py-polars-lazy-dataframe-dag",
          "starterCode": "from typing import Any\n\ndef optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:\n    \"\"\"\n    Applies Predicate Pushdown and Projection Pushdown rewrite rules\n    to optimize a relational query execution DAG.\n\n    Args:\n        plan: Ordered list of query plan node dicts starting with SCAN.\n\n    Returns:\n        Optimized query plan node list.\n    \"\"\"\n    # TODO: Implement predicate pushdown and projection pushdown rules\n    raise NotImplementedError(\"Implement optimize_query_dag\")",
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
              "starterCode": "from typing import Any\n\ndef optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:\n    \"\"\"\n    Applies Predicate Pushdown and Projection Pushdown rewrite rules\n    to optimize a relational query execution DAG.\n\n    Args:\n        plan: Ordered list of query plan node dicts starting with SCAN.\n\n    Returns:\n        Optimized query plan node list.\n    \"\"\"\n    # TODO: Implement predicate pushdown and projection pushdown rules\n    raise NotImplementedError(\"Implement optimize_query_dag\")",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Any\n\ndef optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:\n    if not plan or plan[0].get(\"op\") != \"SCAN\":\n        return plan\n\n    scan_node = dict(plan[0])\n    filters: list[dict[str, Any]] = []\n    others: list[dict[str, Any]] = []\n    project_node: dict[str, Any] | None = None\n\n    for node in plan[1:]:\n        op = node.get(\"op\")\n        if op == \"FILTER\":\n            filters.append(dict(node))\n        elif op == \"PROJECT\":\n            project_node = dict(node)\n        else:\n            others.append(dict(node))\n\n    # Projection Pushdown: Determine minimal set of columns required from storage\n    needed_columns: set[str] = set()\n    if project_node is not None:\n        needed_columns.update(project_node.get(\"columns\", []))\n        for f in filters:\n            needed_columns.update(f.get(\"columns_used\", []))\n        for o in others:\n            if \"by\" in o:\n                needed_columns.add(o[\"by\"])\n        scan_node[\"columns\"] = sorted(needed_columns)\n\n    # Predicate Pushdown: Place all FILTER nodes directly after SCAN\n    optimized_plan: list[dict[str, Any]] = [scan_node]\n    optimized_plan.extend(filters)\n    optimized_plan.extend(others)\n    if project_node is not None:\n        optimized_plan.append(project_node)\n\n    return optimized_plan"
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
            "en": "What is the foundational invariant governing Apache Arrow Zero-Copy & Polars Lazy DAG Optimization?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم ذاكرة Apache Arrow دون نسخ، وتحسين مخططات Polars الكسولة (Lazy DAGs)؟"
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
