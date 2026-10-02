---
id: "linear-algebra-vectors"
version: "1.0.0"
title: "Vectors as Directed Line Segments & Spatial Displacements"
track: "math"
module: "mod-01"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric"]
i18n:
  ar: "المتجهات كقطع موجهة وإزاحات مكانية"
---

# Vectors as Directed Line Segments & Spatial Displacements

### Intuition & Physical Grounding

Imagine steering a small rowboat across a wide river toward the opposite bank. You aim your bow directly North and row forward with steady vigor, moving at 4 meters per second. But the river does not sit still; a swift current sweeps from West to East at 3 meters per second. What happens to your boat? You do not move purely North, nor do you drift purely East. Nature seamlessly combines both influences: your boat travels along a diagonal trajectory at 5 meters per second, landing downstream on the opposite shore. You have just experienced the physical reality of **vector addition**.

In textbook computer science, a vector is often casually introduced as a mere "list or 1D array of numbers." But to a physicist, mathematician, or robotics engineer, a vector is fundamentally an arrow of action: a **spatial displacement** carrying both an intrinsic **magnitude** (its length or strength) and an unambiguous **direction** in space. Crucially, a free vector does not care where it starts. If you tell a robot "advance 3 meters forward and 2 meters right," that displacement instruction is identical whether the robot executes it in the kitchen, the living room, or on Mars.

When you chain consecutive physical movements—first completing journey $\mathbf{u}$, and then immediately undertaking journey $\mathbf{v}$—nature computes the outcome via the **tip-to-tail rule**. You place the starting tail of the second arrow directly onto the arrowhead tip of the first arrow. The resultant vector $\mathbf{w} = \mathbf{u} + \mathbf{v}$ points in a straight line from the initial launchpad to the final resting point. Because orthogonal spatial dimensions operate independently, your total horizontal displacement is simply the sum of horizontal parts ($u_x + v_x$), and your vertical displacement is the sum of vertical parts ($u_y + v_y$).

What happens when you multiply a vector by a plain number (called a **scalar**)? The scalar acts like a physical tension dial. If you scale a velocity vector by $2$, you double your speed while remaining locked on the exact same heading. If you multiply by $0.5$, you cut the journey in half. And if you multiply by $-1$, you do something magical: you flip the arrow $180^\circ$ backwards, retracing your path in reverse. Scaling and adding vectors—known formally as **linear combinations**—is the foundational bedrock upon which all computer graphics, physics engines, and modern neural architectures are built.

#### Why Do We Care?
1. **Game Physics & Robotics:** Every simulated character, drone, and autonomous vehicle moves through vectors. Position, velocity, acceleration, and gravity are all vectors updated every frame: $\mathbf{p}_{t+1} = \mathbf{p}_t + \mathbf{v} \cdot \Delta t$.
2. **AI & Natural Language Processing (Word Embeddings):** Modern Large Language Models represent concepts as high-dimensional semantic vectors. In embedding space, vector arithmetic captures conceptual relationships: famous analogies like $\mathbf{v}_{\text{King}} - \mathbf{v}_{\text{Man}} + \mathbf{v}_{\text{Woman}} \approx \mathbf{v}_{\text{Queen}}$ operate purely by vector subtraction and addition.
3. **Computer Vision & Optical Flow:** Video compression and tracking algorithms detect moving objects by computing optical flow vectors, measuring how clusters of pixels displace from frame to frame.

---

### الحدس الفيزيائي والهندسي

تخيل أنك تجدف بقارب خشبي صغير محاولاً عبور نهر عريض نحو الضفة المقابلة مباشرة. توجه مقدمة قاربك تماماً نحو الشمال وتجدف بعزم ثابت بسرعة 4 أمتار في الثانية. لكن مياه النهر ليست ساكنة؛ بل يجري تيار مائي جارف من الغرب نحو الشرق بسرعة 3 أمتار في الثانية. ما الذي يحدث لقاربك على أرض الواقع؟ أنت لن تتحرك شمالاً فقط، ولن تنجرف شرقاً فقط؛ بل تجمع الطبيعة بين التأثيرين بسلاسة مذهلة، ليندفع قاربك في مسار قطري بسرعة 5 أمتار في الثانية نحو الضفة المقابلة منحرفاً باتجاه مجرى النهر. لقد اختبرت للتو الحقيقة الفيزيائية الحية لـ **جمع المتجهات**.

في دروس البرمجة التقليدية، يُعرّف المتجه غالباً بشكل مجرد كـ "قائمة أو مصفوفة أحادية من الأرقام". لكن بالنسبة لعلماء الفيزياء والرياضيات ومهندسي الروبوتات، المتجه كائن فيزيائي أصيل: إنه **سهم إزاحة** يمتلك **مقداراً** (طوله أو شدته الفيزيائية) و**اتجاهاً** محدداً في الفضاء. والأمر الجوهري هو أن المتجه الحر لا يكترث بنقطة بدايته؛ فإذا أمرت ذراعاً آلية بـ "التحرك 3 أمتار للأمام ومترين لليمين"، فإن أمر الإزاحة هذا يظل متطابقاً تماماً سواء نفذته الذراع في المعمل أو في المصنع أو على سطح القمر.

عندما تركّب حركتين متعاقبتين—كأن تقوم برحلة أولى يمثلها المتجه $\mathbf{u}$ ثم تعقبها مباشرة برحلة ثانية يمثلها المتجه $\mathbf{v}$—فإن هندسة الكون تحسب النتيجة عبر **قاعدة الرأس بالذيل** (Tip-to-Tail). تضع ذيل السهم الثاني عند رأس السهم الأول، ليكون المتجه المحصل $\mathbf{w} = \mathbf{u} + \mathbf{v}$ هو السهم المستقيم الواصل مباشرة من نقطة الانطلاق الأولى إلى المحطة الأخيرة. وبما أن الأبعاد المتعامدة مستقلة تماماً، فإن إجمالي حركتك الأفقية هو مجموع الحركات الأفقية ($u_x + v_x$)، وإجمالي حركتك الرأسية هو مجموع الحركات الرأسية ($u_y + v_y$).

ماذا يحدث عندما تضرب متجهاً في عدد حقيقي بسيط (يُسمى **عدداً قياسياً** أو Scalar)؟ يعمل هذا العدد كمعامل شد ومرونة؛ فإذا ضربت متجه السرعة في 2، فإنك تضاعف سرعتك مع البقاء على نفس خط السير تماماً. وإذا ضربته في 0.5، فإنك تقطع نصف المسافة فقط. أما إذا ضربته في $-1$، فإنك تحدث انعكاساً هندسياً تاماً، حيث يستدير السهم 180 درجة إلى الخلف ليعود في الاتجاه المعاكس. إن دمج تحجيم المتجهات وجمعها—وهو ما يُعرف رسمياً بـ **التركيب الخطي** (Linear Combination)—هو حجر الأساس الذي تقوم عليه كافة محركات الألعاب الرسومية، والفيزياء الحاسوبية، والشبكات العصبية الاصطناعية.

#### لماذا نهتم بهذا المفهوم؟
1. **محركات الألعاب وهندسة الروبوتات:** كل شخصية خيالية في ألعاب الفيديو وكل سيارة ذاتية القيادة تتحرك عبر المتجهات. فالموقع، والسرعة، والتسارع، والجاذبية متجهات تتحدث في كل جزء من الثانية: $\mathbf{p}_{t+1} = \mathbf{p}_t + \mathbf{v} \cdot \Delta t$.
2. **الذكاء الاصطناعي ومعالجة اللغات الطبيعية:** تمثل النماذج اللغوية الكبيرة معاني الكلمات كمتجهات دلالية في فضاءات عالية الأبعاد. وتتم ترجمة العلاقات الفكرية بحساب المتجهات: المعادلة الشهيرة $\mathbf{v}_{\text{ملك}} - \mathbf{v}_{\text{رجل}} + \mathbf{v}_{\text{امرأة}} \approx \mathbf{v}_{\text{ملكة}}$ هي تطبيق مباشر لجمع وطرح المتجهات.
3. **الرؤية الحاسوبية (Computer Vision):** تعتمد خوارزميات تتبع الأجسام وضغط الفيديو على حساب متجهات التدفق البصري (Optical Flow)، لقياس اتجاه وسرعة إزاحة البكسلات بين الإطارات المتعاقبة.

:::simulation-widget{engine="canvas2d" component="VectorGeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{w} = \alpha \mathbf{u} + \beta \mathbf{v} = \begin{bmatrix} \alpha u_1 + \beta v_1 \\ \vdots \\ \alpha u_n + \beta v_n \end{bmatrix}, \quad \|\mathbf{v}\|_2 = \sqrt{\sum_{i=1}^n v_i^2}
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ | Vector Operands | Directed line segments representing individual physical movements or forces in $n$-dimensional space. |
| $\alpha, \beta \in \mathbb{R}$ | Scalar Multipliers | Real numbers that amplify, compress, or reverse the directions of vectors without rotating them. |
| $\mathbf{w}$ | Linear Combination | The resultant vector formed by scaling and tip-to-tail vector addition. |
| $\alpha u_i + \beta v_i$ | Component-wise Arithmetic | Shows that operations along each axis occur independently without cross-talk between orthogonal directions. |
| $\|\mathbf{v}\|_2$ | Vector Magnitude / Norm | The straight ruler length of the vector arrow from tail to tip, computed via the Pythagorean theorem. |

##### Why the Math Works Step-by-Step
1. **Why does vector addition operate component-by-component?** In a Cartesian space, the coordinate axes are orthogonal (perpendicular). Walking East has zero effect on your North-South position. Thus, total displacement along axis $i$ is strictly the sum of individual displacements along axis $i$: $w_i = u_i + v_i$.
2. **Why does a negative scalar flip the vector $180^\circ$?** When you multiply coordinate $u_i$ by $-1$, positive values become negative and negative values become positive. Geometrically, this reflects the arrow through the origin, pointing it in the exact opposite direction while preserving its absolute length ($\|-1 \cdot \mathbf{u}\| = |-1| \cdot \|\mathbf{u}\| = \|\mathbf{u}\|$).
3. **Why does the Triangle Inequality hold ($\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$)?** Geometrically, two vectors and their sum form a triangle. The straight-line path between two points is always the shortest possible path. Unless the two vectors point in the exact same direction (collinear), combining them creates an angular bend, guaranteeing that the direct shortcut $\|\mathbf{u} + \mathbf{v}\|$ is strictly shorter than traveling the two legs sequentially.

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ | المتجهات المشتركة | قطع مستقيمة موجهة تمثل إزاحات حركية أو قوى فيزيائية في فضاء ذي $n$ بعداً. |
| $\alpha, \beta \in \mathbb{R}$ | المعاملات القياسية (Scalars) | أرقام حقيقية تعمل كمقابض لتكبير المتجهات أو تقليصها أو عكسها دون تدويرها. |
| $\mathbf{w}$ | التركيب الخطي المحصل | المتجه النهائي الناتج عن تحجيم المتجهات وجمعها وفق قاعدة الرأس بالذيل. |
| $\alpha u_i + \beta v_i$ | الحساب المستقل للمركبات | إثبات أن العمليات على كل محور تتم باستقلالية تامة دون أي تداخل مع المحاور المتعامدة الأخرى. |
| $\|\mathbf{v}\|_2$ | معيار / طول المتجه | طول سهم المتجه بالمسطرة من ذيله إلى رأسه، ويُحسب بتطبيق مبرهنة فيثاغورس. |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **لماذا يتم جمع المتجهات مركبة بمركبة؟** في الفضاء الديكارتي، تكون المحاور الإحداثية متعامدة استقلالياً. المشي شرقاً لا يؤثر بتاتاً على موقعك شمالاً وجنوباً؛ ولذا فإن الإزاحة الكلية على البعد $i$ هي ببساطة حاصل جمع الإزاحات المنفردة على ذلك البعد بمفرده: $w_i = u_i + v_i$.
2. **لماذا يعكس المعامل القياسي السالب اتجاه المتجه $180^\circ$؟** عند ضرب المركبة $u_i$ في $-1$، تنقلب الإشارات الموجبة إلى سالبة والسالصة إلى موجبة؛ هندسياً، هذا ينشئ انعكاساً عبر نقطة الأصل فيشير السهم للاتجاه المعاكس تماماً مع الحفاظ على طوله الأصلي ($\|-1 \cdot \mathbf{u}\| = \|\mathbf{u}\|$).
3. **لماذا تصح متباينة المثلث دائماً ($\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$؟** يشكل المتجهان ومحصلتهما أضلاع مثلث في الفضاء. وأقصر مسار بين نقطتين هو الخط المستقيم دائماً؛ وما لم يكن المتجهان يشيران لنفس الاتجاه تماماً، فإن وجود أي زاوية بينهما يصنع مساراً مختصراً يجعل طول المحصلة أقل قطعاً من مجموع مسافتي الرحلتين.

:::python-challenge{id="py-linear-algebra-vectors"}
---
timeout_ms: 3000
test_cases:
  - input: "vector_linear_combination(np.array([1.0, 2.0]), np.array([3.0, -1.0]), 2.0, 3.0)"
    expected: "array([11.,  1.])"
  - input: "vector_linear_combination(np.array([2.0, 4.0]), np.array([1.0, 1.0]), 0.5, -1.0)"
    expected: "array([0., 1.])"
  - input: "vector_linear_combination(np.array([0.0, 5.0]), np.array([1.0, 0.0]), 0.0, 4.0)"
    expected: "array([4., 0.])"
---
```python
import numpy as np

def vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:
    """
    Compute the linear combination w = alpha * u + beta * v.

    Intuition
    ---------
    A linear combination scales two spatial displacement vectors by scalar
    factors alpha and beta, then adds them tip-to-tail across each orthogonal
    coordinate axis independently.

    Parameters
    ----------
    u : np.ndarray of shape (D,)
        First displacement vector.
    v : np.ndarray of shape (D,)
        Second displacement vector.
    alpha : float
        Scalar multiplier for vector u.
    beta : float
        Scalar multiplier for vector v.

    Returns
    -------
    np.ndarray of shape (D,)
        The combined resultant vector w.
    """
    # Step 1: Scale displacement vector u by scalar alpha
    # scaled_u = alpha * u

    # Step 2: Scale displacement vector v by scalar beta
    # scaled_v = beta * v

    # Step 3: Add the two scaled displacement vectors element-wise
    # return scaled_u + scaled_v
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Imagine an autonomous drone executing two sequential flight legs in 2D space: displacement $\mathbf{u}$, immediately followed by displacement $\mathbf{v}$. Under what precise geometric condition does the drone's net straight-line distance from its launchpad strictly equal the sum of the lengths of the two individual legs ($\|\mathbf{u} + \mathbf{v}\| = \|\mathbf{u}\| + \|\mathbf{v}\|$)?

**العربية:** تخيل طائرة درون ذاتية القيادة تنفذ مرحلتي طيران متتاليتين في فضاء ثنائي الأبعاد: إزاحة أولى يمثلها المتجه $\mathbf{u}$ تليها فوراً إزاحة ثانية يمثلها المتجه $\mathbf{v}$. تحت أي شرط هندسي دقيق تصبح المسافة المستقيمة الصافية للدرون عن منصة الإطلاق مساوية تماماً لمجموع طولي المرحلتين المنفردتين ($\|\mathbf{u} + \mathbf{v}\| = \|\mathbf{u}\| + \|\mathbf{v}\|$؟

* [x] When $\mathbf{u}$ and $\mathbf{v}$ are collinear and point in the exact same direction (angle $\theta = 0^\circ$).
  * عندما يكون المتجهان $\mathbf{u}$ و $\mathbf{v}$ على نفس خط الاستقامة ويشيران تماماً إلى نفس الاتجاه (الزاوية $\theta = 0^\circ$).
  > **Why this is correct:** By the Triangle Inequality, $\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$. Equality holds if and only if there is zero angular bend between the vectors; any non-zero angle creates a triangle where the direct hypotenuse shortcut is strictly shorter than the sum of the two legs.
  > **لماذا هذا الخيار صحيح:** وفقاً لمتباينة المثلث، $\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$. وتتحقق المساواة الصارمة فقط عندما تكون الزاوية بينهما صفراً؛ فوجود أي انحناء زاوي يصنع مثلثاً يكون فيه المسار المباشر أقصر قطعاً من مجموع مسافتي الضلعين.

* [ ] When $\mathbf{u}$ and $\mathbf{v}$ are strictly perpendicular (orthogonal, angle $\theta = 90^\circ$).
  * عندما يكون المتجهان متعامدين تماماً (الزاوية $\theta = 90^\circ$).
  > **Why this is incorrect:** When perpendicular, the Pythagorean theorem dictates that $\|\mathbf{u} + \mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2$. Taking square roots guarantees that $\|\mathbf{u} + \mathbf{v}\| < \|\mathbf{u}\| + \|\mathbf{v}\|$.
  > **لماذا هذا الخيار خاطئ:** عند التعامد، تنطبق مبرهنة فيثاغورس $\|\mathbf{u} + \mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2$، وبأخذ الجذر التربيعي نجد حتماً أن طول الوتر أقل من مجموع الضلعين.

* [ ] Whenever $\|\mathbf{u}\| = \|\mathbf{v}\|$, regardless of the angle between them.
  * كلما تساوى طولا المتجهين $\|\mathbf{u}\| = \|\mathbf{v}\|$ بغض النظر عن الزاوية بينهما.
  > **Why this is incorrect:** Equal magnitudes do not prevent directional cancellation. If two equal-length vectors point at $120^\circ$, their sum has a magnitude equal to $\|\mathbf{u}\|$, not $2\|\mathbf{u}\|$. If they point at $180^\circ$ (opposite directions), their sum drops to zero!
  > **لماذا هذا الخيار خاطئ:** تساوي الأطوال لا يمنع الإلغاء الاتجاهي؛ فإذا كان المتجهان متساويين وبينهما زاوية $120^\circ$، فإن محصلتهما تساوي طول أحدهما فقط وليس ضعفه. وإذا كانت الزاوية $180^\circ$ انعدمت المحصلة تماماً!
