import Link from 'next/link';
import { QUESTIONS, CATEGORIES } from '@/data/questions';
import { FINANCE_EXERCISES } from '@/data/financeData';

const CARDS = [
  {
    href: '/excel/functions',
    title: '関数トレーニング',
    desc: 'カテゴリ別のお題に挑戦して、関数・グラフ・書式・ピボットなどを実践形式でマスターする。',
  },
  {
    href: '/excel/finance',
    title: '財務諸表分析',
    desc: '仮想企業の損益計算書・貸借対照表・キャッシュフロー計算書を使って、実務に近い分析を練習する。',
  },
  {
    href: '/excel/learn',
    title: '学習タブ',
    desc: 'ショートカットキー・関数の種類・基本テクニックをリファレンス形式でいつでも確認できる。',
  },
];

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-steel-800 mb-2">Excel Master</h1>
        <p className="text-steel-500">
          社会人になるまでに、Excelを実践形式で鍛えるトレーニングアプリ。お題は{QUESTIONS.length}問、
          カテゴリは{CATEGORIES.length}種類、財務分析演習は{FINANCE_EXERCISES.length}問を用意しています。
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
