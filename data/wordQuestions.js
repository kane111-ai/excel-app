function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

const DEPTS = ['営業部', '製造部', '技術部', '品質保証部', '総務部'];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `w${idCounter.toString().padStart(4, '0')}`;
}

function genFormatQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 1,
    text: '「議事録」というタイトルの文書を作成し、見出し1・見出し2のスタイルを使って「1. 会議概要／2. 決定事項／3. 今後のアクション」の章立てをせよ',
    hint: 'ホーム → スタイル → 見出し1／見出し2を適用',
  });
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 1,
    text: '「改善提案書」というタイトルの文書を作成し、見出し1・見出し2のスタイルを使って「1. 現状分析／2. 改善提案／3. 期待効果」の章立てをせよ',
    hint: 'ホーム → スタイル → 見出し1／見出し2を適用',
  });
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 1,
    text: '文書全体の余白を「狭い」に変更し、フォントをすべて明朝体に統一せよ',
    hint: 'レイアウト → 余白、ホーム → フォント',
  });
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 2,
    text: '「①材料を用意する ②型に流し込む ③24時間乾燥させる ④仕上げ加工を行う」という4手順を、段落番号を使ったリストで作成せよ',
    hint: 'ホーム → 段落番号',
  });
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 2,
    text: 'タブとリーダー線を使って、次の見積項目を「項目名 ……… 金額」の形式で3行作成せよ：材料費 120,000円／加工費 45,000円／運送費 18,000円',
    hint: 'ホーム → 段落 → タブとリーダー',
  });
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 2,
    text: '表を挿入し、氏名・部署・申請日・申請内容・承認欄の5項目からなる申請書を、セルの結合を使いながら作成せよ',
    hint: '挿入 → 表、表ツール → レイアウト → セルの結合／分割',
  });
  out.push({
    id: nextId(),
    category: '文書作成・書式',
    level: 3,
    text: 'スタイルセットを自作し、社内文書テンプレートとして保存せよ',
    hint: 'デザイン → スタイルセット → 新しいスタイルセットとして保存、ファイル → テンプレートとして保存',
  });
  return out;
}

function genReviewQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: '校閲・共同編集',
    level: 1,
    text: '変更履歴の記録をオンにして、文章を1箇所修正してみよ',
    hint: '校閲 → 変更履歴の記録',
  });
  out.push({
    id: nextId(),
    category: '校閲・共同編集',
    level: 2,
    text: '変更履歴のついた文書で、修正を1つ「承諾」、1つ「元に戻す」を行え',
    hint: '校閲 → 承諾 / 元に戻す',
  });
  const dept = pick(DEPTS, rng);
  out.push({
    id: nextId(),
    category: '校閲・共同編集',
    level: 2,
    text: `${dept}宛のコメントを文書内に追加し、返信してみよ`,
    hint: '挿入 → コメント、コメントに返信',
  });
  out.push({
    id: nextId(),
    category: '校閲・共同編集',
    level: 1,
    text: 'スペルチェック・文章校正機能を使って誤字脱字を確認せよ',
    hint: '校閲 → スペルチェックと文章校正',
  });
  out.push({
    id: nextId(),
    category: '校閲・共同編集',
    level: 3,
    text: '2つのバージョンの文書を比較し、差分を確認せよ',
    hint: '校閲 → 比較 → 2つの文書を比較',
  });
  return out;
}

function genLayoutQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: 'レイアウト・目次',
    level: 1,
    text: '見出しスタイルを使った文書に、自動で目次を挿入せよ',
    hint: '参考資料 → 目次 → 自動作成の目次',
  });
  out.push({
    id: nextId(),
    category: 'レイアウト・目次',
    level: 2,
    text: 'ページ番号をフッターに挿入し、表紙にはページ番号が表示されないようにせよ',
    hint: '挿入 → ページ番号、レイアウト → 区切り → セクション区切りを使用',
  });
  out.push({
    id: nextId(),
    category: 'レイアウト・目次',
    level: 2,
    text: '図表番号を自動で振り、「図1」「表1」のように参照できるようにせよ',
    hint: '参考資料 → 図表番号の挿入',
  });
  out.push({
    id: nextId(),
    category: 'レイアウト・目次',
    level: 3,
    text: '文書を2段組みに設定し、途中の1セクションだけ1段に戻せ',
    hint: 'レイアウト → 段組み、セクション区切りを挿入してから設定',
  });
  return out;
}

const SHORTCUT_QUESTIONS = [
  { level: 1, text: 'Ctrl + Enter で改ページを挿入してみよ', hint: '次のページから新しい内容を始めたいときに使う' },
  { level: 1, text: 'Ctrl + B / Ctrl + I / Ctrl + U で太字・斜体・下線を切り替えよ', hint: '選択した文字に対して適用される' },
  { level: 2, text: 'Ctrl + Shift + N で本文スタイルに戻してみよ', hint: '見出しスタイルを解除したいときに便利' },
  { level: 1, text: 'Ctrl + Home / Ctrl + End で文書の先頭・末尾に移動せよ', hint: '長い文書のナビゲーションに便利' },
  { level: 2, text: 'F12でファイルを別名で保存してみよ', hint: '「名前を付けて保存」ダイアログが開く' },
  { level: 1, text: 'Ctrl + Shift + 8 で編集記号（改行・スペースなど）の表示を切り替えよ', hint: '見えない書式を確認したいときに使う' },
  { level: 2, text: 'Alt + Shift + 右矢印 で見出しのアウトラインレベルを下げてみよ', hint: '見出し1→見出し2のように階層を変更できる' },
];

function genShortcutQuestions() {
  return SHORTCUT_QUESTIONS.map((q) => ({
    id: nextId(),
    category: 'ショートカット',
    level: q.level,
    text: q.text,
    hint: q.hint,
  }));
}

function genAutomationQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: '差し込み印刷・自動化',
    level: 2,
    text: 'Excelの練習用ファイル「データ整理用」シートの取引先リスト（会社名・担当者氏名）を差し込みデータとして使い、宛名だけが違う案内状をWordの差し込み印刷で作成せよ',
    hint: '差し込み文書 → 差し込み印刷の開始 → 宛先の選択 → 既存のリストを使用（Excelファイルを指定）',
  });
  out.push({
    id: nextId(),
    category: '差し込み印刷・自動化',
    level: 2,
    text: 'クイックパーツ（定型句）に会社の署名を登録し、呼び出せるようにせよ',
    hint: '挿入 → クイックパーツ → 選択範囲をクイックパーツギャラリーに保存',
  });
  out.push({
    id: nextId(),
    category: '差し込み印刷・自動化',
    level: 3,
    text: '文書のプロパティ（作成者・タイトル）を自動でヘッダーに表示させよ',
    hint: '挿入 → クイックパーツ → フィールド → DocProperty',
  });
  return out;
}

const rng = mulberry32(20260709);

export const WORD_QUESTIONS = [
  ...genFormatQuestions(rng),
  ...genReviewQuestions(rng),
  ...genLayoutQuestions(rng),
  ...genShortcutQuestions(),
  ...genAutomationQuestions(rng),
];

export const WORD_CATEGORIES = [
  { name: '文書作成・書式' },
  { name: '校閲・共同編集' },
  { name: 'レイアウト・目次' },
  { name: 'ショートカット' },
  { name: '差し込み印刷・自動化' },
];

export function wordQuestionsByCategory(category) {
  return WORD_QUESTIONS.filter((q) => q.category === category);
}
