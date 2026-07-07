'use client';

import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, questionsByCategory } from '@/data/questions';

const STORAGE_KEY = 'excel-master:done-v1';
const LEVEL_LABEL = { 1: '初級', 2: '中級', 3: '上級' };
const LEVEL_STYLE = {
  1: 'bg-emerald-50 text-emerald-700',
  2: 'bg-amber-50 text-amber-700',
  3: 'bg-rose-50 text-rose-700',
};

export default function FunctionsTrainer() {
  const [done, setDone] = useState(new Set());
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [checking, setChecking] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(new Set(JSON.parse(raw)));
    } catch (e) {
      /* noop */
    }
  }, []);

  const persist = (next) => {
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch (e) {
      /* noop */
    }
  };

  const questions = useMemo(() => questionsByCategory(category), [category]);
  const q = questions[index];

  const totalCount = useMemo(
    () => CATEGORIES.reduce((sum, c) => sum + questionsByCategory(c.name).length, 0),
    []
  );

  const toggleDone = () => {
    const next = new Set(done);
    if (next.has(q.id)) next.delete(q.id);
    else next.add(q.id);
    persist(next);
  };

  const askGemini = async () => {
    if (!userAnswer.trim()) return;
    setChecking(true);
    setAiFeedback(null);
    try {
      const res = await fetch('/api/gemini/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q.text, userAnswer, hint: q.hint }),
      });
      const data = await res.json();
      setAiFeedback(data.result || 'AIからの応答を取得できませんでした。');
    } catch (e) {
      setAiFeedback('エラーが発生しました。GEMINI_API_KEYが設定されているか確認してください。');
    } finally {
      setChecking(false);
    }
  };

  const doneCount = done.size;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-steel-500 mb-2">
          <span>
            達成 {doneCount} / {totalCount}
          </span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-steel-100 rounded-full overflow-hidden">
          <div className="h-full bg-steel-700 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {CATEGORIES.map((c) => {
          const qs = questionsByCategory(c.name);
          const doneInCat = qs.filter((qq) => done.has(qq.id)).length;
          const active = category === c.name;
          return (
            <button
              key={c.name}
              onClick={() => {
                setCategory(c.name);
                setIndex(0);
                setShowHint(false);
                setAiFeedback(null);
                setUserAnswer('');
              }}
              className={`card text-left px-3 py-3 transition ${
                active ? 'border-steel-700 ring-1 ring-steel-700' : 'hover:border-steel-300'
              }`}
            >
              <div className="text-sm font-medium text-steel-800">{c.name}</div>
              <div className="text-xs text-steel-400 mt-1">
                {doneInCat}/{qs.length} 達成
              </div>
            </button>
          );
        })}
      </div>

      {q && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`badge ${LEVEL_STYLE[q.level]}`}>{LEVEL_LABEL[q.level]}</span>
              <span className="text-xs text-steel-400">{category}</span>
            </div>
            <span className="text-xs text-steel-400">
              {index + 1} / {questions.length}
            </span>
          </div>

          <p className="text-steel-800 leading-relaxed mb-4">{q.text}</p>

          {showHint && (
            <div className="text-sm bg-steel-50 text-steel-600 rounded-md px-3 py-2 mb-4 font-mono">
              {q.hint}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={toggleDone}
              className={`px-3 py-1.5 text-sm rounded-md border transition ${
                done.has(q.id)
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'border-steel-200 hover:bg-steel-50 text-steel-700'
              }`}
            >
              {done.has(q.id) ? '達成済み ✓' : '達成した！'}
            </button>
            <button
              onClick={() => setShowHint((v) => !v)}
              className="px-3 py-1.5 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700"
            >
              ヒント
            </button>
            {index > 0 && (
              <button
                onClick={() => {
                  setIndex((i) => i - 1);
                  setShowHint(false);
                  setAiFeedback(null);
                }}
                className="px-3 py-1.5 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700"
              >
                前へ
              </button>
            )}
            {index < questions.length - 1 && (
              <button
                onClick={() => {
                  setIndex((i) => i + 1);
                  setShowHint(false);
                  setAiFeedback(null);
                }}
                className="px-3 py-1.5 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700"
              >
                次へ
              </button>
            )}
          </div>

          <div className="border-t border-steel-100 pt-4">
            <p className="text-xs text-steel-400 mb-2">
              自分の数式・回答をAI（Gemini）に添削してもらう（任意）
            </p>
            <div className="flex gap-2">
              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="例: =SUM(B1:B20)"
                className="flex-1 border border-steel-200 rounded-md px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-steel-400"
              />
              <button
                onClick={askGemini}
                disabled={checking}
                className="px-3 py-1.5 text-sm rounded-md bg-steel-800 text-white disabled:opacity-50"
              >
                {checking ? '確認中...' : 'AIに聞く'}
              </button>
            </div>
            {aiFeedback && (
              <div className="mt-3 text-sm bg-steel-50 rounded-md px-3 py-2 whitespace-pre-wrap text-steel-700">
                {aiFeedback}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
