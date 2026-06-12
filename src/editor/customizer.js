/**
 * SnippetUI - Visual Variables Customizer Panel
 */

export function parseCssVariables(cssText) {
  const variables = [];
  const regex = /(--[\w-]+)\s*:\s*([^;]+)/g;
  let match;
  
  while ((match = regex.exec(cssText)) !== null) {
    const name = match[1].trim();
    const rawVal = match[2].trim();
    
    let type = 'text';
    let min = 0;
    let max = 100;
    let unit = '';
    let parsedNum = 0;

    const isColor = rawVal.startsWith('#') || 
                    rawVal.startsWith('rgba') || 
                    rawVal.startsWith('rgb') || 
                    rawVal.startsWith('hsla') || 
                    rawVal.startsWith('hsl');

    if (isColor) {
      type = 'color';
    } else {
      // Check for dimension lengths: e.g. 10px, 1.5rem, 50%
      const dimensionMatch = /^([+-]?\d*(?:\.\d+)?)(px|rem|em|%|vh|vw)?$/.exec(rawVal);
      if (dimensionMatch) {
        type = 'range';
        parsedNum = parseFloat(dimensionMatch[1]);
        unit = dimensionMatch[2] || '';
        
        // Settings for slider
        if (unit === 'px') {
          min = 0;
          max = 120;
        } else if (unit === 'rem' || unit === 'em') {
          min = 0;
          max = 8;
        } else if (unit === '%') {
          min = 0;
          max = 100;
        } else {
          min = 0;
          max = 50;
        }
      }
    }

    variables.push({ name, value: rawVal, type, min, max, unit, parsedNum });
  }
  return variables;
}

export function updateCssVariableInCode(cssText, varName, newVal) {
  const escapedName = varName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedName}\\s*:\\s*)([^;]+)(;)`);
  return cssText.replace(regex, `$1${newVal}$3`);
}

export function updateMonacoCssVariable(editorCss, varName, newVal) {
  if (!window.monaco || !editorCss) return;

  const model = editorCss.getModel();
  const text = model.getValue();
  const escapedName = varName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedName}\\s*:\\s*)([^;]+)(;)`);
  const match = regex.exec(text);

  if (match) {
    const startIndex = match.index + match[1].length;
    const endIndex = startIndex + match[2].length;
    
    const startPos = model.getPositionAt(startIndex);
    const endPos = model.getPositionAt(endIndex);
    
    editorCss.executeEdits('customizer', [{
      range: new window.monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column),
      text: newVal,
      forceMoveMarkers: true
    }]);
  }
}

export function renderCustomizerPanel(container, editorCss, getCssContent, setCssContent) {
  // Check if panel already exists in container
  let panel = container.querySelector('#editor-customizer-drawer');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'editor-customizer-drawer';
    panel.className = 'collapsed';
    panel.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 260px;
      height: 100%;
      background: rgba(8, 8, 12, 0.95);
      border-left: 1px solid var(--border-color);
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transform: translateX(100%);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 50;
      display: flex;
      flex-direction: column;
      user-select: none;
    `;
    container.appendChild(panel);
  }

  const cssText = getCssContent();
  const variables = parseCssVariables(cssText);

  let varsHtml = '';
  if (variables.length === 0) {
    varsHtml = `
      <div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 32px 16px; border: 1px dashed rgba(255,255,255,0.05); border-radius: 6px; margin: 16px;">
        No CSS custom variables found in style.css.<br><br>
        <span style="font-style: italic; opacity: 0.8;">Example:<br>--btn-bg: #8a2be2;<br>--btn-radius: 8px;</span>
      </div>
    `;
  } else {
    varsHtml = variables.map((v, idx) => {
      const label = v.name.replace(/^--/, '').replace(/-/g, ' ');
      
      let inputHtml = '';
      if (v.type === 'color') {
        inputHtml = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="color" class="customizer-var-input" data-name="${v.name}" data-type="color" value="${v.value}" style="width: 28px; height: 28px; border: none; border-radius: 4px; background: transparent; cursor: pointer; padding: 0;">
            <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary);">${v.value}</span>
          </div>
        `;
      } else if (v.type === 'range') {
        // Range slider
        const step = (v.unit === 'rem' || v.unit === 'em') ? '0.1' : '1';
        inputHtml = `
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between; font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary);">
              <input type="range" class="customizer-var-input" data-name="${v.name}" data-type="range" data-unit="${v.unit}" min="${v.min}" max="${v.max}" step="${step}" value="${v.parsedNum}" style="-webkit-appearance: none; flex: 1; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.1); outline: none; margin-top: 4px;">
              <span style="margin-left: 8px; font-weight: bold; color: var(--accent-cyan);">${v.parsedNum}${v.unit}</span>
            </div>
          </div>
        `;
      } else {
        inputHtml = `
          <input type="text" class="customizer-var-input" data-name="${v.name}" data-type="text" value="${v.value}" style="width: 100%; background: #0d0d15; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 4px 8px; color: #ffffff; font-size: 11px; font-family: var(--font-mono); outline: none;">
        `;
      }

      return `
        <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.02);">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; display: block;">${label}</label>
          ${inputHtml}
        </div>
      `;
    }).join('');
  }

  panel.innerHTML = `
    <div style="height: 36px; min-height: 36px; background: #0c0c14; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
      <span style="font-size: 10px; font-weight: 700; color: #ffffff; text-transform: uppercase;">Visual Controls</span>
      <button id="customizer-close-btn" style="background: none; border: none; color: var(--text-muted); font-size: 16px; cursor: pointer; padding: 0;">&times;</button>
    </div>
    
    <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column;">
      ${varsHtml}
    </div>
  `;

  // Bind input listeners
  panel.querySelectorAll('.customizer-var-input').forEach(input => {
    const varName = input.getAttribute('data-name');
    const type = input.getAttribute('data-type');
    const unit = input.getAttribute('data-unit') || '';

    const handleUpdate = (e) => {
      let val = e.target.value;
      if (type === 'range') {
        val = val + unit;
      }
      
      // Update code inside Monaco if loaded, or via string replace
      if (editorCss) {
        updateMonacoCssVariable(editorCss, varName, val);
      } else {
        const updated = updateCssVariableInCode(getCssContent(), varName, val);
        setCssContent(updated);
      }
    };

    if (type === 'range') {
      input.addEventListener('input', handleUpdate);
    } else {
      input.addEventListener('change', handleUpdate);
    }
  });

  // Bind close btn
  panel.querySelector('#customizer-close-btn').addEventListener('click', () => {
    panel.style.transform = 'translateX(100%)';
    panel.classList.remove('active');
    panel.classList.add('collapsed');
  });
}

export function toggleCustomizerPanel(viewportContainer, editorCss, getCssContent, setCssContent) {
  const panel = viewportContainer.querySelector('#editor-customizer-drawer');
  if (!panel || panel.classList.contains('collapsed')) {
    renderCustomizerPanel(viewportContainer, editorCss, getCssContent, setCssContent);
    const updatedPanel = viewportContainer.querySelector('#editor-customizer-drawer');
    updatedPanel.style.transform = 'translateX(0)';
    updatedPanel.classList.remove('collapsed');
    updatedPanel.classList.add('active');
  } else {
    panel.style.transform = 'translateX(100%)';
    panel.classList.remove('active');
    panel.classList.add('collapsed');
  }
}
