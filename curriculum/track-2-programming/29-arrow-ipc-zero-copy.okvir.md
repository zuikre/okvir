---
id: "arrow-ipc-zero-copy"
version: "1.0.0"
title: "Parquet Columnar Storage, Strided Encodings & Pushdown"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["columnar-storage-parquet"]
i18n:
  ar: "تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)"
---

# Parquet Columnar Storage, Strided Encodings & Pushdown

## Beat 1: Intuition & Mental Model

Why did the entire Big Data and AI world migrate from CSV files to Apache Parquet?
Because CSV is **Row-Oriented**, while Parquet is **Columnar**!

### The Giant Ledger Analogy: Reading by Columns
Imagine a massive 10,000-page accounting ledger book containing 100,000,000 transaction rows with 50 columns: `customer_name`, `home_address`, `phone_number`, `timestamp`, ..., and `price`.
You are asked one question: *"What is our total revenue?"*
- **Row-Oriented (CSV / Traditional RDBMS)**: To find the total price, the computer must open page 1, read the customer name, address, phone number, and finally the price. Then turn to page 2, reading all the bulky text just to extract the price again! It must load **100% of all 50 columns from disk** into RAM, wasting 98% of your I/O bandwidth!
- **Columnar Format (Apache Parquet)**: Instead of binding columns together, all 100,000,000 prices are written consecutively on a single dedicated ribbon tape! The database engine loads **only tape #50**, reading 100% useful payload at maximum SSD wire speed. It skips 49 columns completely without touching them!

### Dictionary Encoding & Predicate Pushdown
Furthermore, repetitive text strings like `"California"` are stored once in a dictionary table and replaced by a tiny 1-byte integer index. And because Parquet stores min/max statistics for every Row Group, if a query asks for `WHERE year = 2024`, the engine inspects the metadata header and skips reading entire gigabytes of older data from disk!

:::simulation-widget{engine="canvas2d" component="ArrowBufferMemoryLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

لماذا هاجر مجتمع البيانات والذكاء الاصطناعي العالمي بالكامل من ملفات CSV إلى تنسيق Apache Parquet؟
لأن ملفات CSV تخزن البيانات **أفقياً بالصفوف (Row-Oriented)**، بينما تخزنها Parquet **عمودياً بالأعمدة (Columnar)**!

### تشبيه السجل المحاسبي الضخم: القراءة بالأعمدة
تخيل سجلاً محاسبياً ورقياً ضخماً من 10,000 صفحة يحوي 100 مليون معاملة تجارية، وفي كل صفحة 50 معلومة: `اسم_العميل`، `عنوان_السكن`، `رقم_الهاتف`، ..., و`السعر`.
طُلب منك حساب إجمالي الإيرادات:
- **التخزين الصفي (CSV وقواعد البيانات التقليدية)**: لمعرفة السعر، يضطر الحاسوب لقراءة السطر الأول كاملاً: اسم العميل وعنوانه وهاتفه للوصول للسعر، ثم يكرر ذلك في كل صفحة! فيقرأ **100% من جميع الأعمدة الـ 50 من القرص**، مهدراً 98% من سرعة القراءة في تفاصيل لا علاقة لها بالاستعلام!
- **التخزين العمودي (Apache Parquet)**: بدلاً من دمج الأعمدة، تُفصل جميع الأسعار الـ 100 مليون معاً في شريط ورقي مستقل! فيقرأ محرك البيانات **شريط الأسعار فقط** بأقصى سرعة للقرص SSD، متجاهلاً الـ 49 عموداً الأخرى دون أن يلمسها!

### ترميز القواميس (Dictionary Encoding) وتخطي القراءة (Pushdown)
علاوة على ذلك، تُخزن النصوص المتكررة مثل `"الرياض"` مرة واحدة في قاموس مستقل، وتُستبدل في الجدول برقم فهرس صغير من بايت واحد. وبفضل حفظ إحصائيات الحد الأدنى والأقصى (Min/Max) لكل كتلة، يتخطى المحرك قراءة جيجابايتات كاملة من القرص إذا لم تطابق شرط الاستعلام!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\text{IO}_{\text{row}} = N \sum_{c=1}^C w_c \quad \gg \quad \text{IO}_{\text{columnar}} = N \sum_{c \in \mathcal{C}_{\text{query}}} w_c \cdot (1 - \rho_c), \quad \rho_{\text{dict}} = 1 - \frac{|\mathcal{V}| \cdot \bar{L} + N \lceil \log_2 |\mathcal{V}| / 8 \rceil}{N \cdot \bar{L}}
$$

### Mathematical Invariants & Symbol Breakdown

The formal I/O bounds quantify the orders-of-magnitude reduction in disk bandwidth:

- **$N$**: Total row count; $C$: Total column count in relation schema.
- **$\mathcal{C}_{\text{query}} \subseteq \{1, \dots, C\}$**: The projection column subset requested by the query (typically $|mathcal{C}_{\text{query}}| \ll C$).
- **$w_c$**: Average uncompressed byte width of column $c$.
- **$\rho_c$**: Compression ratio achieved by columnar encodings (Dictionary Encoding, Run-Length Encoding, Snappy/ZSTD).
- **$|\mathcal{V}|$**: Unique cardinality of categorical vocabulary. When $|\mathcal{V}| \le 256$, each string is represented by a single 1-byte (`uint8`) integer.
- **Projection Pushdown**: Disk reading bandwidth scales with requested columns only, reducing I/O by $\approx 90-98\%$.

### الشرح الرياضي وتفصيل الرموز

تبرهن المعادلات الرياضية الانخفاض الهائل في استهلاك قراءة الأقراص:
- **$N$**: إجمالي عدد الصفوف؛ $C$: إجمالي عدد الأعمدة في المخطط.
- **$\mathcal{C}_{\text{query}}$**: مجموعة الأعمدة المطلوبة فعلياً في استعلام الإسقاط (غالباً عمودان أو ثلاثة فقط).
- **$w_c$**: عرض البايتات المتوسط للعمود قبل الضغط.
- **$\rho_c$**: نسبة الضغط الناتجة عن الترميز العمودي (ترميز القواميس، RLE، وخوارزميات ZSTD).
- **$|\mathcal{V}|$**: عدد الكلمات الفريدة؛ عندما تكون أقل من 256، يُمثل كل نص ببايت واحد `uint8`.
- **تمرير الإسقاط (Projection Pushdown)**: تقتصر القراءة الفيزيائية من القرص على الأعمدة المطلوبة فقط مما يوفر 90% إلى 98% من سرعة النقل.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-arrow-ipc-zero-copy"}
---
timeout_ms: 3000
test_cases:
  - input: "compress_column_dictionary(['apple', 'banana', 'apple'])[0]"
    expected: "['apple', 'banana']"
  - input: "compress_column_dictionary(['apple', 'banana', 'apple'])[1]"
    expected: "[0, 1, 0]"
---
```python
def compress_column_dictionary(column_data: list[str]) -> tuple[list[str], list[int], float]:
    """
    Emulates Apache Arrow / Parquet dictionary encoding of categorical string columns
    and calculates memory compression ratio.

    Args:
        column_data: List of strings.

    Returns:
        A tuple of (vocabulary_list, indices_list, compression_ratio).
    """
    # Step 1: Return ([], [], 1.0) if column_data is empty
    # Step 2: Build vocabulary map {string: index} and populate indices list in a single pass
    # Step 3: Compute raw uncompressed bytes: sum(len(s.encode('utf-8')) + 8 for s in column_data)
    # Step 4: Determine index byte width:
    #         - 1 byte if len(vocab) <= 256
    #         - 2 bytes if len(vocab) <= 65536
    #         - 4 bytes otherwise
    # Step 5: Compute compressed bytes: sum(len(v.encode('utf-8')) for v in vocab) + len(column_data) * index_width
    # Step 6: Return (vocabulary, indices, round(raw_bytes / compressed_bytes, 2))
    raise NotImplementedError("Implement compress_column_dictionary")
```
:::

## Beat 4: Real-World Transfer Scenario

### Industry Problem Context
An analytics lakehouse stores 50 Terabytes of telemetry logs in CSV format across 100 columns. A nightly aggregation query scans `error_code` to count 500 errors: `SELECT error_code, COUNT(*) FROM logs WHERE error_code = 'E500'`. The query takes 55 minutes and costs $250 per run in cloud I/O charges. When converted to Parquet, execution time drops to 12 seconds and cost drops to $0.40. Which architectural mechanisms explain this 250x efficiency leap?

مستودع بيانات سحابي يخزن 50 تيرابايت من سجلات النظام بتنسيق CSV عبر 100 عمود. يقوم استعلام يومي بحساب تكرار الخطأ 'E500'، فيستغرق 55 دقيقة ويكلف 250 دولاراً لقراءة البيانات. عند تحويل الملفات إلى Parquet، انخفض زمن التنفيذ إلى 12 ثانية والتكلفة إلى 40 سنتاً فقط! ما الآليتان المعماريتان المسؤولتان عن هذا القفز الكفاءي بمقدار 250 ضعفاً؟

### Transfer Assessment Question
- **(A)** *(Correct)* Projection Pushdown (reading only the single `error_code` column while ignoring the other 99 columns on disk) combined with Predicate Pushdown and Row Group statistics (skipping entire data chunks whose min/max metadata does not contain 'E500').
  - *Arabic:* تمرير الإسقاط (قراءة عمود `error_code` فقط وتخطي 99 عموداً على القرص) مع تمرير الشروط وإحصائيات كتل الصفوف (تخطي قراءة الكتل التي تثبت بياناتها الوصفية خلوها من 'E500').
- **(B)** Parquet automatically executes the calculation on quantum computing hardware in cloud datacenters.
  - *Arabic:* يقوم تنسيق Parquet بتنفيذ الحسابات تلقائياً على معالجات الحوسبة الكمومية في مراكز البيانات.
- **(C)** CSV files require manual approval from system administrators before each disk read operation.
  - *Arabic:* تتطلب ملفات CSV موافقة يدوية من مديري النظام قبل كل عملية قراءة من القرص.
- **(D)** Parquet permanently truncates logs older than 7 days to keep file sizes artificially small.
  - *Arabic:* تقوم Parquet بحذف السجلات الأقدم من 7 أيام نهائياً لإبقاء حجم الملفات صغيراً بشكل مصطنع.

**Correct Answer:** Option (A)

**Deep Engineering Post-Mortem & Explanation:**
In CSV, the engine must stream all 100 columns over the network and parse text row-by-row. In Parquet, the query engine reads only the target column byte stream and uses Row Group min/max footer metadata to bypass reading non-matching blocks completely.

*التفسير الهندسي المعمق:*
في ملفات CSV، يضطر المحرك لقراءة وتفسير جميع الأعمدة الـ 100 سطراً بسطر. بينما في Parquet يقرأ المحرك عمود الهدف فقط ويستخدم بيانات الحد الأدنى والأقصى لتخطي قراءة الكتل غير المطابقة نهائياً.
