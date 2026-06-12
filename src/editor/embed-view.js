/**
 * SnippetUI - Embed Preview Sandboxed View
 */
import { decompressState } from './compression.js';
import { COMPONENTS_DATABASE } from '../library/index.js';

export function renderEmbedView(compId, compressedCode) {
  let workbenchHtml = '';
  let workbenchCss = '';
  let workbenchJs = '';

  const htmlContent = `
    <div class="embed-view-root" style="width: 100vw; height: 100vh; margin: 0; padding: 0; overflow: hidden; position: relative; background: #030306; display: flex; flex-direction: column;">
      <!-- Sandbox Viewport -->
      <div id="embed-sandbox-viewport" style="flex: 1; width: 100%; height: 100%; overflow: hidden; position: relative;">
        <!-- Loading spinner/skeleton -->
        <div id="embed-loading" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #030306; color: var(--text-secondary); font-family: var(--font-body); font-size: 13px; z-index: 10;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="width: 24px; height: 24px; border: 2px solid rgba(0, 242, 254, 0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: embed-spinner 0.8s linear infinite;"></div>
            <span>Loading Sandbox...</span>
          </div>
        </div>
      </div>
      
      <!-- Capsular Branding Badge watermark -->
      <a href="${window.location.origin}" target="_blank" class="embed-branding-badge" style="position: absolute; bottom: 12px; right: 12px; display: flex; align-items: center; gap: 6px; background: rgba(8, 8, 12, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); padding: 4px 10px; border-radius: 20px; text-decoration: none; color: #ffffff; font-family: var(--font-body); font-size: 10px; font-weight: 700; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 100; transition: transform 0.2s ease, border-color 0.2s ease;">
        <span style="width: 6px; height: 6px; background: var(--accent-cyan); border-radius: 50%; box-shadow: 0 0 6px var(--accent-cyan);"></span>
        <span>Built with SnippetUI</span>
      </a>
      
      <style>
        @keyframes embed-spinner {
          to { transform: rotate(360deg); }
        }
        .embed-branding-badge:hover {
          transform: translateY(-1px);
          border-color: var(--accent-cyan);
        }
      </style>
    </div>
  `;

  return {
    html: htmlContent,
    init: async (container) => {
      // Decompress URL code parameter
      if (compressedCode) {
        try {
          const state = await decompressState(compressedCode);
          if (state) {
            workbenchHtml = state.html || '';
            workbenchCss = state.css || '';
            workbenchJs = state.js || '';
          }
        } catch (e) {
          console.error('[Embed] Decompression failed', e);
        }
      }

      // Fallback if decompressed state is empty
      if (!workbenchHtml && !workbenchCss && !workbenchJs) {
        const comp = COMPONENTS_DATABASE.find(c => c.id === compId);
        if (comp) {
          workbenchHtml = comp.html || '';
          workbenchCss = comp.css || '';
          workbenchJs = comp.js || '';
        }
      }

      // Read tailwind parameter if true
      const hashParts = window.location.hash.split('?');
      const hashParams = new URLSearchParams(hashParts[1] || '');
      const isTailwind = hashParams.get('tailwind') === 'true';

      const viewport = container.querySelector('#embed-sandbox-viewport');
      if (!viewport) return;

      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.background = 'transparent';

      iframe.onload = () => {
        const loader = container.querySelector('#embed-loading');
        if (loader) loader.remove();
      };

      viewport.appendChild(iframe);

      const docContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: transparent;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  </style>
  ${isTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
  <style id="_comp_css">${workbenchCss}</style>
</head>
<body>
  ${workbenchHtml}
  <script>
    try {
      ${workbenchJs}
    } catch(err) {
      console.error('[Embed Runtime Error]', err.message);
    }
  </script>
</body>
</html>
      `;

      try {
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(docContent);
        doc.close();
      } catch (e) {
        console.error('[Embed compilation error]', e);
      }
    },
    destroy: () => {}
  };
}
