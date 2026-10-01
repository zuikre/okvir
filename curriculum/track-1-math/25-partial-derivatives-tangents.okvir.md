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

A scalar field takes in a multi-dimensional point and returns a single solitary number (for example, location $\to$ temperature). But what if a function takes in a multi-dimensional vector and outputs **another multi-dimensional vector**?

Consider an atmospheric wind map: at every geographic location $(x, y)$, the wind has both an east-west velocity component $u(x, y)$ and a north-south velocity component $v(x, y)$. The mapping is $\mathbf{F}: \mathbb{R}^2 \to \mathbb{R}^2$.

How do you differentiate such a vector-valued system? You cannot use a single gradient vector, because each output coordinate has its own gradient! 
The **Jacobian Matrix** $\mathbf{J}$ is the master operator that stacks all these gradient vectors as rows:
- Row 1: The gradient of output 1 ($\nabla F_1^T$).
- Row 2: The gradient of output 2 ($\nabla F_2^T$).

Geometrically, the Jacobian is the ultimate local linear transformation: if you draw an infinitesimal circular droplet of ink on your input coordinate grid, the Jacobian describes how that droplet gets stretched, rotated, and deformed into an ellipse in the output space.

يستقبل الحقل العددي نقطة متعددة الأبعاد ويُخرج رقماً قياسياً وحيداً (على سبيل المثال، الموقع الجغرافي $\to$ درجة الحرارة). ولكن ماذا لو كانت الدالة تستقبل متجهاً متعدد الأبعاد وتُخرج **متجهاً آخر متعدد الأبعاد**؟

تأمل خريطة حركة الرياح الجوية: عند كل موقع جغرافي $(x, y)$، تمتلك الرياح مركبة سرعة شرقية-غربية $u(x, y)$ ومركبة سرعة شمالية-جنوبية $v(x, y)$. هذا التحويل هو دالة متجهية $\mathbf{F}: \mathbb{R}^2 \to \mathbb{R}^2$.

كيف نقوم باشتقاق منظومة متجهية كهذه؟ لا يمكننا استخدام متجه تدرج مفرد، لأن كل مركبة في المخرجات تمتلك تدرجها الخاص!
**مصفوفة جاكوبي** (Jacobian Matrix) $\mathbf{J}$ هي المؤثر الرياضي الجامع الذي يرص كافة متجهات التدرج هذه في صفوف منظمة:
- الصف الأول: تدرج مركبة المخرجات الأولى ($\nabla F_1^T$).
- الصف الثاني: تدرج مركبة المخرجات الثانية ($\nabla F_2^T$).

هندسياً، تمثل مصفوفة جاكوبي التحويل الخطي المحلي الأسمى: إذا رسمت قطرة حبر دائرية متناهية الصغر على شبكة المدخلات، فإن مصفوفة جاكوبي تصف بدقة كيف تتمدد تلك القطرة وتدور وتتشوه لتتحول إلى شكل بيضاوي في فضاء المخرجات.

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
| $\mathbf{F}$ | $\mathbb{R}^N \to \mathbb{R}^M$ | Vector-valued nonlinear mapping | Function mapping $N$-dim domain to $M$-dim codomain |
| $\mathbf{J}$ | $\mathbb{R}^{M \times N}$ | Matrix of all first-order partial derivatives | Best local linear map approximating $\mathbf{F}$ |
| $\nabla F_i^T$ | $1 \times N$ (Row vector) | Gradient of the $i$-th scalar output component | $i$-th row of the Jacobian matrix |
| $\Delta \mathbf{x}$ | $\mathbb{R}^N$ | Small perturbation in input coordinates | Input displacement |
| $|\det(\mathbf{J})|$ | $\mathbb{R}_{\ge 0}$ (for $M=N$) | Local volume magnification factor | Scaling factor under multivariable substitution |

Never confuse the Jacobian $\mathbf{J}$ with the Hessian $\mathbf{H}$. The Jacobian contains first derivatives of a vector function $\mathbb{R}^N \to \mathbb{R}^M$. The Hessian contains second derivatives of a scalar field $\mathbb{R}^N \to \mathbb{R}$.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\mathbf{F}$ | $\mathbb{R}^N \to \mathbb{R}^M$ | تحويل غير خطي متجهي | دالة تنقل فضاء مدخلات ذي بعد $N$ إلى فضاء مخرجات ذي بعد $M$ |
| $\mathbf{J}$ | $\mathbb{R}^{M \times N}$ | مصفوفة المشتقات الجزئية من الرتبة الأولى | أفضل تحويل خطي محلي ينوب عن الدالة $\mathbf{F}$ |
| $\nabla F_i^T$ | $1 \times N$ (متجه صف) | تدرج مركبة المخرجات القياسية $i$ | الصف رقم $i$ داخل مصفوفة جاكوبي |
| $\Delta \mathbf{x}$ | $\mathbb{R}^N$ | إزاحة متناهية الصغر في المدخلات | مدخلات الاضطراب المكاني |
| $|\det(\mathbf{J})|$ | $\mathbb{R}_{\ge 0}$ (عند $M=N$) | معامل تمدد الحجم المحلي | معامل التوسع في تكاملات تغيير المتغيرات |

إياك والخلط بين مصفوفة جاكوبي $\mathbf{J}$ ومصفوفة هيسي $\mathbf{H}$. تحتوي جاكوبي على المشتقات الأولى لدالة متجهية $\mathbb{R}^N \to \mathbb{R}^M$. بينما تحتوي هيسي على المشتقات الثانية لحقل قياسي وحيد $\mathbb{R}^N \to \mathbb{R}$.

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
    n = len(x0)
    E = np.eye(n) * eps
    cols = []
    
    # Perturb each input coordinate j independently to compute column j of the Jacobian
    for j in range(n):
        f_plus = F(x0 + E[j])
        f_minus = F(x0 - E[j])
        col_j = (f_plus - f_minus) / (2.0 * eps)
        cols.append(col_j)
        
    # Stack column derivative vectors horizontally to form (M, N) matrix
    J = np.column_stack(cols)
    return J
```
:::

## Beat 4: Reality Transfer Challenge

In normalizing flow generative models, an invertible neural network $\mathbf{x} = g(\mathbf{z})$ transforms a simple latent variable $\mathbf{z} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$ into a complex data sample $\mathbf{x}$. To compute the exact probability density $p(\mathbf{x})$, the change-of-variables theorem scales the density by $|\det(\mathbf{J}_g)|^{-1}$. What does $|\det(\mathbf{J}_g)|$ represent geometrically?

* [ ] The Euclidean distance between latent code $\mathbf{z}$ and observation $\mathbf{x}$.
* [x] The local infinitesimal volume expansion/contraction factor, measuring how an infinitesimal cube in $\mathbf{z}$-space gets stretched into a parallelotope in $\mathbf{x}$-space.
* [ ] The maximum eigenvalue of the output covariance matrix.
* [ ] The total reconstruction loss of the generative network.
