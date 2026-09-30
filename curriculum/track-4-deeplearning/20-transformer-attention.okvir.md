---
id: "transformer-attention"
version: "1.0.0"
title: "Online Softmax Normalization & Dynamic Scale Invariance"
track: "deeplearning"
module: "mod-42"
estimated_minutes: 15
prerequisites: ["dot-product-geometry", "numerically-stable-softmax-cross-entropy"]
i18n:
  ar: "معايرة التوزيع الاحتمالي اللحظية (Online Softmax) والثبات الديناميكي للمقياس"
---

# Online Softmax Normalization & Dynamic Scale Invariance

Standard softmax applied to a row vector $\mathbf{x} = [x_1, \dots, x_N] \in \mathbb{R}^N$ is historically computed in three distinct sequential passes:
1. Pass 1 (Max Finding): $m = \max_{i=1}^N x_i$ (for numerical stability).
2. Pass 2 (Summing Exponentials): $l = \sum_{i=1}^N e^{x_i - m}$.
3. Pass 3 (Normalization & Output): $p_i = \frac{e^{x_i - m}}{l}$ and $y = \sum_{i=1}^N p_i v_i$.

In deep learning hardware, this three-pass loop is disastrous when sequence length $N$ is large (e.g. $N = 4096$ or $128,000$). The intermediate scores $\mathbf{S} = \mathbf{Q}\mathbf{K}^T$ f

:::simulation-widget{engine="canvas2d" component="FlashAttentionMemoryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
m_{\text{new}} = \max(m_A, m_B)
$$

تتيح خوارزمية "معايرة التوزيع الاحتمالي اللحظية" (Online Softmax) معايرة متجهات القيم المتدفقة في مسار حسابي واحد ودون الحاجة لمعرفة القيمة العظمى الإجمالية مسبقاً. فمن خلال الاحتفاظ بإحصائيات تتبع ديناميكية — تشمل القيمة العظمى اللحظية $m$ ومجموع المعايرة اللحظي $l$ — وإعادة قياس التراكمات الجزئية السابقة بضربها في الفارق الأسي $e^{m_{\text{old}} - m_{\text{new}}}$، تحسب الخوارزمية نواتج Softmax الرياضية بدقة مطلقة وتدريجية. يلغي هذا التطابق الجبري الحاجة إلى مزامنة الذاكرة متعددة المراحل، مما يشكل النواة الحسابية الثورية لخوارزمية FlashAttention.

:::python-challenge{id="py-transformer-attention"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
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
:::
