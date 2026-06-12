/**
 * SnippetUI - CLI Toolkit Guide Page
 * Premium, interactive guide detailing terminal integration workflows with an embedded simulator.
 */

import { t } from './i18n.js';

export function renderCliGuide(onNavigate) {
  const htmlContent = `
    <div class="cli-guide-view-container">
      <!-- Ambient Grid Background -->
      <div class="cli-guide-grid-bg"></div>
      
      <div class="cli-guide-content-wrapper">
        
        <!-- Header & Navigation -->
        <header class="cli-guide-header">
          <a href="#landing" id="btn-cli-back" class="btn-cli-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>${t('err_btn_back')}</span>
          </a>
          
          <div class="tech-badge">
            <span class="badge-dot"></span>
            <span>CLI TOOLKIT PRO</span>
          </div>
          <h1 class="cli-guide-title">${t('cli_title')}</h1>
          <p class="cli-guide-subtitle">${t('cli_subtitle')}</p>
          <div class="header-divider"></div>
        </header>

        <!-- Main Content -->
        <main class="cli-guide-body">
          
          <!-- Quick Start Installation Section -->
          <section class="cli-guide-section quickstart-card">
            <div class="card-icon">⚡</div>
            <div class="card-text">
              <h3>${t('cli_install_title')}</h3>
              <p>${t('cli_install_desc')}</p>
              
              <div class="cli-code-block">
                <span class="prompt-prefix">$</span>
                <code id="npm-install-command">npm install -g snippetui-cli</code>
                <button class="btn-copy-cli" id="btn-copy-install" data-text="npm install -g snippetui-cli">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>${t('cli_copy')}</span>
                </button>
              </div>
            </div>
          </section>

          <!-- Configuration & Configuration File section -->
          <section class="cli-guide-grid-layout">
            
            <div class="cli-config-details">
              <h3>${t('cli_setup_title')}</h3>
              <p>${t('cli_setup_desc')}</p>
              
              <div class="cli-code-block">
                <span class="prompt-prefix">$</span>
                <code>snippetui init</code>
                <button class="btn-copy-cli" id="btn-copy-init" data-text="snippetui init">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>${t('cli_copy')}</span>
                </button>
              </div>
              
              <p class="config-desc">
                This command creates a configuration file in your root folder. This file tracks your path preferences so that components are downloaded directly into your target source directories without manual file movement.
              </p>
            </div>
            
            <!-- Config JSON Display Box -->
            <div class="cli-json-editor">
              <div class="editor-header">
                <span class="file-name">snippetui.config.json</span>
                <span class="file-badge">JSON</span>
              </div>
              <pre><code>{
  <span class="json-key">"srcDir"</span>: <span class="json-val">"./src/components/snippetui"</span>,
  <span class="json-key">"styleFormat"</span>: <span class="json-val">"css"</span>,
  <span class="json-key">"framework"</span>: <span class="json-val">"vanilla"</span>,
  <span class="json-key">"theme"</span>: {
    <span class="json-key">"primary"</span>: <span class="json-val">"--accent-cyan"</span>,
    <span class="json-key">"secondary"</span>: <span class="json-val">"--accent-purple"</span>
  }
}</code></pre>
            </div>
          </section>

          <!-- Terminal Emulator Section -->
          <section class="cli-guide-section cli-terminal-simulator-section">
            <div class="section-title-wrap">
              <h2>${t('cli_terminal_title')}</h2>
              <p>Simulate terminal interaction using the embedded console below. Click any prompt pill to run commands automatically, or type custom commands directly.</p>
            </div>

            <!-- Simulator Action Pills -->
            <div class="terminal-command-pills">
              <button class="btn-terminal-pill" data-command="snippetui init">
                <span class="pill-dot"></span>
                <span>snippetui init</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui list">
                <span class="pill-dot"></span>
                <span>snippetui list</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui add buttons/mercury-ripple-btn">
                <span class="pill-dot"></span>
                <span>snippetui add buttons/mercury-ripple-btn</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui info buttons/mercury-ripple-btn">
                <span class="pill-dot"></span>
                <span>snippetui info mercury-ripple-btn</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui update">
                <span class="pill-dot"></span>
                <span>snippetui update</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui create custom-card">
                <span class="pill-dot"></span>
                <span>snippetui create custom-card</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui doctor">
                <span class="pill-dot"></span>
                <span>snippetui doctor</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui login">
                <span class="pill-dot"></span>
                <span>snippetui login</span>
              </button>
              <button class="btn-terminal-pill" data-command="snippetui --help">
                <span class="pill-dot"></span>
                <span>snippetui --help</span>
              </button>
              <button class="btn-terminal-pill pill-clear" data-command="clear">
                <span>clear</span>
              </button>
            </div>

            <!-- Terminal Mockup Window -->
            <div class="terminal-mock-window">
              <!-- Header Bar -->
              <div class="terminal-header-bar">
                <div class="terminal-window-dots">
                  <span class="window-dot red"></span>
                  <span class="window-dot yellow"></span>
                  <span class="window-dot green"></span>
                </div>
                <div class="terminal-window-title">bash - guest@snippetui:~</div>
                <div class="terminal-window-actions">
                  <button class="btn-terminal-action" id="btn-terminal-action-clear" title="Clear Screen">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              </div>

              <!-- Terminal Console Screen -->
              <div class="terminal-screen" id="terminal-screen">
                <div class="terminal-welcome-msg">
                  <div class="welcome-ascii">
   _____ _   _ _____ _____  _____  ______ _______ _    _ _____ 
  / ____| \\ | |_   _|  __ \\|  __ \\|  ____|__   __| |  | |_   _|
 | (___ |  \\| | | | | |__) | |__) | |__     | |  | |  | | | |  
  \\___ \\| . \` | | | |  ___/|  ___/|  __|    | |  | |  | | | |  
  ____) | |\\  |_| |_| |    | |    | |____   | |  | |__| |_| |_ 
 |_____/|_| \\_|_____|_|    |_|    |______|  |_|   \\____/|_____|
                  </div>
                  <p>Welcome to the SnippetUI CLI Toolkit Sandbox simulator (v1.0.4).</p>
                  <p>Type <span class="term-highlight">snippetui --help</span> to see available commands.</p>
                  <p class="welcome-tip">Tip: Click the quick commands pills above to simulate run sequences!</p>
                </div>
                
                <!-- Command Outputs -->
                <div class="terminal-history" id="terminal-history"></div>

                <!-- Input Line -->
                <div class="terminal-input-line">
                  <span class="terminal-prompt">guest@snippetui:~$</span>
                  <div class="terminal-input-wrapper">
                    <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" autofocus aria-label="Terminal Input" />
                    <span id="terminal-input-typed" class="terminal-typed-text"></span>
                    <span class="terminal-cursor"></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Commands Reference Grid Section -->
          <section class="cli-guide-section cli-commands-ref-section">
            <h2 class="section-title-ref">${t('cli_commands_title')}</h2>
            
            <div class="cli-table-container">
              <table class="cli-ref-table">
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Parameters</th>
                    <th>Description</th>
                    <th>Usage Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code class="cmd-name">snippetui init</code></td>
                    <td><span class="table-param">None</span></td>
                    <td>Initialize SnippetUI configuration mapping within your project directory.</td>
                    <td><code>snippetui init</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui list</code></td>
                    <td><span class="table-param">None</span></td>
                    <td>Fetch and list all available component categories and IDs from the remote registry.</td>
                    <td><code>snippetui list</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui add</code></td>
                    <td><span class="table-param">&lt;component-id&gt;</span></td>
                    <td>Download and inject the components markup files and CSS declarations directly into your local directory.</td>
                    <td><code>snippetui add buttons/mercury-ripple-btn</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui info</code></td>
                    <td><span class="table-param">&lt;component-id&gt;</span></td>
                    <td>Display description, parameters details, and customizable CSS variables of a target component.</td>
                    <td><code>snippetui info buttons/mercury-ripple-btn</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui update</code></td>
                    <td><span class="table-param">None</span></td>
                    <td>Compare local components configuration versions with remote registry versions and update them.</td>
                    <td><code>snippetui update</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui create</code></td>
                    <td><span class="table-param">&lt;component-name&gt;</span></td>
                    <td>Generate a local component template pre-configured with SnippetUI styling rules.</td>
                    <td><code>snippetui create custom-card</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui doctor</code></td>
                    <td><span class="table-param">None</span></td>
                    <td>Run checks on project directory paths, workspace assets, imports resolution, and dependencies integrity.</td>
                    <td><code>snippetui doctor</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui login</code></td>
                    <td><span class="table-param">None</span></td>
                    <td>Authenticate user with SnippetUI Hub credentials to enable team configurations and syncing.</td>
                    <td><code>snippetui login</code></td>
                  </tr>
                  <tr>
                    <td><code class="cmd-name">snippetui --help</code></td>
                    <td><span class="table-param">None</span></td>
                    <td>Display usage instructions and helper parameters options.</td>
                    <td><code>snippetui --help</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  `;

  return {
    html: htmlContent,
    init: (appContainer) => {
      // 1. Back button click trigger
      document.getElementById('btn-cli-back')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });

      // 2. Clipboard copy operations for code blocks
      const registerCopyAction = (btnId, textVal) => {
        const btn = document.getElementById(btnId);
        btn?.addEventListener('click', () => {
          navigator.clipboard.writeText(textVal).then(() => {
            const spanText = btn.querySelector('span');
            if (spanText) {
              spanText.textContent = t('cli_copied');
              setTimeout(() => {
                spanText.textContent = t('cli_copy');
              }, 2000);
            }
          });
        });
      };

      registerCopyAction('btn-copy-install', 'npm install -g snippetui-cli');
      registerCopyAction('btn-copy-init', 'snippetui init');

      // 3. Interactive Terminal simulator implementation
      const terminalInput = appContainer.querySelector('#terminal-input');
      const terminalTyped = appContainer.querySelector('#terminal-input-typed');
      const terminalHistory = appContainer.querySelector('#terminal-history');
      const terminalScreen = appContainer.querySelector('#terminal-screen');
      const btnClearAction = appContainer.querySelector('#btn-terminal-action-clear');
      const commandPills = appContainer.querySelectorAll('.btn-terminal-pill');

      // Sync custom input typography wrapper
      terminalInput?.addEventListener('input', (e) => {
        if (terminalTyped) {
          terminalTyped.textContent = e.target.value;
        }
      });

      // Keep focus on hidden input when terminal screen is clicked
      terminalScreen?.addEventListener('click', () => {
        terminalInput?.focus();
      });

      // Clear terminal action
      const clearTerminal = () => {
        if (terminalHistory) terminalHistory.innerHTML = '';
        const welcome = terminalScreen.querySelector('.terminal-welcome-msg');
        if (welcome) welcome.style.display = 'none';
        if (terminalInput) terminalInput.value = '';
        if (terminalTyped) terminalTyped.textContent = '';
      };

      btnClearAction?.addEventListener('click', clearTerminal);

      // Append outputs in terminal screen
      const writeTerminalLine = (text, type = 'output', delay = 0) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const div = document.createElement('div');
            div.className = `terminal-line line-${type}`;
            
            if (type === 'prompt') {
              const promptSpan = document.createElement('span');
              promptSpan.className = 'terminal-prompt';
              promptSpan.textContent = 'guest@snippetui:~$';
              div.appendChild(promptSpan);
              
              div.appendChild(document.createTextNode(' '));
              
              const typedSpan = document.createElement('span');
              typedSpan.className = 'user-typed';
              typedSpan.textContent = text;
              div.appendChild(typedSpan);
            } else {
              div.innerHTML = text;
            }
            
            terminalHistory?.appendChild(div);
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
            resolve();
          }, delay);
        });
      };

      // Simulated installations spinner helper
      const simulateSpinner = (message, duration = 1200) => {
        return new Promise((resolve) => {
          const div = document.createElement('div');
          div.className = 'terminal-line line-spinner';
          
          const spinnerSpan = document.createElement('span');
          spinnerSpan.className = 'term-cyan';
          div.appendChild(spinnerSpan);
          
          const msgNode = document.createTextNode(' ' + message);
          div.appendChild(msgNode);
          
          terminalHistory?.appendChild(div);
          
          const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
          let frameIndex = 0;
          let startTime = Date.now();
          
          const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= duration) {
              clearInterval(intervalId);
              div.remove();
              resolve();
            } else {
              spinnerSpan.textContent = spinnerFrames[frameIndex];
              frameIndex = (frameIndex + 1) % spinnerFrames.length;
              terminalScreen.scrollTop = terminalScreen.scrollHeight;
            }
          }, 80);
        });
      };

      // Big branding text helper
      const writeBigBranding = async () => {
        const logoAscii = `
<span class="term-cyan">   _____ _   _ _____ _____  _____  ______ _______ _    _ _____ </span>
<span class="term-cyan">  / ____| \\ | |_   _|  __ \\|  __ \\|  ____|__   __| |  | |_   _|</span>
<span class="term-cyan"> | (___ |  \\| | | | | |__) | |__) | |__     | |  | |  | | | |  </span>
<span class="term-cyan">  \\___ \\| . \` | | | |  ___/|  ___/|  __|    | |  | |  | | | |  </span>
<span class="term-cyan">  ____) | |\\  |_| |_| |    | |    | |____   | |  | |__| |_| |_ </span>
<span class="term-cyan"> |_____/|_| \\_|_____|_|    |_|    |______|  |_|   \\____/|_____|</span>
`;
        await writeTerminalLine(logoAscii, 'output', 0);
      };

      const escapeHtml = (unsafe) => {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };

      // Core executor mock responses
      const executeCommand = async (command) => {
        const cmd = command.trim().toLowerCase();
        
        // Hide welcome on first user activity
        const welcome = terminalScreen.querySelector('.terminal-welcome-msg');
        if (welcome) welcome.style.display = 'none';

        // Write user prompt line
        await writeTerminalLine(command, 'prompt');

        if (cmd === 'clear') {
          clearTerminal();
          return;
        }

        // Apply big branding for any snippetui commands except clear
        if (cmd.startsWith('snippetui')) {
          await writeBigBranding();
        }

        if (cmd === 'snippetui init') {
          await simulateSpinner('Initializing SnippetUI environment configurations...');
          await writeTerminalLine('<span class="term-green">✔</span> Created configuration file: <span class="term-highlight">snippetui.config.json</span>', 'output', 200);
          await writeTerminalLine('<span class="term-green">✔</span> Configured default components directory: <span class="term-cyan">./src/components/snippetui</span>', 'output', 200);
          await writeTerminalLine('<span class="term-green">✔</span> Selected stylesheet framework: <span class="term-cyan">Vanilla CSS</span>', 'output', 200);
          await writeTerminalLine('<span class="term-green">✔</span> Synced visual token themes variables successfully', 'output', 200);
          await writeTerminalLine('<br/>Environment setup completed! Start adding components with:<br/><span class="term-cyan">snippetui add &lt;component-id&gt;</span>', 'output', 300);
        }
        else if (cmd === 'snippetui list') {
          await simulateSpinner('Fetching component registry indices...');
          await writeTerminalLine('Found 5 categories and 24 premium components available:<br/>', 'output', 200);
          
          await writeTerminalLine('<span class="term-cyan">📁 text-animations</span>', 'output', 100);
          await writeTerminalLine('  - cyber-glitch-text', 'output', 50);
          await writeTerminalLine('  - magma-shimmer-text', 'output', 50);
          await writeTerminalLine('  - matrix-code-rain', 'output', 50);
          
          await writeTerminalLine('<span class="term-cyan">📁 buttons</span>', 'output', 100);
          await writeTerminalLine('  - mercury-ripple-btn <span class="term-muted">[Installed]</span>', 'output', 50);
          await writeTerminalLine('  - equalizer-pulse-btn', 'output', 50);
          await writeTerminalLine('  - laser-slash-btn', 'output', 50);
          
          await writeTerminalLine('<span class="term-cyan">📁 loaders</span>', 'output', 100);
          await writeTerminalLine('  - bioluminescent-spore-loader', 'output', 50);
          await writeTerminalLine('  - cosmic-nebula-loader', 'output', 50);
          
          await writeTerminalLine('<span class="term-cyan">📁 page-transitions</span>', 'output', 100);
          await writeTerminalLine('  - origami-gate-transition', 'output', 50);
          
          await writeTerminalLine('<span class="term-cyan">📁 dock-navigations</span>', 'output', 100);
          await writeTerminalLine('  - macos-dynamic-dock', 'output', 50);
        }
        else if (cmd === 'snippetui add buttons/mercury-ripple-btn') {
          await simulateSpinner('Installing component buttons/mercury-ripple-btn...');
          await simulateSpinner('Downloading files structure from global registry...', 800);
          await simulateSpinner('Injecting visual custom variables...', 500);
          
          await writeTerminalLine('<span class="term-green">✔</span> Injected component files: <span class="term-cyan">./src/components/snippetui/buttons/mercury-ripple-btn.js</span>', 'output', 200);
          await writeTerminalLine('<span class="term-green">✔</span> Injected component styles: <span class="term-cyan">./src/components/snippetui/buttons/mercury-ripple-btn.css</span>', 'output', 200);
          await writeTerminalLine('<br/><span class="term-green">✔ Installation complete!</span> Import the module directly in your files:<br/><span class="term-highlight">import { initMercuryRippleBtn } from \'./components/snippetui/buttons/mercury-ripple-btn.js\';</span>', 'output', 300);
        }
        else if (cmd.startsWith('snippetui info')) {
          const comp = cmd.replace('snippetui info', '').trim();
          const targetComp = escapeHtml(comp || 'buttons/mercury-ripple-btn');
          await simulateSpinner(`Querying database information for component [${targetComp}]...`);
          
          await writeTerminalLine(`<b>📦 Component:</b> <span class="term-green">${targetComp}</span>`, 'output', 100);
          await writeTerminalLine(`<b>📁 Category:</b> <span class="term-cyan">Dynamic Buttons</span>`, 'output', 100);
          await writeTerminalLine(`<b>🔑 Visual CSS Tokens (Variables):</b>`, 'output', 100);
          await writeTerminalLine(`   - --ripple-color-start <span class="term-muted">(Default: #00f2fe)</span>`, 'output', 50);
          await writeTerminalLine(`   - --ripple-color-end   <span class="term-muted">(Default: #8a2be2)</span>`, 'output', 50);
          await writeTerminalLine(`   - --ripple-speed       <span class="term-muted">(Default: 0.8s)</span>`, 'output', 50);
          await writeTerminalLine(`   - --btn-padding        <span class="term-muted">(Default: 14px 28px)</span>`, 'output', 50);
          await writeTerminalLine(`<b>📝 Description:</b> A premium fluid button containing hardware-accelerated mercury ripple flow triggers upon mouse press interaction. Responsive and cross-browser verified.`, 'output', 100);
        }
        else if (cmd === 'snippetui update') {
          await simulateSpinner('Auditing local directories configurations...');
          await simulateSpinner('Checking remote repository index versions...', 600);
          await writeTerminalLine('Comparing 1 installed component: buttons/mercury-ripple-btn', 'output', 200);
          await writeTerminalLine('<span class="term-green">✔</span> Local component version matches registry version (v1.0.2).', 'output', 100);
          await writeTerminalLine('<span class="term-green">✔ Done! Your workspace is fully up to date with SnippetUI Registry.</span>', 'output', 200);
        }
        else if (cmd.startsWith('snippetui create')) {
          const rawName = cmd.replace('snippetui create', '').trim();
          const compName = escapeHtml(rawName || 'custom-component');
          await simulateSpinner(`Generating assets for new custom component: [${compName}]...`);
          await writeTerminalLine(`<span class="term-green">✔</span> Created starter boilerplate: <span class="term-cyan">./src/components/snippetui/custom/${compName}.js</span>`, 'output', 200);
          await writeTerminalLine(`<span class="term-green">✔</span> Created styling tokens: <span class="term-cyan">./src/components/snippetui/custom/${compName}.css</span>`, 'output', 200);
          await writeTerminalLine(`<br/>Starter assets generated successfully! Edit files to apply your vibes.`, 'output', 300);
        }
        else if (cmd === 'snippetui doctor') {
          await simulateSpinner('Performing workspace audits diagnostic...');
          await writeTerminalLine('<b>[1/4] checking configuration...</b>', 'output', 150);
          await writeTerminalLine('  ✔ Config file found: snippetui.config.json', 'output', 100);
          await writeTerminalLine('<b>[2/4] validating directory paths...</b>', 'output', 150);
          await writeTerminalLine('  ✔ Destination folder exists: ./src/components/snippetui', 'output', 100);
          await writeTerminalLine('<b>[3/4] checking assets integrity...</b>', 'output', 150);
          await writeTerminalLine('  ✔ Components files are safe (no malformed codes identified)', 'output', 100);
          await writeTerminalLine('<b>[4/4] checking dependencies resolving...</b>', 'output', 150);
          await writeTerminalLine('  ✔ Project variables are bound and matching', 'output', 100);
          await writeTerminalLine('<br/><span class="term-green">✔ System check passed with flying colors! Your workspace has zero issues.</span>', 'output', 200);
        }
        else if (cmd === 'snippetui login') {
          await writeTerminalLine('Authenticating with SnippetUI Hub...', 'output', 100);
          await writeTerminalLine('Opening browser window to authenticate token...', 'output', 200);
          await simulateSpinner('Waiting for visual key handshake callback...', 1500);
          await writeTerminalLine('<span class="term-green">✔ Handshake completed successfully.</span>', 'output', 100);
          await writeTerminalLine('Logged in as user: <span class="term-cyan">dev-guest</span>. Team synchronizations activated.', 'output', 200);
        }
        else if (cmd === 'snippetui --help' || cmd === 'snippetui help' || cmd === 'help') {
          await writeTerminalLine('<span class="term-highlight">SnippetUI CLI Toolkit - v1.0.4</span>', 'output', 50);
          await writeTerminalLine('Usage: snippetui &lt;command&gt; [options]<br/>', 'output', 50);
          await writeTerminalLine('Commands:', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">init</span>                             Initialize project configuration settings', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">list</span>                             List all components and assets in registry', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">add &lt;component-id&gt;</span>               Download and inject a component into codebase', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">info &lt;component-id&gt;</span>              Show variables details and info about component', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">update</span>                           Update local components configs to latest', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">create &lt;name&gt;</span>                    Boilerplate starter assets for a custom component', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">doctor</span>                           Run system diagnosic integrity checks', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">login</span>                            Handshake auth login with SnippetUI Hub', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">clear</span>                            Clear console screen history', 'output', 50);
          await writeTerminalLine('  <span class="term-cyan">help</span>                             Show usage guidelines options<br/>', 'output', 50);
          await writeTerminalLine('Options:', 'output', 50);
          await writeTerminalLine('  -v, --version                    Show version details number', 'output', 50);
          await writeTerminalLine('  --help                           Show helper documentation', 'output', 50);
        }
        else if (cmd === 'snippetui -v' || cmd === 'snippetui --version') {
          await writeTerminalLine('SnippetUI CLI version v1.0.4', 'output', 50);
        }
        else if (cmd === '') {
          // Empty entry, do nothing
        }
        else {
          const escapedCmd = escapeHtml(command);
          await writeTerminalLine(`snippetui: command not found: <span class="term-red">${escapedCmd}</span>. Type <span class="term-highlight">snippetui --help</span> for options.`, 'output', 50);
        }
        
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
      };

      // Typewriter simulator for pill triggers
      const runSimulatedTyping = async (text) => {
        if (terminalInput) {
          terminalInput.disabled = true;
          terminalInput.value = '';
        }
        if (terminalTyped) terminalTyped.textContent = '';
        
        for (let i = 0; i <= text.length; i++) {
          await new Promise((res) => setTimeout(res, 40));
          if (terminalTyped) {
            terminalTyped.textContent = text.slice(0, i);
          }
          if (terminalInput) {
            terminalInput.value = text.slice(0, i);
          }
        }
        
        // Brief pause after typing finishes, then execute
        await new Promise((res) => setTimeout(res, 200));
        
        const typedCmd = terminalInput ? terminalInput.value : text;
        if (terminalInput) {
          terminalInput.value = '';
          terminalInput.disabled = false;
        }
        if (terminalTyped) terminalTyped.textContent = '';
        
        await executeCommand(typedCmd);
        terminalInput?.focus();
      };

      // Command Pills listeners
      commandPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          const command = pill.getAttribute('data-command');
          if (command) {
            if (command === 'clear') {
              clearTerminal();
            } else {
              runSimulatedTyping(command);
            }
          }
        });
      });

      // Core text input enter handler
      terminalInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const command = e.target.value;
          e.target.value = '';
          if (terminalTyped) terminalTyped.textContent = '';
          executeCommand(command);
        }
      });
    }
  };
}
