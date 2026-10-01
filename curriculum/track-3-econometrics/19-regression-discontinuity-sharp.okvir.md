---
id: "regression-discontinuity-sharp"
version: "1.0.0"
title: "Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression"
track: "econometrics"
module: "mod-27"
estimated_minutes: 15
prerequisites: ["frisch-waugh-lovell-theorem", "selection-bias-randomized-trials"]
i18n:
  ar: "تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي"
---

# Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression

In observational data, subjects rarely receive treatments at random; high earners buy better healthcare, motivated students study longer, and creditworthy borrowers seek larger loans. Sharp Regression Discontinuity Design (SRDD) is one of the most credible causal inference tools because it exploits institutional rules that assign treatment deterministically based on whether a continuous score (the "running" or "forcing" variable) crosses a strict administrative cutoff $c$.

Think of an elite university fellowship awarded strictly to applicants scoring 1200 or higher on an entrance exam. A student scoring 1201 is virtually indistinguishable in innate talent, grit, and socio-economic background from a student scoring 1199—the two-point difference is essentially random test-day noise (a noisy room, a broken pencil). Nature has effectively run a localized randomized controlled trial right at the cutoff. Any sudden vertical jump in downstream outcomes (e.g., lifetime earnings) at score 1200 can be cleanly attributed to the fellowship itself, rather than pre-existing student ability.

:::simulation-widget{engine="canvas2d" component="SharpRDDCutoffLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في الدراسات التطبيقية، نادراً ما تُوزع البرامج أو السياسات بشكل عشوائي؛ فالأثرياء يحصلون على رعاية صحية أفضل، والطلاب الأكثر حماساً يلتحقون بالبرامج النخبوية. يُعد تصميم انقطاع الانحدار الحاد (Sharp RDD) من أصدق أدوات الاستدلال السببي، لأنه يستغل القواعد المؤسسية الصارمة التي تفصل بين المستفيدين بناءً على تجاوز متغير محدد ومستمر (Forcing Variable) لعتبة رقمية حاسمة $c$.

تخيل منحة دراسية مرموقة تُمنح حصراً للطلاب الحاصلين على 1200 درجة فما فوق في اختبار موحد. إن طالباً حصل على 1201 يتطابق تقريباً في القدرات الفطرية والخلفية الاجتماعية مع طالب حصل على 1199؛ فالفارق بينهما (نقطتان) ليس سوى ضجيج عشوائي بحت في يوم الامتحان (إرهاق عابر أو تشتت لحظي). لقد أقامت الطبيعة تجربة عشوائية مثالية عند العتبة تماماً، وأي قفزة رأسية مفاجئة في معدلات التخرج عند الدرجة 1200 تُعزى بالكامل إلى أثر المنحة وليس إلى ذكاء الطلاب المسبق.

### Mathematical Foundations

In Sharp RDD, the binary treatment assignment $D_i \in \{0, 1\}$ is a deterministic step function of the observed continuous running variable $X_i$:

$$
D_i = \mathbb{I}(X_i \ge c)
$$

Under the identifying assumption that potential outcome conditional expectations $\mathbb{E}[Y_i(1) \mid X_i = x]$ and $\mathbb{E}[Y_i(0) \mid X_i = x]$ are continuous at the cutoff $c$, the average treatment effect at the cutoff is non-parametrically identified by the boundary limits:

$$
\tau_{\text{SRD}} = \lim_{x \downarrow c} \mathbb{E}[Y_i \mid X_i = x] - \lim_{x \uparrow c} \mathbb{E}[Y_i \mid X_i = x]
$$

Modern econometric practice (Hahn, Todd, & van der Klaauw 2001; Calonico, Cattaneo, & Titiunik 2014) estimates $\tau_{\text{SRD}}$ via **Local Linear Regression** within a narrow bandwidth $h$ around the centered running variable $\tilde{X}_i = X_i - c$, minimizing the kernel-weighted sum of squared residuals:

$$
\min_{\alpha, \tau, \beta_0, \beta_1} \sum_{i: |X_i - c| \le h} \left[ Y_i - \alpha - \tau D_i - \beta_0 (X_i - c) - \beta_1 D_i(X_i - c) \right]^2 K\left(\frac{X_i - c}{h}\right)
$$

where:
- $\alpha$: Intercept of the control regression function at the cutoff ($x \to c^-$).
- $\tau$: The sharp causal treatment jump at the cutoff.
- $\beta_0, \beta_1$: The slopes of the running variable on the left and right sides of the cutoff.
- $K(u) = (1 - |u|) \mathbb{I}(|u| \le 1)$: The triangular kernel, which puts maximum weight at the cutoff and tapers linearly to zero at $|X_i - c| = h$.

ينص شرط الصلاحية الهيكلي على استمرارية دوال التوقع الشرطي للنتائج المحتملة عند العتبة $c$. وتعتمد الممارسة الإحصائية الحديثة على الانحدار الخطي الموضعي (Local Linear Regression) داخل نطاق ترددي ضيق $h$ مع ترجيح العينات بنواة مثلثة $K(u)$ لمنع انحياز الحواف وتجنب التذبذب الكاذب للحدوديات ذات الرتب العالية.

:::python-challenge{id="py-regression-discontinuity-sharp"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([9.0, 9.5, 9.8, 10.2, 10.5, 11.0]); y = np.array([20.0, 21.0, 21.5, 32.0, 32.5, 33.0]); res = fit_sharp_rdd_local_linear(x, y, cutoff=10.0, bandwidth=1.0); f\"{res['tau']:.1f}\""
    expected: "10.0"
  - input: "x = np.array([4.0, 4.5, 4.9, 5.1, 5.5, 6.0]); y = np.array([10.0, 11.0, 11.8, 17.2, 18.0, 19.0]); res = fit_sharp_rdd_local_linear(x, y, cutoff=5.0, bandwidth=1.0); f\"{res['tau']:.1f}\""
    expected: "5.0"
---
```python
import numpy as np

def fit_sharp_rdd_local_linear(
    x: np.ndarray,
    y: np.ndarray,
    cutoff: float,
    bandwidth: float
) -> dict[str, float]:
    """
    Fits a local linear regression for Sharp RDD with a triangular kernel.
    
    Parameters
    ----------
    x : np.ndarray
        Continuous running variable.
    y : np.ndarray
        Observed outcome variable.
    cutoff : float
        Institutional threshold c.
    bandwidth : float
        Half-width of the local estimation window h.
        
    Returns
    -------
    dict with keys:
        'tau': Treatment effect jump at the cutoff.
        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).
        'alpha_right': Estimated limit from the right (treated outcome at cutoff).
    """
    # 1. Filter to observations within local window [cutoff - h, cutoff + h]
    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)
    x_sub = x[mask]
    y_sub = y[mask]
    
    # 2. Centered running variable and treatment dummy
    x_centered = x_sub - cutoff
    d = (x_sub >= cutoff).astype(float)
    
    # 3. Triangular kernel weights: K(u) = 1 - |u| for |u| <= 1
    u = np.abs(x_centered) / bandwidth
    weights = 1.0 - u
    W = np.diag(weights)
    
    # 4. Design matrix: [1, D, (X - c), D*(X - c)]
    X_mat = np.column_stack([
        np.ones_like(x_centered),
        d,
        x_centered,
        d * x_centered
    ])
    
    # 5. Weighted Least Squares: beta = (X^T W X)^(-1) X^T W y
    XtWX = X_mat.T @ W @ X_mat
    XtWy = X_mat.T @ W @ y_sub
    beta = np.linalg.solve(XtWX, XtWy)
    
    alpha_left = float(beta[0])
    tau = float(beta[1])
    alpha_right = alpha_left + tau
    
    return {
        "tau": tau,
        "alpha_left": alpha_left,
        "alpha_right": alpha_right,
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: Subsidized Microloan Program Evaluation
A development bank offers subsidized business loans to microenterprises whose credit risk score is below an administrative cutoff of $c = 600$. 
An analyst evaluates the program's effect on annual revenue by fitting a global 6th-degree polynomial regression across the entire national range of credit scores (from 300 to 850). The regression model reports a massive positive discontinuity of $+\$45,000$ at score 600 with $p < 0.001$.

However, when plotting raw scatter bin averages within 15 points of 600, the data points on either side of the threshold are nearly touching, showing no visual gap.

**Diagnostic Question:** What critical econometric flaw produces this discrepancy (Gelman & Imbens 2019)?

- **Option A (Correct):** High-order global polynomials suffer from Runge's boundary oscillation phenomenon: distant points at scores 350 and 800 exert high leverage on the curve, artificially warping the polynomial near the boundary and creating a spurious discontinuity. The analyst should replace the global polynomial with local linear regression within an optimal data-driven bandwidth.
- **Option B:** The credit score is a continuous variable, which violates the discrete rank condition of linear models.
- **Option C:** The running variable must be exponentially transformed before computing polynomial degrees.
- **Option D:** The sample size must be downsampled until the left and right sample counts are mathematically identical.
