import FinanceWorkbook from '@/components/FinanceWorkbook';
import AppTabs from '@/components/AppTabs';

export const metadata = { title: '財務諸表分析 | Office Master' };


const TABS = [
  { href: '/excel/functions', label: '関数トレーニング' },
  { href: '/excel/finance', label: '財務諸表分析' },
  { href: '/excel/learn', label: '学習タブ' },
];

export default function FinancePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">Excel</h1>
      <AppTabs links={TABS} />
      <p className="text-steel-500 text-sm mb-6">
        仮想企業の財務データをもとに、指標計算をExcelで実践してみましょう。
      </p>
      <FinanceWorkbook />
    </div>
  );
}
