---
id: "multi-head-attention-projection"
version: "1.0.0"
title: "FlashAttention: SRAM Tiling & IO-Aware Kernel Execution"
track: "deeplearning"
module: "mod-42"
estimated_minutes: 15
prerequisites: ["transformer-attention", "matrix-multiplication-composition"]
i18n:
  ar: "خوارزمية FlashAttention: التبليط في ذاكرة SRAM والتنفيذ الواعي بحركة البيانات"
---

# FlashAttention: SRAM Tiling & IO-Aware Kernel Execution

To understand why Tri Dao et al. (2022, 2023) revolutionized AI hardware execution with FlashAttention, one must look at the physical architecture of a modern GPU (such as an NVIDIA A100 or H100):
1. High Bandwidth Memory (HBM / VRAM): Massive capacity (80 GB), but relatively slow bandwidth (~2.0 TB/s).
2. Static Random-Access Memory (SRAM / Shared Memory): Located directly inside the streaming multiprocessors. Blazing fast (~19 TB/s, nearly $10\times$ faster than HBM), but microscopic capacity (~192 KB per SM).

In standard PyTorch self-attention:

:::simulation-widget{engine="canvas2d" component="FlashAttention2KernelLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{S} = \frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}} \quad (\text{writes } N \times N \text{ matrix to HBM})
$$

تُعد FlashAttention خوارزمية انتباه دقيقة واعية بمسارات الإدخال والإخراج (IO-aware)، صُممت لتسريع تدريب واستدلال نماذج المحولات عبر استغلال التدرج الهرمي لذاكرة المعالجات الرسومية. فمن خلال تجزئة مصفوفات الاستعلامات والمفاتيح والقيم إلى كتل صغيرة تتسع داخل ذاكرة SRAM السريعة المدمجة بالمعالج، تحسب FlashAttention الانتباه باستخدام دالة Softmax اللحظية المدمجة دون كتابة مصفوفة الانتباه التربيعية $N \times N$ إطلاقاً في ذاكرة HBM البطيئة. يقلص هذا الابتكار عمليات قراءة وكتابة الذاكرة من التعقيد التربيعي $O(N^2)$ إلى التعقيد الخطي $O(N)$، محققاً قفزات سرعة هائلة وتوفيراً جذرياً في الذاكرة.

:::python-challenge{id="py-multi-head-attention-projection"}
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

def flash_attention_forward(Q, K, V, block_r=4, block_c=4):
    """Tiled FlashAttention forward algorithm."""
    # TODO: Initialize O, l, m arrays
    # TODO: Outer loop over K, V blocks (columns)
    # TODO: Inner loop over Q blocks (rows)
    # TODO: Update running stats and normalize O by l at completion
    pass
```
:::
