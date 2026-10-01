---
id: "sql-window-functions"
version: "1.0.0"
title: "SQL Declarative Execution Lifecycle"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["sql-aggregations-group-by"]
i18n:
  ar: "دورة حياة التنفيذ التقريري في SQL (ترتيب المعالجة الداخلي)"
---

# SQL Declarative Execution Lifecycle

## Beat 1: Intuition & Mental Model

You write SQL queries in one order, but the database engine executes them in a completely different order!
When you write SQL, you start with `SELECT`:
```sql
SELECT dept, SUM(sales) AS total FROM transactions WHERE total > 100 GROUP BY dept; -- ERROR!
```
Why does this fail with *"Column 'total' does not exist"*? Because `SELECT` does not run first!

### The Restaurant Kitchen Analogy: Visual Order vs. Cooking Order
Imagine a gourmet restaurant:
1. **`FROM` & `JOIN` (Unload from Pantry)**: The kitchen staff brings the raw sacks of potatoes and meat into the kitchen.
2. **`WHERE` (Rinse and Discard Bad Vegetables)**: The chef discards rotten vegetables before doing anything else.
3. **`GROUP BY` (Chop into Separate Cooking Pots)**: Ingredients are divided into distinct pots (e.g., Stew pot, Soup pot).
4. **`HAVING` (Taste the Simmering Broth)**: The chef tastes the whole pot: *"Is this stew thick enough?"*
5. **`SELECT` (Plating and Garnishing)**: Only now does the chef place the food on a ceramic plate, adding a fancy label tag (`AS total`).
6. **`ORDER BY` (Arranging the Serving Tray)**: Plates are arranged from hottest to coldest.
7. **`LIMIT` (Serving the First Guests)**: The waiter carries out the first 5 dishes.

You cannot filter by a garnish label in `WHERE` because the vegetables haven't even been washed yet!

:::simulation-widget{engine="canvas2d" component="RelationalJoinGeometryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

أنت تكتب استعلام SQL بترتيب معين، لكن محرك قواعد البيانات ينفذه بترتيب فيزيائي مختلف تماماً!
عند كتابة الاستعلام، تبدأ عادةً بـ `SELECT`:
```sql
SELECT dept, SUM(sales) AS total FROM transactions WHERE total > 100 GROUP BY dept; -- خطأ!
```
لماذا يفشل هذا الاستعلام برسالة *"العمود total غير موجود"*؟ لأن `SELECT` لا تنفذ أولاً!

### تشبيه مطبخ المطعم: الترتيب البصري مقابل ترتيب الطهي الفعلي
تخيل مطبخاً فاخراً يعد وجبات العشاء:
1. **`FROM` و `JOIN` (جلب المكونات من المستودع)**: يُحضر العمال أكياس اللحم والخضار الخام إلى المطبخ.
2. **`WHERE` (غسل واستبعاد الخضار التالفة)**: يستبعد الطاهي الخضار الفاسدة فوراً قبل تقطيعها.
3. **`GROUP BY` (التوزيع في قدور الطهي)**: تُوزع المكونات في قدور مستقلة (قدر الحساء، قدر اللحم).
4. **`HAVING` (تذوق مرق القدر ككل)**: يتذوق الطاهي القدر كاملاً: *"هل كمية الملح في هذا القدر كافية؟"*.
5. **`SELECT` (سكب الطعام وتزيين الطبق)**: هنا فقط يُسكب الطعام في أطباق التقديم وتوضع بطاقة الاسم التزيينية (`AS total`).
6. **`ORDER BY` (ترتيب أطباق صينية التقديم)**: تُرتب الأطباق تصاعدياً أو تنازلياً.
7. **`LIMIT` (تقديم أول وجبات للزبائن)**: يخرج النادل بأول 5 أطباق جاهزة.

يستحيل تصفية الخضار في خطوة `WHERE` بناءً على بطاقة تزيين الطبق التي لم تُصنع إلا في `SELECT`!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\text{Pipeline}(\mathcal{D}) = (\lambda_{\text{LIMIT}} \circ \omega_{\text{ORDER}} \circ \delta_{\text{DISTINCT}} \circ \pi_{\text{SELECT}} \circ \sigma_{\text{HAVING}} \circ \gamma_{\text{GROUP}} \circ \sigma_{\text{WHERE}} \circ \bowtie_{\text{FROM}})(\mathcal{D})
$$

### Mathematical Invariants & Symbol Breakdown

The algebraic composition operator $\circ$ formalizes the exact physical execution order:

1. **$\bowtie_{\text{FROM}}$**: Resolves source tables, evaluates join trees, and materializes candidate records.
2. **$\sigma_{\text{WHERE}}$**: Filters scalar rows before grouping. *Cannot reference aliases defined in $\pi_{\text{SELECT}}$.*
3. **$\gamma_{\text{GROUP}}$**: Aggregates records into partition buckets by grouping expressions.
4. **$\sigma_{\text{HAVING}}$**: Discards entire partition buckets based on aggregate criteria.
5. **$\pi_{\text{SELECT}}$**: Evaluates projections, window functions, and binds output column aliases.
6. **$\delta_{\text{DISTINCT}}$**: Eliminates duplicate projection tuples from the active stream.
7. **$\omega_{\text{ORDER}}$**: Sorts the finalized projected rows (can reference aliases bound in $\pi_{\text{SELECT}}$).
8. **$\lambda_{\text{LIMIT}}$**: Slices top-$K$ rows from the stream before returning to client.

### الشرح الرياضي وتفصيل الرموز

يوضح تركيب الدوال الرياضي $\circ$ الترتيب الفيزيائي الدقيق للتنفيذ:
1. **$\bowtie_{\text{FROM}}$**: جلب الجداول وتنفيذ شجرة الربط وإنتاج السجلات الأولية.
2. **$\sigma_{\text{WHERE}}$**: تصفية الصفوف الفردية قبل التجميع (لا يمكنها قراءة أسماء أعمدة SELECT).
3. **$\gamma_{\text{GROUP}}$**: تجميع الصفوف في سلال مستقلة حسب حقول التجميع.
4. **$\sigma_{\text{HAVING}}$**: تصفية وحذف سلال المجموعات بناءً على نتائج المقاييس.
5. **$\pi_{\text{SELECT}}$**: حساب التعبيرات وإطلاق الأسماء المستعارة Aliases.
6. **$\delta_{\text{DISTINCT}}$**: إزالة الصفوف المكررة من تيار المخرجات.
7. **$\omega_{\text{ORDER}}$**: ترتيب الصفوف النهائية (يمكنها استخدام الأسماء المعرفة في SELECT).
8. **$\lambda_{\text{LIMIT}}$**: اقتطاع أول عدد محدد من الصفوف لإرجاعها للمستخدم.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-sql-window-functions"}
---
timeout_ms: 3000
test_cases:
  - input: "SELECT dept_name, SUM(revenue) AS annual_total FROM sales WHERE EXTRACT(YEAR FROM sale_date) = 2024 GROUP BY dept_name ORDER BY annual_total DESC"
    expected: "VALID_JOIN_PLAN"
  - input: "SELECT dept_name, SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END) AS q1 FROM sales GROUP BY dept_name"
    expected: "VALID_JOIN_PLAN"
---
```sql
-- Formulate a DuckDB SQL query pivoting sales into quarterly columns
-- using conditional aggregation CASE WHEN expressions.
-- Schema: sales(sale_id, dept_name, sale_date, revenue)

SELECT
    -- Step 1: dept_name
    -- Step 2: Pivoted quarters:
    --         ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue
    -- Step 3: Compute q2_revenue, q3_revenue, q4_revenue, and ROUND(SUM(revenue), 2) AS annual_total
FROM sales
-- Step 4: Filter sales in 2024: WHERE EXTRACT(YEAR FROM sale_date) = 2024
-- Step 5: GROUP BY dept_name
-- Step 6: ORDER BY annual_total DESC, dept_name ASC
;
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
A database query fails with: `SELECT region, SUM(amount) AS regional_rev FROM sales WHERE regional_rev > 50000 GROUP BY region;` -> `Error: column 'regional_rev' does not exist`. Yet `ORDER BY regional_rev DESC` works without error. How does the declarative execution lifecycle explain this?

يفشل استعلام بالرسالة: `SELECT region, SUM(amount) AS regional_rev FROM sales WHERE regional_rev > 50000 GROUP BY region;` -> `العمود regional_rev غير موجود`. بينما تعمل عبارة `ORDER BY regional_rev DESC` بنجاح تام. كيف تفسر دورة حياة التنفيذ التقريري هذا التناقض الظاهري؟

### Transfer Assessment Question
- **(A)** *(Correct)* `WHERE` executes at Step 2 before `SELECT` creates the alias `regional_rev` at Step 5; whereas `ORDER BY` executes at Step 7 after `SELECT`, allowing it to consume bound projection aliases.
  - *Arabic:* ينفذ `WHERE` في الخطوة 2 قبل أن تُنشئ `SELECT` الاسم المستعار في الخطوة 5؛ بينما ينفذ `ORDER BY` في الخطوة 7 بعد `SELECT` مما يتيح له قراءة الأسماء المستعارة بسهولة.
- **(B)** `regional_rev` is an encrypted identifier that can only be decrypted during the final sorting phase.
  - *Arabic:* الاسم المستعار معرف مشفر لا يمكن فك تشفيره إلا في مرحلة الترتيب النهائية.
- **(C)** The SQL database driver only compiles queries when `regional_rev` contains uppercase letters.
  - *Arabic:* يقوم محرك قواعد البيانات بترجمة الاستعلامات فقط عندما تحتوي الأسماء المستعارة على حروف كبيرة.
- **(D)** `ORDER BY` is executed in the user's web browser, while `WHERE` runs on the database server.
  - *Arabic:* تُنفذ عبارة `ORDER BY` داخل متصفح المستخدم، بينما تُنفذ `WHERE` على خادم قواعد البيانات.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
Because the execution order is `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY`, aliases defined in `SELECT` are completely invisible to `WHERE`. Post-aggregate filtering must use `HAVING SUM(amount) > 50000`.

*التفسير الهندسي المعمق:*
لأن الترتيب الداخلي هو `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY`، تكون الأسماء المستعارة في SELECT غير مرئية تماماً لـ WHERE. والتصفية الصحيحة تتطلب `HAVING SUM(amount) > 50000`.
