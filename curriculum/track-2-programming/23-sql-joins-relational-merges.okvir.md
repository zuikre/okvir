---
id: "sql-joins-relational-merges"
version: "1.0.0"
title: "Formal Relational Algebra Foundations"
track: "programming"
module: "mod-15"
estimated_minutes: 15
prerequisites: ["relational-algebra-select-filter"]
i18n:
  ar: "أسس الجبر العلائقي (Relational Algebra) ونظرية كود"
---

# Formal Relational Algebra Foundations

In the 1960s, database systems were a nightmare: if you wanted to find a customer's address, you had to write custom procedural code telling the magnetic tape drive physically which tracks to spin and which memory pointers to follow. If the hard drive changed, all your programs broke!

In 1970, an Oxford-trained mathematician at IBM named Edgar F. Codd published a historic paper that revolutionized the world. Codd said:
"Stop telling the computer HOW to find data. Instead, define data using mathematical set theory, and tell the computer WHAT you want!"

This mathematical language is Re

:::simulation-widget{engine="canvas2d" component="RelationalAlgebraGridLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
R \subseteq \text{dom}(A_1) \times \text{dom}(A_2) \times \dots \times \text{dom}(A_n)
$$

في ستينيات القرن الماضي، كانت قواعد البيانات كابوساً معقداً: إذا أردت استرجاع عنوان عميل، كان عليك كتابة كود تفصيلي يوجه بكرات الأشرطة المغناطيسية أين تدور وأي مسار فيزياوي تسلك. وإذا تم تغيير نوع القرص الصلب، تنهار جميع البرامج!
في عام 1970، نشر عالم الرياضيات البريطاني إدغار كود (E. F. Codd) في شركة IBM ورقة بحثية قلبت موازين العالم التقني. قال كود:
"كفوا عن إخبار الحاسوب بكيفية البحث عن البيانات خطوة بخطوة. بدلاً من ذلك، عرّفوا البيانات باستخدام نظرية المجموعات الرياضية، وأخبروا الحاسوب بما تريدونه فقط!"
هذه اللغة الرياضية هي الجبر العلائقي (Relational Algebra).
في هذا الجبر:
 ال

:::python-challenge{id="py-sql-joins-relational-merges"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
-- Write a DuckDB SQL query filtering pre-aggregation in WHERE
-- and post-aggregation in HAVING.
-- Schema: orders(order_id, region, product_category, status, revenue)

SELECT
    -- TODO: Columns and aggregations
FROM orders
-- TODO: WHERE, GROUP BY, HAVING, ORDER BY
;
```
:::
