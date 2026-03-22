// ═══════════════════════════════════════════
//  THEME 2: DESKTOP OS
// ═══════════════════════════════════════════
const ThemeDesktop = (() => {
  let zCounter = 10;
  let dragState = null;

  const WINDOWS = {
    about: {
      title: 'About Me', icon: '👤',
      w: 480, h: 320,
      content: () => `
        <div class="win-about">
          <img src="${PROFILE.avatar}" class="win-avatar" onerror="this.style.display='none'">
          <div class="win-about-text">
            <h2>${PROFILE.name}</h2>
            <div class="role">${PROFILE.title}</div>
            <p>${PROFILE.bio}</p>
            <p style="margin-top:10px;color:rgba(255,255,255,.4);font-size:12px">📍 ${PROFILE.location}</p>
          </div>
        </div>`
    },
    skills: {
      title: 'Skills.txt', icon: '⚡',
      w: 420, h: 380,
      content: () => `
        <div style="margin-bottom:8px;font-size:12px;color:rgba(255,255,255,.3);letter-spacing:.05em">PROFICIENCY</div>
        ${PROFILE.skills.map(s => `
          <div class="skill-row">
            <span class="skill-name">${s.name}</span>
            <div class="skill-track">
              <div class="skill-fill" style="width:${s.level}%"></div>
            </div>
            <span class="skill-pct">${s.level}%</span>
          </div>`).join('')}`
    },
    projects: {
      title: 'Projects/', icon: '📁',
      w: 500, h: 420,
      content: () => PROFILE.projects.map(p => `
        <div class="proj-card" ${p.link && p.link !== '#' ? `data-link="${p.link}" style="cursor:pointer"` : ''}>
          <h3>${p.name} <span style="font-size:11px;color:rgba(255,255,255,.25);font-weight:400">${p.year}</span>${p.link && p.link !== '#' ? ` <span style="font-size:11px;color:#7c6af7;float:right">↗ 查看</span>` : ''}</h3>
          <p>${p.desc}</p>
          <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
        </div>`).join('')
    },
    timeline: {
      title: 'Timeline', icon: '📅',
      w: 420, h: 360,
      content: () => `
        <div style="margin-bottom:4px;font-size:12px;color:rgba(255,255,255,.3)">JOURNEY</div>
        ${PROFILE.timeline.map(t => `
          <div class="tl-item">
            <span class="tl-year">${t.year}</span>
            <div class="tl-dot"></div>
            <span class="tl-text">${t.event}</span>
          </div>`).join('')}`
    },
    contact: {
      title: 'Contact', icon: '✉',
      w: 360, h: 260,
      content: () => PROFILE.social.map(s => `
        <a href="${s.url}" class="contact-link" target="_blank">
          <span class="c-icon">${{github:'🐙',twitter:'🐦',email:'📧'}[s.icon]||'🔗'}</span>
          <span>${s.name}</span>
          <span style="margin-left:auto;font-size:12px;color:rgba(255,255,255,.25)">${s.url}</span>
        </a>`).join('')
    },
  };

  function render() {
    document.body.className = 'theme-desktop';
    document.getElementById('app').innerHTML = `
      <div class="desktop-bg" id="desktop">
        <div class="desktop-icons" id="desktop-icons"></div>
        <div class="desktop-dock" id="dock"></div>
      </div>`;

    buildIcons();
    buildDock();
    setTimeout(() => openWindow('about', 60, 60), 200);
    setTimeout(() => openWindow('skills', 120, 100), 400);
  }

  function buildIcons() {
    const container = document.getElementById('desktop-icons');
    Object.entries(WINDOWS).forEach(([id, cfg]) => {
      const div = document.createElement('div');
      div.className = 'desktop-icon';
      div.dataset.id = id;
      div.innerHTML = `
        <div class="icon-img" style="background:${iconBg(id)}">${cfg.icon}</div>
        <div class="icon-label">${cfg.title}</div>`;
      div.addEventListener('dblclick', () => openWindow(id));
      div.addEventListener('click', e => {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        div.classList.add('selected');
        e.stopPropagation();
      });
      container.appendChild(div);
    });
    document.getElementById('desktop').addEventListener('click', () => {
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    });
  }

  function buildDock() {
    const dock = document.getElementById('dock');
    Object.entries(WINDOWS).forEach(([id, cfg]) => {
      const item = document.createElement('div');
      item.className = 'dock-item';
      item.innerHTML = `
        <button class="dock-btn" style="background:${iconBg(id)}" title="${cfg.title}">${cfg.icon}</button>
        <span class="dock-label">${cfg.title}</span>`;
      item.querySelector('.dock-btn').addEventListener('click', () => openWindow(id));
      dock.appendChild(item);
    });
  }

  function iconBg(id) {
    const map = {
      about: 'linear-gradient(135deg,#7c6af7,#a78bfa)',
      skills: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
      projects: 'linear-gradient(135deg,#3b82f6,#60a5fa)',
      timeline: 'linear-gradient(135deg,#10b981,#34d399)',
      contact: 'linear-gradient(135deg,#ec4899,#f9a8d4)',
    };
    return map[id] || '#333';
  }

  function openWindow(id, ox, oy) {
    const desktop = document.getElementById('desktop');
    const existing = document.getElementById(`win-${id}`);
    if (existing) {
      bringToFront(existing);
      return;
    }

    const cfg = WINDOWS[id];
    const vw = desktop.offsetWidth, vh = desktop.offsetHeight;
    const x = ox ?? Math.random() * (vw - cfg.w - 100) + 100;
    const y = oy ?? Math.random() * (vh - cfg.h - 120) + 40;

    const win = document.createElement('div');
    win.className = 'os-window active';
    win.id = `win-${id}`;
    win.style.cssText = `left:${x}px;top:${y}px;width:${cfg.w}px;height:${cfg.h}px`;
    win.innerHTML = `
      <div class="window-titlebar">
        <div class="win-controls">
          <button class="win-btn close" title="Close"></button>
          <button class="win-btn min"   title="Minimize"></button>
          <button class="win-btn max"   title="Maximize"></button>
        </div>
        <span class="win-icon">${cfg.icon}</span>
        <span class="win-title">${cfg.title}</span>
      </div>
      <div class="window-body">${cfg.content()}</div>`;

    win.querySelector('.win-btn.close').onclick = () => win.remove();
    win.querySelector('.win-btn.max').onclick = () => toggleMaximize(win);
    win.querySelector('.win-btn.min').onclick = () => { win.style.display = 'none'; };

    makeDraggable(win, win.querySelector('.window-titlebar'));
    win.addEventListener('mousedown', () => bringToFront(win));
    desktop.appendChild(win);
    bringToFront(win);

    // link delegation for project cards
    win.querySelector('.window-body').addEventListener('click', e => {
      const card = e.target.closest('[data-link]');
      if (card) window.open(card.dataset.link, '_blank');
    });

    // animate skills bars
    if (id === 'skills') {
      requestAnimationFrame(() => {
        win.querySelectorAll('.skill-fill').forEach(el => {
          const w = el.style.width;
          el.style.width = '0';
          requestAnimationFrame(() => { el.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)'; el.style.width = w; });
        });
      });
    }
  }

  function bringToFront(win) {
    document.querySelectorAll('.os-window').forEach(w => w.classList.remove('active'));
    win.classList.add('active');
    win.style.zIndex = ++zCounter;
  }

  function toggleMaximize(win) {
    if (win.dataset.maximized) {
      win.style.cssText = win.dataset.prev;
      delete win.dataset.maximized;
    } else {
      win.dataset.prev = win.style.cssText;
      win.dataset.maximized = '1';
      const d = document.getElementById('desktop');
      win.style.cssText = `left:0;top:0;width:${d.offsetWidth}px;height:${d.offsetHeight - 80}px;z-index:${win.style.zIndex};border-radius:0`;
    }
  }

  function makeDraggable(win, handle) {
    handle.addEventListener('mousedown', e => {
      if (e.target.closest('.win-controls')) return;
      const rect = win.getBoundingClientRect();
      dragState = { win, ox: e.clientX - rect.left, oy: e.clientY - rect.top };
      bringToFront(win);
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!dragState || dragState.win !== win) return;
      win.style.left = (e.clientX - dragState.ox) + 'px';
      win.style.top  = (e.clientY - dragState.oy) + 'px';
    });
    document.addEventListener('mouseup', () => { if (dragState?.win === win) dragState = null; });
  }

  return { render };
})();
