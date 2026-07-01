function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  let dropdownTimer;
  const trigger = document.querySelector('.nav-services-trigger');
  const dropdown = document.querySelector('.nav-dropdown-panel');

  if (trigger && dropdown) {
    trigger.addEventListener('mouseenter', function () {
      clearTimeout(dropdownTimer);
      dropdown.classList.add('is-open');
    });

    trigger.addEventListener('mouseleave', function () {
      dropdownTimer = setTimeout(function () {
        if (!dropdown.matches(':hover')) {
          dropdown.classList.remove('is-open');
        }
      }, 100);
    });

    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(dropdownTimer);
    });

    dropdown.addEventListener('mouseleave', function () {
      dropdownTimer = setTimeout(function () {
        dropdown.classList.remove('is-open');
      }, 100);
    });
  }

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (hamburger) hamburger.classList.add('open');
    if (mobileMenu) mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }
}
