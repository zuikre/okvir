---
id: "bpe-tokenization"
version: "1.0.0"
title: "Key-Value Caching (KV Cache) for O(1) Token Generation"
track: "deeplearning"
module: "mod-41"
estimated_minutes: 15
prerequisites: ["hash-tables-dict-internals"]
i18n:
  ar: "التخزين المؤقت للمفاتيح والقيم (KV Cache) لتوليد الرموز بتكلفة زمنية ثابتة"
---

# Key-Value Caching (KV Cache) for O(1) Token Generation

During autoregressive text generation, a language model generates text token by token:

:::simulation-widget{engine="canvas2d" component="SwiGluKVCacheLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Step 1: } x_1 \to x_2, \quad \text{Step 2: } [x_1, x_2] \to x_3, \quad \text{Step 3: } [x_1, x_2, x_3] \to x_4
$$

تلغي تقنية "التخزين المؤقت للمفاتيح والقيم" (KV Cache) التكرار الحسابي الهائل أثناء التوليد التتابعي للنصوص عبر حفظ موترات المفاتيح والقيم السابقة في ذاكرة المعالج الرسومي (GPU VRAM). وبفضل خاصية الحجب السببي التي تمنع الرموز المستقبلية من تعديل التمثيلات التاريخية السابقة، تظل المفاتيح والقيم المحسوبة سالفاً ثابتة تماماً. يتيح تخزينها للنموذج تمرير الرمز الجديد المنفرد فقط عند كل خطوة توليد، مما يحول التعقيد الحسابي لكل رمز من تعقيد تربيعي مفرط إلى بحث خطي مباشر وفائق السرعة.

:::python-challenge{id="py-bpe-tokenization"}
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

def kv_cache_decoder_step(x_t, k_cache, v_cache, W_q, W_k, W_v, W_o):
    """Execute single-step token inference with KV caching."""
    # TODO: 1. Project q_t, k_t, v_t for single token x_t
    # TODO: 2. Concatenate k_t and v_t with k_cache and v_cache along axis=1
    # TODO: 3. Compute attention between single query q_t and full key cache
    # TODO: 4. Project attended context through W_o and return updated state
    pass
```
:::
