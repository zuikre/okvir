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

### Intuition & Real-World Story

Suppose you are a loan officer at a major regional bank tasked with predicting whether mortgage applicants will default ($y = 1$) or repay in full ($y = 0$).

If you apply Ordinary Least Squares (OLS) regression to this problem—a setup known in economics as the **Linear Probability Model (LPM)**—disaster immediately strikes. Because a straight line has no boundaries, it marches relentlessly toward infinity:
- For an applicant with low income and huge debts, OLS cheerfully calculates a default probability of **135%**.
- For an ultra-wealthy surgeon with pristine credit, OLS outputs a default probability of **-18%**!

What does a negative 18% chance of default mean in the real world? It is a logical impossibility. Probabilities must obey Kolmogorov's axioms: they must remain strictly bounded between 0.0 (impossible) and 1.0 (certain).

To cure this pathology, we replace the rigid straight ruler with an **elastic hydraulic shock absorber: the Sigmoid S-curve**. 
Imagine taking any unbounded linear score $z = \mathbf{w}^T \mathbf{x}$—whether it is $-1,000$, $+42$, or zero—and feeding it into a soft compression chamber. The Sigmoid function smoothly compresses the score:
- Large positive scores saturate gently toward $1.0$.
- Large negative scores taper smoothly toward $0.0$.
- A score of zero sits perfectly balanced at $0.5$ (a 50/50 coin flip).

Behind the scenes, we do not train logistic regression by minimizing squared residuals, because squaring probability gaps creates a warped, bumpy landscape with deceptive local traps. Instead, we use **Maximum Likelihood Estimation (MLE)** guided by **Binary Cross-Entropy Loss**. Like an auditor seeking the truth, MLE rotates the decision boundary until the observed reality becomes the least surprising outcome possible, levying an exponential penalty whenever the model is confidently wrong.

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Linear Probability Model** | Fitting a straight ruler to yes/no data: produces absurd probabilities like 140% or -25%. |
| **Sigmoid Function** | The S-curve squasher: compresses any score from $-\infty$ to $+\infty$ into a valid (0, 1) probability. |
| **Odds** | Ratio of winning to losing: probability of success divided by probability of failure ($p / (1-p)$). |
| **Log-Odds (Logit)** | The natural logarithm of odds: maps probability onto the entire infinite real number line. |
| **Binary Cross-Entropy** | The penalty referee: punishes confident wrong guesses with astronomical loss. |

```text
    THE SIGMOID PROBABILITY S-CURVE:

    Probability p
         1.0 |                                 .------ Certainty (Default = 1)
             |                              .-'
             |                            .'
         0.5 |--------------------------*----------------- Decision Boundary (z = 0)
             |                        .'
             |                     .-'
         0.0 | '------ Impossibility (Repaid = 0)
             +--------------------------|-----------------> Linear Score z = w^T x
                                       z=0
```

### الحدس والقصة الواقعية

تخيل أنك مسؤول ائتمان في بنك تجاري، ومهمتك هي التنبؤ بما إذا كان المقترض سيتعثر في سداد قرضه العقاري ($y = 1$) أم سيسدده بالكامل ($y = 0$).

إذا حاولت تطبيق انحدار المربعات الصغرى العادي (OLS) على هذه المسألة—وهو ما يُعرف في الاقتصاد بـ **نموذج الاحتمال الخطي (Linear Probability Model)**—فستقع في ورطة حسابية فورية. فالخط المستقيم صلب وممتد بلا حدود:
- لمقترض يعاني من تراكم الديون وضعف الدخل، قد يتنبأ النموذج باحتمال تعثر قدره **135%**.
- ولجراح ثري يتمتع بسجل ائتماني ممتاز، قد يخرج النموذج باحتمال تعثر يبلغ **-18%**!

ماذا يعني احتمال سالب قدره -18% في الواقع؟ إنه مستحيل منطقيًا ورياضيًا. فالاحتمالات يجب أن تظل دائمًا محصورة بدقة بين 0.0 (استحالة) و 1.0 (يقين تام).

لعلاج هذا الخلل، نستبدل المسطرة الخشبية الصلبة بـ **ممتص صدمات هيدروليكي مرن: منحنى السجمويد (Sigmoid S-curve)**.
تخيل دالة السجمويد كغرفة ضغط انسيابية؛ تستقبل أي ناتج ترجيح خطي $z = \mathbf{w}^T \mathbf{x}$—سواء كان $-1,000$ أو $+42$ أو صفرًا—وتقوم بضغطه بسلاسة:
- تتقارب القيم الموجبة الكبيرة برقة نحو $1.0$.
- وتستقر القيم السالبة العميقة مقتربة من $0.0$.
- أما القيمة صفر، فتستقر تمامًا في المنتصف عند $0.5$ (احتمال 50/50).

لا ندرب الانحدار اللوجستي بتربيع الأخطاء لأن ذلك يصنع تضاريس متموجة مليئة بالقيعان المضللة، بل نستخدم **تقدير الأرجحية القصوى (MLE)** عبر **خسارة الإنتروبيا المتقاطعة الثنائية (Binary Cross-Entropy)**، التي تفرض غرامة فلكية تتصاعد أضعافًا مضاعفة عندما يكون النموذج واثقًا من تنبؤ خاطئ تمامًا.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **نموذج الاحتمال الخطي** | استخدام مسطرة مستقيمة لبيانات نعم/لا: يفرز احتمالات شاذة مثل 140% أو -25%. |
| **دالة السجمويد** | المكبس المرن: تضغط أي رقم من $-\infty$ إلى $+\infty$ ليصبح احتمالاً حقيقياً بين 0 و 1. |
| **الأرجحية (Odds)** | نسبة الفوز إلى الخسارة: احتمال وقوع الحدث مقسوماً على احتمال عدم وقوعه. |
| **لوغاريتم الأرجحية (Logit)** | اللوغاريتم الطبيعي للأرجحية: يفك أسر الاحتمال المحدود نحو خط الأعداد المفتوح. |
| **الإنتروبيا المتقاطعة الثنائية** | الحكم الصارم: يفرض عقوبة تصاعدية قاسية على التخمينات الخاطئة شديدة الثقة. |

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

| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}_i \in \mathbb{R}^D$ | Feature vector | Regressors for observation $i$ (including bias) | متجه ميزات العينة $i$ بما فيها الحد الثابت |
| $\mathbf{w} \in \mathbb{R}^D$ | Parameter weights | Orientation and slope of decision boundary | أوزان معاملات النموذج والحد الفاصل |
| $z_i = \mathbf{x}_i^T \mathbf{w}$ | Linear score / logit | Unbounded raw score driving classification | الدرجة الخطية الخام غير المقيدة |
| $\sigma(z)$ | $\frac{1}{1 + e^{-z}}$ | Sigmoid function mapping real score to probability | دالة السجمويد لتحويل الدرجة إلى احتمال |
| $p_i \in (0, 1)$ | $\mathbb{P}(Y_i=1 \mid \mathbf{x}_i)$ | Modeled probability of positive class | الاحتمال المتنبأ به للفئة الإيجابية |
| $\text{logit}(p)$ | $\ln(p / (1-p))$ | Natural log of odds mapping $(0, 1) \to \mathbb{R}$ | دالة اللوجيت لتحويل الاحتمال لخط الأعداد |
| $\mathcal{L}(\mathbf{w})$ | $\prod p_i^{y_i}(1-p_i)^{1-y_i}$ | Bernoulli likelihood across $N$ instances | دالة الأرجحية المشتركة لبيانات برنولي |
| $J(\mathbf{w})$ | $-\frac{1}{N}\sum [y\ln p + (1-y)\ln(1-p)]$ | Binary Cross-Entropy loss to be minimized | دالة خسارة الإنتروبيا المتقاطعة الثنائية |
| $\nabla_{\mathbf{w}} J$ | $\frac{1}{N}\mathbf{X}^T(\mathbf{p} - \mathbf{y})$ | Gradient vector along steepest error ascent | متجه التدرج الرياضي لاتجاه تصاعد الخطأ |
| $\mathbf{S}$ | $\text{diag}(p_i(1-p_i))$ | Diagonal Bernoulli variance matrix | مصفوفة التباينات البرنولية القطرية |
| $\mathbf{H}$ | $\frac{1}{N}\mathbf{X}^T\mathbf{S}\mathbf{X}$ | Hessian matrix ensuring global convexity | مصفوفة الهيسيان الضامنة للتحدب الرياضي |

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
