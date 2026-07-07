import FinanceWorkbook from '@/components/FinanceWorkbook';

export const metadata = { title: '財務諸表分析 | Excel Master' };

export default function FinancePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">財務諸表分析</h1>
      <p className="text-steel-500 text-sm mb-6">
        仮想企業の財務データをもとに、指標計算をExcelで実践してみましょう。
      </p>
      <FinanceWorkbook />
    </div>
  );
}
