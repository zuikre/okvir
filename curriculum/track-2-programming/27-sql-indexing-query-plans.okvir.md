---
id: "sql-indexing-query-plans"
version: "1.0.0"
title: "Positional Window Offsets, Ranking & Frame Bounds"
track: "programming"
module: "mod-16"
estimated_minutes: 15
prerequisites: ["sql-ctes-recursive-queries"]
i18n:
  ar: "الإزاحات الموضعية، الترتيب، وحدود أطر النوافذ (ROWS vs RANGE)"
---

# Positional Window Offsets, Ranking & Frame Bounds

In financial analysis and time series, you almost never care about a number in total isolation. You care about change:
"How much did revenue grow compared to yesterday?"
"Is this month's profit higher than the previous month?"

Without window functions, calculating yesterday's revenue requires taking the table and joining it back onto itself with a complex date = date - 1 condition.
SQL solves this effortlessly with positional offset functions:
 LAG(column, 1): Peeks backward through the window curtain to grab the value from $1$ row before the current row.
 LEAD(column, 1)

:::simulation-widget{engine="canvas2d" component="PositionalWindowOffsetLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{LAG}(v, k)_i = \begin{cases} 
v(r_{i-k}) & \text{if } i - k \ge 1 \\ 
\bot_{\text{NULL}} & \text{if } i - k < 1 
\end{cases}
$$

في التحليل المالي وسلاسل الزمن، لا يهمك الرقم منفرداً في فراغ، بل يهمك معدل التغير:
"كم نمت الأرباح اليوم مقارنة بيوم أمس؟"
"هل مبيعات هذا الشهر أعلى من الشهر السابق؟"
قديماً، كان حساب قيمة الأمس يتطلب ربط الجدول بنفسه عبر حيل برمجية شاقة وبطيئة.
تحل SQL هذه المعضلة عبر دوال الإزاحة الموضعية:
 LAG(column, 1): تلتفت إلى الخلف عبر النافذة لتجلب قيمة الصف السابق بمقدار خطوة واحدة.
 LEAD(column, 1): تلتفت إلى الأمام لتجلب قيمة الصف اللاحق.
ثم تأتي دوال الترتيب (Ranking):
 ROW_NUMBER(): ترقيم تسلسلي صلب ($1, 2, 3, 4$) دون أي تعادل.
 RANK(): الترتيب الأولمبي ($1, 2, 2

:::python-challenge{id="py-sql-indexing-query-plans"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
-- Formulate a DuckDB SQL query computing trailing rolling window sums
-- and day-over-day growth percentages using ROWS BETWEEN and LAG().

SELECT
    -- TODO: metric_date, revenue, rolling_3day_revenue, prev_day_revenue, dod_growth_pct
FROM daily_metrics
-- TODO: Window frame clauses and ordering
;
```
:::
