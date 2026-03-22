// ═══════════════════════════════════════════
//  THEME 1: TERMINAL
// ═══════════════════════════════════════════
const ThemeTerminal = (() => {
  let history = [];
  let histIdx = -1;

  const COMMANDS = {
    help: () => [
      { cls: 'green bold', text: '  Available commands:' },
      { cls: 'cyan',  text: '  whoami       — 关于我' },
      { cls: 'cyan',  text: '  skills       — 技能树' },
      { cls: 'cyan',  text: '  ls projects  — 项目列表' },
      { cls: 'cyan',  text: '  timeline     — 成长历程' },
      { cls: 'cyan',  text: '  contact      — 联系方式' },
      { cls: 'cyan',  text: '  clear        — 清屏' },
      { cls: 'dim',   text: '  tip: 按 ↑↓ 翻历史记录' },
    ],

    whoami: () => {
      const lines = [
        { cls: 'green', text: ASCII_ART },
        { cls: 'white bold', text: `  ${PROFILE.name}  //  ${PROFILE.alias}` },
        { cls: 'dim', text: `  ─────────────────────────────────────────` },
        { cls: 'yellow', text: `  role    : ${PROFILE.title}` },
        { cls: 'yellow', text: `  motto   : ${PROFILE.subtitle}` },
        { cls: 'yellow', text: `  from    : ${PROFILE.location}` },
        { cls: 'dim', text: `` },
        { cls: 'output', text: `  ${PROFILE.bio}` },
      ];
      return lines;
    },

    skills: () => {
      const lines = [{ cls: 'green bold', text: '  [ SKILL TREE ]' }];
      const cats = [...new Set(PROFILE.skills.map(s => s.category))];
      cats.forEach(cat => {
        lines.push({ cls: 'yellow', text: `\n  ── ${cat} ──` });
        PROFILE.skills.filter(s => s.category === cat).forEach(s => {
          const filled = Math.round(s.level / 10);
          const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
          lines.push({
            cls: 'output',
            html: `<span class="term-bar-wrap">
              <span class="term-bar-label">&nbsp;&nbsp;${s.name}</span>
              <span style="color:#00ff41;letter-spacing:1px">${bar}</span>
              <span class="term-bar-pct">${s.level}%</span>
            </span>`
          });
        });
      });
      return lines;
    },

    'ls projects': () => {
      const lines = [{ cls: 'green bold', text: '  [ PROJECTS ]' }];
      PROFILE.projects.forEach((p, i) => {
        const hasLink = p.link && p.link !== '#';
        lines.push({
          cls: 'white bold',
          html: hasLink
            ? `\n&nbsp;&nbsp;<span style="color:#555">${String(i+1).padStart(2,'0')}.</span> <a href="${p.link}" target="_blank" style="color:#fff;text-decoration:none" onmouseover="this.style.color='#00ff41'" onmouseout="this.style.color='#fff'">${p.name}</a>  <span style="color:#555">[${p.year}]</span> <span style="color:#7c6af7;font-size:11px">↗</span>`
            : `\n&nbsp;&nbsp;<span style="color:#555">${String(i+1).padStart(2,'0')}.</span> ${p.name}  <span style="color:#555">[${p.year}]</span>`
        });
        lines.push({ cls: 'output', text: `      ${p.desc}` });
        lines.push({
          cls: 'output',
          html: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${p.tags.map(t => `<span class="term-tag" style="color:#7ec8e3;border-color:#7ec8e3">${t}</span>`).join(' ')}`
        });
      });
      return lines;
    },

    timeline: () => {
      const lines = [{ cls: 'green bold', text: '  [ TIMELINE ]' }];
      PROFILE.timeline.forEach(t => {
        lines.push({ cls: 'output', html: `&nbsp;&nbsp;<span style="color:#ffbd2e;font-weight:bold">${t.year}</span> &nbsp;── &nbsp;${t.event}` });
      });
      return lines;
    },

    contact: () => [
      { cls: 'green bold', text: '  [ CONTACT ]' },
      ...PROFILE.social.map(s => ({
        cls: 'output',
        html: `&nbsp;&nbsp;<span class="term-tag" style="color:#a3e4a0;border-color:#a3e4a0">${s.name}</span> &nbsp;<a href="${s.url}" style="color:#7ec8e3;text-decoration:none">${s.url}</a>`
      }))
    ],

    clear: () => 'CLEAR',
  };

  const ASCII_ART = `
  #
  #        ###         #####   #####   ####
  #       #   #  #  # #     # #     # #   #
  #       #   #  #  # #     # #     # #   #
  #       #   #  #  # #     # #     # ####
  #       #   #  #  # #     # #     # #   #
  #       #   #  #  # #     # #     # #   #
  #######  ###    ##   #####   #####  #   # `;

  function render() {
    document.body.className = 'theme-terminal';
    document.getElementById('app').innerHTML = `
      <div class="terminal-wrap">
        <div class="terminal-header">
          <span class="term-dot r"></span>
          <span class="term-dot y"></span>
          <span class="term-dot g"></span>
          <span class="terminal-title-bar">${PROFILE.alias} — bash</span>
        </div>
        <div class="terminal-body" id="term-body"></div>
        <div class="term-help-hint">type <span style="color:#00ff41">help</span> for available commands</div>
        <div class="terminal-input-row">
          <span class="term-input-prompt">
            <span class="user">${PROFILE.alias}</span><span class="at">@</span><span class="host">github</span><span style="color:#555">:</span><span class="path">~</span><span class="dollar">$ </span>
          </span>
          <input type="text" id="term-input" autocomplete="off" spellcheck="false" autofocus />
        </div>
      </div>`;

    printWelcome();
    setupInput();
  }

  function printWelcome() {
    const body = document.getElementById('term-body');
    const welcome = [
      { cls: 'green', text: `  +--------------------------------------------------+` },
      { cls: 'green', html: `  |  <span style="color:#fff;font-weight:bold">${PROFILE.name}</span>  //  <span style="color:#7ec8e3">${PROFILE.alias}</span>` },
      { cls: 'green', html: `  |  <span style="color:#ffbd2e">${PROFILE.title}</span>  ·  <span style="color:#555">${PROFILE.location}</span>` },
      { cls: 'green', text: `  +--------------------------------------------------+` },
      { cls: 'dim',  text: `` },
      { cls: 'dim',  text: `` },
      { cls: 'output', html: `&nbsp;&nbsp;Type <span style="color:#00ff41">help</span> to get started.` },
      { cls: 'dim',  text: '' },
    ];
    welcome.forEach(l => appendLine(body, l));
  }

  function appendLine(body, line) {
    const el = document.createElement('div');
    el.className = `term-line term-output ${line.cls || ''}`;
    if (line.html) {
      el.innerHTML = line.html;
    } else {
      el.textContent = line.text || '';
    }
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function appendPrompt(body, cmd) {
    const el = document.createElement('div');
    el.className = 'term-line term-prompt';
    el.innerHTML = `<span class="user">${PROFILE.alias}</span><span class="at">@</span><span class="host">github</span><span style="color:#555">:</span><span class="path">~</span><span class="dollar">$ </span><span style="color:#fff">${cmd}</span>`;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function runCommand(raw) {
    const body = document.getElementById('term-body');
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(raw);
    histIdx = -1;
    appendPrompt(body, raw);

    let handler = COMMANDS[cmd];
    if (!handler) {
      // partial match
      const keys = Object.keys(COMMANDS);
      const match = keys.find(k => k.startsWith(cmd));
      if (match) handler = COMMANDS[match];
    }

    if (!handler) {
      appendLine(body, { cls: 'err', text: `  command not found: ${cmd}. Try 'help'.` });
      return;
    }

    const result = handler();
    if (result === 'CLEAR') {
      body.innerHTML = '';
      return;
    }

    result.forEach((line, i) => {
      setTimeout(() => {
        if (document.getElementById('term-body')) appendLine(body, line);
      }, i * 18);
    });
  }

  function setupInput() {
    const input = document.getElementById('term-input');
    if (!input) return;
    input.focus();
    document.getElementById('term-body').addEventListener('click', () => input.focus());

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        runCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
        else { histIdx = -1; input.value = ''; }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.value.toLowerCase();
        const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
        if (match) input.value = match;
      }
    });
  }

  return { render };
})();
