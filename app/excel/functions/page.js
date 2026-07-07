import PracticeTrainer from '@/components/PracticeTrainer';
import AppTabs from '@/components/AppTabs';
import { CATEGORIES, QUESTIONS } from '@/data/questions';

export const metadata = { title: '関数トレーニング | Office Master' };

const TABS = [
  { href: '/excel/functions', label: '関数トレーニング' },
  { href: '/excel/finance', label: '財務諸表分析' },
  { href: '/excel/learn', label: '学習タブ' },
];

export default function FunctionsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">Excel</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-6">
        カテゴリを選んでお題に挑戦しよう。達成状況はブラウザに保存されます。
      </p>
      <PracticeTrainer
        categories={CATEGORIES}
        questions={QUESTIONS}
        storageKey="excel-master:done-v1"
        appLabel="Excel"
      />
    </div>
  );
}
