export default function DownloadBanner({ label = '練習用Excelファイル' }) {
  return (
    <a
      href="/downloads/excel-practice-data.xlsx"
      download
      className="card flex items-center justify-between gap-3 px-4 py-3 mb-6 hover:border-steel-300 transition"
    >
      <div>
        <p className="text-sm font-medium text-steel-800">{label}をダウンロード</p>
        <p className="text-xs text-steel-400 mt-0.5">
          グラフ・書式・ピボット・データ整理の問題で使う実データが入っています
        </p>
      </div>
      <span className="px-3 py-1.5 text-sm rounded-md bg-steel-800 text-white whitespace-nowrap">
        ダウンロード
      </span>
    </a>
  );
}
