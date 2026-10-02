---
id: "columnar-storage-parquet"
version: "1.0.0"
title: "Parquet Columnar Storage, Strided Encodings & Pushdown"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: []
i18n:
  ar: "تخزين Parquet العمودي، ترميز الخطوات، وتمرير الشروط (Predicate Pushdown)"
---

# Parquet Columnar Storage, Strided Encodings & Pushdown

## Beat 1: Intuition & Mental Model

Why did the modern data engineering, machine learning, and AI lakehouse industry almost completely abandon CSV and JSON files in favor of Apache Parquet? The reason is not merely incremental file compression; it is a profound physical revolution in computer storage architecture. CSV is strictly **Row-Oriented**, while Apache Parquet is strictly **Columnar**!

### The Giant Ledger Analogy: Reading by Columns Instead of Lines
To visualize this physical layout disparity, imagine a massive 10,000-page accounting ledger book containing 100,000,000 transaction rows. Each row spans 50 distinct columns: `transaction_id`, `customer_name`, `home_address`, `phone_number`, `shipping_notes`, `timestamp`, ..., and finally `price_usd`.
Now imagine an executive asks you a single aggregated question: *"What was our total company revenue across all transactions last year?"*
- **Row-Oriented Format (CSV / Traditional RDBMS)**: Reading this data is like reading a traditional book line by line. To reach the price in row 1, the computer must scan past the customer name, address, and shipping notes. To read row 2, it flips to the next line and repeats the exact same tedious scan! Even though your query only cares about 1 single column (`price_usd`), the storage subsystem is physically forced to stream **100% of all 50 columns from disk into RAM**, wasting over 98% of your expensive I/O bandwidth on text strings you immediately discard!
- **Column-Oriented Format (Apache Parquet)**: Instead of binding every line together, Parquet cuts the ledger book into 50 independent ribbons of continuous paper—one ribbon per column! All 100,000,000 prices are written sequentially end-to-end on ribbon #50. When your revenue query runs, the storage engine opens **only ribbon #50**, reading 100% useful payload at maximum NVMe SSD hardware wire speed without touching a single byte of customer names, addresses, or phone numbers!

### Dictionary Encoding & Run-Length Encoding (RLE)
Columnar storage unlocks another massive hardware advantage: **homogeneous data compression**. In a row-oriented file, a 64-bit integer is immediately followed by a 200-byte text address, followed by a timestamp. General compression algorithms struggle because adjacent bytes have zero statistical similarity. In contrast, in a Parquet column buffer, millions of values of the exact same data type sit adjacent to one another in physical storage!

In categorical string columns—such as a `state_code` column with millions of repetitions of `"California"` or `"Texas"`—Parquet automatically applies **Dictionary Encoding**. It stores the unique string `"California"` once in a local dictionary table and replaces all 10,000,000 occurrences in the data stream with a tiny 1-byte integer pointer (`uint8`). If identical values appear in runs, it applies **Run-Length Encoding (RLE)**: storing `("California", count=500000)` in less than 8 bytes of space!

### The Double Superpower: Projection & Predicate Pushdown
Parquet files are partitioned into self-contained vertical chunks called **Row Groups** (typically 512 MB to 1 GB of data). At the end of every Parquet file sits a rich metadata **Footer** recording the exact byte offsets, data schemas, and statistical min/max bounds for every single column in every Row Group:
1. **Projection Pushdown**: The query engine reads the footer, identifies the exact byte range of the requested columns (`price_usd`), and issues targeted OS `pread()` disk calls that skip 95%+ of unreferenced column bytes.
2. **Predicate Pushdown**: If your query includes `WHERE transaction_date >= '2024-01-01'`, the engine inspects the min/max statistics in the footer before reading the actual data. If a Row Group's maximum date is `2023-12-31`, the engine skips that entire Row Group without reading a single byte from disk!

:::simulation-widget{engine="canvas2d" component="ArrowBufferMemoryLayoutLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

لماذا هاجر مجتمع هندسة البيانات والذكاء الاصطناعي وبحيرات البيانات السحابية (Lakehouses) بالكامل تقريباً من ملفات CSV و JSON إلى تنسيق Apache Parquet؟ السبب ليس مجرد ضغط إضافي لحجم الملفات؛ بل هو ثورة معمارية فيزيائية شاملة في طريقة تخزين واسترجاع البيانات من أقراص التخزين. ملفات CSV تعتمد كلياً على **التخزين الصفي (Row-Oriented)**، بينما تعتمد Parquet على **التخزين العمودي (Columnar)**!

### تشبيه السجل المحاسبي الضخم: القراءة بالأعمدة بدلاً من السطور
لتجسيد هذا الفارق الفيزيائي، تخيل سجلاً محاسبياً ورقياً ضخماً من 10,000 صفحة يحوي 100,000,000 معاملة بيع. وفي كل صف 50 معلومة مختلفة: `رقم_الفاتورة`، `اسم_العميل`، `عنوان_السكن`، `ملاحظات_الشحن`، ..., و`السعر_بالدولار`.
طُلب منك الآن الإجابة عن سؤال مالي محدد: *"كم يبلغ إجمالي إيرادات الشركة لجميع المعاملات في العام الماضي؟"*
- **التخزين الصفي (CSV وقواعد البيانات التقليدية)**: قراءة البيانات هنا تشبه قراءة كتاب تقليدي سطراً بسطر. للوصول إلى السعر في الصف الأول، يضطر الحاسوب لقراءة اسم العميل وعنوانه وملاحظات الشحن. وللانتقال للصف الثاني، يكرر القراءة المجهدة ذاتها! ومع أن الاستعلام يحتاج عموداً واحداً فقط (`السعر`)، يُجبر عتاد التخزين على سحب **100% من جميع الأعمدة الـ 50 من القرص إلى الذاكرة**، مهدراً أكثر من 98% من سرعة القراءة في نصوص لا علاقة لها بالاستعلام!
- **التخزين العمودي (Apache Parquet)**: بدلاً من دمج الأعمدة في سطور متصلة، تقص Parquet السجل إلى 50 شريطاً ورقياً مستقلاً—شريط مخصص لكل عمود! وتُرصف جميع الأسعار الـ 100 مليون بالتتابع على الشريط رقم 50. وعند تشغيل استعلام الإيرادات، يفتح محرك البيانات **الشريط رقم 50 فقط**، قارئاً 100% بيانات مفيدة بأقصى سرعة عتادية لأقراص NVMe SSD دون أن يلمس بايت واحداً من أسماء العملاء أو عناوينهم!

### ترميز القواميس (Dictionary Encoding) وترميز التكرار المتتابع (RLE)
يفتح التخزين العمودي ميزة عتادية هائلة أخرى: **كفاءة الضغط الفائق للبيانات المتجانسة**. في الملفات الصفية، يتجاور رقم صحيح سعة 8 بايت مع نص طويل ثم تاريخ؛ مما يعجز خوارزميات الضغط العامة لغياب التشابه بين البايتات المتجاورة. أما في Parquet، فتصطف ملايين القيم من نفس نوع البيانات جنباً إلى جنب فيزيائياً في الذاكرة والقرص!

في أعمدة النصوص المتكررة—مثل عمود `رمز_المنطقة` الذي يكرر كلمات مثل `"الرياض"` أو `"دبي"` ملايين المرات—تطبق Parquet تلقائياً **ترميز القواميس (Dictionary Encoding)**. فتخزن كلمة `"الرياض"` مرة واحدة فقط في جدول قاموس محلي، وتستبدل ملايين التكرارات برقم فهرس صغير جداً من بايت واحد (`uint8`). وإذا تكررت القيمة في صفوف متتالية، تطبق **ترميز التكرار المتتابع (Run-Length Encoding)** لتخزن ملايين التكرارات في أقل من 8 بايتات!

### القوتان الخارقتان: تمرير الإسقاط وتمرير الشروط (Pushdown)
تُقسم ملفات Parquet إلى كتل عمودية ذاتية الاحتواء تُسمى **مجموعات الصفوف (Row Groups)**. وفي نهاية كل ملف، يُحفظ سجل بيانات وصفية غني يُسمى **تذييل الملف (Footer)** يسجل الإزاحات الدقيقة وإحصائيات الحد الأدنى والأقصى (Min/Max) لكل عمود في كل كتلة:
1. **تمرير الإسقاط (Projection Pushdown)**: يقرأ محرك الاستعلام تذييل الملف أولاً، فيحدد العناوين الدقيقة لعمود `السعر`، ويطلب قراءته فقط عبر تعليمات قراءة موجهة تتجاهل 95%+ من أعمدة الملف الأخرى.
2. **تمرير الشروط (Predicate Pushdown)**: إذا تضمن استعلامك شرطاً زمنياً `WHERE sale_date >= '2024-01-01'`، يفحص المحرك إحصائيات التذييل قبل قراءة أي بيانات فعلية. فإذا كان الحد الأقصى لتاريخ كتلة معينة هو `2023-12-31`، يتخطى المحرك قراءة تلك الكتلة بالكامل دون استهلاك بايت واحد من القرص!

## Beat 2: Formal Foundations & Mathematical Invariants

$$
\text{IO}_{\text{row}} = N \sum_{c=1}^C w_c \quad \gg \quad \text{IO}_{\text{columnar}} = N \sum_{c \in \mathcal{C}_{\text{query}}} w_c \cdot (1 - \rho_c)
$$

$$
\rho_{\text{dict}} = 1 - \frac{|\mathcal{V}| \cdot \bar{L} + N \cdot \lceil \log_2 |\mathcal{V}| / 8 \rceil}{N \cdot \bar{L}}
$$

### Mathematical Invariants & Symbol Breakdown

| الرمز / Symbol | المجال والتعريف الرياضي / Mathematical Domain | الدور الهندسي والمعماري / Data Engineering & Architectural Role | الشرح الدقيق بالعربية / Arabic Explanation |
| :--- | :--- | :--- | :--- |
| $N$ | $N \in \mathbb{N}^+$ | Total tuple cardinality in physical table dataset | إجمالي عدد الصفوف في جدول البيانات الفيزيائي |
| $C$ | $C \in \mathbb{N}^+$ | Total column attribute degree in table schema | إجمالي عدد الأعمدة في مخطط الجدول |
| $\mathcal{C}_{\text{query}}$ | $\mathcal{C}_{\text{query}} \subseteq \{1, \dots, C\}$ | Projection column subset actively requested by query plan ($|\mathcal{C}_{\text{query}}| \ll C$) | مجموعة الأعمدة المحددة والمطلوبة فعلياً في استعلام الإسقاط |
| $w_c$ | $w_c \in \mathbb{R}^+$ bytes | Mean uncompressed byte width of column attribute $c$ | متوسط حجم البيانات غير المضغوطة للعمود $c$ بالبايت |
| $\rho_c$ | $0 \le \rho_c < 1$ | Compression ratio achieved via columnar bit-packing, RLE, and ZSTD | نسبة الضغط المحققة عبر تقنيات الضغط والترميز العمودي |
| $|\mathcal{V}|$ | Cardinality of vocabulary | Distinct unique values in categorical string column ($|\mathcal{V}| \ll N$) | عدد المفردات الفريدة في عمود النصوص التصنيفي |
| $\bar{L}$ | $\bar{L} \in \mathbb{R}^+$ bytes | Mean string length in bytes for raw uncompressed vocabulary words | متوسط طول النصوص الأصلية بالبايت قبل الترميز |
| $\text{RowGroup}$ | Bounded storage partition | Physical chunking unit (e.g. 100K-1M rows) with autonomous footer stats | وحدة التخزين المستقلة ذات الإحصائيات الذاتية في ملف Parquet |

The fundamental I/O bound proves why analytical scan bandwidth is minimized in columnar formats: while row-oriented engines must read all $C$ attributes ($O(N \sum_{c=1}^C w_c)$), columnar engines read strictly the projected subset $\mathcal{C}_{\text{query}}$, reducing raw bytes by a factor of $\frac{\sum_{c \in \mathcal{C}_{\text{query}}} w_c}{\sum_{c=1}^C w_c}$. 

Furthermore, when categorical cardinality $|\mathcal{V}| \le 256$, $\lceil \log_2 |\mathcal{V}| / 8 \rceil = 1$ byte per row, yielding compression ratios $\rho_{\text{dict}} \to 1 - \frac{1}{\bar{L}} \approx 90-95\%$ for long text strings like URLs and addresses.

تثبت المعادلات الرياضية تفوق التخزين العمودي في تقليل استهلاك ناقل القراءة من الأقراص: فبينما تقرأ المحركات الصفية كامل الأعمدة $C$ إجبارياً، تقرأ المحركات العمودية الأعمدة المطلوبة للاستعلام فقط $\mathcal{C}_{\text{query}}$، مما يوفر نطاق القراءة بنسبة تطابق نسبة الأعمدة المطلوبة إلى إجمالي الأعمدة.

وعندما يكون عدد المفردات الفريدة $|\mathcal{V}| \le 256$، يُمثل كل صف ببايت واحد فقط، مما يحقق نسب ضغط هائلة $\rho_{\text{dict}} \approx 90-95\%$ للنصوص الطويلة مثل العناوين والروابط.

## Beat 3: Interactive Code Challenge

:::python-challenge{id="py-columnar-storage-parquet"}
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
An analytics lakehouse stores 50 Terabytes of telemetry logs in raw CSV format across 100 columns on cloud object storage (Amazon S3 / Google Cloud Storage). A nightly aggregation query scans a single column `error_code` to count 500 error spikes: `SELECT error_code, COUNT(*) FROM logs WHERE error_code = 'E500' GROUP BY error_code`. The query takes 55 minutes to finish and costs $250 per run in cloud network egress and S3 scan charges. When the lakehouse table is converted to Apache Parquet, the identical query finishes in 12 seconds and costs $0.40. Which architectural mechanisms explain this 250x acceleration and 600x cost reduction?

مستودع بيانات وبحيرة سحابية تخزن 50 تيرابايت من سجلات النظام بتنسيق CSV عبر 100 عمود في خدمة تخزين كائنات سحابية (S3 / GCS). يقوم استعلام تحليلي ليلي بفحص عمود واحد فقط `error_code` لرصد أخطاء النظام: `SELECT error_code, COUNT(*) FROM logs WHERE error_code = 'E500' GROUP BY error_code`. يستغرق الاستعلام 55 دقيقة ويكلف 250 دولاراً لكل تشغيلة بسبب رسوم قراءة البيانات عبر الشبكة. عند تحويل الجدول إلى Apache Parquet، انتهى نفس الاستعلام تماماً في 12 ثانية وهبطت التكلفة إلى 40 سنتاً فقط! ما الآليات المعمارية الدقيقة المسؤولة عن هذا التسارع بمقدار 250 ضعفاً وخفض التكلفة بمقدار 600 ضعف؟

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
- **Why Option (A) is correct:** In row-oriented CSV, the storage system must pull all 50 Terabytes across the network into memory because columns cannot be physically decoupled. The CPU spends almost all its time parsing commas, escaping quotes, and discarding 99 unwanted columns. In contrast, Apache Parquet enables two game-changing hardware accelerations: (1) **Projection Pushdown**: the query engine reads only the byte ranges belonging to column #1 (`error_code`), immediately slashing network transfer from 50 TB down to ~500 GB (a 99% reduction). (2) **Predicate Pushdown**: the engine reads the Parquet footer containing min/max values for each Row Group. Row Groups where `max(error_code) < 'E500'` or `min(error_code) > 'E500'` are skipped entirely without transferring a single byte. Combined with dictionary encoding, the actual data transferred drops to a few gigabytes, executing in seconds at cents of cost.
- **Why Option (B) is incorrect:** Apache Parquet is an open-source, on-disk binary columnar file format specification governed by the Apache Software Foundation. It runs on commodity standard x86 and ARM CPU servers; it has zero relationship with quantum computing.
- **Why Option (C) is incorrect:** Operating system filesystems and cloud object storage APIs serve byte range requests programmatically without human intervention. The slowness of CSV is caused by pure hardware I/O throughput limits and text serialization overhead.
- **Why Option (D) is incorrect:** Parquet files maintain complete data fidelity and enforce strict ACID storage consistency. They never arbitrarily truncate, drop, or sample historical data unless an engineer explicitly runs a retention policy script.

*التفسير الهندسي المعمق وتحليل الخيارات:*
- **لماذا الخيار (A) صحيح:** في ملفات CSV الصفية، يضطر النظام لقراءة كامل الـ 50 تيرابايت عبر الشبكة إلى الذاكرة؛ لأن الأعمدة متصلة فيزيائياً في كل سطر، ويقضي المعالج وقته في تحليل الفواصل وتجاوز 99 عموداً غير مطلوب. في المقابل، تحقق Parquet تسارعاً هائلاً عبر آليتين: (1) **تمرير الإسقاط (Projection Pushdown)**: يقرأ المحرك نطاق البايتات الخاص بعمود `error_code` فقط، مما يخفض البيانات المنقولة عبر الشبكة من 50 تيرابايت إلى ~500 جيجابايت فوراً (توفير 99%). (2) **تمرير الشروط (Predicate Pushdown)**: يفحص المحرك تذييل الملف لمعرفة الحدين الأدنى والأقصى لكل كتلة، فيتجاوز تماماً قراءة أي كتلة تخلو من الخطأ 'E500'. ومع ضغط القواميس، تنخفض القراءة إلى جيجابايتات معدودة تنتهي في ثوانٍ وبتكلفة سنتات معدودة.
- **لماذا الخيار (B) خاطئ:** تنسيق Parquet هو معيار مفتوح المصدر لتخزين البيانات عمودياً على الأقراص تشرف عليه مؤسسة أباتشي، ويعمل على الخوادم والمعالجات التقليدية x86 و ARM ولا علاقة له بالحواسيب الكمومية.
- **لماذا الخيار (C) خاطئ:** تتعامل نظم التشغيل وسحابات التخزين مع ملفات CSV برمجياً وبشكل آلي دون أي تدخل بشري، وبطء CSV يعود حصرياً إلى قيود نقل البيانات عبر الشبكة وتكلفة تفكيك النصوص سطراً بسطر.
- **لماذا الخيار (D) خاطئ:** تحافظ ملفات Parquet على دقة واكتمال البيانات بالكامل ولا تحذف أو تقطع أي سجلات قديمة إطلاقاً ما لم يُبرمج المهندس سياسة حذف دورية متعمدة.
