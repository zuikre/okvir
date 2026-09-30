# OKVIR Track 2: Visual & Simulation Architectural Specification
## CS, Python & Data Engineering (Modules MOD-08 through MOD-17 • 30 Lessons)

> **Specification Version:** `2.0.0-PROD`  
> **Status:** Approved Architectural Master Blueprint  
> **Track:** Track 2 — Computer Science, CPython Internals & High-Performance Data Engineering  
> **Target Engine:** React 19 + HTML5 Canvas (2D Context / WebGL2) + Web Audio API (`ProceduralAudioEngine`)  
> **Audio Bus:** 100% Offline Procedural Synthesis, 0 External Audio Assets, Zero-Latency Dirac Transients  

---

## 1. Architectural System Principles & Design Language

### 1.1 Tactile Visual Philosophy
Track 2 visual simulations bridge the gap between abstract computer science abstractions and physical silicon realities. Every widget embodies:
1. **Physical Transparency:** Objects in memory have explicit byte offsets, pointer addresses, and layout boundaries. Variables are not magical containers; they are name-tags holding 64-bit memory addresses referencing heap `PyObject` structs.
2. **Deterministic Mechanics:** Loops, branches, stack frames, and hash probes advance discretely through time, exposing the mechanical cost ($O(1)$ vs $O(N)$, cache lines, pointer dereferencing overhead).
3. **Teenage Engineering Precision Aesthetic:** Matte dark slate canvas background (`#0A0E17`), laser-sharp typography (JetBrains Mono / Inter), high-contrast fluorescent data lanes, and tactile mechanical controls (calipers, thumbwheels, rotary dials, toggle switches).

### 1.2 Unified Color Palette & State Mapping
| State / Token | Hex Code | Purpose in Simulation |
| :--- | :--- | :--- |
| `CANVAS_BG` | `#080C14` | Primary simulation viewport background |
| `SURFACE_PANEL` | `#0F172A` | Floating sidebar, frame container, inspector panel |
| `BORDER_MUTED` | `#1E293B` | Structural boundary lines, grid demarcations |
| `ACCENT_CYAN` | `#06B6D4` | SIMD registers, active pointers, memory byte highlight |
| `SUCCESS_EMERALD` | `#10B981` | Cache hits, pure evaluation, assertion pass, $O(1)$ speed |
| `WARN_AMBER` | `#F59E0B` | Hash collisions, strided hops, memory reallocation warnings |
| `ERROR_ROSE` | `#EF4444` | Cache misses, recursion overflow, type mismatches, out-of-bounds |
| `PURPLE_CLOSURE` | `#8B5CF6` | Enclosing lexical scopes, window frame partitions, CTE scopes |
| `BLUE_STREAM` | `#3B82F6` | Generator streams, lazy execution DAG nodes, continuous pipelines |
| `TEXT_PRIMARY` | `#F8FAFC` | Labels, values, addresses, active indicators |
| `TEXT_MUTED` | `#64748B` | Inactive frames, base addresses, coordinate scales |

### 1.3 Procedural Sonification Grammar
All audio events map directly to `ProceduralAudioEngine` methods:
* **Micro-Click (`playClick(pitch)`):** Mechanical switch toggle, branch flipped, button press (10ms Dirac pulse, 1600 Hz $\to$ 320 Hz exponential drop).
* **Scrub-Tick (`playScrubTick(vel)`):** Dial scrubbing, timeline slider, memory caliper dragging (6ms pulse, bandpass filter $1100 \text{ Hz} \times \text{vel}$).
* **Execution Hum (`startExecutionHum()` / `stopExecutionHum()`):** Loop execution, recursion descent, WASM memory access (55 Hz A1 triangle + 110.4 Hz sawtooth chorus beat through 180 Hz resonant lowpass filter).
* **Memory Allocation Ping (`playMemoryAlloc(bytes)`):** Fast sine ping scaled inversely by allocation size (440 Hz to 1760 Hz, decay 45ms).
* **Cache Hit Bell (`playCacheHit()`):** Pure sine harmonic at 1046.5 Hz (C6), 35ms decay.
* **Cache Miss Thud (`playCacheMiss()`):** Low resonant pulse at 92 Hz with 0.15s decay.
* **Hash Collision Buzz (`playCollisionBuzz()`):** Dissonant minor second cluster (220 Hz + 233 Hz sawtooth, 80ms).
* **Table Join Chime (`playVictoryHarmonics()`):** Chowning FM bell chord (C5, E5, G5, B5, D6).

---

## 2. Complete Module & Lesson Inventory (MOD-08 to MOD-17)

```
MOD-08: Computational Thinking & Procedural Flow
  ├── LESSON-T2-01: Name-Binding, Stack Frames & Heap Object Allocation
  ├── LESSON-T2-02: Control Flow Graph & Bytecode Branching
  └── LESSON-T2-03: Scope Resolution & Environment Frame Stack (LEGB Rule)

MOD-09: Functional Abstraction & Closures
  ├── LESSON-T2-04: Pure Functions & Referential Transparency
  ├── LESSON-T2-05: Higher-Order Functions, Lambdas & Pipeline Dispatch
  └── LESSON-T2-06: Lexical Closures, Enclosing Scopes & Decorator Mechanics

MOD-10: Compound Data, Recursion & Pointers
  ├── LESSON-T2-07: Pointer Aliasing, Mutability & Deep vs Shallow Cloning
  ├── LESSON-T2-08: Linear Sequences, Memory Fragmentation & Dynamic Array Resizing
  └── LESSON-T2-09: Recursion Trees, Call Frame Stacks & Base Case Guarantees

MOD-11: Hash Tables & Algorithmic Complexity
  ├── LESSON-T2-10: Hash Functions, SipHash & Collision Probing
  ├── LESSON-T2-11: Dict Key-Value Sparse-Dense Architecture & O(1) Lookups
  └── LESSON-T2-12: Algorithmic Complexity, Big-O Curves & Amortized Analysis

MOD-12: Object Protocols & Lazy Stream Generators
  ├── LESSON-T2-13: Python Dunder Protocols & Magic Method Dispatch
  ├── LESSON-T2-14: Iterators, Iterables & The __iter__/__next__ Protocol
  └── LESSON-T2-15: Lazy Stream Generators, Coroutines & yield Suspension

MOD-13: Vectorized Computing with NumPy
  ├── LESSON-T2-16: Contiguous C-Memory Layout & SIMD Register Execution
  ├── LESSON-T2-17: Array Strides, Byte Offsets & Zero-Copy Views
  └── LESSON-T2-18: Multi-Dimensional Broadcasting & Zero-Stride Virtual Expansion

MOD-14: Tabular Wrangling & Tidy Data Architecture
  ├── LESSON-T2-19: DataFrame Anatomy: BlockManager & Homogeneous Column Chunks
  ├── LESSON-T2-20: Dimensional Slicing: loc (Label) vs iloc (Integer) Calipers
  ├── LESSON-T2-21: Tidy Data Architecture: Pivot, Melt & Normal Form Morphing
  └── LESSON-T2-22: GroupBy Mechanics: Split-Apply-Combine Pipeline

MOD-15: Relational Algebra & Declarative SQL
  ├── LESSON-T2-23: Relational Algebra Operators: Selection σ, Projection π & Cross Product ×
  ├── LESSON-T2-24: Declarative SQL Execution Pipeline (Lexer -> AST -> Optimizer -> Execution Order)
  └── LESSON-T2-25: Relational Join Geometry: Hash Join Build/Probe & Cartesian Merges

MOD-16: Advanced Analytical SQL: Windows & CTEs
  ├── LESSON-T2-26: Window Function Frames: PARTITION BY, ORDER BY & Rolling Calipers
  ├── LESSON-T2-27: Positional & Ranking Windows: LEAD, LAG, RANK & DENSE_RANK
  └── LESSON-T2-28: Common Table Expressions (CTEs) & Recursive Graph Traversal

MOD-17: Modern Columnar Engines (Arrow, DuckDB, Polars)
  ├── LESSON-T2-29: Columnar Storage, Apache Arrow Buffers & Zero-Copy IPC
  └── LESSON-T2-30: Polars & DuckDB Query Optimization: Lazy Execution DAGs & Pushdown Predicates
```

---

## 3. Detailed Lesson Specifications (All 30 Lessons)

---

### MODULE 08: Computational Thinking & Procedural Flow

#### LESSON-T2-01: Name-Binding, Stack Frames & Heap Object Allocation
* **Primary Target:** Demystify Python's reference semantics. Variables are name-tags containing 64-bit memory addresses pointing to heap-allocated `PyObject` structs (`ob_refcnt`, `ob_type`, `ob_ival`).
* **1. Component Identifier:** `EnvironmentFrameCanvas`
  - Engine: `canvas2d` (HiDPI $dpr = 2.0$, 60 FPS)
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Left Pane (`0 <= x <= 380`): **Call Stack Window**. Rectangular stack frames with coordinate offset $y = 40 + i \cdot 110$. Each frame displays local namespace table: `[ Name Tag | 64-bit Hex Pointer ]`.
  - Right Pane (`420 <= x <= 900`): **Heap Memory Pool**. Spatial 2D scatter of rounded `PyObject` structs (`x: 450..860, y: 50..480`).
  - Connecting Arrows: Smooth cubic Bézier spline $\mathbf{B}(t)$ from stack slot $(x_1, y_1)$ to heap object port $(x_2, y_2)$ with animated glowing particle pulses.
* **3. Tactile Interactive Levers:**
  - `Code Stepper Slider`: Step through execution: `a = 42`, `b = a`, `a = a + 1`, `c = [1, 2]`, `d = c`.
  - `Object Drag Handle`: Drag heap objects around to untangle pointer paths; elastic physics cord tracks position.
  - `Rebind Lever`: Drag variable name-tag `a` from one heap object to another; arrow detaches and snaps with magnetic physics.
  - `Garbage Collector Trigger Button`: Run cycle detector; zero-refcount objects crumble into particle dust.
* **4. Visual Feedback & Animations:**
  - Refcount Badge: Pill badge `refcnt: N` on heap object turns bright emerald green (`#10B981`) on increment, pulses amber on decrement, fades to dark rose (`#EF4444`) when $N=0$.
  - Stack Allocation Bounce: Newly pushed stack frames slide in from bottom with spring damper ($\zeta = 0.82$).
* **5. Web Audio Sonification Hooks:**
  - Heap Allocation: `playClick(1.8)` followed by soft sine chime ($f = 587.33 \text{ Hz}$, D5).
  - Pointer Re-bind: High-frequency transient click (`playClick(2.4)`).
  - Refcount Decrement: Damped mechanical tick (`playScrubTick(1.2)`).
  - Refcount Zero / Object Reclamation: Low resonant thump ($f = 65 \text{ Hz}$, decay 140ms).

---

#### LESSON-T2-02: Control Flow Graph & Bytecode Branching
* **Primary Target:** Map procedural Python `if/else` and `while` constructs directly into CPython bytecode instructions (`COMPARE_OP`, `POP_JUMP_IF_FALSE`, `JUMP_FORWARD`) and directed acyclic flow graphs.
* **1. Component Identifier:** `ControlFlowGraphLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Left Column (`x: 20..320`): High-level Python code editor with active instruction cursor.
  - Center Column (`x: 340..600`): Linear bytecode instruction strip (`OFFSET | OPCODE | ARG | VALUE`).
  - Right Column (`x: 620..880`): Directed Control Flow Graph (CFG) with basic blocks as nodes ($W=180, H=60$) connected by green (True) and red (False) directed edges with curve tension.
* **3. Tactile Interactive Levers:**
  - `Condition Toggle Switch`: Flip condition input (e.g. `x > 10` toggle True/False) in real-time.
  - `Instruction Step Dial`: Rotary dial scrub stepping through virtual instruction pointer (IP).
  - `Loop Counter Stepper`: Slider $N \in [1, 10]$ controlling iterations; watch the backward jump edge pulse.
* **4. Visual Feedback & Animations:**
  - Active Basic Block: Glows with cyan rim (`#06B6D4`, 8px blur); inactive paths dim to 20% opacity.
  - Bytecode Jump Beam: An energy beam travels down the CFG jump edge to the target offset when branch is taken.
  - Branch Taken vs Not-Taken: True edge pulses bright emerald; False edge turns crimson.
* **5. Web Audio Sonification Hooks:**
  - Step Bytecode: Crisp relay click (`playClick(1.2)`).
  - Branch Taken (Jump): Ascending two-tone interval (440 Hz $\to$ 660 Hz, 20ms).
  - Loop Iteration Wrap: Mechanical ratchet click (`playScrubTick(1.8)`).
  - Loop Termination: Low confirmation chime (`playVictoryHarmonics()`).

---

#### LESSON-T2-03: Scope Resolution & Environment Frame Stack (LEGB Rule)
* **Primary Target:** Physicalize the LEGB (Local $\to$ Enclosing $\to$ Global $\to$ Built-in) lookup pipeline as concentric namespace cylinders.
* **1. Component Identifier:** `ScopeChainInspector`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Visual Metaphor: 4 nested translucent isometric frames (or hierarchical stack slabs):
    * Layer 1 (Innermost, Cyan `#06B6D4`): Local Frame `f()`.
    * Layer 2 (Enclosing, Violet `#8B5CF6`): Outer Frame `g()`.
    * Layer 3 (Global, Blue `#3B82F6`): Module Namespace `__main__`.
    * Layer 4 (Outermost, Slate `#64748B`): Builtins `builtins`.
  - Coordinates: Polar or concentric isometric offset with search laser ray projecting radially outward from Local to Builtin.
* **3. Tactile Interactive Levers:**
  - `Identifier Search Input`: Text selector / dropdown to query symbols (`x`, `len`, `total`, `nonlocal_var`).
  - `Frame Depth Slider`: Adjust function call nesting depth from 1 to 4 levels.
  - `Global / Nonlocal Keyword Toggles`: Toggle `global x` or `nonlocal x` statements and observe variable slot relocation.
* **4. Visual Feedback & Animations:**
  - LEGB Search Ray: A scanning ray emits from the Local scope. If key is missing, it bounces upward into Enclosing, Global, and Builtins.
  - Hit vs Miss Highlight: Found slot illuminates in emerald green with pulse radius; missed scopes display faint rose crosses.
* **5. Web Audio Sonification Hooks:**
  - Scope Probe Hop: Soft acoustic tap for each traversed scope layer ($300 \text{ Hz} \to 450 \text{ Hz} \to 600 \text{ Hz}$).
  - Hit Found: Resonant marimba strike ($f = 880 \text{ Hz}$, A5).
  - `NameError` Dissonance: Tritone error clash (`playErrorDissonance()`) if variable is absent in all 4 tiers.

---

### MODULE 09: Functional Abstraction & Closures

#### LESSON-T2-04: Pure Functions & Referential Transparency
* **Primary Target:** Visualize the Equational Substitution Model. A pure function $f(x)$ is a deterministic lookup table where expression $f(a)$ can be physically replaced by its evaluated value without altering program state.
* **1. Component Identifier:** `ReferentialTransparencyLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 500` px.
  - Split Stage:
    * Left Box (`x: 40..420`): **Pure Pipeline**. Function box $f(x) = x^2 + 3$, pure input token hopper, and value substitution slot.
    * Right Box (`x: 480..860`): **Impure Pipeline**. Function box $g(x) = x + \text{global\_state}$, with side-effect leaky pipes venting into an external mutable state tank.
* **3. Tactile Interactive Levers:**
  - `Equational Substitution Lever`: Grab the call badge `f(5)` and pull it into code; it smoothly morphs into number `28`.
  - `State Contamination Dial`: Mutate `global_state` from 0 to 100 while evaluating $g(5)$; watch output jitter and diverge.
  - `Cache Memoization Toggle`: Enable deterministic lookup memo-table; observed speedup counter jumps to $\infty$.
* **4. Visual Feedback & Animations:**
  - Purity Aura: Pure function box has a calm, pulsating emerald perimeter (`#10B981`); impure box emits turbulent crimson warning particles.
  - Morph Animation: Smooth font glyph expansion as `square(4)` splits into `4 * 4` and collapses into `16`.
* **5. Web Audio Sonification Hooks:**
  - Substitution Collapse: Clean crystalline drop ($f = 1046.5 \text{ Hz}$, C6 pure sine).
  - Side Effect Contamination: Low frequency electrical hum ($60 \text{ Hz}$ sawtooth with random frequency jitter).
  - Cache Hit Recall: Instantaneous high chime (`playClick(2.0)` + 1318 Hz E6).

---

#### LESSON-T2-05: Higher-Order Functions, Lambdas & Pipeline Dispatch
* **Primary Target:** Treat functions as first-class citizens: objects that can be passed into functions, returned, and composed into linear execution pipelines (`map`, `filter`, `reduce`).
* **1. Component Identifier:** `HigherOrderPipelineCanvas`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Assembly Line Layout: Horizontal conveyor belt with three glass modular processing stations:
    * Stage 1 (`x: 80..260`): `Filter Station` (Lambda predicate gate).
    * Stage 2 (`x: 350..530`): `Map Station` (Transformation chamber).
    * Stage 3 (`x: 620..800`): `Reduce Station` (Accumulator hopper).
  - Data Packets: Stream of geometric data pellets flowing along conveyor with coordinate $x(t)$.
* **3. Tactile Interactive Levers:**
  - `Lambda Plug-in Sockets`: Drag-and-drop different lambda cartridges into each station (e.g. `lambda x: x % 2 == 0`, `lambda x: x * 10`).
  - `Conveyor Speed Knob`: Rotary knob controlling item feed rate (1 item/s to 60 items/s).
  - `Input Batch Generator`: Add custom array elements `[1, 2, 3, 4, 5, 6, 7, 8]` into the hopper.
* **4. Visual Feedback & Animations:**
  - Filter Gate: Non-matching pellets hit the filter laser and bounce into a discard bin with realistic particle rebound.
  - Map Chamber: Pellets enter blue, illuminate brightly during transformation, and exit cyan with updated numerical labels.
  - Reduce Hopper: Pellets fuse together into a growing sphere of cumulative mass.
* **5. Web Audio Sonification Hooks:**
  - Item Discarded (Filter): Dull tick (`playScrubTick(0.8)`).
  - Item Transformed (Map): Bright synth pluck (pentatonic scale ascending based on output value).
  - Accumulator Fusion (Reduce): Deep resonant bass gong ($110 \text{ Hz}$, release 0.4s).

---

#### LESSON-T2-06: Lexical Closures, Enclosing Scopes & Decorator Mechanics
* **Primary Target:** Expose Python's closure mechanism: `__closure__` tuple containing `cell` objects that preserve references to outer scope variables long after the outer function has returned.
* **1. Component Identifier:** `ClosureScopeInspector`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Left Zone (`x: 40..300`): Outer function `make_multiplier(factor)` call frame.
  - Center Zone (`x: 340..580`): The returned inner function `multiplier(x)` with its hidden `__closure__` backpack.
  - Inside the Backpack (`x: 380..540, y: 220..360`): Glass cell capsule holding `factor = 3`.
  - Right Zone (`x: 620..860`): Decorator wrapping stack (`@timer`, `@memoize`).
* **3. Tactile Interactive Levers:**
  - `Scope Severing Blade`: Click "Return Outer Function"; the outer call frame drops off the stack, but an umbilical pointer stays latched to the closure cell.
  - `Closure Cell Inspector`: Drag the cell object out of the backpack to inspect its internal `ob_ref` pointer.
  - `Decorator Layering Switcher`: Reorder decorators `@timer` and `@auth` to visually see onion-layer execution order.
* **4. Visual Feedback & Animations:**
  - Umbilical Cord Tether: Glowing purple elastic spline (`#8B5CF6`) connecting the inner function to the floating closure cell.
  - Decorator Onion Skinning: Transparent concentric borders wrapping around the inner function, flashing sequentially as calls penetrate inward and return outward.
* **5. Web Audio Sonification Hooks:**
  - Outer Frame Pop: Soft downward whistle ($440 \text{ Hz} \to 220 \text{ Hz}$).
  - Cell Reference Latch: High magnetic lock click (`playClick(2.5)`).
  - Decorator Penetration: Layered two-phase chime (enter: 520 Hz, exit: 780 Hz).

---

### MODULE 10: Compound Data, Recursion & Pointers

#### LESSON-T2-07: Pointer Aliasing, Mutability & Deep vs Shallow Cloning
* **Primary Target:** Master the critical bug vector in Python: mutating an aliased nested list (`b = a` vs `b = a.copy()` vs `b = copy.deepcopy(a)`).
* **1. Component Identifier:** `PointerAliasingLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Variable Shelf (`y: 40..100`): Variable tokens `a`, `b`, `c`.
  - Outer Container Track (`y: 160..260`): Array cells representing outer lists.
  - Inner Heap Objects (`y: 340..460`): Sub-lists `[10, 20]` in heap memory with explicit memory address labels (`0x7FFF01`, `0x7FFF08`).
* **3. Tactile Interactive Levers:**
  - `Clone Mode Selector`: 3-way toggle switch: `Reference Assignment (b = a)`, `Shallow Copy (b = a.copy())`, `Deep Copy (b = copy.deepcopy(a))`.
  - `In-Place Mutation Trigger`: Click cell `a[0][1] = 99`.
  - `Memory Address Hover Tool`: Inspect identity `id(x)` of every node; shared identities glow synchronously.
* **4. Visual Feedback & Animations:**
  - Synchronous Flash: In reference assignment mode, editing `a[0]` causes both `a` and `b` pointers to flash crimson simultaneously.
  - Pointer Topology Re-routing: On Deep Copy, a duplicate heap node clones with a spring expansion animation, and `b`'s arrows detach from `a`'s targets to point to the new clone.
* **5. Web Audio Sonification Hooks:**
  - Pointer Replication: Dual-tone stereo ping (Left: 440 Hz, Right: 880 Hz).
  - Aliased Mutation Shock: Sharp dissonant buzz (`playErrorDissonance()`) warning user of accidental shared mutation.
  - Independent Deep Clone Pass: Pure harmonic major third chime (C5 + E5).

---

#### LESSON-T2-08: Linear Sequences, Memory Fragmentation & Dynamic Array Resizing
* **Primary Target:** Visualize CPython `PyListObject` amortized growth formula ($N_{\text{new}} = N + (N \gg 3) + (N < 9 ? 3 : 6)$), memory reallocations, and pointer array copying.
* **1. Component Identifier:** `DynamicArrayGrowthLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 500` px.
  - Top Strip (`y: 40..180`): **RAM Memory Map**. Linear grid of memory bytes (addresses `0x0000` to `0x00FF`). Allocated list buffers appear as contiguous colored blocks; occupied slots vs allocated capacity.
  - Bottom Pane (`y: 220..460`): **Amortized Cost Step Chart**. Plot of array size $N$ vs cost per append (spikes on reallocation, flat $O(1)$ between).
* **3. Tactile Interactive Levers:**
  - `Append Element Button`: Add one item at a time (`list.append(x)`).
  - `Burst Append Slider`: Rapidly inject 50 elements to observe catastrophic reallocation jumps.
  - `Over-Allocation Threshold Dial`: Inspect capacity vs length ratio.
* **4. Visual Feedback & Animations:**
  - In-Place Fill: Fast green fill into already-allocated memory slots (`len < capacity`).
  - Reallocation Shockwave: When `len == capacity`, the entire buffer turns amber, flashes, and a new, larger block is reserved elsewhere in RAM. Previous elements fly across the canvas to their new contiguous address slot.
* **5. Web Audio Sonification Hooks:**
  - Normal Append ($O(1)$): Light micro-click (`playClick(1.5)`).
  - Memory Reallocation ($O(N)$ copy): Heavy mechanical sliding thud followed by rising lowpass filter sweep ($120 \text{ Hz} \to 480 \text{ Hz}$).
  - Memory Allocation Hum: Sustained execution hum (`startExecutionHum()`) during high-frequency bursts.

---

#### LESSON-T2-09: Recursion Trees, Call Frame Stacks & Base Case Guarantees
* **Primary Target:** Unify the mental model of recursive call trees with the physical linear call-frame stack, demonstrating base-case termination and the mechanics of `RecursionError: maximum recursion depth exceeded`.
* **1. Component Identifier:** `RecursionTreeExplorer`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 560` px.
  - Left Half (`x: 20..380`): **Physical Call Stack**. Vertical stack container filling upward from bottom ($y = 520$). Each frame displays parameters (`n=4`), local variables, and return address. Stack limit line at $y = 60$ (`MAX_DEPTH = 1000`).
  - Right Half (`x: 400..880`): **Recursive Call Tree DAG**. Fractal tree structure expanding downward; nodes represent function invocations $f(n)$, edges represent recursive calls.
* **3. Tactile Interactive Levers:**
  - `Recursion Function Picker`: Select between `Fibonacci(n)`, `Factorial(n)`, `MergeSort(arr)`.
  - `Input N Slider`: Dial input parameter $N \in [0, 8]$.
  - `Execution Scrub Bar`: Scrub backward and forward through call frame push/pop events.
  - `Base Case Sabotage Switch`: Toggle off the base case `if n <= 1: return` to watch the stack overflow in real-time.
* **4. Visual Feedback & Animations:**
  - Frame Push/Pop: Stack frames slide in with a snap; on return, frames collapse into small golden value tokens that slide back to the caller.
  - Tree Branch Blossoming: Nodes sprout with branch angle $\theta$; returning base cases turn emerald, while unresolved calls remain pulsing violet.
  - Stack Overflow Catastrophe: If base case is removed, stack frames blast through the ceiling line; viewport shakes with red emergency flash.
* **5. Web Audio Sonification Hooks:**
  - Call Frame Push: High-pitch ascending xylophone tick ($f = 330 \cdot 2^{depth / 12} \text{ Hz}$).
  - Call Frame Return: Warm descending marimba tone.
  - Base Case Reached: Bright bell harmonic (`playVictoryHarmonics()`).
  - Stack Overflow: Violent tritone alarm (`playErrorDissonance()`) + haptic jolt.

---

### MODULE 11: Hash Tables & Algorithmic Complexity

#### LESSON-T2-10: Hash Functions, SipHash & Collision Probing
* **Primary Target:** Understand deterministic string hashing, uniform bucket distribution via modulo indexing ($h = \text{hash}(k) \pmod M$), and open-addressing collision resolution (linear vs perturbation probing).
* **1. Component Identifier:** `HashTableBucketLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Top Bar (`y: 30..90`): Key input box with real-time 64-bit SipHash binary bit-display.
  - Center Strip (`y: 120..220`): Modulo calculation visualizer: $\text{Hash} \pmod 8 = \text{Bucket Index}$.
  - Bottom Grid (`y: 250..480`): Hash Table Array of 8 or 16 buckets (`Index 0..7`), showing key, hash, and value slots.
* **3. Tactile Interactive Levers:**
  - `Key Injection Bar`: Type arbitrary strings (`"apple"`, `"banana"`, `"cat"`, `"dog"`) or click presets.
  - `Collision Preset Button`: Insert 3 keys that intentionally hash to the exact same bucket (e.g. hash % 8 = 3).
  - `Perturbation Prober Step Button`: Step through the collision probe sequence: $i = (5i + 1 + \text{perturb}) \pmod M$.
* **4. Visual Feedback & Animations:**
  - Bit Scramble Shower: Typing characters triggers an animated cascade of bits passing through XOR/Shift gates into the final 64-bit hex hash.
  - Collision Flash: When a key targets an occupied bucket, the slot flashes bright amber; a curved ballistic arc probe bounces to the next candidate slot until an empty cell is found.
* **5. Web Audio Sonification Hooks:**
  - Key Hashing: Rapid micro-click flurry (5 clicks in 25ms).
  - Direct Insertion ($O(1)$ hit): Clean woodblock click ($f = 800 \text{ Hz}$).
  - Collision Event: Dissonant dual-tone thud ($220 \text{ Hz} + 233 \text{ Hz}$).
  - Probe Hop: Springy ascending whistle for each consecutive probe hop.

---

#### LESSON-T2-11: Dict Key-Value Sparse-Dense Architecture & $O(1)$ Lookups
* **Primary Target:** Explore modern Python 3.6+ compact dictionary architecture: sparse hash table holding indices (`int8_t indices[]`) pointing into a dense, insertion-ordered array of entries (`PyDictKeyEntry entries[]`).
* **1. Component Identifier:** `CompactDictLayoutLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Top Half (`y: 40..220`): **Sparse Hash Table**. 8 hash slots showing integer indices (e.g. `[-1, 0, -1, 1, -1, 2, -1, -1]`).
  - Bottom Half (`y: 260..480`): **Dense Entry Array**. Contiguous memory blocks with fields `[ hash | key_ptr | val_ptr ]` sorted strictly in order of insertion.
* **3. Tactile Interactive Levers:**
  - `Insert Key-Value Pair`: Add new item; observe it append to the end of the dense array while updating only one index in the sparse array.
  - `Delete Key (Tombstone) Trigger`: Delete an entry; observe how Python marks the sparse slot as `DKIX_DUMMY` (-2) without shifting the dense array.
  - `Memory Compaction Slider`: Trigger table resizing; watch dense array re-pack into fresh memory, purging dummy tombstones.
* **4. Visual Feedback & Animations:**
  - Two-Stage Lookup Beam: Looking up a key first shoots an arrow to the sparse table (hash % size), reads the integer index $j$, then instantly jumps straight to row $j$ of the dense array.
  - Memory Footprint Gauge: Live comparison bar showing memory usage of legacy Python 3.5 dict (288 bytes) vs compact Python 3.7+ dict (160 bytes), saving 35-40% RAM.
* **5. Web Audio Sonification Hooks:**
  - Sparse Table Hit: Light crystal tick (`playClick(1.8)`).
  - Dense Array Dereference: Solid bass note ($180 \text{ Hz}$, 30ms).
  - Memory Savings Fanfare: Harmonized major chord (`playVictoryHarmonics()`) when compaction clears dummy slots.

---

#### LESSON-T2-12: Algorithmic Complexity, Big-O Curves & Amortized Analysis
* **Primary Target:** Develop physical intuition for asymptotic time complexity curves: $O(1) < O(\log N) < O(N) < O(N \log N) < O(N^2) < O(2^N)$ under massive scaling.
* **1. Component Identifier:** `BigOComplexityRacer`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Left Stage (`x: 40..500`): **The Grand Big-O Drag Race**. 6 parallel horizontal racing lanes representing algorithms:
    1. Dict Lookup ($O(1)$)
    2. Binary Search ($O(\log N)$)
    3. Linear Scan ($O(N)$)
    4. Merge Sort ($O(N \log N)$)
    5. Nested Loops ($O(N^2)$)
    6. Traveling Salesperson ($O(2^N)$)
  - Right Stage (`x: 540..860`): Real-time logarithmic/linear Cartesian graph plotting Operations vs $N$.
* **3. Tactile Interactive Levers:**
  - `Scale Knob N`: Exponential dial scaling $N$ from $10$ to $10^9$ elements.
  - `Clock Speed Throttle`: Adjust virtual CPU execution cycles from 100 ops/s to 1 GHz.
  - `Algorithm Runner Button`: Fire the starting gun; runners advance across lanes at rates dictated by their complexity equations.
* **4. Visual Feedback & Animations:**
  - Lane Velocity: At $N = 10^6$, $O(1)$ and $O(\log N)$ flash past the finish line instantly; $O(N)$ glides smoothly; $O(N^2)$ slows to a crawl; $O(2^N)$ completely freezes with an overheat smoke animation.
  - Wall-Clock Projection Display: Real-time tooltip converts operation counts into human time: `0.002 microseconds` vs `317 years`.
* **5. Web Audio Sonification Hooks:**
  - $O(1)$ Finish: Instant high chime (`playClick(2.0)`).
  - $O(N)$ Stride: Smooth continuous audio pitch climbing linearly with $N$.
  - $O(N^2)$ Stall: Stuttering engine failure drone ($55 \text{ Hz}$ saw with dropouts).
  - $O(2^N)$ Explosion: Overload alarm dissonance (`playErrorDissonance()`).

---

### MODULE 12: Object Protocols & Lazy Stream Generators

#### LESSON-T2-13: Python Dunder Protocols & Magic Method Dispatch
* **Primary Target:** Demystify Python's data model: how syntactic operators (`len(x)`, `x[i]`, `x + y`, `with x:`) map directly to CPython internal slot lookups (`tp_as_sequence->sq_length`, `tp_as_mapping->mp_subscript`).
* **1. Component Identifier:** `DunderProtocolDispatchLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 500` px.
  - Left Zone (`x: 40..280`): High-level Python statement (`total = len(obj)`, `val = obj["key"]`).
  - Center Zone (`x: 320..580`): The Dispatch Router (CPython Type Slot Table `PyTypeObject`).
  - Right Zone (`x: 620..860`): The Custom Class Instance with its `__len__`, `__getitem__`, `__add__` bytecode functions.
* **3. Tactile Interactive Levers:**
  - `Syntax Selector`: Click syntax cards: `[]` (Index), `len()` (Size), `+` (Add), `str()` (Format), `in` (Containment).
  - `Dunder Implementation Toggle`: Toggle whether the user class implements the corresponding dunder method or leaves it undefined.
  - `Fallback Dispatch Switch`: Observe how `in` falls back to `__contains__`, then to `__iter__`, and finally to `__getitem__` with integer indices.
* **4. Visual Feedback & Animations:**
  - Mechanical Relay Routing: When high-level syntax triggers, a routing ray hits the type slot; if slot is populated, a green bridge lowers and executes the method; if null, the ray deflects to fallback slots or raises `TypeError`.
* **5. Web Audio Sonification Hooks:**
  - Dispatch Route: Swift switchboard click (`playClick(1.6)`).
  - Successful Dunder Execution: Warm electric piano note ($f = 523.25 \text{ Hz}$, C5).
  - Missing Slot Fallback: Muted wooden clack.
  - `TypeError` Unsupported: Harsh tritone buzz (`playErrorDissonance()`).

---

#### LESSON-T2-14: Iterators, Iterables & The `__iter__`/`__next__` Protocol
* **Primary Target:** Physicalize the iterator state machine: the separation of Iterable (factory producing iterators) and Iterator (stateful cursor advancing across memory until `StopIteration`).
* **1. Component Identifier:** `IteratorStateMachineCanvas`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Top Deck (`y: 40..160`): **Iterable Container** (e.g. List `[10, 20, 30, 40]`) with fixed elements in memory.
  - Middle Zone (`y: 200..360`): **Active Iterator Instance**. A mechanical wheeled cart holding internal state cursor `index = 2` and a pointer needle pointing up to the list elements.
  - Bottom Terminal (`y: 400..480`): The `for` loop consumer loop receiving yielded values.
* **3. Tactile Interactive Levers:**
  - `iter() Spawn Lever`: Pull lever to spawn a fresh, independent Iterator cart from the Iterable.
  - `next() Hand Crank`: Crank wheel to advance cursor index by 1; needle shifts right, reads value, and emits token downward.
  - `Multi-Iterator Mode`: Spawn 2 separate iterators from the same list to watch them advance at independent rates without interfering.
* **4. Visual Feedback & Animations:**
  - Cursor Step: Mechanical spring hop as the pointer advances from slot $i$ to $i+1$.
  - `StopIteration` Boundary Wall: When cursor steps past index 3, it hits an electric red bumper; the cart locks in place and displays `StopIteration` sentinel.
* **5. Web Audio Sonification Hooks:**
  - Iterator Spawn: Smooth pneumatic slide whistle ($300 \text{ Hz} \to 600 \text{ Hz}$).
  - `next()` Advance: Crisp ratchet gear click (`playScrubTick(1.5)`).
  - Value Emission: Pleasant bell ping ($f = 880 \text{ Hz}$).
  - `StopIteration` Sentinel: Muted relay release click ($f = 140 \text{ Hz}$).

---

#### LESSON-T2-15: Lazy Stream Generators, Coroutines & `yield` Suspension
* **Primary Target:** Visualize frame execution suspension: how `yield` freezes local variable registers and instruction pointers on the heap without consuming memory for intermediate collections.
* **1. Component Identifier:** `GeneratorSuspensionLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Top Pane (`x: 40..420`): **Generator Stack/Heap Frame**. Contains `f_lasti` (last instruction pointer), local variable dials (`x=3`, `total=15`), and execution status banner (`RUNNING` / `SUSPENDED` / `DEAD`).
  - Bottom Pane (`x: 40..420`): **RAM Usage Comparator**. Real-time memory gauge: List comprehension ($O(N)$ 800 MB) vs Generator ($O(1)$ 128 bytes).
  - Right Half (`x: 460..860`): **Infinite Stream Pipeline**. Pipeline of values flowing lazily on-demand through `take(5)`.
* **3. Tactile Interactive Levers:**
  - `Pull Value Button (next)`: Consumer requests a single value; watch generator wake up, execute 3 bytecode steps, yield, and freeze.
  - `Stream Length Dial`: Scale sequence length from 10 to $10,000,000$; observe generator memory stay rock-solid at 128 bytes while list comprehension explodes.
  - `Coroutine Send Slider`: Send values into generator via `.send(val)`.
* **4. Visual Feedback & Animations:**
  - Frame Cryo-Freeze: On hitting `yield`, the frame turns crystalline cyan (`#06B6D4`), surrounded by frost particles; execution pointer locks in place.
  - Instant Wake-Up: On `next()`, frost shatters, frame glows golden amber, and execution resumes from the exact paused instruction.
* **5. Web Audio Sonification Hooks:**
  - Frame Suspension (`yield`): Descending sigh filter sweep ($600 \text{ Hz} \to 180 \text{ Hz}$, triangle wave).
  - Frame Resume (`next()`): Crisp energetic relay click (`playClick(2.2)`).
  - Infinite Stream Pump: Rhythmic low percussion beat ($120 \text{ bpm}$) as values are pulled.

---

### MODULE 13: Vectorized Computing with NumPy

#### LESSON-T2-16: Contiguous C-Memory Layout & SIMD Register Execution
* **Primary Target:** The physical core of high-performance computing: contrasting CPython's boxed pointer heap traversal with NumPy's contiguous C-order buffer loaded into 256-bit AVX2 / 512-bit AVX-512 SIMD vector registers.
* **1. Component Identifier:** `SimdVsLoopBenchmarkLab`
  - Engine: `canvas2d` (60 FPS split-screen)
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Top Half (`y: 40..250`): **CPython Loop Architecture**. Scattered heap pointer chase. Pointer array $\to$ scattered `PyFloatObject` structs across RAM. Cache line misses visualized as red shockwaves.
  - Bottom Half (`y: 280..500`): **NumPy SIMD Architecture**. Linear contiguous 64-bit float buffer. Four 64-bit doubles packed into a single 256-bit AVX2 vector register (`ymm0`), processed in 1 single CPU clock cycle.
* **3. Tactile Interactive Levers:**
  - `Register Width Selector`: 3-way toggle: `Scalar (64-bit, 1 float)`, `AVX2 (256-bit, 4 floats)`, `AVX-512 (512-bit, 8 floats)`.
  - `Benchmark Ignition Lever`: Pull lever to execute a $1000$-element addition simultaneously in both engines.
  - `L1/L2 Cache Line Inspection Slider`: Shift 64-byte cache line window across memory.
* **4. Visual Feedback & Animations:**
  - Parallel SIMD Pulse: In NumPy mode, 4 (or 8) numbers illuminate cyan simultaneously, slide into the AVX register chamber, calculate in 1 frame, and slam into output memory with synchronized emerald flash.
  - Slow CPython Pointer Crawl: A lone yellow turtle pointer hops laboriously from memory address to heap object, unwraps header, extracts float, adds, allocates new float object. Speedup counter reads $84\times$.
* **5. Web Audio Sonification Hooks:**
  - CPython Stride: Irregular, plodding wooden clicks (cache miss thuds interspersed).
  - SIMD Vector Blast: Powerful synthesized stereo laser chord (unison 4-voice chord: 440, 554.37, 659.25, 880 Hz, 40ms attack).
  - Vector Register Snap: Crisp metallic lock click (`playClick(3.0)`).

---

#### LESSON-T2-17: Array Strides, Byte Offsets & Zero-Copy Views
* **Primary Target:** Visualize NumPy `ndarray` metadata: `shape`, `strides`, and byte-offset formula ($\text{byte\_offset} = \sum i_k \cdot s_k$). Master how slicing (`arr[::2, :]`) creates a zero-copy view with modified strides rather than duplicating memory.
* **1. Component Identifier:** `StrideMemoryGridLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Upper Half (`x: 40..860, y: 40..200`): **Physical 1D Byte Memory Ribbon**. Linear sequence of contiguous 8-byte float cells with physical byte memory addresses (`0x00`, `0x08`, `0x10`, ..., `0x78`).
  - Lower Half (`x: 40..860, y: 240..480`): **Logical 2D / 3D Grid Projection**. The 2D matrix view $(3 \times 4)$ constructed purely via stride jumps ($s_0 = 32 \text{ bytes}, s_1 = 8 \text{ bytes}$).
* **3. Tactile Interactive Levers:**
  - `Stride $s_0$ (Row Stride) Thumbwheel`: Scrub row byte stride from 8 to 64 bytes.
  - `Stride $s_1$ (Column Stride) Thumbwheel`: Scrub column byte stride from 8 to 32 bytes.
  - `Slice Expression Input`: Enter slices: `arr[::-1]`, `arr[::2, :]`, `arr.T` (Transpose).
  - `Copy vs View Probe Button`: Mutate view element; watch physical byte change in 1D ribbon and reflect instantaneously in both views.
* **4. Visual Feedback & Animations:**
  - Transposition Jump: In `arr.T`, memory ribbon stays 100% stationary (0 bytes copied); only the stride tuple swaps $(32, 8) \to (8, 32)$; stride connector curves cross over with glowing cyan geometry.
  - Zero-Copy Stamp: A glowing emerald badge `"0 BYTES COPIED • VIEW ONLY"` illuminates on valid stride operations; turns crimson `"BUFFER COPY ALLOCATED"` if memory is non-contiguous.
* **5. Web Audio Sonification Hooks:**
  - Stride Shift: Tactile rotary tick (`playScrubTick(vel)`).
  - Zero-Copy View Created: High glass harmonic ping ($f = 1760 \text{ Hz}$, A6, 60ms decay).
  - Expensive Memory Copy Forced: Low descending groan + allocation hum (`startExecutionHum()`).

---

#### LESSON-T2-18: Multi-Dimensional Broadcasting & Zero-Stride Virtual Expansion
* **Primary Target:** Demystify NumPy broadcasting rules: right-aligning shapes, matching dimensions ($d_1 = d_2$ or $d = 1$), and virtual dimension stretching achieved by setting stride to 0 ($s_k = 0$).
* **1. Component Identifier:** `BroadcastingAlignmentGrid`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Top Zone (`y: 40..160`): Shape alignment board showing trailing dimension match:
    $$\begin{matrix} \text{Array A:} & (3, & 1) \\ \text{Array B:} & & (4,) \\ \hline \text{Broadcast Result:} & (3, & 4) \end{matrix}$$
  - Center & Bottom Zone (`y: 180..500`): 3D isometric projection of Array A (3 rows of 1 column) and Array B (1 row of 4 columns) expanding into a $(3 \times 4)$ calculation matrix.
* **3. Tactile Interactive Levers:**
  - `Shape A Dimension Dials`: Adjust `dim(A)` across axes $(x, y) \in [1..5]$.
  - `Shape B Dimension Dials`: Adjust `dim(B)` across axes $(x, y) \in [1..5]$.
  - `Broadcasting Stretch Slider`: Manually slide the expansion slider from $t=0.0$ (original compact shapes) to $t=1.0$ (fully broadcast alignment).
* **4. Visual Feedback & Animations:**
  - Zero-Stride Ghost Duplication: The single column of Array A clones horizontally into 4 columns rendered as semi-transparent "ghost" cells connected by dotted stride-0 wires, indicating virtual memory reuse without byte allocation.
  - Dimension Conflict Error Flash: If shapes are incompatible (e.g. 3 vs 4), the offending dimension blocks turn violent red, and an error barrier blocks the operation.
* **5. Web Audio Sonification Hooks:**
  - Dimension Alignment Click: Clean magnetic lock click (`playClick(1.8)`).
  - Virtual Stretch Slide: Harmonious swelling pad chord (root + fifth) as dimensions expand.
  - Incompatible Shape Rejection: Harsh tritone dissonance (`playErrorDissonance()`).

---

### MODULE 14: Tabular Wrangling & Tidy Data Architecture

#### LESSON-T2-19: DataFrame Anatomy: BlockManager & Homogeneous Column Chunks
* **Primary Target:** Peek under the Pandas hood: a DataFrame is not a 2D matrix, but a collection of 1D `Series` managed by a `BlockManager` grouping columns of identical dtype into 2D ndarrays.
* **1. Component Identifier:** `DataFrameBlockManagerLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Top View (`y: 40..180`): **User DataFrame View**. A familiar spreadsheet with columns: `['age' (int64), 'fare' (float64), 'survived' (int64), 'weight' (float64), 'embarked' (object)]`.
  - Bottom View (`y: 220..480`): **Internal BlockManager Storage**. Separate physical memory blocks:
    * `IntBlock (2 x N)`: Holding `age` and `survived`.
    * `FloatBlock (2 x N)`: Holding `fare` and `weight`.
    * `ObjectBlock (1 x N)`: Holding `embarked` string pointers.
* **3. Tactile Interactive Levers:**
  - `Column Reorder Handle`: Drag column `fare` to the front of the DataFrame; observe that the logical view updates instantly while the internal BlockManager performs 0 memory copies.
  - `Dtype Mutation Switch`: Cast column `survived` from `int64` to `float64`; watch the column physically rip out of `IntBlock` and migrate into `FloatBlock`.
  - `Consolidate Blocks Button`: Manually trigger `df._consolidate()`.
* **4. Visual Feedback & Animations:**
  - Block Migration Flight: When a dtype changes, column cells illuminate amber, detach from their block, and smoothly float across the canvas into their new homogeneous dtype container.
  - Pointer Cross-Wiring: Dynamic colored spline lines connect logical column headers to their physical row indices inside internal blocks.
* **5. Web Audio Sonification Hooks:**
  - Logical Header Reorder: Crisp card shuffle click (`playClick(1.5)`).
  - Dtype Migration (Type Cast): Metallic whoosh followed by solid thud ($f = 220 \text{ Hz}$).
  - Block Consolidation Chime: C-major chord arpeggio (`playVictoryHarmonics()`).

---

#### LESSON-T2-20: Dimensional Slicing: `loc` (Label) vs `iloc` (Integer) Calipers
* **Primary Target:** Eliminate the #1 beginner data analysis bug: distinguishing label-based closed-interval slicing (`loc`, inclusive of endpoints) from zero-based half-open integer position slicing (`iloc`, exclusive of end).
* **1. Component Identifier:** `LocIlocCaliperLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Center Grid (`x: 160..840, y: 100..460`): 2D Tabular Grid with custom non-sequential row labels (`['obs_101', 'obs_102', 'obs_105', 'obs_109']`) and column names (`['A', 'B', 'C', 'D']`).
  - Left & Top Rulers: Dual measurement scales:
    * Inner Ruler: Integer offsets $0, 1, 2, 3$ (`iloc`).
    * Outer Ruler: String index labels (`loc`).
* **3. Tactile Interactive Levers:**
  - `Mode Selector`: Toggle between `.loc[...]` and `.iloc[...]`.
  - `Horizontal Caliper Slide`: Draggable translucent caliper bracket setting row bounds.
  - `Vertical Caliper Slide`: Draggable translucent caliper bracket setting column bounds.
  - `Endpoint Inclusivity Toggle`: Observe how `'obs_101':'obs_105'` in `loc` includes `'obs_105'`, while `0:2` in `iloc` stops before index 2.
* **4. Visual Feedback & Animations:**
  - Caliper Highlight Bounding Box: Selected rectangular cell region glows in translucent cyan (`#06B6D4` with 25% alpha); non-selected cells dim.
  - Edge Inclusive vs Exclusive Flashing: In `loc`, the right/bottom boundary line turns solid green with an `INCLUSIVE [a, b]` tag; in `iloc`, the boundary turns dashed amber with `EXCLUSIVE [a, b)`.
* **5. Web Audio Sonification Hooks:**
  - Caliper Drag: Velocity-proportional mechanical scrub tick (`playScrubTick(vel)`).
  - Boundary Snap: Clean tactile switch click (`playClick(1.8)`).
  - Off-by-One Warning Buzzer: Dissonant click if user confuses integer indices inside `.loc`.

---

#### LESSON-T2-21: Tidy Data Architecture: Pivot, Melt & Normal Form Morphing
* **Primary Target:** Internalize Hadley Wickham's Tidy Data principles: (1) each variable forms a column, (2) each observation forms a row, (3) each type of observational unit forms a table. Master `pivot()` (long to wide) and `melt()` (wide to long).
* **1. Component Identifier:** `TidyDataMorphLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Tri-Color Semantic Encoding:
    * Variable Identifier (`id_vars`): **Cyan** (`#06B6D4`).
    * Measurement Category (`var_name`): **Violet** (`#8B5CF6`).
    * Numerical Observation (`value_name`): **Amber** (`#F59E0B`).
  - Layout: Dynamic table grid whose row-column layout morphs continuously as an interpolation parameter $t \in [0.0, 1.0]$ transitions between Wide and Long formats.
* **3. Tactile Interactive Levers:**
  - `Tidy Morph Slider`: Scrub $t \in [0, 1]$ to watch wide columns unpivot and fold downward into long key-value rows.
  - `Pivot Index / Column / Value Dropdowns`: Configure pivot parameters.
  - `Data Tidiness Validator Button`: Audits table structure and highlights repeated non-atomic headers.
* **4. Visual Feedback & Animations:**
  - Cell Trajectory Interpolation: During `melt()`, column header cells (`'Q1'`, `'Q2'`, `'Q3'`) rotate 90 degrees, shrink, and slide downward into the new `'Quarter'` column, while values slide into their corresponding row positions along smooth spline paths.
* **5. Web Audio Sonification Hooks:**
  - Morph Scrub: Continuous frequency glide ($220 \text{ Hz} \to 440 \text{ Hz}$ as table folds).
  - Cell Grid Lock: Rhythmic cascade of light clicks as 16 cells lock into their new grid coordinates.
  - Tidy Validation Pass: Crystal chime (`playVictoryHarmonics()`).

---

#### LESSON-T2-22: GroupBy Mechanics: Split-Apply-Combine Pipeline
* **Primary Target:** Visualize the 3 distinct phases of data aggregation: (1) **Split** table into non-overlapping bucket subsets by hash keys, (2) **Apply** vectorized kernel aggregation (`mean`, `sum`, `std`) in parallel, (3) **Combine** results into a unified aggregated index.
* **1. Component Identifier:** `GroupBySplitApplyCombineLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Phase 1 (Left, `x: 40..260`): **Input Table** with heterogeneous rows colored by category: `'A'` (Emerald), `'B'` (Cyan), `'C'` (Amber).
  - Phase 2 (Center, `x: 340..580`): **Split Buckets**. 3 isolated glass Petri-dish containers holding grouped rows.
  - Phase 3 (Right, `x: 660..860`): **Combined Table**. 3 aggregated summary rows with group indexes.
* **3. Tactile Interactive Levers:**
  - `GroupBy Key Dropdown`: Group by single key (`'category'`) or multi-index compound keys (`['region', 'category']`).
  - `Aggregation Kernel Selector`: Toggle between `sum()`, `mean()`, `count()`, `transform()`, `filter()`.
  - `Step Execution Lever`: Step through: 1. Split $\to$ 2. Apply $\to$ 3. Combine.
* **4. Visual Feedback & Animations:**
  - Split Dispersion: On Split, rows physically slide out of the master table and fly into their respective group buckets with spring-damped trajectories.
  - Apply Compression: Inside each bucket, rows visually flatten together, compressing into a single glowing summary pellet.
  - Combine Assembly: Summary pellets shoot across to the right to form the final compact aggregation DataFrame.
* **5. Web Audio Sonification Hooks:**
  - Split Burst: Quick 3-tone downward sweep ($600 \text{ Hz} \to 300 \text{ Hz}$).
  - Apply Compression: Deep resonant mechanical press thud ($f = 130 \text{ Hz}$).
  - Combine Finalization: High triumphant chord (`playVictoryHarmonics()`).

---

### MODULE 15: Relational Algebra & Declarative SQL

#### LESSON-T2-23: Relational Algebra Operators: Selection $\sigma$, Projection $\pi$ & Cross Product $\times$
* **Primary Target:** Ground declarative SQL in formal relational algebra: $\sigma_{\text{cond}}(R)$ (row filtering), $\pi_{A, B}(R)$ (column reduction), and $R \times S$ (Cartesian multiplication cardinality $|R| \cdot |S|$).
* **1. Component Identifier:** `RelationalAlgebraGridLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Left Zone (`x: 40..380`): Relation $R$ ($N=5, K=4$) and Relation $S$ ($M=3, L=2$).
  - Center Zone (`x: 420..500`): Relational Operator Laser Gate ($\sigma$, $\pi$, or $\times$).
  - Right Zone (`x: 540..860`): Resulting Output Relation.
* **3. Tactile Interactive Levers:**
  - `Operator Dial`: Select between $\sigma_{\text{salary} > 50000}$, $\pi_{\text{id, name}}$, $R \times S$, $R \bowtie S$.
  - `Predicate Slider`: Adjust filtering threshold in $\sigma$; watch passing rows dynamically light up while failing rows turn red and disintegrate.
  - `Cartesian Cross-Product Trigger`: Expand $R \times S$; watch the grid blossom from 5 rows into $5 \times 3 = 15$ combination rows.
* **4. Visual Feedback & Animations:**
  - Projection Slicing ($\pi$): A vertical guillotine laser drops across unselected column headers; the columns slice off and dissolve into particles, while selected columns shift together seamlessly.
  - Selection Filtration ($\sigma$): Horizontal sieve grid where rows with `salary <= 50000` fall through floor traps into the void.
* **5. Web Audio Sonification Hooks:**
  - Column Slice ($\pi$): Sharp metallic blade swipe ($1200 \text{ Hz} \to 400 \text{ Hz}$, 30ms).
  - Row Sieve Pass ($\sigma$): Rapid sequence of light ascending clicks for surviving tuples.
  - Cross Product Explosion: Rumbling bass expansion drone as cardinality multiplies.

---

#### LESSON-T2-24: Declarative SQL Execution Pipeline
* **Primary Target:** Break the illusion that SQL executes top-to-bottom. Visualize actual engine evaluation order: `FROM` $\to$ `ON` $\to$ `JOIN` $\to$ `WHERE` $\to$ `GROUP BY` $\to$ `HAVING` $\to$ `SELECT` $\to$ `DISTINCT` $\to$ `ORDER BY` $\to$ `LIMIT`.
* **1. Component Identifier:** `SqlExecutionPipelineCanvas`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Left Panel (`x: 40..320`): Written SQL Query text with glowing syntax blocks.
  - Right Panel (`x: 360..860`): Vertical 8-stage assembly tower representing execution order.
* **3. Tactile Interactive Levers:**
  - `Pipeline Stage Step Lever`: Step through the physical execution sequence. Notice `WHERE` executes *before* `SELECT` (explaining why aliases defined in `SELECT` cannot be used in `WHERE`).
  - `Query Clause Toggles`: Toggle clauses (`HAVING`, `DISTINCT`, `LIMIT 3`) on/off; watch intermediate data row counts expand or contract at that exact stage.
* **4. Visual Feedback & Animations:**
  - Active Clause Spotlight: As the engine advances, the written SQL text jumps out of lexical order: the spotlight jumps from line 4 (`FROM`) to line 6 (`WHERE`) to line 1 (`SELECT`) to line 7 (`ORDER BY`), highlighting syntax in execution sequence.
  - Row Count Valve: At each stage, an animated fluid tube transfers rows; after `WHERE`, the stream narrows; after `LIMIT`, a physical gate drops to shut off flow.
* **5. Web Audio Sonification Hooks:**
  - Stage Advancement: Heavy pneumatic click (`playClick(1.4)`).
  - Out-of-Order Syntax Leap: High electronic beep ($880 \text{ Hz}$).
  - Final Result Delivery: Full Major-9th victory chime (`playVictoryHarmonics()`).

---

#### LESSON-T2-25: Relational Join Geometry: Hash Join Build/Probe & Cartesian Merges
* **Primary Target:** Understand modern relational join engines: Hash Join (Build phase on smaller relation, Probe phase streaming larger relation) vs Nested Loop vs Sort-Merge.
* **1. Component Identifier:** `RelationalJoinGeometryLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Top Left (`x: 40..340, y: 40..220`): **Build Table** (Left table $R$, 4 rows).
  - Center (`x: 380..520, y: 120..380`): **In-Memory Hash Table** with hashed join key buckets.
  - Top Right (`x: 560..860, y: 40..220`): **Probe Table** (Right table $S$, 8 rows).
  - Bottom Pane (`x: 150..750, y: 410..520`): **Joined Output Table**.
* **3. Tactile Interactive Levers:**
  - `Join Type Selector`: 4-way tab switch: `INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN`.
  - `Hash Join Execution Crank`: Turn crank to advance:
    * Phase 1: Build in-memory hash table on Table $R$.
    * Phase 2: Stream Table $S$ rows through hash table to probe matching keys.
  - `Unmatched Row Toggle`: Inject rows into Left or Right with no match in the other table.
* **4. Visual Feedback & Animations:**
  - Hash Bucket Alignment: Matching probe keys trigger a bright green connector beam; tuples fuse together and drop into the output table.
  - Outer Join Preservation: In `LEFT JOIN`, an unmatched row lingering in the Build buffer turns violet, generates `NULL` values for the right columns, and slides gently into the output table.
* **5. Web Audio Sonification Hooks:**
  - Build Phase Ingestion: Rapid series of 4 wooden taps ($400 \text{ Hz}$).
  - Probe Match: Resonant bell chime ($f = 659.25 \text{ Hz}$, E5).
  - Unmatched Outer Row (NULL padding): Soft synth pad swell ($330 \text{ Hz}$).
  - No Match (Inner Join discard): Muted thud (`playCacheMiss()`).

---

### MODULE 16: Advanced Analytical SQL: Windows & CTEs

#### LESSON-T2-26: Window Function Frames: `PARTITION BY`, `ORDER BY` & Rolling Calipers
* **Primary Target:** Master analytical window functions: calculating aggregates across partitioned subsets without collapsing row identity, using explicit sliding calipers (`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`).
* **1. Component Identifier:** `WindowFunctionFrameLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Main Canvas (`x: 40..860, y: 40..480`): Tabular rows sorted by `dept` (`'Engineering'`, `'Sales'`) and ordered by `salary`.
  - Partition Brackets: Heavy violet vertical brackets grouping rows into department clusters.
  - Window Frame Caliper: Translucent glowing cyan sliding glass window surrounding the current row's frame bounds.
* **3. Tactile Interactive Levers:**
  - `Frame Specification Selector`: Toggle:
    * `ROWS UNBOUNDED PRECEDING AND CURRENT ROW` (Running Total)
    * `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` (3-Point Moving Average)
    * `RANGE BETWEEN 1000 PRECEDING AND 1000 FOLLOWING` (Value Range Frame)
  - `Current Row Scrubber`: Scrub the active row pointer $i \in [0..11]$ from top to bottom.
  - `Partition Toggle`: Toggle `PARTITION BY dept` on/off to watch frame boundaries either respect or ignore department borders.
* **4. Visual Feedback & Animations:**
  - Sliding Glass Caliper: As the active row scrubs, the cyan window frame glides with spring physics; rows inside the frame illuminate with an internal glow while contributing to the live accumulator badge.
  - Partition Wall Bounce: When the caliper reaches a department border under `PARTITION BY`, the frame snaps firmly against the partition wall and refuses to extend into the next department.
* **5. Web Audio Sonification Hooks:**
  - Frame Slide Scrub: Continuous rotary dial tick (`playScrubTick(vel)`).
  - Partition Wall Boundary Collision: Firm mechanical clamp click (`playClick(2.0)`).
  - Live Window Aggregation: Pure sine tone whose pitch modulates proportionally with the running window average.

---

#### LESSON-T2-27: Positional & Ranking Windows: `LEAD`, `LAG`, `RANK` & `DENSE_RANK`
* **Primary Target:** Distinguish positional pointer lookahead/lookbehind (`LAG(col, 1)`, `LEAD(col, 1)`) and tie-handling ranking semantics (`ROW_NUMBER()` vs `RANK()` vs `DENSE_RANK()`).
* **1. Component Identifier:** `PositionalWindowOffsetLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 520` px.
  - Data Column Grid (`x: 60..500`): Employee leaderboard with tied scores: `[100, 95, 95, 90, 80]`.
  - Function Output Columns (`x: 540..860`): 4 comparative columns:
    * `ROW_NUMBER()`: Strict sequential `1, 2, 3, 4, 5`.
    * `RANK()`: Gap rank `1, 2, 2, 4, 5`.
    * `DENSE_RANK()`: Gapless rank `1, 2, 2, 3, 4`.
    * `LAG(val, 1)`: Offset arrow pointing to prior row.
* **3. Tactile Interactive Levers:**
  - `Score Tie Injector`: Drag scores around to create 2-way, 3-way, or 4-way ties.
  - `LAG/LEAD Offset Stepper`: Dial offset parameter $k \in [-3, 3]$.
  - `Default Fallback Input`: Change `LAG(col, 1, 0)` default value from `NULL` to `0`.
* **4. Visual Feedback & Animations:**
  - Pointer Arc: A curved cyan vector arrow reaches backward from row $i$ to row $i - k$, physically fetching the value.
  - Tie-Detection Radar: Tied rows are enveloped by a pulsating amber tie bracket; the skipped rank in `RANK()` is marked with an animated red strike-through (`3` crossed out, jumping to `4`).
* **5. Web Audio Sonification Hooks:**
  - Offset Reach (`LAG`/`LEAD`): Swift two-tone whoosh ($440 \text{ Hz} \to 880 \text{ Hz}$).
  - Rank Jump Gap: Sharp warning click on skipped ranks.
  - Dense Rank Sequence: Pleasant chromatic glockenspiel scale.

---

#### LESSON-T2-28: Common Table Expressions (CTEs) & Recursive Graph Traversal
* **Primary Target:** Model both non-recursive modular query DAGs and recursive CTE mechanics: Anchor Member $\cup_{\text{ALL}}$ Recursive Member iterating until an empty set termination condition.
* **1. Component Identifier:** `RecursiveCteGraphLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Left Pane (`x: 40..380`): Hierarchical tree/graph of organizational hierarchy or network graph nodes.
  - Right Pane (`x: 420..860`): **Recursive Work Table Stack**:
    * Anchor Member Slot: Base seed query ($R_0$).
    * Intermediate Worktable Slot: Active working set ($R_i$).
    * Cumulative Union Result Slot: Consolidated output ($R_0 \cup R_1 \cup \dots \cup R_n$).
* **3. Tactile Interactive Levers:**
  - `Step Recursion Iteration Crank`: Turn crank to execute iteration $i$: evaluate recursive term, join with prior worktable, and deposit into cumulative result.
  - `Graph Topology Selector`: Choose between `Organizational Hierarchy (Tree)`, `Flight Routes (DAG)`, `Cyclic Graph (Infinite Loop Hazard)`.
  - `Cycle Prevention Toggle`: Toggle `UNION` vs `UNION ALL` or depth limit guards.
* **4. Visual Feedback & Animations:**
  - Wavefront Propagation: Each recursion step lights up the next tier of graph nodes with a glowing blue wavefront.
  - Worktable Emptying: Intermediate worktable rows slide into the cumulative bucket, and if no new rows are generated, the worktable goes dark, triggering natural termination.
  - Infinite Cycle Warning: If a cycle is detected without guards, the worktable fills with flashing red warning lines and an emergency circuit breaker trips.
* **5. Web Audio Sonification Hooks:**
  - Anchor Execution: Solid foundation bass chord ($110 \text{ Hz}$).
  - Recursive Iteration Pulse: Rhythmic electronic pulse rising in pitch by one whole tone per iteration ($220, 246.94, 277.18, 293.66 \text{ Hz}$).
  - Natural Termination: Soft melodic resolution chime (`playVictoryHarmonics()`).
  - Cycle Detected Alarm: Rapid strobe dissonance (`playErrorDissonance()`).

---

### MODULE 17: Modern Columnar Engines (Arrow, DuckDB, Polars)

#### LESSON-T2-29: Columnar Storage, Apache Arrow Buffers & Zero-Copy IPC
* **Primary Target:** The architecture of modern data engineering: comparing row-oriented (CSV, SQLite) vs columnar (Parquet, Arrow) data layouts, null bitmasks, offset buffers, and zero-copy shared memory transfers between Python, DuckDB, and Polars.
* **1. Component Identifier:** `ArrowBufferMemoryLayoutLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Left Half (`x: 40..420`): **Row-Oriented Buffer (CSV / OLTP)**. Interleaved byte records `[ID | Name | Age | ID | Name | Age]`. Scanning `Age` requires hopping over unused string and ID bytes (cache line thrashing).
  - Right Half (`x: 460..860`): **Apache Arrow Columnar Layout**. 3 contiguous buffers for the `Name` column:
    1. `Validity Bitmap`: 1-bit flags for NULLs (`1101...`).
    2. `Offsets Buffer`: 32-bit integer byte offsets (`[0, 5, 9, 9, 14]`).
    3. `Data Buffer`: Raw contiguous ASCII/UTF-8 character bytes (`"AliceBobDavid"`).
* **3. Tactile Interactive Levers:**
  - `Layout Toggle Switch`: Switch between `Row-Major` and `Columnar Arrow`.
  - `Single Column Aggregation Probe`: Click "Calculate Average Age"; watch the CPU cache line scanner sweep across memory.
  - `Zero-Copy IPC Transfer Button`: Transfer 10,000,000 rows from Polars to DuckDB via PyCapsule interface; observe memory allocation stay exactly at 0 bytes while pointer swaps instantly.
* **4. Visual Feedback & Animations:**
  - Cache Line Efficiency Visualizer:
    * In row format: Red cache lines load into CPU with 75% wasted space (greyed out non-age bytes).
    * In Arrow format: Bright cyan cache lines load at 100% saturation; pure SIMD contiguous float packing.
  - Zero-Copy Flash: A golden pointer bridge links between the Polars logo and DuckDB logo; memory block stays immobile while a small 64-bit arrow descriptor hops across in 1 millisecond.
* **5. Web Audio Sonification Hooks:**
  - Row Cache Thrash: Muffled, muddy rapid clicks with multiple low-frequency thuds.
  - Columnar SIMD Sweep: High-speed pure resonant tone sweeping cleanly across the buffer.
  - Zero-Copy Handshake: Distinctive crystal ring chime ($f = 1760 \text{ Hz}$, A6, pure envelope).

---

#### LESSON-T2-30: Polars & DuckDB Query Optimization: Lazy Execution DAGs & Pushdown Predicates
* **Primary Target:** Understand query optimization in modern engines: building a LazyFrame DAG, predicate pushdown (filtering at the storage layer before reading columns), projection pushdown (reading only required columns), and vectorized chunk execution.
* **1. Component Identifier:** `PolarsLazyExecutionGraphLab`
  - Engine: `canvas2d`
* **2. Visual Layout & Coordinate System:**
  - Viewport: `900 x 540` px.
  - Split Canvas:
    * Left Stage (`x: 40..420`): **Unoptimized Physical Plan DAG**. Naive execution: Scan 50 columns $\to$ Read 10,000,000 rows $\to$ Filter $\to$ Select 2 columns.
    * Right Stage (`x: 480..860`): **Optimized Pushdown Plan DAG**. Pushdowns applied: Filter pushed into Parquet scan $\to$ read only 2 columns $\to$ process 1,000 rows.
* **3. Tactile Interactive Levers:**
  - `Optimization Passes Toggle`: Checkboxes for:
    * `Predicate Pushdown`
    * `Projection Pushdown`
    * `Common Subplan Elimination`
    * `Slice Pushdown`
  - `Explain Graph Scrub Lever`: Scrub execution timeline to watch optimizer re-write and re-parent AST tree nodes.
  - `Data Volume Slider`: Dial input dataset size from $100 \text{ MB}$ to $50 \text{ GB}$; view live I/O disk throughput meter.
* **4. Visual Feedback & Animations:**
  - Node Migration Animation: When `Predicate Pushdown` is activated, the `FILTER` node slides downward through the DAG, passing through joins and projections, docking directly onto the `PARQUET_SCAN` node at the base.
  - I/O Bandwidth Bar: Visual disk read pipe shrinks from a wide red 50 GB torrent to a slender emerald 12 MB trickle; query time counter drops from 14.2s to 0.04s.
* **5. Web Audio Sonification Hooks:**
  - Optimizer Rewrite Snap: Crisp mechanical snap as AST nodes re-link (`playClick(2.2)`).
  - Predicate Slide: Smooth downward pitch dive as filter descends into scan layer ($880 \text{ Hz} \to 220 \text{ Hz}$).
  - Sub-Second Execution Finish: Triumphant orchestral major-9th chord (`playVictoryHarmonics()`).

---

## 4. Master Architectural Summary Matrix (All 30 Lessons)

| Module | Lesson ID | Simulation Component | Viewport / Coord System | Primary Interactive Levers | Visual Feedback & Animations | Procedural Sonification Signature |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MOD-08** | `LESSON-T2-01` | `EnvironmentFrameCanvas` | 900x520 Stack (Left) + Heap (Right) | Code stepper slider, refcount drag handle | Elastic pointer arrows, refcount badge pulse | Heap alloc ping (587Hz), zero-ref thud (65Hz) |
| **MOD-08** | `LESSON-T2-02` | `ControlFlowGraphLab` | 900x540 Bytecode strip + CFG DAG | Condition toggle, instruction scrub dial | Glowing basic blocks, branch beam pulse | Relay click (1.2x), branch interval (440->660Hz) |
| **MOD-08** | `LESSON-T2-03` | `ScopeChainInspector` | 900x520 Concentric isometric frames | Identifier search input, depth slider | Radial LEGB search ray, scope hit glow | Scope layer tap (300->600Hz), NameError clash |
| **MOD-09** | `LESSON-T2-04` | `ReferentialTransparencyLab` | 900x500 Pure vs Impure dual stage | Equational substitution lever, state dial | Expression-to-value collapse, purity aura | Crystalline drop (1046Hz), dirty state buzz |
| **MOD-09** | `LESSON-T2-05` | `HigherOrderPipelineCanvas` | 900x520 3-Stage conveyor assembly line | Lambda cartridge sockets, speed knob | Discard particle bounce, fusion sphere | Discard tick, pentatonic pluck, reduce bass gong |
| **MOD-09** | `LESSON-T2-06` | `ClosureScopeInspector` | 900x540 Outer frame + closure backpack | Scope severing blade, cell inspector | Umbilical purple cord, onion skinning | Frame pop whistle, cell latch lock (2.5x) |
| **MOD-10** | `LESSON-T2-07` | `PointerAliasingLab` | 900x520 Variable shelf + heap nodes | Clone mode switch (ref/shallow/deep) | Synchronous aliased flash, pointer reroute | Stereo ping (440/880Hz), mutation shock buzz |
| **MOD-10** | `LESSON-T2-08` | `DynamicArrayGrowthLab` | 900x500 1D RAM map + amortized plot | Append button, burst append slider | Reallocation shockwave, element flight | O(1) click (1.5x), O(N) copy thud + sweep |
| **MOD-10** | `LESSON-T2-09` | `RecursionTreeExplorer` | 900x560 Call stack (L) + Fractal Tree (R) | Function picker, base-case sabotage | Push/pop stack slide, tree blossoming | Ascending xylophone stack tick, base chime |
| **MOD-11** | `LESSON-T2-10` | `HashTableBucketLab` | 900x520 SipHash bit strip + 8 buckets | Key injection bar, collision injector | Bit shower cascade, ballistic probe hop | Bit flurry click, direct click, collision buzz |
| **MOD-11** | `LESSON-T2-11` | `CompactDictLayoutLab` | 900x520 Sparse indices + dense entries | Insert pair, tombstone delete trigger | Two-stage lookup beam, compaction gauge | Sparse tick (1.8x), dense bass note (180Hz) |
| **MOD-12** | `LESSON-T2-12` | `BigOComplexityRacer` | 900x520 6-Lane racetrack + Cart. plot | Scale knob N (10..10^9), CPU throttle | Relative velocity sprint,TSP stall smoke | O(1) chime, O(N) climb, O(N^2) stall drone |
| **MOD-12** | `LESSON-T2-13` | `DunderProtocolDispatchLab` | 900x500 Syntax (L) + Slot Table (R) | Syntax selector cards, fallback switch | Mechanical relay routing, bridge lowering | Switchboard click, dunder piano note (523Hz) |
| **MOD-12** | `LESSON-T2-14` | `IteratorStateMachineCanvas` | 900x520 Iterable array + wheeled cart | iter() lever, next() hand crank | Pointer spring hop, StopIteration bumper | Cart pneumatic whistle, ratchet tick, bell ping |
| **MOD-12** | `LESSON-T2-15` | `GeneratorSuspensionLab` | 900x540 Suspended frame + stream pipe | Pull value button, length dial (10..10^7) | Cryo-freeze frost, instant wake glow | Yield descending sigh (600->180Hz), wake click |
| **MOD-13** | `LESSON-T2-16` | `SimdVsLoopBenchmarkLab` | 900x540 Split: CPython (T) vs AVX2 (B) | Register width toggle (64/256/512-bit) | Contiguous parallel pulse, turtle crawl | CPython wooden click, SIMD 4-voice laser chord |
| **MOD-13** | `LESSON-T2-17` | `StrideMemoryGridLab` | 900x520 1D byte ribbon + 2D grid view | Stride thumbwheels (s0, s1), slice input | Zero-copy badge, stride connector arcs | Rotary scrub tick, zero-copy glass ping (1760Hz) |
| **MOD-13** | `LESSON-T2-18` | `BroadcastingAlignmentGrid` | 900x540 Trailing shape match + 3D grid | Shape A/B dials, stretch slider | Stride-0 ghost column duplication | Magnetic lock click, dimension stretch pad |
| **MOD-14** | `LESSON-T2-19` | `DataFrameBlockManagerLab` | 900x520 Logical table + BlockManager | Column reorder handle, dtype cast switch | Block migration flight, pointer wiring | Card shuffle click, dtype migration thud (220Hz) |
| **MOD-14** | `LESSON-T2-20` | `LocIlocCaliperLab` | 900x520 Dual-ruler grid (label/offset) | loc vs iloc toggle, 2D caliper sliders | Translucent caliper box, inclusive flash | Caliper scrub tick, boundary clamp click |
| **MOD-14** | `LESSON-T2-21` | `TidyDataMorphLab` | 900x540 Tri-color semantic morph grid | Morph slider t (0..1), pivot dropdowns | Cell trajectory interpolation, header turn | Morph frequency glide (220->440Hz), lock clicks |
| **MOD-14** | `LESSON-T2-22` | `GroupBySplitApplyCombineLab` | 900x540 3-Stage: Split -> Apply -> Combine | GroupBy key dropdown, aggregation kernel | Split row flight, apply compression pellet | Split burst (600->300Hz), apply press thud |
| **MOD-15** | `LESSON-T2-23` | `RelationalAlgebraGridLab` | 900x520 Relations R/S + operator gate | Operator dial (sigma, pi, cross, join) | Laser column slice, row sieve trapdoor | Metallic guillotine swipe, sieve pass clicks |
| **MOD-15** | `LESSON-T2-24` | `SqlExecutionPipelineCanvas` | 900x540 SQL text (L) + 8-stage tower (R) | Stage step lever, clause toggles | Out-of-order syntax leap, fluid stream | Pneumatic stage click, syntax leap beep (880Hz) |
| **MOD-15** | `LESSON-T2-25` | `RelationalJoinGeometryLab` | 900x540 Build/Probe tables + Hash Table | Join tab switch, execution crank | Hash connector beam, outer row NULL pad | Build taps (400Hz), probe bell chime (659Hz) |
| **MOD-16** | `LESSON-T2-26` | `WindowFunctionFrameLab` | 900x540 Table rows + partition brackets | Frame spec selector, row scrubber | Sliding glass caliper, partition wall snap | Caliper scrub tick, partition clamp, running pitch |
| **MOD-16** | `LESSON-T2-27` | `PositionalWindowOffsetLab` | 900x520 Leaderboard grid + 4 rank cols | Score tie injector, offset stepper k | Backward pointer arc, rank tie bracket | Offset whoosh (440->880Hz), tie gap click |
| **MOD-16** | `LESSON-T2-28` | `RecursiveCteGraphLab` | 900x540 Graph nodes (L) + worktable (R) | Iteration crank, cycle toggle | Wavefront blue propagation, circuit trip | Anchor chord (110Hz), recursive rising pulse |
| **MOD-17** | `LESSON-T2-29` | `ArrowBufferMemoryLayoutLab` | 900x540 Row buffer (L) vs Arrow buffer (R) | Layout toggle, zero-copy IPC button | Cache line fill comparison, pointer swap | Row thrash thuds, Arrow SIMD resonant sweep |
| **MOD-17** | `LESSON-T2-30` | `PolarsLazyExecutionGraphLab` | 900x540 Naive DAG (L) vs Pushdown DAG (R) | Optimization toggles, explain scrubber | Node downward migration, I/O pipe shrink | Optimizer rewrite snap, filter dive (880->220Hz) |

---

## 5. Simulation Component Interface Contract & TypeScript Schema

All Track 2 simulation components conform to the unified Okvir simulation widget contract:

```typescript
import React from 'react';

export interface BaseSimulationProps {
  /** Width of the simulation viewport in CSS pixels (default: 900) */
  width?: number;
  /** Height of the simulation viewport in CSS pixels (default: 520) */
  height?: number;
  /** High-DPI backing store scaling factor (defaults to window.devicePixelRatio || 2.0) */
  devicePixelRatio?: number;
  /** Callback fired when user achieves pedagogical challenge milestone */
  onMasteryAchieved?: (metric: { challengeId: string; attempts: number; durationMs: number }) => void;
  /** Global audio engine reference for procedural sonification */
  audioEngine?: ProceduralAudioEngine;
}

export interface EnvironmentFrameCanvasProps extends BaseSimulationProps {
  initialCode?: string;
  autoStep?: boolean;
}

export interface SimdVsLoopBenchmarkLabProps extends BaseSimulationProps {
  vectorWidth: 64 | 256 | 512;
  arrayLength: number;
}

export interface WindowFunctionFrameLabProps extends BaseSimulationProps {
  dataset: 'departments' | 'stock_prices' | 'website_sessions';
  initialFrame: 'ROWS_UNBOUNDED' | 'ROWS_CURRENT_PRECEDING' | 'RANGE_INTERVAL';
}

export interface ArrowBufferMemoryLayoutLabProps extends BaseSimulationProps {
  initialEngine: 'pandas' | 'arrow' | 'duckdb' | 'polars';
  enableIpcDemonstration: boolean;
}
```

---

## 6. Implementation Readiness & Quality Assurance Checklist

- [x] All 30 lessons across MOD-08 through MOD-17 have unique, explicit component identifiers.
- [x] Viewport resolutions, aspect ratios (16:9 / 16:10), and coordinate subdivisions are completely documented.
- [x] Tactile interactive levers (calipers, dials, sliders, switches) specify exact ranges, step increments, and physics models.
- [x] Visual feedback systems specify exact 60 FPS animation behaviors, state transitions, and high-contrast color tokens.
- [x] Procedural Web Audio sonification hooks link directly into the offline zero-asset `ProceduralAudioEngine` API with concrete pitch, envelope, and haptic specifications.
