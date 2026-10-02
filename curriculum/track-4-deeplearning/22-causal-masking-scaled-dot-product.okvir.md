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

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

Imagine you are preparing for a difficult medical licensing examination. If you practice using a workbook where the correct answer to every question is printed in bold right next to the question prompt, your eyes will naturally and effortlessly glance at the answers. During training, you achieve a flawless 100% score in record time. But on the day of the real exam, when you are handed a blank sheet of paper, you fail catastrophically—because you never actually learned how to deduce the answers yourself!

This is the exact disaster that threatens generative language models like GPT-4, Claude, and LLaMA.

During the pretraining phase, foundation models are trained with massive computational parallelism. Instead of feeding in sentences one word at a time, we feed entire documents spanning 4,000, 8,000, or even 128,000 tokens into the Transformer all at once! The model's objective is **next-token prediction**: given the first five words, predict the sixth word.

However, standard self-attention allows every word to attend to every other word in the sequence. If token 5 (*"The cat sat on the"*) is allowed to shine its attention spotlight forward into token 6 (*"mat"*), the network will simply memorize the trivial identity mapping: copy token 6 directly into the prediction slot! It cheats during training, learning zero reasoning.

To enforce the strict, irreversible **Arrow of Time**, generative Transformers install an unbreakable **one-way mirror**: the **Causal Attention Mask**.

The causal mask is an upper-triangular matrix that acts as an impenetrable temporal curtain. For any token at position $i$, any attempt to attend to a future token $j > i$ is penalized with a score of $-\infty$ (negative infinity) before passing into the softmax function. Because the exponential of negative infinity is absolute zero ($e^{-\infty} = 0$), the attention weight allocated to future tokens is crushed to **absolute mathematical zero**! The token can only draw context from itself and the past, preserving the integrity of autoregressive learning.

> **Frontier Analogy:** Imagine reading a suspense murder mystery with a specialized pair of reading glasses. The lenses have an electronic polarizing shutter that instantly blacks out all lines of text below the line you are currently reading. You can reread every clue on previous pages as many times as you like, but the future remains in complete darkness.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيل طالباً يتدرب لاختبار طبي معقد وكتاب التدريبات يحتوي على الإجابة الصحيحة مطبوعة بخط عريض بجانب كل سؤال؛ ستنزلق عيناه لا شعورياً نحو الإجابات الجاهزة، وسيحقق نسبة نجاح 100% أثناء التدريب دون أي عناء. ولكن في يوم الاختبار الفعلي، عندما تُسحب منه الإجابات، سينهار تماماً لأنه لم يتعلم كيف يستنتج الحل بمفرده!

هذا الفخ الكارثي هو ما يهدد نماذج الذكاء الاصطناعي التوليدية (مثل GPT و Claude و LLaMA).

أثناء التدريب المسبق، نغذي النموذج بوثائق كاملة تتألف من آلاف الكلمات في خطوة متوازية واحدة فائقة السرعة على مئات معالجات الرسومات. وهدف النموذج الجوهري هو **التنبؤ بالرمز التالي**: بناءً على أول خمس كلمات، خمن الكلمة السادسة.

غير أن آلية الانتباه الذاتي الافتراضية تسمح لكل رمز بالتواصل مع كافة الرموز الأخرى في الجملة. فإذا سمحنا للرمز الخامس بالنظر إلى الرمز السادس الموجود بالفعل في مصفوفة التدريب، سيكتفي النموذج بـ "الغش"، عبر نسخ الكلمة التالية مباشرة دون أن يتعلم أي فهم لغوي حقيقي.

لفرض **سهم الزمن** وقانون السببية، تزود المحولات بـ **مرآة ذات اتجاه واحد**: **الحجب السببي (Causal Masking)**.

يعمل القناع السببي كمصفوفة مثلثة علوية تضع حاجزاً لا يمكن اختراقه أمام المستقبل. بالنسبة لأي رمز في الموقع $i$, فإن أي محاولة لتوجيه الانتباه لرمز مستقبلي $j > i$ تُعاقب بقيمة $-\infty$ (سالب اللانهاية) قبل الدخول إلى دالة Softmax. وبما أن الدالة الأسية لسالب اللانهاية تساوي صفراً مطلقاً ($e^{-\infty} = 0$), فإن وزن الانتباه المخصص للمستقبل ينعدم تماماً! يضطر الرمز للاعتماد حصراً على ما سبقه من سياق، محققاً تطابقاً تاماً بين سرعة التدريب المتوازي ودقة التوليد التتابعي الحقيقي.

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

In autoregressive decoder Transformers, causal self-attention is formulated by adding an additive causal mask matrix $\mathbf{M} \in \mathbb{R}^{N \times N}$ to the pre-softmax compatibility logits:

$$
\text{CausalAttention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}} + \mathbf{M}\right) \mathbf{V}
$$

Where the causal mask tensor $\mathbf{M}$ is defined as:

$$
\mathbf{M}_{ij} = \begin{cases} 
0 & \text{if } j \le i \quad \text{(past and present positions)} \\ 
-\infty & \text{if } j > i \quad \text{(forbidden future lookahead)} 
\end{cases}
$$

In 32-bit floating-point GPU execution, $-\infty$ is represented as a large negative scalar, typically $-10^9$ or `-1e9` (or `-1e4` in FP16), to prevent hardware underflow exceptions.

### Why $-\infty$ Before Softmax instead of $0$ After Softmax?
Consider what would happen if you computed standard unmasked attention and simply zeroed out future weights *after* the softmax step:

$$
\mathbf{A}_{\text{bad}} = \text{tril}(\text{softmax}(\mathbf{S}))
$$

For row $i=1$ in a 4-token sequence, each position originally receives $\text{softmax}(S)_{1j} = 0.25$.
Zeroing out positions $j > 1$ yields:
$$\mathbf{A}_{\text{bad}}[1, :] = [0.25, 0.0, 0.0, 0.0]$$
The sum of attention weights across the row is now $\sum_j \mathbf{A}_{ij} = 0.25 \neq 1.0$!
This completely breaks the mathematical definition of a **convex combination**. The magnitude of the token vector shrinks by $75\%$ after a single layer, and across an 80-layer Transformer, activations exponentially vanish to zero!

By contrast, adding $-\infty$ **inside** the softmax function directly modifies the exponent:

$$
\text{softmax}\left(\frac{S_{ij} + M_{ij}}{\sqrt{d_k}}\right) = \frac{e^{\frac{S_{ij} + M_{ij}}{\sqrt{d_k}}}}{\sum_{k=1}^N e^{\frac{S_{ik} + M_{ik}}{\sqrt{d_k}}}} = \frac{e^{\frac{S_{ij}}{\sqrt{d_k}}}}{\sum_{k \le i} e^{\frac{S_{ik}}{\sqrt{d_k}}} + \sum_{k > i} e^{-\infty}} = \frac{e^{\frac{S_{ij}}{\sqrt{d_k}}}}{\sum_{k \le i} e^{\frac{S_{ik}}{\sqrt{d_k}}}}
$$

The denominator automatically normalizes **strictly across the valid past positions**, guaranteeing that the remaining attention weights sum to **exactly $1.0$**!

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{M} \in \mathbb{R}^{N \times N}$: Causal mask matrix where strictly upper-triangular entries ($j > i$) are filled with $-\infty$.
* $\mathbf{S} = \frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}}$: Scaled logit affinity matrix before masking.
* $\mathbf{A}_{ij}$: Causal attention probability matrix where $\mathbf{A}_{ij} = 0$ for all $j > i$ and $\sum_{j=1}^i \mathbf{A}_{ij} = 1.0$ for every row $i$.
* **Autoregressive Property:** Guarantees that prediction $\hat{y}_t = P(x_{t+1} \mid x_1, \dots, x_t)$ depends strictly on historical prefix tokens without temporal contamination.

تبرهن هذه الصياغة الرياضية الدقيقة سبب تطبيق القناع بإضافة $-\infty$ قبل Softmax وليس بتصفير الأوزان بعدها: فتصفير الأوزان بعد Softmax يجعل مجموع الاحتمالات في الصف أقل من 1.0، مما يؤدي إلى اضمحلال الإشارات وتلاشيها عبر الطبقات. أما إضافة $-\infty$ داخل الدالة الأسية، فيضمن اختفاء أثر المستقبل تماماً وإعادة توزيع كامل الكتلة الاحتمالية بنسبة 100% على الرموز السابقة حصراً.

---

## Beat 3: Python Challenge | التحدي البرمجي التفاعلي

Implement `causal_attention(Q, K, V)` to compute scaled dot-product attention with an upper-triangular lookahead causal mask.
1. Compute raw scores $\mathbf{S} = (\mathbf{Q} \mathbf{K}^T) / \sqrt{d_k}$.
2. Construct an upper-triangular mask $\mathbf{M}$ where elements above the main diagonal ($j > i$) are set to `-1e9` and all other elements are `0.0`.
3. Add $\mathbf{M}$ to $\mathbf{S}$.
4. Compute stable softmax along the last axis.
5. Multiply attention weights by $\mathbf{V}$.

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
    
    Parameters
    ----------
    Q : np.ndarray of shape (B, N, d_k)
    K : np.ndarray of shape (B, N, d_k)
    V : np.ndarray of shape (B, N, d_v)
    
    Returns
    -------
    tuple of (output, attention_weights)
        output: shape (B, N, d_v)
        attention_weights: shape (B, N, N) with strict zeros above main diagonal
    """
    # Step 1: Calculate raw scaled dot-product scores S = (Q @ K.T) / sqrt(d_k)
    d_k = Q.shape[-1]
    scale = 1.0 / np.sqrt(d_k)
    scores = np.matmul(Q, np.swapaxes(K, -1, -2)) * scale  # (B, N, N)

    # Step 2: Build upper-triangular mask M where j > i is filled with -1e9
    N = Q.shape[-2]
    # np.triu with k=1 sets strictly upper triangular elements to True
    mask = np.triu(np.full((N, N), -1e9), k=1)
    
    # Step 3: Add mask to scaled scores
    masked_scores = scores + mask

    # Step 4: Compute numerically stable softmax along the last axis
    scores_max = np.max(masked_scores, axis=-1, keepdims=True)
    exp_scores = np.exp(masked_scores - scores_max)
    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)

    # Step 5: Multiply attention weights by Values
    output = np.matmul(attention_weights, V)

    return output, attention_weights
```
:::

---

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

### Transfer Question / سؤال نقل الأثر المعرفي

Why must causal masking be implemented by adding $-\infty$ (or $-10^9$) to the pre-softmax logits, rather than calculating unmasked softmax and simply multiplying future positions by zero afterwards?

* [x] Setting future entries to zero after softmax breaks the probability distribution ($\sum_j A_{ij} < 1$), causing activations to shrink across layers, whereas adding $-\infty$ before softmax naturally redistributes 100% of the probability mass strictly across valid past tokens.
* [ ] Softmax cannot be executed on GPU hardware unless an upper-triangular matrix is present in register memory.
* [ ] Zeroing out entries after softmax causes the attention matrix to become singular and crash the operating system kernel.
* [ ] Adding $-\infty$ before softmax inverts the attention matrix into an identity operator.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
Softmax is a normalizer mapping raw real numbers to a valid probability distribution lying on the unit simplex: $\sum_j \text{softmax}(z)_j = 1$. If you compute softmax across all $N$ tokens and then set elements where $j > i$ to zero, the sum across row $i$ drops below 1. For example, for the first token in a 1,000-token sequence, the sum of weights would collapse to $\frac{1}{1000} = 0.001$. Multiplying by $\mathbf{V}$ would shrink the token representation by a factor of 1,000 in a single layer, causing catastrophic activation decay across deep Transformer layers. In contrast, adding $-\infty$ before softmax evaluates to $e^{-\infty} = 0$ in both the numerator and denominator, automatically and cleanly redistributing 100% of the attention probability mass strictly over tokens $j \le i$.

**Why the distractors are incorrect:**
1. *Softmax cannot be executed on GPUs without upper-triangular matrix...*: False. Standard unmasked softmax is a generic CUDA kernel executed across any tensor dimension, widely used in vision transformers and encoder models like BERT.
2. *Zeroing out entries causes attention matrix to become singular and crash OS...*: False. Attention matrices in inference are frequently singular or rank-deficient without crashing hardware or operating system kernels.
3. *Adding $-\infty$ inverts attention into identity operator...*: False. Masking produces a lower-triangular attention matrix where past tokens have non-zero learned weights, not an identity matrix.

*الشرح باللغة العربية:*
تحول دالة Softmax القيم العددية إلى توزيع احتمالي صحيح مجموعه يساوي 1.0 دائماً. لو قمنا بحساب Softmax أولاً ثم قمنا بتصفير مواقع المستقبل ($j > i$)، فإن مجموع الصف سينخفض إلى ما دون الواحد؛ فبالنسبة للرمز الأول في جملة تتكون من 100 كلمة، سينخفض المجموع إلى 0.01 فقط، مما يؤدي إلى اضمحلال شدة الإشارة واختفائها عبر الطبقات العميقة. أما إضافة $-\infty$ داخل الدالة الأسية، فتجعل $e^{-\infty} = 0$، مما يستبعد الرموز المستقبلية تلقائياً من البسط والمقام، ويعيد توزيع كامل الكتلة الاحتمالية بنسبة 100% على الرموز السابقة حصراً، محافظاً على بقاء التنشيطات متزنة وقوية.
