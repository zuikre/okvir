---
id: "relational-algebra-select-filter"
version: "1.0.0"
title: "Data Contracts & Runtime Validation with Pydantic"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["pandas-dataframe"]
i18n:
  ar: "خوارزمية التجميع والتقسيم والدمج (Split-Apply-Combine) وتطبيع البيانات"
---

# Data Contracts & Runtime Validation with Pydantic

## Beat 1: Intuition & Mental Model

How do statistical and database engines calculate complex group metrics without writing bespoke code for every cohort?
They use the foundational **Split-Apply-Combine** architecture formalized by Hadley Wickham.

### The Laundry Sorting Analogy
Imagine you have a giant heap of dirty clothes:
1. **Split**: You sort the clothes into separate laundry baskets: whites, dark colors, and delicate woolens. You partition the big dataset into smaller, independent group subsets.
2. **Apply**: You apply a tailored washing program to each basket independently: hot water with bleach for whites, gentle cold cycle for woolens. Mathematically, you run a transformation, aggregation, or filter on each group.
3. **Combine**: You fold all the clean, dried clothes back together into a single organized wardrobe.

When computing cohort Z-score normalization ($z = \frac{x - \mu_k}{\sigma_k}$), you don't compare a software engineer's salary to an intern's salary; you **Split** by job title, **Apply** local mean and standard deviation standardization, and **Combine** the standardized scores back into the main dataset!

:::simulation-widget{engine="canvas2d" component="GroupBySplitApplyCombineLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

كيف تحسب محركات البيانات الإحصائية مقاييس المجموعات المعقدة دون كتابة كود مخصص لكل فئة؟
تعتمد جميعها على المعمارية القياسية **التقسيم والتطبيق والدمج (Split-Apply-Combine)**.

### تشبيه فرز الغسيل
تخيل أن أمامك كومة ضخمة من الملابس المختلطة:
1. **التقسيم (Split)**: تفرز الملابس في سلال مستقلة: بيضاء، داكنة، وصوفية. أي أنك تقسم جدول البيانات الضخم إلى مجموعات جزئية مستقلة.
2. **التطبيق (Apply)**: تطبق برنامج غسيل مخصص لكل سلة على حدة: ماء ساخن للأبيض، وماء بارد ودوران خفيف للصوف. رياضياً، تطبق دالة إحصائية أو تجميعية على كل مجموعة بمفردها.
3. **الدمج (Combine)**: تجمع الملابس النظيفة والمجففة معاً في خزانة واحدة مرتبة.

عند حساب التقييس المعياري Z-Score ($z = \frac{x - \mu_k}{\sigma_k}$)، لا تقارن راتب مهندس خبير براتب متدرب؛ بل **تقسم** حسب المسمى الوظيفي، و**تطبق** حساب المتوسط والانحراف لكل فئة، ثم **تدمج** القيم المعيارية في الجدول الأصلي!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\mathcal{D} = \bigsqcup_{k \in \mathcal{K}} \mathcal{D}_k, \quad \mu_k = \frac{1}{|\mathcal{D}_k|} \sum_{x \in \mathcal{D}_k} x, \quad \sigma_k = \sqrt{\frac{1}{|\mathcal{D}_k| - 1} \sum_{x \in \mathcal{D}_k} (x - \mu_k)^2} \implies z_i = \frac{x_i - \mu_k}{\sigma_k}
$$

### Mathematical Invariants & Symbol Breakdown

The formal definitions govern the three execution phases:

- **$\mathcal{D}_k = \{ r \in \mathcal{D} \mid g(r) = k \}$**: Partition subset where key projection function $g(r)$ evaluates to cohort label $k$.
- **$\mathcal{K}$**: Set of distinct group keys, ensuring $\mathcal{D}_i \cap \mathcal{D}_j = \emptyset$ for $i \ne j$ (disjoint partitioning).
- **$\mu_k, \sigma_k$**: Local cohort sample mean and Bessel-corrected sample standard deviation ($N-1$ denominator).
- **$z_i$**: Dimensionless standardized score measuring standard deviations from group mean. If $\sigma_k = 0$, $z_i \triangleq 0.0$.
- **Combine Invariant**: Output preserves the exact row count and ordering of the original input dataset.

### الشرح الرياضي وتفصيل الرموز

تحدد المعادلات الرياضية أطوار التنفيذ الثلاثة:
- **$\mathcal{D}_k$**: المجموعة الجزئية التي تحقق دالة المفتاح الفئوي $k$.
- **$\mathcal{K}$**: فضاء المفاتيح الفريدة مع ضمان انفصال المجموعات تماماً وعدم تداخلها.
- **$\mu_k, \sigma_k$**: المتوسط الحسابي والانحراف المعياري المحلي لكل فئة مع تصحيح بيسل ($N-1$).
- **$z_i$**: القيمة المعيارية الخالية من الوحدات، وتعين إلى 0 إذا كان الانحراف صفراً.
- **ثابت الدمج**: يحافظ الجدول الناتج على عدد صفوف وترتيب المدخلات الأصلية تماماً.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-relational-algebra-select-filter"}
---
timeout_ms: 3000
test_cases:
  - input: "groupby_zscore_normalize([{'grp': 'A', 'val': 10.0}, {'grp': 'A', 'val': 20.0}], 'grp', 'val')[0]['val_zscore']"
    expected: "-0.7071"
  - input: "groupby_zscore_normalize([{'grp': 'A', 'val': 10.0}, {'grp': 'A', 'val': 20.0}], 'grp', 'val')[1]['val_zscore']"
    expected: "0.7071"
---
```python
from typing import Any
from collections import defaultdict
import math

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
        List of new dictionaries with f"{target_key}_zscore" attached (rounded to 4 decimals).
    """
    # Step 1: Split - Group target values by group_key using defaultdict(list)
    # Step 2: Apply - Compute mean and sample std (N-1) for each group; if len < 2, std = 0.0
    # Step 3: Combine - Iterate over original records, compute z = (val - mean) / std if std > 0 else 0.0,
    #         and attach f"{target_key}_zscore" rounded to 4 decimals
    raise NotImplementedError("Implement groupby_zscore_normalize")
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
In an e-commerce credit card fraud detection system, an engineer trains a classifier with global transaction amounts. Transactions at a convenience store of $300 are rare and fraudulent, but at luxury boutiques $300 is below the 10th percentile. Why does cohort-level Split-Apply-Combine normalization drastically boost fraud precision?

في نظام رصد الاحتيال المالي، يدرب مهندس نموذجاً باستخدام المبالغ المالية المطلقة. عملية شراء بـ 300 دولار في متجر بقالة تعتبر شاذة واحتيالية جداً، بينما في متجر مجوهرات فاخر تعد عادية جداً. لماذا يؤدي التقييس المعياري بالفئات (Split-Apply-Combine) إلى رفع دقة كشف الاحتيال جذرياً؟

### Transfer Assessment Question
- **(A)** *(Correct)* Global normalization masks anomalies within low-variance merchant categories; group-wise Z-scoring standardizes features against their true conditional distribution $P(\text{Amount} \mid \text{MerchantCategory})$, exposing localized deviations.
  - *Arabic:* التقييس العام يطمس الشذوذ داخل الفئات منخفضة المبالغ؛ بينما يقيس التحويل الفئوي الانحراف عن التوزيع الشرطي الفعلي $P(\text{Amount} \mid \text{MerchantCategory})$ مما يكشف السلوك المشبوه بدقة.
- **(B)** Split-Apply-Combine encrypts customer card numbers to meet PCI-DSS compliance regulations.
  - *Arabic:* تقوم خوارزمية Split-Apply-Combine بتشفير أرقام بطاقات الائتمان لتلبية معايير الأمان المصرفي.
- **(C)** Machine learning gradient descent algorithms fail to converge unless all features sum to exactly 1.0.
  - *Arabic:* تفشل خوارزميات الانحدار التدريجي في التقارب ما لم يكن مجموع الخصائص مساوياً 1.0 بالضبط.
- **(D)** Credit card processors drop any API transaction with a non-zero Z-score automatically.
  - *Arabic:* تقوم بوابات الدفع برفض أي معاملة تحمل قيمة Z-score غير صفرية تلقائياً.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
Conditioning on the merchant cohort separates variance caused by merchant type from variance indicating fraud, preventing expensive items from drowning out subtle anomalies.

*التفسير الهندسي المعمق:*
الشرط الفئوي يفصل التباين الطبيعي لنوع المتجر عن التباين الناتج عن الاحتيال، مانعاً المشتريات الفاخرة من حجب الأنشطة المريبة في المتاجر الصغيرة.
