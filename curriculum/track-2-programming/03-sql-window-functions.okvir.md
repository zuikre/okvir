---
id: "sql-window-functions"
version: "1.0.0"
title: "Analytical SQL & Window Partitions"
track: "programming"
module: "module-03"
estimated_minutes: 8
prerequisites: ["pandas-dataframe"]
i18n:
  ar: "SQL التحليلي ودوال النوافذ المقسمة"
---

# Analytical SQL & Window Partitions

Unlike standard `GROUP BY` aggregations which collapse rows, SQL window functions calculate moving or comparative metrics while preserving the underlying row identity.

:::simulation-widget{engine="canvas2d" component="SimpsonsParadoxLab"}
---
mode: "sql_table_partitions"
---
:::

The window specification establishes an ordered frame partition over a virtual cursor:

$$
f(\text{val}) \text{ OVER } (\text{PARTITION BY } c_1 \text{ ORDER BY } c_2)
$$

:::python-challenge{id="sql-window"}
---
timeout_ms: 3000
test_cases:
  - input: "SELECT department_id, employee_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank FROM employees;"
    expected: "Correctly ranked partitions"
---
```python
-- TODO: Write an analytical window query ranking employees by salary within each department
SELECT 
    department_id,
    employee_id,
    salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank
FROM employees;
```
:::
