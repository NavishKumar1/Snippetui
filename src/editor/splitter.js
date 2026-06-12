/**
 * SnippetUI - Draggable Split-Pane Workspace Resizers
 */

/**
 * Initializes resizer split handles between code columns and preview containers.
 */
export function initResizers(container) {
  const editorsContainer = container.querySelector('#editor-editors-container');
  const colHtml = container.querySelector('#col-editor-html');
  const colCss = container.querySelector('#col-editor-css');
  const colJs = container.querySelector('#col-editor-js');
  
  const resizerHtmlCss = container.querySelector('#resizer-html-css');
  const resizerCssJs = container.querySelector('#resizer-css-js');
  
  const editorsRow = container.querySelector('.editor-page-editors-row');
  const previewRow = container.querySelector('.editor-page-preview-row');
  const resizerEditorsPreview = container.querySelector('#resizer-editors-preview');

  function disableIframeInteraction(disable) {
    const iframe = container.querySelector('#editor-page-sandbox-iframe');
    if (iframe) {
      iframe.style.pointerEvents = disable ? 'none' : 'auto';
    }
  }

  // 1. Horizontal splitting: Editors Row (top) vs Preview Row (bottom)
  if (resizerEditorsPreview && editorsRow && previewRow) {
    const onMouseDownY = (e) => {
      e.preventDefault();
      disableIframeInteraction(true);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';

      const onMouseMoveY = (moveEvent) => {
        const totalHeight = container.clientHeight - 64; // Offset top header height (64px)
        const deltaY = moveEvent.clientY - 64;
        let pct = (deltaY / totalHeight) * 100;
        
        // Sizing constraints (minimum 15% and maximum 80%)
        if (pct < 15) pct = 15;
        if (pct > 80) pct = 80;

        editorsRow.style.height = `${pct}%`;
        previewRow.style.height = `${100 - pct}%`;
      };

      const onMouseUpY = () => {
        disableIframeInteraction(false);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
        window.removeEventListener('mousemove', onMouseMoveY);
        window.removeEventListener('mouseup', onMouseUpY);
      };

      window.addEventListener('mousemove', onMouseMoveY);
      window.addEventListener('mouseup', onMouseUpY);
    };

    resizerEditorsPreview.addEventListener('mousedown', onMouseDownY);
  }

  // 2. Vertical splitting: HTML vs CSS vs JS Columns
  if (resizerHtmlCss && resizerCssJs && colHtml && colCss && colJs && editorsContainer) {
    let wHtml = 33.33;
    let wCss = 33.33;
    let wJs = 33.33;

    // Apply baseline layouts
    colHtml.style.flex = 'none';
    colCss.style.flex = 'none';
    colJs.style.flex = 'none';
    
    colHtml.style.width = `calc(${wHtml}% - 4px)`;
    colCss.style.width = `calc(${wCss}% - 4px)`;
    colJs.style.width = `calc(${wJs}% - 4px)`;

    const onMouseDownHtmlCss = (e) => {
      e.preventDefault();
      disableIframeInteraction(true);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      const containerWidth = editorsContainer.clientWidth;
      const initialHtmlWidth = colHtml.getBoundingClientRect().width;
      const initialCssWidth = colCss.getBoundingClientRect().width;
      const startX = e.clientX;

      const onMouseMoveX = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        let newHtmlWidth = initialHtmlWidth + deltaX;
        let newCssWidth = initialCssWidth - deltaX;

        // Constraints: columns cannot be less than 150px
        if (newHtmlWidth < 150) {
          newCssWidth += (newHtmlWidth - 150);
          newHtmlWidth = 150;
        }
        if (newCssWidth < 150) {
          newHtmlWidth += (newCssWidth - 150);
          newCssWidth = 150;
        }

        const newHtmlPct = (newHtmlWidth / containerWidth) * 100;
        const newCssPct = (newCssWidth / containerWidth) * 100;
        const remainingPct = 100 - newHtmlPct - newCssPct;

        if (remainingPct >= 15) {
          wHtml = newHtmlPct;
          wCss = newCssPct;
          wJs = remainingPct;

          colHtml.style.width = `calc(${wHtml}% - 4px)`;
          colCss.style.width = `calc(${wCss}% - 4px)`;
          colJs.style.width = `calc(${wJs}% - 4px)`;
        }
      };

      const onMouseUpX = () => {
        disableIframeInteraction(false);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
        window.removeEventListener('mousemove', onMouseMoveX);
        window.removeEventListener('mouseup', onMouseUpX);
      };

      window.addEventListener('mousemove', onMouseMoveX);
      window.addEventListener('mouseup', onMouseUpX);
    };

    const onMouseDownCssJs = (e) => {
      e.preventDefault();
      disableIframeInteraction(true);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      const containerWidth = editorsContainer.clientWidth;
      const initialCssWidth = colCss.getBoundingClientRect().width;
      const initialJsWidth = colJs.getBoundingClientRect().width;
      const startX = e.clientX;

      const onMouseMoveX = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        let newCssWidth = initialCssWidth + deltaX;
        let newJsWidth = initialJsWidth - deltaX;

        // Constraints: columns cannot be less than 150px
        if (newCssWidth < 150) {
          newJsWidth += (newCssWidth - 150);
          newCssWidth = 150;
        }
        if (newJsWidth < 150) {
          newCssWidth += (newJsWidth - 150);
          newJsWidth = 150;
        }

        const newCssPct = (newCssWidth / containerWidth) * 100;
        const newJsPct = (newJsWidth / containerWidth) * 100;
        const remainingPct = 100 - newCssPct - newJsPct;

        if (remainingPct >= 15) {
          wHtml = remainingPct;
          wCss = newCssPct;
          wJs = newJsPct;

          colHtml.style.width = `calc(${wHtml}% - 4px)`;
          colCss.style.width = `calc(${wCss}% - 4px)`;
          colJs.style.width = `calc(${wJs}% - 4px)`;
        }
      };

      const onMouseUpX = () => {
        disableIframeInteraction(false);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
        window.removeEventListener('mousemove', onMouseMoveX);
        window.removeEventListener('mouseup', onMouseUpX);
      };

      window.addEventListener('mousemove', onMouseMoveX);
      window.addEventListener('mouseup', onMouseUpX);
    };

    resizerHtmlCss.addEventListener('mousedown', onMouseDownHtmlCss);
    resizerCssJs.addEventListener('mousedown', onMouseDownCssJs);
  }
}
