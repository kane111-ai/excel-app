import LearnSection from '@/components/LearnSection';

export const metadata = { title: '学習タブ | Excel Master' };

export default function LearnPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">学習タブ</h1>
      <p className="text-steel-500 text-sm mb-6">
        ショートカットキー・関数の種類・基本テクニックをリファレンスとして確認できます。
      </p>
      <LearnSection />
    </div>
  );
}
