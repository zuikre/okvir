---
id: "flashattention-tiling-online-softmax"
version: "1.0.0"
title: "FlashAttention: IO-Aware Tiling & Online Softmax"
track: "deeplearning"
module: "mod-44"
estimated_minutes: 15
prerequisites: ["grouped-query-attention-gqa"]
i18n:
  ar: "خوارزمية FlashAttention: التقطيع المتوافق مع الإدخال والإخراج وSoftmax اللحظية"
---

# FlashAttention: IO-Aware Tiling & Online Softmax

Traditional self-attention on modern GPUs is severely bottlenecked by **Memory Bandwidth (IO)**, not arithmetic compute capability. When computing standard attention:

$$
\mathbf{O} = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d}}\right) \mathbf{V}
$$

a standard implementation materializes the entire intermediate $N \times N$ attention score matrix $\mathbf{S} = \mathbf{Q}\mathbf{K}^T$ into slow High-Bandwidth Memory (HBM). For a long sequence of $N = 16\,384$ tokens in FP16, this single matrix occupies over 500 megabytes per head! The GPU must repeatedly write $\mathbf{S}$ to HBM, read it back to compute row-wise softmax normalizers, write the probabilities $\mathbf{P}$ back to HBM, and read them again to multiply by $\mathbf{V}$. The ultra-fast tensor compute cores spend the vast majority of their time idling, waiting for data to travel across the memory bus.

**FlashAttention** (Dao et al., 2022, 2023) eliminates this bottleneck by making self-attention *IO-aware*. Modern GPUs possess a hierarchy of memory: massive but slow external HBM (80 GB at ~3 TB/s on H100) and tiny, blistering-fast on-chip Static RAM (SRAM, ~228 KB per streaming multiprocessor at ~33 TB/s). FlashAttention tiles $\mathbf{Q}, \mathbf{K}, \mathbf{V}$ into small blocks that fit entirely inside on-chip SRAM. Using **Online Softmax**, it computes exact attention incrementally in a single pass without ever materializing the $N \times N$ matrix in HBM!

> **Frontier Analogy:** Instead of writing out a giant 10,000-page accounting ledger in a slow basement filing cabinet and constantly walking back and forth to look up numbers, you keep only a single index card on your desk scratchpad (SRAM) and update running totals on the fly as numbers arrive.

تعاني خوارزمية الانتباه الكلاسيكية في بطاقات الرسوميات من عنق زجاجة خانق في سرعة نقل الذاكرة (Memory Bandwidth IO) وليس في سرعة المعالجات الحسابية. فالنموذج يضطر إلى كتابة مصفوفة درجات الانتباه الضخمة $N \times N$ في ذاكرة HBM البطيئة، ثم قراءتها لحساب دالة Softmax، ثم كتابتها وقراءتها مجدداً لضربها في مصفوفة القيم $\mathbf{V}$. يقضي المعالج الرسومي معظم وقته في انتظار نقل البيانات عبر نواقل الذاكرة بدلاً من إجراء الحسابات الرياضية.

أحدثت خوارزمية **FlashAttention** نقلة نوعية عبر جعل الحسابات متوافقة مع هرمية الذاكرة الفيزيائية: حيث تُقسِّم مصفوفات المدخلات إلى كتل صغيرة تلائم تماماً ذاكرة SRAM الداخلية فائقة السرعة الملحقة بأنوية المعالجة. ومن خلال ابتكار **خوارزمية Softmax اللحظية (Online Softmax)**، تقوم الخوارزمية بحساب نواتج الانتباه بدقة رياضية مطلقة وتدريجية في مسار واحد ودون الحاجة إطلاقاً إلى حفظ مصفوفة الانتباه الكلية $N \times N$ في ذاكرة البطاقة الرئيسية!

:::simulation-widget{engine="canvas2d" component="FlashAttentionTilingLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
m_{\text{new}} = \max\left(m_{\text{prev}}, \max(S_{\text{block}})\right)
$$

$$
\alpha = \exp\left(m_{\text{prev}} - m_{\text{new}}\right), \quad P_{\text{block}} = \exp\left(S_{\text{block}} - m_{\text{new}}\right)
$$

$$
l_{\text{new}} = \alpha \cdot l_{\text{prev}} + \sum_{\text{cols}} P_{\text{block}}
$$

$$
O_{\text{new}} = \alpha \cdot O_{\text{prev}} + P_{\text{block}} V_{\text{block}}, \quad \text{Final Output: } O = \frac{O_{\text{final}}}{l_{\text{final}}}
$$

#### Step-by-Step Parameter Breakdown
- $S_{\text{block}} \in \mathbb{R}^{B_r \times B_c}$: Attention score tile computed in fast SRAM between query block $Q_i$ and key block $K_j$.
- $m_{\text{prev}}, m_{\text{new}} \in \mathbb{R}^{B_r \times 1}$: Row-wise running maximum values across past blocks and the new block.
- $\alpha = \exp(m_{\text{prev}} - m_{\text{new}}) \in (0, 1]$: Dynamic correction scaling factor. When a higher maximum is discovered, past unnormalized sums are scaled down by $\alpha$ to preserve exact mathematical equality!
- $l_{\text{prev}}, l_{\text{new}} \in \mathbb{R}^{B_r \times 1}$: Running accumulated denominator (sum of exponentials).
- $O_{\text{prev}}, O_{\text{new}} \in \mathbb{R}^{B_r \times d}$: Running accumulated numerator of the attention output.
- Memory IO Complexity: Reduced from $\mathcal{O}(N^2)$ HBM memory accesses down to $\mathcal{O}(N \cdot d)$, unlocking $3\times$ to $5\times$ wall-clock speedups.

:::python-challenge{id="py-flashattention-tiling-online-softmax"}
---
timeout_ms: 3000
test_cases:
  - input: "m = np.array([[-np.inf]]); l = np.array([[0.0]]); O = np.array([[0.0, 0.0]]); S = np.array([[1.0, 2.0]]); V = np.array([[1.0, 0.0], [0.0, 1.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(m_n[0,0])"
    expected: "2.0"
  - input: "m = np.array([[0.0]]); l = np.array([[1.0]]); O = np.array([[1.0, 1.0]]); S = np.array([[0.0]]); V = np.array([[2.0, 2.0]]); m_n, l_n, O_n = online_softmax_step(m, l, O, S, V); float(l_n[0,0])"
    expected: "2.0"
---
```python
import numpy as np

def online_softmax_step(
    m_prev: np.ndarray,
    l_prev: np.ndarray,
    O_prev: np.ndarray,
    S_block: np.ndarray,
    V_block: np.ndarray
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Executes a single FlashAttention online softmax update step for a block.
    
    Parameters
    ----------
    m_prev : np.ndarray of shape (B_r, 1)
        Previous running row maximums.
    l_prev : np.ndarray of shape (B_r, 1)
        Previous running row normalizers (sum of exp).
    O_prev : np.ndarray of shape (B_r, d)
        Previous unnormalized output accumulator.
    S_block : np.ndarray of shape (B_r, B_c)
        Current score block Q_i @ K_j^T / sqrt(d).
    V_block : np.ndarray of shape (B_c, d)
        Current value block.
        
    Returns
    -------
    m_new, l_new, O_new : tuple of np.ndarray
        Updated running maximums, normalizers, and accumulators.
    """
    # 1. Compute maximum of current score block
    m_block = np.max(S_block, axis=-1, keepdims=True)
    m_new = np.maximum(m_prev, m_block)
    
    # 2. Compute dynamic rescale factor alpha
    alpha = np.exp(m_prev - m_new)
    
    # 3. Exponentiate scores with new maximum subtracted
    P_block = np.exp(S_block - m_new)
    
    # 4. Rescale and accumulate denominator l
    l_new = alpha * l_prev + np.sum(P_block, axis=-1, keepdims=True)
    
    # 5. Rescale and accumulate unnormalized output O
    O_new = alpha * O_prev + np.matmul(P_block, V_block)
    
    return m_new, l_new, O_new
```
:::

### Transfer & Architectural Reasoning

**Scenario:** In training modern frontier models, the backward pass of FlashAttention-2 achieves superior speed compared to standard attention by purposefully **recomputing** the attention scores $\mathbf{S} = \mathbf{Q}\mathbf{K}^T$ from saved blocks of $\mathbf{Q}, \mathbf{K}, \mathbf{V}$ during backpropagation, rather than caching the $N \times N$ forward attention matrix in GPU memory. Why is intentional recomputation faster on modern accelerators?

* **A.** Forward attention matrices contain negative eigenvalues that cannot be preserved in IEEE floating point format.
* **B.** (*Correct*) On modern GPUs (like NVIDIA H100), compute throughput (FLOPs) is extraordinarily cheap and fast, while memory bandwidth (reading/writing to HBM) is scarce and slow. Storing and reading the $\mathcal{O}(N^2)$ attention matrix from HBM in the backward pass chokes the memory bus. Recomputing the attention scores on the fly directly inside SRAM requires zero HBM writes, replacing slow memory stalls with high-speed tensor core math.
* **C.** Recomputation enables skipping backpropagation through feedforward layers.
* **D.** Gradient descent requires resetting all attention weights to zero after every forward pass.

*Explanation:* FlashAttention exploits the fundamental hardware asymmetry of modern accelerators: compute is $10\times$ faster than memory bandwidth. Trading cheap FLOPs for reduced memory IO is the core design philosophy of frontier systems engineering.
