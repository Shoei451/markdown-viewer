# 🚀 クイックスタートガイド

## 最速で始める（5分）

### 1. ファイルを開く

```
markdown-viewer/index.html をブラウザで開く
```

### 2. ドキュメントを見る

- カードをクリックしてドキュメント表示
- 右上のボタンでDark/Light切替

### 3. 自分のドキュメントを追加

**Step 1: Markdownファイルを作る**

`markdowns/math/my-document.md` を作成:

```markdown
# 私のドキュメント

これは私が作ったドキュメントです。

## セクション1

内容...
```

**Step 2: documents-data.js に登録**

`js/documents-data.js` を開いて、`documents` 配列に追加:

```javascript
{
    id: 'my-first-doc',
    title: '私のドキュメント',
    category: 'math',
    description: '初めて作ったドキュメント',
    file: 'math/my-document.md',
    protected: false,
    tags: ['自作', '数学']
}
```

**Step 3: ブラウザで確認**

`index.html` を再読み込み → カードが追加されている！

---

## パスワード保護を使う場合

### 1. Supabaseセットアップ（10分）

1. https://supabase.com でアカウント作成
2. 新しいプロジェクトを作成
3. SQL Editorで `supabase-setup.sql` を実行
4. Settings → API から認証情報をコピー

### 2. viewer.html を編集

```javascript
// 18-19行目あたり
const SUPABASE_URL = 'あなたのURL';
const SUPABASE_ANON_KEY = 'あなたのキー';
```

### 3. 保護ドキュメントを追加

Supabase SQL Editorで:

```sql
SELECT create_protected_document(
    'test-doc',
    'テストドキュメント',
    '# 保護されたコンテンツ

これはパスワード保護されています。',
    'math',
    'mypassword123'
);
```

### 4. documents-data.js に登録

```javascript
{
    id: 'protected-test',
    title: 'テストドキュメント',
    category: 'math',
    description: 'パスワード保護のテスト',
    file: null,
    protected: true,
    supabaseId: 'test-doc',
    tags: ['限定公開']
}
```

### 5. 試す

1. index.html で 🔒 マークのカードをクリック
2. パスワード入力: `mypassword123`
3. ドキュメント表示成功！

---

## トラブルシューティング

### ドキュメントが表示されない

→ ブラウザのコンソール（F12）でエラー確認

### CSSが効いていない

→ ファイルパスを確認（相対パスが正しいか）

### パスワード認証が動かない

→ Supabaseの設定を確認
→ `verify_and_get_document` 関数が作成されているか

---

## 次のステップ

詳しい使い方は `README.md` を参照してください！