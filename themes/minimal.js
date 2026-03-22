// ═══════════════════════════════════════════
//  THEME 4: MINIMAL
// ═══════════════════════════════════════════
const ThemeMinimal = (() => {
  let animId = null;
  let particles = [];
  const socialIcon = { github: '🐙', twitter: '🐦', email: '📧' };

  function render() {
    document.body.className = 'theme-minimal';
    document.getElementById('app').innerHTML = `
      <div class="minimal-wrap">
        <canvas id="minimal-canvas"></canvas>
        <div class="minimal-content" id="minimal-home">
          <div class="minimal-eyebrow">${PROFILE.location} · Frontend Developer</div>
          <div class="minimal-name">${PROFILE.name.split(' ')[0]}<br>${PROFILE.name.split(' ').slice(1).join(' ') || ''}</div>
          <div class="minimal-role"><span class="hl">${PROFILE.title}</span> · ${PROFILE.subtitle.split('·').slice(1).join('·')}</div>
          <div class="minimal-metrics">
            ${PROFILE.metrics.map(metric => `
              <div class="minimal-metric">
                <strong>${metric.value}</strong>
                <span>${metric.label}</span>
              </div>`).join('')}
          </div>
          <nav class="minimal-nav">
            <button class="minimal-nav-btn" data-panel="work">Work</button>
            <button class="minimal-nav-btn" data-panel="skills">Skills</button>
            <button class="minimal-nav-btn" data-panel="about">About</button>
            <button class="minimal-nav-btn" data-panel="contact">Contact</button>
          </nav>
          <p class="minimal-footer-note">${PROFILE.status}</p>
        </div>

        <!-- Panels -->
        <div class="minimal-panel" id="mp-work">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">Work</div>
            <p class="mp-panel-intro">我更喜欢把项目理解成“体验假设 + 结构选择 + 交付细节”的组合，而不只是把页面拼完。</p>
            <div class="mp-grid-2">
              ${PROFILE.projects.map(p => `
                <div class="mp-card" ${p.link && p.link !== '#' ? `data-link="${p.link}"` : ''}>
                  <h3>${p.name} <span class="project-year">${p.year}</span>${p.link && p.link !== '#' ? `<span class="project-link">↗</span>` : ''}</h3>
                  <p>${p.desc}</p>
                  <div class="mp-tags">${p.tags.map(t=>`<span class="mp-tag">${t}</span>`).join('')}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <div class="minimal-panel" id="mp-skills">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">Skills</div>
            <p class="mp-panel-intro">以下不是“会不会”，而是我最常用、最愿意继续打磨的前端工作语言。</p>
            <div class="mp-skill-list">
              ${PROFILE.skills.map(s => `
                <div class="mp-skill-item">
                  <div class="mp-skill-name">${s.name}</div>
                  <div class="mp-skill-bar">
                    <div class="mp-skill-fill" data-level="${s.level}%"></div>
                  </div>
                  <div class="mp-skill-level">${s.level}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <div class="minimal-panel" id="mp-about">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">About</div>
            <div class="mp-about-copy">
              <p>${PROFILE.bio}</p>
              <div class="mp-timeline">
                ${PROFILE.timeline.map(t => `
                  <div class="mp-timeline-item">
                    <span class="mp-timeline-year">${t.year}</span>
                    <span class="mp-timeline-text">${t.event}</span>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="minimal-panel" id="mp-contact">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">Contact</div>
            <p class="mp-panel-intro">${PROFILE.focus}</p>
            <div class="mp-contact-list">
              ${PROFILE.social.map(s => `
                <a href="${s.url}" target="_blank" class="mp-contact-link">
                  <span class="mp-contact-icon">${socialIcon[s.icon]||'🔗'}</span>
                  <span>${s.name}</span>
                  <span class="mp-contact-copy">${s.display || s.url.replace('mailto:', '')}</span>
                </a>`).join('')}
            </div>
          </div>
        </div>
      </div>`;

    document.getElementById('app').addEventListener('click', e => {
      const card = e.target.closest('[data-link]');
      if (card) window.open(card.dataset.link, '_blank');
    });
    initParticles();
    setupNav();
  }

  function setupNav() {
    document.querySelectorAll('.minimal-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = document.getElementById(`mp-${btn.dataset.panel}`);
        if (panel) {
          openPanel(panel);
          if (btn.dataset.panel === 'skills') animateSkills(panel);
        }
      });
    });
    document.querySelectorAll('.mp-close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.minimal-panel').classList.remove('active');
      });
    });
    document.querySelectorAll('.minimal-panel').forEach(panel => {
      panel.addEventListener('click', e => {
        if (e.target === panel) panel.classList.remove('active');
      });
    });
  }

  function openPanel(panel) {
    document.querySelectorAll('.minimal-panel').forEach(p => p.classList.remove('active'));
    panel.classList.add('active');
  }

  function animateSkills(panel) {
    setTimeout(() => {
      panel.querySelectorAll('.mp-skill-fill').forEach(el => {
        el.style.width = el.dataset.level;
      });
    }, 100);
  }

  function initParticles() {
    const canvas = document.getElementById('minimal-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    particles = Array.from({ length: 96 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.5 + .5,
      alpha: Math.random() * .4 + .1,
    }));

    let mouse = { x: -999, y: -999 };
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    function loop() {
      animId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * .8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= .98; p.vy *= .98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1-d/100)*.08})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
    }
    loop();
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    particles = [];
  }

  return { render, destroy };
})();
