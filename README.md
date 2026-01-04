# naoki.dev

個人ブログサイト。技術ブログとして日々の学びやアウトプットを発信しています。

## 技術スタック

- **Astro 5.x** - 静的サイトジェネレーター
- **Panda CSS** - CSS-in-JS ライブラリ
- **Netlify** - ホスティング
- **TypeScript** - 型安全性

## 構築手順

### 1. プロジェクト作成

```bash
pnpm create astro@latest -- --template blog
cd naoki-dev
```

### 2. Panda CSS のセットアップ

```bash
pnpm add -D @pandacss/dev
pnpm panda init
```

`panda.config.ts` でセマンティックトークン（色、背景色など）を定義。

### 3. ダークモード実装

- `data-theme` 属性（`light` / `dark`）で切り替え
- OS のカラースキーム設定を自動検出（`prefers-color-scheme`）
- `ThemeToggle.astro` コンポーネントで手動切り替え
- Panda CSS のセマンティックトークンで色を一元管理

```typescript
// panda.config.ts - セマンティックトークン例
semanticTokens: {
  colors: {
    bg: {
      value: { base: '#ffffff', _dark: '#0d1117' }
    },
    text: {
      value: { base: '#1a1a1a', _dark: '#c9d1d9' }
    }
  }
}
```

### 4. Markdown スタイリング

```bash
pnpm add github-markdown-css
```

- `github-markdown-light.css` をインポート
- ダークモード用スタイルを `BlogPost.astro` に追加
- 箇条書き（`list-style-type`）を明示的に設定（CSS リセット対策）

### 5. タグ機能

#### Content Collection スキーマ

```typescript
// src/content.config.ts
schema: ({ image }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    tags: z.array(z.string()).default([]),
  }),
```

#### 関連ファイル

- `src/components/TagList.astro` - タグ表示コンポーネント
- `src/pages/tags/index.astro` - タグ一覧ページ（記事数順）
- `src/pages/tags/[tag].astro` - タグ別記事一覧

### 6. ページネーション

`src/pages/[...page].astro` で実装：

```typescript
export const getStaticPaths = (async ({ paginate }) => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  return paginate(posts, { pageSize: 10 });
}) satisfies GetStaticPaths;
```

### 7. 日付表示のローカライズ

`src/components/FormattedDate.astro`:

```typescript
date.toLocaleDateString('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
// 出力例: 2025年12月18日
```

### 8. ブログ記事の作成

`src/content/blog/` に Markdown ファイルを作成：

```markdown
---
title: '記事タイトル'
description: '記事の説明'
pubDate: '2025-12-18'
tags: ['Vue.js', 'TypeScript']
---

本文...
```

## プロジェクト構成

```
src/
├── components/
│   ├── BaseHead.astro      # メタタグ・OGP 設定
│   ├── Header.astro        # ヘッダー（SNS リンク）
│   ├── Footer.astro        # フッター
│   ├── ThemeToggle.astro   # ダークモード切替
│   ├── FormattedDate.astro # 日付フォーマット
│   └── TagList.astro       # タグ一覧表示
├── content/
│   └── blog/               # ブログ記事（Markdown）
├── layouts/
│   └── BlogPost.astro      # 記事レイアウト
├── pages/
│   ├── [...page].astro     # トップページ（ページネーション）
│   ├── blog/[...slug].astro # 記事詳細
│   └── tags/
│       ├── index.astro     # タグ一覧
│       └── [tag].astro     # タグ別記事
├── consts.ts               # サイト設定
└── content.config.ts       # Content Collection スキーマ
```

## コマンド

| コマンド       | 説明                                 |
| :------------- | :----------------------------------- |
| `pnpm install` | 依存関係のインストール               |
| `pnpm dev`     | 開発サーバー起動（`localhost:4321`） |
| `pnpm build`   | 本番ビルド（`./dist/`）              |
| `pnpm preview` | ビルドのプレビュー                   |

## ライセンス

MIT
