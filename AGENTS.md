# AGENTS.md

This file provides guidance to coding agents (Claude Code, Codex など) when working with code in this repository.

## コマンド

パッケージ管理は pnpm (`packageManager` で固定)。テストはない。

```bash
pnpm dev             # 開発サーバー (http://localhost:3000)
pnpm build           # 本番ビルド (全言語のページを静的生成)
pnpm start           # 本番ビルドの起動
pnpm lint            # eslint .
pnpm exec tsc --noEmit  # 型チェック (TypeScript 7)
```

- 変更後は lint・型チェック・ビルドで確認する。開発サーバーのキャッシュが古いと SSR とクライアントでハイドレーションエラーが出るので、その場合は `rm -rf .next/dev` してから `pnpm dev` を再起動する
- `next.config.js` や `src/proxy.ts` の変更は開発サーバーの再起動が必要

## ツールチェーンの注意点

- **TypeScript は 2 系統が入っている**: `@typescript/native` (= typescript 7) が `tsc` コマンドを提供し、`typescript` は `@typescript/typescript6` へのエイリアス。typescript-eslint と Next.js のビルド時型チェックは TS 6 の API を使う (TS 7 は API を持たないため)
- **ESLint 10 + eslint-plugin-react**: プラグインが ESLint 10 未対応のため、`eslint.config.js` で `settings.react.version` を明示している (`'detect'` にすると落ちる)
- **pnpm のビルドスクリプト**: `pnpm-workspace.yaml` の `allowBuilds` で許可・拒否を管理している。新しい依存がインストール時スクリプトを持つ場合は中身を確認して追記する
- Tailwind CSS は使っていない (削除済み)
- 改行コードは LF に統一している (`.gitattributes` の `* text=auto eol=lf`)

## アーキテクチャ

Next.js 16 (App Router) + React 19 + MUI 9。中身は「ランダム文字列ジェネレーター」(`/[locale]/random`) と、`public/image-table-converter/` の静的ページのみ。トップページ (`/[locale]`) は `https://hayu.io/#works` へ恒久リダイレクトするだけ。

### 多言語化 (next-intl)

- ロケールは `src/i18n/routing.ts` の `locales` で定義 (23 言語、既定は `ja`)。URL に必ずロケールが入る (`/ja/random`)
- `src/proxy.ts` (Next.js 16 で middleware から改名) がロケールの振り分けを行う。Accept-Language と `NEXT_LOCALE` Cookie を見て `/random` → `/{locale}/random` に転送する。`image-table-converter` と拡張子付きパスは対象外
- `src/i18n/request.ts` は `next/root-params` からロケールを取り、`messages/{locale}.json` を読む。`[locale]/layout.tsx` が `generateStaticParams` で全言語を静的生成する
- `src/global.ts` で next-intl の `AppConfig` を拡張し、`messages/ja.json` の形でメッセージキーを型付けしている。`UnicodeBlocks` だけは `Record<string, string>` 扱い
- 右から左に書く言語は `rtlLocales` (ar / fa / ur)。`[locale]/layout.tsx` が `<html dir>` を決め、`ClientLayout` が RTL 時に Emotion キャッシュへ `@mui/stylis-plugin-rtl` を差し込み、テーマの `direction` も切り替える。左右に依存する余白は `sx` の `mr`/`ml` を使えば自動で反転する

**言語を追加するときに触るファイル** (すべて揃っていないとビルドか型チェックが落ちる):

1. `src/i18n/routing.ts`: `locales`、必要なら `rtlLocales`、`localeNames` (その言語自身の表記)
2. `messages/{locale}.json`: `Metadata` / `Layout` / `Random` / `UnicodeBlocks` (280 件。キーは `ja.json` と完全一致)
3. `src/app/[locale]/random/charsets/{locale}.json`: その言語の汎用文字セット
4. `src/app/[locale]/random/unicode-blocks.ts`: 上の文字セット JSON の import と `charSets` への登録

### ランダム文字列ジェネレーター (`src/app/[locale]/random/`)

- `page.tsx` が状態 (`AppState`) と操作 (`AppActions`) を持ち、`RandomContext` (`Random.tsx`) 経由で `Generator.tsx` のフォームに渡す
- 文字の出どころは 3 つ: 言語ごとの汎用文字セット (`charsets/*.json` の `ranges` と `chars`)、Unicode ブロック (`unicode-blocks.ts` の `unicodeBlocks`、名前は `messages` の `UnicodeBlocks` に `${from}-${to}` をキーとして持つ)、追加文字。範囲は **from・to とも含む**。重複は `Set` で除く
- 汎用文字セットの `default: true` が初期選択。どの言語も「数字・ラテン大文字・ラテン小文字」を既定にしている
- Unicode ブロックの選択肢 (約 280 件) は `VirtualListbox.tsx` で react-window による仮想化をしている。キーボード操作時のスクロールは `VirtualListboxContext` 経由で行う
- 数値入力は `src/components/NumberField.tsx` (MUI 公式ドキュメントの Base UI NumberField ラッパーを取り込んだもの)

### UI とテーマ

- UI はすべて MUI の部品と `sx` で組む。素の HTML 要素や Tailwind クラスは使わない。Select は `native` を指定する
- `src/theme.ts` の `createAppTheme(direction)` がテーマを作る。ダークの配色は TablePlus の Silver Dark に合わせている。`colorSchemeSelector: 'class'` と `[locale]/layout.tsx` の `InitColorSchemeScript` で、OS 設定 / ライト / ダークの手動切替 (`src/components/ThemeSwitcher.tsx`) とちらつき防止を実現している
- ヘッダー右上の切替 (`ThemeSwitcher` / `LocaleSwitcher`) と `CopyButton` は `src/components/` にある
- AdSense は `[locale]/layout.tsx` の `<head>` に素の `<script async>` で、Google Analytics は `@next/third-parties/google` で読み込む

## コーディング規約

ユーザーのグローバル規約 (`~/.claude/CLAUDE.md`) に従う。主な点:

- 日本語でやり取りし、コメントも日本語。関数コメントは `/** 説明\n * MARK: 関数名 */` 形式
- 型は `type`、配列は `T[]`、`any` と不要な `as` は使わない
- 複数行ブロックの後や性質の違う処理の間は空行を入れる
- JSX の props はアルファベット順 (`react/jsx-sort-props`)、型のプロパティもソート (`sort/type-properties`)。`pnpm exec eslint --fix` で並べ替えられる

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
