// Document Loader
// カテゴリー別のドキュメントファイルをすべて読み込んで統合します

(function() {
    'use strict';
    
    // すべてのカテゴリーのドキュメントを統合
    function loadAllDocuments() {
        const allDocuments = [];
        
        // 各カテゴリーのドキュメントを追加
        if (typeof mathDocuments !== 'undefined') {
            allDocuments.push(...mathDocuments);
        }
        if (typeof englishDocuments !== 'undefined') {
            allDocuments.push(...englishDocuments);
        }
        if (typeof programmingDocuments !== 'undefined') {
            allDocuments.push(...programmingDocuments);
        }
        if (typeof scienceDocuments !== 'undefined') {
            allDocuments.push(...scienceDocuments);
        }
        if (typeof historyDocuments !== 'undefined') {
            allDocuments.push(...historyDocuments);
        }
        if (typeof otherDocuments !== 'undefined') {
            allDocuments.push(...otherDocuments);
        }
        
        // documentsData.documents に統合
        if (typeof documentsData !== 'undefined') {
            documentsData.documents = allDocuments;
        }
        
        return allDocuments;
    }
    
    // ページ読み込み時に実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllDocuments);
    } else {
        loadAllDocuments();
    }
})();

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