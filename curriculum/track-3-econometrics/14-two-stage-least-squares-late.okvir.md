---
id: "two-stage-least-squares-late"
version: "1.0.0"
title: "Two-Stage Least Squares (2SLS), Weak Instruments & LATE"
track: "econometrics"
module: "mod-24"
estimated_minutes: 15
prerequisites: ["instrumental-variables-2sls"]
i18n:
  ar: "المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي"
---

# Two-Stage Least Squares (2SLS), Weak Instruments & LATE

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

### Intuition & Real-World Story

Suppose a municipal school district offers an educational voucher via a random lottery to attend a prestigious private academy. 

If every family who won the lottery enrolled in the academy, and every family who lost stayed in public school, you would have a perfect randomized experiment. But in the real world, human beings have free will:
1. **Always-Takers:** Wealthy families who would pay out of pocket to attend the academy even if they lose the lottery.
2. **Never-Takers:** Families who win the lottery but decline to enroll because the academy is too far from home.
3. **Compliers:** Families who attend the academy **if and only if** they win the voucher!

Who does our Instrumental Variable estimate actually represent?

In a breakthrough 1994 paper, Guido Imbens and Joshua Angrist proved that Two-Stage Least Squares (2SLS) does not estimate the effect on everybody. It estimates the **Local Average Treatment Effect (LATE)**: the causal effect specifically on the **Compliers**—the sub-population whose treatment status was actively switched by the instrument!

**Two-Stage Least Squares (2SLS)** executes this mathematically in two clean steps:
* **Stage 1:** Regress the messy, confounded treatment $D$ on the pure instrument $Z$ and controls. Keep the predicted values $\hat{D}$ (the clean, cleansed treatment).
* **Stage 2:** Regress the outcome $Y$ on the cleansed prediction $\hat{D}$.

Because $\hat{D}$ only contains variation originating from the pure instrument $Z$, all endogenous confounding has been scrubbed away!

#### Jargon Decoder

| Term | Plain English Translation & Intuition |
| :--- | :--- |
| **Two-Stage Least Squares (2SLS)** | The two-step wash: purging endogeneity in Stage 1, estimating clean payoff in Stage 2. |
| **LATE** | Local Average Treatment Effect: the causal payoff specifically for the Compliers. |
| **Compliers** | The cooperative switchers: people who take treatment if nudged, but refrain if not nudged. |
| **Always-Takers / Never-Takers** | The stubborn cases: people who take treatment (or refuse) regardless of the instrument. |
| **Monotonicity (No Defiers)** | Nobody does the exact opposite of the nudge out of pure spite. |

```text
    THE FOUR COMPLIANCE SUB-POPULATIONS:

                      | Wins Voucher (Z = 1) | Loses Voucher (Z = 0) |
    ------------------+----------------------+-----------------------+
    Always-Takers     | Attends Academy      | Attends Academy       | (Immune to nudge)
    Never-Takers      | Public School        | Public School         | (Immune to nudge)
    Compliers         | Attends Academy      | Public School         | ===> LATE Measures Them!
    Defiers           | Public School        | Attends Academy       | (Ruled out by Monotonicity)
```

### الحدس والقصة الواقعية

تخيل إدارة تعليمية تجري قرعة عشوائية لمنح قسائم دراسية تتيح للطلاب الالتحاق بأكاديمية خاصة متميزة.

لو التزم الجميع بالقرعة، لأصبح لدينا تجربة عشوائية مثالية. ولكن في الواقع المعاش، يتصرف البشر بحرية وإرادة خاصة:
1. **المشاركون دائمًا (Always-Takers):** أسر ثرية ستسجل أبناءها في الأكاديمية على أي حال حتى لو خسرت القرعة.
2. **الممتنعون دائمًا (Never-Takers):** أسر تفوز بالقرعة لكنها ترفض الذهاب لبُعد مسافة المدرسة عن منزلها.
3. **الممتثلون (Compliers):** أسر تسجل أبناءها في الأكاديمية **فقط وحصريًا إذا فازت بالقسيمة**!

على من ينطبق التقدير الإحصائي الذي نحصل عليه إذن؟

في ورقة بحثية نالت جائزة نوبل، برهن غيدو إمبنز وجوشوا أنغريست أن طريقة المربعات الصغرى ذات المرحلتين (2SLS) لا تقيس الأثر على الجميع، بل تقيس **متوسط أثر المعالجة الموضعي (LATE)**: الأثر السببي الخاص بفئة **الممتثلين (Compliers)** الذين غيّرت القرعة سلوكهم الفعلي!

وتنفذ طريقة **2SLS** هذا التطهير عبر مرحلتين:
* **المرحلة الأولى:** انحدار المعالجة الملوثة $D$ على الأداة النقية $Z$ لاستخراج القيم المتوقعة $\hat{D}$ (المعالجة النظيفة).
* **المرحلة الثانية:** انحدار النتيجة $Y$ على المعالجة النظيفة $\hat{D}$ وحدها.

#### قاموس فك شفرة المصطلحات

| المصطلح | المعنى المبسط والحدس العملي |
| :--- | :--- |
| **المربعات الصغرى بمرحلتين (2SLS)** | الغسيل المزدوج: تنقية المعالجة في المرحلة الأولى، وتقدير أثرها في المرحلة الثانية. |
| **أثر المعالجة الموضعي (LATE)** | العائد السببي الخاص حصرًا بفئة "الممتثلين" الذين استجابوا للرافعة. |
| **الممتثلون (Compliers)** | المتجاوبون: من يأخذون المعالجة إذا حثتهم الأداة ويمتنعون إذا لم تحثهم. |
| **المشاركون / الممتنعون دائمًا** | الثابتون: أشخاص يتلقون العلاج (أو يرفضونه) بغض النظر عن نتيجة القرعة. |
| **الرتابة (Monotonicity)** | فرضية استبعاد المعاندين: افتراض عدم وجود من يتعمد فعل عكس التوجيه عنادًا. |

:::simulation-widget{engine="canvas2d" component="TwoStageLeastSquaresLateLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let structural outcome equation be:

$$
\mathbf{y} = \mathbf{X}_1 \boldsymbol{\beta}_1 + \mathbf{D} \alpha + \boldsymbol{\varepsilon}
$$

where $\mathbf{D}$ is endogenous and $\mathbf{Z}$ is a matrix of valid excluded instruments.

**Stage 1 Regression:** Project endogenous $\mathbf{D}$ onto all exogenous variables $\mathbf{W} = [\mathbf{X}_1 \quad \mathbf{Z}]$:

$$
\hat{\mathbf{D}} = \mathbf{P}_W \mathbf{D} = \mathbf{W}(\mathbf{W}^T \mathbf{W})^{-1} \mathbf{W}^T \mathbf{D}
$$

**Stage 2 Regression:** Substitute predicted $\hat{\mathbf{D}}$ into the outcome equation:

$$
\mathbf{y} = \mathbf{X}_1 \boldsymbol{\beta}_1 + \hat{\mathbf{D}} \alpha + \mathbf{u}
$$

Under instrument validity and monotonicity, the Imbens-Angrist theorem proves:

$$
\alpha_{\text{2SLS}} = \mathbb{E}[Y(1) - Y(0) \mid \text{Compliers}] \equiv \text{LATE}
$$

### Why the Math Works Step-by-Step

1. **Why substitute $\hat{\mathbf{D}}$ instead of $\mathbf{D}$?**
   Because $\mathbf{D} = \hat{\mathbf{D}} + \mathbf{e}_D$, where $\hat{\mathbf{D}} \in \text{col}(\mathbf{W})$ is strictly orthogonal to the structural error $\boldsymbol{\varepsilon}$. By replacing $\mathbf{D}$ with its projection $\hat{\mathbf{D}}$, Stage 2 regression faces zero correlation between regressors and error!
2. **The LATE Interpretation:**
   Always-takers have $D_i(1) = D_i(0) = 1$ (difference is 0). Never-takers have $D_i(1) = D_i(0) = 0$ (difference is 0). The denominator $\mathbb{E}[D(1) - D(0)]$ zeroes out everyone except Compliers!

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{P}_W$: Projection matrix spanned by all exogenous covariates and instruments.
* $\hat{\mathbf{D}}$: Purged treatment predictions containing zero endogenous variation.
* $\alpha_{\text{2SLS}}$: Two-Stage Least Squares causal coefficient representing LATE.

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |
| :--- | :--- | :--- |
| $\mathbf{P}_W$ | مصفوفة الإسقاط الموسعة | مصفوفة تسقط البيانات على فضاء كافة المتغيرات الخارجية والأدوات النقية. |
| $\hat{\mathbf{D}}$ | المعالجة المطهرة | توقعات المعالجة بعد تجريدها من أي شوائب ترتبط بالخطأ العشوائي. |
| $\text{LATE}$ | الأثر الموضعي للممتثلين | القيمة السببية الصافية الخاصة بمن حركتهم الأداة دون غيرهم من أفراد العينة. |

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement a Two-Stage Least Squares (2SLS) estimation engine from first principles in NumPy. Verify that standard errors are constructed using the correct structural residuals rather than the second-stage fitted residuals.

:::python-challenge{id="py-two-stage-least-squares-late"}
---
timeout_ms: 3000
test_cases:
  - input: "Z = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]); X = Z[:, 1:2] * 2.0; y = X[:, 0] * 3.0; res = fit_2sls(y, X, Z); round(float(res['beta_2sls'][0]), 4)"
    expected: "3.0"
  - input: "Z = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]); X = Z[:, 1:2] * 2.0; y = X[:, 0] * 3.0; res = fit_2sls(y, X, Z); round(float(np.sum(res['structural_residuals']**2)), 4)"
    expected: "0.0"
  - input: "Z = np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0]]); X = np.array([[1.0], [2.0], [3.0]]); y = np.array([2.0, 4.0, 6.0]); res = fit_2sls(y, X, Z); 'se' in res"
    expected: "True"
---
```python
import numpy as np

def fit_2sls(y: np.ndarray, X_exog: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:
    """
    Fits Two-Stage Least Squares (2SLS) with exogenous covariates and instruments.

    Parameters
    ----------
    y : np.ndarray of shape (N,)
        Outcome vector.
    X_exog : np.ndarray of shape (N, K)
        Exogenous covariates (including constant intercept column).
    d : np.ndarray of shape (N,)
        Endogenous treatment regressor.
    z : np.ndarray of shape (N, L)
        Excluded instrumental variables.

    Returns
    -------
    dict with keys 'alpha_late', 'first_stage_f'
    """
    n = len(y)
    d_col = d if d.ndim == 2 else d[:, np.newaxis]
    z_col = z if z.ndim == 2 else z[:, np.newaxis]

    # Full exogenous instrument matrix W = [X_exog, Z]
    W = np.column_stack([X_exog, z_col])

    # Stage 1: Regress D on W to obtain fitted d_hat
    gamma = np.linalg.solve(W.T @ W, W.T @ d_col)
    d_hat = W @ gamma

    # Stage 2: Regress Y on [X_exog, d_hat]
    X_stage2 = np.column_stack([X_exog, d_hat])
    beta_stage2 = np.linalg.solve(X_stage2.T @ X_stage2, X_stage2.T @ y)

    # Treatment coefficient is the last element
    alpha_late = float(beta_stage2[-1])

    # First stage F-statistic (simplified heuristic)
    d_res = d_col - d_hat
    f_stat = float(np.var(d_hat) / (np.var(d_res) + 1e-10))

    return {
        "alpha_late": alpha_late,
        "first_stage_f": f_stat,
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A municipal workforce development board evaluates an intensive job retraining program by randomly mailing training vouchers ($Z = 1$) to $5,000$ unemployed workers. Some workers who receive vouchers do not attend ($Z=1, D=0$), while some highly motivated control workers find free alternative training ($Z=0, D=1$).

Under the Angrist-Imbens LATE framework, who does the resulting 2SLS estimate represent, and what does the **Monotonicity Assumption** guarantee?

* [ ] The estimate represents the average impact across every unemployed person in the city; monotonicity guarantees zero variance.
* [x] The estimate identifies the causal return exclusively for **Compliers** (workers who attend training *if and only if* they receive the voucher); Monotonicity rules out "Defiers" (individuals who would attend training if denied a voucher, but refuse to attend if given one).
* [ ] The estimate represents the Always-Takers because their high motivation makes them most productive.
* [ ] 2SLS is invalid whenever compliance is less than $100\%$.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
In real-world policy evaluations, compliance is rarely universal. The Angrist-Imbens Local Average Treatment Effect (LATE) theorem proves that when treatment effects are heterogeneous, 2SLS does not estimate the effect for Always-Takers (who would get training regardless of the voucher) or Never-Takers (who ignore the voucher). The instrument exerts leverage *only* on the Compliers—those unemployed workers whose training decision is actively flipped from 0 to 1 by the arrival of the voucher. The Monotonicity assumption states that the instrument pushes people in one direction only ($D_i(1) \ge D_i(0)$); it rules out contrarian "Defiers" who would attend training only when denied a voucher out of pure defiance.

**Why the distractors are incorrect:**
1. *The estimate represents the average impact across every unemployed person...*: That would be the Average Treatment Effect (ATE). 2SLS cannot identify ATE without assuming constant treatment effects across all latent compliance groups.
2. *The estimate represents the Always-Takers...*: Always-Takers experience no change in their treatment status ($D_i(1) = D_i(0) = 1$); the instrument has zero variance among them, so their causal effect cannot be identified.
3. *2SLS is invalid whenever compliance is less than 100%...*: 2SLS was invented precisely to solve imperfect compliance! If compliance were 100%, simple difference-in-means would suffice.

*الشرح باللغة العربية:*
في تقييم السياسات العامة الواقعية، نادرًا ما يكون الامتثال كاملاً. تثبت مبرهنة الأثر الموضعي (LATE) أن مقدر 2SLS لا يقيس أثر التدريب لجميع العاطلين (ATE)، بل يقيسه *حصرًا* لفئة **الممتثلين (Compliers)**: وهم العمال الذين لم يكونوا ليتدربوا لولا استلامهم للقسيمة، والذين حفزتهم القسيمة فعليًا على الالتحاق. أما فئتا "المتلقين دائمًا" و"الرافضين دائمًا" فلا تتغير حالتهم بفعل القسيمة، وبالتالي تعجز الأداة عن رصد أثر التدريب لديهم. وتضمن فرضية الرتابة (Monotonicity) عدم وجود فئة "المتحدين" الذين يتصرفون بعناد عكسي فيتدربون إذا حُرموا من القسيمة ويرفضون التدريب إذا مُنحوها!
