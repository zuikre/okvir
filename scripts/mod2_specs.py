"""
Module 2 Specifications: Lessons 04 to 06
MOD-02: Vector Algebra & Geometric Products
"""

def get_mod2_markdown():
    return """
### Module MOD-02: Vector Algebra & Geometric Products

---

#### Lesson `math-04`: Linear Combinations & Vector Span
- **Module:** `MOD-02` (Vector Algebra & Geometric Products)
- **Challenge ID:** `py-linear-combination`
- **Estimated Runtime:** < 40 ms (Pyodide WASM) | **Memory:** < 10 MB

##### 1. Concept & Mathematical Anchor
A linear combination scales and sums a set of vectors $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\dots, \\mathbf{v}_K\\} \\subset \\mathbb{R}^D$ using scalar weights $\\{c_1, c_2, \\dots, c_K\\}$:

$$\\mathbf{y} = \\sum_{k=1}^K c_k \\mathbf{v}_k = \\mathbf{c}^T \\mathbf{V}$$

In machine learning, every feedforward neural layer $\\mathbf{y} = W \\mathbf{x}$ and linear regression prediction $\\hat{\\mathbf{y}} = X \\boldsymbol{\\beta}$ is fundamentally a simultaneous batch of linear combinations of basis vectors. Vectorizing this operation via matrix multiplication eliminates slow nested loops.

##### 2. Specifications & Typing
- **Function Signature:** `def batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray`
- **Input Parameters:**
  - `basis_vectors` (`np.ndarray`): Floating-point matrix of shape `(K, D)` where each row is a basis vector in $\\mathbb{R}^D$.
  - `coefficients` (`np.ndarray`): Floating-point weight matrix of shape `(B, K)` containing $B$ sets of combination weights.
- **Return Value:**
  - `combined` (`np.ndarray`): Resulting combined vectors of shape `(B, D)`.
- **Invariants:**
  - Inner dimension $K$ must match between basis count and coefficient width.
  - Linear superposition: $f(\\alpha \\mathbf{c}_1 + \\beta \\mathbf{c}_2) = \\alpha f(\\mathbf{c}_1) + \\beta f(\\mathbf{c}_2)$.

##### 3. Starter Code
```python
import numpy as np

def batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:
    \"\"\"
    Compute batch linear combinations of basis vectors.
    
    Parameters
    ----------
    basis_vectors : np.ndarray
        Array of shape (K, D) where row k is vector v_k
    coefficients : np.ndarray
        Array of shape (B, K) where row b has weights [c_1, ..., c_K]
        
    Returns
    -------
    np.ndarray
        Combined vectors of shape (B, D)
    \"\"\"
    # TODO: Implement vectorized batch combination without Python loops
    pass
```

##### 4. Vectorized Reference Solution
```python
import numpy as np

def batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:
    return coefficients @ basis_vectors
```

##### 5. Verification & Test Cases
###### Public Tests
- Standard 2D Cartesian basis `basis = [[1, 0], [0, 1]]`, weights `coeffs = [[2, 3], [-1, 4]]` $\\to$ Expected: `[[2, 3], [-1, 4]]`.
- Single vector batch `B=1`.

###### Hidden Tests (Edge Cases & Stress Tests)
- **High-Dimensional Basis:** $K=50$ basis vectors in $\\mathbb{R}^{100}$ combined across $B=500$ observations.
- **Zero Weight Sparsity:** Sparse coefficient matrix where only one weight is active, recovering exact basis rows.

###### Executable Assertion Suite
```python
import numpy as np

# Public identity basis test
basis_pub = np.array([[1.0, 0.0], [0.0, 1.0]])
coeffs_pub = np.array([[2.0, 3.0], [-1.0, 4.0]])
np.testing.assert_allclose(batch_linear_combination(basis_pub, coeffs_pub), np.array([[2.0, 3.0], [-1.0, 4.0]]), rtol=1e-5, atol=1e-7)

# Hidden 3D test
basis_hid = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0]])
coeffs_hid = np.array([[1.0, 0.0, 0.0], [0.0, 2.0, -1.0]])
np.testing.assert_allclose(batch_linear_combination(basis_hid, coeffs_hid), np.array([[1.0, 2.0, 3.0], [1.0, 2.0, 3.0]]), rtol=1e-5, atol=1e-7)

# Superposition test
rng = np.random.RandomState(42)
B, K, D = 100, 10, 20
basis_rnd = rng.randn(K, D)
c1 = rng.randn(B, K)
c2 = rng.randn(B, K)
y_sum = batch_linear_combination(basis_rnd, c1 + c2)
y_ind = batch_linear_combination(basis_rnd, c1) + batch_linear_combination(basis_rnd, c2)
np.testing.assert_allclose(y_sum, y_ind, rtol=1e-5, atol=1e-7)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 40 ms (Observed: 1.8 ms via BLAS dgemm).
- **Heap Memory Limit:** < 10 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(B \\cdot K \\cdot D)$, Space $\\mathcal{O}(B \\cdot D)$.
- **Vectorization Verification:** Single `@` matrix operator calling optimized LAPACK/BLAS GEMM.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** `ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0` or inverted shape `(D, B)`.
- **Where (Location):** Matrix product order: `basis_vectors @ coefficients`.
- **Why (Root Cause):** Dimension mismatch: `basis_vectors` is `(K, D)` and `coefficients` is `(B, K)`. Multiplying `(K, D) @ (B, K)` is invalid because $D \\ne B$.
- **How (Vectorized Fix):** Multiply in correct algebraic order: `coefficients @ basis_vectors` with shapes `(B, K) @ (K, D) -> (B, D)`.

---

#### Lesson `math-05`: The Dot Product & Geometric Projection Duality
- **Module:** `MOD-02` (Vector Algebra & Geometric Products)
- **Challenge ID:** `py-dot-product-proj`
- **Estimated Runtime:** < 30 ms (Pyodide WASM) | **Memory:** < 5 MB

##### 1. Concept & Mathematical Anchor
The dot product bridges algebra and geometry. The algebraic sum of component products is identical to the geometric shadow projection multiplied by base length:

$$\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^D u_i v_i = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\cos(\\theta)$$

The orthogonal projection of $\\mathbf{v}$ onto the subspace spanned by $\\mathbf{u}$ drops a perpendicular light beam onto $\\mathbf{u}$:

$$\\text{proj}_{\\mathbf{u}}(\\mathbf{v}) = \\left( \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2^2} \\right) \\mathbf{u}$$

The residual vector $\\mathbf{e} = \\mathbf{v} - \\text{proj}_{\\mathbf{u}}(\\mathbf{v})$ is strictly orthogonal to $\\mathbf{u}$, forming the exact foundation of OLS regression and Gram-Schmidt orthogonalization.

##### 2. Specifications & Typing
- **Function Signature:** `def vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]`
- **Input Parameters:**
  - `u` (`np.ndarray`): Target non-zero vector in $\\mathbb{R}^D$, shape `(D,)`.
  - `v` (`np.ndarray`): Projected vector in $\\mathbb{R}^D$, shape `(D,)`.
- **Return Value:**
  - `proj_v` (`np.ndarray`): Projected vector along $\\mathbf{u}$ in $\\mathbb{R}^D$, shape `(D,)`.
  - `angle_rad` (`float`): Subtended angle $\\theta \\in [0, \\pi]$ in radians.
- **Constraints & Edge Invariants:**
  - Orthogonality invariant: $(\\mathbf{v} - \\text{proj}_{\\mathbf{u}}(\\mathbf{v})) \\cdot \\mathbf{u} = 0$.
  - Numerical safety: $\\cos(\\theta)$ must be clipped to $[-1.0, 1.0]$ before computing $\\arccos$ to avoid NaN from floating-point roundoff.

##### 3. Starter Code
```python
import numpy as np

def vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:
    \"\"\"
    Compute orthogonal projection of v onto u, and the angle between them.
    
    Parameters
    ----------
    u : np.ndarray
        Direction vector of shape (D,), ||u|| > 0
    v : np.ndarray
        Vector to project, shape (D,)
        
    Returns
    -------
    tuple[np.ndarray, float]
        proj: Orthogonal projection vector of shape (D,)
        angle: Angle theta between u and v in radians [0, pi]
    \"\"\"
    # TODO: Implement projection and clipped arccos calculation
    pass
```

##### 4. Vectorized Reference Solution
```python
import numpy as np

def vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:
    dot = float(np.dot(u, v))
    u_norm_sq = float(np.dot(u, u))
    proj = (dot / u_norm_sq) * u
    cos_theta = np.clip(dot / (np.sqrt(u_norm_sq) * float(np.linalg.norm(v))), -1.0, 1.0)
    angle = float(np.arccos(cos_theta))
    return proj, angle
```

##### 5. Verification & Test Cases
###### Public Tests
- `u = [2.0, 0.0], v = [2.0, 2.0]` $\\to$ Expected `proj = [2.0, 0.0]`, `angle = pi / 4` (0.785398 rad).
- Orthogonal vectors: `u = [1.0, 0.0], v = [0.0, 5.0]` $\\to$ `proj = [0.0, 0.0]`, `angle = pi / 2`.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Opposite Vectors:** Parallel vectors pointing in opposite directions $\\theta = \\pi$.
- **Orthogonality of Residual:** Verify residual $(\\mathbf{v} - \\text{proj}_{\\mathbf{u}}(\\mathbf{v})) \\cdot \\mathbf{u} < 10^{-12}$.
- **High-Dimensional $\\mathbb{R}^{100}$ vectors.**

###### Executable Assertion Suite
```python
import numpy as np

# Public assertion
u_p = np.array([2.0, 0.0])
v_p = np.array([2.0, 2.0])
proj_p, theta_p = vector_projection_and_angle(u_p, v_p)
np.testing.assert_allclose(proj_p, np.array([2.0, 0.0]), rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(theta_p, np.pi / 4.0, rtol=1e-5, atol=1e-7)

# Hidden orthogonal assertion
u_h = np.array([0.0, 5.0, 0.0])
v_h = np.array([3.0, 0.0, 4.0])
proj_h, theta_h = vector_projection_and_angle(u_h, v_h)
np.testing.assert_allclose(proj_h, np.array([0.0, 0.0, 0.0]), rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(theta_h, np.pi / 2.0, rtol=1e-5, atol=1e-7)

# Orthogonal residual test in R^50
rng = np.random.RandomState(42)
u_rnd = rng.randn(50)
v_rnd = rng.randn(50)
proj_rnd, _ = vector_projection_and_angle(u_rnd, v_rnd)
residual = v_rnd - proj_rnd
np.testing.assert_allclose(np.dot(residual, u_rnd), 0.0, atol=1e-10)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 30 ms (Observed: 0.8 ms).
- **Heap Memory Limit:** < 5 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(D)$, Space $\\mathcal{O}(D)$.
- **Vectorization Verification:** Pure scalar dot products and vector scaling.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** `ValueError: np.arccos encountered NaN` or projection length differs by factor of $\\|\\mathbf{u}\\|$.
- **Where (Location):** Projection formula denominator $\\|\\mathbf{u}\\|^2$ vs $\\|\\mathbf{u}\\|$.
- **Why (Root Cause):** Projecting onto $\\mathbf{u}$ requires dividing by $\\|\\mathbf{u}\\|^2$ (not $\\|\\mathbf{u}\\|$). Furthermore, floating-point roundoff can yield $\\cos(\\theta) = 1.0000000000000002$, causing `np.arccos` to return `NaN`.
- **How (Vectorized Fix):** Divide by `np.dot(u, u)` and apply `np.clip(cos_theta, -1.0, 1.0)`.

---

#### Lesson `math-06`: The Cross Product & 3D Parallelogram Area
- **Module:** `MOD-02` (Vector Algebra & Geometric Products)
- **Challenge ID:** `py-cross-product-area`
- **Estimated Runtime:** < 40 ms (Pyodide WASM) | **Memory:** < 5 MB

##### 1. Concept & Mathematical Anchor
The cross product $\\mathbf{a} \\times \\mathbf{b}$ exists in $\\mathbb{R}^3$ and produces a vector perpendicular to both $\\mathbf{a}$ and $\\mathbf{b}$ obeying the right-hand rule. Its Euclidean norm geometrically equals the area of the parallelogram spanned by the two vectors:

$$\\mathbf{a} \\times \\mathbf{b} = \\begin{bmatrix} a_2 b_3 - a_3 b_2 \\\\ a_3 b_1 - a_1 b_3 \\\\ a_1 b_2 - a_2 b_1 \\end{bmatrix}, \\quad \\text{Area} = \\|\\mathbf{a} \\times \\mathbf{b}\\|_2 = \\|\\mathbf{a}\\| \\|\\mathbf{b}\\| \\sin(\\theta)$$

The cross product is anti-commutative ($\mathbf{a} \\times \\mathbf{b} = -(\\mathbf{b} \\times \\mathbf{a})$), and vanishes ($\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0}$) if and only if $\\mathbf{a}$ and $\\mathbf{b}$ are collinear.

##### 2. Specifications & Typing
- **Function Signature:** `def batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]`
- **Input Parameters:**
  - `a` (`np.ndarray`): Array of 3D vectors of shape `(..., 3)`.
  - `b` (`np.ndarray`): Array of 3D vectors of shape `(..., 3)`.
- **Return Value:**
  - `cross` (`np.ndarray`): Vector cross products of shape `(..., 3)`.
  - `area` (`np.ndarray`): Parallelogram areas of shape `(...)` reduced along axis `-1`.
- **Invariants:**
  - Strict orthogonality: $(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{a} = 0$ and $(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{b} = 0$.
  - Area is non-negative and zero for parallel vectors.

##### 3. Starter Code
```python
import numpy as np

def batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    \"\"\"
    Compute batch 3D cross products and corresponding parallelogram areas.
    
    Parameters
    ----------
    a : np.ndarray
        Array of 3D vectors of shape (..., 3)
    b : np.ndarray
        Array of 3D vectors of shape (..., 3)
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        cross: Array of cross products of shape (..., 3)
        area: Array of parallelogram areas of shape (...)
    \"\"\"
    # TODO: Implement vectorized 3D cross product and norm reduction
    pass
```

##### 4. Vectorized Reference Solution
```python
import numpy as np

def batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    cross = np.cross(a, b)
    area = np.linalg.norm(cross, axis=-1)
    return cross, area
```

##### 5. Verification & Test Cases
###### Public Tests
- Unit basis vectors `a = [[1, 0, 0]], b = [[0, 1, 0]]` $\\to$ `cross = [[0, 0, 1]]`, `area = [1.0]`.
- Anti-parallel vectors: area equals `0.0`.

###### Hidden Tests (Edge Cases & Stress Tests)
- **Collinear vectors:** $a = [1, 2, 3], b = [2, 4, 6] \\implies area = 0.0$.
- **Batch Evaluation:** Batch of $N=500$ vector pairs verified for simultaneous perpendicularity $(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{a} = 0$.

###### Executable Assertion Suite
```python
import numpy as np

# Public unit test
a_p = np.array([[1.0, 0.0, 0.0]])
b_p = np.array([[0.0, 1.0, 0.0]])
c_p, area_p = batch_cross_product_and_area(a_p, b_p)
np.testing.assert_allclose(c_p, np.array([[0.0, 0.0, 1.0]]), rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(area_p, np.array([1.0]), rtol=1e-5, atol=1e-7)

# Hidden parallel vector test
a_h = np.array([[2.0, 0.0, 0.0], [1.0, 2.0, 3.0]])
b_h = np.array([[0.0, 3.0, 0.0], [2.0, 4.0, 6.0]])
c_h, area_h = batch_cross_product_and_area(a_h, b_h)
np.testing.assert_allclose(c_h[0], np.array([0.0, 0.0, 6.0]), rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(area_h[0], 6.0, rtol=1e-5, atol=1e-7)
np.testing.assert_allclose(area_h[1], 0.0, rtol=1e-5, atol=1e-7)

# Perpendicularity invariant check across random batch
rng = np.random.RandomState(42)
a_rnd = rng.randn(100, 3)
b_rnd = rng.randn(100, 3)
cross_rnd, _ = batch_cross_product_and_area(a_rnd, b_rnd)
dots_a = np.sum(cross_rnd * a_rnd, axis=-1)
dots_b = np.sum(cross_rnd * b_rnd, axis=-1)
np.testing.assert_allclose(dots_a, np.zeros(100), atol=1e-10)
np.testing.assert_allclose(dots_b, np.zeros(100), atol=1e-10)
```

##### 6. Execution Budget & Performance Profile
- **WASM Wall-Clock Budget:** < 40 ms (Observed: 1.4 ms for $N=10^4$).
- **Heap Memory Limit:** < 5 MB.
- **Algorithmic Complexity:** Time $\\mathcal{O}(N)$, Space $\\mathcal{O}(N)$.
- **Vectorization Verification:** SIMD vector cross evaluation via `np.cross`.

##### 7. 4-Part Student Diagnostic Hints
- **What (Symptom):** `ValueError: cross: operands must have last dimension 3` or missing area batch dimension.
- **Where (Location):** Dimension reduction in `np.linalg.norm(cross)`.
- **Why (Root Cause):** Calling `np.linalg.norm(cross)` without `axis=-1` calculates the Frobenius norm across the entire tensor instead of row-wise vector norms.
- **How (Vectorized Fix):** Specify `axis=-1`: `np.linalg.norm(cross, axis=-1)` to reduce only the 3-element coordinate dimension.
"""
