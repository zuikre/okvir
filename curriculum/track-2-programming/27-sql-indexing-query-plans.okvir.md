---
id: "sql-indexing-query-plans"
version: "1.0.0"
title: "Positional Window Offsets, Ranking & Frame Bounds"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["sql-ctes-recursive-queries"]
i18n:
  ar: "الإزاحات الموضعية، الترتيب، وحدود أطر النوافذ (ROWS vs RANGE)"
---

# Positional Window Offsets, Ranking & Frame Bounds

## Beat 1: Intuition & Mental Model

In time-series analysis and financial engineering, you constantly need to answer questions like:
- *"What was yesterday's revenue compared to today?"*
- *"What is our 3-day trailing moving average?"*

In traditional SQL without window offsets, calculating this required complex self-joins with offset date arithmetic. With Positional Window Functions, it becomes trivial!

### The Rearview Mirror & The Moving Convoy Analogy
Imagine driving a car along a chronological timeline highway:
- **`LAG(revenue, 1)` (The Rearview Mirror)**: You look backward at the road right behind you (yesterday's revenue). If you are on day 1 with no yesterday, the mirror shows empty space (`NULL`).
- **`LEAD(revenue, 1)` (The Windshield)**: You peer forward through the front windshield at the next upcoming milestone (tomorrow's forecast).
- **`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (The 3-Car Motorcade)**: As you cruise forward, you are escorted by a 3-car security convoy: the 2 cars immediately behind you plus yourself. As you advance each day, the convoy window moves along with you, smoothly computing a rolling 3-day average!

:::simulation-widget{engine="canvas2d" component="PositionalWindowOffsetLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في تحليل السلاسل الزمنية والهندسة المالية، تتكرر أسئلة جوهرية مثل:
- *"كم كان إيراد الأمس مقارنة باليوم لحساب نسبة النمو؟"*
- *"ما هو المتوسط المتحرك لإيرادات آخر 3 أيام؟"*

في استعلامات SQL القديمة، كان حساب ذلك يتطلب ربطاً ذاتياً معقداً وحسابات تواريخ بطيئة. مع دوال الإزاحة الموضعية، تصبح العملية في غاية البساطة والأناقة!

### تشبيه مرآة الرؤية الخلفية وقافلة السيارات المتحركة
تخيل أنك تقود سيارة على طريق سريع يمثل الخط الزمني:
- **`LAG(revenue, 1)` (مرآة الرؤية الخلفية)**: تنظر إلى الطريق خلفك مباشرة (إيراد الأمس). وإذا كنت في اليوم الأول ولا يوجد أمس، تظهر المرآة فراغاً (`NULL`).
- **`LEAD(revenue, 1)` (الزجاج الأمامي)**: تنظر للأمام نحو النقطة التالية على الطريق (توقعات الغد).
- **`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (قافلة الحراسة الثلاثية)**: تتحرك سيارتك ضمن موكب أمني من 3 سيارات: السيارتان السابقتان لك مباشرة وسيارتك الحالية. ومع تقدمك يوماً بعد يوم، ينزلق هذا الإطار معك، حاسباً متوسطاً متحركاً سلساً لآخر 3 أيام!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\text{LAG}(v, k)_i = \begin{cases} v(r_{i-k}) & \text{if } i - k \ge 1 \\ \bot_{\text{NULL}} & \text{if } i - k < 1 \end{cases}, \quad \text{FrameSum}(i, W) = \sum_{j=\max(1, i - W + 1)}^i v(r_j)
$$

### Mathematical Invariants & Symbol Breakdown

The mathematical frame bounds clarify positional offset evaluation:

- **$r_i$**: The $i$-th row tuple in the window partition ordered sequence ($1 \le i \le N$).
- **$k$**: Positional offset integer (e.g., $k=1$ for immediate predecessor).
- **$\bot_{\text{NULL}}$**: Sentinel null value emitted when the offset points beyond the start of the partition ($i - k < 1$).
- **$W$**: Physical window frame width (for `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`, $W=3$).
- **ROWS vs. RANGE Distinction**: `ROWS` counts literal row offsets in memory (physical boundary); `RANGE` evaluates numerical/chronological deltas along the sorting dimension (logical boundary).

### الشرح الرياضي وتفصيل الرموز

تحدد حدود الأطر الرياضية قواعد حساب الإزاحات:
- **$r_i$**: الصف رقم $i$ داخل القسم المرتب زمنياً.
- **$k$**: مقدار الإزاحة الموضعية بالصفوف (مثلاً 1 لليوم السابق).
- **$\bot_{\text{NULL}}$**: قيمة فارغة تصدر عندما تشير الإزاحة إلى ما قبل بداية القسم ($i - k < 1$).
- **$W$**: عرض إطار النافذة الفيزيائي (في حالة `2 PRECEDING` يكون $W=3$).
- **الفرق الجوهري بين ROWS و RANGE**: تحسب `ROWS` عدد الصفوف الفيزيائية الفعلية، بينما تحسب `RANGE` المسافة الرقمية أو الزمنية الحقيقية (مثل نطاق 7 أيام تقويمية).

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-sql-indexing-query-plans"}
---
timeout_ms: 3000
test_cases:
  - input: "SELECT metric_date, LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev FROM daily_metrics"
    expected: "VALID_JOIN_PLAN"
  - input: "SELECT metric_date, SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS roll FROM daily_metrics"
    expected: "VALID_JOIN_PLAN"
---
```sql
-- Formulate a DuckDB SQL query computing trailing rolling window sums
-- and day-over-day growth percentages using ROWS BETWEEN and LAG().
-- Schema: daily_metrics(metric_date, revenue)

WITH metrics_lagged AS (
    SELECT
        metric_date,
        revenue,
        -- Step 1: 3-day trailing rolling sum:
        --         ROUND(SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3day_revenue
        -- Step 2: Previous day revenue:
        --         LAG(revenue, 1) OVER (ORDER BY metric_date) AS prev_day_revenue
    FROM daily_metrics
)
SELECT
    metric_date,
    revenue,
    rolling_3day_revenue,
    prev_day_revenue,
    -- Step 3: Compute DoD growth percentage:
    --         CASE WHEN prev_day_revenue IS NULL OR prev_day_revenue = 0 THEN NULL
    --              ELSE ROUND(((revenue - prev_day_revenue) / prev_day_revenue) * 100.0, 2) END AS dod_growth_pct
FROM metrics_lagged
ORDER BY metric_date ASC;
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
An analytical engineer configures a 7-day rolling revenue window: `SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. Over holiday weekends when stores close on Saturday and Sunday, reported weekly averages jump erratically. Why did using `ROWS` instead of `RANGE` cause this reporting distortion?

أعد مهندس بيانات نافذة متوسط 7 أيام: `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`. في عطلات نهاية الأسبوع والأعياد عندما تغلق المتاجر، تذبذبت المتوسطات الأسبوعية بشكل خاطئ. لماذا تسبب استخدام `ROWS` بدلاً من `RANGE` في هذا التشويه الإحصائي؟

### Transfer Assessment Question
- **(A)** *(Correct)* `ROWS` counts a literal count of rows in memory (grabbing the last 6 operating store days, spanning 8-10 calendar days over weekends); whereas `RANGE` evaluates chronological calendar intervals (`RANGE BETWEEN INTERVAL 6 DAYS PRECEDING`), correctly respecting date gaps.
  - *Arabic:* `ROWS` يعد صفوفاً فعلية في الذاكرة (فيأخذ آخر 6 أيام عمل فعلية، ممتداً عبر 8 إلى 10 أيام تقويمية بسبب العطلات)؛ بينما يقيم `RANGE` الفوارق الزمنية التقويمية الحقيقية مراعياً الفجوات.
- **(B)** `ROWS` converts currency values into Bitcoin cryptocurrency on holiday weekends.
  - *Arabic:* تقوم عبارة `ROWS` بتحويل قيم العملات إلى عملات مشفرة في عطلات نهاية الأسبوع.
- **(C)** `RANGE` requires an Oracle Database license and is unsupported in open-source SQL engines.
  - *Arabic:* تتطلب عبارة `RANGE` ترخيصاً تجارياً من Oracle ولا تدعمها المحركات مفتوحة المصدر.
- **(D)** `ROWS` can only calculate COUNT, while `RANGE` is required for SUM.
  - *Arabic:* تقتصر عبارة `ROWS` على حساب العدد COUNT فقط بينما تتطلب SUM استخدام RANGE.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
Physical frame boundaries (`ROWS`) ignore gaps in date values and strictly look at table row indices. Value-based frame boundaries (`RANGE`) measure the true distance between values in the order column.

*التفسير الهندسي المعمق:*
تتجاهل حدود `ROWS` الفيزيائية الفجوات الزمنية وتعد صفوف الجدول فقط. بينما تقيس حدود `RANGE` المسافة الفعلية لقيم التواريخ في التقويم الزمني.
