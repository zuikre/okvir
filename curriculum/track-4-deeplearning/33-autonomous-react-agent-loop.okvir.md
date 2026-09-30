---
id: "autonomous-react-agent-loop"
version: "1.0.0"
title: "Multi-Turn Autonomous ReAct Loop & Dynamic Working Memory"
track: "deeplearning"
module: "mod-46"
estimated_minutes: 15
prerequisites: ["decoder-only-gpt-transformer", "causal-inference-confounding", "context-managers-resources"]
i18n:
  ar: "حلقة ReAct التوليدية متعددة الجولات وإدارة الذاكرة العاملة الديناميكية"
---

# Multi-Turn Autonomous ReAct Loop & Dynamic Working Memory

While a single ReAct step (Lesson T4-32) performs one query, solving complex real-world tasks—such as debugging a software repository, synthesizing literature across multiple web pages, or proving a theorem—requires an autonomous multi-turn loop.

An autonomous agent must possess the cognitive capability to:
1. Iterate autonomously: Continue calling tools until sufficient evidence is gathered.
2. Recover from errors: If a tool returns a 404 Not Found or a Python IndexError, the agent must read the error traceback in the observation, analyze what went wrong, and formulate an alt

:::simulation-widget{engine="canvas2d" component="TreeOfThoughtSearchLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\text{Algorithm: Autonomous ReAct Controller}
$$

تدير "حلقة ReAct التوليدية متعددة الجولات" عمليات حل المسائل المعقدة ذاتياً عبر تكرار دورة (التفكير - الفعل - الملاحظة) حتى استيفاء شرط الإنهاء النهائي. ومن خلال إدارة ديناميكية للذاكرة العاملة، يحلل الوكيل التغذية الراجعة من البيئة الخارجية، ويتعافى ذاتياً من أخطاء تنفيذ الأدوات البرمجية، ويدمج الأدلة متعددة المراحل عبر خطوات متتابعة. تنتهي الحلقة فور رصد وسام Final Answer النهائي أو استنفاد الحد الأقصى المسموح به من التكرارات، مما يضمن أمان وكفاءة التشغيل.

:::python-challenge{id="py-autonomous-react-agent-loop"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
class ReActAgent:
    def __init__(self, tools: dict[str, callable], max_turns: int = 5):
        self.tools = tools
        self.max_turns = max_turns

    def run(self, query: str, mock_llm: callable) -> dict:
        """Execute autonomous multi-turn ReAct loop."""
        # TODO: 1. Maintain history list starting with Question: query
        # TODO: 2. Loop up to max_turns
        # TODO: 3. Parse LLM response, detect cycles, and terminate on FINISH
        pass
```
:::
