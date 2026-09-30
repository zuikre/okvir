---
id: "sql-ctes-recursive-queries"
version: "1.0.0"
title: "Window Functions & Analytic Partitioning"
track: "programming"
module: "mod-16"
estimated_minutes: 15
prerequisites: ["sql-window-functions"]
i18n:
  ar: "دوال النوافذ (Window Functions) والتقسيم التحليلي"
---

# Window Functions & Analytic Partitioning

In standard SQL, if you want to compute an aggregate—like the average company salary—using GROUP BY, something destructive happens: all individual employee rows collapse into a single summary row! You lose the ability to see who individual employees are.

What if you want to answer a question like:
"Show me every employee's name, their salary, AND alongside each person, display the average salary of their specific department so they can compare?"

Standard GROUP BY cannot do this without clumsy, slow self-joins.
To solve this, SQL introduced Window Functions.
A window function pe

:::simulation-widget{engine="canvas2d" component="WindowFunctionFrameLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
R = \bigsqcup_{k \in \mathcal{K}} \mathcal{P}_k \quad \text{where} \quad \mathcal{P}_k = \{ t \in R \mid p(t) = k \}
$$

في استعلامات SQL التقليدية، عندما نستخدم GROUP BY لحساب متوسط رواتب الشركة، يحدث أمر مدمر لبياناتك: تنهار جميع أسطر الموظفين الفردية وتتلاشى لتنكمش في سطر تلخيصي واحد فقط! تفقد القدرة على رؤية أسماء الموظفين وبياناتهم الفردية.
ولكن ماذا لو أردت الإجابة عن سؤال مثل:
"اعرض لي اسم كل موظف، وراتبه الفعلي، وإلى جانب كل شخص ضع متوسط رواتب قسمه للمقارنة؟"
يعجز GROUP BY التقليدي عن فعل ذلك دون استعلامات فرعية مكررة وبطيئة.
هنا يكمن سحر دوال النوافذ (Window Functions).
تقوم دالة النافذة بإجراء حسابات إحصائية عبر مجموعة من الصفوف المرتبطة، ولكنها تحافظ تماماً على هوية كل صف بمفرده دون أن

:::python-challenge{id="py-sql-ctes-recursive-queries"}
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

def test_sql_window_rank():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE employees (emp_id INT, dept_name VARCHAR, emp_name VARCHAR, salary DOUBLE);
        INSERT INTO employees VALUES
            (1, 'Eng', 'Alice', 100000.0),
            (2, 'Eng', 'Bob',   100000.0), -- Tie for 1st
            (3, 'Eng', 'Carol',  80000.0), -- 2nd in DENSE_RANK
            (4, 'Mkt', 'Dave',   90000.0);
    """)
    
    query = """
        SELECT
            emp_id,
            dept_name,
            emp_name,
            salary,
            DENSE_RANK() OVER (
                PARTITION BY dept_name 
                ORDER BY salary DESC
            ) AS dept_salary_rank,
            ROUND(
                MAX(salary) OVER (PARTITION BY dept_name) - salary, 
                2
            ) AS salary_gap_to_max
        FROM employees
        ORDER BY dept_name ASC, dept_salary_rank ASC, salary DESC, emp_id ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert len(rows) == 4
    # Check Eng partition
    assert rows[0][:5] == (1, 'Eng', 'Alice', 100000.0, 1)
    assert rows[0][5] == 0.0
    assert rows[1][:5] == (2, 'Eng', 'Bob', 100000.0, 1)
    assert rows[1][5] == 0.0
    assert rows[2][:5] == (3, 'Eng', 'Carol', 80000.0, 2), "DENSE_RANK must assign 2 to Carol, not 3!"
    assert rows[2][5] == 20000.0
    
    print("ALL TESTS PASSED for sql-window-dense-rank")

if __name__ == "__main__":
    test_sql_window_rank()
```
:::
