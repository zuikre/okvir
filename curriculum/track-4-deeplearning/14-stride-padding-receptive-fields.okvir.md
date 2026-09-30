---
id: "stride-padding-receptive-fields"
version: "1.0.0"
title: "Causal Autoregressive Masking & Directed Information Flow"
track: "deeplearning"
module: "mod-39"
estimated_minutes: 15
prerequisites: ["cnn-convolution"]
i18n:
  ar: "الحجب السببي التوليدي وتوجيه تدفق المعلومات"
---

# Causal Autoregressive Masking & Directed Information Flow

In bidirectional language models like BERT, every token can attend to every other token, both in the past and in the future. For example, when reading "The [MASK] sat on the mat", attending to "mat" provides strong evidence that the masked word is "cat".

However, in generative autoregressive language modeling (GPT-4, Claude, LLaMA), the task is fundamentally chronological: the model must predict token $t+1$ given only tokens $1, \dots, t$. If token $i$ is permitted to attend to token $j$ where $j > i$, the model can simply look ahead into the future, trivially "cheating" during traini

:::simulation-widget{engine="canvas2d" component="CausalMaskLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
M_{ij} = \begin{cases} 0 & \text{if } j \le i \\ -\infty & \text{if } j > i \end{cases}
$$

يفرض "الحجب السببي التوليدي" (Causal Masking) سهم الزمن الصارم في نماذج المحولات التوليدية المقتصرة على فك التشفير (Decoder-only). وعبر دمج قناع مصفوفي مثلثي علوي محشو بقيم سالب المالانهاية ($-\infty$) ضمن مصفوفة الألفة قبل دالة Softmax، تؤول أوزان الانتباه لكافة المواقع المستقبلية $j > i$ إلى الصفر الرياضي المطلق ($e^{-\infty} = 0$). يضمن هذا القيد السببي تدريباً متوازياً فائق السرعة عبر كامل السلسلة مع التأكيد الرياضي على أن التنبؤ عند اللحظة $t$ يعتمد حصراً على سياق اللحظات السابقة والمعاصرة $\le t$.

:::python-challenge{id="py-stride-padding-receptive-fields"}
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

def causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Compute causal autoregressive attention."""
    # TODO: Compute scaled dot-product scores
    # TODO: Create upper-triangular boolean mask (j > i) and fill with -1e9
    # TODO: Softmax and project with V
    pass
```
:::
