import PracticeTrainer from '@/components/PracticeTrainer';
import AppTabs from '@/components/AppTabs';
import DownloadBanner from '@/components/DownloadBanner';
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
      <p className="text-steel-500 text-sm mb-4">
        スライド作成・デザイン・アニメーションなどのお題に挑戦しよう。「デザイン・レイアウト」の一部は下の練習用ファイルを使います。
      </p>
      <DownloadBanner
        href="/downloads/ppt-practice-material.pptx"
        label="PowerPoint練習用ファイル"
        description="SmartArt変換・図形整列・テキストボックスの素材が入っています"
      />
      <DownloadBanner
        label="Excel練習用ファイル"
        description="グラフをリンク貼り付けする問題で使います"
      />
      <PracticeTrainer
        categories={PPT_CATEGORIES}
        questions={PPT_QUESTIONS}
        storageKey="ppt-master:done-v1"
        appLabel="PowerPoint"
      />
    </div>
  );
}

