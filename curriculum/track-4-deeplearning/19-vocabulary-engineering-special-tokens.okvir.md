---
id: "vocabulary-engineering-special-tokens"
version: "1.0.0"
title: "Grouped-Query Attention (GQA) & Multi-Query Memory Footprint"
track: "deeplearning"
module: "mod-41"
estimated_minutes: 15
prerequisites: ["bpe-tokenization"]
i18n:
  ar: "الانتباه باستعلامات مجمعة (GQA) وبصمة ذاكرة الاستعلامات المتعددة"
---

# Grouped-Query Attention (GQA) & Multi-Query Memory Footprint

In modern Large Language Models, the primary bottleneck during autoregressive decoding is not raw arithmetic compute (FLOPs)—it is memory bandwidth. During inference, at each token step, the GPU must stream gigabytes of historical KV cache tensors from High Bandwidth Memory (HBM) into on-chip registers just to multiply them by a tiny single-token query vector. The GPU's compute cores spend over 80% of their clock cycles idle, stalled waiting for memory transfers.

Consider the spectrum of attention head topologies:
1. Multi-Head Attention (MHA): Has $H$ query heads, $H$ key heads, and

:::simulation-widget{engine="canvas2d" component="GqaMemoryBandwidthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Query Heads: } H_q, \quad \text{KV Heads: } H_{kv} = G, \quad \text{Group Ratio: } R = \frac{H_q}{H_{kv}} = \frac{H_q}{G} \in \mathbb{Z}^+
$$

تمثل آلية "الانتباه باستعلامات مجمعة" (GQA) حلاً وسطاً مثالياً بين الانتباه متعدد الرؤوس (MHA) والانتباه متعدد الاستعلامات (MQA) لكسر عنق زجاجة نطاق الذاكرة أثناء التوليد التتابعي. فعبر تقسيم رؤوس الاستعلام $H_q$ إلى $G$ مجموعات تشترك كل منها في زوج واحد من رؤوس المفاتيح والقيم ($H_{kv} = G$)، تقلص GQA الحجم الفعلي لمخزن KV المؤقت بمعامل مقداره $H_q / G$. وأثناء الحساب، يتم توسيع موترات المفاتيح والقيم المشتركة عبر البث المتكرر عبر مجموعات الاستعلام، مما يحفظ جودة التمثيل اللغوي مع خفض استهلاك نطاق الذاكرة بشكل جذري.

:::python-challenge{id="py-vocabulary-engineering-special-tokens"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def repeat_kv(x: np.ndarray, n_rep: int) -> np.ndarray: ...
# x: (B, n_kv, S, d_k)
# n_rep: number of times each head is repeated (G = n_q / n_kv)
# Returns: (B, n_kv * n_rep, S, d_k)
```
:::
