import React from 'react';
import type { SimulationType } from '@/lib/types';
import { LinearRegressionResiduals } from './LinearRegressionResiduals';
import { KNNRadar } from './KNNRadar';
import { GradientDescentCanvas } from './GradientDescentCanvas';
import { KMeansVoronoi } from './KMeansVoronoi';
import { DecisionTreeLaser } from './DecisionTreeLaser';
import { VectorGeometryCanvas } from './VectorGeometryCanvas';
import { BayesFrequencyTree } from './BayesFrequencyTree';
import { NeuralActivationCanvas } from './NeuralActivationCanvas';
import { AttentionHeatmapCanvas } from './AttentionHeatmapCanvas';
import { ConvolutionFilterCanvas } from './ConvolutionFilterCanvas';
import { RegularizationGeometryCanvas } from './RegularizationGeometryCanvas';
import { SimpsonsParadoxLab } from './SimpsonsParadoxLab';
import { AnscombesQuartetLab } from './AnscombesQuartetLab';
import { EigenHunterCanvas } from './EigenHunterCanvas';
import { GaltonBoardCltLab } from './GaltonBoardCltLab';
import { InstrumentalVariablesLab } from './InstrumentalVariablesLab';
import { AutogradGraphLab } from './AutogradGraphLab';
import { BpeTokenizerLab } from './BpeTokenizerLab';
import { FlashAttentionTilingLab } from './FlashAttentionTilingLab';
import { RotaryEmbeddingLab } from './RotaryEmbeddingLab';
import { LoRADecompositionLab } from './LoRADecompositionLab';
import { EnvironmentFrameCanvas } from './EnvironmentFrameCanvas';
import { DynamicArrayGrowthLab } from './DynamicArrayGrowthLab';
import { HashTableInternalsCanvas } from './HashTableInternalsCanvas';

interface Props {
  type: SimulationType;
  compact?: boolean;
  highlightedElement?: 'slope' | 'intercept' | 'residuals' | null;
}

export const SimulationView: React.FC<Props> = ({ type, compact = true, highlightedElement }) => {
  const normType = (type || '').toLowerCase();

  // 1. Vector & Linear Algebra Geometry
  if (
    normType === 'vectors' ||
    normType.includes('vector') ||
    normType.includes('cartesian') ||
    normType.includes('metric') ||
    normType.includes('projection') ||
    normType.includes('cross') ||
    normType.includes('linear') ||
    normType.includes('matrix') ||
    normType.includes('schmidt')
  ) {
    return <VectorGeometryCanvas compact={compact} />;
  }

  // 2. Eigenpairs, Spectral & SVD
  if (
    normType === 'eigen' ||
    normType.includes('eigen') ||
    normType.includes('svd') ||
    normType.includes('spectral') ||
    normType.includes('diagonal')
  ) {
    return <EigenHunterCanvas compact={compact} />;
  }

  // 3. Gradient Descent, Optimization & Calculus
  if (
    normType === 'gradient' ||
    normType.includes('gradient') ||
    normType.includes('taylor') ||
    normType.includes('calculus') ||
    normType.includes('hessian') ||
    normType.includes('tangent') ||
    normType.includes('adam') ||
    normType.includes('optimi')
  ) {
    return <GradientDescentCanvas compact={compact} />;
  }

  // 4. Probability, CLT & Bayes
  if (normType === 'bayes' || normType.includes('bayes')) {
    return <BayesFrequencyTree compact={compact} />;
  }
  if (
    normType === 'clt' ||
    normType.includes('clt') ||
    normType.includes('galton') ||
    normType.includes('sampling') ||
    normType.includes('distribution') ||
    normType.includes('probability')
  ) {
    return <GaltonBoardCltLab compact={compact} />;
  }

  // 5. Neural Networks & Activations
  if (
    normType === 'neural' ||
    normType.includes('neural') ||
    normType.includes('perceptron') ||
    normType.includes('activation') ||
    normType.includes('mlp') ||
    normType.includes('norm')
  ) {
    return <NeuralActivationCanvas compact={compact} />;
  }

  // 6. Convolutions & Vision
  if (
    normType === 'conv' ||
    normType.includes('conv') ||
    normType.includes('kernel') ||
    normType.includes('resnet') ||
    normType.includes('pooling')
  ) {
    return <ConvolutionFilterCanvas compact={compact} />;
  }

  // 7. FlashAttention-2 SRAM Tiling
  if (normType.includes('flash') || normType.includes('tiling')) {
    return <FlashAttentionTilingLab compact={compact} />;
  }

  // 8. Rotary Position Embeddings (RoPE)
  if (normType.includes('rope') || normType.includes('rotary') || normType.includes('positional')) {
    return <RotaryEmbeddingLab compact={compact} />;
  }

  // 9. Low-Rank Adaptation (LoRA / QLoRA)
  if (normType.includes('lora') || normType.includes('qlora') || normType.includes('adapter')) {
    return <LoRADecompositionLab compact={compact} />;
  }

  // 10. Attention, Transformers & LLMs
  if (
    normType === 'attention' ||
    normType.includes('attention') ||
    normType.includes('transformer') ||
    normType.includes('cache') ||
    normType.includes('mha') ||
    normType.includes('gqa')
  ) {
    return <AttentionHeatmapCanvas compact={compact} />;
  }

  // 8. Autograd & Computational DAGs / Tree of Thought
  if (
    normType === 'autograd' ||
    normType.includes('autograd') ||
    normType.includes('computational') ||
    normType.includes('thought') ||
    normType.includes('agent') ||
    normType.includes('graph') ||
    normType.includes('mamba') ||
    normType.includes('diffusion')
  ) {
    return <AutogradGraphLab compact={compact} />;
  }

  // 9. Tokenization & NLP
  if (
    normType === 'bpe' ||
    normType.includes('bpe') ||
    normType.includes('token') ||
    normType.includes('vocab')
  ) {
    return <BpeTokenizerLab compact={compact} />;
  }

  // 10. Tree-Based Models & Boosting
  if (
    normType === 'tree' ||
    normType.includes('tree') ||
    normType.includes('forest') ||
    normType.includes('boost') ||
    normType.includes('cart')
  ) {
    return <DecisionTreeLaser compact={compact} />;
  }

  // 11. Clustering & Manifold Learning (K-Means, PCA, UMAP, t-SNE)
  if (
    normType === 'kmeans' ||
    normType.includes('kmeans') ||
    normType.includes('pca') ||
    normType.includes('manifold') ||
    normType.includes('umap') ||
    normType.includes('tsne') ||
    normType.includes('cluster')
  ) {
    return <KMeansVoronoi compact={compact} />;
  }

  // 12. Nearest Neighbors & Metric Classification
  if (normType === 'knn' || normType.includes('knn') || normType.includes('neighbor')) {
    return <KNNRadar compact={compact} />;
  }

  // 13. Regularization (Ridge / Lasso)
  if (
    normType === 'regularization' ||
    normType.includes('regular') ||
    normType.includes('ridge') ||
    normType.includes('lasso') ||
    normType.includes('elastic')
  ) {
    return <RegularizationGeometryCanvas compact={compact} />;
  }

  // 14. Simpson's Paradox & Causal Inference
  if (normType === 'simpson' || normType.includes('simpson')) {
    return <SimpsonsParadoxLab />;
  }
  if (
    normType === 'iv' ||
    normType.includes('iv') ||
    normType.includes('instrumental') ||
    normType.includes('2sls')
  ) {
    return <InstrumentalVariablesLab compact={compact} />;
  }
  if (normType === 'anscombe' || normType.includes('anscombe')) {
    return <AnscombesQuartetLab compact={compact} />;
  }

  if (
    normType.includes('memory') ||
    normType.includes('pointer') ||
    normType.includes('scope') ||
    normType.includes('closure') ||
    normType.includes('binding') ||
    normType.includes('alias') ||
    normType.includes('frame') ||
    normType.includes('lifetime')
  ) {
    return <EnvironmentFrameCanvas compact={compact} />;
  }

  if (
    normType.includes('array') ||
    normType.includes('list') ||
    normType.includes('growth') ||
    normType.includes('capacity') ||
    normType.includes('dynamic') ||
    normType.includes('allocation') ||
    normType.includes('buffer')
  ) {
    return <DynamicArrayGrowthLab compact={compact} />;
  }

  if (
    normType.includes('hash') ||
    normType.includes('dict') ||
    normType.includes('collision') ||
    normType.includes('probe') ||
    normType.includes('set') ||
    normType.includes('internals')
  ) {
    return <HashTableInternalsCanvas compact={compact} />;
  }

  // Default fallback: OLS Residual Geometry
  return <LinearRegressionResiduals compact={compact} highlightedElement={highlightedElement} />;
};
