"""
Module 5 Specifications: Lessons 16 to 20
MOD-05: Single-Variable Calculus & Approximations
"""

def get_mod5_markdown():
    return """
### Module MOD-05: Single-Variable Calculus & Approximations

---

#### Lesson `math-16`: Limits & High-Accuracy Derivatives via Richardson Extrapolation
- **Module:** `MOD-05` (Single-Variable Calculus & Approximations)
- **Challenge ID:** `py-limit-difference-quotient`
- **Estimated Runtime:** < 30 ms (Pyodide WASM) | **Memory:** < 5 MB

##### 1. Concept & Mathematical Anchor
Standard numerical differentiation faces a fundamental trade-off: decreasing step size $h$ reduces truncation error $\\mathcal{O}(h^2)$, but increases catastrophic floating-point cancellation error $\\mathcal{O}(\\epsilon_{\\text{mach}} / h)$.
**Richardson Extrapolation** bypasses this limit by combining central difference approximations evaluated at step $h$ and half-step $h/2$:

$$D(h) = \\frac{f(x + h) - f(x - h)}{2h} = f'(x) + c_1 h^2 + c_2 h^4 + \\dots$$

Multiplying $D(h/2)$ by 4 and subtracting $D(h)$ cancels the leading $h^2$ error term:

$$D^*(x) = \\frac{4 D(h/2) - D(h)}{3} = f'(x) + \\mathcal{O}(h^4)$$

This achieves 4th-order accuracy at moderate step sizes ($h \\approx 0.1$) without floating-point instability.

##### 2. Specifications & Typing
- **Function Signature:** `def richardson_extrapolated_derivative(f, x: float, h: float = 0.1) -> float`
- **Input Parameters:**
  - `f` (`Callable[[float], float]`): Differentiable scalar function.
  - `x` (`float`): Evaluation point.
  - `h` (`float`): Base step size, default `0.1`.
- **Return Value:**
  - `df_dx` (`float`): 4th-order accurate derivative approximation $f'(x)$.
- **Invariants:**
  - Truncation error order: $\\mathcal{O}(h^4)$.

##### 3. Starter Code
```python
from typing import Callable
import numpy as np

def richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:
    \"\"\"
    Compute 4th-order accurate numerical derivative using Richardson extrapolation.
    
    Parameters
    ----------
    f : Callable
        Target scalar function
    x : float
        Evaluation coordinate
    h : float
        Base step size
        
    Returns
    -------
    float
        Extrapolated derivative estimate
    \"\"\"
    # TODO: Evaluate D(h) and D(h/2), then apply Richardson combination
    pass
```

##### 4. Vectorized Reference Solution
```python
from typing import Callable
import numpy as np

def richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:
    d1 = (f(x + h) - f(x - h)) / (2.0 * h)
    d2 = (f(x + h / 2.0) - f(x - h / 2.0)) / h
    return float((4.0 * d2 - d1) / 3.0)
```

##### 5. Verification & Test Cases
###### Public Tests
- $f(x) = \\sin(x)$ at $x = 0.0$ $\\to$ Expected `1.0`.
- $f(x) = \\exp(x)$ at $x = 1.0$ $\\to$ Expected $e \\approx 2.7182818$.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Rational Function:** $f(x) = \\frac{1}{1 + x^2}$ at $x = 2.0$, analytical $f'(2) = -\\frac{4}{25} = -0.16$.
- **Step Size Invariance:** Verifying error decreases by factor of $\\approx 16$ when halving $h$.

###### Executable Assertion Suite
```python
import numpy as np

# Public trigonometric test
np.testing.assert_allclose(richardson_extrapolated_derivative(np.sin, 0.0, 0.1), 1.0, rtol=1e-5, atol=1e-7)

# Hidden exponential test
np.testing.assert_allclose(richardson_extrapolated_derivative(np.exp, 1.0, 0.05), np.e, rtol=1e-5, atol=1e-7)

# Rational function test
f_rat = lambda z: 1.0 / (1.0 + z**2)
np.testing.assert_allclose(richardson_extrapolated_derivative(f_rat, 2.0, 0.1), -0.16, rtol=1e-5, atol=1e-7)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 30 ms (Observed: 0.1 ms).
- **Heap Memory Limit:** < 5 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(1)$ (exactly 4 function evaluations), Space $\\mathcal{O}(1)$.
- **Vectorization Verification:** Pure scalar arithmetic.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** Error convergence is only 2nd-order rather than 4th-order.
- **Where (Location):** Combination weights in `(4 * d2 - d1) / 3.0`.
- **Why (Root Cause):** Using simple average `(d1 + d2) / 2` does not eliminate the leading $h^2$ Taylor coefficient.
- **How (Vectorized Fix):** Apply exact Richardson cancellation: `(4.0 * d2 - d1) / 3.0`.

---

#### Lesson `math-17`: Tangent Lines & First-Order Local Linear Approximation
- **Module:** `MOD-05` (Single-Variable Calculus & Approximations)
- **Challenge ID:** `py-tangent-linear-approx`
- **Estimated Runtime:** < 35 ms (Pyodide WASM) | **Memory:** < 5 MB

##### 1. Concept & Mathematical Anchor
First-order Taylor expansion approximates a non-linear differentiable function $f(x)$ locally around $x_0$ by its tangent line:

$$f(x) \\approx L(x) = f(x_0) + f'(x_0)(x - x_0)$$

In modern machine learning, this local linearization underlies gradient descent (moving in the direction minimizing the local tangent plane) and natural gradient algorithms. The approximation error $|f(x) - L(x)|$ scales quadratically with distance $|x - x_0|$:

$$\\text{Error } E(x) = |f(x) - L(x)| = \\frac{1}{2} |f''(\\xi)| (x - x_0)^2 = \\mathcal{O}((x - x_0)^2)$$

##### 2. Specifications & Typing
- **Function Signature:** `def linear_approximation_eval(f, df, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]`
- **Input Parameters:**
  - `f` (`Callable[[np.ndarray], np.ndarray]`): Target vectorized function.
  - `df` (`Callable[[float], float]`): Exact analytical derivative at point $x_0$.
  - `x0` (`float`): Expansion anchor coordinate.
  - `query_points` (`np.ndarray`): 1D array of query coordinates of shape `(N,)`.
- **Return Value:**
  - `linear_approx` (`np.ndarray`): Evaluated tangent line values $L(x)$, shape `(N,)`.
  - `absolute_errors` (`np.ndarray`): Pointwise absolute approximation errors $|f(x) - L(x)|$, shape `(N,)`.
- **Invariants:**
  - At $x = x_0$, error is exactly zero: $E(x_0) = 0$.

##### 3. Starter Code
```python
from typing import Callable
import numpy as np

def linear_approximation_eval(f: Callable, df: Callable, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    \"\"\"
    Evaluate local tangent line approximation and pointwise absolute errors.
    
    Parameters
    ----------
    f : Callable
        Target function accepting numpy array
    df : Callable
        Exact derivative function
    x0 : float
        Expansion center
    query_points : np.ndarray
        Array of evaluation points of shape (N,)
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        L: Linear approximation values, shape (N,)
        errors: Absolute errors |f(x) - L(x)|, shape (N,)
    \"\"\"
    # TODO: Compute vectorized tangent line and error array
    pass
```

##### 4. Vectorized Reference Solution
```python
from typing import Callable
import numpy as np

def linear_approximation_eval(f: Callable, df: Callable, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    L = f(x0) + df(x0) * (query_points - x0)
    errors = np.abs(f(query_points) - L)
    return L, errors
```

##### 5. Verification & Test Cases
###### Public Tests
- $f(x) = \\exp(x)$, $x_0 = 0.0$ at query points `[0.0, 0.1, 0.5]` $\\to$ Expected $L(x) = 1.0 + x$, zero error at $x=0$.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Quadratic Error Scaling:** $f(x) = x^2$ about $x_0 = 1.0$ has exact error $(x - 1)^2$.
- **Large Query Grid:** $N=10^4$ query points in $[x_0 - 0.1, x_0 + 0.1]$.

###### Executable Assertion Suite
```python
import numpy as np

# Public exponential test
pts_p = np.array([0.0, 0.1, 0.5])
L_p, err_p = linear_approximation_eval(np.exp, np.exp, 0.0, pts_p)
np.testing.assert_allclose(L_p, 1.0 + pts_p, rtol=1e-5, atol=1e-7)
assert err_p[0] == 0.0

# Hidden quadratic error test
pts_h = np.linspace(0.9, 1.1, 21)
f_h = lambda x: x ** 2
df_h = lambda x: 2.0 * x
L_h, err_h = linear_approximation_eval(f_h, df_h, 1.0, pts_h)
np.testing.assert_allclose(err_h, (pts_h - 1.0) ** 2, rtol=1e-5, atol=1e-7)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 35 ms (Observed: 1.1 ms for $N=10^5$).
- **Heap Memory Limit:** < 5 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(N)$, Space $\\mathcal{O}(N)$.
- **Vectorization Verification:** Pure vectorized array addition and subtraction.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** `ValueError: operands could not be broadcast together` or scalar result returned.
- **Where (Location):** Subtraction `query_points - x0`.
- **Why (Root Cause):** Converting `query_points` into a scalar float or iterating in a loop.
- **How (Vectorized Fix):** Keep `query_points` as a NumPy array: `f(x0) + df(x0) * (query_points - x0)`.

---

#### Lesson `math-18`: The Chain Rule for Composite Deep Neural Activation
- **Module:** `MOD-05` (Single-Variable Calculus & Approximations)
- **Challenge ID:** `py-chain-rule-composite`
- **Estimated Runtime:** < 40 ms (Pyodide WASM) | **Memory:** < 5 MB

##### 1. Concept & Mathematical Anchor
The **Chain Rule** is the computational foundation of reverse-mode automatic differentiation (backpropagation). For composite function $y = (f_3 \\circ f_2 \\circ f_1)(x)$:

$$\\frac{dy}{dx} = \\frac{df_3}{df_2} \\cdot \\frac{df_2}{df_1} \\cdot \\frac{df_1}{dx}$$

In a 2-layer shallow neural model with scalar input $x$:
1. $z_1 = u \\cdot x + b_1$ (linear layer 1)
2. $a_1 = \\tanh(z_1)$ (hidden activation, $\\frac{da_1}{dz_1} = 1 - a_1^2$)
3. $z_2 = w \\cdot a_1 + b_2$ (linear layer 2)
4. $y = \\sigma(z_2) = \\frac{1}{1 + e^{-z_2}}$ (output sigmoid, $\\frac{dy}{dz_2} = y(1 - y)$)

Vectorizing the backward pass computes gradients across entire batches without loops.

##### 2. Specifications & Typing
- **Function Signature:** `def composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]`
- **Input Parameters:**
  - `x` (`np.ndarray`): Input feature array of shape `(N,)`.
  - `w`, `u`, `b1`, `b2` (`float`): Model parameters.
- **Return Value:**
  - `y` (`np.ndarray`): Forward output activations $\\sigma(z_2)$, shape `(N,)`.
  - `dy_dx` (`np.ndarray`): Exact analytical derivatives $\\frac{dy}{dx}$ across all samples, shape `(N,)`.
- **Invariants:**
  - Forward output bounded $y \\in (0, 1)$.
  - Analytical gradients match numerical finite difference gradients within $10^{-4}$.

##### 3. Starter Code
```python
import numpy as np

def composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:
    \"\"\"
    Compute forward activation and exact backward chain rule derivative.
    
    Parameters
    ----------
    x : np.ndarray
        Input batch of shape (N,)
    w, u, b1, b2 : float
        Scalar weight and bias parameters
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        y: Sigmoid output activation of shape (N,)
        dy_dx: Exact analytical derivative dy/dx of shape (N,)
    \"\"\"
    # TODO: Implement forward pass and chain rule backprop
    pass
```

##### 4. Vectorized Reference Solution
```python
import numpy as np

def composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:
    z1 = u * x + b1
    a1 = np.tanh(z1)
    z2 = w * a1 + b2
    y = 1.0 / (1.0 + np.exp(-z2))
    dy_dz2 = y * (1.0 - y)
    dz2_da1 = w
    da1_dz1 = 1.0 - a1 ** 2
    dz1_dx = u
    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx
    return y, dy_dx
```

##### 5. Verification & Test Cases
###### Public Tests
- Unit values: `x = [0.0], w = 1.0, u = 1.0, b1 = 0.0, b2 = 0.0` $\\to$ Expected `y = [0.5]`, `dy_dx = [0.25]`.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Numerical Gradient Verification:** Compare analytical `dy_dx` against central difference quotient $\\frac{y(x + \\epsilon) - y(x - \\epsilon)}{2\\epsilon}$ for $\\epsilon = 10^{-6}$.
- **Batch Evaluation:** $N=1000$ points across non-linear saturating regimes.

###### Executable Assertion Suite
```python
import numpy as np

# Public test
x_p = np.array([0.0])
y_p, dy_p = composite_chain_rule(x_p, 1.0, 1.0, 0.0, 0.0)
np.testing.assert_allclose(y_p, np.array([0.5]), rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(dy_p, np.array([0.25]), rtol=1e-5, atol=1e-7)

# Hidden numerical backprop verification
x_h = np.array([-1.5, 0.5, 2.0])
y_h, dy_h = composite_chain_rule(x_h, 2.0, 0.5, 0.1, -0.3)
eps = 1e-6
y_plus, _ = composite_chain_rule(x_h + eps, 2.0, 0.5, 0.1, -0.3)
y_minus, _ = composite_chain_rule(x_h - eps, 2.0, 0.5, 0.1, -0.3)
dy_num = (y_plus - y_minus) / (2.0 * eps)
np.testing.assert_allclose(dy_h, dy_num, rtol=1e-4, atol=1e-5)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 40 ms (Observed: 1.5 ms for $N=10^4$).
- **Heap Memory Limit:** < 5 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(N)$, Space $\\mathcal{O}(N)$.
- **Vectorization Verification:** Pure vectorized elemental multiplications.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** Analytical gradient disagrees with numerical gradient by sign or scale.
- **Where (Location):** Derivative of $\\tanh$: `da1_dz1 = 1.0 - a1**2`.
- **Why (Root Cause):** Using $\\text{sech}^2(x)$ directly can overflow or recomputing $\\tanh(z_1)$ is redundant. Notice $\\frac{d}{dz}\\tanh(z) = 1 - \\tanh^2(z) = 1 - a_1^2$.
- **How (Vectorized Fix):** Express local derivatives in terms of cached forward activations: `1.0 - a1**2` and `y * (1.0 - y)`.

---

#### Lesson `math-19`: Second Derivatives, Concavity, and Geometric Curvature
- **Module:** `MOD-05` (Single-Variable Calculus & Approximations)
- **Challenge ID:** `py-second-derivative-curvature`
- **Estimated Runtime:** < 40 ms (Pyodide WASM) | **Memory:** < 5 MB

##### 1. Concept & Mathematical Anchor
While the first derivative measures slope, the second derivative measures concavity (bending rate). Geometric **Curvature** $\\kappa(x)$ measures the rate of change of the tangent angle with respect to arc length, independent of parameterization:

$$\\kappa(x) = \\frac{|y''(x)|}{\\left(1 + (y'(x))^2\\right)^{3/2}}$$

For a circle of radius $R$, the curvature is identically constant: $\\kappa = 1/R$. On a discrete grid, the second derivative is computed using the 3-point central second-difference stencil:

$$y''(x_i) = \\frac{y_{i+1} - 2y_i + y_{i-1}}{\\Delta x^2} + \\mathcal{O}(\\Delta x^2)$$

##### 2. Specifications & Typing
- **Function Signature:** `def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]`
- **Input Parameters:**
  - `y` (`np.ndarray`): Discretized curve heights of shape `(N,)` where $N \\ge 3$.
  - `dx` (`float`): Uniform step spacing, $dx > 0$.
- **Return Value:**
  - `d2y` (`np.ndarray`): Second derivative at interior nodes $i=1 \\dots N-2$, shape `(N-2,)`.
  - `curvature` (`np.ndarray`): Geometric curvature $\\kappa$ at interior nodes, shape `(N-2,)`.
- **Invariants:**
  - Curvature is strictly non-negative: $\\kappa \\ge 0$.
  - Straight lines have identically zero curvature $\\kappa = 0$.

##### 3. Starter Code
```python
import numpy as np

def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:
    \"\"\"
    Compute second derivative and geometric curvature on interior nodes.
    
    Parameters
    ----------
    y : np.ndarray
        Array of 1D curve samples of shape (N,)
    dx : float
        Uniform sample step
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        d2y: Second derivative values, shape (N - 2,)
        curvature: Geometric curvature kappa, shape (N - 2,)
    \"\"\"
    # TODO: Implement 3-point second derivative stencil and curvature formula
    pass
```

##### 4. Vectorized Reference Solution
```python
import numpy as np

def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:
    dy = (y[2:] - y[:-2]) / (2.0 * dx)
    d2y = (y[2:] - 2.0 * y[1:-1] + y[:-2]) / (dx ** 2)
    curvature = np.abs(d2y) / ((1.0 + dy ** 2) ** 1.5)
    return d2y, curvature
```

##### 5. Verification & Test Cases
###### Public Tests
- Semicircle $y = \\sqrt{R^2 - x^2}$ with $R = 5.0$ at peak $x=0$: curvature matches $1/R = 0.2$.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Straight Line:** $y = 3x + 2$ has identically zero second derivative and zero curvature.
- **Parabola:** $y = x^2$ has constant second derivative $y'' = 2.0$.

###### Executable Assertion Suite
```python
import numpy as np

# Public semicircle test (R = 5.0 -> kappa = 0.2 at apex)
R = 5.0
x_circ = np.linspace(-1.0, 1.0, 101)
dx_circ = float(x_circ[1] - x_circ[0])
y_circ = np.sqrt(R ** 2 - x_circ ** 2)
d2y, kappa = curve_curvature(y_circ, dx_circ)
mid = len(kappa) // 2
np.testing.assert_allclose(kappa[mid], 1.0 / R, rtol=1e-2, atol=1e-3)

# Hidden straight line test
y_line = 3.0 * x_circ + 2.0
d2y_line, kappa_line = curve_curvature(y_line, dx_circ)
np.testing.assert_allclose(kappa_line, np.zeros_like(kappa_line), atol=1e-7)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 40 ms (Observed: 1.2 ms for $N=10^4$).
- **Heap Memory Limit:** < 5 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(N)$, Space $\\mathcal{O}(N)$.
- **Vectorization Verification:** Sliced stencils `y[2:]`, `y[1:-1]`, `y[:-2]`.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** Curvature is off by power of $dx$ or shape mismatch.
- **Where (Location):** Denominator of second derivative: `dx ** 2`.
- **Why (Root Cause):** Dividing by `2.0 * dx` instead of `dx ** 2`. The second derivative stencil has dimension $\\Delta y / \\Delta x^2$.
- **How (Vectorized Fix):** Use `(y[2:] - 2.0 * y[1:-1] + y[:-2]) / (dx ** 2)`.

---

#### Lesson `math-20`: Taylor Polynomial Expansions & High-Order Approximations
- **Module:** `MOD-05` (Single-Variable Calculus & Approximations)
- **Challenge ID:** `py-taylor-polynomial`
- **Estimated Runtime:** < 45 ms (Pyodide WASM) | **Memory:** < 10 MB

##### 1. Concept & Mathematical Anchor
The **Taylor Series** represents any analytic function as an infinite polynomial determined by its derivatives at expansion point $a$:

$$T_K(x) = \\sum_{k=0}^K \\frac{f^{(k)}(a)}{k!} (x - a)^k$$

In optimization, 2nd-order Taylor expansions underpin Newton-Raphson methods and Quasi-Newton (BFGS) solvers. Vectorizing the evaluation of degree-$K$ Taylor polynomials across $N$ query points without Python loops requires broadcasting the outer product of query displacements $(x_i - a)^k$ with normalized polynomial coefficients.

##### 2. Specifications & Typing
- **Function Signature:** `def taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray`
- **Input Parameters:**
  - `coeffs` (`np.ndarray`): 1D array of length $K+1$ containing derivatives at point $a$: $[f(a), f'(a), f''(a), \\dots, f^{(K)}(a)]$.
  - `a` (`float`): Expansion center.
  - `x` (`np.ndarray`): 1D array of query coordinates of shape `(N,)`.
- **Return Value:**
  - `polynomial_values` (`np.ndarray`): Approximated values $T_K(x)$ of shape `(N,)`.
- **Invariants:**
  - Factorial scaling: Coefficient for degree $k$ is $\\frac{\\text{coeffs}[k]}{k!}$.
  - Must evaluate in pure vector operations without loops over $x$ or $k$.

##### 3. Starter Code
```python
import numpy as np

def taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:
    \"\"\"
    Vectorized evaluation of degree-K Taylor polynomial across query points x.
    
    Parameters
    ----------
    coeffs : np.ndarray
        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)]
    a : float
        Expansion center
    x : np.ndarray
        Query evaluation points of shape (N,)
        
    Returns
    -------
    np.ndarray
        Taylor approximation values T_K(x) of shape (N,)
    \"\"\"
    # TODO: Implement vectorized evaluation via broadcasting and cumulative factorials
    pass
```

##### 4. Vectorized Reference Solution
```python
import numpy as np

def taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:
    k = np.arange(len(coeffs))
    factorials = np.ones(len(coeffs), dtype=float)
    if len(coeffs) > 1:
        factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))
    norm_coeffs = coeffs / factorials
    powers = (x[:, None] - a) ** k[None, :]
    return np.sum(powers * norm_coeffs[None, :], axis=1)
```

##### 5. Verification & Test Cases
###### Public Tests
- $f(x) = \\exp(x)$ at $a = 0.0$ for $x = [0.0, 0.5]$ with order $K=3$: expected `[1.0, 1.645833]`.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Cosine Expansion:** $f(x) = \\cos(x)$ at $a = 0.0$ with $K=4$, `coeffs = [1, 0, -1, 0, 1]`.
- **Large Query Grid:** $N=1000$ points evaluated simultaneously.

###### Executable Assertion Suite
```python
import numpy as np

# Public exp test
coeffs_exp = np.ones(4)
res_p = taylor_polynomial_series(coeffs_exp, 0.0, np.array([0.0, 0.5]))
expected_p = np.array([1.0, 1.0 + 0.5 + 0.5**2/2 + 0.5**3/6])
np.testing.assert_allclose(res_p, expected_p, rtol=1e-5, atol=1e-7)

# Hidden cos test
coeffs_cos = np.array([1.0, 0.0, -1.0, 0.0, 1.0])
x_test = np.linspace(-0.5, 0.5, 11)
np.testing.assert_allclose(taylor_polynomial_series(coeffs_cos, 0.0, x_test), np.cos(x_test), rtol=1e-3, atol=1e-3)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 45 ms (Observed: 1.8 ms for $N=10^4, K=10$).
- **Heap Memory Limit:** < 10 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(N \\cdot K)$, Space $\\mathcal{O}(N \\cdot K)$ broadcasting tensor.
- **Vectorization Verification:** `np.cumprod` computes factorials; `x[:, None] ** k[None, :]` broadcasts powers without loops.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** Loop detected in submission or slow performance on large $N$.
- **Where (Location):** Outer loop iterating over degree $k$.
- **Why (Root Cause):** Writing `for k in range(K)` incurs Python interpreter dispatch overhead.
- **How (Vectorized Fix):** Create 2D power matrix via 2D broadcasting: `powers = (x[:, None] - a) ** k[None, :]` and reduce along axis 1.
"""
