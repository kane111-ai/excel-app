'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// links: [{href, label}]
export default function AppTabs({ links }) {
  const pathname = usePathname();
  return (
    <div className="flex gap-1 mb-5 border-b border-steel-100 pb-3">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-1.5 rounded-md text-sm transition ${
              active ? 'bg-steel-100 text-steel-800 font-medium' : 'text-steel-500 hover:bg-steel-50'
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
