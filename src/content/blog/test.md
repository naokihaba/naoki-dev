---
title: 'Zenn記法テスト'
description: 'zenn-markdown-html の動作確認用テストページ'
published: false
published_at: '2026-01-05'
---

## メッセージ記法

:::message
これは通常のメッセージです。
:::

:::message alert
これは警告メッセージです。
:::

## アコーディオン（トグル）

:::details 検証コードとログ出力

```js
console.log('Hello Zenn!');
const result = await fetchData();
console.log(result);
```

:::

## コードブロック（ファイル名付き）

```ts:example.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## リンクカード

https://zenn.dev

## ツイート埋め込み

https://x.com/home
