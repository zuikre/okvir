---
id: "goodness-of-fit-r-squared"
version: "1.0.0"
title: "Goodness-of-Fit, R-squared, and the ANOVA Decomposition"
track: "econometrics"
module: "mod-18"
estimated_minutes: 15
prerequisites: ["ols-residual-geometry"]
i18n:
  ar: "جودة التوفيق ومعامل التحديد والتفكيك التبايني"
---

# Goodness-of-Fit, R-squared, and the ANOVA Decomposition

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Once the regression hyperplane is locked into place, researchers ask: *How much of the outcome's real-world variation have we actually explained?* The Analysis of Variance (ANOVA) decomposition provides the answer by splitting total variation into two strictly perpendicular components using the **Pythagorean theorem in $N$ dimensions**.

Think of the total variation in the outcome as the acoustic energy of an audio recording. The recording consists of a clear musical melody (the signal explained by the regressors, ESS) and unavoidable static hiss (the residual noise, SSR). Because the fitted prediction vector $\hat{\mathbf{y}}$ and the residual vector $\mathbf{e}$ are mutually orthogonal ($90^\circ$), the squared length of the total signal equals the sum of the squared lengths of the melody plus the hiss! The coefficient of determination, $R^2$, is simply the percentage of total energy accounted for by the melody. Geometrically, $R^2 = \cos^2(\theta)$, where $\theta$ is the angle between the centered outcome vector and its projection.

However, $R^2$ is one of the most dangerously misinterpreted metrics in all of empirical science. **A high $R^2$ does not imply causality, and a low $R^2$ does not mean your research is useless!** Adding random noise variables (such as astrological signs or coin flips) will mechanically drive $R^2$ upward because the projection space expands with every additional column. This is why **Adjusted $R^2$ ($\bar{R}^2$)** enforces a mathematical penalty: it only rises if a newly added variable explains more variation than what would occur purely by random chance.

بمجرد استقرار المستوى الفائق للانحدار، يتبادر للباحث السؤال الأهم: *ما هي النسبة الحقيقية التي استطاع النموذج تفسيرها من تباين الظاهرة المدروسة؟* يقدم تفكيك تحليل التباين (ANOVA) الإجابة عبر تقسيم التباين الإجمالي إلى مركبتين متعامدتين تمامًا بالاعتماد على **مبرهنة فيثاغورس في فضاء الأبعاد الـ $N$**.

تخيل التباين الإجمالي في المتغير التابع كطاقة صوتية في تسجيل إذاعي. يتكون هذا التسجيل من لحن موسيقي واضح ومفهوم (التباين الذي فسره النموذج ESS) وتشويش إلكتروني مصاحب (بواقي الخطأ SSR). ونظرًا لأن متجه القيم المقدرة $\hat{\mathbf{y}}$ ومتجه البواقي $\mathbf{e}$ متعامدان هندسيًا بزاوية قائمة ($90^\circ$)، فإن مربع طول الإشارة الكلية يساوي تمامًا مجموع مربعي طولي اللحن والتشويش! معامل التحديد $R^2$ هو ببساطة النسبة المئوية للطاقة التي فسرها اللحن، وهندسيًا يمثل $R^2 = \cos^2(\theta)$، حيث $\theta$ هي الزاوية بين المتجه الممركز للنتيجة ومسقطه.

ومع ذلك، يُعد $R^2$ من أكثر المقاييس إساءةً للفهم في البحث التطبيقي؛ **فالقيمة المرتفعة لـ $R^2$ لا تعني أبدًا وجود علاقة سببية، والقيمة المنخفضة لا تعني فشل الدراسة!** إن إضافة متغيرات عشوائية تافهة (كأبراج الحظ أو تقلبات الطقس العشوائية) ترفع $R^2$ ميكانيكيًا لأن فضاء الإسقاط يتسع مع كل عمود جديد. لهذا السبب وُضع **معامل التحديد المعدل ($\bar{R}^2$)**؛ لفرض غرامة رياضية على درجات الحرية المفقودة، فلا يرتفع إلا إذا قدم المتغير الجديد إضافة حقيقية تتجاوز الصدفة المحضة.

:::simulation-widget{engine="canvas2d" component="ColumnSpaceProjection3D"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

When a regression includes an intercept term $\boldsymbol{\iota}_N$, the residuals sum to zero ($\sum_{i=1}^N e_i = 0$), guaranteeing that the sample mean of fitted values equals the sample mean of outcomes: $\bar{y} = \bar{\hat{y}}$.

This orthogonality guarantees the exact **ANOVA Variance Decomposition**:

$$
\sum_{i=1}^N (y_i - \bar{y})^2 = \sum_{i=1}^N (\hat{y}_i - \bar{y})^2 + \sum_{i=1}^N e_i^2 \iff \text{TSS} = \text{ESS} + \text{SSR}
$$

The coefficient of determination $R^2$ is defined as the explained ratio:

$$
R^2 \equiv \frac{\text{ESS}}{\text{TSS}} = 1 - \frac{\text{SSR}}{\text{TSS}} \in [0, 1]
$$

To penalize the artificial inflation caused by adding extra regressors, the degrees-of-freedom **Adjusted $R^2$** ($\bar{R}^2$) scales by degrees of freedom:

$$
\bar{R}^2 \equiv 1 - \frac{\text{SSR} / (N - p - 1)}{\text{TSS} / (N - 1)} = 1 - (1 - R^2)\left(\frac{N - 1}{N - p - 1}\right)
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\text{TSS}$ (Total Sum of Squares): Total sample variation of the outcome $y_i$ around the grand mean $\bar{y}$, possessing $N - 1$ degrees of freedom.
* $\text{ESS}$ (Explained Sum of Squares): Variation captured by the fitted model predictions $\hat{y}_i$ around the grand mean $\bar{y}$, possessing $p$ degrees of freedom.
* $\text{SSR}$ (Sum of Squared Residuals): Unexplained variance of the residuals $e_i = y_i - \hat{y}_i$, possessing $N - p - 1$ degrees of freedom.
* $N$: Total number of observations in the sample.
* $p$: Number of explanatory regressor slopes (excluding the constant intercept).
* $R^2$: Fraction of sample variance explained by the regression plane ($0 \le R^2 \le 1$ when an intercept is included).
* $\bar{R}^2$: Adjusted coefficient of determination, which can be strictly less than $R^2$ and can even become negative if regressors add pure noise.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the full ANOVA variance decomposition and compute both $R^2$ and Adjusted $R^2$ in NumPy. Ensure your degrees of freedom correctly separate the total sample size $N$ from the slope count $p$.

:::python-challenge{id="py-goodness-of-fit-r-squared"}
---
timeout_ms: 3000
test_cases:
  - input: "compute_r2_anova(np.array([2.0, 4.0, 6.0]), np.array([2.0, 4.0, 6.0]), 1)['r2']"
    expected: "1.0"
  - input: "round(compute_r2_anova(np.array([1.0, 2.0, 3.0, 4.0, 5.0]), np.array([1.2, 1.8, 3.1, 3.9, 5.0]), 1)['r2'], 4)"
    expected: "0.993"
  - input: "compute_r2_anova(np.array([10.0, 20.0, 30.0]), np.array([10.0, 20.0, 30.0]), 1)['ssr']"
    expected: "0.0"
---
```python
import numpy as np

def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:
    """
    Computes ANOVA variance components, R^2, and adjusted R^2.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed target values.
    y_hat : np.ndarray of shape (N,)
        Model fitted values.
    p : int
        Number of explanatory slopes (regressors excluding the constant intercept).
        
    Returns
    -------
    dict with keys:
        'tss': float, Total Sum of Squares
        'ess': float, Explained Sum of Squares
        'ssr': float, Sum of Squared Residuals
        'r2': float, Coefficient of determination
        'adj_r2': float, Degrees-of-freedom adjusted R^2
    """
    N = len(y)
    y_bar = float(np.mean(y))
    
    # Step 1: Compute Total Sum of Squares (variation about the mean)
    tss = float(np.sum((y - y_bar) ** 2))
    
    # Step 2: Compute Explained Sum of Squares
    ess = float(np.sum((y_hat - y_bar) ** 2))
    
    # Step 3: Compute Residual Sum of Squares (squared length of error vector)
    ssr = float(np.sum((y - y_hat) ** 2))
    
    # Step 4: Compute unadjusted R^2
    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0
    
    # Step 5: Compute Adjusted R^2 with degrees of freedom correction
    df_tot = N - 1
    df_res = N - p - 1
    
    if df_res > 0 and tss > 0:
        adj_r2 = 1.0 - ((ssr / df_res) / (tss / df_tot))
    else:
        adj_r2 = 0.0
        
    return {
        "tss": tss,
        "ess": ess,
        "ssr": ssr,
        "r2": r2,
        "adj_r2": adj_r2,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A macroeconomist attempts to forecast national GDP growth using a dataset of $N = 50$ quarters. She includes $p = 48$ random stock tickers in her regression and observes an astounding $R^2 = 0.985$. A colleague running a simple two-variable monetary model ($p = 2$) gets $R^2 = 0.320$.

Which model is more credible for policy analysis, and what does this illustrate about $R^2$?

* [ ] The 48-ticker model is superior because $R^2 = 0.985$ proves it captures $98.5\%$ of true macroeconomic reality.
* [x] The two-variable model is far more credible; with $N=50$ and $p=48$, the high $R^2$ is an algebraic illusion of overfitting (since $K \approx N$ forces the hyperplane through nearly every data point regardless of causal reality).
* [ ] Both models are equally valid because OLS is always the Best Linear Unbiased Estimator (BLUE).
* [ ] The 48-ticker model proves that stock prices cause macroeconomic GDP growth.
