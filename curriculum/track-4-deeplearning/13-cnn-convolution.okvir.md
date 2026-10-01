---
id: "cnn-convolution"
version: "1.0.0"
title: "2D Convolutions & Spatial Feature Extraction"
track: "deeplearning"
module: "mod-39"
estimated_minutes: 15
prerequisites: ["numpy-strides-indexing", "adamw-weight-decay-schedules"]
i18n:
  ar: "التلافيف المكانية ثنائية الأبعاد واستخراج الميزات البصرية"
---

# 2D Convolutions & Spatial Feature Extraction

## Beat 1: Tactile Intuition
A convolution is a sliding flashlight scanning across a dark landscape looking for local patterns! Instead of connecting every pixel to every neuron with millions of brittle wires, a small magnifying lens (a filter kernel like 3x3) slides step-by-step across the image. Everywhere it shines, it multiplies the local patch of pixels by its pattern stamp (e.g., vertical edge detector) and computes a resonance score. Because the exact same flashlight is used everywhere (weight sharing), an edge detected in the top-left corner is recognized using the exact same weights in the bottom-right corner (translation equivariance).

:::simulation-widget{engine="canvas2d" component="ConvolutionFilterCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

التلافيف المكانية (Convolutions) تشبه مصباحاً كاشفاً منزلقاً يمسح أرجاء الصورة بحثاً عن أنماط محلية كالحواف والزوايا. فبدلاً من ربط كل بكسل بمليارات الأوزان المنفصلة، نستخدم مرشحاً صغيراً (نواة ترشيح 3×3) ينزلق خطوة بخطوة فوق الصورة ليحسب حاصل الضرب النقطي المحلي. يمنح 'تشارك الأوزان' (Weight Sharing) الشبكة قدرة فائقة على التعرف على الميزات بغض النظر عن موقعها المكاني، مما يختزل عدد المعاملات الحسابية ويمنح النموذج مناعة ضد الإزاحة المكانية.

## Beat 2: Formal Mathematical Anchor
$$
(\mathbf{I} * \mathbf{K})(i, j) = \sum_{m=0}^{k_H-1} \sum_{n=0}^{k_W-1} \mathbf{I}(i + m, j + n) \mathbf{K}(m, n) + b
$$

In 2D discrete convolution, the kernel K of size (k_H, k_W) slides across an input matrix I of size (H, W). At each valid coordinate (i, j), it computes the Frobenius inner product between the receptive patch and the kernel matrix. The output feature map dimensions for stride S=1 and zero padding P=0 are given by H_out = H - k_H + 1 and W_out = W - k_W + 1. Weight sharing reduces parameter complexity from O(H²W²) to O(k_H · k_W).

في التلافيف ثنائية الأبعاد، تنزلق نواة الترشيح K ذات الأبعاد (k_H, k_W) فوق مصفوفة المدخلات I. عند كل إحداثي (i, j)، تُحسب قيمة المخرج كحاصل ضرب داخلي بين النواة ورقعة البكسلات المقابلة لها. يؤدي تشارك الأوزان إلى تقليص عدد المعاملات من تعقيد تربيعي مفرط إلى حجم النواة المدمج فقط.

## Beat 3: Python Challenge
:::python-challenge{id="py-cnn-convolution"}
---
timeout_ms: 3000
test_cases:
  - input: "img = np.ones((4, 4)); k = np.ones((2, 2)); out = conv2d_forward(img, k); str(round(float(out[0, 0]), 2))"
    expected: "4.0"
  - input: "img = np.array([[1.0, 2.0], [3.0, 4.0]]); k = np.array([[1.0, 0.0], [0.0, 1.0]]); out = conv2d_forward(img, k, bias=1.0); str(round(float(out[0, 0]), 2))"
    expected: "6.0"
---
```python
import numpy as np

def conv2d_forward(image: np.ndarray, kernel: np.ndarray, bias: float = 0.0) -> np.ndarray:
    """
    Perform 2D spatial convolution (valid padding, stride=1).
    """
    # Step 1: Extract spatial dimensions
    # H, W = image.shape
    # kH, kW = kernel.shape
    # out_h, out_w = H - kH + 1, W - kW + 1
    # Step 2: Slide the kernel window and compute local dot products
    # TODO: For each i in out_h and j in out_w, compute sum(patch * kernel) + bias
    pass
```
:::

## Beat 4: Reality Transfer Challenge
What fundamental property distinguishes convolutional layers from fully-connected layers in image processing?

* [x] Weight sharing and local receptive fields enforce translation equivariance and drastically reduce parameter count.
* [ ] Convolutions completely eliminate the need for backpropagation and gradient descent.
