---
id: "columnar-storage-parquet"
version: "1.0.0"
title: "Common Table Expressions & Recursive CTEs"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["numpy-strides-indexing","sql-indexing-query-plans"]
i18n:
  ar: "التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)"
---

# Common Table Expressions & Recursive CTEs

## Beat 1: Intuition & Mental Model

How do you query hierarchical tree structures in a relational database when you don't know the depth in advance?
Examples include:
- Organization chart reporting lines (*CEO $\to$ VP $\to$ Director $\to$ Engineer*)
- Supply chain bill of materials (*Airplane $\to$ Wing $\to$ Engine $\to$ Turbine $\to$ Bolt*)
- Social network connection graphs (*Friends of friends of friends*)

In basic SQL, querying 5 levels of depth requires writing 5 ugly, hardcoded self-joins. If someone is 6 levels deep, the query fails!
The solution is **Recursive Common Table Expressions (Recursive CTEs)**.

### The Russian Nesting Doll Analogy: The Seed and The Loop
A Recursive CTE operates via an elegant mathematical fixed-point loop:
1. **The Anchor Member (The Root Seed)**: Find the top of the hierarchy (e.g. `WHERE manager_id IS NULL`—the CEO). This runs exactly once.
2. **`UNION ALL` (The Bridge)**: Connects the seed to the recursion engine.
3. **The Recursive Member (The Expanding Wave)**: Join subordinates to the previous layer: find everyone reporting to the people found in step 1. Then find everyone reporting to them!
4. **Automatic Termination**: When a level returns zero new subordinates, the recursion halts cleanly and returns the full tree!

:::simulation-widget{engine="canvas2d" component="RecursiveCteGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

كيف تستعلم عن الهياكل الشجرية الهرمية في قواعد البيانات العلائقية عندما يكون عمق الشجرة مجهولاً مقدماً؟
من أمثلة ذلك:
- الهيكل التنظيمي للشركات (*المدير التنفيذي $\to$ نائب الرئيس $\to$ المدير $\to$ المهندس*)
- شجرة مكونات التصنيع (*الطائرة $\to$ الجناح $\to$ المحرك $\to$ التوربين $\to$ المسمار*)
- شبكات التواصل الاجتماعي (*أصدقاء الأصدقاء*)

في SQL التقليدية، يتطلب الاستعلام عن 5 مستويات كتابة 5 عمليات ربط ذاتي شاقة ومقيدة. وإذا وُجد موظف في المستوى السادس، يفشل الاستعلام!
الحل الجذري هو **الاستعلامات الذاتية العودية (Recursive CTEs)**.

### تشبيه الدمى الروسية (الماتريوشكا): بذرة الأساس وحلقة التمدد
يعمل الاستعلام العودي عبر آلية النقطة الثابتة الرياضية:
1. **عضو التثبيت الأساسي (Anchor Member)**: إيجاد قمة الهرم (مثل `WHERE manager_id IS NULL` - المدير التنفيذي). ينفذ هذا الجزء مرة واحدة فقط.
2. **`UNION ALL` (جسر الاتصال)**: يربط البذرة بمحرك التكرار العودي.
3. **العضو العودي (Recursive Member)**: ربط المرؤوسين بالطبقة السابقة؛ أي إيجاد كل من يتبع لمديري الخطوة السابقة، ثم تكرار ذلك درجة درجة!
4. **التوقف التلقائي (Termination)**: عندما لا يُسفر المستوى التالي عن أي موظف جديد، تتوقف الحلقة تلقائياً وتُرجع الشجرة كاملة!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
R_0 = \text{AnchorQuery}(\mathcal{D}), \quad R_{i+1} = \text{RecursiveQuery}(R_i \bowtie \mathcal{D}) \implies R_{\text{total}} = \bigcup_{i=0}^K R_i \quad \text{where } R_{K+1} = \emptyset
$$

### Mathematical Invariants & Symbol Breakdown

The formal semantics characterize relational fixed-point evaluation:

- **$R_0$**: Base anchor relation evaluated once over underlying database $\mathcal{D}$.
- **$R_i$**: Working table buffer produced at recursion iteration depth $i$.
- **$\text{RecursiveQuery}(R_i \bowtie \mathcal{D})$**: Evaluated iteratively by joining intermediate working set $R_i$ with base table $\mathcal{D}$.
- **$K$**: Maximum traversal depth where $R_{K+1} = \emptyset$ (the mathematical fixed-point where no new tuples are produced).
- **DAG Invariant**: Traversal graph must be a Directed Acyclic Graph (DAG); cyclic graphs create infinite loops unless protected by cycle detection guards.

### الشرح الرياضي وتفصيل الرموز

تحدد الدلالات الرياضية آلية النقطة الثابتة:
- **$R_0$**: علاقة الأساس الأولى وتنفذ مرة واحدة على قاعدة البيانات $\mathcal{D}$.
- **$R_i$**: جدول العمل الوسيط عند مستوى العمق $i$.
- **$\text{RecursiveQuery}$**: خطوة التكرار التي تدمج مخرجات المستوى السابق $R_i$ مع الجدول الأصلي $\mathcal{D}$.
- **$K$**: أقصى عمق للشجرة وتتحقق عنده النقطة الثابتة بانعدام أي سجلات جديدة ($R_{K+1} = \emptyset$).
- **شرط انعدام الحلقات (DAG)**: يجب أن تكون شجرة العلاقات خالية من الحلقات الدائرية المغلقة لمنع التكرار اللانهائي.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-columnar-storage-parquet"}
---
timeout_ms: 3000
test_cases:
  - input: "WITH RECURSIVE h AS (SELECT emp_id, 0 as d FROM org_chart WHERE manager_id IS NULL UNION ALL SELECT c.emp_id, p.d+1 FROM org_chart c JOIN h p ON c.manager_id = p.emp_id) SELECT * FROM h"
    expected: "VALID_JOIN_PLAN"
  - input: "SELECT emp_id, emp_name FROM org_chart WHERE manager_id IS NULL"
    expected: "VALID_JOIN_PLAN"
---
```sql
-- Formulate a DuckDB Recursive CTE traversing an organization hierarchy.
-- Schema: org_chart(emp_id, emp_name, manager_id)

WITH RECURSIVE hierarchy AS (
    -- Step 1: Anchor Member (Root nodes with manager_id IS NULL)
    SELECT
        emp_id,
        emp_name,
        0 AS depth,
        CAST(emp_name AS VARCHAR) AS path
    FROM org_chart
    WHERE manager_id IS NULL

    UNION ALL

    -- Step 2: Recursive Member (Join subordinates to existing parents)
    SELECT
        child.emp_id,
        child.emp_name,
        parent.depth + 1 AS depth,
        parent.path || ' -> ' || child.emp_name AS path
    FROM org_chart child
    JOIN hierarchy parent ON child.manager_id = parent.emp_id
)
SELECT
    emp_id,
    emp_name,
    depth,
    path
FROM hierarchy
ORDER BY depth ASC, path ASC;
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
In an industrial manufacturing Bill of Materials (BOM) database, a turbine assembly is composed of sub-assemblies. A junior engineer executes a Recursive CTE to calculate total manufacturing cost, but the database hangs permanently until crashing with an Out-Of-Memory error. What graph data hazard caused this infinite recursion?

في قاعدة بيانات تصنيع صناعي لقطع الغيار، تتكون التوربينات من قطع فرعية. نفذ مهندس استعلام Recursive CTE لحساب التكلفة الإجمالية، فعلقت قاعدة البيانات تماماً حتى انهارت بنفاد الذاكرة. ما الخلل الهيكلي في بيانات الرسم البياني الذي سبب هذا الدوران اللانهائي؟

### Transfer Assessment Question
- **(A)** *(Correct)* Cyclic graph dependencies (e.g. part A contains part B which contains part A) violate the Directed Acyclic Graph (DAG) assumption, causing the termination condition $R_{K+1} = \emptyset$ to never be reached; queries must enforce depth limits (`WHERE depth < 50`) or track visited nodes.
  - *Arabic:* وجود علاقات دائرية مغلقة (مثل: القطعة A تحتوي B التي تحتوي بدورها على A) ينتهك شرط الرسم الموجه عديم الحلقات (DAG)، مما يمنع شرط التوقف $R_{K+1} = \emptyset$ من التحقق؛ ويجب وضع سقف للعمق أو تتبع العقد المزارة.
- **(B)** Recursive CTEs can only process trees stored on solid-state drives (SSDs), not hard disks (HDDs).
  - *Arabic:* تعمل الاستعلامات العودية فقط على أقراص SSD السريعة وتفشل على الأقراص الصلبة التقليدية HDD.
- **(C)** DuckDB requires all recursive queries to be written in Python instead of standard SQL.
  - *Arabic:* تشترط DuckDB كتابة الاستعلامات العودية بلغة بايثون بدلاً من SQL.
- **(D)** The `UNION ALL` clause should have been replaced with `INTERSECT` to prevent duplicates.
  - *Arabic:* كان يجب استبدال عبارة `UNION ALL` بعبارة `INTERSECT` لمنع تكرار السجلات.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
Recursive CTEs continue executing as long as the recursive member returns at least one row. In cyclic topologies, rows re-trigger each other endlessly. Production systems safeguard queries with cycle tracking or depth ceilings.

*التفسير الهندسي المعمق:*
يستمر الاستعلام العودي في العمل طالما أن الخطوة السابقة أنتجت صَفاً واحداً على الأقل. الحلقات الدائرية تعيد إنتاج الصفوف إلى ما لا نهاية، مما يفرض استخدام ضوابط فحص الحلقات وأسقف العمق.
