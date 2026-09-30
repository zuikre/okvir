# OKVIR Track 4: Deep Learning, Transformers & Frontier AI
## Complete Visual & Interactive Simulation Architecture Specification (33 Lessons • MOD-35 to MOD-46)

> **Document Version:** `1.0.0-PROD-SPEC`  
> **Target Platform:** OKVIR Desktop & Web (Tauri v2 + Vite + React 18 + HTML5 Canvas2D / WebGL / Web Audio API)  
> **Frame Performance Target:** Strictly 60 FPS (Frame budget $\le 16.67\text{ ms}$; zero-allocation render loop)  
> **Audio Architecture:** 100% Procedural Web Audio API (`ProceduralAudioEngine.ts` • Zero external asset dependencies)  
> **Primary Artifact Location:** `/home/zuikre/.gemini/antigravity/brain/8a993be9-ec32-4cc7-bf1c-ed4489f8318a/TRACK4_VISUALS_AND_SIMULATION_SPEC.md`

---

## 1. Architectural Foundations & Design System

### 1.1 The 16.67 ms 60 FPS Frame Budget
Every simulation component in Track 4 strictly adheres to the hard real-time execution budget:

```
┌────────────────────────────────────────────────────────────────────────┐
│               16.67ms HARD FRAME BUDGET BREAKDOWN (60 FPS)             │
└────────────────────────────────────────────────────────────────────────┘
  [ 1. Mathematical Model State Update & Numerical Integration: <= 3.5ms ]
  [ 2. Coordinate System Transformations, Normalization & Clamping: <= 1.5ms ]
  [ 3. Canvas2D / WebGL Rasterization & Dynamic Vector Paths:   <= 6.0ms ]
  [ 4. Procedural Web Audio Sonification & DOM Event Synthesis: <= 2.5ms ]
  [ 5. Frame Headroom & Garbage Collection Prevention Buffer:    >= 3.17ms ]
```

#### Zero-Allocation Render Loop Contract
1. **Pre-allocated Typed Buffers:** All coordinates, activation arrays, particle vectors, and attention matrices use statically allocated `Float32Array` or `Float64Array`. Object instantiation (`new Object()`, `{ ... }`, `[ ... ]`) within `requestAnimationFrame` is strictly forbidden.
2. **HiDPI Retina Normalization:** All canvases auto-bind to window `devicePixelRatio` (`dpr = window.devicePixelRatio || 1`). Canvases set `canvas.width = rect.width * dpr` and `ctx.scale(dpr, dpr)` on mount and resize.
3. **Delta-Time Decoupling:** Continuous differential equations (Runge-Kutta 4, Langevin diffusion, SGD momentum) integrate with fixed sub-stepping $\Delta t \le 0.016\text{ s}$ to guarantee invariance across 60Hz, 120Hz ProMotion, and 144Hz displays.

---

### 1.2 Color Token Semantics & Visual Hierarchy

| Visual Channel | Hex Code | Semantic Meaning in Track 4 |
| :--- | :--- | :--- |
| **Forward Signal** | `#10B981` (Emerald 500) | Forward activations, tensor outputs, positive loss improvements, valid tokens |
| **Backward Adjoint** | `#F59E0B` (Amber 500) | Reverse-mode gradients $\frac{\partial L}{\partial v}$, gradient flow vectors, Jacobian pulses |
| **Gradient Error / Clash**| `#EF4444` (Rose 500) | High loss, dead ReLU, gradient explosion, attention overflow, rejected DPO response |
| **Base / Frozen Weights**| `#64748B` (Slate 500) | Frozen pre-trained LLM weights ($W_0$), static memory blocks, baseline embeddings |
| **LoRA / Active Adapter**| `#06B6D4` (Cyan 500) | Low-rank adapter matrices ($B, A$), dynamic rank vectors, fine-tuning delta $\Delta W$ |
| **Fast On-Chip SRAM** | `#8B5CF6` (Purple 500) | GPU SRAM cache tile, FlashAttention local block, online running max/normalizer |
| **Slow Off-Chip HBM** | `#1E293B` (Slate 800) | High Bandwidth Memory (HBM), un-tiled attention footprint, KV cache storage |
| **Attention Heatmap** | `#6366F1` $\to$ `#F43F5E` | Softmax probability density: indigo (0.0) through violet, coral, to hot magenta (1.0) |
| **Phasor / Angular Rot**| `#38BDF8` (Sky 400) | RoPE complex unitary rotation vectors $e^{i m \theta}$, coordinate phase spirals |
| **State-Space Flow** | `#F97316` (Orange 500) | Mamba continuous state $h(t)$, selective gate coefficients $\Delta_t, B_t, C_t$ |
| **Diffusion Crystallization**| `#EC4899` $\to$ `#3B82F6` | Noise Gaussian dispersal ($\sigma_t$) converging to crisp manifold data structure |

---

### 1.3 Procedural Web Audio Sonification Protocol

Track 4 simulations generate all acoustic signals synthetically via `ProceduralAudioEngine.ts`:

1. **Backprop Pulse Tick:** Triangle wave downsweep (1600 Hz $\to$ 320 Hz, 12ms duration, exponential decay) triggered when an adjoint traverses a graph edge.
2. **Scrub Rotary Tick:** Bandpass-filtered sine pulse (1100 Hz $\times$ velocity, 7ms duration, $Q=3.0$, 18ms debounce gate) for temperature dials, rank sliders, and time scrubbers.
3. **Execution Drone (WASM / Training Hum):** Dual-oscillator analog transformer drone (Osc1: 55 Hz triangle; Osc2: 110.4 Hz sawtooth, 0.4 Hz beating chorus, 180 Hz resonant lowpass filter) active during forward/backward runs.
4. **Continuous Loss Pitch:** Logarithmic continuous mapping $f(L) = 130 \cdot (840/130)^{\text{norm}(L)}\text{ Hz}$ with sub-harmonic octaves (65 Hz) for tactile parameter descent.
5. **Phase Shift Whistle:** Pure sinusoidal frequency chirp ($800\text{ Hz} \to 2400\text{ Hz}$) proportional to RoPE frequency $\omega_k = 10000^{-2k/d}$.
6. **FlashAttention SRAM Transfer Thud:** Sub-bass sine transient (90 Hz $\to$ 35 Hz, 15ms duration) representing tiled block streaming from HBM to on-chip SRAM.
7. **Convergence Victory Chime:** 5-note Chowning FM bell synthesis chord (Lydian Major 9th: C5, E5, G5, B5, D6; carrier/modulator ratio $1 : 2.756$).

---

## 2. Granular Visual & Interactive Simulation Catalog (All 33 Lessons)

```
================================================================================
TRACK 4 LESSON CATALOG OVERVIEW (MOD-35 to MOD-46)
================================================================================
MOD-35: Scalar Autograd Engine from Scratch (Lessons T4-01 to T4-03)
MOD-36: Optimization Dynamics: SGD to AdamW & Warmup (Lessons T4-04 to T4-06)
MOD-37: Convolutional Networks & Residual Highways (Lessons T4-07 to T4-09)
MOD-38: Tokenization from Scratch & Sequence Foundations (Lessons T4-10 to T4-12)
MOD-39: Self-Attention Mechanics & Causal Masking (Lessons T4-13 to T4-15)
MOD-40: Modern Transformer Architecture: RoPE, Pre-LN, SwiGLU, KV Cache (Lessons T4-16 to T4-18)
MOD-41: High-Efficiency LLMs: Grouped-Query Attention & FlashAttention (Lessons T4-19 to T4-21)
MOD-42: Parameter-Efficient Fine-Tuning: LoRA & QLoRA (Lessons T4-22 to T4-24)
MOD-43: Alignment & Preference Optimization: DPO & GRPO (Lessons T4-25 to T4-27)
MOD-44: State-Space Models: Continuous SSMs, S4 & Mamba Selective Scan (Lessons T4-28 to T4-29)
MOD-45: Generative Diffusion Models: DDPM & Score SDEs (Lessons T4-30 to T4-31)
MOD-46: Autonomous LLM Agents: ReAct, Tool Calling & Tree-of-Thought (Lessons T4-32 to T4-33)
================================================================================
```

---

### MODULE 35: Scalar Autograd Engine from Scratch

---

#### Lesson T4-01: Scalar Autograd Engine & The Value Primitive
- **1. Simulation Component Identifier:** `AutogradGraphLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Two-column breakout canvas ($960 \times 540\text{ px}$, 16:9). Left $70\%$ is dynamic DAG workspace; right $30\%$ is real-time evaluation inspector showing scalar properties (`data`, `grad`, `_prev`, `_op`).
  - *Coordinates:* Normalized Cartesian world $[-10, 10] \times [-5.625, 5.625]$ projected to device pixels via linear affine transform with zoom $[0.5\times, 3.0\times]$ and 2D pan offset $(x_0, y_0)$.
  - *Node Geometry:* Rounded rectangles ($140 \times 64\text{ px}$) rendered with 2px borders. Divided into dual pill cells: top cell `data` in Emerald `#10B981`, bottom cell `grad` in Amber `#F59E0B`.
- **3. Tactile Interactive Levers:**
  - *Draggable Value Nodes:* Pointer-down drag on any input node ($x_1, w_1, x_2, w_2, b$) to reposition within topological columns.
  - *Scalar Value Rotary Scrubbers:* Click-drag vertically on top half of node to scrub `data` value from $-5.00$ to $+5.00$ (step: $0.05$).
  - *Forward / Backward Step Buttons:* `[Forward Eval]` step trigger, `[Zero Grad]` reset button, and `[Step Backprop]` single-step adjoint execution.
  - *Activation Operator Selector:* Toggle node activation between `ReLU`, `Tanh`, and `Linear`.
- **4. Real-Time Visual Feedback:**
  - *Forward Activation Wave:* On value scrub or forward run, a glowing green pulse (`#10B981`, glow radius 12px) travels left-to-right along directed bezier edges at $450\text{ px/s}$.
  - *Backward Adjoint Pulse:* On `backward()`, glowing amber pulses (`#F59E0B`) traverse edges right-to-left. Edges pulse with thickness proportional to local gradient magnitude $| \frac{\partial v_{out}}{\partial v_{in}} |$.
  - *Zero Gradient Alert:* Dead nodes (e.g. ReLU inactive region $z \le 0$) flash deep crimson (`#EF4444`) with edge strikethrough.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Forward Pass Ripple:* Ascending arpeggio of short 10ms sine blips ($330\text{ Hz} \to 440\text{ Hz} \to 550\text{ Hz} \to 660\text{ Hz}$) as nodes evaluate.
  - *Backward Adjoint Tick:* Sharp bandpass triangle tick (`playClick(1.2)`) on each reverse node resolution.
  - *Dead Neuron Dull Thud:* Lowpass sine thud (90 Hz $\to$ 40 Hz, 80ms) when an adjoint hits a zero derivative ($\text{grad} = 0.0$).

---

#### Lesson T4-02: Dynamic Computational DAGs & Topological Sorting
- **1. Simulation Component Identifier:** `DynamicDagLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Full-width canvas ($1024 \times 500\text{ px}$). Split into upper DAG Canvas ($70\%$ height) and lower Topological Linearization Ribbon ($30\%$ height).
  - *Coordinates:* Orthogonal hierarchical layered layout (Sugiyama-style DAG layout) with horizontal column ranks corresponding to node depth from inputs ($L_0$) to scalar loss ($L_k$).
  - *Linearization Ribbon:* Horizontal conveyor belt displaying the topologically ordered node list $[v_1, v_2, \dots, v_n]$ as connected modular badges.
- **3. Tactile Interactive Levers:**
  - *Expression Formula Selector:* Dropdown presets:
    - Linear Perceptron: $L = \text{ReLU}(w_1 x_1 + w_2 x_2 + b)$
    - Shared Sub-expression: $L = x^2 + 2x + \frac{1}{x}$ (tests gradient fan-out)
    - Residual Branch: $L = x + \text{Tanh}(x)$
  - *DFS Traversal Speed Slider:* Range $100\text{ ms}$ to $1200\text{ ms}$ per node visit step.
  - *Interactive Manual Sorter:* Drag nodes from the graph onto the linear ribbon to manually test topological order validity.
- **4. Real-Time Visual Feedback:**
  - *DFS Depth Scanner:* A bright purple cursor (`#8B5CF6`) walks child pointers `_prev` recursively. Visited nodes transition from slate gray to translucent purple outline, then settle into permanent emerald once added to `topo`.
  - *Cycle Detection Laser:* If a cyclic dependency is injected, the invalid feedback edge flashes violent pulsing red (`#EF4444`, 10 Hz) with an on-canvas warning badge: `CYCLE DETECTED: NOT A DAG`.
  - *Linear Ribbon Docking:* As a node is appended to the topological array, a duplicate ghost badge animates smoothly from the 2D canvas into the ribbon slot with an elastic ease-out.
- **5. Procedural Web Audio Sonification Hooks:**
  - *DFS Step Click:* 800 Hz sine tick on each forward recursive probe.
  - *Post-Order Push Bell:* Gentle marimba note (scale: D4 $\to$ F#4 $\to$ A4 $\to$ C#5) as each node completes recursion and pushes to the linear tape.
  - *Topological Complete Chime:* Lydian tri-tone resolving to octave upon full graph linearization.

---

#### Lesson T4-03: Reverse Adjoints & Multivariate Chain Rule Branching
- **1. Simulation Component Identifier:** `AdjointBackpropCanvas`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Wide interactive circuit canvas ($1000 \times 520\text{ px}$). Center stage features a variable branching node ($v$) fanning out into 3 downstream consumer nodes ($c_1, c_2, c_3$), which eventually merge into scalar Loss $L$.
  - *Coordinates:* Cartesian layout with custom vector overlay paths. Node center coordinates computed dynamically with spring-force stabilization.
  - *Equation Overlay:* Floating KaTeX badge directly above node $v$:
    $$\bar{v} \equiv \frac{\partial L}{\partial v} = \bar{c}_1 \frac{\partial c_1}{\partial v} + \bar{c}_2 \frac{\partial c_2}{\partial v} + \bar{c}_3 \frac{\partial c_3}{\partial v}$$
- **3. Tactile Interactive Levers:**
  - *Incoming Gradient Sliders:* 3 distinct horizontal scrubbers controlling incoming adjoints $\bar{c}_1 \in [-4.0, +4.0]$, $\bar{c}_2 \in [-4.0, +4.0]$, $\bar{c}_3 \in [-4.0, +4.0]$.
  - *Local Jacobian Sliders:* Scrubbers for local partial derivatives $\frac{\partial c_k}{\partial v} \in [-3.0, +3.0]$.
  - *Accumulation Mode Toggle:* `[Step-by-Step Accumulation (+=)]` vs `[Instant Vectorized Sum]`.
  - *Reset Gradients Button:* Clears all accumulated gradients to `0.00`.
- **4. Real-Time Visual Feedback:**
  - *Multi-Branch Fluid Pulses:* 3 amber laser streams flow backward from $c_1, c_2, c_3$ into node $v$. Beam thickness is directly proportional to $| \bar{c}_k \cdot \frac{\partial c_k}{\partial v} |$.
  - *Accumulation Reservoir:* Node $v$'s gradient cell functions as a vertical liquid gauge: positive gradients fill with luminous amber (`#F59E0B`), negative gradients fill with cool cyan (`#06B6D4`).
  - *The '+=' Flasher:* Whenever a gradient component arrives, the `+=` operator on the node pulses white with a 150ms glow decay.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Adjoint Stream Drone:* Harmonic chord composed of 3 sine waves whose frequencies equal $220 \cdot (1 + 0.2 \cdot |\bar{c}_k|)\text{ Hz}$.
  - *Accumulation Step Clink:* Ceramic impact clink (`playScrubTick(1.5)`) each time an incoming branch adds to the total sum.
  - *Sign Cancellation Thud:* Sub-harmonic cancellation click if positive and negative gradients sum to near zero ($|\bar{v}| < 0.01$).

---

### MODULE 36: Optimization Dynamics: SGD to AdamW & Warmup

---

#### Lesson T4-04: Multi-Layer Perceptrons & Activation Landscapes
- **1. Simulation Component Identifier:** `NeuralActivationCanvas`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Dual-panel canvas ($960 \times 500\text{ px}$).
    - Left ($50\%$): 2D Non-linear Function & Derivative Plane $(x \in [-4, 4], y \in [-2, 4])$.
    - Right ($50\%$): 100-Neuron Layer Activation Density Histogram & Dead Neuron Gauge.
  - *Coordinates:* Real-time Cartesian coordinate grid with zero-axes highlighted in subtle slate (`#334155`).
- **3. Tactile Interactive Levers:**
  - *Activation Family Dropdown:* `ReLU`, `Leaky ReLU (alpha=0.01)`, `GELU (approximate)`, `Swish / SiLU (beta=1.0)`, `Tanh`.
  - *Input Distribution Shift Slider:* Mean shift $\mu \in [-3.0, +3.0]$, Standard Deviation $\sigma \in [0.1, 3.0]$ of incoming batch $z = Wx + b$.
  - *Slope / Hyperparameter Dial:* Controls negative slope $\alpha \in [0.0, 0.5]$ for LeakyReLU, or $\beta \in [0.1, 2.0]$ for Swish.
  - *Single Input Point Probe:* Draggable vertical cursor across the $x$-axis displaying local value $f(x)$ and exact derivative $f'(x)$.
- **4. Real-Time Visual Feedback:**
  - *Dual Spline Plotting:* Solid emerald curve (`#10B981`, 2.5px) renders activation $f(x)$; dashed amber curve (`#F59E0B`, 1.5px) renders analytical derivative $f'(x)$.
  - *Dead Neuron Danger Zone:* In ReLU mode when inputs shift left ($\mu < -1.5$), inactive neurons in the histogram illuminate in vivid red (`#EF4444`) with percentage badge: `DEAD NEURONS: 78.4% (Zero Gradient Lock)`.
  - *GELU Smooth Transition Zone:* In GELU mode, the subtle negative dip at $x \approx -0.75$ glows violet (`#8B5CF6`), illustrating stochastic regularization behavior.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Saturation Drone:* High-pitched resonant sine (1200 Hz) that lowpasses down to 200 Hz as activations enter flat/saturated regimes.
  - *Dead Neuron Warning Siren:* Double dissonant tritone chime (`playErrorDissonance()`) when dead neuron ratio exceeds $50\%$.
  - *Curvature Sweep:* Modulated FM tone whose frequency tracks $f'(x)$ as the user drags the input probe.

---

#### Lesson T4-05: Loss Landscapes, Stochastic Gradient Descent & Polyak Momentum
- **1. Simulation Component Identifier:** `OptimizationDynamicsLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* 3D Isometric / 2D Contour Loss Landscape Viewport ($1000 \times 540\text{ px}$).
  - *Coordinates:* 3D surface projected via axonometric perspective $(\theta = 45^\circ, \phi = 30^\circ)$ or flat 2D topographic contour view ($w_1 \in [-3, 3], w_2 \in [-3, 3]$).
  - *Landscapes Available:* Ill-Conditioned Anisotropic Ravine ($f(w_1, w_2) = 0.5 w_1^2 + 10 w_2^2$), Rosenbrock Banana Valley, Saddle Point ($f(w_1, w_2) = w_1^2 - w_2^2$).
- **3. Tactile Interactive Levers:**
  - *Optimizer Selector:* `Pure SGD`, `SGD + Polyak Momentum (beta=0.9)`, `Nesterov Accelerated Gradient (NAG)`.
  - *Learning Rate Knob:* Rotary dial $\eta \in [0.001, 1.200]$ (logarithmic taper).
  - *Momentum Damping Slider:* $\beta \in [0.00, 0.99]$.
  - *Initial Position Dragger:* Click anywhere on contour to drop the optimization ball $(w_1^{(0)}, w_2^{(0)})$.
  - *Run / Pause / Reset:* Real-time physics playback button with step counter.
- **4. Real-Time Visual Feedback:**
  - *Trajectory Ribbon:* Particle path rendered as glowing bead trail. Pure SGD shows high-frequency transverse oscillations across steep canyon walls; Momentum smoothly dampens cross-canyon jitter and accelerates along the valley floor.
  - *Velocity Vector Arrows:* Magenta vector arrow ($\vec{v}_t$) and green gradient vector ($-\nabla L$) rendered dynamically at particle tip.
  - *Divergence Explosion:* If $\eta$ exceeds Lipschitz boundary $2/L$, particle flies off canvas with expanding shockwave rings and reset trigger.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Continuous Loss Sonification:* Real-time continuous pitch via `updateLoss(currentLoss, 0.01, 50.0)`: descending bass frequencies (400 Hz down to 65 Hz) as the trajectory nears minimum.
  - *Oscillation Chirp:* High-frequency stereo click if trajectory reverses direction along $w_2$ axis within 2 consecutive steps.
  - *Divergence Alarm:* Low-frequency sub-thud + loud dissonant cluster on numerical blowout.

---

#### Lesson T4-06: Adaptive Moment Estimation (Adam, AdamW & Cosine Schedules)
- **1. Simulation Component Identifier:** `AdamWOptimizerLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Tri-panel dashboard ($1024 \times 540\text{ px}$).
    - Top Left ($45\%$): 2D Parameter trajectory on anisotropic ravine with saddle point.
    - Top Right ($55\%$): Moment Vectors Bar Chart ($m_t$ first moment vs $\sqrt{v_t}$ second moment root).
    - Bottom ($100\%$ width, 140px height): Cosine Annealing Learning Rate Schedule Timeline with Warmup.
- **3. Tactile Interactive Levers:**
  - *Optimizer Algorithm:* `Adam (Standard L2 Weight Decay)`, `AdamW (Decoupled Weight Decay)`.
  - *Momentum Decay Rates:* $\beta_1 \in [0.80, 0.99]$ (default: $0.90$), $\beta_2 \in [0.900, 0.999]$ (default: $0.999$).
  - *Decoupled Weight Decay ($\lambda$):* Slider $\lambda \in [0.00, 0.20]$.
  - *Warmup Steps Scrub:* Horizontal draggable range marker defining linear warmup horizon ($0$ to $50$ steps).
  - *Playback Timeline Scrubber:* Drag back and forth through 200 optimization iterations.
- **4. Real-Time Visual Feedback:**
  - *Moment Coordinate Rectangles:* Dual vertical bars per parameter coordinate. $m_t$ (direction, emerald) vs $\sqrt{v_t}$ (scaling, cyan). Shows how ill-conditioned coordinates receive automatic gradient attenuation $\frac{\eta}{\sqrt{v_t} + \epsilon}$.
  - *Weight Decay Comparison Overlay:* Shows phantom ghost dot representing standard Adam L2 regularization dragging parameters toward sub-optimal origin due to gradient distortion, while AdamW preserves true feature directions.
  - *Warmup Horizon Marker:* Vertical amber cursor traversing the cosine schedule curve with live learning rate readout ($\eta_t$).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Step-Wise Momentum Hum:* Modulated low-frequency analog drone (55 Hz + 110.4 Hz) with amplitude scaled by average parameter velocity $||\Delta \theta_t||$.
  - *Decoupled Decay Click:* Soft wooden click when weight decay actively contracts large weights ($||\theta|| > 2.0$).
  - *Cosine Minimum Resolution:* Major 9th chime sequence when learning rate reaches terminal minimum $\eta_{\text{min}}$.

---

### MODULE 37: Convolutional Networks & Residual Highways

---

#### Lesson T4-07: Spatial Convolutions, Strides, Padding & Feature Geometry
- **1. Simulation Component Identifier:** `ConvolutionFilterCanvas`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Interactive 3-stage spatial pipeline ($1024 \times 520\text{ px}$).
    - Stage 1 ($30\%$ width): Input Image Matrix ($8 \times 8$ or $16 \times 16$ pixel grid).
    - Stage 2 ($35\%$ width): 3D Layered Sliding Kernel Window ($3 \times 3$ or $5 \times 5$).
    - Stage 3 ($35\%$ width): Output Feature Map with calculated dimensions.
  - *Coordinates:* Isometric grid projection with 2.5D elevation layers showing kernel hover elevation ($z = 24\text{ px}$) above input pixels.
- **3. Tactile Interactive Levers:**
  - *Kernel Filter Presets:* `Sobel Vertical Edge`, `Sobel Horizontal Edge`, `Sharpen`, `Gaussian Blur 3x3`, `Ridge Detector`.
  - *Custom Kernel Weight Editor:* Clickable $3 \times 3$ matrix cells with direct integer/float editing $[-3.0, +3.0]$.
  - *Stride Slider ($S$):* Discrete steps $S \in \{1, 2, 3\}$.
  - *Padding Selector ($P$):* `Valid (P=0)`, `Same (P=1)`, `Full (P=2)`.
  - *Manual Step Scrub:* Slider stepping kernel coordinates across $(i, j)$ positions.
- **4. Real-Time Visual Feedback:**
  - *Laser Pyramidal Frustum:* Translucent cyan pyramid (`#06B6D4`, alpha 0.25) connects the $3 \times 3$ kernel footprint on the input image to the exact single receiving cell on the output map.
  - *Arithmetic Equation Callout:* Real-time badge computing:
    $$\text{Out} = \left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1 = \left\lfloor \frac{8 - 3 + 2(1)}{1} \right\rfloor + 1 = 8 \times 8$$
  - *Element-wise Multiply Matrix:* Small floating tooltip showing the 9 pairwise products $\sum K_{uv} X_{i+u, j+v}$ before accumulation.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Kernel Step Tick:* Crisp mechanical typewriter click (`playScrubTick()`) on each stride translation.
  - *Edge Detection Strum:* High harp harmonic if the current receptive field detects an edge (convolution sum $> 4.0$).
  - *Boundary Impact:* Dull rubber thud when kernel reaches grid boundary and wraps to next scanline.

---

#### Lesson T4-08: Normalization Mechanics: BatchNorm, LayerNorm & RMSNorm
- **1. Simulation Component Identifier:** `NormalizationGeometryLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* 3D Tensor Cube Decomposition ($960 \times 540\text{ px}$).
  - *Coordinates:* 3D Tensor visualization of shape $[B, T, C]$ (Batch $B=4$, Time/Tokens $T=6$, Channels $C=8$) rotated in 3D isometric view.
  - *Slice Planes:* Semi-transparent cutting planes slicing along specific reduction dimensions.
- **3. Tactile Interactive Levers:**
  - *Normalization Architecture:*
    - `BatchNorm`: Slices across Batch dimension $B$ (per channel).
    - `LayerNorm`: Slices across Channel dimension $C$ (per token/vector).
    - `RMSNorm`: LayerNorm without mean subtraction ($a_i = \frac{x_i}{\text{RMS}(x)} g_i$).
  - *Batch Size ($B$) & Sequence Length ($T$) Sliders:* $B \in [2, 8]$, $T \in [2, 12]$.
  - *Scale ($\gamma$) and Shift ($\beta$) Rotary Dials:* $\gamma \in [0.1, 3.0]$, $\beta \in [-2.0, +2.0]$.
  - *Numerical Stability Epsilon Dial:* $\epsilon \in [10^{-6}, 10^{-1}]$ demonstrating zero-division breakdown.
- **4. Real-Time Visual Feedback:**
  - *Active Reduction Slice:*
    - In `BatchNorm`, a vertical emerald slice cuts through all samples for a single feature channel.
    - In `LayerNorm`, a horizontal purple slice isolates a single token across all its embedding channels.
    - In `RMSNorm`, mean centering animation is omitted, highlighting a 30% latency speedup badge.
  - *Distribution Morphing:* Side-by-side bell curves showing raw un-normalized activations (skewed, wide variance) collapsing into zero-mean unit-variance standard Gaussian $\mathcal{N}(0, 1)$ before $\gamma, \beta$ affine modulation.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Slice Rotation Chime:* Metallic resonance as the 3D tensor slice shifts between BatchNorm, LayerNorm, and RMSNorm.
  - *Epsilon Zero-Division Buzz:* Harsh electrical buzz (`playErrorDissonance()`) if $\epsilon \to 0$ with zero variance.
  - *Normalization Sweep:* Smooth sine sweep (200 Hz $\to$ 600 Hz) as distribution contracts to standard normal.

---

#### Lesson T4-09: Gradient Degradation & ResNet Identity Shortcut Highways
- **1. Simulation Component Identifier:** `ResidualHighwayLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Comparative Vertical Deep Network Highway Canvas ($1024 \times 500\text{ px}$).
  - *Left Half ($50\%$):* 18-Layer Plain Feedforward Stack ($x_{l+1} = \sigma(W_l x_l)$).
  - *Right Half ($50\%$):* 18-Layer Residual Network Stack ($x_{l+1} = x_l + \mathcal{F}(x_l)$) with external curved bypass conduits.
  - *Coordinates:* Vertical depth axis (Layer 0 at bottom, Layer 18 at top).
- **3. Tactile Interactive Levers:**
  - *Network Depth Slider:* 4 layers up to 32 layers.
  - *Weight Scale Multiplier ($||W||$):* Slider $0.5$ (vanishing regime) to $1.8$ (exploding regime).
  - *Skip Connection Switch:* Toggle residual connections `[Active]` vs `[Severed]`.
  - *Reverse Gradient Injection Pulse:* Trigger backward pass from Layer 18 with adjoint magnitude $\bar{x}_{18} = 1.0$.
- **4. Real-Time Visual Feedback:**
  - *Gradient Attenuation Beam:* In the plain network, the amber backprop laser attenuates exponentially through successive matrix multiplications ($W_l^T$), fading to black by Layer 4 (vanishing gradient death).
  - *Superconducting Residual Conduit:* In the ResNet stack, the bypass wire glows vibrant emerald (`#10B981`, 3px line), conducting an un-attenuated gradient pulse directly from Layer 18 to Layer 0:
    $$\frac{\partial L}{\partial x_0} = \frac{\partial L}{\partial x_L} \left( I + \sum_{l=0}^{L-1} \frac{\partial \mathcal{F}_l}{\partial x_0} \right)$$
  - *Gradient Magnitude Bar Graph:* Side-by-side vertical meters showing input layer gradient magnitude ($10^{-9}$ on plain vs $0.98$ on ResNet).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Vanishing Fade-out:* A high bell chime that rapidly decays into inaudibility after 3 layers on the plain network.
  - *Residual Superconductor Hum:* Continuous deep resonant organ drone (110 Hz) sustained uninterrupted along the identity bypass.
  - *Gradient Explosion Alarm:* Overload klaxon when $||W|| > 1.4$ causing activation overflow.

---

### MODULE 38: Tokenization from Scratch & Sequence Foundations

---

#### Lesson T4-10: Recurrent Architectures & Backpropagation Through Time (BPTT)
- **1. Simulation Component Identifier:** `RnnUnrollCanvas`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Time-Unfolded Sequence Ribbon Canvas ($1000 \times 500\text{ px}$).
  - *Coordinates:* Horizontal time steps $t \in [1, 8]$ showing folded cyclic RNN cell on left, transitioning to fully unrolled computational chain across the horizontal axis.
  - *State Nodes:* Hidden state circles $h_t$ with recurrent horizontal bridges carrying $W_{hh}$, and vertical input arrows carrying $W_{xh} x_t$.
- **3. Tactile Interactive Levers:**
  - *Sequence Length Scrubber ($T$):* $T \in [2, 10]$ time steps.
  - *Recurrent Weight Eigenvalue Dial ($\lambda(W_{hh})$):* Dial $0.20$ to $2.50$ (critical threshold $\lambda = 1.0$).
  - *Input Sequence Editor:* Type or select token sequence: `['The', 'cat', 'sat', 'on', 'the', 'mat']`.
  - *BPTT Step Trigger:* Step backward through time from $t = T$ back to $t = 1$.
- **4. Real-Time Visual Feedback:**
  - *BPTT Gradient Wavefront:* Amber backprop arrows propagate backward along the recurrent chain.
    - If $\lambda(W_{hh}) < 0.9$: Gradient arrows shrink exponentially ($0.5^t$), illustrating vanishing long-term dependencies.
    - If $\lambda(W_{hh}) > 1.2$: Gradient arrows expand into flaming crimson beams, indicating exploding gradients.
  - *Temporal Dependency Distance:* Color coding of hidden states showing how much context from $x_1$ survives into $h_t$.
- **5. Procedural Web Audio Sonification Hooks:**
  - *BPTT Reverse Tick:* Time-reversal click sequence ticking backward in time with increasing pitch ($200\text{ Hz} \to 800\text{ Hz}$).
  - *Vanishing Decay:* Audio envelope decaying exponentially to total silence when gradients vanish.
  - *Explosion Distortion:* High-amplitude clipped square wave distortion when gradient norms exceed threshold $100.0$.

---

#### Lesson T4-11: Gated Memory: LSTM Cell Highways & GRU Selection
- **1. Simulation Component Identifier:** `LstmCellHighwayLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* High-Fidelity Circuit Diagram of an LSTM Unit ($1024 \times 540\text{ px}$).
  - *Coordinates:* Top horizontal line represents the Cell State Highway ($c_{t-1} \to c_t$); lower section contains the 3 gating lines: Forget Gate ($f_t$), Input Gate ($i_t$), Candidate Gate ($\tilde{c}_t$), and Output Gate ($o_t$).
  - *Component Nodes:* Sigmoid blocks $\sigma$ in purple (`#8B5CF6`), Tanh blocks in cyan (`#06B6D4`), and element-wise multiplier circles $\otimes$ in amber (`#F59E0B`).
- **3. Tactile Interactive Levers:**
  - *Forget Gate Bias Slider ($b_f$):* Range $[-4.0, +4.0]$ (demonstrating how $b_f = +2.0$ keeps $f_t \approx 1.0$ to remember long horizons).
  - *Input Salience Slider ($x_t$):* Injects high-magnitude novel fact ($x_t = +3.0$) or noise ($x_t = 0.0$).
  - *Previous Cell State Value ($c_{t-1}$):* Draggable memory charge level $[-5.0, +5.0]$.
  - *Single Step Execution:* Advances the cell to step $t+1$, transferring $(c_t, h_t)$ to the next step.
- **4. Real-Time Visual Feedback:**
  - *Gate Valve Visualizer:* Forget gate $\sigma(W_f [h_{t-1}, x_t] + b_f)$ renders as a mechanical iris valve:
    - When $f_t \to 1.0$: Valve is wide open; emerald liquid flows freely through the cell state highway without decay.
    - When $f_t \to 0.0$: Valve slams shut; old cell state is instantly flushed to zero.
  - *Additive Cell Update Pulse:* Glowing green injection stream adding $i_t \odot \tilde{c}_t$ into the main memory line.
  - *Constant Error Carousel:* Backprop visualization showing gradient flowing backward through the additive line without exponential decay factor.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Gate Valve Click:* Pneumatic valve hiss/click when gates open or close (`playClick()`).
  - *Memory Write Strum:* Rich cello harmonic (C3, 130.8 Hz) whenever high-magnitude information writes to cell state.
  - *Forget Flush Whoosh:* Short white-noise sweep (200ms) simulating memory erasure.

---

#### Lesson T4-12: Byte-Pair Encoding (BPE) & Subword Vocabulary Merging
- **1. Simulation Component Identifier:** `BpeTokenizerLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Two-panel linguistic tokenizer canvas ($1000 \times 520\text{ px}$).
    - Top ($40\%$): Interactive Token String Token Boundary Visualizer with UTF-8 byte breakdown.
    - Bottom ($60\%$): Vocabulary Merge Frequency Table & Interactive Merge Hierarchy Tree.
  - *Coordinates:* Character-level monospace grid with color-coded token boundaries and pill badge badges.
- **3. Tactile Interactive Levers:**
  - *Input Corpus Textbox:* Editable text box initialized with: `"low lower lowest newest wider widest"`.
  - *Vocabulary Size Ceiling Slider:* $V \in [256, 320]$ tokens (starts with 256 raw byte tokens).
  - *Greedy Step Button:* `[Execute Next Most Frequent Merge]` (e.g. `'l' + 'o' -> 'lo'`).
  - *Play / Auto-Merge Speed Dial:* Continuous automated merge loop ($200\text{ ms}$ to $1000\text{ ms}$ per rule).
  - *Reset Vocabulary:* Reverts to baseline UTF-8 byte tokens.
- **4. Real-Time Visual Feedback:**
  - *Top Pair Highlighter:* The most frequent adjacent pair across the entire corpus flashes in bright yellow highlight (`#FACC15`) in both the text and frequency leaderboard.
  - *Token Boundary Morph:* On merge, the dividing vertical line between paired tokens dissolves with an elastic squeeze animation, coalescing into a single unified pill badge with a newly minted Token ID (`ID: 257`).
  - *Dendrogram Forest:* Lower panel builds a hierarchical merge tree showing how complex tokens decompose into constituent sub-words.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Merge Snap Sound:* Crisp mechanical snap (`playScrubTick(1.8)`) upon pair fusion.
  - *Leaderboard Re-sort Whoosh:* Gentle frequency sweep as new pair counts calculate across the corpus.
  - *Compression Milestone Chime:* Victory chime when compression ratio exceeds $2.5\times$ byte reduction.

---

### MODULE 39: Self-Attention Mechanics & Causal Masking

---

#### Lesson T4-13: Scaled Dot-Product Attention & Variance Stabilization
- **1. Simulation Component Identifier:** `AttentionHeatmapCanvas`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Matrix Routing Canvas ($1024 \times 540\text{ px}$).
    - Left ($30\%$): Query & Key Vector Embeddings in $d_k$-dimensional space.
    - Center ($40\%$): $N \times N$ Attention Score Matrix before and after Softmax.
    - Right ($30\%$): Value Vector Weighted Sum Accumulator ($O = A \cdot V$).
  - *Coordinates:* Grid cells with normalized heatmap values $A_{ij} \in [0.0, 1.0]$.
- **3. Tactile Interactive Levers:**
  - *Embedding Dimension ($d_k$) Dial:* $d_k \in \{4, 16, 64, 128, 512\}$.
  - *Variance Scaling Switch ($\sqrt{d_k}$):* Toggle `[Scaled (1/sqrt(d_k))]` vs `[Unscaled (Raw Dot Product)]`.
  - *Softmax Temperature Dial ($\tau$):* $\tau \in [0.1, 5.0]$ (low temp $\to$ one-hot argmax; high temp $\to$ uniform dispersion).
  - *Interactive Token Hover:* Hovering over Token $i$ draws curved affinity arcs to all Tokens $j$ with thickness proportional to $A_{ij}$.
- **4. Real-Time Visual Feedback:**
  - *Heatmap Entropy Gradient:* Cells smoothly shade from midnight blue (`#0F172A`, 0.0) through violet (`#6366F1`) to hot coral-pink (`#F43F5E`, 1.0).
  - *Softmax Gradient Saturation Warning:* In Unscaled mode with large $d_k = 128$, dot products reach magnitudes $> 30.0$. Softmax collapses into a single extreme one-hot spike ($A_{ik} = 1.0, A_{ij} = 0.0$); the canvas displays a glowing warning badge: `VANISHING GRADIENTS: Softmax Jacobian Max Element < 1e-7`.
  - *Dynamic Arc Routing:* Luminous bezier splines arc overhead from the active Query to all Keys, color-coded by attention weight.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Attention Entropy Sweep:* Continuous resonant filtered noise whose center frequency maps directly to the Shannon entropy $H(A_i) = -\sum A_{ij} \log A_{ij}$. Sharp peak $\to$ pure sine whistle; flat distribution $\to$ ocean white noise.
  - *Temperature Scrub Tick:* Haptic tick on every $0.1$ change in temperature.
  - *Saturation Error Alert:* Dissonant buzzer when attention variance triggers zero-gradient state.

---

#### Lesson T4-14: Causal Autoregressive Masking
- **1. Simulation Component Identifier:** `CausalMaskLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Split-view Sequence Generation Canvas ($960 \times 520\text{ px}$).
    - Top ($35\%$): Step-by-Step Autoregressive Token Generation Ribbon.
    - Bottom ($65\%$): Dual $N \times N$ Attention Matrix Grids ($N=6$ tokens):
      - Left: Raw Query-Key Dot Products ($QK^T / \sqrt{d_k}$).
      - Right: Causal Masked Softmax Matrix ($M_{ij} = -\infty \text{ for } j > i$).
- **3. Tactile Interactive Levers:**
  - *Causal Mask Toggle:* Switch `[Causal Mask Active (Autoregressive)]` vs `[Bidirectional (BERT-Style)]`.
  - *Current Generation Step Slider:* Step $t \in [1, 6]$ showing how future positions remain completely un-materialized.
  - *Information Leakage Probe:* Click on an upper-triangular cell $(i, j)$ with $j > i$ to observe hypothetical future token leakage.
  - *Input Sentence Selector:* Example prompts demonstrating next-token prediction.
- **4. Real-Time Visual Feedback:**
  - *Negative Infinity Shroud:* In causal mode, the upper triangular half ($j > i$) is covered by a diagonal dark slate hatch-pattern shield with glowing red $-\infty$ emblems in every blocked cell.
  - *Strict Zero Row Verification:* Softmax rows strictly sum to $1.0$ using only indices $j \le i$. Upper triangle values read strictly `0.0000`.
  - *Information Leakage Laser (Bidirectional Mode):* When mask is toggled off, red warning laser beams shoot from token $t+2$ backward into token $t$, highlighting the catastrophic violation of autoregressive causality.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Token Generation Clack:* Deep mechanical typewriter return keystroke on each autoregressive token emission.
  - *Mask Collision Block:* Muffled wooden thud when attempting to query masked future tokens.
  - *Causality Violation Siren:* Loud discordant klaxon if bidirectional attention is enabled during autoregressive decode mode.

---

#### Lesson T4-15: Multi-Head Attention (MHA) & Subspace Projection Routing
- **1. Simulation Component Identifier:** `MultiHeadAttentionLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* 3D Layered Attention Heads Deck ($1024 \times 540\text{ px}$).
  - *Coordinates:* 3D isometric stack of $H = 8$ parallel attention planes floating along the $z$-axis with adjustable inter-plane spacing ($dz = 40\text{ px}$).
  - *Output Projection Section:* Convergence of all 8 head output vectors into linear projection matrix $W_O \in \mathbb{R}^{(H \cdot d_v) \times d_{\text{model}}}$.
- **3. Tactile Interactive Levers:**
  - *Active Head Selector:* Tabs `[Head 1]` through `[Head 8]`, or `[View All Heads 3D Stack]`.
  - *3D Deck Rotation Controls:* Drag to orbit view $(\theta \in [0, 360^\circ], \phi \in [10^\circ, 80^\circ])$.
  - *Linguistic Specialization Preset:* Switch sample sentence to view:
    - Head 1: Syntactic Subject-Verb Agreement Head
    - Head 2: Coreference Resolution Head (`"it"` $\to$ `"the robot"`)
    - Head 3: Immediate Previous-Token Offset Head
    - Head 4: Punctuation/Delimiter Attractor Head
- **4. Real-Time Visual Feedback:**
  - *Distinct Color Identities:* Each head possesses a unique signature hue (Head 1 Cyan `#06B6D4`, Head 2 Emerald `#10B981`, Head 3 Amber `#F59E0B`, Head 4 Purple `#8B5CF6`, etc.).
  - *Multi-Head Vector Concatenation Ribbon:* Animated stream showing individual head outputs $O_h \in \mathbb{R}^{d_v}$ horizontally concatenating into $[O_1 \parallel O_2 \parallel \dots \parallel O_H]$ before multiplying with $W_O$.
  - *Subspace Orthogonality Meter:* Angular scatter plot showing dot products between head weight matrices, proving that heads attend to mutually orthogonal representational subspaces.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Head Switching Arpeggio:* Rapid 8-note harp arpeggio ascending through the 8 heads as the user scrubs through them.
  - *Head Polyphony:* When `[View All]` is active, an 8-voice polyphonic ambient chord resonates, with each voice amplitude modulated by its head's attention concentration.

---

### MODULE 40: Modern Transformer Architecture: RoPE, Pre-LN, SwiGLU, KV Cache

---

#### Lesson T4-16: Rotary Position Embeddings (RoPE) & 2D Complex Phasors
- **1. Simulation Component Identifier:** `RoPEPhasorCanvas`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Complex Phasor Constellation Plane ($1000 \times 520\text{ px}$).
    - Left ($50\%$): 2D Complex Vector Argand Plane ($[-1.5, +1.5] \times [-1.5, +1.5]$) showing orthogonal slice rotation $R_{\Theta, m}^d$.
    - Right ($50\%$): Multi-Frequency Spiral Waveform across token positions $m \in [0, 32]$ and channel dimensions $k \in [0, d/2 - 1]$.
- **3. Tactile Interactive Levers:**
  - *Token Position Slider ($m$):* Position index $m \in [0, 64]$.
  - *Channel Frequency Index ($k$):* Frequency index $k \in [0, 31]$ with base $\theta_k = 10000^{-2k/d}$.
  - *Base Frequency Dial ($b$):* $\theta_{\text{base}} \in [10000, 500000]$ (illustrates RoPE context extension / YaRN scaling).
  - *Dual Token Distance Scrubber ($\Delta m = m - n$):* Interactively adjusts distance between Token $m$ and Token $n$ to observe inner product decay.
- **4. Real-Time Visual Feedback:**
  - *Rotating Unit Phasor Needle:* On the Argand plane, the Query vector $\mathbf{q}$ and Key vector $\mathbf{k}$ rotate by angles $m\theta$ and $n\theta$. The angle between them $\Delta \theta = (m-n)\theta$ is highlighted as a glowing cyan arc sector.
  - *Inner Product Invariance Gauge:* Live readout demonstrating:
    $$\langle R_{\Theta, m} \mathbf{q}, R_{\Theta, n} \mathbf{k} \rangle = \mathbf{q}^T R_{\Theta, n - m} \mathbf{k} = g(\mathbf{q}, \mathbf{k}, m - n)$$
    Proves that attention affinity depends purely on relative distance $m-n$, regardless of absolute position.
  - *High-Frequency vs Low-Frequency Phase Spiral:* 3D ribbon shows fast spinning needles at low channel indices $k=0$ (local word ordering) vs slow glacial rotation at high $k$ (long-range semantic drift).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Phasor Whistle:* Pure sinusoidal tone whose pitch sweeps upward proportionally to frequency $\omega_k = 10000^{-2k/d}$ as $k$ scrubs down to $0$.
  - *Relative Rotation Phase Beat:* Two detuned oscillators at $f_1 = 440 + 2m\text{ Hz}$ and $f_2 = 440 + 2n\text{ Hz}$ producing acoustic beating whose beat frequency matches the relative token gap $|m - n|$.

---

#### Lesson T4-17: Normalization Topologies: Pre-LN vs Post-LN Stability
- **1. Simulation Component Identifier:** `PrePostLnHighwayLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Comparative Dual-Tower Architecture Canvas ($1024 \times 520\text{ px}$).
    - Left Tower ($50\%$): Classic Post-LN Transformer Block ($x_{l+1} = \text{LN}(x_l + \text{SubLayer}(x_l))$).
    - Right Tower ($50\%$): Modern Pre-LN Transformer Block ($x_{l+1} = x_l + \text{SubLayer}(\text{LN}(x_l))$).
  - *Coordinates:* Multi-layer vertical block stack (Layers 1 to 24).
- **3. Tactile Interactive Levers:**
  - *Total Layer Depth Slider ($L$):* $L \in [6, 48]$ layers.
  - *Warmup Learning Rate Schedule Toggle:* `[With Warmup (5000 steps)]` vs `[Cold Start High LR (0.01)]`.
  - *Step Backprop Impulse:* Injects gradient $\bar{x}_L$ at the top layer and watches backpropagation flow to Layer 1.
- **4. Real-Time Visual Feedback:**
  - *Post-LN Gradient Degradation / Blowout:* In Post-LN without warmup, gradients pass through the derivative of LayerNorm at every stage, leading to exponential vanishing near inputs or explosive gradient updates in early steps that destabilize training.
  - *Pre-LN Superconducting Residual Backbone:* In Pre-LN, the primary residual spine bypasses all normalization layers entirely. Gradient backprop flows directly down the un-attenuated spine in emerald green (`#10B981`), eliminating the requirement for complex learning rate warmups.
  - *Gradient Norm vs Depth Chart:* Live plot comparing $||\nabla_{W_l} L||$ across all layers: Pre-LN remains stable $O(1)$; Post-LN exhibits extreme exponential decay.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Cold-Start Crash Sound:* Explosive white noise burst and dissonant crunch if Post-LN diverges with cold-start high LR.
  - *Pre-LN Smooth Flow Tone:* Pure clean major third drone (220 Hz + 277 Hz) confirming uninterrupted residual backprop.

---

#### Lesson T4-18: SwiGLU Gated Feed-Forward Networks & KV Caching Mechanics
- **1. Simulation Component Identifier:** `SwiGluKVCacheLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Dual-Dashboard LLM Engine Canvas ($1024 \times 540\text{ px}$).
    - Top ($45\%$): SwiGLU Non-Linear Gating Circuit ($\text{Swish}(x W_{\text{gate}}) \otimes (x W_{\text{up}}) W_{\text{down}}$).
    - Bottom ($55\%$): Autoregressive KV Cache VRAM Footprint & Step-by-Step Context Memory Buffer.
  - *Coordinates:* Horizontal token sequence buffer with active cache slots and VRAM utilization bar.
- **3. Tactile Interactive Levers:**
  - *Batch Size ($b$) & Sequence Context ($s$) Sliders:* $b \in [1, 32]$, $s \in [128, 8192]$ tokens.
  - *Precision Format Switch:* `FP32 (4 bytes)`, `FP16 / BF16 (2 bytes)`, `FP8 (1 byte)`, `INT4 (0.5 bytes)`.
  - *Autoregressive Generation Stepper:* Emits one token at a time, appending new $K, V$ projection vectors into the cache without recomputing previous tokens.
  - *SwiGLU Gate Bias Multiplier:* Adjusts gate projection values to demonstrate smooth non-linear feature gating.
- **4. Real-Time Visual Feedback:**
  - *Gating Heatmap Multiplication:* Visual display showing the element-wise Hadamard product ($\otimes$) between the smooth activated gate vector and the up-projection vector.
  - *Dynamic KV Cache Tile Buffer:* Colored slots light up sequentially in the memory ribbon. A real-time mathematical VRAM counter displays:
    $$\text{Memory}_{\text{KV}} = 2 \times b \times s \times l \times h \times d_k \times \text{bytes\_per\_param}$$
    Demonstrates instant spike to $12.8\text{ GB}$ VRAM at context $s = 8192$ in FP16.
  - *Memory Bandwidth Roofline Indicator:* Highlights memory-bound bottleneck: FLOP-to-byte ratio drops below arithmetic intensity threshold during token-by-token decoding.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Token Decode Tick:* Soft mechanical rotary tick as each new token $K, V$ vector commits to memory.
  - *VRAM Threshold Warning:* Resonant low bass warning tone when calculated KV cache exceeds 80% of simulated GPU memory capacity (16GB VRAM limit).

---

### MODULE 41: High-Efficiency LLMs: Grouped-Query Attention & FlashAttention

---

#### Lesson T4-19: Memory Bandwidth Bottlenecks & Grouped-Query Attention (GQA)
- **1. Simulation Component Identifier:** `GqaMemoryBandwidthLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Three-Way Architectural Comparison Deck ($1024 \times 520\text{ px}$).
    - Column 1: Multi-Head Attention (MHA) — 8 Query heads, 8 KV heads ($1:1$).
    - Column 2: Grouped-Query Attention (GQA) — 8 Query heads, 2 KV groups ($4:1$).
    - Column 3: Multi-Query Attention (MQA) — 8 Query heads, 1 single KV head ($8:1$).
  - *Coordinates:* Modular head routing lines connecting Query heads to shared Key-Value memory pools.
- **3. Tactile Interactive Levers:**
  - *Query Heads Slider ($H_Q$):* Fixed at 8 or 32 heads.
  - *Key-Value Heads Slider ($H_{KV}$):* $H_{KV} \in \{1, 2, 4, 8\}$.
  - *Batch Size & Context Horizon:* Sliders controlling generation workload.
  - *Inference Speed Test Button:* Runs simulated 50-token decode benchmark comparing memory read speeds.
- **4. Real-Time Visual Feedback:**
  - *Elastic Head Routing Arcs:* In GQA mode, 4 distinct Query heads tether elastically to a single shared Key-Value head block in cyan (`#06B6D4`), clearly illustrating the $4\times$ reduction in memory bandwidth reads.
  - *Memory Transfer Pipe Gauge:* Animated fluid pipe displaying gigabytes per second streamed from GPU HBM. MHA displays maximum pipeline congestion (red); GQA drops bandwidth by $75\%$ while retaining model perplexity.
  - *Quality vs Speed Spider Chart:* 2D radar diagram showing Perplexity, Inference Throughput (tokens/sec), and VRAM Consumption for MHA vs GQA vs MQA.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Memory Bandwidth Siphon Sound:* Filtered pink noise whose volume and filter cutoff scale with memory read bandwidth (loud for MHA, whisper quiet for GQA).
  - *Group Clink:* Quad-chime when 4 Query heads lock into their shared KV group.

---

#### Lesson T4-20: FlashAttention: IO-Aware SRAM Tiling & Online Softmax
- **1. Simulation Component Identifier:** `FlashAttentionMemoryLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Hardware Microarchitecture Cross-Section ($1024 \times 540\text{ px}$).
    - Bottom Half ($40\%$): Slow High Bandwidth Memory (HBM, $1.5\text{ TB/s}$, dark slate `#1E293B`).
    - Top Half ($60\%$): Ultra-Fast On-Chip SRAM ($19\text{ TB/s}$, vibrant purple `#8B5CF6`, $192\text{ KB}$ tile size).
  - *Coordinates:* Tiled block coordinate grid showing sub-matrices $Q_i, K_j, V_j$ streaming in chunks.
- **3. Tactile Interactive Levers:**
  - *SRAM Tile Block Size Slider ($B_r, B_c$):* Block dimensions $\{32, 64, 128\}$.
  - *Sequence Length Slider ($N$):* $N \in [512, 16384]$ tokens.
  - *Algorithm Mode:* `Standard Attention (Materialize N x N in HBM)` vs `FlashAttention (Tiled Online Softmax)`.
  - *Step-by-Step Tiling Engine:* Steps through outer loop over Key-Value blocks and inner loop over Query blocks.
- **4. Real-Time Visual Feedback:**
  - *The Massive $N \times N$ Red Block of Death:* In standard attention, the canvas renders a terrifying glowing red square growing with $O(N^2)$ memory into HBM, demonstrating instant Out-Of-Memory (OOM) at $N=16k$.
  - *SRAM Ping-Pong Streaming:* In FlashAttention, small compact blocks ($B_r \times d$) zip smoothly from HBM into purple SRAM at $19\text{ TB/s}$. The $N \times N$ matrix is never materialized in HBM.
  - *Online Softmax Rescaling Dynamic:* Shows running row max $m^{(k)}$ and running normalizer $l^{(k)}$ dynamically adjusting previous output accumulator $O^{(k-1)}$:
    $$O^{(k)} = \text{diag}\left( \frac{l^{(k-1)}}{l^{(k)}} e^{m^{(k-1)} - m^{(k)}} \right) O^{(k-1)} + \frac{e^{\tilde{S}^{(k)} - m^{(k)}}}{l^{(k)}} V^{(k)}$$
    A glowing balance scale icon shows mathematical equivalence to global softmax.
- **5. Procedural Web Audio Sonification Hooks:**
  - *SRAM Tile Transfer Thud:* Low-frequency sub-bass transient (90 Hz $\to$ 35 Hz, 15ms) on each block load into SRAM (`playScrubTick(0.8)`).
  - *HBM Bottleneck Grunt:* Grating mechanical grinding drone active whenever standard attention reads/writes the huge $N \times N$ intermediate matrix to HBM.
  - *Online Rescale Chime:* Crystalline ping when running normalizer rescale completes without numerical overflow.

---

#### Lesson T4-21: FlashAttention-2 Work Partitioning & Backward Pass Recomputation
- **1. Simulation Component Identifier:** `FlashAttention2KernelLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* GPU Streaming Multiprocessor (SM) Thread Block Grid ($1000 \times 520\text{ px}$).
  - *Coordinates:* 2D matrix of Thread Blocks along the sequence dimension and batch/head dimensions.
  - *Split Pipeline View:* Left: Forward Pass with inverted loop ordering; Right: Backward Pass recomputing attention $S_{ij}$ on-the-fly in SRAM.
- **3. Tactile Interactive Levers:**
  - *Loop Ordering Architecture:* `FlashAttention-1 (Outer K, Inner Q)` vs `FlashAttention-2 (Outer Q, Inner K)`.
  - *Thread Block Warp Specialization:* Split ratio of Tensor Core MMA (Matrix Multiply Accumulate) warps vs Memory copy warps.
  - *Backward Memory Trade-off Switch:* `[Store Attention in HBM (O(N^2))]` vs `[Recompute in SRAM (Zero HBM Footprint)]`.
- **4. Real-Time Visual Feedback:**
  - *Outer Query Parallelism:* In FlashAttention-2, each SM takes a fixed Query block and iterates over all Key-Value blocks, eliminating inter-warp atomic synchronization over output accumulator $O$. Parallel thread utilization jumps from $62\%$ to $94\%$ (emerald load bars).
  - *Backward Recomputation Flash:* Shows forward attention scores evaporating immediately after output computation, then re-synthesizing instantly inside SRAM during the backward pass using cached statistics $(m, l)$, saving gigabytes of memory.
  - *FLOP/s vs Memory Roofline:* Real-time hardware utilization meter reaching up to $73\%$ of theoretical FP16 tensor core ceiling on simulated A100.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Thread Warp Hum:* Fast rhythmic poly-metric pulse representing balanced warp execution across SMs.
  - *Atomic Lock Dissonance:* Clicking dissonance when atomic locks trigger in Flash-1, replaced by smooth clean hum in Flash-2.

---

### MODULE 42: Parameter-Efficient Fine-Tuning: LoRA & QLoRA

---

#### Lesson T4-22: Parameter-Efficient Fine-Tuning Foundations & SFT Catastrophe
- **1. Simulation Component Identifier:** `PeftParameterLandscapeLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* VRAM Allocation Architecture Canvas ($960 \times 520\text{ px}$).
  - *Coordinates:* Stacked memory bar graph breaking down total GPU memory into: Model Weights (FP16), Gradients (FP16), Optimizer States (Adam FP32: First Moment $m_t$ + Second Moment $v_t$), and Activation Memory.
- **3. Tactile Interactive Levers:**
  - *Model Parameter Count Dial:* $1\text{B}, 7\text{B}, 13\text{B}, 70\text{B}$ parameters.
  - *Fine-Tuning Paradigm:* `Full Fine-Tuning (All Weights)` vs `Frozen Backbone + Classifier Head` vs `PEFT / LoRA`.
  - *Optimizer Choice:* `Standard AdamW (16 bytes/param overhead)` vs `SGD (4 bytes)` vs `BitsAndBytes 8-bit Adam`.
- **4. Real-Time Visual Feedback:**
  - *Catastrophic Memory Explosion:* In Full Fine-Tuning of a 7B model, the VRAM gauge shoots from $14\text{ GB}$ (static model) to over $56\text{ GB}$ ($14\text{ GB}$ weights $+ 14\text{ GB}$ grads $+ 28\text{ GB}$ AdamW states), exceeding standard 24GB GPUs (RTX 4090) with an OOM explosion animation.
  - *Catastrophic Forgetting Representation:* A 2D radar diagram representing multi-task capabilities collapses into a distorted sliver as full fine-tuning obliterates general reasoning while overfitting to the narrow SFT domain.
  - *Parameter Freezing Shield:* Toggling PEFT wraps the entire base model in an icy blue freeze shield with label: `FROZEN: ZERO GRADIENTS / ZERO OPTIMIZER STATES`.
- **5. Procedural Web Audio Sonification Hooks:**
  - *VRAM Allocation Sweep:* Ascending scale tracking total gigabytes allocated.
  - *OOM Crack:* Loud electrical fracture and snap when memory exceeds hardware ceiling.
  - *Freeze Lock Sound:* Metallic padlock click locking model weights into read-only state.

---

#### Lesson T4-23: Low-Rank Adaptation (LoRA) $B \times A$ SVD Decomposition
- **1. Simulation Component Identifier:** `LoRASVDGeometryLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Matrix Geometry Decomposition Canvas ($1024 \times 540\text{ px}$).
  - *Center Visual:* Massive frozen base weight matrix $W_0 \in \mathbb{R}^{d \times k}$ ($4096 \times 4096$) in slate gray, flanked by two hyper-skinny adapter matrices:
    - Down-projection Matrix $A \in \mathbb{R}^{r \times k}$ (wide and thin).
    - Up-projection Matrix $B \in \mathbb{R}^{d \times r}$ (tall and thin).
  - *Coordinates:* Proportional geometric rectangles showing dimension scaling.
- **3. Tactile Interactive Levers:**
  - *Rank Slider ($r$):* $r \in \{1, 2, 4, 8, 16, 32, 64\}$.
  - *LoRA Alpha Scaling ($\alpha$):* $\alpha \in [1, 128]$ controlling scaling factor $\frac{\alpha}{r}$.
  - *Weight Merging Toggle:* `[Independent Forward (W_0 x + B A x)]` vs `[Merged Weight (W_merged = W_0 + (alpha/r) B A)]`.
  - *Target Modules Checkboxes:* `q_proj`, `k_proj`, `v_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`.
- **4. Real-Time Visual Feedback:**
  - *99.8% Parameter Shrinkage Badge:* Real-time parameter counter updating dynamically:
    $$\text{Params}_{\text{LoRA}} = 2 \times d \times r \ll d^2 \quad (r=8 \implies 65,536 \text{ vs } 16,777,216 \text{ params; } 99.61\% \text{ reduction})$$
  - *Initialization Geometry:* Matrix $A$ initializes with random Gaussian noise $\mathcal{N}(0, \sigma^2)$; Matrix $B$ initializes to strictly ZERO. The simulation highlights that $\Delta W = B \cdot A = 0$ at step 0, ensuring zero distortion to pre-trained capabilities.
  - *Interactive SVD Eigenspectrum:* Singular value distribution shows that intrinsic task updates concentrate into the top 4 singular directions, proving that low rank $r=8$ captures $> 95\%$ of functional fine-tuning delta.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Rank Notch Click:* Tactile rotary tick on each rank doubling ($r=4 \to 8 \to 16$).
  - *Matrix Merge Swarm:* Continuous ascending major chord as thin matrices $B$ and $A$ physically glide into $W_0$ during weight merging.
  - *Zero Initial State Affirmation:* Soft pure sine chime confirming $\Delta W \equiv 0$ on initialization.

---

#### Lesson T4-24: QLoRA: 4-Bit NormalFloat (NF4), Double Quantization & Paged Optimizers
- **1. Simulation Component Identifier:** `QLoRAQuantizationLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Quantization Lattice & Memory Architecture Canvas ($1000 \times 520\text{ px}$).
    - Left ($50\%$): 16-Bucket NormalFloat4 (NF4) Information-Theoretic Quantile Grid.
    - Right ($50\%$): Multi-Level Memory Hierarchy showing Double Quantization and CUDA Paged Memory Spilling.
- **3. Tactile Interactive Levers:**
  - *Quantization Method Selector:* `Standard INT4 (Linear grid)`, `FP4 (E2M1)`, `NF4 (Information-Theoretic NormalFloat)`.
  - *Double Quantization Switch:* Toggle `[Double Quant Active (Saves 0.37 bits/param)]` vs `[Single Quant]`.
  - *Memory Pressure Trigger:* Spikes memory to simulate CUDA Out-Of-Memory, activating Paged Optimizers to stream memory to CPU RAM.
- **4. Real-Time Visual Feedback:**
  - *Information-Theoretic NF4 Quantiles:* The standard normal distribution curve $\mathcal{N}(0, 1)$ is partitioned into 16 discrete intervals with EQUAL AREA under the curve. Points on the curve snap into the nearest discrete NF4 centroid, preserving high resolution near zero where most neural weights live.
  - *Double Quantization Visual:* Shows the scale factors $c_1$ of the 64-weight blocks themselves being clustered into 8-bit FP8 blocks ($c_2$), saving $0.37\text{ bits}$ per parameter ($3\text{ GB}$ across a 65B model).
  - *Paged Memory Conveyor:* When VRAM peaks, pages of AdamW optimizer states glide smoothly across the PCIe bus into host RAM without killing the training run.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Quantization Grid Snap:* Mechanical ratchet tick when weight values snap into NF4 discrete levels.
  - *PCIe Paging Drone:* Subtle low-frequency panning whoosh as optimizer states page across CPU-GPU memory.

---

### MODULE 43: Alignment & Preference Optimization: DPO & GRPO

---

#### Lesson T4-25: Reinforcement Learning from Human Feedback (RLHF) & PPO Horizons
- **1. Simulation Component Identifier:** `RlhfPpoDynamicsLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Four-Model RLHF Ecosystem Topology ($1024 \times 540\text{ px}$).
    - 4 Nodes arranged in balance: Actor Policy ($\pi_\theta$), Reference Model ($\pi_{\text{ref}}$), Reward Model ($r_\phi$), and Critic / Value Model ($V_\psi$).
  - *Coordinates:* 2D Force-directed node graph with animated token trajectory vectors and probability divergence histograms.
- **3. Tactile Interactive Levers:**
  - *KL Divergence Penalty Weight ($\beta$):* Slider $\beta \in [0.00, 0.50]$.
  - *PPO Clipping Epsilon ($\epsilon$):* Slider $\epsilon \in [0.05, 0.30]$ (controls trust region $[1-\epsilon, 1+\epsilon]$).
  - *Reward Model Score Dial:* Injects positive human preference score ($+3.5$) vs negative score ($-2.0$).
  - *Single Step PPO Gradient:* Fires policy update on surrogate objective $L_{\text{CLIP}}$.
- **4. Real-Time Visual Feedback:**
  - *Policy Drift Elastic Spring:* An elastic amber spring connects Policy $\pi_\theta$ to Reference Model $\pi_{\text{ref}}$.
    - When $\beta$ is low ($\beta \to 0$): Policy drifts far from baseline, triggering reward hacking (gibberish tokens with artificially high rewards).
    - When $\beta$ is tuned: Spring exerts restoring force, keeping outputs coherent.
  - *PPO Clipping Boundary Guardrails:* A 2D probability ratio chart displays the importance ratio $r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\text{old}}(a_t|s_t)}$. Ratios exceeding $[1-\epsilon, 1+\epsilon]$ hit bright red guardrails, clamping gradients to prevent catastrophic policy collapse.
- **5. Procedural Web Audio Sonification Hooks:**
  - *KL Divergence Stretch Tone:* Variable pitch whistle scaling with $\mathbb{D}_{\text{KL}}(\pi_\theta \parallel \pi_{\text{ref}})$.
  - *PPO Clip Snap:* Sharp snapping click whenever policy updates hit clipping boundaries.
  - *Reward Hacking Dissonance:* Chaotic microtonal cluster when policy collapses into repetitive high-reward exploit loops.

---

#### Lesson T4-26: Direct Preference Optimization (DPO) Closed-Form Rewards
- **1. Simulation Component Identifier:** `AlignmentTrajectoryLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Dual Token Log-Probability Trajectory Canvas ($1000 \times 520\text{ px}$).
    - Top Track ($50\%$): Winning Completion ($y_w$, Preferred by Human).
    - Bottom Track ($50\%$): Losing Completion ($y_l$, Rejected by Human).
  - *Coordinates:* Horizontal token axis showing log-probability ratios $\log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}$.
- **3. Tactile Interactive Levers:**
  - *Temperature / Beta Parameter ($\beta$):* Rotary dial $\beta \in [0.01, 0.50]$.
  - *Initial Probability Sliders:* Sliders setting initial policy log-probs for $y_w$ and $y_l$.
  - *Step DPO Loss Update Button:* Evaluates one step of gradient:
    $$\nabla_\theta \mathcal{L}_{\text{DPO}} = -\beta \, \sigma\left(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w)\right) \left[ \nabla \log \pi(y_w|x) - \nabla \log \pi(y_l|x) \right]$$
  - *Continuous Alignment Playback:* Animates the full alignment trajectory over 50 gradient steps.
- **4. Real-Time Visual Feedback:**
  - *Implicit Reward Margin Gap:* As DPO trains, the implicit reward bar for $y_w$ expands upward in emerald green (`#10B981`), while the implicit reward bar for $y_l$ is actively driven downward in rose (`#EF4444`).
  - *Implicit Dynamic Weighting:* When the model already assigns higher probability to $y_w$, the gradient weighting factor $\sigma(\hat{r}_l - \hat{r}_w)$ automatically scales down toward zero, preventing over-optimization.
  - *No Separate Reward Model Badge:* A crossed-out icon over the Critic and Reward networks explicitly highlights the elimination of separate RLHF models, reducing training complexity to standard binary cross-entropy.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Preference Separation Chime:* Dual tones: one rising in pitch (preferred completion $y_w$) and one descending in pitch (rejected completion $y_l$) as margin widens.
  - *Sigmoid Damping Click:* Subtle wood-block click when the implicit weighting factor dampens updates on already-aligned pairs.

---

#### Lesson T4-27: Group Relative Policy Optimization (GRPO) & Test-Time Reasoning
- **1. Simulation Component Identifier:** `GrpoReasoningLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Group Candidate Rollout & Reasoning Horizon Canvas ($1024 \times 540\text{ px}$).
  - *Coordinates:* Parallel execution tracks showing a group of $G=8$ rollout completions generated for a single mathematical reasoning prompt.
  - *Right Side:* Real-time group statistics distribution: mean reward $\bar{r}$, standard deviation $\sigma_r$, and normalized advantage $\hat{A}_i = \frac{r_i - \bar{r}}{\sigma_r}$.
- **3. Tactile Interactive Levers:**
  - *Group Size ($G$) Slider:* $G \in \{4, 8, 16, 32\}$ parallel rollout candidate completions.
  - *Reward Verifier Type:* `Strict Math Rule-Based (0 or 1)`, `Code Unit Test Pass Rate`, `Format Compliance (Regex)`.
  - *Reasoning Length Ceiling ($T_{\text{reasoning}}$):* Slider $256$ to $4096$ reasoning tokens.
  - *Sample Rollout Button:* Generates $G$ diverse candidate reasoning trajectories.
- **4. Real-Time Visual Feedback:**
  - *Elimination of Value Network:* Interface displays an empty, greyed-out Critic box with label: `VALUE NETWORK ELIMINATED: Baseline dynamically derived from group statistics`.
  - *Normalized Advantage Coloring:*
    - Rollouts with $r_i > \bar{r}$ glow emerald with positive advantage arrows $\hat{A}_i > 0$.
    - Rollouts with $r_i < \bar{r}$ glow crimson with negative advantage arrows $\hat{A}_i < 0$.
  - *The "Aha Moment" Reasoning Lengthening:* As GRPO trains over multiple epochs, the length of the internal reasoning chain (`<think> ... </think>`) expands visibly on the canvas, demonstrating spontaneous emergence of self-correction and multi-step verification.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Parallel Rollout Swarm:* Granular sound synthesizer emitting a flurry of $G$ micro-clicks as parallel rollouts finish generation.
  - *Group Normalization Sweep:* Resonant chime whose pitch centers on group mean reward $\bar{r}$, with chord width proportional to $\sigma_r$.
  - *Aha Moment Harmonic:* Major 9th chime sequence when a correct mathematical proof completes after backtracking.

---

### MODULE 44: State-Space Models: Mamba Selective Scan

---

#### Lesson T4-28: Continuous State-Space Models, HiPPO Memory & S4 Recurrence
- **1. Simulation Component Identifier:** `ContinuousSsmS4Lab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Continuous Physical System to Discrete Recurrence Canvas ($1000 \times 520\text{ px}$).
    - Left ($50\%$): Continuous State-Space Trajectory $\dot{h}(t) = Ah(t) + Bx(t)$ with HiPPO memory matrix.
    - Right ($50\%$): Zero-Order Hold (ZOH) Discretization & Global Convolution Kernel ($K \in \mathbb{R}^L$).
  - *Coordinates:* Phase space plane $(h_1(t), h_2(t))$ and continuous time series axis $t \in [0, T]$.
- **3. Tactile Interactive Levers:**
  - *Discretization Step Size Dial ($\Delta$):* $\Delta \in [0.001, 0.500]$ (controls sampling resolution).
  - *State Matrix Preset:* `HiPPO Matrix (Optimal Polynomial Memory)` vs `Random Normal A` vs `Diagonal Stable A`.
  - *State Dimension ($N$):* $N \in \{4, 8, 16, 64\}$.
  - *Input Signal Shape:* Toggle input $x(t)$ between `Dirac Delta Impulse`, `Square Pulse`, and `High-Frequency Audio Sine`.
- **4. Real-Time Visual Feedback:**
  - *HiPPO Legendre Polynomial Reconstruction:* In HiPPO mode, the hidden state vector $h(t)$ acts as coefficients of shifted Legendre polynomials, reconstructing the entire past history of input $x(t)$ with near-perfect fidelity.
  - *ZOH Continuous-to-Discrete Morph:* A continuous curve is visually integrated over intervals of width $\Delta$, displaying the exact matrix exponential transformation:
    $$\bar{A} = \exp(\Delta A), \quad \bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot \Delta B$$
  - *Dual Identity View:* Toggle between Recurrent Mode ($O(1)$ step inference) and Convolutional Mode ($O(L \log L)$ parallel FFT training).
- **5. Procedural Web Audio Sonification Hooks:**
  - *Continuous Impulse Response Tone:* Audio synthesis directly playing the continuous impulse response $y(t) = C e^{A t} B$.
  - *Discretization Aliasing Buzz:* Harsh buzzing artifact if $\Delta$ exceeds Nyquist sampling threshold.

---

#### Lesson T4-29: Mamba Selective Scan: Input-Dependent Hardware-Aware Associative Scan
- **1. Simulation Component Identifier:** `MambaScanVisualizer`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Hardware-Aware Parallel Associative Scan Architecture ($1024 \times 540\text{ px}$).
    - Top ($35\%$): Input-Dependent Selection Parameter Rails ($\Delta_t = \text{softplus}(\text{Linear}(x_t)), B_t = \text{Linear}(x_t), C_t = \text{Linear}(x_t)$).
    - Bottom ($65\%$): Binary Tree Associative Parallel Scan Network ($L=8$ tokens) executing in fast GPU SRAM.
- **3. Tactile Interactive Levers:**
  - *Selective Filtering Gate Switch:* Inject noise tokens into text stream: `"The capital of France [lorem ipsum noise] is Paris"`.
  - *SRAM Memory Highway Toggle:* `[Mamba Selective Scan (SRAM Kernel)]` vs `[Standard Attention N x N Grid]`.
  - *Associative Scan Step Slider:* Steps through tree-reduction levels ($k=1, 2, 4$ steps).
- **4. Real-Time Visual Feedback:**
  - *Selective Memory Gate Valve:* When irrelevant noise tokens enter, Mamba's input-dependent $\Delta_t$ shrinks dynamically to near zero ($\Delta_t \to 0$), which sets $\bar{A}_t = \exp(\Delta_t A) \to I$ and $\bar{B}_t \to 0$. The hidden state bypasses the noise completely without overwriting crucial context!
  - *Binary Associative Scan Tree:* Colored pulses execute the parallel scan operator:
    $$(a_i, b_i) \bullet (a_{i-1}, b_{i-1}) = (a_i a_{i-1}, a_i b_{i-1} + b_i)$$
    Pairs of adjacent states combine in parallel, completing an 8-token recurrence in just $\log_2(8) = 3$ parallel time steps instead of 8 sequential steps.
  - *Linear vs Quadratic Scaling Meter:* Graph showing Mamba's linear $O(L)$ compute and memory footprint outperforming Transformers' $O(L^2)$ curve at sequence lengths $> 2048$ tokens.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Selective Gate Squelch:* High-Q resonant filter closing down (1200 Hz $\to$ 200 Hz) when $\Delta_t$ rejects a noise token.
  - *Parallel Tree Scan Chimes:* Rapid crystalline 3-tier cascade of glass bells corresponding to the $\log_2(N)$ tree scan reductions.

---

### MODULE 45: Generative Diffusion Models: DDPM & Score SDEs

---

#### Lesson T4-30: Denoising Diffusion Probabilistic Models (DDPM) Forward Noising
- **1. Simulation Component Identifier:** `DdpmForwardNoisingLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Forward Markovian Noising Process Viewport ($1000 \times 520\text{ px}$).
  - *Left ($60\%$):* 2D Swiss Roll / Gaussian Mixture Manifold Point Cloud ($N = 2000$ particles).
  - *Right ($40\%$):* Variance Schedule & SNR Decay Timeline ($t \in [0, T]$, $T=1000$ steps).
  - *Coordinates:* Normalized 2D data domain $[-3, 3] \times [-3, 3]$.
- **3. Tactile Interactive Levers:**
  - *Forward Timestep Scrubber ($t$):* Continuous scrubber $t \in [0, 1000]$.
  - *Noise Schedule Selector:* `Linear Schedule (beta_1=1e-4, beta_T=0.02)`, `Cosine Schedule (Nichol & Dhariwal)`.
  - *Closed-Form Jump Button:* `[Jump Directly to Step t (Single Gaussian Sample)]`:
    $$q(x_t \mid x_0) = \mathcal{N}\left(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) \mathbf{I}\right)$$
  - *Data Distribution Preset:* `Swiss Roll`, `Two Concentric Rings`, `Digit 8 Glyphs`.
- **4. Real-Time Visual Feedback:**
  - *Particle Diffusion Dispersion:* As $t$ scrubs from $0 \to 1000$, the sharp, intricate structure of the Swiss Roll gradually blurs and dissolves into pure isotropic standard Gaussian noise $\mathcal{N}(0, \mathbf{I})$.
  - *Closed-Form vs Markov Stepping Overlay:* Shows that sampling $x_t$ via the cumulative product $\bar{\alpha}_t = \prod_{s=1}^t (1 - \beta_s)$ yields the identical mathematical distribution as stepping through 1000 individual Markov transitions, with an instantaneous $1000\times$ computation speedup.
  - *Signal-to-Noise Ratio (SNR) Gauge:* Real-time readout of $\text{SNR}(t) = \frac{\bar{\alpha}_t}{1 - \bar{\alpha}_t}$, showing the transition from data-dominated to noise-dominated regime.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Diffusion Noise Hiss:* Pure white noise whose volume and bandwidth steadily expand as $t$ increases from $0 \to 1000$, masking the clear fundamental tone of the data.
  - *Closed-Form Teleport Zap:* High-voltage frequency sweep zap when triggering the single-step jump.

---

#### Lesson T4-31: Score-Based Reverse SDEs, Reverse Sampling & Classifier-Free Guidance
- **1. Simulation Component Identifier:** `DiffusionTrajectoryLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Reverse Generative SDE Trajectory Studio ($1024 \times 540\text{ px}$).
  - *Main Canvas ($70\%$ width):* 2D Generative Plane with dynamic score vector field arrows ($\nabla_x \log p_t(x)$) and particle trajectories.
  - *Right Side ($30\%$ width):* Guidance Controls, Temperature, and Sampler Architecture.
  - *Coordinates:* Normalized 2D coordinate space $[-3, 3] \times [-3, 3]$.
- **3. Tactile Interactive Levers:**
  - *Reverse Time Scrubber ($t$):* Reverse scrub from pure noise $t=1000$ back to structured data $t=0$.
  - *Classifier-Free Guidance Scale ($s$):* Slider $s \in [0.0, 15.0]$:
    $$\tilde{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \emptyset) + s \left( \epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \emptyset) \right)$$
  - *Sampler Algorithm:* `DDPM (Ancestral Stochastic Sampling)`, `DDIM (Deterministic ODE, eta=0)`, `Predictor-Corrector SDE`.
  - *Target Class Conditioning ($c$):* Toggle conditional attractor clusters (e.g. `Cluster A (Top-Left)`, `Cluster B (Bottom-Right)`).
- **4. Real-Time Visual Feedback:**
  - *Dynamic Score Vector Field:* The background displays a dense grid of animated cyan arrows representing the learned score function $\nabla_x \log p_t(x)$. Arrows dynamically point toward high-density data modes.
  - *Guidance Vector Extrapolation:* Shows the unconditioned score vector and conditioned score vector. As guidance scale $s > 1.0$, an amplified magenta vector pushes trajectories aggressively into the core of the target class manifold, penalizing off-target modes.
  - *Particle Crystallization Wave:* As reverse time passes $t=200 \to 0$, hazy diffuse particles snap cleanly into sharp high-density cluster points, symbolizing generative image crystallization.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Reverse Crystallization Drone:* White noise hiss that steadily contracts and filters down into a radiant, pure crystal sine chord (C major 9th) as particles coalesce into structure.
  - *Guidance Tension Buzz:* Subtle metallic buzzing when guidance scale $s > 7.0$ indicates potential mode collapse / over-saturation.

---

### MODULE 46: Autonomous LLM Agents: ReAct, Tool Calling & Tree-of-Thought

---

#### Lesson T4-32: ReAct Agent Loops & Deterministic JSON Tool Execution
- **1. Simulation Component Identifier:** `AgentExecutionGraphLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Cyclic ReAct State Machine & Tool Execution Sandbox ($1024 \times 540\text{ px}$).
  - *Left ($60\%$):* Directed State Machine Loop displaying nodes: `[User Prompt]` $\to$ `[Thought]` $\to$ `[Action / Tool Call]` $\to$ `[Environment Observation]` $\to$ `[Final Answer]`.
  - *Right ($40\%$):* Live JSON Schema Payload Inspector & Sandbox Environment Mock.
- **3. Tactile Interactive Levers:**
  - *Mock Environment Failure Toggle:* Switch tool responses between `[Success (200 OK)]`, `[Tool Timeout / Error (500)]`, `[Schema Validation Failure]`.
  - *Context Window Budget Scrubber:* Adjusts token ceiling ($2k$ to $32k$ tokens) showing memory truncation.
  - *Step-by-Step ReAct Stepper:* Advances the loop one phase at a time (`Thought` $\to$ `Action` $\to$ `Observation`).
  - *Scenario Dropdown:*
    - Scenario 1: Multi-Step Financial Math (`Search` $\to$ `Calculator` $\to$ `Plot`)
    - Scenario 2: Error Recovery Loop (Invalid SQL query $\to$ Error observed $\to$ Self-corrected query)
- **4. Real-Time Visual Feedback:**
  - *Active State Ring Pulse:* The active stage in the cycle illuminates with an intense rotating emerald halo (`#10B981`).
  - *JSON Schema Validator Scanner:* When the agent issues a tool call, a virtual laser scans the generated JSON arguments against the tool's parameter schema. Valid properties highlight green; missing required fields pulse red with immediate agent self-correction feedback.
  - *Observation Injection Flow:* Translucent amber packet animates from the environment terminal directly into the agent's context history prompt, showing how observations ground the next thought.
- **5. Procedural Web Audio Sonification Hooks:**
  - *State Transition Click:* Distinct mechanical micro-switch click on each phase transition (`playClick()`).
  - *Tool Invocation Hum:* Short 200ms processing drone during mock environment tool execution (`startExecutionHum()` / `stopExecutionHum()`).
  - *Validation Failure Buzzer:* Quick warning buzzer if tool parameters fail schema validation, followed by a double click as the agent self-repairs.

---

#### Lesson T4-33: Deliberate Reasoning & Tree-of-Thought (ToT) Graph Search
- **1. Simulation Component Identifier:** `TreeOfThoughtSearchLab`
- **2. Coordinate System & Canvas Layout:**
  - *Layout:* Branching Search Tree Visualization Canvas ($1024 \times 540\text{ px}$).
  - *Coordinates:* Hierarchical tree layout with root prompt at top, branching into depth levels $d \in [1, 4]$. Each node represents a generated intermediate thought state.
  - *Right Side Panel:* Value Evaluation Heuristic Inspector (Scores $V(s) \in [0.0, 1.0]$: Sure / Likely / Impossible).
- **3. Tactile Interactive Levers:**
  - *Search Strategy Selector:* `Breadth-First Search (BFS)`, `Depth-First Search (DFS)`, `A* Best-First Search`.
  - *Branching Factor ($b$) & Max Depth ($d$) Sliders:* $b \in [2, 5]$, $d \in [2, 4]$.
  - *Pruning Threshold ($\tau$):* Heuristic score cutoff below which branches are instantly pruned.
  - *Step Search Button:* Advances the search algorithm by one thought expansion or evaluation step.
- **4. Real-Time Visual Feedback:**
  - *Dynamic Branch Evaluation:* Active nodes glow yellow during self-evaluation. Evaluator emits score badge:
    - High potential ($V > 0.8$): Node turns glowing emerald (`#10B981`) and spawns children.
    - Dead end ($V < 0.3$): Node flashes crimson (`#EF4444`); an animated laser scissor cleanly severs the branch, pruning entire sub-trees to conserve token budget.
  - *Backtracking Trajectory:* In DFS mode, when a dead end is encountered, a glowing cursor rewinds smoothly up the tree to the nearest un-explored parent branch with an elastic snap animation.
  - *Optimal Solution Highway:* Once the goal node is reached, the complete successful path from Root to Solution lights up as a thick, pulsing emerald laser beam.
- **5. Procedural Web Audio Sonification Hooks:**
  - *Thought Expansion Chime:* Soft marimba tap on each child thought generation.
  - *Branch Prune Snip:* High-frequency ceramic snap sound when a branch is pruned.
  - *Backtrack Whoosh:* Gentle reverse wind whoosh as the search rewinds up the hierarchy.
  - *Solution Mastery Fanfare:* Full 5-note victory chord (C5, E5, G5, B5, D6) when the search successfully verifies the terminal reasoning goal.

---

## 3. Master Component Cross-Reference & File Routing Matrix

| Module | Lesson ID | Lesson Title | Simulation Component Identifier | Engine | Primary Interactive Levers | Web Audio Sonification Cues |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MOD-35** | `T4-01` | Scalar Autograd Engine & Value Primitive | `AutogradGraphLab` | `canvas2d` | Value scrubbers, step backprop | Forward arpeggio, adjoint click |
| **MOD-35** | `T4-02` | Dynamic Computational DAGs & Topo Sort | `DynamicDagLab` | `canvas2d` | Expression selector, DFS speed dial | DFS tick, post-order push bell |
| **MOD-35** | `T4-03` | Reverse Adjoints & Multivariate Chain Rule | `AdjointBackpropCanvas` | `canvas2d` | Branch gradient sliders, step `+=` | Adjoint stream chord, clink |
| **MOD-36** | `T4-04` | MLP Activations & Dead Neurons | `NeuralActivationCanvas` | `canvas2d` | Activation dropdown, distribution shift | Saturation drone, dead neuron siren |
| **MOD-36** | `T4-05` | Loss Landscapes & SGD with Momentum | `OptimizationDynamicsLab` | `webgl` | Optimizer selector, LR knob, momentum $\beta$ | Continuous loss pitch, divergence thud |
| **MOD-36** | `T4-06` | Adaptive Moment Estimation: Adam & AdamW | `AdamWOptimizerLab` | `canvas2d` | $\beta_1, \beta_2$, weight decay $\lambda$, warmup scrub | Execution hum, decoupled decay click |
| **MOD-37** | `T4-07` | Spatial Convolutions, Strides & Padding | `ConvolutionFilterCanvas` | `canvas2d` | Kernel presets, custom weights, stride/pad | Typewriter stride tick, edge strum |
| **MOD-37** | `T4-08` | Normalization: BatchNorm, LayerNorm, RMSNorm| `NormalizationGeometryLab` | `canvas2d` | Architecture switch, $\gamma, \beta$, epsilon $\epsilon$ | Slice rotation chime, epsilon buzz |
| **MOD-37** | `T4-09` | Gradient Degradation & ResNet Highways | `ResidualHighwayLab` | `canvas2d` | Depth slider, weight scale $||W||$, skip switch | Vanishing fade-out, bypass organ drone |
| **MOD-38** | `T4-10` | Recurrent Architectures & BPTT | `RnnUnrollCanvas` | `canvas2d` | Sequence length $T$, recurrent eigenvalue $\lambda$ | Reverse tick, exponential decay silence |
| **MOD-38** | `T4-11` | Gated Memory: LSTM Cell Highways & GRU | `LstmCellHighwayLab` | `canvas2d` | Forget bias $b_f$, input salience, memory charge | Valve click, memory write cello strum |
| **MOD-38** | `T4-12` | Byte-Pair Encoding (BPE) Tokenization | `BpeTokenizerLab` | `canvas2d` | Text corpus box, vocabulary ceiling, merge step | Merge snap, leaderboard re-sort |
| **MOD-39** | `T4-13` | Scaled Dot-Product Attention & Scaling | `AttentionHeatmapCanvas` | `canvas2d` | Dimension $d_k$, variance scaling, temperature $\tau$ | Attention entropy sweep, sat alarm |
| **MOD-39** | `T4-14` | Causal Autoregressive Masking | `CausalMaskLab` | `canvas2d` | Mask toggle, generation step, leak probe | Typewriter return clack, block thud |
| **MOD-39** | `T4-15` | Multi-Head Attention & Subspace Routing | `MultiHeadAttentionLab` | `webgl` | Active head selector, 3D orbit, task presets | Head arpeggio, 8-voice polyphony |
| **MOD-40** | `T4-16` | Rotary Position Embeddings (RoPE) Phasors | `RoPEPhasorCanvas` | `canvas2d` | Position $m$, frequency $k$, base $\theta_b$, $\Delta m$ | Phasor whistle, relative beat |
| **MOD-40** | `T4-17` | Normalization Topologies: Pre-LN vs Post-LN | `PrePostLnHighwayLab` | `canvas2d` | Depth $L$, warmup toggle, backprop impulse | Cold-start crash, Pre-LN pure drone |
| **MOD-40** | `T4-18` | SwiGLU Gating & KV Caching Mechanics | `SwiGluKVCacheLab` | `canvas2d` | Batch $b$, context $s$, precision, step decode | Token decode tick, VRAM limit bass |
| **MOD-41** | `T4-19` | Memory Bandwidth & Grouped-Query Attn | `GqaMemoryBandwidthLab` | `canvas2d` | Query heads $H_Q$, KV heads $H_{KV}$, benchmark | Bandwidth pink noise, group chime |
| **MOD-42** | `T4-20` | FlashAttention: SRAM Tiling & Online Softmax | `FlashAttentionMemoryLab` | `canvas2d` | Tile size $B_r$, sequence $N$, algorithm switch | SRAM transfer thud, HBM grind |
| **MOD-41** | `T4-21` | FlashAttention-2 SM Partitioning & Backward | `FlashAttention2KernelLab` | `canvas2d` | Loop order, warp specialization, recompute | Thread warp hum, atomic lock tick |
| **MOD-42** | `T4-22` | PEFT Foundations & SFT Memory Catastrophe | `PeftParameterLandscapeLab`| `canvas2d` | Param dial, tuning paradigm, optimizer choice | VRAM allocation sweep, freeze click |
| **MOD-42** | `T4-23` | Low-Rank Adaptation (LoRA) $B \times A$ SVD | `LoRASVDGeometryLab` | `canvas2d` | Rank $r$, alpha $\alpha$, merge toggle, module checks | Rank notch click, merge swarm |
| **MOD-42** | `T4-24` | QLoRA: NF4, Double Quantization & Paging | `QLoRAQuantizationLab` | `canvas2d` | Quant method, double quant switch, page trigger | Quant snap, PCIe paging whoosh |
| **MOD-43** | `T4-25` | RLHF & PPO Trust Region Horizons | `RlhfPpoDynamicsLab` | `canvas2d` | KL weight $\beta$, clip $\epsilon$, reward dial, step | KL stretch whistle, PPO clip snap |
| **MOD-43** | `T4-26` | Direct Preference Optimization (DPO) | `AlignmentTrajectoryLab` | `canvas2d` | Beta $\beta$, initial log-probs, step DPO loss | Preference separation dual chime |
| **MOD-43** | `T4-27` | Group Relative Policy Optimization (GRPO) | `GrpoReasoningLab` | `canvas2d` | Group size $G$, reward verifier, reasoning max | Parallel rollout swarm, Aha chime |
| **MOD-44** | `T4-28` | Continuous SSMs, HiPPO & S4 Recurrence | `ContinuousSsmS4Lab` | `canvas2d` | Step size $\Delta$, state matrix $A$, input shape | Impulse response tone, aliasing buzz |
| **MOD-44** | `T4-29` | Mamba Selective Scan: Hardware-Aware | `MambaScanVisualizer` | `canvas2d` | Noise filter switch, architecture, scan step | Selective gate squelch, tree scan chime |
| **MOD-45** | `T4-30` | DDPM Markov Forward Noising Process | `DdpmForwardNoisingLab` | `canvas2d` | Timestep $t$, noise schedule, closed-form jump | Diffusion noise hiss, teleport zap |
| **MOD-45** | `T4-31` | Reverse SDEs, Predictor-Corrector & CFG | `DiffusionTrajectoryLab` | `canvas2d` | Reverse scrubber $t$, guidance $s$, sampler, class | Reverse crystallization, guidance buzz|
| **MOD-46** | `T4-32` | ReAct Loops & Deterministic Tool Calling | `AgentExecutionGraphLab` | `canvas2d` | Mock environment errors, budget scrub, step | State click, tool hum, error buzz |
| **MOD-46** | `T4-33` | Deliberate Reasoning & Tree-of-Thought (ToT)| `TreeOfThoughtSearchLab` | `canvas2d` | Search type (BFS/DFS/A*), $b, d$, threshold $\tau$ | Thought chime, prune snip, victory |

---

## 4. Integration Verification & Authoring Directives

### 4.1 Curriculum AST Embedding Pattern
To invoke any of these 33 specifications within an `.okvir.md` lesson file, authors use the standardized AST directive format:

```markdown
:::simulation-widget{engine="canvas2d" component="RoPEPhasorCanvas"}
---
token_position: 12
channel_dim_index: 4
base_theta: 10000.0
show_relative_phase_decay: true
sonification_enabled: true
---
:::
```

### 4.2 Quality Assurance Checklist for Track 4 Simulations
1. [x] **Zero Garbage Collection Allocation:** Vector buffers and projection instances must be declared once in component scope.
2. [x] **HiDPI Retina Sync:** `canvas.width = rect.width * dpr` must be triggered on resize.
3. [x] **Audio User Gesture Unlock:** Must hook into `ProceduralAudioEngine.unlock()` on first pointer interaction.
4. [x] **KaTeX Dynamic Binding:** Formulas must match simulation parameter mutations with latency $< 16\text{ ms}$.
5. [x] **Mobile & Tablet Touch Safe:** Pointer events must support multi-touch and touch-action panning isolation.
