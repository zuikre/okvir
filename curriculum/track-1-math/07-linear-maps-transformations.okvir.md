---
id: "t1-07"
version: "1.0.0"
title: "Linear Maps as Space Transformations"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["t1-04"]
i18n:
  ar: "التحويلات الخطية كعمليات نقل وتحوير للفضاء"
---

# Linear Maps as Space Transformations

### Intuition & Physical Grounding

Imagine drawing a neat rectangular grid on a transparent sheet of latex rubber. At the intersection of the main axes, you push a sharp metal pin through the sheet into a wooden desk, locking the origin $(0, 0)$ permanently in place. Now, grab the edges of the rubber sheet and deform it. What kinds of physical warping are considered "linear"? Linear algebra imposes two strict, non-negotiable physical rules: first, every straight grid line must remain strictly straight; second, all parallel grid lines must stay evenly spaced and parallel. You can stretch the sheet horizontally, squish it vertically, rotate it smoothly around the pin, or slide the top edge horizontally while the bottom stays anchored (a geometric shear). But you can never curve the sheet, bend grid lines into arcs, or pull the origin pin away from $(0, 0)$.

This geometric rigidity reveals the central miracle of linear algebra: to know where all *infinite* points on the 2D plane land after a transformation, you do not need to calculate or track billions of individual coordinates. You only need to follow what happens to two tiny arrows: the unit basis vectors $\hat{\mathbf{i}} = (1, 0)$ and $\hat{\mathbf{j}} = (0, 1)$!

Why is this true? Because every single point in the plane $\mathbf{x} = (x_1, x_2)$ is physically constructed as a recipe: "walk $x_1$ steps along $\hat{\mathbf{i}}$, then $x_2$ steps along $\hat{\mathbf{j}}$." Because the rubber sheet deforms linearly without bending or tearing, that exact recipe holds true after the deformation: the new landing location must be $x_1$ steps along the transformed arrow $T(\hat{\mathbf{i}})$, plus $x_2$ steps along the transformed arrow $T(\hat{\mathbf{j}})$.

This is what a **matrix** actually is. A matrix is not a dry spreadsheet of numbers meant for memorizing mechanical arithmetic. A matrix $\mathbf{A} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ is a compact geometric photo album: its first column $\begin{bmatrix} a \\ c \end{bmatrix}$ records the landing coordinates of the $X$-axis unit arrow $\hat{\mathbf{i}}$, and its second column $\begin{bmatrix} b \\ d \end{bmatrix}$ records the landing coordinates of the $Y$-axis unit arrow $\hat{\mathbf{j}}$. Once you record where those two basis arrows land, you hold the destiny of the entire universe of points in the palm of your hand.

#### Why Do We Care?
1. **Deep Learning & Neural Network Layers:** The fundamental operation inside every dense neural layer is $y = \sigma(\mathbf{W}\mathbf{x} + \mathbf{b})$. The weight matrix $\mathbf{W}$ is a linear transformation that rotates and scales the high-dimensional feature space, orienting the data so the non-linear activation $\sigma$ and bias $\mathbf{b}$ can carve out decision boundaries.
2. **Computer Graphics & Game Cameras:** In video games, rendering a 3D world onto your flat 2D monitor requires applying a sequence of $4 \times 4$ transformation matrices (Model-View-Projection matrices). Every vertex of a 3D character is transformed by matrix multiplication dozens of times per second.
3. **Robotics & Inverse Kinematics:** When a robotic arm with multiple rotating joints reaches for an object, the position of the end-effector is calculated by multiplying transformation matrices representing the rotation and stretch of each joint.

---

### الحدس الفيزيائي والهندسي

تخيل أنك رسمت شبكة مربعات منتظمة على غشاء شفاف من المطاط المرن. عند نقطة تقاطع المحورين الرئيسيين، قمت بغرس دبوس معدني حاد يثبت نقطة الأصل $(0, 0)$ بإحكام في سطح طاولة خشبية. الآن، امسك بأطراف الغشاء المطاطي وحركه لتشويه شكله. ما هي التشويهات الفيزيائية المسموح بها لكي يظل هذا التحويل "خطياً"؟ يفرض الجبر الخطي قاعدتين صارمتين لا حياد عنهما: أولاً، يجب أن تظل جميع خطوط الشبكة مستقيمة تماماً دون أي انحناء؛ ثانياً، يجب أن تظل الخطوط المتوازية متوازية ومنتظمة التباعد. يمكنك شد الغشاء أفقياً، أو ضغطه رأسياً، أو تدويره بسلاسة حول الدبوس، أو إمالته جانبياً (قص هندسي Shear)—لكنك لا تستطيع أبداً تجعيد الغشاء، أو ثني خطوطه إلى منحنيات، أو اقتلاع دبوس نقطة الأصل من مكانه.

هذه الصرامة الهندسية تقودنا إلى المعجزة الكبرى في الجبر الخطي: لمعرفة مصير *عدد لا نهائي* من النقاط في المستوى بعد التحويل، لست بحاجة إلى تتبع مليارات الإحداثيات المنفصلة؛ بل يكفيك فقط معرفة أين استقر سهمان صغيران: متجها وحدة الأساس $\hat{\mathbf{i}} = (1, 0)$ و $\hat{\mathbf{j}} = (0, 1)$!

لماذا تصح هذه المعجزة؟ لأن أي موقع $\mathbf{x} = (x_1, x_2)$ في المستوى هو في الأصل وصفة حركية: "سر $x_1$ خطوة باتجاه $\hat{\mathbf{i}}$، ثم سر $x_2$ خطوة باتجاه $\hat{\mathbf{j}}$." وبما أن الغشاء المطاطي يتمدد بشكل خطي منتظم دون تمزق أو انثناء، فإن هذه الوصفة تظل صادقة تماماً بعد التشويه: فالموقع النهائي للنقطة سيكون حتماً $x_1$ خطوة على طول السهم المتحول $T(\hat{\mathbf{i}})$ مضافاً إليه $x_2$ خطوة على طول السهم المتحول $T(\hat{\mathbf{j}})$.

هذا هو المعنى الحقيقي والعميق لـ **المصفوفة** (Matrix). المصفوفة ليست جدولاً جافاً من الأرقام الصماء لحفظ قواعد الضرب الآلية؛ المصفوفة $\mathbf{A} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ هي ألبوم صور هندسي موجز: يسجل عمودها الأول $\begin{bmatrix} a \\ c \end{bmatrix}$ إحداثيات استقرار سهم المحور السيني $\hat{\mathbf{i}}$، ويسجل عمودها الثاني $\begin{bmatrix} b \\ d \end{bmatrix}$ إحداثيات استقرار سهم المحور الصادي $\hat{\mathbf{j}}$. وبمجرد معرفة أين هبط هذان السهمان، تصبح قادراً على حساب موقع أي نقطة في الفضاء بلحظة واحدة.

#### لماذا نهتم بهذا المفهوم؟
1. **التعلم العميق وطبقات الشبكات العصبية:** العملية المركزية داخل كل طبقة في الشبكات العصبية هي $y = \sigma(\mathbf{W}\mathbf{x} + \mathbf{b})$. مصفوفة الأوزان $\mathbf{W}$ هي تحويل خطي يقوم بتدوير ومط الفضاء عالي الأبعاد للبيانات، مما يتيح لدوال التنشيط غير الخطية فصل وتصنيف الأنماط المعقدة.
2. **الرسوم ثلاثية الأبعاد وكاميرات ألعاب الفيديو:** لعرض عالم اللعبة ثلاثي الأبعاد على شاشتك المسطحة ثنائية الأبعاد، تطبق كروت الشاشة سلسلة من مصفوفات التحويل $4 \times 4$ (مصفوفات النموذج، والكاميرا، والإسقاط المنظوري). يتم تحويل كل نقطة في مجسمات اللعبة عبر ضرب المصفوفات عشرات المرات في كل ثانية.
3. **الروبوتات وحسابات الحركة العكسية:** عندما تحرك ذراع آلية مفاصلها للوصول إلى هدف ما، يُحسب الموقع النهائي لقبضة الروبوت بضرب مصفوفات التحويل الخطي التي تصف تدوير وتمديد كل مفصل على حدة.

:::simulation-widget{engine="canvas2d" component="LinearTransformMorphCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
T(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha T(\mathbf{u}) + \beta T(\mathbf{v}), \quad T(\mathbf{x}) = \mathbf{A}\mathbf{x} = x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2) = \begin{bmatrix} | & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) \\ | & | \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $T(\mathbf{x})$ | Linear Transformation | A function mapping vectors from input space to output space while strictly preserving grid geometry. |
| $T(\alpha \mathbf{u} + \beta \mathbf{v})$ | Axiom of Linearity | Guarantees two properties: additivity ($T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$) and homogeneity ($T(\alpha \mathbf{u}) = \alpha T(\mathbf{u})$). |
| $\mathbf{e}_1, \mathbf{e}_2$ | Standard Unit Basis Vectors | The pristine coordinate unit arrows: $\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$ along $X$, and $\mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$ along $Y$. |
| $T(\mathbf{e}_1), T(\mathbf{e}_2)$ | Transformed Basis Columns | Where the unit basis arrows land after the space morphs; they literally form the vertical columns of matrix $\mathbf{A}$. |
| $\mathbf{A}\mathbf{x}$ | Matrix-Vector Product | A weighted linear combination of the columns of $\mathbf{A}$, where each column is scaled by the corresponding coordinate $x_i$. |

##### Why the Math Works Step-by-Step
1. **Why does tracking basis vectors determine the transformation of everything?**
   Every vector $\mathbf{x} \in \mathbb{R}^2$ can be uniquely written as $\mathbf{x} = x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2$. Applying transformation $T$ and invoking linearity yields:
   $$T(\mathbf{x}) = T(x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2) = x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2)$$
   Because $x_1$ and $x_2$ are plain scalar numbers, they pull right outside the operator! This proves that once you know the landing vectors $T(\mathbf{e}_1)$ and $T(\mathbf{e}_2)$, calculating $T(\mathbf{x})$ for any point is purely a weighted combination of those two columns.
2. **Why must a linear transformation always map origin to origin ($T(\mathbf{0}) = \mathbf{0}$)?**
   By the homogeneity property of linearity, choose scalar $\alpha = 0$:
   $$T(\mathbf{0}) = T(0 \cdot \mathbf{v}) = 0 \cdot T(\mathbf{v}) = \mathbf{0}$$
   If a mapping shifts the origin to a non-zero position ($T(\mathbf{0}) \ne \mathbf{0}$), it violates homogeneity and is an affine translation, not a pure linear transformation.

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $T(\mathbf{x})$ | التحويل الخطي | دالة هندسية تنقل المتجهات من فضاء لآخر مع الحفاظ الصارم على استقامة وتوازي شبكة الفضاء. |
| $T(\alpha \mathbf{u} + \beta \mathbf{v})$ | بديهية الخطية الرياضية | تضمن خاصيتين: قابلية الجمع ($T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$) والتجانس القياسي ($T(\alpha \mathbf{u}) = \alpha T(\mathbf{u})$). |
| $\mathbf{e}_1, \mathbf{e}_2$ | متجهات الأساس المعياري | أسهم الوحدة الأصلية قبل التحويل: $\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$ على المحور السيني، و $\mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$ على الصادي. |
| $T(\mathbf{e}_1), T(\mathbf{e}_2)$ | أعمدة الأساس المتحولة | مواقع استقرار أسهم الوحدة بعد التحويل؛ وتشكل هذه المتجهات الأعمدة الرأسية الصريحة للمصفوفة $\mathbf{A}$. |
| $\mathbf{A}\mathbf{x}$ | جداء مصفوفة في متجه | تركيب خطي موزون لأعمدة المصفوفة $\mathbf{A}$، حيث يُضرب كل عمود في المركبة الإحداثية المقابلة له من المتجه $\mathbf{x}$. |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **لماذا يحدد مصير أسهم الأساس مصير كافة نقاط الفضاء؟**
   يمكن التعبير عن أي متجه $\mathbf{x} \in \mathbb{R}^2$ كتركيب خطي فريد: $\mathbf{x} = x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2$. وبتطبيق خاصية الخطية على التحويل $T$:
   $$T(\mathbf{x}) = T(x_1 \mathbf{e}_1 + x_2 \mathbf{e}_2) = x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2)$$
   تخرج الأرقام القياسية $x_1$ و $x_2$ خارج التحويل بكل سلاسة! هذا يبرهن أنه بمجرد معرفة عمودي المصفوفة $T(\mathbf{e}_1)$ و $T(\mathbf{e}_2)$، تصبح معرفة مصير أي نقطة مجرد ضرب وجمع مباشرين لهذين العمودين.
2. **لماذا يجب أن تبقى نقطة الأصل ثابتة دائماً ($T(\mathbf{0}) = \mathbf{0}$)؟**
   من خاصية التجانس القياسي للتحويل الخطي، باختيار المعامل $\alpha = 0$:
   $$T(\mathbf{0}) = T(0 \cdot \mathbf{v}) = 0 \cdot T(\mathbf{v}) = \mathbf{0}$$
   فإذا تسببت أي دالة في إزاحة نقطة الأصل عن موضعها ($T(\mathbf{0}) \ne \mathbf{0}$)، فإنها تفقد خاصية الخطية وتصبح إزاحة تآلفية وليست تحويلاً خطياً صرفاً.

:::python-challenge{id="py-t1-07"}
---
timeout_ms: 3000
test_cases:
  - input: "apply_linear_transform(np.array([[2.0, 0.0], [0.0, 3.0]]), np.array([1.0, 1.0]))"
    expected: "array([2., 3.])"
  - input: "apply_linear_transform(np.array([[0.0, -1.0], [1.0, 0.0]]), np.array([1.0, 0.0]))"
    expected: "array([0., 1.])"
  - input: "apply_linear_transform(np.array([[1.0, 1.0], [0.0, 1.0]]), np.array([2.0, 3.0]))"
    expected: "array([5., 3.])"
---
```python
import numpy as np

def apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:
    """
    Apply linear transformation matrix A to vector x.

    Intuition
    ---------
    Multiplying matrix A by vector x computes a linear combination of the
    columns of A, weighted by the coordinate components of x. Each column of
    A represents the transformed landing position of a unit basis vector.

    Parameters
    ----------
    A : np.ndarray of shape (M, N)
        Transformation matrix whose columns represent transformed basis vectors.
    x : np.ndarray of shape (N,)
        Input coordinate vector.

    Returns
    -------
    np.ndarray of shape (M,)
        Transformed coordinate vector Ax.

    Raises
    ------
    ValueError
        If the inner dimensions do not match (A.shape[1] != len(x)).
    """
    # Step 1: Validate dimension compatibility between matrix columns and vector length
    # if A.shape[1] != len(x):
    #     raise ValueError(f"Incompatible shapes: Matrix {A.shape} and Vector {x.shape}")

    # Step 2: Compute matrix-vector product Ax (linear combination of columns)
    # result = np.matmul(A, x)

    # Step 3: Return the transformed coordinate vector
    # return result
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Which of the following spatial transformations on the 2D plane is strictly NOT a linear map?

**العربية:** أي من التحويلات المكانية التالية على المستوى ثنائي الأبعاد يُعد قطعاً تحويلاً غير خطي؟

* [x] Translating the entire plane by a fixed non-zero vector $\mathbf{b}$: $T(\mathbf{x}) = \mathbf{x} + \mathbf{b}$.
  * إزاحة المستوى بأكمله بمقدار متجه ثابت غير صفري $\mathbf{b}$: أي $T(\mathbf{x}) = \mathbf{x} + \mathbf{b}$.
  > **Why this is correct:** A fundamental invariant of any linear transformation is that it must fix the origin: $T(\mathbf{0}) = T(0 \cdot \mathbf{x}) = 0 \cdot T(\mathbf{x}) = \mathbf{0}$. Translation moves the origin to $\mathbf{b} \ne \mathbf{0}$ and violates additivity: $T(\mathbf{u} + \mathbf{v}) = \mathbf{u} + \mathbf{v} + \mathbf{b} \ne (\mathbf{u} + \mathbf{b}) + (\mathbf{v} + \mathbf{b})$. Hence, spatial translation is an affine map, not a pure linear map.
  > **لماذا هذا الخيار صحيح:** من الثوابت الأساسية لأي تحويل خطي بقاء نقطة الأصل ثابتة: $T(\mathbf{0}) = \mathbf{0}$. الإزاحة المكانية تنقل نقطة الأصل إلى $\mathbf{b} \ne \mathbf{0}$ وتخل بشرط الجمع: $T(\mathbf{u} + \mathbf{v}) = \mathbf{u} + \mathbf{v} + \mathbf{b} \ne (\mathbf{u} + \mathbf{b}) + (\mathbf{v} + \mathbf{b})$. لذلك، الإزاحة هي تحويل تآلفي (Affine) وليست تحويلاً خطياً صرفاً.

* [ ] Rotating the plane by $45^\circ$ counterclockwise about the origin.
  * تدوير المستوى بزاوية $45^\circ$ عكس عقارب الساعة حول نقطة الأصل.
  > **Why this is incorrect:** Pure rotation about the origin keeps the origin pinned at $(0, 0)$ and preserves straight parallel grid lines; it is an orthogonal linear map represented by a rotation matrix.
  > **لماذا هذا الخيار خاطئ:** الدوران الصافي حول نقطة الأصل يبقي نقطة الأصل ثابتة في موضعها ويحافظ على استقامة وتوازي خطوط الشبكة؛ وهو تحويل خطي متعامد تماماً.

* [ ] Shearing the plane horizontally such that points higher up slide farther to the right: $T(x, y) = (x + 2y, y)$.
  * قص المستوى أفقياً (Shear) بحيث تنزلق النقاط الأعلى مسافة أكبر لليمين: $T(x, y) = (x + 2y, y)$.
  > **Why this is incorrect:** Shearing keeps the origin fixed and preserves straight lines and parallelism; it is represented by matrix $\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$, which is a completely valid linear map.
  > **لماذا هذا الخيار خاطئ:** تحويل القص يحافظ على ثبات نقطة الأصل واستقامة وتوازي الخطوط، وتمثله المصفوفة $\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$ وهو تحويل خطي صحيح تماماً.
