---
id: "recurrent-neural-networks-bptt"
version: "1.0.0"
title: "Recurrent Neural Networks (RNNs) & Backpropagation Through Time (BPTT)"
track: "deeplearning"
module: "mod-40"
estimated_minutes: 15
prerequisites: ["two-layer-mlp-xor-boundary"]
i18n:
  ar: "الشبكات العصبية التكرارية (RNNs) والانحدار العكسي عبر الزمن"
---

# Recurrent Neural Networks (RNNs) & Backpropagation Through Time (BPTT)

## Beat 1: Tactile Intuition | الحدس الفيزيائي والبصري

Imagine reading a thrilling mystery novel. On page 200, you read the isolated sentence: *"He picked up the rusty dagger."* What does this sentence mean? If you had total amnesia and forgot everything you read on pages 1 through 199, you wouldn't know whether the character is an archaeologist excavating an ancient tomb or a murderer preparing to strike in the dark!

Standard feedforward neural networks suffer from precisely this kind of amnesia. They treat every input vector as an isolated, independent snapshot with zero past memory. Yet human thought, speech, music, and time-series data are inherently sequential: meaning is forged in the temporal connections between events.

A **Recurrent Neural Network (RNN)** solves this amnesia by maintaining an evolving internal memory: the **hidden state vector $\mathbf{h}_t$**. Think of the hidden state as the network's personal **mental diary**. At every time step $t$:
1. A new event or word $\mathbf{x}_t$ enters the network.
2. The network opens yesterday's diary entry $\mathbf{h}_{t-1}$.
3. It combines yesterday's memories with today's sensory input to synthesize a fresh diary entry: $\mathbf{h}_t = \tanh(\mathbf{x}_t \mathbf{W}_{xh} + \mathbf{h}_{t-1} \mathbf{W}_{hh} + \mathbf{b}_h)$.

To train an RNN using calculus, we do something remarkable: we **unroll the network across time**. A recurrence that loops onto itself for $T$ seconds becomes an equivalent $T$-layer feedforward network, where the identical weight matrices ($\mathbf{W}_{hh}, \mathbf{W}_{xh}$) are shared at every tick of the clock. This algorithm is called **Backpropagation Through Time (BPTT)**.

However, unrolling an RNN across 100 time steps reveals a fatal mathematical trap: backpropagating an error signal from step 100 back to step 1 requires multiplying by the recurrent matrix $\mathbf{W}_{hh}$ over and over again—a staggering 100 consecutive times! Just like repeatedly multiplying numbers by $0.8$ rapidly shrinks them to zero ($0.8^{50} \approx 10^{-5}$), the gradients of early words vanish into numerical silence, rendering vanilla RNNs incapable of remembering distant history.

> **Frontier Analogy:** Imagine whispering a secret through a line of 100 people (a game of telephone). Each person adds a tiny bit of mumbling and attenuation ($\mathbf{W}_{hh} \cdot \tanh'$). By person 20, the original message has dissolved into complete unintelligible silence; by person 50, it is gone forever.

### Jargon Decoder | قاموس تفكيك المصطلحات

| Term / المصطلح | Plain English Translation & Metaphor | الشرح المبسط بالعربية والتشبيه اليومي |
| :--- | :--- | :--- |
| **Hidden State ($h_t$)** (الحالة الخفية / الذاكرة المتسلسلة) | The traveler's pocket diary: a dense vector summarizing everything learned from the past sequence, updated at each step. | مفكرة المسافر: متجه ملخص يحمل في طياته كافة الأحداث الماضية، ويتم تحديثه عند كل محطة زمنية. |
| **Recurrent Weight ($W_{hh}$)** (مصفوفة الانتقال التكراري) | The immutable memory rule: the identical weight matrix applied at every single point in time to blend old memory with new input. | قاعدة الذاكرة الثابتة: مصفوفة أوزان موحدة تطبق عبر كافة اللحظات الزمنية لدمج الماضي مع الحاضر. |
| **Temporal Unrolling** (الفرد الزمني للمسار) | Unfolding an accordion: drawing the looped recurrent cell as a deep chain of identical feedforward layers across time $T$. | فرد الأكورديون: رسم العصبون الدائري كسلسلة ممتدة من الطبقات المتعاقبة بعدد الخطوات الزمنية. |
| **Backpropagation Through Time (BPTT)** (التفاضل العكسي عبر الزمن) | Tracing blame through history: replaying the temporal chain backwards to compute how early words influenced late errors. | تتبع اللوم عبر التاريخ: الرجوع بالزمن للخلف لمعرفة كيف أثرت الكلمات الأولى في أخطاء التوقع المتأخرة. |
| **Exploding / Vanishing Gradients** (تلاشي وانفجار التدرجات) | The compound interest trap: multiplying by $W_{hh}$ repeatedly causes gradients to either compound to infinity or decay to zero. | فخ الفائدة المركبة: ضرب التدرجات المتكرر في مصفوفة الانتقال يرفعها أُسياً نحو اللانهاية أو يخمدها للصفر. |

### Visual Architecture Flow | مخطط تدفق البيانات والمعمارية

```text
RECURRENT NEURAL NETWORK: TEMPORAL UNROLLING
=============================================================================
Time t=1                   Time t=2                   Time t=T
[Input x_1]                [Input x_2]                [Input x_T]
     |                          |                          |
     v (W_xh)                   v (W_xh)                   v (W_xh)
[Hidden h_1] ==(W_hh)==>   [Hidden h_2] ==(W_hh)==>   [Hidden h_T]
     |                          |                          |
     v (W_hy)                   v (W_hy)                   v (W_hy)
[Output \hat{y}_1]         [Output \hat{y}_2]         [Output \hat{y}_T]
=============================================================================
BACKPROPAGATION THROUGH TIME (BPTT) GRADIENT MULTIPLICATION:
dL/dh_1 = (dL/dh_T) * (dh_T/dh_{T-1}) * ... * (dh_2/dh_1)
        = (dL/dh_T) * \prod_{k=2}^T ( W_hh^T * \text{diag}(1 - h_k^2) )
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      (Product of T matrices: Leads to 0 or \infty!)
```

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تخيل أنك تقرأ رواية بوليسية مشوقة، ووصلت في الصفحة المائتين إلى جملة: *"التقط الخنجر الصدئ"*. ماذا تعني هذه العبارة؟ إذا كنت تعاني من فقدان ذاكرة لحظي ونسيت كل ما ورد في الصفحات السابقة، فلن تستطيع تحديد ما إذا كان الشخص عالم آثار ينقب في مقبرة قديمة أم مجرماً يستعد للغدر بضحيته!

تعاني الشبكات العصبية الكثيفة التقليدية من هذا الفقدان التام للذاكرة؛ إذ تتعامل مع كل مدخل وكأنه معزول في فراغ مطلق. غير أن التفكير البشري، واللغة، والنصوص، وسلاسل البيانات المالية تعتمد بالكامل على السياق الزمني المتتابع.

تعالج **الشبكات العصبية التكرارية (RNNs)** هذه المشكلة عبر الاحتفاظ بذاكرة داخلية ديناميكية تُعرف بـ **الحالة الخفية (Hidden State $\mathbf{h}_t$)**. يمكن تشبيه الحالة الخفية بـ **دفتر مذكرات عقلي** يُحدث باستمرار:
1. يستقبل النموذج الكلمة أو الإشارة الجديدة $\mathbf{x}_t$.
2. يفتح دفتر مذكرات الأمس $\mathbf{h}_{t-1}$.
3. يدمج مذكرات الماضي مع معطيات الحاضر عبر دالة غير خطية لتدوين صفحة جديدة $\mathbf{h}_t$.

ولتدريب هذه الشبكات، نلجأ إلى تقنية **بسط السلسلة عبر الزمن (Unrolling)**؛ حيث يتحول التكرار الزمني على مدار $T$ لحظة إلى شبكة أمامية متتالية ذات $T$ طبقة، تشترك جميعها في نفس مصفوفات الأوزان ($\mathbf{W}_{hh}, \mathbf{W}_{xh}$). تُشتق التدرجات العكسية عبر خوارزمية **الانحدار العكسي عبر الزمن (BPTT)**.

إلا أن هذه البنية تحمل في طياتها معضلة رياضية خانقة: فحساب تدرج الخطأ للكلمات الأولى في الجملة يقتضي ضرب مصفوفة الأوزان التكرارية $\mathbf{W}_{hh}$ في نفسها عشرات المرات. وكما أن ضرب أي رقم أقل من الواحد في نفسه خمسين مرة يجعله يقترب سريعاً من الصفر ($0.9^{50} \approx 0.005$)، فإن تدرجات التعلم تضمحل وتتلاشى تماماً، مما يجعل شبكات RNN الكلاسيكية عاجزة عن تذكر أي سياق يبتعد أكثر من بضع كلمات.

---

## Beat 2: Formal Mathematical Anchor | الإرساء الرياضي الدقيق

The forward dynamics of a vanilla Recurrent Neural Network at time step $t \in \{1, \dots, T\}$ are defined as:

$$
\mathbf{a}_t = \mathbf{x}_t \mathbf{W}_{xh} + \mathbf{h}_{t-1} \mathbf{W}_{hh} + \mathbf{b}_h
$$

$$
\mathbf{h}_t = \tanh(\mathbf{a}_t)
$$

$$
\hat{\mathbf{y}}_t = \text{softmax}(\mathbf{h}_t \mathbf{W}_{hy} + \mathbf{b}_y)
$$

Let the total loss across the sequence be $\mathcal{L} = \sum_{t=1}^T \mathcal{L}_t$. To compute the gradient of loss at time step $T$ with respect to the initial hidden state $\mathbf{h}_0$, we apply the chain rule backward through time:

$$
\frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_0} = \frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_T} \frac{\partial \mathbf{h}_T}{\partial \mathbf{h}_0} = \frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_T} \prod_{t=1}^T \frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}}
$$

The single-step temporal Jacobian matrix $\frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}}$ evaluates to:

$$
\frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}} = \text{diag}\left(1 - \mathbf{h}_t^2\right) \mathbf{W}_{hh}^T
$$

Substituting this yields the complete temporal gradient product:

$$
\frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_0} = \frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_T} \prod_{t=1}^T \left[ \text{diag}\left(1 - \tanh^2(\mathbf{a}_t)\right) \mathbf{W}_{hh}^T \right]
$$

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{x}_t \in \mathbb{R}^{B \times d_{\text{in}}}$: Input token embedding at step $t$.
* $\mathbf{h}_t \in \mathbb{R}^{B \times d_h}$: Recurrent hidden state vector at step $t$.
* $\mathbf{W}_{xh} \in \mathbb{R}^{d_{\text{in}} \times d_h}$, $\mathbf{W}_{hh} \in \mathbb{R}^{d_h \times d_h}$: Input-to-hidden and hidden-to-hidden weight matrices.
* $\mathbf{b}_h \in \mathbb{R}^{d_h}$: Hidden bias vector.
* $\mathbf{W}_{hy} \in \mathbb{R}^{d_h \times d_{\text{out}}}$: Hidden-to-output classification projection matrix.
* **The Vanishing Condition:** Note that the derivative of hyperbolic tangent satisfies $0 < 1 - \tanh^2(z) \le 1$. If the largest singular value (spectral radius) of $\mathbf{W}_{hh}$ is $\sigma_{\max} < 1$, the norm of the gradient shrinks exponentially as $\mathcal{O}(\sigma_{\max}^T) \to 0$.
* **The Exploding Condition:** Conversely, if $\sigma_{\max} > 1$, the gradient product explodes exponentially towards $\pm \infty$, triggering numerical overflow (`NaN` crashes) unless gradient clipping is enforced.

تكشف هذه المعادلة التحليلية سبب عجز شبكات RNN الكلاسيكية عن التعلم طويل المدى: تتابع ضرب مصفوفة الذاكرة التكرارية $\mathbf{W}_{hh}$ بمشتقة دالة $\tanh$ عبر عشرات الخطوات الزمنية يؤدي حتماً إلى اضمحلال التدرج نحو الصفر إذا كانت القيم الذاتية أقل من واحد، أو انفجاره نحو اللانهاية إذا تجاوزت الواحد.

---

## Beat 3: Python Challenge | التحدي البرمجي التفاعلي

Implement `rnn_forward_sequence(X, h_0, W_xh, W_hh, b_h)` to sequentially unroll a vanilla RNN over sequence length $T$. At each step $t$, compute:
$$\mathbf{h}_t = \tanh(\mathbf{X}[t] \mathbf{W}_{xh} + \mathbf{h}_{t-1} \mathbf{W}_{hh} + \mathbf{b}_h)$$
Return the stacked history of all hidden states $\mathbf{H} \in \mathbb{R}^{T \times d_h}$ and the final state $\mathbf{h}_T$.

:::python-challenge{id="py-recurrent-neural-networks-bptt"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.zeros((3, 2)); h0 = np.zeros(2); W_xh = np.zeros((2, 2)); W_hh = np.zeros((2, 2)); b_h = np.zeros(2); H, h_fin = rnn_forward_sequence(X, h0, W_xh, W_hh, b_h); str(round(float(np.sum(H)), 2))"
    expected: "0.0"
  - input: "X = np.ones((1, 1)); h0 = np.zeros(1); W_xh = np.array([[0.0]]); W_hh = np.array([[0.0]]); b_h = np.array([0.0]); _, h_fin = rnn_forward_sequence(X, h0, W_xh, W_hh, b_h); str(round(float(h_fin[0]), 2))"
    expected: "0.0"
---
```python
import numpy as np

def rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, 
                         W_xh: np.ndarray, W_hh: np.ndarray, 
                         b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Unroll vanilla RNN across sequence length T: 
    h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).
    
    Parameters
    ----------
    X : np.ndarray of shape (T, d_in)
        Input sequence over T time steps.
    h_0 : np.ndarray of shape (d_h,)
        Initial hidden state vector.
    W_xh : np.ndarray of shape (d_in, d_h)
    W_hh : np.ndarray of shape (d_h, d_h)
    b_h : np.ndarray of shape (d_h,)
    
    Returns
    -------
    tuple of (H, h_final)
        H : np.ndarray of shape (T, d_h) containing all hidden states.
        h_final : np.ndarray of shape (d_h,) the last hidden state h_T.
    """
    # Step 1: Initialize dimensions and storage for hidden trajectory
    T, d_in = X.shape
    d_h = h_0.shape[0]
    H = np.zeros((T, d_h), dtype=X.dtype)
    
    # Step 2: Sequentially update hidden state across time steps
    h_current = h_0
    for t in range(T):
        # Linear combination of current input and previous recurrent hidden state
        pre_act = X[t] @ W_xh + h_current @ W_hh + b_h
        h_current = np.tanh(pre_act)
        H[t] = h_current
        
    # Step 3: Return complete sequence of states and the final hidden state
    return H, h_current
```
:::

---

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

### Transfer Question / سؤال نقل الأثر المعرفي

Why do vanilla Recurrent Neural Networks (RNNs) fundamentally struggle to model long-range dependencies in texts or time-series exceeding 50 time steps?

* [x] The temporal Jacobian $\frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}}$ repeatedly multiplies the same recurrent weight matrix $\mathbf{W}_{hh}^T$ and derivative term $(1 - \mathbf{h}_t^2)$ over $T$ steps, causing backpropagated gradients to either vanish to absolute zero or explode exponentially.
* [ ] RNNs cannot process sequences longer than 4 tokens due to hardware memory register constraints on modern GPUs.
* [ ] Vanilla RNNs can only process numerical audio waves and are mathematically incapable of representing discrete words.
* [ ] Backpropagation through time violates the second law of thermodynamics by moving backwards in time.

### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل

**Why the correct option is right:**
When unrolling an RNN across $T$ steps, the gradient of the loss $\mathcal{L}_T$ with respect to state $\mathbf{h}_0$ contains the matrix product $\prod_{t=1}^T \text{diag}(1 - \tanh^2(\mathbf{a}_t)) \mathbf{W}_{hh}^T$. Because the derivative of $\tanh$ is strictly bounded within $(0, 1]$, and any repeated matrix multiplication scales as the matrix's eigenvalues $\lambda^T$, the gradient magnitude contracts exponentially towards zero if $|\lambda| < 1$, or explodes towards infinity if $|\lambda| > 1$. Consequently, when $T > 50$, the gradient signal reaching the initial tokens $\mathbf{x}_1, \mathbf{x}_2$ is virtually zero, preventing the network from updating weights based on early contextual clues.

**Why the distractors are incorrect:**
1. *RNNs cannot process sequences longer than 4 tokens...*: False. RNNs can be unrolled for hundreds or thousands of steps in GPU VRAM; the limitation is numerical gradient decay, not a hardware register limit of 4 tokens.
2. *Vanilla RNNs can only process audio waves...*: False. RNNs were the premier NLP architecture for language modeling and machine translation throughout 2014–2017 when token inputs were projected via embedding layers.
3. *BPTT violates thermodynamics...*: False. Backpropagation through time is merely an application of the multivariate chain rule from calculus on an acyclic computation graph; it represents mathematical differentiation, not physical time travel.

*الشرح باللغة العربية:*
عند بسط شبكة RNN عبر الزمن، يتطلب حساب تدرج الخطأ بالنسبة للكلمات الأولى ضرب مصفوفة الأوزان $\mathbf{W}_{hh}^T$ بمشتقة دالة $\tanh$ في كل خطوة زمنية: $\prod_{t=1}^T \frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}}$. ولأن مشتقة $\tanh$ أقل من أو تساوي 1 دائماً، ولأن الضرب المتكرر لمصفوفة الأوزان يتصرف وفق قوى قيمها الذاتية $\lambda^T$، فإن التدرجات تضمحل أسياً وتتلاشى تماماً نحو الصفر عند تجاوز 50 خطوة زمنية. هذا الانقطاع الرياضي يجعل الطبقات الأولى عاجزة عن التعلم من الأخطاء المتأخرة، وهو ما حتم ابتكار خلايا LSTM وبوابات التحكم.
