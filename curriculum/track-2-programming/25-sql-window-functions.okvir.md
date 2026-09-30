---
id: "sql-window-functions"
version: "1.0.0"
title: "SQL Declarative Execution Lifecycle"
track: "programming"
module: "mod-16"
estimated_minutes: 15
prerequisites: ["sql-aggregations-group-by"]
i18n:
  ar: "دورة حياة التنفيذ التقريري في SQL (من المخطط المنطقي إلى التنفيذ الفعلي)"
---

# SQL Declarative Execution Lifecycle

When you write a SQL query, what is the very first word you write? 
Almost always, the word is: SELECT.

Now here is the shocking truth that trips up every beginner: When the database actually runs your query, SELECT is almost the LAST thing it executes!

SQL is a Declarative Language. You describe the destination, not the highway. 
Because of this, the order in which you write SQL (its Lexical Order) is totally backwards from the order in which the database engine executes it (its Physical Execution Lifecycle).

The real execution lifecycle flows through these exact stages:
1.

:::simulation-widget{engine="canvas2d" component="RelationalJoinGeometryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Result} = \left( \lambda_{\text{LIMIT}} \circ \omega_{\text{ORDER}} \circ \delta_{\text{DISTINCT}} \circ \pi_{\text{SELECT}} \circ \sigma_{\text{HAVING}} \circ \gamma_{\text{GROUP}} \circ \sigma_{\text{WHERE}} \circ \bowtie_{\text{FROM}} \right) (\mathcal{D})
$$

عندما تكتب استعلام SQL، ما هي أول كلمة تكتبها عادة؟
دائماً تقريباً هي كلمة: SELECT.
والآن إليك الحقيقة الصادمة التي يجهلها معظم المبتدئين: عندما يبدأ محرك قاعدة البيانات في تنفيذ استعلامك، فإن مرحلة SELECT هي آخر ما ينفذه تقريباً!
لغة SQL هي لغة تقريرية (Declarative Language)؛ أنت تخبر النظام بوجهتك النهائية، ولا تخبره بالطريق الفيزيائي الذي سيسلكه.
لذلك، فإن الترتيب الذي تكتب به الاستعلام يختلف تماماً عن دورة حياة التنفيذ الفعلية لمحرك الاستعلامات:
1. FROM و JOIN: أولاً، تحديد الجداول المستهدفة وربطها معاً.
2. WHERE: تصفية واستبعاد الصفوف غير المطابقة فوراً قبل أ

:::python-challenge{id="py-sql-window-functions"}
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

def test_sql_case_pivot():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE sales (dept_name VARCHAR, sale_date DATE, revenue DOUBLE);
        INSERT INTO sales VALUES
            ('Electronics', '2024-01-15', 100.0), -- Q1
            ('Electronics', '2024-05-10', 200.0), -- Q2
            ('Electronics', '2024-11-20', 300.0), -- Q4
            ('Electronics', '2023-11-20', 999.0), -- 2023 (Excluded)
            ('Furniture',   '2024-02-10', 150.0); -- Q1
    """)
    
    query = """
        SELECT
            dept_name,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 1 THEN revenue ELSE 0 END), 2) AS q1_revenue,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 2 THEN revenue ELSE 0 END), 2) AS q2_revenue,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 3 THEN revenue ELSE 0 END), 2) AS q3_revenue,
            ROUND(SUM(CASE WHEN EXTRACT(QUARTER FROM sale_date) = 4 THEN revenue ELSE 0 END), 2) AS q4_revenue,
            ROUND(SUM(revenue), 2) AS annual_total
        FROM sales
        WHERE EXTRACT(YEAR FROM sale_date) = 2024
        GROUP BY dept_name
        ORDER BY annual_total DESC, dept_name ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 2
    assert rows[0] == ('Electronics', 100.0, 200.0, 0.0, 300.0, 600.0)
    assert rows[1] == ('Furniture', 150.0, 0.0, 0.0, 0.0, 150.0)
    
    print("ALL TESTS PASSED for sql-case-pivot-agg")

if __name__ == "__main__":
    test_sql_case_pivot()
```
:::
