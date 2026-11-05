/**
 * CORVANTIS - Theme Management (Light / Dark Mode)
 * Persists theme preference in localStorage and synchronizes UI toggles instantly without lag.
 * Supports segmented control click behavior: clicking Light sets Light; clicking Dark sets Dark.
 */

(function () {
  'use strict';

  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('corvantis_theme');
      if (savedTheme) {
        return savedTheme;
      }
    } catch (e) {
      // localStorage may be restricted or unavailable in private/sandboxed modes
    }
    return 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeToggleButtons(theme);
  }

  function updateThemeToggleButtons(theme, root) {
    const isDark = theme === 'dark';
    const context = root || document;
    const toggleBtns = context.querySelectorAll ? context.querySelectorAll('.theme-toggle-btn') : [];

    toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      
      // 1. Single-icon button (Desktop header fallback)
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }

      // 2. Dual-pill button (Desktop Header, Drawer Header, Drawer Footer)
      const lightIndicator = btn.querySelector('.theme-light-indicator');
      const darkIndicator = btn.querySelector('.theme-dark-indicator');
      if (lightIndicator && darkIndicator) {
        if (isDark) {
          darkIndicator.classList.add('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          darkIndicator.classList.remove('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
          lightIndicator.classList.remove('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          lightIndicator.classList.add('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
        } else {
          lightIndicator.classList.add('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          lightIndicator.classList.remove('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
          darkIndicator.classList.remove('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          darkIndicator.classList.add('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
        }
      }
    });
  }

  function setTheme(newTheme) {
    const validTheme = newTheme === 'dark' ? 'dark' : 'light';
    try {
      localStorage.setItem('corvantis_theme', validTheme);
    } catch (e) {
      // localStorage may be restricted or unavailable
    }
    applyTheme(validTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function handleThemeToggleEvent(e) {
    const btn = e.target.closest('.theme-toggle-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const lightClicked = e.target.closest('.theme-light-indicator');
    const darkClicked = e.target.closest('.theme-dark-indicator');

    if (lightClicked) {
      setTheme('light');
    } else if (darkClicked) {
      setTheme('dark');
    } else {
      // Clicked outer border or padding: toggle
      toggleTheme();
    }
  }

  function bindThemeListeners() {
    const current = getPreferredTheme();
    applyTheme(current);

    if (!document.__themeDelegatedAttached) {
      document.__themeDelegatedAttached = true;
      document.addEventListener('click', handleThemeToggleEvent, true);
    }
  }

  // Execute synchronously immediately upon script parse
  const initial = getPreferredTheme();
  applyTheme(initial);

  // Bind event listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeListeners);
  } else {
    bindThemeListeners();
  }

  // Expose globally for dynamic component loaders
  window.corvantisToggleTheme = toggleTheme;
  window.corvantisSetTheme = setTheme;
  window.corvantisInitTheme = bindThemeListeners;
  window.corvantisApplyTheme = applyTheme;
  window.corvantisUpdateThemeButtons = updateThemeToggleButtons;
})();
