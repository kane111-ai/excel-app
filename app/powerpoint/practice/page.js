import PracticeTrainer from '@/components/PracticeTrainer';
import AppTabs from '@/components/AppTabs';
import { PPT_CATEGORIES, PPT_QUESTIONS } from '@/data/pptQuestions';

export const metadata = { title: 'PowerPointトレーニング | Office Master' };

const TABS = [
  { href: '/powerpoint/practice', label: '練習問題' },
  { href: '/powerpoint/project', label: '実践演習' },
  { href: '/powerpoint/learn', label: '学習タブ' },
];

export default function PptPracticePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">PowerPoint</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-6">
        スライド作成・デザイン・アニメーションなどのお題に挑戦しよう。
      </p>
      <PracticeTrainer
        categories={PPT_CATEGORIES}
        questions={PPT_QUESTIONS}
        storageKey="ppt-master:done-v1"
        appLabel="PowerPoint"
      />
    </div>
  );
}
