---
id: "grouped-query-attention-gqa"
version: "1.0.0"
title: "Direct Preference Optimization (DPO) & Analytical Policy Substitution"
track: "deeplearning"
module: "mod-44"
estimated_minutes: 15
prerequisites: ["kv-caching-autoregressive-generation"]
i18n:
  ar: "التحسين المباشر للتفضيلات (DPO) والتعويض التحليلي للسياسة"
---

# Direct Preference Optimization (DPO) & Analytical Policy Substitution

Classical RLHF using Proximal Policy Optimization (PPO, Christiano et al. 2017, Ouyang et al. 2022) is notoriously unstable, complex, and computationally wasteful. Running PPO requires holding four separate massive language models in GPU memory simultaneously:
1. The active policy model $\pi_\theta$ (generating text and receiving updates).
2. The frozen reference model $\pi_{\text{ref}}$ (preventing policy drift via KL divergence).
3. The reward model $r_\psi$ (scoring completions).
4. The critic/value model $V_\phi$ (estimating baseline returns for generalized advantage estimation).
Train

:::simulation-widget{engine="canvas2d" component="AlignmentTrajectoryLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\max_{\pi_\theta} \mathbb{E}_{x \sim \mathcal{D}, y \sim \pi_\theta} \left[ r(x, y) \right] - \beta \, \mathbb{D}_{\text{KL}}\left( \pi_\theta(y \mid x) \;\|\; \pi_{\text{ref}}(y \mid x) \right)
$$

تشتق خوارزمية "التحسين المباشر للتفضيلات" (DPO) إعادة صياغة تحليلية دقيقة لنموذج مكافأة برادلي-تيري في ظل قيود تباعد كولباك-ليبلر (KL). فمن خلال التعبير الرياضي عن السياسة المثلى بدلالة دالة المكافأة الكامنة، تعوض DPO السياسة مباشرة داخل دالة هدف التفضيل، ملغيةً بالكامل الحاجة لتدريب نموذج مكافأة منفصل أو الانخراط في تعقيدات خوارزميات PPO غير المستقرة. يحسن هذا الهدف الرياضي سياسة النموذج اللغوي مباشرة عبر دالة خسارة تقاطعية ثنائية تقيس فوارق نسب الاحتمالات اللوغاريتمية مقارنة بنموذج مرجعي مجمد.

:::python-challenge{id="py-grouped-query-attention-gqa"}
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

def dpo_loss(policy_win_logps, policy_loss_logps, ref_win_logps, ref_loss_logps, beta=0.1):
    """Compute DPO loss, reward margin, and preference accuracy."""
    # TODO: 1. Calculate log ratios for winning and losing completions
    # TODO: 2. Calculate beta-scaled margin logits
    # TODO: 3. Compute loss, reward margin, and accuracy
    pass
```
:::
