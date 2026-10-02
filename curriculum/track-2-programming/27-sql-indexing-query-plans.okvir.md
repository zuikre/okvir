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

In financial quantitative modeling, algorithmic trading, and modern data engineering, time-series data is the lifeblood of decision systems. Practitioners are relentlessly asked to calculate dynamic temporal metrics:
- *"What was our day-over-day (DoD) or month-over-month (MoM) revenue growth velocity?"*
- *"What is the 7-day trailing exponential or simple moving average of sensor temperature readings?"*
- *"How does today's transaction volume compare to the moving benchmark of the preceding three business days?"*

Prior to the introduction of positional window functions in modern SQL engines (such as DuckDB, PostgreSQL, and Snowflake), answering these questions required writing tortured, fragile self-joins. Engineers had to join a table against itself on calculated date offsets: `ON t1.date = t2.date + INTERVAL '1 DAY'`. If a single holiday occurred, if a sensor dropped off the network for an hour, or if the dataset contained weekend gaps, the equi-join failed silently, yielding empty rows or exploding memory consumption into an $O(N^2)$ quadratic scan across millions of partition records.

### The Rearview Mirror & The Moving Convoy Analogy
To build an intuitive, physical mental model of how positional window engines navigate time, imagine driving an instrumented test vehicle down a long, chronological highway:
- **`LAG(revenue, 1)` (The Rearview Mirror)**: As your car cruises along the highway, you look straight back into your rearview mirror. You observe the exact checkpoint you passed immediately before this one (yesterday's revenue). If you are at the very beginning of the highway on Day 1, there is no road behind you—the mirror reflects empty horizon (`NULL`).
- **`LEAD(revenue, 1)` (The Front Windshield)**: You look forward through your front windshield toward the upcoming highway milestone (tomorrow's projected sales).
- **`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (The 3-Car Motorcade)**: Instead of traveling alone, your vehicle is escorted in a tight security convoy of three cars: the two vehicles immediately trailing you plus your own vehicle. As your car advances past each mile marker, the 3-car escort frame slides smoothly forward along with you, continuously averaging the velocity of all three cars without stopping traffic.

### The Critical Trap: Physical `ROWS` vs. Logical `RANGE`
The most dangerous and subtle source of data distortion in production analytical engineering is confusing physical row counts (`ROWS`) with logical value intervals (`RANGE`):
- **`ROWS` (The Physical Caliper)**: Counts literal row slots in memory buffer order. If your table records data only for business days (Monday through Friday), a rolling frame of `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` grabs the previous 6 records, stretching across 8 to 10 actual calendar days because it is completely blind to calendar weekends and holidays!
- **`RANGE` (The Chronological Clock)**: Measures true value-based coordinate intervals along the ordering axis (e.g., `RANGE BETWEEN INTERVAL 7 DAYS PRECEDING AND CURRENT ROW`). It guarantees that only events falling within the true 7-day chronological span are included, gracefully handling missing days and bursty transaction streams!

:::simulation-widget{engine="canvas2d" component="PositionalWindowOffsetLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في النمذجة المالية الكمية، والتداول الخوارزمي، وهندسة البيانات الحديثة، تمثل السلاسل الزمنية شريان الحياة لمنظومات اتخاذ القرار. ويواجه المهندسون باستمرار أسئلة تحليلية حاسمة:
- *"ما هي سرعة نمو الإيرادات مقارنة باليوم السابق (Day-over-Day) أو الشهر السابق (Month-over-Month)؟"*
- *"ما هو المتوسط المتحرك البسيط لدرجات حرارة المستشعرات على مدار آخر 7 أيام؟"*
- *"كيف يُقارن حجم صفقات اليوم بالمتوسط المتحرك لأيام العمل الثلاثة السابقة؟"*

قبل ابتكار دوال النوافذ الموضعية في محركات SQL الحديثة (مثل DuckDB و PostgreSQL و Snowflake)، كانت الإجابة عن هذه التساؤلات تتطلب كتابة عمليات ربط ذاتي شاقة وهشة للغاية. كان المهندسون يربطون الجدول بنفسه بناءً على معادلات تواريخ معقدة: `ON t1.date = t2.date + INTERVAL '1 DAY'`. وإذا صادف الجدول عطلة رسمية، أو انقطع اتصال مستشعر لمدة ساعة، أو ظهرت فجوات في عطلة نهاية الأسبوع، كان الربط يفشل بصمت أو ينهار في فخ مسح تربيعي $O(N^2)$ يستهلك ذاكرة الخادم بالكامل.

### تشبيه مرآة الرؤية الخلفية وقافلة السيارات المتحركة
لبناء نموذج ذهني فيزيائي يوضح كيف تبحر دوال النوافذ عبر الزمن، تخيل أنك تقود سيارة اختبار ذكية على طريق سريع يمثل الخط الزمني المتسلسل:
- **`LAG(revenue, 1)` (مرآة الرؤية الخلفية)**: وأنت تقود على الطريق، تنظر مباشرة إلى مرآتك الخلفية لترى النقطة التي تجاوزتها للتو (إيرادات الأمس). وإذا كنت في بداية الطريق عند اليوم الأول، فلا يوجد طريق خلفك؛ فتظهر المرآة فراغاً مطلقاً (`NULL`).
- **`LEAD(revenue, 1)` (الزجاج الأمامي)**: تنظر للأمام عبر الزجاج لتستطلع النقطة القادمة مباشرة على مسارك (مبيعات الغد المتوقعة).
- **`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (موكب الحراسة الثلاثي)**: لا تسير سيارتك بمفردها، بل تتحرك ضمن موكب أمني منتظم من 3 سيارات: السيارتان التابعتان لك خلفك مباشرة، وسيارتك الحالية. ومع تقدمك عند كل علامة كيلومترية، ينزلق هذا الإطار الثلاثي معك بسلاسة، حاسباً متوسط سرعة السيارات الثلاث دون تعطيل حركة السير.

### الفخ الإنتاجي الأكبر: الفرق بين ROWS الفيزيائية و RANGE المنطقية
يكمن أخطر مصدر لتشويه البيانات في خطوط المعالجة التحليلية في الخلط بين العد الموضعي للصفوف (`ROWS`) والمجال الزمني الحقيقي (`RANGE`):
- **`ROWS` (الفرجار الفيزيائي الموضعي)**: تعد صفوفاً مجردة مخزنة في الذاكرة دون أي اكتراث لقيمتها. فإذا كان جدولك يسجل مبيعات أيام العمل فقط (من الاثنين إلى الجمعة)، فإن إطار `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` سيسحب 6 صفوف سابقة تمتد عبر 8 إلى 10 أيام تقويمية فعلية بسبب تجاهله التام لعطلة نهاية الأسبوع!
- **`RANGE` (الساعة التقويمية الحقيقية)**: تقيس المسافة الحقيقية للقيم على محور الترتيب (مثل `RANGE BETWEEN INTERVAL 7 DAYS PRECEDING AND CURRENT ROW`). وهي تضمن احتساب الأحداث الواقعة ضمن نافذة الـ 7 أيام التقويمية الفعلية فقط، متفادية ببراعة الفجوات الزمنية وتقلبات البيانات!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\text{LAG}(v, k)_i = \begin{cases} v(r_{i-k}) & \text{if } i - k \ge 1 \\ \bot_{\text{NULL}} & \text{if } i - k < 1 \end{cases}, \quad \text{LEAD}(v, k)_i = \begin{cases} v(r_{i+k}) & \text{if } i + k \le N \\ \bot_{\text{NULL}} & \text{if } i + k > N \end{cases}
$$

$$
\text{Frame}_{\text{ROWS}}(i, k_1, k_2) = \{ j \in \mathbb{N} \mid \max(1, i - k_1) \le j \le \min(N, i + k_2) \}
$$

$$
\text{Frame}_{\text{RANGE}}(t, \Delta_1, \Delta_2) = \{ s \in \mathcal{P} \mid t.\text{val} - \Delta_1 \le s.\text{val} \le t.\text{val} + \Delta_2 \}
$$

### Mathematical Invariants & Symbol Breakdown

| الرمز / Symbol | المجال والتعريف الرياضي / Mathematical Domain | الدور الهندسي والمعماري / Data Engineering & Architectural Role | الشرح الدقيق بالعربية / Arabic Explanation |
| :--- | :--- | :--- | :--- |
| $r_i$ | $r_i \in \mathcal{P}, \; 1 \le i \le N$ | Ordered tuple at index position $i$ within partition buffer $\mathcal{P}$ | السجل رقم $i$ داخل مخزن القسم المرتب زمنياً |
| $k, k_1, k_2$ | $k \in \mathbb{N}^+$ | Relative integer row offsets defining physical sliding frame bounds | إزاحات عدد الصفوف النسبية لتحديد حدود الإطار الفيزيائي |
| $\bot_{\text{NULL}}$ | Relational bottom sentinel | Sentinel value emitted when frame offsets traverse beyond partition boundary | القيمة الفارغة الصادرة عند خروج الإزاحة عن حدود القسم |
| $W$ | $W = k_1 + k_2 + 1$ | Physical frame width capacity (e.g. $W=3$ for `2 PRECEDING AND CURRENT ROW`) | العرض الكلي لإطار النافذة الفيزيائي بالصفوف |
| $\text{Frame}_{\text{ROWS}}$ | Index-bounded subset | Physical buffer slice based strictly on ordinal row positions in memory | شريحة المخزن الفيزيائية المحددة بالترتيب الموضعي المجرد |
| $\text{Frame}_{\text{RANGE}}$ | Value-bounded subset | Logical buffer slice filtered by value distances ($t.\text{val} \pm \Delta$) | شريحة البيانات المحددة بفارق القيم الحقيقية على محور الترتيب |
| $\Delta_1, \Delta_2$ | Domain metric interval | Continuous delta offset (e.g. `INTERVAL '7 DAYS'`) along sort dimension | مقدار الفارق الزمني أو العددي المقاس على محور الترتيب |
| $\text{DOD}$ | $\frac{v(r_i) - v(r_{i-1})}{v(r_{i-1})} \times 100$ | Normalized day-over-day growth velocity metric | نسبة تسارع النمو اليومي المعيارية المحسوبة عبر الإزاحة |

The fundamental formal invariant of positional offsets is **Boundary Clamping with Sentinel Emission**: whenever an index offset evaluates outside the valid partition domain ($i - k < 1$ or $i + k > N$), the engine must emit the absorption element $\bot_{\text{NULL}}$ rather than wrapping around or accessing uninitialized heap memory. 

Furthermore, while `ROWS` evaluation requires only pointer arithmetic over contiguous tuple pointers ($O(1)$ amortized frame updates using sliding accumulator subtraction: $S_i = S_{i-1} + r_i - r_{i-W}$), `RANGE` requires binary searching or monotonic two-pointer scans over the sort attribute values to resolve variable-width physical boundaries.

ينص الثابت الرياضي الأساسي للإزاحات الموضعية على **إطلاق القيمة المحايدة $\bot_{\text{NULL}}$ عند ملامسة الحدود**: فكلما أدت الإزاحة إلى موقع يقع خارج نطاق القسم ($i - k < 1$ أو $i + k > N$)، يلتزم المحرك بإرجاع القيمة الفارغة بدلاً من قراءة عناوين ذاكرة عشوائية.

وعلاوة على ذلك، تتميز حدود `ROWS` بأنها تنفذ عبر حسابات مؤشرات الذاكرة البسيطة بزمن $O(1)$ لكل صف باستخدام مجمعات الطرح الانزلاقية ($S_i = S_{i-1} + r_i - r_{i-W}$)، بينما تتطلب حدود `RANGE` بحثاً ثنائياً أو مؤشرين منزلقين لتحديد الصفوف التي تقع ضمن الفارق الزمني الحقيقي.

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
An analytical engineer at a national retail chain configures a 7-day trailing revenue moving average: `SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. Over holiday weekends and Thanksgiving store closures when stores shut down on Thursday, Saturday, and Sunday, reported rolling weekly sales figures swing erratically and trigger false-alarm operational alerts. Why did using `ROWS` instead of `RANGE` cause this severe reporting distortion?

قام مهندس بيانات في سلسلة متاجر تجزئة كبرى ببرمجة نافذة متوسط متحرك لإيرادات 7 أيام: `SUM(revenue) OVER (ORDER BY metric_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. وخلال عطلات الأعياد عندما تغلق المتاجر أيام الخميس والسبت والأحد، تذبذبت أرقام المبيعات الأسبوعية بشكل عنيف وأطلقت تنبيهات تشغيلية كاذبة في لوحات التحكم. لماذا تسبب استخدام `ROWS` بدلاً من `RANGE` في هذا التشويه الإحصائي الخطير؟

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
- **Why Option (A) is correct:** Physical frame boundaries (`ROWS`) are defined purely by memory row offsets in the sorted partition buffer. When 6 preceding rows are requested, the engine takes the 6 immediately preceding tuples in the table. If stores were closed on weekends, those 6 rows span backwards 9 or 10 physical calendar days, creating an artificially inflated 10-day revenue accumulator masquerading as a "7-day" average. In contrast, value-based frame boundaries (`RANGE BETWEEN INTERVAL 6 DAYS PRECEDING AND CURRENT ROW`) calculate the true numerical/chronological distance ($t.\text{metric\_date} - \text{INTERVAL '6 DAYS'}$), correctly including only the active operating days within that exact 7-calendar-day window.
- **Why Option (B) is incorrect:** SQL relational framing operators perform pure tuple set slicing and aggregation arithmetic. They never perform automatic foreign currency conversions or invoke cryptocurrency protocols.
- **Why Option (C) is incorrect:** The ANSI SQL standard (SQL:2003, SQL:2011, SQL:2016) specifies both `ROWS` and `RANGE` frame specifications. Modern open-source query engines, including DuckDB, PostgreSQL, SQLite, and ClickHouse, natively support `RANGE` with interval arithmetic.
- **Why Option (D) is incorrect:** Both `ROWS` and `RANGE` can be used interchangeably with all standard aggregate functions, including `SUM()`, `AVG()`, `COUNT()`, `MIN()`, and `MAX()`. The distinction between `ROWS` and `RANGE` lies entirely in how the frame boundaries are computed, not which aggregation operator reduces the frame.

*التفسير الهندسي المعمق وتحليل الخيارات:*
- **لماذا الخيار (A) صحيح:** تُحدد حدود `ROWS` الفيزيائية بناءً على مواقع الصفوف المجردة في مخزن الذاكرة المرتب. فعند طلب 6 صفوف سابقة، يسحب المحرك السجلات الستة السابقة مباشرة في الجدول. وإذا كانت المتاجر مغلقة في عطلات نهاية الأسبوع، فإن تلك الصفوف الستة تمتد إلى الوراء عبر 9 أو 10 أيام تقويمية فعلية، مما يضخم رقم المبيعات الأسبوعي بشكل خاطئ. في المقابل، تحسب حدود `RANGE` القيمة الزمنية الحقيقية على خط التقويم ($t.\text{metric\_date} - \text{INTERVAL '6 DAYS'}$)، فتقصر الحساب بدقة على الأيام الواقعة داخل نافذة الـ 7 أيام التقويمية فقط.
- **لماذا الخيار (B) خاطئ:** مشغلات الأطر في SQL مسؤولة حصرياً عن تحديد نطاق الصفوف وحساب الدوال الرياضية، ولا تقوم بأي تحويل للعملات أو التعامل مع العملات الرقمية المشفرة.
- **لماذا الخيار (C) خاطئ:** معيار ANSI SQL القياسي يحدد كلاً من `ROWS` و `RANGE`، وتدعمهما كافة محركات قواعد البيانات الحديثة ومفتوحة المصدر مثل DuckDB و PostgreSQL و ClickHouse.
- **لماذا الخيار (D) خاطئ:** كلا التعبيرين (`ROWS` و `RANGE`) متوافقان تماماً مع جميع الدوال التجميعية القياسية (`SUM` و `AVG` و `COUNT` و `MIN` و `MAX`). الفارق بينهما يكمن في كيفية رسم حدود النافذة، وليس في نوع الدالة الإحصائية المطبقة داخلها.
