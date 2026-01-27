// 数学カテゴリーのドキュメント
const mathDocuments = [
    {
        id: 'doc-math-001',
        title: '三角関数の基礎',
        category: 'math',
        description: 'sin, cos, tanの基本から応用まで',
        file: 'math/trigonometry-basics.md',
        protected: false,
        tags: ['数学', '三角関数', '基礎']
    },
    // パスワード保護の例
    {
        id: 'doc-math-protected-001',
        title: '定期試験対策：数学',
        category: 'math',
        description: '来週の試験範囲のまとめ',
        file: null,
        protected: true,
        supabaseId: 'exam-math-2024',
        tags: ['数学', '試験対策', '限定公開']
    }
    // 新しいドキュメントをここに追加
];