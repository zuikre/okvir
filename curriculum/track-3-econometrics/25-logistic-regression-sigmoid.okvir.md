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

When predicting binary outcomes (loan default vs. repayment, disease presence vs. absence, customer churn vs. retention), fitting Ordinary Least Squares (the Linear Probability Model) is hazardous. A straight line is rigid: as regressors take extreme values, predicted probabilities inevitably crash below $0\%$ into negative numbers or soar above $100\%$, violating the fundamental Kolmogorov axioms of probability.

Logistic regression solves this by using the **Sigmoid S-curve as an elastic damper**. Think of the Sigmoid function as a shock absorber that intercepts any unbounded linear score $z = \mathbf{x}^T \mathbf{w} \in (-\infty, +\infty)$ and compresses it smoothly into the open probability interval $(0, 1)$. 

Instead of modeling probability as a linear function, Logistic regression models the **log-odds (logit)** as a linear function. This means that each unit increase in a feature does not add a fixed percentage to the probability; instead, it multiplies the *odds ratio* by a constant factor $e^{\beta_j}$, ensuring probabilities naturally saturate as they approach certainty (0 or 1).

:::simulation-widget{engine="canvas2d" component="LogisticSigmoidSurface"}
---
interactive: true
highlighted_metric: "loss"
---
:::

عندما نحاول التنبؤ بنتائج ثنائية (التعثر المالي مقابل السداد، تشخيص المرض مقابل السلامة، إلغاء الاشتراك مقابل البقاء)، فإن استخدام الانحدار الخطي العادي (Linear Probability Model) محفوف بالمخاطر. الخط المستقيم صلب وغير مرن: فمع القيم القصوى للمتغيرات، تخترق التنبؤات الحدود المنطقية لتهوي دون $0\%$ إلى احتمالات سالبة أو تتجاوز $100\%$، مما ينتهك بديهيات نظرية الاحتمالات.

يعالج الانحدار اللوجستي هذه المعضلة باستخدام **منحنى السجمويد (Sigmoid) كمخمد مرن للصدمات**. تخيل دالة السجمويد كممتص صدمات يستقبل أي قيمة خطية غير محدودة $z = \mathbf{x}^T \mathbf{w} \in (-\infty, +\infty)$ ويضغطها بسلاسة وانسيابية داخل مجال الاحتمالات المقيد $(0, 1)$.

وبدلاً من افتراض علاقة خطية مع الاحتمال مباشرة، يفترض النموذج علاقة خطية مع **لوغاريتم الأرجحية (Log-Odds)**. هذا يعني أن كل زيادة بوحدة واحدة في المتغير التفسيري لا تضيف نسبة مئوية ثابتة للاحتمال، بل تضاعف نسبة الأرجحية (Odds Ratio) بالمعامل $e^{\beta_j}$، مما يجعل التغير في الاحتمال يتشبع تدريجياً عند الاقتراب من اليقين التام (0 أو 1).

### Mathematical Foundations

#### The Sigmoid Activation Function
For a continuous linear score $z = \mathbf{x}_i^T \mathbf{w}$, the Sigmoid link function is defined as:

$$
\sigma(z) \equiv \frac{1}{1 + e^{-z}} = \frac{e^z}{1 + e^z}
$$

The first derivative satisfies the elegant algebraic identity:

$$
\sigma'(z) = \sigma(z) \left( 1 - \sigma(z) \right)
$$

The modeled posterior probability of the positive class $Y_i = 1$ is:

$$
p_i \equiv \mathbb{P}(Y_i = 1 \mid \mathbf{x}_i) = \sigma(\mathbf{x}_i^T \mathbf{w}) \iff \ln \left( \frac{p_i}{1 - p_i} \right) = \mathbf{x}_i^T \mathbf{w}
$$

#### Maximum Likelihood Estimation & Binary Cross-Entropy
Assuming independent Bernoulli trials, the likelihood of observing data $\{(\mathbf{x}_i, y_i)\}_{i=1}^N$ is:

$$
\mathcal{L}(\mathbf{w}) = \prod_{i=1}^N p_i^{y_i} (1 - p_i)^{1 - y_i}
$$

Minimizing the Negative Log-Likelihood (Binary Cross-Entropy Loss) yields the objective function:

$$
J(\mathbf{w}) = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \ln p_i + (1 - y_i) \ln(1 - p_i) \right]
$$

#### Gradient & Hessian
Using the chain rule, the gradient vector takes a remarkably compact form identical in structure to OLS residuals:

$$
\nabla_{\mathbf{w}} J = \frac{1}{N} \mathbf{X}^T (\mathbf{p} - \mathbf{y})
$$

The Hessian matrix is strictly positive semi-definite:

$$
\mathbf{H} = \nabla_{\mathbf{w}}^2 J = \frac{1}{N} \mathbf{X}^T \mathbf{S} \mathbf{X}, \quad \text{where } \mathbf{S} = \text{diag}\left( p_i (1 - p_i) \right)
$$

Because the Hessian is positive semi-definite everywhere, the binary cross-entropy loss is strictly convex, guaranteeing a unique global minimum reachable via Gradient Descent or Newton-Raphson (Iteratively Reweighted Least Squares).

تتميز دالة خسارة الإنتروبيا المتقاطعة (Cross-Entropy) بأنها دالة محدبة تماماً (Convex)، مما يعني عدم وجود قيعان محلية تضلل الخوارزمية. ويشبه متجه التدرج $\mathbf{X}^T(\mathbf{p} - \mathbf{y})$ بواقي الانحدار الخطي، حيث يمثل الفرق بين الاحتمال المتوقع والنتيجة الحقيقية محرك التحديث في كل خطوة.

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
        # Numerically stable sigmoid avoiding overflow
        z_clipped = np.clip(z, -30.0, 30.0)
        return 1.0 / (1.0 + np.exp(-z_clipped))

    for _ in range(n_iters):
        # 1. Forward pass: compute probabilities
        p = sigmoid(X @ w)
        
        # 2. Vectorized gradient: (1/N) * X^T (p - y)
        gradient = (1.0 / N) * (X.T @ (p - y))
        
        # 3. Parameter update step
        w -= lr * gradient
        
    return w
```
:::

### Practical ML Transfer Challenge

#### Scenario: Loan Default Odds Interpretation in Fintech
A quantitative risk analyst at a commercial bank trains a logistic regression model to predict loan default within 12 months. The fitted coefficient for the feature `Number of Overdue Inquiries in Past 6 Months` is $\hat{\beta}_j = 0.693$.

In an executive committee meeting, a junior analyst announces: *"Each additional overdue inquiry increases the customer's probability of default by exactly 69.3%."*

**Diagnostic Question:** What is the correct statistical interpretation of this estimated coefficient?

- **Option A (Correct):** The announcement is incorrect: in logistic regression, coefficients represent changes in log-odds. Because $e^{0.693} \approx 2.0$, each additional inquiry multiplies the borrower's *odds of default* by 2 (the odds double). The actual percentage point change in probability is non-linear and depends heavily on baseline risk: $\Delta p \approx p(1-p)\beta_j$.
- **Option B:** The announcement is correct: the derivative of the Sigmoid function is everywhere equal to 1, maintaining strict linear additivity.
- **Option C:** The true probability increases by $0.693^2 = 0.48$ because probability is the square root of the likelihood.
- **Option D:** The coefficient is uninterpretable because logistic regression parameters are scale-invariant scale factors.
