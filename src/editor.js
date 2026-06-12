/**
 * SnippetUI - Full-Screen Code Sandbox & Interactive Editor Page
 */
import { COMPONENTS_DATABASE } from './library/index.js';
import { t } from './i18n.js';
import { loadMonaco, createMonacoEditor } from './editor/monaco-helper.js';
import { loadPrettier, formatCode } from './editor/formatter.js';
import { generateReact, generateVue, generateSvelte } from './editor/codegen.js';
import { initResizers } from './editor/splitter.js';
import { compressState, decompressState } from './editor/compression.js';
import { showEmbedModal } from './editor/embed.js';

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
  let debounceTimeout = null;
  let messageListener = null;
  let isTailwindActive = false;

  const initialHashParts = window.location.hash.split('?');
  const initialHashParams = new URLSearchParams(initialHashParts[1] || '');
  if (initialHashParams.get('tailwind') === 'true') {
    isTailwindActive = true;
  }

  // Console Counters & Log Entries
  let logCount = 0;
  let errorCount = 0;

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
          
          <!-- Share & Embed Buttons -->
          <button class="editor-page-btn-action" id="editor-page-btn-share" title="Share compressed workspace URL">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            Share
          </button>
          <button class="editor-page-btn-action" id="editor-page-btn-embed" title="Get embed code snippet">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: middle;"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Embed
          </button>

          <button class="editor-page-btn-action" id="editor-page-btn-reset" title="Reset all changes back to default">
            Reset
          </button>
          <button class="editor-page-btn-action accent" id="editor-page-btn-download" title="Download uncompressed zip module">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: middle;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            ZIP Bundle
          </button>
        </div>
      </header>

      <!-- Editors Row (HTML, CSS, JS side-by-side) -->
      <div class="editor-page-editors-row" id="editor-editors-container">
        
        <!-- HTML Editor -->
        <div class="editor-page-editor-col" id="col-editor-html">
          <div class="editor-page-editor-header">
            <div class="editor-page-editor-header-left">
              <span class="editor-page-lang-badge html">/ HTML</span>
              <span class="editor-page-editor-title">index.html</span>
            </div>
            <div class="editor-page-editor-header-right" style="display: flex; align-items: center; gap: 8px;">
              <button class="editor-page-editor-btn-format" data-lang="html" title="Format HTML code" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: var(--text-secondary); font-family: var(--font-body); font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">Format</button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div class="editor-page-editor-body" id="editor-page-container-html" style="flex: 1; height: 100%; position: relative;">
            <div class="editor-page-editor-skeleton">
              <div class="skeleton-line" style="width: 80%;"></div>
              <div class="skeleton-line" style="width: 60%;"></div>
              <div class="skeleton-line" style="width: 70%;"></div>
            </div>
          </div>
        </div>

        <!-- Vertical Splitter 1 -->
        <div class="editor-resizer-col" id="resizer-html-css"></div>

        <!-- CSS Editor -->
        <div class="editor-page-editor-col" id="col-editor-css">
          <div class="editor-page-editor-header">
            <div class="editor-page-editor-header-left">
              <span class="editor-page-lang-badge css">* CSS</span>
              <span class="editor-page-editor-title">style.css</span>
            </div>
            <div class="editor-page-editor-header-right" style="display: flex; align-items: center; gap: 8px;">
              <button class="editor-page-editor-btn-format" data-lang="css" title="Format CSS code" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: var(--text-secondary); font-family: var(--font-body); font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">Format</button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div class="editor-page-editor-body" id="editor-page-container-css" style="flex: 1; height: 100%; position: relative;">
            <div class="editor-page-editor-skeleton">
              <div class="skeleton-line" style="width: 75%;"></div>
              <div class="skeleton-line" style="width: 85%;"></div>
              <div class="skeleton-line" style="width: 50%;"></div>
            </div>
          </div>
        </div>

        <!-- Vertical Splitter 2 -->
        <div class="editor-resizer-col" id="resizer-css-js"></div>

        <!-- JS Editor -->
        <div class="editor-page-editor-col" id="col-editor-js">
          <div class="editor-page-editor-header">
            <div class="editor-page-editor-header-left">
              <span class="editor-page-lang-badge js">() JS</span>
              <span class="editor-page-editor-title">index.js</span>
            </div>
            <div class="editor-page-editor-header-right" style="display: flex; align-items: center; gap: 8px;">
              <button class="editor-page-editor-btn-format" data-lang="js" title="Format JS code" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: var(--text-secondary); font-family: var(--font-body); font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">Format</button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
          </div>
          <div class="editor-page-editor-body" id="editor-page-container-js" style="flex: 1; height: 100%; position: relative;">
            <div class="editor-page-editor-skeleton">
              <div class="skeleton-line" style="width: 90%;"></div>
              <div class="skeleton-line" style="width: 40%;"></div>
              <div class="skeleton-line" style="width: 65%;"></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Horizontal Resizer (Editors vs Preview) -->
      <div class="editor-resizer-row" id="resizer-editors-preview"></div>

      <!-- Bottom Half Preview -->
      <div class="editor-page-preview-row" id="editor-page-preview-section">
        <div class="editor-page-preview-header">
          <div class="editor-page-preview-title">
            <span class="editor-page-preview-indicator" id="editor-page-preview-indicator"></span>
            <span>Live Interactive Preview</span>
          </div>
          <div class="editor-page-preview-actions">
            <!-- Console Trigger button -->
            <button class="editor-page-preview-btn" id="editor-page-btn-console" style="position: relative; display: flex; align-items: center; gap: 4px;">
              💻 Console
              <span id="editor-console-badge-logs" style="display: none; background: rgba(0, 242, 254, 0.2); color: var(--accent-cyan); font-size: 9px; padding: 1px 4px; border-radius: 10px; margin-left: 2px;">0</span>
              <span id="editor-console-badge-errors" style="display: none; background: rgba(239, 68, 68, 0.2); color: #ef4444; font-size: 9px; padding: 1px 4px; border-radius: 10px; margin-left: 2px;">0</span>
            </button>
            <button class="editor-page-preview-btn" id="editor-page-btn-export" style="position: relative; display: flex; align-items: center; gap: 4px;">
              📦 Export Code
            </button>
            <button class="editor-page-preview-btn" id="editor-page-btn-tailwind" style="position: relative; display: flex; align-items: center; gap: 4px; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; background: transparent; cursor: pointer; font-size: 11px; transition: all 0.2s;">
              🎨 Tailwind Sandbox: OFF
            </button>
            <button class="editor-page-preview-btn" id="editor-page-btn-reload">
              🔄 Reload Canvas
            </button>
            <button class="editor-page-btn-action editor-page-btn-fullscreen-toggle" id="editor-page-btn-fullscreen" style="padding: 4px 10px; font-size: 11px;">
              📺 Fullscreen Preview
            </button>
          </div>
        </div>
        
        <div class="editor-page-preview-body" style="flex: 1; display: flex; flex-direction: column; position: relative; overflow: hidden;">
          <div class="editor-page-sandbox-viewport" id="editor-page-sandbox-viewport"></div>
          
          <!-- Collapsible Premium Developer Console & Framework Exporter Drawer -->
          <div class="editor-console-drawer collapsed" id="editor-console-drawer" style="position: absolute; bottom: 0; left: 0; right: 0; height: 220px; background: #08080d; border-top: 1px solid var(--border-color); display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); z-index: 10;">
            <!-- Tab Headers -->
            <div class="editor-drawer-tabs-header" style="height: 36px; min-height: 36px; background: #0c0c14; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; user-select: none;">
              <div class="editor-drawer-tab-triggers" style="display: flex; gap: 16px; height: 100%;">
                <button class="editor-drawer-tab-btn active" data-tab="console" style="background: none; border: none; color: #ffffff; font-size: 10px; font-weight: 700; cursor: pointer; border-bottom: 2px solid var(--accent-cyan); padding: 0 4px; height: 100%;">CONSOLE LOGS</button>
                <button class="editor-drawer-tab-btn" data-tab="export" style="background: none; border: none; color: var(--text-muted); font-size: 10px; font-weight: 700; cursor: pointer; border-bottom: 2px solid transparent; padding: 0 4px; height: 100%;">EXPORT FRAMEWORKS</button>
              </div>
              
              <!-- Action group for Console Tab -->
              <div class="editor-drawer-actions" id="drawer-actions-console" style="display: flex; align-items: center; gap: 12px;">
                <button id="editor-console-btn-clear" style="background: none; border: none; color: var(--text-muted); font-size: 10px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                  🗑️ Clear
                </button>
              </div>
              
              <!-- Action group for Export Tab -->
              <div class="editor-drawer-actions" id="drawer-actions-export" style="display: none; align-items: center; gap: 12px;">
                <button id="editor-export-btn-copy" style="background: var(--primary-gradient); border: none; color: #08080c; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; cursor: pointer;">
                  📋 Copy Code
                </button>
              </div>
            </div>

            <!-- Content Area 1: Console -->
            <div class="editor-drawer-tab-content" id="drawer-content-console" style="flex: 1; overflow-y: auto; padding: 12px 16px; font-family: var(--font-mono); font-size: 11.5px; line-height: 1.6; display: flex; flex-direction: column; gap: 4px;">
              <div class="console-line system" style="color: var(--text-muted); font-style: italic;">[System] Console initialized. Ready for output...</div>
            </div>

            <!-- Content Area 2: Export Codegen -->
            <div class="editor-drawer-tab-content" id="drawer-content-export" style="display: none; flex: 1; flex-direction: column; background: #06060a; overflow: hidden;">
              <!-- Subtabs (React, Vue, Svelte) -->
              <div class="editor-export-subtabs" style="height: 32px; background: rgba(0,0,0,0.15); display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); padding: 0 16px; gap: 12px; border-top: 1px solid rgba(255,255,255,0.02);">
                <button class="editor-export-subtab-btn active" data-subtab="react" style="background: none; border: none; color: var(--accent-cyan); font-family: var(--font-body); font-size: 10px; font-weight: 700; cursor: pointer; transition: color 0.15s;">React (TSX)</button>
                <button class="editor-export-subtab-btn" data-subtab="vue" style="background: none; border: none; color: var(--text-muted); font-family: var(--font-body); font-size: 10px; font-weight: 700; cursor: pointer; transition: color 0.15s;">Vue 3 SFC</button>
                <button class="editor-export-subtab-btn" data-subtab="svelte" style="background: none; border: none; color: var(--text-muted); font-family: var(--font-body); font-size: 10px; font-weight: 700; cursor: pointer; transition: color 0.15s;">Svelte Component</button>
              </div>
              <div style="flex: 1; overflow: hidden; position: relative;">
                <textarea id="editor-export-textarea" readonly style="width: 100%; height: 100%; background: transparent; border: none; outline: none; padding: 16px; color: #a5b4fc; font-family: var(--font-mono); font-size: 11.5px; resize: none; overflow: auto; line-height: 1.6;" spellcheck="false"></textarea>
              </div>
            </div>
          </div>
        </div>
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
    const sandboxViewport = container.querySelector('#editor-page-sandbox-viewport');
    if (!sandboxViewport) return;

    // Reset iframe to guarantee fresh state and cancel previous execution
    sandboxViewport.innerHTML = '';
    
    const iframe = document.createElement('iframe');
    iframe.id = 'editor-page-sandbox-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.background = 'transparent';
    sandboxViewport.appendChild(iframe);

    // Build the iframe source doc with sandbox console proxies
    const docContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Premium Reset Styles inside component preview */
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
  <style id="_comp_css">${workbenchCss}</style>
</head>
<body>
  ${workbenchHtml}
  <script>
    // Capture runtime and uncaught script errors
    window.onerror = function(message, source, lineno, colno, error) {
      window.parent.postMessage({ type: 'iframe-error', message: message + " (Line " + lineno + ")" }, '*');
      return true;
    };
    
    // Catch standard console messages
    const _log = console.log;
    const _error = console.error;
    console.log = function(...args) {
      _log(...args);
      window.parent.postMessage({ type: 'iframe-log', content: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
    };
    console.error = function(...args) {
      _error(...args);
      window.parent.postMessage({ type: 'iframe-error', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
    };
  </script>
  <script>
    try {
      ${workbenchJs}
    } catch(err) {
      window.parent.postMessage({ type: 'iframe-error', message: err.message }, '*');
    }
  </script>
</body>
</html>
    `;

    // Reset counts for the new run
    logCount = 0;
    errorCount = 0;
    const badgeLogs = container.querySelector('#editor-console-badge-logs');
    const badgeErrors = container.querySelector('#editor-console-badge-errors');
    const consoleLogs = container.querySelector('#editor-console-logs');

    if (badgeLogs) {
      badgeLogs.textContent = '0';
      badgeLogs.style.display = 'none';
    }
    if (badgeErrors) {
      badgeErrors.textContent = '0';
      badgeErrors.style.display = 'none';
    }
    if (consoleLogs) {
      consoleLogs.innerHTML = '<div class="console-line system" style="color: var(--text-muted); font-style: italic;">[System] Reloading preview compiler...</div>';
    }

    // Load content window
    try {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(docContent);
      doc.close();
    } catch (e) {
      console.error('[Editor sandbox compile error]', e);
    }
  }

  // Monaco editor references
  let editorHtml = null;
  let editorCss = null;
  let editorJs = null;

  // Helper to save workspace changes
  function saveWorkspace() {
    localStorage.setItem(`snippetui_custom_${comp.id}`, JSON.stringify({
      html: workbenchHtml,
      css: workbenchCss,
      js: workbenchJs
    }));
  }

  return {
    html: htmlContent,
    init: (container) => {
      // Console UI references
      const consoleBtn = container.querySelector('#editor-page-btn-console');
      const consoleDrawer = container.querySelector('#editor-console-drawer');
      const consoleLogs = container.querySelector('#editor-console-logs');
      const badgeLogs = container.querySelector('#editor-console-badge-logs');
      const badgeErrors = container.querySelector('#editor-console-badge-errors');

      // Lazy-load Monaco and initialize editors
      loadMonaco().then(async () => {
        // Decompress workspace state from URL hash if present
        const hashParts = window.location.hash.split('?');
        const hashParams = new URLSearchParams(hashParts[1] || '');
        const urlCompressedCode = hashParams.get('code');
        if (urlCompressedCode) {
          try {
            const state = await decompressState(urlCompressedCode);
            if (state) {
              workbenchHtml = state.html !== undefined ? state.html : workbenchHtml;
              workbenchCss = state.css !== undefined ? state.css : workbenchCss;
              workbenchJs = state.js !== undefined ? state.js : workbenchJs;
            }
          } catch (e) {
            console.error('[SnippetUI] Failed to decompress state', e);
          }
        }

        // Remove skeleton loaders
        container.querySelectorAll('.editor-page-editor-skeleton').forEach(el => el.remove());

        // Create HTML Editor
        const htmlContainer = container.querySelector('#editor-page-container-html');
        if (htmlContainer) {
          editorHtml = createMonacoEditor(htmlContainer, 'html', workbenchHtml, (val) => {
            workbenchHtml = val;
            triggerSandboxCompile();
            saveWorkspace();
          });
        }

        // Create CSS Editor
        const cssContainer = container.querySelector('#editor-page-container-css');
        if (cssContainer) {
          editorCss = createMonacoEditor(cssContainer, 'css', workbenchCss, (val) => {
            workbenchCss = val;
            triggerSandboxCompile();
            saveWorkspace();
          });
        }

        // Create JS Editor
        const jsContainer = container.querySelector('#editor-page-container-js');
        if (jsContainer) {
          editorJs = createMonacoEditor(jsContainer, 'javascript', workbenchJs, (val) => {
            workbenchJs = val;
            triggerSandboxCompile();
            saveWorkspace();
          });
        }

        // Lazy-load Prettier engine in background
        loadPrettier().catch(err => console.warn('[SnippetUI Prettier Load Warning]', err));

        // Initialize split-pane resizers
        initResizers(container);

        // Hook up Format buttons
        container.querySelectorAll('.editor-page-editor-btn-format').forEach(btn => {
          btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            let editor = null;
            if (lang === 'html') editor = editorHtml;
            else if (lang === 'css') editor = editorCss;
            else if (lang === 'js') editor = editorJs;

            if (editor) {
              const unformatted = editor.getValue();
              try {
                const formatted = formatCode(unformatted, lang);
                editor.setValue(formatted);
                triggerToast(`Formatted ${lang.toUpperCase()}!`);
              } catch (e) {
                triggerToast(`Formatting error: ${e.message || e}`);
              }
            }
          });
        });
      }).catch(err => {
        console.error('[SnippetUI Monaco Load Error]', err);
        triggerToast('Failed to load Monaco Editor. Using fallback text editor.');
      });

      // Listen for runtime logs and errors from sandbox iframe
      messageListener = (event) => {
        const iframe = container.querySelector('#editor-page-sandbox-iframe');
        if (!iframe || event.source !== iframe.contentWindow) return;

        if (event.data && event.data.type === 'iframe-log') {
          appendConsoleLog(event.data.content, 'log');
        } else if (event.data && event.data.type === 'iframe-error') {
          appendConsoleLog(event.data.message, 'error');
        }
      };
      window.addEventListener('message', messageListener);

      function clearLogs() {
        if (consoleLogs) {
          consoleLogs.innerHTML = '<div class="console-line system" style="color: var(--text-muted); font-style: italic;">[System] Console cleared.</div>';
        }
        logCount = 0;
        errorCount = 0;
        if (badgeLogs) {
          badgeLogs.textContent = '0';
          badgeLogs.style.display = 'none';
        }
        if (badgeErrors) {
          badgeErrors.textContent = '0';
          badgeErrors.style.display = 'none';
        }
      }

      container.querySelector('#editor-console-btn-clear')?.addEventListener('click', clearLogs);

      function appendConsoleLog(message, type) {
        if (!consoleLogs) return;

        // Strip previous reload placeholder if any exists
        const reloadingMsg = consoleLogs.querySelector('.console-line.system');
        if (reloadingMsg && reloadingMsg.textContent.includes('Reloading')) {
          reloadingMsg.remove();
        }

        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        
        let prefix = '[Log] ';
        let color = '#e2e8f0';
        let background = 'transparent';
        let borderLeft = 'none';

        if (type === 'error') {
          prefix = '⚠️ [Error] ';
          color = '#f87171';
          background = 'rgba(239, 68, 68, 0.05)';
          borderLeft = '3px solid #ef4444';
          errorCount++;
          if (badgeErrors) {
            badgeErrors.textContent = errorCount;
            badgeErrors.style.display = 'inline-block';
          }
        } else if (type === 'log') {
          prefix = '💬 ';
          color = '#00f2fe';
          logCount++;
          if (badgeLogs) {
            badgeLogs.textContent = logCount;
            badgeLogs.style.display = 'inline-block';
          }
        }

        line.style.color = color;
        line.style.background = background;
        line.style.borderLeft = borderLeft;
        line.style.padding = '4px 8px';
        line.style.borderRadius = '4px';
        line.style.whiteSpace = 'pre-wrap';
        line.style.wordBreak = 'break-all';
        line.textContent = prefix + message;

        consoleLogs.appendChild(line);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
      }

      let activeExportTab = 'react'; // 'react', 'vue', or 'svelte'

      function updateCodegenOutput() {
        const textarea = container.querySelector('#editor-export-textarea');
        if (!textarea) return;

        let compiled = '';
        const html = editorHtml ? editorHtml.getValue() : workbenchHtml;
        const css = editorCss ? editorCss.getValue() : workbenchCss;
        const js = editorJs ? editorJs.getValue() : workbenchJs;

        try {
          if (activeExportTab === 'react') {
            compiled = generateReact(html, css, js, isTailwindActive);
          } else if (activeExportTab === 'vue') {
            compiled = generateVue(html, css, js);
          } else if (activeExportTab === 'svelte') {
            compiled = generateSvelte(html, css, js);
          }
        } catch (e) {
          compiled = `/* Codegen Error: ${e.message} */`;
        }

        textarea.value = compiled;
      }

      // Switch active tab in the bottom drawer
      function switchDrawerTab(tabName) {
        if (!consoleDrawer) return;

        // Ensure drawer is open
        consoleDrawer.classList.add('active');
        consoleDrawer.style.transform = 'translateY(0)';
        consoleBtn?.classList.add('active');

        // Toggle active states on tab trigger buttons
        container.querySelectorAll('.editor-drawer-tab-btn').forEach(btn => {
          if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
            btn.style.color = '#ffffff';
            btn.style.borderBottomColor = 'var(--accent-cyan)';
          } else {
            btn.classList.remove('active');
            btn.style.color = 'var(--text-muted)';
            btn.style.borderBottomColor = 'transparent';
          }
        });

        // Toggle visibility of content divs and actions group
        const contentConsole = container.querySelector('#drawer-content-console');
        const contentExport = container.querySelector('#drawer-content-export');
        const actionsConsole = container.querySelector('#drawer-actions-console');
        const actionsExport = container.querySelector('#drawer-actions-export');

        if (tabName === 'console') {
          if (contentConsole) contentConsole.style.display = 'flex';
          if (contentExport) contentExport.style.display = 'none';
          if (actionsConsole) actionsConsole.style.display = 'flex';
          if (actionsExport) actionsExport.style.display = 'none';
        } else {
          if (contentConsole) contentConsole.style.display = 'none';
          if (contentExport) contentExport.style.display = 'flex';
          if (actionsConsole) actionsConsole.style.display = 'none';
          if (actionsExport) actionsExport.style.display = 'flex';
          updateCodegenOutput();
        }
      }

      // Toggle Console Tab
      consoleBtn?.addEventListener('click', () => {
        if (consoleDrawer) {
          const isDrawerOpen = consoleDrawer.classList.contains('active');
          const isConsoleTabActive = container.querySelector('.editor-drawer-tab-btn[data-tab="console"]')?.classList.contains('active');
          
          if (isDrawerOpen && isConsoleTabActive) {
            // Close drawer
            consoleDrawer.classList.remove('active');
            consoleDrawer.style.transform = 'translateY(100%)';
            consoleBtn.classList.remove('active');
          } else {
            switchDrawerTab('console');
          }
        }
      });

      // Toggle Export Tab
      const exportBtn = container.querySelector('#editor-page-btn-export');
      exportBtn?.addEventListener('click', () => {
        if (consoleDrawer) {
          const isDrawerOpen = consoleDrawer.classList.contains('active');
          const isExportTabActive = container.querySelector('.editor-drawer-tab-btn[data-tab="export"]')?.classList.contains('active');

          if (isDrawerOpen && isExportTabActive) {
            // Close drawer
            consoleDrawer.classList.remove('active');
            consoleDrawer.style.transform = 'translateY(100%)';
            exportBtn.classList.remove('active');
          } else {
            switchDrawerTab('export');
            exportBtn.classList.add('active');
          }
        }
      });

      // Wire up tab buttons inside the drawer header
      container.querySelectorAll('.editor-drawer-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-tab');
          switchDrawerTab(tab);
        });
      });

      // Wire up export subtabs (React, Vue, Svelte)
      container.querySelectorAll('.editor-export-subtab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.editor-export-subtab-btn').forEach(b => {
            b.classList.remove('active');
            b.style.color = 'var(--text-muted)';
          });
          btn.classList.add('active');
          btn.style.color = 'var(--accent-cyan)';
          activeExportTab = btn.getAttribute('data-subtab');
          updateCodegenOutput();
        });
      });

      // Wire up copy button inside export tab
      container.querySelector('#editor-export-btn-copy')?.addEventListener('click', () => {
        const text = container.querySelector('#editor-export-textarea')?.value;
        if (text) {
          copyTextToClipboard(text, `Copied ${activeExportTab.toUpperCase()} template!`);
        }
      });

      // Toggle Console Drawer open/close
      // Run live sandbox compiler initially
      runSandbox(container);

      // Back navigation
      container.querySelector('#editor-page-back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });

      // debounced compilation trigger
      function triggerSandboxCompile() {
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
        
        // Show compiling status in indicator
        const indicator = container.querySelector('#editor-page-preview-indicator');
        if (indicator) {
          indicator.style.background = '#eab308';
          indicator.style.boxShadow = '0 0 8px #eab308';
        }

        debounceTimeout = setTimeout(() => {
          runSandbox(container);
          updateCodegenOutput(); // Refresh exports
          if (indicator) {
            indicator.style.background = '#10b981';
            indicator.style.boxShadow = '0 0 8px #10b981';
          }
        }, 300); // 300ms debouncing delay
      }

      // Copy Buttons
      container.querySelector('#editor-page-btn-copy-html')?.addEventListener('click', () => {
        const val = editorHtml ? editorHtml.getValue() : workbenchHtml;
        copyTextToClipboard(val, 'Copied HTML code!');
      });
      container.querySelector('#editor-page-btn-copy-css')?.addEventListener('click', () => {
        const val = editorCss ? editorCss.getValue() : workbenchCss;
        copyTextToClipboard(val, 'Copied CSS code!');
      });
      container.querySelector('#editor-page-btn-copy-js')?.addEventListener('click', () => {
        const val = editorJs ? editorJs.getValue() : workbenchJs;
        copyTextToClipboard(val, 'Copied JavaScript code!');
      });

      // Share Action
      container.querySelector('#editor-page-btn-share')?.addEventListener('click', async () => {
        const htmlVal = editorHtml ? editorHtml.getValue() : workbenchHtml;
        const cssVal = editorCss ? editorCss.getValue() : workbenchCss;
        const jsVal = editorJs ? editorJs.getValue() : workbenchJs;
        try {
          const compCode = await compressState(htmlVal, cssVal, jsVal);
          const shareUrl = `${window.location.origin}/#editor?component=${comp.id}&code=${compCode}${isTailwindActive ? '&tailwind=true' : ''}`;
          copyTextToClipboard(shareUrl, 'Share link copied to clipboard!');
        } catch (e) {
          triggerToast('Failed to generate share link.');
          console.error(e);
        }
      });

      // Embed Action
      container.querySelector('#editor-page-btn-embed')?.addEventListener('click', async () => {
        const htmlVal = editorHtml ? editorHtml.getValue() : workbenchHtml;
        const cssVal = editorCss ? editorCss.getValue() : workbenchCss;
        const jsVal = editorJs ? editorJs.getValue() : workbenchJs;
        try {
          const compCode = await compressState(htmlVal, cssVal, jsVal);
          showEmbedModal(comp.id, compCode, triggerToast, copyTextToClipboard, isTailwindActive);
        } catch (e) {
          triggerToast('Failed to generate embed code.');
          console.error(e);
        }
      });

      // Tailwind Sandbox Action
      const tailwindBtn = container.querySelector('#editor-page-btn-tailwind');
      const updateTailwindBtnState = () => {
        if (tailwindBtn) {
          if (isTailwindActive) {
            tailwindBtn.textContent = '🎨 Tailwind Sandbox: ON';
            tailwindBtn.style.color = 'var(--accent-cyan)';
            tailwindBtn.style.borderColor = 'var(--accent-cyan)';
            tailwindBtn.style.background = 'rgba(0, 242, 254, 0.05)';
          } else {
            tailwindBtn.textContent = '🎨 Tailwind Sandbox: OFF';
            tailwindBtn.style.color = 'var(--text-muted)';
            tailwindBtn.style.borderColor = 'var(--border-color)';
            tailwindBtn.style.background = 'transparent';
          }
        }
      };

      // Set initial button state
      updateTailwindBtnState();

      tailwindBtn?.addEventListener('click', () => {
        isTailwindActive = !isTailwindActive;
        updateTailwindBtnState();
        
        // Refresh hash URL query parameter for tailwind sandbox state
        const hashParts = window.location.hash.split('?');
        const params = new URLSearchParams(hashParts[1] || '');
        if (isTailwindActive) {
          params.set('tailwind', 'true');
        } else {
          params.delete('tailwind');
        }
        const newHash = `${hashParts[0]}${params.toString() ? `?${params.toString()}` : ''}`;
        
        // Push state silently without triggering router reloading
        history.replaceState(null, '', newHash);

        runSandbox(container);
        updateCodegenOutput(); // Refresh exports
        triggerToast(isTailwindActive ? 'Tailwind Sandbox Mode Enabled!' : 'Tailwind Sandbox Mode Disabled!');
      });

      // Reset action
      container.querySelector('#editor-page-btn-reset')?.addEventListener('click', () => {
        localStorage.removeItem(`snippetui_custom_${comp.id}`);
        workbenchHtml = comp.html || '';
        workbenchCss = comp.css || '';
        workbenchJs = comp.js || '';

        if (editorHtml) editorHtml.setValue(workbenchHtml);
        if (editorCss) editorCss.setValue(workbenchCss);
        if (editorJs) editorJs.setValue(workbenchJs);

        clearLogs();
        runSandbox(container);
        triggerToast('Reset component code workspace!');
      });

      // ZIP Downloader Action
      container.querySelector('#editor-page-btn-download')?.addEventListener('click', () => {
        const zipFiles = [
          { name: 'index.html', content: editorHtml ? editorHtml.getValue() : workbenchHtml },
          { name: 'style.css', content: editorCss ? editorCss.getValue() : workbenchCss },
          { name: 'index.js', content: editorJs ? editorJs.getValue() : workbenchJs }
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
      // Dispose Monaco Editors to prevent memory leaks
      if (editorHtml) { editorHtml.dispose(); editorHtml = null; }
      if (editorCss) { editorCss.dispose(); editorCss = null; }
      if (editorJs) { editorJs.dispose(); editorJs = null; }

      if (messageListener) {
        window.removeEventListener('message', messageListener);
        messageListener = null;
      }
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
        debounceTimeout = null;
      }
    }
  };
}
