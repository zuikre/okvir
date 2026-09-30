---
id: "columnar-storage-parquet"
version: "1.0.0"
title: "Common Table Expressions & Recursive CTEs"
track: "programming"
module: "mod-17"
estimated_minutes: 15
prerequisites: ["numpy-strides-indexing", "sql-indexing-query-plans"]
i18n:
  ar: "التعبيرات الجدولية العامة (CTEs) والاستعلامات الذاتية العودية (Recursive CTEs)"
---

# Common Table Expressions & Recursive CTEs

Have you ever tried to read a 200-line SQL query written by someone else, where subqueries are nested inside subqueries inside subqueries 7 levels deep? It looks like an incomprehensible nightmare of parentheses.

A Common Table Expression (CTE)—defined using the simple keyword WITH—allows you to name temporary intermediate result tables and read your query cleanly from top to bottom, like chapters in a novel:
sql
WITH RawSales AS (...),
CleanSales AS (SELECT  FROM RawSales WHERE ...),
DepartmentTotals AS (SELECT ... FROM CleanSales GROUP BY ...)
SELECT  FROM DepartmentTotals;

:::simulation-widget{engine="canvas2d" component="RecursiveCteGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
R_0 = \text{AnchorQuery}(\mathcal{D})
$$

هل حاولت يوماً قراءة استعلام SQL يمتد لمئات الأسطر وفيه استعلامات فرعية متداخلة داخل بعضها سبع مرات؟ إنه كابوس حقيقي يعمي الأبصار.
التعبير الجدولي العام (CTE)—الذي يبدأ بالكلمة البسيطة WITH—يتيح لك تسمية الجداول المؤقتة الوسيطة وقراءة استعلامك بسلاسة وترتيب من الأعلى للأسفل كفصول كتاب منظم.
وماذا عن الاستعلام العودي (Recursive CTE)؟
إن لغة SQL العادية لغة مسطحة تعجز عن تتبع الهياكل الشجرية المعقدة (مثل: إيجاد الموظف، ومديره، ومدير مديره، وصولاً للمدير التنفيذي).
يحقق الاستعلام العودي هذا الإنجاز عبر ركائز الاستدعاء الذاتي:
1. عضو المرساة (Anchor Member): الاستعلام التأسيسي الذي ي

:::python-challenge{id="py-columnar-storage-parquet"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import duckdb

def test_sql_recursive_tree():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE org_chart (emp_id INT, emp_name VARCHAR, manager_id INT);
        INSERT INTO org_chart VALUES
            (1, 'Alice', NULL),
            (2, 'Bob', 1),
            (3, 'Charlie', 2),
            (4, 'Diana', 1);
    """)
    
    query = """
        WITH RECURSIVE hierarchy AS (
            SELECT
                emp_id,
                emp_name,
                0 AS depth,
                CAST(emp_name AS VARCHAR) AS path
            FROM org_chart
            WHERE manager_id IS NULL

            UNION ALL

            SELECT
                child.emp_id,
                child.emp_name,
                parent.depth + 1 AS depth,
                parent.path || ' -> ' || child.emp_name AS path
            FROM org_chart child
            JOIN hierarchy parent ON child.manager_id = parent.emp_id
        )
        SELECT emp_id, emp_name, depth, path
        FROM hierarchy
        ORDER BY depth ASC, path ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 4
    assert rows[0] == (1, 'Alice', 0, 'Alice')
    assert rows[1] == (2, 'Bob', 1, 'Alice -> Bob')
    assert rows[2] == (4, 'Diana', 1, 'Alice -> Diana')
    assert rows[3] == (3, 'Charlie', 2, 'Alice -> Bob -> Charlie')
    
    print("ALL TESTS PASSED for sql-recursive-org-tree")

if __name__ == "__main__":
    test_sql_recursive_tree()
```
:::
