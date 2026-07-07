import { PL, BS, COMPANY_NAME } from './financeData';

const netIncome2026 = PL.values[12][2];
const sales2026 = PL.values[0][2];

// 自己資本 = 資本金+資本剰余金+利益剰余金+その他純資産（2026年3月期）
const equity2026 =
  BS.equity.values[0][2] + BS.equity.values[1][2] + BS.equity.values[2][2] + BS.equity.values[3][2];

// 総資産（2026年3月期）＝ 流動資産＋固定資産の全項目合計
const totalAssets2026 = BS.assets.values.reduce((sum, arr) => sum + arr[2], 0);

export const PROJECT_TITLE = '決算報告書作成演習';

export const PROJECT_SCENARIO = `あなたは${COMPANY_NAME}の経理部に配属されました。取締役会に提出する「決算報告書」を、Wordの財務諸表分析データを使って作成してください。実際にWordを開いて、下のチェックリストの要素を1つずつ作りながら進めましょう。`;

export const CHECKLIST = [
  { id: 'word-c1', label: '表紙（報告書タイトル・会社名・作成日）を作成した' },
  { id: 'word-c2', label: '見出しスタイルを使って「1. 業績概要／2. 財務分析／3. 今後の方針」の章立てをした' },
  { id: 'word-c3', label: '見出しスタイルから自動で目次を生成した' },
  { id: 'word-c4', label: '損益計算書のデータを表として挿入した' },
  { id: 'word-c5', label: '貸借対照表の要点（総資産・自己資本など）を表にまとめた' },
  { id: 'word-c6', label: '自己資本比率やROEなどの財務指標を算出し、本文中で言及した' },
  { id: 'word-c7', label: '表に「表1」「表2」のように図表番号を振った' },
  { id: 'word-c8', label: 'ページ番号をフッターに挿入した（表紙を除く）' },
  { id: 'word-c9', label: '変更履歴の記録をオンにして、誰かに見直してもらう想定で1箇所修正した' },
];

export const CALC_TASKS = [
  {
    id: 'word-t1',
    title: '報告書に記載する当期純利益（2026年3月期）',
    prompt: '報告書に記載する2026年3月期の当期純利益（百万円）を入力せよ。',
    formulaHint: 'PLデータの当期純利益をそのまま使用',
    expected: netIncome2026,
    tolerance: 0,
    unit: '百万円',
  },
  {
    id: 'word-t2',
    title: '自己資本比率（2026年3月期）',
    prompt: '財務分析の章に記載する自己資本比率（％）を計算して入力せよ。',
    formulaHint: '= 自己資本 ÷ 総資産 × 100',
    expected: (equity2026 / totalAssets2026) * 100,
    tolerance: 1,
    unit: '%',
  },
  {
    id: 'word-t3',
    title: 'ROE（自己資本利益率・2026年3月期）',
    prompt: '財務分析の章に記載するROE（％）を計算して入力せよ。',
    formulaHint: '= 当期純利益 ÷ 自己資本 × 100',
    expected: (netIncome2026 / equity2026) * 100,
    tolerance: 1,
    unit: '%',
  },
  {
    id: 'word-t4',
    title: '報告書に記載する売上高（2026年3月期）',
    prompt: '業績概要の章に記載する2026年3月期の売上高（百万円）を入力せよ。',
    formulaHint: 'PLデータの売上高をそのまま使用',
    expected: sales2026,
    tolerance: 0,
    unit: '百万円',
  },
];
