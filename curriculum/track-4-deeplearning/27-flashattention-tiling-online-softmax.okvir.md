---
id: "flashattention-tiling-online-softmax"
version: "1.0.0"
title: "Group Relative Policy Optimization (GRPO) & Reasoning Verifiers"
track: "deeplearning"
module: "mod-44"
estimated_minutes: 15
prerequisites: ["grouped-query-attention-gqa"]
i18n:
  ar: "تحسين السياسة النسبي الجماعي (GRPO) ونظم التحقق البرمجي للاستدلال"
---

# Group Relative Policy Optimization (GRPO) & Reasoning Verifiers

With the advent of frontier reasoning models (such as DeepSeek-R1 and OpenAI o1), the AI alignment frontier shifted from fuzzy human stylistic preferences to rigorous verifiable reasoning (mathematics, competitive programming, formal logic). In mathematical problem-solving, a completion is not "preferred" because it sounds polite; it is either objectively correct (the answer is $42$) or objectively wrong.

When applying standard actor-critic algorithms like PPO to reasoning tasks:
1. PPO requires training a separate Critic (Value) model $V_\phi$ to estimate state baselines $V(s_t)$.
2.

:::simulation-widget{engine="canvas2d" component="GrpoReasoningLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\{y_1, y_2, \dots, y_G\} \sim \pi_{\theta_{\text{old}}}(\cdot \mid x)
$$

تتجاوز خوارزمية "تحسين السياسة النسبي الجماعي" (GRPO) الحاجة لتدريب شبكة تقييم (Critic/Value Network) منفصلة أثناء محاذاة نماذج الاستدلال الرياضي والبرمجي. فلكل مسألة مطروحة، تولد GRPO مجموعة من $G$ إجابات متنوعة من السياسة الحالية وتقيمها عبر نظم تحقق برمجية حتمية وقاطعة. ومن خلال معايرة المكافآت إحصائياً عبر المجموعة لاستخراج درجات الأفضلية النسبية $A_i = \frac{r_i - \mu}{\sigma}$، تحقق GRPO خفضاً هائلاً لتباين التدرجات وتحديثاً مستقراً للسياسة مع توفير نصف الذاكرة الرسومية المطلوبة لخوارزميات PPO التقليدية.

:::python-challenge{id="py-flashattention-tiling-online-softmax"}
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

def grpo_compute_advantages_and_loss(rewards, logp, old_logp, ref_logp, beta_kl=0.04, clip_eps=0.2):
    """Compute group-relative normalized advantages and GRPO loss."""
    # TODO: 1. Group-normalize rewards: (r - mean) / (std + eps)
    # TODO: 2. Compute importance ratio r_i = exp(logp - old_logp)
    # TODO: 3. Compute clipped surrogate loss
    # TODO: 4. Add KL penalty and return (advantages, total_loss)
    pass
```
:::
