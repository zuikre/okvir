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

### Intuition & Real-World Story

In coastal towns during summer months, two statistics surge in perfect lockstep:
1. Daily ice cream sales skyrocket.
2. Hospital emergency room drowning incidents spike.

A naive regression of drowning deaths on ice cream sales shows a statistically significant, positive correlation with $p < 0.001$. Does eating delicious strawberry ice cream cause swimmers to cramp and drown? Should mayors ban ice cream parlors to save swimmers?

Of course not. Both phenomena share a common cause: **Scorching Summer Heat ($Z$)**. When the thermometer hits 95°F (35°C), more people buy ice cream, and far more people go swimming in the ocean, mechanically increasing drowning accidents.

In the language of **Directed Acyclic Graphs (DAGs)** pioneered by Judea Pearl, Summer Heat is a **Confounder (Fork)**. It creates a spurious, non-causal statistical leakage known as a **Backdoor Path**:
$$\text{Ice Cream} \leftarrow \text{Heat} \to \text{Drowning}$$
If you don't control for heat, correlation flows freely through this backdoor pipe, fooling your regression into seeing causation where none exists.

To find the true causal effect, we must apply the **Backdoor Criterion**: identify all open backdoor paths and block them by conditioning on the common fork!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **DAG** | Directed Acyclic Graph: a causal map of arrows showing what influences what without circular loops. |
| **Fork ($X \leftarrow Z \to Y$)** | Common cause: a shared parent creating an open backdoor channel between children. |
| **Backdoor Path** | An open non-causal pathway pointing backward out of treatment and sneaking into the outcome. |
| **Blocking / Conditioning** | Closing the pipe: holding the common cause constant so spurious correlation cannot leak. |
| **d-Separation** | Graph rules that prove when two variables are statistically independent given a set of controls. |

```text
    THE FORK BACKDOOR PATH:

                 Summer Heat (Z)
                 /             \
       (Arrow In)               (Arrow In)
               v                 v
        Ice Cream (X) - - - - > Drowning (Y)
                   (Spurious Phantom Correlation!)
```

### الحدس والقصة الواقعية

في المدن الساحلية خلال أشهر الصيف، يرتفع مؤشران إحصائيان بتزامن مذهل:
1. مبيعات المثلجات (الآيس كريم) تسجل أرقامًا قياسية.
2. حالات الغرق في شواطئ البحر تسجل أعلى معدلاتها السنوية.

إذا أجريت انحدارًا إحصائيًا، ستجد ارتباطًا وثيقًا بدلالة إحصائية قاطعة ($p < 0.001$). فهل يسبب تناول الآيس كريم تقلصات عضلية تؤدي للغرق؟ وهل يجب على عمدة المدينة إغلاق محال المثلجات لحماية السباحين؟

بالتأكيد لا! فكلا الظاهرتين تشتركان في سبب أصلي واحد: **حرارة الصيف اللاهبة ($Z$)**. فعندما ترتفع درجات الحرارة، يشتري الناس مزيدًا من المثلجات، وفي الوقت ذاته يهرع الآلاف للسباحة في البحر مما يزيد حوادث الغرق.

في لغة **المخططات الموجهة غير الدائرية (DAGs)** التي ابتكرها جوديا بيرل، تسمى حرارة الصيف **عامل مربك (Fork)**، وهي تفتح مسارًا خلفيًا زائفًا:
$$\text{المثلجات} \leftarrow \text{الحرارة} \to \text{الغرق}$$
هذا المسار الخلفي يسرّب ارتباطًا غير سببي يخدع النماذج الإحصائية.

وللوصول إلى الحقيقة السببية، نطبق **معيار الباب الخلفي (Backdoor Criterion)**: نرصد جميع المسارات الخلفية المفتوحة ونغلقها عبر تثبيت العامل المشترك ومقارنة البيانات داخل كل درجة حرارة على حدة!

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **مخطط DAG** | خريطة سببية بأسهم واضحة توضح اتجاهات التأثير دون أي حلقات دائرية مغلقة. |
| **المفترق المشترك (Fork)** | أب مشترك: عامل واحد يفرع سهمين مسببًا علاقة ارتباط وهمية بين طرفيه. |
| **المسار الخلفي (Backdoor)** | قناة تسريب خلفية غير سببية تنطلق من المعالجة وتتسلل نحو النتيجة. |
| **سد المسار (Conditioning)** | إغلاق القناة: تثبيت العامل المشترك لمنع تسرب الارتباط الزائف. |
| **الفصل الاتجاهي (d-separation)** | قواعد هندسية في الرسم تحدد متى يكون متغيران مستقلين إحصائيًا. |

:::simulation-widget{engine="canvas2d" component="CausalDagBackdoorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

A path in a DAG is a backdoor path from treatment $X$ to outcome $Y$ if it contains an arrow pointing into $X$.

**The Backdoor Criterion (Pearl):**
A set of variables $\mathbf{Z}$ satisfies the backdoor criterion relative to $(X, Y)$ if:
1. No node in $\mathbf{Z}$ is a descendant of $X$.
2. $\mathbf{Z}$ blocks every backdoor path between $X$ and $Y$.

When $\mathbf{Z}$ satisfies the backdoor criterion, the causal interventional distribution $\mathbb{P}(Y \mid do(X = x))$ is identified via the **Backdoor Adjustment Formula**:

$$
\mathbb{P}(Y = y \mid do(X = x)) = \sum_{\mathbf{z}} \mathbb{P}(Y = y \mid X = x, \mathbf{Z} = \mathbf{z}) \mathbb{P}(\mathbf{Z} = \mathbf{z})
$$

The corresponding Average Treatment Effect under subclassification across strata $k = 1, \dots, K$ is:

$$
\tau = \sum_{k=1}^K \left( \mathbb{E}[Y \mid D = 1, Z = k] - \mathbb{E}[Y \mid D = 0, Z = k] \right) \cdot \mathbb{P}(Z = k)
$$

### Why the Math Works Step-by-Step

1. **Why does summing over $\mathbb{P}(Z = z)$ simulate an intervention?**
   In the real world, treatment $X$ depends on confounder $Z$. The do-operator $do(X = x)$ physically severs all arrows pointing into $X$. Weighting the conditional outcomes by the marginal distribution $\mathbb{P}(Z = z)$ reconstructs what would happen if $X$ were set independently of $Z$!
2. **Subclassification Intuition:**
   Inside each stratum of temperature (e.g., only days where temperature is 80°F), temperature is held constant. The backdoor path is blocked, so any remaining difference between high ice cream consumption and low ice cream consumption reflects true direct impact (which is zero!).

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $do(X = x)$: Pearl's intervention operator simulating an active policy mandate.
* $\mathbf{Z}$: Conditioning set satisfying the backdoor criterion.
* $\mathbb{P}(Z = k)$: Proportion of the population in stratum $k$.
* $\tau$: Unconfounded causal Average Treatment Effect.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $do(X=x)$ | مشغل التدخل السببي لبيرل | محاكاة فرض التدخل بالقوة وقطع كافة الأسهم المؤثرة في المعالجة. |
| $\mathbf{Z}$ | مجموعة الضبط الخلفي | حزمة المتغيرات الكافية لسد وإغلاق جميع مسارات التسريب الخلفية. |
| $\mathbb{P}(Z=k)$ | الوزن النسبي للطبقة | النسبة المئوية التي تمثلها هذه الفئة في المجتمع الإحصائي الكلي. |
| صيغة التعديل الخلفي | معادلة التعديل السببي | وزن النتائج الشرطية بأوزان المجتمع لعزل العلاقة السببية النقية. |

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

def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:
    """
    Computes the ATE by blocking a discrete backdoor confounder via subclassification.

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Target outcome.
    d : np.ndarray of shape (N,)
        Binary treatment indicator (0 or 1).
    z : np.ndarray of shape (N,)
        Discrete confounder strata labels.

    Returns
    -------
    float : Unconfounded causal Average Treatment Effect.
    """
    strata = np.unique(z)
    n_total = len(y)
    ate = 0.0

    for s in strata:
        stratum_mask = (z == s)
        n_stratum = np.sum(stratum_mask)
        p_stratum = n_stratum / n_total

        # Compute within-stratum difference in means
        treated_in_s = y[stratum_mask & (d == 1)]
        control_in_s = y[stratum_mask & (d == 0)]

        if len(treated_in_s) > 0 and len(control_in_s) > 0:
            diff_s = float(np.mean(treated_in_s) - np.mean(control_in_s))
            ate += diff_s * p_stratum

    return float(ate)
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
