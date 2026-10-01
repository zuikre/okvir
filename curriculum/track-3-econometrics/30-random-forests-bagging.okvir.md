---
id: "random-forests-bagging"
version: "1.0.0"
title: "Random Forests, Bagging & Feature Subspace Sampling"
track: "econometrics"
module: "mod-32"
estimated_minutes: 15
prerequisites: ["decision-trees", "central-limit-theorem"]
i18n:
  ar: "الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات"
---

# Random Forests, Bagging & Feature Subspace Sampling

While a single decision tree provides beautiful interpretability, it suffers from notorious instability: trees have notoriously high variance. A microscopic perturbation in the training dataset can alter the root split, cascading completely different decisions down every subsequent branch.

Leo Breiman (2001) revolutionized ensemble learning with the **Random Forest**. If an individual decision tree is like consulting a single eccentric, hyper-sensitive doctor who might overreact to every minor symptom, a Random Forest is like convening **a council of 500 independent physicians who cast a majority vote on the diagnosis**.

Random Forests achieve this through two layers of stochastic randomization:
1. **Bagging (Bootstrap Aggregating):** Each tree is trained on a distinct bootstrap sample (drawn with replacement from the training set).
2. **Random Subspace Sampling:** Breiman's profound mathematical insight: if one dominant feature (e.g., tumor diameter) is overwhelmingly predictive, every single tree in the forest will greedily choose it for the root split, making all 500 trees heavily correlated! By forcing each node to choose its split from a random subset of $m \approx \sqrt{p}$ features, Random Forests break this correlation. Because the trees are decorrelated, their individual idiosyncratic errors cancel out when averaged!

:::simulation-widget{engine="canvas2d" component="DecisionTreeLaser"}
---
interactive: true
highlighted_metric: "loss"
---
:::

رغم وضوح وسهولة تفسير شجرة القرار الفردية، إلا أنها تعاني من عيب هيكلي قاتل: وهو التباين المفرط (High Variance). فأي تغير مجهري في عينة التدريب قد يقلب التفرع الجذري رأساً على عقب، مما يغير هندسة الشجرة بأكملها ويؤدي إلى تنبؤات متناقضة.

أحدث ليو بريمان (2001) ثورة في تعلم الآلة بابتكار **الغابات العشوائية (Random Forests)**. إذا كانت شجرة القرار الفردية تشبه استشارة طبيب واحد غريب الأطوار قد يبالغ في تفسير كل عَرَض جانبي طفيف، فإن الغابة العشوائية تشبه **مجلس استشاري يضم 500 طبيب مستقل يصوتون معاً على التشخيص الطبي**.

تحقق الغابات العشوائية هذه الحصانة عبر مستويين من العشوائية الرياضية:
1. **التجميع بالعينات التمهيدية (Bagging):** تُدرب كل شجرة على عينة سحب مع الإرجاع (Bootstrap Sample).
2. **التعيين العشوائي للفضاء الجزئي للمتغيرات (Random Subspace Sampling):** إنجاز بريمان العبقري؛ فإذا كان هناك متغير مهيمن واحد (مثل حجم الورم)، ستختاره كل الأشجار لجذرها وتصبح الأشجار الـ 500 متطابقة ومترابطة بشدة. ولمنع هذا، تُجبر الخوارزمية كل عقدة على المفاضلة بين عينة فرعية عشوائية فقط من المتغيرات ($m \approx \sqrt{p}$). يؤدي هذا إلى كسر الارتباط بين الأشجار، مما يجعل أخطاءها الفردية تلغي بعضها البعض عند حساب المتوسط!

### Mathematical Foundations

#### The Variance of Ensembles of Correlated Estimators
Let $B$ denote the number of trees in the ensemble, each with individual prediction variance $\sigma^2$ and positive pairwise correlation $\rho = \text{Corr}(T_b(\mathbf{x}), T_{b'}(\mathbf{x}))$.

The variance of the ensemble average $\bar{T}(\mathbf{x}) = \frac{1}{B}\sum_{b=1}^B T_b(\mathbf{x})$ is:

$$
\text{Var}(\bar{T}(\mathbf{x})) = \rho \sigma^2 + \frac{1 - \rho}{B} \sigma^2
$$

#### The Asymptotic Variance Floor:
- As the number of trees $B \to \infty$, the second term $\frac{1 - \rho}{B}\sigma^2 \to 0$.
- The ensemble variance hits an irreducible floor: $\lim_{B \to \infty} \text{Var}(\bar{T}) = \rho \sigma^2$.

Standard Bagging reduces variance solely by increasing $B$, but leaves $\rho$ high. Random Forests use random feature subsampling ($m = \sqrt{p}$) to drive the correlation parameter $\rho$ downward toward zero, slashing the asymptotic variance floor!

#### Out-of-Bag (OOB) Generalization Guarantee
For a dataset of size $N$, the probability that a specific observation is omitted from a bootstrap sample of size $N$ is:

$$
\lim_{N \to \infty} \left( 1 - \frac{1}{N} \right)^N = e^{-1} \approx 0.3679 \approx 36.8\%
$$

Each tree leaves out approximately $36.8\%$ of the dataset. For each observation $i$, we compute an **Out-of-Bag (OOB) Prediction** by aggregating only the subset of trees that never saw sample $i$ during training:

$$
\hat{y}_i^{\text{OOB}} = \arg\max_c \sum_{b: i \notin \mathcal{B}_b} \mathbb{I}(T_b(\mathbf{x}_i) = c)
$$

The OOB error provides an unbiased estimate of the true generalization test error without needing an explicit cross-validation split!

تثبت متباينة بريمان أن زيادة عدد الأشجار في الغابة العشوائية لا يمكن أن تؤدي إلى فرط التخصيص (Overfitting)؛ فمع اقتراب $B \to \infty$ يستقر الخطأ عند حد ثابت تحكمه درجة الارتباط $\rho$ وقوة الأشجار الفردية وفق قانون الأعداد الكبيرة.

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
    B = float(n_estimators)
    rho = float(correlation)
    sig2 = float(base_variance)
    
    ens_variance = rho * sig2 + ((1.0 - rho) / B) * sig2
    return float(ens_variance)
```
:::

### Practical ML Transfer Challenge

#### Scenario: The 1,000-Tree Overfitting Myth
A machine learning engineer presents a Random Forest model with 100 trees to a peer review committee. A senior software architect expresses concern: *"If you increase the number of trees from 100 to 1,000, you are multiplying model parameters by 10x. This will drastically overfit the training data and fail in production."*

**Diagnostic Question:** How should the ML engineer respond based on the mathematical principles of Random Forests?

- **Option A (Correct):** The architect's concern is mathematically unfounded. Unlike individual trees or neural networks, Random Forests cannot overfit by simply adding more trees. By the Strong Law of Large Numbers, as $B \to \infty$, the ensemble predictions converge almost surely to an asymptotic limit $\rho \sigma^2$. Adding trees strictly reduces variance without increasing model bias.
- **Option B:** The concern is valid because each tree adds more degrees of freedom, which inflates the AIC penalty.
- **Option C:** Adding trees causes the bootstrap sample to run out of distinct random permutations.
- **Option D:** Overfitting only happens if the random seed is an even integer.
