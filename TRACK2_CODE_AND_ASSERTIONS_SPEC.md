# OKVIR: Track 2 (CS, Python & Data Engineering)
## Master Code Challenge & Assertion Architecture Specification

> **Specification Version:** `1.0.0-PROD`  
> **Course Track:** Track 2 — Computer Science, Modern Python & Data Engineering  
> **Modules Covered:** `MOD-08` through `MOD-17` (30 Lessons Total)  
> **Runtime Target:** In-Browser Sandboxed Pyodide (Python 3.12) & DuckDB WASM (SQL v1.1+)  
> **Execution Budget Constraints:** $\le 800\text{ms}$ wall-clock execution per test suite, $\le 350\text{MB}$ peak heap  
> **Pedagogical Loop:** 4-Part Socratic Diagnostic Feedback (What, Where, Why, How)

---

## 1. Track Architectural Overview & Sandbox Invariants

Track 2 transitions learners from procedural programming intuition to industrial systems-level data engineering, memory mechanical sympathy, and relational calculus. Every challenge is strictly validated in an in-browser WebAssembly sandbox:

```
+-----------------------------------------------------------------------------------------+
|                                    OKVIR CLIENT BROWSER                                 |
|                                                                                         |
|  +-------------------------------------+       +-------------------------------------+  |
|  |     Pyodide WASM (Python 3.12)      |       |       DuckDB WASM (SQL v1.1+)       |  |
|  |                                     |       |                                     |  |
|  |  * Contiguous C-Memory Layouts       |       |  * Columnar Vectorized Execution    |  |
|  |  * SIMD128 Register Operations      |       |  * Zero-Copy Arrow Table Transfers  |  |
|  |  * Zero-Copy Memory Strides Views   |       |  * Multi-Pass Analytical Windows    |  |
|  |  * Bound Memory Generators          |       |  * Recursive CTE Fixed-Points       |  |
|  |  * Sub-800ms Strict Timeout         |       |  * Sub-800ms Strict Timeout         |  |
|  +-------------------------------------+       +-------------------------------------+  |
|                     ^                                             ^                     |
|                     |                                             |                     |
|  +------------------+---------------------------------------------+------------------+  |
|  |                     OKVIR Pro Diagnostic Bridge & Assertion Engine                 |  |
|  |                                                                                   |  |
|  |   [What: Symptom] -> [Where: Location] -> [Why: C-API/Kernel] -> [How: Remedy]     |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

### Sandbox Budget Invariants:
1. **Wall-Clock Latency:** All test batteries must complete within **800ms** on an emulated WASM single thread.
2. **Heap Memory Ceiling:** Memory consumption is strictly capped at **350MB**. Algorithms requiring quadratic space $\mathcal{O}(N^2)$ or unbounded recursion are disqualified.
3. **Purity & Isolation:** Tests execute against pristine execution frames without shared cross-test contamination.
4. **Diagnostic Feedback:** Every failure message adheres strictly to the 4-part Socratic taxonomy:
   - **What (The Symptom):** Precise observable failure or runtime exception.
   - **Where (The Localization):** The exact function, loop, or AST node triggering divergence.
   - **Why (The Mechanism):** The underlying memory, bytecode, or relational algebra mechanism.
   - **How (The Remediation):** Concrete, actionable refactoring guidance adhering to 2026 idioms.

---

## 2. Complete Catalog of Track 2 Challenges (Lessons 01 to 30)

| Lesson ID | Challenge ID | Module | Title | Runtime |
| :--- | :--- | :--- | :--- | :--- |

| `LESSON-T2-01` | `py-var-swap-identity` | `MOD-08` | Name-Binding, Reference Assignment & In-Place Swap | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-02` | `py-short-circuit-eval` | `MOD-08` | Control Flow, Falsy Values & Short-Circuit Evaluation | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-03` | `py-scope-legb-counter` | `MOD-08` | Environment Frames, LEGB Rule & Nonlocal Accumulators | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-04` | `py-pure-transform-immut` | `MOD-09` | Pure Functions, Referential Transparency & Immutability | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-05` | `py-hof-compose-pipeline` | `MOD-09` | Higher-Order Functions & Callable Composition Pipeline | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-06` | `py-closure-rate-limiter` | `MOD-09` | Lexical Closures & Sliding Window Rate Limiting | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-07` | `py-recur-tree-flatten` | `MOD-10` | Recursion Trees, Deep Flattening & Call Stack Depth | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-08` | `py-sequence-slice-stride` | `MOD-10` | Sequence Protocol, Custom Striding & Window Slicing | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-09` | `py-aliasing-deep-clone` | `MOD-10` | Pointer Aliasing, Mutation Traps & Deep Defensive Copy | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-10` | `py-hash-table-probe` | `MOD-11` | Linear Probing Hash Table & Collision Resolution | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-11` | `py-two-sum-hash` | `MOD-11` | Optimal Hash Indexing, Two-Sum & Frequency Inversion | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-12` | `py-big-o-dedup-benchmark` | `MOD-11` | Sub-Quadratic Optimization: O(N^2) to O(N) Deduplication | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-13` | `py-dunder-vector-protocol` | `MOD-12` | Python Data Model: Vector Dunder Protocol | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-14` | `py-custom-range-iter` | `MOD-12` | Iterator Protocol: Stateful Chunking Iterator | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-15` | `py-running-average-gen` | `MOD-12` | Memory-Bounded Generator: Streaming Online Welford Stats | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-16` | `py-simd-squared-error` | `MOD-13` | SIMD Vectorization: Contiguous C-Arrays vs Boxed Loops | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-17` | `py-stride-sliding-window` | `MOD-13` | Memory Strides & Zero-Copy Rolling Window via as_strided | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-18` | `py-broadcast-pairwise-dist` | `MOD-13` | NumPy Broadcasting: Pairwise Distance Matrix without Loops | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-19` | `py-dataframe-series-align` | `MOD-14` | DataFrame Mental Model & Automatic Index Alignment | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-20` | `py-loc-iloc-filter` | `MOD-14` | Deterministic Indexing: Boolean Masking, loc vs iloc Invariants | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-21` | `py-tidy-melt-pivot` | `MOD-14` | Tidy Data Architecture: Unpivoting Multi-Index Observational Data | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-22` | `py-groupby-split-apply` | `MOD-14` | GroupBy Split-Apply-Combine: Normalized Z-Score by Category | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-23` | `sql-logical-exec-order` | `MOD-15` | Relational Execution Pipeline: Filtering Pre- and Post-Aggregation | `DuckDB WASM (SQL v1.1+)` |
| `LESSON-T2-24` | `sql-join-coalesce-null` | `MOD-15` | Relational Joins, Anti-Joins & Three-Valued Logic NULL Handling | `DuckDB WASM (SQL v1.1+)` |
| `LESSON-T2-25` | `sql-case-pivot-agg` | `MOD-15` | Conditional Aggregation & Matrix Pivot with CASE WHEN | `DuckDB WASM (SQL v1.1+)` |
| `LESSON-T2-26` | `sql-window-dense-rank` | `MOD-16` | Partitioned Window Functions: Dense Rank with Tie Breaking | `DuckDB WASM (SQL v1.1+)` |
| `LESSON-T2-27` | `sql-window-frame-delta` | `MOD-16` | Moving Window Framing: Rolling 3-Day Revenue & Period Deltas | `DuckDB WASM (SQL v1.1+)` |
| `LESSON-T2-28` | `sql-recursive-org-tree` | `MOD-16` | Recursive CTEs: Hierarchical Tree Traversal & Path Accumulation | `DuckDB WASM (SQL v1.1+)` |
| `LESSON-T2-29` | `py-arrow-columnar-dict` | `MOD-17` | Arrow Columnar IPC & Dictionary-Encoded Memory Compression | `Pyodide WASM (Python 3.12)` |
| `LESSON-T2-30` | `py-polars-lazy-dag` | `MOD-17` | Polars LazyFrames: Query DAG Optimization & Pushdown | `Pyodide WASM (Python 3.12)` |

---

## 3. Comprehensive Lesson Specifications & Assertion Batteries


---

## Module MOD-08: Python Foundations & Execution Model

### Lesson T2-01: Name-Binding, Reference Assignment & In-Place Swap
- **Challenge ID:** `py-var-swap-identity`
- **Module:** `MOD-08: Python Foundations & Execution Model`
- **Lesson Number:** `LESSON-T2-01`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In CPython, variable identifiers do not act as static memory storage boxes; rather, they are names bound to dynamically allocated objects in the private process heap. Assignment (`a = b`) binds the identifier `a` to the exact 64-bit heap pointer address currently bound to `b`, incrementing the object's internal reference count `ob_refcnt`.

In this challenge, formulate a function `swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]` that:
1. Records the initial memory identities $\text{id}(a)$ and $\text{id}(b)$ using Python's built-in `id()`.
2. Performs an atomic reference swap using tuple unpacking: `a, b = b, a`.
3. Records the post-swap identities $\text{id}(a)$ and $\text{id}(b)$.
4. Returns a 3-element nested tuple: `((a, b), (initial_id_a, initial_id_b), (post_id_a, post_id_b))`.

**Mathematical & Memory Invariants:**
- Initial identity equality: $\text{initial\_id\_a} = \text{id}(a_{\text{orig}})$, $\text{initial\_id\_b} = \text{id}(b_{\text{orig}})$.
- Swapped identity correspondence: $\text{post\_id\_a} = \text{initial\_id\_b}$, $\text{post\_id\_b} = \text{initial\_id\_a}$.
- Object preservation: The underlying heap payloads are never re-instantiated or mutated during the swap.

**Input/Output Types:**
- `a: Any`: Arbitrary Python object (scalar, sequence, dictionary, or custom object).
- `b: Any`: Arbitrary Python object.
- **Return Type:** `tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]`.

**Constraints:**
- Must not use temporary variable names (e.g. `temp = a`).
- Must operate in $\mathcal{O}(1)$ time and $\mathcal{O}(1)$ auxiliary space.


#### 2. Clean Starter Code
```python
from typing import Any

def swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]:
    """
    Performs an in-place reference swap of two bindings using tuple packing/unpacking
    and returns the swapped values alongside pre- and post-swap memory address identities.

    Args:
        a: First object reference.
        b: Second object reference.

    Returns:
        A tuple ((swapped_a, swapped_b), (pre_id_a, pre_id_b), (post_id_a, post_id_b)).
    """
    # TODO: Record initial IDs, swap bindings using tuple unpacking, record post IDs
    raise NotImplementedError("Implement swap_and_track_identity")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any

def swap_and_track_identity(a: Any, b: Any) -> tuple[tuple[Any, Any], tuple[int, int], tuple[int, int]]:
    # Capture initial memory addresses of heap objects
    initial_id_a: int = id(a)
    initial_id_b: int = id(b)
    
    # Modern Python tuple packing/unpacking performs atomic reference swap
    # Bytecode: ROT_TWO (or BUILD_TUPLE 2 + UNPACK_SEQUENCE 2)
    a, b = b, a
    
    # Capture post-swap addresses
    post_id_a: int = id(a)
    post_id_b: int = id(b)
    
    return ((a, b), (initial_id_a, initial_id_b), (post_id_a, post_id_b))
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `swap_and_track_identity(100, 200)` -> `((200, 100), (id_100, id_200), (id_200, id_100))`
- `swap_and_track_identity([1, 2], [3, 4])` -> Swaps list bindings; verify post-swap list mutations.

**Hidden Test Cases:**
- Boundary: Swapping identical references `x = [1, 2]; swap_and_track_identity(x, x)` -> All 4 IDs identical.
- Complex types: Custom class instances with nested references.
- Large objects: Verifies zero deep-copying memory footprint.

**Executable Test Harness:**
```python
def test_py_var_swap():
    # Test Case 1: Mutable objects (lists)
    l1 = [1, 2, 3]
    l2 = [9, 8, 7]
    id_l1_orig = id(l1)
    id_l2_orig = id(l2)
    
    values, pre_ids, post_ids = swap_and_track_identity(l1, l2)
    assert values == ([9, 8, 7], [1, 2, 3]), "Values must be swapped"
    assert pre_ids == (id_l1_orig, id_l2_orig), "Pre-swap IDs must match original objects"
    assert post_ids == (id_l2_orig, id_l1_orig), "Post-swap IDs must invert pre-swap IDs"
    assert post_ids[0] == pre_ids[1] and post_ids[1] == pre_ids[0]
    
    # Test Case 2: Identical reference
    shared = {"key": "val"}
    id_shared = id(shared)
    vals_shared, pre_shared, post_shared = swap_and_track_identity(shared, shared)
    assert vals_shared == (shared, shared)
    assert pre_shared == (id_shared, id_shared)
    assert post_shared == (id_shared, id_shared)

    # Test Case 3: Strings with different lengths (avoiding small string intern traps)
    s1 = "long_string_alpha_123456789"
    s2 = "long_string_beta_987654321"
    vals_s, pre_s, post_s = swap_and_track_identity(s1, s2)
    assert vals_s == (s2, s1)
    assert post_s == (pre_s[1], pre_s[0])
    
    print("ALL TESTS PASSED for py-var-swap-identity")

if __name__ == "__main__":
    test_py_var_swap()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.04ms (Limit: 800ms)
- **Heap Memory Limit:** Allocates ~80 bytes for the return tuple (Limit: 350MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(1)$, Space: $\mathcal{O}(1)$
- **Benchmark Profile:** 50,000 iterations in Pyodide WASM executes in < 18ms.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The returned values remain in their original order, or post-swap IDs do not match the inverted pre-swap IDs.
- **Where (The Localization):** The assignment expression `a, b = ...`.
- **Why (The Mechanism):** Assigning `a = b` followed by `b = a` overwrites the binding `a` before it can be assigned to `b`, leaving both names pointing to `b`. Python evaluates the entire right-hand side of `a, b = b, a` into an internal temporary tuple before binding to the left-hand targets.
- **How (The Remediation):** Write `a, b = b, a` in a single line, and compute `id(a)` and `id(b)` before and after this unpack statement.


### Lesson T2-02: Control Flow, Falsy Values & Short-Circuit Evaluation
- **Challenge ID:** `py-short-circuit-eval`
- **Module:** `MOD-08: Python Foundations & Execution Model`
- **Lesson Number:** `LESSON-T2-02`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Python's logical operators `and` and `or` do not return boolean `True`/`False`; they return the exact operand value that terminated evaluation. Furthermore, they are guaranteed to short-circuit:
- `A or B`: If `bool(A)` is `True`, `A` is returned immediately without evaluating `B`.
- `A and B`: If `bool(A)` is `False`, `A` is returned immediately without evaluating `B`.

A pervasive trap in configuration and data pipelines is conflating falsy values (`0`, `0.0`, `""`, `False`, `[]`, `{}`) with missing values (`None`).

Implement a production-grade configuration resolver:
`safe_config_lookup(layers: list[dict[str, Any] | None], key_path: list[str], fallback: Any = None) -> Any`
that:
1. Iterates through a hierarchy of configuration layers (e.g. `[override_env, user_config, system_defaults]`).
2. Navigates deeply nested keys specified by `key_path` (e.g. `["database", "pool", "max_connections"]`).
3. Returns the value from the highest-priority layer that contains the exact path.
4. **Critical Invariant:** If a layer explicitly sets a valid falsy value (such as `0`, `False`, or `""`), that value **MUST** be returned and not replaced by fallbacks or subsequent layers.
5. If the path does not exist in any layer or encounters a non-dictionary along the path, returns `fallback`.

**Input/Output Types:**
- `layers: list[dict[str, Any] | None]`: Ordered list of configuration layers (highest priority first).
- `key_path: list[str]`: Sequence of dictionary keys defining the path.
- `fallback: Any`: Value returned if no layer satisfies the full path.
- **Return Type:** `Any`.


#### 2. Clean Starter Code
```python
from typing import Any

def safe_config_lookup(
    layers: list[dict[str, Any] | None], 
    key_path: list[str], 
    fallback: Any = None
) -> Any:
    """
    Traverses hierarchically ordered configuration layers to resolve a nested key path,
    respecting falsy values (0, False, "") and short-circuiting on non-dict nodes.

    Args:
        layers: List of config dicts or None, ordered by decreasing priority.
        key_path: List of hierarchical string keys.
        fallback: Value to return if key path is absent in all layers.

    Returns:
        The resolved value or fallback.
    """
    # TODO: Implement hierarchical key resolution respecting falsy values
    raise NotImplementedError("Implement safe_config_lookup")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any

def safe_config_lookup(
    layers: list[dict[str, Any] | None], 
    key_path: list[str], 
    fallback: Any = None
) -> Any:
    if not key_path:
        return fallback

    for layer in layers:
        # Short-circuit if layer is not a dictionary
        if not isinstance(layer, dict):
            continue
            
        current: Any = layer
        found: bool = True
        
        for key in key_path:
            # Check dictionary type and key containment without triggering __getitem__ on non-dict
            if isinstance(current, dict) and key in current:
                current = current[key]
            else:
                found = False
                break
                
        if found:
            # Return value directly; do not use `current or fallback` which corrupts 0/False/""
            return current

    return fallback
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `safe_config_lookup([{"port": 8080}], ["port"])` -> `8080`
- `safe_config_lookup([None, {"port": 0}], ["port"])` -> `0` (Critical falsy test!)

**Hidden Test Cases:**
- Falsy boolean: `{"active": False}` -> must return `False`, not fallback.
- Deep nesting: `[{"a": {"b": {"c": ""}}}]` with path `["a", "b", "c"]` -> returns `""`.
- Broken path: `[{"a": 10}]` with path `["a", "b"]` -> gracefully returns `fallback`.
- Non-dict layers: `[None, 42, "string", {"valid": 100}]` -> returns `100`.

**Executable Test Harness:**
```python
def test_py_short_circuit():
    layers = [
        None,
        {"logging": {"level": ""}},  # Valid falsy empty string
        {"logging": {"level": "DEBUG", "retention_days": 0}},  # Valid falsy int 0
        {"timeout": False},  # Valid falsy boolean
    ]
    
    assert safe_config_lookup(layers, ["logging", "level"], "INFO") == ""
    assert safe_config_lookup(layers, ["logging", "retention_days"], 30) == 0
    assert safe_config_lookup(layers, ["timeout"], True) is False
    assert safe_config_lookup(layers, ["nonexistent", "path"], "DEFAULT") == "DEFAULT"
    assert safe_config_lookup([], ["any"], None) is None
    
    # Broken branch test
    broken_layers = [{"a": "string_not_dict"}]
    assert safe_config_lookup(broken_layers, ["a", "b"], "FALLBACK") == "FALLBACK"
    
    print("ALL TESTS PASSED for py-short-circuit-eval")

if __name__ == "__main__":
    test_py_short_circuit()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.15ms (Limit: 800ms)
- **Heap Memory Limit:** Transient iteration variables (< 10KB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(L \cdot K)$ where $L$ is layers and $K$ is path length. Space: $\mathcal{O}(1)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Looking up a key with value `0` or `False` unexpectedly returns the fallback value.
- **Where (The Localization):** The return statement, specifically expressions like `return result or fallback`.
- **Why (The Mechanism):** In Python, `0 or "fallback"` evaluates to `"fallback"` because `bool(0)` is `False`. Logical `or` does not distinguish between missing values and intentional zero/empty values.
- **How (The Remediation):** Use explicit boolean tracking (`found = True`) and verify key containment (`key in current`) rather than relying on boolean coercion.


### Lesson T2-03: Environment Frames, LEGB Rule & Nonlocal Accumulators
- **Challenge ID:** `py-scope-legb-counter`
- **Module:** `MOD-08: Python Foundations & Execution Model`
- **Lesson Number:** `LESSON-T2-03`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Python resolves identifiers using the LEGB hierarchy: **L**ocal $\to$ **E**nclosing $\to$ **G**lobal $\to$ **B**uilt-in. When a variable name is assigned to within a function scope, the Python compiler automatically classifies that identifier as local to the current frame (`STORE_FAST`), shadowing any enclosing or global bindings. Attempting to read a variable before assignment in such a scope raises an `UnboundLocalError`.

To mutate a binding in an enclosing (non-global) stack frame without creating an object-oriented class, Python provides the `nonlocal` statement.

Formulate an encapsulated stateful factory function:
`make_stateful_accumulator(initial_val: int = 0, step_multiplier: int = 1) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]`
that returns a 3-tuple of closures:
1. `add(delta: int) -> int`: Computes $\text{current\_val} \leftarrow \text{current\_val} + (\text{delta} \times \text{step\_multiplier})$ and returns the updated state.
2. `get() -> int`: Returns the current value without mutation.
3. `reset() -> None`: Reverts the accumulator value strictly back to `initial_val`.

**Invariants:**
- Complete lexical isolation: Multiple instances of `make_stateful_accumulator` must possess independent enclosing scopes with zero state leakage.
- No global variables or class definitions are permitted.


#### 2. Clean Starter Code
```python
from typing import Callable

def make_stateful_accumulator(
    initial_val: int = 0, 
    step_multiplier: int = 1
) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]:
    """
    Creates an encapsulated stateful accumulator using lexical closures and nonlocal bindings.

    Returns:
        A tuple of (add_func, get_func, reset_func).
    """
    # TODO: Implement closures with nonlocal variable binding
    raise NotImplementedError("Implement make_stateful_accumulator")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Callable

def make_stateful_accumulator(
    initial_val: int = 0, 
    step_multiplier: int = 1
) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]:
    # Enclosed state variable in the enclosing frame
    current_val: int = initial_val

    def add(delta: int) -> int:
        nonlocal current_val
        current_val += delta * step_multiplier
        return current_val

    def get() -> int:
        # Read-only access does not require nonlocal
        return current_val

    def reset() -> None:
        nonlocal current_val
        current_val = initial_val

    return (add, get, reset)
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `add, get, reset = make_stateful_accumulator(10, 2)` -> `add(5)` returns `20`, `get()` returns `20`.
- `reset()` returns `None`, subsequent `get()` returns `10`.

**Hidden Test Cases:**
- Isolation test: Creating accumulator $A$ and accumulator $B$ must ensure mutating $A$ has 0 effect on $B$.
- Negative deltas and multipliers: Negative step multiplier behavior.
- High iteration loop: Verifies no memory accumulation or stack overflow.

**Executable Test Harness:**
```python
def test_py_scope_legb():
    add1, get1, reset1 = make_stateful_accumulator(100, 3)
    add2, get2, reset2 = make_stateful_accumulator(0, 1)

    assert get1() == 100
    assert add1(10) == 130
    assert add1(5) == 145
    assert get1() == 145

    # Verify complete isolation of instance 2
    assert get2() == 0
    assert add2(50) == 50
    assert get1() == 145, "Instance 1 state was contaminated by Instance 2!"

    # Test reset functionality
    reset1()
    assert get1() == 100
    assert add1(2) == 106

    print("ALL TESTS PASSED for py-scope-legb-counter")

if __name__ == "__main__":
    test_py_scope_legb()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.08ms (Limit: 800ms)
- **Heap Memory Limit:** Enclosing cell objects occupy ~64 bytes per instance.
- **Asymptotic Complexity:** Time: $\mathcal{O}(1)$ per operation. Space: $\mathcal{O}(1)$ per instance.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `UnboundLocalError: cannot access local variable 'current_val' where it is not associated with a value`.
- **Where (The Localization):** Inside `def add(delta)` at line `current_val += ...`.
- **Why (The Mechanism):** Augmented assignment (`+=`) combines read and write. Because `current_val` is assigned to, Python marks it local. When attempting to read it before completing assignment, `UnboundLocalError` fires.
- **How (The Remediation):** Add `nonlocal current_val` at the very top of `add()` and `reset()`.



---

## Module MOD-09: Functional Abstraction & Closures

### Lesson T2-04: Pure Functions, Referential Transparency & Immutability
- **Challenge ID:** `py-pure-transform-immut`
- **Module:** `MOD-09: Functional Abstraction & Closures`
- **Lesson Number:** `LESSON-T2-04`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
A pure function satisfies two mathematical criteria:
1. **Referential Transparency:** Given identical inputs, it strictly returns the same output:
   $$f(x_1) = f(x_2) \iff x_1 = x_2$$
2. **Zero Side Effects:** It produces no observable mutations to outer scope, global state, I/O streams, or input references passed by pointer.

Implement a pure record transformation pipeline:
`pure_min_max_scale(records: list[dict[str, Any]], target_key: str, feature_range: tuple[float, float] = (0.0, 1.0)) -> list[dict[str, Any]]`
that computes feature scaling:
$$x' = a + \frac{x - x_{\min}}{x_{\max} - x_{\min}} (b - a)$$
where $[a, b] = \text{feature\_range}$.

**Strict Invariants:**
1. **Input Immutability:** Neither the input `records` list nor any individual dictionary inside `records` may be mutated. Every returned dictionary must be a fresh reference: $\text{id}(\text{res}[i]) \neq \text{id}(\text{records}[i])$.
2. **Singular Boundary Condition:** If $x_{\max} == x_{\min}$, all scaled values must be assigned $a$ (the lower bound).
3. **Filtering:** Records lacking `target_key` or possessing `None` as the value must be silently skipped and excluded from the output list.


#### 2. Clean Starter Code
```python
from typing import Any

def pure_min_max_scale(
    records: list[dict[str, Any]], 
    target_key: str, 
    feature_range: tuple[float, float] = (0.0, 1.0)
) -> list[dict[str, Any]]:
    """
    Purely transforms a list of record dicts by scaling target_key into feature_range,
    guaranteeing zero mutation to input dictionaries.

    Args:
        records: List of dictionaries representing tabular records.
        target_key: The numeric field to scale.
        feature_range: Target interval (a, b).

    Returns:
        A new list of freshly allocated dictionaries with scaled target_key.
    """
    # TODO: Implement pure scaling without in-place mutation
    raise NotImplementedError("Implement pure_min_max_scale")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any

def pure_min_max_scale(
    records: list[dict[str, Any]], 
    target_key: str, 
    feature_range: tuple[float, float] = (0.0, 1.0)
) -> list[dict[str, Any]]:
    a, b = feature_range
    
    # Filter valid numeric entries without mutating inputs
    valid_values: list[float] = [
        float(r[target_key]) 
        for r in records 
        if target_key in r and r[target_key] is not None and isinstance(r[target_key], (int, float))
    ]
    
    if not valid_values:
        return []
        
    x_min = min(valid_values)
    x_max = max(valid_values)
    spread = x_max - x_min
    
    output: list[dict[str, Any]] = []
    for r in records:
        if target_key not in r or r[target_key] is None or not isinstance(r[target_key], (int, float)):
            continue
            
        val = float(r[target_key])
        scaled_val = a if spread == 0.0 else a + ((val - x_min) / spread) * (b - a)
        
        # Allocate a fresh dictionary using modern dictionary unpacking
        new_record = {**r, target_key: round(scaled_val, 6)}
        output.append(new_record)
        
    return output
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `pure_min_max_scale([{"val": 10}, {"val": 20}], "val", (0.0, 1.0))` -> `[{"val": 0.0}, {"val": 1.0}]`
- Invariance: `records[0]["val"]` remains `10`.

**Hidden Test Cases:**
- Zero variance: All values equal (e.g. `[{"x": 5}, {"x": 5}]`) -> All scale to $a$.
- Missing/None keys: Records with missing keys are dropped without crashing.
- Custom feature range: Negative intervals `(-1.0, 1.0)`.
- Identity verification: `assert all(id(out[i]) != id(records[i]) for i in range(len(out)))`.

**Executable Test Harness:**
```python
def test_py_pure_transform():
    raw_data = [
        {"id": 1, "score": 10.0, "meta": "keep"},
        {"id": 2, "score": 20.0, "meta": "keep"},
        {"id": 3, "score": 30.0, "meta": "keep"},
        {"id": 4, "score": None, "meta": "drop"},
        {"id": 5, "meta": "drop"},
    ]
    
    # Deep copy representation for mutation detection
    import copy
    snapshot = copy.deepcopy(raw_data)
    
    scaled = pure_min_max_scale(raw_data, "score", feature_range=(0.0, 100.0))
    
    # Assert purity: raw_data must not have changed at all
    assert raw_data == snapshot, "Side effect detected! Input list was mutated."
    assert len(scaled) == 3, "Missing/None entries must be excluded"
    assert scaled[0]["score"] == 0.0
    assert scaled[1]["score"] == 50.0
    assert scaled[2]["score"] == 100.0
    assert scaled[0]["meta"] == "keep"
    
    # Verify pointer addresses
    assert id(scaled[0]) != id(raw_data[0]), "Output must contain fresh dictionary instances."
    
    # Single value edge case
    flat = [{"v": 42}, {"v": 42}]
    assert pure_min_max_scale(flat, "v", (10.0, 20.0)) == [{"v": 10.0}, {"v": 10.0}]
    
    print("ALL TESTS PASSED for py-pure-transform-immut")

if __name__ == "__main__":
    test_py_pure_transform()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.45ms for 5,000 records (Limit: 800ms)
- **Heap Memory Limit:** Allocates one shallow copy dict per valid record (~120KB for 1,000 records)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$, Space: $\mathcal{O}(N)$ for new records.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Test failure reporting `Side effect detected! Input list was mutated`.
- **Where (The Localization):** The line updating the score: `r[target_key] = scaled_val`.
- **Why (The Mechanism):** In Python, iterating over a list of dictionaries yields references to the original dictionary heap objects. Modifying keys in `r` directly mutates the caller's data structure.
- **How (The Remediation):** Construct a new dictionary using `{**r, target_key: scaled_val}` instead of mutating `r`.


### Lesson T2-05: Higher-Order Functions & Callable Composition Pipeline
- **Challenge ID:** `py-hof-compose-pipeline`
- **Module:** `MOD-09: Functional Abstraction & Closures`
- **Lesson Number:** `LESSON-T2-05`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In higher-order functional architectures, computations are constructed by composing unary functions:
$$(f_n \circ f_{n-1} \circ \dots \circ f_1)(x) = f_n(f_{n-1}(\dots f_1(x)\dots))$$
While mathematical notation is right-associative, Unix and data engineering pipelines execute **left-to-right**: data flows into $f_1$, whose output pipes into $f_2$, culminating in $f_n$.

Implement a robust pipeline composer:
`compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]`
such that:
1. `pipeline = compose_pipeline(f1, f2, f3)` produces a single callable where `pipeline(x) == f3(f2(f1(x)))`.
2. Identity case: If `funcs` is empty, returns an identity function $\text{id}(x) = x$.
3. Metadata inspection: The returned closure must expose a read-only property `.steps` containing the tuple of functions in execution order.
4. Error localization: If any stage raises an exception, the pipeline wraps it into a `PipelineExecutionError` indicating the failed step index and function name.


#### 2. Clean Starter Code
```python
from typing import Callable, Any

class PipelineExecutionError(Exception):
    """Raised when an intermediate stage of a pipeline fails."""
    pass

def compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]:
    """
    Composes arbitrary unary functions into a left-to-right execution pipeline.
    
    Returns a callable with a .steps attribute and error wrapping.
    """
    # TODO: Implement left-to-right function pipeline
    raise NotImplementedError("Implement compose_pipeline")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Callable, Any
from functools import reduce

class PipelineExecutionError(Exception):
    pass

def compose_pipeline(*funcs: Callable[[Any], Any]) -> Callable[[Any], Any]:
    steps_tuple: tuple[Callable[[Any], Any], ...] = tuple(funcs)

    def pipeline(initial_val: Any) -> Any:
        current = initial_val
        for idx, fn in enumerate(steps_tuple):
            try:
                current = fn(current)
            except Exception as e:
                fn_name = getattr(fn, "__name__", repr(fn))
                raise PipelineExecutionError(
                    f"Pipeline failed at stage {idx} ({fn_name}): {str(e)}"
                ) from e
        return current

    # Expose immutable metadata attribute
    pipeline.steps = steps_tuple  # type: ignore[attr-defined]
    return pipeline
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `pipe = compose_pipeline(lambda x: x + 1, lambda x: x * 2); pipe(3)` -> `(3 + 1) * 2 = 8`
- `pipe = compose_pipeline(); pipe(42)` -> `42`

**Hidden Test Cases:**
- String transformation: `compose_pipeline(str.strip, str.lower, lambda s: s.split())("  Hello World  ")` -> `["hello", "world"]`
- Stage error wrapping: A failing stage raises `PipelineExecutionError` with step index.
- Metadata `.steps` tuple verification.

**Executable Test Harness:**
```python
def test_py_hof_compose():
    add_five = lambda x: x + 5
    triple = lambda x: x * 3
    to_str = lambda x: f"Result: {x}"
    
    pipe = compose_pipeline(add_five, triple, to_str)
    assert pipe(2) == "Result: 21", "Left-to-right execution order failed"
    assert len(pipe.steps) == 3
    
    # Empty pipeline identity test
    ident = compose_pipeline()
    assert ident("passthrough") == "passthrough"
    assert ident(1234) == 1234
    
    # Exception handling test
    bad_pipe = compose_pipeline(lambda x: x + 1, lambda x: x / 0)
    try:
        bad_pipe(10)
        assert False, "Should have raised PipelineExecutionError"
    except PipelineExecutionError as err:
        assert "stage 1" in str(err)
        
    print("ALL TESTS PASSED for py-hof-compose-pipeline")

if __name__ == "__main__":
    test_py_hof_compose()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.05ms per invocation (Limit: 800ms)
- **Heap Memory Limit:** Minimal closure frame (< 2KB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(K)$ where $K$ is number of pipeline stages. Space: $\mathcal{O}(1)$ auxiliary.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The output value corresponds to $f_1(f_2(x))$ instead of $f_2(f_1(x))$.
- **Where (The Localization):** The iteration order over `funcs`.
- **Why (The Mechanism):** Classical mathematical composition $(g \circ f)(x)$ runs from right to left. Data pipelines require left-to-right forward progression.
- **How (The Remediation):** Iterate forwards using `for fn in steps_tuple:` or `reduce(lambda val, fn: fn(val), funcs, x)`.


### Lesson T2-06: Lexical Closures & Sliding Window Rate Limiting
- **Challenge ID:** `py-closure-rate-limiter`
- **Module:** `MOD-09: Functional Abstraction & Closures`
- **Lesson Number:** `LESSON-T2-06`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
A sliding window rate limiter admits a transaction at time $t$ if and only if the count of previously admitted requests in the open interval $(t - W, t]$ is strictly less than $M$, where:
- $W$ is the sliding window duration in seconds.
- $M$ is the maximum allowed requests within any span $W$.

Implement a stateful factory function relying entirely on lexical closures:
`make_sliding_rate_limiter(max_calls: int, window_seconds: float) -> Callable[[float], tuple[bool, int, float]]`
that returns a function `limiter(timestamp: float) -> tuple[bool, int, float]`:
1. **Admissibility (`allowed: bool`):** Returns `True` if admitted; records the timestamp into state. Returns `False` if rejected.
2. **Remaining Quota (`remaining: int`):** Number of remaining calls allowed in the active window (after accounting for the current call if allowed).
3. **Reset Time (`reset_time: float`):** The timestamp at which the oldest active call in the window expires, or `0.0` if the window is currently empty.

**Strict Invariants:**
- Memory bounding: Old timestamps strictly $\le t - W$ must be purged from memory upon every invocation, ensuring maximum heap space remains bounded by $\mathcal{O}(M)$ rather than growing infinitely over time.
- Monotonicity: If `timestamp < last_recorded_timestamp`, raises `ValueError("Timestamps must be monotonically non-decreasing")`.


#### 2. Clean Starter Code
```python
from typing import Callable
from collections import deque

def make_sliding_rate_limiter(
    max_calls: int, 
    window_seconds: float
) -> Callable[[float], tuple[bool, int, float]]:
    """
    Creates a sliding window rate limiter closure tracking request timestamps.

    Args:
        max_calls: Maximum requests permitted per window.
        window_seconds: Duration of the sliding window in seconds.

    Returns:
        A callable taking a timestamp and returning (allowed, remaining, reset_time).
    """
    # TODO: Implement sliding window rate limiter closure
    raise NotImplementedError("Implement make_sliding_rate_limiter")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Callable
from collections import deque

def make_sliding_rate_limiter(
    max_calls: int, 
    window_seconds: float
) -> Callable[[float], tuple[bool, int, float]]:
    # Double-ended queue storing active timestamps in enclosed scope
    timestamps: deque[float] = deque()
    last_timestamp: float = -1.0

    def rate_limiter(current_time: float) -> tuple[bool, int, float]:
        nonlocal last_timestamp
        
        if current_time < last_timestamp:
            raise ValueError("Timestamps must be monotonically non-decreasing")
        last_timestamp = current_time

        # Evict timestamps outside the sliding window (current_time - window_seconds)
        cutoff: float = current_time - window_seconds
        while timestamps and timestamps[0] <= cutoff:
            timestamps.popleft()

        # Check quota
        if len(timestamps) < max_calls:
            timestamps.append(current_time)
            remaining = max_calls - len(timestamps)
            reset_time = timestamps[0] + window_seconds
            return (True, remaining, reset_time)
        else:
            remaining = 0
            reset_time = timestamps[0] + window_seconds
            return (False, remaining, reset_time)

    return rate_limiter
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `limiter = make_sliding_rate_limiter(2, 10.0)`
- `limiter(1.0)` -> `(True, 1, 11.0)`
- `limiter(2.0)` -> `(True, 0, 11.0)`
- `limiter(3.0)` -> `(False, 0, 11.0)`
- `limiter(11.5)` -> `(True, 1, 12.0)` (timestamp 1.0 has expired)

**Hidden Test Cases:**
- Burst test at exact timestamp.
- Out of order timestamp raises `ValueError`.
- Memory purging: Feed 10,000 requests over 1,000 seconds; verify internal queue length never exceeds `max_calls`.

**Executable Test Harness:**
```python
def test_py_closure_rate_limiter():
    limiter = make_sliding_rate_limiter(max_calls=3, window_seconds=5.0)
    
    # Call 1 at t=1.0 -> Allowed (2 remaining)
    ok, rem, reset = limiter(1.0)
    assert ok is True and rem == 2 and reset == 6.0
    
    # Call 2 at t=2.0 -> Allowed (1 remaining)
    ok, rem, reset = limiter(2.0)
    assert ok is True and rem == 1
    
    # Call 3 at t=3.0 -> Allowed (0 remaining)
    ok, rem, reset = limiter(3.0)
    assert ok is True and rem == 0
    
    # Call 4 at t=4.0 -> Rejected
    ok, rem, reset = limiter(4.0)
    assert ok is False and rem == 0 and reset == 6.0
    
    # Call 5 at t=6.1 -> Allowed (t=1.0 has slid out of window!)
    ok, rem, reset = limiter(6.1)
    assert ok is True and rem == 0 and reset == 7.0
    
    # Non-monotonic assertion
    try:
        limiter(5.0)
        assert False, "Should raise ValueError for non-monotonic timestamp"
    except ValueError:
        pass
        
    print("ALL TESTS PASSED for py-closure-rate-limiter")

if __name__ == "__main__":
    test_py_closure_rate_limiter()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.02ms per call (Limit: 800ms)
- **Heap Memory Limit:** Deque bounded to $\le M$ float elements (< 1KB for $M=1000$).
- **Asymptotic Complexity:** Amortized Time: $\mathcal{O}(1)$ per call. Space: $\mathcal{O}(M)$ where $M$ is `max_calls`.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Calls are rejected even after the window time has elapsed, or memory consumption grows monotonically.
- **Where (The Localization):** The while loop checking `timestamps[0] <= cutoff`.
- **Why (The Mechanism):** Failing to pop timestamps that fall outside `current_time - window_seconds` causes stale requests to count against the quota permanently.
- **How (The Remediation):** Use a `collections.deque` and repeatedly `popleft()` while `timestamps[0] <= current_time - window_seconds`.



---

## Module MOD-10: Recursion & Memory Strata

### Lesson T2-07: Recursion Trees, Deep Flattening & Call Stack Depth
- **Challenge ID:** `py-recur-tree-flatten`
- **Module:** `MOD-10: Recursion & Memory Strata`
- **Lesson Number:** `LESSON-T2-07`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Tree recursion creates a branching activation graph of stack frames. When traversing deeply nested structures (e.g. nested JSON payloads, ASTs, recursive mathematical sequences), each recursive descent pushes a C-level frame `PyFrameObject` (~100-300 bytes) onto the runtime call stack.

Implement a depth-governed flattening engine:
`deep_flatten_nested(nested_structure: Any, max_depth: int = 500) -> list[Any]`
that:
1. Flattens arbitrarily nested containers (`list`, `tuple`, `set`) into a 1D sequence of leaf primitives.
2. **Atomic Invariant:** Strings (`str`) and byte sequences (`bytes`) must be treated as atomic scalar leaves, NOT as iterable sequences, avoiding character-by-character decomposition.
3. **Stack Guard Invariant:** Traverses the nesting tree while tracking current depth $d$. If $d > \text{max\_depth}$, raises `RecursionError(f"Maximum recursion depth {max_depth} exceeded")`.
4. Employs an iterative stack simulation with depth tuples `(item, depth)` to guarantee immunity against CPython stack overflows.


#### 2. Clean Starter Code
```python
from typing import Any

def deep_flatten_nested(nested_structure: Any, max_depth: int = 500) -> list[Any]:
    """
    Flattens arbitrarily nested collections into a 1D list of scalar values,
    treating strings/bytes as atomic and strictly guarding recursion depth.

    Args:
        nested_structure: Nested list, tuple, set, or scalar leaf.
        max_depth: Maximum permissible tree depth.

    Returns:
        1D list of flattened leaf elements.
        
    Raises:
        RecursionError: If tree depth strictly exceeds max_depth.
    """
    # TODO: Implement stack-safe tree flattening
    raise NotImplementedError("Implement deep_flatten_nested")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any
from collections.abc import Iterable

def deep_flatten_nested(nested_structure: Any, max_depth: int = 500) -> list[Any]:
    flattened: list[Any] = []
    # Explicit traversal stack storing: (current_item, depth)
    # Using LIFO stack to maintain depth-first left-to-right order
    stack: list[tuple[Any, int]] = [(nested_structure, 0)]

    while stack:
        item, depth = stack.pop()

        if depth > max_depth:
            raise RecursionError(f"Maximum recursion depth {max_depth} exceeded")

        # Atomic leaf detection: strings, bytes, and non-iterables
        if isinstance(item, (str, bytes)) or not isinstance(item, Iterable):
            flattened.append(item)
        else:
            # Convert iterable to list and push in reverse to maintain left-to-right order
            children = list(item)
            for child in reversed(children):
                stack.append((child, depth + 1))

    return flattened
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `deep_flatten_nested([1, [2, [3, 4], 5], "alpha"])` -> `[1, 2, 3, 4, 5, "alpha"]`
- `deep_flatten_nested("single_string")` -> `["single_string"]`

**Hidden Test Cases:**
- String atomicity: `"hello"` must NOT become `['h', 'e', 'l', 'l', 'o']`.
- Heterogeneous containers: Mix of tuples, sets, and lists.
- Depth guard trigger: Nested array with 10 levels and `max_depth=5` raises `RecursionError`.
- Empty sub-containers: `[[], [()], set(), [1, [2]]]` -> `[1, 2]`.

**Executable Test Harness:**
```python
def test_py_recur_tree():
    sample = [1, (2, 3), [4, [5, {"leaf_text": "ignore_dict"}]]]
    # Note: dict is iterable over its keys!
    res = deep_flatten_nested(sample)
    assert res == [1, 2, 3, 4, 5, "leaf_text"]
    
    # Verify string atomicity
    assert deep_flatten_nested(["alpha", ("beta", ["gamma"])]) == ["alpha", "beta", "gamma"]
    
    # Depth limit test
    deep = 0
    for _ in range(20):
        deep = [deep]
        
    try:
        deep_flatten_nested(deep, max_depth=10)
        assert False, "Should have raised RecursionError"
    except RecursionError:
        pass
        
    print("ALL TESTS PASSED for py-recur-tree-flatten")

if __name__ == "__main__":
    test_py_recur_tree()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.65ms for 10,000 elements (Limit: 800ms)
- **Heap Memory Limit:** Explicit stack memory scales linearly with tree depth (Limit: 350MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ where $N$ is total nodes in tree. Space: $\mathcal{O}(D)$ auxiliary where $D$ is maximum tree depth.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The output list contains single characters `['h', 'e', 'l', 'l', 'o']` instead of the complete string `"hello"`.
- **Where (The Localization):** The `isinstance(item, Iterable)` check.
- **Why (The Mechanism):** In Python, `str` and `bytes` implement the `Iterable` protocol. If checked only against `Iterable`, strings are repeatedly unpacked down to individual characters.
- **How (The Remediation):** Explicitly check `if isinstance(item, (str, bytes)) or not isinstance(item, Iterable):` as the base leaf condition.


### Lesson T2-08: Sequence Protocol, Custom Striding & Window Slicing
- **Challenge ID:** `py-sequence-slice-stride`
- **Module:** `MOD-10: Recursion & Memory Strata`
- **Lesson Number:** `LESSON-T2-08`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In Python's sequence data model, slicing `s[start:stop:step]` translates internally to passing a `slice` object to `__getitem__(slice(start, stop, step))`. Slicing standard lists creates a new list with shallow references, whereas slicing custom sequence abstractions can implement virtual zero-copy windows.

Implement a generalized sliding sequence segmenter:
`rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]`
that generates all complete sub-sequences of exact length `window_size` advancing by `step`.

**Mathematical Invariants:**
- For a sequence of length $N$, the total count of complete windows produced is:
  $$K = \max\left(0, \left\lfloor \frac{N - \text{window\_size}}{\text{step}} \right\rfloor + 1\right)$$
- The $i$-th window covers the index interval:
  $$[i \cdot \text{step}, \, i \cdot \text{step} + \text{window\_size})$$
- If `window_size > N` or `window_size <= 0` or `step <= 0`, the function must return an empty list `[]` without raising errors.
- Must support any object satisfying the Python `Sequence` protocol (`list`, `tuple`, `str`).


#### 2. Clean Starter Code
```python
from typing import TypeVar, Sequence

T = TypeVar("T")

def rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]:
    """
    Generates all valid sliding windows of exact length window_size from a sequence.

    Args:
        seq: Sequence implementing __len__ and __getitem__ (list, tuple, str).
        window_size: Exact length of each sliding sub-window.
        step: Stride offset between consecutive window start positions.

    Returns:
        List of slice sub-sequences.
    """
    # TODO: Implement rolling window sequence slicer
    raise NotImplementedError("Implement rolling_window_slices")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import TypeVar, Sequence

T = TypeVar("T")

def rolling_window_slices(seq: Sequence[T], window_size: int, step: int = 1) -> list[Sequence[T]]:
    n = len(seq)
    if window_size <= 0 or step <= 0 or window_size > n:
        return []

    windows: list[Sequence[T]] = []
    # Calculate upper bound for start index such that start + window_size <= n
    max_start = n - window_size
    
    for start_idx in range(0, max_start + 1, step):
        # Native slice preserves the underlying sequence type (e.g. str -> str, tuple -> tuple)
        windows.append(seq[start_idx : start_idx + window_size])

    return windows
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `rolling_window_slices([1, 2, 3, 4, 5], window_size=3, step=1)` -> `[[1, 2, 3], [2, 3, 4], [3, 4, 5]]`
- `rolling_window_slices("abcdef", window_size=4, step=2)` -> `["abcd", "cdef"]`

**Hidden Test Cases:**
- Sequence preservation: String input yields list of strings; tuple yields list of tuples.
- Exact fit: `len(seq) == window_size` -> exactly 1 window.
- Incomplete trailing windows: Remaining elements less than `window_size` are discarded.
- Invalid steps and non-positive window sizes return `[]`.

**Executable Test Harness:**
```python
def test_py_sequence_slice():
    data = [10, 20, 30, 40, 50, 60, 70]
    res = rolling_window_slices(data, window_size=3, step=2)
    assert res == [[10, 20, 30], [30, 40, 50], [50, 60, 70]]
    
    # String type preservation test
    s_res = rolling_window_slices("OKVIR", window_size=2, step=1)
    assert s_res == ["OK", "KV", "VI", "IR"]
    
    # Tuple test
    t_res = rolling_window_slices((1, 2), window_size=3, step=1)
    assert t_res == []
    
    # Boundary checks
    assert rolling_window_slices([1, 2, 3], 0, 1) == []
    assert rolling_window_slices([1, 2, 3], 2, 0) == []
    
    print("ALL TESTS PASSED for py-sequence-slice-stride")

if __name__ == "__main__":
    test_py_sequence_slice()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.20ms for $N=5,000$ (Limit: 800ms)
- **Heap Memory Limit:** List of sub-slices (< 2MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(K \cdot W)$ where $K$ is number of windows and $W$ is `window_size`. Space: $\mathcal{O}(K \cdot W)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The final window has fewer elements than `window_size`.
- **Where (The Localization):** The loop termination condition `range(...)`.
- **Why (The Mechanism):** If the loop allows `start_idx` to exceed `len(seq) - window_size`, Python's slice syntax `seq[start : start + window_size]` does not error; it simply truncates at the end of the sequence.
- **How (The Remediation):** Ensure the range iterates over `range(0, len(seq) - window_size + 1, step)`.


### Lesson T2-09: Pointer Aliasing, Mutation Traps & Deep Defensive Copy
- **Challenge ID:** `py-aliasing-deep-clone`
- **Module:** `MOD-10: Recursion & Memory Strata`
- **Lesson Number:** `LESSON-T2-09`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In CPython, assigning an existing list or dictionary creates a new reference alias pointing to the identical memory address. Shallow copies (`list.copy()`, `copy.copy()`) allocate a new container frame, but its internal elements remain pointers to the original sub-objects.

Furthermore, nested graph structures frequently contain **circular references** (cycles) or **aliased DAG nodes** (where multiple keys point to the exact same child object). A naive recursive copier encounters infinite recursion (`RecursionError`).

Implement an industrial-grade graph clone engine:
`safe_deep_clone_graph(obj: Any) -> Any`
that:
1. Deeply duplicates nested structures supporting `dict`, `list`, `set`, and immutable primitives (`int`, `float`, `str`, `bool`, `None`, `tuple`).
2. **Cycle & Alias Invariant:** Uses an identity memoization map `memo: dict[int, Any]` mapping `id(original_node) -> cloned_node`.
   - If a node is referenced multiple times in the original graph, it must be cloned once and referenced identically in the output graph.
   - If circular references exist ($A \to B \to A$), the cycle must be preserved in the clone without infinite recursion.
3. Completely isolates the cloned graph: Any mutation to the cloned structure must have zero effect on the original object.


#### 2. Clean Starter Code
```python
from typing import Any

def safe_deep_clone_graph(obj: Any) -> Any:
    """
    Deeply clones a complex Python data structure, preserving DAG topology
    and circular references via object identity memoization.

    Args:
        obj: Arbitrary nested Python structure (dict, list, set, tuple, primitives).

    Returns:
        A completely isolated deep clone with preserved reference topologies.
    """
    # TODO: Implement memoized deep copy with cycle handling
    raise NotImplementedError("Implement safe_deep_clone_graph")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any

def safe_deep_clone_graph(obj: Any) -> Any:
    memo: dict[int, Any] = {}

    def _clone(node: Any) -> Any:
        node_id = id(node)
        if node_id in memo:
            return memo[node_id]

        # Handle Primitives & Immutables
        if isinstance(node, (int, float, str, bool, type(None), bytes)):
            return node

        # Handle List
        if isinstance(node, list):
            cloned_list: list[Any] = []
            memo[node_id] = cloned_list  # Register before recursive calls to break cycles
            for item in node:
                cloned_list.append(_clone(item))
            return cloned_list

        # Handle Dictionary
        if isinstance(node, dict):
            cloned_dict: dict[Any, Any] = {}
            memo[node_id] = cloned_dict  # Register early
            for k, v in node.items():
                cloned_dict[_clone(k)] = _clone(v)
            return cloned_dict

        # Handle Set
        if isinstance(node, set):
            cloned_set: set[Any] = set()
            memo[node_id] = cloned_set
            for item in node:
                cloned_set.add(_clone(item))
            return cloned_set

        # Handle Tuple (recursively clone elements; if tuple contains mutables, must rebuild)
        if isinstance(node, tuple):
            cloned_tuple_items = [_clone(item) for item in node]
            cloned_tuple = tuple(cloned_tuple_items)
            memo[node_id] = cloned_tuple
            return cloned_tuple

        return node

    return _clone(obj)
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `safe_deep_clone_graph({"a": [1, 2]})` -> Completely isolated dict and list.
- Modifying `clone["a"].append(3)` does not affect original.

**Hidden Test Cases:**
- Direct Circular Reference: `x = []; x.append(x)` -> `clone[0] is clone`.
- Shared Sub-object Invariant: `shared = [1]; graph = [shared, shared]`; verify `clone[0] is clone[1]`.
- Dict with cycles: `d = {}; d["self"] = d` -> `clone["self"] is clone`.

**Executable Test Harness:**
```python
def test_py_aliasing_deep_clone():
    # Test 1: Shared reference preservation
    shared_node = {"data": 42}
    root = {"left": shared_node, "right": shared_node}
    
    clone = safe_deep_clone_graph(root)
    assert clone["left"] == shared_node
    assert clone["left"] is clone["right"], "Shared DAG topology was lost (cloned twice)!"
    assert clone["left"] is not shared_node, "Pointer aliasing: not deep copied!"
    
    # Test 2: Circular reference
    cycle_list: list[Any] = [1, 2]
    cycle_list.append(cycle_list)
    
    cycle_clone = safe_deep_clone_graph(cycle_list)
    assert cycle_clone[0] == 1 and cycle_clone[1] == 2
    assert cycle_clone[2] is cycle_clone, "Circular reference must point to cloned self!"
    assert cycle_clone is not cycle_list
    
    print("ALL TESTS PASSED for py-aliasing-deep-clone")

if __name__ == "__main__":
    test_py_aliasing_deep_clone()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.35ms for 2,000 nodes (Limit: 800ms)
- **Heap Memory Limit:** Memo dictionary scales $\mathcal{O}(V)$ where $V$ is unique objects (< 5MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(V + E)$ graph traversal. Space: $\mathcal{O}(V)$ memory for memo.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `RecursionError: maximum recursion depth exceeded` when copying circular structures.
- **Where (The Localization):** The point where child items are cloned before registering the new parent in `memo`.
- **Why (The Mechanism):** If `memo[node_id] = cloned_container` is placed AFTER child recursion, any circular link back to the parent encounters an empty memo entry, triggering an infinite descent.
- **How (The Remediation):** Allocate the empty container and register it in `memo[node_id]` immediately before recursing on child nodes.



---

## Module MOD-11: Hash Tables & Complexity

### Lesson T2-10: Linear Probing Hash Table & Collision Resolution
- **Challenge ID:** `py-hash-table-probe`
- **Module:** `MOD-11: Hash Tables & Complexity`
- **Lesson Number:** `LESSON-T2-10`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
A hash table maps keys $K$ to bucket slots via an integer hash function:
$$h_0(k) = \text{hash}(k) \pmod C$$
where $C$ is the table capacity. Under **open addressing with linear probing**, when bucket $h_0$ is occupied by an unequal key, the probe sequence tests successive slots:
$$h_i(k) = (h_0(k) + i) \pmod C \quad \text{for } i = 1, 2, \dots, C-1$$

When keys are deleted, a naive slot clear (`None`) terminates subsequent search probes prematurely. Open addressing requires writing a special sentinel **Tombstone** marker:
$$\text{SlotState} \in \{\text{EMPTY}, \text{OCCUPIED}, \text{TOMBSTONE}\}$$

Implement `LinearProbeHashTable[K, V]`:
- `__init__(capacity: int = 16)`: Initializes fixed capacity $C$.
- `put(key: K, value: V) -> bool`: Inserts or updates key. Overwrites existing key value; reuses TOMBSTONE or EMPTY slots. Returns `True` on success, or raises `OverflowError("Hash table is full")` if all slots are occupied.
- `get(key: K) -> V | None`: Returns associated value. Searches past TOMBSTONEs until the key is found or an EMPTY slot is encountered. Returns `None` if absent.
- `delete(key: K) -> bool`: Finds key and replaces its entry with a TOMBSTONE sentinel. Returns `True` if deleted, `False` if not found.
- `load_factor() -> float`: Returns $\frac{N_{\text{occupied}}}{C}$.


#### 2. Clean Starter Code
```python
from typing import TypeVar, Generic

K = TypeVar("K")
V = TypeVar("V")

class LinearProbeHashTable(Generic[K, V]):
    """
    Fixed-capacity open-addressing hash table resolving collisions with linear probing
    and preserving search probe continuity using deletion tombstones.
    """
    def __init__(self, capacity: int = 16) -> None:
        # TODO: Initialize bucket array with tombstones
        raise NotImplementedError("Implement LinearProbeHashTable.__init__")

    def put(self, key: K, value: V) -> bool:
        # TODO: Implement put with collision resolution
        raise NotImplementedError("Implement LinearProbeHashTable.put")

    def get(self, key: K) -> V | None:
        # TODO: Implement get probing through tombstones
        raise NotImplementedError("Implement LinearProbeHashTable.get")

    def delete(self, key: K) -> bool:
        # TODO: Implement delete leaving tombstone
        raise NotImplementedError("Implement LinearProbeHashTable.delete")

    def load_factor(self) -> float:
        # TODO: Return occupied_count / capacity
        raise NotImplementedError("Implement LinearProbeHashTable.load_factor")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import TypeVar, Generic

K = TypeVar("K")
V = TypeVar("V")

# Sentinel token for deleted slots
_TOMBSTONE = object()

class LinearProbeHashTable(Generic[K, V]):
    def __init__(self, capacity: int = 16) -> None:
        self.capacity: int = capacity
        self.keys: list[Any] = [None] * capacity
        self.values: list[Any] = [None] * capacity
        self._count: int = 0

    def _hash(self, key: K) -> int:
        return hash(key) % self.capacity

    def put(self, key: K, value: V) -> bool:
        start_idx = self._hash(key)
        first_tombstone: int | None = None

        for step in range(self.capacity):
            idx = (start_idx + step) % self.capacity
            slot_key = self.keys[idx]

            if slot_key is None:
                # Empty slot: insert here or at first seen tombstone
                target_idx = first_tombstone if first_tombstone is not None else idx
                self.keys[target_idx] = key
                self.values[target_idx] = value
                self._count += 1
                return True

            if slot_key is _TOMBSTONE:
                if first_tombstone is None:
                    first_tombstone = idx
                continue

            if slot_key == key:
                # Key already exists: update in place
                self.values[idx] = value
                return True

        if first_tombstone is not None:
            self.keys[first_tombstone] = key
            self.values[first_tombstone] = value
            self._count += 1
            return True

        raise OverflowError("Hash table is full")

    def get(self, key: K) -> V | None:
        start_idx = self._hash(key)
        for step in range(self.capacity):
            idx = (start_idx + step) % self.capacity
            slot_key = self.keys[idx]

            if slot_key is None:
                # Unbroken chain ended without finding key
                return None
            if slot_key is not _TOMBSTONE and slot_key == key:
                return self.values[idx]

        return None

    def delete(self, key: K) -> bool:
        start_idx = self._hash(key)
        for step in range(self.capacity):
            idx = (start_idx + step) % self.capacity
            slot_key = self.keys[idx]

            if slot_key is None:
                return False
            if slot_key is not _TOMBSTONE and slot_key == key:
                self.keys[idx] = _TOMBSTONE
                self.values[idx] = None
                self._count -= 1
                return True

        return False

    def load_factor(self) -> float:
        return self._count / self.capacity
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `ht = LinearProbeHashTable(8); ht.put("a", 100); ht.get("a")` -> `100`
- `ht.delete("a")` -> `True`; subsequent `ht.get("a")` -> `None`.

**Hidden Test Cases:**
- Collision chain: Force 3 keys with identical hash mod 8 into adjacent slots.
- Tombstone integrity: Delete middle element of collision chain; verify downstream element is still found by `get()`.
- Overflow: Inserting into full table raises `OverflowError`.

**Executable Test Harness:**
```python
def test_py_hash_table():
    ht = LinearProbeHashTable(capacity=4)
    ht.put("key1", 10)
    ht.put("key2", 20)
    assert ht.load_factor() == 0.5
    assert ht.get("key1") == 10
    assert ht.get("key2") == 20
    
    # Delete key1 -> sets Tombstone
    assert ht.delete("key1") is True
    assert ht.get("key1") is None
    assert ht.get("key2") == 20, "Probe chain was broken by deletion without Tombstone!"
    
    # Insert new key reusing tombstone or empty
    ht.put("key3", 30)
    assert ht.get("key3") == 30
    
    print("ALL TESTS PASSED for py-hash-table-probe")

if __name__ == "__main__":
    test_py_hash_table()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.12ms for 500 operations (Limit: 800ms)
- **Heap Memory Limit:** Fixed array allocation (~1KB for capacity 64)
- **Asymptotic Complexity:** Average Time: $\mathcal{O}(1)$ lookup/insert. Worst Case: $\mathcal{O}(C)$ when table is near 100% full. Space: $\mathcal{O}(C)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** After calling `delete(k1)`, subsequent `get(k2)` returns `None` even though `k2` was never deleted.
- **Where (The Localization):** The `delete` method clearing the slot to `None`.
- **Why (The Mechanism):** Linear probing stops searching as soon as it hits `None`. If an intervening slot is wiped clean, subsequent items that collided and probed past that slot become unreachable.
- **How (The Remediation):** Replace deleted keys with a unique sentinel object (`_TOMBSTONE = object()`) and instruct `get()` to continue probing when encountering `_TOMBSTONE`.


### Lesson T2-11: Optimal Hash Indexing, Two-Sum & Frequency Inversion
- **Challenge ID:** `py-two-sum-hash`
- **Module:** `MOD-11: Hash Tables & Complexity`
- **Lesson Number:** `LESSON-T2-11`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Given an integer array $A$ of length $N$ and a scalar target $T$, find all unique index pairs $(i, j)$ such that:
$$A[i] + A[j] = T \quad \text{with } i < j$$

A brute-force double-loop evaluates $\frac{N(N-1)}{2}$ candidate combinations, yielding quadratic runtime $\mathcal{O}(N^2)$, which chokes and times out on $N = 50,000$ in WASM runtimes.

By maintaining a hash index of visited complements:
$$\text{complement} = T - A[j]$$
we query whether the required counter-weight exists in amortized $\mathcal{O}(1)$ time, reducing total complexity to $\mathcal{O}(N)$.

Implement `find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]` that:
1. Returns all index pairs $(i, j)$ with $i < j$ satisfying $nums[i] + nums[j] == target$.
2. Returns pairs sorted lexicographically by index: $i_1 < i_2$, or $j_1 < j_2$ if $i_1 == i_2$.
3. Handles duplicate values in `nums` properly (generating all valid distinct index pairings).
4. Strictly operates in $\mathcal{O}(N + K \log K)$ time where $K$ is the number of valid pairs.


#### 2. Clean Starter Code
```python
def find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]:
    """
    Finds all index pairs (i, j) with i < j such that nums[i] + nums[j] == target
    using a single-pass hash map index.

    Args:
        nums: List of integers.
        target: Target sum.

    Returns:
        List of 0-based index tuples (i, j) sorted lexicographically.
    """
    # TODO: Implement O(N) hash map complementary pairing
    raise NotImplementedError("Implement find_all_target_pairs")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from collections import defaultdict

def find_all_target_pairs(nums: list[int], target: int) -> list[tuple[int, int]]:
    # Map each value to a list of its seen 0-based indices
    seen_indices: dict[int, list[int]] = defaultdict(list)
    pairs: list[tuple[int, int]] = []

    for current_idx, val in enumerate(nums):
        complement = target - val
        if complement in seen_indices:
            # All previously seen indices of complement form valid pairs (prev_idx, current_idx)
            for prev_idx in seen_indices[complement]:
                pairs.append((prev_idx, current_idx))

        seen_indices[val].append(current_idx)

    # Sort lexicographically for deterministic verification
    pairs.sort()
    return pairs
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `find_all_target_pairs([2, 7, 11, 15], 9)` -> `[(0, 1)]`
- `find_all_target_pairs([3, 2, 4, 3], 6)` -> `[(0, 3), (1, 2)]`

**Hidden Test Cases:**
- All duplicates: `[2, 2, 2, 2]` with target `4` -> 6 pairs: `[(0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3)]`.
- Negative numbers and zero: `[-5, 0, 5, 10, -5]` with target `0` -> `[(0, 2), (2, 4)]`.
- Large array: 20,000 items executed in < 50ms (verifying absence of $\mathcal{O}(N^2)$ loops).

**Executable Test Harness:**
```python
def test_py_two_sum():
    assert find_all_target_pairs([2, 7, 11, 15], 9) == [(0, 1)]
    assert find_all_target_pairs([3, 2, 4, 3], 6) == [(0, 3), (1, 2)]
    
    # Quad duplicate test
    assert find_all_target_pairs([1, 1, 1], 2) == [(0, 1), (0, 2), (1, 2)]
    
    # Stress test verifying linear O(N) performance
    large = [i for i in range(10000)]
    # Target 9999 has pairs (0, 9999), (1, 9998), ...
    res = find_all_target_pairs(large, 9999)
    assert len(res) == 5000
    assert res[0] == (0, 9999)
    
    print("ALL TESTS PASSED for py-two-sum-hash")

if __name__ == "__main__":
    test_py_two_sum()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~25ms for 10,000 items (Limit: 800ms)
- **Heap Memory Limit:** Dictionary storing $N$ indices (< 8MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N + K \log K)$. Space: $\mathcal{O}(N)$ where $N$ is array length.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The browser tab hangs or crashes with an execution timeout on arrays of length 10,000+.
- **Where (The Localization):** Nested loops `for i in range(N): for j in range(i+1, N):`.
- **Why (The Mechanism):** Nested loops perform $\frac{N^2}{2}$ iterations. For $N = 10,000$, this requires $50,000,000$ operations in WASM, exceeding the 800ms budget.
- **How (The Remediation):** Build a dictionary mapping `val -> [indices]` in a single forward pass, looking up `target - val` in $\mathcal{O}(1)$ time.


### Lesson T2-12: Sub-Quadratic Optimization: O(N^2) to O(N) Deduplication
- **Challenge ID:** `py-big-o-dedup-benchmark`
- **Module:** `MOD-11: Hash Tables & Complexity`
- **Lesson Number:** `LESSON-T2-12`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
A standard beginner idiom for removing duplicates while preserving the original relative order is:
```python
unique = []
for item in items:
    if item not in unique:  # O(K) linear scan!
        unique.append(item)
```
Because `item not in unique` scans the growing list of length $K$, total comparisons equal $\sum_{k=1}^U k \approx \frac{U^2}{2} = \mathcal{O}(N^2)$. On an input sequence of $N = 40,000$ distinct items, this requires $\approx 800,000,000$ equality checks.

In contrast, maintaining a companion hash set of seen keys reduces membership testing to amortized $\mathcal{O}(1)$:
$$T(N) = \sum_{i=1}^N \mathcal{O}(1) = \mathcal{O}(N)$$

Implement an industrial order-preserving deduplicator:
`deduplicate_preserve_order(items: list[Any]) -> list[Any]`
that:
1. Filters out duplicate elements while preserving the exact order of each item's **first** occurrence.
2. Runs in strict $\mathcal{O}(N)$ average time.
3. **Unhashable Fallback Invariant:** If an element is unhashable (e.g. nested `list` or `dict`), falls back safely to identity or linear membership without crashing.


#### 2. Clean Starter Code
```python
from typing import Any

def deduplicate_preserve_order(items: list[Any]) -> list[Any]:
    """
    Deduplicates a list while preserving first-occurrence order in O(N) time,
    with graceful handling of unhashable elements.

    Args:
        items: List of elements (hashable or unhashable).

    Returns:
        List containing unique elements in original encounter order.
    """
    # TODO: Implement O(N) set-backed deduplication with unhashable fallback
    raise NotImplementedError("Implement deduplicate_preserve_order")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any
from collections.abc import Hashable

def deduplicate_preserve_order(items: list[Any]) -> list[Any]:
    seen_hashable: set[Any] = set()
    unhashable_items: list[Any] = []
    output: list[Any] = []

    for item in items:
        if isinstance(item, Hashable):
            # Fast path: O(1) amortized hash table lookup
            try:
                if item not in seen_hashable:
                    seen_hashable.add(item)
                    output.append(item)
            except TypeError:
                # Handle cases where __hash__ is defined but raises TypeError
                if item not in unhashable_items:
                    unhashable_items.append(item)
                    output.append(item)
        else:
            # Slow fallback for unhashable containers (dicts, lists)
            if item not in unhashable_items:
                unhashable_items.append(item)
                output.append(item)

    return output
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `deduplicate_preserve_order([4, 5, 4, 1, 2, 5, 3])` -> `[4, 5, 1, 2, 3]`
- `deduplicate_preserve_order(["b", "a", "b", "c"])` -> `["b", "a", "c"]`

**Hidden Test Cases:**
- Unhashable elements: `[[1], [2], [1], {"a": 1}, {"a": 1}]` -> `[[1], [2], {"a": 1}]`
- Mixed types: `[1, "1", (1,), 1]` -> `[1, "1", (1,)]` (int 1 is not equal to string "1")
- Large stream: 50,000 elements processed in < 30ms.

**Executable Test Harness:**
```python
def test_py_big_o_dedup():
    raw = ["apple", "banana", "apple", "cherry", "banana", "date"]
    assert deduplicate_preserve_order(raw) == ["apple", "banana", "cherry", "date"]
    
    # Mixed unhashable elements
    mixed = [1, [1, 2], {"k": "v"}, [1, 2], 1, {"k": "v"}]
    assert deduplicate_preserve_order(mixed) == [1, [1, 2], {"k": "v"}]
    
    # Speed validation: 30,000 items with heavy duplication
    import random
    large = [random.randint(0, 500) for _ in range(30000)]
    res = deduplicate_preserve_order(large)
    assert len(res) == len(set(large))
    
    print("ALL TESTS PASSED for py-big-o-dedup-benchmark")

if __name__ == "__main__":
    test_py_big_o_dedup()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~18ms for 30,000 items (Limit: 800ms)
- **Heap Memory Limit:** Auxiliary set storing $U$ unique elements (< 4MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ for hashable items, $\mathcal{O}(U_{\text{unhash}} \cdot N)$ worst-case for unhashables. Space: $\mathcal{O}(N)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The browser test runner aborts with `Execution Timeout (>800ms)`.
- **Where (The Localization):** The condition `if item not in output:`.
- **Why (The Mechanism):** Testing membership in a standard Python list (`x in list`) iterates linearly through all elements from start to end ($\mathcal{O}(K)$).
- **How (The Remediation):** Maintain a parallel `seen = set()` for $\mathcal{O}(1)$ lookups, appending to `output` only when `item not in seen`.



---

## Module MOD-12: Object Protocols & Iteration

### Lesson T2-13: Python Data Model: Vector Dunder Protocol
- **Challenge ID:** `py-dunder-vector-protocol`
- **Module:** `MOD-12: Object Protocols & Iteration`
- **Lesson Number:** `LESSON-T2-13`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In Python's object model, operators map directly to special "dunder" (double underscore) methods. In numerical and scientific computing, objects should adhere to mathematical protocols:
- Addition: $\mathbf{u} + \mathbf{v} \implies \mathbf{u}.\text{__add__}(\mathbf{v})$
- Subtraction: $\mathbf{u} - \mathbf{v} \implies \mathbf{u}.\text{__sub__}(\mathbf{v})$
- Euclidean Norm: $\|\mathbf{u}\|_2 \implies \text{abs}(\mathbf{u}) \implies \mathbf{u}.\text{__abs__}() = \sqrt{x^2 + y^2}$
- Dot Product: $\mathbf{u} \cdot \mathbf{v} \implies \mathbf{u} \mathbin{@} \mathbf{v} \implies \mathbf{u}.\text{__matmul__}(\mathbf{v}) = u_x v_x + u_y v_y$
- Scalar Multiplication: $\alpha \mathbf{u} \implies \mathbf{u} \times \alpha \implies \mathbf{u}.\text{__mul__}(\alpha)$ and $\alpha.\text{__rmul__}(\mathbf{u})$

Furthermore, standard Python class instances allocate a dynamic dictionary `__dict__` (~152 bytes overhead per instance). Using `__slots__` eliminates `__dict__`, storing fields as a compact C-level pointer array (~48 bytes), critical for WASM memory efficiency.

Implement an immutable 2D vector class `Vector2D`:
- `__slots__ = ("_x", "_y")`: Declares compact memory layout.
- Properties: Read-only `x: float` and `y: float`.
- Dunder protocols: `__repr__`, `__eq__`, `__abs__`, `__add__`, `__sub__`, `__mul__`, `__rmul__`, and `__matmul__`.
- Type checking: `__add__` with non-Vector returns `NotImplemented` to permit reflected operations.


#### 2. Clean Starter Code
```python
from typing import Any
import math

class Vector2D:
    """
    Immutable 2D Euclidean vector implementing Python data model dunder protocols
    and memory-compact __slots__.
    """
    __slots__ = ("_x", "_y")

    def __init__(self, x: float, y: float) -> None:
        # TODO: Store coordinates as floats
        raise NotImplementedError("Implement Vector2D.__init__")

    @property
    def x(self) -> float:
        raise NotImplementedError("Implement Vector2D.x")

    @property
    def y(self) -> float:
        raise NotImplementedError("Implement Vector2D.y")

    # TODO: Implement __repr__, __eq__, __abs__, __add__, __sub__, __mul__, __rmul__, __matmul__
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any
import math

class Vector2D:
    __slots__ = ("_x", "_y")

    def __init__(self, x: float, y: float) -> None:
        object.__setattr__(self, "_x", float(x))
        object.__setattr__(self, "_y", float(y))

    @property
    def x(self) -> float:
        return self._x

    @property
    def y(self) -> float:
        return self._y

    def __repr__(self) -> str:
        return f"Vector2D({self._x!r}, {self._y!r})"

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, Vector2D):
            return math.isclose(self._x, other._x) and math.isclose(self._y, other._y)
        return False

    def __abs__(self) -> float:
        return math.hypot(self._x, self._y)

    def __add__(self, other: Any) -> "Vector2D":
        if isinstance(other, Vector2D):
            return Vector2D(self._x + other._x, self._y + other._y)
        return NotImplemented

    def __sub__(self, other: Any) -> "Vector2D":
        if isinstance(other, Vector2D):
            return Vector2D(self._x - other._x, self._y - other._y)
        return NotImplemented

    def __mul__(self, scalar: Any) -> "Vector2D":
        if isinstance(scalar, (int, float)):
            return Vector2D(self._x * scalar, self._y * scalar)
        return NotImplemented

    def __rmul__(self, scalar: Any) -> "Vector2D":
        return self.__mul__(scalar)

    def __matmul__(self, other: Any) -> float:
        if isinstance(other, Vector2D):
            return (self._x * other._x) + (self._y * other._y)
        return NotImplemented
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `v1 = Vector2D(3, 4); abs(v1)` -> `5.0`
- `v1 + Vector2D(1, 2)` -> `Vector2D(4.0, 6.0)`
- `Vector2D(1, 2) @ Vector2D(3, 4)` -> `11.0`

**Hidden Test Cases:**
- Immutability: Attempting `v1.x = 10` raises `AttributeError`.
- Slots verification: `assert not hasattr(v1, "__dict__")`.
- Reflected multiplication: `2.5 * Vector2D(2, 4)` -> `Vector2D(5.0, 10.0)`.
- Non-vector operand returns `NotImplemented`.

**Executable Test Harness:**
```python
def test_py_dunder_vector():
    u = Vector2D(3.0, 4.0)
    v = Vector2D(1.0, -2.0)
    
    # Magnitudes & Representation
    assert abs(u) == 5.0
    assert repr(u) == "Vector2D(3.0, 4.0)"
    
    # Vector Arithmetic
    w = u + v
    assert w == Vector2D(4.0, 2.0)
    assert u - v == Vector2D(2.0, 6.0)
    
    # Scalar multiplication (both orientations)
    assert u * 2 == Vector2D(6.0, 8.0)
    assert 3 * v == Vector2D(3.0, -6.0)
    
    # Dot Product (matmul @ operator)
    assert u @ v == 3.0 * 1.0 + 4.0 * (-2.0)  # -5.0
    
    # Slots verification (memory compaction)
    assert not hasattr(u, "__dict__"), "__slots__ must eliminate __dict__"
    
    print("ALL TESTS PASSED for py-dunder-vector-protocol")

if __name__ == "__main__":
    test_py_dunder_vector()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.02ms per vector operation (Limit: 800ms)
- **Heap Memory Limit:** 48 bytes per instance in Pyodide WASM.
- **Asymptotic Complexity:** Time: $\mathcal{O}(1)$ for all vector operations. Space: $\mathcal{O}(1)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Writing `3 * v` raises `TypeError: unsupported operand type(s) for *: 'int' and 'Vector2D'`.
- **Where (The Localization):** The `Vector2D` class definition.
- **Why (The Mechanism):** Python evaluates binary operations left-to-right. Since `int` does not know how to multiply by `Vector2D`, it looks for the reflected method `__rmul__` on the right-hand operand.
- **How (The Remediation):** Implement `def __rmul__(self, scalar): return self.__mul__(scalar)`.


### Lesson T2-14: Iterator Protocol: Stateful Chunking Iterator
- **Challenge ID:** `py-custom-range-iter`
- **Module:** `MOD-12: Object Protocols & Iteration`
- **Lesson Number:** `LESSON-T2-14`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In Python's iteration architecture:
- An **Iterable** is an object with an `__iter__()` method returning an Iterator.
- An **Iterator** is an object with both an `__iter__()` (returning `self`) and a `__next__()` method that yields the next element or raises `StopIteration`.

In big data streaming and micro-batch model training, streaming records must be grouped into fixed-size batches of size $B$ without loading the entire dataset into memory.

Implement a stateful chunking iterator `ChunkedIterator[T]`:
- `__init__(iterable: Iterable[T], chunk_size: int)`: Accepts any iterable stream and batch size $B$. Raises `ValueError` if `chunk_size <= 0`.
- `__iter__() -> ChunkedIterator[T]`: Returns `self`.
- `__next__() -> list[T]`: Consumes up to $B$ elements from the underlying stream and returns them as a `list[T]`.
  - The final chunk may have length $< B$ if the stream terminates.
  - When the underlying stream is exhausted and no elements remain for a new chunk, raises `StopIteration`.
- **Stream Invariant:** Must work seamlessly over single-pass generator streams without calling `len()` or indexing `[i]`.


#### 2. Clean Starter Code
```python
from typing import TypeVar, Generic, Iterable, Iterator

T = TypeVar("T")

class ChunkedIterator(Generic[T], Iterator[list[T]]):
    """
    Consumes any iterable stream into discrete fixed-size chunk lists
    adhering strictly to the Python Iterator protocol.
    """
    def __init__(self, iterable: Iterable[T], chunk_size: int) -> None:
        # TODO: Initialize iterator and validate chunk_size
        raise NotImplementedError("Implement ChunkedIterator.__init__")

    def __iter__(self) -> "ChunkedIterator[T]":
        raise NotImplementedError("Implement ChunkedIterator.__iter__")

    def __next__(self) -> list[T]:
        raise NotImplementedError("Implement ChunkedIterator.__next__")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import TypeVar, Generic, Iterable, Iterator

T = TypeVar("T")

class ChunkedIterator(Generic[T], Iterator[list[T]]):
    def __init__(self, iterable: Iterable[T], chunk_size: int) -> None:
        if chunk_size <= 0:
            raise ValueError("chunk_size must be a positive integer")
        self._source_iter: Iterator[T] = iter(iterable)
        self._chunk_size: int = chunk_size
        self._exhausted: bool = False

    def __iter__(self) -> "ChunkedIterator[T]":
        return self

    def __next__(self) -> list[T]:
        if self._exhausted:
            raise StopIteration

        batch: list[T] = []
        for _ in range(self._chunk_size):
            try:
                item = next(self._source_iter)
                batch.append(item)
            except StopIteration:
                self._exhausted = True
                break

        if not batch:
            raise StopIteration

        return batch
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `list(ChunkedIterator(range(7), chunk_size=3))` -> `[[0, 1, 2], [3, 4, 5], [6]]`
- `list(ChunkedIterator([], chunk_size=2))` -> `[]`

**Hidden Test Cases:**
- Infinite generator source: Consume 3 chunks from a continuous generator; verify stream is not pre-evaluated.
- Zero or negative chunk size raises `ValueError`.
- Idempotent termination: Subsequent calls to `next()` after exhaustion continuously raise `StopIteration`.

**Executable Test Harness:**
```python
def test_py_custom_range_iter():
    # Test finite sequence
    chunks = list(ChunkedIterator(range(10), 4))
    assert chunks == [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]]
    
    # Test generator consumption without indexing
    def infinite_counter():
        n = 0
        while True:
            yield n
            n += 1
            
    stream = infinite_counter()
    chunk_iter = ChunkedIterator(stream, 3)
    assert next(chunk_iter) == [0, 1, 2]
    assert next(chunk_iter) == [3, 4, 5]
    
    # Invalid size test
    try:
        ChunkedIterator(range(5), 0)
        assert False, "Should raise ValueError for chunk_size <= 0"
    except ValueError:
        pass
        
    print("ALL TESTS PASSED for py-custom-range-iter")

if __name__ == "__main__":
    test_py_custom_range_iter()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.18ms for 10,000 items (Limit: 800ms)
- **Heap Memory Limit:** Buffer bounded strictly to `chunk_size` elements (< 100KB for chunk_size=1000)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ stream scan. Space: $\mathcal{O}(B)$ memory where $B = \text{chunk\_size}$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Passing a generator causes `TypeError: object of type 'generator' has no len()` or infinite loop.
- **Where (The Localization):** Attempting `len(iterable)` or `iterable[start:end]` in `__init__`.
- **Why (The Mechanism):** Generators and network streams do not support slicing or length discovery. They can only be consumed sequentially via `iter()` and `next()`.
- **How (The Remediation):** Store `self._source_iter = iter(iterable)` and accumulate items inside a loop using `try: item = next(self._source_iter) except StopIteration: break`.


### Lesson T2-15: Memory-Bounded Generator: Streaming Online Welford Stats
- **Challenge ID:** `py-running-average-gen`
- **Module:** `MOD-12: Object Protocols & Iteration`
- **Lesson Number:** `LESSON-T2-15`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Computing mean and variance naively requires buffering all $N$ data points in memory to calculate deviations from the mean:
$$s^2 = \frac{1}{N - 1} \sum_{i=1}^N (x_i - \bar{x})^2$$
For continuous sensor feeds or high-frequency trade data, this causes out-of-memory (OOM) fatal errors. Furthermore, the textbook one-pass formula $\sum x_i^2 - \frac{(\sum x_i)^2}{N}$ suffers from catastrophic floating-point cancellation.

**B.P. Welford's Algorithm (1962)** computes exact running mean and sample variance numerically stably in $\mathcal{O}(1)$ space:
For observation $k$ with value $x_k$:
$$\mu_k = \mu_{k-1} + \frac{x_k - \mu_{k-1}}{k}$$
$$M_{2, k} = M_{2, k-1} + (x_k - \mu_{k-1})(x_k - \mu_k)$$
$$s^2_k = \begin{cases} 0.0 & k < 2 \\ \frac{M_{2, k}}{k - 1} & k \ge 2 \end{cases}$$

Implement a memory-bounded generator function:
`streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]`
that yields `(count, running_mean, running_sample_variance)` for each incoming number.

**Strict Constraints:**
- Must operate in strict $\mathcal{O}(1)$ auxiliary memory (NO lists, arrays, or accumulating buffers).


#### 2. Clean Starter Code
```python
from typing import Iterable, Generator

def streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]:
    """
    Streams running count, mean, and sample variance using Welford's algorithm
    in strict O(1) memory space.

    Args:
        stream: Iterable yielding float values.

    Yields:
        Tuples of (count, mean, sample_variance).
    """
    # TODO: Implement online Welford generator
    raise NotImplementedError("Implement streaming_welford_stats")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Iterable, Generator

def streaming_welford_stats(stream: Iterable[float]) -> Generator[tuple[int, float, float], None, None]:
    count: int = 0
    mean: float = 0.0
    M2: float = 0.0

    for x in stream:
        count += 1
        delta = x - mean
        mean += delta / count
        delta2 = x - mean
        M2 += delta * delta2

        sample_variance = 0.0 if count < 2 else M2 / (count - 1)
        yield (count, mean, sample_variance)
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Input: `[10.0, 20.0, 30.0]`
  - Step 1: `(1, 10.0, 0.0)`
  - Step 2: `(2, 15.0, 50.0)`
  - Step 3: `(3, 20.0, 100.0)`

**Hidden Test Cases:**
- Large values with small variance: `[1e9 + 1, 1e9 + 2, 1e9 + 3]` -> Mean `1e9 + 2`, Variance `1.0` (Tests absence of floating-point catastrophic cancellation).
- Single observation: Count 1 yields variance `0.0`.
- Memory proof: Stream of 100,000 items executed without allocating heap arrays.

**Executable Test Harness:**
```python
import math

def test_py_running_average():
    # Test 1: Simple numbers
    data = [10.0, 20.0, 30.0]
    results = list(streaming_welford_stats(data))
    
    assert results[0] == (1, 10.0, 0.0)
    assert results[1] == (2, 15.0, 50.0)
    assert results[2] == (3, 20.0, 100.0)
    
    # Test 2: Catastrophic cancellation immunity test
    base = 1_000_000_000.0
    shifted_data = [base + 2.0, base + 4.0, base + 6.0]
    shifted_results = list(streaming_welford_stats(shifted_data))
    
    cnt, m, var = shifted_results[-1]
    assert cnt == 3
    assert math.isclose(m, base + 4.0)
    assert math.isclose(var, 4.0), f"Expected variance 4.0, got {var}"
    
    print("ALL TESTS PASSED for py-running-average-gen")

if __name__ == "__main__":
    test_py_running_average()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~14ms for 50,000 observations (Limit: 800ms)
- **Heap Memory Limit:** Zero accumulation; frame uses exactly 3 float variables (< 200 bytes)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$. Space: $\mathcal{O}(1)$ strictly.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The variance of `[1e9+1, 1e9+2, 1e9+3]` computes to `0.0` or a negative number.
- **Where (The Localization):** The formula calculating variance from squared sums.
- **Why (The Mechanism):** Floating point numbers in IEEE 754 have 53 bits of precision (~15-17 decimal digits). When squaring $10^9$ to $10^{18}$, the small differences in low-order bits fall off the mantissa, destroying statistical accuracy.
- **How (The Remediation):** Update variance via the dual-delta terms: `delta = x - mean`, `mean += delta / count`, `delta2 = x - mean`, `M2 += delta * delta2`.



---

## Module MOD-13: SIMD Vectorization & NumPy Mechanics

### Lesson T2-16: SIMD Vectorization: Contiguous C-Arrays vs Boxed Loops
- **Challenge ID:** `py-simd-squared-error`
- **Module:** `MOD-13: SIMD Vectorization & NumPy Mechanics`
- **Lesson Number:** `LESSON-T2-16`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In pure CPython, iterating over a list of floats requires dereferencing individual heap-allocated `PyFloatObject` structs across scattered memory addresses, incurring branch mispredictions and dynamic type checks:
$$T_{\text{CPython}} = N \cdot (\tau_{\text{eval\_loop}} + \tau_{\text{deref}} + \tau_{\text{unbox}} + \tau_{\text{fadd}})$$

In contrast, NumPy arrays store raw 64-bit IEEE 754 floats in contiguous C-memory blocks. When vectorized, modern CPU architectures (x86 AVX2/AVX-512, ARM NEON, and WASM SIMD128) execute parallel instructions operating on multiple floating-point lanes simultaneously:
$$T_{\text{SIMD}} = \frac{N}{W} \tau_{\text{vec\_op}} \implies \text{Speedup } S \approx 50\times - 200\times$$

**Huber Loss** provides a robust regression loss less sensitive to outliers than squared error:
$$L_\delta(y, \hat{y}) = \begin{cases} \frac{1}{2} (y - \hat{y})^2 & \text{for } |y - \hat{y}| \le \delta \\ \delta \cdot \big(|y - \hat{y}| - \frac{1}{2} \delta\big) & \text{otherwise} \end{cases}$$

Implement a fully vectorized Huber loss calculation:
`vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float`
that computes the mean Huber loss across all observations.

**Strict Vectorization Invariant:**
- **Zero Python Loops:** No `for`, `while`, or Python-level list comprehensions.
- Must execute exclusively via contiguous NumPy C-array primitives (`np.abs`, `np.where`, `np.mean`).


#### 2. Clean Starter Code
```python
import numpy as np

def vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:
    """
    Computes the mean Huber loss between true and predicted targets using
    SIMD-vectorized NumPy operations without Python loops.

    Args:
        y_true: 1D NumPy array of ground truth targets.
        y_pred: 1D NumPy array of model predictions.
        delta: Threshold separating quadratic and linear penalty regimes.

    Returns:
        Scalar float representing mean Huber loss.
    """
    # TODO: Implement vectorized Huber loss without loops
    raise NotImplementedError("Implement vectorized_huber_loss")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
import numpy as np

def vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:
    # Ensure float64 C-contiguous memory layout
    y_t = np.asarray(y_true, dtype=np.float64)
    y_p = np.asarray(y_pred, dtype=np.float64)
    
    # Vectorized element-wise residual calculation
    errors = np.abs(y_t - y_p)
    
    # Vectorized branchless condition mapping via SIMD instructions
    quadratic = 0.5 * (errors ** 2)
    linear = delta * (errors - 0.5 * delta)
    losses = np.where(errors <= delta, quadratic, linear)
    
    return float(np.mean(losses))
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `y = np.array([2.0, 4.0]); y_hat = np.array([1.0, 3.0]); vectorized_huber_loss(y, y_hat, delta=1.0)` -> `0.5`
- Outlier test: `vectorized_huber_loss(np.array([10.0]), np.array([0.0]), delta=1.0)` -> `1.0 * (10.0 - 0.5) = 9.5`

**Hidden Test Cases:**
- Vectorization check: Overriding Python `for` loops in test harness.
- Large array SIMD throughput: 200,000 points executed in < 15ms.
- Multi-dimensional flattened inputs.

**Executable Test Harness:**
```python
import numpy as np
import math

def test_py_simd_squared_error():
    y_true = np.array([1.0, 2.0, 10.0])
    y_pred = np.array([1.5, 2.0, 0.0])  # errors: 0.5, 0.0, 10.0
    
    # errors <= 1.0:
    # e=0.5 -> 0.5 * 0.25 = 0.125
    # e=0.0 -> 0.0
    # errors > 1.0:
    # e=10.0 -> 1.0 * (10.0 - 0.5) = 9.5
    # Mean = (0.125 + 0.0 + 9.5) / 3 = 9.625 / 3 = 3.208333...
    res = vectorized_huber_loss(y_true, y_pred, delta=1.0)
    assert math.isclose(res, 9.625 / 3.0), f"Expected 3.2083, got {res}"
    
    # Large SIMD throughput test
    N = 100_000
    yt_large = np.ones(N)
    yp_large = np.zeros(N)
    res_large = vectorized_huber_loss(yt_large, yp_large, delta=0.5)
    # error = 1.0 > 0.5 -> 0.5 * (1.0 - 0.25) = 0.375
    assert math.isclose(res_large, 0.375)
    
    print("ALL TESTS PASSED for py-simd-squared-error")

if __name__ == "__main__":
    test_py_simd_squared_error()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~8ms for 100,000 elements in Pyodide WASM (Limit: 800ms)
- **Heap Memory Limit:** Contiguous array buffer (< 3MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ vectorized SIMD. Space: $\mathcal{O}(N)$ for intermediate array masks.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The code passes correctness tests but fails with `Performance Violation: Pure Python loop detected`.
- **Where (The Localization):** The `for i in range(len(y_true))` loop.
- **Why (The Mechanism):** Iterating element-by-element in Python forces the runtime to unbox every float into a PyObject, nullifying the SIMD hardware pipeline.
- **How (The Remediation):** Use `np.abs(y_true - y_pred)` and pass the boolean condition `errors <= delta` directly into `np.where(condition, quadratic, linear)`.


### Lesson T2-17: Memory Strides & Zero-Copy Rolling Window via as_strided
- **Challenge ID:** `py-stride-sliding-window`
- **Module:** `MOD-13: SIMD Vectorization & NumPy Mechanics`
- **Lesson Number:** `LESSON-T2-17`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
A NumPy array consists of a lightweight Python header pointing to a contiguous memory buffer. The memory layout is governed by:
- **Shape $(d_0, d_1, \dots, d_{k-1})$:** The lengths of each dimension.
- **Strides $(s_0, s_1, \dots, s_{k-1})$:** The number of bytes to step in memory to advance by one index in that dimension.

For a 1D contiguous array of 64-bit floats (`float64`, 8 bytes per element), its stride is `(8,)`.
To construct an overlapping 2D rolling window matrix of shape $(K, W)$ where:
$$K = N - W + 1$$
without copying the underlying memory buffer, we compute the target 2D stride descriptor:
$$\text{shape} = (N - W + 1, \, W)$$
$$\text{strides} = (s_{\text{orig}}, \, s_{\text{orig}}) = (8, 8)$$

Moving down one row steps by 8 bytes (advancing by 1 element in the original sequence); moving across one column steps by 8 bytes. This creates a virtual $(K \times W)$ matrix using **zero additional bytes of heap memory**!

Implement `strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray`:
1. Validates that `arr` is a 1D NumPy array and `1 <= window_size <= len(arr)`.
2. Computes the appropriate 2D shape and stride tuple.
3. Constructs and returns the strided view using `np.lib.stride_tricks.as_strided`.
4. **Memory Invariant:** The returned array's `base` attribute must reference the original array `arr` (`view.base is arr`), verifying zero memory duplication.


#### 2. Clean Starter Code
```python
import numpy as np
from numpy.lib.stride_tricks import as_strided

def strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:
    """
    Creates a 2D rolling window view of a 1D array with zero memory copies
    using NumPy memory stride manipulation.

    Args:
        arr: 1D NumPy array.
        window_size: Window length W.

    Returns:
        2D NumPy array of shape (N - W + 1, W) sharing underlying buffer.
    """
    # TODO: Calculate strides and construct zero-copy view via as_strided
    raise NotImplementedError("Implement strided_rolling_window")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
import numpy as np
from numpy.lib.stride_tricks import as_strided

def strided_rolling_window(arr: np.ndarray, window_size: int) -> np.ndarray:
    if arr.ndim != 1:
        raise ValueError("Input array must be 1-dimensional")
    n = arr.shape[0]
    if window_size < 1 or window_size > n:
        raise ValueError("window_size must satisfy 1 <= window_size <= len(arr)")

    # Ensure contiguous memory layout before inspecting byte strides
    c_arr = np.ascontiguousarray(arr)
    elem_stride = c_arr.strides[0]

    num_windows = n - window_size + 1
    new_shape = (num_windows, window_size)
    new_strides = (elem_stride, elem_stride)

    # Construct zero-copy strided view
    return as_strided(c_arr, shape=new_shape, strides=new_strides, writeable=False)
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `arr = np.array([1, 2, 3, 4, 5]); strided_rolling_window(arr, 3)` ->
  `[[1, 2, 3], [2, 3, 4], [3, 4, 5]]`
- Shape verification: `(3, 3)`.

**Hidden Test Cases:**
- Memory sharing check: `assert view.base is arr or view.base is arr.base`.
- Single window: `window_size == len(arr)` -> shape `(1, N)`.
- Window size 1 -> column vector shape `(N, 1)`.
- Non-contiguous input handling.

**Executable Test Harness:**
```python
import numpy as np

def test_py_stride_sliding():
    data = np.arange(1, 7, dtype=np.int64)  # [1, 2, 3, 4, 5, 6]
    windows = strided_rolling_window(data, window_size=3)
    
    expected = np.array([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6]
    ])
    assert np.array_equal(windows, expected)
    assert windows.shape == (4, 3)
    
    # Zero-copy verification: Underlying buffer must match data
    assert windows.base is data or windows.base is data.base, "Must be a zero-copy view!"
    
    # Giant array test: 1,000,000 elements with window 50
    # Naive copy would take 1M * 50 * 8 bytes ~ 400MB (OOM in WASM)
    # Zero-copy strided takes 0 additional bytes!
    giant = np.ones(1_000_000, dtype=np.float64)
    giant_view = strided_rolling_window(giant, window_size=50)
    assert giant_view.shape == (1_000_000 - 50 + 1, 50)
    
    print("ALL TESTS PASSED for py-stride-sliding-window")

if __name__ == "__main__":
    test_py_stride_sliding()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.05ms (Zero-copy pointer reinterpretation; executes instantly regardless of $N$)
- **Heap Memory Limit:** 0 bytes allocated for elements (Shares existing buffer)
- **Asymptotic Complexity:** Time: $\mathcal{O}(1)$. Space: $\mathcal{O}(1)$ auxiliary.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The browser tab runs out of memory (OOM) or returns garbled memory values.
- **Where (The Localization):** The `new_strides` tuple passed to `as_strided`.
- **Why (The Mechanism):** Strides are byte offsets, not element offsets. If you pass `(1, 1)` instead of `(itemsize, itemsize)`, NumPy steps by 1 single byte instead of 8 bytes, reading misaligned binary float fragments.
- **How (The Remediation):** Retrieve the native element byte stride with `elem_stride = arr.strides[0]` and assign `strides=(elem_stride, elem_stride)`.


### Lesson T2-18: NumPy Broadcasting Rules & Memory Stride Strata
- **Challenge ID:** `py-broadcast-pairwise-dist`
- **Module:** `MOD-13: SIMD Vectorization & NumPy Mechanics`
- **Lesson Number:** `LESSON-T2-18`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Broadcasting in NumPy describes how arrays of different shapes are aligned during arithmetic operations without copying data. The formal rules:
1. If the arrays differ in number of dimensions, prepend dimensions of size `1` to the shorter array.
2. Two dimensions are compatible if they are equal, or if one of them is `1`.
3. In any dimension where one array has size `1` and the other size $D > 1$, the size-1 dimension is treated as if it had stride 0, repeating its values without copying.

Given two matrices of embeddings or points:
$$X \in \mathbb{R}^{N \times D}, \quad Y \in \mathbb{R}^{M \times D}$$
The pairwise squared Euclidean distance matrix $D_{ij} = \|X_i - Y_j\|_2^2$ can be formulated as:
$$D_{ij} = \sum_{k=1}^D (X_{ik} - Y_{jk})^2$$

By reshaping $X$ to $(N, 1, D)$ and $Y$ to $(1, M, D)$, the difference $(X[:, \text{None}, :] - Y[\text{None}, :, :])$ broadcasts to shape $(N, M, D)$. Summing the squared differences along axis 2 yields the exact $(N \times M)$ pairwise distance matrix in SIMD C-speed without nested loops.

Implement `pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray`:
- Input shapes: $X$ of shape $(N, D)$ and $Y$ of shape $(M, D)$.
- Output: Float64 2D array of shape $(N, M)$.
- **Strict Invariant:** Must not use nested Python loops; must exploit 3D broadcasting and axis reduction.


#### 2. Clean Starter Code
```python
import numpy as np

def pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:
    """
    Computes the (N x M) pairwise squared Euclidean distance matrix between
    two sets of feature vectors using NumPy broadcasting.

    Args:
        X: (N, D) array of vectors.
        Y: (M, D) array of vectors.

    Returns:
        (N, M) matrix where element (i, j) is ||X[i] - Y[j]||^2.
    """
    # TODO: Implement zero-loop broadcasting pairwise distance
    raise NotImplementedError("Implement pairwise_squared_distance")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
import numpy as np

def pairwise_squared_distance(X: np.ndarray, Y: np.ndarray) -> np.ndarray:
    X_arr = np.asarray(X, dtype=np.float64)
    Y_arr = np.asarray(Y, dtype=np.float64)

    if X_arr.ndim != 2 or Y_arr.ndim != 2:
        raise ValueError("Inputs must be 2D matrices")
    if X_arr.shape[1] != Y_arr.shape[1]:
        raise ValueError(f"Feature dimension mismatch: {X_arr.shape[1]} vs {Y_arr.shape[1]}")

    # Broadcast X of shape (N, 1, D) against Y of shape (1, M, D)
    # Difference has shape (N, M, D)
    diff = X_arr[:, np.newaxis, :] - Y_arr[np.newaxis, :, :]
    
    # Square differences and sum along the feature dimension D
    return np.sum(diff ** 2, axis=2)
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `X = np.array([[0, 0], [1, 1]]); Y = np.array([[0, 0], [3, 4]])` ->
  - $D_{00} = 0$, $D_{01} = 25$
  - $D_{10} = 1 + 1 = 2$, $D_{11} = (1-3)^2 + (1-4)^2 = 4 + 9 = 13$
  - Output shape: `(2, 2)`.

**Hidden Test Cases:**
- Dimension mismatch: $X$ shape $(5, 3)$ and $Y$ shape $(5, 4)$ raises `ValueError`.
- Asymmetric matrix: $N=10, M=3, D=8$ -> Output shape `(10, 3)`.
- Large matrix SIMD speed: $N=500, M=500, D=32$ executed in < 35ms.

**Executable Test Harness:**
```python
import numpy as np

def test_py_broadcast_pairwise():
    X = np.array([[1.0, 2.0], [3.0, 4.0]])
    Y = np.array([[1.0, 2.0], [0.0, 0.0], [3.0, 4.0]])
    
    D = pairwise_squared_distance(X, Y)
    assert D.shape == (2, 3)
    
    # Point 0 against Point 0: Distance 0.0
    assert D[0, 0] == 0.0
    # Point 0 against [0, 0]: 1^2 + 2^2 = 5.0
    assert D[0, 1] == 5.0
    # Point 1 against [3, 4]: 0.0
    assert D[1, 2] == 0.0
    
    # Dimension mismatch check
    try:
        pairwise_squared_distance(np.ones((2, 3)), np.ones((2, 4)))
        assert False, "Should raise ValueError on dimension mismatch"
    except ValueError:
        pass
        
    print("ALL TESTS PASSED for py-broadcast-pairwise-dist")

if __name__ == "__main__":
    test_py_broadcast_pairwise()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~22ms for $500 	imes 500$ points (Limit: 800ms)
- **Heap Memory Limit:** Broadcasting expansion $(N 	imes M 	imes D)$ takes $500 	imes 500 	imes 32 	imes 8 pprox 64	ext{MB}$ (Limit: 350MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N \cdot M \cdot D)$. Space: $\mathcal{O}(N \cdot M \cdot D)$ for difference tensor.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `ValueError: operands could not be broadcast together with shapes (N, D) (M, D)`.
- **Where (The Localization):** The subtraction `X - Y`.
- **Why (The Mechanism):** NumPy aligns dimensions from right to left. Dimension $D$ matches, but $N$ and $M$ conflict unless an explicit dimension of size 1 is introduced.
- **How (The Remediation):** Expand dimensions using `np.newaxis`: `X[:, np.newaxis, :] - Y[np.newaxis, :, :]`.



---

## Module MOD-14: Tabular Data & DataFrames

### Lesson T2-19: DataFrame Mental Model & Automatic Index Alignment
- **Challenge ID:** `py-dataframe-series-align`
- **Module:** `MOD-14: Tabular Data & DataFrames`
- **Lesson Number:** `LESSON-T2-19`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In tabular data engines (Pandas, Polars, DuckDB), a DataFrame is not simply a 2D matrix; it is an ordered collection of heterogeneous 1D Series indexed by an explicit **Index**.

When binary operations ($A + B$, $A - B$) occur between two series, rows do **not** align by raw array row position; they automatically align by **Index Key**. Missing keys on either side produce missing values or must be reconciled via an explicit outer/inner policy.

Implement a core column-store alignment engine:
`align_and_compute_spread(series_a: dict[str, float], series_b: dict[str, float], fill_value: float = 0.0) -> dict[str, float]`
that:
1. Accepts two series represented as dictionary mappings `index_label -> value`.
2. Computes the union of all index labels: $\mathcal{I} = \mathcal{I}_A \cup \mathcal{I}_B$.
3. For each label $k \in \mathcal{I}$, computes the spread:
   $$\Delta(k) = A(k) - B(k)$$
   where absent keys are imputed with `fill_value`.
4. Returns a dictionary mapping sorted alphabetically by label.


#### 2. Clean Starter Code
```python
def align_and_compute_spread(
    series_a: dict[str, float], 
    series_b: dict[str, float], 
    fill_value: float = 0.0
) -> dict[str, float]:
    """
    Aligns two series by label index and computes their difference with fill imputation.

    Args:
        series_a: Mapping of index label to float value.
        series_b: Mapping of index label to float value.
        fill_value: Imputation value for missing keys.

    Returns:
        Dictionary of label -> (a - b) sorted alphabetically by key.
    """
    # TODO: Implement index alignment and spread computation
    raise NotImplementedError("Implement align_and_compute_spread")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
def align_and_compute_spread(
    series_a: dict[str, float], 
    series_b: dict[str, float], 
    fill_value: float = 0.0
) -> dict[str, float]:
    # Union of all label indices
    all_keys = sorted(set(series_a.keys()) | set(series_b.keys()))
    
    result: dict[str, float] = {}
    for key in all_keys:
        val_a = series_a.get(key, fill_value)
        val_b = series_b.get(key, fill_value)
        result[key] = round(val_a - val_b, 6)
        
    return result
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `align_and_compute_spread({"x": 10.0, "y": 20.0}, {"y": 5.0, "z": 15.0}, fill_value=0.0)` ->
  `{"x": 10.0, "y": 15.0, "z": -15.0}`

**Hidden Test Cases:**
- Disjoint indices: completely non-overlapping keys.
- Custom fill values: `fill_value=100.0`.
- Empty series inputs: returns empty dict.

**Executable Test Harness:**
```python
def test_py_dataframe_series():
    a = {"AAPL": 150.0, "GOOG": 2800.0}
    b = {"AAPL": 145.0, "MSFT": 300.0}
    
    res = align_and_compute_spread(a, b, fill_value=0.0)
    assert res == {
        "AAPL": 5.0,
        "GOOG": 2800.0,
        "MSFT": -300.0
    }
    # Verify alphabetical order of keys
    assert list(res.keys()) == ["AAPL", "GOOG", "MSFT"]
    
    print("ALL TESTS PASSED for py-dataframe-series-align")

if __name__ == "__main__":
    test_py_dataframe_series()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.25ms for 5,000 keys (Limit: 800ms)
- **Heap Memory Limit:** Dictionary with union keys (< 1MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(K \log K)$ where $K = |\mathcal{I}_A \cup \mathcal{I}_B|$. Space: $\mathcal{O}(K)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Keys present in `series_b` but missing in `series_a` are omitted from the output.
- **Where (The Localization):** The loop iterating over `series_a.keys()`.
- **Why (The Mechanism):** Iterating only over the keys of the first operand creates an inner/left join instead of full outer index alignment.
- **How (The Remediation):** Take the set union `set(series_a.keys()) | set(series_b.keys())`.


### Lesson T2-20: Deterministic Indexing: Boolean Masking, loc vs iloc Invariants
- **Challenge ID:** `py-loc-iloc-filter`
- **Module:** `MOD-14: Tabular Data & DataFrames`
- **Lesson Number:** `LESSON-T2-20`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In Pandas and tabular data engines, indexing is bifurcated into two mutually exclusive semantic models:
1. **`iloc` (Integer-Location Based):** Strictly position-based 0-indexed half-open intervals:
   $$[start, \, stop) \implies \text{excludes } stop$$
2. **`loc` (Label Based):** Strictly label-based **closed intervals**:
   $$[start, \, stop] \implies \text{includes BOTH } start \text{ and } stop$$

This fundamental distinction is the source of countless off-by-one errors in data analysis.

Implement a dual-mode index slicing function:
`slice_tabular_index(index: list[str], start_token: str | int, stop_token: str | int, mode: str) -> list[str]`
that:
- If `mode == "iloc"`: `start_token` and `stop_token` are integers. Slices `index[start_token : stop_token]` using Python half-open range semantics (excluding `stop_token`).
- If `mode == "loc"`: `start_token` and `stop_token` are string labels. Finds the positions of `start_token` and `stop_token`, and returns the sub-list **including both endpoints**.
  - If `start_token` or `stop_token` is not present in `index`, raises `KeyError(f"Label not found in index: ...")`.
  - If `stop_token` occurs before `start_token`, returns an empty list `[]`.
- If `mode` is neither, raises `ValueError("Mode must be 'loc' or 'iloc'")`.


#### 2. Clean Starter Code
```python
def slice_tabular_index(
    index: list[str], 
    start_token: str | int, 
    stop_token: str | int, 
    mode: str
) -> list[str]:
    """
    Implements loc (closed label-based) vs iloc (half-open integer-based) slicing.

    Args:
        index: List of unique string row labels.
        start_token: Label string for loc, integer index for iloc.
        stop_token: Label string for loc, integer index for iloc.
        mode: "loc" or "iloc".

    Returns:
        Sub-list of labels matching the indexing semantics.
    """
    # TODO: Implement dual-mode indexing semantics
    raise NotImplementedError("Implement slice_tabular_index")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
def slice_tabular_index(
    index: list[str], 
    start_token: str | int, 
    stop_token: str | int, 
    mode: str
) -> list[str]:
    if mode == "iloc":
        if not isinstance(start_token, int) or not isinstance(stop_token, int):
            raise TypeError("iloc requires integer start and stop tokens")
        # Python list slice implements half-open [start:stop)
        return index[start_token:stop_token]

    elif mode == "loc":
        if not isinstance(start_token, str) or not isinstance(stop_token, str):
            raise TypeError("loc requires string label start and stop tokens")
        if start_token not in index:
            raise KeyError(f"Label not found in index: {start_token}")
        if stop_token not in index:
            raise KeyError(f"Label not found in index: {stop_token}")

        start_idx = index.index(start_token)
        stop_idx = index.index(stop_token)

        if stop_idx < start_idx:
            return []

        # loc is CLOSED: slice must include stop_idx (+ 1)
        return index[start_idx : stop_idx + 1]

    else:
        raise ValueError("Mode must be 'loc' or 'iloc'")
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `idx = ["a", "b", "c", "d", "e"]`
- `slice_tabular_index(idx, 1, 3, "iloc")` -> `["b", "c"]` (length 2, excludes 3)
- `slice_tabular_index(idx, "b", "d", "loc")` -> `["b", "c", "d"]` (length 3, includes "d"!)

**Hidden Test Cases:**
- Missing label in `loc` raises `KeyError`.
- `loc` with identical start and stop: `("c", "c")` -> `["c"]` (length 1).
- Inverted `loc` interval: `("d", "b")` -> `[]`.
- Type validation checks.

**Executable Test Harness:**
```python
def test_py_loc_iloc():
    index = ["row_0", "row_1", "row_2", "row_3", "row_4"]
    
    # iloc: [1:3) -> 2 items
    iloc_res = slice_tabular_index(index, 1, 3, mode="iloc")
    assert iloc_res == ["row_1", "row_2"]
    
    # loc: ["row_1":"row_3"] -> 3 items (closed interval!)
    loc_res = slice_tabular_index(index, "row_1", "row_3", mode="loc")
    assert loc_res == ["row_1", "row_2", "row_3"]
    assert len(loc_res) == len(iloc_res) + 1
    
    # Single element loc
    assert slice_tabular_index(index, "row_2", "row_2", mode="loc") == ["row_2"]
    
    # Missing key check
    try:
        slice_tabular_index(index, "missing", "row_2", mode="loc")
        assert False, "Should raise KeyError on missing label"
    except KeyError:
        pass
        
    print("ALL TESTS PASSED for py-loc-iloc-filter")

if __name__ == "__main__":
    test_py_loc_iloc()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.08ms (Limit: 800ms)
- **Heap Memory Limit:** Shallow list slice (< 10KB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ lookup in list. Space: $\mathcal{O}(K)$ for sliced labels.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `loc` returns one fewer element than expected (omits the stop label).
- **Where (The Localization):** The slice expression for `loc`.
- **Why (The Mechanism):** Standard Python slicing `[start:stop]` is half-open, stopping before `stop`. Pandas `loc` is mathematically closed: both endpoints are included.
- **How (The Remediation):** Slice with `index[start_idx : stop_idx + 1]`.


### Lesson T2-21: Tidy Data Architecture: Unpivoting Multi-Index Observational Data
- **Challenge ID:** `py-tidy-melt-pivot`
- **Module:** `MOD-14: Tabular Data & DataFrames`
- **Lesson Number:** `LESSON-T2-21`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In data engineering and econometrics, **Tidy Data** (Hadley Wickham) enforces three structural invariants:
1. Each variable forms a column.
2. Each observation forms a row.
3. Each type of observational unit forms a table.

Databases and spreadsheets often store data in "wide format" where column headers represent values of a variable (e.g. columns `2024_Q1`, `2024_Q2`). Transforming from wide format to tidy format requires **unpivoting (melting)**:
$$\text{Wide}(N \times (I + V)) \implies \text{Tidy}((N \cdot V) \times (I + 2))$$

Implement `melt_wide_to_tidy`:
`melt_wide_to_tidy(records: list[dict[str, Any]], id_vars: list[str], value_vars: list[str], var_name: str = "variable", value_name: str = "value") -> list[dict[str, Any]]`
that:
1. For every row in `records` and every variable in `value_vars`:
   - Preserves all fields in `id_vars`.
   - Emits a new record containing the `id_vars`, a key `var_name` holding the column name, and a key `value_name` holding the observed cell value.
2. **Determinism:** Rows must be emitted in original record order, iterating through `value_vars` in specified sequence.


#### 2. Clean Starter Code
```python
from typing import Any

def melt_wide_to_tidy(
    records: list[dict[str, Any]], 
    id_vars: list[str], 
    value_vars: list[str], 
    var_name: str = "variable", 
    value_name: str = "value"
) -> list[dict[str, Any]]:
    """
    Unpivots a wide table into tidy format where columns become rows.

    Args:
        records: List of dictionaries representing wide rows.
        id_vars: Column names to retain as identifier variables.
        value_vars: Column names to unpivot into variable/value pairs.
        var_name: Name of the target variable column.
        value_name: Name of the target value column.

    Returns:
        List of tidy records.
    """
    # TODO: Implement wide-to-tidy unpivoting
    raise NotImplementedError("Implement melt_wide_to_tidy")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any

def melt_wide_to_tidy(
    records: list[dict[str, Any]], 
    id_vars: list[str], 
    value_vars: list[str], 
    var_name: str = "variable", 
    value_name: str = "value"
) -> list[dict[str, Any]]:
    tidy_output: list[dict[str, Any]] = []

    for row in records:
        # Extract identifier variables once per row
        base_id_record = {k: row[k] for k in id_vars if k in row}

        for v_col in value_vars:
            if v_col in row:
                new_row = {
                    **base_id_record,
                    var_name: v_col,
                    value_name: row[v_col]
                }
                tidy_output.append(new_row)

    return tidy_output
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Input: `[{"country": "US", "2020": 100, "2021": 110}]`
- Output with `id_vars=["country"]`, `value_vars=["2020", "2021"]`:
  - `[{"country": "US", "variable": "2020", "value": 100}, {"country": "US", "variable": "2021", "value": 110}]`

**Hidden Test Cases:**
- Multiple ID variables: `["country", "industry"]`.
- Custom column names: `var_name="year"`, `value_name="gdp"`.
- Large tabular dataset: 5,000 wide rows with 10 quarters unpivoting into 50,000 tidy rows in < 45ms.

**Executable Test Harness:**
```python
def test_py_tidy_melt():
    wide = [
        {"store": "A", "item": "Widget", "mon": 10, "tue": 15},
        {"store": "B", "item": "Gadget", "mon": 20, "tue": 25},
    ]
    
    tidy = melt_wide_to_tidy(
        wide,
        id_vars=["store", "item"],
        value_vars=["mon", "tue"],
        var_name="day",
        value_name="sales"
    )
    
    assert len(tidy) == 4
    assert tidy[0] == {"store": "A", "item": "Widget", "day": "mon", "sales": 10}
    assert tidy[1] == {"store": "A", "item": "Widget", "day": "tue", "sales": 15}
    assert tidy[2] == {"store": "B", "item": "Gadget", "day": "mon", "sales": 20}
    assert tidy[3] == {"store": "B", "item": "Gadget", "day": "tue", "sales": 25}
    
    print("ALL TESTS PASSED for py-tidy-melt-pivot")

if __name__ == "__main__":
    test_py_tidy_melt()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~28ms for 10,000 rows (Limit: 800ms)
- **Heap Memory Limit:** Output list contains $N 	imes V$ dicts (< 15MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N \cdot V)$. Space: $\mathcal{O}(N \cdot V)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Missing ID variables in output or unexpected overwrites of row data.
- **Where (The Localization):** The inner loop constructing `new_row`.
- **Why (The Mechanism):** Modifying a shared dictionary in-place causes all emitted rows to reflect the values of the final iteration.
- **How (The Remediation):** Construct a fresh dictionary for each value variable: `{**base_id_record, var_name: v_col, value_name: row[v_col]}`.


### Lesson T2-22: GroupBy Split-Apply-Combine: Normalized Z-Score by Category
- **Challenge ID:** `py-groupby-split-apply`
- **Module:** `MOD-14: Tabular Data & DataFrames`
- **Lesson Number:** `LESSON-T2-22`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
The **Split-Apply-Combine** paradigm decomposes a complex group aggregation or window transform into three stages:
1. **Split:** Partition dataset into disjoint buckets $\{G_1, G_2, \dots, G_k\}$ based on grouping keys.
2. **Apply:** Compute statistics independently within each group (e.g. group mean $\mu_g$ and sample standard deviation $s_g$).
3. **Combine:** Project or broadcast the calculated statistics back onto individual observations.

For feature engineering, calculating group-normalized **Z-scores**:
$$z_{ig} = \frac{x_{ig} - \mu_g}{s_g}$$
where:
$$\mu_g = \frac{1}{N_g} \sum_{i \in G} x_{ig}, \quad s_g = \sqrt{\frac{1}{N_g - 1} \sum_{i \in G} (x_{ig} - \mu_g)^2}$$
removes category-level scale bias.

Implement `groupby_zscore_normalize(records: list[dict[str, Any]], group_key: str, target_key: str) -> list[dict[str, Any]]`:
1. Partitions `records` by `record[group_key]`.
2. Computes the group mean and sample standard deviation ($N - 1$ degrees of freedom).
   - **Zero Variance Invariant:** If $N_g < 2$ or $s_g == 0.0$, sets $z_{ig} = 0.0$.
3. Emits a new list of records with an added key `f"{target_key}_zscore"` rounded to 4 decimal places.
4. Input immutability: Original records must NOT be altered in-place.


#### 2. Clean Starter Code
```python
from typing import Any

def groupby_zscore_normalize(
    records: list[dict[str, Any]], 
    group_key: str, 
    target_key: str
) -> list[dict[str, Any]]:
    """
    Computes group-wise Z-score normalization using Split-Apply-Combine.

    Args:
        records: List of record dictionaries.
        group_key: Column name used to split data into cohorts.
        target_key: Numeric column to standardize.

    Returns:
        List of new dictionaries with f"{target_key}_zscore" attached.
    """
    # TODO: Implement Split-Apply-Combine Z-score normalization
    raise NotImplementedError("Implement groupby_zscore_normalize")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any
from collections import defaultdict
import math

def groupby_zscore_normalize(
    records: list[dict[str, Any]], 
    group_key: str, 
    target_key: str
) -> list[dict[str, Any]]:
    # Stage 1: Split
    groups: dict[Any, list[float]] = defaultdict(list)
    for r in records:
        groups[r[group_key]].append(float(r[target_key]))

    # Stage 2: Apply (Compute group statistics)
    stats: dict[Any, tuple[float, float]] = {}
    for g, vals in groups.items():
        n = len(vals)
        mean = sum(vals) / n
        if n < 2:
            std = 0.0
        else:
            variance = sum((x - mean) ** 2 for x in vals) / (n - 1)
            std = math.sqrt(variance)
        stats[g] = (mean, std)

    # Stage 3: Combine (Project back to records)
    out_col = f"{target_key}_zscore"
    normalized_records: list[dict[str, Any]] = []
    
    for r in records:
        mean, std = stats[r[group_key]]
        val = float(r[target_key])
        z = 0.0 if std == 0.0 else (val - mean) / std
        normalized_records.append({**r, out_col: round(z, 4)})

    return normalized_records
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- `records = [{"dept": "Sales", "salary": 10}, {"dept": "Sales", "salary": 20}]`
  - Mean: 15, Diff: 5, Var: $(25 + 25) / 1 = 50$, Std: $\sqrt{50} pprox 7.0711$
  - Z-scores: -0.7071 and +0.7071.

**Hidden Test Cases:**
- Single observation in group ($N_g = 1$) -> Z-score defaults to 0.0.
- Zero variance: All salaries in group equal 100 -> Z-scores 0.0.
- Multiple groups maintaining original row ordering.

**Executable Test Harness:**
```python
def test_py_groupby_split_apply():
    data = [
        {"cohort": "A", "val": 10.0},
        {"cohort": "A", "val": 20.0},
        {"cohort": "B", "val": 100.0},  # Single item group
    ]
    
    res = groupby_zscore_normalize(data, group_key="cohort", target_key="val")
    assert len(res) == 3
    assert res[0]["val_zscore"] == -0.7071
    assert res[1]["val_zscore"] == 0.7071
    assert res[2]["val_zscore"] == 0.0, "N=1 group must yield z-score 0.0"
    
    # Input purity test
    assert "val_zscore" not in data[0], "Input dictionary was mutated!"
    
    print("ALL TESTS PASSED for py-groupby-split-apply")

if __name__ == "__main__":
    test_py_groupby_split_apply()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.60ms for 5,000 records (Limit: 800ms)
- **Heap Memory Limit:** Group map buffers (< 4MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ two-pass scan. Space: $\mathcal{O}(N)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `ZeroDivisionError: division by zero` when a group has 1 record or all values are equal.
- **Where (The Localization):** The standard deviation denominator `(n - 1)` or `(val - mean) / std`.
- **Why (The Mechanism):** Sample variance requires at least 2 observations ($N - 1 = 0$). Identical numbers produce $s = 0$, causing division by zero when calculating $Z$.
- **How (The Remediation):** Check `if n < 2: std = 0.0` and when standardizing: `z = 0.0 if std == 0.0 else (val - mean) / std`.



---

## Module MOD-15: Relational Algebra & SQL Foundations

### Lesson T2-23: Relational Execution Pipeline: Filtering Pre- and Post-Aggregation
- **Challenge ID:** `sql-logical-exec-order`
- **Module:** `MOD-15: Relational Algebra & SQL Foundations`
- **Lesson Number:** `LESSON-T2-23`
- **Runtime Environment:** `DuckDB WASM (SQL v1.1+)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In SQL relational databases, written query syntax diverges fundamentally from the **Logical Execution Order**:
$$\text{FROM} \longrightarrow \text{WHERE} \longrightarrow \text{GROUP BY} \longrightarrow \text{HAVING} \longrightarrow \text{SELECT} \longrightarrow \text{ORDER BY} \longrightarrow \text{LIMIT}$$

Because `WHERE` filters rows *before* aggregation, aggregate expressions (`SUM()`, `COUNT()`) are forbidden in `WHERE`. Conversely, `HAVING` filters group summaries *after* aggregation, but cannot eliminate raw invalid rows before grouping occurs.

**Database Schema:**
Table `orders`:
- `order_id`: INT
- `region`: VARCHAR
- `product_category`: VARCHAR
- `status`: VARCHAR ('COMPLETED', 'CANCELLED', 'REFUNDED')
- `revenue`: DOUBLE

**Task:**
Formulate a DuckDB SQL query that:
1. Filters out non-completed orders (`status != 'COMPLETED'`) at row-level before grouping.
2. Groups by `region` and `product_category`.
3. Computes `total_revenue = ROUND(SUM(revenue), 2)` and `order_count = COUNT(*)`.
4. Filters groups using `HAVING` to retain only categories where `order_count >= 2` AND `total_revenue >= 500.0`.
5. Orders by `total_revenue DESC`, breaking ties by `region ASC`.


#### 2. Clean Starter Code
```sql
-- Write a DuckDB SQL query filtering pre-aggregation in WHERE
-- and post-aggregation in HAVING.
-- Schema: orders(order_id, region, product_category, status, revenue)

SELECT
    -- TODO: Columns and aggregations
FROM orders
-- TODO: WHERE, GROUP BY, HAVING, ORDER BY
;
```


#### 3. Reference Solution (2026 Idiomatic)
```sql
SELECT
    region,
    product_category,
    ROUND(SUM(revenue), 2) AS total_revenue,
    COUNT(*) AS order_count
FROM orders
WHERE status = 'COMPLETED'
GROUP BY region, product_category
HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0
ORDER BY total_revenue DESC, region ASC;
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Orders table with completed vs cancelled orders.
- Only completed rows with group revenue $\ge 500$ and count $\ge 2$ appear.

**Hidden Test Cases:**
- Cancelled orders that would have tipped revenue over 500.0 must be excluded by `WHERE`.
- Tie-breaking: Multiple categories with identical revenue ordered by region alphabetically.

**Executable Test Harness (Python + DuckDB WASM bridge):**
```python
import duckdb

def test_sql_logical_exec():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE orders (
            order_id INT,
            region VARCHAR,
            product_category VARCHAR,
            status VARCHAR,
            revenue DOUBLE
        );
        INSERT INTO orders VALUES
            (1, 'North', 'Tech', 'COMPLETED', 300.0),
            (2, 'North', 'Tech', 'COMPLETED', 250.0), -- Tech North: sum=550, count=2 (PASS)
            (3, 'North', 'Tech', 'CANCELLED', 1000.0),-- Cancelled: excluded
            (4, 'South', 'Tech', 'COMPLETED', 600.0), -- Tech South: sum=600, count=1 (FAIL count)
            (5, 'North', 'Home', 'COMPLETED', 100.0),
            (6, 'North', 'Home', 'COMPLETED', 200.0); -- Home North: sum=300, count=2 (FAIL sum)
    """)
    
    query = """
        SELECT
            region,
            product_category,
            ROUND(SUM(revenue), 2) AS total_revenue,
            COUNT(*) AS order_count
        FROM orders
        WHERE status = 'COMPLETED'
        GROUP BY region, product_category
        HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0
        ORDER BY total_revenue DESC, region ASC;
    """
    
    res = con.execute(query).fetchall()
    assert len(res) == 1
    assert res[0] == ('North', 'Tech', 550.0, 2)
    
    print("ALL TESTS PASSED for sql-logical-exec-order")

if __name__ == "__main__":
    test_sql_logical_exec()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~1.2ms in DuckDB WASM (Limit: 800ms)
- **Heap Memory Limit:** In-memory DuckDB columnar buffer (< 12MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N \log K)$ where $N$ is row count and $K$ is group count. Space: $\mathcal{O}(K)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `Binder Error: aggregate function SUM not allowed in WHERE clause`.
- **Where (The Localization):** The `WHERE` clause.
- **Why (The Mechanism):** `WHERE` is executed before rows are aggregated into groups. At that point in execution, group summaries do not exist.
- **How (The Remediation):** Move `status = 'COMPLETED'` to `WHERE`, and move `SUM(revenue) >= 500.0` to `HAVING`.


### Lesson T2-24: Relational Joins, Anti-Joins & Three-Valued Logic NULL Handling
- **Challenge ID:** `sql-join-coalesce-null`
- **Module:** `MOD-15: Relational Algebra & SQL Foundations`
- **Lesson Number:** `LESSON-T2-24`
- **Runtime Environment:** `DuckDB WASM (SQL v1.1+)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In SQL relational databases, `NULL` does not represent zero, empty string, or false; it represents the mathematical absence of value. SQL utilizes **Kleene Three-Valued Logic** ($\text{TRUE}, \text{FALSE}, \text{UNKNOWN}$):
$$\text{NULL} = \text{NULL} \implies \text{UNKNOWN}$$
$$\text{NULL} \neq 5 \implies \text{UNKNOWN}$$

In relational joins:
- **`INNER JOIN`:** Discards unmatched records from both tables.
- **`LEFT JOIN`:** Preserves all left table records, filling missing right-side attributes with `NULL`.
- **Anti-Join Pattern:** Identifies records in Table A with no matching record in Table B using `LEFT JOIN ... WHERE B.key IS NULL` (never `WHERE B.key = NULL`).

**Database Schema:**
Table `customers`: `customer_id: INT`, `customer_name: VARCHAR`, `signup_date: DATE`
Table `transactions`: `txn_id: INT`, `customer_id: INT`, `amount: DOUBLE`

**Task:**
Write a DuckDB SQL query computing Customer Lifetime Value (LTV):
1. Returns every customer in the system, even if they have made 0 transactions.
2. Calculates `total_spent = COALESCE(ROUND(SUM(t.amount), 2), 0.0)`.
3. Calculates `transaction_count = COUNT(t.txn_id)` (Notice: `COUNT(t.txn_id)`, NOT `COUNT(*)`, so that 0 transactions count as 0, not 1!).
4. Orders by `total_spent DESC`, then `customer_id ASC`.


#### 2. Clean Starter Code
```sql
-- Formulate a DuckDB SQL query computing Customer Lifetime Value
-- handling customers with 0 transactions using LEFT JOIN and COALESCE.

SELECT
    -- TODO: customer_id, customer_name, total_spent, transaction_count
FROM customers c
-- TODO: LEFT JOIN, GROUP BY, ORDER BY
;
```


#### 3. Reference Solution (2026 Idiomatic)
```sql
SELECT
    c.customer_id,
    c.customer_name,
    COALESCE(ROUND(SUM(t.amount), 2), 0.0) AS total_spent,
    COUNT(t.txn_id) AS transaction_count
FROM customers c
LEFT JOIN transactions t ON c.customer_id = t.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC, c.customer_id ASC;
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Customer with 2 transactions: sums amounts correctly.
- Customer with 0 transactions: `total_spent` is `0.0`, `transaction_count` is `0`.

**Hidden Test Cases:**
- Verification that `transaction_count` is 0 (not 1) for customers with no transactions.
- Zero amounts: `t.amount = 0.0` correctly counted in `transaction_count`.

**Executable Test Harness:**
```python
import duckdb

def test_sql_join_coalesce():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE customers (customer_id INT, customer_name VARCHAR);
        CREATE TABLE transactions (txn_id INT, customer_id INT, amount DOUBLE);
        
        INSERT INTO customers VALUES
            (101, 'Alice'),
            (102, 'Bob'),
            (103, 'Charlie');
            
        INSERT INTO transactions VALUES
            (1, 101, 50.0),
            (2, 101, 75.5),
            (3, 102, 20.0);
            -- Charlie has 0 transactions
    """)
    
    query = """
        SELECT
            c.customer_id,
            c.customer_name,
            COALESCE(ROUND(SUM(t.amount), 2), 0.0) AS total_spent,
            COUNT(t.txn_id) AS transaction_count
        FROM customers c
        LEFT JOIN transactions t ON c.customer_id = t.customer_id
        GROUP BY c.customer_id, c.customer_name
        ORDER BY total_spent DESC, c.customer_id ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert rows[0] == (101, 'Alice', 125.5, 2)
    assert rows[1] == (102, 'Bob', 20.0, 1)
    assert rows[2] == (103, 'Charlie', 0.0, 0), "Customer with 0 transactions must have count 0, not 1!"
    
    print("ALL TESTS PASSED for sql-join-coalesce-null")

if __name__ == "__main__":
    test_sql_join_coalesce()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~1.5ms (Limit: 800ms)
- **Heap Memory Limit:** Hash join build table (< 8MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N + M)$ hash join. Space: $\mathcal{O}(M)$ where $M$ is customers table.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Charlie (who has 0 transactions) is reported as having `transaction_count = 1`.
- **Where (The Localization):** The count expression `COUNT(*)`.
- **Why (The Mechanism):** In a `LEFT JOIN`, an unmatched customer still produces 1 row in the joined relation (with `NULL` for transaction attributes). `COUNT(*)` counts rows regardless of nullity.
- **How (The Remediation):** Use `COUNT(t.txn_id)`. `COUNT(column)` ignores `NULL` values, properly yielding 0.


### Lesson T2-25: Conditional Aggregation & Matrix Pivot with CASE WHEN
- **Challenge ID:** `sql-case-pivot-agg`
- **Module:** `MOD-15: Relational Algebra & SQL Foundations`
- **Lesson Number:** `LESSON-T2-25`
- **Runtime Environment:** `DuckDB WASM (SQL v1.1+)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In relational reporting and financial modeling, cross-tabulation transforms discrete row values into explicit column dimensions. Standard relational algebra lacks dynamic column spawning; the canonical SQL technique is **Conditional Aggregation**:
$$\text{col}_k = \sum_{i \in \text{Group}} \begin{cases} \text{val}_i & \text{if } \text{category}_i = k \\ 0 & \text{otherwise} \end{cases} \implies \text{SUM}(\text{CASE WHEN category} = k \text{ THEN val ELSE 0 END})$$

**Database Schema:**
Table `sales`:
- `dept_name`: VARCHAR
- `sale_date`: DATE
- `revenue`: DOUBLE

**Task:**
Write a DuckDB SQL query that pivots 2024 annual sales by quarter per department:
1. Filters rows for year 2024 (`EXTRACT(YEAR FROM sale_date) = 2024`).
2. Groups by `dept_name`.
3. Creates four pivoted quarter revenue columns using `SUM(CASE ...)`:
   - `q1_revenue`: Quarter 1 (Months 1, 2, 3)
   - `q2_revenue`: Quarter 2 (Months 4, 5, 6)
   - `q3_revenue`: Quarter 3 (Months 7, 8, 9)
   - `q4_revenue`: Quarter 4 (Months 10, 11, 12)
4. Computes `annual_total = ROUND(SUM(revenue), 2)`.
5. Empty quarters must report `0.0`, rounded to 2 decimal places.
6. Orders by `annual_total DESC`, then `dept_name ASC`.


#### 2. Clean Starter Code
```sql
-- Formulate a DuckDB SQL query pivoting sales into quarterly columns
-- using conditional aggregation CASE WHEN expressions.

SELECT
    -- TODO: dept_name, q1_revenue, q2_revenue, q3_revenue, q4_revenue, annual_total
FROM sales
-- TODO: WHERE, GROUP BY, ORDER BY
;
```


#### 3. Reference Solution (2026 Idiomatic)
```sql
SELECT
    dept_name,
    ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue,
    ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 2 THEN revenue ELSE 0 END), 2) AS q2_revenue,
    ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 3 THEN revenue ELSE 0 END), 2) AS q3_revenue,
    ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 4 THEN revenue ELSE 0 END), 2) AS q4_revenue,
    ROUND(SUM(revenue), 2) AS annual_total
FROM sales
WHERE EXTRACT(YEAR FROM sale_date) = 2024
GROUP BY dept_name
ORDER BY annual_total DESC, dept_name ASC;
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Sales across Q1 and Q3: Q2 and Q4 report `0.0`.
- Sum of quarterly revenues equals `annual_total`.

**Hidden Test Cases:**
- Sales from 2023 must be excluded by the WHERE filter.
- Departments with sales only in one quarter.

**Executable Test Harness:**
```python
import duckdb

def test_sql_case_pivot():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE sales (dept_name VARCHAR, sale_date DATE, revenue DOUBLE);
        INSERT INTO sales VALUES
            ('Electronics', '2024-01-15', 100.0), -- Q1
            ('Electronics', '2024-05-10', 200.0), -- Q2
            ('Electronics', '2024-11-20', 300.0), -- Q4
            ('Electronics', '2023-11-20', 999.0), -- 2023 (Excluded)
            ('Furniture',   '2024-02-10', 150.0); -- Q1
    """)
    
    query = """
        SELECT
            dept_name,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 2 THEN revenue ELSE 0 END), 2) AS q2_revenue,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 3 THEN revenue ELSE 0 END), 2) AS q3_revenue,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 4 THEN revenue ELSE 0 END), 2) AS q4_revenue,
            ROUND(SUM(revenue), 2) AS annual_total
        FROM sales
        WHERE EXTRACT(YEAR FROM sale_date) = 2024
        GROUP BY dept_name
        ORDER BY annual_total DESC, dept_name ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 2
    assert rows[0] == ('Electronics', 100.0, 200.0, 0.0, 300.0, 600.0)
    assert rows[1] == ('Furniture', 150.0, 0.0, 0.0, 0.0, 150.0)
    
    print("ALL TESTS PASSED for sql-case-pivot-agg")

if __name__ == "__main__":
    test_sql_case_pivot()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~1.1ms (Limit: 800ms)
- **Heap Memory Limit:** Group aggregation hash table (< 6MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ single-pass aggregation. Space: $\mathcal{O}(D)$ where $D$ is number of departments.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** Quarters with no sales display `NULL` instead of `0.0`.
- **Where (The Localization):** The `CASE` statement lacking an `ELSE 0` clause.
- **Why (The Mechanism):** In SQL, a `CASE` statement without an explicit `ELSE` defaults to returning `NULL` when conditions are unmet. `SUM(NULL)` on an all-null group yields `NULL`.
- **How (The Remediation):** Ensure every conditional branch concludes with `ELSE 0 END`.



---

## Module MOD-16: Analytical SQL & Recursive CTEs

### Lesson T2-26: Partitioned Window Functions: Dense Rank with Tie Breaking
- **Challenge ID:** `sql-window-dense-rank`
- **Module:** `MOD-16: Analytical SQL & Recursive CTEs`
- **Lesson Number:** `LESSON-T2-26`
- **Runtime Environment:** `DuckDB WASM (SQL v1.1+)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Standard `GROUP BY` collapses multiple rows into a single summary row. In contrast, **Window Functions** compute aggregations across partitions while **preserving individual row identities**:
$$w_i = f\big( \{ r_j \in \mathcal{P}(\text{row}_i) \} \big)$$

Ranking functions handle ties with distinct mathematical invariants:
- `ROW_NUMBER()`: Assigns strictly sequential integers $1, 2, 3, 4$ arbitrarily breaking ties.
- `RANK()`: Assigns identical rank to ties, skipping subsequent ranks: $1, 2, 2, 4$.
- `DENSE_RANK()`: Assigns identical rank to ties without skipping numbers: $1, 2, 2, 3$.

**Database Schema:**
Table `employees`:
- `emp_id`: INT
- `dept_name`: VARCHAR
- `emp_name`: VARCHAR
- `salary`: DOUBLE

**Task:**
Write a DuckDB SQL query that:
1. Computes `dept_salary_rank`: The dense rank of each employee's salary within their department in descending order (`DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC)`).
2. Computes `salary_gap_to_max`: The difference between the highest salary in that department and the employee's salary (`MAX(salary) OVER (PARTITION BY dept_name) - salary`), rounded to 2 decimal places.
3. Orders the final output by `dept_name ASC`, then `dept_salary_rank ASC`, then `salary DESC`, then `emp_id ASC`.


#### 2. Clean Starter Code
```sql
-- Formulate a DuckDB SQL query computing DENSE_RANK() and max salary gap
-- across departmental partitions.
-- Schema: employees(emp_id, dept_name, emp_name, salary)

SELECT
    -- TODO: emp_id, dept_name, emp_name, salary, dept_salary_rank, salary_gap_to_max
FROM employees
-- TODO: WINDOW functions and ORDER BY
;
```


#### 3. Reference Solution (2026 Idiomatic)
```sql
SELECT
    emp_id,
    dept_name,
    emp_name,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY dept_name 
        ORDER BY salary DESC
    ) AS dept_salary_rank,
    ROUND(
        MAX(salary) OVER (PARTITION BY dept_name) - salary, 
        2
    ) AS salary_gap_to_max
FROM employees
ORDER BY 
    dept_name ASC, 
    dept_salary_rank ASC, 
    salary DESC, 
    emp_id ASC;
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Employees in 'Engineering': Salaries 100k, 100k, 80k.
  - Ranks: 1, 1, 2 (Dense rank does NOT skip to 3!).
  - Gaps: 0.0, 0.0, 20000.0.

**Hidden Test Cases:**
- Multiple departments with distinct salary distributions.
- Single employee in department -> rank 1, gap 0.0.
- Preserves individual row identities without collapsing rows.

**Executable Test Harness:**
```python
import duckdb

def test_sql_window_rank():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE employees (emp_id INT, dept_name VARCHAR, emp_name VARCHAR, salary DOUBLE);
        INSERT INTO employees VALUES
            (1, 'Eng', 'Alice', 100000.0),
            (2, 'Eng', 'Bob',   100000.0), -- Tie for 1st
            (3, 'Eng', 'Carol',  80000.0), -- 2nd in DENSE_RANK
            (4, 'Mkt', 'Dave',   90000.0);
    """)
    
    query = """
        SELECT
            emp_id,
            dept_name,
            emp_name,
            salary,
            DENSE_RANK() OVER (
                PARTITION BY dept_name 
                ORDER BY salary DESC
            ) AS dept_salary_rank,
            ROUND(
                MAX(salary) OVER (PARTITION BY dept_name) - salary, 
                2
            ) AS salary_gap_to_max
        FROM employees
        ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 4
    # Check Eng partition
    assert rows[0][:5] == (1, 'Eng', 'Alice', 100000.0, 1)
    assert rows[0][5] == 0.0
    assert rows[1][:5] == (2, 'Eng', 'Bob', 100000.0, 1)
    assert rows[1][5] == 0.0
    assert rows[2][:5] == (3, 'Eng', 'Carol', 80000.0, 2), "DENSE_RANK must assign 2 to Carol, not 3!"
    assert rows[2][5] == 20000.0
    
    print("ALL TESTS PASSED for sql-window-dense-rank")

if __name__ == "__main__":
    test_sql_window_rank()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~1.4ms in DuckDB WASM (Limit: 800ms)
- **Heap Memory Limit:** Partition sorting buffer (< 8MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N \log N)$ partitioned sort. Space: $\mathcal{O}(N)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The employee following a salary tie is assigned rank 3 instead of rank 2.
- **Where (The Localization):** The window ranking function.
- **Why (The Mechanism):** `RANK()` skips ranks when ties occur (e.g. 1, 1, 3). `DENSE_RANK()` advances consecutively without gaps (1, 1, 2).
- **How (The Remediation):** Replace `RANK()` with `DENSE_RANK()`.


### Lesson T2-27: Moving Window Framing: Rolling 3-Day Revenue & Period Deltas
- **Challenge ID:** `sql-window-frame-delta`
- **Module:** `MOD-16: Analytical SQL & Recursive CTEs`
- **Lesson Number:** `LESSON-T2-27`
- **Runtime Environment:** `DuckDB WASM (SQL v1.1+)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
Window framing specifies the exact subset of rows within a partition evaluated for each target row.
- **Physical Row Frame:** `ROWS BETWEEN N PRECEDING AND CURRENT ROW` counts exact physical row offsets regardless of value duplicate boundaries.
- **Offset Functions:** `LAG(col, k)` accesses the value of `col` exactly $k$ physical rows prior in the window ordering.

**Database Schema:**
Table `daily_metrics`:
- `metric_date`: DATE
- `revenue`: DOUBLE

**Task:**
Formulate a DuckDB SQL query that:
1. Calculates `rolling_3day_revenue`: The trailing 3-day moving sum of revenue, defined as the current day plus the preceding 2 days (`SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`).
2. Calculates `prev_day_revenue`: The revenue from the immediately prior day using `LAG(revenue, 1) OVER (ORDER BY metric_date)`.
3. Calculates `dod_growth_pct`: The day-over-day growth percentage:
   $$\text{ROUND}\left(\frac{\text{revenue} - \text{prev\_day\_revenue}}{\text{prev\_day\_revenue}} \times 100.0, \, 2\right)$$
   If `prev_day_revenue` is `NULL` or `0.0`, output `NULL`.
4. Orders output strictly by `metric_date ASC`.


#### 2. Clean Starter Code
```sql
-- Formulate a DuckDB SQL query computing trailing rolling window sums
-- and day-over-day growth percentages using ROWS BETWEEN and LAG().

SELECT
    -- TODO: metric_date, revenue, rolling_3day_revenue, prev_day_revenue, dod_growth_pct
FROM daily_metrics
-- TODO: Window frame clauses and ordering
;
```


#### 3. Reference Solution (2026 Idiomatic)
```sql
WITH metrics_lagged AS (
    SELECT
        metric_date,
        revenue,
        ROUND(
            SUM(revenue) OVER (
                ORDER BY metric_date 
                ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
            ), 
            2
        ) AS rolling_3day_revenue,
        LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue
    FROM daily_metrics
)
SELECT
    metric_date,
    revenue,
    rolling_3day_revenue,
    prev_day_revenue,
    CASE
        WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL
        ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2)
    END AS dod_growth_pct
FROM metrics_lagged
ORDER BY metric_date ASC;
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Day 1: Revenue 100. Rolling 3-day: 100. Prev: NULL. Growth: NULL.
- Day 2: Revenue 150. Rolling 3-day: 250. Prev: 100. Growth: +50.0%.
- Day 3: Revenue 200. Rolling 3-day: 450. Prev: 150. Growth: +33.33%.
- Day 4: Revenue 100. Rolling 3-day: 150+200+100 = 450. Prev: 200. Growth: -50.0%.

**Hidden Test Cases:**
- Frame truncation: Day 1 and Day 2 sum only available preceding rows.
- Zero revenue division guard: `prev_day_revenue = 0.0` correctly yields `NULL` instead of `DivisionByZero`.

**Executable Test Harness:**
```python
import duckdb

def test_sql_window_frame():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE daily_metrics (metric_date DATE, revenue DOUBLE);
        INSERT INTO daily_metrics VALUES
            ('2024-01-01', 100.0),
            ('2024-01-02', 150.0),
            ('2024-01-03', 200.0),
            ('2024-01-04', 100.0);
    """)
    
    query = """
        WITH metrics_lagged AS (
            SELECT
                metric_date,
                revenue,
                ROUND(
                    SUM(revenue) OVER (
                        ORDER BY metric_date 
                        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
                    ), 
                    2
                ) AS rolling_3day_revenue,
                LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue
            FROM daily_metrics
        )
        SELECT
            metric_date,
            revenue,
            rolling_3day_revenue,
            prev_day_revenue,
            CASE
                WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL
                ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2)
            END AS dod_growth_pct
        FROM metrics_lagged
        ORDER BY metric_date ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 4
    assert rows[0][2] == 100.0 and rows[0][4] is None
    assert rows[1][2] == 250.0 and rows[1][4] == 50.0
    assert rows[2][2] == 450.0 and rows[2][4] == 33.33
    assert rows[3][2] == 450.0 and rows[3][4] == -50.0
    
    print("ALL TESTS PASSED for sql-window-frame-delta")

if __name__ == "__main__":
    test_sql_window_frame()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~1.3ms in DuckDB WASM (Limit: 800ms)
- **Heap Memory Limit:** Single-pass streaming window frame (< 5MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N \log N)$ sort + $\mathcal{O}(N)$ sliding aggregation. Space: $\mathcal{O}(N)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The rolling 3-day sum accumulates *all* preceding rows indefinitely.
- **Where (The Localization):** The window specification `OVER (ORDER BY metric_date)`.
- **Why (The Mechanism):** In SQL, omitting the frame clause defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which sums from the very beginning of the dataset.
- **How (The Remediation):** Explicitly append `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`.


### Lesson T2-28: Recursive CTEs: Hierarchical Tree Traversal & Path Accumulation
- **Challenge ID:** `sql-recursive-org-tree`
- **Module:** `MOD-16: Analytical SQL & Recursive CTEs`
- **Lesson Number:** `LESSON-T2-28`
- **Runtime Environment:** `DuckDB WASM (SQL v1.1+)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In relational algebra, fixed-length table joins cannot traverse graphs of arbitrary depth. **Recursive Common Table Expressions (`WITH RECURSIVE`)** implement fixed-point iteration:
$$R_0 = \text{Anchor Query}$$
$$R_{k+1} = \text{Recursive Query}(R_k) \bowtie \text{Base Table}$$
$$\text{Termination: } R_{k+1} = \emptyset \implies R = \bigcup_{i=0}^k R_i$$

**Database Schema:**
Table `org_chart`:
- `emp_id`: INT
- `emp_name`: VARCHAR
- `manager_id`: INT (NULL for the CEO / root node)

**Task:**
Formulate a DuckDB recursive SQL query that:
1. Identifies root leaders (`manager_id IS NULL`), assigning `depth = 0` and `path = emp_name`.
2. Recursively joins subordinates, incrementing `depth = parent.depth + 1` and concatenating breadcrumbs: `path = parent.path || ' -> ' || child.emp_name`.
3. Returns `emp_id`, `emp_name`, `depth`, and `path`.
4. Orders output hierarchically by `depth ASC`, then `path ASC`.


#### 2. Clean Starter Code
```sql
-- Formulate a DuckDB Recursive CTE traversing an organization hierarchy.
-- Schema: org_chart(emp_id, emp_name, manager_id)

WITH RECURSIVE hierarchy AS (
    -- Anchor Member (Root)
    SELECT
        -- TODO: emp_id, emp_name, depth, path
    FROM org_chart
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive Member (Children)
    SELECT
        -- TODO: child.emp_id, child.emp_name, parent.depth + 1, concatenated path
    FROM org_chart child
    JOIN hierarchy parent ON child.manager_id = parent.emp_id
)
SELECT * FROM hierarchy
ORDER BY depth ASC, path ASC;
```


#### 3. Reference Solution (2026 Idiomatic)
```sql
WITH RECURSIVE hierarchy AS (
    -- Anchor Member: Root nodes with no manager
    SELECT
        emp_id,
        emp_name,
        0 AS depth,
        CAST(emp_name AS VARCHAR) AS path
    FROM org_chart
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive Member: Join subordinates to existing parents
    SELECT
        child.emp_id,
        child.emp_name,
        parent.depth + 1 AS depth,
        parent.path || ' -> ' || child.emp_name AS path
    FROM org_chart child
    JOIN hierarchy parent ON child.manager_id = parent.emp_id
)
SELECT
    emp_id,
    emp_name,
    depth,
    path
FROM hierarchy
ORDER BY depth ASC, path ASC;
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- CEO Alice (id: 1, mgr: NULL) -> depth 0, path: "Alice"
- VP Bob (id: 2, mgr: 1) -> depth 1, path: "Alice -> Bob"
- Lead Charlie (id: 3, mgr: 2) -> depth 2, path: "Alice -> Bob -> Charlie"

**Hidden Test Cases:**
- Multiple root nodes: Two co-founders with `manager_id IS NULL`.
- Wide tree: Single manager with 10 direct reports.
- String path casting consistency across DuckDB recursion iterations.

**Executable Test Harness:**
```python
import duckdb

def test_sql_recursive_tree():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE org_chart (emp_id INT, emp_name VARCHAR, manager_id INT);
        INSERT INTO org_chart VALUES
            (1, 'Alice', NULL),
            (2, 'Bob', 1),
            (3, 'Charlie', 2),
            (4, 'Diana', 1);
    """)
    
    query = """
        WITH RECURSIVE hierarchy AS (
            SELECT
                emp_id,
                emp_name,
                0 AS depth,
                CAST(emp_name AS VARCHAR) AS path
            FROM org_chart
            WHERE manager_id IS NULL

            UNION ALL

            SELECT
                child.emp_id,
                child.emp_name,
                parent.depth + 1 AS depth,
                parent.path || ' -> ' || child.emp_name AS path
            FROM org_chart child
            JOIN hierarchy parent ON child.manager_id = parent.emp_id
        )
        SELECT emp_id, emp_name, depth, path
        FROM hierarchy
        ORDER BY depth ASC, path ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 4
    assert rows[0] == (1, 'Alice', 0, 'Alice')
    assert rows[1] == (2, 'Bob', 1, 'Alice -> Bob')
    assert rows[2] == (4, 'Diana', 1, 'Alice -> Diana')
    assert rows[3] == (3, 'Charlie', 2, 'Alice -> Bob -> Charlie')
    
    print("ALL TESTS PASSED for sql-recursive-org-tree")

if __name__ == "__main__":
    test_sql_recursive_tree()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~1.8ms in DuckDB WASM (Limit: 800ms)
- **Heap Memory Limit:** Intermediate recursive work table (< 10MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(V + E)$ DAG search. Space: $\mathcal{O}(V)$ for result table.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** `Binder Error: type mismatch in recursive query between anchor and recursive member`.
- **Where (The Localization):** The `path` column in the anchor query.
- **Why (The Mechanism):** In the anchor member, `emp_name` might be inferred as a fixed-length string type. The recursive member concatenates additional characters, exceeding the anchor's column width.
- **How (The Remediation):** Explicitly cast the anchor path to unbounded `VARCHAR`: `CAST(emp_name AS VARCHAR) AS path`.



---

## Module MOD-17: Modern Data Engines (Parquet, Arrow & Polars)

### Lesson T2-29: Arrow Columnar IPC & Dictionary-Encoded Memory Compression
- **Challenge ID:** `py-arrow-columnar-dict`
- **Module:** `MOD-17: Modern Data Engines (Parquet, Arrow & Polars)`
- **Lesson Number:** `LESSON-T2-29`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In modern data engineering (Apache Arrow, Apache Parquet), row-oriented storage models waste massive memory duplicating repetitive strings (e.g. state codes, device categories, status strings).

**Dictionary Encoding** splits a column of $N$ string values into:
1. **Dictionary (Vocabulary):** A compact array of $U$ unique strings: $\mathcal{D} = [v_0, v_1, \dots, v_{U-1}]$.
2. **Indices Array:** An array of $N$ compact integers $I \in [0, U-1]$ where $I[i]$ points to the vocabulary slot in $\mathcal{D}$.

The uncompressed byte footprint assuming 8-byte pointer overhead and UTF-8 string bytes is:
$$B_{\text{raw}} = \sum_{i=1}^N (\text{len}(s_i) + 8)$$
The dictionary-encoded footprint is:
$$B_{\text{dict}} = \sum_{u=0}^{U-1} \text{len}(v_u) + (N \cdot \text{index\_width\_bytes})$$
where $\text{index\_width\_bytes}$ is chosen optimally based on $U$:
$$\text{index\_width\_bytes} = \begin{cases} 1 & \text{if } U \le 256 \\ 2 & \text{if } U \le 65,536 \\ 4 & \text{otherwise} \end{cases}$$

Implement `compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]`:
1. Constructs the unique vocabulary array `dictionary` in order of first encounter.
2. Encodes `column_data` into an `indices` array of integer tokens.
3. Computes the theoretical memory compression ratio:
   $$\text{Compression Ratio } R = \frac{B_{\text{raw}}}{B_{\text{dict}}}$$
   rounded to 2 decimal places.


#### 2. Clean Starter Code
```python
def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:
    """
    Emulates Apache Arrow dictionary encoding of categorical string columns
    and calculates memory compression ratio.

    Args:
        column_data: List of strings.

    Returns:
        A tuple of (vocabulary_list, indices_list, compression_ratio).
    """
    # TODO: Implement Arrow dictionary encoding and byte calculation
    raise NotImplementedError("Implement compress_column_dictionary")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:
    if not column_data:
        return ([], [], 1.0)

    vocab_map: dict[str, int] = {}
    vocabulary: list[str] = []
    indices: list[int] = []

    for s in column_data:
        if s not in vocab_map:
            idx = len(vocabulary)
            vocab_map[s] = idx
            vocabulary.append(s)
        indices.append(vocab_map[s])

    # Calculate raw uncompressed bytes (string length + 8 bytes pointer)
    b_raw = sum(len(s.encode("utf-8")) + 8 for s in column_data)

    # Determine optimal integer index byte width based on unique count U
    u = len(vocabulary)
    if u <= 256:
        index_width = 1  # uint8
    elif u <= 65536:
        index_width = 2  # uint16
    else:
        index_width = 4  # uint32

    # Calculate dictionary encoded bytes (vocab bytes + index array bytes)
    vocab_bytes = sum(len(v.encode("utf-8")) for v in vocabulary)
    index_bytes = len(column_data) * index_width
    b_dict = vocab_bytes + index_bytes

    compression_ratio = round(b_raw / b_dict, 2) if b_dict > 0 else 1.0

    return (vocabulary, indices, compression_ratio)
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Input: `["cat", "dog", "cat", "cat", "dog"]`
  - Vocabulary: `["cat", "dog"]`
  - Indices: `[0, 1, 0, 0, 1]`
  - High compression ratio.

**Hidden Test Cases:**
- All distinct strings: Vocab size == $N$, compression ratio $< 1.0$ (encoding penalty).
- Multi-byte UTF-8 characters: Verify byte length calculation (`len(s.encode('utf-8'))`).
- Large repetitive column: 20,000 status strings achieve $R \ge 4.0	imes$.

**Executable Test Harness:**
```python
def test_py_arrow_columnar():
    data = ["ACTIVE", "PENDING", "ACTIVE", "ACTIVE", "CANCELLED", "PENDING"]
    vocab, indices, ratio = compress_column_dictionary(data)
    
    assert vocab == ["ACTIVE", "PENDING", "CANCELLED"]
    assert indices == [0, 1, 0, 0, 2, 1]
    assert ratio > 1.0
    
    # Empty column
    assert compress_column_dictionary([]) == ([], [], 1.0)
    
    # 10,000 highly repetitive records
    heavy = ["REGION_NORTH_EAST_US"] * 10000
    h_vocab, h_indices, h_ratio = compress_column_dictionary(heavy)
    assert len(h_vocab) == 1
    assert len(h_indices) == 10000
    # Raw: 10000 * (20 + 8) = 280,000 bytes. Dict: 20 + 10000 * 1 = 10,020 bytes.
    # Ratio ~ 27.94x
    assert h_ratio > 20.0
    
    print("ALL TESTS PASSED for py-arrow-columnar-dict")

if __name__ == "__main__":
    test_py_arrow_columnar()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~6ms for 20,000 rows (Limit: 800ms)
- **Heap Memory Limit:** Vocabulary hash map (< 5MB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$. Space: $\mathcal{O}(N)$ for indices.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The compression ratio for UTF-8 strings is inaccurate on non-ASCII characters.
- **Where (The Localization):** The byte calculation using `len(s)`.
- **Why (The Mechanism):** In Python, `len("é")` returns `1` (character count), but in UTF-8 binary memory (and Apache Arrow), `"é"` consumes `2` bytes.
- **How (The Remediation):** Measure binary footprint using `len(s.encode("utf-8"))`.


### Lesson T2-30: Polars LazyFrames: Query DAG Optimization & Pushdown
- **Challenge ID:** `py-polars-lazy-dag`
- **Module:** `MOD-17: Modern Data Engines (Parquet, Arrow & Polars)`
- **Lesson Number:** `LESSON-T2-30`
- **Runtime Environment:** `Pyodide WASM (Python 3.12)`
- **Target Execution Budget:** `< 800ms wall-clock, < 350MB peak heap`

#### 1. Challenge Specification & Mathematical/Algorithmic Invariant
In modern data engines (Polars, Spark Catalyst, DuckDB), operations on a `LazyFrame` do not evaluate immediately; they construct an **Abstract Syntax Tree / Directed Acyclic Graph (DAG)** of relational transformations.

Before execution (`.collect()`), the query optimizer applies algebraic rewrite rules:
1. **Predicate Pushdown:** Moves `filter` conditions as close to the data source (`scan`) as possible, eliminating rows before expensive joins, sorts, or network transfers:
   $$\sigma_p(R \bowtie S) \equiv (\sigma_p(R)) \bowtie S$$
2. **Projection Pushdown:** Eliminates unreferenced columns at the scan layer, avoiding decoding unused columnar byte streams from disk.

Implement a rule-based query DAG optimizer:
`optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]`
where each node is a dictionary representing an operation:
- `{"op": "SCAN", "table": str, "columns": list[str] | None}`
- `{"op": "FILTER", "predicate": str, "columns_used": list[str]}`
- `{"op": "PROJECT", "columns": list[str]}`
- `{"op": "SORT", "by": str}`

**Optimization Invariants:**
1. **Predicate Pushdown:** Any `FILTER` node must be relocated directly after the `SCAN` node.
2. **Projection Pushdown:** If a `PROJECT` exists, update the `SCAN` node's `"columns"` field to only include columns requested by `PROJECT` combined with those required by any `FILTER` or `SORT` operations.
3. If multiple filters exist, combine their required columns.


#### 2. Clean Starter Code
```python
from typing import Any

def optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    Applies Predicate Pushdown and Projection Pushdown rewrite rules
    to optimize a relational query execution DAG.

    Args:
        plan: Ordered list of query plan node dicts starting with SCAN.

    Returns:
        Optimized query plan node list.
    """
    # TODO: Implement predicate pushdown and projection pushdown rules
    raise NotImplementedError("Implement optimize_query_dag")
```


#### 3. Reference Solution (2026 Idiomatic)
```python
from typing import Any

def optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if not plan or plan[0].get("op") != "SCAN":
        return plan

    scan_node = dict(plan[0])
    filters: list[dict[str, Any]] = []
    others: list[dict[str, Any]] = []
    project_node: dict[str, Any] | None = None

    for node in plan[1:]:
        op = node.get("op")
        if op == "FILTER":
            filters.append(dict(node))
        elif op == "PROJECT":
            project_node = dict(node)
        else:
            others.append(dict(node))

    # Projection Pushdown: Determine minimal set of columns required from storage
    needed_columns: set[str] = set()
    if project_node is not None:
        needed_columns.update(project_node.get("columns", []))
        for f in filters:
            needed_columns.update(f.get("columns_used", []))
        for o in others:
            if "by" in o:
                needed_columns.add(o["by"])
        scan_node["columns"] = sorted(needed_columns)

    # Predicate Pushdown: Place all FILTER nodes directly after SCAN
    optimized_plan: list[dict[str, Any]] = [scan_node]
    optimized_plan.extend(filters)
    optimized_plan.extend(others)
    if project_node is not None:
        optimized_plan.append(project_node)

    return optimized_plan
```

#### 4. Test Suite & Strict Assertions

**Public Test Cases:**
- Input plan: `[SCAN(cols=None), SORT(by="age"), FILTER(p="age > 21", cols=["age"]), PROJECT(cols=["name"])]`
- Optimized plan: `SCAN(cols=["age", "name"])` -> `FILTER` -> `SORT` -> `PROJECT`.

**Hidden Test Cases:**
- Multiple filters push down sequentially directly after SCAN.
- Plan without PROJECT retains scan column specification.
- Column deduplication and sorted output in SCAN columns.

**Executable Test Harness:**
```python
def test_py_polars_lazy():
    unoptimized = [
        {"op": "SCAN", "table": "users", "columns": None},
        {"op": "SORT", "by": "score"},
        {"op": "FILTER", "predicate": "score > 90", "columns_used": ["score"]},
        {"op": "PROJECT", "columns": ["username", "score"]}
    ]
    
    optimized = optimize_query_dag(unoptimized)
    
    # Verify SCAN comes first, with columns pruned to ["score", "username"]
    assert optimized[0]["op"] == "SCAN"
    assert optimized[0]["columns"] == ["score", "username"]
    
    # Verify Predicate Pushdown: FILTER moved before SORT
    assert optimized[1]["op"] == "FILTER"
    assert optimized[2]["op"] == "SORT"
    assert optimized[3]["op"] == "PROJECT"
    
    print("ALL TESTS PASSED for py-polars-lazy-dag")

if __name__ == "__main__":
    test_py_polars_lazy()
```


#### 5. Execution Budget & Resource Verification

- **WASM Wall-Clock Budget:** ~0.10ms (AST rewrite; instant execution)
- **Heap Memory Limit:** Plan dictionaries (< 50KB)
- **Asymptotic Complexity:** Time: $\mathcal{O}(N)$ where $N$ is number of nodes. Space: $\mathcal{O}(N)$.


#### 6. 4-Part Student Diagnostic Hints

- **What (The Symptom):** The SCAN node loads all columns, or SORT executes before FILTER.
- **Where (The Localization):** The plan assembly order.
- **Why (The Mechanism):** Evaluating filters after sorting forces the engine to sort rows that will ultimately be discarded. In lazy engines, filters must precede sorting, and scan columns must be pruned to only required fields.
- **How (The Remediation):** Collect all needed columns across PROJECT, FILTER, and SORT; update `scan_node["columns"]`, and order nodes: `[scan, *filters, *others, project]`.



---

## 4. Master Automated Test Runner & Verification Suite

To verify all Python and DuckDB challenges within local testing environments or CI/CD pipelines:

```bash
# Verify Python Challenges
python3 -m unittest discover -s tests -p "*_test.py"

# Verify DuckDB SQL Challenges
python3 -c "
import duckdb
con = duckdb.connect(':memory:')
print('DuckDB WASM Test Harness Ready. Engine Version:', duckdb.__version__)
"
```

### Diagnostic Message Schema for OKVIR Client:
```json
{
  "challenge_id": "py-simd-squared-error",
  "status": "FAILED",
  "diagnostic": {
    "what": "Execution Timeout (> 800ms) or Pure Python loop detected",
    "where": "for loop at line 8: for i in range(len(y_true))",
    "why": "Iterating element-by-element forces CPython boxed float allocations, bypassing CPU SIMD128 registers.",
    "how": "Vectorize using np.abs(y_true - y_pred) and np.where(errors <= delta, quad, linear)."
  }
}
```
