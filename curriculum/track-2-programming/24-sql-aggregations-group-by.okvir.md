---
id: "sql-aggregations-group-by"
version: "1.0.0"
title: "Relational Joins & Set Semantics"
track: "programming"
module: "mod-15"
estimated_minutes: 15
prerequisites: ["sql-joins-relational-merges"]
i18n:
  ar: "الربط العلائقي (Joins) ودلالات المجموعات وقيم NULL"
---

# Relational Joins & Set Semantics

Why do we split database tables up instead of putting everything into one massive spreadsheet?
If you store customer addresses in the orders table, every time customer Alice buys a \$2 coffee, you duplicate her entire street address, city, and zip code. If she moves, you have to update 1,000 rows. This is called redundancy.

So we normalize: we keep a Customers table and an Orders table.
To answer business questions, we must reconnect them: this reconnection is called a Join.

A Join is simply a Cartesian Product combined with a Filter:
1. Imagine matching every order with every single

:::simulation-widget{engine="canvas2d" component="SqlExecutionPipelineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
R \bowtie_\theta S = \sigma_\theta(R \times S)
$$

لماذا نقسم قواعد البيانات إلى عدة جداول بدلاً من وضع كل شيء في جدول ضخم واحد؟
إذا خزنّا عنوان العميل في جدول الطلبات، ففي كل مرة يشتري فيها العميل قهوة بدولارين، سنكرر اسمه وعنوانه ورمزه البريدي. وإذا انتقل لشارع آخر، سنضطر لتعديل آلاف السجلات!
لذلك نفصل البيانات إلى: جدول العملاء وجدول الطلبات.
ولكن للإجابة عن أسئلة الأعمال، نحتاج لإعادة ربط هذه البيانات: وهذا هو الربط (Join).
الربط العلائقي هو ببساطة جداء ديكارتي متبوع بفلترة:
1. تخيل مطابقة كل طلب مع كل عميل مسجل في النظام.
2. استبعاد كل الأزواج التي لا يتطابق فيها معرف العميل.
الناتج هو الربط الداخلي (Inner Join).
ماذا لو كان ل

:::python-challenge{id="py-sql-aggregations-group-by"}
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

def test_sql_join_coalesce():
    con = duckdb.connect(":memory:")
    con.execute("""
        CREATE TABLE customers (customer_id INT, customer_name VARCHAR);
        CREATE TABLE transactions (txn_id INT, customer_id INT, amount DOUBLE);
        
        INSERT INTO customers VALUES
            (101, 'Alice'),
            (102, 'Bob'),
            (103, 'Charlie');
            
        INSERT INTO transactions VALUES
            (1, 101, 50.0),
            (2, 101, 75.5),
            (3, 102, 20.0);
            -- Charlie has 0 transactions
    """)
    
    query = """
        SELECT
            c.customer_id,
            c.customer_name,
            COALESCE(ROUND(SUM(t.amount), 2), 0.0) AS total_spent,
            COUNT(t.txn_id) AS transaction_count
        FROM customers c
        LEFT JOIN transactions t ON c.customer_id = t.customer_id
        GROUP BY c.customer_id, c.customer_name
        ORDER BY total_spent DESC, c.customer_id ASC;
    """
    
    rows = con.execute(query).fetchall()
    assert rows[0] == (101, 'Alice', 125.5, 2)
    assert rows[1] == (102, 'Bob', 20.0, 1)
    assert rows[2] == (103, 'Charlie', 0.0, 0), "Customer with 0 transactions must have count 0, not 1!"
    
    print("ALL TESTS PASSED for sql-join-coalesce-null")

if __name__ == "__main__":
    test_sql_join_coalesce()
```
:::
