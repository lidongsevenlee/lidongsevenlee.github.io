// ═══════════════════════════════════════════
//  THEME 7: BENTO GRID
// ═══════════════════════════════════════════
const ThemeBento = (() => {
  let tiltCleanups = [];
  let typewriterTimer = null;

  // Map skill category → accent colour
  const CAT_COLOR = {
    '核心': '#7c6af7',
    '框架': '#3b82f6',
    '后端': '#10b981',
    '工具': '#f59e0b',
    '进阶': '#e879f9',
  };

  function catColor(cat) {
    return CAT_COLOR[cat] || '#7c6af7';
  }

  // Build one SVG ring (percentage circle)
  function ringHTML(skill) {
    const c   = 2 * Math.PI * 15.9;   // circumference
    const off = c * (1 - skill.level / 100);
    const col = catColor(skill.category);
    const short = skill.name.split(/[\s/]/)[0]; // first word/segment
    return `
      <div class="bento-ring-item">
        <div class="bento-ring">
          <svg viewBox="0 0 36 36" class="bento-ring-svg">
            <circle cx="18" cy="18" r="15.9" fill="none"
              stroke="rgba(255,255,255,0.07)" stroke-width="2.8"/>
            <circle cx="18" cy="18" r="15.9" fill="none"
              stroke="${col}" stroke-width="2.8"
              stroke-dasharray="${c}" stroke-dashoffset="${c}"
              stroke-linecap="round"
              transform="rotate(-90 18 18)"
              class="bento-ring-arc"
              data-offset="${off}"/>
          </svg>
          <span class="bento-ring-pct">${skill.level}</span>
        </div>
        <span class="bento-ring-label">${short}</span>
      </div>`;
  }

  function render() {
    const featured    = PROFILE.projects.find(p => p.featured) || PROFILE.projects[0];
    const sideProjs   = PROFILE.projects.filter(p => p !== featured);
    const topSkills   = PROFILE.skills.slice(0, 6);
    const emailSocial = PROFILE.social.find(s => s.icon === 'email');
    const ghSocial    = PROFILE.social.find(s => s.icon === 'github');

    document.body.className = 'theme-bento';
    document.getElementById('app').innerHTML = `
      <div class="bento-wrap">

        <!-- Animated background blobs -->
        <div class="bento-blob bento-blob-a" aria-hidden="true"></div>
        <div class="bento-blob bento-blob-b" aria-hidden="true"></div>
        <div class="bento-blob bento-blob-c" aria-hidden="true"></div>

        <div class="bento-grid">

          <!-- ① HERO CARD -->
          <article class="bento-card bc-hero">
            <div class="bc-hero-body">
              <div class="bc-eyebrow">${PROFILE.location} · ${PROFILE.title}</div>
              <h1 class="bc-name" id="bento-name" aria-label="${PROFILE.name}"></h1>
              <div class="bc-badge-row">
                <span class="bc-badge bc-badge-live">
                  <span class="bc-badge-dot"></span>Available for work
                </span>
              </div>
              <p class="bc-bio">${PROFILE.bio}</p>
              <div class="bc-chip-row">
                <span class="bc-chip">Design-aware</span>
                <span class="bc-chip">Interaction Polish</span>
                <span class="bc-chip">Component Thinking</span>
              </div>
              <div class="bc-hero-actions">
                ${featured.link && featured.link !== '#'
                  ? `<a class="bc-btn bc-btn-primary" href="${featured.link}" target="_blank" rel="noreferrer">View Project ↗</a>`
                  : ''}
                ${emailSocial
                  ? `<a class="bc-btn" href="${emailSocial.url}">Say Hello →</a>`
                  : ''}
              </div>
            </div>
          </article>

          <!-- ② STATUS CARD -->
          <article class="bento-card bc-status">
            <div class="bc-card-label">Current Focus</div>
            <p class="bc-status-text">${PROFILE.focus}</p>
            <div class="bc-pill-row">
              <span class="bc-pill bc-pill-purple">React</span>
              <span class="bc-pill bc-pill-blue">TypeScript</span>
              <span class="bc-pill bc-pill-amber">Motion</span>
            </div>
          </article>

          <!-- ③ STATS CARD -->
          <article class="bento-card bc-stats">
            <div class="bc-card-label">At a glance</div>
            <div class="bc-stat-list">
              ${PROFILE.metrics.map(m => `
                <div class="bc-stat">
                  <span class="bc-stat-val">${m.value}</span>
                  <span class="bc-stat-txt">${m.label}</span>
                </div>`).join('')}
            </div>
          </article>

          <!-- ④ SKILLS CARD -->
          <article class="bento-card bc-skills">
            <div class="bc-card-label">Skills</div>
            <div class="bc-rings">
              ${topSkills.map(s => ringHTML(s)).join('')}
            </div>
          </article>

          <!-- ⑤ FEATURED PROJECT CARD -->
          <article class="bento-card bc-project${featured.link && featured.link !== '#' ? ' bc-clickable' : ''}"
            ${featured.link && featured.link !== '#' ? `data-link="${featured.link}"` : ''}>
            <div class="bc-proj-top">
              <span class="bc-card-label">Featured Project</span>
              <span class="bc-proj-year">${featured.year}</span>
            </div>
            <div class="bc-proj-name">${featured.name}</div>
            <p class="bc-proj-desc">${featured.highlight || featured.desc}</p>
            <div class="bc-tag-row">
              ${featured.tags.map(t => `<span class="bc-tag">${t}</span>`).join('')}
            </div>
            ${featured.link && featured.link !== '#'
              ? `<div class="bc-proj-cta">Open project <span class="bc-proj-arrow">↗</span></div>`
              : ''}
          </article>

          <!-- ⑥ GITHUB CARD -->
          <article class="bento-card bc-github bc-clickable"
            data-link="${ghSocial?.url || 'https://github.com/lidongsevenlee'}">
            <div class="bc-gh-icon">🐙</div>
            <div class="bc-gh-handle">${ghSocial?.display || '@lidongsevenlee'}</div>
            <div class="bc-gh-note">${ghSocial?.note || '代码、实验项目与持续迭代记录'}</div>
            <div class="bc-gh-arrow">↗</div>
          </article>

          <!-- ⑦ CONTACT CARD -->
          <article class="bento-card bc-contact bc-clickable"
            data-link="${emailSocial?.url || '#'}">
            <div class="bc-contact-inner">
              <div class="bc-card-label">Get in touch</div>
              <div class="bc-contact-cta">
                Let's build something <em class="bc-em">thoughtful</em>
              </div>
              <div class="bc-contact-email">${emailSocial?.display || 'sevenmicelid@gmail.com'}</div>
              <div class="bc-contact-arrow">→</div>
            </div>
          </article>

          <!-- ⑧ TIMELINE CARD -->
          <article class="bento-card bc-timeline">
            <div class="bc-card-label">Journey</div>
            <ol class="bc-tl-list">
              ${PROFILE.timeline.map((t, i) => `
                <li class="bc-tl-item" style="--i:${i}">
                  <span class="bc-tl-year">${t.year}</span>
                  <span class="bc-tl-dot"></span>
                  <span class="bc-tl-text">${t.event}</span>
                </li>`).join('')}
            </ol>
          </article>

          <!-- ⑨ SIDE PROJECTS CARD -->
          <article class="bento-card bc-side">
            <div class="bc-card-label">More Work</div>
            <ul class="bc-side-list">
              ${sideProjs.map(p => `
                <li class="bc-side-item${p.link && p.link !== '#' ? ' bc-clickable' : ''}"
                  ${p.link && p.link !== '#' ? `data-link="${p.link}"` : ''}>
                  <span class="bc-side-name">${p.name}</span>
                  <span class="bc-side-year">${p.year}</span>
                </li>`).join('')}
            </ul>
          </article>

        </div><!-- /.bento-grid -->
      </div><!-- /.bento-wrap -->`;

    // Wire up clickable cards
    document.querySelectorAll('.bento-wrap [data-link]').forEach(el => {
      el.addEventListener('click', () => {
        const url = el.dataset.link;
        if (url && url !== '#') window.open(url, '_blank');
      });
    });

    // Start typewriter for hero name
    typewriterAnim('bento-name', PROFILE.name, 70);

    // Animate skill rings after short delay
    setTimeout(animateRings, 400);

    // 3-D tilt on cards
    setupTilt();
  }

  // ── Typewriter ────────────────────────────
  function typewriterAnim(id, text, speed) {
    const el = document.getElementById(id);
    if (!el) return;
    let i = 0;
    function tick() {
      el.textContent = text.slice(0, i) + (i < text.length ? '▎' : '');
      if (i <= text.length) {
        i++;
        typewriterTimer = setTimeout(tick, speed);
      }
    }
    tick();
  }

  // ── SVG ring animation ────────────────────
  function animateRings() {
    document.querySelectorAll('.bento-ring-arc').forEach(arc => {
      const target = parseFloat(arc.dataset.offset);
      arc.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)';
      arc.style.strokeDashoffset = target;
    });
  }

  // ── 3-D tilt hover ────────────────────────
  function setupTilt() {
    document.querySelectorAll('.bento-card').forEach(card => {
      function onMove(e) {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        card.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateZ(6px)`;
      }
      function onLeave() {
        card.style.transform = '';
      }
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      tiltCleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  // ── Destroy ───────────────────────────────
  function destroy() {
    if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null; }
    tiltCleanups.forEach(fn => fn());
    tiltCleanups = [];
  }

  return { render, destroy };
})();
