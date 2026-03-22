// ═══════════════════════════════════════════
//  THEME 4: MINIMAL
// ═══════════════════════════════════════════
const ThemeMinimal = (() => {
  let animId = null;
  let particles = [];

  function render() {
    document.body.className = 'theme-minimal';
    document.getElementById('app').innerHTML = `
      <div class="minimal-wrap">
        <canvas id="minimal-canvas"></canvas>
        <div class="minimal-content" id="minimal-home">
          <div class="minimal-eyebrow">${PROFILE.location} · Frontend Developer</div>
          <div class="minimal-name">${PROFILE.name.split(' ')[0]}<br>${PROFILE.name.split(' ').slice(1).join(' ') || ''}</div>
          <div class="minimal-role"><span class="hl">${PROFILE.title}</span> · ${PROFILE.subtitle.split('·').slice(1).join('·')}</div>
          <nav class="minimal-nav">
            <button class="minimal-nav-btn" data-panel="work">Work</button>
            <button class="minimal-nav-btn" data-panel="skills">Skills</button>
            <button class="minimal-nav-btn" data-panel="about">About</button>
            <button class="minimal-nav-btn" data-panel="contact">Contact</button>
          </nav>
        </div>

        <!-- Panels -->
        <div class="minimal-panel" id="mp-work">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">Work</div>
            <div class="mp-grid-2">
              ${PROFILE.projects.map(p => `
                <div class="mp-card" ${p.link && p.link !== '#' ? `data-link="${p.link}" style="cursor:pointer"` : ''}>
                  <h3>${p.name} <span style="font-size:11px;color:rgba(255,255,255,.2)">${p.year}</span>${p.link && p.link !== '#' ? `<span style="float:right;font-size:11px;color:rgba(255,255,255,.3)">↗</span>` : ''}</h3>
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
            <div class="mp-skill-list">
              ${PROFILE.skills.map(s => `
                <div class="mp-skill-item">
                  <div class="mp-skill-name">${s.name}</div>
                  <div class="mp-skill-bar">
                    <div class="mp-skill-fill" style="width:0%" data-level="${s.level}%"></div>
                  </div>
                  <div style="font-size:12px;color:rgba(255,255,255,.2);width:32px;text-align:right">${s.level}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <div class="minimal-panel" id="mp-about">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">About</div>
            <div style="max-width:520px">
              <p style="font-size:18px;color:rgba(255,255,255,.65);line-height:1.8;margin-bottom:32px">${PROFILE.bio}</p>
              <div style="display:flex;flex-direction:column;gap:12px">
                ${PROFILE.timeline.map(t => `
                  <div style="display:flex;gap:24px;font-size:14px">
                    <span style="color:rgba(255,255,255,.2);font-weight:600;width:40px;flex-shrink:0">${t.year}</span>
                    <span style="color:rgba(255,255,255,.5)">${t.event}</span>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="minimal-panel" id="mp-contact">
          <button class="mp-close">×</button>
          <div class="mp-inner">
            <div class="mp-title">Contact</div>
            <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
              ${PROFILE.social.map(s => `
                <a href="${s.url}" target="_blank" style="display:flex;align-items:center;gap:16px;color:rgba(255,255,255,.5);text-decoration:none;font-size:16px;transition:color .2s"
                   onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'">
                  <span style="font-size:22px">${{github:'🐙',twitter:'🐦',email:'📧'}[s.icon]||'🔗'}</span>
                  <span>${s.name}</span>
                  <span style="margin-left:auto;font-size:12px;opacity:.4">${s.url}</span>
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
    particles = Array.from({ length: 80 }, () => ({
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
