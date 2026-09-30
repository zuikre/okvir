---
id: "gradient-descent"
version: "1.0.0"
title: "2D Spatial Convolution via im2col & GEMM Matrix Multiplication"
track: "deeplearning"
module: "mod-37"
estimated_minutes: 15
prerequisites: ["two-layer-mlp-xor-boundary", "gradient-vector"]
i18n:
  ar: "الالتفاف المكاني ثنائي الأبعاد عبر تحويل im2col ومصفوفة GEMM العامة"
---

# 2D Spatial Convolution via im2col & GEMM Matrix Multiplication

A 2D convolutional layer is the bedrock of spatial deep learning. Unlike a fully connected layer where every input pixel connects to every output feature, convolution enforces two powerful inductive biases:
1. Spatial Locality: Pixels that are close together are far more correlated than pixels on opposite sides of the image. Convolution restricts computation to tiny local patches (receptive fields) of size $K_h \times K_w$ (e.g. $3 \times 3$).
2. Translation Equivariance: A cat's whisker or a sharp edge retains the exact same visual identity whether it appears in the top-left or bottom

:::simulation-widget{engine="canvas2d" component="ConvolutionFilterCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{Y}_{\text{gemm}} = \mathbf{X}_{\text{col}} \mathbf{W}_{\text{row}}^T
$$

تطبق عملية الالتفاف المكاني ثنائي الأبعاد مرشحات محلية مشتركة عبر حقل استقبالي لاستخراج ميزات متكافئة مكانياً تحت الإزاحة. ولتنفيذ هذه العملية الحسابية المعقدة بأقصى سرعة عتادية، يتم تحويل موتر المدخلات عبر تقنية im2col التي تفرد كل رقعة مكانية متداخلة في صف مستقل ضمن مصفوفة ثنائية الأبعاد ضخمة. يحول هذا الإجراء حلقات الالتفاف السبع المتداخلة إلى عملية ضرب مصفوفات عامة وموحدة (GEMM)، مما يتيح للمعالجات الرسومية استغلال وحدات المصفوفات الانقباضية بأعلى كفاءة حسابية.

:::python-challenge{id="py-gradient-descent"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def conv2d_im2col(
    x: np.ndarray,
    w: np.ndarray,
    b: np.ndarray | None = None,
    stride: int = 1,
    padding: int = 0
) -> np.ndarray: ...
# x: (B, C_in, H, W)
# w: (C_out, C_in, K_h, K_w)
# b: (C_out,) or None
# Returns: (B, C_out, out_h, out_w)
```
:::
