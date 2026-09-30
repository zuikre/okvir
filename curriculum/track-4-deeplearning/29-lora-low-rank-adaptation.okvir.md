---
id: "lora-low-rank-adaptation"
version: "1.0.0"
title: "Mamba Selective Scan Architecture & Associative Prefix Operators"
track: "deeplearning"
module: "mod-45"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer", "singular-value-decomposition"]
i18n:
  ar: "بنية مامبا للمسح الانتقائي (Mamba) وعوامل البادئة التجميعية"
---

# Mamba Selective Scan Architecture & Associative Prefix Operators

While Linear Time-Invariant (LTI) State Space Models (like S4) achieved sub-quadratic sequence modeling, they suffered from a fatal weakness compared to Transformers: they could not perform content-based reasoning.
Because their transition matrices $\mathbf{A}, \mathbf{B}, \mathbf{C}$ were static constants independent of input tokens, an LTI model processed irrelevant filler words with the exact same weight as critical keywords. Transformers outperformed them because self-attention dynamically decides which tokens to focus on based on the incoming query.

In 2023, Albert Gu and Tri Dao int

:::simulation-widget{engine="canvas2d" component="MambaScanVisualizer"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{B}_t = \text{Linear}_B(x_t), \quad \mathbf{C}_t = \text{Linear}_C(x_t), \quad \Delta_t = \text{softplus}(\text{Linear}_\Delta(x_t))
$$

ترتقي بنية "مامبا للمسح الانتقائي" (Mamba) بنماذج فضاء الحالة عبر إدخال معاملات انتقاء تعتمد ديناميكياً على المدخلات اللحظية $(\mathbf{B}_t, \mathbf{C}_t, \Delta_t)$. تُمكّن هذه البوابات المعتمدة على البيانات النموذج من ترشيح المعلومات الهامشية وضغط السياقات الجوهرية داخل حالة كامنة محدودة الحجم. ورغم أن خاصية الانتقاء المدفوعة بالبيانات تعطل التكافؤ الالتفافي الكلاسيكي، فإن مامبا تنفذ التدريب المتوازي في زمن لوغاريتمي $O(\log L)$ عبر صياغة معادلات التكرار كمؤثر بادئة تجميعي (Associative Prefix Operator) يُنفذ عبر كيرنل مسح متوازٍ مدمج داخل ذاكرة SRAM للمعالج الرسومي.

:::python-challenge{id="py-lora-low-rank-adaptation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def selective_scan(
    A_bar: np.ndarray,
    B_bar_x: np.ndarray,
    C: np.ndarray
) -> np.ndarray: ...
```
:::
