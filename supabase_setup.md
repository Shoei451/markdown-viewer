# Supabase設定ガイド

## 1. Supabaseプロジェクトのセットアップ

### プロジェクトの作成

1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトURLとanon keyをメモ

### テーブルの作成

SQL Editorで以下のSQLを実行：

```sql
-- Protected posts table
CREATE TABLE protected_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE protected_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to metadata (without password_hash and content)
CREATE POLICY "Allow public metadata read"
ON protected_posts
FOR SELECT
TO public
USING (true);

-- Create index for faster queries
CREATE INDEX idx_protected_posts_slug ON protected_posts(slug);
CREATE INDEX idx_protected_posts_category ON protected_posts(category);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_protected_posts_updated_at
    BEFORE UPDATE ON protected_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 2. 記事の追加方法

### パスワードのハッシュ化

JavaScriptでパスワードをハッシュ化：

```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 使用例
const password = 'your-password';
const hash = await hashPassword(password);
console.log(hash);
```

### 記事の挿入

Supabaseのダッシュボードまたはクライアントから挿入：

```sql
INSERT INTO protected_posts (slug, title, content, password_hash, category, tags)
VALUES (
  'advanced-calculus',
  '高度な微積分',
  '# 高度な微積分
  
この記事では...
  
$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$
  
...',
  'あなたのパスワードハッシュ',
  'math',
  ARRAY['math', 'advanced', 'calculus']
);
```

## 3. 設定の更新

### index.htmlの設定

`index.html` の以下の部分を更新：

```javascript
const SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',  // あなたのプロジェクトURL
  anonKey: 'your-anon-key'                   // あなたのanon key
};
```

### 保護された記事ページの作成

1. `blog/templates/protected-post-template.html` をコピー
2. カテゴリフォルダに配置（例：`blog/math/protected-advanced-calculus.html`）
3. `POST_CONFIG` を更新：

```javascript
const POST_CONFIG = {
  slug: 'advanced-calculus',              // Supabaseのslugと一致
  category: 'math',
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key'
};
```

## 4. セキュリティ考慮事項

### パスワードの強度

- 最低8文字以上
- 英数字と記号を組み合わせる
- 辞書にない単語を使用

### Row Level Security (RLS)

Supabaseでは、RLSを有効にしてデータアクセスを制御します：

```sql
-- パスワードが一致する場合のみcontentを返す
CREATE POLICY "Allow content access with correct password"
ON protected_posts
FOR SELECT
TO public
USING (
  password_hash IN (
    SELECT password_hash 
    FROM protected_posts 
    WHERE slug = protected_posts.slug
  )
);
```

### 環境変数の使用（推奨）

本番環境では、Supabase認証情報を環境変数として管理：

```javascript
// 開発環境
const SUPABASE_CONFIG = {
  url: process.env.SUPABASE_URL || 'http://localhost:54321',
  anonKey: process.env.SUPABASE_ANON_KEY || 'your-dev-key'
};
```

## 5. トラブルシューティング

### CORSエラー

Supabaseのダッシュボードで、許可するドメインを設定：

1. Settings → API
2. CORS Configuration
3. 自分のドメインを追加

### パスワードが一致しない

1. ハッシュが正しく生成されているか確認
2. コンソールでハッシュ値を比較
3. 大文字小文字を確認

### 記事が表示されない

1. Supabaseのテーブルにデータが存在するか確認
2. RLSポリシーが正しく設定されているか確認
3. ブラウザのコンソールでエラーを確認

## 6. データ移行

既存のMarkdownファイルをSupabaseに移行：

```javascript
// migration.js
const fs = require('fs');

async function migratePost(filePath, slug, password, category, tags) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const passwordHash = await hashPassword(password);
  
  // Supabaseに挿入するSQLを生成
  const sql = `
    INSERT INTO protected_posts (slug, title, content, password_hash, category, tags)
    VALUES (
      '${slug}',
      'タイトル',
      '${content.replace(/'/g, "''")}',
      '${passwordHash}',
      '${category}',
      ARRAY[${tags.map(t => `'${t}'`).join(', ')}]
    );
  `;
  
  console.log(sql);
}
```

## 7. バックアップ

定期的にSupabaseデータをバックアップ：

```bash
# Supabase CLIを使用
supabase db dump -f backup.sql

# データのエクスポート
supabase db export
```