---
id: "cnn-convolution"
version: "1.0.0"
title: "Scaled Dot-Product Attention & Temperature Entropy Dynamics"
track: "deeplearning"
module: "mod-39"
estimated_minutes: 15
prerequisites: ["numpy-strides-indexing", "adamw-weight-decay-schedules"]
i18n:
  ar: "آلية الانتباه بالضرب النقطي المقاس وديناميكيات إنتروبيا درجة الحرارة"
---

# Scaled Dot-Product Attention & Temperature Entropy Dynamics

In sequence processing, the fundamental challenge is contextual routing: how should a word like "bank" determine whether it refers to a river edge or a financial institution? It must query the other words in the sentence (e.g. "water" vs "money"), measure their relevance, and pull relevant information into its own representation.

Vaswani et al. (2017) formalized this as Scaled Dot-Product Attention using the classic information retrieval metaphor of Queries ($\mathbf{Q}$), Keys ($\mathbf{K}$), and Values ($\mathbf{V}$):
1. Query ($\mathbf{Q}$): What the current token is looking

:::simulation-widget{engine="canvas2d" component="AttentionHeatmapCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
S_{ij} = \sum_{k=1}^{d_k} q_k k_k
$$

توجه آلية "الانتباه بالضرب النقطي المقاس" تدفق المعلومات بين عناصر السلسلة عبر قياس التشابه المستمر. تستجوب متجهات الاستعلام (Queries) متجهات المفاتيح (Keys) عبر الضرب الداخلي لبناء مصفوفة ألفة، ثم تُعاير هذه المصفوفة عبر دالة التوزيع الاحتمالي (Softmax) لتشكيل أوزان ترجيحية تُسقط على متجهات القيم (Values). يعاكس معامل التقسيم $\frac{1}{\sqrt{d_k}}$ التضخم البعدي لتباين الضرب النقطي في الفضاءات عالية الأبعاد، مانعاً تشبع دالة Softmax وتلاشي تدرجاتها العكسية.

:::python-challenge{id="py-cnn-convolution"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def scaled_dot_product_attention(
    Q: np.ndarray,
    K: np.ndarray,
    V: np.ndarray,
    scale: float | None = None
) -> tuple[np.ndarray, np.ndarray]: ...
# Q: (..., S_q, d_k), K: (..., S_k, d_k), V: (..., S_k, d_v)
# Returns: (output: (..., S_q, d_v), weights: (..., S_q, S_k))
```
:::
