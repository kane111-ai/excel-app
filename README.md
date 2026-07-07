# Excel Master

社会人になるまでにExcelを実践形式で鍛えるトレーニングアプリです。Next.js（App Router）+ Tailwind CSSで構築し、Gemini APIをサーバーサイド経由で利用します。

## 機能

- **関数トレーニング**: 関数・グラフ・書式・ピボット・ショートカット・データ整理の6カテゴリ、100問以上のお題（テンプレートから自動生成、数字はランダム）
- **財務諸表分析**: 架空企業3期分のPL/BS/CFを使った指標計算の演習（自己採点機能つき）
- **学習タブ**: ショートカットキー一覧・関数の種類一覧・基本テクニックのリファレンス
- **Gemini連携**: 自分の回答をAIに添削してもらう／指標の意味をAIに解説してもらう機能（任意）

進捗はブラウザのlocalStorageに保存され、サーバーには送信されません。

---

## ローカルでの動かし方

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Gemini APIキーの取得

1. [Google AI Studio](https://aistudio.google.com/apikey) にアクセス
2. Googleアカウントでログインし、「Create API key」からAPIキーを発行
3. 無料枠の範囲で利用できます（利用量に応じて上限あり）

### 3. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、取得したAPIキーを設定します。

```bash
cp .env.example .env.local
```

```
GEMINI_API_KEY=あなたのAPIキー
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:3000` で起動します。

---

## GitHubへのアップロード手順

```bash
cd excel-master
git init
git add .
git commit -m "Initial commit: Excel Master"
```

GitHub上で新規リポジトリを作成後（README等は追加しない）、以下を実行します。

```bash
git remote add origin https://github.com/【あなたのユーザー名】/excel-master.git
git branch -M main
git push -u origin main
```

`.env.local` は `.gitignore` に含まれているため、APIキーが誤ってアップロードされることはありません。

---

## Vercelへのデプロイ手順

1. [vercel.com](https://vercel.com) にGitHubアカウントでログイン
2. 「Add New...」→「Project」から、先ほどpushしたリポジトリをインポート
3. Framework Presetは自動で `Next.js` が検出されます（変更不要）
4. 「Environment Variables」に以下を追加
   - Key: `GEMINI_API_KEY`
   - Value: あなたのGemini APIキー
5. 「Deploy」をクリック

数分でデプロイが完了し、`https://excel-master-xxxx.vercel.app` のようなURLが発行されます。以降はGitHubにpushするたびに自動で再デプロイされます。

---

## ディレクトリ構成

```
excel-master/
  app/
    page.js                    ホーム
    excel/functions/page.js    関数トレーニング
    excel/finance/page.js      財務諸表分析
    excel/learn/page.js        学習タブ
    api/gemini/check/route.js  AI添削API
    api/gemini/hint/route.js   AI解説API
  components/                  UIコンポーネント
  data/
    questions.js                お題データ（自動生成ロジック含む）
    financeData.js               財務データ・演習問題
    learnContent.js               ショートカット・関数一覧・基本テクニック
```

## お題やデータのカスタマイズ

- `data/questions.js` の各 `gen〇〇Questions` 関数を編集すると、お題のテンプレートや生成数を増減できます。
- `data/financeData.js` の数値を変更すると、財務諸表の内容を差し替えられます（すべて架空の数値です）。
- `data/learnContent.js` にショートカットや関数を追加すると、学習タブに反映されます。
