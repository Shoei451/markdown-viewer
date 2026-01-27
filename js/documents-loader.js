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
            console.log('Documents loaded by loader:', allDocuments.length);
        }
        
        return allDocuments;
    }
    
    // 即座に実行（DOMContentLoadedを待たない）
    loadAllDocuments();
})();