---
id: "pandas-split-apply-combine"
version: "1.0.0"
title: "Tidy Data Architecture & Normalization Geometry"
track: "programming"
module: "mod-14"
estimated_minutes: 15
prerequisites: ["pandas-dataframe"]
i18n:
  ar: "معمارية البيانات المرتبة (Tidy Data) وهندسة تسوية الجداول"
---

# Tidy Data Architecture & Normalization Geometry

Why do data scientists spend 80% of their time "cleaning" data? Because humans and computers like looking at tables in completely opposite ways.

Humans love Wide Tables. A human likes seeing a medical spreadsheet where the columns are: [PatientName, Monday_BP, Tuesday_BP, Wednesday_BP]. It is easy for a human eye to scan across days.
Computers and machine learning algorithms despise wide tables. Why? Because Monday_BP and Tuesday_BP are not two different variables; they are two different values of the exact same variable: Day of Week!

To solve this chaos, statistician Hadley

:::simulation-widget{engine="canvas2d" component="LocIlocCaliperLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{R}_{\text{wide}} \subseteq \mathcal{I}_1 \times \dots \times \mathcal{I}_K \times \mathcal{Y}_1 \times \dots \times \mathcal{Y}_T
$$

لماذا يقضي علماء البيانات 80% من وقتهم في "تنظيف" البيانات وتجهيزها؟ لأن البشر والحواسيب يفضلون قراءة الجداول بطريقتين متناقضتين تماماً!
يعشق البشر الجداول العريضة (Wide Tables). يفضل الطبيب مثلاً قراءة جدول أعمدته: [اسم_المريض، ضغط_الإثنين، ضغط_الثلاثاء، ضغط_الأربعاء]. فهذا يسهل على العين البشرية تتبع التغيرات أفقياً.
أما الخوارزميات ونماذج تعلم الآلة فتكره الجداول العريضة! لماذا؟ لأن ضغط_الإثنين و ضغط_الثلاثاء ليسا متغيرين مستقلين؛ بل هما قيمتان مختلفتان لمتغير واحد هو: يوم الفحص!
لإنهاء هذه الفوضى، وضع عالم الإحصاء هادلي ويكهام القواعد الثلاث لـ البيانات المرتبة (Tidy Data

:::python-challenge{id="py-pandas-split-apply-combine"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def slice_tabular_index(
    index: list[str], 
    start_token: str | int, 
    stop_token: str | int, 
    mode: str
) -> list[str]:
    """
    Implements loc (closed label-based) vs iloc (half-open integer-based) slicing.

    Args:
        index: List of unique string row labels.
        start_token: Label string for loc, integer index for iloc.
        stop_token: Label string for loc, integer index for iloc.
        mode: "loc" or "iloc".

    Returns:
        Sub-list of labels matching the indexing semantics.
    """
    # TODO: Implement dual-mode indexing semantics
    raise NotImplementedError("Implement slice_tabular_index")
```
:::
