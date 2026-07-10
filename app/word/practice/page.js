import PracticeTrainer from '@/components/PracticeTrainer';
import AppTabs from '@/components/AppTabs';
import DownloadBanner from '@/components/DownloadBanner';
import { WORD_CATEGORIES, WORD_QUESTIONS } from '@/data/wordQuestions';

export const metadata = { title: 'Wordトレーニング | Office Master' };

const TABS = [
  { href: '/word/practice', label: '練習問題' },
  { href: '/word/project', label: '実践演習' },
  { href: '/word/learn', label: '学習タブ' },
];

export default function WordPracticePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">Word</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-4">
        文書作成・校閲・レイアウトなどのお題に挑戦しよう。下の練習用ファイルを使います。
      </p>
      <DownloadBanner
        href="/downloads/word-practice-material.docx"
        label="Word練習用ファイル"
        description="見出し・段落番号・タブ・校閲・目次などの練習素材が入っています"
      />
      <DownloadBanner
        label="Excel練習用ファイル"
        description="差し込み印刷の問題で使います"
      />
      <PracticeTrainer
        categories={WORD_CATEGORIES}
        questions={WORD_QUESTIONS}
        storageKey="word-master:done-v1"
        appLabel="Word"
      />
    </div>
  );
}

