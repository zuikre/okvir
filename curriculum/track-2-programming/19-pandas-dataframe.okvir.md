---
id: "pandas-dataframe"
version: "1.0.0"
title: "DataFrame Mental Model: Indexing via `loc` vs `iloc`"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["numpy-strides-indexing"]
i18n:
  ar: "النموذج الذهني لإطارات البيانات: الفهرسة عبر loc مقابل iloc"
---

# DataFrame Mental Model: Indexing via `loc` vs `iloc`

## Beat 1: Intuition & Mental Model

A Pandas DataFrame is often taught as a "spreadsheet in Python". This superficial metaphor causes endless beginner bugs!

What actually is a DataFrame under the hood?
A DataFrame is a collection of 1D NumPy arrays (columns) orchestrated by two Hash Maps:
1. **Row Index**: A mapping from row labels (e.g. `"AAPL"`, `"2024-01-01"`) to integer row positions.
2. **Column Index**: A mapping from column labels (e.g. `"revenue"`, `"cost"`) to internal column blocks.

### The Seating Chart Analogy: Name Tags vs. Chair Numbers
Imagine you are ushering guests at an international conference dinner:
- **Label-based indexing (`loc`)**: You look up an attendee by their written **Name Tag** on the seating list (e.g. *"Table for Dr. Alice"*). It does not matter which physical chair she sits in—you reference her identity.
- **Positional indexing (`iloc`)**: You point at the **Chair Number** (e.g. *"Seat #3 in Row #0"*). You don't care who is sitting there—you reference the physical coordinate.

### Automatic Index Alignment
When you add two Pandas Series: `revenue - costs`, Pandas does not blindly subtract index 0 from index 0 like NumPy! It uses their Name Tags (`loc`) to match matching labels automatically. If an attendee exists in `revenue` but has no counterpart in `costs`, Pandas inserts `NaN` (missing value) to preserve relational integrity!

:::simulation-widget{engine="canvas2d" component="DataFrameBlockManagerLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

غالبًا ما يُشرح إطار بيانات Pandas (DataFrame) للمبتدئين بأنه "جدول إكسل داخل بايثون". هذا التشبيه السطحي يقود إلى أخطاء برمجية لا حصر لها!

فما هو إطار البيانات في الحقيقة تحت الغطاء؟
إطار البيانات هو مجموعة من مصفوفات NumPy أحادية البعد (الأعمدة) يديرها جدولان تجزئة (Hash Maps):
1. **فهرس الصفوف (Row Index)**: خريطة تربط التسميات (مثل `"AAPL"` أو `"2024-01-01"`) بالمواقع الرقمية للصفوف.
2. **فهرس الأعمدة (Column Index)**: خريطة تربط أسماء الأعمدة بمخازن الأعمدة الداخلية.

### تشبيه قاعة المؤتمر: بطاقات الأسماء مقابل أرقام المقاعد
تخيل أنك ترشد الضيوف في مأدبة مؤتمر دولي:
- **الفهرسة بالتسمية (`loc`)**: تبحث عن الضيف بواسطة **بطاقة اسمه** المكتوبة (مثل *"طاولة د. سارة"*). لا يهم أي كرسي فيزيائي تجلس عليه، فأنت تتعامل مع هويتها الاسمية.
- **الفهرسة بالموقع الرقمي (`iloc`)**: تشير مباشرة إلى **رقم المقعد** (مثل *"المقعد رقم 3 في الصف 0"*). لا تكترث لمن يجلس هناك، بل تتعامل مع الإحداثي الفيزيائي المجرد.

### المحاذاة التلقائية للفهارس (Index Alignment)
عندما تطرح سلسلتين: `الأرباح - التكاليف`، لا تطرح Pandas العنصر الأول من الأول عشوائياً كالمصفوفات! بل تستخدم بطاقات الأسماء لمطابقة كل شركة بتكاليفها تلقائياً. وإذا وُجدت شركة في الأرباح وغابت عن التكاليف، تضع Pandas القيمة المفقودة `NaN` لحماية سلامة البيانات العلائقية!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\mathcal{D} = \langle \mathcal{I}_{\text{row}}, \mathcal{I}_{\text{col}}, \mathbf{T}, \mathbf{M} \rangle, \quad \text{loc}(r, c) = \mathbf{M}[\mathcal{I}_{\text{row}}(r), \mathcal{I}_{\text{col}}(c)], \quad \text{iloc}(i, j) = \mathbf{M}[i, j]
$$

### Mathematical Invariants & Symbol Breakdown

The formal algebraic representation bounds tabular indexing semantics:

- **$\mathcal{I}_{\text{row}}: \mathcal{L}_{\text{row}} \to \{0, \dots, N-1\}$**: Invertible hash-indexed mapping from row labels to physical row offsets.
- **$\mathcal{I}_{\text{col}}: \mathcal{L}_{\text{col}} \to \{0, \dots, M-1\}$**: Hash-indexed mapping from column names to column buffer positions.
- **$\mathbf{T}$**: Homogeneous data type schema vector $(\tau_0, \dots, \tau_{M-1})$.
- **$\mathbf{M}$**: Physical memory storage engine (e.g., Pandas `BlockManager` grouping columns by dtype).
- **Label Alignment Invariant**: For binary operator $\oplus$ between series $\mathcal{S}_A$ and $\mathcal{S}_B$, the domain of the result is $\text{dom}(\mathcal{S}_A) \cup \text{dom}(\mathcal{S}_B)$, imputing $v_{\text{fill}}$ for missing disjoint keys.

### الشرح الرياضي وتفصيل الرموز

الصياغة الجبرية تحدد دلالات الفهرسة الجدولية:
- **$\mathcal{I}_{\text{row}}$**: دالة تجزئة عكوسة تربط تسميات الصفوف بمواقعها الفيزيائية.
- **$\mathcal{I}_{\text{col}}$**: دالة تجزئة تربط أسماء الأعمدة بأماكن تخزينها في الذاكرة.
- **$\mathbf{T}$**: متجه مخطط الأنواع البيانية للأعمدة.
- **$\mathbf{M}$**: محرك التخزين الفيزيائي الداخلي (مثل BlockManager في Pandas).
- **ثابت محاذاة الفهارس**: عند إجراء عملية ثنائية بين سلسلتين، يكون فضاء الناتج هو اتحاد التسميات، مع تعويض المفاتيح الناقصة بقيمة `NaN`.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-pandas-dataframe"}
---
timeout_ms: 3000
test_cases:
  - input: "align_and_compute_spread({'AAPL': 150.0, 'MSFT': 300.0}, {'AAPL': 140.0, 'GOOG': 2800.0})['AAPL']"
    expected: "10.0"
  - input: "align_and_compute_spread({'AAPL': 150.0}, {'AAPL': 150.0})['AAPL']"
    expected: "0.0"
---
```python
def align_and_compute_spread(
    series_a: dict[str, float], 
    series_b: dict[str, float], 
    fill_value: float = 0.0
) -> dict[str, float]:
    """
    Emulates Pandas index alignment by computing the spread (a - b)
    across the union of label indices, handling missing keys via imputation.

    Args:
        series_a: Mapping of index label to float value.
        series_b: Mapping of index label to float value.
        fill_value: Imputation value when a label is missing in either series.

    Returns:
        Dictionary mapping each unique label to (val_a - val_b) rounded to 6 decimal places,
        sorted alphabetically by key.
    """
    # Step 1: Collect sorted union of all keys across series_a and series_b
    # Step 2: For each key, extract val_a (with fill_value fallback) and val_b (with fill_value fallback)
    # Step 3: Compute diff = round(val_a - val_b, 6)
    # Step 4: Return dictionary mapping key -> diff
    raise NotImplementedError("Implement align_and_compute_spread")
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
In an automated quantitative trading platform, an algorithm subtracts daily close price Series: `spread = stock_a - stock_b`. On days when stock_b was halted due to news, `spread` returns NaN. The downstream execution gateway receives NaN and fails silently to execute stop-loss orders. How does index alignment explain this and how is it resolved?

في منصة تداول خوارزمية كمية، تحسب الخوارزمية الفارق اليومي: `spread = stock_a - stock_b`. في الأيام التي أوقف فيها تداول السهم b، تعيد العملية NaN، مما عطل أوامر وقف الخسارة. كيف تفسر آلية محاذاة الفهارس هذا الخلل وما الحل البرمجي المتين؟

### Transfer Assessment Question
- **(A)** *(Correct)* Pandas aligns Series along the union of index dates; missing dates in either Series produce NaN. The robust solution is calling `stock_a.sub(stock_b, fill_value=...)` or explicitly forward-filling prices via `.reindex()` or `.ffill()` prior to subtraction.
  - *Arabic:* تحاذي Pandas السلاسل على اتحاد تواريخ الفهرس؛ وأي تاريخ مفقود في إحداهما ينتج NaN. الحل المتين هو استخدام `stock_a.sub(stock_b, fill_value=...)` أو تعويض الأسعار السابقة بـ `.ffill()` قبل الطرح.
- **(B)** Index alignment only works for integer indices; string and datetime indices always produce NaN.
  - *Arabic:* محاذاة الفهارس تعمل فقط مع الفهارس الرقمية، بينما فهارس النصوص والتواريخ تعيد دائماً NaN.
- **(C)** The NaN values are caused by floating point precision underflow in the CPython math library.
  - *Arabic:* قيم NaN نتجت عن فيضان سفلي لدقة الأرقام العشرية في مكتبة الرياضيات بمفسر بايثون.
- **(D)** Converting both Series to pure Python lists before subtraction eliminates missing values automatically.
  - *Arabic:* تحويل السلسلتين إلى قوائم بايثون قبل الطرح يحذف القيم المفقودة تلقائياً.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
Direct arithmetic operator `-` on Pandas Series executes an outer index join and yields NaN for unmatched dates. Using `.sub()` with a fill value or applying `.ffill()` maintains analytical continuity.

*التفسير الهندسي المعمق:*
مُعامل الطرح المباشر `-` ينفذ ربطاً خارجياً للفهارس ويضع NaN للتواريخ غير المتطابقة. استخدام التابع `.sub()` بقيمة بديلة أو `.ffill()` يضمن استمرارية التحليل المالي.
