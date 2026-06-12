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
 * Compresses HTML, CSS, and JS values into a URI-safe string.
 */
export async function compressState(html, css, js) {
  const lz = await loadLZString();
  const state = JSON.stringify({ html, css, js });
  return lz.compressToEncodedURIComponent(state);
}

/**
 * Decompresses a URI-safe string back into HTML, CSS, and JS.
 */
export async function decompressState(compressed) {
  if (!compressed) return null;
  const lz = await loadLZString();
  try {
    const decompressed = lz.decompressFromEncodedURIComponent(compressed);
    if (!decompressed) return null;
    return JSON.parse(decompressed);
  } catch (err) {
    console.error('[Compression Error]', err);
    return null;
  }
}
