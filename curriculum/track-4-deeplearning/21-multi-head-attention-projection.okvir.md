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

## Beat 1: Tactile Intuition
A single spotlight can only illuminate one spot at a time. If a word's attention is busy tracking grammar (e.g., subject-verb agreement), it cannot simultaneously track distant pronoun references or semantic sentiment using a single set of attention weights. Multi-Head Attention (MHA) splits the spotlight into multiple specialized lenses (e.g. h = 8 heads)! Instead of computing one giant attention map in full dimension d_model, the representations are linearly projected into h distinct subspaces of size d_k = d_model / h. Head 1 tracks syntax, Head 2 tracks pronoun coreference, and Head 3 tracks local neighbors. Finally, all heads concatenate their perspectives and pass through an integration projection W_O, merging multiple views with zero added FLOPs.

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

لا يستطيع مصباح ضوئي واحد التركيز على عدة زوايا في آن واحد. إذا ركز رأس انتباه وحيد على العلاقة النحوية بين المبتدأ والخبر، سيعجز عن تتبع الضمائر العائدة أو المعاني البلاغية. تحل آلية 'الانتباه متعدد الرؤوس' (Multi-Head Attention) هذه المعضلة بتقسيم شعاع الانتباه إلى عدة رؤوس متوازية ومستقلة (h رؤوس)، حيث يُسقط كل رأس المتجهات في فضاء تمثيلي جزئي منخفض الأبعاد (d_k = d_model / h). يتخصص كل رأس في التقاط نمط لغوي محدد، ثم تُدمج نتائج كافة الرؤوس وتُسقط عبر مصفوفة إخراج رئيسية W_O لصهر الرؤى دون زيادة التكلفة الحسابية.

## Beat 2: Formal Mathematical Anchor
$$
\text{MHA}(\mathbf{X}) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\mathbf{W}_O, \quad \text{head}_i = \text{Attention}(\mathbf{X}\mathbf{W}_i^Q, \mathbf{X}\mathbf{W}_i^K, \mathbf{X}\mathbf{W}_i^V)
$$

Multi-Head Attention linearly projects Queries, Keys, and Values h times with independent learned weight matrices W_i^Q, W_i^K in R^{d_model x d_k} and W_i^V in R^{d_model x d_v}. On each of these projected versions, attention is performed in parallel. By setting d_k = d_v = d_model / h, the total computational complexity remains O(N² · d_model), exactly matching single-head attention, while dramatically enhancing the model's capacity to represent multi-faceted relational structures.

تسقط آلية الانتباه متعدد الرؤوس الاستعلامات والمفاتيح والقيم h مرات عبر مصفوفات أوزان مستقلة W_i^Q و W_i^K في فضاء جزئي d_k = d_model / h. يُحسب الانتباه بالتوازي عبر كافة الفضاءات الفرعية، وتُدمج المخرجات لتُضرب في مصفوفة الإسقاط W_O. وبفضل اختيار d_k = d_model / h، تظل التكلفة الحسابية الكلية متطابقة تماماً مع رأس انتباه منفرد O(N² · d_model)، مع مضاعفة القدرة التعبيرية.

## Beat 3: Python Challenge
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

def multi_head_attention_forward(X: np.ndarray, W_q: np.ndarray, W_k: np.ndarray, W_v: np.ndarray, W_o: np.ndarray, num_heads: int) -> np.ndarray:
    """
    Compute Multi-Head Attention forward pass: MultiHead(X) = Concat(head_1, ..., head_h) @ W_o.
    """
    # Step 1: Project Q, K, V via linear weight matrices
    # B, S, D = X.shape
    # d_k = D // num_heads
    # Step 2: Reshape and transpose to separate heads: (B, num_heads, S, d_k)
    # TODO: Q_heads = (X @ W_q).reshape(B, S, num_heads, d_k).transpose(0, 2, 1, 3)
    # TODO: K_heads and V_heads similarly
    # Step 3: Compute attention per head, concatenate, and project via W_o
    pass
```
:::

## Beat 4: Reality Transfer Challenge
What is the primary advantage of Multi-Head Attention over single-head self-attention of the same total hidden dimension?

* [x] It allows the model to jointly attend to information from different representation subspaces at different positions simultaneously without increasing total FLOPs.
* [ ] Multi-Head Attention eliminates the need for Positional Encodings.
