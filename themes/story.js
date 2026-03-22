// ═══════════════════════════════════════════
//  THEME 3: STORY / NARRATIVE
// ═══════════════════════════════════════════
const ThemeStory = (() => {
  function socialIcon(icon) {
    return { github: '🐙', twitter: '🐦', email: '📧' }[icon] || '🔗';
  }

  function featuredProject() {
    return PROFILE.projects.find(project => project.featured) || PROFILE.projects[0];
  }

  function render() {
    const featured = featuredProject();
    const sideProjects = PROFILE.projects.filter(project => project !== featured);

    document.body.className = 'theme-story';
    document.getElementById('app').innerHTML = `
      <div class="story-wrap" id="story-wrap">

        <!-- Chapter 0: Hero -->
        <section class="story-chapter" id="ch-0">
          <div class="story-shell story-hero">
            <div>
              <div class="chapter-number">Chapter 00</div>
              <div class="story-eyebrow">${PROFILE.location} · ${PROFILE.title}</div>
              <h1 class="chapter-title">
                Building interfaces with
                <span class="accent">clarity, motion, and character.</span>
              </h1>
              <p class="chapter-subtitle">${PROFILE.subtitle}</p>
              <div class="story-divider"></div>
              <p class="story-bio">${PROFILE.bio}</p>
              <div class="story-chip-row">
                <span class="story-chip">Design-aware frontend</span>
                <span class="story-chip">Interaction polish</span>
                <span class="story-chip">Component thinking</span>
              </div>
              <div class="story-action-row">
                <a class="hero-action primary" href="#ch-3">View selected work</a>
                <a class="hero-action" href="${PROFILE.social.find(item => item.icon === 'email')?.url || '#'}">Start a conversation</a>
              </div>
            </div>
            <div class="story-meta-grid">
              ${PROFILE.metrics.map(metric => `
                <div class="story-stat">
                  <strong>${metric.value}</strong>
                  <span>${metric.label}</span>
                </div>`).join('')}
              <div class="story-meta-card">
                <div class="story-meta-label">Working Style</div>
                <p>${PROFILE.summary}</p>
              </div>
              <div class="story-meta-card">
                <div class="story-meta-label">Current Focus</div>
                <p>${PROFILE.focus}</p>
              </div>
            </div>
          </div>
          <div class="story-scroll-hint">
            <span>SCROLL</span>
            <span class="arrow">↓</span>
          </div>
        </section>

        <!-- Chapter 1: Timeline -->
        <section class="story-chapter" id="ch-1">
          <div class="story-shell">
            <div class="chapter-number">Chapter 01</div>
            <h2 class="chapter-title">A gradual move from <span class="accent">implementation to experience shaping</span></h2>
            <div class="story-divider"></div>
            <p class="chapter-subtitle">我对前端的兴趣，慢慢从“把页面写出来”转向“如何让界面更清晰、更顺手、更有记忆点”。</p>
            <div class="story-timeline">
              ${PROFILE.timeline.map(t => `
                <div class="stl-item">
                  <div class="stl-year">${t.year}</div>
                  <div class="stl-line"></div>
                  <div class="stl-content">${t.event}</div>
                </div>`).join('')}
            </div>
          </div>
        </section>

        <!-- Chapter 2: Skills -->
        <section class="story-chapter" id="ch-2">
          <div class="story-shell">
            <div class="chapter-number">Chapter 02</div>
            <h2 class="chapter-title">The craft behind <span class="accent">interface quality</span></h2>
            <div class="story-divider"></div>
            <div class="story-skills-layout">
              <div class="story-skills-intro">
                <p>${PROFILE.summary}</p>
                <p class="chapter-subtitle">${PROFILE.status}</p>
              </div>
              <div class="story-skills-grid">
                ${PROFILE.skills.map(s => `
                  <div class="ssk-item">
                    <div class="ssk-top">
                      <div class="ssk-name">${s.name}</div>
                      <div class="ssk-meta">${s.category} · ${s.level}%</div>
                    </div>
                    <div class="ssk-bar">
                      <div class="ssk-fill" data-level="${s.level}"></div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Chapter 3: Projects -->
        <section class="story-chapter" id="ch-3">
          <div class="story-shell">
            <div class="chapter-number">Chapter 03</div>
            <h2 class="chapter-title">Selected work with a <span class="accent">clear product point of view</span></h2>
            <div class="story-divider"></div>
            <div class="story-projects-grid">
              <div class="spr-card featured" ${featured.link && featured.link !== '#' ? `data-link="${featured.link}"` : ''}>
                <div>
                  <div class="spr-meta">
                    <span>${featured.year} · Featured project</span>
                    ${featured.link && featured.link !== '#' ? '<span class="project-link">Open project ↗</span>' : ''}
                  </div>
                  <div class="spr-name">${featured.name}</div>
                  <div class="spr-desc">${featured.desc}</div>
                  <div class="spr-tags">${featured.tags.map(t => `<span class="spr-tag">${t}</span>`).join('')}</div>
                </div>
                <div class="story-feature-side">
                  <div>
                    <div class="story-meta-label">Why it matters</div>
                    <p>${featured.highlight || featured.desc}</p>
                  </div>
                  ${featured.link && featured.link !== '#'
                    ? `<a class="story-feature-link" href="${featured.link}" target="_blank" rel="noreferrer">Visit live project <span>↗</span></a>`
                    : ''}
                </div>
              </div>
              ${sideProjects.map(p => `
                <div class="spr-card" ${p.link && p.link !== '#' ? `data-link="${p.link}"` : ''}>
                  <div class="spr-meta">
                    <span>${p.year}</span>
                    ${p.link && p.link !== '#' ? '<span class="project-link">Open ↗</span>' : ''}
                  </div>
                  <div class="spr-name">${p.name}</div>
                  <div class="spr-desc">${p.desc}</div>
                  <div class="spr-tags">${p.tags.map(t => `<span class="spr-tag">${t}</span>`).join('')}</div>
                </div>`).join('')}
            </div>
          </div>
        </section>

        <!-- Chapter 4: Contact -->
        <section class="story-chapter" id="ch-4">
          <div class="story-shell">
            <div class="chapter-number">Chapter 04</div>
            <h2 class="chapter-title">Let's build something <span class="accent">thoughtful</span></h2>
            <div class="story-divider"></div>
            <p class="chapter-subtitle">适合聊工作机会、前端合作、设计驱动型项目，或者任何你想认真打磨体验的产品。</p>
            <div class="story-contact-grid">
              ${PROFILE.social.map(s => `
                <a href="${s.url}" class="scl-card" target="_blank" rel="noreferrer">
                  <div class="scl-head">
                    <span class="scl-icon">${socialIcon(s.icon)}</span>
                    <span>${s.name}</span>
                  </div>
                  <div class="scl-value">${s.display || s.url}</div>
                  <div class="scl-note">${s.note || ''}</div>
                </a>`).join('')}
            </div>
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
