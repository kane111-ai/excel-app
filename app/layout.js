import './globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Excel Master | 社会人準備トレーニング',
  description: 'Excel関数・財務諸表分析・ショートカットを実践形式で学ぶトレーニングアプリ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Nav />
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
        <footer className="max-w-5xl mx-auto px-6 py-10 text-xs text-steel-400">
          Excel Master — 個人学習用トレーニングアプリ
        </footer>
      </body>
    </html>
  );
}
