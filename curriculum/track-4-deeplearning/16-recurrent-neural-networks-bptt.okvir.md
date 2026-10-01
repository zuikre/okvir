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

## Beat 1: Tactile Intuition
Imagine reading a suspense novel. When you read the word 'dagger', its meaning depends completely on the last 50 pages: is it an ancient museum exhibit, or a murder weapon in the dark? Feedforward networks have complete amnesia; they process every token in total isolation. An RNN maintains a continuous mental diary: the hidden state h_t. As each word x_t enters, the model reads yesterday's diary entry h_{t-1}, combines it with the new word, and writes an updated entry h_t. To train it, we 'unroll' this diary across time, turning recurrence into a long feedforward chain where the exact same diary rules (weights W_hh, W_xh) are shared across every second.

:::simulation-widget{engine="canvas2d" component="AutogradGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

لا يمكن فهم الجملة بالنظر إلى كلماتها بمعزل عن سياقها؛ فمعنى الكلمة الأخيرة يتوقف على ما سبقها. تعمل الشبكات العصبية التكرارية (RNNs) عبر الاحتفاظ بـ 'دفتر مذكرات داخلي' متجدد يُعرف بالحالة الخفية h_t. مع قراءة كل رمز جديد x_t، تُدمج المعلومات الواردة مع خلاصة الماضي h_{t-1} لإنتاج الحالة الجديدة. ولتدريب هذه الشبكة، نقوم بـ 'بسط السلسلة عبر الزمن' (BPTT) لتحويل التكرار إلى رسم بياني متصل تُشتق عبره التدرجات العكسية عبر كافة اللحظات الزمنية السابقة.

## Beat 2: Formal Mathematical Anchor
$$
\mathbf{h}_t = \tanh(\mathbf{x}_t \mathbf{W}_{xh} + \mathbf{h}_{t-1} \mathbf{W}_{hh} + \mathbf{b}_h), \quad \frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_0} = \frac{\partial \mathcal{L}_T}{\partial \mathbf{h}_T} \prod_{t=1}^T \text{diag}(1 - \mathbf{h}_t^2) \mathbf{W}_{hh}^T
$$

In a vanilla RNN, the hidden state h_t serves as lossy memory. Backpropagation Through Time (BPTT) applies the chain rule backward from step T to step 1. Because this requires multiplying by the recurrent weight matrix W_hh at every single time step, the gradient scales as (W_hh)^T. If the largest eigenvalue of W_hh is less than 1, gradients decay exponentially to zero (vanishing); if greater than 1, gradients explode to infinity, preventing vanilla RNNs from learning long-term dependencies.

تعمل الحالة الخفية h_t في شبكات RNN التقليدية كذاكرة متجددة ملخصة للسلسلة. يطبق الانحدار العكسي عبر الزمن (BPTT) قاعدة السلسلة تراجعياً من اللحظة T إلى البداية. وبما أن حساب التدرج يتطلب ضرب مصفوفة الأوزان W_hh تكرارياً عند كل لحظة، فإن التدرج يتناسب أسياً مع (W_hh)^T، مما يؤدي إما إلى تلاشي التدرجات نحو الصفر أو انفجارها نحو اللانهاية، مما يجعلها عاجزة عن حفظ السياقات الطويلة.

## Beat 3: Python Challenge
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

def rnn_forward_sequence(X: np.ndarray, h_0: np.ndarray, W_xh: np.ndarray, W_hh: np.ndarray, b_h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Unroll vanilla RNN across sequence length T: h_t = tanh(x_t @ W_xh + h_{t-1} @ W_hh + b_h).
    """
    # Step 1: Initialize states
    # T, hidden_dim = X.shape[0], h_0.shape[0]
    # Step 2: Sequentially update hidden states
    # TODO: Loop through t in range(T), update h = tanh(X[t] @ W_xh + h @ W_hh + b_h)
    # Step 3: Return (all_hidden_states, final_hidden_state)
    pass
```
:::

## Beat 4: Reality Transfer Challenge
Why do vanilla Recurrent Neural Networks struggle to learn long-range temporal dependencies?

* [x] Repeated matrix multiplications by W_hh and tanh' across many time steps cause the gradient to either vanish to zero or explode exponentially.
* [ ] RNNs cannot process sequences longer than 4 tokens due to Python memory limits.
