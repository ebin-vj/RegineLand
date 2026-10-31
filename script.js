/* =============================================
   REGINELAND GROUP — MAIN JAVASCRIPT
   ============================================= */

'use strict';

// ---- Navbar Scroll Behavior ----
(function initNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();

// ---- Mobile Nav Toggle ----
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));

    // Animate hamburger
    const lines = toggle.querySelectorAll('.hamburger-line');
    if (isOpen) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  });

  // Close on nav link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const lines = toggle.querySelectorAll('.hamburger-line');
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const lines = toggle.querySelectorAll('.hamburger-line');
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  });
})();

// ---- Intersection Observer: Reveal on Scroll ----
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ---- Set Current Year in Footer ----
(function setYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// ---- Active Nav Link ----
(function setActiveNav() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (
      (path === '/' || path.endsWith('index.html')) && href === 'index.html'
    ) {
      link.classList.add('active');
    } else if (
      href !== 'index.html' && path.includes(href.replace('.html', ''))
    ) {
      link.classList.add('active');
    }
  });
})();

// ---- Contact Form Submission ----
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Animate button
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    // Simulate submission (replace with real form endpoint)
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#2d6b8a';
        submitBtn.style.color = '#fff';
      }
      form.reset();

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }
      }, 3000);
    }, 1200);
  });
})();

// ---- Brands Filter (Brands page) ----
(function initBrandsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const brandCards = document.querySelectorAll('.brand-card');
  if (!filterBtns.length || !brandCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      brandCards.forEach(card => {
        const sector = card.getAttribute('data-sector');
        if (filter === 'all' || sector === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ---- Smooth section reveal for stat numbers ----
(function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
        const suffix = el.textContent.replace(/[0-9]/g, '');
        if (!isNaN(target) && target > 0) {
          animateCount(el, 0, target, suffix, 1200);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));

  function animateCount(el, start, end, suffix, duration) {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }
})();

// ---- Parallax Hero Background ----
(function initParallax() {
  const heroBg = document.getElementById('hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.04) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
})();
