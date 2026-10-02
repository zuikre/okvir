---
id: "selection-bias-randomized-trials"
version: "1.0.0"
title: "Selection Bias Decomposition & Randomized Controlled Trials"
track: "econometrics"
module: "mod-22"
estimated_minutes: 15
prerequisites: ["rubin-causal-model-potential-outcomes"]
i18n:
  ar: "تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة"
---

# Selection Bias Decomposition & Randomized Controlled Trials

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Why was the simple act of tossing a coin or drawing lottery numbers celebrated as a Nobel-prize-winning breakthrough in economics and social science?

Because in human societies, **nobody chooses actions at random**. Sick people visit doctors; ambitious and wealthy students enroll in prestigious universities; struggling, low-margin businesses apply for government relief subsidies. Whenever individuals select themselves into treatment, observed comparisons are poisoned by **Selection Bias**.

A randomized lottery operates as a **causal scalpel**:
By assigning treatment strictly through a random coin toss ($D_i \perp\!\!\perp (Y_i(0), Y_i(1))$), the lottery severs every pre-existing link between a participant's background health, wealth, drive, or genetic makeup and their receipt of treatment. 

Before the medicine is administered, the treated cohort and the control cohort are **statistical twins** across every observable and unobservable characteristic on Earth. In mathematical expectation, their baseline untreated outcomes are perfectly equal:

$$
\mathbb{E}[Y_i(0) \mid D_i = 1] = \mathbb{E}[Y_i(0) \mid D_i = 0]
$$

The selection bias term evaporates to exactly zero! Any difference in post-treatment outcomes can now be attributed solely and unambiguously to the causal potency of the treatment itself.

This highlights the profound chasm between passive prediction and active policy intervention. Consider a mobile health app: an AI algorithm predicting user health will observe that users who log 30 workouts a month have resting heart rates 15 beats per minute lower than non-users. For a life insurance company pricing risk, this predictive score is completely valid—it identifies healthy people. But for a user deciding whether to pay for the subscription, the causal question is entirely different: *"If I, as a sedentary individual, start using this app, will my heart rate drop by 15 bpm?"* The answer is almost certainly no. A huge fraction of that 15 bpm gap reflects self-selection—the people who voluntarily exercise daily are already younger, leaner, and eat healthier diets. Prediction passively sorts individuals based on existing differences; RCTs actively intervene to measure true biological or economic transformation.

لماذا اعتُبر الفعل البسيط المتمثل في رمي قطعة نقود أو السحب بالقرعة فتحًا علميًا استحق أرفع جوائز نوبل في الاقتصاد والعلوم الاجتماعية؟

لأنه في المجتمعات البشرية، **لا يتخذ أحد قراراته بصورة عشوائية**. فالمرضى هم من يقصدون الأطباء، والطلاب الأوسع طموحًا وثراءً هم من يلتحقون بالجامعات المرموقة، والشركات الأشد تعثرًا هي من تتقدم بطلبات الدعم الحكومي. وعندما يختار الأفراد مسارهم بأنفسهم، تتلوث المقارنات المباشرة بـ **انحياز الاختيار (Selection Bias)**.

تعمل القرعة العشوائية كـ **مشرط جراحي سببي**:
بتوزيع المعالجة عبر يانصيب عشوائي بحت ($D_i \perp\!\!\perp (Y_i(0), Y_i(1))$)، تقطع القرعة أي صلة مسبقة بين صفات المشارك الذاتية (كالصحة أو الثروة أو الدافع الفطري) وقرار تلقيه العلاج.

وقبل إعطاء العلاج، تصبح المجموعة المعالجة والمجموعة الضابطة **توأمين إحصائيين متطابقين** في كافة الخصائص المرصودة وغير المرصودة. وفي التوقع الرياضي، تتطابق نتائجهما الأساسية تمامًا في غياب المعالجة:

$$
\mathbb{E}[Y_i(0) \mid D_i = 1] = \mathbb{E}[Y_i(0) \mid D_i = 0]
$$

يتلاشى انحياز الاختيار ليصبح صفرًا رياضيًا تامًا! وأي فارق يُرصد لاحقًا في النتائج يُنسب يقينًا إلى الأثر السببي الصافي للمعالجة وحدها دون أي تشويش.

وهنا يبرز الصدع العميق بين التنبؤ السلبي والتدخل السببي الفعلي: تأمل تطبيقًا للهواتف الذكية للياقة البدنية؛ يستطيع نموذج تنبؤي أن يرصد بدقة أن مستخدمي التطبيق الذين يمارسون الرياضة 30 يومًا شهريًا ينخفض معدل نبضات قلوبهم بمقدار 15 نبضة/دقيقة مقارنة بغيرهم. لشركة تأمين تسعى لتسعير البوالص، هذا التنبؤ ممتاز لتصنيف الأصحاء. لكن بالنسبة لشخص خامل يفكر في شراء التطبيق، فإن السؤال السببي مختلف تمامًا: *"إذا بدأتُ أنا في استخدام هذا التطبيق، هل سينخفض نبضي بمقدار 15 نبضة؟"* الإجابة هي لا؛ لأن جزءًا هائلاً من هذا الفارق يعود لانحياز الاختيار الذاتي؛ فالذين يمارسون الرياضة بانتظام هم في الأصل أصغر سنًا وأفضل تغذية ويمتلكون جينات رياضية مسبقة. التنبؤ يرصد الفروق القائمة، بينما التجارب العشوائية تصنع التغيير الحقيقي وتقيسه.

:::simulation-widget{engine="canvas2d" component="SelectionBiasPropensityLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

In a **Randomized Controlled Trial (RCT)**, treatment assignment $D_i$ is statistically independent of potential outcomes:

$$
D_i \perp\!\!\perp \big(Y_i(0), Y_i(1)\big)
$$

This independence immediately guarantees balance in untreated counterfactuals:

$$
\mathbb{E}[Y_i(0) \mid D_i = 1] = \mathbb{E}[Y_i(0) \mid D_i = 0] = \mathbb{E}[Y_i(0)]
$$

$$
\mathbb{E}[Y_i(1) \mid D_i = 1] = \mathbb{E}[Y_i(1) \mid D_i = 0] = \mathbb{E}[Y_i(1)]
$$

Substituting this into the selection bias decomposition eliminates the bias term:

$$
\Delta_{\text{naive}} = \mathbb{E}[Y_i \mid D_i = 1] - \mathbb{E}[Y_i \mid D_i = 0] = \mathbb{E}[Y_i(1)] - \mathbb{E}[Y_i(0)] \equiv \text{ATE} = \text{ATT}
$$

### Observational Identification: The Horvitz-Thompson IPW Proof

When working with observational data where random assignment is absent, we invoke the **Conditional Independence Assumption (CIA)**:

$$
D_i \perp\!\!\perp \big(Y_i(0), Y_i(1)\big) \mid \mathbf{X}_i
$$

along with the **Overlap / Positivity Assumption**: $0 < e(\mathbf{X}_i) < 1$, where the **Propensity Score** is:

$$
e(\mathbf{X}_i) \equiv \mathbb{P}(D_i = 1 \mid \mathbf{X}_i)
$$

We now rigorously prove that Inverse Probability Weighting (IPW) recovers $\mathbb{E}[Y_i(1)]$ using the Law of Iterated Expectations:

$$
\mathbb{E}\left[ \frac{D_i Y_i}{e(\mathbf{X}_i)} \right] = \mathbb{E}\left[ \mathbb{E}\left[ \frac{D_i Y_i(1)}{e(\mathbf{X}_i)} \;\Bigg|\; \mathbf{X}_i \right] \right] = \mathbb{E}\left[ \frac{\mathbb{E}[D_i \mid \mathbf{X}_i] \cdot \mathbb{E}[Y_i(1) \mid \mathbf{X}_i]}{e(\mathbf{X}_i)} \right]
$$

Because $\mathbb{E}[D_i \mid \mathbf{X}_i] \equiv e(\mathbf{X}_i)$, the propensity score in the numerator and denominator cancel out exactly:

$$
= \mathbb{E}\left[ \frac{e(\mathbf{X}_i) \mathbb{E}[Y_i(1) \mid \mathbf{X}_i]}{e(\mathbf{X}_i)} \right] = \mathbb{E}\big[\mathbb{E}[Y_i(1) \mid \mathbf{X}_i]\big] = \mathbb{E}[Y_i(1)]
$$

By an identical algebraic step, $\mathbb{E}\left[ \frac{(1 - D_i) Y_i}{1 - e(\mathbf{X}_i)} \right] = \mathbb{E}[Y_i(0)]$. Subtracting the two terms yields the consistent **IPW ATE Estimator**:

$$
\hat{\tau}_{\text{IPW}} = \frac{1}{N} \sum_{i=1}^N \left( \frac{D_i Y_i}{e(\mathbf{X}_i)} - \frac{(1 - D_i) Y_i}{1 - e(\mathbf{X}_i)} \right)
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\perp\!\!\perp$: Orthogonal statistical independence relation between random variables.
* $D_i \perp\!\!\perp (Y_i(0), Y_i(1))$: Random assignment invariant ensuring absence of unobserved confounding.
* $e(\mathbf{X}_i) \in (0, 1)$: Propensity score representing the conditional probability of assignment to treatment given observable covariates $\mathbf{X}_i$.
* $\hat{\tau}_{\text{IPW}}$: Horvitz-Thompson / Inverse Probability Weighting estimator which reconstructs an artificial randomized trial by weighting observational units by the inverse probability of their assigned status.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the normalized Inverse Probability Weighting (IPW) estimator for the Average Treatment Effect (ATE). Ensure numerical stability by clipping extreme propensity scores away from $0$ and $1$.

:::python-challenge{id="py-selection-bias-randomized-trials"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([10.0, 15.0, 6.0, 8.0]); d = np.array([1, 1, 0, 0]); ps = np.array([0.5, 0.5, 0.5, 0.5]); round(compute_ipw_ate(y, d, ps), 4)"
    expected: "5.5"
  - input: "y = np.array([12.0, 4.0]); d = np.array([1, 0]); ps = np.array([0.8, 0.2]); round(compute_ipw_ate(y, d, ps), 4)"
    expected: "8.0"
  - input: "y = np.array([20.0, 10.0]); d = np.array([1, 0]); ps = np.array([0.5, 0.5]); compute_ipw_ate(y, d, ps)"
    expected: "10.0"
---
```python
import numpy as np

def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:
    """
    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed outcomes.
    d : np.ndarray of shape (N,)
        Binary treatment assignment (1 = treated, 0 = control).
    ps : np.ndarray of shape (N,)
        Estimated propensity scores P(D=1|X) in (0, 1).
    normalized : bool, default True
        Whether to use Hajek self-normalized weights.
        
    Returns
    -------
    float: Estimated Average Treatment Effect (ATE)
    """
    # Step 1: Clip propensity scores to avoid division by zero or explosive weights
    ps_clipped = np.clip(ps, 0.01, 0.99)
    
    # Step 2: Construct individual Horvitz-Thompson weights
    w_treated = d / ps_clipped
    w_control = (1.0 - d) / (1.0 - ps_clipped)
    
    if normalized:
        # Hajek normalized estimator: divides by sum of weights
        sum_w_t = np.sum(w_treated)
        sum_w_c = np.sum(w_control)
        
        mean_y1 = np.sum(w_treated * y) / sum_w_t if sum_w_t > 0 else 0.0
        mean_y0 = np.sum(w_control * y) / sum_w_c if sum_w_c > 0 else 0.0
        ate = float(mean_y1 - mean_y0)
    else:
        # Standard Horvitz-Thompson sample average
        N = len(y)
        ate = float(np.sum(w_treated * y - w_control * y) / N)
        
    return ate
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A mobile fitness app company notes that users who voluntarily complete $30$ workouts a month ($D=1$) have resting heart rates $15$ beats per minute lower than users who do zero workouts ($D=0$). The marketing department drafts an ad claiming: *"Our app lowers your resting heart rate by 15 bpm!"*

If the company subsequently conducts a strict Randomized Controlled Trial (forcing random cohorts to follow the regimen), why will the estimated causal effect likely be substantially smaller than $15$ bpm?

* [ ] Because random assignment introduces measurement error into physiological heart rate monitors.
* [x] Because the observational comparison suffered from massive selection bias: users who voluntarily work out 30 times a month are already younger, more health-conscious, and more biologically fit at baseline ($\mathbb{E}[Y_i(0) \mid D_i=1] < \mathbb{E}[Y_i(0) \mid D_i=0]$).
* [ ] Because RCTs are only capable of identifying Local Average Treatment Effects (LATE), not ATE.
* [ ] Because the app's code runs faster on treated users' phones.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In the observational data, users freely self-select into exercising. Those who complete 30 workouts a month possess unobserved healthy habits, better cardiovascular genetics, and disciplined diets. Even if they had never touched the app ($D=0$), their counterfactual resting heart rate $\mathbb{E}[Y(0) \mid D=1]$ would be substantially lower than that of sedentary individuals $\mathbb{E}[Y(0) \mid D=0]$. Under the Rubin decomposition, this baseline health difference forms a huge selection bias. When the company runs an RCT, randomization balances baseline health across groups, stripping away this selection bias and revealing the true biological impact of the workouts alone, which is typically much smaller than 15 bpm.

**Why the distractors are incorrect:**
1. *Random assignment introduces measurement error...*: Randomization changes the assignment mechanism, not the precision of sensor hardware.
2. *RCTs are only capable of identifying LATE, not ATE...*: Perfect compliance in an RCT identifies the full population ATE. LATE arises only in quasi-experiments with non-compliance (Instrumental Variables).
3. *The app's code runs faster on treated phones...*: Irrelevant humorous distraction with zero econometric basis.

*الشرح باللغة العربية:*
في البيانات الرصدية، يختار المستخدمون سلوكهم بحرية؛ فالذين يمارسون الرياضة يوميًا يتمتعون بنمط حياة صحي وجينات قلبية أفضل وغذاء متوازن. وحتى لو لم يستخدموا التطبيق أبدًا ($D=0$)، فإن معدل نبضهم الأساسي سيكون أقل بكثير من غيرهم. هذا الفارق المسبق يمثل انحياز اختيار هائل يلوث المقارنة. عند إجراء تجربة عشوائية منضبطة (RCT)، يضمن التوزيع بالقرعة تماثل المجموعتين تمامًا قبل بدء التمرين، فيختفي انحياز الاختيار كليًا، وتظهر الفائدة البيولوجية الحقيقية للتمرين وحده، والتي تكون عادة أقل بكثير من 15 نبضة في الدقيقة.
