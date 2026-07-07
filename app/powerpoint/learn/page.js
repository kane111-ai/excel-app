import ReferenceSection from '@/components/ReferenceSection';
import AppTabs from '@/components/AppTabs';
import { PPT_SHORTCUTS, PPT_FEATURE_CATEGORIES, PPT_BASIC_TECHNIQUES } from '@/data/pptLearnContent';

export const metadata = { title: 'PowerPoint学習タブ | Office Master' };

const TABS = [
  { href: '/powerpoint/practice', label: '練習問題' },
  { href: '/powerpoint/project', label: '実践演習' },
  { href: '/powerpoint/learn', label: '学習タブ' },
];

export default function PptLearnPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">PowerPoint</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-6">
        ショートカットキー・機能一覧・基本テクニックをリファレンスとして確認できます。
      </p>
      <ReferenceSection
        shortcuts={PPT_SHORTCUTS}
        featureCategories={PPT_FEATURE_CATEGORIES}
        techniques={PPT_BASIC_TECHNIQUES}
        featureTabLabel="機能の種類"
      />
    </div>
  );
}
