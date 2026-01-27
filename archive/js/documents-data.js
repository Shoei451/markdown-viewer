// Documents Configuration
// カテゴリー定義と各カテゴリーのドキュメントを統合

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
    
    // Documents list - カテゴリー別ファイルから自動的に統合されます
    // js/documents/*.js ファイルを編集してください
    documents: []
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