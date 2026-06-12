/**
 * SnippetUI - CDN Resource Manager
 */

export const CDN_PRESETS = [
  { name: 'FontAwesome Icons', url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', type: 'css' },
  { name: 'Google Fonts (Inter/Roboto)', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Roboto:wght@400;700&display=swap', type: 'css' },
  { name: 'Animate.css', url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', type: 'css' },
  { name: 'Lodash Utility', url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js', type: 'js' },
  { name: 'Chart.js', url: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js', type: 'js' },
  { name: 'Canvas Confetti', url: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js', type: 'js' }
];

export function getActiveCdns(compId) {
  const data = localStorage.getItem(`snippetui_cdns_${compId}`);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export function showCdnModal(compId, onUpdate) {
  // Remove existing modal if any
  const existing = document.getElementById('snippetui-cdn-modal');
  if (existing) {
    existing.remove();
  }

  let activeCdns = getActiveCdns(compId);

  const modalHtml = `
    <div class="embed-modal-backdrop" id="snippetui-cdn-modal">
      <div class="embed-modal-card" style="max-width: 500px;">
        <div class="embed-modal-header">
          <h3 class="embed-modal-title">CDN Resource Manager</h3>
          <button class="embed-modal-close-btn" id="cdn-modal-close-x">&times;</button>
        </div>
        
        <div class="embed-modal-body" style="max-height: 480px; overflow-y: auto;">
          <p class="embed-modal-desc">
            Load external CSS stylesheets or JavaScript libraries directly into the sandbox runtime environment.
          </p>

          <!-- Preset Library -->
          <div class="cdn-section-title" style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Preset Libraries</div>
          <div class="cdn-presets-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
            ${CDN_PRESETS.map((preset, index) => {
              const isActive = activeCdns.some(c => c.url === preset.url);
              return `
                <button class="cdn-preset-btn ${isActive ? 'active' : ''}" data-idx="${index}" style="display: flex; align-items: center; justify-content: space-between; background: ${isActive ? 'rgba(0, 242, 254, 0.05)' : '#0d0d15'}; border: 1px solid ${isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.08)'}; color: ${isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)'}; font-size: 11px; font-weight: 600; padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s; text-align: left;">
                  <span>${preset.name}</span>
                  <span style="font-size: 9px; opacity: 0.6; text-transform: uppercase; padding: 2px 4px; background: rgba(255,255,255,0.05); border-radius: 4px;">${preset.type}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Add Custom Resource -->
          <div class="cdn-section-title" style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Add Custom CDN URL</div>
          <div style="display: flex; gap: 8px; margin-bottom: 16px;">
            <input type="text" id="cdn-custom-url" placeholder="https://cdnjs.cloudflare.com/.../lib.min.js" class="embed-modal-input" style="flex: 1; font-size: 11px;">
            <select id="cdn-custom-type" class="embed-modal-input" style="width: 80px; font-size: 11px; padding: 8px;">
              <option value="js">JS</option>
              <option value="css">CSS</option>
            </select>
            <button id="cdn-btn-add-custom" class="embed-modal-btn primary" style="padding: 8px 14px; font-size: 11px;">Add</button>
          </div>

          <!-- Active Resources List -->
          <div class="cdn-section-title" style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Active Sandboxed Resources (${activeCdns.length})</div>
          <div id="cdn-active-list" style="display: flex; flex-direction: column; gap: 6px;">
            ${activeCdns.length === 0 ? `
              <div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 12px; border: 1px dashed rgba(255,255,255,0.05); border-radius: 6px;">No external resources loaded.</div>
            ` : activeCdns.map((cdn, idx) => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 6px 12px;">
                <div style="display: flex; flex-direction: column; gap: 2px; overflow: hidden; margin-right: 12px;">
                  <span style="font-size: 11px; color: #ffffff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${cdn.url}">${cdn.url}</span>
                  <span style="font-size: 9px; color: var(--text-muted); font-weight: bold; text-transform: uppercase;">${cdn.type} RESOURCE</span>
                </div>
                <button class="cdn-remove-btn" data-idx="${idx}" style="background: none; border: none; color: #f87171; cursor: pointer; font-size: 13px; font-weight: bold; padding: 4px;">&times;</button>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="embed-modal-footer">
          <button class="embed-modal-btn cancel" id="cdn-modal-btn-close">Close</button>
          <button class="embed-modal-btn primary" id="cdn-modal-btn-save">Apply Configuration</button>
        </div>
      </div>
    </div>
  `;

  // Append to body
  const modalWrapper = document.createElement('div');
  modalWrapper.innerHTML = modalHtml;
  const modalEl = modalWrapper.firstElementChild;
  document.body.appendChild(modalEl);

  const activeListContainer = modalEl.querySelector('#cdn-active-list');

  function saveAndRenderActiveList() {
    localStorage.setItem(`snippetui_cdns_${compId}`, JSON.stringify(activeCdns));
    
    // Rerender active list
    if (activeCdns.length === 0) {
      activeListContainer.innerHTML = `
        <div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 12px; border: 1px dashed rgba(255,255,255,0.05); border-radius: 6px;">No external resources loaded.</div>
      `;
    } else {
      activeListContainer.innerHTML = activeCdns.map((cdn, idx) => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 6px 12px;">
          <div style="display: flex; flex-direction: column; gap: 2px; overflow: hidden; margin-right: 12px;">
            <span style="font-size: 11px; color: #ffffff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${cdn.url}">${cdn.url}</span>
            <span style="font-size: 9px; color: var(--text-muted); font-weight: bold; text-transform: uppercase;">${cdn.type} RESOURCE</span>
          </div>
          <button class="cdn-remove-btn" data-idx="${idx}" style="background: none; border: none; color: #f87171; cursor: pointer; font-size: 13px; font-weight: bold; padding: 4px;">&times;</button>
        </div>
      `).join('');
    }

    // Update preset buttons state
    modalEl.querySelectorAll('.cdn-preset-btn').forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      const preset = CDN_PRESETS[idx];
      const isPresetActive = activeCdns.some(c => c.url === preset.url);
      if (isPresetActive) {
        btn.classList.add('active');
        btn.style.color = 'var(--accent-cyan)';
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.background = 'rgba(0, 242, 254, 0.05)';
      } else {
        btn.classList.remove('active');
        btn.style.color = 'var(--text-secondary)';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        btn.style.background = '#0d0d15';
      }
    });

    // Wire remove buttons
    modalEl.querySelectorAll('.cdn-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        activeCdns.splice(idx, 1);
        saveAndRenderActiveList();
      });
    });
  }

  // Bind Preset Buttons click
  modalEl.querySelectorAll('.cdn-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      const preset = CDN_PRESETS[idx];
      const existingIdx = activeCdns.findIndex(c => c.url === preset.url);
      if (existingIdx > -1) {
        activeCdns.splice(existingIdx, 1);
      } else {
        activeCdns.push({ url: preset.url, type: preset.type });
      }
      saveAndRenderActiveList();
    });
  });

  // Custom Resource ADD Button
  modalEl.querySelector('#cdn-btn-add-custom').addEventListener('click', () => {
    const urlInput = modalEl.querySelector('#cdn-custom-url');
    const typeSelect = modalEl.querySelector('#cdn-custom-type');
    const url = urlInput.value.trim();
    const type = typeSelect.value;
    
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      alert('CDN URL must start with http:// or https://');
      return;
    }

    if (activeCdns.some(c => c.url === url)) {
      alert('Resource already added.');
      return;
    }

    activeCdns.push({ url, type });
    urlInput.value = '';
    saveAndRenderActiveList();
  });

  // Initial event bindings for removes
  modalEl.querySelectorAll('.cdn-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      activeCdns.splice(idx, 1);
      saveAndRenderActiveList();
    });
  });

  // Close handlers
  const closeModal = () => {
    modalEl.style.opacity = '0';
    setTimeout(() => modalEl.remove(), 200);
  };

  modalEl.querySelector('#cdn-modal-close-x').addEventListener('click', closeModal);
  modalEl.querySelector('#cdn-modal-btn-close').addEventListener('click', closeModal);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  });

  // Save/Apply handler
  modalEl.querySelector('#cdn-modal-btn-save').addEventListener('click', () => {
    closeModal();
    if (onUpdate) onUpdate();
  });

  // Fade in animation
  setTimeout(() => {
    modalEl.style.opacity = '1';
  }, 10);
}
