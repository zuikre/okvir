import type { CurriculumModule } from '../types';

export const programmingModules: CurriculumModule[] = [
  {
    "id": "name-binding-lifetime",
    "title": "Name-Binding, Environment Frames & Variable Lifetime",
    "titleAr": "ربط الأسماء، أطر البيئة، ودورة حياة المتغيرات",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "To master Python, you must dismantle the beginner myth that a variable is a 'labeled cardboard box' containing a value.",
      "ar": "لإتقان بايثون حقاً، يجب التخلص تماماً من وهم المبتدئين الشائع بأن المتغير عبارة عن 'صندوق كرتوني' يحمل اسماً ونضع في داخله القيمة."
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
          "en": "To master Python, you must dismantle the beginner myth that a variable is a 'labeled cardboard box' containing a value. In languages like C, a variable is indeed a fixed memory location where raw bytes are written. But in Python, **variables are sticky name tags**, and values are independent objects living in a vast memory neighborhood called the **Heap**.\n\nWhen you execute `x = [1, 2, 3]`, Python allocates a new list object at a distinct memory address—think of it as a house number on a street (`id(x)`). It then attaches the name tag `x` to that house's door. If you subsequently run `y = x`, Python does **not** build a second house or copy its rooms; it simply pastes a second name tag `y` onto the exact same front door! If you remodel the house using `x.append(4)`, looking inside through tag `y` reflects the new furniture `[1, 2, 3, 4]` immediately. When every tag pointing to a house is deleted (`del x`, `del y`), CPython's reference counter (`ob_refcnt`) reaches zero, and the garbage collector automatically demolishes the house to free memory.",
          "ar": "لإتقان بايثون حقاً، يجب التخلص تماماً من وهم المبتدئين الشائع بأن المتغير عبارة عن 'صندوق كرتوني' يحمل اسماً ونضع في داخله القيمة. في لغات مثل C، المتغير هو بالفعل مساحة ذاكرة محددة مسبقاً تُكتب فيها البايتات. لكن في بايثون، **المتغيرات هي بطاقات اسمية لاصقة** (Name Tags)، والقيم هي كائنات حية مستقلة تسكن في **ذاكرة الكومة** (Heap).\n\nعندما تكتب `x = [1, 2, 3]`، ينشئ بايثون كائناً جديداً في عنوان ذاكرة فريد يشبه رقم المنزل في الشارع (`id(x)`). ثم يعلق البطاقة `x` على باب ذلك المنزل. فإذا كتبت بعد ذلك `y = x`، فإن بايثون **لا يبني منزلاً جديداً ولا ينسخ محتوياته**، بل يضع ببساطة بطاقة اسمية ثانية `y` على نفس الباب تماماً! وإذا عدّلت محتويات القائمة عبر `x.append(4)`، فإن النظر من خلال البطاقة `y` سيكشف التعديل `[1, 2, 3, 4]` فوراً لأن البطاقتين تشيران إلى ذات الكائن. وحين تُنزع كافة البطاقات، يهبط عداد المراجع (`ob_refcnt`) إلى الصفر ويتم تحرير الذاكرة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\sigma: \\text{Var} \\to \\text{Loc}, \\quad \\mu: \\text{Loc} \\to \\text{PyObject}, \\quad \\text{PyObject} = \\langle \\text{ob\\_refcnt}, \\text{ob\\_type}, \\text{payload} \\rangle",
        "formulaNote": {
          "en": "CPython separates symbolic variable names from heap memory locations via environment frames and reference-counted PyObject headers.",
          "ar": "يفصل CPython بين الأسماء الرمزية وعناوين الذاكرة في الكومة عبر أطر البيئة وترويسة PyObject المحكومة بعداد المراجع."
        },
        "narrative": {
          "en": "Formally, an execution state consists of an environment mapping $\\sigma: \\text{Var} \\to \\text{Loc}$ (associating variable identifiers with memory addresses in the current frame) and a store $\\mu: \\text{Loc} \\to \\text{PyObject}$ (mapping addresses to heap structures). Every CPython object begins with a standard 16-byte header: an 8-byte reference count (`ob_refcnt`) and an 8-byte pointer to its type descriptor (`ob_type`). In-place mutation updates $\\mu(\\text{loc})$ without altering $\\sigma$, whereas variable rebinding (`x = x + [4]`) instantiates a brand new location $\\text{loc}'$ and updates $\\sigma(x) = \\text{loc}'$, decoupling it from any existing aliases.",
          "ar": "لإتقان بايثون حقاً، يجب التخلص تماماً من وهم المبتدئين الشائع بأن المتغير عبارة عن 'صندوق كرتوني' يحمل اسماً ونضع في داخله القيمة. في لغات مثل C، المتغير هو بالفعل مساحة ذاكرة محددة مسبقاً تُكتب فيها البايتات. لكن في بايثون، **المتغيرات هي بطاقات اسمية لاصقة** (Name Tags)، والقيم هي كائنات حية مستقلة تسكن في **ذاكرة الكومة** (Heap).\n\nعندما تكتب `x = [1, 2, 3]`، ينشئ بايثون كائناً جديداً في عنوان ذاكرة فريد يشبه رقم المنزل في الشارع (`id(x)`). ثم يعلق البطاقة `x` على باب ذلك المنزل. فإذا كتبت بعد ذلك `y = x`، فإن بايثون **لا يبني منزلاً جديداً ولا ينسخ محتوياته**، بل يضع ببساطة بطاقة اسمية ثانية `y` على نفس الباب تماماً! وإذا عدّلت محتويات القائمة عبر `x.append(4)`، فإن النظر من خلال البطاقة `y` سيكشف التعديل `[1, 2, 3, 4]` فوراً لأن البطاقتين تشيران إلى ذات الكائن. وحين تُنزع كافة البطاقات، يهبط عداد المراجع (`ob_refcnt`) إلى الصفر ويتم تحرير الذاكرة.\n\nرياضياً ومعمارياً، تتألف حالة التنفيذ من دالتي تعيين: البيئة $\\sigma: \\text{Var} \\to \\text{Loc}$ التي تربط أسماء المتغيرات بعناوين الذاكرة في الإطار الحالي، ومخزن الذاكرة $\\mu: \\text{Loc} \\to \\text{PyObject}$ الذي يربط العناوين بكائنات الكومة الفعلية. يبدأ كل كائن في CPython بترويسة قياسية بحجم 16 بايتاً: عداد مراجع بحجم 8 بايت ومؤشر لنوع الكائن بحجم 8 بايت. التعديل في الموضع (In-place Mutation) يغير بيانات الكائن $\\mu(\\text{loc})$ دون المساس بعنوانه، بينما إعادة الربط (Rebinding كـ `x = x + [4]`) تنشئ كائناً جديداً بالكامل بعنوان جديد $\\text{loc}'$ وتعدل $\\sigma(x) = \\text{loc}'$، مما يفصل الرابط بينه وبين الأسماء المستعارة الأخرى."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-name-binding-lifetime",
          "starterCode": "def track_rebinding_vs_mutation(items: list[int]) -> dict[str, Any]:\n    \"\"\"\n    Demonstrates the difference between in-place mutation of a shared heap object\n    and rebinding a variable name tag to a newly allocated object.\n\n    Args:\n        items: An initial list of integers.\n\n    Returns:\n        A dictionary containing:\n          - 'original_id': int memory address of the input list.\n          - 'alias_id': int memory address of a second tag bound to items.\n          - 'mutated_in_place': bool indicating whether items.append(99) preserved id.\n          - 'rebound_id': int memory address after rebinding with concatenation (+).\n          - 'is_new_object': bool indicating whether rebinding produced a new id.\n    \"\"\"\n    # 1. Capture original id\n    # 2. Create an alias pointing to the same object\n    # 3. Mutate the object in place (append 99) and check if id is preserved\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "track_rebinding_vs_mutation([1, 2])['mutated_in_place']",
              "expected": "True"
            },
            {
              "input": "track_rebinding_vs_mutation([1, 2])['is_new_object']",
              "expected": "True"
            },
            {
              "input": "track_rebinding_vs_mutation([10])['original_id'] == track_rebinding_vs_mutation([10])['alias_id']",
              "expected": "True"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "def track_rebinding_vs_mutation(items: list[int]) -> dict[str, Any]:\n    \"\"\"\n    Demonstrates the difference between in-place mutation of a shared heap object\n    and rebinding a variable name tag to a newly allocated object.\n\n    Args:\n        items: An initial list of integers.\n\n    Returns:\n        A dictionary containing:\n          - 'original_id': int memory address of the input list.\n          - 'alias_id': int memory address of a second tag bound to items.\n          - 'mutated_in_place': bool indicating whether items.append(99) preserved id.\n          - 'rebound_id': int memory address after rebinding with concatenation (+).\n          - 'is_new_object': bool indicating whether rebinding produced a new id.\n    \"\"\"\n    # 1. Capture original id\n    # 2. Create an alias pointing to the same object\n    # 3. Mutate the object in place (append 99) and check if id is preserved\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "from typing import Any\n\ndef track_rebinding_vs_mutation(items: list[int]) -> dict[str, Any]:\n    \"\"\"\n    Demonstrates the difference between in-place mutation of a shared heap object\n    and rebinding a variable name tag to a newly allocated object.\n\n    Args:\n        items: An initial list of integers.\n\n    Returns:\n        A dictionary containing:\n          - 'original_id': int memory address of the input list.\n          - 'alias_id': int memory address of a second tag bound to items.\n          - 'mutated_in_place': bool indicating whether items.append(99) preserved id.\n          - 'rebound_id': int memory address after rebinding with concatenation (+).\n          - 'is_new_object': bool indicating whether rebinding produced a new id.\n    \"\"\"\n    # 1. Capture original id\n    orig_id = id(items)\n\n    # 2. Create an alias pointing to the same object\n    alias = items\n    alias_id = id(alias)\n\n    # 3. Mutate the object in place (append 99) and check if id is preserved\n    items.append(99)\n    mutated_in_place = (id(items) == orig_id)\n\n    # 4. Rebind items using concatenation (+) with [100]\n    items = items + [100]\n    rebound_id = id(items)\n    is_new_object = (rebound_id != orig_id)\n\n    return {\n        \"original_id\": orig_id,\n        \"alias_id\": alias_id,\n        \"mutated_in_place\": mutated_in_place,\n        \"rebound_id\": rebound_id,\n        \"is_new_object\": is_new_object,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Calling `items.append()` mutates the list object in-place, keeping its memory address `id(items)` identical.",
            "ar": "استدعاء `items.append()` يعدل الكائن في مكانه، فيبقى عنوانه `id(items)` مطابقاً للأصل."
          },
          "tier2": {
            "en": "Binary concatenation `items + [100]` constructs an entirely new list object in the heap.",
            "ar": "عملية الدمج `items + [100]` تنشئ كائناً جديداً تماماً في الكومة بعنوان مختلف."
          },
          "tier3": {
            "en": "Verify that `rebound_id != orig_id` holds true to confirm `is_new_object`.",
            "ar": "تأكد من أن `rebound_id != orig_id` لتعيين `is_new_object` كـ True."
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
            "en": "Consider the following function with a default parameter: ```python def append_to_cache(item: int, cache: list = []) -> list: cache.append(item) return cache ``` What is returned when `append_to_cache(1)` is executed, followed immediately by `append_to_cache(2)`? ```python def append_to_cache(item: int, cache: list = []) -> list: cache.append(item) return cache ```",
            "ar": "تأمل الدالة التالية التي تستخدم وسيطاً افتراضياً: ما هي النتيجة المعادة عند تنفيذ `append_to_cache(1)` متبوعة مباشرة بـ `append_to_cache(2)`؟"
          },
          "options": [
            {
              "text": {
                "en": "[1, 2] — Default arguments are evaluated once when the function is defined, binding 'cache' to a single persistent heap object.",
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
                "en": "[2] — A new empty list is instantiated on the heap each time the function is called without a second argument.",
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
                "en": "A TypeError is raised because mutable objects cannot be passed as default parameters in Python.",
                "ar": "يحدث خطأ TypeError لأن الكائنات القابلة للتعديل لا يمكن تمريرها كمعاملات افتراضية في بايثون."
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
    "id": "control-flow-branching",
    "title": "Control Flow, Short-Circuit Boolean Logic & Branching Trees",
    "titleAr": "تدفق التحكم، المنطق البولياني ذو الدارة القصيرة، وشجيرات التفريع",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Normally, the CPU executes instructions sequentially like a train on a single track. Conditional branching (if/elif/else) introduces...",
      "ar": "ينفذ المعالج التعليمات كقطار على مسار مستقيم، وتعتبر جمل التفريع الشرطي (if/else) بمثابة تحويلات السكة التي توجه القطار نحو مسارات بديلة..."
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
          "en": "Normally, the CPU executes instructions sequentially like a train on a single track. Conditional branching (`if`/`elif`/`else`) introduces railroad switches that steer execution depending on whether an expression evaluates to truthy or falsy.\n\nHowever, Python's boolean operators (`and`, `or`) possess a profound mechanic: **short-circuit evaluation**. Like an electrical circuit breaker that trips before excess current flows, Python halts evaluation of compound conditions the instant the outcome is sealed. Even more remarkably: Python's `and` and `or` do **not** return boolean `True` or `False`. They return the **actual operand object** that decided the outcome! For `A or B`: if `A` is truthy, Python immediately returns `A` without ever touching `B`. For `A and B`: if `A` is falsy, Python returns `A` immediately. This allows defensive programming like `user and user.get_profile()` where `user.get_profile()` is never called if `user` is `None`.",
          "ar": "ينفذ المعالج التعليمات كقطار على مسار مستقيم، وتعتبر جمل التفريع الشرطي (`if`/`else`) بمثابة تحويلات السكة التي توجه القطار نحو مسارات بديلة بناءً على صدق التعبير أو كذبه.\n\nلكن الميزة الجوهرية لمعاملات بايثون المنطقية (`and`, `or`) هي **التقييم ذو الدارة القصيرة** (Short-Circuit Evaluation). تماماً كقاطع الكهرباء الذي يفصل فوراً لحماية المنظومة، يتوقف بايثون عن تقييم الشروط المركبة في اللحظة التي يُحسم فيها الحكم منطقياً. والأمر الأكثر إثارة: معاملات `and` و `or` في بايثون **لا تعيد قيماً منطقية مجردة** (`True`/`False`)، بل تعيد **الكائن الحقيقي** الذي حسم القرار! ففي التعبير `A or B`: إذا كان `A` صادقاً (Truthy)، يعيد بايثون `A` فوراً دون أن يفحص `B`. وفي التعبير `A and B`: إذا كان `A` زائفاً (Falsy كـ `None` أو `0`)، يعيد بايثون `A` فوراً، مما يمنع حدوث أخطاء الانهيار مثل `user and user.name`."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{E}\\llbracket e_1 \\land e_2 \\rrbracket = \\begin{cases} e_1 & \\text{if } \\text{bool}(e_1) = \\mathbf{False} \\\\ e_2 & \\text{if } \\text{bool}(e_1) = \\mathbf{True} \\end{cases}, \\quad \\mathcal{E}\\llbracket e_1 \\lor e_2 \\rrbracket = \\begin{cases} e_1 & \\text{if } \\text{bool}(e_1) = \\mathbf{True} \\\\ e_2 & \\text{if } \\text{bool}(e_1) = \\mathbf{False} \\end{cases}",
        "formulaNote": {
          "en": "Python boolean operators return the evaluated operand object itself rather than a boolean primitive, short-circuiting as soon as the outcome is deterministic.",
          "ar": "تعيد المعاملات المنطقية في بايثون الكائن المحسوب ذاته بدلاً من قيمة منطقية مجردة، مع قصر الدارة فور حسم النتيجة."
        },
        "narrative": {
          "en": "At the bytecode level, CPython implements short-circuiting via specialized jump opcodes: `JUMP_IF_FALSE_OR_POP` and `JUMP_IF_TRUE_OR_POP`. If the top-of-stack object evaluates to falsy during an `and` operation, the instruction pointer jumps past the remaining terms without evaluating them, leaving the falsy object on the evaluation stack. Because objects in Python define their truthiness via `__bool__()` or `__len__()`, values like `0`, ``, `[]`, `{}`, and `None` are falsy, while all non-empty containers and non-zero numbers are truthy.",
          "ar": "ينفذ المعالج التعليمات كقطار على مسار مستقيم، وتعتبر جمل التفريع الشرطي (`if`/`else`) بمثابة تحويلات السكة التي توجه القطار نحو مسارات بديلة بناءً على صدق التعبير أو كذبه.\n\nلكن الميزة الجوهرية لمعاملات بايثون المنطقية (`and`, `or`) هي **التقييم ذو الدارة القصيرة** (Short-Circuit Evaluation). تماماً كقاطع الكهرباء الذي يفصل فوراً لحماية المنظومة، يتوقف بايثون عن تقييم الشروط المركبة في اللحظة التي يُحسم فيها الحكم منطقياً. والأمر الأكثر إثارة: معاملات `and` و `or` في بايثون **لا تعيد قيماً منطقية مجردة** (`True`/`False`)، بل تعيد **الكائن الحقيقي** الذي حسم القرار! ففي التعبير `A or B`: إذا كان `A` صادقاً (Truthy)، يعيد بايثون `A` فوراً دون أن يفحص `B`. وفي التعبير `A and B`: إذا كان `A` زائفاً (Falsy كـ `None` أو `0`)، يعيد بايثون `A` فوراً، مما يمنع حدوث أخطاء الانهيار مثل `user and user.name`.\n\nعلى مستوى شفرة البايت (Bytecode)، ينفذ CPython قصر الدارة عبر أوامر القفز المتخصصة: `JUMP_IF_FALSE_OR_POP` و `JUMP_IF_TRUE_OR_POP`. إذا كان الكائن في قمة المكدس زائفاً أثناء عملية `and`، يقفز مؤشر التعليمات متجاوزاً بقية الحدود دون حسابها، تاركاً الكائن الزائف على مكدس التقييم. ولأن الكائنات تحدد صدقها عبر الدوال الخاصة `__bool__()` أو `__len__()`، فإن القيم مثل `0` و `` و `[]` و `{}` و `None` تعتبر زائفة، في حين تعتبر كافة الحاويات غير الفارغة والأرقام غير الصفرية صادقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-control-flow-branching",
          "starterCode": "def resolve_config_setting(\n    user_override: dict | None,\n    env_config: dict | None,\n    defaults: dict,\n    key: str,\n) -> Any:\n    \"\"\"\n    Resolves a configuration value across hierarchical layers with short-circuiting,\n    correctly preserving legitimate falsy values (0, False, \"\") without overriding them.\n\n    Hierarchy order:\n      1. user_override (if provided and key exists)\n      2. env_config (if provided and key exists)\n      3. defaults (fallback value from defaults dictionary)\n\n    Args:\n        user_override: Optional dict of user settings.\n        env_config: Optional dict of environment settings.\n        defaults: Default fallback settings dictionary.\n        key: The configuration key to resolve.\n\n    Returns:\n        The resolved value or None if key is absent from all dictionaries.\n    \"\"\"\n    # Step 1: Check user_override safely without crashing if user_override is None\n    # Step 2: Check env_config safely\n    # Step 3: Fall back to defaults dictionary\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "resolve_config_setting({'timeout': 0}, {'timeout': 30}, {'timeout': 60}, 'timeout')",
              "expected": "0"
            },
            {
              "input": "resolve_config_setting(None, {'debug': False}, {'debug': True}, 'debug')",
              "expected": "False"
            },
            {
              "input": "resolve_config_setting(None, None, {'retries': 3}, 'retries')",
              "expected": "3"
            }
          ],
          "expectedOutput": "0",
          "variants": {
            "python": {
              "starterCode": "def resolve_config_setting(\n    user_override: dict | None,\n    env_config: dict | None,\n    defaults: dict,\n    key: str,\n) -> Any:\n    \"\"\"\n    Resolves a configuration value across hierarchical layers with short-circuiting,\n    correctly preserving legitimate falsy values (0, False, \"\") without overriding them.\n\n    Hierarchy order:\n      1. user_override (if provided and key exists)\n      2. env_config (if provided and key exists)\n      3. defaults (fallback value from defaults dictionary)\n\n    Args:\n        user_override: Optional dict of user settings.\n        env_config: Optional dict of environment settings.\n        defaults: Default fallback settings dictionary.\n        key: The configuration key to resolve.\n\n    Returns:\n        The resolved value or None if key is absent from all dictionaries.\n    \"\"\"\n    # Step 1: Check user_override safely without crashing if user_override is None\n    # Step 2: Check env_config safely\n    # Step 3: Fall back to defaults dictionary\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0"
            }
          },
          "solution": "from typing import Any\n\ndef resolve_config_setting(\n    user_override: dict | None,\n    env_config: dict | None,\n    defaults: dict,\n    key: str,\n) -> Any:\n    \"\"\"\n    Resolves a configuration value across hierarchical layers with short-circuiting,\n    correctly preserving legitimate falsy values (0, False, \"\") without overriding them.\n\n    Hierarchy order:\n      1. user_override (if provided and key exists)\n      2. env_config (if provided and key exists)\n      3. defaults (fallback value from defaults dictionary)\n\n    Args:\n        user_override: Optional dict of user settings.\n        env_config: Optional dict of environment settings.\n        defaults: Default fallback settings dictionary.\n        key: The configuration key to resolve.\n\n    Returns:\n        The resolved value or None if key is absent from all dictionaries.\n    \"\"\"\n    # Step 1: Check user_override safely without crashing if user_override is None\n    if user_override is not None and key in user_override:\n        return user_override[key]\n\n    # Step 2: Check env_config safely\n    if env_config is not None and key in env_config:\n        return env_config[key]\n\n    # Step 3: Fall back to defaults dictionary\n    return defaults.get(key, None)"
        },
        "hints": {
          "tier1": {
            "en": "Do not write `user_override.get(key) or defaults.get(key)` because this overrides `0` and `False` with defaults!",
            "ar": "لا تستخدم `get(key) or defaults.get(key)` لأن ذلك سيتجاهل القيم الصريحة كـ `0` و `False` ويستبدلها بالافتراضية!"
          },
          "tier2": {
            "en": "Use explicit membership testing (`key in user_override`) guarded by `user_override is not None`.",
            "ar": "استخدم فحص الانتماء الصريح (`key in user_override`) محصناً بشرط `user_override is not None`."
          },
          "tier3": {
            "en": "Return `user_override[key]` immediately once found to short-circuit lower priority layers.",
            "ar": "أعد `user_override[key]` فور العثور عليه لتخطي الطبقات الأقل أولوية."
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
            "en": "A developer writes: ```python max_workers = user_input or default_workers ``` If `user_input = 0` (intended to mean single-threaded / non-concurrent execution) and `default_workers = 8`, what is `max_workers`, and why? ```python max_workers = user_input or default_workers ```",
            "ar": "كتب مطور برمجيات الكود التالي: إذا كانت قيمة `user_input = 0` (وكان القصد تنفيذ المهمة بخيط واحد / دون تزامن) و `default_workers = 8`، فما قيمة `max_workers` ولماذا؟"
          },
          "options": [
            {
              "text": {
                "en": "8 — Because `bool(0)` is False, Python's `or` short-circuits to the right-hand operand, clobbering the intentional 0 value.",
                "ar": "8 — لأن `bool(0)` تعطي False، فينتقل المعامل `or` إلى الطرف الأيمن متجاهلاً القيمة 0 المقصودة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "0 — The `or` operator only checks if the variable on the left exists, returning 0 because it is defined.",
                "ar": "0 — المعامل `or` يفحص فقط ما إذا كان المتغير معرفاً، ويعيد 0 لأنه موجود."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "A TypeError is raised because integer arithmetic cannot be blended with boolean `or` operators.",
                "ar": "يحدث خطأ TypeError لأن العمليات الحسابية لا تمتزج مع المعاملات المنطقية."
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
    "id": "iteration-state-accumulation",
    "title": "Iteration Protocols, Loop Invariants & State Accumulators",
    "titleAr": "بروتوكول التكرار الحلقي، اللامتغيرات، وتراكم الحالة",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When you write for item in collection:, beginners assume Python is running a C-style counter loop (i = 0; i < len; i++).",
      "ar": "عندما تكتب for item in collection:، يظن المبتدئ أن بايثون يعد المؤشرات مثل حلقة C التقليدية (i = 0; i < len; i++)."
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
          "en": "When you write `for item in collection:`, beginners assume Python is running a C-style counter loop (`i = 0; i < len; i++`). Under the hood, Python does something far more elegant: the **Iterator Protocol**.\n\nThink of the iterable collection as a **vending machine warehouse**. Calling `iter(collection)` creates a **conveyor belt clerk** (an iterator object). Each turn of the loop presses the dispensing button `next(iterator)`. The clerk hands you the next item and steps forward. Crucially, the clerk possesses internal state and only moves in one direction. When the warehouse is depleted, the clerk raises a `StopIteration` exception. The `for` loop catches this exception behind the scenes and exits gracefully without crashing! Any object that implements `__iter__()` and `__next__()` can participate in this protocol.",
          "ar": "عندما تكتب `for item in collection:`، يظن المبتدئ أن بايثون يعد المؤشرات مثل حلقة C التقليدية (`i = 0; i < len; i++`). لكن ما يحدث فعلياً أعمق وأجمل بكثير: **بروتوكول التكرار** (Iterator Protocol).\n\nتخيل الكائن القابل للتكرار كـ **مستودع آلة بيع ذاتية**. استدعاء `iter(collection)` ينشئ **موظف شريط ناقل** (كائن مكرر Iterator). في كل دورة حلقة، نضغط زر الصرف `next(iterator)`، فيسلمنا الموظف العنصر التالي ويخطو خطوة للأمام. يحتفظ الموظف بحالته الداخلية ولا يتحرك إلا للأمام. وعند نفاد البضاعة، يرفع الموظف استثناء `StopIteration`. تلتقط حلقة `for` هذا الاستثناء تلقائياً وتنهي التكرار بسلاسة دون انهيار! أي كائن ينفذ `__iter__()` و `__next__()` ينضم تلقائياً لهذه المنظومة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Iterable} \\xrightarrow{\\text{iter()}} \\text{Iterator} \\xrightarrow{\\text{next()}} (x_k, s_{k+1}) \\quad \\text{until } \\text{StopIteration}, \\quad \\text{acc}_k = \\bigoplus_{i=1}^k x_i",
        "formulaNote": {
          "en": "Iteration in Python is governed by the two-phase iterator protocol (iter() and next()), advancing a stateful stream until StopIteration.",
          "ar": "يخضع التكرار في بايثون لبروتوكول ثنائي الطور (iter و next)، يقدّم مجرى ذا حالة حتى إطلاق استثناء StopIteration."
        },
        "narrative": {
          "en": "Mathematically, a state accumulator loop maintains a **loop invariant** $\\mathcal{I}(k)$ across iterations. If the invariant holds before step $k$, and the transition $\\text{acc}_{k} = \\text{acc}_{k-1} \\oplus x_k$ preserves it, then by mathematical induction $\\mathcal{I}(N)$ holds upon termination. At the bytecode layer, CPython issues `GET_ITER` to push the iterator onto the stack, followed by `FOR_ITER <jump_target>`, which invokes the iterator's tp_iternext slot directly in C speed, jumping past the loop body upon `StopIteration`.",
          "ar": "عندما تكتب `for item in collection:`، يظن المبتدئ أن بايثون يعد المؤشرات مثل حلقة C التقليدية (`i = 0; i < len; i++`). لكن ما يحدث فعلياً أعمق وأجمل بكثير: **بروتوكول التكرار** (Iterator Protocol).\n\nتخيل الكائن القابل للتكرار كـ **مستودع آلة بيع ذاتية**. استدعاء `iter(collection)` ينشئ **موظف شريط ناقل** (كائن مكرر Iterator). في كل دورة حلقة، نضغط زر الصرف `next(iterator)`، فيسلمنا الموظف العنصر التالي ويخطو خطوة للأمام. يحتفظ الموظف بحالته الداخلية ولا يتحرك إلا للأمام. وعند نفاد البضاعة، يرفع الموظف استثناء `StopIteration`. تلتقط حلقة `for` هذا الاستثناء تلقائياً وتنهي التكرار بسلاسة دون انهيار! أي كائن ينفذ `__iter__()` و `__next__()` ينضم تلقائياً لهذه المنظومة.\n\nرياضياً، يحافظ تراكم الحالة الحلقي على **لا متغيرة حلقية** (Loop Invariant) $\\mathcal{I}(k)$ عبر الدورات. إذا صحت اللامتغيرة قبل الخطوة $k$ وحافظ الانتقال $\\text{acc}_{k} = \\text{acc}_{k-1} \\oplus x_k$ عليها، فإنها تصح بالاستقراء الرياضي عند انتهاء الحلقة. وعلى مستوى شفرة البايت، يصدر CPython الأمر `GET_ITER` لدفع المكرر إلى المكدس، يليه `FOR_ITER` الذي يستدعي فتحة tp_iternext بسرعة لغة C، ويقفز متجاوزاً جسم الحلقة فور إطلاق `StopIteration`."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-iteration-state-accumulation",
          "starterCode": "def manual_reduce(\n    iterable: Any,\n    reducer_fn: Callable[[Any, Any], Any],\n    initial: Any = None,\n) -> Any:\n    \"\"\"\n    Implements functools.reduce from scratch using the fundamental\n    two-phase Iterator Protocol (iter() and next()) without for-loops.\n\n    Args:\n        iterable: Any Python iterable object.\n        reducer_fn: Binary function taking (accumulator, current_item) -> new_accumulator.\n        initial: Optional initial accumulator value.\n\n    Returns:\n        The final accumulated value.\n    \"\"\"\n    # Step 1: Obtain the iterator object from the iterable\n    # Step 2: Determine initial accumulator value\n    # Step 3: Consume the iterator element by element until StopIteration\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "manual_reduce([1, 2, 3, 4], lambda a, b: a + b)",
              "expected": "10"
            },
            {
              "input": "manual_reduce(['a', 'b', 'c'], lambda a, b: a + '-' + b)",
              "expected": "a-b-c"
            },
            {
              "input": "manual_reduce([], lambda a, b: a + b, 100)",
              "expected": "100"
            }
          ],
          "expectedOutput": "10",
          "variants": {
            "python": {
              "starterCode": "def manual_reduce(\n    iterable: Any,\n    reducer_fn: Callable[[Any, Any], Any],\n    initial: Any = None,\n) -> Any:\n    \"\"\"\n    Implements functools.reduce from scratch using the fundamental\n    two-phase Iterator Protocol (iter() and next()) without for-loops.\n\n    Args:\n        iterable: Any Python iterable object.\n        reducer_fn: Binary function taking (accumulator, current_item) -> new_accumulator.\n        initial: Optional initial accumulator value.\n\n    Returns:\n        The final accumulated value.\n    \"\"\"\n    # Step 1: Obtain the iterator object from the iterable\n    # Step 2: Determine initial accumulator value\n    # Step 3: Consume the iterator element by element until StopIteration\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "10"
            }
          },
          "solution": "from typing import Any, Callable\n\ndef manual_reduce(\n    iterable: Any,\n    reducer_fn: Callable[[Any, Any], Any],\n    initial: Any = None,\n) -> Any:\n    \"\"\"\n    Implements functools.reduce from scratch using the fundamental\n    two-phase Iterator Protocol (iter() and next()) without for-loops.\n\n    Args:\n        iterable: Any Python iterable object.\n        reducer_fn: Binary function taking (accumulator, current_item) -> new_accumulator.\n        initial: Optional initial accumulator value.\n\n    Returns:\n        The final accumulated value.\n    \"\"\"\n    # Step 1: Obtain the iterator object from the iterable\n    it = iter(iterable)\n\n    # Step 2: Determine initial accumulator value\n    if initial is not None:\n        accumulator = initial\n    else:\n        try:\n            accumulator = next(it)\n        except StopIteration:\n            raise TypeError(\"manual_reduce() of empty iterable with no initial value\")\n\n    # Step 3: Consume the iterator element by element until StopIteration\n    while True:\n        try:\n            item = next(it)\n            accumulator = reducer_fn(accumulator, item)\n        except StopIteration:\n            break\n\n    return accumulator"
        },
        "hints": {
          "tier1": {
            "en": "Call `it = iter(iterable)` to obtain the iterator before consuming items.",
            "ar": "استدعِ `it = iter(iterable)` للحصول على كائن المكرر قبل البدء بسحب العناصر."
          },
          "tier2": {
            "en": "If `initial` is not supplied, use `next(it)` to prime the accumulator with the very first item.",
            "ar": "إذا لم يُمرر `initial`، استدعِ `next(it)` لتهيئة المجمع بأول عنصر في المجرى."
          },
          "tier3": {
            "en": "Catch `StopIteration` inside a `while True:` loop to detect natural exhaustion of the stream.",
            "ar": "التقط `StopIteration` داخل حلقة `while True:` لمعرفة لحظة استنفاد المجرى."
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
            "en": "You have a generator expression `g = (x  2 for x in [1, 2, 3])`. You execute: ```python first_sum = sum(g) second_sum = sum(g) ``` What is `second_sum`, and why? ```python first_sum = sum(g) second_sum = sum(g) ```",
            "ar": "لديك تعبير توليد `g = (x  2 for x in [1, 2, 3])`. قمت بتنفيذ: ما هي قيمة `second_sum` الناتجة، ولماذا؟"
          },
          "options": [
            {
              "text": {
                "en": "0 — The generator `g` is an iterator that was exhausted during `first_sum`; iterating it again immediately raises StopIteration.",
                "ar": "0 — المولد `g` هو مكرر ذو مسار أحادي تم استنفاده بالكامل في `first_sum`، وإعادة تكراره تطلق `StopIteration` فوراً."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "14 — The generator re-evaluates its comprehension on every call to `sum()`.",
                "ar": "14 — يعيد المولد تقييم عناصره من البداية عند كل استدعاء لدالة `sum()`."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "A RuntimeError is raised because exhausted generators cannot be passed to built-in functions.",
                "ar": "يحدث خطأ RuntimeError لأن المولد المستنفد لا يجوز تمريره للدوال المدمجة."
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
    "id": "pure-functions-recursion",
    "title": "Pure Functions, Referential Transparency & Stack Frames",
    "titleAr": "الدوال النقية، الشفافية الإسنادية، وأطر مكدس الاستدعاء",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "The CPU's call stack is like a stack of cafeteria trays. Each time your program calls a function, a brand new tray (a Stack Frame) is...",
      "ar": "مكدس الاستدعاء (Call Stack) يشبه كومة من صواني المطعم الجامعي. في كل مرة يستدعي فيها البرنامج دالة، يتم وضع صينية جديدة (إطار مكدس Stack..."
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
          "en": "The CPU's call stack is like a **stack of cafeteria trays**. Each time your program calls a function, a brand new tray (a Stack Frame) is stamped with local variables and dropped onto the top of the stack (`push`). The CPU works exclusively on whatever tray is currently at the very top. When the function finishes and returns, that tray is removed and recycled (`pop`), exposing the caller's tray underneath.\n\nIn recursion, a function calls itself, stacking tray upon tray upon tray. If you omit a base case (the bottom tray), the stack grows until it hits the memory ceiling, throwing `RecursionError: maximum recursion depth exceeded`! A **pure function** is like a mathematical vending machine: insert the exact same coins, get the exact same drink every time. It modifies no global state and mutates no inputs (Referential Transparency). Any pure function call `f(x)` can be safely replaced by its computed value without altering program behavior.",
          "ar": "مكدس الاستدعاء (Call Stack) يشبه **كومة من صواني المطعم الجامعي**. في كل مرة يستدعي فيها البرنامج دالة، يتم وضع صينية جديدة (إطار مكدس Stack Frame) في أعلى الكومة تحوي المتغيرات المحلية. يعمل المعالج حصرياً على الصينية الموجودة في القمة. وعندما تنتهي الدالة وتُرجع قيمتها، تُرفع الصينية وتُحذف (`pop`) لتعود الصينية السابقة للظهور.\n\nفي الاستدعاء الذاتي (Recursion)، تكدس الدالة صينية فوق صينية؛ فإن نسيت شرط التوقف (Base Case)، ارتفعت الكومة حتى تصطدم بسقف الذاكرة (`RecursionError`). الدالة النقية (Pure Function) كآلة بيع رياضية: المدخل ذاته ينتج دائماً المخرج ذاته دون إحداث أي أثر جانبي خفي (الشفافية الإسنادية Referential Transparency). يمكن استبدال استدعاء الدالة النقية `f(x)` بنتيجتها المحسوبة دون أي تغيير في سلوك البرنامج."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f: \\mathcal{X} \\to \\mathcal{Y} \\text{ pure} \\iff \\forall x \\in \\mathcal{X}, f(x) = y \\land \\Delta \\Sigma_{\\text{heap}} = \\emptyset, \\quad d(n) \\le \\text{sys.getrecursionlimit}()",
        "formulaNote": {
          "en": "Pure functions satisfy referential transparency without mutating external memory, while recursion allocates a fresh stack frame per invocation.",
          "ar": "تحقق الدوال النقية الشفافية الإسنادية دون تعديل الذاكرة الخارجية، بينما يخصص الاستدعاء الذاتي إطار مكدس جديد لكل استدعاء."
        },
        "narrative": {
          "en": "Unlike compilers for functional languages like Haskell or Scheme, CPython does **not** perform Tail Call Optimization (TCO). In CPython, every recursive call unconditionally allocates a full `PyFrameObject` structure (typically consuming hundreds of bytes) on the C call stack. Python's default recursion guard (`sys.getrecursionlimit()`) is set to 1000 frames to prevent stack overflow crashes in the host C runtime. Designing recursive algorithms therefore requires establishing an inductive base case $P(0)$ and ensuring the recurrence terminates within the stack ceiling.",
          "ar": "مكدس الاستدعاء (Call Stack) يشبه **كومة من صواني المطعم الجامعي**. في كل مرة يستدعي فيها البرنامج دالة، يتم وضع صينية جديدة (إطار مكدس Stack Frame) في أعلى الكومة تحوي المتغيرات المحلية. يعمل المعالج حصرياً على الصينية الموجودة في القمة. وعندما تنتهي الدالة وتُرجع قيمتها، تُرفع الصينية وتُحذف (`pop`) لتعود الصينية السابقة للظهور.\n\nفي الاستدعاء الذاتي (Recursion)، تكدس الدالة صينية فوق صينية؛ فإن نسيت شرط التوقف (Base Case)، ارتفعت الكومة حتى تصطدم بسقف الذاكرة (`RecursionError`). الدالة النقية (Pure Function) كآلة بيع رياضية: المدخل ذاته ينتج دائماً المخرج ذاته دون إحداث أي أثر جانبي خفي (الشفافية الإسنادية Referential Transparency). يمكن استبدال استدعاء الدالة النقية `f(x)` بنتيجتها المحسوبة دون أي تغيير في سلوك البرنامج.\n\nعلى خلاف مفسرات اللغات الوظيفية مثل Haskell و Scheme، فإن مفسر CPython **لا ينفذ** استمثال النداء الذيلي (Tail Call Optimization - TCO). يخصص كل استدعاء ذاتي في CPython هيكل `PyFrameObject` كاملاً على مكدس لغة C للمضيف. يضبط بايثون حداً أقصى افتراضياً (`sys.getrecursionlimit()`) يبلغ 1000 إطار لحماية الذاكرة من الانهيار (Stack Overflow). لذا يتطلب تصميم الخوارزميات الذاتية تأسيس شرط توقف استقرائي $P(0)$ يضمن اكتمال التنفيذ قبل ملامسة السقف."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-pure-functions-recursion",
          "starterCode": "def pure_flatten(nested: list[Any]) -> list[Any]:\n    \"\"\"\n    Recursively flattens an arbitrarily nested list structure into a flat list\n    in a strictly pure manner without mutating the input list.\n\n    Args:\n        nested: A list containing values or arbitrarily nested sublists.\n\n    Returns:\n        A brand new flattened list containing all leaf values in left-to-right order.\n    \"\"\"\n    # Recursively flatten sublist and combine results purely\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "pure_flatten([1, [2, [3, 4], 5], 6])",
              "expected": "[1, 2, 3, 4, 5, 6]"
            },
            {
              "input": "pure_flatten([])",
              "expected": "[]"
            },
            {
              "input": "pure_flatten([[[42]]])",
              "expected": "[42]"
            }
          ],
          "expectedOutput": "[1, 2, 3, 4, 5, 6]",
          "variants": {
            "python": {
              "starterCode": "def pure_flatten(nested: list[Any]) -> list[Any]:\n    \"\"\"\n    Recursively flattens an arbitrarily nested list structure into a flat list\n    in a strictly pure manner without mutating the input list.\n\n    Args:\n        nested: A list containing values or arbitrarily nested sublists.\n\n    Returns:\n        A brand new flattened list containing all leaf values in left-to-right order.\n    \"\"\"\n    # Recursively flatten sublist and combine results purely\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[1, 2, 3, 4, 5, 6]"
            }
          },
          "solution": "from typing import Any\n\ndef pure_flatten(nested: list[Any]) -> list[Any]:\n    \"\"\"\n    Recursively flattens an arbitrarily nested list structure into a flat list\n    in a strictly pure manner without mutating the input list.\n\n    Args:\n        nested: A list containing values or arbitrarily nested sublists.\n\n    Returns:\n        A brand new flattened list containing all leaf values in left-to-right order.\n    \"\"\"\n    result: list[Any] = []\n\n    for item in nested:\n        if isinstance(item, list):\n            # Recursively flatten sublist and combine results purely\n            result.extend(pure_flatten(item))\n        else:\n            result.append(item)\n\n    return result"
        },
        "hints": {
          "tier1": {
            "en": "Check if an element is a list using `isinstance(item, list)`.",
            "ar": "تحقق مما إذا كان العنصر قائمة باستخدام `isinstance(item, list)`."
          },
          "tier2": {
            "en": "For leaf elements, append directly; for sublists, call `pure_flatten(item)` and extend.",
            "ar": "للعناصر الفردية أضفها مباشرة، وللقوائم الفرعية استدعِ `pure_flatten(item)` واستخدم `extend`."
          },
          "tier3": {
            "en": "Always build and return a fresh new list so the original inputs remain completely untouched.",
            "ar": "ابنِ قائمة جديدة دائماً لضمان بقاء المدخلات الأصلية نقية وغير ملموسة."
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
            "en": "Why did Python's creator (Guido van Rossum) intentionally choose NOT to implement Tail Call Optimization (TCO) in Python?",
            "ar": "لماذا اختار مصمم بايثون (خيدو فان روسم) عمداً عدم تضمين استمثال النداء الذيلي (TCO) في بايثون؟"
          },
          "options": [
            {
              "text": {
                "en": "To preserve full, unaltered stack traces for debugging and programmatic introspection via tools like sys._getframe().",
                "ar": "للحفاظ على مسارات تتبع الأخطاء (Stack Traces) كاملة لأغراض تصحيح الأخطاء وفحص المكدس برمجياً."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because Python's dynamic typing makes recursion mathematically impossible to optimize.",
                "ar": "لأن الطبيعة الديناميكية لبايثون تجعل الاستمثال الرياضي للاستدعاء مستحيلاً."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because CPython runs on an interpreted bytecode VM that does not utilize hardware call stacks.",
                "ar": "لأن مفسر بايثون لا يستخدم مكدس العتاد الفعلي للحاسوب."
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
    "id": "first-class-closures",
    "title": "First-Class Functions & Lexical Closures",
    "titleAr": "دوال الرتبة الأولى والأغلفة المعجمية (Closures)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In Python, functions are not rigid second-class subroutines; they are first-class objects just like integers, strings, or lists.",
      "ar": "في بايثون، الدوال ليست مجرد إجراءات ثانوية جامدة، بل هي كائنات من الرتبة الأولى (First-Class Objects) شأنها شأن الأرقام والنصوص."
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
          "en": "In Python, functions are not rigid second-class subroutines; they are **first-class objects** just like integers, strings, or lists. You can store a function in a variable, pass it as an argument, return it from another function, or store it inside a dictionary.\n\nA **Closure** is a first-class function equipped with a **traveling backpack**: when an inner function references a variable defined in its enclosing outer function and is returned, it packs that variable into special `cell` objects attached to `__closure__`. Even after the outer function finishes executing and its stack frame is destroyed and cleaned from memory, the inner function carries its backpack wherever it travels, remembering its birthplace!",
          "ar": "في بايثون، الدوال ليست مجرد إجراءات ثانوية جامدة، بل هي **كائنات من الرتبة الأولى** (First-Class Objects) شأنها شأن الأرقام والنصوص. يمكنك تخزين الدالة في متغير، أو تمريرها كوسيط، أو إعادتها كقيمة من دالة أخرى، أو حفظها في قاموس.\n\nأما **الغلاف المعجمي (Closure)** فهو دالة ترتدي **حقيبة ظهر سحرية**: عندما تشير دالة داخلية إلى متغير معرّف في نطاق خارجي وتُعاد كقيمة، فإنها تحزم ذلك المتغير في خلايا خاصة ملحقة بالخاصية `__closure__`. وحتى بعد أن تنتهي الدالة الخارجية تماماً ويتحلل إطارها من مكدس الذاكرة، تظل الدالة الداخلية تحمل حقيبة ظهرها معها أينما ذهبت متذكرةً القيم التي نشأت في كنفها!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Closure} = \\langle \\text{CodeObject}, (\\text{cell}_1, \\dots, \\text{cell}_k) \\rangle, \\quad \\text{cell.cell\\_contents} = v \\in \\mathcal{E}_{\\text{outer}}",
        "formulaNote": {
          "en": "A closure binds executable bytecode with cell objects referencing lexical variables in an enclosing scope that has already terminated.",
          "ar": "يربط الغلاف المعجمي شفرة البايت بخلايا ذاكرية تشير إلى متغيرات معجمية في نطاق خارجي انتهى تنفيذه بالفعل."
        },
        "narrative": {
          "en": "Formally, a closure is a pair consisting of a compiled code object and an environment mapping free variables: $\\text{FreeVars}(\\text{code}) = \\text{Names}(\\text{code}) \\setminus \\text{Locals}(\\text{code})$. CPython implements this by allocating a `PyCellObject` in the heap. Both the enclosing scope and the inner function hold pointers to this cell. If the inner function mutates the value, the cell's `cell_contents` pointer is updated. This enables stateful factories, memoization decorators, and encapsulation without classes.",
          "ar": "في بايثون، الدوال ليست مجرد إجراءات ثانوية جامدة، بل هي **كائنات من الرتبة الأولى** (First-Class Objects) شأنها شأن الأرقام والنصوص. يمكنك تخزين الدالة في متغير، أو تمريرها كوسيط، أو إعادتها كقيمة من دالة أخرى، أو حفظها في قاموس.\n\nأما **الغلاف المعجمي (Closure)** فهو دالة ترتدي **حقيبة ظهر سحرية**: عندما تشير دالة داخلية إلى متغير معرّف في نطاق خارجي وتُعاد كقيمة، فإنها تحزم ذلك المتغير في خلايا خاصة ملحقة بالخاصية `__closure__`. وحتى بعد أن تنتهي الدالة الخارجية تماماً ويتحلل إطارها من مكدس الذاكرة، تظل الدالة الداخلية تحمل حقيبة ظهرها معها أينما ذهبت متذكرةً القيم التي نشأت في كنفها!\n\nمعمارياً، الغلاف المعجمي هو زوج يتكون من كائن كود مترجم وتخطيط بيئة للمتغيرات الحرة: $\\text{FreeVars}(\\text{code}) = \\text{Names}(\\text{code}) \\setminus \\text{Locals}(\\text{code})$. ينفذ CPython ذلك عبر حجز كائن خلية `PyCellObject` في الكومة. يحتفظ النطاق الخارجي والدالة الداخلية بمؤشرات تشير لذات الخلية. وإذا عُدلت القيمة، يُحدث المؤشر `cell_contents`. هذا المفهوم هو الأساس لمصانع الدوال، والمزخرفات (Decorators)، وتغليف البيانات دون فئات."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-first-class-closures",
          "starterCode": "def make_rate_limiter(max_calls: int) -> Callable[[], bool]:\n    \"\"\"\n    Constructs a closure-based stateful rate limiter that allows up to\n    `max_calls` invocations, returning True while allowed and False thereafter.\n\n    Args:\n        max_calls: Maximum allowable invocations.\n\n    Returns:\n        A parameterless function returning True if within rate limit, False otherwise.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
          "testCases": [
            {
              "input": "(lambda l: [l(), l(), l()])(make_rate_limiter(2))",
              "expected": "[True, True, False]"
            },
            {
              "input": "(lambda l: [l(), l(), l()])(make_rate_limiter(1))",
              "expected": "[True, False, False]"
            },
            {
              "input": "make_rate_limiter(0)()",
              "expected": "False"
            }
          ],
          "expectedOutput": "[True, True, False]",
          "variants": {
            "python": {
              "starterCode": "def make_rate_limiter(max_calls: int) -> Callable[[], bool]:\n    \"\"\"\n    Constructs a closure-based stateful rate limiter that allows up to\n    `max_calls` invocations, returning True while allowed and False thereafter.\n\n    Args:\n        max_calls: Maximum allowable invocations.\n\n    Returns:\n        A parameterless function returning True if within rate limit, False otherwise.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "[True, True, False]"
            }
          },
          "solution": "from typing import Callable\n\ndef make_rate_limiter(max_calls: int) -> Callable[[], bool]:\n    \"\"\"\n    Constructs a closure-based stateful rate limiter that allows up to\n    `max_calls` invocations, returning True while allowed and False thereafter.\n\n    Args:\n        max_calls: Maximum allowable invocations.\n\n    Returns:\n        A parameterless function returning True if within rate limit, False otherwise.\n    \"\"\"\n    calls_made = 0\n\n    def rate_limiter() -> bool:\n        nonlocal calls_made\n        if calls_made < max_calls:\n            calls_made += 1\n            return True\n        return False\n\n    return rate_limiter"
        },
        "hints": {
          "tier1": {
            "en": "Use the `nonlocal` keyword inside `rate_limiter` so you can rebind `calls_made` in the enclosing scope.",
            "ar": "استخدم الكلمة المفتاحية `nonlocal` داخل الدالة الداخلية لتعديل المتغير `calls_made` في النطاق الخارجي."
          },
          "tier2": {
            "en": "Check `calls_made < max_calls` before incrementing and returning `True`.",
            "ar": "تحقق من الشرط `calls_made < max_calls` قبل زيادة العداد وإرجاع `True`."
          },
          "tier3": {
            "en": "Each call to `make_rate_limiter` produces a distinct closure with an isolated `calls_made` cell.",
            "ar": "كل استدعاء للدالة الأم ينتج غلافاً مستقلاً تماماً يمتلك خلية عداد خاصة به."
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
            "en": "Consider this classic closure loop snippet: ```python multipliers = [lambda x: x  i for i in range(3)] results = [m(10) for m in multipliers] ``` What is `results`, and what is the underlying mechanic? ```python multipliers = [lambda x: x  i for i in range(3)] results = [m(10) for m in multipliers] ```",
            "ar": "تأمل الكود الكلاسيكي التالي للأغلفة داخل الحلقات: ما هي قيمة `results` الناتجة، وما التفسير المعماري لذلك؟"
          },
          "options": [
            {
              "text": {
                "en": "[20, 20, 20] — Python closures bind variables by reference (late-binding); all lambdas share the same variable 'i', which equals 2 when the loop terminates.",
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
                "en": "[0, 10, 20] — Each lambda captures an immutable snapshot of 'i' at its respective loop iteration.",
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
                "en": "[0, 0, 0] — The variable 'i' goes out of scope after the list comprehension and resets to 0.",
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
    "id": "scope-resolution-legb",
    "title": "Scope Resolution & The LEGB Rule",
    "titleAr": "استبانة النطاق وقاعدة LEGB (Local, Enclosing, Global, Built-in)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "When Python encounters a variable name like total, how does it determine which object it points to? It searches outward through concentric...",
      "ar": "عندما يصادف بايثون اسماً برمجياً مثل total، كيف يحدد الكائن المعني؟ يبحث المعالج عبر دوائر متحدة المركز تحكمها قاعدة LEGB: 1."
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
          "en": "When Python encounters a variable name like `total`, how does it determine which object it points to? It searches outward through concentric circles of vision governed by the **LEGB Rule**:\n\n1. **L**ocal: Inside the currently executing function's room.\n2. **E**nclosing: In any nesting function's apartment (from innermost to outermost).\n3. **G**lobal: In the current module file's whole building.\n4. **B**uilt-in: In the city library of standard Python functions (`len`, `range`, `print`).\n\nThe most infamous pitfall in Python is that **locality is determined at compile time**! If a function contains an assignment (`x = ...`) anywhere inside its body, Python marks `x` as Local across the *entire* function. If you try to read `x` before that assignment, Python does not fall back to outer scopes—it raises `UnboundLocalError`!",
          "ar": "عندما يصادف بايثون اسماً برمجياً مثل `total`، كيف يحدد الكائن المعني؟ يبحث المعالج عبر دوائر متحدة المركز تحكمها **قاعدة LEGB**:\n\n1. **L**ocal (المحلي): داخل غرفة الدالة الحالية التي يجري تنفيذها.\n2. **E**nclosing (المحيط): داخل شقة الدوال الحاضنة (من الأقرب للأبعد).\n3. **G**lobal (العام): في كامل مبنى الملف الحالي (الموديول).\n4. **B**uilt-in (المدمج): في مكتبة المدينة العامة لبايثون (`len`, `range`, `print`).\n\nالفخ الأكثر شهرة وصدمة للمبتدئين هو أن **صفة المحلية تُحدد أثناء الترجمة** (Compile Time)! إن كان هناك سطر تعيين (`x = ...`) في أي مكان داخل الدالة، يُصنف `x` محلياً في كافة أرجائها؛ فإذا حاولت قراءته قبل سطر التعيين، لن يبحث بايثون في النطاقات الخارجية بل يفاجئك بخطأ `UnboundLocalError`!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Lookup}(v) = \\text{head}\\left([ \\mathcal{S}_L(v), \\mathcal{S}_E(v), \\mathcal{S}_G(v), \\mathcal{S}_B(v) ] \\setminus \\{\\bot\\}\\right)",
        "formulaNote": {
          "en": "Variable lookup traverses four lexical concentric scopes in order: Local -> Enclosing -> Global -> Built-in, short-circuiting at the first match.",
          "ar": "يمر البحث عن المتغير عبر أربعة نطاقات معجمية متحدة المركز: المحلي -> المحيط -> العام -> المدمج، متوقفاً عند أول تطابق."
        },
        "narrative": {
          "en": "CPython optimizes local variable lookup into array indexing. Because local variable names are statically known at compile time, reading a local variable emits the lightning-fast `LOAD_FAST` opcode, which directly indexes the frame's `fastlocals` C array in nanoseconds. Enclosing variables emit `LOAD_DEREF` to traverse cell pointers, while Global and Built-in variables require dynamic dictionary hash lookups via `LOAD_GLOBAL`. Declaring `global x` or `nonlocal x` changes compiler opcode emission, directing bindings to module dictionaries or closure cells.",
          "ar": "عندما يصادف بايثون اسماً برمجياً مثل `total`، كيف يحدد الكائن المعني؟ يبحث المعالج عبر دوائر متحدة المركز تحكمها **قاعدة LEGB**:\n\n1. **L**ocal (المحلي): داخل غرفة الدالة الحالية التي يجري تنفيذها.\n2. **E**nclosing (المحيط): داخل شقة الدوال الحاضنة (من الأقرب للأبعد).\n3. **G**lobal (العام): في كامل مبنى الملف الحالي (الموديول).\n4. **B**uilt-in (المدمج): في مكتبة المدينة العامة لبايثون (`len`, `range`, `print`).\n\nالفخ الأكثر شهرة وصدمة للمبتدئين هو أن **صفة المحلية تُحدد أثناء الترجمة** (Compile Time)! إن كان هناك سطر تعيين (`x = ...`) في أي مكان داخل الدالة، يُصنف `x` محلياً في كافة أرجائها؛ فإذا حاولت قراءته قبل سطر التعيين، لن يبحث بايثون في النطاقات الخارجية بل يفاجئك بخطأ `UnboundLocalError`!\n\nيستبدل مفسر CPython البحث عن المتغيرات المحلية بفهرسة مصفوفات مباشرة فائقة السرعة. ولأن أسماء المتغيرات المحلية معروفة مسبقاً أثناء الترجمة، فإن قراءتها تصدر أمر `LOAD_FAST` الذي يصل إلى مصفوفة `fastlocals` في نانوثوانٍ. في حين تصدر المتغيرات المحيطة أمر `LOAD_DEREF`، وتتطلب المتغيرات العامة والمدمجة بحثاً في جداول التجزئة عبر `LOAD_GLOBAL`. استخدام `global` أو `nonlocal` يوجه المترجم لتعديل مسار توليد هذه الأوامر."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-scope-resolution-legb",
          "starterCode": "def create_isolated_accumulator(initial_sum: float = 0.0) -> tuple[Any, Any]:\n    \"\"\"\n    Creates an isolated accumulator that manages state across closures\n    using the `nonlocal` keyword, preventing accidental global scope contamination.\n\n    Returns:\n        A tuple of two functions: (add_amount, get_current_total).\n          - add_amount(amount: float) -> float (adds amount to total and returns new total)\n          - get_current_total() -> float (returns current accumulated total)\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
          "testCases": [
            {
              "input": "(lambda a: [a[0](5.0), a[1]()])(create_isolated_accumulator(10.0))",
              "expected": "[15.0, 15.0]"
            },
            {
              "input": "create_isolated_accumulator(42.0)[1]()",
              "expected": "42.0"
            },
            {
              "input": "create_isolated_accumulator(0.0)[0](100.0)",
              "expected": "100.0"
            }
          ],
          "expectedOutput": "[15.0, 15.0]",
          "variants": {
            "python": {
              "starterCode": "def create_isolated_accumulator(initial_sum: float = 0.0) -> tuple[Any, Any]:\n    \"\"\"\n    Creates an isolated accumulator that manages state across closures\n    using the `nonlocal` keyword, preventing accidental global scope contamination.\n\n    Returns:\n        A tuple of two functions: (add_amount, get_current_total).\n          - add_amount(amount: float) -> float (adds amount to total and returns new total)\n          - get_current_total() -> float (returns current accumulated total)\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "[15.0, 15.0]"
            }
          },
          "solution": "from typing import Any\n\ndef create_isolated_accumulator(initial_sum: float = 0.0) -> tuple[Any, Any]:\n    \"\"\"\n    Creates an isolated accumulator that manages state across closures\n    using the `nonlocal` keyword, preventing accidental global scope contamination.\n\n    Returns:\n        A tuple of two functions: (add_amount, get_current_total).\n          - add_amount(amount: float) -> float (adds amount to total and returns new total)\n          - get_current_total() -> float (returns current accumulated total)\n    \"\"\"\n    current_total = initial_sum\n\n    def add_amount(amount: float) -> float:\n        nonlocal current_total\n        current_total += amount\n        return current_total\n\n    def get_current_total() -> float:\n        return current_total\n\n    return add_amount, get_current_total"
        },
        "hints": {
          "tier1": {
            "en": "Declare `nonlocal current_total` inside `add_amount` before performing `current_total += amount`.",
            "ar": "صرّح بـ `nonlocal current_total` داخل الدالة قبل تنفيذ عملية الإضافة."
          },
          "tier2": {
            "en": "Without `nonlocal`, the assignment `current_total += amount` marks the variable local, causing an UnboundLocalError.",
            "ar": "دون `nonlocal`، تجعل عملية التعيين المتغير محلياً وتتسبب في خطأ UnboundLocalError."
          },
          "tier3": {
            "en": "`get_current_total` only reads `current_total` and does not assign to it, so it naturally resolves via Enclosing scope.",
            "ar": "دالة القراءة تقرأ المتغير فقط دون تعيين، لذا تستبينه طبيعياً من النطاق المحيط."
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
            "en": "Consider this code: ```python counter = 0 def increment(): counter += 1 increment() ``` Why does this raise `UnboundLocalError: local variable 'counter' referenced before assignment`? ```python counter = 0 def increment(): counter += 1 increment() ```",
            "ar": "تأمل الكود التالي: لماذا يطلق هذا الكود خطأ `UnboundLocalError: local variable 'counter' referenced before assignment`؟"
          },
          "options": [
            {
              "text": {
                "en": "The assignment `counter += 1` causes Python to compile 'counter' as a Local variable for the entire function; attempting to read it before assignment fails.",
                "ar": "عملية الإسناد `counter += 1` تجعل المترجم يصنف 'counter' كمتغير محلي للدالة بأكملها؛ فتفشل محاولة قراءته السابقة للإسناد."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Global variables are strictly read-only in Python and can never be modified by functions.",
                "ar": "المتغيرات العامة في بايثون للقراءة فقط ولا يمكن لأي دالة تعديلها مطلقاً."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because Python functions cannot access variables defined outside their body without passing them as arguments.",
                "ar": "لأن دوال بايثون لا تستطيع قراءة أي متغير خارجي إلا بتمريره كوسيط."
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
    "id": "python-lists-memory-growth",
    "title": "Python Lists & Dynamic Array Memory Growth",
    "titleAr": "قوائم بايثون والنمو الذاكري للمصفوفات الديناميكية",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "A Python list is NOT a linked list of chains; it is a dynamic array of pointers. Picture a row of parking spaces.",
      "ar": "قائمة بايثون (list) ليست سلسلة مرتبطة، بل هي مصفوفة ديناميكية من المؤشرات (Pointers). تخيل صفاً من مواقف السيارات المرقمة؛ كل موقف يحمل..."
    },
    "prerequisites": [
      "scope-resolution-legb"
    ],
    "x": 460,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PointerAliasingLab",
        "narrative": {
          "en": "A Python list is NOT a linked list of chains; it is a **dynamic array of pointers**. Picture a row of parking spaces. Each spot in the list holds a memory address card (a 64-bit pointer) leading to an object elsewhere on the heap.\n\nWhen you call `lst.append()`, what happens if the parking lot is completely full? CPython does **not** allocate just one single extra parking space (that would be disastrous, requiring copying all elements on every single append, turning $N$ appends into $O(N^2)$ work). Instead, CPython allocates a significantly larger new parking lot with extra empty slots according to a geometric formula (`newsize + (newsize >> 3) + ...`), moves the existing pointers over, and leaves ample headroom. That is why `append` runs in **amortized $O(1)$ time**!",
          "ar": "قائمة بايثون (`list`) ليست سلسلة مرتبطة، بل هي **مصفوفة ديناميكية من المؤشرات** (Pointers). تخيل صفاً من مواقف السيارات المرقمة؛ كل موقف يحمل بطاقة برقم عنوان (مؤشر 64 بت) لكائن يقيم في الذاكرة الحرة.\n\nعندما تستدعي `lst.append()` وتمتلئ المواقف، لا يضيف بايثون موقفاً واحداً إضافياً فقط (لأن ذلك سيتطلب نسخ كل شيء في كل عملية إضافة، مما يجعل إضافة $N$ عنصراً تستغرق زمناً كارثياً $O(N^2)$). بل يحجز بايثون موقفاً جديداً أكبر بنسبة هندسية محددة وفق صيغة نمو مسبقة، وينقل المؤشرات ويترك مساحات شاغرة للمستقبل. ولهذا السبب تتميز عملية الإضافة بتكلفة زمنية مجمعة (Amortized Time) ثابتة **$O(1)$**!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{new\\_allocated} = \\text{newsize} + (\\text{newsize} \\gg 3) + (\\text{newsize} < 9 \\mathrel{?} 3 : 6), \\quad T_{\\text{amortized}}(\\text{append}) = \\mathcal{O}(1)",
        "formulaNote": {
          "en": "CPython lists over-allocate contiguous pointer memory using a geometric formula, amortizing reallocation costs to O(1) per append.",
          "ar": "تفرط قوائم CPython في حجز مصفوفات المؤشرات المتجاورة هندسياً، مما يجعل التكلفة المجمعة للإضافة ثنائية ثابتة O(1)."
        },
        "narrative": {
          "en": "In CPython's C source code (`listobject.c`), a list is defined as `struct { PyObject_VAR_HEAD; PyObject **ob_item; Py_ssize_t allocated; }`. The `ob_item` field points to a contiguous array of pointers to `PyObject*`. When `size == allocated`, `list_resize()` triggers. For a 64-bit architecture, the allocated capacity progression starting from empty is: 0 -> 4 -> 8 -> 16 -> 24 -> 32 -> 40 -> 52 -> 64 -> 76... This guarantees that expensive $O(N)$ reallocations happen exponentially less often.",
          "ar": "قائمة بايثون (`list`) ليست سلسلة مرتبطة، بل هي **مصفوفة ديناميكية من المؤشرات** (Pointers). تخيل صفاً من مواقف السيارات المرقمة؛ كل موقف يحمل بطاقة برقم عنوان (مؤشر 64 بت) لكائن يقيم في الذاكرة الحرة.\n\nعندما تستدعي `lst.append()` وتمتلئ المواقف، لا يضيف بايثون موقفاً واحداً إضافياً فقط (لأن ذلك سيتطلب نسخ كل شيء في كل عملية إضافة، مما يجعل إضافة $N$ عنصراً تستغرق زمناً كارثياً $O(N^2)$). بل يحجز بايثون موقفاً جديداً أكبر بنسبة هندسية محددة وفق صيغة نمو مسبقة، وينقل المؤشرات ويترك مساحات شاغرة للمستقبل. ولهذا السبب تتميز عملية الإضافة بتكلفة زمنية مجمعة (Amortized Time) ثابتة **$O(1)$**!\n\nفي شفرة CPython المصدرية بلغة C، تُعرّف القائمة كـ `PyListObject` يحتوي على مصفوفة متجاورة من المؤشرات `ob_item` وحجم السعة المحجوزة `allocated`. عندما يتساوى عدد العناصر الفعلي مع السعة المحجوزة، يُستدعى التابع `list_resize()`. في المعالجات 64-بت، تتدرج السعة المحجوزة بدءاً من الصفر كالتالي: 0 -> 4 -> 8 -> 16 -> 24 -> 32 -> 40 -> 52... هذا يضمن أن عمليات إعادة الحجز المكلفة $O(N)$ تحدث على فترات متباعدة أسياً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-python-lists-memory-growth",
          "starterCode": "def calculate_cpython_list_capacity(target_size: int) -> int:\n    \"\"\"\n    Simulates CPython's exact list overallocation formula:\n    new_allocated = newsize + (newsize >> 3) + (3 if newsize < 9 else 6)\n\n    Args:\n        target_size: Number of elements we wish to accommodate.\n\n    Returns:\n        The total capacity allocated by CPython for target_size elements.\n    \"\"\"\n    # Bit-shift right by 3 is equivalent to integer division by 8\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "calculate_cpython_list_capacity(1)",
              "expected": "4"
            },
            {
              "input": "calculate_cpython_list_capacity(5)",
              "expected": "8"
            },
            {
              "input": "simulate_growth_sequence(10)[0]",
              "expected": "(1, 4)"
            }
          ],
          "expectedOutput": "4",
          "variants": {
            "python": {
              "starterCode": "def calculate_cpython_list_capacity(target_size: int) -> int:\n    \"\"\"\n    Simulates CPython's exact list overallocation formula:\n    new_allocated = newsize + (newsize >> 3) + (3 if newsize < 9 else 6)\n\n    Args:\n        target_size: Number of elements we wish to accommodate.\n\n    Returns:\n        The total capacity allocated by CPython for target_size elements.\n    \"\"\"\n    # Bit-shift right by 3 is equivalent to integer division by 8\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "4"
            }
          },
          "solution": "def calculate_cpython_list_capacity(target_size: int) -> int:\n    \"\"\"\n    Simulates CPython's exact list overallocation formula:\n    new_allocated = newsize + (newsize >> 3) + (3 if newsize < 9 else 6)\n\n    Args:\n        target_size: Number of elements we wish to accommodate.\n\n    Returns:\n        The total capacity allocated by CPython for target_size elements.\n    \"\"\"\n    if target_size <= 0:\n        return 0\n\n    # Bit-shift right by 3 is equivalent to integer division by 8\n    growth = target_size >> 3\n    bias = 3 if target_size < 9 else 6\n    new_allocated = target_size + growth + bias\n\n    return new_allocated\n\ndef simulate_growth_sequence(max_elements: int) -> list[tuple[int, int]]:\n    \"\"\"\n    Simulates list resizing events from 0 up to max_elements,\n    recording (element_count, allocated_capacity) on each reallocation.\n    \"\"\"\n    reallocations: list[tuple[int, int]] = []\n    current_capacity = 0\n\n    for size in range(1, max_elements + 1):\n        if size > current_capacity:\n            current_capacity = calculate_cpython_list_capacity(size)\n            reallocations.append((size, current_capacity))\n\n    return reallocations"
        },
        "hints": {
          "tier1": {
            "en": "Use bitwise shift `target_size >> 3` which represents dividing by 8.",
            "ar": "استخدم الإزاحة الثنائية `target_size >> 3` التي تعادل القسمة الصحيحة على 8."
          },
          "tier2": {
            "en": "Add a bias of 3 if target_size < 9, otherwise add 6.",
            "ar": "أضف إزاحة 3 إذا كان الحجم أقل من 9، وإلا أضف 6."
          },
          "tier3": {
            "en": "On `size = 1`, the allocated capacity expands immediately to 4 slots.",
            "ar": "عند `size = 1`، تتوسع السعة المحجوزة فوراً إلى 4 خانات."
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
            "en": "Why is `list.append(x)` amortized O(1), but `list.insert(0, x)` or `list.pop(0)` is strictly O(N)?",
            "ar": "لماذا تستغرق `list.append(x)` زمناً مجمعاً O(1)، بينما تستغرق `list.insert(0, x)` أو `list.pop(0)` زمناً خطياً O(N) دائماً؟"
          },
          "options": [
            {
              "text": {
                "en": "Inserting or removing at index 0 requires shifting all N existing 64-bit pointers in contiguous memory by one position.",
                "ar": "تتطلب الإضافة أو الحذف في الموضع 0 إزاحة كافة المؤشرات البالغ عددها N في الذاكرة المتجاورة بمقدار خانة واحدة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because CPython stores lists as singly-linked lists where finding the head takes linear time.",
                "ar": "لأن بايثون يخزن القوائم كسلاسل أحادية الترابط يتطلب الوصول لرأسها زمناً خطياً."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because insert(0) allocates a new copy of every object in the list on the heap.",
                "ar": "لأن insert(0) تنشئ نسخة جديدة لكل كائن داخل القائمة في الذاكرة."
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
    "id": "hash-tables-dict-internals",
    "title": "Hash Tables & CPython Dictionary Internals",
    "titleAr": "جداول التجزئة والمعمارية الداخلية لقواميس CPython",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "How can Python find a single key among 1,000,000 entries in under a microsecond? Imagine a massive library where, instead of scanning...",
      "ar": "كيف يعثر بايثون على مفتاح ضمن مليون عنصر في أقل من ميكروثانية؟ تخيل مكتبة عملاقة، بدلاً من فحص الرفوف سطراً بعد سطر، تُدخل عنوان الكتاب في..."
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
          "en": "How can Python find a single key among 1,000,000 entries in under a microsecond? Imagine a massive library where, instead of scanning shelves sequentially, you pass the book title through a mathematical blender: the **Hash Function** `hash(key)`. The blender outputs a deterministic integer that points directly to the exact shelf row!\n\nSince Python 3.6, dictionaries are **compact and insertion-ordered**. Earlier versions used a sparse table where each slot held hash, key, and value pointers, wasting massive amounts of memory. Today, CPython separates dictionaries into two tables: a small, sparse byte-array of `indices`, and a dense, packed `entries` array `[hash, key, value]`. When hash collisions occur (two keys mapping to the same index), Python resolves them via an open-addressing perturbation formula: $i = (5i + \\text{perturb} + 1) \\pmod M$.",
          "ar": "كيف يعثر بايثون على مفتاح ضمن مليون عنصر في أقل من ميكروثانية؟ تخيل مكتبة عملاقة، بدلاً من فحص الرفوف سطراً بعد سطر، تُدخل عنوان الكتاب في خلاط رياضي عجيب: **دالة التجزئة** `hash(key)`. يُنتج الخلاط رقماً حتمياً يوجهك مباشرة إلى الرف المنشود!\n\nمنذ إصدار بايثون 3.6، أصبحت القواميس **مضغوطة وتحافظ على ترتيب الإدخال**. كانت الإصدارات القديمة تهدر مساحات شاسعة من الذاكرة بجدول متناثر ضخم. أما اليوم، فيفصل بايثون القاموس إلى جدولين: مصفوفة فهارس صغيرة متناثرة (`indices`) تشير إلى مصفوفة مدخلات مرصوصة بإحكام (`entries`) تحوي `[hash, key, value]`. وعند حدوث تصادم (تطابق الفهرس لمفتاحين مختلفين)، يحل بايثون النزاع عبر خوارزمية العنونة المفتوحة والاضطراب التكراري: $i = (5i + \\text{perturb} + 1) \\pmod M$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "i_0 = \\text{hash}(\\text{key}) \\pmod M, \\quad i_{t+1} = (5 \\cdot i_t + \\text{perturb} + 1) \\pmod M, \\quad \\text{Load Factor } \\alpha \\le \\frac{2}{3}",
        "formulaNote": {
          "en": "CPython compact dictionaries decouple a sparse indices hash table from a dense entries array, resolving collisions via open-addressing perturbation.",
          "ar": "تفصل قواميس CPython المضغوطة جدول الفهارس المتناثر عن مصفوفة المدخلات المرصوصة، وتعالج التصادم بالعنونة المفتوحة والاضطراب التكراري."
        },
        "narrative": {
          "en": "The load factor $\\alpha = N / M$ is strictly capped at $2/3$. When two-thirds of the sparse table is populated, CPython quadruples (or doubles for large tables) the table size to preserve $O(1)$ average-case lookup. To qualify as a dictionary key, an object must be **hashable**: it must implement `__hash__()` and `__eq__()`, and satisfy the invariant: $a == b \\implies \\text{hash}(a) == \\text{hash}(b)$.",
          "ar": "كيف يعثر بايثون على مفتاح ضمن مليون عنصر في أقل من ميكروثانية؟ تخيل مكتبة عملاقة، بدلاً من فحص الرفوف سطراً بعد سطر، تُدخل عنوان الكتاب في خلاط رياضي عجيب: **دالة التجزئة** `hash(key)`. يُنتج الخلاط رقماً حتمياً يوجهك مباشرة إلى الرف المنشود!\n\nمنذ إصدار بايثون 3.6، أصبحت القواميس **مضغوطة وتحافظ على ترتيب الإدخال**. كانت الإصدارات القديمة تهدر مساحات شاسعة من الذاكرة بجدول متناثر ضخم. أما اليوم، فيفصل بايثون القاموس إلى جدولين: مصفوفة فهارس صغيرة متناثرة (`indices`) تشير إلى مصفوفة مدخلات مرصوصة بإحكام (`entries`) تحوي `[hash, key, value]`. وعند حدوث تصادم (تطابق الفهرس لمفتاحين مختلفين)، يحل بايثون النزاع عبر خوارزمية العنونة المفتوحة والاضطراب التكراري: $i = (5i + \\text{perturb} + 1) \\pmod M$.\n\nيُقيد معامل التحميل $\\alpha = N / M$ بحد أقصى $2/3$. وعند بلوغ هذا الحد، يضاعف CPython حجم الجدول فوراً للحفاظ على كفاءة البحث في زمن ثابت $O(1)$. ولكي يكون أي كائن صالحاً كمفتاح، يجب أن يكون **قابلاً للتجزئة** (Hashable): أي ينفذ `__hash__()` و `__eq__()` ويحقق الشرط الحتمي: $a == b \\implies \\text{hash}(a) == \\text{hash}(b)$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-hash-tables-dict-internals",
          "starterCode": "def simulate_cpython_probe_sequence(\n    hash_value: int,\n    table_size: int,\n    max_steps: int = 5,\n) -> list[int]:\n    \"\"\"\n    Simulates CPython's exact open-addressing probe sequence for collision resolution:\n      i = (5 * i + perturb + 1) % table_size\n      perturb >>= 5\n\n    Args:\n        hash_value: The precomputed integer hash of the key.\n        table_size: Capacity of the sparse index table (power of 2, e.g. 8).\n        max_steps: Number of probe sequence steps to generate.\n\n    Returns:\n        A list of probed slot indices in traversal order.\n    \"\"\"\n    # Shift perturbation bits right by 5\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "simulate_cpython_probe_sequence(10, 8, 3)[0]",
              "expected": "2"
            },
            {
              "input": "len(simulate_cpython_probe_sequence(10, 8, 4))",
              "expected": "4"
            },
            {
              "input": "simulate_cpython_probe_sequence(0, 8, 2)",
              "expected": "[0, 1]"
            }
          ],
          "expectedOutput": "2",
          "variants": {
            "python": {
              "starterCode": "def simulate_cpython_probe_sequence(\n    hash_value: int,\n    table_size: int,\n    max_steps: int = 5,\n) -> list[int]:\n    \"\"\"\n    Simulates CPython's exact open-addressing probe sequence for collision resolution:\n      i = (5 * i + perturb + 1) % table_size\n      perturb >>= 5\n\n    Args:\n        hash_value: The precomputed integer hash of the key.\n        table_size: Capacity of the sparse index table (power of 2, e.g. 8).\n        max_steps: Number of probe sequence steps to generate.\n\n    Returns:\n        A list of probed slot indices in traversal order.\n    \"\"\"\n    # Shift perturbation bits right by 5\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2"
            }
          },
          "solution": "def simulate_cpython_probe_sequence(\n    hash_value: int,\n    table_size: int,\n    max_steps: int = 5,\n) -> list[int]:\n    \"\"\"\n    Simulates CPython's exact open-addressing probe sequence for collision resolution:\n      i = (5 * i + perturb + 1) % table_size\n      perturb >>= 5\n\n    Args:\n        hash_value: The precomputed integer hash of the key.\n        table_size: Capacity of the sparse index table (power of 2, e.g. 8).\n        max_steps: Number of probe sequence steps to generate.\n\n    Returns:\n        A list of probed slot indices in traversal order.\n    \"\"\"\n    probes: list[int] = []\n    perturb = hash_value\n    idx = hash_value % table_size\n    probes.append(idx)\n\n    for _ in range(max_steps - 1):\n        idx = (5 * idx + perturb + 1) % table_size\n        probes.append(idx)\n        # Shift perturbation bits right by 5\n        perturb >>= 5\n\n    return probes"
        },
        "hints": {
          "tier1": {
            "en": "Initial index is `hash_value % table_size`.",
            "ar": "الفهرس الابتدائي هو `hash_value % table_size`."
          },
          "tier2": {
            "en": "In each step, update `idx = (5 * idx + perturb + 1) % table_size` and shift `perturb >>= 5`.",
            "ar": "في كل خطوة، حدّث الفهرس بصيغة الاضطراب ثم أزح `perturb >>= 5`."
          },
          "tier3": {
            "en": "The sequence guarantees full permutation coverage of all table slots.",
            "ar": "تضمن هذه الصيغة تغطية كافة خانات الجدول وتشتيت التصادمات بانتظام."
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
            "en": "Why does attempting to use a Python list as a dictionary key raise `TypeError: unhashable type: 'list'`?",
            "ar": "لماذا تطلق محاولة استخدام قائمة بايثون كمفتاح في القاموس خطأ `TypeError: unhashable type: 'list'`؟"
          },
          "options": [
            {
              "text": {
                "en": "Lists are mutable; if a list mutated while serving as a key, its hash code would change, making its entry permanently unlocatable in the hash table.",
                "ar": "القوائم قابلة للتعديل؛ فلو عُدلت القائمة أثناء وجودها كمفتاح لتغيرت شفرة تجزئتها، مما يجعل العثور عليها في الجدول مستحيلاً."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because lists contain pointers and CPython hash functions can only process primitive integers.",
                "ar": "لأن القوائم تحوي مؤشرات ودوال التجزئة تقبل الأرقام البسيطة فقط."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because lists do not implement the `__eq__` equality method.",
                "ar": "لأن القوائم لا تنفذ دالة المقارنة `__eq__`."
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
    "id": "tuples-immutability-sets",
    "title": "Tuples, Immutability & Set Theory Mechanics",
    "titleAr": "الصفوف (Tuples)، اللاقابلية للتغيير، وميكانيكا المجموعات (Sets)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Beginners frequently assume a tuple is merely a 'read-only list', but their architectural roles are fundamentally different.",
      "ar": "يعتقد المبتدئون أن الصف (Tuple) مجرد 'قائمة للقراءة فقط'، لكن غرضهما المعماري مختلف جوهرياً. القائمة مصفوفة ديناميكية صُممت لتنمو وتنكمش."
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
          "en": "Beginners frequently assume a tuple is merely a 'read-only list', but their architectural roles are fundamentally different. A list is a dynamic array designed to grow and shrink. A **tuple** is a fixed-size structured record (like a database row: `('Alice', 30, 'Engineer')`).\n\nBecause a tuple's length is frozen upon creation, CPython optimizes it aggressively: zero over-allocation headroom, smaller memory overhead, and internal freelist recycling for small tuples. However, beware: **immutability in Python is shallow**! A tuple cannot change which memory addresses it holds. But if one of those addresses points to a mutable list, that list's internal contents can still be mutated! Meanwhile, a **set** is an ultra-fast hash table without values, granting $O(1)$ set membership testing and mathematical union/intersection operations.",
          "ar": "يعتقد المبتدئون أن الصف (Tuple) مجرد 'قائمة للقراءة فقط'، لكن غرضهما المعماري مختلف جوهرياً. القائمة مصفوفة ديناميكية صُممت لتنمو وتنكمش. بينما **الصف** هو سجل بيانات بنيوي ثابت الحجم (مثل صف في قاعدة بيانات: `('Alice', 30, 'Engineer')`).\n\nولأن حجم الصف مجمد عند إنشائه، يستمثله CPython بكفاءة عالية: لا مساحات محجوزة فائضة، واستهلاك أقل للذاكرة، وإعادة تدوير الصفوف الصغيرة في الذاكرة. ولكن احذر: **اللاقابلية للتعديل في بايثون سطحية** (Shallow Immutability)! لا يمكن للصف أن يغير مؤشرات الذاكرة التي يحملها؛ لكن إذا كان أحد تلك المؤشرات يشير إلى قائمة قابلة للتعديل، فإن محتويات القائمة الداخلية يمكن أن تتغير! أما **المجموعة** (`set`) فهي جدول تجزئة فائق السرعة يحوي مفاتيح فقط دون قيم، مما يمنح فحص الانتماء الرياضي بزمن ثابت $O(1)$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{sizeof}(\\text{tuple}_n) = 40 + 8n \\text{ bytes}, \\quad \\text{sizeof}(\\text{list}_n) = 56 + 8 \\cdot \\text{allocated}, \\quad \\text{Shallow Immutability}",
        "formulaNote": {
          "en": "Tuples guarantee shallow immutability and exact memory allocation without over-allocation headroom, while sets leverage hash table direct addressing.",
          "ar": "تضمن الصفوف اللاقابلية السطحية للتعديل وتخصيصاً دقيقاً للذاكرة دون مساحات فائضة، بينما تعتمد المجموعات على عنونة جداول التجزئة."
        },
        "narrative": {
          "en": "Memory footprint comparison reveals the architecture: on 64-bit CPython, an empty tuple consumes 40 bytes, while an empty list consumes 56 bytes. For $N$ items, a tuple allocates exactly $40 + 8N$ bytes, whereas a list allocates $56 + 8 \\times \\text{allocated}$ bytes where $\\text{allocated} > N$. A set requires a minimum 224 bytes because it maintains an internal 8-slot hash table table from birth.",
          "ar": "يعتقد المبتدئون أن الصف (Tuple) مجرد 'قائمة للقراءة فقط'، لكن غرضهما المعماري مختلف جوهرياً. القائمة مصفوفة ديناميكية صُممت لتنمو وتنكمش. بينما **الصف** هو سجل بيانات بنيوي ثابت الحجم (مثل صف في قاعدة بيانات: `('Alice', 30, 'Engineer')`).\n\nولأن حجم الصف مجمد عند إنشائه، يستمثله CPython بكفاءة عالية: لا مساحات محجوزة فائضة، واستهلاك أقل للذاكرة، وإعادة تدوير الصفوف الصغيرة في الذاكرة. ولكن احذر: **اللاقابلية للتعديل في بايثون سطحية** (Shallow Immutability)! لا يمكن للصف أن يغير مؤشرات الذاكرة التي يحملها؛ لكن إذا كان أحد تلك المؤشرات يشير إلى قائمة قابلة للتعديل، فإن محتويات القائمة الداخلية يمكن أن تتغير! أما **المجموعة** (`set`) فهي جدول تجزئة فائق السرعة يحوي مفاتيح فقط دون قيم، مما يمنح فحص الانتماء الرياضي بزمن ثابت $O(1)$.\n\nيكشف فحص الذاكرة عن الفارق المعماري: في أنظمة 64-بت، يستهلك الصف الفارغ 40 بايتاً فقط، بينما تستهلك القائمة الفارغة 56 بايتاً. ولعدد $N$ من العناصر، يخصص الصف $40 + 8N$ بايتاً بدقة، في حين تخصص القائمة $56 + 8 \\times \\text{allocated}$ بايت حيث السعة المحجوزة أكبر من $N$. أما المجموعة فتحجز 224 بايتاً كحد أدنى لأنها تبني جدول تجزئة من 8 خانات منذ لحظة ولادتها."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-tuples-immutability-sets",
          "starterCode": "def deep_freeze(obj: Any) -> Any:\n    \"\"\"\n    Recursively transforms arbitrary compound data structures into\n    deeply immutable, hashable forms:\n      - lists become tuples\n      - dicts become frozensets of (key, deep_freeze(value)) pairs\n      - sets become frozensets\n\n    Args:\n        obj: Arbitrary Python object.\n\n    Returns:\n        The recursively frozen, hashable equivalent.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
          "testCases": [
            {
              "input": "deep_freeze([1, [2, 3]])",
              "expected": "(1, (2, 3))"
            },
            {
              "input": "isinstance(deep_freeze({'a': [1, 2]}), frozenset)",
              "expected": "True"
            },
            {
              "input": "hash(deep_freeze([1, 2, {'x': 10}])) != 0",
              "expected": "True"
            }
          ],
          "expectedOutput": "(1, (2, 3))",
          "variants": {
            "python": {
              "starterCode": "def deep_freeze(obj: Any) -> Any:\n    \"\"\"\n    Recursively transforms arbitrary compound data structures into\n    deeply immutable, hashable forms:\n      - lists become tuples\n      - dicts become frozensets of (key, deep_freeze(value)) pairs\n      - sets become frozensets\n\n    Args:\n        obj: Arbitrary Python object.\n\n    Returns:\n        The recursively frozen, hashable equivalent.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "(1, (2, 3))"
            }
          },
          "solution": "from typing import Any\n\ndef deep_freeze(obj: Any) -> Any:\n    \"\"\"\n    Recursively transforms arbitrary compound data structures into\n    deeply immutable, hashable forms:\n      - lists become tuples\n      - dicts become frozensets of (key, deep_freeze(value)) pairs\n      - sets become frozensets\n\n    Args:\n        obj: Arbitrary Python object.\n\n    Returns:\n        The recursively frozen, hashable equivalent.\n    \"\"\"\n    if isinstance(obj, list):\n        return tuple(deep_freeze(x) for x in obj)\n    elif isinstance(obj, dict):\n        return frozenset((k, deep_freeze(v)) for k, v in obj.items())\n    elif isinstance(obj, set):\n        return frozenset(deep_freeze(x) for x in obj)\n    return obj"
        },
        "hints": {
          "tier1": {
            "en": "Convert lists using `tuple(deep_freeze(x) for x in obj)`.",
            "ar": "حوّل القوائم باستخدام `tuple(deep_freeze(x) for x in obj)`."
          },
          "tier2": {
            "en": "Convert dicts into `frozenset` containing frozen key-value tuples.",
            "ar": "حوّل القواميس إلى `frozenset` يحتوي على أزواج (مفتاح، قيمة مجمدة)."
          },
          "tier3": {
            "en": "Primitive immutables (int, str, float) should be returned unchanged.",
            "ar": "أعد القيم الثابتة البسيطة (int, str) كما هي دون تعديل."
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
            "en": "Consider this famous Python puzzle: ```python t = (1, 2, [3, 4]) t[2] += [5] ``` What happens when this executes? ```python t = (1, 2, [3, 4]) t[2] += [5] ```",
            "ar": "تأمل هذه الأحجية البرمجية الشهيرة في بايثون: ما الذي يحدث عند تنفيذ هذا السطر؟"
          },
          "options": [
            {
              "text": {
                "en": "It BOTH raises a TypeError AND mutates the list, resulting in t being (1, 2, [3, 4, 5]).",
                "ar": "يحدث الأمران معاً: يُطلق خطأ TypeError وتُعدل القائمة في مكانها لتصبح t مساوية لـ (1, 2, [3, 4, 5])."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "It raises a TypeError immediately and the list remains [3, 4].",
                "ar": "يُطلق خطأ TypeError فوراً وتبقى القائمة كما هي دون تغيير [3, 4]."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "It executes cleanly without error, appending 5 to the nested list.",
                "ar": "ينفذ الكود بنجاح دون أي أخطاء ويضيف 5 للقائمة الفرعية."
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
    "id": "object-oriented-dunder",
    "title": "Object-Oriented Protocols & Dunder Methods",
    "titleAr": "البروتوكولات كائنية التوجه ودوال بايثون السحرية (Dunder Methods)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Python is not merely object-oriented; it is protocol-oriented. In Python, syntax is syntactic sugar for double-underscore ('dunder')...",
      "ar": "باثيون لغة تعتمد على البروتوكولات (Protocols) أكثر من اعتمادها على الوراثة الجامدة. فكل بناء لغوي في بايثون هو قناع ناعم لدالة خاصة محاطة..."
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
          "en": "Python is not merely object-oriented; it is **protocol-oriented**. In Python, syntax is syntactic sugar for double-underscore ('dunder') methods. When you write `len(x)`, Python does not check a hardcoded property; it invokes `type(x).__len__(x)`. When you write `a + b`, it calls `type(a).__add__(a, b)`. When you write `x in container`, it calls `__contains__`.\n\nBy implementing standard dunder protocols on your custom classes, they become first-class citizens in Python: they can be sliced with brackets `obj[1:3]`, printed nicely with f-strings `__repr__`, sorted in algorithms, and used as dictionary keys with `__hash__` and `__eq__`.",
          "ar": "باثيون لغة تعتمد على **البروتوكولات** (Protocols) أكثر من اعتمادها على الوراثة الجامدة. فكل بناء لغوي في بايثون هو قناع ناعم لدالة خاصة محاطة بشرطتين سفليتين (Dunder Method). عندما تكتب `len(x)`، يستدعي بايثون `type(x).__len__(x)`. وعندما تكتب `a + b`، يُترجم إلى `type(a).__add__(a, b)`. وعندما تكتب `x in c`، يُستدعى `__contains__`.\n\nوعندما تطبق هذه البروتوكولات على أصنافك المخصصة، تصبح كائناتك مدمجة بسلاسة في لغة بايثون: يمكن تقطيعها بالأقواس `obj[1:3]`، وطباعتها بأناقة عبر `__repr__`، ومقارنتها وترتيبها في الخوارزميات، واستخدامها كمفاتيح في القواميس عبر `__hash__` و `__eq__`."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "x[k] \\iff \\text{type}(x).\\_\\_\\text{getitem}\\_\\_(x, k), \\quad a + b \\iff \\text{type}(a).\\_\\_\\text{add}\\_\\_(a, b), \\quad a == b \\implies \\text{hash}(a) == \\text{hash}(b)",
        "formulaNote": {
          "en": "Python data model binds high-level language operators and syntactic constructs to double-underscore ('dunder') method protocols on the type object.",
          "ar": "يربط نموذج بيانات بايثون المعاملات اللغوية والتراكيب النحوية ببروتوكولات الدوال المزدوجة (Dunder) المعرفة في صنف الكائن."
        },
        "narrative": {
          "en": "Protocol dispatch in CPython is handled through fast C struct function pointers (slots) on the type object `PyTypeObject` (e.g. `tp_as_number`, `tp_as_sequence`, `tp_as_mapping`). When you implement `__eq__` on a class without explicitly implementing `__hash__`, Python automatically sets `__hash__ = None` to enforce the fundamental hash contract: objects that compare equal must produce identical hashes.",
          "ar": "باثيون لغة تعتمد على **البروتوكولات** (Protocols) أكثر من اعتمادها على الوراثة الجامدة. فكل بناء لغوي في بايثون هو قناع ناعم لدالة خاصة محاطة بشرطتين سفليتين (Dunder Method). عندما تكتب `len(x)`، يستدعي بايثون `type(x).__len__(x)`. وعندما تكتب `a + b`، يُترجم إلى `type(a).__add__(a, b)`. وعندما تكتب `x in c`، يُستدعى `__contains__`.\n\nوعندما تطبق هذه البروتوكولات على أصنافك المخصصة، تصبح كائناتك مدمجة بسلاسة في لغة بايثون: يمكن تقطيعها بالأقواس `obj[1:3]`، وطباعتها بأناقة عبر `__repr__`، ومقارنتها وترتيبها في الخوارزميات، واستخدامها كمفاتيح في القواميس عبر `__hash__` و `__eq__`.\n\nتتم إدارة توجيه البروتوكولات في CPython عبر مؤشرات دوال سريعة (Slots) داخل هيكل النوع في لغة C (مثل `tp_as_number` و `tp_as_mapping`). وحين تعرّف دالة المقارنة `__eq__` في صنف دون تعريف `__hash__`، يعطل بايثون التجزئة تلقائياً بجعل `__hash__ = None` لفرض العقد الرياضي: الكائنات المتطابقة في القيمة يجب أن تنتج شفرات تجزئة متطابقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-object-oriented-dunder",
          "starterCode": "class Vector2D:\n    \"\"\"\n    A 2D geometric vector implementing Python's arithmetic, equality,\n    representation, and hashing dunder protocols.\n    \"\"\"\n    def __init__(self, x: float, y: float):\n        self.x = float(x)\n        self.y = float(y)\n\n    def __repr__(self) -> str:\n        return f\"Vector2D({self.x}, {self.y})\"\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Vector2D):\n            return False\n        return self.x == other.x and self.y == other.y\n\n    def __add__(self, other: \"Vector2D\") -> \"Vector2D\":\n        if not isinstance(other, Vector2D):\n            return NotImplemented\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __hash__(self) -> int:\n        return hash((self.x, self.y))\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "repr(Vector2D(1, 2) + Vector2D(3, 4))",
              "expected": "Vector2D(4.0, 6.0)"
            },
            {
              "input": "Vector2D(1, 2) == Vector2D(1.0, 2.0)",
              "expected": "True"
            },
            {
              "input": "len({Vector2D(1, 2), Vector2D(1, 2), Vector2D(3, 4)})",
              "expected": "2"
            }
          ],
          "expectedOutput": "Vector2D(4.0, 6.0)",
          "variants": {
            "python": {
              "starterCode": "class Vector2D:\n    \"\"\"\n    A 2D geometric vector implementing Python's arithmetic, equality,\n    representation, and hashing dunder protocols.\n    \"\"\"\n    def __init__(self, x: float, y: float):\n        self.x = float(x)\n        self.y = float(y)\n\n    def __repr__(self) -> str:\n        return f\"Vector2D({self.x}, {self.y})\"\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Vector2D):\n            return False\n        return self.x == other.x and self.y == other.y\n\n    def __add__(self, other: \"Vector2D\") -> \"Vector2D\":\n        if not isinstance(other, Vector2D):\n            return NotImplemented\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __hash__(self) -> int:\n        return hash((self.x, self.y))\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "Vector2D(4.0, 6.0)"
            }
          },
          "solution": "class Vector2D:\n    \"\"\"\n    A 2D geometric vector implementing Python's arithmetic, equality,\n    representation, and hashing dunder protocols.\n    \"\"\"\n    def __init__(self, x: float, y: float):\n        self.x = float(x)\n        self.y = float(y)\n\n    def __repr__(self) -> str:\n        return f\"Vector2D({self.x}, {self.y})\"\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Vector2D):\n            return False\n        return self.x == other.x and self.y == other.y\n\n    def __add__(self, other: \"Vector2D\") -> \"Vector2D\":\n        if not isinstance(other, Vector2D):\n            return NotImplemented\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __hash__(self) -> int:\n        return hash((self.x, self.y))"
        },
        "hints": {
          "tier1": {
            "en": "Implement `__add__` by creating a new `Vector2D(self.x + other.x, self.y + other.y)`.",
            "ar": "نفذ `__add__` بإنشاء كائن جديد `Vector2D(self.x + other.x, self.y + other.y)`."
          },
          "tier2": {
            "en": "Implement `__hash__` by returning the hash of the tuple `(self.x, self.y)`.",
            "ar": "نفذ `__hash__` بإرجاع تجزئة الصف `(self.x, self.y)`."
          },
          "tier3": {
            "en": "Return `NotImplemented` from `__add__` if `other` is not an instance of Vector2D.",
            "ar": "أعد `NotImplemented` من `__add__` إذا لم يكن الكائن الآخر من نفس النوع."
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
            "en": "Why does defining `__eq__` on a custom Python class automatically set its `__hash__ = None` unless explicitly overridden?",
            "ar": "لماذا يؤدي تعريف الدالة `__eq__` في أي صنف مخصص إلى تعيين `__hash__ = None` تلقائياً ما لم يتم التصريح عنها صراحة؟"
          },
          "options": [
            {
              "text": {
                "en": "To uphold the Hash Contract: if two objects compare equal, their hash codes must be identical; default identity-based hashing would break this contract.",
                "ar": "للحفاظ على العقد الرياضي للتجزئة: إذا تساوى كائنان فيجب تطابق شفرتيهما، والتجزئة الافتراضية القائمة على عنوان الذاكرة تخرق هذا العقد."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because Python's virtual machine deletes methods when new ones are compiled.",
                "ar": "لأن مفسر بايثون يحذف الدوال القديمة عند ترجمة دوال جديدة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because classes with `__eq__` are automatically converted to mutable types.",
                "ar": "لأن الأصناف التي تحوي `__eq__` تتحول تلقائياً إلى أنواع قابلة للتعديل."
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
    "id": "iterators-generators-streams",
    "title": "Iterators, Generators & Lazy Streams",
    "titleAr": "المكررات، المولدات الكسولة، وتدفق البيانات غير المحدود",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you must process a 100-gigabyte log file on a computer with only 8 gigabytes of RAM.",
      "ar": "تخيل أنك بحاجة لمعالجة ملف سجلات ضخم بحجم 100 غيغابايت على جهاز يمتلك 8 غيغابايت فقط من الذاكرة العشوائية."
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
          "en": "Imagine you must process a 100-gigabyte log file on a computer with only 8 gigabytes of RAM. If you use a list comprehension, your computer runs out of memory and crashes instantly (Out-Of-Memory Crash)! Why? Because a list is eager: it insists that all 100 gigabytes exist in memory simultaneously.\n\nA **Generator** is lazy: it is a **conveyor belt frozen in time**. The `yield` keyword pauses function execution, freezes its stack frame in place on the heap, and yields a single element to the caller. The program holds only ONE item in memory at any given instant. When the caller asks for the next item (`next(gen)`), the function thaws out right where it left off, advances one step, and freezes again!",
          "ar": "تخيل أنك بحاجة لمعالجة ملف سجلات ضخم بحجم 100 غيغابايت على جهاز يمتلك 8 غيغابايت فقط من الذاكرة العشوائية. إن استخدمت قائمة عادية، سينهار نظامك فوراً بنفاد الذاكرة! والسبب أن القوائم 'شرهة' (Eager) تتطلب بناء كافة العناصر في الذاكرة دفعة واحدة.\n\nأما **المولد (Generator)** فهو كسول وذكي: إنه **شريط ناقل يتجمد في الزمن**. الكلمة المفتاحية `yield` توقف تنفيذ الدالة مؤقتاً، وتجمد إطارها الذاكري في الكومة وتسلم عنصراً واحداً فقط للمستدعي. لا يشغل البرنامج في أي لحظة سوى ذاكرة عنصر وحيد؛ وحين يطلب المستدعي العنصر التالي (`next(gen)`)، تستيقظ الدالة من مكان توقفها تماماً، وتخطو خطوة واحدة، ثم تعود للتجمد!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{GeneratorState} \\in \\{\\text{GEN\\_CREATED}, \\text{GEN\\_SUSPENDED}, \\text{GEN\\_RUNNING}, \\text{GEN\\_CLOSED}\\}, \\quad \\text{Space: } \\mathcal{O}(1) \\ll \\mathcal{O}(N)",
        "formulaNote": {
          "en": "Generators suspend and resume stack frames lazily on the heap via yield, achieving O(1) auxiliary memory consumption across infinite streams.",
          "ar": "تعلق المولدات أطر التنفيذ وتستأنفها في الكومة عند الطلب عبر yield، محققة استهلاكاً ذاكرياً ثابتاً O(1) عبر تدفقات غير محدودة."
        },
        "narrative": {
          "en": "Under the hood, CPython preserves the generator's state in a `PyGenObject` structure holding a pointer to the frame `PyFrameObject`. The frame's instruction pointer `f_lasti` records the exact bytecode offset of the `YIELD_VALUE` instruction. When execution resumes via `next()`, the evaluation loop picks up at `f_lasti + 1`. This allows chaining infinite stream transformers without intermediate buffer allocations.",
          "ar": "تخيل أنك بحاجة لمعالجة ملف سجلات ضخم بحجم 100 غيغابايت على جهاز يمتلك 8 غيغابايت فقط من الذاكرة العشوائية. إن استخدمت قائمة عادية، سينهار نظامك فوراً بنفاد الذاكرة! والسبب أن القوائم 'شرهة' (Eager) تتطلب بناء كافة العناصر في الذاكرة دفعة واحدة.\n\nأما **المولد (Generator)** فهو كسول وذكي: إنه **شريط ناقل يتجمد في الزمن**. الكلمة المفتاحية `yield` توقف تنفيذ الدالة مؤقتاً، وتجمد إطارها الذاكري في الكومة وتسلم عنصراً واحداً فقط للمستدعي. لا يشغل البرنامج في أي لحظة سوى ذاكرة عنصر وحيد؛ وحين يطلب المستدعي العنصر التالي (`next(gen)`)، تستيقظ الدالة من مكان توقفها تماماً، وتخطو خطوة واحدة، ثم تعود للتجمد!\n\nخلف الكواليس، يحفظ CPython حالة المولد في هيكل `PyGenObject` يحمل مؤشراً لإطار التنفيذ `PyFrameObject`. يسجل مؤشر التعليمات `f_lasti` موقع أمر البايت `YIELD_VALUE` بدقة. وعند استئناف التنفيذ، ينطلق المعالج من `f_lasti + 1`. هذا يتيح بناء سلاسل معالجة كاملة لتدفقات بيانات لا نهائية دون استهلاك أي ذاكرة وسيطة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-iterators-generators-streams",
          "starterCode": "def chunked_stream(stream: Iterator[T], chunk_size: int) -> Iterator[list[T]]:\n    \"\"\"\n    Consumes an arbitrary (potentially infinite) iterator stream and yields\n    fixed-size chunks as lists, consuming only O(chunk_size) memory.\n\n    Args:\n        stream: An input iterator stream.\n        chunk_size: Maximum number of items per chunk.\n\n    Yields:\n        Lists containing at most chunk_size items.\n    \"\"\"\n    # Yield remaining partial chunk if any exists\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "list(chunked_stream(iter([1, 2, 3, 4, 5]), 2))",
              "expected": "[[1, 2], [3, 4], [5]]"
            },
            {
              "input": "list(chunked_stream(iter([]), 3))",
              "expected": "[]"
            },
            {
              "input": "next(chunked_stream(iter(range(100)), 5))",
              "expected": "[0, 1, 2, 3, 4]"
            }
          ],
          "expectedOutput": "[[1, 2], [3, 4], [5]]",
          "variants": {
            "python": {
              "starterCode": "def chunked_stream(stream: Iterator[T], chunk_size: int) -> Iterator[list[T]]:\n    \"\"\"\n    Consumes an arbitrary (potentially infinite) iterator stream and yields\n    fixed-size chunks as lists, consuming only O(chunk_size) memory.\n\n    Args:\n        stream: An input iterator stream.\n        chunk_size: Maximum number of items per chunk.\n\n    Yields:\n        Lists containing at most chunk_size items.\n    \"\"\"\n    # Yield remaining partial chunk if any exists\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[[1, 2], [3, 4], [5]]"
            }
          },
          "solution": "from typing import Iterator, TypeVar\n\nT = TypeVar(\"T\")\n\ndef chunked_stream(stream: Iterator[T], chunk_size: int) -> Iterator[list[T]]:\n    \"\"\"\n    Consumes an arbitrary (potentially infinite) iterator stream and yields\n    fixed-size chunks as lists, consuming only O(chunk_size) memory.\n\n    Args:\n        stream: An input iterator stream.\n        chunk_size: Maximum number of items per chunk.\n\n    Yields:\n        Lists containing at most chunk_size items.\n    \"\"\"\n    chunk: list[T] = []\n\n    for item in stream:\n        chunk.append(item)\n        if len(chunk) == chunk_size:\n            yield chunk\n            chunk = []\n\n    # Yield remaining partial chunk if any exists\n    if chunk:\n        yield chunk"
        },
        "hints": {
          "tier1": {
            "en": "Accumulate incoming stream items into a `chunk` list.",
            "ar": "اجمع عناصر المجرى الواردة في قائمة `chunk` مؤقتة."
          },
          "tier2": {
            "en": "When `len(chunk) == chunk_size`, `yield chunk` and reset `chunk = []`.",
            "ar": "عندما يصل طول القائمة للحد المطلوب، أطلق `yield chunk` ثم صفّر القائمة."
          },
          "tier3": {
            "en": "Do not forget to yield any remaining non-empty chunk after the loop finishes.",
            "ar": "لا تنس إطلاق القائمة الجزئية المتبقية بعد نهاية الحلقة إن كانت تحوي عناصر."
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
            "en": "Why can you NOT index or slice a generator expression directly (e.g. `(x2 for x in range(10))[3:5]`)?",
            "ar": "لماذا لا يمكنك الوصول للعناصر بالأقواس المربعة أو تقطيع المولد مباشرة (مثل `(x2 for x in range(10))[3:5]`)؟"
          },
          "options": [
            {
              "text": {
                "en": "Generators do not store elements in memory; values are computed lazily on demand, so accessing index 4 requires computing elements 0, 1, 2, and 3 first.",
                "ar": "لا تخزن المولدات العناصر في الذاكرة، بل تُحسب بالطلب، لذا يتطلب الوصول للعنصر الرابع حساب العناصر السابقة أولاً."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because Python generators are executed on a separate background thread.",
                "ar": "لأن مولدات بايثون تُنفذ على خيط معالجة منفصل في الخلفية."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because square bracket syntax is reserved exclusively for built-in lists and dicts.",
                "ar": "لأن الأقواس المربعة محجوزة حصرياً للقوائم والقواميس المدمجة."
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
    "id": "context-managers-resources",
    "title": "Context Managers & Deterministic Resource Cleanup",
    "titleAr": "مديرو السياق (Context Managers) والإدارة الحتمية للموارد",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In production software, resources like open files, network sockets, database connections, and hardware locks are strictly finite.",
      "ar": "في الأنظمة الإنتاجية، تكون موارد النظام كالملفات، ومقابس الشبكة، واتصالات قواعد البيانات، وأقفال العتاد محدودة للغاية."
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
          "en": "In production software, resources like open files, network sockets, database connections, and hardware locks are strictly finite. If your program opens a file and crashes before reaching `file.close()`, that file descriptor leaks!\n\nA **Context Manager** (`with open(...) as f:`) is an **automatic airlock chamber**. When you enter the chamber, the outer doors seal and safety systems engage (`__enter__`). Even if an explosion occurs inside—whether an unexpected crash, an unhandled exception, or an early `return` statement—the safety protocol deterministically triggers on exit (`__exit__`), flushing buffers and releasing the resource back to the operating system safely.",
          "ar": "في الأنظمة الإنتاجية، تكون موارد النظام كالملفات، ومقابس الشبكة، واتصالات قواعد البيانات، وأقفال العتاد محدودة للغاية. فإذا فتح برنامجك ملفاً وتعطل قبل الوصول لسطر `file.close()`، يتسرب مورد النظام في الذاكرة (Resource Leak)!\n\n**مدير السياق** (`with open(...) as f:`) يشبه **غرفة عزل هوائية أوتوماتيكية**. عند دخولك، تؤمن البوابة المورد وتهيئه (`__enter__`). ومهما حدث داخل الغرفة—سواء انفجر استثناء مدمر، أو حدث خطأ غير متوقع، أو تم تنفيذ `return` مبكر—تضمن المنظومة حتمياً إغلاق المورد وتنظيف الذاكرة وتحريره لنظام التشغيل (`__exit__`)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{with } \\text{mgr} \\text{ as } v \\iff v = \\text{mgr}.\\_\\_\\text{enter}\\_\\_(); \\; \\text{try } \\text{body} \\; \\text{finally } \\text{mgr}.\\_\\_\\text{exit}\\_\\_(\\text{exc\\_info})",
        "formulaNote": {
          "en": "Context managers enforce deterministic acquisition and release of system resources, guaranteeing cleanup via the __enter__ and __exit__ protocol.",
          "ar": "يضمن مديرو السياق حتمية حجز وتحرير موارد النظام، مع ضمان التنظيف التام عبر بروتوكول __enter__ و __exit__."
        },
        "narrative": {
          "en": "Under the hood, Python compiles `with EXPR as VAR:` into a `SETUP_WITH` bytecode block wrapped in an implicit `try ... finally` structure. The `__exit__(self, exc_type, exc_val, exc_tb)` method receives the active exception details if an error occurred. If `__exit__` returns `True`, Python **suppresses** the exception, halting propagation. If it returns `False` or `None`, the exception continues propagating up the call stack.",
          "ar": "في الأنظمة الإنتاجية، تكون موارد النظام كالملفات، ومقابس الشبكة، واتصالات قواعد البيانات، وأقفال العتاد محدودة للغاية. فإذا فتح برنامجك ملفاً وتعطل قبل الوصول لسطر `file.close()`، يتسرب مورد النظام في الذاكرة (Resource Leak)!\n\n**مدير السياق** (`with open(...) as f:`) يشبه **غرفة عزل هوائية أوتوماتيكية**. عند دخولك، تؤمن البوابة المورد وتهيئه (`__enter__`). ومهما حدث داخل الغرفة—سواء انفجر استثناء مدمر، أو حدث خطأ غير متوقع، أو تم تنفيذ `return` مبكر—تضمن المنظومة حتمياً إغلاق المورد وتنظيف الذاكرة وتحريره لنظام التشغيل (`__exit__`).\n\nعلى مستوى شفرة البايت، يترجم بايثون جملة `with` إلى كتلة `SETUP_WITH` محاطة بهيكل `try ... finally` ضمني. تستقبل الدالة `__exit__(self, exc_type, exc_val, exc_tb)` تفاصيل الخطأ إن وقع استثناء. فإذا أعادت `True`، **يكتم** بايثون الخطأ ويمنع تصاعده؛ أما إذا أعادت `False` أو `None`، فيواصل الاستثناء تصاعده عبر مكدس الاستدعاء."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-context-managers-resources",
          "starterCode": "def execute_transaction_test(fail: bool) -> int:\n    \"\"\"Helper to verify AtomicDictTransaction commit and rollback behavior.\"\"\"\n    # Save a shallow copy snapshot of the dictionary state\n    # Rollback: restore dictionary to original snapshot\n    # Suppress the exception by returning True\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "execute_transaction_test(False)",
              "expected": "99"
            },
            {
              "input": "execute_transaction_test(True)",
              "expected": "1"
            },
            {
              "input": "isinstance(AtomicDictTransaction({}), AtomicDictTransaction)",
              "expected": "True"
            }
          ],
          "expectedOutput": "99",
          "variants": {
            "python": {
              "starterCode": "def execute_transaction_test(fail: bool) -> int:\n    \"\"\"Helper to verify AtomicDictTransaction commit and rollback behavior.\"\"\"\n    # Save a shallow copy snapshot of the dictionary state\n    # Rollback: restore dictionary to original snapshot\n    # Suppress the exception by returning True\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "99"
            }
          },
          "solution": "from typing import Any\n\nclass AtomicDictTransaction:\n    \"\"\"\n    A transactional context manager for dictionary modifications.\n    If an exception occurs within the 'with' block, all changes are rolled back.\n    If the block succeeds, changes are committed permanently.\n    \"\"\"\n    def __init__(self, target_dict: dict[str, Any]):\n        self.target_dict = target_dict\n        self._snapshot: dict[str, Any] = {}\n\n    def __enter__(self) -> dict[str, Any]:\n        # Save a shallow copy snapshot of the dictionary state\n        self._snapshot = self.target_dict.copy()\n        return self.target_dict\n\n    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> bool:\n        if exc_type is not None:\n            # Rollback: restore dictionary to original snapshot\n            self.target_dict.clear()\n            self.target_dict.update(self._snapshot)\n            # Suppress the exception by returning True\n            return True\n        return False\n\ndef execute_transaction_test(fail: bool) -> int:\n    \"\"\"Helper to verify AtomicDictTransaction commit and rollback behavior.\"\"\"\n    d = {\"val\": 1}\n    with AtomicDictTransaction(d):\n        d[\"val\"] = 99\n        if fail:\n            raise RuntimeError(\"simulated rollback\")\n    return d[\"val\"]"
        },
        "hints": {
          "tier1": {
            "en": "In `__enter__`, record `self._snapshot = self.target_dict.copy()`.",
            "ar": "في `__enter__`، احفظ لقطة من القاموس `self._snapshot = self.target_dict.copy()`."
          },
          "tier2": {
            "en": "In `__exit__`, check if `exc_type is not None` to detect errors and roll back.",
            "ar": "في `__exit__`، تحقق مما إذا كان `exc_type is not None` لاكتشاف الخطأ والتراجع عنه."
          },
          "tier3": {
            "en": "Returning `True` from `__exit__` suppresses the exception so execution can continue.",
            "ar": "إرجاع `True` من `__exit__` يكتم الخطأ ويسمح للبرنامج بمتابعة عمله."
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
            "en": "What is the consequence of returning `True` from a context manager's `__exit__` method when an exception occurs inside the `with` block?",
            "ar": "ما هي النتيجة المترتبة على إرجاع `True` من الدالة `__exit__` لمدير السياق عند حدوث استثناء داخل كتلة `with`؟"
          },
          "options": [
            {
              "text": {
                "en": "The exception is completely suppressed (silenced); execution resumes normally at the line immediately following the with block.",
                "ar": "يتم كتم الاستثناء تماماً؛ ويستأنف البرنامج تنفيذه طبيعياً من السطر الذي يلي كتلة with مباشرة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The exception is re-raised with a modified error message.",
                "ar": "تتم إعادة إطلاق الاستثناء مع تعديل رسالة الخطأ."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "It triggers an immediate rollback of all global variables in the Python runtime.",
                "ar": "يؤدي ذلك للتراجع الفوري عن كافة التعديلات في المتغيرات العامة للنظام."
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
    "id": "algorithmic-complexity-big-o",
    "title": "Algorithmic Complexity, Big-O Notation & Asymptotics",
    "titleAr": "التعقيد الخوارزمي، ترميز Big-O والتحليل المقارب",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Benchmarking code using a wall-clock stopwatch is deceptive: a supercomputer will execute poorly written code quickly on 100 rows, but that...",
      "ar": "قياس كفاءة الكود بساعة إيقاف الجدار أمر مضلل: فحاسوب خارق سينفذ كوداً رديئاً بسرعة على 100 سطر، لكن نفس الخوارزمية ستتجمد حين تُغذى بـ 10..."
    },
    "prerequisites": [
      "context-managers-resources"
    ],
    "x": 460,
    "y": 1220,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DunderProtocolDispatchLab",
        "narrative": {
          "en": "Benchmarking code using a wall-clock stopwatch is deceptive: a supercomputer will execute poorly written code quickly on 100 rows, but that same algorithm will freeze when fed 10,000,000 rows. **Big-O notation** does not measure seconds; it measures **how the operation count scales as the input size $n$ explodes toward infinity**.\n\n$O(1)$ is turning on a light switch: takes the exact same split-second whether your apartment is a tiny studio or a massive football stadium. $O(n)$ is reading every book on a library shelf one by one. $O(n^2)$ is every guest at a wedding shaking hands with every other guest. When $n = 1,000,000$, an $O(n)$ algorithm takes a fraction of a second, while an $O(n^2)$ algorithm requires 31.7 years of continuous computation!",
          "ar": "قياس كفاءة الكود بساعة إيقاف الجدار أمر مضلل: فحاسوب خارق سينفذ كوداً رديئاً بسرعة على 100 سطر، لكن نفس الخوارزمية ستتجمد حين تُغذى بـ 10 ملايين سطر. **ترميز Big-O** لا يقيس الثواني، بل يقيس **معدل تضاعف عدد العمليات الحسابية مع انفجار حجم المدخلات $n$ نحو اللانهاية**.\n\n$O(1)$ كضغط مفتاح المصباح: يستغرق نفس اللحظة سواء كانت الغرفة استوديو صغيراً أو ملعباً ضخماً. $O(n)$ هو قراءة كل كتاب في الرف كتاباً بعد كتاب. $O(n^2)$ هو مصافحة كل ضيف في حفل لجميع الضيوف الآخرين واحداً تلو الآخر. عندما يكون $n = 1,000,000$، تنهي خوارزمية $O(n)$ عملها في رمشة عين، بينما تحتاج خوارزمية $O(n^2)$ إلى 31.7 سنة من الحوسبة المتواصلة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(n) \\in \\mathcal{O}(g(n)) \\iff \\exists c > 0, n_0 \\in \\mathbb{N} : \\forall n \\ge n_0, \\; 0 \\le f(n) \\le c \\cdot g(n)",
        "formulaNote": {
          "en": "Big-O notation establishes an asymptotic upper bound on computational resource scaling as input dimension n approaches infinity.",
          "ar": "يحدد ترميز Big-O سقفاً مقارباً لمعدل نمو استهلاك الموارد الحسابية عندما يقترب بعد المدخلات n من اللانهاية."
        },
        "narrative": {
          "en": "Formally, $f(n) = O(g(n))$ states that beyond a threshold $n_0$, $f(n)$ is bounded above by $c \\cdot g(n)$. Asymptotic hierarchy orders complexities: $\\mathcal{O}(1) \\subset \\mathcal{O}(\\log n) \\subset \\mathcal{O}(n) \\subset \\mathcal{O}(n \\log n) \\subset \\mathcal{O}(n^2) \\subset \\mathcal{O}(2^n)$. In Python, checking `item in my_list` takes $O(n)$ time (linear scan), while `item in my_set` takes $O(1)$ time (hash lookup). Choosing the right data structure changes the asymptotic complexity class.",
          "ar": "قياس كفاءة الكود بساعة إيقاف الجدار أمر مضلل: فحاسوب خارق سينفذ كوداً رديئاً بسرعة على 100 سطر، لكن نفس الخوارزمية ستتجمد حين تُغذى بـ 10 ملايين سطر. **ترميز Big-O** لا يقيس الثواني، بل يقيس **معدل تضاعف عدد العمليات الحسابية مع انفجار حجم المدخلات $n$ نحو اللانهاية**.\n\n$O(1)$ كضغط مفتاح المصباح: يستغرق نفس اللحظة سواء كانت الغرفة استوديو صغيراً أو ملعباً ضخماً. $O(n)$ هو قراءة كل كتاب في الرف كتاباً بعد كتاب. $O(n^2)$ هو مصافحة كل ضيف في حفل لجميع الضيوف الآخرين واحداً تلو الآخر. عندما يكون $n = 1,000,000$، تنهي خوارزمية $O(n)$ عملها في رمشة عين، بينما تحتاج خوارزمية $O(n^2)$ إلى 31.7 سنة من الحوسبة المتواصلة!\n\nرياضياً، يعني $f(n) = O(g(n))$ أنه بعد عتبة معينة $n_0$، تكون الدالة $f(n)$ مقيدة من الأعلى بثابت $c \\cdot g(n)$. تتدرج التعقيدات في تسلسل هرمي: $\\mathcal{O}(1) \\subset \\mathcal{O}(\\log n) \\subset \\mathcal{O}(n) \\subset \\mathcal{O}(n \\log n) \\subset \\mathcal{O}(n^2) \\subset \\mathcal{O}(2^n)$. في بايثون، فحص `item in my_list` يستغرق زمناً خطياً $O(n)$، بينما فحص `item in my_set` يستغرق زمناً ثابتاً $O(1)$ عبر التجزئة. اختيار هيكل البيانات المناسب ينقل البرنامج بالكامل إلى فئة تعقيد متفوقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-algorithmic-complexity-big-o",
          "starterCode": "def find_two_sum_hash(nums: list[int], target: int) -> tuple[int, int] | None:\n    \"\"\"\n    Finds the two indices of numbers in `nums` that add up to `target`,\n    optimizing from naive O(n^2) double-loop search down to optimal O(n) time\n    using a hash map (dictionary) complement lookup.\n\n    Args:\n        nums: List of integers.\n        target: Target sum.\n\n    Returns:\n        Tuple of (index1, index2) or None if no such pair exists.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
          "testCases": [
            {
              "input": "find_two_sum_hash([2, 7, 11, 15], 9)",
              "expected": "(0, 1)"
            },
            {
              "input": "find_two_sum_hash([3, 2, 4], 6)",
              "expected": "(1, 2)"
            },
            {
              "input": "find_two_sum_hash([1, 2, 3], 100)",
              "expected": "None"
            }
          ],
          "expectedOutput": "(0, 1)",
          "variants": {
            "python": {
              "starterCode": "def find_two_sum_hash(nums: list[int], target: int) -> tuple[int, int] | None:\n    \"\"\"\n    Finds the two indices of numbers in `nums` that add up to `target`,\n    optimizing from naive O(n^2) double-loop search down to optimal O(n) time\n    using a hash map (dictionary) complement lookup.\n\n    Args:\n        nums: List of integers.\n        target: Target sum.\n\n    Returns:\n        Tuple of (index1, index2) or None if no such pair exists.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "(0, 1)"
            }
          },
          "solution": "def find_two_sum_hash(nums: list[int], target: int) -> tuple[int, int] | None:\n    \"\"\"\n    Finds the two indices of numbers in `nums` that add up to `target`,\n    optimizing from naive O(n^2) double-loop search down to optimal O(n) time\n    using a hash map (dictionary) complement lookup.\n\n    Args:\n        nums: List of integers.\n        target: Target sum.\n\n    Returns:\n        Tuple of (index1, index2) or None if no such pair exists.\n    \"\"\"\n    seen: dict[int, int] = {}\n\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return (seen[complement], i)\n        seen[num] = i\n\n    return None"
        },
        "hints": {
          "tier1": {
            "en": "Compute the complement `target - num` at each iteration.",
            "ar": "احسب المتمم `target - num` في كل دورة."
          },
          "tier2": {
            "en": "Check if `complement in seen` in O(1) time using a dictionary.",
            "ar": "تحقق من وجود المتمم في القاموس `complement in seen` بزمن O(1)."
          },
          "tier3": {
            "en": "Record `seen[num] = i` so future elements can find this index.",
            "ar": "سجل `seen[num] = i` لكي تتمكن العناصر اللاحقة من إيجاد هذا الفهرس."
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
            "en": "Algorithm A runs in $T_A(n) = 1{,}000{,}000 \\cdot n$ operations, while Algorithm B runs in $T_B(n) = 2 \\cdot n^2$ operations. For which range of input size $n$ is Algorithm B actually FASTER than Algorithm A?",
            "ar": "تستغرق الخوارزمية A زمناً قدره $T_A(n) = 1{,}000{,}000 \\cdot n$ عملية، بينما تستغرق الخوارزمية B زمناً قدره $T_B(n) = 2 \\cdot n^2$ عملية. في أي نطاق لحجم المدخلات $n$ تكون الخوارزمية B أسرع فعلياً من الخوارزمية A؟"
          },
          "options": [
            {
              "text": {
                "en": "For all n < 500,000 — Constant factors dominate for small inputs; asymptotic O(n) superiority only manifests once n exceeds 500,000.",
                "ar": "لكافة قيم n < 500,000 — فالعوامل الثابتة تحكم الأداء في المدخلات الصغيرة، ولا تظهر أفضلية O(n) إلا عندما يتجاوز n حاجز 500,000."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Algorithm A is always faster for all n because O(n) is mathematically smaller than O(n^2).",
                "ar": "الخوارزمية A أسرع دائماً لكافة قيم n لأن O(n) أصغر رياضياً من O(n^2)."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Algorithm B is faster only when n exceeds 1,000,000.",
                "ar": "الخوارزمية B أسرع فقط عندما يتجاوز n المليون."
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
    "id": "sorting-divide-and-conquer",
    "title": "Sorting Algorithms & Divide-and-Conquer Recurrences",
    "titleAr": "خوارزميات الترتيب، فرّق تسُد (Divide and Conquer)، ومبرهنة التكرار",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Sorting an unsorted deck of 1,000 cards by comparing each card to all others takes nearly a million comparisons ($O(n^2)$).",
      "ar": "ترتيب كومة من 1000 ورقة بمقارنة كل ورقة بجميع الأوراق الأخرى يتطلب ما يقارب مليون مقارنة ($O(n^2)$)! مبدأ فرّق تسُد (Divide and Conquer) هو..."
    },
    "prerequisites": [
      "algorithmic-complexity-big-o"
    ],
    "x": 445,
    "y": 1315,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "IteratorStateMachineCanvas",
        "narrative": {
          "en": "Sorting an unsorted deck of 1,000 cards by comparing each card to all others takes nearly a million comparisons ($O(n^2)$). **Divide and Conquer** is the ultimate problem-solving weapon: if a problem is too big to solve at once, chop it in half!\n\nSorting a deck of 1 card is trivially easy (it is already sorted!). So we keep splitting our list in half recursively until we have single-card piles, and then we **merge** them: comparing only the two visible cards on top of each pile and zipping them together like teeth on a jacket zipper in linear time $O(n)$! This cuts the total work down to $O(n \\log n)$. Python's real sorting engine, **Timsort**, combines Merge Sort with Insertion Sort to exploit naturally occurring ordered runs in real-world data with unmatched speed.",
          "ar": "ترتيب كومة من 1000 ورقة بمقارنة كل ورقة بجميع الأوراق الأخرى يتطلب ما يقارب مليون مقارنة ($O(n^2)$)! مبدأ **فرّق تسُد (Divide and Conquer)** هو السلاح الأقوى في علوم الحاسوب: إن كانت المسألة شاقة وكبيرة، اقسمها إلى نصفين!\n\nترتيب كومة من ورقة واحدة أمر بديهي منجز تلقائياً! لذا نقسم القائمة إلى نصفين بالتكرار الذاتي حتى نصل لأكوام من ورقة واحدة، ثم ندمجها (Merge): نقارن فقط الورقتين الظاهرتين في قمة كل كومة، وندمجهما معاً كأسنَان سحاب السترة في زمن خطي $O(n)$! هذا يقلص التعقيد الإجمالي إلى $O(n \\log n)$. محرك الترتيب الفعلي في بايثون، **Timsort**، يدمج خوارزمية الدمج مع الإدراج ليستغل المقاطع المرتبة مسبقاً في البيانات الحقيقية بسرعة خارقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T(n) = 2 T(n/2) + \\mathcal{O}(n) \\implies T(n) = \\Theta(n \\log n), \\quad \\log_2(n!) = \\Omega(n \\log n)",
        "formulaNote": {
          "en": "Divide-and-conquer recurrence reaches the information-theoretic lower bound of comparison-based sorting Omega(n log n).",
          "ar": "تحقق علاقة التكرار لمبدأ فرّق تسُد الحد الأدنى النظري لخوارزميات الترتيب القائمة على المقارنة Omega(n log n)."
        },
        "narrative": {
          "en": "By the Master Theorem, the recurrence $T(n) = 2T(n/2) + cn$ resolves to $\\Theta(n \\log_2 n)$. The information-theoretic lower bound for comparison sorting proves that any decision tree sorting $n$ elements requires height $h \\ge \\log_2(n!) = \\Omega(n \\log n)$. Merge Sort is a **stable sort**: it guarantees that two items with equal keys maintain their original relative order, a critical property when sorting records on multiple secondary fields.",
          "ar": "ترتيب كومة من 1000 ورقة بمقارنة كل ورقة بجميع الأوراق الأخرى يتطلب ما يقارب مليون مقارنة ($O(n^2)$)! مبدأ **فرّق تسُد (Divide and Conquer)** هو السلاح الأقوى في علوم الحاسوب: إن كانت المسألة شاقة وكبيرة، اقسمها إلى نصفين!\n\nترتيب كومة من ورقة واحدة أمر بديهي منجز تلقائياً! لذا نقسم القائمة إلى نصفين بالتكرار الذاتي حتى نصل لأكوام من ورقة واحدة، ثم ندمجها (Merge): نقارن فقط الورقتين الظاهرتين في قمة كل كومة، وندمجهما معاً كأسنَان سحاب السترة في زمن خطي $O(n)$! هذا يقلص التعقيد الإجمالي إلى $O(n \\log n)$. محرك الترتيب الفعلي في بايثون، **Timsort**، يدمج خوارزمية الدمج مع الإدراج ليستغل المقاطع المرتبة مسبقاً في البيانات الحقيقية بسرعة خارقة.\n\nوفق مبرهنة الأستاذ (Master Theorem)، تحل علاقة التكرار $T(n) = 2T(n/2) + cn$ إلى التعقيد المقارب $\\Theta(n \\log_2 n)$. ويثبت الحد الأدنى النظري للمعلومات أن أي شجرة قرارات لترتيب $n$ عنصراً تتطلب عمقاً $h \\ge \\log_2(n!) = \\Omega(n \\log n)$. خوارزمية دمج المجموعات هي **ترتيب مستقر (Stable Sort)**: تضمن بقاء الترتيب النسبي للعناصر ذات المفاتيح المتساوية كما كان في الأصل، وهي ميزة حاسمة عند فرز الجداول متعددة الأعمدة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-sorting-divide-and-conquer",
          "starterCode": "def merge(left: list[int], right: list[int]) -> list[int]:\n    \"\"\"Merges two sorted lists into a single sorted list in O(len(left) + len(right)) time.\"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
          "testCases": [
            {
              "input": "merge_sort([38, 27, 43, 3, 9, 82, 10])",
              "expected": "[3, 9, 10, 27, 38, 43, 82]"
            },
            {
              "input": "merge_sort([])",
              "expected": "[]"
            },
            {
              "input": "merge_sort([5, 4, 3, 2, 1])",
              "expected": "[1, 2, 3, 4, 5]"
            }
          ],
          "expectedOutput": "[3, 9, 10, 27, 38, 43, 82]",
          "variants": {
            "python": {
              "starterCode": "def merge(left: list[int], right: list[int]) -> list[int]:\n    \"\"\"Merges two sorted lists into a single sorted list in O(len(left) + len(right)) time.\"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "[3, 9, 10, 27, 38, 43, 82]"
            }
          },
          "solution": "def merge(left: list[int], right: list[int]) -> list[int]:\n    \"\"\"Merges two sorted lists into a single sorted list in O(len(left) + len(right)) time.\"\"\"\n    merged: list[int] = []\n    i = j = 0\n\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i])\n            i += 1\n        else:\n            merged.append(right[j])\n            j += 1\n\n    merged.extend(left[i:])\n    merged.extend(right[j:])\n    return merged\n\ndef merge_sort(arr: list[int]) -> list[int]:\n    \"\"\"\n    Pure divide-and-conquer Merge Sort algorithm.\n\n    Args:\n        arr: Unsorted list of integers.\n\n    Returns:\n        A brand new sorted list.\n    \"\"\"\n    if len(arr) <= 1:\n        return arr[:]\n\n    mid = len(arr) // 2\n    left_sorted = merge_sort(arr[:mid])\n    right_sorted = merge_sort(arr[mid:])\n\n    return merge(left_sorted, right_sorted)"
        },
        "hints": {
          "tier1": {
            "en": "Base case: if `len(arr) <= 1`, return `arr[:]` immediately.",
            "ar": "شرط التوقف: إذا كان طول المصفوفة 1 أو أقل أعد نسخة منها فوراً."
          },
          "tier2": {
            "en": "Split at `mid = len(arr) // 2` and recursively sort left and right halves.",
            "ar": "اقسم عند المنتصف واستدعِ الفرز ذاتياً للنصفين الأيمن والأيسر."
          },
          "tier3": {
            "en": "Zip the two sorted halves together using two pointers in the `merge()` helper.",
            "ar": "ادمج النصفين المرتبين معاً باستخدام مؤشرين في دالة `merge` المساعدة."
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
            "en": "What does 'stability' mean in sorting algorithms, and why is Timsort's stability essential in real-world data pipelines?",
            "ar": "ماذا يعني 'استقرار' خوارزمية الترتيب (Sorting Stability)، ولماذا يُعد استقرار Timsort حيوياً في معالجة البيانات الواقعية؟"
          },
          "options": [
            {
              "text": {
                "en": "A stable sort preserves the original relative order of elements that have equal keys, allowing sequential multi-column sorting (e.g. sorting by name, then by department).",
                "ar": "يحافظ الترتيب المستقر على الترتيب النسبي الأصلي للعناصر ذات المفاتيح المتساوية، مما يتيح الترتيب التتابعي متعدد الأعمدة (مثل الفرز بالاسم ثم بالقسم)."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "A stable sort guarantees that the algorithm will never raise memory allocation exceptions during execution.",
                "ar": "يعني أن الخوارزمية تضمن عدم إطلاق أي استثناءات لنفاد الذاكرة أثناء التنفيذ."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "A stable sort runs in identical execution time on all hardware architectures.",
                "ar": "يعني أن زمن تنفيذ الخوارزمية متطابق عبر كافة المعالجات والأنظمة."
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
    "id": "memory-profiling-cpython",
    "title": "CPython Memory Architecture & Cache Locality",
    "titleAr": "معمارية ذاكرة CPython، تجميع القمامة، وتمركز الذاكرة المخبأة (Cache Locality)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In high-level Python, memory feels transparent and boundless. But under the hood, every single integer is not a naked 8-byte CPU number: it...",
      "ar": "في بايثون، تبدو الذاكرة مجرد فضاء شفاف لا نهائي. لكن خلف الكواليس، الرقم الصحيح ليس مجرد 8 بايتات، بل هو كائن PyLongObject كامل يزن 28..."
    },
    "prerequisites": [
      "sorting-divide-and-conquer"
    ],
    "x": 460,
    "y": 1410,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GeneratorSuspensionLab",
        "narrative": {
          "en": "In high-level Python, memory feels transparent and boundless. But under the hood, every single integer is not a naked 8-byte CPU number: it is a full `PyLongObject` struct weighing **28 bytes**! Why? Because it requires an 8-byte reference count (`ob_refcnt`), an 8-byte type pointer (`ob_type`), an 8-byte size descriptor, and digit payloads.\n\nCPython manages memory in three specialized tiers: the OS system allocator, the `pymalloc` small-object allocator (dividing memory into 256KB Arenas, 4KB Pools, and Size-Class Blocks up to 512 bytes), and cyclic Garbage Collection (Gen 0, 1, 2). Modern CPUs are 100x faster than DRAM. When your CPU accesses memory, it pulls an entire 64-byte **Cache Line** into ultra-fast L1 cache. Because Python lists are arrays of pointers scattered across the heap, following them requires 'pointer chasing'—causing CPU cache misses that stall execution!",
          "ar": "في بايثون، تبدو الذاكرة مجرد فضاء شفاف لا نهائي. لكن خلف الكواليس، الرقم الصحيح ليس مجرد 8 بايتات، بل هو كائن `PyLongObject` كامل يزن **28 بايتاً** على الأقل! لأنه يحمل عداد مراجع 8 بايت، ومؤشر نوع 8 بايت، وحجم خانات 8 بايت، ثم بيانات الرقم.\n\nتدير بايثون الذاكرة عبر 3 طبقات متخصصة: مخصص نظام التشغيل، ومخصص الكائنات الصغيرة `pymalloc` (المقسم إلى حلبات Arenas بحجم 256KB، وأحواض Pools بحجم 4KB، وكتل Blocks حتى 512 بايتاً)، وجامع القمامة الدوري (الأجيال 0، 1، 2). المعالجات الحديثة أسرع بـ 100 ضعف من ذاكرة RAM العادية؛ وعندما يقرأ المعالج البيانات، يسحب **خط كاش (Cache Line)** كاملاً بحجم 64 بايتاً إلى ذاكرة L1 الخاطفة. ولأن قوائم بايثون مصفوفات من المؤشرات لكائنات مبعثرة في الكومة، فإن ملاحقة تلك المؤشرات ('Pointer Chasing') تسبب إخفاقات كاش وتوقف المعالج عن العمل في انتظار الذاكرة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Latency}: \\text{L1 } (1\\text{ ns}) \\ll \\text{L2 } (4\\text{ ns}) \\ll \\text{L3 } (10\\text{ ns}) \\ll \\text{DRAM } (80\\text{ ns}), \\quad \\text{Arena (256KB)} \\to \\text{Pool (4KB)} \\to \\text{Block}",
        "formulaNote": {
          "en": "CPython manages small objects through pymalloc arenas, pools, and blocks, while CPU cache line locality dictates real-world data throughput.",
          "ar": "يدير CPython الكائنات الصغيرة عبر حلبات وأحواض وكتل pymalloc، بينما يحدد تمركز خطوط الكاش في المعالج سرعة تدفق البيانات الحقيقية."
        },
        "narrative": {
          "en": "Cyclic reference garbage collection resolves circular topologies ($A \\to B \\to A$) that simple reference counting cannot free. CPython groups objects into three generations (Gen 0, Gen 1, Gen 2). Newly allocated objects enter Gen 0. If they survive a collection pass, they are promoted to older, less frequently collected generations. For data engineering and AI, understanding cache lines explains why contiguous C-buffers like NumPy arrays outperform standard Python lists by 50x to 100x: NumPy aligns data contiguously in memory, saturating 64-byte cache lines without pointer indirection.",
          "ar": "في بايثون، تبدو الذاكرة مجرد فضاء شفاف لا نهائي. لكن خلف الكواليس، الرقم الصحيح ليس مجرد 8 بايتات، بل هو كائن `PyLongObject` كامل يزن **28 بايتاً** على الأقل! لأنه يحمل عداد مراجع 8 بايت، ومؤشر نوع 8 بايت، وحجم خانات 8 بايت، ثم بيانات الرقم.\n\nتدير بايثون الذاكرة عبر 3 طبقات متخصصة: مخصص نظام التشغيل، ومخصص الكائنات الصغيرة `pymalloc` (المقسم إلى حلبات Arenas بحجم 256KB، وأحواض Pools بحجم 4KB، وكتل Blocks حتى 512 بايتاً)، وجامع القمامة الدوري (الأجيال 0، 1، 2). المعالجات الحديثة أسرع بـ 100 ضعف من ذاكرة RAM العادية؛ وعندما يقرأ المعالج البيانات، يسحب **خط كاش (Cache Line)** كاملاً بحجم 64 بايتاً إلى ذاكرة L1 الخاطفة. ولأن قوائم بايثون مصفوفات من المؤشرات لكائنات مبعثرة في الكومة، فإن ملاحقة تلك المؤشرات ('Pointer Chasing') تسبب إخفاقات كاش وتوقف المعالج عن العمل في انتظار الذاكرة!\n\nيعالج جامع القمامة الدوري مشكلة المراجع الدائرية ($A \\to B \\to A$) التي يعجز عداد المراجع البسيط عن تحريرها. يقسم CPython الكائنات إلى 3 أجيال (Gen 0, 1, 2)؛ تدخل الكائنات الجديدة الجيل 0، وكلما صمدت أمام دورات الجمع رُقيت إلى أجيال أقدم تُفحص على فترات متباعدة. وفي هندسة البيانات والذكاء الاصطناعي، يفسر مبدأ خطوط الكاش سبب تفوق مصفوفات NumPy المتجاورة على قوائم بايثون بـ 50 إلى 100 ضعف: تُرص بيانات NumPy متجاورة في الذاكرة، فتملأ خطوط الكاش الـ 64-بت دون أي تشتيت للمؤشرات."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-memory-profiling-cpython",
          "starterCode": "def detect_and_collect_cycles() -> dict[str, int]:\n    \"\"\"\n    Demonstrates CPython's cyclic garbage collection mechanics by constructing\n    an isolated reference cycle, unbinding local variables, and invoking gc.collect().\n\n    Returns:\n        dict containing:\n          - 'collected_objects': Number of unreachable cyclic objects collected by GC.\n          - 'unreachable_count': Confirms cyclic collection succeeded (> 0).\n    \"\"\"\n    # Disable automatic GC temporarily to inspect deterministic collection\n    # Step 1: Create a reference cycle\n    # Step 2: Delete local references; reference count remains 1 due to the cycle\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "detect_and_collect_cycles()['is_cycle_detected']",
              "expected": "1"
            },
            {
              "input": "detect_and_collect_cycles()['collected_objects'] >= 2",
              "expected": "True"
            },
            {
              "input": "isinstance(detect_and_collect_cycles(), dict)",
              "expected": "True"
            }
          ],
          "expectedOutput": "1",
          "variants": {
            "python": {
              "starterCode": "def detect_and_collect_cycles() -> dict[str, int]:\n    \"\"\"\n    Demonstrates CPython's cyclic garbage collection mechanics by constructing\n    an isolated reference cycle, unbinding local variables, and invoking gc.collect().\n\n    Returns:\n        dict containing:\n          - 'collected_objects': Number of unreachable cyclic objects collected by GC.\n          - 'unreachable_count': Confirms cyclic collection succeeded (> 0).\n    \"\"\"\n    # Disable automatic GC temporarily to inspect deterministic collection\n    # Step 1: Create a reference cycle\n    # Step 2: Delete local references; reference count remains 1 due to the cycle\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1"
            }
          },
          "solution": "import gc\nfrom typing import Any\n\ndef detect_and_collect_cycles() -> dict[str, int]:\n    \"\"\"\n    Demonstrates CPython's cyclic garbage collection mechanics by constructing\n    an isolated reference cycle, unbinding local variables, and invoking gc.collect().\n\n    Returns:\n        dict containing:\n          - 'collected_objects': Number of unreachable cyclic objects collected by GC.\n          - 'unreachable_count': Confirms cyclic collection succeeded (> 0).\n    \"\"\"\n    # Disable automatic GC temporarily to inspect deterministic collection\n    gc.disable()\n\n    # Step 1: Create a reference cycle\n    node_a: list[Any] = []\n    node_b: list[Any] = []\n    node_a.append(node_b)\n    node_b.append(node_a)\n\n    # Step 2: Delete local references; reference count remains 1 due to the cycle\n    del node_a\n    del node_b\n\n    # Step 3: Run full cyclic garbage collection\n    collected = gc.collect()\n\n    # Re-enable automatic garbage collection\n    gc.enable()\n\n    return {\n        \"collected_objects\": collected,\n        \"is_cycle_detected\": 1 if collected >= 2 else 0,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Create circular lists `a.append(b)` and `b.append(a)`.",
            "ar": "أنشئ قائمتين ترجع كل منهما للأخرى `a.append(b)` و `b.append(a)`."
          },
          "tier2": {
            "en": "Delete local names using `del node_a; del node_b` so only the internal cycle remains.",
            "ar": "احذف الأسماء المحلية `del node_a; del node_b` ليبقى المرجع الدائري الداخلي فقط."
          },
          "tier3": {
            "en": "Call `gc.collect()` to trigger the generational cyclic garbage collector.",
            "ar": "استدعِ `gc.collect()` لتشغيل جامع القمامة الدوري واستعادة الذاكرة."
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
            "en": "Why does summing 10,000,000 numbers in a contiguous NumPy array run 50x-100x faster than summing a Python list of the same numbers, even though both reside in RAM?",
            "ar": "لماذا يستغرق جمع 10 ملايين رقم في مصفوفة NumPy المتجاورة زمناً أسرع بـ 50 إلى 100 ضعف من جمع نفس الأرقام في قائمة بايثون، مع أن كليهما يقيم في ذاكرة RAM؟"
          },
          "options": [
            {
              "text": {
                "en": "Cache Locality & SIMD: NumPy stores raw contiguous bytes, pulling 8 doubles per 64-byte CPU cache line without pointer chasing; Python lists are scattered pointer arrays causing frequent L1 cache misses and PyObject boxing overhead.",
                "ar": "تمركز الذاكرة الكاش والعمليات المتجهة (SIMD): يخزن NumPy بايتات خاماً متجاورة فيسحب 8 أرقام لكل خط كاش (64 بايت) دون ملاحقة مؤشرات؛ بينما قوائم بايثون مصفوفات مؤشرات مبعثرة تسبب إخفاقات متكررة في ذاكرة L1 وتغليف PyObject ثقيل."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because NumPy compiles mathematical formulas into quantum GPU kernels on every iteration.",
                "ar": "لأن NumPy يترجم المعادلات الحسابية إلى أنوية رسومية خارقة في كل دورة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because Python lists compress integer numbers using gzip algorithms in memory.",
                "ar": "لأن قوائم بايثون تضغط الأرقام باستخدام خوارزميات الضغط في الذاكرة."
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
    "id": "numpy-vectorization",
    "title": "SIMD Architecture & Contiguous Buffer Vectorization",
    "titleAr": "معمارية SIMD وتوجيه المخازن الذاكرية المتصلة في NumPy",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why is pure Python code so slow for numerical data science compared to NumPy or C? If you write a standard Python for loop to add two lists...",
      "ar": "لماذا تُعد لغة بايثون النقية شديدة البطء في الحسابات العددية وهندسة البيانات مقارنة بـ NumPy أو C؟ إذا كتبت حلقة for عادية لجمع قائمتين..."
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
          "en": "Why is pure Python code so slow for numerical data science compared to NumPy or C? If you write a standard Python `for` loop to add two lists of 1,000,000 numbers, execution takes roughly 100 milliseconds. In NumPy, that identical operation finishes in under 1 millisecond—over 100 times faster!\n\nIs CPython lazy? No. The bottleneck lies in how Python stores numbers in memory.",
          "ar": "لماذا تُعد لغة بايثون النقية شديدة البطء في الحسابات العددية وهندسة البيانات مقارنة بـ NumPy أو C؟ إذا كتبت حلقة `for` عادية لجمع قائمتين تحوي كل منهما 1,000,000 رقم، فستستغرق العملية حوالي 100 مللي ثانية. بينما تنجز مكتبة NumPy العملية نفسها في أقل من مللي ثانية واحدة—أي أسرع بأكثر من 100 ضعف!\n\n### تشبيه المطبخ: الطاهي البيروقراطي مقابل خط التجميع الآلي\nتخيل مطعماً مطلوباً منه تتبيل مليون طبق حساء:\n- **بايثون النقية (حلقة `for`)**: يقوم طاهٍ وحيد بإعداد كل طبق على حدة. عند كل طبق، يمشي إلى المستودع (تتبع المؤشرات في الذاكرة Pointer Dereferencing)، ويفحص ملصق العلبة ليتأكد أنها ملح وليست سكراً (فحص الأنواع الديناميكي Dynamic Type-Checking)، ويفتح الغطاء الكرتوني (إلغاء التغليف Unboxing)، ثم يضع ذرة ملح (حساب المعالج ALU)، ثم يغلف الناتج في صندوق كرتوني جديد (Boxing). تتكرر هذه المعاناة البيروقراطية مليون مرة!\n- **التوجيه في NumPy (معمارية SIMD)**: توضع أطباق الحساء المليون على شريط فولاذي ناقل متصل فيزيائياً دون انقطاع في الذاكرة (Contiguous Buffer). وتهبط ذراع آلية صناعية مزودة بـ 4 أو 8 أو 16 ملعقة متوازية (سجلات AVX SIMD - تعليمة واحدة لبيانات متعددة) لتتبيل الدفعة كاملة في نبضة ساعة واحدة للمعالج دون أي قفزات عشوائية في الذاكرة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T_{\\text{CPython}} = N \\cdot \\left( \\tau_{\\text{dispatch}} + \\tau_{\\text{deref}} + \\tau_{\\text{typecheck}} + \\tau_{\\text{unbox}} + \\tau_{\\text{alu}} + \\tau_{\\text{box}} \\right) \\quad \\gg \\quad T_{\\text{SIMD}} = \\left\\lceil \\frac{N}{W_{\\text{SIMD}}} \\right\\rceil \\cdot \\tau_{\\text{vector\\_alu}} + \\tau_{\\text{load}}",
        "formulaNote": {
          "en": "Execution latency breakdown comparing scalar bytecode interpretation against vectorized SIMD hardware execution.",
          "ar": "مقارنة زمن التنفيذ بين حلقة مفسر بايثون التكرارية وتنفيذ عتاد SIMD الموجه."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal latency equations illustrate why vectorized memory buffers yield a two-order-of-magnitude acceleration:\n\n- **$N$**: Total number of elements in the vector ($N \\in \\mathbb{N}$).\n- **$\\tau_{\\text{dispatch}}$**: Bytecode evaluation loop overhead per opcode in CPython ($~15-25$ CPU cycles).\n- **$\\tau_{\\text{deref}}$**: Latency to dereference non-contiguous heap pointers from `PyListObject` to `PyObject` ($~50-200$ cycles on cache miss).\n- **$\\tau_{\\text{typecheck}}$**: Dynamic inspection of `ob_type` tag.\n- **$\\tau_{\\text{unbox}}, \\tau_{\\text{box}}$**: Allocating and deallocating 28-byte `PyFloatObject` wrappers.\n- **$W_{\\text{SIMD}}$**: Hardware vector register capacity (e.g., $W=4$ for 256-bit AVX2 with `float64`, $W=8$ for 512-bit AVX-512).\n- **$\\tau_{\\text{vector\\_alu}}$**: Throughput latency for a vectorized fused instruction (e.g., `_mm256_add_pd`, typically 1 CPU cycle).\n- **$\\tau_{\\text{load}}$**: Hardware prefetch streaming bandwidth from CPU L1/L2 cache lines (64 bytes per transaction).\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتوضح معادلات زمن التنفيذ الرياضية سبب تفوق المخازن الذاكرية المتصلة بمقدار مضاعف:\n- **$N$**: إجمالي عدد العناصر في المتجه.\n- **$\\tau_{\\text{dispatch}}$**: العبء الزمني لمفسر البايت كود عند كل دورة ($15-25$ دورة معالج).\n- **$\\tau_{\\text{deref}}$**: زمن تتبع مؤشرات الذاكرة المبعثرة في فضاء الذاكرة العام ($50-200$ دورة عند إخفاق الذاكرة المخبأة).\n- **$\\tau_{\\text{typecheck}}$**: التحقق الديناميكي من نوع الكائن البرمجي.\n- **$\\tau_{\\text{unbox}}, \\tau_{\\text{box}}$**: فك وتغليف كائنات `PyFloatObject` ذات حجم 28 بايت.\n- **$W_{\\text{SIMD}}$**: عرض سجلات التوجيه العتادية (مثلاً 4 أرقام مزدوجة الدقة بسجلات AVX2 سعة 256 بت).\n- **$\\tau_{\\text{vector\\_alu}}$**: زمن تنفيذ التعليمة المتجهة الواحدة في عتاد المعالج (دورة معالج واحدة عادة).\n- **$\\tau_{\\text{load}}$**: سرعة جلب خطوط الذاكرة المخبأة L1/L2 (64 بايت في كل قراءة متصلة)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-numpy-vectorization",
          "starterCode": "import numpy as np\n\ndef vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:\n    \"\"\"\n    Computes the mean Huber loss between true and predicted targets using\n    SIMD-vectorized NumPy operations without Python loops.\n\n    Formula:\n        loss = 0.5 * (y_true - y_pred)^2                  if |y_true - y_pred| <= delta\n        loss = delta * (|y_true - y_pred| - 0.5 * delta)  otherwise\n\n    Args:\n        y_true: 1D NumPy array of ground truth targets.\n        y_pred: 1D NumPy array of model predictions.\n        delta: Threshold separating quadratic and linear penalty regimes.\n\n    Returns:\n        Scalar float representing mean Huber loss across all samples.\n    \"\"\"\n    # Step 1: Ensure contiguous float64 NumPy arrays\n    # Step 2: Compute absolute residuals: errors = np.abs(y_true - y_pred)\n    # Step 3: Compute quadratic branch: 0.5 * (errors ** 2)\n    # Step 4: Compute linear branch: delta * (errors - 0.5 * delta)\n    # Step 5: Combine branches branchlessly via np.where, and return mean as float\n    raise NotImplementedError(\"Implement vectorized_huber_loss\")",
          "testCases": [
            {
              "input": "round(vectorized_huber_loss(np.array([1.0, 2.0]), np.array([1.0, 2.0])), 2)",
              "expected": "0.0"
            },
            {
              "input": "round(vectorized_huber_loss(np.array([1.0, 5.0]), np.array([1.0, 2.0]), delta=1.0), 2)",
              "expected": "1.25"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:\n    \"\"\"\n    Computes the mean Huber loss between true and predicted targets using\n    SIMD-vectorized NumPy operations without Python loops.\n\n    Formula:\n        loss = 0.5 * (y_true - y_pred)^2                  if |y_true - y_pred| <= delta\n        loss = delta * (|y_true - y_pred| - 0.5 * delta)  otherwise\n\n    Args:\n        y_true: 1D NumPy array of ground truth targets.\n        y_pred: 1D NumPy array of model predictions.\n        delta: Threshold separating quadratic and linear penalty regimes.\n\n    Returns:\n        Scalar float representing mean Huber loss across all samples.\n    \"\"\"\n    # Step 1: Ensure contiguous float64 NumPy arrays\n    # Step 2: Compute absolute residuals: errors = np.abs(y_true - y_pred)\n    # Step 3: Compute quadratic branch: 0.5 * (errors ** 2)\n    # Step 4: Compute linear branch: delta * (errors - 0.5 * delta)\n    # Step 5: Combine branches branchlessly via np.where, and return mean as float\n    raise NotImplementedError(\"Implement vectorized_huber_loss\")",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:\n    # Ensure float64 C-contiguous memory layout\n    y_t = np.asarray(y_true, dtype=np.float64)\n    y_p = np.asarray(y_pred, dtype=np.float64)\n    \n    # Vectorized element-wise residual calculation\n    errors = np.abs(y_t - y_p)\n    \n    # Vectorized branchless condition mapping via SIMD instructions\n    quadratic = 0.5 * (errors ** 2)\n    linear = delta * (errors - 0.5 * delta)\n    losses = np.where(errors <= delta, quadratic, linear)\n    \n    return float(np.mean(losses))"
        },
        "hints": {
          "tier1": {
            "en": "Use `np.abs(y_true - y_pred)` to calculate absolute error residuals without looping.",
            "ar": "استخدم `np.abs(y_true - y_pred)` لحساب الفروق المطلقة دفعة واحدة دون حلقات تكرار."
          },
          "tier2": {
            "en": "Compute both `quadratic` and `linear` loss arrays using vectorized arithmetic, then select with `np.where(errors <= delta, quadratic, linear)`.",
            "ar": "احسب مصفوفتي الخطأ التربيعي والخطي بعمليات موجهة، ثم ادمجهما بشرط `np.where(errors <= delta, quadratic, linear)`."
          },
          "tier3": {
            "en": "Calculate `float(np.mean(losses))` to return the final scalar loss.",
            "ar": "احسب المتوسط عبر `float(np.mean(losses))` لإرجاع القيمة العددية النهائية."
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
            "en": "In high-frequency algorithmic trading, order book updates arrive at 10,000,000 ticks/sec. A Python loop calculating mid-market spreads takes 1,400ms per batch, causing queue backpressure. Replacing it with contiguous NumPy vectorized operations drops latency to 4.2ms. Why does this 300x acceleration occur? - **(A)** *(Correct)* Contiguous buffer memory layout eliminates cache thrashing, allowing CPU hardware prefetchers to feed 256/512-bit AVX SIMD registers without pointer chasing or PyObject type inspection. - **(B)** NumPy compresses 64-bit floating point numbers into 8-bit integers using lossy quantization on the fly. - **(C)** NumPy automatically sends the computation to the graphics card (GPU) via background CUDA kernels. - **(D)** Python loops execute on a single core, whereas NumPy automatically launches a separate OS thread for every single array element. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** In contiguous RAM, sequential floats reside in adjacent memory addresses. The CPU hardware prefetcher loads entire 64-byte cache lines ahead of time, feeding SIMD execution units in lockstep.",
            "ar": "في معالجة بيانات التداول عالي التردد، تصل التحديثات بمعدل 10 ملايين صفقة/ثانية. تستغرق حلقة بايثون لحساب الفروق السعرية 1,400 مللي ثانية، مما يسبب اختناقاً في الطابور. عند استبدالها بعمليات NumPy الموجهة، ينخفض الزمن إلى 4.2 مللي ثانية. ما السبب الفيزيائي لهذا التسارع بمقدار 300 ضعف؟ - *Arabic:* التخزين المتصل يلغي تعثر الذاكرة المخبأة، مما يسمح لوحدات الجلب المسبق العتادية بتغذية سجلات AVX SIMD دون قفزات عشوائية أو فحص كائنات بايثون. - *Arabic:* تقوم مكتبة NumPy بضغط الأرقام العشرية إلى أعداد صحيحة سعة 8 بت عبر تكميم تقريبي أثناء التشغيل. - *Arabic:* تقوم NumPy بنقل الحسابات تلقائياً إلى معالج الرسوميات (GPU) عبر برمجيات CUDA الخفية. - *Arabic:* تنفذ حلقات بايثون على نواة واحدة، بينما تطلق NumPy خيط معالجة منفصل لنظام التشغيل عند كل عنصر. *التفسير الهندسي المعمق:* في الذاكرة المتصلة، تتجاور الأرقام في عناوين متتابعة. تقوم وحدة الجلب المسبق بتحميل خطوط الذاكرة المخبأة (64 بايت) مقدماً، مما يغذي مسارات المعالجة المتوازية بلا توقف."
          },
          "options": [
            {
              "text": {
                "en": "Contiguous buffer memory layout eliminates cache thrashing, allowing CPU hardware prefetchers to feed 256/512-bit AVX SIMD registers without pointer chasing or PyObject type inspection.",
                "ar": "-  التخزين المتصل يلغي تعثر الذاكرة المخبأة، مما يسمح لوحدات الجلب المسبق العتادية بتغذية سجلات AVX SIMD دون قفزات عشوائية أو فحص كائنات بايثون."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "NumPy compresses 64-bit floating point numbers into 8-bit integers using lossy quantization on the fly.",
                "ar": "-  تقوم مكتبة NumPy بضغط الأرقام العشرية إلى أعداد صحيحة سعة 8 بت عبر تكميم تقريبي أثناء التشغيل."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "NumPy automatically sends the computation to the graphics card (GPU) via background CUDA kernels.",
                "ar": "-  تقوم NumPy بنقل الحسابات تلقائياً إلى معالج الرسوميات (GPU) عبر برمجيات CUDA الخفية."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Python loops execute on a single core, whereas NumPy automatically launches a separate OS thread for every single array element.",
                "ar": "-  تنفذ حلقات بايثون على نواة واحدة، بينما تطلق NumPy خيط معالجة منفصل لنظام التشغيل عند كل عنصر."
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
    "id": "numpy-broadcasting-rules",
    "title": "Strided Memory Layout & Zero-Copy Slicing",
    "titleAr": "تخطيط الذاكرة ذو الخطوات (Strides) وتجزيء المصفوفات دون نسخ",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Physical computer memory (RAM) is strictly one-dimensional: it is a single straight line of numbered byte addresses.",
      "ar": "ذاكرة الحاسوب الفيزيائية (RAM) أحادية البعد تماماً: إنها شريط مستقيم واحد من عناوين البايتات المرقمة بالتسلسل."
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
          "en": "Physical computer memory (RAM) is strictly one-dimensional: it is a single straight line of numbered byte addresses. There is no physical 2D grid, 3D cube, or 4D tensor inside silicon chips!\n\nSo how does NumPy create a 2D matrix of shape `(3, 4)` containing 12 numbers? It lays out all 12 numbers in a single contiguous 1D line in RAM. But to make it behave like a 2D table, NumPy attaches a lightweight Array Metadata Header containing three numbers:\n1. **Base Pointer**: The starting memory address in RAM.\n2. **Shape**: The logical dimensions tuple, e.g., `(3, 4)`.\n3. **Strides**: The exact step size in bytes required to advance one position along each dimension!",
          "ar": "ذاكرة الحاسوب الفيزيائية (RAM) أحادية البعد تماماً: إنها شريط مستقيم واحد من عناوين البايتات المرقمة بالتسلسل. لا توجد شبكات ثنائية الأبعاد ولا مكعبات ثلاثية داخل رقاقات السيليكون!\n\nفكيف تنشئ مكتبة NumPy مصفوفة ثنائية الأبعاد بحجم `(3, 4)` تحوي 12 رقماً؟ تقوم برصف الأرقام الـ 12 في خط مستقيم واحد متصل في الذاكرة. ولكي تتصرف كمصفوفة، ترفق معها ترويسة بيانات وصفية خفيفة الوزن تحوي ثلاثة عناصر:\n1. **مؤشر الأساس (Base Pointer)**: عنوان أول بايت في الذاكرة.\n2. **الشكل (Shape)**: الأبعاد المنطقية، مثل `(3, 4)`.\n3. **الخطوات (Strides)**: عدد البايتات الدقيق الواجب قفزه للتقدم خطوة واحدة عبر كل بعد!\n\n### تشبيه الدرج: القفز فوق الدرجات\nتخيل أنك تصعد درجا مستقيماً طويلاً، حيث تمثل كل درجة رقماً مخزناً:\n- إذا تقدمت درجة واحدة للأمام، فإن مقدار خطوتك (Stride) هو درجة واحدة (8 بايت لرقم `float64`)، وهذا ينقلك إلى **العمود التالي**.\n- وللانتقال إلى **الصف التالي**، لن تبني سلماً جديداً! بل تقفز ساقك 4 درجات دفعة واحدة (32 بايت).\n- عندما تأخذ شريحة (Slice) أو نافذة متحركة، لا تقوم بايثون بنسخ أي بايت في الذاكرة؛ بل تكتفي بصنع بطاقة وصفية جديدة تحدد خطوات قفز مختلفة! هذا هو سر **التجزيء دون نسخ (Zero-Copy)**."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "s_{n-1} = w, \\quad s_k = s_{k+1} \\cdot d_{k+1} = w \\cdot \\prod_{j=k+1}^{n-1} d_j \\implies \\text{byte\\_offset}(\\mathbf{i}) = \\sum_{k=0}^{n-1} i_k \\cdot s_k",
        "formulaNote": {
          "en": "C-contiguous stride recurrence formula and physical byte offset projection for coordinate tuple i.",
          "ar": "صيغة تتابع الخطوات المتصلة وحساب إزاحة البايتات الفيزيائية لمتجه الإحداثيات."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe mathematical mapping translates a multidimensional logical index into a physical 1D byte address:\n\n- **$\\mathbf{i} = (i_0, i_1, \\dots, i_{n-1})$**: Multi-dimensional coordinate index tuple ($0 \\le i_k < d_k$).\n- **$d_k$**: Logical length (extent) of dimension axis $k$.\n- **$w$**: Byte width of the primitive element data type ($w = 8$ bytes for `float64` / `int64`, $w = 4$ for `float32`).\n- **$s_k$**: Byte stride along dimension axis $k$. In row-major (C-contiguous) layout, the last axis step is $s_{n-1} = w$.\n- **$\\text{byte\\_offset}(\\mathbf{i})$**: The physical memory address displacement added to the base pointer address.\n- **Zero-Copy Invariant**: Slicing modifications manipulate $s_k$ and $d_k$ in $O(1)$ constant time without allocating heap storage for buffer elements.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nيحول الإسقاط الرياضي إحداثيات المصفوفة متعددة الأبعاد إلى عنوان بايت فيزيائي أحادي البعد:\n- **$\\mathbf{i} = (i_0, i_1, \\dots, i_{n-1})$**: متجه الإحداثيات المنطقي لكل بعد.\n- **$d_k$**: طول البعد $k$.\n- **$w$**: حجم العنصر الأساسي بالبايت ($w=8$ لأرقام 64-بت، و $w=4$ لأرقام 32-بت).\n- **$s_k$**: خطوة البايتات (Stride) للبعد $k$. في الترتيب الصفي C-Contiguous، تكون خطوة البعد الأخير $s_{n-1} = w$.\n- **$\\text{byte\\_offset}(\\mathbf{i})$**: الإزاحة المكانية المضافة إلى عنوان المؤشر الأساسي في الذاكرة.\n- **ثابت انعدام النسخ**: عمليات التجزيء والقلب تعدل $s_k$ و $d_k$ بزمن ثابت $O(1)$ دون نسخ عناصر البيانات المخزنة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-numpy-broadcasting-rules",
          "starterCode": "import numpy as np\nfrom numpy.lib.stride_tricks import as_strided\n\ndef strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:\n    \"\"\"\n    Creates a 2D rolling window view of a 1D array with zero memory copies\n    using NumPy memory stride manipulation.\n\n    Args:\n        arr: 1D NumPy array of length N.\n        window_size: Window length W (1 <= W <= N).\n\n    Returns:\n        2D NumPy array of shape (N - W + 1, W) sharing the underlying buffer.\n    \"\"\"\n    # Step 1: Validate that arr is 1D and window_size satisfies 1 <= window_size <= len(arr)\n    # Step 2: Ensure contiguous buffer layout: c_arr = np.ascontiguousarray(arr)\n    # Step 3: Extract single element byte stride: elem_stride = c_arr.strides[0]\n    # Step 4: Define new shape: (N - window_size + 1, window_size)\n    # Step 5: Define new strides: (elem_stride, elem_stride)\n    # Step 6: Construct and return zero-copy view via as_strided(c_arr, shape=..., strides=..., writeable=False)\n    raise NotImplementedError(\"Implement strided_rolling_window\")",
          "testCases": [
            {
              "input": "strided_rolling_window(np.array([10, 20, 30, 40, 50]), 3).shape",
              "expected": "(3, 3)"
            },
            {
              "input": "strided_rolling_window(np.array([1, 2, 3, 4, 5]), 3).tolist()",
              "expected": "[[1, 2, 3], [2, 3, 4], [3, 4, 5]]"
            }
          ],
          "expectedOutput": "(3, 3)",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\nfrom numpy.lib.stride_tricks import as_strided\n\ndef strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:\n    \"\"\"\n    Creates a 2D rolling window view of a 1D array with zero memory copies\n    using NumPy memory stride manipulation.\n\n    Args:\n        arr: 1D NumPy array of length N.\n        window_size: Window length W (1 <= W <= N).\n\n    Returns:\n        2D NumPy array of shape (N - W + 1, W) sharing the underlying buffer.\n    \"\"\"\n    # Step 1: Validate that arr is 1D and window_size satisfies 1 <= window_size <= len(arr)\n    # Step 2: Ensure contiguous buffer layout: c_arr = np.ascontiguousarray(arr)\n    # Step 3: Extract single element byte stride: elem_stride = c_arr.strides[0]\n    # Step 4: Define new shape: (N - window_size + 1, window_size)\n    # Step 5: Define new strides: (elem_stride, elem_stride)\n    # Step 6: Construct and return zero-copy view via as_strided(c_arr, shape=..., strides=..., writeable=False)\n    raise NotImplementedError(\"Implement strided_rolling_window\")",
              "expectedOutput": "(3, 3)"
            }
          },
          "solution": "import numpy as np\nfrom numpy.lib.stride_tricks import as_strided\n\ndef strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:\n    if arr.ndim != 1:\n        raise ValueError(\"Input array must be 1-dimensional\")\n    n = arr.shape[0]\n    if window_size < 1 or window_size > n:\n        raise ValueError(\"window_size must satisfy 1 <= window_size <= len(arr)\")\n\n    # Ensure contiguous memory layout before inspecting byte strides\n    c_arr = np.ascontiguousarray(arr)\n    elem_stride = c_arr.strides[0]\n\n    num_windows = n - window_size + 1\n    new_shape = (num_windows, window_size)\n    new_strides = (elem_stride, elem_stride)\n\n    # Construct zero-copy strided view\n    return as_strided(c_arr, shape=new_shape, strides=new_strides, writeable=False)"
        },
        "hints": {
          "tier1": {
            "en": "Use `arr.shape[0] - window_size + 1` to compute the number of output rolling window rows.",
            "ar": "احسب عدد صفوف النوافذ المتحركة باستخدام `arr.shape[0] - window_size + 1`."
          },
          "tier2": {
            "en": "For consecutive rolling windows, advancing 1 row shifts by 1 element, so row stride equals column stride: `(elem_stride, elem_stride)`.",
            "ar": "لإنشاء نوافذ متداخلة، فإن التقدم صفاً يعني التقدم عنصراً واحداً، لذا خطوة الصف تساوي خطوة العمود: `(elem_stride, elem_stride)`."
          },
          "tier3": {
            "en": "Pass `writeable=False` to `as_strided` to prevent dangerous memory aliasing writes on overlapping buffers.",
            "ar": "مرر `writeable=False` إلى `as_strided` لمنع التعديلات العشوائية الخطرة على المخازن المتداخلة."
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
            "en": "An IoT monitoring system samples vibration data at 100,000 Hz, collecting 50,000,000 float64 values per stream. To train a CNN, an engineer writes `[arr[i:i+1024] for i in range(...)]` to extract overlapping windows of length 1,024, crashing the 64 GB server with an Out-Of-Memory (OOM) error. Why does `as_strided` solve this without memory overhead? - **(A)** *(Correct)* Materializing 50 million copies of 1,024 elements requires ~400 GB RAM; `as_strided` creates a virtual 2D view by reinterpreting byte strides, reusing the existing 400 MB buffer with zero byte allocations. - **(B)** NumPy compresses the vibration readings using Snappy block compression in background RAM. - **(C)** The `as_strided` function streams data directly from disk using memory-mapped OS paging. - **(D)** Python list comprehensions have a hardcoded limit of 10,000 iterations imposed by the Global Interpreter Lock (GIL). **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** A Python list comprehension allocates new memory buffers for every slice. `as_strided` merely creates an 80-byte metadata struct pointing back to the original 400 MB contiguous array with strides (8, 8).",
            "ar": "نظام استشعار اهتزاز يجمع 50,000,000 قراءة float64. لتدريب شبكة عصبية، كتب مهندس حلقة `[arr[i:i+1024] for i in range(...)]` لإنشاء نوافذ بطول 1024، فانهار الخادم (سعة 64 جيجابايت) بسبب نفاد الذاكرة OOM. لماذا تحل تقنية `as_strided` المشكلة دون استهلاك أي ذاكرة إضافية؟ - *Arabic:* إنشاء نسخ فعلية لـ 50 مليون نافذة يستهلك ~400 جيجابايت؛ بينما تنشئ `as_strided` مشهداً وهمياً عبر خطوات البايتات، مستخدمة نفس المخزن الأصلي (400 ميجابايت) بصفر بايت إضافي. - *Arabic:* تقوم NumPy بضغط بيانات الاهتزاز باستخدام خوارزمية Snappy في الذاكرة الخلفية. - *Arabic:* تقوم دالة `as_strided` بقراءة البيانات مباشرة من القرص عبر تقنية memory-mapped التابعة لنظام التشغيل. - *Arabic:* حلقات بايثون مقيدة بحد أقصى 10,000 تكرار تفرضه آلية قفل المفسر العام GIL. *التفسير الهندسي المعمق:* حلقات بايثون تنشئ مخازن جديدة لكل شريحة. أما `as_strided` فتنشئ فقط ترويسة بيانات وصفية بحجم 80 بايت تشير إلى المخزن الأصلي (400 ميجابايت) بالخطوات (8, 8)."
          },
          "options": [
            {
              "text": {
                "en": "Materializing 50 million copies of 1,024 elements requires ~400 GB RAM; `as_strided` creates a virtual 2D view by reinterpreting byte strides, reusing the existing 400 MB buffer with zero byte allocations.",
                "ar": "-  إنشاء نسخ فعلية لـ 50 مليون نافذة يستهلك ~400 جيجابايت؛ بينما تنشئ asstrided مشهداً وهمياً عبر خطوات البايتات، مستخدمة نفس المخزن الأصلي (400 ميجابايت) بصفر بايت إضافي."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "NumPy compresses the vibration readings using Snappy block compression in background RAM.",
                "ar": "-  تقوم NumPy بضغط بيانات الاهتزاز باستخدام خوارزمية Snappy في الذاكرة الخلفية."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The `as_strided` function streams data directly from disk using memory-mapped OS paging.",
                "ar": "-  تقوم دالة asstrided بقراءة البيانات مباشرة من القرص عبر تقنية memory-mapped التابعة لنظام التشغيل."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Python list comprehensions have a hardcoded limit of 10,000 iterations imposed by the Global Interpreter Lock (GIL).",
                "ar": "-  حلقات بايثون مقيدة بحد أقصى 10,000 تكرار تفرضه آلية قفل المفسر العام GIL."
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
    "id": "numpy-strides-indexing",
    "title": "Multi-Dimensional Array Broadcasting Rules",
    "titleAr": "قواعد البث متعدد الأبعاد (Broadcasting Rules) في NumPy",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In strict linear algebra, adding a single number (scalar) to a $(1000 \\times 1000)$ matrix is mathematically undefined—matrix addition is...",
      "ar": "في الجبر الخطي الصارم، لا يمكن جمع قيمة عددية فردية (Scalar) مع مصفوفة بأبعاد $(1000 \\times 1000)$ لأن جمع المصفوفات لا يُعرّف إلا بين..."
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
          "en": "In strict linear algebra, adding a single number (scalar) to a $(1000 \\times 1000)$ matrix is mathematically undefined—matrix addition is only defined between matrices of identical dimensions.\n\nYet in data science, you write `matrix + 5` every day. How does NumPy perform this arithmetic without allocating 8 MB of RAM to duplicate the number 5 one million times?",
          "ar": "في الجبر الخطي الصارم، لا يمكن جمع قيمة عددية فردية (Scalar) مع مصفوفة بأبعاد $(1000 \\times 1000)$ لأن جمع المصفوفات لا يُعرّف إلا بين مصفوفات متطابقة الأبعاد تماماً.\n\nلكنك في علم البيانات تكتب `matrix + 5` كل يوم! فكيف تجري NumPy هذه العملية دون حجز 8 ميجابايت من الذاكرة لتكرار ونسخ الرقم 5 مليون مرة؟\n\n### تشبيه البروجكتور: الأبعاد ذات الخطوة الصفرية\nتخيل جهاز عرض ضوئي (بروجكتور) في قاعة سينما:\n- لعرض صورة على شاشة أمام 1000 متفرج، لن تطبع 1000 صورة ورقية وتلصقها على كل مقعد!\n- بل تسلط شريحة ضوئية **واحدة** ليراها الجميع في وقت واحد.\n- في NumPy، يُنفذ هذا سحرياً عبر ضبط **خطوة الذاكرة (Stride) لذلك البعد على 0 بايت**!\nفعندما ينتقل المعالج من صف إلى صف، تكون قفزة الذاكرة صفر بايت، فيقرأ نفس الرقم 5 مراراً وتكراراً بأقصى سرعة ممكنة وبـ **صفر استهلاك للذاكرة**!\n\n### قاعدتا البث الذهبيتان\nتقارن NumPy أبعاد المصفوفتين بدءاً من **البعد الأخير (في أقصى اليمين)** نحو اليسار:\n1. البعدان متوافقان إذا كانا **متساويين**، أو\n2. أحدهما يساوي **1** (أو مفقوداً فيُعوّض بالرقم 1 في اليسار).\nإذا كان البعد 1، تتمدد أبعاده افتراضياً عبر ضبط خطوته على 0 بايت!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\forall k \\in \\{0, \\dots, D-1\\}: \\quad (a_k = b_k) \\;\\lor\\; (a_k = 1) \\;\\lor\\; (b_k = 1) \\implies d_{\\text{out}, k} = \\max(a_k, b_k), \\quad s_{\\text{bc}, k} = \\begin{cases} 0 & \\text{if } d_k = 1 < d_{\\text{out}, k} \\\\ s_k & \\text{otherwise} \\end{cases}",
        "formulaNote": {
          "en": "Broadcasting compatibility condition, resulting dimension projection, and zero-stride assignment.",
          "ar": "شرط توافق البث، أبعاد المصفوفة الناتجة، وتعيين الخطوة الصفرية للأبعاد المفردة."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal algebraic rules govern multidimensional shape alignment:\n\n- **$D$**: Maximum rank (number of dimensions) among operands, with smaller arrays left-padded with $1$s: $\\text{shape} = (1, \\dots, 1, d_0, \\dots)$.\n- **$a_k, b_k$**: Extents of dimension $k$ for operands $A$ and $B$.\n- **$d_{\\text{out}, k}$**: Output dimension length, strictly computed as $\\max(a_k, b_k)$.\n- **$s_{\\text{bc}, k} = 0$**: The foundational data engineering invariant: when dimension length is expanded from $1$ to $d_{\\text{out}, k}$, its byte stride is forced to $0$, avoiding buffer replication.\n- **Dimensionality Mismatch**: If $\\exists k$ such that $a_k \\ne b_k \\land a_k \\ne 1 \\land b_k \\ne 1$, NumPy raises `ValueError: operands could not be broadcast together`.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتحدد القواعد الجبرية الصارمة محاذاة الأبعاد المتعددة:\n- **$D$**: الرتبة القصوى (عدد الأبعاد) بين المدخلات، مع ملء الأبعاد المفقودة بالرقم 1 من اليسار.\n- **$a_k, b_k$**: أطوال البعد $k$ للمصفوفتين $A$ و $B$.\n- **$d_{\\text{out}, k}$**: طول البعد الناتج ويساوي دائماً $\\max(a_k, b_k)$.\n- **$s_{\\text{bc}, k} = 0$**: الثابت الجوهري في هندسة البيانات: عند تمديد بعد من 1 إلى $d_{\\text{out}, k}$، تُضبط خطوة البايت على صفر لضمان عدم نسخ الذاكرة.\n- **خطأ عدم التوافق**: إذا وُجد بعد $k$ لا يحقق التساوي أو الصفرية، يطلق النظام خطأ `ValueError`."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-numpy-strides-indexing",
          "starterCode": "import numpy as np\n\ndef pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the (N x M) pairwise squared Euclidean distance matrix between\n    two sets of feature vectors using NumPy broadcasting without Python loops.\n\n    Formula:\n        dist[i, j] = ||X[i] - Y[j]||^2 = sum_{d=0}^{D-1} (X[i, d] - Y[j, d])^2\n\n    Args:\n        X: (N, D) array of feature vectors.\n        Y: (M, D) array of feature vectors.\n\n    Returns:\n        (N, M) matrix of pairwise squared Euclidean distances.\n    \"\"\"\n    # Step 1: Validate that X and Y are 2D and feature dimensions agree: X.shape[1] == Y.shape[1]\n    # Step 2: Reshape X to (N, 1, D) and Y to (1, M, D) using np.newaxis\n    # Step 3: Broadcast subtract and square: diff = (X[:, np.newaxis, :] - Y[np.newaxis, :, :]) ** 2\n    # Step 4: Sum squared differences along the feature axis (axis=2) to return (N, M) array\n    raise NotImplementedError(\"Implement pairwise_squared_distance\")",
          "testCases": [
            {
              "input": "pairwise_squared_distance(np.array([[0.0, 0.0]]), np.array([[3.0, 4.0]])).tolist()",
              "expected": "[[25.0]]"
            },
            {
              "input": "pairwise_squared_distance(np.array([[1.0, 2.0], [3.0, 4.0]]), np.array([[1.0, 2.0], [3.0, 4.0]])).tolist()",
              "expected": "[[0.0, 8.0], [8.0, 0.0]]"
            }
          ],
          "expectedOutput": "[[25.0]]",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the (N x M) pairwise squared Euclidean distance matrix between\n    two sets of feature vectors using NumPy broadcasting without Python loops.\n\n    Formula:\n        dist[i, j] = ||X[i] - Y[j]||^2 = sum_{d=0}^{D-1} (X[i, d] - Y[j, d])^2\n\n    Args:\n        X: (N, D) array of feature vectors.\n        Y: (M, D) array of feature vectors.\n\n    Returns:\n        (N, M) matrix of pairwise squared Euclidean distances.\n    \"\"\"\n    # Step 1: Validate that X and Y are 2D and feature dimensions agree: X.shape[1] == Y.shape[1]\n    # Step 2: Reshape X to (N, 1, D) and Y to (1, M, D) using np.newaxis\n    # Step 3: Broadcast subtract and square: diff = (X[:, np.newaxis, :] - Y[np.newaxis, :, :]) ** 2\n    # Step 4: Sum squared differences along the feature axis (axis=2) to return (N, M) array\n    raise NotImplementedError(\"Implement pairwise_squared_distance\")",
              "expectedOutput": "[[25.0]]"
            }
          },
          "solution": "import numpy as np\n\ndef pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:\n    X_arr = np.asarray(X, dtype=np.float64)\n    Y_arr = np.asarray(Y, dtype=np.float64)\n\n    if X_arr.ndim != 2 or Y_arr.ndim != 2:\n        raise ValueError(\"Inputs must be 2D matrices\")\n    if X_arr.shape[1] != Y_arr.shape[1]:\n        raise ValueError(f\"Feature dimension mismatch: {X_arr.shape[1]} vs {Y_arr.shape[1]}\")\n\n    # Broadcast X of shape (N, 1, D) against Y of shape (1, M, D)\n    diff = X_arr[:, np.newaxis, :] - Y_arr[np.newaxis, :, :]\n    \n    # Sum along feature axis D\n    return np.sum(diff ** 2, axis=2)"
        },
        "hints": {
          "tier1": {
            "en": "Insert singleton dimensions via `X[:, np.newaxis, :]` (shape N, 1, D) and `Y[np.newaxis, :, :]` (shape 1, M, D).",
            "ar": "أضف أبعاداً أحادية عبر `X[:, np.newaxis, :]` لتصبح بأبعاد (N, 1, D) و `Y[np.newaxis, :, :]` لتصبح (1, M, D)."
          },
          "tier2": {
            "en": "Subtracting these two arrays broadcasts them into shape (N, M, D) without allocating duplicate arrays in Python.",
            "ar": "طرح هاتين المصفوفتين يقوم ببثهما إلى شكل (N, M, D) تلقائياً دون نسخ الذاكرة في بايثون."
          },
          "tier3": {
            "en": "Compute `np.sum(diff ** 2, axis=2)` to reduce across the feature dimension and obtain the (N, M) matrix.",
            "ar": "احسب `np.sum(diff ** 2, axis=2)` لاختزال بعد الخصائص والحصول على مصفوفة المسافات (N, M)."
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
            "en": "In an e-commerce vector search system, a user has 50,000 query vectors and 100,000 catalog product vectors with dimension D=128. An engineer executes `X[:, None, :] - Y[None, :, :]` directly. The system terminates instantly with a 2.4 Terabyte MemoryError. Why did broadcasting cause this blowup and how should production pipelines architect the query? - **(A)** *(Correct)* Broadcasting $(50000, 1, 128) - (1, 100000, 128)$ demands an intermediate output tensor of $50000 \\times 100000 \\times 128 \\times 8 \\approx 5.12\\text{ TB}$; production systems process inputs in mini-batches (tiling) or expand $|x-y|^2 = |x|^2 - 2x^T y + |y|^2$ using GEMM matrix multiplication. - **(B)** Broadcasting creates copies of all vectors on GPU VRAM even when executing on a local CPU server. - **(C)** NumPy cannot handle matrices where $N \\ne M$, leading to undefined internal infinite allocation. - **(D)** The error occurred because feature vectors were stored as float64 instead of string objects. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** While broadcasting avoids replicating inputs, the arithmetic result of $(N, 1, D) - (1, M, D)$ must allocate a full $(N, M, D)$ tensor. Expanding with $|x-y|^2 = |x|^2 - 2XY^T + |y|^2$ allows utilizing optimized BLAS GEMM directly.",
            "ar": "في محرك بحث متجهي لمتجر إلكتروني، يوجد 50,000 استعلام و 100,000 منتج بأبعاد D=128. نفذ مهندس عملية `X[:, None, :] - Y[None, :, :]` مباشرة، فاصطدم النظام بنفاد ذاكرة بحجم 2.4 تيرابايت. لماذا حدث هذا الانفجار الذاكري، وما المعمارية الإنتاجية الصحيحة؟ - *Arabic:* عملية البث تتطلب مصفوفة ناتجة بحجم $50000 \\times 100000 \\times 128 \\times 8 \\approx 5.12\\text{ TB}$؛ المعمارية الإنتاجية تقسم العمليات إلى دفعات (Tiling) أو تفكك المتطابقة باستخدام ضرب المصفوفات السريع GEMM. - *Arabic:* يقوم البث بنسخ المتجهات في ذاكرة كرت الشاشة VRAM حتى عند التنفيذ على المعالج المركزي. - *Arabic:* لا تدعم مكتبة NumPy مصفوفات غير متطابقة الأبعاد حيث $N \\ne M$ مما يؤدي إلى حجز لا نهائي للذاكرة. - *Arabic:* حدث الخطأ لأن متجهات الخصائص كانت مخزنة كأرقام عشرية float64 بدلاً من كائنات نصية. *التفسير الهندسي المعمق:* رغم أن البث لا يكرر المدخلات، فإن الناتج الحسابي يتطلب حجز مصفوفة كاملة بأبعاد (N, M, D). استخدام متطابقة ضرب المصفوفات يختزل الذاكرة إلى (N, M) ويستغل مكتبات BLAS فائقة السرعة."
          },
          "options": [
            {
              "text": {
                "en": "Broadcasting $(50000, 1, 128) - (1, 100000, 128)$ demands an intermediate output tensor of $50000 \\times 100000 \\times 128 \\times 8 \\approx 5.12\\text{ TB}$; production systems process inputs in mini-batches (tiling) or expand $|x-y|^2 = |x|^2 - 2x^T y + |y|^2$ using GEMM matrix multiplication.",
                "ar": "-  عملية البث تتطلب مصفوفة ناتجة بحجم $50000 \\times 100000 \\times 128 \\times 8 \\approx 5.12\\text{ TB}$؛ المعمارية الإنتاجية تقسم العمليات إلى دفعات (Tiling) أو تفكك المتطابقة باستخدام ضرب المصفوفات السريع GEMM."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Broadcasting creates copies of all vectors on GPU VRAM even when executing on a local CPU server.",
                "ar": "-  يقوم البث بنسخ المتجهات في ذاكرة كرت الشاشة VRAM حتى عند التنفيذ على المعالج المركزي."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "NumPy cannot handle matrices where $N \\ne M$, leading to undefined internal infinite allocation.",
                "ar": "-  لا تدعم مكتبة NumPy مصفوفات غير متطابقة الأبعاد حيث $N \\ne M$ مما يؤدي إلى حجز لا نهائي للذاكرة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The error occurred because feature vectors were stored as float64 instead of string objects.",
                "ar": "-  حدث الخطأ لأن متجهات الخصائص كانت مخزنة كأرقام عشرية float64 بدلاً من كائنات نصية."
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
    "id": "pandas-dataframe",
    "title": "DataFrame Mental Model: Indexing via `loc` vs `iloc`",
    "titleAr": "النموذج الذهني لإطارات البيانات: الفهرسة عبر loc مقابل iloc",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "A Pandas DataFrame is often taught as a \"spreadsheet in Python\". This superficial metaphor causes endless beginner bugs! What actually is a...",
      "ar": "غالبًا ما يُشرح إطار بيانات Pandas (DataFrame) للمبتدئين بأنه \"جدول إكسل داخل بايثون\"."
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
          "en": "A Pandas DataFrame is often taught as a \"spreadsheet in Python\". This superficial metaphor causes endless beginner bugs!\n\nWhat actually is a DataFrame under the hood?\nA DataFrame is a collection of 1D NumPy arrays (columns) orchestrated by two Hash Maps:\n1. **Row Index**: A mapping from row labels (e.g. `\"AAPL\"`, `\"2024-01-01\"`) to integer row positions.\n2. **Column Index**: A mapping from column labels (e.g. `\"revenue\"`, `\"cost\"`) to internal column blocks.",
          "ar": "غالبًا ما يُشرح إطار بيانات Pandas (DataFrame) للمبتدئين بأنه \"جدول إكسل داخل بايثون\". هذا التشبيه السطحي يقود إلى أخطاء برمجية لا حصر لها!\n\nفما هو إطار البيانات في الحقيقة تحت الغطاء؟\nإطار البيانات هو مجموعة من مصفوفات NumPy أحادية البعد (الأعمدة) يديرها جدولان تجزئة (Hash Maps):\n1. **فهرس الصفوف (Row Index)**: خريطة تربط التسميات (مثل `\"AAPL\"` أو `\"2024-01-01\"`) بالمواقع الرقمية للصفوف.\n2. **فهرس الأعمدة (Column Index)**: خريطة تربط أسماء الأعمدة بمخازن الأعمدة الداخلية.\n\n### تشبيه قاعة المؤتمر: بطاقات الأسماء مقابل أرقام المقاعد\nتخيل أنك ترشد الضيوف في مأدبة مؤتمر دولي:\n- **الفهرسة بالتسمية (`loc`)**: تبحث عن الضيف بواسطة **بطاقة اسمه** المكتوبة (مثل *\"طاولة د. سارة\"*). لا يهم أي كرسي فيزيائي تجلس عليه، فأنت تتعامل مع هويتها الاسمية.\n- **الفهرسة بالموقع الرقمي (`iloc`)**: تشير مباشرة إلى **رقم المقعد** (مثل *\"المقعد رقم 3 في الصف 0\"*). لا تكترث لمن يجلس هناك، بل تتعامل مع الإحداثي الفيزيائي المجرد.\n\n### المحاذاة التلقائية للفهارس (Index Alignment)\nعندما تطرح سلسلتين: `الأرباح - التكاليف`، لا تطرح Pandas العنصر الأول من الأول عشوائياً كالمصفوفات! بل تستخدم بطاقات الأسماء لمطابقة كل شركة بتكاليفها تلقائياً. وإذا وُجدت شركة في الأرباح وغابت عن التكاليف، تضع Pandas القيمة المفقودة `NaN` لحماية سلامة البيانات العلائقية!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{D} = \\langle \\mathcal{I}_{\\text{row}}, \\mathcal{I}_{\\text{col}}, \\mathbf{T}, \\mathbf{M} \\rangle, \\quad \\text{loc}(r, c) = \\mathbf{M}[\\mathcal{I}_{\\text{row}}(r), \\mathcal{I}_{\\text{col}}(c)], \\quad \\text{iloc}(i, j) = \\mathbf{M}[i, j]",
        "formulaNote": {
          "en": "Formal algebraic tuple definition of DataFrame index mapping and coordinate dereferencing.",
          "ar": "التعريف الجبري لإطار البيانات عبر دالتي تعيين الفهارس واستخراج القيم."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal algebraic representation bounds tabular indexing semantics:\n\n- **$\\mathcal{I}_{\\text{row}}: \\mathcal{L}_{\\text{row}} \\to \\{0, \\dots, N-1\\}$**: Invertible hash-indexed mapping from row labels to physical row offsets.\n- **$\\mathcal{I}_{\\text{col}}: \\mathcal{L}_{\\text{col}} \\to \\{0, \\dots, M-1\\}$**: Hash-indexed mapping from column names to column buffer positions.\n- **$\\mathbf{T}$**: Homogeneous data type schema vector $(\\tau_0, \\dots, \\tau_{M-1})$.\n- **$\\mathbf{M}$**: Physical memory storage engine (e.g., Pandas `BlockManager` grouping columns by dtype).\n- **Label Alignment Invariant**: For binary operator $\\oplus$ between series $\\mathcal{S}_A$ and $\\mathcal{S}_B$, the domain of the result is $\\text{dom}(\\mathcal{S}_A) \\cup \\text{dom}(\\mathcal{S}_B)$, imputing $v_{\\text{fill}}$ for missing disjoint keys.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nالصياغة الجبرية تحدد دلالات الفهرسة الجدولية:\n- **$\\mathcal{I}_{\\text{row}}$**: دالة تجزئة عكوسة تربط تسميات الصفوف بمواقعها الفيزيائية.\n- **$\\mathcal{I}_{\\text{col}}$**: دالة تجزئة تربط أسماء الأعمدة بأماكن تخزينها في الذاكرة.\n- **$\\mathbf{T}$**: متجه مخطط الأنواع البيانية للأعمدة.\n- **$\\mathbf{M}$**: محرك التخزين الفيزيائي الداخلي (مثل BlockManager في Pandas).\n- **ثابت محاذاة الفهارس**: عند إجراء عملية ثنائية بين سلسلتين، يكون فضاء الناتج هو اتحاد التسميات، مع تعويض المفاتيح الناقصة بقيمة `NaN`."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-pandas-dataframe",
          "starterCode": "def align_and_compute_spread(\n    series_a: dict[str, float], \n    series_b: dict[str, float], \n    fill_value: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Emulates Pandas index alignment by computing the spread (a - b)\n    across the union of label indices, handling missing keys via imputation.\n\n    Args:\n        series_a: Mapping of index label to float value.\n        series_b: Mapping of index label to float value.\n        fill_value: Imputation value when a label is missing in either series.\n\n    Returns:\n        Dictionary mapping each unique label to (val_a - val_b) rounded to 6 decimal places,\n        sorted alphabetically by key.\n    \"\"\"\n    # Step 1: Collect sorted union of all keys across series_a and series_b\n    # Step 2: For each key, extract val_a (with fill_value fallback) and val_b (with fill_value fallback)\n    # Step 3: Compute diff = round(val_a - val_b, 6)\n    # Step 4: Return dictionary mapping key -> diff\n    raise NotImplementedError(\"Implement align_and_compute_spread\")",
          "testCases": [
            {
              "input": "align_and_compute_spread({'AAPL': 150.0, 'MSFT': 300.0}, {'AAPL': 140.0, 'GOOG': 2800.0})['AAPL']",
              "expected": "10.0"
            },
            {
              "input": "align_and_compute_spread({'AAPL': 150.0}, {'AAPL': 150.0})['AAPL']",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "10.0",
          "variants": {
            "python": {
              "starterCode": "def align_and_compute_spread(\n    series_a: dict[str, float], \n    series_b: dict[str, float], \n    fill_value: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Emulates Pandas index alignment by computing the spread (a - b)\n    across the union of label indices, handling missing keys via imputation.\n\n    Args:\n        series_a: Mapping of index label to float value.\n        series_b: Mapping of index label to float value.\n        fill_value: Imputation value when a label is missing in either series.\n\n    Returns:\n        Dictionary mapping each unique label to (val_a - val_b) rounded to 6 decimal places,\n        sorted alphabetically by key.\n    \"\"\"\n    # Step 1: Collect sorted union of all keys across series_a and series_b\n    # Step 2: For each key, extract val_a (with fill_value fallback) and val_b (with fill_value fallback)\n    # Step 3: Compute diff = round(val_a - val_b, 6)\n    # Step 4: Return dictionary mapping key -> diff\n    raise NotImplementedError(\"Implement align_and_compute_spread\")",
              "expectedOutput": "10.0"
            }
          },
          "solution": "def align_and_compute_spread(\n    series_a: dict[str, float], \n    series_b: dict[str, float], \n    fill_value: float = 0.0\n) -> dict[str, float]:\n    # Union of all label indices\n    all_keys = sorted(set(series_a.keys()) | set(series_b.keys()))\n    \n    result: dict[str, float] = {}\n    for key in all_keys:\n        val_a = series_a.get(key, fill_value)\n        val_b = series_b.get(key, fill_value)\n        result[key] = round(val_a - val_b, 6)\n        \n    return result"
        },
        "hints": {
          "tier1": {
            "en": "Use `set(series_a.keys()) | set(series_b.keys())` to construct the full union index.",
            "ar": "استخدم `set(series_a.keys()) | set(series_b.keys())` لإنشاء اتحاد المفاتيح كاملاً."
          },
          "tier2": {
            "en": "Use `dict.get(key, fill_value)` to gracefully impute missing keys.",
            "ar": "استخدم `dict.get(key, fill_value)` لتعويض المفاتيح المفقودة بسلاسة."
          },
          "tier3": {
            "en": "Ensure all differences are rounded via `round(val_a - val_b, 6)` and returned in a sorted dictionary.",
            "ar": "تأكد من تقريب الفروق بـ `round(val_a - val_b, 6)` وإرجاع قاموس مرتب أبجدياً."
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
            "en": "In an automated quantitative trading platform, an algorithm subtracts daily close price Series: `spread = stock_a - stock_b`. On days when stock_b was halted due to news, `spread` returns NaN. The downstream execution gateway receives NaN and fails silently to execute stop-loss orders. How does index alignment explain this and how is it resolved? - **(A)** *(Correct)* Pandas aligns Series along the union of index dates; missing dates in either Series produce NaN. The robust solution is calling `stock_a.sub(stock_b, fill_value=...)` or explicitly forward-filling prices via `.reindex()` or `.ffill()` prior to subtraction. - **(B)** Index alignment only works for integer indices; string and datetime indices always produce NaN. - **(C)** The NaN values are caused by floating point precision underflow in the CPython math library. - **(D)** Converting both Series to pure Python lists before subtraction eliminates missing values automatically. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Direct arithmetic operator `-` on Pandas Series executes an outer index join and yields NaN for unmatched dates. Using `.sub()` with a fill value or applying `.ffill()` maintains analytical continuity.",
            "ar": "في منصة تداول خوارزمية كمية، تحسب الخوارزمية الفارق اليومي: `spread = stock_a - stock_b`. في الأيام التي أوقف فيها تداول السهم b، تعيد العملية NaN، مما عطل أوامر وقف الخسارة. كيف تفسر آلية محاذاة الفهارس هذا الخلل وما الحل البرمجي المتين؟ - *Arabic:* تحاذي Pandas السلاسل على اتحاد تواريخ الفهرس؛ وأي تاريخ مفقود في إحداهما ينتج NaN. الحل المتين هو استخدام `stock_a.sub(stock_b, fill_value=...)` أو تعويض الأسعار السابقة بـ `.ffill()` قبل الطرح. - *Arabic:* محاذاة الفهارس تعمل فقط مع الفهارس الرقمية، بينما فهارس النصوص والتواريخ تعيد دائماً NaN. - *Arabic:* قيم NaN نتجت عن فيضان سفلي لدقة الأرقام العشرية في مكتبة الرياضيات بمفسر بايثون. - *Arabic:* تحويل السلسلتين إلى قوائم بايثون قبل الطرح يحذف القيم المفقودة تلقائياً. *التفسير الهندسي المعمق:* مُعامل الطرح المباشر `-` ينفذ ربطاً خارجياً للفهارس ويضع NaN للتواريخ غير المتطابقة. استخدام التابع `.sub()` بقيمة بديلة أو `.ffill()` يضمن استمرارية التحليل المالي."
          },
          "options": [
            {
              "text": {
                "en": "Pandas aligns Series along the union of index dates; missing dates in either Series produce NaN. The robust solution is calling `stock_a.sub(stock_b, fill_value=...)` or explicitly forward-filling prices via `.reindex()` or `.ffill()` prior to subtraction.",
                "ar": "-  تحاذي Pandas السلاسل على اتحاد تواريخ الفهرس؛ وأي تاريخ مفقود في إحداهما ينتج NaN. الحل المتين هو استخدام stocka.sub(stockb, fillvalue=...) أو تعويض الأسعار السابقة بـ .ffill() قبل الطرح."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Index alignment only works for integer indices; string and datetime indices always produce NaN.",
                "ar": "-  محاذاة الفهارس تعمل فقط مع الفهارس الرقمية، بينما فهارس النصوص والتواريخ تعيد دائماً NaN."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The NaN values are caused by floating point precision underflow in the CPython math library.",
                "ar": "-  قيم NaN نتجت عن فيضان سفلي لدقة الأرقام العشرية في مكتبة الرياضيات بمفسر بايثون."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Converting both Series to pure Python lists before subtraction eliminates missing values automatically.",
                "ar": "-  تحويل السلسلتين إلى قوائم بايثون قبل الطرح يحذف القيم المفقودة تلقائياً."
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
    "id": "pandas-split-apply-combine",
    "title": "Tidy Data Architecture & Normalization Geometry",
    "titleAr": "معمارية البيانات المرتبة (Tidy Data) وهندسة تسوية الجداول",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why does slicing in Pandas behave differently between iloc and loc? If you slice with iloc[0:3], you get 3 rows: row 0, 1, and 2.",
      "ar": "لماذا تختلف قواعد الاقتطاع (Slicing) في Pandas جذرياً بين iloc و loc؟ إذا اقتطعت بـ iloc[0:3]، فستحصل على 3 صفوف: الصف 0 و 1 و 2، حيث..."
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
          "en": "Why does slicing in Pandas behave differently between `iloc` and `loc`?\nIf you slice with `iloc[0:3]`, you get 3 rows: row 0, 1, and 2. It **excludes** the endpoint (half-open interval $[0, 3)$).\nIf you slice with `loc['a':'c']`, you get **all three labels**: 'a', 'b', and 'c'. It **includes** the endpoint (closed interval $[a, c]$)!\n\nWhy did the creators of Pandas design this asymmetry? Is it a confusing design flaw?\n\nUnderstanding that `iloc` is a half-open ruler $[i, j)$ and `loc` is an inclusive dictionary $[\\ell_1, \\ell_2]$ eliminates 90% of off-by-one indexing bugs in data pipelines!",
          "ar": "لماذا تختلف قواعد الاقتطاع (Slicing) في Pandas جذرياً بين `iloc` و `loc`؟\nإذا اقتطعت بـ `iloc[0:3]`، فستحصل على 3 صفوف: الصف 0 و 1 و 2، حيث يُستثنى الحد الأخير (مجال نصف مفتوح $[0, 3)$).\nأما إذا اقتطعت بـ `loc['a':'c']`، فستحصل على الصفوف الثلاثة: 'a' و 'b' و 'c' معاً، متضمنة الحد الأخير بالكامل (مجال مغلق $[a, c]$)!\n\nلماذا صممت Pandas هذا الاختلاف؟ هل هو عيب في التصميم؟\n\n### تشبيه المسطرة مقابل المعجم الموسوعي\n- **`iloc` (المسطرة الفيزيائية)**: عندما تقيس مسافة بمسطرة من السنتيمتر 1 إلى 4، فإنك تحسب الفرق: $4 - 1 = 3$ وحدات، وتتوقف عند حافة علامة 4. هذا يتبع معايير علوم الحاسوب التقليدية (المجالات نصف المفتوحة).\n- **`loc` (المعجم الموسوعي)**: تخيل أنك تبحث في موسوعة ورقية من المجلد **\"ب\"** إلى المجلد **\"د\"**. إذا حذف الناشر مجلد حرف \"د\" بحجة أنه الحد الأخير، فستغضب بالتأكيد! عندما يبحث البشر بالتسميات والعناوين، فإنهم يتوقعون **تضمين الحد الأخير بالكامل**.\n\nإدراك أن `iloc` مسطرة نصف مفتوحة $[i, j)$ بينما `loc` معجم مغلق $[\\ell_1, \\ell_2]$ يحميك من 90% من أخطاء الإزاحة (Off-by-one) في معالجة البيانات!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{iloc}[i:j) = \\{ k \\in \\mathbb{N} \\mid i \\le k < j \\}, \\quad \\text{loc}[\\ell_1:\\ell_2] = \\{ \\ell \\in \\mathcal{I} \\mid \\text{pos}(\\ell_1) \\le \\text{pos}(\\ell) \\le \\text{pos}(\\ell_2) \\}",
        "formulaNote": {
          "en": "Set-theoretic definition of half-open positional slice vs. closed label interval slice.",
          "ar": "التعريف الرياضي لشريحة المواقع نصف المفتوحة وشريحة التسميات المغلقة في نظرية المجموعات."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe mathematical interval specifications highlight why positional and label indexing must diverge:\n\n- **$i, j \\in \\mathbb{N}$**: 0-based integer offsets in memory ($0 \\le i \\le j \\le N$).\n- **$|\\text{iloc}[i:j)| = j - i$**: Cardinality of half-open interval directly equals the difference of endpoints, preserving standard array arithmetic.\n- **$\\ell_1, \\ell_2 \\in \\mathcal{I}$**: Label tokens residing within an ordered index mapping.\n- **$\\text{pos}(\\ell)$**: Monotonic index lookup yielding integer rank position of label $\\ell$.\n- **$|\\text{loc}[\\ell_1:\\ell_2]| = \\text{pos}(\\ell_2) - \\text{pos}(\\ell_1) + 1$**: Cardinality of closed interval includes both boundary elements.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتحدد فضاءات المجالات الرياضية سبب التباين بين الفهرسة الموضعية والاسمية:\n- **$i, j$**: إزاحات رقمية في الذاكرة تبدأ من الصفر.\n- **$|\\text{iloc}| = j - i$**: عدد عناصر المجال نصف المفتوح يساوي بالضبط ناتج الطرح المباشر للحدود.\n- **$\\ell_1, \\ell_2$**: رموز التسميات داخل فهرس مرتب.\n- **$\\text{pos}(\\ell)$**: دالة تبحث عن الترتيب الموضعي للتسمية $\\ell$.\n- **$|\\text{loc}|$**: عدد عناصر المجال المغلق يشمل دائماً الحدين (+ 1)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-pandas-split-apply-combine",
          "starterCode": "def slice_tabular_index(\n    index: list[str], \n    start_token: str | int, \n    stop_token: str | int, \n    mode: str\n) -> list[str]:\n    \"\"\"\n    Implements loc (closed label-based) vs iloc (half-open integer-based) slicing semantics.\n\n    Args:\n        index: List of unique string row labels.\n        start_token: String label for loc mode; integer index for iloc mode.\n        stop_token: String label for loc mode; integer index for iloc mode.\n        mode: Either \"loc\" or \"iloc\".\n\n    Returns:\n        Sub-list of labels matching the indexing semantics.\n    \"\"\"\n    # Step 1: If mode == \"iloc\":\n    #         - Validate start_token and stop_token are ints\n    #         - Return standard half-open Python list slice: index[start_token:stop_token]\n    # Step 2: If mode == \"loc\":\n    #         - Validate start_token and stop_token are strings present in index\n    #         - Find start_idx and stop_idx via index.index(...)\n    #         - Return inclusive slice: index[start_idx : stop_idx + 1]\n    # Step 3: Raise TypeError/KeyError/ValueError on invalid mode or missing tokens\n    raise NotImplementedError(\"Implement slice_tabular_index\")",
          "testCases": [
            {
              "input": "slice_tabular_index(['a', 'b', 'c', 'd', 'e'], 1, 3, 'iloc')",
              "expected": "['b', 'c']"
            },
            {
              "input": "slice_tabular_index(['a', 'b', 'c', 'd', 'e'], 'b', 'd', 'loc')",
              "expected": "['b', 'c', 'd']"
            }
          ],
          "expectedOutput": "['b', 'c']",
          "variants": {
            "python": {
              "starterCode": "def slice_tabular_index(\n    index: list[str], \n    start_token: str | int, \n    stop_token: str | int, \n    mode: str\n) -> list[str]:\n    \"\"\"\n    Implements loc (closed label-based) vs iloc (half-open integer-based) slicing semantics.\n\n    Args:\n        index: List of unique string row labels.\n        start_token: String label for loc mode; integer index for iloc mode.\n        stop_token: String label for loc mode; integer index for iloc mode.\n        mode: Either \"loc\" or \"iloc\".\n\n    Returns:\n        Sub-list of labels matching the indexing semantics.\n    \"\"\"\n    # Step 1: If mode == \"iloc\":\n    #         - Validate start_token and stop_token are ints\n    #         - Return standard half-open Python list slice: index[start_token:stop_token]\n    # Step 2: If mode == \"loc\":\n    #         - Validate start_token and stop_token are strings present in index\n    #         - Find start_idx and stop_idx via index.index(...)\n    #         - Return inclusive slice: index[start_idx : stop_idx + 1]\n    # Step 3: Raise TypeError/KeyError/ValueError on invalid mode or missing tokens\n    raise NotImplementedError(\"Implement slice_tabular_index\")",
              "expectedOutput": "['b', 'c']"
            }
          },
          "solution": "def slice_tabular_index(\n    index: list[str], \n    start_token: str | int, \n    stop_token: str | int, \n    mode: str\n) -> list[str]:\n    if mode == \"iloc\":\n        if not isinstance(start_token, int) or not isinstance(stop_token, int):\n            raise TypeError(\"iloc requires integer start and stop tokens\")\n        return index[start_token:stop_token]\n\n    elif mode == \"loc\":\n        if not isinstance(start_token, str) or not isinstance(stop_token, str):\n            raise TypeError(\"loc requires string label start and stop tokens\")\n        if start_token not in index:\n            raise KeyError(f\"Label not found in index: {start_token}\")\n        if stop_token not in index:\n            raise KeyError(f\"Label not found in index: {stop_token}\")\n\n        start_idx = index.index(start_token)\n        stop_idx = index.index(stop_token)\n\n        if stop_idx < start_idx:\n            return []\n\n        # loc is CLOSED: slice includes stop_idx\n        return index[start_idx : stop_idx + 1]\n\n    else:\n        raise ValueError(\"Mode must be 'loc' or 'iloc'\")"
        },
        "hints": {
          "tier1": {
            "en": "In 'iloc' mode, return `index[start_token:stop_token]` directly.",
            "ar": "في وضع 'iloc'، أرجع الشريحة `index[start_token:stop_token]` مباشرة."
          },
          "tier2": {
            "en": "In 'loc' mode, find indices via `index.index(...)` and add 1 to the end index: `index[start_idx : stop_idx + 1]`.",
            "ar": "في وضع 'loc'، استخرج الترتيب بـ `index.index(...)` وأضف 1 إلى النهاية: `index[start_idx : stop_idx + 1]`."
          },
          "tier3": {
            "en": "Validate types and membership to raise appropriate `TypeError` and `KeyError` exceptions.",
            "ar": "تحقق من صحة الأنواع ووجود المفاتيح لإطلاق استثناءات `TypeError` و `KeyError` المناسبة."
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
            "en": "A financial reconciliation engine processes transaction timestamps. A data engineer replaces `df.loc['2024-01-01':'2024-01-31']` with `df.iloc[0:31]`, assuming 31 days in January. At month-end, the company accounts are short by $3,200,000. Why did switching from `loc` to `iloc` introduce this critical accounting deficit? - **(A)** *(Correct)* The financial market had multiple transactions per day and weekend trading halts; `iloc[0:31]` blindly sliced the first 31 rows (covering only Jan 1 to Jan 4), whereas `loc` inclusively filtered all rows bearing timestamps up to Jan 31. - **(B)** `iloc` converts floating point currency numbers into integers, truncating the fractional cents. - **(C)** Pandas reverses row order when using integer slices on datetime-indexed DataFrames. - **(D)** The `loc` indexer automatically executes distributed Spark queries across cluster nodes. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Positional slicing (`iloc`) counts literal rows in memory, not calendar days. In high-volume financial data, day 1 alone may contain thousands of transaction rows. `loc` filters by actual index label values.",
            "ar": "نظام تسوية مالية يعالج الحسابات الشهرية. استبدل مهندس التعبير `df.loc['2024-01-01':'2024-01-31']` بـ `df.iloc[0:31]` مفترضاً أن يناير 31 يوماً. في نهاية الشهر، ظهر عجز قدره 3.2 مليون دولار. لماذا تسبب استبدال `loc` بـ `iloc` في هذه الكارثة المحاسبية؟ - *Arabic:* السوق المالي يحوي معاملات متعددة يومياً وعطلات أسبوعية؛ فاقتطعت `iloc[0:31]` أول 31 صفاً فقط (وهي تغطي أول 4 أيام من الشهر فقط)، بينما تجمع `loc` جميع المعاملات المنتهية بـ 31 يناير. - *Arabic:* تقوم `iloc` بتحويل أرقام العملات العشرية إلى أعداد صحيحة مما يحذف أجزاء السنتات. - *Arabic:* تعكس Pandas ترتيب الصفوف تلقائياً عند استخدام شرائح الأرقام مع فهارس التواريخ. - *Arabic:* تقوم أداة `loc` بتنفيذ استعلامات Spark موزعة عبر حواضن الحوسبة تلقائياً. *التفسير الهندسي المعمق:* الاقتطاع الموضعي `iloc` يعد صفوفاً فيزيائية في الذاكرة وليس أياماً تقويمية. في التداول المالي قد يحوي اليوم الأول آلاف الصفوف؛ بينما تصفي `loc` بناءً على قيم التواريخ الاسمية."
          },
          "options": [
            {
              "text": {
                "en": "The financial market had multiple transactions per day and weekend trading halts; `iloc[0:31]` blindly sliced the first 31 rows (covering only Jan 1 to Jan 4), whereas `loc` inclusively filtered all rows bearing timestamps up to Jan 31.",
                "ar": "-  السوق المالي يحوي معاملات متعددة يومياً وعطلات أسبوعية؛ فاقتطعت iloc[0:31] أول 31 صفاً فقط (وهي تغطي أول 4 أيام من الشهر فقط)، بينما تجمع loc جميع المعاملات المنتهية بـ 31 يناير."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "`iloc` converts floating point currency numbers into integers, truncating the fractional cents.",
                "ar": "-  تقوم iloc بتحويل أرقام العملات العشرية إلى أعداد صحيحة مما يحذف أجزاء السنتات."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Pandas reverses row order when using integer slices on datetime-indexed DataFrames.",
                "ar": "-  تعكس Pandas ترتيب الصفوف تلقائياً عند استخدام شرائح الأرقام مع فهارس التواريخ."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The `loc` indexer automatically executes distributed Spark queries across cluster nodes.",
                "ar": "-  تقوم أداة loc بتنفيذ استعلامات Spark موزعة عبر حواضن الحوسبة تلقائياً."
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
    "id": "eda-anscombe",
    "title": "The GroupBy Split-Apply-Combine Engine",
    "titleAr": "محرك التجميع والتقسيم (Split-Apply-Combine) وتنسيق Tidy Data",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why do data scientists spend 80% of their time cleaning and reshaping data? Because human beings and analytical algorithms want tables...",
      "ar": "لماذا يقضي علماء البيانات 80% من وقتهم في تنظيف البيانات وتعديل هياكل الجداول؟ لأن البشر ومحركات التحليل البرمجية يفضلون هياكل متعارضة..."
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
          "en": "Why do data scientists spend 80% of their time cleaning and reshaping data?\nBecause human beings and analytical algorithms want tables formatted in opposite ways!\n\nHumans love **Wide Tables**: a store manager makes a table with `Product`, `Jan_Sales`, `Feb_Sales`, `Mar_Sales`. It looks compact on a spreadsheet screen. But for machine learning and analytical SQL, wide tables are a disaster: variable names (the months) are trapped inside column headers! You cannot write a simple `groupby('month')` or plot a line chart over time.",
          "ar": "لماذا يقضي علماء البيانات 80% من وقتهم في تنظيف البيانات وتعديل هياكل الجداول؟\nلأن البشر ومحركات التحليل البرمجية يفضلون هياكل متعارضة تماماً!\n\nيفضل البشر **الجداول العريضة (Wide Tables)**: يكتب مدير المتجر جدولاً بأعمدة: `المنتج`، `مبيعات_يناير`، `مبيعات_فبراير`، `مبيعات_مارس`. هذا مريح لعين القارئ، ولكنه كارثي لأن أسماء المتغيرات (الشهور) محبوسة في عناوين الأعمدة! يستحيل تشغيل `groupby('month')` أو رسم منحنى زمني مباشر.\n\n### تشبيه الكرسي القابل للطي: فرد الجداول إلى شكل مرتب (Tidy Data)\n- الجدول العريض يشبه كرسياً محمولاً مطوياً—سهل الحمل للبشر، لكن يستحيل الجلوس عليه!\n- **الفرد وتفكيك الأعمدة (Melting / Unpivoting)** يفرد الكرسي ليصبح جدولاً مرتباً ومنظماً (Tidy Data):\n  1. كل متغير يشكل عموداً مستقلاً واحداً: `[المنتج، الشهر، الإيراد]`.\n  2. كل ملاحظة فردية تشكل صفاً واحداً.\n  3. كل وحدة قياس تشكل جدولاً مستقلاً.\nبمجرد فرد البيانات، تعمل جميع خوارزميات التجميع والانحدار والذكاء الاصطناعي بسلاسة فائقة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{R}_{\\text{wide}} \\subseteq \\mathcal{I}_1 \\times \\dots \\times \\mathcal{I}_K \\times \\mathcal{Y}_1 \\times \\dots \\times \\mathcal{Y}_T \\implies \\mathcal{R}_{\\text{tidy}} = \\bigcup_{r \\in \\mathcal{R}_{\\text{wide}}} \\bigcup_{t=1}^T \\big\\{ \\big( r[\\mathcal{I}_1], \\dots, r[\\mathcal{I}_K], \\text{name}(\\mathcal{Y}_t), r[\\mathcal{Y}_t] \\big) \\big\\}",
        "formulaNote": {
          "en": "Relational unpivoting bijection from Cartesian product of measurement attributes into tidy 3NF relation.",
          "ar": "التحويل العلائقي ثنائي الاتجاه من الجداول العريضة إلى العلاقة الترتيبية المنظمة."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal mapping dictates the algebraic expansion from wide to tidy representations:\n\n- **$\\mathcal{I}_1, \\dots, \\mathcal{I}_K$**: Identifier dimensions preserved across rows (e.g. `patient_id`, `device_id`).\n- **$\\mathcal{Y}_1, \\dots, \\mathcal{Y}_T$**: Measurement value domains originally transposed into horizontal column headers.\n- **$\\text{name}(\\mathcal{Y}_t)$**: Attribute name string mapped into a discrete categorical variable column.\n- **$r[\\mathcal{Y}_t]$**: Concrete observed scalar metric assigned to the designated value column.\n- **Cardinality Invariant**: $|\\mathcal{R}_{\\text{tidy}}| = |\\mathcal{R}_{\\text{wide}}| \\times T$, expanding row volume linearly while collapsing schema width.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nالصياغة الجبرية تبين التمدد الرياضي من التنسيق العريض إلى المنظم:\n- **$\\mathcal{I}_1, \\dots, \\mathcal{I}_K$**: أبعاد الهوية المحفوظة في كل صف (مثل `رقم_العميل`).\n- **$\\mathcal{Y}_1, \\dots, \\mathcal{Y}_T$**: مجالات قياس القيم المتناثرة أفقياً عبر الأعمدة.\n- **$\\text{name}(\\mathcal{Y}_t)$**: اسم الخاصية المنقول إلى عمود تصنيفي مستقل.\n- **$r[\\mathcal{Y}_t]$**: القيمة العددية المرصودة والموضوعة في عمود القيمة الجديد.\n- **ثابت الحجم**: عدد الصفوف الناتجة يساوي عدد الصفوف الأصلية مضروباً في عدد الأعمدة المفردة $T$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-eda-anscombe",
          "starterCode": "from typing import Any\n\ndef melt_wide_to_tidy(\n    records: list[dict[str, Any]], \n    id_vars: list[str], \n    value_vars: list[str], \n    var_name: str = \"variable\", \n    value_name: str = \"value\"\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Unpivots a wide table into tidy format where columns become rows.\n\n    Args:\n        records: List of dictionaries representing wide rows.\n        id_vars: Column names to retain as identifier variables.\n        value_vars: Column names to unpivot into variable/value pairs.\n        var_name: Name of the target variable column (default 'variable').\n        value_name: Name of the target value column (default 'value').\n\n    Returns:\n        List of tidy records where each row represents a single atomic observation.\n    \"\"\"\n    # Step 1: Initialize empty list for tidy output records\n    # Step 2: Iterate over each wide row record in records\n    # Step 3: Extract base identifier dictionary: {k: row[k] for k in id_vars if k in row}\n    # Step 4: For each column v_col in value_vars present in row, append a new dictionary\n    #         combining base identifiers with {var_name: v_col, value_name: row[v_col]}\n    # Step 5: Return the accumulated tidy list\n    raise NotImplementedError(\"Implement melt_wide_to_tidy\")",
          "testCases": [
            {
              "input": "len(melt_wide_to_tidy([{'id': 1, 'Q1': 10, 'Q2': 20}], ['id'], ['Q1', 'Q2']))",
              "expected": "2"
            },
            {
              "input": "melt_wide_to_tidy([{'id': 1, 'Q1': 10}], ['id'], ['Q1'])[0]['variable']",
              "expected": "'Q1'"
            }
          ],
          "expectedOutput": "2",
          "variants": {
            "python": {
              "starterCode": "from typing import Any\n\ndef melt_wide_to_tidy(\n    records: list[dict[str, Any]], \n    id_vars: list[str], \n    value_vars: list[str], \n    var_name: str = \"variable\", \n    value_name: str = \"value\"\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Unpivots a wide table into tidy format where columns become rows.\n\n    Args:\n        records: List of dictionaries representing wide rows.\n        id_vars: Column names to retain as identifier variables.\n        value_vars: Column names to unpivot into variable/value pairs.\n        var_name: Name of the target variable column (default 'variable').\n        value_name: Name of the target value column (default 'value').\n\n    Returns:\n        List of tidy records where each row represents a single atomic observation.\n    \"\"\"\n    # Step 1: Initialize empty list for tidy output records\n    # Step 2: Iterate over each wide row record in records\n    # Step 3: Extract base identifier dictionary: {k: row[k] for k in id_vars if k in row}\n    # Step 4: For each column v_col in value_vars present in row, append a new dictionary\n    #         combining base identifiers with {var_name: v_col, value_name: row[v_col]}\n    # Step 5: Return the accumulated tidy list\n    raise NotImplementedError(\"Implement melt_wide_to_tidy\")",
              "expectedOutput": "2"
            }
          },
          "solution": "from typing import Any\n\ndef melt_wide_to_tidy(\n    records: list[dict[str, Any]], \n    id_vars: list[str], \n    value_vars: list[str], \n    var_name: str = \"variable\", \n    value_name: str = \"value\"\n) -> list[dict[str, Any]]:\n    tidy_output: list[dict[str, Any]] = []\n\n    for row in records:\n        base_id_record = {k: row[k] for k in id_vars if k in row}\n\n        for v_col in value_vars:\n            if v_col in row:\n                new_row = {\n                    **base_id_record,\n                    var_name: v_col,\n                    value_name: row[v_col]\n                }\n                tidy_output.append(new_row)\n\n    return tidy_output"
        },
        "hints": {
          "tier1": {
            "en": "Extract the common id keys first using a dictionary comprehension.",
            "ar": "استخرج مفاتيح الهوية المشتركة أولاً عبر قاموس مختصر."
          },
          "tier2": {
            "en": "Loop through `value_vars` and create a dictionary with `{**base_id, var_name: v_col, value_name: row[v_col]}`.",
            "ar": "كرر عبر `value_vars` وأنشئ قاموساً يدمج الهوية مع اسم المتغير وقيمته."
          },
          "tier3": {
            "en": "Ensure you only access keys that exist in `row` to avoid KeyError on sparse datasets.",
            "ar": "تأكد من فحص وجود المفتاح في الصف لتفادي أخطاء المفاتيح المفقودة."
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
            "en": "A hospital system stores patient vital signs across 24 columns: `hr_hour01`, `hr_hour02`, ..., `hr_hour24`. A research team needs to train an LSTM model and compute hourly average heart rates by diagnosis group. Why is melting this table into `(patient_id, diagnosis, hour, heart_rate)` essential? - **(A)** *(Correct)* Tidy data normalizes the schema so 'hour' is a structured dimension rather than 24 hardcoded column names, enabling vectorized `groupby(['diagnosis', 'hour'])` and sequence tensor generation. - **(B)** Deep learning frameworks like PyTorch and TensorFlow crash if an input DataFrame has more than 5 columns. - **(C)** Wide tables consume 10x more physical storage on disk than melted tidy tables. - **(D)** CPython restricts dictionary keys to numbers; column strings cannot be indexed in loops. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** In wide format, performing an hourly aggregation requires writing 24 separate SQL expressions. In tidy format, it is a single elegant `GROUP BY diagnosis, hour` operation.",
            "ar": "مستشفى يخزن نبضات القلب في 24 عموداً: `hr_hour01` إلى `hr_hour24`. يريد فريق بحثي تدريب نموذج LSTM وحساب متوسط النبضات لكل ساعة مصنفة حسب التشخيص. لماذا يُعد تحويل الجدول إلى `(patient_id, diagnosis, hour, heart_rate)` خطوة لا غنى عنها؟ - *Arabic:* البيانات المنظمة تجعل 'الساعة' بعداً صريحاً بدلاً من 24 عموداً مستقلاً، مما يتيح التجميع الموجه `groupby(['diagnosis', 'hour'])` وبناء مصفوفات النماذج المتسلسلة بسهولة. - *Arabic:* تنهار أطر التعلم العميق مثل PyTorch و TensorFlow إذا كان إطار البيانات يحوي أكثر من 5 أعمدة. - *Arabic:* تستهلك الجداول العريضة مساحة تخزين تزيد 10 أضعاف عن الجداول المنظمة. - *Arabic:* تقيد بايثون مفاتيح القواميس بالأرقام فقط وتمنع استخدام النصوص كعناوين في الحلقات. *التفسير الهندسي المعمق:* في التنسيق العريض يتطلب التحليل كتابة 24 تعبيراً منفصلاً لكل ساعة؛ بينما في التنسيق المنظم يُنجز باستعلام تجميعي واحد مباشر."
          },
          "options": [
            {
              "text": {
                "en": "Tidy data normalizes the schema so 'hour' is a structured dimension rather than 24 hardcoded column names, enabling vectorized `groupby(['diagnosis', 'hour'])` and sequence tensor generation.",
                "ar": "-  البيانات المنظمة تجعل 'الساعة' بعداً صريحاً بدلاً من 24 عموداً مستقلاً، مما يتيح التجميع الموجه groupby(['diagnosis', 'hour']) وبناء مصفوفات النماذج المتسلسلة بسهولة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Deep learning frameworks like PyTorch and TensorFlow crash if an input DataFrame has more than 5 columns.",
                "ar": "-  تنهار أطر التعلم العميق مثل PyTorch و TensorFlow إذا كان إطار البيانات يحوي أكثر من 5 أعمدة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Wide tables consume 10x more physical storage on disk than melted tidy tables.",
                "ar": "-  تستهلك الجداول العريضة مساحة تخزين تزيد 10 أضعاف عن الجداول المنظمة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "CPython restricts dictionary keys to numbers; column strings cannot be indexed in loops.",
                "ar": "-  تقيد بايثون مفاتيح القواميس بالأرقام فقط وتمنع استخدام النصوص كعناوين في الحلقات."
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
    "id": "relational-algebra-select-filter",
    "title": "Data Contracts & Runtime Validation with Pydantic",
    "titleAr": "خوارزمية التجميع والتقسيم والدمج (Split-Apply-Combine) وتطبيع البيانات",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "How do statistical and database engines calculate complex group metrics without writing bespoke code for every cohort? They use the...",
      "ar": "كيف تحسب محركات البيانات الإحصائية مقاييس المجموعات المعقدة دون كتابة كود مخصص لكل فئة؟ تعتمد جميعها على المعمارية القياسية التقسيم..."
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
          "en": "How do statistical and database engines calculate complex group metrics without writing bespoke code for every cohort?\nThey use the foundational **Split-Apply-Combine** architecture formalized by Hadley Wickham.\n\nWhen computing cohort Z-score normalization ($z = \\frac{x - \\mu_k}{\\sigma_k}$), you don't compare a software engineer's salary to an intern's salary; you **Split** by job title, **Apply** local mean and standard deviation standardization, and **Combine** the standardized scores back into the main dataset!",
          "ar": "كيف تحسب محركات البيانات الإحصائية مقاييس المجموعات المعقدة دون كتابة كود مخصص لكل فئة؟\nتعتمد جميعها على المعمارية القياسية **التقسيم والتطبيق والدمج (Split-Apply-Combine)**.\n\n### تشبيه فرز الغسيل\nتخيل أن أمامك كومة ضخمة من الملابس المختلطة:\n1. **التقسيم (Split)**: تفرز الملابس في سلال مستقلة: بيضاء، داكنة، وصوفية. أي أنك تقسم جدول البيانات الضخم إلى مجموعات جزئية مستقلة.\n2. **التطبيق (Apply)**: تطبق برنامج غسيل مخصص لكل سلة على حدة: ماء ساخن للأبيض، وماء بارد ودوران خفيف للصوف. رياضياً، تطبق دالة إحصائية أو تجميعية على كل مجموعة بمفردها.\n3. **الدمج (Combine)**: تجمع الملابس النظيفة والمجففة معاً في خزانة واحدة مرتبة.\n\nعند حساب التقييس المعياري Z-Score ($z = \\frac{x - \\mu_k}{\\sigma_k}$)، لا تقارن راتب مهندس خبير براتب متدرب؛ بل **تقسم** حسب المسمى الوظيفي، و**تطبق** حساب المتوسط والانحراف لكل فئة، ثم **تدمج** القيم المعيارية في الجدول الأصلي!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{D} = \\bigsqcup_{k \\in \\mathcal{K}} \\mathcal{D}_k, \\quad \\mu_k = \\frac{1}{|\\mathcal{D}_k|} \\sum_{x \\in \\mathcal{D}_k} x, \\quad \\sigma_k = \\sqrt{\\frac{1}{|\\mathcal{D}_k| - 1} \\sum_{x \\in \\mathcal{D}_k} (x - \\mu_k)^2} \\implies z_i = \\frac{x_i - \\mu_k}{\\sigma_k}",
        "formulaNote": {
          "en": "Disjoint partition decomposition and group-wise Z-score standardized transformation.",
          "ar": "تفكيك المجموعات المنفصلة وحساب التحويل المعياري Z-Score لكل فئة."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal definitions govern the three execution phases:\n\n- **$\\mathcal{D}_k = \\{ r \\in \\mathcal{D} \\mid g(r) = k \\}$**: Partition subset where key projection function $g(r)$ evaluates to cohort label $k$.\n- **$\\mathcal{K}$**: Set of distinct group keys, ensuring $\\mathcal{D}_i \\cap \\mathcal{D}_j = \\emptyset$ for $i \\ne j$ (disjoint partitioning).\n- **$\\mu_k, \\sigma_k$**: Local cohort sample mean and Bessel-corrected sample standard deviation ($N-1$ denominator).\n- **$z_i$**: Dimensionless standardized score measuring standard deviations from group mean. If $\\sigma_k = 0$, $z_i \\triangleq 0.0$.\n- **Combine Invariant**: Output preserves the exact row count and ordering of the original input dataset.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتحدد المعادلات الرياضية أطوار التنفيذ الثلاثة:\n- **$\\mathcal{D}_k$**: المجموعة الجزئية التي تحقق دالة المفتاح الفئوي $k$.\n- **$\\mathcal{K}$**: فضاء المفاتيح الفريدة مع ضمان انفصال المجموعات تماماً وعدم تداخلها.\n- **$\\mu_k, \\sigma_k$**: المتوسط الحسابي والانحراف المعياري المحلي لكل فئة مع تصحيح بيسل ($N-1$).\n- **$z_i$**: القيمة المعيارية الخالية من الوحدات، وتعين إلى 0 إذا كان الانحراف صفراً.\n- **ثابت الدمج**: يحافظ الجدول الناتج على عدد صفوف وترتيب المدخلات الأصلية تماماً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-relational-algebra-select-filter",
          "starterCode": "from typing import Any\nfrom collections import defaultdict\nimport math\n\ndef groupby_zscore_normalize(\n    records: list[dict[str, Any]], \n    group_key: str, \n    target_key: str\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Computes group-wise Z-score normalization using Split-Apply-Combine.\n\n    Args:\n        records: List of record dictionaries.\n        group_key: Column name used to split data into cohorts.\n        target_key: Numeric column to standardize.\n\n    Returns:\n        List of new dictionaries with f\"{target_key}_zscore\" attached (rounded to 4 decimals).\n    \"\"\"\n    # Step 1: Split - Group target values by group_key using defaultdict(list)\n    # Step 2: Apply - Compute mean and sample std (N-1) for each group; if len < 2, std = 0.0\n    # Step 3: Combine - Iterate over original records, compute z = (val - mean) / std if std > 0 else 0.0,\n    #         and attach f\"{target_key}_zscore\" rounded to 4 decimals\n    raise NotImplementedError(\"Implement groupby_zscore_normalize\")",
          "testCases": [
            {
              "input": "groupby_zscore_normalize([{'grp': 'A', 'val': 10.0}, {'grp': 'A', 'val': 20.0}], 'grp', 'val')[0]['val_zscore']",
              "expected": "-0.7071"
            },
            {
              "input": "groupby_zscore_normalize([{'grp': 'A', 'val': 10.0}, {'grp': 'A', 'val': 20.0}], 'grp', 'val')[1]['val_zscore']",
              "expected": "0.7071"
            }
          ],
          "expectedOutput": "-0.7071",
          "variants": {
            "python": {
              "starterCode": "from typing import Any\nfrom collections import defaultdict\nimport math\n\ndef groupby_zscore_normalize(\n    records: list[dict[str, Any]], \n    group_key: str, \n    target_key: str\n) -> list[dict[str, Any]]:\n    \"\"\"\n    Computes group-wise Z-score normalization using Split-Apply-Combine.\n\n    Args:\n        records: List of record dictionaries.\n        group_key: Column name used to split data into cohorts.\n        target_key: Numeric column to standardize.\n\n    Returns:\n        List of new dictionaries with f\"{target_key}_zscore\" attached (rounded to 4 decimals).\n    \"\"\"\n    # Step 1: Split - Group target values by group_key using defaultdict(list)\n    # Step 2: Apply - Compute mean and sample std (N-1) for each group; if len < 2, std = 0.0\n    # Step 3: Combine - Iterate over original records, compute z = (val - mean) / std if std > 0 else 0.0,\n    #         and attach f\"{target_key}_zscore\" rounded to 4 decimals\n    raise NotImplementedError(\"Implement groupby_zscore_normalize\")",
              "expectedOutput": "-0.7071"
            }
          },
          "solution": "from typing import Any\nfrom collections import defaultdict\nimport math\n\ndef groupby_zscore_normalize(\n    records: list[dict[str, Any]], \n    group_key: str, \n    target_key: str\n) -> list[dict[str, Any]]:\n    # Stage 1: Split\n    groups: dict[Any, list[float]] = defaultdict(list)\n    for r in records:\n        groups[r[group_key]].append(float(r[target_key]))\n\n    # Stage 2: Apply\n    stats: dict[Any, tuple[float, float]] = {}\n    for g, vals in groups.items():\n        n = len(vals)\n        mean = sum(vals) / n\n        if n < 2:\n            std = 0.0\n        else:\n            variance = sum((x - mean) ** 2 for x in vals) / (n - 1)\n            std = math.sqrt(variance)\n        stats[g] = (mean, std)\n\n    # Stage 3: Combine\n    out_col = f\"{target_key}_zscore\"\n    normalized_records: list[dict[str, Any]] = []\n    \n    for r in records:\n        mean, std = stats[r[group_key]]\n        val = float(r[target_key])\n        z = 0.0 if std == 0.0 else (val - mean) / std\n        normalized_records.append({**r, out_col: round(z, 4)})\n\n    return normalized_records"
        },
        "hints": {
          "tier1": {
            "en": "Use `defaultdict(list)` to gather values for each group key.",
            "ar": "استخدم `defaultdict(list)` لتجميع قيم كل فئة معاً."
          },
          "tier2": {
            "en": "Use sample variance with denominator `(n - 1)`. If `n < 2` or `std == 0.0`, default `z = 0.0`.",
            "ar": "احسب تباين العينة بالمقام `(n - 1)`. وإذا كان `n < 2` أو الانحراف صفراً اجعل `z = 0.0`."
          },
          "tier3": {
            "en": "Round the resulting Z-score to 4 decimal places with `round(z, 4)`.",
            "ar": "قرب قيمة Z-score الناتجة إلى 4 منازل عشرية عبر `round(z, 4)`."
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
            "en": "In an e-commerce credit card fraud detection system, an engineer trains a classifier with global transaction amounts. Transactions at a convenience store of $300 are rare and fraudulent, but at luxury boutiques $300 is below the 10th percentile. Why does cohort-level Split-Apply-Combine normalization drastically boost fraud precision? - **(A)** *(Correct)* Global normalization masks anomalies within low-variance merchant categories; group-wise Z-scoring standardizes features against their true conditional distribution $P(\\text{Amount} \\mid \\text{MerchantCategory})$, exposing localized deviations. - **(B)** Split-Apply-Combine encrypts customer card numbers to meet PCI-DSS compliance regulations. - **(C)** Machine learning gradient descent algorithms fail to converge unless all features sum to exactly 1.0. - **(D)** Credit card processors drop any API transaction with a non-zero Z-score automatically. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Conditioning on the merchant cohort separates variance caused by merchant type from variance indicating fraud, preventing expensive items from drowning out subtle anomalies.",
            "ar": "في نظام رصد الاحتيال المالي، يدرب مهندس نموذجاً باستخدام المبالغ المالية المطلقة. عملية شراء بـ 300 دولار في متجر بقالة تعتبر شاذة واحتيالية جداً، بينما في متجر مجوهرات فاخر تعد عادية جداً. لماذا يؤدي التقييس المعياري بالفئات (Split-Apply-Combine) إلى رفع دقة كشف الاحتيال جذرياً؟ - *Arabic:* التقييس العام يطمس الشذوذ داخل الفئات منخفضة المبالغ؛ بينما يقيس التحويل الفئوي الانحراف عن التوزيع الشرطي الفعلي $P(\\text{Amount} \\mid \\text{MerchantCategory})$ مما يكشف السلوك المشبوه بدقة. - *Arabic:* تقوم خوارزمية Split-Apply-Combine بتشفير أرقام بطاقات الائتمان لتلبية معايير الأمان المصرفي. - *Arabic:* تفشل خوارزميات الانحدار التدريجي في التقارب ما لم يكن مجموع الخصائص مساوياً 1.0 بالضبط. - *Arabic:* تقوم بوابات الدفع برفض أي معاملة تحمل قيمة Z-score غير صفرية تلقائياً. *التفسير الهندسي المعمق:* الشرط الفئوي يفصل التباين الطبيعي لنوع المتجر عن التباين الناتج عن الاحتيال، مانعاً المشتريات الفاخرة من حجب الأنشطة المريبة في المتاجر الصغيرة."
          },
          "options": [
            {
              "text": {
                "en": "Global normalization masks anomalies within low-variance merchant categories; group-wise Z-scoring standardizes features against their true conditional distribution $P(\\text{Amount} \\mid \\text{MerchantCategory})$, exposing localized deviations.",
                "ar": "-  التقييس العام يطمس الشذوذ داخل الفئات منخفضة المبالغ؛ بينما يقيس التحويل الفئوي الانحراف عن التوزيع الشرطي الفعلي $P(\\text{Amount} \\mid \\text{MerchantCategory})$ مما يكشف السلوك المشبوه بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Split-Apply-Combine encrypts customer card numbers to meet PCI-DSS compliance regulations.",
                "ar": "-  تقوم خوارزمية Split-Apply-Combine بتشفير أرقام بطاقات الائتمان لتلبية معايير الأمان المصرفي."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Machine learning gradient descent algorithms fail to converge unless all features sum to exactly 1.0.",
                "ar": "-  تفشل خوارزميات الانحدار التدريجي في التقارب ما لم يكن مجموع الخصائص مساوياً 1.0 بالضبط."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Credit card processors drop any API transaction with a non-zero Z-score automatically.",
                "ar": "-  تقوم بوابات الدفع برفض أي معاملة تحمل قيمة Z-score غير صفرية تلقائياً."
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
    "id": "sql-joins-relational-merges",
    "title": "Formal Relational Algebra Foundations",
    "titleAr": "أسس الجبر العلائقي (Relational Algebra) ونظرية كود",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Before SQL existed, querying databases was a nightmare: programmers wrote procedural loops navigating physical pointers on disk.",
      "ar": "قبل ابتكار لغة SQL، كان استرجاع البيانات كابوساً معقداً: يكتب المبرمجون حلقات تكرارية تبحث في مؤشرات الأقراص الصلبة الفيزيائية."
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
          "en": "Before SQL existed, querying databases was a nightmare: programmers wrote procedural loops navigating physical pointers on disk. In 1970, Edgar F. Codd revolutionized computing by introducing **Relational Algebra**.\n\nRelational Algebra models data as mathematical sets of tuples (relations) and provides a declarative algebra to manipulate them.\n\nYou can never filter an aggregate in `WHERE` because groups do not exist at the gate!",
          "ar": "قبل ابتكار لغة SQL، كان استرجاع البيانات كابوساً معقداً: يكتب المبرمجون حلقات تكرارية تبحث في مؤشرات الأقراص الصلبة الفيزيائية. في عام 1970، أحدث إدغار كود (E. F. Codd) ثورة تاريخية بابتكار **الجبر العلائقي (Relational Algebra)**.\n\nيعامل الجبر العلائقي البيانات كمجموعات رياضية من الصفوف (العلاقات)، ويوفر أدوات جبرية تقريرية لمعالجتها.\n\n### تشبيه بوابات أمن المطار: الفرق بين WHERE و HAVING\nمن أكثر الأخطاء شيوعاً لدى المبتدئين الخلط بين شرطي `WHERE` و `HAVING`:\n- **`WHERE` (بوابة التفتيش الأمني عند المدخل)**: يُفحص كل مسافر بمفرده *قبل* دخول صالة الانتظار. من لا يملك تذكرة سارية يُستبعد فوراً. في الجبر العلائقي، هذا هو **مُعامل الاختيار (Selection $\\sigma$)**، وهو يصفي الصفوف الفردية قبل أي تجميع.\n- **`HAVING` (فحص الرحلة عند بوابة الطائرة)**: بعد دخول الركاب وتوزيعهم على رحلاتهم، يفحص مدير البوابة شروط المجموعة ككل: *\"هل تضم الرحلة 402 أكثر من 10 ركاب وإجمالي أوزانهم أقل من طنين؟\"*. هذا يصفي المجموعات *بعد* إجراء التجميع ($\\gamma$).\n\nيستحيل استخدام الدوال التجميعية داخل `WHERE` لأن المجموعات لم تكن قد وُجدت أصلاً عند بوابة الدخول!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\sigma_\\varphi(R) = \\{ t \\in R \\mid \\varphi(t) = \\text{true} \\}, \\quad \\pi_{A_1, \\dots, A_k}(R) = \\{ (t.A_1, \\dots, t.A_k) \\mid t \\in R \\} \\implies \\sigma_{\\text{having}} \\Big( \\gamma_{G, \\text{agg}(A)}(\\sigma_\\varphi(R)) \\Big)",
        "formulaNote": {
          "en": "Relational algebra selection, projection, and grouped aggregation pipeline pipeline execution order.",
          "ar": "تسلسل عمليات الجبر العلائقي: الاختيار، الإسقاط، والتجميع المشروط."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe fundamental operators of Codd's relational algebra underpin the SQL execution pipeline:\n\n- **$\\sigma_\\varphi(R)$ (Selection)**: Filters tuples from relation $R$ satisfying propositional formula $\\varphi$ (SQL `WHERE`).\n- **$\\pi_{A_1, \\dots, A_k}(R)$ (Projection)**: Retains specified attribute subset while discarding all unlisted columns (SQL `SELECT`).\n- **$\\gamma_{G, \\text{agg}(A)}(R)$ (Aggregation)**: Partitions relation by group attributes $G$ and applies scalar reductions (SQL `GROUP BY`).\n- **$\\sigma_{\\text{having}}$**: Applies post-aggregation selection predicate over computed aggregate values (SQL `HAVING`).\n- **Declarative Independence**: The user specifies *what* relations to produce; the relational engine optimizer chooses *how* to execute them physically.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nالمُعاملات الجبرية الأساسية التي يقوم عليها محرك SQL:\n- **$\\sigma_\\varphi$ (الاختيار Selection)**: تصفية صفوف العلاقة التي تحقق الشرط المنطقي $\\varphi$ (يقابل `WHERE`).\n- **$\\pi$ (الإسقاط Projection)**: اختيار أعمدة محددة وإسقاط بقية الأعمدة (يقابل `SELECT`).\n- **$\\gamma$ (التجميع Aggregation)**: تقسيم العلاقة بحسب حقول المجموعة $G$ وتطبيق دوال الاختزال (يقابل `GROUP BY`).\n- **$\\sigma_{\\text{having}}$**: تصفية المجموعات الناتجة بعد حساب المقاييس الإحصائية (يقابل `HAVING`).\n- **الاستقلالية التقريرية**: يحدد المطور *ما يريد الحصول عليه*، ويقرر المحرك *كيفية تنفيذه فيزيائياً* بأعلى كفاءة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-sql-joins-relational-merges",
          "starterCode": "-- Formulate a DuckDB SQL query filtering pre-aggregation in WHERE\n-- and post-aggregation in HAVING.\n-- Schema: orders(order_id, region, product_category, status, revenue)\n\nSELECT\n    -- Step 1: Project grouping dimensions region and product_category\n    -- Step 2: Compute ROUND(SUM(revenue), 2) AS total_revenue\n    -- Step 3: Compute COUNT(*) AS order_count\nFROM orders\n-- Step 4: Filter individual rows WHERE status = 'COMPLETED'\n-- Step 5: GROUP BY region, product_category\n-- Step 6: Filter groups HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0\n-- Step 7: ORDER BY total_revenue DESC, region ASC\n;\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "SELECT region, COUNT(*) FROM orders WHERE status = 'COMPLETED' GROUP BY region HAVING COUNT(*) >= 2",
              "expected": "VALID_JOIN_PLAN"
            },
            {
              "input": "SELECT product_category, SUM(revenue) FROM orders WHERE status = 'COMPLETED' GROUP BY product_category",
              "expected": "VALID_JOIN_PLAN"
            }
          ],
          "expectedOutput": "VALID_JOIN_PLAN",
          "variants": {
            "python": {
              "starterCode": "-- Formulate a DuckDB SQL query filtering pre-aggregation in WHERE\n-- and post-aggregation in HAVING.\n-- Schema: orders(order_id, region, product_category, status, revenue)\n\nSELECT\n    -- Step 1: Project grouping dimensions region and product_category\n    -- Step 2: Compute ROUND(SUM(revenue), 2) AS total_revenue\n    -- Step 3: Compute COUNT(*) AS order_count\nFROM orders\n-- Step 4: Filter individual rows WHERE status = 'COMPLETED'\n-- Step 5: GROUP BY region, product_category\n-- Step 6: Filter groups HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0\n-- Step 7: ORDER BY total_revenue DESC, region ASC\n;\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "VALID_JOIN_PLAN"
            }
          },
          "solution": "-- Formulate a DuckDB SQL query filtering pre-aggregation in WHERE\n-- and post-aggregation in HAVING.\n-- Schema: orders(order_id, region, product_category, status, revenue)\n\nSELECT\n    -- Step 1: Project grouping dimensions region and product_category\n    -- Step 2: Compute ROUND(SUM(revenue), 2) AS total_revenue\n    -- Step 3: Compute COUNT(*) AS order_count\nFROM orders\n-- Step 4: Filter individual rows WHERE status = 'COMPLETED'\n-- Step 5: GROUP BY region, product_category\n-- Step 6: Filter groups HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0\n-- Step 7: ORDER BY total_revenue DESC, region ASC\n;"
        },
        "hints": {
          "tier1": {
            "en": "Filter completed orders first using `WHERE status = 'COMPLETED'` before grouping.",
            "ar": "صفِّ الطلبات المكتملة أولاً بـ `WHERE status = 'COMPLETED'` قبل إجراء التجميع."
          },
          "tier2": {
            "en": "Group by both `region, product_category` to compute multi-dimensional aggregates.",
            "ar": "اجمع بحسب العمودين `region, product_category` لحساب المؤشرات متعددة الأبعاد."
          },
          "tier3": {
            "en": "Place the aggregate thresholds in the `HAVING` clause: `HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0`.",
            "ar": "ضع شروط المقاييس في عبارة `HAVING`: `HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0`."
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
            "en": "A junior database developer attempts to optimize a slow query by writing: `SELECT dept_id, AVG(salary) FROM employees WHERE AVG(salary) > 80000 GROUP BY dept_id;`. The engine terminates with `SyntaxError: aggregate functions are not allowed in WHERE`. Why does relational algebra strictly forbid aggregates in WHERE? - **(A)** *(Correct)* The selection operator $\\sigma_{\\text{WHERE}}$ filters individual tuples prior to the partition operator $\\gamma_{\\text{GROUP BY}}$; aggregate values do not exist until groups have been materialized, requiring post-filter evaluation in $\\sigma_{\\text{HAVING}}$. - **(B)** The WHERE clause is evaluated on the network card, which cannot compute division operations. - **(C)** Aggregations can only be evaluated if the table has an explicit B-tree primary key index. - **(D)** SQL parsers limit WHERE clauses to simple equality comparisons (`=`) for ACID compliance. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Relational execution strictly processes rows sequentially through the selection filter before hashing or sorting into group buckets. Aggregate metrics like `AVG()` are properties of sets, not individual tuples.",
            "ar": "حاول مبرمج تحسين استعلام بطيء فكتب: `SELECT dept_id, AVG(salary) FROM employees WHERE AVG(salary) > 80000 GROUP BY dept_id;`، فأطلق محرك البيانات خطأ يمنع الدوال التجميعية في WHERE. لماذا يحظر الجبر العلائقي وضع الدوال التجميعية داخل شرط WHERE؟ - *Arabic:* مُعامل الاختيار $\\sigma_{\\text{WHERE}}$ يصفي الصفوف الفردية قبل تشغيل مُعامل التقسيم الفئوي $\\gamma$؛ وبالتالي لا وجود لقيم التجميع قبل تشكيل المجموعات، مما يفرض وضعها في $\\sigma_{\\text{HAVING}}$. - *Arabic:* يتم تقييم شرط WHERE على بطاقة الشبكة وهي لا تدعم عمليات القسمة الحسابية. - *Arabic:* لا يمكن حساب التجميعات إلا إذا كان الجدول يملك فهرس شجرة B-Tree للمفتاح الأساسي. - *Arabic:* تقيد محركات SQL شرط WHERE بالمساواة البسيطة فقط لضمان توافق معايير ACID. *التفسير الهندسي المعمق:* تخضع المعالجة العلائقية لتسلسل صارم يصفي الصفوف قبل توزيعها في سلال المجموعات؛ والمتوسط الحسابي خاصية للمجموعة وليس للصف الفردي."
          },
          "options": [
            {
              "text": {
                "en": "The selection operator $\\sigma_{\\text{WHERE}}$ filters individual tuples prior to the partition operator $\\gamma_{\\text{GROUP BY}}$; aggregate values do not exist until groups have been materialized, requiring post-filter evaluation in $\\sigma_{\\text{HAVING}}$.",
                "ar": "-  مُعامل الاختيار $\\sigma{\\text{WHERE}}$ يصفي الصفوف الفردية قبل تشغيل مُعامل التقسيم الفئوي $\\gamma$؛ وبالتالي لا وجود لقيم التجميع قبل تشكيل المجموعات، مما يفرض وضعها في $\\sigma{\\text{HAVING}}$."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The WHERE clause is evaluated on the network card, which cannot compute division operations.",
                "ar": "-  يتم تقييم شرط WHERE على بطاقة الشبكة وهي لا تدعم عمليات القسمة الحسابية."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Aggregations can only be evaluated if the table has an explicit B-tree primary key index.",
                "ar": "-  لا يمكن حساب التجميعات إلا إذا كان الجدول يملك فهرس شجرة B-Tree للمفتاح الأساسي."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "SQL parsers limit WHERE clauses to simple equality comparisons (`=`) for ACID compliance.",
                "ar": "-  تقيد محركات SQL شرط WHERE بالمساواة البسيطة فقط لضمان توافق معايير ACID."
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
    "id": "sql-aggregations-group-by",
    "title": "Relational Joins & Set Semantics",
    "titleAr": "الربط العلائقي (Joins) ودلالات المجموعات وقيم NULL",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "What happens when you combine information across two different tables? You perform a Relational Join.",
      "ar": "ماذا يحدث عندما تدمج بيانات موزعة بين جدولين منفصلين؟ تُجري عملية ربط علائقي (Relational Join)."
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
          "en": "What happens when you combine information across two different tables? You perform a **Relational Join**.\nBeginners often memorize join Venn diagrams, which are notoriously misleading because joins produce Cartesian products of rows, not simple geometric set overlaps!\n\nIf you calculate Customer Lifetime Value using an **INNER JOIN**, you make a catastrophic data engineering mistake: you silently delete every inactive customer with 0 purchases, artificially inflating your reported revenue metrics!",
          "ar": "ماذا يحدث عندما تدمج بيانات موزعة بين جدولين منفصلين؟ تُجري عملية **ربط علائقي (Relational Join)**.\nيحفظ المبتدئون عادةً مخططات فن (Venn Diagrams) الدائرية، وهي مضللة تماماً لأن عمليات الربط تنتج جداءات ديكارتية للصفوف وليست مجرد تداخلات مجموعات بسيطة!\n\n### تشبيه مأدبة التعارف: مطابقة بطاقات الأسماء\nتخيل حفل عشاء عمل يضم طاولتين:\n- الطاولة الأولى (A) تضم **العملاء المسجلين**.\n- الطاولة الثانية (B) تضم **إيصالات المعاملات الشرائية**.\nيحمل كل شخص بطاقة باسمه ورقم تعريفه `customer_id`.\n1. **الربط الداخلي (INNER JOIN)**: يجلس فقط العميل الذي يجد إيصالاً مطابقاً له في الطاولة المقابلة. أي عميل لم يشترِ، وأي إيصال بلا صاحب، يُطردان خارج القاعة!\n2. **الربط اليساري (LEFT JOIN)**: **كل عميل من الطاولة A يضمن مقعده في القاعة دون استثناء!** إذا لم يجرِ أي معاملة (عميل جديد أو مغادر)، يُترك المقعد المقابل له فارغاً (`NULL`). لا يُطرد أي عميل أبداً!\n3. **الربط الكامل (FULL OUTER JOIN)**: يضمن الجميع مقاعدهم من كلا الطرفين، مع مقاعد فارغة (`NULL`) لمن لم يجد شريكاً.\n\nإذا حسبت القيمة الدائمة للعميل بـ **INNER JOIN**، سترتكب خطأ كارثياً: ستحذف سراً كل العملاء غير النشطين ذوي المبيعات الصفرية، مما يضخم أرقامك المالية بشكل زائف!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S), \\quad R \\ \\text{⟕}_\\theta \\ S = (R \\bowtie_\\theta S) \\cup \\left\\{ (r, \\boldsymbol{\\omega}_S) \\mid r \\in R \\land \\neg \\exists s \\in S : \\theta(r, s) \\right\\}",
        "formulaNote": {
          "en": "Relational inner join as selection over Cartesian product and left outer join with null tuple extension.",
          "ar": "الربط الداخلي كاختيار من الجداء الديكارتي، والربط الخارجي اليساري مع صفوف القيم الفارغة."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal definitions establish why outer joins preserve non-matching entity domains:\n\n- **$R \\times S$**: Unconstrained Cartesian product generating $|R| \\cdot |S|$ pairwise tuple combinations.\n- **$\\theta(r, s)$**: Equi-join boolean predicate (e.g. $r.\\text{customer\\_id} = s.\\text{customer\\_id}$).\n- **$\\boldsymbol{\\omega}_S$**: Null tuple of shape $|\\text{attrs}(S)|$ populating missing right-side attributes with $\\bot_{\\text{NULL}}$.\n- **Outer Join Guarantee**: $|R \\ \\text{⟕}_\\theta \\ S| \\ge |R|$, guaranteeing that no entity from the left domain $R$ is discarded.\n- **COALESCE Invariant**: $\\text{COALESCE}(v, 0)$ maps $\\bot_{\\text{NULL}} \\mapsto 0$, essential for computing zero-transaction sums.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nالصياغة الجبرية تبرهن لماذا يحافظ الربط الخارجي على فضاء الكيانات:\n- **$R \\times S$**: الجداء الديكارتي الشامل لجميع الاحتمالات بعدد صفوف $|R| \\cdot |S|$.\n- **$\\theta(r, s)$**: شرط المطابقة المنطقي بين مفاتيح الربط.\n- **$\\boldsymbol{\\omega}_S$**: صف فارغ يملأ أعمدة الجدول الأيمن بقيم $\\bot_{\\text{NULL}}$ عند غياب الشريك.\n- **ضمان الربط اليساري**: عدد صفوف الناتج لا يقل أبداً عن عدد صفوف الجدول الأيسر $|R|$.\n- **ثابت COALESCE**: تحول الدالة القيمة الفارغة إلى صفر لمعالجة الحسابات التجميعية بدقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-sql-aggregations-group-by",
          "starterCode": "-- Formulate a DuckDB SQL query computing Customer Lifetime Value\n-- handling customers with 0 transactions using LEFT JOIN and COALESCE.\n-- Schema: customers(customer_id, customer_name), transactions(txn_id, customer_id, amount)\n\nSELECT\n    -- Step 1: Select c.customer_id, c.customer_name\n    -- Step 2: Compute total_spent: COALESCE(ROUND(SUM(t.amount), 2), 0.0)\n    -- Step 3: Compute transaction_count: COUNT(t.txn_id)\nFROM customers c\n-- Step 4: LEFT JOIN transactions t ON c.customer_id = t.customer_id\n-- Step 5: GROUP BY c.customer_id, c.customer_name\n-- Step 6: ORDER BY total_spent DESC, c.customer_id ASC\n;\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "SELECT c.customer_id, COUNT(t.txn_id) FROM customers c LEFT JOIN transactions t ON c.customer_id = t.customer_id GROUP BY c.customer_id",
              "expected": "VALID_JOIN_PLAN"
            },
            {
              "input": "SELECT c.customer_name, COALESCE(SUM(t.amount), 0.0) FROM customers c LEFT JOIN transactions t ON c.customer_id = t.customer_id GROUP BY c.customer_name",
              "expected": "VALID_JOIN_PLAN"
            }
          ],
          "expectedOutput": "VALID_JOIN_PLAN",
          "variants": {
            "python": {
              "starterCode": "-- Formulate a DuckDB SQL query computing Customer Lifetime Value\n-- handling customers with 0 transactions using LEFT JOIN and COALESCE.\n-- Schema: customers(customer_id, customer_name), transactions(txn_id, customer_id, amount)\n\nSELECT\n    -- Step 1: Select c.customer_id, c.customer_name\n    -- Step 2: Compute total_spent: COALESCE(ROUND(SUM(t.amount), 2), 0.0)\n    -- Step 3: Compute transaction_count: COUNT(t.txn_id)\nFROM customers c\n-- Step 4: LEFT JOIN transactions t ON c.customer_id = t.customer_id\n-- Step 5: GROUP BY c.customer_id, c.customer_name\n-- Step 6: ORDER BY total_spent DESC, c.customer_id ASC\n;\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "VALID_JOIN_PLAN"
            }
          },
          "solution": "-- Formulate a DuckDB SQL query computing Customer Lifetime Value\n-- handling customers with 0 transactions using LEFT JOIN and COALESCE.\n-- Schema: customers(customer_id, customer_name), transactions(txn_id, customer_id, amount)\n\nSELECT\n    -- Step 1: Select c.customer_id, c.customer_name\n    -- Step 2: Compute total_spent: COALESCE(ROUND(SUM(t.amount), 2), 0.0)\n    -- Step 3: Compute transaction_count: COUNT(t.txn_id)\nFROM customers c\n-- Step 4: LEFT JOIN transactions t ON c.customer_id = t.customer_id\n-- Step 5: GROUP BY c.customer_id, c.customer_name\n-- Step 6: ORDER BY total_spent DESC, c.customer_id ASC\n;"
        },
        "hints": {
          "tier1": {
            "en": "Use `LEFT JOIN transactions t ON c.customer_id = t.customer_id` so non-purchasing customers are preserved.",
            "ar": "استخدم `LEFT JOIN` لربط المعاملات حتى لا يُحذف العملاء الذين لم يشتروا شيئاً."
          },
          "tier2": {
            "en": "Wrap the sum in `COALESCE(ROUND(SUM(t.amount), 2), 0.0)` to convert null totals into 0.0.",
            "ar": "غلّف المجموع بدالة `COALESCE(..., 0.0)` لتحويل القيم الفارغة إلى 0.0."
          },
          "tier3": {
            "en": "Count `COUNT(t.txn_id)` rather than `COUNT(*)` so customers with zero transactions report a count of 0 instead of 1.",
            "ar": "استخدم `COUNT(t.txn_id)` بدلاً من `COUNT(*)` حتى يظهر عدد معاملات العميل الفارغ 0 وليس 1."
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
            "en": "A marketing data science team computes customer churn probability. The original data pipeline joins customers with transactions using `INNER JOIN`. The resulting model predicts an impossible 0% churn rate across the entire user base. Why did using INNER JOIN corrupt the training dataset? - **(A)** *(Correct)* INNER JOIN drops all customer records lacking matching transaction rows; churned customers (who made zero recent purchases) were completely eliminated from the sample, causing survival selection bias. - **(B)** INNER JOIN stores transaction currency values in Euros instead of US Dollars. - **(C)** The DuckDB database engine automatically deletes inactive users from disk during an INNER JOIN. - **(D)** LEFT JOIN requires a GPU graphics card while INNER JOIN runs on the CPU. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** An INNER JOIN requires tuples to satisfy the join predicate on both sides. Users with zero transactions produce no join matches and are omitted entirely from the dataset, leaving only active surviving users.",
            "ar": "يحسب فريق علم بيانات معدل تسرب العملاء (Churn). استخدم خط الأنابيب السابق `INNER JOIN` لدمج جدول العملاء مع المعاملات. تنبأ النموذج بنسبة تسرب مستحيلة قدرها 0% لجميع العملاء! لماذا دمر استخدام INNER JOIN بيانات تدريب النموذج؟ - *Arabic:* يحذف الربط الداخلي INNER JOIN جميع العملاء الذين ليس لديهم معاملات؛ وبالتالي استُبعد العملاء المتسربون (الذين لم يشتروا مؤخراً) تماماً من العينة مما أحدث انحياز البقاء. - *Arabic:* يقوم INNER JOIN بتخزين العملات باليورو بدلاً من الدولار الأمريكي. - *Arabic:* يقوم محرك قواعد البيانات بحذف العملاء غير النشطين نهائياً من القرص أثناء الربط الداخلي. - *Arabic:* يتطلب الربط الخارجي كرت شاشة GPU بينما يعمل الربط الداخلي على المعالج المركزي. *التفسير الهندسي المعمق:* يتطلب الربط الداخلي وجود سجلات في الطرفين. العملاء الذين لم يشتروا لا يملكون معاملات مطابقة فيُحذفون تماماً، مما يبقي العملاء النشطين فقط ويزيف النتائج."
          },
          "options": [
            {
              "text": {
                "en": "INNER JOIN drops all customer records lacking matching transaction rows; churned customers (who made zero recent purchases) were completely eliminated from the sample, causing survival selection bias.",
                "ar": "-  يحذف الربط الداخلي INNER JOIN جميع العملاء الذين ليس لديهم معاملات؛ وبالتالي استُبعد العملاء المتسربون (الذين لم يشتروا مؤخراً) تماماً من العينة مما أحدث انحياز البقاء."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "INNER JOIN stores transaction currency values in Euros instead of US Dollars.",
                "ar": "-  يقوم INNER JOIN بتخزين العملات باليورو بدلاً من الدولار الأمريكي."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The DuckDB database engine automatically deletes inactive users from disk during an INNER JOIN.",
                "ar": "-  يقوم محرك قواعد البيانات بحذف العملاء غير النشطين نهائياً من القرص أثناء الربط الداخلي."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "LEFT JOIN requires a GPU graphics card while INNER JOIN runs on the CPU.",
                "ar": "-  يتطلب الربط الخارجي كرت شاشة GPU بينما يعمل الربط الداخلي على المعالج المركزي."
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
    "id": "sql-window-functions",
    "title": "SQL Declarative Execution Lifecycle",
    "titleAr": "دورة حياة التنفيذ التقريري في SQL (ترتيب المعالجة الداخلي)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "You write SQL queries in one order, but the database engine executes them in a completely different order! When you write SQL, you start...",
      "ar": "أنت تكتب استعلام SQL بترتيب معين، لكن محرك قواعد البيانات ينفذه بترتيب فيزيائي مختلف تماماً! عند كتابة الاستعلام، تبدأ عادةً بـ SELECT: sql..."
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
          "en": "You write SQL queries in one order, but the database engine executes them in a completely different order!\nWhen you write SQL, you start with `SELECT`:\n```sql\nSELECT dept, SUM(sales) AS total FROM transactions WHERE total > 100 GROUP BY dept; -- ERROR!\n```\nWhy does this fail with *\"Column 'total' does not exist\"*? Because `SELECT` does not run first!\n\nYou cannot filter by a garnish label in `WHERE` because the vegetables haven't even been washed yet!",
          "ar": "أنت تكتب استعلام SQL بترتيب معين، لكن محرك قواعد البيانات ينفذه بترتيب فيزيائي مختلف تماماً!\nعند كتابة الاستعلام، تبدأ عادةً بـ `SELECT`:\n```sql\nSELECT dept, SUM(sales) AS total FROM transactions WHERE total > 100 GROUP BY dept; -- خطأ!\n```\nلماذا يفشل هذا الاستعلام برسالة *\"العمود total غير موجود\"*؟ لأن `SELECT` لا تنفذ أولاً!\n\n### تشبيه مطبخ المطعم: الترتيب البصري مقابل ترتيب الطهي الفعلي\nتخيل مطبخاً فاخراً يعد وجبات العشاء:\n1. **`FROM` و `JOIN` (جلب المكونات من المستودع)**: يُحضر العمال أكياس اللحم والخضار الخام إلى المطبخ.\n2. **`WHERE` (غسل واستبعاد الخضار التالفة)**: يستبعد الطاهي الخضار الفاسدة فوراً قبل تقطيعها.\n3. **`GROUP BY` (التوزيع في قدور الطهي)**: تُوزع المكونات في قدور مستقلة (قدر الحساء، قدر اللحم).\n4. **`HAVING` (تذوق مرق القدر ككل)**: يتذوق الطاهي القدر كاملاً: *\"هل كمية الملح في هذا القدر كافية؟\"*.\n5. **`SELECT` (سكب الطعام وتزيين الطبق)**: هنا فقط يُسكب الطعام في أطباق التقديم وتوضع بطاقة الاسم التزيينية (`AS total`).\n6. **`ORDER BY` (ترتيب أطباق صينية التقديم)**: تُرتب الأطباق تصاعدياً أو تنازلياً.\n7. **`LIMIT` (تقديم أول وجبات للزبائن)**: يخرج النادل بأول 5 أطباق جاهزة.\n\nيستحيل تصفية الخضار في خطوة `WHERE` بناءً على بطاقة تزيين الطبق التي لم تُصنع إلا في `SELECT`!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Pipeline}(\\mathcal{D}) = (\\lambda_{\\text{LIMIT}} \\circ \\omega_{\\text{ORDER}} \\circ \\delta_{\\text{DISTINCT}} \\circ \\pi_{\\text{SELECT}} \\circ \\sigma_{\\text{HAVING}} \\circ \\gamma_{\\text{GROUP}} \\circ \\sigma_{\\text{WHERE}} \\circ \\bowtie_{\\text{FROM}})(\\mathcal{D})",
        "formulaNote": {
          "en": "Strict mathematical function composition defining the physical evaluation sequence of declarative SQL.",
          "ar": "التركيب الرياضي الصارم للدوال المحددة لتسلسل المعالجة الفيزيائية في محركات SQL."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe algebraic composition operator $\\circ$ formalizes the exact physical execution order:\n\n1. **$\\bowtie_{\\text{FROM}}$**: Resolves source tables, evaluates join trees, and materializes candidate records.\n2. **$\\sigma_{\\text{WHERE}}$**: Filters scalar rows before grouping. *Cannot reference aliases defined in $\\pi_{\\text{SELECT}}$.*\n3. **$\\gamma_{\\text{GROUP}}$**: Aggregates records into partition buckets by grouping expressions.\n4. **$\\sigma_{\\text{HAVING}}$**: Discards entire partition buckets based on aggregate criteria.\n5. **$\\pi_{\\text{SELECT}}$**: Evaluates projections, window functions, and binds output column aliases.\n6. **$\\delta_{\\text{DISTINCT}}$**: Eliminates duplicate projection tuples from the active stream.\n7. **$\\omega_{\\text{ORDER}}$**: Sorts the finalized projected rows (can reference aliases bound in $\\pi_{\\text{SELECT}}$).\n8. **$\\lambda_{\\text{LIMIT}}$**: Slices top-$K$ rows from the stream before returning to client.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nيوضح تركيب الدوال الرياضي $\\circ$ الترتيب الفيزيائي الدقيق للتنفيذ:\n1. **$\\bowtie_{\\text{FROM}}$**: جلب الجداول وتنفيذ شجرة الربط وإنتاج السجلات الأولية.\n2. **$\\sigma_{\\text{WHERE}}$**: تصفية الصفوف الفردية قبل التجميع (لا يمكنها قراءة أسماء أعمدة SELECT).\n3. **$\\gamma_{\\text{GROUP}}$**: تجميع الصفوف في سلال مستقلة حسب حقول التجميع.\n4. **$\\sigma_{\\text{HAVING}}$**: تصفية وحذف سلال المجموعات بناءً على نتائج المقاييس.\n5. **$\\pi_{\\text{SELECT}}$**: حساب التعبيرات وإطلاق الأسماء المستعارة Aliases.\n6. **$\\delta_{\\text{DISTINCT}}$**: إزالة الصفوف المكررة من تيار المخرجات.\n7. **$\\omega_{\\text{ORDER}}$**: ترتيب الصفوف النهائية (يمكنها استخدام الأسماء المعرفة في SELECT).\n8. **$\\lambda_{\\text{LIMIT}}$**: اقتطاع أول عدد محدد من الصفوف لإرجاعها للمستخدم."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-sql-window-functions",
          "starterCode": "-- Formulate a DuckDB SQL query pivoting sales into quarterly columns\n-- using conditional aggregation CASE WHEN expressions.\n-- Schema: sales(sale_id, dept_name, sale_date, revenue)\n\nSELECT\n    -- Step 1: dept_name\n    -- Step 2: Pivoted quarters:\n    --         ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue\n    -- Step 3: Compute q2_revenue, q3_revenue, q4_revenue, and ROUND(SUM(revenue), 2) AS annual_total\nFROM sales\n-- Step 4: Filter sales in 2024: WHERE EXTRACT(YEAR FROM sale_date) = 2024\n-- Step 5: GROUP BY dept_name\n-- Step 6: ORDER BY annual_total DESC, dept_name ASC\n;\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "SELECT dept_name, SUM(revenue) AS annual_total FROM sales WHERE EXTRACT(YEAR FROM sale_date) = 2024 GROUP BY dept_name ORDER BY annual_total DESC",
              "expected": "VALID_JOIN_PLAN"
            },
            {
              "input": "SELECT dept_name, SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END) AS q1 FROM sales GROUP BY dept_name",
              "expected": "VALID_JOIN_PLAN"
            }
          ],
          "expectedOutput": "VALID_JOIN_PLAN",
          "variants": {
            "python": {
              "starterCode": "-- Formulate a DuckDB SQL query pivoting sales into quarterly columns\n-- using conditional aggregation CASE WHEN expressions.\n-- Schema: sales(sale_id, dept_name, sale_date, revenue)\n\nSELECT\n    -- Step 1: dept_name\n    -- Step 2: Pivoted quarters:\n    --         ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue\n    -- Step 3: Compute q2_revenue, q3_revenue, q4_revenue, and ROUND(SUM(revenue), 2) AS annual_total\nFROM sales\n-- Step 4: Filter sales in 2024: WHERE EXTRACT(YEAR FROM sale_date) = 2024\n-- Step 5: GROUP BY dept_name\n-- Step 6: ORDER BY annual_total DESC, dept_name ASC\n;\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "VALID_JOIN_PLAN"
            }
          },
          "solution": "-- Formulate a DuckDB SQL query pivoting sales into quarterly columns\n-- using conditional aggregation CASE WHEN expressions.\n-- Schema: sales(sale_id, dept_name, sale_date, revenue)\n\nSELECT\n    -- Step 1: dept_name\n    -- Step 2: Pivoted quarters:\n    --         ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue\n    -- Step 3: Compute q2_revenue, q3_revenue, q4_revenue, and ROUND(SUM(revenue), 2) AS annual_total\nFROM sales\n-- Step 4: Filter sales in 2024: WHERE EXTRACT(YEAR FROM sale_date) = 2024\n-- Step 5: GROUP BY dept_name\n-- Step 6: ORDER BY annual_total DESC, dept_name ASC\n;"
        },
        "hints": {
          "tier1": {
            "en": "Filter for year 2024 in the `WHERE` clause: `WHERE EXTRACT(YEAR FROM sale_date) = 2024`.",
            "ar": "صفِّ بيانات سنة 2024 في شرط `WHERE`: `WHERE EXTRACT(YEAR FROM sale_date) = 2024`."
          },
          "tier2": {
            "en": "Use conditional sum `SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = Q THEN revenue ELSE 0 END)` for each quarter Q.",
            "ar": "استخدم الجمع المشروط بـ `CASE WHEN` لعزل مبيعات كل ربع سنوي."
          },
          "tier3": {
            "en": "Sort by `ORDER BY annual_total DESC, dept_name ASC`. Note that `ORDER BY` can reference the alias `annual_total` because it executes after `SELECT`!",
            "ar": "رتب بـ `ORDER BY annual_total DESC, dept_name ASC`. لاحظ أن `ORDER BY` تستطيع قراءة الاسم المستعار لأنها تنفذ بعد `SELECT`!"
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
            "en": "A database query fails with: `SELECT region, SUM(amount) AS regional_rev FROM sales WHERE regional_rev > 50000 GROUP BY region;` -> `Error: column 'regional_rev' does not exist`. Yet `ORDER BY regional_rev DESC` works without error. How does the declarative execution lifecycle explain this? - **(A)** *(Correct)* `WHERE` executes at Step 2 before `SELECT` creates the alias `regional_rev` at Step 5; whereas `ORDER BY` executes at Step 7 after `SELECT`, allowing it to consume bound projection aliases. - **(B)** `regional_rev` is an encrypted identifier that can only be decrypted during the final sorting phase. - **(C)** The SQL database driver only compiles queries when `regional_rev` contains uppercase letters. - **(D)** `ORDER BY` is executed in the user's web browser, while `WHERE` runs on the database server. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Because the execution order is `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY`, aliases defined in `SELECT` are completely invisible to `WHERE`. Post-aggregate filtering must use `HAVING SUM(amount) > 50000`.",
            "ar": "يفشل استعلام بالرسالة: `SELECT region, SUM(amount) AS regional_rev FROM sales WHERE regional_rev > 50000 GROUP BY region;` -> `العمود regional_rev غير موجود`. بينما تعمل عبارة `ORDER BY regional_rev DESC` بنجاح تام. كيف تفسر دورة حياة التنفيذ التقريري هذا التناقض الظاهري؟ - *Arabic:* ينفذ `WHERE` في الخطوة 2 قبل أن تُنشئ `SELECT` الاسم المستعار في الخطوة 5؛ بينما ينفذ `ORDER BY` في الخطوة 7 بعد `SELECT` مما يتيح له قراءة الأسماء المستعارة بسهولة. - *Arabic:* الاسم المستعار معرف مشفر لا يمكن فك تشفيره إلا في مرحلة الترتيب النهائية. - *Arabic:* يقوم محرك قواعد البيانات بترجمة الاستعلامات فقط عندما تحتوي الأسماء المستعارة على حروف كبيرة. - *Arabic:* تُنفذ عبارة `ORDER BY` داخل متصفح المستخدم، بينما تُنفذ `WHERE` على خادم قواعد البيانات. *التفسير الهندسي المعمق:* لأن الترتيب الداخلي هو `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY`، تكون الأسماء المستعارة في SELECT غير مرئية تماماً لـ WHERE. والتصفية الصحيحة تتطلب `HAVING SUM(amount) > 50000`."
          },
          "options": [
            {
              "text": {
                "en": "`WHERE` executes at Step 2 before `SELECT` creates the alias `regional_rev` at Step 5; whereas `ORDER BY` executes at Step 7 after `SELECT`, allowing it to consume bound projection aliases.",
                "ar": "-  ينفذ WHERE في الخطوة 2 قبل أن تُنشئ SELECT الاسم المستعار في الخطوة 5؛ بينما ينفذ ORDER BY في الخطوة 7 بعد SELECT مما يتيح له قراءة الأسماء المستعارة بسهولة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "`regional_rev` is an encrypted identifier that can only be decrypted during the final sorting phase.",
                "ar": "-  الاسم المستعار معرف مشفر لا يمكن فك تشفيره إلا في مرحلة الترتيب النهائية."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The SQL database driver only compiles queries when `regional_rev` contains uppercase letters.",
                "ar": "-  يقوم محرك قواعد البيانات بترجمة الاستعلامات فقط عندما تحتوي الأسماء المستعارة على حروف كبيرة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "`ORDER BY` is executed in the user's web browser, while `WHERE` runs on the database server.",
                "ar": "-  تُنفذ عبارة ORDER BY داخل متصفح المستخدم، بينما تُنفذ WHERE على خادم قواعد البيانات."
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
    "id": "sql-ctes-recursive-queries",
    "title": "Window Functions & Analytic Partitioning",
    "titleAr": "دوال النوافذ (Window Functions) والتقسيم التحليلي",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Standard SQL GROUP BY is like a heavy hydraulic trash compactor: it takes 1,000 individual employee rows in the Engineering department and...",
      "ar": "تعتبر عملية التجميع التقليدية GROUP BY في SQL كأنها مكبس نفايات هيدروليكي: تأخذ 1,000 موظف في قسم الهندسة وتضغطهم في سطر ملخص واحد:..."
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
          "en": "Standard SQL `GROUP BY` is like a heavy hydraulic trash compactor: it takes 1,000 individual employee rows in the Engineering department and squashes them into a single summary dot: `(\"Engineering\", 1000, 125000)`. The names, individual salaries, and hire dates of all 1,000 employees are permanently destroyed from the output!\n\nWhat if you need to calculate each employee's salary rank or compare their pay to the department maximum, *while still keeping every individual employee's row visible*?\nEnter **Window Functions** (`OVER (PARTITION BY ...)`).\n\nYou get rich, multi-tiered aggregate analytics **without losing a single row of granular data**!",
          "ar": "تعتبر عملية التجميع التقليدية `GROUP BY` في SQL كأنها مكبس نفايات هيدروليكي: تأخذ 1,000 موظف في قسم الهندسة وتضغطهم في سطر ملخص واحد: `(\"الهندسة\"، 1000، 125000)`. فتختفي أسماء وتفاصيل ورواتب أولئك الموظفين الـ 1,000 تماماً من الناتج!\n\nماذا لو أردت حساب ترتيب كل موظف أو مقارنة راتبه بأعلى راتب في قسمه، *مع الإبقاء على كل صف فردي كما هو دون حذفه*؟\nهنا يأتي دور **الدوال النافذية (Window Functions)** عبر العبارة السحرية `OVER (PARTITION BY ...)`.\n\n### تشبيه شرفة المراقبة الزجاجية المعلقة\nتخيل ممشى زجاجياً مرتفعاً معلقاً فوق قاعة تداول كبرى:\n- يبقى كل متداول جالساً في مكتبه، وتظل تفاصيل كل صف محفوظة بالكامل دون أي ضغط أو حذف.\n- يمشي مشرف التدقيق على الممشى الزجاجي في الأعلى.\n- ينظر المشرف عبر نافذة زجاجية (`OVER`)، ويقسم المكاتب ذهنياً حسب القسم (`PARTITION BY dept_name`)، ويرتبهم حسب الراتب (`ORDER BY salary DESC`)، ثم يسجل ترتيب كل فرد (`DENSE_RANK()`) والفارق بين راتبه وأعلى راتب في القسم بجانب اسمه.\n\nتحصل على مؤشرات تجميعية وتحليلية عميقة **دون التضحية بأي صف أو تفصيلة دقيقة في البيانات**!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{W}_f(t) = f\\Big( \\big\\{ s \\in R \\mid p(s) = p(t) \\land s \\in \\text{Frame}(t) \\big\\} \\Big), \\quad \\text{DENSE\\_RANK}(t) = 1 + \\big| \\{ v \\in \\text{vals}(p(t)) \\mid v > t.\\text{val} \\} \\big|",
        "formulaNote": {
          "en": "Window analytic function mapping over partitioned frame subsets and dense ranking invariant without rank gaps.",
          "ar": "التعريف الجبري للدالة النافذية على أطر التقسيم وصيغة الترتيب الكثيف دون فجوات عددية."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal definitions characterize the non-reductive nature of window calculations:\n\n- **$R$**: Active relation stream entering Step 5 ($\\pi_{\\text{SELECT}}$) of the execution lifecycle.\n- **$p(t)$**: Partition hash key (e.g., `dept_name`), dividing relation into disjoint subsets $\\mathcal{P}_k$.\n- **$\\text{Frame}(t)$**: Ordered subset of rows visible to tuple $t$ dictated by the window framing specification.\n- **$\\mathcal{W}_f(t)$**: Analytic scalar value appended to tuple $t$ as an additional projected attribute.\n- **Row Preservation Invariant**: $|\\text{Output}| = |R|$, ensuring exactly one output row per input row.\n- **DENSE_RANK vs. RANK**: `DENSE_RANK` produces consecutive integer ranks ($1, 2, 2, 3$) upon ties; `RANK` introduces gaps ($1, 2, 2, 4$).\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتوضح الصياغة الرياضية الطبيعة غير الاختزالية للعمليات النافذية:\n- **$R$**: تيار السجلات النشط الواصل لمرحلة الإسقاط في خطة الاستعلام.\n- **$p(t)$**: مفتاح التجزئة الفئوي (مثل اسم القسم) الذي يقسم السجلات إلى مجموعات منفصلة.\n- **$\\text{Frame}(t)$**: الإطار المرئي للصف الحالي بناءً على شروط الترتيب والحدود.\n- **$\\mathcal{W}_f(t)$**: القيمة العددية المحسوبة والمضافة كخاصية جديدة للصف.\n- **ثابت الحفاظ على الصفوف**: عدد الصفوف الناتجة يساوي بالضبط عدد صفوف المدخلات دون أي تقليص.\n- **الفرق بين DENSE_RANK و RANK**: ينتج DENSE_RANK أرقاماً متتالية بلا فجوات عند التعادل ($1, 2, 2, 3$)، بينما يترك RANK فجوة ($1, 2, 2, 4$)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-sql-ctes-recursive-queries",
          "starterCode": "-- Formulate a DuckDB SQL query computing DENSE_RANK() and max salary gap\n-- across departmental partitions.\n-- Schema: employees(emp_id, dept_name, emp_name, salary)\n\nSELECT\n    -- Step 1: Base columns emp_id, dept_name, emp_name, salary\n    -- Step 2: Departmental salary rank:\n    --         DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS dept_salary_rank\n    -- Step 3: Difference between maximum departmental salary and current employee salary:\n    --         ROUND(MAX(salary) OVER (PARTITION BY dept_name) - salary, 2) AS salary_gap_to_max\nFROM employees\n-- Step 4: ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC\n;\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "SELECT emp_id, DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS rnk FROM employees",
              "expected": "VALID_JOIN_PLAN"
            },
            {
              "input": "SELECT emp_name, MAX(salary) OVER (PARTITION BY dept_name) AS max_sal FROM employees",
              "expected": "VALID_JOIN_PLAN"
            }
          ],
          "expectedOutput": "VALID_JOIN_PLAN",
          "variants": {
            "python": {
              "starterCode": "-- Formulate a DuckDB SQL query computing DENSE_RANK() and max salary gap\n-- across departmental partitions.\n-- Schema: employees(emp_id, dept_name, emp_name, salary)\n\nSELECT\n    -- Step 1: Base columns emp_id, dept_name, emp_name, salary\n    -- Step 2: Departmental salary rank:\n    --         DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS dept_salary_rank\n    -- Step 3: Difference between maximum departmental salary and current employee salary:\n    --         ROUND(MAX(salary) OVER (PARTITION BY dept_name) - salary, 2) AS salary_gap_to_max\nFROM employees\n-- Step 4: ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC\n;\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "VALID_JOIN_PLAN"
            }
          },
          "solution": "-- Formulate a DuckDB SQL query computing DENSE_RANK() and max salary gap\n-- across departmental partitions.\n-- Schema: employees(emp_id, dept_name, emp_name, salary)\n\nSELECT\n    -- Step 1: Base columns emp_id, dept_name, emp_name, salary\n    -- Step 2: Departmental salary rank:\n    --         DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS dept_salary_rank\n    -- Step 3: Difference between maximum departmental salary and current employee salary:\n    --         ROUND(MAX(salary) OVER (PARTITION BY dept_name) - salary, 2) AS salary_gap_to_max\nFROM employees\n-- Step 4: ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC\n;"
        },
        "hints": {
          "tier1": {
            "en": "Use `DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC)` to rank employees per department.",
            "ar": "استخدم `DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC)` لترتيب الموظفين داخل كل قسم."
          },
          "tier2": {
            "en": "Compute department max using `MAX(salary) OVER (PARTITION BY dept_name)` and subtract the current `salary`.",
            "ar": "احسب الحد الأقصى للقسم بـ `MAX(salary) OVER (PARTITION BY dept_name)` واطرح منه راتب الموظف الحالي `salary`."
          },
          "tier3": {
            "en": "Round the salary gap with `ROUND(..., 2)` to ensure consistent two-decimal currency formatting.",
            "ar": "قرب فارق الراتب بـ `ROUND(..., 2)` لضمان تنسيق العملات بمنزلتين عشريتين."
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
            "en": "A payroll auditing system across 20,000,000 employee records compares each worker's pay to their regional cohort median. The legacy query self-joins the table against a `GROUP BY region` subquery, taking 45 minutes and spilling 120 GB to disk. Why does rewriting this query with `OVER (PARTITION BY region)` finish in under 6 seconds? - **(A)** *(Correct)* Window functions sort and stream the dataset in a single linear pass over partition buffers in memory without materializing expensive $O(N^2)$ Cartesian self-joins or intermediate disk spool files. - **(B)** Window functions automatically bypass the database query optimizer and execute directly in C++ machine code. - **(C)** DuckDB stores window functions in a distributed Redis key-value cache cluster. - **(D)** Self-joins delete the table's primary keys, whereas window functions preserve them. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Self-joining against aggregated subqueries forces the engine to hash or sort the table twice and perform an expensive nested loop or hash join. A window function sorts once by partition key and streams aggregate accumulators in $O(N \\log N)$ time.",
            "ar": "نظام تدقيق رواتب يضم 20 مليون موظف يقارن راتب كل فرد بمتوسط منطقته. يستخدم الاستعلام القديم ربطاً ذاتياً مع استعلام فرعي `GROUP BY`، فيستغرق 45 دقيقة ويستهلك 120 جيجابايت على القرص المؤقت. لماذا ينتهي نفس الحساب في أقل من 6 ثوانٍ عند إعادة كتابته باستخدام `OVER (PARTITION BY region)`؟ - *Arabic:* تفرز الدوال النافذية البيانات وتمر عليها في مسار خطي واحد في الذاكرة عبر مخازن الأقسام دون الحاجة إلى الربط الذاتي المكلف أو كتابة جداول وسيطة ضخمة على القرص. - *Arabic:* تتجاوز الدوال النافذية محسن الاستعلامات وتنفذ مباشرة كشفرة آلة بلغة C++. - *Arabic:* تخزن DuckDB نتائج الدوال النافذية في عنقود ذاكرة تخزين مؤقت Redis خارجي. - *Arabic:* يقوم الربط الذاتي بحذف المفاتيح الأساسية للجدول، بينما تحافظ الدوال النافذية عليها. *التفسير الهندسي المعمق:* الربط الذاتي يجبر المحرك على فرز وتجزئة الجدول مرتين وإجراء عملية دمج مكلفة. بينما تفرز الدالة النافذية البيانات مرة واحدة وتحسب التجميعات عبر تدفق الذاكرة بزمن $O(N \\log N)$."
          },
          "options": [
            {
              "text": {
                "en": "Window functions sort and stream the dataset in a single linear pass over partition buffers in memory without materializing expensive $O(N^2)$ Cartesian self-joins or intermediate disk spool files.",
                "ar": "-  تفرز الدوال النافذية البيانات وتمر عليها في مسار خطي واحد في الذاكرة عبر مخازن الأقسام دون الحاجة إلى الربط الذاتي المكلف أو كتابة جداول وسيطة ضخمة على القرص."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Window functions automatically bypass the database query optimizer and execute directly in C++ machine code.",
                "ar": "-  تتجاوز الدوال النافذية محسن الاستعلامات وتنفذ مباشرة كشفرة آلة بلغة C++."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "DuckDB stores window functions in a distributed Redis key-value cache cluster.",
                "ar": "-  تخزن DuckDB نتائج الدوال النافذية في عنقود ذاكرة تخزين مؤقت Redis خارجي."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Self-joins delete the table's primary keys, whereas window functions preserve them.",
                "ar": "-  يقوم الربط الذاتي بحذف المفاتيح الأساسية للجدول، بينما تحافظ الدوال النافذية عليها."
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
    "id": "sql-indexing-query-plans",
    "title": "Positional Window Offsets, Ranking & Frame Bounds",
    "titleAr": "الإزاحات الموضعية، الترتيب، وحدود أطر النوافذ (ROWS vs RANGE)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "In time-series analysis and financial engineering, you constantly need to answer questions like: - \"What was yesterday's revenue compared...",
      "ar": "في تحليل السلاسل الزمنية والهندسة المالية، تتكرر أسئلة جوهرية مثل: - \"كم كان إيراد الأمس مقارنة باليوم لحساب نسبة النمو؟\" - \"ما هو المتوسط..."
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
          "en": "In time-series analysis and financial engineering, you constantly need to answer questions like:\n- *\"What was yesterday's revenue compared to today?\"*\n- *\"What is our 3-day trailing moving average?\"*\n\nIn traditional SQL without window offsets, calculating this required complex self-joins with offset date arithmetic. With Positional Window Functions, it becomes trivial!",
          "ar": "في تحليل السلاسل الزمنية والهندسة المالية، تتكرر أسئلة جوهرية مثل:\n- *\"كم كان إيراد الأمس مقارنة باليوم لحساب نسبة النمو؟\"*\n- *\"ما هو المتوسط المتحرك لإيرادات آخر 3 أيام؟\"*\n\nفي استعلامات SQL القديمة، كان حساب ذلك يتطلب ربطاً ذاتياً معقداً وحسابات تواريخ بطيئة. مع دوال الإزاحة الموضعية، تصبح العملية في غاية البساطة والأناقة!\n\n### تشبيه مرآة الرؤية الخلفية وقافلة السيارات المتحركة\nتخيل أنك تقود سيارة على طريق سريع يمثل الخط الزمني:\n- **`LAG(revenue, 1)` (مرآة الرؤية الخلفية)**: تنظر إلى الطريق خلفك مباشرة (إيراد الأمس). وإذا كنت في اليوم الأول ولا يوجد أمس، تظهر المرآة فراغاً (`NULL`).\n- **`LEAD(revenue, 1)` (الزجاج الأمامي)**: تنظر للأمام نحو النقطة التالية على الطريق (توقعات الغد).\n- **`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (قافلة الحراسة الثلاثية)**: تتحرك سيارتك ضمن موكب أمني من 3 سيارات: السيارتان السابقتان لك مباشرة وسيارتك الحالية. ومع تقدمك يوماً بعد يوم، ينزلق هذا الإطار معك، حاسباً متوسطاً متحركاً سلساً لآخر 3 أيام!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{LAG}(v, k)_i = \\begin{cases} v(r_{i-k}) & \\text{if } i - k \\ge 1 \\\\ \\bot_{\\text{NULL}} & \\text{if } i - k < 1 \\end{cases}, \\quad \\text{FrameSum}(i, W) = \\sum_{j=\\max(1, i - W + 1)}^i v(r_j)",
        "formulaNote": {
          "en": "Formal algebraic specification of LAG positional offset and physical ROWS sliding window boundary summation.",
          "ar": "التعريف الرياضي لإزاحة LAG الموضعية ومجموع حدود النافذة المنزلقة بـ ROWS."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe mathematical frame bounds clarify positional offset evaluation:\n\n- **$r_i$**: The $i$-th row tuple in the window partition ordered sequence ($1 \\le i \\le N$).\n- **$k$**: Positional offset integer (e.g., $k=1$ for immediate predecessor).\n- **$\\bot_{\\text{NULL}}$**: Sentinel null value emitted when the offset points beyond the start of the partition ($i - k < 1$).\n- **$W$**: Physical window frame width (for `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`, $W=3$).\n- **ROWS vs. RANGE Distinction**: `ROWS` counts literal row offsets in memory (physical boundary); `RANGE` evaluates numerical/chronological deltas along the sorting dimension (logical boundary).\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتحدد حدود الأطر الرياضية قواعد حساب الإزاحات:\n- **$r_i$**: الصف رقم $i$ داخل القسم المرتب زمنياً.\n- **$k$**: مقدار الإزاحة الموضعية بالصفوف (مثلاً 1 لليوم السابق).\n- **$\\bot_{\\text{NULL}}$**: قيمة فارغة تصدر عندما تشير الإزاحة إلى ما قبل بداية القسم ($i - k < 1$).\n- **$W$**: عرض إطار النافذة الفيزيائي (في حالة `2 PRECEDING` يكون $W=3$).\n- **الفرق الجوهري بين ROWS و RANGE**: تحسب `ROWS` عدد الصفوف الفيزيائية الفعلية، بينما تحسب `RANGE` المسافة الرقمية أو الزمنية الحقيقية (مثل نطاق 7 أيام تقويمية)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-sql-indexing-query-plans",
          "starterCode": "-- Formulate a DuckDB SQL query computing trailing rolling window sums\n-- and day-over-day growth percentages using ROWS BETWEEN and LAG().\n-- Schema: daily_metrics(metric_date, revenue)\n\nWITH metrics_lagged AS (\n    SELECT\n        metric_date,\n        revenue,\n        -- Step 1: 3-day trailing rolling sum:\n        --         ROUND(SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3day_revenue\n        -- Step 2: Previous day revenue:\n        --         LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue\n    FROM daily_metrics\n)\nSELECT\n    metric_date,\n    revenue,\n    rolling_3day_revenue,\n    prev_day_revenue,\n    -- Step 3: Compute DoD growth percentage:\n    --         CASE WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL\n    --              ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2) END AS dod_growth_pct\nFROM metrics_lagged\nORDER BY metric_date ASC;\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "SELECT metric_date, LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev FROM daily_metrics",
              "expected": "VALID_JOIN_PLAN"
            },
            {
              "input": "SELECT metric_date, SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS roll FROM daily_metrics",
              "expected": "VALID_JOIN_PLAN"
            }
          ],
          "expectedOutput": "VALID_JOIN_PLAN",
          "variants": {
            "python": {
              "starterCode": "-- Formulate a DuckDB SQL query computing trailing rolling window sums\n-- and day-over-day growth percentages using ROWS BETWEEN and LAG().\n-- Schema: daily_metrics(metric_date, revenue)\n\nWITH metrics_lagged AS (\n    SELECT\n        metric_date,\n        revenue,\n        -- Step 1: 3-day trailing rolling sum:\n        --         ROUND(SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3day_revenue\n        -- Step 2: Previous day revenue:\n        --         LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue\n    FROM daily_metrics\n)\nSELECT\n    metric_date,\n    revenue,\n    rolling_3day_revenue,\n    prev_day_revenue,\n    -- Step 3: Compute DoD growth percentage:\n    --         CASE WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL\n    --              ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2) END AS dod_growth_pct\nFROM metrics_lagged\nORDER BY metric_date ASC;\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "VALID_JOIN_PLAN"
            }
          },
          "solution": "-- Formulate a DuckDB SQL query computing trailing rolling window sums\n-- and day-over-day growth percentages using ROWS BETWEEN and LAG().\n-- Schema: daily_metrics(metric_date, revenue)\n\nWITH metrics_lagged AS (\n    SELECT\n        metric_date,\n        revenue,\n        -- Step 1: 3-day trailing rolling sum:\n        --         ROUND(SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3day_revenue\n        -- Step 2: Previous day revenue:\n        --         LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue\n    FROM daily_metrics\n)\nSELECT\n    metric_date,\n    revenue,\n    rolling_3day_revenue,\n    prev_day_revenue,\n    -- Step 3: Compute DoD growth percentage:\n    --         CASE WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL\n    --              ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2) END AS dod_growth_pct\nFROM metrics_lagged\nORDER BY metric_date ASC;"
        },
        "hints": {
          "tier1": {
            "en": "Use `LAG(revenue, 1) OVER (ORDER BY metric_date)` to fetch yesterday's revenue value.",
            "ar": "استخدم `LAG(revenue, 1) OVER (ORDER BY metric_date)` لجلب قيمة إيراد اليوم السابق."
          },
          "tier2": {
            "en": "Define the 3-day frame with `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`.",
            "ar": "حدد إطار الأيام الثلاثة بـ `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`."
          },
          "tier3": {
            "en": "Guard against division by zero in DoD growth using a `CASE WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL` expression.",
            "ar": "احمِ الاستعلام من القسمة على صفر في نسبة النمو باستخدام شرط `CASE WHEN`."
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
            "en": "An analytical engineer configures a 7-day rolling revenue window: `SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. Over holiday weekends when stores close on Saturday and Sunday, reported weekly averages jump erratically. Why did using `ROWS` instead of `RANGE` cause this reporting distortion? - **(A)** *(Correct)* `ROWS` counts a literal count of rows in memory (grabbing the last 6 operating store days, spanning 8-10 calendar days over weekends); whereas `RANGE` evaluates chronological calendar intervals (`RANGE BETWEEN INTERVAL 6 DAYS PRECEDING`), correctly respecting date gaps. - **(B)** `ROWS` converts currency values into Bitcoin cryptocurrency on holiday weekends. - **(C)** `RANGE` requires an Oracle Database license and is unsupported in open-source SQL engines. - **(D)** `ROWS` can only calculate COUNT, while `RANGE` is required for SUM. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Physical frame boundaries (`ROWS`) ignore gaps in date values and strictly look at table row indices. Value-based frame boundaries (`RANGE`) measure the true distance between values in the order column.",
            "ar": "أعد مهندس بيانات نافذة متوسط 7 أيام: `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`. في عطلات نهاية الأسبوع والأعياد عندما تغلق المتاجر، تذبذبت المتوسطات الأسبوعية بشكل خاطئ. لماذا تسبب استخدام `ROWS` بدلاً من `RANGE` في هذا التشويه الإحصائي؟ - *Arabic:* `ROWS` يعد صفوفاً فعلية في الذاكرة (فيأخذ آخر 6 أيام عمل فعلية، ممتداً عبر 8 إلى 10 أيام تقويمية بسبب العطلات)؛ بينما يقيم `RANGE` الفوارق الزمنية التقويمية الحقيقية مراعياً الفجوات. - *Arabic:* تقوم عبارة `ROWS` بتحويل قيم العملات إلى عملات مشفرة في عطلات نهاية الأسبوع. - *Arabic:* تتطلب عبارة `RANGE` ترخيصاً تجارياً من Oracle ولا تدعمها المحركات مفتوحة المصدر. - *Arabic:* تقتصر عبارة `ROWS` على حساب العدد COUNT فقط بينما تتطلب SUM استخدام RANGE. *التفسير الهندسي المعمق:* تتجاهل حدود `ROWS` الفيزيائية الفجوات الزمنية وتعد صفوف الجدول فقط. بينما تقيس حدود `RANGE` المسافة الفعلية لقيم التواريخ في التقويم الزمني."
          },
          "options": [
            {
              "text": {
                "en": "`ROWS` counts a literal count of rows in memory (grabbing the last 6 operating store days, spanning 8-10 calendar days over weekends); whereas `RANGE` evaluates chronological calendar intervals (`RANGE BETWEEN INTERVAL 6 DAYS PRECEDING`),ly respecting date gaps.",
                "ar": "-  ROWS يعد صفوفاً فعلية في الذاكرة (فيأخذ آخر 6 أيام عمل فعلية، ممتداً عبر 8 إلى 10 أيام تقويمية بسبب العطلات)؛ بينما يقيم RANGE الفوارق الزمنية التقويمية الحقيقية مراعياً الفجوات."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "`ROWS` converts currency values into Bitcoin cryptocurrency on holiday weekends.",
                "ar": "-  تقوم عبارة ROWS بتحويل قيم العملات إلى عملات مشفرة في عطلات نهاية الأسبوع."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "`RANGE` requires an Oracle Database license and is unsupported in open-source SQL engines.",
                "ar": "-  تتطلب عبارة RANGE ترخيصاً تجارياً من Oracle ولا تدعمها المحركات مفتوحة المصدر."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "`ROWS` can only calculate COUNT, while `RANGE` is required for SUM.",
                "ar": "-  تقتصر عبارة ROWS على حساب العدد COUNT فقط بينما تتطلب SUM استخدام RANGE."
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
    "id": "columnar-storage-parquet",
    "title": "Common Table Expressions & Recursive CTEs",
    "titleAr": "التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "How do you query hierarchical tree structures in a relational database when you don't know the depth in advance? Examples include: -...",
      "ar": "كيف تستعلم عن الهياكل الشجرية الهرمية في قواعد البيانات العلائقية عندما يكون عمق الشجرة مجهولاً مقدماً؟ من أمثلة ذلك: - الهيكل التنظيمي..."
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
          "en": "How do you query hierarchical tree structures in a relational database when you don't know the depth in advance?\nExamples include:\n- Organization chart reporting lines (*CEO $\\to$ VP $\\to$ Director $\\to$ Engineer*)\n- Supply chain bill of materials (*Airplane $\\to$ Wing $\\to$ Engine $\\to$ Turbine $\\to$ Bolt*)\n- Social network connection graphs (*Friends of friends of friends*)\n\nIn basic SQL, querying 5 levels of depth requires writing 5 ugly, hardcoded self-joins. If someone is 6 levels deep, the query fails!\nThe solution is **Recursive Common Table Expressions (Recursive CTEs)**.",
          "ar": "كيف تستعلم عن الهياكل الشجرية الهرمية في قواعد البيانات العلائقية عندما يكون عمق الشجرة مجهولاً مقدماً؟\nمن أمثلة ذلك:\n- الهيكل التنظيمي للشركات (*المدير التنفيذي $\\to$ نائب الرئيس $\\to$ المدير $\\to$ المهندس*)\n- شجرة مكونات التصنيع (*الطائرة $\\to$ الجناح $\\to$ المحرك $\\to$ التوربين $\\to$ المسمار*)\n- شبكات التواصل الاجتماعي (*أصدقاء الأصدقاء*)\n\nفي SQL التقليدية، يتطلب الاستعلام عن 5 مستويات كتابة 5 عمليات ربط ذاتي شاقة ومقيدة. وإذا وُجد موظف في المستوى السادس، يفشل الاستعلام!\nالحل الجذري هو **الاستعلامات الذاتية العودية (Recursive CTEs)**.\n\n### تشبيه الدمى الروسية (الماتريوشكا): بذرة الأساس وحلقة التمدد\nيعمل الاستعلام العودي عبر آلية النقطة الثابتة الرياضية:\n1. **عضو التثبيت الأساسي (Anchor Member)**: إيجاد قمة الهرم (مثل `WHERE manager_id IS NULL` - المدير التنفيذي). ينفذ هذا الجزء مرة واحدة فقط.\n2. **`UNION ALL` (جسر الاتصال)**: يربط البذرة بمحرك التكرار العودي.\n3. **العضو العودي (Recursive Member)**: ربط المرؤوسين بالطبقة السابقة؛ أي إيجاد كل من يتبع لمديري الخطوة السابقة، ثم تكرار ذلك درجة درجة!\n4. **التوقف التلقائي (Termination)**: عندما لا يُسفر المستوى التالي عن أي موظف جديد، تتوقف الحلقة تلقائياً وتُرجع الشجرة كاملة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "R_0 = \\text{AnchorQuery}(\\mathcal{D}), \\quad R_{i+1} = \\text{RecursiveQuery}(R_i \\bowtie \\mathcal{D}) \\implies R_{\\text{total}} = \\bigcup_{i=0}^K R_i \\quad \\text{where } R_{K+1} = \\emptyset",
        "formulaNote": {
          "en": "Least fixed-point iterative evaluation semantics of relational recursive common table expressions.",
          "ar": "دلالات النقطة الثابتة الدنيا لتنفيذ الاستعلامات العودية التكرارية في الجبر العلائقي."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal semantics characterize relational fixed-point evaluation:\n\n- **$R_0$**: Base anchor relation evaluated once over underlying database $\\mathcal{D}$.\n- **$R_i$**: Working table buffer produced at recursion iteration depth $i$.\n- **$\\text{RecursiveQuery}(R_i \\bowtie \\mathcal{D})$**: Evaluated iteratively by joining intermediate working set $R_i$ with base table $\\mathcal{D}$.\n- **$K$**: Maximum traversal depth where $R_{K+1} = \\emptyset$ (the mathematical fixed-point where no new tuples are produced).\n- **DAG Invariant**: Traversal graph must be a Directed Acyclic Graph (DAG); cyclic graphs create infinite loops unless protected by cycle detection guards.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتحدد الدلالات الرياضية آلية النقطة الثابتة:\n- **$R_0$**: علاقة الأساس الأولى وتنفذ مرة واحدة على قاعدة البيانات $\\mathcal{D}$.\n- **$R_i$**: جدول العمل الوسيط عند مستوى العمق $i$.\n- **$\\text{RecursiveQuery}$**: خطوة التكرار التي تدمج مخرجات المستوى السابق $R_i$ مع الجدول الأصلي $\\mathcal{D}$.\n- **$K$**: أقصى عمق للشجرة وتتحقق عنده النقطة الثابتة بانعدام أي سجلات جديدة ($R_{K+1} = \\emptyset$).\n- **شرط انعدام الحلقات (DAG)**: يجب أن تكون شجرة العلاقات خالية من الحلقات الدائرية المغلقة لمنع التكرار اللانهائي."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-columnar-storage-parquet",
          "starterCode": "-- Formulate a DuckDB Recursive CTE traversing an organization hierarchy.\n-- Schema: org_chart(emp_id, emp_name, manager_id)\n\nWITH RECURSIVE hierarchy AS (\n    -- Step 1: Anchor Member (Root nodes with manager_id IS NULL)\n    SELECT\n        emp_id,\n        emp_name,\n        0 AS depth,\n        CAST(emp_name AS VARCHAR) AS path\n    FROM org_chart\n    WHERE manager_id IS NULL\n\n    UNION ALL\n\n    -- Step 2: Recursive Member (Join subordinates to existing parents)\n    SELECT\n        child.emp_id,\n        child.emp_name,\n        parent.depth + 1 AS depth,\n        parent.path || ' -> ' || child.emp_name AS path\n    FROM org_chart child\n    JOIN hierarchy parent ON child.manager_id = parent.emp_id\n)\nSELECT\n    emp_id,\n    emp_name,\n    depth,\n    path\nFROM hierarchy\nORDER BY depth ASC, path ASC;\n    # TODO: Implement solution\n    pass",
          "testCases": [
            {
              "input": "WITH RECURSIVE h AS (SELECT emp_id, 0 as d FROM org_chart WHERE manager_id IS NULL UNION ALL SELECT c.emp_id, p.d+1 FROM org_chart c JOIN h p ON c.manager_id = p.emp_id) SELECT * FROM h",
              "expected": "VALID_JOIN_PLAN"
            },
            {
              "input": "SELECT emp_id, emp_name FROM org_chart WHERE manager_id IS NULL",
              "expected": "VALID_JOIN_PLAN"
            }
          ],
          "expectedOutput": "VALID_JOIN_PLAN",
          "variants": {
            "python": {
              "starterCode": "-- Formulate a DuckDB Recursive CTE traversing an organization hierarchy.\n-- Schema: org_chart(emp_id, emp_name, manager_id)\n\nWITH RECURSIVE hierarchy AS (\n    -- Step 1: Anchor Member (Root nodes with manager_id IS NULL)\n    SELECT\n        emp_id,\n        emp_name,\n        0 AS depth,\n        CAST(emp_name AS VARCHAR) AS path\n    FROM org_chart\n    WHERE manager_id IS NULL\n\n    UNION ALL\n\n    -- Step 2: Recursive Member (Join subordinates to existing parents)\n    SELECT\n        child.emp_id,\n        child.emp_name,\n        parent.depth + 1 AS depth,\n        parent.path || ' -> ' || child.emp_name AS path\n    FROM org_chart child\n    JOIN hierarchy parent ON child.manager_id = parent.emp_id\n)\nSELECT\n    emp_id,\n    emp_name,\n    depth,\n    path\nFROM hierarchy\nORDER BY depth ASC, path ASC;\n    # TODO: Implement solution\n    pass",
              "expectedOutput": "VALID_JOIN_PLAN"
            }
          },
          "solution": "-- Formulate a DuckDB Recursive CTE traversing an organization hierarchy.\n-- Schema: org_chart(emp_id, emp_name, manager_id)\n\nWITH RECURSIVE hierarchy AS (\n    -- Step 1: Anchor Member (Root nodes with manager_id IS NULL)\n    SELECT\n        emp_id,\n        emp_name,\n        0 AS depth,\n        CAST(emp_name AS VARCHAR) AS path\n    FROM org_chart\n    WHERE manager_id IS NULL\n\n    UNION ALL\n\n    -- Step 2: Recursive Member (Join subordinates to existing parents)\n    SELECT\n        child.emp_id,\n        child.emp_name,\n        parent.depth + 1 AS depth,\n        parent.path || ' -> ' || child.emp_name AS path\n    FROM org_chart child\n    JOIN hierarchy parent ON child.manager_id = parent.emp_id\n)\nSELECT\n    emp_id,\n    emp_name,\n    depth,\n    path\nFROM hierarchy\nORDER BY depth ASC, path ASC;"
        },
        "hints": {
          "tier1": {
            "en": "Start with the root anchor member where `manager_id IS NULL` and set `depth = 0`.",
            "ar": "ابدأ بعضو التثبيت الأساسي حيث `manager_id IS NULL` واجعل `depth = 0`."
          },
          "tier2": {
            "en": "In the recursive member, join `org_chart child` with `hierarchy parent` on `child.manager_id = parent.emp_id`.",
            "ar": "في العضو العودي، اربط `child.manager_id = parent.emp_id`."
          },
          "tier3": {
            "en": "Concatenate employee names into a breadcrumb path using `parent.path || ' -> ' || child.emp_name`.",
            "ar": "ادمج أسماء الموظفين في مسار تسلسلي عبر `parent.path || ' -> ' || child.emp_name`."
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
            "en": "In an industrial manufacturing Bill of Materials (BOM) database, a turbine assembly is composed of sub-assemblies. A junior engineer executes a Recursive CTE to calculate total manufacturing cost, but the database hangs permanently until crashing with an Out-Of-Memory error. What graph data hazard caused this infinite recursion? - **(A)** *(Correct)* Cyclic graph dependencies (e.g. part A contains part B which contains part A) violate the Directed Acyclic Graph (DAG) assumption, causing the termination condition $R_{K+1} = \\emptyset$ to never be reached; queries must enforce depth limits (`WHERE depth < 50`) or track visited nodes. - **(B)** Recursive CTEs can only process trees stored on solid-state drives (SSDs), not hard disks (HDDs). - **(C)** DuckDB requires all recursive queries to be written in Python instead of standard SQL. - **(D)** The `UNION ALL` clause should have been replaced with `INTERSECT` to prevent duplicates. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** Recursive CTEs continue executing as long as the recursive member returns at least one row. In cyclic topologies, rows re-trigger each other endlessly. Production systems safeguard queries with cycle tracking or depth ceilings.",
            "ar": "في قاعدة بيانات تصنيع صناعي لقطع الغيار، تتكون التوربينات من قطع فرعية. نفذ مهندس استعلام Recursive CTE لحساب التكلفة الإجمالية، فعلقت قاعدة البيانات تماماً حتى انهارت بنفاد الذاكرة. ما الخلل الهيكلي في بيانات الرسم البياني الذي سبب هذا الدوران اللانهائي؟ - *Arabic:* وجود علاقات دائرية مغلقة (مثل: القطعة A تحتوي B التي تحتوي بدورها على A) ينتهك شرط الرسم الموجه عديم الحلقات (DAG)، مما يمنع شرط التوقف $R_{K+1} = \\emptyset$ من التحقق؛ ويجب وضع سقف للعمق أو تتبع العقد المزارة. - *Arabic:* تعمل الاستعلامات العودية فقط على أقراص SSD السريعة وتفشل على الأقراص الصلبة التقليدية HDD. - *Arabic:* تشترط DuckDB كتابة الاستعلامات العودية بلغة بايثون بدلاً من SQL. - *Arabic:* كان يجب استبدال عبارة `UNION ALL` بعبارة `INTERSECT` لمنع تكرار السجلات. *التفسير الهندسي المعمق:* يستمر الاستعلام العودي في العمل طالما أن الخطوة السابقة أنتجت صَفاً واحداً على الأقل. الحلقات الدائرية تعيد إنتاج الصفوف إلى ما لا نهاية، مما يفرض استخدام ضوابط فحص الحلقات وأسقف العمق."
          },
          "options": [
            {
              "text": {
                "en": "Cyclic graph dependencies (e.g. part A contains part B which contains part A) violate the Directed Acyclic Graph (DAG) assumption, causing the termination condition $R_{K+1} = \\emptyset$ to never be reached; queries must enforce depth limits (`WHERE depth < 50`) or track visited nodes.",
                "ar": "-  وجود علاقات دائرية مغلقة (مثل: القطعة A تحتوي B التي تحتوي بدورها على A) ينتهك شرط الرسم الموجه عديم الحلقات (DAG)، مما يمنع شرط التوقف $R{K+1} = \\emptyset$ من التحقق؛ ويجب وضع سقف للعمق أو تتبع العقد المزارة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Recursive CTEs can only process trees stored on solid-state drives (SSDs), not hard disks (HDDs).",
                "ar": "-  تعمل الاستعلامات العودية فقط على أقراص SSD السريعة وتفشل على الأقراص الصلبة التقليدية HDD."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "DuckDB requires all recursive queries to be written in Python instead of standard SQL.",
                "ar": "-  تشترط DuckDB كتابة الاستعلامات العودية بلغة بايثون بدلاً من SQL."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The `UNION ALL` clause should have been replaced with `INTERSECT` to prevent duplicates.",
                "ar": "-  كان يجب استبدال عبارة UNION ALL بعبارة INTERSECT لمنع تكرار السجلات."
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
    "id": "arrow-ipc-zero-copy",
    "title": "Parquet Columnar Storage, Strided Encodings & Pushdown",
    "titleAr": "تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why did the entire Big Data and AI world migrate from CSV files to Apache Parquet? Because CSV is Row-Oriented, while Parquet is Columnar!",
      "ar": "لماذا هاجر مجتمع البيانات والذكاء الاصطناعي العالمي بالكامل من ملفات CSV إلى تنسيق Apache Parquet؟ لأن ملفات CSV تخزن البيانات أفقياً..."
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
          "en": "Why did the entire Big Data and AI world migrate from CSV files to Apache Parquet?\nBecause CSV is **Row-Oriented**, while Parquet is **Columnar**!",
          "ar": "لماذا هاجر مجتمع البيانات والذكاء الاصطناعي العالمي بالكامل من ملفات CSV إلى تنسيق Apache Parquet؟\nلأن ملفات CSV تخزن البيانات **أفقياً بالصفوف (Row-Oriented)**، بينما تخزنها Parquet **عمودياً بالأعمدة (Columnar)**!\n\n### تشبيه السجل المحاسبي الضخم: القراءة بالأعمدة\nتخيل سجلاً محاسبياً ورقياً ضخماً من 10,000 صفحة يحوي 100 مليون معاملة تجارية، وفي كل صفحة 50 معلومة: `اسم_العميل`، `عنوان_السكن`، `رقم_الهاتف`، ..., و`السعر`.\nطُلب منك حساب إجمالي الإيرادات:\n- **التخزين الصفي (CSV وقواعد البيانات التقليدية)**: لمعرفة السعر، يضطر الحاسوب لقراءة السطر الأول كاملاً: اسم العميل وعنوانه وهاتفه للوصول للسعر، ثم يكرر ذلك في كل صفحة! فيقرأ **100% من جميع الأعمدة الـ 50 من القرص**، مهدراً 98% من سرعة القراءة في تفاصيل لا علاقة لها بالاستعلام!\n- **التخزين العمودي (Apache Parquet)**: بدلاً من دمج الأعمدة، تُفصل جميع الأسعار الـ 100 مليون معاً في شريط ورقي مستقل! فيقرأ محرك البيانات **شريط الأسعار فقط** بأقصى سرعة للقرص SSD، متجاهلاً الـ 49 عموداً الأخرى دون أن يلمسها!\n\n### ترميز القواميس (Dictionary Encoding) وتخطي القراءة (Pushdown)\nعلاوة على ذلك، تُخزن النصوص المتكررة مثل `\"الرياض\"` مرة واحدة في قاموس مستقل، وتُستبدل في الجدول برقم فهرس صغير من بايت واحد. وبفضل حفظ إحصائيات الحد الأدنى والأقصى (Min/Max) لكل كتلة، يتخطى المحرك قراءة جيجابايتات كاملة من القرص إذا لم تطابق شرط الاستعلام!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{IO}_{\\text{row}} = N \\sum_{c=1}^C w_c \\quad \\gg \\quad \\text{IO}_{\\text{columnar}} = N \\sum_{c \\in \\mathcal{C}_{\\text{query}}} w_c \\cdot (1 - \\rho_c), \\quad \\rho_{\\text{dict}} = 1 - \\frac{|\\mathcal{V}| \\cdot \\bar{L} + N \\lceil \\log_2 |\\mathcal{V}| / 8 \\rceil}{N \\cdot \\bar{L}}",
        "formulaNote": {
          "en": "Storage I/O complexity comparison between row and columnar formats, and dictionary compression ratio.",
          "ar": "مقارنة حجم قراءة القرص I/O بين التخزين الصفي والعمودي، ونسبة ضغط ترميز القواميس."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal I/O bounds quantify the orders-of-magnitude reduction in disk bandwidth:\n\n- **$N$**: Total row count; $C$: Total column count in relation schema.\n- **$\\mathcal{C}_{\\text{query}} \\subseteq \\{1, \\dots, C\\}$**: The projection column subset requested by the query (typically $|mathcal{C}_{\\text{query}}| \\ll C$).\n- **$w_c$**: Average uncompressed byte width of column $c$.\n- **$\\rho_c$**: Compression ratio achieved by columnar encodings (Dictionary Encoding, Run-Length Encoding, Snappy/ZSTD).\n- **$|\\mathcal{V}|$**: Unique cardinality of categorical vocabulary. When $|\\mathcal{V}| \\le 256$, each string is represented by a single 1-byte (`uint8`) integer.\n- **Projection Pushdown**: Disk reading bandwidth scales with requested columns only, reducing I/O by $\\approx 90-98\\%$.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتبرهن المعادلات الرياضية الانخفاض الهائل في استهلاك قراءة الأقراص:\n- **$N$**: إجمالي عدد الصفوف؛ $C$: إجمالي عدد الأعمدة في المخطط.\n- **$\\mathcal{C}_{\\text{query}}$**: مجموعة الأعمدة المطلوبة فعلياً في استعلام الإسقاط (غالباً عمودان أو ثلاثة فقط).\n- **$w_c$**: عرض البايتات المتوسط للعمود قبل الضغط.\n- **$\\rho_c$**: نسبة الضغط الناتجة عن الترميز العمودي (ترميز القواميس، RLE، وخوارزميات ZSTD).\n- **$|\\mathcal{V}|$**: عدد الكلمات الفريدة؛ عندما تكون أقل من 256، يُمثل كل نص ببايت واحد `uint8`.\n- **تمرير الإسقاط (Projection Pushdown)**: تقتصر القراءة الفيزيائية من القرص على الأعمدة المطلوبة فقط مما يوفر 90% إلى 98% من سرعة النقل."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-arrow-ipc-zero-copy",
          "starterCode": "def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:\n    \"\"\"\n    Emulates Apache Arrow / Parquet dictionary encoding of categorical string columns\n    and calculates memory compression ratio.\n\n    Args:\n        column_data: List of strings.\n\n    Returns:\n        A tuple of (vocabulary_list, indices_list, compression_ratio).\n    \"\"\"\n    # Step 1: Return ([], [], 1.0) if column_data is empty\n    # Step 2: Build vocabulary map {string: index} and populate indices list in a single pass\n    # Step 3: Compute raw uncompressed bytes: sum(len(s.encode('utf-8')) + 8 for s in column_data)\n    # Step 4: Determine index byte width:\n    #         - 1 byte if len(vocab) <= 256\n    #         - 2 bytes if len(vocab) <= 65536\n    #         - 4 bytes otherwise\n    # Step 5: Compute compressed bytes: sum(len(v.encode('utf-8')) for v in vocab) + len(column_data) * index_width\n    # Step 6: Return (vocabulary, indices, round(raw_bytes / compressed_bytes, 2))\n    raise NotImplementedError(\"Implement compress_column_dictionary\")",
          "testCases": [
            {
              "input": "compress_column_dictionary(['apple', 'banana', 'apple'])[0]",
              "expected": "['apple', 'banana']"
            },
            {
              "input": "compress_column_dictionary(['apple', 'banana', 'apple'])[1]",
              "expected": "[0, 1, 0]"
            }
          ],
          "expectedOutput": "['apple', 'banana']",
          "variants": {
            "python": {
              "starterCode": "def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:\n    \"\"\"\n    Emulates Apache Arrow / Parquet dictionary encoding of categorical string columns\n    and calculates memory compression ratio.\n\n    Args:\n        column_data: List of strings.\n\n    Returns:\n        A tuple of (vocabulary_list, indices_list, compression_ratio).\n    \"\"\"\n    # Step 1: Return ([], [], 1.0) if column_data is empty\n    # Step 2: Build vocabulary map {string: index} and populate indices list in a single pass\n    # Step 3: Compute raw uncompressed bytes: sum(len(s.encode('utf-8')) + 8 for s in column_data)\n    # Step 4: Determine index byte width:\n    #         - 1 byte if len(vocab) <= 256\n    #         - 2 bytes if len(vocab) <= 65536\n    #         - 4 bytes otherwise\n    # Step 5: Compute compressed bytes: sum(len(v.encode('utf-8')) for v in vocab) + len(column_data) * index_width\n    # Step 6: Return (vocabulary, indices, round(raw_bytes / compressed_bytes, 2))\n    raise NotImplementedError(\"Implement compress_column_dictionary\")",
              "expectedOutput": "['apple', 'banana']"
            }
          },
          "solution": "def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:\n    if not column_data:\n        return ([], [], 1.0)\n\n    vocab_map: dict[str, int] = {}\n    vocabulary: list[str] = []\n    indices: list[int] = []\n\n    for s in column_data:\n        if s not in vocab_map:\n            idx = len(vocabulary)\n            vocab_map[s] = idx\n            vocabulary.append(s)\n        indices.append(vocab_map[s])\n\n    # Calculate raw uncompressed bytes (string length + 8 bytes pointer)\n    b_raw = sum(len(s.encode(\"utf-8\")) + 8 for s in column_data)\n\n    # Determine optimal integer index byte width based on unique count U\n    u = len(vocabulary)\n    if u <= 256:\n        index_width = 1  # uint8\n    elif u <= 65536:\n        index_width = 2  # uint16\n    else:\n        index_width = 4  # uint32\n\n    # Calculate dictionary encoded bytes (vocab bytes + index array bytes)\n    vocab_bytes = sum(len(v.encode(\"utf-8\")) for v in vocabulary)\n    index_bytes = len(column_data) * index_width\n    b_dict = vocab_bytes + index_bytes\n\n    compression_ratio = round(b_raw / b_dict, 2) if b_dict > 0 else 1.0\n\n    return (vocabulary, indices, compression_ratio)"
        },
        "hints": {
          "tier1": {
            "en": "Maintain a `vocab_map: dict[str, int]` to assign sequential IDs to newly observed unique strings.",
            "ar": "استخدم قاموساً لتعيين معرفات رقمية متتالية لكل كلمة نصية فريدة جديدة."
          },
          "tier2": {
            "en": "Determine index byte width based on vocabulary size: 1 byte for $\\le 256$, 2 for $\\le 65536$, else 4.",
            "ar": "حدد حجم البايت للمؤشر حسب حجم القاموس: 1 بايت إذا كان $\\le 256$، و 2 إذا كان $\\le 65536$."
          },
          "tier3": {
            "en": "Calculate compression ratio as `round(b_raw / b_dict, 2)`.",
            "ar": "احسب نسبة الضغط وقربها لمنزلتين: `round(b_raw / b_dict, 2)`."
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
            "en": "An analytics lakehouse stores 50 Terabytes of telemetry logs in CSV format across 100 columns. A nightly aggregation query scans `error_code` to count 500 errors: `SELECT error_code, COUNT(*) FROM logs WHERE error_code = 'E500'`. The query takes 55 minutes and costs $250 per run in cloud I/O charges. When converted to Parquet, execution time drops to 12 seconds and cost drops to $0.40. Which architectural mechanisms explain this 250x efficiency leap? - **(A)** *(Correct)* Projection Pushdown (reading only the single `error_code` column while ignoring the other 99 columns on disk) combined with Predicate Pushdown and Row Group statistics (skipping entire data chunks whose min/max metadata does not contain 'E500'). - **(B)** Parquet automatically executes the calculation on quantum computing hardware in cloud datacenters. - **(C)** CSV files require manual approval from system administrators before each disk read operation. - **(D)** Parquet permanently truncates logs older than 7 days to keep file sizes artificially small. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** In CSV, the engine must stream all 100 columns over the network and parse text row-by-row. In Parquet, the query engine reads only the target column byte stream and uses Row Group min/max footer metadata to bypass reading non-matching blocks completely.",
            "ar": "مستودع بيانات سحابي يخزن 50 تيرابايت من سجلات النظام بتنسيق CSV عبر 100 عمود. يقوم استعلام يومي بحساب تكرار الخطأ 'E500'، فيستغرق 55 دقيقة ويكلف 250 دولاراً لقراءة البيانات. عند تحويل الملفات إلى Parquet، انخفض زمن التنفيذ إلى 12 ثانية والتكلفة إلى 40 سنتاً فقط! ما الآليتان المعماريتان المسؤولتان عن هذا القفز الكفاءي بمقدار 250 ضعفاً؟ - *Arabic:* تمرير الإسقاط (قراءة عمود `error_code` فقط وتخطي 99 عموداً على القرص) مع تمرير الشروط وإحصائيات كتل الصفوف (تخطي قراءة الكتل التي تثبت بياناتها الوصفية خلوها من 'E500'). - *Arabic:* يقوم تنسيق Parquet بتنفيذ الحسابات تلقائياً على معالجات الحوسبة الكمومية في مراكز البيانات. - *Arabic:* تتطلب ملفات CSV موافقة يدوية من مديري النظام قبل كل عملية قراءة من القرص. - *Arabic:* تقوم Parquet بحذف السجلات الأقدم من 7 أيام نهائياً لإبقاء حجم الملفات صغيراً بشكل مصطنع. *التفسير الهندسي المعمق:* في ملفات CSV، يضطر المحرك لقراءة وتفسير جميع الأعمدة الـ 100 سطراً بسطر. بينما في Parquet يقرأ المحرك عمود الهدف فقط ويستخدم بيانات الحد الأدنى والأقصى لتخطي قراءة الكتل غير المطابقة نهائياً."
          },
          "options": [
            {
              "text": {
                "en": "Projection Pushdown (reading only the single `error_code` column while ignoring the other 99 columns on disk) combined with Predicate Pushdown and Row Group statistics (skipping entire data chunks whose min/max metadata does not contain 'E500').",
                "ar": "-  تمرير الإسقاط (قراءة عمود errorcode فقط وتخطي 99 عموداً على القرص) مع تمرير الشروط وإحصائيات كتل الصفوف (تخطي قراءة الكتل التي تثبت بياناتها الوصفية خلوها من 'E500')."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Parquet automatically executes the calculation on quantum computing hardware in cloud datacenters.",
                "ar": "-  يقوم تنسيق Parquet بتنفيذ الحسابات تلقائياً على معالجات الحوسبة الكمومية في مراكز البيانات."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "CSV files require manual approval from system administrators before each disk read operation.",
                "ar": "-  تتطلب ملفات CSV موافقة يدوية من مديري النظام قبل كل عملية قراءة من القرص."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Parquet permanently truncates logs older than 7 days to keep file sizes artificially small.",
                "ar": "-  تقوم Parquet بحذف السجلات الأقدم من 7 أيام نهائياً لإبقاء حجم الملفات صغيراً بشكل مصطنع."
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
    "id": "polars-lazy-dataframe-dag",
    "title": "Apache Arrow Zero-Copy & Polars Lazy DAG Optimization",
    "titleAr": "ذاكرة Apache Arrow دون نسخ، وتحسين مخططات Polars الكسولة (Lazy DAGs)",
    "trackId": "programming",
    "estimatedMinutes": 15,
    "description": {
      "en": "Why is Polars replacing Pandas as the modern data manipulation powerhouse? Because Pandas uses Eager Execution, while Polars defaults to...",
      "ar": "لماذا أصبحت مكتبة Polars البديل العصري الأسرع لمكتبة Pandas في هندسة البيانات؟ لأن Pandas تعتمد على التنفيذ الفوري المباشر (Eager..."
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
          "en": "Why is Polars replacing Pandas as the modern data manipulation powerhouse?\nBecause Pandas uses **Eager Execution**, while Polars defaults to **Lazy Query Optimization via Directed Acyclic Graphs (DAGs)**.\n\nPolars compiles your Python code into a logical DAG, optimizes the query graph using database theory, and streams batches via Apache Arrow's columnar memory layout with zero memory copying!",
          "ar": "لماذا أصبحت مكتبة Polars البديل العصري الأسرع لمكتبة Pandas في هندسة البيانات؟\nلأن Pandas تعتمد على **التنفيذ الفوري المباشر (Eager Execution)**، بينما تعتمد Polars على **التحسين الكسول لمخططات الاستعلام (Lazy Query Optimization via DAG)**.\n\n### تشبيه طلب المطعم: التنفيذ الفوري مقابل المخطط الكسول\n- **التنفيذ الفوري (Pandas Eager)**: تجلس في مطعم وتطلب طبق مقبلات، فيقوم الطاهي بطهيه ويحضره لك لتأكله، ثم تطلب سلطة فيحضرها، ثم تطلب شريحة لحم فيطهيها ويحضرها، ثم تقول له: *\"في الحقيقة، أنا أريد أطباقاً نباتية فقط!\"* فتلقي باللحم في سلة المهملات!\nكل سطر كود في Pandas ينشئ فوراً إطار بيانات وسيطاً ضخماً في الذاكرة العشوائية RAM، حتى لو كان السطر التالي سيحذف نصف الأعمدة والصفوف!\n- **التنفيذ الكسول (Polars Lazy DAG)**: تعطي النادل طلبك بالكامل منذ البداية في تذكرة واحدة: *\"أريد مقبلات وسلطة ولحماً، ولكن شرط أن تكون نباتية وبكميات صغيرة فقط\"*.\nينظر رئيس الطهاة إلى التذكرة كاملة **قبل أن يلمس أي مكون**. فيشطب اللحم فوراً (Predicate Pushdown)، ويجهز كميات صغيرة فقط (Projection Pushdown)، ويطهي العناصر المشتركة بالتوازي!\n\nتبني Polars مخططاً توجيهياً عديم الحلقات (DAG)، وتحسنه بقواعد علم قواعد البيانات، ثم تنفذه عبر مخازن Apache Arrow العمودية دون أي نسخ زائد في الذاكرة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{Q}_{\\text{eager}} = \\pi_\\alpha \\left( \\sigma_\\varphi \\big( \\text{Scan}(\\mathcal{P}) \\big) \\right) \\quad \\gg \\quad \\mathcal{Q}_{\\text{lazy}} = \\text{Scan}_{\\text{pushdown}(\\alpha, \\varphi)}(\\mathcal{P}) \\implies \\text{Cost}(\\mathcal{Q}_{\\text{lazy}}) \\ll \\text{Cost}(\\mathcal{Q}_{\\text{eager}})",
        "formulaNote": {
          "en": "Relational query algebraic rewrite: pushing projection and selection predicates directly into the physical scan operator.",
          "ar": "إعادة الكتابة الجبرية للاستعلام: تمرير الإسقاط والشروط مباشرة إلى مشغل المسح الفيزيائي للتخزين."
        },
        "narrative": {
          "en": "### Mathematical Invariants & Symbol Breakdown\n\nThe formal algebraic optimization rules govern the compiler rewrite engine:\n\n- **$\\mathcal{P}$**: Physical data lake partition files (Parquet / Arrow IPC streams).\n- **$\\text{Scan}(\\mathcal{P})$**: Physical scan operator reading row chunks into memory buffers.\n- **$\\text{Predicate Pushdown}$**: $\\pi_\\alpha(\\sigma_\\varphi(\\text{Scan}(\\mathcal{P}))) \\equiv \\pi_\\alpha(\\text{Scan}_{\\sigma_\\varphi}(\\mathcal{P}))$, evaluating filter predicates $\\varphi$ inside Parquet reader threads prior to materializing Arrow record batches.\n- **$\\text{Projection Pushdown}$**: Restricts scan to $\\alpha \\cup \\text{cols}(\\varphi)$, preventing unreferenced columns from ever touching memory bandwidth.\n- **Query Plan DAG**: Directed Acyclic Graph nodes represent relational operations; optimization passes collapse redundant nodes into fused SIMD kernels.\n\n## Beat 3: Interactive Code Challenge",
          "ar": "### الشرح الرياضي وتفصيل الرموز\n\nتحدد قواعد التحسين الجبرية عمل محرك ترجمة الاستعلامات:\n- **$\\mathcal{P}$**: ملفات التخزين الفيزيائي في بحيرة البيانات (ملفات Parquet أو جداول Arrow).\n- **$\\text{Scan}$**: مشغل القراءة الفيزيائي الذي يجلب البيانات للذاكرة.\n- **تمرير الشروط (Predicate Pushdown)**: نقل شرط التصفية $\\sigma_\\varphi$ إلى داخل مشغل قراءة Parquet لتفادي تحميل الصفوف التي ستُحذف لاحقاً.\n- **تمرير الإسقاط (Projection Pushdown)**: حصر القراءة في الأعمدة المطلوبة فقط، مانعاً بقية الأعمدة من استهلاك نطاق الذاكرة.\n- **مخطط DAG**: رسم بياني توجيهي يمثل خطوات الاستعلام؛ وتدمج مراحل التحسين العمليات المتتالية في نوى SIMD مدمجة فائقة السرعة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-polars-lazy-dataframe-dag",
          "starterCode": "from typing import Any\n\ndef optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:\n    \"\"\"\n    Applies Predicate Pushdown and Projection Pushdown rewrite rules\n    to optimize a relational query execution DAG.\n\n    Args:\n        plan: Ordered list of query plan node dicts starting with SCAN.\n              Example node types:\n              - {'op': 'SCAN', 'columns': ['a', 'b', 'c', 'd']}\n              - {'op': 'FILTER', 'columns_used': ['a']}\n              - {'op': 'PROJECT', 'columns': ['a', 'b']}\n\n    Returns:\n        Optimized query plan node list where:\n        1. Projection Pushdown restricts SCAN 'columns' to minimal set needed\n        2. Predicate Pushdown positions all FILTER nodes directly after SCAN\n    \"\"\"\n    # Step 1: Validate plan has at least a SCAN node at index 0\n    # Step 2: Separate nodes into scan_node, filters, others, and project_node\n    # Step 3: Compute needed_columns = set(project_node['columns']) + all filter 'columns_used'\n    # Step 4: Update scan_node['columns'] = sorted(needed_columns)\n    # Step 5: Reconstruct optimized_plan: [scan_node] + filters + others + [project_node]\n    raise NotImplementedError(\"Implement optimize_query_dag\")",
          "testCases": [
            {
              "input": "optimize_query_dag([{'op': 'SCAN', 'columns': ['a', 'b', 'c']}, {'op': 'FILTER', 'columns_used': ['a']}, {'op': 'PROJECT', 'columns': ['a']}])[0]['columns']",
              "expected": "['a']"
            },
            {
              "input": "optimize_query_dag([{'op': 'SCAN', 'columns': ['x', 'y']}, {'op': 'FILTER', 'columns_used': ['x']}, {'op': 'PROJECT', 'columns': ['x']}])[1]['op']",
              "expected": "'FILTER'"
            }
          ],
          "expectedOutput": "['a']",
          "variants": {
            "python": {
              "starterCode": "from typing import Any\n\ndef optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:\n    \"\"\"\n    Applies Predicate Pushdown and Projection Pushdown rewrite rules\n    to optimize a relational query execution DAG.\n\n    Args:\n        plan: Ordered list of query plan node dicts starting with SCAN.\n              Example node types:\n              - {'op': 'SCAN', 'columns': ['a', 'b', 'c', 'd']}\n              - {'op': 'FILTER', 'columns_used': ['a']}\n              - {'op': 'PROJECT', 'columns': ['a', 'b']}\n\n    Returns:\n        Optimized query plan node list where:\n        1. Projection Pushdown restricts SCAN 'columns' to minimal set needed\n        2. Predicate Pushdown positions all FILTER nodes directly after SCAN\n    \"\"\"\n    # Step 1: Validate plan has at least a SCAN node at index 0\n    # Step 2: Separate nodes into scan_node, filters, others, and project_node\n    # Step 3: Compute needed_columns = set(project_node['columns']) + all filter 'columns_used'\n    # Step 4: Update scan_node['columns'] = sorted(needed_columns)\n    # Step 5: Reconstruct optimized_plan: [scan_node] + filters + others + [project_node]\n    raise NotImplementedError(\"Implement optimize_query_dag\")",
              "expectedOutput": "['a']"
            }
          },
          "solution": "from typing import Any\n\ndef optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:\n    if not plan or plan[0].get(\"op\") != \"SCAN\":\n        return plan\n\n    scan_node = dict(plan[0])\n    filters: list[dict[str, Any]] = []\n    others: list[dict[str, Any]] = []\n    project_node: dict[str, Any] | None = None\n\n    for node in plan[1:]:\n        op = node.get(\"op\")\n        if op == \"FILTER\":\n            filters.append(dict(node))\n        elif op == \"PROJECT\":\n            project_node = dict(node)\n        else:\n            others.append(dict(node))\n\n    # Projection Pushdown: Determine minimal set of columns required from storage\n    needed_columns: set[str] = set()\n    if project_node is not None:\n        needed_columns.update(project_node.get(\"columns\", []))\n        for f in filters:\n            needed_columns.update(f.get(\"columns_used\", []))\n        for o in others:\n            if \"by\" in o:\n                needed_columns.add(o[\"by\"])\n        scan_node[\"columns\"] = sorted(needed_columns)\n\n    # Predicate Pushdown: Place all FILTER nodes directly after SCAN\n    optimized_plan: list[dict[str, Any]] = [scan_node]\n    optimized_plan.extend(filters)\n    optimized_plan.extend(others)\n    if project_node is not None:\n        optimized_plan.append(project_node)\n\n    return optimized_plan"
        },
        "hints": {
          "tier1": {
            "en": "Extract `needed_columns` by inspecting both `project_node['columns']` and `filter['columns_used']`.",
            "ar": "حدد الأعمدة المطلوبة بفحص أعمدة الإسقاط وأعمدة شروط التصفية معاً."
          },
          "tier2": {
            "en": "Set `scan_node['columns'] = sorted(needed_columns)` to implement projection pushdown.",
            "ar": "حدث `scan_node['columns'] = sorted(needed_columns)` لتنفيذ تمرير الإسقاط."
          },
          "tier3": {
            "en": "Reassemble the plan list by placing all `FILTER` nodes immediately after `SCAN` to enforce predicate pushdown.",
            "ar": "أعد بناء الخطة بوضع جميع عقد `FILTER` مباشرة بعد `SCAN` لتنفيذ تمرير الشروط."
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
            "en": "A data pipeline running on an 8 GB RAM virtual machine needs to process a 40 GB Parquet dataset. With Pandas: `df = pd.read_parquet('data.parquet'); df = df[df['status'] == 'ACTIVE'][['id', 'total']]`, the process is terminated by the Linux OOM Killer. Rewritten in Polars: `pl.scan_parquet('data.parquet').filter(pl.col('status') == 'ACTIVE').select(['id', 'total']).collect()`, the query finishes in 3.1s using 280 MB RAM. Why? - **(A)** *(Correct)* Pandas eagerly materializes the full 40 GB dataset in memory before executing the filter; Polars compiles a Lazy DAG that pushes Projection Pushdown (reading only 3 columns) and Predicate Pushdown into streaming Arrow chunk buffers, processing data out-of-core without exceeding RAM limits. - **(B)** Polars downsamples the dataset by deleting 90% of rows at random to fit within available RAM. - **(C)** Polars converts numbers from 64-bit precision to 4-bit binary strings. - **(D)** Linux OOM Killer only inspects Python processes named 'pandas', ignoring processes named 'polars'. **Correct Answer:** Option (A) **Deep Engineering Post-Mortem & Explanation:** `pl.scan_parquet` does not load data into memory; it creates a lazy query plan. During `.collect()`, the Polars optimizer prunes unused columns, pushes row filters down to Parquet row groups, and streams data in vectorized Apache Arrow batches.",
            "ar": "خط معالجة بيانات يعمل على خادم بذاكرة 8 جيجابايت يحتاج لمعالجة ملف Parquet بحجم 40 جيجابايت. باستخدام Pandas، انهار النظام بسبب نفاد الذاكرة OOM. وعند إعادة كتابته باستخدام Polars Lazy DAG، انتهى الاستعلام في 3.1 ثانية مستهلكاً 280 ميجابايت فقط من الذاكرة! ما السر وراء هذا النجاح الباهر؟ - *Arabic:* تقوم Pandas بتحميل كامل الـ 40 جيجابايت في الذاكرة فوراً قبل التصفية؛ بينما تبني Polars مخططاً كسولاً يمرر اختيار الأعمدة الثلاثة وتصفية الصفوف مباشرة إلى مشغل القراءة، فتعالج البيانات كدفعات صغيرة متدفقة دون تجاوز سعة الذاكرة. - *Arabic:* تقوم Polars بحذف 90% من الصفوف عشوائياً لتلائم سعة الذاكرة المتاحة. - *Arabic:* تقوم مكتبة Polars بتحويل الأرقام إلى نصوص ثنائية بدقة 4 بت لتوفير المساحة. - *Arabic:* يقوم نظام لينكس بمراقبة العمليات المسماة 'pandas' فقط ويتجاهل عمليات 'polars'. *التفسير الهندسي المعمق:* التابع `pl.scan_parquet` لا يحمل البيانات في الذاكرة بل ينشئ مخططاً كسولاً. وعند استدعاء `.collect()`، يُسقط المحسن الأعمدة غير المطلوبة، ويمرر الشروط لأقراص التخزين، ويتدفق بالبيانات كدفعات صغيرة متتالية."
          },
          "options": [
            {
              "text": {
                "en": "Pandas eagerly materializes the full 40 GB dataset in memory before executing the filter; Polars compiles a Lazy DAG that pushes Projection Pushdown (reading only 3 columns) and Predicate Pushdown into streaming Arrow chunk buffers, processing data out-of-core without exceeding RAM limits.",
                "ar": "-  تقوم Pandas بتحميل كامل الـ 40 جيجابايت في الذاكرة فوراً قبل التصفية؛ بينما تبني Polars مخططاً كسولاً يمرر اختيار الأعمدة الثلاثة وتصفية الصفوف مباشرة إلى مشغل القراءة، فتعالج البيانات كدفعات صغيرة متدفقة دون تجاوز سعة الذاكرة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Polars downsamples the dataset by deleting 90% of rows at random to fit within available RAM.",
                "ar": "-  تقوم Polars بحذف 90% من الصفوف عشوائياً لتلائم سعة الذاكرة المتاحة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Polars converts numbers from 64-bit precision to 4-bit binary strings.",
                "ar": "-  تقوم مكتبة Polars بتحويل الأرقام إلى نصوص ثنائية بدقة 4 بت لتوفير المساحة."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Linux OOM Killer only inspects Python processes named 'pandas', ignoring processes named 'polars'.",
                "ar": "-  يقوم نظام لينكس بمراقبة العمليات المسماة 'pandas' فقط ويتجاهل عمليات 'polars'."
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
