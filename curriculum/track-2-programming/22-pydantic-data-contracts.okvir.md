---
id: "pydantic-data-contracts"
version: "1.0.0"
title: "Data Contracts & Runtime Validation with Pydantic"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["pandas-loc-iloc-indexing"]
i18n:
  ar: "خوارزمية التجميع والتقسيم والدمج (Split-Apply-Combine) وتطبيع البيانات"
---

# Data Contracts & Runtime Validation with Pydantic

## Beat 1: Intuition & Mental Model

How do large-scale analytics platforms and statistical machine learning pipelines calculate group-specific metrics without writing bespoke, fragile loops for every cohort?
They rely on the universal data engineering pattern known as **Split-Apply-Combine**, formalized by statistician Hadley Wickham.

### The Laundry Sorting Analogy: Bins, Cycles & Folding
To build an intuitive physical mental model of this architecture, imagine washing a giant, disordered mountain of dirty clothes:
1. **Split (Partitioning into Bins)**: You do not toss every garment into a single scalding wash. You sort the pile into separate laundry hampers based on fabric properties: whites, dark colors, and delicate woolens. In data engineering, this partitions a massive relation into disjoint, independent sub-tables grouped by key attributes (e.g., job titles, merchant categories, or country codes).
2. **Apply (Specialized Group Transformations)**: You run a customized washing cycle on each hamper independently: hot water with bleach for whites, cold water for darks, and a gentle hand-wash cycle for woolens. Mathematically, you execute an aggregation (e.g., mean, sum), a transformation (e.g., cohort Z-score standardization), or a filter on each isolated partition.
3. **Combine (Unified Reintegration)**: Once clean and dried, you fold all garments back together into a single, organized closet. The output preserves the original dataset's row identity while enriching every record with localized group statistics!

When performing cohort feature engineering—such as calculating employee salary Z-scores ($z = \frac{x - \mu_k}{\sigma_k}$)—you must never compare an executive's compensation directly against an entry-level intern. You **Split** by departmental title, **Apply** local mean and standard deviation scaling, and **Combine** the normalized features back into a unified model-ready dataset!

:::simulation-widget{engine="canvas2d" component="GroupBySplitApplyCombineLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

كيف تقوم منصات تحليل البيانات الكبرى ونظم التعلم الآلي بحساب المقاييس الإحصائية الخاصة بالفئات دون كتابة حلقات تكرارية معقدة وهشة لكل مجموعة؟
تعتمد جميعها على النمط المعماري القياسي في هندسة البيانات المعروف باسم **التقسيم والتطبيق والدمج (Split-Apply-Combine)**.

### تشبيه فرز الغسيل: السلال، البرامج، وإعادة الجمع
لبناء نموذج ذهني فيزيائي لهذه المعمارية، تخيل أن أمامك كوماً ضخماً ومختلطاً من الملابس المتسخة:
1. **التقسيم (Split - الفرز في السلال)**: لن تضع جميع الأقمشة معاً في غسلة واحدة بدرجة غليان؛ بل تفرز الملابس في سلال مستقلة بحسب خصائصها: ملابس بيضاء، ملابس داكنة، وملابس صوفية حساسة. في هندسة البيانات، يعادل هذا تجزئة جدول البيانات الضخم إلى مجموعات فرعية مستقلة ومفصولة بحسب مفتاح تصنيفي محدد (مثل المسمى الوظيفي، أو فئة المتجر، أو الدولة).
2. **التطبيق (Apply - المعالجة المخصصة)**: تطبق برنامج غسيل مخصص لكل سلة على حدة: ماء ساخن مع مبيض للأبيض، وماء بارد للألوان الداكنة، وغسيل يدوي رقيق للصوف. رياضياً، تنفذ دالة تجميعية (كالمتوسط أو المجموع)، أو تحويلاً إحصائياً (كالتقييس المعياري Z-score)، أو تصفية على كل فئة بمفردها.
3. **الدمج (Combine - خزانة الملابس المنظمة)**: بعد جفاف الملابس، تطويها وتجمعها معاً في خزانة واحدة مرتبة. يحافظ هذا الجدول الناتج على هوية صفوف الجدول الأصلي مع تزويد كل صف بالإحصائيات المحلية لفئته!

عند بناء الخصائص الرياضية للنماذج—مثل حساب القيمة المعيارية Z-Score لرواتب الموظفين ($z = \frac{x - \mu_k}{\sigma_k}$)—لا يصح إحصائياً مقارنة راتب مدير تنفيذي براتب متدرب جديد. بل يجب **التقسيم** حسب المنصب الوظيفي، و**تطبيق** حساب المتوسط والانحراف المعياري المحلي، ثم **دمج** النتائج المعيارية في مصفوفة بيانات موحدة وجاهزة للتدريب!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\mathcal{D} = \bigsqcup_{k \in \mathcal{K}} \mathcal{D}_k, \quad \mu_k = \frac{1}{|\mathcal{D}_k|} \sum_{x \in \mathcal{D}_k} x, \quad \sigma_k = \sqrt{\frac{1}{|\mathcal{D}_k| - 1} \sum_{x \in \mathcal{D}_k} (x - \mu_k)^2} \implies z_i = \frac{x_i - \mu_k}{\sigma_k}
$$

### Mathematical Invariants & Symbol Breakdown

| الرمز / Symbol | المجال والتعريف الرياضي / Mathematical Domain | الدور الهندسي والمعماري / Data Engineering & Architectural Role | الشرح الدقيق بالعربية / Arabic Explanation |
| :--- | :--- | :--- | :--- |
| $\mathcal{D}$ | Relation domain $\mathcal{T}^N$ | Full input dataset relation containing $N$ records | جدول البيانات الكامل الذي يضم $N$ من السجلات |
| $\mathcal{K}$ | $\{ g(r) \mid r \in \mathcal{D} \}$ | Set of distinct partition keys emitted by grouping function $g$ | فضاء المفاتيح الفريدة الناتجة عن دالة التجميع |
| $\bigsqcup$ | Disjoint union operator | Guarantees non-overlapping partitions: $\mathcal{D}_i \cap \mathcal{D}_j = \emptyset, \forall i \ne j$ | مشغل الاتحاد المنفصل الذي يضمن عدم تداخل المجموعات |
| $\mathcal{D}_k$ | $\{ r \in \mathcal{D} \mid g(r) = k \}$ | Independent subgroup slice associated with cohort key $k$ | شريحة المجموعة الفرعية المستقلة المرتبطة بالمفتاح $k$ |
| $\mu_k$ | $\mathbb{R}$ | Conditional group expectation $\mathbb{E}[X \mid g(r) = k]$ | المتوسط الحسابي الشرطي لبيانات المجموعة $k$ |
| $\sigma_k$ | $\mathbb{R}_{\ge 0}$ | Bessel-corrected sample standard deviation ($N_k - 1$ denominator) | الانحراف المعياري لبيانات العينة مع تصحيح بيسل |
| $z_i$ | Standardized scalar ($z \in \mathbb{R}$) | Dimensionless standard score relative to cohort distribution | القيمة المعيارية الخالية من الوحدات الدالة على بعد القيمة عن المتوسط |

The partition invariant guarantees that the original relation is decomposed into mutually exclusive and collectively exhaustive subsets: $\bigcup_{k \in \mathcal{K}} \mathcal{D}_k = \mathcal{D}$ and $\mathcal{D}_i \cap \mathcal{D}_j = \emptyset$ for $i \ne j$. When applying local transformations, if a cohort has $|\mathcal{D}_k| < 2$ or zero variance ($\sigma_k = 0$), the transformation defaults to the invariant sentinel $z_i \triangleq 0.0$ to prevent numerical division-by-zero exceptions.

يضمن ثابت التجزئة الرياضي تفكيك الجدول الأصلي إلى مجموعات منفصلة تماماً وشاملة كلياً: $\bigcup_{k \in \mathcal{K}} \mathcal{D}_k = \mathcal{D}$ مع $\mathcal{D}_i \cap \mathcal{D}_j = \emptyset$ عند اختلاف $i$ و $j$. وعند تطبيق التحويلات المحلية، إذا كانت المجموعة تضم أقل من عنصرين أو كان تباينها صفراً ($\sigma_k = 0$)، يُعين الناتج تلقائياً إلى القيمة الثابتة $z_i \triangleq 0.0$ لمنع أخطاء القسمة على الصفر في المعالج.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-pydantic-data-contracts"}
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
In an e-commerce credit card fraud detection engine, a machine learning engineer trains a gradient-boosted tree using raw dollar transaction amounts. A $350 purchase at a neighborhood gas station or coffee shop is an extreme outlier and almost certainly fraudulent. However, at a luxury jewelry boutique or high-end electronics store, a $350 purchase is below the 10th percentile. When trained on raw global transaction values, the model misses localized fraud in small retail shops while throwing false alarms on ordinary department store purchases. Why does group-wise Split-Apply-Combine normalization resolve this fatal modeling blindspot?

في نظام آلي لكشف الاحتيال في البطاقات الائتمانية لموقع تجارة إلكترونية، قام مهندس بتدريب نموذج ذكاء اصطناعي باستخدام القيمة المطلقة للمبالغ المالية للمعاملات. تعتبر عملية شراء بمبلغ 350 دولاراً في مقهى أو محطة وقود صغيرة عملية شاذة للغاية وتكاد تكون احتيالية بنسبة 99%. لكن في متجر مجوهرات فاخر أو متجر إلكترونيات كبرى، يُعد مبلغ 350 دولاراً أقل من المئوية العاشرة للمشتريات العادية. وعند تدريب النموذج على المبالغ العامة، عجز عن اكتشاف الاحتيال في المتاجر الصغيرة بينما أطلق إنذارات كاذبة لا حصر لها للمتاجر الكبيرة. كيف تحل خوارزمية Split-Apply-Combine الفئوية هذه النقطة العمياء القاتلة؟

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
- **Why Option (A) is correct:** A transaction amount $X$ cannot be meaningfully evaluated without conditioning on the context: $P(X \mid \text{Category})$. By splitting the data into merchant cohorts, computing the localized parameters $(\mu_k, \sigma_k)$, and standardizing each transaction into $z = \frac{x - \mu_k}{\sigma_k}$, a $350 gas station transaction receives $z = +5.2$ (an extreme red flag), while a $350 jewelry purchase receives $z = -0.8$ (completely routine). The classifier now learns from scale-invariant statistical surprise rather than raw, biased dollars.
- **Why Option (B) is incorrect:** Split-Apply-Combine is a mathematical data transformation methodology; encryption is handled by cryptographic ciphers (e.g., AES-GCM).
- **Why Option (C) is incorrect:** Gradient descent requires normalized feature scales to prevent zigzagging, but features do not need to sum to 1.0 (which is a property of probability simplexes).
- **Why Option (D) is incorrect:** A Z-score of zero indicates an exact average; positive and negative Z-scores are completely normal and expected.

*التفسير الهندسي المعمق وتحليل الخيارات:*
- **لماذا الخيار (A) صحيح:** لا يمكن تقييم المبلغ المالي $X$ إحصائياً دون ربطه بالسياق الشرطي لنوع المتجر: $P(X \mid \text{Category})$. فعند تقسيم البيانات إلى فئات تجارية وحساب المعلمات المحلية $(\mu_k, \sigma_k)$ وتطبيع كل معاملة إلى $z = \frac{x - \mu_k}{\sigma_k}$، تحصل معاملة محطة الوقود بقيمة 350 دولاراً على $z = +5.2$ (مؤشر احتيال أحمر وشديد الشذوذ)، بينما تحصل معاملة متجر المجوهرات بقيمة 350 دولاراً على $z = -0.8$ (سلوك طبيعي تماماً). وبذلك يتعلم النموذج من درجة "المفاجأة الإحصائية" المستقلة عن المقاييس بدلاً من الانخداع بالأرقام المجردة.
- **لماذا الخيار (B) خاطئ:** خوارزمية التقسيم والتطبيق والدمج هي منهجية لمعالجة وهندسة البيانات الإحصائية وليست خوارزمية تشفير مصرفي.
- **لماذا الخيار (C) خاطئ:** خوارزميات التعلم الآلي تتطلب توحيد نطاقات الخصائص لتسريع التقارب، لكنها لا تشترط أبداً أن يكون مجموع الخصائص 1.0.
- **لماذا الخيار (D) خاطئ:** حصول المعاملة على Z-score بقيمة صفر يعني أنها مطابقة للمتوسط تماماً، والقيم الموجبة والسالبة متوقعة وطبيعية في كل توزيع إحصائي.
