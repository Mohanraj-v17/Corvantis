/**
 * CORVANTIS - Direction Management (LTR / RTL Layout Switching)
 * Persists layout direction in localStorage and updates document.documentElement.dir instantly.
 * Supports segmented control click behavior: clicking LTR sets LTR; clicking RTL sets RTL.
 */

(function () {
  'use strict';

  function getPreferredDirection() {
    try {
      return localStorage.getItem('corvantis_dir') || 'ltr';
    } catch (e) {
      return 'ltr';
    }
  }

  function applyDirection(dir) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.dir = validDir;
    document.documentElement.setAttribute('dir', validDir);
    updateDirectionButtons(validDir);
  }

  function updateDirectionButtons(dir, root) {
    const context = root || document;
    const dirBtns = context.querySelectorAll ? context.querySelectorAll('.direction-toggle-btn') : [];
    const isRtl = dir === 'rtl';

    dirBtns.forEach((btn) => {
      btn.setAttribute('aria-label', isRtl ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      btn.setAttribute('title', isRtl ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      
      const ltrBadge = btn.querySelector('.dir-ltr-indicator');
      const rtlBadge = btn.querySelector('.dir-rtl-indicator');
      
      if (ltrBadge && rtlBadge) {
        if (isRtl) {
          rtlBadge.classList.add('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          rtlBadge.classList.remove('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
          ltrBadge.classList.remove('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          ltrBadge.classList.add('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
        } else {
          ltrBadge.classList.add('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          ltrBadge.classList.remove('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
          rtlBadge.classList.remove('active', 'bg-[#C5A46D]', 'text-white', 'shadow-sm');
          rtlBadge.classList.add('bg-transparent', 'text-[#718096]', 'dark:text-[#A5B1BE]');
        }
      }
    });
  }

  function setDirection(newDir) {
    const validDir = newDir === 'rtl' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('corvantis_dir', validDir);
    } catch (e) {
      // localStorage may be restricted or unavailable
    }
    applyDirection(validDir);
  }

  function toggleDirection() {
    const currentDir = (document.documentElement.getAttribute('dir') || document.documentElement.dir) === 'rtl' ? 'rtl' : 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    setDirection(newDir);
  }

  function handleDirectionToggleEvent(e) {
    const btn = e.target.closest('.direction-toggle-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const ltrClicked = e.target.closest('.dir-ltr-indicator');
    const rtlClicked = e.target.closest('.dir-rtl-indicator');

    if (ltrClicked) {
      setDirection('ltr');
    } else if (rtlClicked) {
      setDirection('rtl');
    } else {
      toggleDirection();
    }
  }

  function bindDirectionListeners() {
    const current = getPreferredDirection();
    applyDirection(current);

    if (!document.__dirDelegatedAttached) {
      document.__dirDelegatedAttached = true;
      document.addEventListener('click', handleDirectionToggleEvent, true);
    }

    const ltrSpecificBtns = document.querySelectorAll('.set-ltr-btn');
    ltrSpecificBtns.forEach((btn) => {
      if (!btn.dataset.dirBound) {
        btn.dataset.dirBound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          setDirection('ltr');
        });
      }
    });

    const rtlSpecificBtns = document.querySelectorAll('.set-rtl-btn');
    rtlSpecificBtns.forEach((btn) => {
      if (!btn.dataset.dirBound) {
        btn.dataset.dirBound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          setDirection('rtl');
        });
      }
    });
  }

  // Execute synchronously immediately upon script parse
  const initial = getPreferredDirection();
  applyDirection(initial);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindDirectionListeners);
  } else {
    bindDirectionListeners();
  }

  window.corvantisToggleDirection = toggleDirection;
  window.corvantisSetDirection = setDirection;
  window.corvantisInitDirection = bindDirectionListeners;
  window.corvantisUpdateDirectionButtons = updateDirectionButtons;
})();
