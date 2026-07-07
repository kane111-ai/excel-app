'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function CalcTask({ task, appLabel }) {
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
    const diff = Math.abs(num - task.expected);
    const ok = diff <= task.tolerance;
    setResult({
      ok,
      msg: ok
        ? `正解！ 目安の値: ${task.expected.toFixed(2)}${task.unit}`
        : `もう一度確認しましょう。目安の値: ${task.expected.toFixed(2)}${task.unit}（許容差 ±${task.tolerance}）`,
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
          topic: `${appLabel}: ${task.title}`,
          prompt: task.prompt,
          formulaHint: task.formulaHint,
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
      <h4 className="text-sm font-semibold text-steel-800 mb-1.5">{task.title}</h4>
      <p className="text-sm text-steel-600 mb-3">{task.prompt}</p>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`回答を入力（単位: ${task.unit}）`}
          className="border border-steel-200 rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-steel-400"
        />
        <button onClick={check} className="px-3 py-1.5 text-sm rounded-md bg-steel-800 text-white">
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
      {result && <p className={`text-sm ${result.ok ? 'text-emerald-600' : 'text-rose-600'}`}>{result.msg}</p>}
      {aiExplain && (
        <div className="mt-2 text-sm bg-steel-50 rounded-md px-3 py-2 whitespace-pre-wrap text-steel-700">
          {aiExplain}
        </div>
      )}
    </div>
  );
}

// title, scenario, checklist: [{id,label}], calcTasks: [{...}], appLabel: Gemini用のアプリ名
export default function ProjectWorkbook({ title, scenario, checklist, calcTasks, appLabel }) {
  const pathname = usePathname();
  const storageKey = `office-master:project:${pathname}`;

  const [checked, setChecked] = useState(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(new Set(JSON.parse(raw)));
    } catch (e) {
      /* noop */
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const toggle = (id) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...next]));
    } catch (e) {
      /* noop */
    }
  };

  const pct = checklist.length ? Math.round((checked.size / checklist.length) * 100) : 0;

  return (
    <div>
      <div className="card p-5 mb-6">
        <h2 className="font-semibold text-steel-800 mb-2">{title}</h2>
        <p className="text-sm text-steel-500 leading-relaxed">{scenario}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-steel-500 mb-2">
          <span>チェックリスト達成 {checked.size} / {checklist.length}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-steel-100 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-steel-700 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="card divide-y divide-steel-50">
          {checklist.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-steel-50"
            >
              <input
                type="checkbox"
                checked={loaded && checked.has(c.id)}
                onChange={() => toggle(c.id)}
                className="w-4 h-4 accent-steel-700"
              />
              <span className={`text-sm ${checked.has(c.id) ? 'text-steel-400 line-through' : 'text-steel-700'}`}>
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-steel-800 mb-3">記載する数値を計算してみよう</h3>
        {calcTasks.map((t) => (
          <CalcTask key={t.id} task={t} appLabel={appLabel} />
        ))}
      </div>
    </div>
  );
}
