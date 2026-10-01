---
id: "fuzzy-rdd-mccrary-sorting"
version: "1.0.0"
title: "Fuzzy RDD & McCrary Density Sorting Diagnostic"
track: "econometrics"
module: "mod-27"
estimated_minutes: 15
prerequisites: ["regression-discontinuity-sharp", "instrumental-variables-2sls"]
i18n:
  ar: "تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة"
---

# Fuzzy RDD & McCrary Density Sorting Diagnostic

While Sharp RDD assumes deterministic compliance, real-world institutions frequently exhibit partial compliance: crossing an administrative threshold creates an entitlement or incentive, but agents retain autonomy. Scoring above a cutoff increases the probability of receiving treatment without guaranteeing it, and individuals below the cutoff may occasionally secure treatment through appeals or exceptions.

Think of receiving an invitation to an elite STEM summer academy: students scoring 90 or higher on a math test are invited ($Z_i = 1$). However, some invited students decline to attend family vacations, while a few students scoring 88 lobby their school principals for hardship waivers ($D_i = 1$). Crossing the score threshold causes a discontinuous *jump in the probability* of attendance rather than an absolute switch. Econometrically, the cutoff serves as an **Instrumental Variable (IV)**, and the Local Average Treatment Effect (LATE) is recovered by scaling the jump in outcomes by the jump in compliance.

Crucially, this identification collapses if agents manipulate their score. If teachers know the scholarship cutoff is 90 and artificially bump scores of 89 up to 90, the subjects right above the cutoff are no longer comparable to those below. The **McCrary Density Test** acts as a forensic audit: plotting a fine-grained histogram of running variable densities reveals whether an unnatural cliff or bunching spike occurs at the cutoff.

:::simulation-widget{engine="canvas2d" component="FuzzyRDDBandwidthLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في التطبيقات الميدانية، نادراً ما يكون الامتثال حتمياً بنسبة 100%؛ بل يؤدي تجاوز العتبة الإدارية إلى توليد حافز أو أهلية قانونية، مع احتفاظ الأفراد بحرية الاختيار. فالدرجة المرتفعة تزيد من احتمالية تلقي المعالجة دون أن تفرضها فرضاً مطلقاً، وقد يحصل بعض الراسبين على استثناءات خاصة.

تخيل بطاقة دعوة لمعسكر صيفي تدريبي: يحصل الطلاب الذين نالوا 90 درجة فما فوق في اختبار الرياضيات على دعوة ($Z_i = 1$). لكن بعض المدعوين يعتذرون عن الحضور بسبب السفر، بينما ينجح قلة ممن نالوا 88 في الحصول على إعفاءات خاصة بالحضور ($D_i = 1$). هنا تُحدث العتبة قفزة مفاجئة في "احتمالية" الحضور، وتتحول العتبة إلى **متغير أداة (Instrumental Variable)** يُقاس به الأثر السببي الموضعي للممتثلين (LATE).

لكن هذا النموذج ينهار بالكامل إذا تم التلاعب بالدرجات (Sorting / Manipulation). إذا كان المعلمون يعلمون أن عتبة المنحة هي 90، وقاموا بدافع التعاطف برفع درجات 89 إلى 90، فإن الطلاب الواقعين فوق العتبة مباشرة لم يعودوا متطابقين مع زملائهم تحتها. يعمل **اختبار مككراري للكثافة (McCrary Density Test)** كمدقق جنائي: حيث يرسم منحنى الكثافة الاحتمالية للمتغير؛ وإذا ظهر تكدس مريب أو قفزة فجائية عند 90، فإن هذا التكدس يفضح التلاعب ويبطل الصلاحية السببية.

### Mathematical Foundations

In Fuzzy RDD, the probability of treatment assignment jumps discontinuously at the cutoff $c$, but does not jump from 0 to 1:

$$
\lim_{x \downarrow c} \mathbb{P}(D_i = 1 \mid X_i = x) \ne \lim_{x \uparrow c} \mathbb{P}(D_i = 1 \mid X_i = x)
$$

The Fuzzy RDD estimand is the ratio of two discontinuities (the Wald ratio / Local Average Treatment Effect at the cutoff):

$$
\tau_{\text{FRD}} = \frac{\lim_{x \downarrow c} \mathbb{E}[Y_i \mid X_i = x] - \lim_{x \uparrow c} \mathbb{E}[Y_i \mid X_i = x]}{\lim_{x \downarrow c} \mathbb{E}[D_i \mid X_i = x] - \lim_{x \uparrow c} \mathbb{E}[D_i \mid X_i = x]} = \frac{\text{Jump in Outcome (Reduced Form)}}{\text{Jump in Treatment (First Stage)}}
$$

#### The McCrary Sorting Test
To verify the fundamental identifying assumption of **local random assignment**, McCrary (2008) tests for a discontinuity in the marginal density of the running variable $X_i$ at $c$. Let $f(x)$ denote the probability density function of $X$:

$$
\theta \equiv \ln \left( \lim_{x \downarrow c} f(x) \right) - \ln \left( \lim_{x \uparrow c} f(x) \right)
$$

Under the null hypothesis of no sorting or strategic manipulation:

$$
H_0: \theta = 0 \quad (\text{The density of the running variable is continuous at } c)
$$

A statistically significant log-density gap $\hat{\theta} \ne 0$ indicates active sorting, self-selection, or administrative tampering around the cutoff, invalidating the continuity assumption.

تُحسب قيمة $\tau_{\text{FRD}}$ عبر قسمة القفزة في المتغير التابع على القفزة في احتمالية تلقي المعالجة في المرحلة الأولى (نسبة فالد Wald Ratio). ويضمن اختبار مككراري سلامة النموذج عبر فحص الفارق اللوغاريثمي لكثافة المتغير المستقل $\theta$ على طرفي العتبة؛ فإذا رُفضت فرضية العدم $H_0: \theta = 0$، دل ذلك على وجود تلاعب استراتيجي يدمر التجربة شبه الطبيعية.

:::python-challenge{id="py-fuzzy-rdd-mccrary-sorting"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([9.0, 9.5, 9.8, 10.2, 10.5, 11.0]); d = np.array([0.1, 0.1, 0.2, 0.7, 0.8, 0.8]); y = np.array([10.0, 11.0, 11.5, 16.0, 17.0, 17.5]); res = compute_fuzzy_rdd(y, d, x, cutoff=10.0, bandwidth=1.0); f\"{res['tau_frd']:.2f}\""
    expected: "8.33"
  - input: "x = np.array([4.0, 4.5, 4.8, 5.2, 5.5, 6.0]); d = np.array([0.0, 0.1, 0.1, 0.6, 0.6, 0.7]); y = np.array([5.0, 5.5, 5.8, 9.8, 10.5, 11.0]); res = compute_fuzzy_rdd(y, d, x, cutoff=5.0, bandwidth=1.0); f\"{res['tau_frd']:.2f}\""
    expected: "7.74"
---
```python
import numpy as np

def compute_fuzzy_rdd(
    y: np.ndarray,
    d: np.ndarray,
    x: np.ndarray,
    cutoff: float,
    bandwidth: float
) -> dict[str, float]:
    """
    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.
    
    Parameters
    ----------
    y : np.ndarray
        Outcome values.
    d : np.ndarray
        Observed treatment indicator or uptake fraction.
    x : np.ndarray
        Running variable.
    cutoff : float
        Discontinuity cutoff c.
    bandwidth : float
        Local estimation window half-width h.
        
    Returns
    -------
    dict with keys:
        'jump_y': Numerator discontinuity in outcome.
        'jump_d': Denominator discontinuity in treatment uptake (first-stage).
        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).
    """
    # 1. Select window within bandwidth
    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)
    x_sub = x[mask]
    y_sub = y[mask]
    d_sub = d[mask]
    
    # 2. Local variables and kernel weights
    x_c = x_sub - cutoff
    z = (x_sub >= cutoff).astype(float)
    u = np.abs(x_c) / bandwidth
    w = 1.0 - u
    W = np.diag(w)
    
    X_mat = np.column_stack([np.ones_like(x_c), z, x_c, z * x_c])
    XtWX = X_mat.T @ W @ X_mat
    
    # 3. Reduced-form outcome jump
    beta_y = np.linalg.solve(XtWX, X_mat.T @ W @ y_sub)
    jump_y = float(beta_y[1])
    
    # 4. First-stage treatment uptake jump
    beta_d = np.linalg.solve(XtWX, X_mat.T @ W @ d_sub)
    jump_d = float(beta_d[1])
    
    # 5. Fuzzy RDD Wald ratio
    tau_frd = jump_y / jump_d if abs(jump_d) > 1e-8 else float('nan')
    
    return {
        "jump_y": jump_y,
        "jump_d": jump_d,
        "tau_frd": tau_frd,
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: Corporate Tax Exemption Bunching at 50 Employees
In France, companies with 50 or more employees are required by law to create a formal worker council and provide expensive supplementary benefits. An economic consultancy wants to estimate the impact of worker councils on firm productivity using a Fuzzy RDD around the 50-employee threshold ($c = 50$).

The research team plots the histogram of enterprise sizes across all registered businesses in France. The density reveals a dramatic, towering spike at exactly 49 employees, followed by an immediate, deep void at 50, 51, and 52 employees.

**Diagnostic Question:** How does this McCrary density histogram shape affect the validity of using RDD for this policy?

- **Option A (Correct):** The bunching spike at 49 demonstrates active manipulation and strategic sorting: business owners deliberately restrain hiring or use subcontractors to avoid crossing the 50-employee threshold. Because firms at 49 are systematically and strategically different from firms that cross to 50, the local continuity assumption is violated, completely invalidating the RDD design.
- **Option B:** The bunching spike increases the statistical sample size near the cutoff, improving the statistical power of the local linear regression.
- **Option C:** Because firms at 49 have higher compliance, the First Stage jump is strengthened, making the Wald estimator unbiased.
- **Option D:** The bunching is normal Poisson firm growth noise and can be resolved simply by increasing the bandwidth parameter $h$ to 100.
