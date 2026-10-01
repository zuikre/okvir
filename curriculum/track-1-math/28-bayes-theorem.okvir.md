---
id: "bayes-theorem"
version: "1.0.0"
title: "Constrained Optimization & Lagrange Multipliers"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric"]
i18n:
  ar: "التحسين المقيد ومضروبات لاغرانج"
---

# Constrained Optimization & Lagrange Multipliers

## Beat 1: Tactile Intuition

Suppose you wish to climb to the highest possible elevation on a scenic mountain landscape ($f(x, y)$), but you are strictly forbidden by park rangers from stepping off a paved asphalt trail ($g(x, y) = c$). You cannot simply run to the mountain's true peak, because the trail does not pass through the summit. Where along the trail is your elevation maximized?

Consider hiking along the trail: as long as the trail cuts across elevation contour lines at an angle, you are actively gaining or losing height. The *only* point where your elevation stops changing along the trail is when **the trail runs perfectly parallel to a contour line**!

At that exact tangency point, the trail does not cross the contour; it grazes it. Because the normal vector to the trail is $\nabla g$ and the normal vector to the contour line is $\nabla f$, the two gradient vectors must be **perfectly parallel and collinear**: $\nabla f = \lambda \nabla g$. The scaling constant $\lambda$ is the famous **Lagrange Multiplier**, and in economics and machine learning, it measures the exact "shadow price" or sensitivity of the optimal cost to relaxing the constraint.

لنفترض أنك ترغب في الوصول إلى أعلى ارتفاع ممكن على جبل بديع ($f(x, y)$)، ولكن حراس المحمية يمنعونك منعاً باتاً من مغادرة مسار سياحي مرصوف محدد بالمعادلة ($g(x, y) = c$). لا يمكنك التوجه مباشرة إلى قمة الجبل الحقيقية لأن المسار لا يمر بها. أين بالضبط على طول هذا المسار ستحقق أقصى ارتفاع ممكن؟

فكر في مسار حركتك: طالما أن المسار السياحي يقطع خطوط كنتور الارتفاع بزاوية مائلة، فإنك تواصل الصعود أو الهبوط باستمرار. النقطة *الوحيدة* التي يتوقف عندها ارتفاعك عن التغير على طول المسار هي النقطة التي **يسير فيها المسار موازياً تماماً لخط الكنتور**!

عند نقطة التماس هذه تحديداً، لا يشطر المسار خط الكنتور بل يلامسه بخفة. ونظراً لأن المتجه العمودي على المسار هو $\nabla g$ والمتجه العمودي على خط الكنتور هو $\nabla f$، فإن المتجهين يجب أن يكونا **متوازيين تماماً وعلى نفس خط العمل**: $\nabla f = \lambda \nabla g$. يُدعى معامل التناسب $\lambda$ بـ **مضروب لاغرانج** (Lagrange Multiplier)، ويمثل في الاقتصاد وتعلم الآلة "السعر الخفي" أو الحساسية الهامشية لقيمة الهدف عند إرخاء القيد.

:::simulation-widget{engine="canvas2d" component="LagrangeMultiplierCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
\min_{\mathbf{x} \in \mathbb{R}^N} f(\mathbf{x}) \quad \text{subject to} \quad g_j(\mathbf{x}) = 0, \; j = 1, \dots, M
$$
$$
\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda}) \coloneqq f(\mathbf{x}) + \sum_{j=1}^M \lambda_j g_j(\mathbf{x}) = f(\mathbf{x}) + \boldsymbol{\lambda}^T \mathbf{g}(\mathbf{x})
$$
$$
\begin{bmatrix} Q & A^T \\ A & 0 \end{bmatrix} \begin{bmatrix} \mathbf{x}^* \\ \boldsymbol{\lambda}^* \end{bmatrix} = \begin{bmatrix} -\mathbf{c} \\ \mathbf{b} \end{bmatrix} \quad (\text{Karush-Kuhn-Tucker Block System})
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $f(\mathbf{x})$ | $\mathbb{R}^N \to \mathbb{R}$ | Unconstrained scalar objective surface | Target function being minimized |
| $g_j(\mathbf{x}) = 0$ | Manifold | Constraint boundary hypersurface | Rigid restriction defining feasible domain |
| $\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda})$ | $\mathbb{R}^{N+M} \to \mathbb{R}$ | Lagrangian auxiliary function | Converts constrained problem into saddle-point search |
| $\lambda_j$ | $\mathbb{R}$ | Gradient collinearity alignment scale factor | Lagrange multiplier measuring marginal constraint tension |
| $\mathbf{x}^*$ | $\mathbb{R}^N$ | Optimal primal coordinates | Optimal feasible decision vector |
| $\boldsymbol{\lambda}^*$ | $\mathbb{R}^M$ | Optimal dual coordinates | Shadow prices indicating sensitivity to constraint bounds |

Setting $\nabla_{\mathbf{x}, \boldsymbol{\lambda}} \mathcal{L} = \mathbf{0}$ yields the Karush-Kuhn-Tucker (KKT) conditions. The solution is not a local minimum of $\mathcal{L}$, but a saddle point: minimized with respect to $\mathbf{x}$ and maximized with respect to $\boldsymbol{\lambda}$.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $f(\mathbf{x})$ | $\mathbb{R}^N \to \mathbb{R}$ | دالة الهدف القياسية غير المقيدة | الدالة المراد تصغيرها |
| $g_j(\mathbf{x}) = 0$ | متعدد شعب | السطح الفوقي الحاكم لقيود المسألة | الحدود الصلبة التي تحدد فضاء الحلول المقبولة |
| $\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda})$ | $\mathbb{R}^{N+M} \to \mathbb{R}$ | دالة لاغرانج المساعدة | تحول المسألة المقيدة إلى بحث عن نقطة سرجية |
| $\lambda_j$ | $\mathbb{R}$ | معامل توازي وتطابق متجهات التدرج | مضروب لاغرانج المعبر عن الشد الهامشي للقيد |
| $\mathbf{x}^*$ | $\mathbb{R}^N$ | حل المتغيرات الأصلية الأمثل | متجه القرار الأمثل الملتزم بكافة القيود |
| $\boldsymbol{\lambda}^*$ | $\mathbb{R}^M$ | حل المتغيرات الثنائية الأمثل | الأسعار الخفية المعبرة عن حساسية الهدف لتعديل القيود |

تؤدي مساواة التدرج $\nabla_{\mathbf{x}, \boldsymbol{\lambda}} \mathcal{L} = \mathbf{0}$ بالصفر إلى شروط كاروش-كون-تاكر (KKT). لا يمثل الحل نهاية صغرى لدالة لاغرانج، بل نقطة سرجية: يتم تصغيرها بالنسبة للمتغيرات الأصلية $\mathbf{x}$ وتعظيمها بالنسبة للمضروبات $\boldsymbol{\lambda}$.

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-bayes-theorem"}
---
timeout_ms: 3000
test_cases:
  - input: "x_s, lam_s = solve_constrained_quadratic_kkt(np.eye(2), np.zeros(2), np.array([[1.0, 1.0]]), np.array([2.0])); list(np.round(x_s, 2))"
    expected: "[1.0, 1.0]"
  - input: "x_s, lam_s = solve_constrained_quadratic_kkt(np.eye(2), np.zeros(2), np.array([[1.0, 1.0]]), np.array([2.0])); list(np.round(lam_s, 2))"
    expected: "[-1.0]"
---
```python
import numpy as np

def solve_constrained_quadratic_kkt(
    Q: np.ndarray,
    c: np.ndarray,
    A: np.ndarray,
    b: np.ndarray
) -> tuple[np.ndarray, np.ndarray]:
    """
    Solve equality-constrained quadratic program:
        min  0.5 * x^T Q x + c^T x
        s.t. A x = b
    via the Karush-Kuhn-Tucker (KKT) block linear matrix system.
    
    Parameters
    ----------
    Q : np.ndarray
        Symmetric positive-definite Hessian matrix of shape (N, N).
    c : np.ndarray
        Linear cost vector of shape (N,).
    A : np.ndarray
        Linear constraint matrix of shape (M, N) with M < N.
    b : np.ndarray
        Constraint target vector of shape (M,).
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        x_star : Optimal primal solution vector of shape (N,).
        lambda_star : Optimal dual Lagrange multiplier vector of shape (M,).
    """
    n = Q.shape[0]
    m = A.shape[0]
    
    # Step 1: Assemble KKT block coefficient matrix [[Q, A^T], [A, 0]]
    KKT = np.block([
        [Q, A.T],
        [A, np.zeros((m, m))]
    ])
    
    # Step 2: Assemble right-hand side vector [-c, b]
    rhs = np.concatenate([-c, b])
    
    # Step 3: Solve linear system KKT @ [x*, lambda*] = rhs
    solution = np.linalg.solve(KKT, rhs)
    
    # Step 4: Extract primal solution and dual multipliers
    x_star = solution[:n]
    lambda_star = solution[n:]
    
    return x_star, lambda_star
```
:::

## Beat 4: Reality Transfer Challenge

In Support Vector Machines (SVMs), the margin maximization problem minimizes $\frac{1}{2}\|\mathbf{w}\|^2$ subject to classification margin constraints $y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1$. At the optimal solution, many training points have Lagrange multipliers $\alpha_i = 0$, while a select few have $\alpha_i > 0$. What is the geometric interpretation of the points with $\alpha_i > 0$?

* [ ] They are statistical outliers that should be purged from the training corpus.
* [x] They are the critical "Support Vectors" lying directly on the margin boundary ($y_i(\mathbf{w}^T \mathbf{x}_i + b) = 1$); moving them would alter the optimal boundary, whereas points with $\alpha_i = 0$ lie safely beyond the margin and exert zero force.
* [ ] They are misclassified training points where the margin constraint failed completely.
* [ ] They represent data samples where the loss surface exhibits a local maximum.
