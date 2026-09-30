---
id: "arrow-ipc-zero-copy"
version: "1.0.0"
title: "Parquet Columnar Storage, Strided Encodings & Pushdown"
track: "programming"
module: "mod-17"
estimated_minutes: 15
prerequisites: ["columnar-storage-parquet"]
i18n:
  ar: "تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)"
---

# Parquet Columnar Storage, Strided Encodings & Pushdown

For 40 years, relational databases stored data in Row-Oriented fashion (CSV, PostgreSQL, MySQL). 
In a row-oriented file, Row 1 is written to disk: [Alice, 29, Engineer, $120000], followed immediately by Row 2: [Bob, 34, Designer, $95000].
This is fantastic for transactional apps (OLTP) like an ATM where you want to fetch Alice's whole profile.

Now imagine you are a data analyst running a query:
"What is the average salary across all 50,000,000 employees?"
In a row-oriented CSV or table, the computer's hard drive must physically read every employee's name, age, job title, and notes

:::simulation-widget{engine="canvas2d" component="ArrowBufferMemoryLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Size}_{\text{total}} = N \sum_{c=1}^C w_c
$$

على مدى 40 عاماً، خُزنت قواعد البيانات وفق نمط التخزين الموجّه بالصفوف (Row-Oriented) كما في ملفات CSV وقواعد PostgreSQL.
في هذا النمط، يُكتب السطر الأول كاملاً على القرص: [سارة، 29 سنة، مهندسة، 120,000$]، يليه مباشرة السطر الثاني. هذا رائع للتطبيقات البنكية السريعة (OLTP) لاسترجاع ملف عميل واحد.
ولكن تخيل أنك محلل بيانات تطرح السؤال التالي:
"ما هو متوسط رواتب جميع موظفي الشركة البالغ عددهم 50 مليون شخص؟"
في التخزين الصفي، يضطر القرص الصلب لقراءة الأسماء، والأعمار، والمسميات الوظيفية، والملاحظات، فقط ليصل لرقم الراتب! 95% مما يقرؤه القرص هو هدر كامل للطاقة والوقت.
تستخدم محركات البيانا

:::python-challenge{id="py-arrow-ipc-zero-copy"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:
    """
    Emulates Apache Arrow dictionary encoding of categorical string columns
    and calculates memory compression ratio.

    Args:
        column_data: List of strings.

    Returns:
        A tuple of (vocabulary_list, indices_list, compression_ratio).
    """
    # TODO: Implement Arrow dictionary encoding and byte calculation
    raise NotImplementedError("Implement compress_column_dictionary")
```
:::
