---
id: "causal-masking-scaled-dot-product"
version: "1.0.0"
title: "Causal Masking & Autoregressive Decoding"
track: "deeplearning"
module: "mod-42"
estimated_minutes: 15
prerequisites: ["transformer-attention"]
i18n:
  ar: "الحجب السببي والتوليد التتابعي في نماذج المحولات"
---

# Causal Masking & Autoregressive Decoding

## Beat 1: Tactile Intuition
Imagine taking a final exam where the answer key is printed right at the bottom of the page. If you can look ahead into the future, you get an effortless 100% score during practice—but you learn nothing! When you sit for the real test without an answer key, you fail completely. In autoregressive language models (like GPT-4, Claude, and LLaMA), training is fully parallelized: we feed an entire 4,000-word text into the transformer all at once. But to learn how to predict the NEXT word, token 5 must NEVER peek at tokens 6, 7, or 8! Causal Masking enforces a strict one-way mirror (the Arrow of Time). Any attempt to look forward into future tokens is struck with -∞ before softmax. Because e^{-∞} = 0, attention weights to future tokens collapse to absolute mathematical zero.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيل أن طالباً يتدرب على امتحان وورقة الإجابات النموذجية مفتوحة أمامه؛ سينظر إلى الإجابات المستقبلية بسهولة ويحصل على علامة كاملة دون أن يتعلم التفكير بمفرده! في نماذج المحولات التوليدية (GPT)، نقوم بتدريب النموذج على آلاف الرموز في خطوة متوازية واحدة فائقة السرعة. ولكن لكي يتعلم النموذج توليد الكلمة التالية بحق، يُمنع منعاً باتاً على أي رمز أن 'يسترق النظر' إلى المستقبل. يحقق 'الحجب السببي' (Causal Masking) هذا القيد الزمني الصارم عبر وضع مصفوفة مثلثة علوية مشحونة بقيم -∞ على خانات المستقبل قبل حساب Softmax؛ وبما أن e^{-∞} = 0، تصبح أوزان الانتباه للمستقبل أصفاراً رياضية مطلقة، مما يجبر النموذج على التنبؤ بناءً على الماضي والحاضر فقط.

## Beat 2: Formal Mathematical Anchor
$$
\mathbf{M}_{ij} = \begin{cases} 0 & j \le i \\ -\infty & j > i \end{cases}, \quad \text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}} + \mathbf{M}\right) \mathbf{V}
$$

In decoder-only autoregressive Transformers, causal masking guarantees that the prediction for token t+1 depends strictly on tokens 1 through t. An additive mask matrix M is constructed where M_{ij} = 0 for j <= i and M_{ij} = -inf (typically -1e9 in 32-bit floats) for j > i. Adding M to the pre-softmax logits ensures that the softmax denominator redistributes all probability mass strictly across past and current tokens, maintaining mathematical equivalence between parallel training and step-by-step inference.

في نماذج المحولات التوليدية المقتصرة على فك التشفير، يضمن الحجب السببي أن التنبؤ بالرمز t+1 يعتمد حصراً على الرموز السابقة والمعاصرة 1 إلى t. تُبنى مصفوفة القناع الجمعي M بقيم 0 للمواقع j <= i وقيم -∞ للمواقع المستقبلية j > i. عند جمع هذا القناع مع مصفوفة الألفة قبل Softmax، يعيد مقام التوزيع الاحتمالي توزيع كامل الكتلة الاحتمالية على الرموز السابقة فقط، مما يحقق تطابقاً رياضياً تاماً بين التدريب المتوازي فائق السرعة والاستدلال التتابعي خطوة بخطوة.

## Beat 3: Python Challenge
:::python-challenge{id="py-causal-masking-scaled-dot-product"}
---
timeout_ms: 3000
test_cases:
  - input: "Q = np.ones((1, 3, 2)); K = np.ones((1, 3, 2)); V = np.ones((1, 3, 2)); out, A = causal_attention(Q, K, V); str(round(float(A[0, 0, 1]), 2))"
    expected: "0.0"
  - input: "Q = np.ones((1, 3, 2)); K = np.ones((1, 3, 2)); V = np.ones((1, 3, 2)); out, A = causal_attention(Q, K, V); str(round(float(A[0, 0, 0]), 2))"
    expected: "1.0"
---
```python
import numpy as np

def causal_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute Causal Autoregressive Attention with an upper-triangular lookahead mask.
    """
    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)
    # d_k = Q.shape[-1]
    # S = np.matmul(Q, np.swapaxes(K, -1, -2)) / np.sqrt(d_k)
    # Step 2: Build upper-triangular mask M (j > i) with -1e9
    # TODO: mask = np.triu(np.full((S_len, S_len), -1e9), k=1)
    # TODO: Add mask to S
    # Step 3: Compute stable softmax and multiply by V
    pass
```
:::

## Beat 4: Reality Transfer Challenge
Why is causal masking implemented by adding -∞ to scores BEFORE softmax rather than zeroing out weights AFTER softmax?

* [x] Zeroing weights after softmax breaks probability normalization (sum != 1), whereas adding -∞ before softmax naturally normalizes the remaining past positions.
* [ ] Softmax cannot be computed on GPUs unless an upper-triangular mask is present.
