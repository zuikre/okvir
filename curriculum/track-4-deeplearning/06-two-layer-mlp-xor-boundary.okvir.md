---
id: "two-layer-mlp-xor-boundary"
version: "1.0.0"
title: "Two-Layer Multi-Layer Perceptron & The Non-Linear XOR Boundary"
track: "deeplearning"
module: "mod-36"
estimated_minutes: 15
prerequisites: ["perceptron-activation", "numerically-stable-softmax-cross-entropy"]
i18n:
  ar: "الشبكة متعددة الطبقات وحدود القرار غير الخطية لمعضلة XOR"
---

# Two-Layer Multi-Layer Perceptron & The Non-Linear XOR Boundary

## Beat 1: Tactile Intuition

In 1969, AI pioneers Marvin Minsky and Seymour Papert published a landmark book titled *Perceptrons*, proving that a single linear neuron could never learn the simple XOR (Exclusive OR) logic function. This revelation triggered the first "AI Winter," convincing the scientific community that neural networks were an evolutionary dead end.

Why does XOR defeat a single neuron?
Consider the four corners of a 2D square:
* $(0, 0) \to 0$ (Class A)
* $(0, 1) \to 1$ (Class B)
* $(1, 0) \to 1$ (Class B)
* $(1, 1) \to 0$ (Class A)

Plot these points on a sheet of paper. Try to draw a single straight ruler line that separates the two Class B points from the two Class A points. It is geometrically impossible! The classes cross diagonally. A single perceptron can only draw flat linear cuts.

The breakthrough comes when we add **a single hidden layer** of non-linear neurons, creating a Multi-Layer Perceptron (MLP). The hidden neurons act as a geometric folding machine:
1. Hidden Neuron 1 fires when at least one input is active ($x_1 + x_2 \ge 1$, acting like an OR gate).
2. Hidden Neuron 2 fires only when *both* inputs are active ($x_1 + x_2 \ge 2$, acting like an AND gate).
3. The output neuron computes the difference: $\text{OR} - 2 \times \text{AND}$!

By passing through the non-linear hidden layer, the 2D coordinate space is physically warped and folded. The previously tangled diagonal points land in a transformed space where a single straight linear cut easily separates them. This is the essence of deep learning: stacking layers to fold complex data manifolds until they become simple and linearly separable.

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

في عام 1969، نشر العالمان مارفن مينسكي وسيمور بابيرت كتاباً تاريخياً برهنا فيه رياضياً على عجز العصبون المنفرد عن حل بوابة "أو الاستبعادية" (XOR). تسببت هذه النتيجة في اندلاع ما عُرف بـ "شتاء الذكاء الاصطناعي الأول"؛ إذ ظن الباحثون أن الشبكات العصبية غير قادرة على حل أبسط المسائل المنطقية.

يكمن سبب هذا العجز في الهندسة المستوية: نقاط بوابة XOR تتقاطع قطرياً عبر المربع الإحداثي؛ فالنقطتان $(0,1)$ و $(1,0)$ تنتميان للفئة 1، بينما $(0,0)$ و $(1,1)$ تنتميان للفئة 0. يستحيل على أي مسطرة مستقيمة أن تفصل بين الفئتين بخط قاطع واحد.

جاء الحل الثوري بإضافة **طبقة خفية (Hidden Layer)** واحدة من العصبونات غير الخطية. تقوم الطبقة الخفية بطي وتشويه الفضاء الإحداثي: يتعرف العصبون الأول على حالة وجود أي مدخل نشط (بوابة OR)، بينما يرصد العصبون الثاني تفعيل كلا المدخلين معاً (بوابة AND). ثم يطرح عصبون المخرج الأخير ناتج البوابتين! يؤدي هذا التحويل الهندسي إلى فك تشابك البيانات المعقدة ونقلها إلى فضاء جديد تصبح فيه قابلة للفصل الخطي تماماً.

---

## Beat 2: Formal Mathematical Anchor

A 2-Layer Multi-Layer Perceptron (MLP) with $d_{\text{in}}$ inputs, $d_h$ hidden units, and scalar output maps $\mathbf{x} \in \mathbb{R}^{d_{\text{in}}}$ to $\hat{y} \in \mathbb{R}$ via:

$$
\mathbf{h} = \text{ReLU}(\mathbf{W}_1 \mathbf{x} + \mathbf{b}_1), \quad \hat{y} = \mathbf{w}_2^T \mathbf{h} + b_2
$$

The canonical hand-crafted weight configuration that analytically solves XOR:
$$
\mathbf{W}_1 = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}, \quad \mathbf{b}_1 = \begin{bmatrix} 0 \\ -1 \end{bmatrix}, \quad \mathbf{w}_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}, \quad b_2 = 0
$$

Verification across the XOR truth table:
* Input $(0, 0)$: $\mathbf{h} = \text{ReLU}([0, -1]^T) = [0, 0]^T \implies \hat{y} = 1(0) - 2(0) = 0$
* Input $(0, 1)$: $\mathbf{h} = \text{ReLU}([1, 0]^T) = [1, 0]^T \implies \hat{y} = 1(1) - 2(0) = 1$
* Input $(1, 0)$: $\mathbf{h} = \text{ReLU}([1, 0]^T) = [1, 0]^T \implies \hat{y} = 1(1) - 2(0) = 1$
* Input $(1, 1)$: $\mathbf{h} = \text{ReLU}([2, 1]^T) = [2, 1]^T \implies \hat{y} = 1(2) - 2(1) = 0$

Where:
* $\mathbf{W}_1 \in \mathbb{R}^{d_h \times d_{\text{in}}}$: First layer weight matrix projecting into the hidden representation space.
* $\mathbf{b}_1 \in \mathbb{R}^{d_h}$: Hidden layer bias vector shifting the activation thresholds.
* $\mathbf{h} \in \mathbb{R}^{d_h}$: Non-linear hidden representation vector.
* $\mathbf{w}_2 \in \mathbb{R}^{d_h}, b_2 \in \mathbb{R}$: Output layer linear weights and bias.

وفق مبرهنة التقريب الشامل (Universal Approximation Theorem)، تكفي طبقة خفية واحدة ذات سعة كافية ودوال تنشيط غير خطية لتقريب أي دالة رياضية مستمرة على مجالات مدمجة. تقوم مصفوفة الأوزان الأولى $\mathbf{W}_1$ بتدوير وتمديد الفضاء، بينما تقوم دالة ReLU بقص المناطق السالبة وطي الفضاء، مما يسمح للعصبون الأخير برسم حد قرار قاطع ودقيق.

---

## Beat 3: Interactive Python Scratchpad

Implement the forward pass of a 2-layer MLP `mlp_xor_forward(x, W1, b1, w2, b2)`. Use the analytical XOR weights as defaults so that the network evaluates the complete XOR truth table with 100% accuracy.

:::python-challenge{id="py-two-layer-mlp-xor-boundary"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[0,0],[0,1],[1,0],[1,1]]); preds = [mlp_xor_forward(x) for x in X]; print([int(round(p)) for p in preds])"
    expected: "[0, 1, 1, 0]"
  - input: "print(mlp_xor_forward(np.array([1.0, 0.0])))"
    expected: "1.0"
---
```python
import numpy as np

def mlp_xor_forward(x: np.ndarray, 
                     W1: np.ndarray | None = None, 
                     b1: np.ndarray | None = None, 
                     w2: np.ndarray | None = None, 
                     b2: float = 0.0) -> float:
    """
    Computes forward pass of a 2-layer MLP solving the XOR logic function.
    
    Parameters
    ----------
    x : np.ndarray of shape (2,)
    """
    if W1 is None:
        W1 = np.array([[1.0, 1.0], [1.0, 1.0]])
        b1 = np.array([0.0, -1.0])
        w2 = np.array([1.0, -2.0])
        b2 = 0.0

    # TODO: 1. Compute hidden pre-activations z1 = dot(W1, x) + b1
    # TODO: 2. Apply ReLU non-linearity: h = maximum(0.0, z1)
    # TODO: 3. Compute output z2 = dot(w2, h) + b2 and return float
    pass
```
:::

---

## Beat 4: Reality Transfer Challenge

### Transfer Question / سؤال نقل الأثر المعرفي

If all activation functions in a 1,000-layer MLP are replaced with purely linear identity functions ($\phi(z) = z$), can the network solve the XOR problem?

* [x] No, because the composition of any finite number of linear transformations is strictly linear ($\mathbf{W}_{1000} \dots \mathbf{W}_1 \mathbf{x} = \mathbf{W}_{\text{eff}} \mathbf{x}$); without non-linear activations, the network can only produce linear decision boundaries regardless of depth or width.
* [ ] Yes, provided the hidden layers have at least 1,000 neurons each.
* [ ] Yes, because backpropagation will convert the linear weights into non-linear functions during training.
* [ ] No, because linear networks cannot be trained using gradient descent.

> **Insight:** Depth without non-linearity is an illusion: a deep linear network possesses no more expressive power than a single-layer perceptron. Non-linear activations are what grant deep networks their universal approximation capability.
