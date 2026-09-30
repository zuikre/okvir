# OKVIR Track 1: Mathematical Foundations
## Comprehensive Visual & Simulation Architecture Specification (MOD-01 to MOD-07 • 29 Lessons)

> **Specification Standard:** Distill.pub / Observable HQ / 3Blue1Brown Geometric Rigor  
> **Target Framework:** React 19 / TypeScript 5 / HTML5 Canvas 2D & WebGL / Web Audio API  
> **Color Scheme:** Dark High-Contrast Mathematical Theme (Tailwind Slate/Sky/Indigo/Rose/Emerald)  
> **Auditory Engine:** Zero-asset Procedural Web Audio (`ProceduralAudioEngine.ts` / `WebAudioSonifier.ts`)

---

## 1. Global Architecture & Foundational Standards

Every simulation in Track 1 adheres to the standard OKVIR Interactive Canvas Protocol.

### 1.1 HiDPI Retina Display Pipeline
```typescript
export function setupRetinaCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): number {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.resetTransform();
  ctx.scale(dpr, dpr);
  return dpr;
}
```

### 1.2 Coordinate System Mapping Pipeline (`CanvasCoordinateTransformer`)
For 2D coordinate spaces, an isometric mapping is enforced to prevent distortion of angles (orthogonal vectors must look physically perpendicular):
```typescript
export class CanvasCoordinateTransformer {
  constructor(
    public bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
    public margins: { top: number; right: number; bottom: number; left: number } = { top: 28, right: 28, bottom: 28, left: 28 }
  ) {}

  public getPlotDimensions(width: number, height: number) {
    return {
      plotW: Math.max(1, width - this.margins.left - this.margins.right),
      plotH: Math.max(1, height - this.margins.top - this.margins.bottom),
    };
  }

  public dataToScreen(x: number, y: number, width: number, height: number) {
    const { plotW, plotH } = this.getPlotDimensions(width, height);
    const ux = (x - this.bounds.xMin) / (this.bounds.xMax - this.bounds.xMin);
    const uy = (y - this.bounds.yMin) / (this.bounds.yMax - this.bounds.yMin);
    return {
      px: this.margins.left + ux * plotW,
      py: this.margins.top + (1 - uy) * plotH, // Invert Y for screen Cartesian
    };
  }

  public screenToData(px: number, py: number, width: number, height: number, clamp = true) {
    const { plotW, plotH } = this.getPlotDimensions(width, height);
    let ux = (px - this.margins.left) / plotW;
    let uy = 1 - (py - this.margins.top) / plotH;
    if (clamp) {
      ux = Math.max(0, Math.min(1, ux));
      uy = Math.max(0, Math.min(1, uy));
    }
    return {
      x: Number((this.bounds.xMin + ux * (this.bounds.xMax - this.bounds.xMin)).toFixed(3)),
      y: Number((this.bounds.yMin + uy * (this.bounds.yMax - this.bounds.yMin)).toFixed(3)),
    };
  }
}
```

### 1.3 Universal Dark Mode Color Palette
| Semantic Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#090d16` / `#0b0f19` | Deep obsidian blue slate canvas base |
| **Major Grid Lines** | `#1e293b` (Alpha 0.6) | 1.0 unit Cartesian intervals |
| **Minor Grid Lines** | `#111827` (Alpha 0.4) | 0.2 unit sub-grid intervals |
| **Primary Vector / Locus** | `#38bdf8` (Sky 400) | Main interactive state / vector $\mathbf{v}$ |
| **Secondary Vector / Basis** | `#818cf8` (Indigo 400) | Secondary input / reference vector $\mathbf{u}$ |
| **Accent / Invariant / Target** | `#f43f5e` (Rose 500) | Eigenvectors / Target vectors / Maxima |
| **Success / Projection / Orthonormal** | `#34d399` (Emerald 400) | Projections, orthogonal complements, converged minima |
| **Warning / Nullspace / Dissonance** | `#fbbf24` (Amber 400) | Singularities, rank collapse, constraints |
| **Ghost Trail / Memory Trail** | `#64748b` (Slate 500 @ 0.3) | Previous positions, momentum history |

### 1.4 Procedural Web Audio Event Protocol
All simulations trigger synthesized audio via `proceduralAudio`:
- `playClick(pitchMultiplier)`: Magnetic latch, mode toggle, quadrant snap.
- `playScrubTick(velocity)`: Rotary dial movement, slider scrub, continuous angle rotation.
- `playErrorDissonance()`: Singular matrix collapse, out-of-bounds drag, numerical divergence.
- `playVictoryHarmonics()`: Resonance discovery (eigenvector lock, zero-residual line, global minimum).
- `startContinuousLoss()` / `updateLoss(loss)` / `stopContinuousLoss()`: Real-time frequency pitch shift ($130\,\text{Hz} \to 840\,\text{Hz}$) inversely proportional to optimization alignment.

---

## 2. MOD-01: Cartesian Geometry & Metric Foundations

### LESSON-T1-01: Cartesian Coordinate Systems & The Euclidean Metric
- **Component Identifier:** `CartesianMetricCanvas` (Extension of `VectorGeometryCanvas`)
- **Mathematical Anchor:**
  $$d(\mathbf{p}, \mathbf{q}) = \|\mathbf{p} - \mathbf{q}\|_2 = \sqrt{(p_x - q_x)^2 + (p_y - q_y)^2}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -6.0, xMax: 6.0, yMin: -4.5, yMax: 4.5 }` (Aspect ratio $4:3$, strictly isometric $\Delta x = \Delta y$).
  - `Margins`: `{ top: 32, right: 32, bottom: 32, left: 32 }`.
  - `dataToScreen`:
    $$\text{px} = \text{left} + \frac{x - x_{\min}}{x_{\max} - x_{\min}} \cdot \text{plotW}, \quad \text{py} = \text{top} + \left(1 - \frac{y - y_{\min}}{y_{\max} - y_{\min}}\right) \cdot \text{plotH}$$
  - `screenToData`: Inverses clamped to $[-6.0, 6.0] \times [-4.5, 4.5]$.
  - Retina HiDPI scale factor applied via `ctx.scale(dpr, dpr)`.
- **Tactile Interactive Levers:**
  - **Draggable Point $P$ (`pHandle`):** Circle radius $9\text{px}$, hit radius $20\text{px}$, hover glow $16\text{px}$ halo.
  - **Draggable Point $Q$ (`qHandle`):** Circle radius $9\text{px}$, hit radius $20\text{px}$, hover glow $16\text{px}$ halo.
  - **Grid Snapping:** Magnetic snap to integer coordinates $(x \in \mathbb{Z}, y \in \mathbb{Z})$ when distance to integer lattice $< 0.18$ data units ($10\text{px}$ screen radius).
  - **Axis Snapping:** Snaps to $x=0$ or $y=0$ when $|x| < 0.12$ or $|y| < 0.12$.
- **Real-Time Visual Feedback:**
  - **Points:** $P$ rendered in `#38bdf8` (Sky blue), $Q$ in `#818cf8` (Indigo).
  - **Right-Angle Construction:** Horizontal leg $(q_x, p_y)$ to $(p_x, p_y)$ dashed `#64748b`, vertical leg $(q_x, p_y)$ to $(q_x, q_y)$ dashed `#64748b`. Right-angle square symbol ($8\times 8\text{px}$) at vertex.
  - **Geometric Pythagorean Squares:** Translucent polygons expanding outward from horizontal leg $(\Delta x)^2$, vertical leg $(\Delta y)^2$, and hypotenuse $d^2$ with fill `#38bdf8` at alpha $0.15$.
  - **Metric Readout HUD:** Dynamic floating badge displaying $\Delta x = |p_x - q_x|$, $\Delta y = |p_y - q_y|$, and $d = \sqrt{\Delta x^2 + \Delta y^2}$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick(vel)` on dragging points across grid coordinate lines.
  - `playClick(1.2)` on snapping to integer lattice point or coordinate axis.
  - `playVictoryHarmonics()` when points form an integer Pythagorean triple (e.g. $3-4-5$ or $5-12-13$).

---

### LESSON-T1-02: Slopes, Rates of Change & The Linear Equation
- **Component Identifier:** `LinearSlopeRateCanvas`
- **Mathematical Anchor:**
  $$m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}, \quad y = m(x - x_1) + y_1$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 30, right: 30, bottom: 30, left: 30 }`.
  - Isotropic isometric scaling with tick lines every $1.0$ unit.
- **Tactile Interactive Levers:**
  - **Pivot Handle $(x_1, y_1)$:** Draggable primary handle controlling intercept and base point.
  - **Slope Direction Handle $(x_2, y_2)$:** Draggable polar control handle anchored on the line.
  - **Horizontal $\Delta x$ Scrubber:** Bottom slider expanding/contracting the run increment from $0.1$ to $3.0$.
  - **Snapping Thresholds:**
    - Snaps to slope $m = 0$ (horizontal line) within $\pm 2.0^\circ$ angular threshold.
    - Snaps to slope $m = 1$ ($45^\circ$) and $m = -1$ ($-45^\circ$) within $\pm 2.0^\circ$.
    - Snaps to vertical slope $|m| = \infty$ within $\pm 1.5^\circ$.
- **Real-Time Visual Feedback:**
  - **Infinite Line:** Solid continuous stroke `#38bdf8` width $2.5\text{px}$ clipped to domain bounds.
  - **Slope Triangle ("Rise over Run"):** Shaded triangle bounded by $(x_1, y_1)$, $(x_2, y_1)$, and $(x_2, y_2)$ with green `#34d399` vertical rise and amber `#fbbf24` horizontal run.
  - **Ghost Slope Rays:** Faint dashed ghost lines at $m = 1, 0, -1$ for reference.
  - **Singularity Warning:** When approaching vertical line ($|\Delta x| < 0.05$), line glows `#f43f5e` with pulsing warning symbol "Undefined Slope ($\Delta x \to 0$)".
- **Procedural Web Audio Hooks:**
  - `playScrubTick(velocity)` during rotary rotation of slope handle.
  - `playClick(1.0)` when snapping to horizontal ($m=0$) or unit ($m=\pm 1$) slope.
  - `playErrorDissonance()` when crossing vertical division-by-zero singularity.

---

### LESSON-T1-03: Vectors as Geometric Displacements
- **Component Identifier:** `VectorGeometryCanvas`
- **Mathematical Anchor:**
  $$\mathbf{v} = \begin{bmatrix} v_x \\ v_y \end{bmatrix}, \quad \|\mathbf{v}\|_2 = \sqrt{v_x^2 + v_y^2}, \quad \theta = \text{atan2}(v_y, v_x)$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Origin $(0, 0)$ mapped exactly to canvas center $(w/2, h/2)$.
- **Tactile Interactive Levers:**
  - **Vector Tip Handle:** Draggable ring at $(v_x, v_y)$, radius $10\text{px}$, stroke `#38bdf8`, fill `#0b0f19`.
  - **Origin Relocation Lever:** Option to unpin root $(x_0, y_0)$ from origin to demonstrate translation invariance.
  - **Snapping:** Snaps tip to coordinate lattice $(v_x, v_y \in \mathbb{Z})$ within $0.15$ data units.
- **Real-Time Visual Feedback:**
  - **Vector Shaft & Head:** Dynamic arrow with shaft width $3\text{px}$ in `#38bdf8`; arrow head length $14\text{px}$, barb angle $25^\circ$.
  - **Component Projections:** Dashed projection onto X-axis (`#38bdf880`) and Y-axis (`#818cf880`) with bracket labels $v_x, v_y$.
  - **Polar Angle Arc:** Circular arc from positive X-axis to vector shaft with radius $35\text{px}$ in `#fbbf24` with live degree/radian readout.
  - **Unit Circle Reference:** Faint circle of radius $1.0$ centered at origin in `#1e293b`.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while dragging vector tip.
  - `playClick(1.4)` on snapping to integer components or unit length $\|\mathbf{v}\| = 1.0$.
  - `startContinuousLoss()` / `updateLoss(\|\mathbf{v}\|)` dynamically modulating pitch from $150\,\text{Hz}$ (magnitude $0$) to $600\,\text{Hz}$ (magnitude $5$).

---

## 3. MOD-02: Vector Spaces, Dot & Cross Products

### LESSON-T1-04: Linear Combinations, Span & Basis Vectors
- **Component Identifier:** `VectorSpanBasisCanvas`
- **Mathematical Anchor:**
  $$\mathbf{w} = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2, \quad \text{Span}(\{\mathbf{v}_1, \mathbf{v}_2\}) = \{c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 \mid c_1, c_2 \in \mathbb{R}\}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -6.0, xMax: 6.0, yMin: -6.0, yMax: 6.0 }`.
  - `Margins`: `{ top: 28, right: 28, bottom: 28, left: 28 }`.
  - Transformed skew coordinate grid rendered over the standard Cartesian grid.
- **Tactile Interactive Levers:**
  - **Basis Vector 1 Tip ($\mathbf{v}_1$):** Draggable handle in `#38bdf8` (Sky blue).
  - **Basis Vector 2 Tip ($\mathbf{v}_2$):** Draggable handle in `#818cf8` (Indigo).
  - **Scalar Coefficient Sliders:**
    - Slider $c_1 \in [-3.0, 3.0]$, step $0.05$.
    - Slider $c_2 \in [-3.0, 3.0]$, step $0.05$.
  - **Target Vector $\mathbf{w}_{\text{target}}$ Handle:** Draggable target point to solve for $c_1, c_2$ in real time.
  - **Collinear Snap:** Snaps $\mathbf{v}_2$ to parallel/antiparallel direction with $\mathbf{v}_1$ within $\pm 2.0^\circ$.
- **Real-Time Visual Feedback:**
  - **Deformed Grid Net:** Lines parallel to $\mathbf{v}_1$ spaced by multiples of $\mathbf{v}_2$, and vice versa, rendering the skew coordinate grid (alpha $0.25$).
  - **Vector Parallelogram:** Broken-line path from origin $\mathbf{0} \to c_1\mathbf{v}_1 \to c_1\mathbf{v}_1 + c_2\mathbf{v}_2 = \mathbf{w}$.
  - **Collinear Dimension Collapse:** When $\mathbf{v}_1$ and $\mathbf{v}_2$ are linearly dependent, grid collapses to a single 1D line in `#fbbf24` with warning "Span Collapsed to 1D Subspace".
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` on adjusting $c_1$ or $c_2$ sliders.
  - `playErrorDissonance()` when $\det([\mathbf{v}_1 \quad \mathbf{v}_2]) \to 0$ (collinearity collapse).
  - `playVictoryHarmonics()` when synthesized linear combination matches $\mathbf{w}_{\text{target}}$ within $\|\mathbf{w} - \mathbf{w}_{\text{target}}\| < 0.05$.

---

### LESSON-T1-05: The Dot Product & Geometric Projection Duality
- **Component Identifier:** `DotProductProjectionCanvas` (Extension of `VectorGeometryCanvas`)
- **Mathematical Anchor:**
  $$\mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\| \|\mathbf{v}\| \cos\theta = u_x v_x + u_y v_y, \quad \text{proj}_{\mathbf{u}}(\mathbf{v}) = \left(\frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|^2}\right) \mathbf{u}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Isotropic isometric scaling.
- **Tactile Interactive Levers:**
  - **Base Vector Handle $\mathbf{u}$:** Draggable vector in `#818cf8` (Indigo).
  - **Projected Vector Handle $\mathbf{v}$:** Draggable vector in `#38bdf8` (Sky blue).
  - **Orthogonal Snap:** Snaps $\mathbf{v}$ perpendicular to $\mathbf{u}$ ($\theta = 90^\circ$ or $270^\circ$) within $\pm 2.5^\circ$.
  - **Collinear Snap:** Snaps $\mathbf{v}$ parallel ($\theta = 0^\circ$) or opposite ($\theta = 180^\circ$) within $\pm 2.0^\circ$.
- **Real-Time Visual Feedback:**
  - **Infinite Projection Axis:** Faint dotted guide line collinear with $\mathbf{u}$ in `#818cf850`.
  - **Perpendicular Drop Light Beam:** Dotted normal segment from tip of $\mathbf{v}$ down to the projection line in `#34d399`.
  - **Shadow Projection Vector $\text{proj}_{\mathbf{u}}(\mathbf{v})$:** Highlighted thick vector on $\mathbf{u}$ axis in bright emerald `#34d399`.
  - **Sign Flip Illumination:** When $\theta > 90^\circ$ ($\mathbf{u} \cdot \mathbf{v} < 0$), projection arrow turns amber `#fbbf24` pointing backward.
  - **Dot Product Meter Bar:** Vertical live gauge showing sign and magnitude $[-25, 25]$ with zero-crossing threshold.
- **Procedural Web Audio Hooks:**
  - `playClick(1.6)` on orthogonal snap ($\mathbf{u} \cdot \mathbf{v} = 0$).
  - `playClick(1.0)` on collinear snap.
  - Continuous pitch modulation where audio frequency tracks $\cos\theta \in [-1, 1]$ mapped from $200\,\text{Hz}$ to $600\,\text{Hz}$.

---

### LESSON-T1-06: The Cross Product, Determinant Area & Right-Hand Rule
- **Component Identifier:** `CrossProductAreaCanvas`
- **Mathematical Anchor:**
  $$\mathbf{u} \times \mathbf{v} = (u_x v_y - u_y v_x) \hat{\mathbf{k}}, \quad \text{Area} = \|\mathbf{u} \times \mathbf{v}\| = \|\mathbf{u}\| \|\mathbf{v}\| |\sin\theta|$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 28, right: 28, bottom: 28, left: 28 }`.
  - Secondary 3D pseudo-isometric orthographic sub-viewport in top-right corner ($160\times 160\text{px}$) showing the normal $\hat{\mathbf{k}}$ axis vector popping out of the plane.
- **Tactile Interactive Levers:**
  - **Vector $\mathbf{u}$ Tip Handle:** Draggable handle in `#38bdf8`.
  - **Vector $\mathbf{v}$ Tip Handle:** Draggable handle in `#818cf8`.
  - **Rotation Scrubbing Wheel:** Rotary dial rotating both vectors synchronously while preserving internal angle $\theta$.
  - **Zero-Area Snap:** Snaps to collinearity ($\sin\theta = 0$) within $\pm 2.0^\circ$.
- **Real-Time Visual Feedback:**
  - **Spanned Parallelogram:** Polygon $[\mathbf{0}, \mathbf{u}, \mathbf{u}+\mathbf{v}, \mathbf{v}]$ filled with `#f43f5e` (alpha $0.25$ when positive orientation, `#fbbf24` alpha $0.25$ when negative).
  - **Hatching Texture:** Diagonally hatched lines across parallelogram highlighting geometric area.
  - **Orientation Indicator (Right-Hand Rule):** Curved arrow around origin indicating whether rotation $\mathbf{u} \to \mathbf{v}$ is counterclockwise (positive $\hat{\mathbf{k}}$, out of screen $\odot$) or clockwise (negative $\hat{\mathbf{k}}$, into screen $\otimes$).
  - **3D Out-of-Plane Arrow:** In the 3D sub-viewport, vector $\mathbf{w} = \mathbf{u} \times \mathbf{v}$ grows upward/downward along Z-axis.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` on adjusting vectors.
  - `playClick(0.9)` when orientation flips (cross product passes through zero).
  - `playVictoryHarmonics()` when vectors become perfectly orthonormal ($\|\mathbf{u}\| = \|\mathbf{v}\| = 1$, $\theta = 90^\circ$, $\text{Area} = 1.0$).

---

## 4. MOD-03: Linear Transformations & Matrix Algebra

### LESSON-T1-07: Linear Maps as Space Deformations
- **Component Identifier:** `LinearTransformMorphCanvas`
- **Mathematical Anchor:**
  $$T(\mathbf{x}) = A\mathbf{x} = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = x \begin{bmatrix} a \\ c \end{bmatrix} + y \begin{bmatrix} b \\ d \end{bmatrix}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -4.0, yMax: 4.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Two-state interpolation pipeline: $A(t) = (1 - t) I + t A_{\text{target}}$ where $t \in [0, 1]$.
- **Tactile Interactive Levers:**
  - **Basis Image $\hat{\mathbf{i}}' = T(\hat{\mathbf{i}})$ Handle:** Draggable column 1 handle $[a, c]^T$ in `#38bdf8`.
  - **Basis Image $\hat{\mathbf{j}}' = T(\hat{\mathbf{j}})$ Handle:** Draggable column 2 handle $[b, d]^T$ in `#818cf8`.
  - **Morph Timeline Scrubber ($t \in [0, 1]$):** Scrubbing slider animating the continuous grid deformation from identity $I$ to $A$.
  - **Preset Buttons:** Identity, Shear, Rotation $90^\circ$, Reflection across $y=x$, Projection onto X.
- **Real-Time Visual Feedback:**
  - **Deforming Coordinate Net:** Grid lines initially spaced at $1.0$ intervals smoothly bend, rotate, and stretch while remaining parallel and equally spaced.
  - **Unit Square to Parallelogram Morph:** Unit square $[(0,0), (1,0), (1,1), (0,1)]$ dynamically deforms into transformed parallelogram.
  - **Origin Fixed Pin:** Golden anchor badge at $(0, 0)$ visually confirming $T(\mathbf{0}) = \mathbf{0}$.
  - **Arbitrary Test Vector:** User-placed vector $\mathbf{v}$ moving in sync to $T(\mathbf{v}) = A\mathbf{v}$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick(vel)` while dragging morph timeline $t$.
  - `playClick(1.2)` on selecting preset matrices.
  - `startExecutionHum()` during continuous animation playback; pitch dynamically corresponds to trace $\text{tr}(A(t))$.

---

### LESSON-T1-08: Matrix Composition & Non-Commutativity
- **Component Identifier:** `MatrixCompositionCanvas`
- **Mathematical Anchor:**
  $$(BA)\mathbf{x} = B(A\mathbf{x}) \ne (AB)\mathbf{x} \quad (\text{in general})$$
- **Coordinate System Mapping Pipeline:**
  - Split dual-viewport or sequential timeline pipeline:
    - Viewport Left: $B \circ A$ (Apply $A$ then $B$).
    - Viewport Right: $A \circ B$ (Apply $B$ then $A$).
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -4.0, yMax: 4.0 }`.
  - `Margins`: `{ top: 20, right: 20, bottom: 20, left: 20 }`.
- **Tactile Interactive Levers:**
  - **Matrix $A$ Configurator:** Shear slider $k_A \in [-2, 2]$ and rotation dial $\theta_A \in [0, 360^\circ]$.
  - **Matrix $B$ Configurator:** Scale slider $s_B \in [0.2, 2.5]$ and reflection toggle.
  - **Execution Order Switch:** Toggle button swapping execution order $B \circ A \leftrightarrow A \circ B$.
  - **Step-Through Scrubber:** Scrubber $[0 \to 1 \to 2]$ stepping through Untransformed $\to$ Stage $1 \to$ Stage $2$.
- **Real-Time Visual Feedback:**
  - **Split Screen Ghost Overlay:** Simultaneous rendering of shape under $BA$ in `#38bdf8` and under $AB$ in `#f43f5e`.
  - **Discrepancy Vector Field:** Glowing dashed lines between $(BA)\mathbf{x}$ and $(AB)\mathbf{x}$ highlighting non-zero commutator $[A, B] = AB - BA$.
  - **Commutativity Status Badge:** Green "COMMUTATIVE ($AB = BA$)" when $\|AB - BA\|_F < 10^{-4}$, Red "NON-COMMUTATIVE ($AB \ne BA$)" otherwise.
- **Procedural Web Audio Hooks:**
  - `playClick(1.0)` when switching step stages.
  - `playVictoryHarmonics()` when finding a commuting matrix pair (e.g. diagonal matrices or concentric rotations).
  - `playErrorDissonance()` when $[A, B] \ne 0$ discrepancy is highlighted.

---

### LESSON-T1-09: Determinants as Signed Volume Scaling Factors
- **Component Identifier:** `DeterminantVolumeCanvas` (Extension of `DeterminantAreaVolumeCanvas`)
- **Mathematical Anchor:**
  $$\det(A) = ad - bc, \quad \text{Area}(T(S)) = |\det(A)| \cdot \text{Area}(S)$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Real-time polygon rasterization and signed area calculation.
- **Tactile Interactive Levers:**
  - **Matrix Element Inputs / Handles:** Draggable column vectors $\mathbf{a}_1 = [a, c]^T$ and $\mathbf{a}_2 = [b, d]^T$.
  - **Interactive Test Shape Selector:** Unit Square, Circle ($r=1$), or Custom SVG Mascot ("OKVIR Glyph").
  - **Singularity Lock Snap:** Snaps $\det(A) = 0$ when column vectors become collinear within $\pm 2.0^\circ$.
- **Real-Time Visual Feedback:**
  - **Signed Area Color Fill:**
    - $\det(A) > 0$: Cyan `#38bdf8` at alpha $0.3$ (Preserves counterclockwise orientation).
    - $\det(A) < 0$: Amber/Rose `#f43f5e` at alpha $0.3$ (Flipped/reversed orientation).
    - $\det(A) = 0$: Flashing yellow `#fbbf24` zero-thickness line.
  - **Orientation Direction Clock:** Circular motion arrows illustrating orientation inversion when passing through $\det(A) = 0$.
  - **Numerical Value Meter:** Large floating numeric display with dynamic scale bar: $-10.0 \dots 0.0 \dots +10.0$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while dragging matrix column handles.
  - `playErrorDissonance()` with deep resonant sub-bass thud when $\det(A) = 0$ (dimensional collapse).
  - Continuous pitch sweep tied to $\log|\det(A)|$: lower pitch for compressed area, high pitch for expanded area.

---

### LESSON-T1-10: Systems of Linear Equations & Matrix Inversion
- **Component Identifier:** `LinearSystemSolverCanvas`
- **Mathematical Anchor:**
  $$A\mathbf{x} = \mathbf{b} \iff \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} b_1 \\ b_2 \end{bmatrix} \implies \mathbf{x} = A^{-1}\mathbf{b}$$
- **Coordinate System Mapping Pipeline:**
  - Dual geometric representations side-by-side or toggled:
    1. **Row Picture:** Intersecting lines $a_{11} x_1 + a_{12} x_2 = b_1$ and $a_{21} x_1 + a_{22} x_2 = b_2$.
    2. **Column Picture:** Vector sum $x_1 \mathbf{a}_1 + x_2 \mathbf{a}_2 = \mathbf{b}$.
  - `DomainBounds`: `{ xMin: -6.0, xMax: 6.0, yMin: -6.0, yMax: 6.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
- **Tactile Interactive Levers:**
  - **Equation Line Draggers:** Dragging lines directly adjusts coefficients and constants.
  - **Target Vector $\mathbf{b}$ Draggable Handle:** Moving $\mathbf{b}$ immediately moves the intersection solution $\mathbf{x} = A^{-1}\mathbf{b}$.
  - **Matrix Inversion Unravel Scrubber ($t \in [0, 1]$):** Animates space transformation backward under $A^{-1}$ returning $\mathbf{b}$ to $\mathbf{x}$.
  - **Parallelism Snap:** Snaps lines to parallel slopes (singular system, no unique solution).
- **Real-Time Visual Feedback:**
  - **Intersection Dot:** Glowing pulsing point at $(x_1^*, x_2^*)$ in `#34d399` with coordinates callout.
  - **Row Lines:** Line 1 rendered in `#38bdf8`, Line 2 in `#818cf8`.
  - **Singular State Representation:** Parallel lines (inconsistent, $0$ solutions) or coincident lines (dependent, $\infty$ solutions) trigger amber striping.
  - **Condition Number Gauge:** Displays $\kappa(A) = \|A\| \|A^{-1}\|$; turns red when ill-conditioned ($\kappa > 100$).
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while dragging vector $\mathbf{b}$ or equation lines.
  - `playErrorDissonance()` when lines become parallel ($\det(A) = 0$).
  - `playVictoryHarmonics()` when solution arrives at integer lattice point.

---

## 5. MOD-04: Fundamental Subspaces & Decompositions (SVD)

### LESSON-T1-11: The Four Fundamental Subspaces (Strang's Big Picture)
- **Component Identifier:** `FundamentalSubspacesCanvas`
- **Mathematical Anchor:**
  $$\mathbb{R}^n = C(A^T) \oplus N(A), \quad \mathbb{R}^m = C(A) \oplus N(A^T), \quad C(A^T) \perp N(A), \quad C(A) \perp N(A^T)$$
- **Coordinate System Mapping Pipeline:**
  - Split Dual Domain Viewport:
    - Left Canvas: Domain $\mathbb{R}^n$ (Row space $C(A^T)$ vs Nullspace $N(A)$).
    - Right Canvas: Codomain $\mathbb{R}^m$ (Column space $C(A)$ vs Left Nullspace $N(A^T)$).
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -4.0, yMax: 4.0 }` per viewport.
  - `Margins`: `{ top: 20, right: 20, bottom: 20, left: 20 }`.
- **Tactile Interactive Levers:**
  - **Matrix Rank Slider:** Ranks $r=1, 2$ in a $2 \times 2$ matrix system.
  - **Input Vector $\mathbf{x}$ Draggable Handle:** Moving $\mathbf{x}$ decomposes it live into $\mathbf{x} = \mathbf{x}_{\text{row}} + \mathbf{x}_{\text{null}}$.
  - **Subspace Orientation Dial:** Adjusts row space angle $\theta_{\text{row}}$; nullspace automatically maintains $\theta_{\text{null}} = \theta_{\text{row}} + 90^\circ$.
- **Real-Time Visual Feedback:**
  - **Subspace Orthogonal Planes/Lines:**
    - Row space line in `#38bdf8`, Nullspace line in `#fbbf24` (perpendicular right-angle mark).
    - Column space line in `#34d399`, Left nullspace line in `#f43f5e`.
  - **Vector Mapping Arrow:** Animated dynamic beam tracing $\mathbf{x} \to A\mathbf{x} \in C(A)$.
  - **Zero Collapse:** When $\mathbf{x}$ moves purely into $N(A)$, the mapped output collapses strictly to origin $\mathbf{0}$ in the codomain.
- **Procedural Web Audio Hooks:**
  - `playClick(1.0)` on orthogonal decomposition snapping.
  - `playErrorDissonance()` when input vector lands in nullspace ($A\mathbf{x} = \mathbf{0}$).
  - `playVictoryHarmonics()` when decomposed components are equal in magnitude.

---

### LESSON-T1-12: Orthogonal Projections & Gram-Schmidt Orthogonalization
- **Component Identifier:** `GramSchmidtOrthogonalCanvas` (Extension of `OrthogonalProjectionGramSchmidtCanvas`)
- **Mathematical Anchor:**
  $$\mathbf{u}_1 = \mathbf{v}_1, \quad \mathbf{u}_2 = \mathbf{v}_2 - \frac{\mathbf{v}_2 \cdot \mathbf{u}_1}{\|\mathbf{u}_1\|^2} \mathbf{u}_1, \quad \mathbf{q}_i = \frac{\mathbf{u}_i}{\|\mathbf{u}_i\|}, \quad P = A(A^T A)^{-1}A^T$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Isometric isometric grid mapping.
- **Tactile Interactive Levers:**
  - **Initial Vector Handles ($\mathbf{v}_1, \mathbf{v}_2$):** Arbitrary draggable non-orthogonal vectors in `#64748b`.
  - **Gram-Schmidt Step Scrubber ($k \in [0, 1, 2]$):**
    - Step 0: Raw inputs $\mathbf{v}_1, \mathbf{v}_2$.
    - Step 1: Fix $\mathbf{u}_1 = \mathbf{v}_1$; project $\mathbf{v}_2$ onto $\mathbf{u}_1$.
    - Step 2: Subtract projection $\mathbf{u}_2 = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1}(\mathbf{v}_2)$; normalize to $\mathbf{q}_1, \mathbf{q}_2$.
- **Real-Time Visual Feedback:**
  - **Projection Shadow Beam:** Dashed line dropping from $\mathbf{v}_2$ perpendicularly onto $\mathbf{u}_1$ in `#fbbf24`.
  - **Orthogonal Subtraction Vector:** Ghost vector showing the subtraction $\mathbf{v}_2 - \text{proj}_{\mathbf{u}_1}(\mathbf{v}_2)$ shifting to the origin as $\mathbf{u}_2$.
  - **Normalized Orthonormal Frames:** Emerald unit vectors $\mathbf{q}_1, \mathbf{q}_2$ enclosed in unit square with exact $90^\circ$ right-angle symbol.
- **Procedural Web Audio Hooks:**
  - `playClick(1.0 + k * 0.3)` on advancing each Gram-Schmidt step.
  - `playVictoryHarmonics()` on completing Step 2 (full orthonormal basis generated).
  - `playErrorDissonance()` if initial vectors $\mathbf{v}_1, \mathbf{v}_2$ are chosen collinear.

---

### LESSON-T1-13: Eigenvalues & Eigenvectors: Invariant Directions
- **Component Identifier:** `EigenHunterCanvas`
- **Mathematical Anchor:**
  $$A\mathbf{v} = \lambda \mathbf{v} \iff (A - \lambda I)\mathbf{v} = \mathbf{0}, \quad \det(A - \lambda I) = 0$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -4.5, xMax: 4.5, yMin: -4.5, yMax: 4.5 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Polar rotary control overlay centered at origin.
- **Tactile Interactive Levers:**
  - **Rotary Hunter Probe Handle $\mathbf{x}$:** Circular rotary dial handle on unit circle $r=1.0$ that the user drags through $\theta \in [0, 360^\circ]$.
  - **Matrix $A$ Parameter Sliders:** Interactive sliders for matrix elements $a, b, c, d$.
  - **Magnetic Resonance Lock:** Snaps probe vector $\mathbf{x}$ to true eigenvector direction $\mathbf{v}_i$ when angular divergence $|\Delta\theta| = |\angle(A\mathbf{x}) - \angle(\mathbf{x})| < 1.8^\circ$.
- **Real-Time Visual Feedback:**
  - **Probe Vector $\mathbf{x}$:** Cyan arrow `#38bdf8` of unit length.
  - **Transformed Vector $A\mathbf{x}$:** Rose arrow `#f43f5e` showing transformed output.
  - **Angular Divergence Arc:** Shaded wedge between $\mathbf{x}$ and $A\mathbf{x}$ colored according to divergence angle $\Delta\theta$.
  - **Collinearity Resonance Bloom:** When snapped to an eigenvector ($\Delta\theta = 0$), both vectors become strictly collinear, the shaft pulses with a gold aura (`#fbbf24`), and the eigenvalue $\lambda = \|A\mathbf{x}\| / \|\mathbf{x}\|$ is stamped on screen.
  - **Characteristic Root Spectrum Bar:** Bottom spectrum bar showing the two real eigenvalues $\lambda_1, \lambda_2$ or complex pair indicator.
- **Procedural Web Audio Hooks:**
  - `playScrubTick(vel)` on rotary dial rotation.
  - Continuous sonification where dissonance/beating frequency decreases as $\mathbf{x}$ approaches an eigenvector.
  - `playVictoryHarmonics()` (Lydian major 9th FM chime) on achieving magnetic lock on an eigenvalue invariant direction.

---

### LESSON-T1-14: Diagonalization & Spectral Theorem for Symmetric Matrices
- **Component Identifier:** `SpectralTheoremCanvas`
- **Mathematical Anchor:**
  $$A = A^T \implies A = Q \Lambda Q^T = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T, \quad Q^T Q = I$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -5.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Unit circle deformation into quadratic form ellipse $\mathbf{x}^T A \mathbf{x} = 1$.
- **Tactile Interactive Levers:**
  - **Symmetric Matrix Sliders:** $a_{11}, a_{22}$ (diagonal) and $a_{12} = a_{21}$ (coupled off-diagonal slider).
  - **Decomposition Stage Stepper ($t \in [0, 3]$):**
    - Stage 0: Initial vector $\mathbf{x}$.
    - Stage 1: Rotate to eigenbasis via $Q^T$.
    - Stage 2: Independent coordinate stretch along principal axes via $\Lambda$.
    - Stage 3: Rotate back via $Q$.
- **Real-Time Visual Feedback:**
  - **Orthogonal Eigenvector Cross:** Two strictly perpendicular unit eigenvectors $\mathbf{q}_1 \perp \mathbf{q}_2$ in `#34d399` and `#38bdf8`.
  - **Quadratic Form Energy Ellipse:** Translucent contour curve $\mathbf{x}^T A \mathbf{x} = 1$ whose major and minor semi-axes align perfectly with $\mathbf{q}_1$ and $\mathbf{q}_2$, with lengths $1/\sqrt{|\lambda_1|}$ and $1/\sqrt{|\lambda_2|}$.
  - **Positive Definiteness Status:**
    - $\lambda_1 > 0, \lambda_2 > 0$: Green badge "Positive Definite (Bowl / Minimum)".
    - $\lambda_1 \lambda_2 < 0$: Amber badge "Indefinite (Saddle Point)".
    - $\lambda_1 < 0, \lambda_2 < 0$: Rose badge "Negative Definite (Peak / Maximum)".
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while dragging symmetric off-diagonal slider.
  - `playClick(1.2)` on stage transitions $Q^T \to \Lambda \to Q$.
  - Continuous harmonious dual-frequency drone where tone 1 represents $\lambda_1$ and tone 2 represents $\lambda_2$. Pure consonance occurs when $\lambda_1 = \lambda_2$ (spherical symmetry).

---

### LESSON-T1-15: Singular Value Decomposition (SVD) & Spectral Geometry
- **Component Identifier:** `SVDImageCompressorLab`
- **Mathematical Anchor:**
  $$A = U \Sigma V^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T, \quad \sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r \ge 0$$
- **Coordinate System Mapping Pipeline:**
  - Split 3-Stage Geometric Viewport:
    1. Input Domain: Unit circle with right singular vectors $\mathbf{v}_1, \mathbf{v}_2$.
    2. Scaled Domain: Stretched axes $\sigma_1 \mathbf{v}_1, \sigma_2 \mathbf{v}_2$.
    3. Output Codomain: Rotated ellipse with left singular vectors $\mathbf{u}_1, \mathbf{u}_2$.
  - Secondary Image Matrix Heatmap viewport ($32\times 32$ pixel grayscale matrix) displaying low-rank reconstruction.
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -4.0, yMax: 4.0 }`.
  - `Margins`: `{ top: 20, right: 20, bottom: 20, left: 20 }`.
- **Tactile Interactive Levers:**
  - **Rank Truncation Scrubber ($k \in [1 \dots r]$):** Selects number of singular components retained.
  - **Singular Value Sliders ($\sigma_1, \sigma_2$):** Dragging singular values dynamically contracts/expands ellipse semi-axes.
  - **Rotation Angles ($\theta_V, \theta_U$):** Rotary controls rotating input basis $V$ and output basis $U$.
- **Real-Time Visual Feedback:**
  - **Circle-to-Ellipse Geometric Transform:** Visual demonstration that any real matrix maps a sphere into an ellipsoid.
  - **Frobenius Error Gauge:** Dynamic bar chart showing reconstruction error $\|A - A_k\|_F = \sqrt{\sum_{i=k+1}^r \sigma_i^2}$.
  - **Side-by-Side Image Reconstruction:** Original high-rank image vs Rank-$k$ reconstructed image with Eckart-Young optimal approximation indicator.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` on adjusting rank $k$.
  - `playVictoryHarmonics()` when rank $k$ captures $> 95\%$ of spectral energy.
  - `playErrorDissonance()` when setting $\sigma_2 = 0$ (rank deficiency collapse to line).

---

## 6. MOD-05: Single-Variable Calculus & Approximations

### LESSON-T1-16: The Secant-to-Tangent Limit & Instantaneous Velocity
- **Component Identifier:** `SecantTangentLimitCanvas`
- **Mathematical Anchor:**
  $$f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -1.0, xMax: 5.0, yMin: -1.0, yMax: 10.0 }`.
  - `Margins`: `{ top: 24, right: 28, bottom: 32, left: 36 }`.
  - Smooth Bézier or Hermite curve interpolation for arbitrary non-linear test functions $f(x) = x^2, \sin(x), e^{x/2}$.
- **Tactile Interactive Levers:**
  - **Base Point $x_0$ Handle:** Horizontal draggable marker on the X-axis (`#38bdf8`).
  - **Secant Step Size $h$ Scrubber:** Granular slider $h \in [0.001, 2.0]$ with logarithmic response curve.
  - **Continuous Zoom Magnifier Lens:** Draggable magnifying loupe around $(x_0, f(x_0))$ zooming $10\times$ into the curve to visually prove local linearity.
  - **Tangent Snap:** Snaps $h \to 0$ when $h < 0.04$.
- **Real-Time Visual Feedback:**
  - **Secant Line:** Dotted amber line `#fbbf24` passing through $(x_0, f(x_0))$ and $(x_0+h, f(x_0+h))$.
  - **Limiting Tangent Line:** Solid bright sky blue line `#38bdf8` extending across the canvas.
  - **Difference Quotient Box:** Zoomed-in delta triangle showing horizontal base $h$, vertical rise $\Delta f$, and quotient slope value.
  - **Local Linearity Proof:** In the $10\times$ zoom view, the curved function and tangent line become visually indistinguishable.
- **Procedural Web Audio Hooks:**
  - `playScrubTick(vel)` while scrubbing $h$ toward zero.
  - `startContinuousLoss()` / `updateLoss(h)`: Pitch rises smoothly as $h \to 0$, resolving into a crystal chime `playVictoryHarmonics()` at the exact tangent limit.
  - `playClick(1.5)` on snapping into the tangent state.

---

### LESSON-T1-17: Differentiation Rules & The Geometric Chain Rule
- **Component Identifier:** `ChainRuleGearsCanvas`
- **Mathematical Anchor:**
  $$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}, \quad (f \cdot g)' = f'g + fg'$$
- **Coordinate System Mapping Pipeline:**
  - 3-Stage Interconnected Transmission Pipeline:
    - Stage 1: Input variable $x \in [-3, 3]$.
    - Stage 2: Intermediate function $u = g(x)$.
    - Stage 3: Output function $y = f(u)$.
  - Screen layout with two synchronized function plots plus an interactive gear-ratio physical analog.
- **Tactile Interactive Levers:**
  - **Input Lever $x$:** Draggable horizontal control scrubbing the input.
  - **Function Selector Dropdowns:** Choose pairs like $u = x^2, y = \sin(u)$ or $u = 2x, y = e^u$.
  - **Derivative Step Slider $\Delta x$:** Adjusts the infinitesimal test nudge.
- **Real-Time Visual Feedback:**
  - **Mechanical Meshing Gears:** Two interlocking rotating gears whose radii reflect instantaneous gear ratios $R_1 = \frac{du}{dx}$ and $R_2 = \frac{dy}{du}$, with the compound gear ratio matching $\frac{dy}{dx}$.
  - **Synchronized Tangent Slopes:** Dual function curves side-by-side with synchronized slope indicators updating in real time.
  - **Product Rule Expanding Rectangle:** Visual mode for $(f \cdot g)'$ displaying an expanding rectangle of dimensions $f(x) \times g(x)$ with incremental boundary strips $f' g \Delta x$ and $f g' \Delta x$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` on scrubbing input $x$.
  - Rotary mechanical ratchet sound whose click frequency scales with instantaneous velocity $|\frac{dy}{dx}|$.
  - `playClick(1.0)` when passing through stationary points ($\frac{dy}{dx} = 0$).

---

### LESSON-T1-18: Higher Derivatives, Concavity & Osculating Circles
- **Component Identifier:** `CurvatureOsculatingCanvas`
- **Mathematical Anchor:**
  $$f''(x) = \frac{d^2 f}{dx^2}, \quad \kappa(x) = \frac{|f''(x)|}{(1 + f'(x)^2)^{3/2}}, \quad R(x) = \frac{1}{\kappa(x)}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -3.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 28, right: 28, bottom: 28, left: 28 }`.
  - High-precision numerical 1st and 2nd derivative calculation via central differences.
- **Tactile Interactive Levers:**
  - **Curve Evaluation Point $x_0$ Draggable Handle:** Scrubbing marker on the curve.
  - **Polynomial Shape Control Points:** Draggable control nodes altering curve curvature.
  - **Inflection Point Magnet Snap:** Snaps to inflection points ($f''(x) = 0$) within $|f''(x)| < 0.05$.
- **Real-Time Visual Feedback:**
  - **Osculating Circle ("Kissing Circle"):** Glowing circle of radius $R = 1/\kappa$ tangent to curve at $x_0$, centered at $(x_0 - f'(1+f'^2)/f'', f(x_0) + (1+f'^2)/f'')$ in `#818cf8` with alpha $0.25$.
  - **Concavity Color Highlighting:**
    - Concave Up ($f''(x) > 0$): Curve highlighted in emerald `#34d399` ("Holds water").
    - Concave Down ($f''(x) < 0$): Curve highlighted in rose `#f43f5e` ("Spills water").
  - **Inflection Point Markers:** Golden diamond badges `#fbbf24` pinned to the curve where $f''(x) = 0$ (radius $R \to \infty$, osculating circle flattens to straight line).
- **Procedural Web Audio Hooks:**
  - Pitch of continuous tone mapped to curvature $\kappa(x)$ (tight curve = high pitch, flat = low pitch).
  - `playClick(0.8)` when passing an inflection point (circle flips from above to below curve).
  - `playVictoryHarmonics()` on local extrema with $f'(x) = 0$.

---

### LESSON-T1-19: Taylor Polynomials & Local Function Approximations
- **Component Identifier:** `TaylorSeriesCanvas`
- **Mathematical Anchor:**
  $$T_n(x) = \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2}(x - x_0)^2 + \dots$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -5.0, xMax: 5.0, yMin: -4.0, yMax: 4.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Polynomial evaluation engine supporting degree $n \in [0, 10]$ across $f(x) \in \{\sin(x), \cos(x), e^x, \ln(1+x), \frac{1}{1-x}\}$.
- **Tactile Interactive Levers:**
  - **Expansion Center $x_0$ Draggable Handle:** Marker on curve adjusting expansion center.
  - **Polynomial Order Scrubber ($n \in [0 \dots 10]$):** Stepper slider incrementally adding higher-order terms.
  - **Convergence Radius Window Levers:** Interactive boundary flags showing $|x - x_0| < R$.
- **Real-Time Visual Feedback:**
  - **True Target Curve:** Solid subtle slate line `#64748b` width $2\text{px}$.
  - **Taylor Approximation Curve:** Vibrant sky blue curve `#38bdf8` width $3\text{px}$ dynamically clinging to the true curve as $n$ increases.
  - **Error Shadow Polygon:** Shaded region between true curve and $T_n(x)$ showing residual error $|f(x) - T_n(x)|$ in `#f43f5e15`.
  - **Radius of Convergence Shading:** Translucent vertical column in `#34d39910` bounded by $[-R, R]$ where series converges.
- **Procedural Web Audio Hooks:**
  - `playClick(1.0 + n * 0.1)` on each increment of degree $n$.
  - Rich harmonic synthesizer chord adding additional musical overtone for each polynomial degree added ($n=1$ fundamental, $n=2$ octave, $n=3$ fifth, etc.).
  - `playErrorDissonance()` when evaluating outside the radius of convergence ($|x| > R$).

---

### LESSON-T1-20: Numerical Quadrature & The Fundamental Theorem of Calculus
- **Component Identifier:** `RiemannIntegralFtCanvas`
- **Mathematical Anchor:**
  $$\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x, \quad \frac{d}{dx}\left[\int_a^x f(t) \, dt\right] = f(x)$$
- **Coordinate System Mapping Pipeline:**
  - Dual Synchronized Top/Bottom Viewports:
    - Top Canvas: Rate function $f(t)$ with Riemann approximating rectangles.
    - Bottom Canvas: Accumulated area function $F(x) = \int_a^x f(t) dt$.
  - `DomainBounds`: `{ xMin: 0.0, xMax: 6.0, yMin: -2.0, yMax: 5.0 }`.
  - `Margins`: `{ top: 20, right: 24, bottom: 24, left: 32 }`.
- **Tactile Interactive Levers:**
  - **Integration Limits Handles ($a, b$):** Draggable vertical boundary flags on X-axis.
  - **Subdivision Partition Slider ($n \in [2 \dots 100]$):** Slider increasing number of slices.
  - **Rule Mode Selector:** Left Riemann, Right Riemann, Midpoint, Trapezoidal, Simpson's Rule.
  - **Accumulator Probe $x$:** Draggable horizontal scrubber dynamically tracing $F(x)$.
- **Real-Time Visual Feedback:**
  - **Riemann Rectangles / Trapezoids:** Translucent vertical bars with borders in `#38bdf8` and fills in `#38bdf820` (positive area) and `#f43f5e20` (negative area below X-axis).
  - **Discretization Error Wedge:** Tiny triangles between curve and rectangle tops showing discretization error diminishing as $n \to \infty$.
  - **Dynamic Accumulation Fill:** Solid emerald fill under curve tracing the integral value live as $x$ increases.
  - **Slope-to-Height Dynamic Callout:** Tangent line on bottom plot $F'(x)$ matches height of point on top plot $f(x)$ at all positions $x$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick(vel)` on adjusting number of partitions $n$ or limits $a, b$.
  - `playVictoryHarmonics()` when Trapezoidal/Simpson rule error drops below $0.001$.
  - Continuous pitch modulation tracking instantaneous integral accumulation $F(x)$.

---

## 7. MOD-06: Multivariable Calculus, Gradients & Hessians

### LESSON-T1-21: Multivariable Scalar Fields & Contour Level Curves
- **Component Identifier:** `ContourElevationCanvas`
- **Mathematical Anchor:**
  $$z = f(x, y), \quad \mathcal{C}_c = \{(x, y) \in \mathbb{R}^2 \mid f(x, y) = c\}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -3.0, xMax: 3.0, yMin: -3.0, yMax: 3.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Marching Squares 2D contour generation algorithm sampling on a $64 \times 64$ grid.
  - Secondary 3D WebGL / Canvas2D oblique wireframe surface preview in corner.
- **Tactile Interactive Levers:**
  - **Elevation Slice Plane Scrubber ($c \in [z_{\min}, z_{\max}]$):** Interactive slider raising/lowering horizontal slice plane.
  - **Probe Point Handle $(x, y)$:** Draggable crosshair sampling scalar value $f(x, y)$ anywhere in field.
  - **Preset Landscapes:** Single Well (Paraboloid), Saddle (Hyperbolic Paraboloid), Rosenbrock Banana, Egg-Carton (Peaks & Pits).
- **Real-Time Visual Feedback:**
  - **Contour Isoline Rings:** Equipotential closed loops colored via viridis or dark turbo spectrum (`#1e293b` $\to$ `#38bdf8` $\to$ `#34d399` $\to$ `#fbbf24` $\to$ `#f43f5e`).
  - **Active Level Curve Highlight:** Thick glowing gold contour `#fbbf24` corresponding to currently scrubbed slice elevation $c$.
  - **Contour Density & Steepness:** Densely packed lines visually communicate steep gradient cliffs; wide spacing indicates flat plateaus.
  - **Topographic Elevation Tooltip:** Hovering displays $(x, y, z = f(x, y))$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while moving probe point or elevation scrubber.
  - Continuous altitude sonification: pitch maps directly to elevation $z = f(x, y)$ ($120\,\text{Hz}$ deep valley $\to 900\,\text{Hz}$ mountain peak).
  - `playClick(1.2)` on crossing contour isolines.

---

### LESSON-T1-22: Partial Derivatives & The Tangent Hyperplane
- **Component Identifier:** `PartialDerivativeSliceCanvas`
- **Mathematical Anchor:**
  $$\frac{\partial f}{\partial x} = \lim_{\Delta x \to 0} \frac{f(x+\Delta x, y) - f(x, y)}{\Delta x}, \quad T(x, y) = f(x_0, y_0) + \frac{\partial f}{\partial x}(x - x_0) + \frac{\partial f}{\partial y}(y - y_0)$$
- **Coordinate System Mapping Pipeline:**
  - Split Dual Representation:
    - 2D Planar Contour View with interactive slice planes $x = x_0$ (vertical) and $y = y_0$ (horizontal).
    - 3D Projected Wireframe showing the tangent plane touching surface at $(x_0, y_0, f(x_0, y_0))$.
  - `DomainBounds`: `{ xMin: -3.0, xMax: 3.0, yMin: -3.0, yMax: 3.0 }`.
  - `Margins`: `{ top: 20, right: 20, bottom: 20, left: 20 }`.
- **Tactile Interactive Levers:**
  - **Evaluation Point $(x_0, y_0)$ Draggable Crosshair:** Primary handle in 2D contour map.
  - **Directional Slice Lock Toggle:** Lock $y=y_0$ to isolate $\frac{\partial f}{\partial x}$ or lock $x=x_0$ to isolate $\frac{\partial f}{\partial y}$.
  - **Tangent Plane Opacity Slider:** Fades tangent hyperplane in and out ($0 \dots 1$).
- **Real-Time Visual Feedback:**
  - **Orthogonal Slice Lines:** Bright cyan line along $y=y_0$ and indigo line along $x=x_0$.
  - **1D Slice Profile Curves:** Inset 1D plot rendering the single-variable cross-section $g(x) = f(x, y_0)$ with its standard 1D tangent line slope.
  - **Tangent Hyperplane Patch:** Translucent quadrilateral plane tangent to the 3D surface with normal vector $\mathbf{n} = [-\frac{\partial f}{\partial x}, -\frac{\partial f}{\partial y}, 1]^T$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while dragging evaluation point $(x_0, y_0)$.
  - Dual audio tones: left ear pan plays frequency proportional to $\frac{\partial f}{\partial x}$, right ear pan plays frequency proportional to $\frac{\partial f}{\partial y}$.
  - `playVictoryHarmonics()` when both partials vanish simultaneously ($\nabla f = \mathbf{0}$, critical stationary point).

---

### LESSON-T1-23: The Gradient Vector & Directional Derivatives
- **Component Identifier:** `GradientDescentCanvas` (Gradient Vector Exploration Mode)
- **Mathematical Anchor:**
  $$\nabla f(\mathbf{x}) = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix}, \quad D_{\hat{\mathbf{u}}} f(\mathbf{x}) = \nabla f(\mathbf{x}) \cdot \hat{\mathbf{u}} = \|\nabla f\| \cos\theta$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -3.0, xMax: 3.0, yMin: -3.0, yMax: 3.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - High-resolution contour background with normalized directional vector overlays.
- **Tactile Interactive Levers:**
  - **Position Probe $\mathbf{x}_0$:** Draggable handle anywhere on surface.
  - **Directional Compass Needle $\hat{\mathbf{u}}$:** Rotary dial handle of unit length anchored at $\mathbf{x}_0$ rotatable through $360^\circ$.
  - **Steepest Ascent Snap:** Snaps compass needle $\hat{\mathbf{u}}$ to gradient direction $\frac{\nabla f}{\|\nabla f\|}$ within $\pm 2.5^\circ$.
  - **Contour Tangency Snap:** Snaps needle perpendicular to gradient ($\nabla f \cdot \hat{\mathbf{u}} = 0$, along level curve) within $\pm 2.0^\circ$.
- **Real-Time Visual Feedback:**
  - **Gradient Arrow $\nabla f$:** Bright rose arrow `#f43f5e` pointing strictly in direction of steepest ascent; length proportional to $\|\nabla f\|$.
  - **Directional Needle $\hat{\mathbf{u}}$:** Cyan unit arrow `#38bdf8`.
  - **Directional Derivative Slope Gauge:** Polar speedometer gauge showing $D_{\hat{\mathbf{u}}} f$:
    - Maximum $+ \|\nabla f\|$ when $\hat{\mathbf{u}} \parallel \nabla f$.
    - Zero $0.0$ when $\hat{\mathbf{u}} \perp \nabla f$ (walking along contour).
    - Minimum $-\|\nabla f\|$ when $\hat{\mathbf{u}} \parallel -\nabla f$ (steepest descent).
  - **Orthogonality Proof:** Explicit right-angle symbol between $\nabla f$ and the tangent to the contour isoline.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` on rotating compass needle $\hat{\mathbf{u}}$.
  - `playVictoryHarmonics()` on snapping to steepest ascent ($\theta = 0^\circ$).
  - `playClick(1.4)` on snapping to zero rate of change along level curve ($D_{\hat{\mathbf{u}}} f = 0$).
  - Continuous pitch modulation reflecting directional slope value.

---

### LESSON-T1-24: The Hessian Matrix, Curvature & Quadratic Forms
- **Component Identifier:** `HessianCurvatureCanvas`
- **Mathematical Anchor:**
  $$H = \begin{bmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{bmatrix}, \quad f(\mathbf{x}_0 + \Delta\mathbf{x}) \approx f(\mathbf{x}_0) + \nabla f^T \Delta\mathbf{x} + \frac{1}{2} \Delta\mathbf{x}^T H \Delta\mathbf{x}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -3.0, xMax: 3.0, yMin: -3.0, yMax: 3.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Local quadratic Taylor approximation patch superimposed over the true surface.
- **Tactile Interactive Levers:**
  - **Critical Point Locator Crosshair:** Drag crosshair to explore local landscape features.
  - **Hessian Parameter Sliders:** In synthetic mode, adjust $f_{xx}, f_{yy}, f_{xy}$ directly.
  - **Second Derivative Test Classifier Button:** Evaluates $D = f_{xx} f_{yy} - (f_{xy})^2$ and eigenvalues $\lambda_1, \lambda_2$.
- **Real-Time Visual Feedback:**
  - **Local Quadratic Quadric Fitting:** Renders local paraboloid or saddle patch around probe.
  - **Eigenvector Principal Curvatures:** Two orthogonal axis arrows showing directions of maximum and minimum second derivative curvature.
  - **Second Derivative Classification Indicator:**
    - $D > 0, f_{xx} > 0$: Emerald shield "Local Minimum (Positive Definite $\lambda_1, \lambda_2 > 0$)".
    - $D > 0, f_{xx} < 0$: Rose shield "Local Maximum (Negative Definite $\lambda_1, \lambda_2 < 0$)".
    - $D < 0$: Amber shield "Saddle Point (Indefinite $\lambda_1 > 0 > \lambda_2$)".
    - $D = 0$: Yellow flashing warning "Degenerate / Inconclusive".
- **Procedural Web Audio Hooks:**
  - `playClick(1.1)` when crosshair crosses classification boundary ($D = 0$).
  - Dual harmonic chord reflecting eigenvalues: two rising tones for minimum, two falling tones for maximum, tritone clash for saddle point (`playErrorDissonance()`).

---

### LESSON-T1-25: Vector-Valued Functions & The Jacobian Matrix
- **Component Identifier:** `JacobianMappingCanvas`
- **Mathematical Anchor:**
  $$\mathbf{f}: \mathbb{R}^2 \to \mathbb{R}^2, \quad J(\mathbf{x}) = \begin{bmatrix} \frac{\partial f_1}{\partial x} & \frac{\partial f_1}{\partial y} \\ \frac{\partial f_2}{\partial x} & \frac{\partial f_2}{\partial y} \end{bmatrix}, \quad \Delta \mathbf{f} \approx J(\mathbf{x}_0) \Delta \mathbf{x}$$
- **Coordinate System Mapping Pipeline:**
  - Side-by-Side Dual Domain Viewport:
    - Left Canvas: Input Domain $(x, y)$ with infinitesimal test circle of radius $\epsilon = 0.25$.
    - Right Canvas: Output Codomain $(u, v) = \mathbf{f}(x, y)$ showing transformed distorted ellipse.
  - `DomainBounds`: `{ xMin: -3.0, xMax: 3.0, yMin: -3.0, yMax: 3.0 }`.
  - `Margins`: `{ top: 20, right: 20, bottom: 20, left: 20 }`.
- **Tactile Interactive Levers:**
  - **Input Point $\mathbf{x}_0$ Draggable Center:** Moves the probe circle across input space.
  - **Infinitesimal Probe Radius $\epsilon$ Slider:** $0.05 \dots 0.5$.
  - **Nonlinear Map Presets:**
    - Cartesian to Polar: $(r \cos\theta, r \sin\theta)$.
    - Complex Squaring: $(x^2 - y^2, 2xy)$.
    - Swirl Vortex: $(x \cos(r) - y \sin(r), x \sin(r) + y \cos(r))$.
- **Real-Time Visual Feedback:**
  - **Infinitesimal Circle to Ellipse Deformation:** Input circle with orthogonal radius vectors $\Delta x, \Delta y$ transforms live into an output ellipse whose semi-axes are given by singular values of $J(\mathbf{x}_0)$.
  - **Local Area Distortion Ratio:** Value of $|\det(J(\mathbf{x}_0))|$ displayed as local area magnification factor.
  - **Orientation Preserving vs Reversing:** Color of ellipse changes from sky blue `#38bdf8` to amber `#fbbf24` if $\det(J) < 0$.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` on dragging probe point.
  - Pitch dynamically tied to local Jacobian determinant $\det(J(\mathbf{x}_0))$.
  - `playErrorDissonance()` when crossing branch points or singular points where $\det(J) = 0$.

---

## 8. MOD-07: Convex Optimization & Probabilistic Geometry

### LESSON-T1-26: Convex Sets, Convex Functions & Jensen's Inequality
- **Component Identifier:** `ConvexityJensensCanvas`
- **Mathematical Anchor:**
  $$f(\alpha x + (1-\alpha)y) \le \alpha f(x) + (1-\alpha)f(y) \quad \forall \alpha \in [0, 1], \quad f(\mathbb{E}[X]) \le \mathbb{E}[f(X)]$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -3.0, xMax: 5.0, yMin: -2.0, yMax: 10.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 28, left: 32 }`.
  - Function curve with epigraph shading and draggable secant chord endpoints.
- **Tactile Interactive Levers:**
  - **Endpoint Handles ($x_1, x_2$):** Draggable markers along function domain.
  - **Interpolation Parameter Slider $\alpha \in [0, 1]$:** Draggable scrubber moving along chord.
  - **Curve Concavity Morph Slider:** Morph from convex $f(x) = x^2$ to non-convex double well $f(x) = x^4 - 3x^2$.
- **Real-Time Visual Feedback:**
  - **Secant Secant Chord:** Solid amber line segment joining $(x_1, f(x_1))$ and $(x_2, f(x_2))$ in `#fbbf24`.
  - **Jensen Gap Bracket:** Glowing vertical bracket between chord point $(\bar{x}, \alpha f(x_1) + (1-\alpha)f(x_2))$ and curve point $(\bar{x}, f(\bar{x}))$.
  - **Epigraph Shading:** Shaded region above function graph in translucent emerald `#34d39910`.
  - **Convexity Violation Highlight:** If curve dips or bulges above the chord (non-convex regime), the violated chord turns bright rose `#f43f5e` with warning badge "Convexity Violated: Secant Chord Below Graph".
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while sliding $\alpha$.
  - `playErrorDissonance()` when curve enters non-convex regime and chord penetrates function graph.
  - `playVictoryHarmonics()` when demonstrating maximal Jensen gap for strictly convex functions.

---

### LESSON-T1-27: Gradient Descent Dynamics, Learning Rates & Momentum
- **Component Identifier:** `GradientDescentDynamicsLab` (Advanced Extension of `GradientDescentCanvas`)
- **Mathematical Anchor:**
  $$\mathbf{x}_{k+1} = \mathbf{x}_k - \eta \nabla f(\mathbf{x}_k) + \beta (\mathbf{x}_k - \mathbf{x}_{k-1}), \quad \kappa = \frac{\lambda_{\max}}{\lambda_{\min}}$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -3.0, yMax: 3.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - 60 FPS physics integration loop with trajectory history buffer ($500$ points).
- **Tactile Interactive Levers:**
  - **Starting Position Draggable Ball $\mathbf{x}_0$:** Grab and throw the optimizer particle anywhere on the loss surface.
  - **Learning Rate Slider ($\eta \in [0.001, 1.2]$):** Logarithmic scale slider.
  - **Momentum Slider ($\beta \in [0.0, 0.99]$):** Polyak heavy-ball momentum coefficient.
  - **Loss Landscape Selector:**
    - Isotropic Bowl ($\kappa = 1.0$).
    - Ill-Conditioned Ravine / Valley ($\kappa = 25.0$).
    - Rosenbrock Banana Valley.
    - Multi-Modal Landscape with local minima.
- **Real-Time Visual Feedback:**
  - **Trajectory Breadcrumbs Trail:** Dynamic glowing polyline `#38bdf8` connecting iteration steps $\mathbf{x}_0 \to \mathbf{x}_1 \to \dots \to \mathbf{x}_k$, with point dots shrinking in size.
  - **Oscillation / Ravine Bouncing Lines:** In ill-conditioned ravines with high $\eta$, zig-zag trajectory across valley walls highlighted in amber/rose `#f43f5e`.
  - **Heavy-Ball Momentum Damping Vector:** Secondary arrow showing momentum velocity vector $\mathbf{v}_k$ smoothing out oscillations.
  - **Convergence Telemetry Panel:** Iteration counter $k$, Current Loss $\mathcal{L}(\mathbf{x}_k)$, Gradient Norm $\|\nabla \mathcal{L}\|$, and Condition Number $\kappa$.
- **Procedural Web Audio Hooks:**
  - `startContinuousLoss()` on commencing descent.
  - `updateLoss(loss)`: Sonifier smoothly drops pitch from $840\,\text{Hz}$ (high loss) down to $130\,\text{Hz}$ (minimum reached).
  - `playErrorDissonance()` on gradient explosion / divergence ($\|\mathbf{x}_k\| \to \infty$).
  - `playVictoryHarmonics()` on successful convergence within tolerance $\|\nabla \mathcal{L}\| < 10^{-4}$.

---

### LESSON-T1-28: Constrained Optimization & Lagrange Multipliers
- **Component Identifier:** `LagrangeMultiplierCanvas`
- **Mathematical Anchor:**
  $$\min_{\mathbf{x}} f(\mathbf{x}) \quad \text{subject to } g(\mathbf{x}) = 0 \implies \nabla f(\mathbf{x}^*) = \lambda^* \nabla g(\mathbf{x}^*), \quad \mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) - \lambda g(\mathbf{x})$$
- **Coordinate System Mapping Pipeline:**
  - `DomainBounds`: `{ xMin: -4.0, xMax: 4.0, yMin: -4.0, yMax: 4.0 }`.
  - `Margins`: `{ top: 24, right: 24, bottom: 24, left: 24 }`.
  - Superposition of objective function contours $f(x, y) = c$ and constraint curve $g(x, y) = 0$.
- **Tactile Interactive Levers:**
  - **Constrained Bead Cursor $\mathbf{x}$:** Draggable point physically constrained to slide strictly along the curve $g(x, y) = 0$ (e.g. circle $x^2 + y^2 = r^2$ or line $ax + by = c$).
  - **Constraint Geometry Radii / Sliders:** Adjust constraint circle radius or line position.
  - **Objective Function Morph:** Elliptic contours $f(x, y) = \frac{x^2}{a^2} + \frac{y^2}{b^2}$.
  - **Tangency Snap:** Snaps bead to exact Lagrange tangency point when angle between $\nabla f$ and $\nabla g$ is $< 2.0^\circ$ or $> 178.0^\circ$.
- **Real-Time Visual Feedback:**
  - **Objective Function Contours:** Faint concentric ellipses in `#38bdf830`.
  - **Constraint Manifold Curve:** Solid bold emerald curve `#34d399` width $3\text{px}$.
  - **Gradient Gradient Arrows at Bead:**
    - Objective Gradient $\nabla f$: Rose arrow `#f43f5e`.
    - Constraint Normal $\nabla g$: Emerald arrow `#34d399`.
  - **Tangency Alignment Arc:** Dynamic angle indicator between $\nabla f$ and $\nabla g$.
  - **Optimality Gold Bloom:** At optimum $\mathbf{x}^*$, vectors become perfectly anti-parallel/parallel ($\nabla f = \lambda \nabla g$), the bead pulses gold `#fbbf24`, and the multiplier $\lambda$ is computed live.
- **Procedural Web Audio Hooks:**
  - `playScrubTick()` while sliding bead along constraint curve.
  - Continuous pitch modulation tracking objective value $f(\mathbf{x})$ along constraint manifold.
  - `playVictoryHarmonics()` upon hitting the tangency condition ($\nabla f \parallel \nabla g$).

---

### LESSON-T1-29: The Central Limit Theorem & Probabilistic Diffusion
- **Component Identifier:** `GaltonBoardCltLab`
- **Mathematical Anchor:**
  $$Z_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sigma \sqrt{n}} \xrightarrow{d} \mathcal{N}(0, 1), \quad \mathbb{E}[\bar{X}_n] = \mu, \quad \text{Var}(\bar{X}_n) = \frac{\sigma^2}{n}$$
- **Coordinate System Mapping Pipeline:**
  - Split Vertical Physical Simulation Pipeline:
    - Upper Section: Triangular quincunx peg lattice ($12$ rows of triangular pegs with 2D elastic collision physics).
    - Lower Section: Normalized collection bins accumulating into empirical histogram overlaid with analytical Gaussian density $\mathcal{N}(\mu, \sigma^2/n)$.
  - `DomainBounds`: Upper Pegs $[-6, 6] \times [0, 12]$, Lower Bins $[-4\sigma, 4\sigma]$.
  - `Margins`: `{ top: 16, right: 24, bottom: 28, left: 24 }`.
- **Tactile Interactive Levers:**
  - **Ball Release Gate / Dispenser Rate Slider:** Controls drop flow rate from $1$ ball/sec to $500$ balls/sec or instantaneous batch drop ($10,000$ balls).
  - **Peg Bias Lever ($p \in [0.1, 0.9]$):** Adjusts left/right deflection probability from fair ($p=0.5$) to asymmetric skew.
  - **Number of Peg Rows Scrubber ($k \in [4 \dots 16]$):** Dynamically scales number of Bernoulli trials.
  - **Parent Distribution Selector:** Uniform, Bimodal, Exponential, Triangular.
- **Real-Time Visual Feedback:**
  - **Cascading Particle Stream:** Glowing particles falling and deflecting elastically off pegs with momentary peg impact flashes.
  - **Accumulating Histogram Columns:** Vertical bar columns filling in real time with gradient `#38bdf8` to `#818cf8`.
  - **Analytical Gaussian Bell Curve Overlay:** Solid gold density curve `#fbbf24` width $2.5\text{px}$ calculated live from sample mean and variance.
  - **Goodness-of-Fit Metric:** Real-time Kolmogorov-Smirnov / Chi-Square p-value badge indicating convergence to normality.
- **Procedural Web Audio Hooks:**
  - High-frequency micro-haptic clicks on peg collisions (`playClick(2.0 + Math.random() * 0.8)`).
  - Velocity-damped bin impact ticks on balls landing in bottom columns.
  - `playVictoryHarmonics()` when sample size $N \ge 1,000$ and empirical distribution matches Gaussian within $98\%$ fidelity.

---

## 9. Comprehensive Cross-Lesson Component Registry

| Module | Lesson ID | Lesson Title | Component Identifier | Primary Math Anchor | Visual Feedback Highlights | Audio Sonification Hooks |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MOD-01** | `math-01` | Cartesian Coordinate Systems & Euclidean Metric | `CartesianMetricCanvas` | $d(\mathbf{p}, \mathbf{q}) = \sqrt{\sum (p_i - q_i)^2}$ | Dynamic right-angle legs, expanding Pythagorean squares | `playClick` on grid snap, Pythagorean chord on integer triples |
| **MOD-01** | `math-02` | Slopes, Rates of Change & The Linear Equation | `LinearSlopeRateCanvas` | $m = \frac{\Delta y}{\Delta x}, \quad y = m(x - x_1) + y_1$ | Rise/run triangle, infinite line, vertical slope warning | `playScrubTick` on rotation, `playErrorDissonance` on $\Delta x \to 0$ |
| **MOD-01** | `math-03` | Vectors as Geometric Displacements | `VectorGeometryCanvas` | $\mathbf{v} = [v_x, v_y]^T, \quad \|\mathbf{v}\|_2 = \sqrt{\mathbf{v}^T \mathbf{v}}$ | Dynamic arrow shaft/head, axis projections, angle arc | `playClick` on unit length, continuous pitch scaling with length |
| **MOD-02** | `math-04` | Linear Combinations, Span & Basis Vectors | `VectorSpanBasisCanvas` | $\mathbf{w} = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2$ | Skew transformed grid net, collinearity dimension collapse | `playErrorDissonance` on span collapse, `playVictoryHarmonics` on target match |
| **MOD-02** | `math-05` | Dot Product & Geometric Projection Duality | `DotProductProjectionCanvas` | $\mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$ | Perpendicular drop beam, shadow vector, sign flip | `playClick` on orthogonality ($\mathbf{u} \cdot \mathbf{v} = 0$), pitch mapped to $\cos\theta$ |
| **MOD-02** | `math-06` | Cross Product, Determinant Area & Right-Hand Rule | `CrossProductAreaCanvas` | $\mathbf{u} \times \mathbf{v} = (u_x v_y - u_y v_x)\hat{\mathbf{k}}$ | Hatched parallelogram area, 3D out-of-plane arrow | `playClick` on orientation flip, `playVictoryHarmonics` on orthonormal |
| **MOD-03** | `math-07` | Linear Maps as Space Deformations | `LinearTransformMorphCanvas` | $T(\mathbf{x}) = A\mathbf{x} = x A\mathbf{i} + y A\mathbf{j}$ | Continuous grid deformation morph, unit square distortion | `playScrubTick` on timeline, `startExecutionHum` pitch tracking $\text{tr}(A)$ |
| **MOD-03** | `math-08` | Matrix Composition & Non-Commutativity | `MatrixCompositionCanvas` | $(BA)\mathbf{x} \ne (AB)\mathbf{x}$ | Split-screen simultaneous transforms, discrepancy vector field | `playClick` on stage swap, `playVictoryHarmonics` when $[A, B] = 0$ |
| **MOD-03** | `math-09` | Determinants as Signed Volume Scaling Factors | `DeterminantVolumeCanvas` | $\det(A) = ad - bc, \quad \text{Area}' = \|\det(A)\|\text{Area}$ | Signed color fill, orientation direction clock, zero collapse | `playErrorDissonance` with deep sub-thud on $\det(A)=0$ |
| **MOD-03** | `math-10` | Systems of Linear Equations & Matrix Inversion | `LinearSystemSolverCanvas` | $A\mathbf{x} = \mathbf{b} \iff \mathbf{x} = A^{-1}\mathbf{b}$ | Row intersection point vs column vector combination | `playErrorDissonance` on parallel lines, `playVictoryHarmonics` on integer solution |
| **MOD-04** | `math-11` | Four Fundamental Subspaces (Strang's Big Picture) | `FundamentalSubspacesCanvas` | $C(A^T) \perp N(A), \quad C(A) \perp N(A^T)$ | Dual domain/codomain viewports, orthogonal subspace planes | `playClick` on orthogonal snap, `playErrorDissonance` on nullspace collapse |
| **MOD-04** | `math-12` | Orthogonal Projections & Gram-Schmidt Process | `GramSchmidtOrthogonalCanvas` | $\mathbf{u}_2 = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1}(\mathbf{v}_2)$ | Projection subtraction ghost vector, orthonormal unit frame | `playClick` on step advance, `playVictoryHarmonics` on full basis completion |
| **MOD-04** | `math-13` | Eigenvalues & Eigenvectors: Invariant Directions | `EigenHunterCanvas` | $A\mathbf{v} = \lambda \mathbf{v} \iff (A - \lambda I)\mathbf{v} = \mathbf{0}$ | Rotary dial probe, angular divergence arc, golden resonance bloom | Continuous pitch harmony approaching lock, `playVictoryHarmonics` on eigenvalue lock |
| **MOD-04** | `math-14` | Diagonalization & Spectral Theorem | `SpectralTheoremCanvas` | $A = Q \Lambda Q^T = \sum \lambda_i \mathbf{q}_i \mathbf{q}_i^T$ | Quadratic energy ellipse, orthogonal eigenvector cross | Dual drone tones reflecting $\lambda_1, \lambda_2$, consonance on circle |
| **MOD-04** | `math-15` | Singular Value Decomposition (SVD) & Spectral Geometry | `SVDImageCompressorLab` | $A = U \Sigma V^T = \sum \sigma_i \mathbf{u}_i \mathbf{v}_i^T$ | 3-stage circle-to-ellipse geometry, low-rank image matrix | `playScrubTick` on rank $k$, `playVictoryHarmonics` on $>95\%$ energy capture |
| **MOD-05** | `math-16` | Secant-to-Tangent Limit & Instantaneous Velocity | `SecantTangentLimitCanvas` | $f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}$ | Pivoting secant line, $10\times$ zoom local linearity proof | Rising frequency sweep as $h \to 0$, resolving into crystal chime |
| **MOD-05** | `math-17` | Differentiation Rules & The Geometric Chain Rule | `ChainRuleGearsCanvas` | $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$ | Meshing physical gears with dynamic radius ratios | Mechanical ratchet sound scaling with $|\frac{dy}{dx}|$ velocity |
| **MOD-05** | `math-18` | Higher Derivatives, Concavity & Osculating Circles | `CurvatureOsculatingCanvas` | $\kappa = \frac{\|f''\|}{(1+f'^2)^{3/2}}, \quad R = \frac{1}{\kappa}$ | Osculating "kissing" circle, concavity color highlighting | Pitch tracks curvature $\kappa$, `playClick` on inflection points |
| **MOD-05** | `math-19` | Taylor Polynomials & Local Function Approximation | `TaylorSeriesCanvas` | $T_n(x) = \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k$ | Clinging polynomial curve, error shadow, convergence window | Harmonic chord adding overtones with each added degree $n$ |
| **MOD-05** | `math-20` | Numerical Quadrature & Fundamental Theorem | `RiemannIntegralFtCanvas` | $\int_a^b f(x)dx = \lim \sum f(x_i^*)\Delta x$ | Rectangles/trapezoids, accumulator plot, slope-height match | `playScrubTick` on partition $n$, pitch tracks integral area |
| **MOD-06** | `math-21` | Multivariable Scalar Fields & Contour Level Curves | `ContourElevationCanvas` | $\mathcal{C}_c = \{(x, y) \mid f(x, y) = c\}$ | Topographic contour lines, active level curve, 3D surface | Altitude sonification pitch mapped to elevation $z = f(x, y)$ |
| **MOD-06** | `math-22` | Partial Derivatives & The Tangent Hyperplane | `PartialDerivativeSliceCanvas` | $z = z_0 + f_x \Delta x + f_y \Delta y$ | Orthogonal coordinate slice planes, 1D slice profiles | Stereo panning: left pan tracks $f_x$, right pan tracks $f_y$ |
| **MOD-06** | `math-23` | Gradient Vector & Directional Derivatives | `GradientDescentCanvas` | $D_{\hat{\mathbf{u}}} f = \nabla f \cdot \hat{\mathbf{u}} = \|\nabla f\|\cos\theta$ | Compass needle, steepest ascent arrow, polar slope gauge | `playVictoryHarmonics` on steepest ascent, `playClick` on contour tangent |
| **MOD-06** | `math-24` | Hessian Matrix, Curvature & Quadratic Forms | `HessianCurvatureCanvas` | $H = [f_{ij}], \quad \Delta f \approx \nabla f^T \Delta\mathbf{x} + \frac{1}{2}\Delta\mathbf{x}^T H \Delta\mathbf{x}$ | Local quadric fitting, principal curvature axes, classifier | Harmonious chord on extrema, tritone clash on saddle point |
| **MOD-06** | `math-25` | Vector-Valued Functions & The Jacobian Matrix | `JacobianMappingCanvas` | $\Delta \mathbf{f} \approx J(\mathbf{x}_0)\Delta\mathbf{x}$ | Circle-to-ellipse deformation, local area distortion factor | Pitch mapped to $\det(J)$, `playErrorDissonance` on singular points |
| **MOD-07** | `math-26` | Convex Sets, Functions & Jensen's Inequality | `ConvexityJensensCanvas` | $f(\mathbb{E}[X]) \le \mathbb{E}[f(X)]$ | Secant chord, vertical Jensen gap bracket, epigraph shade | `playErrorDissonance` on convexity violation, `playScrubTick` on $\alpha$ |
| **MOD-07** | `math-27` | Gradient Descent Dynamics, Learning Rates & Momentum | `GradientDescentDynamicsLab` | $\mathbf{x}_{k+1} = \mathbf{x}_k - \eta \nabla f + \beta \mathbf{v}_k$ | Particle trajectory breadcrumbs, ravine bouncing, momentum vector | Continuous loss pitch drop $840\,\text{Hz} \to 130\,\text{Hz}$, chime on min |
| **MOD-07** | `math-28` | Constrained Optimization & Lagrange Multipliers | `LagrangeMultiplierCanvas` | $\nabla f(\mathbf{x}^*) = \lambda^* \nabla g(\mathbf{x}^*)$ | Constrained bead cursor, tangent contour vs constraint curve | Continuous pitch along constraint, `playVictoryHarmonics` on tangency |
| **MOD-07** | `math-29` | Central Limit Theorem & Probabilistic Diffusion | `GaltonBoardCltLab` | $Z_n = \frac{\sum X_i - n\mu}{\sigma \sqrt{n}} \to \mathcal{N}(0, 1)$ | Quincunx peg cascade, real-time accumulating histogram, bell curve | Peg collision micro-haptic clicks, chime on Gaussian convergence |

---

## 10. Verification & Quality Assurance Protocol

Each simulation component specification has been audited to guarantee:
1. **Zero-Crash Math Sandbox:** Safe handling of division-by-zero, negative square roots, and singular matrix inversion via bounded epsilons ($\epsilon = 10^{-6}$).
2. **Deterministic Screen Transforms:** Clamped domain bounds and explicit inversion equations preventing runaway render coordinates or NaN canvases.
3. **60 FPS Animation Budgets:** Bounded trail histories, matrix voice-pooling, and dirty-rectangle or full-frame redraw optimizations.
4. **Offline Sonification Guarantee:** Exclusively uses procedural mathematical waveforms (`triangle`, `sine`, `sawtooth`, `bandpass`, FM modulation) via the Web Audio API with zero external audio assets or network requests.
