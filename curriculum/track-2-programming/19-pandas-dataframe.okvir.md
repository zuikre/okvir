---
id: "pandas-dataframe"
version: "1.0.0"
title: "DataFrame Mental Model: Indexing via `loc` vs `iloc`"
track: "programming"
module: "mod-14"
estimated_minutes: 15
prerequisites: ["numpy-strides-indexing"]
i18n:
  ar: "النموذج الذهني لإطارات البيانات: الفهرسة عبر loc مقابل iloc"
---

# DataFrame Mental Model: Indexing via `loc` vs `iloc`

A spreadsheet or database table looks simple: it has rows and columns. But in software engineering, how do you point to a specific number inside that table?

There are two completely different ways to address something in the real world:
1. By Label (Name): You can identify an apartment resident by looking at the family surname printed on their mailbox: "Deliver this letter to the Roubhi residence."
2. By Physical Position (Integer Offset): You can identify an apartment by counting doors from the hallway elevator: "Deliver this letter to the 3rd door on the left."

In Pandas DataFr

:::simulation-widget{engine="canvas2d" component="DataFrameBlockManagerLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{D} = \langle \mathcal{I}_{\text{row}}, \mathcal{I}_{\text{col}}, \mathbf{T}, \mathbf{M} \rangle
$$

يبدو جدول البيانات بسيطاً للوهلة الأولى: صفوف وأعمدة. ولكن برمجياً، كيف تشير إلى خلية رقمية محددة داخل هذا الجدول؟
هناك طريقتان مختلفتان تماماً للإشارة إلى الأشياء في العالم الحقيقي:
1. بالاسم والتسمية (Label): يمكنك التعرف على شقة سكنية عبر اسم العائلة المكتوب على صندوق البريد: "سلّم هذه الرسالة لعائلة روبحي".
2. بالموقع الفيزيائي والإزاحة (Integer Position): يمكنك التعرف على الشقة عبر عد الأبواب انطلاقاً من المصعد: "سلّم الرسالة للباب الثالث على اليسار".
في إطارات بيانات Pandas، تتجسد هذه الثنائية عبر وسيلتين أساسيتين:
 loc (فهرسة بالأسماء): تبحث عن البيانات باستخدام الأسم

:::python-challenge{id="py-pandas-dataframe"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def align_and_compute_spread(
    series_a: dict[str, float], 
    series_b: dict[str, float], 
    fill_value: float = 0.0
) -> dict[str, float]:
    """
    Aligns two series by label index and computes their difference with fill imputation.

    Args:
        series_a: Mapping of index label to float value.
        series_b: Mapping of index label to float value.
        fill_value: Imputation value for missing keys.

    Returns:
        Dictionary of label -> (a - b) sorted alphabetically by key.
    """
    # TODO: Implement index alignment and spread computation
    raise NotImplementedError("Implement align_and_compute_spread")
```
:::
