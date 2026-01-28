// Enhanced Markdown Renderer with Math Support
// KaTeXを使用して数式をレンダリング

class MarkdownRenderer {
  constructor() {
    // marked.jsの設定
    if (typeof marked !== 'undefined') {
      marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: function(code, lang) {
          // シンタックスハイライト（Prism.jsなどを使用する場合）
          return code;
        }
      });
    }
  }

  /**
   * 数式をKaTeXでレンダリング
   * @param {string} markdown - Markdown文字列
   * @returns {string} - 数式が処理されたMarkdown
   */
  processMath(markdown) {
    // Display math: $$...$$
    markdown = markdown.replace(/\$\$([^\$]+)\$\$/g, (match, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
          trust: true
        });
      } catch (e) {
        console.error('KaTeX error:', e);
        return `<div class="math-error">Math rendering error: ${match}</div>`;
      }
    });

    // Inline math: $...$（ただし$$は除外）
    markdown = markdown.replace(/(?<!\$)\$(?!\$)([^\$\n]+)\$(?!\$)/g, (match, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
          trust: true
        });
      } catch (e) {
        console.error('KaTeX error:', e);
        return `<span class="math-error">Math error: ${match}</span>`;
      }
    });

    return markdown;
  }

  /**
   * Markdownをレンダリング
   * @param {string} markdown - Markdown文字列
   * @param {HTMLElement} targetElement - 表示先の要素
   */
  async render(markdown, targetElement) {
    try {
      // 1. 数式を処理
      const processedMarkdown = this.processMath(markdown);
      
      // 2. MarkdownをHTMLに変換
      const html = marked.parse(processedMarkdown);
      
      // 3. HTMLを挿入
      targetElement.innerHTML = html;
      
      // 4. コードブロックのシンタックスハイライト（オプション）
      this.highlightCode(targetElement);
      
      return { success: true };
    } catch (error) {
      console.error('Markdown rendering error:', error);
      targetElement.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--red);">
          <h2>⚠️ レンダリングエラー</h2>
          <p>Markdownの表示中にエラーが発生しました。</p>
          <pre style="text-align: left; background: var(--theme); padding: 20px; border-radius: 8px; overflow-x: auto;">
${error.message}
          </pre>
        </div>
      `;
      return { success: false, error: error.message };
    }
  }

  /**
   * コードブロックのシンタックスハイライト（Prism.js使用時）
   */
  highlightCode(targetElement) {
    if (typeof Prism !== 'undefined') {
      const codeBlocks = targetElement.querySelectorAll('pre code');
      codeBlocks.forEach(block => {
        Prism.highlightElement(block);
      });
    }
  }

  /**
   * ファイルからMarkdownを読み込んでレンダリング
   * @param {string} filepath - Markdownファイルのパス
   * @param {HTMLElement} targetElement - 表示先の要素
   */
  async loadAndRender(filepath, targetElement) {
    try {
      const response = await fetch(filepath);
      if (!response.ok) {
        throw new Error(`File not found: ${filepath}`);
      }
      
      const markdown = await response.text();
      return await this.render(markdown, targetElement);
    } catch (error) {
      console.error('Error loading markdown file:', error);
      targetElement.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <h2>⚠️ ファイルが見つかりません</h2>
          <p>記事を読み込めませんでした。</p>
          <p style="color: var(--secondary); font-size: 0.9rem;">${error.message}</p>
        </div>
      `;
      return { success: false, error: error.message };
    }
  }
}

// グローバルインスタンスを作成
const markdownRenderer = new MarkdownRenderer();