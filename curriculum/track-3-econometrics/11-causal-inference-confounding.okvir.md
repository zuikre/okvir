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

Judea Pearl revolutionized causal inference by replacing complex probabilistic equations with transparent, intuitive visual network graphs: **Directed Acyclic Graphs (DAGs)**.

Think of statistical information flowing through a causal graph like water through a plumbing network or electrical current through a circuit:
1. **The Chain ($X \to M \to Y$):** Water flows directly from $X$ through the mediator $M$ to $Y$. Treatment causes the mediator, which in turn causes the outcome. If you close the valve at $M$ (condition on $M$), the pipe is blocked and information stops flowing.
2. **The Fork ($X \leftarrow Z \to Y$):** Here, $Z$ is a **confounder**—a common cause that feeds into both $X$ and $Y$. Because water flows downhill out of $Z$ in both directions, a non-causal **"Backdoor Path"** connects $X$ and $Y$!

Consider the classic real-world paradox: municipal ice cream sales ($X$) and public pool drowning accidents ($Y$) are strongly positively correlated. Does eating strawberry ice cream cause swimmers to cramp and drown? Obviously not. Summer heatwaves ($Z$) are the common cause: high temperatures cause people to buy ice cream ($Z \to X$) while simultaneously driving thousands of people to swim in pools ($Z \to Y$).

If you fail to condition on the temperature $Z$, the backdoor pipe remains wide open, creating a phantom statistical association between ice cream and drownings! Pearl's **Backdoor Criterion** is the master blueprint that tells you exactly which valves to shut (which variables to adjust for) to seal off all confounding backdoor leaks while leaving the authentic causal pipeline wide open.

أحدث جوديا بيرل ثورة في الاستدلال السببي باستبدال المعادلات الاحتمالية المعقدة بشبكات بيانية بصرية واضحة وبديهية: **المخططات الموجهة غير الدائرية (Causal DAGs)**.

تخيل تدفق المعلومات الإحصائية عبر الرسم البياني السببي كتدفق المياه عبر شبكة أنابيب أو التيار في دائرة كهربائية:
1. **السلسلة ($X \to M \to Y$):** تتدفق المياه مباشرة من المعالجة $X$ عبر المتغير الوسيط $M$ إلى النتيجة $Y$. المعالجة تسبب الوسيط، والوسيط يسبب النتيجة. إذا أغلقت الصمام عند $M$ (التحكم في $M$)، ينسد الأنبوب ويتوقف التدفق تمامًا.
2. **الشوكة المربكة ($X \leftarrow Z \to Y$):** هنا يمثل $Z$ **متغيرًا مربكًا (Confounder)**—سببًا مشتركًا يغذي كلاً من $X$ و $Y$. ولأن المياه تتدفق من $Z$ في كلا الاتجاهين، ينفتح **"مسار باب خلفي" (Backdoor Path)** غير سببي يربط بين $X$ و $Y$!

تأمل المفارقة الواقعية الشهيرة: مبيعات الآيس كريم ($X$) وحالات الغرق في المسابح ($Y$) ترتبطان بعلاقة طردية قوية جدًا. فهل يؤدي تناول الآيس كريم إلى غرق السباحين؟ قطعًا لا. إن حرارة فصل الصيف المرتفعة ($Z$) هي السبب المشترك الحقيقي: فالحر الشديد يدفع الناس لشراء الآيس كريم ($Z \to X$) ويدفعهم في الوقت ذاته للنزول إلى المسابح ($Z \to Y$).

إذا لم تتحكم في درجة الحرارة $Z$، يظل أنبوب الباب الخلفي مفتوحًا على مصراعيه، مما يوهم بوجود علاقة سببية بين الآيس كريم والغرق! ويُعد **معيار الباب الخلفي لجوديا بيرل** هو الدليل الهندسي الذي يحدد الصمامات الدقيقة الواجب إغلاقها (المتغيرات المطلوب ضبطها) لسد كافة تسريبات الباب الخلفي، مع الحفاظ على أنبوب التأثير السببي الحقيقي نقيًا وصريحًا.

:::simulation-widget{engine="canvas2d" component="CausalDagBackdoorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

A path between treatment $X$ and outcome $Y$ is a **Backdoor Path** if it begins with an arrow pointing into $X$ ($X \leftarrow \dots \to Y$).

Pearl's **Backdoor Criterion** establishes that a set of variables $\mathbf{Z}$ identifies the causal effect of $X$ on $Y$ if:
1. No node in $\mathbf{Z}$ is a descendant of treatment $X$ (avoids bad controls/mediators).
2. $\mathbf{Z}$ blocks (d-separates) every backdoor path between $X$ and $Y$.

Under the Backdoor Criterion, the interventional causal distribution is obtained via the **Adjustment Formula**:

$$
P(Y \mid \text{do}(X = x)) = \sum_{\mathbf{z}} P(Y \mid X = x, \mathbf{Z} = \mathbf{z}) P(\mathbf{Z} = \mathbf{z})
$$

For a discrete confounder $Z$ with strata $z \in \{1, \dots, S\}$, the Average Treatment Effect (ATE) is:

$$
\text{ATE} = \sum_{s=1}^S \Big( \mathbb{E}[Y \mid X = 1, Z = s] - \mathbb{E}[Y \mid X = 0, Z = s] \Big) \cdot P(Z = s)
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\text{do}(X = x)$: Pearl's mathematical operator denoting an active physical intervention that severs all incoming arrows to $X$, transforming the natural graph $\mathcal{G}$ into the manipulated graph $\mathcal{G}_{\bar{X}}$.
* $X \leftarrow Z \to Y$: Confounding fork structure inducing spurious covariance $\text{Cov}(X, Y) \ne 0$ even when $X$ has zero causal impact on $Y$.
* $\mathbf{Z}$: Conditioning set that satisfies the Backdoor Criterion by closing all non-causal associative channels.
* $P(Z = s)$: Marginal population prevalence weight of stratum $s$.

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
    N = len(y)
    unique_strata = np.unique(z_strata)
    weighted_ate = 0.0
    
    for s in unique_strata:
        # Mask for units in stratum s
        stratum_mask = (z_strata == s)
        n_s = np.sum(stratum_mask)
        p_s = n_s / N
        
        # Treatment and control masks within stratum
        treated_in_s = stratum_mask & (d == 1)
        control_in_s = stratum_mask & (d == 0)
        
        if np.sum(treated_in_s) > 0 and np.sum(control_in_s) > 0:
            mean_treated = np.mean(y[treated_in_s])
            mean_control = np.mean(y[control_in_s])
            stratum_diff = mean_treated - mean_control
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
