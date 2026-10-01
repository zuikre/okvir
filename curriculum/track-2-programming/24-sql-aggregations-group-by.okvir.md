---
id: "sql-aggregations-group-by"
version: "1.0.0"
title: "Relational Joins & Set Semantics"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["sql-joins-relational-merges"]
i18n:
  ar: "الربط العلائقي (Joins) ودلالات المجموعات وقيم NULL"
---

# Relational Joins & Set Semantics

## Beat 1: Intuition & Mental Model

What happens when you combine information across two different tables? You perform a **Relational Join**.
Beginners often memorize join Venn diagrams, which are notoriously misleading because joins produce Cartesian products of rows, not simple geometric set overlaps!

### The Networking Dinner Analogy: Pairing Name Tags
Imagine a corporate networking gala with two tables of attendees:
- Table A has registered **Customers**.
- Table B has receipt logs of **Transactions**.
Each person wears a Name Tag with their `customer_id`.
1. **INNER JOIN**: Only attendees who find a matching counterpart at the other table are allowed to sit down together. Unmatched customers and unmatched receipts are discarded into the street!
2. **LEFT JOIN**: **Every single Customer from Table A is guaranteed a seat!** If a customer has made no transactions (a new or churned user), the chair across from them is left empty (`NULL`). They are never thrown out!
3. **FULL OUTER JOIN**: Everyone from both tables gets a seat, with empty chairs (`NULL`) placed across from anyone without a partner.

If you calculate Customer Lifetime Value using an **INNER JOIN**, you make a catastrophic data engineering mistake: you silently delete every inactive customer with 0 purchases, artificially inflating your reported revenue metrics!

:::simulation-widget{engine="canvas2d" component="SqlExecutionPipelineCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

ماذا يحدث عندما تدمج بيانات موزعة بين جدولين منفصلين؟ تُجري عملية **ربط علائقي (Relational Join)**.
يحفظ المبتدئون عادةً مخططات فن (Venn Diagrams) الدائرية، وهي مضللة تماماً لأن عمليات الربط تنتج جداءات ديكارتية للصفوف وليست مجرد تداخلات مجموعات بسيطة!

### تشبيه مأدبة التعارف: مطابقة بطاقات الأسماء
تخيل حفل عشاء عمل يضم طاولتين:
- الطاولة الأولى (A) تضم **العملاء المسجلين**.
- الطاولة الثانية (B) تضم **إيصالات المعاملات الشرائية**.
يحمل كل شخص بطاقة باسمه ورقم تعريفه `customer_id`.
1. **الربط الداخلي (INNER JOIN)**: يجلس فقط العميل الذي يجد إيصالاً مطابقاً له في الطاولة المقابلة. أي عميل لم يشترِ، وأي إيصال بلا صاحب، يُطردان خارج القاعة!
2. **الربط اليساري (LEFT JOIN)**: **كل عميل من الطاولة A يضمن مقعده في القاعة دون استثناء!** إذا لم يجرِ أي معاملة (عميل جديد أو مغادر)، يُترك المقعد المقابل له فارغاً (`NULL`). لا يُطرد أي عميل أبداً!
3. **الربط الكامل (FULL OUTER JOIN)**: يضمن الجميع مقاعدهم من كلا الطرفين، مع مقاعد فارغة (`NULL`) لمن لم يجد شريكاً.

إذا حسبت القيمة الدائمة للعميل بـ **INNER JOIN**، سترتكب خطأ كارثياً: ستحذف سراً كل العملاء غير النشطين ذوي المبيعات الصفرية، مما يضخم أرقامك المالية بشكل زائف!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
R \bowtie_\theta S = \sigma_\theta(R \times S), \quad R \ \text{⟕}_\theta \ S = (R \bowtie_\theta S) \cup \left\{ (r, \boldsymbol{\omega}_S) \mid r \in R \land \neg \exists s \in S : \theta(r, s) \right\}
$$

### Mathematical Invariants & Symbol Breakdown

The formal definitions establish why outer joins preserve non-matching entity domains:

- **$R \times S$**: Unconstrained Cartesian product generating $|R| \cdot |S|$ pairwise tuple combinations.
- **$\theta(r, s)$**: Equi-join boolean predicate (e.g. $r.\text{customer\_id} = s.\text{customer\_id}$).
- **$\boldsymbol{\omega}_S$**: Null tuple of shape $|\text{attrs}(S)|$ populating missing right-side attributes with $\bot_{\text{NULL}}$.
- **Outer Join Guarantee**: $|R \ \text{⟕}_\theta \ S| \ge |R|$, guaranteeing that no entity from the left domain $R$ is discarded.
- **COALESCE Invariant**: $\text{COALESCE}(v, 0)$ maps $\bot_{\text{NULL}} \mapsto 0$, essential for computing zero-transaction sums.

### الشرح الرياضي وتفصيل الرموز

الصياغة الجبرية تبرهن لماذا يحافظ الربط الخارجي على فضاء الكيانات:
- **$R \times S$**: الجداء الديكارتي الشامل لجميع الاحتمالات بعدد صفوف $|R| \cdot |S|$.
- **$\theta(r, s)$**: شرط المطابقة المنطقي بين مفاتيح الربط.
- **$\boldsymbol{\omega}_S$**: صف فارغ يملأ أعمدة الجدول الأيمن بقيم $\bot_{\text{NULL}}$ عند غياب الشريك.
- **ضمان الربط اليساري**: عدد صفوف الناتج لا يقل أبداً عن عدد صفوف الجدول الأيسر $|R|$.
- **ثابت COALESCE**: تحول الدالة القيمة الفارغة إلى صفر لمعالجة الحسابات التجميعية بدقة.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-sql-aggregations-group-by"}
---
timeout_ms: 3000
test_cases:
  - input: "SELECT c.customer_id, COUNT(t.txn_id) FROM customers c LEFT JOIN transactions t ON c.customer_id = t.customer_id GROUP BY c.customer_id"
    expected: "VALID_JOIN_PLAN"
  - input: "SELECT c.customer_name, COALESCE(SUM(t.amount), 0.0) FROM customers c LEFT JOIN transactions t ON c.customer_id = t.customer_id GROUP BY c.customer_name"
    expected: "VALID_JOIN_PLAN"
---
```sql
-- Formulate a DuckDB SQL query computing Customer Lifetime Value
-- handling customers with 0 transactions using LEFT JOIN and COALESCE.
-- Schema: customers(customer_id, customer_name), transactions(txn_id, customer_id, amount)

SELECT
    -- Step 1: Select c.customer_id, c.customer_name
    -- Step 2: Compute total_spent: COALESCE(ROUND(SUM(t.amount), 2), 0.0)
    -- Step 3: Compute transaction_count: COUNT(t.txn_id)
FROM customers c
-- Step 4: LEFT JOIN transactions t ON c.customer_id = t.customer_id
-- Step 5: GROUP BY c.customer_id, c.customer_name
-- Step 6: ORDER BY total_spent DESC, c.customer_id ASC
;
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
A marketing data science team computes customer churn probability. The original data pipeline joins customers with transactions using `INNER JOIN`. The resulting model predicts an impossible 0% churn rate across the entire user base. Why did using INNER JOIN corrupt the training dataset?

يحسب فريق علم بيانات معدل تسرب العملاء (Churn). استخدم خط الأنابيب السابق `INNER JOIN` لدمج جدول العملاء مع المعاملات. تنبأ النموذج بنسبة تسرب مستحيلة قدرها 0% لجميع العملاء! لماذا دمر استخدام INNER JOIN بيانات تدريب النموذج؟

### Transfer Assessment Question
- **(A)** *(Correct)* INNER JOIN drops all customer records lacking matching transaction rows; churned customers (who made zero recent purchases) were completely eliminated from the sample, causing survival selection bias.
  - *Arabic:* يحذف الربط الداخلي INNER JOIN جميع العملاء الذين ليس لديهم معاملات؛ وبالتالي استُبعد العملاء المتسربون (الذين لم يشتروا مؤخراً) تماماً من العينة مما أحدث انحياز البقاء.
- **(B)** INNER JOIN stores transaction currency values in Euros instead of US Dollars.
  - *Arabic:* يقوم INNER JOIN بتخزين العملات باليورو بدلاً من الدولار الأمريكي.
- **(C)** The DuckDB database engine automatically deletes inactive users from disk during an INNER JOIN.
  - *Arabic:* يقوم محرك قواعد البيانات بحذف العملاء غير النشطين نهائياً من القرص أثناء الربط الداخلي.
- **(D)** LEFT JOIN requires a GPU graphics card while INNER JOIN runs on the CPU.
  - *Arabic:* يتطلب الربط الخارجي كرت شاشة GPU بينما يعمل الربط الداخلي على المعالج المركزي.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
An INNER JOIN requires tuples to satisfy the join predicate on both sides. Users with zero transactions produce no join matches and are omitted entirely from the dataset, leaving only active surviving users.

*التفسير الهندسي المعمق:*
يتطلب الربط الداخلي وجود سجلات في الطرفين. العملاء الذين لم يشتروا لا يملكون معاملات مطابقة فيُحذفون تماماً، مما يبقي العملاء النشطين فقط ويزيف النتائج.
