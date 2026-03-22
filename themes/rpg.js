// ═══════════════════════════════════════════
//  THEME 5: RPG CHARACTER CARD
// ═══════════════════════════════════════════
const ThemeRpg = (() => {

  const RARITY_COLORS = {
    95: '#f59e0b',  // legendary
    85: '#a78bfa',  // epic
    70: '#3b82f6',  // rare
    0:  '#6b7280',  // common
  };

  function rarityColor(level) {
    const thresholds = [95, 85, 70, 0];
    for (const t of thresholds) {
      if (level >= t) return RARITY_COLORS[t];
    }
    return RARITY_COLORS[0];
  }

  function statDiamonds(val, max = 10) {
    const filled = Math.round(val / 10);
    return Array.from({ length: max }, (_, i) =>
      `<div class="stat-diamond${i < filled ? ' lit' : ''}"></div>`
    ).join('');
  }

  function render() {
    document.body.className = 'theme-rpg';
    const rpg = PROFILE.rpg;

    document.getElementById('app').innerHTML = `
      <div class="rpg-wrap">
        <div class="rpg-header">
          <div class="rpg-class-badge">⚔ ${rpg.class}</div>
          <div class="rpg-name">${PROFILE.name}</div>
          <div class="rpg-level">LV.${rpg.level} — ${PROFILE.title}</div>
        </div>

        <div class="rpg-layout">
          <!-- Left column -->
          <div style="display:flex;flex-direction:column;gap:20px">

            <!-- Vitals -->
            <div class="rpg-card">
              <div class="rpg-card-title">⚡ Vitals</div>
              <div class="rpg-vitals">
                <div class="vital-row">
                  <span class="vital-label">HP</span>
                  <div class="vital-track">
                    <div class="vital-fill hp" style="width:0%" data-w="${rpg.hp}%"></div>
                  </div>
                  <span class="vital-val">${rpg.hp}/100</span>
                </div>
                <div class="vital-row">
                  <span class="vital-label">MP</span>
                  <div class="vital-track">
                    <div class="vital-fill mp" style="width:0%" data-w="${rpg.mp}%"></div>
                  </div>
                  <span class="vital-val">${rpg.mp}/100</span>
                </div>
              </div>

              <!-- Stats -->
              <div class="rpg-card-title" style="margin-top:16px">◈ Attributes</div>
              <div class="rpg-stats">
                ${Object.entries(rpg.stats).map(([name, val]) => `
                  <div class="stat-row">
                    <span class="stat-name">${name}</span>
                    <div class="stat-diamonds">${statDiamonds(val)}</div>
                    <span class="stat-val">${val}</span>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Achievements -->
            <div class="rpg-card">
              <div class="rpg-card-title">🏆 Achievements</div>
              <div class="rpg-achievements">
                ${rpg.achievements.map(a => `
                  <div class="ach-item">
                    <div class="ach-icon">🏅</div>
                    <div class="ach-name">${a.name}</div>
                    <div class="ach-desc">${a.desc}</div>
                  </div>`).join('')}
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div style="display:flex;flex-direction:column;gap:20px">

            <!-- Equipment / Skills -->
            <div class="rpg-card">
              <div class="rpg-card-title">⚔ Equipment (Skills)</div>
              <div class="rpg-equip">
                ${PROFILE.skills.map(s => `
                  <div class="equip-item">
                    <div class="equip-rarity" style="background:${rarityColor(s.level)}"></div>
                    <span class="equip-name">${s.name}</span>
                    <span style="font-size:11px;color:rgba(255,200,50,.4);margin-right:8px">${s.category}</span>
                    <div class="equip-bar">
                      <div class="equip-fill" style="width:${s.level}%;background:${rarityColor(s.level)};opacity:.8"></div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Quest Log / Projects -->
            <div class="rpg-card">
              <div class="rpg-card-title">📜 Quest Log (Projects)</div>
              <div>
                ${PROFILE.projects.map(p => `
                  <div class="quest-item" ${p.link && p.link !== '#' ? `data-link="${p.link}" style="cursor:pointer"` : ''}>
                    <div class="quest-status">✅</div>
                    <div class="quest-info">
                      <h3>${p.name}${p.link && p.link !== '#' ? ` <span style="color:rgba(255,200,50,.5);font-size:11px">↗</span>` : ''}</h3>
                      <p>${p.desc}</p>
                      <div class="quest-tags">${p.tags.map(t=>`<span class="quest-tag">${t}</span>`).join('')}</div>
                    </div>
                    <div style="font-size:11px;color:rgba(255,200,50,.3);flex-shrink:0;align-self:flex-start;padding-top:2px">${p.year}</div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>`;

    // Animate vital bars
    document.getElementById('app').addEventListener('click', e => {
      const card = e.target.closest('[data-link]');
      if (card) window.open(card.dataset.link, '_blank');
    });

    setTimeout(() => {
      document.querySelectorAll('.vital-fill').forEach(el => {
        el.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
        el.style.width = el.dataset.w;
      });
    }, 200);
  }

  return { render };
})();
