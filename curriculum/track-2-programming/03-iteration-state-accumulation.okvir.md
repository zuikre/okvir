---
id: "iteration-state-accumulation"
version: "1.0.0"
title: "Iteration, Invariants & State Accumulation"
track: "programming"
module: "mod-08"
estimated_minutes: 15
prerequisites: ["control-flow-branching"]
i18n:
  ar: "التكرار الحلقي، اللامتغيرات (Invariants)، وتراكم الحالة"
---

# Iteration, Invariants & State Accumulation

Computers are remarkable not because they do complex tasks in a single miraculous stroke, but because they can execute simple operations millions of times per second without getting fatigued. Doing something repeatedly is called iteration (or looping).

To understand a loop, we must understand State Accumulation. Imagine you are tasked with counting the total weight of a bag of coins. You start with an empty balance sheet displaying 0. You pick up one coin, add its weight to your running total, and discard the coin. You repeat this exact same motion until no coins remain.

Every corr

:::simulation-widget{engine="canvas2d" component="ScopeChainInspector"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\begin{aligned}
\text{Initialization (Base):} \quad & \mathcal{P} \implies \mathcal{I} \\
\text{Maintenance (Inductive Step):} \quad & \{\mathcal{I} \land B\} \; S \; \{\mathcal{I}\} \\
\text{Termination (Strict Decrease):} \quad & \{\mathcal{I} \land B \land V = v_0\} \; S \; \{V < v_0 \land V \ge 0\} \\
\text{Conclusion:} \quad & (\mathcal{I} \land \neg B) \implies \mathcal{Q}
\end{aligned}
$$

لا تكمن القوة العظمى للحواسيب في قيامها بعمليات سحرية معقدة، بل في قدرتها الفائقة على تكرار خطوات حسابية بسيطة مليارات المرات في الثانية دون تعب أو ملل. هذا التكرار يُعرف برمجياً بـ التكرار الحلقي (Iteration / Loops).
لفهم الحلقة التكرارية، يجب إدراك مفهوم تراكم الحالة (State Accumulation). تخيل أنك تقوم بحساب الوزن الإجمالي لكومة من العملات المعدنية. تبدأ بدفتر فارغ يسجل الرقم 0. تلتقط عملة واحدة، وتضيف وزنها إلى المجموع التراكمي، ثم تنحيها جانباً. وتكرر ذات الحركة الرتيبة تماماً.
تعتمد أي حلقة برمجية سليمة على ركيزتين:
1. اللامتغير الحلقي (Loop Invariant): حقيقة منطقية ثابتة تظ

:::python-challenge{id="py-iteration-state-accumulation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Callable

def make_stateful_accumulator(
    initial_val: int = 0, 
    step_multiplier: int = 1
) -> tuple[Callable[[int], int], Callable[[], int], Callable[[], None]]:
    """
    Creates an encapsulated stateful accumulator using lexical closures and nonlocal bindings.

    Returns:
        A tuple of (add_func, get_func, reset_func).
    """
    # TODO: Implement closures with nonlocal variable binding
    raise NotImplementedError("Implement make_stateful_accumulator")
```
:::
