import ReferenceSection from '@/components/ReferenceSection';
import AppTabs from '@/components/AppTabs';
import { WORD_SHORTCUTS, WORD_FEATURE_CATEGORIES, WORD_BASIC_TECHNIQUES } from '@/data/wordLearnContent';

export const metadata = { title: 'Word学習タブ | Office Master' };

const TABS = [
  { href: '/word/practice', label: '練習問題' },
  { href: '/word/learn', label: '学習タブ' },
];

export default function WordLearnPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">Word</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-6">
        ショートカットキー・機能一覧・基本テクニックをリファレンスとして確認できます。
      </p>
      <ReferenceSection
        shortcuts={WORD_SHORTCUTS}
        featureCategories={WORD_FEATURE_CATEGORIES}
        techniques={WORD_BASIC_TECHNIQUES}
        featureTabLabel="機能の種類"
      />
    </div>
  );
}
