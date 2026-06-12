/**
 * SnippetUI - Full-Screen Code Sandbox & Interactive Editor Page
 */
import { COMPONENTS_DATABASE } from './library/index.js';
import { t } from './i18n.js';

// CRC-32 Lookup Table & Helper for uncompressed ZIP writing
const crcTable = [];
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[i] = c;
}

function calculateCrc32(str) {
  let crc = 0 ^ (-1);
  const bytes = new TextEncoder().encode(str);
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function generateZip(files) {
  const encoder = new TextEncoder();
  let offset = 0;
  const localHeaders = [];
  const fileDatas = [];
  const centralHeaders = [];
  
  files.forEach(file => {
    const filenameBytes = encoder.encode(file.name);
    const contentBytes = encoder.encode(file.content);
    const crc = calculateCrc32(file.content);
    const size = contentBytes.length;
    
    const date = new Date();
    const dosTime = ((date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1)) & 0xFFFF;
    const dosDate = (((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()) & 0xFFFF;
    
    const localHeader = new Uint8Array(30 + filenameBytes.length);
    const view = new DataView(localHeader.buffer);
    
    view.setUint32(0, 0x04034b50, true); // signature
    view.setUint16(4, 10, true);         // version needed
    view.setUint16(6, 0, true);          // flags
    view.setUint16(8, 0, true);          // compression (none)
    view.setUint16(10, dosTime, true);
    view.setUint16(12, dosDate, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, size, true);      // compressed size
    view.setUint32(22, size, true);      // uncompressed size
    view.setUint16(26, filenameBytes.length, true);
    view.setUint16(28, 0, true);         // extra field length
    localHeader.set(filenameBytes, 30);
    
    localHeaders.push(localHeader);
    fileDatas.push(contentBytes);
    
    const centralHeader = new Uint8Array(46 + filenameBytes.length);
    const cView = new DataView(centralHeader.buffer);
    cView.setUint32(0, 0x02014b50, true); // signature
    cView.setUint16(4, 20, true);         // version made by
    cView.setUint16(6, 10, true);         // version needed
    cView.setUint16(8, 0, true);          // flags
    cView.setUint16(10, 0, true);         // compression
    cView.setUint16(12, dosTime, true);
    cView.setUint16(14, dosDate, true);
    cView.setUint32(16, crc, true);
    cView.setUint32(20, size, true);      // compressed size
    cView.setUint32(24, size, true);      // uncompressed size
    cView.setUint16(28, filenameBytes.length, true);
    cView.setUint16(30, 0, true);         // extra field len
    cView.setUint16(32, 0, true);         // comment len
    cView.setUint16(34, 0, true);         // disk start
    cView.setUint16(36, 0, true);         // internal attrs
    cView.setUint32(38, 0, true);         // external attrs
    cView.setUint32(42, offset, true);    // local header offset
    centralHeader.set(filenameBytes, 46);
    
    centralHeaders.push(centralHeader);
    offset += localHeader.length + contentBytes.length;
  });
  
  let centralDirOffset = offset;
  let centralDirSize = 0;
  centralHeaders.forEach(h => centralDirSize += h.length);
  
  const endOfCentralDir = new Uint8Array(22);
  const eocdView = new DataView(endOfCentralDir.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true); // disk number
  eocdView.setUint16(6, 0, true); // central dir disk
  eocdView.setUint16(8, files.length, true); // disk entries
  eocdView.setUint16(10, files.length, true); // total entries
  eocdView.setUint32(12, centralDirSize, true);
  eocdView.setUint32(16, centralDirOffset, true);
  eocdView.setUint16(20, 0, true); // comment len
  
  const totalLength = centralDirOffset + centralDirSize + endOfCentralDir.length;
  const zipBytes = new Uint8Array(totalLength);
  
  let currentPos = 0;
  for (let i = 0; i < files.length; i++) {
    zipBytes.set(localHeaders[i], currentPos);
    currentPos += localHeaders[i].length;
    zipBytes.set(fileDatas[i], currentPos);
    currentPos += fileDatas[i].length;
  }
  
  centralHeaders.forEach(h => {
    zipBytes.set(h, currentPos);
    currentPos += h.length;
  });
  
  zipBytes.set(endOfCentralDir, currentPos);
  return new Blob([zipBytes], { type: 'application/zip' });
}

export function renderEditor(onNavigate, compId) {
  const comp = COMPONENTS_DATABASE.find(c => c.id === compId);
  
  if (!comp) {
    return {
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; gap:16px;">
          <h2>Component not found.</h2>
          <button id="btn-err-back" class="editor-page-btn-action accent">Back to Library</button>
        </div>
      `,
      init: (container) => {
        container.querySelector('#btn-err-back')?.addEventListener('click', () => onNavigate('library'));
      }
    };
  }

  // Active Sandbox States
  let workbenchHtml = '';
  let workbenchCss = '';
  let workbenchJs = '';
  let workbenchSandboxCleanup = null;

  // Restore edits from localStorage if available
  const savedWorkspace = localStorage.getItem(`snippetui_custom_${comp.id}`);
  if (savedWorkspace) {
    try {
      const parsed = JSON.parse(savedWorkspace);
      workbenchHtml = parsed.html !== undefined ? parsed.html : (comp.html || '');
      workbenchCss = parsed.css !== undefined ? parsed.css : (comp.css || '');
      workbenchJs = parsed.js !== undefined ? parsed.js : (comp.js || '');
    } catch (e) {
      workbenchHtml = comp.html || '';
      workbenchCss = comp.css || '';
      workbenchJs = comp.js || '';
    }
  } else {
    workbenchHtml = comp.html || '';
    workbenchCss = comp.css || '';
    workbenchJs = comp.js || '';
  }

  const htmlContent = `
    <div class="editor-page-root" id="editor-page-root-container">
      
      <!-- Top Row Header -->
      <header class="editor-page-header">
        <div class="editor-page-header-left">
          <button class="editor-page-btn-back" id="editor-page-back-btn" title="Return to component library">
            ✕
          </button>
          <span class="editor-page-brand-logo">SnippetUI Editor</span>
          <span class="editor-page-header-comp-title" id="editor-page-title-text">${comp.name}</span>
        </div>
        
        <div class="editor-page-header-right">
          <!-- Copy Options Buttons -->
          <button class="editor-page-btn-action" id="editor-page-btn-copy-html" title="Copy Custom HTML to Clipboard">
            HTML
          </button>
          <button class="editor-page-btn-action" id="editor-page-btn-copy-css" title="Copy Custom CSS to Clipboard">
            CSS
          </button>
          <button class="editor-page-btn-action" id="editor-page-btn-copy-js" title="Copy Custom JavaScript to Clipboard">
            JS
          </button>
          
          <button class="editor-page-btn-action" id="editor-page-btn-reset" title="Reset all changes back to default">
            Reset
          </button>
          <button class="editor-page-btn-action accent" id="editor-page-btn-download" title="Download uncompressed zip module">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            ZIP Bundle
          </button>
        </div>
      </header>

      <!-- Editors Row (HTML, CSS, JS side-by-side) -->
      <div class="editor-page-editors-row">
        
        <!-- HTML Editor -->
        <div class="editor-page-editor-col" id="col-editor-html">
          <div class="editor-page-editor-header">
            <div class="editor-page-editor-header-left">
              <span class="editor-page-lang-badge html">/ HTML</span>
              <span class="editor-page-editor-title">index.html</span>
            </div>
            <div class="editor-page-editor-header-right">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div class="editor-page-editor-body">
            <div class="editor-page-line-numbers" id="editor-page-line-numbers-html"></div>
            <textarea class="editor-page-textarea" id="editor-page-textarea-html" spellcheck="false" placeholder="<!-- HTML content here -->"></textarea>
          </div>
        </div>

        <!-- CSS Editor -->
        <div class="editor-page-editor-col" id="col-editor-css">
          <div class="editor-page-editor-header">
            <div class="editor-page-editor-header-left">
              <span class="editor-page-lang-badge css">* CSS</span>
              <span class="editor-page-editor-title">style.css</span>
            </div>
            <div class="editor-page-editor-header-right">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div class="editor-page-editor-body">
            <div class="editor-page-line-numbers" id="editor-page-line-numbers-css"></div>
            <textarea class="editor-page-textarea" id="editor-page-textarea-css" spellcheck="false" placeholder="/* CSS styles here */"></textarea>
          </div>
        </div>

        <!-- JS Editor -->
        <div class="editor-page-editor-col" id="col-editor-js">
          <div class="editor-page-editor-header">
            <div class="editor-page-editor-header-left">
              <span class="editor-page-lang-badge js">() JS</span>
              <span class="editor-page-editor-title">index.js</span>
            </div>
            <div class="editor-page-editor-header-right">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div class="editor-page-editor-body">
            <div class="editor-page-line-numbers" id="editor-page-line-numbers-js"></div>
            <textarea class="editor-page-textarea" id="editor-page-textarea-js" spellcheck="false" placeholder="// JavaScript logic here"></textarea>
          </div>
        </div>

      </div>

      <!-- Bottom Half Preview -->
      <div class="editor-page-preview-row" id="editor-page-preview-section">
        <div class="editor-page-preview-header">
          <div class="editor-page-preview-title">
            <span class="editor-page-preview-indicator"></span>
            <span>Live Interactive Preview</span>
          </div>
          <div class="editor-page-preview-actions">
            <button class="editor-page-preview-btn" id="editor-page-btn-reload">
              🔄 Reload Canvas
            </button>
            <button class="editor-page-btn-action editor-page-btn-fullscreen-toggle" id="editor-page-btn-fullscreen" style="padding: 4px 10px; font-size: 11px;">
              📺 Fullscreen Preview
            </button>
          </div>
        </div>
        <div class="editor-page-sandbox-viewport" id="editor-page-sandbox-viewport"></div>
      </div>
      
    </div>
  `;

  function triggerToast(message) {
    const originalToast = document.getElementById('copy-toast');
    if (originalToast) {
      const clone = originalToast.cloneNode(true);
      clone.innerHTML = `<span>${message}</span>`;
      clone.style.display = 'block';
      clone.style.opacity = '1';
      document.body.appendChild(clone);
      setTimeout(() => {
        clone.style.opacity = '0';
        setTimeout(() => clone.remove(), 400);
      }, 2000);
    } else {
      alert(message);
    }
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        triggerToast(successMsg);
      }).catch(() => {
        fallbackCopyText(text, successMsg);
      });
    } else {
      fallbackCopyText(text, successMsg);
    }
  }

  function fallbackCopyText(text, successMsg) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      triggerToast(successMsg);
    } catch (err) {}
    document.body.removeChild(el);
  }

  function updateLineNumbers(textarea, lineNumbersContainer) {
    if (!textarea || !lineNumbersContainer) return;
    const linesCount = (textarea.value || '').split('\n').length || 1;
    let numbersHtml = '';
    for (let i = 1; i <= linesCount; i++) {
      numbersHtml += `<div>${i}</div>`;
    }
    lineNumbersContainer.innerHTML = numbersHtml;
  }

  function runSandbox(container) {
    if (workbenchSandboxCleanup) {
      workbenchSandboxCleanup();
      workbenchSandboxCleanup = null;
    }
    const sandboxViewport = container.querySelector('#editor-page-sandbox-viewport');
    if (!sandboxViewport) return;
    
    sandboxViewport.innerHTML = '';

    let styleTag = document.getElementById('editor-page-sandbox-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'editor-page-sandbox-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = workbenchCss;
    sandboxViewport.innerHTML = workbenchHtml;

    if (workbenchJs && workbenchJs.trim()) {
      try {
        const localListeners = [];
        const localIntervals = [];
        const localTimeouts = [];
        const localFrames = [];
        const originalError = window.onerror;

        const sandboxConsole = {
          log: (...args) => console.log('[Editor]', ...args),
          error: (...args) => console.error('[Editor]', ...args)
        };

        const shadowDoc = {
          querySelector: (sel) => sandboxViewport.querySelector(sel),
          querySelectorAll: (sel) => sandboxViewport.querySelectorAll(sel),
          getElementById: (id) => sandboxViewport.querySelector('#' + id) || document.getElementById(id),
          getElementsByClassName: (cls) => sandboxViewport.getElementsByClassName(cls),
          getElementsByTagName: (tag) => sandboxViewport.getElementsByTagName(tag),
          createElement: (tagName) => document.createElement(tagName),
          addEventListener: (type, cb, opts) => {
            const isLocal = ['mousemove', 'mouseleave', 'mouseenter', 'click', 'mousedown', 'mouseup', 'mouseover', 'mouseout'].includes(type);
            if (isLocal) {
              sandboxViewport.addEventListener(type, cb, opts);
              localListeners.push({ target: sandboxViewport, type, cb, opts });
            } else {
              window.addEventListener(type, cb, opts);
              localListeners.push({ target: window, type, cb, opts });
            }
          },
          removeEventListener: (type, cb, opts) => {
            const isLocal = ['mousemove', 'mouseleave', 'mouseenter', 'click', 'mousedown', 'mouseup', 'mouseover', 'mouseout'].includes(type);
            if (isLocal) {
              sandboxViewport.removeEventListener(type, cb, opts);
            } else {
              window.removeEventListener(type, cb, opts);
            }
          }
        };

        const customSetInterval = (cb, delay) => {
          const id = setInterval(cb, delay);
          localIntervals.push(id);
          return id;
        };
        const customSetTimeout = (cb, delay) => {
          const id = setTimeout(cb, delay);
          localTimeouts.push(id);
          return id;
        };
        const customRequestAnimationFrame = (cb) => {
          const id = requestAnimationFrame(cb);
          localFrames.push(id);
          return id;
        };

        window.onerror = function(message, source, lineno, colno, error) {
          sandboxConsole.error(`${message} (Line ${lineno})`);
          return true;
        };

        const initFn = new Function('document', 'setInterval', 'setTimeout', 'requestAnimationFrame', 'console', workbenchJs);
        initFn(shadowDoc, customSetInterval, customSetTimeout, customRequestAnimationFrame, sandboxConsole);

        workbenchSandboxCleanup = () => {
          window.onerror = originalError;
          localListeners.forEach(({ target, type, cb, opts }) => {
            try {
              target.removeEventListener(type, cb, opts);
            } catch (e) {}
          });
          localIntervals.forEach(id => clearInterval(id));
          localTimeouts.forEach(id => clearTimeout(id));
          localFrames.forEach(id => cancelAnimationFrame(id));
        };
      } catch (err) {
        console.error('[Editor Compiler Error]', err);
      }
    }
  }

  return {
    html: htmlContent,
    init: (container) => {
      const txtHtml = container.querySelector('#editor-page-textarea-html');
      const txtCss = container.querySelector('#editor-page-textarea-css');
      const txtJs = container.querySelector('#editor-page-textarea-js');
      
      const numHtml = container.querySelector('#editor-page-line-numbers-html');
      const numCss = container.querySelector('#editor-page-line-numbers-css');
      const numJs = container.querySelector('#editor-page-line-numbers-js');

      // Assign initial values
      if (txtHtml) txtHtml.value = workbenchHtml;
      if (txtCss) txtCss.value = workbenchCss;
      if (txtJs) txtJs.value = workbenchJs;

      // Update initial numbers
      updateLineNumbers(txtHtml, numHtml);
      updateLineNumbers(txtCss, numCss);
      updateLineNumbers(txtJs, numJs);

      // Run live sandbox compiler
      runSandbox(container);

      // Back navigation
      container.querySelector('#editor-page-back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });

      // Synchronize text inputs and scroll positions
      const setupTextareaEvents = (txt, num, type) => {
        if (!txt || !num) return;
        txt.addEventListener('input', (e) => {
          const val = e.target.value;
          if (type === 'html') workbenchHtml = val;
          else if (type === 'css') workbenchCss = val;
          else if (type === 'js') workbenchJs = val;

          updateLineNumbers(txt, num);
          runSandbox(container);

          // Save workspace progress in localStorage
          localStorage.setItem(`snippetui_custom_${comp.id}`, JSON.stringify({
            html: workbenchHtml,
            css: workbenchCss,
            js: workbenchJs
          }));
        });

        txt.addEventListener('scroll', (e) => {
          num.scrollTop = e.target.scrollTop;
        });
      };

      setupTextareaEvents(txtHtml, numHtml, 'html');
      setupTextareaEvents(txtCss, numCss, 'css');
      setupTextareaEvents(txtJs, numJs, 'js');

      // Copy Buttons
      container.querySelector('#editor-page-btn-copy-html')?.addEventListener('click', () => {
        copyTextToClipboard(workbenchHtml, 'Copied HTML code!');
      });
      container.querySelector('#editor-page-btn-copy-css')?.addEventListener('click', () => {
        copyTextToClipboard(workbenchCss, 'Copied CSS code!');
      });
      container.querySelector('#editor-page-btn-copy-js')?.addEventListener('click', () => {
        copyTextToClipboard(workbenchJs, 'Copied JavaScript code!');
      });

      // Reset action
      container.querySelector('#editor-page-btn-reset')?.addEventListener('click', () => {
        localStorage.removeItem(`snippetui_custom_${comp.id}`);
        workbenchHtml = comp.html || '';
        workbenchCss = comp.css || '';
        workbenchJs = comp.js || '';

        if (txtHtml) txtHtml.value = workbenchHtml;
        if (txtCss) txtCss.value = workbenchCss;
        if (txtJs) txtJs.value = workbenchJs;

        updateLineNumbers(txtHtml, numHtml);
        updateLineNumbers(txtCss, numCss);
        updateLineNumbers(txtJs, numJs);

        runSandbox(container);
        triggerToast('Reset component code workspace!');
      });

      // ZIP Downloader Action
      container.querySelector('#editor-page-btn-download')?.addEventListener('click', () => {
        const zipFiles = [
          { name: 'index.html', content: workbenchHtml },
          { name: 'style.css', content: workbenchCss },
          { name: 'index.js', content: workbenchJs }
        ];
        try {
          const zipBlob = generateZip(zipFiles);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(zipBlob);
          link.download = `snippetui-${comp.id}-editor.zip`;
          link.click();
          triggerToast('ZIP bundle generated successfully!');
        } catch (e) {
          triggerToast('Failed to compile ZIP bundle.');
        }
      });

      // Reload Canvas Action
      container.querySelector('#editor-page-btn-reload')?.addEventListener('click', () => {
        runSandbox(container);
        triggerToast('Sandbox viewport refreshed!');
      });

      // Fullscreen Preview Toggle Action
      const rootEl = container.querySelector('#editor-page-root-container');
      container.querySelector('#editor-page-btn-fullscreen')?.addEventListener('click', () => {
        if (rootEl) {
          rootEl.classList.toggle('preview-fullscreen-mode');
          const isFull = rootEl.classList.contains('preview-fullscreen-mode');
          const fsBtn = container.querySelector('#editor-page-btn-fullscreen');
          if (fsBtn) {
            fsBtn.textContent = isFull ? '✕ Exit Fullscreen' : '📺 Fullscreen Preview';
          }
        }
      });
    },
    destroy: () => {
      if (workbenchSandboxCleanup) {
        workbenchSandboxCleanup();
        workbenchSandboxCleanup = null;
      }
      // Clean style tags from head
      const styleTag = document.getElementById('editor-page-sandbox-styles');
      if (styleTag) styleTag.remove();
    }
  };
}
