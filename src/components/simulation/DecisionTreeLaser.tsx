import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useOkvirStore } from '@/lib/store';
import { PreCanvasBriefing, PostCanvasConsolidation, type TierContent } from '@/components/pedagogy/MultiTierDisclosure';
import { TimelinePlaybackBar } from '@/components/simulation/TimelinePlaybackBar';
import { audio } from '@/lib/audio';
import {
  RotateCcw,
  Sparkles,
  GitBranch,
  Layers,
  Activity,
  CheckCircle2,
  RefreshCw,
  Sliders,
  TrendingDown,
  Info,
  Maximize2,
} from 'lucide-react';

// --- Data Types ---

export interface Point {
  id: number;
  x: number;
  y: number;
  cls: 0 | 1;
}

export interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface TreeNode {
  id: string;
  depth: number;
  box: BoundingBox;
  pointIds: number[];
  numClass0: number;
  numClass1: number;
  impurity: number;
  predictedClass: 0 | 1;
  isLeaf: boolean;
  splitAxis?: 'x' | 'y';
  threshold?: number;
  gain?: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface TreeSnapshot {
  step: number;
  tree: TreeNode;
  leaves: TreeNode[];
  activeNodeId?: string;
  phase: string;
  totalImpurity: number;
  accuracy: number;
}

export type DatasetPreset = 'xor' | 'moons' | 'circles' | 'diagonal' | 'blobs' | 'overfit';
export type ImpurityCriterion = 'gini' | 'entropy';

// --- Synthetic Benchmark Generators ---

function generateXORDataset(seedVal = 42): Point[] {
  const points: Point[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let id = 1;

  for (let i = 0; i < 20; i++) {
    points.push({ id: id++, x: Number((1.5 + rnd() * 2.8).toFixed(2)), y: Number((5.5 + rnd() * 2.8).toFixed(2)), cls: 0 });
  }
  for (let i = 0; i < 20; i++) {
    points.push({ id: id++, x: Number((5.5 + rnd() * 2.8).toFixed(2)), y: Number((5.5 + rnd() * 2.8).toFixed(2)), cls: 1 });
  }
  for (let i = 0; i < 20; i++) {
    points.push({ id: id++, x: Number((1.5 + rnd() * 2.8).toFixed(2)), y: Number((1.5 + rnd() * 2.8).toFixed(2)), cls: 1 });
  }
  for (let i = 0; i < 20; i++) {
    points.push({ id: id++, x: Number((5.5 + rnd() * 2.8).toFixed(2)), y: Number((1.5 + rnd() * 2.8).toFixed(2)), cls: 0 });
  }
  return points;
}

function generateMoonsDataset(seedVal = 42): Point[] {
  const points: Point[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let id = 1;

  for (let i = 0; i < 35; i++) {
    const theta = rnd() * Math.PI;
    const r = 2.4 + (rnd() - 0.5) * 0.45;
    points.push({
      id: id++,
      x: Number(Math.max(0.6, Math.min(9.4, 3.8 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 4.8 + r * Math.sin(theta))).toFixed(2)),
      cls: 0,
    });
  }
  for (let i = 0; i < 35; i++) {
    const theta = Math.PI + rnd() * Math.PI;
    const r = 2.4 + (rnd() - 0.5) * 0.45;
    points.push({
      id: id++,
      x: Number(Math.max(0.6, Math.min(9.4, 6.2 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 5.2 + r * Math.sin(theta))).toFixed(2)),
      cls: 1,
    });
  }
  return points;
}

function generateCirclesDataset(seedVal = 42): Point[] {
  const points: Point[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let id = 1;
  const cx = 5.0,
    cy = 5.0;

  for (let i = 0; i < 28; i++) {
    const theta = rnd() * 2 * Math.PI;
    const r = Math.sqrt(rnd()) * 1.8;
    points.push({
      id: id++,
      x: Number(Math.max(0.6, Math.min(9.4, cx + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, cy + r * Math.sin(theta))).toFixed(2)),
      cls: 0,
    });
  }
  for (let i = 0; i < 42; i++) {
    const theta = rnd() * 2 * Math.PI;
    const r = 2.8 + rnd() * 1.3;
    points.push({
      id: id++,
      x: Number(Math.max(0.6, Math.min(9.4, cx + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, cy + r * Math.sin(theta))).toFixed(2)),
      cls: 1,
    });
  }
  return points;
}

function generateDiagonalDataset(seedVal = 42): Point[] {
  const points: Point[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let id = 1;

  for (let i = 0; i < 70; i++) {
    const x = 1.0 + rnd() * 8.0;
    const y = 1.0 + rnd() * 8.0;
    const dist = y - x;
    if (Math.abs(dist) < 0.25) continue;
    points.push({
      id: id++,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      cls: dist > 0 ? 1 : 0,
    });
  }
  return points;
}

function generateBlobsDataset(seedVal = 42): Point[] {
  const points: Point[] = [];
  let s = seedVal;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let id = 1;

  for (let i = 0; i < 30; i++) {
    const u1 = Math.max(1e-6, rnd());
    const u2 = rnd();
    const r = 0.9 * Math.sqrt(-2 * Math.log(u1));
    const theta = 2 * Math.PI * u2;
    points.push({
      id: id++,
      x: Number(Math.max(0.6, Math.min(9.4, 3.0 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 3.2 + r * Math.sin(theta))).toFixed(2)),
      cls: 0,
    });
  }
  for (let i = 0; i < 30; i++) {
    const u1 = Math.max(1e-6, rnd());
    const u2 = rnd();
    const r = 0.9 * Math.sqrt(-2 * Math.log(u1));
    const theta = 2 * Math.PI * u2;
    points.push({
      id: id++,
      x: Number(Math.max(0.6, Math.min(9.4, 7.0 + r * Math.cos(theta))).toFixed(2)),
      y: Number(Math.max(0.6, Math.min(9.4, 6.8 + r * Math.sin(theta))).toFixed(2)),
      cls: 1,
    });
  }
  return points;
}

function generateOverfittingTrapDataset(seedVal = 42): Point[] {
  const points = generateBlobsDataset(seedVal);
  let id = 1000;
  points.push({ id: id++, x: 3.0, y: 3.2, cls: 1 });
  points.push({ id: id++, x: 2.7, y: 3.5, cls: 1 });
  points.push({ id: id++, x: 7.1, y: 6.9, cls: 0 });
  points.push({ id: id++, x: 6.8, y: 6.5, cls: 0 });
  return points;
}

const TREE_TIER_CONTENT: TierContent = {
  intuition: {
    analogy: {
      en: 'Imagine playing 20 Questions to isolate a secret object. At each step, you ask an axis-aligned yes/no question that slices the remaining space, maximizing information gain.',
      ar: 'تخيّل أنك تلعب لعبة "عشرون سؤالاً". في كل خطوة، تطرح سؤالاً بسيطاً بنعم/لا يقسم فضاء الخصائص إلى شطرين متجانسين، مما يرفع كسب المعلومات إلى أقصى حد.',
    },
    keyTakeaway: {
      en: 'Decision Trees recursively partition feature space into orthogonal hyper-rectangles via greedy impurity minimization (CART algorithm).',
      ar: 'تقوم أشجار القرار بتقسيم فضاء الخصائص تكرارياً إلى مستطيلات متعامدة عبر تقليل الشوائب جشعاً (خوارزمية CART).',
    },
  },
  geometry: {
    visualDescription: {
      en: 'Space is partitioned by orthogonal laser slices. Each internal node represents an axis-aligned split (X_j ≤ θ), and each leaf node is a distinct bounding box.',
      ar: 'يتم تقطيع الفضاء بواسطة خطوط ليزرية متعامدة. تمثل كل عقدة داخلية مستوى متعامداً (X_j ≤ θ)، ويمثل كل مستطيل نهائي ورقة قرار.',
    },
    conservedQuantity: {
      en: 'Information Gain (ΔI ≥ 0) is guaranteed to be non-negative for optimal greedy splits by Jensen’s inequality on concave impurity functions.',
      ar: 'كسب المعلومات (ΔI ≥ 0) مضمون ليكون غير سالب بفضل متباينة جينسن للدوال المقعرة.',
    },
  },
  formal: {
    equation: '\\Delta I = I(S) - \\left(\\frac{|S_L|}{|S|} I(S_L) + \\frac{|S_R|}{|S|} I(S_R)\\right)',
    derivationSteps: [
      {
        step: 'Gini(p) = 1 - (p_0^2 + p_1^2) = 2 p_0 (1 - p_0)',
        note: { en: 'Gini impurity measure for binary classification', ar: 'مقياس شوائب جيني للتصنيف الثنائي' },
      },
      {
        step: 'H(p) = - p_0 \\log_2 p_0 - p_1 \\log_2 p_1',
        note: { en: 'Shannon information entropy in bits', ar: 'إنتروبيا شانون للمعلومات واللايقين' },
      },
      {
        step: '\\theta^* = \\arg\\max_{\\theta, j} \\Delta I(j, \\theta)',
        note: { en: 'Greedy split selection scanning all sorted candidate thresholds', ar: 'اختيار الانقسام الأمثل بمسح العتبات المرتبة' },
      },
    ],
  },
  code: {
    snippet: `import numpy as np

def best_split(x: np.ndarray, y: np.ndarray):
    idx = np.argsort(x)
    x_s, y_s = x[idx], y[idx]
    n = len(y)
    best_gain, best_thresh = -1.0, None
    for i in range(1, n):
        if x_s[i] == x_s[i-1]: continue
        thresh = (x_s[i] + x_s[i-1]) / 2.0
        y_l, y_r = y_s[:i], y_s[i:]
        gain = gini(y) - (len(y_l)/n * gini(y_l) + len(y_r)/n * gini(y_r))
        if gain > best_gain:
            best_gain, best_thresh = gain, thresh
    return best_thresh, best_gain`,
    explanation: {
      en: 'Evaluating thresholds between adjacent sorted unique feature values scans all O(N) splits in O(N log N) time.',
      ar: 'مسح العتبات بين القيم المرتبة المتجاورة يفحص جميع الانقسامات الممكنة بكفاءة O(N log N).',
    },
  },
};

// --- Mathematical Helper Functions ---

function calculateImpurity(num0: number, num1: number, criterion: ImpurityCriterion): number {
  const total = num0 + num1;
  if (total === 0) return 0;
  const p0 = num0 / total;
  const p1 = num1 / total;

  if (criterion === 'gini') {
    return Number((1 - (p0 * p0 + p1 * p1)).toFixed(4));
  } else {
    const eps = 1e-9;
    const h0 = p0 > 0 ? -p0 * Math.log2(p0 + eps) : 0;
    const h1 = p1 > 0 ? -p1 * Math.log2(p1 + eps) : 0;
    return Number((h0 + h1).toFixed(4));
  }
}

interface SplitCandidate {
  axis: 'x' | 'y';
  threshold: number;
  gain: number;
  leftPts: Point[];
  rightPts: Point[];
  leftBox: BoundingBox;
  rightBox: BoundingBox;
}

function findBestSplitForNode(
  points: Point[],
  box: BoundingBox,
  criterion: ImpurityCriterion,
  minSamples = 2
): SplitCandidate | null {
  if (points.length < minSamples) return null;

  const n0 = points.filter((p) => p.cls === 0).length;
  const n1 = points.length - n0;
  const parentImp = calculateImpurity(n0, n1, criterion);
  if (parentImp <= 1e-6) return null;

  let bestCandidate: SplitCandidate | null = null;
  let bestGain = -Infinity;

  // Scan X Axis
  const sortedX = [...points].sort((a, b) => a.x - b.x);
  for (let i = 0; i < sortedX.length - 1; i++) {
    if (sortedX[i].x === sortedX[i + 1].x) continue;
    const t = (sortedX[i].x + sortedX[i + 1].x) / 2;
    if (t <= box.minX || t >= box.maxX) continue;

    const left = sortedX.slice(0, i + 1);
    const right = sortedX.slice(i + 1);

    const l0 = left.filter((p) => p.cls === 0).length;
    const l1 = left.length - l0;
    const r0 = right.filter((p) => p.cls === 0).length;
    const r1 = right.length - r0;

    const gL = calculateImpurity(l0, l1, criterion);
    const gR = calculateImpurity(r0, r1, criterion);

    const splitImp = (left.length / points.length) * gL + (right.length / points.length) * gR;
    const gain = parentImp - splitImp;

    if (gain > bestGain) {
      bestGain = gain;
      bestCandidate = {
        axis: 'x',
        threshold: Number(t.toFixed(2)),
        gain: Number(gain.toFixed(4)),
        leftPts: left,
        rightPts: right,
        leftBox: { ...box, maxX: t },
        rightBox: { ...box, minX: t },
      };
    }
  }

  // Scan Y Axis
  const sortedY = [...points].sort((a, b) => a.y - b.y);
  for (let i = 0; i < sortedY.length - 1; i++) {
    if (sortedY[i].y === sortedY[i + 1].y) continue;
    const t = (sortedY[i].y + sortedY[i + 1].y) / 2;
    if (t <= box.minY || t >= box.maxY) continue;

    const left = sortedY.slice(0, i + 1);
    const right = sortedY.slice(i + 1);

    const l0 = left.filter((p) => p.cls === 0).length;
    const l1 = left.length - l0;
    const r0 = right.filter((p) => p.cls === 0).length;
    const r1 = right.length - r0;

    const gL = calculateImpurity(l0, l1, criterion);
    const gR = calculateImpurity(r0, r1, criterion);

    const splitImp = (left.length / points.length) * gL + (right.length / points.length) * gR;
    const gain = parentImp - splitImp;

    if (gain > bestGain) {
      bestGain = gain;
      bestCandidate = {
        axis: 'y',
        threshold: Number(t.toFixed(2)),
        gain: Number(gain.toFixed(4)),
        leftPts: left,
        rightPts: right,
        leftBox: { ...box, maxY: t },
        rightBox: { ...box, minY: t },
      };
    }
  }

  if (bestGain <= 1e-5) return null;
  return bestCandidate;
}

function cloneTree(node: TreeNode): TreeNode {
  return {
    ...node,
    box: { ...node.box },
    pointIds: [...node.pointIds],
    left: node.left ? cloneTree(node.left) : undefined,
    right: node.right ? cloneTree(node.right) : undefined,
  };
}

function getTreeLeaves(node: TreeNode): TreeNode[] {
  if (node.isLeaf) return [node];
  const leaves: TreeNode[] = [];
  if (node.left) leaves.push(...getTreeLeaves(node.left));
  if (node.right) leaves.push(...getTreeLeaves(node.right));
  return leaves;
}

function evaluateTreeOnPoints(root: TreeNode, allPoints: Point[], criterion: ImpurityCriterion) {
  const leaves = getTreeLeaves(root);
  let totalImp = 0;
  let correct = 0;

  leaves.forEach((l) => {
    const totalLeaf = l.numClass0 + l.numClass1;
    totalImp += (totalLeaf / Math.max(1, allPoints.length)) * l.impurity;
  });

  allPoints.forEach((p) => {
    let cur = root;
    while (!cur.isLeaf) {
      if (cur.splitAxis === 'x') {
        cur = p.x <= (cur.threshold ?? 5) ? cur.left! : cur.right!;
      } else {
        cur = p.y <= (cur.threshold ?? 5) ? cur.left! : cur.right!;
      }
    }
    if (cur.predictedClass === p.cls) correct++;
  });

  const accuracy = allPoints.length > 0 ? (correct / allPoints.length) * 100 : 0;
  return { totalImpurity: Number(totalImp.toFixed(4)), accuracy: Number(accuracy.toFixed(1)) };
}

function buildTreeSnapshots(
  allPoints: Point[],
  maxDepth: number,
  criterion: ImpurityCriterion,
  lang: string
): TreeSnapshot[] {
  const pointMap = new Map<number, Point>(allPoints.map((p) => [p.id, p]));
  const num0 = allPoints.filter((p) => p.cls === 0).length;
  const num1 = allPoints.length - num0;
  const rootImp = calculateImpurity(num0, num1, criterion);

  const root: TreeNode = {
    id: 'root',
    depth: 0,
    box: { minX: 0, maxX: 10, minY: 0, maxY: 10 },
    pointIds: allPoints.map((p) => p.id),
    numClass0: num0,
    numClass1: num1,
    impurity: rootImp,
    predictedClass: num1 > num0 ? 1 : 0,
    isLeaf: true,
  };

  const initialEval = evaluateTreeOnPoints(root, allPoints, criterion);
  const snapshots: TreeSnapshot[] = [
    {
      step: 0,
      tree: cloneTree(root),
      leaves: [cloneTree(root)],
      phase: lang === 'ar' ? 'العقدة الجذرية (بدون انقسام)' : 'Root Node (Unsplit)',
      totalImpurity: initialEval.totalImpurity,
      accuracy: initialEval.accuracy,
    },
  ];

  let currentTree = root;
  const maxSplits = Math.pow(2, maxDepth) - 1;

  for (let step = 1; step <= maxSplits; step++) {
    const leaves = getTreeLeaves(currentTree).filter(
      (l) => l.depth < maxDepth && l.impurity > 1e-5 && l.pointIds.length >= 2
    );
    if (leaves.length === 0) break;

    let bestLeaf: TreeNode | null = null;
    let bestSplit: SplitCandidate | null = null;
    let maxGlobalGain = -Infinity;

    for (const leaf of leaves) {
      const leafPoints = leaf.pointIds.map((id) => pointMap.get(id)!).filter(Boolean);
      const cand = findBestSplitForNode(leafPoints, leaf.box, criterion);
      if (cand) {
        const weightedGain = (leafPoints.length / allPoints.length) * cand.gain;
        if (weightedGain > maxGlobalGain) {
          maxGlobalGain = weightedGain;
          bestLeaf = leaf;
          bestSplit = cand;
        }
      }
    }

    if (!bestLeaf || !bestSplit) break;

    bestLeaf.isLeaf = false;
    bestLeaf.splitAxis = bestSplit.axis;
    bestLeaf.threshold = bestSplit.threshold;
    bestLeaf.gain = bestSplit.gain;

    const l0 = bestSplit.leftPts.filter((p) => p.cls === 0).length;
    const l1 = bestSplit.leftPts.length - l0;
    const r0 = bestSplit.rightPts.filter((p) => p.cls === 0).length;
    const r1 = bestSplit.rightPts.length - r0;

    bestLeaf.left = {
      id: `${bestLeaf.id}-L`,
      depth: bestLeaf.depth + 1,
      box: bestSplit.leftBox,
      pointIds: bestSplit.leftPts.map((p) => p.id),
      numClass0: l0,
      numClass1: l1,
      impurity: calculateImpurity(l0, l1, criterion),
      predictedClass: l1 > l0 ? 1 : 0,
      isLeaf: true,
    };

    bestLeaf.right = {
      id: `${bestLeaf.id}-R`,
      depth: bestLeaf.depth + 1,
      box: bestSplit.rightBox,
      pointIds: bestSplit.rightPts.map((p) => p.id),
      numClass0: r0,
      numClass1: r1,
      impurity: calculateImpurity(r0, r1, criterion),
      predictedClass: r1 > r0 ? 1 : 0,
      isLeaf: true,
    };

    const treeCopy = cloneTree(currentTree);
    const leavesCopy = getTreeLeaves(treeCopy);
    const evalResult = evaluateTreeOnPoints(treeCopy, allPoints, criterion);

    const splitLabel = `${bestSplit.axis.toUpperCase()} ≤ ${bestSplit.threshold}`;
    snapshots.push({
      step,
      tree: treeCopy,
      leaves: leavesCopy,
      activeNodeId: bestLeaf.id,
      phase:
        lang === 'ar'
          ? `انقسام ليزري: ${splitLabel} (العمق ${bestLeaf.depth})`
          : `Laser Split: ${splitLabel} (Depth ${bestLeaf.depth})`,
      totalImpurity: evalResult.totalImpurity,
      accuracy: evalResult.accuracy,
    });
  }

  return snapshots;
}

// --- Flawless Tidy Tree Drawing Algorithm (Reingold-Tilford zero overlap) ---

interface LayoutNode {
  node: TreeNode;
  x: number;
  y: number;
}

function layoutTidyTree(root: TreeNode, nodeWidth = 92, hGap = 26, vGap = 75) {
  let leafCounter = 0;
  const layoutNodes: LayoutNode[] = [];

  function assignLeafX(node: TreeNode): number {
    if (node.isLeaf || !node.left || !node.right) {
      const x = leafCounter * (nodeWidth + hGap) + nodeWidth / 2 + 25;
      const y = node.depth * vGap + 35;
      layoutNodes.push({ node, x, y });
      leafCounter++;
      return x;
    }
    const leftX = assignLeafX(node.left);
    const rightX = assignLeafX(node.right);
    const x = (leftX + rightX) / 2;
    const y = node.depth * vGap + 35;
    layoutNodes.push({ node, x, y });
    return x;
  }

  assignLeafX(root);
  const totalWidth = Math.max(700, leafCounter * (nodeWidth + hGap) + 50);
  return { layoutNodes, totalWidth };
}

export const DecisionTreeLaser: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, language, config } = useOkvirStore();

  // Dataset & Induction Parameters
  const [preset, setPreset] = useState<DatasetPreset>('xor');
  const [points, setPoints] = useState<Point[]>(() => generateXORDataset(42));
  const [maxDepth, setMaxDepth] = useState<number>(3);
  const [criterion, setCriterion] = useState<ImpurityCriterion>('gini');
  const [addModeClass, setAddModeClass] = useState<0 | 1>(0);

  // Visual Toggles & Bidirectional Interactive Inspection
  const [showRegions, setShowRegions] = useState<boolean>(true);
  const [showLaserGlow, setShowLaserGlow] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [activeTab, setActiveTab] = useState<'scan' | 'confusion' | 'rules'>('scan');

  // History Snapshots for Timeline Stepper
  const [snapshots, setSnapshots] = useState<TreeSnapshot[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  // Handle Preset change
  const handleSelectPreset = (p: DatasetPreset) => {
    setPreset(p);
    let pts: Point[];
    switch (p) {
      case 'xor':
        pts = generateXORDataset();
        break;
      case 'moons':
        pts = generateMoonsDataset();
        break;
      case 'circles':
        pts = generateCirclesDataset();
        break;
      case 'diagonal':
        pts = generateDiagonalDataset();
        break;
      case 'blobs':
        pts = generateBlobsDataset();
        break;
      case 'overfit':
        pts = generateOverfittingTrapDataset();
        break;
    }
    setPoints(pts);
    setHoveredNode(null);
    setSelectedNode(null);
    if (config.soundEnabled) audio.playSuccess();
  };

  // Re-seed dataset
  const handleReseed = () => {
    const seed = Math.floor(Math.random() * 999999);
    let pts: Point[];
    switch (preset) {
      case 'xor':
        pts = generateXORDataset(seed);
        break;
      case 'moons':
        pts = generateMoonsDataset(seed);
        break;
      case 'circles':
        pts = generateCirclesDataset(seed);
        break;
      case 'diagonal':
        pts = generateDiagonalDataset(seed);
        break;
      case 'blobs':
        pts = generateBlobsDataset(seed);
        break;
      case 'overfit':
        pts = generateOverfittingTrapDataset(seed);
        break;
    }
    setPoints(pts);
    setHoveredNode(null);
    setSelectedNode(null);
    if (config.soundEnabled) audio.playClick();
  };

  // Rebuild Snapshots on points, maxDepth, or criterion changes
  useEffect(() => {
    const snaps = buildTreeSnapshots(points, maxDepth, criterion, language);
    setSnapshots(snaps);
    setCurrentStepIdx(snaps.length - 1);
  }, [points, maxDepth, criterion, language]);

  const activeSnapshot = useMemo(() => {
    return (
      snapshots[currentStepIdx] ||
      snapshots[0] || {
        step: 0,
        tree: {
          id: 'root',
          depth: 0,
          box: { minX: 0, maxX: 10, minY: 0, maxY: 10 },
          pointIds: points.map((p) => p.id),
          numClass0: points.filter((p) => p.cls === 0).length,
          numClass1: points.filter((p) => p.cls === 1).length,
          impurity: 0.5,
          predictedClass: 0,
          isLeaf: true,
        },
        leaves: [],
        phase: 'Root',
        totalImpurity: 0.5,
        accuracy: 50,
      }
    );
  }, [snapshots, currentStepIdx, points]);

  // Candidate Split Scan Curve for active/selected node
  const scanData = useMemo(() => {
    const targetNode = selectedNode || activeSnapshot.tree;

    const nodePoints = targetNode.pointIds
      .map((id) => points.find((p) => p.id === id)!)
      .filter(Boolean);

    const axis = targetNode.splitAxis || 'x';
    const sorted = [...nodePoints].sort((a, b) => (axis === 'x' ? a.x - b.x : a.y - b.y));

    const curve: { thresh: number; gain: number }[] = [];
    const parentImp = targetNode.impurity;

    for (let i = 0; i < sorted.length - 1; i++) {
      const vA = axis === 'x' ? sorted[i].x : sorted[i].y;
      const vB = axis === 'x' ? sorted[i + 1].x : sorted[i + 1].y;
      if (vA === vB) continue;
      const thresh = (vA + vB) / 2;

      const left = sorted.slice(0, i + 1);
      const right = sorted.slice(i + 1);

      const l0 = left.filter((p) => p.cls === 0).length;
      const l1 = left.length - l0;
      const r0 = right.filter((p) => p.cls === 0).length;
      const r1 = right.length - r0;

      const gL = calculateImpurity(l0, l1, criterion);
      const gR = calculateImpurity(r0, r1, criterion);

      const splitImp = (left.length / nodePoints.length) * gL + (right.length / nodePoints.length) * gR;
      const gain = Math.max(0, parentImp - splitImp);
      curve.push({ thresh: Number(thresh.toFixed(2)), gain: Number(gain.toFixed(4)) });
    }

    return { axis, curve, bestThresh: targetNode.threshold ?? (curve[0]?.thresh || 5) };
  }, [activeSnapshot, selectedNode, points, criterion]);

  // Confusion Matrix
  const confusionMatrix = useMemo(() => {
    let tp = 0,
      fp = 0,
      tn = 0,
      fn = 0;

    points.forEach((p) => {
      let cur = activeSnapshot.tree;
      while (!cur.isLeaf) {
        if (cur.splitAxis === 'x') {
          cur = p.x <= (cur.threshold ?? 5) ? cur.left! : cur.right!;
        } else {
          cur = p.y <= (cur.threshold ?? 5) ? cur.left! : cur.right!;
        }
      }
      const pred = cur.predictedClass;
      if (p.cls === 1 && pred === 1) tp++;
      else if (p.cls === 0 && pred === 1) fp++;
      else if (p.cls === 0 && pred === 0) tn++;
      else if (p.cls === 1 && pred === 0) fn++;
    });

    const precision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 0;
    const recall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return { tp, fp, tn, fn, precision, recall, f1 };
  }, [points, activeSnapshot]);

  // Decision Rules List
  const decisionRules = useMemo(() => {
    const rules: { rule: string; class: 0 | 1; count: number; purity: number }[] = [];

    function traverse(node: TreeNode, path: string[]) {
      if (node.isLeaf) {
        const total = node.numClass0 + node.numClass1;
        const pureCount = node.predictedClass === 0 ? node.numClass0 : node.numClass1;
        const purity = total > 0 ? (pureCount / total) * 100 : 100;
        const ruleText = path.length > 0 ? path.join(' AND ') : 'ALL';
        rules.push({
          rule: ruleText,
          class: node.predictedClass,
          count: total,
          purity: Number(purity.toFixed(0)),
        });
        return;
      }
      if (node.left && node.right) {
        const condL = `${node.splitAxis?.toUpperCase()} ≤ ${node.threshold}`;
        const condR = `${node.splitAxis?.toUpperCase()} > ${node.threshold}`;
        traverse(node.left, [...path, condL]);
        traverse(node.right, [...path, condR]);
      }
    }

    traverse(activeSnapshot.tree, []);
    return rules;
  }, [activeSnapshot]);

  // --- 2D Canvas Feature Space Rendering ---

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const pad = 28;
    const plotW = width - pad * 2;
    const plotH = height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;

    // 1. Grid Lines
    ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#e4e4e7';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i += 2) {
      const cx = toCanvasX(i);
      const cy = toCanvasY(i);
      ctx.beginPath();
      ctx.moveTo(cx, pad);
      ctx.lineTo(cx, pad + plotH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, cy);
      ctx.lineTo(pad + plotW, cy);
      ctx.stroke();

      ctx.font = '9px monospace';
      ctx.fillStyle = theme === 'dark' ? '#71717a' : '#a1a1aa';
      ctx.fillText(i.toString(), cx - 3, pad + plotH + 15);
      if (i > 0) ctx.fillText(i.toString(), pad - 18, cy + 3);
    }

    // 2. Leaf Hyper-Rectangle Partitions & Decision Shading
    const leaves = activeSnapshot.leaves || [];
    if (showRegions) {
      leaves.forEach((leaf) => {
        const rx = toCanvasX(leaf.box.minX);
        const ry = toCanvasY(leaf.box.maxY);
        const rw = ((leaf.box.maxX - leaf.box.minX) / 10) * plotW;
        const rh = ((leaf.box.maxY - leaf.box.minY) / 10) * plotH;

        const total = leaf.numClass0 + leaf.numClass1;
        const purity = total > 0 ? (leaf.predictedClass === 0 ? leaf.numClass0 : leaf.numClass1) / total : 0.5;

        ctx.fillStyle =
          leaf.predictedClass === 0
            ? theme === 'dark'
              ? `rgba(56, 189, 248, ${0.08 + purity * 0.12})`
              : `rgba(2, 132, 199, ${0.05 + purity * 0.1})`
            : theme === 'dark'
            ? `rgba(245, 158, 11, ${0.08 + purity * 0.12})`
            : `rgba(217, 119, 6, ${0.05 + purity * 0.1})`;
        ctx.fillRect(rx, ry, rw, rh);
      });
    }

    // 3. Highlight currently hovered node bounding box (Two-way synchronization)
    if (hoveredNode) {
      const hx = toCanvasX(hoveredNode.box.minX);
      const hy = toCanvasY(hoveredNode.box.maxY);
      const hw = ((hoveredNode.box.maxX - hoveredNode.box.minX) / 10) * plotW;
      const hh = ((hoveredNode.box.maxY - hoveredNode.box.minY) / 10) * plotH;

      ctx.save();
      ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
      ctx.fillRect(hx, hy, hw, hh);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(hx, hy, hw, hh);
      ctx.restore();
    }

    // 4. Localized Laser Partition Cut Lines (Recursive Laser Blades)
    function drawLaserSplits(node: TreeNode, c: CanvasRenderingContext2D) {
      if (node.isLeaf || !node.splitAxis || node.threshold === undefined) return;

      const isCurrentActive = activeSnapshot.activeNodeId === node.id;
      const isSplitX = node.splitAxis === 'x';
      const color = isSplitX ? '#f43f5e' : '#a855f7';

      if (isSplitX) {
        const lx = toCanvasX(node.threshold);
        const topY = toCanvasY(node.box.maxY);
        const bottomY = toCanvasY(node.box.minY);

        if (showLaserGlow) {
          c.beginPath();
          c.moveTo(lx, topY);
          c.lineTo(lx, bottomY);
          c.strokeStyle = isSplitX ? 'rgba(244, 63, 94, 0.35)' : 'rgba(168, 85, 247, 0.35)';
          c.lineWidth = isCurrentActive ? 10 : 7;
          c.stroke();
        }

        c.beginPath();
        c.moveTo(lx, topY);
        c.lineTo(lx, bottomY);
        c.strokeStyle = color;
        c.lineWidth = isCurrentActive ? 2.8 : 2.0;
        c.stroke();

        c.font = 'bold 10px monospace';
        c.fillStyle = color;
        c.fillText(`X₁=${node.threshold}`, lx + 4, topY + 12);
      } else {
        const ly = toCanvasY(node.threshold);
        const leftX = toCanvasX(node.box.minX);
        const rightX = toCanvasX(node.box.maxX);

        if (showLaserGlow) {
          c.beginPath();
          c.moveTo(leftX, ly);
          c.lineTo(rightX, ly);
          c.strokeStyle = 'rgba(168, 85, 247, 0.35)';
          c.lineWidth = isCurrentActive ? 10 : 7;
          c.stroke();
        }

        c.beginPath();
        c.moveTo(leftX, ly);
        c.lineTo(rightX, ly);
        c.strokeStyle = color;
        c.lineWidth = isCurrentActive ? 2.8 : 2.0;
        c.stroke();

        c.font = 'bold 10px monospace';
        c.fillStyle = color;
        c.fillText(`X₂=${node.threshold}`, leftX + 4, ly - 5);
      }

      if (node.left) drawLaserSplits(node.left, c);
      if (node.right) drawLaserSplits(node.right, c);
    }

    drawLaserSplits(activeSnapshot.tree, ctx);

    // 5. Data Observation Points
    const hoveredPointIds = new Set(hoveredNode ? hoveredNode.pointIds : []);

    points.forEach((p) => {
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);
      const isClass0 = p.cls === 0;
      const color = isClass0 ? '#38bdf8' : '#f59e0b';

      let cur = activeSnapshot.tree;
      while (!cur.isLeaf) {
        if (cur.splitAxis === 'x') {
          cur = p.x <= (cur.threshold ?? 5) ? cur.left! : cur.right!;
        } else {
          cur = p.y <= (cur.threshold ?? 5) ? cur.left! : cur.right!;
        }
      }
      const isMisclassified = cur.predictedClass !== p.cls;
      const isInsideHoveredNode = hoveredPointIds.has(p.id);

      // Extra highlight if point belongs to hovered node
      if (isInsideHoveredNode) {
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Outer glow halo
      ctx.beginPath();
      ctx.arc(cx, cy, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = isClass0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(245, 158, 11, 0.2)';
      ctx.fill();

      // Main circular dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Red border on misclassified point
      if (isMisclassified) {
        ctx.beginPath();
        ctx.arc(cx, cy, 7.5, 0, Math.PI * 2);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    });
  }, [activeSnapshot, points, theme, showRegions, showLaserGlow, hoveredNode]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Pointer interactions on canvas (Hover detection, click to add, right-click to delete)
  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 28;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
    const x = ((px - pad) / plotW) * 10;
    const y = (1 - (py - pad) / plotH) * 10;

    if (x >= 0 && x <= 10 && y >= 0 && y <= 10) {
      const leaf = activeSnapshot.leaves.find(
        (l) => x >= l.box.minX && x <= l.box.maxX && y >= l.box.minY && y <= l.box.maxY
      );
      if (leaf !== hoveredNode) {
        setHoveredNode(leaf || null);
      }
    } else {
      if (hoveredNode !== null) setHoveredNode(null);
    }
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 28;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;

    const newX = Number(Math.max(0.6, Math.min(9.4, ((px - pad) / plotW) * 10)).toFixed(2));
    const newY = Number(Math.max(0.6, Math.min(9.4, (1 - (py - pad) / plotH) * 10)).toFixed(2));

    const nextId = points.length > 0 ? Math.max(...points.map((p) => p.id)) + 1 : 1;
    setPoints((prev) => [...prev, { id: nextId, x: newX, y: newY, cls: addModeClass }]);
    if (config.soundEnabled) audio.playClick();
  };

  const handleCanvasContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pad = 28;
    const plotW = rect.width - pad * 2;
    const plotH = rect.height - pad * 2;
    const toCanvasX = (x: number) => pad + (x / 10) * plotW;
    const toCanvasY = (y: number) => pad + (1 - y / 10) * plotH;

    let targetIdx: number | null = null;
    points.forEach((p, idx) => {
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);
      if (Math.hypot(px - cx, py - cy) <= 14) {
        targetIdx = idx;
      }
    });

    if (targetIdx !== null && points.length > 4) {
      setPoints((prev) => prev.filter((_, idx) => idx !== targetIdx));
      if (config.soundEnabled) audio.playWarning();
    }
  };

  // SVG Decision Tree Layout
  const { layoutNodes: treeLayout, totalWidth: svgWidth } = useMemo(() => {
    return layoutTidyTree(activeSnapshot.tree, 96, 28, 75);
  }, [activeSnapshot.tree]);

  return (
    <div className="flex flex-col gap-5 select-none w-full">
      {/* Pre-Canvas Intuitive Briefing & Mental Model */}
      {!compact && <PreCanvasBriefing content={TREE_TIER_CONTENT} />}

      {/* Top Parameter Toolbar: Presets + Depth + Impurity Criterion */}
      <div className="flex flex-col gap-3.5 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular shadow-xs w-full">
        {/* Row 1: Datasets */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              {language === 'ar' ? 'البيئة:' : 'Dataset:'}
            </span>
            <button
              onClick={() => handleSelectPreset('xor')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                preset === 'xor'
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)] font-bold shadow-xs'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              XOR Checkerboard
            </button>
            <button
              onClick={() => handleSelectPreset('moons')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                preset === 'moons'
                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 font-bold shadow-xs'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              Two Moons
            </button>
            <button
              onClick={() => handleSelectPreset('circles')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                preset === 'circles'
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold shadow-xs'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              Concentric Rings
            </button>
            <button
              onClick={() => handleSelectPreset('diagonal')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                preset === 'diagonal'
                  ? 'border-rose-500 bg-rose-500/15 text-rose-400 font-bold shadow-xs'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              Diagonal Staircase
            </button>
            <button
              onClick={() => handleSelectPreset('blobs')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                preset === 'blobs'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 font-bold shadow-xs'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              Gaussian Blobs
            </button>
            <button
              onClick={() => handleSelectPreset('overfit')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                preset === 'overfit'
                  ? 'border-red-500 bg-red-500/20 text-red-400 font-bold shadow-xs'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              Overfitting Trap
            </button>
          </div>

          <button
            onClick={handleReseed}
            title="Re-roll dataset points"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] transition-all active:scale-95"
          >
            <RefreshCw size={12} className="text-[var(--math-vector)]" />
            <span>{language === 'ar' ? 'توليد جديد' : 'Re-Seed'}</span>
          </button>
        </div>

        {/* Row 2: Hyperparameters & Add Point Class */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-[var(--border-subtle)]">
          {/* Max Depth */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              Max Depth:
            </span>
            {[1, 2, 3, 4].map((d) => (
              <button
                key={d}
                onClick={() => setMaxDepth(d)}
                className={`w-7 h-7 text-xs font-mono font-bold rounded-lg border transition-all ${
                  maxDepth === d
                    ? 'border-[var(--math-gradient)] bg-[var(--math-gradient)]/20 text-[var(--math-gradient)] shadow-xs scale-105'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Splitting Criterion */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              Criterion:
            </span>
            <button
              onClick={() => setCriterion('gini')}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                criterion === 'gini'
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/20 text-[var(--math-vector)] font-bold'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              Gini Impurity
            </button>
            <button
              onClick={() => setCriterion('entropy')}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                criterion === 'entropy'
                  ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/20 text-[var(--math-prediction)] font-bold'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              Shannon Entropy
            </button>
          </div>

          {/* Add Point Class */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider me-1">
              {language === 'ar' ? 'إضافة نقطة:' : 'Add Class:'}
            </span>
            <button
              onClick={() => setAddModeClass(0)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
                addModeClass === 0
                  ? 'border-sky-500 bg-sky-500/20 text-sky-400 font-bold'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              Class 0 (Blue)
            </button>
            <button
              onClick={() => setAddModeClass(1)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
                addModeClass === 1
                  ? 'border-amber-500 bg-amber-500/20 text-amber-400 font-bold'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              Class 1 (Amber)
            </button>
          </div>
        </div>
      </div>

      {/* 1. Expansive 2D Laser Feature Space Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-app)] overflow-hidden shadow-inner p-3 flex flex-col w-full">
        <div className="flex items-center justify-between pb-2 px-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
            <span>{language === 'ar' ? 'فضاء الخصائص والليزر (2D Feature Space)' : '2D Feature Space & Laser Partitions'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRegions(!showRegions)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-colors ${
                showRegions
                  ? 'border-[var(--math-vector)] bg-[var(--math-vector)]/15 text-[var(--math-vector)]'
                  : 'border-transparent text-[var(--text-tertiary)]'
              }`}
            >
              Shaded Regions
            </button>
            <button
              onClick={() => setShowLaserGlow(!showLaserGlow)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-colors ${
                showLaserGlow
                  ? 'border-rose-500 bg-rose-500/15 text-rose-400'
                  : 'border-transparent text-[var(--text-tertiary)]'
              }`}
            >
              Laser Glow
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          onPointerMove={handleCanvasPointerMove}
          onPointerLeave={() => setHoveredNode(null)}
          onPointerDown={handleCanvasPointerDown}
          onContextMenu={handleCanvasContextMenu}
          className="w-full h-88 md:h-[400px] rounded-xl cursor-crosshair touch-none"
        />

        {/* Floating Instructions Overlay */}
        <div className="absolute bottom-6 start-6 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-tertiary)] shadow-xs">
          {language === 'ar'
            ? 'انقر لإضافة نقاط • انقر يمين لحذف نقطة • مرر فوق الأوراق لتمييزها'
            : 'Click to add points • Right-click to delete • Hover regions to sync with tree'}
        </div>

        {/* Top-Right Telemetry Badge */}
        <div className="absolute top-12 end-6 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono shadow-sm">
          <span className="text-[var(--text-tertiary)]">Accuracy:</span>
          <span className="text-emerald-400 font-bold tabular-nums">
            {activeSnapshot.accuracy.toFixed(1)}%
          </span>
          <div className="w-px h-3 bg-[var(--border-subtle)]" />
          <span className="text-[var(--text-tertiary)]">Total Impurity:</span>
          <span className="text-rose-400 font-bold tabular-nums">
            {activeSnapshot.totalImpurity.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Step-by-Step Recursive CART Induction Stepper (Strictly Controlled Component) */}
      <TimelinePlaybackBar
        totalSteps={Math.max(1, snapshots.length - 1)}
        currentStep={currentStepIdx}
        stepPhase={activeSnapshot.phase}
        metricLabel={criterion === 'gini' ? 'Total Gini' : 'Entropy'}
        metricValue={activeSnapshot.totalImpurity}
        onStepChange={setCurrentStepIdx}
      />

      {/* 2. Expansive Hierarchical Decision Tree Flowchart (Zero Node Collisions) */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-xs p-4 flex flex-col w-full">
        <div className="flex items-center justify-between pb-3 px-1 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
            <GitBranch size={15} className="text-[var(--math-gradient)]" />
            <span>{language === 'ar' ? 'مخطط شجرة القرار الهرمية' : 'Hierarchical Decision Tree Flowchart'}</span>
          </div>
          <div className="text-xs font-mono text-[var(--text-tertiary)]">
            {activeSnapshot.leaves.length} Leaf Regions • Depth {maxDepth} • Hover to cross-highlight 2D space
          </div>
        </div>

        {/* Horizontally Scrollable Container for Non-Cramped Tree Display */}
        <div className="w-full h-84 md:h-96 overflow-x-auto overflow-y-hidden relative py-3 scrollbar-thin">
          <svg
            style={{ width: `${svgWidth}px`, height: '100%' }}
            viewBox={`0 0 ${svgWidth} ${Math.max(260, (maxDepth + 1) * 75 + 30)}`}
            className="overflow-visible"
          >
            {/* Connecting Branch Bezier Lines */}
            {treeLayout.map(({ node, x, y }) => {
              if (node.isLeaf || !node.left || !node.right) return null;
              const leftChild = treeLayout.find((ln) => ln.node.id === node.left!.id);
              const rightChild = treeLayout.find((ln) => ln.node.id === node.right!.id);
              if (!leftChild || !rightChild) return null;

              return (
                <g key={`branch-${node.id}`}>
                  {/* Left Branch */}
                  <path
                    d={`M ${x},${y + 22} C ${x},${(y + leftChild.y) / 2} ${leftChild.x},${(y + leftChild.y) / 2} ${leftChild.x},${leftChild.y - 22}`}
                    fill="none"
                    stroke={theme === 'dark' ? '#3f3f46' : '#d4d4d8'}
                    strokeWidth="1.8"
                  />
                  <text
                    x={(x + leftChild.x) / 2 - 14}
                    y={(y + leftChild.y) / 2}
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="#38bdf8"
                    fontWeight="bold"
                  >
                    Yes
                  </text>

                  {/* Right Branch */}
                  <path
                    d={`M ${x},${y + 22} C ${x},${(y + rightChild.y) / 2} ${rightChild.x},${(y + rightChild.y) / 2} ${rightChild.x},${rightChild.y - 22}`}
                    fill="none"
                    stroke={theme === 'dark' ? '#3f3f46' : '#d4d4d8'}
                    strokeWidth="1.8"
                  />
                  <text
                    x={(x + rightChild.x) / 2 + 6}
                    y={(y + rightChild.y) / 2}
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="#f59e0b"
                    fontWeight="bold"
                  >
                    No
                  </text>
                </g>
              );
            })}

            {/* Tree Node Cards */}
            {treeLayout.map(({ node, x, y }) => {
              const isHovered = hoveredNode?.id === node.id;
              const isSelected = selectedNode?.id === node.id;
              const isLeaf = node.isLeaf;

              const cardW = 96;
              const cardH = 44;

              const nodeColor = isLeaf
                ? node.predictedClass === 0
                  ? '#38bdf8'
                  : '#f59e0b'
                : node.splitAxis === 'x'
                ? '#f43f5e'
                : '#a855f7';

              return (
                <g
                  key={node.id}
                  transform={`translate(${x - cardW / 2}, ${y - cardH / 2})`}
                  className="cursor-pointer transition-transform duration-150 hover:scale-105"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node)}
                >
                  <rect
                    width={cardW}
                    height={cardH}
                    rx="8"
                    fill={theme === 'dark' ? '#18181b' : '#ffffff'}
                    stroke={isHovered || isSelected ? '#f59e0b' : nodeColor}
                    strokeWidth={isHovered || isSelected ? 2.5 : 1.5}
                    className="shadow-xs"
                  />

                  {/* Top Split Condition or Class Badge */}
                  <text
                    x={cardW / 2}
                    y="14"
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={nodeColor}
                  >
                    {isLeaf
                      ? `Class ${node.predictedClass}`
                      : `${node.splitAxis?.toUpperCase()} ≤ ${node.threshold}`}
                  </text>

                  {/* Middle Sample Distribution [N0, N1] */}
                  <text
                    x={cardW / 2}
                    y="27"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fill={theme === 'dark' ? '#a1a1aa' : '#71717a'}
                  >
                    [{node.numClass0}, {node.numClass1}] (N={node.numClass0 + node.numClass1})
                  </text>

                  {/* Bottom Impurity Metric */}
                  <text
                    x={cardW / 2}
                    y="38"
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="monospace"
                    fill={node.impurity === 0 ? '#10b981' : theme === 'dark' ? '#71717a' : '#a1a1aa'}
                    fontWeight={node.impurity === 0 ? 'bold' : 'normal'}
                  >
                    {criterion === 'gini' ? 'Gini' : 'H'}: {node.impurity.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3. Expanded Analytics & Inspection Panels */}
      <div className="flex flex-col gap-3.5 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] specular shadow-xs w-full">
        {/* Tab Headers */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                activeTab === 'scan'
                  ? 'bg-[var(--math-gradient)] text-black font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <TrendingDown size={13} />
              <span>{language === 'ar' ? 'مسح كسب المعلومات (ΔI)' : 'Threshold Split Scan (ΔI)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('confusion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                activeTab === 'confusion'
                  ? 'bg-[var(--math-gradient)] text-black font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <Activity size={13} />
              <span>{language === 'ar' ? 'مصفوفة الارتباك والمقاييس' : 'Confusion Matrix & Metrics'}</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                activeTab === 'rules'
                  ? 'bg-[var(--math-gradient)] text-black font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <Sliders size={13} />
              <span>{language === 'ar' ? 'قواعد القرار المستنبطة' : 'Extracted Decision Rules'}</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[var(--text-tertiary)] hidden sm:block">
            {language === 'ar' ? 'خوارزمية CART للاستقراء التكراري' : 'Recursive Binary Splitting (CART)'}
          </div>
        </div>

        {/* Tab 1: Candidate Threshold Scan Curve */}
        {activeTab === 'scan' && (
          <div className="flex flex-col gap-3 pt-1">
            <div className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
              {language === 'ar'
                ? `مسح كسب المعلومات على المحور ${scanData.axis.toUpperCase()}: تبحث خوارزمية CART عن العتبة θ* التي تحقق أعلى قمة لكسب المعلومات (أقصى انخفاض للشوائب).`
                : `Scanning Information Gain ΔI along axis ${scanData.axis.toUpperCase()}: The greedy CART algorithm scans sorted feature thresholds to locate the optimal peak θ*.`}
            </div>

            <div className="h-36 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0, 25, 50, 75, 100].map((gy) => (
                  <line
                    key={gy}
                    x1="20"
                    y1={gy}
                    x2="480"
                    y2={gy}
                    stroke={theme === 'dark' ? '#27272a' : '#f4f4f5'}
                    strokeWidth="1"
                  />
                ))}

                {scanData.curve.length > 1 &&
                  (() => {
                    const maxGain = Math.max(...scanData.curve.map((c) => c.gain), 0.01);
                    const pts = scanData.curve.map((c) => {
                      const x = (c.thresh / 10) * 460 + 20;
                      const y = 90 - (c.gain / maxGain) * 80;
                      return { ...c, x, y };
                    });

                    const pathD = pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), '');
                    const areaD = `${pathD} L ${pts[pts.length - 1].x},95 L ${pts[0].x},95 Z`;

                    const peak = pts.reduce((p, c) => (c.gain > p.gain ? c : p), pts[0]);

                    return (
                      <>
                        <path d={areaD} fill="url(#gainGradient)" />
                        <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" />

                        <line
                          x1={peak.x}
                          y1="10"
                          x2={peak.x}
                          y2="95"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <circle cx={peak.x} cy={peak.y} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                        <text
                          x={peak.x}
                          y="8"
                          textAnchor="middle"
                          fontSize="9.5"
                          fontFamily="monospace"
                          fontWeight="bold"
                          fill="#f59e0b"
                        >
                          θ*={peak.thresh} (ΔI=+{peak.gain.toFixed(3)})
                        </text>
                      </>
                    );
                  })()}
              </svg>
            </div>
          </div>
        )}

        {/* Tab 2: Confusion Matrix & Metrics */}
        {activeTab === 'confusion' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">Accuracy</span>
              <span className="text-xl font-mono font-bold text-emerald-400 tabular-nums">
                {activeSnapshot.accuracy.toFixed(1)}%
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                {confusionMatrix.tp + confusionMatrix.tn} / {points.length} correct
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">Precision</span>
              <span className="text-xl font-mono font-bold text-[var(--math-vector)] tabular-nums">
                {confusionMatrix.precision.toFixed(1)}%
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                TP / (TP + FP)
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">Recall</span>
              <span className="text-xl font-mono font-bold text-[var(--math-prediction)] tabular-nums">
                {confusionMatrix.recall.toFixed(1)}%
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                TP / (TP + FN)
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">F1 Score</span>
              <span className="text-xl font-mono font-bold text-[var(--math-gradient)] tabular-nums">
                {confusionMatrix.f1.toFixed(1)}%
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                Harmonic Mean
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Extracted Decision Rules */}
        {activeTab === 'rules' && (
          <div className="flex flex-col gap-2 pt-1 max-h-48 overflow-y-auto">
            {decisionRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-app)] text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      rule.class === 0 ? 'bg-sky-400' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-[var(--text-primary)]">
                    <span className="text-rose-400 font-bold">IF</span> {rule.rule}{' '}
                    <span className="text-emerald-400 font-bold">THEN</span> Class {rule.class}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-tertiary)]">
                  <span>Purity: {rule.purity}%</span>
                  <span>{rule.count} pts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post-Canvas Mathematical & Code Consolidation */}
      {!compact && <PostCanvasConsolidation content={TREE_TIER_CONTENT} />}
    </div>
  );
};
