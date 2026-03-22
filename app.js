// ═══════════════════════════════════════════
//  APP CONTROLLER — Theme switcher logic
// ═══════════════════════════════════════════
(function () {
  const THEMES = {
    terminal: ThemeTerminal,
    desktop:  ThemeDesktop,
    story:    ThemeStory,
    minimal:  ThemeMinimal,
    rpg:      ThemeRpg,
    galaxy:   ThemeGalaxy,
  };

  let currentTheme = null;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.id = 'theme-overlay';
  document.body.appendChild(overlay);

  function switchTheme(name) {
    if (name === currentTheme) { closePanel(); return; }

    // Destroy previous theme if needed
    if (currentTheme && THEMES[currentTheme]?.destroy) {
      THEMES[currentTheme].destroy();
    }

    // Flash transition
    overlay.classList.add('flash');
    setTimeout(() => {
      // Render new theme
      THEMES[name].render();
      currentTheme = name;

      // Update active button
      document.querySelectorAll('.theme-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.theme === name);
      });

      closePanel();
      overlay.classList.remove('flash');
    }, 250);
  }

  function closePanel() {
    document.getElementById('switcher-panel').classList.remove('open');
  }

  // Toggle panel
  document.getElementById('switcher-toggle').addEventListener('click', e => {
    document.getElementById('switcher-panel').classList.toggle('open');
    e.stopPropagation();
  });

  // Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTheme(btn.dataset.theme));
  });

  // Click outside to close panel
  document.addEventListener('click', e => {
    if (!e.target.closest('#theme-switcher')) closePanel();
  });

  // Keyboard shortcut: press 1-6 to switch themes
  const themeKeys = ['1','2','3','4','5','6'];
  const themeList = Object.keys(THEMES);
  document.addEventListener('keydown', e => {
    const idx = themeKeys.indexOf(e.key);
    if (idx !== -1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Don't intercept if typing in terminal
      if (document.activeElement?.id === 'term-input') return;
      switchTheme(themeList[idx]);
    }
    if (e.key === 'Escape') closePanel();
  });

  // Start with terminal theme
  switchTheme('terminal');
})();
