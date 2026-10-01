---
id: "synthetic-control-method"
version: "1.0.0"
title: "The Synthetic Control Method (Abadie et al.)"
track: "econometrics"
module: "mod-28"
estimated_minutes: 15
prerequisites: ["panel-data-fixed-effects", "least-squares-approximation"]
i18n:
  ar: "طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية"
---

# The Synthetic Control Method (Abadie et al.)

When major policies, geopolitical crises, or economic reforms occur, they typically affect an entire aggregate unit—a single country, state, or metropolitan area ($N=1$). In 1988, California passed Proposition 99, a groundbreaking tobacco control initiative funded by an unprecedented 25-cent cigarette excise tax. How can an empirical economist evaluate its causal impact on cigarette sales?

You cannot compare California to Texas alone (vastly different social attitudes and climates), nor can you compare it to a simple unweighted average of all 49 other states (which dilutes California's unique demographic trajectory). The **Synthetic Control Method (SCM)**, pioneered by Alberto Abadie and co-authors, solves this by acting like a master perfumer blending a custom replica: it constructs a convex combination—a weighted cocktail—of unaffected "donor" states (e.g., 25% Utah, 35% Montana, 40% Colorado) whose pre-1988 consumption trajectory and economic predictors track California almost perfectly. Once treatment begins in 1988, any divergence between the actual California and its synthetic twin isolates the pure causal effect of Proposition 99.

:::simulation-widget{engine="canvas2d" component="SyntheticControlDonorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

عندما تُطبق سياسات كبرى أو تقع أحداث جيوسياسية فارقة، فإنها تؤثر غالباً على وحدة واحدة متكاملة—دولة، ولاية، أو مدينة بأكملها ($N=1$). في عام 1988، أقرت ولاية كاليفورنيا "المقترح 99"، وهو برنامج رائد لمكافحة التدخين موّلته ضريبة مبيعات بقيمة 25 سنتاً على علب السجائر. كيف يمكن لاقتصادي قياسي تقييم الأثر السببي الحقيقي لهذا القانون على استهلاك السجائر؟

لا يمكن مقارنة كاليفورنيا بولاية تكساس وحدها لاختلاف العوامل الثقافية والمناخية، ولا بالمتوسط العام لجميع الولايات الـ 49 الأخرى. تقدم **طريقة الشبيه الاصطناعي (Synthetic Control Method - SCM)** التي ابتكرها ألبرتو أباديا (Abadie et al.) الحل المثالي: حيث تعمل كصانع عطور ماهر يركب نسخة مخصصة مطابقة لكاليفورنيا. تبحث الخوارزمية عن مزيج محدب وموزون من الولايات المانحة غير المعالجة (مثل: 25% من يوتا، 35% من مونتانا، 40% من كولورادو) بحيث يتطابق هذا المزيج الاصطناعي بدقة تامة مع مسار كاليفورنيا التاريخي قبل عام 1988. وبعد تطبيق القانون، يمثل أي انفصال أو تباعد بين كاليفورنيا وتوأمها الاصطناعي الأثر السببي الصافي للقانون.

### Mathematical Foundations

Let unit $j = 1$ be the treated unit, and units $j = 2, \dots, J+1$ constitute the untreated "donor pool." Let $T_0$ denote the number of pre-intervention time periods.

Let $\mathbf{X}_1 \in \mathbb{R}^{K \times 1}$ represent the pre-treatment characteristics and lagged outcomes of the treated unit. Let $\mathbf{X}_0 \in \mathbb{R}^{K \times J}$ represent the matrix of the same predictors for the $J$ donor units.

SCM seeks an optimal weight vector $\mathbf{W}^* = [w_2, \dots, w_{J+1}]^T$ that solves the constrained quadratic optimization problem:

$$
\min_{\mathbf{W}} \|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}\|_{\mathbf{V}}^2 = (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})^T \mathbf{V} (\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W})
$$

subject to the fundamental **Simplex Constraints**:

$$
w_j \ge 0 \quad \text{for all } j \in \{2, \dots, J+1\}, \quad \text{and} \quad \sum_{j=2}^{J+1} w_j = 1
$$

where $\mathbf{V}$ is a positive semi-definite diagonal matrix reflecting the relative predictive importance of the $K$ variables.

The simplex constraints are mathematically profound:
1. **Non-negativity ($w_j \ge 0$):** Prevents extrapolation and ensures donor weights are interpretable as fractions.
2. **Sum-to-one ($\sum w_j = 1$):** Guarantees the synthetic twin lies strictly inside the convex hull of the donor pool, eliminating dangerous regression extrapolation into regions without data.

For each post-intervention period $t \in \{T_0 + 1, \dots, T\}$, the estimated causal treatment effect $\hat{\tau}_{1t}$ is:

$$
\hat{\tau}_{1t} = Y_{1t} - \hat{Y}_{1t}^{\text{synthetic}} = Y_{1t} - \sum_{j=2}^{J+1} w_j^* Y_{jt}
$$

يفرض القيد المحدب (Simplex Constraint) عدم سلبية الأوزان ومجموعها الذي يساوي واحداً تماماً، مما يمنع الانحدار الخطي التقليدي من الاستقراء الوهمي خارج حدود البيانات المتاحة (Convex Hull). وبذلك يكون التوأم الاصطناعي تركيبة حقيقية ملموسة من الوحدات المانحة.

:::python-challenge{id="py-synthetic-control-method"}
---
timeout_ms: 3000
test_cases:
  - input: "X1 = np.array([10.0, 20.0]); X0 = np.array([[10.0, 0.0], [20.0, 0.0]]); res = fit_synthetic_control_simplex(X1, X0, max_iter=200); f\"{res['w'][0]:.1f}, {res['loss']:.2f}\""
    expected: "1.0, 0.00"
  - input: "X1 = np.array([15.0, 15.0]); X0 = np.array([[10.0, 20.0], [10.0, 20.0]]); res = fit_synthetic_control_simplex(X1, X0, max_iter=200); f\"{res['w'][0]:.2f}, {res['w'][1]:.2f}\""
    expected: "0.50, 0.50"
---
```python
import numpy as np

def fit_synthetic_control_simplex(
    X1: np.ndarray,
    X0: np.ndarray,
    lr: float = 0.05,
    max_iter: int = 500
) -> dict[str, object]:
    """
    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.
    
    Parameters
    ----------
    X1 : np.ndarray of shape (K,)
        Predictor characteristics of the treated unit.
    X0 : np.ndarray of shape (K, J)
        Predictor characteristics of the J donor units.
    lr : float
        Learning rate for gradient steps.
    max_iter : int
        Maximum iterations.
        
    Returns
    -------
    dict with keys:
        'w': Optimal non-negative weight vector summing to 1.
        'loss': Final weighted Euclidean distance ||X1 - X0 w||^2.
    """
    K, J = X0.shape
    # Initialize uniform weights
    w = np.full(J, 1.0 / J)
    
    def project_simplex(v: np.ndarray) -> np.ndarray:
        """Projects a vector v onto the probability simplex: sum(w) = 1, w >= 0."""
        u = np.sort(v)[::-1]
        cssv = np.cumsum(u)
        rho = np.nonzero(u * np.arange(1, J + 1) > (cssv - 1))[0][-1]
        theta = (cssv[rho] - 1.0) / (rho + 1.0)
        return np.maximum(v - theta, 0.0)

    for _ in range(max_iter):
        # Loss: f(w) = 0.5 * ||X1 - X0 @ w||^2
        diff = X1 - X0 @ w
        grad = -X0.T @ diff
        # Gradient step + projection onto simplex
        w = project_simplex(w - lr * grad)
        
    loss = float(np.sum((X1 - X0 @ w) ** 2))
    return {
        "w": w,
        "loss": loss
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: 1990 German Reunification Impact on West Germany
In their seminal 2015 study, Abadie, Diamond, and Hainmueller evaluated the economic impact of the 1990 German Reunification on West Germany's per capita GDP using the Synthetic Control Method. 
A student proposes including East Germany and the neighboring Czech Republic in the donor pool to match West Germany's industrial profile.

**Diagnostic Question:** Why does including East Germany in the donor pool severely violate the core identifying assumptions of the Synthetic Control Method?

- **Option A (Correct):** East Germany was directly and intensely affected by the reunification treatment itself. Including directly affected units in the donor pool causes severe spillover contamination, violating the Stable Unit Treatment Value Assumption (SUTVA) for donors and biasing the counterfactual.
- **Option B:** East Germany has a smaller land area than West Germany, violating the linear scaling axiom of matrix decomposition.
- **Option C:** SCM requires all donor units to have strictly higher GDP than the treated unit.
- **Option D:** Including former Soviet bloc nations makes the $\mathbf{X}_0^T \mathbf{X}_0$ matrix singular by definition.
