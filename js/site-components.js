/**
 * FutureBlock — shared header, footer, and mobile navigation.
 * Single source of truth: update here to update all pages.
 */
(function () {
  'use strict';

  var MOBILE_BP = 992;

  var SERVICES = [
    { id: 'advisory', label: 'Advisory', href: 'Advisory.html' },
    { id: 'automation', label: 'Automation', href: 'Automation.html' },
    { id: 'integrations', label: 'Integrations', href: 'Modernization.html' },
    { id: 'analytics', label: 'Business Analytics', href: 'GuruSquad.html' },
    { id: 'cloud', label: 'Cloud', href: 'CyberSecurity.html' },
    { id: 'innovation', label: 'Innovation Nodes', href: 'Innovation.html' }
  ];

  function getPageId() {
    return document.body.getAttribute('data-page') || 'home';
  }

  function homeHref() {
    return getPageId() === 'home' ? '#Home' : 'index.html#Home';
  }

  function aboutHref() {
    return getPageId() === 'home' ? '#about' : 'index.html#about';
  }

  function contactHref() {
    return getPageId() === 'home' ? '#contact' : 'index.html#contact';
  }

  function isActive(pageId) {
    return getPageId() === pageId;
  }

  function buildServicesDropdown() {
    return SERVICES.map(function (svc) {
      var active = isActive(svc.id) ? ' active' : '';
      return (
        '<li><a href="' + svc.href + '" class="nav__dropdown-link' + active + '">' +
        '<span class="nav__dropdown-menu-label">' + svc.label + '</span></a></li>'
      );
    }).join('');
  }

  function buildHeader() {
    var page = getPageId();
    var servicesActive = page !== 'home' ? ' active' : '';
    var homeActive = page === 'home' ? ' active' : '';

    return (
      '<header class="nav nav--always-fixed site-header" itemtype="http://schema.org/WPHeader" itemscope>' +
        '<div class="nav__holder nav--sticky nav--align-center">' +
          '<div class="container-fluid container-semi-fluid">' +
            '<div class="flex-parent">' +
              '<div class="nav__header clearfix">' +
                '<div class="logo-wrap">' +
                  '<a href="' + (page === 'home' ? '#Home' : 'index.html') + '" aria-label="FutureBlock Home">' +
                    '<img src="img/logo/futureblock-logo.png" alt="FutureBlock Company Logo" class="site-logo" width="200" height="48" />' +
                  '</a>' +
                '</div>' +
                '<button type="button" class="nav__icon-toggle" id="nav__icon-toggle" aria-expanded="false" aria-controls="navbar-collapse" aria-label="Open menu">' +
                  '<span class="sr-only">Toggle navigation</span>' +
                  '<span class="nav__icon-toggle-bar"></span>' +
                  '<span class="nav__icon-toggle-bar"></span>' +
                  '<span class="nav__icon-toggle-bar"></span>' +
                '</button>' +
              '</div>' +
              '<div class="nav__overlay-backdrop" id="nav-overlay-backdrop" aria-hidden="true"></div>' +
              '<nav id="navbar-collapse" class="nav__wrap" itemtype="http://schema.org/SiteNavigationElement" itemscope="itemscope">' +
                '<button type="button" class="nav__overlay-close" id="nav-overlay-close" aria-label="Close menu">' +
                  '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<ul class="nav__menu" id="site-nav-menu">' +
                  '<li><a href="' + homeHref() + '" class="nav-link' + homeActive + '">Home</a></li>' +
                  '<li><a href="' + aboutHref() + '" class="nav-link">About</a></li>' +
                  '<li class="nav__dropdown">' +
                    '<a href="#" class="nav-link nav-link--services' + servicesActive + '" aria-haspopup="true">Services</a>' +
                    '<i class="ui-arrow-down nav__dropdown-trigger" role="button" aria-haspopup="true" aria-expanded="false" aria-label="Toggle services menu" tabindex="0"></i>' +
                    '<ul class="nav__dropdown-menu">' + buildServicesDropdown() + '</ul>' +
                  '</li>' +
                  '<li><a href="' + contactHref() + '" class="nav-link">Contact</a></li>' +
                '</ul>' +
                '<div class="nav__mobile-cta">' +
                  '<button type="button" class="nav__cta-btn nav__cta-btn--mobile" data-toggle="modal" data-target="#contact-form-modal">Need Help?</button>' +
                '</div>' +
              '</nav>' +
              '<div class="nav__actions flex-child">' +
                '<button type="button" class="nav__cta-btn" data-toggle="modal" data-target="#contact-form-modal">Need Help?</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function buildFooter() {
    var serviceLinks = [
      ['Advisory.html', 'Advisory Services'],
      ['Automation.html', 'Automation Solutions'],
      ['Modernization.html', 'Integration Services'],
      ['GuruSquad.html', 'Business Analytics'],
      ['CyberSecurity.html', 'Cloud Solutions'],
      ['Innovation.html', 'Innovation Nodes']
    ];

    var grid = serviceLinks.map(function (item) {
      return '<div class="service-item"><i class="ui-arrow-right"></i> <a href="' + item[0] + '">' + item[1] + '</a></div>';
    }).join('');

    return (
      '<footer class="site-footer bg-dark bg-pattern">' +
        '<div class="container">' +
          '<div class="footer__widgets">' +
            '<div class="site-footer__grid">' +
              '<div class="site-footer__brand">' +
                '<div class="footer-logo">' +
                  '<img src="img/logo/futureblock-logo.png" alt="FutureBlock Company Logo" class="footer-logo-img" width="200" height="48" />' +
                '</div>' +
                '<p class="site-footer__tagline">Empowering tomorrow&rsquo;s technology today.</p>' +
              '</div>' +
              '<div class="site-footer__services">' +
                '<h4 class="services-title">Services</h4>' +
                '<div class="services-grid">' + grid + '</div>' +
              '</div>' +
              '<div class="site-footer__contact">' +
                '<h4 class="site-footer__contact-title">Contact Us</h4>' +
                '<div class="contact-info">' +
                  '<div class="contact-item">' +
                    '<i class="fa-solid fa-envelope" aria-hidden="true"></i>' +
                    '<a href="mailto:info@futureblock.com">info@futureblock.com</a>' +
                  '</div>' +
                  '<div class="contact-item">' +
                    '<i class="fa-solid fa-location-dot" aria-hidden="true"></i>' +
                    '<span>Plot No 37 Rajiv Nagar, Hyderabad, Telangana, India 500045</span>' +
                  '</div>' +
                  '<button type="button" class="nav__cta-btn site-footer__cta" data-toggle="modal" data-target="#contact-form-modal">Need Help?</button>' +
                '</div>' +
              '</div>' +
              '<div class="site-footer__social">' +
                '<h4 class="site-footer__social-title">Follow Us</h4>' +
                '<div class="site-footer__social-links">' +
                  '<a href="https://www.x.com" class="site-footer__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i class="fab fa-x-twitter"></i></a>' +
                  '<a href="https://www.linkedin.com" class="site-footer__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>' +
                  '<a href="https://www.facebook.com" class="site-footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="copyright-wrap">' +
          '<span class="copyright">&copy; 2017 FutureBlock. All rights reserved.</span>' +
        '</div>' +
      '</footer>'
    );
  }

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) {
      el.outerHTML = html;
    }
  }

  function isMobileNav() {
    return window.innerWidth < MOBILE_BP;
  }

  function setNavOpen(open) {
    var nav = document.getElementById('navbar-collapse');
    var toggle = document.getElementById('nav__icon-toggle');
    var backdrop = document.getElementById('nav-overlay-backdrop');
    if (!nav || !toggle) return;

    nav.classList.toggle('is-open', open);
    if (backdrop) backdrop.classList.toggle('is-visible', open);
    toggle.classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
  }

  function closeNavMenu() {
    setNavOpen(false);
    document.querySelectorAll('.nav__dropdown-trigger').forEach(function (t) {
      t.classList.remove('active', 'nav__dropdown-trigger--is-open');
      t.setAttribute('aria-expanded', 'false');
    });
  }

  function toggleServicesDropdown(trigger) {
    var isOpen = trigger.classList.contains('active');
    document.querySelectorAll('.nav__dropdown-trigger').forEach(function (item) {
      item.classList.remove('active', 'nav__dropdown-trigger--is-open');
      item.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      trigger.classList.add('active', 'nav__dropdown-trigger--is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function initNavigation() {
    var toggle = document.getElementById('nav__icon-toggle');
    var closeBtn = document.getElementById('nav-overlay-close');
    var backdrop = document.getElementById('nav-overlay-backdrop');

    if (toggle) {
      toggle.addEventListener('click', function () {
        if (!isMobileNav()) return;
        var nav = document.getElementById('navbar-collapse');
        setNavOpen(!(nav && nav.classList.contains('is-open')));
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeNavMenu);
    if (backdrop) backdrop.addEventListener('click', closeNavMenu);

    document.querySelectorAll('.nav__dropdown-trigger').forEach(function (trigger) {
      function handleToggle(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleServicesDropdown(trigger);
      }
      trigger.addEventListener('click', handleToggle);
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') handleToggle(event);
      });
    });

    var servicesLink = document.querySelector('.nav-link--services');
    var servicesTrigger = document.querySelector('.nav-link--services + .nav__dropdown-trigger');
    if (servicesLink && servicesTrigger) {
      servicesLink.addEventListener('click', function (event) {
        if (isMobileNav()) {
          event.preventDefault();
          toggleServicesDropdown(servicesTrigger);
        }
      });
    }

    document.querySelectorAll('.nav__menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!isMobileNav()) return;
        if (link.classList.contains('nav-link--services')) return;
        if (link.closest('.nav__dropdown-menu')) closeNavMenu();
        else if (link.getAttribute('href') && link.getAttribute('href') !== '#') closeNavMenu();
      });
    });

    document.querySelectorAll('.nav__cta-btn--mobile').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (isMobileNav()) closeNavMenu();
      });
    });

    window.addEventListener('resize', function () {
      if (!isMobileNav()) closeNavMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNavMenu();
    });
  }

  function initStickyHeader() {
    var holder = document.querySelector('.nav__holder');
    if (!holder) return;
    window.addEventListener('scroll', function () {
      holder.classList.toggle('nav__holder--scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    mount('site-header', buildHeader());
    mount('site-footer', buildFooter());
    initNavigation();
    initStickyHeader();
  });
})();
