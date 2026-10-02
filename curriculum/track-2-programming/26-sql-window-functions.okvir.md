---
id: "sql-window-functions"
version: "1.0.0"
title: "Window Functions & Analytic Partitioning"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: []
i18n:
  ar: "دوال النوافذ (Window Functions) والتقسيم التحليلي"
---

# Window Functions & Analytic Partitioning

## Beat 1: Intuition & Mental Model

A standard SQL `GROUP BY` clause behaves like a heavy industrial hydraulic trash compactor: it takes 1,000 distinct employee records in the Engineering department and crushes them into a single summary dot: `("Engineering", 1000, 125000)`. In that instant, the individual names, hire dates, granular titles, and exact salaries of all 1,000 engineers are permanently crushed and destroyed from the query result set!

What if your business question demands both aggregate intelligence AND granular individual rows?
- *"What is each employee's salary rank compared to peers in their department?"*
- *"What is the dollar difference between each employee's salary and their department's top earner?"*
- *"What is the percentage contribution of this specific trade to today's regional trading volume?"*

To calculate these metrics using basic SQL, you would be forced to execute expensive self-joins against aggregated subqueries. Enter **Window Functions** (`OVER (PARTITION BY ...)`).

### The Glass Catwalk Observation Gallery Analogy
To visualize window execution, imagine a bustling financial trading floor viewed from an elevated glass observation walkway suspended from the ceiling:
- The traders remain sitting at their desks, working uninterrupted. Every individual employee's desk and record remains completely visible and untouched.
- An auditor walks along the transparent glass catwalk above.
- Through a movable glass frame (`OVER`), the auditor visually groups the desks by department (`PARTITION BY dept_name`), sorts the traders by compensation (`ORDER BY salary DESC`), and writes down each person's relative standing (`DENSE_RANK()`) on a digital tablet pinned to their row.

You achieve multi-level analytic aggregations **without destroying or collapsing a single row of underlying data**!

### Jargon Decoder / قاموس المصطلحات المعمارية

| Technical Term / المصطلح التقني | Plain English Translation & Analogy | المعنى المبسط والتشبيه اليومي |
| :--- | :--- | :--- |
| **Window Function (`OVER`)** / الدالة النافذية | Computing an aggregate or ranking metric across a window of rows while keeping every individual row intact. Analogy: Viewing traders from a glass catwalk overhead. | حساب مقاييس إحصائية أو ترتيبية عبر نافذة من الصفوف مع الحفاظ على كل صف بمفرده. التشبيه: مراقبة المتداولين من ممشى زجاجي علوي دون مقاطعتهم. |
| **`PARTITION BY`** / التقسيم التحليلي | Grouping rows into isolated subsets for window calculation without collapsing rows. Analogy: Drawing chalk circles around department desks on the office floor. | تقسيم الصفوف إلى مجموعات فرعية لحساب مقاييس النافذة دون دمج الصفوف. التشبيه: رسم دوائر طباشيرية تفصل مكاتب كل قسم في قاعة الشركة. |
| **Row Cardinality Preservation** / الحفاظ التام على عدد الصفوف | The invariant that the query outputs exactly 1 row for every 1 input row ($|\text{Output}| = |R|$). Analogy: Taking a group photo where everyone stays in the picture. | الثابت المعماري: خروج صف ناتج مقابل كل صف مدخل دون أي نقصان في العدد. التشبيه: التقاط صورة جماعية يظهر فيها كل فرد بمفرده دون استثناء أحد. |
| **`DENSE_RANK()` vs `RANK()`** / الترتيب الكثيف مقابل الترتيب الفجوي | Dense rank produces continuous numbers ($1, 2, 2, 3$); Rank leaves gaps for ties ($1, 2, 2, 4$). Analogy: Podium medals vs sports tournament tiebreaker slots. | الترتيب الكثيف يعطي أرقاماً متتابعة بلا فجوات، بينما يترك الترتيب العادي فجوات بعد التعادل. التشبيه: منح ميداليات المراكز المتتابعة مقابل بطولات التنس. |
| **Sliding Window Frame (`ROWS BETWEEN`)** / إطار النافذة المنزلق | Specifying how many preceding and following rows are included in the rolling aggregation. Analogy: An inspection magnifying glass sliding down a line of receipts. | تحديد عدد الصفوف السابقة واللاحقة المشمولة في الحساب التراكمي المتحرك. التشبيه: عدسة مكبرة تنزلق فوق شريط الإيصالات خطوة بخطوة. |
| **Running Accumulator** / المجمع الإحصائي المتدفق | In-memory register updating running totals in $\mathcal{O}(1)$ as rows stream by. Analogy: A handheld clicker counter used by a flight attendant. | مسجل ذاكرة سريع يحدّث المجاميع التراكمية في زمن ثابت أثناء تدفق الصفوف. التشبيه: عداد نقرات يدوي في يد مضيف الطائرة لعد الركاب. |

:::simulation-widget{engine="canvas2d" component="WindowFunctionFrameLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تتصرف عبارة التجميع التقليدية `GROUP BY` في SQL كمكبس نفايات هيدروليكي صناعي: تأخذ 1,000 سجل مستقل لمهندسي قسم التطوير وتضغطهم جميعاً في سطر ملخص واحد: `("الهندسة"، 1000، 125000)`. وفي تلك اللحظة، تُسحق وتُمحى أسماء وتواريخ تعيين وتفاصيل رواتب أولئك المهندسين الـ 1,000 نهائياً من مخرجات الاستعلام!

ماذا لو كان سؤال الأعمال يتطلب الحصول على الإحصائيات الإجمالية مع الاحتفاظ بكل صف تفصيلي في الوقت نفسه؟
- *"ما هو الترتيب النسبي لراتب كل موظف مقارنة بزملائه في نفس القسم؟"*
- *"كم يبلغ الفارق المالي بين راتب هذا الموظف وأعلى راتب في قسمه؟"*
- *"ما هي النسبة المئوية لمساهمة هذه الصفقة الفردية في إجمالي تداولات المنطقة اليوم؟"*

للإجابة عن هذه الأسئلة بـ SQL التقليدية، ستضطر إلى كتابة عمليات ربط ذاتي شاقة وبطيئة ضد استعلامات فرعية. وهنا تأتي القوة الخارقة لـ **الدوال النافذية (Window Functions)** عبر العبارة السحرية `OVER (PARTITION BY ...)`.

### تشبيه ممر المراقبة الزجاجي المعلق
لتجسيد آلية عمل الدوال النافذية، تخيل قاعة تداول مالي كبرى يعلوها ممشى زجاجي شفاف معلق في السقف:
- يظل جميع المتداولين جالسين في مكاتبهم يمارسون أعمالهم؛ وكل موظف وبياناته تظل محفوظة بالكامل دون أي ضغط أو حذف.
- يمشي مدقق الحسابات على الممشى الزجاجي الشفاف في الأعلى.
- ومن خلال إطار زجاجي متحرك (`OVER`)، يقسم المكاتب ذهنياً حسب القسم (`PARTITION BY dept_name`)، ويرتبهم حسب الرواتب (`ORDER BY salary DESC`)، ثم يسجل الترتيب النسبي لكل موظف (`DENSE_RANK()`) وفارق راتبه عن سقف القسم في بطاقة معلقة بجانب مكتبه.

تحصل بذلك على أعمق المؤشرات الإحصائية والتجميعية **دون التضحية بأي صف أو تفصيلة واحدة في قاعدة البيانات**!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\mathcal{W}_f(t) = f\Big( \big\{ s \in R \mid p(s) = p(t) \land s \in \text{Frame}(t) \big\} \Big), \quad \text{DENSE\_RANK}(t) = 1 + \big| \{ v \in \text{vals}(p(t)) \mid v > t.\text{val} \} \big|
$$

```text
Visual ASCII Transformation: GROUP BY Hydraulic Compactor vs Window Function Catwalk:

Input Table: employees(id, dept, salary)
  id | dept  | salary
  ---+-------+-------
   1 | Eng   | 150000
   2 | Eng   | 120000
   3 | Sales | 100000
   4 | Sales |  80000

Approach 1: GROUP BY dept, AVG(salary)  (Hydraulic Compactor):
  dept  | avg_salary
  ------+-----------
  Eng   | 135000     <- CRUSHED! Individual names, IDs, and salaries are PERMANENTLY DESTROYED!
  Sales |  90000
  Output Rows = 2  (Cardinality reduced from 4 to 2!)

Approach 2: Window Function AVG(salary) OVER (PARTITION BY dept)  (Glass Catwalk):
  id | dept  | salary | dept_avg | gap_to_avg
  ---+-------+--------+----------+-----------
   1 | Eng   | 150000 |   135000 |   +15000   <- Every individual row is preserved!
   2 | Eng   | 120000 |   135000 |   -15000   <- Every employee gets the cohort metric!
   3 | Sales | 100000 |    90000 |   +10000
   4 | Sales |  80000 |    90000 |   -10000
  Output Rows = 4  (Strict 1-to-1 Bijective Cardinality Preservation!)
```

### Mathematical Invariants & Symbol Breakdown

| الرمز / Symbol | المجال والتعريف الرياضي / Mathematical Domain | الدور الهندسي والمعماري / Data Engineering & Architectural Role | الشرح الدقيق بالعربية / Arabic Explanation |
| :--- | :--- | :--- | :--- |
| $R$ | Active relation stream | Tuple stream reaching Step 5 ($\pi_{\text{SELECT}}$) in query execution | تيار السجلات النشط الواصل لمرحلة الإسقاط في الاستعلام |
| $p(t)$ | Partition projection function | Evaluates partition key mapping tuples into disjoint subsets $\mathcal{P}_k$ | دالة إسقاط مفتاح التقسيم التي تجزئ السجلات لمجموعات منفصلة |
| $\text{Frame}(t)$ | Sliding window subset | Bounded set of tuples visible to tuple $t$ for localized aggregation | الإطار الانزلاقي للصفوف المرئية للصف الحالي لحساب المقياس |
| $\mathcal{W}_f(t)$ | Analytic scalar function | Value appended as a new column attribute to tuple $t$ | القيمة العددية التحليلية المحسوبة والمضافة كعمود جديد للصف |
| $\text{vals}(p(t))$ | Ordered partition domain | Set of distinct scalar values present in partition $p(t)$ | مجموعة القيم الفريدة المرتبة الموجودة داخل نفس القسم |
| $\text{DENSE\_RANK}$ | Dense ranking sequence | Strict consecutive integers: $1, 2, 2, 3$ (no gaps after ties) | ترقيم ترتيبي متصل دون فجوات عند تكرار نفس القيمة |
| $\text{RANK}$ | Sparse ranking sequence | Gap-introducing integers: $1, 2, 2, 4$ (leaves gap equal to tied count) | ترقيم ترتيبي يترك فجوات مساوية لعدد القيم المكررة |

#### Step-by-Step Arithmetic Cost & Invariant Breakdown:
1. **Self-Join vs Window Streaming Complexity**:
   - **Self-Join Pipeline**:
     $$\text{Cost} = \text{Scan}_1(N) + \text{Aggregate}(N) + \text{Materialize Hash Table}(|\mathcal{K}|) + \text{Scan}_2(N) + \text{Join Probe}(N)$$
     For $N = 20,000,000$ and $120\text{ GB}$ state, this spills to disk and requires **45 minutes**.
   - **Window Pipeline**:
     $$\text{Cost} = \text{Sort by Partition}(N \log N) + \text{Streaming Scan}(N)$$
     Keeps running metrics in $\mathcal{O}(1)$ register accumulator memory $\implies$ **5.8 seconds (a 465x acceleration!)**.
2. **Cardinality Bijective Mapping Invariant**:
   $$|\text{Output}| \equiv |R|$$
   A window function never adds, duplicates, or destroys rows.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-sql-window-functions"}
---
timeout_ms: 3000
test_cases:
  - input: "SELECT emp_id, DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS rnk FROM employees"
    expected: "VALID_JOIN_PLAN"
  - input: "SELECT emp_name, MAX(salary) OVER (PARTITION BY dept_name) AS max_sal FROM employees"
    expected: "VALID_JOIN_PLAN"
---
```sql
-- Formulate a DuckDB SQL query computing DENSE_RANK() and max salary gap
-- across departmental partitions.
-- Schema: employees(emp_id, dept_name, emp_name, salary)

SELECT
    emp_id,
    dept_name,
    emp_name,
    salary,
    DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS dept_salary_rank,
    ROUND(MAX(salary) OVER (PARTITION BY dept_name) - salary, 2) AS salary_gap_to_max
FROM employees
ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC;
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
A national payroll auditing platform processes 20,000,000 employee records to identify salary anomalies by comparing each worker's wage against their regional department median. A legacy query computes this by self-joining the 20-million-row `employees` table against a pre-aggregated subquery (`SELECT dept, region, MEDIAN(salary) FROM employees GROUP BY dept, region`). The query runs for 45 minutes, saturates the CPU, and spills 120 GB of intermediate state to disk before crashing. When refactored to use `MEDIAN(salary) OVER (PARTITION BY dept, region)`, the query completes in 5.8 seconds using under 800 MB of RAM. Why does the window function execute over 450x faster?

تقوم منصة وطنية لتدقيق الرواتب بمعالجة 20,000,000 سجل وظيفي لرصد الشذوذ في الأجور عبر مقارنة راتب كل موظف بالوسيط الإحصائي لمنطقته وقسمه. اعتمد استعلام قديم على إجراء ربط ذاتي بين جدول الموظفين (20 مليون صف) واستعلام فرعي مجمع عبر `GROUP BY`. استغرق الاستعلام 45 دقيقة وأهدر موارد الخادم وسكب 120 جيجابايت على القرص المؤقت قبل أن ينهار. عند إعادة كتابة الاستعلام باستخدام الدالة النافذية `MEDIAN(salary) OVER (PARTITION BY dept, region)`، انتهى الحساب كاملاً في 5.8 ثوانٍ مستهلكاً أقل من 800 ميجابايت من الذاكرة! لماذا تتفوق الدالة النافذية بأكثر من 450 ضعفاً؟

### Transfer Assessment Question
- **(A)** *(Correct)* Window functions sort and stream the dataset in a single linear pass over partition buffers in memory without materializing expensive $O(N^2)$ Cartesian self-joins or intermediate disk spool files.
  - *Arabic:* تفرز الدوال النافذية البيانات وتمر عليها في مسار خطي واحد في الذاكرة عبر مخازن الأقسام دون الحاجة إلى الربط الذاتي المكلف أو كتابة جداول وسيطة ضخمة على القرص.
- **(B)** Window functions automatically bypass the database query optimizer and execute directly in C++ machine code.
  - *Arabic:* تتجاوز الدوال النافذية محسن الاستعلامات وتنفذ مباشرة كشفرة آلة بلغة C++.
- **(C)** DuckDB stores window functions in a distributed Redis key-value cache cluster.
  - *Arabic:* تخزن DuckDB نتائج الدوال النافذية في عنقود ذاكرة تخزين مؤقت Redis خارجي.
- **(D)** Self-joins delete the table's primary keys, whereas window functions preserve them.
  - *Arabic:* يقوم الربط الذاتي بحذف المفاتيح الأساسية للجدول، بينما تحافظ الدوال النافذية عليها.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
- **Why Option (A) is correct:** Self-joining a 20-million-row table against an aggregated subquery forces the query engine to scan the base table twice, materialize an intermediate hash table of groups, and perform an expensive hash or merge join that spills to temporary disk storage when RAM is exhausted. In contrast, a window function sorts the table once by `(dept, region)` in $O(N \log N)$ time, maintains running accumulators in memory, and evaluates the window metric in a single streaming pass without allocating intermediate cross-product buffers.
- **Why Option (B) is incorrect:** Window functions are standard relational operators parsed and planned by the database query optimizer like any other SQL construct.
- **Why Option (C) is incorrect:** DuckDB is an embedded in-process database; it operates entirely in local memory and has no dependency on Redis or external caching servers.
- **Why Option (D) is incorrect:** Read-only joins never delete primary keys or mutate table constraints.

*التفسير الهندسي المعمق وتحليل الخيارات:*
- **لماذا الخيار (A) صحيح:** إجراء ربط ذاتي لجدول يضم 20 مليون صف مع استعلام فرعي يجبر المحرك على مسح الجدول مرتين، وبناء جدول تجزئة وسيط في الذاكرة، ثم إجراء عملية ربط مكلفة تسكب البيانات على القرص عند امتلاء RAM. أما الدالة النافذية فتفرز البيانات مرة واحدة فقط حسب حقول التقسيم بزمن $O(N \log N)$، وتحتفظ بمجمعات إحصائية سريعة في الذاكرة، ثم تمر على الصفوف في مسار تدفق خطي واحد مخرجة النتائج فوراً دون أي جداول وسيطة على القرص.
- **لماذا الخيار (B) خاطئ:** تخضع الدوال النافذية لتحليل وتخطيط محسن الاستعلامات القياسي كأي جزء آخر في لغة SQL ولا تتجاوزه.
- **لماذا الخيار (C) خاطئ:** محرك DuckDB هو محرك داخلي مدمج في نفس المعالجة (In-process) ويعمل في الذاكرة المحلية دون أي اتصال بخوادم Redis الخارجية.
- **لماذا الخيار (D) خاطئ:** استعلامات القراءة والربط لا تعدل قيود الجداول ولا تحذف المفاتيح الأساسية أبداً.
