---
id: "causal-masking-scaled-dot-product"
version: "1.0.0"
title: "Supervised Fine-Tuning (SFT) & Causal Loss Masking"
track: "deeplearning"
module: "mod-42"
estimated_minutes: 15
prerequisites: ["transformer-attention"]
i18n:
  ar: "الضبط الدقيق الخاضع للإشراف (SFT) والحجب السببي لدالة الخسارة"
---

# Supervised Fine-Tuning (SFT) & Causal Loss Masking

A base foundation model pretrained on trillions of tokens is a chaotic completion engine: if you prompt it with "What is the capital of France?", it might complete the text with "What is the capital of Germany? What is the capital of Italy?" because it was trained on raw internet lists of geography quizzes. To transform this raw text predictor into an obedient, conversational AI assistant, we conduct Supervised Fine-Tuning (SFT) on curated instruction-response pairs:

:::simulation-widget{engine="canvas2d" component="PeftParameterLandscapeLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{D}_{\text{SFT}} = \left\{ (x_{\text{prompt}}^{(i)}, y_{\text{response}}^{(i)}) \right\}_{i=1}^M
$$

تعمل مرحلة "الضبط الدقيق الخاضع للإشراف" (SFT) على مواءمة النماذج اللغوية التأسيسية لتحويلها إلى مساعدات ذكية تتبع التعليمات عبر أزواج من الأسئلة والأجوبة النموذجية. ولمنع تشوه التدرجات أثناء التدريب، يطبق "الحجب السببي لدالة الخسارة" عبر استبدال مسميات الأهداف لكافة رموز السؤال برمز التجاهل ($-100$). تُحسب دالة الخسارة التقاطعية حصراً على رموز الإجابة، مما يضمن توجيه تحديثات المعاملات لتحسين جودة التوليد المشروط دون معاقبة النموذج على طبيعة مدخلات المستخدم.

:::python-challenge{id="py-causal-masking-scaled-dot-product"}
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

def sft_masked_loss(logits: np.ndarray, labels: np.ndarray, ignore_index: int = -100) -> tuple[float, int]:
    """Compute masked SFT cross-entropy loss."""
    # TODO: 1. Filter out tokens where labels == ignore_index
    # TODO: 2. Compute log-sum-exp over active vocabulary logits
    # TODO: 3. Return mean loss over active tokens and active token count
    pass
```
:::
