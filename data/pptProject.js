import { PL, COMPANY_NAME } from './financeData';

// PL.labels: [売上高, 売上原価, 売上総利益, 販管費, 営業利益, 営業外収益, 営業外費用, 経常利益, 特別利益, 特別損失, 税引前当期純利益, 法人税等, 当期純利益]
const sales2024 = PL.values[0][0];
const sales2026 = PL.values[0][2];
const opIncome2026 = PL.values[4][2];
const netIncome2026 = PL.values[12][2];

export const PROJECT_TITLE = '決算説明会スライド作成演習';

export const PROJECT_SCENARIO = `あなたは${COMPANY_NAME}の経営企画部に配属されました。株主・投資家向けの「決算説明会」で使用するスライドを、PowerPointの財務諸表分析データを使って作成してください。実際にPowerPointを開いて、下のチェックリストの要素を1つずつ作りながら進めましょう。`;

export const CHECKLIST = [
  { id: 'ppt-c1', label: '表紙スライド（会社名・決算期・発表者名）を作成した' },
  { id: 'ppt-c2', label: 'アジェンダ（本日お話しする内容）のスライドを作成した' },
  { id: 'ppt-c3', label: '業績サマリー（売上高・営業利益・当期純利益）のスライドを作成した' },
  { id: 'ppt-c4', label: '3期分の売上高推移を棒グラフで示した' },
  { id: 'ppt-c5', label: '売上高営業利益率などの主要指標を表または図で示した' },
  { id: 'ppt-c6', label: '来期の見通し・重点施策のスライドを作成した' },
  { id: 'ppt-c7', label: 'まとめ／Q&Aのスライドで締めくくった' },
  { id: 'ppt-c8', label: 'スライドマスターで全スライドのデザイン（配色・フォント）を統一した' },
  { id: 'ppt-c9', label: 'アニメーションや画面切り替えを最低1箇所に設定した' },
];

export const CALC_TASKS = [
  {
    id: 'ppt-t1',
    title: '業績サマリーに記載する売上高（2026年3月期）',
    prompt: 'スライドに記載する2026年3月期の売上高（百万円）を入力せよ。',
    formulaHint: 'PLデータの売上高をそのまま使用',
    expected: sales2026,
    tolerance: 0,
    unit: '百万円',
  },
  {
    id: 'ppt-t2',
    title: '業績サマリーに記載する売上高営業利益率',
    prompt: '2026年3月期の売上高営業利益率（％）を計算して入力せよ。',
    formulaHint: '= 営業利益 ÷ 売上高 × 100',
    expected: (opIncome2026 / sales2026) * 100,
    tolerance: 0.5,
    unit: '%',
  },
  {
    id: 'ppt-t3',
    title: '3期分の売上高成長率',
    prompt: '2024年3月期から2026年3月期にかけての売上高成長率（％）を計算して入力せよ。',
    formulaHint: '= (2026年売上高 − 2024年売上高) ÷ 2024年売上高 × 100',
    expected: ((sales2026 - sales2024) / sales2024) * 100,
    tolerance: 0.5,
    unit: '%',
  },
  {
    id: 'ppt-t4',
    title: '業績サマリーに記載する当期純利益（2026年3月期）',
    prompt: 'スライドに記載する2026年3月期の当期純利益（百万円）を入力せよ。',
    formulaHint: 'PLデータの当期純利益をそのまま使用',
    expected: netIncome2026,
    tolerance: 0,
    unit: '百万円',
  },
];
