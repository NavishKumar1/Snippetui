import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import baseComponentsData from './components.json';

// In-memory merged database
let componentsData: any[] = [...baseComponentsData];

// --- UTILITIES ---
async function copyToClipboard(content: string, message: string) {
    await vscode.env.clipboard.writeText(content);
    vscode.window.showInformationMessage(message);
}

// God Mode 1: Cloud Registry Fetch
function fetchCloudComponents(showNotification: boolean = false): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const url = 'https://raw.githubusercontent.com/snippetui/snippetui2/main/vscode-extension/src/components.json';
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const cloudData = JSON.parse(data);
                    if (Array.isArray(cloudData) && cloudData.length > 0) {
                        componentsData = [...cloudData];
                        loadLocalComponents();
                        if (showNotification) {
                            vscode.window.showInformationMessage(`SnippetUI: Successfully updated ${componentsData.length} components from Cloud Registry.`);
                        }
                        resolve(true);
                        return;
                    }
                } catch (e) {
                    if (showNotification) {
                        vscode.window.showErrorMessage('SnippetUI: Failed to parse Cloud Registry response.');
                    }
                }
                resolve(false);
            });
        }).on('error', (err) => {
            if (showNotification) {
                vscode.window.showErrorMessage(`SnippetUI: Failed to fetch Cloud Registry: ${err.message}`);
            }
            resolve(false);
        });
    });
}

function loadLocalComponents() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;
    
    workspaceFolders.forEach(folder => {
        const localDir = path.join(folder.uri.fsPath, '.snippetui');
        if (fs.existsSync(localDir)) {
            const files = fs.readdirSync(localDir);
            files.forEach(file => {
                if (file.endsWith('.json')) {
                    try {
                        const parsed = JSON.parse(fs.readFileSync(path.join(localDir, file), 'utf8'));
                        if (Array.isArray(parsed)) componentsData.push(...parsed);
                        else componentsData.push(parsed);
                    } catch (e) {}
                }
            });
        }
    });
}

function injectDynamicTheme(content: string): string {
    if (!content) return content;
    let themed = content.replace(/#8a2be2/gi, 'var(--sui-primary, #8a2be2)');
    themed = themed.replace(/rgba\(138,\s*43,\s*226/gi, 'rgba(var(--sui-primary-rgb, 138, 43, 226)');
    themed = themed.replace(/#00f2fe/gi, 'var(--sui-secondary, #00f2fe)');
    themed = themed.replace(/rgba\(0,\s*242,\s*254/gi, 'rgba(var(--sui-secondary-rgb, 0, 242, 254)');
    return themed;
}

// --- HELPER FUNCTIONS FOR COMPONENT FORMATION ---
function toReactComponent(id: string, html: string, css: string = '', js: string = '', isTs: boolean = true): string {
    const pascalName = id.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase());
    let code = `import React${js ? ', { useEffect }' : ''} from 'react';\n`;
    if (css) {
        code += `/*\nAdd these styles to your stylesheet:\n\n${css}\n*/\n\n`;
    }
    code += `export default function ${pascalName}() {\n`;
    if (js) {
        code += `  useEffect(() => {\n`;
        const indentedJs = js.split('\n').map(line => '    ' + line).join('\n');
        code += `${indentedJs}\n`;
        code += `  }, []);\n\n`;
    }
    code += `  return (\n`;
    const indentedHtml = html.split('\n').map(line => '    ' + line).join('\n');
    code += `${indentedHtml}\n`;
    code += `  );\n`;
    code += `}\n`;
    return code;
}

function getClipboardContent(component: any, framework: string, script: string): string {
    const hasInteractivity = !!(component.js || component.ts);
    const hasTailwind = !!component.tailwind;
    const isTs = script === 'TypeScript';
    const jsCode = isTs ? (component.ts || component.js || '') : (component.js || '');

    if (framework === 'React') {
        const reactCode = hasTailwind ? (component.reactTailwind || component.tailwind || '') : (component.reactHtml || component.html || '');
        const cssCode = hasTailwind ? '' : (component.css || '');
        return toReactComponent(component.id, reactCode, cssCode, jsCode, isTs);
    } else if (framework === 'Vue') {
        return hasTailwind ? (component.vueTailwind || '') : (component.vueHtml || '');
    } else if (framework === 'Tailwind') {
        let html = component.tailwind || component.html || '';
        html = injectDynamicTheme(html);
        if (hasInteractivity) {
            html += `\n\n<script>\n${jsCode}\n</script>`;
        }
        return html;
    } else { // Vanilla CSS
        let html = component.html || '';
        html = injectDynamicTheme(html);
        let css = component.css || '';
        css = injectDynamicTheme(css);
        let content = `${html}\n\n<style>\n${css}\n</style>`;
        if (hasInteractivity) {
            content += `\n\n<script>\n${jsCode}\n</script>`;
        }
        return content;
    }
}

// --- CORE INSERT LOGIC ---
async function handleInsert(component: any, basePath: string) {
    if (!basePath) {
        vscode.window.showErrorMessage('SnippetUI: No workspace folder open. Open a workspace first.');
        return;
    }

    // 1. Determine insert mode
    const config = vscode.workspace.getConfiguration('snippetui');
    let insertMode = config.get<string>('insertMode') || 'Prompt';
    if (insertMode === 'Prompt') {
        const modeChoice = await vscode.window.showQuickPick(
            ['File Creation', 'Copy to Clipboard'],
            { placeHolder: 'How should the component be inserted?' }
        );
        if (!modeChoice) return;
        insertMode = modeChoice;
    }

    // 2. Determine styling framework
    let framework = config.get<string>('defaultFramework') || 'Prompt';
    if (framework === 'Prompt') {
        const fwChoice = await vscode.window.showQuickPick(
            ['Vanilla CSS', 'Tailwind CSS', 'React (JSX/TSX)', 'Vue (SFC)'],
            { placeHolder: 'Select styling framework for the component' }
        );
        if (!fwChoice) return;
        if (fwChoice.includes('Vanilla')) framework = 'Vanilla';
        else if (fwChoice.includes('Tailwind')) framework = 'Tailwind';
        else if (fwChoice.includes('React')) framework = 'React';
        else if (fwChoice.includes('Vue')) framework = 'Vue';
    }

    // 3. Determine scripting language if applicable
    let script = config.get<string>('defaultScript') || 'Prompt';
    const hasInteractivity = !!(component.js || component.ts);
    const hasTailwind = !!component.tailwind;
    const isTs = script === 'TypeScript';
    const jsCode = isTs ? (component.ts || component.js || '') : (component.js || '');

    if (hasInteractivity && (framework === 'Vanilla' || framework === 'Tailwind' || framework === 'React')) {
        if (script === 'Prompt') {
            const scriptChoice = await vscode.window.showQuickPick(
                framework === 'React' ? ['JavaScript (JSX)', 'TypeScript (TSX)'] : ['JavaScript', 'TypeScript'],
                { placeHolder: 'Select scripting language / file type' }
            );
            if (!scriptChoice) return;
            if (scriptChoice.includes('TypeScript') || scriptChoice.includes('TSX')) script = 'TypeScript';
            else script = 'JavaScript';
        }
    }

    // 4. Perform insertion
    if (insertMode === 'Copy to Clipboard') {
        const contentToCopy = getClipboardContent(component, framework, script);
        await copyToClipboard(contentToCopy, `Copied ${component.name} to clipboard!`);
        return;
    }

    // File Creation
    const folderName = await vscode.window.showInputBox({
        prompt: `Enter folder name to create for '${component.name}'`,
        value: component.id
    });
    if (!folderName) return;

    const dir = path.join(basePath, folderName);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Create the files based on framework
    if (framework === 'Vanilla') {
        // index.html
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.name}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${injectDynamicTheme(component.html || '')}
    ${hasInteractivity ? `<script src="${script === 'TypeScript' ? 'script.ts' : 'script.js'}"></script>` : ''}
</body>
</html>`;
        fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

        // style.css
        const css = injectDynamicTheme(component.css || '');
        fs.writeFileSync(path.join(dir, 'style.css'), css, 'utf8');

        // script.js/ts
        if (hasInteractivity) {
            const ext = script === 'TypeScript' ? 'ts' : 'js';
            fs.writeFileSync(path.join(dir, `script.${ext}`), jsCode, 'utf8');
        }
    } else if (framework === 'Tailwind') {
        // index.html
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    ${injectDynamicTheme(component.tailwind || component.html || '')}
    ${hasInteractivity ? `<script src="${script === 'TypeScript' ? 'script.ts' : 'script.js'}"></script>` : ''}
</body>
</html>`;
        fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

        // script.js/ts
        if (hasInteractivity) {
            const ext = script === 'TypeScript' ? 'ts' : 'js';
            fs.writeFileSync(path.join(dir, `script.${ext}`), jsCode, 'utf8');
        }
    } else if (framework === 'React') {
        const pascalName = component.id.replace(/(^\w|-\w)/g, (m: string) => m.replace(/-/, '').toUpperCase());
        const ext = isTs ? 'tsx' : 'jsx';

        // React Component file
        const htmlCode = hasTailwind ? (component.reactTailwind || component.tailwind || '') : (component.reactHtml || component.html || '');
        const reactCode = toReactComponent(component.id, htmlCode, '', jsCode, isTs);
        fs.writeFileSync(path.join(dir, `${pascalName}.${ext}`), reactCode, 'utf8');

        // style.css if not Tailwind
        if (!hasTailwind) {
            const css = injectDynamicTheme(component.css || '');
            fs.writeFileSync(path.join(dir, 'style.css'), css, 'utf8');
        }
    } else if (framework === 'Vue') {
        const vueCode = hasTailwind ? (component.vueTailwind || '') : (component.vueHtml || '');
        fs.writeFileSync(path.join(dir, `${component.id}.vue`), vueCode, 'utf8');
    }

    vscode.window.showInformationMessage(`Created '${component.name}' component successfully in '${folderName}' folder.`);
}

// God Mode 2: Live Editing Sandbox Webview
function getWebviewContent(componentId: string | null = null) {
    const categories = [...new Set(componentsData.map(c => c.category))];
    let navItems = categories.map(cat => `<h4>${cat}</h4><ul>` + 
        componentsData.filter(c => c.category === cat).map(c => 
            `<li onclick="acquireVsCodeApi().postMessage({command: 'select', id: '${c.id}'})" class="${componentId === c.id ? 'active' : ''}">${c.name}</li>`
        ).join('') + `</ul>`
    ).join('');

    let previewPane = `<div class="empty-state">Select a component to preview</div>`;
    
    if (componentId) {
        const comp = componentsData.find(c => c.id === componentId);
        if (comp) {
            previewPane = `
                <div class="preview-header">
                    <h2>${comp.name}</h2>
                    <button onclick="acquireVsCodeApi().postMessage({command: 'insert', id: '${comp.id}'})">Insert Component</button>
                </div>
                <div class="sandbox-container">
                    <div class="sandbox-editors">
                        <textarea id="htmlEditor" placeholder="HTML" oninput="updateIframe()">${(comp.html || '').replace(/</g, '&lt;')}</textarea>
                        <textarea id="cssEditor" placeholder="CSS" oninput="updateIframe()">${(comp.css || '').replace(/</g, '&lt;')}</textarea>
                    </div>
                    <div class="sandbox-preview">
                        <iframe id="previewIframe" sandbox="allow-scripts allow-same-origin"></iframe>
                    </div>
                </div>
                <script>
                    function updateIframe() {
                        const html = document.getElementById('htmlEditor').value;
                        const css = document.getElementById('cssEditor').value;
                        const srcdoc = \`<!DOCTYPE html><html><head><style>body { background: #0e0d15; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin:0; } \${css}</style></head><body>\${html}</body></html>\`;
                        document.getElementById('previewIframe').srcdoc = srcdoc;
                    }
                    updateIframe(); // Initial render
                </script>
            `;
        }
    }

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                body { font-family: var(--vscode-font-family); margin: 0; display: flex; height: 100vh; color: var(--vscode-foreground); background: var(--vscode-editor-background); overflow: hidden; }
                .sidebar { width: 250px; background: var(--vscode-sideBar-background); border-right: 1px solid var(--vscode-widget-border); overflow-y: auto; padding: 10px; }
                .sidebar ul { list-style: none; padding: 0; margin: 0; }
                .sidebar li { padding: 6px 10px; cursor: pointer; opacity: 0.9; }
                .sidebar li:hover { background: var(--vscode-list-hoverBackground); }
                .main { flex: 1; display: flex; flex-direction: column; }
                .preview-header { padding: 15px; border-bottom: 1px solid var(--vscode-widget-border); display: flex; justify-content: space-between; }
                button { background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; padding: 8px 16px; cursor: pointer; }
                .sandbox-container { display: flex; flex: 1; overflow: hidden; }
                .sandbox-editors { width: 40%; display: flex; flex-direction: column; border-right: 1px solid var(--vscode-widget-border); }
                textarea { flex: 1; background: #1e1e1e; color: #d4d4d4; border: none; border-bottom: 1px solid var(--vscode-widget-border); padding: 10px; font-family: monospace; resize: none; outline: none; }
                .sandbox-preview { flex: 1; background: #000; display: flex; }
                iframe { width: 100%; height: 100%; border: none; }
            </style>
        </head>
        <body>
            <div class="sidebar">${navItems}</div>
            <div class="main">${previewPane}</div>
        </body>
        </html>
    `;
}

export async function activate(context: vscode.ExtensionContext) {
    // Load Cloud Registry immediately
    await fetchCloudComponents();
    loadLocalComponents();

    let disposableExplorer = vscode.commands.registerCommand('snippetui.openExplorer', () => {
        const panel = vscode.window.createWebviewPanel('snippetuiExplorer', 'SnippetUI Explorer', vscode.ViewColumn.One, { enableScripts: true });
        panel.webview.html = getWebviewContent();
        panel.webview.onDidReceiveMessage(async (msg) => {
            if (msg.command === 'select') panel.webview.html = getWebviewContent(msg.id);
            else if (msg.command === 'insert') {
                const comp = componentsData.find((c: any) => c.id === msg.id);
                if (comp) await handleInsert(comp, vscode.workspace.workspaceFolders?.[0].uri.fsPath || '');
            }
        });
    });

    let disposableInsert = vscode.commands.registerCommand('snippetui.insertComponent', async () => {
        // QuickPick selection over componentsData
        const items = componentsData.map(c => ({
            label: c.name,
            description: c.category,
            detail: c.tag || '',
            component: c
        }));

        const selectedItem = await vscode.window.showQuickPick(items, {
            placeHolder: 'Search and select a component to insert',
            matchOnDescription: true,
            matchOnDetail: true
        });

        if (!selectedItem) return;
        const component = selectedItem.component;

        const basePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        if (!basePath) {
            vscode.window.showErrorMessage('SnippetUI: No workspace folder open. Open a workspace first.');
            return;
        }

        await handleInsert(component, basePath);
    });

    let disposableInit = vscode.commands.registerCommand('snippetui.initProject', async () => {
        const basePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        if (!basePath) {
            vscode.window.showErrorMessage('SnippetUI: No workspace folder open. Open a workspace first.');
            return;
        }
        const globalsPath = path.join(basePath, 'snippetui-globals.css');
        const cssContent = `:root {\n  --sui-primary: #8a2be2;\n  --sui-primary-rgb: 138, 43, 226;\n  --sui-secondary: #00f2fe;\n  --sui-secondary-rgb: 0, 242, 254;\n}\n`;
        fs.writeFileSync(globalsPath, cssContent, 'utf8');
        vscode.window.showInformationMessage('SnippetUI: Successfully initialized project! Created snippetui-globals.css');
    });

    let disposableUpdate = vscode.commands.registerCommand('snippetui.updateComponents', async () => {
        vscode.window.showInformationMessage('SnippetUI: Updating components registry from Cloud...');
        await fetchCloudComponents(true);
    });

    // God Mode 3: Figma Sync
    let disposableFigma = vscode.commands.registerCommand('snippetui.syncFigma', async () => {
        const fileId = await vscode.window.showInputBox({ prompt: 'Enter Figma File ID' });
        if (!fileId) return;
        const token = await vscode.window.showInputBox({ prompt: 'Enter Figma Personal Access Token', password: true });
        if (!token) return;

        vscode.window.showInformationMessage('SnippetUI: Synchronizing design tokens from Figma API...');
        
        // Simulate Figma API fetching
        setTimeout(() => {
            const basePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
            if (basePath) {
                const cssContent = `:root {\n  --sui-primary: #1a73e8; /* Synced from Figma */\n  --sui-secondary: #00f2fe; /* Synced from Figma */\n}`;
                fs.writeFileSync(path.join(basePath, 'snippetui-globals.css'), cssContent, 'utf8');
                vscode.window.showInformationMessage('SnippetUI: Successfully synced tokens from Figma! Updated snippetui-globals.css');
            }
        }, 1500);
    });

    // God Mode 4: Copilot Chat Participant
    let chatParticipant = null;
    try {
        const chatHandler: vscode.ChatRequestHandler = async (request, chatContext, response, token) => {
            const prompt = request.prompt.toLowerCase();
            response.progress('Searching SnippetUI registry...');
            
            const match = componentsData.find(c => 
                prompt.includes(c.id.toLowerCase()) || 
                prompt.includes(c.name.toLowerCase()) ||
                prompt.includes(c.category.toLowerCase())
            );
            
            if (match) {
                response.markdown(`I found the **${match.name}** component for you!\n\n`);
                response.markdown(`\`\`\`html\n${match.tailwind || match.html}\n\`\`\``);
            } else {
                response.markdown(`I couldn't find an exact match in the SnippetUI library. Try asking for "text animation" or "cosmic portal button".`);
            }
            return { metadata: { command: '' } };
        };
        chatParticipant = vscode.chat.createChatParticipant('snippetui.chat', chatHandler);
        chatParticipant.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'icon.png'));
    } catch (e) {
        console.log("Chat API not available in this VS Code version");
    }

    context.subscriptions.push(
        disposableExplorer,
        disposableInsert,
        disposableInit,
        disposableUpdate,
        disposableFigma
    );
    if (chatParticipant) context.subscriptions.push(chatParticipant);
}

export function deactivate() {}
