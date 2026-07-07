'use client';

import { useState } from 'react';
import { COMPANY_NAME, YEARS, PL, BS, CF, FINANCE_EXERCISES } from '@/data/financeData';

const LEVEL_LABEL = { 1: '初級', 2: '中級', 3: '上級' };

function StatementTable({ title, labels, values }) {
  return (
    <div className="card p-4 mb-4 overflow-x-auto">
      <h3 className="text-sm font-semibold text-steel-800 mb-3">{title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-steel-100 text-steel-400">
            <th className="text-left font-normal py-1.5 pr-4">科目</th>
            {YEARS.map((y) => (
              <th key={y} className="text-right font-normal py-1.5 pl-4 whitespace-nowrap">
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => (
            <tr key={label} className="border-b border-steel-50 last:border-0">
              <td className="py-1.5 pr-4 text-steel-700">{label}</td>
              {values[i].map((v, yi) => (
                <td key={yi} className="text-right py-1.5 pl-4 font-mono text-steel-600 whitespace-nowrap">
                  {v.toLocaleString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExerciseCard({ ex }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [aiExplain, setAiExplain] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const check = () => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) {
      setResult({ ok: false, msg: '数値を入力してください' });
      return;
    }
    const diff = Math.abs(num - ex.expected);
    const ok = diff <= ex.tolerance;
    setResult({
      ok,
      msg: ok
        ? `正解！ 目安の値: ${ex.expected.toFixed(2)}${ex.unit}`
        : `もう一度確認しましょう。目安の値: ${ex.expected.toFixed(2)}${ex.unit}（許容差 ±${ex.tolerance}）`,
    });
  };

  const explain = async () => {
    setLoadingAi(true);
    setAiExplain(null);
    try {
      const res = await fetch('/api/gemini/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: ex.title,
          prompt: ex.prompt,
          formulaHint: ex.formulaHint,
        }),
      });
      const data = await res.json();
      setAiExplain(data.result || 'AIからの応答を取得できませんでした。');
    } catch (e) {
      setAiExplain('エラーが発生しました。GEMINI_API_KEYが設定されているか確認してください。');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="card p-4 mb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge bg-steel-100 text-steel-600">{LEVEL_LABEL[ex.level]}</span>
        <h4 className="text-sm font-semibold text-steel-800">{ex.title}</h4>
      </div>
      <p className="text-sm text-steel-600 mb-3">{ex.prompt}</p>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`回答を入力（単位: ${ex.unit}）`}
          className="border border-steel-200 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-steel-400"
        />
        <button
          onClick={check}
          className="px-3 py-1.5 text-sm rounded-md bg-steel-800 text-white"
        >
          採点する
        </button>
        <button
          onClick={explain}
          disabled={loadingAi}
          className="px-3 py-1.5 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700 disabled:opacity-50"
        >
          {loadingAi ? '生成中...' : 'AIに解説してもらう'}
        </button>
      </div>
      {result && (
        <p className={`text-sm ${result.ok ? 'text-emerald-600' : 'text-rose-600'}`}>{result.msg}</p>
      )}
      {aiExplain && (
        <div className="mt-2 text-sm bg-steel-50 rounded-md px-3 py-2 whitespace-pre-wrap text-steel-700">
          {aiExplain}
        </div>
      )}
    </div>
  );
}

export default function FinanceWorkbook() {
  const [tab, setTab] = useState('pl');

  const assetLabels = [...BS.assets.labels];
  const assetValues = [...BS.assets.values];
  const liabLabels = [...BS.liabilities.labels];
  const liabValues = [...BS.liabilities.values];
  const equityLabels = [...BS.equity.labels];
  const equityValues = [...BS.equity.values];

  return (
    <div>
      <div className="card p-4 mb-6">
        <p className="text-sm text-steel-500">
          仮想企業 <span className="font-medium text-steel-800">{COMPANY_NAME}</span>{' '}
          の3期分の財務諸表を使って、実際に自分のExcelで分析してみましょう。数値はすべて学習用の架空データです。
        </p>
      </div>

      <div className="flex gap-1 mb-4">
        {[
          { key: 'pl', label: '損益計算書（PL）' },
          { key: 'bs', label: '貸借対照表（BS）' },
          { key: 'cf', label: 'キャッシュフロー（CF）' },
          { key: 'ex', label: '演習問題' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-md text-sm transition ${
              tab === t.key ? 'bg-steel-800 text-white' : 'text-steel-600 hover:bg-steel-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'pl' && <StatementTable title="損益計算書" labels={PL.labels} values={PL.values} />}

      {tab === 'bs' && (
        <>
          <StatementTable title="貸借対照表：資産の部" labels={assetLabels} values={assetValues} />
          <StatementTable title="貸借対照表：負債の部" labels={liabLabels} values={liabValues} />
          <StatementTable title="貸借対照表：純資産の部" labels={equityLabels} values={equityValues} />
        </>
      )}

      {tab === 'cf' && <StatementTable title="キャッシュ・フロー計算書" labels={CF.labels} values={CF.values} />}

      {tab === 'ex' && (
        <div>
          {FINANCE_EXERCISES.map((ex) => (
            <ExerciseCard key={ex.id} ex={ex} />
          ))}
        </div>
      )}
    </div>
  );
}
