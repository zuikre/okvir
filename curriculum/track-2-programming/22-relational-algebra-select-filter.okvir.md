---
id: "relational-algebra-select-filter"
version: "1.0.0"
title: "Data Contracts & Runtime Validation with Pydantic"
track: "programming"
module: "mod-15"
estimated_minutes: 15
prerequisites: ["pandas-dataframe"]
i18n:
  ar: "عقود البيانات (Data Contracts) والتحقق أثناء التشغيل باستخدام Pydantic"
---

# Data Contracts & Runtime Validation with Pydantic

When you build a bridge out of steel, you don't just guess that the steel is strong. The steel mill signs an engineering contract certifying that the beam can support 50,000 pounds of pressure.

In data engineering, dirty data is toxic waste. If an external API sends you a price of "-450" (a negative string) instead of a positive decimal number, and your database blindly saves it, your downstream machine learning models will produce catastrophic garbage.

Python includes type annotations (like age: int), but Python's type hints are purely cosmetic decorative comments during execution!

:::simulation-widget{engine="canvas2d" component="GroupBySplitApplyCombineLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{C}: \mathcal{X}_{\text{raw}} \to \mathcal{T}_{\text{valid}} \cup \{\bot_{\text{ValidationError}}\}
$$

عندما تبني جسراً من الفولاذ، لا تخمن قوة المعدن تخميناً؛ بل يوقع المصنع عقداً هندسياً معتمداً يضمن أن كل عمود يتحمل 50,000 رطل من الضغط.
في هندسة البيانات، البيانات الفاسدة هي بمثابة نفايات كيميائية خطيرة. إذا أرسلت لك خدمة خارجية سعراً بقيمة "-450" (نص سالب) بدلاً من رقم موجب، وحفظته قاعدة بياناتك بصمت، فإن جميع نماذج الذكاء الاصطناعي اللاحقة ستعطي قرارات كارثية خاطئة.
تمتلك بايثون تلميحات للأنواع (مثل age: int)، ولكن تلميحات بايثون هي مجرد تعليقات جمالية يتجاهلها المعالج تماماً أثناء التشغيل الفعلي! يمكن لبايثون بكل بساطة تخزين نص فاسد داخل متغير مخصص للأرقام دون أي اعتراض.
لفرض حدود

:::python-challenge{id="py-relational-algebra-select-filter"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Any

def groupby_zscore_normalize(
    records: list[dict[str, Any]], 
    group_key: str, 
    target_key: str
) -> list[dict[str, Any]]:
    """
    Computes group-wise Z-score normalization using Split-Apply-Combine.

    Args:
        records: List of record dictionaries.
        group_key: Column name used to split data into cohorts.
        target_key: Numeric column to standardize.

    Returns:
        List of new dictionaries with f"{target_key}_zscore" attached.
    """
    # TODO: Implement Split-Apply-Combine Z-score normalization
    raise NotImplementedError("Implement groupby_zscore_normalize")
```
:::
