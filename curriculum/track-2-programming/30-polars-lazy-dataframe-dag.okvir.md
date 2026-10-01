---
id: "polars-lazy-dataframe-dag"
version: "1.0.0"
title: "Apache Arrow Zero-Copy & Polars Lazy DAG Optimization"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["arrow-ipc-zero-copy","sql-ctes-recursive-queries"]
i18n:
  ar: "ذاكرة Apache Arrow دون نسخ، وتحسين مخططات Polars الكسولة (Lazy DAGs)"
---

# Apache Arrow Zero-Copy & Polars Lazy DAG Optimization

## Beat 1: Intuition & Mental Model

Why is Polars replacing Pandas as the modern data manipulation powerhouse?
Because Pandas uses **Eager Execution**, while Polars defaults to **Lazy Query Optimization via Directed Acyclic Graphs (DAGs)**.

### The Restaurant Order Analogy: Eager vs. Lazy
- **Eager Execution (Pandas)**: You sit down at a restaurant and order an appetizer. The chef cooks it, brings it out, and you eat it. Then you order salad; the chef chops it and brings it out. Then you order steak; the chef cooks it. Then you say: *"Actually, I only wanted vegetarian dishes!"* You throw away the steak!
Every single line of code in Pandas immediately materializes full, bloated intermediate DataFrames in RAM, even if the next line drops half the columns and rows!
- **Lazy Execution (Polars Lazy DAG)**: You hand the waiter your entire dinner order upfront on a ticket: *"I want appetizer, salad, and steak, but only vegetarian dishes, and only small portions"*.
The head chef looks at the whole order ticket **before touching any food**. The chef immediately crosses off the steak (Predicate Pushdown), prepares only the small portions (Projection Pushdown), and cooks overlapping items simultaneously in parallel!

Polars compiles your Python code into a logical DAG, optimizes the query graph using database theory, and streams batches via Apache Arrow's columnar memory layout with zero memory copying!

:::simulation-widget{engine="canvas2d" component="PolarsLazyExecutionGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

لماذا أصبحت مكتبة Polars البديل العصري الأسرع لمكتبة Pandas في هندسة البيانات؟
لأن Pandas تعتمد على **التنفيذ الفوري المباشر (Eager Execution)**، بينما تعتمد Polars على **التحسين الكسول لمخططات الاستعلام (Lazy Query Optimization via DAG)**.

### تشبيه طلب المطعم: التنفيذ الفوري مقابل المخطط الكسول
- **التنفيذ الفوري (Pandas Eager)**: تجلس في مطعم وتطلب طبق مقبلات، فيقوم الطاهي بطهيه ويحضره لك لتأكله، ثم تطلب سلطة فيحضرها، ثم تطلب شريحة لحم فيطهيها ويحضرها، ثم تقول له: *"في الحقيقة، أنا أريد أطباقاً نباتية فقط!"* فتلقي باللحم في سلة المهملات!
كل سطر كود في Pandas ينشئ فوراً إطار بيانات وسيطاً ضخماً في الذاكرة العشوائية RAM، حتى لو كان السطر التالي سيحذف نصف الأعمدة والصفوف!
- **التنفيذ الكسول (Polars Lazy DAG)**: تعطي النادل طلبك بالكامل منذ البداية في تذكرة واحدة: *"أريد مقبلات وسلطة ولحماً، ولكن شرط أن تكون نباتية وبكميات صغيرة فقط"*.
ينظر رئيس الطهاة إلى التذكرة كاملة **قبل أن يلمس أي مكون**. فيشطب اللحم فوراً (Predicate Pushdown)، ويجهز كميات صغيرة فقط (Projection Pushdown)، ويطهي العناصر المشتركة بالتوازي!

تبني Polars مخططاً توجيهياً عديم الحلقات (DAG)، وتحسنه بقواعد علم قواعد البيانات، ثم تنفذه عبر مخازن Apache Arrow العمودية دون أي نسخ زائد في الذاكرة!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\mathcal{Q}_{\text{eager}} = \pi_\alpha \left( \sigma_\varphi \big( \text{Scan}(\mathcal{P}) \big) \right) \quad \gg \quad \mathcal{Q}_{\text{lazy}} = \text{Scan}_{\text{pushdown}(\alpha, \varphi)}(\mathcal{P}) \implies \text{Cost}(\mathcal{Q}_{\text{lazy}}) \ll \text{Cost}(\mathcal{Q}_{\text{eager}})
$$

### Mathematical Invariants & Symbol Breakdown

The formal algebraic optimization rules govern the compiler rewrite engine:

- **$\mathcal{P}$**: Physical data lake partition files (Parquet / Arrow IPC streams).
- **$\text{Scan}(\mathcal{P})$**: Physical scan operator reading row chunks into memory buffers.
- **$\text{Predicate Pushdown}$**: $\pi_\alpha(\sigma_\varphi(\text{Scan}(\mathcal{P}))) \equiv \pi_\alpha(\text{Scan}_{\sigma_\varphi}(\mathcal{P}))$, evaluating filter predicates $\varphi$ inside Parquet reader threads prior to materializing Arrow record batches.
- **$\text{Projection Pushdown}$**: Restricts scan to $\alpha \cup \text{cols}(\varphi)$, preventing unreferenced columns from ever touching memory bandwidth.
- **Query Plan DAG**: Directed Acyclic Graph nodes represent relational operations; optimization passes collapse redundant nodes into fused SIMD kernels.

### الشرح الرياضي وتفصيل الرموز

تحدد قواعد التحسين الجبرية عمل محرك ترجمة الاستعلامات:
- **$\mathcal{P}$**: ملفات التخزين الفيزيائي في بحيرة البيانات (ملفات Parquet أو جداول Arrow).
- **$\text{Scan}$**: مشغل القراءة الفيزيائي الذي يجلب البيانات للذاكرة.
- **تمرير الشروط (Predicate Pushdown)**: نقل شرط التصفية $\sigma_\varphi$ إلى داخل مشغل قراءة Parquet لتفادي تحميل الصفوف التي ستُحذف لاحقاً.
- **تمرير الإسقاط (Projection Pushdown)**: حصر القراءة في الأعمدة المطلوبة فقط، مانعاً بقية الأعمدة من استهلاك نطاق الذاكرة.
- **مخطط DAG**: رسم بياني توجيهي يمثل خطوات الاستعلام؛ وتدمج مراحل التحسين العمليات المتتالية في نوى SIMD مدمجة فائقة السرعة.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-polars-lazy-dataframe-dag"}
---
timeout_ms: 3000
test_cases:
  - input: "optimize_query_dag([{'op': 'SCAN', 'columns': ['a', 'b', 'c']}, {'op': 'FILTER', 'columns_used': ['a']}, {'op': 'PROJECT', 'columns': ['a']}])[0]['columns']"
    expected: "['a']"
  - input: "optimize_query_dag([{'op': 'SCAN', 'columns': ['x', 'y']}, {'op': 'FILTER', 'columns_used': ['x']}, {'op': 'PROJECT', 'columns': ['x']}])[1]['op']"
    expected: "'FILTER'"
---
```python
from typing import Any

def optimize_query_dag(plan: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    Applies Predicate Pushdown and Projection Pushdown rewrite rules
    to optimize a relational query execution DAG.

    Args:
        plan: Ordered list of query plan node dicts starting with SCAN.
              Example node types:
              - {'op': 'SCAN', 'columns': ['a', 'b', 'c', 'd']}
              - {'op': 'FILTER', 'columns_used': ['a']}
              - {'op': 'PROJECT', 'columns': ['a', 'b']}

    Returns:
        Optimized query plan node list where:
        1. Projection Pushdown restricts SCAN 'columns' to minimal set needed
        2. Predicate Pushdown positions all FILTER nodes directly after SCAN
    """
    # Step 1: Validate plan has at least a SCAN node at index 0
    # Step 2: Separate nodes into scan_node, filters, others, and project_node
    # Step 3: Compute needed_columns = set(project_node['columns']) + all filter 'columns_used'
    # Step 4: Update scan_node['columns'] = sorted(needed_columns)
    # Step 5: Reconstruct optimized_plan: [scan_node] + filters + others + [project_node]
    raise NotImplementedError("Implement optimize_query_dag")
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
A data pipeline running on an 8 GB RAM virtual machine needs to process a 40 GB Parquet dataset. With Pandas: `df = pd.read_parquet('data.parquet'); df = df[df['status'] == 'ACTIVE'][['id', 'total']]`, the process is terminated by the Linux OOM Killer. Rewritten in Polars: `pl.scan_parquet('data.parquet').filter(pl.col('status') == 'ACTIVE').select(['id', 'total']).collect()`, the query finishes in 3.1s using 280 MB RAM. Why?

خط معالجة بيانات يعمل على خادم بذاكرة 8 جيجابايت يحتاج لمعالجة ملف Parquet بحجم 40 جيجابايت. باستخدام Pandas، انهار النظام بسبب نفاد الذاكرة OOM. وعند إعادة كتابته باستخدام Polars Lazy DAG، انتهى الاستعلام في 3.1 ثانية مستهلكاً 280 ميجابايت فقط من الذاكرة! ما السر وراء هذا النجاح الباهر؟

### Transfer Assessment Question
- **(A)** *(Correct)* Pandas eagerly materializes the full 40 GB dataset in memory before executing the filter; Polars compiles a Lazy DAG that pushes Projection Pushdown (reading only 3 columns) and Predicate Pushdown into streaming Arrow chunk buffers, processing data out-of-core without exceeding RAM limits.
  - *Arabic:* تقوم Pandas بتحميل كامل الـ 40 جيجابايت في الذاكرة فوراً قبل التصفية؛ بينما تبني Polars مخططاً كسولاً يمرر اختيار الأعمدة الثلاثة وتصفية الصفوف مباشرة إلى مشغل القراءة، فتعالج البيانات كدفعات صغيرة متدفقة دون تجاوز سعة الذاكرة.
- **(B)** Polars downsamples the dataset by deleting 90% of rows at random to fit within available RAM.
  - *Arabic:* تقوم Polars بحذف 90% من الصفوف عشوائياً لتلائم سعة الذاكرة المتاحة.
- **(C)** Polars converts numbers from 64-bit precision to 4-bit binary strings.
  - *Arabic:* تقوم مكتبة Polars بتحويل الأرقام إلى نصوص ثنائية بدقة 4 بت لتوفير المساحة.
- **(D)** Linux OOM Killer only inspects Python processes named 'pandas', ignoring processes named 'polars'.
  - *Arabic:* يقوم نظام لينكس بمراقبة العمليات المسماة 'pandas' فقط ويتجاهل عمليات 'polars'.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
`pl.scan_parquet` does not load data into memory; it creates a lazy query plan. During `.collect()`, the Polars optimizer prunes unused columns, pushes row filters down to Parquet row groups, and streams data in vectorized Apache Arrow batches.

*التفسير الهندسي المعمق:*
التابع `pl.scan_parquet` لا يحمل البيانات في الذاكرة بل ينشئ مخططاً كسولاً. وعند استدعاء `.collect()`، يُسقط المحسن الأعمدة غير المطلوبة، ويمرر الشروط لأقراص التخزين، ويتدفق بالبيانات كدفعات صغيرة متتالية.
