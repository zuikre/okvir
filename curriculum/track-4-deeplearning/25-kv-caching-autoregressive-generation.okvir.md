---
id: "kv-caching-autoregressive-generation"
version: "1.0.0"
title: "Bradley-Terry Preference Modeling & Implicit Reward Dynamics"
track: "deeplearning"
module: "mod-43"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer", "arrow-ipc-zero-copy"]
i18n:
  ar: "نمذجة التفضيل بأسلوب برادلي-تيري وديناميكيات المكافأة الضمنية"
---

# Bradley-Terry Preference Modeling & Implicit Reward Dynamics

Supervised Fine-Tuning (SFT) teaches a language model how to speak like an assistant, but it cannot resolve subtle qualitative trade-offs. For example, if you ask: "Write a polite rejection email", there are thousands of valid responses. Some are overly blunt; others are obsequiously apologetic; some strike the perfect professional balance. Human annotators find it extremely difficult to assign absolute numerical scores (e.g. "This email is a 7.42 out of 10"), but they find it trivial to compare two completions side by side and state: "Completion $y_w$ is better than completion $y_l$."

:::simulation-widget{engine="canvas2d" component="RlhfPpoDynamicsLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
P(y_w \succ y_l \mid x) = \sigma(r(x, y_w) - r(x, y_l)) = \frac{1}{1 + e^{-(r(x, y_w) - r(x, y_l))}} = \frac{e^{r(x, y_w)}}{e^{r(x, y_w)} + e^{r(x, y_l)}}
$$

يحول نموذج تفضيل "برادلي-تيري" (Bradley-Terry) الأحكام المقارنة الثنائية إلى فضاء مكافآت كامن مستمر يعبر عنه بقيم سلمية. ومن خلال صياغة احتمالية فوز الإجابة كدالة سيجمويد لوجستية لفارق المكافأة بين الإجابة الفائزة $y_w$ والإجابة الخاسرة $y_l$، يؤطر النموذج مسألة تحسين التفضيلات كدالة خسارة تقاطعية ثنائية على فوارق المكافآت. تؤسس هذه الصياغة هدفاً رياضياً مستقراً لتدريب نماذج المكافأة العصبية التي توجه عمليات المحاذاة اللاحقة بالتعلم المعزز.

:::python-challenge{id="py-kv-caching-autoregressive-generation"}
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

def bradley_terry_loss(r_win: np.ndarray, r_loss: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:
    """Compute Bradley-Terry preference loss and gradients."""
    # TODO: Compute stable loss using np.logaddexp(0, -(r_win - r_loss))
    # TODO: Compute analytical gradients w.r.t r_win and r_loss
    pass
```
:::
