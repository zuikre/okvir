---
id: "t1-11"
version: "1.0.0"
title: "The Four Fundamental Subspaces"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["gaussian-elimination-systems"]
i18n:
  ar: "الفضاءات الجزئية الأربعة الأساسية"
---

# The Four Fundamental Subspaces

### Intuition & Physical Grounding

Imagine shining a bright flashlight at an intricate wire sculpture inside a dark room, casting its silhouette onto the flat wall behind it. The wire sculpture lives in the 3D world of your room (the input space $\mathbb{R}^3$), while the projected shadow lives on the flat 2D surface of the plaster wall (the output space $\mathbb{R}^2$). If you wiggle the wire sculpture along the wall's surface, the shadow moves and dances. But what if you push the wire sculpture directly along the line of the flashlight's beam, moving it directly toward or away from the light? On the wall, the shadow does not move sideways at all—that direction of movement is completely invisible to the wall. 

Every matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$ acts as an information bridge between an input world of $n$ dimensions and an output world of $m$ dimensions. Renowned MIT mathematician Gilbert Strang synthesized the entire architecture of linear algebra into a breathtaking conceptual framework known as **The Four Fundamental Subspaces** (The "Big Picture").

Strang showed that the input universe $\mathbb{R}^n$ is sliced cleanly into two mutually orthogonal, perpendicular zones:
1. **The Row Space ($C(\mathbf{A}^T)$):** The active input territory. Any movement here immediately triggers an active, noticeable change in the output.
2. **The Nullspace ($N(\mathbf{A})$):** The complete blind spot. Any vector residing in the nullspace gets completely crushed to absolute zero by the matrix: $\mathbf{A}\mathbf{x} = \mathbf{0}$. 

These two realms meet at a strict $90^\circ$ perpendicular right angle ($C(\mathbf{A}^T) \perp N(\mathbf{A})$) and together account for every single dimension of the input world ($\operatorname{dim} = r + (n - r) = n$).

On the other side of the bridge, the output universe $\mathbb{R}^m$ is likewise partitioned into two perpendicular territories:
1. **The Column Space ($C(\mathbf{A})$):** The realm of the possible. This subspace contains every single output vector that the matrix can physically reach or generate.
2. **The Left Nullspace ($N(\mathbf{A}^T)$):** The realm of the impossible. This perpendicular zone contains directions that the matrix can never reach, forming the orthogonal complement to the column space ($C(\mathbf{A}) \perp N(\mathbf{A}^T)$).

#### Why Do We Care?
1. **Least Squares Regression & Data Fitting:** In real-world data science, observation vector $\mathbf{b}$ rarely falls perfectly into the column space $C(\mathbf{A})$ because of measurement noise. The equation $\mathbf{A}\mathbf{x} = \mathbf{b}$ has no exact solution! Linear regression solves this by projecting $\mathbf{b}$ onto $C(\mathbf{A})$. The unavoidable residual error vector $\mathbf{e} = \mathbf{b} - \mathbf{A}\hat{\mathbf{x}}$ lands squarely and perpendicularly inside the Left Nullspace $N(\mathbf{A}^T)$.
2. **Deep Neural Network Pruning & Compression:** Modern Large Language Models have billions of parameters. Researchers analyze the nullspace of weight matrices to identify redundant neuron combinations that map to near-zero outputs. Pruning these null directions allows compressing models by $50\%$ to $80\%$ without degrading conversational intelligence.
3. **Control Theory & Aerospace Robotics:** Before launching a spacecraft or autonomous quadcopter, engineers compute the controllability subspace (the column space of the controllability matrix) to verify that thrusters can steer the vehicle in all 6 degrees of freedom rather than leaving blind spots in the nullspace.

---

#### Jargon Decoder

| Technical Term | Plain English Intuition | المصطلح بالعربية | المعنى البديهي المبسط |
| :--- | :--- | :--- | :--- |
| Column Space ($\mathcal{C}(A)$) | The gallery of all reachable output images the matrix can paint | فضاء الأعمدة | معرض كافة الصور والمخرجات الممكنة التي تستطيع المصفوفة إنتاجها |
| Null Space ($\mathcal{N}(A)$) | The blind spot: all input arrows that get crushed into pure zero | فضاء العدم (Null Space) | الزاوية العمياء: كافة أسهم المدخلات التي تُسحق وتتحول لصفر تام |
| Row Space ($\mathcal{C}(A^T)$) | The effective input arrows that directly govern what output gets produced | فضاء الصفوف | المدخلات الفعالة الحقيقية المسؤولة عن تشكيل المخرجات المتنوعة |
| Left Null Space ($\mathcal{N}(A^T)$) | The forbidden output zone: target positions that can never be reached | فضاء العدم الأيسر | منطقة المخرجات المستحيلة التي لا يمكن للمصفوفة بلوغها إطلاقاً |
| Rank-Nullity Theorem | Dimension conservation: Total Input Directions = Effective + Crushed | مبرهنة الرتبة والعدم | قانون حفظ الأبعاد: أبعاد المدخلات = الأبعاد الفعالة + الأبعاد المسحوقة |

#### Geometric & Visual Flow

```
          Input Space R^n                      Output Space R^m
     ┌───────────────────────┐            ┌───────────────────────┐
     │  Row Space C(A^T)     │            │  Column Space C(A)    │
     │  (Effective Inputs)   │ ──A*x───►  │  (All outputs A*x)   │
     ├───────────────────────┤            ├───────────────────────┤
     │  Null Space N(A)      │            │  Left Null Space      │
     │  (Crushed to ZERO)    │ ──A*x=0─►  │  (Unreachable zone)   │
     └───────────────────────┘            └───────────────────────┘
```

### الحدس الفيزيائي والهندسي

تخيل أنك تسلط مصباحاً يدوياً ساطعاً على مجسم سلكي معقد في غرفة مظلمة، لتسقط ظله على الجدار المسطح خلفه. المجسم السلكي يستقر في عالم ثلاثي الأبعاد $\mathbb{R}^3$ (فضاء المدخلات)، بينما يعيش الظل المسقط على سطح الجدار ثنائي الأبعاد $\mathbb{R}^2$ (فضاء المخرجات). إذا حركت المجسم السلكي يميناً أو يساراً بموازاة الجدار، فإن الظل يتحرك ويرقص على الحائط. ولكن ماذا لو حركت المجسم للأمام أو للخلف على امتداد شعاع الضوء مباشرة مقترباً من المصباح أو مبتعداً عنه؟ على الجدار، لن يتغير موضع الظل مطلقاً؛ فذلك الاتجاه الحركي خفي تماماً وأعمى بالنسبة للجدار!

تعمل كل مصفوفة $\mathbf{A} \in \mathbb{R}^{m \times n}$ كجسر معلوماتي يربط بين فضاء مدخلات ذي $n$ بعداً وفضاء مخرجات ذي $m$ بعداً. لخص عالم الرياضيات الشهير جيلبرت سترانج (Gilbert Strang) صرح الجبر الخطي بأكمله في لوحة بديعة تُعرف بـ **الفضاءات الجزئية الأربعة الأساسية** ("الصورة الكبرى").

أثبت سترانج أن فضاء المدخلات $\mathbb{R}^n$ ينقسم بحد السيف إلى منطقتين متعامدتين تماماً:
1. **فضاء الصفوف ($C(\mathbf{A}^T)$):** إقليم المدخلات الفعالة الحية؛ أي حركة بداخله تترجم فوراً إلى استجابة وتغير حقيقي في المخرجات.
2. **الفضاء الصفري ($N(\mathbf{A})$):** النقطة العمياء المطلقة؛ كل متجه يستقر في هذا الفضاء تسحقه المصفوفة بالكامل ليتحول إلى الصفر المطلق: $\mathbf{A}\mathbf{x} = \mathbf{0}$.

يلتقي هذان العالمان عند زاوية قائمة صارمة $90^\circ$ ($C(\mathbf{A}^T) \perp N(\mathbf{A})$)، ويتقاسمان معاً كافة أبعاد عالم المدخلات بالتساوي ودون أي هدر ($\text{الأبعاد} = r + (n - r) = n$).

وعلى الضفة الأخرى من الجسر، ينقسم فضاء المخرجات $\mathbb{R}^m$ بدوره إلى منطقتين متعامدتين:
1. **فضاء الأعمدة ($C(\mathbf{A})$):** أرض الممكنات؛ يضم كل نقطة ومتجه يمكن للمصفوفة توليدها والوصول إليها فعلياً.
2. **الفضاء الصفري الأيسر ($N(\mathbf{A}^T)$):** عالم المستحيل؛ يضم الاتجاهات العمودية التي تعجز المصفوفة عن بلوغها، وهو المتمم المتعامد لفضاء الأعمدة ($C(\mathbf{A}) \perp N(\mathbf{A}^T)$).

#### لماذا نهتم بهذا المفهوم؟
1. **الانحدار الخطي والمربعات الصغرى في علم البيانات:** في التطبيقات الواقعية، نادراً ما يقع متجه المشاهدات $\mathbf{b}$ داخل فضاء الأعمدة $C(\mathbf{A})$ بسبب الضجيج التجريبي؛ وبالتالي يستحيل حل $\mathbf{A}\mathbf{x} = \mathbf{b}$ بدقة! يحل علم البيانات هذه المشكلة بإسقاط $\mathbf{b}$ عمودياً على فضاء الأعمدة $C(\mathbf{A})$. وخطأ التنبؤ المتبقي $\mathbf{e} = \mathbf{b} - \mathbf{A}\hat{\mathbf{x}}$ يسقط حتماً وبشكل عمودي داخل الفضاء الصفري الأيسر $N(\mathbf{A}^T)$.
2. **ضغط النماذج العصبية الضخمة (Model Pruning):** تمتلك النماذج اللغوية الكبيرة مليارات الأوزان. يقوم الباحثون بتحليل الفضاء الصفري لمصفوفات الأوزان لرصد الخلايا العصبية الفائضة التي تنتج أصفاراً، ثم حذفها لتقليص حجم النموذج بنسبة تصل إلى $80\%$ دون المساس بذكائه.
3. **أنظمة التحكم وهندسة الطيران والفضاء:** قبل إطلاق مركبة فضائية أو طائرة مسيرة، يحلل المهندسون فضاء الأعمدة لمصفوفة التحكم للتحقق من قدرة المحركات على توجيه المركبة في جميع الاتجاهات الستة، والتأكد من خلو فضاء الحركة من نقاط عمياء خطيرة في الفضاء الصفري.

#### قاموس المصطلحات البسيطة

| المصطلح التقني | المعنى البديهي بالإنجليزية | المصطلح العربي | المعنى البديهي المبسط |
| :--- | :--- | :--- | :--- |
| فضاء الأعمدة | The gallery of all reachable output images the matrix can paint | فضاء الأعمدة | معرض كافة الصور والمخرجات الممكنة التي تستطيع المصفوفة إنتاجها |
| فضاء العدم (Null Space) | The blind spot: all input arrows that get crushed into pure zero | فضاء العدم (Null Space) | الزاوية العمياء: كافة أسهم المدخلات التي تُسحق وتتحول لصفر تام |
| فضاء الصفوف | The effective input arrows that directly govern what output gets produced | فضاء الصفوف | المدخلات الفعالة الحقيقية المسؤولة عن تشكيل المخرجات المتنوعة |
| فضاء العدم الأيسر | The forbidden output zone: target positions that can never be reached | فضاء العدم الأيسر | منطقة المخرجات المستحيلة التي لا يمكن للمصفوفة بلوغها إطلاقاً |
| مبرهنة الرتبة والعدم | Dimension conservation: Total Input Directions = Effective + Crushed | مبرهنة الرتبة والعدم | قانون حفظ الأبعاد: أبعاد المدخلات = الأبعاد الفعالة + الأبعاد المسحوقة |

#### المخطط البصري الهندسي

```
          فضاء المدخلات R^n                    فضاء المخرجات R^m
     ┌───────────────────────┐            ┌───────────────────────┐
     │  فضاء الصفوف C(A^T)   │            │  فضاء الأعمدة C(A)    │
     │  (المدخلات الفعالة)   │ ──A*x───►  │  (كافة المخرجات A*x)  │
     ├───────────────────────┤            ├───────────────────────┤
     │  فضاء العدم N(A)      │            │  فضاء العدم الأيسر    │
     │  (المسحوق إلى الصفر)  │ ──A*x=0─►  │  (المنطقة المستحيلة)  │
     └───────────────────────┘            └───────────────────────┘
```

:::simulation-widget{engine="canvas2d" component="FundamentalSubspacesCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbb{R}^n = C(\mathbf{A}^T) \oplus N(\mathbf{A}), \quad \mathbb{R}^m = C(\mathbf{A}) \oplus N(\mathbf{A}^T), \quad \operatorname{rank}(\mathbf{A}) + \operatorname{nullity}(\mathbf{A}) = n
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $C(\mathbf{A}) \subset \mathbb{R}^m$ | Column Space (Range) | The subspace of all outputs reachable by taking linear combinations of $\mathbf{A}$'s columns. Dimension $= r$. |
| $N(\mathbf{A}) \subset \mathbb{R}^n$ | Nullspace (Kernel) | The subspace of all inputs crushed to absolute zero ($\mathbf{A}\mathbf{x} = \mathbf{0}$). Dimension $= n - r$. |
| $C(\mathbf{A}^T) \subset \mathbb{R}^n$ | Row Space | The active input directions spanned by the rows of $\mathbf{A}$. Orthogonal complement to $N(\mathbf{A})$. Dimension $= r$. |
| $N(\mathbf{A}^T) \subset \mathbb{R}^m$ | Left Nullspace | All output directions orthogonal to the column space ($\mathbf{A}^T\mathbf{y} = \mathbf{0}$). Dimension $= m - r$. |
| $\oplus$ | Direct Sum | Every vector decomposes uniquely into two perpendicular pieces: $\mathbf{x} = \mathbf{x}_{\text{row}} + \mathbf{x}_{\text{null}}$ where $\mathbf{x}_{\text{row}} \perp \mathbf{x}_{\text{null}}$. |
| $r + (n - r) = n$ | Rank-Nullity Theorem | Conservation of dimensions: every input dimension is either active ($r$) or crushed into the nullspace ($n - r$). |

##### Why the Math Works Step-by-Step
1. **Why is the Nullspace strictly perpendicular to the Row Space?**
   Suppose vector $\mathbf{x}$ lies in the Nullspace of $\mathbf{A}$. By definition:
   $$\mathbf{A}\mathbf{x} = \mathbf{0} \implies \begin{bmatrix} \text{row}_1 \\ \text{row}_2 \\ \vdots \\ \text{row}_m \end{bmatrix} \mathbf{x} = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$$
   Look at each coordinate of the resulting zero vector:
   $$\text{row}_1 \cdot \mathbf{x} = 0, \quad \text{row}_2 \cdot \mathbf{x} = 0, \quad \dots, \quad \text{row}_m \cdot \mathbf{x} = 0$$
   This proves that $\mathbf{x}$ has a dot product of zero with *every single row* of matrix $\mathbf{A}$! Since any vector $\mathbf{v}$ in the Row Space is a linear combination of these rows ($\mathbf{v} = \sum c_i \text{row}_i$), taking the dot product gives $\mathbf{v} \cdot \mathbf{x} = \sum c_i (\text{row}_i \cdot \mathbf{x}) = 0$. Therefore, every vector in the nullspace is strictly perpendicular to the entire row space: $C(\mathbf{A}^T) \perp N(\mathbf{A})$.
2. **Why does $\operatorname{rank}(\mathbf{A}) = \operatorname{rank}(\mathbf{A}^T)$ (Row Rank equals Column Rank)?**
   One of the deepest theorems in mathematics: although $\mathbf{A}$ can have wildly different numbers of rows and columns (e.g. $1000 \times 3$), the number of linearly independent rows always strictly equals the number of linearly independent columns!

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $C(\mathbf{A}) \subset \mathbb{R}^m$ | فضاء الأعمدة (المدى) | فضاء المخرجات التي يمكن للمصفوفة بلوغها بتركيب أعمدتها؛ بعده يساوي رتبة المصفوفة $r$. |
| $N(\mathbf{A}) \subset \mathbb{R}^n$ | الفضاء الصفري (النواة) | كافة متجهات المدخلات التي تسحقها المصفوفة إلى الصفر المطلق ($\mathbf{A}\mathbf{x} = \mathbf{0}$)؛ بعده $n - r$. |
| $C(\mathbf{A}^T) \subset \mathbb{R}^n$ | فضاء الصفوف | اتجاهات المدخلات الفعالة المتولدة من صفوف $\mathbf{A}$؛ وهو متمم متعامد للفضاء الصفري بعده $r$. |
| $N(\mathbf{A}^T) \subset \mathbb{R}^m$ | الفضاء الصفري الأيسر | اتجاهات المخرجات المستحيلة المتعامدة على فضاء الأعمدة ($\mathbf{A}^T\mathbf{y} = \mathbf{0}$)؛ بعده $m - r$. |
| $\oplus$ | المجموع المباشر | ينقسم أي متجه بشكل فريد إلى قطعتين متعامدتين: $\mathbf{x} = \mathbf{x}_{\text{row}} + \mathbf{x}_{\text{null}}$ حيث $\mathbf{x}_{\text{row}} \perp \mathbf{x}_{\text{null}}$. |
| $r + (n - r) = n$ | مبرهنة الرتبة والنواة | قانون حفظ الأبعاد: كل بُعد في عالم المدخلات إما أن يكون فعالاً ($r$) أو يُسحق في الفضاء الصفري ($n - r$). |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **لماذا يتعامد الفضاء الصفري تماماً مع فضاء الصفوف؟**
   افترض أن المتجه $\mathbf{x}$ يقع في الفضاء الصفري للمصفوفة $\mathbf{A}$. بحسب التعريف:
   $$\mathbf{A}\mathbf{x} = \mathbf{0} \implies \begin{bmatrix} \text{الصف}_1 \\ \text{الصف}_2 \\ \vdots \\ \text{الصف}_m \end{bmatrix} \mathbf{x} = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$$
   تأمل كل معادلة ناتجة بمفردها:
   $$\text{الصف}_1 \cdot \mathbf{x} = 0, \quad \text{الصف}_2 \cdot \mathbf{x} = 0, \quad \dots, \quad \text{الصف}_m \cdot \mathbf{x} = 0$$
   هذا يبرهن أن حاصل الضرب النقطي للمتجه $\mathbf{x}$ مع *كل صف* من صفوف المصفوفة يساوي صفراً! وبما أن أي متجه في فضاء الصفوف هو تركيب خطي لهذه الصفوف، فإن جداءه النقطي مع $\mathbf{x}$ سينعدم حتماً. وهذا يثبت التعامد التام $C(\mathbf{A}^T) \perp N(\mathbf{A})$.
2. **لماذا تتساوى رتبة الصفوف مع رتبة الأعمدة دائماً؟**
   إحدى أعظم مبرهنات الجبر: حتى لو كانت المصفوفة مستطيلة بأبعاد متباعدة (مثل $1000 \times 3$)، فإن أقصى عدد من الصفوف المستقلة خطياً يطابق دائماً وبدقة أقصى عدد من الأعمدة المستقلة خطياً!

:::python-challenge{id="py-t1-11"}
---
timeout_ms: 3000
test_cases:
  - input: "subspace_dimensions(5, 3, 2)"
    expected: "{'col_space': 2, 'nullspace': 1, 'row_space': 2, 'left_nullspace': 3}"
  - input: "subspace_dimensions(4, 4, 4)"
    expected: "{'col_space': 4, 'nullspace': 0, 'row_space': 4, 'left_nullspace': 0}"
  - input: "subspace_dimensions(3, 5, 2)"
    expected: "{'col_space': 2, 'nullspace': 3, 'row_space': 2, 'left_nullspace': 1}"
---
```python
import numpy as np

def subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:
    """
    Compute the dimensions of Gilbert Strang's Four Fundamental Subspaces
    for an m x n matrix with rank r.

    Intuition
    ---------
    - Column Space C(A) in R^m has dimension equal to rank r.
    - Row Space C(A^T) in R^n has dimension equal to rank r.
    - Nullspace N(A) in R^n has dimension n - r (Rank-Nullity Theorem).
    - Left Nullspace N(A^T) in R^m has dimension m - r.

    Parameters
    ----------
    m : int
        Number of rows (output space dimension).
    n : int
        Number of columns (input space dimension).
    rank : int
        Matrix rank r (r <= min(m, n)).

    Returns
    -------
    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'
        The geometric dimensions of each of the four fundamental subspaces.

    Raises
    ------
    ValueError
        If rank exceeds min(m, n) or is negative.
    """
    if rank < 0 or rank > min(m, n):
        raise ValueError(f"Rank {rank} must be between 0 and min({m}, {n})")

    # Step 1: Column space and row space dimensions both strictly equal rank r
    dim_col = rank
    dim_row = rank

    # Step 2: Nullspace dimension equals input dimension minus rank (n - r)
    dim_null = n - rank

    # Step 3: Left nullspace dimension equals output dimension minus rank (m - r)
    dim_left_null = m - rank

    # Step 4: Return dimensions formatted as dictionary
    return {
        'col_space': dim_col,
        'nullspace': dim_null,
        'row_space': dim_row,
        'left_nullspace': dim_left_null
    }
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** In a linear regression problem $\mathbf{A}\mathbf{x} = \mathbf{b}$, the target observation vector $\mathbf{b}$ cannot be reached exactly because it lies outside the Column Space $C(\mathbf{A})$. In which of the Four Fundamental Subspaces does the optimal least-squares residual error vector $\mathbf{e} = \mathbf{b} - \mathbf{A}\hat{\mathbf{x}}$ strictly reside?

**العربية:** في مسألة انحدار خطي $\mathbf{A}\mathbf{x} = \mathbf{b}$، لا يمكن حل المتجه المستهدف $\mathbf{b}$ بدقة لوقوعه خارج فضاء الأعمدة $C(\mathbf{A})$. في أي من الفضاءات الأساسية الأربعة يقع بالضرورة متجه الخطأ المتبقي الأمثل $\mathbf{e} = \mathbf{b} - \mathbf{A}\hat{\mathbf{x}}$؟

* [x] The Left Nullspace $N(\mathbf{A}^T)$, because the minimal least-squares error is strictly orthogonal to every vector in the Column Space $C(\mathbf{A})$.
  * الفضاء الصفري الأيسر $N(\mathbf{A}^T)$، لأن خطأ المربعات الصغرى الأصغري متعامد بالضرورة مع كل متجه في فضاء الأعمدة $C(\mathbf{A})$.
  > **Why this is correct:** The fundamental orthogonality requirement of least-squares projection dictates that $\mathbf{A}^T \mathbf{e} = \mathbf{0}$, which is the exact mathematical definition of the Left Nullspace $N(\mathbf{A}^T)$. The residual vector $\mathbf{e}$ is the perpendicular drop from $\mathbf{b}$ onto $C(\mathbf{A})$. Because $C(\mathbf{A}) \perp N(\mathbf{A}^T)$, $\mathbf{e}$ must live inside $N(\mathbf{A}^T)$.
  > **لماذا هذا الخيار صحيح:** شرط التعامد الأساسي لإسقاط المربعات الصغرى ينص على أن $\mathbf{A}^T \mathbf{e} = \mathbf{0}$، وهو التعريف الرياضي الدقيق للفضاء الصفري الأيسر $N(\mathbf{A}^T)$. متجه الخطأ $\mathbf{e}$ هو الإسقاط العمودي من $\mathbf{b}$ على فضاء الأعمدة $C(\mathbf{A})$، ولأن $C(\mathbf{A}) \perp N(\mathbf{A}^T)$، فإن $\mathbf{e}$ يستقر حتماً في $N(\mathbf{A}^T)$.

* [ ] The Nullspace $N(\mathbf{A})$, because the error vector must be squashed to zero by matrix $\mathbf{A}$.
  * الفضاء الصفري $N(\mathbf{A})$، لأن متجه الخطأ يجب أن تسحقه المصفوفة $\mathbf{A}$ إلى الصفر.
  > **Why this is incorrect:** Fatal dimension mismatch! Vector $\mathbf{e}$ lives in the output space $\mathbb{R}^m$, whereas the nullspace $N(\mathbf{A})$ lives in the input space $\mathbb{R}^n$.
  > **لماذا هذا الخيار خاطئ:** عدم تطابق قاتل في الأبعاد! المتجه $\mathbf{e}$ يعيش في فضاء المخرجات $\mathbb{R}^m$، بينما الفضاء الصفري $N(\mathbf{A})$ يعيش في فضاء المدخلات $\mathbb{R}^n$.

* [ ] The Row Space $C(\mathbf{A}^T)$, because it contains all the explanatory regressors.
  * فضاء الصفوف $C(\mathbf{A}^T)$، لاحتوائه على كافة المتغيرات التفسيرية.
  > **Why this is incorrect:** The row space lives in $\mathbb{R}^n$, not $\mathbb{R}^m$, and represents input feature combinations rather than output prediction residuals.
  > **لماذا هذا الخيار خاطئ:** فضاء الصفوف يستقر في $\mathbb{R}^n$ وليس $\mathbb{R}^m$، ويمثل مدخلات الميزات التفسيرية لا بواقي المخرجات.
