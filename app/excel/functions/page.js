import FunctionsTrainer from '@/components/FunctionsTrainer';

export const metadata = { title: '関数トレーニング | Excel Master' };

export default function FunctionsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">関数トレーニング</h1>
      <p className="text-steel-500 text-sm mb-6">
        カテゴリを選んでお題に挑戦しよう。達成状況はブラウザに保存されます。
      </p>
      <FunctionsTrainer />
    </div>
  );
}
