---
id: "matrix-multiplication-composition"
version: "1.0.0"
title: "Matrix Multiplication as Composition of Transformations"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["linear-maps-transformations"]
i18n:
  ar: "ضرب المصفوفات كتركيب متتالٍ للتحويلات"
---

# Matrix Multiplication as Composition of Transformations

### Intuition & Physical Grounding

Students are often taught matrix multiplication as a bizarre, tedious chore: take row 1, multiply by column 1, sum the numbers, and repeat dozens of times. But why does this rule exist? What does it actually mean?

Matrix multiplication is simply the composition of successive geometric transformations. If matrix $\mathbf{A}$ performs a $90^\circ$ counterclockwise rotation, and matrix $\mathbf{B}$ stretches space horizontally by $2\times$, applying $\mathbf{A}$ and then $\mathbf{B}$ to a vector $\mathbf{x}$ is written $\mathbf{B}(\mathbf{A}\mathbf{x})$. Multiplying the matrices $\mathbf{C} = \mathbf{B}\mathbf{A}$ packages both consecutive physical actions into a single master transformation.

This geometric view immediately dissolves the mystery of why $\mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}$. If you rotate a book by $90^\circ$ and then shear it horizontally, the result looks completely different than if you shear it first and then rotate it! The order in which you apply physical actions changes reality. Matrix multiplication is not commutative because the universe itself is not commutative.

### الحدس الفيزيائي والهندسي

غالباً ما يتعلم الطلاب ضرب المصفوفات كعملية ميكانيكية غريبة ومملة: خذ الصف الأول واضربه في العمود الأول، واجمع النواتج، وكرر ذلك عشرات المرات. ولكن لماذا وُضعت هذه القاعدة بالتحديد؟ ما هو معناها الفيزيائي الحقيقي؟

ضرب المصفوفات ليس سوى تركيب متتالٍ لعمليات هندسية متعاقبة. إذا كانت المصفوفة $\mathbf{A}$ تقوم بتدوير الفضاء بزاوية $90^\circ$ عكس عقارب الساعة، والمصفوفة $\mathbf{B}$ تقوم بمد الفضاء أفقياً بمقدار الضعف، فإن تطبيق $\mathbf{A}$ متبوعة بـ $\mathbf{B}$ على متجه $\mathbf{x}$ يُكتب رياضياً $\mathbf{B}(\mathbf{A}\mathbf{x})$. ضرب المصفوفتين $\mathbf{C} = \mathbf{B}\mathbf{A}$ يدمج هذين التحويلين الحركيين في مصفوفة رئيسية موحدة تختصر الخطوتين معاً.

هذه الرؤية الهندسية تبدد فوراً اللغز الشهير: لماذا لا يكون ضرب المصفوفات تبادلياً ($\mathbf{A}\mathbf{B} \neq \mathbf{B}\mathbf{A}$)؟ إذا أخذت كتاباً ودورته بزاوية $90^\circ$ ثم قمت بإمالة صفحاته جانبياً (قص)، فستحصل على شكل مختلف تماماً عما إذا قمت بقص الصفحات أولاً ثم تدوير الكتاب! ترتيب الأفعال الفيزيائية يغير النتيجة الواقعية. ضرب المصفوفات ليس تبادلياً لأن هندسة الكون نفسه غير تبادلية.

:::simulation-widget{engine="canvas2d" component="MatrixCompositionCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
(\mathbf{B}\mathbf{A})\mathbf{x} = \mathbf{B}(\mathbf{A}\mathbf{x}), \quad (\mathbf{B}\mathbf{A})_{ij} = \sum_{k=1}^m B_{ik} A_{kj}
$$

#### Demystifying the Equation
- (\mathbf{B}\mathbf{A})\mathbf{x}: Applying composite transformation $\mathbf{B}\mathbf{A}$ to vector $\mathbf{x}$; evaluated strictly from right to left (transform $\mathbf{A}$ acts first, transform $\mathbf{B}$ acts second).
- B_{ik}: The entry at row $i$, column $k$ of the second transformation matrix $\mathbf{B}$.
- A_{kj}: The entry at row $k$, column $j$ of the first transformation matrix $\mathbf{A}$.
- \sum_{k=1}^m B_{ik} A_{kj}: The dot product of row $i$ of $\mathbf{B}$ with column $j$ of $\mathbf{A}$, tracking where the $j$-th basis vector lands under the dual transformation.
- \mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}: Non-commutativity; rotating then stretching alters the axis of stretch compared to stretching then rotating.

#### تفكيك المعادلة
- (\mathbf{B}\mathbf{A})\mathbf{x}: تطبيق التحويل المركب $\mathbf{B}\mathbf{A}$ على المتجه $\mathbf{x}$؛ ويُنفذ بدقة من اليمين إلى اليسار (التحويل $\mathbf{A}$ أولاً ثم $\mathbf{B}$).
- B_{ik}: العنصر في الصف $i$ والعمود $k$ من مصفوفة التحويل الثانية $\mathbf{B}$.
- A_{kj}: العنصر في الصف $k$ والعمود $j$ من مصفوفة التحويل الأولى $\mathbf{A}$.
- \sum_{k=1}^m B_{ik} A_{kj}: الجداء النقطي للصف $i$ من $\mathbf{B}$ مع العمود $j$ من $\mathbf{A}$، متتبعاً موقع هبوط متجه الأساس $j$ تحت تأثير التحويلين.
- \mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}: غياب التبادلية؛ فالتدوير متبوعاً بالشد يغير محور الشد تماماً مقارنة بالشد متبوعاً بالتدوير.

:::python-challenge{id="py-matrix-multiplication-composition"}
---
timeout_ms: 3000
test_cases:
  - input: "compose_transformations(np.array([[1.0, 2.0], [3.0, 4.0]]), np.array([[1.0, 0.0], [0.0, 1.0]]))"
    expected: "array([[1., 2.],
       [3., 4.]])"
  - input: "compose_transformations(np.array([[0.0, 1.0], [1.0, 0.0]]), np.array([[2.0, 0.0], [0.0, 3.0]]))"
    expected: "array([[0., 3.],
       [2., 0.]])"
  - input: "compose_transformations(np.array([[2.0, 0.0], [0.0, 2.0]]), np.array([[3.0, 0.0], [0.0, 3.0]]))"
    expected: "array([[6., 0.],
       [0., 6.]])"
---
```python
import numpy as np

def compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:
    """
    Compute composite transformation matrix C = B @ A.
    
    Parameters
    ----------
    B : np.ndarray of shape (L, M)
        Second transformation applied.
    A : np.ndarray of shape (M, N)
        First transformation applied.
        
    Returns
    -------
    np.ndarray of shape (L, N)
        Composite transformation matrix.
    """
    # Step 1: Validate inner dimensions (B.shape[1] == A.shape[0])
    # if B.shape[1] != A.shape[0]: raise ValueError(...)
    
    # Step 2: Compute composite matrix product
    # C = B @ A
    
    # Step 3: Return resulting transformation matrix
    # return C
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Let R be a matrix that rotates 2D space by 90 degrees counterclockwise, and let S be a matrix that scales x-coordinates by 3 while leaving y-coordinates untouched. Geometrically, why is R @ S strictly not equal to S @ R?

**العربية:** لتكن R مصفوفة تدور الفضاء ثنائي الأبعاد بـ 90 درجة عكس عقارب الساعة، ولتكن S مصفوفة تمدد الإحداثي السيني بمقدار 3 دون تغيير الإحداثي الصادي. هندسياً، لماذا لا تتساوى R @ S مع S @ R قطعاً؟

* [x] R @ S scales the horizontal axis first and then rotates that elongated axis into the vertical position, whereas S @ R rotates the original vertical axis into the horizontal position before scaling it.
  * تقوم R @ S بمد المحور الأفقي أولاً ثم تدوير هذا المحور الممدود ليصبح رأسياً، بينما تقوم S @ R بتدوير المحور الرأسي الأصلي ليصبح أفقياً قبل مده.
  > **Why this is correct:** Applying S first stretches along the x-axis; rotating by R then places the stretch along the y-axis. Applying R first rotates the axes; stretching by S then elongates whatever is currently on the x-axis (which was originally the negative y-axis). The resulting spatial geometries are completely different.
  > **لماذا هذا الخيار صحيح:** تطبيق S أولاً يمد المحور السيني، ثم يؤدي التدوير بـ R إلى نقل هذا التمدد ليصبح على المحور الصادي. أما تطبيق R أولاً فيدور المحاور، ثم يقوم S بمد ما استقر على المحور السيني. النتيجة الهندسية تختلف جذرياً في الفضاء.

* [ ] Matrix multiplication is associative, which mathematically guarantees that R @ S must equal S @ R.
  * ضرب المصفوفات تجميعي، مما يضمن رياضياً بالضرورة أن R @ S تساوي S @ R.
  > **Why this is incorrect:** Confuses associativity (A(BC) = (AB)C) with commutativity (AB = BA). Matrices are associative, but NOT commutative.
  > **لماذا هذا الخيار خاطئ:** خلط بين التجميعية (A(BC) = (AB)C) والتبادلية (AB = BA). ضرب المصفوفات تجميعي دائماً ولكنه ليس تبادلياً.

* [ ] Because rotating by 90 degrees inverts the determinant to a negative value.
  * لأن التدوير بـ 90 درجة يقلب المحدد إلى قيمة سالبة.
  > **Why this is incorrect:** A pure 2D rotation matrix has determinant +1 (orientation is preserved), not negative.
  > **لماذا هذا الخيار خاطئ:** محدد مصفوفة التدوير الصافي في بعدين هو +1 (يحافظ على الاتجاهية)، وليس سالباً.

