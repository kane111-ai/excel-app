'use client';

import { useState } from 'react';
import { SHORTCUTS, FUNCTION_CATEGORIES, BASIC_TECHNIQUES } from '@/data/learnContent';

export default function LearnSection() {
  const [tab, setTab] = useState('shortcuts');

  return (
    <div>
      <div className="flex gap-1 mb-5">
        {[
          { key: 'shortcuts', label: 'ショートカット' },
          { key: 'functions', label: '関数の種類' },
          { key: 'basics', label: '基本テクニック' },
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

      {tab === 'shortcuts' && (
        <div className="grid sm:grid-cols-2 gap-2">
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="card px-3 py-2.5 flex items-center justify-between gap-3">
              <span className="font-mono text-xs bg-steel-50 text-steel-700 px-2 py-1 rounded">
                {s.keys}
              </span>
              <span className="text-sm text-steel-600 text-right">{s.desc}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'functions' && (
        <div className="space-y-6">
          {FUNCTION_CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-sm font-semibold text-steel-800 mb-2">{cat.name}</h3>
              <div className="card divide-y divide-steel-50">
                {cat.functions.map((f) => (
                  <div key={f.name} className="px-4 py-2.5 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-sm text-steel-800">{f.name}</span>
                      <span className="text-sm text-steel-500 ml-3">{f.desc}</span>
                    </div>
                    <span className="font-mono text-xs text-steel-400 whitespace-nowrap">{f.example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'basics' && (
        <div className="space-y-3">
          {BASIC_TECHNIQUES.map((b) => (
            <div key={b.title} className="card p-4">
              <h4 className="text-sm font-semibold text-steel-800 mb-1.5">{b.title}</h4>
              <p className="text-sm text-steel-600 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
