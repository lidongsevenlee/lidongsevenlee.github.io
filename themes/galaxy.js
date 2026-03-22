// ═══════════════════════════════════════════
//  THEME 6: GALAXY / STAR MAP
// ═══════════════════════════════════════════
const ThemeGalaxy = (() => {
  let animId = null;
  let nodes = [];
  let edges = [];
  let stars = [];
  let hoveredNode = null;
  let selectedNode = null;
  let offsetX = 0, offsetY = 0;
  let targetOX = 0, targetOY = 0;
  let isDragging = false;
  let dragStart = null;

  const CATEGORY_COLORS = {
    '核心': '#7c6af7',
    '框架': '#3b82f6',
    '后端': '#10b981',
    '工具': '#f59e0b',
    '进阶': '#e879f9',
    'project': '#f97316',
    'center': '#ffffff',
  };

  function render() {
    document.body.className = 'theme-galaxy';
    document.getElementById('app').innerHTML = `
      <div class="galaxy-wrap">
        <canvas id="galaxy-canvas"></canvas>
        <div class="galaxy-ui">
          <div class="galaxy-title">
            <h1>${PROFILE.name}</h1>
            <p>${PROFILE.title}</p>
          </div>
          <div class="galaxy-hint">CLICK nodes to explore · DRAG to pan</div>
          <div class="galaxy-legend" id="galaxy-legend"></div>
          <div class="galaxy-panel" id="galaxy-panel">
            <div class="galaxy-panel-label">Constellation brief</div>
            <h2 id="galaxy-panel-title">${PROFILE.name}</h2>
            <p id="galaxy-panel-copy">${PROFILE.summary}</p>
            <div class="galaxy-panel-meta" id="galaxy-panel-meta">
              ${PROFILE.metrics.map(metric => `<span>${metric.value} · ${metric.label}</span>`).join('')}
            </div>
            <a class="galaxy-panel-link" id="galaxy-panel-link" href="${PROFILE.projects[0]?.link || '#'}" target="_blank" rel="noreferrer">Open featured project ↗</a>
          </div>
        </div>
        <div id="galaxy-tooltip">
          <div class="gt-name" id="gt-name"></div>
          <div class="gt-desc" id="gt-desc"></div>
          <div class="gt-level" id="gt-level"></div>
        </div>
      </div>`;

    buildLegend();
    requestAnimationFrame(() => initCanvas());
  }

  function buildLegend() {
    const legend = document.getElementById('galaxy-legend');
    Object.entries(CATEGORY_COLORS).forEach(([cat, color]) => {
      if (cat === 'center') return;
      const label = cat === 'project' ? 'Projects' : cat;
      legend.innerHTML += `
        <div class="gl-item">
          <div class="gl-dot" style="background:${color}"></div>
          <span>${label}</span>
        </div>`;
    });
  }

  function buildGraph(cx, cy) {
    nodes = [];
    edges = [];

    // Center node
    nodes.push({ id: 'center', label: PROFILE.name, desc: PROFILE.title, level: null, category: 'center', x: cx, y: cy, r: 22, pulse: 0, selected: false });

    // Skill nodes in orbital rings
    const cats = [...new Set(PROFILE.skills.map(s => s.category))];
    let skillAngle = 0;
    PROFILE.skills.forEach((s, i) => {
      const angle = (i / PROFILE.skills.length) * Math.PI * 2 - Math.PI / 2;
      const dist = 160 + (s.level / 100) * 60;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      nodes.push({
        id: `skill-${i}`, label: s.name,
        desc: `${s.category} — Lv ${s.level}`,
        level: s.level,
        category: s.category,
        x, y, r: 8 + s.level / 20,
        pulse: Math.random() * Math.PI * 2,
        vx: 0, vy: 0,
        selected: false,
      });
      edges.push({ from: 'center', to: `skill-${i}`, strength: s.level / 100 });
    });

    // Project nodes in outer ring
    PROFILE.projects.forEach((p, i) => {
      const angle = (i / PROFILE.projects.length) * Math.PI * 2 + Math.PI / 4;
      const dist = 280 + Math.random() * 40;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      nodes.push({
        id: `proj-${i}`, label: p.name,
        desc: p.highlight || p.desc,
        level: null, category: 'project',
        link: (p.link && p.link !== '#') ? p.link : null,
        x, y, r: 12,
        pulse: Math.random() * Math.PI * 2,
        vx: 0, vy: 0,
        selected: false,
        tags: p.tags,
        year: p.year,
      });
      // Connect project to related skills
      p.tags.slice(0,2).forEach(tag => {
        const skillNode = nodes.find(n => n.label && n.label.toLowerCase().includes(tag.toLowerCase()));
        if (skillNode) edges.push({ from: `proj-${i}`, to: skillNode.id, strength: .3, dashed: true });
        else edges.push({ from: 'center', to: `proj-${i}`, strength: .2 });
      });
      if (!edges.find(e => e.to === `proj-${i}` || e.from === `proj-${i}`)) {
        edges.push({ from: 'center', to: `proj-${i}`, strength: .2 });
      }
    });

    // Background stars
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * 2000 - 500,
      y: Math.random() * 2000 - 500,
      r: Math.random() * 1.2 + .2,
      alpha: Math.random() * .5 + .1,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  function initCanvas() {
    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); buildGraph(canvas.width/2, canvas.height/2); });

    buildGraph(canvas.width / 2, canvas.height / 2);
    selectedNode = nodes.find(node => node.id === 'center') || null;
    updatePanel(selectedNode);

    let t = 0;

    function loop() {
      animId = requestAnimationFrame(loop);
      t += .008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth pan
      offsetX += (targetOX - offsetX) * .06;
      offsetY += (targetOY - offsetY) * .06;

      ctx.save();
      ctx.translate(offsetX, offsetY);

      // Stars
      stars.forEach(s => {
        const alpha = s.alpha * (.7 + .3 * Math.sin(t * 1.5 + s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // Edges
      edges.forEach(e => {
        const from = nodes.find(n => n.id === e.from);
        const to   = nodes.find(n => n.id === e.to);
        if (!from || !to) return;

        ctx.beginPath();
        if (e.dashed) ctx.setLineDash([4, 8]);
        else ctx.setLineDash([]);
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(255,255,255,${e.strength * .25})`;
        ctx.lineWidth = e.strength * 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // Traveling particle along edge
        if (!e.dashed) {
          const progress = ((t * e.strength * 2) % 1);
          const px = from.x + (to.x - from.x) * progress;
          const py = from.y + (to.y - from.y) * progress;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255,255,255,.6)`;
          ctx.fill();
        }
      });

      // Nodes
      nodes.forEach(n => {
        n.pulse += .04;
        const pulseMod = 1 + Math.sin(n.pulse) * .08;
        const r = n.r * pulseMod;
        const color = CATEGORY_COLORS[n.category] || '#fff';
        const isHovered = n === hoveredNode;
        const isSelected = n === selectedNode;

        // Glow
        const glowR = r * (isHovered ? 4 : isSelected ? 3.4 : 2.5);
        if (glowR > 0) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grd.addColorStop(0, color + (isHovered ? 'aa' : isSelected ? '77' : '44'));
          grd.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI*2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.globalAlpha = isHovered || isSelected ? 1 : .85;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Ring on hover
        if (isHovered || isSelected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + (isSelected ? 7 : 5), 0, Math.PI*2);
          ctx.strokeStyle = color;
          ctx.lineWidth = isSelected ? 2 : 1.5;
          ctx.globalAlpha = isSelected ? .75 : .5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Label
        if (isHovered || n.category === 'center' || n.r > 12) {
          ctx.font = n.category === 'center' ? 'bold 13px system-ui' : '11px system-ui';
          ctx.fillStyle = n.category === 'center' ? '#fff' : 'rgba(255,255,255,.8)';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + r + 14);
        }
      });

      ctx.restore();
    }
    loop();

    // Mouse events
    canvas.addEventListener('mousemove', e => {
      if (isDragging) {
        targetOX += e.movementX;
        targetOY += e.movementY;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - offsetX;
      const my = e.clientY - rect.top  - offsetY;

      hoveredNode = null;
      for (const n of nodes) {
        const dx = n.x - mx, dy = n.y - my;
        if (Math.sqrt(dx*dx+dy*dy) < n.r + 8) { hoveredNode = n; break; }
      }
      canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
      updateTooltip(hoveredNode, e.clientX, e.clientY);
    });

    canvas.addEventListener('mousedown', e => { isDragging = true; dragStart = {x:e.clientX,y:e.clientY}; canvas.style.cursor='grabbing'; });
    canvas.addEventListener('mouseup',   e => {
      const moved = dragStart && (Math.abs(e.clientX-dragStart.x) + Math.abs(e.clientY-dragStart.y)) < 5;
      if (moved && hoveredNode) {
        selectedNode = hoveredNode;
        updatePanel(selectedNode);
        if (hoveredNode.link) window.open(hoveredNode.link, '_blank');
      }
      isDragging = false; canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
    });
    canvas.addEventListener('mouseleave',() => { isDragging = false; hoveredNode = null; hideTooltip(); });
  }

  function updateTooltip(node, cx, cy) {
    const tt = document.getElementById('galaxy-tooltip');
    if (!node) { hideTooltip(); return; }
    document.getElementById('gt-name').textContent = node.label;
    document.getElementById('gt-desc').textContent = node.desc || '';
    document.getElementById('gt-level').textContent = node.level ? `Proficiency: ${node.level}%` : (node.year ? `Year: ${node.year}` : '');
    const levelEl = document.getElementById('gt-level');
    if (node.link) {
      levelEl.innerHTML += ' <span style="color:#f97316">↗ 点击查看</span>';
    }
    tt.style.left = (cx + 16) + 'px';
    tt.style.top  = (cy - 20) + 'px';
    tt.classList.add('show');
  }

  function hideTooltip() {
    document.getElementById('galaxy-tooltip')?.classList.remove('show');
  }

  function updatePanel(node) {
    const title = document.getElementById('galaxy-panel-title');
    const copy = document.getElementById('galaxy-panel-copy');
    const meta = document.getElementById('galaxy-panel-meta');
    const link = document.getElementById('galaxy-panel-link');
    if (!title || !copy || !meta || !link) return;

    if (!node || node.id === 'center') {
      title.textContent = PROFILE.name;
      copy.textContent = PROFILE.summary;
      meta.innerHTML = PROFILE.metrics.map(metric => `<span>${metric.value} · ${metric.label}</span>`).join('');
      const featured = PROFILE.projects.find(project => project.featured && project.link && project.link !== '#') || PROFILE.projects.find(project => project.link && project.link !== '#');
      if (featured) {
        link.href = featured.link;
        link.style.display = 'inline-flex';
        link.textContent = `Open ${featured.name} ↗`;
      } else {
        link.style.display = 'none';
      }
      return;
    }

    title.textContent = node.label;
    copy.textContent = node.desc || '';
    meta.innerHTML = [
      node.level ? `<span>${node.level}% proficiency</span>` : '',
      node.year ? `<span>${node.year}</span>` : '',
      node.tags?.length ? `<span>${node.tags.join(' · ')}</span>` : ''
    ].filter(Boolean).join('');

    if (node.link) {
      link.href = node.link;
      link.style.display = 'inline-flex';
      link.textContent = `Open ${node.label} ↗`;
    } else {
      link.style.display = 'none';
    }
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    nodes = []; edges = []; stars = [];
    hoveredNode = null;
    selectedNode = null;
  }

  return { render, destroy };
})();
