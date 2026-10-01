---
id: "lstm-gru-gated-recurrent"
version: "1.0.0"
title: "Gated Recurrent Architectures (LSTM & GRU) & Long-Term Memory"
track: "deeplearning"
module: "mod-40"
estimated_minutes: 15
prerequisites: ["recurrent-neural-networks-bptt"]
i18n:
  ar: "المعماريات التكرارية ذات البوابات (LSTM و GRU) والذاكرة طويلة المدى"
---

# Gated Recurrent Architectures (LSTM & GRU) & Long-Term Memory

## Beat 1: Tactile Intuition
Vanilla RNNs erase their entire diary at every new word. Hochreiter & Schmidhuber (1997) solved this with the LSTM Conveyor Belt: the Cell State C_t. Think of the cell state as a continuous conveyor belt running straight through time. Information can travel along this belt for thousands of steps untouched! Along the belt sit three intelligent robotic valves:
1. Forget Gate (f_t): Decides what stale trash to drop from the belt (× 0).
2. Input Gate (i_t): Decides what exciting new facts to weld onto the belt (+ C_tilde).
3. Output Gate (o_t): Decides what parts of the belt to reveal as the hidden state h_t.
Because changes to the conveyor belt are purely additive (C_t = f_t ⊙ C_{t-1} + i_t ⊙ C_tilde), gradients flow backward along the belt like an open highway without exponential decay!

:::simulation-widget{engine="canvas2d" component="NeuralActivationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تعاني شبكات RNN التقليدية من محو ذاكرتها السابقة عند كل خطوة جديدة. جاءت شبكات الذاكرة طويلة المدى قصيرة المدى (LSTM) لتبتكر 'حزام ناقل' مستمر يُدعى حالة الخلية C_t. يتدفق هذا الحزام عبر الزمن دون تعديل إلا عبر ثلاث بوابات ذكية:
1. بوابة النسيان (f_t): تحدد ما يجب محوه وإسقاطه من الذاكرة القديمة.
2. بوابة الإدخال (i_t): تقرر أي معلومات جديدة تستحق الإضافة للحزام.
3. بوابة الإخراج (o_t): تحدد ما يجب إظهاره كحالة خفية لحظية.
وبما أن التحديث على حالة الخلية هو تحديث جمعي خطي، فإن تدرجات التعلم تسافر إلى الوراء عبر الحزام دون أن تتلاشى.

## Beat 2: Formal Mathematical Anchor
$$
\mathbf{C}_t = \mathbf{f}_t \odot \mathbf{C}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{C}}_t, \quad \mathbf{h}_t = \mathbf{o}_t \odot \tanh(\mathbf{C}_t)
$$

The mathematical breakthrough of LSTM is the constant error carousel (CEC). The forget gate f_t = σ(x W_f + h U_f + b_f) and input gate i_t = σ(x W_i + h U_i + b_i) regulate information flow via element-wise multiplication. Crucially, the derivative ∂C_t / ∂C_{t-1} = f_t. When the forget gate is saturated at 1, the gradient flows backwards through time with constant magnitude, completely bypassing the vanishing gradient trap of vanilla RNNs.

يكمن الإنجاز الرياضي لشبكات LSTM في ممر الخطأ الثابت (CEC). تتحكم بوابة النسيان f_t وبوابة الإدخال i_t في تدفق المعلومات عبر الضرب العنصري بدوال السيجمويد. الأهم من ذلك أن المشتقة الجزئية ∂C_t / ∂C_{t-1} تساوي ببساطة f_t، فعندما تقترب البوابة من 1، يتدفق التدرج تراجعياً عبر الزمن بقيمة ثابتة دون أن يتعرض للاضمحلال التكراري.

## Beat 3: Python Challenge
:::python-challenge{id="py-lstm-gru-gated-recurrent"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.zeros(2); h = np.zeros(2); c = np.zeros(2); W = np.zeros((2, 2)); U = np.zeros((2, 2)); b = np.zeros(2); h_n, c_n = lstm_cell_forward(x, h, c, W, U, b, W, U, b, W, U, b, W, U, b); str(round(float(np.sum(h_n)), 2))"
    expected: "0.0"
  - input: "x = np.zeros(1); h = np.zeros(1); c = np.array([5.0]); W = np.zeros((1, 1)); U = np.zeros((1, 1)); b_f = np.array([30.0]); b_0 = np.array([-30.0]); h_n, c_n = lstm_cell_forward(x, h, c, W, U, b_f, W, U, b_0, W, U, b_0, W, U, b_0); str(round(float(c_n[0]), 1))"
    expected: "5.0"
---
```python
import numpy as np

def sigmoid(z: np.ndarray) -> np.ndarray:
    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))

def lstm_cell_forward(x_t: np.ndarray, h_prev: np.ndarray, c_prev: np.ndarray,
                      W_f: np.ndarray, U_f: np.ndarray, b_f: np.ndarray,
                      W_i: np.ndarray, U_i: np.ndarray, b_i: np.ndarray,
                      W_c: np.ndarray, U_c: np.ndarray, b_c: np.ndarray,
                      W_o: np.ndarray, U_o: np.ndarray, b_o: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Execute a single time step forward pass of an LSTM cell.
    """
    # Step 1: Compute forget gate f_t = sigmoid(x_t @ W_f + h_prev @ U_f + b_f)
    # TODO: Compute f_t
    # Step 2: Compute input gate i_t and candidate c_tilde = tanh(x_t @ W_c + h_prev @ U_c + b_c)
    # TODO: Compute i_t and c_tilde
    # Step 3: Update cell state: c_next = f_t * c_prev + i_t * c_tilde
    # TODO: Compute c_next
    # Step 4: Compute output gate o_t and h_next = o_t * tanh(c_next)
    pass
```
:::

## Beat 4: Reality Transfer Challenge
What specific mathematical mechanism in LSTMs solves the vanishing gradient problem present in vanilla RNNs?

* [x] The linear additive update of the cell state C_t = f_t ⊙ C_{t-1} + i_t ⊙ C_tilde creates an unattenuated gradient highway where ∂C_t / ∂C_{t-1} = f_t.
* [ ] LSTMs use the Adam optimizer inside the forward pass to normalize hidden states.
