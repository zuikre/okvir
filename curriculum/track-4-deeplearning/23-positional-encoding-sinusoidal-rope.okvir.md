---
id: "positional-encoding-sinusoidal-rope"
version: "1.0.0"
title: "Low-Rank Adaptation (LoRA) & Intrinsic Rank Decompositions"
track: "deeplearning"
module: "mod-43"
estimated_minutes: 15
prerequisites: ["causal-masking-scaled-dot-product"]
i18n:
  ar: "التكيف منخفض الرتبة (LoRA) وتفكيك الرتبة الجوهرية"
---

# Low-Rank Adaptation (LoRA) & Intrinsic Rank Decompositions

As frontier foundation models grew from hundreds of millions to hundreds of billions of parameters, Full Fine-Tuning (FFT) became computationally intractable. Fine-tuning a 70B parameter model in FP16 requires storing:
 140 GB of model weights.
 140 GB of gradient tensors.
 560 GB of AdamW optimizer states ($m_t, v_t$).
Total: nearly 1 Terabyte of GPU VRAM just to fine-tune a model! Furthermore, serving 1,000 different fine-tuned models for 1,000 enterprise customers would require storing 1,000 independent 140 GB checkpoints (140 Terabytes of storage).

In 2021, Edward Hu et al. int

:::simulation-widget{engine="canvas2d" component="LoRASVDGeometryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\Delta \mathbf{W} = \frac{\alpha}{r} \mathbf{B} \mathbf{A}, \quad \mathbf{B} \in \mathbb{R}^{d \times r}, \quad \mathbf{A} \in \mathbb{R}^{r \times k}, \quad \text{with } r \ll \min(d, k)
$$

تعمل تقنية "التكيف منخفض الرتبة" (LoRA) على نمذجة تحديثات الأوزان الخاصة بالمهام عبر تفكيك موتر التعديل إلى حاصل ضرب مصفوفات منخفضة الرتبة: $\Delta \mathbf{W} = \frac{\alpha}{r} \mathbf{B}\mathbf{A}$ حيث $r \ll \min(d, k)$. ومن خلال تجميد أوزان النموذج التأسيسي $\mathbf{W}_0$ بالكامل وتدريب مصفوفات المحول المضغوطة فقط، تختزل LoRA المعاملات القابلة للتدريب وذاكرة المحسّن بنسبة تتجاوز 99%. يضمن بدء المصفوفة $\mathbf{B}$ بقيم صفرية انطلاق التدريب بدقة من نقطة الأصل للنموذج الأساسي، بينما يتيح دمج الأوزان خطياً انعدام أي تأخير زمني أثناء الاستدلال.

:::python-challenge{id="py-positional-encoding-sinusoidal-rope"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
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
:::
