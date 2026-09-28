import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Clock,
  Brain,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Check,
  X,
  Target,
  Flame,
  Filter,
} from 'lucide-react';
import { useOkvirStore } from '@/lib/store';
import { tr } from '@/lib/i18n';
import { createNewCard, updateCard, retrievability, getRatingLabel } from '@/lib/fsrs';
import { KaTeXMath } from '@/components/common/KaTeXMath';
import { audio } from '@/lib/audio';
import type { FSRSState, Rating } from '@/lib/fsrs';

export type DrillFormat = 'flashcard' | 'mcq' | 'boolean' | 'formula_fill';

export interface DrillOption {
  text: string;
  textAr?: string;
  formula?: string;
  correct: boolean;
  explanation: string;
  explanationAr: string;
}

export interface CalibrationDrillItem {
  id: string;
  format: DrillFormat;
  trackId: 'math' | 'data' | 'econometrics' | 'deep-learning';
  concept: string;
  conceptAr: string;
  prompt: string;
  promptAr: string;

  // Flashcard specific
  solutionFormula?: string;
  solution?: string;
  solutionAr?: string;

  // MCQ & Formula Fill specific
  options?: DrillOption[];
  blankDisplayFormula?: string;
  filledDisplayFormula?: string;

  // Boolean specific (True/False or Yes/No)
  booleanAnswer?: boolean;
  booleanLabels?: {
    trueText: { en: string; ar: string };
    falseText: { en: string; ar: string };
  };
  booleanFormula?: string;
  booleanExplanation?: {
    en: string;
    ar: string;
  };
}

const FOUNDATIONAL_DRILL_ITEMS: CalibrationDrillItem[] = [
  // 1. Flashcard: Gauss-Markov BLUE Theorem
  {
    id: 'drill-gauss-markov',
    format: 'flashcard',
    trackId: 'econometrics',
    concept: 'Gauss-Markov Theorem (BLUE)',
    conceptAr: 'مبرهنة غاوس-ماركوف (BLUE)',
    prompt: 'Under what conditions is the OLS estimator the Best Linear Unbiased Estimator (BLUE)?',
    promptAr: 'تحت أي شروط يكون مقدر المربعات الصغرى (OLS) هو أفضل مقدر خطي غير متحيّز (BLUE)؟',
    solutionFormula: 'E[\\epsilon|X] = 0, \\quad \\text{Var}(\\epsilon|X) = \\sigma^2 I',
    solution: 'Strict exogeneity (zero conditional mean of errors), spherical error covariance (homoscedasticity + no autocorrelation), and full column rank of regressor matrix X.',
    solutionAr: 'التجانس الخارجي التام (المتوسط الشرطي الصفري للبواقي)، مصفوفة تباين كروية (ثبات تباين الأخطاء وغياب الارتباط الذاتي)، ورتبة عمودية كاملة لمصفوفة المتغيرات المستقلة X.',
  },

  // 2. Boolean (Yes/No): Multicollinearity vs Unbiasedness
  {
    id: 'drill-multicollinearity-bias',
    format: 'boolean',
    trackId: 'econometrics',
    concept: 'Multicollinearity & Estimator Bias',
    conceptAr: 'التعدد الخطي وانحياز المقدر',
    prompt: 'Does severe multicollinearity between predictors cause the OLS coefficient estimator β̂ to become biased?',
    promptAr: 'هل يتسبب التعدد الخطي الشديد بين المتغيرات في جعل مقدر معاملات OLS (β̂) غير متحيّز (Biased)؟',
    booleanAnswer: false,
    booleanLabels: {
      trueText: { en: 'Yes — It introduces systematic bias', ar: 'نعم — يسبب انحيازاً منتظماً' },
      falseText: { en: 'No — OLS remains unbiased, but variance inflates', ar: 'لا — يبقى المقدر غير متحيّز ولكن تباينه يتضخم' },
    },
    booleanFormula: 'E[\\hat{\\beta}] = \\beta, \\quad \\text{Var}(\\hat{\\beta}_j) = \\frac{\\sigma^2}{\\sum(x_{ij}-\\bar{x}_j)^2 (1 - R_j^2)}',
    booleanExplanation: {
      en: 'Multicollinearity does NOT violate E[ε|X]=0, so OLS remains strictly unbiased. However, (1 - Rⱼ²) approaches zero, causing the variance (and standard errors) to explode to infinity.',
      ar: 'التعدد الخطي لا ينتهك فرضية E[ε|X]=0، وبالتالي يظل مقدر OLS غير متحيّز تماماً. لكن المشكلة تكمن في اقتراب (1 - Rⱼ²) من الصفر، مما يؤدي إلى تضخم التباين والأخطاء المعيارية بشكل انفجاري.',
    },
  },

  // 3. Formula Fill: Normal Equations Matrix Solution
  {
    id: 'drill-normal-equations-fill',
    format: 'formula_fill',
    trackId: 'econometrics',
    concept: 'Normal Equations Projection Token',
    conceptAr: 'معادلات الإسقاط الطبيعية',
    prompt: 'Complete the analytical closed-form OLS estimator for vector β̂:',
    promptAr: 'أكمل الصيغة التحليلية المغلقة لمقدر المربعات الصغرى OLS لمتجه المعاملات β̂:',
    blankDisplayFormula: '\\hat{\\beta} = \\; [\\;?\\;] \\; X^T y',
    filledDisplayFormula: '\\hat{\\beta} = (X^T X)^{-1} X^T y',
    options: [
      {
        text: '(XᵀX)⁻¹',
        formula: '(X^T X)^{-1}',
        correct: true,
        explanation: 'Setting the gradient ∂SSR/∂β = -2Xᵀ(y - Xβ) = 0 yields (XᵀX)β̂ = Xᵀy. Inverting gives β̂ = (XᵀX)⁻¹Xᵀy.',
        explanationAr: 'بمساواة التدرج بالصفر نحصل على (XᵀX)β̂ = Xᵀy، وبضرب الطرفين بالمعكوس نحصل على (XᵀX)⁻¹Xᵀy.',
      },
      {
        text: '(XXᵀ)⁻¹',
        formula: '(X X^T)^{-1}',
        correct: false,
        explanation: 'XXᵀ has dimension N × N (observations) and is typically rank-deficient when N > p.',
        explanationAr: 'المصفوفة XXᵀ ذات بُعد N × N وتكون غير قابلة للعكس عادة عندما يكون عدد المشاهدات أكبر من المتغيرات.',
      },
      {
        text: 'Xᵀ (XᵀX)⁻¹',
        formula: 'X^T (X^T X)^{-1}',
        correct: false,
        explanation: 'Dimension mismatch: multiplying Xᵀ on the left produces incompatible matrix dimensions for β̂.',
        explanationAr: 'عدم تطابق في الأبعاد المصفوفية: ضرب Xᵀ من اليسار ينتج أبعاداً غير متوافقة مع متجه β̂.',
      },
      {
        text: '(XᵀX)',
        formula: '(X^T X)',
        correct: false,
        explanation: 'Missing the matrix inverse operation needed to solve the linear system.',
        explanationAr: 'تفتقر إلى عملية قَلْب المصفوفة (المعكوس) اللازمة لحل النظام الخطي.',
      },
    ],
  },

  // 4. MCQ: L1 Lasso vs L2 Ridge Sparsity Geometry
  {
    id: 'drill-l1-sparsity-mcq',
    format: 'mcq',
    trackId: 'econometrics',
    concept: 'L1 vs L2 Regularization Geometry',
    conceptAr: 'هندسة الانتظام: L1 مقابل L2',
    prompt: 'Why does L1 Lasso regularization induce exact zero coefficients (feature sparsity) while L2 Ridge only shrinks coefficients toward zero?',
    promptAr: 'لماذا تنتج طريقة L1 (Lasso) معاملات تساوي صفراً تماماً (تناثر الخصائص) بينما تكتفي طريقة L2 (Ridge) بتقليص المعاملات دون تصفيرها؟',
    options: [
      {
        text: 'L1 norm diamond contour has non-differentiable vertices aligned with coordinate axes.',
        textAr: 'محدد كرة معيار L1 له رؤوس مدببة غير قابلة للاشتقاق تقع مباشرة على محاور الإحداثيات.',
        correct: true,
        explanation: 'The elliptical loss contours first touch the L1 diamond constraint at its sharp corners where wᵢ=0. L2 is smooth and spherical, touching tangentially almost never exactly on an axis.',
        explanationAr: 'خطوط كنتور الخسارة الإهليلجية تلامس أولاً قمم معيار L1 الحادة الواقعة على محاور الإحداثيات (wᵢ=0). أما كرة L2 فهي ملساء وتتلامس مع الكنتور عند نقاط مماسية لا تقع على الصفر.',
      },
      {
        text: 'L1 loss eliminates the intercept parameter completely.',
        textAr: 'دالة خسارة L1 تلغي معامل التقاطع تماماً.',
        correct: false,
        explanation: 'The intercept is generally unpenalized in both Ridge and Lasso.',
        explanationAr: 'معامل التقاطع عادة لا يخضع للعقوبة في كلتا الطريقتين.',
      },
      {
        text: 'L2 Ridge uses stochastic gradient descent which cannot reach zero.',
        textAr: 'طريقة L2 تستخدم الانحدار العشوائي الذي يعجز عن بلوغ الصفر.',
        correct: false,
        explanation: 'Ridge has an analytical closed-form solution (XᵀX + λI)⁻¹Xᵀy that is non-zero.',
        explanationAr: 'طريقة ريدج لها حل تحليلي مغلق ومباشر ولا علاقة لذلك بطريقة التحسين.',
      },
      {
        text: 'L1 penalty penalizes large weights less severely than small weights.',
        textAr: 'عقوبة L1 تعاقب الأوزان الكبيرة بدرجة أقل من الأوزان الصغيرة.',
        correct: false,
        explanation: 'L1 applies a constant rate of penalty |w|, unlike L2 which applies a quadratic penalty w².',
        explanationAr: 'تطبق L1 عقوبة خطية ثابتة بمعدل ثابت على عكس L2 التي تعاقب بشكل تربيعي.',
      },
    ],
  },

  // 5. Flashcard: FSRS v5 Power Law Retention Formula
  {
    id: 'drill-fsrs-retrievability',
    format: 'flashcard',
    trackId: 'math',
    concept: 'FSRS v5 Retention Formula',
    conceptAr: 'معادلة التذكر FSRS v5',
    prompt: 'How does FSRS v5 model probability of recall R(t, S) as a function of elapsed time t and stability S?',
    promptAr: 'كيف تحسب خوارزمية FSRS v5 احتمالية الاسترجاع R(t, S) بدلالة الوقت المنقضي t وثبات الذاكرة S؟',
    solutionFormula: 'R(t, S) = \\left(1 + \\frac{19}{81} \\cdot \\frac{t}{S}\\right)^{-0.5}',
    solution: 'A power-law forgetting curve where memory stability S represents the exact interval in days when retrievability drops to 90% (R = 0.90).',
    solutionAr: 'منحنى نسيان وفق قانون القوة حيث يمثل ثبات الذاكرة S عدد الأيام الدقيق الذي تنخفض فيه احتمالية التذكر إلى 90%.',
  },

  // 6. MCQ: Curse of Dimensionality in Metric Spaces
  {
    id: 'drill-curse-dimensionality-mcq',
    format: 'mcq',
    trackId: 'data',
    concept: 'Curse of Dimensionality in KNN',
    conceptAr: 'معضلة الأبعاد في الفضاءات المترية',
    prompt: 'In high-dimensional metric spaces (D → ∞), what happens to the ratio between the distance to the furthest neighbor and the nearest neighbor?',
    promptAr: 'في الفضاءات المترية عالية الأبعاد (D → ∞)، ماذا يحدث للنسبة بين المسافة إلى أبعد جار والمسافة إلى أقرب جار؟',
    options: [
      {
        text: 'The contrast vanishes: (dist_max - dist_min) / dist_min → 0, making all points equidistant.',
        textAr: 'يتلاشى التباين وتؤول النسبة إلى الصفر، مما يجعل جميع النقاط متساوية البعد تقريباً.',
        correct: true,
        explanation: 'Beyer et al. (1999) proved that under mild assumptions in high dimensions, the variance of pairwise distances grows much slower than the mean, destroying distance metric discrimination.',
        explanationAr: 'أثبتت دراسات الفضاء المتري أنه مع زيادة الأبعاد، يقترب الفرق النسبي بين أبعد نقطة وأقرب نقطة من الصفر، مما يفقد مقاييس المسافة قدرتها على التمييز.',
      },
      {
        text: 'The nearest neighbor distance converges strictly to 0.',
        textAr: 'تقترب مسافة أقرب جار من الصفر المطلق.',
        correct: false,
        explanation: 'Distances actually grow with dimension: ||x|| ∝ √D.',
        explanationAr: 'المسافات تتسع في الواقع مع زيادة الأبعاد بمعدل يتناسب مع الجذر التربيعي للأبعاد.',
      },
      {
        text: 'Euclidean distance becomes equivalent to Cosine similarity.',
        textAr: 'تصبح المسافة الإقليدية مطابقة تماماً لتشابه جيب التمام.',
        correct: false,
        explanation: 'Cosine similarity measures angles; Euclidean measures magnitude as well.',
        explanationAr: 'تشابه جيب التمام يقيس الزوايا بينما تقيس المسافة الإقليدية المقادير أيضاً.',
      },
    ],
  },

  // 7. Boolean (True/False): Gradient Descent Step Size Stability
  {
    id: 'drill-gradient-step-bound',
    format: 'boolean',
    trackId: 'math',
    concept: 'Gradient Descent Stability Bound',
    conceptAr: 'حد الاستقرار لخوارزمية الانحدار التدرجي',
    prompt: 'For an L-Lipschitz smooth loss function, if learning rate η exceeds 2/L, is gradient descent mathematically guaranteed to diverge or oscillate uncontrollably on quadratic manifolds?',
    promptAr: 'لدالة خسارة ملساء بمحدد L-Lipschitz، إذا تجاوز معدل التعلم η القيمة 2/L، هل تتباعد خطوات الانحدار التدرجي أو تتذبذب بشكل متفجر حتماً؟',
    booleanAnswer: true,
    booleanLabels: {
      trueText: { en: 'True — Step size exceeds the contraction radius', ar: 'صحيح — يتجاوز حجم الخطوة نصف قطر الانكماش' },
      falseText: { en: 'False — Momentum can always stabilize it', ar: 'خطأ — يمكن للزخم تثبيته دائماً' },
    },
    booleanFormula: '\\eta < \\frac{2}{L} \\iff |1 - \\eta L| < 1',
    booleanExplanation: {
      en: 'The iteration matrix eigenvalue is (1 - ηλ). When η > 2/L, |1 - ηL| > 1, so the spectral radius exceeds unity, causing geometric amplification and exponential divergence.',
      ar: 'القيمة الذاتية لمصفوفة التكرار هي (1 - ηλ). عندما يتجاوز η القيمة 2/L تصبح القيمة المطلقة أكبر من 1، مما يضخم الأخطاء أسياً في كل خطوة.',
    },
  },

  // 8. Formula Fill / MCQ: Transformer Scaled Dot-Product Attention Divisor
  {
    id: 'drill-attention-scaling',
    format: 'formula_fill',
    trackId: 'deep-learning',
    concept: 'Scaled Dot-Product Attention Divisor',
    conceptAr: 'معامل تحجيم الانتباه في المحولات',
    prompt: 'Identify the scaling factor in Vaswani et al. (2017) Scaled Dot-Product Attention:',
    promptAr: 'حدد معامل التحجيم الرياضي في خوارزمية الانتباه لشبكات المحولات (Transformers):',
    blankDisplayFormula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{[\\;?\\;]}\\right) V',
    filledDisplayFormula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V',
    options: [
      {
        text: '√d_k',
        formula: '\\sqrt{d_k}',
        correct: true,
        explanation: 'For independent zero-mean unit-variance components, the dot-product has mean 0 and variance d_k. Dividing by √d_k restores unit variance, preventing softmax from saturating with vanishing gradients.',
        explanationAr: 'حاصل الضرب النقطي لمتجهات ذات تباين 1 له تباين يساوي d_k. القسمة على √d_k تعيد التباين إلى 1، مما يمنع تشبع دالة softmax وتلاشي التدرجات.',
      },
      {
        text: 'd_k',
        formula: 'd_k',
        correct: false,
        explanation: 'Dividing by d_k over-compresses the logits, causing softmax distribution to become excessively uniform.',
        explanationAr: 'القسمة على d_k تضغط القيم بشدة وتجعل توزيع softmax موزعاً بانتظام شديد ويفقد التركيز.',
      },
      {
        text: '2^d_k',
        formula: '2^{d_k}',
        correct: false,
        explanation: 'Exponential scaling is mathematically improper and diminishes logits completely.',
        explanationAr: 'التحجيم الأسي غير صحيح رياضياً ويقضي على الفروق بين القيم.',
      },
      {
        text: 'N (Sequence length)',
        formula: 'N',
        correct: false,
        explanation: 'The scaling factor must depend on the projection dimension d_k, not the variable context sequence length N.',
        explanationAr: 'معامل التحجيم يعتمد على بعد فضاء الإسقاط d_k وليس على طول النص المتغير N.',
      },
    ],
  },

  // 9. Boolean (Yes/No): Monotonicity of Training R²
  {
    id: 'drill-r2-monotonicity',
    format: 'boolean',
    trackId: 'econometrics',
    concept: 'Monotonicity of Training R²',
    conceptAr: 'رتابة معامل التحديد R² في بيانات التدريب',
    prompt: 'Can adding an additional feature to an OLS regression model ever cause the training R² to decrease?',
    promptAr: 'هل يمكن لإضافة متغير تفسيري جديد إلى نموذج انحدار OLS أن يؤدي إلى انخفاض معامل التحديد R² على بيانات التدريب؟',
    booleanAnswer: false,
    booleanLabels: {
      trueText: { en: 'Yes — If the feature is pure random noise', ar: 'نعم — إذا كان المتغير مجرد ضجيج عشوائي' },
      falseText: { en: 'No — Training R² is weakly monotonically increasing', ar: 'لا — معامل R² على التدريب غير متناقص رتيباً' },
    },
    booleanFormula: 'R^2(X_1, X_2) \\ge R^2(X_1), \\quad \\text{since } \\min_{w_1, w_2} \\text{SSR} \\le \\min_{w_1} \\text{SSR}',
    booleanExplanation: {
      en: 'OLS minimizes SSR over a larger subspace Col([X₁ X₂]) ⊇ Col(X₁). Setting the new coefficient to zero always achieves at least the previous SSR, so training R² cannot decrease.',
      ar: 'يقوم OLS بالتقليل على فضاء أعمدة أوسع يشمل الفضاء القديم. ضبط المعامل الجديد على الصفر يحقق على الأقل نفس الخطأ السابق، لذا لا يمكن لـ R² أن ينخفض على بيانات التدريب أبداً.',
    },
  },

  // 10. Boolean (True/False): K-Means Global vs Local Optimum
  {
    id: 'drill-kmeans-local-min',
    format: 'boolean',
    trackId: 'data',
    concept: 'K-Means Convergence Optimality',
    conceptAr: 'طبيعة تقارب خوارزمية K-Means',
    prompt: 'Does standard Lloyd’s K-Means algorithm mathematically guarantee convergence to the global minimum of the inertia objective?',
    promptAr: 'هل تضمن خوارزمية K-Means التقليدية (Lloyd) التقارب حتماً إلى الحل الأمثل العالمي (Global Minimum) لدالة القصور الذاتي؟',
    booleanAnswer: false,
    booleanLabels: {
      trueText: { en: 'Yes — It always reaches the global optimum', ar: 'نعم — تصل دائماً إلى الحل الأمثل العالمي' },
      falseText: { en: 'No — It converges to a local minimum or saddle point', ar: 'لا — تتقارب إلى حد أدنى محلي أو نقطة سرج' },
    },
    booleanFormula: '\\min_{C, \\mu} \\sum_{k=1}^K \\sum_{x_i \\in C_k} ||x_i - \\mu_k||^2 \\quad \\text{(NP-hard non-convex)}',
    booleanExplanation: {
      en: 'K-Means solves an NP-hard non-convex optimization via block coordinate descent. It is guaranteed to converge in a finite number of steps, but frequently gets trapped in poor local minima, which is why K-Means++ initialization is used.',
      ar: 'تحل خوارزمية K-Means مسألة غير محدبة عبر النزول الإحداثي المجزأ. تضمن الخوارزمية التوقف في عدد منتهٍ من الخطوات، لكنها غالباً ما تعلق في قيعان محلية رديئة، ولهذا تستخدم تقنية K-Means++ للتهيئة الذكية.',
    },
  },

  // 11. MCQ: Decision Trees & Jensen's Inequality
  {
    id: 'drill-tree-jensen-mcq',
    format: 'mcq',
    trackId: 'deep-learning',
    concept: 'Decision Tree Impurity Reduction',
    conceptAr: 'انخفاض الشوائب في أشجار القرار ومتباينة جينسن',
    prompt: 'Why is the Information Gain ΔI in a Decision Tree mathematically guaranteed to be non-negative (ΔI ≥ 0) for the optimal split?',
    promptAr: 'لماذا يكون كسب المعلومات (Information Gain) في شجرة القرار موجباً بالضرورة (ΔI ≥ 0) للانقسام الأمثل؟',
    options: [
      {
        text: 'The impurity functions (Entropy & Gini) are strictly concave, guaranteeing ΔI ≥ 0 via Jensen’s inequality.',
        textAr: 'دوال الشوائب (الإنتروبيا وجيني) دوال مقعرة تماماً، مما يضمن ΔI ≥ 0 استناداً إلى متباينة جينسن.',
        correct: true,
        explanation: 'Because H(p) is concave, E[H(p)] ≤ H(E[p]). The expected impurity after a split is always less than or equal to the parent node impurity.',
        explanationAr: 'نظراً لأن دوال الشوائب مقعرة، فإن القيمة المتوقعة للشوائب بعد الانقسام تكون دائماً أقل من أو تساوي شوائب العقدة الأصلية وفق متباينة جينسن.',
      },
      {
        text: 'Decision trees only allow orthogonal axis-aligned cuts.',
        textAr: 'أشجار القرار تسمح فقط بالقطوع المتعامدة على المحاور.',
        correct: false,
        explanation: 'Axis-alignment is a computational constraint, not the mathematical reason for impurity monotonicity.',
        explanationAr: 'التعامد على المحاور هو قيد حسابي وليس العلة الرياضية لعدم سلبية كسب المعلومات.',
      },
      {
        text: 'Because leaves with zero samples are immediately pruned.',
        textAr: 'لأنه يتم تشذيب الأوراق التي لا تحتوي على عينات فوراً.',
        correct: false,
        explanation: 'Pruning occurs post-hoc to prevent overfitting, unrelated to the theoretical split gain.',
        explanationAr: 'التشذيب يتم لاحقاً لمنع الإفراط في التخصيص ولا علاقة له بإثبات كسب المعلومات النظري.',
      },
    ],
  },

  // 12. MCQ: Central Limit Theorem Prerequisites
  {
    id: 'drill-clt-variance-mcq',
    format: 'mcq',
    trackId: 'math',
    concept: 'Central Limit Theorem Variance Condition',
    conceptAr: 'شروط مبرهنة النهاية المركزية (CLT)',
    prompt: 'What condition on the underlying independent and identically distributed (i.i.d.) random variables is strictly required for the classical Central Limit Theorem to hold?',
    promptAr: 'ما هو الشرط الضروري على المتغيرات العشوائية المستقلة والمتطابقة التوزيع لتطبيق مبرهنة النهاية المركزية الكلاسيكية؟',
    options: [
      {
        text: 'Finite variance (σ² < ∞). For heavy-tailed distributions like Cauchy, sample means do not converge to Normal.',
        textAr: 'ثبات ومحدودية التباين (σ² < ∞). للتوزيعات ذات الذيول الثقيلة مثل كوشي، لا يقترب متوسط العينات من التوزيع الطبيعي.',
        correct: true,
        explanation: 'If σ² = ∞ (as in the Cauchy distribution), the Lindeberg condition fails and the sample mean distribution does not converge to a Gaussian.',
        explanationAr: 'إذا كان التباين غير محدود (كما في توزيع كوشي)، يفشل شرط ليندبرغ ويبقى توزيع المتوسط متطابقاً مع التوزيع الأصلي دون أي تقارب نحو التوزيع الطبيعي.',
      },
      {
        text: 'The distribution must be symmetric around its mean.',
        textAr: 'يجب أن يكون التوزيع الأصلي متماثلاً تماماً حول المتوسط.',
        correct: false,
        explanation: 'The CLT applies to highly skewed distributions (e.g. Exponential) as sample size N grows.',
        explanationAr: 'تنطبق المبرهنة على التوزيعات الملتوية وغير المتماثلة (مثل التوزيع الأسي) مع زيادة حجم العينة N.',
      },
      {
        text: 'The support of the random variable must be bounded in [a, b].',
        textAr: 'يجب أن يكون نطاق المتغير العشوائي محصوراً ومحدوداً في فترة [a, b].',
        correct: false,
        explanation: 'Support can be unbounded (-∞, +∞) as long as E[X²] < ∞ (finite variance).',
        explanationAr: 'يمكن للمجال أن يمتد إلى ما لا نهاية بشرط أن يكون عزم الرتبة الثانية (التباين) محدوداً.',
      },
    ],
  },
];

export const DailyCalibration: React.FC = () => {
  const { language, addXp, streakDays } = useOkvirStore();

  const [cards, setCards] = useState<Record<string, FSRSState>>({});
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<'all' | DrillFormat>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Interaction States
  const [isFlipped, setIsFlipped] = useState(false); // For flashcard
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null); // For MCQ & Formula Fill
  const [selectedBooleanAnswer, setSelectedBooleanAnswer] = useState<boolean | null>(null); // For Boolean
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Session Statistics
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    xpEarned: 0,
  });

  // Filtered Drills
  const activeDrills = useMemo(() => {
    if (selectedFormatFilter === 'all') return FOUNDATIONAL_DRILL_ITEMS;
    return FOUNDATIONAL_DRILL_ITEMS.filter((item) => item.format === selectedFormatFilter);
  }, [selectedFormatFilter]);

  const currentItem = activeDrills[currentIndex];
  const isComplete = currentIndex >= activeDrills.length;

  const currentCardState = useMemo(() => {
    if (!currentItem) return null;
    return cards[currentItem.id] || createNewCard(currentItem.id);
  }, [currentItem, cards]);

  // Reset answer states when question changes
  const resetInteraction = useCallback(() => {
    setIsFlipped(false);
    setSelectedOptionIdx(null);
    setSelectedBooleanAnswer(null);
    setIsAnswerRevealed(false);
  }, []);

  const handleSelectFilter = (filter: 'all' | DrillFormat) => {
    setSelectedFormatFilter(filter);
    setCurrentIndex(0);
    resetInteraction();
    if (useOkvirStore.getState().config.soundEnabled) audio.playClick();
  };

  // Handle MCQ selection
  const handleSelectOption = useCallback((idx: number) => {
    if (isAnswerRevealed || !currentItem || !currentItem.options) return;
    setSelectedOptionIdx(idx);
    setIsAnswerRevealed(true);

    const isCorrect = currentItem.options[idx]?.correct;
    if (isCorrect) {
      if (useOkvirStore.getState().config.soundEnabled) audio.playSuccess();
      setSessionStats((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      if (useOkvirStore.getState().config.soundEnabled) audio.playErrorTick();
    }
  }, [isAnswerRevealed, currentItem]);

  // Handle Boolean True/False selection
  const handleSelectBoolean = useCallback((answer: boolean) => {
    if (isAnswerRevealed || !currentItem) return;
    setSelectedBooleanAnswer(answer);
    setIsAnswerRevealed(true);

    const isCorrect = answer === currentItem.booleanAnswer;
    if (isCorrect) {
      if (useOkvirStore.getState().config.soundEnabled) audio.playSuccess();
      setSessionStats((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      if (useOkvirStore.getState().config.soundEnabled) audio.playErrorTick();
    }
  }, [isAnswerRevealed, currentItem]);

  // Handle Flashcard Flip
  const handleFlipCard = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
      setIsAnswerRevealed(true);
      if (useOkvirStore.getState().config.soundEnabled) audio.playClick();
    }
  }, [isFlipped]);

  // Handle FSRS Rating Submission
  const handleRate = useCallback((rating: Rating) => {
    if (!currentItem || !currentCardState) return;

    const updated = updateCard(currentCardState, rating);
    setCards((prev) => ({ ...prev, [currentItem.id]: updated }));

    const earned = rating >= 3 ? 20 : 10;
    addXp(earned);
    setSessionStats((s) => ({
      ...s,
      reviewed: s.reviewed + 1,
      xpEarned: s.xpEarned + earned,
    }));

    resetInteraction();
    setCurrentIndex((prev) => prev + 1);

    if (useOkvirStore.getState().config.soundEnabled) {
      if (rating >= 3) audio.playSuccessChime();
      else audio.playClick();
    }
  }, [currentItem, currentCardState, addXp, resetInteraction]);

  // Keyboard Shortcuts: 1-4 for options/ratings, Space for flip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('input, textarea, select')) return;

      if (!isAnswerRevealed) {
        if (currentItem?.format === 'flashcard' && (e.code === 'Space' || e.key === 'Enter')) {
          e.preventDefault();
          handleFlipCard();
        } else if ((currentItem?.format === 'mcq' || currentItem?.format === 'formula_fill') && currentItem.options) {
          if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            if (idx < currentItem.options.length) {
              e.preventDefault();
              handleSelectOption(idx);
            }
          }
        } else if (currentItem?.format === 'boolean') {
          if (e.key === 't' || e.key === 'T' || e.key === 'y' || e.key === 'Y' || e.key === '1') {
            e.preventDefault();
            handleSelectBoolean(true);
          } else if (e.key === 'f' || e.key === 'F' || e.key === 'n' || e.key === 'N' || e.key === '2') {
            e.preventDefault();
            handleSelectBoolean(false);
          }
        }
      } else {
        // Rating phase
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          handleRate(parseInt(e.key, 10) as Rating);
        } else if (e.code === 'Space') {
          e.preventDefault();
          handleRate(3); // Default 'Good' on Space
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerRevealed, currentItem, handleFlipCard, handleSelectOption, handleSelectBoolean, handleRate]);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col gap-1.5 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--math-prediction)]/10 border border-[var(--math-prediction)]/20 flex items-center justify-center text-[var(--math-prediction)]">
                <Brain size={18} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  {tr('review', language)}
                </h1>
                <p className="text-[11px] text-[var(--text-secondary)] font-mono">
                  {language === 'ar'
                    ? 'المعايرة اليومية المتقدمة: بطاقات، أسئلة متعددة، صح/خطأ وإكمال معادلات مدعومة بـ FSRS v5'
                    : 'Instrument-grade daily calibration: Flashcards, MCQs, True/False & Formula Completion via FSRS v5'}
                </p>
              </div>
            </div>

            {/* Streak & Accuracy Telemetry */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-amber-400">
                <Flame size={13} className="text-amber-500 fill-amber-500/20" />
                <span className="tabular-nums font-bold">{streakDays}</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">{language === 'ar' ? 'أيام' : 'days'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-emerald-400">
                <Target size={13} className="text-emerald-500" />
                <span className="tabular-nums font-bold">
                  {sessionStats.reviewed > 0
                    ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100)
                    : 100}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Drill Format Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] me-1">
              <Filter size={11} className="inline me-1" />
              {language === 'ar' ? 'النمط:' : 'Format:'}
            </span>
            {[
              { id: 'all', en: 'All Formats', ar: 'جميع الأنماط' },
              { id: 'flashcard', en: 'Flashcards', ar: 'بطاقات المفاهيم' },
              { id: 'mcq', en: 'MCQs', ar: 'اختيار من متعدد' },
              { id: 'boolean', en: 'True / False', ar: 'صح / خطأ' },
              { id: 'formula_fill', en: 'Formula Completion', ar: 'إكمال المعادلات' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSelectFilter(tab.id as 'all' | DrillFormat)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                  selectedFormatFilter === tab.id
                    ? 'border-[var(--math-prediction)] bg-[var(--math-prediction)]/15 text-[var(--math-prediction)] font-bold shadow-sm'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                {language === 'ar' ? tab.ar : tab.en}
              </button>
            ))}
          </div>
        </div>

        {/* Complete State */}
        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 fade-in rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 specular">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles size={26} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {language === 'ar' ? 'اكتملت جلسة المعايرة بنجاح!' : 'Daily Calibration Completed!'}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {language === 'ar'
                  ? `أنجزت مراجعة ${sessionStats.reviewed} تدريباً بنسبة دقة ${Math.round((sessionStats.correct / (sessionStats.reviewed || 1)) * 100)}% وحصلت على +${sessionStats.xpEarned} XP.`
                  : `Calibrated ${sessionStats.reviewed} drills with ${Math.round((sessionStats.correct / (sessionStats.reviewed || 1)) * 100)}% accuracy. Earned +${sessionStats.xpEarned} XP.`}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSessionStats({ reviewed: 0, correct: 0, xpEarned: 0 });
                  resetInteraction();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                <RotateCcw size={13} />
                <span>{language === 'ar' ? 'بدء جولة جديدة' : 'Restart Session'}</span>
              </button>
            </div>
          </div>
        ) : currentItem ? (
          <div className="space-y-4 fade-in">
            {/* Question Progress Banner */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                    currentItem.format === 'flashcard'
                      ? 'border-purple-500/30 bg-purple-500/10 text-purple-300'
                      : currentItem.format === 'mcq'
                      ? 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                      : currentItem.format === 'boolean'
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  }`}
                >
                  {currentItem.format === 'flashcard' && (language === 'ar' ? 'بطاقة مفاهيمية' : 'Flashcard')}
                  {currentItem.format === 'mcq' && (language === 'ar' ? 'اختيار من متعدد' : 'Multiple Choice')}
                  {currentItem.format === 'boolean' && (language === 'ar' ? 'صح أم خطأ' : 'True / False')}
                  {currentItem.format === 'formula_fill' && (language === 'ar' ? 'إكمال المعادلة' : 'Formula Fill')}
                </span>

                <span className="text-[11px] text-[var(--text-tertiary)] font-mono">
                  {language === 'ar' ? currentItem.conceptAr : currentItem.concept}
                </span>
              </div>

              {/* Progress Bar Counter */}
              <div className="flex items-center gap-2 text-[var(--text-tertiary)] tabular-nums">
                <span>
                  {currentIndex + 1} / {activeDrills.length}
                </span>
                <span className="w-16 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <span
                    className="block h-full bg-[var(--math-vector)] transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / activeDrills.length) * 100}%` }}
                  />
                </span>
              </div>
            </div>

            {/* ====================================================================
                FORMAT 1: TACTILE FLASHCARD
               ==================================================================== */}
            {currentItem.format === 'flashcard' && (
              <div
                onClick={handleFlipCard}
                className={`min-h-[260px] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-7 flex flex-col justify-between transition-all select-none ${
                  isFlipped
                    ? 'cursor-default'
                    : 'cursor-pointer hover:border-[var(--text-secondary)] hover:shadow-xl'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-2">
                    {language === 'ar' ? 'السؤال المفاهيمي:' : 'Conceptual Prompt:'}
                  </span>
                  <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                {isFlipped ? (
                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-3 slide-up">
                    {currentItem.solutionFormula && (
                      <div dir="ltr" className="p-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center font-mono">
                        <KaTeXMath math={currentItem.solutionFormula} block />
                      </div>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {language === 'ar' ? currentItem.solutionAr : currentItem.solution}
                    </p>
                    {currentCardState && (
                      <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-[var(--text-tertiary)]">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          Stability: <span className="tabular-nums text-[var(--math-vector)]">{currentCardState.stability.toFixed(1)}d</span>
                        </span>
                        <span>
                          Retention: <span className="tabular-nums text-[var(--math-data)]">{(retrievability(0, currentCardState.stability) * 100).toFixed(0)}%</span>
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center pt-8 text-xs text-[var(--text-tertiary)] gap-1.5 font-mono">
                    <span>{tr('flipCard', language)}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[10px]">Space</kbd>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FORMAT 2: MULTIPLE CHOICE QUESTION (MCQ)
               ==================================================================== */}
            {currentItem.format === 'mcq' && currentItem.options && (
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    {language === 'ar' ? 'سؤال متعدد الخيارات:' : 'Multiple Choice Prompt:'}
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {currentItem.options.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrect = opt.correct;
                    const showFeedback = isAnswerRevealed;

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-start transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-rose-300'
                              : 'border-[var(--border-subtle)] opacity-40 text-[var(--text-tertiary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] hover:translate-y-[-1px]'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div className="flex-1 text-xs leading-relaxed">
                          {language === 'ar' && opt.textAr ? opt.textAr : opt.text}
                          {opt.formula && (
                            <div dir="ltr" className="my-1 font-mono text-zinc-200">
                              <KaTeXMath math={opt.formula} />
                            </div>
                          )}
                        </div>
                        {showFeedback && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                        {showFeedback && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal Drawer */}
                {isAnswerRevealed && selectedOptionIdx !== null && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-2 slide-up text-xs leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold font-mono">
                      {currentItem.options[selectedOptionIdx].correct ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check size={14} /> {language === 'ar' ? 'إجابة صحيحة ومتقنة!' : 'Correct!'}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <X size={14} /> {language === 'ar' ? 'إجابة غير صحيحة — راجع التفسير الرياضي:' : 'Incorrect — Review the derivation:'}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)]">
                      {language === 'ar'
                        ? currentItem.options[selectedOptionIdx].explanationAr || currentItem.options.find((o) => o.correct)?.explanationAr
                        : currentItem.options[selectedOptionIdx].explanation || currentItem.options.find((o) => o.correct)?.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FORMAT 3: TRUE / FALSE (BOOLEAN)
               ==================================================================== */}
            {currentItem.format === 'boolean' && (
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    {language === 'ar' ? 'التحقق من صحة الفرضية الرياضية:' : 'Mathematical Assertion Check:'}
                  </span>
                  <p className="text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                {currentItem.booleanFormula && (
                  <div dir="ltr" className="p-3 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center font-mono">
                    <KaTeXMath math={currentItem.booleanFormula} block />
                  </div>
                )}

                {/* Yes / No Tactile Hardware Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {[true, false].map((val) => {
                    const isSelected = selectedBooleanAnswer === val;
                    const isCorrect = currentItem.booleanAnswer === val;
                    const showFeedback = isAnswerRevealed;

                    return (
                      <button
                        key={String(val)}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectBoolean(val)}
                        className={`p-4 rounded-xl border font-mono text-center transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-rose-300 font-bold'
                              : 'border-[var(--border-subtle)] opacity-40 text-[var(--text-tertiary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-[var(--text-primary)] hover:translate-y-[-1px]'
                        }`}
                      >
                        <div className="text-sm font-bold flex items-center justify-center gap-2">
                          {val ? <Check size={16} className="text-emerald-400" /> : <X size={16} className="text-rose-400" />}
                          <span>{val ? (language === 'ar' ? 'صحيح (نعم)' : 'True / Yes') : (language === 'ar' ? 'خطأ (لا)' : 'False / No')}</span>
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mt-1">
                          {currentItem.booleanLabels
                            ? val
                              ? currentItem.booleanLabels.trueText[language]
                              : currentItem.booleanLabels.falseText[language]
                            : val ? 'Affirm statement' : 'Refute statement'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Boolean Explanation Drawer */}
                {isAnswerRevealed && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1.5 slide-up text-xs leading-relaxed">
                    <span className="font-bold text-[var(--text-primary)] block font-mono">
                      {selectedBooleanAnswer === currentItem.booleanAnswer
                        ? language === 'ar' ? '✓ تحليل منطقي دقيق وموفق:' : '✓ Accurate reasoning:'
                        : language === 'ar' ? '✗ انتبه للحالة الدقيقة:' : '✗ Notice the theoretical boundary:'}
                    </span>
                    <p className="text-[var(--text-secondary)]">
                      {currentItem.booleanExplanation ? currentItem.booleanExplanation[language] : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FORMAT 4: FORMULA FILL-IN-THE-BLANK
               ==================================================================== */}
            {currentItem.format === 'formula_fill' && currentItem.options && (
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] specular p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block mb-1.5">
                    {language === 'ar' ? 'إكمال الرمز المفقود في المعادلة:' : 'Formula Token Completion:'}
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                    {language === 'ar' ? currentItem.promptAr : currentItem.prompt}
                  </p>
                </div>

                {/* Equation Display Box */}
                <div dir="ltr" className="p-4 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center text-sm font-mono">
                  <KaTeXMath
                    math={
                      isAnswerRevealed && currentItem.filledDisplayFormula
                        ? currentItem.filledDisplayFormula
                        : currentItem.blankDisplayFormula || ''
                    }
                    block
                  />
                </div>

                {/* Options Token Chips */}
                <div className="grid grid-cols-2 gap-2.5">
                  {currentItem.options.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrect = opt.correct;
                    const showFeedback = isAnswerRevealed;

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-3 rounded-xl border text-center font-mono transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-rose-300'
                              : 'border-[var(--border-subtle)] opacity-40 text-[var(--text-tertiary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-strong)] text-[var(--text-primary)] hover:translate-y-[-1px]'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {opt.formula ? <KaTeXMath math={opt.formula} /> : opt.text}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswerRevealed && selectedOptionIdx !== null && (
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] space-y-1.5 slide-up text-xs leading-relaxed">
                    <span className="font-bold text-[var(--text-primary)] font-mono block">
                      {currentItem.options[selectedOptionIdx].correct
                        ? language === 'ar' ? '✓ تم التحقق الرياضي بنجاح:' : '✓ Mathematically verified:'
                        : language === 'ar' ? '✗ الرمز الصحيح والتفسير:' : '✗ Correct token derivation:'}
                    </span>
                    <p className="text-[var(--text-secondary)]">
                      {language === 'ar'
                        ? currentItem.options[selectedOptionIdx].explanationAr || currentItem.options.find((o) => o.correct)?.explanationAr
                        : currentItem.options[selectedOptionIdx].explanation || currentItem.options.find((o) => o.correct)?.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ====================================================================
                FSRS v5 RATING BAR (Revealed upon answering any format)
               ==================================================================== */}
            {isAnswerRevealed && (
              <div className="space-y-2 pt-1 slide-up">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>{language === 'ar' ? 'معايرة ثبات الذاكرة (FSRS v5):' : 'Calibrate Memory Stability (FSRS v5):'}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">Keys: 1, 2, 3, 4</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {([1, 2, 3, 4] as Rating[]).map((rating) => {
                    const label = getRatingLabel(rating, currentCardState ? currentCardState.stability : 1.0);
                    const isAgain = rating === 1;
                    const isHard = rating === 2;
                    const isGood = rating === 3;

                    return (
                      <button
                        key={rating}
                        onClick={() => handleRate(rating)}
                        className={`p-3 rounded-xl border text-center font-mono transition-transform active:scale-95 hover:brightness-110 shadow-sm ${
                          isAgain
                            ? 'border-[var(--math-loss)]/50 bg-[var(--math-loss)]/10 text-[var(--math-loss)] hover:bg-[var(--math-loss)]/20'
                            : isHard
                            ? 'border-[var(--math-gradient)]/50 bg-[var(--math-gradient)]/10 text-[var(--math-gradient)] hover:bg-[var(--math-gradient)]/20'
                            : isGood
                            ? 'border-[var(--math-data)]/50 bg-[var(--math-data)]/10 text-[var(--math-data)] hover:bg-[var(--math-data)]/20'
                            : 'border-[var(--math-vector)]/50 bg-[var(--math-vector)]/10 text-[var(--math-vector)] hover:bg-[var(--math-vector)]/20'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {isAgain
                            ? tr('again', language)
                            : isHard
                            ? tr('hard', language)
                            : isGood
                            ? tr('good', language)
                            : tr('easy', language)}
                        </div>
                        <div className="text-[10px] tabular-nums opacity-80 mt-0.5">
                          ({label})
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Guaranteed clearance spacer so fixed bottom bar never overlaps controls */}
        <div className="h-16 shrink-0 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
};
