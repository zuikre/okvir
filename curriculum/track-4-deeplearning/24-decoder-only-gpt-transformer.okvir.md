---
id: "decoder-only-gpt-transformer"
version: "1.0.0"
title: "QLoRA & NormalFloat4 (NF4) Quantization Grids"
track: "deeplearning"
module: "mod-43"
estimated_minutes: 15
prerequisites: ["multi-head-attention-projection", "positional-encoding-sinusoidal-rope", "rmsnorm-residual-highways"]
i18n:
  ar: "خوارزمية QLoRA وشبكات التكميم العائم الطبيعي رباعي البتات (NF4)"
---

# QLoRA & NormalFloat4 (NF4) Quantization Grids

While LoRA reduces trainable parameter memory to a fraction of a percent, the frozen base model weights $\mathbf{W}_0$ still consume massive VRAM (e.g. 130 GB in 16-bit precision for a 65B model). This meant that fine-tuning a 65B/70B model still required a cluster of multiple expensive 80 GB enterprise GPUs.

In 2023, Tim Dettmers et al. introduced QLoRA (Quantized Low-Rank Adaptation), demonstrating that a 65B parameter model could be fine-tuned on a single consumer 48 GB GPU with zero degradation in performance.

QLoRA achieves this through three core technical innovations:
1. T

:::simulation-widget{engine="canvas2d" component="QLoRAQuantizationLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
q_i = \frac{1}{2} \left( Q_X\left(\frac{i}{2^k}\right) + Q_X\left(\frac{i+1}{2^k}\right) \right)
$$

تحقق خوارزمية QLoRA ضغطاً فائقاً للذاكرة عبر تكميم أوزان النموذج التأسيسي المجمدة في تمثيل رقمي رباعي البتات مثالي من منظور نظرية المعلومات يُعرف باسم "الفاصلة العائمة الطبيعية" (NF4). ومن خلال توزيع مستويات التكميم الستة عشر وفقاً لشرائح احتمالية متساوية (Quantiles) للتوزيع الطبيعي المعياري، تقلص NF4 فقدان المعلومات للأوزان الموزعة غاوسياً إلى حده الأدنى. وتُضاف محولات LoRA عالية الدقة (BF16) فوق الأوزان المكممة، مما يتيح تدريباً كاملاً للنماذج اللغوية العملاقة على معالجات استهلاكية دون أي تراجع في الأداء.

:::python-challenge{id="py-decoder-only-gpt-transformer"}
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
:::
