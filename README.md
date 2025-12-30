# TODOアプリ

Next.jsとTypeScriptで構築されたモダンなTODOリストアプリケーションです。

## 特徴

- ✨ Next.js 16 + TypeScript による型安全な実装
- 🎨 Tailwind CSS を使用したモダンなUI
- ✅ タスクの追加・削除・完了管理
- 🧪 Vitest による包括的なテストカバレッジ（10テスト）
- 📱 レスポンシブデザイン対応
- 🚀 GitHub Pages 対応（静的エクスポート）

## 主な機能

- **タスク管理**
  - 新しいタスクの追加
  - タスクの削除
  - タスクの完了/未完了の切り替え
  - タスク数と完了数の表示

- **使いやすいUI**
  - クリックまたはEnterキーでタスクを追加
  - チェックボックスで完了状態を管理
  - グラデーション背景の美しいデザイン

## 技術スタック

- **フレームワーク**: Next.js 16.1.1
- **言語**: TypeScript 5.9.3
- **スタイリング**: Tailwind CSS 3.4.19
- **テスト**: Vitest 4.0.16 + React Testing Library
- **ビルドツール**: Turbopack

## セットアップ

### 前提条件

- Node.js 18.x以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/roki511564/test-project.git
cd test-project

# 依存関係をインストール
npm install
```

## 使用方法

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### ビルド

```bash
npm run build
```

### 本番環境での実行

```bash
npm run start
```

### テストの実行

```bash
# テストを実行
npm test

# UIモードでテストを実行
npm run test:ui

# カバレッジレポート付きでテストを実行
npm run test:coverage
```

## プロジェクト構成

```
test-project/
├── app/                      # Next.js App Router
│   ├── __tests__/           # テストファイル
│   │   └── page.test.tsx    # メインページのテスト
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # メインページ（TODOアプリ）
├── old-html-app/            # 旧HTMLバージョン（参考用）
├── .gitignore               # Git除外設定
├── CLAUDE.md                # Claude Code設定
├── next.config.js           # Next.js設定
├── package.json             # 依存関係
├── postcss.config.js        # PostCSS設定
├── tailwind.config.js       # Tailwind CSS設定
├── tsconfig.json            # TypeScript設定
├── vitest.config.ts         # Vitest設定
└── vitest.setup.ts          # テストセットアップ
```

## テスト

このプロジェクトには10個のテストケースが含まれています：

- コンポーネントのレンダリング
- タスクの追加（通常/複数/Enterキー）
- バリデーション（空/スペースのみ）
- タスクの削除
- 完了状態の管理
- タスク数のカウント

すべてのテストは Vitest と React Testing Library を使用して記述されています。

## GitHub Pages

このプロジェクトは GitHub Pages にデプロイされています：
https://roki511564.github.io/test-project/

## ライセンス

ISC

## 作者

roki511564

---

🤖 このプロジェクトは [Claude Code](https://claude.com/claude-code) を使用して開発されました。
