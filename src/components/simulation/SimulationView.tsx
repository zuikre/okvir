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

interface Props {
  type: SimulationType;
  compact?: boolean;
  highlightedElement?: 'slope' | 'intercept' | 'residuals' | null;
}

export const SimulationView: React.FC<Props> = ({ type, compact, highlightedElement }) => {
  switch (type) {
    case 'ols':
      return <LinearRegressionResiduals compact={compact} highlightedElement={highlightedElement} />;
    case 'knn':
      return <KNNRadar compact={compact} />;
    case 'gradient':
      return <GradientDescentCanvas compact={compact} />;
    case 'kmeans':
      return <KMeansVoronoi compact={compact} />;
    case 'tree':
      return <DecisionTreeLaser compact={compact} />;
    case 'vectors':
      return <VectorGeometryCanvas />;
    case 'bayes':
      return <BayesFrequencyTree />;
    case 'neural':
      return <NeuralActivationCanvas />;
    case 'attention':
      return <AttentionHeatmapCanvas />;
    case 'conv':
      return <ConvolutionFilterCanvas compact={compact} />;
    case 'regularization':
      return <RegularizationGeometryCanvas compact={compact} />;
    case 'simpson':
      return <SimpsonsParadoxLab />;
    default:
      return <LinearRegressionResiduals compact={compact} highlightedElement={highlightedElement} />;
  }
};
