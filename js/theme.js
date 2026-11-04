/**
 * CORVANTIS - Theme Management (Light / Dark Mode)
 * Persists theme preference in localStorage and synchronizes UI toggles.
 */

(function () {
  'use strict';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('corvantis_theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeToggleButtons(theme);
  }

  function updateThemeToggleButtons(theme) {
    const isDark = theme === 'dark';
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');

    toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      
      // 1. Single-icon button (Desktop header)
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

      // 2. Dual-pill button (Both Desktop header & Mobile hamburger drawer)
      const lightIndicator = btn.querySelector('.theme-light-indicator');
      const darkIndicator = btn.querySelector('.theme-dark-indicator');
      if (lightIndicator && darkIndicator) {
        const lightSvg = lightIndicator.querySelector('svg, i');
        const darkSvg = darkIndicator.querySelector('svg, i');
        if (lightSvg) {
          lightSvg.classList.remove('text-[#C5A46D]');
          lightSvg.classList.add('text-current');
        }
        if (darkSvg) {
          darkSvg.classList.remove('text-[#C5A46D]');
          darkSvg.classList.add('text-current');
        }
        if (isDark) {
          darkIndicator.className = 'theme-dark-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm transition-all';
          lightIndicator.className = 'theme-light-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium hover:text-[#142B45] dark:hover:text-[#F3F5F7] transition-all';
        } else {
          lightIndicator.className = 'theme-light-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm transition-all';
          darkIndicator.className = 'theme-dark-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium hover:text-[#142B45] dark:hover:text-[#F3F5F7] transition-all';
        }
      }
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('corvantis_theme', newTheme);
    applyTheme(newTheme);
  }

  function bindThemeListeners() {
    const current = getPreferredTheme();
    applyTheme(current);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      // Avoid duplicate listener bindings
      if (!btn.dataset.themeBound) {
        btn.dataset.themeBound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleTheme();
        });
      }
    });
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    bindThemeListeners();

    // Listen for OS theme changes if user has not set a preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('corvantis_theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  });

  // Expose globally for dynamic component loaders
  window.corvantisToggleTheme = toggleTheme;
  window.corvantisInitTheme = bindThemeListeners;
})();
