---
id: "sql-ctes-recursive-queries"
version: "1.0.0"
title: "Window Functions & Analytic Partitioning"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["sql-window-functions"]
i18n:
  ar: "دوال النوافذ (Window Functions) والتقسيم التحليلي"
---

# Window Functions & Analytic Partitioning

## Beat 1: Intuition & Mental Model

Standard SQL `GROUP BY` is like a heavy hydraulic trash compactor: it takes 1,000 individual employee rows in the Engineering department and squashes them into a single summary dot: `("Engineering", 1000, 125000)`. The names, individual salaries, and hire dates of all 1,000 employees are permanently destroyed from the output!

What if you need to calculate each employee's salary rank or compare their pay to the department maximum, *while still keeping every individual employee's row visible*?
Enter **Window Functions** (`OVER (PARTITION BY ...)`).

### The Glass Observation Gallery Analogy
Imagine an elevated glass catwalk suspended above a buzzing trading floor:
- The trading analysts remain sitting at their desks, working uninterrupted. Every single employee's row remains completely untouched.
- An auditor walks along the glass observation walkway above.
- The auditor looks down through a transparent glass frame (`OVER`), groups the desks by department (`PARTITION BY dept_name`), sorts them by compensation (`ORDER BY salary DESC`), and writes down their ranking (`DENSE_RANK()`) alongside each person's desk.

You get rich, multi-tiered aggregate analytics **without losing a single row of granular data**!

:::simulation-widget{engine="canvas2d" component="WindowFunctionFrameLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تعتبر عملية التجميع التقليدية `GROUP BY` في SQL كأنها مكبس نفايات هيدروليكي: تأخذ 1,000 موظف في قسم الهندسة وتضغطهم في سطر ملخص واحد: `("الهندسة"، 1000، 125000)`. فتختفي أسماء وتفاصيل ورواتب أولئك الموظفين الـ 1,000 تماماً من الناتج!

ماذا لو أردت حساب ترتيب كل موظف أو مقارنة راتبه بأعلى راتب في قسمه، *مع الإبقاء على كل صف فردي كما هو دون حذفه*؟
هنا يأتي دور **الدوال النافذية (Window Functions)** عبر العبارة السحرية `OVER (PARTITION BY ...)`.

### تشبيه شرفة المراقبة الزجاجية المعلقة
تخيل ممشى زجاجياً مرتفعاً معلقاً فوق قاعة تداول كبرى:
- يبقى كل متداول جالساً في مكتبه، وتظل تفاصيل كل صف محفوظة بالكامل دون أي ضغط أو حذف.
- يمشي مشرف التدقيق على الممشى الزجاجي في الأعلى.
- ينظر المشرف عبر نافذة زجاجية (`OVER`)، ويقسم المكاتب ذهنياً حسب القسم (`PARTITION BY dept_name`)، ويرتبهم حسب الراتب (`ORDER BY salary DESC`)، ثم يسجل ترتيب كل فرد (`DENSE_RANK()`) والفارق بين راتبه وأعلى راتب في القسم بجانب اسمه.

تحصل على مؤشرات تجميعية وتحليلية عميقة **دون التضحية بأي صف أو تفصيلة دقيقة في البيانات**!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\mathcal{W}_f(t) = f\Big( \big\{ s \in R \mid p(s) = p(t) \land s \in \text{Frame}(t) \big\} \Big), \quad \text{DENSE\_RANK}(t) = 1 + \big| \{ v \in \text{vals}(p(t)) \mid v > t.\text{val} \} \big|
$$

### Mathematical Invariants & Symbol Breakdown

The formal definitions characterize the non-reductive nature of window calculations:

- **$R$**: Active relation stream entering Step 5 ($\pi_{\text{SELECT}}$) of the execution lifecycle.
- **$p(t)$**: Partition hash key (e.g., `dept_name`), dividing relation into disjoint subsets $\mathcal{P}_k$.
- **$\text{Frame}(t)$**: Ordered subset of rows visible to tuple $t$ dictated by the window framing specification.
- **$\mathcal{W}_f(t)$**: Analytic scalar value appended to tuple $t$ as an additional projected attribute.
- **Row Preservation Invariant**: $|\text{Output}| = |R|$, ensuring exactly one output row per input row.
- **DENSE_RANK vs. RANK**: `DENSE_RANK` produces consecutive integer ranks ($1, 2, 2, 3$) upon ties; `RANK` introduces gaps ($1, 2, 2, 4$).

### الشرح الرياضي وتفصيل الرموز

توضح الصياغة الرياضية الطبيعة غير الاختزالية للعمليات النافذية:
- **$R$**: تيار السجلات النشط الواصل لمرحلة الإسقاط في خطة الاستعلام.
- **$p(t)$**: مفتاح التجزئة الفئوي (مثل اسم القسم) الذي يقسم السجلات إلى مجموعات منفصلة.
- **$\text{Frame}(t)$**: الإطار المرئي للصف الحالي بناءً على شروط الترتيب والحدود.
- **$\mathcal{W}_f(t)$**: القيمة العددية المحسوبة والمضافة كخاصية جديدة للصف.
- **ثابت الحفاظ على الصفوف**: عدد الصفوف الناتجة يساوي بالضبط عدد صفوف المدخلات دون أي تقليص.
- **الفرق بين DENSE_RANK و RANK**: ينتج DENSE_RANK أرقاماً متتالية بلا فجوات عند التعادل ($1, 2, 2, 3$)، بينما يترك RANK فجوة ($1, 2, 2, 4$).

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-sql-ctes-recursive-queries"}
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
    -- Step 1: Base columns emp_id, dept_name, emp_name, salary
    -- Step 2: Departmental salary rank:
    --         DENSE_RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS dept_salary_rank
    -- Step 3: Difference between maximum departmental salary and current employee salary:
    --         ROUND(MAX(salary) OVER (PARTITION BY dept_name) - salary, 2) AS salary_gap_to_max
FROM employees
-- Step 4: ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC
;
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
A payroll auditing system across 20,000,000 employee records compares each worker's pay to their regional cohort median. The legacy query self-joins the table against a `GROUP BY region` subquery, taking 45 minutes and spilling 120 GB to disk. Why does rewriting this query with `OVER (PARTITION BY region)` finish in under 6 seconds?

نظام تدقيق رواتب يضم 20 مليون موظف يقارن راتب كل فرد بمتوسط منطقته. يستخدم الاستعلام القديم ربطاً ذاتياً مع استعلام فرعي `GROUP BY`، فيستغرق 45 دقيقة ويستهلك 120 جيجابايت على القرص المؤقت. لماذا ينتهي نفس الحساب في أقل من 6 ثوانٍ عند إعادة كتابته باستخدام `OVER (PARTITION BY region)`؟

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
Self-joining against aggregated subqueries forces the engine to hash or sort the table twice and perform an expensive nested loop or hash join. A window function sorts once by partition key and streams aggregate accumulators in $O(N \log N)$ time.

*التفسير الهندسي المعمق:*
الربط الذاتي يجبر المحرك على فرز وتجزئة الجدول مرتين وإجراء عملية دمج مكلفة. بينما تفرز الدالة النافذية البيانات مرة واحدة وتحسب التجميعات عبر تدفق الذاكرة بزمن $O(N \log N)$.
