---
id: "layer-normalization-invariance"
version: "1.0.0"
title: "Byte-Pair Encoding (BPE) Vocabulary Training from Scratch"
track: "deeplearning"
module: "mod-38"
estimated_minutes: 15
prerequisites: ["batch-normalization-internal-covariate"]
i18n:
  ar: "تدريب قاموس الترميز بزوج البايتات (BPE) من الصفر"
---

# Byte-Pair Encoding (BPE) Vocabulary Training from Scratch

A neural network cannot directly ingest raw ASCII or Unicode text strings like "The cat sat on the mat"; it can only multiply tensors of real numbers. How do we map discrete language into numerical indices?
1. Character-level Tokenization: Treats each character as a token. Vocabulary is tiny (~256 bytes), eliminating out-of-vocabulary (OOV) errors, but sequence length explodes (a 500-word paragraph becomes 3,000 tokens), making self-attention prohibitively expensive ($O(N^2)$).
2. Word-level Tokenization: Splits by whitespace. Sequences are short, but the vocabulary explodes into mil

:::simulation-widget{engine="canvas2d" component="LstmCellHighwayLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathcal{V}_0 = \{0, 1, 2, \dots, 255\} \quad \text{(Initial Byte Alphabet, } |\mathcal{V}_0| = 256\text{)}
$$

تبني خوارزمية "الترميز بزوج البايتات" (BPE) قاموساً فرعياً مثالياً للكلمات عبر دمج تكراري لأزواج الرموز الأكثر تواتراً. فمن خلال البدء من المستوى الذري للبايتات الخام ودمج الأزواج المتجاورة الأكثر شيوعاً في كل دورة، تختزل BPE السلاسل الحرفية المكررة في رموز فرعية موجزة، مع الاحتفاظ التام بالقدرة على تفكيك أي كلمة نادرة إلى بايتاتها الأصلية. يمحو هذا الإجراء مشكلة الكلمات المجهولة (OOV) ويحافظ على الروابط الصرفية والدلالية لجذور الكلمات.

:::python-challenge{id="py-layer-normalization-invariance"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
def train_bpe(corpus: list[str], num_merges: int) -> list[tuple[str, str]]:
    """Extract BPE merge rules from corpus."""
    # TODO: 1. Tokenize corpus words into tuples of characters with '</w>'
    # TODO: 2. Iteratively count adjacent pair frequencies across all words
    # TODO: 3. Select most frequent pair, append to merges list, and update word tuples
    pass
```
:::
