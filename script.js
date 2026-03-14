const posts = [
  {
    issue: "2023 - 至今",
    date: "上海 / 远程协作",
    category: "产品与体验",
    title: "高级产品设计 / 前端体验设计",
    excerpt:
      "负责品牌官网、活动页与内容型站点的体验设计和前端落地，覆盖需求梳理、视觉方案、交互细节与上线交付。",
    href: "#contact",
  },
  {
    issue: "2020 - 2023",
    date: "广州",
    category: "数字产品",
    title: "产品设计师",
    excerpt:
      "参与企业官网、营销中台与活动运营页面设计，输出设计规范、组件策略与关键页面原型，提升交付效率与界面一致性。",
    href: "#notes",
  },
  {
    issue: "2017 - 2020",
    date: "深圳",
    category: "品牌与视觉",
    title: "视觉设计师",
    excerpt:
      "负责线上品牌传播与专题页面设计，积累从视觉表达、信息层次到商业落地的完整经验。",
    href: "#about",
  },
];

const experienceList = document.querySelector("#experience-list");
const menuButtons = document.querySelectorAll(".menu-button");
const pages = document.querySelectorAll(".page-screen");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");
const thinkBar = document.querySelector("#think-bar");

let currentPage = "about";
let onThemeChange = () => {};

// ─── Experience Cards ───────────────────────────────────────────────────────

if (experienceList) {
  experienceList.innerHTML = posts
    .map(
      (post) => `
        <article class="experience-card">
          <div class="experience-meta">
            <span>${post.issue}</span>
            <span>${post.date}</span>
            <span>${post.category}</span>
          </div>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
          <a class="experience-link" href="${post.href}">查看相关页面 →</a>
        </article>
      `
    )
    .join("");
}

// ─── Theme ──────────────────────────────────────────────────────────────────

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggleLabel) {
    themeToggleLabel.textContent = theme === "night" ? "夜间" : "白天";
  }
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "night" ? "true" : "false");
  }
  onThemeChange();
}

function updateMenu(pageId) {
  menuButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.page === pageId);
  });
}

// ─── Animation Helpers ──────────────────────────────────────────────────────

const reducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Stream text character-by-character, like Claude generating a response.
// Caches original text in dataset so it can be replayed correctly.
function streamIn(el, speed = 36) {
  if (reducedMotion) return Promise.resolve();

  const original = el.dataset.originalText ?? el.textContent;
  el.dataset.originalText = original;

  const chars = [...original]; // correctly splits CJK & emoji
  el.textContent = "";
  el.classList.add("is-streaming");

  return new Promise((resolve) => {
    let i = 0;
    let canceled = false;

    el._cancelStream = () => {
      canceled = true;
      el.textContent = original;
      el.classList.remove("is-streaming");
      el._cancelStream = null;
      resolve();
    };

    function step() {
      if (canceled) return;
      if (i >= chars.length) {
        el.classList.remove("is-streaming");
        el._cancelStream = null;
        resolve();
        return;
      }
      el.textContent = chars.slice(0, i + 1).join("");
      i += 1;
      setTimeout(step, speed);
    }

    step();
  });
}

// Cancel any in-progress streams on the page
function cancelStreams(pageEl) {
  pageEl.querySelectorAll(".is-streaming").forEach((el) => {
    if (el._cancelStream) el._cancelStream();
  });
}

// Stagger-reveal cards inside a page
function revealCards(pageEl) {
  if (reducedMotion) return;
  const items = pageEl.querySelectorAll(".card, .experience-card");
  items.forEach((item, i) => {
    item.classList.remove("card-reveal");
    // Force reflow so re-adding the class re-triggers the animation
    void item.offsetWidth;
    item.style.setProperty("--reveal-delay", `${i * 80}ms`);
    item.classList.add("card-reveal");
    item.addEventListener(
      "animationend",
      () => {
        item.classList.remove("card-reveal");
        item.style.removeProperty("--reveal-delay");
      },
      { once: true }
    );
  });
}

// Thinking indicator (3 pulsing dots, shown briefly during page transitions)
function showThinking() {
  if (!thinkBar) return;
  thinkBar.classList.remove("is-fading");
  thinkBar.hidden = false;
}

function hideThinking() {
  if (!thinkBar) return;
  thinkBar.classList.add("is-fading");
  setTimeout(() => {
    thinkBar.hidden = true;
    thinkBar.classList.remove("is-fading");
  }, 200);
}

// Orchestrate the full entry animation for a page:
// think → stream h1 → fade lead → reveal cards
async function animatePageEntry(pageEl, isInitial = false) {
  const h1 = pageEl.querySelector("h1[data-stream]");
  const lead = pageEl.querySelector(".lead[data-stream-delay]");

  if (!reducedMotion && !isInitial) {
    // Show thinking dots briefly
    showThinking();
    await delay(280);
    hideThinking();
    await delay(60);
  }

  // Stream the heading
  if (h1) await streamIn(h1, isInitial ? 42 : 36);

  // Fade in the lead paragraph
  if (lead) {
    lead.style.transition = reducedMotion ? "none" : "opacity 380ms ease";
    lead.style.opacity = "0";
    // Let browser register the opacity-0 before transitioning
    await delay(16);
    lead.style.opacity = "1";
  }

  // Stagger cards
  revealCards(pageEl);
}

// ─── Routing / Animation Timing Utils ───────────────────────────────────────

function parseMaxTimeMs(value) {
  return Math.max(
    ...value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        if (part.endsWith("ms")) return Number(part.slice(0, -2)) || 0;
        if (part.endsWith("s")) return (Number(part.slice(0, -1)) || 0) * 1000;
        return 0;
      })
  );
}

function afterAnimationOrTimeout(element, callback) {
  const style = window.getComputedStyle(element);
  const durationMs = parseMaxTimeMs(style.animationDuration);
  const delayMs = parseMaxTimeMs(style.animationDelay);
  const totalMs = Math.max(0, durationMs + delayMs);

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    callback();
  };

  element.addEventListener("animationend", finish, { once: true });
  if (totalMs === 0) {
    queueMicrotask(finish);
  } else {
    window.setTimeout(finish, totalMs + 80);
  }
}

// ─── Page Navigation ─────────────────────────────────────────────────────────

function showPage(pageId, shouldUpdateHash = true) {
  const nextPage = document.getElementById(pageId);
  const activePage = document.querySelector(".page-screen.is-current");

  if (!nextPage || nextPage === activePage) {
    updateMenu(pageId);
    return;
  }

  // Cancel any streams in progress on the outgoing page
  if (activePage) cancelStreams(activePage);

  nextPage.hidden = false;
  nextPage.classList.remove("is-exiting");
  nextPage.classList.add("is-entering");

  if (activePage) {
    activePage.classList.remove("is-current");
    activePage.classList.add("is-exiting");
  }

  requestAnimationFrame(() => {
    nextPage.classList.add("is-current");
    updateMenu(pageId);
  });

  afterAnimationOrTimeout(nextPage, () => {
    nextPage.classList.remove("is-entering");
    // Start content animation after page finishes sliding in
    animatePageEntry(nextPage);
  });

  if (activePage) {
    afterAnimationOrTimeout(activePage, () => {
      activePage.hidden = true;
      activePage.classList.remove("is-exiting");
    });
  }

  currentPage = pageId;

  if (shouldUpdateHash) {
    window.history.pushState(null, "", `#${pageId}`);
  }
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;
    if (pageId) showPage(pageId);
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const anchor = target.closest('a[href^="#"]');
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  const pageId = href ? href.replace("#", "").trim() : "";
  if (!pageId) return;

  if (document.getElementById(pageId)) {
    event.preventDefault();
    showPage(pageId);
  }
});

function routeFromHash() {
  const pageId = window.location.hash.replace("#", "") || "about";
  if (pageId !== currentPage) {
    showPage(pageId, false);
  } else {
    updateMenu(pageId);
  }
}

window.addEventListener("popstate", routeFromHash);
window.addEventListener("hashchange", routeFromHash);

// ─── Init ────────────────────────────────────────────────────────────────────

pages.forEach((page) => {
  if (!page.classList.contains("is-current")) {
    page.hidden = true;
  }
});

const initialPage = window.location.hash.replace("#", "") || "about";
updateMenu(initialPage);

if (initialPage !== "about") {
  showPage(initialPage, false);
} else {
  // Stream the initial page on first load
  const aboutPage = document.getElementById("about");
  if (aboutPage) {
    // Small delay to let page paint first
    setTimeout(() => animatePageEntry(aboutPage, true), 200);
  }
}

const storedTheme = localStorage.getItem("theme");
const prefersNight =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(
  storedTheme === "day" || storedTheme === "night"
    ? storedTheme
    : prefersNight
      ? "night"
      : "day"
);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "night" ? "day" : "night";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

// ─── Mouse Particles ─────────────────────────────────────────────────────────

function initMouseParticles() {
  const canvas = document.querySelector("#bg-canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const allowParticles =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !reducedMotion;
  if (!allowParticles) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let dpr = Math.min(2, window.devicePixelRatio || 1);
  let width = 0;
  let height = 0;
  let running = true;
  let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let pointerStrength = 0;

  const particles = [];
  const maxParticles = 760;
  const rings = [];

  // Warm amber/orange palette — Claude-like
  const palette = {
    a: { r: 210, g: 100, b: 50 },
    b: { r: 190, g: 140, b: 60 },
  };

  function clamp01(value) {
    return Math.min(1, Math.max(0, value));
  }

  function parseHexColor(value) {
    const hex = value.trim();
    if (!hex.startsWith("#")) return null;
    const raw = hex.slice(1);
    const full =
      raw.length === 3
        ? raw.split("").map((c) => c + c).join("")
        : raw.length === 6
          ? raw
          : null;
    if (!full) return null;
    const int = Number.parseInt(full, 16);
    if (!Number.isFinite(int)) return null;
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  }

  function readPaletteFromCss() {
    const style = getComputedStyle(document.documentElement);
    const a = parseHexColor(style.getPropertyValue("--accent").trim());
    const b = parseHexColor(style.getPropertyValue("--accent-2").trim());
    if (a) palette.a = a;
    if (b) palette.b = b;
  }

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addParticle(x, y, strength = 1, options = {}) {
    if (particles.length >= maxParticles)
      particles.splice(0, particles.length - maxParticles + 1);

    const speedMin = options.speedMin ?? 0.35;
    const speedMax = options.speedMax ?? 1.65;
    const speed = (speedMin + Math.random() * (speedMax - speedMin)) * strength;

    const spread = options.spread ?? Math.PI * 2;
    const direction = options.direction;
    const baseAngle =
      direction && Number.isFinite(direction.x) && Number.isFinite(direction.y)
        ? Math.atan2(direction.y, direction.x)
        : Math.random() * Math.PI * 2;
    const angle = baseAngle + (Math.random() - 0.5) * spread;
    const base =
      options.color === "a"
        ? palette.a
        : options.color === "b"
          ? palette.b
          : Math.random() < 0.5
            ? palette.a
            : palette.b;

    const ttlMin = options.ttlMin ?? 520;
    const ttlMax = options.ttlMax ?? 1040;
    const sizeMin = options.sizeMin ?? 1.4;
    const sizeMax = options.sizeMax ?? 4.6;

    particles.push({
      x, y,
      prevX: x, prevY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ttl: ttlMin + Math.random() * Math.max(0, ttlMax - ttlMin),
      life: 0,
      size: sizeMin + Math.random() * Math.max(0, sizeMax - sizeMin),
      friction: options.friction ?? 0.985,
      gravity: options.gravity ?? 0,
      streak: options.streak ?? false,
      streakMin: options.streakMin ?? 6,
      streakMax: options.streakMax ?? 28,
      sparkle: options.sparkle ?? 0.18,
      sparkleSeed: Math.random() * 1000,
      r: base.r, g: base.g, b: base.b,
    });
  }

  function burst(x, y, count, strength, options) {
    for (let i = 0; i < count; i += 1) addParticle(x, y, strength, options);
  }

  function addRing(x, y, strength = 1) {
    const base = Math.random() < 0.5 ? palette.a : palette.b;
    rings.push({
      x, y,
      life: 0,
      ttl: 520 + Math.random() * 260,
      strength,
      r: base.r, g: base.g, b: base.b,
    });
  }

  function tick() {
    if (!running) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter";

    for (let i = rings.length - 1; i >= 0; i -= 1) {
      const ring = rings[i];
      ring.life += 16.7;
      const t = clamp01(ring.life / ring.ttl);
      const alpha = (1 - t) * 0.3;
      const radius = (18 + t * 240) * ring.strength;

      if (t >= 1) { rings.splice(i, 1); continue; }

      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(${ring.r}, ${ring.g}, ${ring.b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.life += 16.7;
      const t = clamp01(p.life / p.ttl);
      const sparkle =
        1 - p.sparkle + p.sparkle * (0.6 + 0.4 * Math.sin((p.life + p.sparkleSeed) * 0.04));
      const alpha = (1 - t) * (0.24 + pointerStrength * 0.16) * sparkle;
      const radius = p.size * (0.9 + t * 1.6);

      p.prevX = p.x;
      p.prevY = p.y;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40 || t >= 1) {
        particles.splice(i, 1);
        continue;
      }

      if (p.streak) {
        const dx = p.x - p.prevX;
        const dy = p.y - p.prevY;
        const step = Math.max(0.001, Math.hypot(dx, dy));
        const tail = Math.min(p.streakMax, Math.max(p.streakMin, step * 10 * (1 - t) + radius * 5));
        const tx = p.x - (dx / step) * tail;
        const ty = p.y - (dy / step) * tail;

        ctx.lineWidth = Math.max(1, radius * 0.9);
        const grad = ctx.createLinearGradient(tx, ty, p.x, p.y);
        grad.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);
        grad.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 6);
      glow.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    pointerStrength *= 0.92;
    window.requestAnimationFrame(tick);
  }

  function onMove(event) {
    if (!(event instanceof PointerEvent)) return;
    if (event.pointerType && event.pointerType !== "mouse") return;

    const x = event.clientX;
    const y = event.clientY;
    const dx = x - lastPointer.x;
    const dy = y - lastPointer.y;
    const dist = Math.hypot(dx, dy);
    const speed = Math.min(40, dist);
    const dir = dist > 0.01 ? { x: dx / dist, y: dy / dist } : { x: 0, y: -1 };
    const exhaust = { x: -dir.x, y: -dir.y };

    lastPointer = { x, y };
    pointerStrength = Math.min(1, pointerStrength + 0.14);

    const strength = 1.1 + pointerStrength * 0.9;
    const count = 5 + Math.floor(speed / 6);
    burst(x, y, count, strength, {
      direction: exhaust,
      spread: Math.PI * 0.38,
      speedMin: 0.9 + speed * 0.03,
      speedMax: 2.2 + speed * 0.07,
      ttlMin: 420,
      ttlMax: 980,
      sizeMin: 0.8,
      sizeMax: 2.0,
      friction: 0.982,
      gravity: 0.018,
      streak: true,
      streakMin: 8,
      streakMax: 26,
      sparkle: 0.34,
    });

    addParticle(x, y, 1, {
      speedMin: 0,
      speedMax: 0.2,
      ttlMin: 260,
      ttlMax: 520,
      sizeMin: 1.8,
      sizeMax: 3.4,
      friction: 0.99,
      gravity: 0,
      color: "a",
      streak: false,
      sparkle: 0.12,
    });
  }

  function onDown(event) {
    if (!(event instanceof PointerEvent)) return;
    if (event.pointerType && event.pointerType !== "mouse") return;
    pointerStrength = 1;

    const x = event.clientX;
    const y = event.clientY;

    addRing(x, y, 1);
    burst(x, y, 96, 2.9, {
      speedMin: 1.3, speedMax: 5.6,
      ttlMin: 720, ttlMax: 1650,
      sizeMin: 1.1, sizeMax: 3.2,
      friction: 0.979, gravity: 0.03,
      streak: true, streakMin: 12, streakMax: 44, sparkle: 0.58,
    });

    window.setTimeout(() => {
      addRing(x, y, 0.85);
      burst(x, y, 56, 2.2, {
        speedMin: 0.9, speedMax: 4.3,
        ttlMin: 560, ttlMax: 1320,
        sizeMin: 1.0, sizeMax: 2.6,
        friction: 0.981, gravity: 0.034,
        color: "b",
        streak: true, streakMin: 10, streakMax: 38, sparkle: 0.52,
      });
    }, 140);

    window.setTimeout(() => {
      burst(x, y, 24, 1.6, {
        speedMin: 0.6, speedMax: 2.7,
        ttlMin: 420, ttlMax: 900,
        sizeMin: 0.9, sizeMax: 2.2,
        friction: 0.982, gravity: 0.036,
        color: "a",
        streak: true, streakMin: 8, streakMax: 30, sparkle: 0.44,
      });
    }, 260);

    window.setTimeout(() => {
      burst(x, y, 26, 1.2, {
        speedMin: 0.25, speedMax: 1.4,
        ttlMin: 920, ttlMax: 1900,
        sizeMin: 0.7, sizeMax: 1.7,
        friction: 0.987, gravity: 0.055,
        color: Math.random() < 0.5 ? "a" : "b",
        streak: true, streakMin: 6, streakMax: 22, sparkle: 0.22,
      });
    }, 520);
  }

  function onVisibility() {
    running = !document.hidden;
    if (running) window.requestAnimationFrame(tick);
  }

  readPaletteFromCss();
  resize();
  window.requestAnimationFrame(tick);

  onThemeChange = () => { readPaletteFromCss(); };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  burst(lastPointer.x, lastPointer.y, 28, 1.4);
}

initMouseParticles();
