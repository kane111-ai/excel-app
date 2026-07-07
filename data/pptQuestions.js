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

const TOPICS = ['新入社員研修', '月次業績報告', '新製品紹介', '安全衛生教育', 'プロジェクト提案', '品質改善報告', '設備投資計画', '海外拠点報告'];
const DEPTS = ['営業部', '製造部', '技術部', '品質保証部', '人事部'];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `p${idCounter.toString().padStart(4, '0')}`;
}

function genSlideBasics(rng) {
  const out = [];
  for (let i = 0; i < 5; i++) {
    const topic = pick(TOPICS, rng);
    out.push({
      id: nextId(),
      category: 'スライド作成',
      level: 1,
      text: `「${topic}」というタイトルのタイトルスライドを作成し、サブタイトルに発表日と部署名を入れよ`,
      hint: 'ホーム → 新しいスライド → タイトルスライドのレイアウトを選択',
    });
  }
  for (let i = 0; i < 4; i++) {
    const n = randInt(rng, 3, 6);
    out.push({
      id: nextId(),
      category: 'スライド作成',
      level: 1,
      text: `アジェンダスライドを作成し、箇条書きで${n}項目の見出しを入れよ`,
      hint: 'ホーム → 新しいスライド → タイトルとコンテンツ',
    });
  }
  out.push({
    id: nextId(),
    category: 'スライド作成',
    level: 2,
    text: 'アウトラインモードを使って、複数スライドの見出しを一気に入力せよ',
    hint: '表示 → アウトライン表示',
  });
  out.push({
    id: nextId(),
    category: 'スライド作成',
    level: 2,
    text: 'スライドの複製機能を使って、同じレイアウトのスライドを3枚作成せよ',
    hint: 'スライド一覧でCtrl+Dまたは右クリック→スライドの複製',
  });
  out.push({
    id: nextId(),
    category: 'スライド作成',
    level: 2,
    text: 'セクション機能を使って、スライドを「導入」「本編」「まとめ」の3グループに分けよ',
    hint: 'スライド一覧で右クリック → セクションの追加',
  });
  return out;
}

function genDesignQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: 'デザイン・レイアウト',
    level: 1,
    text: 'デザイナー機能（デザインアイデア）を使って、スライド全体の配色を統一せよ',
    hint: 'デザイン → デザイナー（Designer）',
  });
  out.push({
    id: nextId(),
    category: 'デザイン・レイアウト',
    level: 1,
    text: 'スライドマスターを編集し、全スライド共通のフッターに会社名を入れよ',
    hint: '表示 → スライドマスター → フッターを編集',
  });
  const dept = pick(DEPTS, rng);
  out.push({
    id: nextId(),
    category: 'デザイン・レイアウト',
    level: 2,
    text: `${dept}のロゴ画像をすべてのスライドの右下に統一して配置せよ`,
    hint: 'スライドマスターに画像を挿入すると全スライドに反映される',
  });
  out.push({
    id: nextId(),
    category: 'デザイン・レイアウト',
    level: 2,
    text: 'SmartArtを使って、業務フローを図解せよ',
    hint: '挿入 → SmartArt → 手順',
  });
  out.push({
    id: nextId(),
    category: 'デザイン・レイアウト',
    level: 2,
    text: '複数の図形を「配置」機能で均等に整列させよ',
    hint: '図形を選択 → 図形の書式 → 配置 → 上下中央揃え／左右に整列',
  });
  out.push({
    id: nextId(),
    category: 'デザイン・レイアウト',
    level: 3,
    text: 'グラフを挿入し、Excelのデータとリンクさせて自動更新できるようにせよ',
    hint: '挿入 → グラフ、またはExcelからコピーして「貼り付けのオプション」でリンク貼り付け',
  });
  return out;
}

function genAnimationQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: 'アニメーション',
    level: 1,
    text: '箇条書きに「フェード」のアニメーションを設定し、1行ずつ表示されるようにせよ',
    hint: 'アニメーション → フェード → 効果のオプションで段落ごとに設定',
  });
  out.push({
    id: nextId(),
    category: 'アニメーション',
    level: 2,
    text: '画面切り替えに「ワイプ」を設定し、全スライド共通で適用せよ',
    hint: '画面切り替え → ワイプ → すべてに適用',
  });
  out.push({
    id: nextId(),
    category: 'アニメーション',
    level: 2,
    text: 'アニメーションの順序を変更し、図形が先、テキストが後に表示されるようにせよ',
    hint: 'アニメーション ウィンドウでドラッグして順序を変更',
  });
  out.push({
    id: nextId(),
    category: 'アニメーション',
    level: 3,
    text: 'クリックせずに自動で次のスライドへ進むよう、画面切り替えのタイミングを設定せよ',
    hint: '画面切り替え → タイミング → 「自動的に切り替え」に秒数を設定',
  });
  return out;
}

const SHORTCUT_QUESTIONS = [
  { level: 1, text: 'F5キーでスライドショーを最初から開始してみよ', hint: 'F5＝最初から、Shift+F5＝現在のスライドから' },
  { level: 1, text: 'Ctrl + M で新しいスライドを追加してみよ', hint: '選択中のスライドの直後に追加される' },
  { level: 1, text: 'Ctrl + D でスライドを複製してみよ', hint: 'スライド一覧表示で使うと分かりやすい' },
  { level: 2, text: 'Shift + F9 でグリッド線の表示/非表示を切り替えよ', hint: '図形の位置揃えに便利' },
  { level: 1, text: 'Ctrl + Shift + C / Ctrl + Shift + V で書式のコピー/貼り付けをせよ', hint: '図形の色や文字書式だけをコピーできる' },
  { level: 2, text: 'スライドショー中にBキーを押して画面を黒くしてみよ', hint: 'Wキーで白画面、もう一度押すと復帰' },
  { level: 1, text: 'Ctrl + G で複数の図形をグループ化してみよ', hint: 'Ctrl+Shift+Gで解除できる' },
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

function genPresentQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: '発表・共同編集',
    level: 1,
    text: 'ノート機能を使って、発表用の話す内容をスライドごとにメモせよ',
    hint: '表示 → ノート、または画面下部のノート欄',
  });
  out.push({
    id: nextId(),
    category: '発表・共同編集',
    level: 2,
    text: '発表者ツールを使って、次のスライドとノートを見ながら発表する練習をせよ',
    hint: 'スライドショー → 発表者ツールを使用する',
  });
  out.push({
    id: nextId(),
    category: '発表・共同編集',
    level: 2,
    text: 'コメント機能で、同僚役の自分がスライドにフィードバックを付けよ',
    hint: '挿入 → コメント',
  });
  out.push({
    id: nextId(),
    category: '発表・共同編集',
    level: 2,
    text: '資料をPDFとしてエクスポートし、印刷用に配布資料形式（1枚に6スライド）で出力せよ',
    hint: 'ファイル → エクスポート → PDF/XPSの作成、または印刷設定で配布資料を選択',
  });
  return out;
}

const rng = mulberry32(20260708);

export const PPT_QUESTIONS = [
  ...genSlideBasics(rng),
  ...genDesignQuestions(rng),
  ...genAnimationQuestions(rng),
  ...genShortcutQuestions(),
  ...genPresentQuestions(rng),
];

export const PPT_CATEGORIES = [
  { name: 'スライド作成' },
  { name: 'デザイン・レイアウト' },
  { name: 'アニメーション' },
  { name: 'ショートカット' },
  { name: '発表・共同編集' },
];

export function pptQuestionsByCategory(category) {
  return PPT_QUESTIONS.filter((q) => q.category === category);
}
