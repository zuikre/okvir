---
id: "batch-normalization-internal-covariate"
version: "1.0.0"
title: "Gated Recurrent Architectures (GRU/LSTM) & Linear State Pass-Through"
track: "deeplearning"
module: "mod-38"
estimated_minutes: 15
prerequisites: ["two-layer-mlp-xor-boundary"]
i18n:
  ar: "الهياكل التكرارية ذات البوابات (GRU/LSTM) وممر الحالة الخطي"
---

# Gated Recurrent Architectures (GRU/LSTM) & Linear State Pass-Through

Standard Recurrent Neural Networks (vanilla RNNs) process sequences sequentially: $\mathbf{h}_t = \tanh(\mathbf{W}_{hh} \mathbf{h}_{t-1} + \mathbf{W}_{xh} \mathbf{x}_t)$. When calculating the gradient with respect to early hidden states $\mathbf{h}_0$ across $T$ timesteps, the chain rule requires multiplying $T$ Jacobian matrices:

:::simulation-widget{engine="canvas2d" component="RnnUnrollCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\frac{\partial \mathcal{L}}{\partial \mathbf{h}_0} = \frac{\partial \mathcal{L}}{\partial \mathbf{h}_T} \prod_{t=1}^T \frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}} = \frac{\partial \mathcal{L}}{\partial \mathbf{h}_T} \prod_{t=1}^T \text{diag}(1 - \mathbf{h}_t^2) \mathbf{W}_{hh}^T
$$

تحل الهياكل التكرارية ذات البوابات معضلة تلاشي التدرجات في الشبكات التكرارية التقليدية عبر إنشاء ممر خطي تراكمي لنقل حالة الخلية عبر الزمن. تختزل "الوحدة التكرارية ذات البوابات" (GRU) تعقيدات بوابات LSTM المتعددة في بوابتين متناسقتين: بوابة إعادة الضبط $\mathbf{r}_t$ التي تمحو السياق التاريخي غير الضروري، وبوابة التحديث $\mathbf{z}_t$ التي تفصل بين الاحتفاظ بالحالة السابقة $\mathbf{h}_{t-1}$ وكتابة ميزات مرشحة جديدة $\tilde{\mathbf{h}}_t$. يحفظ هذا الاستيفاء الخطي تدفق التدرج دون اضمحلال عبر آلاف الخطوات الزمنية.

:::python-challenge{id="py-batch-normalization-internal-covariate"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -30.0, 30.0)))

def gru_cell_forward(x_t, h_prev, W_z, U_z, b_z, W_r, U_r, b_r, W_h, U_h, b_h):
    """Execute a single GRU step."""
    # TODO: Compute reset gate r_t
    # TODO: Compute update gate z_t
    # TODO: Compute candidate hidden state h_tilde using r_t * h_prev
    # TODO: Blend previous state and candidate state
    pass
```
:::
