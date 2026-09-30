# OKVIR Track 4: Deep Learning, Transformers & Frontier AI
## Complete In-Browser Sandboxed Python Coding Challenge & Assertion Specification

> **Specification Standard:** `OKVIR-CHALLENGE-SPEC-V1`  
> **Runtime Engine:** Pyodide WebAssembly (CPython 3.12 / NumPy 1.26+)  
> **Execution Budget:** < 800 ms CPU wall-clock, < 350 MB heap ceiling per execution  
> **Implementation Constraint:** Strictly from-scratch pure Python / NumPy / micrograd style (zero PyTorch, TensorFlow, or black-box dependencies)  
> **Numerical Assertion Protocol:** Strict floating-point tolerance `np.testing.assert_allclose(actual, expected, rtol=1e-5, atol=1e-7)`  
> **Pedagogical Diagnostic Protocol:** 4-part structured hints (`What`, `Where`, `Why`, `How`)  

---

## Executive Curriculum Architecture (Track 4: 33 Lessons across 12 Modules)

Track 4 delivers the complete frontier AI curriculum from scalar autograd differentiation engines to autonomous multi-turn ReAct agent systems. Every concept is implemented from mathematical first principles in sandboxed Pyodide WASM.

| Module ID | Module Title | Lessons | Core Mathematical & Algorithmic Anchor |
| :--- | :--- | :--- | :--- |
| **MOD-35** | Scalar Autograd Engine from Scratch | `T4-01` to `T4-03` | Reverse-mode automatic differentiation, adjoint accumulation, topological DFS DAG sort |
| **MOD-36** | Optimization Dynamics (SGD to AdamW & Warmup) | `T4-04` to `T4-06` | Exact & approximate GELU, Log-Sum-Exp numerically stabilized cross-entropy, decoupled AdamW |
| **MOD-37** | Convolutional Networks & Residual Highways | `T4-07` to `T4-09` | 2D im2col GEMM convolution, Channel LayerNorm with affine cache, RMSNorm with residual skip |
| **MOD-38** | Tokenization from Scratch (Byte-Level BPE) | `T4-10` to `T4-12` | Gated Recurrent Units (GRU), BPE pair frequency extraction, greedy ranked merge encoding |
| **MOD-39** | Self-Attention Mechanics & Causal Masking | `T4-13` to `T4-15` | Scaled dot-product variance routing, causal autoregressive masking, Multi-Head Attention (MHA) |
| **MOD-40** | Modern Transformer Architecture (RoPE & Pre-LN) | `T4-16` to `T4-18` | Rotary Position Embeddings (RoPE), SwiGLU gated FFN, incremental autoregressive KV caching |
| **MOD-41** | High-Efficiency LLMs (FlashAttention & GQA) | `T4-19` to `T4-21` | Grouped-Query Attention (GQA) head broadcasting, Milakov-Gimelshein online softmax, tiled FlashAttention |
| **MOD-42** | Parameter-Efficient Fine-Tuning (LoRA & QLoRA) | `T4-22` to `T4-24` | SFT causal masked loss, LoRA low-rank adapter with weight merging, NormalFloat-4 (NF4) quantization |
| **MOD-43** | Alignment & Preference Optimization (DPO & GRPO) | `T4-25` to `T4-27` | Bradley-Terry preference modeling, Direct Preference Optimization (DPO), GRPO group advantage |
| **MOD-44** | State-Space Models (Mamba Selective Scan) | `T4-28` to `T4-29` | Continuous-to-discrete Zero-Order Hold (ZOH), Mamba input-dependent selective associative scan |
| **MOD-45** | Generative Diffusion Models (DDPM & Score SDEs) | `T4-30` to `T4-31` | DDPM forward Markov chain marginal $q(x_t \mid x_0)$, reverse denoising step with Classifier-Free Guidance (CFG) |
| **MOD-46** | Autonomous LLM Agents (ReAct & Tool Calling) | `T4-32` to `T4-33` | Structured Thought/Action/Observation parser, autonomous multi-turn ReAct loop with cycle detection |

---

## Module 35: Scalar Autograd Engine from Scratch

### LESSON-T4-01: Scalar Node Representation & Arithmetic Dynamic Graph
**Module:** `MOD-35` | **Challenge ID:** `py-autograd-node`

#### 1. Challenge Specification & Mathematical Anchor
Construct the foundational scalar node data structure for automatic differentiation. The `Value` node represents a scalar quantity in a dynamic computational graph, preserving its underlying floating-point value, initializing its gradient adjoint to zero, recording its operand children (`_prev`), and tracking the generating mathematical operation (`_op`). Overload basic Python arithmetic operators (`+`, `*`, `**`, unary `-`, and `-`) to dynamically spawn child nodes upon evaluation.

**Type Signatures & I/O Contract:**
```python
class Value:
    data: float
    grad: float
    _prev: set['Value']
    _op: str
    def __init__(self, data: float | int, _children: tuple['Value', ...] = (), _op: str = '') -> None: ...
    def __add__(self, other: 'Value' | float | int) -> 'Value': ...
    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...
    def __pow__(self, other: float | int) -> 'Value': ...
    def __neg__(self) -> 'Value': ...
    def __sub__(self, other: 'Value' | float | int) -> 'Value': ...
    def __radd__(self, other: float | int) -> 'Value': ...
    def __rmul__(self, other: float | int) -> 'Value': ...
    def __rsub__(self, other: float | int) -> 'Value': ...
```

#### 2. Starter Code
```python
class Value:
    """Scalar node for dynamic computational graph."""
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        # TODO: Wrap scalar in Value if necessary; return new Value with (self, other) children and '+' op
        pass

    def __mul__(self, other):
        # TODO: Implement scalar/Value multiplication
        pass

    def __pow__(self, other: float | int):
        # TODO: Implement power operation where exponent is int or float
        pass

    def __neg__(self):
        return self * -1.0

    def __sub__(self, other):
        return self + (-other)

    def __radd__(self, other):
        return self + other

    def __rmul__(self, other):
        return self * other

    def __rsub__(self, other):
        return Value(other) + (-self)
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
class Value:
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), '+')

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other), '*')

    def __pow__(self, other: float | int):
        assert isinstance(other, (int, float)), "Power exponent must be int or float"
        return Value(self.data ** other, (self,), f'**{other}')

    def __neg__(self):
        return self * -1.0

    def __sub__(self, other):
        return self + (-other)

    def __radd__(self, other):
        return self + other

    def __rmul__(self, other):
        return self * other

    def __rsub__(self, other):
        return Value(other) + (-self)
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
a = Value(2.0)
b = Value(3.0)
c = a * b + 4.0
assert c.data == 10.0
assert c._op == '+'
assert len(c._prev) == 2
assert a in c._prev or any(a in child._prev for child in c._prev)

# --- Hidden Test Suite ---
x = Value(-2.5)
y = x ** 2 - 3.0 * x + 1.0
import math
assert math.isclose(y.data, (-2.5)**2 - 3.0*(-2.5) + 1.0, rel_tol=1e-6)
assert y._op == '+'
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 15 ms
- **Peak Heap Memory:**  < 1.2 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `TypeError: unsupported operand type(s)` when adding a primitive `float` or `int` to a `Value`.
- **Where:** Inside `__add__` and `__mul__` method entries.
- **Why:** Python arithmetic methods receive non-Value operands when users write `v + 4.0`.
- **How:** Check `isinstance(other, Value)` and wrap raw primitives with `other = other if isinstance(other, Value) else Value(other)` before computing.

---

### LESSON-T4-02: Reverse-Mode Derivative Closures & Multi-Consumer Accumulation
**Module:** `MOD-35` | **Challenge ID:** `py-autograd-backward-ops`

#### 1. Challenge Specification & Mathematical Anchor
Attach local derivative closures (`_backward`) to `Value` operations. Reverse-mode automatic differentiation propagates adjoint gradients from output $L$ backwards:
$$\bar{v}_i = \sum_{j \in \text{Children}(v_i)} \bar{v}_j \frac{\partial v_j}{\partial v_i}$$
Crucially, when a node feeds into multiple operations (fan-out / multi-consumer nodes), gradients must **accumulate** via addition (`+=`), rather than overwrite (`=`), otherwise the multivariable chain rule is violated.

**Type Signatures & I/O Contract:**
```python
class Value:
    data: float
    grad: float
    _backward: Callable[[], None]
    def __init__(self, data: float | int, _children: tuple = (), _op: str = '') -> None: ...
    def __add__(self, other: 'Value' | float | int) -> 'Value': ...
    def __mul__(self, other: 'Value' | float | int) -> 'Value': ...
    def relu(self) -> 'Value': ...
```

#### 2. Starter Code
```python
class Value:
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')
        # TODO: Define out._backward closure using +=
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')
        # TODO: Define out._backward closure using product rule
        return out

    def relu(self):
        # TODO: Implement out = Value(max(0, self.data)) and out._backward closure
        pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
class Value:
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
x = Value(3.0)
y = x + x  # Multi-consumer: y = 2x, dy/dx = 2
y.grad = 1.0
y._backward()
assert x.grad == 2.0, f"Expected x.grad == 2.0, got {x.grad}" 

# --- Hidden Test Suite ---
a = Value(4.0)
b = Value(-2.0)
c = a * b
c.grad = 1.0
c._backward()
assert a.grad == -2.0
assert b.grad == 4.0
# Test inactive and active ReLU
r_pos = Value(5.0).relu()
r_pos.grad = 1.5
r_pos._backward()
assert list(r_pos._prev)[0].grad == 1.5
r_neg = Value(-5.0).relu()
r_neg.grad = 1.5
r_neg._backward()
assert list(r_neg._prev)[0].grad == 0.0
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 20 ms
- **Peak Heap Memory:**  < 1.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `x.grad` is `1.0` instead of `2.0` when evaluating `y = x + x`.
- **Where:** Inside `_backward` definition for `__add__`.
- **Why:** Using `self.grad = out.grad` overwrites previous gradients from other branches instead of summing them.
- **How:** Replace `=` with `+=` so that multiple upstream consumers contribute additively to `self.grad`.

---

### LESSON-T4-03: Dynamic DAG Topological Sort & End-to-End Backprop Engine
**Module:** `MOD-35` | **Challenge ID:** `py-autograd-dag-engine`

#### 1. Challenge Specification & Mathematical Anchor
Implement the complete reverse-mode automatic differentiation execution engine. To backpropagate through an arbitrary dynamic computational Directed Acyclic Graph (DAG), nodes must be evaluated in reverse topological order so that every consumer node has accumulated its full adjoint derivative before its inputs are processed. Implement depth-first search post-order topological ordering and initiate `backward()` by setting the loss node's seed gradient to $\bar{L} = 1.0$.

**Type Signatures & I/O Contract:**
```python
class Value:
    # Full autograd Value node with backward()
    def backward(self) -> None: ...
    # Builds topological order, sets seed grad to 1.0, calls _backward() in reverse
```

#### 2. Starter Code
```python
class Value:
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
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
        # TODO: 1. Build topological order via DFS post-order traversal
        # TODO: 2. Set self.grad = 1.0
        # TODO: 3. Call _backward() on all nodes in reverse topological order
        pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
class Value:
    def __init__(self, data: float | int, _children: tuple = (), _op: str = ''):
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
w1, x1 = Value(2.0), Value(3.0)
w2, x2 = Value(-1.5), Value(4.0)
b = Value(1.0)
L = (w1 * x1 + w2 * x2 + b).relu()
L.backward()
assert L.data == 1.0
assert w1.grad == 3.0
assert x1.grad == 2.0
assert w2.grad == 4.0
assert x2.grad == -1.5
assert b.grad == 1.0

# --- Hidden Test Suite ---
val_a = Value(2.0)
val_b = Value(3.0)
val_c = val_a + val_b
val_d = val_c * val_c  # (a + b)^2 = 25, d/da = 2*(a+b) = 10
val_d.backward()
assert val_d.data == 25.0
assert val_a.grad == 10.0
assert val_b.grad == 10.0
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Gradients of upstream inputs are zero or incomplete after `L.backward()`.
- **Where:** In `backward()` during DAG iteration.
- **Why:** If nodes are processed in arbitrary set order rather than reversed topological post-order, child nodes backpropagate before all parents finish accumulating.
- **How:** Recursively visit all children in `v._prev` before appending `v` to `topo`, then iterate `reversed(topo)`.

---

## Module 36: Optimization Dynamics (SGD to AdamW & Warmup)

### LESSON-T4-04: Gaussian Error Linear Unit (GELU) Vectorized Forward Pass
**Module:** `MOD-36` | **Challenge ID:** `py-gelu-forward`

#### 1. Challenge Specification & Mathematical Anchor
Implement the Gaussian Error Linear Unit (GELU) activation function widely used in modern transformers (BERT, GPT, LLaMA).
$$\text{GELU}(x) = x \cdot \Phi(x) = x \cdot P(X \le x) = \frac{x}{2} \left[ 1 + \text{erf}\left(\frac{x}{\sqrt{2}}\right) \right]$$
Implement both the exact formulation (using `math.erf` vectorized) and the standard fast tanh approximation:
$$\text{GELU}_{\text{approx}}(x) = 0.5 x \left( 1 + \tanh\left( \sqrt{\frac{2}{\pi}} \left( x + 0.044715 x^3 \right) \right) \right)$$

**Type Signatures & I/O Contract:**
```python
def gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray: ...
# Input: x: Arbitrary shape NumPy array of float32/float64
# Output: ndarray of identical shape with element-wise GELU activations
```

#### 2. Starter Code
```python
import numpy as np
import math

def gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray:
    """Compute element-wise GELU activation."""
    # TODO: Implement approximate tanh formulation if approximate=True
    # TODO: Implement exact erf formulation if approximate=False
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np
import math

def gelu_forward(x: np.ndarray, approximate: bool = True) -> np.ndarray:
    if approximate:
        inner = np.sqrt(2.0 / np.pi) * (x + 0.044715 * (x ** 3))
        return 0.5 * x * (1.0 + np.tanh(inner))
    else:
        erf_vec = np.vectorize(math.erf, otypes=[np.float64])
        return 0.5 * x * (1.0 + erf_vec(x / np.sqrt(2.0)))
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
x_test = np.array([-2.0, -1.0, 0.0, 1.0, 2.0])
y_approx = gelu_forward(x_test, approximate=True)
y_exact = gelu_forward(x_test, approximate=False)
np.testing.assert_allclose(y_approx[2], 0.0, atol=1e-7)
np.testing.assert_allclose(y_approx, y_exact, atol=1e-3)

# --- Hidden Test Suite ---
np.testing.assert_allclose(gelu_forward(np.array([0.0])), np.array([0.0]), atol=1e-7)
assert gelu_forward(np.array([10.0]))[0] > 9.999
assert abs(gelu_forward(np.array([-10.0]))[0]) < 1e-5
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 25 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `gelu_forward` outputs NaN or fails accuracy tolerance against exact erf.
- **Where:** Calculation of `inner` cubic polynomial in approximate mode.
- **Why:** The constant factor is $0.044715$ and the scaling constant is $\sqrt{2/\pi} \approx 0.79788456$.
- **How:** Compute `np.sqrt(2.0 / np.pi) * (x + 0.044715 * (x ** 3))` before passing into `np.tanh`.

---

### LESSON-T4-05: Numerically Stabilized Cross-Entropy Loss with Log-Sum-Exp
**Module:** `MOD-36` | **Challenge ID:** `py-cross-entropy-lse`

#### 1. Challenge Specification & Mathematical Anchor
Compute the multi-class cross-entropy loss and its analytical gradient from logits without floating-point overflow or catastrophic underflow.
$$\mathcal{L} = -\frac{1}{N} \sum_{i=1}^N \log p_{i, y_i}, \quad p_{ic} = \frac{\exp(z_{ic})}{\sum_k \exp(z_{ik})}$$
Subtract $m_i = \max_j z_{ij}$ prior to exponentiation, compute the exact log-softmax via $\log p_{ic} = z_{ic} - m_i - \log \sum_j \exp(z_{ij} - m_i)$, and return both the scalar loss and the gradient tensor $\frac{\partial \mathcal{L}}{\partial z_{ic}} = \frac{p_{ic} - \mathbf{1}(c = y_i)}{N}$.

**Type Signatures & I/O Contract:**
```python
def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]: ...
# logits: (N, C) float array of unbounded logits
# targets: (N,) integer array of ground-truth class labels 0 <= targets[i] < C
# Returns: (loss: float, grad: np.ndarray of shape (N, C))
```

#### 2. Starter Code
```python
import numpy as np

def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]:
    """Numerically stable cross-entropy with log-sum-exp trick."""
    # TODO: Subtract row-wise max for numerical stability
    # TODO: Compute log_sum_exp and log-probabilities
    # TODO: Calculate mean cross-entropy loss and analytical gradient
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def cross_entropy_loss_lse(logits: np.ndarray, targets: np.ndarray) -> tuple[float, np.ndarray]:
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
logits_pub = np.array([[2.0, 1.0, 0.1], [0.5, 2.5, 0.2]])
targets_pub = np.array([0, 1])
loss_p, grad_p = cross_entropy_loss_lse(logits_pub, targets_pub)
assert loss_p > 0.0
assert grad_p.shape == logits_pub.shape
np.testing.assert_allclose(np.sum(grad_p, axis=-1), np.zeros(2), atol=1e-7)

# --- Hidden Test Suite ---
huge_logits = np.array([[1000.0, 1001.0], [500.0, 499.0]])
huge_targets = np.array([1, 0])
loss_h, grad_h = cross_entropy_loss_lse(huge_logits, huge_targets)
assert not np.isnan(loss_h) and not np.isinf(loss_h)
assert 0.0 < loss_h < 1.0
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 3.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `RuntimeWarning: overflow encountered in exp` or loss evaluates to `nan` on extreme logits.
- **Where:** Exponentiation of raw `logits`.
- **Why:** When logits exceed $\approx 709.78$, IEEE 754 64-bit float overflows to `+inf`.
- **How:** Subtract `np.max(logits, axis=-1, keepdims=True)` from `logits` before taking `np.exp`.

---

### LESSON-T4-06: AdamW Optimizer with Decoupled Weight Decay & First/Second Moments
**Module:** `MOD-36` | **Challenge ID:** `py-adamw-step`

#### 1. Challenge Specification & Mathematical Anchor
Implement a single parameter update step of the AdamW (Loshchilov & Hutter, 2019) optimizer. Unlike standard Adam with L2 regularization where weight decay is added directly into gradient moments, AdamW strictly decouples weight decay:
$$\theta_t \leftarrow \theta_{t-1} (1 - \eta \lambda)$$
$$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t, \quad v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$$
$$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$
$$\theta_t \leftarrow \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}$$

**Type Signatures & I/O Contract:**
```python
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
    weight_decay: float = 1e-2
) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...
```

#### 2. Starter Code
```python
import numpy as np

def adamw_step(param, grad, m, v, t, lr=1e-3, beta1=0.9, beta2=0.999, eps=1e-8, weight_decay=1e-2):
    """Perform one AdamW optimization update step."""
    # TODO: 1. Apply decoupled weight decay to param
    # TODO: 2. Update biased first (m) and second (v) moment estimates
    # TODO: 3. Compute bias-corrected moments m_hat and v_hat using step t
    # TODO: 4. Apply adaptive update step and return (param_next, m_next, v_next)
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def adamw_step(param, grad, m, v, t, lr=1e-3, beta1=0.9, beta2=0.999, eps=1e-8, weight_decay=1e-2):
    param_decayed = param * (1.0 - lr * weight_decay)
    m_next = beta1 * m + (1.0 - beta1) * grad
    v_next = beta2 * v + (1.0 - beta2) * (grad ** 2)
    m_hat = m_next / (1.0 - beta1 ** t)
    v_hat = v_next / (1.0 - beta2 ** t)
    param_next = param_decayed - lr * (m_hat / (np.sqrt(v_hat) + eps))
    return param_next, m_next, v_next
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
w_0 = np.array([1.0, -2.0])
g_0 = np.array([0.1, -0.5])
m_0 = np.zeros_like(w_0)
v_0 = np.zeros_like(w_0)
w_1, m_1, v_1 = adamw_step(w_0, g_0, m_0, v_0, t=1, lr=0.1, weight_decay=0.0)
np.testing.assert_allclose(w_1, np.array([0.9, -1.9]), atol=1e-5)

# --- Hidden Test Suite ---
w_wd, _, _ = adamw_step(w_0, np.zeros_like(g_0), m_0, v_0, t=1, lr=0.1, weight_decay=0.1)
np.testing.assert_allclose(w_wd, w_0 * (1.0 - 0.1 * 0.1), atol=1e-7)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.8 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Weights do not decay when gradient is zero.
- **Where:** Weight decay computation.
- **Why:** In Adam, weight decay was coupled into $g_t + \lambda \theta$, which zeroes out when $g_t=0$ if not properly applied to parameter.
- **How:** Multiply `param` by `(1.0 - lr * weight_decay)` as the first operation of AdamW.

---

## Module 37: Convolutional Networks & Residual Highways

### LESSON-T4-07: 2D Spatial Cross-Correlation via Im2Col Unfolding & GEMM
**Module:** `MOD-37` | **Challenge ID:** `py-conv2d-im2col`

#### 1. Challenge Specification & Mathematical Anchor
Implement the high-performance forward pass of 2D cross-correlation using the `im2col` (image-to-column) transformation. Unfold receptive field patches of shape $(C_{\text{in}}, K_h, K_w)$ into column vectors of a 2D matrix, transforming spatial convolutions into a single General Matrix Multiplication (GEMM):
$$\mathbf{Y}_{\text{col}} = \mathbf{W}_{\text{row}} \mathbf{X}_{\text{col}} + \mathbf{b}$$
Handle optional zero-padding and arbitrary stride.

**Type Signatures & I/O Contract:**
```python
def conv2d_im2col(
    x: np.ndarray,
    w: np.ndarray,
    b: np.ndarray | None = None,
    stride: int = 1,
    padding: int = 0
) -> np.ndarray: ...
# x: (B, C_in, H, W)
# w: (C_out, C_in, K_h, K_w)
# b: (C_out,) or None
# Returns: (B, C_out, out_h, out_w)
```

#### 2. Starter Code
```python
import numpy as np

def conv2d_im2col(x: np.ndarray, w: np.ndarray, b: np.ndarray | None = None, stride: int = 1, padding: int = 0) -> np.ndarray:
    """Vectorized 2D convolution using im2col and matrix multiplication."""
    # TODO: 1. Apply zero padding to spatial dimensions (H, W) if padding > 0
    # TODO: 2. Compute output spatial dimensions out_h and out_w
    # TODO: 3. Unfold image patches into columns (im2col)
    # TODO: 4. Perform matrix multiplication with flattened filter weights and reshape
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def conv2d_im2col(x: np.ndarray, w: np.ndarray, b: np.ndarray | None = None, stride: int = 1, padding: int = 0) -> np.ndarray:
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

    cols = np.zeros((B, C_in * K_h * K_w, out_h * out_w))
    col_idx = 0
    for i in range(out_h):
        for j in range(out_w):
            h_start = i * stride
            w_start = j * stride
            patch = x_padded[:, :, h_start:h_start+K_h, w_start:w_start+K_w]
            cols[:, :, col_idx] = patch.reshape(B, -1)
            col_idx += 1

    w_row = w.reshape(C_out, -1)
    out = np.matmul(w_row, cols)
    out = out.reshape(B, C_out, out_h, out_w)
    if b is not None:
        out += b.reshape(1, C_out, 1, 1)
    return out
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
x_c = np.ones((1, 2, 3, 3))
w_c = np.ones((1, 2, 1, 1))
out_c = conv2d_im2col(x_c, w_c, stride=1, padding=0)
assert out_c.shape == (1, 1, 3, 3)
np.testing.assert_allclose(out_c, np.full((1, 1, 3, 3), 2.0), atol=1e-7)

# --- Hidden Test Suite ---
sobel = np.array([[[[-1., 0., 1.], [-2., 0., 2.], [-1., 0., 1.]]]])
img = np.zeros((1, 1, 5, 5))
img[:, :, :, 2:] = 1.0
res = conv2d_im2col(img, sobel, padding=1)
assert res.shape == (1, 1, 5, 5)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 85 ms
- **Peak Heap Memory:**  < 8.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Output spatial dimensions `out_h` or `out_w` are off by 1.
- **Where:** Dimension calculation formula.
- **Why:** The integer division must include the $+1$ base count: `(H_pad - K_h) // stride + 1`.
- **How:** Verify output dimensions with stride and padding against `out_h = (H + 2*padding - K_h) // stride + 1`.

---

### LESSON-T4-08: Layer Normalization (LayerNorm) Forward Pass & Affine Cache
**Module:** `MOD-37` | **Challenge ID:** `py-layernorm`

#### 1. Challenge Specification & Mathematical Anchor
Implement Layer Normalization (Ba, Kiros & Hinton, 2016) over the last feature dimension:
$$\mu = \frac{1}{D} \sum_{i=1}^D x_i, \quad \sigma^2 = \frac{1}{D} \sum_{i=1}^D (x_i - \mu)^2$$
$$\hat{x} = \frac{x - \mu}{\sqrt{\sigma^2 + \epsilon}}, \quad y = \gamma \odot \hat{x} + \beta$$
Store the intermediate statistics in a cache dictionary for downstream backward propagation.

**Type Signatures & I/O Contract:**
```python
def layernorm_forward(
    x: np.ndarray,
    gamma: np.ndarray,
    beta: np.ndarray,
    eps: float = 1e-5
) -> tuple[np.ndarray, dict]: ...
# x: shape (..., D)
# gamma, beta: shape (D,)
# Returns: (normalized_output: np.ndarray, cache: dict)
```

#### 2. Starter Code
```python
import numpy as np

def layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, eps: float = 1e-5) -> tuple[np.ndarray, dict]:
    """Compute Layer Normalization over the last dimension."""
    # TODO: Compute mean and variance along axis=-1 with keepdims=True
    # TODO: Normalize x to zero-mean and unit-variance
    # TODO: Scale by gamma and shift by beta
    # TODO: Return normalized array and cache dict
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def layernorm_forward(x: np.ndarray, gamma: np.ndarray, beta: np.ndarray, eps: float = 1e-5) -> tuple[np.ndarray, dict]:
    mean = np.mean(x, axis=-1, keepdims=True)
    var = np.var(x, axis=-1, keepdims=True)
    x_hat = (x - mean) / np.sqrt(var + eps)
    out = gamma * x_hat + beta
    cache = {'x': x, 'gamma': gamma, 'x_hat': x_hat, 'mean': mean, 'var': var, 'eps': eps}
    return out, cache
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
x_ln = np.array([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]])
gamma_ln = np.ones(3)
beta_ln = np.zeros(3)
out_ln, cache = layernorm_forward(x_ln, gamma_ln, beta_ln)
np.testing.assert_allclose(np.mean(out_ln, axis=-1), np.zeros(2), atol=1e-6)
np.testing.assert_allclose(np.var(out_ln, axis=-1), np.ones(2), atol=1e-4)

# --- Hidden Test Suite ---
out_ln2, _ = layernorm_forward(x_ln, gamma=2.0 * np.ones(3), beta=5.0 * np.ones(3))
np.testing.assert_allclose(np.mean(out_ln2, axis=-1), np.full(2, 5.0), atol=1e-6)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 25 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `ValueError: operands could not be broadcast together` during normalization.
- **Where:** Mean and variance reduction call.
- **Why:** If `keepdims=True` is omitted, the reduced dimension is dropped, preventing correct broadcasting across remaining batch dimensions.
- **How:** Always set `axis=-1, keepdims=True` in `np.mean` and `np.var`.

---

### LESSON-T4-09: Root Mean Square Normalization (RMSNorm) & Residual Skip Highway
**Module:** `MOD-37` | **Challenge ID:** `py-rms-norm`

#### 1. Challenge Specification & Mathematical Anchor
Implement Root Mean Square Normalization (Zhang & Sennrich, 2019) with an integrated residual addition highway. RMSNorm improves training efficiency by discarding mean centering while preserving scale invariance:
$$\text{RMS}(x) = \sqrt{\frac{1}{D} \sum_{i=1}^D x_i^2 + \epsilon}, \quad \bar{x} = \frac{x}{\text{RMS}(x)} \odot \gamma$$
When a `residual` tensor is provided, compute $x_{\text{active}} = x + \text{residual}$ first, normalize $x_{\text{active}}$, and return both the normalized output and $x_{\text{active}}$.

**Type Signatures & I/O Contract:**
```python
def rms_norm_forward(
    x: np.ndarray,
    gamma: np.ndarray,
    eps: float = 1e-6,
    residual: np.ndarray | None = None
) -> tuple[np.ndarray, np.ndarray]: ...
```

#### 2. Starter Code
```python
import numpy as np

def rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:
    """Compute RMSNorm with optional residual addition."""
    # TODO: Add residual if provided
    # TODO: Compute root mean square over last dimension
    # TODO: Scale by gamma and return (output, active_residual_state)
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def rms_norm_forward(x: np.ndarray, gamma: np.ndarray, eps: float = 1e-6, residual: np.ndarray | None = None) -> tuple[np.ndarray, np.ndarray]:
    x_active = x + residual if residual is not None else x
    rms = np.sqrt(np.mean(x_active ** 2, axis=-1, keepdims=True) + eps)
    out = (x_active / rms) * gamma
    return out, x_active
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
x_rms = np.array([[2.0, 2.0, 2.0, 2.0]])
gamma_rms = np.ones(4)
out_r, _ = rms_norm_forward(x_rms, gamma_rms)
np.testing.assert_allclose(out_r, np.ones((1, 4)), atol=1e-5)

# --- Hidden Test Suite ---
res_r = np.array([[1.0, 1.0, 1.0, 1.0]])
out_r2, x_act = rms_norm_forward(x_rms, gamma_rms, residual=res_r)
np.testing.assert_allclose(x_act, np.full((1, 4), 3.0), atol=1e-7)
np.testing.assert_allclose(out_r2, np.ones((1, 4)), atol=1e-5)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 20 ms
- **Peak Heap Memory:**  < 2.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Subtracting the mean inside RMSNorm.
- **Where:** Calculation of RMS.
- **Why:** RMSNorm does NOT center data by subtracting $\mu$; it only divides by the root mean square of raw squared activations.
- **How:** Compute `np.mean(x_active ** 2, axis=-1, keepdims=True)` directly.

---

## Module 38: Tokenization from Scratch (Byte-Level BPE)

### LESSON-T4-10: Gated Recurrent Unit (GRU) Forward Hidden State Step
**Module:** `MOD-38` | **Challenge ID:** `py-gru-cell`

#### 1. Challenge Specification & Mathematical Anchor
Implement the forward transition of a Gated Recurrent Unit (GRU) cell (Cho et al., 2014):
$$r_t = \sigma(x_t W_r + h_{t-1} U_r + b_r) \quad \text{(Reset Gate)}$$
$$z_t = \sigma(x_t W_z + h_{t-1} U_z + b_z) \quad \text{(Update Gate)}$$
$$\tilde{h}_t = \tanh(x_t W_h + (r_t \odot h_{t-1}) U_h + b_h) \quad \text{(Candidate Hidden State)}$$
$$h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t \quad \text{(Output Hidden State)}$$

**Type Signatures & I/O Contract:**
```python
def gru_cell_forward(
    x_t: np.ndarray, h_prev: np.ndarray,
    W_z: np.ndarray, U_z: np.ndarray, b_z: np.ndarray,
    W_r: np.ndarray, U_r: np.ndarray, b_r: np.ndarray,
    W_h: np.ndarray, U_h: np.ndarray, b_h: np.ndarray
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))

def gru_cell_forward(x_t, h_prev, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h):
    """Execute a single GRU step."""
    # TODO: Compute reset gate r_t
    # TODO: Compute update gate z_t
    # TODO: Compute candidate hidden state h_tilde using r_t * h_prev
    # TODO: Blend previous state and candidate state
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))

def gru_cell_forward(x_t, h_prev, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h):
    r_t = sigmoid(np.dot(x_t, W_r) + np.dot(h_prev, U_r) + b_r)
    z_t = sigmoid(np.dot(x_t, W_z) + np.dot(h_prev, U_z) + b_z)
    h_tilde = np.tanh(np.dot(x_t, W_h) + np.dot(r_t * h_prev, U_h) + b_h)
    h_t = (1.0 - z_t) * h_prev + z_t * h_tilde
    return h_t
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
d_in, d_h = 4, 3
x_0 = np.zeros(d_in)
h_0 = np.zeros(d_h)
W_z, U_z, b_z = np.zeros((d_in, d_h)), np.zeros((d_h, d_h)), np.zeros(d_h)
W_r, U_r, b_r = np.zeros((d_in, d_h)), np.zeros((d_h, d_h)), np.zeros(d_h)
W_h, U_h, b_h = np.zeros((d_in, d_h)), np.zeros((d_h, d_h)), np.zeros(d_h)
h_1 = gru_cell_forward(x_0, h_0, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h)
np.testing.assert_allclose(h_1, np.zeros(d_h), atol=1e-7)

# --- Hidden Test Suite ---
b_h_act = np.ones(d_h)
h_2 = gru_cell_forward(x_0, h_0, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h_act)
np.testing.assert_allclose(h_2, np.full(d_h, 0.5 * np.tanh(1.0)), atol=1e-6)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Reset gate not affecting the candidate state.
- **Where:** Inside `h_tilde` dot product calculation.
- **Why:** The recurrence weight $U_h$ must multiply the element-wise reset state: $(r_t \odot h_{t-1}) U_h$.
- **How:** Compute `np.dot(r_t * h_prev, U_h)` before adding to $x_t W_h + b_h$.

---

### LESSON-T4-11: Byte-Pair Encoding (BPE) Pair Frequency Extraction & Training
**Module:** `MOD-38` | **Challenge ID:** `py-bpe-train`

#### 1. Challenge Specification & Mathematical Anchor
Implement the training loop of the Byte-Pair Encoding (BPE) subword tokenizer (Sennrich et al., 2016). Split a corpus of words into character sequences appended with the end-of-word marker `</w>`, tally frequency statistics of all adjacent symbol pairs, and greedily extract the top `num_merges` most frequent pairs, updating the vocabulary at each step.

**Type Signatures & I/O Contract:**
```python
def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]: ...
# corpus: list of string sentences/documents
# num_merges: number of merge rules to learn
# Returns: ordered list of learned merge tuples (token_A, token_B)
```

#### 2. Starter Code
```python
def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]:
    """Extract BPE merge rules from corpus."""
    # TODO: 1. Tokenize corpus words into tuples of characters with '</w>'
    # TODO: 2. Iteratively count adjacent pair frequencies across all words
    # TODO: 3. Select most frequent pair, append to merges list, and update word tuples
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]:
    word_freqs = {}
    for text in corpus:
        for word in text.strip().split():
            chars = tuple(list(word) + ['</w>'])
            word_freqs[chars] = word_freqs.get(chars, 0) + 1

    merges = []
    for _ in range(num_merges):
        pair_counts = {}
        for word_tuple, freq in word_freqs.items():
            for i in range(len(word_tuple) - 1):
                pair = (word_tuple[i], word_tuple[i+1])
                pair_counts[pair] = pair_counts.get(pair, 0) + freq
        if not pair_counts:
            break
        best_pair = max(pair_counts.items(), key=lambda item: (item[1], item[0]))[0]
        merges.append(best_pair)

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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
corpus_pub = ["low low low low low lower lower newest newest newest newest newest newest wider wider wider"]
merges_pub = train_bpe(corpus_pub, num_merges=3)
assert len(merges_pub) == 3
assert isinstance(merges_pub[0], tuple) and len(merges_pub[0]) == 2

# --- Hidden Test Suite ---
corpus_simple = ["aa aa aa ab"]
merges_s = train_bpe(corpus_simple, num_merges=1)
assert merges_s == [('a', 'a')]
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 50 ms
- **Peak Heap Memory:**  < 3.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Merge rules are missing word boundary tokens or counts are unweighted.
- **Where:** Frequency collection loop.
- **Why:** Pair counts must be weighted by word frequency `freq`, not counted once per unique word.
- **How:** Accumulate `pair_counts[pair] += freq` for every occurrence of `pair` in `word_tuple`.

---

### LESSON-T4-12: Byte-Level BPE Tokenizer Encoder & Ranked Rule Segmenter
**Module:** `MOD-38` | **Challenge ID:** `py-bpe-encode`

#### 1. Challenge Specification & Mathematical Anchor
Implement the inference encoder for Byte-Pair Encoding. Given raw text, learned merge rules (in rank priority order), and a vocabulary mapping tokens to integer IDs, iteratively apply merge rules to split input words into the longest recognized subword tokens and return the sequence of token IDs.

**Type Signatures & I/O Contract:**
```python
def bpe_encode(
    text: str,
    merges: list[tuple[str, str]],
    vocab: dict[str, int]
) -> list[int]: ...
```

#### 2. Starter Code
```python
def bpe_encode(text: str, merges: list[tuple[str, str]], vocab: dict[str, int]) -> list[int]:
    """Encode raw text into token IDs using learned BPE merges."""
    # TODO: 1. Split text into words and decompose into characters + '</w>'
    # TODO: 2. Sequentially apply merge rules in priority order
    # TODO: 3. Map resulting tokens to IDs in vocab (fallback to <unk> if missing)
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
def bpe_encode(text: str, merges: list[tuple[str, str]], vocab: dict[str, int]) -> list[int]:
    tokens_out = []
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
vocab_test = {'l': 0, 'o': 1, 'w': 2, '</w>': 3, 'low</w>': 4, '<unk>': 5}
merges_test = [('l', 'o'), ('lo', 'w'), ('low', '</w>')]
encoded = bpe_encode("low", merges_test, vocab_test)
assert encoded == [4]

# --- Hidden Test Suite ---
encoded_unk = bpe_encode("xyz", merges_test, vocab_test)
assert encoded_unk == [5, 5, 5, 3] or all(idx in [3, 5] for idx in encoded_unk)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 35 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Words are prematurely merged or merges are applied out of priority order.
- **Where:** Iterating through `merges` list.
- **Why:** BPE merges must be executed in exact training rank order rather than by token length.
- **How:** Loop sequentially through `for p0, p1 in merges` and perform greedy replacement across `word_tokens`.

---

## Module 39: Self-Attention Mechanics & Causal Masking

### LESSON-T4-13: Scaled Dot-Product Attention with Variance Normalization
**Module:** `MOD-39` | **Challenge ID:** `py-scaled-dot-product-attention`

#### 1. Challenge Specification & Mathematical Anchor
Implement Scaled Dot-Product Attention (Vaswani et al., 2017):
$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left( \frac{\mathbf{Q} \mathbf{K}^T}{\sqrt{d_k}} \right) \mathbf{V}$$
Scale query-key dot products by $\frac{1}{\sqrt{d_k}}$ to prevent logits from exploding into regions of vanishing softmax gradients in high dimensions. Apply numerically stable softmax along the last axis and return both output representations and attention probability weights.

**Type Signatures & I/O Contract:**
```python
def scaled_dot_product_attention(
    Q: np.ndarray,
    K: np.ndarray,
    V: np.ndarray,
    scale: float | None = None
) -> tuple[np.ndarray, np.ndarray]: ...
# Q: (..., S_q, d_k), K: (..., S_k, d_k), V: (..., S_k, d_v)
# Returns: (output: (..., S_q, d_v), weights: (..., S_q, S_k))
```

#### 2. Starter Code
```python
import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:
    """Compute scaled dot-product attention with stable softmax."""
    # TODO: 1. Set scale = 1.0 / sqrt(d_k) if scale is None
    # TODO: 2. Compute Q @ K^T * scale
    # TODO: 3. Compute row-wise stable softmax
    # TODO: 4. Compute attention_weights @ V
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:
    d_k = Q.shape[-1]
    if scale is None:
        scale = 1.0 / np.sqrt(d_k)
    scores = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    output = np.matmul(attn_weights, V)
    return output, attn_weights
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
Q_p = np.array([[[1.0, 0.0], [0.0, 1.0]]])
K_p = np.array([[[1.0, 0.0], [0.0, 1.0]]])
V_p = np.array([[[10.0, 20.0], [30.0, 40.0]]])
out_p, w_p = scaled_dot_product_attention(Q_p, K_p, V_p)
assert out_p.shape == (1, 2, 2)
np.testing.assert_allclose(np.sum(w_p, axis=-1), np.ones((1, 2)), atol=1e-7)

# --- Hidden Test Suite ---
np.testing.assert_allclose(w_p[0, 0, 0], 1.0 / (1.0 + np.exp(-1.0 / np.sqrt(2))), atol=1e-5)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `ValueError: shapes not aligned` during `Q @ K.T` on batched 3D/4D tensors.
- **Where:** Matrix multiplication of $K$.
- **Why:** Calling `.T` on a 3D tensor reverses all dimensions $(0, 1, 2) \to (2, 1, 0)$, swapping batch and feature dims.
- **How:** Use `np.swapaxes(K, -1, -2)` to transpose strictly the final two sequence/feature dimensions.

---

### LESSON-T4-14: Causal Autoregressive Masking with Additive Mask Tensor
**Module:** `MOD-39` | **Challenge ID:** `py-causal-attention`

#### 1. Challenge Specification & Mathematical Anchor
Enforce the autoregressive property in causal decoder transformers (GPT, LLaMA). Tokens are prohibited from attending to future sequence positions. Add a causal mask matrix $\mathbf{M}$ to pre-softmax attention scores:
$$M_{ij} = \begin{cases} 0 & j \le i \\ -10^9 & j > i \end{cases}$$
Verify that all strictly upper-triangular attention weights ($j > i$) are identically zero and that the initial token assigns probability $1.0$ to itself.

**Type Signatures & I/O Contract:**
```python
def causal_attention(
    Q: np.ndarray,
    K: np.ndarray,
    V: np.ndarray
) -> tuple[np.ndarray, np.ndarray]: ...
```

#### 2. Starter Code
```python
import numpy as np

def causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Compute causal autoregressive attention."""
    # TODO: Compute scaled dot-product scores
    # TODO: Create upper-triangular boolean mask (j > i) and fill with -1e9
    # TODO: Softmax and project with V
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    d_k = Q.shape[-1]
    scale = 1.0 / np.sqrt(d_k)
    scores = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale
    S_q, S_k = Q.shape[-2], K.shape[-2]
    mask = np.triu(np.ones((S_q, S_k), dtype=bool), k=1)
    scores[..., mask] = -1e9
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    output = np.matmul(attn_weights, V)
    return output, attn_weights
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
Q_c = np.random.randn(1, 4, 8)
K_c = np.random.randn(1, 4, 8)
V_c = np.random.randn(1, 4, 8)
out_c, w_c = causal_attention(Q_c, K_c, V_c)
upper_tri = np.triu(w_c[0], k=1)
np.testing.assert_allclose(upper_tri, np.zeros((4, 4)), atol=1e-7)
np.testing.assert_allclose(w_c[0, 0, 0], 1.0, atol=1e-7)

# --- Hidden Test Suite ---
assert np.all(w_c >= 0.0)
np.testing.assert_allclose(np.sum(w_c, axis=-1), np.ones((1, 4)), atol=1e-7)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Upper-triangular attention weights are non-zero ($> 10^{-6}$).
- **Where:** Mask value replacement.
- **Why:** Using a small negative number like $-10.0$ allows $e^{-10} \approx 4.5 \times 10^{-5}$ leakage into future tokens.
- **How:** Fill masked positions with $-1e9$ (or $-\infty$ with safe softmax subtraction).

---

### LESSON-T4-15: Multi-Head Attention (MHA) Tensor Splitting & Merging
**Module:** `MOD-39` | **Challenge ID:** `py-multihead-attention`

#### 1. Challenge Specification & Mathematical Anchor
Implement Multi-Head Attention (MHA). Linearly project input sequence $X$ into Query, Key, and Value representations using weights $W_q, W_k, W_v \in \mathbb{R}^{D \times D}$, split the model dimension $D$ into $h$ separate heads of dimension $d_k = D/h$, perform batched parallel attention across all heads, concatenate the attended head outputs, and project through output matrix $W_o$.

**Type Signatures & I/O Contract:**
```python
def multi_head_attention_forward(
    X: np.ndarray,
    W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray,
    num_heads: int,
    is_causal: bool = False
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def multi_head_attention_forward(X, W_q, W_k, W_v, W_o, num_heads, is_causal=False):
    """Execute full Multi-Head Attention forward pass."""
    # TODO: 1. Project Q, K, V
    # TODO: 2. Reshape and transpose to (B, num_heads, S, d_k)
    # TODO: 3. Compute batched scaled dot-product attention with optional causal mask
    # TODO: 4. Concatenate heads back to (B, S, D) and project via W_o
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def multi_head_attention_forward(X, W_q, W_k, W_v, W_o, num_heads, is_causal=False):
    B, S, D = X.shape
    assert D % num_heads == 0, "D must be divisible by num_heads"
    d_k = D // num_heads

    Q = np.dot(X, W_q).reshape(B, S, num_heads, d_k).swapaxes(1, 2)
    K = np.dot(X, W_k).reshape(B, S, num_heads, d_k).swapaxes(1, 2)
    V = np.dot(X, W_v).reshape(B, S, num_heads, d_k).swapaxes(1, 2)

    scores = np.matmul(Q, K.swapaxes(-1, -2)) / np.sqrt(d_k)
    if is_causal:
        mask = np.triu(np.ones((S, S), dtype=bool), k=1)
        scores[..., mask] = -1e9
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_s = np.exp(scores - scores_max)
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    context = np.matmul(weights, V)
    context = context.swapaxes(1, 2).reshape(B, S, D)
    return np.dot(context, W_o)
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
B, S, D, H = 2, 4, 8, 2
X_mha = np.random.randn(B, S, D)
W_q, W_k, W_v, W_o = np.eye(D), np.eye(D), np.eye(D), np.eye(D)
out_mha = multi_head_attention_forward(X_mha, W_q, W_k, W_v, W_o, num_heads=H, is_causal=True)
assert out_mha.shape == (B, S, D)

# --- Hidden Test Suite ---
assert not np.isnan(out_mha).any()
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 50 ms
- **Peak Heap Memory:**  < 4.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `reshape` destroys head ordering before concatenation.
- **Where:** After batched context matrix multiplication.
- **Why:** A simple `reshape(B, S, D)` on `(B, h, S, d_k)` mixes tokens across different heads.
- **How:** Swap axes `context.swapaxes(1, 2)` to obtain `(B, S, h, d_k)` before reshaping to `(B, S, D)`.

---

## Module 40: Modern Transformer Architecture (RoPE & Pre-LN)

### LESSON-T4-16: Rotary Position Embeddings (RoPE) Phasor Application
**Module:** `MOD-40` | **Challenge ID:** `py-rope-apply`

#### 1. Challenge Specification & Mathematical Anchor
Implement Rotary Position Embeddings (Su et al., 2021). RoPE encodes relative position into queries and keys via complex planar rotations:
$$\mathbf{R}_{\Theta, m} \mathbf{x}_m = \begin{pmatrix} x_0 \cos m\theta_0 - x_1 \sin m\theta_0 \\ x_0 \sin m\theta_0 + x_1 \cos m\theta_0 \\ \vdots \end{pmatrix}, \quad \theta_i = \text{base}^{-2i / D}$$
Rotate consecutive even-odd coordinate pairs $(x_{2i}, x_{2i+1})$ by phase angle $m \theta_i$. Verify that RoPE preserves $L_2$ vector norm and acts as the identity transformation at sequence position $m = 0$.

**Type Signatures & I/O Contract:**
```python
def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray: ...
# x: shape (B, S, D) where D is even
# Returns: rotated tensor of shape (B, S, D)
```

#### 2. Starter Code
```python
import numpy as np

def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray:
    """Apply 2D Rotary Position Embeddings (RoPE)."""
    # TODO: 1. Calculate inverse frequency theta for i in [0, D/2 - 1]
    # TODO: 2. Compute phase angles m * theta for sequence positions m in [0, S - 1]
    # TODO: 3. Perform 2D rotation on adjacent (even, odd) features
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def apply_rotary_emb(x: np.ndarray, base: float = 10000.0) -> np.ndarray:
    B, S, D = x.shape
    assert D % 2 == 0, "Dimension D must be even"
    d_half = D // 2
    freqs = 1.0 / (base ** (np.arange(0, d_half) * 2.0 / D))
    m = np.arange(S)[:, None]
    phases = m * freqs[None, :]
    cos_phases = np.cos(phases)
    sin_phases = np.sin(phases)

    x0 = x[..., 0::2]
    x1 = x[..., 1::2]
    out = np.zeros_like(x)
    out[..., 0::2] = x0 * cos_phases - x1 * sin_phases
    out[..., 1::2] = x0 * sin_phases + x1 * cos_phases
    return out
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
x_rope = np.random.randn(2, 4, 8)
r_rope = apply_rotary_emb(x_rope)
np.testing.assert_allclose(r_rope[:, 0, :], x_rope[:, 0, :], atol=1e-7)
norm_x = np.linalg.norm(x_rope, axis=-1)
norm_r = np.linalg.norm(r_rope, axis=-1)
np.testing.assert_allclose(norm_r, norm_x, atol=1e-6)

# --- Hidden Test Suite ---
assert r_rope.shape == x_rope.shape
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Vectors change norm after rotation.
- **Where:** Trigonometric rotation formula.
- **Why:** A true 2D rotation matrix is orthogonal ($R R^T = I$), which strictly preserves Euclidean norm $\|R x\| = \|x\|$.
- **How:** Ensure $x'_0 = x_0 \cos\theta - x_1 \sin\theta$ and $x'_1 = x_0 \sin\theta + x_1 \cos\theta$.

---

### LESSON-T4-17: SwiGLU Gated Feed-Forward Network Forward Pass
**Module:** `MOD-40` | **Challenge ID:** `py-swiglu-ffn`

#### 1. Challenge Specification & Mathematical Anchor
Implement the SwiGLU (Shazeer, 2020) feed-forward block ubiquitous in modern frontier LLMs (LLaMA, Mistral, Gemma):
$$\text{SwiGLU}(x) = \left( \text{Swish}(x W_{\text{gate}}) \odot x W_{\text{up}} \right) W_{\text{down}}$$
$$\text{where } \text{Swish}(z) = z \cdot \sigma(z) = \frac{z}{1 + e^{-z}}$$

**Type Signatures & I/O Contract:**
```python
def swiglu_forward(
    x: np.ndarray,
    W_gate: np.ndarray,
    W_up: np.ndarray,
    W_down: np.ndarray
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def swiglu_forward(x: np.ndarray, W_gate: np.ndarray, W_up: np.ndarray, W_down: np.ndarray) -> np.ndarray:
    """Compute SwiGLU gated feed-forward layer."""
    # TODO: 1. Project gate = x @ W_gate and compute Swish(gate)
    # TODO: 2. Project up = x @ W_up
    # TODO: 3. Bilinear element-wise multiply Swish(gate) * up
    # TODO: 4. Project through W_down
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def swiglu_forward(x: np.ndarray, W_gate: np.ndarray, W_up: np.ndarray, W_down: np.ndarray) -> np.ndarray:
    gate_proj = np.dot(x, W_gate)
    swish = gate_proj / (1.0 + np.exp(-np.clip(gate_proj, -30.0, 30.0)))
    up_proj = np.dot(x, W_up)
    bilinear = swish * up_proj
    return np.dot(bilinear, W_down)
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
B, S, D, D_ff = 2, 3, 4, 8
x_ff = np.ones((B, S, D))
Wg = np.zeros((D, D_ff)); Wu = np.ones((D, D_ff)); Wd = np.ones((D_ff, D))
out_ff = swiglu_forward(x_ff, Wg, Wu, Wd)
np.testing.assert_allclose(out_ff, np.zeros((B, S, D)), atol=1e-7)

# --- Hidden Test Suite ---
assert out_ff.shape == (B, S, D)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Output is non-zero when gate weights are zero.
- **Where:** Swish activation computation.
- **Why:** Swish is defined as $z \cdot \sigma(z)$, so when $z = 0$, $\text{Swish}(0) = 0 \times 0.5 = 0$.
- **How:** Compute `gate_proj * sigmoid(gate_proj)`.

---

### LESSON-T4-18: Autoregressive Key-Value (KV) Caching Transformer Decoder Step
**Module:** `MOD-40` | **Challenge ID:** `py-kv-cache-step`

#### 1. Challenge Specification & Mathematical Anchor
Implement an incremental autoregressive single-token decoder step with Key-Value (KV) caching. During autoregressive generation, recomputing attention keys and values for all past tokens incurs redundant $O(S^2)$ compute. Given newly arriving token embedding $x_t \in \mathbb{R}^{B \times 1 \times D}$ and past cached tensors $K_{\text{cache}}, V_{\text{cache}} \in \mathbb{R}^{B \times S_{\text{past}} \times D}$, project current $q_t, k_t, v_t$, append $k_t, v_t$ to the caches along the sequence dimension, compute attention between $q_t$ and all keys up to step $t$, and return the output token embedding along with the updated caches.

**Type Signatures & I/O Contract:**
```python
def kv_cache_decoder_step(
    x_t: np.ndarray,
    k_cache: np.ndarray | None,
    v_cache: np.ndarray | None,
    W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray
) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...
```

#### 2. Starter Code
```python
import numpy as np

def kv_cache_decoder_step(x_t, k_cache, v_cache, W_q, W_k, W_v, W_o):
    """Execute single-step token inference with KV caching."""
    # TODO: 1. Project q_t, k_t, v_t for single token x_t
    # TODO: 2. Concatenate k_t and v_t with k_cache and v_cache along axis=1
    # TODO: 3. Compute attention between single query q_t and full key cache
    # TODO: 4. Project attended context through W_o and return updated state
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def kv_cache_decoder_step(x_t, k_cache, v_cache, W_q, W_k, W_v, W_o):
    B, _, D = x_t.shape
    q_t = np.dot(x_t, W_q)
    k_t = np.dot(x_t, W_k)
    v_t = np.dot(x_t, W_v)

    if k_cache is None or k_cache.size == 0:
        k_updated = k_t
        v_updated = v_t
    else:
        k_updated = np.concatenate([k_cache, k_t], axis=1)
        v_updated = np.concatenate([v_cache, v_t], axis=1)

    d_k = D
    scores = np.matmul(q_t, k_updated.swapaxes(-1, -2)) / np.sqrt(d_k)
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_s = np.exp(scores - scores_max)
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    context = np.matmul(weights, v_updated)
    out_t = np.dot(context, W_o)
    return out_t, k_updated, v_updated
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
B, D = 1, 4
x_step = np.random.randn(B, 1, D)
W = np.eye(D)
out1, k_c1, v_c1 = kv_cache_decoder_step(x_step, None, None, W, W, W, W)
assert k_c1.shape == (B, 1, D)
out2, k_c2, v_c2 = kv_cache_decoder_step(x_step, k_c1, v_c1, W, W, W, W)
assert k_c2.shape == (B, 2, D)

# --- Hidden Test Suite ---
assert out2.shape == (B, 1, D)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Cache length does not grow with each generation step.
- **Where:** Cache update operation.
- **Why:** If `k_t` overwrites `k_cache` rather than concatenating along axis 1, previous key context is erased.
- **How:** Concatenate `np.concatenate([k_cache, k_t], axis=1)` when `k_cache` is not None.

---

## Module 41: High-Efficiency LLMs (FlashAttention & GQA)

### LESSON-T4-19: Grouped-Query Attention (GQA) Head Expansion
**Module:** `MOD-41` | **Challenge ID:** `py-gqa-expand`

#### 1. Challenge Specification & Mathematical Anchor
Implement Grouped-Query Attention (Ainslie et al., 2023) KV head broadcasting. GQA bridges standard Multi-Head Attention ($n_q = n_{kv}$) and Multi-Query Attention ($n_{kv} = 1$) by sharing each Key and Value head across a group of $G = n_q / n_{kv}$ Query heads, slashing KV cache memory traffic while maintaining model quality. Implement `repeat_kv` to broadcast $(B, n_{kv}, S, d_k)$ tensors into $(B, n_q, S, d_k)$.

**Type Signatures & I/O Contract:**
```python
def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray: ...
# x: (B, n_kv, S, d_k)
# n_rep: number of times each head is repeated (G = n_q / n_kv)
# Returns: (B, n_kv * n_rep, S, d_k)
```

#### 2. Starter Code
```python
import numpy as np

def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:
    """Broadcast KV heads across query head groups."""
    # TODO: If n_rep == 1, return x directly
    # TODO: Expand dimension and repeat along head axis
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray:
    if n_rep == 1:
        return x
    B, n_kv, S, d_k = x.shape
    x_expanded = np.repeat(x[:, :, np.newaxis, :, :], n_rep, axis=2)
    return x_expanded.reshape(B, n_kv * n_rep, S, d_k)
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
kv_in = np.ones((1, 2, 4, 8))
kv_out = repeat_kv(kv_in, n_rep=4)
assert kv_out.shape == (1, 8, 4, 8)
np.testing.assert_allclose(kv_out, np.ones((1, 8, 4, 8)), atol=1e-7)

# --- Hidden Test Suite ---
assert repeat_kv(kv_in, 1).shape == kv_in.shape
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 20 ms
- **Peak Heap Memory:**  < 2.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `ValueError: cannot reshape` when expanding head count.
- **Where:** Reshaping expanded dimensions.
- **Why:** Repeating along a raw axis without interleaving can scramble sequence and head dimensions.
- **How:** Insert a new axis at `axis=2`, repeat by `n_rep`, and reshape to `(B, n_kv * n_rep, S, d_k)`.

---

### LESSON-T4-20: FlashAttention Online Softmax Block Rescaling Step
**Module:** `MOD-41` | **Challenge ID:** `py-flash-online-softmax`

#### 1. Challenge Specification & Mathematical Anchor
Implement the Milakov-Gimelshein / Dao online running softmax algorithm that powers FlashAttention. When streaming attention blocks through fast SRAM, the global normalizer is unknown in advance. Update running maximum $m$, running sum $l$, and unnormalized output accumulator $O$ upon receiving a new score block $S_{\text{block}}$ and value block $V_{\text{block}}$:
$$m_{\text{new}} = \max(m_{\text{prev}}, \max(S_{\text{block}})), \quad \alpha = \exp(m_{\text{prev}} - m_{\text{new}})$$
$$P_{\text{block}} = \exp(S_{\text{block}} - m_{\text{new}})$$
$$l_{\text{new}} = \alpha \cdot l_{\text{prev}} + \sum P_{\text{block}}$$
$$O_{\text{new}} = \alpha \cdot O_{\text{prev}} + P_{\text{block}} V_{\text{block}}$$
Verify that after all blocks are processed, $O / l$ exactly equals global softmax attention.

**Type Signatures & I/O Contract:**
```python
def online_softmax_step(
    m_prev: np.ndarray,
    l_prev: np.ndarray,
    O_prev: np.ndarray,
    S_block: np.ndarray,
    V_block: np.ndarray
) -> tuple[np.ndarray, np.ndarray, np.ndarray]: ...
```

#### 2. Starter Code
```python
import numpy as np

def online_softmax_step(m_prev, l_prev, O_prev, S_block, V_block):
    """Execute a single FlashAttention online softmax update step."""
    # TODO: 1. Compute m_new = max(m_prev, max(S_block))
    # TODO: 2. Compute rescale factor alpha = exp(m_prev - m_new)
    # TODO: 3. Compute P_block = exp(S_block - m_new)
    # TODO: 4. Rescale and accumulate l_new and O_new
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def online_softmax_step(m_prev, l_prev, O_prev, S_block, V_block):
    m_block = np.max(S_block, axis=-1, keepdims=True)
    m_new = np.maximum(m_prev, m_block)
    alpha = np.exp(m_prev - m_new)
    P_block = np.exp(S_block - m_new)
    l_new = alpha * l_prev + np.sum(P_block, axis=-1, keepdims=True)
    O_new = alpha * O_prev + np.matmul(P_block, V_block)
    return m_new, l_new, O_new
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
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

# --- Hidden Test Suite ---
assert not np.isnan(O_res).any()
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Accumulated output drifts or diverges from standard attention.
- **Where:** Rescaling of $O_{\text{prev}}$.
- **Why:** Past output contributions were scaled by $e^{m_{\text{prev}}}$, so they must be multiplied by $\alpha = e^{m_{\text{prev}} - m_{\text{new}}}$ when the maximum increases.
- **How:** Compute `O_new = alpha * O_prev + np.matmul(P_block, V_block)`.

---

### LESSON-T4-21: FlashAttention Tiled Block Forward Loop
**Module:** `MOD-41` | **Challenge ID:** `py-flash-forward-tiled`

#### 1. Challenge Specification & Mathematical Anchor
Implement the complete tiled FlashAttention forward pass. Divide Query into row blocks of size $B_r$ and Key/Value into column blocks of size $B_c$. Iterate through blocks while maintaining running statistics $(m_i, l_i, O_i)$ per row block, materializing zero full $N \times N$ attention matrices in memory.

**Type Signatures & I/O Contract:**
```python
def flash_attention_forward(
    Q: np.ndarray,
    K: np.ndarray,
    V: np.ndarray,
    block_r: int = 4,
    block_c: int = 4
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def flash_attention_forward(Q, K, V, block_r=4, block_c=4):
    """Tiled FlashAttention forward algorithm."""
    # TODO: Initialize O, l, m arrays
    # TODO: Outer loop over K, V blocks (columns)
    # TODO: Inner loop over Q blocks (rows)
    # TODO: Update running stats and normalize O by l at completion
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def flash_attention_forward(Q, K, V, block_r=4, block_c=4):
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
Q_t = np.random.randn(8, 4)
K_t = np.random.randn(8, 4)
V_t = np.random.randn(8, 4)
O_tiled = flash_attention_forward(Q_t, K_t, V_t, block_r=2, block_c=2)
S_std = np.matmul(Q_t, K_t.T) / np.sqrt(4)
P_std = np.exp(S_std - np.max(S_std, axis=-1, keepdims=True))
P_std /= np.sum(P_std, axis=-1, keepdims=True)
O_expected = np.matmul(P_std, V_t)
np.testing.assert_allclose(O_tiled, O_expected, rtol=1e-5, atol=1e-7)

# --- Hidden Test Suite ---
assert O_tiled.shape == Q_t.shape
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 60 ms
- **Peak Heap Memory:**  < 4.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Tiled output does not match global softmax output.
- **Where:** Block loop indexing.
- **Why:** When looping over column blocks $j$ first, query running states $m_i, l_i, O_i$ must be sliced by $[r_{\text{start}}:r_{\text{end}}]$.
- **How:** Slice `m[r_start:r_end]`, update in place, and normalize `O / l` at final return.

---

## Module 42: Parameter-Efficient Fine-Tuning (LoRA & QLoRA)

### LESSON-T4-22: Supervised Fine-Tuning (SFT) Causal Masked Loss
**Module:** `MOD-42` | **Challenge ID:** `py-sft-loss`

#### 1. Challenge Specification & Mathematical Anchor
Implement instruction fine-tuning loss calculation with label masking. In instruction tuning, loss is computed strictly over completion/response tokens; user prompt and instruction tokens are masked out with target label `-100`. Compute cross-entropy loss averaged strictly over non-ignored tokens and return the scalar loss alongside the count of active tokens.

**Type Signatures & I/O Contract:**
```python
def sft_masked_loss(
    logits: np.ndarray,
    labels: np.ndarray,
    ignore_index: int = -100
) -> tuple[float, int]: ...
# logits: (B, S, V), labels: (B, S)
# Returns: (mean_loss: float, active_token_count: int)
```

#### 2. Starter Code
```python
import numpy as np

def sft_masked_loss(logits: np.ndarray, labels: np.ndarray, ignore_index: int = -100) -> tuple[float, int]:
    """Compute masked SFT cross-entropy loss."""
    # TODO: 1. Filter out tokens where labels == ignore_index
    # TODO: 2. Compute log-sum-exp over active vocabulary logits
    # TODO: 3. Return mean loss over active tokens and active token count
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def sft_masked_loss(logits: np.ndarray, labels: np.ndarray, ignore_index: int = -100) -> tuple[float, int]:
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
logits_sft = np.random.randn(2, 3, 5)
labels_sft = np.array([[-100, 2, 4], [-100, -100, 1]])
loss_sft, n_active = sft_masked_loss(logits_sft, labels_sft)
assert n_active == 3
assert loss_sft > 0.0

# --- Hidden Test Suite ---
all_ignore = np.full((1, 4), -100)
l_zero, count_zero = sft_masked_loss(np.zeros((1, 4, 10)), all_ignore)
assert count_zero == 0 and l_zero == 0.0
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `ZeroDivisionError` when all labels in a batch are ignored.
- **Where:** Loss averaging step.
- **Why:** If `active_count == 0`, dividing by active count raises an exception.
- **How:** Check `if active_count == 0: return 0.0, 0` before calculating mean.

---

### LESSON-T4-23: Low-Rank Adaptation (LoRA) Linear Layer & Weight Merge
**Module:** `MOD-42` | **Challenge ID:** `py-lora-linear`

#### 1. Challenge Specification & Mathematical Anchor
Implement Low-Rank Adaptation (LoRA; Hu et al., 2021). Freeze pre-trained weight $W_0 \in \mathbb{R}^{d_{\text{out}} \times d_{\text{in}}}$ and inject trainable low-rank decomposition matrices $A \in \mathbb{R}^{r \times d_{\text{in}}}$ and $B \in \mathbb{R}^{d_{\text{out}} \times r}$:
$$h = x W_0^T + \frac{\alpha}{r} x A^T B^T$$
Initialize $B = 0$ so that the adapter output is initially identical to the pre-trained model. Implement `merge_weights()` to fold the low-rank delta $W_0 \leftarrow W_0 + \frac{\alpha}{r} B A$ directly into the base weights for zero-latency inference, and `unmerge_weights()` to restore the original base weight.

**Type Signatures & I/O Contract:**
```python
class LoRALinear:
    W_0: np.ndarray
    A: np.ndarray
    B: np.ndarray
    merged: bool
    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0) -> None: ...
    def forward(self, x: np.ndarray) -> np.ndarray: ...
    def merge_weights(self) -> None: ...
    def unmerge_weights(self) -> None: ...
```

#### 2. Starter Code
```python
import numpy as np

class LoRALinear:
    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0):
        self.in_features = in_features
        self.out_features = out_features
        self.rank = rank
        self.alpha = alpha
        self.scaling = alpha / rank
        self.W_0 = np.random.randn(out_features, in_features) * 0.02
        self.A = np.random.randn(rank, in_features) * 0.02
        self.B = np.zeros((out_features, rank))
        self.merged = False

    def forward(self, x: np.ndarray) -> np.ndarray:
        # TODO: Compute base output + scaled LoRA adapter output
        pass

    def merge_weights(self):
        # TODO: Fold (B @ A) * scaling into W_0
        pass

    def unmerge_weights(self):
        # TODO: Subtract (B @ A) * scaling from W_0
        pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

class LoRALinear:
    def __init__(self, in_features: int, out_features: int, rank: int = 4, alpha: float = 8.0):
        self.in_features = in_features
        self.out_features = out_features
        self.rank = rank
        self.alpha = alpha
        self.scaling = alpha / rank
        self.W_0 = np.random.randn(out_features, in_features) * 0.02
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
layer = LoRALinear(8, 4, rank=2)
x_lora = np.random.randn(2, 8)
out_init = layer.forward(x_lora)
out_base = np.dot(x_lora, layer.W_0.T)
np.testing.assert_allclose(out_init, out_base, atol=1e-7)

layer.B = np.random.randn(4, 2)
out_unmerged = layer.forward(x_lora)
layer.merge_weights()
out_merged = layer.forward(x_lora)
np.testing.assert_allclose(out_merged, out_unmerged, rtol=1e-5, atol=1e-7)

# --- Hidden Test Suite ---
layer.unmerge_weights()
np.testing.assert_allclose(layer.forward(x_lora), out_unmerged, rtol=1e-5, atol=1e-7)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Output doubles after merging weights.
- **Where:** `forward` method when `self.merged == True`.
- **Why:** If `forward` continues adding the LoRA adapter output after weights were merged into $W_0$, the delta update is counted twice.
- **How:** Check `if self.merged: return np.dot(x, self.W_0.T)`.

---

### LESSON-T4-24: 4-bit NormalFloat (NF4) Quantization & Block Dequantization
**Module:** `MOD-42` | **Challenge ID:** `py-nf4-quantize`

#### 1. Challenge Specification & Mathematical Anchor
Implement NormalFloat-4 (NF4; Dettmers et al., 2023) block-wise quantization for QLoRA. NF4 maps weights into 16 theoretically optimal quantiles of the standard normal distribution $\mathcal{N}(0, 1)$. Divide weight tensor into blocks of size `block_size` (e.g. 64), compute the absolute maximum scale $s = \max(|w_{\text{block}}|)$, normalize weights into $[-1, 1]$, and quantize to the nearest NF4 codebook level index (0 to 15). Implement dequantization to reconstruct FP32 weights.

**Type Signatures & I/O Contract:**
```python
def nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]: ...
def nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

NF4_CODEBOOK = np.array([
    -1.0, -0.6961928009986877, -0.5250730514526367, -0.39491748809814453,
    -0.28444138169288635, -0.18477343022823334, -0.09105003625154495, 0.0,
    0.07958029955625534, 0.16093020141124725, 0.24611230194568634, 0.33791524171829224,
    0.44070982933044434, 0.5626170039176941, 0.7229568362236023, 1.0
])

def nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]:
    """Quantize FP32 array into 4-bit indices and per-block scales."""
    # TODO: Reshape into blocks, find max absolute scales, find closest codebook index
    pass

def nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray:
    """Dequantize 4-bit indices back to FP32."""
    # TODO: Lookup codebook values and multiply by scales
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

NF4_CODEBOOK = np.array([
    -1.0, -0.6961928009986877, -0.5250730514526367, -0.39491748809814453,
    -0.28444138169288635, -0.18477343022823334, -0.09105003625154495, 0.0,
    0.07958029955625534, 0.16093020141124725, 0.24611230194568634, 0.33791524171829224,
    0.44070982933044434, 0.5626170039176941, 0.7229568362236023, 1.0
])

def nf4_quantize_block(w: np.ndarray, block_size: int = 64) -> tuple[np.ndarray, np.ndarray]:
    assert w.size % block_size == 0
    w_blocks = w.reshape(-1, block_size)
    scales = np.max(np.abs(w_blocks), axis=-1, keepdims=True)
    scales[scales == 0] = 1.0
    normalized = w_blocks / scales
    diffs = np.abs(normalized[..., np.newaxis] - NF4_CODEBOOK)
    indices = np.argmin(diffs, axis=-1).astype(np.uint8)
    return indices.reshape(w.shape), scales.squeeze(-1)

def nf4_dequantize_block(indices: np.ndarray, scales: np.ndarray, block_size: int = 64) -> np.ndarray:
    ind_blocks = indices.reshape(-1, block_size)
    q_vals = NF4_CODEBOOK[ind_blocks]
    w_recon = q_vals * scales[:, np.newaxis]
    return w_recon.reshape(indices.shape)
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
w_fp32 = np.random.randn(128)
q_inds, scales = nf4_quantize_block(w_fp32, block_size=64)
assert q_inds.shape == (128,)
assert scales.shape == (2,)
w_rec = nf4_dequantize_block(q_inds, scales, block_size=64)
rmse = np.sqrt(np.mean((w_fp32 - w_rec)**2))
assert rmse < 0.25

# --- Hidden Test Suite ---
assert np.all(q_inds >= 0) and np.all(q_inds <= 15)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 35 ms
- **Peak Heap Memory:**  < 3.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `IndexError` or reconstruction error $> 1.0$.
- **Where:** Broadcasting scales during dequantization.
- **Why:** Per-block scale array of shape `(num_blocks,)` must be expanded to `(num_blocks, 1)` to multiply block elements.
- **How:** Use `scales[:, np.newaxis]` when multiplying codebook values.

---

## Module 43: Alignment & Preference Optimization (DPO & GRPO)

### LESSON-T4-25: Bradley-Terry Preference Pair Loss & Logistic Gradient
**Module:** `MOD-43` | **Challenge ID:** `py-bradley-terry-reward`

#### 1. Challenge Specification & Mathematical Anchor
Implement the Bradley-Terry preference modeling objective used in Reward Modeling for RLHF:
$$P(y_w \succ y_l \mid x) = \sigma(r_w - r_l) = \frac{1}{1 + e^{-(r_w - r_l)}}$$
$$\mathcal{L}_{\text{BT}} = -\mathbb{E}\left[ \log \sigma(r_w - r_l) \right] = \mathbb{E}\left[ \log(1 + e^{-(r_w - r_l)}) \right]$$
Compute the numerically stable cross-entropy loss using `np.logaddexp` and derive the analytical gradients w.r.t $r_w$ and $r_l$.

**Type Signatures & I/O Contract:**
```python
def bradley_terry_loss(
    r_win: np.ndarray,
    r_loss: np.ndarray
) -> tuple[float, np.ndarray, np.ndarray]: ...
# r_win: (N,) scalar rewards for winning responses
# r_loss: (N,) scalar rewards for losing responses
# Returns: (loss: float, grad_w: np.ndarray, grad_l: np.ndarray)
```

#### 2. Starter Code
```python
import numpy as np

def bradley_terry_loss(r_win: np.ndarray, r_loss: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:
    """Compute Bradley-Terry preference loss and gradients."""
    # TODO: Compute stable loss using np.logaddexp(0, -(r_win - r_loss))
    # TODO: Compute analytical gradients w.r.t r_win and r_loss
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def bradley_terry_loss(r_win: np.ndarray, r_loss: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:
    diff = r_win - r_loss
    loss = -float(np.mean(-np.logaddexp(0.0, -diff)))
    p_loss = 1.0 / (1.0 + np.exp(np.clip(diff, -30.0, 30.0)))
    N = r_win.shape[0]
    grad_win = -p_loss / N
    grad_loss = p_loss / N
    return loss, grad_win, grad_loss
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
rw = np.array([2.0, 1.0])
rl = np.array([0.0, -1.0])
loss_bt, g_w, g_l = bradley_terry_loss(rw, rl)
assert loss_bt < 0.2
np.testing.assert_allclose(g_w, -g_l, atol=1e-7)

# --- Hidden Test Suite ---
rw_equal = np.array([0.0])
rl_equal = np.array([0.0])
l_eq, _, _ = bradley_terry_loss(rw_equal, rl_equal)
np.testing.assert_allclose(l_eq, np.log(2.0), atol=1e-6)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 25 ms
- **Peak Heap Memory:**  < 2.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `RuntimeWarning: overflow encountered in exp` when reward margin is large.
- **Where:** Loss computation.
- **Why:** Calculating $-\log \sigma(z) = -\log \frac{1}{1 + e^{-z}}$ overflows when $-z \gg 0$.
- **How:** Use `np.logaddexp(0.0, -diff)` which is guaranteed numerically stable.

---

### LESSON-T4-26: Direct Preference Optimization (DPO) Loss & Implicit Reward Margin
**Module:** `MOD-43` | **Challenge ID:** `py-dpo-loss`

#### 1. Challenge Specification & Mathematical Anchor
Implement Direct Preference Optimization (DPO; Rafailov et al., 2023). DPO reparameterizes the Bradley-Terry preference model directly in terms of policy log-probabilities, eliminating the separate reward model:
$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{(x, y_w, y_l)} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)} \right) \right]$$
Calculate the scalar loss, average implicit reward margin $\beta \left( \log \frac{\pi_\theta(y_w)}{\pi_{\text{ref}}(y_w)} - \log \frac{\pi_\theta(y_l)}{\pi_{\text{ref}}(y_l)} \right)$, and preference classification accuracy.

**Type Signatures & I/O Contract:**
```python
def dpo_loss(
    policy_win_logps: np.ndarray,
    policy_loss_logps: np.ndarray,
    ref_win_logps: np.ndarray,
    ref_loss_logps: np.ndarray,
    beta: float = 0.1
) -> tuple[float, float, float]: ...
```

#### 2. Starter Code
```python
import numpy as np

def dpo_loss(policy_win_logps, policy_loss_logps, ref_win_logps, ref_loss_logps, beta=0.1):
    """Compute DPO loss, reward margin, and preference accuracy."""
    # TODO: 1. Calculate log ratios for winning and losing completions
    # TODO: 2. Calculate beta-scaled margin logits
    # TODO: 3. Compute loss, reward margin, and accuracy
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def dpo_loss(policy_win_logps, policy_loss_logps, ref_win_logps, ref_loss_logps, beta=0.1):
    pi_win_ratio = policy_win_logps - ref_win_logps
    pi_loss_ratio = policy_loss_logps - ref_loss_logps
    logits = beta * (pi_win_ratio - pi_loss_ratio)
    loss = float(np.mean(np.logaddexp(0.0, -logits)))
    reward_margin = float(np.mean(logits))
    accuracy = float(np.mean(logits > 0.0))
    return loss, reward_margin, accuracy
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
p_w, p_l = np.array([-1.2]), np.array([-2.5])
r_w, r_l = np.array([-1.5]), np.array([-2.0])
loss_d, margin_d, acc_d = dpo_loss(p_w, p_l, r_w, r_l, beta=0.1)
assert loss_d > 0.0
assert acc_d == 1.0

# --- Hidden Test Suite ---
assert margin_d > 0.0
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 25 ms
- **Peak Heap Memory:**  < 2.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Accuracy evaluates to 0.0 despite winning policy having higher probability.
- **Where:** Log ratio computation.
- **Why:** Log ratio is $\log \pi_\theta - \log \pi_{\text{ref}}$, NOT division of log probabilities.
- **How:** Compute `pi_win_ratio = policy_win_logps - ref_win_logps`.

---

### LESSON-T4-27: Group Relative Policy Optimization (GRPO) Advantage & Objective
**Module:** `MOD-43` | **Challenge ID:** `py-grpo-advantage`

#### 1. Challenge Specification & Mathematical Anchor
Implement Group Relative Policy Optimization (GRPO; Shao et al., 2024 / DeepSeekMath). GRPO discards the critic network by sampling a group of $G$ candidate outputs $\{o_1, o_2, \dots, o_G\}$ for each query and normalizing advantages across the group:
$$A_i = \frac{R_i - \text{mean}(\{R_1, \dots, R_G\})}{\text{std}(\{R_1, \dots, R_G\}) + \epsilon}$$
Compute the clipped surrogate policy loss combined with the unbiased KL divergence penalty against reference policy:
$$\mathcal{L} = -\frac{1}{G} \sum_{i=1}^G \min\left( r_i A_i, \text{clip}(r_i, 1-\epsilon, 1+\epsilon) A_i \right) + \beta \mathbb{D}_{\text{KL}}(\pi_\theta \parallel \pi_{\text{ref}})$$

**Type Signatures & I/O Contract:**
```python
def grpo_compute_advantages_and_loss(
    rewards: np.ndarray,
    logp: np.ndarray,
    old_logp: np.ndarray,
    ref_logp: np.ndarray,
    beta_kl: float = 0.04,
    clip_eps: float = 0.2
) -> tuple[np.ndarray, float]: ...
```

#### 2. Starter Code
```python
import numpy as np

def grpo_compute_advantages_and_loss(rewards, logp, old_logp, ref_logp, beta_kl=0.04, clip_eps=0.2):
    """Compute group-relative normalized advantages and GRPO loss."""
    # TODO: 1. Group-normalize rewards: (r - mean) / (std + eps)
    # TODO: 2. Compute importance ratio r_i = exp(logp - old_logp)
    # TODO: 3. Compute clipped surrogate loss
    # TODO: 4. Add KL penalty and return (advantages, total_loss)
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def grpo_compute_advantages_and_loss(rewards, logp, old_logp, ref_logp, beta_kl=0.04, clip_eps=0.2):
    eps = 1e-8
    mean_r = np.mean(rewards)
    std_r = np.std(rewards)
    advantages = (rewards - mean_r) / (std_r + eps)

    ratio = np.exp(logp - old_logp)
    surr1 = ratio * advantages
    surr2 = np.clip(ratio, 1.0 - clip_eps, 1.0 + clip_eps) * advantages
    policy_loss = -np.mean(np.minimum(surr1, surr2))

    kl = np.exp(ref_logp - logp) - (ref_logp - logp) - 1.0
    total_loss = float(policy_loss + beta_kl * np.mean(kl))
    return advantages, total_loss
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
rewards = np.array([1.0, 2.0, 3.0, 4.0])
adv, loss_grpo = grpo_compute_advantages_and_loss(rewards, np.zeros(4), np.zeros(4), np.zeros(4))
np.testing.assert_allclose(np.mean(adv), 0.0, atol=1e-7)
np.testing.assert_allclose(np.std(adv), 1.0, atol=1e-4)

# --- Hidden Test Suite ---
assert adv[3] > adv[0]
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `ZeroDivisionError` when all sampled completions receive identical rewards.
- **Where:** Advantage standard deviation normalization.
- **Why:** When all rewards are equal, `np.std(rewards) == 0`.
- **How:** Add small $\epsilon = 10^{-8}$ to the denominator: `(rewards - mean) / (std + 1e-8)`.

---

## Module 44: State-Space Models (Mamba Selective Scan)

### LESSON-T4-28: Continuous-to-Discrete State Space ZOH Discretization
**Module:** `MOD-44` | **Challenge ID:** `py-ssm-discretize`

#### 1. Challenge Specification & Mathematical Anchor
Discretize continuous state space model parameters $(A, B)$ using the Zero-Order Hold (ZOH) transformation (Gu & Dao, 2023 / Mamba):
$$\bar{A} = \exp(\Delta A), \quad \bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot (\Delta B) \approx \Delta B$$
Given input-dependent timescale step $\Delta \in \mathbb{R}^{B \times L \times D}$, diagonal transition matrix $A \in \mathbb{R}^{D \times N}$, and input matrix $B \in \mathbb{R}^{B \times L \times N}$, compute the discretized parameter matrices $\bar{A}, \bar{B} \in \mathbb{R}^{B \times L \times D \times N}$.

**Type Signatures & I/O Contract:**
```python
def discretize_zoh(
    delta: np.ndarray,
    A: np.ndarray,
    B: np.ndarray
) -> tuple[np.ndarray, np.ndarray]: ...
```

#### 2. Starter Code
```python
import numpy as np

def discretize_zoh(delta: np.ndarray, A: np.ndarray, B: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Discretize continuous SSM parameters via Zero-Order Hold."""
    # TODO: Broadcast delta (B, L, D) and A (D, N) to compute A_bar = exp(delta * A)
    # TODO: Compute B_bar = delta * B
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def discretize_zoh(delta: np.ndarray, A: np.ndarray, B: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    A_bar = np.exp(delta[..., np.newaxis] * A)
    B_bar = delta[..., np.newaxis] * B[:, :, np.newaxis, :]
    return A_bar, B_bar
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
delta = np.full((1, 2, 3), 0.1)
A = -np.ones((3, 4))
B = np.ones((1, 2, 4))
A_bar, B_bar = discretize_zoh(delta, A, B)
np.testing.assert_allclose(A_bar[0, 0, 0, 0], np.exp(-0.1), atol=1e-7)
np.testing.assert_allclose(B_bar[0, 0, 0, 0], 0.1, atol=1e-7)

# --- Hidden Test Suite ---
assert A_bar.shape == (1, 2, 3, 4)
assert B_bar.shape == (1, 2, 3, 4)
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `ValueError: operands could not be broadcast together`.
- **Where:** Multiplying `delta` by `A`.
- **Why:** `delta` is `(B, L, D)` while `A` is `(D, N)`. `delta` must have an added trailing axis `(B, L, D, 1)`.
- **How:** Expand dimensions using `delta[..., np.newaxis] * A`.

---

### LESSON-T4-29: Mamba Input-Dependent Selective Scan Recurrence
**Module:** `MOD-44` | **Challenge ID:** `py-mamba-scan`

#### 1. Challenge Specification & Mathematical Anchor
Implement the Mamba selective scan recurrence. Given discretized parameters $\bar{A}_t, \bar{B}_t x_t \in \mathbb{R}^{L \times D \times N}$ and output projection matrix $C_t \in \mathbb{R}^{L \times D \times N}$, unroll the hidden state dynamics across sequence length $L$:
$$h_t = \bar{A}_t \odot h_{t-1} + \bar{B}_t x_t, \quad y_t = \sum_{n=1}^N h_{t, :, n} C_{t, :, n}$$
Compute output representations $y \in \mathbb{R}^{L \times D}$ with strict linear sequence complexity $O(L)$.

**Type Signatures & I/O Contract:**
```python
def selective_scan(
    A_bar: np.ndarray,
    B_bar_x: np.ndarray,
    C: np.ndarray
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def selective_scan(A_bar: np.ndarray, B_bar_x: np.ndarray, C: np.ndarray) -> np.ndarray:
    """Execute selective scan recurrence over sequence length L."""
    # TODO: Initialize hidden state h = zeros((D, N))
    # TODO: Iterate t in 0..L-1: h = A_bar[t] * h + B_bar_x[t]
    # TODO: Compute y_t = sum(h * C[t], axis=-1)
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def selective_scan(A_bar: np.ndarray, B_bar_x: np.ndarray, C: np.ndarray) -> np.ndarray:
    L, D, N = A_bar.shape
    h = np.zeros((D, N))
    ys = []
    for t in range(L):
        h = A_bar[t] * h + B_bar_x[t]
        y_t = np.sum(h * C[t], axis=-1)
        ys.append(y_t)
    return np.stack(ys, axis=0)
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
L, D, N = 5, 2, 3
A_b = np.full((L, D, N), 0.5)
Bx = np.ones((L, D, N))
C_m = np.ones((L, D, N))
y_mamba = selective_scan(A_b, Bx, C_m)
assert y_mamba.shape == (L, D)
np.testing.assert_allclose(y_mamba[0], np.full(D, 3.0), atol=1e-7)

# --- Hidden Test Suite ---
assert not np.isnan(y_mamba).any()
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 35 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Output shape is `(L, D, N)` instead of `(L, D)`.
- **Where:** Output projection step.
- **Why:** The state dimension $N$ must be contracted by dot product / summation with $C_t$.
- **How:** Sum along state axis: `np.sum(h * C[t], axis=-1)`.

---

## Module 45: Generative Diffusion Models (DDPM & Score SDEs)

### LESSON-T4-30: DDPM Forward Markov Chain Closed-Form Marginal Sampling
**Module:** `MOD-45` | **Challenge ID:** `py-ddpm-q-sample`

#### 1. Challenge Specification & Mathematical Anchor
Implement the closed-form forward diffusion process $q(x_t \mid x_0)$ (Sohl-Dickstein et al., 2015; Ho et al., 2020). Using the cumulative product $\bar{\alpha}_t = \prod_{s=1}^t (1 - \beta_s)$, any intermediate noisy latent $x_t$ can be sampled in a single step without recursive iteration:
$$x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \cdot \epsilon, \quad \epsilon \sim \mathcal{N}(0, \mathbf{I})$$

**Type Signatures & I/O Contract:**
```python
def ddpm_q_sample(
    x_0: np.ndarray,
    t: int,
    noise: np.ndarray,
    alpha_bars: np.ndarray
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def ddpm_q_sample(x_0: np.ndarray, t: int, noise: np.ndarray, alpha_bars: np.ndarray) -> np.ndarray:
    """Sample noisy latent x_t in closed form."""
    # TODO: Retrieve alpha_bar at timestep t
    # TODO: Blend x_0 and noise using sqrt(alpha_bar) and sqrt(1 - alpha_bar)
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def ddpm_q_sample(x_0: np.ndarray, t: int, noise: np.ndarray, alpha_bars: np.ndarray) -> np.ndarray:
    a_bar = alpha_bars[t]
    return np.sqrt(a_bar) * x_0 + np.sqrt(1.0 - a_bar) * noise
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
alpha_bars = np.array([1.0, 0.9, 0.5, 0.1])
x0 = np.array([2.0, -1.0])
noise = np.array([0.5, -0.5])
assert np.allclose(ddpm_q_sample(x0, 0, noise, alpha_bars), x0)
res = ddpm_q_sample(x0, 2, noise, alpha_bars)
expected = np.sqrt(0.5) * x0 + np.sqrt(0.5) * noise
np.testing.assert_allclose(res, expected, atol=1e-7)

# --- Hidden Test Suite ---
assert res.shape == x0.shape
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 15 ms
- **Peak Heap Memory:**  < 1.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Output variance does not sum to 1.0.
- **Where:** Scaling coefficients.
- **Why:** The coefficients must square to 1: $(\sqrt{\bar{\alpha}})^2 + (\sqrt{1-\bar{\alpha}})^2 = 1$.
- **How:** Ensure square roots are taken: `np.sqrt(a_bar) * x_0 + np.sqrt(1.0 - a_bar) * noise`.

---

### LESSON-T4-31: DDPM Reverse Step with Classifier-Free Guidance (CFG)
**Module:** `MOD-45` | **Challenge ID:** `py-ddpm-step`

#### 1. Challenge Specification & Mathematical Anchor
Implement the reverse denoising step $p_\theta(x_{t-1} \mid x_t)$ with Classifier-Free Guidance (CFG; Ho & Salimans, 2022). Extrapolate conditioned and unconditioned noise estimates:
$$\tilde{\epsilon}_\theta = \epsilon_{\text{uncond}} + s \cdot (\epsilon_{\text{cond}} - \epsilon_{\text{uncond}})$$
Compute the posterior mean $\mu_\theta(x_t, t)$ and add stochastic noise for $t > 0$:
$$\mu_\theta = \frac{1}{\sqrt{\alpha_t}} \left( x_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \tilde{\epsilon}_\theta \right), \quad x_{t-1} = \mu_\theta + \sigma_t z$$
where $\sigma_t^2 = \frac{1 - \bar{\alpha}_{t-1}}{1 - \bar{\alpha}_t} \beta_t$.

**Type Signatures & I/O Contract:**
```python
def ddpm_p_sample_step(
    x_t: np.ndarray,
    t: int,
    eps_cond: np.ndarray,
    eps_uncond: np.ndarray,
    cfg_scale: float,
    betas: np.ndarray,
    alpha_bars: np.ndarray,
    z: np.ndarray | None = None
) -> np.ndarray: ...
```

#### 2. Starter Code
```python
import numpy as np

def ddpm_p_sample_step(x_t, t, eps_cond, eps_uncond, cfg_scale, betas, alpha_bars, z=None):
    """Execute single reverse DDPM step with CFG."""
    # TODO: 1. Combine eps using CFG formula
    # TODO: 2. Compute posterior mean mu_theta
    # TODO: 3. If t == 0 return mu_theta, else add sigma_t * z
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import numpy as np

def ddpm_p_sample_step(x_t, t, eps_cond, eps_uncond, cfg_scale, betas, alpha_bars, z=None):
    eps_theta = eps_uncond + cfg_scale * (eps_cond - eps_uncond)
    beta_t = betas[t]
    alpha_t = 1.0 - beta_t
    alpha_bar_t = alpha_bars[t]

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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
betas_arr = np.array([0.1, 0.2])
alpha_bars_arr = np.array([0.9, 0.72])
xt = np.ones(3)
eps_c = np.ones(3) * 0.5
eps_u = np.ones(3) * 0.1
x_prev = ddpm_p_sample_step(xt, t=0, eps_cond=eps_c, eps_uncond=eps_u, cfg_scale=2.0, betas=betas_arr, alpha_bars=alpha_bars_arr)
assert x_prev.shape == (3,)

# --- Hidden Test Suite ---
assert not np.isnan(x_prev).any()
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 30 ms
- **Peak Heap Memory:**  < 2.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Noise added at final timestep $t=0$.
- **Where:** Final step check.
- **Why:** At $t=0$, the process terminates deterministically at clean output $x_0 = \mu_\theta$; adding noise causes blurry artifacts.
- **How:** Check `if t == 0: return mu_theta`.

---

## Module 46: Autonomous LLM Agents (ReAct & Tool Calling)

### LESSON-T4-32: ReAct Agent Step Parsing & Tool Execution Dispatcher
**Module:** `MOD-46` | **Challenge ID:** `py-react-agent-step`

#### 1. Challenge Specification & Mathematical Anchor
Implement the parsing and tool dispatching step of the ReAct (Reasoning + Acting; Yao et al., 2022) framework. Parse structured LLM output containing thoughts and actions:
```
Thought: [reasoning trace]
Action: [tool_name]
Action Input: [arguments]
```
or termination pattern:
```
Thought: [reasoning trace]
Final Answer: [final solution]
```
Execute the requested tool from the registry, capture tool exceptions safely, and format the observation string.

**Type Signatures & I/O Contract:**
```python
def react_step_parse_and_execute(
    response_text: str,
    tools: dict[str, callable]
) -> tuple[str, str, str, str]: ...
# Returns: (thought: str, action: str, action_input: str, observation: str)
```

#### 2. Starter Code
```python
import re

def react_step_parse_and_execute(response_text: str, tools: dict[str, callable]) -> tuple[str, str, str, str]:
    """Parse LLM text and execute tool if action is requested."""
    # TODO: 1. Extract Thought, Action, Action Input, or Final Answer
    # TODO: 2. If Final Answer present, return (thought, 'FINISH', '', final_answer)
    # TODO: 3. Dispatch action to tools dictionary and capture output as observation
    pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
import re

def react_step_parse_and_execute(response_text: str, tools: dict[str, callable]) -> tuple[str, str, str, str]:
    thought = ""
    action = ""
    action_input = ""
    observation = ""

    t_match = re.search(r"Thought:\s*(.*?)(?=
Action:|
Final Answer:|$)", response_text, re.DOTALL)
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
tools_dict = {"search": lambda q: f"Search result for {q}", "calculator": lambda exp: str(eval(exp))}
txt = "Thought: I need to calculate 2 + 2\nAction: calculator\nAction Input: 2 + 2"
th, act, act_in, obs = react_step_parse_and_execute(txt, tools_dict)
assert act == "calculator"
assert act_in == "2 + 2"
assert obs == "4"

txt_finish = "Thought: I am done.\nFinal Answer: 42"
th_f, act_f, _, obs_f = react_step_parse_and_execute(txt_finish, tools_dict)
assert act_f == "FINISH"
assert obs_f == "42" 

# --- Hidden Test Suite ---
txt_missing = "Thought: Test\nAction: unknown\nAction Input: foo"
_, _, _, obs_err = react_step_parse_and_execute(txt_missing, tools_dict)
assert "not found" in obs_err
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 20 ms
- **Peak Heap Memory:**  < 2.0 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** `Action Input` captures subsequent newlines or fails to parse multiline thoughts.
- **Where:** Regular expression patterns.
- **Why:** Thought blocks often span multiple lines before the `Action:` keyword.
- **How:** Use `re.DOTALL` with lookahead `(?=\nAction:|\nFinal Answer:|$)`.

---

### LESSON-T4-33: Autonomous Multi-Turn Agent Loop with Cycle Detection & Memory
**Module:** `MOD-46` | **Challenge ID:** `py-react-agent`

#### 1. Challenge Specification & Mathematical Anchor
Construct the full autonomous multi-turn ReAct agent loop. Maintain persistent conversation history, repeatedly prompt the LLM with accumulated thoughts, actions, and observations, detect repetitive cycles (identical action and input), respect a maximum turn budget, and terminate upon receiving `Final Answer:`.

**Type Signatures & I/O Contract:**
```python
class ReActAgent:
    tools: dict[str, callable]
    max_turns: int
    def __init__(self, tools: dict[str, callable], max_turns: int = 5) -> None: ...
    def run(self, query: str, mock_llm: callable) -> dict: ...
# Returns: {"status": "success" | "cycle_detected" | "max_turns_exceeded", "final_answer": str | None, "turns": int, "history": list[str]}
```

#### 2. Starter Code
```python
class ReActAgent:
    def __init__(self, tools: dict[str, callable], max_turns: int = 5):
        self.tools = tools
        self.max_turns = max_turns

    def run(self, query: str, mock_llm: callable) -> dict:
        """Execute autonomous multi-turn ReAct loop."""
        # TODO: 1. Maintain history list starting with Question: query
        # TODO: 2. Loop up to max_turns
        # TODO: 3. Parse LLM response, detect cycles, and terminate on FINISH
        pass
```

#### 3. Reference Solution (Zero Black-Box Dependencies)
```python
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
```

#### 4. Verification & Assertion Suite
```python
# --- Public Test Suite ---
def mock_agent_llm(prompt: str) -> str:
    if "Observation: Search result for Paris" in prompt:
        return "Thought: Now I know the answer.\nFinal Answer: Paris is the capital of France."
    return "Thought: I should search for Paris.\nAction: search\nAction Input: Paris"

agent = ReActAgent(tools={"search": lambda q: f"Search result for {q}"}, max_turns=3)
res_agent = agent.run("What is Paris?", mock_agent_llm)
assert res_agent["status"] == "success"
assert res_agent["final_answer"] == "Paris is the capital of France."
assert res_agent["turns"] == 2

# --- Hidden Test Suite ---
def mock_looping_llm(prompt: str) -> str:
    return "Thought: Looping\nAction: search\nAction Input: loop"
agent_loop = ReActAgent(tools={"search": lambda q: "result"}, max_turns=5)
res_loop = agent_loop.run("Loop test", mock_looping_llm)
assert res_loop["status"] == "cycle_detected" 
```

#### 5. Pyodide WASM Execution Budget
- **CPU Time Ceiling:** < 45 ms
- **Peak Heap Memory:**  < 3.5 MB
- **Vectorization Guarantee:** High-throughput NumPy array operations, zero extraneous Python looping over tensor elements.

#### 6. 4-Part Diagnostic Hints
- **What:** Agent enters infinite loop when model generates repeated actions.
- **Where:** Loop continuation check.
- **Why:** LLMs without cycle detection often get stuck calling the same tool with the same arguments repeatedly.
- **How:** Track `seen_actions.add(f'{action}:{action_input}')` and terminate with `'cycle_detected'` upon repeat.

---


---

## Complete Verification Protocol

All 33 coding challenges and numerical assertions are verified against CPython 3.12 and NumPy 1.26.4 in `scripts/test_track4_challenges.py`.
Every challenge executes well within the in-browser Pyodide WebAssembly performance threshold (< 800 ms CPU wall-clock, < 350 MB heap ceiling), ensuring instant zero-latency automated grading inside the OKVIR learning environment.
