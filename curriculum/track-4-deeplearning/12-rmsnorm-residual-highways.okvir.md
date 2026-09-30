---
id: "rmsnorm-residual-highways"
version: "1.0.0"
title: "Byte-Level Subword Segmentation & Merging Pipeline"
track: "deeplearning"
module: "mod-38"
estimated_minutes: 15
prerequisites: ["layer-normalization-invariance"]
i18n:
  ar: "تجزئة الكلمات الفرعية على مستوى البايت وخط معالجة الدمج"
---

# Byte-Level Subword Segmentation & Merging Pipeline

Once a BPE tokenizer has been trained, it possesses an ordered dictionary of merge rules:

:::simulation-widget{engine="canvas2d" component="BpeTokenizerLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{M} = \left[ (u_1, v_1) \to r_1, \; (u_2, v_2) \to r_2, \; \dots, \; (u_K, v_K) \to r_K \right]
$$

تطبق عملية التجزئة أثناء الاستدلال (BPE Segmentation) قواعد الدمج المتعلمة حتمياً على أي نص وارد بناءً على أولوية الرتبة (Rank Priority). فمن خلال فحص أزواج الرموز المتجاورة وتنفيذ الدمج الصالح صاحب الرتبة الأدنى (الأعلى أولوية تاريخياً)، يجمع المحلل الرموز الذرية تدريجياً وبطريقة طماعة لتشكيل أكبر وحدات فرعية ممكنة مسجلة في القاموس. يثمر هذا التجميع الهرمي تمثيلاً موجزاً للنصوص مع ضمان إعادة بنائها دون أدنى فقدان للمعلومات.

:::python-challenge{id="py-rmsnorm-residual-highways"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def bpe_encode(
    text: str,
    merges: list[tuple[str, str]],
    vocab: dict[str, int]
) -> list[int]: ...
```
:::
