---
id: "numpy-vectorization"
version: "1.0.0"
title: "SIMD Architecture & Contiguous Buffer Vectorization"
track: "programming"
module: "mod-13"
estimated_minutes: 15
prerequisites: ["memory-profiling-cpython", "linear-algebra-vectors"]
i18n:
  ar: "معمارية SIMD وتوجيه المخازن الذاكرية المتصلة في NumPy"
---

# SIMD Architecture & Contiguous Buffer Vectorization

Why is pure Python code slow for data science? If you write a simple for loop in pure Python to add two lists of 1,000,000 numbers together, it takes about 100 milliseconds. If you do the exact same addition in NumPy or C, it takes less than 1 millisecond—over 100 times faster!

Why? Is CPython lazy? No. It is because of the way Python stores numbers in memory. 
In pure Python, every single integer is a heavy, bloated C-structure called a PyObject (consuming 28 bytes for a single number!). A Python list is just a scattered array of pointers pointing to these bloated objects scattered r

:::simulation-widget{engine="canvas2d" component="SimdVsLoopBenchmarkLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
T_{\text{CPython}} = N \cdot \left( \tau_{\text{dispatch}} + \tau_{\text{deref}} + \tau_{\text{typecheck}} + \tau_{\text{unbox}} + \tau_{\text{alu}} + \tau_{\text{box}} \right)
$$

لماذا تُعتبر بايثون النقية بطيئة في الحسابات العلمية؟ إذا كتبت حلقة for بسيطة في بايثون لجمع قائمتين تحتوي كل منهما على مليون رقم، فستستغرق العملية قرابة 100 مللي ثانية. أما إذا قمت بنفس العملية عبر مكتبة NumPy، فستستغرق أقل من مللي ثانية واحدة—أي أسرع بأكثر من 100 ضعف!
لماذا هذا الفارق الهائل؟
في بايثون النقية، كل رقم ليس مجرد قيمة خام، بل هو كائن برمجي ضخم ومعقد يسمى PyObject (يستهلك 28 بايت لتخزين رقم واحد فقط!). وقائمة بايثون هي مجرد مصفوفة مؤشرات تشير إلى هذه الكائنات المبعثرة عشوائياً في الذاكرة.
في كل خطوة تكرارية، يضطر مفسر بايثون إلى:
1. قراءة عنوان المؤشر.
2. القفز إلى موقع ا

:::python-challenge{id="py-numpy-vectorization"}
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

def vectorized_huber_loss(y_true: np.ndarray, y_pred: np.ndarray, delta: float = 1.0) -> float:
    """
    Computes the mean Huber loss between true and predicted targets using
    SIMD-vectorized NumPy operations without Python loops.

    Args:
        y_true: 1D NumPy array of ground truth targets.
        y_pred: 1D NumPy array of model predictions.
        delta: Threshold separating quadratic and linear penalty regimes.

    Returns:
        Scalar float representing mean Huber loss.
    """
    # TODO: Implement vectorized Huber loss without loops
    raise NotImplementedError("Implement vectorized_huber_loss")
```
:::
