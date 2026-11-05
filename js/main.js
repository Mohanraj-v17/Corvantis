/**
 * CORVANTIS - Main Application Scripts
 * Initializes Lucide icons, back-to-top handler, accordions, and interactive modals.
 */

(function () {
  'use strict';

  // Initialize Lucide Icons
  function initIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Back to Top Button
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    if (!btn.dataset.bttBound) {
      btn.dataset.bttBound = 'true';
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }, { passive: true });

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Accordion Component (Used in FAQs and Service expanders)
  function initAccordions() {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach((trigger) => {
      if (!trigger.dataset.accBound) {
        trigger.dataset.accBound = 'true';
        trigger.addEventListener('click', () => {
          const item = trigger.closest('.accordion-item');
          if (!item) return;

          const content = item.querySelector('.accordion-content');
          const icon = trigger.querySelector('.accordion-icon');
          const isOpen = !content.classList.contains('hidden');

          const parentGroup = item.closest('.accordion-group');
          if (parentGroup && parentGroup.dataset.single === 'true') {
            parentGroup.querySelectorAll('.accordion-item').forEach((sibling) => {
              if (sibling !== item) {
                const siblingContent = sibling.querySelector('.accordion-content');
                const siblingIcon = sibling.querySelector('.accordion-icon');
                if (siblingContent) siblingContent.classList.add('hidden');
                if (siblingIcon) siblingIcon.style.transform = 'rotate(0deg)';
                sibling.classList.remove('active-item');
              }
            });
          }

          if (isOpen) {
            content.classList.add('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
            item.classList.remove('active-item');
          } else {
            content.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
            item.classList.add('active-item');
          }
        });
      }
    });
  }

  // Resource / Article Preview Modal
  function initModalHandlers() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    modalTriggers.forEach((btn) => {
      if (!btn.dataset.modalBound) {
        btn.dataset.modalBound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('data-modal-target');
          const modal = document.getElementById(targetId);
          if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    });

    closeButtons.forEach((btn) => {
      if (!btn.dataset.closeBound) {
        btn.dataset.closeBound = 'true';
        btn.addEventListener('click', () => {
          const modal = btn.closest('.modal-backdrop');
          if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
          }
        });
      }
    });

    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach((backdrop) => {
      if (!backdrop.dataset.backdropBound) {
        backdrop.dataset.backdropBound = 'true';
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) {
            backdrop.classList.add('hidden');
            backdrop.classList.remove('flex');
            document.body.style.overflow = '';
          }
        });
      }
    });
  }

  // Expose methods globally for component loaders
  window.corvantisRefreshIcons = initIcons;
  window.corvantisInitBackToTop = initBackToTop;
  window.corvantisInitAll = initAll;

  // DOM Ready & Cache/Reload Guard
  function initAll() {
    initIcons();
    initBackToTop();
    initAccordions();
    initModalHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
