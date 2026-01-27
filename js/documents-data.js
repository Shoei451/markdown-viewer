// Documents Configuration
// Define your markdown documents here with categories and protection settings

const documentsData = {
    // Categories for organizing documents
    categories: {
        'math': {
            name: '数学',
            icon: '📐',
            color: '#b58900'
        },
        'english': {
            name: '英語',
            icon: '📚',
            color: '#2aa198'
        },
        'science': {
            name: '理科',
            icon: '🔬',
            color: '#859900'
        },
        'history': {
            name: '歴史',
            icon: '📜',
            color: '#cb4b16'
        },
        'programming': {
            name: 'プログラミング',
            icon: '💻',
            color: '#268bd2'
        },
        'other': {
            name: 'その他',
            icon: '📄',
            color: '#6c71c4'
        }
    },
    
    // Documents list
    documents: [
        // ===== パスワード保護なしのドキュメント =====
        {
            id: 'doc-001',
            title: '三角関数の基礎',
            category: 'math',
            description: 'sin, cos, tanの基本から応用まで',
            file: 'trigonometry-basics.md',  // markdownsフォルダ内のパス
            protected: false,  // パスワード保護なし
            tags: ['数学', '三角関数', '基礎']
        },
        {
            id: 'doc-002',
            title: '英文法：仮定法',
            category: 'english',
            description: '仮定法過去・仮定法過去完了の使い方',
            file: 'subjunctive-mood.md',
            protected: false,
            tags: ['英語', '文法', '仮定法']
        },
        {
            id: 'doc-003',
            title: 'JavaScript基礎',
            category: 'programming',
            description: '変数、関数、オブジェクトの基本',
            file: 'programming/javascript-basics.md',
            protected: false,
            tags: ['プログラミング', 'JavaScript', '基礎']
        },
        
        // ===== パスワード保護ありのドキュメント =====
        {
            id: 'doc-protected-001',
            title: '定期試験対策：数学',
            category: 'math',
            description: '来週の試験範囲のまとめ',
            file: null,  // fileがnullの場合はSupabaseから取得
            protected: true,  // パスワード保護あり
            supabaseId: 'exam-math-2024',  // Supabaseのドキュメント/パスワードID
            tags: ['数学', '試験対策', '限定公開']
        },
        {
            id: 'doc-protected-002',
            title: '個人的な学習ノート',
            category: 'other',
            description: 'プライベートな学習記録',
            file: null,
            protected: true,
            supabaseId: 'private-notes-001',
            tags: ['個人用', '限定公開']
        },
        
        // ===== 追加ドキュメントの例 =====
        {
            id: 'doc-004',
            title: '化学反応式の作り方',
            category: 'science',
            description: '化学反応式のバランスの取り方',
            file: 'science/chemical-equations.md',
            protected: false,
            tags: ['化学', '反応式', '基礎']
        },
        {
            id: 'doc-005',
            title: '明治維新まとめ',
            category: 'history',
            description: '幕末から明治時代初期の主要事件',
            file: 'history/meiji-restoration.md',
            protected: false,
            tags: ['日本史', '明治維新', '近代']
        }
    ]
};

// カテゴリー別にドキュメントを取得する関数
function getDocumentsByCategory(category) {
    return documentsData.documents.filter(doc => doc.category === category);
}

// IDでドキュメントを取得する関数
function getDocumentById(id) {
    return documentsData.documents.find(doc => doc.id === id);
}

// すべてのカテゴリーを取得
function getAllCategories() {
    return documentsData.categories;
}

// タグで検索
function searchByTag(tag) {
    return documentsData.documents.filter(doc => 
        doc.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
}