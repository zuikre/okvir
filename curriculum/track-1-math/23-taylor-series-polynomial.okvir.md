---
id: "taylor-series-polynomial"
version: "1.0.0"
title: "The Gradient Vector & Directional Derivatives"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["differentiation-rules-chain", "higher-order-derivatives-concavity"]
i18n:
  ar: "متجه التدرج والمشتقات الاتجاهية"
---

# The Gradient Vector & Directional Derivatives

## Beat 1: Tactile Intuition

In the previous lesson, we measured the slope of a mountain along the rigid grid lines of a map: directly East-West ($\frac{\partial f}{\partial x}$) and directly North-South ($\frac{\partial f}{\partial y}$). But out in the wilderness, you rarely confine your footsteps to the cardinal directions of a compass. What if you decide to hike along an arbitrary heading—say, $37^\circ$ North of East, directly toward a distant snow-capped peak along a unit direction vector $\hat{\mathbf{u}}$?

Do you need to set up a brand-new limit experiment from scratch? The remarkable answer is **no**. Because smooth landscapes are locally linear, you can pack all the individual axis partial derivatives into a single unified arrow: **The Gradient Vector** $\nabla f$. 

The gradient vector possesses three breathtaking physical and geometric properties:
1. **The Compass of Maximum Climb:** It points in the exact direction of **steepest possible ascent**. If you want to gain altitude as fast as humanly possible, look at the arrow $\nabla f$ and start walking in that exact direction.
2. **The Speedometer of Steepness:** The Euclidean length of the arrow, $\|\nabla f\|_2$, is the **maximum instantaneous rate of climb**. A short gradient arrow means the terrain is nearly flat; a long arrow means you are facing an imposing vertical wall.
3. **Orthogonal to Contour Lines:** Because walking tangentially along a level contour curve involves zero change in elevation ($0\text{ meters}$ climbed), the gradient vector is always **strictly perpendicular ($90^\circ$) to the contour curves**.

Picture pouring a canteen of water onto a steep mountain slope. Where does the water flow? Water does not care about grid coordinates or human axes. Obeying gravity, every liquid droplet immediately accelerates along the path of least resistance: directly opposite the gradient vector, along the direction of **steepest descent** ($-\nabla f$). In machine learning, gradient descent is simply this natural physics: releasing our parameters like water droplets down the loss mountain so they pool at the lowest possible basin.

---

في الدرس السابق، قمنا بقياس انحدار الجبل على طول المحاور الشبكية الصارمة للخريطة: شرقاً وغرباً ($\frac{\partial f}{\partial x}$) وشمالاً وجنوباً ($\frac{\partial f}{\partial y}$). لكن في الطبيعة المفتوحة، نادراً ما يقيد المتسلق خطواته بالاتجاهات الأربعة الأصلية للبوصلة. ماذا لو قررت السير في اتجاه مائل عشوائي—مثلاً $37^\circ$ شمال الشرق، متوجهاً مباشرة نحو قمة جليدية بارزة على طول متجه وحدة $\hat{\mathbf{u}}$؟

هل تحتاج إلى إعادة حساب النهايات من الصفر لكل زاوية بوصلة جديدة؟ الإجابة المبهجة هي: **كلا على الإطلاق**. ونظراً لأن التضاريس الملساء خطية محلياً، يمكنك حزم كافة المشتقات الجزئية المعيارية معاً في سهم هندسي موحد فائق القوة يُدعى: **متجه التدرج** (The Gradient Vector) $\nabla f$.

يمتلك متجه التدرج ثلاث خصائص فيزيائية وهندسية مدهشة:
1. **بوصلة الصعود الأقصى:** يُشير التدرج دوماً وبدقة مطلقة نحو **الاتجاه الأشد صعوداً على الإطلاق**. إذا أردت اكتساب أكبر قدر من الارتفاع بأقل عدد من الخطوات، فانظر إلى اتجاه السهم $\nabla f$ وسر في اتجاهه مباشرة.
2. **مقياس شدة المنحدر:** يمثل الطول الإقليدي للسهم $\|\nabla f\|_2$ **أقصى معدل صعود لحظي ممكن**. فالسهم القصير يعني أرضاً شبه منبسطة، بينما السهم الطويل ينبهك إلى أنك تواجه جرفاً صخرياً شاهقاً.
3. **التعامد مع خطوط الكنتور:** بما أن السير على طول خط الكنتور المتساوي لا يُحدث أي تغير في الارتفاع ($0\text{ متر}$ صعوداً أو هبوطاً)، فإن متجه التدرج يكون دوماً **متعامداً تماماً ($90^\circ$) مع خطوط الكنتور**.

تخيل أنك سكبت وعاء ماء على سفح جبل صخري منحدر. أين سيتدفق الماء؟ قطرات الماء لا تكترث بمحاور الإحداثيات التي رسمها البشر. بل استجابةً للجاذبية، تتدحرج القطرات فوراً على طول مسار الهبوط الأشد والأسرع: في الاتجاه المعاكس تماماً لمتجه التدرج ($-\nabla f$). وفي الذكاء الاصطناعي، تمثل خوارزمية الانحدار التدريجي هذه الظاهرة الطبيعية ذاتها: حيث نترك معاملات النموذج تتدفق كقطرات الماء نحو قاع وادي الخسارة لتستقر في أعمق نقطة ممكنة.

:::simulation-widget{engine="canvas2d" component="GradientAscentVectorCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
\nabla f(\mathbf{x}) \coloneqq \begin{bmatrix} \frac{\partial f}{\partial x_1}(\mathbf{x}) \\ \vdots \\ \frac{\partial f}{\partial x_D}(\mathbf{x}) \end{bmatrix} \in \mathbb{R}^D, \quad D_{\hat{\mathbf{u}}} f(\mathbf{x}) = \nabla f(\mathbf{x})^T \hat{\mathbf{u}} = \|\nabla f(\mathbf{x})\|_2 \cos(\theta)
$$
$$
\max_{\|\hat{\mathbf{u}}\|=1} D_{\hat{\mathbf{u}}} f(\mathbf{x}) = \|\nabla f(\mathbf{x})\|_2 \iff \hat{\mathbf{u}} = \frac{\nabla f(\mathbf{x})}{\|\nabla f(\mathbf{x})\|_2} \quad (\theta = 0)
$$
$$
\nabla f(\mathbf{x}_0) \perp \text{Tangent space to the level contour } \mathcal{L}_{f(\mathbf{x}_0)}(f) \quad (\theta = \pi/2)
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $\nabla f(\mathbf{x})$ | $\mathbb{R}^D$ (Vector) | Vector pointing in the direction of steepest uphill ascent | Compiles all first-order spatial sensitivities into a single directional probe |
| $\hat{\mathbf{u}}$ | $\mathbb{R}^D, \|\hat{\mathbf{u}}\|=1$ | Unit vector specifying travel direction | The compass heading along which the slope is queried |
| $D_{\hat{\mathbf{u}}} f(\mathbf{x})$ | $\mathbb{R}$ (Scalar) | Directional derivative / instantaneous climb rate along $\hat{\mathbf{u}}$ | Measures the slope felt underfoot when hiking along direction $\hat{\mathbf{u}}$ |
| $\|\nabla f(\mathbf{x})\|_2$ | $\mathbb{R}_{\ge 0}$ | Euclidean magnitude of the gradient vector | Upper theoretical limit of how steep any directional slope can possibly be |
| $\theta$ | $[0, \pi]$ | Angle between the gradient vector and step direction $\hat{\mathbf{u}}$ | Geometric factor controlling sensitivity through the projection $\cos(\theta)$ |

#### Intuitive Rationale via Cauchy-Schwarz
Why does the directional derivative equal the dot product $\nabla f \cdot \hat{\mathbf{u}} = \|\nabla f\| \cos(\theta)$?
The dot product measures geometric alignment.
- **Maximum Ascent ($\theta = 0^\circ$):** When your walking direction $\hat{\mathbf{u}}$ aligns parallel to $\nabla f$, $\cos(0) = 1$, achieving the absolute maximum climb rate $+\|\nabla f\|$.
- **Maximum Descent ($\theta = 180^\circ$):** When you turn around and walk directly opposite to $\nabla f$, $\cos(\pi) = -1$, plunging down the fastest possible slope $-\|\nabla f\|$.
- **Zero Climb ($\theta = 90^\circ$):** When you step sideways perpendicular to $\nabla f$, $\cos(\pi/2) = 0$. You are walking tangentially along a level contour curve without gaining or losing a single millimeter of altitude.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\nabla f(\mathbf{x})$ | $\mathbb{R}^D$ (متجه) | سهم يشير في اتجاه الصعود الأقصى الأكثر حدة | يجمع كافة المشتقات الجزئية في مجس اتجاهي موحد |
| $\hat{\mathbf{u}}$ | $\mathbb{R}^D, \|\hat{\mathbf{u}}\|=1$ | متجه وحدة يحدد اتجاه الحركة المطلوب | اتجاه البوصلة المراد فحص واختبار الميل على طوله |
| $D_{\hat{\mathbf{u}}} f(\mathbf{x})$ | $\mathbb{R}$ (قيمة قياسية) | المشتقة الاتجاهية / معدل الصعود اللحظي على طول $\hat{\mathbf{u}}$ | تقيس شدة الانحدار التي يشعر بها المتسلق عند السير في الاتجاه $\hat{\mathbf{u}}$ |
| $\|\nabla f(\mathbf{x})\|_2$ | $\mathbb{R}_{\ge 0}$ | المعيار الإقليدي لطول سهم التدرج | السقف النظري الأقصى لشدة أي ميل اتجاهي في تلك النقطة |
| $\theta$ | $[0, \pi]$ | الزاوية الهندسية بين سهم التدرج واتجاه السير $\hat{\mathbf{u}}$ | المعامل الهندسي الحاكم لمقدار المشتقة عبر معامل الإسقاط $\cos(\theta)$ |

#### التفسير المنطقي عبر متباينة كوشي-شفارتز
لماذا تساوي المشتقة الاتجاهية الجداء النقطي $\nabla f \cdot \hat{\mathbf{u}} = \|\nabla f\| \cos(\theta)$؟
يقيس الجداء النقطي درجة التطابق والمحاذاة الهندسية:
- **الصعود الأقصى ($\theta = 0^\circ$):** عندما يطابق اتجاه سيرك $\hat{\mathbf{u}}$ سهم التدرج تماماً، يكون $\cos(0) = 1$، فنحصل على أقصى معدل صعود ممكن $+\|\nabla f\|$.
- **الهبوط الأقصى ($\theta = 180^\circ$):** عندما تستدير وتسير في الاتجاه المعاكس تماماً للتدرج، يكون $\cos(\pi) = -1$، فتسلك أسرع مسار هبوط ممكن $-\|\nabla f\|$.
- **انعدام التغير ($\theta = 90^\circ$):** عندما تخطو جانباً بزاوية قائمة مع التدرج، يكون $\cos(\pi/2) = 0$. في هذه الحالة أنت تسير مماسياً لخط الكنتور دون أن ترتفع أو تنخفض قيد أنملة.

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-taylor-series-polynomial"}
---
timeout_ms: 3000
test_cases:
  - input: "d_vals, best = directional_derivatives(np.array([3.0, 4.0]), np.array([[1.0, 0.0], [0.0, 1.0], [3.0, 4.0]])); int(best)"
    expected: "2"
  - input: "d_vals, best = directional_derivatives(np.array([3.0, 4.0]), np.array([[1.0, 0.0], [0.0, 1.0], [3.0, 4.0]])); float(d_vals[best])"
    expected: "5.0"
---
```python
import numpy as np

def directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:
    """
    Compute batch directional derivatives along candidate directions and locate steepest ascent.
    Normalizes candidate directions to unit vectors before evaluating inner products.
    
    Parameters
    ----------
    grad : np.ndarray
        Gradient vector of shape (D,).
    directions : np.ndarray
        Array of candidate direction vectors of shape (B, D).
        
    Returns
    -------
    tuple[np.ndarray, int]
        d_vals : Directional derivative values along unit directions, shape (B,).
        best_idx : Index of the candidate direction maximizing ascent.
    """
    # Step 1: Normalize direction vectors to unit norm along last axis
    norms = np.linalg.norm(directions, axis=-1, keepdims=True)
    unit_u = directions / norms
    
    # Step 2: Compute directional derivatives via matrix-vector multiplication (B, D) @ (D,) -> (B,)
    d_vals = unit_u @ grad
    
    # Step 3: Identify index of maximum directional ascent
    best_idx = int(np.argmax(d_vals))
    
    return d_vals, best_idx
```
:::

## Beat 4: Reality Transfer Challenge

### Conceptual Diagnostic

**English:** You stand on a 2D scalar elevation surface at coordinates where the gradient vector is $\nabla f = [3.0, 4.0]^T$. If you walk along the direction vector $\mathbf{v} = [-4.0, 3.0]^T$, what is your instantaneous rate of climb?

**العربية:** تقف على سطح تضاريس قياسي ثنائي الأبعاد عند نقطة يكون فيها متجه التدرج هو $\nabla f = [3.0, 4.0]^T$. إذا تحركت على طول متجه الاتجاه $\mathbf{v} = [-4.0, 3.0]^T$، فما هو معدل صعودك اللحظي؟

* [x] Exactly $0.0$, because $\mathbf{v}$ is orthogonal to $\nabla f$ ($[3, 4] \cdot [-4, 3] = -12 + 12 = 0$), meaning you are walking tangentially along a level contour curve without ascending or descending.
  * صفر تماماً ($0.0$)، لأن متجه الحركة $\mathbf{v}$ متعامد تماماً مع متجه التدرج $\nabla f$ (حيث $[3, 4] \cdot [-4, 3] = -12 + 12 = 0$)، مما يعني أنك تسير مماسياً لخط الكنتور المستوي دون أن تصعد أو تهبط قيد أنملة.
  > **Why this is correct:** The directional derivative is $D_{\hat{\mathbf{v}}} f = \nabla f \cdot \frac{\mathbf{v}}{\|\mathbf{v}\|}$. Since the dot product in the numerator is $(3)(-4) + (4)(3) = -12 + 12 = 0$, the angle between your trajectory and the gradient is exactly $90^\circ$ ($\theta = \pi/2$), indicating movement strictly along an isoline.
  > **لماذا هذا الخيار صحيح:** المشتقة الاتجاهية هي $D_{\hat{\mathbf{v}}} f = \nabla f \cdot \frac{\mathbf{v}}{\|\mathbf{v}\|}$. وبما أن الجداء النقطي في البسط هو $(3)(-4) + (4)(3) = 0$، فإن الزاوية بين مسار حركتك ومتجه التدرج هي $90^\circ$ تماماً، مما يثبت أن الحركة تسير على طول خط المنسوب الثابت.

* [ ] $+5.0$ meters per unit step.
  * $+5.0$ أمتار صعوداً لكل وحدة مسافة.
  > **Why this is incorrect:** $+5.0$ is the maximum climb rate, achieved only when walking parallel to the gradient $\hat{\mathbf{u}} = [0.6, 0.8]^T$, not perpendicular to it.
  > **لماذا هذا الخيار خاطئ:** المقدار $+5.0$ يمثل أقصى معدل صعود ممكن، ولا يتحقق إلا إذا سرت موازياً لسهم التدرج في الاتجاه $[0.6, 0.8]^T$، وليس متعامداً معه.

* [ ] $-5.0$ meters per unit step.
  * $-5.0$ أمتار هبوطاً لكل وحدة مسافة.
  > **Why this is incorrect:** $-5.0$ represents maximum steepest descent, achieved only when walking in the exact opposite direction to the gradient: $\hat{\mathbf{u}} = [-0.6, -0.8]^T$.
  > **لماذا هذا الخيار خاطئ:** يمثل $-5.0$ أقصى معدل هبوط ممكن، ولا يتحقق إلا بالسير في الاتجاه المعاكس تماماً لسهم التدرج: $[-0.6, -0.8]^T$.

* [ ] $+1.0$ meter per unit step.
  * $+1.0$ متر صعوداً لكل وحدة مسافة.
  > **Why this is incorrect:** The inner product cancels out to exactly zero; there is no residual fractional climb.
  > **لماذا هذا الخيار خاطئ:** ينعدم الجداء الداخلي بالكامل ليصبح صفراً تاماً دون أي متبقٍ كسري للصعود.
