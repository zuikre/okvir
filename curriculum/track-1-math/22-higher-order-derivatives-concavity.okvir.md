---
id: "higher-order-derivatives-concavity"
version: "1.0.0"
title: "Partial Derivatives & Axis-Aligned Slices"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["differentiation-rules-chain"]
i18n:
  ar: "المشتقات الجزئية وشرائح المحاور المعيارية"
---

# Partial Derivatives & Axis-Aligned Slices

## Beat 1: Tactile Intuition

You are standing on a rugged mountainside. If someone asks you: *"What is the slope of the mountain right where you are standing?"*, you cannot give a single number! Why? Because if you take a step north, you might scramble up an agonizingly steep ledge; if you step east, you might stroll along a flat ridge; if you step south, you might slide down a steep scree slope. **Slope in multivariable space depends entirely on the direction of your step.**

**Partial derivatives** are the cleanest, most fundamental directional questions you can ask:
1. What is the slope if you freeze your $y$-coordinate into solid concrete and step exclusively along the $X$-axis ($\frac{\partial f}{\partial x}$)?
2. What is the slope if you freeze your $x$-coordinate completely and step exclusively along the $Y$-axis ($\frac{\partial f}{\partial y}$)?

Geometrically, computing $\frac{\partial f}{\partial x}$ corresponds to taking a giant laser and slicing the 3D mountain landscape with a vertical plane parallel to the $X$-axis. The intersection of that slicing plane with the mountain surface forms a simple 1D curve, and the partial derivative is nothing more than the ordinary tangent slope of that slice.

أنت تقف الآن على سفح جبل صخري وعر. إذا سألك أحد المتسلقين: *"ما هو ميل الجبل عند النقطة التي تقف عليها تماماً؟"*، فلن تتمكن من إجابته برقم واحد! لماذا؟ لأنك إذا خطوت خطوة نحو الشمال، فقد تصعد حافة صخرية شديدة الانحدار؛ وإذا خطوت نحو الشرق، فقد تسير على حافة أفقية مريحة؛ وإذا خطوت نحو الجنوب، فقد تهوي إلى الأسفل. **الميل في الفضاء متعدد الأبعاد يعتمد كلياً على الاتجاه الذي تختاره لحركتك.**

تمثل **المشتقات الجزئية** (Partial Derivatives) أبسط الأسئلة الاتجاهية وأكثرها جوهرية:
1. ما هو الميل إذا قمت بتجميد إحداثي $y$ كلياً وكأنه صخرة صلبة، وتحركت حصرياً على طول محور $X$ (المشتقة $\frac{\partial f}{\partial x}$)؟
2. ما هو الميل إذا قمت بتجميد إحداثي $x$ تماماً، وخطوت حصرياً على طول محور $Y$ (المشتقة $\frac{\partial f}{\partial y}$)؟

هندسياً، يعادل حساب $\frac{\partial f}{\partial x}$ استخدام سكين ليزري عملاق لشطر الجبل ثلاثي الأبعاد بشريحة رأسية موازية لمحور $X$. تقاطع هذه الشريحة مع سطح الجبل يشكل منحنى أحادي البعد، وتكون المشتقة الجزئية هي ببساطة ميل المماس العادي لذلك المنحنى المقطوع.

:::simulation-widget{engine="canvas2d" component="PartialTangentPlaneCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
\frac{\partial f}{\partial x_i}(\mathbf{x}) \coloneqq \lim_{h \to 0} \frac{f(\mathbf{x} + h \mathbf{e}_i) - f(\mathbf{x})}{h} = \left. \frac{d}{dh} f(\mathbf{x} + h \mathbf{e}_i) \right|_{h=0}
$$
$$
\nabla f(\mathbf{x}) = \begin{bmatrix} \frac{\partial f}{\partial x_1}(\mathbf{x}) \\ \vdots \\ \frac{\partial f}{\partial x_D}(\mathbf{x}) \end{bmatrix} \in \mathbb{R}^D
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^D$ | Operating point in domain space | Coordinates where sensitivity is probed |
| $\mathbf{e}_i$ | $\mathbb{R}^D$ | $i$-th canonical unit basis vector $[0,\dots,1,\dots,0]^T$ | Enforces displacement strictly along axis $i$ |
| $h$ | $\mathbb{R} \setminus \{0\}$ | Infinitesimal probe displacement | Testing step along the chosen coordinate axis |
| $\frac{\partial f}{\partial x_i}$ | $\mathbb{R}$ | Slope of the 1D planar slice parallel to axis $i$ | Quantifies isolated sensitivity to input $x_i$ |
| $\partial$ | Symbol | Del / curved d notation | Signals that all other variables are held strictly constant |

When evaluating $\frac{\partial f}{\partial x}$, treat every other variable ($y, z, \dots$) as inert numerical constants. If an expression contains $3 x^2 y$, $y$ acts as a constant multiplier, yielding $6 x y$.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^D$ | نقطة الارتكاز في فضاء المدخلات | الإحداثيات التي يُفحص عندها معدل التغير |
| $\mathbf{e}_i$ | $\mathbb{R}^D$ | متجه الوحدة المعياري $i$ $[0,\dots,1,\dots,0]^T$ | يفرض حصر الحركة على طول المحور $i$ فقط |
| $h$ | $\mathbb{R} \setminus \{0\}$ | إزاحة الفحص متناهية الصغر | خطوة الاختبار اللحظية على طول المحور المختار |
| $\frac{\partial f}{\partial x_i}$ | $\mathbb{R}$ | ميل الشريحة المستوية الموازية للمحور $i$ | يقيس الحساسية المعزولة للمدخل $x_i$ |
| $\partial$ | رمز | علامة التفاضل الجزئي (رمز ياكوبي) | تُنبه القارئ إلى أن كافة المتغيرات الأخرى ثابتة |

عند حساب المشتقة الجزئية بالنسبة لـ $x$، عامل جميع المتغيرات الأخرى ($y, z, \dots$) كأرقام ثابتة صلبة. فإذا كان التعبير $3 x^2 y$، يعامل $y$ كمعامل ضرب ثابت، وتكون النتيجة $6 x y$.

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-higher-order-derivatives-concavity"}
---
timeout_ms: 3000
test_cases:
  - input: "list(np.round(numerical_gradient_vector(lambda x: x[0]**2 + 3*x[1]**2, np.array([2.0, 1.0])), 2))"
    expected: "[4.0, 6.0]"
  - input: "list(np.round(numerical_gradient_vector(lambda x: 5*x[0] - 2*x[1], np.array([0.0, 0.0])), 2))"
    expected: "[5.0, -2.0]"
---
```python
from typing import Callable
import numpy as np

def numerical_gradient_vector(f: Callable[[np.ndarray], float], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
    """
    Compute numerical partial derivatives vector using central difference perturbations.
    Constructs axis perturbation matrix E = eps * I without Python coordinate loops.
    
    Parameters
    ----------
    f : Callable
        Function mapping 1D numpy array of shape (D,) to a scalar.
    x0 : np.ndarray
        Evaluation coordinate vector of shape (D,).
    eps : float
        Central difference perturbation step size (default 1e-5).
        
    Returns
    -------
    np.ndarray
        Gradient vector containing all D partial derivatives, shape (D,).
    """
    d = len(x0)
    
    # Step 1: Construct perturbation matrix E = eps * I_d
    E = np.eye(d) * eps
    
    # Step 2: Perturb along positive and negative directions for each axis
    x_plus = x0 + E
    x_minus = x0 - E
    
    # Step 3: Evaluate function responses along each axis displacement
    f_plus = np.array([f(x_plus[i]) for i in range(d)])
    f_minus = np.array([f(x_minus[i]) for i in range(d)])
    
    # Step 4: Compute central difference quotients: (f+ - f-) / (2*eps)
    grad = (f_plus - f_minus) / (2.0 * eps)
    
    return grad
```
:::

## Beat 4: Reality Transfer Challenge

A machine learning practitioner trains a loss function $\mathcal{L}(w_1, w_2)$ and finds that at the current point, $\frac{\partial \mathcal{L}}{\partial w_1} = 25.0$ while $\frac{\partial \mathcal{L}}{\partial w_2} = 0.0$. If they apply an optimization update step strictly modifying $w_2$, what is the predicted first-order change in loss?

* [ ] The loss increases by $25.0$ per unit step.
* [x] The loss does not change at all ($d\mathcal{L} \approx 0$), because the slope along the $w_2$ axis slice is completely flat.
* [ ] The loss drops to negative infinity.
* [ ] The loss increases quadratically due to interaction terms.
