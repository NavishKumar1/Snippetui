/**
 * SnippetUI - Browser-based Prettier Formatting Engine
 */

let prettierLoadingPromise = null;

/**
 * Lazy loads Prettier standalone core and language parsers in sequence.
 */
export function loadPrettier() {
  if (prettierLoadingPromise) return prettierLoadingPromise;

  prettierLoadingPromise = new Promise((resolve, reject) => {
    if (window.prettier) {
      resolve();
      return;
    }

    const scriptUrls = [
      'https://unpkg.com/prettier@2.8.8/standalone.js',
      'https://unpkg.com/prettier@2.8.8/parser-html.js',
      'https://unpkg.com/prettier@2.8.8/parser-postcss.js',
      'https://unpkg.com/prettier@2.8.8/parser-babel.js'
    ];

    function loadScript(index) {
      if (index >= scriptUrls.length) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = scriptUrls[index];
      script.async = true;
      script.onload = () => loadScript(index + 1);
      script.onerror = () => reject(new Error(`Failed to load Prettier asset: ${scriptUrls[index]}`));
      document.head.appendChild(script);
    }

    loadScript(0);
  });

  return prettierLoadingPromise;
}

/**
 * Auto-formats source code in the browser using Prettier standalone.
 * Supports HTML, CSS, and JavaScript.
 */
export function formatCode(code, type) {
  if (!window.prettier || !window.prettierPlugins) {
    throw new Error('Prettier engine is not loaded yet');
  }

  let parser = 'html';
  if (type === 'css') {
    parser = 'css';
  } else if (type === 'js' || type === 'javascript') {
    parser = 'babel';
  }

  try {
    return window.prettier.format(code, {
      parser: parser,
      plugins: window.prettierPlugins,
      singleQuote: true,
      tabWidth: 2,
      semi: true,
      bracketSpacing: true,
      trailingComma: 'none'
    });
  } catch (err) {
    console.warn('[Prettier Formatting Warning]', err);
    throw err;
  }
}
