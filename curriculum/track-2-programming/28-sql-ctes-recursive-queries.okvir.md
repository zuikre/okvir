---
id: "sql-ctes-recursive-queries"
version: "1.0.0"
title: "Common Table Expressions & Recursive CTEs"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["numpy-strides-zero-copy"]
i18n:
  ar: "التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)"
---

# Common Table Expressions & Recursive CTEs

## Beat 1: Intuition & Mental Model

How do you query deeply nested, hierarchical tree structures in a relational database when you do not know the depth of the graph in advance? In enterprise data platforms, software architectures, and supply chain logistics, hierarchical relationships are everywhere:
- **Corporate Organization Charts**: The reporting chain from the CEO down to VP, Director, Staff Engineer, and Intern ($CEO \to VP \to Director \to Engineer$).
- **Manufacturing Bills of Materials (BOM)**: The physical component assembly of an aircraft ($Jet \to Wing \to Engine \to Turbine \to Fan Blade \to Titanium Bolt$).
- **Taxonomies & Category Trees**: Product catalog categorization in e-commerce ($Electronics \to Computers \to Components \to Storage \to NVMe SSD$).
- **Social & Knowledge Graphs**: Networks of friends, citations, or fraud entity rings (*User A referred User B who transacted with User C*).

In classical SQL without recursion, querying 5 levels of hierarchical depth forces an engineer to write 5 ugly, hardcoded self-joins. If an organization re-structures or a supply assembly deepens to 6 levels, the hardcoded query breaks catastrophically! Even worse, standard nested subqueries quickly degrade into an unmaintainable tangle of SQL spaghetti that query optimizers struggle to parse and execute efficiently.

### The Russian Nesting Doll Analogy: The Seed & The Expanding Wave
To understand how **Recursive Common Table Expressions (Recursive CTEs)** work, imagine opening a traditional painted Russian nesting doll (Matryoshka):
- **The Anchor Member (The Root Seed)**: You start by opening the outermost, largest doll standing alone on the table (e.g., `WHERE manager_id IS NULL`—the CEO). This initial query runs exactly once and establishes the foundation.
- **`UNION ALL` (The Relational Bridge)**: The declarative conveyor belt that feeds the output of the current layer into the recursive engine for the next iteration.
- **The Recursive Member (The Expanding Wave)**: Inside the first doll, you find the next set of dolls nested directly underneath it. The engine joins subordinates to the parents discovered in the previous round: *"Find every employee whose manager is someone from the previous step"*. Then it repeats this discovery pass for their subordinates, incrementing the tree depth counter by 1 at each layer.
- **Automatic Termination (The Solid Core)**: Eventually, you reach the tiniest, solid wooden doll that cannot be opened any further ($R_{K+1} = \emptyset$). When an iteration returns zero new rows, the engine automatically terminates the loop and unions all generated layers into a clean, unified hierarchical dataset!

Beyond trees, non-recursive CTEs (`WITH cte_name AS (...)`) act as modular building blocks for complex queries. Instead of nesting subqueries inside subqueries like impenetrable labyrinths, CTEs allow you to define declarative, named dataframes in top-to-bottom sequence, giving your SQL pipeline the readability and testability of a clean computational Directed Acyclic Graph (DAG).

### Jargon Decoder / قاموس المصطلحات المعمارية

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Recursive CTE** / الاستعلام الذاتي العودي | A query that references its own output to iteratively traverse tree/graph hierarchies. Analogy: Opening nested Russian Matryoshka dolls one by one. | استعلام يشير إلى مخرجاته ذاتياً للتنقل عبر المستويات الهرمية والشجرية. التشبيه: فتح دمى الماتريوشكا الروسية المتداخلة واحدة تلو الأخرى. |
| **Anchor Member** / عضو التثبيت الأساسي | The non-recursive base query executed exactly once to initialize the root seeds. Analogy: Planting the initial acorn from which the entire oak tree sprouts. | الاستعلام التأسيسي الأولي الذي ينفذ مرة واحدة فقط لإنتاج بذور الجذور الأساسية. التشبيه: زراعة بذرة البلوط الأولى التي تنمو منها الشجرة الضخمة بأكملها. |
| **Recursive Member** / العضو العودي المتمدد | The inductive query joining new children to the parents found in the preceding iteration. Analogy: Branches sprouting new smaller twigs season after season. | الاستعلام المتكرر الذي يربط الأبناء الجدد بالآباء المكتشفين في الخطوة السابقة. التشبيه: الأغصان الشجرية التي تفرع أغصاناً أصغر فأصغر مع كل فصل. |
| **Working Table ($R_i$)** / جدول العمل المؤقت | An in-memory scratchpad buffer containing strictly the tuples discovered at step $i$. Analogy: The conveyor belt tray holding only the items picked in the current round. | مخزن مؤقت في الذاكرة يحوي حصرياً السجلات المكتشفة في الدورة الحالية فقط. التشبيه: صينية خط التجميع التي تحمل فقط القطع المجمعة في هذه الجولة. |
| **Fixed-Point Termination** / توقف النقطة الثابتة | Automatically stopping when an iteration produces an empty set ($R_{K+1} = \emptyset$). Analogy: Discovering the smallest solid wooden doll with nothing inside it. | التوقف الرياضي الحتمي للاستعلام عند خلو جولة البحث من أي سجلات جديدة. التشبيه: الوصول إلى أصغر دمية خشبية مصمتة لا تحتوي أي دمية أخرى بداخلها. |
| **Graph Cycle Trap** / فخ الدوران البياني اللانهائي | A circular dependency in the graph ($A \to B \to A$) that causes an infinite loop and OOM crash. Analogy: A snake eating its own tail in an endless loop. | علاقة دائرية مغلقة بين السجلات تؤدي لدوران المحرك إلى ما لا نهاية ونفاد الذاكرة. التشبيه: ثعبان يبتلع ذيله في حلقة مغلقة لا تنتهي. |

:::simulation-widget{engine="canvas2d" component="RecursiveCteGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

كيف تستعلم عن الهياكل الهرمية الشجرية المعقدة في قواعد البيانات العلائقية عندما يكون عمق الشجرة مجهولاً مقدماً؟ في منصات البيانات المؤسسية وسلاسل الإمداد العالمية، تحيط بنا الهياكل الهرمية من كل جانب:
- **الهيكل الإداري للشركات**: تسلسل خطوط الإدارة والتبعية من المدير التنفيذي نزولاً إلى نواب الرئيس، والمدراء، والمهندسين، والمتدربين ($الرئيس \to نائب الرئيس \to المدير \to المهندس$).
- **قوائم مواد التصنيع (BOM)**: تفكيك الأجزاء الصناعية المعقدة مثل تجميع الطائرات ($طائرة \to جناح \to محرك \to توربين \to شفرة \to مسمار تيتانيوم$).
- **أشجار التصنيفات في المتاجر الكبرى**: تسلسل فئات المنتجات ($إلكترونيات \to حواسيب \to مكونات \to وحدات تخزين \to أقراص NVMe$).
- **الشبكات الاجتماعية ومكافحة الاحتيال**: شبكات المعاملات المشبوهة (*المستخدم أ حول للمستخدم ب الذي تعامل مع ج*).

في لغة SQL الكلاسيكية دون التكرار العودي، يتطلب الاستعلام عن شجرة بعمق 5 مستويات كتابة 5 عمليات ربط ذاتي شاقة ومقيدة. فإذا توسعت الشركة وظهر مستوى إداري سادس، ينهار الاستعلام القديم كلياً! علاوة على ذلك، تتحول الاستعلامات الفرعية المتداخلة إلى كابوس برمجي متشابك يعجز مهندسو البيانات عن قراءته وتصحيحه، ويعجز محرك قواعد البيانات عن تحسينه بكفاءة.

### تشبيه الدمى الروسية (الماتريوشكا): بذرة الأساس وحلقات التمدد
لفهم الآلية الهندسية لـ **الاستعلامات الذاتية العودية (Recursive CTEs)**، تخيل أنك تفتح دمية ماتريوشكا خشبية روسية:
- **عضو التثبيت الأساسي (Anchor Member - بذرة الأساس)**: تبدأ بالإمساك بأكبر دمية خارجية ظاهرة أمامك على الطاولة (مثل `WHERE manager_id IS NULL` - المدير التنفيذي). يُنفذ هذا الاستعلام التأسيسي مرة واحدة فقط ليحدد نقطة البداية.
- **`UNION ALL` (جسر الربط العلائقي)**: شريط النقل التقريري الذي يربط مخرجات الطبقة الحالية بمحرك التكرار للمستوى التالي.
- **العضو العودي (Recursive Member - موجة التمدد)**: بفتح الدمية الكبرى، تجد مجموعة الدمى الأصغر منها المستقرة بداخلها مباشرة. يربط المحرك المرؤوسين الجدد بالمديرين المكتشفين في الخطوة السابقة: *"ابحث عن كل موظف يتبع مديره لموظفي الجولة السابقة"*. وتتكرر هذه العملية طبقة تلو طبقة مع زيادة عداد العمق بواحد عند كل مستوى.
- **التوقف التلقائي (نواة الدمية المصمتة)**: في النهاية، تصل إلى أصغر دمية خشبية مصمتة لا تحوي أي دمية أخرى بداخلها ($R_{K+1} = \emptyset$). وعندما تنتهي أي دورة بصفر من السجلات الجديدة، يتوقف محرك التكرار ذاتياً، ويجمع كافة الطبقات في جدول هرمي موحد وأنيق!

وعلاوة على التكرار العودي، تمثل التعبيرات الجدولية العامة (`WITH cte_name AS (...)`) وحدات بناء معيارية فائقة الأناقة. فبدلاً من حشر الاستعلامات الفرعية داخل بعضها في متاهات مظلمة، تتيح لك CTE كتابة خطوات المعالجة كجداول مؤقتة مرتبة من الأعلى إلى الأسفل، مما يمنح استعلاماتك وضوحاً مبهراً وهيكلية تشبه الرسم البياني التوجيهي (DAG).

## Beat 2: Formal Foundations & Mathematical Invariants

$$
R_0 = \text{AnchorQuery}(\mathcal{D}), \quad R_{i+1} = \text{RecursiveQuery}(R_i \bowtie \mathcal{D})
$$

$$
R_{\text{total}} = \bigcup_{i=0}^K R_i \quad \text{where } R_{K+1} = \emptyset \land K < \infty
$$

```text
Visual ASCII Transformation: Recursive CTE Iterative Expansion:

Organization Hierarchy Graph:
  Emp 1 (Alice, CEO, manager=NULL)
    |-- Emp 2 (Bob, VP, manager=1)
    |     \-- Emp 4 (David, Eng, manager=2)
    \-- Emp 3 (Charlie, Dir, manager=1)

Step 0: Anchor Member (WHERE manager_id IS NULL)
  Working Table R0: [ (1, 'Alice', depth=0, path='Alice') ]
  Accumulated Output: [ Alice (d=0) ]

Step 1: Recursive Member (JOIN org_chart ON manager_id IN R0.emp_id)
  Find direct reports of Alice (Emp 1):
  Working Table R1: [ (2, 'Bob', depth=1, path='Alice -> Bob'), 
                      (3, 'Charlie', depth=1, path='Alice -> Charlie') ]
  Accumulated Output: [ Alice (d=0), Bob (d=1), Charlie (d=1) ]

Step 2: Recursive Member (JOIN org_chart ON manager_id IN R1.emp_id)
  Find direct reports of Bob (2) and Charlie (3):
  Working Table R2: [ (4, 'David', depth=2, path='Alice -> Bob -> David') ]
  Accumulated Output: [ Alice (d=0), Bob (d=1), Charlie (d=1), David (d=2) ]

Step 3: Recursive Member (JOIN org_chart ON manager_id IN R2.emp_id)
  Find direct reports of David (4):
  Working Table R3: [ ]  (EMPTY SET! R_3 = Ø)
  ===> Least Fixed-Point reached! Engine automatically halts and returns R_total!
```

### Mathematical Invariants & Symbol Breakdown

| الرمز / Symbol | المجال والتعريف الرياضي / Mathematical Domain | الدور الهندسي والمعماري / Data Engineering & Architectural Role | الشرح الدقيق بالعربية / Arabic Explanation |
| :--- | :--- | :--- | :--- |
| $\mathcal{D}$ | Underlying database relation | Base physical storage relation queried during anchor and recursive joins | جدول قاعدة البيانات الفيزيائي الأساسي المستعلم عنه |
| $R_0$ | Base anchor relation | Non-recursive seed relation evaluated exactly once at depth step 0 | علاقة الأساس الأولى التي تُقيم مرة واحدة فقط عند بداية الاستعلام |
| $R_i$ | Intermediate working table | Temporary buffer containing tuples materialized strictly at iteration $i$ | مخزن العمل المؤقت الذي يحوي سجلات المستوى الحالي $i$ فقط |
| $\bowtie$ | Equi-join relational operator | Joins working table attributes with base parent/child keys ($R_i \bowtie \mathcal{D}$) | عملية الربط العلائقي بين سجلات الخطوة الحالية والجدول الأساسي |
| $K$ | Least fixed-point depth ($K \in \mathbb{N}$) | Traversal depth where recursive expansion reaches empty set ($R_{K+1} = \emptyset$) | أصغر عمق تتحقق عنده النقطة الثابتة بانعدام أي سجلات جديدة |
| $R_{\text{total}}$ | Relational multiset union | Final output relation aggregating all iteration steps: $\bigcup_{i=0}^K R_i$ | الناتج النهائي الشامل الذي يدمج مخرجات جميع المستويات |
| $\text{DAG}$ | Directed Acyclic Graph | Mathematical topology requirement preventing infinite circular loops | شرط المخطط التوجيهي عديم الحلقات لضمان التوقف الرياضي الحتمي |
| $\text{DepthLimit}$ | Guard integer constraint | Safety threshold (e.g. `WHERE depth < 100`) preventing stack/memory blowup | سقف الأمان الرقمي لمنع انفجار الذاكرة والدوران اللانهائي |

#### Step-by-Step Arithmetic Cost & Invariant Breakdown:
1. **Iterative Memory Footprint**:
   At level $i$, the engine allocates memory strictly proportional to the working table size $|R_i|$, discarding previous working buffers.
2. **Computational Complexity Across Tree of Height $H$**:
   $$\text{Total Cost} = \mathcal{O}(|R_0|) + \sum_{i=1}^H \mathcal{O}(|R_{i-1}| \bowtie |\mathcal{D}|) = \mathcal{O}(N_{\text{total}} + H \cdot |\mathcal{D}|)$$
   With indexed foreign keys on `manager_id`, each lookup is $\mathcal{O}(\log |\mathcal{D}|)$, achieving blazing sub-second traversal over millions of rows.
3. **The Cyclic Graph Explosion Invariant**:
   If a directed cycle exists ($A \to B \to A$), then for all $i \ge 1$: $|R_i| \ge 1$. The empty set condition $R_{K+1} = \emptyset$ is mathematically impossible, forcing infinite iterations and crashing the server with Out-Of-Memory.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-sql-ctes-recursive-queries"}
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
In an industrial aviation manufacturing Bill of Materials (BOM) database containing 5,000,000 components, an engineer creates a Recursive CTE to calculate the total roll-up production cost of a jet engine turbine. In the staging environment, the query executes in 400 milliseconds. But when executed against production data, the query hangs indefinitely, completely saturates all CPU cores, allocates 128 GB of RAM, and crashes the database server with a fatal Linux Out-Of-Memory (OOM) signal. What graph data defect caused this catastrophe, and how must production recursive queries be protected?

في قاعدة بيانات تصنيع طيران صناعية تضم 5,000,000 قطعة غيار، صمم مهندس استعلاماً عودياً (Recursive CTE) لحساب التكلفة الإجمالية المجمعة لتوربين طائرة نفاثة. في بيئة التجارب، عمل الاستعلام في 400 مللي ثانية. ولكن عند تشغيله على بيانات الإنتاج الحقيقية، علق الاستعلام إلى ما لا نهاية، واستنزف أنوية المعالج بالكامل، واستهلك 128 جيجابايت من الذاكرة العشوائية حتى انهار خادم قاعدة البيانات بإنهاء قسري OOM من نظام التشغيل. ما الخلل البياني في شبكة العلاقات الذي سبب هذه الكارثة، وكيف تُحمى الاستعلامات العودية الإنتاجية؟

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
- **Why Option (A) is correct:** A Recursive CTE is an iterative state-machine loop that executes as long as the recursive member generates at least one new row in its intermediate working table ($R_{i+1} \ne \emptyset$). When data forms a valid Directed Acyclic Graph (DAG), the traversal naturally terminates when leaf nodes are reached ($R_{K+1} = \emptyset$). However, if a circular reference exists in production data (e.g., Sub-assembly 104 lists Part 205 as an input, but Part 205 erroneously lists Sub-assembly 104 as a sub-component), the query enters an infinite loop. Each iteration re-inserts the cycling nodes, appending duplicate rows to the intermediate buffer until physical memory is completely exhausted. Robust production architectures guard against cycles by either: (1) enforcing a maximum recursion depth check (`WHERE depth < 50`), or (2) maintaining an array of visited IDs (`visited_ids || child.id`) and checking `WHERE child.id != ALL(parent.visited_ids)`.
- **Why Option (B) is incorrect:** Database execution engines evaluate CTEs in physical RAM buffers using CPU memory registers and storage managers. The underlying persistent disk media (whether NVMe SSD or spinning HDD) affects raw read bandwidth, but never alters algorithmic termination semantics.
- **Why Option (C) is incorrect:** Recursive CTEs are a native ANSI SQL standard feature implemented internally in C/C++/Rust across modern database engines including DuckDB, PostgreSQL, SQLite, BigQuery, and SQL Server. No Python runtime is involved.
- **Why Option (D) is incorrect:** Replacing `UNION ALL` with `INTERSECT` would break the query completely: `INTERSECT` computes the set intersection (rows common to both the anchor and the recursive member), which is empty at step 1 and would immediately terminate the query prematurely on the first pass.

*التفسير الهندسي المعمق وتحليل الخيارات:*
- **لماذا الخيار (A) صحيح:** يعمل استعلام Recursive CTE كآلة حالات تكرارية تستمر في العمل طالما أن الخطوة العودية تنتج صَفاً واحداً على الأقل في جدول العمل الوسيط ($R_{i+1} \ne \emptyset$). فعندما تكون البيانات رسماً بيانياً توجيهياً عديم الحلقات (DAG)، يتوقف الاستعلام حتماً عند الوصول لأوراق الشجرة ($R_{K+1} = \emptyset$). ولكن إذا احتوت بيانات الإنتاج على حلقة مفرغة (مثل: القطعة 104 تتكون من 205، والقطعة 205 سُجلت خطأً بأنها تحوي 104)، يدخل المحرك في دوران لانهائي. ومع كل دورة يُعاد إدراج نفس السجلات وتتضاعف صفوف الذاكرة حتى تنهار الذاكرة العشوائية RAM تماماً. تتطلب الأنظمة الإنتاجية وضع حواجز أمان مثل سقف العمق (`WHERE depth < 50`) أو تتبع مصفوفة المعرفات المزارة لمنع إعادة زيارة العقدة نفسها.
- **لماذا الخيار (B) خاطئ:** تنفذ محركات قواعد البيانات استعلامات CTE داخل الذاكرة العشوائية RAM وسجلات المعالج، ونوع القرص (SSD أو HDD) يؤثر على سرعة القراءة فقط ولا يغير الشروط المنطقية للتوقف الرياضي.
- **لماذا الخيار (C) خاطئ:** الاستعلامات العودية هي ميزة قياسية في معيار ANSI SQL ومدعومة داخلياً ومكتوبة بلغات C++ و Rust في محركات كبرى مثل DuckDB و PostgreSQL و SQLite دون أي حاجة للغة بايثون.
- **لماذا الخيار (D) خاطئ:** استبدال `UNION ALL` بـ `INTERSECT` سيدمر الاستعلام كلياً؛ لأن التقاطع يحسب الصفوف المشتركة بين الأساس والتكرار، وهي مجموعة فارغة في الخطوة الأولى مما كان سيوقف الاستعلام فوراً دون استخراج أي بيانات.
