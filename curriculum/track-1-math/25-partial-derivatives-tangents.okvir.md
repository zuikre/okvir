---
id: "partial-derivatives-tangents"
version: "1.0.0"
title: "The Jacobian Matrix & Vector-Valued Deformation"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["multivariable-scalar-fields"]
i18n:
  ar: "مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية"
---

# The Jacobian Matrix & Vector-Valued Deformation

## Beat 1: Tactile Intuition

In our previous explorations of calculus, our functions were scalar fields: they took in a multi-dimensional point and returned a single solitary number—like inputting GPS coordinates $(x, y)$ and receiving elevation $z$, or inputting millions of model weights and receiving a single loss value $\mathcal{L}$. But what happens when a physical or mathematical system takes in a multi-dimensional vector and outputs **another multi-dimensional vector**?

Consider an atmospheric weather forecast: at every geographic location $(x, y)$ on a weather map, the wind does not blow at a single scalar speed. It is a vector: it has an East-West velocity component $u(x, y)$ and a North-South velocity component $v(x, y)$. The mapping is $\mathbf{F}: \mathbb{R}^2 \to \mathbb{R}^2$. Or picture a robotic arm with three motor joints $(\theta_1, \theta_2, \theta_3)$: adjusting those three joint angles changes the $(x, y, z)$ spatial position of the gripper claw. The mapping is $\mathbf{F}: \mathbb{R}^3 \to \mathbb{R}^3$.

How do you differentiate such a vector-valued system? You cannot summarize the sensitivity with a single gradient vector, because each individual output component has its own independent gradient! 
The **Jacobian Matrix** $\mathbf{J}$ is the master operator that stacks all these gradient vectors together into an organized grid:
- Row 1 is the gradient of output component 1 ($\nabla F_1^T$).
- Row 2 is the gradient of output component 2 ($\nabla F_2^T$), and so on.

Geometrically, the Jacobian is the ultimate description of **local spatial deformation**. Imagine drawing a tiny, microscopic circular droplet of black ink on a flexible rubber sheet. If you grab the edges of the rubber sheet and stretch, twist, and deform it according to the vector mapping $\mathbf{F}$, what happens to that tiny ink droplet? Under an infinite microscope, the deformed droplet becomes a perfect **ellipse**! The Jacobian matrix $\mathbf{J}$ is the linear operator that describes exactly how that circular droplet gets stretched, rotated, and sheared into an ellipse.

In contemporary generative artificial intelligence, this geometric transformation is the engine of **Normalizing Flows** and generative coordinate transforms. By chaining together invertible vector mappings with easily computable Jacobians, AI models stretch and fold a simple bell-shaped Gaussian distribution into the fantastically complex probability distribution of realistic human faces, audio waveforms, or protein structures.

---

في استكشافاتنا السابقة لعلم الحسبان، كانت دوالنا عبارة عن حقول عددية: تستقبل نقطة متعددة الأبعاد وتُخرج رقماً قياسياً وحيداً—مثل إدخال إحداثيات الموقع $(x, y)$ واستقبال الارتفاع $z$، أو إدخال ملايين الأوزان واستقبال قيمة خسارة وحيدة $\mathcal{L}$. ولكن ماذا يحدث عندما تستقبل المنظومة الرياضية أو الفيزيائية متجهاً متعدد الأبعاد وتُخرج **متجهاً آخر متعدد الأبعاد**؟

تأمل خريطة الأرصاد الجوية لحركة الرياح: عند كل موقع جغرافي $(x, y)$ على الخريطة، لا تهب الرياح بسرعة قياسية مجردة. بل هي متجه حقيقي: تمتلك مركبة سرعة شرقية-غربية $u(x, y)$ ومركبة سرعة شمالية-جنوبية $v(x, y)$. هذا التحويل هو دالة متجهية $\mathbf{F}: \mathbb{R}^2 \to \mathbb{R}^2$. أو تخيل ذراعاً روبوتية صناعية ذات ثلاثة مفاصل حركية $(\theta_1, \theta_2, \theta_3)$: يؤدي تدوير هذه المفاصل الثلاثة إلى تغيير الموضع المكاني $(x, y, z)$ لمقبض الذراع في الفضاء الثلاثي. هذا التحويل دالة متجهية $\mathbf{F}: \mathbb{R}^3 \to \mathbb{R}^3$.

كيف نقوم بحساب مشتقة منظومة متجهية كهذه؟ لا يمكننا تلخيص الحساسية بمتجه تدرج مفرد، لأن كل مركبة في المخرجات تمتلك تدرجها الخاص المستقل!
**مصفوفة جاكوبي** (The Jacobian Matrix) $\mathbf{J}$ هي المؤثر الرياضي الجامع الذي يرص كافة متجهات التدرج هذه في شبكة مصفوفية منظمة:
- الصف الأول هو تدرج مركبة المخرجات الأولى ($\nabla F_1^T$).
- الصف الثاني هو تدرج مركبة المخرجات الثانية ($\nabla F_2^T$)، وهكذا دواليك.

هندسياً، تمثل مصفوفة جاكوبي الوصف الرياضي الأكمل لـ **التشوه المكاني المحلي**. تخيل أنك رسمت قطرة حبر دائرية متناهية الصغر على غشاء مطاطي مرن. إذا أمسكت بأطراف الغشاء المطاطي وشددته ولوّيته وشوهته وفقاً للتحويل المتجهي $\mathbf{F}$، فماذا سيحدث لتلك القطرة الدائرية الدقيقة؟ تحت مجهر لانهائي، ستتحول الدائرة المشوهة إلى **قطع ناقص (شكل بيضاوي)** مثالي! مصفوفة جاكوبي $\mathbf{J}$ هي التحويل الخطي الدقيق الذي يصف كيف تمددت تلك القطرة الدائرية، وكيف دارت، وكيف تغير حجمها لتتحول إلى ذلك القطع الناقص.

وفي الذكاء الاصطناعي التوليدي الحديث، يمثل هذا التحول الهندسي القلب النابض لنماذج **التدفقات المعيارية** (Normalizing Flows). فعبر ربط سلسلة من التحويلات المتجهية القابلة للعكس ذات مصفوفات جاكوبي سهلة الحساب، يستطيع النموذج شد وثني توزيع احتمالي غاوسي بسيط ليشكل التوزيع فائق التعقيد لصور الوجوه البشرية فائقة الدقة أو الأصوات أو الهياكل الجزيئية للبروتينات.

:::simulation-widget{engine="canvas2d" component="JacobianMappingCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
\mathbf{F}: \mathbb{R}^N \to \mathbb{R}^M, \quad \mathbf{J} = \frac{\partial \mathbf{F}}{\partial \mathbf{x}} \coloneqq \begin{bmatrix} \frac{\partial F_1}{\partial x_1} & \cdots & \frac{\partial F_1}{\partial x_N} \\ \vdots & \ddots & \vdots \\ \frac{\partial F_M}{\partial x_1} & \cdots & \frac{\partial F_M}{\partial x_N} \end{bmatrix} = \begin{bmatrix} \nabla F_1^T \\ \vdots \\ \nabla F_M^T \end{bmatrix} \in \mathbb{R}^{M \times N}
$$
$$
\mathbf{F}(\mathbf{x} + \Delta \mathbf{x}) \approx \mathbf{F}(\mathbf{x}) + \mathbf{J}(\mathbf{x}) \Delta \mathbf{x}
$$
$$
dV_{\mathbf{y}} = |\det(\mathbf{J})| \, dV_{\mathbf{x}} \quad (\text{Multivariate Volume Scaling for } M = N)
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $\mathbf{F}$ | $\mathbb{R}^N \to \mathbb{R}^M$ | Non-linear vector mapping from $N$-dim domain to $M$-dim codomain | Forward transformation modeling physical kinematics or neural flow |
| $\mathbf{J}$ | $\mathbb{R}^{M \times N}$ | Matrix of all first-order partial derivatives | Optimal local linear transformation approximating the nonlinear map $\mathbf{F}$ |
| $\nabla F_i^T$ | $1 \times N$ (Row vector) | Gradient of the $i$-th scalar output component | $i$-th row of the Jacobian matrix encoding sensitivity of output $i$ |
| $\Delta \mathbf{x}$ | $\mathbb{R}^N$ | Small spatial displacement vector in input domain | Input nudge transformed into output displacement $\Delta \mathbf{y} \approx \mathbf{J} \Delta \mathbf{x}$ |
| $|\det(\mathbf{J})|$ | $\mathbb{R}_{\ge 0}$ (for $M=N$) | Local volume magnification / expansion factor | The scaling factor when transforming probability densities and multidimensional integrals |

#### Intuitive Rationale for $|\det(\mathbf{J})|$
Why does the absolute determinant $|\det(\mathbf{J})|$ represent volume scaling?
In linear algebra, the determinant of a matrix represents the volume of the parallelotope formed by its column vectors. Because the Jacobian $\mathbf{J}$ is the best linear approximation of $\mathbf{F}$ around a point $\mathbf{x}$, an infinitesimal cube of volume $dV_{\mathbf{x}} = dx_1 dx_2 \dots dx_N$ is mapped into an infinitesimal parallelotope in the output space. The volume of this new parallelotope is precisely scaled by $|\det(\mathbf{J})|$. If $|\det(\mathbf{J})| = 3.0$, the function locally expands volumes by a factor of 3. If $|\det(\mathbf{J})| = 0$, the function collapses a dimension, flattening volumes into pancakes.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\mathbf{F}$ | $\mathbb{R}^N \to \mathbb{R}^M$ | تحويل غير خطي متجهي من فضاء ذي بعد $N$ إلى فضاء ذي بعد $M$ | النمذجة الرياضية لحركيات الروبوتات أو التدفقات العصبية التوليدية |
| $\mathbf{J}$ | $\mathbb{R}^{M \times N}$ | مصفوفة كافة المشتقات الجزئية من الرتبة الأولى | أفضل تحويل خطي محلي ينوب عن الدالة غير الخطية $\mathbf{F}$ |
| $\nabla F_i^T$ | $1 \times N$ (متجه صف) | تدرج مركبة المخرجات القياسية رقم $i$ | الصف رقم $i$ في مصفوفة جاكوبي معبراً عن حساسية المخرج $i$ |
| $\Delta \mathbf{x}$ | $\mathbb{R}^N$ | متجه إزاحة مكانية دقيقة في فضاء المدخلات | مدخل الاضطراب الذي يتحول إلى إزاحة في المخرجات $\Delta \mathbf{y} \approx \mathbf{J} \Delta \mathbf{x}$ |
| $|\det(\mathbf{J})|$ | $\mathbb{R}_{\ge 0}$ (عند $M=N$) | معامل تمدد أو انكماش الحجم المكاني المحلي | معامل التوسع المستخدم في تكاملات تغيير المتغيرات وتوليد التوزيعات |

#### التفسير المنطقي لمعامل التمدد الحجمي $|\det(\mathbf{J})|$
لماذا يمثل القيمة المطلقة للمحدد $|\det(\mathbf{J})|$ مقياس تمدد الحجم؟
في الجبر الخطي، يمثل محدد المصفوفة حجم متوازي السطوح المتشكل من أعمدتها. وبما أن مصفوفة جاكوبي $\mathbf{J}$ هي أفضل تقريب خطي للدالة $\mathbf{F}$ حول النقطة $\mathbf{x}$، فإن مكعباً متناهي الصغر حجمه $dV_{\mathbf{x}} = dx_1 dx_2 \dots dx_N$ يتحول في فضاء المخرجات إلى متوازي سطوح مشوه. ويتغير حجم هذا الجسم الجديد بالتحديد بنسبة $|\det(\mathbf{J})|$. فإذا كان $|\det(\mathbf{J})| = 3.0$، فهذا يعني أن الدالة تضخم الحجم المحلي بمقدار 3 أضعاف. وإذا كان $|\det(\mathbf{J})| = 0$، فهذا يعني أن الدالة تسحق أحد الأبعاد وتضغط الحجم ليصبح مسطحاً كالصفحة.

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-partial-derivatives-tangents"}
---
timeout_ms: 3000
test_cases:
  - input: "F = lambda x: np.array([x[0]*np.cos(x[1]), x[0]*np.sin(x[1])]); list(np.round(numerical_jacobian(F, np.array([2.0, 0.0]))[0], 2))"
    expected: "[1.0, 0.0]"
  - input: "A = np.array([[2.0, 1.0], [0.0, 3.0]]); list(np.round(numerical_jacobian(lambda x: A @ x, np.array([1.0, 1.0]))[1], 2))"
    expected: "[0.0, 3.0]"
---
```python
from typing import Callable
import numpy as np

def numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
    """
    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.
    Evaluates central difference perturbations along each input basis direction.
    
    Parameters
    ----------
    F : Callable
        Vector-valued function mapping array of shape (N,) to array of shape (M,).
    x0 : np.ndarray
        Evaluation coordinate vector of shape (N,).
    eps : float
        Finite difference perturbation step size (default 1e-5).
        
    Returns
    -------
    np.ndarray
        Jacobian matrix of shape (M, N).
    """
    # Step 1: Construct coordinate perturbation matrix E = eps * I_n
    n = len(x0)
    E = np.eye(n) * eps
    cols = []
    
    # Step 2: Perturb each coordinate j via central differences to obtain column j of the Jacobian
    for j in range(n):
        f_plus = F(x0 + E[j])
        f_minus = F(x0 - E[j])
        col_j = (f_plus - f_minus) / (2.0 * eps)
        cols.append(col_j)
        
    # Step 3: Stack column derivative vectors horizontally to form (M, N) matrix
    J = np.column_stack(cols)
    return J
```
:::

## Beat 4: Reality Transfer Challenge

### Conceptual Diagnostic

**English:** In normalizing flow generative models, an invertible neural network $\mathbf{x} = g(\mathbf{z})$ transforms a simple latent variable $\mathbf{z} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$ into a complex data sample $\mathbf{x}$. To compute the exact probability density $p(\mathbf{x})$, the change-of-variables theorem scales the density by $|\det(\mathbf{J}_g)|^{-1}$. What does $|\det(\mathbf{J}_g)|$ represent geometrically?

**العربية:** في نماذج التدفقات المعيارية التوليدية (Normalizing Flows)، تقوم شبكة عصبية قابلة للعكس $\mathbf{x} = g(\mathbf{z})$ بتحويل متغير كامن بسيط $\mathbf{z} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$ إلى عينة بيانات معقدة $\mathbf{x}$. ولحساب الكثافة الاحتمالية الدقيقة $p(\mathbf{x})$، تنص مبرهنة تغيير المتغيرات على ضرب الكثافة في مقلوب المحدد $|\det(\mathbf{J}_g)|^{-1}$. ماذا يمثل المقدار $|\det(\mathbf{J}_g)|$ من الناحية الهندسية الفيزيائية؟

* [x] The local infinitesimal volume expansion/contraction factor, measuring how an infinitesimal cube in $\mathbf{z}$-space gets stretched into a parallelotope in $\mathbf{x}$-space.
  * معامل تمدد أو انكماش الحجم متناهي الصغر، والذي يقيس كيف يتمدد مكعب دقيق في فضاء المتغيرات الكامنة $\mathbf{z}$ ليتحول إلى متوازي سطوح في فضاء البيانات المشاهدة $\mathbf{x}$.
  > **Why this is correct:** The determinant of the Jacobian measures the ratio of output volume element $dV_{\mathbf{x}}$ to input volume element $dV_{\mathbf{z}}$. To preserve total probability mass ($p(\mathbf{x}) dV_{\mathbf{x}} = p(\mathbf{z}) dV_{\mathbf{z}}$), when volume expands by $|\det(\mathbf{J}_g)|$, probability density must dilute by its reciprocal.
  > **لماذا هذا الخيار صحيح:** يقيس محدد مصفوفة جاكوبي نسبة عنصر حجم المخرجات $dV_{\mathbf{x}}$ إلى عنصر حجم المدخلات $dV_{\mathbf{z}}$. وللحفاظ على الكتلة الاحتمالية الكلية ($p(\mathbf{x}) dV_{\mathbf{x}} = p(\mathbf{z}) dV_{\mathbf{z}}$)، فإنه عندما يتمدد الحجم بمقدار $|\det(\mathbf{J}_g)|$، يجب أن تنخفض الكثافة الاحتمالية بنفس النسبة عبر القسمة على هذا المحدد.

* [ ] The Euclidean distance between latent code $\mathbf{z}$ and observation $\mathbf{x}$.
  * المسافة الإقليدية المستقيمة الفاصلة بين الشفرة الكامنة $\mathbf{z}$ والمشاهدة $\mathbf{x}$.
  > **Why this is incorrect:** Determinants measure hyper-volumes, not 1D straight-line vector distances.
  > **لماذا هذا الخيار خاطئ:** تقيس المحددات الحجوم الفائقة المشوهة، ولا تقيس المسافات الخطية أحادية البعد.

* [ ] The maximum eigenvalue of the output covariance matrix.
  * القيمة الذاتية القصوى لمصفوفة التباين المشترك للمخرجات.
  > **Why this is incorrect:** The maximum eigenvalue measures variance along the single primary axis, whereas the determinant is the product of *all* singular values, measuring total multi-dimensional volume.
  > **لماذا هذا الخيار خاطئ:** تقيس القيمة الذاتية الكبرى التباين على طول محور وحيد، بينما المحدد هو حاصل ضرب *جميع* القيم الشاذة، مما يمثل الحجم متعدد الأبعاد ككل.

* [ ] The total reconstruction loss of the generative network.
  * إجمالي خطأ إعادة البناء لشبكة التوليد العصبية.
  > **Why this is incorrect:** The Jacobian determinant is a local calculus derivative of the transformation itself, completely distinct from any empirical loss metric.
  > **لماذا هذا الخيار خاطئ:** محدد جاكوبي هو مشتقة تفاضلية محلية خاصة بالتحويل الهندسي ذاته، ولا علاقة له بمقياس خطأ تدريب تجريبي.
