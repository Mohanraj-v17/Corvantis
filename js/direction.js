/**
 * CORVANTIS - Direction Management (LTR / RTL Layout Switching)
 * Persists layout direction in localStorage and updates document.documentElement.dir.
 */

(function () {
  'use strict';

  function getPreferredDirection() {
    return localStorage.getItem('corvantis_dir') || 'ltr';
  }

  function applyDirection(dir) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.dir = validDir;
    document.documentElement.setAttribute('dir', validDir);
    updateDirectionButtons(validDir);
  }

  function updateDirectionButtons(dir) {
    const dirBtns = document.querySelectorAll('.direction-toggle-btn');
    const isRtl = dir === 'rtl';

    dirBtns.forEach((btn) => {
      btn.setAttribute('aria-label', isRtl ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      btn.setAttribute('title', isRtl ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      
      const ltrBadge = btn.querySelector('.dir-ltr-indicator');
      const rtlBadge = btn.querySelector('.dir-rtl-indicator');
      
      if (ltrBadge && rtlBadge) {
        if (isRtl) {
          rtlBadge.className = 'dir-rtl-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm transition-all';
          ltrBadge.className = 'dir-ltr-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium hover:text-[#142B45] dark:hover:text-[#F3F5F7] transition-all';
        } else {
          ltrBadge.className = 'dir-ltr-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm transition-all';
          rtlBadge.className = 'dir-rtl-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium hover:text-[#142B45] dark:hover:text-[#F3F5F7] transition-all';
        }
      }
    });
  }

  function toggleDirection() {
    const currentDir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem('corvantis_dir', newDir);
    applyDirection(newDir);
  }

  function setDirection(newDir) {
    localStorage.setItem('corvantis_dir', newDir);
    applyDirection(newDir);
  }

  function bindDirectionListeners() {
    const current = getPreferredDirection();
    applyDirection(current);

    const toggleBtns = document.querySelectorAll('.direction-toggle-btn');
    toggleBtns.forEach((btn) => {
      if (!btn.dataset.dirBound) {
        btn.dataset.dirBound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleDirection();
        });
      }
    });

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

  document.addEventListener('DOMContentLoaded', () => {
    bindDirectionListeners();
  });

  window.corvantisToggleDirection = toggleDirection;
  window.corvantisSetDirection = setDirection;
  window.corvantisInitDirection = bindDirectionListeners;
})();
