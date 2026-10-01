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

In the previous lesson, we measured the slope along the grid axes: east-west and north-south. But what if you choose to hike along an arbitrary compass heading—say, $37^\circ$ north of east, along a unit vector $\hat{\mathbf{u}}$?

You do not need to conduct a brand-new limit experiment. You can pack all the individual partial derivatives together into a single mathematical vector: **The Gradient Vector** $\nabla f$.
The gradient vector possesses two foundational properties:
1. It points in the **direction of steepest possible ascent** (the compass heading that makes you climb upward fastest).
2. Its length $\|\nabla f\|$ is the **maximum instantaneous rate of climb**.

To find the slope in *any* arbitrary direction $\hat{\mathbf{u}}$, you compute the dot product: $D_{\hat{\mathbf{u}}} f = \nabla f \cdot \hat{\mathbf{u}} = \|\nabla f\| \cos(\theta)$. Furthermore, because walking along a level contour curve involves zero climb ($D_{\mathbf{t}} f = 0$), the gradient vector is always **strictly orthogonal ($90^\circ$) to the contour level curves**.

في الدرس السابق، قمنا بقياس الميل على طول المحاور الشبكية المعيارية: شرقاً وغرباً، شمالاً وجنوباً. ولكن ماذا لو قررت السير في اتجاه بوصلة عشوائي—مثلاً $37^\circ$ شمال الشرق، على طول متجه وحدة $\hat{\mathbf{u}}$؟

لا حاجة لإجراء حسابات نهايات جديدة ومعقدة من الصفر. يمكنك حزم كافة المشتقات الجزئية معاً في كيان متجهي موحد: **متجه التدرج** (Gradient Vector) $\nabla f$.
يمتلك متجه التدرج خاصيتين هندسيتين:
1. يُشير دوماً نحو **الاتجاه الأشد صعوداً على الإطلاق** (الاتجاه الذي يجعلك تتسلق التضاريس بأعلى سرعة ممكنة).
2. طوله $\|\nabla f\|$ يمثل **أقصى معدل صعود لحظي**.

لحساب الميل في *أي* اتجاه عشوائي $\hat{\mathbf{u}}$، ما عليك سوى حساب الجداء النقطي: $D_{\hat{\mathbf{u}}} f = \nabla f \cdot \hat{\mathbf{u}} = \|\nabla f\| \cos(\theta)$. وفضلاً عن ذلك، ونظراً لأن السير على طول خط الكنتور لا يُحدث أي تغير في الارتفاع ($D_{\mathbf{t}} f = 0$)، فإن متجه التدرج يكون دوماً **متعامداً تماماً ($90^\circ$) مع خطوط الكنتور**.

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
\max_{\|\hat{\mathbf{u}}\|=1} D_{\hat{\mathbf{u}}} f(\mathbf{x}) = \|\nabla f(\mathbf{x})\|_2 \iff \hat{\mathbf{u}} = \frac{\nabla f(\mathbf{x})}{\|\nabla f(\mathbf{x})\|_2}
$$
$$
\nabla f(\mathbf{x}_0) \perp \text{Tangent space to the level contour } \mathcal{L}_{f(\mathbf{x}_0)}(f)
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $\nabla f(\mathbf{x})$ | $\mathbb{R}^D$ | Arrow pointing along the path of steepest ascent | Vector field encoding full first-order spatial sensitivity |
| $\hat{\mathbf{u}}$ | $\mathbb{R}^D, \|\hat{\mathbf{u}}\|=1$ | Unit direction exploration vector | Compass heading for directional slope inquiry |
| $D_{\hat{\mathbf{u}}} f$ | $\mathbb{R}$ (Scalar) | Slope experienced when walking along $\hat{\mathbf{u}}$ | Directional derivative |
| $\|\nabla f\|$ | $\mathbb{R}_{\ge 0}$ | Maximum possible slope steepness | Euclidean norm quantifying maximum climb rate |
| $\theta$ | $[0, \pi]$ | Angle between gradient and trajectory $\hat{\mathbf{u}}$ | Dictates sensitivity via $\cos\theta$ projection |

By the Cauchy-Schwarz inequality, $\nabla f \cdot \hat{\mathbf{u}}$ is maximized when $\theta = 0$ (parallel alignment), minimized when $\theta = \pi$ (steepest descent, $-\nabla f$), and identically zero when $\theta = \pi/2$ (tangent to level curve).

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\nabla f(\mathbf{x})$ | $\mathbb{R}^D$ | سهم يشير في اتجاه الصعود الأقصى | حقل متجهي يجمع كافة المشتقات المكانية الأولى |
| $\hat{\mathbf{u}}$ | $\mathbb{R}^D, \|\hat{\mathbf{u}}\|=1$ | متجه وحدة اتجاهي للاستكشاف | اتجاه البوصلة المراد قياس الميل على طوله |
| $D_{\hat{\mathbf{u}}} f$ | $\mathbb{R}$ | الميل الفعلي عند السير في اتجاه $\hat{\mathbf{u}}$ | المشتقة الاتجاهية |
| $\|\nabla f\|$ | $\mathbb{R}_{\ge 0}$ | أقصى معدل صعود ممكن | المعيار الإقليدي المعبر عن أقصى شدة للميل |
| $\theta$ | $[0, \pi]$ | الزاوية بين التدرج ومتجه الاتجاه $\hat{\mathbf{u}}$ | تضبط الاستجابة عبر معامل الإسقاط $\cos\theta$ |

وفقاً لمتباينة كوشي-شفارتز، يبلغ الجداء $\nabla f \cdot \hat{\mathbf{u}}$ قيمته العظمى عندما تكون $\theta = 0$ (تطابق تام)، وأدنى قيمة سالبة عندما تكون $\theta = \pi$ (أقصى هبوط، $-\nabla f$)، ويتلاشى إلى الصفر تماماً عندما تكون $\theta = \pi/2$ (مماس لخط الكنتور).

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

You stand on a 2D scalar elevation surface at coordinates where the gradient vector is $\nabla f = [3.0, 4.0]^T$. If you walk along the direction vector $\mathbf{v} = [-4.0, 3.0]^T$, what is your instantaneous rate of climb?

* [ ] $+5.0$ meters per unit step.
* [ ] $-5.0$ meters per unit step.
* [x] Exactly $0.0$, because $\mathbf{v}$ is orthogonal to $\nabla f$ ($[3, 4] \cdot [-4, 3] = -12 + 12 = 0$), meaning you are walking tangentially along a level contour curve without ascending or descending.
* [ ] $+1.0$ meter per unit step.
