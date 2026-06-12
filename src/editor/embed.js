/**
 * SnippetUI - Premium Embed Widget Generator Modal
 */

export function showEmbedModal(compId, compressedCode, triggerToast, copyTextToClipboard) {
  // Remove existing modal if any
  const existing = document.getElementById('snippetui-embed-modal');
  if (existing) {
    existing.remove();
  }

  const embedUrl = `${window.location.origin}/#embed?component=${compId}&code=${compressedCode}`;

  const modalHtml = `
    <div class="embed-modal-backdrop" id="snippetui-embed-modal">
      <div class="embed-modal-card">
        <div class="embed-modal-header">
          <h3 class="embed-modal-title">Embed Component</h3>
          <button class="embed-modal-close-btn" id="embed-modal-close-x">&times;</button>
        </div>
        
        <div class="embed-modal-body">
          <p class="embed-modal-desc">
            Customize and copy the embed code below to place this live interactive component on your website or blog.
          </p>
          
          <div class="embed-modal-settings">
            <div class="embed-modal-field">
              <label class="embed-modal-label">Widget Height (px)</label>
              <input type="number" id="embed-height-input" class="embed-modal-input" value="450" min="200" max="1200">
            </div>
            
            <div class="embed-modal-field">
              <label class="embed-modal-label">Default Mode</label>
              <select id="embed-mode-select" class="embed-modal-input">
                <option value="split">Interactive (Code + Preview)</option>
                <option value="preview">Result Preview Only</option>
              </select>
            </div>
          </div>
          
          <div class="embed-modal-code-section">
            <label class="embed-modal-label">Iframe Code</label>
            <div class="embed-modal-code-container">
              <textarea id="embed-iframe-code" readonly class="embed-modal-textarea" spellcheck="false"></textarea>
            </div>
          </div>
        </div>
        
        <div class="embed-modal-footer">
          <button class="embed-modal-btn cancel" id="embed-modal-btn-close">Close</button>
          <button class="embed-modal-btn primary" id="embed-modal-btn-copy">Copy Embed Code</button>
        </div>
      </div>
    </div>
  `;

  // Append to body
  const modalWrapper = document.createElement('div');
  modalWrapper.innerHTML = modalHtml;
  const modalEl = modalWrapper.firstElementChild;
  document.body.appendChild(modalEl);

  const heightInput = modalEl.querySelector('#embed-height-input');
  const modeSelect = modalEl.querySelector('#embed-mode-select');
  const codeTextarea = modalEl.querySelector('#embed-iframe-code');

  function updateIframeCode() {
    const height = heightInput.value || 450;
    const mode = modeSelect.value;
    const finalUrl = `${embedUrl}&mode=${mode}`;
    codeTextarea.value = `<iframe src="${finalUrl}" width="100%" height="${height}" style="border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px;" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  // Bind settings listeners
  heightInput.addEventListener('input', updateIframeCode);
  modeSelect.addEventListener('change', updateIframeCode);
  
  // Initial generate
  updateIframeCode();

  // Close handlers
  const closeModal = () => {
    modalEl.style.opacity = '0';
    setTimeout(() => modalEl.remove(), 200);
  };

  modalEl.querySelector('#embed-modal-close-x').addEventListener('click', closeModal);
  modalEl.querySelector('#embed-modal-btn-close').addEventListener('click', closeModal);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  });

  // Copy handler
  modalEl.querySelector('#embed-modal-btn-copy').addEventListener('click', () => {
    const code = codeTextarea.value;
    if (code) {
      copyTextToClipboard(code, 'Embed code copied to clipboard!');
      closeModal();
    }
  });

  // Fade in animation
  setTimeout(() => {
    modalEl.style.opacity = '1';
  }, 10);
}
