# Markdown Viewer - 改善版

高校生の学習記録用Markdownブログシステム。数式対応、Supabase連携、パスワード保護機能付き。

## ✨ 主な機能

### 🔢 数式レンダリング
- KaTeXを使用したLaTeX数式の表示
- インライン数式: `$...$`
- ディスプレイ数式: `$$...$$`

### 🔒 パスワード保護
- Supabaseと連携した保護記事システム
- SHA-256によるパスワードハッシュ化
- セッションストレージによる自動ログイン

### 📁 カテゴリ別整理
- 数学、英語、歴史、プログラミングなどカテゴリごとにフォルダ分け
- タグとカテゴリによるフィルタリング

### 🎨 デザイン
- Solarizedカラーパレット
- ダークモード/ライトモード切り替え
- レスポンシブデザイン
- 保護記事は視覚的に区別される配色

## 📁 プロジェクト構造

```
markdown-viewer/
├── index.html                 # メインブログ一覧
├── 404.html                   # エラーページ
│
├── css/
│   └── common.css            # 共通スタイル
│
├── js/
│   ├── theme-toggle.js       # テーマ切り替え
│   ├── supabase-client.js    # Supabase接続
│   └── markdown-renderer.js  # Markdown & 数式レンダリング
│
├── blog/
│   ├── math/                 # 数学カテゴリ
│   ├── english/              # 英語カテゴリ
│   ├── history/              # 歴史カテゴリ
│   ├── programming/          # プログラミングカテゴリ
│   └── templates/
│       ├── post-template.html          # 通常記事テンプレート
│       └── protected-post-template.html # 保護記事テンプレート
│
└── images/
    └── favicon-md.png
```

## 🚀 セットアップ

### 1. Supabaseの設定

詳細は `SUPABASE_SETUP.md` を参照。

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. テーブルを作成（SQL提供）
3. URLとanon keyを取得

### 2. 設定ファイルの更新

#### `index.html`
```javascript
const SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',
  anonKey: 'your-anon-key'
};
```

#### 各保護記事ページ
```javascript
const POST_CONFIG = {
  slug: 'your-post-slug',
  category: 'math',
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key'
};
```

### 3. ローカルサーバーの起動

```bash
# Python
python -m http.server 8000

# Node.js (http-server)
npx http-server

# VS Code Live Server拡張機能
# または任意のローカルサーバー
```

http://localhost:8000 でアクセス

## ✍️ 記事の追加方法

### 通常の公開記事

1. カテゴリフォルダにMarkdownファイルを作成
   ```
   blog/math/my-new-post.md
   ```

2. `blog/templates/post-template.html` をコピー
   ```
   blog/math/my-new-post.html
   ```

3. `POST_META` を更新
   ```javascript
   const POST_META = {
     title: "新しい記事",
     date: "2026-01-28",
     tags: ["math", "calculus"],
     markdownFile: "my-new-post.md",
     readTime: 5
   };
   ```

4. `index.html` の `publicPosts` に追加
   ```javascript
   {
     id: "my-new-post",
     title: "新しい記事",
     date: "2026-01-28",
     category: "math",
     tags: ["math", "calculus"],
     excerpt: "記事の概要...",
     file: "blog/math/my-new-post.html",
     protected: false
   }
   ```

### パスワード保護記事

1. パスワードをハッシュ化
   ```javascript
   // ブラウザのコンソールで実行
   async function hashPassword(password) {
     const encoder = new TextEncoder();
     const data = encoder.encode(password);
     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
     const hashArray = Array.from(new Uint8Array(hashBuffer));
     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
   }
   
   hashPassword('your-password').then(console.log);
   ```

2. Supabaseに記事を挿入
   ```sql
   INSERT INTO protected_posts (slug, title, content, password_hash, category, tags)
   VALUES (
     'my-protected-post',
     'タイトル',
     'Markdownコンテンツ...',
     'ハッシュ化されたパスワード',
     'math',
     ARRAY['math', 'advanced']
   );
   ```

3. `blog/templates/protected-post-template.html` をコピー
   ```
   blog/math/protected-my-protected-post.html
   ```

4. `POST_CONFIG` を更新
   ```javascript
   const POST_CONFIG = {
     slug: 'my-protected-post',
     category: 'math',
     SUPABASE_URL: 'https://your-project.supabase.co',
     SUPABASE_ANON_KEY: 'your-anon-key'
   };
   ```

## 📝 Markdown機能

### 基本的な記法

```markdown
# 見出し1
## 見出し2
### 見出し3

**太字** *イタリック*

- リスト項目1
- リスト項目2

1. 番号付きリスト
2. 項目2

[リンク](https://example.com)

![画像](images/photo.jpg)
```

### 数式（KaTeX）

#### インライン数式
```markdown
文中に数式 $f(x) = x^2$ を埋め込む
```

#### ディスプレイ数式
```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

#### 複数行の数式
```markdown
$$
\begin{aligned}
f(x) &= x^2 + 2x + 1 \\
     &= (x + 1)^2
\end{aligned}
$$
```

### コードブロック

````markdown
```javascript
const x = 10;
console.log(x);
```
````

### テーブル

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| 1   | 2   | 3   |
```

### 引用

```markdown
> これは引用文です。
> 複数行にわたって書けます。
```

## 🎨 カスタマイズ

### カラーテーマの変更

`css/common.css` の変数を変更：

```css
:root {
  --accent: #268bd2;  /* アクセントカラー */
  --yellow: #b58900;  /* ホバー時の色 */
  /* ... */
}
```

### カテゴリの追加

1. `blog/` 以下に新しいフォルダを作成
   ```
   blog/science/
   ```

2. `index.html` の設定に追加
   ```javascript
   const categoryLabels = {
     science: '科学',
     // ...
   };
   ```

3. フィルターボタンを追加
   ```html
   <button class="filter-btn" data-filter="science">科学</button>
   ```

## 🔧 トラブルシューティング

### 数式が表示されない

- KaTeXのCDNリンクが正しく読み込まれているか確認
- コンソールでエラーを確認
- `$$` の前後に空行があるか確認

### CORSエラー

- ローカルサーバーを使用しているか確認
- `file://` プロトコルでは動作しません

### パスワードが正しいのにログインできない

- ハッシュが正しく生成されているか確認
- Supabaseのテーブルで `password_hash` を確認
- 大文字小文字を確認

### Supabaseから記事が取得できない

- anon keyが正しいか確認
- Row Level Security (RLS) の設定を確認
- ブラウザのネットワークタブでAPIレスポンスを確認

## 📚 参考資料

- [Marked.js](https://marked.js.org/) - Markdownパーサー
- [KaTeX](https://katex.org/) - 数式レンダリング
- [Supabase](https://supabase.com/docs) - バックエンド
- [Solarized](https://ethanschoonover.com/solarized/) - カラーパレット

## 🤝 サポート

質問やバグ報告：okamotoshoei451@gmail.com

## 📄 ライセンス

個人使用・学習目的のプロジェクト

---

**Happy Learning! 📖✨**