---
id: "singular-value-decomposition"
version: "1.0.0"
title: "The Chain Rule as Compositional Scaling & Flow of Sensitivities"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["symmetric-matrices-spectral", "gram-schmidt-orthogonalization"]
i18n:
  ar: "قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية"
---

# The Chain Rule as Compositional Scaling & Flow of Sensitivities

## Beat 1: Tactile Intuition

Imagine three interlocking brass gears in a precision mechanical clockwork: Gear $A$ drives Gear $B$, which in turn drives Gear $C$. 
- When you turn Gear $A$ by 1 revolution, Gear $B$ completes 3 revolutions (the sensitivity ratio $\frac{dB}{dA} = 3$).
- When Gear $B$ turns by 1 revolution, Gear $C$ completes 5 revolutions (the sensitivity ratio $\frac{dC}{dB} = 5$).

Now ask yourself: if you turn Gear $A$ by 1 revolution, how many revolutions does Gear $C$ execute? Without hesitation, you multiply the ratios: $3 \times 5 = 15$ revolutions! The end-to-end sensitivity is simply the product of the intermediate gear ratios: $\frac{dC}{dA} = \frac{dC}{dB} \cdot \frac{dB}{dA}$.

The **Chain Rule** is nothing more than this gear-ratio multiplication applied to mathematical functions chained in series. In deep learning architectures, every neural network is a deep compositional pipeline of functions: inputs feed into hidden layers, which feed into activations, which feed into downstream loss functions. The chain rule governs how credit and blame (sensitivities) propagate backward through the computational graph.

تخيل ثلاثة تروس نحاسية متعشقة بدقة داخل ساعة ميكانيكية: الترس $A$ يدير الترس $B$، والذي بدوره يدير الترس $C$.
- عندما تدير الترس $A$ دورة واحدة كاملة، يدور الترس $B$ بمقدار 3 دورات (نسبة الحساسية $\frac{dB}{dA} = 3$).
- وعندما يدور الترس $B$ دورة واحدة كاملة، يدور الترس $C$ بمقدار 5 دورات (نسبة الحساسية $\frac{dC}{dB} = 5$).

والآن، إذا أدرت الترس $A$ دورة واحدة، فكم دورة سيدور الترس $C$؟ دون أدنى تردد، ستقوم بضرب نسب التروس معاً: $3 \times 5 = 15$ دورة! الحساسية الإجمالية للمنظومة هي حاصل ضرب نسب الحساسيات الوسيطة: $\frac{dC}{dA} = \frac{dC}{dB} \cdot \frac{dB}{dA}$.

قاعدة السلسلة (Chain Rule) ليست سوى هذا المبدأ الميكانيكي البسيط مطبقاً على الدوال الرياضية المركبة المتتالية. في الشبكات العصبية العميقة، يمثل النموذج بأكمله سلسلة طويلة من الدوال المتراكبة: تتدفق المدخلات إلى الطبقات الخطية، ثم إلى دوال التنشيط غير الخطية، وصولاً إلى دالة الخسارة النهائية. تضبط قاعدة السلسلة كيفية تدفق إشارات التدرج إلى الوراء عبر الرسم البياني الحسابي لتحديث الأوزان بدقة متناهية.

:::simulation-widget{engine="canvas2d" component="CurvatureOsculatingCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor

$$
(f \circ g)'(x) = f'(g(x)) \cdot g'(x) \iff \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}
$$
$$
\frac{dz}{dx_1} = \prod_{i=1}^{k-1} \frac{dx_{i+1}}{dx_i} = \frac{dx_k}{dx_{k-1}} \frac{dx_{k-1}}{dx_{k-2}} \cdots \frac{dx_2}{dx_1}
$$

### Demystifying the Equation

| Symbol | Dimensional Type | Geometric Meaning | Operational Role |
| :--- | :--- | :--- | :--- |
| $x$ | $\mathbb{R}$ | Primary input coordinate | Initial dial adjusted by the experimenter |
| $u = g(x)$ | $\mathbb{R}$ | Intermediate hidden state | Output of inner function, input to outer function |
| $y = f(u)$ | $\mathbb{R}$ | Final scalar output | Target response quantity |
| $g'(x)$ | $\mathbb{R}$ | Local stretching factor of the inner map | First gear ratio in the compositional sequence |
| $f'(g(x))$ | $\mathbb{R}$ | Local stretching factor of the outer map at state $u$ | Second gear ratio evaluated at the active state |
| $\frac{dy}{dx}$ | $\mathbb{R}$ | End-to-end composite sensitivity | Compounded multiplicative gradient |

A fatal beginner trap is writing $f'(x) \cdot g'(x)$. The outer function $f$ never sees the original input $x$; it only receives the transformed state $g(x)$. The outer derivative must always be evaluated at the intermediate state $u = g(x)$.

### تفكيك المعادلة

| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |
| :--- | :--- | :--- | :--- |
| $x$ | $\mathbb{R}$ | متغير المدخلات الأصلي | المقبض الأولي الذي يتحكم به النموذج |
| $u = g(x)$ | $\mathbb{R}$ | الحالة الوسيطة الكامنة | مخرج الدالة الداخلية ومدخل الدالة الخارجية |
| $y = f(u)$ | $\mathbb{R}$ | المخرج النهائي للدالة المركبة | كمية الاستجابة النهائية المستهدفة |
| $g'(x)$ | $\mathbb{R}$ | معامل التمدد المحلي للدالة الداخلية | نسبة الترس الأول في مسار التركيب |
| $f'(g(x))$ | $\mathbb{R}$ | معامل التمدد للدالة الخارجية عند الحالة $u$ | نسبة الترس الثاني مقاسة عند الحالة النشطة $g(x)$ |
| $\frac{dy}{dx}$ | $\mathbb{R}$ | الحساسية الإجمالية للمركب | حاصل ضرب التدرجات المتسلسلة |

من الأخطاء الكلاسيكية الشائعة كتابة $f'(x) \cdot g'(x)$. الدالة الخارجية $f$ لا ترى المدخل الأصلي $x$ مطلقاً؛ بل تستقبل المخرج الوسيط $g(x)$. لذلك يجب دوماً تقييم مشتقة الدالة الخارجية عند النقطة الوسيطة $u = g(x)$.

## Beat 3: Interactive Python Scratchpad

:::python-challenge{id="py-singular-value-decomposition"}
---
timeout_ms: 3000
test_cases:
  - input: "y, dy = composite_chain_rule(np.array([0.0]), 1.0, 1.0, 0.0, 0.0); (float(y[0]), float(dy[0]))"
    expected: "(0.5, 0.25)"
  - input: "y, dy = composite_chain_rule(np.array([0.0]), 2.0, 1.0, 0.0, 0.0); float(y[0])"
    expected: "0.5"
---
```python
import numpy as np

def composite_chain_rule(
    x: np.ndarray,
    w: float,
    u: float,
    b1: float,
    b2: float
) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute forward activation and backward chain rule sensitivity for a 2-layer pipeline:
        z1 = u * x + b1
        a1 = tanh(z1)
        z2 = w * a1 + b2
        y  = sigmoid(z2)
        
    Parameters
    ----------
    x : np.ndarray
        Input batch array of shape (N,).
    w, u, b1, b2 : float
        Scalar weights and bias parameters.
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        y : Output activation array, shape (N,).
        dy_dx : Analytical derivative dy/dx across all samples, shape (N,).
    """
    # Step 1: Forward pass through layer 1 linear transformation
    z1 = u * x + b1
    
    # Step 2: Forward pass through hyperbolic tangent activation
    a1 = np.tanh(z1)
    
    # Step 3: Forward pass through layer 2 linear transformation
    z2 = w * a1 + b2
    
    # Step 4: Forward pass through output sigmoid activation
    y = 1.0 / (1.0 + np.exp(-z2))
    
    # Step 5: Backward pass: compute local sensitivities via chain rule
    # d(sigmoid)/dz2 = y * (1 - y)
    dy_dz2 = y * (1.0 - y)
    
    # dz2/da1 = w
    dz2_da1 = w
    
    # d(tanh)/dz1 = 1 - a1^2
    da1_dz1 = 1.0 - a1 ** 2
    
    # dz1/dx = u
    dz1_dx = u
    
    # Multiply all gear ratios together
    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx
    
    return y, dy_dx
```
:::

## Beat 4: Reality Transfer Challenge

A deep neural network contains 40 stacked layers where each activation function has a maximum local derivative of $|f'(z)| \le 0.25$ (such as the standard sigmoid). When training via gradient descent, the early layers fail to learn entirely. Based on the chain rule, what is the mathematical root cause of this failure?

* [ ] Exploding gradients caused by compounding large integer ratios across layers.
* [x] Vanishing gradients, because multiplying 40 consecutive factors bounded by $0.25$ scales as $(0.25)^{40} \approx 8.3 \times 10^{-25}$, decaying the backpropagated signal to machine epsilon.
* [ ] Matrix singularities caused by non-invertible weight matrices.
* [ ] Numerical overflow in the loss function's numerator.
