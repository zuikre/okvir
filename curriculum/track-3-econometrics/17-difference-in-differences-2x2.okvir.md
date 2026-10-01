---
id: "difference-in-differences-2x2"
version: "1.0.0"
title: "Canonical 2x2 Difference-in-Differences & Parallel Trends"
track: "econometrics"
module: "mod-26"
estimated_minutes: 15
prerequisites: ["causal-inference-confounding", "panel-data-fixed-effects"]
i18n:
  ar: "الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي"
---

# Canonical 2x2 Difference-in-Differences & Parallel Trends

Difference-in-Differences (DiD) is the workhorse quasi-experimental design of modern empirical economics. Card and Krueger (1994) famously demonstrated the method by studying New Jersey's minimum wage increase compared to neighboring Pennsylvania fast-food restaurants. Evaluating policy interventions purely before-and-after confounds the policy with macroeconomic trends (inflation, seasonal growth, recession). Conversely, simply comparing treated states to control states at a single point in time confounds the policy with persistent baseline differences (tax structures, demographics).

DiD solves this by comparing trajectories rather than static snapshots. Think of evaluating whether a special fertilizer helped a growing tree: if you only measure the tree before and after fertilizing, you mistake natural rainfall and sunshine for the fertilizer's effect. If you compare it to a wild untreated tree in another forest, you confound soil quality. But if you observe both trees over time and subtract the wild tree's natural growth from the fertilized tree's growth, common weather shocks cancel out, isolating the pure causal effect of the fertilizer.

:::simulation-widget{engine="canvas2d" component="DiDParallelTrendsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

يُعد أسلوب "الفرق في الفروق" (Difference-in-Differences - DiD) الأداة شبه التجريبية الأكثر استخداماً في الاقتصاد القياسي التطبيقي. اشتهرت الطريقة في دراسة كارد وكروغر (Card & Krueger, 1994) للأثر التوظيفي لرفع الحد الأدنى للأجور في نيوجيرسي مقارنة بمطاعم بنسلفانيا المجاورة. إن تقييم أي سياسة عبر مقارنة المستفيدين قبل تطبيقها وبعده فقط يخلط بين أثر السياسة والمسار الزمني العام (التضخم، المواسم، التقلبات الاقتصادية). وفي المقابل، فإن مقارنة المجموعة المعالجة بمجموعة ضابطة في لحظة زمنية واحدة يخلط بين أثر السياسة والفروق الهيكلية الأصلية بين المجموعتين.

يعالج DiD هذه المعضلة بمقارنة "المسارات" بدلاً من اللقطات الثابتة. تخيل أنك تقيس أثر سماد زراعي على شجرة: إذا قست طول الشجرة قبل وبعد التسميد فقط، ستخلط بين نمو الشجرة بفعل المطر ونموها بفعل السماد. وإذا قارنتها بشجرة برية أخرى، ستخلط بين خصوبة التربة في الموقعين. لكن بمراقبة الشجرتين معاً وطرح مقدار النمو الطبيعي للشجرة البرية من نمو الشجرة المعالجة، تلغي العوامل المناخية المشتركة، لتعزل الأثر السببي الصافي للسماد.

### Mathematical Foundations

The canonical $2 \times 2$ setup observes two groups $g \in \{0, 1\}$ (Control, Treated) across two time periods $t \in \{0, 1\}$ (Pre, Post). Define the cell expectations:

$$
\bar{Y}_{g, t} \equiv \mathbb{E}[Y_{it} \mid G_i = g, T_t = t]
$$

The sample Difference-in-Differences estimator computes the difference between the two within-group changes:

$$
\hat{\delta}_{\text{DiD}} = (\bar{Y}_{1, 1} - \bar{Y}_{1, 0}) - (\bar{Y}_{0, 1} - \bar{Y}_{0, 0})
$$

Equivalently, this estimator is recovered via Ordinary Least Squares (OLS) from the interaction regression:

$$
Y_{it} = \beta_0 + \beta_1 \text{Treat}_i + \beta_2 \text{Post}_t + \delta (\text{Treat}_i \times \text{Post}_t) + \varepsilon_{it}
$$

where:
- $\beta_0 = \bar{Y}_{0,0}$: Baseline mean of the control group.
- $\beta_1 = \bar{Y}_{1,0} - \bar{Y}_{0,0}$: Pre-treatment baseline gap between treated and control units.
- $\beta_2 = \bar{Y}_{0,1} - \bar{Y}_{0,0}$: Common secular time trend experienced by the control group.
- $\delta = \hat{\delta}_{\text{DiD}}$: The interaction coefficient isolating the causal treatment effect.

The unobservable counterfactual for the treated group in the post-treatment period is:

$$
\mathbb{E}[Y_{i1}(0) \mid G_i = 1] = \bar{Y}_{1, 0} + (\bar{Y}_{0, 1} - \bar{Y}_{0, 0})
$$

The foundational causal identification rests on the **Parallel Trends Assumption**: in the absence of treatment, the average outcome of the treated group would have followed the exact same trajectory as the control group:

$$
\mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \mid G_i = 1] = \mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \mid G_i = 0]
$$

يرتكز التعريف السببي بالكامل على **فرضية مسار التوازي (Parallel Trends Assumption)**: لولا تطبيق المعالجة، لكان معدل تغير المجموعة المعالجة بين الفترتين مساوياً تماماً لمعدل تغير المجموعة الضابطة. وعندما تتحقق هذه الفرضية، يطرح المقدر الأثر الزمني الطبيعي كـ "مسار مقابل للواقع" (Counterfactual)، ويكون معامل التفاعل $\delta$ تقديراً غير منحاز للأثر السببي الصافي.

:::python-challenge{id="py-difference-in-differences-2x2"}
---
timeout_ms: 3000
test_cases:
  - input: "res = compute_did_2x2(np.array([10.0, 12.0, 10.0, 16.0]), np.array([0, 0, 1, 1]), np.array([0, 1, 0, 1])); f\"{res['delta_did']:.1f}, {res['counterfactual']:.1f}\""
    expected: "4.0, 12.0"
  - input: "res = compute_did_2x2(np.array([5.0, 5.0, 8.0, 15.0]), np.array([0, 0, 1, 1]), np.array([0, 1, 0, 1])); f\"{res['delta_did']:.1f}, {res['beta_interaction']:.1f}\""
    expected: "7.0, 7.0"
---
```python
import numpy as np

def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:
    """
    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.
    
    Parameters
    ----------
    y : np.ndarray
        Observed outcomes.
    treat : np.ndarray
        Binary treatment group indicator (1 = Treated, 0 = Control).
    post : np.ndarray
        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).
        
    Returns
    -------
    dict with keys:
        'delta_did': Sample 2x2 difference-in-differences estimate.
        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].
        'counterfactual': Unobserved counterfactual level for treated group in post period.
    """
    # 1. Compute 4 group-period cell means: y11, y10, y01, y00
    y11 = float(np.mean(y[(treat == 1) & (post == 1)]))
    y10 = float(np.mean(y[(treat == 1) & (post == 0)]))
    y01 = float(np.mean(y[(treat == 0) & (post == 1)]))
    y00 = float(np.mean(y[(treat == 0) & (post == 0)]))
    
    # 2. Compute DiD and counterfactual
    delta_did = (y11 - y10) - (y01 - y00)
    counterfactual = y10 + (y01 - y00)
    
    # 3. OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)
    X = np.column_stack([np.ones_like(y), treat, post, treat * post])
    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)
    
    return {
        "delta_did": delta_did,
        "beta_interaction": float(beta_reg[3]),
        "counterfactual": counterfactual,
    }
```
:::

### Practical ML Transfer Challenge

#### Scenario: E-Commerce Redesign Policy Evaluation
An online retail platform rolls out an AI-powered one-click checkout system in Germany in Q2, while holding France on the traditional multi-step checkout. 
- In Q1 (pre-treatment), conversion rates were 4.0% in France and 6.0% in Germany.
- In Q2 (post-treatment), conversion rates rose to 5.5% in France and 9.5% in Germany.

The growth VP claims: *"The new AI checkout produced a 3.5 percentage point lift in Germany because conversion jumped from 6.0% to 9.5%!"*

**Diagnostic Question:** What is the true causal Difference-in-Differences estimate, and what threat to validity must the analytics team investigate?

- **Option A (Correct):** The DiD estimate is $+2.0\%$ (since Germany grew by $3.5\%$ while France grew by $1.5\%$ secularly, so $3.5\% - 1.5\% = 2.0\%$). The key threat is a violation of parallel trends, such as an unannounced Easter marketing discount run exclusively in Germany during Q2.
- **Option B:** The DiD estimate is $+3.5\%$ because the pre-treatment baseline differences are already fixed constants that do not affect the rate of post-treatment change.
- **Option C:** The DiD estimate is $-0.5\%$ because France was already converting at a lower rate, introducing mean-reversion bias.
- **Option D:** The DiD estimate cannot be computed without individual customer clickstream logs, because aggregate group means violate the Gauss-Markov theorem.
