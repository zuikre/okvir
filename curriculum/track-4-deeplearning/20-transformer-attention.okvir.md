---
id: "transformer-attention"
version: "1.0.0"
title: "Scaled Dot-Product Self-Attention & Query-Key Routing"
track: "deeplearning"
module: "mod-42"
estimated_minutes: 15
prerequisites: ["dot-product-geometry", "numerically-stable-softmax-cross-entropy"]
i18n:
  ar: "آلية الانتباه الذاتي بالضرب النقطي المقاس وتوجيه الاستعلام والمفاتيح"
---

# Scaled Dot-Product Self-Attention & Query-Key Routing

## Beat 1: Tactile Intuition
In a noisy hall where fifty people are talking simultaneously, how do you pay attention to the one person who matters? Your brain shines a dynamic spotlight: ignoring irrelevant noise and amplifying the voice matching what you care about. In sequence modeling, words need this exact same spotlight! Consider the sentence: 'The bank of the river was muddy.' How does the word 'bank' know it refers to soil rather than money? Through self-attention! The word 'bank' shines a spotlight across every other word. When it strikes 'river', energetic resonance spikes! Vaswani et al. (2017) formalized this with Queries (Q), Keys (K), and Values (V):
- Query (Q): What I am looking for ('bank' asks: 'Who describes my physical environment?').
- Key (K): The label on the book ('river' says: 'I describe water and nature!').
- Value (V): The actual knowledge pulled into the representation of 'bank'.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيل أنك في قاعة مزدحمة وتريد الاستماع لشخص معين؛ ستوجه تركيزك كـ 'مصباح تسليط ضوئي' (Spotlight) لوزن الكلمات ذات الصلة وتجاهل الضجيج. في معالجة اللغات، تواجه الكلمات التحدي نفسه: في جملة 'ذهب خالد إلى بنك النهر'، كيف تدرك كلمة 'بنك' أنها تعني ضفة النهر وليس المؤسسة المالية؟ عبر آلية الانتباه الذاتي! ترسل كل كلمة استعلاماً (Query) يبحث عن سياقها، وتقارنه بمفاتيح (Keys) كافة الكلمات الأخرى عبر الضرب النقطي. وعندما يتطابق استعلام 'بنك' مع مفتاح 'النهر'، يقفز وزن الانتباه، فيتم سحب محتوى القيمة (Value) الخاصة بالنهر لإثراء معنى البنك.

## Beat 2: Formal Mathematical Anchor
$$
\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}}\right) \mathbf{V}, \quad \text{Var}(\mathbf{q} \cdot \mathbf{k}) = d_k
$$

The dot product QK^T computes pairwise cosine-like similarity between every Query and Key vector. Why divide by sqrt(d_k)? If elements of q and k are independent random variables with zero mean and variance 1, their dot product has variance d_k and standard deviation sqrt(d_k). In high dimensions (e.g. d_k = 128), dot products grow massive (> 30). Large logits push softmax exponentials into saturation regions where gradients vanish to zero (derivative ≈ 0). Dividing by sqrt(d_k) restores unit variance, keeping softmax responsive and gradients healthy.

يقيس الضرب النقطي QK^T درجة التشابه الهندسي بين كل استعلام ومفتاح. لماذا نقسم على جذر البعد sqrt(d_k)؟ إذا كانت عناصر المتجهات متغيرات عشوائية بتباين 1، فإن حاصل ضربهما النقطي يمتلك تبايناً يساوي d_k. في الأبعاد العالية (مثل d_k = 128)، تتضخم القيم الناتجة (> 30)، مما يدفع دالة Softmax إلى التشبع التام فتتلاشى تدرجاتها العكسية تماماً. يعيد التقسيم على sqrt(d_k) التباين إلى 1، مما يحافظ على استقرار التدرجات ومرونة التعلم.

## Beat 3: Python Challenge
:::python-challenge{id="py-transformer-attention"}
---
timeout_ms: 3000
test_cases:
  - input: "Q = np.array([[[1.0, 0.0]]]); K = np.array([[[1.0, 0.0]]]); V = np.array([[[5.0, 7.0]]]); out, A = scaled_dot_product_attention(Q, K, V); str(round(float(out[0, 0, 0]), 2))"
    expected: "5.0"
  - input: "Q = np.zeros((1, 2, 4)); K = np.zeros((1, 2, 4)); V = np.ones((1, 2, 3)); out, A = scaled_dot_product_attention(Q, K, V); str(round(float(A[0, 0, 0]), 2))"
    expected: "0.5"
---
```python
import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray, scale: float | None = None) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V.
    """
    # Step 1: Determine scale factor 1.0 / sqrt(d_k) if scale is None
    # d_k = Q.shape[-1]
    # if scale is None: scale = 1.0 / np.sqrt(d_k)
    # Step 2: Compute scaled scores S = Q @ K.T * scale
    # TODO: Compute S = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale
    # Step 3: Compute stable softmax: exp(S - max(S)) / sum(exp(S - max(S)))
    # TODO: Compute attention weights A
    # Step 4: Multiply by V: out = A @ V
    pass
```
:::

## Beat 4: Reality Transfer Challenge
Why is the scaling factor 1 / sqrt(d_k) mathematically necessary in dot-product attention?

* [x] For large d_k, the variance of the dot product grows to d_k, pushing softmax into extreme saturation regions with near-zero gradients.
* [ ] The scaling factor inverts the attention matrix to compute its mathematical pseudo-inverse.
