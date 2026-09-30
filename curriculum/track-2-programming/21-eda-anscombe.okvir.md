---
id: "eda-anscombe"
version: "1.0.0"
title: "The GroupBy Split-Apply-Combine Engine"
track: "programming"
module: "mod-14"
estimated_minutes: 15
prerequisites: ["pandas-split-apply-combine"]
i18n:
  ar: "محرك التجميع والتقسيم (Split-Apply-Combine)"
---

# The GroupBy Split-Apply-Combine Engine

Imagine you have a spreadsheet of 100,000 employees and you need to compute the average salary for every department. 
How would an untrained novice do this? They write a for loop, filter the table 50 times for 50 departments, and calculate each average. This is agonizingly slow.

In data engineering, this operation is performed by the Split-Apply-Combine engine:
1. Split: The master dataset is partitioned into disjoint piles (sub-tables) based on a grouping key (e.g., Department).
2. Apply: A function is executed independently across each separate pile (e.g., calculating mean(

:::simulation-widget{engine="canvas2d" component="TidyDataMorphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{D} = \bigsqcup_{k \in \mathcal{K}} \mathcal{D}_k \quad \text{where} \quad \mathcal{D}_k = \{ r \in \mathcal{D} \mid g(r) = k \}
$$

تخيل أن لديك جدولاً يحتوي على 100,000 موظف، وطُلب منك حساب متوسط الرواتب لكل قسم على حدة.
كيف يفعل ذلك المبتدئ؟ يكتب حلقة تكرارية، ويقوم بتصفية الجدول 50 مرة لـ 50 قسماً، ويحسب المتوسط في كل مرة. هذا بطيء جداً وغير عملي.
في هندسة البيانات، تُنجز هذه المهمة عبر محرك التقسيم والتشغيل والدمج (Split-Apply-Combine):
1. التقسيم (Split): تفكيك الجدول الشامل إلى حزم مستقلة بناءً على مفتاح تجميع (مثلاً القسم).
2. التشغيل (Apply): تطبيق دالة رياضية بشكل مستقل عبر كل حزمة (مثلاً حساب متوسط(الراتب)). هذه الخطوة قابلة للتوازي التام عبر عدة أنوية معالج.
3. الدمج (Combine): إعادة تجميع وت

:::python-challenge{id="py-eda-anscombe"}
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

def melt_wide_to_tidy(
    records: list[dict[str, Any]], 
    id_vars: list[str], 
    value_vars: list[str], 
    var_name: str = "variable", 
    value_name: str = "value"
) -> list[dict[str, Any]]:
    """
    Unpivots a wide table into tidy format where columns become rows.

    Args:
        records: List of dictionaries representing wide rows.
        id_vars: Column names to retain as identifier variables.
        value_vars: Column names to unpivot into variable/value pairs.
        var_name: Name of the target variable column.
        value_name: Name of the target value column.

    Returns:
        List of tidy records.
    """
    # TODO: Implement wide-to-tidy unpivoting
    raise NotImplementedError("Implement melt_wide_to_tidy")
```
:::
