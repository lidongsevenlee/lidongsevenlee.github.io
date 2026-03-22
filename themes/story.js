// ═══════════════════════════════════════════
//  THEME 3: STORY / NARRATIVE
// ═══════════════════════════════════════════
const ThemeStory = (() => {

  function render() {
    document.body.className = 'theme-story';
    document.getElementById('app').innerHTML = `
      <div class="story-wrap" id="story-wrap">

        <!-- Chapter 0: Hero -->
        <section class="story-chapter" id="ch-0">
          <div class="chapter-number">Chapter 00</div>
          <h1 class="chapter-title">
            I'm <span class="accent">${PROFILE.name}</span>
          </h1>
          <p class="chapter-subtitle">${PROFILE.subtitle}</p>
          <div class="story-divider"></div>
          <p style="color:rgba(255,255,255,.4);font-size:15px;text-align:center;max-width:480px;line-height:1.7">${PROFILE.bio}</p>
          <div class="story-scroll-hint">
            <span>SCROLL</span>
            <span class="arrow">↓</span>
          </div>
        </section>

        <!-- Chapter 1: Timeline -->
        <section class="story-chapter" id="ch-1">
          <div class="chapter-number">Chapter 01</div>
          <h2 class="chapter-title">The <span class="accent">Journey</span></h2>
          <div class="story-divider"></div>
          <div class="story-timeline">
            ${PROFILE.timeline.map(t => `
              <div class="stl-item">
                <div class="stl-year">${t.year}</div>
                <div class="stl-line"></div>
                <div class="stl-content">${t.event}</div>
              </div>`).join('')}
          </div>
        </section>

        <!-- Chapter 2: Skills -->
        <section class="story-chapter" id="ch-2">
          <div class="chapter-number">Chapter 02</div>
          <h2 class="chapter-title">The <span class="accent">Craft</span></h2>
          <div class="story-divider"></div>
          <div class="story-skills-grid">
            ${PROFILE.skills.map(s => `
              <div class="ssk-item">
                <div class="ssk-name">${s.name}</div>
                <div class="ssk-bar">
                  <div class="ssk-fill" style="--level:${s.level}%" data-level="${s.level}"></div>
                </div>
              </div>`).join('')}
          </div>
        </section>

        <!-- Chapter 3: Projects -->
        <section class="story-chapter" id="ch-3">
          <div class="chapter-number">Chapter 03</div>
          <h2 class="chapter-title">The <span class="accent">Work</span></h2>
          <div class="story-divider"></div>
          <div class="story-projects-grid">
            ${PROFILE.projects.map(p => `
              <div class="spr-card" ${p.link && p.link !== '#' ? `data-link="${p.link}" style="cursor:pointer"` : ''}>
                <div class="spr-year">${p.year}${p.link && p.link !== '#' ? ` <span style="float:right;color:#7c6af7;font-size:12px">↗ 查看</span>` : ''}</div>
                <div class="spr-name">${p.name}</div>
                <div class="spr-desc">${p.desc}</div>
                <div class="spr-tags">${p.tags.map(t => `<span class="spr-tag">${t}</span>`).join('')}</div>
              </div>`).join('')}
          </div>
        </section>

        <!-- Chapter 4: Contact -->
        <section class="story-chapter" id="ch-4">
          <div class="chapter-number">Chapter 04</div>
          <h2 class="chapter-title">Let's <span class="accent">Connect</span></h2>
          <div class="story-divider"></div>
          <p class="chapter-subtitle" style="font-size:16px">Have a project in mind? Want to chat? I'm all ears.</p>
          <div class="story-contact-links">
            ${PROFILE.social.map(s => `
              <a href="${s.url}" class="scl-btn" target="_blank">
                ${{ github:'🐙', twitter:'🐦', email:'📧' }[s.icon] || '🔗'}
                ${s.name}
              </a>`).join('')}
          </div>
        </section>
      </div>`;

    document.getElementById('story-wrap').addEventListener('click', e => {
      const card = e.target.closest('[data-link]');
      if (card) window.open(card.dataset.link, '_blank');
    });
    setupObserver();
    // Trigger first chapter immediately
    setTimeout(() => {
      const first = document.getElementById('ch-0');
      if (first) first.classList.add('visible');
    }, 100);
  }

  function setupObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animate skill bars when chapter 2 becomes visible
          if (entry.target.id === 'ch-2') {
            entry.target.querySelectorAll('.ssk-fill').forEach(el => {
              el.style.width = el.dataset.level + '%';
            });
          }
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.story-chapter').forEach(ch => observer.observe(ch));
  }

  return { render };
})();
