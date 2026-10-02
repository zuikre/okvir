---
id: "multi-head-attention-projection"
version: "1.0.0"
title: "Multi-Head Attention (MHA) & Subspace Projections"
track: "deeplearning"
module: "mod-42"
estimated_minutes: 15
prerequisites: ["transformer-attention", "matrix-multiplication-composition"]
i18n:
  ar: "الانتباه متعدد الرؤوس (MHA) وإسقاطات الفضاءات الجزئية"
---

# Multi-Head Attention (MHA) & Subspace Projections

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

Imagine inspecting a complex crime scene with a single flashlight. If you shine the flashlight on the floor to look for muddy footprints, you cannot simultaneously illuminate the ceiling to check for broken skylights or inspect the desk for forged documents. A single spotlight forces an agonizing trade-off: you can only focus on one line of inquiry at any given moment.

In single-head self-attention, the model faces this exact bottleneck. When processing the word *"bank"* in *"The bank approved the mortgage loan yesterday"*, that token needs to track multiple distinct linguistic relationships at once:
1. **Syntactic role:** Who is the subject and verb? (*"bank approved"*).
2. **Semantic category:** What kind of institution is it? (*"mortgage loan"*).
3. **Temporal framing:** When did this happen? (*"yesterday"*).

If a single attention head is forced to average all these disparate concerns into one set of attention weights, the representations blur together into a muddled compromise.

Vaswani et al. solved this elegantly with **Multi-Head Attention (MHA)**: instead of relying on one giant spotlight, MHA splits the model's capacity into $h$ independent, specialized spotlights (for example, $h = 8$ or $h = 32$ heads)!

Rather than performing attention directly in the full model dimension $d_{\text{model}}$, the input embeddings are linearly projected into $h$ distinct, lower-dimensional subspaces of size $d_k = d_{\text{model}} / h$:
* **Head 1** can dedicate its entire attention matrix to tracking syntax and grammatical agreement.
* **Head 2** can specialize in resolving long-distance pronoun references.
* **Head 3** can focus strictly on local bigram neighbors.

Once every head has gathered its unique perspective in parallel, their resulting Value matrices are concatenated together and blended through a final output projection matrix $\mathbf{W}_O$. Because each head operates on a fraction of the dimension ($d_k = d_{\text{model}} / h$), the total computational cost of running $h$ parallel heads is **identical to running a single giant head**—granting multi-faceted representational superpowers for zero additional FLOPs!

> **Frontier Analogy:** Imagine an orchestra conductor who wants to hear every nuance of a symphony. Instead of listening with a single microphone that blends all instruments together into mono sound, the conductor sets up an 8-channel recording console: one mic on the violins, one on the cellos, one on the brass, and one on the percussion. The sound engineer mixes the distinct audio stems back into a rich, spatial master track ($\mathbf{W}_O$).

### Jargon Decoder | قاموس تفكيك المصطلحات

| Term / المصطلح | Plain English Translation & Metaphor | الشرح المبسط بالعربية والتشبيه اليومي |
| :--- | :--- | :--- |
| **Multi-Head Attention (MHA)** (الانتباه متعدد الرؤوس) | A committee of specialized analysts: splits attention across $h$ parallel heads so each head can track a different linguistic relationship. | لجنة من المحللين المتخصصين: تقسم الانتباه إلى عدة مسارات مستقلة ليتتبع كل رأس نمطاً لغوياً أو دلالياً مختلفاً. |
| **Head Dimension ($d_k = d / h$)** (بُعد الرأس المستقل) | The slice width: dividing the total model width (e.g. 4096) among $h=32$ heads gives each head a nimble subspace of $128$ dimensions. | عرض الشريحة التحليلية: تقسيم البعد الإجمالي (مثل 4096) على 32 رأساً يمنح كل رأس فضاءً فرعياً رشيقاً بحجم 128 بعداً. |
| **Subspace Projection** (إسقاط الفضاءات الفرعية) | Specialized lenses: learned weight matrices that project the full representation into dedicated subspaces (syntax, grammar, chronology). | عدسات تخصصية: مصفوفات إسقاط خطية توجه الإشارات نحو فضاءات فرعية تركز على النحو أو الضمائر أو السياق الزمني. |
| **Concatenation ($\text{Concat}$)** (الدمج المتتالي للرؤوس) | Reassembling the committee: gluing the outputs of all $h$ heads side-by-side to restore the original full embedding width. | إعادة جمع تقارير اللجنة: رصف مخرجات كافة الرؤوس جنباً إلى جنب لاستعادة العرض الأصلي للنموذج. |
| **Output Projection ($W_O$)** (مصفوفة الإسقاط التجميعية) | The chief editor: a final linear transformation that blends the diverse perspectives of all heads into a coherent updated representation. | رئيس التحرير: طبقة خطية ختامية تدمج رؤى كافة المحللين في سياق معرفي موحد ومتناغم. |

### Visual Architecture Flow | مخطط تدفق البيانات والمعمارية

```text
MULTI-HEAD ATTENTION ARCHITECTURE:
=============================================================================
Input Tensor: X  [Shape: (Batch B, Sequence S, Model_Dim d)]
      |
      +---> [Linear W_Q] ---> Split into h heads ---> Q_1, Q_2, ..., Q_h  [Shape each: (S, d_k)]
      +---> [Linear W_K] ---> Split into h heads ---> K_1, K_2, ..., K_h  [Shape each: (S, d_k)]
      +---> [Linear W_V] ---> Split into h heads ---> V_1, V_2, ..., V_h  [Shape each: (S, d_v)]
      |
Parallel Attention Computation:
      Head 1 = Attention(Q_1, K_1, V_1)  ---> [Syntactic Subject-Verb Agreement]
      Head 2 = Attention(Q_2, K_2, V_2)  ---> [Coreference: "it" -> "animal"]
      ...
      Head h = Attention(Q_h, K_h, V_h)  ---> [Positional / Temporal Sequence]
      |
Concatenation:
      Merged = Concat(Head 1, Head 2, ..., Head h)  [Shape: (B, S, h * d_v) = (B, S, d)]
      |
Final Linear Projection:
      Output = Merged * W_O                         [Shape: (B, S, d)]
```

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيل محققاً جنائياً يفحص مسرح جريمة معقداً بمصباح يدوي واحد؛ إذا وجه الضوء نحو الأرضية للبحث عن آثار الأقدام، فلن يتمكن في الوقت ذاته من إضاءة السقف لفحص النوافذ المكسورة أو فحص الخزائن بحثاً عن المستندات المسروقة. إن الاعتماد على بقعة ضوء واحدة يفرض تسوية إجبارية قاصرة تحجب الكثير من التفاصيل.

تواجه نماذج الانتباه أحادية الرأس نفس العائق؛ فعند قراءة جملة مثل *"وافق البنك أمس على القرض العقاري"*, تحتاج كلمة "البنك" للتركيز على مسارات دلالية ولغوية متعددة في آن واحد:
1. **الجانب النحوي والتركيبي:** من الفاعل وما هو الفعل المرتبط به؟ ("وافق البنك").
2. **الجانب الدلالي:** ما طبيعة النشاط المالي للمؤسسة؟ ("القرض العقاري").
3. **الجانب الزمني والسياقي:** متى وقع الحدث؟ ("أمس").

لو أُجبر رأس انتباه منفرد على تمثيل كافة هذه العلاقات المتشابكة، لذابت الفروق الدقيقة في متوسط رياضي غير مميز.

ابتكر الباحثون آلية **الانتباه متعدد الرؤوس (Multi-Head Attention - MHA)**: تقسيم طاقة النموذج إلى $h$ عدسات تركيزية متوازية ومستقلة (مثل 8 أو 32 رأساً)!

فبدلاً من حساب الانتباه في الفضاء الكامل للنموذج $d_{\text{model}}$، تُسقط المتجهات عبر مصفوفات تعلم إلى فضاءات جزئية منخفضة الأبعاد ($d_k = d_{\text{model}} / h$):
* يتخصص **الرأس الأول** في التقاط الروابط النحوية وقواعد الإعراب.
* يتخصص **الرأس الثاني** في تتبع الضمائر والأسماء الموصولة البعيدة.
* يتخصص **الرأس الثالث** في رصد المترادفات والأنماط المعنوية.

وبعد أن يستخلص كل رأس رؤيته المستقلة بالتوازي، تُجمع مخرجات الرؤوس معاً جنباً إلى جنب وتُمرر عبر مصفوفة إسقاط نهائية $\mathbf{W}_O$ لصهرها في تمثيل موحد. وبفضل تقسيم الأبعاد ($d_k = d_{\text{model}} / h$)، تكون التكلفة الحسابية الإجمالية لتشغيل $h$ رأساً متطابقة تماماً مع تكلفة تشغيل رأس واحد ضخم!

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

Multi-Head Attention linearly projects Queries, Keys, and Values $h$ times with distinct learned parameter matrices:

$$
\text{MHA}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{Concat}(\text{head}_1, \text{head}_2, \dots, \text{head}_h) \mathbf{W}_O
$$

Where each individual head $i \in \{1, \dots, h\}$ is computed as:

$$
\text{head}_i = \text{Attention}\left(\mathbf{Q}\mathbf{W}_i^Q, \; \mathbf{K}\mathbf{W}_i^K, \; \mathbf{V}\mathbf{W}_i^V\right) = \text{softmax}\left(\frac{(\mathbf{Q}\mathbf{W}_i^Q)(\mathbf{K}\mathbf{W}_i^K)^T}{\sqrt{d_k}}\right) (\mathbf{V}\mathbf{W}_i^V)
$$

### Demystifying the Equation | تفكيك الرموز والمعادلات

| Symbol / الرمز | Mathematical Term / المصطلح الرياضي | Plain English Meaning & Role / المعنى الفيزيائي والدور التطبيقي |
| :--- | :--- | :--- |
| $h$ | Number of Attention Heads / عدد رؤوس الانتباه | Count of parallel subspaces computed simultaneously (e.g. 32 heads). |
| $d_k = d_{\text{model}} / h$ | Subspace Dimension / بُعد الفضاء الفرعي | Dimensionality of queries and keys per head (e.g. $4096 / 32 = 128$). |
| $\mathbf{W}_i^Q, \mathbf{W}_i^K \in \mathbb{R}^{d \times d_k}$ | Per-Head Input Projections / مصفوفات الإسقاط | Parameter matrices projecting full token embeddings into head $i$'s query and key spaces. |
| $\mathbf{W}_i^V \in \mathbb{R}^{d \times d_v}$ | Per-Head Value Projection / مصفوفة إسقاط القيم | Parameter matrix projecting full token embeddings into head $i$'s value space. |
| $\mathbf{W}^O \in \mathbb{R}^{h d_v \times d}$ | Multi-Head Output Projection / مصفوفة الإسقاط النهائي | Parameter matrix synthesizing combined head outputs back into the residual stream. |
| $\text{Concat}(\cdot)$ | Concatenation Operator / مؤثر الربط المتتالي | Horizontal stacking operator assembling head outputs into a unified tensor. |

#### Why the Math Works Step-by-Step | لماذا تعمل هذه الصياغة رياضياً؟
1. **Overcoming Single-Head Averaging**: A single attention head can only produce one probability distribution per word, forcing it to average over conflicting priorities. Multi-head attention allows word $i$ to attend simultaneously to its antecedent pronoun, its governing verb, and its adjectives.
2. **Computational Invariance**: Running $h$ heads with dimension $d/h$ costs exactly the same total floating-point operations ($O(S^2 d)$) as running a single giant head with dimension $d$. You get multi-perspective representations for free!
3. **Linear Subspace Disentanglement**: The projection matrices $W_i^Q, W_i^K$ allow the model to isolate distinct subspaces of the hidden representation, isolating semantic topics from syntactic markers.


### Complexity & Computational Invariance Proof:
For a single giant head with dimension $d_{\text{model}}$, the dot product $(\mathbf{Q}\mathbf{K}^T)$ requires $\mathcal{O}(N^2 \cdot d_{\text{model}})$ operations.
For $h$ heads of dimension $d_k = d_{\text{model}} / h$, each head requires $\mathcal{O}(N^2 \cdot d_k) = \mathcal{O}(N^2 \cdot \frac{d_{\text{model}}}{h})$ operations.
Summing across all $h$ heads:

$$
h \times \mathcal{O}\left(N^2 \cdot \frac{d_{\text{model}}}{h}\right) = \mathcal{O}(N^2 \cdot d_{\text{model}})
$$

The computational complexity and memory footprint remain **strictly invariant to the number of heads $h$**! Multi-Head Attention extracts rich multifaceted relational patterns for the exact same theoretical computational cost.

تثبت هذه المقارنة الرياضية الكفاءة الاستثنائية لآلية الانتباه متعدد الرؤوس: فتجزئة الفضاء الأكبر إلى فضاءات فرعية $d_k = d_{\text{model}} / h$ تحافظ على نفس التكلفة الحسابية $\mathcal{O}(N^2 \cdot d_{\text{model}})$، بينما تمنح النموذج القدرة على تتبع أنماط سياقية شديدة التنوع في ذات اللحظة.

---

## Beat 3: Python Challenge | التحدي البرمجي التفاعلي

Implement `multi_head_attention_forward(X, W_q, W_k, W_v, W_o, num_heads)` executing the complete MHA forward pass:
1. Linearly project inputs $\mathbf{Q} = \mathbf{X} \mathbf{W}_q$, $\mathbf{K} = \mathbf{X} \mathbf{W}_k$, $\mathbf{V} = \mathbf{X} \mathbf{W}_v$.
2. Reshape and transpose to isolate heads: `(B, num_heads, N, d_k)`.
3. Compute scaled dot-product attention per head in parallel.
4. Transpose and concatenate heads back to `(B, N, D)`.
5. Project via output matrix $\mathbf{W}_o$.

:::python-challenge{id="py-multi-head-attention-projection"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.ones((1, 2, 4)); W = np.eye(4); out = multi_head_attention_forward(X, W, W, W, W, num_heads=2); str(out.shape)"
    expected: "(1, 2, 4)"
  - input: "X = np.ones((1, 2, 4)); W = np.eye(4); out = multi_head_attention_forward(X, W, W, W, W, num_heads=2); str(round(float(out[0, 0, 0]), 2))"
    expected: "1.0"
---
```python
import numpy as np

def multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, 
                                W_v: np.ndarray, W_o: np.ndarray, 
                                num_heads: int) -> np.ndarray:
    """
    Compute Multi-Head Attention forward pass: MultiHead(X) = Concat(head_1, ..., head_h) @ W_o.
    
    Parameters
    ----------
    X : np.ndarray of shape (B, N, D)
    W_q, W_k, W_v, W_o : weight matrices of shape (D, D)
    num_heads : int
        Number of attention heads (D must be divisible by num_heads).
        
    Returns
    -------
    np.ndarray of shape (B, N, D)
    """
    # Step 1: Project inputs to Query, Key, and Value spaces
    B, N, D = X.shape
    d_k = D // num_heads
    
    Q = X @ W_q  # (B, N, D)
    K = X @ W_k  # (B, N, D)
    V = X @ W_v  # (B, N, D)

    # Step 2: Reshape and transpose to separate heads: (B, num_heads, N, d_k)
    Q_heads = Q.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)
    K_heads = K.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)
    V_heads = V.reshape(B, N, num_heads, d_k).transpose(0, 2, 1, 3)

    # Step 3: Compute scaled dot-product attention per head
    scale = 1.0 / np.sqrt(d_k)
    scores = np.matmul(Q_heads, K_heads.swapaxes(-1, -2)) * scale
    
    # Numerically stable softmax along last axis
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # Context representations per head: (B, num_heads, N, d_k)
    head_outs = np.matmul(attn_weights, V_heads)

    # Step 4: Concatenate heads back into unified dimension D
    # Transpose to (B, N, num_heads, d_k) then flatten last two dims to D
    concat = head_outs.transpose(0, 2, 1, 3).reshape(B, N, D)

    # Step 5: Final linear projection through W_o
    out = concat @ W_o
    return out
```
:::

---

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

### Transfer Question / سؤال نقل الأثر المعرفي

What is the primary architectural advantage of Multi-Head Attention over a single-head self-attention layer of the exact same total hidden dimension $d_{\text{model}}$?

* [x] It enables the network to jointly attend to information from distinct representation subspaces at different positions simultaneously, preventing diverse semantic relationships (such as syntax, coreference, and sentiment) from averaging out into a single compromise.
* [ ] Multi-Head Attention eliminates the requirement for Positional Encodings entirely.
* [ ] Splitting into heads reduces the total FLOP count of the self-attention operation by a factor of $h^2$.
* [ ] Multi-Head Attention converts quadratic self-attention into strictly linear $\mathcal{O}(N)$ computation.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In single-head attention, a single softmax distribution across the sequence length is computed for each token. If a token needs to attend to its grammatical subject with high probability, it has little remaining probability mass to attend to a distant referent or an adjacent modifier. By splitting $d_{\text{model}}$ into $h$ subspaces of dimension $d_k = d_{\text{model}} / h$, each head possesses its own independent softmax distribution. Head 1 can dedicate 95% of its attention to syntax, Head 2 can focus 90% on long-range coreference, and Head 3 can attend to immediate bigram context. Because $h \times (N^2 \cdot \frac{d_{\text{model}}}{h}) = N^2 \cdot d_{\text{model}}$, this multifaceted expressive power comes at zero additional computational cost compared to a single-head layer.

**Why the distractors are incorrect:**
1. *Eliminates requirement for Positional Encodings...*: False. Scaled dot-product attention within each head is fundamentally permutation-equivariant; without positional encodings (such as RoPE or sinusoidal encodings), MHA cannot distinguish between word orders regardless of head count.
2. *Reduces total FLOP count by $h^2$...*: False. As shown in the algebraic proof, the total FLOP count of MHA is identical to single-head attention ($\mathcal{O}(N^2 d_{\text{model}})$), not reduced by $h^2$.
3. *Converts attention into linear $\mathcal{O}(N)$...*: False. Each head still computes an $N \times N$ matrix product $\mathbf{Q}\mathbf{K}^T$, maintaining quadratic complexity $\mathcal{O}(N^2)$. (Linear attention requires kernelized approximations or state-space models like Mamba).

*الشرح باللغة العربية:*
في آلية الانتباه أحادية الرأس، يمتلك الرمز توزيع Softmax واحداً فقط؛ فإذا خصص 90% من تركيزه للرابط النحوي، فلن يتبقى له سوى 10% لربط المعنى بالضمائر البعيدة. يحل الانتباه متعدد الرؤوس هذه المشكلة بتقسيم المتجه إلى $h$ فضاءات فرعية مستقلة، بحيث يركز الرأس الأول على الإعراب، والثاني على الضمائر، والثالث على السياق المحلي بالتوازي. ونظراً لأن أبعاد كل رأس هي $d_{\text{model}}/h$، فإن التكلفة الحسابية الإجمالية لا تزيد إطلاقاً عن تكلفة تشغيل رأس واحد ضخم، مما يمنح النموذج قدرة تمثيلية استثنائية دون أي هدر حوسبي.
