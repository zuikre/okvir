#!/usr/bin/env python3
"""
Master specification builder and test runner for Track 1 Code Challenges.
"""
import os
import sys
import time
import numpy as np

def run_all_tests():
    print("=" * 70)
    print("RUNNING ALL 29 TRACK 1 REFERENCE IMPLEMENTATIONS & ASSERTIONS")
    print("=" * 70)
    
    # -------------------------------------------------------------
    # LESSON 1: py-cartesian-metric
    # -------------------------------------------------------------
    def euclidean_distance(p: np.ndarray, q: np.ndarray) -> np.ndarray:
        return np.sqrt(np.sum((p - q) ** 2, axis=-1))

    # Public tests
    np.testing.assert_allclose(euclidean_distance(np.array([1.0, 2.0]), np.array([4.0, 6.0])), 5.0, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(euclidean_distance(np.zeros(3), np.zeros(3)), 0.0, rtol=1e-5, atol=1e-7)
    # Hidden tests
    p_batch = np.array([[0.0, 0.0, 0.0], [1.0, 1.0, 1.0], [3.0, 4.0, 0.0]])
    q_batch = np.array([[1.0, 2.0, 2.0], [1.0, 1.0, 1.0], [0.0, 0.0, 0.0]])
    np.testing.assert_allclose(euclidean_distance(p_batch, q_batch), np.array([3.0, 0.0, 5.0]), rtol=1e-5, atol=1e-7)
    print("Lesson 01 (py-cartesian-metric): PASSED")

    # -------------------------------------------------------------
    # LESSON 2: py-slope-finite-diff
    # -------------------------------------------------------------
    def central_difference_stencil(y: np.ndarray, dx: float) -> np.ndarray:
        return (y[2:] - y[:-2]) / (2.0 * dx)

    # Public tests
    x_pub = np.linspace(0, 2 * np.pi, 100)
    dx_pub = float(x_pub[1] - x_pub[0])
    y_pub = np.sin(x_pub)
    expected_pub = np.cos(x_pub[1:-1])
    np.testing.assert_allclose(central_difference_stencil(y_pub, dx_pub), expected_pub, rtol=1e-3, atol=1e-3)
    # Hidden tests (cubic polynomial f(x) = x^3, f'(x) = 3x^2)
    x_hid = np.linspace(-2.0, 2.0, 50)
    dx_hid = float(x_hid[1] - x_hid[0])
    y_hid = x_hid ** 3
    expected_hid = 3.0 * (x_hid[1:-1] ** 2)
    # truncation error for central diff of cubic is O(dx^2)
    np.testing.assert_allclose(central_difference_stencil(y_hid, dx_hid), expected_hid, rtol=1e-2, atol=1e-2)
    print("Lesson 02 (py-slope-finite-diff): PASSED")

    # -------------------------------------------------------------
    # LESSON 3: py-vec-magnitude
    # -------------------------------------------------------------
    def vector_lp_norm(v: np.ndarray, p: float) -> np.ndarray:
        if np.isinf(p):
            return np.max(np.abs(v), axis=-1)
        return np.sum(np.abs(v) ** p, axis=-1) ** (1.0 / p)

    # Public tests
    v_pub = np.array([3.0, -4.0])
    np.testing.assert_allclose(vector_lp_norm(v_pub, 1.0), 7.0, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(vector_lp_norm(v_pub, 2.0), 5.0, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(vector_lp_norm(v_pub, np.inf), 4.0, rtol=1e-5, atol=1e-7)
    # Hidden tests
    v_batch = np.array([[1.0, 2.0, 2.0], [0.0, 0.0, 0.0], [-10.0, 5.0, 2.0]])
    np.testing.assert_allclose(vector_lp_norm(v_batch, 2.0), np.array([3.0, 0.0, np.sqrt(129.0)]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(vector_lp_norm(v_batch, np.inf), np.array([2.0, 0.0, 10.0]), rtol=1e-5, atol=1e-7)
    print("Lesson 03 (py-vec-magnitude): PASSED")

    # -------------------------------------------------------------
    # LESSON 4: py-linear-combination
    # -------------------------------------------------------------
    def batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:
        return coefficients @ basis_vectors

    # Public tests
    basis_pub = np.array([[1.0, 0.0], [0.0, 1.0]])
    coeffs_pub = np.array([[2.0, 3.0], [-1.0, 4.0]])
    np.testing.assert_allclose(batch_linear_combination(basis_pub, coeffs_pub), np.array([[2.0, 3.0], [-1.0, 4.0]]), rtol=1e-5, atol=1e-7)
    # Hidden tests
    basis_hid = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0]])
    coeffs_hid = np.array([[1.0, 0.0, 0.0], [0.0, 2.0, -1.0]])
    np.testing.assert_allclose(batch_linear_combination(basis_hid, coeffs_hid), np.array([[1.0, 2.0, 3.0], [1.0, 2.0, 3.0]]), rtol=1e-5, atol=1e-7)
    print("Lesson 04 (py-linear-combination): PASSED")

    # -------------------------------------------------------------
    # LESSON 5: py-dot-product-proj
    # -------------------------------------------------------------
    def vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:
        dot = float(np.dot(u, v))
        u_norm_sq = float(np.dot(u, u))
        proj = (dot / u_norm_sq) * u
        cos_theta = np.clip(dot / (np.sqrt(u_norm_sq) * float(np.linalg.norm(v))), -1.0, 1.0)
        angle = float(np.arccos(cos_theta))
        return proj, angle

    # Public tests
    u_p = np.array([2.0, 0.0])
    v_p = np.array([2.0, 2.0])
    proj_p, theta_p = vector_projection_and_angle(u_p, v_p)
    np.testing.assert_allclose(proj_p, np.array([2.0, 0.0]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(theta_p, np.pi / 4.0, rtol=1e-5, atol=1e-7)
    # Hidden tests (orthogonal vectors)
    u_h = np.array([0.0, 5.0, 0.0])
    v_h = np.array([3.0, 0.0, 4.0])
    proj_h, theta_h = vector_projection_and_angle(u_h, v_h)
    np.testing.assert_allclose(proj_h, np.array([0.0, 0.0, 0.0]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(theta_h, np.pi / 2.0, rtol=1e-5, atol=1e-7)
    print("Lesson 05 (py-dot-product-proj): PASSED")

    # -------------------------------------------------------------
    # LESSON 6: py-cross-product-area
    # -------------------------------------------------------------
    def batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
        cross = np.cross(a, b)
        area = np.linalg.norm(cross, axis=-1)
        return cross, area

    # Public tests
    a_p = np.array([[1.0, 0.0, 0.0]])
    b_p = np.array([[0.0, 1.0, 0.0]])
    c_p, area_p = batch_cross_product_and_area(a_p, b_p)
    np.testing.assert_allclose(c_p, np.array([[0.0, 0.0, 1.0]]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(area_p, np.array([1.0]), rtol=1e-5, atol=1e-7)
    # Hidden tests
    a_h = np.array([[2.0, 0.0, 0.0], [1.0, 2.0, 3.0]])
    b_h = np.array([[0.0, 3.0, 0.0], [2.0, 4.0, 6.0]]) # parallel second pair
    c_h, area_h = batch_cross_product_and_area(a_h, b_h)
    np.testing.assert_allclose(c_h[0], np.array([0.0, 0.0, 6.0]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(area_h[0], 6.0, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(area_h[1], 0.0, rtol=1e-5, atol=1e-7)
    print("Lesson 06 (py-cross-product-area): PASSED")

    # -------------------------------------------------------------
    # LESSON 7: py-linear-map-matrix
    # -------------------------------------------------------------
    def apply_linear_transform(matrix: np.ndarray, points: np.ndarray) -> np.ndarray:
        return points @ matrix.T

    # Public tests
    rot90 = np.array([[0.0, -1.0], [1.0, 0.0]])
    pts_p = np.array([[1.0, 0.0], [0.0, 1.0]])
    np.testing.assert_allclose(apply_linear_transform(rot90, pts_p), np.array([[0.0, 1.0], [-1.0, 0.0]]), rtol=1e-5, atol=1e-7)
    # Hidden tests
    M_proj = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]]) # 2x3 projection
    pts_3d = np.array([[5.0, 6.0, 7.0], [1.0, 2.0, 3.0]])
    np.testing.assert_allclose(apply_linear_transform(M_proj, pts_3d), np.array([[5.0, 6.0], [1.0, 2.0]]), rtol=1e-5, atol=1e-7)
    print("Lesson 07 (py-linear-map-matrix): PASSED")

    # -------------------------------------------------------------
    # LESSON 8: py-matrix-composition
    # -------------------------------------------------------------
    def compose_2d_affine_transform(angle_rad: float, scale: tuple[float, float], translation: tuple[float, float]) -> np.ndarray:
        c, s = np.cos(angle_rad), np.sin(angle_rad)
        sx, sy = scale
        tx, ty = translation
        T = np.array([[1.0, 0.0, tx], [0.0, 1.0, ty], [0.0, 0.0, 1.0]])
        R = np.array([[c, -s, 0.0], [s, c, 0.0], [0.0, 0.0, 1.0]])
        S = np.array([[sx, 0.0, 0.0], [0.0, sy, 0.0], [0.0, 0.0, 1.0]])
        return T @ R @ S

    # Public tests
    M_id = compose_2d_affine_transform(0.0, (1.0, 1.0), (0.0, 0.0))
    np.testing.assert_allclose(M_id, np.eye(3), rtol=1e-5, atol=1e-7)
    # Hidden tests
    M_test = compose_2d_affine_transform(np.pi / 2.0, (2.0, 3.0), (4.0, 5.0))
    p_hom = np.array([1.0, 1.0, 1.0]) # scaled -> (2, 3), rotated -> (-3, 2), translated -> (1, 7)
    np.testing.assert_allclose(M_test @ p_hom, np.array([1.0, 7.0, 1.0]), rtol=1e-5, atol=1e-7)
    print("Lesson 08 (py-matrix-composition): PASSED")

    # -------------------------------------------------------------
    # LESSON 9: py-determinant-volume
    # -------------------------------------------------------------
    def volume_scaling_factor(matrix: np.ndarray) -> tuple[float, int, bool]:
        det = float(np.linalg.det(matrix))
        scale = abs(det)
        if det > 1e-12:
            parity = 1
        elif det < -1e-12:
            parity = -1
        else:
            parity = 0
        is_invertible = scale > 1e-12
        return scale, parity, is_invertible

    # Public tests
    A_p = np.array([[2.0, 0.0], [0.0, 3.0]])
    scale, parity, inv = volume_scaling_factor(A_p)
    np.testing.assert_allclose(scale, 6.0, rtol=1e-5, atol=1e-7)
    assert parity == 1 and inv is True
    # Hidden tests (reflection & singular)
    A_refl = np.array([[0.0, 1.0], [1.0, 0.0]])
    s_r, p_r, inv_r = volume_scaling_factor(A_refl)
    assert p_r == -1 and inv_r is True
    A_sing = np.array([[1.0, 2.0], [2.0, 4.0]])
    s_s, p_s, inv_s = volume_scaling_factor(A_sing)
    assert p_s == 0 and inv_s is False
    print("Lesson 09 (py-determinant-volume): PASSED")

    # -------------------------------------------------------------
    # LESSON 10: py-linear-system-solve
    # -------------------------------------------------------------
    def solve_linear_system(A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, float]:
        x = np.linalg.solve(A, b)
        residual = float(np.linalg.norm(b - A @ x))
        return x, residual

    # Public tests
    A_p = np.array([[3.0, 1.0], [1.0, 2.0]])
    b_p = np.array([9.0, 8.0])
    x_p, res_p = solve_linear_system(A_p, b_p)
    np.testing.assert_allclose(x_p, np.array([2.0, 3.0]), rtol=1e-5, atol=1e-7)
    assert res_p < 1e-7
    # Hidden tests (Hilbert matrix 3x3)
    A_h = np.array([[1.0, 1/2, 1/3], [1/2, 1/3, 1/4], [1/3, 1/4, 1/5]])
    b_h = np.array([1.0, 2.0, 3.0])
    x_h, res_h = solve_linear_system(A_h, b_h)
    assert res_h < 1e-7
    print("Lesson 10 (py-linear-system-solve): PASSED")

    # -------------------------------------------------------------
    # LESSON 11: py-subspace-basis-rank
    # -------------------------------------------------------------
    def matrix_rank_and_subspaces(A: np.ndarray, tol: float = 1e-10) -> tuple[int, np.ndarray, np.ndarray]:
        U, s, Vt = np.linalg.svd(A, full_matrices=True)
        rank = int(np.sum(s > tol))
        col_basis = U[:, :rank]
        null_basis = Vt[rank:, :].T
        return rank, col_basis, null_basis

    # Public tests
    A_p = np.array([[1.0, 2.0], [2.0, 4.0]])
    rank_p, col_p, null_p = matrix_rank_and_subspaces(A_p)
    assert rank_p == 1
    assert col_p.shape == (2, 1)
    assert null_p.shape == (2, 1)
    np.testing.assert_allclose(A_p @ null_p, np.zeros((2, 1)), atol=1e-7)
    # Hidden tests
    A_h = np.array([[1.0, 0.0, 1.0], [0.0, 1.0, 1.0], [1.0, 1.0, 2.0]])
    rank_h, col_h, null_h = matrix_rank_and_subspaces(A_h)
    assert rank_h == 2
    np.testing.assert_allclose(A_h @ null_h, np.zeros((3, 1)), atol=1e-7)
    print("Lesson 11 (py-subspace-basis-rank): PASSED")

    # -------------------------------------------------------------
    # LESSON 12: py-orthogonal-projection
    # -------------------------------------------------------------
    def subspace_projection_matrix(A: np.ndarray) -> np.ndarray:
        Q, _ = np.linalg.qr(A)
        return Q @ Q.T

    # Public tests
    A_p = np.array([[1.0], [0.0]])
    P_p = subspace_projection_matrix(A_p)
    np.testing.assert_allclose(P_p, np.array([[1.0, 0.0], [0.0, 0.0]]), rtol=1e-5, atol=1e-7)
    # Hidden tests (Idempotency and Symmetry check)
    A_h = np.array([[1.0, 0.0], [1.0, 1.0], [0.0, 1.0]])
    P_h = subspace_projection_matrix(A_h)
    np.testing.assert_allclose(P_h @ P_h, P_h, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(P_h.T, P_h, rtol=1e-5, atol=1e-7)
    print("Lesson 12 (py-orthogonal-projection): PASSED")

    # -------------------------------------------------------------
    # LESSON 13: py-eigenpairs-power-iteration
    # -------------------------------------------------------------
    def power_iteration(A: np.ndarray, max_iter: int = 300, tol: float = 1e-9) -> tuple[float, np.ndarray]:
        n = A.shape[0]
        v = np.ones(n) / np.sqrt(n)
        lam = 0.0
        for _ in range(max_iter):
            w = A @ v
            norm_w = np.linalg.norm(w)
            if norm_w < 1e-14:
                break
            v_next = w / norm_w
            # Check vector convergence (accounting for sign ambiguity)
            diff = min(np.linalg.norm(v_next - v), np.linalg.norm(v_next + v))
            v = v_next
            if diff < tol:
                break
        lam = float(v.T @ A @ v)
        return lam, v

    # Public tests
    A_p = np.array([[2.0, 0.0], [0.0, 1.0]])
    lam_p, v_p = power_iteration(A_p)
    np.testing.assert_allclose(lam_p, 2.0, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(np.abs(v_p), np.array([1.0, 0.0]), rtol=1e-5, atol=1e-7)
    # Hidden tests
    A_h = np.array([[4.0, 1.0], [1.0, 3.0]])
    lam_h, v_h = power_iteration(A_h)
    true_evals = np.linalg.eigvalsh(A_h)
    np.testing.assert_allclose(lam_h, np.max(true_evals), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(A_h @ v_h, lam_h * v_h, rtol=1e-5, atol=1e-7)
    print("Lesson 13 (py-eigenpairs-power-iteration): PASSED")

    # -------------------------------------------------------------
    # LESSON 14: py-spectral-decomposition
    # -------------------------------------------------------------
    def symmetric_spectral_reconstruction(A: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        w, v = np.linalg.eigh(A)
        idx = np.argsort(np.abs(w))[::-1]
        w_sorted = w[idx]
        v_sorted = v[:, idx]
        A_k = v_sorted[:, :k] @ np.diag(w_sorted[:k]) @ v_sorted[:, :k].T
        return w_sorted, v_sorted, A_k

    # Public tests
    A_p = np.array([[3.0, 1.0], [1.0, 3.0]])
    w_p, v_p, A_full = symmetric_spectral_reconstruction(A_p, 2)
    np.testing.assert_allclose(A_full, A_p, rtol=1e-5, atol=1e-7)
    # Hidden tests (Rank 1 approx error)
    w_h, v_h, A_1 = symmetric_spectral_reconstruction(A_p, 1)
    np.testing.assert_allclose(w_h, np.array([4.0, 2.0]), rtol=1e-5, atol=1e-7)
    assert np.linalg.matrix_rank(A_1) == 1
    print("Lesson 14 (py-spectral-decomposition): PASSED")

    # -------------------------------------------------------------
    # LESSON 15: py-svd-reconstruct
    # -------------------------------------------------------------
    def svd_low_rank_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:
        U, s, Vt = np.linalg.svd(A, full_matrices=False)
        A_k = (U[:, :k] * s[:k]) @ Vt[:k, :]
        energy = float(np.sum(s[:k] ** 2) / np.sum(s ** 2))
        return A_k, energy

    # Public tests
    A_p = np.array([[1.0, 0.0], [0.0, 2.0]])
    A_k_p, energy_p = svd_low_rank_approx(A_p, 1)
    np.testing.assert_allclose(A_k_p, np.array([[0.0, 0.0], [0.0, 2.0]]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(energy_p, 4.0 / 5.0, rtol=1e-5, atol=1e-7)
    # Hidden tests
    A_h = np.random.RandomState(42).randn(10, 8)
    A_h_k, en_h = svd_low_rank_approx(A_h, 8)
    np.testing.assert_allclose(A_h_k, A_h, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(en_h, 1.0, rtol=1e-5, atol=1e-7)
    print("Lesson 15 (py-svd-reconstruct): PASSED")

    # -------------------------------------------------------------
    # LESSON 16: py-limit-difference-quotient
    # -------------------------------------------------------------
    def richardson_extrapolated_derivative(f, x: float, h: float = 0.1) -> float:
        d1 = (f(x + h) - f(x - h)) / (2.0 * h)
        d2 = (f(x + h / 2.0) - f(x - h / 2.0)) / h
        return float((4.0 * d2 - d1) / 3.0)

    # Public tests
    np.testing.assert_allclose(richardson_extrapolated_derivative(np.sin, 0.0, 0.1), 1.0, rtol=1e-5, atol=1e-7)
    # Hidden tests
    np.testing.assert_allclose(richardson_extrapolated_derivative(np.exp, 1.0, 0.05), np.e, rtol=1e-5, atol=1e-7)
    print("Lesson 16 (py-limit-difference-quotient): PASSED")

    # -------------------------------------------------------------
    # LESSON 17: py-tangent-linear-approx
    # -------------------------------------------------------------
    def linear_approximation_eval(f, df, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
        L = f(x0) + df(x0) * (query_points - x0)
        errors = np.abs(f(query_points) - L)
        return L, errors

    # Public tests
    pts_p = np.array([0.0, 0.1, 0.5])
    L_p, err_p = linear_approximation_eval(np.exp, np.exp, 0.0, pts_p)
    np.testing.assert_allclose(L_p, 1.0 + pts_p, rtol=1e-5, atol=1e-7)
    assert err_p[0] == 0.0
    # Hidden tests
    pts_h = np.linspace(0.9, 1.1, 21)
    f_h = lambda x: x ** 2
    df_h = lambda x: 2.0 * x
    L_h, err_h = linear_approximation_eval(f_h, df_h, 1.0, pts_h)
    expected_err = (pts_h - 1.0) ** 2
    np.testing.assert_allclose(err_h, expected_err, rtol=1e-5, atol=1e-7)
    print("Lesson 17 (py-tangent-linear-approx): PASSED")

    # -------------------------------------------------------------
    # LESSON 18: py-chain-rule-composite
    # -------------------------------------------------------------
    def composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:
        # z1 = u * x + b1
        # a1 = tanh(z1)
        # z2 = w * a1 + b2
        # y = sigmoid(z2)
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

    # Public tests
    x_p = np.array([0.0])
    y_p, dy_p = composite_chain_rule(x_p, 1.0, 1.0, 0.0, 0.0)
    np.testing.assert_allclose(y_p, np.array([0.5]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(dy_p, np.array([0.25]), rtol=1e-5, atol=1e-7)
    # Hidden tests (finite diff verification)
    x_h = np.array([-1.5, 0.5, 2.0])
    y_h, dy_h = composite_chain_rule(x_h, 2.0, 0.5, 0.1, -0.3)
    eps = 1e-6
    y_plus, _ = composite_chain_rule(x_h + eps, 2.0, 0.5, 0.1, -0.3)
    y_minus, _ = composite_chain_rule(x_h - eps, 2.0, 0.5, 0.1, -0.3)
    dy_num = (y_plus - y_minus) / (2.0 * eps)
    np.testing.assert_allclose(dy_h, dy_num, rtol=1e-4, atol=1e-5)
    print("Lesson 18 (py-chain-rule-composite): PASSED")

    # -------------------------------------------------------------
    # LESSON 19: py-second-derivative-curvature
    # -------------------------------------------------------------
    def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:
        dy = (y[2:] - y[:-2]) / (2.0 * dx)
        d2y = (y[2:] - 2.0 * y[1:-1] + y[:-2]) / (dx ** 2)
        curvature = np.abs(d2y) / ((1.0 + dy ** 2) ** 1.5)
        return d2y, curvature

    # Public tests (circle y = sqrt(R^2 - x^2), curvature = 1/R at apex x=0)
    R = 5.0
    x_circ = np.linspace(-1.0, 1.0, 101)
    dx_circ = float(x_circ[1] - x_circ[0])
    y_circ = np.sqrt(R ** 2 - x_circ ** 2)
    d2y, kappa = curve_curvature(y_circ, dx_circ)
    mid = len(kappa) // 2
    np.testing.assert_allclose(kappa[mid], 1.0 / R, rtol=1e-2, atol=1e-3)
    # Hidden tests (straight line has zero curvature)
    y_line = 3.0 * x_circ + 2.0
    d2y_line, kappa_line = curve_curvature(y_line, dx_circ)
    np.testing.assert_allclose(kappa_line, np.zeros_like(kappa_line), atol=1e-7)
    print("Lesson 19 (py-second-derivative-curvature): PASSED")

    # -------------------------------------------------------------
    # LESSON 20: py-taylor-polynomial
    # -------------------------------------------------------------
    def taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:
        # coeffs[k] is f^{(k)}(a)
        k = np.arange(len(coeffs))
        factorials = np.ones(len(coeffs), dtype=float)
        if len(coeffs) > 1:
            factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))
        norm_coeffs = coeffs / factorials
        powers = (x[:, None] - a) ** k[None, :]
        return np.sum(powers * norm_coeffs[None, :], axis=1)

    # Public tests (exp(x) at a=0, x=0.5, order 3)
    coeffs_exp = np.ones(4) # [1, 1, 1, 1]
    res_p = taylor_polynomial_series(coeffs_exp, 0.0, np.array([0.0, 0.5]))
    expected_p = np.array([1.0, 1.0 + 0.5 + 0.5**2/2 + 0.5**3/6])
    np.testing.assert_allclose(res_p, expected_p, rtol=1e-5, atol=1e-7)
    # Hidden tests (cos(x) at a=0: coeffs = [1, 0, -1, 0, 1])
    coeffs_cos = np.array([1.0, 0.0, -1.0, 0.0, 1.0])
    x_test = np.linspace(-0.5, 0.5, 11)
    np.testing.assert_allclose(taylor_polynomial_series(coeffs_cos, 0.0, x_test), np.cos(x_test), rtol=1e-3, atol=1e-3)
    print("Lesson 20 (py-taylor-polynomial): PASSED")

    # -------------------------------------------------------------
    # LESSON 21: py-scalar-field-contour
    # -------------------------------------------------------------
    def scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:
        dz_dx = (Z[1:-1, 2:] - Z[1:-1, :-2]) / (2.0 * dx)
        dz_dy = (Z[2:, 1:-1] - Z[:-2, 1:-1]) / (2.0 * dy)
        return np.sqrt(dz_dx ** 2 + dz_dy ** 2)

    # Public tests (f(x, y) = 3x + 4y, grad norm = 5.0)
    x = np.linspace(0, 10, 21)
    y = np.linspace(0, 10, 21)
    dx = float(x[1] - x[0])
    dy = float(y[1] - y[0])
    X, Y = np.meshgrid(x, y)
    Z = 3.0 * X + 4.0 * Y
    grad_norm = scalar_field_gradient_magnitude(Z, dx, dy)
    np.testing.assert_allclose(grad_norm, 5.0 * np.ones_like(grad_norm), rtol=1e-5, atol=1e-7)
    # Hidden tests (f(x, y) = x^2 + y^2, grad = [2x, 2y], norm = 2*sqrt(x^2 + y^2))
    Z_quad = X ** 2 + Y ** 2
    grad_quad = scalar_field_gradient_magnitude(Z_quad, dx, dy)
    expected_quad = 2.0 * np.sqrt(X[1:-1, 1:-1] ** 2 + Y[1:-1, 1:-1] ** 2)
    np.testing.assert_allclose(grad_quad, expected_quad, rtol=1e-2, atol=1e-2)
    print("Lesson 21 (py-scalar-field-contour): PASSED")

    # -------------------------------------------------------------
    # LESSON 22: py-partial-derivatives
    # -------------------------------------------------------------
    def numerical_gradient_vector(f, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
        d = len(x0)
        E = np.eye(d) * eps
        x_plus = x0 + E
        x_minus = x0 - E
        # evaluate vectorized if f supports it, else array comprehension
        f_plus = np.array([f(x_plus[i]) for i in range(d)])
        f_minus = np.array([f(x_minus[i]) for i in range(d)])
        return (f_plus - f_minus) / (2.0 * eps)

    # Public tests
    f_pub = lambda x: x[0]**2 + 3.0*x[1]**2
    x0_pub = np.array([2.0, 1.0])
    grad_pub = numerical_gradient_vector(f_pub, x0_pub)
    np.testing.assert_allclose(grad_pub, np.array([4.0, 6.0]), rtol=1e-4, atol=1e-4)
    # Hidden tests (Rosenbrock function f(x, y) = (1-x)^2 + 100(y - x^2)^2 at (1, 1) -> grad = (0, 0))
    f_rosen = lambda x: (1.0 - x[0])**2 + 100.0 * (x[1] - x[0]**2)**2
    np.testing.assert_allclose(numerical_gradient_vector(f_rosen, np.array([1.0, 1.0])), np.array([0.0, 0.0]), atol=1e-4)
    print("Lesson 22 (py-partial-derivatives): PASSED")

    # -------------------------------------------------------------
    # LESSON 23: py-gradient-directional
    # -------------------------------------------------------------
    def directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:
        unit_u = directions / np.linalg.norm(directions, axis=-1, keepdims=True)
        d_vals = unit_u @ grad
        best_idx = int(np.argmax(d_vals))
        return d_vals, best_idx

    # Public tests
    g_p = np.array([3.0, 4.0])
    dirs_p = np.array([[1.0, 0.0], [0.0, 1.0], [3.0, 4.0]])
    d_vals, best = directional_derivatives(g_p, dirs_p)
    np.testing.assert_allclose(d_vals, np.array([3.0, 4.0, 5.0]), rtol=1e-5, atol=1e-7)
    assert best == 2
    # Hidden tests
    dirs_h = np.array([[-3.0, -4.0], [0.0, -1.0], [3.0, 4.0]])
    d_vals_h, best_h = directional_derivatives(g_p, dirs_h)
    assert best_h == 2 and d_vals_h[0] == -5.0
    print("Lesson 23 (py-gradient-directional): PASSED")

    # -------------------------------------------------------------
    # LESSON 24: py-hessian-curvature
    # -------------------------------------------------------------
    def quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:
        unit_v = directions / np.linalg.norm(directions, axis=-1, keepdims=True)
        curvatures = np.einsum('bd,de,be->b', unit_v, H, unit_v)
        evals = np.linalg.eigvalsh(H)
        if np.all(evals > 1e-10):
            topology = 'strictly_convex'
        elif np.all(evals < -1e-10):
            topology = 'strictly_concave'
        elif np.any(evals > 1e-10) and np.any(evals < -1e-10):
            topology = 'saddle'
        else:
            topology = 'degenerate'
        return curvatures, topology

    # Public tests
    H_p = np.array([[2.0, 0.0], [0.0, 6.0]])
    dirs_p = np.array([[1.0, 0.0], [0.0, 1.0]])
    curvs_p, top_p = quadratic_form_curvature(H_p, dirs_p)
    np.testing.assert_allclose(curvs_p, np.array([2.0, 6.0]), rtol=1e-5, atol=1e-7)
    assert top_p == 'strictly_convex'
    # Hidden tests (Saddle point)
    H_saddle = np.array([[3.0, 0.0], [0.0, -2.0]])
    curvs_s, top_s = quadratic_form_curvature(H_saddle, dirs_p)
    assert top_s == 'saddle'
    print("Lesson 24 (py-hessian-curvature): PASSED")

    # -------------------------------------------------------------
    # LESSON 25: py-jacobian-vector-field
    # -------------------------------------------------------------
    def numerical_jacobian(F, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
        n = len(x0)
        E = np.eye(n) * eps
        cols = []
        for j in range(n):
            f_plus = F(x0 + E[j])
            f_minus = F(x0 - E[j])
            cols.append((f_plus - f_minus) / (2.0 * eps))
        return np.column_stack(cols)

    # Public tests (polar to cartesian F(r, theta) = (r cos th, r sin th))
    F_polar = lambda x: np.array([x[0] * np.cos(x[1]), x[0] * np.sin(x[1])])
    x0_pol = np.array([2.0, 0.0])
    J_p = numerical_jacobian(F_polar, x0_pol)
    np.testing.assert_allclose(J_p, np.array([[1.0, 0.0], [0.0, 2.0]]), rtol=1e-4, atol=1e-4)
    # Hidden tests (linear mapping F(x) = A x, Jacobian is A)
    A_mat = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])
    F_lin = lambda x: A_mat @ x
    J_lin = numerical_jacobian(F_lin, np.array([10.0, -5.0]))
    np.testing.assert_allclose(J_lin, A_mat, rtol=1e-4, atol=1e-4)
    print("Lesson 25 (py-jacobian-vector-field): PASSED")

    # -------------------------------------------------------------
    # LESSON 26: py-convexity-jensen
    # -------------------------------------------------------------
    def verify_jensen_gap(f, points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:
        norm_weights = weights / np.sum(weights)
        e_x = np.sum(norm_weights[:, None] * points, axis=0)
        f_e_x = float(f(e_x))
        f_vals = np.array([float(f(p)) for p in points])
        e_f_x = float(np.sum(norm_weights * f_vals))
        gap = e_f_x - f_e_x
        return float(np.sum(e_x)), f_e_x, gap

    # Public tests (f(x) = ||x||^2 is strictly convex, gap >= 0)
    f_quad = lambda x: float(np.sum(x ** 2))
    pts_p = np.array([[0.0, 0.0], [2.0, 0.0]])
    w_p = np.array([0.5, 0.5])
    sum_ex, f_ex, gap = verify_jensen_gap(f_quad, pts_p, w_p)
    np.testing.assert_allclose(f_ex, 1.0, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(gap, 1.0, rtol=1e-5, atol=1e-7) # E[f] = 0.5(0) + 0.5(4) = 2.0, f(E) = 1.0 -> gap = 1.0
    # Hidden tests
    pts_h = np.array([[1.0], [3.0], [5.0]])
    w_h = np.array([0.2, 0.5, 0.3])
    _, _, gap_h = verify_jensen_gap(f_quad, pts_h, w_h)
    assert gap_h >= 0.0
    print("Lesson 26 (py-convexity-jensen): PASSED")

    # -------------------------------------------------------------
    # LESSON 27: py-gradient-descent-step
    # -------------------------------------------------------------
    def momentum_gradient_descent_step(x: np.ndarray, grad: np.ndarray, v: np.ndarray, lr: float, beta: float) -> tuple[np.ndarray, np.ndarray]:
        v_next = beta * v + lr * grad
        x_next = x - v_next
        return x_next, v_next

    # Public tests
    x_0 = np.array([5.0, 5.0])
    g_0 = np.array([2.0, 4.0])
    v_0 = np.array([0.0, 0.0])
    x_1, v_1 = momentum_gradient_descent_step(x_0, g_0, v_0, lr=0.1, beta=0.9)
    np.testing.assert_allclose(v_1, np.array([0.2, 0.4]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(x_1, np.array([4.8, 4.6]), rtol=1e-5, atol=1e-7)
    # Hidden tests (step 2)
    x_2, v_2 = momentum_gradient_descent_step(x_1, np.array([1.0, 1.0]), v_1, lr=0.1, beta=0.9)
    np.testing.assert_allclose(v_2, 0.9 * v_1 + 0.1 * np.array([1.0, 1.0]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(x_2, x_1 - v_2, rtol=1e-5, atol=1e-7)
    print("Lesson 27 (py-gradient-descent-step): PASSED")

    # -------------------------------------------------------------
    # LESSON 28: py-lagrange-multipliers
    # -------------------------------------------------------------
    def solve_constrained_quadratic_kkt(Q: np.ndarray, c: np.ndarray, A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
        n = Q.shape[0]
        m = A.shape[0]
        # KKT Matrix: [Q, A^T; A, 0]
        KKT = np.block([[Q, A.T], [A, np.zeros((m, m))]])
        rhs = np.concatenate([-c, b])
        sol = np.linalg.solve(KKT, rhs)
        x_star = sol[:n]
        lambda_star = sol[n:]
        return x_star, lambda_star

    # Public tests (min 0.5(x1^2 + x2^2) s.t. x1 + x2 = 2 -> x* = (1, 1))
    Q_p = np.eye(2)
    c_p = np.zeros(2)
    A_p = np.array([[1.0, 1.0]])
    b_p = np.array([2.0])
    x_star, lam_star = solve_constrained_quadratic_kkt(Q_p, c_p, A_p, b_p)
    np.testing.assert_allclose(x_star, np.array([1.0, 1.0]), rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(lam_star, np.array([-1.0]), rtol=1e-5, atol=1e-7)
    # Hidden tests
    Q_h = np.diag([2.0, 4.0])
    c_h = np.array([0.0, 0.0])
    A_h = np.array([[1.0, 2.0]])
    b_h = np.array([3.0])
    x_h, lam_h = solve_constrained_quadratic_kkt(Q_h, c_h, A_h, b_h)
    np.testing.assert_allclose(A_h @ x_h, b_h, rtol=1e-5, atol=1e-7)
    np.testing.assert_allclose(Q_h @ x_h + A_h.T @ lam_h, -c_h, rtol=1e-5, atol=1e-7)
    print("Lesson 28 (py-lagrange-multipliers): PASSED")

    # -------------------------------------------------------------
    # LESSON 29: py-clt-sample-mean
    # -------------------------------------------------------------
    def standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:
        sample_means = np.mean(samples, axis=1)
        n = samples.shape[1]
        z_scores = (sample_means - true_mean) / (true_std / np.sqrt(n))
        return z_scores

    # Public tests
    samples_p = np.array([[1.0, 3.0], [2.0, 4.0]]) # n = 2
    z_p = standardized_sample_means(samples_p, true_mean=2.0, true_std=1.0)
    # means are 2.0 and 3.0 -> z = (2 - 2)/(1/sqrt(2)) = 0.0; (3 - 2)/(1/sqrt(2)) = sqrt(2)
    np.testing.assert_allclose(z_p, np.array([0.0, np.sqrt(2.0)]), rtol=1e-5, atol=1e-7)
    # Hidden tests (Monte Carlo 500 experiments of 100 samples from Uniform(0, 1))
    rng = np.random.RandomState(42)
    samples_mc = rng.uniform(0, 1, size=(500, 100))
    mu_unif = 0.5
    sigma_unif = np.sqrt(1.0 / 12.0)
    z_mc = standardized_sample_means(samples_mc, mu_unif, sigma_unif)
    assert len(z_mc) == 500
    np.testing.assert_allclose(np.mean(z_mc), 0.0, atol=0.15)
    np.testing.assert_allclose(np.var(z_mc), 1.0, atol=0.20)
    print("Lesson 29 (py-clt-sample-mean): PASSED")

    print("=" * 70)
    print("ALL 29 CHALLENGES PASSED STRICT NUMERICAL ASSERTIONS WITH 100% SUCCESS!")
    print("=" * 70)

if __name__ == '__main__':
    run_all_tests()
