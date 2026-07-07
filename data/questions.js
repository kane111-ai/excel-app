// 決定論的な擬似乱数（サーバー/クライアントで同じ結果になるようにseed固定）
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

const DEPTS = ['営業部', '製造部', '技術部', '総務部', '品質保証部', '購買部', '人事部', '経理部'];
const PRODUCTS = ['薄板', '厚板', '鋼管', '棒鋼', '線材', '形鋼', 'めっき鋼板'];
const NAMES = ['田中', '佐藤', '鈴木', '高橋', '伊藤', '渡辺', '山本', '中村'];
const CITIES = ['東京', '大阪', '名古屋', '福岡', '仙台', '広島', '札幌'];
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `q${idCounter.toString().padStart(4, '0')}`;
}

function randFloat(rng, min, max, decimals) {
  const v = rng() * (max - min) + min;
  return Number(v.toFixed(decimals));
}

function genFunctionQuestions(rng) {
  const out = [];

  // SUM系（実データつき・3問）
  for (let i = 0; i < 3; i++) {
    const dept = pick(DEPTS, rng);
    const n = randInt(rng, 6, 9);
    const values = Array.from({ length: n }, () => randInt(rng, 40, 280));
    const sum = values.reduce((a, b) => a + b, 0);
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 1,
      text: `${dept}の売上データ（下の表、単位:百万円）をExcelに入力し、SUM関数で合計を求めよ`,
      sample: { label: `${dept}の売上データ（百万円）`, values },
      hint: `=SUM(範囲) で合計を求める。 正解: ${sum.toLocaleString()}`,
    });
  }

  // AVERAGE系（実データつき・3問）
  for (let i = 0; i < 3; i++) {
    const product = pick(PRODUCTS, rng);
    const n = randInt(rng, 5, 8);
    const values = Array.from({ length: n }, () => randInt(rng, 50, 300));
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 1,
      text: `「${product}」の月別出荷量（下の表、単位:トン）をExcelに入力し、AVERAGE関数で平均を求めよ`,
      sample: { label: `${product}の出荷量（トン）`, values },
      hint: `=AVERAGE(範囲) で平均を求める。 正解: ${avg.toFixed(1)}`,
    });
  }

  // ROUND系（実データつき・3問）
  for (let i = 0; i < 3; i++) {
    const digits = randInt(rng, 0, 2);
    const raw = randFloat(rng, 10, 999, 4);
    const rounded = Number(raw.toFixed(digits));
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 1,
      text: `数値「${raw}」をセルに入力し、小数点第${digits}位までに四捨五入せよ`,
      hint: `=ROUND(セル, ${digits}) で四捨五入する。 正解: ${rounded}`,
    });
  }

  // IF系（実データつき・4問）
  for (let i = 0; i < 4; i++) {
    const threshold = randInt(rng, 60, 95);
    const score = randInt(rng, 40, 100);
    const judged = score >= threshold ? '達成' : '未達';
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 2,
      text: `点数「${score}」をセルに入力し、${threshold}以上なら「達成」、未満なら「未達」と表示するIF関数を作成せよ`,
      hint: `=IF(セル>=${threshold},"達成","未達") 正解: 「${judged}」`,
    });
  }

  // COUNTIF系（実データつき・3問）
  for (let i = 0; i < 3; i++) {
    const target = pick(CITIES, rng);
    const n = 10;
    const values = Array.from({ length: n }, () => pick(CITIES, rng));
    // targetが最低2件は含まれるように調整
    values[0] = target;
    values[randInt(rng, 1, n - 1)] = target;
    const count = values.filter((v) => v === target).length;
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 2,
      text: `取引先の所在地一覧（下の表）をExcelに入力し、「${target}」の件数をCOUNTIF関数で数えよ`,
      sample: { label: '取引先の所在地一覧', values },
      hint: `=COUNTIF(範囲,"${target}") 正解: ${count}件`,
    });
  }

  // SUMIFS系（実データつき・3問）
  for (let i = 0; i < 3; i++) {
    const targetDept = pick(DEPTS, rng);
    const n = 6;
    const rows = Array.from({ length: n }, () => ({
      dept: pick(DEPTS, rng),
      amount: randInt(rng, 30, 200),
    }));
    rows[0].dept = targetDept;
    rows[Math.min(3, n - 1)].dept = targetDept;
    const sum = rows.filter((r) => r.dept === targetDept).reduce((s, r) => s + r.amount, 0);
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 3,
      text: `部署別売上データ（下の表、単位:百万円）をExcelに入力し、部署が「${targetDept}」の合計をSUMIFS関数で求めよ`,
      sample: {
        label: '部署別売上データ',
        table: { columns: ['部署', '売上（百万円）'], rows: rows.map((r) => [r.dept, r.amount]) },
      },
      hint: `=SUMIFS(売上列, 部署列,"${targetDept}") 正解: ${sum}`,
    });
  }

  // VLOOKUP系（概念問題・2問）
  for (let i = 0; i < 2; i++) {
    const target = pick(['商品コード', '社員番号', '取引先コード', '製品ID'], rng);
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 2,
      text: `${target}をキーにVLOOKUP関数で対応する名称を検索して表示せよ（自分でコード表と名称表を2列用意して試そう）`,
      hint: `=VLOOKUP(検索値, 範囲, 列番号, FALSE)`,
    });
  }

  // INDEX/MATCH系（概念問題・2問）
  for (let i = 0; i < 2; i++) {
    const name = pick(NAMES, rng);
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 3,
      text: `氏名「${name}」からINDEX/MATCH関数を組み合わせて所属部署を逆引きせよ（自分で氏名と部署の一覧表を用意して試そう）`,
      hint: `=INDEX(部署列, MATCH("${name}", 氏名列, 0))`,
    });
  }

  // 文字列関数（実データつき・2問）
  for (let i = 0; i < 2; i++) {
    const word = pick(['東北製鋼株式会社', '営業部第一課', '品質保証システム', '設備投資計画書'], rng);
    const n = randInt(rng, 2, 4);
    out.push({
      id: nextId(),
      category: '関数・数式',
      level: 2,
      text: `文字列「${word}」をセルに入力し、先頭${n}文字だけをLEFT関数で取り出せ`,
      hint: `=LEFT(セル, ${n}) 正解: 「${word.slice(0, n)}」`,
    });
  }

  return out;
}

function genChartQuestions(rng) {
  const out = [];

  out.push({
    id: nextId(),
    category: 'グラフ・可視化',
    level: 1,
    text: '練習用ファイルの「グラフ用」シートにある月別売上データ（A3:F16）で棒グラフを作成し、タイトルを「月別売上推移」にせよ',
    hint: 'データ選択 → 挿入 → グラフ → 縦棒グラフ',
  });
  out.push({
    id: nextId(),
    category: 'グラフ・可視化',
    level: 1,
    text: '「グラフ用」シートの製品別売上構成（A20:B26）を円グラフで表し、データラベルをパーセント表示にせよ',
    hint: 'グラフ右クリック → データラベルの追加 → パーセンテージ',
  });
  out.push({
    id: nextId(),
    category: 'グラフ・可視化',
    level: 2,
    text: '「グラフ用」シートの合計列（G列）を棒グラフ、前年比列（H列）を折れ線にした2軸グラフを作成せよ',
    hint: '系列を右クリック → 系列グラフの種類の変更 → 前年比の系列だけ第2軸に変更',
  });
  out.push({
    id: nextId(),
    category: 'グラフ・可視化',
    level: 2,
    text: '「グラフ用」シートの部署別売上（B4:F15）を使い、部署ごとの推移を1行にスパークラインで表示せよ',
    hint: '挿入 → スパークライン → 折れ線（部署が列方向なので、行方向に集計し直してから試すとやりやすい）',
  });
  out.push({
    id: nextId(),
    category: 'グラフ・可視化',
    level: 3,
    text: '「グラフ用」シートの営業利益の増減要因（A30:B36）をウォーターフォールチャートで可視化せよ',
    hint: '挿入 → グラフ → ウォーターフォール（Excel 2016以降）',
  });
  out.push({
    id: nextId(),
    category: 'グラフ・可視化',
    level: 2,
    text: '「グラフ用」シートの部署別売上（B4:F15）を積み上げ棒グラフにし、合計列（G列）を折れ線で重ねた複合グラフを作成せよ',
    hint: 'グラフの種類 → 組み合わせ → 積み上げ縦棒 + 折れ線（合計を第2軸に）',
  });
  return out;
}

function genFormatQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: '書式・見た目',
    level: 1,
    text: '練習用ファイルの「書式用」シートにある金額（D列）を3桁区切り（例：1,000,000）で表示せよ',
    hint: 'セルの書式設定 → 数値 → 桁区切りにチェック',
  });
  out.push({
    id: nextId(),
    category: '書式・見た目',
    level: 1,
    text: '「書式用」シートの前年比（C列）で、マイナスの値が自動的に赤字になるようにせよ',
    hint: 'ホーム → 条件付き書式 → セルの強調表示ルール → 指定の値より小さい',
  });
  out.push({
    id: nextId(),
    category: '書式・見た目',
    level: 2,
    text: '「書式用」シートの在庫数（B列）にデータバーを設定し、大小を視覚的に表示せよ',
    hint: 'ホーム → 条件付き書式 → データバー',
  });
  out.push({
    id: nextId(),
    category: '書式・見た目',
    level: 2,
    text: '「書式用」シートの納品日（E列）を「2026年4月5日（日）」のような形式で表示させよ',
    hint: 'セルの書式設定 → ユーザー定義 → yyyy"年"m"月"d"日"(aaa)',
  });
  out.push({
    id: nextId(),
    category: '書式・見た目',
    level: 3,
    text: '「書式用」シートの金額（D列）を自動的に「◯万円」単位に変換して表示せよ',
    hint: 'ユーザー定義書式: [>=10000]0.0"万円";0"円"',
  });
  out.push({
    id: nextId(),
    category: '書式・見た目',
    level: 2,
    text: '「書式用」シートの前年比（C列）にアイコンセットを設定し、プラス・マイナスを色分け表示せよ',
    hint: 'ホーム → 条件付き書式 → アイコンセット',
  });
  return out;
}

function genPivotQuestions(rng) {
  const out = [];
  const dept = pick(DEPTS, rng);
  out.push({
    id: nextId(),
    category: 'ピボット・集計',
    level: 1,
    text: '練習用ファイルの「ピボット用」シートの取引明細データ全体からピボットテーブルを作成し、部署別の合計売上高を集計せよ',
    hint: '挿入 → ピボットテーブル → 行に部署、値に売上高',
  });
  out.push({
    id: nextId(),
    category: 'ピボット・集計',
    level: 2,
    text: `「ピボット用」シートのデータでピボットテーブルを作り、スライサーを追加して「${dept}」だけを抽出できるようにせよ`,
    hint: 'ピボットテーブル分析 → スライサーの挿入 → 部署',
  });
  out.push({
    id: nextId(),
    category: 'ピボット・集計',
    level: 2,
    text: '「ピボット用」シートのデータで、月ごとの売上高を集計し、前月比（%）を計算フィールドとして追加せよ',
    hint: '日付から月を取り出す列を追加してからピボット化 → 値フィールドの設定 → 計算の種類 → 基準値との差分パーセンテージ',
  });
  out.push({
    id: nextId(),
    category: 'ピボット・集計',
    level: 3,
    text: 'GETPIVOTDATA関数を使い、作成したピボットテーブルの特定の部署の合計を別セルから参照せよ',
    hint: '=GETPIVOTDATA("売上高", ピボット範囲, "部署", "営業部")',
  });
  out.push({
    id: nextId(),
    category: 'ピボット・集計',
    level: 2,
    text: '「ピボット用」シートのデータで、担当者別の売上高を集計方法「平均」で表示せよ',
    hint: '値フィールドの設定 → 集計方法 → 平均',
  });
  return out;
}

const SHORTCUT_QUESTIONS = [
  { level: 1, text: 'Ctrl + Shift + End で何が起こるか確認し、実際に使ってみよ', hint: 'データが入力されている最終セルまで選択範囲を拡張する' },
  { level: 1, text: 'Alt + Enter でセル内に改行を入れてみよ', hint: '1つのセル内で文章を複数行にできる' },
  { level: 1, text: 'Ctrl + D と Ctrl + R の違いを確認せよ', hint: 'D=上のセルを下にコピー、R=左のセルを右にコピー' },
  { level: 1, text: 'Ctrl + 矢印キーでデータ端まで一気に移動してみよ', hint: '連続データの最後のセルへジャンプする' },
  { level: 2, text: 'Ctrl + Shift + L でフィルターのオン/オフを切り替えよ', hint: '表内のセルを選択してから実行する' },
  { level: 2, text: 'F4キーで絶対参照・複合参照・相対参照を順番に切り替えよ', hint: '数式のセル参照を選択した状態でF4を連打する' },
  { level: 2, text: 'Ctrl + 1 でセルの書式設定ダイアログを開いてみよ', hint: 'あらゆる書式設定の入り口になるショートカット' },
  { level: 1, text: 'Ctrl + PageDown / PageUp でシートを切り替えよ', hint: '複数シートがあるブックで試す' },
  { level: 2, text: 'Alt → A → M でExcelの重複削除機能を開いてみよ', hint: 'メニューショートカットの組み合わせ' },
  { level: 1, text: 'Ctrl + ; （セミコロン）で今日の日付を一発入力せよ', hint: '入力した瞬間の日付が固定値で入る' },
  { level: 2, text: 'Ctrl + Shift + $ で通貨形式に一括変換せよ', hint: '選択範囲がまとめて¥表示になる' },
  { level: 1, text: 'Ctrl + Z / Ctrl + Y で元に戻す・やり直すを繰り返し試せ', hint: '操作ミスの復旧に必須' },
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

function genDataCleanupQuestions(rng) {
  const out = [];
  out.push({
    id: nextId(),
    category: 'データ整理',
    level: 1,
    text: '練習用ファイルの「データ整理用」シートにある取引先リストの重複データを「重複の削除」機能で取り除け',
    hint: 'データ → 重複の削除',
  });
  out.push({
    id: nextId(),
    category: 'データ整理',
    level: 1,
    text: '「データ整理用」シートの担当者氏名（B列、「田中 太郎」のような形式）を姓と名の2列に分割せよ',
    hint: 'データ → 区切り位置 → スペースで区切る',
  });
  out.push({
    id: nextId(),
    category: 'データ整理',
    level: 2,
    text: '「データ整理用」シートのメールアドレス（C列）から、フラッシュフィルを使って会社ドメインだけを抽出せよ',
    hint: 'Ctrl + E、またはデータ → フラッシュフィル',
  });
  out.push({
    id: nextId(),
    category: 'データ整理',
    level: 2,
    text: '「データ整理用」シートの所在地（D列）には余分な空白が入っている。TRIM関数で除去せよ',
    hint: '=TRIM(D4)',
  });
  out.push({
    id: nextId(),
    category: 'データ整理',
    level: 3,
    text: '「データ整理用」シートと「ピボット用」シートのように、複数シートのデータをPower Queryで1つの表に統合する練習をせよ',
    hint: 'データ → データの取得 → クエリのマージ／追加',
  });
  out.push({
    id: nextId(),
    category: 'データ整理',
    level: 2,
    text: '「データ整理用」シートに新しい列を1つ追加し、入力規則（データの入力規則）で「新規／既存／解約」のプルダウンリストを作成せよ',
    hint: 'データ → データの入力規則 → リスト',
  });
  return out;
}

// 決定論的seedで生成（サーバー・クライアントで結果が一致する）
const rng = mulberry32(20260707);

export const QUESTIONS = [
  ...genFunctionQuestions(rng),
  ...genChartQuestions(rng),
  ...genFormatQuestions(rng),
  ...genPivotQuestions(rng),
  ...genShortcutQuestions(),
  ...genDataCleanupQuestions(rng),
];

export const CATEGORIES = [
  { name: '関数・数式', icon: 'fx' },
  { name: 'グラフ・可視化', icon: 'chart' },
  { name: '書式・見た目', icon: 'format' },
  { name: 'ピボット・集計', icon: 'pivot' },
  { name: 'ショートカット', icon: 'key' },
  { name: 'データ整理', icon: 'clean' },
];

export function questionsByCategory(category) {
  return QUESTIONS.filter((q) => q.category === category);
}
