---
id: "stride-padding-receptive-fields"
version: "1.0.0"
title: "Strides, Padding & Receptive Field Arithmetic"
track: "deeplearning"
module: "mod-39"
estimated_minutes: 15
prerequisites: ["cnn-convolution"]
i18n:
  ar: "خطوات الانزلاق والحشو وحساب المجال الإدراكي للشبكات العصبية"
---

# Strides, Padding & Receptive Field Arithmetic

## Beat 1: Tactile Intuition
Imagine looking at a magnificent landscape painting through a narrow cardboard straw. At layer 1, you can only see a single brushstroke (a tiny local receptive field). But as deep layers stack, each higher neuron looks at a cluster of neurons below it, expanding its field of view until a single neuron at the top can 'see' the entire mountain range! Stride is how many steps your flashlight jumps per slide (downsampling resolution), while Padding wraps the image border in a cushion of zeros so edge pixels aren't discarded prematurely.

:::simulation-widget{engine="canvas2d" component="ConvolutionFilterCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

المجال الإدراكي (Receptive Field) هو رقعة البكسلات الأصلية التي يستطيع عصبون معين في طبقة عميقة 'رؤيتها' والتأثر بها. عند بداية الشبكة، يرى العصبون بقعة صغيرة جداً (3×3). ولكن مع تعاقب الطبقات وتطبيق خطوات الانزلاق (Strides) التي تقفز عبر البكسلات لتقليص الأبعاد، يتسع الأفق تدريجياً ليرى ميزات بصرية شاملة. أما الحشو (Padding)، فيشبه إضافة إطار حماية فارغ حول حواف الصورة لمنع تآكل أبعادها.

## Beat 2: Formal Mathematical Anchor
$$
\text{RF}_l = \text{RF}_{l-1} + (k_l - 1) \cdot J_{l-1}, \quad J_l = J_{l-1} \cdot s_l, \quad \text{with } \text{RF}_0 = 1, \; J_0 = 1
$$

The effective receptive field (RF) measures the span of input pixels that can influence a specific neuron in layer l. The cumulative jump J tracks the spatial stride between adjacent feature representations: J_l = J_{l-1} · s_l. Each kernel of size k_l widens the receptive field by (k_l - 1) · J_{l-1}. Consequently, stacking two 3x3 convolutions with stride 1 yields an RF of 1 + 2 + 2 = 5, matching a 5x5 filter with 28% fewer parameters.

يقيس المجال الإدراكي الفعال رقعة المدخلات التي تؤثر في تنشيط عصبون محدد في الطبقة l. يتضاعف حاصل القفز التراكمي J بضرب خطوات الانزلاق: J_l = J_{l-1} · s_l. توسع كل نواة حجمها k_l المجال الإدراكي بمقدار (k_l - 1) · J_{l-1}، مما يعني أن دمج طبقتين 3×3 يحقق مجالاً إدراكياً مكافئاً لطبقة 5×5 ولكن بمعاملات أقل بكثير.

## Beat 3: Python Challenge
:::python-challenge{id="py-stride-padding-receptive-fields"}
---
timeout_ms: 3000
test_cases:
  - input: "layers = [{'kernel': 3, 'stride': 1}, {'kernel': 3, 'stride': 1}]; rf, j = compute_receptive_field(layers); str(rf)"
    expected: "5"
  - input: "layers = [{'kernel': 3, 'stride': 2}, {'kernel': 3, 'stride': 2}]; rf, j = compute_receptive_field(layers); str((rf, j))"
    expected: "(7, 4)"
---
```python
import numpy as np

def compute_receptive_field(layers: list[dict[str, int]]) -> tuple[int, int]:
    """
    Compute total receptive field size and cumulative jump across layers.
    """
    # Step 1: Initialize base receptive field RF_0 = 1 and jump J_0 = 1
    # rf = 1
    # jump = 1
    # Step 2: Loop over layers and apply recurrence
    # TODO: rf = rf + (k - 1) * jump; jump = jump * stride
    pass
```
:::

## Beat 4: Reality Transfer Challenge
Why do deep CNN architectures (like VGG and ResNet) stack multiple small 3x3 kernels instead of a single 7x7 kernel?

* [x] Stacking three 3x3 layers achieves the same 7x7 receptive field while using 27 parameters instead of 49 and adding three non-linear activation functions.
* [ ] 3x3 kernels completely eliminate memory allocations during training.
