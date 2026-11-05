/**
 * CORVANTIS - Navigation & Common Component Loader
 * Loads common navbar.html and footer.html across all pages, handles desktop Home dropdown,
 * desktop Services 3-column Mega Menu, mobile menu drawer with dual accordions,
 * active link highlighting, and sticky header scrolling.
 */

(function () {
  'use strict';

  // Subdirectory detection (dynamically evaluated for client-side SPA navigation)
  function checkIsInSubdir() {
    const p = window.location.pathname.replace(/\\/g, '/').toLowerCase();
    return p.includes('/services/');
  }

  // 12 Service Pages Registry
  const servicePages = [
    'corporate-governance.html',
    'board-governance.html',
    'board-effectiveness.html',
    'leadership-advisory.html',
    'regulatory-compliance.html',
    'audit-preparation.html',
    'compliance-reporting.html',
    'documentation-support.html',
    'risk-management.html',
    'internal-audit.html',
    'business-advisory.html',
    'strategic-advisory.html'
  ];

  // Fallback templates for offline / file:// protocol
  const fallbackNavbarHtml = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>CORVANTIS Global Navbar</title>\n</head>\n<body>\n<!-- ==========================================\n     CORVANTIS GLOBAL NAVBAR COMPONENT\n     Reusable across all pages via JavaScript.\n     Sticky, Premium, Brand Consistent, Home Dropdown.\n     ========================================== -->\n<header class=\"navbar-sticky\">\n  <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <div class=\"flex items-center justify-between h-20\">\n      \n      <!-- LEFT: Custom SVG Logo & Brand Typography (Matching Footer Logo & Proportions) -->\n      <a href=\"index.html\" class=\"flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D] rounded-sm\" aria-label=\"CORVANTIS Home\">\n        <svg class=\"w-9 h-9 shrink-0\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M34 10H18C13.5817 10 10 13.5817 10 18V30C10 34.4183 13.5817 38 18 38H34\" stroke=\"currentColor\" stroke-width=\"4.5\" stroke-linecap=\"round\" class=\"text-[#142B45] dark:text-[#F3F5F7]\" />\n          <path d=\"M22 14L31 34L40 14\" stroke=\"#C5A46D\" stroke-width=\"4.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n          <circle cx=\"31\" cy=\"20\" r=\"2.2\" fill=\"#C5A46D\" />\n        </svg>\n        <span class=\"brand-name font-serif text-xl font-bold tracking-[0.16em] text-[#142B45] dark:text-[#F3F5F7] leading-none\">CORVANTIS</span>\n      </a>\n\n      <!-- CENTER: Navigation Links (With Home Dropdown) - Full Desktop (>= 1280px) -->\n      <nav class=\"hidden xl:flex items-center space-x-7 rtl:space-x-reverse\" aria-label=\"Main Navigation\">\n        <!-- HOME DROPDOWN -->\n        <div class=\"relative dropdown-container\" id=\"home-dropdown-container\">\n          <button type=\"button\" \n                  id=\"home-dropdown-toggle\"\n                  class=\"nav-link text-sm font-medium tracking-wide inline-flex items-center gap-1.5 focus:outline-none cursor-pointer\"\n                  aria-expanded=\"false\" \n                  aria-haspopup=\"true\"\n                  aria-controls=\"home-dropdown-menu\">\n            <span>Home</span>\n            <i data-lucide=\"chevron-down\" class=\"w-3.5 h-3.5 transition-transform duration-200 dropdown-arrow\"></i>\n          </button>\n          \n          <div id=\"home-dropdown-menu\" \n               class=\"dropdown-menu absolute top-full left-0 rtl:left-auto rtl:right-0 pt-2 w-72 opacity-0 invisible translate-y-2 transition-all duration-200 z-50 pointer-events-none\"\n               role=\"menu\"\n               aria-labelledby=\"home-dropdown-toggle\">\n            <div class=\"bg-white dark:bg-[#1D2B38] border border-[#E2E8F0] dark:border-[#344454] rounded-xl shadow-2xl overflow-hidden divide-y divide-[#E2E8F0] dark:divide-[#344454]/60\">\n              <a href=\"index.html\" class=\"dropdown-item group/home-item flex items-center justify-between px-4 py-3.5 text-xs font-semibold text-[#253448] dark:text-[#F3F5F7] transition-all hover:bg-[#F4F6F8] dark:hover:bg-[#182430]\" role=\"menuitem\">\n                <div class=\"flex flex-col text-left rtl:text-right pr-2 rtl:pr-0 rtl:pl-2\">\n                  <div class=\"flex items-center gap-2\">\n                    <span class=\"home-title font-bold text-sm text-[#142B45] dark:text-[#F3F5F7] group-hover/home-item:text-[#C5A46D] transition-colors\">Home 1</span>\n                    <span class=\"home-badge hidden px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#C5A46D] text-white\">Active</span>\n                  </div>\n                  <span class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] font-normal mt-0.5\">Traditional Corporate Advisory</span>\n                </div>\n                <div class=\"home-indicator flex-shrink-0 text-[#C5A46D] opacity-0 transition-opacity\">\n                  <i data-lucide=\"check\" class=\"w-4 h-4\"></i>\n                </div>\n              </a>\n              <a href=\"home-2.html\" class=\"dropdown-item group/home-item flex items-center justify-between px-4 py-3.5 text-xs font-semibold text-[#253448] dark:text-[#F3F5F7] transition-all hover:bg-[#F4F6F8] dark:hover:bg-[#182430]\" role=\"menuitem\">\n                <div class=\"flex flex-col text-left rtl:text-right pr-2 rtl:pr-0 rtl:pl-2\">\n                  <div class=\"flex items-center gap-2\">\n                    <span class=\"home-title font-bold text-sm text-[#142B45] dark:text-[#F3F5F7] group-hover/home-item:text-[#C5A46D] transition-colors\">Home 2</span>\n                    <span class=\"home-badge hidden px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#C5A46D] text-white\">Active</span>\n                  </div>\n                  <span class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] font-normal mt-0.5\">Modern Editorial Layout</span>\n                </div>\n                <div class=\"home-indicator flex-shrink-0 text-[#C5A46D] opacity-0 transition-opacity\">\n                  <i data-lucide=\"check\" class=\"w-4 h-4\"></i>\n                </div>\n              </a>\n            </div>\n          </div>\n        </div>\n\n        <a href=\"about.html\" class=\"nav-link text-sm font-medium tracking-wide\">About Us</a>\n\n        <!-- SERVICES 3-COLUMN MEGA MENU DROPDOWN -->\n        <div class=\"relative dropdown-container\" id=\"services-dropdown-container\">\n          <button type=\"button\" \n                  id=\"services-dropdown-toggle\"\n                  class=\"nav-link text-sm font-medium tracking-wide inline-flex items-center gap-1.5 focus:outline-none cursor-pointer\"\n                  aria-expanded=\"false\" \n                  aria-haspopup=\"true\"\n                  aria-controls=\"services-dropdown-menu\">\n            <span>Services</span>\n            <i data-lucide=\"chevron-down\" class=\"w-3.5 h-3.5 transition-transform duration-200 dropdown-arrow\"></i>\n          </button>\n          \n          <div id=\"services-dropdown-menu\" \n               class=\"mega-menu absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[880px] lg:w-[960px] opacity-0 invisible translate-y-2 transition-all duration-200 z-50 pointer-events-none\"\n               role=\"menu\"\n               aria-labelledby=\"services-dropdown-toggle\">\n            <div class=\"bg-white dark:bg-[#1D2B38] border border-[#E2E8F0] dark:border-[#344454] rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden\">\n              \n              <!-- Top Header Bar of Mega Menu -->\n              <div class=\"flex items-center justify-between pb-4 mb-5 border-b border-[#E2E8F0] dark:border-[#344454]/60\">\n                <div class=\"flex items-center gap-2\">\n                  <span class=\"w-2 h-2 rounded-full bg-[#C5A46D]\"></span>\n                  <span class=\"text-xs uppercase font-bold tracking-[0.16em] text-[#142B45] dark:text-[#F3F5F7]\">Specialized Advisory Practices</span>\n                </div>\n                <a href=\"services.html\" class=\"text-xs font-semibold text-[#C5A46D] hover:text-[#B59359] inline-flex items-center gap-1 uppercase tracking-wider transition-colors\">\n                  <span>Explore Full Directory</span>\n                  <i data-lucide=\"arrow-right\" class=\"w-3.5 h-3.5 rtl-flip\"></i>\n                </a>\n              </div>\n\n              <!-- 3 Equal Columns with Vertical Dividers -->\n              <div class=\"grid grid-cols-3 gap-6 divide-x divide-[#E2E8F0] dark:divide-[#344454]/60 rtl:divide-x-reverse text-left rtl:text-right\">\n                \n                <!-- Column 1: Governance & Board -->\n                <div class=\"pr-4 rtl:pr-0 rtl:pl-4 space-y-2.5\">\n                  <div class=\"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A46D] mb-3\">\n                    <i data-lucide=\"landmark\" class=\"w-4 h-4\"></i>\n                    <span>Governance &amp; Board</span>\n                  </div>\n                  \n                  <a href=\"services/corporate-governance.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Corporate Governance</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Framework design, fiduciary policies &amp; accountability.</p>\n                  </a>\n\n                  <a href=\"services/board-governance.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Board Governance</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Composition, committee charters &amp; board meetings.</p>\n                  </a>\n\n                  <a href=\"services/board-effectiveness.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Board Effectiveness</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Performance reviews, dynamics &amp; decision-making.</p>\n                  </a>\n\n                  <a href=\"services/leadership-advisory.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Leadership Advisory</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Executive succession, stewardship &amp; accountability.</p>\n                  </a>\n                </div>\n\n                <!-- Column 2: Compliance & Audit -->\n                <div class=\"px-4 space-y-2.5\">\n                  <div class=\"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A46D] mb-3\">\n                    <i data-lucide=\"file-check-2\" class=\"w-4 h-4\"></i>\n                    <span>Compliance &amp; Audit</span>\n                  </div>\n\n                  <a href=\"services/regulatory-compliance.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Regulatory Compliance</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Cross-border statutory mapping &amp; surveillance.</p>\n                  </a>\n\n                  <a href=\"services/audit-preparation.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Audit Preparation</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Pre-audit testing, gap remediation &amp; readiness sprints.</p>\n                  </a>\n\n                  <a href=\"services/compliance-reporting.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Compliance Reporting</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Statutory disclosures, data management &amp; filings.</p>\n                  </a>\n\n                  <a href=\"services/documentation-support.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Documentation Support</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Policy manuals, evidentiary vaults &amp; records control.</p>\n                  </a>\n                </div>\n\n                <!-- Column 3: Risk & Advisory -->\n                <div class=\"pl-4 rtl:pl-0 rtl:pr-4 space-y-2.5\">\n                  <div class=\"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A46D] mb-3\">\n                    <i data-lucide=\"shield-alert\" class=\"w-4 h-4\"></i>\n                    <span>Risk &amp; Advisory</span>\n                  </div>\n\n                  <a href=\"services/risk-management.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Risk Management</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Enterprise risk assessments, mitigation &amp; monitoring.</p>\n                  </a>\n\n                  <a href=\"services/internal-audit.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Internal Audit</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Control reviews, process audits &amp; remediation tracking.</p>\n                  </a>\n\n                  <a href=\"services/business-advisory.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Business Advisory</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Operational improvement, transformation &amp; capability.</p>\n                  </a>\n\n                  <a href=\"services/strategic-advisory.html\" class=\"group/item block p-2.5 rounded-lg hover:bg-[#F4F6F8] dark:hover:bg-[#182430] transition-colors\">\n                    <div class=\"text-xs font-bold text-[#142B45] dark:text-[#F3F5F7] group-hover/item:text-[#C5A46D] transition-colors flex items-center justify-between\">\n                      <span>Strategic Advisory</span>\n                      <i data-lucide=\"chevron-right\" class=\"w-3 h-3 text-[#C5A46D] opacity-0 group-hover/item:opacity-100 transition-opacity rtl-flip\"></i>\n                    </div>\n                    <p class=\"text-[11px] text-[#718096] dark:text-[#A5B1BE] mt-0.5 leading-snug\">Corporate strategy, transaction due diligence &amp; valuation.</p>\n                  </a>\n                </div>\n\n              </div>\n\n            </div>\n          </div>\n        </div>\n        <a href=\"case-studies.html\" class=\"nav-link text-sm font-medium tracking-wide\">Case Studies</a>\n        <a href=\"insights.html\" class=\"nav-link text-sm font-medium tracking-wide\">Insights</a>\n        <a href=\"contact.html\" class=\"nav-link text-sm font-medium tracking-wide\">Contact Us</a>\n      </nav>\n\n      <!-- RIGHT: Desktop Controls (>= 1280px) -->\n      <div class=\"hidden xl:flex items-center space-x-3 rtl:space-x-reverse\">\n        <!-- Dark/Light Theme Toggle (Dual Pill: Sun & Moon always visible) -->\n        <button type=\"button\" class=\"theme-toggle-btn h-9 w-[88px] p-0.5 rounded-md border border-[#E2E8F0] dark:border-[#344454] bg-[#F4F6F8] dark:bg-[#1D2B38] grid grid-cols-2 text-xs font-semibold hover:border-[#C5A46D] transition-colors focus:outline-none cursor-pointer\" aria-label=\"Toggle Dark/Light theme\" title=\"Toggle theme\">\n          <span class=\"theme-light-indicator active flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm\" title=\"Light Mode\">\n            <svg class=\"w-3.5 h-3.5 pointer-events-none\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>\n          </span>\n          <span class=\"theme-dark-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium\" title=\"Dark Mode\">\n            <svg class=\"w-3.5 h-3.5 pointer-events-none\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/></svg>\n          </span>\n        </button>\n\n        <!-- LTR / RTL Toggle (Exact Match Size) -->\n        <button type=\"button\" class=\"direction-toggle-btn h-9 w-[88px] p-0.5 rounded-md border border-[#E2E8F0] dark:border-[#344454] bg-[#F4F6F8] dark:bg-[#1D2B38] grid grid-cols-2 text-xs font-semibold hover:border-[#C5A46D] transition-colors focus:outline-none cursor-pointer\" aria-label=\"Toggle layout direction\" title=\"Toggle LTR / RTL\">\n          <span class=\"dir-ltr-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm\" title=\"Left to Right\">LTR</span>\n          <span class=\"dir-rtl-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium\" title=\"Right to Left\">RTL</span>\n        </button>\n\n        <!-- Get In Touch CTA -->\n        <a href=\"contact.html\" class=\"btn-gold h-9 ml-1 text-xs uppercase tracking-wider px-4 inline-flex items-center justify-center gap-1.5\">\n          <span>Get in Touch</span>\n          <i data-lucide=\"arrow-up-right\" class=\"w-3.5 h-3.5 rtl-flip\"></i>\n        </a>\n      </div>\n\n      <!-- Mobile & Tablet Menu Controls (< 1280px, including 1024px) -->\n      <div class=\"flex xl:hidden items-center space-x-2.5 rtl:space-x-reverse\">\n        <!-- Hamburger Menu Button -->\n        <button type=\"button\" id=\"mobile-menu-toggle\" class=\"w-9 h-9 p-0 flex items-center justify-center rounded-md border border-[#E2E8F0] dark:border-[#344454] bg-white dark:bg-[#1D2B38] text-[#142B45] dark:text-[#F3F5F7] focus:outline-none cursor-pointer\" aria-expanded=\"false\" aria-label=\"Open navigation menu\">\n          <i data-lucide=\"menu\" class=\"w-5 h-5\"></i>\n        </button>\n      </div>\n\n    </div>\n  </div>\n</header>\n\n<!-- MOBILE & TABLET MENU BACKDROP -->\n<div id=\"mobile-menu-backdrop\" class=\"xl:hidden\" aria-hidden=\"true\"></div>\n\n<!-- MOBILE & TABLET FULL-SCREEN MENU DRAWER -->\n<aside id=\"mobile-menu-drawer\" class=\"fixed inset-0 w-screen h-screen z-[9999] bg-white dark:bg-[#101820] flex flex-col justify-between overflow-y-auto xl:hidden\" aria-label=\"Navigation Menu\">\n  <div class=\"max-w-xl mx-auto w-full min-h-full flex flex-col justify-between p-6 pb-16 sm:p-10 sm:pb-20\">\n    <div>\n      <!-- Drawer Header -->\n      <div class=\"flex items-center justify-between pb-6 border-b border-[#E2E8F0] dark:border-[#344454]\">\n        <div class=\"flex items-center gap-3\">\n          <svg class=\"w-8 h-8 shrink-0\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M34 10H18C13.5817 10 10 13.5817 10 18V30C10 34.4183 13.5817 38 18 38H34\" stroke=\"currentColor\" stroke-width=\"4.5\" stroke-linecap=\"round\" class=\"text-[#142B45] dark:text-[#F3F5F7]\" />\n            <path d=\"M22 14L31 34L40 14\" stroke=\"#C5A46D\" stroke-width=\"4.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n            <circle cx=\"31\" cy=\"20\" r=\"2.2\" fill=\"#C5A46D\" />\n          </svg>\n          <span class=\"font-serif font-bold text-xl text-[#142B45] dark:text-[#F3F5F7] tracking-[0.16em]\">CORVANTIS</span>\n        </div>\n        <!-- Close Menu Button -->\n        <button type=\"button\" id=\"mobile-menu-close\" class=\"w-9 h-9 rounded-md border border-[#E2E8F0] dark:border-[#344454] bg-[#F4F6F8] dark:bg-[#1D2B38] flex items-center justify-center text-[#718096] dark:text-[#A5B1BE] hover:text-[#142B45] dark:hover:text-white transition-colors cursor-pointer\" aria-label=\"Close menu\">\n          <i data-lucide=\"x\" class=\"w-5 h-5\"></i>\n        </button>\n      </div>\n\n      <!-- Navigation Links -->\n      <nav class=\"flex flex-col space-y-3 mt-8\">\n        <!-- MOBILE HOME ACCORDION -->\n        <div class=\"mobile-dropdown-container border-b border-[#E2E8F0]/70 dark:border-[#344454]/70 pb-3\">\n          <button type=\"button\" \n                  id=\"mobile-home-toggle\"\n                  class=\"mobile-nav-link w-full flex items-center justify-between font-serif text-xl sm:text-2xl font-bold text-[#142B45] dark:text-[#F3F5F7] transition-colors py-2 cursor-pointer\"\n                  aria-expanded=\"false\" \n                  aria-controls=\"mobile-home-submenu\">\n            <span class=\"flex items-center gap-3\">Home</span>\n            <i data-lucide=\"chevron-down\" class=\"w-5 h-5 transition-transform duration-200 mobile-arrow text-[#C5A46D]\"></i>\n          </button>\n          <div id=\"mobile-home-submenu\" class=\"hidden flex-col pl-4 rtl:pr-4 rtl:pl-0 space-y-2 mt-2 mb-2 border-l-2 rtl:border-r-2 rtl:border-l-0 border-[#C5A46D]\">\n            <a href=\"index.html\" class=\"mobile-sublink block text-sm sm:text-base font-medium text-[#718096] dark:text-[#A5B1BE] py-1.5 transition-colors\">\n              <span>Home 1 – Corporate Advisory</span>\n            </a>\n            <a href=\"home-2.html\" class=\"mobile-sublink block text-sm sm:text-base font-medium text-[#718096] dark:text-[#A5B1BE] py-1.5 transition-colors\">\n              <span>Home 2 – Modern Editorial</span>\n            </a>\n          </div>\n        </div>\n\n        <a href=\"about.html\" class=\"mobile-nav-link font-serif text-xl sm:text-2xl font-bold text-[#142B45] dark:text-[#F3F5F7] transition-colors py-3 border-b border-[#E2E8F0]/70 dark:border-[#344454]/70 flex items-center justify-between\">\n          <span>About Us</span>\n          <i data-lucide=\"arrow-right\" class=\"w-4 h-4 text-[#C5A46D] rtl-flip opacity-70\"></i>\n        </a>\n        <!-- MOBILE SERVICES ACCORDION -->\n        <div class=\"mobile-dropdown-container border-b border-[#E2E8F0]/70 dark:border-[#344454]/70 pb-3\">\n          <button type=\"button\" \n                  id=\"mobile-services-toggle\"\n                  class=\"mobile-nav-link w-full flex items-center justify-between font-serif text-xl sm:text-2xl font-bold text-[#142B45] dark:text-[#F3F5F7] transition-colors py-2 cursor-pointer\"\n                  aria-expanded=\"false\" \n                  aria-controls=\"mobile-services-submenu\">\n            <span class=\"flex items-center gap-3\">Services</span>\n            <i data-lucide=\"chevron-down\" class=\"w-5 h-5 transition-transform duration-200 mobile-arrow text-[#C5A46D]\"></i>\n          </button>\n          <div id=\"mobile-services-submenu\" class=\"hidden flex-col pl-4 rtl:pr-4 rtl:pl-0 space-y-4 mt-2 mb-2 border-l-2 rtl:border-r-2 rtl:border-l-0 border-[#C5A46D]\">\n            \n            <a href=\"services.html\" class=\"mobile-sublink flex items-center justify-between text-xs uppercase font-bold text-[#C5A46D] py-1 border-b border-[#E2E8F0]/40 dark:border-[#344454]/40\">\n              <span>All Services Overview</span>\n              <i data-lucide=\"arrow-right\" class=\"w-3.5 h-3.5 rtl-flip\"></i>\n            </a>\n\n            <!-- Group 1 -->\n            <div>\n              <span class=\"text-[10px] font-bold uppercase tracking-wider text-[#C5A46D] block mb-1\">Governance &amp; Board</span>\n              <div class=\"space-y-1.5 pl-2 rtl:pr-2 rtl:pl-0\">\n                <a href=\"services/corporate-governance.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Corporate Governance</a>\n                <a href=\"services/board-governance.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Board Governance</a>\n                <a href=\"services/board-effectiveness.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Board Effectiveness</a>\n                <a href=\"services/leadership-advisory.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Leadership Advisory</a>\n              </div>\n            </div>\n\n            <!-- Group 2 -->\n            <div>\n              <span class=\"text-[10px] font-bold uppercase tracking-wider text-[#C5A46D] block mb-1\">Compliance &amp; Audit</span>\n              <div class=\"space-y-1.5 pl-2 rtl:pr-2 rtl:pl-0\">\n                <a href=\"services/regulatory-compliance.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Regulatory Compliance</a>\n                <a href=\"services/audit-preparation.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Audit Preparation</a>\n                <a href=\"services/compliance-reporting.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Compliance Reporting</a>\n                <a href=\"services/documentation-support.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Documentation Support</a>\n              </div>\n            </div>\n\n            <!-- Group 3 -->\n            <div>\n              <span class=\"text-[10px] font-bold uppercase tracking-wider text-[#C5A46D] block mb-1\">Risk &amp; Advisory</span>\n              <div class=\"space-y-1.5 pl-2 rtl:pr-2 rtl:pl-0\">\n                <a href=\"services/risk-management.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Risk Management</a>\n                <a href=\"services/internal-audit.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Internal Audit</a>\n                <a href=\"services/business-advisory.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Business Advisory</a>\n                <a href=\"services/strategic-advisory.html\" class=\"mobile-sublink block text-sm font-medium text-[#253448] dark:text-[#F3F5F7] py-0.5\">Strategic Advisory</a>\n              </div>\n            </div>\n\n          </div>\n        </div>\n        <a href=\"case-studies.html\" class=\"mobile-nav-link font-serif text-xl sm:text-2xl font-bold text-[#142B45] dark:text-[#F3F5F7] transition-colors py-3 border-b border-[#E2E8F0]/70 dark:border-[#344454]/70 flex items-center justify-between\">\n          <span>Case Studies</span>\n          <i data-lucide=\"arrow-right\" class=\"w-4 h-4 text-[#C5A46D] rtl-flip opacity-70\"></i>\n        </a>\n        <a href=\"insights.html\" class=\"mobile-nav-link font-serif text-xl sm:text-2xl font-bold text-[#142B45] dark:text-[#F3F5F7] transition-colors py-3 border-b border-[#E2E8F0]/70 dark:border-[#344454]/70 flex items-center justify-between\">\n          <span>Insights</span>\n          <i data-lucide=\"arrow-right\" class=\"w-4 h-4 text-[#C5A46D] rtl-flip opacity-70\"></i>\n        </a>\n        <a href=\"contact.html\" class=\"mobile-nav-link font-serif text-xl sm:text-2xl font-bold text-[#142B45] dark:text-[#F3F5F7] transition-colors py-3 border-b border-[#E2E8F0]/70 dark:border-[#344454]/70 flex items-center justify-between\">\n          <span>Contact Us</span>\n          <i data-lucide=\"arrow-right\" class=\"w-4 h-4 text-[#C5A46D] rtl-flip opacity-70\"></i>\n        </a>\n      </nav>\n    </div>\n\n    <!-- Drawer Footer Controls (Theme, Direction & CTA) -->\n    <div class=\"pt-5 pb-6 border-t border-[#E2E8F0] dark:border-[#344454] space-y-3 mb-2\">\n      <!-- THEME MODE ROW -->\n      <div class=\"drawer-control-box flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454]\">\n        <div class=\"flex items-center gap-2\">\n          <svg class=\"w-4 h-4 text-[#C5A46D] shrink-0\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>\n          <span class=\"drawer-control-label text-xs uppercase font-bold text-[#142B45] dark:text-[#F3F5F7] tracking-wider\">Theme</span>\n        </div>\n        <button type=\"button\" class=\"theme-toggle-btn w-[92px] h-[34px] p-0.5 rounded-md border border-[#E2E8F0] dark:border-[#344454] bg-[#FFFFFF] dark:bg-[#1D2B38] grid grid-cols-2 text-xs font-semibold focus:outline-none cursor-pointer shrink-0\" aria-label=\"Toggle Dark/Light theme\" title=\"Toggle theme\">\n          <span class=\"theme-light-indicator active flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm\" title=\"Light Mode\">\n            <svg class=\"w-3.5 h-3.5 pointer-events-none\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>\n          </span>\n          <span class=\"theme-dark-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium\" title=\"Dark Mode\">\n            <svg class=\"w-3.5 h-3.5 pointer-events-none\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/></svg>\n          </span>\n        </button>\n      </div>\n\n      <!-- DIRECTION ROW -->\n      <div class=\"drawer-control-box flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454]\">\n        <div class=\"flex items-center gap-2\">\n          <svg class=\"w-4 h-4 text-[#C5A46D] shrink-0\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m5 8 6 6\"/><path d=\"m4 14 6-6 2-3\"/><path d=\"M2 5h12\"/><path d=\"M7 2h1\"/><path d=\"m22 22-5-10-5 10\"/><path d=\"M14 18h6\"/></svg>\n          <span class=\"drawer-control-label text-xs uppercase font-bold text-[#142B45] dark:text-[#F3F5F7] tracking-wider\">Layout</span>\n        </div>\n        <button type=\"button\" class=\"direction-toggle-btn w-[92px] h-[34px] p-0.5 rounded-md border border-[#E2E8F0] dark:border-[#344454] bg-[#FFFFFF] dark:bg-[#1D2B38] grid grid-cols-2 text-xs font-semibold focus:outline-none cursor-pointer shrink-0\" aria-label=\"Toggle layout direction\" title=\"Toggle LTR / RTL\">\n          <span class=\"dir-ltr-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase bg-[#C5A46D] text-white font-bold shadow-sm\" title=\"Left to Right\">LTR</span>\n          <span class=\"dir-rtl-indicator flex items-center justify-center h-full rounded text-[0.7rem] uppercase text-[#718096] dark:text-[#A5B1BE] font-medium\" title=\"Right to Left\">RTL</span>\n        </button>\n      </div>\n\n      <!-- GET IN TOUCH CTA -->\n      <a href=\"contact.html\" class=\"btn-gold w-full text-center py-3.5 text-xs uppercase tracking-wider justify-center shadow-md font-bold mt-2\">\n        <span>Get in Touch</span>\n        <i data-lucide=\"arrow-up-right\" class=\"w-4 h-4 rtl-flip\"></i>\n      </a>\n    </div>\n  </div>\n</aside>\n</body>\n</html>";

  const fallbackFooterHtml = "<!-- ==========================================\n     CORVANTIS GLOBAL FOOTER COMPONENT\n     Reusable across all pages via JavaScript.\n     Brand + Quick Links + 3 Service Categories (All 12 Services) + Contact + Copyright.\n     ========================================== -->\n<footer class=\"bg-[#F8F9FA] dark:bg-[#101820] text-[#4A5568] dark:text-[#A5B1BE] border-t border-[#E2E8F0] dark:border-[#344454] pt-16 pb-12\" aria-label=\"Corporate Footer\">\n  <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#E2E8F0] dark:border-[#344454]\">\n      \n      <!-- Column 1: Brand & Identity (3 Cols) -->\n      <div class=\"lg:col-span-3\">\n        <a href=\"index.html\" class=\"flex items-center gap-3 mb-5 focus:outline-none group\" aria-label=\"CORVANTIS Home\">\n          <svg class=\"w-9 h-9 shrink-0\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M34 10H18C13.5817 10 10 13.5817 10 18V30C10 34.4183 13.5817 38 18 38H34\" stroke=\"currentColor\" stroke-width=\"4.5\" stroke-linecap=\"round\" class=\"text-[#142B45] dark:text-[#F3F5F7]\" />\n            <path d=\"M22 14L31 34L40 14\" stroke=\"#C5A46D\" stroke-width=\"4.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n            <circle cx=\"31\" cy=\"20\" r=\"2.2\" fill=\"#C5A46D\" />\n          </svg>\n          <span class=\"brand-name font-serif text-xl font-bold tracking-[0.16em] text-[#142B45] dark:text-[#F3F5F7] leading-none\">CORVANTIS</span>\n        </a>\n\n        <p class=\"text-xs text-[#718096] dark:text-[#A5B1BE] leading-relaxed mb-6\">\n          CORVANTIS provides strategic corporate governance, regulatory compliance, board advisory, and audit readiness solutions to empower organizations with institutional trust, transparency, and sustainable oversight.\n        </p>\n\n        <!-- Social Channels -->\n        <div class=\"flex items-center space-x-2.5 rtl:space-x-reverse flex-wrap gap-y-2 mb-6\">\n          <a href=\"https://linkedin.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-md bg-white dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454] flex items-center justify-center text-[#142B45] dark:text-[#F3F5F7] hover:border-[#C5A46D] hover:text-[#C5A46D] dark:hover:border-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors shadow-sm\" aria-label=\"LinkedIn\">\n            <svg class=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z\"/></svg>\n          </a>\n          <a href=\"https://twitter.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-md bg-white dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454] flex items-center justify-center text-[#142B45] dark:text-[#F3F5F7] hover:border-[#C5A46D] hover:text-[#C5A46D] dark:hover:border-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors shadow-sm\" aria-label=\"Twitter\">\n            <svg class=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"/></svg>\n          </a>\n          <a href=\"https://youtube.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-md bg-white dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454] flex items-center justify-center text-[#142B45] dark:text-[#F3F5F7] hover:border-[#C5A46D] hover:text-[#C5A46D] dark:hover:border-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors shadow-sm\" aria-label=\"YouTube\">\n            <svg class=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z\"/></svg>\n          </a>\n          <a href=\"https://instagram.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-md bg-white dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454] flex items-center justify-center text-[#142B45] dark:text-[#F3F5F7] hover:border-[#C5A46D] hover:text-[#C5A46D] dark:hover:border-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors shadow-sm\" aria-label=\"Instagram\">\n            <svg class=\"w-3.5 h-3.5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\" ry=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"/></svg>\n          </a>\n          <a href=\"https://facebook.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-8 h-8 rounded-md bg-white dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454] flex items-center justify-center text-[#142B45] dark:text-[#F3F5F7] hover:border-[#C5A46D] hover:text-[#C5A46D] dark:hover:border-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors shadow-sm\" aria-label=\"Facebook\">\n            <svg class=\"w-3.5 h-3.5 fill-current\" viewBox=\"0 0 24 24\"><path d=\"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z\"/></svg>\n          </a>\n        </div>\n      </div>\n\n      <!-- Column 2: Quick Links (2 Cols) -->\n      <div class=\"lg:col-span-2\">\n        <h4 class=\"font-serif font-semibold text-sm text-[#142B45] dark:text-[#F3F5F7] tracking-wider uppercase mb-4\">Quick Links</h4>\n        <ul class=\"space-y-2 text-xs\">\n          <li><a href=\"index.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Home</a></li>\n          <li><a href=\"about.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">About Us</a></li>\n          <li><a href=\"services.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors font-medium text-[#C5A46D]\">Services Overview</a></li>\n          <li><a href=\"case-studies.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Case Studies</a></li>\n          <li><a href=\"insights.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Insights</a></li>\n          <li><a href=\"contact.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Contact Us</a></li>\n        </ul>\n      </div>\n\n      <!-- Column 3: Category 1 - Governance & Board (2 Cols) -->\n      <div class=\"lg:col-span-2\">\n        <h4 class=\"font-serif font-semibold text-sm text-[#142B45] dark:text-[#F3F5F7] tracking-wider uppercase mb-4\">Governance</h4>\n        <ul class=\"space-y-2 text-xs\">\n          <li><a href=\"services/corporate-governance.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Corporate Governance</a></li>\n          <li><a href=\"services/board-governance.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Board Governance</a></li>\n          <li><a href=\"services/board-effectiveness.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Board Effectiveness</a></li>\n          <li><a href=\"services/leadership-advisory.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Leadership Advisory</a></li>\n        </ul>\n      </div>\n\n      <!-- Column 4: Category 2 - Compliance & Audit (2.5 Cols) -->\n      <div class=\"lg:col-span-2\">\n        <h4 class=\"font-serif font-semibold text-sm text-[#142B45] dark:text-[#F3F5F7] tracking-wider uppercase mb-4\">Compliance</h4>\n        <ul class=\"space-y-2 text-xs\">\n          <li><a href=\"services/regulatory-compliance.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Regulatory Compliance</a></li>\n          <li><a href=\"services/audit-preparation.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Audit Preparation</a></li>\n          <li><a href=\"services/compliance-reporting.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Compliance Reporting</a></li>\n          <li><a href=\"services/documentation-support.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Documentation Support</a></li>\n        </ul>\n      </div>\n\n      <!-- Column 5: Category 3 - Risk & Advisory + Contact Desk (3 Cols) -->\n      <div class=\"lg:col-span-3\">\n        <h4 class=\"font-serif font-semibold text-sm text-[#142B45] dark:text-[#F3F5F7] tracking-wider uppercase mb-4\">Risk &amp; Advisory</h4>\n        <ul class=\"space-y-2 text-xs mb-5\">\n          <li><a href=\"services/risk-management.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Risk Management</a></li>\n          <li><a href=\"services/internal-audit.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Internal Audit</a></li>\n          <li><a href=\"services/business-advisory.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Business Advisory</a></li>\n          <li><a href=\"services/strategic-advisory.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Strategic Advisory</a></li>\n        </ul>\n\n        <div class=\"p-3 rounded-lg bg-white dark:bg-[#182430] border border-[#E2E8F0] dark:border-[#344454] space-y-1.5 text-xs\">\n          <div class=\"flex items-center gap-2 text-[#142B45] dark:text-[#F3F5F7] font-semibold\">\n            <i data-lucide=\"mail\" class=\"w-3.5 h-3.5 text-[#C5A46D]\"></i>\n            <span>advisory@corvantis-demo.com</span>\n          </div>\n          <div class=\"flex items-center gap-2 text-[#718096] dark:text-[#A5B1BE]\">\n            <i data-lucide=\"phone\" class=\"w-3.5 h-3.5 text-[#C5A46D]\"></i>\n            <span>+1 (800) 555-CORV</span>\n          </div>\n          <a href=\"https://www.google.com/maps?q=12.7286883,77.8245636\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex items-start gap-2 text-[#718096] dark:text-[#A5B1BE] hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors leading-tight pt-1 border-t border-[#E2E8F0]/50 dark:border-[#344454]/50\">\n            <i data-lucide=\"map-pin\" class=\"w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5\"></i>\n            <span>Corvantis Corporate Governance &amp; Compliance Advisory</span>\n          </a>\n        </div>\n      </div>\n\n    </div>\n\n    <!-- Bottom Bar: Copyright & Terms -->\n    <div class=\"pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#718096] dark:text-[#718096] gap-4\">\n      <div>\n        &copy; 2026 CORVANTIS Corporate Governance &amp; Compliance Advisory. All rights reserved.\n      </div>\n      <div class=\"flex items-center space-x-6 rtl:space-x-reverse\">\n        <a href=\"contact.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Privacy Policy</a>\n        <a href=\"contact.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Terms of Advisory</a>\n        <a href=\"contact.html\" class=\"hover:text-[#C5A46D] dark:hover:text-[#C5A46D] transition-colors\">Statutory Disclosures</a>\n      </div>\n    </div>\n  </div>\n</footer>\n\n<!-- Floating Back to Top Button -->\n<button type=\"button\" id=\"back-to-top\" aria-label=\"Back to top of page\">\n  <i data-lucide=\"chevron-up\" class=\"w-5 h-5\"></i>\n</button>";

  // Adjust links inside container if rendered inside a subdirectory (e.g., /services/)
  function normalizeLinks(container) {
    if (!container) return;
    const inSub = checkIsInSubdir();
    const links = container.querySelectorAll('a[href]');
    links.forEach((link) => {
      let href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }
      if (href.startsWith('#')) return;

      // Remember canonical root-relative path
      if (!link.dataset.canonHref) {
        let clean = href;
        if (clean.startsWith('../')) {
          clean = clean.replace(/^\.\.\//, '');
        }
        link.dataset.canonHref = clean;
      }

      const canon = link.dataset.canonHref;
      if (inSub) {
        if (canon.startsWith('services/')) {
          link.setAttribute('href', canon.replace(/^services\//, ''));
        } else {
          link.setAttribute('href', '../' + canon);
        }
      } else {
        link.setAttribute('href', canon);
      }
    });
  }

  function normalizeAllDocumentLinks() {
    normalizeLinks(document.querySelector('header'));
    normalizeLinks(document.getElementById('mobile-menu-drawer'));
    normalizeLinks(document.querySelector('footer'));
    normalizeLinks(document.querySelector('main'));
  }

  // Fetch component file with clean parsing and fallback
  async function loadComponent(placeholderId, fileName, fallbackHtml) {
    const el = document.getElementById(placeholderId);
    if (!el) return false;

    // If it already has rendered content, do not overwrite
    if (el.children.length > 0) return true;

    const fetchPath = checkIsInSubdir() ? ('../' + fileName) : fileName;

    try {
      if (window.location.protocol.startsWith('http')) {
        const response = await fetch(fetchPath);
        if (response.ok) {
          const text = await response.text();
          if (text) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            if (placeholderId === 'navbar-placeholder') {
              const headerEl = doc.querySelector('header');
              const backdropEl = doc.querySelector('#mobile-menu-backdrop');
              const drawerEl = doc.querySelector('#mobile-menu-drawer');

              if (headerEl && drawerEl) {
                normalizeLinks(headerEl);
                normalizeLinks(drawerEl);

                // Synchronize theme & direction toggle buttons before DOM injection to eliminate delay
                const activeTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
                if (window.corvantisUpdateThemeButtons) {
                  window.corvantisUpdateThemeButtons(activeTheme, headerEl);
                  window.corvantisUpdateThemeButtons(activeTheme, drawerEl);
                }
                if (window.corvantisUpdateDirectionButtons) {
                  window.corvantisUpdateDirectionButtons(activeDir, headerEl);
                  window.corvantisUpdateDirectionButtons(activeDir, drawerEl);
                }

                el.innerHTML = headerEl.outerHTML;

                const oldBackdrop = document.getElementById('mobile-menu-backdrop');
                if (oldBackdrop) oldBackdrop.remove();
                const oldDrawer = document.getElementById('mobile-menu-drawer');
                if (oldDrawer) oldDrawer.remove();

                if (backdropEl) document.body.appendChild(backdropEl);
                document.body.appendChild(drawerEl);

                // Re-sync all live DOM buttons immediately after append
                if (window.corvantisUpdateThemeButtons) {
                  window.corvantisUpdateThemeButtons(activeTheme);
                }
                if (window.corvantisUpdateDirectionButtons) {
                  window.corvantisUpdateDirectionButtons(activeDir);
                }
                return true;
              }
            } else if (placeholderId === 'footer-placeholder') {
              const footerEl = doc.querySelector('footer');
              const backToTopEl = doc.querySelector('#back-to-top');

              if (footerEl) {
                normalizeLinks(footerEl);
                el.innerHTML = footerEl.outerHTML + (backToTopEl ? backToTopEl.outerHTML : '');
                return true;
              }
            }
          }
        }
      }
    } catch (e) {
      // Fetch prevented by CORS or network error, fallback gracefully
    }

    // Use built-in fallback template
    const parser = new DOMParser();
    const doc = parser.parseFromString(fallbackHtml, 'text/html');

    if (placeholderId === 'navbar-placeholder') {
      const headerEl = doc.querySelector('header');
      const backdropEl = doc.querySelector('#mobile-menu-backdrop');
      const drawerEl = doc.querySelector('#mobile-menu-drawer');

      if (headerEl && drawerEl) {
        normalizeLinks(headerEl);
        normalizeLinks(drawerEl);

        const activeTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
        if (window.corvantisUpdateThemeButtons) {
          window.corvantisUpdateThemeButtons(activeTheme, headerEl);
          window.corvantisUpdateThemeButtons(activeTheme, drawerEl);
        }
        if (window.corvantisUpdateDirectionButtons) {
          window.corvantisUpdateDirectionButtons(activeDir, headerEl);
          window.corvantisUpdateDirectionButtons(activeDir, drawerEl);
        }

        el.innerHTML = headerEl.outerHTML;

        const oldBackdrop = document.getElementById('mobile-menu-backdrop');
        if (oldBackdrop) oldBackdrop.remove();
        const oldDrawer = document.getElementById('mobile-menu-drawer');
        if (oldDrawer) oldDrawer.remove();

        if (backdropEl) document.body.appendChild(backdropEl);
        document.body.appendChild(drawerEl);

        // Re-sync all live DOM buttons immediately after append
        if (window.corvantisUpdateThemeButtons) {
          window.corvantisUpdateThemeButtons(activeTheme);
        }
        if (window.corvantisUpdateDirectionButtons) {
          window.corvantisUpdateDirectionButtons(activeDir);
        }
        return true;
      }
    } else if (placeholderId === 'footer-placeholder') {
      const footerEl = doc.querySelector('footer');
      const backToTopEl = doc.querySelector('#back-to-top');
      if (footerEl) {
        normalizeLinks(footerEl);
        el.innerHTML = footerEl.outerHTML + (backToTopEl ? backToTopEl.outerHTML : '');
        return true;
      }
    }

    el.innerHTML = fallbackHtml;
    normalizeLinks(el);
    return true;
  }

  function initStickyNavbar() {
    const navbar = document.querySelector('.navbar-sticky');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
        closeHomeDropdown();
        closeServicesMegaMenu();
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function closeHomeDropdown() {
    const container = document.getElementById('home-dropdown-container');
    const toggle = document.getElementById('home-dropdown-toggle');
    const menu = document.getElementById('home-dropdown-menu');
    if (container) container.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (menu) {
      menu.classList.remove('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
      menu.classList.add('opacity-0', 'invisible', 'translate-y-2', 'pointer-events-none');
    }
    if (document.activeElement && container && container.contains(document.activeElement)) {
      try { document.activeElement.blur(); } catch (_) {}
    }
  }

  function closeServicesMegaMenu() {
    const container = document.getElementById('services-dropdown-container');
    const toggle = document.getElementById('services-dropdown-toggle');
    const menu = document.getElementById('services-dropdown-menu');
    if (container) container.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (menu) {
      menu.classList.remove('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
      menu.classList.add('opacity-0', 'invisible', 'translate-y-2', 'pointer-events-none');
    }
    if (document.activeElement && container && container.contains(document.activeElement)) {
      try { document.activeElement.blur(); } catch (_) {}
    }
  }

  function initHomeDropdown() {
    const container = document.getElementById('home-dropdown-container');
    const toggle = document.getElementById('home-dropdown-toggle');
    const menu = document.getElementById('home-dropdown-menu');

    if (!container || !toggle || !menu) return;
    if (toggle.dataset.dropdownBound) return;
    toggle.dataset.dropdownBound = 'true';

    let closeTimeout = null;

    function openDropdown() {
      if (closeTimeout) clearTimeout(closeTimeout);
      closeServicesMegaMenu();

      container.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.remove('opacity-0', 'invisible', 'translate-y-2', 'pointer-events-none');
      menu.classList.add('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
    }

    function closeDropdown() {
      if (closeTimeout) clearTimeout(closeTimeout);
      closeHomeDropdown();
    }

    // Desktop Click Toggle
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = container.classList.contains('open');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close immediately when clicking any link inside menu
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeDropdown();
      });
    });

    // Desktop Hover with grace delay
    container.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1280) {
        openDropdown();
      }
    });

    container.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1280) {
        closeTimeout = setTimeout(() => {
          closeDropdown();
        }, 160);
      }
    });

    // Close on click or touch outside
    const handleOutside = (e) => {
      if (!container.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('pointerdown', handleOutside, { passive: true });
    document.addEventListener('click', handleOutside);

    // Keyboard accessibility: Escape and Arrow Keys
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
        toggle.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown();
        const firstItem = menu.querySelector('a');
        if (firstItem) firstItem.focus();
      }
    });
  }

  function initServicesMegaMenu() {
    const container = document.getElementById('services-dropdown-container');
    const toggle = document.getElementById('services-dropdown-toggle');
    const menu = document.getElementById('services-dropdown-menu');

    if (!container || !toggle || !menu) return;
    if (toggle.dataset.servicesBound) return;
    toggle.dataset.servicesBound = 'true';

    let closeTimeout = null;

    function openServices() {
      if (closeTimeout) clearTimeout(closeTimeout);
      closeHomeDropdown();

      container.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.remove('opacity-0', 'invisible', 'translate-y-2', 'pointer-events-none');
      menu.classList.add('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
    }

    function closeServices() {
      if (closeTimeout) clearTimeout(closeTimeout);
      closeServicesMegaMenu();
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = container.classList.contains('open');
      if (isOpen) {
        closeServices();
      } else {
        openServices();
      }
    });

    // Close immediately when clicking any link inside the mega menu
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeServices();
      });
    });

    container.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1280) {
        openServices();
      }
    });

    container.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1280) {
        closeTimeout = setTimeout(() => {
          closeServices();
        }, 180);
      }
    });

    // Close on click or touch outside
    const handleOutside = (e) => {
      if (!container.contains(e.target)) {
        closeServices();
      }
    };
    document.addEventListener('pointerdown', handleOutside, { passive: true });
    document.addEventListener('click', handleOutside);

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeServices();
        toggle.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        openServices();
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  }

  function highlightActiveNavigation() {
    let currentPath = window.location.pathname.replace(/\\/g, '/').split('/').pop().split('?')[0].split('#')[0];
    if (!currentPath || currentPath === '' || currentPath === '/') {
      currentPath = 'index.html';
    }

    const isHome = (currentPath === 'index.html' || currentPath === 'home-2.html');
    const isService = (currentPath === 'services.html' || servicePages.includes(currentPath));

    // 0. Remove active and bold font states from all navigation links first
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
      link.classList.remove('active', 'font-semibold');
    });

    // 1. Desktop Home Dropdown active state
    const homeToggle = document.getElementById('home-dropdown-toggle');
    if (homeToggle) {
      if (isHome) {
        homeToggle.classList.add('active', 'font-semibold');
      } else {
        homeToggle.classList.remove('active', 'font-semibold');
      }
    }

    // 2. Desktop Services Mega Menu active state
    const servicesToggle = document.getElementById('services-dropdown-toggle');
    if (servicesToggle) {
      if (isService) {
        servicesToggle.classList.add('active', 'font-semibold');
      } else {
        servicesToggle.classList.remove('active', 'font-semibold');
      }
    }

    // 3. Dropdown Items in Home dropdown
    const homeDropdownItems = document.querySelectorAll('#home-dropdown-menu .dropdown-item');
    homeDropdownItems.forEach((item) => {
      const href = item.getAttribute('href');
      if (href) {
        const itemPath = href.split('/').pop().split('?')[0].split('#')[0];
        const badge = item.querySelector('.home-badge');
        const indicator = item.querySelector('.home-indicator');
        if (itemPath === currentPath) {
          item.classList.add('active');
          if (badge) badge.classList.remove('hidden');
          if (indicator) indicator.classList.remove('opacity-0');
        } else {
          item.classList.remove('active');
          if (badge) badge.classList.add('hidden');
          if (indicator) indicator.classList.add('opacity-0');
        }
      }
    });

    // 4. Dropdown Items in Services Mega Menu
    const megaMenuItems = document.querySelectorAll('#services-dropdown-menu a');
    megaMenuItems.forEach((item) => {
      const href = item.getAttribute('href');
      if (href) {
        const itemPath = href.split('/').pop().split('?')[0].split('#')[0];
        if (itemPath === currentPath) {
          item.classList.add('ring-1', 'ring-[#C5A46D]/50', 'bg-[#C5A46D]/10');
          const chevron = item.querySelector('svg');
          if (chevron) chevron.classList.remove('opacity-0');
        } else {
          item.classList.remove('ring-1', 'ring-[#C5A46D]/50', 'bg-[#C5A46D]/10');
        }
      }
    });

    // 5. Mobile Home Sublinks
    const mobileHomeSublinks = document.querySelectorAll('#mobile-home-submenu .mobile-sublink');
    mobileHomeSublinks.forEach((sublink) => {
      const href = sublink.getAttribute('href');
      if (href) {
        const subPath = href.split('/').pop().split('?')[0].split('#')[0];
        if (subPath === currentPath) {
          sublink.classList.add('active', 'text-[#C5A46D]', 'font-semibold');
        } else {
          sublink.classList.remove('active', 'text-[#C5A46D]', 'font-semibold');
        }
      }
    });

    // 6. Mobile Services Sublinks
    const mobileServicesSublinks = document.querySelectorAll('#mobile-services-submenu .mobile-sublink');
    mobileServicesSublinks.forEach((sublink) => {
      const href = sublink.getAttribute('href');
      if (href) {
        const subPath = href.split('/').pop().split('?')[0].split('#')[0];
        if (subPath === currentPath) {
          sublink.classList.add('active', 'text-[#C5A46D]', 'font-semibold');
        } else {
          sublink.classList.remove('active', 'text-[#C5A46D]', 'font-semibold');
        }
      }
    });

    // 7. Mobile Home Accordion (Auto-expand ONLY on Home 1 or Home 2; Collapsed on all others)
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
    if (mobileHomeToggle && mobileHomeSubmenu) {
      const arrow = mobileHomeToggle.querySelector('.mobile-arrow');
      if (isHome) {
        mobileHomeToggle.classList.add('active', 'text-[#C5A46D]', 'font-semibold');
        mobileHomeSubmenu.classList.remove('hidden');
        mobileHomeSubmenu.classList.add('flex');
        mobileHomeToggle.setAttribute('aria-expanded', 'true');
        if (arrow) arrow.classList.add('rotate-180');
      } else {
        mobileHomeToggle.classList.remove('active', 'text-[#C5A46D]', 'font-semibold');
        mobileHomeSubmenu.classList.add('hidden');
        mobileHomeSubmenu.classList.remove('flex');
        mobileHomeToggle.setAttribute('aria-expanded', 'false');
        if (arrow) arrow.classList.remove('rotate-180');
      }
    }

    // 8. Mobile Services Accordion (Auto-expand ONLY on Service pages; Collapsed on all others)
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesSubmenu = document.getElementById('mobile-services-submenu');
    if (mobileServicesToggle && mobileServicesSubmenu) {
      const arrow = mobileServicesToggle.querySelector('.mobile-arrow');
      if (isService) {
        mobileServicesToggle.classList.add('active', 'text-[#C5A46D]', 'font-semibold');
        if (servicePages.includes(currentPath)) {
          mobileServicesSubmenu.classList.remove('hidden');
          mobileServicesSubmenu.classList.add('flex');
          mobileServicesToggle.setAttribute('aria-expanded', 'true');
          if (arrow) arrow.classList.add('rotate-180');
        } else {
          mobileServicesSubmenu.classList.add('hidden');
          mobileServicesSubmenu.classList.remove('flex');
          mobileServicesToggle.setAttribute('aria-expanded', 'false');
          if (arrow) arrow.classList.remove('rotate-180');
        }
      } else {
        mobileServicesToggle.classList.remove('active', 'text-[#C5A46D]', 'font-semibold');
        mobileServicesSubmenu.classList.add('hidden');
        mobileServicesSubmenu.classList.remove('flex');
        mobileServicesToggle.setAttribute('aria-expanded', 'false');
        if (arrow) arrow.classList.remove('rotate-180');
      }
    }

    // 9. Direct navigation links: ONLY the active page receives .active and .font-semibold
    const directLinks = document.querySelectorAll('.nav-link:not(#home-dropdown-toggle):not(#services-dropdown-toggle), .mobile-nav-link:not(#mobile-home-toggle):not(#mobile-services-toggle)');
    directLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPath = href.split('/').pop().split('?')[0].split('#')[0];
        if (linkPath === currentPath) {
          link.classList.add('active', 'font-semibold');
        } else {
          link.classList.remove('active', 'font-semibold');
        }
      }
    });
  }

  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesSubmenu = document.getElementById('mobile-services-submenu');

    if (!toggleBtn || !menuDrawer) return;

    if (menuBackdrop && menuBackdrop.parentElement !== document.body) {
      document.body.appendChild(menuBackdrop);
    }
    if (menuDrawer.parentElement !== document.body) {
      document.body.appendChild(menuDrawer);
    }

    if (toggleBtn.dataset.menuBound) return;
    toggleBtn.dataset.menuBound = 'true';

    // Mobile Home accordion toggle
    if (mobileHomeToggle && mobileHomeSubmenu) {
      mobileHomeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = mobileHomeSubmenu.classList.contains('hidden');
        const arrow = mobileHomeToggle.querySelector('.mobile-arrow');

        if (isHidden) {
          mobileHomeSubmenu.classList.remove('hidden');
          mobileHomeSubmenu.classList.add('flex');
          mobileHomeToggle.setAttribute('aria-expanded', 'true');
          if (arrow) arrow.classList.add('rotate-180');
        } else {
          mobileHomeSubmenu.classList.add('hidden');
          mobileHomeSubmenu.classList.remove('flex');
          mobileHomeToggle.setAttribute('aria-expanded', 'false');
          if (arrow) arrow.classList.remove('rotate-180');
        }
      });
    }

    // Mobile Services accordion toggle
    if (mobileServicesToggle && mobileServicesSubmenu) {
      mobileServicesToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = mobileServicesSubmenu.classList.contains('hidden');
        const arrow = mobileServicesToggle.querySelector('.mobile-arrow');

        if (isHidden) {
          mobileServicesSubmenu.classList.remove('hidden');
          mobileServicesSubmenu.classList.add('flex');
          mobileServicesToggle.setAttribute('aria-expanded', 'true');
          if (arrow) arrow.classList.add('rotate-180');
        } else {
          mobileServicesSubmenu.classList.add('hidden');
          mobileServicesSubmenu.classList.remove('flex');
          mobileServicesToggle.setAttribute('aria-expanded', 'false');
          if (arrow) arrow.classList.remove('rotate-180');
        }
      });
    }

    function openMobileMenu() {
      menuDrawer.classList.add('open');
      if (menuBackdrop) {
        menuBackdrop.classList.add('open');
      }
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');

      // Guarantee theme & direction indicators and navigation highlights sync instantly upon drawer open
      const activeTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
      if (window.corvantisUpdateThemeButtons) {
        window.corvantisUpdateThemeButtons(activeTheme, menuDrawer);
      }
      if (window.corvantisUpdateDirectionButtons) {
        window.corvantisUpdateDirectionButtons(activeDir, menuDrawer);
      }
      highlightActiveNavigation();
    }

    function closeMobileMenu() {
      menuDrawer.classList.remove('open');
      if (menuBackdrop) {
        menuBackdrop.classList.remove('open');
      }
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', () => {
        closeMobileMenu();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuDrawer.classList.contains('open')) {
        closeMobileMenu();
        toggleBtn.focus();
      }
    });

    // Close on clicking any link inside drawer (a tags)
    const drawerLinks = menuDrawer.querySelectorAll('a');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Auto-close drawer if resized to desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280 && menuDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  function postComponentRender() {
    initStickyNavbar();
    initHomeDropdown();
    initServicesMegaMenu();
    initMobileMenu();
    highlightActiveNavigation();

    // Render icons first
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
    if (window.corvantisRefreshIcons) {
      window.corvantisRefreshIcons();
    }

    // Re-bind global interactive controls (Theme & Direction across all buttons)
    if (window.corvantisInitTheme) {
      window.corvantisInitTheme();
    }
    if (window.corvantisInitDirection) {
      window.corvantisInitDirection();
    }
    if (window.corvantisInitBackToTop) {
      window.corvantisInitBackToTop();
    }

    // Initialize client-side seamless SPA router (zero page reloads)
    initSeamlessRouter();
  }

  // In-memory cache for lightning-fast SPA navigation without network round-trips
  const pageCache = new Map();

  async function seamlessNavigate(url, pushHistory = true) {
    let targetUrl;
    try {
      targetUrl = new URL(url, window.location.href);
    } catch (e) {
      window.location.href = url;
      return;
    }

    // Handle same-page hash scrolling
    if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
      closeAllDrawersAndMenus();
      if (targetUrl.hash) {
        const hashTarget = document.getElementById(targetUrl.hash.substring(1));
        if (hashTarget) {
          hashTarget.scrollIntoView({ behavior: 'smooth' });
          if (pushHistory) history.pushState(null, '', targetUrl.href);
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    closeAllDrawersAndMenus();

    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.style.transition = 'opacity 0.12s ease-out';
      mainEl.style.opacity = '0.35';
    }

    try {
      let htmlText = pageCache.get(targetUrl.pathname);
      if (!htmlText) {
        const response = await fetch(targetUrl.href);
        if (!response.ok) throw new Error('Fetch status ' + response.status);
        htmlText = await response.text();
        pageCache.set(targetUrl.pathname, htmlText);
      }

      const parser = new DOMParser();
      const newDoc = parser.parseFromString(htmlText, 'text/html');
      const newMain = newDoc.querySelector('main');

      if (!newMain) {
        window.location.href = targetUrl.href;
        return;
      }

      // Update URL in browser history
      if (pushHistory) {
        history.pushState({ path: targetUrl.pathname }, '', targetUrl.href);
      }

      // Update Document Title and Meta Description
      if (newDoc.title) {
        document.title = newDoc.title;
      }
      const newMeta = newDoc.querySelector('meta[name="description"]');
      const curMeta = document.querySelector('meta[name="description"]');
      if (newMeta && curMeta) {
        curMeta.setAttribute('content', newMeta.getAttribute('content'));
      }

      // Swap <main> content & attributes
      if (mainEl) {
        mainEl.innerHTML = newMain.innerHTML;
        mainEl.className = newMain.className;
        if (newMain.getAttribute('id')) {
          mainEl.setAttribute('id', newMain.getAttribute('id'));
        } else {
          mainEl.removeAttribute('id');
        }
        if (newMain.getAttribute('aria-label')) {
          mainEl.setAttribute('aria-label', newMain.getAttribute('aria-label'));
        } else {
          mainEl.removeAttribute('aria-label');
        }
        mainEl.style.opacity = '1';
      }

      // Scroll to hash target or top of page immediately
      if (targetUrl.hash) {
        const hashTarget = document.getElementById(targetUrl.hash.substring(1));
        if (hashTarget) {
          hashTarget.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }

      // Re-normalize all links in header, drawer, footer, and swapped main
      normalizeAllDocumentLinks();

      // Highlight active navigation
      highlightActiveNavigation();

      // Render Lucide icons in new content
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }

      // Re-initialize all interactive components on new page
      if (window.corvantisInitBackToTop) window.corvantisInitBackToTop();
      if (window.corvantisInitAll) window.corvantisInitAll();
      if (window.corvantisInitValidation) window.corvantisInitValidation();
      if (window.corvantisInitTheme) window.corvantisInitTheme();
      if (window.corvantisInitDirection) window.corvantisInitDirection();

    } catch (err) {
      console.warn('Seamless navigation fallback to browser load:', err);
      window.location.href = targetUrl.href;
    } finally {
      if (mainEl) {
        mainEl.style.opacity = '1';
      }
    }
  }

  function initSeamlessRouter() {
    if (document.__seamlessRouterAttached) return;
    document.__seamlessRouterAttached = true;

    // Global link click interceptor
    document.addEventListener('click', (e) => {
      // Allow user modifier clicks (e.g. Cmd/Ctrl + click to open in new tab)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const link = e.target.closest('a[href]');
      if (!link) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      // Ignore external or non-standard protocols
      if (
        link.target === '_blank' ||
        link.hasAttribute('download') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('javascript:')
      ) {
        return;
      }

      // Handle pure page anchors (#section)
      if (rawHref.startsWith('#')) {
        const targetId = rawHref.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          closeAllDrawersAndMenus();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          try { history.pushState(null, '', '#' + targetId); } catch (_) {}
        }
        return;
      }

      try {
        const targetUrl = new URL(link.href, window.location.href);

        // Only handle same origin
        if (targetUrl.origin !== window.location.origin) return;

        // Check file extension (only .html or directory paths)
        const path = targetUrl.pathname;
        const isHtml = path.endsWith('.html') || path.endsWith('/') || !path.split('/').pop().includes('.');
        if (!isHtml) return;

        e.preventDefault();
        seamlessNavigate(targetUrl.href, true);
      } catch (_) {
        // Fallback to normal navigation if URL parsing fails
      }
    });

    // Prefetch on hover/touch for instant zero-lag transitions
    document.addEventListener('pointerenter', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || link.target === '_blank') return;
      try {
        const targetUrl = new URL(link.href, window.location.href);
        if (targetUrl.origin === window.location.origin && !pageCache.has(targetUrl.pathname)) {
          fetch(targetUrl.href).then(res => res.ok ? res.text() : null).then(html => {
            if (html) pageCache.set(targetUrl.pathname, html);
          }).catch(() => {});
        }
      } catch (_) {}
    }, { capture: true, passive: true });

    // Handle Browser Back / Forward buttons without reloading!
    window.addEventListener('popstate', () => {
      seamlessNavigate(window.location.href, false);
    });
  }

  function closeAllDrawersAndMenus() {
    // Close mobile menu if open
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    if (menuDrawer && menuDrawer.classList.contains('open')) {
      menuDrawer.classList.remove('open');
      if (menuBackdrop) menuBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    // Close desktop dropdowns completely
    closeHomeDropdown();
    closeServicesMegaMenu();
  }

  // Load components and initialize
  async function initComponents() {
    const navLoaded = await loadComponent('navbar-placeholder', 'navbar.html', fallbackNavbarHtml);
    if (navLoaded) {
      initStickyNavbar();
      initHomeDropdown();
      initServicesMegaMenu();
      initMobileMenu();
      highlightActiveNavigation();
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
      if (window.corvantisInitTheme) {
        window.corvantisInitTheme();
      }
      if (window.corvantisInitDirection) {
        window.corvantisInitDirection();
      }
    }

    await loadComponent('footer-placeholder', 'footer.html', fallbackFooterHtml);

    postComponentRender();
  }

  // Reliable execution on both initial load and cache/reload
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }

  window.corvantisInitComponents = initComponents;
  window.corvantisSeamlessNavigate = seamlessNavigate;
})();
