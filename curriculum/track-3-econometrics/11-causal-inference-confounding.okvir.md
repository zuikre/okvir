---
id: "causal-inference-confounding"
version: "1.0.0"
title: "Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation"
track: "econometrics"
module: "mod-23"
estimated_minutes: 15
prerequisites: ["selection-bias-randomized-trials", "bad-controls-mediators-overcontrolling"]
i18n:
  ar: "المخططات السببية الموجهة غير الدائرية ومسارات الفصل d"
---

# Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Judea Pearl revolutionized causal inference and empirical economics by replacing dense, impenetrable probabilistic algebra with transparent, intuitive visual network maps: **Causal Directed Acyclic Graphs (DAGs)**. In standard statistics, correlation is a symmetric, bidirectional street: $\text{Corr}(X, Y) = \text{Corr}(Y, X)$. If rooster crowing and sunrise are correlated, a standard regression algorithm cannot tell which one creates the other. A causal DAG breaks this symmetry with directed arrows ($X \to Y$), providing a rigorous mathematical syntax for *cause and effect*.

Think of statistical information flowing through a causal graph like water running through an interconnected plumbing network or electrical current coursing through a circuit board. How the pipes connect determines whether information flows naturally, gets blocked, or leaks through unintended conduits:
1. **The Chain ($X \to M \to Y$):** Information flows directly from treatment $X$ through the mediator $M$ to outcome $Y$. Smoking ($X$) causes cellular DNA damage ($M$), which causes lung cancer ($Y$). If you install an shutoff valve at $M$ (condition on $M$), the pipe is closed, and the transmission of information halts.
2. **The Fork ($X \leftarrow Z \to Y$):** Variable $Z$ is a **confounder**—a common ancestor feeding into both $X$ and $Y$. Because water flows downhill out of $Z$ in both directions, an unauthorized **"Backdoor Path"** connects $X$ and $Y$ even if there is zero direct pipe connecting them!

Consider the classic real-world paradox: municipal ice cream sales ($X$) and coastal drowning deaths ($Y$) display a strong, statistically significant positive correlation. Does eating chocolate chip ice cream cause swimmers to cramp up and drown? Obviously not. Summer heatwaves ($Z$) are the common fork: blistering temperatures induce people to buy ice cream ($Z \to X$) while simultaneously driving thousands of families to swim in the ocean ($Z \to Y$). If an empirical researcher regresses drownings on ice cream sales without adjusting for ambient temperature, the backdoor pipe remains wide open, flooding the regression with phantom association.

Crucially, causal DAGs demystify the profound divide between prediction and causation. A predictive machine learning model asks: *"Given that ice cream sales surged by $40\%$ today, what will happen to drowning deaths?"* It will accurately forecast higher drownings because observing ice cream carries information about the summer heat. That is passive surveillance. Econometrics and causal inference ask a fundamentally different, interventional question: *"What would happen if the city mayor passed an emergency ordinance banning all ice cream sales tomorrow?"* Under an intervention, drownings would not drop by a single person—because severing the ice cream market leaves the summer heat untouched. Prediction listens to the ambient chatter of the network; causal inference calculates the surgical consequence of turning an actual valve. Pearl's **Backdoor Criterion** is the exact blueprint for which valves to shut to isolate genuine policy impacts.

أحدث عالم الحاسوب والمنطق جوديا بيرل (Judea Pearl) ثورة كبرى في الاستدلال السببي والقياس الاقتصادي، حين استبدل المعادلات الجبرية الاحتمالية المعقدة بشبكات بصرية بديهية ودقيقة للغاية: **المخططات الموجهة غير الدائرية (Causal DAGs)**. في الإحصاء التقليدي، يمثل الارتباط طريقًا ذا اتجاهين متناظرين تمامًا: $\text{Corr}(X, Y) = \text{Corr}(Y, X)$. إذا كان صياح الديك وشروق الشمس مرتبطين إحصائيًا، فإن خوارزمية الانحدار تعجز تمامًا عن معرفة أيهما يصنع الآخر! تكسر مخططات DAG هذا التناظر عبر أسهم موجهة صريحة ($X \to Y$) تمنحنا لغة رياضية صارمة للسبب والأثر.

تخيل تدفق المعلومات الإحصائية عبر الرسم البياني السببي كتدفق المياه في شبكة سباكة منزلية أو سريان التيار الكهربائي في لوحة مفاتيح؛ إذ تحدد طريقة اتصال الأنابيب مسار التدفق:
1. **السلسلة ($X \to M \to Y$):** تتدفق المياه مباشرة من المعالجة $X$ عبر المتغير الوسيط $M$ إلى النتيجة النهائية $Y$. التدخين ($X$) يسبب تلف الحمض النووي للخلايا ($M$)، والتلف يسبب سرطان الرئة ($Y$). إذا قمت بتركيب صمام إغلاق عند $M$ (أي قمت بضبط أو تثبيت $M$)، يُغلق الأنبوب ويتوقف تدفق المعلومات كليًا.
2. **الشوكة المربكة ($X \leftarrow Z \to Y$):** هنا يمثل المتغير $Z$ **مربكًا أصيلاً (Confounder)**—وهو جذر مشترك يغذي كلاً من $X$ و $Y$. ولأن المياه تتدفق تلقائيًا من القمة $Z$ في كلا الاتجاهين، ينشأ **"مسار باب خلفي" (Backdoor Path)** غير سببي يربط بين $X$ و $Y$ حتى لو لم يكن بينهما أي أنبوب مباشر!

تأمل المفارقة الواقعية الشهيرة: مبيعات الآيس كريم في المدن الساحلية ($X$) وحالات الغرق في البحر ($Y$) ترتبطان بعلاقة طردية قوية ذات دلالة إحصائية. فهل يؤدي التهام الآيس كريم إلى تقلص عضلات السباحين وغرقهم؟ بالطبع لا! إن موجات الحر القائظ في الصيف ($Z$) هي الشوكة المشتركة الحقيقية: فارتفاع درجات الحرارة يدفع الناس لشراء المرطبات ($Z \to X$)، ويدفع في الوقت نفسه مئات الآلاف للنزول إلى شاطئ البحر للسباحة ($Z \to Y$). فإذا قام باحث سليم النية ببناء نموذج انحدار للغرق على مبيعات الآيس كريم دون عزل درجة الحرارة، يظل أنبوب الباب الخلفي مفتوحًا على مصراعيه، مغرقًا التقديرات بارتباط زائف ومضلل.

والأهم من ذلك أن مخططات DAG تزيل الغموض الفاصل بين التنبؤ والسببية. يسأل نموذج تعلم الآلة التنبؤي: *"إذا رصدنا اليوم قفزة بنسبة $40\%$ في مبيعات الآيس كريم، فماذا سيحدث لمعدل الغرق؟"* سيتنبأ النموذج بدقة بارتفاع حالات الغرق لأن مراقبة الآيس كريم تحمل معلومة غير مباشرة عن سخونة الطقس؛ وهذا رصد سلبي محض. أما القياس الاقتصادي وصانع السياسات فيطرحان سؤالاً تدخليًا جذريًا: *"ماذا سيحدث لمعدل الغرق لو أصدر عمدة المدينة قرارًا بحظر بيع الآيس كريم غدًا؟"* لن تنخفض حالات الغرق بمقدار حالة واحدة، لأن قطع بيع المثلجات يترك حرارة الشمس المشتعلة كما هي دون مساس! التنبؤ ينصت لضجيج الارتباطات المتشابكة، بينما الاستدلال السببي يحسب بدقة نتائج التدخل الفعلي في صمامات الواقع. ويُعد **معيار الباب الخلفي لجوديا بيرل** هو الدليل الهندسي الدقيق الذي يخبرك بالصمامات الواجب إغلاقها بدقة لعزل التأثير السببي الحقيقي للسياسات.

:::simulation-widget{engine="canvas2d" component="CausalDagBackdoorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

A Causal Directed Acyclic Graph is formally defined as a pair $\mathcal{G} = (\mathcal{V}, \mathcal{E})$, where $\mathcal{V}$ is a set of random variable nodes and $\mathcal{E}$ is a set of directed edges (arrows) containing no directed cycles ($X \to \dots \to X$).

### The Three Fundamental Graphical Junctions & d-Separation

Any path in a DAG can be decomposed into three elemental three-node configurations:

1. **Chain (Mediator):** $X \to M \to Y$
   $$P(Y, M, X) = P(X) P(M \mid X) P(Y \mid M)$$
   *Unconditional state:* Active (information flows; $X \not\!\perp\!\!\!\perp Y$).
   *Conditioned on $M$:* Blocked ($X \perp\!\!\!\perp Y \mid M$).

2. **Fork (Confounder):** $X \leftarrow Z \to Y$
   $$P(X, Y, Z) = P(Z) P(X \mid Z) P(Y \mid Z)$$
   *Unconditional state:* Active (spurious association flows; $X \not\!\perp\!\!\!\perp Y$).
   *Conditioned on $Z$:* Blocked ($X \perp\!\!\!\perp Y \mid Z$).

3. **Collider (Mutual Effect):** $X \to C \leftarrow Y$
   $$P(X, Y, C) = P(X) P(Y) P(C \mid X, Y)$$
   *Unconditional state:* **Blocked** by default ($X \perp\!\!\!\perp Y$).
   *Conditioned on $C$ (or any descendant of $C$):* **Opened** ($X \not\!\perp\!\!\!\perp Y \mid C$), inducing artificial correlation (Berkson's bias).

A path $p$ is **d-separated** (blocked) by a conditioning set $\mathbf{Z}$ if and only if:
1. $p$ contains a chain $i \to m \to j$ or a fork $i \leftarrow m \to j$ such that the middle node $m \in \mathbf{Z}$, **OR**
2. $p$ contains a collider $i \to c \leftarrow j$ such that neither the collider $c$ nor any of its descendants belong to $\mathbf{Z}$ ($c \notin \mathbf{Z}$ and $\text{de}(c) \cap \mathbf{Z} = \emptyset$).

### Pearl's Backdoor Criterion & The Adjustment Formula

A path between treatment $X$ and outcome $Y$ is a **Backdoor Path** if it begins with an arrow pointing into $X$ ($X \leftarrow \dots \to Y$). Backdoor paths convey spurious non-causal association.

**Theorem (Backdoor Criterion):** A set of variables $\mathbf{Z}$ satisfies the Backdoor Criterion relative to the ordered pair $(X, Y)$ if:
1. No node in $\mathbf{Z}$ is a descendant of $X$ ($\mathbf{Z} \cap \text{de}(X) = \emptyset$).
2. $\mathbf{Z}$ blocks (d-separates) every backdoor path between $X$ and $Y$.

When $\mathbf{Z}$ satisfies the Backdoor Criterion, Pearl's interventional distribution is non-parametrically identified by the **Backdoor Adjustment Formula**:

$$
P(Y = y \mid \text{do}(X = x)) = \sum_{\mathbf{z}} P(Y = y \mid X = x, \mathbf{Z} = \mathbf{z}) P(\mathbf{Z} = \mathbf{z})
$$

### Proof / Derivation via do-Calculus

In Pearl's framework, the $\text{do}(X=x)$ operator physically intervenes in the data generating mechanism, replacing the structural equation $X = f_X(pa(X), U_X)$ with the constant assignment $X = x$. This surgically cuts all arrows pointing into $X$, transforming the natural graph $\mathcal{G}$ into the manipulated graph $\mathcal{G}_{\bar{X}}$.

By law of total probability:
$$
P(Y = y \mid \text{do}(X = x)) = \sum_{\mathbf{z}} P(Y = y \mid \text{do}(X = x), \mathbf{Z} = \mathbf{z}) P(\mathbf{Z} = \mathbf{z} \mid \text{do}(X = x))
$$

Because $\mathbf{Z}$ contains no descendants of $X$, an intervention on $X$ cannot affect $\mathbf{Z}$:
$$
P(\mathbf{Z} = \mathbf{z} \mid \text{do}(X = x)) = P(\mathbf{Z} = \mathbf{z})
$$

Because $\mathbf{Z}$ blocks all backdoor paths, conditioning on $\mathbf{Z}$ renders $Y$ conditionally independent of the incoming mechanism of $X$. In the severed graph $\mathcal{G}_{\bar{X}}$, the interventional probability equals the conditional observational probability:
$$
P(Y = y \mid \text{do}(X = x), \mathbf{Z} = \mathbf{z}) = P(Y = y \mid X = x, \mathbf{Z} = \mathbf{z})
$$

Substituting these two identities directly yields the Backdoor Adjustment Formula.

For discrete confounder strata $s \in \{1, \dots, S\}$, the causal **Average Treatment Effect (ATE)** is:

$$
\text{ATE} \equiv \mathbb{E}[Y \mid \text{do}(X = 1)] - \mathbb{E}[Y \mid \text{do}(X = 0)] = \sum_{s=1}^S \Big( \mathbb{E}[Y \mid X = 1, Z = s] - \mathbb{E}[Y \mid X = 0, Z = s] \Big) \cdot P(Z = s)
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathcal{G} = (\mathcal{V}, \mathcal{E})$: Causal Directed Acyclic Graph consisting of random variable vertices $\mathcal{V}$ and directed causal arrows $\mathcal{E}$.
* $pa(X)$: The set of immediate parents (direct causes) of node $X$.
* $de(X)$: The set of descendants (causal consequences) of node $X$.
* $\text{do}(X = x)$: The surgical interventional operator that severs all incoming parent arrows to $X$, setting its value exogenously.
* $X \leftarrow Z \to Y$: Confounder fork creating non-causal sample covariance $\text{Cov}(X, Y) \ne 0$.
* $X \to M \to Y$: Causal chain where $M$ transmits the causal mechanism from $X$ to $Y$.
* $X \to C \leftarrow Y$: Collider junction that naturally blocks associative flow between $X$ and $Y$ when unconditioned.
* $\mathbf{Z}$: Admissible conditioning set satisfying the Backdoor Criterion, ensuring unconfoundedness $(Y(1), Y(0)) \perp\!\!\!\perp X \mid \mathbf{Z}$.
* $P(Z = s)$: Marginal population prevalence weight of confounder stratum $s$.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the Backdoor Criterion adjustment formula via subclassification over discrete confounder strata. For each stratum of $Z$, compute the difference in treatment means, and compute the population-weighted ATE.

:::python-challenge{id="py-causal-inference-confounding"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([5.0, 7.0, 3.0, 4.0]); d = np.array([1, 1, 0, 0]); z = np.array([0, 1, 0, 1]); round(backdoor_subclassification_ate(y, d, z), 4)"
    expected: "2.5"
  - input: "y = np.array([10.0, 2.0, 8.0, 1.0]); d = np.array([1, 0, 1, 0]); z = np.array([0, 0, 1, 1]); round(backdoor_subclassification_ate(y, d, z), 4)"
    expected: "7.5"
  - input: "y = np.array([4.0, 2.0]); d = np.array([1, 0]); z = np.array([0, 0]); backdoor_subclassification_ate(y, d, z)"
    expected: "2.0"
---
```python
import numpy as np

def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:
    """
    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.
    
    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Observed continuous outcome.
    d : np.ndarray of shape (N,)
        Binary treatment assignment (1 or 0).
    z_strata : np.ndarray of shape (N,)
        Discrete confounder strata indicators.
        
    Returns
    -------
    float: Causal Average Treatment Effect
    """
    # Step 1: Identify sample size and unique confounder strata
    N = len(y)
    unique_strata = np.unique(z_strata)
    weighted_ate = 0.0
    
    # Step 2: Iterate through each confounder stratum to compute within-stratum effects
    for s in unique_strata:
        stratum_mask = (z_strata == s)
        n_s = np.sum(stratum_mask)
        p_s = n_s / N
        
        # Step 3: Separate treated (d=1) and control (d=0) units within this stratum
        treated_in_s = stratum_mask & (d == 1)
        control_in_s = stratum_mask & (d == 0)
        
        # Step 4: Compute stratum difference in means if both treatment groups are present
        if np.sum(treated_in_s) > 0 and np.sum(control_in_s) > 0:
            mean_treated = np.mean(y[treated_in_s])
            mean_control = np.mean(y[control_in_s])
            stratum_diff = mean_treated - mean_control
            
            # Step 5: Accumulate population-weighted treatment contrast
            weighted_ate += stratum_diff * p_s
            
    return float(weighted_ate)
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A public policy think-tank observes that cities with high police deployment ($X$) also experience higher crime rates ($Y$). A naive political pundit claims: *"Police cause crime; deploying officers makes neighborhoods more dangerous!"*

In Judea Pearl's DAG framework, which node represents the confounding variable $Z$ on the backdoor path $X \leftarrow Z \to Y$, and what happens when the econometrician conditions on $Z$?

* [ ] The number of police cars is the confounder; conditioning on it increases the positive bias.
* [x] Neighborhood baseline criminal activity / gang density is the confounder ($Z$); high baseline crime triggers both more police deployment ($Z \to X$) and more recorded crimes ($Z \to Y$). Conditioning on baseline crime blocks the backdoor path and reveals the true crime-reducing effect of policing.
* [ ] Crime and police deployment form a collider; conditioning on crime causes Berkson's bias.
* [ ] The think-tank is correct because DAGs cannot be applied to law enforcement data.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
The relationship between police deployment ($X$) and recorded crime ($Y$) is a quintessential confounding fork ($X \leftarrow Z \to Y$). Mayors and police chiefs do not assign police officers to quiet residential neighborhoods at random; they deploy heavy patrols specifically to areas with severe historical gang activity and high baseline criminal risk ($Z$). Because high baseline risk independently causes both higher police presence ($Z \to X$) and higher observed crimes ($Z \to Y$), an unblocked backdoor path $X \leftarrow Z \to Y$ floods the naive regression with a massive positive bias that easily overwhelms the negative deterrent effect of officers. Conditioning on baseline risk ($Z$) d-separates the backdoor path, closing the leak and allowing the authentic deterrent causal effect ($X \to Y$) to emerge.

**Why the distractors are incorrect:**
1. *The number of police cars is the confounder...*: Police cars are an operational mechanism or mediator of police presence ($X \to \text{Cars} \to Y$), not a common ancestor causing both deployments and criminal motivations.
2. *Crime and police deployment form a collider...*: A collider requires two arrows pointing inward ($X \to C \leftarrow Y$). Crime is the outcome of interest, not a downstream common effect that the analyst inadvertently conditioned upon.
3. *The think-tank is correct because DAGs cannot be applied...*: Causal DAGs are non-parametric mathematical frameworks applicable to all observational social science settings, including criminology, public economics, and epidemiology.

*الشرح باللغة العربية:*
العلاقة الساذجة بين وجود الشرطة ($X$) وارتفاع الجريمة ($Y$) هي نموذج كلاسيكي للشوكة المربكة ($X \leftarrow Z \to Y$). فرؤساء البلديات لا ينشرون الدوريات الأمنية عشوائيًا في الضواحي الهادئة، بل يوجهونها بكثافة إلى الأحياء ذات المخاطر الأمنية العالية والنشاط الإجرامي الأساسي ($Z$). ونظرًا لأن هذا الخطر المسبق يسبب زيادة انتشار الشرطة ($Z \to X$) وارتفاع وتيرة الجرائم ($Z \to Y$) في آن واحد، فإن مسار الباب الخلفي غير المغلق ينقل ارتباطًا موجبًا هائلاً يطغى على الأثر الردعي الحقيقي للشرطة! عند التحكم في مستوى الجريمة التاريخي ($Z$)، يُغلق مسار الباب الخلفي (d-separation)، مما يكشف الأثر الوقائي الحقيقي للشرطة في خفض الجريمة.
