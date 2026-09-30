"""
Verification test suite for Track 3: 33 In-Browser Sandboxed Python Challenges.
"""
import time
import numpy as np

results = []

def record(test_id, passed, duration_ms):
    results.append((test_id, passed, duration_ms))
    print(f"[{'PASS' if passed else 'FAIL'}] {test_id} ({duration_ms:.2f}ms)")

# -------------------------------------------------------------
# LESSON-T3-01: py-ols-normal
# -------------------------------------------------------------
def fit_ols(X: np.ndarray, y: np.ndarray) -> dict:
    beta = np.linalg.solve(X.T @ X, X.T @ y)
    y_hat = X @ beta
    residuals = y - y_hat
    return {"beta": beta, "y_hat": y_hat, "residuals": residuals}

t0 = time.perf_counter()
X1 = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
y1 = np.array([3.0, 5.0, 7.0, 9.0])
out1 = fit_ols(X1, y1)
np.testing.assert_allclose(out1["beta"], np.array([1.0, 2.0]), atol=1e-7, rtol=1e-5)
np.testing.assert_allclose(X1.T @ out1["residuals"], np.zeros(2), atol=1e-7)
record("py-ols-normal", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-02: py-ols-r2-anova
# -------------------------------------------------------------
def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict:
    n = len(y)
    y_bar = np.mean(y)
    tss = float(np.sum((y - y_bar) ** 2))
    ess = float(np.sum((y_hat - y_bar) ** 2))
    ssr = float(np.sum((y - y_hat) ** 2))
    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0
    adj_r2 = 1.0 - ((ssr / (n - p - 1)) / (tss / (n - 1))) if (n - p - 1) > 0 and tss > 0 else 0.0
    return {"tss": tss, "ess": ess, "ssr": ssr, "r2": r2, "adj_r2": adj_r2}

t0 = time.perf_counter()
y2 = np.array([3.0, 5.0, 7.0, 9.0])
y_hat2 = np.array([3.0, 5.0, 7.0, 9.0])
out2 = compute_r2_anova(y2, y_hat2, p=1)
np.testing.assert_allclose(out2["r2"], 1.0, atol=1e-7)
np.testing.assert_allclose(out2["ssr"], 0.0, atol=1e-7)
np.testing.assert_allclose(out2["tss"], out2["ess"] + out2["ssr"], atol=1e-7)
record("py-ols-r2-anova", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-03: py-ols-vcov
# -------------------------------------------------------------
def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict:
    n, k = X.shape
    beta = np.linalg.solve(X.T @ X, X.T @ y)
    e = y - X @ beta
    s2 = float(np.sum(e ** 2) / (n - k))
    vcov = s2 * np.linalg.inv(X.T @ X)
    se = np.sqrt(np.diag(vcov))
    t_stats = beta / se
    return {"beta": beta, "s2": s2, "vcov": vcov, "se": se, "t_stats": t_stats}

t0 = time.perf_counter()
X3 = np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
y3 = np.array([1.1, 2.9, 5.2, 6.8, 9.1])
out3 = compute_ols_vcov(X3, y3)
assert out3["vcov"].shape == (2, 2)
assert np.all(out3["se"] > 0)
record("py-ols-vcov", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-04: py-robust-se
# -------------------------------------------------------------
def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = "HC1") -> dict:
    n, k = X.shape
    beta = np.linalg.solve(X.T @ X, X.T @ y)
    e = y - X @ beta
    XX_inv = np.linalg.inv(X.T @ X)
    meat = X.T @ np.diag(e ** 2) @ X
    vcov_hc0 = XX_inv @ meat @ XX_inv
    if hc_type == "HC0":
        vcov = vcov_hc0
    elif hc_type == "HC1":
        vcov = (n / (n - k)) * vcov_hc0
    else:
        raise ValueError("Unsupported HC type")
    se = np.sqrt(np.diag(vcov))
    return {"beta": beta, "vcov": vcov, "se": se}

t0 = time.perf_counter()
out4 = compute_robust_se(X3, y3, "HC1")
np.testing.assert_allclose(out4["vcov"], out4["vcov"].T, atol=1e-7)
record("py-robust-se", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-05: py-annihilator-matrix
# -------------------------------------------------------------
def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    P = X @ np.linalg.inv(X.T @ X) @ X.T
    n = X.shape[0]
    M = np.eye(n) - P
    return P, M

t0 = time.perf_counter()
P5, M5 = compute_projection_and_annihilator(X1)
np.testing.assert_allclose(P5 @ P5, P5, atol=1e-7)
np.testing.assert_allclose(M5 @ M5, M5, atol=1e-7)
np.testing.assert_allclose(M5 @ X1, np.zeros_like(X1), atol=1e-7)
record("py-annihilator-matrix", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-06: py-fwl-partial
# -------------------------------------------------------------
def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    # M_X2 = I - X2 (X2' X2)^-1 X2'
    P2 = X2 @ np.linalg.inv(X2.T @ X2) @ X2.T
    M2 = np.eye(len(y)) - P2
    y_tilde = M2 @ y
    X1_tilde = M2 @ X1
    beta_1_fwl = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)
    # Full regression: y on [X1, X2]
    X_full = np.column_stack([X1, X2])
    beta_full = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)
    beta_1_full = beta_full[:X1.shape[1]]
    return beta_1_fwl, beta_1_full

t0 = time.perf_counter()
np.random.seed(42)
N = 50
X1_data = np.random.randn(N, 2)
X2_data = np.random.randn(N, 3)
y_data = X1_data @ np.array([2.5, -1.5]) + X2_data @ np.array([0.5, 1.0, -2.0]) + np.random.randn(N)*0.1
b_fwl, b_full = fwl_partial_regression(y_data, X1_data, X2_data)
np.testing.assert_allclose(b_fwl, b_full, rtol=1e-5, atol=1e-7)
record("py-fwl-partial", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-07: py-ovb-calc
# -------------------------------------------------------------
def compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict:
    X_full = np.column_stack([X1, X2])
    b_long = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)
    k1 = X1.shape[1]
    b1_long = b_long[:k1]
    b2_long = b_long[k1:]
    
    b1_short = np.linalg.solve(X1.T @ X1, X1.T @ y)
    # Auxiliary regression: X2 = X1 * Pi + error => Pi = (X1' X1)^-1 X1' X2
    Pi = np.linalg.solve(X1.T @ X1, X1.T @ X2)
    bias = Pi @ b2_long
    return {"beta1_long": b1_long, "beta1_short": b1_short, "bias": bias, "Pi": Pi}

t0 = time.perf_counter()
ovb_res = compute_ovb(y_data, X1_data, X2_data)
np.testing.assert_allclose(ovb_res["beta1_short"], ovb_res["beta1_long"] + ovb_res["bias"], atol=1e-7)
record("py-ovb-calc", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-08: py-vif-calc
# -------------------------------------------------------------
def compute_vif(X: np.ndarray) -> np.ndarray:
    n, k = X.shape
    vifs = np.zeros(k)
    ones = np.ones((n, 1))
    for j in range(k):
        y_j = X[:, j]
        X_other = np.delete(X, j, axis=1)
        X_reg = np.column_stack([ones, X_other])
        beta_j = np.linalg.lstsq(X_reg, y_j, rcond=None)[0]
        y_pred = X_reg @ beta_j
        tss = np.sum((y_j - np.mean(y_j)) ** 2)
        ssr = np.sum((y_j - y_pred) ** 2)
        r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0
        vifs[j] = 1.0 / (1.0 - r2) if (1.0 - r2) > 1e-12 else 1e12
    return vifs

t0 = time.perf_counter()
X_vif = np.array([[1.0, 2.0], [2.0, 4.01], [3.0, 6.02], [4.0, 7.99]])
vifs = compute_vif(X_vif)
assert vifs[0] > 10.0
record("py-vif-calc", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-09: py-selection-bias
# -------------------------------------------------------------
def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict:
    y_obs = d * y1 + (1 - d) * y0
    naive_diff = float(np.mean(y_obs[d == 1]) - np.mean(y_obs[d == 0]))
    ate = float(np.mean(y1 - y0))
    att = float(np.mean(y1[d == 1] - y0[d == 1]))
    selection_bias = float(np.mean(y0[d == 1]) - np.mean(y0[d == 0]))
    # naive_diff == att + selection_bias
    return {
        "naive_diff": naive_diff,
        "ate": ate,
        "att": att,
        "selection_bias": selection_bias,
    }

t0 = time.perf_counter()
y0_arr = np.array([10.0, 12.0, 14.0, 11.0, 13.0, 15.0])
y1_arr = np.array([15.0, 18.0, 20.0, 14.0, 16.0, 19.0])
d_arr = np.array([1, 1, 1, 0, 0, 0])
sb_out = decompose_selection_bias(y0_arr, y1_arr, d_arr)
np.testing.assert_allclose(sb_out["naive_diff"], sb_out["att"] + sb_out["selection_bias"], atol=1e-7)
record("py-selection-bias", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-10: py-ipw-estimator
# -------------------------------------------------------------
def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:
    ps = np.clip(ps, 1e-4, 1.0 - 1e-4)
    w1 = d / ps
    w0 = (1 - d) / (1 - ps)
    if normalized:
        mu1 = np.sum(w1 * y) / np.sum(w1)
        mu0 = np.sum(w0 * y) / np.sum(w0)
    else:
        mu1 = np.mean(w1 * y)
        mu0 = np.mean(w0 * y)
    return float(mu1 - mu0)

t0 = time.perf_counter()
ps_arr = np.array([0.8, 0.7, 0.6, 0.3, 0.2, 0.4])
y_obs_arr = d_arr * y1_arr + (1 - d_arr) * y0_arr
ipw_ate = compute_ipw_ate(y_obs_arr, d_arr, ps_arr)
assert isinstance(ipw_ate, float)
record("py-ipw-estimator", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-11: py-backdoor-adjustment
# -------------------------------------------------------------
def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:
    unique_strata = np.unique(z_strata)
    n = len(y)
    ate = 0.0
    for s in unique_strata:
        mask_s = (z_strata == s)
        n_s = np.sum(mask_s)
        p_s = n_s / n
        y_d1 = y[mask_s & (d == 1)]
        y_d0 = y[mask_s & (d == 0)]
        tau_s = np.mean(y_d1) - np.mean(y_d0)
        ate += p_s * tau_s
    return float(ate)

t0 = time.perf_counter()
z_str = np.array([0, 0, 1, 1, 0, 1])
y_bd = np.array([12.0, 14.0, 20.0, 18.0, 10.0, 15.0])
d_bd = np.array([1, 1, 1, 0, 0, 0])
ate_bd = backdoor_subclassification_ate(y_bd, d_bd, z_str)
assert isinstance(ate_bd, float)
record("py-backdoor-adjustment", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-12: py-collider-bias
# -------------------------------------------------------------
def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict:
    rng = np.random.default_rng(seed)
    X = rng.normal(0, 1, size=n)
    Y = rng.normal(0, 1, size=n)
    # C is collider: X -> C <- Y
    C = 1.5 * X + 1.5 * Y + rng.normal(0, 0.5, size=n)
    # Unconditioned regression: Y on [1, X]
    X_uncond = np.column_stack([np.ones(n), X])
    b_uncond = np.linalg.lstsq(X_uncond, Y, rcond=None)[0][1]
    # Conditioned on C: Y on [1, X, C]
    X_cond = np.column_stack([np.ones(n), X, C])
    b_cond = np.linalg.lstsq(X_cond, Y, rcond=None)[0][1]
    return {"b_uncond": float(b_uncond), "b_cond": float(b_cond)}

t0 = time.perf_counter()
coll_res = simulate_collider_bias()
assert abs(coll_res["b_uncond"]) < 0.1
assert coll_res["b_cond"] < -0.3
record("py-collider-bias", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-13: py-wald-estimator
# -------------------------------------------------------------
def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict:
    del_y = np.mean(y[z == 1]) - np.mean(y[z == 0])
    del_d = np.mean(d[z == 1]) - np.mean(d[z == 0])
    wald = del_y / del_d
    cov_yz = np.cov(y, z, bias=True)[0, 1]
    cov_dz = np.cov(d, z, bias=True)[0, 1]
    ratio_cov = cov_yz / cov_dz
    return {"wald": float(wald), "compliance_rate": float(del_d), "ratio_cov": float(ratio_cov)}

t0 = time.perf_counter()
z_w = np.array([1, 1, 1, 0, 0, 0])
d_w = np.array([1, 1, 0, 0, 1, 0])
y_w = np.array([10.0, 12.0, 6.0, 4.0, 8.0, 2.0])
out_wald = compute_wald_estimator(y_w, d_w, z_w)
np.testing.assert_allclose(out_wald["wald"], out_wald["ratio_cov"], atol=1e-7)
record("py-wald-estimator", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-14: py-2sls-wald
# -------------------------------------------------------------
def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict:
    # Stage 1: regress X on Z => X_hat = Z (Z' Z)^-1 Z' X
    Pz = Z @ np.linalg.inv(Z.T @ Z) @ Z.T
    X_hat = Pz @ X
    # Stage 2: regress y on X_hat
    beta_2sls = np.linalg.solve(X_hat.T @ X_hat, X_hat.T @ y)
    # Structural residuals: e = y - X * beta (using actual X!)
    structural_residuals = y - X @ beta_2sls
    n, k = X.shape
    sigma2 = float(np.sum(structural_residuals ** 2) / (n - k))
    vcov = sigma2 * np.linalg.inv(X.T @ Pz @ X)
    se = np.sqrt(np.diag(vcov))
    return {"beta": beta_2sls, "se": se, "residuals": structural_residuals, "sigma2": sigma2}

t0 = time.perf_counter()
X_iv = np.array([[1.0, 2.0], [1.0, 3.0], [1.0, 4.0], [1.0, 5.0], [1.0, 6.0]])
Z_iv = np.array([[1.0, 10.0], [1.0, 12.0], [1.0, 15.0], [1.0, 18.0], [1.0, 20.0]])
y_iv = np.array([5.0, 7.5, 9.0, 11.2, 13.0])
out_2sls = fit_2sls(y_iv, X_iv, Z_iv)
assert out_2sls["beta"].shape == (2,)
record("py-2sls-wald", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-15: py-panel-fe
# -------------------------------------------------------------
def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict:
    unique_entities = np.unique(entity_ids)
    y_tilde = np.zeros_like(y)
    X_tilde = np.zeros_like(X)
    for ent in unique_entities:
        mask = (entity_ids == ent)
        y_tilde[mask] = y[mask] - np.mean(y[mask])
        X_tilde[mask] = X[mask] - np.mean(X[mask], axis=0)
    beta_fe = np.linalg.solve(X_tilde.T @ X_tilde, X_tilde.T @ y_tilde)
    # Compute entity fixed effects: alpha_i = mean(y_i) - mean(X_i) * beta
    alphas = {}
    for ent in unique_entities:
        mask = (entity_ids == ent)
        alphas[int(ent)] = float(np.mean(y[mask]) - np.mean(X[mask], axis=0) @ beta_fe)
    return {"beta_fe": beta_fe, "alphas": alphas, "y_tilde": y_tilde, "X_tilde": X_tilde}

t0 = time.perf_counter()
e_ids = np.array([1, 1, 2, 2, 3, 3])
X_pan = np.array([[1.0], [2.0], [1.5], [3.0], [2.0], [4.0]])
y_pan = np.array([5.0, 7.0, 6.0, 9.0, 8.0, 12.0])
out_fe = fit_panel_fe(y_pan, X_pan, e_ids)
assert len(out_fe["alphas"]) == 3
record("py-panel-fe", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-16: py-hausman-test
# -------------------------------------------------------------
def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict:
    diff = beta_fe - beta_re
    v_diff = vcov_fe - vcov_re
    # H = diff' * inv(v_diff) * diff
    h_stat = float(diff.T @ np.linalg.inv(v_diff) @ diff)
    df = len(beta_fe)
    return {"h_stat": h_stat, "df": df}

t0 = time.perf_counter()
b_fe = np.array([2.5])
v_fe = np.array([[0.25]])
b_re = np.array([1.5])
v_re = np.array([[0.09]])
out_hausman = compute_hausman_test(b_fe, v_fe, b_re, v_re)
np.testing.assert_allclose(out_hausman["h_stat"], (1.0 ** 2) / 0.16, atol=1e-7)
record("py-hausman-test", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-17: py-did-2x2
# -------------------------------------------------------------
def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict:
    y11 = np.mean(y[(treat == 1) & (post == 1)])
    y10 = np.mean(y[(treat == 1) & (post == 0)])
    y01 = np.mean(y[(treat == 0) & (post == 1)])
    y00 = np.mean(y[(treat == 0) & (post == 0)])
    delta_did = float((y11 - y10) - (y01 - y00))
    # Regression: y = b0 + b1*treat + b2*post + delta*(treat*post)
    X = np.column_stack([np.ones_like(y), treat, post, treat * post])
    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)
    counterfactual = float(y10 + (y01 - y00))
    return {"delta_did": delta_did, "beta_interaction": float(beta_reg[3]), "counterfactual": counterfactual}

t0 = time.perf_counter()
y_did = np.array([10.0, 14.0, 8.0, 9.0])
tr_did = np.array([1, 1, 0, 0])
po_did = np.array([0, 1, 0, 1])
out_did = compute_did_2x2(y_did, tr_did, po_did)
np.testing.assert_allclose(out_did["delta_did"], out_did["beta_interaction"], atol=1e-7)
record("py-did-2x2", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-18: py-did-event-study
# -------------------------------------------------------------
def fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict:
    unique_times = sorted(np.unique(rel_time))
    periods = [t for t in unique_times if t != ref_period]
    dummy_cols = []
    for t in periods:
        dummy_cols.append((rel_time == t) * treat)
    X = np.column_stack([np.ones_like(y)] + dummy_cols)
    beta = np.linalg.lstsq(X, y, rcond=None)[0]
    coef_dict = {ref_period: 0.0}
    for idx, t in enumerate(periods):
        coef_dict[t] = float(beta[idx + 1])
    return coef_dict

t0 = time.perf_counter()
rel_t = np.array([-2, -1, 0, 1, -2, -1, 0, 1])
tr_es = np.array([1, 1, 1, 1, 0, 0, 0, 0])
y_es = np.array([5.0, 5.0, 8.0, 10.0, 5.0, 5.0, 5.0, 5.0])
out_es = fit_did_event_study(y_es, rel_t, tr_es, ref_period=-1)
assert out_es[-1] == 0.0
assert out_es[0] > 0.0
record("py-did-event-study", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-19: py-rdd-local-linear
# -------------------------------------------------------------
def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict:
    x_tilde = x - cutoff
    mask = np.abs(x_tilde) <= bandwidth
    y_sub = y[mask]
    x_sub = x_tilde[mask]
    d_sub = (x_sub >= 0).astype(float)
    # Triangular kernel weights: 1 - |u|
    w = 1.0 - np.abs(x_sub) / bandwidth
    W = np.diag(w)
    X = np.column_stack([np.ones_like(x_sub), d_sub, x_sub, d_sub * x_sub])
    beta = np.linalg.solve(X.T @ W @ X, X.T @ W @ y_sub)
    tau = float(beta[1])
    return {"tau_rdd": tau, "intercept_left": float(beta[0]), "intercept_right": float(beta[0] + beta[1])}

t0 = time.perf_counter()
x_rdd = np.linspace(-2, 2, 40)
y_rdd = 2.0 + 1.5 * (x_rdd >= 0) + 0.5 * x_rdd
out_rdd = fit_sharp_rdd_local_linear(y_rdd, x_rdd, cutoff=0.0, bandwidth=1.5)
np.testing.assert_allclose(out_rdd["tau_rdd"], 1.5, atol=1e-7)
record("py-rdd-local-linear", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-20: py-rdd-mccrary
# -------------------------------------------------------------
def compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict:
    left_mask = (x >= cutoff - 5 * bin_width) & (x < cutoff)
    right_mask = (x >= cutoff) & (x <= cutoff + 5 * bin_width)
    count_left = np.sum((x >= cutoff - bin_width) & (x < cutoff))
    count_right = np.sum((x >= cutoff) & (x <= cutoff + bin_width))
    density_left = count_left / (len(x) * bin_width)
    density_right = count_right / (len(x) * bin_width)
    theta = float(np.log(max(density_right, 1e-9)) - np.log(max(density_left, 1e-9)))
    return {"density_left": density_left, "density_right": density_right, "theta": theta}

t0 = time.perf_counter()
x_mcc = np.linspace(-1, 1, 1000)
out_mcc = compute_density_discontinuity(x_mcc, cutoff=0.0, bin_width=0.1)
assert abs(out_mcc["theta"]) < 0.2
record("py-rdd-mccrary", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-21: py-synthetic-control
# -------------------------------------------------------------
def fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:
    # Project onto simplex: min_w ||X1 - X0 w||^2 s.t. w >= 0, sum w = 1
    J = X0.shape[1]
    # Parameterize via softmax: w = exp(theta) / sum(exp(theta))
    theta = np.zeros(J)
    for _ in range(max_iter):
        w = np.exp(theta - np.max(theta))
        w /= np.sum(w)
        residual = X1 - X0 @ w
        # Loss = 0.5 * ||res||^2
        grad_w = - (X0.T @ residual)
        # Jacobian of softmax: J_theta = diag(w) - w w^T
        grad_theta = w * (grad_w - np.dot(w, grad_w))
        theta -= lr * grad_theta
    w_final = np.exp(theta - np.max(theta))
    w_final /= np.sum(w_final)
    return w_final

t0 = time.perf_counter()
X0_sc = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 3.0]])
X1_sc = np.array([1.5, 1.5, 3.0]) # exactly 0.5*col0 + 0.5*col1
w_sc = fit_synthetic_control(X1_sc, X0_sc, max_iter=600)
np.testing.assert_allclose(w_sc, np.array([0.5, 0.5]), atol=1e-2)
record("py-synthetic-control", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-22: py-sc-placebo-rmspe
# -------------------------------------------------------------
def compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict:
    rmspe_pre = np.sqrt(pre_loss)
    rmspe_post = np.sqrt(post_loss)
    ratios = rmspe_post / (rmspe_pre + 1e-12)
    treated_ratio = ratios[treated_idx]
    p_value = float(np.mean(ratios >= treated_ratio))
    return {"ratios": ratios, "treated_ratio": float(treated_ratio), "p_value": p_value}

t0 = time.perf_counter()
pre_l = np.array([0.1, 0.2, 0.15, 0.12])
post_l = np.array([2.5, 0.3, 0.25, 0.18])
out_sc_p = compute_rmspe_ratio_test(pre_l, post_l, treated_idx=0)
assert out_sc_p["p_value"] == 0.25
record("py-sc-placebo-rmspe", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-23: py-ridge-svd
# -------------------------------------------------------------
def fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict:
    n, p = X.shape
    beta_closed = np.linalg.solve(X.T @ X + alpha * np.eye(p), X.T @ y)
    U, s, Vt = np.linalg.svd(X, full_matrices=False)
    # Shrinkage factor: s^2 / (s^2 + alpha)
    shrinkage = (s ** 2) / (s ** 2 + alpha)
    df_effective = float(np.sum(shrinkage))
    return {"beta_ridge": beta_closed, "shrinkage": shrinkage, "df_effective": df_effective}

t0 = time.perf_counter()
out_ridge = fit_ridge_svd(X1_data, y_data, alpha=1.0)
assert len(out_ridge["shrinkage"]) == 2
assert 0 < out_ridge["df_effective"] < 2.0
record("py-ridge-svd", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-24: py-lasso-cd
# -------------------------------------------------------------
def fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:
    n, p = X.shape
    beta = np.zeros(p)
    z = np.sum(X ** 2, axis=0) # norm squared
    for _ in range(max_iter):
        beta_prev = beta.copy()
        for j in range(p):
            r_j = y - (X @ beta - X[:, j] * beta[j])
            rho_j = float(X[:, j] @ r_j)
            # Soft thresholding
            if rho_j > alpha:
                beta[j] = (rho_j - alpha) / z[j]
            elif rho_j < -alpha:
                beta[j] = (rho_j + alpha) / z[j]
            else:
                beta[j] = 0.0
        if np.max(np.abs(beta - beta_prev)) < tol:
            break
    return beta

t0 = time.perf_counter()
X_las = np.column_stack([np.array([1.0, 2.0, 3.0, 4.0]), np.array([0.01, -0.01, 0.02, -0.02])])
y_las = np.array([2.0, 4.0, 6.0, 8.0])
beta_las = fit_lasso_coordinate_descent(X_las, y_las, alpha=2.0)
assert beta_las[1] == 0.0 # exact zero
record("py-lasso-cd", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-25: py-irls-step
# -------------------------------------------------------------
def irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:
    z_lin = X @ beta
    p = 1.0 / (1.0 + np.exp(-np.clip(z_lin, -30, 30)))
    w = p * (1.0 - p)
    W = np.diag(w)
    working_z = z_lin + (y - p) / (w + 1e-12)
    # (X' W X) beta_new = X' W working_z
    beta_new = np.linalg.solve(X.T @ W @ X, X.T @ W @ working_z)
    loss = -float(np.sum(y * np.log(p + 1e-12) + (1.0 - y) * np.log(1.0 - p + 1e-12)))
    return beta_new, loss

t0 = time.perf_counter()
X_log = np.array([[1.0, -2.0], [1.0, -1.0], [1.0, 1.0], [1.0, 2.0]])
y_log = np.array([0.0, 0.0, 1.0, 1.0])
b_init = np.array([0.0, 0.0])
b_next, loss_0 = irls_logistic_step(X_log, y_log, b_init)
assert b_next[1] > 0
record("py-irls-step", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-26: py-softmax-loss-grad
# -------------------------------------------------------------
def compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:
    N = X.shape[0]
    logits = X @ W
    logits_stable = logits - np.max(logits, axis=1, keepdims=True)
    exp_logits = np.exp(logits_stable)
    probs = exp_logits / np.sum(exp_logits, axis=1, keepdims=True)
    loss = -float(np.sum(Y_onehot * np.log(probs + 1e-15)) / N)
    grad = (X.T @ (probs - Y_onehot)) / N
    return loss, grad

t0 = time.perf_counter()
X_sm = np.array([[1.0, 2.0], [2.0, 1.0]])
Y_sm = np.array([[1.0, 0.0], [0.0, 1.0]])
W_sm = np.zeros((2, 2))
loss_sm, grad_sm = compute_softmax_loss_grad(X_sm, Y_sm, W_sm)
np.testing.assert_allclose(loss_sm, np.log(2.0), atol=1e-5)
record("py-softmax-loss-grad", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-27: py-svm-hinge-subgrad
# -------------------------------------------------------------
def svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:
    margins = y * (X @ w + b)
    loss = 0.5 * float(np.sum(w ** 2)) + C * float(np.sum(np.maximum(0.0, 1.0 - margins)))
    violators = (margins < 1.0).astype(float)
    grad_w = w - C * np.sum((violators * y)[:, None] * X, axis=0)
    grad_b = - C * float(np.sum(violators * y))
    w_new = w - lr * grad_w
    b_new = b - lr * grad_b
    return w_new, b_new, loss

t0 = time.perf_counter()
X_svm = np.array([[1.0, 2.0], [-1.0, -2.0]])
y_svm = np.array([1.0, -1.0])
w_0 = np.array([0.0, 0.0])
w_1, b_1, l_1 = svm_hinge_subgradient_step(X_svm, y_svm, w_0, 0.0, C=1.0, lr=0.1)
assert w_1[0] > 0 and w_1[1] > 0
record("py-svm-hinge-subgrad", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-28: py-cart-split-gini
# -------------------------------------------------------------
def find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:
    order = np.argsort(x)
    x_sort = x[order]
    y_sort = y[order]
    n = len(y)
    best_gini = 1.0
    best_thresh = float(x_sort[0])
    
    def gini(arr):
        if len(arr) == 0:
            return 0.0
        _, counts = np.unique(arr, return_counts=True)
        probs = counts / len(arr)
        return 1.0 - np.sum(probs ** 2)
    
    for i in range(n - 1):
        if x_sort[i] == x_sort[i + 1]:
            continue
        thresh = (x_sort[i] + x_sort[i + 1]) / 2.0
        y_left = y_sort[:i + 1]
        y_right = y_sort[i + 1:]
        split_gini = (len(y_left) / n) * gini(y_left) + (len(y_right) / n) * gini(y_right)
        if split_gini < best_gini:
            best_gini = split_gini
            best_thresh = thresh
    return best_thresh, best_gini

t0 = time.perf_counter()
x_c = np.array([1.0, 2.0, 3.0, 8.0, 9.0, 10.0])
y_c = np.array([0, 0, 0, 1, 1, 1])
t_c, g_c = find_best_split(x_c, y_c)
assert 3.0 < t_c < 8.0
np.testing.assert_allclose(g_c, 0.0, atol=1e-7)
record("py-cart-split-gini", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-29: py-rf-oob-error
# -------------------------------------------------------------
def compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:
    n = len(y_true)
    correct = 0
    counted = 0
    for i in range(n):
        votes = [pred_dict[i] for pred_dict in oob_predictions if i in pred_dict]
        if len(votes) > 0:
            vals, counts = np.unique(votes, return_counts=True)
            pred_class = vals[np.argmax(counts)]
            if pred_class == y_true[i]:
                correct += 1
            counted += 1
    return float(correct / counted) if counted > 0 else 0.0

t0 = time.perf_counter()
y_t = np.array([0, 1, 1, 0])
oob_preds = [{0: 0, 1: 1, 2: 1, 3: 0}, {0: 0, 1: 1, 2: 1, 3: 0}, {2: 0, 3: 1}]
oob_acc = compute_oob_accuracy(y_t, oob_preds)
assert oob_acc == 1.0
record("py-rf-oob-error", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-30: py-gbm-pseudo-residuals
# -------------------------------------------------------------
def compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = "mse") -> tuple[np.ndarray, float]:
    if loss == "mse":
        r = y - f_prev
        gamma = float(np.mean(r))
    elif loss == "mae":
        r = np.sign(y - f_prev)
        gamma = float(np.median(y - f_prev))
    else:
        raise ValueError("Unsupported loss")
    return r, gamma

t0 = time.perf_counter()
y_gbm = np.array([2.0, 4.0, 6.0])
f_gbm = np.array([1.0, 3.0, 5.0])
r_gbm, g_gbm = compute_gbm_step(y_gbm, f_gbm, "mse")
np.testing.assert_allclose(r_gbm, np.array([1.0, 1.0, 1.0]), atol=1e-7)
np.testing.assert_allclose(g_gbm, 1.0, atol=1e-7)
record("py-gbm-pseudo-residuals", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-31: py-xgboost-gain
# -------------------------------------------------------------
def compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:
    g_L = np.sum(g[split_mask])
    h_L = np.sum(h[split_mask])
    g_R = np.sum(g[~split_mask])
    h_R = np.sum(h[~split_mask])
    w_L = - g_L / (h_L + lam)
    w_R = - g_R / (h_R + lam)
    gain = 0.5 * (
        (g_L ** 2) / (h_L + lam) +
        (g_R ** 2) / (h_R + lam) -
        ((g_L + g_R) ** 2) / (h_L + h_R + lam)
    ) - gamma
    return float(w_L), float(w_R), float(gain)

t0 = time.perf_counter()
g_xgb = np.array([-1.5, -2.0, 1.0, 2.5])
h_xgb = np.array([1.0, 1.0, 1.0, 1.0])
m_xgb = np.array([True, True, False, False])
w_l, w_r, gain_xgb = compute_xgboost_split_gain(g_xgb, h_xgb, m_xgb, lam=1.0, gamma=0.0)
assert w_l > 0 and w_r < 0 and gain_xgb > 0
record("py-xgboost-gain", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-32: py-pca-svd
# -------------------------------------------------------------
def fit_pca_svd(X: np.ndarray, n_components: int) -> dict:
    mu = np.mean(X, axis=0)
    X_centered = X - mu
    U, s, Vt = np.linalg.svd(X_centered, full_matrices=False)
    V_k = Vt[:n_components].T
    Z = X_centered @ V_k
    variances = (s ** 2) / (len(X) - 1)
    explained_variance_ratio = (s[:n_components] ** 2) / np.sum(s ** 2)
    return {"Z": Z, "V_k": V_k, "explained_variance_ratio": explained_variance_ratio}

t0 = time.perf_counter()
X_pca = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0], [4.0, 8.0]])
out_pca = fit_pca_svd(X_pca, n_components=1)
np.testing.assert_allclose(out_pca["explained_variance_ratio"][0], 1.0, atol=1e-7)
record("py-pca-svd", True, (time.perf_counter() - t0) * 1000)

# -------------------------------------------------------------
# LESSON-T3-33: py-tsne-affinities
# -------------------------------------------------------------
def compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:
    n = len(X)
    D = np.sum((X[:, None, :] - X[None, :, :]) ** 2, axis=-1)
    target_entropy = np.log(target_perplexity)
    P = np.zeros((n, n))
    
    for i in range(n):
        beta_min = -np.inf
        beta_max = np.inf
        beta = 1.0
        d_i = np.delete(D[i], i)
        
        for _ in range(max_iter):
            p_i = np.exp(-d_i * beta)
            sum_p = np.sum(p_i)
            if sum_p == 0:
                p_i = np.ones_like(p_i) / len(p_i)
            else:
                p_i /= sum_p
            # Shannon entropy: H = - sum p ln p
            H = -np.sum(p_i * np.log(np.maximum(p_i, 1e-12)))
            diff = H - target_entropy
            if np.abs(diff) < tol:
                break
            if diff > 0:
                beta_min = beta
                beta = beta * 2.0 if np.isinf(beta_max) else (beta + beta_max) / 2.0
            else:
                beta_max = beta
                beta = beta / 2.0 if np.isinf(beta_min) else (beta + beta_min) / 2.0
        
        indices = [j for j in range(n) if j != i]
        P[i, indices] = p_i
    
    P_sym = (P + P.T) / (2.0 * n)
    return P_sym

t0 = time.perf_counter()
X_tsne = np.array([[0.0], [0.1], [10.0], [10.1]])
P_tsne = compute_tsne_p_matrix(X_tsne, target_perplexity=1.5)
np.testing.assert_allclose(np.sum(P_tsne), 1.0, atol=1e-7)
np.testing.assert_allclose(P_tsne, P_tsne.T, atol=1e-7)
record("py-tsne-affinities", True, (time.perf_counter() - t0) * 1000)

print("\n--- Summary ---")
print(f"Total challenges tested: {len(results)}/33")
assert len(results) == 33
all_passed = all(p for _, p, _ in results)
print(f"All passed: {all_passed}")
max_time = max(t for _, _, t in results)
print(f"Max single execution time: {max_time:.2f}ms (Budget: <800ms)")
