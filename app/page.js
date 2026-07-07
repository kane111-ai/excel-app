import Link from 'next/link';
import { QUESTIONS as EXCEL_QUESTIONS, CATEGORIES as EXCEL_CATEGORIES } from '@/data/questions';
import { FINANCE_EXERCISES } from '@/data/financeData';
import { PPT_QUESTIONS } from '@/data/pptQuestions';
import { WORD_QUESTIONS } from '@/data/wordQuestions';

const CARDS = [
  {
    href: '/excel/functions',
    title: 'Excel',
    desc: '関数・グラフ・書式・ピボットなどのお題、財務諸表分析、学習タブ。',
  },
  {
    href: '/powerpoint/practice',
    title: 'PowerPoint',
    desc: 'スライド作成・デザイン・アニメーションのお題、決算説明会スライドの実践演習、学習タブ。',
  },
  {
    href: '/word/practice',
    title: 'Word',
    desc: '文書作成・校閲・レイアウトのお題、決算報告書の実践演習、学習タブ。',
  },
];

export default function Home() {
  const totalQuestions = EXCEL_QUESTIONS.length + PPT_QUESTIONS.length + WORD_QUESTIONS.length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-steel-800 mb-2">Office Master</h1>
        <p className="text-steel-500">
          社会人になるまでに、Excel・PowerPoint・Wordを実践形式で鍛えるトレーニングアプリ。
          お題は合計{totalQuestions}問（Excel {EXCEL_QUESTIONS.length}問 / PowerPoint {PPT_QUESTIONS.length}問 / Word {WORD_QUESTIONS.length}問）、
          財務分析演習は{FINANCE_EXERCISES.length}問を用意しています。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className="card p-5 hover:border-steel-300 transition block">
            <h2 className="font-semibold text-steel-800 mb-2">{c.title}</h2>
            <p className="text-sm text-steel-500 leading-relaxed">{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="card p-5 mt-8">
        <h3 className="text-sm font-semibold text-steel-800 mb-2">このアプリについて</h3>
        <p className="text-sm text-steel-500 leading-relaxed">
          進捗はブラウザのlocalStorageに保存されます（サーバーには送信されません）。
          AIによる添削・解説はGemini APIを利用しており、サーバーサイドのAPIルート経由で呼び出すことでAPIキーを保護しています。
        </p>
      </div>
    </div>
  );
}
