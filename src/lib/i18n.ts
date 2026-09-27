import type { Language } from './types';

export const t = {
  // Shell
  appName: { en: 'OKVIR', ar: 'إطار' },
  searchPlaceholder: { en: 'Quick Search or Jump to Concept...', ar: 'ابحث عن مفهوم أو درس...' },
  close: { en: 'Close', ar: 'إغلاق' },
  minimize: { en: 'Minimize', ar: 'تصغير' },
  maximize: { en: 'Maximize', ar: 'تكبير' },
  actions: { en: 'Actions', ar: 'الإجراءات' },
  run: { en: 'Run', ar: 'تشغيل' },
  hint: { en: 'Hint', ar: 'تلميح' },
  nextBeat: { en: 'Next', ar: 'التالي' },

  // Navigation
  constellation: { en: 'Knowledge Constellation', ar: 'بُرج المعرفة' },
  lesson: { en: 'Lesson', ar: 'الدرس' },
  review: { en: 'Daily Calibration', ar: 'المعايرة اليومية' },
  sandbox: { en: 'Sandbox', ar: 'المختبر' },
  settings: { en: 'Settings & Storage', ar: 'الإعدادات والتخزين' },

  // Tracks
  track1: { en: 'Mathematical Foundations', ar: 'الأسس الرياضية' },
  track2: { en: 'Programming & Data', ar: 'البرمجة والبيانات' },
  track3: { en: 'Econometrics & ML', ar: 'الاقتصاد القياسي والتعلم الآلي' },
  track4: { en: 'Deep Learning & AI', ar: 'التعلم العميق والذكاء الاصطناعي' },

  // Lesson beats
  beat1: { en: 'Intuition', ar: 'الحدس' },
  beat2: { en: 'Formal Anchor', ar: 'المرساة الرسمية' },
  beat3: { en: 'Code', ar: 'الكود' },
  beat4: { en: 'Transfer', ar: 'النقل' },
  cardProgress: { en: 'Card', ar: 'بطاقة' },
  of: { en: 'of', ar: 'من' },
  startLesson: { en: 'Start Lesson', ar: 'ابدأ الدرس' },
  backToConstellation: { en: 'Back to Constellation', ar: 'العودة إلى البرج' },

  // Simulation
  lossHud: { en: 'Loss Function HUD', ar: 'مؤشر دالة الخسارة' },
  autoOptimize: { en: 'Auto-Optimize (OLS)', ar: 'تحسين آلي (OLS)' },
  slope: { en: 'Slope (m)', ar: 'الميل (m)' },
  intercept: { en: 'Intercept (b)', ar: 'التقاطع (b)' },
  learningRate: { en: 'Learning Rate (η)', ar: 'معدل التعلم (η)' },
  momentum: { en: 'Momentum (β)', ar: 'الزخم (β)' },
  kValue: { en: 'K Neighbors', ar: 'عدد الجيران' },
  queryPoint: { en: 'Query Point', ar: 'نقطة الاستعلام' },
  predictedClass: { en: 'Predicted', ar: 'التنبؤ' },
  votes: { en: 'Votes', ar: 'الأصوات' },
  reset: { en: 'Reset', ar: 'إعادة' },
  step: { en: 'Step', ar: 'خطوة' },
  runGradient: { en: 'Run Descent', ar: 'تشغيل الانحدار' },
  stop: { en: 'Stop', ar: 'إيقاف' },

  // Code editor
  runAndTest: { en: 'Run & Test Code', ar: 'تشغيل واختبار الكود' },
  runningTests: { en: 'Running unit tests against test_cases...', ar: 'تشغيل اختبارات الوحدة...' },
  allTestsPassed: { en: 'All tests passed! Concept compiled.', ar: 'نجحت جميع الاختبارات! تم تجميع المفهوم.' },
  executionTime: { en: 'Execution time', ar: 'وقت التنفيذ' },
  passed: { en: 'PASSED', ar: 'نجح' },
  failed: { en: 'FAILED', ar: 'فشل' },

  // Review
  reviewDue: { en: 'Cards Due for Review', ar: 'بطاقات مستحقة للمراجعة' },
  noReviews: { en: 'No reviews due. Come back later!', ar: 'لا توجد مراجعات مستحقة. عُد لاحقاً!' },
  again: { en: 'Again', ar: 'مجدداً' },
  hard: { en: 'Hard', ar: 'صعب' },
  good: { en: 'Good', ar: 'جيد' },
  easy: { en: 'Easy', ar: 'سهل' },
  flipCard: { en: 'Click to flip', ar: 'انقر للقلب' },
  showAnswer: { en: 'Show Answer', ar: 'إظهار الإجابة' },
  retention: { en: 'Retention', ar: 'التذكر' },
  stability: { en: 'Stability', ar: 'الثبات' },

  // Node states
  locked: { en: 'Locked', ar: 'مقفل' },
  available: { en: 'Available', ar: 'متاح' },
  inProgress: { en: 'In Progress', ar: 'قيد التقدم' },
  mastered: { en: 'Mastered', ar: 'متقن' },
  decaying: { en: 'Needs Review', ar: 'يحتاج مراجعة' },
  minutes: { en: 'min', ar: 'دقائق' },
  prerequisites: { en: 'Prerequisites', ar: 'المتطلبات' },

  // Command palette
  commandPalette: { en: 'Command Palette', ar: 'لوحة الأوامر' },
  toggleTheme: { en: 'Toggle Dark/Light Mode', ar: 'تبديل الوضع الداكن/الفاتح' },
  switchLanguage: { en: 'Switch Language (EN/AR)', ar: 'تبديل اللغة (EN/AR)' },
  startReview: { en: 'Start Daily Review', ar: 'ابدأ المراجعة اليومية' },
  goToConstellation: { en: 'Go to Constellation', ar: 'الذهاب إلى البرج' },
  goToSandbox: { en: 'Go to Sandbox', ar: 'الذهاب إلى المختبر' },

  // Sandbox
  sandboxTitle: { en: 'Algorithmic Sandbox', ar: 'مختبر الخوارزميات' },
  sandboxDesc: {
    en: 'Explore any simulation in free-play mode. Adjust parameters and watch algorithms behave in real time.',
    ar: 'استكشف أي محاكاة في الوضع الحر. اضبط المعاملات وشاهد الخوارزميات في الوقت الفعلي.',
  },

  // XP & Streak
  xp: { en: 'XP', ar: 'نقطة' },
  days: { en: 'Days', ar: 'يوم' },
  streak: { en: 'Streak', ar: 'السلسلة' },
} as const;

export function tr(key: keyof typeof t, lang: Language): string {
  return t[key][lang];
}
