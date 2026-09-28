---
id: "bpe-tokenization"
version: "1.0.0"
title: "Byte-Pair Encoding (BPE) & Modern Tokenizers"
track: "deeplearning"
module: "module-04"
estimated_minutes: 7
prerequisites: ["transformer-attention"]
i18n:
  ar: "ترميز أزواج البايتات (BPE) والمجزئات اللغوية الحديثة"
---

# Byte-Pair Encoding (BPE) & Modern Tokenizers

Before transformers see text, sentences are broken into subwords. Byte-Pair Encoding iteratively merges the most frequent adjacent token pairs into an optimized vocabulary.

:::simulation-widget{engine="canvas2d" component="BpeTokenizerLab"}
---
corpus: "low lower lowest newer newest"
merges_limit: 10
---
:::

The greedy merge policy iteratively augments vocabulary $\mathcal{V}$ with the highest-frequency pair $(t_i, t_j)^*$:

$$
(t_i, t_j)^* = \arg\max_{(u, v)} \text{Freq}(u, v), \quad \mathcal{V}_{k+1} = \mathcal{V}_k \cup \{ (t_i, t_j)^* \}
$$

:::python-challenge{id="py-bpe-pair-count"}
---
timeout_ms: 3000
test_cases:
  - input: "tokens = ['a', 'b', 'a', 'b', 'c']"
    expected: "('a', 'b')"
  - input: "tokens = ['x', 'y', 'z', 'y', 'z']"
    expected: "('y', 'z')"
---
```python
from collections import Counter

def find_most_frequent_pair(tokens: list[str]) -> tuple[str, str]:
    # Counts bigrams in sequence and returns the most frequent pair
    pairs = Counter()
    for i in range(len(tokens) - 1):
        pairs[(tokens[i], tokens[i+1])] += 1
    best_pair, _ = pairs.most_common(1)[0]
    return (str(best_pair[0]), str(best_pair[1]))
```
:::
