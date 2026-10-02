---
id: "random-forests-bagging"
version: "1.0.0"
title: "Random Forests, Bagging & Feature Subspace Sampling"
track: "econometrics"
module: "mod-32"
estimated_minutes: 15
prerequisites: ["decision-trees", "t1-29"]
i18n:
  ar: "الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات"
---

# Random Forests, Bagging & Feature Subspace Sampling

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

While a single CART decision tree provides unmatched interpretability, it suffers from a notorious structural vulnerability: trees are hypersensitive and possess massive statistical variance. A microscopic tremor in the training data—such as tweaking three numbers out of ten thousand—can cause the root split to pivot to a completely different feature. This initial divergence cascades down every subsequent branch, altering the architecture of the entire tree and producing wildly contradictory predictions for the exact same patient. Trusting a single unpruned decision tree with high-stakes decisions is like putting your life in the hands of an eccentric, hyper-sensitive physician who overreacts to every fleeting symptom and rushes to perform radical surgery.

In 2001, Leo Breiman transformed machine learning by formulating the **Random Forest**. Instead of trusting a single volatile practitioner, you convene a **council of 500 independent, highly qualified doctors who cast a democratic majority vote on the diagnosis**. If one physician is misled by idiosyncratic noise in their specific patient notes, their individual error is effortlessly canceled out and overwhelmed by the collective wisdom of the remaining 499 doctors.

To make this committee work, you must guarantee that the doctors do not all read the exact same medical chart or copy each other's opinions. Random Forests enforce independence through two clever layers of stochastic randomization:
1. **Bagging (Bootstrap Aggregation):** Each tree is cultivated on a distinct resampled dataset constructed by drawing $N$ samples *with replacement* from the original training corpus.
2. **Random Feature Subspace Sampling:** This was Breiman's defining stroke of mathematical genius. If one dominant symptom (such as massive tumor diameter) is overwhelmingly predictive, every single tree in the forest would greedily select it for the root split. The resulting trees would become clones of each other, sharing massive positive correlation! By forcing each node to choose its split from a randomly chosen sub-palette of $m \approx \sqrt{p}$ candidate features, Random Forests break this herd behavior. Trees are forced to explore secondary and tertiary signals, resulting in deeply decorrelated individual models.

The mathematical miracle of decorrelation is grounded in elementary probability: when you average $B$ independent, uncorrelated random variables, their collective variance collapses to zero at a rate of $1/B$. But if the estimators share a positive pairwise correlation $\rho$, the variance hits an irreducible asymptotic barrier: $\lim_{B \to \infty} \text{Var} = \rho \sigma^2$. By driving $\rho$ downward toward zero through feature subsampling, Random Forests slash this variance barrier, turning noisy, high-variance decision trees into an elite, robust predictive engine.

تتميز شجرة القرار الفردية بسهولة تفسيرها ووضوح مساراتها، لكنها تعاني من نقطة ضعف هيكلية قاتلة: وهي التباين الإحصائي المفرط (High Variance). فأي تغير طفيف أو ضجيج عابر في بيانات التدريب—كتعديل ثلاث قيم من بين عشرة آلاف—قد يقلب التفرع الجذري للشجرة بالكامل. هذا التغير الأولي يتدحرج ككرة ثلج عبر كافة التفرعات اللاحقة، مما يغير هندسة الشجرة بأكملها ويؤدي إلى تنبؤات متضاربة للحالة نفسها. إن الاعتماد على شجرة قرار فردية غير مقلمة في قرارات حاسمة يشبه وضع حياتك بين يدي طبيب غريب الأطوار، يبالغ في رد فعله تجاه كل عَرَض طفيف ويسارع إلى اتخاذ قرارات جراحية متسرعة.

في عام 2001، أحدث ليو بريمان ثورة تاريخية في تعلم الآلة عندما ابتكر **الغابات العشوائية (Random Forests)**. فبدلاً من الاعتماد على طبيب واحد مفرط الحساسية، تجمع الخوارزمية **مجلساً استشارياً يضم 500 طبيب مستقل يصوتون ديمقراطياً بالأغلبية على التشخيص النهائي**. فإذا انخدع أحد الأطباء بشائبة عشوائية في ملف مريضه، فإن خطأه الفردي يتلاشى وسط الحكمة التراكمية لبقية الأطباء الـ 499.

ولضمان نجاح هذا المجلس، يجب التأكد من أن الأطباء لا يقرؤون نفس التقرير الطبي حرفياً ولا يكررون نفس القرارات. تحقق الغابات العشوائية هذا التنوع عبر مستويين من العشوائية الرياضية:
1. **التجميع بالعينات التمهيدية (Bagging):** تُبنى كل شجرة على عينة بيانات مستقلة يتم سحبها مع الإرجاع (Bootstrap Sample) من عينة التدريب الأصلية.
2. **التعيين العشوائي للفضاء الجزئي للمتغيرات (Random Subspace Sampling):** هذا هو الابتكار الأبرز لبريمان؛ فإذا كان هناك متغير واحد مهيمن وفائق القوة التنبؤية (مثل حجم الورم)، فستختاره كافة الأشجار الـ 500 في جذرها تلقائياً، لتصبح نسخاً مكررة شديدة الارتباط. ولتفادي ذلك، تُجبر الخوارزمية كل عقدة على الاختيار من بين عينة عشوائية محدودة تضم $m \approx \sqrt{p}$ من المتغيرات فقط. يجبر هذا القيد الأشجار على استكشاف مؤشرات بديلة وأبعاد خفية، مما يكسر الارتباط بين الأشجار ويجعلها مستقلة حقاً.

تستند هذه الحصانة الرياضية إلى قانون الاحتمالات الكلاسيكي: فحينما تحسب متوسط $B$ من المتغيرات المستقلة تماماً، يتلاشى تباينها الجمعي بمعدل $1/B$. ولكن إذا كانت النماذج مرتبطة فيما بينها بمعامل ارتباط موجب $\rho$، فإن التباين يتوقف عند حاجز أصم لا يمكن تجاوزه: $\rho \sigma^2$. ومن خلال تقليص هذا الارتباط $\rho$ نحو الصفر بفضل الاختيار العشوائي للمتغيرات، تسحق الغابات العشوائية هذا الحاجز، محولة مجموعة من الأشجار الضعيفة إلى منظومة تنبؤية خارقة وشديدة الاستقرار.

:::simulation-widget{engine="canvas2d" component="DecisionTreeLaser"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let an ensemble comprise $B$ randomized decision trees $\{T_1(\mathbf{x}), T_2(\mathbf{x}), \dots, T_B(\mathbf{x})\}$, each grown on an independently drawn bootstrap sample $\mathcal{B}_b$ using random feature subspace selection of size $m \le P$.

The aggregated ensemble prediction for regression is the arithmetic mean:

$$
\bar{T}(\mathbf{x}) = \frac{1}{B} \sum_{b=1}^B T_b(\mathbf{x})
$$

### The Breiman Ensemble Variance Decomposition
Assume each individual unpruned tree has identical marginal variance $\text{Var}(T_b(\mathbf{x})) = \sigma^2$, and any pair of distinct trees shares a positive pairwise Pearson correlation:

$$
\rho = \text{Corr}\left(T_b(\mathbf{x}), T_{b'}(\mathbf{x})\right) = \frac{\text{Cov}(T_b(\mathbf{x}), T_{b'}(\mathbf{x}))}{\sigma^2}, \quad \text{for } b \ne b'
$$

Expanding the variance of the ensemble mean estimator:

$$
\begin{aligned}
\text{Var}(\bar{T}(\mathbf{x})) &= \text{Var}\left( \frac{1}{B} \sum_{b=1}^B T_b(\mathbf{x}) \right) \\
&= \frac{1}{B^2} \left[ \sum_{b=1}^B \text{Var}(T_b(\mathbf{x})) + \sum_{b=1}^B \sum_{b' \ne b}^B \text{Cov}(T_b(\mathbf{x}), T_{b'}(\mathbf{x})) \right] \\
&= \frac{1}{B^2} \left[ B \sigma^2 + B(B - 1)\rho \sigma^2 \right] \\
&= \rho \sigma^2 + \frac{1 - \rho}{B} \sigma^2
\end{aligned}
$$

### The Asymptotic Variance Floor:
- As the number of ensemble trees grows without bound ($B \to \infty$):
  $$
  \lim_{B \to \infty} \text{Var}(\bar{T}(\mathbf{x})) = \rho \sigma^2
  $$
- Standard Bagging ($m = P$) reduces variance purely by increasing $B$, but leaves $\rho$ stubbornly high because all trees share identical dominant root features.
- Random Forests intentionally weaken individual trees (slightly increasing $\sigma^2$) to aggressively drive $\rho \to 0$, fundamentally lowering the irreducible asymptotic error floor $\rho \sigma^2$.

### Out-of-Bag (OOB) Generalization Theory
Consider drawing a bootstrap sample of size $N$ with replacement from $N$ historical observations. The probability that observation $i$ is never selected in $N$ independent draws is:

$$
\mathbb{P}(i \notin \mathcal{B}_b) = \left( 1 - \frac{1}{N} \right)^N
$$

Taking the calculus limit as dataset size $N \to \infty$:

$$
\lim_{N \to \infty} \left( 1 - \frac{1}{N} \right)^N = e^{-1} \approx 0.367879 \approx 36.8\%
$$

Approximately $36.8\%$ of the dataset is withheld from each tree as an **Out-of-Bag (OOB)** holdout. For each observation $i \in \{1, \dots, N\}$, the OOB ensemble prediction aggregates exclusively over the subset of trees that never saw sample $i$ during training:

$$
\hat{y}_i^{\text{OOB}} = \arg\max_{c \in \{1, \dots, K\}} \sum_{b: i \notin \mathcal{B}_b} \mathbb{I}(T_b(\mathbf{x}_i) = c)
$$

The empirical Out-of-Bag error rate provides an unbiased estimate of true test error that matches $K$-fold cross-validation with zero additional computational expense.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $B \in \mathbb{N}$: Number of trees grown in the random forest ensemble.
* $T_b(\mathbf{x})$: Prediction of the $b$-th randomized decision tree for query $\mathbf{x}$.
* $\bar{T}(\mathbf{x})$: Uniformly weighted ensemble average prediction.
* $\sigma^2$: Sampling variance of an individual unpruned decision tree.
* $\rho \in [0, 1]$: Pairwise correlation between individual tree predictions.
* $m$: Number of features randomly sampled at each split node (default $m = \lfloor \sqrt{P} \rfloor$ for classification, $m = \lfloor P/3 \rfloor$ for regression).
* $P$: Total number of explanatory features in the dataset.
* $\mathcal{B}_b$: Bootstrap resample of size $N$ drawn with replacement for tree $b$.
* $e^{-1} \approx 36.8\%$: Asymptotic fraction of observations excluded from each bootstrap sample.
* $\hat{y}_i^{\text{OOB}}$: Out-of-bag ensemble prediction evaluated exclusively on pristine holdout trees.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement Breiman's theoretical ensemble variance decomposition formula in Python. You will:
1. Parse the tree ensemble hyperparameters ($B$, $\sigma^2$, and $\rho$).
2. Evaluate the independent variance attenuation term: $\frac{1 - \rho}{B}\sigma^2$.
3. Evaluate the asymptotic correlation floor term: $\rho \sigma^2$.
4. Sum both components to return the exact theoretical ensemble prediction variance.

:::python-challenge{id="py-random-forests-bagging"}
---
timeout_ms: 3000
test_cases:
  - input: "v = simulate_bagging_variance(n_estimators=100, base_variance=1.0, correlation=0.2); f\"{v:.3f}\""
    expected: "0.208"
  - input: "v = simulate_bagging_variance(n_estimators=1000, base_variance=1.0, correlation=0.0); f\"{v:.3f}\""
    expected: "0.001"
---
```python
import numpy as np

def simulate_bagging_variance(
    n_estimators: int,
    base_variance: float,
    correlation: float
) -> float:
    """
    Computes theoretical ensemble prediction variance according to Breiman's formula:
    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2
    
    Parameters
    ----------
    n_estimators : int
        Number of trees in ensemble (B).
    base_variance : float
        Variance of an individual unpruned tree (sigma^2).
    correlation : float
        Pairwise correlation between tree predictions (rho in [0, 1]).
        
    Returns
    -------
    float
        Ensemble prediction variance.
    """
    # Step 1: Cast inputs to float primitives
    B = float(n_estimators)
    rho = float(correlation)
    sig2 = float(base_variance)
    
    # Step 2: Compute Breiman's variance decomposition terms
    correlation_floor = rho * sig2
    decaying_variance = ((1.0 - rho) / B) * sig2
    
    # Step 3: Combine both terms
    ens_variance = correlation_floor + decaying_variance
    return float(ens_variance)
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A machine learning engineer presents a Random Forest model trained with 100 trees to an executive architecture review board. A senior systems architect raises a red flag: *"If you increase the number of estimators from 100 to 1,000 trees, you are multiplying the model's structural parameters by 10x. This explosive parameter growth will inevitably overfit the training data and cause the system to fail in production."*

**Diagnostic Question:** How should the machine learning engineer respond based on the mathematical principles of Random Forests?

* [x] The architect's concern is mathematically unfounded: Random Forests cannot overfit merely by increasing the number of trees $B$. By the Strong Law of Large Numbers, as $B \to \infty$, the ensemble predictions converge almost surely to an asymptotic limit ($\rho \sigma^2$). Adding trees strictly reduces variance without inflating model capacity or bias; the only penalty is linear computational cost and memory footprint.
  *مخاوف مهندس النظم غير مبررة رياضياً؛ فالغابات العشوائية يستحيل أن تقع في فرط التخصيص بمجرد زيادة عدد الأشجار $B$. فوفقاً للقانون القوي للأعداد الكبيرة، مع اقتراب $B \to \infty$ تتقارب تنبؤات الغابة حتمياً نحو حد ثابت ($\rho \sigma^2$). تؤدي إضافة الأشجار إلى تقليص التباين حصراً دون زيادة انحياز النموذج أو تعقيده؛ والضريبة الوحيدة هي زيادة الوقت الحسابي واستهلاك الذاكرة.*
  > **Why this is correct:** Breiman proved that Random Forests do not overfit as more trees are added. The generalization error converges to a fixed limiting value bounded by the correlation between trees and the strength of individual trees.
  > **لماذا هذا الخيار صحيح:** أثبت بريمان رياضياً أن الغابات العشوائية لا تفرط في التخصيص مع زيادة عدد الأشجار؛ بل يتقارب خطأ التعميم نحو قيمة ثابتة محكومة بدرجة الارتباط وقوة الأشجار، مما يجعل زيادة الأشجار مفيدة دوماً للاستقرار.
* [ ] The architect's concern is fully justified because each additional tree introduces new splitting parameters, which inflates the Akaike Information Criterion (AIC) beyond repair.
  *مخاوف المهندس صحيحة تماماً لأن كل شجرة تضيف معاملات تقسيم جديدة ترفع معيار أكايكي للمعلومات (AIC) إلى مستويات كارثية.*
  > **Why this is incorrect:** AIC applies to parametric likelihood models; ensemble averaging does not increase structural model capacity in the manner of single parametric functions.
  > **لماذا هذا الخيار خاطئ:** ينطبق معيار AIC على النماذج المعلمية ذات دالة الأرجحية، بينما التجميع بالمتوسط يقلص التباين ولا يضاعف التعقيد الهيكلي للنموذج.
* [ ] Increasing tree count causes the finite bootstrap sample to exhaust all available random permutations, causing the training loop to crash from duplicate index collision.
  *تؤدي زيادة عدد الأشجار إلى نفاد التباديل العشوائية المتاحة في عينة السحب، مما يؤدي إلى انهيار حلقة التدريب بسبب تصادم المؤشرات.*
  > **Why this is incorrect:** A dataset of size $N$ allows $N^N$ unique bootstrap samples; for $N \ge 100$, this number exceeds the number of atoms in the observable universe.
  > **لماذا هذا الخيار خاطئ:** يتيح سحب العينات بالترجيع عدداً فلكياً من الاحتمالات $N^N$ يتجاوز عدد ذرات الكون المنظور، ويستحيل نفاده برمجياً.
* [ ] Overfitting in Random Forests is strictly determined by whether the random seed is chosen as an even or odd integer.
  *يتحدد فرط التخصيص في الغابات العشوائية حصرياً بما إذا كانت بذرة العشوائية (Random Seed) عدداً زوجياً أو فردياً.*
  > **Why this is incorrect:** The random seed merely initializes the pseudo-random generator; it has no mathematical relationship with generalization or model capacity.
  > **لماذا هذا الخيار خاطئ:** البذرة العشوائية مجرد قيمة أولية لمولد الأرقام الزائفة وليس لها أي تأثير رياضي على سعة النموذج الإحصائية.
