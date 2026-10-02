---
id: "logistic-regression-sigmoid"
version: "1.0.0"
title: "Logistic Regression, Sigmoid Probability & Maximum Likelihood"
track: "econometrics"
module: "mod-30"
estimated_minutes: 15
prerequisites: ["multiple-regression-matrix-calculus", "differentiation-rules-chain"]
i18n:
  ar: "الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي"
---

# Logistic Regression, Sigmoid Probability & Maximum Likelihood

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Imagine attempting to measure the curvature of a delicate crystal bowl using a rigid wooden yardstick. In classical statistics, fitting Ordinary Least Squares (OLS) to a binary classification problem—often termed the **Linear Probability Model (LPM)**—is guilty of the exact same mechanical blunder. When predicting whether a borrower will default on a mortgage, whether a patient has a malignant tumor, or whether an enterprise client will churn, the true target $y \in \{0, 1\}$ is categorical and bounded. But a straight line is relentlessly linear: as an applicant's debt-to-income ratio climbs, a linear equation will unblinkingly output a default probability of $140\%$, or assign a $-25\%$ probability of disease to an exceptionally healthy patient. These nonsensical outputs violate the fundamental Kolmogorov axioms of probability.

Logistic regression resolves this pathology by replacing the rigid wooden ruler with an **elastic hydraulic shock absorber: the Sigmoid S-curve**. Think of the Sigmoid activation as a mathematical dampening chamber. You feed it any raw, unbounded linear score $z = \mathbf{w}^T \mathbf{x}$—whether it is $-5,000$, $+42$, or zero—and the chamber smoothly compresses and squashes the output into the strictly bounded open interval $(0, 1)$. As the score shoots toward positive infinity, the curve saturates gracefully toward certainty ($1.0$); as the score plummets into deep negative territory, it flattens out toward impossibility ($0.0$), but it can never breach the physical boundaries of probability.

To understand why this dampening works so naturally, we must demystify the concept of **odds and log-odds (the logit)**. In daily conversation, if a horse has an $80\%$ chance of winning, its probability is $p = 0.8$. But bookmakers speak in *odds*: the ratio of winning to losing, which is $0.8 / 0.2 = 4 \text{ to } 1$. Odds live in the asymmetric domain $[0, \infty)$. By taking the natural logarithm of the odds—computing $\ln(p / (1 - p))$—we unlock the entire infinite real number line $(-\infty, +\infty)$. Logistic regression does not assume that your explanatory variables linearly shift probability itself; rather, it posits that each unit change in a feature linearly increments the *log-odds*, which corresponds to multiplying the *odds ratio* by a constant geometric scale factor $e^{w_j}$.

Under the hood, we do not train logistic regression by minimizing squared residuals, because squaring probability errors creates a warped, non-convex landscape plagued with deceptive local traps. Instead, we embrace **Maximum Likelihood Estimation (MLE)** guided by **Binary Cross-Entropy Loss**. Imagine you are an auditor inspecting historical data: your objective is to rotate and tilt the decision boundary until the observed historical reality becomes the least surprising outcome possible. Binary cross-entropy acts as an unforgiving referee that levies an exponential penalty when the model is confidently wrong—such as assigning a $99\%$ probability of repayment to a borrower who subsequently defaults.

تخيل أنك تحاول قياس انحناءات إناء بلوري رقيق باستخدام مسطرة خشبية صلبة ومستقيمة. في الإحصاء الكلاسيكي، يؤدي تطبيق انحدار المربعات الصغرى العادي (OLS) على مسائل التصنيف الثنائي—وهو ما يُعرف بنموذج الاحتمال الخطي (Linear Probability Model)—إلى نفس الخطأ الميكانيكي الفادح. عندما نحاول التنبؤ بما إذا كان المقترض سيتعثر في سداد قرضه، أو ما إذا كان الورم خبيثاً، أو ما إذا كان العميل سيلغي اشتراكه، فإن النتيجة المستهدفة محصورة تماماً بين الصفر والواحد $\{0, 1\}$. لكن الخط المستقيم بطبيعته صلب وممتد بلا حدود: فمع ارتفاع نسبة ديون المقترض، سيتنبأ النموذج الخطي دون أي تردد باحتمال تعثر يبلغ $140\%$، أو سيعطي احتمالاً سالباً مثل $-25\%$ لمريض يتمتع بصحة ممتازة! هذه القيم غير المنطقية تنتهك أبسط بديهيات نظرية الاحتمالات الرياضية.

يعالج الانحدار اللوجستي هذا الخلل الجوهري باستبدال المسطرة الخشبية الصلبة بـ **ممتص صدمات هيدروليكي مرن: منحنى السجمويد (Sigmoid S-curve)**. تخيل دالة السجمويد كغرفة تخميد انسيابية؛ تستقبل أي ناتج ترجيح خطي غير مقيد $z = \mathbf{w}^T \mathbf{x}$—سواء كان $-5,000$ أو $+42$ أو صفراً—وتقوم بضغطه وتعديله بسلاسة ليستقر دائماً داخل المجال الاحتمالي المفتوح $(0, 1)$. كلما اندفعت النتيجة الخطية نحو اللانهاية الموجبة، تشبع المنحنى تدريجياً مقترباً من اليقين التام ($1.0$)؛ وكلما هوت النتيجة نحو السالب السحيق، استقر المنحنى مقترباً من الاستحالة ($0.0$)، مستحيلاً عليه اختراق الحدود المنطقية للاحتمال.

ولفهم السر الكامن وراء هذا التوافق الهندسي، يجب أن نزيل الغموض عن مفهوم **الأرجحية ولوغاريتم الأرجحية (Log-Odds أو Logit)**. في الحياة اليومية، إذا كان احتمال فوز فريق ما هو $80\%$ ($p = 0.8$)، فإن أرجحية الفوز (Odds) هي نسبة النجاح إلى الفشل، أي $0.8 / 0.2 = 4$ إلى $1$. تمتد الأرجحية في المجال الموجب $[0, \infty)$. وحينما نأخذ اللوغاريتم الطبيعي لهذه الأرجحية $\ln(p / (1-p))$، فإننا نحصل على خط الأعداد الحقيقية كاملاً من $-\infty$ إلى $+\infty$. لا يفترض الانحدار اللوجستي أن المتغيرات التفسيرية تغير الاحتمال بشكل خطي ومباشر؛ بل يفترض أنها تزيد لوغاريتم الأرجحية زيادة خطية، وهو ما يكافئ ضرب نسبة الأرجحية الحقيقية في معامل هندسي مضاعف $e^{w_j}$.

لا يتم تدريب الانحدار اللوجستي بتقليل مجموع مربعات الأخطاء (MSE)، لأن تربيع أخطاء الاحتمالات يولد سطحاً متعرجاً غير محدب مليئاً بالفخاخ والقيعان المحلية المضللة. وبدلاً من ذلك، نستخدم **تقدير الأرجحية القصوى (Maximum Likelihood Estimation - MLE)** عبر تقليل **خسارة الإنتروبيا المتقاطعة الثنائية (Binary Cross-Entropy)**. تخيل أنك محقق يفحص وقائع تاريخية: هدفك هو تدوير وضبط حد الفصل (Decision Boundary) حتى يصبح الواقع التاريخي المشاهد هو النتيجة الأكثر احتمالاً والأقل مفاجأة رياضياً. وتعمل دالة الإنتروبيا المتقاطعة كحكم صارم يفرض غرامة فلكية تتصاعد أضعافاً مضاعفة عندما يكون النموذج واثقاً من تنبؤ خاطئ تماماً.

:::simulation-widget{engine="canvas2d" component="LogisticSigmoidSurface"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\mathbf{x}_i \in \mathbb{R}^D$ denote the regressor vector for observation $i \in \{1, \dots, N\}$, and let $y_i \in \{0, 1\}$ represent the observed binary outcome. The continuous linear logit score is defined by the inner product:

$$
z_i \equiv \mathbf{x}_i^T \mathbf{w} = \sum_{j=1}^D x_{ij} w_j
$$

The Sigmoid link function $\sigma: \mathbb{R} \to (0, 1)$ transforms the linear score into a posterior class probability:

$$
p_i \equiv \mathbb{P}(Y_i = 1 \mid \mathbf{x}_i; \mathbf{w}) = \sigma(z_i) = \frac{1}{1 + e^{-z_i}} = \frac{e^{z_i}}{1 + e^{z_i}}
$$

### Fundamental Algebraic Properties of the Sigmoid:
1. **Symmetry:** $1 - \sigma(z) = \sigma(-z)$.
2. **Derivative Factorization:**
   $$
   \frac{d\sigma(z)}{dz} = \frac{e^{-z}}{(1 + e^{-z})^2} = \sigma(z) \left(1 - \sigma(z)\right)
   $$
3. **Logit Transformation:** The inverse link isolates the linear predictor:
   $$
   \text{logit}(p_i) \equiv \ln \left( \frac{p_i}{1 - p_i} \right) = \mathbf{x}_i^T \mathbf{w}
   $$

### Maximum Likelihood & Cross-Entropy Optimization
Modeling each observation as an independent Bernoulli trial, the joint likelihood function across $N$ observations is:

$$
\mathcal{L}(\mathbf{w}) = \prod_{i=1}^N p_i^{y_i} (1 - p_i)^{1 - y_i} = \prod_{i=1}^N \sigma(\mathbf{x}_i^T \mathbf{w})^{y_i} \left(1 - \sigma(\mathbf{x}_i^T \mathbf{w})\right)^{1 - y_i}
$$

Taking the negative natural logarithm and dividing by $N$ converts the product into the empirical **Binary Cross-Entropy Loss** $J(\mathbf{w})$:

$$
J(\mathbf{w}) = -\frac{1}{N} \ln \mathcal{L}(\mathbf{w}) = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \ln(p_i) + (1 - y_i) \ln(1 - p_i) \right]
$$

### Vectorized Gradient & Hessian
Using the chain rule and the derivative identity $\sigma'(z) = p(1-p)$, the partial derivative with respect to weight vector $\mathbf{w}$ collapses into a clean error-weighted residual:

$$
\nabla_{\mathbf{w}} J(\mathbf{w}) = \frac{1}{N} \sum_{i=1}^N (p_i - y_i) \mathbf{x}_i = \frac{1}{N} \mathbf{X}^T (\mathbf{p} - \mathbf{y})
$$

The second-order derivative defines the $D \times D$ Hessian matrix $\mathbf{H}$:

$$
\mathbf{H}(\mathbf{w}) = \nabla_{\mathbf{w}}^2 J(\mathbf{w}) = \frac{1}{N} \mathbf{X}^T \mathbf{S} \mathbf{X}, \quad \text{where } \mathbf{S} = \text{diag}\left(p_1(1-p_1), \dots, p_N(1-p_N)\right)
$$

Because $p_i \in (0, 1)$, every diagonal element $p_i(1-p_i) > 0$. Consequently, $\mathbf{S}$ is strictly positive definite, making $\mathbf{H}$ positive semi-definite for any design matrix $\mathbf{X}$. This mathematical guarantee proves that $J(\mathbf{w})$ is strictly convex: it possesses a unique global minimum with zero risk of converging to suboptimal local traps.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{x}_i \in \mathbb{R}^D$: Feature vector for the $i$-th observation, typically including a leading $1$ for bias.
* $\mathbf{w} \in \mathbb{R}^D$: Parameter weight vector governing the orientation and scale of the decision boundary.
* $z_i = \mathbf{x}_i^T \mathbf{w}$: Unbounded linear logit score driving classification confidence.
* $\sigma(z) = \frac{1}{1 + e^{-z}}$: Sigmoid activation function mapping real numbers to calibrated probabilities.
* $p_i \in (0, 1)$: Modeled posterior probability $\mathbb{P}(Y_i = 1 \mid \mathbf{x}_i)$ of the positive class.
* $\text{logit}(p) = \ln(p / (1-p))$: Natural log of the odds ratio, mapping bounded probability back to the real line.
* $\mathcal{L}(\mathbf{w})$: Bernoulli likelihood function measuring probability of the observed dataset given weights $\mathbf{w}$.
* $J(\mathbf{w})$: Binary Cross-Entropy loss function to be minimized via numerical optimization.
* $\nabla_{\mathbf{w}} J$: Gradient vector dictating the direction of steepest ascent in empirical prediction error.
* $\mathbf{S} \in \mathbb{R}^{N \times N}$: Diagonal weighting matrix of Bernoulli variances $p_i(1 - p_i)$ driving the curvature of the loss.
* $\mathbf{H} \in \mathbb{R}^{D \times D}$: Hessian matrix ensuring global convexity and enabling Newton-Raphson optimization.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the vectorized Binary Logistic Regression optimization engine in NumPy. You will:
1. Define a numerically robust Sigmoid activation $\sigma(z) = \frac{1}{1 + e^{-\text{clip}(z)}}$ that guards against floating-point overflow.
2. Compute the predicted posterior probabilities $\mathbf{p} = \sigma(\mathbf{X}\mathbf{w})$ across all training instances.
3. Evaluate the analytical gradient vector $\nabla_{\mathbf{w}} J = \frac{1}{N}\mathbf{X}^T(\mathbf{p} - \mathbf{y})$.
4. Update parameter weights iteratively via gradient descent: $\mathbf{w} \leftarrow \mathbf{w} - \eta \nabla_{\mathbf{w}} J$.

:::python-challenge{id="py-logistic-regression-sigmoid"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[1.0, 2.0], [1.0, -2.0], [1.0, 3.0], [1.0, -3.0]]); y = np.array([1.0, 0.0, 1.0, 0.0]); w = fit_logistic_regression(X, y, lr=0.5, n_iters=100); f\"{w[1] > 0.5}\""
    expected: "True"
  - input: "X = np.array([[1.0, 1.0], [1.0, -1.0]]); y = np.array([1.0, 0.0]); w = fit_logistic_regression(X, y, lr=0.1, n_iters=50); f\"{w[0]:.2f}\""
    expected: "0.00"
---
```python
import numpy as np

def fit_logistic_regression(
    X: np.ndarray,
    y: np.ndarray,
    lr: float = 0.1,
    n_iters: int = 200
) -> np.ndarray:
    """
    Fits binary logistic regression via vectorized gradient descent.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, D)
        Feature matrix (can include constant column for bias).
    y : np.ndarray of shape (N,)
        Binary response labels in {0, 1}.
    lr : float
        Learning rate.
    n_iters : int
        Number of gradient descent iterations.
        
    Returns
    -------
    np.ndarray of shape (D,)
        Estimated parameter weights w.
    """
    N, D = X.shape
    w = np.zeros(D)
    
    def sigmoid(z: np.ndarray) -> np.ndarray:
        # Step 1: Numerically stable sigmoid avoiding overflow via clipping
        z_clipped = np.clip(z, -30.0, 30.0)
        return 1.0 / (1.0 + np.exp(-z_clipped))

    for _ in range(n_iters):
        # Step 2: Forward pass - compute model posterior probabilities
        p = sigmoid(X @ w)
        
        # Step 3: Vectorized gradient computation: (1/N) * X^T (p - y)
        gradient = (1.0 / N) * (X.T @ (p - y))
        
        # Step 4: Parameter update step along steepest descent
        w -= lr * gradient
        
    return w
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A quantitative risk analyst at a commercial bank trains a binary logistic regression model to predict consumer loan default within 12 months. The fitted coefficient for the regressor `Number of Overdue Inquiries in Past 6 Months` ($X_j$) is estimated as $\hat{\beta}_j = 0.693$.

In an executive credit committee meeting, a junior analyst announces: *"Every additional overdue credit inquiry submitted by an applicant increases their probability of default by exactly 69.3 percentage points!"*

**Diagnostic Question:** What is the correct statistical interpretation of this estimated coefficient, and why is the junior analyst's statement fundamentally flawed?

* [x] The announcement is incorrect: in logistic regression, coefficients represent changes in log-odds, not probabilities. Because $e^{0.693} \approx 2.0$, each additional inquiry multiplies the borrower's *odds of default* by approximately $2.0$ (the odds double). The actual percentage point change in probability is non-linear and depends heavily on baseline risk: $\Delta p \approx p(1-p)\beta_j$.
  *الاستنتاج خاطئ: في الانحدار اللوجستي، تمثل المعاملات التغير في لوغاريتم الأرجحية وليس في الاحتمال مباشرة. وحيث إن $e^{0.693} \approx 2.0$، فإن كل استفسار ائتماني إضافي يضاعف أرجحية التعثر مرتين ($2.0$). أما التغير في النسبة المئوية للاحتمال فهو غير خطي ويعتمد على مستوى الخطر الأولي للمقترض: $\Delta p \approx p(1-p)\beta_j$.*
  > **Why this is correct:** The logit link models $\ln(p / (1-p)) = \mathbf{x}^T \mathbf{w}$. Exponentiating both sides shows that increasing $x_j$ by $1$ multiplies the odds ratio by $e^{\beta_j} = e^{0.693} \approx 2.0$. The marginal effect on probability itself equals $\frac{\partial p}{\partial x_j} = p(1 - p)\beta_j$, which is maximal at $p = 0.5$ and approaches zero as $p \to 0$ or $p \to 1$.
  > **لماذا هذا الخيار صحيح:** يربط تابع اللوجيت بين لوغاريتم الأرجحية والمتغيرات المستقلة؛ وبرفع الطرفين للأس الطبيعي نجد أن زيادة المتغير بوحدة واحدة يضاعف نسبة الأرجحية بالمعامل $e^{\beta_j} = e^{0.693} \approx 2.0$. والأثر الحدي على الاحتمال ذاته غير خطي $\frac{\partial p}{\partial x_j} = p(1 - p)\beta_j$، حيث يبلغ أقصاه عند $p=0.5$ ويتلاشى عند الأطراف.
* [ ] The announcement is correct: the derivative of the Sigmoid link function is constant and equal to $1.0$, maintaining linear additivity between features and probability.
  *الاستنتاج صحيح: مشتقة دالة السجمويد ثابتة وتساوي 1.0 دائماً، مما يحافظ على التناسب الخطي التام بين المتغيرات والاحتمال.*
  > **Why this is incorrect:** The Sigmoid derivative $\sigma'(z) = \sigma(z)(1 - \sigma(z))$ is bell-shaped and non-linear, varying continuously between $0$ and $0.25$.
  > **لماذا هذا الخيار خاطئ:** مشتقة السجمويد ليست ثابتة، بل تأخذ شكلاً جرسياً غير خطي وتتغير قيمتها باستمرار بين $0$ و $0.25$.
* [ ] The true probability increases by $0.693^2 = 0.480$ ($48.0\%$) because probability is the quadratic integral of the Bernoulli likelihood.
  *يزداد الاحتمال الحقيقي بمقدار $0.693^2 = 0.480$ (أي 48%) لأن الاحتمال يمثل التكامل التربيعي لدالة الأرجحية البرنولية.*
  > **Why this is incorrect:** Squaring the coefficient has no mathematical basis in generalized linear models; probabilities are governed by the Sigmoid transformation, not polynomial squaring.
  > **لماذا هذا الخيار خاطئ:** لا يوجد أي أساس رياضي لتربيع المعامل في النماذج الخطية المعممة؛ فالاحتمالات تخضع لتحويل السجمويد وليس لدوال قوى تربيعية.
* [ ] The estimated coefficient is completely uninterpretable because logistic regression parameters are scale-invariant constants that carry no empirical meaning.
  *المعامل المقدر غير قابل للتفسير تماماً لأن معاملات الانحدار اللوجستي ثوابت لا تحمل أي مدلول إحصائي.*
  > **Why this is incorrect:** Logistic regression coefficients are directly interpretable as adjusted log-odds ratios, providing a cornerstone of modern biostatistics, credit scoring, and epidemiological risk modeling.
  > **لماذا هذا الخيار خاطئ:** معاملات الانحدار اللوجستي قابلة للتفسير بدقة بوصفها نسب لوغاريتم الأرجحية المعدلة، وهي الركيزة الأساسية في نماذج المخاطر الائتمانية والوبائيات.
