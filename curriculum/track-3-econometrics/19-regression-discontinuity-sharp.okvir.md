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

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Imagine a high-stakes mayoral election decided by a microscopic margin: Candidate A wins $50.001\%$ of the vote, while Candidate B finishes with $49.999\%$. In the grand scheme of politics, the electorate of a city that voted $50.001\%$ for Candidate A is virtually identical in demographics, economic health, ideological preferences, and voter anger to an electorate that voted $49.999\%$. A single gust of rain in one precinct could have flipped the outcome. Yet the institutional rules enforce an absolute, non-negotiable cliff: Candidate A gains $100\%$ of mayoral executive authority, while Candidate B receives $0\%$.

Nature has effectively engineered a localized **Randomized Controlled Trial** right at the threshold! Comparing cities where a party won by a landslide ($80\%$ vs $20\%$) would hopelessly confound the political party's governance with deep ideological differences. But in a razor-thin photo-finish, whether a city barely lands above or below the $50\%$ cutoff is essentially determined by idiosyncratic test-day noise. Any discontinuous, vertical leap in downstream outcomes—such as municipal bond yields or infrastructure spending—observed immediately at the threshold can be decisively attributed to the winner's party rather than baseline municipal characteristics.

This is the foundational genius of the **Sharp Regression Discontinuity Design (SRDD)**. In observational data, people rarely receive policy interventions at random: affluent families buy tutoring, ambitious entrepreneurs apply for startup accelerators, and vulnerable patients seek clinical treatments. SRDD bypasses confounding by exploiting strict administrative assignment rules: treatment status switches deterministically from $0$ to $1$ the instant an observable, continuous index—known as the **running (or forcing) variable**—crosses a rigid administrative cutoff $c$.

To estimate this causal jump cleanly, modern econometric practice relies on **Local Linear Regression** within a narrow bandwidth $h$ around the cutoff. Why local linear rather than fitting a curvy high-order global polynomial? Global polynomials suffer from Runge's phenomenon: distant observations (like an election won with $90\%$ of the vote) exert extreme mathematical leverage, flexing the curve near the boundary and creating illusory, fake discontinuities out of thin air. By fitting separate straight lines weighted by a triangular kernel on either side of the cutoff, we zoom in on the true local causal jump.

في البيانات الواقعية، نادراً ما يحصل الأفراد أو المناطق على السياسات الحكومية أو المزايا الاقتصادية بشكل عشوائي؛ فالأسر الثرية تشتري تعليماً خاصاً، والشركات الكبرى توظف أمهر المحامين للحصول على الإعفاءات الضريبية. يتجاوز **تصميم انقطاع الانحدار الحاد (Sharp RDD)** معضلة انحياز الاختيار عبر استغلال القواعد المؤسسية الصارمة: حيث يتغير وضع المعالجة بشكل حتمي وقاطع من صفر إلى واحد بمجرد أن يتجاوز متغير مستمر—يسمى **المتغير الحاكم أو الجاري (Running/Forcing Variable)**—عتبة إدارية فاصلة $c$.

تخيل انتخابات بلدية حُسمت بفارق ضئيل جداً: نال المرشح (أ) نسبة 50.001% من الأصوات، بينما نال منافسه 49.999%. من الناحية الديموغرافية والاجتماعية والاقتصادية، فإن الناخبين في هذه المدينة متطابقون تماماً مع ناخبي مدينة مجاورة خسر فيها المرشح بفارق صوتين. كان هطول زخات مطر خفيفة في أحد الأحياء كفيلاً بقلب النتيجة! لقد أقامت الطبيعة تجربة عشوائية محكمة عند العتبة تماماً؛ فالمرشح الفائز يحصل على 100% من صلاحيات المنصب التنفيذي، بينما لا ينال الخاسر شيئاً. وأي قفزة فجائية في الأداء المالي للمدينة بعد الانتخابات تُعزى بالكامل إلى الحزب الفائز، لا إلى الفروق الأولية بين المدن.

لتقدير هذه القفزة السببية بدقة، تعتمد الممارسة الإحصائية الحديثة على **الانحدار الخطي الموضعي (Local Linear Regression)** داخل نافذة ضيقة تُعرف بعرض النطاق الترددي $h$ حول العتبة. ولماذا نفضل الخطوط المستقيمة الموضعية على المعادلات الحدودية العامة ذات الدرجات العالية؟ لأن الحدوديات العامة تعاني من ظاهرة رونغ (Runge's Phenomenon): فالنقاط البعيدة جداً عن العتبة تفرض عزماً رافعاً شديداً على طرفي المنحنى، مما يؤدي إلى تذبذبات كاذبة تخلق قفزات وهمية غير حقيقية عند العتبة. وباستخدام انحدار خطي موضعي مرجح بنواة مثلثة تركز على النقاط القريبة من العتبة، نعزل الأثر السببي الحقيقي بثبات وأمان.

:::simulation-widget{engine="canvas2d" component="SharpRDDCutoffLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In a Sharp Regression Discontinuity Design, treatment assignment $D_i \in \{0, 1\}$ is a deterministic, discontinuous step function of the observed continuous running variable $X_i$ relative to an institutional cutoff $c$:

$$
D_i = \mathbb{I}(X_i \ge c) = \begin{cases} 1 & \text{if } X_i \ge c \\ 0 & \text{if } X_i < c \end{cases}
$$

Under the fundamental identifying assumption that the potential outcome conditional expectations $\mathbb{E}[Y_i(0) \mid X_i = x]$ and $\mathbb{E}[Y_i(1) \mid X_i = x]$ are continuous in $x$ at $x = c$, the average causal treatment effect at the cutoff is non-parametrically identified by the difference between two one-sided boundary limits:

$$
\tau_{\text{SRD}} = \lim_{x \downarrow c} \mathbb{E}[Y_i \mid X_i = x] - \lim_{x \uparrow c} \mathbb{E}[Y_i \mid X_i = x]
$$

To estimate $\tau_{\text{SRD}}$ without boundary bias, we estimate a **Local Linear Regression** within an optimal bandwidth $h > 0$ around the centered running variable $\tilde{X}_i \equiv X_i - c$, solving the kernel-weighted least squares optimization problem:

$$
\min_{\alpha, \tau, \beta_0, \beta_1} \sum_{i: |X_i - c| \le h} \left[ Y_i - \alpha - \tau D_i - \beta_0 (X_i - c) - \beta_1 D_i(X_i - c) \right]^2 K\left(\frac{X_i - c}{h}\right)
$$

where:
- $\alpha$: Intercept of the control outcome regression line approaching the cutoff from the left ($\lim_{x \uparrow c} \mathbb{E}[Y(0) \mid X = x]$).
- $\tau$: The sharp causal vertical jump at the cutoff ($\tau_{\text{SRD}}$).
- $\alpha + \tau$: Outcome level approaching the cutoff from the treated right ($\lim_{x \downarrow c} \mathbb{E}[Y(1) \mid X = x]$).
- $\beta_0$: Local slope of the regression function to the left of the cutoff.
- $\beta_0 + \beta_1$: Local slope of the regression function to the right of the cutoff.
- $K(u) = (1 - |u|) \cdot \mathbb{I}(|u| \le 1)$: The standard triangular kernel weighting function, which places maximal weight on observations closest to the cutoff and tapers linearly to zero at the bandwidth frontier $|X_i - c| = h$.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $X_i$: Observable continuous running (or forcing) variable used to determine institutional eligibility.
* $c$: The strict administrative threshold or eligibility cutoff point.
* $D_i \in \{0, 1\}$: Deterministic binary treatment assignment indicator ($D_i = 1$ if $X_i \ge c$, $0$ otherwise).
* $Y_i$: Observed continuous or binary outcome of interest.
* $Y_i(1), Y_i(0)$: Potential outcomes for unit $i$ under treatment and control states.
* $\tau_{\text{SRD}}$: Sharp regression discontinuity causal estimand evaluated locally at $X = c$.
* $h$: Bandwidth parameter governing the trade-off between bias (narrow $h$, closer to the cutoff) and variance (wide $h$, more sample observations).
* $K(u)$: Kernel weighting function ensuring boundary stability and non-parametric convergence.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a local linear regression estimator for Sharp RDD with a triangular weighting kernel in NumPy. You will:
1. Filter the sample to include only observations falling within the local bandwidth window $[c - h, c + h]$.
2. Compute the centered running variable $\tilde{X}_i = X_i - c$ and the treatment indicator $D_i = \mathbb{I}(X_i \ge c)$.
3. Construct the triangular kernel weight vector $w_i = 1 - \frac{|X_i - c|}{h}$ and assemble the diagonal weight matrix $\mathbf{W}$.
4. Construct the local design matrix $\mathbf{M} = [\mathbf{1}, \mathbf{D}, \tilde{\mathbf{X}}, \mathbf{D} \odot \tilde{\mathbf{X}}]$.
5. Solve the weighted least squares normal equations $(\mathbf{M}^T \mathbf{W} \mathbf{M}) \hat{\boldsymbol{\theta}} = \mathbf{M}^T \mathbf{W} \mathbf{y}$ to isolate the treatment discontinuity $\tau = \hat{\theta}_1$.

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
    x : np.ndarray of shape (N,)
        Continuous running variable.
    y : np.ndarray of shape (N,)
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
    # Step 1: Filter to observations within local window [cutoff - h, cutoff + h]
    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)
    x_sub = x[mask]
    y_sub = y[mask]
    
    # Step 2: Center running variable at cutoff and construct treatment indicator
    x_centered = x_sub - cutoff
    d = (x_sub >= cutoff).astype(float)
    
    # Step 3: Compute triangular kernel weights: K(u) = 1 - |u| for |u| <= 1
    u = np.abs(x_centered) / bandwidth
    weights = 1.0 - u
    W = np.diag(weights)
    
    # Step 4: Build design matrix: [1, D, (X - c), D*(X - c)]
    X_mat = np.column_stack([
        np.ones_like(x_centered),
        d,
        x_centered,
        d * x_centered
    ])
    
    # Step 5: Solve Weighted Least Squares: beta = (X^T W X)^(-1) X^T W y
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

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A public development bank grants low-interest capital loans to small businesses with credit risk scores below an administrative cutoff of $c = 600$. 

An analyst attempts to estimate the causal impact of the loan on firm revenues by fitting a global 6th-order polynomial regression across all firms nationwide (credit scores ranging from 300 to 850). The global polynomial reports a massive positive discontinuity jump of $+\$48,000$ at score 600 ($p < 0.001$). 

However, when plotting raw binned scatter plots within 10 points of the cutoff, observations at score 599 and score 601 appear nearly identical, displaying no visible gap.

What critical econometric flaw explains this discrepancy (Gelman & Imbens 2019)?

* [ ] Small business credit scores are discrete integers, which strictly invalidates the rank condition of least squares.
  *درجات الائتمان أرقام صحيحة منفصلة مما يبطل شرط الرتبة للانحدار الخطي.*
  > **Why this is incorrect:** Discrete running variables require clustered standard errors or local randomization inference, but do not produce artificial 50k jumps by themselves.
  > **لماذا هذا الخيار خاطئ:** المتغيرات المنفصلة تتطلب تعديل الأخطاء المعيارية، لكنها لا تخلق قفزات ضخمة زائفة بمفردها.
* [x] High-order global polynomials suffer from boundary instability and Runge's oscillation: distant observations (e.g. at scores 350 and 800) exert excessive leverage on the curve, artificially contorting the polynomial near the boundary and manufacturing a spurious discontinuity.
  *الحدوديات العامة ذات الرتب العالية تعاني من ظاهرة رونغ وعدم استقرار الحواف؛ فالنقاط البعيدة تفرض عزماً شديداً يشوه المنحنى قرب العتبة ويصنع قفزة وهمية.*
  > **Why this is correct:** Gelman and Imbens (2019) demonstrated that high-order global polynomials yield noisy, misleading point estimates because polynomial weights place bizarre, large negative and positive weights on boundary points. Researchers should always prioritize local linear regression.
  > **لماذا هذا الخيار صحيح:** أثبت جيلمان وإمبنز (2019) أن الحدوديات العامة تفرز أوزاناً شاذة على الحدود وتشوه المنحنى؛ والحل القياسي المعتمد هو الانحدار الخطي الموضعي بنطاق ترددي ضيق.
* [ ] The analyst forgot to log-transform credit scores before fitting the polynomial terms.
  *نسي المحلل تحويل درجات الائتمان إلى المقياس اللوغاريثمي قبل الانحدار.*
  > **Why this is incorrect:** Non-linear monotonic transformations do not cure the underlying boundary leverage and oscillation problems of global polynomials.
  > **لماذا هذا الخيار خاطئ:** التحويل اللوغاريثمي لا يعالج التذبذب الحاد للحدوديات العامة عند الحواف.
* [ ] The model had too few observations on the left of the cutoff relative to the right side.
  *احتوى النموذج على عينات قليلة جداً على يسار العتبة مقارنة باليمين.*
  > **Why this is incorrect:** Sample imbalance between left and right changes standard errors, but does not mechanically manufacture fake $48,000 discontinuities.
  > **لماذا هذا الخيار خاطئ:** عدم توازن حجم العينة يؤثر على تباين التقدير، ولكنه ليس السبب في اختلاق قفزة كاذبة.
