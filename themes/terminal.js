// ═══════════════════════════════════════════
//  THEME 1: TERMINAL
// ═══════════════════════════════════════════
const ThemeTerminal = (() => {
  let history = [];
  let histIdx = -1;
  const mail = PROFILE.social.find(item => item.icon === 'email');
  const github = PROFILE.social.find(item => item.icon === 'github');

  function promptPrefix() {
    return `<span class="user">${PROFILE.alias}</span><span class="at">@</span><span class="host">portfolio</span><span class="term-prompt-sep">:</span><span class="path">~</span><span class="dollar">$ </span>`;
  }

  const COMMANDS = {
    help: () => [
      { cls: 'green bold', text: '  Available commands:' },
      { cls: 'cyan',  text: '  whoami         — 关于我' },
      { cls: 'cyan',  text: '  status         — 当前状态 / 关注方向' },
      { cls: 'cyan',  text: '  skills         — 技能树' },
      { cls: 'cyan',  text: '  ls projects    — 项目列表' },
      { cls: 'cyan',  text: '  timeline       — 成长历程' },
      { cls: 'cyan',  text: '  contact        — 联系方式' },
      { cls: 'cyan',  text: '  open github    — 打开 GitHub' },
      { cls: 'cyan',  text: '  open email     — 发邮件' },
      { cls: 'cyan',  text: '  clear          — 清屏' },
      { cls: 'dim',   text: '  tip: 按 ↑↓ 翻历史记录，按 Tab 自动补全' },
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
        { cls: 'dim', text: `` },
        { cls: 'output', text: `  focus   : ${PROFILE.focus}` },
      ];
      return lines;
    },

    status: () => [
      { cls: 'green bold', text: '  [ STATUS ]' },
      { cls: 'output', text: `  ${PROFILE.status}` },
      { cls: 'dim', text: '' },
      ...PROFILE.metrics.map(metric => ({
        cls: 'output',
        html: `&nbsp;&nbsp;<span class="term-tag term-tag-accent">${metric.value}</span> ${metric.label}`
      }))
    ],

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
              <span class="term-meter">${bar}</span>
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
            ? `\n&nbsp;&nbsp;<span class="term-index">${String(i+1).padStart(2,'0')}.</span> <a href="${p.link}" target="_blank" rel="noreferrer" class="term-link">${p.name}</a> <span class="term-inline-year">[${p.year}]</span> <span class="term-inline-link">↗</span>`
            : `\n&nbsp;&nbsp;<span class="term-index">${String(i+1).padStart(2,'0')}.</span> ${p.name} <span class="term-inline-year">[${p.year}]</span>`
        });
        lines.push({ cls: 'output', text: `      ${p.desc}` });
        lines.push({
          cls: 'output',
          html: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${p.tags.map(t => `<span class="term-tag term-tag-info">${t}</span>`).join(' ')}`
        });
        if (p.highlight) {
          lines.push({ cls: 'dim', text: `      note: ${p.highlight}` });
        }
      });
      return lines;
    },

    timeline: () => {
      const lines = [{ cls: 'green bold', text: '  [ TIMELINE ]' }];
      PROFILE.timeline.forEach(t => {
        lines.push({ cls: 'output', html: `&nbsp;&nbsp;<span class="term-timeline-year">${t.year}</span> &nbsp;── &nbsp;${t.event}` });
      });
      return lines;
    },

    contact: () => [
      { cls: 'green bold', text: '  [ CONTACT ]' },
      ...PROFILE.social.map(s => ({
        cls: 'output',
        html: `&nbsp;&nbsp;<span class="term-tag term-tag-accent">${s.name}</span> &nbsp;<a href="${s.url}" target="_blank" rel="noreferrer" class="term-link">${s.display || s.url.replace('mailto:', '')}</a>`
      }))
    ],

    'open github': () => {
      if (github?.url) window.open(github.url, '_blank', 'noopener');
      return [{ cls: 'output', text: `  opening ${github?.display || github?.url || 'GitHub'} ...` }];
    },

    'open email': () => {
      if (mail?.url) window.open(mail.url, '_blank', 'noopener');
      return [{ cls: 'output', text: `  opening ${mail?.display || mail?.url || 'email'} ...` }];
    },

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
        <div class="term-help-hint">type <span class="term-inline-command">help</span> for commands, <span class="term-inline-command">status</span> for the quick overview</div>
        <div class="terminal-input-row">
          <span class="term-input-prompt">
            ${promptPrefix()}
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
      { cls: 'green', html: `  |  <span class="term-white-strong">${PROFILE.name}</span>  //  <span class="term-cyan">${PROFILE.alias}</span>` },
      { cls: 'green', html: `  |  <span class="term-warm">${PROFILE.title}</span>  ·  <span class="term-soft">${PROFILE.location}</span>` },
      { cls: 'green', text: `  +--------------------------------------------------+` },
      { cls: 'dim',  text: `` },
      { cls: 'output', html: `&nbsp;&nbsp;Type <span class="term-inline-command">help</span> to get started or jump straight to <span class="term-inline-command">ls projects</span>.` },
      { cls: 'output', html: `&nbsp;&nbsp;Quick actions: <span class="term-tag term-tag-info">status</span><span class="term-tag term-tag-info">contact</span><span class="term-tag term-tag-info">open github</span>` },
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
    el.innerHTML = `${promptPrefix()}<span class="term-command">${cmd}</span>`;
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
