/**
 * SnippetUI - Real-Time Framework Code Generation Engine
 */

/**
 * Utility to convert raw HTML elements into React-compliant JSX.
 */
function translateHtmlToJsx(html) {
  if (!html) return '';
  
  let jsx = html;
  
  // 1. Replace class= with className=
  jsx = jsx.replace(/\bclass=/g, 'className=');
  
  // 2. Ensure self-closing tags in XHTML/JSX style
  const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
  selfClosingTags.forEach(tag => {
    const regex = new RegExp(`<(${tag})([^>]*?)(?<!\\/)>`, 'gi');
    jsx = jsx.replace(regex, '<$1$2 />');
  });

  // 3. Convert inline style string to React style object (basic translator)
  jsx = jsx.replace(/style="([^"]*?)"/gi, (match, styleStr) => {
    const rules = styleStr.split(';').filter(r => r.trim());
    const reactRules = rules.map(rule => {
      const parts = rule.split(':');
      if (parts.length < 2) return '';
      const key = parts[0].trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
      const val = parts.slice(1).join(':').trim().replace(/'/g, "\\'");
      return `${key}: '${val}'`;
    }).filter(r => r);
    return `style={{ ${reactRules.join(', ')} }}`;
  });

  return jsx;
}

/**
 * Compiles React TSX component template.
 */
export function generateReact(workspaceFiles, isTailwindActive = false) {
  const html = workspaceFiles['index.html']?.content || '';
  const css = workspaceFiles['style.css']?.content || '';
  const js = workspaceFiles['index.js']?.content || '';

  const jsxContent = translateHtmlToJsx(html);
  const indent = '    ';
  const jsxIndented = jsxContent.split('\n').map(line => indent + line).join('\n');

  let styleTag = '';
  if (!isTailwindActive && css && css.trim()) {
    styleTag = `\n${indent}<style>{\`\n${css.split('\n').map(line => indent + indent + line).join('\n')}\n${indent}}\`</style>\n`;
  }

  let reactEffect = '';
  if (js && js.trim() && !js.includes('No Javascript required')) {
    reactEffect = `
  React.useEffect(() => {
    try {
      ${js.split('\n').map(line => '      ' + line).join('\n')}
    } catch (err) {
      console.error(err);
    }
  }, []);
`;
  }

  let output = `/* =========================================================================
   Component.jsx
   ========================================================================= */
import React from 'react';

export default function Component() {${reactEffect}
  return (
    <>
${jsxIndented}${styleTag}    </>
  );
}
`;

  // Append other files
  Object.keys(workspaceFiles).forEach(name => {
    if (name === 'index.html' || name === 'style.css' || name === 'index.js') return;
    const file = workspaceFiles[name];
    output += `\n\n/* =========================================================================
   ${name}
   ========================================================================= */
${file.content}
`;
  });

  return output;
}

/**
 * Compiles Vue 3 SFC (Single File Component) setup template.
 */
export function generateVue(workspaceFiles) {
  const html = workspaceFiles['index.html']?.content || '';
  const css = workspaceFiles['style.css']?.content || '';
  const js = workspaceFiles['index.js']?.content || '';

  let setupScript = '';
  if (js && js.trim() && !js.includes('No Javascript required')) {
    setupScript = `\n<script setup>\nimport { onMounted } from 'vue';\n\nonMounted(() => {\n${js.split('\n').map(line => '  ' + line).join('\n')}\n});\n</script>\n`;
  }

  let styleSection = '';
  if (css && css.trim()) {
    styleSection = `\n<style scoped>\n${css}\n</style>\n`;
  }

  let output = `<!-- =========================================================================
     Component.vue
     ========================================================================= -->
<template>
  ${html.split('\n').join('\n  ')}
</template>
${setupScript}${styleSection}`;

  // Append other files
  Object.keys(workspaceFiles).forEach(name => {
    if (name === 'index.html' || name === 'style.css' || name === 'index.js') return;
    const file = workspaceFiles[name];
    output += `\n\n/* =========================================================================
   ${name}
   ========================================================================= */
${file.content}
`;
  });

  return output;
}

/**
 * Compiles Svelte 3/4 component template.
 */
export function generateSvelte(workspaceFiles) {
  const html = workspaceFiles['index.html']?.content || '';
  const css = workspaceFiles['style.css']?.content || '';
  const js = workspaceFiles['index.js']?.content || '';

  let scriptSection = '';
  if (js && js.trim() && !js.includes('No Javascript required')) {
    scriptSection = `<script>\n  import { onMount } from 'svelte';\n\n  onMount(() => {\n${js.split('\n').map(line => '    ' + line).join('\n')}\n  });\n</script>\n\n`;
  }

  let styleSection = '';
  if (css && css.trim()) {
    styleSection = `\n\n<style>\n${css.split('\n').map(line => '  ' + line).join('\n')}\n</style>`;
  }

  let output = `<!-- =========================================================================
     Component.svelte
     ========================================================================= -->
${scriptSection}${html}${styleSection}`;

  // Append other files
  Object.keys(workspaceFiles).forEach(name => {
    if (name === 'index.html' || name === 'style.css' || name === 'index.js') return;
    const file = workspaceFiles[name];
    output += `\n\n/* =========================================================================
   ${name}
   ========================================================================= */
${file.content}
`;
  });

  return output;
}
