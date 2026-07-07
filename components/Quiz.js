'use client';

import { useEffect, useMemo, useState } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(shortcuts, featureCategories) {
  const pool = [];
  (shortcuts || []).forEach((s, i) => {
    pool.push({ id: `sc-${i}`, prompt: s.keys, answer: s.desc });
  });
  (featureCategories || []).forEach((cat) => {
    cat.functions.forEach((f, i) => {
      pool.push({ id: `fn-${cat.name}-${i}`, prompt: f.name, answer: f.desc });
    });
  });
  return pool;
}

const QUIZ_LENGTH = 10;

export default function Quiz({ shortcuts, featureCategories }) {
  const pool = useMemo(() => buildPool(shortcuts, featureCategories), [shortcuts, featureCategories]);

  const [mode, setMode] = useState('mc');
  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = order[index];

  const startQuiz = (chosenMode) => {
    const length = Math.min(QUIZ_LENGTH, pool.length);
    setMode(chosenMode);
    setOrder(shuffle(pool).slice(0, length));
    setIndex(0);
    setCorrectCount(0);
    setAnsweredCount(0);
    setSelected(null);
    setShowAnswer(false);
    setFinished(false);
    setStarted(true);
  };

  useEffect(() => {
    if (!started || mode !== 'mc' || !current) return;
    const distractors = shuffle(pool.filter((p) => p.id !== current.id))
      .slice(0, 3)
      .map((p) => p.answer);
    setOptions(shuffle([current.answer, ...distractors]));
    setSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, mode, index, current]);

  if (pool.length < 4) {
    return <p className="text-sm text-steel-500">テストに使えるデータが不足しています。</p>;
  }

  const goNext = () => {
    if (index + 1 >= order.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setShowAnswer(false);
    }
  };

  const chooseOption = (opt) => {
    if (selected) return;
    setSelected(opt);
    setAnsweredCount((c) => c + 1);
    if (opt === current.answer) setCorrectCount((c) => c + 1);
  };

  const markFlash = (know) => {
    setAnsweredCount((c) => c + 1);
    if (know) setCorrectCount((c) => c + 1);
    goNext();
  };

  if (!started) {
    return (
      <div className="card p-5 text-center">
        <p className="text-sm text-steel-600 mb-4">
          ショートカット・機能の説明から出題します（全{pool.length}問からランダムに{Math.min(QUIZ_LENGTH, pool.length)}問）。
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => startQuiz('mc')}
            className="px-4 py-2 text-sm rounded-md bg-steel-800 text-white"
          >
            四択テストを始める
          </button>
          <button
            onClick={() => startQuiz('flash')}
            className="px-4 py-2 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700"
          >
            一問一答を始める
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
    return (
      <div className="card p-6 text-center">
        <p className="text-sm text-steel-500 mb-1">結果</p>
        <p className="text-2xl font-semibold text-steel-800 mb-4">
          {correctCount} / {answeredCount} 正解（{pct}%）
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => startQuiz(mode)}
            className="px-4 py-2 text-sm rounded-md bg-steel-800 text-white"
          >
            もう一度同じ形式で
          </button>
          <button
            onClick={() => setStarted(false)}
            className="px-4 py-2 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700"
          >
            モード選択に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-steel-400 mb-3">
        <span>{mode === 'mc' ? '四択テスト' : '一問一答'}</span>
        <span>
          {index + 1} / {order.length}（正解 {correctCount}）
        </span>
      </div>

      <div className="card p-5">
        <p className="text-xs text-steel-400 mb-2">
          {mode === 'mc' ? 'これは何？ 正しい説明を選んでください' : 'この意味を思い出してみましょう'}
        </p>
        <p className="text-lg font-mono text-steel-800 mb-5">{current?.prompt}</p>

        {mode === 'mc' ? (
          <div className="space-y-2 mb-4">
            {options.map((opt) => {
              const isCorrect = opt === current.answer;
              const isSelected = opt === selected;
              let style = 'border-steel-200 hover:bg-steel-50 text-steel-700';
              if (selected) {
                if (isCorrect) style = 'border-emerald-300 bg-emerald-50 text-emerald-700';
                else if (isSelected) style = 'border-rose-300 bg-rose-50 text-rose-700';
              }
              return (
                <button
                  key={opt}
                  onClick={() => chooseOption(opt)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md border transition ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mb-4">
            {showAnswer ? (
              <div className="text-sm bg-steel-50 text-steel-700 rounded-md px-3 py-2">{current?.answer}</div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-3 py-1.5 text-sm rounded-md border border-steel-200 hover:bg-steel-50 text-steel-700"
              >
                答えを見る
              </button>
            )}
          </div>
        )}

        {mode === 'mc' ? (
          selected && (
            <button onClick={goNext} className="px-3 py-1.5 text-sm rounded-md bg-steel-800 text-white">
              次へ
            </button>
          )
        ) : (
          showAnswer && (
            <div className="flex gap-2">
              <button
                onClick={() => markFlash(true)}
                className="px-3 py-1.5 text-sm rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700"
              >
                分かった
              </button>
              <button
                onClick={() => markFlash(false)}
                className="px-3 py-1.5 text-sm rounded-md bg-rose-50 border border-rose-200 text-rose-700"
              >
                分からなかった
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
