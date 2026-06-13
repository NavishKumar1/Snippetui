/**
 * Component: Retro CRT Console 404
 * Category: error-404
 */

export const component = {
  id: 'retro-crt-console-404',
  name: 'Retro CRT Console 404',
  category: 'error-404',
  tag: 'Terminal',
  html: `<div class="crt-sandbox" id="crt-console-container">
  <div class="crt-monitor-bloom">
    <div class="crt-screen">
      <div class="crt-header">
        <span class="crt-status-dot"></span>
        <span class="crt-system-label">SNIPPETUI(TM) BIOS V1.04 - ERROR STATUS</span>
      </div>

      <div class="crt-output" id="crt-terminal-output">
        <div class="crt-line crt-system-msg">SYSTEM FAULT DETECTION CODE [404]</div>
        <div class="crt-line">REASON: REQUESTED FILE RESOURCE NOT FOUND IN STORAGE MATRIX.</div>
        <div class="crt-line">TYPE 'help' FOR AVAILABLE RECOVERY PROTOCOLS.</div>
        <br/>
      </div>

      <div class="crt-input-row">
        <span class="crt-prompt">SECURE-RECOVERY:\\></span>
        <input type="text" class="crt-cmd-input" id="crt-command-input" autofocus autocomplete="off" spellcheck="false" placeholder="Type a command..." />
      </div>
    </div>
  </div>
  <div class="crt-flicker"></div>
  <div class="crt-vignette"></div>
</div>`,
  js: `// Retro CRT Console 404
const container = document.getElementById('crt-console-container');
if (container) {
  const input = container.querySelector('#crt-command-input');
  const output = container.querySelector('#crt-terminal-output');

  // Command history helper
  const printLine = (text, type = '') => {
    const div = document.createElement('div');
    div.className = 'crt-line' + (type ? ' ' + type : '');
    div.innerText = text;
    output.appendChild(div);
    
    // Auto-scroll output container
    output.scrollTop = output.scrollHeight;
  };

  const processCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    printLine('SECURE-RECOVERY:\\> ' + cmd, 'crt-cmd-echo');

    if (cleanCmd === 'help') {
      printLine('AVAILABLE COMMANDS:', 'crt-system-msg');
      printLine('  help    - Display this assistance list');
      printLine('  scan    - Query the drive sector for lost sectors');
      printLine('  ping    - Check signal connection to server');
      printLine('  reboot  - Clear matrix buffers and reboot terminal');
      printLine('  clear   - Clear terminal monitor logs');
    } else if (cleanCmd === 'scan') {
      printLine('INITIALIZING DIRECTORY SCAN...', 'crt-warning-msg');
      setTimeout(() => {
        printLine('FATAL ERROR DETECTED IN STORAGE SECTOR 404:');
        printLine('  +-----------------------------+');
        printLine('  |   _  _    ___    _  _       |');
        printLine('  |  | || |  / _ \\  | || |      |');
        printLine('  |  | || |_| | | |_| || |_     |');
        printLine('  |  |__   _| | | |_   __ _|    |');
        printLine('  |     | | | |_| |  | |        |');
        printLine('  |     |_|  \\___/   |_|        |');
        printLine('  |  FILE SECTOR DECAY DETECTED |');
        printLine('  +-----------------------------+');
        printLine('STATUS: SOURCE INDEX CORRUPT.', 'crt-error-msg');
      }, 400);
    } else if (cleanCmd === 'ping') {
      printLine('PINGING IP 127.0.0.1...');
      setTimeout(() => {
        printLine('REPLY FROM 127.0.0.1: TIME=104ms TTL=64');
        printLine('WARNING: UNSTABLE MATRIX BOUNDARY.', 'crt-warning-msg');
      }, 300);
    } else if (cleanCmd === 'reboot') {
      printLine('REBOOTING STORAGE CORE SYSTEM...', 'crt-warning-msg');
      setTimeout(() => {
        output.innerHTML = '';
        printLine('SYSTEM REBOOT COMPLETED.', 'crt-system-msg');
        printLine('BIOS STATUS: ACTIVE.');
        printLine('TYPE \\'help\\' TO RE-SCAN.');
      }, 600);
    } else if (cleanCmd === 'clear') {
      output.innerHTML = '';
    } else if (cleanCmd === '') {
      // Empty input
    } else {
      printLine('ERROR: INVALIDRecoveryCMD \\'' + cmd + '\\'. TYPE \\'help\\' FOR DETAILS.', 'crt-error-msg');
    }
  };

  // Click container to focus input
  const handleContainerClick = () => {
    input.focus();
  };
  container.addEventListener('click', handleContainerClick);

  // Keypress event handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value;
      input.value = '';
      processCommand(cmd);
    }
  };
  input.addEventListener('keydown', handleKeyDown);

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    container.removeEventListener('click', handleContainerClick);
    input.removeEventListener('keydown', handleKeyDown);
  });
}`,
  ts: `// Retro CRT Console 404 TS Definitions
const container = document.getElementById('crt-console-container') as HTMLDivElement | null;
if (container) {
  const input = container.querySelector('#crt-command-input') as HTMLInputElement;
  const output = container.querySelector('#crt-terminal-output') as HTMLDivElement;

  const printLine = (text: string, type: string = '') => {
    const div = document.createElement('div');
    div.className = 'crt-line' + (type ? ' ' + type : '');
    div.innerText = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  };

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    printLine('SECURE-RECOVERY:\\> ' + cmd, 'crt-cmd-echo');

    if (cleanCmd === 'help') {
      printLine('AVAILABLE COMMANDS:', 'crt-system-msg');
      printLine('  help    - Display this assistance list');
      printLine('  scan    - Query the drive sector for lost sectors');
      printLine('  ping    - Check signal connection to server');
      printLine('  reboot  - Clear matrix buffers and reboot terminal');
      printLine('  clear   - Clear terminal monitor logs');
    } else if (cleanCmd === 'scan') {
      printLine('INITIALIZING DIRECTORY SCAN...', 'crt-warning-msg');
      setTimeout(() => {
        printLine('FATAL ERROR DETECTED IN STORAGE SECTOR 404:');
        printLine('  +-----------------------------+');
        printLine('  |   _  _    ___    _  _       |');
        printLine('  |  | || |  / _ \\  | || |      |');
        printLine('  |  | || |_| | | |_| || |_     |');
        printLine('  |  |__   _| | | |_   __ _|    |');
        printLine('  |     | | | |_| |  | |        |');
        printLine('  |     |_|  \\___/   |_|        |');
        printLine('  |  FILE SECTOR DECAY DETECTED |');
        printLine('  +-----------------------------+');
        printLine('STATUS: SOURCE INDEX CORRUPT.', 'crt-error-msg');
      }, 400);
    } else if (cleanCmd === 'ping') {
      printLine('PINGING IP 127.0.0.1...');
      setTimeout(() => {
        printLine('REPLY FROM 127.0.0.1: TIME=104ms TTL=64');
        printLine('WARNING: UNSTABLE MATRIX BOUNDARY.', 'crt-warning-msg');
      }, 300);
    } else if (cleanCmd === 'reboot') {
      printLine('REBOOTING STORAGE CORE SYSTEM...', 'crt-warning-msg');
      setTimeout(() => {
        output.innerHTML = '';
        printLine('SYSTEM REBOOT COMPLETED.', 'crt-system-msg');
        printLine('BIOS STATUS: ACTIVE.');
        printLine('TYPE \\'help\\' TO RE-SCAN.');
      }, 600);
    } else if (cleanCmd === 'clear') {
      output.innerHTML = '';
    } else if (cleanCmd === '') {
      // Empty input
    } else {
      printLine('ERROR: INVALIDRecoveryCMD \\'' + cmd + '\\'. TYPE \\'help\\' FOR DETAILS.', 'crt-error-msg');
    }
  };

  const handleContainerClick = () => {
    input.focus();
  };
  container.addEventListener('click', handleContainerClick);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.value;
      input.value = '';
      processCommand(cmd);
    }
  };
  input.addEventListener('keydown', handleKeyDown);

  container.addEventListener('destroyed', () => {
    container!.removeEventListener('click', handleContainerClick);
    input.removeEventListener('keydown', handleKeyDown);
  });
}`,
  css: `/* Retro CRT Console 404 Styles */
.crt-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #040804;
  border-radius: 24px;
  border: 1px solid rgba(0, 255, 0, 0.15);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fira Code', 'Courier New', monospace;
  box-sizing: border-box;
}

.crt-monitor-bloom {
  width: 93%;
  height: 90%;
  background: #081008;
  border-radius: 12px;
  padding: 24px;
  border: 8px solid #1c261c;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 255, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.crt-screen {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.crt-header {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px dashed rgba(0, 255, 0, 0.3);
  padding-bottom: 10px;
  margin-bottom: 16px;
}

.crt-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #39ff14;
  box-shadow: 0 0 8px #39ff14;
  animation: crt-blink 1s infinite alternate;
}

.crt-system-label {
  font-size: 11px;
  font-weight: 700;
  color: #39ff14;
  opacity: 0.85;
}

.crt-output {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 8px;
}

.crt-output::-webkit-scrollbar {
  width: 4px;
}
.crt-output::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 0, 0.2);
  border-radius: 2px;
}

.crt-line {
  font-size: 12.5px;
  line-height: 1.5;
  color: rgba(57, 255, 20, 0.85);
  text-shadow: 0 0 4px rgba(57, 255, 20, 0.4);
  white-space: pre-wrap;
}

.crt-system-msg {
  color: #39ff14;
  font-weight: 800;
}

.crt-cmd-echo {
  color: #ffffff;
  opacity: 0.95;
}

.crt-warning-msg {
  color: #ffb700;
  text-shadow: 0 0 4px rgba(255, 183, 0, 0.4);
}

.crt-error-msg {
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255, 0, 85, 0.4);
  font-weight: 700;
}

.crt-input-row {
  display: flex;
  align-items: center;
  gap: 6px;
  border-top: 1px dashed rgba(0, 255, 0, 0.3);
  padding-top: 10px;
}

.crt-prompt {
  font-size: 13px;
  color: #39ff14;
  font-weight: 700;
}

.crt-cmd-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  color: #ffffff;
  caret-color: #39ff14;
}

.crt-flicker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 16, 16, 0.04);
  opacity: 0;
  pointer-events: none;
  z-index: 3;
  animation: crt-flicker-anim 0.15s infinite;
}

.crt-vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
  pointer-events: none;
  z-index: 4;
}

@keyframes crt-blink {
  0% { opacity: 0.2; }
  100% { opacity: 1.0; }
}

@keyframes crt-flicker-anim {
  0% { opacity: 0.27; }
  50% { opacity: 0.31; }
  100% { opacity: 0.29; }
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#040804] rounded-[24px] border border-[#00ff00]/15 overflow-hidden flex items-center justify-center font-mono" id="crt-console-container">
  <div class="w-[93%] h-[90%] bg-[#081008] rounded-[12px] p-[24px] border-[8px] border-[#1c261c] shadow-[inset_0_0_50px_rgba(0,0,0,0.9),_0_0_40px_rgba(0,255,0,0.08)] flex flex-col">
    <div class="crt-screen flex-grow flex flex-col overflow-hidden">
      <div class="flex items-center gap-[8px] border-b border-dashed border-[#00ff00]/30 pb-[10px] mb-[16px]">
        <span class="crt-status-dot w-[6px] height-[6px] rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]" style="animation: crt-blink 1s infinite alternate;"></span>
        <span class="text-[11px] font-bold text-[#39ff14] opacity-[0.85]">SNIPPETUI(TM) BIOS V1.04 - ERROR STATUS</span>
      </div>

      <div class="crt-output flex-grow overflow-y-auto mb-[12px] flex flex-col gap-[4px] pr-[8px]" id="crt-terminal-output" style="scrollbar-width: thin;">
        <div class="crt-line crt-system-msg text-[12.5px] leading-relaxed text-[#39ff14] font-black" style="text-shadow: 0 0 4px rgba(57, 255, 20, 0.4);">SYSTEM FAULT DETECTION CODE [404]</div>
        <div class="crt-line text-[12.5px] leading-relaxed text-[#39ff14]/85" style="text-shadow: 0 0 4px rgba(57, 255, 20, 0.4);">REASON: REQUESTED FILE RESOURCE NOT FOUND IN STORAGE MATRIX.</div>
        <div class="crt-line text-[12.5px] leading-relaxed text-[#39ff14]/85" style="text-shadow: 0 0 4px rgba(57, 255, 20, 0.4);">TYPE 'help' FOR AVAILABLE RECOVERY PROTOCOLS.</div>
        <br/>
      </div>

      <div class="flex items-center gap-[6px] border-t border-dashed border-[#00ff00]/30 pt-[10px]">
        <span class="text-[13px] text-[#39ff14] font-bold">SECURE-RECOVERY:\\&gt;</span>
        <input type="text" class="crt-cmd-input flex-grow bg-transparent border-none outline-none font-mono text-[13px] text-white caret-[#39ff14]" id="crt-command-input" autofocus autocomplete="off" spellcheck="false" placeholder="Type a command..." />
      </div>
    </div>
  </div>
  <div class="crt-flicker absolute top-0 left-0 w-full h-full pointer-events-none z-[3]" style="background: rgba(18, 16, 16, 0.04); animation: crt-flicker-anim 0.15s infinite;"></div>
  <div class="crt-vignette absolute top-0 left-0 w-full h-full pointer-events-none z-[4]" style="background: radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);"></div>
</div>`
};
