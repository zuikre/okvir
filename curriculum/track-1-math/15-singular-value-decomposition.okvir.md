---
id: "t1-15"
version: "1.0.0"
title: "Singular Value Decomposition (SVD) & Spectral Geometry"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["orthogonal-projections", "determinant-scaling-factor"]
i18n:
  ar: "تفكيك القيم المفردة (SVD) والهندسة الطيفية"
---

# Singular Value Decomposition (SVD) & Spectral Geometry

### Intuition & Physical Grounding

Imagine molding a lump of sculpting clay into a perfectly round spherical ball in your hands. Now, press and pull that ball between your palms, squashing it unevenly. Or imagine shining a flashlight at a spherical globe from an angle, projecting its shadow onto a tilted wall. No matter how you stretch, squish, or rotate that sphere in space, its physical shape undergoes a clean transformation: it deforms into an **ellipsoid** (a hyper-dimensional rugby ball). That ellipsoid possesses unmistakable principal axes: a major axis along its longest stretch, an intermediate axis along its medium stretch, and a minor axis along its narrowest compression.

In linear algebra, the Spectral Theorem was a mathematical triumph, but it was shackled by a severe real-world limitation: it only worked on square, symmetric matrices ($n \times n$). Yet in practical data science, computer vision, and machine learning, matrices are virtually never square or symmetric! You encounter rectangular data tables with 100,000 customers (rows) and 500 products (columns), or images with 1080 rows and 1920 columns. A rectangular matrix does not even map a space back into itself; it maps an input space of dimension $n$ into a completely different output space of dimension $m$. How can we discover the natural, unrotated geometric axes of such a transformation?

The **Singular Value Decomposition (SVD)** is the undisputed superpower and crowning jewel of modern linear algebra because it works on *every single matrix that can ever exist*: square or rectangular, tall or fat, full-rank or deficient, real or complex, with zero exceptions. It proves that any linear map—no matter how messy or dimensional—transforms a set of mutually perpendicular unit vectors in the input space into a set of mutually perpendicular axes in the output space, faithfully mapping a unit sphere into an ellipsoid.

Geometrically, SVD reveals that every linear transformation can be decomposed into three distinct, physical stages:
1. **Input Space Rotation ($\mathbf{V}^T$):** A rigid orthogonal rotation that aligns the input coordinate axes with the principal axes of the sphere.
2. **Coordinate Stretching ($\mathbf{\Sigma}$):** Pure independent scaling along the coordinate axes by non-negative factors called **singular values** ($\sigma_i$), which represent the lengths of the semi-axes of the output ellipsoid. If the matrix is rectangular, this step embeds or projects the vectors into the output dimension.
3. **Output Space Rotation ($\mathbf{U}$):** A rigid orthogonal rotation that swings the stretched axes into their final orientation in the output space.

By ordering the singular values from largest to smallest ($\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0$), SVD arranges the information content of a matrix in strict order of geometric importance. This makes SVD the mathematical foundation of optimal data compression: dropping the smallest singular values strips away random noise while retaining nearly all structural variance.

#### Why Do We Care?
SVD is the master engine driving the algorithms of modern artificial intelligence and data engineering:
1. **Optimal Low-Rank Matrix Compression (Eckart-Young Theorem):** Truncating the SVD to its top $k$ components produces the provably optimal rank-$k$ approximation of a matrix under both Frobenius and spectral norms. A high-resolution image can be compressed into a fraction of its file size while preserving crisp visual features.
2. **Recommender Systems & Collaborative Filtering:** During the famous \$1M Netflix Prize competition, SVD uncovered latent factors connecting users and movies (such as identifying that a user likes sci-fi comedies, even if they never explicitly rated that genre).
3. **Natural Language Processing & Latent Semantic Analysis (LSA):** In term-document frequency matrices, SVD projects thousands of words onto semantic concept spaces, capturing word synonymy and topical context without manual feature engineering.
4. **The Moore-Penrose Pseudoinverse ($\mathbf{A}^+$):** When solving linear systems $\mathbf{A}\mathbf{x} = \mathbf{b}$ where $\mathbf{A}$ is non-invertible, rectangular, or overdetermined, SVD computes the unique minimum-norm least-squares solution: $\mathbf{x}^+ = \mathbf{V}\mathbf{\Sigma}^+\mathbf{U}^T\mathbf{b}$.
5. **Parameter-Efficient Fine-Tuning in LLMs (LoRA):** Low-Rank Adaptation (LoRA) enables fine-tuning multi-billion parameter Large Language Models by representing huge weight updates $\Delta \mathbf{W}$ as low-rank matrix products $\mathbf{B}\mathbf{A}$, directly leveraging SVD's rank-truncation insight.

---

#### Jargon Decoder

| Technical Term | Plain English Intuition | المصطلح بالعربية | المعنى البديهي المبسط |
| :--- | :--- | :--- | :--- |
| SVD ($A = U \Sigma V^T$) | The master decomposition factoring ANY matrix into rotate, stretch, and rotate | تفكيك القيم المفردة (SVD) | التحليل الشامل الذي يفكك أي مصفوفة إلى دوران ثم تمديد ثم دوران |
| Singular Values ($\sigma_i$) | The sorted stretch factors along the principal axes, measuring importance | القيم المفردة ($\sigma_i$) | معاملات التمديد المرتبة تنازلياً، وتقيس وزن وأهمية كل نمط في البيانات |
| Right Singular Vectors ($V$) | The perpendicular input directions that experience pure stretching | المتجهات المفردة اليمنى ($V$) | المحاور المتعامدة في فضاء المدخلات التي تتعرض لتمدد نقي |
| Left Singular Vectors ($U$) | The perpendicular output directions where the stretched axes land | المتجهات المفردة اليسرى ($U$) | المحاور المتعامدة في فضاء المخرجات التي تستقر عندها الأبعاد الممددة |
| Low-Rank Approximation | Data compression: keeping only the largest singular values and tossing the noise | التقريب منخفض الرتبة | ضغط البيانات والصور: الاحتفاظ بأكبر القيم المفردة وحذف الضجيج |

#### Geometric & Visual Flow

```
   Unit Sphere          Aligned Sphere        Hyper-Ellipsoid      Rotated Output
      (x)       ──V^T──►     (V^T*x)    ──Σ──►   (Σ*V^T*x)  ──U──►   (U*Σ*V^T*x)
    Circle               Rotated              Stretched            Final orientation
                       (Input bases)        by σ1, σ2,...        (Output bases)
```

### الحدس الفيزيائي والهندسي

تخيل أنك تصنع كرة مستديرة تماماً من الصلصال بيديك. الآن، اضغط عليها واسحبها بقوة بين راحتي كفيك في اتجاهات مختلفة. أو تخيل أنك تسلط ضوء مصباح يدوي على كرة قدم من زاوية مائلة، مسقطاً ظلها على جدار مائل. مهما كان مقدار الشد والضغط والدوران الذي تعرضت له الكرة، فإن شكلها الهندسي يتحول حتماً إلى **قطع ناقص فائق** (Hyper-ellipsoid، يشبه كرة الركبي). هذا القطع الناقص يمتلك محاور رئيسية متعامدة لا تخطئها العين: محوراً رئيسياً يمثل أقصى استطالة، ومحوراً أوسط، ومحوراً أصغر يمثل أشد انضغاط.

في الجبر الخطي، كانت المبرهنة الطيفية إنجازاً عظيماً، لكنها كانت مقيدة بشرط خانق: فهي تعمل فقط على المصفوفات المربعة المتناظرة ($n \times n$). ولكن في عالم البيانات الحقيقي والذكاء الاصطناعي، تكاد لا تجد مصفوفة مربعة متناظرة! فجداول البيانات الحقيقية مستطيلة تضم مثلاً 100,000 عميل و500 منتج، والصور الرقمية تتألف من 1080 صفاً و1920 عموداً. والمصفوفة المستطيلة لا تنقل الفضاء إلى نفسه أصلاً، بل تنقل متجهات من فضاء ذي بُعد $n$ إلى فضاء آخر تماماً ذي بُعد $m$. فكيف نكتشف المحاور الطبيعية الصامدة لمثل هذه التحويلات العامة؟

هنا يبرز **تفكيك القيم المفردة (SVD)** كأقوى أداة خارقة والمفتاح الذهبي المطلق للجبر الخطي؛ لأنه يعمل على *أي مصفوفة يمكن أن توجد في الكون*: مربعة أو مستطيلة، طويلة أو عريضة، تامة الرتبة أو ناقصة، حقيقية أو مركبة، دون أي استثناء على الإطلاق. يثبت SVD رياضياً أن أي تحويل خطي في الوجود ينقل مجموعة من متجهات الوحدة المتعامدة في فضاء المدخلات إلى محاور متعامدة تماماً في فضاء المخرجات، محولاً كرة الوحدة إلى قطع ناقص فائق.

هندسياً، يكشف SVD أن أي عملية ضرب مصفوفية معقدة تتحلل في جوهرها إلى ثلاثة أطوار فيزيائية بديهية:
1. **دوران في فضاء المدخلات ($\mathbf{V}^T$):** دوران صلب متعامد يحاذي محاور الإحداثيات مع المحاور الطبيعية لكرة المدخلات.
2. **تمديد وتغيير أبعاد ($\mathbf{\Sigma}$):** شد وتمديد مستقل على طول المحاور الإحداثية بمعاملات غير سالبة تُسمى **القيم المفردة** ($\sigma_i$)، وهي التي تحدد أطوال أنصاف محاور القطع الناقص الناتج، مع إسقاط المتجهات في فضاء البُعد الجديد إذا كانت المصفوفة مستطيلة.
3. **دوران في فضاء المخرجات ($\mathbf{U}$):** دوران صلب متعامد يدير تلك المحاور الممددة لتتخذ اتجاهها النهائي في فضاء المخرجات.

وعند ترتيب القيم المفردة تنازلياً من الأكبر إلى الأصغر ($\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0$)، فإن SVD يرتب المعلومات والتباينات الكامنة في المصفوفة حسب أهميتها الهندسية، مما يجعله الأساس الرياضي الأول لضغط البيانات وإزالة الضوضاء العشوائية.

#### لماذا نهتم بهذا المفهوم؟
تفكيك SVD هو المحرك الرياضي الخفي لأحدث تقنيات الذكاء الاصطناعي وعلم البيانات:
1. **التقريب الأمثل منخفض الرتبة وضغط البيانات (مبرهنة إيكارت-يونغ):** عند اقتطاع SVD والاحتفاظ بأعلى $k$ قيمة مفردة فقط، يمنحنا SVD أفضل مصفوفة تقريبية من الرتبة $k$ ممكنة رياضياً تحت معياري فروبينيوس والطيفي؛ مما يتيح ضغط الصور الرقمية والبيانات الضخمة إلى جزء ضئيل من حجمها الأصلي مع بقاء تفاصيلها واضحة.
2. **أنظمة التوصية الذكية (جائزة Netflix):** في مصفوفات تقييم الأفلام والمنتجات، يكشف SVD عن العوامل الكامنة الخفية (Latent Factors) المشتركة بين المستخدمين والأفلام (مثل استنتاج ميل المستخدم لأفلام الخيال العلمي الكوميدية حتى لو لم يصرح بذلك).
3. **معالجة اللغات الطبيعية والتحليل الدلالي الكامن (LSA):** في مصفوفات تكرار الكلمات داخل المستندات، يُسقط SVD آلاف الكلمات على فضاء المفاهيم الدلالية، ملتقطاً الترادف والمعاني السياقية تلقائياً.
4. **شبه المعكوس لمور-بينروز ($\mathbf{A}^+$):** عند حل المنظومات الخطية $\mathbf{A}\mathbf{x} = \mathbf{b}$ المستطيلة أو غير القابلة للعكس، يمنحنا SVD الحل الفريد الأدنى معياراً للمربعات الصغرى: $\mathbf{x}^+ = \mathbf{V}\mathbf{\Sigma}^+\mathbf{U}^T\mathbf{b}$.
5. **التوليف الفعال للنماذج اللغوية الضخمة (LoRA):** تعتمد تقنية LoRA المستخدمة في تدريب وتخصيص نماذج الذكاء الاصطناعي التوليدي على تمثيل تحديثات الأوزان الضخمة $\Delta \mathbf{W}$ كمصفوفات منخفضة الرتبة، وهو تطبيق عصري مباشر لرؤية SVD الهندسية.

#### قاموس المصطلحات البسيطة

| المصطلح التقني | المعنى البديهي بالإنجليزية | المصطلح العربي | المعنى البديهي المبسط |
| :--- | :--- | :--- | :--- |
| تفكيك القيم المفردة (SVD) | The master decomposition factoring ANY matrix into rotate, stretch, and rotate | تفكيك القيم المفردة (SVD) | التحليل الشامل الذي يفكك أي مصفوفة إلى دوران ثم تمديد ثم دوران |
| القيم المفردة ($\sigma_i$) | The sorted stretch factors along the principal axes, measuring importance | القيم المفردة ($\sigma_i$) | معاملات التمديد المرتبة تنازلياً، وتقيس وزن وأهمية كل نمط في البيانات |
| المتجهات المفردة اليمنى ($V$) | The perpendicular input directions that experience pure stretching | المتجهات المفردة اليمنى ($V$) | المحاور المتعامدة في فضاء المدخلات التي تتعرض لتمدد نقي |
| المتجهات المفردة اليسرى ($U$) | The perpendicular output directions where the stretched axes land | المتجهات المفردة اليسرى ($U$) | المحاور المتعامدة في فضاء المخرجات التي تستقر عندها الأبعاد الممددة |
| التقريب منخفض الرتبة | Data compression: keeping only the largest singular values and tossing the noise | التقريب منخفض الرتبة | ضغط البيانات والصور: الاحتفاظ بأكبر القيم المفردة وحذف الضجيج |

#### المخطط البصري الهندسي

```
   كرة الوحدة            كرة مدورة             شكل بيضاوي ممدد      المخرج النهائي
      (x)       ──V^T──►     (V^T*x)    ──Σ──►   (Σ*V^T*x)  ──U──►   (U*Σ*V^T*x)
    دائرة أولية          دوران المحاور        تمدد المحاور         دوران نهائي
                        (أساسات الدخل)       بالمعاملات σ         (أساسات الخرج)
```

:::simulation-widget{engine="canvas2d" component="SVDImageCompressorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A} \in \mathbb{R}^{m \times n}, \quad \mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T, \quad \sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $\mathbf{A} \in \mathbb{R}^{m \times n}$ | Arbitrary Data Matrix | Any generic linear transformation mapping $n$-dimensional inputs to $m$-dimensional outputs. |
| $\mathbf{U} \in \mathbb{R}^{m \times m}$ | Left Singular Vectors Matrix | An orthogonal matrix whose columns $\mathbf{u}_i$ are unit eigenvectors of $\mathbf{A}\mathbf{A}^T$, spanning the output space. |
| $\mathbf{\Sigma} \in \mathbb{R}^{m \times n}$ | Singular Value Matrix | A rectangular diagonal matrix containing non-negative stretch factors $\sigma_i = \sqrt{\lambda_i(\mathbf{A}^T\mathbf{A})}$. |
| $\mathbf{V}^T \in \mathbb{R}^{n \times n}$ | Right Singular Vectors Matrix | An orthogonal matrix whose rows $\mathbf{v}_i^T$ are unit eigenvectors of $\mathbf{A}^T\mathbf{A}$, spanning the input space. |
| $\sigma_i \in \mathbb{R}_{\ge 0}$ | Singular Value | The length of the $i$-th semi-axis of the hyper-ellipsoid, quantifying the energy/variance along direction $\mathbf{u}_i$. |
| $\mathbf{u}_i \mathbf{v}_i^T \in \mathbb{R}^{m \times n}$ | Rank-1 Outer Product Matrix | A foundational building block mapping direction $\mathbf{v}_i$ in input space directly to direction $\mathbf{u}_i$ in output space. |
| $\sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^T$ | Truncated Eckart-Young Sum | The provably optimal rank-$k$ approximation ($\mathbf{A}_k$) retaining the maximal possible variance. |

##### Why the Math Works Step-by-Step
1. **Why does SVD factorize into Rotate $\to$ Stretch $\to$ Rotate?** Any linear transformation maps the unit sphere $\{\mathbf{x} : \|\mathbf{x}\|_2 = 1\}$ into an ellipsoid. Rotating the input coordinate frame by $\mathbf{V}^T$ aligns the sphere with the axes that undergo maximal stretching. Diagonal matrix $\mathbf{\Sigma}$ applies those stretches $\sigma_i$. Finally, rotation $\mathbf{U}$ points the resulting principal axes in their proper directions in output space.
2. **Why are singular values the square roots of eigenvalues ($\sigma_i = \sqrt{\lambda_i(\mathbf{A}^T\mathbf{A})}$)?** Notice that the symmetric matrix $\mathbf{A}^T\mathbf{A} = (\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T)^T (\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T) = \mathbf{V}\mathbf{\Sigma}^T\mathbf{U}^T\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$. Because $\mathbf{U}$ is orthogonal ($\mathbf{U}^T\mathbf{U} = \mathbf{I}$), this simplifies to $\mathbf{V}(\mathbf{\Sigma}^T\mathbf{\Sigma})\mathbf{V}^T$. Since $\mathbf{\Sigma}^T\mathbf{\Sigma}$ has diagonal entries $\sigma_i^2$, the singular values of $\mathbf{A}$ are precisely the positive square roots of the eigenvalues of the symmetric matrix $\mathbf{A}^T\mathbf{A}$.
3. **Why are $\mathbf{U}$ and $\mathbf{V}$ guaranteed to be orthogonal?** The matrices $\mathbf{A}^T\mathbf{A}$ ($n \times n$) and $\mathbf{A}\mathbf{A}^T$ ($m \times m$) are always symmetric and positive semi-definite. By the Spectral Theorem, every symmetric matrix has a complete orthonormal basis of eigenvectors. $\mathbf{V}$ is the orthonormal eigenbasis of $\mathbf{A}^T\mathbf{A}$, and $\mathbf{U}$ is the orthonormal eigenbasis of $\mathbf{A}\mathbf{A}^T$.
4. **Why is the truncated sum optimal (Eckart-Young Theorem)?** The total variance (squared Frobenius norm $\|\mathbf{A}\|_F^2$) equals $\sum_{i=1}^r \sigma_i^2$. Because the singular values are sorted in descending order ($\sigma_1 \ge \sigma_2 \ge \dots$), truncating the sum at index $k$ discards the smallest possible variance ($\sum_{i=k+1}^r \sigma_i^2$), provably minimizing the approximation error $\|\mathbf{A} - \mathbf{B}\|_F$ among all matrices $\mathbf{B}$ of rank at most $k$.

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $\mathbf{A} \in \mathbb{R}^{m \times n}$ | مصفوفة البيانات العامة | أي تحويل خطي ينقل متجهات من فضاء مدخلات ذي $n$ بعداً إلى فضاء مخرجات ذي $m$ بعداً. |
| $\mathbf{U} \in \mathbb{R}^{m \times m}$ | مصفوفة المتجهات المفردة اليسرى | مصفوفة دوران متعامدة تشكل أعمدتها $\mathbf{u}_i$ متجهات الوحدة الذاتية لـ $\mathbf{A}\mathbf{A}^T$ وتغطي فضاء المخرجات. |
| $\mathbf{\Sigma} \in \mathbb{R}^{m \times n}$ | مصفوفة القيم المفردة | مصفوفة شبه قطرية تضم معاملات الشد غير السالبة $\sigma_i = \sqrt{\lambda_i(\mathbf{A}^T\mathbf{A})}$. |
| $\mathbf{V}^T \in \mathbb{R}^{n \times n}$ | مصفوفة المتجهات المفردة اليمنى المنقولة | مصفوفة دوران متعامدة تشكل صفوفها $\mathbf{v}_i^T$ متجهات الوحدة الذاتية لـ $\mathbf{A}^T\mathbf{A}$ وتغطي فضاء المدخلات. |
| $\sigma_i \in \mathbb{R}_{\ge 0}$ | القيمة المفردة | طول نصف المحور في القطع الناقص الفائق، ويعبر بدقة عن مقدار الطاقة والتباين على طول الاتجاه $\mathbf{u}_i$. |
| $\mathbf{u}_i \mathbf{v}_i^T$ | مصفوفة جداء خارجي من الرتبة الأولى | لبنة بناء أساسية تنقل الاتجاه $\mathbf{v}_i$ في فضاء المدخلات مباشرة إلى الاتجاه $\mathbf{u}_i$ في فضاء المخرجات. |
| $\sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^T$ | مجموع إيكارت-يونغ المقتطع | التقريب الأمثل والمثبت رياضياً من الرتبة $k$ الذي يحتفظ بأعلى قدر ممكن من تباين ومعلومات البيانات. |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **لماذا يتحلل أي تحويل إلى: دوران $\to$ شد $\to$ دوران؟** ينقل أي تحويل خطي كرة الوحدة $\{\mathbf{x} : \|\mathbf{x}\|_2 = 1\}$ إلى قطع ناقص. دوران فضاء المدخلات عبر $\mathbf{V}^T$ يحاذي محاور الكرة مع الاتجاهات التي ستتعرض لأقصى تمدد؛ وتقوم المصفوفة القطرية $\mathbf{\Sigma}$ بشد تلك المحاور بمقادير $\sigma_i$؛ وأخيراً يقوم الدوران $\mathbf{U}$ بتوجيه محاور القطع الناقص في اتجاهاتها الصحيحة داخل فضاء المخرجات.
2. **لماذا تمثل القيم المفردة الجذور التربيعية للقيم الذاتية ($\sigma_i = \sqrt{\lambda_i(\mathbf{A}^T\mathbf{A})}$)؟** بتطبيق المصفوفة المتناظرة $\mathbf{A}^T\mathbf{A} = (\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T)^T (\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T) = \mathbf{V}\mathbf{\Sigma}^T\mathbf{U}^T\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$. ولأن $\mathbf{U}$ مصفوفة متعامدة ($\mathbf{U}^T\mathbf{U} = \mathbf{I}$)، تتبسط المعادلة إلى $\mathbf{V}(\mathbf{\Sigma}^T\mathbf{\Sigma})\mathbf{V}^T$. وحيث إن عناصر قطر $\mathbf{\Sigma}^T\mathbf{\Sigma}$ هي $\sigma_i^2$، فإن القيم المفردة هي الجذور التربيعية الموجبة للقيم الذاتية للمصفوفة المتناظرة $\mathbf{A}^T\mathbf{A}$.
3. **لماذا تكون المصفوفات $\mathbf{U}$ و $\mathbf{V}$ متعامدة بالضرورة؟** المصفوفتان $\mathbf{A}^T\mathbf{A}$ و $\mathbf{A}\mathbf{A}^T$ متناظرتان وشبه موجبتي التعريف دائماً. ووفقاً للمبرهنة الطيفية، تمتلك كل مصفوفة متناظرة أساساً متعامداً من المتجهات الذاتية؛ ومصفوفة $\mathbf{V}$ هي الأساس الذاتي المتعامد لـ $\mathbf{A}^T\mathbf{A}$ بينما $\mathbf{U}$ هي الأساس لـ $\mathbf{A}\mathbf{A}^T$.
4. **لماذا يُعد المجموع المقتطع حلاً أمثلاً (مبرهنة إيكارت-يونغ)؟** إجمالي تباين المصفوفة (مربع معيار فروبينيوس) يساوي مجموع مربعات القيم المفردة $\sum \sigma_i^2$. ولأن القيم المفردة مرتبة تنازلياً ($\sigma_1 \ge \sigma_2 \ge \dots$)، فإن اقتطاع المجموع عند الرتبة $k$ يهمل أصغر تباين ممكن، مما يقلل خطأ التقريب $\|\mathbf{A} - \mathbf{B}\|_F$ إلى الحد الأدنى المطلق مقارنة بأي مصفوفة أخرى في الكون رتبتها $k$.

:::python-challenge{id="py-t1-15"}
---
timeout_ms: 3000
test_cases:
  - input: "round(svd_rank_k_approx(np.array([[3.0, 0.0], [0.0, 4.0]]), 1)[1], 2)"
    expected: "0.64"
  - input: "round(svd_rank_k_approx(np.array([[1.0, 2.0], [2.0, 4.0]]), 1)[1], 2)"
    expected: "1.0"
  - input: "round(svd_rank_k_approx(np.eye(4), 2)[1], 2)"
    expected: "0.5"
---
```python
import numpy as np

def svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:
    """
    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.

    Intuition
    ---------
    Truncating the SVD of matrix A to its top k singular values retains the
    maximum possible variance and energy while eliminating noise. The retained
    energy ratio measures the proportion of total variance captured by the
    rank-k reconstruction.

    Parameters
    ----------
    A : np.ndarray of shape (M, N)
        Input rectangular or square data matrix.
    k : int
        Target approximation rank (1 <= k <= min(M, N)).

    Returns
    -------
    tuple[np.ndarray, float]
        A_k: Optimal rank-k reconstructed matrix of shape (M, N).
        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).
    """
    # Step 1: Compute thin SVD using np.linalg.svd(A, full_matrices=False)
    # U, S, Vt = np.linalg.svd(A, full_matrices=False)

    # Step 2: Truncate to top k components: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :]
    # Uk = U[:, :k]
    # Sk = S[:k]
    # Vtk = Vt[:k, :]

    # Step 3: Reconstruct A_k = Uk @ np.diag(Sk) @ Vtk and compute retained energy ratio
    # A_k = Uk @ np.diag(Sk) @ Vtk
    # energy_ratio = float(np.sum(Sk ** 2) / np.sum(S ** 2))
    # return A_k, energy_ratio
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** According to the fundamental Eckart-Young-Mirsky Theorem, if you truncate the SVD of matrix A to its top k singular values producing A_k, how does A_k compare to ANY other matrix B of rank at most k?

**العربية:** وفقاً لمبرهنة إيكارت-يونغ-ميرسكي الأساسية، إذا قمت باقتطاع SVD للمصفوفة A عند أول k قيمة مفردة لتنتج A_k، فكيف تقارن A_k بأي مصفوفة أخرى B في العالم رتبتها k كحد أقصى؟

* [x] A_k is mathematically proven to achieve the minimal possible approximation error ||A - B|| under both the Frobenius norm and spectral L2 norm among ALL possible rank-k matrices.
  * ثبت رياضياً أن A_k تحقق أدنى خطأ تقريب ممكن ||A - B|| تحت كل من معيار فروبينيوس ومعيار L2 الطيفي بين كافة المصفوفات الممكنة ذات الرتبة k.
  > **Why this is correct:** The Eckart-Young theorem states that truncating the SVD gives the globally optimal low-rank projection in Hilbert space; no other linear compression technique can retain more energy with k components.
  > **لماذا هذا الخيار صحيح:** تنص مبرهنة إيكارت-يونغ على أن اقتطاع SVD يمنح أفضل إسقاط منخفض الرتبة على الإطلاق؛ ولا يمكن لأي خوارزمية ضغط خطية أخرى أن تحتفظ بقدر من الطاقة والتباين أكبر مما يحتفظ به SVD باستخدام k مركبة.

* [ ] A_k is an arbitrary heuristic approximation with no guaranteed optimality bounds.
  * A_k هو مجرد تقريب تجريبي تقريبي دون أي ضمانات رياضية للمثالية.
  > **Why this is incorrect:** SVD is exact and mathematically proven optimal; it is not a heuristic.
  > **لماذا هذا الخيار خاطئ:** تفكيك SVD دقيق ومثبت كحل أمثل مطلق وليس تقريباً تجريبياً.

* [ ] A_k only minimizes error if the original matrix A was symmetric and non-negative.
  * A_k يقلل الخطأ فقط إذا كانت المصفوفة الأصلية A متناظرة وغير سالبة.
  > **Why this is incorrect:** The power of Eckart-Young is that it holds universally for EVERY matrix, rectangular or square, signed or unsigned.
  > **لماذا هذا الخيار خاطئ:** تكمن قوة مبرهنة إيكارت-يونغ في أنها تنطبق على كل مصفوفة دون استثناء، سواء كانت مستطيلة أو مربعة.
