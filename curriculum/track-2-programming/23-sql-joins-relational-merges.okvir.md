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
import duckdb

def test_sql_logical_exec():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE orders (
            order_id INT,
            region VARCHAR,
            product_category VARCHAR,
            status VARCHAR,
            revenue DOUBLE
        );
        INSERT INTO orders VALUES
            (1, 'North', 'Tech', 'COMPLETED', 300.0),
            (2, 'North', 'Tech', 'COMPLETED', 250.0), -- Tech North: sum=550, count=2 (PASS)
            (3, 'North', 'Tech', 'CANCELLED', 1000.0),-- Cancelled: excluded
            (4, 'South', 'Tech', 'COMPLETED', 600.0), -- Tech South: sum=600, count=1 (FAIL count)
            (5, 'North', 'Home', 'COMPLETED', 100.0),
            (6, 'North', 'Home', 'COMPLETED', 200.0); -- Home North: sum=300, count=2 (FAIL sum)
    """)
    
    query = """
        SELECT
            region,
            product_category,
            ROUND(SUM(revenue), 2) AS total_revenue,
            COUNT(*) AS order_count
        FROM orders
        WHERE status = 'COMPLETED'
        GROUP BY region, product_category
        HAVING COUNT(*) >= 2 AND SUM(revenue) >= 500.0
        ORDER BY total_revenue DESC, region ASC;
    """
    
    res = con.execute(query).fetchall()
    assert len(res) == 1
    assert res[0] == ('North', 'Tech', 550.0, 2)
    
    print("ALL TESTS PASSED for sql-logical-exec-order")

if __name__ == "__main__":
    test_sql_logical_exec()
```
:::
