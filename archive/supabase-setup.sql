-- ================================================
-- Supabase Setup for Protected Documents
-- ================================================

-- 1. ドキュメントテーブル作成
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. パスワードテーブル作成
CREATE TABLE IF NOT EXISTS document_passwords (
    document_id TEXT PRIMARY KEY REFERENCES documents(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security を有効化
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_passwords ENABLE ROW LEVEL SECURITY;

-- 4. デフォルトでは誰もアクセスできないようにする
CREATE POLICY "No direct access to documents" 
    ON documents FOR ALL 
    USING (false);

CREATE POLICY "No direct access to passwords" 
    ON document_passwords FOR ALL 
    USING (false);

-- 5. pgcrypto拡張を有効化（パスワードハッシュ化に使用）
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 6. パスワード検証＆ドキュメント取得の関数
CREATE OR REPLACE FUNCTION verify_and_get_document(
    doc_id TEXT,
    user_password TEXT
)
RETURNS TABLE (
    id TEXT,
    title TEXT,
    content TEXT,
    category TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    stored_hash TEXT;
BEGIN
    -- パスワードハッシュを取得
    SELECT password_hash INTO stored_hash
    FROM document_passwords
    WHERE document_id = doc_id;

    -- ドキュメントが存在しない場合
    IF stored_hash IS NULL THEN
        RETURN;
    END IF;

    -- パスワード検証
    IF crypt(user_password, stored_hash) = stored_hash THEN
        -- パスワードが正しい場合、ドキュメントを返す
        RETURN QUERY
        SELECT d.id, d.title, d.content, d.category
        FROM documents d
        WHERE d.id = doc_id;
    ELSE
        -- パスワードが間違っている場合は何も返さない
        RETURN;
    END IF;
END;
$$;

-- 7. 新しいドキュメントを作成する関数
CREATE OR REPLACE FUNCTION create_protected_document(
    doc_id TEXT,
    doc_title TEXT,
    doc_content TEXT,
    doc_category TEXT,
    doc_password TEXT
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    -- ドキュメントを挿入
    INSERT INTO documents (id, title, content, category)
    VALUES (doc_id, doc_title, doc_content, doc_category);

    -- パスワードハッシュを挿入
    INSERT INTO document_passwords (document_id, password_hash)
    VALUES (doc_id, crypt(doc_password, gen_salt('bf')));

    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$;

-- ================================================
-- サンプルデータ挿入
-- ================================================

-- サンプル1: 試験対策ドキュメント（パスワード: exam2024）
SELECT create_protected_document(
    'exam-math-2024',
    '定期試験対策：数学',
    '# 定期試験対策：数学

## 出題範囲

### 1. 三角関数
- 基本的な定義
- 加法定理
- 合成

### 2. 微分
- 導関数の定義
- 微分の公式
- 接線の方程式

### 3. 積分
- 不定積分
- 定積分
- 面積計算

## 重要ポイント

### 三角関数の公式

```
sin²θ + cos²θ = 1
sin(α+β) = sinα cosβ + cosα sinβ
cos(α+β) = cosα cosβ - sinα sinβ
```

### 微分の公式

| 関数 | 導関数 |
|------|--------|
| x^n | nx^(n-1) |
| sin x | cos x |
| cos x | -sin x |
| e^x | e^x |

### よく出る問題パターン

1. **三角関数の最大・最小**
   - 合成を使う
   - 単位円で考える

2. **接線の方程式**
   - 微分係数 = 接線の傾き
   - y - y₁ = m(x - x₁)

3. **面積計算**
   - 上の関数 - 下の関数
   - 積分区間に注意

## 過去問分析

昨年の出題：
- 三角関数の合成（20点）
- 微分と増減表（30点）
- 定積分と面積（25点）
- 総合問題（25点）

## 試験直前チェックリスト

- [ ] 公式を全て暗記
- [ ] 過去問3年分を解く
- [ ] よく間違える問題を復習
- [ ] 計算ミスに注意
- [ ] 時間配分を確認

## まとめ

試験で高得点を取るコツ：
1. 基本公式を完璧に
2. 計算スピードを上げる
3. 見直し時間を確保
4. 部分点を狙う

頑張ってください！',
    'math',
    'exam2024'
);

-- サンプル2: 個人的な学習ノート（パスワード: private123）
SELECT create_protected_document(
    'private-notes-001',
    '個人的な学習ノート',
    '# 個人的な学習ノート

## 今週の目標

- [ ] 数学の問題集 p.50-60
- [ ] 英単語 100個
- [ ] 化学のレポート提出
- [ ] プログラミング課題

## 苦手分野メモ

### 数学
ベクトルの内積がまだ不安。
→ 問題集でもう一度復習する

### 英語
仮定法の使い分けが難しい。
→ 例文をたくさん読む

## アイデア

Webアプリで学習管理ツールを作りたい。
- カレンダー機能
- TODO管理
- 復習スケジュール自動生成

## 参考リンク

- [MDN Web Docs](https://developer.mozilla.org/)
- [Qiita](https://qiita.com/)

---

*これはプライベートなノートです*',
    'other',
    'private123'
);

-- ================================================
-- 確認クエリ
-- ================================================

-- すべてのドキュメントを確認
SELECT id, title, category, created_at FROM documents;

-- パスワード検証のテスト
SELECT * FROM verify_and_get_document('exam-math-2024', 'exam2024');