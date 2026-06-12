/**
 * SnippetUI - Dynamic Monaco Editor Loader & Configuration Helper
 */

let monacoLoadingPromise = null;

/**
 * Dynamically injects the Monaco Editor AMD loader and boots the library.
 * Returns a promise that resolves with the global `monaco` instance.
 */
export function loadMonaco() {
  if (monacoLoadingPromise) return monacoLoadingPromise;

  monacoLoadingPromise = new Promise((resolve, reject) => {
    if (window.monaco) {
      resolve(window.monaco);
      return;
    }

    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
    loaderScript.async = true;
    loaderScript.onload = () => {
      window.require.config({
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
      });

      window.require(['vs/editor/editor.main'], () => {
        registerObsidianTheme(window.monaco);
        resolve(window.monaco);
      }, (err) => {
        reject(err);
      });
    };
    loaderScript.onerror = (err) => reject(new Error('Failed to load Monaco Editor loader script: ' + err.message));
    document.head.appendChild(loaderScript);
  });

  return monacoLoadingPromise;
}

/**
 * Registers our proprietary Obsidian Dark color theme matching SnippetUI branding.
 */
function registerObsidianTheme(monaco) {
  monaco.editor.defineTheme('obsidian-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
      { token: 'keyword', foreground: '00f2fe', fontStyle: 'bold' },
      { token: 'string', foreground: '38bdf8' },
      { token: 'number', foreground: 'eab308' },
      { token: 'tag', foreground: 'f472b6' },
      { token: 'attribute.name', foreground: 'a5b4fc' },
      { token: 'attribute.value', foreground: '38bdf8' }
    ],
    colors: {
      'editor.background': '#06060a',
      'editor.foreground': '#f3f4f6',
      'editorLineNumber.foreground': '#374151',
      'editorLineNumber.activeForeground': '#00f2fe',
      'editor.lineHighlightBackground': '#0c0c14',
      'editorCursor.foreground': '#00f2fe',
      'editor.selectionBackground': 'rgba(0, 242, 254, 0.15)',
      'editor.inactiveSelectionBackground': 'rgba(0, 242, 254, 0.08)',
      'scrollbarSlider.background': 'rgba(255, 255, 255, 0.05)',
      'scrollbarSlider.hoverBackground': 'rgba(255, 255, 255, 0.08)',
      'scrollbarSlider.activeBackground': 'rgba(0, 242, 254, 0.2)'
    }
  });
}

/**
 * Helper to initialize a single Monaco editor.
 */
export function createMonacoEditor(container, language, initialValue, onChange) {
  if (!window.monaco) return null;

  const editor = window.monaco.editor.create(container, {
    value: initialValue,
    language: language,
    theme: 'obsidian-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    wordWrap: 'on',
    fontSize: 12,
    fontFamily: "'Fira Code', ui-monospace, SFMono-Regular, monospace",
    lineHeight: 18,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    tabSize: 2,
    insertSpaces: true,
    roundedSelection: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    padding: { top: 12, bottom: 12 }
  });

  if (onChange) {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  }

  return editor;
}
