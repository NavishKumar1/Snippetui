/**
 * SnippetUI - LZ-String State Compression Helper
 */

let lzLoadingPromise = null;

/**
 * Dynamically loads LZString from CDN.
 */
export function loadLZString() {
  if (lzLoadingPromise) return lzLoadingPromise;

  lzLoadingPromise = new Promise((resolve, reject) => {
    if (window.LZString) {
      resolve(window.LZString);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js';
    script.async = true;
    script.onload = () => {
      resolve(window.LZString);
    };
    script.onerror = (err) => reject(new Error('Failed to load LZString: ' + err.message));
    document.head.appendChild(script);
  });

  return lzLoadingPromise;
}

/**
 * Compresses workspace state (or legacy HTML, CSS, JS values) into a URI-safe string.
 */
export async function compressState(filesOrHtml, css, js) {
  const lz = await loadLZString();
  let stateObj;
  if (typeof filesOrHtml === 'object' && filesOrHtml !== null) {
    stateObj = { files: filesOrHtml };
  } else {
    stateObj = { html: filesOrHtml, css, js };
  }
  const state = JSON.stringify(stateObj);
  return lz.compressToEncodedURIComponent(state);
}

/**
 * Decompresses a URI-safe string back into files map or legacy values.
 */
export async function decompressState(compressed) {
  if (!compressed) return null;
  const lz = await loadLZString();
  try {
    const decompressed = lz.decompressFromEncodedURIComponent(compressed);
    if (!decompressed) return null;
    const parsed = JSON.parse(decompressed);
    
    // Normalization / Legacy translation
    if (parsed && !parsed.files && (parsed.html !== undefined || parsed.css !== undefined || parsed.js !== undefined)) {
      parsed.files = {
        'index.html': { content: parsed.html || '', language: 'html' },
        'style.css': { content: parsed.css || '', language: 'css' },
        'index.js': { content: parsed.js || '', language: 'javascript' }
      };
    }
    return parsed;
  } catch (err) {
    console.error('[Compression Error]', err);
    return null;
  }
}
