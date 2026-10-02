---
id: "t1-22"
version: "1.0.0"
title: "Partial Derivatives & Axis-Aligned Slices"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["t1-18"]
i18n:
  ar: "المشتقات الجزئية وشرائح المحاور المعيارية"
---

# Partial Derivatives & Axis-Aligned Slices

## Beat 1: Tactile Intuition

Imagine standing on a rugged, windswept mountainside. If another hiker pulls up beside you and asks: *"What is the slope of the mountain right where you are standing?"*, you cannot give them a single number! Why? Because if you take a step North, you might scramble up an agonizingly steep rocky ledge. If you take a step East, you might stroll comfortably along a flat horizontal ridge. If you take a step South, you might slide down a steep scree slope into a canyon. **Slope in multivariable space is not a single number; it depends entirely on the compass direction of your step.**

How do mathematicians tame this infinite directional freedom? By breaking the problem down into the simplest possible inquiries: **Partial Derivatives**. Instead of wandering in arbitrary directions, we ask the two cleanest, most fundamental questions possible:
1. What is the slope if you freeze your $y$-coordinate into solid concrete and take a step exclusively along the East-West $X$-axis ($\frac{\partial f}{\partial x}$)?
2. What is the slope if you freeze your $x$-coordinate completely and take a step exclusively along the North-South $Y$-axis ($\frac{\partial f}{\partial y}$)?

Geometrically, computing a partial derivative like $\frac{\partial f}{\partial x}$ is equivalent to taking a giant vertical sheet of laser light and slicing straight through the 3D mountain landscape parallel to the $X$-axis. The intersection of that razor-sharp laser sheet with the rolling 3D surface is a simple, familiar 1D curve! The partial derivative is nothing more than the ordinary single-variable tangent slope of that 1D slice.

Operationally, this leads to the golden rule of multivariable calculus: **freeze the bystanders**. When computing $\frac{\partial f}{\partial x}$, you treat every other variable—$y$, $z$, and whatever else exists—as inert, unmoving numerical constants, exactly like $5$, $42$, or $\pi$. If your equation contains $7x^2 y^3$, you ignore the $y^3$ as a passive bystander and differentiate $7x^2$ normally, yielding $(14x) \cdot y^3 = 14xy^3$.

In machine learning and neural network training, this principle is the core of parameter tuning. When a neural network has millions of weights, computing partial derivatives allows us to isolate every single weight parameter independently: *"If we hold every single neuron in the network completely frozen, and adjust this one weight by $+0.001$, what happens to the overall prediction error?"*

---

تخيل أنك تقف على سفح جبل صخري وعر تعصف به الرياح. إذا اقترب منك متسلق آخر وسألك: *"ما هو ميل الجبل عند النقطة التي تقف عليها قدمك تماماً؟"*، فلن تتمكن من إجابته برقم واحد مطلقاً! لماذا؟ لأنك إذا خطوت خطوة واحدة نحو الشمال، فقد تصعد حافة صخرية بالغة الانحدار تشق عليك؛ وإذا خطوت نحو الشرق، فقد تسير على حافة أفقية مريحة ومنبسطة؛ وإذا خطوت نحو الجنوب، فقد تهوي متدحرجاً في منحدر حصوي حاد. **الميل في الفضاء متعدد الأبعاد ليس رقماً مفرداً؛ بل يعتمد كلياً على اتجاه البوصلة الذي تختاره لخطوتك.**

كيف يروض علماء الرياضيات هذا الفيض اللانهائي من الاتجاهات؟ عبر تفكيك المعضلة إلى أبسط استفسارين ممكنين: **المشتقات الجزئية** (Partial Derivatives). فبدلاً من التخبط في اتجاهات عشوائية، نطرح سؤالين منهجيين في غاية النقاء:
1. ما هو الميل إذا قمت بتجميد إحداثي $y$ كلياً وكأنه كتلة من الخرسانة الصلبة، وخطوت حصرياً على طول محور الشرق والغرب $X$ (المشتقة $\frac{\partial f}{\partial x}$)؟
2. ما هو الميل إذا قمت بتجميد إحداثي $x$ تماماً دون أي حراك، وخطوت حصرياً على طول محور الشمال والجنوب $Y$ (المشتقة $\frac{\partial f}{\partial y}$)؟

هندسياً، يعادل حساب المشتقة الجزئية $\frac{\partial f}{\partial x}$ استخدام لوح ليزري رأسي عملاق لشطر تضاريس الجبل ثلاثي الأبعاد بشريحة رأسية موازية لمحور $X$. تقاطع هذه الشريحة المستوية الحادة مع سطح الجبل المتعرج ينتج منحنى بسيطاً أحادي البعد مألوفاً للغاية! والمشتقة الجزئية ليست سوى ميل المماس المعتاد لذلك المنحنى المقطوع في تلك الشريحة.

عملياتياً وحسابياً، يقودنا هذا إلى القاعدة الذهبية للتفاضل متعدد المتغيرات: **جمّد المتفرجين**. فعندما تحسب المشتقة الجزئية بالنسبة لـ $x$، عامل كافة المتغيرات الأخرى—سواء كانت $y$ أو $z$ أو غيرها—كأرقام جامدة خاملة لا حراك فيها، تماماً مثل الرقم $5$ أو $42$ أو $\pi$. فإذا كان التعبير الرياضي يحتوي على $7x^2 y^3$، فإنك تعامل $y^3$ كمعامل ضرب ثابت خامل وتشتق $7x^2$ بطريقة عادية تماماً، لتكون النتيجة $(14x) \cdot y^3 = 14xy^3$.

وفي تدريب الشبكات العصبية والذكاء الاصطناعي، يمثل هذا المبدأ جوهر ضبط المعاملات. فعندما يحتوي النموذج على ملايين الأوزان، تمكننا المشتقات الجزئية من عزل كل وزن على حدة وفحصه مجهرياً: *"لو قمنا بتجميد كل خلية عصبية في الشبكة بأسرها، وحركنا هذا الوزن المفرد بمقدار $+0.001$، فكيف ستستجيب دالة الخطأ الكلية؟"*

:::simulation-widget{engine="canvas2d" component="PartialTangentPlaneCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
\frac{\partial f}{\partial x_i}(\mathbf{x}) \coloneqq \lim_{h \to 0} \frac{f(\mathbf{x} + h \mathbf{e}_i) - f(\mathbf{x})}{h} = \left. \frac{d}{dh} f(\mathbf{x} + h \mathbf{e}_i) \right|_{h=0}
$$
$$
\nabla f(\mathbf{x}) = \begin{bmatrix} \frac{\partial f}{\partial x_1}(\mathbf{x}) \\ \vdots \\ \frac{\partial f}{\partial x_D}(\mathbf{x}) \end{bmatrix} \in \mathbb{R}^D
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^D$ | Base operating coordinate vector in domain space | The exact multi-dimensional state where sensitivity is probed |
| $\mathbf{e}_i$ | $\mathbb{R}^D$ | $i$-th canonical unit basis vector $[0,\dots,1,\dots,0]^T$ | Enforces displacement strictly along coordinate axis $i$ |
| $h$ | $\mathbb{R} \setminus \{0\}$ | Infinitesimal probe step size | Testing displacement along the chosen single coordinate axis |
| $\frac{\partial f}{\partial x_i}$ | $\mathbb{R}$ (Scalar) | Slope of the 1D planar slice parallel to axis $i$ | Quantifies isolated marginal sensitivity to input variable $x_i$ |
| $\partial$ (Del / Jacobi) | Symbol | Curved d notation distinguishing partials from total derivatives | Signals to the reader that all other $D-1$ variables are held strictly constant |

#### Intuitive Rationale for the Notation $\partial$
Why do mathematicians write $\frac{\partial f}{\partial x}$ with a curved $\partial$ instead of an ordinary straight $\frac{df}{dx}$? 
The straight $d$ denotes a *total derivative*: if moving $x$ also naturally drags $y$ along with it (for example, if $y = x^2$), the total derivative accounts for both direct and indirect changes. The curved $\partial$ is an explicit warning sign: it means *"Hold everything else rigidly still! Do not let any other variable budge even an angstrom while we isolate this single coordinate."*

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $\mathbf{x}$ | $\mathbb{R}^D$ | متجه إحداثيات الحالة في فضاء المدخلات | الموقع المكاني متعدد الأبعاد الذي يُفحص عنده معدل التغير |
| $\mathbf{e}_i$ | $\mathbb{R}^D$ | متجه الوحدة المعياري $i$ $[0,\dots,1,\dots,0]^T$ | يفرض قصر الحركة بدقة على طول المحور الإحداثي $i$ دون غيره |
| $h$ | $\mathbb{R} \setminus \{0\}$ | خطوة الفحص متناهية الصغر | مسافة الاختبار اللحظية على طول المحور المختار |
| $\frac{\partial f}{\partial x_i}$ | $\mathbb{R}$ (قيمة قياسية) | ميل الشريحة المستوية الموازية للمحور $i$ | يقيس الحساسية الهامشية المعزولة للمتغير $x_i$ بمفرده |
| $\partial$ (رمز ياكوبي المائل) | رمز | حرف d المنحني لتمييز التفاضل الجزئي | يُنبه القارئ إلى أن كافة المتغيرات الأخرى البالغ عددها $D-1$ مجمدة كلياً |

#### التفسير المنطقي لاستخدام الرمز $\partial$
لماذا يصر علماء الرياضيات على كتابة $\frac{\partial f}{\partial x}$ برمز منحني $\partial$ بدلاً من حرف $d$ المستقيم المعتاد $\frac{df}{dx}$؟
يدل الحرف المستقيم $d$ على *المشتقة الكلية*: فإذا كان تحريك المتغير $x$ يجر وراءه المتغير $y$ بالتبعية (مثلاً إذا كان $y = x^2$)، فإن المشتقة الكلية تحسب التغير المباشر وغير المباشر معاً. أما الرمز المنحني $\partial$ فهو علامة تحذير صريحة تعني: *"جمّد كل شيء آخر في مكانه! لا تسمح لأي متغير آخر بالتحرك ولو قيد أنملة بينما نقوم بعزل هذا المتغير المفرد واختباره."*

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-t1-22"}
---
timeout_ms: 3000
test_cases:
  - input: "list(np.round(numerical_gradient_vector(lambda x: x[0]**2 + 3*x[1]**2, np.array([2.0, 1.0])), 2))"
    expected: "[4.0, 6.0]"
  - input: "list(np.round(numerical_gradient_vector(lambda x: 5*x[0] - 2*x[1], np.array([0.0, 0.0])), 2))"
    expected: "[5.0, -2.0]"
---
```python
from typing import Callable
import numpy as np

def numerical_gradient_vector(f: Callable[[np.ndarray], float], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
    """
    Compute numerical partial derivatives vector using central difference perturbations.
    Constructs axis perturbation matrix E = eps * I without Python coordinate loops.
    
    Parameters
    ----------
    f : Callable
        Function mapping 1D numpy array of shape (D,) to a scalar.
    x0 : np.ndarray
        Evaluation coordinate vector of shape (D,).
    eps : float
        Central difference perturbation step size (default 1e-5).
        
    Returns
    -------
    np.ndarray
        Gradient vector containing all D partial derivatives, shape (D,).
    """
    d = len(x0)
    
    # Step 1: Construct perturbation matrix E = eps * I_d
    E = np.eye(d) * eps
    
    # Step 2: Perturb along positive and negative directions for each axis
    x_plus = x0 + E
    x_minus = x0 - E
    
    # Step 3: Evaluate function responses along each axis displacement
    f_plus = np.array([f(x_plus[i]) for i in range(d)])
    f_minus = np.array([f(x_minus[i]) for i in range(d)])
    
    # Step 4: Compute central difference quotients: (f+ - f-) / (2*eps)
    grad = (f_plus - f_minus) / (2.0 * eps)
    
    return grad
```
:::

## Beat 4: Reality Transfer Challenge

### Conceptual Diagnostic

**English:** A machine learning practitioner trains a loss function $\mathcal{L}(w_1, w_2)$ and finds that at the current point, $\frac{\partial \mathcal{L}}{\partial w_1} = 25.0$ while $\frac{\partial \mathcal{L}}{\partial w_2} = 0.0$. If they apply an optimization update step strictly modifying $w_2$, what is the predicted first-order change in loss?

**العربية:** أثناء تدريب نموذج تعلم آلة بدالة خسارة $\mathcal{L}(w_1, w_2)$، وجد ممارس أن المشتقات الجزئية عند النقطة الحالية هي $\frac{\partial \mathcal{L}}{\partial w_1} = 25.0$ بينما $\frac{\partial \mathcal{L}}{\partial w_2} = 0.0$. إذا طبق خطوة تحديث استمثالية تقتصر حصرياً على تعديل الوزن $w_2$، فما هو التغير المتوقع في دالة الخسارة من الرتبة الأولى؟

* [x] The loss does not change at all ($d\mathcal{L} \approx 0$), because the slope along the $w_2$ axis slice is completely flat.
  * لا تتغير دالة الخسارة على الإطلاق ($d\mathcal{L} \approx 0$)، لأن ميل شريحة التضاريس الموازية لمحور $w_2$ منبسط وأفقي تماماً.
  > **Why this is correct:** The first-order differential is $d\mathcal{L} = \frac{\partial \mathcal{L}}{\partial w_1}\Delta w_1 + \frac{\partial \mathcal{L}}{\partial w_2}\Delta w_2$. Because $\Delta w_1 = 0$ (frozen) and $\frac{\partial \mathcal{L}}{\partial w_2} = 0.0$, the product is strictly zero ($0 \times \Delta w_2 = 0$). Moving strictly along $w_2$ traverses an instantaneous level contour curve.
  > **لماذا هذا الخيار صحيح:** تفاضل الرتبة الأولى هو $d\mathcal{L} = \frac{\partial \mathcal{L}}{\partial w_1}\Delta w_1 + \frac{\partial \mathcal{L}}{\partial w_2}\Delta w_2$. وبما أن الوزن الأول مجمد $\Delta w_1 = 0$ وميل الوزن الثاني منعدم $\frac{\partial \mathcal{L}}{\partial w_2} = 0.0$، فإن الناتج هو صفر تام. التحرك على طول $w_2$ يسير لحظياً على خط كنتور مستوٍ.

* [ ] The loss increases by $25.0$ per unit step.
  * تتزايد دالة الخسارة بمقدار $25.0$ لكل وحدة إزاحة.
  > **Why this is incorrect:** The slope of $25.0$ belongs exclusively to the $w_1$ axis slice; because $w_1$ was not modified ($\Delta w_1 = 0$), this sensitivity is never activated.
  > **لماذا هذا الخيار خاطئ:** يخص الميل $25.0$ شريحة المحور $w_1$ حصراً؛ وبما أن $w_1$ لم يُعدل ($\Delta w_1 = 0$)، فإن هذه الحساسية تظل خاملة ولا تؤثر على الناتج.

* [ ] The loss drops to negative infinity.
  * تهوي دالة الخسارة فجأة نحو سالب اللانهاية.
  > **Why this is incorrect:** A zero derivative indicates instantaneous local flatness, not an infinite precipice.
  > **لماذا هذا الخيار خاطئ:** تدل المشتقة الصفرية على انبساط محلي لحظي، ولا تعني وجود هاوية لا قرار لها.

* [ ] The loss increases quadratically due to interaction terms.
  * تتزايد دالة الخسارة بمعدل تربيعي حاد نتيجة لحدود التفاعل المشتركة.
  > **Why this is incorrect:** The first-order predicted change is identically zero. While higher-order terms ($\frac{1}{2}\frac{\partial^2 \mathcal{L}}{\partial w_2^2}\Delta w_2^2$) may exist, the first-order linear prediction itself is strictly zero.
  > **لماذا هذا الخيار خاطئ:** التغير المتوقع من الرتبة الأولى هو صفر بالتمام والكمال. ورغم احتمال وجود حدود تربيعية من الرتب العليا، إلا أن التقدير الخطي المباشر يظل صفراً.
