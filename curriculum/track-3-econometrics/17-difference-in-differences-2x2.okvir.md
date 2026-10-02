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

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Imagine two airplanes—Flight A (our treated flight) and Flight B (our control flight)—cruising side by side at cruising altitude. Flight A flies at 30,000 feet, while Flight B flies at 25,000 feet. Suddenly, both planes enter a massive turbulent headwind. At that exact split second, the pilot of Flight A activates an experimental high-efficiency booster engine. After thirty minutes, Flight A is traveling at 520 knots, whereas before the booster it was traveling at 500 knots. Can we conclude that the experimental booster added $+20$ knots? 

Certainly not! Without knowing how severely the atmospheric headwind slowed down aircraft in that sector, a simple before-and-after comparison is hopelessly confounded by macroeconomic weather shocks. If Flight B (which never engaged the booster) saw its airspeed plummet by 30 knots (from 480 knots to 450 knots) solely due to the storm, Flight A would have plunged by 30 knots as well in the absence of treatment. The true causal lift provided by the booster is not $+20$ knots, but $+50$ knots: the $+20$ observed change minus the $-30$ counterfactual environmental drag.

This is the timeless core of **Difference-in-Differences (DiD)**, the premier quasi-experimental design of empirical economics. Popularized in David Card and Alan Krueger's seminal 1994 study of the New Jersey minimum wage hike, DiD circumvents two fatal analytical traps simultaneously. A naive **before-and-after study** confounds policy effects with secular macro trends (inflation, holiday shopping surges, regional recessions). Conversely, a naive **cross-sectional comparison** (comparing New Jersey to neighboring Pennsylvania on a single afternoon) confounds the policy with persistent, historical state-level differences (different tax codes, industrial bases, and local demographics).

DiD achieves causal identification by comparing **trajectories over time** rather than static levels. By subtracting the control group's temporal trajectory from the treated group's trajectory, any common aggregate shock that hits both groups equally is annihilated. The linchpin of this entire architecture is the **Parallel Trends Assumption**: in the hypothetical counterfactual universe where treatment never occurred, the average outcome of the treated group would have moved in parallel with the control group.

تخيل طائرتين تحلقان جنبًا إلى جنب على ارتفاعين مختلفين: الرحلة (أ) على ارتفاع 30,000 قدم، والرحلة (ب) على ارتفاع 25,000 قدم. وفجأة، تدخل الطائرتان في عاصفة جوية معاكسة عنيفة. في تلك اللحظة بالذات، يشغل قبطان الرحلة (أ) محركًا نفاثًا تجريبيًا لزيادة السرعة. بعد نصف ساعة، سجلت الرحلة (أ) سرعة 520 عقدة مقارنة بـ 500 عقدة قبل تشغيل المحرك. فهل يمكننا الجزم بأن المحرك الجديد أضاف 20 عقدة إلى سرعة الطائرة؟

قطعًا لا! إن المقارنة الساذجة بين حال الطائرة "قبل" و"بعد" تخلط بين أثر المحرك والرياح المعاكسة الشديدة. فلو نظرنا إلى الرحلة (ب) التي لم تشغل أي محرك إضافي، لوجدنا أن سرعتها انحدرت بمقدار 30 عقدة (من 480 إلى 450 عقدة) بفعل العاصفة وحدها. هذا يعني أنه لولا المحرك الجديد، لكانت سرعة الرحلة (أ) قد انخفضت هي الأخرى بمقدار 30 عقدة. وبالتالي، فإن الأثر السببي الحقيقي للمحرك التجريبي ليس 20 عقدة فقط، بل هو 50 عقدة كاملة: التغير الملاحظ (+20) مطروحًا منه الأثر السلبي للعاصفة (-30).

هذا هو الجوهر البصري لأسلوب **الفرق في الفروق (Difference-in-Differences - DiD)**، وهو الأداة التجريبية الأكثر انتشارًا وتأثيرًا في الاقتصاد القياسي الحديث. اشتهرت هذه المنهجية عالميًا في دراسة ديفيد كارد وآلان كروغر (1994) لتقييم أثر رفع الحد الأدنى للأجور في نيوجيرسي مقارنة بمطاعم الوجبات السريعة في ولاية بنسلفانيا المجاورة. يتفادى أسلوب DiD فخين قاتلين: المقارنة الزمنية البسيطة (قبل وبعد) التي تخلط بين السياسة والتقلبات الاقتصادية العامة، والمقارنة المقطعية البسيطة (بين ولايتين في لحظة واحدة) التي تخلط بين السياسة والفروق الهيكلية التاريخية المتجذرة بين المناطق.

يعتمد مقدر DiD على مقارنة **المسارات الديناميكية عبر الزمن** بدلاً من مقارنة المستويات الثابتة. ومن خلال طرح مسار نمو المجموعة الضابطة من مسار نمو المجموعة المعالجة، تتلاشى جميع الصدمات الخارجية المشتركة التي تؤثر في المجموعتين بالتساوي. ويرتكز هذا البناء بالكامل على **فرضية مسار التوازي (Parallel Trends Assumption)**: وهي أنه في السيناريو الافتراضي المقابل للواقع (Counterfactual)—أي لولا تطبيق السياسة—لكان مسار المجموعة المعالجة قد تطور بمعدل موازٍ تمامًا لمسار المجموعة الضابطة.

:::simulation-widget{engine="canvas2d" component="DiDParallelTrendsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

The canonical $2 \times 2$ Difference-in-Differences setting observes individuals $i$ belonging to a group $G_i \in \{0, 1\}$ ($1 =$ Treated, $0 =$ Control) across two discrete time periods $T_t \in \{0, 1\}$ ($0 =$ Pre-treatment baseline, $1 =$ Post-treatment window).

Let $Y_{it}$ denote the observed outcome. Define the four population cell expectations:

$$
\bar{Y}_{g, t} \equiv \mathbb{E}[Y_{it} \mid G_i = g, T_t = t], \quad \text{for } g \in \{0, 1\}, t \in \{0, 1\}
$$

The sample Difference-in-Differences estimator evaluates the double difference of these expectations:

$$
\hat{\delta}_{\text{DiD}} = \left(\bar{Y}_{1, 1} - \bar{Y}_{1, 0}\right) - \left(\bar{Y}_{0, 1} - \bar{Y}_{0, 0}\right)
$$

This estimator is recovered identically via Ordinary Least Squares (OLS) from the classic two-way interaction regression:

$$
Y_{it} = \beta_0 + \beta_1 G_i + \beta_2 T_t + \delta (G_i \times T_t) + \varepsilon_{it}
$$

Evaluating the conditional expectation for each of the four cells:
- **Control Group Pre-Period ($G=0, T=0$):**
  $$\mathbb{E}[Y_{it} \mid 0, 0] = \beta_0$$
- **Control Group Post-Period ($G=0, T=1$):**
  $$\mathbb{E}[Y_{it} \mid 0, 1] = \beta_0 + \beta_2$$
- **Treated Group Pre-Period ($G=1, T=0$):**
  $$\mathbb{E}[Y_{it} \mid 1, 0] = \beta_0 + \beta_1$$
- **Treated Group Post-Period ($G=1, T=1$):**
  $$\mathbb{E}[Y_{it} \mid 1, 1] = \beta_0 + \beta_1 + \beta_2 + \delta$$

Taking the difference of within-group changes over time:

$$
\Delta \bar{Y}_{\text{Treated}} = \mathbb{E}[Y \mid 1, 1] - \mathbb{E}[Y \mid 1, 0] = (\beta_0 + \beta_1 + \beta_2 + \delta) - (\beta_0 + \beta_1) = \beta_2 + \delta
$$

$$
\Delta \bar{Y}_{\text{Control}} = \mathbb{E}[Y \mid 0, 1] - \mathbb{E}[Y \mid 0, 0] = (\beta_0 + \beta_2) - \beta_0 = \beta_2
$$

Subtracting the control change from the treated change isolates the causal interaction parameter:

$$
\Delta \bar{Y}_{\text{Treated}} - \Delta \bar{Y}_{\text{Control}} = (\beta_2 + \delta) - \beta_2 = \delta
$$

Under the Rubin Potential Outcomes framework, let $Y_{it}(1)$ and $Y_{it}(0)$ represent potential outcomes with and without treatment. The unobservable post-treatment counterfactual for the treated group is formally identified by:

$$
\mathbb{E}[Y_{i1}(0) \mid G_i = 1] = \bar{Y}_{1, 0} + (\bar{Y}_{0, 1} - \bar{Y}_{0, 0})
$$

Identification of the Average Treatment Effect on the Treated ($\tau_{\text{ATT}} = \mathbb{E}[Y_{i1}(1) - Y_{i1}(0) \mid G_i = 1]$) holds if and only if the **Parallel Trends Assumption** is satisfied:

$$
\mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \mid G_i = 1] = \mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \mid G_i = 0]
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $Y_{it}$: Observed scalar outcome for observation $i$ at time period $t$.
* $G_i \in \{0, 1\}$: Binary treatment group indicator ($1$ for treated group, $0$ for untreated control group).
* $T_t \in \{0, 1\}$: Binary time indicator ($1$ for post-treatment observation, $0$ for pre-treatment baseline).
* $\bar{Y}_{g, t}$: Conditional population mean of the outcome for group $g$ in period $t$.
* $\beta_0$: Expected baseline level of the control group prior to treatment ($\bar{Y}_{0, 0}$).
* $\beta_1$: Permanent baseline divergence between treated and control groups prior to treatment ($\bar{Y}_{1, 0} - \bar{Y}_{0, 0}$).
* $\beta_2$: Common macroeconomic or secular time trend experienced by the control group ($\bar{Y}_{0, 1} - \bar{Y}_{0, 0}$).
* $\delta \equiv \tau_{\text{ATT}}$: Difference-in-Differences interaction coefficient quantifying the causal Average Treatment Effect on the Treated.
* $\mathbb{E}[Y_{i1}(0) \mid G_i = 1]$: The unobservable counterfactual path—what would have happened to the treated group in period 1 had the policy never been introduced.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the canonical $2 \times 2$ Difference-in-Differences estimation engine in NumPy. You will:
1. Compute the four group-by-period cell means ($\bar{Y}_{1,1}, \bar{Y}_{1,0}, \bar{Y}_{0,1}, \bar{Y}_{0,0}$).
2. Calculate the sample double difference $\hat{\delta}_{\text{DiD}}$ and the imputed counterfactual level.
3. Construct the design matrix $\mathbf{X} = [\mathbf{1}, \mathbf{G}, \mathbf{T}, \mathbf{G} \odot \mathbf{T}]$ and fit the OLS regression to confirm algebraic equivalence.

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
    y : np.ndarray of shape (N,)
        Observed outcomes.
    treat : np.ndarray of shape (N,)
        Binary treatment group indicator (1 = Treated, 0 = Control).
    post : np.ndarray of shape (N,)
        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).
        
    Returns
    -------
    dict with keys:
        'delta_did': Sample 2x2 difference-in-differences estimate.
        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].
        'counterfactual': Unobserved counterfactual level for treated group in post period.
    """
    # Step 1: Compute 4 group-period cell means: y11, y10, y01, y00
    y11 = float(np.mean(y[(treat == 1) & (post == 1)]))
    y10 = float(np.mean(y[(treat == 1) & (post == 0)]))
    y01 = float(np.mean(y[(treat == 0) & (post == 1)]))
    y00 = float(np.mean(y[(treat == 0) & (post == 0)]))
    
    # Step 2: Compute double difference and counterfactual trajectory
    delta_did = (y11 - y10) - (y01 - y00)
    counterfactual = y10 + (y01 - y00)
    
    # Step 3: OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)
    X = np.column_stack([np.ones_like(y), treat, post, treat * post])
    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)
    
    return {
        "delta_did": delta_did,
        "beta_interaction": float(beta_reg[3]),
        "counterfactual": counterfactual,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

An international e-commerce platform rolls out an AI-driven one-click checkout system in Germany in Q2, while retaining the legacy multi-step checkout in France.
- In Q1 (pre-treatment), conversion rates were $4.0\%$ in France and $6.0\%$ in Germany.
- In Q2 (post-treatment), conversion rates rose to $5.5\%$ in France and $9.5\%$ in Germany.

The growth VP claims: *"The new AI checkout produced a $3.5$ percentage point lift in Germany because conversion jumped from $6.0\%$ to $9.5\%$!"*

What is the true causal Difference-in-Differences estimate, and what critical empirical threat must the analytics team investigate?

* [ ] The DiD estimate is $+3.5\%$ because baseline differences reflect static user preferences that do not bias rate-of-change metrics.
  *تقدير DiD هو 3.5% لأن الفروق الأولية ثابتة ولا تؤثر على معدل التغير.*
  > **Why this is incorrect:** A simple before-and-after change of $+3.5\%$ ignores secular growth; France grew by $+1.5\%$ concurrently without the new checkout feature.
  > **لماذا هذا الخيار خاطئ:** المقارنة البسيطة قبل وبعد تتجاهل النمو الطبيعي العام؛ فقد ارتفعت فرنسا بنسبة 1.5% دون تطبيق النظام الجديد.
* [x] The DiD estimate is $+2.0\%$ ($(9.5\% - 6.0\%) - (5.5\% - 4.0\%) = 3.5\% - 1.5\% = 2.0\%$); the primary validity threat is a violation of parallel trends, such as an unannounced holiday marketing campaign run exclusively in Germany during Q2.
  *تقدير DiD هو +2.0%؛ وأكبر تهديد لصحة التقدير هو خرق مسار التوازي عبر حملات تسويقية خاصة بألمانيا وحدها في الربع الثاني.*
  > **Why this is correct:** Subtracting the control secular trend ($+1.5\%$) isolates the net $+2.0\%$ lift. The validity hinges entirely on the assumption that absent the AI feature, Germany would have also grown by $1.5\%$.
  > **لماذا هذا الخيار صحيح:** طرح المسار الطبيعي لفرنسا (+1.5%) يعزل الأثر الصافي (+2.0%). وتعتمد صحة النموذج كلياً على أن ألمانيا كانت ستنمو بنفس معدل 1.5% لولا الميزة الجديدة.
* [ ] The DiD estimate is $-0.5\%$ because France had a lower initial baseline, inducing regression to the mean.
  *تقدير DiD هو -0.5% بسبب ارتداد فرنسا نحو المتوسط.*
  > **Why this is incorrect:** Different baseline levels do not invalidate DiD; the method explicitly differences out time-invariant baseline level gaps $\beta_1$.
  > **لماذا هذا الخيار خاطئ:** اختلاف المستويات الأولية لا يبطل DiD، فالنموذج يطرح الفروق الثابتة في المستويات $\beta_1$ تلقائياً.
* [ ] The DiD estimate cannot be computed with aggregate country averages because least squares requires individual session clickstreams to satisfy the Gauss-Markov theorem.
  *لا يمكن حساب DiD باستخدام المتوسطات الكلية لتعارضها مع مبرهنة غاوس-ماركوف.*
  > **Why this is incorrect:** By the Frisch-Waugh-Lovell theorem and cell expectation algebra, group-mean double differencing is mathematically identical to micro-level OLS with clustered standard errors.
  > **لماذا هذا الخيار خاطئ:** حسب مبرهنة فريش-وو-لوفيل، فإن الفروق المزدوجة للمتوسطات تتطابق رياضياً تماماً مع انحدار البيانات الفردية.
