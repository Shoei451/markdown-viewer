# クイックスタートガイド

## 📦 このプロジェクトについて

Markdownブログシステムに以下の機能を追加しました：

✅ **数式レンダリング** (KaTeX)
✅ **Supabase連携** でパスワード保護記事
✅ **カテゴリ別フォルダ構造**
✅ **視覚的に区別されるデザイン**（保護記事はマゼンタ色）

## 🚀 すぐに始める（3ステップ）

### 1. ローカルサーバーを起動

```bash
# このフォルダで実行
python -m http.server 8000
```

ブラウザで http://localhost:8000 を開く

### 2. 記事を追加

#### 通常の記事（公開）

1. `blog/math/my-post.md` を作成
2. `blog/templates/post-template.html` をコピーして `blog/math/my-post.html` に
3. `index.html` の `publicPosts` 配列に追加

#### パスワード保護記事

1. `SUPABASE_SETUP.md` を読んでSupabaseを設定
2. 記事をSupabaseに追加
3. `blog/templates/protected-post-template.html` を使用

### 3. 数式を書く

Markdownファイルで：

```markdown
インライン数式: $f(x) = x^2$

ディスプレイ数式:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

## 📁 ファイル配置

```
あなたのフォルダ/
├── index.html          ← メイン
├── css/common.css      ← スタイル
├── js/
│   ├── theme-toggle.js
│   ├── supabase-client.js
│   └── markdown-renderer.js
├── blog/
│   ├── math/           ← カテゴリフォルダ
│   ├── english/
│   ├── history/
│   ├── programming/
│   └── templates/      ← テンプレート
└── images/
    └── favicon-md.png  ← あなたのfavicon
```

## 🔧 最初にやること

1. **Faviconを配置**
   - `images/favicon-md.png` に200x200pxの画像を配置

2. **Supabase設定（パスワード保護記事を使う場合）**
   ```javascript
   // index.html の 158行目あたり
   const SUPABASE_CONFIG = {
     url: 'https://your-project.supabase.co',  // ← 変更
     anonKey: 'your-anon-key'                   // ← 変更
   };
   ```

3. **カテゴリフォルダを追加**
   ```bash
   mkdir blog/science
   mkdir blog/literature
   ```

## 📝 サンプル記事

`blog/math/post-1.md` にKaTeXを使った数式のサンプルがあります。

## 💡 Tips

### 数式が表示されないとき
- ブラウザのコンソールを確認
- `$$` の前後に空行があるか確認

### CORSエラー
- `file://` プロトコルではなく、必ずローカルサーバーを使う

### 記事が増えてきたら
- `index.html` の `publicPosts` 配列で並び順を管理
- 日付が新しい順に並べると見やすい

## 📚 詳しい説明

- `README.md` - 全体的な説明
- `SUPABASE_SETUP.md` - Supabaseの詳細設定
- `PROJECT_STRUCTURE.md` - プロジェクト構造

## 🆘 困ったら

okamotoshoei451@gmail.com までご連絡ください。

---

**Happy Learning! 📖✨**