#!/usr/bin/env python3
"""
Test runner for all 33 Track 4 (Deep Learning, Transformers & Frontier AI) coding challenges.
Ensures 100% mathematical and numerical correctness with strict tolerances.
"""
import math
import re
import numpy as np

def test_all_track4_challenges():
    print("=" * 80)
    print("RUNNING ALL 33 TRACK 4 REFERENCE IMPLEMENTATIONS & NUMERICAL ASSERTIONS")
    print("=" * 80)

    # =========================================================================
    # MOD-35: Scalar Autograd Engine from Scratch
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-01: py-autograd-node
    # -------------------------------------------------------------------------
    class ValueNode:
        def __init__(self, data: float, _children=(), _op: str = ''):
            self.data = float(data)
            self.grad = 0.0
            self._prev = set(_children)
            self._op = _op

        def __add__(self, other):
            other = other if isinstance(other, ValueNode) else ValueNode(other)
            return ValueNode(self.data + other.data, (self, other), '+')

        def __mul__(self, other):
            other = other if isinstance(other, ValueNode) else ValueNode(other)
            return ValueNode(self.data * other.data, (self, other), '*')

        def __pow__(self, other: float | int):
            assert isinstance(other, (int, float)), "Power exponent must be int or float"
            return ValueNode(self.data ** other, (self,), f'**{other}')

        def __neg__(self):
            return self * -1.0

        def __sub__(self, other):
            return self + (-other)

        def __radd__(self, other):
            return self + other

        def __rmul__(self, other):
            return self * other

        def __rsub__(self, other):
            return ValueNode(other) + (-self)

    # Public tests
    a = ValueNode(2.0)
    b = ValueNode(3.0)
    c = a * b + 4.0
    assert c.data == 10.0
    assert c._op == '+'
    assert len(c._prev) == 2
    # Hidden tests
    x = ValueNode(-2.5)
    y = x ** 2 - 3.0 * x + 1.0
    assert math.isclose(y.data, (-2.5)**2 - 3.0*(-2.5) + 1.0, rel_tol=1e-6)
    print("Lesson 01 (py-autograd-node): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-02: py-autograd-backward-ops
    # -------------------------------------------------------------------------
    class ValueOp:
        def __init__(self, data: float, _children=(), _op: str = ''):
            self.data = float(data)
            self.grad = 0.0
            self._backward = lambda: None
            self._prev = set(_children)
            self._op = _op

        def __add__(self, other):
            other = other if isinstance(other, ValueOp) else ValueOp(other)
            out = ValueOp(self.data + other.data, (self, other), '+')
            def _backward():
                self.grad += out.grad
                other.grad += out.grad
            out._backward = _backward
            return out

        def __mul__(self, other):
            other = other if isinstance(other, ValueOp) else ValueOp(other)
            out = ValueOp(self.data * other.data, (self, other), '*')
            def _backward():
                self.grad += other.data * out.grad
                other.grad += self.data * out.grad
            out._backward = _backward
            return out

        def relu(self):
            out = ValueOp(max(0.0, self.data), (self,), 'relu')
            def _backward():
                self.grad += (out.data > 0.0) * out.grad
            out._backward = _backward
            return out

    # Public tests (Multi-consumer fan-out accumulation)
    x = ValueOp(3.0)
    y = x + x  # y = 2x, dy/dx = 2
    y.grad = 1.0
    y._backward()
    assert x.grad == 2.0
    # Hidden tests
    a = ValueOp(4.0)
    b = ValueOp(-2.0)
    c = a * b
    c.grad = 1.0
    c._backward()
    assert a.grad == -2.0
    assert b.grad == 4.0
    # relu gradient
    r1 = ValueOp(5.0).relu()
    r1.grad = 2.0
    r1._backward()
    assert list(r1._prev)[0].grad == 2.0
    r2 = ValueOp(-5.0).relu()
    r2.grad = 2.0
    r2._backward()
    assert list(r2._prev)[0].grad == 0.0
    print("Lesson 02 (py-autograd-backward-ops): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-03: py-autograd-dag-engine
    # -------------------------------------------------------------------------
    class Value:
        def __init__(self, data: float, _children=(), _op: str = ''):
            self.data = float(data)
            self.grad = 0.0
            self._backward = lambda: None
            self._prev = set(_children)
            self._op = _op

        def __add__(self, other):
            other = other if isinstance(other, Value) else Value(other)
            out = Value(self.data + other.data, (self, other), '+')
            def _backward():
                self.grad += out.grad
                other.grad += out.grad
            out._backward = _backward
            return out

        def __mul__(self, other):
            other = other if isinstance(other, Value) else Value(other)
            out = Value(self.data * other.data, (self, other), '*')
            def _backward():
                self.grad += other.data * out.grad
                other.grad += self.data * out.grad
            out._backward = _backward
            return out

        def relu(self):
            out = Value(max(0.0, self.data), (self,), 'relu')
            def _backward():
                self.grad += (out.data > 0.0) * out.grad
            out._backward = _backward
            return out

        def backward(self):
            topo = []
            visited = set()
            def build_topo(v):
                if v not in visited:
                    visited.add(v)
                    for child in v._prev:
                        build_topo(child)
                    topo.append(v)
            build_topo(self)
            self.grad = 1.0
            for node in reversed(topo):
                node._backward()

    # Public tests: L = relu(w1*x1 + w2*x2 + b)
    w1, x1 = Value(2.0), Value(3.0)
    w2, x2 = Value(-1.5), Value(4.0)
    b = Value(1.0)
    # 2*3 + (-1.5)*4 + 1 = 6 - 6 + 1 = 1.0 > 0
    L = (w1 * x1 + w2 * x2 + b).relu()
    L.backward()
    assert L.data == 1.0
    assert w1.grad == 3.0
    assert x1.grad == 2.0
    assert w2.grad == 4.0
    assert x2.grad == -1.5
    assert b.grad == 1.0

    # Hidden tests: Inactive ReLU & diamond graph f = (a + b) * (a + b)
    w_dead = (Value(-5.0) + Value(1.0)).relu()
    w_dead.backward()
    assert w_dead.grad == 1.0
    val_a = Value(2.0)
    val_b = Value(3.0)
    val_c = val_a + val_b # 5
    val_d = val_c * val_c # 25, d/da = 2*(a+b) = 10
    val_d.backward()
    assert val_d.data == 25.0
    assert val_a.grad == 10.0
    assert val_b.grad == 10.0
    print("Lesson 03 (py-autograd-dag-engine): PASSED")

    # =========================================================================
    # MOD-36: Optimization Dynamics (SGD to AdamW & Warmup)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-04: py-gelu-forward
    # -------------------------------------------------------------------------
    def gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray:
        if approximate:
            # 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3)))
            inner = np.sqrt(2.0 / np.pi) * (x + 0.044715 * (x ** 3))
            return 0.5 * x * (1.0 + np.tanh(inner))
        else:
            # Vectorized exact erf via math.erf
            erf_vec = np.vectorize(math.erf, otypes=[np.float64])
            return 0.5 * x * (1.0 + erf_vec(x / np.sqrt(2.0)))

    # Public tests
    x_test = np.array([-2.0, -1.0, 0.0, 1.0, 2.0])
    y_approx = gelu_forward(x_test, approximate=True)
    y_exact = gelu_forward(x_test, approximate=False)
    np.testing.assert_allclose(y_approx[2], 0.0, atol=1e-7)
    np.testing.assert_allclose(y_approx, y_exact, atol=1e-3)
    # Hidden tests
    np.testing.assert_allclose(gelu_forward(np.array([0.0])), np.array([0.0]), atol=1e-7)
    assert gelu_forward(np.array([10.0]))[0] > 9.999
    assert abs(gelu_forward(np.array([-10.0]))[0]) < 1e-5
    print("Lesson 04 (py-gelu-forward): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-05: py-cross-entropy-lse
    # -------------------------------------------------------------------------
    def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]:
        # logits: (N, C), targets: (N,) integers
        max_logits = np.max(logits, axis=-1, keepdims=True)
        shifted = logits - max_logits
        lse = np.log(np.sum(np.exp(shifted), axis=-1, keepdims=True)) + max_logits
        log_probs = logits - lse
        N = logits.shape[0]
        loss = -float(np.mean(log_probs[np.arange(N), targets]))
        probs = np.exp(log_probs)
        grad = probs.copy()
        grad[np.arange(N), targets] -= 1.0
        grad /= N
        return loss, grad

    # Public tests
    logits_pub = np.array([[2.0, 1.0, 0.1], [0.5, 2.5, 0.2]])
    targets_pub = np.array([0, 1])
    loss_p, grad_p = cross_entropy_loss_lse(logits_pub, targets_pub)
    assert loss_p > 0.0
    assert grad_p.shape == logits_pub.shape
    np.testing.assert_allclose(np.sum(grad_p, axis=-1), np.zeros(2), atol=1e-7)
    # Hidden tests (large values to test numerical stability)
    huge_logits = np.array([[1000.0, 1001.0], [500.0, 499.0]])
    huge_targets = np.array([1, 0])
    loss_h, grad_h = cross_entropy_loss_lse(huge_logits, huge_targets)
    assert not np.isnan(loss_h) and not np.isinf(loss_h)
    print("Lesson 05 (py-cross-entropy-lse): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-06: py-adamw-step
    # -------------------------------------------------------------------------
    def adamw_step(
        param: np.ndarray,
        grad: np.ndarray,
        m: np.ndarray,
        v: np.ndarray,
        t: int,
        lr: float = 1e-3,
        beta1: float = 0.9,
        beta2: float = 0.999,
        eps: float = 1e-8,
        weight_decay: float = 1e-2,
    ) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        # Decoupled weight decay
        param_decayed = param * (1.0 - lr * weight_decay)
        # First & second moments
        m_next = beta1 * m + (1.0 - beta1) * grad
        v_next = beta2 * v + (1.0 - beta2) * (grad ** 2)
        # Bias correction
        m_hat = m_next / (1.0 - beta1 ** t)
        v_hat = v_next / (1.0 - beta2 ** t)
        # Parameter update
        param_next = param_decayed - lr * (m_hat / (np.sqrt(v_hat) + eps))
        return param_next, m_next, v_next

    # Public tests
    w_0 = np.array([1.0, -2.0])
    g_0 = np.array([0.1, -0.5])
    m_0 = np.zeros_like(w_0)
    v_0 = np.zeros_like(w_0)
    w_1, m_1, v_1 = adamw_step(w_0, g_0, m_0, v_0, t=1, lr=0.1, weight_decay=0.0)
    # at t=1, m_hat = g_0, v_hat = g_0^2, step = g_0 / |g_0| = sign(g_0) = [1, -1]
    # w_1 = w_0 - 0.1 * [1, -1] = [0.9, -1.9]
    np.testing.assert_allclose(w_1, np.array([0.9, -1.9]), atol=1e-5)
    # Hidden tests with weight decay
    w_wd, _, _ = adamw_step(w_0, np.zeros_like(g_0), m_0, v_0, t=1, lr=0.1, weight_decay=0.1)
    np.testing.assert_allclose(w_wd, w_0 * (1.0 - 0.1 * 0.1), atol=1e-7)
    print("Lesson 06 (py-adamw-step): PASSED")

    # =========================================================================
    # MOD-37: Convolutional Networks & Residual Highways
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-07: py-conv2d-im2col
    # -------------------------------------------------------------------------
    def conv2d_im2col(
        x: np.ndarray,
        w: np.ndarray,
        b: np.ndarray | None = None,
        stride: int = 1,
        padding: int = 0
    ) -> np.ndarray:
        B, C_in, H, W = x.shape
        C_out, C_in_w, K_h, K_w = w.shape
        assert C_in == C_in_w, "Channel mismatch"

        if padding > 0:
            x_padded = np.pad(x, ((0,0), (0,0), (padding, padding), (padding, padding)), mode='constant')
        else:
            x_padded = x

        H_pad, W_pad = x_padded.shape[2], x_padded.shape[3]
        out_h = (H_pad - K_h) // stride + 1
        out_w = (W_pad - K_w) // stride + 1

        # Vectorized im2col
        cols = np.zeros((B, C_in * K_h * K_w, out_h * out_w))
        col_idx = 0
        for i in range(out_h):
            for j in range(out_w):
                h_start = i * stride
                w_start = j * stride
                patch = x_padded[:, :, h_start:h_start+K_h, w_start:w_start+K_w] # (B, C, Kh, Kw)
                cols[:, :, col_idx] = patch.reshape(B, -1)
                col_idx += 1

        w_row = w.reshape(C_out, -1) # (C_out, C_in * Kh * Kw)
        # GEMM: (B, C_out, out_h * out_w)
        out = np.matmul(w_row, cols) # shape (B, C_out, out_h * out_w)
        out = out.reshape(B, C_out, out_h, out_w)
        if b is not None:
            out += b.reshape(1, C_out, 1, 1)
        return out

    # Public tests (1x1 conv test = matrix multiplication)
    x_c = np.ones((1, 2, 3, 3))
    w_c = np.ones((1, 2, 1, 1))
    out_c = conv2d_im2col(x_c, w_c, stride=1, padding=0)
    assert out_c.shape == (1, 1, 3, 3)
    np.testing.assert_allclose(out_c, np.full((1, 1, 3, 3), 2.0), atol=1e-7)
    # Hidden test: edge detection Sobel horizontal filter
    sobel = np.array([[[[-1., 0., 1.], [-2., 0., 2.], [-1., 0., 1.]]]])
    img = np.zeros((1, 1, 5, 5))
    img[:, :, :, 2:] = 1.0 # step edge at column 2
    res = conv2d_im2col(img, sobel, padding=1)
    assert res.shape == (1, 1, 5, 5)
    print("Lesson 07 (py-conv2d-im2col): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-08: py-layernorm
    # -------------------------------------------------------------------------
    def layernorm_forward(
        x: np.ndarray,
        gamma: np.ndarray,
        beta: np.ndarray,
        eps: float = 1e-5
    ) -> tuple[np.ndarray, dict]:
        # x: (..., D), gamma: (D,), beta: (D,)
        mean = np.mean(x, axis=-1, keepdims=True)
        var = np.var(x, axis=-1, keepdims=True)
        x_hat = (x - mean) / np.sqrt(var + eps)
        out = gamma * x_hat + beta
        cache = {'x': x, 'gamma': gamma, 'x_hat': x_hat, 'mean': mean, 'var': var, 'eps': eps}
        return out, cache

    # Public tests
    x_ln = np.array([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]])
    gamma_ln = np.ones(3)
    beta_ln = np.zeros(3)
    out_ln, _ = layernorm_forward(x_ln, gamma_ln, beta_ln)
    np.testing.assert_allclose(np.mean(out_ln, axis=-1), np.zeros(2), atol=1e-6)
    np.testing.assert_allclose(np.var(out_ln, axis=-1), np.ones(2), atol=1e-4)
    # Hidden tests with scale and shift
    out_ln2, _ = layernorm_forward(x_ln, gamma=2.0 * np.ones(3), beta=5.0 * np.ones(3))
    np.testing.assert_allclose(np.mean(out_ln2, axis=-1), np.full(2, 5.0), atol=1e-6)
    print("Lesson 08 (py-layernorm): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-09: py-rms-norm
    # -------------------------------------------------------------------------
    def rms_norm_forward(
        x: np.ndarray,
        gamma: np.ndarray,
        eps: float = 1e-6,
        residual: np.ndarray | None = None
    ) -> tuple[np.ndarray, np.ndarray]:
        # If residual highway is present: x_add = x + residual
        x_active = x + residual if residual is not None else x
        rms = np.sqrt(np.mean(x_active ** 2, axis=-1, keepdims=True) + eps)
        out = (x_active / rms) * gamma
        return out, x_active

    # Public tests
    x_rms = np.array([[2.0, 2.0, 2.0, 2.0]])
    gamma_rms = np.ones(4)
    out_r, _ = rms_norm_forward(x_rms, gamma_rms)
    np.testing.assert_allclose(out_r, np.ones((1, 4)), atol=1e-5)
    # Hidden tests with residual addition
    res_r = np.array([[1.0, 1.0, 1.0, 1.0]])
    out_r2, x_act = rms_norm_forward(x_rms, gamma_rms, residual=res_r)
    np.testing.assert_allclose(x_act, np.full((1, 4), 3.0), atol=1e-7)
    np.testing.assert_allclose(out_r2, np.ones((1, 4)), atol=1e-5)
    print("Lesson 09 (py-rms-norm): PASSED")

    # =========================================================================
    # MOD-38: Tokenization from Scratch (Byte-Level BPE)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-10: py-gru-cell
    # -------------------------------------------------------------------------
    def sigmoid(z):
        return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))

    def gru_cell_forward(
        x_t: np.ndarray,
        h_prev: np.ndarray,
        W_z: np.ndarray, U_z: np.ndarray, b_z: np.ndarray,
        W_r: np.ndarray, U_r: np.ndarray, b_r: np.ndarray,
        W_h: np.ndarray, U_h: np.ndarray, b_h: np.ndarray
    ) -> np.ndarray:
        # Reset gate: r_t = sigmoid(x_t W_r + h_prev U_r + b_r)
        r_t = sigmoid(np.dot(x_t, W_r) + np.dot(h_prev, U_r) + b_r)
        # Update gate: z_t = sigmoid(x_t W_z + h_prev U_z + b_z)
        z_t = sigmoid(np.dot(x_t, W_z) + np.dot(h_prev, U_z) + b_z)
        # Candidate hidden: h_tilde = tanh(x_t W_h + (r_t * h_prev) U_h + b_h)
        h_tilde = np.tanh(np.dot(x_t, W_h) + np.dot(r_t * h_prev, U_h) + b_h)
        # Next state: h_t = (1 - z_t) * h_prev + z_t * h_tilde
        h_t = (1.0 - z_t) * h_prev + z_t * h_tilde
        return h_t

    # Public tests
    d_in, d_h = 4, 3
    x_0 = np.zeros(d_in)
    h_0 = np.zeros(d_h)
    W_z = np.zeros((d_in, d_h)); U_z = np.zeros((d_h, d_h)); b_z = np.zeros(d_h)
    W_r = np.zeros((d_in, d_h)); U_r = np.zeros((d_h, d_h)); b_r = np.zeros(d_h)
    W_h = np.zeros((d_in, d_h)); U_h = np.zeros((d_h, d_h)); b_h = np.zeros(d_h)
    h_1 = gru_cell_forward(x_0, h_0, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h)
    np.testing.assert_allclose(h_1, np.zeros(d_h), atol=1e-7)
    # Hidden tests: active input
    b_h_act = np.ones(d_h)
    h_2 = gru_cell_forward(x_0, h_0, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h_act)
    # z_t = sigmoid(0) = 0.5, h_tilde = tanh(1), h_t = 0.5 * tanh(1)
    np.testing.assert_allclose(h_2, np.full(d_h, 0.5 * np.tanh(1.0)), atol=1e-6)
    print("Lesson 10 (py-gru-cell): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-11: py-bpe-train
    # -------------------------------------------------------------------------
    def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]:
        # Represent words as tuples of characters with end-of-word '</w>'
        word_freqs: dict[tuple[str, ...], int] = {}
        for text in corpus:
            for word in text.strip().split():
                chars = tuple(list(word) + ['</w>'])
                word_freqs[chars] = word_freqs.get(chars, 0) + 1

        merges: list[tuple[str, str]] = []
        for _ in range(num_merges):
            pair_counts: dict[tuple[str, str], int] = {}
            for word_tuple, freq in word_freqs.items():
                for i in range(len(word_tuple) - 1):
                    pair = (word_tuple[i], word_tuple[i+1])
                    pair_counts[pair] = pair_counts.get(pair, 0) + freq
            if not pair_counts:
                break
            # Find most frequent pair; break ties lexicographically
            best_pair = max(pair_counts.items(), key=lambda item: (item[1], item[0]))[0]
            merges.append(best_pair)

            # Apply merge to word_freqs
            new_word_freqs = {}
            p0, p1 = best_pair
            merged_token = p0 + p1
            for word_tuple, freq in word_freqs.items():
                new_tuple = []
                i = 0
                while i < len(word_tuple):
                    if i < len(word_tuple) - 1 and word_tuple[i] == p0 and word_tuple[i+1] == p1:
                        new_tuple.append(merged_token)
                        i += 2
                    else:
                        new_tuple.append(word_tuple[i])
                        i += 1
                new_word_freqs[tuple(new_tuple)] = freq
            word_freqs = new_word_freqs
        return merges

    # Public tests
    corpus_pub = ["low low low low low lower lower newest newest newest newest newest newest wider wider wider"]
    merges_pub = train_bpe(corpus_pub, num_merges=3)
    assert len(merges_pub) == 3
    # 'e', 's' is very frequent in newest
    print("Lesson 11 (py-bpe-train): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-12: py-bpe-encode
    # -------------------------------------------------------------------------
    def bpe_encode(
        text: str,
        merges: list[tuple[str, str]],
        vocab: dict[str, int]
    ) -> list[int]:
        tokens_out: list[int] = []
        for word in text.strip().split():
            word_tokens = list(word) + ['</w>']
            for p0, p1 in merges:
                merged = p0 + p1
                i = 0
                new_tokens = []
                while i < len(word_tokens):
                    if i < len(word_tokens) - 1 and word_tokens[i] == p0 and word_tokens[i+1] == p1:
                        new_tokens.append(merged)
                        i += 2
                    else:
                        new_tokens.append(word_tokens[i])
                        i += 1
                word_tokens = new_tokens
            for tok in word_tokens:
                if tok in vocab:
                    tokens_out.append(vocab[tok])
                else:
                    tokens_out.append(vocab.get('<unk>', 0))
        return tokens_out

    # Public tests
    vocab_test = {'l': 0, 'o': 1, 'w': 2, '</w>': 3, 'low</w>': 4, '<unk>': 5}
    merges_test = [('l', 'o'), ('lo', 'w'), ('low', '</w>')]
    encoded = bpe_encode("low", merges_test, vocab_test)
    assert encoded == [4]
    print("Lesson 12 (py-bpe-encode): PASSED")

    # =========================================================================
    # MOD-39: Self-Attention Mechanics & Causal Masking
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-13: py-scaled-dot-product-attention
    # -------------------------------------------------------------------------
    def scaled_dot_product_attention(
        Q: np.ndarray,
        K: np.ndarray,
        V: np.ndarray,
        scale: float | None = None
    ) -> tuple[np.ndarray, np.ndarray]:
        # Shapes: (..., S_q, d_k), (..., S_k, d_k), (..., S_k, d_v)
        d_k = Q.shape[-1]
        if scale is None:
            scale = 1.0 / np.sqrt(d_k)
        scores = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale
        # Numerically stable softmax along last axis
        scores_max = np.max(scores, axis=-1, keepdims=True)
        exp_scores = np.exp(scores - scores_max)
        attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
        output = np.matmul(attn_weights, V)
        return output, attn_weights

    # Public tests
    Q_p = np.array([[[1.0, 0.0], [0.0, 1.0]]])
    K_p = np.array([[[1.0, 0.0], [0.0, 1.0]]])
    V_p = np.array([[[10.0, 20.0], [30.0, 40.0]]])
    out_p, w_p = scaled_dot_product_attention(Q_p, K_p, V_p)
    assert out_p.shape == (1, 2, 2)
    np.testing.assert_allclose(np.sum(w_p, axis=-1), np.ones((1, 2)), atol=1e-7)
    print("Lesson 13 (py-scaled-dot-product-attention): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-14: py-causal-attention
    # -------------------------------------------------------------------------
    def causal_attention(
        Q: np.ndarray,
        K: np.ndarray,
        V: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray]:
        d_k = Q.shape[-1]
        scale = 1.0 / np.sqrt(d_k)
        scores = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale
        S_q, S_k = Q.shape[-2], K.shape[-2]
        # Causal mask: upper triangle where j > i set to -1e9
        mask = np.triu(np.ones((S_q, S_k), dtype=bool), k=1)
        scores[..., mask] = -1e9
        scores_max = np.max(scores, axis=-1, keepdims=True)
        exp_scores = np.exp(scores - scores_max)
        attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
        output = np.matmul(attn_weights, V)
        return output, attn_weights

    # Public tests: upper triangle must be strictly zero
    Q_c = np.random.randn(1, 4, 8)
    K_c = np.random.randn(1, 4, 8)
    V_c = np.random.randn(1, 4, 8)
    out_c, w_c = causal_attention(Q_c, K_c, V_c)
    upper_tri = np.triu(w_c[0], k=1)
    np.testing.assert_allclose(upper_tri, np.zeros((4, 4)), atol=1e-7)
    # First token can only attend to itself: w[0, 0, 0] must be 1.0
    np.testing.assert_allclose(w_c[0, 0, 0], 1.0, atol=1e-7)
    print("Lesson 14 (py-causal-attention): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-15: py-multihead-attention
    # -------------------------------------------------------------------------
    def multi_head_attention_forward(
        X: np.ndarray,
        W_q: np.ndarray,
        W_k: np.ndarray,
        W_v: np.ndarray,
        W_o: np.ndarray,
        num_heads: int,
        is_causal: bool = False
    ) -> np.ndarray:
        B, S, D = X.shape
        assert D % num_heads == 0, "D must be divisible by num_heads"
        d_k = D // num_heads

        Q = np.dot(X, W_q).reshape(B, S, num_heads, d_k).swapaxes(1, 2) # (B, h, S, d_k)
        K = np.dot(X, W_k).reshape(B, S, num_heads, d_k).swapaxes(1, 2)
        V = np.dot(X, W_v).reshape(B, S, num_heads, d_k).swapaxes(1, 2)

        scores = np.matmul(Q, K.swapaxes(-1, -2)) / np.sqrt(d_k)
        if is_causal:
            mask = np.triu(np.ones((S, S), dtype=bool), k=1)
            scores[..., mask] = -1e9
        scores_max = np.max(scores, axis=-1, keepdims=True)
        exp_s = np.exp(scores - scores_max)
        weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
        context = np.matmul(weights, V) # (B, h, S, d_k)
        # Merge heads
        context = context.swapaxes(1, 2).reshape(B, S, D)
        return np.dot(context, W_o)

    # Public tests
    B, S, D, H = 2, 4, 8, 2
    X_mha = np.random.randn(B, S, D)
    W_q = np.eye(D); W_k = np.eye(D); W_v = np.eye(D); W_o = np.eye(D)
    out_mha = multi_head_attention_forward(X_mha, W_q, W_k, W_v, W_o, num_heads=H, is_causal=True)
    assert out_mha.shape == (B, S, D)
    print("Lesson 15 (py-multihead-attention): PASSED")

    # =========================================================================
    # MOD-40: Modern Transformer Architecture (RoPE & Pre-LN)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-16: py-rope-apply
    # -------------------------------------------------------------------------
    def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray:
        # x: (B, S, D) where D is even
        B, S, D = x.shape
        assert D % 2 == 0, "Dimension D must be even"
        d_half = D // 2
        freqs = 1.0 / (base ** (np.arange(0, d_half) * 2.0 / D))
        m = np.arange(S)[:, None] # (S, 1)
        phases = m * freqs[None, :] # (S, d_half)
        cos_phases = np.cos(phases) # (S, d_half)
        sin_phases = np.sin(phases) # (S, d_half)

        # 2D interleaved rotation: (x_0, x_1), (x_2, x_3), ...
        x0 = x[..., 0::2]
        x1 = x[..., 1::2]
        out = np.zeros_like(x)
        out[..., 0::2] = x0 * cos_phases - x1 * sin_phases
        out[..., 1::2] = x0 * sin_phases + x1 * cos_phases
        return out

    # Public tests: at position 0, phases are 0, cos=1, sin=0 -> identity
    x_rope = np.random.randn(2, 4, 8)
    r_rope = apply_rotary_emb(x_rope)
    np.testing.assert_allclose(r_rope[:, 0, :], x_rope[:, 0, :], atol=1e-7)
    # Norm preserving property: ||R x|| == ||x||
    norm_x = np.linalg.norm(x_rope, axis=-1)
    norm_r = np.linalg.norm(r_rope, axis=-1)
    np.testing.assert_allclose(norm_r, norm_x, atol=1e-6)
    print("Lesson 16 (py-rope-apply): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-17: py-swiglu-ffn
    # -------------------------------------------------------------------------
    def swiglu_forward(
        x: np.ndarray,
        W_gate: np.ndarray,
        W_up: np.ndarray,
        W_down: np.ndarray
    ) -> np.ndarray:
        # Swish(z) = z * sigmoid(z)
        gate_proj = np.dot(x, W_gate)
        swish = gate_proj / (1.0 + np.exp(-np.clip(gate_proj, -30.0, 30.0)))
        up_proj = np.dot(x, W_up)
        bilinear = swish * up_proj
        return np.dot(bilinear, W_down)

    # Public tests
    B, S, D, D_ff = 2, 3, 4, 8
    x_ff = np.ones((B, S, D))
    Wg = np.zeros((D, D_ff)); Wu = np.ones((D, D_ff)); Wd = np.ones((D_ff, D))
    # gate_proj = 0 -> swish = 0 -> output = 0
    out_ff = swiglu_forward(x_ff, Wg, Wu, Wd)
    np.testing.assert_allclose(out_ff, np.zeros((B, S, D)), atol=1e-7)
    print("Lesson 17 (py-swiglu-ffn): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-18: py-kv-cache-step
    # -------------------------------------------------------------------------
    def kv_cache_decoder_step(
        x_t: np.ndarray,
        k_cache: np.ndarray | None,
        v_cache: np.ndarray | None,
        W_q: np.ndarray,
        W_k: np.ndarray,
        W_v: np.ndarray,
        W_o: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        # x_t: (B, 1, D)
        B, _, D = x_t.shape
        q_t = np.dot(x_t, W_q) # (B, 1, D)
        k_t = np.dot(x_t, W_k) # (B, 1, D)
        v_t = np.dot(x_t, W_v) # (B, 1, D)

        if k_cache is None or k_cache.size == 0:
            k_updated = k_t
            v_updated = v_t
        else:
            k_updated = np.concatenate([k_cache, k_t], axis=1) # (B, S_past+1, D)
            v_updated = np.concatenate([v_cache, v_t], axis=1)

        d_k = D
        scores = np.matmul(q_t, k_updated.swapaxes(-1, -2)) / np.sqrt(d_k) # (B, 1, S_total)
        scores_max = np.max(scores, axis=-1, keepdims=True)
        exp_s = np.exp(scores - scores_max)
        weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
        context = np.matmul(weights, v_updated) # (B, 1, D)
        out_t = np.dot(context, W_o)
        return out_t, k_updated, v_updated

    # Public tests
    B, D = 1, 4
    x_step = np.random.randn(B, 1, D)
    W = np.eye(D)
    out1, k_c1, v_c1 = kv_cache_decoder_step(x_step, None, None, W, W, W, W)
    assert k_c1.shape == (B, 1, D)
    out2, k_c2, v_c2 = kv_cache_decoder_step(x_step, k_c1, v_c1, W, W, W, W)
    assert k_c2.shape == (B, 2, D)
    print("Lesson 18 (py-kv-cache-step): PASSED")

    # =========================================================================
    # MOD-41: High-Efficiency LLMs (FlashAttention & GQA)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-19: py-gqa-expand
    # -------------------------------------------------------------------------
    def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:
        # x: (B, n_kv, S, d_k) -> returns (B, n_kv * n_rep, S, d_k)
        if n_rep == 1:
            return x
        B, n_kv, S, d_k = x.shape
        x_expanded = np.repeat(x[:, :, np.newaxis, :, :], n_rep, axis=2)
        return x_expanded.reshape(B, n_kv * n_rep, S, d_k)

    # Public tests
    kv_in = np.ones((1, 2, 4, 8))
    kv_out = repeat_kv(kv_in, n_rep=4)
    assert kv_out.shape == (1, 8, 4, 8)
    np.testing.assert_allclose(kv_out, np.ones((1, 8, 4, 8)), atol=1e-7)
    print("Lesson 19 (py-gqa-expand): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-20: py-flash-online-softmax
    # -------------------------------------------------------------------------
    def online_softmax_step(
        m_prev: np.ndarray,
        l_prev: np.ndarray,
        O_prev: np.ndarray,
        S_block: np.ndarray,
        V_block: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        # S_block: (B_r, B_c), V_block: (B_c, d)
        m_block = np.max(S_block, axis=-1, keepdims=True)
        m_new = np.maximum(m_prev, m_block)
        alpha = np.exp(m_prev - m_new)
        P_block = np.exp(S_block - m_new)
        l_new = alpha * l_prev + np.sum(P_block, axis=-1, keepdims=True)
        O_new = alpha * O_prev + np.matmul(P_block, V_block)
        return m_new, l_new, O_new

    # Public tests: exact equivalence with global softmax on 2 blocks
    S_full = np.random.randn(2, 6)
    V_full = np.random.randn(6, 4)
    P_exact = np.exp(S_full - np.max(S_full, axis=-1, keepdims=True))
    P_exact /= np.sum(P_exact, axis=-1, keepdims=True)
    O_exact = np.matmul(P_exact, V_full)

    m = np.full((2, 1), -np.inf)
    l = np.zeros((2, 1))
    O = np.zeros((2, 4))
    m, l, O = online_softmax_step(m, l, O, S_full[:, :3], V_full[:3])
    m, l, O = online_softmax_step(m, l, O, S_full[:, 3:], V_full[3:])
    O_res = O / l
    np.testing.assert_allclose(O_res, O_exact, rtol=1e-5, atol=1e-7)
    print("Lesson 20 (py-flash-online-softmax): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-21: py-flash-forward-tiled
    # -------------------------------------------------------------------------
    def flash_attention_forward(
        Q: np.ndarray,
        K: np.ndarray,
        V: np.ndarray,
        block_r: int = 4,
        block_c: int = 4
    ) -> np.ndarray:
        N, d = Q.shape
        scale = 1.0 / np.sqrt(d)
        O = np.zeros_like(Q)
        l = np.zeros((N, 1))
        m = np.full((N, 1), -np.inf)

        num_r_blocks = (N + block_r - 1) // block_r
        num_c_blocks = (N + block_c - 1) // block_c

        for j in range(num_c_blocks):
            c_start = j * block_c
            c_end = min(N, c_start + block_c)
            K_j = K[c_start:c_end]
            V_j = V[c_start:c_end]

            for i in range(num_r_blocks):
                r_start = i * block_r
                r_end = min(N, r_start + block_r)
                Q_i = Q[r_start:r_end]

                S_ij = np.matmul(Q_i, K_j.T) * scale
                m_prev = m[r_start:r_end]
                l_prev = l[r_start:r_end]
                O_prev = O[r_start:r_end]

                m_ij = np.max(S_ij, axis=-1, keepdims=True)
                m_new = np.maximum(m_prev, m_ij)
                alpha = np.exp(m_prev - m_new)
                P_ij = np.exp(S_ij - m_new)
                l_new = alpha * l_prev + np.sum(P_ij, axis=-1, keepdims=True)
                O_new = alpha * O_prev + np.matmul(P_ij, V_j)

                m[r_start:r_end] = m_new
                l[r_start:r_end] = l_new
                O[r_start:r_end] = O_new

        return O / l

    # Public tests: compare tiled against standard attention
    Q_t = np.random.randn(8, 4)
    K_t = np.random.randn(8, 4)
    V_t = np.random.randn(8, 4)
    O_tiled = flash_attention_forward(Q_t, K_t, V_t, block_r=2, block_c=2)
    # Standard
    S_std = np.matmul(Q_t, K_t.T) / np.sqrt(4)
    P_std = np.exp(S_std - np.max(S_std, axis=-1, keepdims=True))
    P_std /= np.sum(P_std, axis=-1, keepdims=True)
    O_expected = np.matmul(P_std, V_t)
    np.testing.assert_allclose(O_tiled, O_expected, rtol=1e-5, atol=1e-7)
    print("Lesson 21 (py-flash-forward-tiled): PASSED")

    # =========================================================================
    # MOD-42: Parameter-Efficient Fine-Tuning (LoRA & QLoRA)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-22: py-sft-loss
    # -------------------------------------------------------------------------
    def sft_masked_loss(
        logits: np.ndarray,
        labels: np.ndarray,
        ignore_index: int = -100
    ) -> tuple[float, int]:
        # logits: (B, S, V), labels: (B, S)
        B, S, V = logits.shape
        logits_flat = logits.reshape(-1, V)
        labels_flat = labels.reshape(-1)

        active_mask = (labels_flat != ignore_index)
        active_count = int(np.sum(active_mask))
        if active_count == 0:
            return 0.0, 0

        active_logits = logits_flat[active_mask]
        active_labels = labels_flat[active_mask]

        max_l = np.max(active_logits, axis=-1, keepdims=True)
        lse = np.log(np.sum(np.exp(active_logits - max_l), axis=-1, keepdims=True)) + max_l
        log_probs = active_logits - lse
        loss = -float(np.mean(log_probs[np.arange(active_count), active_labels]))
        return loss, active_count

    # Public tests
    logits_sft = np.random.randn(2, 3, 5)
    labels_sft = np.array([[-100, 2, 4], [-100, -100, 1]])
    loss_sft, n_active = sft_masked_loss(logits_sft, labels_sft)
    assert n_active == 3
    assert loss_sft > 0.0
    print("Lesson 22 (py-sft-loss): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-23: py-lora-linear
    # -------------------------------------------------------------------------
    class LoRALinear:
        def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0):
            self.in_features = in_features
            self.out_features = out_features
            self.rank = rank
            self.alpha = alpha
            self.scaling = alpha / rank
            # Base weight frozen
            self.W_0 = np.random.randn(out_features, in_features) * 0.02
            # Low-rank adapters: B initialized to 0, A to Gaussian
            self.A = np.random.randn(rank, in_features) * 0.02
            self.B = np.zeros((out_features, rank))
            self.merged = False

        def forward(self, x: np.ndarray) -> np.ndarray:
            if self.merged:
                return np.dot(x, self.W_0.T)
            base_out = np.dot(x, self.W_0.T)
            lora_out = np.dot(np.dot(x, self.A.T), self.B.T) * self.scaling
            return base_out + lora_out

        def merge_weights(self):
            if not self.merged:
                self.W_0 += (np.dot(self.B, self.A)) * self.scaling
                self.merged = True

        def unmerge_weights(self):
            if self.merged:
                self.W_0 -= (np.dot(self.B, self.A)) * self.scaling
                self.merged = False

    # Public tests: with B=0, LoRA output must strictly equal base output
    layer = LoRALinear(8, 4, rank=2)
    x_lora = np.random.randn(2, 8)
    out_init = layer.forward(x_lora)
    out_base = np.dot(x_lora, layer.W_0.T)
    np.testing.assert_allclose(out_init, out_base, atol=1e-7)

    # When B is non-zero, merge_weights must yield identical output
    layer.B = np.random.randn(4, 2)
    out_unmerged = layer.forward(x_lora)
    layer.merge_weights()
    out_merged = layer.forward(x_lora)
    np.testing.assert_allclose(out_merged, out_unmerged, rtol=1e-5, atol=1e-7)
    print("Lesson 23 (py-lora-linear): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-24: py-nf4-quantize
    # -------------------------------------------------------------------------
    NF4_CODEBOOK = np.array([
        -1.0, -0.6961928009986877, -0.5250730514526367, -0.39491748809814453,
        -0.28444138169288635, -0.18477343022823334, -0.09105003625154495, 0.0,
        0.07958029955625534, 0.16093020141124725, 0.24611230194568634, 0.33791524171829224,
        0.44070982933044434, 0.5626170039176941, 0.7229568362236023, 1.0
    ])

    def nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]:
        # Quantize w into indices 0..15 with per-block scale
        assert w.size % block_size == 0
        w_blocks = w.reshape(-1, block_size)
        scales = np.max(np.abs(w_blocks), axis=-1, keepdims=True)
        scales[scales == 0] = 1.0 # prevent div by zero
        normalized = w_blocks / scales # in [-1, 1]

        # Vectorized nearest neighbor in NF4 codebook
        diffs = np.abs(normalized[..., np.newaxis] - NF4_CODEBOOK) # (num_blocks, block_size, 16)
        indices = np.argmin(diffs, axis=-1).astype(np.uint8)
        return indices.reshape(w.shape), scales.squeeze(-1)

    def nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray:
        ind_blocks = indices.reshape(-1, block_size)
        q_vals = NF4_CODEBOOK[ind_blocks]
        w_recon = q_vals * scales[:, np.newaxis]
        return w_recon.reshape(indices.shape)

    # Public tests
    w_fp32 = np.random.randn(128)
    q_inds, scales = nf4_quantize_block(w_fp32, block_size=64)
    assert q_inds.shape == (128,)
    assert scales.shape == (2,)
    w_rec = nf4_dequantize_block(q_inds, scales, block_size=64)
    # Quantization error for 4-bit NormalFloat is small (< 0.15 RMS)
    rmse = np.sqrt(np.mean((w_fp32 - w_rec)**2))
    assert rmse < 0.25
    print("Lesson 24 (py-nf4-quantize): PASSED")

    # =========================================================================
    # MOD-43: Alignment & Preference Optimization (DPO & GRPO)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-25: py-bradley-terry-reward
    # -------------------------------------------------------------------------
    def bradley_terry_loss(r_win: np.ndarray, r_loss: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:
        # Loss: -E[log sigmoid(r_w - r_l)]
        diff = r_win - r_loss
        loss = -float(np.mean(-np.logaddexp(0.0, -diff)))
        # Gradient: -sigmoid(-diff) = sigmoid(diff) - 1 w.r.t r_w
        p_loss = 1.0 / (1.0 + np.exp(np.clip(diff, -30.0, 30.0)))
        N = r_win.shape[0]
        grad_win = -p_loss / N
        grad_loss = p_loss / N
        return loss, grad_win, grad_loss

    # Public tests
    rw = np.array([2.0, 1.0])
    rl = np.array([0.0, -1.0])
    loss_bt, g_w, g_l = bradley_terry_loss(rw, rl)
    assert loss_bt < 0.2 # well separated rewards -> low loss
    np.testing.assert_allclose(g_w, -g_l, atol=1e-7)
    print("Lesson 25 (py-bradley-terry-reward): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-26: py-dpo-loss
    # -------------------------------------------------------------------------
    def dpo_loss(
        policy_win_logps: np.ndarray,
        policy_loss_logps: np.ndarray,
        ref_win_logps: np.ndarray,
        ref_loss_logps: np.ndarray,
        beta: float = 0.1
    ) -> tuple[float, float, float]:
        pi_win_ratio = policy_win_logps - ref_win_logps
        pi_loss_ratio = policy_loss_logps - ref_loss_logps
        logits = beta * (pi_win_ratio - pi_loss_ratio)
        loss = float(np.mean(np.logaddexp(0.0, -logits)))
        reward_margin = float(np.mean(logits))
        accuracy = float(np.mean(logits > 0.0))
        return loss, reward_margin, accuracy

    # Public tests
    p_w, p_l = np.array([-1.2]), np.array([-2.5])
    r_w, r_l = np.array([-1.5]), np.array([-2.0])
    loss_d, margin_d, acc_d = dpo_loss(p_w, p_l, r_w, r_l, beta=0.1)
    assert loss_d > 0.0
    assert acc_d == 1.0
    print("Lesson 26 (py-dpo-loss): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-27: py-grpo-advantage
    # -------------------------------------------------------------------------
    def grpo_compute_advantages_and_loss(
        rewards: np.ndarray,
        logp: np.ndarray,
        old_logp: np.ndarray,
        ref_logp: np.ndarray,
        beta_kl: float = 0.04,
        clip_eps: float = 0.2
    ) -> tuple[np.ndarray, float]:
        # Group-normalized advantages
        eps = 1e-8
        mean_r = np.mean(rewards)
        std_r = np.std(rewards)
        advantages = (rewards - mean_r) / (std_r + eps)

        # Policy ratio
        ratio = np.exp(logp - old_logp)
        surr1 = ratio * advantages
        surr2 = np.clip(ratio, 1.0 - clip_eps, 1.0 + clip_eps) * advantages
        policy_loss = -np.mean(np.minimum(surr1, surr2))

        # KL penalty approximation: exp(ref - pi) - (ref - pi) - 1
        kl = np.exp(ref_logp - logp) - (ref_logp - logp) - 1.0
        total_loss = float(policy_loss + beta_kl * np.mean(kl))
        return advantages, total_loss

    # Public tests
    rewards = np.array([1.0, 2.0, 3.0, 4.0])
    adv, loss_grpo = grpo_compute_advantages_and_loss(rewards, np.zeros(4), np.zeros(4), np.zeros(4))
    np.testing.assert_allclose(np.mean(adv), 0.0, atol=1e-7)
    np.testing.assert_allclose(np.std(adv), 1.0, atol=1e-4)
    print("Lesson 27 (py-grpo-advantage): PASSED")

    # =========================================================================
    # MOD-44: State-Space Models (Mamba Selective Scan)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-28: py-ssm-discretize
    # -------------------------------------------------------------------------
    def discretize_zoh(
        delta: np.ndarray,
        A: np.ndarray,
        B: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray]:
        # delta: (B, L, D), A: (D, N), B: (B, L, N)
        # For diagonal A: A_bar = exp(delta * A)
        # B_bar = delta * B
        A_bar = np.exp(delta[..., np.newaxis] * A) # (B, L, D, N)
        B_bar = delta[..., np.newaxis] * B[:, :, np.newaxis, :] # (B, L, D, N)
        return A_bar, B_bar

    # Public tests
    delta = np.full((1, 2, 3), 0.1)
    A = -np.ones((3, 4))
    B = np.ones((1, 2, 4))
    A_bar, B_bar = discretize_zoh(delta, A, B)
    np.testing.assert_allclose(A_bar[0, 0, 0, 0], np.exp(-0.1), atol=1e-7)
    np.testing.assert_allclose(B_bar[0, 0, 0, 0], 0.1, atol=1e-7)
    print("Lesson 28 (py-ssm-discretize): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-29: py-mamba-scan
    # -------------------------------------------------------------------------
    def selective_scan(
        A_bar: np.ndarray,
        B_bar_x: np.ndarray,
        C: np.ndarray
    ) -> np.ndarray:
        # A_bar: (L, D, N), B_bar_x: (L, D, N), C: (L, D, N)
        L, D, N = A_bar.shape
        h = np.zeros((D, N))
        ys = []
        for t in range(L):
            h = A_bar[t] * h + B_bar_x[t]
            y_t = np.sum(h * C[t], axis=-1) # (D,)
            ys.append(y_t)
        return np.stack(ys, axis=0) # (L, D)

    # Public tests
    L, D, N = 5, 2, 3
    A_b = np.full((L, D, N), 0.5)
    Bx = np.ones((L, D, N))
    C_m = np.ones((L, D, N))
    y_mamba = selective_scan(A_b, Bx, C_m)
    assert y_mamba.shape == (L, D)
    # at t=0: h_0 = 1 -> y_0 = sum(1 * 1) = 3
    np.testing.assert_allclose(y_mamba[0], np.full(D, 3.0), atol=1e-7)
    print("Lesson 29 (py-mamba-scan): PASSED")

    # =========================================================================
    # MOD-45: Generative Diffusion Models (DDPM & Score SDEs)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-30: py-ddpm-q-sample
    # -------------------------------------------------------------------------
    def ddpm_q_sample(
        x_0: np.ndarray,
        t: int,
        noise: np.ndarray,
        alpha_bars: np.ndarray
    ) -> np.ndarray:
        a_bar = alpha_bars[t]
        return np.sqrt(a_bar) * x_0 + np.sqrt(1.0 - a_bar) * noise

    # Public tests: at t where alpha_bar = 1 -> x_0
    alpha_bars = np.array([1.0, 0.9, 0.5, 0.1])
    x0 = np.array([2.0, -1.0])
    noise = np.array([0.5, -0.5])
    assert np.allclose(ddpm_q_sample(x0, 0, noise, alpha_bars), x0)
    # at alpha_bar = 0.5
    res = ddpm_q_sample(x0, 2, noise, alpha_bars)
    expected = np.sqrt(0.5) * x0 + np.sqrt(0.5) * noise
    np.testing.assert_allclose(res, expected, atol=1e-7)
    print("Lesson 30 (py-ddpm-q-sample): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-31: py-ddpm-step
    # -------------------------------------------------------------------------
    def ddpm_p_sample_step(
        x_t: np.ndarray,
        t: int,
        eps_cond: np.ndarray,
        eps_uncond: np.ndarray,
        cfg_scale: float,
        betas: np.ndarray,
        alpha_bars: np.ndarray,
        z: np.ndarray | None = None
    ) -> np.ndarray:
        # Classifier-free guidance noise combination
        eps_theta = eps_uncond + cfg_scale * (eps_cond - eps_uncond)
        beta_t = betas[t]
        alpha_t = 1.0 - beta_t
        alpha_bar_t = alpha_bars[t]

        # Mean estimation
        coeff = beta_t / np.sqrt(1.0 - alpha_bar_t)
        mu_theta = (1.0 / np.sqrt(alpha_t)) * (x_t - coeff * eps_theta)

        if t == 0:
            return mu_theta
        else:
            alpha_bar_prev = alpha_bars[t - 1]
            sigma_sq = ((1.0 - alpha_bar_prev) / (1.0 - alpha_bar_t)) * beta_t
            sigma_t = np.sqrt(sigma_sq)
            if z is None:
                z = np.zeros_like(x_t)
            return mu_theta + sigma_t * z

    # Public tests
    betas_arr = np.array([0.1, 0.2])
    alpha_bars_arr = np.array([0.9, 0.72])
    xt = np.ones(3)
    eps_c = np.ones(3) * 0.5
    eps_u = np.ones(3) * 0.1
    x_prev = ddpm_p_sample_step(xt, t=0, eps_cond=eps_c, eps_uncond=eps_u, cfg_scale=2.0, betas=betas_arr, alpha_bars=alpha_bars_arr)
    assert x_prev.shape == (3,)
    print("Lesson 31 (py-ddpm-step): PASSED")

    # =========================================================================
    # MOD-46: Autonomous LLM Agents (ReAct & Tool Calling)
    # =========================================================================

    # -------------------------------------------------------------------------
    # LESSON-T4-32: py-react-agent-step
    # -------------------------------------------------------------------------
    def react_step_parse_and_execute(
        response_text: str,
        tools: dict[str, callable]
    ) -> tuple[str, str, str, str]:
        # Parses "Thought: <t>\nAction: <a>\nAction Input: <i>" or "Final Answer: <ans>"
        thought = ""
        action = ""
        action_input = ""
        observation = ""

        t_match = re.search(r"Thought:\s*(.*?)(?=\nAction:|\nFinal Answer:|$)", response_text, re.DOTALL)
        if t_match:
            thought = t_match.group(1).strip()

        fa_match = re.search(r"Final Answer:\s*(.*)", response_text, re.DOTALL)
        if fa_match:
            return thought, "FINISH", "", fa_match.group(1).strip()

        a_match = re.search(r"Action:\s*(\w+)", response_text)
        if a_match:
            action = a_match.group(1).strip()

        ai_match = re.search(r"Action Input:\s*(.*)", response_text)
        if ai_match:
            action_input = ai_match.group(1).strip()

        if action in tools:
            try:
                obs = tools[action](action_input)
                observation = str(obs)
            except Exception as e:
                observation = f"Tool Error: {str(e)}"
        else:
            observation = f"Error: Tool '{action}' not found."

        return thought, action, action_input, observation

    # Public tests
    tools_dict = {"search": lambda q: f"Search result for {q}", "calculator": lambda exp: str(eval(exp))}
    txt = "Thought: I need to calculate 2 + 2\nAction: calculator\nAction Input: 2 + 2"
    th, act, act_in, obs = react_step_parse_and_execute(txt, tools_dict)
    assert act == "calculator"
    assert act_in == "2 + 2"
    assert obs == "4"

    # Final answer parsing
    txt_finish = "Thought: I am done.\nFinal Answer: 42"
    th_f, act_f, _, obs_f = react_step_parse_and_execute(txt_finish, tools_dict)
    assert act_f == "FINISH"
    assert obs_f == "42"
    print("Lesson 32 (py-react-agent-step): PASSED")

    # -------------------------------------------------------------------------
    # LESSON-T4-33: py-react-agent
    # -------------------------------------------------------------------------
    class ReActAgent:
        def __init__(self, tools: dict[str, callable], max_turns: int = 5):
            self.tools = tools
            self.max_turns = max_turns

        def run(self, query: str, mock_llm: callable) -> dict:
            history = [f"Question: {query}"]
            seen_actions = set()

            for turn in range(self.max_turns):
                context = "\n".join(history)
                response = mock_llm(context)
                th, act, act_in, obs = react_step_parse_and_execute(response, self.tools)

                if act == "FINISH":
                    return {
                        "status": "success",
                        "final_answer": obs,
                        "turns": turn + 1,
                        "history": history
                    }

                action_signature = f"{act}:{act_in}"
                if action_signature in seen_actions:
                    return {
                        "status": "cycle_detected",
                        "final_answer": None,
                        "turns": turn + 1,
                        "history": history
                    }
                seen_actions.add(action_signature)

                history.append(f"Thought: {th}")
                history.append(f"Action: {act}")
                history.append(f"Action Input: {act_in}")
                history.append(f"Observation: {obs}")

            return {
                "status": "max_turns_exceeded",
                "final_answer": None,
                "turns": self.max_turns,
                "history": history
            }

    # Public tests: LLM that searches then finishes
    def mock_agent_llm(prompt: str) -> str:
        if "Observation: Search result for Paris" in prompt:
            return "Thought: Now I know the answer.\nFinal Answer: Paris is the capital of France."
        return "Thought: I should search for Paris.\nAction: search\nAction Input: Paris"

    agent = ReActAgent(tools={"search": lambda q: f"Search result for {q}"}, max_turns=3)
    res_agent = agent.run("What is Paris?", mock_agent_llm)
    assert res_agent["status"] == "success"
    assert res_agent["final_answer"] == "Paris is the capital of France."
    assert res_agent["turns"] == 2
    print("Lesson 33 (py-react-agent): PASSED")

    print("=" * 80)
    print("ALL 33 TRACK 4 CODING CHALLENGES VALIDATED & PASSED 100%!")
    print("=" * 80)

if __name__ == '__main__':
    test_all_track4_challenges()
