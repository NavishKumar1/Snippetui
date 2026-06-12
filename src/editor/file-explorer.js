/**
 * SnippetUI - Virtual Multi-File Workspace Explorer
 */

export function getFileLanguage(filename) {
  if (filename.endsWith('.html')) return 'html';
  if (filename.endsWith('.css')) return 'css';
  if (filename.endsWith('.js')) return 'javascript';
  if (filename.endsWith('.json')) return 'json';
  return 'plaintext';
}

export function renderFileList(sidebarContainer, files, activeFile, onSelect, onDelete) {
  const listEl = sidebarContainer.querySelector('#explorer-file-list');
  if (!listEl) return;

  const fileNames = Object.keys(files);

  listEl.innerHTML = fileNames.map(name => {
    const isDefault = name === 'index.html' || name === 'style.css' || name === 'index.js';
    const isActive = name === activeFile;
    const lang = getFileLanguage(name);

    let icon = '📄';
    if (lang === 'html') icon = '🌐';
    if (lang === 'css') icon = '🎨';
    if (lang === 'javascript') icon = '⚙️';
    if (lang === 'json') icon = '📦';

    return `
      <div class="explorer-file-item ${isActive ? 'active' : ''}" data-name="${name}" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; margin: 2px 6px; border-radius: 4px; cursor: pointer; transition: all 0.15s; background: ${isActive ? 'rgba(0, 242, 254, 0.08)' : 'transparent'}; border-left: 2px solid ${isActive ? 'var(--accent-cyan)' : 'transparent'};">
        <div style="display: flex; align-items: center; gap: 8px; overflow: hidden; pointer-events: none;">
          <span style="font-size: 12px; flex-shrink: 0;">${icon}</span>
          <span style="font-size: 11px; color: ${isActive ? '#ffffff' : 'var(--text-secondary)'}; font-family: var(--font-body); font-weight: ${isActive ? '600' : 'normal'}; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${name}</span>
        </div>
        ${!isDefault ? `
          <button class="explorer-file-delete-btn" data-name="${name}" style="background: none; border: none; color: rgba(255,255,255,0.3); hover:color: #f87171; cursor: pointer; font-size: 12px; font-weight: bold; padding: 2px 4px; transition: color 0.15s;">&times;</button>
        ` : ''}
      </div>
    `;
  }).join('');

  // Bind click handlers to change active file
  listEl.querySelectorAll('.explorer-file-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Check if delete button was clicked
      if (e.target.classList.contains('explorer-file-delete-btn')) {
        return;
      }
      const name = item.getAttribute('data-name');
      onSelect(name);
    });
  });

  // Bind delete handlers
  listEl.querySelectorAll('.explorer-file-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.getAttribute('data-name');
      if (confirm(`Are you sure you want to delete file "${name}"?`)) {
        onDelete(name);
      }
    });
  });
}
