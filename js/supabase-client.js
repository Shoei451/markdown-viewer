// Supabase Client Configuration
// このファイルはSupabaseプロジェクトの設定を管理します

class SupabaseClient {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    this.headers = {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * パスワードをSHA-256でハッシュ化
   */
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * 保護された記事を取得
   * @param {string} slug - 記事のスラッグ
   * @param {string} password - パスワード
   */
  async getProtectedPost(slug, password) {
    try {
      const passwordHash = await this.hashPassword(password);
      
      const response = await fetch(
        `${this.supabaseUrl}/rest/v1/protected_posts?slug=eq.${slug}&password_hash=eq.${passwordHash}&select=*`,
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }

      const data = await response.json();
      
      if (data.length === 0) {
        return { success: false, error: 'Invalid password or post not found' };
      }

      return { success: true, post: data[0] };
    } catch (error) {
      console.error('Error fetching protected post:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 保護された記事の一覧を取得（パスワードなし、メタデータのみ）
   * excerptとread_timeも含める
   */
  async getProtectedPostsMeta() {
    try {
      const response = await fetch(
        `${this.supabaseUrl}/rest/v1/protected_posts?select=id,slug,title,category,tags,excerpt,read_time,created_at`,
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts metadata');
      }

      const data = await response.json();
      return { success: true, posts: data };
    } catch (error) {
      console.error('Error fetching posts metadata:', error);
      return { success: false, error: error.message };
    }
  }
}

// 使用例（実際の値は環境変数や設定ファイルから読み込むべき）
// const SUPABASE_URL = 'https://your-project.supabase.co';
// const SUPABASE_ANON_KEY = 'your-anon-key';
// const supabaseClient = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);