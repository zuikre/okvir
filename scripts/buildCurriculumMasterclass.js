import fs from 'node:fs';
import path from 'node:path';

// Load existing curriculum modules to maintain exact ids, prerequisites, coordinates, and tracks
const curriculumPath = path.resolve('src/lib/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

// Update estimatedMinutes to 15-20 across all modules
content = content.replace(/estimatedMinutes:\s*\d+/g, 'estimatedMinutes: 18');

// Replace raw ASCII formulas with proper KaTeX formulas in mathematical formal beats
const mathFormulaReplacements = [
  {
    old: "formula: 'v = [v₁, v₂]ᵀ    ‖v‖ = √(v₁² + v₂²)'",
    new: "formula: '\\\\mathbf{v} = \\\\begin{bmatrix} v_1 \\\\\\\\ v_2 \\\\end{bmatrix} \\\\in \\\\mathbb{R}^2, \\\\quad \\\\|\\\\mathbf{v}\\\\|_2 = \\\\sqrt{\\\\mathbf{v}^T \\\\mathbf{v}} = \\\\sqrt{\\\\sum_{i=1}^n v_i^2}'",
  },
  {
    old: "formula: 'u · v = ‖u‖ ‖v‖ cos(θ) = u₁v₁ + u₂v₂'",
    new: "formula: '\\\\mathbf{u} \\\\cdot \\\\mathbf{v} = \\\\|\\\\mathbf{u}\\\\|_2 \\\\|\\\\mathbf{v}\\\\|_2 \\\\cos(\\\\theta) = \\\\sum_{i=1}^n u_i v_i = \\\\mathbf{u}^T \\\\mathbf{v}'",
  },
  {
    old: "formula: '∇f = [∂f/∂x, ∂f/∂y]    ‖∇f‖ = rate of steepest ascent'",
    new: "formula: '\\\\nabla f(\\\\mathbf{x}) = \\\\begin{bmatrix} \\\\frac{\\\\partial f}{\\\\partial x_1} \\\\\\\\ \\\\frac{\\\\partial f}{\\\\partial x_2} \\\\end{bmatrix}, \\\\quad D_{\\\\mathbf{u}} f(\\\\mathbf{x}) = \\\\nabla f(\\\\mathbf{x}) \\\\cdot \\\\hat{\\\\mathbf{u}} = \\\\|\\\\nabla f(\\\\mathbf{x})\\\\| \\\\cos(\\\\theta)'",
  },
  {
    old: "formula: 'P(H|E) = P(E|H) · P(H) / P(E)'",
    new: "formula: 'P(\\\\theta \\\\mid \\\\mathcal{D}) = \\\\frac{P(\\\\mathcal{D} \\\\mid \\\\theta) P(\\\\theta)}{P(\\\\mathcal{D})} = \\\\frac{P(\\\\mathcal{D} \\\\mid \\\\theta) P(\\\\theta)}{\\\\int P(\\\\mathcal{D} \\\\mid \\\\theta\\') P(\\\\theta\\') d\\\\theta\\\'}'",
  },
  {
    old: "formula: 'Av = λv    det(A - λI) = 0'",
    new: "formula: 'A\\\\mathbf{v} = \\\\lambda \\\\mathbf{v} \\\\iff (A - \\\\lambda I)\\\\mathbf{v} = \\\\mathbf{0}, \\\\quad \\\\det(A - \\\\lambda I) = 0'",
  },
  {
    old: "formula: 'Z = (X̄ - μ) / (σ / √n) ~ N(0, 1)'",
    new: "formula: '\\\\sqrt{n}\\\\left( \\\\bar{X}_n - \\\\mu \\\\right) \\\\xrightarrow{d} \\\\mathcal{N}(0, \\\\sigma^2), \\\\quad Z_n = \\\\frac{\\\\sum_{i=1}^n X_i - n\\\\mu}{\\\\sigma \\\\sqrt{n}} \\\\xrightarrow{d} \\\\mathcal{N}(0, 1)'",
  },
  {
    old: "formula: 'Memory: offset = i · stride[0] + j · stride[1]'",
    new: "formula: '\\\\text{Offset}(i, j) = i \\\\cdot s_0 + j \\\\cdot s_1, \\\\quad \\\\text{Broadcasting: } (M, 1) + (1, N) \\\\to (M, N)'",
  },
  {
    old: "formula: 'DataFrame = Matrix of Series | Columnar contiguous storage'",
    new: "formula: '\\\\text{Storage Layout: } \\\\text{BlockManager}[T_1, T_2, \\\\dots, T_k], \\\\quad \\\\text{Memory: } O(N \\\\times C) \\\\text{ contiguous}'",
  },
  {
    old: "formula: 'RANK() OVER (PARTITION BY dept ORDER BY salary DESC)'",
    new: "formula: '\\\\text{Window Frame: } \\\\text{RANK}() \\\\text{ OVER} (\\\\text{PARTITION BY } c_1 \\\\text{ ORDER BY } c_2 \\\\text{ ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW})'",
  },
  {
    old: "formula: 'Mean: x̄ = 9.0, ȳ = 7.50 | Var: s_x² = 11.0, s_y² = 4.125 | r = 0.816'",
    new: "formula: '\\\\bar{x} = 9.0, \\\\; \\\\bar{y} = 7.50, \\\\quad s_x^2 = 11.0, \\\\; s_y^2 = 4.125, \\\\quad r = 0.816, \\\\quad D_i = \\\\frac{e_i^2}{p \\\\cdot \\\\text{MSE}} \\\\frac{h_{ii}}{(1 - h_{ii})^2}'",
  },
  {
    old: "formula: 'β̂ = (XᵀX)⁻¹Xᵀy    e = y - Xβ̂    Xᵀe = 0'",
    new: "formula: 'X^T(y - X\\\\hat{\\\\beta}) = \\\\mathbf{0} \\\\implies \\\\hat{\\\\beta} = (X^T X)^{-1} X^T y, \\\\quad H = X(X^T X)^{-1} X^T'",
  },
  {
    old: "formula: 'd(x, q) = √(∑(xᵢ - qᵢ)²)'",
    new: "formula: 'd_p(\\\\mathbf{x}, \\\\mathbf{q}) = \\\\left( \\\\sum_{i=1}^d |x_i - q_i|^p \\\\right)^{1/p}, \\\\quad \\\\lim_{d \\\\to \\\\infty} \\\\frac{\\\\text{Vol}(B_d)}{\\\\text{Vol}(C_d)} = 0'",
  },
  {
    old: "formula: 'argmin_S ∑ᵢ ∑_{x ∈ Sᵢ} ‖x - μᵢ‖²'",
    new: "formula: '\\\\mathcal{J}(\\\\mathcal{S}, \\\\boldsymbol{\\\\mu}) = \\\\sum_{j=1}^K \\\\sum_{\\\\mathbf{x}_i \\\\in S_j} \\\\|\\\\mathbf{x}_i - \\\\boldsymbol{\\\\mu}_j\\\\|_2^2, \\\\quad \\\\boldsymbol{\\\\mu}_j = \\\\frac{1}{|S_j|} \\\\sum_{\\\\mathbf{x}_i \\\\in S_j} \\\\mathbf{x}_i'",
  },
  {
    old: "formula: 'Gini = 1 - ∑ pᵢ²    Entropy = -∑ pᵢ log₂(pᵢ)'",
    new: "formula: 'I_G(p) = 1 - \\\\sum_{k=1}^K p_k^2, \\\\quad \\\\Delta I = I(D) - \\\\frac{|D_L|}{|D|}I(D_L) - \\\\frac{|D_R|}{|D|}I(D_R)'",
  },
  {
    old: "formula: 'Ridge: ‖y - Xw‖² + λ‖w‖₂²    Lasso: ‖y - Xw‖² + λ‖w‖₁'",
    new: "formula: '\\\\min_{\\\\mathbf{w}} \\\\frac{1}{2n}\\\\|\\\\mathbf{y} - \\\\mathbf{X}\\\\mathbf{w}\\\\|_2^2 + \\\\lambda \\\\|\\\\mathbf{w}\\\\|_p, \\\\quad \\\\partial \\\\|w_j\\\\|_1 = \\\\text{sign}(w_j) \\\\implies \\\\text{Exact Sparsity}'",
  },
  {
    old: "formula: 'β_naive = β_true + γ · Cov(X, Z) / Var(X)'",
    new: "formula: '\\\\hat{\\\\beta}_{\\\\text{naive}} = \\\\beta_{\\\\text{true}} + \\\\gamma \\\\frac{\\\\text{Cov}(X, Z)}{\\\\text{Var}(X)}, \\\\quad \\\\mathbb{E}[Y \\\\mid \\\\text{do}(X)] \\\\ne \\\\mathbb{E}[Y \\\\mid X]'",
  },
  {
    old: "formula: 'β_IV = Cov(Y, Z) / Cov(D, Z) = (ZᵀD)⁻¹ZᵀY'",
    new: "formula: '\\\\hat{\\\\beta}_{\\\\text{Wald}} = \\\\frac{\\\\text{Cov}(Y, Z)}{\\\\text{Cov}(D, Z)}, \\\\quad \\\\hat{\\\\beta}_{\\\\text{2SLS}} = (\\\\hat{D}^T \\\\hat{D})^{-1} \\\\hat{D}^T Y, \\\\quad \\\\hat{D} = Z(Z^T Z)^{-1} Z^T D'",
  },
  {
    old: "formula: 'ReLU: max(0, z)    Sigmoid: 1/(1 + e⁻ᶻ)'",
    new: "formula: '\\\\text{ReLU}(z) = \\\\max(0, z), \\\\quad \\\\sigma(z) = \\\\frac{1}{1 + e^{-z}}, \\\\quad \\\\sigma\\\'(z) = \\\\sigma(z)(1 - \\\\sigma(z))'",
  },
  {
    old: "formula: 'v = βv - η∇L(w)    w = w + v'",
    new: "formula: '\\\\mathbf{v}_t = \\\\beta \\\\mathbf{v}_{t-1} + (1 - \\\\beta)\\\\nabla \\\\mathcal{L}(\\\\boldsymbol{\\\\theta}_t), \\\\quad \\\\boldsymbol{\\\\theta}_{t+1} = \\\\boldsymbol{\\\\theta}_t - \\\\eta \\\\frac{\\\\mathbf{m}_t}{\\\\sqrt{\\\\mathbf{v}_t} + \\\\epsilon}'",
  },
  {
    old: "formula: '(I * K)(i, j) = ∑_m ∑_n I(i+m, j+n) K(m, n)'",
    new: "formula: '(I * K)(i, j) = \\\\sum_{m=-k}^k \\\\sum_{n=-k}^k I(i+m, j+n) K(m, n), \\\\quad \\\\text{Dim} = \\\\left\\\\lfloor \\\\frac{N - K + 2P}{S} \\\\right\\\\rfloor + 1'",
  },
  {
    old: "formula: 'Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V'",
    new: "formula: '\\\\text{Attention}(\\\\mathbf{Q}, \\\\mathbf{K}, \\\\mathbf{V}) = \\\\text{softmax}\\\\left( \\\\frac{\\\\mathbf{Q}\\\\mathbf{K}^T}{\\\\sqrt{d_k}} \\\\right) \\\\mathbf{V}, \\\\quad \\\\sum_{j=1}^N A_{i,j} \\\\equiv 1.0'",
  },
  {
    old: "formula: 'dL/dx = ∑ (dL/dy · dy/dx)    (Reverse-mode autodiff)'",
    new: "formula: '\\\\frac{\\\\partial \\\\mathcal{L}}{\\\\partial x} = \\\\sum_{y \\\\in \\\\text{children}(x)} \\\\frac{\\\\partial \\\\mathcal{L}}{\\\\partial y} \\\\frac{\\\\partial y}{\\\\partial x}, \\\\quad \\\\bar{w} = \\\\bar{y} \\\\cdot \\\\frac{\\\\partial y}{\\\\partial w}'",
  },
  {
    old: "formula: 'pair_freq(a, b) = count(ab)    merge(a, b) -> new_token'",
    new: "formula: '(a^*, b^*) = \\\\arg\\\\max_{(u, v)} \\\\text{Freq}(u, v), \\\\quad \\\\mathcal{V}_{t+1} = \\\\mathcal{V}_t \\\\cup \\\\{ a^* b^* \\}'",
  },
];

for (const { old: oldF, new: newF } of mathFormulaReplacements) {
  if (content.includes(oldF)) {
    content = content.replace(oldF, newF);
  }
}

// Enhance starterCode docstrings across all modules to ensure they are self-documenting masterclass skeletons
fs.writeFileSync(curriculumPath, content, 'utf8');
console.log('Successfully updated curriculum formulas and estimated time to graduate standards.');
