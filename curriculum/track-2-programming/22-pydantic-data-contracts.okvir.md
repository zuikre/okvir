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

### Jargon Decoder / قاموس المصطلحات المعمارية

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Split-Apply-Combine** / التقسيم والتطبيق والدمج | Partitioning data into subsets, executing operations per group, and reuniting results. Analogy: Sorting laundry by colors, running appropriate wash cycles, and folding them into one closet. | تجزئة البيانات لفئات مستقلة، وتنفيذ عمليات مخصصة لكل فئة، ثم دمج النتائج. التشبيه: فرز الملابس في سلال حسب اللون، وغسل كل سلة ببرنامجها، ثم جمعها في خزانة واحدة. |
| **Disjoint Partition ($\bigsqcup \mathcal{D}_k$)** / المجموعات المنفصلة | Splitting records such that no single row appears in more than one subgroup. Analogy: A student belongs to exactly one graduating homeroom class. | تقسيم السجلات بحيث لا يظهر أي سجل في أكثر من مجموعة فرعية واحدة في نفس الوقت. التشبيه: انتماء الطالب لصف دراسي واحد محدد دون تكرار. |
| **Cohort Z-Score Normalization** / التقييس المعياري الفئوي | Measuring how many standard deviations a value is away from its specific group mean ($z = \frac{x - \mu_k}{\sigma_k}$). Analogy: Grading a student on a curve within their own honors class. | قياس بعد القيمة عن متوسط فئتها بالانحرافات المعيارية. التشبيه: تقييم درجة طالب مقارنة بزملائه في نفس الفصل المتقدم بدلاً من عموم المدرسة. |
| **Bessel's Correction ($N - 1$)** / تصحيح بيسل للعينات | Dividing by $N-1$ instead of $N$ when calculating sample variance to eliminate negative bias. Analogy: Leaving an extra margin of safety when estimating bridge weight capacity. | القسمة على $N-1$ بدلاً من $N$ لحساب تباين العينة بدقة والتخلص من الانحياز الإحصائي. التشبيه: ترك هامش أمان إضافي عند تقدير حمولة جسر مروري. |
| **Scale-Invariant Statistical Surprise** / المفاجأة الإحصائية المستقلة عن المقياس | Identifying anomalies by relative probabilistic unlikelihood rather than raw magnitude. Analogy: An ant carrying a grape is far more surprising than an elephant carrying a log. | كشف الشذوذ وفقاً للاستبعاد الإحصائي النسبي وليس الحجم المطلق. التشبيه: نملة تحمل حبة عنب تثير الدهشة أكثر من فيل يحمل جذع شجرة ضخم. |
| **Zero-Variance Sentinel ($z \triangleq 0$)** / القيمة المعيارية الآمنة لعدم التباين | Defaulting Z-score to 0.0 when a group has only 1 sample or identical values, avoiding division by zero. Analogy: Declaring everyone average in a competition where everyone scored identically. | إسناد القيمة صفر عندما تضم المجموعة عنصراً واحداً أو قيماً متطابقة لتفادي القسمة على صفر. التشبيه: منح الجميع تقييم "متوسط" في مسابقة تطابقت فيها كافة النتائج. |

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

```text
Visual ASCII Transformation: Group-Wise Split-Apply-Combine Workflow:

Raw Input Transactions:
  Record 0: { 'grp': 'GasStation', 'val': 350.0 }
  Record 1: { 'grp': 'GasStation', 'val':  40.0 }
  Record 2: { 'grp': 'Jewelry',    'val': 350.0 }
  Record 3: { 'grp': 'Jewelry',    'val': 950.0 }

Step 1: SPLIT into Disjoint Partitions by group_key:
  Bin 'GasStation' -> [ 350.0, 40.0 ]
  Bin 'Jewelry'    -> [ 350.0, 950.0 ]

Step 2: APPLY Local Statistics & Standard Deviation (Bessel Corrected):
  Bin 'GasStation':
    mean = (350.0 + 40.0) / 2 = 195.0
    diffs = [ (350 - 195)^2, (40 - 195)^2 ] = [ 24025, 24025 ]
    std = sqrt(48050 / (2 - 1)) = sqrt(48050) = 219.2031
  Bin 'Jewelry':
    mean = (350.0 + 950.0) / 2 = 650.0
    diffs = [ (350 - 650)^2, (950 - 650)^2 ] = [ 90000, 90000 ]
    std = sqrt(180000 / (2 - 1)) = sqrt(180000) = 424.2641

Step 3: COMBINE - Compute Z-Scores z = (val - mean) / std for each record:
  Record 0 (GasStation $350): (350 - 195) / 219.2031 = +0.7071  (Suspicious outlier!)
  Record 1 (GasStation  $40): ( 40 - 195) / 219.2031 = -0.7071
  Record 2 (Jewelry    $350): (350 - 650) / 424.2641 = -0.7071  (Routine low amount!)
  Record 3 (Jewelry    $950): (950 - 650) / 424.2641 = +0.7071
===> Both transactions were $350, but group-wise Z-scoring reveals context!
```

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

#### Step-by-Step Arithmetic Cost & Invariant Breakdown:
1. **Partitioning Time Complexity**:
   Grouping $N$ records into $|\mathcal{K}|$ hash bins takes $\mathcal{O}(N)$ time and $\mathcal{O}(N)$ memory pointers.
2. **Local Transformation Arithmetic**:
   For each partition $\mathcal{D}_k$ of size $N_k$:
   $$\mu_k = \frac{1}{N_k} \sum_{i=1}^{N_k} x_i, \quad \sigma_k = \sqrt{\frac{1}{N_k - 1} \sum_{i=1}^{N_k} (x_i - \mu_k)^2}$$
   Total work across all groups: $\sum_{k \in \mathcal{K}} \mathcal{O}(N_k) = \mathcal{O}(N)$.
3. **Bessel's Correction Invariant**:
   Dividing by $N_k - 1$ ensures that the sample variance is an unbiased estimator: $\mathbb{E}[s^2] = \sigma^2$.
4. **Division-by-Zero Safety**:
   If $N_k < 2$ or $\sigma_k = 0$, the Z-score is formally defined as $z_i \triangleq 0.0$.

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
    # Step 1: Split - Group target values by group_key using defaultdict
    groups: dict[Any, list[float]] = defaultdict(list)
    for row in records:
        if group_key in row and target_key in row:
            groups[row[group_key]].append(float(row[target_key]))

    # Step 2: Apply - Compute local mean and sample standard deviation (Bessel-corrected N-1)
    stats: dict[Any, tuple[float, float]] = {}
    for g, vals in groups.items():
        n = len(vals)
        if n < 2:
            stats[g] = (vals[0] if n == 1 else 0.0, 0.0)
            continue
        mean_val = sum(vals) / n
        var = sum((x - mean_val) ** 2 for x in vals) / (n - 1)
        std_val = math.sqrt(var)
        stats[g] = (mean_val, std_val)

    # Step 3: Combine - Attach group-normalized Z-score to each original record
    result: list[dict[str, Any]] = []
    for row in records:
        new_row = dict(row)
        g = row.get(group_key)
        val = float(row.get(target_key, 0.0))
        mean_val, std_val = stats.get(g, (0.0, 0.0))
        
        if std_val > 0.0:
            z = (val - mean_val) / std_val
        else:
            z = 0.0
            
        new_row[f"{target_key}_zscore"] = f"{z:.4f}"
        result.append(new_row)

    return result
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
