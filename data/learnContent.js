export const SHORTCUTS = [
  { keys: 'Ctrl + C / Ctrl + V', desc: 'コピー / 貼り付け' },
  { keys: 'Ctrl + X', desc: '切り取り' },
  { keys: 'Ctrl + Z / Ctrl + Y', desc: '元に戻す / やり直す' },
  { keys: 'Ctrl + S', desc: '上書き保存' },
  { keys: 'Ctrl + P', desc: '印刷' },
  { keys: 'Ctrl + F / Ctrl + H', desc: '検索 / 置換' },
  { keys: 'Ctrl + 1', desc: 'セルの書式設定を開く' },
  { keys: 'Ctrl + Shift + $', desc: '通貨形式に変換' },
  { keys: 'Ctrl + Shift + %', desc: 'パーセント形式に変換' },
  { keys: 'Ctrl + ;', desc: '今日の日付を入力' },
  { keys: 'Ctrl + Shift + ;', desc: '現在時刻を入力' },
  { keys: 'Ctrl + D', desc: '上のセルの内容を下にコピー' },
  { keys: 'Ctrl + R', desc: '左のセルの内容を右にコピー' },
  { keys: 'Ctrl + 矢印キー', desc: 'データの端まで移動' },
  { keys: 'Ctrl + Shift + End', desc: 'データの最終セルまで選択' },
  { keys: 'Ctrl + Shift + L', desc: 'フィルターのオン/オフ' },
  { keys: 'Ctrl + T', desc: 'テーブルに変換' },
  { keys: 'Alt + Enter', desc: 'セル内で改行' },
  { keys: 'F2', desc: 'セルを編集モードにする' },
  { keys: 'F4', desc: '直前の操作を繰り返す／絶対参照の切り替え' },
  { keys: 'F9', desc: '数式を再計算' },
  { keys: 'Ctrl + PageUp / PageDown', desc: 'シートの切り替え' },
  { keys: 'Ctrl + Shift + +', desc: 'セル・行・列の挿入' },
  { keys: 'Ctrl + -', desc: 'セル・行・列の削除' },
  { keys: 'Alt + =', desc: 'SUM関数を自動挿入（オートSUM）' },
];

export const FUNCTION_CATEGORIES = [
  {
    name: '数学・統計',
    functions: [
      { name: 'SUM', desc: '合計を求める', example: '=SUM(A1:A10)' },
      { name: 'AVERAGE', desc: '平均を求める', example: '=AVERAGE(A1:A10)' },
      { name: 'ROUND', desc: '指定した桁数で四捨五入する', example: '=ROUND(A1,2)' },
      { name: 'MAX / MIN', desc: '最大値 / 最小値を求める', example: '=MAX(A1:A10)' },
      { name: 'COUNT / COUNTA', desc: '数値の個数 / データの個数を数える', example: '=COUNTA(A1:A10)' },
      { name: 'MEDIAN', desc: '中央値を求める', example: '=MEDIAN(A1:A10)' },
      { name: 'STDEV.P', desc: '標準偏差を求める', example: '=STDEV.P(A1:A10)' },
    ],
  },
  {
    name: '論理',
    functions: [
      { name: 'IF', desc: '条件によって処理を分岐する', example: '=IF(A1>=80,"合格","不合格")' },
      { name: 'IFS', desc: '複数条件を順番に判定する', example: '=IFS(A1>=90,"優",A1>=70,"良",TRUE,"可")' },
      { name: 'AND / OR', desc: '複数条件をすべて/いずれか満たすか判定', example: '=AND(A1>60,B1>60)' },
      { name: 'IFERROR', desc: 'エラー時に代わりの値を返す', example: '=IFERROR(A1/B1,"エラー")' },
    ],
  },
  {
    name: '検索・参照',
    functions: [
      { name: 'VLOOKUP', desc: '縦方向に検索して対応する値を返す', example: '=VLOOKUP(A1,範囲,2,FALSE)' },
      { name: 'XLOOKUP', desc: 'VLOOKUPの上位互換（新しいExcelのみ）', example: '=XLOOKUP(A1,検索範囲,返す範囲)' },
      { name: 'INDEX', desc: '範囲内の指定位置の値を返す', example: '=INDEX(範囲,3,2)' },
      { name: 'MATCH', desc: '検索値が範囲内で何番目かを返す', example: '=MATCH(A1,範囲,0)' },
    ],
  },
  {
    name: '文字列',
    functions: [
      { name: 'LEFT / RIGHT', desc: '文字列の先頭 / 末尾から指定文字数を取得', example: '=LEFT(A1,3)' },
      { name: 'MID', desc: '文字列の途中から指定文字数を取得', example: '=MID(A1,2,3)' },
      { name: 'CONCAT / &', desc: '文字列を連結する', example: '=A1&"様"' },
      { name: 'TRIM', desc: '余分な空白を除去する', example: '=TRIM(A1)' },
      { name: 'TEXT', desc: '数値を指定した書式の文字列に変換', example: '=TEXT(A1,"0.0%")' },
    ],
  },
  {
    name: '日付・時刻',
    functions: [
      { name: 'TODAY / NOW', desc: '今日の日付 / 現在の日時を返す', example: '=TODAY()' },
      { name: 'DATEDIF', desc: '2つの日付の差（年数・月数など）を計算', example: '=DATEDIF(A1,B1,"Y")' },
      { name: 'EOMONTH', desc: '指定月の月末日を返す', example: '=EOMONTH(A1,0)' },
      { name: 'WORKDAY', desc: '営業日を考慮した日付を計算', example: '=WORKDAY(A1,10)' },
    ],
  },
  {
    name: '財務',
    functions: [
      { name: 'PMT', desc: 'ローンの定期支払額を計算', example: '=PMT(利率/12,期間,元金)' },
      { name: 'NPV', desc: '正味現在価値を計算', example: '=NPV(割引率,範囲)' },
      { name: 'IRR', desc: '内部収益率を計算', example: '=IRR(範囲)' },
      { name: 'FV / PV', desc: '将来価値 / 現在価値を計算', example: '=FV(利率,期間,定期支払額)' },
    ],
  },
];

export const BASIC_TECHNIQUES = [
  {
    title: 'セル参照の基本（相対・絶対・複合）',
    body:
      '数式をコピーすると自動でずれるのが「相対参照」（例: A1）。ずれないようにするのが「絶対参照」（例: $A$1）。行だけ・列だけ固定するのが「複合参照」（例: $A1 や A$1）。F4キーで簡単に切り替えられる。',
  },
  {
    title: 'テーブル機能を使う理由',
    body:
      'Ctrl+Tで範囲をテーブル化すると、自動で見出しが固定され、フィルターが付き、数式が自動拡張される。行の追加・削除にも強くなるため、実務では生の範囲よりテーブルを使うのが基本。',
  },
  {
    title: '名前付き範囲',
    body:
      'よく使うセル範囲に名前を付けておくと、数式が =SUM(売上範囲) のように読みやすくなる。数式タブ → 名前の定義 から設定できる。',
  },
  {
    title: 'エラー値の意味を知る',
    body:
      '#REF!（参照先が削除された）、#N/A（該当データなし）、#DIV/0!（ゼロ除算）、#VALUE!（型が合わない）など、エラーの種類を見れば原因の見当がつく。',
  },
  {
    title: '条件付き書式は「ルールの管理」で全体を把握',
    body:
      '条件付き書式を複数設定すると混乱しがち。ホーム → 条件付き書式 → ルールの管理 で、シート全体のルールを一覧・整理できる。',
  },
  {
    title: 'ピボットテーブルは「元データがきれい」であることが前提',
    body:
      '結合セル・空白行・表記ゆれがあるとピボットが正しく集計できない。集計前にデータクレンジング（重複削除・TRIM・表記統一）を行う習慣をつける。',
  },
  {
    title: 'ショートカットは「よく使うものだけ」を覚える',
    body:
      '全部覚える必要はない。コピー系（Ctrl+C/V/D/R）、移動系（Ctrl+矢印）、書式系（Ctrl+1）、集計系（Alt+=）の4系統から少しずつ増やすのが効率的。',
  },
];
