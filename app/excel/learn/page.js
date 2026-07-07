import ReferenceSection from '@/components/ReferenceSection';
import AppTabs from '@/components/AppTabs';
import { SHORTCUTS, FUNCTION_CATEGORIES, BASIC_TECHNIQUES } from '@/data/learnContent';

export const metadata = { title: '学習タブ | Office Master' };

const TABS = [
  { href: '/excel/functions', label: '関数トレーニング' },
  { href: '/excel/finance', label: '財務諸表分析' },
  { href: '/excel/learn', label: '学習タブ' },
];

export default function LearnPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">Excel</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-6">
        ショートカットキー・関数の種類・基本テクニックをリファレンスとして確認できます。
      </p>
      <ReferenceSection
        shortcuts={SHORTCUTS}
        featureCategories={FUNCTION_CATEGORIES}
        techniques={BASIC_TECHNIQUES}
        featureTabLabel="関数の種類"
      />
    </div>
  );
}
