'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'ホーム' },
  { href: '/excel/functions', label: '関数トレーニング' },
  { href: '/excel/finance', label: '財務諸表分析' },
  { href: '/excel/learn', label: '学習タブ' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-steel-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-amberline rounded-sm inline-block" />
          <span className="font-semibold text-steel-800 tracking-tight">Excel Master</span>
        </Link>
        <nav className="flex gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-sm transition ${
                  active
                    ? 'bg-steel-800 text-white'
                    : 'text-steel-600 hover:bg-steel-50'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
