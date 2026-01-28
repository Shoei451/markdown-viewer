// ==========================================
// Blog Posts Data Management
// ==========================================

/**
 * タグの日本語ラベル
 */
const tagLabels = {
  math: '数学',
  english: '英語',
  history: '歴史',
  geography: '地理',
  'home-economics': '家庭基礎',
  health: '保健',
  programming: 'プログラミング',
  calculus: '微積分',
  presentation: 'プレゼン',
  wwii: '第二次世界大戦',
  javascript: 'JavaScript',
  advanced: '応用',
  climate: '気候',
  population: '人口',
  nutrition: '栄養',
  mental: 'メンタルヘルス'
};

/**
 * カテゴリの日本語ラベル
 */
const categoryLabels = {
  math: '数学',
  english: '英語',
  history: '歴史',
  geography: '地理',
  'home-economics': '家庭基礎',
  health: '保健',
  programming: 'プログラミング'
};

/**
 * カテゴリアイコン（SVG）
 */
const categoryIcons = {
  all: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>`,
  
  math: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
  </svg>`,
  
  english: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
</svg>`,
  
  history: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>`,
  
  geography: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>`,
  
  'home-economics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>`,
  
  health: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>`,
  
  programming: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>`,
  
  protected: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>`
};

/**
 * 公開記事のデータ
 */
const publicPosts = [
  {
    id: "post-1",
    title: "微分積分の基礎",
    date: "2026-01-13",
    category: "math",
    tags: ["math", "calculus"],
    excerpt: "微分と積分の基本的な概念を数式を使って解説。極限の定義から始めて導関数の計算方法まで。",
    file: "blog/math/post-1.html",
    protected: false,
    readTime: 8
  },
  {
    id: "geo-1-mid-questions",
    title: "地理総合 1学期中間試験過去問",
    date: "2026-01-13",
    category: "geography",
    tags: ["geography", "exam"],
    excerpt: "地理総合の1学期中間試験の過去問 / 世界の地形、気候、人口分布に関する問題",
    file: "blog/geography/geo-1-mid-questions.html",
    protected: true,
    readTime: 20
  }
];

/**
 * ブログカードのHTMLを生成
 * @param {Object} post - 記事データ
 * @returns {string} カードのHTML
 */
function createPostCardHTML(post) {
  const categoryLabel = categoryLabels[post.category] || post.category;
  
  let html = '';
  
  // Protected badge - 右上に配置
  if (post.protected) {
    html += `<div class="protected-badge">🔒 Protected</div>`;
  }
  
  // Category - 左側に配置（protectedバッジと重ならない）
  html += `<div class="blog-category">${categoryLabel}</div>`;
  
  html += `
    <div class="blog-date">📅 ${post.date}</div>
    <h3>${post.title}</h3>
    <div class="blog-tags">
      ${post.tags.map(tag => `<span class="blog-tag">${tagLabels[tag] || tag}</span>`).join('')}
    </div>
    <p>${post.excerpt}</p>
    <div class="blog-footer">
      <span class="read-time">⏱️ ${post.readTime || 5} min read</span>
      <span class="read-more">${post.protected ? '🔓 パスワードを入力 →' : '記事を読む →'}</span>
    </div>
  `;
  
  return html;
}

/**
 * ブログカード要素を作成
 * @param {Object} post - 記事データ
 * @returns {HTMLElement} カード要素
 */
function createPostCard(post) {
  const card = document.createElement('a');
  card.href = post.file;
  card.className = `blog-card${post.protected ? ' protected' : ''}`;
  card.setAttribute('data-category', post.category);
  card.setAttribute('data-tags', post.tags.join(' '));
  card.setAttribute('data-post-id', post.id);
  
  card.innerHTML = createPostCardHTML(post);
  
  return card;
}

/**
 * 記事一覧をレンダリング
 * @param {Array} posts - 表示する記事の配列
 * @param {HTMLElement} container - 表示先のコンテナ要素
 */
function renderPosts(posts, container) {
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  container.innerHTML = '';
  
  if (posts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <p style="color: var(--secondary); font-size: 1.1rem;">該当する記事が見つかりませんでした。</p>
      </div>
    `;
    return;
  }
  
  posts.forEach(post => {
    container.appendChild(createPostCard(post));
  });
  
  // アニメーションを適用
  observeCards();
}

/**
 * Intersection Observerでカードアニメーション
 */
function observeCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.blog-card').forEach(card => {
    observer.observe(card);
  });
}

/**
 * Supabaseから保護された記事のメタデータを取得
 * @param {SupabaseClient} supabaseClient - Supabaseクライアント
 * @returns {Promise<Array>} 保護された記事の配列
 */
async function loadProtectedPosts(supabaseClient) {
  try {
    const result = await supabaseClient.getProtectedPostsMeta();
    
    if (result.success && result.posts.length > 0) {
      return result.posts.map(post => ({
        id: post.slug,
        title: post.title,
        date: new Date(post.created_at).toLocaleDateString('ja-JP'),
        category: post.category,
        tags: post.tags || [],
        excerpt: post.excerpt || `この記事はパスワードで保護されています。`,
        file: `blog/${post.category}/protected-${post.slug}.html`,
        protected: true,
        readTime: post.read_time || 0
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading protected posts:', error);
    return [];
  }
}

/**
 * 全記事を取得（公開 + 保護）
 * @param {SupabaseClient|null} supabaseClient - Supabaseクライアント（オプション）
 * @returns {Promise<Array>} 全記事の配列
 */
async function getAllPosts(supabaseClient = null) {
  let allPosts = [...publicPosts];
  
  // Supabaseが利用可能な場合、保護記事を追加
  if (supabaseClient) {
    const protectedPosts = await loadProtectedPosts(supabaseClient);
    allPosts = [...allPosts, ...protectedPosts];
  }
  
  // 日付でソート（新しい順）
  allPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  
  return allPosts;
}

/**
 * カテゴリまたはタグでフィルタリング
 * @param {Array} posts - 全記事
 * @param {string} filter - フィルター値
 * @returns {Array} フィルタリングされた記事
 */
function filterPosts(posts, filter) {
  if (filter === 'all') {
    return posts;
  }
  
  if (filter === 'protected') {
    return posts.filter(post => post.protected);
  }
  
  return posts.filter(post => 
    post.category === filter || post.tags.includes(filter)
  );
}

/**
 * 記事統計を取得
 * @param {Array} posts - 記事配列
 * @returns {Object} 統計情報
 */
function getPostStats(posts) {
  const stats = {
    total: posts.length,
    byCategory: {},
    protected: posts.filter(p => p.protected).length
  };
  
  posts.forEach(post => {
    if (!stats.byCategory[post.category]) {
      stats.byCategory[post.category] = 0;
    }
    stats.byCategory[post.category]++;
  });
  
  return stats;
}

// エクスポート（モジュールとして使用する場合）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    publicPosts,
    tagLabels,
    categoryLabels,
    categoryIcons,
    createPostCard,
    renderPosts,
    loadProtectedPosts,
    getAllPosts,
    filterPosts,
    getPostStats
  };
}