---
id: "differentiation-rules-chain"
version: "1.0.0"
title: "Multivariable Scalar Fields & Topographic Elevation Landscapes"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["derivative-tangent-slope"]
i18n:
  ar: "الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية"
---

# Multivariable Scalar Fields & Topographic Elevation Landscapes

## Beat 1: Tactile Intuition

Imagine hiking across a vast mountainous wilderness. At every geographic location you stand on, indexed by your GPS coordinates (latitude $x$, longitude $y$), there is a single physical number you can read on your altimeter: your **elevation above sea level** $z = f(x, y)$. 

This assignment of a single scalar number to every coordinate in space is a **scalar field**. To represent this 3D landscape on a flat 2D hiking map, cartographers draw **contour lines** (level curves). A contour line connects all points that share the exact same elevation. If you walk strictly along a contour line, your elevation never changes by a single centimeter.

Where contour lines are tightly packed together like dense ripples, the mountain is a perilous sheer cliff; where contour lines are spaced broadly apart, the terrain is a gentle, relaxing meadow. In machine learning, the loss surface over two model weights $(w_1, w_2)$ is precisely a scalar field, and contour lines reveal the ravines and canyons through which our optimization algorithms must navigate.

تخيل أنك تخوض رحلة استكشافية في سلسلة جبال شاهقة. عند كل نقطة جغرافية تقف عليها، والمحددة بإحداثيات نظام GPS (خط العرض $x$، وخط الطول $y$)، هناك قراءة رقمية واحدة تظهر على مقياس الارتفاع: **ارتفاعك عن مستوى سطح البحر** $z = f(x, y)$.

هذا التعيين الذي يربط كل نقطة في الفضاء برقم قياسي وحيد يُسمى **الحقل العددي** (Scalar Field). ولتمثيل هذه التضاريس ثلاثية الأبعاد على خريطة ورقية مسطحة، يرسم الجغرافيون **خطوط الكنتور** (خطوط التسوية). يصل خط الكنتور بين كافة النقاط التي تتشارك نفس الارتفاع تماماً. إذا سرت بدقة على طول خط الكنتور، فلن يتغير ارتفاعك بمقدار سنتيمتر واحد صعوداً أو هبوطاً.

عندما تتزاحم خطوط الكنتور وتتقارب بشدة، فهذا يعني أن التضاريس تشكل جرفاً صخرياً شديد الانحدار؛ وعندما تتباعد، فهذا يعني أن الأرض منبسطة وسهلة المسير. في تعلم الآلة، يمثل سطح دالة الخسارة عبر وزنين $(w_1, w_2)$ حقلاً عددياً حقيقياً، وتكشف خطوط الكنتور عن الأخاديد والوديان التي تتنقل خوارزميات التحسين عبرها.

:::simulation-widget{engine="canvas2d" component="ContourElevationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
f: \mathbb{R}^n \to \mathbb{R}, \quad \mathbf{x} = \begin{bmatrix} x_1 \\ \vdots \\ x_n \end{bmatrix} \mapsto f(\mathbf{x}) \in \mathbb{R}
$$
$$
\mathcal{L}_c(f) \coloneqq \left\{ \mathbf{x} \in \mathbb{R}^n \;\middle|\; f(\mathbf{x}) = c \right\} \quad (\text{Level Set / Contour Curve at Elevation } c)
$$
$$
\|\nabla Z\|_{i, j} = \sqrt{ \left( \frac{\partial Z}{\partial x} \right)^2 + \left( \frac{\partial Z}{\partial y} \right)^2 }
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^n$ | Position vector in domain | Input coordinate representing parameter state |
| $f(\mathbf{x})$ | $\mathbb{R}$ (Scalar) | Scalar quantity (elevation, loss, potential) | Objective value evaluated at state $\mathbf{x}$ |
| $\mathcal{L}_c(f)$ | Submanifold of dim $n-1$ | Contour line (2D) or isosurface (3D) | Equipotential trajectory where $\Delta f = 0$ |
| $c$ | $\mathbb{R}$ | Constant elevation slicing level | Slicing height intersecting the continuous surface |
| $\|\nabla Z\|$ | $\mathbb{R}_{\ge 0}$ | Gradient magnitude / slope steepness | Quantifies local surface steepness per unit step |

Level curves for different values of $c_1 \ne c_2$ can never intersect on a single-valued surface, because a single coordinate cannot simultaneously possess two distinct elevations.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^n$ | متجه الإحداثيات في فضاء المدخلات | يمثل حالة المعاملات أو الموقع الجغرافي |
| $f(\mathbf{x})$ | $\mathbb{R}$ | القيمة القياسية (ارتفاع، خسارة، طاقة) | قيمة الحقل المحسوبة عند الحالة $\mathbf{x}$ |
| $\mathcal{L}_c(f)$ | متعدد شعب ذو بعد $n-1$ | خط كنتور (في بعدين) أو سطح تسوية (في 3 أبعاد) | مسار تساوي الجهد حيث يكون التغير $\Delta f = 0$ |
| $c$ | $\mathbb{R}$ | مستوى شريحة الارتفاع الثابت | منسوب القطع الأفقي الذي يشطر السطح |
| $\|\nabla Z\|$ | $\mathbb{R}_{\ge 0}$ | مقدار التدرج / شدة الانحدار | يقيس شدة ميل التضاريس لكل وحدة مسافة |

لا يمكن لخطوط الكنتور ذات القيم المختلفة $c_1 \ne c_2$ أن تتقاطع أبداً في الحقول أحادية القيمة، إذ يستحيل منطقياً وفيزيائياً أن تمتلك نفس النقطة الجغرافية ارتفاعين مختلفين في نفس الوقت.

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-differentiation-rules-chain"}
---
timeout_ms: 3000
test_cases:
  - input: "X, Y = np.meshgrid(np.linspace(0, 1, 5), np.linspace(0, 1, 5)); float(scalar_field_gradient_magnitude(3*X + 4*Y, 0.25, 0.25)[0, 0])"
    expected: "5.0"
  - input: "Z = np.ones((4, 4)); float(scalar_field_gradient_magnitude(Z, 1.0, 1.0)[0, 0])"
    expected: "0.0"
---
```python
import numpy as np

def scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:
    """
    Compute 2D spatial gradient magnitude matrix for interior grid nodes.
    
    Parameters
    ----------
    Z : np.ndarray
        2D scalar field elevation matrix of shape (H, W) with H, W >= 3.
    dx : float
        Uniform grid step along column axis (x).
    dy : float
        Uniform grid step along row axis (y).
        
    Returns
    -------
    np.ndarray
        Interior gradient magnitudes of shape (H - 2, W - 2).
    """
    # Step 1: Central difference along column axis (x, axis 1): (Z[i, j+1] - Z[i, j-1]) / (2*dx)
    dz_dx = (Z[1:-1, 2:] - Z[1:-1, :-2]) / (2.0 * dx)
    
    # Step 2: Central difference along row axis (y, axis 0): (Z[i+1, j] - Z[i-1, j]) / (2*dy)
    dz_dy = (Z[2:, 1:-1] - Z[:-2, 1:-1]) / (2.0 * dy)
    
    # Step 3: Compute Euclidean gradient norm sqrt((dz/dx)^2 + (dz/dy)^2)
    grad_mag = np.sqrt(dz_dx ** 2 + dz_dy ** 2)
    
    return grad_mag
```
:::

## Beat 4: Reality Transfer Challenge

During the inspection of a 2D neural network loss landscape, an engineer observes that the level contour curves form highly elongated, needle-thin concentric ellipses with major axis aligned along $w_1$ and minor axis along $w_2$. What does this geometric configuration reveal about the gradient landscape?

* [ ] The gradient magnitude is identical in all directions.
* [x] The loss surface is an ill-conditioned ravine: slopes are violently steep along $w_2$ (dense contour spacing) but agonizingly shallow along $w_1$ (sparse contour spacing), causing un-accelerated gradient descent to oscillate erratically.
* [ ] The network has reached a saddle point where both partial derivatives are zero.
* [ ] The parameters $w_1$ and $w_2$ are linearly dependent.
