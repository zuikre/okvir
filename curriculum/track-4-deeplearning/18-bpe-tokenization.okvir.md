---
id: "bpe-tokenization"
version: "1.0.0"
title: "Byte Pair Encoding (BPE) Subword Tokenization"
track: "deeplearning"
module: "mod-41"
estimated_minutes: 15
prerequisites: ["hash-tables-dict-internals"]
i18n:
  ar: "ترميز أزواج البايت (BPE) وتقطيع الكلمات الفرعية"
---

# Byte Pair Encoding (BPE) Subword Tokenization

## Beat 1: Tactile Intuition
How should a language model read text? If it reads word-by-word, its dictionary explodes to millions of words, and it completely chokes on rare words or typos (the dreaded <UNK> token). If it reads character-by-character, the sequence becomes painfully long and computationally intractable. Byte Pair Encoding (BPE) is the golden bridge: compression through greedy frequency merging! It starts with base characters. Then it scans the entire training corpus, finds the single most frequently adjacent pair of symbols (e.g. 't' and 'h'), and fuses them into a new atomic token 'th'. By repeating this process thousands of times, common words become single tokens, while rare words are split into clean subwords like 'un' + 'friend' + 'ed'.

:::simulation-widget{engine="canvas2d" component="BpeTokenizerLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

كيف يقرأ الذكاء الاصطناعي النصوص؟ إذا عامل كل كلمة كوحدة كاملة، سيتضخم القاموس لملايين الكلمات وسيعجز أمام الكلمات النادرة والاشتقاقات الصرفية. وإذا قرأ بالحروف المنفردة، ستصبح السلسلة فائقة الطول وصعبة المعالجة. يمثل 'ترميز أزواج البايت' (BPE) التوازن العبقري: نبدأ بتقسيم النص إلى أحرف أولية، ثم نبحث بتكرار عن أكثر زوج من الرموز المتجاورة شيوعاً (مثل 'ت' و 'ع') وندمجهما في رمز واحد جديد 'تع'. بتكرار هذا الدمج آلاف المرات، تتحول الكلمات الشائعة لرموز فردية، بينما تُحلل الكلمات المعقدة إلى جذور ولواحق فرعية قابلة للفهم دون أي رمز مجهول <UNK>.

## Beat 2: Formal Mathematical Anchor
$$
(u^*, v^*) = \arg\max_{(u, v)} \sum_{w \in \mathcal{D}} f(w) \cdot \text{count}\big((u, v) \in w\big), \quad \mathcal{V}_{k+1} = \mathcal{V}_k \cup \{ u^* v^* \}
$$

BPE constructs a fixed vocabulary size V by greedily merging the most frequent symbol bigrams. Starting from an initial alphabet of characters plus an end-of-word delimiter, each iteration identifies the bigram (u, v) with maximum co-occurrence frequency across the training corpus dictionary. Replacing all occurrences of (u, v) with the concatenated token uv compresses text representation while ensuring zero out-of-vocabulary (OOV) tokens at inference.

تبني BPE معجماً بحجم محدد V عبر دمج أزواج الرموز الأكثر تكراراً بطريقة طماعة. انطلاقاً من الحروف الأساسية مع علامة نهاية الكلمة، تبحث كل دورة عن الزوج (u, v) صاحب التردد الأقصى في النصوص التدريبية. باستبدال هذا الزوج برمز مدمج uv، يتم ضغط السلسلة النصية مع ضمان عدم مواجهة أي كلمة مجهولة عند الاستدلال.

## Beat 3: Python Challenge
:::python-challenge{id="py-bpe-tokenization"}
---
timeout_ms: 3000
test_cases:
  - input: "v = {('a', 'b', 'c'): 3, ('a', 'b'): 2}; stats = get_pair_stats(v); str(stats[('a', 'b')])"
    expected: "5"
  - input: "v = {('k', 'a', 't'): 1}; stats = get_pair_stats(v); str(stats[('a', 't')])"
    expected: "1"
---
```python
from collections import defaultdict

def get_pair_stats(vocab: dict[tuple[str, ...], int]) -> dict[tuple[str, str], int]:
    """
    Count the frequency of all adjacent symbol pairs in the segmented vocabulary.
    """
    # Step 1: Initialize pairs frequency dictionary
    # pairs = defaultdict(int)
    # Step 2: Iterate over word tuples and their frequencies
    # TODO: For each word, count occurrences of adjacent (word[i], word[i+1]) scaled by freq
    # Step 3: Return dict(pairs)
    pass
```
:::

## Beat 4: Reality Transfer Challenge
Why is subword tokenization with Byte Pair Encoding (BPE) preferred over word-level tokenization in Large Language Models?

* [x] BPE eliminates Out-Of-Vocabulary (OOV) tokens by decomposing unknown words into known subwords or bytes while compressing common words into single tokens.
* [ ] BPE doubles the hidden dimension size of the transformer model.
