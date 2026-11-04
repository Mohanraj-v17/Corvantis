/**
 * CORVANTIS - Form Validation & Toast Notifications
 * Frontend validation for Contact Enquiry and Insights Newsletter.
 */

(function () {
  'use strict';

  // Toast Notification System
  function showToast(title, message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'corporate-toast';
    toast.setAttribute('role', 'alert');

    const iconSvg = type === 'success' 
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A46D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1">
        <h4 class="font-sans font-semibold text-sm leading-snug" style="color: var(--text-primary);">${title}</h4>
        <p class="font-sans text-xs mt-0.5 leading-relaxed" style="color: var(--text-muted);">${message}</p>
      </div>
      <button type="button" class="toast-close-btn opacity-60 hover:opacity-100 transition-opacity ml-2" aria-label="Close notification" style="color: var(--text-muted);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close-btn');
    closeBtn.addEventListener('click', () => {
      removeToast(toast);
    });

    const autoDismiss = setTimeout(() => {
      removeToast(toast);
    }, 6000);

    function removeToast(element) {
      clearTimeout(autoDismiss);
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px) scale(0.95)';
      element.style.transition = 'all 0.25s ease';
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 250);
    }
  }

  // Regex Patterns
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;

  function validateField(input, testFn, errorElement, errorMessage) {
    if (!testFn(input.value.trim())) {
      input.classList.add('is-invalid');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorElement) {
        errorElement.classList.remove('visible');
      }
      return true;
    }
  }

  function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    const fields = {
      fullName: {
        el: document.getElementById('full-name'),
        err: document.getElementById('err-full-name'),
        test: (v) => v.length >= 2,
        msg: 'Please enter your full name (minimum 2 characters).'
      },
      companyName: {
        el: document.getElementById('company-name'),
        err: document.getElementById('err-company-name'),
        test: (v) => v.length >= 2,
        msg: 'Please enter your registered company or organization name.'
      },
      email: {
        el: document.getElementById('business-email'),
        err: document.getElementById('err-business-email'),
        test: (v) => emailRegex.test(v),
        msg: 'Please provide a valid business email address.'
      },
      phone: {
        el: document.getElementById('phone-number'),
        err: document.getElementById('err-phone-number'),
        test: (v) => phoneRegex.test(v.replace(/\s+/g, '')),
        msg: 'Please enter a valid telephone or mobile number.'
      },
      service: {
        el: document.getElementById('service-required'),
        err: document.getElementById('err-service-required'),
        test: (v) => v !== '' && v !== 'Select an advisory service area',
        msg: 'Please select a relevant advisory service area.'
      },
      message: {
        el: document.getElementById('enquiry-message'),
        err: document.getElementById('err-enquiry-message'),
        test: (v) => v.length >= 15,
        msg: 'Please outline your advisory inquiry (minimum 15 characters).'
      }
    };

    // Live validation on blur
    Object.keys(fields).forEach((key) => {
      const item = fields[key];
      if (item.el) {
        item.el.addEventListener('blur', () => {
          validateField(item.el, item.test, item.err, item.msg);
        });
        item.el.addEventListener('input', () => {
          if (item.el.classList.contains('is-invalid')) {
            validateField(item.el, item.test, item.err, item.msg);
          }
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      Object.keys(fields).forEach((key) => {
        const item = fields[key];
        if (item.el) {
          const pass = validateField(item.el, item.test, item.err, item.msg);
          if (!pass) isValid = false;
        }
      });

      if (!isValid) {
        showToast('Incomplete Submission', 'Please correct the highlighted fields before proceeding.', 'error');
        return;
      }

      // Success Demonstration
      const refId = 'CRV-' + Math.floor(100000 + Math.random() * 900000);
      showToast(
        'Enquiry Validated Successfully', 
        `Your advisory request [Ref: ${refId}] has been validated. (Demonstration Mode: client-side test passed).`, 
        'success'
      );

      // Show confirmation box if present
      const successBox = document.getElementById('enquiry-success-message');
      if (successBox) {
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      form.reset();
    });
  }

  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const emailInput = document.getElementById('newsletter-email');
    const errorEl = document.getElementById('newsletter-error');

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('is-invalid')) {
          validateField(emailInput, (v) => emailRegex.test(v), errorEl, 'Please enter a valid email address.');
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput) return;

      const isValid = validateField(emailInput, (v) => emailRegex.test(v), errorEl, 'Please enter a valid email address.');
      
      if (!isValid) {
        showToast('Invalid Email', 'Please provide a valid corporate email address to receive briefings.', 'error');
        return;
      }

      showToast(
        'Subscription Confirmed', 
        'Thank you for subscribing to CORVANTIS Governance Insights. (Demonstration Mode: email validated).', 
        'success'
      );

      form.reset();
      if (errorEl) errorEl.classList.remove('visible');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEnquiryForm();
    initNewsletterForm();
  });

  window.corvantisToast = showToast;
})();
