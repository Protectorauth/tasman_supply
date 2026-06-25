(function () {
  'use strict';

  /* Navbar scroll */
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const mobilePanel = document.querySelector('.navbar__mobile');

  function onScroll() {
    if (navbar) {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  if (toggle && mobilePanel) {
    toggle.addEventListener('click', function () {
      const isOpen = mobilePanel.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobilePanel.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal, .editorial-row, .timeline__entry, .region-row, .team-member, .stamp');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.stagger ? parseFloat(el.dataset.stagger) : 0;
            setTimeout(function () {
              el.classList.add('is-visible');
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el, index) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      el.dataset.stagger = (index % 6) * 0.1;
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Hand-drawn underline on scroll */
  const drawEls = document.querySelectorAll('.hand-underline[data-draw], .hand-circle[data-draw]');

  if ('IntersectionObserver' in window && drawEls.length) {
    const drawObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-drawn');
            drawObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    drawEls.forEach(function (el) {
      drawObserver.observe(el);
    });
  }

  /* Contact form */
  const form = document.getElementById('contact-form');
  const successMsg = document.querySelector('.form-success');

  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      successMsg.classList.add('is-visible');
    });
  }

  /* Active nav link */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
})();
