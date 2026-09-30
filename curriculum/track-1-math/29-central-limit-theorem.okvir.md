---
id: "central-limit-theorem"
version: "1.0.0"
title: "The Central Limit Theorem & Geometric Convergence of Noise"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["bayes-theorem", "differentiation-rules-chain"]
i18n:
  ar: "مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء"
---

# The Central Limit Theorem & Geometric Convergence of Noise

Take a six-sided die. Roll it once: the outcome is uniformly flat and jagged (equal $1/6$ chance for 1, 2, 3, 4, 5, or 6). There is nothing "bell-shaped" or round about it. 

Now, roll 100 dice and calculate the average score. Repeat this experiment 1,000 times. What does the distribution of those 1,000 averages look like? Miraculously, it forms a silky-smooth, perfectly symmetrical Gaussian bell curve! 

Even if you started with a bizarre, lopsided distribution (like coin flips, radioactive decay clicks, or lottery tickets), the act of adding many independent random variables together was

:::simulation-widget{engine="canvas2d" component="GaltonBoardCltLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
S_N \coloneqq \sum_{i=1}^N X_i, \quad \bar{X}_N \coloneqq \frac{1}{N} S_N, \quad X_i \overset{\text{i.i.d.}}{\sim} \mathcal{D}(\mu, \sigma^2 < \infty)
$$

مبرهنة النهاية المركزية هي التاج الملكي لنظرية الاحتمالات والهندسة الإحصائية؛ إذ تُثبت أن مجموع عدد كبير من المتغيرات العشوائية المستقلة والمتطابقة التوزيع، مهما كان شكل توزيعها الأصلي غريباً أو مشوهاً أو غير متماثل، يقترب بالضرورة وبشكل حتمي من "التوزيع الطبيعي الغاوسي" الأملس متى ما كان التباين محدوداً. هندسياً، يعكس هذا المبدأ ظاهرة تركز الحجم في الفضاءات عالية الأبعاد؛ حيث تتركز الاحتمالات في قشرة كروية رقيقة يتخذ مسقطها الأحادي شكل منحنى الجرس الشهير.

:::python-challenge{id="py-central-limit-theorem"}
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

def standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:
    """
    Compute standardized sample mean Z-scores across M independent experiments.
    
    Parameters
    ----------
    samples : np.ndarray
        Array of shape (M, N) containing M experiments of N draws each
    true_mean : float
        Population mean mu
    true_std : float
        Population standard deviation sigma
        
    Returns
    -------
    np.ndarray
        Standardized Z-statistics of shape (M,)
    """
    # TODO: Compute sample means along axis 1 and standardize via true std / sqrt(N)
    pass
```
:::
