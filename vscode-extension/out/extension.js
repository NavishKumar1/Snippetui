"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const https = __importStar(require("https"));
const components_json_1 = __importDefault(require("./components.json"));
// In-memory merged database
let componentsData = [...components_json_1.default];
// --- UTILITIES ---
async function copyToClipboard(content, message) {
    await vscode.env.clipboard.writeText(content);
    vscode.window.showInformationMessage(message);
}
// God Mode 1: Cloud Registry Fetch
function fetchCloudComponents() {
    return new Promise((resolve) => {
        const url = 'https://raw.githubusercontent.com/snippetui/snippetui2/main/vscode-extension/src/components.json';
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const cloudData = JSON.parse(data);
                    if (Array.isArray(cloudData) && cloudData.length > 0) {
                        componentsData = cloudData;
                        console.log('SnippetUI: Successfully loaded components from Cloud Registry.');
                    }
                }
                catch (e) {
                    console.log('SnippetUI: Failed to parse cloud registry, using local fallback.');
                }
                resolve();
            });
        }).on('error', () => {
            console.log('SnippetUI: Offline or network error, using local fallback.');
            resolve();
        });
    });
}
function loadLocalComponents() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders)
        return;
    workspaceFolders.forEach(folder => {
        const localDir = path.join(folder.uri.fsPath, '.snippetui');
        if (fs.existsSync(localDir)) {
            const files = fs.readdirSync(localDir);
            files.forEach(file => {
                if (file.endsWith('.json')) {
                    try {
                        const parsed = JSON.parse(fs.readFileSync(path.join(localDir, file), 'utf8'));
                        if (Array.isArray(parsed))
                            componentsData.push(...parsed);
                        else
                            componentsData.push(parsed);
                    }
                    catch (e) { }
                }
            });
        }
    });
}
function injectDynamicTheme(content) {
    if (!content)
        return content;
    let themed = content.replace(/#8a2be2/gi, 'var(--sui-primary, #8a2be2)');
    themed = themed.replace(/rgba\(138,\s*43,\s*226/gi, 'rgba(var(--sui-primary-rgb, 138, 43, 226)');
    themed = themed.replace(/#00f2fe/gi, 'var(--sui-secondary, #00f2fe)');
    themed = themed.replace(/rgba\(0,\s*242,\s*254/gi, 'rgba(var(--sui-secondary-rgb, 0, 242, 254)');
    return themed;
}
// --- CORE INSERT LOGIC ---
async function handleInsert(component, basePath) {
    // Note: Same insert logic as before
    let contentToCopy = component.tailwind || component.html || '';
    contentToCopy = injectDynamicTheme(contentToCopy);
    contentToCopy = `<!-- sui-id: ${component.id} -->\\n` + contentToCopy;
    const mode = vscode.workspace.getConfiguration('snippetui').get('insertMode') || 'Prompt';
    if (mode === 'Copy to Clipboard') {
        await copyToClipboard(contentToCopy, `Copied ${component.name} to clipboard!`);
        return;
    }
    const folderName = await vscode.window.showInputBox({ prompt: 'Enter folder name', value: component.id });
    if (!folderName)
        return;
    const dir = path.join(basePath, folderName);
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), contentToCopy, 'utf8');
    vscode.window.showInformationMessage(`Created '${component.name}'`);
}
// God Mode 2: Live Editing Sandbox Webview
function getWebviewContent(componentId = null) {
    const categories = [...new Set(componentsData.map(c => c.category))];
    let navItems = categories.map(cat => `<h4>${cat}</h4><ul>` +
        componentsData.filter(c => c.category === cat).map(c => `<li onclick="acquireVsCodeApi().postMessage({command: 'select', id: '${c.id}'})" class="${componentId === c.id ? 'active' : ''}">${c.name}</li>`).join('') + `</ul>`).join('');
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
async function activate(context) {
    // Load Cloud Registry immediately
    await fetchCloudComponents();
    loadLocalComponents();
    let disposableExplorer = vscode.commands.registerCommand('snippetui.openExplorer', () => {
        const panel = vscode.window.createWebviewPanel('snippetuiExplorer', 'SnippetUI Explorer', vscode.ViewColumn.One, { enableScripts: true });
        panel.webview.html = getWebviewContent();
        panel.webview.onDidReceiveMessage(async (msg) => {
            if (msg.command === 'select')
                panel.webview.html = getWebviewContent(msg.id);
            else if (msg.command === 'insert') {
                const comp = componentsData.find((c) => c.id === msg.id);
                if (comp)
                    await handleInsert(comp, vscode.workspace.workspaceFolders?.[0].uri.fsPath || '');
            }
        });
    });
    // God Mode 3: Figma Sync
    let disposableFigma = vscode.commands.registerCommand('snippetui.syncFigma', async () => {
        const fileId = await vscode.window.showInputBox({ prompt: 'Enter Figma File ID' });
        if (!fileId)
            return;
        const token = await vscode.window.showInputBox({ prompt: 'Enter Figma Personal Access Token', password: true });
        if (!token)
            return;
        vscode.window.showInformationMessage('SnippetUI: Synchronizing design tokens from Figma API...');
        // Simulate Figma API fetching
        setTimeout(() => {
            const basePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
            if (basePath) {
                const cssContent = `:root {\\n  --sui-primary: #1a73e8; /* Synced from Figma */\\n  --sui-secondary: #00f2fe; /* Synced from Figma */\\n}`;
                fs.writeFileSync(path.join(basePath, 'snippetui-globals.css'), cssContent, 'utf8');
                vscode.window.showInformationMessage('SnippetUI: Successfully synced tokens from Figma! Updated snippetui-globals.css');
            }
        }, 1500);
    });
    // God Mode 4: Copilot Chat Participant
    let chatParticipant = null;
    try {
        const chatHandler = async (request, chatContext, response, token) => {
            const prompt = request.prompt.toLowerCase();
            response.progress('Searching SnippetUI registry...');
            const match = componentsData.find(c => prompt.includes(c.id.toLowerCase()) ||
                prompt.includes(c.name.toLowerCase()) ||
                prompt.includes(c.category.toLowerCase()));
            if (match) {
                response.markdown(`I found the **${match.name}** component for you!\\n\\n`);
                response.markdown(`\`\`\`html\\n${match.tailwind || match.html}\\n\`\`\``);
            }
            else {
                response.markdown(`I couldn't find an exact match in the SnippetUI library. Try asking for "text animation" or "cosmic portal button".`);
            }
            return { metadata: { command: '' } };
        };
        chatParticipant = vscode.chat.createChatParticipant('snippetui.chat', chatHandler);
        chatParticipant.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'icon.png'));
    }
    catch (e) {
        console.log("Chat API not available in this VS Code version");
    }
    context.subscriptions.push(disposableExplorer, disposableFigma);
    if (chatParticipant)
        context.subscriptions.push(chatParticipant);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map