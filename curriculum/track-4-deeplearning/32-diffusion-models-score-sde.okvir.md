---
id: "diffusion-models-score-sde"
version: "1.0.0"
title: "ReAct Agent Single Step: Thought-Action Parsing & Execution Dispatch"
track: "deeplearning"
module: "mod-46"
estimated_minutes: 15
prerequisites: ["dpo-direct-preference-optimization", "central-limit-theorem"]
i18n:
  ar: "خطوة وكيل ReAct الفردية: تحليل التفكير والفعل وتوزيع التنفيذ"
---

# ReAct Agent Single Step: Thought-Action Parsing & Execution Dispatch

Standard Large Language Models generate text as a passive sequence of token completions. If you ask an LLM: "What is the current stock price of Apple multiplied by the temperature in Tokyo?", a raw model will hallucinate numbers because:
1. It has no access to live real-time internet information.
2. It struggles with precise multi-digit floating-point arithmetic.

To break out of the digital isolation box, language models must become Autonomous Agents capable of interacting with the physical world, query APIs, running Python interpreters, and reading external databases.

In 2022, Shunyu

:::simulation-widget{engine="canvas2d" component="AgentExecutionGraphLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Context at step } k: \quad \mathcal{H}_k = \left( q, \; c_1, a_1, o_1, \; \dots, \; c_{k-1}, a_{k-1}, o_{k-1} \right)
$$

يدمج إطار عمل ReAct (التفكير والفعل) بين مسارات الاستدلال الذهني والأفعال التنفيذية لربط مخرجات النماذج اللغوية بالواقع الخارجي والأدوات الرقمية. وفي خطوة ReAct المنفردة، يولد النموذج خاطرة فكرية صريحة (Thought) متبوعة بأمر فعلي منظم (Action). يلتقط محرك التشغيل مخرجات التوليد، ويحلل اسم الأداة المستهدفة والوسائط المصاحبة لها، ثم يرسلها للتنفيذ داخل بيئة برمجية معزولة (Sandbox)، ويعيد حقن النتيجة كـ "ملاحظة" (Observation) داخل سياق المحادثة تمهيداً للخطوة التالية.

:::python-challenge{id="py-diffusion-models-score-sde"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import re

def react_step_parse_and_execute(response_text: str, tools: dict[str, callable]) -> tuple[str, str, str, str]:
    """Parse LLM text and execute tool if action is requested."""
    # TODO: 1. Extract Thought, Action, Action Input, or Final Answer
    # TODO: 2. If Final Answer present, return (thought, 'FINISH', '', final_answer)
    # TODO: 3. Dispatch action to tools dictionary and capture output as observation
    pass
```
:::
